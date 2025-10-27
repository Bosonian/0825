//
//  Color+Theme.swift
//  iGFAP Stroke Triage Assistant
//
//  Theme colors and extensions
//

import SwiftUI

extension Color {
    // MARK: - Brand Colors

    static let brandPrimary = Color.blue
    static let brandSecondary = Color.indigo
    static let brandAccent = Color.cyan

    // MARK: - Risk Colors

    static let riskLow = Color.blue
    static let riskMedium = Color.yellow
    static let riskHigh = Color.orange
    static let riskCritical = Color.red

    /// Get color for risk level
    static func forRisk(_ level: RiskLevel) -> Color {
        switch level {
        case .low:
            return .riskLow
        case .medium:
            return .riskMedium
        case .high:
            return .riskHigh
        case .critical:
            return .riskCritical
        }
    }

    /// Get color for risk probability (0.0-1.0)
    static func forProbability(_ probability: Double) -> Color {
        switch probability {
        case 0..<0.25:
            return .riskLow
        case 0.25..<0.50:
            return .riskMedium
        case 0.50..<0.70:
            return .riskHigh
        default:
            return .riskCritical
        }
    }

    // MARK: - Semantic Colors

    static let success = Color.green
    static let warning = Color.orange
    static let error = Color.red
    static let info = Color.blue

    // MARK: - Background Colors

    static let backgroundPrimary = Color(uiColor: .systemBackground)
    static let backgroundSecondary = Color(uiColor: .secondarySystemBackground)
    static let backgroundTertiary = Color(uiColor: .tertiarySystemBackground)

    // MARK: - Text Colors

    static let textPrimary = Color(uiColor: .label)
    static let textSecondary = Color(uiColor: .secondaryLabel)
    static let textTertiary = Color(uiColor: .tertiaryLabel)

    // MARK: - Medical Condition Colors

    static let hemorrhage = Color.red.opacity(0.8)
    static let ischemia = Color.blue.opacity(0.8)
    static let stroke = Color.purple.opacity(0.8)

    // MARK: - Helper Methods

    /// Create color from hex string
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
