//
//  PatientDataValidationTests.swift
//  iGFAPStrokeAssistantTests
//
//  Unit tests for patient data validation
//

import XCTest
@testable import iGFAPStrokeAssistant

final class PatientDataValidationTests: XCTestCase {

    // MARK: - Coma Module Validation

    func testComaModuleValidData() {
        var data = PatientData()
        data.gfapValue = 500

        let result = data.validate(for: .coma)

        XCTAssertTrue(result.isValid)
        XCTAssertTrue(result.errors.isEmpty)
        XCTAssertNil(result.errorMessage)
    }

    func testComaModuleMissingGFAP() {
        let data = PatientData()

        let result = data.validate(for: .coma)

        XCTAssertFalse(result.isValid)
        XCTAssertFalse(result.errors.isEmpty)
        XCTAssertTrue(result.errors.contains { $0.contains("GFAP") })
    }

    func testComaModuleInvalidGFAPRange() {
        var data = PatientData()
        data.gfapValue = 20  // Below minimum

        let result = data.validate(for: .coma)

        XCTAssertFalse(result.isValid)
        XCTAssertTrue(result.errors.contains { $0.contains("29") && $0.contains("10,001") })
    }

    // MARK: - Limited Module Validation

    func testLimitedModuleValidData() {
        var data = PatientData()
        data.ageYears = 65
        data.systolicBP = 140
        data.diastolicBP = 90
        data.gfapValue = 500

        let result = data.validate(for: .limited)

        XCTAssertTrue(result.isValid)
        XCTAssertTrue(result.errors.isEmpty)
    }

    func testLimitedModuleMissingAge() {
        var data = PatientData()
        data.systolicBP = 140
        data.diastolicBP = 90
        data.gfapValue = 500

        let result = data.validate(for: .limited)

        XCTAssertFalse(result.isValid)
        XCTAssertTrue(result.errors.contains { $0.contains("Age") })
    }

    func testLimitedModuleMissingBP() {
        var data = PatientData()
        data.ageYears = 65
        data.gfapValue = 500

        let result = data.validate(for: .limited)

        XCTAssertFalse(result.isValid)
        XCTAssertTrue(result.errors.contains { $0.contains("Blood pressure") })
    }

    func testLimitedModuleInvalidBP() {
        var data = PatientData()
        data.ageYears = 65
        data.systolicBP = 90
        data.diastolicBP = 140  // Higher than systolic!
        data.gfapValue = 500

        let result = data.validate(for: .limited)

        XCTAssertFalse(result.isValid)
        XCTAssertTrue(result.errors.contains { $0.contains("Systolic") && $0.contains("greater") })
    }

    // MARK: - Full Module Validation

    func testFullModuleValidData() {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        data.fastEdScore = 5

        let result = data.validate(for: .full)

        XCTAssertTrue(result.isValid)
        XCTAssertTrue(result.errors.isEmpty)
    }

    func testFullModuleMissingFASTED() {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800

        let result = data.validate(for: .full)

        XCTAssertFalse(result.isValid)
        XCTAssertTrue(result.errors.contains { $0.contains("FAST-ED") })
    }

    func testFullModuleMultipleErrors() {
        var data = PatientData()
        // Missing everything

        let result = data.validate(for: .full)

        XCTAssertFalse(result.isValid)
        XCTAssertGreaterThanOrEqual(result.errors.count, 4)
    }

    // MARK: - Blood Pressure Validation

    func testValidBloodPressure() {
        var data = PatientData()
        data.systolicBP = 120
        data.diastolicBP = 80

        XCTAssertTrue(data.hasValidBloodPressure)
    }

    func testInvalidBloodPressure() {
        var data = PatientData()
        data.systolicBP = 80
        data.diastolicBP = 120

        XCTAssertFalse(data.hasValidBloodPressure)
    }

    func testEqualBloodPressure() {
        var data = PatientData()
        data.systolicBP = 100
        data.diastolicBP = 100

        XCTAssertFalse(data.hasValidBloodPressure)
    }

    func testNilBloodPressure() {
        let data = PatientData()

        XCTAssertTrue(data.hasValidBloodPressure)  // Nil is considered valid (not set yet)
    }

    // MARK: - Comatose Detection

    func testComatoseDetection() {
        var data = PatientData()
        data.gcs = 7

        XCTAssertTrue(data.isComatose)
    }

    func testNotComatose() {
        var data = PatientData()
        data.gcs = 8

        XCTAssertFalse(data.isComatose)
    }

    func testNilGCS() {
        let data = PatientData()

        XCTAssertFalse(data.isComatose)
    }

    // MARK: - Edge Cases

    func testBoundaryGFAPValues() {
        var data = PatientData()

        // Minimum valid
        data.gfapValue = 29
        let minResult = data.validate(for: .coma)
        XCTAssertTrue(minResult.isValid)

        // Maximum valid
        data.gfapValue = 10001
        let maxResult = data.validate(for: .coma)
        XCTAssertTrue(maxResult.isValid)

        // Just below minimum
        data.gfapValue = 28.9
        let belowResult = data.validate(for: .coma)
        XCTAssertFalse(belowResult.isValid)

        // Just above maximum
        data.gfapValue = 10001.1
        let aboveResult = data.validate(for: .coma)
        XCTAssertFalse(aboveResult.isValid)
    }

    func testEmptyPatientData() {
        let data = PatientData()

        let comaResult = data.validate(for: .coma)
        XCTAssertFalse(comaResult.isValid)

        let limitedResult = data.validate(for: .limited)
        XCTAssertFalse(limitedResult.isValid)

        let fullResult = data.validate(for: .full)
        XCTAssertFalse(fullResult.isValid)
    }

    // MARK: - Performance

    func testValidationPerformance() {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        data.fastEdScore = 5

        measure {
            for _ in 0..<1000 {
                _ = data.validate(for: .full)
            }
        }
    }
}
