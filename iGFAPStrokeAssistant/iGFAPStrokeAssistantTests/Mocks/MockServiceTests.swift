//
//  MockServiceTests.swift
//  iGFAPStrokeAssistantTests
//
//  Tests using mock service for offline testing
//

import XCTest
@testable import iGFAPStrokeAssistant

@MainActor
final class MockServiceTests: XCTestCase {

    var mockService: MockPredictionService!
    var appState: AppState!

    @MainActor
    override func setUp() async throws {
        mockService = MockPredictionService()
        appState = AppState(predictionService: mockService)
    }

    @MainActor
    override func tearDown() async throws {
        mockService = nil
        appState = nil
    }

    // MARK: - Mock Service Basic Tests

    func testMockServiceComaICH() async throws {
        let result = try await mockService.predictComaICH(gfap: 1000)

        XCTAssertGreaterThanOrEqual(result.probability, 0.0)
        XCTAssertLessThanOrEqual(result.probability, 1.0)
        XCTAssertNotNil(result.volume)
        XCTAssertFalse(result.drivers.isEmpty)
        XCTAssertEqual(await mockService.comaICHCallCount, 1)
        XCTAssertEqual(await mockService.lastComaGFAP, 1000)
    }

    func testMockServiceLimitedICH() async throws {
        var data = PatientData()
        data.ageYears = 65
        data.systolicBP = 140
        data.diastolicBP = 90
        data.gfapValue = 500

        let result = try await mockService.predictLimitedICH(data)

        XCTAssertGreaterThanOrEqual(result.probability, 0.0)
        XCTAssertLessThanOrEqual(result.probability, 1.0)
        XCTAssertEqual(await mockService.limitedICHCallCount, 1)
    }

    func testMockServiceFullStroke() async throws {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        data.fastEdScore = 5

        let results = try await mockService.predictFullStroke(data)

        XCTAssertNotNil(results.ich)
        XCTAssertNotNil(results.lvo)
        XCTAssertEqual(await mockService.fullStrokeCallCount, 1)
    }

    // MARK: - Mock Service Error Simulation

    func testMockServiceSimulateError() async throws {
        await mockService.reset()
        await mockService.setShouldSucceed(false)

        do {
            _ = try await mockService.predictComaICH(gfap: 500)
            XCTFail("Should throw error")
        } catch {
            XCTAssertTrue(error is APIError)
        }
    }

    func testMockServiceCustomError() async throws {
        await mockService.reset()
        let customError = APIError.timeout
        await mockService.setCustomError(customError)
        await mockService.setShouldSucceed(false)

        do {
            _ = try await mockService.predictComaICH(gfap: 500)
            XCTFail("Should throw error")
        } catch let error as APIError {
            if case .timeout = error {
                // Success
            } else {
                XCTFail("Wrong error type")
            }
        }
    }

    // MARK: - Mock Service Validation

    func testMockServiceValidatesGFAP() async throws {
        do {
            _ = try await mockService.predictComaICH(gfap: 0)
            XCTFail("Should throw validation error")
        } catch let error as APIError {
            if case .validationError = error {
                // Success
            } else {
                XCTFail("Wrong error type")
            }
        }
    }

    func testMockServiceValidatesPatientData() async throws {
        let invalidData = PatientData() // Empty data

        do {
            _ = try await mockService.predictLimitedICH(invalidData)
            XCTFail("Should throw validation error")
        } catch let error as APIError {
            if case .validationError = error {
                // Success
            } else {
                XCTFail("Wrong error type")
            }
        }
    }

    // MARK: - AppState with Mock Service

    func testAppStateWithMockService() async throws {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)

        await appState.submitComaAssessment(gfap: 1000)

