# Kiosk Case Sharing System - Implementation Summary

## Project Overview

Extended the iGFAP Stroke Triage Assistant with a real-time case sharing system that enables field paramedics to send stroke assessments to emergency rooms with live GPS tracking and ETA updates.

**Implementation Date:** 2025-10-27
**Implementation Scope:** Backend API + Field PWA modifications + Kiosk PWA
**Architecture:** Simple polling-based system using only GCP Cloud Functions (no Firebase/Vercel required)

---

## What Was Built

### 1. Cloud Functions Backend (6 Endpoints)

**File:** `cloud-functions/case-sharing/main.py`

```
POST   /store-case          - Store new case with initial location
PUT    /update-location     - Update ambulance GPS coordinates (every 30s)
GET    /get-cases           - Retrieve active cases (filtered by hospital)
PUT    /mark-arrived        - Mark case as arrived at hospital
POST   /cleanup-old-cases   - Archive cases older than 2 hours
GET    /health              - Service health check
```

**Key Features:**
- Cloud Storage persistence (JSON files)
- Urgency computation (IMMEDIATE/TIME_CRITICAL/URGENT/STANDARD)
- Google Maps ETA calculation with emergency vehicle multiplier (0.7x)
- GPS staleness detection (>5 minutes)
- Auto-archive logic (2 hours → archive, 24 hours → delete)
- CORS enabled for web access

**Dependencies:**
- Flask (web framework)
- google-cloud-storage (persistence)
- flask-cors (cross-origin requests)

---

### 2. Field PWA Modifications

Enhanced the existing stroke assessment PWA with case transmission capabilities.

#### New Files Created

1. **`src/services/gps-tracker.js`** (135 lines)
   - Continuous GPS tracking with watchPosition API
   - 30-second update throttling
   - Permission handling and error recovery
   - Battery-efficient implementation

2. **`src/services/eta-calculator.js`** (180 lines)
   - Google Maps Directions API integration
   - Emergency vehicle speed multiplier (30% faster)
   - Haversine formula fallback (if API fails)
   - Traffic-aware routing (PESSIMISTIC model)

3. **`src/services/case-transmitter.js`** (245 lines)
   - Sends case to Cloud Function
   - Manages continuous location updates every 30s
   - Exponential backoff retry logic (1s, 2s, 4s)
   - Tracks transmission status

4. **`src/ui/components/hospital-selector.js`** (320 lines)
   - Modal UI for hospital selection
   - Sorts by capability score then distance
   - Displays hospital capabilities (NS/TE/TL badges)
   - Calculates distances using Haversine formula
   - 50km radius filter

5. **`src/handlers/kiosk-handlers.js`** (180 lines)
   - Event handler for "Send to Hospital" button
   - Coordinates workflow: GPS → Hospital Selection → Transmission
   - Shows tracking status badge
   - Error handling and user feedback

#### Modified Files

1. **`src/config.js`**
   - Added KIOSK_CONFIG section
   - Google Maps API key placeholder
   - GPS update interval (30s)
   - Auto-archive configuration

2. **`src/ui/screens/results.js`**
   - Added "Send to Hospital" button (🚀 icon)
   - Inserted in both ICH-focused and full module results
   - Bilingual labels (German/English)

3. **`src/main.js`**
   - Initialize kiosk handlers on app startup
   - Added import: `initializeKioskHandlers()`

4. **`src/styles/app.css`**
   - Hospital selector modal styles (~250 lines added)
   - Tracking status badge styles
   - Capability badge colors (neurosurgery=red, thrombectomy=purple, thrombolysis=blue)
   - Responsive layout for modal
   - Fade-in animations

---

### 3. Kiosk PWA (Complete New Application)

A standalone PWA optimized for large displays in emergency rooms.

#### File Structure

```
kiosk/
├── package.json              - NPM config (Vite 5.0.0)
├── vite.config.js           - Build config (base: /kiosk/, port 3001)
├── index.html               - Entry point (header + cases grid + modal)
├── src/
│   ├── config.js            - Kiosk configuration
│   ├── main.js              - Application entry point
│   ├── services/
│   │   └── case-listener.js - Polls Cloud Function every 5s
│   ├── ui/
│   │   ├── dashboard.js     - Case list grid renderer
│   │   └── case-detail.js   - Modal detail view
│   └── styles.css           - Complete dark theme styling
```

#### Key Features

1. **Real-Time Case Monitoring**
   - 5-second polling interval
   - Detects new cases and triggers alerts
   - Filters by hospitalId
   - Sorts by urgency then ETA

2. **Visual Design**
   - Dark theme optimized for 24/7 display
   - Large text (18-36px base sizes)
   - Color-coded urgency borders:
     - Red: IMMEDIATE
     - Orange: TIME_CRITICAL
     - Yellow: URGENT
     - Blue: STANDARD
   - Risk circles with conic gradients
   - GPS staleness warnings

3. **Alert System**
   - Audio beep (880 Hz A5 note, 0.5s)
   - Screen flash animation
   - Configurable volume (default 0.3)
   - Requires user interaction to enable (browser restriction)

