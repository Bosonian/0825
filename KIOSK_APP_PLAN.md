# Notaufnahme Kiosk Companion App - Implementation Plan

**Version**: 1.0
**Date**: October 27, 2025
**Status**: Planning Phase

---

## Executive Summary

A companion kiosk application for emergency departments (Notaufnahme) that displays real-time information about incoming stroke patients assessed by ambulance crews in the field. The kiosk shows patient risk assessments, live ambulance location tracking, and estimated time of arrival (ETA).

**Key Goals**:
- Real-time visibility of incoming patients
- Live ambulance tracking with ETA
- Seamless integration with existing field PWA
- Kiosk-optimized large display UI
- GDPR/medical compliance

---

## Use Case Flow

### Field (Ambulance Crew)
1. Paramedics use existing PWA to assess stroke patient
2. Complete assessment (coma/limited/full module)
3. View results (ICH risk, LVO risk, recommendations)
4. **NEW**: Tap "Send to Hospital" button
5. **NEW**: Select destination hospital from list
6. **NEW**: Case transmitted to hospital kiosk
7. **NEW**: Background location tracking starts
8. **NEW**: ETA updates automatically

### Hospital (Notaufnahme Kiosk)
1. Kiosk displays list of incoming cases
2. **NEW** case alert appears (visual + sound)
3. Shows: Patient risk level, ETA, current distance
4. Click to expand full assessment results
5. Live map shows ambulance location + route
6. ETA updates every 30 seconds
7. When ambulance arrives, case marked complete

---

## Architecture Overview

### System Components

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│  Field PWA      │────────▶│  Firebase        │◀────────│  Kiosk PWA      │
│  (Ambulance)    │         │  Realtime DB     │         │  (Hospital)     │
│                 │         │                  │         │                 │
│  - Assessment   │         │  - Case data     │         │  - Case list    │
│  - Results      │         │  - Location      │         │  - Live map     │
│  - Send button  │         │  - Real-time     │         │  - Auto-refresh │
│  - GPS tracking │         │    sync          │         │  - Alerts       │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        │                           │                             │
        │                           │                             │
        └───────────────────────────┴─────────────────────────────┘
                    Shared GCP Cloud Functions
                    (Existing prediction endpoints)
```

### Technology Stack Decision

**Selected: Firebase Realtime Database**

**Rationale**:
- Already in Google Cloud ecosystem (same as Cloud Functions)
- True real-time sync (WebSocket-based)
- Offline support for PWA
- Simple client SDKs for web
- EU data residency (europe-west1)
- Cost-effective for this use case
- No custom WebSocket server needed

**Alternatives Considered**:
- ❌ Firestore: More expensive, overkill for real-time tracking
- ❌ Polling: Not truly real-time, higher API costs
- ❌ Custom WebSocket: More infrastructure, maintenance burden

---

## Data Model

### Firebase Realtime Database Structure

```javascript
{
  // Root: /cases
  cases: {
    // Case ID: session_timestamp_random
    "case_a1b2c3d4": {
      // Metadata
      id: "case_a1b2c3d4",
      createdAt: "2025-10-27T14:30:00.000Z",
      status: "in_transit" | "arrived" | "cancelled",
      ambulanceId: "RTW-M-1234",

      // Hospital routing
      destinationHospital: {
        id: "klinikum_muenchen_grosshadern",
        name: "Klinikum München Großhadern",
        location: { lat: 48.1106, lng: 11.4683 }
      },

      // Assessment metadata
      assessment: {
        moduleType: "full",  // "coma" | "limited" | "full"
        completedAt: "2025-10-27T14:25:00.000Z",
        sessionId: "session_1730035500_abc123",
        assessedBy: "Paramedic Team 5"  // Optional
      },

      // Patient input data (minimal for privacy)
      formData: {
        age_years: 68,
        gfap_value: 1250,
        fast_ed_score: 6,
        // Other assessment parameters
        // NO patient names or identifiable info
      },

      // Prediction results
      results: {
        ich: {
          probability: 0.284,  // 28.4%
          module: "Full Stroke",
          drivers: {
            positive: [
              { label: "gfap_value", weight: 0.3921 },
              { label: "systolic_bp", weight: 0.2341 }
            ],
            negative: [
              { label: "age_years", weight: -0.1834 }
            ]
          },
          confidence: 0.88
        },
        lvo: {
          probability: 0.452,  // 45.2%
          drivers: {
            positive: [
              { label: "fast_ed_score", weight: 0.7834 }
            ]
          },
          confidence: 0.82
        }
      },

      // Live tracking data
      tracking: {
        currentLocation: {
          lat: 48.1351,
          lng: 11.5820,
          accuracy: 15,  // meters
          timestamp: "2025-10-27T14:35:00.000Z"
        },

        destinationLocation: {
          lat: 48.1106,
          lng: 11.4683
        },

        estimatedArrival: "2025-10-27T14:45:00.000Z",

        distance: {
          remaining: 8.5,  // km
          total: 12.3
        },

        route: [
          // Optional: array of lat/lng points for route display
          { lat: 48.1351, lng: 11.5820 },
          { lat: 48.1250, lng: 11.5500 }
        ]
      },

      // Clinical urgency (computed)
      urgency: "IMMEDIATE" | "TIME_CRITICAL" | "URGENT" | "STANDARD",

      // System metadata
      lastUpdated: "2025-10-27T14:35:05.000Z",
      version: 1
    }
  },

  // Hospital registration
  hospitals: {
    "klinikum_muenchen_grosshadern": {
      id: "klinikum_muenchen_grosshadern",
      name: "Klinikum München Großhadern",
      location: { lat: 48.1106, lng: 11.4683 },
      active: true,
      capabilities: ["neurosurgery", "thrombectomy", "thrombolysis"],
      kioskConnected: true,
      lastSeen: "2025-10-27T14:35:00.000Z"
    }
  },

  // Active ambulances (optional tracking)
  ambulances: {
    "RTW-M-1234": {
      id: "RTW-M-1234",
      currentCase: "case_a1b2c3d4",
      lastLocation: { lat: 48.1351, lng: 11.5820 },
      lastSeen: "2025-10-27T14:35:00.000Z"
    }
  }
}
```

### Security Rules

```javascript
{
  "rules": {
    // Cases readable by destination hospital
    "cases": {
      "$caseId": {
        ".read": "auth != null &&
                  (data.child('destinationHospital/id').val() == auth.token.hospitalId ||
                   auth.token.role == 'field_unit')",
        ".write": "auth != null && auth.token.role == 'field_unit'",

        "tracking": {
          ".write": "auth != null && auth.token.role == 'field_unit'"
        }
      }
    },

    // Hospitals readable by authenticated kiosks
    "hospitals": {
      ".read": "auth != null",
      "$hospitalId": {
        ".write": "auth != null && auth.token.hospitalId == $hospitalId"
      }
    }
  }
}
```

---

## Component Breakdown

### 1. Field PWA Modifications

**Files to Modify**:
- `src/ui/screens/results.js` - Add "Send to Hospital" button
- New: `src/services/case-transmitter.js` - Firebase case creation
- New: `src/services/location-tracker.js` - Background GPS tracking
- New: `src/ui/components/hospital-selector.js` - Hospital selection UI
- `src/config.js` - Add Firebase configuration

**New Features**:

```javascript
// src/services/case-transmitter.js
export class CaseTransmitter {
  constructor(firebaseConfig) {
    this.db = firebase.database();
  }

