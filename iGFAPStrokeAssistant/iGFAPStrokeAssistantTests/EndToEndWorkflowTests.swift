//
//  EndToEndWorkflowTests.swift
//  iGFAPStrokeAssistantTests
//
//  End-to-end workflow tests for complete user journeys
//

import XCTest
@testable import iGFAPStrokeAssistant

@MainActor
final class EndToEndWorkflowTests: XCTestCase {

    var appState: AppState!

    @MainActor
    override func setUp() async throws {
        appState = AppState()
    }

    @MainActor
    override func tearDown() async throws {
        appState = nil
    }

    // MARK: - Complete Coma Module Workflow

    func testCompleteComaWorkflow() async throws {
        // Step 1: User lands on login screen
        XCTAssertEqual(appState.currentScreen, .login)
        XCTAssertFalse(appState.isAuthenticated)

        // Step 2: User enters access code and logs in
        await appState.login(accessCode: "Neuro25")
        XCTAssertTrue(appState.isAuthenticated)
        XCTAssertEqual(appState.currentScreen, .triageComa)

        // Step 3: User sees triage question: "Is patient comatose (GCS < 8)?"
        // User clicks "Yes" → navigates to coma assessment
        appState.selectModule(.coma)
        XCTAssertEqual(appState.currentScreen, .comaAssessment)

        // Step 4: User enters GFAP value
        let gfapValue = 1500.0

        // Step 5: User submits coma assessment
        await appState.submitComaAssessment(gfap: gfapValue)

        // Step 6: Verify navigation to results
        XCTAssertEqual(appState.currentScreen, .results)

        // Step 7: Verify assessment was created
        XCTAssertNotNil(appState.currentAssessment)
        XCTAssertEqual(appState.currentAssessment?.module, .coma)

        // Step 8: Verify patient data was saved
        XCTAssertEqual(appState.currentAssessment?.patientData.gfapValue, gfapValue)

        // Step 9: Verify results exist
        guard let results = appState.currentAssessment?.results else {
            XCTFail("Results should exist")
            return
        }

        // Step 10: Verify ICH prediction
        XCTAssertGreaterThanOrEqual(results.ich.probability, 0.0)
        XCTAssertLessThanOrEqual(results.ich.probability, 1.0)

        // Step 11: Verify ICH volume was calculated
        XCTAssertNotNil(results.ich.volume)
        XCTAssertGreaterThan(results.ich.volume!.estimatedML, 0)

        // Step 12: Verify risk drivers exist
        XCTAssertFalse(results.ich.drivers.isEmpty)

        // Step 13: Verify assessment was added to history
        XCTAssertEqual(appState.assessmentHistory.count, 1)

        // Step 14: User can start new assessment
        appState.reset()
        XCTAssertEqual(appState.currentScreen, .triageComa)
        XCTAssertNil(appState.currentAssessment)
    }

    // MARK: - Complete Limited Module Workflow

    func testCompleteLimitedWorkflow() async throws {
        // Login
        await appState.login(accessCode: "research2024")
        XCTAssertEqual(appState.currentScreen, .triageComa)

        // Triage: Patient is NOT comatose
        appState.navigate(to: .triageExam)
        XCTAssertEqual(appState.currentScreen, .triageExam)

        // Triage 2: Patient CANNOT be reliably examined
        appState.selectModule(.limited)
        XCTAssertEqual(appState.currentScreen, .limitedAssessment)

        // User enters limited data
        var data = PatientData()
        data.ageYears = 72
        data.systolicBP = 165
        data.diastolicBP = 98
        data.gfapValue = 850
        data.vigilanceReduction = true
        appState.currentPatientData = data

        // Submit assessment
        await appState.submitLimitedAssessment()

        // Verify results screen
        XCTAssertEqual(appState.currentScreen, .results)

        // Verify assessment
        guard let assessment = appState.currentAssessment else {
            XCTFail("Assessment should exist")
            return
        }

        XCTAssertEqual(assessment.module, .limited)
        XCTAssertNotNil(assessment.results)

        // Verify ICH prediction
        let ichPrediction = assessment.results!.ich
        XCTAssertGreaterThanOrEqual(ichPrediction.probability, 0.0)
        XCTAssertLessThanOrEqual(ichPrediction.probability, 1.0)

        // Limited module should NOT have LVO prediction
        XCTAssertNil(assessment.results!.lvo)

        // Verify patient data was preserved
        XCTAssertEqual(assessment.patientData.ageYears, 72)
        XCTAssertEqual(assessment.patientData.gfapValue, 850)
        XCTAssertTrue(assessment.patientData.vigilanceReduction)
    }

