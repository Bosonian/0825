/**
 * Test Kiosk Home Button Mapping
 * Verifies that home button navigates to kiosk when in kiosk mode
 */

import puppeteer from 'puppeteer';

async function testKioskHomeButton() {
  console.log('🧪 Testing Kiosk Home Button Mapping...\n');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Test 1: Progress Indicator Translation
    console.log('📊 Test 1: Progress Indicator Translation');
    await page.goto('http://localhost:3020/0825/', { waitUntil: 'networkidle2' });

    // Check if progress indicator exists and is in English by default
    await page.waitForSelector('.progress-indicator', { timeout: 5000 });
    const progressTextEN = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('.progress-label'));
      return labels.map(l => l.textContent.trim());
    });
    console.log('   English labels:', progressTextEN);

    // Toggle to German
    await page.click('#languageToggle');
    await page.waitForTimeout(500);

    const progressTextDE = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('.progress-label'));
      return labels.map(l => l.textContent.trim());
    });
    console.log('   German labels:', progressTextDE);

    if (progressTextDE.includes('BEURTEILUNG')) {
      console.log('   ✅ Progress indicator translation works!\n');
    } else {
      console.log('   ❌ Progress indicator not translating\n');
    }

    // Test 2: Normal Home Button Behavior (not in kiosk mode)
    console.log('🏠 Test 2: Normal Home Button (not kiosk mode)');
    const initialUrl = page.url();

    // Click home button
    await page.click('#homeButton');
    await page.waitForTimeout(500);

    const afterHomeUrl = page.url();
    console.log('   URL before home click:', initialUrl);
    console.log('   URL after home click:', afterHomeUrl);

    if (afterHomeUrl === initialUrl || afterHomeUrl.includes('localhost:3020')) {
      console.log('   ✅ Normal home button stays in PWA\n');
    } else {
      console.log('   ❌ Home button navigated unexpectedly\n');
    }

    // Test 3: Kiosk Mode Home Button Behavior
    console.log('🏥 Test 3: Kiosk Mode Home Button');

    // Navigate to PWA with kiosk mode parameters
    const kioskUrl = 'http://localhost:3020/0825/#/results?display=kiosk&caseId=test_case_123';
    await page.goto(kioskUrl, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(1000);

    console.log('   Navigated to:', kioskUrl);

    // Set up navigation listener
    const navigationPromise = page.waitForNavigation({ timeout: 5000 }).catch(() => null);

    // Click home button in kiosk mode
    await page.click('#homeButton');

    // Wait for navigation
    await navigationPromise;
    await page.waitForTimeout(500);

    const kioskModeUrl = page.url();
    console.log('   URL after kiosk home click:', kioskModeUrl);

    if (kioskModeUrl.includes('localhost:3001') || kioskModeUrl.includes('localhost:3002') || kioskModeUrl.includes('localhost:3003')) {
      console.log('   ✅ Home button correctly navigates to kiosk!\n');
    } else {
      console.log('   ❌ Home button did not navigate to kiosk\n');
      console.log('   Expected: localhost:3001/3002/3003');
      console.log('   Got:', kioskModeUrl);
    }

    console.log('✨ Tests completed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run tests
testKioskHomeButton().catch(console.error);
