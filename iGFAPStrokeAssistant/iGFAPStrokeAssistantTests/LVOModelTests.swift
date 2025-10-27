//
//  LVOModelTests.swift
//  iGFAPStrokeAssistantTests
//
//  Unit tests for LVO prediction model
//

import XCTest
@testable import iGFAPStrokeAssistant

final class LVOModelTests: XCTestCase {

    // MARK: - Probability Calculation Tests

    func testProbabilityRange() {
        // Test various GFAP and FAST-ED combinations
        let testCases: [(gfap: Double, fastED: Int)] = [
            (100, 0),
            (500, 4),
            (1000, 7),
            (5000, 9)
        ]

        for (gfap, fastED) in testCases {
            let probability = LVOModel.probability(gfap: gfap, fastED: fastED)

            XCTAssertGreaterThanOrEqual(probability, 0.0,
                                       "Probability should be >= 0")
            XCTAssertLessThanOrEqual(probability, 1.0,
                                    "Probability should be <= 1")
        }
    }

    func testHighFASTEDScoreIncreasesRisk() {
        let gfap = 1000.0

        let lowFASTED = LVOModel.probability(gfap: gfap, fastED: 0)
        let midFASTED = LVOModel.probability(gfap: gfap, fastED: 4)
        let highFASTED = LVOModel.probability(gfap: gfap, fastED: 9)

        XCTAssertLessThan(lowFASTED, midFASTED,
                         "Higher FAST-ED should increase probability")
        XCTAssertLessThan(midFASTED, highFASTED,
                         "Higher FAST-ED should increase probability")
    }

    func testGFAPEffect() {
        let fastED = 4

        let lowGFAP = LVOModel.probability(gfap: 100, fastED: fastED)
        let midGFAP = LVOModel.probability(gfap: 1000, fastED: fastED)
        let highGFAP = LVOModel.probability(gfap: 5000, fastED: fastED)

        // GFAP has negative coefficient, so higher GFAP should decrease LVO risk
        XCTAssertGreaterThan(lowGFAP, highGFAP,
                           "Higher GFAP should decrease LVO probability (negative coefficient)")
    }

    // MARK: - Classification Tests

    func testClassificationThreshold() {
        // Test around the threshold (0.333333)
        let testCases: [(gfap: Double, fastED: Int, expectedClass: Int)] = [
            (100, 9, 1),    // High FAST-ED, low GFAP = high risk
            (5000, 0, 0),   // Low FAST-ED, high GFAP = low risk
            (1000, 5, -1)   // Middle ground - don't test exact value
        ]

        for (gfap, fastED, expected) in testCases {
            let classification = LVOModel.classification(gfap: gfap, fastED: fastED)

            if expected != -1 {
                XCTAssertEqual(classification, expected,
                             "GFAP: \(gfap), FAST-ED: \(fastED) should classify as \(expected)")
            } else {
                // Just ensure it's 0 or 1
                XCTAssertTrue(classification == 0 || classification == 1)
            }
        }
    }

    func testHighRiskClassification() {
        // High FAST-ED, low GFAP should be high risk (class 1)
        let result = LVOModel.classification(gfap: 100, fastED: 9)
        XCTAssertEqual(result, 1, "High FAST-ED with low GFAP should be classified as LVO")
    }

    func testLowRiskClassification() {
        // Low FAST-ED, high GFAP should be low risk (class 0)
        let result = LVOModel.classification(gfap: 10000, fastED: 0)
        XCTAssertEqual(result, 0, "Low FAST-ED with high GFAP should not be classified as LVO")
    }

    // MARK: - Detailed Prediction Tests

    func testDetailedPrediction() {
        let result = LVOModel.predict(gfap: 500, fastED: 5)

        // Check structure
        XCTAssertGreaterThanOrEqual(result.probability, 0.0)
        XCTAssertLessThanOrEqual(result.probability, 1.0)
        XCTAssertTrue(result.classification == 0 || result.classification == 1)
        XCTAssertEqual(result.gfapInput, 500)
        XCTAssertEqual(result.fastEDInput, 5)
    }

