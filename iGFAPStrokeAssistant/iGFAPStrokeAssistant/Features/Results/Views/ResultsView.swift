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
        VStack(spacing: 0) {
            AppNavigationBar(showBackButton: true, showHomeButton: true)

            ScrollView {
                VStack(spacing: 32) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: results?.hasCriticalRisk == true ? "exclamationmark.triangle.fill" : "checkmark.circle.fill")
                        .font(.system(size: 60))
                        .foregroundColor(results?.hasCriticalRisk == true ? .red : .green)

                    Text("assessmentResults".localized)
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .minimumScaleFactor(0.7)

                    if let module = results?.module {
                        Text(module.displayName)
                            .font(.headline)
                            .foregroundColor(.secondary)
                            .minimumScaleFactor(0.8)
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
                            Text("criticalRiskDetected".localized)
                                .fontWeight(.semibold)
                                .minimumScaleFactor(0.8)
                        }
                        .foregroundColor(.red)

                        Text("immediateIntervention".localized)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .fixedSize(horizontal: false, vertical: true)
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
                        Text("ichVolumeEstimation".localized)
                            .font(.title2)
                            .fontWeight(.bold)
                            .minimumScaleFactor(0.7)

                        // Brain Visualization - centered
                        HStack {
                            Spacer()
                            BrainVisualizationView(volume: volume)
                                .frame(width: 140, height: 140)
                                .aspectRatio(1, contentMode: .fit)
                            Spacer()
                        }
                        .padding()  // Match risk ring padding

                        VolumeCardView(volume: volume)
                    }

                    // Risk Factors - shown within volume section for coma module
                    if results?.module == .coma {
                        VStack(alignment: .leading, spacing: 16) {
                            Text("riskFactors".localized)
                                .font(.title2)
                                .fontWeight(.bold)
                                .minimumScaleFactor(0.7)
                                .padding(.top, 16)

                            // ICH Drivers
                            DriverSectionView(
                                title: "ichRiskFactors".localized,
                                drivers: results!.ich.drivers,
                                icon: "🩸"
                            )
                        }
                    }
                }

                // Tachometer Gauge (Decision Support)
                if let results = results, let lvo = results.lvo {
                    TachometerGaugeView(
                        ichProbability: results.ich.probability,
                        lvoProbability: lvo.probability
                    )
                }

                // Differential Diagnoses
                if let results = results {
                    DifferentialDiagnosesView(
                        ichProbability: results.ich.probability,
                        module: results.module
                    )
                }

                // Risk Drivers (for non-coma modules)
                if let results = results, results.module != .coma {
                    VStack(alignment: .leading, spacing: 16) {
                        Text("riskFactors".localized)
                            .font(.title2)
                            .fontWeight(.bold)
                            .minimumScaleFactor(0.7)

                        // ICH Drivers
                        DriverSectionView(
                            title: "ichRiskFactors".localized,
                            drivers: results.ich.drivers,
                            icon: "🩸"
                        )

                        // LVO Drivers
                        if let lvo = results.lvo {
                            DriverSectionView(
                                title: "lvoRiskFactors".localized,
                                drivers: lvo.drivers,
                                icon: "🧠"
                            )
                        }
                    }
                }

                // Intelligent Routing
                if let results = results {
                    VStack(alignment: .leading, spacing: 16) {
                        Text("recommendedDestination".localized)
                            .font(.title2)
                            .fontWeight(.bold)
                            .minimumScaleFactor(0.7)

                        NavigationLink(destination: IntelligentRoutingView(ichProbability: results.ich.probability)) {
                            HStack {
                                Image(systemName: "location.circle.fill")
                                Text("findNearestHospital".localized)
                                    .minimumScaleFactor(0.8)
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

                // Input Summary
                if let assessment = assessment {
                    InputSummaryView(
                        patientData: assessment.patientData,
                        module: assessment.module
                    )
                }

                // Actions
                VStack(spacing: 12) {
                    // PDF Export
                    if let _ = assessment {
                        Button(action: { exportPDF() }) {
                            HStack {
                                Image(systemName: "doc.text.fill")
                                Text("exportPDF".localized)
                                    .minimumScaleFactor(0.8)
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
                            Text("newAssessment".localized)
                                .minimumScaleFactor(0.8)
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
                                Text("back".localized)
                            }
                        }

                        Spacer()

                        Button(action: { appState.reset() }) {
                            HStack {
                                Image(systemName: "house")
                                Text("home".localized)
                            }
                        }
                    }
                    .font(.subheadline)
                    .foregroundColor(.blue)
                }

                // Disclaimer
                VStack(spacing: 8) {
                    Text("importantNotice".localized)
                        .font(.headline)
                        .minimumScaleFactor(0.8)

                    Text("disclaimerText".localized)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(12)
            }
            .padding()
        }
        }
        .edgesIgnoringSafeArea(.top)
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
                Text("estimatedICHVolume".localized)
                    .font(.headline)
                    .minimumScaleFactor(0.8)
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
                        .minimumScaleFactor(0.8)

                    Text(String(format: "mortality".localized, volume.mortalityRange))
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .minimumScaleFactor(0.8)
                }
            }

            Text("basedOnGFAP".localized)
                .font(.caption)
                .foregroundColor(.secondary)
                .fixedSize(horizontal: false, vertical: true)
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
                    Text("increasingRisk".localized)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.red)
                        .minimumScaleFactor(0.8)

                    ForEach(positiveDrivers) { driver in
                        DriverBarView(driver: driver)
                    }
                }
            }

            if !negativeDrivers.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("decreasingRisk".localized)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.blue)
                        .minimumScaleFactor(0.8)

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

