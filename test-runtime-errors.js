import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const allConsoleMessages = [];
  const allErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    allConsoleMessages.push({ type, text });

    if (type === 'error') {
      console.log(`❌ [ERROR] ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️  [WARN] ${text}`);
    } else if (type === 'log') {
      console.log(`ℹ️  [LOG] ${text}`);
    }
  });

  page.on('pageerror', error => {
    allErrors.push(error.toString());
    console.log(`💥 [EXCEPTION] ${error.toString()}`);
    console.log(`   Stack: ${error.stack}`);
  });

  try {
    console.log('\n🔍 Checking for runtime errors at https://igfap.eu/0825/\n');

    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('\n✅ Page loaded, waiting 5 seconds for JS execution...\n');

    await page.waitForTimeout(5000);

    // Check app state
    const appState = await page.evaluate(() => {
      return {
        hasWindowApp: typeof window.app !== 'undefined',
        hasStore: typeof window.store !== 'undefined',
        appType: typeof window.app,
        storeType: typeof window.store,
        appContainerHTML: document.getElementById('appContainer')?.innerHTML || 'EMPTY',
        documentReadyState: document.readyState,
        bodyHTML: document.body.innerHTML.length
      };
    });

    console.log('\n📊 APP STATE:');
    console.log(`   window.app: ${appState.hasWindowApp} (type: ${appState.appType})`);
    console.log(`   window.store: ${appState.hasStore} (type: ${appState.storeType})`);
    console.log(`   #appContainer: ${appState.appContainerHTML.substring(0, 100)}`);
    console.log(`   document.readyState: ${appState.documentReadyState}`);
    console.log(`   body HTML length: ${appState.bodyHTML} characters\n`);

    console.log('📝 CONSOLE MESSAGES SUMMARY:');
    console.log(`   Total: ${allConsoleMessages.length}`);
    console.log(`   Errors: ${allConsoleMessages.filter(m => m.type === 'error').length}`);
    console.log(`   Warnings: ${allConsoleMessages.filter(m => m.type === 'warning').length}`);
    console.log(`   Logs: ${allConsoleMessages.filter(m => m.type === 'log').length}\n`);

    if (allErrors.length > 0) {
      console.log('💥 PAGE EXCEPTIONS:');
      allErrors.forEach(e => console.log(`   ${e}`));
    }

  } catch (error) {
    console.error('\n💥 Test Error:', error.message);
  } finally {
    await browser.close();
  }
})();
