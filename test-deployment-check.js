import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🔍 Testing https://igfap.eu/0825/');
  
  // Listen for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    errors.push(error.toString());
  });
  
  try {
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle', timeout: 15000 });
    
    // Wait for app to render
    await page.waitForSelector('#appContainer', { timeout: 5000 });
    
    // Check if login form appears (indicating app loaded)
    const hasPasswordField = await page.locator('input[type="password"]').count() > 0;
    
    console.log('\n✅ Page loaded successfully');
    console.log(`   Password field present: ${hasPasswordField}`);
    console.log(`   Console errors: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log('\n⚠️  JavaScript Errors:');
      errors.forEach(e => console.log(`   - ${e}`));
    } else {
      console.log('\n🎉 No JavaScript errors detected');
    }
    
  } catch (error) {
    console.error('\n❌ Page load failed:', error.message);
  } finally {
    await browser.close();
  }
})();
