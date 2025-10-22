//
//  AppConstants.swift
//  iGFAP Stroke Triage Assistant
//
//  App-wide constants and configuration
//

import Foundation

enum AppConstants {
    // MARK: - App Information

    static let appName = "iGFAP Stroke Triage Assistant"
    static let appVersion = "1.0.0"
    static let buildNumber = "1"
    static let teamName = "iGFAP Research Team"
    static let copyright = "© 2025 iGFAP Research Team"

    // MARK: - Research Codes

    static let validAccessCodes = ["Neuro25", "research2024"]

    // MARK: - Session Configuration

    static let sessionDurationMinutes = 30
    static let maxSessionsPerDay = 50

    // MARK: - GFAP Constants

    static let gfapMinValue: Double = 29.0
    static let gfapMaxValue: Double = 10001.0
    static let gfapUnit = "pg/mL"

    // MARK: - Blood Pressure Constants

    static let bpMinValue = 40
    static let bpMaxValue = 300
    static let bpUnit = "mmHg"

    // MARK: - Age Constants

    static let ageMinValue = 0
    static let ageMaxValue = 120
    static let ageUnit = "years"

    // MARK: - FAST-ED Constants

    static let fastEdMinScore = 0
    static let fastEdMaxScore = 9
    static let fastEdLVOThreshold = 4 // Score >= 4 indicates high LVO risk

    // MARK: - Risk Thresholds

    static let lowRiskThreshold: Double = 0.25
    static let mediumRiskThreshold: Double = 0.50
    static let highRiskThreshold: Double = 0.70

    // MARK: - Volume Thresholds

    static let smallVolumeThreshold: Double = 10.0
    static let moderateVolumeThreshold: Double = 20.0
    static let largeVolumeThreshold: Double = 30.0

    // MARK: - Network Configuration

    static let networkTimeoutSeconds: TimeInterval = 20.0
    static let maxRetryAttempts = 3
    static let retryDelaySeconds: TimeInterval = 2.0

    // MARK: - UI Configuration

    static let cardCornerRadius: CGFloat = 12.0
    static let defaultPadding: CGFloat = 16.0
    static let animationDuration: TimeInterval = 0.3

    // MARK: - PDF Export

    static let pdfPageWidth: CGFloat = 595.2 // A4 width in points
    static let pdfPageHeight: CGFloat = 841.8 // A4 height in points
    static let pdfMargin: CGFloat = 40.0

    // MARK: - Map Configuration

    static let defaultMapZoomMeters: Double = 10000.0 // 10km radius
    static let strokeCenterMaxDistance: Double = 50000.0 // 50km

    // MARK: - UserDefaults Keys

    enum UserDefaultsKeys {
        static let sessionToken = "sessionToken"
        static let sessionExpiry = "sessionExpiry"
        static let isAuthenticated = "isAuthenticated"
        static let preferredLanguage = "preferredLanguage"
        static let assessmentHistory = "assessmentHistory"
    }

    // MARK: - Notification Names

    enum NotificationNames {
        static let sessionExpired = "SessionExpiredNotification"
        static let assessmentCompleted = "AssessmentCompletedNotification"
    }

    // MARK: - Error Messages

    enum ErrorMessages {
        static let networkUnavailable = "Network connection unavailable. Please check your internet connection."
        static let invalidAccessCode = "Invalid access code. Please try again."
        static let sessionExpired = "Your session has expired. Please log in again."
        static let invalidGFAP = "GFAP value must be between 29 and 10,001 pg/mL"
        static let invalidBloodPressure = "Systolic BP must be greater than diastolic BP"
        static let requiredFieldMissing = "Please fill in all required fields"
    }

    // MARK: - Accessibility Identifiers

    enum AccessibilityIdentifiers {
        static let loginButton = "loginButton"
        static let submitButton = "submitAssessmentButton"
        static let backButton = "backButton"
        static let logoutButton = "logoutButton"

        static let gfapField = "gfapValueField"
        static let ageField = "ageField"
        static let systolicField = "systolicBPField"
        static let diastolicField = "diastolicBPField"
    }

    // MARK: - Analytics Events (for future implementation)

    enum AnalyticsEvents {
        static let userLogin = "user_login"
        static let assessmentStarted = "assessment_started"
        static let assessmentCompleted = "assessment_completed"
        static let pdfExported = "pdf_exported"
        static let strokeCenterViewed = "stroke_center_viewed"
    }

    // MARK: - Feature Flags

    enum FeatureFlags {
        static let enableBrainVisualization = true
        static let enableStrokeCenterMap = true
        static let enablePDFExport = true
        static let enableOfflineMode = false
        static let enableAnalytics = false
    }

    // MARK: - Stroke Centers (Mock Data)

    static let mockStrokeCenters = [
        StrokeCenter(
            name: "University Hospital",
            type: .comprehensive,
            latitude: 48.1372,
            longitude: 11.5755,
            phoneNumber: "+49 89 4400-0"
        ),
        StrokeCenter(
            name: "City Medical Center",
            type: .primary,
            latitude: 48.1500,
            longitude: 11.5800,
            phoneNumber: "+49 89 5555-0"
        ),
        StrokeCenter(
            name: "Regional Hospital",
            type: .comprehensive,
            latitude: 48.1200,
            longitude: 11.5600,
            phoneNumber: "+49 89 6666-0"
        )
    ]

    // MARK: - Validation Functions

    static func isValidGFAP(_ value: Double) -> Bool {
        return value >= gfapMinValue && value <= gfapMaxValue
    }

    static func isValidBloodPressure(systolic: Int, diastolic: Int) -> Bool {
        return systolic > diastolic &&
               systolic >= bpMinValue && systolic <= bpMaxValue &&
               diastolic >= bpMinValue && diastolic <= bpMaxValue
    }

    static func isValidAge(_ age: Int) -> Bool {
        return age >= ageMinValue && age <= ageMaxValue
    }

    static func isValidFASTED(_ score: Int) -> Bool {
        return score >= fastEdMinScore && score <= fastEdMaxScore
    }

    // MARK: - Formatting Functions

    static func formatGFAP(_ value: Double) -> String {
        return String(format: "%.1f %@", value, gfapUnit)
    }

    static func formatBloodPressure(systolic: Int, diastolic: Int) -> String {
        return "\(systolic)/\(diastolic) \(bpUnit)"
    }

    static func formatProbability(_ probability: Double) -> String {
        return String(format: "%.1f%%", probability * 100)
    }

    static func formatVolume(_ volumeML: Double) -> String {
        return String(format: "%.1f mL", volumeML)
    }
}
