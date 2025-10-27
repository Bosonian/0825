//
//  LocalizationManager.swift
//  iGFAP Stroke Triage Assistant
//
//  Manages app localization based on user language preference
//

import Foundation
import SwiftUI

@MainActor
class LocalizationManager: ObservableObject {
    @Published var currentLanguage: Language = .english

    static let shared = LocalizationManager()

    private init() {
        // Load saved language preference
        if let saved = UserDefaults.standard.string(forKey: "currentLanguage"),
           let language = Language(rawValue: saved) {
            currentLanguage = language
        }
    }

    func setLanguage(_ language: Language) {
        currentLanguage = language
        UserDefaults.standard.set(language.rawValue, forKey: "currentLanguage")
        objectWillChange.send()
    }

    func localized(_ key: String) -> String {
        switch currentLanguage {
        case .english:
            return LocalizedStrings.english[key] ?? key
        case .german:
            return LocalizedStrings.german[key] ?? key
        }
    }
}

// Extension to easily access localized strings
extension String {
    var localized: String {
        LocalizationManager.shared.localized(self)
    }

    func localized(with language: Language) -> String {
        switch language {
        case .english:
            return LocalizedStrings.english[self] ?? self
        case .german:
            return LocalizedStrings.german[self] ?? self
        }
    }
}
