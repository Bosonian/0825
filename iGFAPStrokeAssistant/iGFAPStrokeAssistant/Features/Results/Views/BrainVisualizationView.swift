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
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func didMoveToWindow() {
        super.didMoveToWindow()

        if window != nil {
            // Start animation when view is added to window
            setupAnimation()
        } else {
            // Stop animation when view is removed from window
            displayLink?.invalidate()
            displayLink = nil
        }
    }

    // MARK: - Animation Setup

    private func setupAnimation() {
        // Don't create duplicate displayLinks
        guard displayLink == nil else { return }

        displayLink = CADisplayLink(target: self, selector: #selector(animate))
        displayLink?.add(to: .main, forMode: .common)
    }

    @objc private func animate() {
        phase += 0.5  // Ocean-like wave speed - fast and fluid

        // Smooth fill animation on first render
        if animationProgress < 1.0 {
            animationProgress += 0.02
        }

        setNeedsDisplay()
    }

    // MARK: - Drawing

    override func draw(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }

        // Calculate circle dimensions (no padding to match RiskRingView)
        let size = min(rect.width, rect.height)
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = size / 2

        // Draw background circle
        drawBackgroundCircle(in: context, center: center, radius: radius)

        // Draw liquid fill if volume > 0
        if volume.estimatedML > 0 {
            drawLiquidFill(in: context, center: center, radius: radius)
        }

        // Draw volume text
        drawVolumeText(in: context, center: center)
    }

    // MARK: - Background Circle

    private func drawBackgroundCircle(in context: CGContext, center: CGPoint, radius: CGFloat) {
        // Draw background ring (matching RiskRingView style)
        context.setStrokeColor(UIColor.systemGray.withAlphaComponent(0.2).cgColor)
        context.setLineWidth(10.0)
        context.setLineCap(.round)
        context.addArc(
            center: center,
            radius: radius,
            startAngle: 0,
            endAngle: 2 * .pi,
            clockwise: true
        )
        context.strokePath()
    }

    // MARK: - Liquid Fill

    private func drawLiquidFill(in context: CGContext, center: CGPoint, radius: CGFloat) {
        // Calculate fill percentage (max at 80ml like baseline)
        let maxVolume: CGFloat = 80.0
        let fillPercent = min(volume.estimatedML / maxVolume, 0.9) * animationProgress

        // Calculate fill height
        let fillHeight = fillPercent * (radius * 1.8)
        let baseLevel = center.y + radius - 4 - fillHeight

        // Clip to circle
        context.saveGState()
        context.addArc(
            center: center,
            radius: radius - 4,
            startAngle: 0,
            endAngle: 2 * .pi,
            clockwise: true
        )
        context.clip()

        // Draw base fluid rectangle
        context.setFillColor(UIColor.systemRed.withAlphaComponent(0.7).cgColor)
        context.fill(CGRect(x: 0, y: baseLevel + 5, width: radius * 2 + 10, height: radius * 2 + 10))

        // Draw animated wave surface using dual-wave system (baseline formula)
        let wavePath = UIBezierPath()
        let startX = center.x - radius + 4

        wavePath.move(to: CGPoint(x: startX, y: baseLevel))

        // Create smooth wave with dual sine waves
        var x = startX
        while x <= center.x + radius - 4 {
            // Dual-wave formula from baseline for elegant motion
            let waveOffset1 = sin((x * 0.05) + phase * 0.08) * 3.0
            let waveOffset2 = sin((x * 0.08) + phase * 0.12 + 1.0) * 2.0
            let y = baseLevel + waveOffset1 + waveOffset2

            wavePath.addLine(to: CGPoint(x: x, y: y))
            x += 2 // 2-pixel increments for smooth curve
        }

        // Complete wave fill
        wavePath.addLine(to: CGPoint(x: center.x + radius - 4, y: center.y + radius + 10))
        wavePath.addLine(to: CGPoint(x: startX, y: center.y + radius + 10))
        wavePath.close()

        context.setFillColor(UIColor.systemRed.withAlphaComponent(0.9).cgColor)
        context.addPath(wavePath.cgPath)
        context.fillPath()

        context.restoreGState()

        // Draw volume progress ring (matching RiskRingView style)
        let volumePercent = min(volume.estimatedML / 100.0, 1.0)

        // Progress ring (red) - matching risk ring styling
        context.setStrokeColor(UIColor.systemRed.cgColor)
        context.setLineWidth(10.0)
        context.setLineCap(.round)
        context.beginPath()
        context.addArc(
            center: center,
            radius: radius,
            startAngle: -.pi / 2, // Start at top
            endAngle: -.pi / 2 + (CGFloat(volumePercent) * 2 * .pi),
            clockwise: false
        )
        context.strokePath()
    }

    // MARK: - Volume Text

    private func drawVolumeText(in context: CGContext, center: CGPoint) {
        let volumeText = String(format: "%.0f\nml", volume.estimatedML)

        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = .center

        let attributes: [NSAttributedString.Key: Any] = [
            .font: UIFont.systemFont(ofSize: 32, weight: .bold),
            .foregroundColor: UIColor.label,
            .paragraphStyle: paragraphStyle
        ]

        let textSize = volumeText.size(withAttributes: attributes)
        let textRect = CGRect(
            x: center.x - textSize.width / 2,
            y: center.y - textSize.height / 2,
            width: textSize.width,
            height: textSize.height
        )

        volumeText.draw(in: textRect, withAttributes: attributes)
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
