/**
 * Test kiosk with ALL hospitals to see active case
 */
import { chromium } from '@playwright/test';

async function testKioskAllHospitals() {
  console.log('🔍 Testing kiosk with ALL hospitals enabled...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture console
  page.on('console', msg => console.log(`[Browser ${msg.type()}] ${msg.text()}`));
  page.on('pageerror', error => console.error(`[PAGE ERROR] ${error.message}`));

  try {
    console.log('📍 Step 1: Navigate to kiosk');
    await page.goto('https://igfap.eu/kiosk/', { waitUntil: 'networkidle', timeout: 30000 });

    console.log('📍 Step 2: Set localStorage to show ALL hospitals');
    await page.evaluate(() => {
      localStorage.setItem('kiosk_hospital_id', '');  // Empty string = ALL hospitals
      localStorage.setItem('kiosk_hospital_name', 'All Hospitals');
    });

    console.log('📍 Step 3: Reload page');
    await page.reload({ waitUntil: 'networkidle' });

    console.log('⏳ Waiting 10 seconds for cases to load...\n');
    await page.waitForTimeout(10000);

    // Check case count
    const bodyText = await page.textContent('body');
    const caseCountMatch = bodyText.match(/(\d+)\s+Cases?/i);
    const caseCount = caseCountMatch ? parseInt(caseCountMatch[1]) : 0;

    console.log('📊 Kiosk Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Cases displayed: ${caseCount}`);

    //Look for case cards
    const caseCards = await page.$$('.case-card');
    const caseLinks = await page.$$('a[href*="0825"]');

    console.log(`  .case-card elements: ${caseCards.length}`);
    console.log(`  Links to /0825/: ${caseLinks.length}`);

    if (caseCount > 0) {
      console.log('\n✅ SUCCESS! Kiosk is showing cases');

      if (caseCards.length > 0 || caseLinks.length > 0) {
        console.log('\n📍 Step 4: Clicking on first case...');
        const clickTarget = caseCards[0] || caseLinks[0];
        await clickTarget.click();

        // Wait for PWA to load
        await page.waitForTimeout(5000);

        const currentUrl = page.url();
        const resultsBody = await page.textContent('body');

        console.log(`\n📍 After clicking case:`);
        console.log(`  Current URL: ${currentUrl}`);
        console.log(`  Has ICH Risk: ${resultsBody.includes('ICH Risk') || resultsBody.includes('ICH-Risiko')}`);
        console.log(`  Has Error: ${resultsBody.includes('Error loading content')}`);

        if ((resultsBody.includes('ICH Risk') || resultsBody.includes('ICH-Risiko')) && !resultsBody.includes('Error loading content')) {
          console.log('\n✅✅✅ COMPLETE KIOSK FLOW WORKING! ✅✅✅');
        } else {
          console.log('\n❌ Kiosk click works but results page has issues');
        }

        await page.screenshot({
          path: 'test-screenshots/kiosk-results-from-click.png',
          fullPage: true
        });
      }
    } else {
      console.log('\n❌ Still showing 0 cases');
    }

    // Screenshot
    await page.screenshot({
      path: 'test-screenshots/kiosk-all-hospitals.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot: test-screenshots/kiosk-all-hospitals.png');

    console.log('\n⏳ Keeping browser open for 45 seconds...');
    await page.waitForTimeout(45000);

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
  }

  await browser.close();
}

testKioskAllHospitals();
