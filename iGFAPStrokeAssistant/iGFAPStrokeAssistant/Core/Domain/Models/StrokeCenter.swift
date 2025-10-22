//
//  StrokeCenter.swift
//  iGFAP Stroke Triage Assistant
//
//  Stroke center data model
//

import Foundation
import CoreLocation

// MARK: - Stroke Center

struct StrokeCenter: Identifiable, Codable {
    let id: UUID
    let name: String
    let type: CenterType
    let address: String
    let city: String
    let country: String
    let latitude: Double
    let longitude: Double
    let phoneNumber: String?
    let capabilities: [String]

    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }

    var location: CLLocation {
        CLLocation(latitude: latitude, longitude: longitude)
    }

    enum CenterType: String, Codable {
        case primary = "Primary"
        case comprehensive = "Comprehensive"

        var displayName: String {
            rawValue + " Stroke Center"
        }

        var icon: String {
            switch self {
            case .primary: return "cross.circle.fill"
            case .comprehensive: return "staroflife.fill"
            }
        }

        var color: String {
            switch self {
            case .primary: return "blue"
            case .comprehensive: return "red"
            }
        }
    }

    // Calculate distance from user location
    func distance(from userLocation: CLLocation) -> CLLocationDistance {
        location.distance(from: userLocation)
    }

    // Format distance as string
    func formattedDistance(from userLocation: CLLocation) -> String {
        let meters = distance(from: userLocation)
        let kilometers = meters / 1000.0

        if kilometers < 1.0 {
            return String(format: "%.0f m", meters)
        } else {
            return String(format: "%.1f km", kilometers)
        }
    }

    // Estimated travel time (rough estimate: 50 km/h average)
    func estimatedTravelTime(from userLocation: CLLocation) -> String {
        let kilometers = distance(from: userLocation) / 1000.0
        let hours = kilometers / 50.0  // Assume 50 km/h average speed
        let minutes = Int(hours * 60)

        if minutes < 60 {
            return "\(minutes) min"
        } else {
            let hrs = minutes / 60
            let mins = minutes % 60
            return "\(hrs)h \(mins)min"
        }
    }
}

// MARK: - Sample Data

extension StrokeCenter {
    static var sampleGerman: [StrokeCenter] {
        [
            StrokeCenter(
                id: UUID(),
                name: "RKH Klinikum Ludwigsburg",
                type: .comprehensive,
                address: "Posilipostraße 4",
                city: "Ludwigsburg",
                country: "Germany",
                latitude: 48.8969,
                longitude: 9.2076,
                phoneNumber: "+49 7141 99-0",
                capabilities: ["24/7 Stroke Unit", "Thrombectomy", "Neurosurgery", "ICU"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Heidelberg",
                type: .comprehensive,
                address: "Im Neuenheimer Feld 400",
                city: "Heidelberg",
                country: "Germany",
                latitude: 49.4178,
                longitude: 8.6742,
                phoneNumber: "+49 6221 56-0",
                capabilities: ["24/7 Stroke Unit", "Thrombectomy", "Research Center"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Stuttgart",
                type: .comprehensive,
                address: "Kriegsbergstraße 60",
                city: "Stuttgart",
                country: "Germany",
                latitude: 48.7904,
                longitude: 9.1740,
                phoneNumber: "+49 711 278-0",
                capabilities: ["24/7 Stroke Unit", "Thrombectomy", "Neurosurgery"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Tübingen",
                type: .comprehensive,
                address: "Hoppe-Seyler-Straße 3",
                city: "Tübingen",
                country: "Germany",
                latitude: 48.5378,
                longitude: 9.0339,
                phoneNumber: "+49 7071 29-0",
                capabilities: ["24/7 Stroke Unit", "Thrombectomy", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Krankenhaus Bietigheim",
                type: .primary,
                address: "Riedstraße 12",
                city: "Bietigheim-Bissingen",
                country: "Germany",
                latitude: 48.9567,
                longitude: 9.1276,
                phoneNumber: "+49 7142 79-0",
                capabilities: ["Stroke Unit", "CT/MRI"]
            )
        ]
    }
}
