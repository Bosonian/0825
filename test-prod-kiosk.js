/**
 * Test production kiosk authentication bypass
 */
import { chromium } from '@playwright/test';

async function testProdKiosk() {
  console.log('🚀 Testing production kiosk authentication bypass...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture console logs
  page.on('console', msg => {
    if (msg.type() === 'log' && msg.text().includes('[KioskLoader]')) {
      console.log(`[Browser] ${msg.text()}`);
    }
  });

  try {
    // Test with real production case
    const prodUrl = 'https://igfap.eu/0825/#results?display=kiosk&caseId=case_1761866194_d0b35af5';

    console.log('📍 Navigating to:', prodUrl);
    await page.goto(prodUrl, { waitUntil: 'networkidle' });

    // Wait for page to settle
    await page.waitForTimeout(3000);

    // Check what's displayed
    const loginVisible = await page.isVisible('text=/login/i').catch(() => false);
    const loginFormVisible = await page.isVisible('form[data-module="login"]').catch(() => false);
    const resultsVisible = await page.isVisible('.risk-results-single, .circles-container').catch(() => false);
    const backButton = await page.isVisible('button:has-text("Back to Case List"), button:has-text("Zurück zur Fallliste")').catch(() => false);
    const caseNotFound = await page.isVisible('text="Case Not Found"').catch(() => false);

    // Get page title
    const title = await page.title();
    const h2Text = await page.textContent('h2').catch(() => '');

    console.log('\n📊 Production Test Results:');
    console.log(`  Page Title: "${title}"`);
    console.log(`  H2 Heading: "${h2Text}"`);
    console.log(`  Login Screen: ${loginVisible || loginFormVisible ? '❌ SHOWN (BAD)' : '✅ HIDDEN (GOOD)'}`);
    console.log(`  Results Page: ${resultsVisible ? '✅ SHOWN (GOOD)' : '❌ HIDDEN (BAD)'}`);
    console.log(`  Back to Kiosk Button: ${backButton ? '✅ PRESENT' : '❌ MISSING'}`);
    console.log(`  Case Not Found: ${caseNotFound ? '⚠️  YES' : '✅ NO'}`);

    // Take screenshot
    await page.screenshot({ path: 'test-screenshots/prod-kiosk-test.png' });
    console.log('\n📸 Screenshot saved to test-screenshots/prod-kiosk-test.png');

    // Verdict
    console.log('\n🎯 VERDICT:');
    if (loginVisible || loginFormVisible) {
      console.log('❌ FAILED: Login screen is showing');
    } else if (caseNotFound) {
      console.log('⚠️  Case not found (might be normal if case expired)');
    } else if (resultsVisible && backButton) {
      console.log('✅ SUCCESS: Authentication bypass working!');
    } else {
      console.log('⚠️  UNCLEAR: Check screenshot');
    }

    // Keep open for inspection
    console.log('\n⏳ Keeping browser open for 30 seconds...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }

  await browser.close();
}

testProdKiosk();
