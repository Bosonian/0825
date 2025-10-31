/**
 * Test that speedometer/tachometer loads correctly after fix
 */
import { chromium } from '@playwright/test';

async function testSpeedometerFix() {
  console.log('🔍 Testing speedometer/tachometer loading after mountIslands fix...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture console logs
  page.on('console', msg => console.log(`[Browser ${msg.type()}] ${msg.text()}`));
  page.on('pageerror', error => console.error(`[PAGE ERROR] ${error.message}`));

  try {
    console.log('📍 Step 1: Navigate to local preview results page...');
    // Using a case with high ICH/LVO where tachometer should show
    await page.goto('http://localhost:4173/0825/#results?display=kiosk&caseId=case_1761866194_d0b35af5', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('\n⏳ Waiting 3 seconds for React islands to mount...');
    await page.waitForTimeout(3000);

    // Check for tachometer element
    const tachometerExists = await page.evaluate(() => {
      const tachometerContainer = document.querySelector('[data-react-tachometer]');
      return {
        containerExists: !!tachometerContainer,
        hasMountedFlag: tachometerContainer ? tachometerContainer.__mounted : false,
        hasRoot: tachometerContainer ? !!tachometerContainer.__root : false,
        innerHTML: tachometerContainer ? tachometerContainer.innerHTML.substring(0, 100) : null,
      };
    });

    console.log('\n📊 Tachometer Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Container exists: ${tachometerExists.containerExists}`);
    console.log(`  Mounted flag: ${tachometerExists.hasMountedFlag}`);
    console.log(`  Has React root: ${tachometerExists.hasRoot}`);
    console.log(`  Content preview: ${tachometerExists.innerHTML || 'empty'}`);

    // Check for probability rings as well
    const ringsStatus = await page.evaluate(() => {
      const rings = document.querySelectorAll('[data-react-ring]');
      return {
        count: rings.length,
        mounted: Array.from(rings).filter(r => r.__mounted).length,
      };
    });

    console.log(`\n📊 Probability Rings Status:`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Total rings: ${ringsStatus.count}`);
    console.log(`  Mounted rings: ${ringsStatus.mounted}`);

    // Visual verification
    if (tachometerExists.containerExists && tachometerExists.hasMountedFlag) {
      console.log('\n✅ SUCCESS! Speedometer/tachometer is mounted correctly!');
    } else if (tachometerExists.containerExists && !tachometerExists.hasMountedFlag) {
      console.log('\n⚠️  Container exists but React component not mounted!');
    } else {
      console.log('\n❌ Tachometer container not found in DOM');
    }

    // Take screenshot
    await page.screenshot({
      path: 'test-screenshots/speedometer-fix-verification.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot: test-screenshots/speedometer-fix-verification.png');

    console.log('\n⏳ Keeping browser open for 30 seconds for visual inspection...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    console.error(error.stack);
  }

  await browser.close();
}

testSpeedometerFix();
