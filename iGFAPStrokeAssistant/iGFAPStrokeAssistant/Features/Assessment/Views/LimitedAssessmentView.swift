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
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "doc.text.fill")
                        .font(.system(size: 50))
                        .foregroundColor(.orange)

                    Text("Limited Data Module")
                        .font(.title)
                        .fontWeight(.bold)

                    Text("For patients who cannot be fully examined")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding(.top, 20)

                // Form Fields
                VStack(spacing: 20) {
                    // Age
                    FormField(
                        title: "Age",
                        icon: "person.fill",
                        placeholder: "Years",
                        text: $ageText,
                        keyboardType: .numberPad,
                        unit: "years"
                    )

                    // Blood Pressure
                    VStack(alignment: .leading, spacing: 12) {
                        Label("Blood Pressure", systemImage: "heart.fill")
                            .font(.headline)

                        HStack(spacing: 12) {
                            TextField("Systolic", text: $systolicText)
                                .keyboardType(.numberPad)
                                .textFieldStyle(.roundedBorder)

                            Text("/")
                                .foregroundColor(.secondary)

                            TextField("Diastolic", text: $diastolicText)
                                .keyboardType(.numberPad)
                                .textFieldStyle(.roundedBorder)

                            Text("mmHg")
                                .foregroundColor(.secondary)
                        }

                        if let systolic = Int(systolicText),
                           let diastolic = Int(diastolicText),
                           systolic <= diastolic {
                            Text("⚠️ Systolic must be greater than diastolic")
                                .font(.caption)
                                .foregroundColor(.red)
                        }
                    }
                    .padding()
                    .background(Color.gray.opacity(0.05))
                    .cornerRadius(12)

                    // GFAP
                    FormField(
                        title: "GFAP Value",
                        icon: "drop.fill",
                        placeholder: "29 - 10,001",
                        text: $gfapText,
                        keyboardType: .decimalPad,
                        unit: "pg/mL"
                    )

                    // Vigilance Reduction Toggle
                    VStack(alignment: .leading, spacing: 12) {
                        Label("Neurological Status", systemImage: "brain")
                            .font(.headline)

                        Toggle(isOn: $vigilanceReduction) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Vigilance Reduction")
                                    .font(.subheadline)
                                Text("Vigilanzminderung")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
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

                // Navigation
                HStack {
                    Button(action: { appState.goBack() }) {
                        HStack {
                            Image(systemName: "chevron.left")
                            Text("Back")
                        }
                    }

                    Spacer()

                    Button(action: { appState.reset() }) {
                        HStack {
                            Image(systemName: "house")
                            Text("Home")
                        }
                    }
                }
                .font(.subheadline)
                .foregroundColor(.blue)
            }
            .padding()
        }
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

            HStack {
                TextField(placeholder, text: $text)
                    .keyboardType(keyboardType)
                    .textFieldStyle(.roundedBorder)

                Text(unit)
                    .foregroundColor(.secondary)
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