// MARK: - Additional Results Components

// Input Summary View
struct InputSummaryView: View {
    let patientData: PatientData
    let module: AssessmentModule
    @State private var isExpanded: Bool = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Button(action: { withAnimation { isExpanded.toggle() } }) {
                HStack {
                    Image(systemName: "list.clipboard")
                        .foregroundColor(.blue)
                    Text("inputSummaryTitle".localized)
                        .font(.title2)
                        .fontWeight(.bold)
                        .minimumScaleFactor(0.7)

                    Spacer()

                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .foregroundColor(.blue)
                }
                .foregroundColor(.primary)
            }

            Text("inputSummarySubtitle".localized)
                .font(.subheadline)
                .foregroundColor(.secondary)
                .fixedSize(horizontal: false, vertical: true)

            if isExpanded {
                VStack(alignment: .leading, spacing: 12) {
                    if let age = patientData.ageYears {
                        SummaryRow(label: "age".localized, value: "\(age) years")
                    }
                    if let systolic = patientData.systolicBP, let diastolic = patientData.diastolicBP {
                        SummaryRow(label: "bloodPressure".localized, value: "\(systolic)/\(diastolic) mmHg")
                    }
                    if let gfap = patientData.gfapValue {
                        SummaryRow(label: "gfapValue".localized, value: String(format: "%.1f pg/mL", gfap))
                    }
                    if let gcs = patientData.gcs {
                        SummaryRow(label: "glasgowComaScale".localized, value: "\(gcs)")
                    }
                    if let fastEd = patientData.fastEdScore {
                        SummaryRow(label: "fastEdScore".localized, value: "\(fastEd)")
                    }
                    if patientData.headache {
                        SummaryRow(label: "headache".localized, value: "present".localized)
                    }
                    if patientData.vigilanceReduction {
                        SummaryRow(label: "vigilanceReduction".localized, value: "present".localized)
                    }
                    if patientData.armParesis {
                        SummaryRow(label: "armParesis".localized, value: "present".localized)
                    }
                    if patientData.legParesis {
                        SummaryRow(label: "legParesis".localized, value: "present".localized)
                    }
                    if patientData.eyeDeviation {
                        SummaryRow(label: "eyeDeviation".localized, value: "present".localized)
                    }
                    if patientData.atrialFibrillation {
                        SummaryRow(label: "atrialFibrillation".localized, value: "present".localized)
                    }
                    if patientData.anticoagulated {
                        SummaryRow(label: "anticoagulated".localized, value: "yes".localized)
                    }
                    if patientData.antiplatelets {
                        SummaryRow(label: "antiplatelets".localized, value: "yes".localized)
                    }
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)
            }
        }
        .padding()
        .background(Color.blue.opacity(0.1))
        .cornerRadius(12)
    }
}