        XCTAssertEqual(appState.currentScreen, .results)
        XCTAssertNotNil(appState.currentAssessment)
        XCTAssertEqual(await mockService.comaICHCallCount, 1)
    }

    func testAppStateMultipleAssessmentsWithMock() async throws {
        await appState.login(accessCode: "Neuro25")

        // First assessment
        appState.selectModule(.coma)
        await appState.submitComaAssessment(gfap: 500)
        XCTAssertEqual(await mockService.comaICHCallCount, 1)

        // Second assessment
        appState.reset()
        appState.navigate(to: .triageExam)
        appState.selectModule(.limited)
        var data = PatientData()
        data.ageYears = 65
        data.systolicBP = 140
        data.diastolicBP = 90
        data.gfapValue = 600
        appState.currentPatientData = data
        await appState.submitLimitedAssessment()
        XCTAssertEqual(await mockService.limitedICHCallCount, 1)

        // Verify both calls were made
        XCTAssertEqual(await mockService.comaICHCallCount, 1)
        XCTAssertEqual(await mockService.limitedICHCallCount, 1)
        XCTAssertEqual(appState.assessmentHistory.count, 2)
    }

    // MARK: - Mock Service Performance

    func testMockServiceWithDelay() async throws {
        await mockService.setDelayMilliseconds(500) // 500ms delay

        let start = Date()
        _ = try await mockService.predictComaICH(gfap: 500)
        let elapsed = Date().timeIntervalSince(start)

        XCTAssertGreaterThan(elapsed, 0.4) // Should take at least 400ms
    }

    func testMockServiceWithoutDelay() async throws {
        await mockService.setDelayMilliseconds(0) // No delay

        let start = Date()
        _ = try await mockService.predictComaICH(gfap: 500)
        let elapsed = Date().timeIntervalSince(start)

        XCTAssertLessThan(elapsed, 0.1) // Should be very fast
    }

    // MARK: - Mock Driver Generation

    func testMockGeneratesRealisticDrivers() async throws {
        let result = try await mockService.predictComaICH(gfap: 2000)

        // Should have at least 2 drivers
        XCTAssertGreaterThanOrEqual(result.drivers.count, 2)

        // Drivers should be sorted by importance
        for i in 0..<(result.drivers.count - 1) {
            let currentWeight = abs(result.drivers[i].weight)
            let nextWeight = abs(result.drivers[i + 1].weight)
            XCTAssertGreaterThanOrEqual(currentWeight, nextWeight)
        }

        // Should have GFAP as a driver
        let hasGFAPDriver = result.drivers.contains { $0.name == "gfap_value" }
        XCTAssertTrue(hasGFAPDriver)
    }

    func testMockLVODriversIncludeFASTED() async throws {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        data.fastEdScore = 6 // High FAST-ED

        let results = try await mockService.predictFullStroke(data)

        // Should have FAST-ED as a driver for LVO
        let hasFASTEDDriver = results.lvo!.drivers.contains { $0.name == "fast_ed_score" }
        XCTAssertTrue(hasFASTEDDriver)
    }

    // MARK: - Mock Probability Calculations

    func testMockICHProbabilityIncreasesWithGFAP() async throws {
        let lowGFAPResult = try await mockService.predictComaICH(gfap: 100)
        let highGFAPResult = try await mockService.predictComaICH(gfap: 5000)

        XCTAssertLessThan(lowGFAPResult.probability, highGFAPResult.probability)
    }

    func testMockLVOProbabilityIncreasesWithFASTED() async throws {
        var lowFASTEDData = PatientData()
        lowFASTEDData.ageYears = 70
        lowFASTEDData.systolicBP = 150
        lowFASTEDData.diastolicBP = 95
        lowFASTEDData.gfapValue = 800
        lowFASTEDData.fastEdScore = 2

        var highFASTEDData = lowFASTEDData
        highFASTEDData.fastEdScore = 8

        let lowResult = try await mockService.predictFullStroke(lowFASTEDData)
        let highResult = try await mockService.predictFullStroke(highFASTEDData)

        XCTAssertLessThan(lowResult.lvo!.probability, highResult.lvo!.probability)
    }

    // MARK: - Reset Functionality

    func testMockServiceReset() async throws {
        // Make some calls
        _ = try await mockService.predictComaICH(gfap: 500)
        XCTAssertEqual(await mockService.comaICHCallCount, 1)

        // Reset
        await mockService.reset()

        // Counts should be reset
        XCTAssertEqual(await mockService.comaICHCallCount, 0)
        XCTAssertNil(await mockService.lastComaGFAP)
    }
}

// MARK: - Actor Helpers for Testing

extension MockPredictionService {
    func setShouldSucceed(_ value: Bool) {
        self.shouldSucceed = value
    }

    func setDelayMilliseconds(_ value: Int) {
        self.delayMilliseconds = value
    }

    func setCustomError(_ error: Error?) {
        self.customError = error
    }
}
