/**
 * Final test for production PWA
 */
import { chromium } from '@playwright/test';

async function testPWAFinal() {
  console.log('🔍 Final PWA verification test...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const logs = [];
  page.on('console', msg => logs.push(msg.text()));

  try {
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    const hasAppContainer = await page.$('#appContainer');
    const hasContent = await page.evaluate(() => {
      const container = document.getElementById('appContainer');
      return container && container.innerHTML.length > 100;
    });

    const title = await page.title();
    const hasLoginForm = await page.$('input[type="password"]');
    const hasTriageButtons = await page.$$('button[data-action="triage1"]');

    console.log('✅ PWA Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Title: ${title}`);
    console.log(`  #appContainer exists: ${!!hasAppContainer}`);
    console.log(`  Container has content: ${hasContent}`);
    console.log(`  Login form visible: ${!!hasLoginForm}`);
    console.log(`  Triage buttons: ${hasTriageButtons.length}`);

    if (hasAppContainer && (hasLoginForm || hasTriageButtons.length > 0)) {
      console.log('\n✅✅✅ PWA IS WORKING! ✅✅✅');
    } else {
      console.log('\n⚠️  PWA may have issues');
    }

    await page.screenshot({ path: 'test-screenshots/pwa-final-check.png', fullPage: true });
    console.log('\n📸 Screenshot: test-screenshots/pwa-final-check.png');

    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
}

testPWAFinal();
