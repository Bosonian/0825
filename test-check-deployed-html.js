import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://igfap.eu/0825/');

    const htmlContent = await page.content();

    // Extract script and link tags
    const scriptTags = htmlContent.match(/<script[^>]*src="[^"]*"[^>]*>/g) || [];
    const linkTags = htmlContent.match(/<link[^>]*href="[^"]*"[^>]*>/g) || [];

    console.log('\n📄 DEPLOYED HTML ANALYSIS:\n');
    console.log('Script tags:');
    scriptTags.forEach(tag => console.log(`  ${tag}`));

    console.log('\nLink tags (modulepreload & stylesheet):');
    linkTags.forEach(tag => console.log(`  ${tag}`));

    // Check for circular references
    const hasDuplicateModulepreload = linkTags.some((tag, idx) => {
      const href = tag.match(/href="([^"]*)"/)?.[1];
      return href && linkTags.slice(idx + 1).some(t => t.includes(href));
    });

    console.log(`\n🔍 Circular modulepreload detected: ${hasDuplicateModulepreload}\n`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
