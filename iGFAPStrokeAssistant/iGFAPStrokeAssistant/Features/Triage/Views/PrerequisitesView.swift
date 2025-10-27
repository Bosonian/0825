//
//  PrerequisitesView.swift
//  iGFAP Stroke Triage Assistant
//
//  Prerequisites checklist before stroke module selection
//

import SwiftUI

struct PrerequisitesView: View {
    @EnvironmentObject var appState: AppState

    @State private var acuteDeficit: Bool = false
    @State private var symptomOnset: Bool = false
    @State private var noPreexisting: Bool = false
    @State private var noTrauma: Bool = false
    @State private var showWarning: Bool = false

    var allPrerequisitesMet: Bool {
        acuteDeficit && symptomOnset && noPreexisting && noTrauma
    }

    var body: some View {
        VStack(spacing: 0) {
            AppNavigationBar(showBackButton: true, showHomeButton: true)

            VStack(spacing: 32) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "checkmark.shield.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.blue)

                    Text("prerequisitesTitle".localized)
                        .font(.title)
                        .fontWeight(.bold)
                        .multilineTextAlignment(.center)
                        .minimumScaleFactor(0.7)
                        .lineLimit(2)
                        .padding(.horizontal)
                }
                .padding(.top, 20)

                // Introduction
                Text("prerequisitesIntro".localized)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding(.horizontal)

                Spacer()

                // Prerequisites List
                VStack(spacing: 16) {
                    PrerequisiteToggle(
                        title: "acuteDeficit".localized,
                        isOn: $acuteDeficit
                    )

                    PrerequisiteToggle(
                        title: "symptomOnset".localized,
                        isOn: $symptomOnset
                    )

                    PrerequisiteToggle(
                        title: "noPreexisting".localized,
                        isOn: $noPreexisting
                    )

                    PrerequisiteToggle(
                        title: "noTrauma".localized,
                        isOn: $noTrauma
                    )
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)

                // Warning Message
                if showWarning {
                    HStack(spacing: 12) {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .foregroundColor(.orange)
                        Text("prerequisitesWarning".localized)
                            .font(.subheadline)
                            .fontWeight(.medium)
                            .foregroundColor(.orange)
                            .minimumScaleFactor(0.8)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .padding()
                    .background(Color.orange.opacity(0.1))
                    .cornerRadius(8)
                    .transition(.opacity)
                }

                Spacer()

                // Continue Button
                Button(action: continueToTriageExam) {
                    HStack {
                        Image(systemName: "arrow.right.circle.fill")
                        Text("button.continue".localized)
                            .minimumScaleFactor(0.8)
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.green)
                    )
                }

                // Back Button
                Button(action: { appState.goBack() }) {
                    HStack {
                        Image(systemName: "chevron.left")
                        Text("button.back".localized)
                    }
                }
                .font(.subheadline)
                .foregroundColor(.blue)
                .padding(.bottom)
            }
            .padding()
        }
        .edgesIgnoringSafeArea(.top)
        .onChange(of: acuteDeficit) { _ in hideWarningIfAllMet() }
        .onChange(of: symptomOnset) { _ in hideWarningIfAllMet() }
        .onChange(of: noPreexisting) { _ in hideWarningIfAllMet() }
        .onChange(of: noTrauma) { _ in hideWarningIfAllMet() }
    }

    private func continueToTriageExam() {
        if allPrerequisitesMet {
            appState.navigate(to: .triageExam)
        } else {
            withAnimation {
                showWarning = true
            }
        }
    }

    private func hideWarningIfAllMet() {
        if allPrerequisitesMet {
            withAnimation {
                showWarning = false
            }
        }
    }
}

struct PrerequisiteToggle: View {
    let title: String
    @Binding var isOn: Bool

    var body: some View {
        HStack {
            Toggle(isOn: $isOn) {
                Text(title)
                    .font(.subheadline)
                    .minimumScaleFactor(0.8)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .toggleStyle(SwitchToggleStyle(tint: .blue))
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    PrerequisitesView()
        .environmentObject(AppState())
}
