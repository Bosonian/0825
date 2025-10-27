//
//  IntelligentRoutingView.swift
//  iGFAP Stroke Triage Assistant
//
//  Intelligent hospital routing based on ICH probability
//

import SwiftUI
import CoreLocation

struct IntelligentRoutingView: View {
    let ichProbability: Double
    @StateObject private var locationManager = LocationManager()
    @State private var routing: HospitalRouting?
    @State private var alternatives: [StrokeCenter] = []
    @State private var showingLocationError = false
    @State private var showManualLocation = false
    @State private var manualLocationText = ""
    @State private var isSearching = false
    @State private var effectiveLocation: CLLocation? // Either GPS or manually searched location

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "location.circle.fill")
                        .font(.system(size: 50))
                        .foregroundColor(.blue)

                    Text("Recommended Destination")
                        .font(.title)
                        .fontWeight(.bold)

                    Text("Based on patient risk profile")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding(.top, 20)

                // Location Options
                VStack(spacing: 12) {
                    Button(action: {
                        if let location = locationManager.location {
                            effectiveLocation = location
                            calculateRouting(userLocation: location)
                        } else {
                            locationManager.requestLocation()
                        }
                    }) {
                        Label("Use Current Location", systemImage: "location.fill")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }

                    Button(action: { showManualLocation.toggle() }) {
                        Label(showManualLocation ? "Hide Manual Input" : "Enter Location Manually", systemImage: "pencil")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.gray.opacity(0.2))
                            .foregroundColor(.blue)
                            .cornerRadius(10)
                    }

                    if showManualLocation {
                        VStack(spacing: 8) {
                            TextField("e.g. Stuttgart, Heidelberg or 48.78,9.18", text: $manualLocationText)
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                                .autocapitalization(.none)

                            Button(action: searchManualLocation) {
                                if isSearching {
                                    ProgressView()
                                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                } else {
                                    Label("Search", systemImage: "magnifyingglass")
                                }
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.green)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                            .disabled(manualLocationText.isEmpty || isSearching)
                        }
                        .padding()
                        .background(Color.gray.opacity(0.1))
                        .cornerRadius(12)
                    }
                }
                .padding(.horizontal)

                // Location Status
                if routing == nil && locationManager.location == nil && !isSearching {
                    VStack(spacing: 16) {
                        if locationManager.authorizationStatus == .denied {
                            Text("Location access denied. Please enable in Settings.")
                                .font(.subheadline)
                                .foregroundColor(.red)
                                .multilineTextAlignment(.center)
                        } else {
                            ProgressView()
                            Text("Getting your location...")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                    }
                    .padding()
                } else if let routing = routing {
                    // Routing Explanation
                    RoutingExplanationCard(routing: routing, ichPercent: ichProbability * 100)

                    // Primary Destination
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Image(systemName: routing.urgency.icon)
                                .foregroundColor(routing.urgency.color)
                            Text("Primary Destination")
                                .font(.title2)
                                .fontWeight(.bold)
                        }

                        StrokeCenterCard(
                            center: routing.destination,
                            isPrimary: true,
                            userLocation: effectiveLocation ?? locationManager.location
                        )
                    }

                    // Alternative Centers
                    if !alternatives.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Alternative Centers")
                                .font(.title3)
                                .fontWeight(.semibold)

                            ForEach(alternatives) { center in
                                StrokeCenterCard(
                                    center: center,
                                    isPrimary: false,
                                    userLocation: effectiveLocation ?? locationManager.location
                                )
                            }
                        }
                    }
                } else {
                    Text("Calculating optimal route...")
                        .foregroundColor(.secondary)
                }
            }
            .padding()
        }
        .navigationTitle("Stroke Centers")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func calculateRouting(userLocation: CLLocation) {
        print("🗺️ User location: \(userLocation.coordinate.latitude), \(userLocation.coordinate.longitude)")
        print("🗺️ Total centers in database: \(StrokeCenter.sampleGerman.count)")

        let routing = HospitalRoutingAlgorithm.routePatient(
            ichProbability: ichProbability,
            userLocation: userLocation,
            allCenters: StrokeCenter.sampleGerman
        )

        self.routing = routing

        print("🏥 Selected hospital: \(routing.destination.name) in \(routing.destination.city)")
        print("🏥 Distance: \(routing.destination.formattedDistance(from: userLocation))")

        // Find 3 alternative centers
        let sorted = StrokeCenter.sampleGerman
            .filter { $0.id != routing.destination.id }
            .sorted { center1, center2 in
                center1.distance(from: userLocation) < center2.distance(from: userLocation)
            }

        self.alternatives = Array(sorted.prefix(3))

        if !alternatives.isEmpty {
            print("🏥 Alternative 1: \(alternatives[0].name) in \(alternatives[0].city)")
        }
    }

    private func searchManualLocation() {
        let trimmed = manualLocationText.trim()
        guard !trimmed.isEmpty else { return }

        isSearching = true

        // Check if input is coordinates (latitude, longitude)
        let coordinatePattern = #"^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$"#
        if let regex = try? NSRegularExpression(pattern: coordinatePattern),
           let match = regex.firstMatch(in: trimmed, range: NSRange(trimmed.startIndex..., in: trimmed)),
           match.numberOfRanges == 3 {

            if let latRange = Range(match.range(at: 1), in: trimmed),
               let lonRange = Range(match.range(at: 2), in: trimmed),
               let lat = Double(trimmed[latRange]),
               let lon = Double(trimmed[lonRange]) {

                let location = CLLocation(latitude: lat, longitude: lon)
                print("📍 Manual coordinates: \(lat), \(lon)")
                effectiveLocation = location  // Override GPS with manual coordinates
                calculateRouting(userLocation: location)
                isSearching = false
                return
            }
        }

        // Use Nominatim API (OpenStreetMap) - same as PWA for consistency
        // This accepts ANY location in Germany without manual city additions
        geocodeWithNominatim(location: trimmed)
    }

    /// Geocode location using Nominatim API (OpenStreetMap) - matches PWA implementation
    private func geocodeWithNominatim(location: String) {
        // Add ", Deutschland" if not already included (matching PWA behavior)
        var searchLocation = location
        let searchLower = searchLocation.lowercased()
        if !searchLower.contains("germany")
            && !searchLower.contains("deutschland")
            && !searchLower.contains("bayern")
            && !searchLower.contains("bavaria")
            && !searchLower.contains("nordrhein")
            && !searchLower.contains("baden") {
            searchLocation += ", Deutschland"
        }

        // Build Nominatim URL with country restriction (matching PWA)
        guard let encodedLocation = searchLocation.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed),
              let url = URL(string: "https://nominatim.openstreetmap.org/search?q=\(encodedLocation)&countrycodes=de&format=json&limit=3&addressdetails=1") else {
            print("❌ Failed to create geocoding URL")
            isSearching = false
            return
        }

        var request = URLRequest(url: url)
        request.setValue("iGFAP-StrokeTriage/2.1.0", forHTTPHeaderField: "User-Agent")
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                isSearching = false

                if let error = error {
                    print("❌ Nominatim error: \(error.localizedDescription)")
                    print("💡 Tip: Try entering coordinates directly (e.g., '48.8833, 9.2833')")
                    return
                }

                guard let data = data else {
                    print("❌ No data received from Nominatim")
                    return
                }

                do {
                    let results = try JSONDecoder().decode([NominatimResult].self, from: data)

                    if results.isEmpty {
                        print("❌ No location found for '\(location)'")
                        print("💡 Try: City name, address, or coordinates (e.g., '48.8833, 9.2833')")
                        return
                    }

                    // Prefer results from supported states (matching PWA logic)
                    let supportedStates = ["Bayern", "Baden-Württemberg", "Nordrhein-Westfalen"]
                    var selectedResult = results[0]

                    for result in results {
                        if let state = result.address?.state, supportedStates.contains(state) {
                            selectedResult = result
                            break
                        }
                    }

                    // Accept ANY valid result from Germany (matching PWA behavior)
                    if let lat = Double(selectedResult.lat), let lon = Double(selectedResult.lon) {
                        let locationObj = CLLocation(latitude: lat, longitude: lon)
                        let displayName = selectedResult.displayName ?? "\(location)"
                        print("📍 Found '\(location)': \(displayName)")
                        print("📍 Coordinates: \(lat), \(lon)")
                        effectiveLocation = locationObj  // Override GPS with searched location
                        calculateRouting(userLocation: locationObj)
                    } else {
                        print("❌ Invalid coordinates in Nominatim response")
                    }

                } catch {
                    print("❌ Failed to parse Nominatim response: \(error)")
                }
            }
        }.resume()
    }

    private func lookupGermanCity(_ city: String) -> CLLocation? {
        let cities: [String: (Double, Double)] = [
            // Baden-Württemberg
            "stuttgart": (48.7758, 9.1829),
            "heidelberg": (49.3988, 8.6724),
            "karlsruhe": (49.0069, 8.4037),
            "freiburg": (47.9990, 7.8421),
            "ulm": (48.3974, 9.9925),
            "mannheim": (49.4875, 8.4660),
            "tübingen": (48.5216, 9.0576),
            "ludwigsburg": (48.8974, 9.1917),
            "remseck": (48.8833, 9.2833),  // Remseck am Neckar
            "zwiefalten": (48.2333, 9.4667),  // Zwiefalten
            "reutlingen": (48.4914, 9.2064),
            "esslingen": (48.7394, 9.3072),
            "waiblingen": (48.8295, 9.3178),
            // Bayern
            "münchen": (48.1351, 11.5820),
            "munich": (48.1351, 11.5820),
            "nürnberg": (49.4521, 11.0767),
            "nuremberg": (49.4521, 11.0767),
            "augsburg": (48.3705, 10.8978),
            "regensburg": (49.0134, 12.1016),
            "ingolstadt": (48.7665, 11.4257),
            // Nordrhein-Westfalen
            "düsseldorf": (51.2277, 6.7735),
            "köln": (50.9375, 6.9603),
            "cologne": (50.9375, 6.9603),
            "bonn": (50.7374, 7.0982),
            "dortmund": (51.5136, 7.4653),
            "essen": (51.4556, 7.0116),
            "duisburg": (51.4344, 6.7623)
        ]

        if let (lat, lon) = cities[city] {
            return CLLocation(latitude: lat, longitude: lon)
        }
        return nil
    }
}

