//
//  StrokeCenterMapView.swift
//  iGFAP Stroke Triage Assistant
//
//  Stroke center map with GPS routing
//

import SwiftUI
import MapKit
import CoreLocation

struct StrokeCenterMapView: View {
    @StateObject private var locationManager = LocationManager()
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 48.8969, longitude: 9.2076),
        span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5)
    )

    @State private var strokeCenters: [StrokeCenter] = StrokeCenter.sampleGerman
    @State private var selectedCenter: StrokeCenter?
    @State private var showCenterList = false

    var sortedCenters: [StrokeCenter] {
        guard let userLocation = locationManager.location else {
            return strokeCenters
        }

        return strokeCenters.sorted { center1, center2 in
            center1.distance(from: userLocation) < center2.distance(from: userLocation)
        }
    }

    var body: some View {
        ZStack {
            // Map
            Map(coordinateRegion: $region, annotationItems: strokeCenters) { center in
                MapAnnotation(coordinate: center.coordinate) {
                    StrokeCenterMarker(
                        center: center,
                        isSelected: selectedCenter?.id == center.id
                    ) {
                        selectedCenter = center
                        showCenterList = false
                    }
                }
            }
            .ignoresSafeArea(edges: .top)

            // Controls Overlay
            VStack {
                // Top Controls
                HStack {
                    Spacer()

                    // Center on User
                    if locationManager.location != nil {
                        Button(action: centerOnUser) {
                            Image(systemName: "location.fill")
                                .foregroundColor(.white)
                                .padding(12)
                                .background(Circle().fill(Color.blue))
                                .shadow(radius: 4)
                        }
                        .padding()
                    }
                }

                Spacer()

                // Bottom Sheet
                if showCenterList {
                    StrokeCenterListView(
                        centers: sortedCenters,
                        userLocation: locationManager.location,
                        selectedCenter: $selectedCenter,
                        isExpanded: $showCenterList
                    )
                    .transition(.move(edge: .bottom))
                } else if let selected = selectedCenter {
                    StrokeCenterDetailCard(
                        center: selected,
                        userLocation: locationManager.location
                    ) {
                        selectedCenter = nil
                    }
                    .transition(.move(edge: .bottom))
                } else {
                    // Toggle Button
                    Button(action: { showCenterList.toggle() }) {
                        HStack {
                            Image(systemName: "list.bullet")
                            Text("Show \(strokeCenters.count) Stroke Centers")
                        }
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding()
                        .background(
                            Capsule()
                                .fill(Color.blue)
                        )
                        .shadow(radius: 4)
                    }
                    .padding(.bottom, 20)
                }
            }
        }
        .onAppear {
            locationManager.requestLocation()

            // Center map on user if available
            if let userLocation = locationManager.location {
                region.center = userLocation.coordinate
            }
        }
    }

    private func centerOnUser() {
        guard let userLocation = locationManager.location else { return }

        withAnimation {
            region.center = userLocation.coordinate
            region.span = MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2)
        }
    }
}

// MARK: - Stroke Center Marker

struct StrokeCenterMarker: View {
    let center: StrokeCenter
    let isSelected: Bool
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            VStack(spacing: 4) {
                Image(systemName: center.type.icon)
                    .font(.title2)
                    .foregroundColor(.white)
                    .padding(10)
                    .background(
                        Circle()
                            .fill(center.type == .comprehensive ? Color.red : Color.blue)
                            .shadow(radius: isSelected ? 8 : 4)
                    )
                    .scaleEffect(isSelected ? 1.3 : 1.0)
                    .animation(.spring(), value: isSelected)

                if isSelected {
                    Text(center.name)
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(
                            RoundedRectangle(cornerRadius: 8)
                                .fill(Color.white)
                                .shadow(radius: 2)
                        )
                }
            }
        }
    }
}

// MARK: - Center Detail Card

struct StrokeCenterDetailCard: View {
    let center: StrokeCenter
    let userLocation: CLLocation?
    let onClose: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(center.name)
                        .font(.headline)

