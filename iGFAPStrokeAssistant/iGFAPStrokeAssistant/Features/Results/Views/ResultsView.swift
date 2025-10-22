//
//  ResultsView.swift
//  iGFAP Stroke Triage Assistant
//
//  Display assessment results with visualizations
//

import SwiftUI

struct ResultsView: View {
    @EnvironmentObject var appState: AppState

    var assessment: Assessment? {
        appState.currentAssessment
    }

    var results: AssessmentResults? {
        assessment?.results
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 32) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: results?.hasCriticalRisk == true ? "exclamationmark.triangle.fill" : "checkmark.circle.fill")
                        .font(.system(size: 60))
                        .foregroundColor(results?.hasCriticalRisk == true ? .red : .green)

                    Text("Assessment Results")
                        .font(.largeTitle)
                        .fontWeight(.bold)

                    if let module = results?.module {
                        Text(module.displayName)
                            .font(.headline)
                            .foregroundColor(.secondary)
                    }

                    if let timestamp = assessment?.formattedTimestamp {
                        Text(timestamp)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
                .padding(.top, 20)

                // Critical Alert
                if let results = results, results.hasCriticalRisk {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Image(systemName: "exclamationmark.triangle.fill")
                            Text("Critical Risk Detected")
                                .fontWeight(.semibold)
                        }
                        .foregroundColor(.red)

                        Text("Immediate medical intervention recommended. Consider imaging and specialist consultation.")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.red.opacity(0.1))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.red.opacity(0.3), lineWidth: 2)
                    )
                }

                // Risk Rings
                if let results = results {
                    HStack(spacing: 32) {
                        // ICH Risk
                        RiskRingView(
                            percentage: results.ich.percentageRisk,
                            riskType: .ich,
                            riskLevel: results.ich.riskLevel
                        )

                        // LVO Risk (if available)
                        if let lvo = results.lvo {
                            RiskRingView(
                                percentage: lvo.percentageRisk,
                                riskType: .lvo,
                                riskLevel: lvo.riskLevel
                            )
                        }
                    }
                    .padding()
                }

                // ICH Volume (if available and significant)
                if let volume = results?.ich.volume,
                   results?.ich.percentageRisk ?? 0 >= 50 {
                    VStack(alignment: .leading, spacing: 16) {
                        Text("ICH Volume Estimation")
                            .font(.title2)
                            .fontWeight(.bold)

                        // Brain Visualization
                        BrainVisualizationView(volume: volume)
                            .frame(height: 220)

                        VolumeCardView(volume: volume)
                    }
                }

                // Risk Drivers
                if let results = results {
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Risk Factors")
                            .font(.title2)
                            .fontWeight(.bold)

                        // ICH Drivers
                        DriverSectionView(
                            title: "ICH Risk Factors",
                            drivers: results.ich.drivers,
                            icon: "🩸"
                        )

                        // LVO Drivers
                        if let lvo = results.lvo {
                            DriverSectionView(
                                title: "LVO Risk Factors",
                                drivers: lvo.drivers,
                                icon: "🧠"
                            )
                        }
                    }
                }

                // Stroke Center Map
                if let _ = assessment {
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Nearby Stroke Centers")
                            .font(.title2)
                            .fontWeight(.bold)

                        NavigationLink(destination: StrokeCenterMapView()) {
                            HStack {
                                Image(systemName: "map.fill")
                                Text("Find Stroke Centers")
                                Spacer()
                                Image(systemName: "chevron.right")
                            }
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding()
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(Color.green)
                            )
                        }
                    }
                }

                // Actions
                VStack(spacing: 12) {
                    // PDF Export
                    if let _ = assessment {
                        Button(action: { exportPDF() }) {
                            HStack {
                                Image(systemName: "doc.text.fill")
                                Text("Export PDF Report")
                            }
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(Color.orange)
                            )
                        }
                    }

                    Button(action: startNewAssessment) {
                        HStack {
                            Image(systemName: "arrow.counterclockwise")
                            Text("New Assessment")
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

                    HStack {
                        Button(action: { appState.goBack() }) {
                            HStack {
                                Image(systemName: "chevron.left")
                                Text("Back")
                            }
                        }

                        Spacer()

                        Button(action: { appState.reset() }) {
                            HStack {
                                Image(systemName: "house")
                                Text("Home")
                            }
                        }
                    }
                    .font(.subheadline)
                    .foregroundColor(.blue)
                }

                // Disclaimer
                VStack(spacing: 8) {
                    Text("⚠️ Important Notice")
                        .font(.headline)

                    Text("This assessment is for research purposes only. Clinical decisions should be made by qualified medical professionals based on comprehensive evaluation.")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(12)
            }
            .padding()
        }
    }

    private func startNewAssessment() {
        appState.reset()
    }

    private func exportPDF() {
        guard let assessment = assessment else { return }

        if let pdfURL = PDFExportService.generatePDF(for: assessment) {
            // Share PDF
            let activityVC = UIActivityViewController(
                activityItems: [pdfURL],
                applicationActivities: nil
            )

            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
               let rootVC = windowScene.windows.first?.rootViewController {
                rootVC.present(activityVC, animated: true)
            }
        }
    }
}

struct VolumeCardView: View {
    let volume: ICHVolume

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "brain")
                    .foregroundColor(.blue)
                Text("Estimated ICH Volume")
                    .font(.headline)
            }

            HStack(alignment: .firstTextBaseline) {
                Text(volume.formattedVolume)
                    .font(.system(size: 32, weight: .bold, design: .rounded))
                    .foregroundColor(.primary)

                Spacer()

                VStack(alignment: .trailing, spacing: 4) {
                    Text(volume.severity.displayName)
                        .font(.subheadline)
                        .fontWeight(.semibold)

                    Text("Mortality: \(volume.mortalityRange)")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }

            Text("Based on GFAP biomarker correlation (Broderick et al., 1993)")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.blue.opacity(0.1))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.blue.opacity(0.3), lineWidth: 1)
        )
    }
}

struct DriverSectionView: View {
    let title: String
    let drivers: [RiskDriver]
    let icon: String

    var positiveDrivers: [RiskDriver] {
        drivers.filter { $0.isPositive }.prefix(3).map { $0 }
    }

    var negativeDrivers: [RiskDriver] {
        drivers.filter { !$0.isPositive }.prefix(3).map { $0 }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(icon)
                Text(title)
                    .font(.headline)
            }

            if !positiveDrivers.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Increasing Risk ⬆")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.red)

                    ForEach(positiveDrivers) { driver in
                        DriverBarView(driver: driver)
                    }
                }
            }

            if !negativeDrivers.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Decreasing Risk ⬇")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.blue)

                    ForEach(negativeDrivers) { driver in
                        DriverBarView(driver: driver)
                    }
                }
            }
        }
        .padding()
        .background(Color.gray.opacity(0.05))
        .cornerRadius(12)
    }
}

struct DriverBarView: View {
    let driver: RiskDriver

    var barWidth: CGFloat {
        CGFloat(min(driver.absoluteWeight * 200, 100))
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(driver.displayName)
                    .font(.caption)

                Spacer()

                Text(String(format: "%.1f%%", driver.percentageContribution))
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.gray.opacity(0.2))
                        .frame(height: 6)

                    RoundedRectangle(cornerRadius: 4)
                        .fill(driver.isPositive ? Color.red : Color.blue)
                        .frame(width: barWidth, height: 6)
                }
            }
            .frame(height: 6)
        }
    }
}

#Preview {
    ResultsView()
        .environmentObject(AppState())
}
