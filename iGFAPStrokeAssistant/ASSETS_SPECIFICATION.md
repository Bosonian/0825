# Assets Specification
## iGFAP Stroke Triage Assistant

**Complete specification for app assets and resources**

---

## Color Assets

Create these color assets in `Assets.xcassets/Colors/`

### Brand Colors

**Primary Blue**
- Light: `#007AFF` (iOS default blue)
- Dark: `#0A84FF`
- Name: `BrandPrimary`

**Secondary Indigo**
- Light: `#5856D6`
- Dark: `#5E5CE6`
- Name: `BrandSecondary`

**Accent Cyan**
- Light: `#32ADE6`
- Dark: `#64D2FF`
- Name: `BrandAccent`

### Risk Colors

**Low Risk - Blue**
- Light: `#007AFF`
- Dark: `#0A84FF`
- Name: `RiskLow`

**Medium Risk - Yellow**
- Light: `#FFCC00`
- Dark: `#FFD60A`
- Name: `RiskMedium`

**High Risk - Orange**
- Light: `#FF9500`
- Dark: `#FF9F0A`
- Name: `RiskHigh`

**Critical Risk - Red**
- Light: `#FF3B30`
- Dark: `#FF453A`
- Name: `RiskCritical`

### Semantic Colors

**Success Green**
- Light: `#34C759`
- Dark: `#30D158`
- Name: `Success`

**Warning Orange**
- Light: `#FF9500`
- Dark: `#FF9F0A`
- Name: `Warning`

**Error Red**
- Light: `#FF3B30`
- Dark: `#FF453A`
- Name: `Error`

**Info Blue**
- Light: `#007AFF`
- Dark: `#0A84FF`
- Name: `Info`

### Medical Condition Colors

**Hemorrhage Red**
- Light: `#DC3545` (80% opacity)
- Dark: `#E63946` (80% opacity)
- Name: `Hemorrhage`

**Ischemia Blue**
- Light: `#1E88E5` (80% opacity)
- Dark: `#42A5F5` (80% opacity)
- Name: `Ischemia`

**Stroke Purple**
- Light: `#9C27B0` (80% opacity)
- Dark: `#BA68C8` (80% opacity)
- Name: `Stroke`

### Background Colors

Use iOS system colors:
- `systemBackground` (adapts to dark mode)
- `secondarySystemBackground`
- `tertiarySystemBackground`

### Text Colors

Use iOS system colors:
- `label` (primary text)
- `secondaryLabel`
- `tertiaryLabel`

---

## App Icon Specification

### Requirements

**Format:** PNG (no transparency)
**Color Space:** sRGB or Display P3

### Sizes Required

| Platform | Size | Scale | Filename |
|----------|------|-------|----------|
| iPhone | 180×180 | 3x | AppIcon-60@3x.png |
| iPhone | 120×120 | 2x | AppIcon-60@2x.png |
| iPad Pro | 167×167 | 2x | AppIcon-83.5@2x.png |
| iPad | 152×152 | 2x | AppIcon-76@2x.png |
| iPad | 76×76 | 1x | AppIcon-76.png |
| App Store | 1024×1024 | 1x | AppIcon-1024.png |

### Design Guidelines

**Concept:** Brain with GFAP biomarker visualization

**Elements:**
1. Simplified brain silhouette
2. Medical cross or pulse line
3. Blue/purple gradient background
4. Clean, modern aesthetic

**Colors:**
- Primary: Blue `#007AFF`
- Secondary: Purple `#9C27B0`
- Accent: Cyan `#32ADE6`

**Typography (if any):**
- Sans-serif
- Bold weight
- "iGFAP" or "STA" monogram

**Style:**
- Minimal, flat design
- No gradients (or subtle only)
- High contrast for visibility
- Works at small sizes

### Icon Template

```
┌─────────────────┐
│                 │
│    ┌─────┐     │  Blue background (#007AFF)
│   (  🧠  )     │  Brain icon (white)
│    └─────┘     │
│      ╱╲        │  Heartbeat line (cyan)
│                 │
│     iGFAP       │  Text (white, optional)
│                 │
└─────────────────┘
```