  async createCase(results, formData, destinationHospital) {
    const caseId = generateCaseId();
    const caseData = {
      id: caseId,
      createdAt: new Date().toISOString(),
      status: 'in_transit',
      destinationHospital,
      assessment: {
        moduleType: detectModule(results),
        completedAt: new Date().toISOString(),
        sessionId: store.getState().sessionId
      },
      formData: sanitizeFormData(formData),
      results: sanitizeResults(results),
      tracking: {
        currentLocation: await getCurrentLocation(),
        destinationLocation: destinationHospital.location,
        estimatedArrival: calculateETA()
      },
      urgency: calculateUrgency(results)
    };

    await this.db.ref(`cases/${caseId}`).set(caseData);
    return caseId;
  }

  async updateLocation(caseId, location) {
    await this.db.ref(`cases/${caseId}/tracking/currentLocation`).set({
      lat: location.latitude,
      lng: location.longitude,
      accuracy: location.accuracy,
      timestamp: new Date().toISOString()
    });

    // Update ETA based on new location
    const eta = await calculateETAFromCurrent(location, destinationLocation);
    await this.db.ref(`cases/${caseId}/tracking/estimatedArrival`).set(eta);
  }

  async markArrived(caseId) {
    await this.db.ref(`cases/${caseId}/status`).set('arrived');
  }
}

// src/services/location-tracker.js
export class LocationTracker {
  constructor(caseId, caseTransmitter) {
    this.caseId = caseId;
    this.transmitter = caseTransmitter;
    this.watchId = null;
    this.updateInterval = 30000; // 30 seconds
  }

