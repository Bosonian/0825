//
//  BrainVisualizationView.swift
//  iGFAP Stroke Triage Assistant
//
//  Animated brain visualization with ICH volume display
//

import SwiftUI
import UIKit

/// SwiftUI wrapper for UIKit brain visualization
struct BrainVisualizationView: UIViewRepresentable {
    let volume: ICHVolume

    func makeUIView(context: Context) -> BrainCanvasView {
        BrainCanvasView(volume: volume)
    }

    func updateUIView(_ uiView: BrainCanvasView, context: Context) {
        uiView.updateVolume(volume)
    }
}

/// Custom UIView with CoreGraphics brain visualization
class BrainCanvasView: UIView {

    private var volume: ICHVolume
    private var displayLink: CADisplayLink?
    private var phase: CGFloat = 0
    private var animationProgress: CGFloat = 0

    init(volume: ICHVolume) {
        self.volume = volume
        super.init(frame: .zero)
        backgroundColor = .clear
        setupAnimation()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // MARK: - Animation Setup

    private func setupAnimation() {
        displayLink = CADisplayLink(target: self, selector: #selector(animate))
        displayLink?.add(to: .main, forMode: .common)
    }

    @objc private func animate() {
        phase += 0.05  // Wave animation speed

        // Smooth fill animation on first render
        if animationProgress < 1.0 {
            animationProgress += 0.02
        }

        setNeedsDisplay()
    }

    // MARK: - Drawing

    override func draw(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }

        // Use smaller rect with padding
        let padding: CGFloat = 20
        let drawRect = rect.insetBy(dx: padding, dy: padding)

        // Draw brain outline
        drawBrainOutline(in: context, rect: drawRect)

        // Draw hemorrhage if volume > 0
        if volume.estimatedML > 0 {
            drawHemorrhage(in: context, rect: drawRect)
        }

        // Draw reference marker at 30ml
        draw30mlMarker(in: context, rect: drawRect)

        // Draw volume label
        drawVolumeLabel(in: context, rect: drawRect)
    }

    // MARK: - Brain Outline

    private func drawBrainOutline(in context: CGContext, rect: CGRect) {
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = min(rect.width, rect.height) * 0.45

        // Create brain-like shape (simplified)
        let path = UIBezierPath()

        // Main oval for brain
        let brainRect = CGRect(
            x: center.x - radius,
            y: center.y - radius * 0.9,
            width: radius * 2,
            height: radius * 1.8
        )

        path.append(UIBezierPath(ovalIn: brainRect))

        // Draw outline
        context.setStrokeColor(UIColor.systemGray.cgColor)
        context.setLineWidth(2.5)
        context.addPath(path.cgPath)
        context.strokePath()

        // Add subtle midline
        context.setStrokeColor(UIColor.systemGray.withAlphaComponent(0.3).cgColor)
        context.setLineWidth(1.5)
        context.move(to: CGPoint(x: center.x, y: brainRect.minY))
        context.addLine(to: CGPoint(x: center.x, y: brainRect.maxY))
        context.strokePath()
    }

    // MARK: - Hemorrhage Visualization

    private func drawHemorrhage(in context: CGContext, rect: CGRect) {
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = min(rect.width, rect.height) * 0.45

        // Calculate hemorrhage area (scaled to brain size)
        // Max volume displayed is 100ml (fills about 80% of brain)
        let fillRatio = min(volume.estimatedML / 100.0, 0.8)
        let hemorrhageRadius = radius * CGFloat(fillRatio) * animationProgress

        // Position in basal ganglia region (slightly to the right and up)
        let hemorrhageCenter = CGPoint(
            x: center.x + radius * 0.2,
            y: center.y - radius * 0.1
        )

        // Create clipping path for hemorrhage
        let hemorrhagePath = UIBezierPath()

        // Draw with wave animation for "fluid" effect
        let waveHeight: CGFloat = 3.0
        let segments = 60

        for i in 0...segments {
            let angle = (CGFloat(i) / CGFloat(segments)) * 2 * .pi
            let baseRadius = hemorrhageRadius

            // Add wave effect
            let wave = sin(angle * 3 + phase) * waveHeight
            let waveRadius = baseRadius + wave

            let x = hemorrhageCenter.x + cos(angle) * waveRadius
            let y = hemorrhageCenter.y + sin(angle) * waveRadius

            if i == 0 {
                hemorrhagePath.move(to: CGPoint(x: x, y: y))
            } else {
                hemorrhagePath.addLine(to: CGPoint(x: x, y: y))
            }
        }
        hemorrhagePath.close()

        // Fill with blood color based on severity
        let bloodColor: UIColor = {
            switch volume.severity {
            case .small:
                return UIColor.systemRed.withAlphaComponent(0.4)
            case .moderate:
                return UIColor.systemRed.withAlphaComponent(0.6)
            case .large:
                return UIColor.systemRed.withAlphaComponent(0.75)
            case .critical:
                return UIColor.systemRed.withAlphaComponent(0.9)
            }
        }()

        context.setFillColor(bloodColor.cgColor)
        context.addPath(hemorrhagePath.cgPath)
        context.fillPath()

        // Add subtle gradient overlay
        if hemorrhageRadius > 20 {
            let gradient = CGGradient(
                colorsSpace: CGColorSpaceCreateDeviceRGB(),
                colors: [
                    UIColor.systemRed.withAlphaComponent(0.3).cgColor,
                    bloodColor.cgColor
                ] as CFArray,
                locations: [0.0, 1.0]
            )!

            context.saveGState()
            context.addPath(hemorrhagePath.cgPath)
            context.clip()
            context.drawRadialGradient(
                gradient,
                startCenter: hemorrhageCenter,
                startRadius: 0,
                endCenter: hemorrhageCenter,
                endRadius: hemorrhageRadius,
                options: []
            )
            context.restoreGState()
        }

        // Add pulsing border
        context.setStrokeColor(UIColor.systemRed.cgColor)
        context.setLineWidth(1.5)
        let pulseAlpha = 0.5 + 0.5 * sin(phase * 2)
        context.setAlpha(pulseAlpha)
        context.addPath(hemorrhagePath.cgPath)
        context.strokePath()
        context.setAlpha(1.0)
    }

    // MARK: - 30ml Reference Marker

    private func draw30mlMarker(in context: CGContext, rect: CGRect) {
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = min(rect.width, rect.height) * 0.45

        // Calculate what 30ml looks like
        let referenceRatio = min(30.0 / 100.0, 0.8)
        let referenceRadius = radius * CGFloat(referenceRatio)

        let hemorrhageCenter = CGPoint(
            x: center.x + radius * 0.2,
            y: center.y - radius * 0.1
        )

        // Only show if current volume is less than 30ml
        if volume.estimatedML < 30 {
            context.setStrokeColor(UIColor.systemOrange.withAlphaComponent(0.5).cgColor)
            context.setLineWidth(1.5)
            context.setLineDash(phase: phase, lengths: [4, 4])

            context.addArc(
                center: hemorrhageCenter,
                radius: referenceRadius,
                startAngle: 0,
                endAngle: 2 * .pi,
                clockwise: true
            )
            context.strokePath()

            context.setLineDash(phase: 0, lengths: [])
        }
    }

    // MARK: - Volume Label

    private func drawVolumeLabel(in context: CGContext, rect: CGRect) {
        let volumeText = String(format: "%.1f mL", volume.estimatedML)

        let attributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 16, weight: .semibold),
            .foregroundColor: UIColor.label
        ]

