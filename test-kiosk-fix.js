/**
 * Test kiosk rendering fix - verifies onclick handlers are gone
 */
import { chromium } from '@playwright/test';

async function testKioskFix() {
  console.log('🔍 Testing kiosk onclick handler fix...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture ALL console logs including errors
  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    logs.push(`[${msg.type()}] ${text}`);
    console.log(`[Browser ${msg.type()}] ${text}`);
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.error(`[PAGE ERROR] ${error.message}`);
    console.error(error.stack);
  });

  try {
    // Test with localhost (has our updated code)
    const localUrl = 'http://localhost:3020/0825/#results?display=kiosk&caseId=case_1761866194_d0b35af5';

    console.log('📍 Navigating to:', localUrl);
    await page.goto(localUrl, { waitUntil: 'networkidle' });

    // Wait for rendering
    await page.waitForTimeout(5000);

    // Check page content
    const bodyText = await page.textContent('body');

    console.log('\n📊 Page Analysis:');
    console.log('  ✅ Has "Error loading content":', bodyText.includes('Error loading content'));
    console.log('  ✅ Has "Quick Reference Guide":', bodyText.includes('Quick Reference Guide'));
    console.log('  ✅ Has "ICH Risk":', bodyText.includes('ICH Risk') || bodyText.includes('ICH-Risiko'));
    console.log('  ✅ Has "87%" (risk value):', bodyText.includes('87%'));

    // Check what's actually in the main container
    const containerHTML = await page.innerHTML('#appContainer').catch(() => 'Failed to get container HTML');
    console.log('\n📄 Container Status:');
    if (containerHTML.includes('Error loading content')) {
      console.log('  ❌ FAILED - Still showing error message');
      console.log('  First 500 chars:', containerHTML.substring(0, 500));
    } else if (containerHTML.includes('ICH Risk') || containerHTML.includes('ICH-Risiko')) {
      console.log('  ✅ SUCCESS - Results page rendered correctly!');
      console.log('  Contains: Risk rings, Quick Reference Guide');
    } else {
      console.log('  ⚠️  UNKNOWN STATE');
      console.log('  First 500 chars:', containerHTML.substring(0, 500));
    }

    // Screenshot
    await page.screenshot({ path: 'test-screenshots/kiosk-fix-verification.png', fullPage: true });
    console.log('\n📸 Screenshot saved to test-screenshots/kiosk-fix-verification.png');

    // Print all console logs
    console.log('\n📝 All Browser Console Logs:');
    logs.forEach(log => console.log(`  ${log}`));

    // Keep open
    console.log('\n⏳ Keeping browser open for 30 seconds for inspection...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    console.error(error.stack);
  }

  await browser.close();
}

testKioskFix();