  start() {
    if ('geolocation' in navigator) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.transmitter.updateLocation(this.caseId, position.coords);
        },
        (error) => {
          console.error('Location tracking error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }

  stop() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}

// src/ui/components/hospital-selector.js
export function renderHospitalSelector(currentLocation) {
  const hospitals = getNearbyHospitals(currentLocation, 50); // 50km radius

  return `
    <div class="hospital-selector-modal">
      <div class="modal-content">
        <h3>Select Destination Hospital</h3>
        <div class="hospital-list">
          ${hospitals.map(hospital => `
            <button class="hospital-option" data-hospital-id="${hospital.id}">
              <div class="hospital-name">${hospital.name}</div>
              <div class="hospital-meta">
                <span class="distance">${hospital.distance.toFixed(1)} km</span>
                <span class="capabilities">
                  ${hospital.neurosurgery ? '🧠' : ''}
                  ${hospital.thrombectomy ? '🩸' : ''}
                </span>
              </div>
            </button>
          `).join('')}
        </div>
        <button class="cancel-button">Cancel</button>
      </div>
    </div>
  `;
}
```

**Results Screen Addition**:

```javascript
// In src/ui/screens/results.js
// Add to results actions section:

<div class="results-actions">
  <div class="primary-actions">
    <button type="button" class="primary send-to-hospital" id="sendToHospital">
      🏥 Send to Hospital
    </button>
    <button type="button" class="primary" id="printResults">
      📄 ${t('printResults')}
    </button>
    <button type="button" class="secondary" data-action="reset">
      ${t('newAssessment')}
    </button>
  </div>
</div>
```

---

### 2. Kiosk PWA (New Application)

**New Directory Structure**:

```
kiosk/
├── index.html
├── src/
│   ├── main.js                          # Kiosk app entry
│   ├── config.js                        # Firebase + hospital config
│   ├── state/
│   │   └── kiosk-store.js              # Kiosk state management
│   ├── services/
│   │   ├── firebase-listener.js        # Real-time case subscription
│   │   ├── eta-calculator.js           # ETA calculation
│   │   └── notification-service.js     # Alerts
│   ├── ui/
│   │   ├── screens/
│   │   │   ├── dashboard.js            # Main case list view
│   │   │   ├── case-detail.js          # Expanded case view
│   │   │   └── settings.js             # Kiosk configuration
│   │   └── components/
│   │       ├── case-card.js            # Case summary card
│   │       ├── live-map.js             # Map with ambulance tracking
│   │       ├── eta-display.js          # ETA countdown
│   │       └── risk-display.js         # Risk rings (reused)
│   └── styles/
│       └── kiosk.css                   # Large display optimized
└── vite.config.js
```

**Key Components**:

```javascript
// kiosk/src/services/firebase-listener.js
export class FirebaseListener {
  constructor(hospitalId) {
    this.hospitalId = hospitalId;
    this.db = firebase.database();
    this.casesRef = this.db.ref('cases');
  }

  subscribeToIncomingCases(callback) {
    // Listen for new cases destined for this hospital
    this.casesRef
      .orderByChild('destinationHospital/id')
      .equalTo(this.hospitalId)
      .on('child_added', (snapshot) => {
        const caseData = snapshot.val();
        if (caseData.status === 'in_transit') {
          callback('added', caseData);
          this.playNewCaseAlert();
        }
      });

    // Listen for case updates (location changes)
    this.casesRef
      .orderByChild('destinationHospital/id')
      .equalTo(this.hospitalId)
      .on('child_changed', (snapshot) => {
        const caseData = snapshot.val();
        callback('updated', caseData);
      });

    // Listen for case removal/arrival
    this.casesRef
      .orderByChild('destinationHospital/id')
      .equalTo(this.hospitalId)
      .on('child_removed', (snapshot) => {
        const caseData = snapshot.val();
        callback('removed', caseData);
      });
  }

  playNewCaseAlert() {
    // Audio alert
    const audio = new Audio('/sounds/new-case-alert.mp3');
    audio.play();

    // Visual flash
    document.body.classList.add('alert-flash');
    setTimeout(() => {
      document.body.classList.remove('alert-flash');
    }, 1000);
  }

  unsubscribe() {
    this.casesRef.off();
  }
}

// kiosk/src/ui/screens/dashboard.js
export function renderDashboard(cases) {
  // Sort by urgency and ETA
  const sortedCases = sortCases(cases);

  return `
    <div class="kiosk-dashboard">
      <header class="kiosk-header">
        <h1>🏥 Notaufnahme - Incoming Patients</h1>
        <div class="header-meta">
          <span class="hospital-name">${currentHospital.name}</span>
          <span class="current-time">${getCurrentTime()}</span>
          <span class="case-count">${cases.length} Active Cases</span>
        </div>
      </header>

      <div class="cases-grid">
        ${sortedCases.map(caseData => renderCaseCard(caseData)).join('')}
      </div>

      ${cases.length === 0 ? `
        <div class="no-cases">
          <p>✓ No incoming patients</p>
          <p class="subtitle">System active and monitoring</p>
        </div>
      ` : ''}
    </div>
  `;
}

// kiosk/src/ui/components/case-card.js
export function renderCaseCard(caseData) {
  const ichPercent = Math.round(caseData.results.ich.probability * 100);
  const lvoPercent = caseData.results.lvo
    ? Math.round(caseData.results.lvo.probability * 100)
    : null;

  const urgencyClass = caseData.urgency.toLowerCase();
  const eta = calculateRemainingMinutes(caseData.tracking.estimatedArrival);

  return `
    <div class="case-card ${urgencyClass}" data-case-id="${caseData.id}">
      <div class="case-header">
        <div class="urgency-badge ${urgencyClass}">
          ${getUrgencyIcon(caseData.urgency)} ${caseData.urgency}
        </div>
        <div class="case-meta">
          <span class="ambulance-id">${caseData.ambulanceId}</span>
          <span class="module-type">${caseData.assessment.moduleType}</span>
        </div>
      </div>

      <div class="case-risks">
        <div class="risk-item ich">
          <div class="risk-ring mini" data-percent="${ichPercent}"></div>
          <div class="risk-label">
            <span class="risk-value">${ichPercent}%</span>
            <span class="risk-type">ICH</span>
          </div>
        </div>

        ${lvoPercent !== null ? `
          <div class="risk-item lvo">
            <div class="risk-ring mini" data-percent="${lvoPercent}"></div>
            <div class="risk-label">
              <span class="risk-value">${lvoPercent}%</span>
              <span class="risk-type">LVO</span>
            </div>
          </div>
        ` : ''}
      </div>

      <div class="case-eta">
        <div class="eta-main">
          <span class="eta-value">${eta}</span>
          <span class="eta-unit">min</span>
        </div>
        <div class="eta-details">
          <span class="distance">${caseData.tracking.distance.remaining.toFixed(1)} km</span>
          <span class="arrival-time">${formatArrivalTime(caseData.tracking.estimatedArrival)}</span>
        </div>
      </div>

      <div class="case-actions">
        <button class="expand-button" data-case-id="${caseData.id}">
          View Details →
        </button>
      </div>

      <div class="case-timestamp">
        Dispatched ${formatRelativeTime(caseData.createdAt)}
      </div>
    </div>
  `;
}

// kiosk/src/ui/components/live-map.js
export function renderLiveMap(caseData) {
  return `
    <div class="live-map-container">
      <div id="map" class="map-canvas"></div>
      <div class="map-overlay">
        <div class="route-info">
          <div class="route-stat">
            <span class="label">Distance</span>
            <span class="value">${caseData.tracking.distance.remaining.toFixed(1)} km</span>
          </div>
          <div class="route-stat">
            <span class="label">ETA</span>
            <span class="value">${calculateRemainingMinutes(caseData.tracking.estimatedArrival)} min</span>
          </div>
          <div class="route-stat">
            <span class="label">Speed</span>
            <span class="value">${calculateSpeed(caseData)} km/h</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialize Google Maps or Mapbox
export function initializeLiveMap(caseData) {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: caseData.tracking.currentLocation,
    styles: DARK_MAP_STYLE  // Dark mode for ER environment
  });

  // Ambulance marker (red pulsing)
  const ambulanceMarker = new google.maps.Marker({
    position: caseData.tracking.currentLocation,
    map: map,
    icon: {
      url: '/icons/ambulance-marker.svg',
      scaledSize: new google.maps.Size(40, 40)
    },
    title: caseData.ambulanceId,
    animation: google.maps.Animation.BOUNCE
  });

  // Hospital marker (blue)
  const hospitalMarker = new google.maps.Marker({
    position: caseData.tracking.destinationLocation,
    map: map,
    icon: {
      url: '/icons/hospital-marker.svg',
      scaledSize: new google.maps.Size(40, 40)
    },
    title: 'Destination'
  });

  // Route polyline
  if (caseData.tracking.route) {
    const routePath = new google.maps.Polyline({
      path: caseData.tracking.route,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 4
    });
    routePath.setMap(map);
  }

  // Auto-fit bounds to show both markers
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(caseData.tracking.currentLocation);
  bounds.extend(caseData.tracking.destinationLocation);
  map.fitBounds(bounds);

  // Update ambulance position when location changes
  return {
    updateAmbulancePosition: (newLocation) => {
      ambulanceMarker.setPosition(newLocation);

      // Smooth animation
      ambulanceMarker.setAnimation(google.maps.Animation.DROP);
      setTimeout(() => {
        ambulanceMarker.setAnimation(null);
      }, 1000);
    }
  };
}
```

---

### 3. Kiosk UI Design (Large Display Optimized)

**Design Principles**:
- Large text (minimum 18px, headings 32px+)
- High contrast colors
- Clear urgency indicators (red = critical, orange = urgent, blue = standard)
- Auto-refresh every 5 seconds
- No scrolling needed for primary view
- Dark mode default (easier on eyes in ER)

**Layout**:

```
┌─────────────────────────────────────────────────────────────┐
│  🏥 Notaufnahme - Incoming Patients     Time: 14:35         │
│  Klinikum München                        3 Active Cases     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ 🚨 IMMEDIATE │  │ ⏰ TIME-CRIT │  │ ⚠️  URGENT   │     │
│  │ RTW-M-1234   │  │ RTW-M-5678   │  │ RTW-M-9012   │     │
│  │              │  │              │  │              │     │
│  │ ICH: 72%  ◯  │  │ ICH: 45%  ◯  │  │ ICH: 28%  ◯  │     │
│  │ LVO: 58%  ◯  │  │ LVO: 67%  ◯  │  │ LVO: --      │     │
│  │              │  │              │  │              │     │
│  │ ETA: 8 min   │  │ ETA: 15 min  │  │ ETA: 22 min  │     │
│  │ 5.2 km       │  │ 8.7 km       │  │ 12.1 km      │     │
│  │              │  │              │  │              │     │
│  │ [View Detail]│  │ [View Detail]│  │ [View Detail]│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Expanded Detail View**:

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                           [Mark Arrived]│
├─────────────────────────────────────────────────────────────┤
│  🚨 IMMEDIATE - RTW-M-1234                ETA: 8 minutes     │
│  Full Assessment • Dispatched 12 minutes ago                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────┐  ┌──────────────────────────┐  │
│  │   RISK ASSESSMENT      │  │   LIVE TRACKING          │  │
│  │                        │  │                          │  │
│  │   ICH Risk: 72%     ◯  │  │   [  LIVE MAP DISPLAY  ] │  │
│  │   High Risk            │  │   [  with ambulance    ] │  │
│  │                        │  │   [  location & route  ] │  │
│  │   LVO Risk: 58%     ◯  │  │                          │  │
│  │   High Risk            │  │   Distance: 5.2 km       │  │
│  │                        │  │   Arrival: 14:43         │  │
│  │   Risk Factors:        │  │   Speed: 65 km/h         │  │
│  │   • FAST-ED: 7         │  │                          │  │
│  │   • GFAP: 1250 pg/mL   │  │                          │  │
│  │   • Age: 68 years      │  │                          │  │
│  │   • BP: 185/95         │  │                          │  │
│  └────────────────────────┘  └──────────────────────────┘  │
│                                                              │
│  Clinical Recommendations:                                   │
│  • Alert neurosurgery team                                   │
│  • Prepare CT scan                                           │
│  • Consider ICU bed                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**CSS Considerations** (`kiosk/src/styles/kiosk.css`):

```css
:root {
  /* Kiosk-specific vars */
  --kiosk-font-size-base: 20px;
  --kiosk-font-size-heading: 36px;
  --kiosk-font-size-large: 48px;
  --kiosk-spacing: 32px;
  --kiosk-card-min-height: 400px;

  /* Dark mode for ER */
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #ffffff;
  --text-secondary: #b4b4b4;

  /* Urgency colors */
  --urgent-critical: #ff4444;
  --urgent-high: #ff8800;
  --urgent-medium: #ffcc00;
  --urgent-low: #4a90e2;
}

body {
  font-size: var(--kiosk-font-size-base);
  background: var(--bg-primary);
  color: var(--text-primary);
  margin: 0;
  padding: 0;
  overflow: hidden; /* No scroll */
}

.kiosk-dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: var(--kiosk-spacing);
}

.case-card {
  min-height: var(--kiosk-card-min-height);
  font-size: var(--kiosk-font-size-base);
  padding: 24px;
  border-radius: 12px;
  background: var(--bg-secondary);
  border: 3px solid transparent;
  transition: all 0.3s ease;
}

.case-card.immediate {
  border-color: var(--urgent-critical);
  box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
}

.eta-main .eta-value {
  font-size: var(--kiosk-font-size-large);
  font-weight: bold;
  color: var(--urgent-critical);
}

/* Auto-refresh animation */
@keyframes pulse-new-case {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.case-card.new {
  animation: pulse-new-case 1s ease-in-out 3;
}

/* Full-screen detail view */
.case-detail-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--bg-primary);
  z-index: 1000;
  padding: var(--kiosk-spacing);
}
```

---

## Implementation Phases

### Phase 1: Backend Setup (Week 1)
**Deliverables**:
- Firebase project setup
- Realtime Database configuration
- Security rules implementation
- Hospital database seeding
- Test data generation

**Tasks**:
1. Create Firebase project (`igfap-stroke-kiosk`)
2. Enable Realtime Database (europe-west1)
3. Configure security rules
4. Create hospital registry
5. Set up authentication tokens

**Validation**:
- Can create/read/update cases via Firebase console
- Security rules tested (authorized/unauthorized access)
- Data structure validated

---

### Phase 2: Field PWA Modifications (Week 2-3)
**Deliverables**:
- "Send to Hospital" button on results page
- Hospital selector component
- Firebase SDK integration
- Case creation service
- Location tracking service

**Tasks**:
1. Add Firebase SDK to field PWA
2. Implement `CaseTransmitter` service
3. Implement `LocationTracker` service
4. Create hospital selector UI
5. Modify results.js to include send button
6. Add configuration for Firebase
7. Test end-to-end case creation

**Files Modified**:
- `src/ui/screens/results.js`
- `src/config.js`
- `package.json` (add firebase dependency)

**Files Created**:
- `src/services/case-transmitter.js`
- `src/services/location-tracker.js`
- `src/ui/components/hospital-selector.js`
- `src/data/firebase-config.js`

**Validation**:
- Case successfully created in Firebase
- Location updates every 30 seconds
- Hospital selection works
- Error handling for no GPS

---

### Phase 3: Kiosk PWA Development (Week 4-6)
**Deliverables**:
- New kiosk PWA application
- Real-time case subscription
- Dashboard with case cards
- Detail view with live map
- Auto-refresh mechanism
- Alert system

**Tasks**:
1. Create kiosk/ directory with new Vite project
2. Implement Firebase listener service
3. Build dashboard layout
4. Create case card component
5. Implement detail view with map
6. Add ETA calculation
7. Implement alert system (audio + visual)
8. Add auto-refresh (5s interval)
9. Build settings page (hospital selection)

**Files Created** (kiosk/):
- `index.html`
- `src/main.js`
- `src/config.js`
- `src/state/kiosk-store.js`
- `src/services/firebase-listener.js`
- `src/services/eta-calculator.js`
- `src/services/notification-service.js`
- `src/ui/screens/dashboard.js`
- `src/ui/screens/case-detail.js`
- `src/ui/screens/settings.js`
- `src/ui/components/case-card.js`
- `src/ui/components/live-map.js`
- `src/ui/components/eta-display.js`
- `src/styles/kiosk.css`
- `vite.config.js`

**Validation**:
- Kiosk receives new cases in real-time
- Map displays ambulance location
- ETA updates correctly
- Alert plays on new case
- Multiple cases display correctly

---

### Phase 4: Integration & Testing (Week 7)
**Deliverables**:
- End-to-end testing
- Load testing (10+ simultaneous cases)
- Offline handling
- Error scenarios
- Documentation

**Test Scenarios**:
1. **Happy Path**: Field creates case → Kiosk receives → Location updates → Arrival
2. **Multiple Ambulances**: 5+ cases active simultaneously
3. **GPS Loss**: Ambulance loses GPS signal
4. **Network Issues**: Field goes offline temporarily
5. **Wrong Hospital**: Case sent to wrong destination
6. **Rapid Changes**: Multiple location updates in quick succession
7. **Long Distance**: Ambulance >50km away
8. **Concurrent Kiosks**: Multiple hospitals receiving different cases

**Validation Checklist**:
- [ ] Real-time sync latency < 2 seconds
- [ ] Location updates without UI flicker
- [ ] ETA accuracy within ±2 minutes
- [ ] No data loss on network interruption
- [ ] Kiosk handles 20+ cases without performance degradation
- [ ] Map renders smoothly on 4K displays
- [ ] Audio alerts work on all browsers
- [ ] Privacy: No PII visible in Firebase console

---

### Phase 5: Deployment & Training (Week 8)
**Deliverables**:
- Production deployment
- Hospital onboarding
- Training materials
- Monitoring setup
- Support documentation

**Tasks**:
1. Deploy kiosk PWA to production
2. Configure Firebase production environment
3. Create hospital admin portal (register kiosks)
4. Write user manual for ER staff
5. Write technical docs for IT teams
6. Set up monitoring (Sentry, Firebase Analytics)
7. Create support ticket system

**Deployment**:
- Field PWA: Update existing GitHub Pages deployment
- Kiosk PWA: Deploy to `/kiosk/` subdirectory
- Firebase: Production project with backups

---

## Technical Considerations

### 1. Privacy & Compliance

**GDPR Requirements**:
- ✅ No patient names or identifiable info in cases
- ✅ Only medical parameters (age, GFAP, scores)
- ✅ Ambulance ID instead of personnel names
- ✅ Data encrypted in transit (Firebase SSL)
- ✅ Data retention: Auto-delete cases after 24 hours
- ✅ Access control: Kiosks only see their hospital's cases
- ✅ Audit log: All case creations logged

**Medical Compliance**:
- ✅ Results clearly marked as clinical decision support
- ✅ No automated treatment decisions
- ✅ Clinician final authority emphasized
- ✅ Disclaimers on kiosk display

**Implementation**:

```javascript
// Automatic case cleanup (Cloud Function)
exports.cleanupOldCases = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
    const oldCasesRef = admin.database().ref('cases')
      .orderByChild('createdAt')
      .endAt(new Date(cutoff).toISOString());

