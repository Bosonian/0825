//
//  ICHVolumeCalculatorTests.swift
//  iGFAPStrokeAssistantTests
//
//  Unit tests for ICH volume calculator
//

import XCTest
@testable import iGFAPStrokeAssistant

final class ICHVolumeCalculatorTests: XCTestCase {

    // MARK: - Volume Calculation Tests

    func testVolumeCalculationWithKnownValues() {
        // Test with known GFAP → Volume mappings
        let testCases: [(gfap: Double, expectedVolume: Double)] = [
            (100, 11.2),
            (500, 24.8),
            (1000, 35.1),
            (5000, 77.9)
        ]

        for (gfap, expected) in testCases {
            let result = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)
            XCTAssertEqual(result.estimatedML, expected, accuracy: 1.5,
                          "Volume for GFAP \(gfap) should be approximately \(expected)ml")
        }
    }

    func testVolumeCalculationFormula() {
        // Test the actual formula: log10(V) = 0.0192 + 0.4533 * log10(GFAP)
        let gfap = 1000.0
        let expectedLogVolume = 0.0192 + 0.4533 * log10(gfap)
        let expectedVolume = pow(10.0, expectedLogVolume)

        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)

        XCTAssertEqual(result.estimatedML, expectedVolume, accuracy: 0.1,
                      "Formula calculation should match expected value")
    }

    func testZeroGFAPHandling() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: 0)

        XCTAssertEqual(result.estimatedML, 0)
        XCTAssertEqual(result.severity, .small)
        XCTAssertEqual(result.mortalityRange, "N/A")
    }

    func testNegativeGFAPHandling() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: -100)

        XCTAssertEqual(result.estimatedML, 0)
        XCTAssertEqual(result.severity, .small)
    }

    // MARK: - Severity Classification Tests

    func testSmallVolumeSeverity() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: 50)

        XCTAssertLessThan(result.estimatedML, 10)
        XCTAssertEqual(result.severity, .small)
        XCTAssertEqual(result.mortalityRange, "5-10%")
    }

    func testModerateVolumeSeverity() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: 200)

        XCTAssertGreaterThanOrEqual(result.estimatedML, 10)
        XCTAssertLessThan(result.estimatedML, 20)
        XCTAssertEqual(result.severity, .moderate)
        XCTAssertEqual(result.mortalityRange, "10-19%")
    }

    func testLargeVolumeSeverity() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: 500)

        XCTAssertGreaterThanOrEqual(result.estimatedML, 20)
        XCTAssertLessThan(result.estimatedML, 30)
        XCTAssertEqual(result.severity, .large)
        XCTAssertEqual(result.mortalityRange, "10-19%")
    }

    func testCriticalVolumeSeverity() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: 2000)

        XCTAssertGreaterThanOrEqual(result.estimatedML, 30)
        XCTAssertEqual(result.severity, .critical)
    }

    // MARK: - Mortality Estimation Tests

    func testMortalityRanges() {
        let testCases: [(gfap: Double, expectedMortality: String)] = [
            (50, "5-10%"),      // Small volume
            (200, "10-19%"),    // Moderate volume
            (500, "10-19%"),    // Large volume (still 10-19%)
            (1500, "19-44%"),   // 30-50ml range
            (3000, "44-91%"),   // 50-60ml range
            (5000, "91-100%")   // >60ml range
        ]

        for (gfap, expectedMortality) in testCases {
            let result = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)
            XCTAssertEqual(result.mortalityRange, expectedMortality,
                          "GFAP \(gfap) should result in mortality range \(expectedMortality)")
        }
    }

    // MARK: - GFAP Validation Tests

    func testValidGFAPRange() {
        let (isValid, warning) = ICHVolumeCalculator.validateGFAP(500)

        XCTAssertTrue(isValid)
        XCTAssertNil(warning)
    }

    func testGFAPTooLow() {
        let (isValid, warning) = ICHVolumeCalculator.validateGFAP(20)

        XCTAssertFalse(isValid)
        XCTAssertNotNil(warning)
        XCTAssertTrue(warning?.contains("too low") ?? false)
    }

    func testGFAPTooHigh() {
        let (isValid, warning) = ICHVolumeCalculator.validateGFAP(15000)

        XCTAssertFalse(isValid)
        XCTAssertNotNil(warning)
        XCTAssertTrue(warning?.contains("exceeds") ?? false)
    }

    func testGFAPHighWarning() {
        let (isValid, warning) = ICHVolumeCalculator.validateGFAP(9000)

        XCTAssertTrue(isValid)
        XCTAssertNotNil(warning)
        XCTAssertTrue(warning?.contains("Extremely high") ?? false)
    }

    func testGFAPBoundaries() {
        // Test exact boundaries
        let minValid = ICHVolumeCalculator.validateGFAP(29)
        XCTAssertTrue(minValid.isValid)

        let maxValid = ICHVolumeCalculator.validateGFAP(10001)
        XCTAssertTrue(maxValid.isValid)

        let belowMin = ICHVolumeCalculator.validateGFAP(28.9)
        XCTAssertFalse(belowMin.isValid)

        let aboveMax = ICHVolumeCalculator.validateGFAP(10001.1)
        XCTAssertFalse(aboveMax.isValid)
    }

    // MARK: - Edge Cases

    func testMinimumValidGFAP() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: 29)

        XCTAssertGreaterThan(result.estimatedML, 0)
        XCTAssertEqual(result.severity, .small)
    }

    func testMaximumValidGFAP() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: 10001)

        XCTAssertGreaterThan(result.estimatedML, 0)
        XCTAssertEqual(result.severity, .critical)
    }

    func testVolumeFormattedString() {
        let result = ICHVolumeCalculator.estimateVolume(fromGFAP: 500)

        XCTAssertTrue(result.formattedVolume.contains("mL"))
        XCTAssertTrue(result.formattedVolume.contains("."))
    }

    // MARK: - Performance Tests

    func testCalculationPerformance() {
        measure {
            for _ in 0..<1000 {
                _ = ICHVolumeCalculator.estimateVolume(fromGFAP: Double.random(in: 29...10001))
            }
        }
    }
}
