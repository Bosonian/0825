/**
 * Test kiosk rendering with actual production data
 */
import { chromium } from '@playwright/test';

async function testKioskRendering() {
  console.log('🔍 Testing kiosk rendering with production case data...\n');

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
    // Use the real production case
    const prodUrl = 'https://igfap.eu/0825/#results?display=kiosk&caseId=case_1761866194_d0b35af5';

    console.log('📍 Navigating to:', prodUrl);
    await page.goto(prodUrl, { waitUntil: 'networkidle' });

    // Wait for rendering
    await page.waitForTimeout(5000);

    // Check page content
    const bodyText = await page.textContent('body');

    console.log('\n📊 Page Analysis:');
    console.log('  Has "Error loading content":', bodyText.includes('Error loading content'));
    console.log('  Has "Quick Reference Guide":', bodyText.includes('Quick Reference Guide'));
    console.log('  Has "ICH Risk":', bodyText.includes('ICH Risk') || bodyText.includes('ICH-Risiko'));

    // Try to get any error elements
    const errorMsg = await page.textContent('.error-message').catch(() => null);
    if (errorMsg) {
      console.log('  Error message found:', errorMsg);
    }

    // Check what's actually in the main container
    const containerHTML = await page.innerHTML('#appContainer').catch(() => 'Failed to get container HTML');
    console.log('\n📄 Container HTML (first 500 chars):');
    console.log(containerHTML.substring(0, 500));

    // Screenshot
    await page.screenshot({ path: 'test-screenshots/kiosk-render-debug.png', fullPage: true });
    console.log('\n📸 Screenshot saved');

    // Print all console logs
    console.log('\n📝 All Browser Console Logs:');
    logs.forEach(log => console.log(`  ${log}`));

    // Keep open
    console.log('\n⏳ Keeping browser open for 60 seconds for inspection...');
    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    console.error(error.stack);
  }

  await browser.close();
}

testKioskRendering();
