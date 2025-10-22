//
//  Double+Extensions.swift
//  iGFAP Stroke Triage Assistant
//
//  Double utility extensions for medical calculations
//

import Foundation

extension Double {
    // MARK: - Rounding

    /// Round to specified decimal places
    func rounded(toPlaces places: Int) -> Double {
        let divisor = pow(10.0, Double(places))
        return (self * divisor).rounded() / divisor
    }

    /// Round to 1 decimal place
    var rounded1: Double {
        rounded(toPlaces: 1)
    }

    /// Round to 2 decimal places
    var rounded2: Double {
        rounded(toPlaces: 2)
    }

    /// Round to 3 decimal places
    var rounded3: Double {
        rounded(toPlaces: 3)
    }

    // MARK: - Formatting

    /// Format as percentage (0.67 → "67%")
    var asPercentage: String {
        String(format: "%.0f%%", self * 100)
    }

    /// Format as percentage with 1 decimal (0.675 → "67.5%")
    var asPercentage1: String {
        String(format: "%.1f%%", self * 100)
    }

    /// Format as percentage with 2 decimals (0.6751 → "67.51%")
    var asPercentage2: String {
        String(format: "%.2f%%", self * 100)
    }

    /// Format with 1 decimal place
    var formatted1: String {
        String(format: "%.1f", self)
    }

    /// Format with 2 decimal places
    var formatted2: String {
        String(format: "%.2f", self)
    }

    /// Format with 3 decimal places
    var formatted3: String {
        String(format: "%.3f", self)
    }

    // MARK: - Range Validation

    /// Check if value is in range
    func isInRange(_ range: ClosedRange<Double>) -> Bool {
        range.contains(self)
    }

    /// Clamp value to range
    func clamped(to range: ClosedRange<Double>) -> Double {
        min(max(self, range.lowerBound), range.upperBound)
    }

    // MARK: - Medical Calculations

    /// Convert GFAP value to ICH volume (mL)
    var toICHVolume: Double {
        let logGFAP = log10(self)
        let logVolume = 0.0192 + 0.4533 * logGFAP
        return pow(10.0, logVolume)
    }

    /// Check if GFAP value is valid
    var isValidGFAP: Bool {
        isInRange(AppConstants.gfapMinValue...AppConstants.gfapMaxValue)
    }

    /// Classify probability as risk level
    var asRiskLevel: RiskLevel {
        RiskLevel.from(probability: self)
    }

    /// Check if probability indicates high risk
    var isHighRisk: Bool {
        self >= AppConstants.highRiskThreshold
    }

    /// Check if probability indicates critical risk
    var isCriticalRisk: Bool {
        self >= AppConstants.highRiskThreshold
    }

    // MARK: - Statistical Functions

    /// Calculate z-score
    func zScore(mean: Double, standardDeviation: Double) -> Double {
        (self - mean) / standardDeviation
    }

    /// Yeo-Johnson transformation (used in LVO model)
    func yeoJohnson(lambda: Double) -> Double {
        if self >= 0 {
            if abs(lambda) < 1e-10 {
                return log(self + 1)
            } else {
                return (pow(self + 1, lambda) - 1) / lambda
            }
        } else {
            if abs(lambda - 2) < 1e-10 {
                return -log(-self + 1)
            } else {
                return -(pow(-self + 1, 2 - lambda) - 1) / (2 - lambda)
            }
        }
    }

    /// Logistic function (sigmoid)
    var sigmoid: Double {
        1.0 / (1.0 + exp(-self))
    }

    /// Inverse logistic (logit)
    var logit: Double {
        log(self / (1.0 - self))
    }

    // MARK: - Conversion

    /// Convert probability to percentage integer (0.67 → 67)
    var asPercentageInt: Int {
        Int((self * 100).rounded())
    }

    /// Convert milliliters to liters
    var mlToLiters: Double {
        self / 1000.0
    }

    /// Convert liters to milliliters
    var litersToML: Double {
        self * 1000.0
    }

    // MARK: - Comparison

    /// Check if approximately equal (within tolerance)
    func isApproximatelyEqual(to other: Double, tolerance: Double = 0.0001) -> Bool {
        abs(self - other) < tolerance
    }

    /// Check if zero (within tolerance)
    var isApproximatelyZero: Bool {
        abs(self) < 0.0001
    }

    // MARK: - Medical Units

    /// Format as GFAP value
    var asGFAPString: String {
        AppConstants.formatGFAP(self)
    }

    /// Format as volume
    var asVolumeString: String {
        AppConstants.formatVolume(self)
    }

    /// Format as probability
    var asProbabilityString: String {
        AppConstants.formatProbability(self)
    }

    // MARK: - Safe Math Operations

    /// Safe division (returns nil if divide by zero)
    func safeDivide(by divisor: Double) -> Double? {
        guard !divisor.isApproximatelyZero else { return nil }
        return self / divisor
    }

    /// Safe logarithm (returns nil if non-positive)
    var safeLog10: Double? {
        guard self > 0 else { return nil }
        return log10(self)
    }

    /// Safe square root (returns nil if negative)
    var safeSqrt: Double? {
        guard self >= 0 else { return nil }
        return sqrt(self)
    }
}

// MARK: - Array of Doubles Extensions

extension Array where Element == Double {
    /// Calculate mean (average)
    var mean: Double? {
        guard !isEmpty else { return nil }
        return reduce(0, +) / Double(count)
    }

    /// Calculate median
    var median: Double? {
        guard !isEmpty else { return nil }
        let sorted = self.sorted()
        if count % 2 == 0 {
            return (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        } else {
            return sorted[count / 2]
        }
    }

    /// Calculate standard deviation
    var standardDeviation: Double? {
        guard let mean = mean, count > 1 else { return nil }
        let variance = map { pow($0 - mean, 2) }.reduce(0, +) / Double(count - 1)
        return sqrt(variance)
    }

    /// Calculate sum
    var sum: Double {
        reduce(0, +)
    }

    /// Find minimum value
    var minimum: Double? {
        self.min()
    }

    /// Find maximum value
    var maximum: Double? {
        self.max()
    }

    /// Calculate range (max - min)
    var range: Double? {
        guard let min = minimum, let max = maximum else { return nil }
        return max - min
    }

    /// Normalize to 0-1 range
    var normalized: [Double]? {
        guard let min = minimum, let max = maximum, max > min else { return nil }
        return map { ($0 - min) / (max - min) }
    }

    /// Standardize (z-score normalization)
    var standardized: [Double]? {
        guard let mean = mean, let std = standardDeviation, std > 0 else { return nil }
        return map { ($0 - mean) / std }
    }
}

// MARK: - CGFloat Conversion

extension Double {
    /// Convert to CGFloat
    var asCGFloat: CGFloat {
        CGFloat(self)
    }
}

extension CGFloat {
    /// Convert to Double
    var asDouble: Double {
        Double(self)
    }
}