extension String {
    func trim() -> String {
        return self.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

// MARK: - Routing Logic

struct HospitalRouting {
    let destination: StrokeCenter
    let category: RoutingCategory
    let urgency: UrgencyLevel
    let reasoning: String
    let preAlert: String
    let threshold: String

    enum RoutingCategory {
        case neurosurgical
        case comprehensive
        case thrombolysisCapable
        case strokeUnit

        var displayName: String {
            switch self {
            case .neurosurgical: return "NEUROSURGICAL CENTER"
            case .comprehensive: return "COMPREHENSIVE CENTER"
            case .thrombolysisCapable: return "THROMBOLYSIS CAPABLE"
            case .strokeUnit: return "STROKE UNIT"
            }
        }
    }

    enum UrgencyLevel {
        case immediate
        case urgent
        case timeCritical
        case standard

        var displayName: String {
            switch self {
            case .immediate: return "IMMEDIATE"
            case .urgent: return "URGENT"
            case .timeCritical: return "TIME CRITICAL"
            case .standard: return "STANDARD"
            }
        }

        var color: Color {
            switch self {
            case .immediate: return .red
            case .urgent: return .orange
            case .timeCritical: return .yellow
            case .standard: return .blue
            }
        }

        var icon: String {
            switch self {
            case .immediate: return "exclamationmark.triangle.fill"
            case .urgent: return "exclamationmark.circle.fill"
            case .timeCritical: return "clock.fill"
            case .standard: return "checkmark.circle.fill"
            }
        }
    }
}

struct HospitalRoutingAlgorithm {
    static func routePatient(
        ichProbability: Double,
        userLocation: CLLocation,
        allCenters: [StrokeCenter]
    ) -> HospitalRouting {

        // Filter centers by capability
        let neurosurgicalCenters = allCenters.filter { center in
            center.capabilities.contains { $0.contains("Neurosurgery") }
        }

        let comprehensiveCenters = allCenters.filter { center in
            center.type == .comprehensive
        }

        let thrombolysisCenters = allCenters.filter { center in
            center.capabilities.contains { $0.contains("Thrombolysis") }
        }

        print("🏥 All centers: \(allCenters.count)")
        print("🏥 Neurosurgical centers: \(neurosurgicalCenters.count)")
        print("🏥 Comprehensive centers: \(comprehensiveCenters.count)")
        print("🏥 Thrombolysis centers: \(thrombolysisCenters.count)")
        print("🏥 ICH probability: \(Int(ichProbability * 100))%")

        // Decision tree based on ICH probability
        if ichProbability >= 0.50 {
            // HIGH ICH RISK - Direct to neurosurgery
            let destination = findNearest(from: userLocation, in: neurosurgicalCenters) ?? findNearest(from: userLocation, in: comprehensiveCenters)!

            return HospitalRouting(
                destination: destination,
                category: .neurosurgical,
                urgency: .immediate,
                reasoning: "High bleeding probability (≥50%) - neurosurgical evaluation required",
                preAlert: "Activate neurosurgery team",
                threshold: "≥50%"
            )
        }

        if ichProbability >= 0.30 {
            // INTERMEDIATE ICH RISK - Comprehensive center preferred
            let comprehensiveOptions = neurosurgicalCenters + comprehensiveCenters
            let destination = findNearest(from: userLocation, in: comprehensiveOptions)!

            return HospitalRouting(
                destination: destination,
                category: .comprehensive,
                urgency: .urgent,
                reasoning: "Intermediate bleeding risk (30-50%) - CT and possible intervention",
                preAlert: "Prepare for possible neurosurgical consultation",
                threshold: "30-50%"
            )
        }

        // LOW ICH RISK - Any thrombolysis center
        let destination = findNearest(from: userLocation, in: thrombolysisCenters) ?? allCenters[0]

        return HospitalRouting(
            destination: destination,
            category: .thrombolysisCapable,
            urgency: .timeCritical,
            reasoning: "Low bleeding risk (<30%) - nearest thrombolysis capable center",
            preAlert: "Prepare for thrombolysis protocol",
            threshold: "<30%"
        )
    }

    private static func findNearest(from location: CLLocation, in centers: [StrokeCenter]) -> StrokeCenter? {
        centers.min { center1, center2 in
            center1.distance(from: location) < center2.distance(from: location)
        }
    }
}

// MARK: - Supporting Views

struct RoutingExplanationCard: View {
    let routing: HospitalRouting
    let ichPercent: Double

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: routing.urgency.icon)
                    .foregroundColor(routing.urgency.color)
                Text(routing.category.displayName)
                    .font(.headline)
                    .fontWeight(.bold)
                Spacer()
                Text(routing.urgency.displayName)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(routing.urgency.color.opacity(0.2))
                    .foregroundColor(routing.urgency.color)
                    .cornerRadius(4)
            }