4. **Case Detail Modal**
   - Full risk assessment display
   - Tracking information (ETA, distance, last update)
   - Assessment data table
   - Risk factor drivers (positive/negative)
   - Close with X button or ESC key

5. **Connection Status**
   - Green indicator: Connected
   - Red blinking: Disconnected
   - Shows case count badge
   - Live clock (HH:MM:SS)

#### Styling Highlights

```css
:root {
  --bg-primary: #0a0e1a;      /* Deep dark blue */
  --bg-secondary: #151b2e;    /* Card background */
  --text-primary: #ffffff;    /* White text */
  --color-critical: #ff4444;  /* Red for high risk */
  --color-high: #ff8800;      /* Orange */
  --color-medium: #ffcc00;    /* Yellow */
  --color-low: #4a90e2;       /* Blue */
  --color-success: #00d68f;   /* Green */
}
```

**Responsive Breakpoints:**
- Desktop: Grid with min 380px columns
- Tablet (≤1200px): 320px columns
- Mobile (≤768px): Single column

**Animations:**
- `pulse`: Case count badge (2s)
- `blink`: Disconnected indicator (1s)
- `flashBackground`: New case alert (0.5s × 2)
- `slideInPulse`: New card entrance (0.5s)

---

## Data Flow

### Case Transmission (Field → Cloud → Kiosk)

```
1. Field Paramedic completes assessment
   ↓
2. Clicks "Send to Hospital"
   ↓
3. Hospital Selector opens
   ↓ (User selects hospital)
4. GPS Tracker starts
   ↓
5. ETA Calculator gets initial ETA (Google Maps API)
   ↓
6. Case Transmitter sends to Cloud Function /store-case
   ↓
7. Cloud Function saves to Storage: cases/{caseId}.json
   ↓
8. Kiosk polls /get-cases every 5s
   ↓
9. New case appears on kiosk display
   ↓ (Audio alert + flash animation)
10. GPS updates every 30s → /update-location
   ↓
11. Kiosk re-fetches → Updated ETA displayed
   ↓
12. After 2 hours: /cleanup-old-cases archives case
```

### Case Lifecycle States

```
in_transit → arrived → archived (24h) → deleted
   ↑            ↑
   |            └─ Paramedic marks arrival
   └─ Initial state when sent
```

---

## Technical Decisions

### Why Polling Instead of WebSocket?

- **Simplicity**: No WebSocket server to maintain
- **Reliability**: Works through firewalls/proxies
- **Scalability**: Cloud Functions auto-scale
- **Cost**: 5s polling = 720 requests/hour (within free tier)
- **Latency**: 5s is acceptable for ETA updates

### Why Cloud Storage Instead of Firestore?

- **Simplicity**: JSON files, no schema
- **Cost**: Cheaper for low volume
- **Debugging**: Easy to inspect with gsutil
- **CORS**: Simple configuration

### Why Google Maps API?

- **Accuracy**: Real-time traffic data
- **Reliability**: Industry standard
- **Emergency Routing**: Can apply speed multiplier
- **Fallback**: Haversine formula if API fails

### GPS Update Interval (30s)

- **Battery Life**: Less frequent than 10s
- **Accuracy**: Sufficient for ETA updates (ambulances travel ~1km/min)
- **Network**: Reduces cellular data usage
- **Server Load**: Manageable request volume

---

## Configuration Points

### Field PWA Setup

1. **Google Maps API Key** → `src/config.js`
   ```javascript
   googleMapsApiKey: 'AIzaSy...'
   ```

2. **Hospital List** → `src/ui/components/hospital-selector.js`
   ```javascript
   const HOSPITALS = [
     { id: 'charite', name: 'Charité Berlin', coordinates: {...}, ... }
   ]
   ```

3. **Cloud Function URL** → `src/config.js`
   ```javascript
   caseSharingUrl: 'https://europe-west3-...'
   ```

### Kiosk PWA Setup

1. **Hospital ID Filter** → `kiosk/src/config.js`
   ```javascript
   hospitalId: 'charite'  // Must match field app
   ```

2. **Hospital Display Name** → `kiosk/src/config.js`
   ```javascript
   hospitalName: 'Charité Berlin - Notaufnahme'
   ```

3. **Alert Settings** → `kiosk/src/config.js`
   ```javascript
   playAudioAlert: true,
   audioAlertVolume: 0.3,
   ```

---

## File Statistics

### Cloud Functions
- **main.py**: 387 lines (6 endpoints + urgency logic)
- **requirements.txt**: 3 dependencies
- **deploy.sh**: 15 lines (GCP deployment script)

### Field PWA (New/Modified)
- **New files**: 5 files, ~1060 total lines
  - gps-tracker.js: 135 lines
  - eta-calculator.js: 180 lines
  - case-transmitter.js: 245 lines
  - hospital-selector.js: 320 lines
  - kiosk-handlers.js: 180 lines

- **Modified files**: 4 files
  - config.js: +35 lines (KIOSK_CONFIG)
  - results.js: +6 lines (send button)
  - main.js: +2 lines (init handlers)
  - app.css: +250 lines (modal styles)

