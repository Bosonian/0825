/**
 * Test kiosk mode authentication bypass
 * Directly navigates to PWA with kiosk parameters to check auth skip
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

// Create screenshots directory
try {
  mkdirSync('test-screenshots', { recursive: true });
} catch (e) {}

async function testKioskAuthBypass() {
  console.log('🚀 Testing kiosk mode authentication bypass...\\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Capture console logs
  const logs = [];
  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
    console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`);
  });

  // Capture errors
  page.on('pageerror', error => {
    console.error(`[Browser Error] ${error.message}`);
  });

  try {
    // Step 1: Navigate directly to PWA with kiosk mode parameters
    // Using a test caseId (even if it doesn't exist, we can check if auth is bypassed)
    const kioskModeUrl = 'http://localhost:3020/0825/#results?display=kiosk&caseId=test_case_001';

    console.log('\\n📍 Step 1: Navigating to PWA with kiosk mode parameters...');
    console.log(`URL: ${kioskModeUrl}`);

    await page.goto(kioskModeUrl, { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'test-screenshots/kiosk-mode-initial.png' });
    console.log('✅ Page loaded');

    // Wait for page to settle
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-screenshots/kiosk-mode-after-wait.png' });

    // Step 2: Check what's displayed
    const currentURL = page.url();
    console.log(`\\n📍 Step 2: Current URL after navigation: ${currentURL}`);

    // Check for login screen
    const loginVisible = await page.isVisible('text=/login/i').catch(() => false);
    const loginFormVisible = await page.isVisible('form[data-module="login"]').catch(() => false);
    const loginButtonVisible = await page.isVisible('button:has-text("Login")').catch(() => false);

    // Check for results screen
    const resultsVisible = await page.isVisible('.risk-results-single').catch(() => false);
    const circlesVisible = await page.isVisible('.circles-container').catch(() => false);
    const backToKioskButton = await page.isVisible('button:has-text("Back to Case List")').catch(() => false);

    // Check page content
    const bodyText = await page.textContent('body').catch(() => '');

    console.log(`\\n📍 Step 3: Page state analysis:`);
    console.log(`  - Login screen visible: ${loginVisible || loginFormVisible || loginButtonVisible}`);
    console.log(`  - Results screen visible: ${resultsVisible || circlesVisible}`);
    console.log(`  - Back to Case List button visible: ${backToKioskButton}`);
    console.log(`  - Page contains "login" text: ${bodyText.toLowerCase().includes('login')}`);
    console.log(`  - Page contains "Case Not Found": ${bodyText.includes('Case Not Found')}`);

    // Get all visible text
    const h1Text = await page.textContent('h1').catch(() => '');
    const h2Text = await page.textContent('h2').catch(() => '');
    console.log(`  - H1: "${h1Text}"`);
    console.log(`  - H2: "${h2Text}"`);

    // Verdict
    console.log(`\\n📊 VERDICT:`);
    if (loginVisible || loginFormVisible || loginButtonVisible) {
      console.log('❌ FAILED: Login screen is showing - authentication bypass NOT working!');
    } else if (bodyText.includes('Case Not Found')) {
      console.log('✅ PARTIAL SUCCESS: No login screen (good!), but case not found (expected for test ID)');
      console.log('   Authentication bypass is working correctly.');
    } else if (resultsVisible || circlesVisible) {
      console.log('✅ SUCCESS: Results screen is showing - authentication bypass working!');
    } else {
      console.log('⚠️  UNCLEAR: Neither login nor results visible. Check screenshots.');
    }

  } catch (error) {
    console.error('\\n❌ Test failed:', error.message);
    await page.screenshot({ path: 'test-screenshots/kiosk-mode-error.png' });
  }

  // Keep browser open for inspection
  console.log('\\n✅ Test complete. Browser will stay open for 30 seconds for inspection...');
  console.log('📸 Screenshots saved to test-screenshots/');
  console.log('\\n📝 Console logs captured:');
  logs.forEach(log => console.log(`  ${log}`));

  await page.waitForTimeout(30000);
  await browser.close();
}

testKioskAuthBypass();
