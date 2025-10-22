//
//  RiskRingView.swift
//  iGFAP Stroke Triage Assistant
//
//  Custom animated risk ring visualization
//

import SwiftUI

struct RiskRingView: View {
    let percentage: Int
    let riskType: RiskType
    let riskLevel: RiskLevel

    @State private var animatedPercentage: Double = 0

    enum RiskType {
        case ich, lvo

        var icon: String {
            switch self {
            case .ich: return "🩸"
            case .lvo: return "🧠"
            }
        }

        var title: String {
            switch self {
            case .ich: return "ICH Risk"
            case .lvo: return "LVO Risk"
            }
        }
    }

    var ringColor: Color {
        switch riskLevel {
        case .low: return .blue
        case .medium: return .yellow
        case .high: return .orange
        case .critical: return .red
        }
    }

    var body: some View {
        VStack(spacing: 16) {
            // Risk Ring
            ZStack {
                // Background circle
                Circle()
                    .stroke(Color.gray.opacity(0.2), lineWidth: 16)
                    .frame(width: 140, height: 140)

                // Progress circle
                Circle()
                    .trim(from: 0, to: animatedPercentage / 100)
                    .stroke(
                        ringColor,
                        style: StrokeStyle(lineWidth: 16, lineCap: .round)
                    )
                    .frame(width: 140, height: 140)
                    .rotationEffect(.degrees(-90))
                    .animation(.spring(duration: 1.2, bounce: 0.3), value: animatedPercentage)

                // Center content
                VStack(spacing: 4) {
                    Text("\(Int(animatedPercentage))%")
                        .font(.system(size: 36, weight: .bold, design: .rounded))
                        .foregroundColor(.primary)

                    Text(riskType.icon)
                        .font(.title2)
                }
            }

            // Labels
            VStack(spacing: 4) {
                Text(riskType.title)
                    .font(.subheadline)
                    .foregroundColor(.secondary)

                Text(riskLevel.displayName)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(ringColor)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 4)
                    .background(
                        Capsule()
                            .fill(ringColor.opacity(0.2))
                    )
            }
        }
        .onAppear {
            withAnimation {
                animatedPercentage = Double(percentage)
            }
        }
    }
}

#Preview {
    HStack(spacing: 32) {
        RiskRingView(
            percentage: 35,
            riskType: .ich,
            riskLevel: .medium
        )

        RiskRingView(
            percentage: 75,
            riskType: .lvo,
            riskLevel: .critical
        )
    }
    .padding()
}
