import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.log(`\n❌ PAGE ERROR:\n${error.toString()}\n${error.stack}\n`);
  });

  try {
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    await page.waitForTimeout(3000);

    // Check what's in #appContainer
    const appContent = await page.locator('#appContainer').innerHTML();
    console.log(`\n📦 #appContainer content (${appContent.length} chars):`);
    console.log(appContent.substring(0, 500));

    // Try to execute window.app
    const appExists = await page.evaluate(() => {
      return {
        hasApp: typeof window.app !== 'undefined',
        hasStore: typeof window.store !== 'undefined',
        appContainerHTML: document.getElementById('appContainer')?.innerHTML || 'EMPTY'
      };
    });

    console.log('\n🔍 Window objects:');
    console.log(`   window.app exists: ${appExists.hasApp}`);
    console.log(`   window.store exists: ${appExists.hasStore}`);
    console.log(`   appContainer: ${appExists.appContainerHTML.substring(0, 100)}`);

    await page.screenshot({ path: '/tmp/js-execution.png', fullPage: true });

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
