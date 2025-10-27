# Kiosk App Implementation Status

**Last Updated**: October 27, 2025
**Status**: Phase 2 In Progress

---

## ✅ Phase 1: Cloud Infrastructure (COMPLETED)

### Created Files
- ✅ `cloud-functions/case-sharing/main.py` - Complete backend API
- ✅ `cloud-functions/case-sharing/requirements.txt` - Dependencies
- ✅ `cloud-functions/case-sharing/deploy.sh` - Deployment script

### Endpoints Implemented
- `POST /store-case` - Create new case with location & ETA
- `POST /update-location` - Update ambulance GPS position
- `GET /get-cases` - Get active cases (with filters)
- `POST /mark-arrived` - Mark case as delivered
- `POST /cleanup-old-cases` - Remove old cases (24h)
- `GET /health` - Health check

### Features
- ✅ Cloud Storage persistence (bucket: igfap-stroke-cases)
- ✅ Auto-archive after 2 hours
- ✅ GPS stale detection (>5 minutes)
- ✅ Urgency calculation from ICH/LVO percentages
- ✅ Error handling with retries
- ✅ CORS enabled

---

## 🔄 Phase 2: Field PWA Modifications (IN PROGRESS)

### Completed
- ✅ `src/config.js` - Added KIOSK_CONFIG with Google Maps API key placeholder
- ✅ `src/services/gps-tracker.js` - GPS tracking service with error handling
- ✅ `src/services/eta-calculator.js` - Google Maps ETA calculation (with fallback)
- ✅ `src/services/case-transmitter.js` - Case sending & location updates
- ✅ `src/ui/components/hospital-selector.js` - Hospital selection modal
- ✅ `src/styles/app.css` - Hospital selector styles added

### Remaining Tasks

#### 1. Modify Results Page
**File**: `src/ui/screens/results.js`

Add "Send to Hospital" button in the results actions section (around line 364):

```javascript
<div class="results-actions">
  <div class="primary-actions">
    <!-- ADD THIS BUTTON -->
    <button type="button" class="primary" id="shareToKiosk">
      🚀 Send to Hospital
    </button>
    <!-- EXISTING BUTTONS -->
    <button type="button" class="primary" id="printResults">
      📄 ${t('printResults')}
    </button>
    <button type="button" class="secondary" data-action="reset">
      ${t('newAssessment')}
    </button>
  </div>
</div>
```

#### 2. Add Event Handler
**File**: `src/main.js` or create new `src/handlers/kiosk-handlers.js`