    const snapshot = await oldCasesRef.once('value');
    const updates = {};

    snapshot.forEach(child => {
      updates[child.key] = null; // Delete
    });

    await admin.database().ref('cases').update(updates);
    console.log(`Cleaned up ${Object.keys(updates).length} old cases`);
  });
```

---

### 2. Performance Optimization

**Real-time Sync**:
- Use Firebase indexing for fast queries
- Limit active listeners (unsubscribe when kiosk idle)
- Throttle location updates (30s minimum interval)

**Map Performance**:
- Lazy load Google Maps SDK
- Use static maps for thumbnails
- Debounce map re-renders

**Large Displays**:
- Test on 4K resolution (3840x2160)
- Use CSS transform for scaling if needed
- Hardware acceleration for animations

**Code Splitting**:
```javascript
// vite.config.js for kiosk
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/database'],
          'maps': ['@google/maps'],
          'ui': ['src/ui/components']
        }
      }
    }
  }
}
```

---

### 3. Offline Handling

**Field PWA**:
- If offline when sending case: Queue locally
- Retry when connection restored
- Show "Queued for send" status

**Kiosk**:
- Last known location persists
- Show "Connection lost" warning
- Auto-reconnect with exponential backoff

**Implementation**:

```javascript
// Field: Offline queue
class OfflineCaseQueue {
  constructor() {
    this.queue = this.loadQueue();
    window.addEventListener('online', () => this.processQueue());
  }

