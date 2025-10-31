/**
 * Test complete kiosk flow from igfap.eu/kiosk
 */
import { chromium } from '@playwright/test';

async function testFullKioskFlow() {
  console.log('🔍 Testing complete kiosk flow from igfap.eu/kiosk...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture console logs
  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    logs.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      console.log(`[Browser ERROR] ${text}`);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.error(`[PAGE ERROR] ${error.message}`);
  });

  try {
    console.log('📍 Step 1: Navigate to kiosk interface');
    console.log('   URL: https://igfap.eu/kiosk/\n');

    await page.goto('https://igfap.eu/kiosk/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Check if kiosk loaded
    const kioskBody = await page.textContent('body');
    console.log('📊 Kiosk Interface Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const hasCaseList = kioskBody.includes('Case') || kioskBody.includes('Fälle') || kioskBody.includes('Patient');
    const hasNoData = kioskBody.includes('No cases') || kioskBody.includes('Keine Fälle');

    console.log(`  ${hasCaseList ? '✅' : '❌'} Case list interface: ${hasCaseList ? 'Present' : 'MISSING'}`);
    console.log(`  ${hasNoData ? '⚠️ ' : '✅'} Cases available: ${hasNoData ? 'No cases found' : 'Cases present'}`);

    // Take screenshot of kiosk
    await page.screenshot({
      path: 'test-screenshots/kiosk-interface.png',
      fullPage: true
    });
    console.log('  📸 Screenshot: test-screenshots/kiosk-interface.png');

    // Try to find and click a case
    console.log('\n📍 Step 2: Looking for clickable cases...');

    // Look for case cards or links
    const caseElements = await page.$$('a[href*="caseId"], .case-card, [data-case-id]');
    console.log(`  Found ${caseElements.length} potential case elements`);

    if (caseElements.length > 0) {
      console.log('\n📍 Step 3: Clicking on first case...');
      await caseElements[0].click();

      // Wait for navigation
      await page.waitForTimeout(5000);

      // Check if we're now on the PWA results page
      const currentUrl = page.url();
      console.log(`  Current URL: ${currentUrl}`);

      const resultsBody = await page.textContent('body');

      console.log('\n📊 Results Page Status:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      const hasError = resultsBody.includes('Error loading content');
      const hasICHRisk = resultsBody.includes('ICH Risk') || resultsBody.includes('ICH-Risiko');
      const hasQuickRef = resultsBody.includes('Quick Reference Guide');
      const hasBackButton = resultsBody.includes('Back to Case List') || resultsBody.includes('Zurück zur Fallliste');

      console.log(`  ${hasError ? '❌' : '✅'} Error message: ${hasError ? 'PRESENT (BUG!)' : 'Not present'}`);
      console.log(`  ${hasICHRisk ? '✅' : '❌'} ICH Risk display: ${hasICHRisk ? 'Present' : 'MISSING'}`);
      console.log(`  ${hasQuickRef ? '✅' : '❌'} Quick Reference Guide: ${hasQuickRef ? 'Present' : 'MISSING'}`);
      console.log(`  ${hasBackButton ? '✅' : '❌'} Back to Case List button: ${hasBackButton ? 'Present' : 'MISSING'}`);

      const isWorking = !hasError && hasICHRisk && hasQuickRef && hasBackButton;
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n${isWorking ? '✅ COMPLETE KIOSK FLOW WORKING!' : '❌ KIOSK FLOW HAS ISSUES'}\n`);

      // Take screenshot of results
      await page.screenshot({
        path: 'test-screenshots/kiosk-case-results.png',
        fullPage: true
      });
      console.log('📸 Screenshot: test-screenshots/kiosk-case-results.png');

    } else {
      console.log('  ⚠️  No cases found to click');
      console.log('\n  HTML snippet (first 1000 chars):');
      const html = await page.content();
      console.log(html.substring(0, 1000));
    }

    // Keep open for inspection
    console.log('\n⏳ Keeping browser open for 45 seconds for inspection...');
    await page.waitForTimeout(45000);

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    console.error(error.stack);
  }

  await browser.close();
}

testFullKioskFlow();
