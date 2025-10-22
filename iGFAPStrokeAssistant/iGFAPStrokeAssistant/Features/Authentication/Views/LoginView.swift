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
                    Image(systemName: "brain.head.profile")
                        .font(.system(size: 72))
                        .foregroundColor(.blue)

                    Text("iGFAP Stroke Triage")
                        .font(.largeTitle)
                        .fontWeight(.bold)

                    Text("Research Access")
                        .font(.title3)
                        .foregroundColor(.secondary)
                }
                .padding(.top, 60)

                // Disclaimer
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .foregroundColor(.orange)
                        Text("Research Tool Only")
                            .fontWeight(.semibold)
                    }

                    Text("This application is for research purposes only and is not approved for clinical use. Always consult qualified medical professionals for patient care decisions.")
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
                    Text("Research Access Code")
                        .font(.headline)

                    SecureField("Enter access code", text: $accessCode)
                        .textFieldStyle(.roundedBorder)
                        .focused($isCodeFieldFocused)
                        .textContentType(.password)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                        .onSubmit {
                            login()
                        }

                    Text("Contact your research coordinator for access")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                // Login Button
                Button(action: login) {
                    HStack {
                        Image(systemName: "lock.shield.fill")
                        Text("Secure Login")
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
                    Text("CE certification pending")
                        .font(.caption)
                        .foregroundColor(.secondary)

                    Text("Clinical oversight: RKH Klinikum Ludwigsburg")
                        .font(.caption2)
                        .foregroundColor(.secondary)

                    Text("Contact: bosdeepak@gmail.com")
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
