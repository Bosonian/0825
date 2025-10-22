//
//  Assessment.swift
//  iGFAP Stroke Triage Assistant
//
//  Core domain model for stroke assessments
//

import Foundation

// MARK: - Assessment Module Types

/// Assessment module type based on patient condition
enum AssessmentModule: String, Codable, CaseIterable {
    case coma = "Coma"
    case limited = "Limited"
    case full = "Full"

    var displayName: String {
        switch self {
        case .coma:
            return NSLocalizedString("Coma Module", comment: "")
        case .limited:
            return NSLocalizedString("Limited Data", comment: "")
        case .full:
            return NSLocalizedString("Full Assessment", comment: "")
        }
    }

    var description: String {
        switch self {
        case .coma:
            return NSLocalizedString("For patients with GCS < 8 (comatose)", comment: "")
        case .limited:
            return NSLocalizedString("For patients who cannot be reliably examined", comment: "")
        case .full:
            return NSLocalizedString("Comprehensive stroke assessment", comment: "")
        }
    }
}

// MARK: - Assessment Model

/// Complete stroke assessment with results
struct Assessment: Identifiable, Codable {
    let id: UUID
    let timestamp: Date
    let module: AssessmentModule
    let patientData: PatientData
    var results: AssessmentResults?

    init(
        id: UUID = UUID(),
        timestamp: Date = Date(),
        module: AssessmentModule,
        patientData: PatientData,
        results: AssessmentResults? = nil
    ) {
        self.id = id
        self.timestamp = timestamp
        self.module = module
        self.patientData = patientData
        self.results = results
    }

    /// Check if assessment has been completed with results
    var isComplete: Bool {
        results != nil
    }

    /// Get formatted timestamp
    var formattedTimestamp: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter.string(from: timestamp)
    }
}

// MARK: - Assessment Results

/// Results from prediction API
struct AssessmentResults: Codable, Equatable {
    let ich: ICHPrediction
    let lvo: LVOPrediction?
    let module: AssessmentModule
    let processedAt: Date

    init(
        ich: ICHPrediction,
        lvo: LVOPrediction? = nil,
        module: AssessmentModule,
        processedAt: Date = Date()
    ) {
        self.ich = ich
        self.lvo = lvo
        self.module = module
        self.processedAt = processedAt
    }

    /// Get highest risk between ICH and LVO
    var maxRisk: Double {
        guard let lvoProb = lvo?.probability else {
            return ich.probability
        }
        return max(ich.probability, lvoProb)
    }

    /// Check if any risk is critical (>70%)
    var hasCriticalRisk: Bool {
        maxRisk > 0.70
    }
}