    // MARK: - Complete Full Module Workflow

    func testCompleteFullWorkflow() async throws {
        // Login
        await appState.login(accessCode: "Neuro25")

        // Triage: Patient is NOT comatose
        appState.navigate(to: .triageExam)

        // Triage 2: Patient CAN be reliably examined
        appState.selectModule(.full)
        XCTAssertEqual(appState.currentScreen, .fullAssessment)

        // User enters comprehensive data
        var data = PatientData()
        data.ageYears = 68
        data.systolicBP = 155
        data.diastolicBP = 92
        data.gfapValue = 1200
        data.fastEdScore = 6
        data.headache = true
        data.vigilanceReduction = false
        data.armParesis = true
        data.legParesis = true
        data.eyeDeviation = true
        data.atrialFibrillation = false
        data.anticoagulated = false
        data.antiplatelets = true
        appState.currentPatientData = data

        // Submit assessment
        await appState.submitFullAssessment()

        // Verify results
        XCTAssertEqual(appState.currentScreen, .results)

        guard let assessment = appState.currentAssessment else {
            XCTFail("Assessment should exist")
            return
        }

        XCTAssertEqual(assessment.module, .full)

        // Verify both ICH and LVO predictions exist
        guard let results = assessment.results else {
            XCTFail("Results should exist")
            return
        }

        // Check ICH prediction
        XCTAssertGreaterThanOrEqual(results.ich.probability, 0.0)
        XCTAssertLessThanOrEqual(results.ich.probability, 1.0)
        XCTAssertNotNil(results.ich.volume)

        // Check LVO prediction
        XCTAssertNotNil(results.lvo)
        XCTAssertGreaterThanOrEqual(results.lvo!.probability, 0.0)
        XCTAssertLessThanOrEqual(results.lvo!.probability, 1.0)

        // Verify risk drivers for both predictions
        XCTAssertFalse(results.ich.drivers.isEmpty)
        XCTAssertFalse(results.lvo!.drivers.isEmpty)

        // Verify all patient data was preserved
        XCTAssertEqual(assessment.patientData.fastEdScore, 6)
        XCTAssertTrue(assessment.patientData.armParesis)
        XCTAssertTrue(assessment.patientData.eyeDeviation)
    }

    // MARK: - Multiple Assessment Workflow

    func testMultipleAssessmentsWorkflow() async throws {
        await appState.login(accessCode: "Neuro25")

        // First assessment - Coma module
        appState.selectModule(.coma)
        await appState.submitComaAssessment(gfap: 500)
        XCTAssertEqual(appState.assessmentHistory.count, 1)
        let firstAssessmentID = appState.currentAssessment?.id

        // Reset for new patient
        appState.reset()
        XCTAssertEqual(appState.currentScreen, .triageComa)

        // Second assessment - Limited module
        appState.navigate(to: .triageExam)
        appState.selectModule(.limited)
        var limitedData = PatientData()
        limitedData.ageYears = 60
        limitedData.systolicBP = 140
        limitedData.diastolicBP = 85
        limitedData.gfapValue = 600
        appState.currentPatientData = limitedData
        await appState.submitLimitedAssessment()
        XCTAssertEqual(appState.assessmentHistory.count, 2)
        let secondAssessmentID = appState.currentAssessment?.id

        // Third assessment - Full module
        appState.reset()
        appState.navigate(to: .triageExam)
        appState.selectModule(.full)
        var fullData = PatientData()
        fullData.ageYears = 70
        fullData.systolicBP = 160
        fullData.diastolicBP = 95
        fullData.gfapValue = 900
        fullData.fastEdScore = 7
        appState.currentPatientData = fullData
        await appState.submitFullAssessment()
        XCTAssertEqual(appState.assessmentHistory.count, 3)

        // Verify all assessments have unique IDs
        XCTAssertNotEqual(firstAssessmentID, secondAssessmentID)
        XCTAssertNotEqual(secondAssessmentID, appState.currentAssessment?.id)
    }

