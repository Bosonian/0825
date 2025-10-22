//
//  TriageExamView.swift
//  iGFAP Stroke Triage Assistant
//
//  Second triage question: Can patient be examined?
//

import SwiftUI

struct TriageExamView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        VStack(spacing: 32) {
            // Header
            VStack(spacing: 12) {
                Image(systemName: "stethoscope")
                    .font(.system(size: 60))
                    .foregroundColor(.blue)

                Text("Patient Examination")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                Text("Step 2 of 2")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding(.top, 40)

            Spacer()

            // Question
            VStack(spacing: 16) {
                Text("Can the patient be reliably examined?")
                    .font(.title2)
                    .fontWeight(.semibold)
                    .multilineTextAlignment(.center)

                Text("Patient is cooperative, not significantly aphasic or confused")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
            }

            Spacer()

            // Response Buttons
            VStack(spacing: 16) {
                // Yes - Full Module
                Button(action: selectFullModule) {
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Yes, can examine")
                                .font(.headline)
                            Text("Full comprehensive assessment")
                                .font(.caption)
                                .foregroundColor(.white.opacity(0.8))
                        }
                        Spacer()
                        Image(systemName: "chevron.right")
                    }
                    .foregroundColor(.white)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.green)
                    )
                }

                // No - Limited Module
                Button(action: selectLimitedModule) {
                    HStack {
                        Image(systemName: "xmark.circle.fill")
                        VStack(alignment: .leading, spacing: 4) {
                            Text("No, cannot examine")
                                .font(.headline)
                            Text("Limited data assessment")
                                .font(.caption)
                                .foregroundColor(.white.opacity(0.8))
                        }
                        Spacer()
                        Image(systemName: "chevron.right")
                    }
                    .foregroundColor(.white)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.orange)
                    )
                }
            }

            Spacer()

            // Back Button
            Button(action: { appState.goBack() }) {
                HStack {
                    Image(systemName: "chevron.left")
                    Text("Back")
                }
                .font(.subheadline)
                .foregroundColor(.blue)
            }
            .padding(.bottom)
        }
        .padding()
    }

    private func selectFullModule() {
        appState.selectModule(.full)
    }

    private func selectLimitedModule() {
        appState.selectModule(.limited)
    }
}

#Preview {
    TriageExamView()
        .environmentObject(AppState())
}
