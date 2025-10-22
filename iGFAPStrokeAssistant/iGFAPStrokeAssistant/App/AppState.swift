//
//  AppState.swift
//  iGFAP Stroke Triage Assistant
//
//  Central application state with Combine
//

import Foundation
import Combine
import SwiftUI

@MainActor
class AppState: ObservableObject {

    // MARK: - Navigation

    @Published var currentScreen: Screen = .login
    @Published var navigationPath: [Screen] = []

    // MARK: - Session

    @Published var isAuthenticated: Bool = false
    @Published var sessionToken: String?
    @Published var sessionExpiry: Date?

    // MARK: - Assessment Data

    @Published var currentPatientData: PatientData = PatientData()
    @Published var currentAssessment: Assessment?
    @Published var assessmentHistory: [Assessment] = []
    @Published var selectedModule: AssessmentModule?

    // MARK: - UI State

    @Published var isLoading: Bool = false
    @Published var errorMessage: String?
    @Published var showError: Bool = false

    // MARK: - Preferences

    @Published var currentLanguage: Language = .english
    @Published var colorScheme: ColorScheme?

    // MARK: - Dependencies

    private let predictionService: PredictionServiceProtocol
    private var cancellables = Set<AnyCancellable>()

    // MARK: - Initialization

    init(predictionService: PredictionServiceProtocol = PredictionService()) {
        self.predictionService = predictionService
        loadSessionFromStorage()
        setupErrorHandling()
    }

    // MARK: - Navigation Methods

    func navigate(to screen: Screen) {
        navigationPath.append(currentScreen)
        currentScreen = screen
    }

    func goBack() {
        if let previousScreen = navigationPath.popLast() {
            currentScreen = previousScreen
        }
    }

    func reset() {
        currentScreen = .triageComa
        navigationPath = []
        currentPatientData = PatientData()
        currentAssessment = nil
        selectedModule = nil
        errorMessage = nil
        showError = false
    }

    // MARK: - Authentication

    func login(accessCode: String) async {
        isLoading = true

        // Simple password check (matches PWA)
        // In production, this would call the authenticate API endpoint
        let validCodes = ["Neuro25", "research2024"]

        await Task.sleep(500_000_000) // 0.5 second delay

        if validCodes.contains(accessCode) {
            isAuthenticated = true
            sessionToken = UUID().uuidString
            sessionExpiry = Date().addingTimeInterval(30 * 60) // 30 minutes

            saveSessionToStorage()
            currentScreen = .triageComa
        } else {
            setError("Invalid access code. Please try again.")
        }

        isLoading = false
    }

    func logout() {
        isAuthenticated = false
        sessionToken = nil
        sessionExpiry = nil
        clearSessionStorage()
        reset()
        currentScreen = .login
    }

    // MARK: - Assessment Methods

    func selectModule(_ module: AssessmentModule) {
        selectedModule = module

        switch module {
        case .coma:
            currentScreen = .comaAssessment
        case .limited:
            currentScreen = .limitedAssessment
        case .full:
            currentScreen = .fullAssessment
        }
    }

    func submitComaAssessment(gfap: Double) async {
        guard let module = selectedModule else { return }

        isLoading = true
        errorMessage = nil

        do {
            // Update patient data
            currentPatientData.gfapValue = gfap

            // Call API
            let ichResult = try await predictionService.predictComaICH(gfap: gfap)

            // Create assessment with results
            let results = AssessmentResults(
                ich: ichResult,
                lvo: nil,
                module: module
            )

            let assessment = Assessment(
                module: module,
                patientData: currentPatientData,
                results: results
            )

            // Save and navigate
            currentAssessment = assessment
            assessmentHistory.append(assessment)
            currentScreen = .results

        } catch {
            setError("Failed to get prediction: \(error.localizedDescription)")
        }

        isLoading = false
    }

    func submitLimitedAssessment() async {
        guard let module = selectedModule else { return }

        isLoading = true
        errorMessage = nil

        do {
            // Validate data
            let validation = currentPatientData.validate(for: .limited)
            guard validation.isValid else {
                setError(validation.errorMessage ?? "Invalid data")
                isLoading = false
                return
            }

            // Call API
            let ichResult = try await predictionService.predictLimitedICH(currentPatientData)

            // Create assessment
            let results = AssessmentResults(
                ich: ichResult,
                lvo: nil,
                module: module
            )

            let assessment = Assessment(
                module: module,
                patientData: currentPatientData,
                results: results
            )

            currentAssessment = assessment
            assessmentHistory.append(assessment)
            currentScreen = .results

        } catch {
            setError("Failed to get prediction: \(error.localizedDescription)")
        }

        isLoading = false
    }

    func submitFullAssessment() async {
        guard let module = selectedModule else { return }

        isLoading = true
        errorMessage = nil

        do {
            // Validate data
            let validation = currentPatientData.validate(for: .full)
            guard validation.isValid else {
                setError(validation.errorMessage ?? "Invalid data")
                isLoading = false
                return
            }

            // Call API
            let results = try await predictionService.predictFullStroke(currentPatientData)

            // Create assessment
            let assessment = Assessment(
                module: module,
                patientData: currentPatientData,
                results: results
            )

            currentAssessment = assessment
            assessmentHistory.append(assessment)
            currentScreen = .results

        } catch {
            setError("Failed to get prediction: \(error.localizedDescription)")
        }

        isLoading = false
    }

    // MARK: - Error Handling

    private func setupErrorHandling() {
        $errorMessage
            .map { $0 != nil }
            .assign(to: &$showError)
    }

    func setError(_ message: String) {
        errorMessage = message
        showError = true
    }

    func clearError() {
        errorMessage = nil
        showError = false
    }

    // MARK: - Persistence

    private func saveSessionToStorage() {
        UserDefaults.standard.set(sessionToken, forKey: "sessionToken")
        UserDefaults.standard.set(sessionExpiry, forKey: "sessionExpiry")
        UserDefaults.standard.set(true, forKey: "isAuthenticated")
    }

    private func loadSessionFromStorage() {
        if let token = UserDefaults.standard.string(forKey: "sessionToken"),
           let expiry = UserDefaults.standard.object(forKey: "sessionExpiry") as? Date {
            // Check if session is still valid
            if expiry > Date() {
                sessionToken = token
                sessionExpiry = expiry
                isAuthenticated = true
                currentScreen = .triageComa
            }
        }
    }

    private func clearSessionStorage() {
        UserDefaults.standard.removeObject(forKey: "sessionToken")
        UserDefaults.standard.removeObject(forKey: "sessionExpiry")
        UserDefaults.standard.removeObject(forKey: "isAuthenticated")
    }
}

// MARK: - Screen Enum

enum Screen: Hashable {
    case login
    case triageComa
    case triageExam
    case comaAssessment
    case limitedAssessment
    case fullAssessment
    case results
}

// MARK: - Language

enum Language: String, CaseIterable {
    case english = "en"
    case german = "de"

    var displayName: String {
        switch self {
        case .english: return "English"
        case .german: return "Deutsch"
        }
    }
}
