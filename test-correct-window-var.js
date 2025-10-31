import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(3000);

    const appState = await page.evaluate(() => {
      return {
        hasWindowApp: typeof window.app !== 'undefined',
        hasIGFAPApp: typeof window.iGFAPApp !== 'undefined',
        appContainerHTML: document.getElementById('appContainer')?.innerHTML || 'EMPTY',
        appStatus: typeof window.iGFAPApp !== 'undefined' ? window.iGFAPApp.getStatus() : null,
        currentScreen: typeof window.iGFAPApp !== 'undefined' ? window.iGFAPApp.getCurrentScreen() : null
      };
    });

    console.log('\n✅ CORRECT CHECK:\n');
    console.log(`   window.app: ${appState.hasWindowApp}`);
    console.log(`   window.iGFAPApp: ${appState.hasIGFAPApp} ⭐️`);
    console.log(`   App status:`, appState.appStatus);
    console.log(`   Current screen: ${appState.currentScreen}`);
    console.log(`   #appContainer content: ${appState.appContainerHTML.substring(0, 200)}\n`);

    if (appState.hasIGFAPApp && appState.appContainerHTML.length > 10) {
      console.log('✅ ✅ ✅ APP IS WORKING! ✅ ✅ ✅\n');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
