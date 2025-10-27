//
//  ClinicalRecommendationsView.swift
//  iGFAP Stroke Triage Assistant
//
//  Clinical recommendations based on risk assessment
//

import SwiftUI

struct ClinicalRecommendationsView: View {
    let results: AssessmentResults
    let startTime: Date

    var recommendations: [Recommendation] {
        generateRecommendations(from: results)
    }

    var elapsedTime: String {
        let elapsed = Date().timeIntervalSince(startTime)
        let minutes = Int(elapsed) / 60
        let seconds = Int(elapsed) % 60
        return minutes > 0 ? "\(minutes)m \(seconds)s" : "\(seconds)s"
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Header
            HStack {
                Image(systemName: "doc.text.fill")
                    .foregroundColor(.blue)
                Text("Clinical Recommendations")
                    .font(.title2)
                    .fontWeight(.bold)
            }

            // Recommendations List
            VStack(alignment: .leading, spacing: 12) {
                ForEach(recommendations) { recommendation in
                    RecommendationRowView(recommendation: recommendation)
                }
            }

            // Elapsed Time
            HStack {
                Image(systemName: "clock.fill")
                    .foregroundColor(.secondary)
                    .font(.caption)

                Text("Time since assessment started:")
                    .font(.caption)
                    .foregroundColor(.secondary)

                Text(elapsedTime)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.primary)
            }
            .padding(.top, 8)
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.blue.opacity(0.05))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.blue.opacity(0.2), lineWidth: 1)
        )
    }

    private func generateRecommendations(from results: AssessmentResults) -> [Recommendation] {
        var recommendations: [Recommendation] = []

        // ICH-based recommendations
        let ichPercent = results.ich.percentageRisk

        if ichPercent > 80 {
            recommendations.append(Recommendation(
                icon: "exclamationmark.triangle.fill",
                text: "IMMEDIATE: Urgent CT imaging required",
                priority: .critical
            ))
            recommendations.append(Recommendation(
                icon: "heart.text.square.fill",
                text: "Consider immediate BP management if SBP > 150 mmHg",
                priority: .critical
            ))
            recommendations.append(Recommendation(
                icon: "cross.case.fill",
                text: "Prepare for potential neurosurgical consultation",
                priority: .critical
            ))
        } else if ichPercent > 60 {
            recommendations.append(Recommendation(
                icon: "exclamationmark.circle.fill",
                text: "HIGH PRIORITY: Expedite CT imaging",
                priority: .high
            ))
            recommendations.append(Recommendation(
                icon: "waveform.path.ecg",
                text: "Monitor blood pressure closely",
                priority: .high
            ))
            recommendations.append(Recommendation(
                icon: "pills.fill",
                text: "Consider withholding anticoagulation",
                priority: .high
            ))
        } else if ichPercent > 30 {
            recommendations.append(Recommendation(
                icon: "checklist",
                text: "Standard stroke protocol with close monitoring",
                priority: .moderate
            ))
            recommendations.append(Recommendation(
                icon: "camera.fill",
                text: "Obtain CT imaging as per protocol",
                priority: .moderate
            ))
        } else {
            recommendations.append(Recommendation(
                icon: "checkmark.circle.fill",
                text: "Low ICH risk - proceed with standard evaluation",
                priority: .low
            ))
        }

        // LVO-based recommendations
        if let lvo = results.lvo {
            let lvoPercent = lvo.percentageRisk

            if lvoPercent > 70 {
                recommendations.append(Recommendation(
                    icon: "airplane",
                    text: "Consider direct transport to comprehensive stroke center",
                    priority: .critical
                ))
                recommendations.append(Recommendation(
                    icon: "person.2.fill",
                    text: "Alert interventional team for potential thrombectomy",
                    priority: .critical
                ))
            } else if lvoPercent > 50 {
                recommendations.append(Recommendation(
                    icon: "building.2.fill",
                    text: "Transport to stroke-capable facility",
                    priority: .high
                ))
                recommendations.append(Recommendation(
                    icon: "map.fill",
                    text: "Consider CTA for LVO confirmation",
                    priority: .high
                ))
            } else if lvoPercent > 30 {
                recommendations.append(Recommendation(
                    icon: "chart.bar.fill",
                    text: "Moderate LVO risk - standard stroke evaluation",
                    priority: .moderate
                ))
            }
        }

        // Time-based general recommendations
        recommendations.append(Recommendation(
            icon: "clock.arrow.circlepath",
            text: "Document symptom onset time accurately",
            priority: .moderate
        ))
        recommendations.append(Recommendation(
            icon: "phone.arrow.up.right.fill",
            text: "Notify receiving facility early for resource preparation",
            priority: .moderate
        ))

        return recommendations
    }
}

// MARK: - Supporting Types

struct Recommendation: Identifiable {
    let id = UUID()
    let icon: String
    let text: String
    let priority: Priority

    enum Priority {
        case critical
        case high
        case moderate
        case low

        var color: Color {
            switch self {
            case .critical: return .red
            case .high: return .orange
            case .moderate: return .blue
            case .low: return .green
            }
        }

        var backgroundColor: Color {
            color.opacity(0.1)
        }
    }
}

struct RecommendationRowView: View {
    let recommendation: Recommendation

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            // Icon
            Image(systemName: recommendation.icon)
                .font(.body)
                .foregroundColor(recommendation.priority.color)
                .frame(width: 24)

            // Text
            Text(recommendation.text)
                .font(.subheadline)
                .foregroundColor(.primary)
                .fixedSize(horizontal: false, vertical: true)

            Spacer()
        }
        .padding(.vertical, 8)
        .padding(.horizontal, 12)
        .background(recommendation.priority.backgroundColor)
        .cornerRadius(8)
    }
}

#Preview {
    ClinicalRecommendationsView(
        results: AssessmentResults(
            ich: ICHPrediction(
                probability: 0.75,
                drivers: [],
                confidence: 0.95,
                volume: nil
            ),
            lvo: LVOPrediction(
                probability: 0.55,
                drivers: [],
                confidence: 0.93
            ),
            module: .full
        ),
        startTime: Date().addingTimeInterval(-120)
    )
    .padding()
}