    func testTransformedValues() {
        let result = LVOModel.predict(gfap: 1000, fastED: 4)

        // Verify transformed values exist
        XCTAssertNotNil(result.transformedValues.gfapTransformed)
        XCTAssertNotNil(result.transformedValues.gfapStandardized)
        XCTAssertNotNil(result.transformedValues.fastStandardized)
        XCTAssertNotNil(result.transformedValues.logit)
        XCTAssertNotNil(result.transformedValues.calibratedLogit)
    }

    func testFASTEDClamping() {
        // Test values outside normal range get clamped
        let tooHigh = LVOModel.predict(gfap: 1000, fastED: 20)
        let normal = LVOModel.predict(gfap: 1000, fastED: 9)

        XCTAssertEqual(tooHigh.fastEDInput, 16, "FAST-ED should be clamped to max")
        XCTAssertTrue(tooHigh.warnings.contains { $0.contains("clamped") },
                     "Should warn about clamping")

        // Negative value
        let tooLow = LVOModel.predict(gfap: 1000, fastED: -5)
        XCTAssertEqual(tooLow.fastEDInput, 0, "FAST-ED should be clamped to min")
    }

    func testWarningsForExtremeGFAP() {
        let result = LVOModel.predict(gfap: 60000, fastED: 5)

        XCTAssertFalse(result.warnings.isEmpty, "Should have warning for extreme GFAP")
        XCTAssertTrue(result.warnings.contains { $0.contains("exceeds") })
    }

    // MARK: - Edge Cases

    func testZeroFASTED() {
        let result = LVOModel.probability(gfap: 1000, fastED: 0)

        XCTAssertGreaterThanOrEqual(result, 0.0)
        XCTAssertLessThanOrEqual(result, 1.0)
    }

    func testMaxFASTED() {
        let result = LVOModel.probability(gfap: 1000, fastED: 9)

        XCTAssertGreaterThanOrEqual(result, 0.0)
        XCTAssertLessThanOrEqual(result, 1.0)
    }

    func testMinimumGFAP() {
        let result = LVOModel.probability(gfap: 29, fastED: 5)

        XCTAssertGreaterThanOrEqual(result, 0.0)
        XCTAssertLessThanOrEqual(result, 1.0)
    }

    func testMaximumGFAP() {
        let result = LVOModel.probability(gfap: 10001, fastED: 5)

        XCTAssertGreaterThanOrEqual(result, 0.0)
        XCTAssertLessThanOrEqual(result, 1.0)
    }

    // MARK: - Consistency Tests

    func testDeterministicResults() {
        // Same inputs should always give same outputs
        let gfap = 1234.0
        let fastED = 6

        let result1 = LVOModel.probability(gfap: gfap, fastED: fastED)
        let result2 = LVOModel.probability(gfap: gfap, fastED: fastED)

        XCTAssertEqual(result1, result2, accuracy: 0.0000001,
                      "Same inputs should produce same results")
    }

    func testPredictAndProbabilityMatch() {
        let gfap = 800.0
        let fastED = 7

        let probability = LVOModel.probability(gfap: gfap, fastED: fastED)
        let prediction = LVOModel.predict(gfap: gfap, fastED: fastED)

        XCTAssertEqual(probability, prediction.probability, accuracy: 0.0000001,
                      "Probability function and predict function should match")
    }

    // MARK: - Performance Tests

    func testCalculationPerformance() {
        measure {
            for _ in 0..<1000 {
                let gfap = Double.random(in: 29...10001)
                let fastED = Int.random(in: 0...9)
                _ = LVOModel.probability(gfap: gfap, fastED: fastED)
            }
        }
    }

    func testDetailedPredictionPerformance() {
        measure {
            for _ in 0..<100 {
                let gfap = Double.random(in: 29...10001)
                let fastED = Int.random(in: 0...9)
                _ = LVOModel.predict(gfap: gfap, fastED: fastED)
            }
        }
    }
}
