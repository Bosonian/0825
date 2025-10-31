import { chromium } from '@playwright/test';

(async () => {
  console.log('🔍 Testing https://igfap.eu/0825/\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });

  // Collect errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.toString());
  });

  // Failed requests
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push(`${request.url()} - ${request.failure().errorText}`);
  });

  try {
    console.log('📡 Loading page...');
    await page.goto('https://igfap.eu/0825/', {
      waitUntil: 'networkidle',
      timeout: 15000
    });

    console.log('✅ Page loaded\n');

    // Take screenshot
    await page.screenshot({ path: '/tmp/deployment-check.png', fullPage: true });
    console.log('📸 Screenshot: /tmp/deployment-check.png\n');

    // Check what's visible
    const title = await page.title();
    console.log(`📄 Title: ${title}`);

    const appContainer = await page.locator('#appContainer').count();
    console.log(`   #appContainer found: ${appContainer > 0}`);

    const passwordInput = await page.locator('input[type="password"]').count();
    console.log(`   Password input found: ${passwordInput > 0}`);

    const appContainerContent = await page.locator('#appContainer').innerHTML().catch(() => 'Error getting content');
    console.log(`   #appContainer content length: ${appContainerContent.length} chars`);

    if (appContainerContent.length < 100) {
      console.log(`   Content preview: "${appContainerContent.substring(0, 200)}"`);
    }

    // Check for errors
    console.log(`\n📊 Diagnostics:`);
    console.log(`   Failed requests: ${failedRequests.length}`);
    console.log(`   JavaScript errors: ${errors.length}`);
    console.log(`   Console messages: ${consoleMessages.length}`);

    if (failedRequests.length > 0) {
      console.log('\n❌ Failed Requests:');
      failedRequests.forEach(r => console.log(`   ${r}`));
    }

    if (errors.length > 0) {
      console.log('\n❌ JavaScript Errors:');
      errors.forEach(e => console.log(`   ${e}`));
    }

    if (consoleMessages.filter(m => m.startsWith('[error]')).length > 0) {
      console.log('\n❌ Console Errors:');
      consoleMessages.filter(m => m.startsWith('[error]')).forEach(m => console.log(`   ${m}`));
    }

    // Wait a bit to see the page
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n💥 Error:', error.message);
  } finally {
    await browser.close();
  }
})();
