//
//  SampleDataGenerator.swift
//  iGFAPStrokeAssistantTests
//
//  Generate sample data for testing and previews
//

import Foundation
@testable import iGFAPStrokeAssistant

enum SampleDataGenerator {

    // MARK: - Patient Data

    /// Generate random patient data for testing
    static func randomPatientData(for module: AssessmentModule = .full) -> PatientData {
        var data = PatientData()

        // Common fields
        data.ageYears = Int.random(in: 40...90)
        data.systolicBP = Int.random(in: 100...180)
        data.diastolicBP = Int.random(in: 60...100)
        data.gfapValue = Double.random(in: 29...10001)

        switch module {
        case .coma:
            // Coma module only needs GFAP
            break

        case .limited:
            // Limited module needs basic vitals
            data.vigilanceReduction = Bool.random()

        case .full:
            // Full module needs all fields
            data.fastEdScore = Int.random(in: 0...9)
            data.gcs = Int.random(in: 3...15)
            data.headache = Bool.random()
            data.vigilanceReduction = Bool.random()
            data.armParesis = Bool.random()
            data.legParesis = Bool.random()
            data.eyeDeviation = Bool.random()
            data.atrialFibrillation = Bool.random()
            data.anticoagulated = Bool.random()
            data.antiplatelets = Bool.random()
        }

        return data
    }

    /// Generate patient data with specific risk level
    static func patientDataWithRisk(_ riskLevel: RiskLevel) -> PatientData {
        var data = PatientData()
        data.ageYears = 70
        data.systolicBP = 150
        data.diastolicBP = 90

        switch riskLevel {
        case .low:
            data.gfapValue = 50.0 // Low GFAP = low ICH risk
            data.fastEdScore = 1
        case .medium:
            data.gfapValue = 300.0
            data.fastEdScore = 3
        case .high:
            data.gfapValue = 1500.0
            data.fastEdScore = 5
        case .critical:
            data.gfapValue = 5000.0
            data.fastEdScore = 8
        }

        data.headache = riskLevel == .high || riskLevel == .critical
        data.vigilanceReduction = riskLevel == .critical
        data.armParesis = riskLevel == .high || riskLevel == .critical
        data.legParesis = riskLevel == .high || riskLevel == .critical

        return data
    }

    /// Generate elderly patient data (age 75+)
    static var elderlyPatient: PatientData {
        var data = PatientData()
        data.ageYears = Int.random(in: 75...95)
        data.systolicBP = Int.random(in: 140...180)
        data.diastolicBP = Int.random(in: 80...100)
        data.gfapValue = Double.random(in: 500...5000)
        data.fastEdScore = Int.random(in: 4...9)
        data.atrialFibrillation = true
        data.anticoagulated = Bool.random()
        return data
    }

    /// Generate young patient data (age < 50)
    static var youngPatient: PatientData {
        var data = PatientData()
        data.ageYears = Int.random(in: 25...49)
        data.systolicBP = Int.random(in: 110...140)
        data.diastolicBP = Int.random(in: 70...90)
        data.gfapValue = Double.random(in: 29...1000)
        data.fastEdScore = Int.random(in: 0...4)
        return data
    }

    // MARK: - Predictions

    /// Generate sample ICH prediction
    static func sampleICHPrediction(probability: Double = 0.65) -> ICHPrediction {
        let drivers = [
            RiskDriver(
                name: "gfap_value",
                displayName: "GFAP Value",
                weight: 0.45,
                category: .biomarker
            ),
            RiskDriver(
                name: "age_years",
                displayName: "Age",
                weight: 0.25,
                category: .demographic
            ),
            RiskDriver(
                name: "systolic_bp",
                displayName: "Systolic BP",
                weight: 0.18,
                category: .vital
            ),
            RiskDriver(
                name: "anticoagulation",
                displayName: "Anticoagulation",
                weight: 0.12,
                category: .history
            )
        ]

        let volume = ICHVolume(
            estimatedML: 25.5,
            mortalityRange: "20-40%",
            severity: .large
        )

        return ICHPrediction(
            probability: probability,
            drivers: drivers,
            confidence: 0.85,
            volume: volume
        )
    }

    /// Generate sample LVO prediction
    static func sampleLVOPrediction(probability: Double = 0.42) -> LVOPrediction {
        let drivers = [
            RiskDriver(
                name: "fast_ed_score",
                displayName: "FAST-ED Score",
                weight: 0.50,
                category: .neurological
            ),
            RiskDriver(
                name: "eye_deviation",
                displayName: "Eye Deviation",
                weight: 0.25,
                category: .neurological
            ),
            RiskDriver(
                name: "arm_paresis",
                displayName: "Arm Weakness",
                weight: 0.20,
                category: .neurological
            ),
            RiskDriver(
                name: "gfap_value",
                displayName: "GFAP Value",
                weight: -0.15, // Protective
                category: .biomarker
            )
        ]

        return LVOPrediction(
            probability: probability,
            drivers: drivers,
            confidence: 0.82
        )
    }

    /// Generate complete assessment results
    static func sampleAssessmentResults(module: AssessmentModule = .full) -> AssessmentResults {
        let ichPrediction = sampleICHPrediction()
        let lvoPrediction = module == .full ? sampleLVOPrediction() : nil

        return AssessmentResults(
            ich: ichPrediction,
            lvo: lvoPrediction,
            module: module
        )
    }

    // MARK: - Assessments

