//
//  LoginView.swift
//  iGFAP Stroke Triage Assistant
//
//  Research access authentication screen
//

import SwiftUI

struct LoginView: View {
    @EnvironmentObject var appState: AppState
    @State private var accessCode: String = ""
    @FocusState private var isCodeFieldFocused: Bool

    var body: some View {
        ScrollView {
            VStack(spacing: 32) {
                // Header
                VStack(spacing: 16) {
                    Image("app-logo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 100, height: 100)

                    Text("strokeTriageAssistant".localized)
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .minimumScaleFactor(0.7)
                        .lineLimit(2)

                    Text("researchAccess".localized)
                        .font(.title3)
                        .foregroundColor(.secondary)
                        .minimumScaleFactor(0.8)
                }
                .padding(.top, 60)

                // Disclaimer
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .foregroundColor(.orange)
                        Text("researchToolOnly".localized)
                            .fontWeight(.semibold)
                            .minimumScaleFactor(0.8)
                            .lineLimit(2)
                    }

                    Text("researchToolDisclaimer".localized)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.orange.opacity(0.1))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.orange.opacity(0.3), lineWidth: 1)
                )

                // Access Code Input
                VStack(alignment: .leading, spacing: 8) {
                    Text("researchAccessCode".localized)
                        .font(.headline)
                        .minimumScaleFactor(0.8)

                    SecureField("enterAccessCode".localized, text: $accessCode)
                        .textFieldStyle(.roundedBorder)
                        .focused($isCodeFieldFocused)
                        .textContentType(.password)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                        .onSubmit {
                            login()
                        }

                    Text("contactResearchCoordinator".localized)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                }

                // Login Button
                Button(action: login) {
                    HStack {
                        Image(systemName: "lock.shield.fill")
                        Text("secureLogin".localized)
                            .minimumScaleFactor(0.8)
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(accessCode.isEmpty ? Color.gray : Color.blue)
                    )
                }
                .disabled(accessCode.isEmpty)

                Spacer()

                // Footer
                VStack(spacing: 8) {
                    Text("ceCertificationPending".localized)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .minimumScaleFactor(0.8)

                    Text("clinicalOversight".localized)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                        .multilineTextAlignment(.center)

                    Text("contactEmail".localized)
                        .font(.caption2)
                        .foregroundColor(.blue)
                }
            }
            .padding()
        }
        .onAppear {
            isCodeFieldFocused = true
        }
    }

    private func login() {
        guard !accessCode.isEmpty else { return }

        Task {
            await appState.login(accessCode: accessCode)
        }
    }
}

#Preview {
    LoginView()
        .environmentObject(AppState())
}
