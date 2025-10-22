//
//  ComaAssessmentView.swift
//  iGFAP Stroke Triage Assistant
//
//  Coma module assessment (GFAP only)
//

import SwiftUI

struct ComaAssessmentView: View {
    @EnvironmentObject var appState: AppState
    @State private var gfapText: String = ""
    @FocusState private var isGfapFieldFocused: Bool

    var gfapValue: Double? {
        Double(gfapText)
    }

    var isValid: Bool {
        guard let value = gfapValue else { return false }
        return value >= 29 && value <= 10001
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 32) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.red)

                    Text("Coma Module")
                        .font(.largeTitle)
                        .fontWeight(.bold)

                    Text("GCS < 8 - Rapid Assessment")
                        .font(.headline)
                        .foregroundColor(.secondary)
                }
                .padding(.top, 20)

                // Info Box
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Image(systemName: "info.circle.fill")
                            .foregroundColor(.blue)
                        Text("Critical Patient")
                            .fontWeight(.semibold)
                    }

                    Text("This module provides rapid ICH risk assessment for comatose patients using only GFAP biomarker data.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.blue.opacity(0.1))
                )

                // GFAP Input
                VStack(alignment: .leading, spacing: 12) {
                    Label("GFAP Value", systemImage: "drop.fill")
                        .font(.headline)
                        .foregroundColor(.primary)

                    HStack {
                        TextField("Enter value", text: $gfapText)
                            .keyboardType(.decimalPad)
                            .textFieldStyle(.roundedBorder)
                            .focused($isGfapFieldFocused)

                        Text("pg/mL")
                            .foregroundColor(.secondary)
                    }

                    Text("Valid range: 29 - 10,001 pg/mL")
                        .font(.caption)
                        .foregroundColor(.secondary)

                    if let value = gfapValue {
                        if value < 29 {
                            Text("⚠️ Value below minimum (29 pg/mL)")
                                .font(.caption)
                                .foregroundColor(.red)
                        } else if value > 10001 {
                            Text("⚠️ Value exceeds maximum (10,001 pg/mL)")
                                .font(.caption)
                                .foregroundColor(.red)
                        } else if value > 8000 {
                            Text("⚠️ Extremely high value - please verify")
                                .font(.caption)
                                .foregroundColor(.orange)
                        } else {
                            Text("✓ Valid value")
                                .font(.caption)
                                .foregroundColor(.green)
                        }
                    }
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)

                // Submit Button
                Button(action: submitAssessment) {
                    HStack {
                        Image(systemName: "bolt.fill")
                        Text("Calculate ICH Risk")
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(isValid ? Color.blue : Color.gray)
                    )
                }
                .disabled(!isValid)

                Spacer(minLength: 40)

                // Navigation Buttons
                HStack {
                    Button(action: { appState.goBack() }) {
                        HStack {
                            Image(systemName: "chevron.left")
                            Text("Back")
                        }
                        .foregroundColor(.blue)
                    }

                    Spacer()

                    Button(action: { appState.reset() }) {
                        HStack {
                            Image(systemName: "house")
                            Text("Home")
                        }
                        .foregroundColor(.blue)
                    }
                }
                .font(.subheadline)
            }
            .padding()
        }
        .onAppear {
            isGfapFieldFocused = true
        }
    }

    private func submitAssessment() {
        guard let value = gfapValue, isValid else { return }

        Task {
            await appState.submitComaAssessment(gfap: value)
        }
    }
}

#Preview {
    ComaAssessmentView()
        .environmentObject(AppState())
}
