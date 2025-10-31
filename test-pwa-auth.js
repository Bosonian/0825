/**
 * Test PWA authentication with password
 */
import { chromium } from '@playwright/test';

async function testPWAAuth() {
  console.log('🔍 Testing PWA authentication...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Capture console logs and errors
  page.on('console', msg => {
    console.log(`[Browser ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.error(`[PAGE ERROR] ${error.message}`);
  });

  // Capture network requests
  const apiCalls = [];
  page.on('response', response => {
    const url = response.url();
    if (url.includes('authenticate') || url.includes('cloudfunctions')) {
      apiCalls.push({
        url,
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });

  try {
    console.log('📍 Step 1: Navigate to PWA...');
    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(2000);

    console.log('📍 Step 2: Check for login form...');
    const passwordInput = await page.$('input[type="password"]');
    const submitButton = await page.$('button[type="submit"]');

    if (!passwordInput || !submitButton) {
      console.log('❌ Login form not found!');
      await browser.close();
      return;
    }

    console.log('✅ Login form found');

    console.log('📍 Step 3: Enter password "Neuro25"...');
    await passwordInput.fill('Neuro25');
    await page.waitForTimeout(500);

    console.log('📍 Step 4: Click submit button...');
    await submitButton.click();

    console.log('\n⏳ Waiting 5 seconds for authentication...\n');
    await page.waitForTimeout(5000);

    // Check what happened
    const currentUrl = page.url();
    const bodyText = await page.textContent('body');
    const hasTriageButtons = (await page.$$('button[data-action="triage1"]')).length > 0;
    const hasErrorMessage = bodyText.toLowerCase().includes('invalid') ||
                            bodyText.toLowerCase().includes('error') ||
                            bodyText.toLowerCase().includes('failed');

    console.log('📊 Authentication Result:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Current URL: ${currentUrl}`);
    console.log(`  Has triage buttons: ${hasTriageButtons}`);
    console.log(`  Has error message: ${hasErrorMessage}`);
    console.log(`  Still on login screen: ${bodyText.includes('password') && !hasTriageButtons}`);

    console.log('\n📡 API Calls Made:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (apiCalls.length > 0) {
      apiCalls.forEach(call => {
        console.log(`  ${call.status} ${call.statusText}: ${call.url}`);
      });
    } else {
      console.log('  ⚠️  No authentication API calls detected!');
    }

    // Get error messages from page
    const errorElements = await page.$$('.error, .error-message, [role="alert"]');
    if (errorElements.length > 0) {
      console.log('\n⚠️  Error Messages on Page:');
      for (const el of errorElements) {
        const text = await el.textContent();
        console.log(`  - ${text}`);
      }
    }

    if (hasTriageButtons) {
      console.log('\n✅ AUTHENTICATION SUCCESSFUL!');
    } else {
      console.log('\n❌ AUTHENTICATION FAILED!');
    }

    await page.screenshot({
      path: 'test-screenshots/pwa-auth-result.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot: test-screenshots/pwa-auth-result.png');

    console.log('\n⏳ Keeping browser open for 20 seconds...');
    await page.waitForTimeout(20000);

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    console.error(error.stack);
  }

  await browser.close();
}

testPWAAuth();
