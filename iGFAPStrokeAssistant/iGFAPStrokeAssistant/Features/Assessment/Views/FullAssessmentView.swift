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
    @State private var fastEDAutoPopulated = false // Track if symptoms were auto-populated

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
        VStack(spacing: 0) {
            AppNavigationBar(showBackButton: true, showHomeButton: false)

            ScrollView {
                VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "doc.text.fill.badge.plus")
                        .font(.system(size: 50))
                        .foregroundColor(.green)

                    Text("fullAssessment".localized)
                        .font(.title)
                        .fontWeight(.bold)
                        .minimumScaleFactor(0.7)

                    Text("comprehensiveStrokeEvaluation".localized)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .minimumScaleFactor(0.8)
                }
                .padding(.top, 20)

                // Demographics
                Group {
                    FormField(title: "age".localized, icon: "person.fill", placeholder: "years".localized, text: $ageText, keyboardType: .numberPad, unit: "years".localized)

                    VStack(alignment: .leading, spacing: 12) {
                        Label("bloodPressure".localized, systemImage: "heart.fill")
                            .font(.headline)
                            .minimumScaleFactor(0.8)
                        HStack(spacing: 12) {
                            TextField("systolic".localized, text: $systolicText)
                                .keyboardType(.numberPad)
                                .textFieldStyle(.roundedBorder)
                            Text("/")
                            TextField("diastolic".localized, text: $diastolicText)
                                .keyboardType(.numberPad)
                                .textFieldStyle(.roundedBorder)
                            Text("mmHg".localized)
                                .foregroundColor(.secondary)
                        }
                    }
                    .padding()
                    .background(Color.gray.opacity(0.05))
                    .cornerRadius(12)

                    FormField(title: "gfapValue".localized, icon: "drop.fill", placeholder: "29-10,001", text: $gfapText, keyboardType: .decimalPad, unit: "pgml".localized)
                }

                // FAST-ED Score
                VStack(alignment: .leading, spacing: 12) {
                    Label("fastEdScore".localized, systemImage: "chart.bar.fill")
                        .font(.headline)
                        .minimumScaleFactor(0.8)

                    Button(action: {
                        showFASTEDCalculator = true
                    }) {
                        HStack {
                            Text(fastEDText.isEmpty ? "0-9" : fastEDText)
                                .foregroundColor(fastEDText.isEmpty ? .gray : .primary)
                            Spacer()
                        }
                        .padding()
                        .background(Color(UIColor.systemBackground))
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.gray.opacity(0.3), lineWidth: 1)
                        )
                    }
                    .buttonStyle(.plain)

                    Text("tapToCalculate".localized)
                        .font(.caption)
                        .foregroundColor(.blue)
                        .fixedSize(horizontal: false, vertical: true)

                    Text("fastedFullName".localized)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)

                // Symptoms
                VStack(alignment: .leading, spacing: 12) {
                    Text("symptoms".localized)
                        .font(.headline)
                        .minimumScaleFactor(0.8)

                    Toggle("headache".localized, isOn: $headache)
                    Toggle("reducedConsciousness".localized, isOn: $vigilanceReduction)
                    Toggle("legParesis".localized, isOn: $legParesis)
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)

                // Medical History
                VStack(alignment: .leading, spacing: 12) {
                    Text("medicalHistory".localized)
                        .font(.headline)
                        .minimumScaleFactor(0.8)

                    Toggle("atrialFibrillation".localized, isOn: $atrialFib)
                    Toggle("anticoagulated".localized, isOn: $anticoagulated)
                    Toggle("antiplatelets".localized, isOn: $antiplatelets)
                }
                .padding()
                .background(Color.gray.opacity(0.05))
                .cornerRadius(12)

                // Submit
                Button(action: submitAssessment) {
                    HStack {
                        Image(systemName: "waveform.path.ecg")
                        Text("calculateICHLVORisk".localized)
                            .minimumScaleFactor(0.75)
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
        .sheet(isPresented: $showFASTEDCalculator) {
            FASTEDCalculatorView(score: $fastEDText) { result in
                // Auto-populate symptoms from FAST-ED
                armParesis = result.hasArmWeakness
                eyeDeviation = result.hasEyeDeviation
                fastEDAutoPopulated = true
            }
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

#Preview {
    FullAssessmentView()
        .environmentObject(AppState())
}
