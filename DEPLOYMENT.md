# Deployment Guide for iGFAP Stroke Triage Assistant

## Quick Deployment (Automated)

**RECOMMENDED:** Use the automated deployment script to avoid missing files:

```bash
./deploy.sh
```

This script will:
- Build the production version
- Copy ALL necessary files (index.html, sw.js, manifest.json, icons/, **assets/**)
- Commit and push to GitHub
- Restore development index.html automatically

## Manual Deployment (Not Recommended)

If you need to deploy manually:

```bash
# 1. Build the production version
npm run build

# 2. Backup development index.html
cp index.html index.html.dev.backup

# 3. Copy production files to root for GitHub Pages
cp dist/index.html index.html
cp dist/sw.js dist/manifest.json .
cp -r dist/icons .
cp -r dist/assets .   # ⚠️ CRITICAL - Don't forget assets!

# 4. Commit and push to GitHub
git add index.html sw.js manifest.json icons/ assets/
git commit -m "Deploy production build to GitHub Pages"
git push origin main

# 5. Wait 1-2 minutes for GitHub Pages to deploy

# 6. Restore development index.html for local work
mv index.html.dev.backup index.html
```

## Testing Deployment

```bash
# Test both local and deployed versions
node test-local-vs-deployed.js
```

## Important Notes

### Two index.html Versions

- **Development** (`index.html.dev.backup`): References `./src/main.js` for Vite dev server
- **Production** (`dist/index.html`): References `/0825/assets/index-[hash].js` for GitHub Pages

### Why This Process?

GitHub Pages serves from the repository root, but Vite dev server needs source references. We cannot use the same index.html for both, so we:

1. Keep development version for local work (uncommitted changes)
2. Deploy production version to GitHub Pages (committed)
3. Restore development version after deployment

### Alternative: Automated Deployment

Consider setting up GitHub Actions to automate this:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci && npm run build
      - run: cp dist/index.html index.html && cp -r dist/assets dist/icons dist/sw.js .
      - run: git add -f index.html assets/ icons/ sw.js
      - run: git commit -m "Deploy: ${{ github.sha }}"
      - run: git push
```

## Troubleshooting

### Deployment shows white screen
- Check browser console for errors
- Verify assets/ directory has latest build files
- Clear GitHub Pages cache (push a trivial change)
- Check that index.html references correct asset hashes

### Dev server broken
- Ensure index.html references `./src/main.js` not `/0825/assets/...`
- Restore from backup: `cp index.html.dev.backup index.html`

### CORS errors on localhost
- Expected for LVO API endpoint (configured for https://igfap.eu)
- Other APIs should work fine

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Backup development index.html
- [ ] Copy dist/ files to root
- [ ] Commit and push to GitHub
- [ ] Wait for GitHub Pages deployment (1-2 min)
- [ ] Test deployment at https://igfap.eu/0825/
- [ ] Restore development index.html
- [ ] Test dev server at http://localhost:5173
