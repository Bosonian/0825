//
//  LimitedAssessmentView.swift
//  iGFAP Stroke Triage Assistant
//
//  Limited data module (partial examination)
//

import SwiftUI

struct LimitedAssessmentView: View {
    @EnvironmentObject var appState: AppState

    @State private var ageText: String = ""
    @State private var systolicText: String = ""
    @State private var diastolicText: String = ""
    @State private var gfapText: String = ""
    @State private var vigilanceReduction: Bool = false

    var isValid: Bool {
        guard let age = Int(ageText),
              let systolic = Int(systolicText),
              let diastolic = Int(diastolicText),
              let gfap = Double(gfapText) else {
            return false
        }

        return age >= 18 && age <= 120 &&
               systolic >= 60 && systolic <= 300 &&
               diastolic >= 30 && diastolic <= 200 &&
               systolic > diastolic &&
               gfap >= 29 && gfap <= 10001
    }

    var body: some View {
        VStack(spacing: 0) {
            AppNavigationBar(showBackButton: true, showHomeButton: false)

            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 12) {
                    Image(systemName: "doc.text.fill")
                        .font(.system(size: 50))
                        .foregroundColor(.orange)

                    Text("limitedDataModule".localized)
                        .font(.title)
                        .fontWeight(.bold)
                        .minimumScaleFactor(0.7)
                        .lineLimit(2)

                    Text("forPatientsCannotExam".localized)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .minimumScaleFactor(0.8)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding(.top, 20)

                // Form Fields
                VStack(spacing: 20) {
                    // Age
                    FormField(
                        title: "age".localized,
                        icon: "person.fill",
                        placeholder: "years".localized,
                        text: $ageText,
                        keyboardType: .numberPad,
                        unit: "years".localized
                    )

                    // Blood Pressure
                    VStack(alignment: .leading, spacing: 12) {
                        Label("bloodPressure".localized, systemImage: "heart.fill")
                            .font(.headline)
                            .minimumScaleFactor(0.8)

                        HStack(spacing: 12) {
                            TextField("systolic".localized, text: $systolicText)
                                .keyboardType(.numberPad)
                                .textFieldStyle(.roundedBorder)

                            Text("/")
                                .foregroundColor(.secondary)

                            TextField("diastolic".localized, text: $diastolicText)
                                .keyboardType(.numberPad)
                                .textFieldStyle(.roundedBorder)

                            Text("mmHg".localized)
                                .foregroundColor(.secondary)
                        }

                        if let systolic = Int(systolicText),
                           let diastolic = Int(diastolicText),
                           systolic <= diastolic {
                            Text("systolicGreaterThanDiastolic".localized)
                                .font(.caption)
                                .foregroundColor(.red)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                    .padding()
                    .background(Color.gray.opacity(0.05))
                    .cornerRadius(12)

                    // GFAP
                    FormField(
                        title: "gfapValue".localized,
                        icon: "drop.fill",
                        placeholder: "29 - 10,001",
                        text: $gfapText,
                        keyboardType: .decimalPad,
                        unit: "pgml".localized
                    )

                    // Vigilance Reduction Toggle
                    VStack(alignment: .leading, spacing: 12) {
                        Label("neurologicalStatus".localized, systemImage: "brain")
                            .font(.headline)
                            .minimumScaleFactor(0.8)

                        Toggle(isOn: $vigilanceReduction) {
                            Text("reducedConsciousness".localized)
                                .font(.subheadline)
                                .minimumScaleFactor(0.8)
                        }
                        .tint(.blue)
                    }
                    .padding()
                    .background(Color.gray.opacity(0.05))
                    .cornerRadius(12)
                }

                // Submit Button
                Button(action: submitAssessment) {
                    HStack {
                        Image(systemName: "chart.bar.fill")
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

                // Navigation
                HStack {
                    Button(action: { appState.goBack() }) {
                        HStack {
                            Image(systemName: "chevron.left")
                            Text("back".localized)
                        }
                    }

                    Spacer()

                    Button(action: { appState.reset() }) {
                        HStack {
                            Image(systemName: "house")
                            Text("home".localized)
                        }
                    }
                }
                .font(.subheadline)
                .foregroundColor(.blue)
            }
            .padding()
        }
        }
        .edgesIgnoringSafeArea(.top)
    }

    private func submitAssessment() {
        guard isValid else { return }

        appState.currentPatientData.ageYears = Int(ageText)
        appState.currentPatientData.systolicBP = Int(systolicText)
        appState.currentPatientData.diastolicBP = Int(diastolicText)
        appState.currentPatientData.gfapValue = Double(gfapText)
        appState.currentPatientData.vigilanceReduction = vigilanceReduction

        Task {
            await appState.submitLimitedAssessment()
        }
    }
}

struct FormField: View {
    let title: String
    let icon: String
    let placeholder: String
    @Binding var text: String
    let keyboardType: UIKeyboardType
    let unit: String

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label(title, systemImage: icon)
                .font(.headline)
                .minimumScaleFactor(0.8)

            HStack {
                TextField(placeholder, text: $text)
                    .keyboardType(keyboardType)
                    .textFieldStyle(.roundedBorder)

                Text(unit)
                    .foregroundColor(.secondary)
                    .minimumScaleFactor(0.8)
            }
        }
        .padding()
        .background(Color.gray.opacity(0.05))
        .cornerRadius(12)
    }
}

#Preview {
    LimitedAssessmentView()
        .environmentObject(AppState())
}
