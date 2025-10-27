# Kiosk System Deployment Guide

## Overview

This guide covers deploying the complete case-sharing system with GPS tracking and live ETA updates.

**System Components:**
1. **Cloud Function** - Backend API for case storage and location updates
2. **Field PWA** - Modified stroke assessment app with "Send to Hospital" feature
3. **Kiosk PWA** - Emergency room display showing incoming cases with live ETA

---

## Prerequisites

- Google Cloud Project with billing enabled
- Google Maps API key with Directions API enabled
- Node.js 18+ and npm installed
- gcloud CLI installed and authenticated

---

## Phase 1: Deploy Cloud Function

### 1. Create Cloud Storage Bucket

```bash
# Navigate to cloud function directory
cd /Users/deepak/iGFAPAUG/iGFAP08/stroke-triage/0825/cloud-functions/case-sharing

# Create storage bucket (replace with your project ID)
gsutil mb -p igfap-452720 -l europe-west3 gs://igfap-case-sharing

# Set CORS for web access
cat > cors.json << 'EOF'
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set cors.json gs://igfap-case-sharing
```

### 2. Deploy Cloud Function

```bash
# Make deploy script executable
chmod +x deploy.sh

# Deploy to GCP
./deploy.sh

# Note the deployed URL (example):
# https://europe-west3-igfap-452720.cloudfunctions.net/case-sharing
```

### 3. Test Cloud Function

```bash
# Test health endpoint
curl https://europe-west3-igfap-452720.cloudfunctions.net/case-sharing/health

# Expected response:
# {"status":"healthy","timestamp":"2025-...","environment":"production"}
```

---

## Phase 2: Configure Field PWA

### 1. Add Google Maps API Key

Edit `src/config.js` and replace placeholder:

```javascript
export const KIOSK_CONFIG = {
  // ... other config
  googleMapsApiKey: 'AIzaSy...', // YOUR ACTUAL KEY HERE
  // ...
};
```

### 2. Load Google Maps Script

Add to `index.html` in the `<head>` section:

```html
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
</script>
```

### 3. Configure Hospital List

Edit `src/ui/components/hospital-selector.js` to add your hospitals:

```javascript
const HOSPITALS = [
  {
    id: 'charite',
    name: 'Charité Berlin',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    neurosurgery: true,
    thrombectomy: true,
    thrombolysis: true,
  },
  // Add more hospitals...
];
```

### 4. Build and Test

```bash
# Navigate to main PWA directory
cd /Users/deepak/iGFAPAUG/iGFAP08/stroke-triage/0825

# Install dependencies (if needed)
npm install

# Build for production
npm run build

# Test locally
npm run preview

# Test the workflow:
# 1. Complete an assessment
# 2. Click "Send to Hospital"
# 3. Select a hospital
# 4. Verify case is sent (check browser console)
```

### 5. Deploy to GitHub Pages

```bash
# Commit changes
git add .
git commit -m "Add kiosk case sharing functionality

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin main

# GitHub Actions will auto-deploy to: https://yourusername.github.io/repo/0825/
```

---

## Phase 3: Deploy Kiosk PWA

### 1. Configure Kiosk

Edit `kiosk/src/config.js`:

```javascript
export const KIOSK_CONFIG = {
  caseSharingUrl: 'https://europe-west3-igfap-452720.cloudfunctions.net/case-sharing',

  // Set this to filter cases for specific hospital
  hospitalId: 'charite', // Must match hospital ID from field app

  hospitalName: 'Charité Berlin - Notaufnahme',

  pollInterval: 5000, // 5 seconds
  playAudioAlert: true,
  audioAlertVolume: 0.3,
};
```

### 2. Build Kiosk App

```bash
# Navigate to kiosk directory
cd /Users/deepak/iGFAPAUG/iGFAP08/stroke-triage/0825/kiosk

# Install dependencies
npm install

# Build for production
npm run build

# Preview build
npm run preview
```

### 3. Deploy Kiosk

**Option A: Serve from same GitHub Pages**

```bash
# Copy dist to parent project's dist/kiosk
cp -r dist/* ../dist/kiosk/

# Commit and push
cd ..
git add dist/kiosk
git commit -m "Deploy kiosk display

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
git push

# Access at: https://yourusername.github.io/repo/0825/kiosk/
```

**Option B: Serve locally on ER kiosk device**

```bash
# On the kiosk computer/tablet:
npm install -g serve

# Serve the built kiosk
serve -s dist -l 3000

# Open browser to: http://localhost:3000
# Set browser to fullscreen (F11)
```

---

## Testing Checklist

### End-to-End Workflow Test

1. **Field Assessment**
   - [ ] Open Field PWA on mobile device
   - [ ] Enable location permissions
   - [ ] Complete a stroke assessment (any module)
   - [ ] View results page
   - [ ] Click "Send to Hospital" button
   - [ ] Verify hospital selector modal opens
   - [ ] Verify hospitals are sorted by capability
   - [ ] Select a hospital
   - [ ] Verify confirmation message appears
   - [ ] Verify tracking status badge shows

2. **Kiosk Display**
   - [ ] Open Kiosk PWA on display device
   - [ ] Verify connection status shows green
   - [ ] Within 5 seconds, new case should appear
   - [ ] Verify case card shows:
     - [ ] Urgency badge (color-coded)
     - [ ] ICH risk percentage
     - [ ] ETA in minutes
     - [ ] Distance in km
     - [ ] Time since received
   - [ ] Verify audio alert plays (if enabled)
   - [ ] Verify screen flash animation
   - [ ] Click on case card
   - [ ] Verify detail modal opens with full data
   - [ ] Close modal with X or ESC key

