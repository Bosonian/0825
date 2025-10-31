/**
 * Test kiosk network requests to find 404s
 */
import { chromium } from '@playwright/test';

async function testKioskNetwork() {
  console.log('🔍 Capturing all network requests to find 404s...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture ALL requests and responses
  const requests = [];
  page.on('request', request => {
    requests.push({
      method: request.method(),
      url: request.url(),
      resourceType: request.resourceType()
    });
  });

  const responses = [];
  page.on('response', response => {
    responses.push({
      status: response.status(),
      url: response.url(),
      ok: response.ok()
    });
  });

  // Capture console
  page.on('console', msg => console.log(`[Browser ${msg.type()}] ${msg.text()}`));

  try {
    console.log('📍 Navigating to kiosk...');
    await page.goto('https://igfap.eu/kiosk/', { waitUntil: 'networkidle', timeout: 30000 });

    await page.waitForTimeout(5000);

    console.log('\n📡 All HTTP Requests:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    requests.forEach(req => {
      console.log(`  ${req.method} ${req.resourceType}: ${req.url}`);
    });

    console.log('\n📡 All HTTP Responses:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    responses.forEach(res => {
      const status = res.ok ? `✅ ${res.status}` : `❌ ${res.status}`;
      console.log(`  ${status}: ${res.url}`);
    });

    const failedResponses = responses.filter(r => !r.ok);
    console.log(`\n⚠️  Failed Requests: ${failedResponses.length}`);
    failedResponses.forEach(res => {
      console.log(`  ❌ ${res.status}: ${res.url}`);
    });

    await page.screenshot({
      path: 'test-screenshots/kiosk-network-debug.png',
      fullPage: true
    });

    console.log('\n⏳ Keeping browser open for 30 seconds...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }

  await browser.close();
}

testKioskNetwork();
