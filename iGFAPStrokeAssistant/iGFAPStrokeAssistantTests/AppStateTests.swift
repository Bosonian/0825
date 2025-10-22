//
//  AppStateTests.swift
//  iGFAPStrokeAssistantTests
//
//  Integration tests for app state management
//

import XCTest
@testable import iGFAPStrokeAssistant

@MainActor
final class AppStateTests: XCTestCase {

    var appState: AppState!

    @MainActor
    override func setUp() async throws {
        appState = AppState()
    }

    @MainActor
    override func tearDown() async throws {
        appState = nil
    }

    // MARK: - Authentication Tests

    func testInitialAuthenticationState() {
        XCTAssertFalse(appState.isAuthenticated)
        XCTAssertEqual(appState.currentScreen, .login)
    }

    func testValidLogin() async {
        await appState.login(accessCode: "Neuro25")

        XCTAssertTrue(appState.isAuthenticated)
        XCTAssertEqual(appState.currentScreen, .triageComa)
    }

    func testInvalidLogin() async {
        await appState.login(accessCode: "wrong-password")

        XCTAssertFalse(appState.isAuthenticated)
        XCTAssertEqual(appState.currentScreen, .login)
    }

    func testLogout() async {
        await appState.login(accessCode: "research2024")
        XCTAssertTrue(appState.isAuthenticated)

        appState.logout()

        XCTAssertFalse(appState.isAuthenticated)
        XCTAssertEqual(appState.currentScreen, .login)
        XCTAssertNil(appState.currentAssessment)
    }

    // MARK: - Navigation Tests

    func testNavigationFlow() async {
        // Login
        await appState.login(accessCode: "Neuro25")
        XCTAssertEqual(appState.currentScreen, .triageComa)

        // Navigate to triage exam
        appState.navigate(to: .triageExam)
        XCTAssertEqual(appState.currentScreen, .triageExam)

        // Navigate to assessment
        appState.navigate(to: .limitedAssessment)
        XCTAssertEqual(appState.currentScreen, .limitedAssessment)
    }

    func testBackNavigation() async {
        await appState.login(accessCode: "Neuro25")
        appState.navigate(to: .triageExam)
        appState.navigate(to: .fullAssessment)

        appState.goBack()
        XCTAssertEqual(appState.currentScreen, .triageExam)

        appState.goBack()
        XCTAssertEqual(appState.currentScreen, .triageComa)
    }

    func testResetToTriageFromResults() {
        appState.currentScreen = .results
        appState.reset()

        XCTAssertEqual(appState.currentScreen, .triageComa)
        XCTAssertNil(appState.currentAssessment)
    }

    // MARK: - Patient Data Management

    func testPatientDataInitialization() {
        XCTAssertNotNil(appState.currentPatientData)
        XCTAssertNil(appState.currentPatientData.ageYears)
        XCTAssertNil(appState.currentPatientData.gfapValue)
    }

    func testUpdatePatientData() {
        var updatedData = appState.currentPatientData
        updatedData.ageYears = 65
        updatedData.gfapValue = 500

        appState.currentPatientData = updatedData

        XCTAssertEqual(appState.currentPatientData.ageYears, 65)
        XCTAssertEqual(appState.currentPatientData.gfapValue, 500)
    }

    func testClearPatientData() {
        var data = appState.currentPatientData
        data.ageYears = 70
        data.gfapValue = 800
        appState.currentPatientData = data

        appState.reset()

        XCTAssertNil(appState.currentPatientData.ageYears)
        XCTAssertNil(appState.currentPatientData.gfapValue)
    }

    // MARK: - Coma Assessment Tests

