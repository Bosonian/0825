import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false, devtools: true });
  const page = await browser.newPage();

  const allMessages = [];

  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    allMessages.push({ type, text });

    // Log everything to see initialization details
    console.log(`[${type.toUpperCase().padEnd(7)}] ${text}`);
  });

  page.on('pageerror', error => {
    console.log(`\n💥 PAGE ERROR:\n${error.toString()}\n${error.stack}\n`);
  });

  // Intercept failed requests to see what's 404ing
  page.on('requestfailed', request => {
    console.log(`\n❌ REQUEST FAILED: ${request.url()}`);
    console.log(`   Failure: ${request.failure().errorText}\n`);
  });

  page.on('response', response => {
    if (!response.ok()) {
      console.log(`\n❌ HTTP ${response.status()}: ${response.url()}\n`);
    }
  });

  try {
    console.log('\n🔍 Loading with full error capture...\n');

    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('\n⏳ Waiting for initialization...\n');
    await page.waitForTimeout(7000);

    console.log('\n📊 INITIALIZATION LOG SUMMARY:\n');
    const errorMessages = allMessages.filter(m => m.type === 'error');
    const warningMessages = allMessages.filter(m => m.type === 'warning');

    console.log(`Total console messages: ${allMessages.length}`);
    console.log(`Errors: ${errorMessages.length}`);
    console.log(`Warnings: ${warningMessages.length}\n`);

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n💥 Test Error:', error.message);
  } finally {
    await browser.close();
  }
})();