    /// Generate sample assessment
    static func sampleAssessment(module: AssessmentModule = .full) -> Assessment {
        Assessment(
            module: module,
            patientData: randomPatientData(for: module),
            results: sampleAssessmentResults(module: module)
        )
    }

    /// Generate multiple sample assessments
    static func sampleAssessments(count: Int = 5) -> [Assessment] {
        (0..<count).map { i in
            let modules: [AssessmentModule] = [.coma, .limited, .full]
            let module = modules[i % modules.count]
            return sampleAssessment(module: module)
        }
    }

    // MARK: - Edge Cases

    /// Generate minimum valid GFAP data
    static var minGFAPData: PatientData {
        var data = PatientData()
        data.gfapValue = AppConstants.gfapMinValue // 29 pg/mL
        data.ageYears = 18
        data.systolicBP = 90
        data.diastolicBP = 60
        data.fastEdScore = 0
        return data
    }

    /// Generate maximum valid GFAP data
    static var maxGFAPData: PatientData {
        var data = PatientData()
        data.gfapValue = AppConstants.gfapMaxValue // 10001 pg/mL
        data.ageYears = 120
        data.systolicBP = 250
        data.diastolicBP = 150
        data.fastEdScore = 9
        return data
    }

    /// Generate invalid data (for validation testing)
    static var invalidData: PatientData {
        var data = PatientData()
        data.systolicBP = 80 // Invalid: too low
        data.diastolicBP = 120 // Invalid: higher than systolic
        data.gfapValue = 10 // Invalid: below minimum
        return data
    }

    // MARK: - Stroke Centers

    /// Generate sample stroke centers
    static var sampleStrokeCenters: [StrokeCenter] {
        [
            StrokeCenter(
                name: "University Hospital Munich",
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
            ),
            StrokeCenter(
                name: "St. Mary's Hospital",
                type: .primary,
                latitude: 48.1100,
                longitude: 11.5900,
                phoneNumber: "+49 89 7777-0"
            ),
            StrokeCenter(
                name: "Neurology Clinic Berlin",
                type: .comprehensive,
                latitude: 52.5200,
                longitude: 13.4050,
                phoneNumber: "+49 30 8888-0"
            )
        ]
    }

    // MARK: - FAST-ED Scores

    /// Generate random FAST-ED components
    static func randomFASTEDScores() -> (facial: Int, arm: Int, speech: Int, eye: Int, denial: Int) {
        return (
            facial: Int.random(in: 0...2),
            arm: Int.random(in: 0...2),
            speech: Int.random(in: 0...2),
            eye: Int.random(in: 0...1),
            denial: Int.random(in: 0...2)
        )
    }

    // MARK: - Batch Generation

    /// Generate batch of patient data for testing
    static func generateBatch(count: Int, module: AssessmentModule = .full) -> [PatientData] {
        (0..<count).map { _ in randomPatientData(for: module) }
    }

    /// Generate batch with specific GFAP range
    static func generateBatch(count: Int, gfapRange: ClosedRange<Double>) -> [PatientData] {
        (0..<count).map { _ in
            var data = randomPatientData(for: .full)
            data.gfapValue = Double.random(in: gfapRange)
            return data
        }
    }

    /// Generate high-risk patient cohort
    static func generateHighRiskCohort(count: Int = 10) -> [PatientData] {
        (0..<count).map { _ in patientDataWithRisk(.high) }
    }

    /// Generate low-risk patient cohort
    static func generateLowRiskCohort(count: Int = 10) -> [PatientData] {
        (0..<count).map { _ in patientDataWithRisk(.low) }
    }

    // MARK: - Realistic Scenarios

    /// Typical stroke presentation
    static var typicalStrokePresentation: PatientData {
        var data = PatientData()
        data.ageYears = 68
        data.systolicBP = 165
        data.diastolicBP = 95
        data.gfapValue = 850.0
        data.fastEdScore = 5
        data.gcs = 13
        data.headache = false
        data.vigilanceReduction = false
        data.armParesis = true
        data.legParesis = false
        data.eyeDeviation = false
        data.atrialFibrillation = true
        data.anticoagulated = false
        data.antiplatelets = true
        return data
    }

    /// Severe hemorrhagic stroke
    static var severeHemorrhagicStroke: PatientData {
        var data = PatientData()
        data.ageYears = 72
        data.systolicBP = 195
        data.diastolicBP = 110
        data.gfapValue = 6500.0 // Very high
        data.fastEdScore = 8
        data.gcs = 6 // Comatose
        data.headache = true
        data.vigilanceReduction = true
        data.armParesis = true
        data.legParesis = true
        data.eyeDeviation = true
        data.anticoagulated = true
        return data
    }

    /// Mild TIA presentation
    static var mildTIAPresentation: PatientData {
        var data = PatientData()
        data.ageYears = 55
        data.systolicBP = 135
        data.diastolicBP = 85
        data.gfapValue = 45.0 // Low
        data.fastEdScore = 1
        data.gcs = 15
        data.headache = false
        data.vigilanceReduction = false
        data.armParesis = false
        data.legParesis = false
        data.eyeDeviation = false
        return data
    }
}

// MARK: - Preview Helpers

#if DEBUG
extension SampleDataGenerator {
    /// Quick access for SwiftUI previews
    static var preview: PatientData {
        typicalStrokePresentation
    }

    static var previewAssessment: Assessment {
        sampleAssessment(module: .full)
    }

    static var previewResults: AssessmentResults {
        sampleAssessmentResults(module: .full)
    }
}
#endif
