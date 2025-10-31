import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const requests = [];

  page.on('request', request => {
    requests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType()
    });
  });

  page.on('response', async response => {
    const url = response.url();
    const status = response.status();
    const type = response.request().resourceType();

    console.log(`[${status}] ${type.padEnd(10)} ${url}`);

    if (!response.ok()) {
      console.log(`   ❌ FAILED: ${status} ${url}`);
    }
  });

  try {
    console.log('\n🔍 Loading https://igfap.eu/0825/ with network monitoring\n');

    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(3000);

    console.log(`\n📊 Total requests: ${requests.length}`);

  } catch (error) {
    console.error('\n💥 Error:', error.message);
  } finally {
    await browser.close();
  }
})();
