//
//  APIConfiguration.swift
//  iGFAP Stroke Triage Assistant
//
//  API configuration and endpoints
//

import Foundation

/// API configuration for different environments
struct APIConfiguration {
    let baseURL: URL
    let timeout: TimeInterval
    let endpoints: Endpoints

    // MARK: - Endpoints

    struct Endpoints {
        let comaICH = "predict_coma_ich"
        let limitedICH = "predict_limited_data_ich"
        let fullStroke = "predict_full_stroke"
        let lvo = "predict_lvo"
        let authenticate = "authenticate-research-access"
    }

    // MARK: - Environment Configurations

    static var production: APIConfiguration {
        guard let url = URL(string: "https://europe-west3-igfap-452720.cloudfunctions.net") else {
            fatalError("Invalid production URL")
        }

        return APIConfiguration(
            baseURL: url,
            timeout: 20.0,
            endpoints: Endpoints()
        )
    }

    static var development: APIConfiguration {
        // Use localhost proxy or mock server
        guard let url = URL(string: "http://localhost:8080/api") else {
            fatalError("Invalid development URL")
        }

        return APIConfiguration(
            baseURL: url,
            timeout: 30.0,
            endpoints: Endpoints()
        )
    }

    // MARK: - Current Configuration

    static var current: APIConfiguration {
        // Use production API for both DEBUG and RELEASE
        // Development requires local proxy at localhost:8080
        return production
    }
}