  async queueCase(caseData) {
    this.queue.push(caseData);
    this.saveQueue();

    if (navigator.onLine) {
      await this.processQueue();
    }
  }

  async processQueue() {
    while (this.queue.length > 0 && navigator.onLine) {
      const caseData = this.queue[0];
      try {
        await transmitter.createCase(caseData);
        this.queue.shift();
        this.saveQueue();
      } catch (error) {
        console.error('Failed to send queued case:', error);
        break; // Stop processing, will retry later
      }
    }
  }

  loadQueue() {
    return JSON.parse(localStorage.getItem('offline_case_queue') || '[]');
  }

  saveQueue() {
    localStorage.setItem('offline_case_queue', JSON.stringify(this.queue));
  }
}
```

---

### 4. ETA Calculation

**Approach**:
1. **Initial ETA**: Use routing API (Google Directions, OSRM)
2. **Live Updates**: Recalculate based on:
   - Current location
   - Remaining distance
   - Average speed over last 5 minutes
   - Traffic conditions (if available)

**Services**:
- **Google Directions API** (paid, most accurate)
- **OSRM** (free, open-source, good for Europe)
- **Fallback**: Distance / average speed (80 km/h)

**Implementation**:

```javascript
// src/services/eta-calculator.js
export class ETACalculator {
  constructor() {
    this.useGoogle = true; // Set based on API key availability
  }