3. **GPS Tracking**
   - [ ] Move the mobile device (simulate ambulance)
   - [ ] Wait 30 seconds
   - [ ] Verify kiosk ETA updates within 5 seconds
   - [ ] Verify distance changes
   - [ ] Stop GPS updates on mobile
   - [ ] Wait 6 minutes
   - [ ] Verify kiosk shows "GPS stale" warning

4. **Case Lifecycle**
   - [ ] On Field PWA, click "Mark Arrived"
   - [ ] Verify case disappears from kiosk within 5 seconds
   - [ ] Verify GPS tracking stops
   - [ ] Check Cloud Storage: case status = "arrived"

5. **Auto-Archive (2 hour test)**
   - [ ] Create test case with old timestamp
   - [ ] Manually modify Cloud Storage JSON: set `createdAt` to 3 hours ago
   - [ ] Verify cleanup-old-cases endpoint removes it
   - [ ] Note: Set up Cloud Scheduler to run this endpoint hourly

---

## Configuration Guide

### Hospital IDs

Ensure hospital IDs match between Field PWA and Kiosk:

**Field PWA** (`src/ui/components/hospital-selector.js`):
```javascript
{ id: 'charite', name: 'Charité Berlin', ... }
```

**Kiosk** (`kiosk/src/config.js`):
```javascript
hospitalId: 'charite', // MUST MATCH
```

### Google Maps API

Required APIs:
- Directions API (for ETA calculation)
- JavaScript API (for map loading)

Budget estimate:
- ~€5-10/month for typical ambulance service usage
- Set quota limits in Google Cloud Console

### CORS Configuration

If you encounter CORS errors:

1. Check Cloud Function CORS headers in `main.py`:
```python
response.headers['Access-Control-Allow-Origin'] = '*'
```

2. Check Storage bucket CORS (see Phase 1)

### Firewall / Network

Kiosk must reach:
- Cloud Function endpoint (HTTPS)
- Google Maps API (maps.googleapis.com)

No incoming connections required.

---

## Monitoring & Maintenance

### Cloud Function Logs

```bash
# View recent logs
gcloud functions logs read case-sharing --gen2 --region=europe-west3 --limit=50

# Monitor in real-time
gcloud functions logs read case-sharing --gen2 --region=europe-west3 --follow
```

### Storage Monitoring

```bash
# List active cases
gsutil ls gs://igfap-case-sharing/cases/

# View specific case
gsutil cat gs://igfap-case-sharing/cases/case_1234567890_abcd1234.json

# Count cases by status
gsutil cat gs://igfap-case-sharing/cases/*.json | grep -o '"status":"[^"]*"' | sort | uniq -c
```

### Cleanup Schedule

Set up Cloud Scheduler to auto-cleanup:

```bash
# Create schedule (runs hourly)
gcloud scheduler jobs create http cleanup-old-cases \
  --location=europe-west3 \
  --schedule="0 * * * *" \
  --uri="https://europe-west3-igfap-452720.cloudfunctions.net/case-sharing/cleanup-old-cases" \
  --http-method=POST \
  --headers="Content-Type=application/json"
```

---

## Troubleshooting

### Cases Not Appearing in Kiosk

1. **Check network**: Open browser dev tools (F12), check Console for errors
2. **Verify hospitalId**: Must match between field and kiosk
3. **Check Cloud Function**: Visit `/health` endpoint
4. **Check Storage**: Verify JSON files exist in `gs://igfap-case-sharing/cases/`

### GPS Not Updating

1. **Check permissions**: Field app must have location permission
2. **Check battery saver**: Some phones disable background GPS
3. **Check console logs**: Look for "GPS update sent" messages
4. **Check staleness**: Kiosk shows warning after 5 minutes

### ETA Not Accurate

1. **Verify Google Maps API key** is set correctly
2. **Check API quotas**: May be rate limited
3. **Fallback mode**: If Maps fails, uses Haversine (straight-line distance)
4. **Emergency multiplier**: ETA is 70% of normal traffic time

### Audio Alerts Not Playing

1. **User interaction required**: Click anywhere in kiosk first (browser restriction)
2. **Check volume**: Set in config: `audioAlertVolume: 0.3`
3. **Disable if needed**: Set `playAudioAlert: false`

### Build Errors

```bash
# Clear node modules and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Security Considerations

1. **API Key Protection**
   - Restrict Google Maps API key to your domains
   - Set usage quotas in Google Cloud Console

2. **Cloud Function**
   - Currently allows unauthenticated access (required for public kiosk)
   - Consider adding API key authentication for production
   - Rate limiting recommended

3. **Data Privacy**
   - Cases auto-delete after 24 hours
   - No patient names stored (ambulance IDs only)
   - HIPAA compliance: consult legal team

4. **Kiosk Security**
   - Run browser in kiosk mode (fullscreen, no address bar)
   - Disable browser navigation
   - Consider dedicated kiosk OS (e.g., Chrome OS, Raspberry Pi)

---

## Support

For issues or questions:
1. Check browser console for error messages
2. Review Cloud Function logs
3. Verify configuration matches this guide
4. Test with simple curl commands first

---

**Deployment Complete!** 🚀

The system is now live:
- Field crews can send assessments with live GPS tracking
- Emergency rooms receive real-time updates with ETA
- Cases auto-archive after 2 hours