struct SummaryRow: View {
    let label: String
    let value: String

    var body: some View {
        HStack {
            Text(label)
                .font(.subheadline)
                .foregroundColor(.secondary)
            Spacer()
            Text(value)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(.primary)
        }
    }
}

// Differential Diagnoses View
struct DifferentialDiagnosesView: View {
    let ichProbability: Double
    let module: AssessmentModule

    var percentageRisk: Int {
        Int(round(ichProbability * 100))
    }

    var shouldDisplay: Bool {
        percentageRisk > 25
    }

    var body: some View {
        if shouldDisplay {
            VStack(alignment: .leading, spacing: 16) {
                HStack {
                    Text("⚡")
                        .font(.title2)
                    Text("differentialDiagnoses".localized)
                        .font(.title2)
                        .fontWeight(.bold)
                        .minimumScaleFactor(0.7)
                }

                if module == .coma {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("alternativeDiagnoses".localized)
                            .font(.subheadline)
                            .fontWeight(.semibold)

                        Text("sabSdhEdh".localized)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                } else {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("reconfirmTimeWindow".localized)
                            .font(.headline)
                            .fontWeight(.semibold)

                        VStack(alignment: .leading, spacing: 8) {
                            HStack(alignment: .top) {
                                Text("•")
                                    .font(.subheadline)
                                Text("unclearTimeWindow".localized)
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                    .fixedSize(horizontal: false, vertical: true)
                            }

                            HStack(alignment: .top) {
                                Text("•")
                                    .font(.subheadline)
                                Text("rareDiagnoses".localized)
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                    .fixedSize(horizontal: false, vertical: true)
                            }
                        }
                    }
                }
            }
            .padding()
            .background(Color.orange.opacity(0.1))
            .cornerRadius(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.orange.opacity(0.3), lineWidth: 2)
            )
        }
    }
}

// Tachometer Gauge View
struct TachometerGaugeView: View {
    let ichProbability: Double
    let lvoProbability: Double

    var ichPercent: Int {
        Int(round(ichProbability * 100))
    }

    var lvoPercent: Int {
        Int(round(lvoProbability * 100))
    }

    var shouldDisplay: Bool {
        ichPercent >= 50 && lvoPercent >= 50
    }

    var ratio: Double {
        lvoProbability / max(ichProbability, 0.01)
    }

    var confidence: Int {
        let diff = abs(lvoPercent - ichPercent)
        let maxP = max(lvoPercent, ichPercent)
        var c: Int

        if diff < 10 {
            c = Int(round(30 + Double(maxP) * 0.3))
        } else if diff < 20 {
            c = Int(round(50 + Double(maxP) * 0.4))
        } else {
            c = Int(round(70 + Double(maxP) * 0.3))
        }

        return max(0, min(100, c))
    }

    var difference: Int {
        abs(lvoPercent - ichPercent)
    }

    var gaugeColor: Color {
        if ratio < 0.8 {
            return .red
        } else if ratio > 1.2 {
            return .blue
        } else {
            return .orange
        }
    }

    var recommendation: String {
        if ratio < 0.8 {
            return "ichDominant".localized
        } else if ratio > 1.2 {
            return "lvoDominant".localized
        } else {
            return "uncertain".localized
        }
    }

