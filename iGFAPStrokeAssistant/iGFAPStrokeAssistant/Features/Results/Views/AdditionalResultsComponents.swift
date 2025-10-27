//
//  AdditionalResultsComponents.swift
//  iGFAP Stroke Triage Assistant
//
//  Additional result components: Input Summary, Differential Diagnoses, and Tachometer
//

import SwiftUI

// MARK: - Input Summary View

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
                    // Demographics
                    if let age = patientData.ageYears {
                        SummaryRow(label: "age".localized, value: "\(age) years")
                    }

                    // Vitals
                    if let systolic = patientData.systolicBP, let diastolic = patientData.diastolicBP {
                        SummaryRow(label: "bloodPressure".localized, value: "\(systolic)/\(diastolic) mmHg")
                    }

                    // Biomarkers
                    if let gfap = patientData.gfapValue {
                        SummaryRow(label: "gfapValue".localized, value: String(format: "%.1f pg/mL", gfap))
                    }

                    // Neurological Scores
                    if let gcs = patientData.gcs {
                        SummaryRow(label: "glasgowComaScale".localized, value: "\(gcs)")
                    }

                    if let fastEd = patientData.fastEdScore {
                        SummaryRow(label: "fastEdScore".localized, value: "\(fastEd)")
                    }

                    // Symptoms
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

                    // Medical History
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

// MARK: - Differential Diagnoses View

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
                    // Coma module alternative diagnoses
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
                    // Stroke modules differential diagnoses
                    VStack(alignment: .leading, spacing: 12) {
                        // Blue info box for time window reconfirmation
                        Text("reconfirmTimeWindow".localized)
                            .font(.subheadline)
                            .fontWeight(.semibold)
                            .foregroundColor(.blue)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(12)
                            .background(Color.blue.opacity(0.15))
                            .cornerRadius(8)

                        // Orange-marked bullet points
                        VStack(alignment: .leading, spacing: 8) {
                            HStack(alignment: .top, spacing: 8) {
                                Text("•")
                                    .font(.subheadline)
                                    .foregroundColor(.orange)
                                    .fontWeight(.bold)
                                Text("unclearTimeWindow".localized)
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                    .fixedSize(horizontal: false, vertical: true)
                            }

                            HStack(alignment: .top, spacing: 8) {
                                Text("•")
                                    .font(.subheadline)
                                    .foregroundColor(.orange)
                                    .fontWeight(.bold)
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

// MARK: - Tachometer Gauge View

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
            return .red // ICH dominant
        } else if ratio > 1.2 {
            return .blue // LVO dominant
        } else {
            return .orange // Uncertain
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
                HStack {
                    Text("🎯")
                        .font(.title2)
                    Text("decisionSupport".localized)
                        .font(.title2)
                        .fontWeight(.bold)
                        .minimumScaleFactor(0.7)
                }

                // Gauge Visualization
                VStack(spacing: 12) {
                    ZStack {
                        // Background arc
                        Circle()
                            .trim(from: 0, to: 0.75)
                            .stroke(Color.gray.opacity(0.2), lineWidth: 20)
                            .frame(width: 200, height: 200)
                            .rotationEffect(.degrees(135))

                        // Colored arc based on ratio
                        Circle()
                            .trim(from: 0, to: CGFloat(ratio) * 0.375)
                            .stroke(gaugeColor, lineWidth: 20)
                            .frame(width: 200, height: 200)
                            .rotationEffect(.degrees(135))

                        // Center display
                        VStack(spacing: 4) {
                            Text("Ratio")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Text(String(format: "%.2f", ratio))
                                .font(.system(size: 32, weight: .bold))
                                .foregroundColor(gaugeColor)
                            Text(recommendation)
                                .font(.caption)
                                .fontWeight(.semibold)
                                .foregroundColor(gaugeColor)
                        }
                    }

                    // Legend
                    HStack(spacing: 16) {
                        LegendChip(label: "ICH", color: .red)
                        LegendChip(label: "uncertain".localized, color: .orange)
                        LegendChip(label: "LVO", color: .blue)
                    }
                }

                // Metrics
                HStack(spacing: 12) {
                    MetricCard(
                        label: "Ratio",
                        value: String(format: "%.2f", ratio),
                        unit: "LVO/ICH"
                    )

                    MetricCard(
                        label: "confidence".localized,
                        value: "\(confidence)%",
                        unit: "percent".localized
                    )

                    MetricCard(
                        label: "difference".localized,
                        value: "\(difference)%",
                        unit: "|LVO−ICH|"
                    )
                }

                // Probability Summary
                Text("ICH: \(ichPercent)% | LVO: \(lvoPercent)%")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity, alignment: .center)
            }
            .padding()
            .background(Color.gray.opacity(0.05))
            .cornerRadius(12)
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

// MARK: - Preview

#Preview {
    ScrollView {
        VStack(spacing: 20) {
            InputSummaryView(
                patientData: PatientData(
                    ageYears: 65,
                    systolicBP: 140,
                    diastolicBP: 90,
                    gfapValue: 150.5,
                    fastEdScore: 5,
                    gcs: 12
                ),
                module: .full
            )

            DifferentialDiagnosesView(ichProbability: 0.6, module: .full)

            TachometerGaugeView(ichProbability: 0.65, lvoProbability: 0.75)
        }
        .padding()
    }
}
