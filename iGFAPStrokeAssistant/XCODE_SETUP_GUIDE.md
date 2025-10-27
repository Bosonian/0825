# Xcode Project Setup Guide
## iGFAP Stroke Triage Assistant - iOS Native App

**Complete step-by-step guide to create and configure the Xcode project**

---

## Prerequisites

- **macOS:** 13.0+ (Ventura or later)
- **Xcode:** 14.0+ (download from Mac App Store)
- **iOS:** Target iOS 16.0+
- **Apple Developer Account:** Required for device testing (free account OK)

---

## Step 1: Create New Xcode Project

### 1.1 Launch Xcode

```bash
open -a Xcode
```

### 1.2 Create Project
1. **File → New → Project** (or Cmd+Shift+N)
2. Select **iOS** tab
3. Choose **App** template
4. Click **Next**

### 1.3 Configure Project Settings

Fill in the following:

| Field | Value |
|-------|-------|
| **Product Name** | `iGFAPStrokeAssistant` |
| **Team** | Select your Apple Developer Team |
| **Organization Identifier** | `com.yourorganization` (use your domain reversed) |
| **Bundle Identifier** | `com.yourorganization.iGFAPStrokeAssistant` |
| **Interface** | **SwiftUI** |
| **Language** | **Swift** |
| **Storage** | **None** |
| **Include Tests** | ✅ **Checked** |

Click **Next**, choose save location, and click **Create**.

---

## Step 2: Configure Project Settings

### 2.1 Set Minimum Deployment Target

1. Select project in Navigator (top item)
2. Select **iGFAPStrokeAssistant** target
3. **General** tab
4. **Minimum Deployments:** Set to **iOS 16.0**

### 2.2 Configure App Capabilities

1. Select **Signing & Capabilities** tab
2. Click **+ Capability**
3. Add the following:
   - ✅ **Maps**
   - ✅ **Location Services**

### 2.3 Delete Default Files

