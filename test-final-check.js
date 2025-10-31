import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Loading https://igfap.eu/0825/...');
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle', timeout: 20000 });

    await page.screenshot({ path: '/tmp/final-check.png', fullPage: true });
    console.log('Screenshot: /tmp/final-check.png');

    // Check if CSS loaded
    const cssLinks = await page.locator('link[rel="stylesheet"]').count();
    console.log(`CSS links: ${cssLinks}`);

    // Check computed styles on module header
    const moduleHeader = await page.locator('.module-header').first();
    if (await moduleHeader.count() > 0) {
      const bgColor = await moduleHeader.evaluate(el => window.getComputedStyle(el).backgroundColor);
      const padding = await moduleHeader.evaluate(el => window.getComputedStyle(el).padding);
      console.log(`Module header bg: ${bgColor}, padding: ${padding}`);
    }

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: '/tmp/final-check-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