```javascript
import { hospitalSelector } from './ui/components/hospital-selector.js';
import { caseTransmitter } from './services/case-transmitter.js';
import { store } from './state/store.js';

// Add to event listeners
document.addEventListener('click', async (e) => {
  if (e.target.id === 'shareToKiosk') {
    handleSendToHospital(e.target);
  }
});

async function handleSendToHospital(button) {
  try {
    // Disable button
    button.disabled = true;
    button.classList.add('sending');
    button.textContent = '⏳ Selecting Hospital...';

    // Show hospital selector
    hospitalSelector.show(async (hospital) => {
      try {
        button.textContent = '📡 Sending Case...';

        const state = store.getState();
        const { results, formData } = state;

        // Detect module type
        const moduleType = results.ich.module?.toLowerCase().includes('coma') ? 'coma'
          : results.ich.module?.toLowerCase().includes('limited') ? 'limited'
          : 'full';

        // Send case
        const response = await caseTransmitter.sendCase(
          results,
          formData,
          moduleType,
          hospital
        );

        // Success
        button.classList.remove('sending');
        button.classList.add('success');
        button.textContent = `✓ Sent to ${hospital.name}`;
        button.innerHTML += `<br><small>ETA: ${response.eta} min • Tracking active</small>`;

        // Show tracking status
        showTrackingStatus(response.caseId, hospital);

      } catch (error) {
        console.error('Failed to send case:', error);
        button.classList.remove('sending');
        button.classList.add('error');
        button.textContent = '❌ Send Failed - Try Again';
        button.disabled = false;

        setTimeout(() => {
          button.classList.remove('error');
          button.textContent = '🚀 Send to Hospital';
        }, 3000);
      }
    });

  } catch (error) {
    console.error('Hospital selection error:', error);
    button.textContent = '❌ Error - Try Again';
    button.disabled = false;
  }
}

function showTrackingStatus(caseId, hospital) {
  // Add tracking status indicator to the page
  const statusHTML = `
    <div class="tracking-status" id="trackingStatus">
      <div class="tracking-header">
        <strong>📡 Live Tracking Active</strong>
        <button class="stop-tracking" id="stopTracking">Stop</button>
      </div>
      <div class="tracking-info">
        <p>Case ID: ${caseId}</p>
        <p>Destination: ${hospital.name}</p>
        <p>GPS updates every 30 seconds</p>
      </div>
    </div>
  `;

  // Insert after results actions
  const resultsActions = document.querySelector('.results-actions');
  if (resultsActions) {
    resultsActions.insertAdjacentHTML('afterend', statusHTML);
  }

  // Stop tracking handler
  document.getElementById('stopTracking')?.addEventListener('click', () => {
    if (confirm('Stop tracking this case?')) {
      caseTransmitter.stopTracking();
      document.getElementById('trackingStatus')?.remove();
    }
  });
}
```

