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
        VStack(spacing: 0) {
            AppNavigationBar(showBackButton: true, showHomeButton: true)

            VStack(spacing: 32) {
                // Header
            VStack(spacing: 12) {
                Image(systemName: "stethoscope")
                    .font(.system(size: 60))
                    .foregroundColor(.blue)

                Text("examinationCapability".localized)
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .minimumScaleFactor(0.7)
                    .lineLimit(2)

                Text(String(format: "stepOf".localized, 2, 2))
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding(.top, 40)

            Spacer()

            // Question
            VStack(spacing: 16) {
                Text("canBeReliablyExamined".localized)
                    .font(.title2)
                    .fontWeight(.semibold)
                    .multilineTextAlignment(.center)
                    .minimumScaleFactor(0.8)
                    .lineLimit(3)
                    .fixedSize(horizontal: false, vertical: true)

                Text("patientNotAphasic".localized)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
                    .minimumScaleFactor(0.8)
                    .fixedSize(horizontal: false, vertical: true)
            }

            Spacer()

            // Response Buttons
            VStack(spacing: 16) {
                // Yes - Full Module
                Button(action: selectFullModule) {
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                        Text("yesFullExam".localized)
                            .font(.headline)
                            .minimumScaleFactor(0.8)
                            .lineLimit(2)
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
                        Text("noLimitedExam".localized)
                            .font(.headline)
                            .minimumScaleFactor(0.8)
                            .lineLimit(2)
                        Spacer()
                        Image(systemName: "chevron.right")
                    }
                    .foregroundColor(.white)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.red)
                    )
                }
            }

            Spacer()

            // Back Button
            Button(action: { appState.goBack() }) {
                HStack {
                    Image(systemName: "chevron.left")
                    Text("goBack".localized)
                }
                .font(.subheadline)
                .foregroundColor(.blue)
            }
            .padding(.bottom)
            }
            .padding()
        }
        .edgesIgnoringSafeArea(.top)
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
