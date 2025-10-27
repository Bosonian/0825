//
//  ICHVolumeCalculator.swift
//  iGFAP Stroke Triage Assistant
//
//  Calculate ICH volume from GFAP biomarker
//  Based on log-log regression model
//

import Foundation

/// ICH volume estimation from GFAP values
struct ICHVolumeCalculator {

    // MARK: - Model Coefficients

    /// Log-log regression model coefficients
    /// Formula: log₁₀(Volume) = intercept + coefficient × log₁₀(GFAP)
    /// R² = 0.476
    private static let intercept = 0.0192
    private static let coefficient = 0.4533

    // MARK: - Volume Estimation

    /// Calculate estimated ICH volume from GFAP value
    /// - Parameter gfap: GFAP value in pg/mL (29-10,001)
    /// - Returns: ICHVolume with estimated volume, mortality range, and severity
    static func estimateVolume(fromGFAP gfap: Double) -> ICHVolume {
        guard gfap > 0 else {
            return ICHVolume(
                estimatedML: 0,
                mortalityRange: "N/A",
                severity: .small
            )
        }

        // Apply log-log regression
        let logGFAP = log10(gfap)
        let logVolume = intercept + coefficient * logGFAP
        let volumeML = pow(10.0, logVolume)

        // Determine severity and mortality
        let severity = determineSeverity(volumeML)
        let mortality = estimateMortality(volumeML)

        return ICHVolume(
            estimatedML: volumeML,
            mortalityRange: mortality,
            severity: severity
        )
    }

    // MARK: - Severity Classification

    /// Determine severity level based on volume
    /// - Parameter volumeML: Estimated volume in milliliters
    /// - Returns: Severity category
    private static func determineSeverity(_ volumeML: Double) -> ICHVolume.Severity {
        switch volumeML {
        case ..<10:
            return .small
        case 10..<20:
            return .moderate
        case 20..<30:
            return .large
        default:
            return .critical
        }
    }

    // MARK: - Mortality Estimation

    /// Estimate 30-day mortality range based on ICH volume
    /// Based on Broderick et al. (1993) and subsequent research
    /// - Parameter volumeML: Estimated volume in milliliters
    /// - Returns: Mortality range as string
    private static func estimateMortality(_ volumeML: Double) -> String {
        switch volumeML {
        case ..<10:
            return "5-10%"
        case 10..<30:
            return "10-19%"
        case 30..<50:
            return "19-44%"
        case 50..<60:
            return "44-91%"
        default:
            return "91-100%"
        }
    }

    // MARK: - Validation

    /// Validate GFAP value is within acceptable range
    /// - Parameter gfap: GFAP value in pg/mL
    /// - Returns: Validation result with any warnings
    static func validateGFAP(_ gfap: Double) -> (isValid: Bool, warning: String?) {
        if gfap < 29 {
            return (false, "GFAP value too low (minimum: 29 pg/mL)")
        }

        if gfap > 10001 {
            return (false, "GFAP value exceeds valid range (maximum: 10,001 pg/mL)")
        }

        if gfap > 8000 {
            return (true, "Warning: Extremely high GFAP value - please verify lab result")
        }

        return (true, nil)
    }
}

// MARK: - Constants

extension ICHVolumeCalculator {
    /// GFAP value ranges (pg/mL)
    enum GFAPRange {
        static let minimum: Double = 29
        static let maximum: Double = 10001
        static let normal: Double = 100
        static let elevated: Double = 500
        static let critical: Double = 1000
    }

    /// Volume thresholds (mL)
    enum VolumeThreshold {
        static let small: Double = 10
        static let moderate: Double = 20
        static let large: Double = 30
        static let critical: Double = 50
    }
}
