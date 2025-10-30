/**
 * Test kiosk flow with Playwright
 * Simulates clicking a case card and navigating to PWA
 */
import { chromium } from '@playwright/test';

async function testKioskFlow() {
  console.log('🚀 Starting kiosk flow test...\n');

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
    // Step 1: Navigate to kiosk (use localhost since GitHub Pages takes time)
    console.log('\n📍 Step 1: Opening kiosk at localhost...');
    await page.goto('http://localhost:3002/kiosk/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'test-screenshots/01-kiosk-loaded.png' });
    console.log('✅ Kiosk loaded');

    // Wait a bit for cases to load
    await page.waitForTimeout(3000);

    // Step 2: Look for case cards
    console.log('\n📍 Step 2: Looking for case cards...');
    const caseCards = await page.$$('.case-card');
    console.log(`Found ${caseCards.length} case cards`);

    if (caseCards.length === 0) {
      console.log('⚠️  No case cards found. Creating a test case in PWA first...');

      // Navigate to PWA to create a test case
      await page.goto('http://localhost:4173/0825/', { waitUntil: 'networkidle' });
      await page.screenshot({ path: 'test-screenshots/02-pwa-opened.png' });

      console.log('\n⚠️  Please create a test case in the PWA manually and run this test again.');
      await page.waitForTimeout(5000);
    } else {
      // Step 3: Click first case card
      console.log('\n📍 Step 3: Clicking first case card...');
      await caseCards[0].click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'test-screenshots/03-after-click.png' });

      // Step 4: Check current URL
      const currentURL = page.url();
      console.log(`\n📍 Step 4: Current URL: ${currentURL}`);

      // Parse URL to check for kiosk mode params
      const url = new URL(currentURL);
      console.log(`  - Hash: ${url.hash}`);
      console.log(`  - Search params in hash: ${url.hash.includes('?')}`);

      if (url.hash.includes('display=kiosk')) {
        console.log('✅ Kiosk mode parameter detected!');
      } else {
        console.log('❌ Kiosk mode parameter NOT found!');
      }

      // Step 5: Wait for page to load and check content
      await page.waitForTimeout(3000);
      await page.screenshot({ path: 'test-screenshots/04-final-state.png' });

      // Check if login screen is visible
      const loginVisible = await page.isVisible('text=/login/i').catch(() => false);
      const resultsVisible = await page.isVisible('.risk-results-single, .circles-container').catch(() => false);

      console.log(`\n📍 Step 5: Page state:`);
      console.log(`  - Login screen visible: ${loginVisible}`);
      console.log(`  - Results visible: ${resultsVisible}`);

      // Get page title
      const title = await page.title();
      console.log(`  - Page title: ${title}`);

      // Check for error messages
      const errorText = await page.textContent('body').catch(() => '');
      if (errorText.includes('error') || errorText.includes('Error')) {
        console.log('⚠️  Error message detected in page');
      }
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    await page.screenshot({ path: 'test-screenshots/error-state.png' });
  }

  // Keep browser open for inspection
  console.log('\n✅ Test complete. Browser will stay open for 30 seconds for inspection...');
  console.log('📸 Screenshots saved to test-screenshots/');
  console.log('\n📝 Console logs captured:');
  logs.forEach(log => console.log(`  ${log}`));

  await page.waitForTimeout(30000);
  await browser.close();
}

// Create screenshots directory
import { mkdirSync } from 'fs';
try {
  mkdirSync('test-screenshots', { recursive: true });
} catch (e) {}

testKioskFlow();
