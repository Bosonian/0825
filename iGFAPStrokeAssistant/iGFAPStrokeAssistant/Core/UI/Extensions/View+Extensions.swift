//
//  View+Extensions.swift
//  iGFAP Stroke Triage Assistant
//
//  SwiftUI View extensions and modifiers
//

import SwiftUI

extension View {
    // MARK: - Card Style

    /// Apply card-like styling with shadow and rounded corners
    func cardStyle(padding: CGFloat = 16) -> some View {
        self
            .padding(padding)
            .background(Color.backgroundSecondary)
            .cornerRadius(12)
            .shadow(color: Color.black.opacity(0.1), radius: 4, x: 0, y: 2)
    }

    /// Apply bordered card style
    func borderedCardStyle(borderColor: Color = .gray, padding: CGFloat = 16) -> some View {
        self
            .padding(padding)
            .background(Color.backgroundSecondary)
            .cornerRadius(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(borderColor.opacity(0.3), lineWidth: 1)
            )
    }

    // MARK: - Section Styling

    /// Apply section header styling
    func sectionHeaderStyle() -> some View {
        self
            .font(.headline)
            .foregroundColor(.textPrimary)
            .padding(.vertical, 8)
    }

    // MARK: - Conditional Modifiers

    /// Conditionally apply a modifier
    @ViewBuilder
    func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }

    /// Apply modifier if optional value is non-nil
    @ViewBuilder
    func ifLet<T, Content: View>(_ value: T?, transform: (Self, T) -> Content) -> some View {
        if let value = value {
            transform(self, value)
        } else {
            self
        }
    }

    // MARK: - Alert Modifiers

    /// Show error alert with message
    func errorAlert(isPresented: Binding<Bool>, message: Binding<String?>) -> some View {
        self.alert("Error", isPresented: isPresented) {
            Button("OK", role: .cancel) {
                message.wrappedValue = nil
            }
        } message: {
            if let msg = message.wrappedValue {
                Text(msg)
            }
        }
    }

    // MARK: - Loading Overlay

    /// Add loading overlay
    func loadingOverlay(isLoading: Bool, message: String = "Loading...") -> some View {
        self.overlay {
            if isLoading {
                ZStack {
                    Color.black.opacity(0.4)
                        .ignoresSafeArea()

                    VStack(spacing: 16) {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                            .scaleEffect(1.5)

                        Text(message)
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
    }

    // MARK: - Navigation

    /// Add navigation bar with title
    func navigationBarTitle(_ title: String) -> some View {
        self.navigationBarTitleDisplayMode(.large)
            .navigationTitle(title)
    }

    // MARK: - Tap Gestures

    /// Hide keyboard on tap
    func hideKeyboardOnTap() -> some View {
        self.onTapGesture {
            UIApplication.shared.sendAction(
                #selector(UIResponder.resignFirstResponder),
                to: nil,
                from: nil,
                for: nil
            )
        }
    }

    // MARK: - Accessibility

    /// Add accessibility label and hint
    func accessibility(label: String, hint: String? = nil) -> some View {
        self
            .accessibilityLabel(label)
            .if(hint != nil) { view in
                view.accessibilityHint(hint!)
            }
    }
}

// MARK: - Custom View Modifiers

struct ShakeEffect: GeometryEffect {
    var amount: CGFloat = 10
    var shakesPerUnit = 3
    var animatableData: CGFloat

    func effectValue(size: CGSize) -> ProjectionTransform {
        ProjectionTransform(
            CGAffineTransform(
                translationX: amount * sin(animatableData * .pi * CGFloat(shakesPerUnit)),
                y: 0
            )
        )
    }
}

extension View {
    /// Add shake animation for errors
    func shake(trigger: Int) -> some View {
        self.modifier(ShakeEffect(animatableData: CGFloat(trigger)))
    }
}

// MARK: - Risk Level Styling

struct RiskLevelBadge: ViewModifier {
    let level: RiskLevel

    func body(content: Content) -> View {
        content
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(Color.forRisk(level).opacity(0.2))
            .foregroundColor(Color.forRisk(level))
            .cornerRadius(8)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(Color.forRisk(level), lineWidth: 1)
            )
    }
}

extension View {
    func riskBadge(_ level: RiskLevel) -> some View {
        self.modifier(RiskLevelBadge(level: level))
    }
}

// MARK: - Form Section Styling

struct FormSectionStyle: ViewModifier {
    func body(content: Content) -> View {
        content
            .listRowBackground(Color.backgroundSecondary)
            .listRowSeparator(.hidden)
    }
}

extension View {
    func formSectionStyle() -> some View {
        self.modifier(FormSectionStyle())
    }
}
