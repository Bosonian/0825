//
//  FormField.swift
//  iGFAP Stroke Triage Assistant
//
//  Reusable form field components
//

import SwiftUI

// MARK: - Text Field

struct FormTextField: View {
    let label: String
    @Binding var text: String
    var placeholder: String = ""
    var keyboardType: UIKeyboardType = .default
    var helpText: String? = nil
    var errorText: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(label)
                .font(.headline)
                .foregroundColor(.primary)

            TextField(placeholder.isEmpty ? label : placeholder, text: $text)
                .textFieldStyle(.roundedBorder)
                .keyboardType(keyboardType)
                .autocorrectionDisabled()

            if let error = errorText {
                HStack(spacing: 4) {
                    Image(systemName: "exclamationmark.circle.fill")
                        .font(.caption)
                    Text(error)
                        .font(.caption)
                }
                .foregroundColor(.red)
            } else if let help = helpText {
                Text(help)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

// MARK: - Number Field

struct FormNumberField: View {
    let label: String
    @Binding var value: Int?
    var range: ClosedRange<Int>? = nil
    var unit: String? = nil
    var helpText: String? = nil
    var errorText: String? = nil

    @State private var textValue: String = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(label)
                .font(.headline)
                .foregroundColor(.primary)

            HStack {
                TextField("Enter value", text: $textValue)
                    .textFieldStyle(.roundedBorder)
                    .keyboardType(.numberPad)
                    .onChange(of: textValue) { newValue in
                        if let number = Int(newValue) {
                            if let range = range {
                                if range.contains(number) {
                                    value = number
                                }
                            } else {
                                value = number
                            }
                        } else if newValue.isEmpty {
                            value = nil
                        }
                    }
                    .onChange(of: value) { newValue in
                        if let newValue = newValue {
                            textValue = String(newValue)
                        } else if textValue.isEmpty == false {
                            textValue = ""
                        }
                    }

                if let unit = unit {
                    Text(unit)
                        .foregroundColor(.secondary)
                        .padding(.trailing, 8)
                }
            }

            if let error = errorText {
                HStack(spacing: 4) {
                    Image(systemName: "exclamationmark.circle.fill")
                        .font(.caption)
                    Text(error)
                        .font(.caption)
                }
                .foregroundColor(.red)
            } else if let help = helpText {
                Text(help)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .onAppear {
            if let value = value {
                textValue = String(value)
            }
        }
    }
}

// MARK: - Decimal Field

struct FormDecimalField: View {
    let label: String
    @Binding var value: Double?
    var range: ClosedRange<Double>? = nil
    var unit: String? = nil
    var helpText: String? = nil
    var errorText: String? = nil

    @State private var textValue: String = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(label)
                .font(.headline)
                .foregroundColor(.primary)

            HStack {
                TextField("Enter value", text: $textValue)
                    .textFieldStyle(.roundedBorder)
                    .keyboardType(.decimalPad)
                    .onChange(of: textValue) { newValue in
                        if let number = Double(newValue) {
                            if let range = range {
                                if range.contains(number) {
                                    value = number
                                }
                            } else {
                                value = number
                            }
                        } else if newValue.isEmpty {
                            value = nil
                        }
                    }
                    .onChange(of: value) { newValue in
                        if let newValue = newValue {
                            textValue = String(newValue)
                        } else if textValue.isEmpty == false {
                            textValue = ""
                        }
                    }

                if let unit = unit {
                    Text(unit)
                        .foregroundColor(.secondary)
                        .padding(.trailing, 8)
                }
            }

            if let error = errorText {
                HStack(spacing: 4) {
                    Image(systemName: "exclamationmark.circle.fill")
                        .font(.caption)
                    Text(error)
                        .font(.caption)
                }
                .foregroundColor(.red)
            } else if let help = helpText {
                Text(help)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .onAppear {
            if let value = value {
                textValue = String(value)
            }
        }
    }
}

// MARK: - Toggle Field

struct FormToggle: View {
    let label: String
    @Binding var isOn: Bool
    var helpText: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Toggle(isOn: $isOn) {
                Text(label)
                    .font(.headline)
            }

            if let help = helpText {
                Text(help)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .padding(.leading, 4)
            }
        }
    }
}

// MARK: - Picker Field

struct FormPicker<T: Hashable>: View {
    let label: String
    @Binding var selection: T
    let options: [T]
    let displayName: (T) -> String
    var helpText: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(label)
                .font(.headline)
                .foregroundColor(.primary)

            Picker(label, selection: $selection) {
                ForEach(options, id: \.self) { option in
                    Text(displayName(option))
                        .tag(option)
                }
            }
            .pickerStyle(.segmented)

            if let help = helpText {
                Text(help)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

// MARK: - Preview

struct FormField_Previews: PreviewProvider {
    static var previews: some View {
        Form {
            Section {
                FormTextField(
                    label: "Patient Name",
                    text: .constant(""),
                    placeholder: "Enter name",
                    helpText: "First and last name"
                )

                FormNumberField(
                    label: "Age",
                    value: .constant(65),
                    range: 0...120,
                    unit: "years",
                    helpText: "Patient age in years"
                )

                FormDecimalField(
                    label: "GFAP Value",
                    value: .constant(500.0),
                    range: 29...10001,
                    unit: "pg/mL",
                    helpText: "Valid range: 29-10,001"
                )

                FormToggle(
                    label: "Headache",
                    isOn: .constant(true),
                    helpText: "Patient reports headache"
                )
            }
        }
    }
}
