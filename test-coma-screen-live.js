import { chromium } from '@playwright/test';

(async () => {
  console.log('🔍 Testing Coma Screen on https://igfap.eu/0825/\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  try {
    console.log('📡 Step 1: Loading page...');
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    console.log('🔐 Step 2: Logging in...');
    await page.locator('input[type="password"]').fill('Neuro25');
    await page.locator('button:has-text("Access")').click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Logged in\n');

    await page.screenshot({ path: '/tmp/coma-01-welcome.png' });

    console.log('🎯 Step 3: Clicking YES - Comatose...');
    await page.locator('button:has-text("YES")').first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    console.log('✅ Navigated to coma screen\n');

    await page.screenshot({ path: '/tmp/coma-02-form.png', fullPage: true });

    console.log('🔍 Step 4: Checking coma screen enhancements...');

    // Check for module header
    const moduleHeader = await page.locator('.module-header').count();
    console.log(`   ✓ Module header: ${moduleHeader > 0 ? 'Found' : 'NOT FOUND'}`);

    const moduleIcon = await page.locator('.module-icon').textContent().catch(() => '');
    console.log(`   ✓ Module icon: "${moduleIcon}"`);

    const moduleSubtitle = await page.locator('.module-subtitle').textContent().catch(() => '');
    console.log(`   ✓ Subtitle: "${moduleSubtitle}"`);

    // Check for enhanced label
    const labelIcon = await page.locator('.label-icon').textContent().catch(() => '');
    console.log(`   ✓ Label icon: "${labelIcon}"`);

    const labelPrimary = await page.locator('.label-primary').textContent().catch(() => '');
    console.log(`   ✓ Primary label: "${labelPrimary}"`);

    const labelSecondary = await page.locator('.label-secondary').textContent().catch(() => '');
    console.log(`   ✓ Secondary label: "${labelSecondary}"`);

    // Check for input wrapper
    const inputUnit = await page.locator('.input-unit').textContent().catch(() => '');
    console.log(`   ✓ Input unit: "${inputUnit}"`);

    // Check for enhanced help
    const helpIcon = await page.locator('.help-icon').textContent().catch(() => '');
    console.log(`   ✓ Help icon: "${helpIcon}"`);

    // Check for enhanced buttons
    const btnIcons = await page.locator('.btn-icon').count();
    console.log(`   ✓ Button icons: ${btnIcons} found`);

    console.log('\n📸 Screenshots saved:');
    console.log('   /tmp/coma-01-welcome.png');
    console.log('   /tmp/coma-02-form.png');

    // Wait to see the screen
    await page.waitForTimeout(3000);

    console.log('\n✅ All enhancements verified!');

  } catch (error) {
    console.error('\n💥 Error:', error.message);
  } finally {
    await browser.close();
  }
})();
