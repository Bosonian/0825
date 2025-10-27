//
//  PrimaryButton.swift
//  iGFAP Stroke Triage Assistant
//
//  Reusable primary button component
//

import SwiftUI

struct PrimaryButton: View {
    let title: String
    let icon: String?
    let action: () -> Void
    var isEnabled: Bool = true
    var isLoading: Bool = false
    var style: ButtonStyle = .primary

    enum ButtonStyle {
        case primary
        case secondary
        case destructive
        case success

        var backgroundColor: Color {
            switch self {
            case .primary: return .blue
            case .secondary: return .gray
            case .destructive: return .red
            case .success: return .green
            }
        }
    }

    init(
        _ title: String,
        icon: String? = nil,
        style: ButtonStyle = .primary,
        isEnabled: Bool = true,
        isLoading: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.icon = icon
        self.style = style
        self.isEnabled = isEnabled
        self.isLoading = isLoading
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                } else if let icon = icon {
                    Image(systemName: icon)
                }

                Text(title)
                    .fontWeight(.semibold)
            }
            .font(.headline)
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(isEnabled ? style.backgroundColor : Color.gray)
            )
        }
        .disabled(!isEnabled || isLoading)
    }
}

// MARK: - Preview

struct PrimaryButton_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: 16) {
            PrimaryButton("Submit Assessment", icon: "checkmark.circle") {}

            PrimaryButton("Cancel", style: .secondary) {}

            PrimaryButton("Delete", icon: "trash", style: .destructive) {}

            PrimaryButton("Processing...", isLoading: true) {}

            PrimaryButton("Disabled", isEnabled: false) {}
        }
        .padding()
    }
}
