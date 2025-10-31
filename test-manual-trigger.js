import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.log(`\n💥 UNCAUGHT ERROR: ${error.toString()}`);
    console.log(`Stack: ${error.stack}\n`);
  });

  // Catch unhandled promise rejections
  page.on('console', async msg => {
    if (msg.type() === 'error' && msg.text().includes('Unhandled')) {
      const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
      console.log('🚨 Unhandled Promise Rejection:', args);
    }
  });

  try {
    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('\n⏳ Waiting 5 seconds for app initialization...\n');
    await page.waitForTimeout(5000);

    // Try to manually restart the app
    console.log('🔄 Attempting manual app restart...\n');
    const restartResult = await page.evaluate(() => {
      if (window.iGFAPApp && window.iGFAPApp.restart) {
        return window.iGFAPApp.restart().then(() => 'Restart successful').catch(e => `Restart failed: ${e.message}`);
      }
      return 'No restart function available';
    });
    console.log(`Restart result: ${restartResult}\n`);

    await page.waitForTimeout(2000);

    // Check if it worked
    const finalState = await page.evaluate(() => {
      return {
        appStatus: window.iGFAPApp?.getStatus(),
        currentScreen: window.iGFAPApp?.getCurrentScreen(),
        appContainerLength: document.getElementById('appContainer')?.innerHTML.length || 0
      };
    });

    console.log('📊 FINAL STATE:');
    console.log(`   Status:`, finalState.appStatus);
    console.log(`   Screen: ${finalState.currentScreen}`);
    console.log(`   Container: ${finalState.appContainerLength} chars\n`);

    if (finalState.appContainerLength > 50) {
      console.log('✅ APP IS NOW RENDERING!\n');
      await page.screenshot({ path: '/tmp/after-restart.png', fullPage: true });
      console.log('📸 Screenshot saved\n');
    } else {
      console.log('❌ Still not rendering\n');
    }

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n💥 Error:', error.message);
  } finally {
    await browser.close();
  }
})();
