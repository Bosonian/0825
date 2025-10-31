import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const allLogs = [];

  page.on('console', msg => {
    allLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', error => {
    console.log(`\n💥 PAGE ERROR: ${error.toString()}`);
  });

  try {
    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✅ Page loaded, waiting 5 seconds...\n');
    await page.waitForTimeout(5000);

    const state = await page.evaluate(() => {
      return {
        iGFAPApp: typeof window.iGFAPApp !== 'undefined',
        appStatus: window.iGFAPApp?.getStatus(),
        currentScreen: window.iGFAPApp?.getCurrentScreen(),
        appContainerHTML: document.getElementById('appContainer')?.innerHTML,
        bodyHTML: document.body.innerHTML.substring(0, 500)
      };
    });

    console.log('📊 STATE:');
    console.log(`   window.iGFAPApp exists: ${state.iGFAPApp}`);
    console.log(`   App status:`, state.appStatus);
    console.log(`   Current screen: ${state.currentScreen}`);
    console.log(`   #appContainer length: ${state.appContainerHTML?.length || 0} chars`);
    console.log(`   Body preview: ${state.bodyHTML.substring(0, 200)}...\n`);

    console.log('📝 ALL CONSOLE LOGS:');
    allLogs.forEach(log => {
      console.log(`   [${log.type}] ${log.text}`);
    });

    await page.screenshot({ path: '/tmp/full-diagnosis.png', fullPage: true });
    console.log('\n📸 Screenshot saved to /tmp/full-diagnosis.png\n');

    if (state.iGFAPApp && state.appContainerHTML && state.appContainerHTML.length > 50) {
      console.log('✅ APP IS RENDERING!\n');
    } else if (state.iGFAPApp && (!state.appContainerHTML || state.appContainerHTML.length < 50)) {
      console.log('⚠️  APP EXISTS BUT NOT RENDERING\n');
      console.log('Possible causes:');
      console.log('- App initialization failed');
      console.log('- Routing not working');
      console.log('- Authentication blocking render');
    } else {
      console.log('❌ APP NOT LOADED\n');
    }

  } catch (error) {
    console.error('\n💥 Error:', error.message);
  } finally {
    await browser.close();
  }
})();
