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
            // Bayern - Neurosurgical Centers (Top Tier)
            StrokeCenter(
                id: UUID(),
                name: "LMU Klinikum München - Großhadern",
                type: .comprehensive,
                address: "Marchioninistraße 15",
                city: "München",
                country: "Germany",
                latitude: 48.1106,
                longitude: 11.4684,
                phoneNumber: "+49 89 4400-73331",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network", "1440 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum rechts der Isar München (TUM)",
                type: .comprehensive,
                address: "Ismaninger Str. 22",
                city: "München",
                country: "Germany",
                latitude: 48.1497,
                longitude: 11.6052,
                phoneNumber: "+49 89 4140-2249",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network", "1161 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Städtisches Klinikum München Schwabing",
                type: .comprehensive,
                address: "Kölner Platz 1",
                city: "München",
                country: "Germany",
                latitude: 48.1732,
                longitude: 11.5755,
                phoneNumber: "+49 89 3068-2050",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Erlangen",
                type: .comprehensive,
                address: "Maximiliansplatz 2",
                city: "Erlangen",
                country: "Germany",
                latitude: 49.5982,
                longitude: 11.0037,
                phoneNumber: "+49 9131 85-39003",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network", "1371 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Regensburg",
                type: .comprehensive,
                address: "Franz-Josef-Strauß-Allee 11",
                city: "Regensburg",
                country: "Germany",
                latitude: 49.0134,
                longitude: 12.0991,
                phoneNumber: "+49 941 944-7501",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network", "1042 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Würzburg",
                type: .comprehensive,
                address: "Oberdürrbacher Str. 6",
                city: "Würzburg",
                country: "Germany",
                latitude: 49.7840,
                longitude: 9.9721,
                phoneNumber: "+49 931 201-24444",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network", "1264 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Nürnberg Nord",
                type: .comprehensive,
                address: "Prof.-Ernst-Nathan-Str. 1",
                city: "Nürnberg",
                country: "Germany",
                latitude: 49.4521,
                longitude: 11.0767,
                phoneNumber: "+49 911 398-2369",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network", "1368 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Augsburg",
                type: .comprehensive,
                address: "Stenglinstr. 2",
                city: "Augsburg",
                country: "Germany",
                latitude: 48.3668,
                longitude: 10.9093,
                phoneNumber: "+49 821 400-2356",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network", "1740 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Landshut",
                type: .comprehensive,
                address: "Robert-Koch-Str. 1",
                city: "Landshut",
                country: "Germany",
                latitude: 48.5665,
                longitude: 12.1512,
                phoneNumber: "+49 871 698-3333",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Passau",
                type: .comprehensive,
                address: "Bischof-Pilgrim-Str. 1",
                city: "Passau",
                country: "Germany",
                latitude: 48.5665,
                longitude: 13.4777,
                phoneNumber: "+49 851 5300-2222",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "TEMPiS Network"]
            ),

            // Bayern - Comprehensive Stroke Centers
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Bamberg",
                type: .comprehensive,
                address: "Buger Str. 80",
                city: "Bamberg",
                country: "Germany",
                latitude: 49.8988,
                longitude: 10.9027,
                phoneNumber: "+49 951 503-11101",
                capabilities: ["Thrombectomy", "Thrombolysis", "TEMPiS Network"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Bayreuth",
                type: .comprehensive,
                address: "Preuschwitzer Str. 101",
                city: "Bayreuth",
                country: "Germany",
                latitude: 49.9459,
                longitude: 11.5779,
                phoneNumber: "+49 921 400-5401",
                capabilities: ["Thrombectomy", "Thrombolysis", "TEMPiS Network"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Coburg",
                type: .comprehensive,
                address: "Ketschendorfer Str. 33",
                city: "Coburg",
                country: "Germany",
                latitude: 50.2596,
                longitude: 10.9644,
                phoneNumber: "+49 9561 22-6800",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "STENO Network"]
            ),

            // Baden-Württemberg - Major Centers
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
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research Center"]
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
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "24/7 Stroke Unit"]
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
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
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
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "ICU"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Freiburg",
                type: .comprehensive,
                address: "Hugstetter Str. 55",
                city: "Freiburg",
                country: "Germany",
                latitude: 48.0070,
                longitude: 7.8349,
                phoneNumber: "+49 761 270-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Ulm",
                type: .comprehensive,
                address: "Albert-Einstein-Allee 23",
                city: "Ulm",
                country: "Germany",
                latitude: 48.4022,
                longitude: 9.9617,
                phoneNumber: "+49 731 500-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),

            // Baden-Württemberg - Additional Major Centers
            StrokeCenter(
                id: UUID(),
                name: "Städtisches Klinikum Karlsruhe",
                type: .comprehensive,
                address: "Moltkestraße 90",
                city: "Karlsruhe",
                country: "Germany",
                latitude: 49.0047,
                longitude: 8.3858,
                phoneNumber: "+49 721 974-2301",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "FAST Network", "1570 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsmedizin Mannheim",
                type: .comprehensive,
                address: "Theodor-Kutzer-Ufer 1-3",
                city: "Mannheim",
                country: "Germany",
                latitude: 49.4828,
                longitude: 8.4664,
                phoneNumber: "+49 621 383-2251",
                capabilities: ["Thrombectomy", "Thrombolysis", "FAST Network", "1400 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Robert-Bosch-Krankenhaus Stuttgart",
                type: .comprehensive,
                address: "Auerbachstraße 110",
                city: "Stuttgart",
                country: "Germany",
                latitude: 48.7447,
                longitude: 9.2294,
                phoneNumber: "+49 711 8101-3456",
                capabilities: ["Thrombolysis", "FAST Network", "850 beds"]
            ),

            // Nordrhein-Westfalen - Neurosurgical Centers
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Düsseldorf",
                type: .comprehensive,
                address: "Moorenstraße 5",
                city: "Düsseldorf",
                country: "Germany",
                latitude: 51.1906,
                longitude: 6.8064,
                phoneNumber: "+49 211 81-17700",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "NEVANO+ Network", "1300 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Köln",
                type: .comprehensive,
                address: "Kerpener Str. 62",
                city: "Köln",
                country: "Germany",
                latitude: 50.9253,
                longitude: 6.9187,
                phoneNumber: "+49 221 478-32500",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "NEVANO+ Network", "1500 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Essen",
                type: .comprehensive,
                address: "Hufelandstraße 55",
                city: "Essen",
                country: "Germany",
                latitude: 51.4285,
                longitude: 7.0073,
                phoneNumber: "+49 201 723-84444",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "NEVANO+ Network", "1350 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Münster",
                type: .comprehensive,
                address: "Albert-Schweitzer-Campus 1",
                city: "Münster",
                country: "Germany",
                latitude: 51.9607,
                longitude: 7.6261,
                phoneNumber: "+49 251 83-47255",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "NEVANO+ Network", "1513 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Bonn",
                type: .comprehensive,
                address: "Venusberg-Campus 1",
                city: "Bonn",
                country: "Germany",
                latitude: 50.6916,
                longitude: 7.1127,
                phoneNumber: "+49 228 287-15107",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "NEVANO+ Network", "1200 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Dortmund",
                type: .comprehensive,
                address: "Beurhausstraße 40",
                city: "Dortmund",
                country: "Germany",
                latitude: 51.5036,
                longitude: 7.4663,
                phoneNumber: "+49 231 953-20050",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "NVNR Network", "1200 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Aachen",
                type: .comprehensive,
                address: "Pauwelsstraße 30",
                city: "Aachen",
                country: "Germany",
                latitude: 50.7780,
                longitude: 6.0614,
                phoneNumber: "+49 241 80-89611",
                capabilities: ["Thrombectomy", "Thrombolysis", "NEVANO+ Network", "1400 beds"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Helios Universitätsklinikum Wuppertal",
                type: .comprehensive,
                address: "Heusnerstraße 40",
                city: "Wuppertal",
                country: "Germany",
                latitude: 51.2467,
                longitude: 7.1703,
                phoneNumber: "+49 202 896-2180",
                capabilities: ["Thrombolysis", "NEVANO+ Network", "1050 beds"]
            ),

            // Regional Stroke Units
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
                capabilities: ["Stroke Unit", "Thrombolysis", "CT/MRI"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Kreisklinik Ebersberg",
                type: .primary,
                address: "Pfarrer-Guggetzer-Str. 3",
                city: "Ebersberg",
                country: "Germany",
                latitude: 48.0808,
                longitude: 11.9677,
                phoneNumber: "+49 8092 82-0",
                capabilities: ["Stroke Unit", "Thrombolysis", "TEMPiS Network"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Krankenhaus Agatharied",
                type: .primary,
                address: "Norbert-Kerkel-Platz",
                city: "Hausham",
                country: "Germany",
                latitude: 47.7557,
                longitude: 11.8292,
                phoneNumber: "+49 8026 393-0",
                capabilities: ["Stroke Unit", "Thrombolysis", "TEMPiS Network"]
            ),

            // Berlin - Major Centers
            StrokeCenter(
                id: UUID(),
                name: "Charité - Universitätsmedizin Berlin",
                type: .comprehensive,
                address: "Charitéplatz 1",
                city: "Berlin",
                country: "Germany",
                latitude: 52.5252,
                longitude: 13.3769,
                phoneNumber: "+49 30 450-560000",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research Center", "STEMO"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Vivantes Klinikum Neukölln",
                type: .comprehensive,
                address: "Rudower Str. 48",
                city: "Berlin",
                country: "Germany",
                latitude: 52.4513,
                longitude: 13.4365,
                phoneNumber: "+49 30 130-14-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "24/7 Stroke Unit"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Vivantes Auguste-Viktoria-Klinikum",
                type: .comprehensive,
                address: "Rubensstraße 125",
                city: "Berlin",
                country: "Germany",
                latitude: 52.4841,
                longitude: 13.2820,
                phoneNumber: "+49 30 130-20-0",
                capabilities: ["Thrombectomy", "Thrombolysis", "Stroke Unit"]
            ),

            // Hamburg
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Hamburg-Eppendorf (UKE)",
                type: .comprehensive,
                address: "Martinistraße 52",
                city: "Hamburg",
                country: "Germany",
                latitude: 53.5897,
                longitude: 9.9748,
                phoneNumber: "+49 40 7410-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "NVN Nordelbe", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Asklepios Klinik Altona",
                type: .comprehensive,
                address: "Paul-Ehrlich-Straße 1",
                city: "Hamburg",
                country: "Germany",
                latitude: 53.5531,
                longitude: 9.9287,
                phoneNumber: "+49 40 1818-81-0",
                capabilities: ["Thrombectomy", "Thrombolysis", "NVN Nordelbe"]
            ),

            // Niedersachsen
            StrokeCenter(
                id: UUID(),
                name: "Medizinische Hochschule Hannover (MHH)",
                type: .comprehensive,
                address: "Carl-Neuberg-Str. 1",
                city: "Hannover",
                country: "Germany",
                latitude: 52.3847,
                longitude: 9.8008,
                phoneNumber: "+49 511 532-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsmedizin Göttingen",
                type: .comprehensive,
                address: "Robert-Koch-Str. 40",
                city: "Göttingen",
                country: "Germany",
                latitude: 51.5557,
                longitude: 9.9501,
                phoneNumber: "+49 551 39-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Braunschweig",
                type: .comprehensive,
                address: "Holwedestraße 16",
                city: "Braunschweig",
                country: "Germany",
                latitude: 52.2805,
                longitude: 10.5510,
                phoneNumber: "+49 531 595-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Oldenburg",
                type: .comprehensive,
                address: "Rahel-Straus-Str. 10",
                city: "Oldenburg",
                country: "Germany",
                latitude: 53.1582,
                longitude: 8.1949,
                phoneNumber: "+49 441 403-0",
                capabilities: ["Thrombectomy", "Thrombolysis", "Stroke Unit"]
            ),

            // Hessen
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Frankfurt",
                type: .comprehensive,
                address: "Theodor-Stern-Kai 7",
                city: "Frankfurt am Main",
                country: "Germany",
                latitude: 50.0962,
                longitude: 8.6693,
                phoneNumber: "+49 69 6301-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Gießen",
                type: .comprehensive,
                address: "Rudolf-Buchheim-Str. 8",
                city: "Gießen",
                country: "Germany",
                latitude: 50.5836,
                longitude: 8.6819,
                phoneNumber: "+49 641 985-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Kassel",
                type: .comprehensive,
                address: "Mönchebergstr. 41-43",
                city: "Kassel",
                country: "Germany",
                latitude: 51.2959,
                longitude: 9.4964,
                phoneNumber: "+49 561 980-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Neuro Netz Mitte"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Darmstadt",
                type: .comprehensive,
                address: "Grafenstraße 9",
                city: "Darmstadt",
                country: "Germany",
                latitude: 49.8692,
                longitude: 8.6426,
                phoneNumber: "+49 6151 107-0",
                capabilities: ["Thrombectomy", "Thrombolysis", "Stroke Unit"]
            ),

            // Rheinland-Pfalz
            StrokeCenter(
                id: UUID(),
                name: "Universitätsmedizin Mainz",
                type: .comprehensive,
                address: "Langenbeckstr. 1",
                city: "Mainz",
                country: "Germany",
                latitude: 49.9914,
                longitude: 8.2367,
                phoneNumber: "+49 6131 17-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Westpfalz-Klinikum Kaiserslautern",
                type: .comprehensive,
                address: "Hellenberg",
                city: "Kaiserslautern",
                country: "Germany",
                latitude: 49.4478,
                longitude: 7.7661,
                phoneNumber: "+49 631 203-0",
                capabilities: ["Thrombectomy", "Thrombolysis", "Stroke Unit"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Koblenz-Montabaur",
                type: .comprehensive,
                address: "Koblenzer Str. 115-155",
                city: "Koblenz",
                country: "Germany",
                latitude: 50.3569,
                longitude: 7.5950,
                phoneNumber: "+49 261 499-0",
                capabilities: ["Thrombectomy", "Thrombolysis"]
            ),

            // Saarland
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum des Saarlandes",
                type: .comprehensive,
                address: "Kirrberger Str. 100",
                city: "Homburg",
                country: "Germany",
                latitude: 49.3193,
                longitude: 7.3347,
                phoneNumber: "+49 6841 16-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Saarbrücken",
                type: .comprehensive,
                address: "Winterberg 1",
                city: "Saarbrücken",
                country: "Germany",
                latitude: 49.2401,
                longitude: 7.0051,
                phoneNumber: "+49 681 963-0",
                capabilities: ["Thrombectomy", "Thrombolysis", "Comprehensive Stroke Unit"]
            ),

            // Sachsen (Saxony)
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Dresden",
                type: .comprehensive,
                address: "Fetscherstraße 74",
                city: "Dresden",
                country: "Germany",
                latitude: 51.0504,
                longitude: 13.7373,
                phoneNumber: "+49 351 458-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "SOS-NET", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Leipzig",
                type: .comprehensive,
                address: "Liebigstraße 20",
                city: "Leipzig",
                country: "Germany",
                latitude: 51.3397,
                longitude: 12.3731,
                phoneNumber: "+49 341 97-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Chemnitz",
                type: .comprehensive,
                address: "Flemmingstraße 2",
                city: "Chemnitz",
                country: "Germany",
                latitude: 50.8279,
                longitude: 12.9214,
                phoneNumber: "+49 371 333-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis"]
            ),

            // Thüringen (Thuringia)
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Jena",
                type: .comprehensive,
                address: "Am Klinikum 1",
                city: "Jena",
                country: "Germany",
                latitude: 50.9275,
                longitude: 11.5892,
                phoneNumber: "+49 3641 9-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "NVN Thüringen", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "HELIOS Klinikum Erfurt",
                type: .comprehensive,
                address: "Nordhäuser Str. 74",
                city: "Erfurt",
                country: "Germany",
                latitude: 50.9961,
                longitude: 11.0342,
                phoneNumber: "+49 361 781-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Telemedicine"]
            ),

            // Brandenburg
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Ernst von Bergmann",
                type: .comprehensive,
                address: "Charlottenstraße 72",
                city: "Potsdam",
                country: "Germany",
                latitude: 52.3988,
                longitude: 13.0582,
                phoneNumber: "+49 331 241-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Berlin-Brandenburg NVN"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Brandenburg",
                type: .comprehensive,
                address: "Hochstraße 29",
                city: "Brandenburg an der Havel",
                country: "Germany",
                latitude: 52.4125,
                longitude: 12.5316,
                phoneNumber: "+49 3381 41-0",
                capabilities: ["Thrombectomy", "Thrombolysis", "Stroke Unit"]
            ),

            // Sachsen-Anhalt
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Magdeburg",
                type: .comprehensive,
                address: "Leipziger Str. 44",
                city: "Magdeburg",
                country: "Germany",
                latitude: 52.1205,
                longitude: 11.6276,
                phoneNumber: "+49 391 67-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Halle",
                type: .comprehensive,
                address: "Ernst-Grube-Str. 40",
                city: "Halle (Saale)",
                country: "Germany",
                latitude: 51.4969,
                longitude: 11.9696,
                phoneNumber: "+49 345 557-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),

            // Mecklenburg-Vorpommern
            StrokeCenter(
                id: UUID(),
                name: "Universitätsmedizin Rostock",
                type: .comprehensive,
                address: "Schillingallee 35",
                city: "Rostock",
                country: "Germany",
                latitude: 54.0924,
                longitude: 12.0989,
                phoneNumber: "+49 381 494-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsmedizin Greifswald",
                type: .comprehensive,
                address: "Ferdinand-Sauerbruch-Str.",
                city: "Greifswald",
                country: "Germany",
                latitude: 54.0865,
                longitude: 13.3923,
                phoneNumber: "+49 3834 86-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),

            // Schleswig-Holstein
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Schleswig-Holstein (UKSH) Kiel",
                type: .comprehensive,
                address: "Arnold-Heller-Str. 3",
                city: "Kiel",
                country: "Germany",
                latitude: 54.3399,
                longitude: 10.1206,
                phoneNumber: "+49 431 500-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),
            StrokeCenter(
                id: UUID(),
                name: "Universitätsklinikum Schleswig-Holstein (UKSH) Lübeck",
                type: .comprehensive,
                address: "Ratzeburger Allee 160",
                city: "Lübeck",
                country: "Germany",
                latitude: 53.8711,
                longitude: 10.7024,
                phoneNumber: "+49 451 500-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis", "Research"]
            ),

            // Bremen
            StrokeCenter(
                id: UUID(),
                name: "Klinikum Bremen-Mitte",
                type: .comprehensive,
                address: "St.-Jürgen-Str. 1",
                city: "Bremen",
                country: "Germany",
                latitude: 53.0793,
                longitude: 8.8017,
                phoneNumber: "+49 421 497-0",
                capabilities: ["Neurosurgery", "Thrombectomy", "Thrombolysis"]
            )
        ]
    }
}
