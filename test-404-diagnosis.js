import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const failedResources = [];

  page.on('response', response => {
    if (!response.ok()) {
      failedResources.push({
        url: response.url(),
        status: response.status()
      });
      console.log(`❌ [${response.status()}] ${response.url()}`);
    } else {
      console.log(`✅ [${response.status()}] ${response.url()}`);
    }
  });

  try {
    console.log('\n🔍 Diagnosing 404 errors at https://igfap.eu/0825/\n');

    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(2000);

    console.log('\n📊 FAILED RESOURCES:\n');
    if (failedResources.length === 0) {
      console.log('   ✅ No failed resources!\n');
    } else {
      failedResources.forEach(r => {
        console.log(`   [${r.status}] ${r.url}`);
      });
      console.log('');
    }

  } catch (error) {
    console.error('\n💥 Error:', error.message);
  } finally {
    await browser.close();
  }
})();
