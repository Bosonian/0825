# Stroke Triage Assistant - Project Context

## Latest Restore Point: 2025-10-31 (HTML Entity Fix)
Successfully fixed HTML entity double-encoding bug affecting all UI text.

### Git Commit at Latest Restore Point
- Commit: a31e0cf (Fix HTML entity double-encoding in sanitizer)
- Date: October 31, 2025
- State: All UI text renders correctly (< / ' etc. display properly, not as &lt; &#x2F; &#x27;)

### Previous Restore Point: 2025-08-31 21:50:52 CEST
Successfully fixed mobile ring alignment issues. Both ICH Risk and Volume rings display correctly.

### Git Commit at Previous Restore Point
- Commit: ab9622a (Fix mobile ring alignment by removing transform scale conflicts)
- Date: August 31, 2025, 21:50 CEST
- State: All rings perfectly aligned on mobile devices (iPhone & Android)

### How to Restore to This Exact Point
```bash
# View current status
git log --oneline -5

# Restore to this exact code state (CAUTION: saves current changes first)
git stash                    # Save any current uncommitted changes
git checkout ab9622a         # Go to restore point
# OR to make a new branch from this point:
git checkout -b restore-point-aug31 ab9622a

# To return to latest version
git checkout main

# To see what any file looked like at this point
git show ab9622a:src/ui/screens/results.js
git show ab9622a:src/styles/app.css

# To compare current code with restore point
git diff ab9622a HEAD

# If you need to permanently revert (CAUTION: loses changes after this point)
git reset --hard ab9622a    # Only if you're sure!
```

## Architecture Overview

### Core Structure
- **PWA** built with Vite, vanilla JavaScript (no framework)
- **Deployment**: GitHub Pages at `/0925/` subdirectory
- **Three AI Modules**: 
  - Coma Module (GCS < 8)
  - Limited Module (basic data)
  - Full Module (complete assessment)

### Key Files
```
src/
├── ui/
│   ├── screens/
│   │   ├── welcome.js         # Landing page with module selection
│   │   ├── triage.js          # Initial triage questions
│   │   ├── data-input.js      # Patient data collection
│   │   └── results.js         # Risk visualization with rings
│   └── components/
│       └── brain-visualization.js  # Canvas blood animation
├── logic/
│   ├── api-client.js          # API calls to GCP endpoints
│   └── ich-volume-calculator.js   # Volume calculations
├── styles/
│   └── app.css                # All styling with responsive rules
├── app.js                     # Main app controller
└── config.js                  # API URLs and thresholds
```

### Visual Design Elements

#### Risk Rings Implementation
1. **ICH Risk Ring** (SVG)
   - Background circle: gray, opacity 0.4
   - Progress circle: color changes based on risk (blue→orange→red)
   - Centered percentage display
   - Risk level text below ring (High Risk, Very High Risk, etc.)

2. **ICH Volume Ring** (Canvas)
   - Animated blood fluid with waves
   - Dynamic fill level based on volume
   - Appears only when ICH risk ≥ 50%
   - Robust moving animation using requestAnimationFrame

#### Responsive Breakpoints
- Desktop: 120px rings
- Mobile (≤480px): 100px rings  
- High-DPI Android: 90px rings
- Small phones (≤375px): 80px rings

### Recent Fixes & Improvements

1. **Ring Alignment Fix (Current Restore Point)**
   - Removed CSS transform scale conflicts
   - SVG uses viewBox="0 0 120 120" for scaling
   - Canvas dynamically reads CSS dimensions
   - Consistent absolute positioning

2. **Layout Structure**
   ```html
   <div class="circles-container">
     <div class="rings-row">  <!-- Side-by-side rings -->
       <div class="circle-item"><!-- ICH Risk --></div>
       <div class="circle-item"><!-- Volume --></div>
     </div>
     <div class="risk-level"><!-- Risk text below --></div>
   </div>
   ```

3. **Color Transitions**
   - Fixed threshold logic: `percent > 70` for critical (red)
   - 50-70% shows orange
   - Below 50% shows blue

### Critical Bug Fixes (October 2025)

#### 1. **HTML Entity Double-Encoding Bug** ⭐ CRITICAL
**File**: `src/security/html-sanitizer.js:154-158`

**Problem**: UI text was displaying HTML entities instead of actual characters:
- "Glasgow Coma Scale &lt; 9" instead of "<"
- "GFAP Value (pg&#x2F;mL)" instead of "/"
- "Patient&#x27;s age in years" instead of "'"

**Root Cause**: The sanitizer was calling `escapeTextContent()` on DOM text nodes, which cannot contain HTML by definition. This caused double-escaping.

**Fix**: Removed unnecessary escaping of text nodes:
```javascript
// BEFORE (BUGGY):
else if (child.nodeType === Node.TEXT_NODE) {
  child.textContent = escapeTextContent(child.textContent);
}

// AFTER (FIXED):
else if (child.nodeType === Node.TEXT_NODE) {
  // Text nodes are already safe - they cannot contain HTML markup
  // No escaping needed; the browser treats them as literal text
  // Leave text content as-is
}
```

**Commit**: a31e0cf

#### 2. **Authentication Rate Limiting (429 Errors)**
**File**: `src/core/api-warmup.js`

**Problem**: Login with correct password returned HTTP 429 (Too Many Requests)

**Root Cause**: API warmup service was calling authentication endpoint on page load with invalid token, exhausting rate limit

**Fix**: Removed authentication endpoint from warmup service

**Commit**: 96ef744

#### 3. **React Islands Not Mounting**
**File**: `src/ui/render.js`

**Problem**: Tachometer/speedometer not appearing on results page

**Root Cause**: `mountIslands()` function existed but was never being called

**Fix**:
1. Added import: `import { mountIslands } from '../react/mountIslands.jsx';`
2. Called `mountIslands()` after results screen renders

**Commit**: 22ff786

#### 4. **Kiosk XSS False Positive**
**File**: `src/ui/screens/results.js`

**Problem**: Inline `onclick` handlers triggered XSS detection pattern `/on\w+\s*=/gi`

**Fix**: Replaced with data-action attributes and event delegation
```javascript
// Before:
<button onclick="window.location.reload()">Start Over</button>

// After:
<button data-action="reload">Start Over</button>
```

**Commit**: a2d9e16

#### 5. **Deployment Issues**
**Problem**: GitHub Pages serving source files instead of built assets

**Fix**: Always copy after build:
```bash
npm run build
cp dist/index.html index.html
cp -r dist/assets/ assets/
```

### API Endpoints (GCP Cloud Functions)
- Coma: `predict_coma_ich`
- Limited: `predict_limited_data_ich`
- Full: `predict_full_stroke`

### Testing Commands
```bash
npm run dev          # Local development
npm run build        # Production build
npm run preview      # Preview production build
```

### Git Workflow
- Always build before pushing
- Commits include: 🤖 Generated with Claude Code
- Main branch deploys to GitHub Pages

### Known Device Testing
- iPhone (various models)
- Android S25 Ultra (high-DPI)
- Responsive design tested 375px - 1920px

### User Preferences
- Clean, minimal commits
- Test before pushing
- No unnecessary documentation files
- Preserve robust animations

## Important Context
- **Language Toggle**: Supports English/German
- **Dark Mode**: Full support with CSS variables
- **Research Mode**: Hidden feature for model comparison
- **GFAP Values**: Critical biomarker (29-10001 pg/mL range)
- **Blood Animation**: Must remain smooth and robust

## Agentic Development System

### Available Agents

We use specialized agents for different aspects of development. Each agent has specific expertise and workflows.

#### 1. **Manager Agents** (Strategic Oversight)

**PWA Manager** - `.claude/agents/pwa-manager.md`
- **When to use**: Large PWA features, cross-cutting changes, architecture decisions
- **Expertise**: Frontend architecture, state management, routing, authentication
- **Capabilities**:
  - Coordinates across multiple PWA files
  - Ensures consistency in UI/UX
  - Manages authentication flows
  - Handles deployment to GitHub Pages

**Kiosk Manager** - `.claude/agents/kiosk-manager.md`
- **When to use**: Kiosk display features, case monitoring, real-time updates
- **Expertise**: Kiosk UI/UX, polling, case visualization, hospital routing
- **Capabilities**:
  - Manages kiosk-specific features
  - Coordinates with Cloud Run backend
  - Handles real-time case updates
  - Optimizes for large displays

**Backend Manager** - `.claude/agents/backend-manager.md`
- **When to use**: API changes, Cloud Functions, database, calculations
- **Expertise**: GCP deployment, API design, medical calculations, data storage
- **Capabilities**:
  - Manages Cloud Functions and Cloud Run services
  - Handles medical calculation logic
  - Designs and optimizes APIs
  - Ensures data integrity and security

#### 2. **Quality Assurance Agents**

**UI/UX Validator** - `.claude/agents/ui-ux-validator.md`
- **When to use**: After any UI changes, before deployment
- **Expertise**: Visual design, accessibility, responsive design, user experience
- **Capabilities**:
  - Validates color contrast and accessibility
  - Checks responsive behavior across breakpoints
  - Ensures design consistency
  - Verifies user interaction patterns

**Visual Tester** - `.claude/agents/visual-tester.md`
- **When to use**: After UI changes, before production deployments, when text encoding issues suspected
- **Expertise**: Visual rendering verification, HTML entity detection, screenshot testing
- **Capabilities**:
  - Captures screenshots of all major screens
  - Detects HTML entities in rendered UI (&lt;, &#x2F;, &#x27;, etc.)
  - Validates critical medical text renders correctly
  - Reports issues by severity (CRITICAL/HIGH/MEDIUM)
- **Test Script**: `test-visual-rendering.js`
- **Test Coverage**: Login, Triage, Forms, Results, Kiosk Mode
- **Example Issue Detection**:
  ```
  ❌ CRITICAL: HTML entity detected
     Screen: triage
     Found: "Glasgow Coma Scale &lt; 9"
     Expected: "Glasgow Coma Scale < 9"
  ```

**UX Explorer** - `.claude/agents/ux-explorer.md`
- **When to use**: BEFORE making any UI/UX recommendations, when reviewing any interface
- **Expertise**: Complete UI exploration, interaction testing, state discovery
- **Key Principle**: **Explore first, recommend later** (NEVER assume features don't exist)
- **Capabilities**:
  - Finds and tests ALL interactive elements (buttons, toggles, links)
  - Discovers all UI states (dark/light mode, expanded/collapsed, etc.)
  - Tests every user flow end-to-end
  - Captures screenshots of every state
  - Only provides evidence-based recommendations
- **Test Script**: `test-intelligent-ux-explorer.js`
- **Anti-Pattern**: ❌ Making recommendations without testing features first
- **Best Practice**: ✅ Test every toggle, click every button, explore every state
- **Example Output**:
  ```
  🔍 DISCOVERY PHASE:
     Found: Dark/Light mode toggle ✅
     Tested: Both states captured
     Evidence: screenshot-dark.png, screenshot-light.png

  💡 RECOMMENDATIONS:
     Based on testing 15 elements across 8 states...
  ```

**Human UX Evaluator** - `.claude/agents/human-ux-evaluator.md`
- **When to use**: For comprehensive UX evaluation, measuring user experience quality
- **Expertise**: Simulates human user behavior, measures experiential quality
- **Unique Approach**: Thinks like a real user, evaluates like a UX professional
- **Evaluation Framework**:
  1. **First Impressions** (0-5 seconds) - What draws attention? Is purpose clear?
  2. **Visual Quality** - Hierarchy, color scheme, typography, consistency
  3. **Interaction Quality** - Response times, feedback, affordances
  4. **Task Completion** - Can users achieve their goals? Where's friction?
  5. **Emotional Response** - Trust, cognitive comfort, frustration points
- **Key Metrics**:
  - Load time perception (instant <100ms, responsive <300ms, delayed >1s)
  - Cognitive load (choices presented, visual complexity, navigation depth)
  - Trust signals (professional design, security indicators, error prevention)
  - Task completion time and success rate
- **Output**: Comprehensive scored report (X/10) with evidence-based recommendations
- **Example Insights**:
  ```
  ⚠️  Form submission takes 2.3s with no loading indicator
     Impact: HIGH - Users unsure if system is working
     Effort: LOW
     Fix: Add <LoadingSpinner /> component
  ```

#### 3. **Agentic Loop Agents** (Iterative Development)

**Spec Creator** - `.claude/agents/spec-creator.md`
- **When to use**: Starting any new feature or UI component
- **Expertise**: Requirements analysis, design system, visual specifications
- **Capabilities**:
  - Transforms high-level requirements into detailed specs
  - Creates visual mocks (ASCII art or descriptions)
  - Defines acceptance criteria
  - Documents technical requirements

**UI Implementer** - `.claude/agents/ui-implementer.md`
- **When to use**: Implementing features from specs, iterative refinement
- **Expertise**: Frontend implementation, Playwright testing, visual verification
- **Capabilities**:
  - Implements UI components from specs
  - Uses Playwright MCP for visual verification
  - Iterates until spec match achieved
  - Documents all changes and discrepancies

### Workflows

#### Agentic Development Loop
**File**: `.claude/workflows/agentic-loop.md`

**Process**:
```
User Requirement
    ↓
Spec Creator Agent
    ↓ (detailed spec)
UI Implementer Agent
    ↓ (implementation)
Playwright MCP (screenshots)
    ↓ (comparison)
Iteration (if needed)
    ↓
Human Review
    ↓
Approval & Deploy
```

**When to use**:
- New UI features with visual requirements
- Refinement of existing components
- Pixel-perfect implementations
- Cross-browser/device testing

**Example**:
```bash
# User: "Add a floating back button in kiosk mode"
# → Spec Creator: Creates detailed visual spec
# → UI Implementer: Implements, screenshots, iterates
# → Human: Reviews screenshots, approves
# → Deploy
```

### Testing Infrastructure

#### Playwright Integration
- **MCP Server**: Installed and configured
- **Test Scripts**:
  - `test-kiosk-flow.js` - End-to-end kiosk navigation
  - `test-kiosk-auth-bypass.js` - Authentication bypass verification
  - `test-prod-kiosk.js` - Production deployment testing
  - `test-visual-rendering.js` - **Visual rendering verification (HTML entity detection)**

#### Visual Verification
- Screenshots captured at 3 viewports (mobile/tablet/desktop)
- Stored in `test-screenshots/` directory
- Used for iterative comparison in agentic loop

#### Visual Testing Agent
**Purpose**: Catch visual bugs that source code review misses

**Usage**:
```bash
node test-visual-rendering.js
```

**What it detects**:
- HTML entities in rendered UI (&lt;, &gt;, &#x27;, &#x2F;, etc.)
- Critical medical text accuracy (GCS < 9, pg/mL, etc.)
- Accessibility issues in rendered output

**Recent Success**: Detected HTML entity double-encoding bug affecting all UI text across login, triage, forms, and results screens. All tests now pass: ✅✅✅

### Recent Major Changes

#### Kiosk Mode Implementation (Oct 2025)
- **Feature**: Unified kiosk display using PWA results page
- **Architecture**: Kiosk shows case list → Click navigates to PWA with `display=kiosk&caseId=xxx`
- **Authentication**: Bypass implemented in `src/logic/kiosk-loader.js` and `src/ui/render.js`
- **Files Modified**:
  - `src/logic/kiosk-loader.js` (NEW) - Kiosk mode detection and case loading
  - `src/ui/render.js` - Authentication bypass for kiosk mode
  - `src/ui/screens/results.js` - Conditional UI rendering
  - `cloud-functions/case-sharing/main.py` - CORS configuration
  - `kiosk-temp/src/config.js` - Environment-based PWA URL

#### Key Features
- **Single Source of Truth**: PWA results page serves both normal and kiosk modes
- **No Code Duplication**: Removed separate kiosk results modal
- **Seamless Navigation**: Kiosk → PWA → Back to Kiosk workflow
- **Environment Awareness**: localhost in dev, production URLs in builds

### Agent Usage Guidelines

#### When to Use Which Agent

**Use Manager Agents when**:
- Making architectural decisions
- Coordinating changes across multiple files
- Planning large features
- Deploying to production

**Use Quality Agents when**:
- Validating UI changes (UI/UX Validator)
- Ensuring accessibility compliance (UI/UX Validator)
- Checking design consistency (UI/UX Validator)
- Verifying text renders correctly without HTML entities (Visual Tester)
- Before deploying to production (both UI/UX Validator and Visual Tester)

**Use Agentic Loop when**:
- Implementing new UI components
- Requiring pixel-perfect accuracy
- Need iterative refinement
- Visual verification is critical

#### Agent Coordination

Agents can work together:
```
PWA Manager → Spec Creator → UI Implementer → UI/UX Validator → Visual Tester
```

Example: "Add dark mode toggle"
1. PWA Manager: Plans integration with theme system
2. Spec Creator: Defines button appearance and behavior
3. UI Implementer: Builds component, verifies with screenshots
4. UI/UX Validator: Checks accessibility and contrast
5. Visual Tester: Verifies all text renders correctly across all screens

### Directory Structure

```
.claude/
├── agents/              # Agent definitions
│   ├── pwa-manager.md
│   ├── kiosk-manager.md
│   ├── backend-manager.md
│   ├── ui-ux-validator.md
│   ├── visual-tester.md          # Visual rendering verification
│   ├── ux-explorer.md            # NEW: Intelligent UI exploration
│   ├── human-ux-evaluator.md     # NEW: Human-like UX evaluation
│   ├── spec-creator.md
│   └── ui-implementer.md
└── workflows/           # Workflow documentation
    └── agentic-loop.md

# Testing scripts
test-visual-rendering.js              # Visual testing (HTML entity detection)
test-intelligent-ux-explorer.js       # Complete UI exploration
test-comprehensive-ux-journey.js      # End-to-end workflow testing
test-exhaustive-clinical-workflow.js  # Clinical assessment flows
test-version-comparison-v2.js         # Version comparison testing
test-screenshots/                     # Visual test evidence
```

This file serves as the project memory. Update it when making significant changes.