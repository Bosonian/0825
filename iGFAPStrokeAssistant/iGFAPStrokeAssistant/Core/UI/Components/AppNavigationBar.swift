//
//  AppNavigationBar.swift
//  iGFAP Stroke Triage Assistant
//
//  Custom navigation bar with back button, language & dark mode toggles
//

import SwiftUI

// Safe Area Insets Extension
private extension UIApplication {
    var keyWindow: UIWindow? {
        connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
    }
}

private struct SafeAreaInsetsKey: EnvironmentKey {
    static var defaultValue: EdgeInsets {
        UIApplication.shared.keyWindow?.safeAreaInsets.swiftUIInsets ?? EdgeInsets()
    }
}

private extension UIEdgeInsets {
    var swiftUIInsets: EdgeInsets {
        EdgeInsets(top: top, leading: left, bottom: bottom, trailing: right)
    }
}

extension EnvironmentValues {
    var safeAreaInsets: EdgeInsets {
        self[SafeAreaInsetsKey.self]
    }
}

struct AppNavigationBar: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.safeAreaInsets) private var safeAreaInsets

    var showBackButton: Bool = true
    var showHomeButton: Bool = false

    var body: some View {
        VStack(spacing: 0) {
            // Add safe area spacer for status bar and Dynamic Island
            Color.clear
                .frame(height: safeAreaInsets.top)

            HStack(alignment: .center, spacing: 8) {
            // Left: Back or Home button
            if showBackButton && !appState.navigationPath.isEmpty {
                Button(action: {
                    appState.goBack()
                }) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(width: 40, height: 40)
                        .background(
                            Circle()
                                .fill(Color.white.opacity(0.1))
                                .overlay(
                                    Circle()
                                        .stroke(Color.white.opacity(0.2), lineWidth: 1)
                                )
                        )
                }
            } else if showHomeButton {
                Button(action: {
                    appState.reset()
                }) {
                    Image(systemName: "house.fill")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(width: 40, height: 40)
                        .background(
                            Circle()
                                .fill(Color.white.opacity(0.1))
                                .overlay(
                                    Circle()
                                        .stroke(Color.white.opacity(0.2), lineWidth: 1)
                                )
                        )
                }
            } else {
                Spacer()
                    .frame(width: 40, height: 40)
            }

            Spacer()

            // Center: Title
            VStack(spacing: 2) {
                Text("iGFAP")
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(.white)

                Text("Stroke Triage Assistant")
                    .font(.system(size: 11, weight: .regular))
                    .foregroundColor(.white.opacity(0.85))
            }

            Spacer()

            // Right: Language & Dark mode toggles
            HStack(spacing: 8) {
                // Language Toggle
                Button(action: {
                    appState.toggleLanguage()
                }) {
                    Image(systemName: "globe")
                        .font(.system(size: 18))
                        .foregroundColor(.white)
                        .frame(width: 36, height: 36)
                }

                // Dark Mode Toggle
                Button(action: {
                    appState.toggleDarkMode()
                }) {
                    Image(systemName: appState.isDarkMode ? "moon.fill" : "sun.max.fill")
                        .font(.system(size: 18))
                        .foregroundColor(.white)
                        .frame(width: 36, height: 36)
                }
            }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .frame(height: 54)
        }
        .background(
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0, green: 0.4, blue: 0.8),    // #0066CC
                    Color(red: 0, green: 0.32, blue: 0.64)   // #0052A3
                ]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .shadow(color: Color.black.opacity(0.12), radius: 4, y: 2)
    }
}

#Preview {
    VStack {
        AppNavigationBar(showBackButton: true)
            .environmentObject(AppState())
    }
}