    var body: some View {
        if shouldDisplay {
            VStack(alignment: .leading, spacing: 16) {
                // Header
                VStack(spacing: 8) {
                    HStack {
                        Text("🎯")
                            .font(.title2)
                        Text("decisionSupport".localized)
                            .font(.title2)
                            .fontWeight(.bold)
                            .minimumScaleFactor(0.7)
                        Spacer()
                    }

                    HStack {
                        Text("LVO/ICH Ratio:")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Text(String(format: "%.2f", ratio))
                            .font(.subheadline)
                            .fontWeight(.semibold)
                        Spacer()
                    }
                }

                // Speedometer Gauge
                SpeedometerGauge(ratio: ratio, gaugeColor: gaugeColor)
                    .frame(height: 200)
                    .padding(.vertical, 8)

                // Legend chips
                HStack(spacing: 12) {
                    Spacer()
                    LegendChip(label: "ICH", color: .red)
                    LegendChip(label: "uncertain".localized, color: .orange)
                    LegendChip(label: "LVO", color: .blue)
                    Spacer()
                }

                // Metrics row
                HStack(spacing: 8) {
                    MetricCard(
                        label: "Ratio",
                        value: String(format: "%.2f", ratio),
                        unit: "LVO/ICH"
                    )

                    MetricCard(
                        label: "confidence".localized,
                        value: "\(confidence)%",
                        unit: ""
                    )

                    MetricCard(
                        label: "difference".localized,
                        value: "\(difference)%",
                        unit: "|LVO−ICH|"
                    )
                }

                // Probabilities
                Text("ICH: \(ichPercent)% | LVO: \(lvoPercent)%")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity, alignment: .center)
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color(UIColor.systemBackground))
                    .shadow(color: Color.black.opacity(0.05), radius: 8, x: 0, y: 2)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.gray.opacity(0.2), lineWidth: 1)
            )
        }
    }
}

// Speedometer Gauge Component
struct SpeedometerGauge: View {
    let ratio: Double
    let gaugeColor: Color

    private let startAngle: Double = 180
    private let endAngle: Double = 0

    // Map ratio to angle: 0.0 -> 180° (ICH), 1.0 -> 90° (center), 2.0+ -> 0° (LVO)
    private var needleAngle: Double {
        let clampedRatio = min(max(ratio, 0.0), 2.0)
        return 180 - (clampedRatio * 90)
    }

    var body: some View {
        GeometryReader { geometry in
            let size = min(geometry.size.width, geometry.size.height * 1.5)
            let center = CGPoint(x: geometry.size.width / 2, y: geometry.size.height * 0.65)
            let radius: CGFloat = size * 0.38

            ZStack {
                // Gradient arc (red → orange → yellow → green → cyan → blue)
                GradientArc(
                    center: center,
                    radius: radius,
                    startAngle: 180,
                    endAngle: 0,
                    lineWidth: 28
                )

                // Tick marks with value labels
                ForEach([(-0.5, "−0.5"), (0.8, "0.8"), (1.0, "1.0"), (1.5, "1.5"), (2.0, "2.0")], id: \.0) { (value, label) in
                    let clampedValue = max(0.0, min(2.0, value))
                    let angle = 180 - (clampedValue * 90)

                    // Tick mark
                    TickMark(
                        center: center,
                        radius: radius,
                        angle: angle,
                        isMajor: value == 1.0 || value == 2.0
                    )

                    // Value label
                    Text(label)
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(.gray)
                        .position(
                            x: center.x + cos(angle * .pi / 180) * (radius - 36),
                            y: center.y - sin(angle * .pi / 180) * (radius - 36)
                        )
                }

                // Center ratio display
                Text(String(format: "%.2f", ratio))
                    .font(.system(size: 48, weight: .bold, design: .rounded))
                    .foregroundColor(gaugeColor)
                    .offset(y: -radius * 0.15)

                // Confidence label
                Text("54% confidence")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .offset(y: radius * 0.15)

                // Needle with shadow
                NeedleView(
                    center: center,
                    radius: radius * 0.85,
                    angle: needleAngle,
                    color: gaugeColor
                )
                .shadow(color: Color.black.opacity(0.3), radius: 3, x: 1, y: 1)
            }
            .frame(width: geometry.size.width, height: geometry.size.height, alignment: .center)
        }
    }
}

