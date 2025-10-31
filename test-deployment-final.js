import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log(`❌ [CONSOLE ERROR] ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    pageErrors.push(error.toString());
    console.log(`❌ [PAGE ERROR] ${error.toString()}`);
  });

  try {
    console.log('\n🚀 Testing deployment at https://igfap.eu/0825/\n');
    console.log('⏳ Waiting 30 seconds for GitHub Pages to deploy...\n');

    await new Promise(resolve => setTimeout(resolve, 30000));

    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✅ Page loaded\n');

    await page.waitForTimeout(3000);

    // Check JavaScript execution
    const appStatus = await page.evaluate(() => {
      return {
        hasWindowApp: typeof window.app !== 'undefined',
        hasStore: typeof window.store !== 'undefined',
        appContainerHasContent: document.getElementById('appContainer')?.innerHTML.length > 0,
        appContainerContent: document.getElementById('appContainer')?.innerHTML.substring(0, 200) || 'EMPTY'
      };
    });

    console.log('🔍 JavaScript Status:');
    console.log(`   window.app exists: ${appStatus.hasWindowApp}`);
    console.log(`   window.store exists: ${appStatus.hasStore}`);
    console.log(`   #appContainer has content: ${appStatus.appContainerHasContent}`);
    console.log(`   Content preview: ${appStatus.appContainerContent}\n`);

    // Check if CSS is applied
    const cssApplied = await page.evaluate(() => {
      const header = document.querySelector('.app-header');
      if (!header) return false;
      const styles = window.getComputedStyle(header);
      return styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
    });

    console.log(`🎨 CSS Applied: ${cssApplied}\n`);

    // Take screenshot
    await page.screenshot({ path: '/tmp/deployment-final-check.png', fullPage: true });
    console.log('📸 Screenshot saved to /tmp/deployment-final-check.png\n');

    // Summary
    console.log('📊 SUMMARY:');
    console.log(`   Console Errors: ${consoleErrors.length}`);
    console.log(`   Page Errors: ${pageErrors.length}`);

    if (appStatus.hasWindowApp && appStatus.appContainerHasContent && cssApplied && consoleErrors.length === 0 && pageErrors.length === 0) {
      console.log('\n✅ ✅ ✅ DEPLOYMENT SUCCESSFUL! ✅ ✅ ✅');
      console.log('   All systems operational:\n');
      console.log('   ✓ JavaScript executing correctly');
      console.log('   ✓ App initialized');
      console.log('   ✓ Content rendering');
      console.log('   ✓ CSS styling applied');
      console.log('   ✓ No errors detected\n');
    } else {
      console.log('\n⚠️  ISSUES DETECTED:\n');
      if (!appStatus.hasWindowApp) console.log('   ✗ window.app not initialized');
      if (!appStatus.appContainerHasContent) console.log('   ✗ #appContainer is empty');
      if (!cssApplied) console.log('   ✗ CSS not applied');
      if (consoleErrors.length > 0) {
        console.log(`   ✗ ${consoleErrors.length} console errors:`);
        consoleErrors.forEach(e => console.log(`     - ${e}`));
      }
      if (pageErrors.length > 0) {
        console.log(`   ✗ ${pageErrors.length} page errors:`);
        pageErrors.forEach(e => console.log(`     - ${e}`));
      }
      console.log('');
    }

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n💥 Test Failed:', error.message);
  } finally {
    await browser.close();
  }
})();