                    HStack {
                        Image(systemName: center.type.icon)
                        Text(center.type.displayName)
                            .font(.subheadline)
                    }
                    .foregroundColor(.secondary)
                }

                Spacer()

                Button(action: onClose) {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title2)
                        .foregroundColor(.secondary)
                }
            }

            // Distance & Time
            if let userLocation = userLocation {
                HStack(spacing: 20) {
                    Label(
                        center.formattedDistance(from: userLocation),
                        systemImage: "mappin.circle.fill"
                    )
                    .font(.subheadline)
                    .foregroundColor(.blue)

                    Label(
                        center.estimatedTravelTime(from: userLocation),
                        systemImage: "clock.fill"
                    )
                    .font(.subheadline)
                    .foregroundColor(.orange)
                }
            }

            // Address
            VStack(alignment: .leading, spacing: 4) {
                Text(center.address)
                Text("\(center.city), \(center.country)")
            }
            .font(.subheadline)
            .foregroundColor(.secondary)

            // Phone
            if let phone = center.phoneNumber {
                Button(action: { callCenter(phone: phone) }) {
                    HStack {
                        Image(systemName: "phone.fill")
                        Text(phone)
                    }
                    .font(.subheadline)
                    .foregroundColor(.blue)
                }
            }

            // Capabilities
            if !center.capabilities.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Capabilities")
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.secondary)

                    FlowLayout(spacing: 8) {
                        ForEach(center.capabilities, id: \.self) { capability in
                            Text(capability)
                                .font(.caption)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(
                                    Capsule()
                                        .fill(Color.blue.opacity(0.1))
                                )
                        }
                    }
                }
            }

            // Directions Button
            Button(action: { openDirections() }) {
                HStack {
                    Image(systemName: "arrow.triangle.turn.up.right.circle.fill")
                    Text("Get Directions")
                }
                .font(.headline)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.blue)
                )
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color(UIColor.systemBackground))
                .shadow(radius: 10)
        )
        .padding()
    }

    private func callCenter(phone: String) {
        let phoneNumber = phone.replacingOccurrences(of: " ", with: "")
        if let url = URL(string: "tel://\(phoneNumber)") {
            UIApplication.shared.open(url)
        }
    }

    private func openDirections() {
        let mapItem = MKMapItem(placemark: MKPlacemark(coordinate: center.coordinate))
        mapItem.name = center.name
        mapItem.openInMaps(launchOptions: [MKLaunchOptionsDirectionsModeKey: MKLaunchOptionsDirectionsModeDriving])
    }
}

// MARK: - Center List View

struct StrokeCenterListView: View {
    let centers: [StrokeCenter]
    let userLocation: CLLocation?
    @Binding var selectedCenter: StrokeCenter?
    @Binding var isExpanded: Bool

    var body: some View {
        VStack(spacing: 0) {
            // Handle
            RoundedRectangle(cornerRadius: 3)
                .fill(Color.secondary.opacity(0.3))
                .frame(width: 40, height: 6)
                .padding(.top, 8)

            // Header
            HStack {
                Text("Nearby Stroke Centers")
                    .font(.headline)
                    .padding()

                Spacer()

                Button(action: { isExpanded = false }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.secondary)
                        .padding()
                }
            }

            Divider()

            // List
            ScrollView {
                LazyVStack(spacing: 12) {
                    ForEach(centers) { center in
                        Button(action: {
                            selectedCenter = center
                            isExpanded = false
                        }) {
                            StrokeCenterRow(center: center, userLocation: userLocation)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding()
            }
        }
        .frame(maxHeight: UIScreen.main.bounds.height * 0.6)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color(UIColor.systemBackground))
                .shadow(radius: 10)
        )
    }
}

struct StrokeCenterRow: View {
    let center: StrokeCenter
    let userLocation: CLLocation?

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: center.type.icon)
                .font(.title2)
                .foregroundColor(center.type == .comprehensive ? .red : .blue)
                .frame(width: 40)

            VStack(alignment: .leading, spacing: 4) {
                Text(center.name)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.primary)

                Text(center.city)
                    .font(.caption)
                    .foregroundColor(.secondary)

                if let userLocation = userLocation {
                    HStack(spacing: 12) {
                        Text(center.formattedDistance(from: userLocation))
                        Text("•")
                        Text(center.estimatedTravelTime(from: userLocation))
                    }
                    .font(.caption)
                    .foregroundColor(.blue)
                }
            }

            Spacer()

            Image(systemName: "chevron.right")
                .foregroundColor(.secondary)
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.gray.opacity(0.1))
        )
    }
}

// MARK: - Location Manager

class LocationManager: NSObject, ObservableObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    @Published var location: CLLocation?
    @Published var authorizationStatus: CLAuthorizationStatus = .notDetermined

    override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
    }

    func requestLocation() {
        if authorizationStatus == .notDetermined {
            manager.requestWhenInUseAuthorization()
        }
        manager.requestLocation()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        location = locations.first
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Location error: \(error.localizedDescription)")
    }

    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        authorizationStatus = manager.authorizationStatus

        if authorizationStatus == .authorizedWhenInUse || authorizationStatus == .authorizedAlways {
            manager.requestLocation()
        }
    }
}

// MARK: - Flow Layout

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = FlowResult(in: proposal.replacingUnspecifiedDimensions().width, subviews: subviews, spacing: spacing)
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = FlowResult(in: bounds.width, subviews: subviews, spacing: spacing)
        for (index, subview) in subviews.enumerated() {
            subview.place(at: CGPoint(x: bounds.minX + result.positions[index].x, y: bounds.minY + result.positions[index].y), proposal: .unspecified)
        }
    }

    struct FlowResult {
        var size: CGSize = .zero
        var positions: [CGPoint] = []

        init(in maxWidth: CGFloat, subviews: Subviews, spacing: CGFloat) {
            var x: CGFloat = 0
            var y: CGFloat = 0
            var lineHeight: CGFloat = 0

            for subview in subviews {
                let size = subview.sizeThatFits(.unspecified)

                if x + size.width > maxWidth && x > 0 {
                    x = 0
                    y += lineHeight + spacing
                    lineHeight = 0
                }

                positions.append(CGPoint(x: x, y: y))
                lineHeight = max(lineHeight, size.height)
                x += size.width + spacing
            }

            self.size = CGSize(width: maxWidth, height: y + lineHeight)
        }
    }
}

// MARK: - Preview

#Preview {
    StrokeCenterMapView()
}