            Divider()

            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("ICH Risk:")
                        .fontWeight(.semibold)
                    Text("\(Int(ichPercent))% (\(routing.threshold))")
                }
                .font(.subheadline)

                HStack(alignment: .top) {
                    Text("Routing Logic:")
                        .fontWeight(.semibold)
                    Text(routing.reasoning)
                }
                .font(.subheadline)

                HStack(alignment: .top) {
                    Text("Pre-Alert:")
                        .fontWeight(.semibold)
                    Text(routing.preAlert)
                }
                .font(.subheadline)
            }
        }
        .padding()
        .background(routing.urgency.color.opacity(0.1))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(routing.urgency.color.opacity(0.3), lineWidth: 2)
        )
    }
}

struct StrokeCenterCard: View {
    let center: StrokeCenter
    let isPrimary: Bool
    let userLocation: CLLocation?

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(center.name)
                        .font(.headline)
                        .fontWeight(.bold)

                    Text(center.type.rawValue + " Stroke Center")
                        .font(.caption)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(isPrimary ? Color.green.opacity(0.2) : Color.gray.opacity(0.2))
                        .foregroundColor(isPrimary ? .green : .gray)
                        .cornerRadius(4)
                }

                Spacer()

                if let location = userLocation {
                    VStack(alignment: .trailing, spacing: 2) {
                        Text(center.formattedDistance(from: location))
                            .font(.title3)
                            .fontWeight(.bold)
                            .foregroundColor(.blue)

                        Text(center.estimatedTravelTime(from: location))
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
            }

            // Address
            HStack {
                Image(systemName: "mappin.circle.fill")
                    .foregroundColor(.red)
                Text("\(center.address), \(center.city)")
                    .font(.subheadline)
            }

            // Phone
            if let phone = center.phoneNumber {
                HStack {
                    Image(systemName: "phone.fill")
                        .foregroundColor(.green)
                    Text(phone)
                        .font(.subheadline)
                }
            }

            // Capabilities
            if !center.capabilities.isEmpty {
                FlowLayout(spacing: 6) {
                    ForEach(center.capabilities, id: \.self) { capability in
                        Text(capability)
                            .font(.caption2)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.blue.opacity(0.1))
                            .foregroundColor(.blue)
                            .cornerRadius(4)
                    }
                }
            }

            // Action Buttons
            HStack(spacing: 12) {
                if let phone = center.phoneNumber {
                    Button(action: { callHospital(phone) }) {
                        Label("Call", systemImage: "phone.fill")
                            .font(.subheadline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 10)
                            .background(Color.green)
                            .cornerRadius(8)
                    }
                }

                Button(action: { openDirections() }) {
                    Label("Directions", systemImage: "map.fill")
                        .font(.subheadline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(Color.blue)
                        .cornerRadius(8)
                }
            }
        }
        .padding()
        .background(isPrimary ? Color.green.opacity(0.05) : Color.gray.opacity(0.05))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(isPrimary ? Color.green.opacity(0.3) : Color.gray.opacity(0.2), lineWidth: isPrimary ? 2 : 1)
        )
    }

    private func callHospital(_ phone: String) {
        if let url = URL(string: "tel:\(phone.replacingOccurrences(of: " ", with: ""))") {
            UIApplication.shared.open(url)
        }
    }

    private func openDirections() {
        let urlString = "http://maps.apple.com/?daddr=\(center.latitude),\(center.longitude)"
        if let url = URL(string: urlString) {
            UIApplication.shared.open(url)
        }
    }
}

// MARK: - Nominatim API Models

/// Nominatim (OpenStreetMap) geocoding response structure
private struct NominatimResult: Codable {
    let lat: String
    let lon: String
    let displayName: String?
    let address: NominatimAddress?

    enum CodingKeys: String, CodingKey {
        case lat
        case lon
        case displayName = "display_name"
        case address
    }
}

/// Address details from Nominatim response
private struct NominatimAddress: Codable {
    let state: String?
    let country: String?
}

#Preview {
    NavigationStack {
        IntelligentRoutingView(ichProbability: 0.65)
    }
}
