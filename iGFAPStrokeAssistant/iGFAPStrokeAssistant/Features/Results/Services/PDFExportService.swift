//
//  PDFExportService.swift
//  iGFAP Stroke Triage Assistant
//
//  PDF export for assessment results
//

import Foundation
import UIKit
import PDFKit

class PDFExportService {

    // MARK: - Public Interface

    static func generatePDF(for assessment: Assessment) -> URL? {
        guard let results = assessment.results else { return nil }

        let pdfData = createPDFData(assessment: assessment, results: results)

        // Save to temporary directory
        let fileName = "StrokeTriage_\(formatDateForFilename(assessment.timestamp)).pdf"
        let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent(fileName)

        do {
            try pdfData.write(to: tempURL)
            return tempURL
        } catch {
            print("Failed to save PDF: \(error)")
            return nil
        }
    }

    // MARK: - PDF Generation

    private static func createPDFData(assessment: Assessment, results: AssessmentResults) -> Data {
        let pdfMetaData = [
            kCGPDFContextCreator: "iGFAP Stroke Triage Assistant",
            kCGPDFContextAuthor: "Emergency Medical Services",
            kCGPDFContextTitle: "Stroke Assessment Report"
        ]

        let format = UIGraphicsPDFRendererFormat()
        format.documentInfo = pdfMetaData as [String: Any]

        // A4 size
        let pageRect = CGRect(x: 0, y: 0, width: 595, height: 842)
        let renderer = UIGraphicsPDFRenderer(bounds: pageRect, format: format)

        let data = renderer.pdfData { context in
            context.beginPage()

            let currentY = drawPDFContent(
                in: context.cgContext,
                pageRect: pageRect,
                assessment: assessment,
                results: results
            )

            // Add footer
            drawFooter(in: context.cgContext, pageRect: pageRect, y: currentY)
        }

        return data
    }

    // MARK: - Content Drawing

    private static func drawPDFContent(
        in context: CGContext,
        pageRect: CGRect,
        assessment: Assessment,
        results: AssessmentResults
    ) -> CGFloat {
        var currentY: CGFloat = 40

        // Header
        currentY = drawHeader(in: context, pageRect: pageRect, y: currentY, assessment: assessment)

        // Critical Alert
        if results.hasCriticalRisk {
            currentY = drawCriticalAlert(in: context, pageRect: pageRect, y: currentY)
        }

        // ICH Risk
        currentY = drawRiskSection(
            in: context,
            pageRect: pageRect,
            y: currentY,
            title: "ICH Risk Assessment",
            prediction: results.ich,
            volume: results.ich.volume
        )

        // LVO Risk (if available)
        if let lvo = results.lvo {
            currentY = drawRiskSection(
                in: context,
                pageRect: pageRect,
                y: currentY,
                title: "LVO Risk Assessment",
                prediction: lvo,
                volume: nil
            )
        }

        // Patient Data Summary
        currentY = drawPatientData(in: context, pageRect: pageRect, y: currentY, patientData: assessment.patientData)

        return currentY
    }

    // MARK: - Header

