//
//  TriageComaView.swift
//  iGFAP Stroke Triage Assistant
//
//  First triage question: Is patient comatose?
//

import SwiftUI

struct TriageComaView: View {
    @EnvironmentObject var appState: AppState
    @State private var showGCSInfo = false

    var body: some View {
        VStack(spacing: 0) {
            AppNavigationBar(showBackButton: false, showHomeButton: true)

            VStack(spacing: 32) {
                // Header
            VStack(spacing: 12) {
                Image(systemName: "questionmark.circle.fill")
                    .font(.system(size: 60))
                    .foregroundColor(.blue)

                Text("patientAssessment".localized)
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .minimumScaleFactor(0.7)
                    .lineLimit(2)

                Text(String(format: "stepOf".localized, 1, 2))
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding(.top, 40)

            Spacer()

            // Question
            VStack(spacing: 24) {
                Text("isPatientComatose".localized)
                    .font(.title2)
                    .fontWeight(.semibold)
                    .multilineTextAlignment(.center)
                    .minimumScaleFactor(0.8)
                    .lineLimit(3)
                    .fixedSize(horizontal: false, vertical: true)

                Text("glasgowComaScale".localized)
                    .font(.headline)
                    .foregroundColor(.secondary)
                    .minimumScaleFactor(0.8)
                    .lineLimit(2)
                    .fixedSize(horizontal: false, vertical: true)

                // Info Button
                Button(action: { showGCSInfo = true }) {
                    HStack {
                        Image(systemName: "info.circle")
                        Text("whatIsGCS".localized)
                            .minimumScaleFactor(0.8)
                            .lineLimit(1)
                    }
                    .font(.subheadline)
                    .foregroundColor(.blue)
                }
            }

            Spacer()

            // Response Buttons
            VStack(spacing: 16) {
                // Yes - Coma Module
                Button(action: selectComaModule) {
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                        VStack(alignment: .leading, spacing: 4) {
                            Text("yesComatose".localized)
                                .font(.headline)
                                .minimumScaleFactor(0.8)
                                .lineLimit(2)
                            Text("patientIsComatose".localized)
                                .font(.caption)
                                .foregroundColor(.white.opacity(0.8))
                                .minimumScaleFactor(0.8)
                                .lineLimit(2)
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

                // No - Continue to Triage 2
                Button(action: continueToTriageExam) {
                    HStack {
                        Image(systemName: "xmark.circle.fill")
                        VStack(alignment: .leading, spacing: 4) {
                            Text("noComatose".localized)
                                .font(.headline)
                                .minimumScaleFactor(0.8)
                                .lineLimit(2)
                            Text("patientIsNotComatose".localized)
                                .font(.caption)
                                .foregroundColor(.white.opacity(0.8))
                                .minimumScaleFactor(0.8)
                                .lineLimit(2)
                        }
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

            // Logout Button
            Button(action: { appState.logout() }) {
                HStack {
                    Image(systemName: "rectangle.portrait.and.arrow.right")
                    Text("logout".localized)
                }
                .font(.subheadline)
                .foregroundColor(.red)
            }
            .padding(.bottom)
            }
            .padding()
        }
        .edgesIgnoringSafeArea(.top)
        .sheet(isPresented: $showGCSInfo) {
            GCSInfoView()
        }
    }

    private func selectComaModule() {
        appState.selectModule(.coma)
    }

    private func continueToTriageExam() {
        appState.navigate(to: .prerequisites)
    }
}

struct GCSInfoView: View {
    @Environment(\.dismiss) var dismiss

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    Text("Glasgow Coma Scale (GCS)")
                        .font(.title)
                        .fontWeight(.bold)

                    Text("The GCS assesses consciousness based on three responses:")
                        .font(.body)

                    VStack(alignment: .leading, spacing: 12) {
                        GCSComponent(
                            icon: "eye",
                            title: "Eye Opening",
                            range: "1-4 points"
                        )

                        GCSComponent(
                            icon: "bubble.left",
                            title: "Verbal Response",
                            range: "1-5 points"
                        )

                        GCSComponent(
                            icon: "hand.raised",
                            title: "Motor Response",
                            range: "1-6 points"
                        )
                    }

                    Divider()

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Total Score: 3-15")
                            .font(.headline)

                        Text("• GCS 13-15: Minor head injury")
                        Text("• GCS 9-12: Moderate head injury")
                        Text("• GCS 3-8: Severe head injury (comatose)")
                            .fontWeight(.semibold)
                    }
                    .font(.subheadline)

                    Text("A GCS < 8 indicates severe impairment and requires the Coma Module for rapid assessment.")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .padding()
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(8)
                }
                .padding()
            }
            .navigationTitle("GCS Information")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}

struct GCSComponent: View {
    let icon: String
    let title: String
    let range: String

    var body: some View {
        HStack {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(.blue)
                .frame(width: 32)

            VStack(alignment: .leading) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.medium)
                Text(range)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(8)
    }
}

#Preview {
    TriageComaView()
        .environmentObject(AppState())
}
