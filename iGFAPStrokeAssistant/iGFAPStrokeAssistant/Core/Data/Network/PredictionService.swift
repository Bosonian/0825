//
//  PredictionService.swift
//  iGFAP Stroke Triage Assistant
//
//  Network service for medical predictions
//

import Foundation

// MARK: - Protocol

protocol PredictionServiceProtocol {
    func predictComaICH(gfap: Double) async throws -> ICHPrediction
    func predictLimitedICH(_ data: PatientData) async throws -> ICHPrediction
    func predictFullStroke(_ data: PatientData) async throws -> AssessmentResults
}

// MARK: - Implementation

actor PredictionService: PredictionServiceProtocol {
    private let session: URLSession
    private let baseURL: URL
    private let decoder: JSONDecoder
    private let encoder: JSONEncoder

    init(configuration: APIConfiguration = .current) {
        // Configure URLSession
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = configuration.timeout
        config.timeoutIntervalForResource = 60.0
        config.waitsForConnectivity = true

        self.session = URLSession(configuration: config)
        self.baseURL = configuration.baseURL

        // Configure JSON decoder
        self.decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase

        // Configure JSON encoder
        self.encoder = JSONEncoder()
        encoder.keyEncodingStrategy = .convertToSnakeCase
    }

    // MARK: - Coma ICH Prediction

    func predictComaICH(gfap: Double) async throws -> ICHPrediction {
        let endpoint = baseURL.appendingPathComponent("predict_coma_ich")

        let requestBody: [String: Any] = [
            "gfap_value": gfap
        ]

        let request = try buildRequest(
            url: endpoint,
            method: "POST",
            body: requestBody
        )

        let (data, response) = try await session.data(for: request)
        try validateResponse(response)

        let apiResponse = try decoder.decode(ICHAPIResponse.self, from: data)
        return apiResponse.toDomain(module: .coma, gfap: gfap)
    }

    // MARK: - Limited ICH Prediction

    func predictLimitedICH(_ data: PatientData) async throws -> ICHPrediction {
        let endpoint = baseURL.appendingPathComponent("predict_limited_data_ich")

        let requestBody: [String: Any] = [
            "age_years": data.ageYears ?? 0,
            "systolic_bp": data.systolicBP ?? 0,
            "diastolic_bp": data.diastolicBP ?? 0,
            "gfap_value": data.gfapValue ?? 0,
            "vigilanzminderung": data.vigilanceReduction
        ]

        let request = try buildRequest(
            url: endpoint,
            method: "POST",
            body: requestBody
        )

        let (responseData, response) = try await session.data(for: request)
        try validateResponse(response)

        let apiResponse = try decoder.decode(ICHAPIResponse.self, from: responseData)
        return apiResponse.toDomain(module: .limited, gfap: data.gfapValue ?? 0)
    }

    // MARK: - Full Stroke Prediction

    func predictFullStroke(_ data: PatientData) async throws -> AssessmentResults {
        let endpoint = baseURL.appendingPathComponent("predict_full_stroke")

        let requestBody: [String: Any] = [
            "age_years": data.ageYears ?? 0,
            "systolic_bp": data.systolicBP ?? 0,
            "diastolic_bp": data.diastolicBP ?? 0,
            "gfap_value": data.gfapValue ?? 0,
            "fast_ed_score": data.fastEdScore ?? 0,
            "headache": data.headache,
            "vigilanzminderung": data.vigilanceReduction,
            "armparese": data.armParesis,
            "beinparese": data.legParesis,
            "eye_deviation": data.eyeDeviation,
            "atrial_fibrillation": data.atrialFibrillation,
            "anticoagulated_noak": data.anticoagulated,
            "antiplatelets": data.antiplatelets
        ]

        let request = try buildRequest(
            url: endpoint,
            method: "POST",
            body: requestBody
        )

        let (responseData, response) = try await session.data(for: request)
        try validateResponse(response)

        let apiResponse = try decoder.decode(FullStrokeAPIResponse.self, from: responseData)
        return apiResponse.toDomain(gfap: data.gfapValue ?? 0)
    }

    // MARK: - Helper Methods

    private func buildRequest(
        url: URL,
        method: String,
        body: [String: Any]
    ) throws -> URLRequest {
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        return request
    }

    private func validateResponse(_ response: URLResponse) throws {
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.unknownError(NSError(domain: "Invalid response", code: -1))
        }

        switch httpResponse.statusCode {
        case 200...299:
            return
        case 401:
            throw APIError.unauthorized
        case 408:
            throw APIError.timeout
        case 400...499:
            throw APIError.invalidRequest("Status code: \(httpResponse.statusCode)")
        case 500...599:
            throw APIError.serverError(httpResponse.statusCode, "Server error")
        default:
            throw APIError.unknownError(NSError(domain: "HTTP", code: httpResponse.statusCode))
        }
    }
}

