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
        // Note: Using explicit CodingKeys in models, not automatic snake_case conversion

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

        // Debug: Print raw JSON response
        if let jsonString = String(data: data, encoding: .utf8) {
            print("🔍 Raw API Response: \(jsonString)")
        }

        let apiResponse = try decoder.decode(ICHAPIResponse.self, from: data)
        print("🔍 Decoded probability: \(apiResponse.probability ?? -1), ichProbability: \(apiResponse.ichProbability ?? -1)")

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
            "vigilanzminderung": data.vigilanceReduction ? 1 : 0
        ]

        // Debug: Log request
        print("🔍 Limited Request Body: \(requestBody)")

        let request = try buildRequest(
            url: endpoint,
            method: "POST",
            body: requestBody
        )

        let (responseData, response) = try await session.data(for: request)
        try validateResponse(response)

        // Debug: Print raw JSON response
        if let jsonString = String(data: responseData, encoding: .utf8) {
            print("🔍 Limited API Response: \(jsonString)")
        }

        let apiResponse = try decoder.decode(ICHAPIResponse.self, from: responseData)
        print("🔍 Limited Decoded - probability: \(apiResponse.probability ?? -1), ichProbability: \(apiResponse.ichProbability ?? -1)")

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
            "headache": data.headache ? 1 : 0,
            "vigilanzminderung": data.vigilanceReduction ? 1 : 0,
            "armparese": data.armParesis ? 1 : 0,
            "beinparese": data.legParesis ? 1 : 0,
            "eye_deviation": data.eyeDeviation ? 1 : 0,
            "atrial_fibrillation": data.atrialFibrillation ? 1 : 0,
            "anticoagulated_noak": data.anticoagulated ? 1 : 0,
            "antiplatelets": data.antiplatelets ? 1 : 0
        ]

        // Debug: Log request
        print("🔍 Full Stroke Request Body: \(requestBody)")

        let request = try buildRequest(
            url: endpoint,
            method: "POST",
            body: requestBody
        )

        let (responseData, response) = try await session.data(for: request)
        try validateResponse(response)

        // Debug: Print raw JSON response
        if let jsonString = String(data: responseData, encoding: .utf8) {
            print("🔍 Full Stroke API Response: \(jsonString)")
        }

        do {
            let apiResponse = try decoder.decode(FullStrokeAPIResponse.self, from: responseData)
            print("🔍 Full Stroke Decoded - ICH: \(apiResponse.ichPrediction.probability), LVO: \(apiResponse.lvoPrediction.probability)")
            return apiResponse.toDomain(gfap: data.gfapValue ?? 0)
        } catch {
            print("❌ Full Stroke Decoding Error: \(error)")
            if let decodingError = error as? DecodingError {
                switch decodingError {
                case .keyNotFound(let key, let context):
                    print("❌ Missing key: \(key.stringValue) at path: \(context.codingPath.map { $0.stringValue }.joined(separator: " -> "))")
                case .typeMismatch(let type, let context):
                    print("❌ Type mismatch for type: \(type) at path: \(context.codingPath.map { $0.stringValue }.joined(separator: " -> "))")
                case .valueNotFound(let type, let context):
                    print("❌ Value not found for type: \(type) at path: \(context.codingPath.map { $0.stringValue }.joined(separator: " -> "))")
                case .dataCorrupted(let context):
                    print("❌ Data corrupted at path: \(context.codingPath.map { $0.stringValue }.joined(separator: " -> "))")
                @unknown default:
                    print("❌ Unknown decoding error")
                }
            }
            throw error
        }
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
    let probability: Double?
    let ichProbability: Double?
    let drivers: [String: Double]?
    let driversComplex: DriversComplex?
    let confidence: Double?

    enum CodingKeys: String, CodingKey {
        case probability
        case ichProbability = "ich_probability"
        case drivers
        case confidence
    }

    // Custom decoder to handle both simple and complex drivers
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        probability = try container.decodeIfPresent(Double.self, forKey: .probability)
        ichProbability = try container.decodeIfPresent(Double.self, forKey: .ichProbability)
        confidence = try container.decodeIfPresent(Double.self, forKey: .confidence)

        // Try to decode drivers as simple dictionary first
        if let simpleDrivers = try? container.decodeIfPresent([String: Double].self, forKey: .drivers) {
            drivers = simpleDrivers
            driversComplex = nil
        } else if let complexDrivers = try? container.decodeIfPresent(DriversComplex.self, forKey: .drivers) {
            // If that fails, try complex structure and convert it
            driversComplex = complexDrivers
            // Convert complex to simple format
            var combined: [String: Double] = [:]
            for item in complexDrivers.positive {
                combined[item.label] = item.weight
            }
            for item in complexDrivers.negative {
                combined[item.label] = item.weight
            }
            drivers = combined.isEmpty ? nil : combined
        } else {
            drivers = nil
            driversComplex = nil
        }
    }

    struct DriversComplex: Codable {
        let positive: [DriverItem]
        let negative: [DriverItem]

        struct DriverItem: Codable {
            let label: String
            let weight: Double
        }
    }

    func toDomain(module: AssessmentModule, gfap: Double) -> ICHPrediction {
        // Convert drivers dictionary to RiskDriver array (default to empty if missing)
        let driverList = (drivers ?? [:]).map { key, value -> RiskDriver in
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
            probability: ichProbability ?? probability ?? 0.0,
            drivers: driverList,
            confidence: confidence ?? 0.95, // Default confidence
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
        let drivers: [String: Double]?
        let driversComplex: DriversComplex?
        let confidence: Double?  // Optional - Full Stroke API doesn't return this

        struct DriversComplex: Codable {
            let positive: [DriverItem]
            let negative: [DriverItem]

            struct DriverItem: Codable {
                let label: String
                let weight: Double
            }
        }

        // Custom decoder to handle both simple and complex drivers
        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            probability = try container.decode(Double.self, forKey: .probability)
            confidence = try container.decodeIfPresent(Double.self, forKey: .confidence)

            // Try to decode drivers as simple dictionary first
            if let simpleDrivers = try? container.decodeIfPresent([String: Double].self, forKey: .drivers) {
                drivers = simpleDrivers
                driversComplex = nil
            } else if let complexDrivers = try? container.decodeIfPresent(DriversComplex.self, forKey: .drivers) {
                // If that fails, try complex structure and convert it
                driversComplex = complexDrivers
                // Convert complex to simple format
                var combined: [String: Double] = [:]
                for item in complexDrivers.positive {
                    combined[item.label] = item.weight
                }
                for item in complexDrivers.negative {
                    combined[item.label] = item.weight
                }
                drivers = combined.isEmpty ? nil : combined
            } else {
                drivers = nil
                driversComplex = nil
            }
        }

        enum CodingKeys: String, CodingKey {
            case probability
            case drivers
            case confidence
        }
    }

    struct LVOPredictionAPI: Codable {
        let probability: Double
        let drivers: [String: Double]?
        let driversComplex: DriversComplex?
        let confidence: Double?  // Optional - Full Stroke API doesn't return this

        struct DriversComplex: Codable {
            let positive: [DriverItem]
            let negative: [DriverItem]

            struct DriverItem: Codable {
                let label: String
                let weight: Double
            }
        }

        // Custom decoder to handle both simple and complex drivers
        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            probability = try container.decode(Double.self, forKey: .probability)
            confidence = try container.decodeIfPresent(Double.self, forKey: .confidence)

            // Try to decode drivers as simple dictionary first
            if let simpleDrivers = try? container.decodeIfPresent([String: Double].self, forKey: .drivers) {
                drivers = simpleDrivers
                driversComplex = nil
            } else if let complexDrivers = try? container.decodeIfPresent(DriversComplex.self, forKey: .drivers) {
                // If that fails, try complex structure and convert it
                driversComplex = complexDrivers
                // Convert complex to simple format
                var combined: [String: Double] = [:]
                for item in complexDrivers.positive {
                    combined[item.label] = item.weight
                }
                for item in complexDrivers.negative {
                    combined[item.label] = item.weight
                }
                drivers = combined.isEmpty ? nil : combined
            } else {
                drivers = nil
                driversComplex = nil
            }
        }

        enum CodingKeys: String, CodingKey {
            case probability
            case drivers
            case confidence
        }
    }

    func toDomain(gfap: Double) -> AssessmentResults {
        // Convert ICH
        let ichDrivers = (ichPrediction.drivers ?? [:]).map { key, value -> RiskDriver in
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
            confidence: ichPrediction.confidence ?? 0.95,  // Default confidence if not provided
            volume: volume
        )

        // Convert LVO
        let lvoDrivers = (lvoPrediction.drivers ?? [:]).map { key, value -> RiskDriver in
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
            confidence: lvoPrediction.confidence ?? 0.95  // Default confidence if not provided
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