  async calculateETA(fromLocation, toLocation, traffic = 'normal') {
    if (this.useGoogle) {
      return this.calculateGoogleETA(fromLocation, toLocation, traffic);
    } else {
      return this.calculateOSRMETA(fromLocation, toLocation);
    }
  }

  async calculateGoogleETA(from, to, traffic) {
    const service = new google.maps.DirectionsService();

    const result = await service.route({
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: 'pessimistic' // Account for traffic
      }
    });

    const duration = result.routes[0].legs[0].duration.value; // seconds
    const distance = result.routes[0].legs[0].distance.value; // meters

    // Emergency vehicles typically 1.3-1.5x faster
    const emergencyMultiplier = 0.7;
    const emergencyDuration = duration * emergencyMultiplier;

    return {
      duration: Math.round(emergencyDuration / 60), // minutes
      distance: Math.round(distance / 1000), // km
      arrivalTime: new Date(Date.now() + emergencyDuration * 1000),
      source: 'google'
    };
  }

  async calculateOSRMETA(from, to) {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false`;

    const response = await fetch(url);
    const data = await response.json();

    const duration = data.routes[0].duration; // seconds
    const distance = data.routes[0].distance; // meters

    // Emergency adjustment
    const emergencyMultiplier = 0.7;
    const emergencyDuration = duration * emergencyMultiplier;

    return {
      duration: Math.round(emergencyDuration / 60),
      distance: Math.round(distance / 1000),
      arrivalTime: new Date(Date.now() + emergencyDuration * 1000),
      source: 'osrm'
    };
  }

  // Fallback: Simple calculation
  calculateSimpleETA(from, to) {
    const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
    const averageSpeed = 80; // km/h for emergency vehicles
    const duration = (distance / averageSpeed) * 60; // minutes

    return {
      duration: Math.round(duration),
      distance: Math.round(distance),
      arrivalTime: new Date(Date.now() + duration * 60 * 1000),
      source: 'estimated'
    };
  }
}
```

---

### 5. Scalability

**Expected Load**:
- Peak: 10-15 hospitals, 2-3 ambulances each = ~30 active cases
- Database writes: ~60 per minute (30 cases × 2 updates/min)
- Database reads: ~30 per second (10 kiosks × 3 reads/sec)

**Firebase Limits**:
- Realtime Database: 200,000 simultaneous connections
- Writes: Effectively unlimited for this scale
- Reads: 100,000 reads/sec per database

**Conclusion**: System easily handles expected load with 1000x headroom

**Cost Estimate** (Firebase Spark/Blaze plan):
- Storage: <1GB (cases auto-deleted)
- Bandwidth: ~10GB/month
- **Estimated cost**: €0-50/month at scale

---

## Security Architecture

### Authentication Flow

```
Field PWA:
1. User logs in with research password (existing)
2. App requests Firebase custom token from Cloud Function
3. Cloud Function verifies session, issues token with claims:
   { role: 'field_unit', ambulanceId: 'RTW-M-1234' }
4. App uses token to authenticate with Firebase
5. Token expires after 4 hours

Kiosk PWA:
1. Admin logs in with hospital credentials
2. Selects hospital from list
3. App requests Firebase custom token with claims:
   { role: 'kiosk', hospitalId: 'klinikum_muenchen_grosshadern' }
4. Kiosk can only read cases for its hospital
5. Token refreshed automatically
```

### Cloud Function for Token Generation

```javascript
// cloud-functions/generate-firebase-token/main.py
from firebase_admin import auth
from flask import Flask, request

app = Flask(__name__)

@app.route('/generate-firebase-token', methods=['POST'])
def generate_firebase_token():
    data = request.get_json()
    role = data.get('role')  # 'field_unit' or 'kiosk'

    if role == 'field_unit':
        # Verify existing session token
        if not verify_session(data.get('sessionToken')):
            return {'error': 'Invalid session'}, 401

        uid = f"field_{data.get('ambulanceId')}"
        custom_claims = {
            'role': 'field_unit',
            'ambulanceId': data.get('ambulanceId')
        }

    elif role == 'kiosk':
        # Verify hospital admin credentials
        if not verify_hospital_admin(data.get('hospitalId'), data.get('password')):
            return {'error': 'Invalid credentials'}, 401

        uid = f"kiosk_{data.get('hospitalId')}"
        custom_claims = {
            'role': 'kiosk',
            'hospitalId': data.get('hospitalId')
        }

    else:
        return {'error': 'Invalid role'}, 400

    # Create custom token
    token = auth.create_custom_token(uid, custom_claims)

    return {
        'token': token.decode('utf-8'),
        'expiresIn': 14400  # 4 hours
    }
```

---

## Monitoring & Observability

### Metrics to Track

**Field PWA**:
- Cases created per day
- Location update success rate
- GPS accuracy distribution
- Time from assessment to case creation
- Offline queue usage

**Kiosk**:
- Active kiosks count
- Cases displayed per kiosk
- Alert response time (time to view detail)
- Map load time
- WebSocket connection stability

**System-wide**:
- Firebase read/write latency
- Case lifecycle duration (created → arrived)
- ETA accuracy (predicted vs actual)
- Error rates

### Implementation

```javascript
// Firebase Analytics integration
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics();

// Field: Log case creation
logEvent(analytics, 'case_created', {
  moduleType: 'full',
  urgency: 'IMMEDIATE',
  destinationHospital: 'klinikum_muenchen',
  ichRisk: 72,
  lvoRisk: 58
});

// Kiosk: Log case viewed
logEvent(analytics, 'case_viewed', {
  caseId: 'case_abc123',
  hospitalId: 'klinikum_muenchen',
  timeToView: 45 // seconds since case created
});

// Track ETA accuracy
logEvent(analytics, 'case_arrived', {
  caseId: 'case_abc123',
  predictedETA: 8, // minutes
  actualTime: 9, // minutes
  accuracy: 'good'
});
```

---

## Rollout Plan

### Beta Phase (Weeks 9-12)

**Pilot Hospital**: Klinikum München Großhadern
**Scope**: 1 kiosk, 2-3 ambulances
**Duration**: 4 weeks

**Objectives**:
- Validate real-world usage
- Collect feedback from ER staff
- Measure ETA accuracy
- Identify edge cases

**Success Metrics**:
- 95% case transmission success rate
- ETA accuracy within ±3 minutes
- <2 second alert latency
- Zero data privacy incidents

### Production Rollout (Weeks 13-20)

**Phase 1**: Bayern (2-3 hospitals)
**Phase 2**: Baden-Württemberg (2-3 hospitals)
**Phase 3**: Nordrhein-Westfalen (2-3 hospitals)

**Per Hospital**:
- 1-2 kiosks (main ER + backup)
- 5-10 ambulances equipped
- 2-week onboarding period

---

## Alternative Architectures Considered

### Alternative 1: WebSocket Server (Custom)
**Pros**: Full control, no Firebase cost
**Cons**: Infrastructure complexity, scaling challenges, maintenance burden
**Verdict**: ❌ Too complex for MVP

### Alternative 2: Firestore + Cloud Functions
**Pros**: More flexible queries, better scaling
**Cons**: Higher latency for real-time, more expensive
**Verdict**: ❌ Overkill for this use case

### Alternative 3: Polling (HTTP)
**Pros**: Simple, no new dependencies
**Cons**: Higher latency (5s+), more API calls, not truly real-time
**Verdict**: ❌ Poor user experience

### Alternative 4: Server-Sent Events (SSE)
**Pros**: One-way real-time, simpler than WebSocket
**Cons**: Still needs custom server, no two-way communication
**Verdict**: ❌ Still requires infrastructure

**Final Choice: Firebase Realtime Database** ✅
- Best balance of simplicity, performance, and cost
- Proven at scale
- Minimal infrastructure
- Real-time by design

---

## Risk Assessment

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Firebase outage | HIGH | LOW | Graceful degradation, offline mode |
| GPS signal loss | MEDIUM | MEDIUM | Last known location + manual ETA |
| Network latency | MEDIUM | LOW | Optimistic UI updates |
| Map API rate limits | MEDIUM | LOW | Fallback to OSM, caching |
| Browser compatibility | LOW | LOW | Test on Chrome, Firefox, Safari |

### Operational Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Incorrect hospital selection | HIGH | MEDIUM | Confirmation dialog, recent hospitals list |
| Kiosk not monitored | MEDIUM | MEDIUM | Heartbeat monitoring, email alerts |
| Privacy breach | HIGH | LOW | No PII in data model, security rules |
| User training | MEDIUM | HIGH | Video tutorials, on-site training |

---

## Success Criteria

### MVP Success (3 months)
- ✅ 10+ hospitals using kiosk
- ✅ 100+ cases transmitted successfully
- ✅ 95%+ ETA accuracy (±5 min)
- ✅ <5 second alert latency
- ✅ Positive feedback from ER staff (>4/5 rating)
- ✅ Zero privacy incidents

### Long-term Success (12 months)
- ✅ 50+ hospitals deployed
- ✅ 10,000+ cases processed
- ✅ Integration with EHR systems
- ✅ Automated pre-alerts to neurosurgery
- ✅ Outcome tracking (patient outcomes vs predictions)

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Approve architecture** (Firebase vs alternatives)
3. **Allocate resources** (developer time, Firebase budget)
4. **Set up Firebase project** (Week 1)
5. **Begin Phase 1 implementation** (Week 1-2)
6. **Schedule pilot hospital** (Week 9)

---

## Questions for Stakeholder Review

1. **Firebase Budget**: Approve €50-100/month for Firebase services?
2. **Map Provider**: Google Maps (paid) or OpenStreetMap (free)?
3. **Audio Alerts**: What sound for new case alert?
4. **Kiosk Hardware**: Will hospitals provide displays or do we need specs?
5. **Training**: On-site visits or remote video training?
6. **Privacy**: Any additional GDPR requirements beyond standard compliance?
7. **Timeline**: Is 8-week development timeline acceptable?

---

## Appendix: File Structure Summary

```
stroke-triage/0825/
├── src/                                    # Existing field PWA
│   ├── services/
│   │   ├── case-transmitter.js            # NEW
│   │   └── location-tracker.js            # NEW
│   ├── ui/
│   │   ├── screens/
│   │   │   └── results.js                 # MODIFIED
│   │   └── components/
│   │       └── hospital-selector.js       # NEW
│   ├── data/
│   │   └── firebase-config.js             # NEW
│   └── config.js                          # MODIFIED
│
├── kiosk/                                  # NEW kiosk application
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.js
│       ├── config.js
│       ├── state/
│       │   └── kiosk-store.js
│       ├── services/
│       │   ├── firebase-listener.js
│       │   ├── eta-calculator.js
│       │   └── notification-service.js
│       ├── ui/
│       │   ├── screens/
│       │   │   ├── dashboard.js
│       │   │   ├── case-detail.js
│       │   │   └── settings.js
│       │   └── components/
│       │       ├── case-card.js
│       │       ├── live-map.js
│       │       └── eta-display.js
│       └── styles/
│           └── kiosk.css
│
├── cloud-functions/
│   ├── generate-firebase-token/           # NEW
│   │   └── main.py
│   └── cleanup-old-cases/                 # NEW
│       └── main.py
│
├── firebase.json                          # NEW Firebase config
├── .firebaserc                            # NEW Firebase project
└── KIOSK_APP_PLAN.md                      # THIS FILE

Total New Files: ~25
Total Modified Files: ~3
Estimated Lines of Code: ~3,500
```

---

**End of Plan Document**

*This plan is a living document and will be updated as implementation progresses and requirements evolve.*
