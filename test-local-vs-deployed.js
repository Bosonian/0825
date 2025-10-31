import { chromium } from '@playwright/test';

async function testURL(url, name) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  page.on('pageerror', error => {
    errors.push(error.toString());
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(4000);

    const state = await page.evaluate(() => {
      return {
        hasIGFAPApp: typeof window.iGFAPApp !== 'undefined',
        appStatus: window.iGFAPApp?.getStatus(),
        appContainerLength: document.getElementById('appContainer')?.innerHTML.length || 0
      };
    });

    console.log(`\n📊 ${name}:`);
    console.log(`   iGFAPApp: ${state.hasIGFAPApp}`);
    console.log(`   Status: ${JSON.stringify(state.appStatus)}`);
    console.log(`   Container: ${state.appContainerLength} chars`);
    console.log(`   Errors: ${errors.length}`);

    if (errors.length > 0) {
      console.log(`   Error details:`);
      errors.forEach(e => console.log(`     - ${e}`));
    }

    const working = state.hasIGFAPApp && state.appContainerLength > 50;
    console.log(`   ${working ? '✅ WORKING' : '❌ NOT WORKING'}\n`);

    await page.screenshot({ path: `/tmp/test-${name.toLowerCase().replace(/\s+/g, '-')}.png` });

    return working;

  } catch (error) {
    console.error(`\n❌ ${name} failed: ${error.message}\n`);
    return false;
  } finally {
    await browser.close();
  }
}

(async () => {
  console.log('\n🔍 Comparing local preview vs deployed version\n');
  console.log('='.repeat(60));

  const localWorks = await testURL('http://localhost:3020/0825/', 'LOCAL PREVIEW');
  const deployedWorks = await testURL('https://igfap.eu/0825/', 'DEPLOYED');

  console.log('='.repeat(60));
  console.log('\n📊 COMPARISON RESULT:\n');
  console.log(`   Local:    ${localWorks ? '✅ Working' : '❌ Broken'}`);
  console.log(`   Deployed: ${deployedWorks ? '✅ Working' : '❌ Broken'}`);

  if (localWorks && !deployedWorks) {
    console.log('\n🔍 Local works but deployed does not - possible causes:');
    console.log('   - GitHub Pages caching old files');
    console.log('   - CORS or security policy differences');
    console.log('   - Service worker interfering');
    console.log('   - Missing file on GitHub Pages');
  } else if (!localWorks && !deployedWorks) {
    console.log('\n⚠️  Neither works - the build has an issue');
  } else if (localWorks && deployedWorks) {
    console.log('\n✅ Both work! Deployment successful!');
  }

  console.log('');
})();
