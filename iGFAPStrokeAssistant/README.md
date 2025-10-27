# iGFAP Stroke Triage Assistant - Native iOS App

Professional stroke triage iOS application with AI-powered ICH and LVO risk prediction.

## Overview

This is the native iOS implementation of the iGFAP Stroke Triage Assistant, built with SwiftUI and following Clean Architecture principles. The app provides three assessment modules for emergency stroke triage based on patient condition.

**Version:** 1.0.0
**Platform:** iOS 16.0+
**Language:** Swift 5.9+
**Architecture:** SwiftUI + Combine + MVVM + Clean Architecture

## Features

### Core Functionality
- ✅ **Three Assessment Modules**
  - Coma Module (GCS < 8) - Rapid GFAP-only assessment
  - Limited Module - Partial examination data
  - Full Module - Comprehensive stroke evaluation

- ✅ **AI-Powered Predictions**
  - ICH (Intracerebral Hemorrhage) risk prediction
  - LVO (Large Vessel Occlusion) risk prediction
  - SHAP explainability (risk factor drivers)
  - ICH volume estimation from GFAP

- ✅ **Medical Calculations**
  - Log-log regression for ICH volume (R² = 0.476)
  - Scientifically calibrated LVO model (Yeo-Johnson + Platt scaling)
  - Mortality risk estimation (Broderick et al., 1993)

- ✅ **User Experience**
  - Animated risk ring visualizations
  - Real-time form validation
  - Bilingual support ready (EN/DE)
  - Dark mode support
  - Accessibility features

- ✅ **Security & Compliance**
  - Research access authentication
  - Secure session management
  - GDPR-compliant data handling
  - Medical device preparation

## Project Structure

```
iGFAPStrokeAssistant/
├── App/
│   ├── iGFAPStrokeAssistantApp.swift    # Main app entry point
│   └── AppState.swift                    # Combine-based state management
├── Core/
│   ├── Domain/
│   │   └── Models/                       # Core business models
│   │       ├── PatientData.swift
│   │       ├── Assessment.swift
│   │       └── Predictions.swift
│   └── Data/
│       └── Network/                      # API integration
│           ├── APIConfiguration.swift
│           ├── APIError.swift
│           └── PredictionService.swift
├── Medical/
│   └── Calculators/                      # Medical algorithms
│       ├── ICHVolumeCalculator.swift
│       └── LVOModel.swift
├── Features/
│   ├── Authentication/
│   │   └── Views/
│       └── LoginView.swift
│   ├── Triage/
│   │   └── Views/
│   │       ├── TriageComaView.swift
│   │       └── TriageExamView.swift
│   ├── Assessment/
│   │   └── Views/
│   │       ├── ComaAssessmentView.swift
│   │       ├── LimitedAssessmentView.swift
│   │       └── FullAssessmentView.swift
│   └── Results/
│       └── Views/
│           ├── ResultsView.swift
│           └── RiskRingView.swift
└── Resources/
```

## Setup Instructions

### Prerequisites

1. **macOS** 13.0 (Ventura) or later
2. **Xcode** 15.0 or later
3. **iOS Simulator** or physical iPhone (iOS 16.0+)
4. **Apple Developer Account** (for device testing)

### Installation Steps

#### 1. Open in Xcode

```bash
# Navigate to project directory
cd /home/user/0825/iGFAPStrokeAssistant

# Open Xcode (create new project)
open -a Xcode
```

#### 2. Create Xcode Project

Since this is Swift source code, you need to create an Xcode project:

1. **Open Xcode**
2. **File → New → Project**
3. **Select:** iOS → App
4. **Configure:**
   - Product Name: `iGFAPStrokeAssistant`
   - Team: Your Apple Developer account
   - Organization Identifier: `com.igfap` (or your domain)
   - Interface: **SwiftUI**
   - Language: **Swift**
   - Storage: **None**
5. **Save** to: `/home/user/0825/iGFAPStrokeAssistant`

#### 3. Add Source Files to Project

1. In Xcode, **right-click** on `iGFAPStrokeAssistant` folder
2. **Add Files to "iGFAPStrokeAssistant"...**
3. Select all the created `.swift` files
4. Ensure **"Copy items if needed"** is checked
5. Click **Add**

Or simply drag and drop the folder structure into Xcode.

#### 4. Configure Build Settings

In Xcode:

1. **Target Settings** → General
   - Deployment Target: **iOS 16.0**
   - iPhone and iPad supported

2. **Signing & Capabilities**
   - Select your development team
   - Enable **Automatic Signing**

3. **Info.plist** (if needed for permissions)
   ```xml
   <key>NSLocationWhenInUseUsageDescription</key>
   <string>Used to find nearby stroke centers</string>
   ```

#### 5. Build and Run

1. **Select Target:** iPhone 15 Pro (Simulator) or your device
2. **Product → Build** (⌘B)
3. **Product → Run** (⌘R)

### Expected Build Time
- **First build:** ~2-3 minutes
- **Incremental builds:** ~10-30 seconds

## Development Workflow

### Running the App

1. **Simulator:**
   ```
   Select any iPhone simulator (iOS 16+)
   Press ⌘R to run
   ```

2. **Physical Device:**
   ```
   Connect iPhone via USB
   Trust computer on device
   Select device in Xcode
   Press ⌘R to run
   ```

### Login Credentials

Research access codes (development):
- `Neuro25`
- `research2024`

### Testing Flow

