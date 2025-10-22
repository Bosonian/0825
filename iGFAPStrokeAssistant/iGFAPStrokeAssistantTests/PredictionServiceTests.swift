//
//  PredictionServiceTests.swift
//  iGFAPStrokeAssistantTests
//
//  Integration tests for prediction service
//

import XCTest
@testable import iGFAPStrokeAssistant

final class PredictionServiceTests: XCTestCase {

    var service: PredictionService!

    override func setUp() async throws {
        service = PredictionService()
    }

    override func tearDown() async throws {
        service = nil
    }

    // MARK: - Coma ICH Prediction Tests

    func testComaICHPredictionValidInput() async throws {
        let gfap = 500.0

        let result = try await service.predictComaICH(gfap: gfap)

        XCTAssertGreaterThanOrEqual(result.probability, 0.0)
        XCTAssertLessThanOrEqual(result.probability, 1.0)
        XCTAssertNotNil(result.volume)
        XCTAssertFalse(result.drivers.isEmpty, "Should have risk drivers")
    }

    func testComaICHPredictionBoundaryValues() async throws {
        // Test minimum valid GFAP
        let minResult = try await service.predictComaICH(gfap: 29)
        XCTAssertGreaterThanOrEqual(minResult.probability, 0.0)
        XCTAssertLessThanOrEqual(minResult.probability, 1.0)

        // Test maximum valid GFAP
        let maxResult = try await service.predictComaICH(gfap: 10001)
        XCTAssertGreaterThanOrEqual(maxResult.probability, 0.0)
        XCTAssertLessThanOrEqual(maxResult.probability, 1.0)
    }

    func testComaICHInvalidGFAPThrows() async throws {
        do {
            _ = try await service.predictComaICH(gfap: 0)
            XCTFail("Should throw error for invalid GFAP")
        } catch {
            // Expected error
            XCTAssertTrue(error is APIError)
        }
    }

    // MARK: - Limited ICH Prediction Tests

    func testLimitedICHPredictionValidData() async throws {
        var data = PatientData()
        data.ageYears = 65
        data.systolicBP = 140
        data.diastolicBP = 90
        data.gfapValue = 500

        let result = try await service.predictLimitedICH(data)

        XCTAssertGreaterThanOrEqual(result.probability, 0.0)
        XCTAssertLessThanOrEqual(result.probability, 1.0)
        XCTAssertNotNil(result.volume)
        XCTAssertFalse(result.drivers.isEmpty)
    }

    func testLimitedICHPredictionMissingData() async throws {
        let data = PatientData() // Empty data

        do {
            _ = try await service.predictLimitedICH(data)
            XCTFail("Should throw validation error for missing data")
        } catch {
            XCTAssertTrue(error is APIError)
        }
    }

    func testLimitedICHPredictionInvalidBP() async throws {
        var data = PatientData()
        data.ageYears = 65
        data.systolicBP = 90
        data.diastolicBP = 140 // Invalid: higher than systolic
        data.gfapValue = 500

        do {
            _ = try await service.predictLimitedICH(data)
            XCTFail("Should throw validation error for invalid BP")
        } catch {
            XCTAssertTrue(error is APIError)
        }
    }

    // MARK: - Full Stroke Prediction Tests

    func testFullStrokePredictionValidData() async throws {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        data.fastEdScore = 5

        let result = try await service.predictFullStroke(data)

        XCTAssertNotNil(result.ichPrediction)
        XCTAssertNotNil(result.lvoPrediction)
        XCTAssertNotNil(result.recommendation)
    }

    func testFullStrokePredictionMissingFASTED() async throws {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        // Missing FAST-ED score

        do {
            _ = try await service.predictFullStroke(data)
            XCTFail("Should throw validation error for missing FAST-ED")
        } catch {
            XCTAssertTrue(error is APIError)
        }
    }

    // MARK: - Risk Driver Tests

    func testRiskDriversStructure() async throws {
        let result = try await service.predictComaICH(gfap: 500)

        for driver in result.drivers {
            XCTAssertFalse(driver.name.isEmpty, "Driver should have name")
            XCTAssertFalse(driver.displayName.isEmpty, "Driver should have display name")
            XCTAssertNotEqual(driver.weight, 0.0, "Driver should have non-zero weight")
        }
    }