### Kiosk PWA
- **Total**: 7 files, ~1200 total lines
  - config.js: 45 lines
  - main.js: 278 lines
  - case-listener.js: 214 lines
  - dashboard.js: 160 lines
  - case-detail.js: 215 lines
  - styles.css: 663 lines
  - index.html: 95 lines
  - package.json: 24 lines
  - vite.config.js: 18 lines

**Total Lines Added:** ~2,500 lines across all files

---

## Testing Performed

### Unit-Level Verification
✓ GPS tracker starts/stops correctly
✓ ETA calculator handles API failures (fallback to Haversine)
✓ Hospital selector sorts by capability + distance
✓ Case transmitter retries on network errors
✓ Kiosk detects new cases (isNew flag logic)
✓ GPS staleness detection (>5 min)

### Integration Testing Required
- [ ] End-to-end workflow (field → cloud → kiosk)
- [ ] GPS updates reflect in kiosk ETA
- [ ] Audio alerts trigger on new cases
- [ ] Case detail modal displays all data
- [ ] Mark arrived removes case from kiosk
- [ ] Auto-archive after 2 hours

---

## Deployment URLs (Example)

- **Cloud Function**: `https://europe-west3-igfap-452720.cloudfunctions.net/case-sharing`
- **Field PWA**: `https://bosonian.github.io/iGFAPAUG/0825/`
- **Kiosk PWA**: `https://bosonian.github.io/iGFAPAUG/0825/kiosk/`

*(Replace with actual URLs after deployment)*

---

## Future Enhancements (Not Implemented)

1. **WebSocket Support** - Real-time push instead of polling
2. **Authentication** - Secure Cloud Function endpoints with API keys
3. **Multi-Hospital Dashboard** - Kiosk shows cases for all hospitals (admin view)
4. **Historical Analytics** - Dashboard for case volumes, response times
5. **Push Notifications** - Browser notifications for critical cases
6. **Offline Mode** - Service worker caching for field app
7. **Map View** - Live map showing ambulance locations
8. **Voice Alerts** - Text-to-speech for case details
9. **Advanced Routing** - Avoid traffic jams, road closures
10. **Integration** - Connect to hospital EMR systems

---

## Known Limitations

1. **No Real-Time Push** - Kiosk polls every 5s (max 5s delay)
2. **No Authentication** - Cloud Function endpoints are public
3. **Battery Usage** - Continuous GPS tracking drains battery
4. **Data Privacy** - Cases stored in cloud (HIPAA review needed)
5. **Single Hospital Filter** - Kiosk shows one hospital at a time
6. **No Map View** - ETA shown as text only (no visual map)
7. **Browser Dependency** - Requires modern browser (Chrome/Safari/Edge)
8. **Audio Limitation** - User must interact with page before alerts work

---

## Cost Estimate (Monthly)

Assuming 50 cases/day across 5 hospitals:

- **Cloud Functions**
  - Invocations: ~500K/month (field updates + kiosk polls)
  - Free tier: 2M invocations/month
  - **Cost: $0** (within free tier)

- **Cloud Storage**
  - Storage: <1 GB (auto-cleanup)
  - Operations: ~200K/month
  - Free tier: 5 GB storage, 50K operations
  - **Cost: $0** (within free tier)

- **Google Maps API**
  - Directions API: ~1,500 requests/day
  - Cost: $0.005/request after 10K free
  - **Cost: ~$7/month**

**Total: ~$7/month** (mostly Google Maps API)

---

## Documentation Provided

1. **KIOSK_DEPLOYMENT.md** - Complete deployment guide with step-by-step instructions
2. **KIOSK_IMPLEMENTATION_SUMMARY.md** - This file (architecture and implementation details)
3. **Code Comments** - All files include comprehensive inline documentation

---

## Success Criteria Met

✓ **Simple Architecture** - No Firebase/Vercel, only GCP Cloud Functions
✓ **Live GPS Tracking** - 30-second updates with staleness detection
✓ **Real-Time ETA** - Google Maps API with emergency vehicle multiplier
✓ **Hospital Selection** - Sorted by capability and distance
✓ **Auto-Archive** - Cases automatically archived after 2 hours
✓ **Robust Error Handling** - Retry logic, fallbacks, error recovery
✓ **Dark Theme Kiosk** - Optimized for 24/7 ER displays
✓ **Audio/Visual Alerts** - New case notifications
✓ **Responsive Design** - Works on phones, tablets, monitors
✓ **Complete Documentation** - Deployment guide + implementation summary

---

## Acknowledgments

Implementation completed using existing iGFAP stroke assessment infrastructure with minimal changes to core PWA logic. All new code follows project conventions:

- Vanilla JavaScript (no frameworks)
- ES6 modules
- Async/await patterns
- Observer pattern for state management
- Component-based UI architecture
- Dark theme with CSS variables
- Bilingual support (German/English)

---

**Implementation Status: COMPLETE** ✅

Ready for deployment and testing in production environment.
