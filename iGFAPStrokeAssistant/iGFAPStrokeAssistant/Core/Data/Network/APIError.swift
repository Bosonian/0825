//
//  APIError.swift
//  iGFAP Stroke Triage Assistant
//
//  Network error handling
//

import Foundation

/// API-specific errors with localized descriptions
enum APIError: LocalizedError {
    case networkUnavailable
    case invalidRequest(String)
    case serverError(Int, String)
    case decodingError(Error)
    case timeout
    case unauthorized
    case validationError(String)
    case unknownError(Error)

    var errorDescription: String? {
        switch self {
        case .networkUnavailable:
            return NSLocalizedString(
                "Network connection unavailable. Please check your internet connection.",
                comment: "Network error"
            )

        case .invalidRequest(let message):
            return NSLocalizedString(
                "Invalid request: \(message)",
                comment: "Invalid request error"
            )

        case .serverError(let code, let message):
            return String(
                format: NSLocalizedString(
                    "Server error %d: %@",
                    comment: "Server error"
                ),
                code,
                message
            )

        case .decodingError(let error):
            return NSLocalizedString(
                "Data parsing error: \(error.localizedDescription)",
                comment: "Decoding error"
            )

        case .timeout:
            return NSLocalizedString(
                "Request timed out. Please try again.",
                comment: "Timeout error"
            )

        case .unauthorized:
            return NSLocalizedString(
                "Unauthorized. Please log in again.",
                comment: "Auth error"
            )

        case .validationError(let message):
            return message

        case .unknownError(let error):
            return error.localizedDescription
        }
    }

    var recoverySuggestion: String? {
        switch self {
        case .networkUnavailable:
            return NSLocalizedString("Check your internet connection and try again.", comment: "")
        case .timeout:
            return NSLocalizedString("The server is taking longer than expected. Try again.", comment: "")
        case .unauthorized:
            return NSLocalizedString("Please log in again to continue.", comment: "")
        default:
            return NSLocalizedString("Please try again. Contact support if the problem persists.", comment: "")
        }
    }
}