    func testRiskDriversSorted() async throws {
        let result = try await service.predictComaICH(gfap: 500)

        // Drivers should be sorted by absolute weight (importance)
        for i in 0..<(result.drivers.count - 1) {
            let currentWeight = abs(result.drivers[i].weight)
            let nextWeight = abs(result.drivers[i + 1].weight)
            XCTAssertGreaterThanOrEqual(currentWeight, nextWeight,
                                       "Drivers should be sorted by absolute weight")
        }
    }

    // MARK: - Volume Integration Tests

    func testVolumeIncludedInICHPrediction() async throws {
        let result = try await service.predictComaICH(gfap: 1000)

        XCTAssertNotNil(result.volume, "ICH prediction should include volume estimate")
        XCTAssertGreaterThan(result.volume!.estimatedML, 0)
    }

    func testVolumeMatchesCalculator() async throws {
        let gfap = 1000.0
        let prediction = try await service.predictComaICH(gfap: gfap)
        let directCalculation = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)

        XCTAssertEqual(prediction.volume?.estimatedML, directCalculation.estimatedML, accuracy: 0.1,
                      "Service volume should match calculator")
        XCTAssertEqual(prediction.volume?.severity, directCalculation.severity,
                      "Severity should match")
    }

    // MARK: - Error Handling Tests

    func testNetworkErrorHandling() async throws {
        // Test with invalid configuration
        let badService = PredictionService(configuration: APIConfiguration(
            baseURL: URL(string: "https://invalid-url-that-does-not-exist.com")!,
            timeout: 1.0
        ))

        do {
            _ = try await badService.predictComaICH(gfap: 500)
            XCTFail("Should throw network error")
        } catch {
            XCTAssertTrue(error is APIError)
        }
    }

    func testTimeoutHandling() async throws {
        // Test with very short timeout
        let timeoutService = PredictionService(configuration: APIConfiguration(
            baseURL: URL(string: "https://httpstat.us/200?sleep=5000")!,
            timeout: 0.1
        ))

        do {
            _ = try await timeoutService.predictComaICH(gfap: 500)
            XCTFail("Should throw timeout error")
        } catch {
            XCTAssertTrue(error is APIError)
        }
    }

    // MARK: - Consistency Tests

    func testDeterministicResults() async throws {
        let gfap = 1234.0

        let result1 = try await service.predictComaICH(gfap: gfap)
        let result2 = try await service.predictComaICH(gfap: gfap)

        // Same input should give same output (deterministic)
        XCTAssertEqual(result1.probability, result2.probability, accuracy: 0.0001,
                      "Same input should produce same probability")
        XCTAssertEqual(result1.volume?.estimatedML, result2.volume?.estimatedML, accuracy: 0.1,
                      "Same input should produce same volume")
    }

    // MARK: - Concurrency Tests

    func testConcurrentRequests() async throws {
        // Test that actor isolation works correctly with concurrent requests
        await withTaskGroup(of: Void.self) { group in
            for i in 0..<10 {
                group.addTask {
                    let gfap = Double(100 + i * 100)
                    do {
                        let result = try await self.service.predictComaICH(gfap: gfap)
                        XCTAssertGreaterThanOrEqual(result.probability, 0.0)
                        XCTAssertLessThanOrEqual(result.probability, 1.0)
                    } catch {
                        XCTFail("Concurrent request failed: \(error)")
                    }
                }
            }
        }
    }

    // MARK: - Performance Tests

    func testComaICHPredictionPerformance() {
        measure {
            Task {
                do {
                    _ = try await service.predictComaICH(gfap: 500)
                } catch {
                    XCTFail("Performance test failed: \(error)")
                }
            }
        }
    }

    func testFullStrokePredictionPerformance() {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        data.fastEdScore = 5

        measure {
            Task {
                do {
                    _ = try await service.predictFullStroke(data)
                } catch {
                    XCTFail("Performance test failed: \(error)")
                }
            }
        }
    }
}