### Alternative Concepts

1. **Medical Symbol:**
   - Caduceus with brain
   - Blue/white color scheme

2. **Biomarker Visualization:**
   - Abstract DNA helix
   - Purple/cyan gradient

3. **Minimalist:**
   - Single letter "i"
   - Brain incorporated into letter

---

## Image Assets

### Placeholder Images

**Brain Visualization Placeholder**
- Size: 200×200 @ 1x, 400×400 @ 2x, 600×600 @ 3x
- Name: `brain-placeholder`
- Usage: Loading state for brain visualization

**Map Marker Icons**
- Size: 40×40 @ 1x, 80×80 @ 2x, 120×120 @ 3x
- Primary Stroke Center: Red cross
- Comprehensive Stroke Center: Blue cross with star

### System Icons Used

Using SF Symbols (no custom assets needed):

| Feature | SF Symbol |
|---------|-----------|
| Brain | `brain.head.profile` |
| Login | `lock.shield.fill` |
| Assessment | `doc.text.fill` |
| Results | `chart.bar.fill` |
| Map | `map.fill` |
| PDF Export | `square.and.arrow.up.fill` |
| FAST-ED | `stethoscope` |
| Back | `chevron.left` |
| Logout | `arrow.right.square.fill` |
| Error | `exclamationmark.triangle.fill` |
| Success | `checkmark.circle.fill` |
| Info | `info.circle.fill` |

---

## Launch Screen

### Configuration

**Method:** Info.plist configuration (current)

**Appearance:**
- Background: System background color
- Icon: App icon (centered)
- Text: App name (optional)

### Custom Launch Screen (Optional)

**Elements:**
1. App icon (centered)
2. App name below icon
3. Tagline: "Stroke Triage Assistant"
4. Background: Gradient (blue to purple)

**Layout:**
```
┌─────────────────┐
│                 │
│                 │
│     [ICON]      │  App icon 120×120
│                 │
│   iGFAP Stroke  │  Title (24pt bold)
│     Triage      │
│   Assistant     │
│                 │
│   Research Use  │  Subtitle (14pt)
│      Only       │
│                 │
└─────────────────┘
```

---

## Localization Assets

### Supported Languages

1. **English (en)** - Default
2. **German (de)** - Complete

### Localized Strings

File structure:
```
Resources/
├── Localizable.strings (English)
└── de.lproj/
    └── Localizable.strings (German)
```

### Adding New Language

1. Create folder: `[lang].lproj/`
2. Copy `Localizable.strings`
3. Translate all keys
4. Add to Xcode project

---

## Font Assets (Using System Fonts)

### Typography Scale

| Usage | Font | Size |
|-------|------|------|
| Large Title | SF Pro Display | 34pt Bold |
| Title 1 | SF Pro Display | 28pt Bold |
| Title 2 | SF Pro Text | 22pt Bold |
| Title 3 | SF Pro Text | 20pt Semibold |
| Headline | SF Pro Text | 17pt Semibold |
| Body | SF Pro Text | 17pt Regular |
| Callout | SF Pro Text | 16pt Regular |
| Subhead | SF Pro Text | 15pt Regular |
| Footnote | SF Pro Text | 13pt Regular |
| Caption 1 | SF Pro Text | 12pt Regular |
| Caption 2 | SF Pro Text | 11pt Regular |

### Custom Fonts (Future)

If adding custom medical fonts:
```
Resources/Fonts/
├── MedicalFont-Regular.ttf
├── MedicalFont-Bold.ttf
└── MedicalFont-Italic.ttf
```

---

## Sound Assets (Future)

### Alert Sounds

**High Risk Alert**
- Name: `high-risk-alert.caf`
- Duration: 1-2 seconds
- Volume: Medium
- Usage: When ICH risk ≥ 70%

**Assessment Complete**
- Name: `assessment-complete.caf`
- Duration: 0.5 seconds
- Volume: Low
- Usage: On successful submission

---

## Data Assets

### Sample Data Files