    private static func drawHeader(in context: CGContext, pageRect: CGRect, y: CGFloat, assessment: Assessment) -> CGFloat {
        var currentY = y

        // Title
        let titleAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 24, weight: .bold),
            .foregroundColor: UIColor.black
        ]
        let title = "Stroke Triage Assessment Report"
        let titleSize = title.size(withAttributes: titleAttributes)
        title.draw(
            at: CGPoint(x: (pageRect.width - titleSize.width) / 2, y: currentY),
            withAttributes: titleAttributes
        )
        currentY += titleSize.height + 10

        // Timestamp
        let timestampAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 12),
            .foregroundColor: UIColor.gray
        ]
        let timestamp = "Generated: \(formatDate(assessment.timestamp))"
        let timestampSize = timestamp.size(withAttributes: timestampAttributes)
        timestamp.draw(
            at: CGPoint(x: (pageRect.width - timestampSize.width) / 2, y: currentY),
            withAttributes: timestampAttributes
        )
        currentY += timestampSize.height + 5

        // Module
        let moduleText = "Module: \(assessment.module.displayName)"
        moduleText.draw(
            at: CGPoint(x: (pageRect.width - moduleText.size(withAttributes: timestampAttributes).width) / 2, y: currentY),
            withAttributes: timestampAttributes
        )
        currentY += 30

        // Divider
        context.setStrokeColor(UIColor.lightGray.cgColor)
        context.setLineWidth(1)
        context.move(to: CGPoint(x: 40, y: currentY))
        context.addLine(to: CGPoint(x: pageRect.width - 40, y: currentY))
        context.strokePath()

        return currentY + 20
    }

    // MARK: - Critical Alert

    private static func drawCriticalAlert(in context: CGContext, pageRect: CGRect, y: CGFloat) -> CGFloat {
        var currentY = y

        // Alert box
        let alertRect = CGRect(x: 40, y: currentY, width: pageRect.width - 80, height: 60)
        context.setFillColor(UIColor.systemRed.withAlphaComponent(0.1).cgColor)
        context.fill(alertRect)

        context.setStrokeColor(UIColor.systemRed.cgColor)
        context.setLineWidth(2)
        context.stroke(alertRect)

        // Alert text
        let alertAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 14, weight: .bold),
            .foregroundColor: UIColor.systemRed
        ]
        let alertText = "⚠️ CRITICAL RISK DETECTED"
        alertText.draw(
            at: CGPoint(x: 60, y: currentY + 15),
            withAttributes: alertAttributes
        )

        let detailAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 11),
            .foregroundColor: UIColor.black
        ]
        let detail = "Immediate intervention recommended"
        detail.draw(
            at: CGPoint(x: 60, y: currentY + 35),
            withAttributes: detailAttributes
        )

        return currentY + alertRect.height + 20
    }

    // MARK: - Risk Section

    private static func drawRiskSection(
        in context: CGContext,
        pageRect: CGRect,
        y: CGFloat,
        title: String,
        prediction: Any,
        volume: ICHVolume?
    ) -> CGFloat {
        var currentY = y

        // Section title
        let titleAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 16, weight: .semibold),
            .foregroundColor: UIColor.black
        ]
        title.draw(at: CGPoint(x: 40, y: currentY), withAttributes: titleAttributes)
        currentY += 30

        // Extract probability based on type
        let probability: Double
        let drivers: [RiskDriver]

        if let ichPrediction = prediction as? ICHPrediction {
            probability = ichPrediction.probability
            drivers = ichPrediction.drivers
        } else if let lvoPrediction = prediction as? LVOPrediction {
            probability = lvoPrediction.probability
            drivers = lvoPrediction.drivers
        } else {
            return currentY
        }

        let percentage = Int((probability * 100).rounded())
        let riskLevel = RiskLevel.from(probability: probability)

        // Risk box
        let riskRect = CGRect(x: 40, y: currentY, width: pageRect.width - 80, height: 80)
        context.setFillColor(UIColor.systemGray6.cgColor)
        context.fill(riskRect)

        // Percentage
        let percentageAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 48, weight: .bold),
            .foregroundColor: riskLevelColor(riskLevel)
        ]
        let percentText = "\(percentage)%"
        percentText.draw(at: CGPoint(x: 60, y: currentY + 15), withAttributes: percentageAttributes)

        // Risk level
        let levelAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 14, weight: .medium),
            .foregroundColor: riskLevelColor(riskLevel)
        ]
        riskLevel.displayName.draw(at: CGPoint(x: 200, y: currentY + 35), withAttributes: levelAttributes)

        currentY += riskRect.height + 15

        // Volume (if ICH)
        if let volume = volume {
            let volumeText = "Estimated Volume: \(volume.formattedVolume) (\(volume.severity.displayName))"
            let volumeAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 12),
                .foregroundColor: UIColor.black
            ]
            volumeText.draw(at: CGPoint(x: 60, y: currentY), withAttributes: volumeAttributes)
            currentY += 20

            let mortalityText = "Mortality Range: \(volume.mortalityRange)"
            mortalityText.draw(at: CGPoint(x: 60, y: currentY), withAttributes: volumeAttributes)
            currentY += 25
        }

        // Top 3 drivers
        let driverAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 11),
            .foregroundColor: UIColor.darkGray
        ]

        "Key Risk Factors:".draw(at: CGPoint(x: 60, y: currentY), withAttributes: driverAttributes)
        currentY += 18

        for driver in drivers.prefix(3) {
            let driverText = "• \(driver.displayName): \(String(format: "%.1f%%", driver.percentageContribution))"
            driverText.draw(at: CGPoint(x: 70, y: currentY), withAttributes: driverAttributes)
            currentY += 16
        }

        return currentY + 20
    }

    // MARK: - Patient Data

    private static func drawPatientData(in context: CGContext, pageRect: CGRect, y: CGFloat, patientData: PatientData) -> CGFloat {
        var currentY = y

        // Section title
        let titleAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 16, weight: .semibold),
            .foregroundColor: UIColor.black
        ]
        "Patient Data".draw(at: CGPoint(x: 40, y: currentY), withAttributes: titleAttributes)
        currentY += 30

        let dataAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 11),
            .foregroundColor: UIColor.black
        ]

        // Age
        if let age = patientData.ageYears {
            "Age: \(age) years".draw(at: CGPoint(x: 60, y: currentY), withAttributes: dataAttributes)
            currentY += 18
        }

        // BP
        if let systolic = patientData.systolicBP, let diastolic = patientData.diastolicBP {
            "Blood Pressure: \(systolic)/\(diastolic) mmHg".draw(at: CGPoint(x: 60, y: currentY), withAttributes: dataAttributes)
            currentY += 18
        }

        // GFAP
        if let gfap = patientData.gfapValue {
            "GFAP: \(String(format: "%.1f", gfap)) pg/mL".draw(at: CGPoint(x: 60, y: currentY), withAttributes: dataAttributes)
            currentY += 18
        }

        // FAST-ED
        if let fastED = patientData.fastEdScore {
            "FAST-ED Score: \(fastED)".draw(at: CGPoint(x: 60, y: currentY), withAttributes: dataAttributes)
            currentY += 18
        }

        return currentY + 20
    }

    // MARK: - Footer

    private static func drawFooter(in context: CGContext, pageRect: CGRect, y: CGFloat) {
        let footerY = pageRect.height - 60

        // Disclaimer
        let disclaimerAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 9),
            .foregroundColor: UIColor.gray
        ]

        let disclaimer = "⚠️ This assessment is for research purposes only. Clinical decisions should be made by qualified medical professionals."
        let disclaimerRect = CGRect(x: 40, y: footerY, width: pageRect.width - 80, height: 40)
        disclaimer.draw(in: disclaimerRect, withAttributes: disclaimerAttributes)

        // Generator
        let generator = "Generated by iGFAP Stroke Triage Assistant v2.0"
        generator.draw(
            at: CGPoint(x: 40, y: footerY + 35),
            withAttributes: disclaimerAttributes
        )
    }

    // MARK: - Helpers

    private static func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }

    private static func formatDateForFilename(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyyMMdd_HHmmss"
        return formatter.string(from: date)
    }

    private static func riskLevelColor(_ level: RiskLevel) -> UIColor {
        switch level {
        case .low: return .systemBlue
        case .medium: return .systemYellow
        case .high: return .systemOrange
        case .critical: return .systemRed
        }
    }
}
