//
//  LVOModel.swift
//  iGFAP Stroke Triage Assistant
//
//  Production LVO Model - Scientifically Calibrated
//  Implementation of GFAP + FAST-ED LVO prediction model
//

import Foundation

/// Large Vessel Occlusion prediction model
struct LVOModel {

    // MARK: - Model Parameters (Scientifically Calibrated)

    /// Yeo-Johnson lambda for GFAP transformation
    private static let lambda = -0.825559

    /// Logistic regression intercept
    private static let b0 = -0.408314

    /// GFAP coefficient (negative = protective when transformed)
    private static let bGFAP = -0.826450

    /// FAST-ED coefficient (positive = risk factor)
    private static let bFAST = 1.651521

    // MARK: - Standardization Parameters

    /// Mean of transformed GFAP
    private static let muG = 0.0

    /// Standard deviation of transformed GFAP
    private static let sigG = 1.0

    /// Mean of FAST-ED score
    private static let muF = 3.701422

    /// Standard deviation of FAST-ED score
    private static let sigF = 2.306173

    // MARK: - Platt Scaling Parameters

    /// Platt scaling slope
    private static let aPlatt = 1.117420

    /// Platt scaling intercept
    private static let bPlatt = -1.032167

    // MARK: - Decision Threshold

    /// Classification threshold
    private static let threshold = 0.333333

    // MARK: - Validation Constants

    private static let numericEpsilon = 1e-15
    private static let maxGFAPWarning: Double = 50000
    private static let minFASTED = 0
    private static let maxFASTED = 16

    // MARK: - Public Interface

    /// Calculate LVO probability
    /// - Parameters:
    ///   - gfap: GFAP value in pg/mL
    ///   - fastED: FAST-ED score (0-9, extended to 16 for validation)
    /// - Returns: Probability between 0.0 and 1.0
    static func probability(gfap: Double, fastED: Int) -> Double {
        // Clamp FAST-ED to valid range
        let clampedFastED = max(minFASTED, min(maxFASTED, fastED))

        // Apply transformations
        let gfapTransformed = yeoJohnson(gfap, lambda: lambda)
        let gfapStandardized = (gfapTransformed - muG) / sigG
        let fastStandardized = (Double(clampedFastED) - muF) / sigF

        // Calculate logit
        let logit = b0 + bGFAP * gfapStandardized + bFAST * fastStandardized

        // Apply Platt calibration
        let calibratedLogit = aPlatt * logit + bPlatt

        // Return probability via sigmoid function
        return logistic(calibratedLogit)
    }

    /// Binary classification using threshold
    /// - Parameters:
    ///   - gfap: GFAP value in pg/mL
    ///   - fastED: FAST-ED score
    /// - Returns: 1 if LVO likely, 0 if unlikely
    static func classification(gfap: Double, fastED: Int) -> Int {
        let prob = probability(gfap: gfap, fastED: fastED)
        return prob >= threshold ? 1 : 0
    }

    /// Comprehensive prediction with detailed intermediate values
    /// - Parameters:
    ///   - gfap: GFAP value in pg/mL
    ///   - fastED: FAST-ED score
    /// - Returns: Detailed prediction result
    static func predict(gfap: Double, fastED: Int) -> LVOPredictionResult {
        var warnings: [String] = []

        // Validate inputs
        let clampedFastED = max(minFASTED, min(maxFASTED, fastED))
        if clampedFastED != fastED {
            warnings.append("FAST-ED score clamped from \(fastED) to \(clampedFastED)")
        }

        if gfap > maxGFAPWarning {
            warnings.append("GFAP value \(gfap) exceeds typical range")
        }

        // Apply transformations
        let gfapTransformed = yeoJohnson(gfap, lambda: lambda)
        let gfapStandardized = (gfapTransformed - muG) / sigG
        let fastStandardized = (Double(clampedFastED) - muF) / sigF

        // Calculate logit
        let logit = b0 + bGFAP * gfapStandardized + bFAST * fastStandardized

        // Apply Platt calibration
        let calibratedLogit = aPlatt * logit + bPlatt

        // Calculate probability
        let prob = logistic(calibratedLogit)
        let classification = prob >= threshold ? 1 : 0

        return LVOPredictionResult(
            probability: prob,
            classification: classification,
            gfapInput: gfap,
            fastEDInput: clampedFastED,
            transformedValues: TransformedValues(
                gfapTransformed: gfapTransformed,
                gfapStandardized: gfapStandardized,
                fastStandardized: fastStandardized,
                logit: logit,
                calibratedLogit: calibratedLogit
            ),
            warnings: warnings
        )
    }

    // MARK: - Mathematical Functions

    /// Yeo-Johnson power transformation
    /// - Parameters:
    ///   - x: Input value
    ///   - lambda: Transformation parameter
    /// - Returns: Transformed value
    private static func yeoJohnson(_ x: Double, lambda: Double) -> Double {
        if abs(lambda) < numericEpsilon {
            return log(x + 1.0)
        }
        return (pow(x + 1.0, lambda) - 1.0) / lambda
    }

    /// Logistic (sigmoid) function
    /// - Parameter x: Input value
    /// - Returns: Probability between 0 and 1
    private static func logistic(_ x: Double) -> Double {
        // Prevent overflow/underflow
        if x > 500 { return 1.0 }
        if x < -500 { return 0.0 }
        return 1.0 / (1.0 + exp(-x))
    }
}

// MARK: - Prediction Result

/// Detailed LVO prediction result
struct LVOPredictionResult {
    let probability: Double
    let classification: Int
    let gfapInput: Double
    let fastEDInput: Int
    let transformedValues: TransformedValues
    let warnings: [String]

    var percentageRisk: Int {
        Int((probability * 100).rounded())
    }

    var isLVOLikely: Bool {
        classification == 1
    }
}

/// Intermediate transformed values for debugging/validation
struct TransformedValues {
    let gfapTransformed: Double
    let gfapStandardized: Double
    let fastStandardized: Double
    let logit: Double
    let calibratedLogit: Double
}