Delete these auto-generated files (we'll replace them):
- ❌ `ContentView.swift` (we have our own)
- ❌ `iGFAPStrokeAssistantApp.swift` (we have our own)
- ❌ `Assets.xcassets` (we'll create custom)

**Right-click → Delete → Move to Trash**

---

## Step 3: Add Source Files

### 3.1 Create Folder Structure

In Finder, navigate to your project folder and create this structure:

```
iGFAPStrokeAssistant/
├── App/
├── Core/
│   ├── Configuration/
│   ├── Data/
│   │   └── Network/
│   ├── Domain/
│   │   ├── Calculators/
│   │   └── Models/
│   └── UI/
│       ├── Components/
│       └── Extensions/
├── Features/
│   ├── Assessment/
│   │   └── Views/
│   ├── Authentication/
│   │   └── Views/
│   ├── Results/
│   │   └── Views/
│   └── Triage/
│       └── Views/
└── Resources/
    └── de.lproj/
```

### 3.2 Copy Source Files

Copy files from the downloaded source to your Xcode project folder:

```bash
# Navigate to project
cd /path/to/your/XcodeProject/iGFAPStrokeAssistant

# Copy all source files
cp -R /home/user/0825/iGFAPStrokeAssistant/iGFAPStrokeAssistant/* ./
```

### 3.3 Add Files to Xcode

1. In Xcode, **right-click** on `iGFAPStrokeAssistant` folder (yellow folder icon)
2. **Add Files to "iGFAPStrokeAssistant"...**
3. Navigate to your project folder
4. Select all folders (App, Core, Features, Resources)
5. **Options:**
   - ✅ **Create groups**
   - ✅ **Copy items if needed**
   - ✅ **Add to targets:** iGFAPStrokeAssistant
6. Click **Add**

### 3.4 Add Test Files

1. **Right-click** on `iGFAPStrokeAssistantTests` folder
2. **Add Files to "iGFAPStrokeAssistantTests"...**
3. Select all test files from `/home/user/0825/iGFAPStrokeAssistant/iGFAPStrokeAssistantTests/`
4. **Options:**
   - ✅ **Add to targets:** iGFAPStrokeAssistantTests
5. Click **Add**

---

## Step 4: Configure Info.plist

### 4.1 Replace Info.plist

1. Delete the auto-generated `Info.plist`
2. Copy custom `Info.plist` from source
3. Add to project with **Add Files...**

### 4.2 Verify Info.plist Entries

Select `Info.plist` and verify these keys exist:

**Required Permissions:**
- ✅ `NSLocationWhenInUseUsageDescription`
- ✅ `NSLocationAlwaysAndWhenInUseUsageDescription`
- ✅ `UIFileSharingEnabled`
- ✅ `LSSupportsOpeningDocumentsInPlace`

**App Configuration:**
- ✅ `CFBundleDisplayName`: "iGFAP Stroke Assistant"
- ✅ `LSMinimumSystemVersion`: "16.0"
- ✅ `UIApplicationSceneManifest`

**Network Security:**
- ✅ `NSAppTransportSecurity` (configured for Google Cloud Functions)

---

## Step 5: Configure Build Settings

### 5.1 Swift Compiler Settings

1. Select **Build Settings** tab
2. Search for "**Swift Language Version**"
3. Set to **Swift 5**

### 5.2 Other Settings

| Setting | Value |
|---------|-------|
| **Deployment Target** | iOS 16.0 |
| **Swift Optimization Level** | **-O** (Release), **-Onone** (Debug) |
| **Enable Bitcode** | No |

---

## Step 6: Resolve Import Issues

### 6.1 Check Import Statements

Verify all files can import correctly:

```swift
// Should work in all files
import Foundation
import SwiftUI
import Combine
import MapKit
import CoreGraphics
import PDFKit
```

### 6.2 Add Missing Frameworks

If needed, add frameworks:
1. Select **Target** → **General**
2. Scroll to **Frameworks, Libraries, and Embedded Content**
3. Click **+** to add:
   - MapKit.framework
   - CoreLocation.framework
   - PDFKit.framework

---

## Step 7: Build and Fix Errors

### 7.1 Build Project

Press **Cmd+B** to build

### 7.2 Common Errors and Fixes

**Error:** "Cannot find type 'UIView' in scope"
```swift
// Fix: Add UIKit import
import UIKit
```

**Error:** "Use of unresolved identifier 'AppConstants'"
```swift
// Fix: Ensure AppConstants.swift is in target membership
// Select file → File Inspector → Target Membership → Check box
```

**Error:** Module 'iGFAPStrokeAssistant' has no member named 'X'"
```swift
// Fix: Make sure structs/classes are public or internal
// Check for typos in @testable import
@testable import iGFAPStrokeAssistant
```

---

## Step 8: Run Tests

### 8.1 Build for Testing

Press **Cmd+Shift+U** or **Product → Test**

### 8.2 Run Specific Test Suite

1. Open **Test Navigator** (Cmd+6)
2. Hover over test suite
3. Click ▶️ play button

### 8.3 Expected Test Results

**Unit Tests:** Should pass (90%+)
- ✅ ICHVolumeCalculatorTests
- ✅ LVOModelTests
- ✅ PatientDataValidationTests

**Integration Tests:** May fail without network
- ⚠️ PredictionServiceTests (needs API access)
- ⚠️ AppStateTests (depends on API)

**Solution:** Use MockPredictionService for offline testing

---

## Step 9: Run on Simulator

### 9.1 Select Simulator

1. Click **Simulator** dropdown (top toolbar)
2. Select **iPhone 15 Pro** or **iPhone 15**

### 9.2 Run App

Press **Cmd+R** or click ▶️ **Run**

### 9.3 Test Login

**Access Codes:**
- `Neuro25`
- `research2024`

### 9.4 Test Workflows

1. **Coma Module:**
   - Login → Triage: Yes (Comatose) → Enter GFAP → Submit

2. **Limited Module:**
   - Login → Triage: No → Cannot Examine → Enter Data → Submit

3. **Full Module:**
   - Login → Triage: No → Can Examine → Complete Form → Submit

---

## Step 10: Run on Physical Device

### 10.1 Connect Device

1. Connect iPhone via USB
2. Trust computer on device
3. Select device in Xcode

### 10.2 Configure Signing

1. **Signing & Capabilities** tab
2. **Team:** Select your Apple ID
3. **Signing Certificate:** Apple Development
4. If errors, click **Register Device**

### 10.3 Build and Run

Press **Cmd+R**

**First Time:**
- iOS will show "Untrusted Developer" error
- **Settings → General → Device Management**
- Trust your developer certificate
- Re-run app

---

## Step 11: Add App Icon (Optional)

### 11.1 Prepare Icons

Create icons at these sizes:
- 1024×1024 (App Store)
- 180×180 (iPhone 3x)
- 120×120 (iPhone 2x)
- 76×76, 152×152 (iPad)

### 11.2 Add to Assets

1. Select **Assets.xcassets** (or create new Asset Catalog)
2. **Editor → Add Assets → New iOS App Icon**
3. Drag icon files to appropriate slots

### 11.3 Set App Icon

**Target → General → App Icons and Launch Screen:**
- **App Icons Source:** AppIcon

---

## Step 12: Configure Launch Screen

### 12.1 Using Info.plist (Current Method)

Already configured in `Info.plist`:
```xml
<key>UILaunchScreen</key>
<dict>
    <key>UIColorName</key>
    <string>AccentColor</string>
</dict>
```

### 12.2 Create Custom Launch Screen (Optional)

1. **File → New → File**
2. Choose **Launch Screen**
3. Design in Interface Builder
4. Set in **Target → General → Launch Screen File**

---

## Step 13: Archive for Distribution

### 13.1 Set Scheme to Release

1. **Product → Scheme → Edit Scheme**
2. **Run** → **Build Configuration:** Release
3. Close

### 13.2 Archive

1. Select **Any iOS Device** (Generic iOS Device)
2. **Product → Archive**
3. Wait for archive to complete

### 13.3 Upload to TestFlight

1. **Window → Organizer**
2. Select archive
3. **Distribute App**
4. **App Store Connect**
5. **Upload**
6. Fill in version info
7. **Submit**

---

## Troubleshooting

### Build Errors

**"Ambiguous use of '...'"**
- Add explicit type annotations
- Check for naming conflicts

**"Missing required module '...'"**
- Clean build folder (Cmd+Shift+K)
- Rebuild (Cmd+B)

**"Undefined symbol"**
- Check target membership
- Verify imports

### Runtime Errors

**"Thread 1: Fatal error: ..."**
- Check for force unwrapping (!)
- Verify optional handling

**"App crashes on launch"**
- Check Info.plist permissions
- Verify API endpoints

**"Network error"**
- Check internet connection
- Verify API URL in APIConfiguration.swift
- Use MockPredictionService for offline testing

### Testing Errors

**"Use of unresolved identifier in tests"**
```swift
// Add @testable import
@testable import iGFAPStrokeAssistant
```

**"Tests fail with network errors"**
```swift
// Use mock service
let mockService = MockPredictionService()
let appState = AppState(predictionService: mockService)
```

---

## Quick Reference

### Key Files to Check

| File | Purpose |
|------|---------|
| `Info.plist` | Permissions and configuration |
| `APIConfiguration.swift` | API endpoints |
| `AppConstants.swift` | App-wide constants |
| `AppState.swift` | Central state management |

### Common Commands

| Action | Shortcut |
|--------|----------|
| **Build** | Cmd+B |
| **Run** | Cmd+R |
| **Test** | Cmd+U |
| **Clean** | Cmd+Shift+K |
| **Archive** | Product → Archive |

### API Endpoints

**Production:**
```
https://europe-west3-igfap-452720.cloudfunctions.net
```

**Development:**
```
http://localhost:8080/api
```

---

## Next Steps

1. ✅ Test all three assessment modules
2. ✅ Run complete test suite
3. ✅ Test on physical device
4. ✅ Create app icon
5. ✅ Archive and submit to TestFlight
6. ✅ Invite beta testers
7. ✅ Collect feedback
8. ✅ Submit to App Store

---

## Support

**Issues:** Create GitHub issue with:
- Xcode version
- iOS version
- Error messages
- Steps to reproduce

**Documentation:**
- See `iOS_APP_README.md` for detailed app documentation
- See `FINAL_PROJECT_STATUS.md` for project overview

---

## Checklist

Before submitting to App Store:

- [ ] All tests passing
- [ ] App runs on simulator
- [ ] App runs on device
- [ ] App icon added
- [ ] Launch screen configured
- [ ] Info.plist complete
- [ ] Privacy policy created
- [ ] Screenshots taken (1-8 required)
- [ ] App description written
- [ ] Keywords added
- [ ] App Store metadata complete
- [ ] Build archived successfully
- [ ] TestFlight tested by beta users
- [ ] All feedback addressed

---

**Setup Time:** 30-60 minutes (first time)

**Ready for:** Development, Testing, TestFlight, App Store

🎉 **Happy Coding!**
