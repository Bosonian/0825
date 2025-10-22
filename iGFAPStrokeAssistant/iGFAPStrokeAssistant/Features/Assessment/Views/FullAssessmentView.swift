//
//  FullAssessmentView.swift
//  iGFAP Stroke Triage Assistant
//
//  Full comprehensive stroke assessment
//

import SwiftUI

struct FullAssessmentView: View {
    @EnvironmentObject var appState: AppState

    // Basic fields
    @State private var ageText: String = ""
    @State private var systolicText: String = ""
    @State private var diastolicText: String = ""
    @State private var gfapText: String = ""
    @State private var fastEDText: String = ""

    // Symptoms
    @State private var headache: Bool = false
    @State private var vigilanceReduction: Bool = false
    @State private var armParesis: Bool = false
    @State private var legParesis: Bool = false
    @State private var eyeDeviation: Bool = false

    // History
    @State private var atrialFib: Bool = false
    @State private var anticoagulated: Bool = false
    @State private var antiplatelets: Bool = false

    @State private var showFASTEDCalculator = false

    var isValid: Bool {
        guard let age = Int(ageText),
              let systolic = Int(systolicText),
              let diastolic = Int(diastolicText),
              let gfap = Double(gfapText),
              let fastED = Int(fastEDText) else {
            return false
        }

        return age >= 18 && age <= 120 &&
               systolic >= 60 && systolic <= 300 &&
               diastolic >= 30 && diastolic <= 200 &&
               systolic > diastolic &&
               gfap >= 29 && gfap <= 10001 &&
               fastED >= 0 && fastED <= 9
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "doc.text.fill.badge.plus")
                        .font(.system(size: 50))
                        .foregroundColor(.green)

                    Text("Full Assessment")
                        .font(.title)
                        .fontWeight(.bold)

                    Text("Comprehensive stroke evaluation")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding(.top, 20)

                // Demographics
                Group {
                    FormField(title: "Age", icon: "person.fill", placeholder: "Years", text: $ageText, keyboardType: .numberPad, unit: "years")

                    VStack(alignment: .leading, spacing: 12) {
                        Label("Blood Pressure", systemImage: "heart.fill")
                            .font(.headline)
                        HStack(spacing: 12) {
                            TextField("Systolic", text: $systolicText)
                                .keyboardType(.numberPad)
                                .textFieldStyle(.roundedBorder)
                            Text("/")
                            TextField("Diastolic", text: $diastolicText)
                                .keyboardType(.numberPad)
                                .textFieldStyle(.roundedBorder)
                            Text("mmHg")
                                .foregroundColor(.secondary)
                        }
                    }
                    .padding()
                    .background(Color.gray.opacity(0.05))
                    .cornerRadius(12)

                    FormField(title: "GFAP", icon: "drop.fill", placeholder: "29-10,001", text: $gfapText, keyboardType: .decimalPad, unit: "pg/mL")
                }

                // FAST-ED Score
                VStack(alignment: .leading, spacing: 12) {
                    Label("FAST-ED Score", systemImage: "chart.bar.fill")
                        .font(.headline)

                    HStack {
                        TextField("0-9", text: $fastEDText)
                            .keyboardType(.numberPad)
                            .textFieldStyle(.roundedBorder)

                        Button("Calculate") {
                            showFASTEDCalculator = true
                        }
                        .buttonStyle(.borderedProminent)
                    }

                    Text("Field Assessment Stroke Triage for Emergency Destination")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)

                // Symptoms
                VStack(alignment: .leading, spacing: 12) {
                    Text("Symptoms")
                        .font(.headline)

                    Toggle("Headache", isOn: $headache)
                    Toggle("Vigilance Reduction", isOn: $vigilanceReduction)
                    Toggle("Arm Paresis", isOn: $armParesis)
                    Toggle("Leg Paresis", isOn: $legParesis)
                    Toggle("Eye Deviation", isOn: $eyeDeviation)
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)

                // Medical History
                VStack(alignment: .leading, spacing: 12) {
                    Text("Medical History")
                        .font(.headline)

                    Toggle("Atrial Fibrillation", isOn: $atrialFib)
                    Toggle("Anticoagulated (NOAK)", isOn: $anticoagulated)
                    Toggle("Antiplatelets", isOn: $antiplatelets)
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)

                // Submit
                Button(action: submitAssessment) {
                    HStack {
                        Image(systemName: "waveform.path.ecg")
                        Text("Calculate ICH & LVO Risk")
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(isValid ? Color.green : Color.gray)
                    )
                }
                .disabled(!isValid)

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
        .sheet(isPresented: $showFASTEDCalculator) {
            FASTEDCalculatorView(score: $fastEDText)
        }
    }

    private func submitAssessment() {
        guard isValid else { return }

        appState.currentPatientData.ageYears = Int(ageText)
        appState.currentPatientData.systolicBP = Int(systolicText)
        appState.currentPatientData.diastolicBP = Int(diastolicText)
        appState.currentPatientData.gfapValue = Double(gfapText)
        appState.currentPatientData.fastEdScore = Int(fastEDText)
        appState.currentPatientData.headache = headache
        appState.currentPatientData.vigilanceReduction = vigilanceReduction
        appState.currentPatientData.armParesis = armParesis
        appState.currentPatientData.legParesis = legParesis
        appState.currentPatientData.eyeDeviation = eyeDeviation
        appState.currentPatientData.atrialFibrillation = atrialFib
        appState.currentPatientData.anticoagulated = anticoagulated
        appState.currentPatientData.antiplatelets = antiplatelets

        Task {
            await appState.submitFullAssessment()
        }
    }
}

struct FASTEDCalculatorView: View {
    @Environment(\.dismiss) var dismiss
    @Binding var score: String
    @State private var calculatedScore = 0

    var body: some View {
        NavigationView {
            VStack {
                Text("FAST-ED Calculator")
                    .font(.title)
                    .padding()

                Text("Score: \(calculatedScore)")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .padding()

                Spacer()

                Button("Use Score") {
                    score = "\(calculatedScore)"
                    dismiss()
                }
                .buttonStyle(.borderedProminent)
            }
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
            }
        }
    }
}

#Preview {
    FullAssessmentView()
        .environmentObject(AppState())
}