// Gradient Arc for smooth color transition
struct GradientArc: View {
    let center: CGPoint
    let radius: CGFloat
    let startAngle: Double
    let endAngle: Double
    let lineWidth: CGFloat

    var body: some View {
        // Create gradient from ICH (red) to LVO (blue)
        let gradient = LinearGradient(
            gradient: Gradient(colors: [
                Color.red,
                Color.orange,
                Color.yellow,
                Color.green,
                Color.cyan,
                Color.blue
            ]),
            startPoint: .leading,
            endPoint: .trailing
        )

        // Draw the arc with gradient
        Path { path in
            path.addArc(
                center: center,
                radius: radius,
                startAngle: .degrees(startAngle),
                endAngle: .degrees(endAngle),
                clockwise: false
            )
        }
        .stroke(gradient, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
        .opacity(0.8)
    }
}

// Arc Segment for gauge background
struct ArcSegment: View {
    let center: CGPoint
    let radius: CGFloat
    let startAngle: Double
    let endAngle: Double
    let color: Color
    let lineWidth: CGFloat

    var body: some View {
        Path { path in
            path.addArc(
                center: center,
                radius: radius,
                startAngle: .degrees(startAngle),
                endAngle: .degrees(endAngle),
                clockwise: false
            )
        }
        .stroke(color, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
    }
}

// Tick Mark for gauge
struct TickMark: View {
    let center: CGPoint
    let radius: CGFloat
    let angle: Double
    let isMajor: Bool

    var body: some View {
        Path { path in
            let angleRad = angle * .pi / 180
            let outerRadius = radius + 12
            let innerRadius = radius - (isMajor ? 16 : 12)

            let x1 = center.x + cos(angleRad) * innerRadius
            let y1 = center.y - sin(angleRad) * innerRadius
            let x2 = center.x + cos(angleRad) * outerRadius
            let y2 = center.y - sin(angleRad) * outerRadius

            path.move(to: CGPoint(x: x1, y: y1))
            path.addLine(to: CGPoint(x: x2, y: y2))
        }
        .stroke(Color.gray.opacity(0.6), style: StrokeStyle(lineWidth: isMajor ? 3 : 2, lineCap: .round))
    }
}

// Needle View
struct NeedleView: View {
    let center: CGPoint
    let radius: CGFloat
    let angle: Double
    let color: Color

    var body: some View {
        ZStack {
            // Needle line
            Path { path in
                let angleRad = angle * .pi / 180
                let tipX = center.x + cos(angleRad) * radius
                let tipY = center.y - sin(angleRad) * radius

                path.move(to: center)
                path.addLine(to: CGPoint(x: tipX, y: tipY))
            }
            .stroke(color, style: StrokeStyle(lineWidth: 4, lineCap: .round))

            // Center circle
            Circle()
                .fill(color)
                .frame(width: 16, height: 16)
                .position(center)

            // Outer center ring
            Circle()
                .stroke(Color(UIColor.systemBackground), lineWidth: 2)
                .frame(width: 16, height: 16)
                .position(center)
        }
    }
}

struct LegendChip: View {
    let label: String
    let color: Color

    var body: some View {
        HStack(spacing: 4) {
            Circle()
                .fill(color)
                .frame(width: 8, height: 8)
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
        .background(color.opacity(0.1))
        .cornerRadius(8)
    }
}

struct MetricCard: View {
    let label: String
    let value: String
    let unit: String

    var body: some View {
        VStack(spacing: 4) {
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
            Text(value)
                .font(.headline)
                .fontWeight(.bold)
            Text(unit)
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.white.opacity(0.5))
        .cornerRadius(8)
    }
}