        let textSize = volumeText.size(withAttributes: attributes)
        let textRect = CGRect(
            x: rect.midX - textSize.width / 2,
            y: rect.maxY - textSize.height - 5,
            width: textSize.width,
            height: textSize.height
        )

        volumeText.draw(in: textRect, withAttributes: attributes)

        // Draw severity label
        let severityText = volume.severity.displayName
        let severityAttributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 12, weight: .regular),
            .foregroundColor: UIColor.secondaryLabel
        ]

        let severitySize = severityText.size(withAttributes: severityAttributes)
        let severityRect = CGRect(
            x: rect.midX - severitySize.width / 2,
            y: textRect.maxY + 2,
            width: severitySize.width,
            height: severitySize.height
        )

        severityText.draw(in: severityRect, withAttributes: severityAttributes)
    }

    // MARK: - Update

    func updateVolume(_ newVolume: ICHVolume) {
        self.volume = newVolume
        self.animationProgress = 0  // Restart animation
        setNeedsDisplay()
    }

    // MARK: - Cleanup

    deinit {
        displayLink?.invalidate()
    }
}

// MARK: - Preview

#Preview {
    VStack(spacing: 20) {
        BrainVisualizationView(
            volume: ICHVolume(
                estimatedML: 15.0,
                mortalityRange: "10-19%",
                severity: .moderate
            )
        )
        .frame(height: 200)
        .padding()

        BrainVisualizationView(
            volume: ICHVolume(
                estimatedML: 45.0,
                mortalityRange: "19-44%",
                severity: .critical
            )
        )
        .frame(height: 200)
        .padding()
    }
}
