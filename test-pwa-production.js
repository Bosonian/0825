/**
 * Test production PWA at igfap.eu/0825/
 */
import { chromium } from '@playwright/test';

async function testPWAProduction() {
  console.log('🔍 Testing production PWA at https://igfap.eu/0825/...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture console logs
  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    logs.push(text);
    console.log(`[Browser ${msg.type()}] ${text}`);
  });

  // Capture errors
  page.on('pageerror', error => {
    console.error(`[PAGE ERROR] ${error.message}`);
  });

  // Capture network failures
  const failedRequests = [];
  page.on('response', response => {
    if (!response.ok()) {
      failedRequests.push({
        url: response.url(),
        status: response.status()
      });
    }
  });

  try {
    console.log('📍 Navigating to https://igfap.eu/0825/...');
    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('\n⏳ Waiting 5 seconds for page to load...');
    await page.waitForTimeout(5000);

    // Check page content
    const bodyText = await page.textContent('body');
    const title = await page.title();

    console.log('\n📊 Page Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Title: ${title}`);
    console.log(`  Body has content: ${bodyText.length > 100}`);
    console.log(`  Body length: ${bodyText.length} characters`);
    console.log(`  Has "Stroke Triage": ${bodyText.includes('Stroke') || bodyText.includes('triage')}`);
    console.log(`  Has error text: ${bodyText.toLowerCase().includes('error')}`);

    // Check for main app elements
    const hasAppContainer = await page.$('#app');
    const hasHeader = await page.$('header');
    const hasMain = await page.$('main');

    console.log('\n🔍 DOM Elements:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  #app container: ${!!hasAppContainer}`);
    console.log(`  <header>: ${!!hasHeader}`);
    console.log(`  <main>: ${!!hasMain}`);

    // Check for failed requests
    console.log('\n📡 Failed Requests:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (failedRequests.length > 0) {
      failedRequests.forEach(req => {
        console.log(`  ❌ ${req.status}: ${req.url}`);
      });
    } else {
      console.log('  ✅ No failed requests');
    }

    // Check for JavaScript errors in logs
    const errorLogs = logs.filter(log =>
      log.toLowerCase().includes('error') ||
      log.toLowerCase().includes('failed')
    );

    if (errorLogs.length > 0) {
      console.log('\n⚠️  Error Logs:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      errorLogs.slice(0, 10).forEach(log => console.log(`  ${log}`));
    }

    // Take screenshot
    await page.screenshot({
      path: 'test-screenshots/pwa-production-status.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot: test-screenshots/pwa-production-status.png');

    // Final verdict
    const isWorking = hasAppContainer && hasHeader && bodyText.length > 1000 && failedRequests.length === 0;

    if (isWorking) {
      console.log('\n✅ PWA appears to be working!');
    } else {
      console.log('\n❌ PWA has issues!');
    }

    console.log('\n⏳ Keeping browser open for 30 seconds for inspection...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    console.error(error.stack);
  }

  await browser.close();
}

testPWAProduction();
