//
//  PatientData.swift
//  iGFAP Stroke Triage Assistant
//
//  Core domain model for patient assessment data
//

import Foundation

/// Patient assessment data model
struct PatientData: Codable, Equatable, Identifiable {
    let id: UUID
    let timestamp: Date

    // MARK: - Demographics
    var ageYears: Int?

    // MARK: - Vitals
    var systolicBP: Int?
    var diastolicBP: Int?

    // MARK: - Biomarkers
    var gfapValue: Double?

    // MARK: - Neurological Assessment
    var fastEdScore: Int?
    var gcs: Int?

    // MARK: - Symptoms (Boolean flags)
    var headache: Bool = false
    var vigilanceReduction: Bool = false  // Vigilanzminderung
    var armParesis: Bool = false          // Armparese
    var legParesis: Bool = false          // Beinparese
    var eyeDeviation: Bool = false

    // MARK: - Medical History
    var atrialFibrillation: Bool = false
    var anticoagulated: Bool = false      // NOAK
    var antiplatelets: Bool = false

    // MARK: - Computed Properties

    /// Check if patient is comatose (GCS < 8)
    var isComatose: Bool {
        guard let gcs = gcs else { return false }
        return gcs < 8
    }

    /// Validate blood pressure consistency
    var hasValidBloodPressure: Bool {
        guard let systolic = systolicBP, let diastolic = diastolicBP else {
            return systolicBP == nil && diastolicBP == nil
        }
        return systolic > diastolic
    }

    // MARK: - Initialization

    init(
        id: UUID = UUID(),
        timestamp: Date = Date(),
        ageYears: Int? = nil,
        systolicBP: Int? = nil,
        diastolicBP: Int? = nil,
        gfapValue: Double? = nil,
        fastEdScore: Int? = nil,
        gcs: Int? = nil
    ) {
        self.id = id
        self.timestamp = timestamp
        self.ageYears = ageYears
        self.systolicBP = systolicBP
        self.diastolicBP = diastolicBP
        self.gfapValue = gfapValue
        self.fastEdScore = fastEdScore
        self.gcs = gcs
    }

    // MARK: - Validation

    /// Validate data for specific assessment module
    func validate(for module: AssessmentModule) -> ValidationResult {
        var errors: [String] = []

        switch module {
        case .coma:
            // Coma module only requires GFAP
            if gfapValue == nil {
                errors.append("GFAP value is required")
            } else if let gfap = gfapValue, gfap < 29 || gfap > 10001 {
                errors.append("GFAP value must be between 29 and 10,001 pg/mL")
            }

        case .limited:
            // Limited module requirements
            if ageYears == nil {
                errors.append("Age is required")
            }
            if systolicBP == nil || diastolicBP == nil {
                errors.append("Blood pressure is required")
            }
            if gfapValue == nil {
                errors.append("GFAP value is required")
            }
            if !hasValidBloodPressure {
                errors.append("Systolic BP must be greater than diastolic BP")
            }

        case .full:
            // Full module requirements
            if ageYears == nil {
                errors.append("Age is required")
            }
            if systolicBP == nil || diastolicBP == nil {
                errors.append("Blood pressure is required")
            }
            if gfapValue == nil {
                errors.append("GFAP value is required")
            }
            if fastEdScore == nil {
                errors.append("FAST-ED score is required")
            }
            if !hasValidBloodPressure {
                errors.append("Systolic BP must be greater than diastolic BP")
            }
        }

        return ValidationResult(isValid: errors.isEmpty, errors: errors)
    }
}

// MARK: - Validation Result

struct ValidationResult {
    let isValid: Bool
    let errors: [String]

    var errorMessage: String? {
        guard !isValid else { return nil }
        return errors.joined(separator: "\n")
    }
}
