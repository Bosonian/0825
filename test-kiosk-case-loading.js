/**
 * Test kiosk case loading with detailed debugging
 */
import { chromium } from '@playwright/test';

async function testKioskCaseLoading() {
  console.log('🔍 Testing kiosk case loading with detailed debugging...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture ALL console logs
  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    logs.push(`[${msg.type()}] ${text}`);
    console.log(`[Browser ${msg.type()}] ${text}`);
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.error(`[PAGE ERROR] ${error.message}`);
  });

  // Capture network requests
  const apiCalls = [];
  page.on('response', response => {
    const url = response.url();
    if (url.includes('cloudfunctions.net') || url.includes('case')) {
      apiCalls.push({
        url,
        status: response.status(),
        statusText: response.statusText()
      });
      console.log(`[API] ${response.status()} ${url}`);
    }
  });

  try {
    console.log('📍 Navigating to kiosk interface...');
    await page.goto('https://igfap.eu/kiosk/', { waitUntil: 'networkidle', timeout: 30000 });

    console.log('\n⏳ Waiting 15 seconds for cases to load...\n');
    await page.waitForTimeout(15000);

    // Check case count
    const caseCountText = await page.textContent('body');
    const caseCountMatch = caseCountText.match(/(\d+)\s+Cases?/i);
    const caseCount = caseCountMatch ? parseInt(caseCountMatch[1]) : 0;

    console.log('📊 Kiosk Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Cases displayed: ${caseCount}`);

    // Try to get hospital selector value
    const hospitalValue = await page.evaluate(() => {
      const selector = document.getElementById('hospitalSelector');
      return selector ? selector.value : null;
    });
    console.log(`  Selected hospital: ${hospitalValue || 'Not selected'}`);

    // Look for case cards in different ways
    const caseCards = await page.$$('.case-card');
    const caseLinks = await page.$$('a[href*="0825"]');
    const allLinks = await page.$$('a');

    console.log(`  .case-card elements: ${caseCards.length}`);
    console.log(`  Links to /0825/: ${caseLinks.length}`);
    console.log(`  Total links on page: ${allLinks.length}`);

    // Get page HTML to inspect
    const bodyHTML = await page.innerHTML('body');
    const hasMainContent = bodyHTML.includes('case-list') || bodyHTML.includes('case-grid');
    console.log(`  Has case list container: ${hasMainContent}`);

    console.log('\n📡 API Calls Made:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (apiCalls.length > 0) {
      apiCalls.forEach(call => {
        console.log(`  ${call.status} ${call.url}`);
      });
    } else {
      console.log('  ⚠️  No API calls detected!');
    }

    // Check for errors in console
    const errorLogs = logs.filter(log =>
      log.includes('[error]') ||
      log.includes('ERROR') ||
      log.includes('Failed')
    );

    if (errorLogs.length > 0) {
      console.log('\n⚠️  Console Errors:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      errorLogs.forEach(log => console.log(`  ${log}`));
    }

    // Look for case monitoring logs
    const monitoringLogs = logs.filter(log =>
      log.includes('case') ||
      log.includes('monitor') ||
      log.includes('fetch') ||
      log.includes('hospital')
    );

    if (monitoringLogs.length > 0) {
      console.log('\n📝 Case Monitoring Logs:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      monitoringLogs.slice(0, 20).forEach(log => console.log(`  ${log}`));
    }

    // If no cases, try to diagnose why
    if (caseCount === 0) {
      console.log('\n🔍 Diagnosing why no cases are showing...');

      // Check if we can manually select a hospital
      const hospitals = await page.evaluate(() => {
        const selector = document.getElementById('hospitalSelector');
        if (!selector) return [];
        return Array.from(selector.options).map(opt => ({
          value: opt.value,
          text: opt.text
        }));
      });

      console.log(`  Available hospitals: ${hospitals.length}`);
      if (hospitals.length > 0) {
        hospitals.forEach(h => console.log(`    - ${h.text} (${h.value})`));

        // Try selecting first hospital
        if (hospitals.length > 1 && hospitals[1].value) {
          console.log(`\n  Trying to select: ${hospitals[1].text}`);
          await page.selectOption('#hospitalSelector', hospitals[1].value);
          await page.waitForTimeout(5000);

          const newCaseCountText = await page.textContent('body');
          const newCaseCountMatch = newCaseCountText.match(/(\d+)\s+Cases?/i);
          const newCaseCount = newCaseCountMatch ? parseInt(newCaseCountMatch[1]) : 0;
          console.log(`  Cases after selection: ${newCaseCount}`);
        }
      }
    }

    // Take screenshot
    await page.screenshot({
      path: 'test-screenshots/kiosk-detailed-status.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot: test-screenshots/kiosk-detailed-status.png');

    // Keep open for inspection
    console.log('\n⏳ Keeping browser open for 60 seconds for inspection...');
    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    console.error(error.stack);
  }

  await browser.close();
}

testKioskCaseLoading();
