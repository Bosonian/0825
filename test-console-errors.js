import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Capture ALL console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleMessages.push({ type, text });
    console.log(`[${type.toUpperCase()}] ${text}`);
  });

  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.toString());
    console.log(`[PAGE ERROR] ${error.toString()}`);
  });

  // Capture failed requests
  const failedRequests = [];
  page.on('requestfailed', request => {
    const failure = `${request.url()} - ${request.failure().errorText}`;
    failedRequests.push(failure);
    console.log(`[REQUEST FAILED] ${failure}`);
  });

  // Capture response errors
  page.on('response', response => {
    if (!response.ok()) {
      console.log(`[HTTP ${response.status()}] ${response.url()}`);
    }
  });

  try {
    console.log('\n🔍 Loading https://igfap.eu/0825/\n');

    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Wait for network to settle
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      console.log('⚠️  Network did not become idle');
    });

    await page.waitForTimeout(3000);

    await page.screenshot({ path: '/tmp/console-check.png', fullPage: true });
    console.log('\n📸 Screenshot saved to /tmp/console-check.png');

    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total console messages: ${consoleMessages.length}`);
    console.log(`   Page errors: ${pageErrors.length}`);
    console.log(`   Failed requests: ${failedRequests.length}`);

    if (pageErrors.length > 0) {
      console.log('\n❌ PAGE ERRORS:');
      pageErrors.forEach(e => console.log(`   ${e}`));
    }

    if (failedRequests.length > 0) {
      console.log('\n❌ FAILED REQUESTS:');
      failedRequests.forEach(r => console.log(`   ${r}`));
    }

    const errorMessages = consoleMessages.filter(m => m.type === 'error');
    if (errorMessages.length > 0) {
      console.log('\n❌ CONSOLE ERRORS:');
      errorMessages.forEach(m => console.log(`   ${m.text}`));
    }

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n💥 Test Error:', error.message);
    await page.screenshot({ path: '/tmp/console-check-error.png' });
  } finally {
    await browser.close();
  }
})();
