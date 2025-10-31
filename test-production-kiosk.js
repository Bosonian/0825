/**
 * Test production kiosk after fix deployment
 */
import { chromium } from '@playwright/test';

async function testProductionKiosk() {
  console.log('🔍 Testing production kiosk after fix deployment...\n');

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
    // Test production kiosk URL
    const prodUrl = 'https://igfap.eu/0825/#results?display=kiosk&caseId=case_1761866194_d0b35af5';

    console.log('📍 Navigating to production:', prodUrl);
    console.log('⏳ Waiting for page load...\n');

    await page.goto(prodUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for content to render
    await page.waitForTimeout(5000);

    // Check page content
    const bodyText = await page.textContent('body');

    console.log('📊 Production Kiosk Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const hasError = bodyText.includes('Error loading content');
    const hasQuickRef = bodyText.includes('Quick Reference Guide');
    const hasICHRisk = bodyText.includes('ICH Risk') || bodyText.includes('ICH-Risiko');
    const hasRiskValue = bodyText.includes('87%');

    console.log(`  ${hasError ? '❌' : '✅'} Error message: ${hasError ? 'PRESENT (BUG!)' : 'Not present (good)'}`);
    console.log(`  ${hasQuickRef ? '✅' : '❌'} Quick Reference Guide: ${hasQuickRef ? 'Present' : 'MISSING'}`);
    console.log(`  ${hasICHRisk ? '✅' : '❌'} ICH Risk display: ${hasICHRisk ? 'Present' : 'MISSING'}`);
    console.log(`  ${hasRiskValue ? '✅' : '❌'} Risk value (87%): ${hasRiskValue ? 'Present' : 'MISSING'}`);

    // Overall status
    const isWorking = !hasError && hasQuickRef && hasICHRisk && hasRiskValue;
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n${isWorking ? '✅ KIOSK IS WORKING!' : '❌ KIOSK HAS ISSUES'}\n`);

    // Check container HTML
    const containerHTML = await page.innerHTML('#appContainer').catch(() => 'Failed to get container HTML');
    if (!isWorking) {
      console.log('📄 Container HTML (first 800 chars):');
      console.log(containerHTML.substring(0, 800));
    }

    // Screenshot
    await page.screenshot({
      path: 'test-screenshots/production-kiosk-status.png',
      fullPage: true
    });
    console.log('📸 Screenshot saved: test-screenshots/production-kiosk-status.png');

    // Show recent error logs
    const errorLogs = logs.filter(log => log.includes('[error]') || log.includes('ERROR'));
    if (errorLogs.length > 0) {
      console.log('\n⚠️  Recent error logs:');
      errorLogs.slice(-5).forEach(log => console.log(`  ${log}`));
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

testProductionKiosk();
