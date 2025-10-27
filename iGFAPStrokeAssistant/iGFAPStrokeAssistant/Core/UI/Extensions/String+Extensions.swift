//
//  String+Extensions.swift
//  iGFAP Stroke Triage Assistant
//
//  String utility extensions
//

import Foundation
import UIKit

extension String {
    // MARK: - Validation

    /// Check if string is a valid email
    var isValidEmail: Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let predicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        return predicate.evaluate(with: self)
    }

    /// Check if string is a valid phone number
    var isValidPhoneNumber: Bool {
        let phoneRegex = "^[+]?[0-9]{10,15}$"
        let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
        return predicate.evaluate(with: self)
    }

    /// Check if string is not empty (trimmed)
    var isNotEmpty: Bool {
        !trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    // MARK: - Formatting

    /// Capitalize first letter only
    var capitalizedFirst: String {
        guard let first = first else { return self }
        return String(first).uppercased() + dropFirst()
    }

    /// Remove all whitespace
    var withoutWhitespace: String {
        replacingOccurrences(of: " ", with: "")
    }

    /// Trim whitespace and newlines
    var trimmed: String {
        trimmingCharacters(in: .whitespacesAndNewlines)
    }

    // MARK: - Localization

    /// Localize string using LocalizationManager
    var localized: String {
        LocalizationManager.shared.localized(self)
    }

    /// Localize with language parameter
    func localized(with language: Language) -> String {
        switch language {
        case .english:
            return LocalizedStrings.english[self] ?? self
        case .german:
            return LocalizedStrings.german[self] ?? self
        }
    }

    // MARK: - Subscript

    /// Safe subscript access
    subscript(safe index: Int) -> Character? {
        guard index >= 0 && index < count else { return nil }
        return self[self.index(startIndex, offsetBy: index)]
    }

    // MARK: - Medical Data Formatting

    /// Format as GFAP value with unit
    var asGFAPString: String {
        guard let value = Double(self) else { return self }
        return AppConstants.formatGFAP(value)
    }

    /// Format as blood pressure reading
    func asBloodPressure(diastolic: String) -> String? {
        guard let sys = Int(self), let dia = Int(diastolic) else { return nil }
        return AppConstants.formatBloodPressure(systolic: sys, diastolic: dia)
    }
}

// MARK: - Numeric String Extensions

extension String {
    /// Convert to Int safely
    var toInt: Int? {
        Int(self)
    }

    /// Convert to Double safely
    var toDouble: Double? {
        Double(self)
    }

    /// Check if string is numeric
    var isNumeric: Bool {
        CharacterSet.decimalDigits.isSuperset(of: CharacterSet(charactersIn: self))
    }

    /// Check if string is alphanumeric
    var isAlphanumeric: Bool {
        CharacterSet.alphanumerics.isSuperset(of: CharacterSet(charactersIn: self))
    }
}

// MARK: - URL Extensions

extension String {
    /// Convert to URL
    var asURL: URL? {
        URL(string: self)
    }

    /// Check if string is valid URL
    var isValidURL: Bool {
        guard let url = URL(string: self) else { return false }
        return UIApplication.shared.canOpenURL(url)
    }
}

// MARK: - AttributedString Extensions

extension String {
    /// Create bold attributed string
    var bold: AttributedString {
        var attributed = AttributedString(self)
        attributed.font = .headline
        return attributed
    }

    /// Create italic attributed string
    var italic: AttributedString {
        var attributed = AttributedString(self)
        attributed.font = .body.italic()
        return attributed
    }
}