// MARK: - API Response Models

private struct ICHAPIResponse: Codable {
    let probability: Double
    let ichProbability: Double?
    let drivers: [String: Double]
    let confidence: Double

    enum CodingKeys: String, CodingKey {
        case probability
        case ichProbability = "ich_probability"
        case drivers
        case confidence
    }

    func toDomain(module: AssessmentModule, gfap: Double) -> ICHPrediction {
        // Convert drivers dictionary to RiskDriver array
        let driverList = drivers.map { key, value -> RiskDriver in
            RiskDriver(
                name: key,
                displayName: formatDriverName(key),
                weight: value,
                category: categorizeDriver(key)
            )
        }

        // Calculate ICH volume if GFAP available
        let volume = gfap > 0 ? ICHVolumeCalculator.estimateVolume(fromGFAP: gfap) : nil

        return ICHPrediction(
            probability: ichProbability ?? probability,
            drivers: driverList,
            confidence: confidence,
            volume: volume
        )
    }

    private func formatDriverName(_ key: String) -> String {
        key.replacingOccurrences(of: "_", with: " ").capitalized
    }

    private func categorizeDriver(_ key: String) -> RiskDriver.DriverCategory {
        switch key.lowercased() {
        case _ where key.contains("age"):
            return .demographic
        case _ where key.contains("bp"), _ where key.contains("blood"):
            return .vital
        case _ where key.contains("gfap"):
            return .biomarker
        case _ where key.contains("fast"), _ where key.contains("gcs"),
             _ where key.contains("vigilanz"), _ where key.contains("parese"):
            return .neurological
        default:
            return .history
        }
    }
}

private struct FullStrokeAPIResponse: Codable {
    let ichPrediction: ICHPredictionAPI
    let lvoPrediction: LVOPredictionAPI

    enum CodingKeys: String, CodingKey {
        case ichPrediction = "ich_prediction"
        case lvoPrediction = "lvo_prediction"
    }

    struct ICHPredictionAPI: Codable {
        let probability: Double
        let drivers: [String: Double]
        let confidence: Double
    }

    struct LVOPredictionAPI: Codable {
        let probability: Double
        let drivers: [String: Double]
        let confidence: Double
    }

    func toDomain(gfap: Double) -> AssessmentResults {
        // Convert ICH
        let ichDrivers = ichPrediction.drivers.map { key, value -> RiskDriver in
            RiskDriver(
                name: key,
                displayName: formatDriverName(key),
                weight: value,
                category: categorizeDriver(key)
            )
        }

        let volume = gfap > 0 ? ICHVolumeCalculator.estimateVolume(fromGFAP: gfap) : nil

        let ich = ICHPrediction(
            probability: ichPrediction.probability,
            drivers: ichDrivers,
            confidence: ichPrediction.confidence,
            volume: volume
        )

        // Convert LVO
        let lvoDrivers = lvoPrediction.drivers.map { key, value -> RiskDriver in
            RiskDriver(
                name: key,
                displayName: formatDriverName(key),
                weight: value,
                category: categorizeDriver(key)
            )
        }

        let lvo = LVOPrediction(
            probability: lvoPrediction.probability,
            drivers: lvoDrivers,
            confidence: lvoPrediction.confidence
        )

        return AssessmentResults(
            ich: ich,
            lvo: lvo,
            module: .full
        )
    }

    private func formatDriverName(_ key: String) -> String {
        key.replacingOccurrences(of: "_", with: " ").capitalized
    }

    private func categorizeDriver(_ key: String) -> RiskDriver.DriverCategory {
        switch key.lowercased() {
        case _ where key.contains("age"):
            return .demographic
        case _ where key.contains("bp"), _ where key.contains("blood"):
            return .vital
        case _ where key.contains("gfap"):
            return .biomarker
        case _ where key.contains("fast"), _ where key.contains("gcs"),
             _ where key.contains("vigilanz"), _ where key.contains("parese"):
            return .neurological
        default:
            return .history
        }
    }
}
