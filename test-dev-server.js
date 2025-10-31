import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  page.on('console', msg => console.log(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', error => console.log(`💥 ERROR: ${error.toString()}`));

  try {
    console.log('\n🔍 Testing DEV server at http://localhost:5173\n');

    await page.goto('http://localhost:5173', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(3000);

    const state = await page.evaluate(() => {
      return {
        hasIGFAPApp: typeof window.iGFAPApp !== 'undefined',
        appStatus: window.iGFAPApp?.getStatus(),
        appContainerLength: document.getElementById('appContainer')?.innerHTML.length || 0
      };
    });

    console.log('\n📊 DEV SERVER STATE:');
    console.log(`   window.iGFAPApp: ${state.hasIGFAPApp}`);
    console.log(`   App status:`, state.appStatus);
    console.log(`   Container: ${state.appContainerLength} chars\n`);

    if (state.hasIGFAPApp && state.appContainerLength > 50) {
      console.log('✅ DEV SERVER WORKS!\n');
      await page.screenshot({ path: '/tmp/dev-server-working.png', fullPage: true });
    } else {
      console.log('❌ DEV SERVER BROKEN TOO!\n');
    }

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n💥 Error:', error.message);
  } finally {
    await browser.close();
  }
})();
