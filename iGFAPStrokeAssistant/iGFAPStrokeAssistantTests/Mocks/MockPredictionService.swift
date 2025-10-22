//
//  MockPredictionService.swift
//  iGFAPStrokeAssistantTests
//
//  Mock prediction service for offline testing
//

import Foundation
@testable import iGFAPStrokeAssistant

/// Mock prediction service for offline testing
actor MockPredictionService: PredictionServiceProtocol {

    // MARK: - Configuration

    var shouldSucceed: Bool = true
    var delayMilliseconds: Int = 100
    var customError: Error?

    // MARK: - Call Tracking

    private(set) var comaICHCallCount = 0
    private(set) var limitedICHCallCount = 0
    private(set) var fullStrokeCallCount = 0

    private(set) var lastComaGFAP: Double?
    private(set) var lastLimitedData: PatientData?
    private(set) var lastFullData: PatientData?

    // MARK: - Reset

    func reset() {
        comaICHCallCount = 0
        limitedICHCallCount = 0
        fullStrokeCallCount = 0
        lastComaGFAP = nil
        lastLimitedData = nil
        lastFullData = nil
        shouldSucceed = true
        customError = nil
    }

    // MARK: - PredictionServiceProtocol Implementation

    func predictComaICH(gfap: Double) async throws -> ICHPrediction {
        comaICHCallCount += 1
        lastComaGFAP = gfap

        // Simulate network delay
        try await Task.sleep(nanoseconds: UInt64(delayMilliseconds * 1_000_000))

        // Check if should fail
        if !shouldSucceed {
            if let error = customError {
                throw error
            }
            throw APIError.serverError(500, "Mock server error")
        }

        // Validate GFAP
        guard gfap >= 29 && gfap <= 10001 else {
            throw APIError.validationError("GFAP must be between 29 and 10,001 pg/mL")
        }

        // Generate mock prediction based on GFAP
        let probability = calculateMockICHProbability(gfap: gfap)
        let drivers = generateMockICHDrivers(gfap: gfap)
        let volume = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)

        return ICHPrediction(
            probability: probability,
            drivers: drivers,
            confidence: 0.85,
            volume: volume
        )
    }

    func predictLimitedICH(_ data: PatientData) async throws -> ICHPrediction {
        limitedICHCallCount += 1
        lastLimitedData = data

        try await Task.sleep(nanoseconds: UInt64(delayMilliseconds * 1_000_000))

        if !shouldSucceed {
            if let error = customError {
                throw error
            }
            throw APIError.serverError(500, "Mock server error")
        }

        // Validate data
        let validation = data.validate(for: .limited)
        guard validation.isValid else {
            throw APIError.validationError(validation.errorMessage ?? "Invalid data")
        }

        let gfap = data.gfapValue ?? 0
        let age = data.ageYears ?? 0
        let systolic = data.systolicBP ?? 0

        // Mock probability influenced by multiple factors
        let baseProbability = calculateMockICHProbability(gfap: gfap)
        let ageAdjustment = Double(age - 60) * 0.005 // Older age increases risk
        let bpAdjustment = Double(systolic - 120) * 0.002 // Higher BP increases risk

        let probability = min(max(baseProbability + ageAdjustment + bpAdjustment, 0.0), 1.0)

        let drivers = generateMockLimitedDrivers(data: data)
        let volume = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)

        return ICHPrediction(
            probability: probability,
            drivers: drivers,
            confidence: 0.82,
            volume: volume
        )
    }

    func predictFullStroke(_ data: PatientData) async throws -> AssessmentResults {
        fullStrokeCallCount += 1
        lastFullData = data

        try await Task.sleep(nanoseconds: UInt64(delayMilliseconds * 1_000_000))

        if !shouldSucceed {
            if let error = customError {
                throw error
            }
            throw APIError.serverError(500, "Mock server error")
        }

        // Validate data
        let validation = data.validate(for: .full)
        guard validation.isValid else {
            throw APIError.validationError(validation.errorMessage ?? "Invalid data")
        }

        // Generate ICH prediction
        let gfap = data.gfapValue ?? 0
        let ichProbability = calculateMockICHProbability(gfap: gfap)
        let ichDrivers = generateMockFullICHDrivers(data: data)
        let volume = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)

        let ichPrediction = ICHPrediction(
            probability: ichProbability,
            drivers: ichDrivers,
            confidence: 0.88,
            volume: volume
        )

        // Generate LVO prediction
        let lvoProbability = calculateMockLVOProbability(data: data)
        let lvoDrivers = generateMockLVODrivers(data: data)

        let lvoPrediction = LVOPrediction(
            probability: lvoProbability,
            drivers: lvoDrivers,
            confidence: 0.84
        )

        return AssessmentResults(
            ich: ichPrediction,
            lvo: lvoPrediction,
            module: .full
        )
    }

    // MARK: - Mock Calculation Helpers

    private func calculateMockICHProbability(gfap: Double) -> Double {
        // Simple mock formula: higher GFAP = higher ICH risk
        // GFAP range: 29-10001
        // Map to probability 0.1-0.9
        let normalized = (log10(gfap) - log10(29)) / (log10(10001) - log10(29))
        return 0.1 + (normalized * 0.8)
    }

    private func calculateMockLVOProbability(data: PatientData) -> Double {
        // LVO probability influenced by FAST-ED score and GFAP
        let fastED = Double(data.fastEdScore ?? 0)
        let gfap = data.gfapValue ?? 0

        // FAST-ED 0-9, higher = higher LVO risk
        let fastEDComponent = fastED / 9.0 * 0.6

        // Lower GFAP = higher LVO risk (inverse relationship)
        let gfapComponent = (1.0 - min(gfap / 5000.0, 1.0)) * 0.4

        return min(fastEDComponent + gfapComponent, 1.0)
    }

    // MARK: - Mock Driver Generation

    private func generateMockICHDrivers(gfap: Double) -> [RiskDriver] {
        [
            RiskDriver(
                name: "gfap_value",
                displayName: "GFAP Value",
                weight: gfap > 1000 ? 0.45 : 0.25,
                category: .biomarker
            ),
            RiskDriver(
                name: "baseline_risk",
                displayName: "Baseline Risk",
                weight: 0.15,
                category: .demographic
            )
        ]
    }

    private func generateMockLimitedDrivers(data: PatientData) -> [RiskDriver] {
        var drivers: [RiskDriver] = []

        let gfap = data.gfapValue ?? 0
        drivers.append(RiskDriver(
            name: "gfap_value",
            displayName: "GFAP Value",
            weight: gfap > 1000 ? 0.40 : 0.25,
            category: .biomarker
        ))

        let age = data.ageYears ?? 0
        if age > 65 {
            drivers.append(RiskDriver(
                name: "age_years",
                displayName: "Age",
                weight: 0.20,
                category: .demographic
            ))
        }

        let systolic = data.systolicBP ?? 0
        if systolic > 140 {
            drivers.append(RiskDriver(
                name: "systolic_bp",
                displayName: "Systolic BP",
                weight: 0.15,
                category: .vital
            ))
        }

        if data.vigilanceReduction {
            drivers.append(RiskDriver(
                name: "vigilanzminderung",
                displayName: "Vigilance Reduction",
                weight: 0.18,
                category: .neurological
            ))
        }

        return drivers.sorted { abs($0.weight) > abs($1.weight) }
    }

    private func generateMockFullICHDrivers(data: PatientData) -> [RiskDriver] {
        var drivers = generateMockLimitedDrivers(data: data)

        if data.headache {
            drivers.append(RiskDriver(
                name: "headache",
                displayName: "Headache",
                weight: 0.12,
                category: .neurological
            ))
        }

        if data.anticoagulated {
            drivers.append(RiskDriver(
                name: "anticoagulated_noak",
                displayName: "Anticoagulation",
                weight: 0.22,
                category: .history
            ))
        }

        return drivers.sorted { abs($0.weight) > abs($1.weight) }
    }

    private func generateMockLVODrivers(data: PatientData) -> [RiskDriver] {
        var drivers: [RiskDriver] = []

        let fastED = data.fastEdScore ?? 0
        if fastED >= 4 {
            drivers.append(RiskDriver(
                name: "fast_ed_score",
                displayName: "FAST-ED Score",
                weight: 0.50,
                category: .neurological
            ))
        }

        if data.eyeDeviation {
            drivers.append(RiskDriver(
                name: "eye_deviation",
                displayName: "Eye Deviation",
                weight: 0.25,
                category: .neurological
            ))
        }

        if data.armParesis || data.legParesis {
            drivers.append(RiskDriver(
                name: "motor_weakness",
                displayName: "Motor Weakness",
                weight: 0.20,
                category: .neurological
            ))
        }

        let gfap = data.gfapValue ?? 0
        if gfap < 500 {
            drivers.append(RiskDriver(
                name: "gfap_value",
                displayName: "GFAP Value",
                weight: -0.15, // Negative = protective
                category: .biomarker
            ))
        }

        if data.atrialFibrillation {
            drivers.append(RiskDriver(
                name: "atrial_fibrillation",
                displayName: "Atrial Fibrillation",
                weight: 0.18,
                category: .history
            ))
        }

        return drivers.sorted { abs($0.weight) > abs($1.weight) }
    }
}