**Stroke Centers Database**
- Format: JSON
- File: `stroke-centers.json`
- Location: `Resources/Data/`

```json
{
  "centers": [
    {
      "id": "1",
      "name": "University Hospital",
      "type": "comprehensive",
      "latitude": 48.1372,
      "longitude": 11.5755,
      "phone": "+49 89 4400-0",
      "address": "..."
    }
  ]
}
```

---

## Asset Catalog Structure

```
Assets.xcassets/
├── AppIcon.appiconset/
│   ├── Contents.json
│   ├── AppIcon-60@2x.png
│   ├── AppIcon-60@3x.png
│   ├── AppIcon-76.png
│   ├── AppIcon-76@2x.png
│   ├── AppIcon-83.5@2x.png
│   └── AppIcon-1024.png
│
├── Colors/
│   ├── BrandPrimary.colorset/
│   ├── BrandSecondary.colorset/
│   ├── BrandAccent.colorset/
│   ├── RiskLow.colorset/
│   ├── RiskMedium.colorset/
│   ├── RiskHigh.colorset/
│   ├── RiskCritical.colorset/
│   ├── Success.colorset/
│   ├── Warning.colorset/
│   ├── Error.colorset/
│   └── Info.colorset/
│
└── Images/
    └── (placeholder images if needed)
```

---

## Creating Assets in Xcode

### Add Color Set

1. Select `Assets.xcassets`
2. Click `+` button → **Color Set**
3. Name it (e.g., `BrandPrimary`)
4. Select color → **Attributes Inspector**
5. **Appearances:** Any, Light, Dark
6. Set colors for each appearance

### Add Image Set

1. Select `Assets.xcassets`
2. Click `+` button → **Image Set**
3. Name it
4. Drag images to 1x, 2x, 3x slots

### Add App Icon

1. Select `Assets.xcassets`
2. Click `+` button → **iOS App Icon**
3. Drag icons to appropriate sizes
4. Ensure 1024×1024 for App Store

---

## Accessibility

### High Contrast Colors

Provide higher contrast versions for:
- `increaseContrast` appearance
- Users with visual impairments

### VoiceOver Support

All colors should have semantic names:
- "Brand Primary Blue"
- "High Risk Red"
- "Success Green"

---

## Design Tools

### Recommended Tools

**Icon Design:**
- Sketch
- Figma
- Adobe Illustrator
- SF Symbols App (for SF Symbols)

**Color Palettes:**
- Xcode Color Picker
- ColorSlurp
- Coolors.co

**Asset Export:**
- Sketch → Export for iOS
- Figma → Export 1x, 2x, 3x
- ImageOptim (for optimization)

---

## Asset Checklist

### Before Submission

- [ ] App icon all sizes (6 sizes)
- [ ] App icon 1024×1024 for App Store
- [ ] All color sets defined
- [ ] Colors work in light and dark mode
- [ ] Launch screen configured
- [ ] Localizable.strings complete
- [ ] All images optimized (< 1MB each)
- [ ] SF Symbols properly referenced
- [ ] High contrast variants (if needed)
- [ ] Accessibility labels set

---

## File Formats

| Asset Type | Format | Notes |
|------------|--------|-------|
| App Icon | PNG | No transparency |
| Color Set | `.colorset` | Xcode format |
| Images | PNG, JPG | PNG for transparency |
| Launch Screen | Storyboard or plist | Current: plist |
| Strings | `.strings` | UTF-8 encoding |
| Data | JSON | UTF-8 encoding |

---

## Optimization

### Image Optimization

```bash
# Install ImageOptim
brew install --cask imageoptim

# Optimize images
imageoptim *.png
```

### Asset Sizes

- App icon files: < 500KB each
- Launch screen: < 1MB
- Total assets: < 10MB

---

## References

- **Apple HIG:** https://developer.apple.com/design/human-interface-guidelines/
- **SF Symbols:** https://developer.apple.com/sf-symbols/
- **App Icon Template:** https://developer.apple.com/design/resources/

---

**Created:** October 22, 2025
**Version:** 1.0
**Platform:** iOS 16.0+