1. **Login** with access code
2. **Triage 1:** Select patient consciousness (comatose or not)
3. **Triage 2:** (if not comatose) Select examination capability
4. **Assessment:** Fill in required medical data
   - **Coma:** GFAP only
   - **Limited:** Age, BP, GFAP, vigilance status
   - **Full:** Complete neurological exam + FAST-ED
5. **Submit:** View results with risk predictions
6. **New Assessment:** Start over

### API Configuration

The app connects to Google Cloud Functions for predictions:

**Production:**
```swift
https://europe-west3-igfap-452720.cloudfunctions.net
```

**Development:**
```swift
http://localhost:8080/api  // Requires proxy
```

Change in `APIConfiguration.swift`:
```swift
static var current: APIConfiguration {
    #if DEBUG
    return development  // Use mock/proxy
    #else
    return production   // Use real API
    #endif
}
```

## Key Technologies

### Frameworks
- **SwiftUI** - Declarative UI framework
- **Combine** - Reactive programming
- **Foundation** - Core utilities
- **URLSession** - Network requests

### Architecture Patterns
- **Clean Architecture** - Separation of concerns
- **MVVM** - Model-View-ViewModel
- **Repository Pattern** - Data abstraction
- **Actor Pattern** - Thread-safe networking

### Medical Algorithms

#### ICH Volume Calculator
```swift
// Log-log regression model
log₁₀(Volume) = 0.0192 + 0.4533 × log₁₀(GFAP)
```

#### LVO Prediction Model
```swift
// Yeo-Johnson transformation + Logistic regression + Platt scaling
1. Transform GFAP: yeoJohnson(gfap, λ=-0.826)
2. Standardize: z-score normalization
3. Logistic: β₀ + β_GFAP × GFAP_z + β_FAST × FAST_z
4. Calibrate: Platt scaling (a=1.117, b=-1.032)
5. Sigmoid: probability = 1 / (1 + e^(-x))
```

## Troubleshooting

### Build Errors

**"Cannot find type 'PatientData'"**
- Ensure all `.swift` files are added to target
- Check file membership in File Inspector

**"Module 'Combine' not found"**
- Set deployment target to iOS 16.0+
- Clean build folder (⇧⌘K)

**Network errors in simulator**
- Check API URLs in `APIConfiguration.swift`
- Ensure internet connection
- For localhost, use Mac's IP address (not `localhost`)

### Runtime Issues

**App crashes on launch**
- Check console for errors
- Verify all views are properly initialized
- Ensure AppState is injected as EnvironmentObject

**API calls fail**
- Check network permissions in Info.plist
- Verify API endpoints are accessible
- Check for CORS issues (use proxy in development)

**Missing data in results**
- Verify API response format matches expected models
- Check JSON decoding in `PredictionService.swift`
- Add print statements to debug data flow

## Performance Optimization

### Recommended Practices

1. **Lazy Loading**
   ```swift
   LazyVStack { ... }  // For long lists
   ```

2. **Async/Await**
   ```swift
   Task { await submitAssessment() }  // Non-blocking
   ```

3. **Caching**
   - Consider URLCache for API responses
   - UserDefaults for lightweight persistence

4. **Memory Management**
   - Use `@StateObject` for app state
   - Use `@ObservedObject` for injected dependencies
   - Avoid retain cycles with `[weak self]`

## Deployment

### TestFlight (Beta)

1. **Archive app:** Product → Archive
2. **Upload to App Store Connect**
3. **Add external testers**
4. **Distribute** via TestFlight

### App Store

1. **Prepare assets:**
   - App icon (1024×1024px)
   - Screenshots (all device sizes)
   - Privacy policy
   - Terms of service

2. **App Store listing:**
   - Description
   - Keywords: stroke, medical, emergency, ICH, LVO
   - Category: Medical
   - Age rating: 17+ (medical content)

3. **Regulatory:**
   - Add disclaimer: "Research purposes only"
   - Include CE certification status
   - Link to clinical oversight information

## Security & Compliance

### Data Privacy
- **No persistent storage** of patient data (research version)
- **Session-only** storage in memory
- **Secure** API communication (HTTPS)
- **UserDefaults** for non-sensitive preferences only

### GDPR Compliance
- Minimal data collection
- No third-party trackers
- Clear consent flow
- Data deletion on logout

### Medical Device Path
This research version is **NOT** a medical device.

For future medical device certification:
- **CE Mark** (Europe): Additional validation, risk analysis
- **FDA 510(k)** (USA): Clinical trials, substantial equivalence

## Contributing

### Code Style
- **SwiftLint** recommended
- Follow Apple's Swift style guide
- Use meaningful variable names
- Comment complex medical logic

### Testing
- Unit tests for calculators
- Integration tests for API
- UI tests for critical flows

### Pull Requests
- Create feature branch
- Write descriptive commit messages
- Include tests
- Update documentation

## License

**Proprietary** - iGFAP Project Team

Research use only. Not for clinical decision-making.

## Contact

**Developer:** Deepak Bos
**Email:** bosdeepak@gmail.com
**Clinical Oversight:** RKH Klinikum Ludwigsburg, Neurology Department

## References

1. Broderick et al. (1993). *Volume of intracerebral hemorrhage. A powerful and easy-to-use predictor of 30-day mortality.* Stroke, 24(7), 987-993.

2. iGFAP Project Documentation
3. FAST-ED Stroke Triage Scale
4. Glasgow Coma Scale

---

**Version:** 1.0.0 (2025-10-22)
**Last Updated:** 2025-10-22
**Status:** Development - Research Only ⚠️
