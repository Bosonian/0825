# iOS Native App Development Plan
## iGFAP Stroke Triage Assistant

**Version:** 1.0
**Date:** 2025-10-22
**Author:** Development Team
**Target Platform:** iOS 16.0+

---

## Executive Summary

This document outlines the comprehensive plan to develop a native iOS application for the iGFAP Stroke Triage Assistant, currently implemented as a Progressive Web App (PWA). The iOS app will maintain feature parity with the PWA while leveraging native iOS capabilities for enhanced performance, better user experience, and offline functionality.

**Key Objectives:**
- Native iOS performance and user experience
- Full feature parity with PWA
- Enhanced offline capabilities
- iOS-specific integrations (HealthKit, Core Location, etc.)
- Medical device compliance pathway (future CE/FDA approval)

---

## 1. Architecture & Technology Stack

### 1.1 Core Technology Decisions

#### **Primary Framework: SwiftUI + Combine**
- **SwiftUI** for declarative UI (iOS 16+)
- **Combine** for reactive state management
- **Swift 5.9+** with strict concurrency checking
- **Async/await** for network operations

**Rationale:**
- Modern, declarative approach similar to PWA's component model
- Better performance than UIKit for complex animations
- Future-proof (Apple's recommended path)
- Easier testing and preview capabilities

#### **Alternative Consideration: UIKit + MVVM**
For maximum control over medical UI components:
- Custom UIKit components for precision medical visualizations
- Traditional MVVM architecture
- More granular control over rendering

**Recommendation:** Start with SwiftUI, fall back to UIKit for specific complex visualizations (probability rings, brain visualization)

### 1.2 Key iOS Frameworks

| Framework | Purpose | Priority |
|-----------|---------|----------|
| **SwiftUI** | UI Layer | Critical |
| **Combine** | State Management | Critical |
| **Foundation** | Core utilities | Critical |
| **CoreData** | Local persistence | High |
| **URLSession** | API networking | Critical |
| **CoreLocation** | GPS for stroke centers | High |
| **MapKit** | Hospital routing | High |
| **HealthKit** | Health data integration (future) | Medium |
| **CryptoKit** | Data encryption | High |
| **Charts** | Native visualizations (iOS 16+) | High |
| **CoreGraphics** | Custom visualizations | High |
| **Security** | Keychain, secure storage | Critical |
| **LocalAuthentication** | Biometric auth | Medium |

### 1.3 Architecture Pattern

**Clean Architecture + MVVM**

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  ┌──────────────────────────────────┐  │
│  │  SwiftUI Views                   │  │
│  │  - WelcomeView                   │  │
│  │  - TriageView                    │  │
│  │  - DataInputView (Coma/Ltd/Full)│  │
│  │  - ResultsView                   │  │
│  └──────────────────────────────────┘  │
│                   ↕                      │
│  ┌──────────────────────────────────┐  │
│  │  ViewModels (ObservableObject)   │  │
│  │  - WelcomeViewModel              │  │
│  │  - TriageViewModel               │  │
│  │  - AssessmentViewModel           │  │
│  │  - ResultsViewModel              │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
                   ↕
┌─────────────────────────────────────────┐
│         Domain Layer                    │
│  ┌──────────────────────────────────┐  │
│  │  Use Cases                       │  │
│  │  - PredictICHUseCase             │  │
│  │  - PredictLVOUseCase             │  │
│  │  - CalculateVolumeUseCase        │  │
│  │  - FindStrokeCentersUseCase      │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Domain Models                   │  │
│  │  - Patient                       │  │
│  │  - Assessment                    │  │
│  │  - ICHPrediction                 │  │
│  │  - LVOPrediction                 │  │
│  │  - StrokeCenter                  │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
                   ↕
┌─────────────────────────────────────────┐
│         Data Layer                      │
│  ┌──────────────────────────────────┐  │
│  │  Repositories (Protocol)         │  │
│  │  - PredictionRepository          │  │
│  │  - PatientDataRepository         │  │
│  │  - StrokeCenterRepository        │  │
│  └──────────────────────────────────┘  │
│                   ↕                      │
│  ┌──────────────────────────────────┐  │
│  │  Data Sources                    │  │
│  │  - RemoteAPI (URLSession)        │  │
│  │  - LocalStorage (CoreData)       │  │
│  │  - SecureStorage (Keychain)      │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 2. Feature Mapping: PWA → iOS

### 2.1 Core Screens

| PWA Screen | iOS Equivalent | Implementation Details |
|------------|----------------|------------------------|
| **Login** | `LoginView` | - Biometric auth option<br>- Keychain password storage<br>- Session management |
| **Triage1** | `TriageComaView` | - Single binary choice (GCS < 8)<br>- Info modal for GCS |
| **Triage2** | `TriageExamView` | - Binary choice (can examine)<br>- Prerequisites modal |
| **Coma Module** | `ComaAssessmentView` | - GFAP input only<br>- Numeric keyboard<br>- Real-time validation |
| **Limited Module** | `LimitedAssessmentView` | - 5 input fields<br>- Custom numeric inputs<br>- Toggle for vigilance |
| **Full Module** | `FullAssessmentView` | - Comprehensive form<br>- FAST-ED calculator modal<br>- Multiple sections |
| **Results** | `ResultsView` | - Animated risk rings<br>- Brain visualization<br>- SHAP drivers<br>- PDF export |

### 2.2 Feature Parity Matrix

| Feature | PWA | iOS Plan | Notes |
|---------|-----|----------|-------|
| **Authentication** | Password | Password + Biometric | FaceID/TouchID |
| **Dark Mode** | CSS Variables | iOS System Theme | Auto-detect |
| **i18n (EN/DE)** | Custom i18n | `Localizable.strings` | SwiftUI native |
| **Risk Visualizations** | Canvas/SVG | SwiftUI Charts + CoreGraphics | Custom animations |
| **Brain Visualization** | SVG | CoreGraphics custom view | Pixel-perfect |
| **FAST-ED Calculator** | Modal | Bottom sheet | Native iOS feel |
| **Stroke Center Map** | Custom Map | MapKit | Better integration |
| **GPS Location** | Web API | CoreLocation | Native, more accurate |
| **PDF Export** | Print API | PDFKit | Native rendering |
| **Offline Mode** | Service Worker | CoreData + URLCache | Better reliability |
| **API Warmup** | Fetch on load | URLSession pre-warming | Background tasks |
| **Session Management** | localStorage | UserDefaults + Keychain | More secure |
| **SHAP Drivers** | HTML bars | SwiftUI custom views | Animated bars |
| **Research Mode** | Hidden toggle | Conditional compilation | Debug builds only |

### 2.3 iOS-Specific Enhancements

#### **New Features Not in PWA**

1. **HealthKit Integration** (Future Phase)
   - Read blood pressure from Health app
   - Read age from health profile
   - Store assessment results (with consent)

2. **Siri Shortcuts** (Future Phase)
   - "Start stroke assessment"
   - "Find nearest stroke center"

3. **Haptic Feedback**
   - Critical alerts (ICH > 70%)
   - Form validation errors
   - Navigation confirmations

4. **Background Refresh**
   - Pre-warm API endpoints
   - Update stroke center database

5. **Widget** (Future Phase)
   - Quick access to start assessment
   - Recent assessment summary

6. **Push Notifications** (Future Phase)
   - Research updates
   - Important medical alerts

---

## 3. Data Models & State Management

### 3.1 Core Domain Models

```swift
// MARK: - Patient Data
struct PatientData: Codable, Equatable {
    let id: UUID
    let timestamp: Date

    // Demographics
    var ageYears: Int?

    // Vitals
    var systolicBP: Int?
    var diastolicBP: Int?

    // Biomarkers
    var gfapValue: Double?

    // Neurological
    var fastEdScore: Int?
    var gcs: Int?

    // Symptoms (booleans)
    var headache: Bool
    var vigilanceReduction: Bool
    var armParesis: Bool
    var legParesis: Bool
    var eyeDeviation: Bool

    // Medical History
    var atrialFibrillation: Bool
    var anticoagulated: Bool
    var antiplatelets: Bool
}

// MARK: - Assessment Models
enum AssessmentModule: String, Codable {
    case coma = "Coma"
    case limited = "Limited"
    case full = "Full"
}

struct Assessment: Identifiable, Codable {
    let id: UUID
    let timestamp: Date
    let module: AssessmentModule
    let patientData: PatientData
    var results: AssessmentResults?
}

// MARK: - Prediction Results
struct ICHPrediction: Codable, Equatable {
    let probability: Double // 0.0 - 1.0
    let drivers: [RiskDriver]
    let confidence: Double
    let volume: ICHVolume?
}

struct LVOPrediction: Codable, Equatable {
    let probability: Double
    let drivers: [RiskDriver]
    let confidence: Double
}

struct AssessmentResults: Codable {
    let ich: ICHPrediction
    let lvo: LVOPrediction?
    let module: AssessmentModule
    let processedAt: Date
}

// MARK: - Risk Drivers (SHAP)
struct RiskDriver: Codable, Equatable, Identifiable {
    let id = UUID()
    let name: String
    let displayName: String
    let weight: Double // Signed: positive increases risk
    let category: DriverCategory

    enum DriverCategory: String, Codable {
        case demographic
        case vital
        case biomarker
        case neurological
        case history
    }
}

// MARK: - ICH Volume
struct ICHVolume: Codable, Equatable {
    let estimatedML: Double
    let mortalityRange: String
    let severity: Severity

    enum Severity: String, Codable {
        case small      // < 10ml
        case moderate   // 10-20ml
        case large      // 20-30ml
        case critical   // >= 30ml
    }
}

// MARK: - Stroke Centers
struct StrokeCenter: Identifiable, Codable {
    let id: UUID
    let name: String
    let type: CenterType
    let address: String
    let city: String
    let country: String
    let latitude: Double
    let longitude: Double
    let phoneNumber: String?
    let capabilities: [String]

    enum CenterType: String, Codable {
        case primary = "Primary"
        case comprehensive = "Comprehensive"
    }
}
```

### 3.2 State Management Strategy

**Single Source of Truth: AppState**

```swift
@MainActor
class AppState: ObservableObject {
    // MARK: - Navigation
    @Published var currentScreen: Screen = .login
    @Published var navigationPath: [Screen] = []

    // MARK: - Session
    @Published var isAuthenticated: Bool = false
    @Published var sessionToken: String?
    @Published var sessionExpiry: Date?

    // MARK: - Assessment Data
    @Published var currentAssessment: Assessment?
    @Published var assessmentHistory: [Assessment] = []

    // MARK: - UI State
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?
    @Published var selectedModule: AssessmentModule?

    // MARK: - Preferences
    @Published var isDarkMode: Bool = false
    @Published var currentLanguage: Language = .english

    // MARK: - Location
    @Published var userLocation: CLLocation?
    @Published var nearbyStrokeCenters: [StrokeCenter] = []

    // Dependencies (injected)
    private let predictionService: PredictionServiceProtocol
    private let authService: AuthenticationServiceProtocol
    private let storageService: StorageServiceProtocol

    // ... methods
}

enum Screen: Hashable {
    case login
    case triageComa
    case triageExam
    case comaAssessment
    case limitedAssessment
    case fullAssessment
    case results(Assessment)
}
```

---

## 4. API Integration Layer

### 4.1 Network Service Architecture

```swift
// MARK: - Protocol
protocol PredictionServiceProtocol {
    func predictComaICH(gfap: Double) async throws -> ICHPrediction
    func predictLimitedICH(_ data: PatientData) async throws -> ICHPrediction
    func predictFullStroke(_ data: PatientData) async throws -> AssessmentResults
}

// MARK: - Implementation
actor PredictionService: PredictionServiceProtocol {
    private let session: URLSession
    private let baseURL: URL
    private let decoder = JSONDecoder()
    private let encoder = JSONEncoder()

    init(configuration: APIConfiguration) {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 20.0
        config.timeoutIntervalForResource = 60.0
        config.waitsForConnectivity = true
        self.session = URLSession(configuration: config)
        self.baseURL = configuration.baseURL
    }

    func predictComaICH(gfap: Double) async throws -> ICHPrediction {
        let endpoint = baseURL.appendingPathComponent("predict_coma_ich")
        let request = try buildRequest(
            url: endpoint,
            method: "POST",
            body: ["gfap_value": gfap]
        )

        let (data, response) = try await session.data(for: request)
        try validateResponse(response)

        let apiResponse = try decoder.decode(ICHAPIResponse.self, from: data)
        return apiResponse.toDomain()
    }

    // ... other methods
}

// MARK: - API Models (separate from domain)
struct ICHAPIResponse: Codable {
    let probability: Double
    let ich_probability: Double
    let drivers: [String: Double]
    let confidence: Double

    func toDomain() -> ICHPrediction {
        // Transform API model to domain model
        let driverList = drivers.map { key, value in
            RiskDriver(
                name: key,
                displayName: formatDriverName(key),
                weight: value,
                category: categorizeDriver(key)
            )
        }

        return ICHPrediction(
            probability: probability,
            drivers: driverList.sorted { abs($0.weight) > abs($1.weight) },
            confidence: confidence,
            volume: nil // Calculated separately
        )
    }
}
```

### 4.2 API Endpoints Configuration

```swift
struct APIConfiguration {
    let baseURL: URL
    let endpoints: Endpoints

    struct Endpoints {
        let comaICH = "predict_coma_ich"
        let limitedICH = "predict_limited_data_ich"
        let fullStroke = "predict_full_stroke"
        let lvo = "predict_lvo"
        let authenticate = "authenticate-research-access"
    }

    static var production: APIConfiguration {
        APIConfiguration(
            baseURL: URL(string: "https://europe-west3-igfap-452720.cloudfunctions.net")!,
            endpoints: Endpoints()
        )
    }

    static var development: APIConfiguration {
        // Use mock server or localhost proxy
        APIConfiguration(
            baseURL: URL(string: "http://localhost:8080/api")!,
            endpoints: Endpoints()
        )
    }
}
```

### 4.3 Error Handling

```swift
enum APIError: LocalizedError {
    case networkUnavailable
    case invalidRequest(String)
    case serverError(Int, String)
    case decodingError(Error)
    case timeout
    case unauthorized
    case validationError(String)

    var errorDescription: String? {
        switch self {
        case .networkUnavailable:
            return NSLocalizedString("network_unavailable", comment: "")
        case .invalidRequest(let msg):
            return NSLocalizedString("invalid_request", comment: "") + ": \(msg)"
        case .serverError(let code, let msg):
            return "Server error \(code): \(msg)"
        case .decodingError(let error):
            return "Data parsing error: \(error.localizedDescription)"
        case .timeout:
            return NSLocalizedString("request_timeout", comment: "")
        case .unauthorized:
            return NSLocalizedString("unauthorized", comment: "")
        case .validationError(let msg):
            return msg
        }
    }
}
```

---

## 5. Medical Calculations & Algorithms

### 5.1 ICH Volume Calculator

Port from `src/logic/ich-volume-calculator.js`:

```swift
struct ICHVolumeCalculator {
    // Log-log regression model coefficients
    private static let intercept = 0.0192
    private static let coefficient = 0.4533

    /// Calculate ICH volume from GFAP value
    /// Formula: log10(Volume) = 0.0192 + 0.4533 × log10(GFAP)
    static func estimateVolume(fromGFAP gfap: Double) -> ICHVolume {
        guard gfap > 0 else {
            return ICHVolume(estimatedML: 0, mortalityRange: "N/A", severity: .small)
        }

        let logGFAP = log10(gfap)
        let logVolume = intercept + coefficient * logGFAP
        let volumeML = pow(10.0, logVolume)

        let severity = determineSeverity(volumeML)
        let mortality = estimateMortality(volumeML)

        return ICHVolume(
            estimatedML: volumeML,
            mortalityRange: mortality,
            severity: severity
        )
    }

    private static func determineSeverity(_ volumeML: Double) -> ICHVolume.Severity {
        switch volumeML {
        case ..<10: return .small
        case 10..<20: return .moderate
        case 20..<30: return .large
        default: return .critical
        }
    }

    private static func estimateMortality(_ volumeML: Double) -> String {
        switch volumeML {
        case ..<10: return "5-10%"
        case 10..<30: return "10-19%"
        case 30..<50: return "19-44%"
        case 50..<60: return "44-91%"
        default: return "91-100%"
        }
    }
}
```

### 5.2 LVO Model

Port from `src/lib/lvoModel.js`:

```swift
struct LVOModel {
    // Model parameters (scientifically calibrated)
    private static let lambda = -0.825559  // Yeo-Johnson lambda
    private static let b0 = -0.408314      // Intercept
    private static let bGFAP = -0.826450   // GFAP coefficient
    private static let bFAST = 1.651521    // FAST-ED coefficient

    // Standardization parameters
    private static let muG = 0.0
    private static let sigG = 1.0
    private static let muF = 3.701422
    private static let sigF = 2.306173

    // Platt scaling
    private static let aPlatt = 1.117420
    private static let bPlatt = -1.032167

    private static let threshold = 0.333333

    /// Calculate LVO probability
    static func probability(gfap: Double, fastED: Int) -> Double {
        // Yeo-Johnson transformation
        let gfapTransformed = yeoJohnson(gfap, lambda: lambda)

        // Standardization
        let gfapStandardized = (gfapTransformed - muG) / sigG
        let fastStandardized = (Double(fastED) - muF) / sigF

        // Logistic regression
        let logit = b0 + bGFAP * gfapStandardized + bFAST * fastStandardized

        // Platt calibration
        let calibratedLogit = aPlatt * logit + bPlatt

        // Sigmoid
        return 1.0 / (1.0 + exp(-calibratedLogit))
    }

    private static func yeoJohnson(_ x: Double, lambda: Double) -> Double {
        if abs(lambda) < 1e-15 {
            return log(x + 1.0)
        }
        return (pow(x + 1.0, lambda) - 1.0) / lambda
    }
}
```

---

## 6. UI Components & Visualizations

### 6.1 Risk Ring Visualization

Custom SwiftUI component replicating Canvas-based rings:

```swift
struct RiskRingView: View {
    let percentage: Double
    let riskType: RiskType

    @State private var animatedPercentage: Double = 0

    enum RiskType {
        case ich, lvo

        var icon: String {
            switch self {
            case .ich: return "🩸"
            case .lvo: return "🧠"
            }
        }

        var title: LocalizedStringKey {
            switch self {
            case .ich: return "ICH Risk"
            case .lvo: return "LVO Risk"
            }
        }
    }

    var riskLevel: RiskLevel {
        switch percentage {
        case 0..<25: return .low
        case 25..<50: return .medium
        case 50..<70: return .high
        default: return .critical
        }
    }

    var ringColor: Color {
        switch riskLevel {
        case .low: return .blue
        case .medium: return .orange
        case .high: return .red
        case .critical: return .red
        }
    }

    var body: some View {
        VStack(spacing: 12) {
            ZStack {
                // Background circle
                Circle()
                    .stroke(Color.gray.opacity(0.2), lineWidth: 12)
                    .frame(width: 120, height: 120)

                // Progress circle
                Circle()
                    .trim(from: 0, to: animatedPercentage / 100)
                    .stroke(
                        ringColor,
                        style: StrokeStyle(lineWidth: 12, lineCap: .round)
                    )
                    .frame(width: 120, height: 120)
                    .rotationEffect(.degrees(-90))
                    .animation(.spring(duration: 1.0), value: animatedPercentage)

                // Percentage text
                VStack(spacing: 4) {
                    Text("\(Int(animatedPercentage))%")
                        .font(.system(size: 28, weight: .bold, design: .rounded))
                        .foregroundColor(.primary)
                }
            }

            Text(riskType.title)
                .font(.caption)
                .foregroundColor(.secondary)

            Text(riskLevel.description)
                .font(.caption2)
                .foregroundColor(ringColor)
                .fontWeight(.semibold)
        }
        .onAppear {
            withAnimation {
                animatedPercentage = percentage
            }
        }
    }
}

enum RiskLevel {
    case low, medium, high, critical

    var description: LocalizedStringKey {
        switch self {
        case .low: return "Low Risk"
        case .medium: return "Medium Risk"
        case .high: return "High Risk"
        case .critical: return "Very High Risk"
        }
    }
}
```

### 6.2 Brain Visualization

Custom CoreGraphics view for ICH volume display:

```swift
struct BrainVisualizationView: UIViewRepresentable {
    let volume: ICHVolume

    func makeUIView(context: Context) -> BrainCanvasView {
        BrainCanvasView(volume: volume)
    }

    func updateUIView(_ uiView: BrainCanvasView, context: Context) {
        uiView.updateVolume(volume)
    }
}

class BrainCanvasView: UIView {
    private var volume: ICHVolume
    private var displayLink: CADisplayLink?
    private var phase: CGFloat = 0

    init(volume: ICHVolume) {
        self.volume = volume
        super.init(frame: .zero)
        backgroundColor = .clear
        setupAnimation()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupAnimation() {
        displayLink = CADisplayLink(target: self, selector: #selector(animate))
        displayLink?.add(to: .main, forMode: .common)
    }

    @objc private func animate() {
        phase += 0.02
        setNeedsDisplay()
    }

    override func draw(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }

        // Draw brain outline (simplified)
        let brainPath = createBrainPath(in: rect)
        context.setStrokeColor(UIColor.systemGray.cgColor)
        context.setLineWidth(2.0)
        context.addPath(brainPath)
        context.strokePath()

        // Draw hemorrhage with wave animation
        if volume.estimatedML > 0 {
            let fillHeight = CGFloat(min(volume.estimatedML / 100.0, 1.0))
            drawAnimatedBlood(in: context, rect: rect, fillHeight: fillHeight)
        }
    }

    private func createBrainPath(in rect: CGRect) -> CGPath {
        let path = UIBezierPath()
        // Simplified brain outline
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = min(rect.width, rect.height) * 0.4

        path.addArc(
            withCenter: center,
            radius: radius,
            startAngle: 0,
            endAngle: .pi * 2,
            clockwise: true
        )

        return path.cgPath
    }

    private func drawAnimatedBlood(in context: CGContext, rect: CGRect, fillHeight: CGFloat) {
        // Animated wave effect (similar to PWA)
        let waveHeight: CGFloat = 5.0
        let wavelength: CGFloat = 30.0

        let baseLine = rect.maxY - (rect.height * fillHeight)

        let path = UIBezierPath()
        path.move(to: CGPoint(x: rect.minX, y: baseLine))

        for x in stride(from: rect.minX, through: rect.maxX, by: 1.0) {
            let relativeX = x - rect.minX
            let sine = sin((relativeX / wavelength) * .pi * 2 + phase)
            let y = baseLine + sine * waveHeight
            path.addLine(to: CGPoint(x: x, y: y))
        }

        path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
        path.close()

        context.setFillColor(UIColor.systemRed.withAlphaComponent(0.6).cgColor)
        context.addPath(path.cgPath)
        context.fillPath()
    }

    func updateVolume(_ newVolume: ICHVolume) {
        self.volume = newVolume
        setNeedsDisplay()
    }

    deinit {
        displayLink?.invalidate()
    }
}
```

### 6.3 SHAP Driver Bars

```swift
struct DriverBarView: View {
    let driver: RiskDriver
    let maxWeight: Double

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(driver.displayName)
                    .font(.caption)
                    .foregroundColor(.primary)

                Spacer()

                Text(String(format: "%.1f%%", abs(driver.weight * 100)))
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    // Background
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.gray.opacity(0.2))
                        .frame(height: 8)

                    // Progress bar
                    RoundedRectangle(cornerRadius: 4)
                        .fill(driver.weight > 0 ? Color.red : Color.blue)
                        .frame(
                            width: geometry.size.width * (abs(driver.weight) / maxWeight),
                            height: 8
                        )
                }
            }
            .frame(height: 8)
        }
        .padding(.vertical, 4)
    }
}
```

---

## 7. Compliance & Security

### 7.1 GDPR Compliance

```swift
class GDPRComplianceManager {
    // Data minimization - only collect essential fields
    func validateDataMinimization(_ data: PatientData) -> Bool {
        // Ensure only medically necessary data is collected
        return true
    }

    // Right to erasure
    func eraseAllUserData() async throws {
        try await storageService.deleteAllAssessments()
        try await storageService.deleteAllSessionData()
        try secureStorage.deleteAllKeys()
    }

    // Data export (right to portability)
    func exportUserData() async throws -> Data {
        let assessments = try await storageService.fetchAllAssessments()
        let jsonEncoder = JSONEncoder()
        jsonEncoder.dateEncodingStrategy = .iso8601
        jsonEncoder.outputFormatting = .prettyPrinted

        return try jsonEncoder.encode(assessments)
    }

    // Consent management
    func recordConsent(_ consent: ConsentType, granted: Bool) {
        UserDefaults.standard.set(granted, forKey: consent.rawValue)
        UserDefaults.standard.set(Date(), forKey: "\(consent.rawValue)_timestamp")
    }
}

enum ConsentType: String {
    case dataProcessing = "consent_data_processing"
    case dataSharing = "consent_data_sharing"
    case research = "consent_research"
}
```

### 7.2 Secure Storage

```swift
class SecureStorageService {
    private let keychain = KeychainSwift()

    func saveSessionToken(_ token: String) {
        keychain.set(token, forKey: "session_token", withAccess: .accessibleWhenUnlocked)
    }

    func getSessionToken() -> String? {
        keychain.get("session_token")
    }

    func deleteSessionToken() {
        keychain.delete("session_token")
    }

    // Encrypt sensitive patient data before CoreData storage
    func encryptPatientData(_ data: PatientData) throws -> Data {
        let jsonData = try JSONEncoder().encode(data)

        // Use CryptoKit for encryption
        let symmetricKey = SymmetricKey(size: .bits256)
        let sealedBox = try AES.GCM.seal(jsonData, using: symmetricKey)

        return sealedBox.combined ?? Data()
    }
}
```

### 7.3 Medical Device Compliance Preparation

```swift
// Audit logging for medical device requirements
class AuditLogger {
    func logAssessmentStarted(module: AssessmentModule) {
        let event = AuditEvent(
            timestamp: Date(),
            eventType: .assessmentStarted,
            details: ["module": module.rawValue],
            userId: getCurrentUserId()
        )

        persistAuditEvent(event)
    }

    func logPredictionMade(assessment: Assessment) {
        let event = AuditEvent(
            timestamp: Date(),
            eventType: .predictionGenerated,
            details: [
                "module": assessment.module.rawValue,
                "ich_probability": assessment.results?.ich.probability ?? 0,
                "lvo_probability": assessment.results?.lvo?.probability ?? 0
            ],
            userId: getCurrentUserId()
        )

        persistAuditEvent(event)
    }

    private func persistAuditEvent(_ event: AuditEvent) {
        // Store in CoreData with encryption
        // Export capability for regulatory review
    }
}

struct AuditEvent: Codable {
    let timestamp: Date
    let eventType: EventType
    let details: [String: Any]
    let userId: String

    enum EventType: String, Codable {
        case assessmentStarted
        case predictionGenerated
        case userLogin
        case dataExported
        case consentGiven
    }
}
```

---

## 8. Development Phases

### Phase 1: Foundation (Weeks 1-3)
**Goal:** Basic app structure and navigation

- [ ] Project setup (Xcode, SwiftUI, dependencies)
- [ ] Architecture implementation (MVVM + Clean)
- [ ] Navigation system (AppState + routing)
- [ ] Authentication screen (login + biometric)
- [ ] Theme system (dark/light mode)
- [ ] Localization setup (EN/DE)
- [ ] Basic API client (URLSession)
- [ ] Keychain integration
- [ ] Error handling framework

**Deliverable:** Working shell app with login and theme switching

### Phase 2: Core Assessment Flow (Weeks 4-7)
**Goal:** Complete triage and data input screens

- [ ] Triage1 screen (coma assessment)
- [ ] Triage2 screen (exam capability)
- [ ] Coma assessment form
- [ ] Limited assessment form
- [ ] Full assessment form
- [ ] FAST-ED calculator modal
- [ ] Form validation (medical rules)
- [ ] State persistence (CoreData)
- [ ] Navigation flow testing

**Deliverable:** Complete assessment data collection

### Phase 3: Medical Calculations (Weeks 8-9)
**Goal:** Port all medical algorithms

- [ ] ICH volume calculator
- [ ] LVO model implementation
- [ ] GFAP transformation functions
- [ ] Risk level categorization
- [ ] Mortality estimation
- [ ] SHAP driver parsing
- [ ] Unit tests for all calculations
- [ ] Validation against PWA outputs

**Deliverable:** Accurate medical calculations matching PWA

### Phase 4: API Integration (Weeks 10-11)
**Goal:** Connect to Google Cloud Functions

- [ ] Complete API service implementation
- [ ] Request/response models
- [ ] Error handling (network, timeout, server)
- [ ] API warmup on app launch
- [ ] Retry logic with exponential backoff
- [ ] Offline mode (cached responses)
- [ ] Integration tests
- [ ] Mock server for development

**Deliverable:** Reliable API communication

### Phase 5: Results & Visualizations (Weeks 12-15)
**Goal:** Rich results screen with all visualizations

- [ ] Results screen layout
- [ ] Risk ring animations (SwiftUI)
- [ ] Brain visualization (CoreGraphics)
- [ ] Volume display card
- [ ] SHAP driver bars
- [ ] Risk level indicators
- [ ] Tachometer gauge (if both ICH & LVO)
- [ ] Input summary section
- [ ] Differential diagnoses display
- [ ] Collapsible sections

**Deliverable:** Complete results visualization

### Phase 6: Stroke Center Routing (Weeks 16-17)
**Goal:** GPS and hospital navigation

- [ ] CoreLocation integration
- [ ] Location permission handling
- [ ] Stroke center database (embedded)
- [ ] MapKit integration
- [ ] Distance calculation
- [ ] Directions to hospital
- [ ] Filter by center type
- [ ] Manual location entry
- [ ] Testing across different locations

**Deliverable:** Working hospital finder

### Phase 7: Polish & Optimization (Weeks 18-19)
**Goal:** Production-ready quality

- [ ] Performance optimization
- [ ] Memory leak fixes
- [ ] Accessibility (VoiceOver, Dynamic Type)
- [ ] Haptic feedback
- [ ] Animation refinement
- [ ] Error message improvements
- [ ] Loading states
- [ ] Empty states
- [ ] PDF export functionality
- [ ] Print support

**Deliverable:** Polished, accessible app

### Phase 8: Testing & Validation (Weeks 20-21)
**Goal:** Comprehensive QA

- [ ] Unit test coverage (>80%)
- [ ] UI tests for critical flows
- [ ] Integration tests
- [ ] Medical accuracy validation
- [ ] Cross-device testing (iPhone, iPad)
- [ ] iOS version testing (16, 17, 18)
- [ ] Network condition testing
- [ ] Battery usage profiling
- [ ] Privacy audit
- [ ] GDPR compliance check

**Deliverable:** Stable, tested app

### Phase 9: Beta Testing (Weeks 22-24)
**Goal:** Real-world validation

- [ ] TestFlight setup
- [ ] Internal testing (team)
- [ ] Medical professional testing
- [ ] Feedback collection
- [ ] Bug fixes
- [ ] Performance tuning
- [ ] Documentation updates
- [ ] Analytics integration (privacy-preserving)

**Deliverable:** Beta-ready app

### Phase 10: App Store Preparation (Weeks 25-26)
**Goal:** App Store submission

- [ ] App Store assets (screenshots, icons)
- [ ] App preview video
- [ ] App Store description (EN/DE)
- [ ] Privacy policy update
- [ ] Terms of service
- [ ] Support page
- [ ] Regulatory disclaimers
- [ ] App Review preparation
- [ ] Submission
- [ ] Review feedback handling

**Deliverable:** App Store submission

---

## 9. Testing Strategy

### 9.1 Unit Tests

```swift
class ICHVolumeCalculatorTests: XCTestCase {
    func testVolumeCalculation() {
        // Test known GFAP → volume mappings
        let testCases: [(gfap: Double, expectedVolume: Double)] = [
            (100, 11.2),
            (500, 24.8),
            (1000, 35.1),
            (5000, 77.9)
        ]

        for (gfap, expected) in testCases {
            let result = ICHVolumeCalculator.estimateVolume(fromGFAP: gfap)
            XCTAssertEqual(result.estimatedML, expected, accuracy: 1.0)
        }
    }

    func testSeverityClassification() {
        let small = ICHVolumeCalculator.estimateVolume(fromGFAP: 50)
        XCTAssertEqual(small.severity, .small)

        let critical = ICHVolumeCalculator.estimateVolume(fromGFAP: 5000)
        XCTAssertEqual(critical.severity, .critical)
    }
}
```

### 9.2 Integration Tests

```swift
class PredictionServiceTests: XCTestCase {
    var service: PredictionService!

    override func setUp() async throws {
        service = PredictionService(configuration: .development)
    }

    func testComaICHPrediction() async throws {
        let result = try await service.predictComaICH(gfap: 500.0)

        XCTAssertGreaterThanOrEqual(result.probability, 0.0)
        XCTAssertLessThanOrEqual(result.probability, 1.0)
        XCTAssertFalse(result.drivers.isEmpty)
    }

    func testNetworkTimeout() async {
        // Configure short timeout
        let config = APIConfiguration.development
        let service = PredictionService(configuration: config)

        do {
            _ = try await service.predictComaICH(gfap: 100)
            XCTFail("Should have timed out")
        } catch let error as APIError {
            XCTAssertEqual(error, .timeout)
        }
    }
}
```

### 9.3 UI Tests

```swift
class AssessmentFlowUITests: XCTestCase {
    var app: XCUIApplication!

    override func setUp() {
        app = XCUIApplication()
        app.launch()
    }

    func testFullAssessmentFlow() {
        // Login
        app.textFields["Access Code"].tap()
        app.typeText("Neuro25")
        app.buttons["Login"].tap()

        // Triage
        app.buttons["No (GCS ≥ 8)"].tap()
        app.buttons["Yes"].tap()

        // Full assessment
        app.textFields["Age"].tap()
        app.typeText("65")

        app.textFields["GFAP"].tap()
        app.typeText("500")

        // ... fill remaining fields

        app.buttons["Calculate Risk"].tap()

        // Verify results appear
        XCTAssertTrue(app.staticTexts["ICH Risk"].exists)
        XCTAssertTrue(app.staticTexts["LVO Risk"].exists)
    }
}
```

---

## 10. Project Structure

```
iGFAPStrokeAssistant/
├── iGFAPStrokeAssistant/
│   ├── App/
│   │   ├── iGFAPStrokeAssistantApp.swift         # App entry point
│   │   └── AppState.swift                        # Global state
│   ├── Core/
│   │   ├── Domain/
│   │   │   ├── Models/
│   │   │   │   ├── Patient.swift
│   │   │   │   ├── Assessment.swift
│   │   │   │   ├── ICHPrediction.swift
│   │   │   │   ├── LVOPrediction.swift
│   │   │   │   ├── StrokeCenter.swift
│   │   │   │   └── RiskDriver.swift
│   │   │   ├── UseCases/
│   │   │   │   ├── PredictICHUseCase.swift
│   │   │   │   ├── PredictLVOUseCase.swift
│   │   │   │   ├── CalculateVolumeUseCase.swift
│   │   │   │   └── FindStrokeCentersUseCase.swift
│   │   │   └── Repositories/
│   │   │       ├── PredictionRepository.swift
│   │   │       ├── PatientDataRepository.swift
│   │   │       └── StrokeCenterRepository.swift
│   │   ├── Data/
│   │   │   ├── Network/
│   │   │   │   ├── PredictionService.swift
│   │   │   │   ├── APIConfiguration.swift
│   │   │   │   ├── APIModels.swift
│   │   │   │   └── APIError.swift
│   │   │   ├── Local/
│   │   │   │   ├── CoreDataStack.swift
│   │   │   │   ├── AssessmentEntity+CoreData.swift
│   │   │   │   └── SecureStorage.swift
│   │   │   └── Repositories/
│   │   │       └── (Concrete implementations)
│   │   └── Utilities/
│   │       ├── Extensions/
│   │       ├── Helpers/
│   │       └── Constants/
│   ├── Features/
│   │   ├── Authentication/
│   │   │   ├── Views/
│   │   │   │   └── LoginView.swift
│   │   │   ├── ViewModels/
│   │   │   │   └── LoginViewModel.swift
│   │   │   └── Services/
│   │   │       └── AuthenticationService.swift
│   │   ├── Triage/
│   │   │   ├── Views/
│   │   │   │   ├── TriageComaView.swift
│   │   │   │   └── TriageExamView.swift
│   │   │   └── ViewModels/
│   │   │       └── TriageViewModel.swift
│   │   ├── Assessment/
│   │   │   ├── Views/
│   │   │   │   ├── ComaAssessmentView.swift
│   │   │   │   ├── LimitedAssessmentView.swift
│   │   │   │   ├── FullAssessmentView.swift
│   │   │   │   └── FASTEDCalculatorView.swift
│   │   │   └── ViewModels/
│   │   │       └── AssessmentViewModel.swift
│   │   ├── Results/
│   │   │   ├── Views/
│   │   │   │   ├── ResultsView.swift
│   │   │   │   ├── RiskRingView.swift
│   │   │   │   ├── BrainVisualizationView.swift
│   │   │   │   ├── DriverBarsView.swift
│   │   │   │   └── VolumeCardView.swift
│   │   │   └── ViewModels/
│   │   │       └── ResultsViewModel.swift
│   │   └── StrokeCenters/
│   │       ├── Views/
│   │       │   ├── StrokeCenterMapView.swift
│   │       │   └── StrokeCenterListView.swift
│   │       └── ViewModels/
│   │           └── StrokeCenterViewModel.swift
│   ├── Medical/
│   │   ├── Calculators/
│   │   │   ├── ICHVolumeCalculator.swift
│   │   │   ├── LVOModel.swift
│   │   │   └── RiskLevelCalculator.swift
│   │   ├── Validators/
│   │   │   └── MedicalDataValidator.swift
│   │   └── Constants/
│   │       └── MedicalThresholds.swift
│   ├── Compliance/
│   │   ├── GDPRComplianceManager.swift
│   │   ├── AuditLogger.swift
│   │   └── ConsentManager.swift
│   ├── Resources/
│   │   ├── Assets.xcassets/
│   │   ├── Localizable.strings (en)
│   │   ├── Localizable.strings (de)
│   │   └── StrokeCenters.json
│   └── Info.plist
├── iGFAPStrokeAssistantTests/
│   ├── Unit/
│   │   ├── Calculators/
│   │   ├── Models/
│   │   └── Validators/
│   └── Integration/
│       ├── Network/
│       └── Repositories/
├── iGFAPStrokeAssistantUITests/
│   └── Flows/
│       ├── AssessmentFlowTests.swift
│       └── LoginFlowTests.swift
└── iGFAPStrokeAssistant.xcodeproj
```

---

## 11. Dependencies & Third-Party Libraries

### 11.1 Recommended CocoaPods/SPM

| Library | Purpose | Priority | License |
|---------|---------|----------|---------|
| **KeychainSwift** | Secure keychain access | High | MIT |
| **Alamofire** | Advanced networking (optional) | Medium | MIT |
| **Charts** (built-in iOS 16+) | Data visualization | High | Apple |
| **SwiftLint** | Code quality | Medium | MIT |

**Minimize dependencies for medical device compliance.**

### 11.2 Native-Only Approach (Recommended)

Use only Apple frameworks to:
- Reduce regulatory burden
- Improve App Store review process
- Eliminate third-party security concerns
- Easier medical device certification

---

## 12. Deployment & Distribution

### 12.1 App Store Listing

**App Name:** iGFAP Stroke Triage Assistant

**Subtitle:** Emergency Stroke Risk Assessment

**Description:**
```
Professional stroke triage tool for emergency medical services.

Features:
• AI-powered ICH (Intracerebral Hemorrhage) risk prediction
• LVO (Large Vessel Occlusion) assessment
• Three assessment modules for different clinical scenarios
• GFAP biomarker-based volume estimation
• SHAP explainability for clinical decisions
• Stroke center routing with GPS
• Bilingual support (English/German)
• Research-validated algorithms

IMPORTANT: This app is for research purposes only. Not approved for clinical use.
Always consult qualified medical professionals for patient care decisions.

Developed by the iGFAP Project Team.
```

**Keywords:**
stroke, medical, emergency, neurology, ICH, LVO, triage, GFAP, assessment

**Category:** Medical

**Age Rating:** 17+ (Medical/Treatment Information)

### 12.2 Privacy & Permissions

**Required Permissions:**
- Location Services (for stroke center routing)
- Network Access (for API predictions)

**Optional Permissions:**
- HealthKit (future: read BP, age)

**Privacy Labels:**
- Data Not Collected for this Version
- Future: Health & Fitness data with explicit consent

### 12.3 Regulatory Path

**Phase 1 (Current):** Research Tool
- Disclaimer: Not for clinical use
- Research access code required

**Phase 2 (Future):** Medical Device
- CE Mark application (Europe)
- FDA 510(k) clearance (US)
- Clinical validation studies
- Risk management documentation (ISO 14971)

---

## 13. Timeline & Resources

### 13.1 Estimated Timeline

**Total Duration:** 26 weeks (6.5 months)

- Phase 1-2: Foundation & Assessment (7 weeks)
- Phase 3-4: Calculations & API (4 weeks)
- Phase 5-6: Results & Routing (6 weeks)
- Phase 7-8: Polish & Testing (4 weeks)
- Phase 9-10: Beta & Submission (5 weeks)

### 13.2 Team Requirements

**Minimum Team:**
- 1 Senior iOS Developer (SwiftUI expert)
- 1 Backend Developer (maintain Cloud Functions)
- 1 Medical Advisor (validation)
- 1 QA Engineer (testing)
- 1 UI/UX Designer (part-time)

**Ideal Team:**
- 2 Senior iOS Developers
- 1 Backend Developer
- 1 Medical Advisor
- 2 QA Engineers
- 1 UI/UX Designer
- 1 Regulatory Consultant (for medical device path)

### 13.3 Budget Estimate

**Development:**
- iOS development: $80,000 - $120,000
- Backend maintenance: $10,000
- Design: $15,000 - $25,000
- QA & Testing: $20,000 - $30,000

**Infrastructure:**
- Apple Developer Program: $99/year
- TestFlight distribution: Included
- Cloud Functions (GCP): ~$200/month

**Regulatory (Future):**
- CE Mark: €15,000 - €50,000
- FDA 510(k): $75,000 - $200,000

**Total Phase 1:** $125,000 - $175,000

---

## 14. Risk Mitigation

### 14.1 Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **API latency** | High | Implement caching, offline mode, loading states |
| **Complex animations** | Medium | Profile early, optimize with Instruments |
| **Medical accuracy** | Critical | Extensive unit tests, validation against PWA |
| **Data privacy breach** | Critical | Security audit, penetration testing |
| **iOS version fragmentation** | Low | Target iOS 16+, test on multiple devices |

### 14.2 Regulatory Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Medical device classification** | High | Clear "research only" disclaimers initially |
| **GDPR non-compliance** | High | Legal review, privacy audit |
| **App Store rejection** | Medium | Follow guidelines, clear medical disclaimers |

### 14.3 Business Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Feature creep** | Medium | Strict MVP scope, phased releases |
| **Resource constraints** | High | Prioritize core features, defer nice-to-haves |
| **User adoption** | Medium | Beta testing with medical professionals |

---

## 15. Success Metrics

### 15.1 Development KPIs

- [ ] 100% feature parity with PWA
- [ ] <3 second API response time (p95)
- [ ] >80% unit test coverage
- [ ] Zero critical bugs in production
- [ ] <100MB app size
- [ ] 4.5+ App Store rating

### 15.2 Medical Accuracy KPIs

- [ ] <1% deviation from PWA predictions
- [ ] 100% GFAP calculation accuracy
- [ ] Validated by medical professionals
- [ ] Zero incorrect risk categorizations

### 15.3 User Experience KPIs

- [ ] <5 taps to complete assessment
- [ ] <30 seconds to results (from data entry)
- [ ] 100% accessibility compliance (WCAG 2.1 AA)
- [ ] <5% user-reported errors

---

## 16. Next Steps

### Immediate Actions

1. **Validate Plan** with stakeholders
2. **Secure Resources** (team, budget, timeline)
3. **Setup Development Environment**
   - Xcode 15+
   - Apple Developer account
   - TestFlight access
   - GCP API credentials
4. **Create GitHub Repository**
   - Branch strategy
   - CI/CD pipeline (GitHub Actions)
   - Code review process
5. **Design System**
   - Finalize color palette
   - Typography scale
   - Component library (Figma)
6. **Begin Phase 1**
   - Project scaffolding
   - Architecture implementation
   - First working screen

### Decision Points

**Week 4:** Architecture review
- Is Clean Architecture + MVVM working?
- SwiftUI vs UIKit decision finalized

**Week 12:** Feature completeness review
- All assessment flows working?
- API integration stable?

**Week 20:** Go/No-go for Beta
- Testing complete?
- Critical bugs resolved?

**Week 25:** Go/No-go for App Store
- App Review guidelines met?
- Medical disclaimers clear?

---

## Appendix A: Conversion Reference

### PWA → iOS Mapping

| PWA Technology | iOS Equivalent |
|----------------|----------------|
| Vanilla JavaScript | Swift |
| CSS | SwiftUI modifiers |
| localStorage | UserDefaults |
| sessionStorage | @State, @StateObject |
| Canvas API | CoreGraphics, UIView.draw() |
| SVG | SwiftUI Shapes, UIBezierPath |
| Fetch API | URLSession |
| Service Worker | Background URLSession |
| Web Audio | AVFoundation (haptics) |
| IndexedDB | CoreData |
| WebGL | Metal (if needed) |
| CSS Grid/Flexbox | VStack, HStack, LazyVGrid |

### Medical Terminology Consistency

Ensure consistent terminology between PWA and iOS:
- GFAP (Glial Fibrillary Acidic Protein)
- ICH (Intracerebral Hemorrhage)
- LVO (Large Vessel Occlusion)
- FAST-ED (Field Assessment Stroke Triage for Emergency Destination)
- SHAP (SHapley Additive exPlanations)
- GCS (Glasgow Coma Scale)

---

## Appendix B: Resources

### Documentation
- [Apple Human Interface Guidelines - Health](https://developer.apple.com/design/human-interface-guidelines/health)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [HealthKit Documentation](https://developer.apple.com/documentation/healthkit)
- [Medical Device Software Guidelines](https://www.fda.gov/medical-devices/digital-health-center-excellence)

### Reference Implementations
- Current PWA: `/home/user/0825/`
- API Documentation: GCP Cloud Functions
- Medical Validation: Research papers in PWA bibliography

---

## Appendix C: Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-22 | Initial plan created |

---

**Document Prepared by:** Development Team
**Review Status:** Draft
**Next Review:** Upon stakeholder approval
**Contact:** bosdeepak@gmail.com

---

**End of iOS Native App Development Plan**
