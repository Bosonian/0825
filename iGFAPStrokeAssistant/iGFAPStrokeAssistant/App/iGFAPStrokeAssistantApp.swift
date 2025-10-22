//
//  iGFAPStrokeAssistantApp.swift
//  iGFAP Stroke Triage Assistant
//
//  Main application entry point
//

import SwiftUI

@main
struct iGFAPStrokeAssistantApp: App {
    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .preferredColorScheme(appState.colorScheme)
        }
    }
}

struct ContentView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        Group {
            switch appState.currentScreen {
            case .login:
                LoginView()

            case .triageComa:
                TriageComaView()

            case .triageExam:
                TriageExamView()

            case .comaAssessment:
                ComaAssessmentView()

            case .limitedAssessment:
                LimitedAssessmentView()

            case .fullAssessment:
                FullAssessmentView()

            case .results:
                ResultsView()
            }
        }
        .alert("Error", isPresented: $appState.showError) {
            Button("OK") {
                appState.clearError()
            }
        } message: {
            if let errorMessage = appState.errorMessage {
                Text(errorMessage)
            }
        }
        .overlay {
            if appState.isLoading {
                LoadingView()
            }
        }
    }
}

struct LoadingView: View {
    var body: some View {
        ZStack {
            Color.black.opacity(0.4)
                .ignoresSafeArea()

            VStack(spacing: 16) {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .scaleEffect(1.5)

                Text("Processing...")
                    .foregroundColor(.white)
                    .font(.headline)
            }
            .padding(32)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.black.opacity(0.8))
            )
        }
    }
}