#### 3. Add Tracking Status Styles
**File**: `src/styles/app.css` (already added, but here's the snippet)

```css
.tracking-status {
  margin: 20px 0;
  padding: 16px;
  background: rgba(0, 102, 204, 0.1);
  border-left: 4px solid var(--primary-color);
  border-radius: 6px;
}

.tracking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stop-tracking {
  background: var(--danger-color);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.tracking-info p {
  margin: 4px 0;
  font-size: 14px;
  color: var(--text-color);
}
```

#### 4. Add Localization Strings
**Files**: `src/localization/en.js` and `src/localization/de.js`

```javascript
// en.js
export const en = {
  // ...existing translations
  sendToHospital: 'Send to Hospital',
  trackingActive: 'Live Tracking Active',
  stopTracking: 'Stop Tracking',
  selectHospital: 'Select Hospital',
  hospitalSelected: 'Hospital Selected',
  // ...
};

// de.js
export const de = {
  // ...existing translations
  sendToHospital: 'An Krankenhaus senden',
  trackingActive: 'Live-Tracking aktiv',
  stopTracking: 'Tracking stoppen',
  selectHospital: 'Krankenhaus auswählen',
  hospitalSelected: 'Krankenhaus ausgewählt',
  // ...
};
```

---

## 📋 Phase 3: Kiosk PWA (PENDING)

### Directory Structure to Create

```
kiosk/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── sounds/
│       └── alert.mp3
└── src/
    ├── main.js
    ├── config.js
    ├── styles.css
    ├── services/
    │   ├── case-listener.js
    │   └── map-service.js
    └── ui/
        ├── dashboard.js
        ├── case-card.js
        └── case-detail.js
```

### Implementation Guide

1. **Create kiosk directory** alongside main project
2. **Copy configuration** from main PWA (API URLs, etc.)
3. **Implement real-time polling** (fetch `/get-cases` every 5 seconds)
4. **Build case list dashboard** with urgency sorting
5. **Add Google Maps integration** for live ambulance tracking
6. **Implement audio/visual alerts** for new cases
7. **Add detail modal** showing full results page
8. **Test auto-archive** (cases disappear after 2 hours)

---

## ✅ Phase 4: Testing Checklist (PENDING)

### Field PWA Tests
- [ ] GPS permission request works
- [ ] Hospital selector shows nearby hospitals
- [ ] Hospital selection works
- [ ] Case sends successfully
- [ ] GPS tracking starts
- [ ] Location updates every 30 seconds
- [ ] ETA recalculates correctly
- [ ] Stop tracking works
- [ ] Network failure handling (retry logic)
- [ ] Offline queue works
- [ ] Multiple cases can be sent

### Kiosk PWA Tests
- [ ] Kiosk receives new cases in real-time
- [ ] Case list updates automatically
- [ ] Audio alert plays on new case
- [ ] Visual flash works
- [ ] Case detail modal opens
- [ ] Map shows ambulance location
- [ ] ETA countdown updates
- [ ] GPS stale warning shows (>5 min)
- [ ] Auto-archive works (2 hours)
- [ ] Multiple simultaneous cases display correctly

### Edge Cases
- [ ] GPS signal lost (show last known location)
- [ ] Network interruption (queue updates, retry)
- [ ] Cloud Function timeout (handle gracefully)
- [ ] Invalid Google Maps API key (fallback to simple ETA)
- [ ] Hospital database empty (show error)
- [ ] Very long distance (>100km)
- [ ] Rapid location changes
- [ ] Browser doesn't support geolocation

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (iOS)
- [ ] Edge

---

## 🚀 Deployment Steps

### 1. Deploy Cloud Function

```bash
cd cloud-functions/case-sharing
./deploy.sh
```

### 2. Configure Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **Directions API** and **Maps JavaScript API**
3. Create API key
4. Add key to `src/config.js`:
   ```javascript
   googleMapsApiKey: 'YOUR_ACTUAL_API_KEY_HERE'
   ```

### 3. Create Cloud Storage Bucket

```bash
gsutil mb -l europe-west3 gs://igfap-stroke-cases
gsutil cors set cors-config.json gs://igfap-stroke-cases
```

**cors-config.json**:
```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

### 4. Build and Deploy Field PWA

```bash
npm run build
# Deploy dist/ to GitHub Pages
```

### 5. Build and Deploy Kiosk PWA

```bash
cd kiosk
npm install
npm run build
# Deploy to /kiosk/ subdirectory on GitHub Pages
```

---

## 📊 Cost Estimate

| Service | Usage | Cost/Month |
|---------|-------|------------|
| Cloud Functions | ~10,000 invocations | €0-5 |
| Cloud Storage | <1GB | €0.02 |
| Google Maps Directions API | ~1,000-4,000 requests | €5-20 |
| **Total** | | **€5-25/month** |

---

## 🔑 Configuration Checklist

Before going live:

- [ ] Add real Google Maps API key to `src/config.js`
- [ ] Deploy Cloud Function to GCP
- [ ] Create and configure Cloud Storage bucket
- [ ] Test with real GPS on mobile device
- [ ] Test kiosk on large display (monitor/TV)
- [ ] Configure audio alert file
- [ ] Set up monitoring/logging
- [ ] Review security rules (if adding authentication)

---

## 📝 Next Steps

1. **Complete Phase 2**: Add send button handler to results.js
2. **Test Field PWA**: Send test case from mobile
3. **Build Phase 3**: Create kiosk PWA
4. **Integration Test**: Send case → View on kiosk → Track → Arrive
5. **Pilot Deployment**: Single hospital for 1-2 weeks
6. **Production Rollout**: Multiple hospitals

---

## 🐛 Known Issues / TODOs

- [ ] Add authentication for hospital kiosks (optional)
- [ ] Implement push notifications instead of polling (future enhancement)
- [ ] Add manual ETA adjustment (if route changes)
- [ ] Support for multiple ambulances per case
- [ ] Historical case archive viewer
- [ ] Analytics dashboard

---

## 📞 Support

For issues or questions:
- Check Cloud Function logs: `gcloud functions logs read case-sharing`
- Check browser console for client-side errors
- Verify Google Maps API quota
- Test Cloud Storage bucket access

**End of Status Document**
