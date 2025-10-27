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
        VStack(spacing: 0) {
            AppNavigationBar(showBackButton: true, showHomeButton: false)

            ScrollView {
                VStack(spacing: 32) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.red)

                    Text("comaModule".localized)
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .minimumScaleFactor(0.7)

                    Text("gcsRapidAssessment".localized)
                        .font(.headline)
                        .foregroundColor(.secondary)
                        .minimumScaleFactor(0.8)
                }
                .padding(.top, 20)

                // Info Box
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Image(systemName: "info.circle.fill")
                            .foregroundColor(.blue)
                        Text("criticalPatient".localized)
                            .fontWeight(.semibold)
                            .minimumScaleFactor(0.8)
                    }

                    Text("comaModuleDescription".localized)
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
                    Label("gfapValue".localized, systemImage: "drop.fill")
                        .font(.headline)
                        .foregroundColor(.primary)
                        .minimumScaleFactor(0.8)

                    HStack {
                        TextField("enterValue".localized, text: $gfapText)
                            .keyboardType(.decimalPad)
                            .textFieldStyle(.roundedBorder)
                            .focused($isGfapFieldFocused)

                        Text("pgml".localized)
                            .foregroundColor(.secondary)
                    }

                    Text("validRange".localized)
                        .font(.caption)
                        .foregroundColor(.secondary)

                    if let value = gfapValue {
                        if value < 29 {
                            Text("valueBelowMinimum".localized)
                                .font(.caption)
                                .foregroundColor(.red)
                        } else if value > 10001 {
                            Text("valueExceedsMaximum".localized)
                                .font(.caption)
                                .foregroundColor(.red)
                        } else if value > 8000 {
                            Text("extremelyHighValue".localized)
                                .font(.caption)
                                .foregroundColor(.orange)
                        } else {
                            Text("validValue".localized)
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
                        Text("calculateICHRisk".localized)
                            .minimumScaleFactor(0.8)
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
                            Text("back".localized)
                        }
                        .foregroundColor(.blue)
                    }

                    Spacer()

                    Button(action: { appState.reset() }) {
                        HStack {
                            Image(systemName: "house")
                            Text("home".localized)
                        }
                        .foregroundColor(.blue)
                    }
                }
                .font(.subheadline)
            }
            .padding()
            }
        }
        .edgesIgnoringSafeArea(.top)
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
