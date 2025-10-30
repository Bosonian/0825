---
description: Build and deploy PWA + Kiosk + Cloud Functions
---

Execute the following deployment sequence:

1. **PWA Deployment**:
   - Run `npm run build` in the PWA directory
   - Verify build succeeded
   - Commit dist files
   - Push to GitHub (deploys to GitHub Pages)

2. **Kiosk Build** (if changes detected):
   - Check if kiosk-temp has uncommitted changes
   - If yes, build and prepare for deployment

3. **Cloud Functions** (if changes detected):
   - Check if cloud-functions have uncommitted changes
   - Deploy authenticate-research-access if updated
   - Deploy case-sharing if updated

4. **Verification**:
   - Test PWA at https://bosonian.github.io/0825/
   - Test authentication API
   - Report deployment status

After deployment, create a deployment summary with:
- What was deployed
- Deployment URLs
- Any errors encountered
- Verification test results
