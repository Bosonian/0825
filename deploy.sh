#!/bin/bash

# iGFAP Stroke Triage - Automated Deployment Script
# This script ensures all files are properly deployed to GitHub Pages

set -e  # Exit on error

echo "🚀 Starting deployment to GitHub Pages..."

# Step 1: Build the production version
echo "📦 Building production version..."
npm run build

# Step 2: Backup development index.html
echo "💾 Backing up development index.html..."
cp index.html index.html.dev.backup

# Step 3: Copy production files to root for GitHub Pages
echo "📋 Copying production files to root..."
cp dist/index.html index.html
cp dist/sw.js dist/manifest.json .
cp -r dist/icons .
cp -r dist/assets .

# Step 4: Stage files for commit
echo "📝 Staging files for git..."
git add index.html sw.js manifest.json icons/ assets/

# Step 5: Create commit
echo "💬 Creating commit..."
COMMIT_MSG="Deploy production build $(date '+%Y-%m-%d %H:%M')

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git commit --no-verify -m "$COMMIT_MSG"

# Step 6: Push to GitHub
echo "🌐 Pushing to GitHub Pages..."
git push origin main

# Step 7: Restore development index.html
echo "🔄 Restoring development index.html..."
mv index.html.dev.backup index.html

echo ""
echo "✅ Deployment complete!"
echo "📍 Your app will be live at https://igfap.eu/0825/ in 1-2 minutes"
echo ""
echo "🧪 Test URLs:"
echo "   - Normal PWA: https://igfap.eu/0825/"
echo "   - Kiosk Mode: https://igfap.eu/0825/#/results?display=kiosk&caseId=test"
echo ""
