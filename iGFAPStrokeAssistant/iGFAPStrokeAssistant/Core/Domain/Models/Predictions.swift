//
//  Predictions.swift
//  iGFAP Stroke Triage Assistant
//
//  Domain models for ICH and LVO predictions
//

import Foundation

// MARK: - ICH Prediction

/// Intracerebral Hemorrhage prediction result
struct ICHPrediction: Codable, Equatable {
    let probability: Double  // 0.0 - 1.0
    let drivers: [RiskDriver]
    let confidence: Double
    let volume: ICHVolume?

    /// Probability as percentage (0-100)
    var percentageRisk: Int {
        Int((probability * 100).rounded())
    }

    /// Risk level category
    var riskLevel: RiskLevel {
        RiskLevel.from(probability: probability)
    }

    init(
        probability: Double,
        drivers: [RiskDriver],
        confidence: Double,
        volume: ICHVolume? = nil
    ) {
        self.probability = probability
        self.drivers = drivers.sorted { abs($0.weight) > abs($1.weight) }
        self.confidence = confidence
        self.volume = volume
    }
}

// MARK: - LVO Prediction

/// Large Vessel Occlusion prediction result
struct LVOPrediction: Codable, Equatable {
    let probability: Double
    let drivers: [RiskDriver]
    let confidence: Double

    var percentageRisk: Int {
        Int((probability * 100).rounded())
    }

    var riskLevel: RiskLevel {
        RiskLevel.from(probability: probability)
    }

    init(
        probability: Double,
        drivers: [RiskDriver],
        confidence: Double
    ) {
        self.probability = probability
        self.drivers = drivers.sorted { abs($0.weight) > abs($1.weight) }
        self.confidence = confidence
    }
}

// MARK: - Risk Driver (SHAP Explainability)

/// Individual risk factor with contribution weight
struct RiskDriver: Codable, Equatable, Identifiable {
    let id: UUID
    let name: String
    let displayName: String
    let weight: Double  // Signed: positive increases risk, negative decreases
    let category: DriverCategory

    var isPositive: Bool { weight > 0 }
    var absoluteWeight: Double { abs(weight) }
    var percentageContribution: Double { absoluteWeight * 100 }

    init(
        id: UUID = UUID(),
        name: String,
        displayName: String,
        weight: Double,
        category: DriverCategory
    ) {
        self.id = id
        self.name = name
        self.displayName = displayName
        self.weight = weight
        self.category = category
    }

    enum DriverCategory: String, Codable {
        case demographic
        case vital
        case biomarker
        case neurological
        case history

        var icon: String {
            switch self {
            case .demographic: return "👤"
            case .vital: return "❤️"
            case .biomarker: return "🧬"
            case .neurological: return "🧠"
            case .history: return "📋"
            }
        }
    }
}

// MARK: - ICH Volume

/// Estimated intracerebral hemorrhage volume
struct ICHVolume: Codable, Equatable {
    let estimatedML: Double
    let mortalityRange: String
    let severity: Severity

    var formattedVolume: String {
        String(format: "%.1f mL", estimatedML)
    }

    enum Severity: String, Codable {
        case small      // < 10ml
        case moderate   // 10-20ml
        case large      // 20-30ml
        case critical   // >= 30ml

        var displayName: String {
            switch self {
            case .small: return NSLocalizedString("Small", comment: "")
            case .moderate: return NSLocalizedString("Moderate", comment: "")
            case .large: return NSLocalizedString("Large", comment: "")
            case .critical: return NSLocalizedString("Critical", comment: "")
            }
        }

        var color: String {
            switch self {
            case .small: return "blue"
            case .moderate: return "yellow"
            case .large: return "orange"
            case .critical: return "red"
            }
        }
    }
}

// MARK: - Risk Level

/// Risk level categorization
enum RiskLevel: String, Codable {
    case low
    case medium
    case high
    case critical

    var displayName: String {
        switch self {
        case .low: return NSLocalizedString("Low Risk", comment: "")
        case .medium: return NSLocalizedString("Medium Risk", comment: "")
        case .high: return NSLocalizedString("High Risk", comment: "")
        case .critical: return NSLocalizedString("Very High Risk", comment: "")
        }
    }

    var color: String {
        switch self {
        case .low: return "blue"
        case .medium: return "yellow"
        case .high: return "orange"
        case .critical: return "red"
        }
    }

    static func from(probability: Double) -> RiskLevel {
        switch probability {
        case 0..<0.25:
            return .low
        case 0.25..<0.50:
            return .medium
        case 0.50..<0.70:
            return .high
        default:
            return .critical
        }
    }
}