    // MARK: - Error Recovery Workflow

    func testErrorRecoveryWorkflow() async throws {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.full)

        // Submit with incomplete data (missing FAST-ED)
        var incompleteData = PatientData()
        incompleteData.ageYears = 65
        incompleteData.systolicBP = 150
        incompleteData.diastolicBP = 90
        incompleteData.gfapValue = 800
        // Missing: fastEdScore
        appState.currentPatientData = incompleteData

        await appState.submitFullAssessment()

        // Should show error
        XCTAssertTrue(appState.showError)
        XCTAssertNotNil(appState.errorMessage)
        XCTAssertEqual(appState.currentScreen, .fullAssessment) // Stay on same screen

        // User dismisses error
        appState.clearError()
        XCTAssertFalse(appState.showError)

        // User corrects the data
        appState.currentPatientData.fastEdScore = 5

        // Submit again
        await appState.submitFullAssessment()

        // Should succeed
        XCTAssertFalse(appState.showError)
        XCTAssertEqual(appState.currentScreen, .results)
        XCTAssertNotNil(appState.currentAssessment)
    }

    // MARK: - Back Navigation Workflow

    func testBackNavigationWorkflow() async throws {
        await appState.login(accessCode: "Neuro25")
        XCTAssertEqual(appState.currentScreen, .triageComa)
        XCTAssertEqual(appState.navigationPath.count, 0)

        // Navigate forward through triage
        appState.navigate(to: .triageExam)
        XCTAssertEqual(appState.currentScreen, .triageExam)
        XCTAssertEqual(appState.navigationPath.count, 1)

        // Navigate to assessment
        appState.selectModule(.full)
        XCTAssertEqual(appState.currentScreen, .fullAssessment)
        XCTAssertEqual(appState.navigationPath.count, 2)

        // Go back
        appState.goBack()
        XCTAssertEqual(appState.currentScreen, .triageExam)
        XCTAssertEqual(appState.navigationPath.count, 1)

        // Go back again
        appState.goBack()
        XCTAssertEqual(appState.currentScreen, .triageComa)
        XCTAssertEqual(appState.navigationPath.count, 0)

        // Try to go back from start (should stay at start)
        appState.goBack()
        XCTAssertEqual(appState.currentScreen, .triageComa)
    }

    // MARK: - Session Persistence Workflow

    func testSessionPersistenceWorkflow() async throws {
        // Login
        await appState.login(accessCode: "Neuro25")
        XCTAssertTrue(appState.isAuthenticated)
        XCTAssertNotNil(appState.sessionToken)
        let originalToken = appState.sessionToken

        // Session should be saved to UserDefaults
        let savedToken = UserDefaults.standard.string(forKey: "sessionToken")
        XCTAssertEqual(savedToken, originalToken)

        // Simulate app restart by creating new AppState
        let newAppState = AppState()

        // Session should be restored
        XCTAssertTrue(newAppState.isAuthenticated)
        XCTAssertEqual(newAppState.sessionToken, originalToken)

        // Logout
        newAppState.logout()
        XCTAssertFalse(newAppState.isAuthenticated)
        XCTAssertNil(UserDefaults.standard.string(forKey: "sessionToken"))
    }

    // MARK: - Invalid Input Handling Workflow

    func testInvalidInputHandlingWorkflow() async throws {
        await appState.login(accessCode: "Neuro25")

        // Test 1: Invalid GFAP in Coma module
        appState.selectModule(.coma)
        await appState.submitComaAssessment(gfap: 0) // Below minimum
        XCTAssertTrue(appState.showError)
        XCTAssertNotEqual(appState.currentScreen, .results)
        appState.clearError()

        await appState.submitComaAssessment(gfap: 20000) // Above maximum
        XCTAssertTrue(appState.showError)
        appState.clearError()

        // Test 2: Invalid blood pressure in Limited module
        appState.reset()
        appState.navigate(to: .triageExam)
        appState.selectModule(.limited)

        var invalidBPData = PatientData()
        invalidBPData.ageYears = 65
        invalidBPData.systolicBP = 80
        invalidBPData.diastolicBP = 120 // Diastolic higher than systolic!
        invalidBPData.gfapValue = 500
        appState.currentPatientData = invalidBPData

        await appState.submitLimitedAssessment()
        XCTAssertTrue(appState.showError)
        XCTAssertNotEqual(appState.currentScreen, .results)
    }

    // MARK: - High Risk Scenario Workflow

    func testHighRiskScenarioWorkflow() async throws {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)

        // High GFAP value (high ICH risk)
        let highGFAP = 5000.0
        await appState.submitComaAssessment(gfap: highGFAP)

        XCTAssertEqual(appState.currentScreen, .results)

        guard let results = appState.currentAssessment?.results else {
            XCTFail("Results should exist")
            return
        }

        // Should have high ICH probability
        // (Actual threshold depends on model, but GFAP of 5000 should be significant)

        // Should have large volume estimate
        XCTAssertNotNil(results.ich.volume)
        let volume = results.ich.volume!

        // GFAP 5000 should result in significant volume
        XCTAssertGreaterThan(volume.estimatedML, 30) // Should be critical (≥30ml)
        XCTAssertEqual(volume.severity, .critical)

        // Risk level should be high
        let riskLevel = results.ich.riskLevel
        XCTAssertTrue([.high, .critical].contains(riskLevel))
    }

    // MARK: - Low Risk Scenario Workflow

    func testLowRiskScenarioWorkflow() async throws {
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)

        // Low GFAP value (low ICH risk)
        let lowGFAP = 50.0
        await appState.submitComaAssessment(gfap: lowGFAP)

        guard let results = appState.currentAssessment?.results else {
            XCTFail("Results should exist")
            return
        }

        // Should have small volume estimate
        let volume = results.ich.volume!
        XCTAssertLessThan(volume.estimatedML, 20) // Should be small or moderate
    }

    // MARK: - Logout and Re-login Workflow

    func testLogoutReloginWorkflow() async throws {
        // First session
        await appState.login(accessCode: "Neuro25")
        appState.selectModule(.coma)
        await appState.submitComaAssessment(gfap: 500)
        XCTAssertEqual(appState.assessmentHistory.count, 1)

        // Logout
        appState.logout()
        XCTAssertFalse(appState.isAuthenticated)
        XCTAssertEqual(appState.currentScreen, .login)
        XCTAssertNil(appState.currentAssessment)
        // Note: Assessment history is cleared on logout in current implementation

        // Re-login
        await appState.login(accessCode: "research2024")
        XCTAssertTrue(appState.isAuthenticated)
        XCTAssertEqual(appState.currentScreen, .triageComa)

        // Should be able to perform new assessment
        appState.selectModule(.coma)
        await appState.submitComaAssessment(gfap: 700)
        XCTAssertEqual(appState.currentScreen, .results)
    }

    // MARK: - Performance Test - Rapid Workflow

    func testRapidWorkflowPerformance() async throws {
        measure {
            Task {
                await appState.login(accessCode: "Neuro25")
                appState.selectModule(.coma)
                await appState.submitComaAssessment(gfap: 500)
                appState.reset()
            }
        }
    }

    // MARK: - Edge Case - Module Switching

    func testModuleSwitchingWorkflow() async throws {
        await appState.login(accessCode: "Neuro25")

        // Start with coma module
        appState.selectModule(.coma)
        XCTAssertEqual(appState.currentScreen, .comaAssessment)

        // User changes mind, goes back and selects different module
        appState.goBack()
        appState.navigate(to: .triageExam)
        appState.selectModule(.limited)
        XCTAssertEqual(appState.currentScreen, .limitedAssessment)

        // Complete the limited assessment
        var data = PatientData()
        data.ageYears = 60
        data.systolicBP = 140
        data.diastolicBP = 85
        data.gfapValue = 600
        appState.currentPatientData = data

        await appState.submitLimitedAssessment()
        XCTAssertEqual(appState.currentScreen, .results)
        XCTAssertEqual(appState.currentAssessment?.module, .limited)
    }
}
