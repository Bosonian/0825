//
//  FASTEDCalculatorView.swift
//  iGFAP Stroke Triage Assistant
//
//  Complete FAST-ED score calculator
//

import SwiftUI

// MARK: - FAST-ED Result

struct FASTEDResult {
    let score: Int
    let hasArmWeakness: Bool
    let hasEyeDeviation: Bool
}

struct FASTEDCalculatorView: View {
    @Environment(\.dismiss) var dismiss
    @Binding var score: String
    var onComplete: ((FASTEDResult) -> Void)? = nil

    // FAST-ED Components
    @State private var facialPalsy: FacialPalsyScore = .normal
    @State private var armWeakness: ArmWeaknessScore = .normal
    @State private var speechChanges: SpeechScore = .normal
    @State private var eyeDeviation: EyeDeviationScore = .normal
    @State private var denialNeglect: DenialNeglectScore = .normal

    var totalScore: Int {
        facialPalsy.rawValue +
        armWeakness.rawValue +
        speechChanges.rawValue +
        eyeDeviation.rawValue +
        denialNeglect.rawValue
    }

    var riskLevel: String {
        totalScore >= 4 ? "High LVO Risk" : "Low LVO Risk"
    }

    var riskColor: Color {
        totalScore >= 4 ? .red : .green
    }

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 12) {
                        Image(systemName: "brain.head.profile")
                            .font(.system(size: 50))
                            .foregroundColor(.blue)

                        Text("FAST-ED Score")
                            .font(.title)
                            .fontWeight(.bold)

                        Text("Field Assessment Stroke Triage for Emergency Destination")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.top)

                    // Score Display
                    VStack(spacing: 8) {
                        Text("\(totalScore)")
                            .font(.system(size: 72, weight: .bold, design: .rounded))
                            .foregroundColor(riskColor)

                        Text(riskLevel)
                            .font(.title3)
                            .fontWeight(.semibold)
                            .foregroundColor(riskColor)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                            .background(
                                Capsule()
                                    .fill(riskColor.opacity(0.2))
                            )

                        Text("Total Score: 0-9")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 16)
                            .fill(Color.gray.opacity(0.1))
                    )

                    // Assessment Components
                    VStack(spacing: 20) {
                        // 1. Facial Palsy
                        FASTEDComponent(
                            number: "1",
                            title: "Facial Palsy",
                            icon: "face.smiling"
                        ) {
                            Picker("Facial Palsy", selection: $facialPalsy) {
                                Text("Normal (0)").tag(FacialPalsyScore.normal)
                                Text("Mild (1)").tag(FacialPalsyScore.mild)
                            }
                            .pickerStyle(.segmented)
                        }

                        // 2. Arm Weakness
                        FASTEDComponent(
                            number: "2",
                            title: "Arm Weakness",
                            icon: "hand.raised"
                        ) {
                            Picker("Arm Weakness", selection: $armWeakness) {
                                Text("Normal (0)").tag(ArmWeaknessScore.normal)
                                Text("Mild (1)").tag(ArmWeaknessScore.mild)
                                Text("Severe (2)").tag(ArmWeaknessScore.severe)
                            }
                            .pickerStyle(.segmented)

                            Text("Mild: Drift. Severe: Falls rapidly")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }

                        // 3. Speech Changes
                        FASTEDComponent(
                            number: "3",
                            title: "Speech Changes",
                            icon: "bubble.left"
                        ) {
                            Picker("Speech", selection: $speechChanges) {
                                Text("Normal (0)").tag(SpeechScore.normal)
                                Text("Mild (1)").tag(SpeechScore.mild)
                                Text("Severe (2)").tag(SpeechScore.severe)
                            }
                            .pickerStyle(.segmented)

                            Text("Mild: Slurred. Severe: Aphasia/mute")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }

                        // 4. Eye Deviation
                        FASTEDComponent(
                            number: "4",
                            title: "Eye Deviation",
                            icon: "eye"
                        ) {
                            Picker("Eye Deviation", selection: $eyeDeviation) {
                                Text("Normal (0)").tag(EyeDeviationScore.normal)
                                Text("Partial (1)").tag(EyeDeviationScore.partial)
                                Text("Forced (2)").tag(EyeDeviationScore.forced)
                            }
                            .pickerStyle(.segmented)

                            Text("Gaze preference to one side")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }

                        // 5. Denial/Neglect
                        FASTEDComponent(
                            number: "5",
                            title: "Denial/Neglect",
                            icon: "questionmark.circle"
                        ) {
                            Picker("Denial/Neglect", selection: $denialNeglect) {
                                Text("Normal (0)").tag(DenialNeglectScore.normal)
                                Text("Partial (1)").tag(DenialNeglectScore.partial)
                                Text("Complete (2)").tag(DenialNeglectScore.complete)
                            }
                            .pickerStyle(.segmented)

                            Text("Does not recognize deficit")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }

                    // Info Box
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Image(systemName: "info.circle.fill")
                            Text("Interpretation")
                                .fontWeight(.semibold)
                        }
                        .foregroundColor(.blue)

                        Text("FAST-ED ≥ 4: Highly suggestive of large vessel occlusion (LVO)")
                            .font(.subheadline)

                        Text("FAST-ED < 4: Lower probability of LVO")
                            .font(.subheadline)
                    }
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.blue.opacity(0.1))
                    )

                    // Use Score Button
                    Button(action: applyScore) {
                        HStack {
                            Image(systemName: "checkmark.circle.fill")
                            Text("Use Score: \(totalScore)")
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

                    Spacer(minLength: 20)
                }
                .padding()
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }

    private func applyScore() {
        score = "\(totalScore)"

        // Create result with symptom states
        let result = FASTEDResult(
            score: totalScore,
            hasArmWeakness: armWeakness != .normal,
            hasEyeDeviation: eyeDeviation != .normal
        )

        // Call completion handler if provided
        onComplete?(result)

        dismiss()
    }
}

// MARK: - Component View

struct FASTEDComponent<Content: View>: View {
    let number: String
    let title: String
    let icon: String
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                ZStack {
                    Circle()
                        .fill(Color.blue)
                        .frame(width: 32, height: 32)

                    Text(number)
                        .font(.headline)
                        .foregroundColor(.white)
                }

                Label(title, systemImage: icon)
                    .font(.headline)
                    .foregroundColor(.primary)

                Spacer()
            }

            content
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.gray.opacity(0.05))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.gray.opacity(0.2), lineWidth: 1)
        )
    }
}

// MARK: - Score Enums

enum FacialPalsyScore: Int, CaseIterable {
    case normal = 0
    case mild = 1
}

enum ArmWeaknessScore: Int, CaseIterable {
    case normal = 0
    case mild = 1
    case severe = 2
}

enum SpeechScore: Int, CaseIterable {
    case normal = 0
    case mild = 1
    case severe = 2
}

enum EyeDeviationScore: Int, CaseIterable {
    case normal = 0
    case partial = 1
    case forced = 2
}

enum DenialNeglectScore: Int, CaseIterable {
    case normal = 0
    case partial = 1
    case complete = 2
}

// MARK: - Preview

#Preview {
    FASTEDCalculatorView(score: .constant("0"))
}