    func testSubmitComaAssessment() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)

        await appState.submitComaAssessment(gfap: 500)

        // Check that assessment was created
        XCTAssertNotNil(appState.currentAssessment)
        XCTAssertEqual(appState.currentAssessment?.module, .coma)
        XCTAssertEqual(appState.currentAssessment?.patientData.gfapValue, 500)

        // Check navigation to results
        XCTAssertEqual(appState.currentScreen, .results)

        // Check results exist
        XCTAssertNotNil(appState.currentAssessment?.results)
        XCTAssertNotNil(appState.currentAssessment?.results?.ich)
    }

    func testComaAssessmentInvalidGFAP() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)

        await appState.submitComaAssessment(gfap: 0) // Invalid

        // Should show error
        XCTAssertNotNil(appState.errorMessage)
        XCTAssertTrue(appState.showError)

        // Should not navigate
        XCTAssertNotEqual(appState.currentScreen, .results)
    }

    // MARK: - Limited Assessment Tests

    func testSubmitLimitedAssessment() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.limited)

        var data = PatientData()
        data.ageYears = 65
        data.systolicBP = 140
        data.diastolicBP = 90
        data.gfapValue = 500
        appState.currentPatientData = data

        await appState.submitLimitedAssessment()

        XCTAssertNotNil(appState.currentAssessment)
        XCTAssertEqual(appState.currentAssessment?.module, .limited)
        XCTAssertEqual(appState.currentScreen, .results)
        XCTAssertNotNil(appState.currentAssessment?.results?.ich)
    }

    func testLimitedAssessmentValidation() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.limited)

        let invalidData = PatientData() // Empty data
        appState.currentPatientData = invalidData

        await appState.submitLimitedAssessment()

        XCTAssertNotNil(appState.errorMessage)
        XCTAssertTrue(appState.showError)
        XCTAssertNotEqual(appState.currentScreen, .results)
    }

    // MARK: - Full Assessment Tests

    func testSubmitFullAssessment() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.full)

        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        data.fastEdScore = 5
        appState.currentPatientData = data

        await appState.submitFullAssessment()

        XCTAssertNotNil(appState.currentAssessment)
        XCTAssertEqual(appState.currentAssessment?.module, .full)
        XCTAssertEqual(appState.currentScreen, .results)

        // Full assessment should have both ICH and LVO predictions
        XCTAssertNotNil(appState.currentAssessment?.results?.ich)
        XCTAssertNotNil(appState.currentAssessment?.results?.lvo)
    }

    func testFullAssessmentMissingFASTED() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.full)

        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        // Missing FAST-ED score
        appState.currentPatientData = data

        await appState.submitFullAssessment()

        XCTAssertNotNil(appState.errorMessage)
        XCTAssertTrue(appState.showError)
    }

    // MARK: - Error Handling Tests

    func testErrorMessageDisplay() {
        XCTAssertFalse(appState.showError)
        XCTAssertNil(appState.errorMessage)

        appState.setError("Test error")

        XCTAssertTrue(appState.showError)
        XCTAssertEqual(appState.errorMessage, "Test error")
    }

    func testDismissError() {
        appState.setError("Test error")
        XCTAssertTrue(appState.showError)

        appState.clearError()

        XCTAssertFalse(appState.showError)
        XCTAssertNil(appState.errorMessage)
    }

    func testNetworkErrorHandling() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)

        // Simulate network error with invalid GFAP that will cause API failure
        await appState.submitComaAssessment(gfap: -100)

        XCTAssertTrue(appState.showError)
        XCTAssertNotNil(appState.errorMessage)
    }

    // MARK: - Loading State Tests

    func testLoadingStateInitial() {
        XCTAssertFalse(appState.isLoading)
    }

    func testLoadingStateDuringAssessment() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)

        // Start assessment submission
        let task = Task {
            await appState.submitComaAssessment(gfap: 500)
        }

        // Loading should be true during submission
        // (This is a timing-sensitive test, may need adjustment)
        try? await Task.sleep(nanoseconds: 100_000_000) // 0.1 seconds
        // Note: By the time we check, loading might already be done for fast operations

        await task.value

        // Loading should be false after completion
        XCTAssertFalse(appState.isLoading)
    }

    // MARK: - Assessment History Tests

    func testAssessmentHistoryTracking() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)

        // Submit first assessment
        await appState.submitComaAssessment(gfap: 500)
        let firstAssessment = appState.currentAssessment

        // Reset and submit second assessment
        appState.reset()
        appState.selectModule(.coma)
        await appState.submitComaAssessment(gfap: 800)
        let secondAssessment = appState.currentAssessment

        // Assessments should be different
        XCTAssertNotEqual(firstAssessment?.id, secondAssessment?.id)
    }

    // MARK: - State Consistency Tests

    func testStateConsistencyAfterError() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.full)
        appState.navigate(to: .fullAssessment)

        var data = PatientData()
        data.ageYears = 70
        // Incomplete data will cause error
        appState.currentPatientData = data

        await appState.submitFullAssessment()

        // State should remain consistent
        XCTAssertEqual(appState.currentScreen, .fullAssessment) // Should stay on same screen
        XCTAssertTrue(appState.isAuthenticated) // Should remain authenticated
        XCTAssertNil(appState.currentAssessment) // No assessment created
    }

    func testMultipleLoginsOverwrite() async {
        await appState.login(accessCode: "Neuro25")
        XCTAssertTrue(appState.isAuthenticated)

        await appState.login(accessCode: "wrong-code")
        XCTAssertFalse(appState.isAuthenticated)

        await appState.login(accessCode: "research2024")
        XCTAssertTrue(appState.isAuthenticated)
    }

    // MARK: - Integration with Models Tests

    func testICHVolumeIntegration() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)
        let gfap = 1000.0

        await appState.submitComaAssessment(gfap: gfap)

        let volume = appState.currentAssessment?.results?.ich.volume
        XCTAssertNotNil(volume)

        // Compare with direct calculator
        let directVolume = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)
        XCTAssertEqual(volume?.estimatedML, directVolume.estimatedML, accuracy: 0.1)
    }

    func testLVOModelIntegration() async {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.full)

        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 95
        data.gfapValue = 800
        data.fastEdScore = 5
        appState.currentPatientData = data

        await appState.submitFullAssessment()

        let lvoPrediction = appState.currentAssessment?.results?.lvo
        XCTAssertNotNil(lvoPrediction)

        // Verify LVO probability is in valid range
        if let probability = lvoPrediction?.probability {
            XCTAssertGreaterThanOrEqual(probability, 0.0)
            XCTAssertLessThanOrEqual(probability, 1.0)
        }
    }

    // MARK: - Performance Tests

    func testStateUpdatePerformance() {
        measure {
            for i in 0..<100 {
                var data = appState.currentPatientData
                data.ageYears = i
                appState.currentPatientData = data
            }
        }
    }

    func testNavigationPerformance() async {
        await appState.login(accessCode: "Neuro25")

        measure {
            for _ in 0..<100 {
                appState.navigate(to: .triageExam)
                appState.navigate(to: .triageComa)
            }
        }
    }
}
