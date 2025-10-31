/**
 * Auth Screen UX Explorer
 *
 * Purpose: Comprehensively explore authentication screen BEFORE making recommendations
 * Methodology: UX Explorer Agent - explore first, recommend later
 */

import { chromium } from '@playwright/test';

const EXPLORATION_REPORT = {
  interactiveElements: [],
  states: [],
  visualElements: [],
  userFlows: [],
  screenshots: [],
  issues: [],
  measurements: {}
};

async function exploreAuthScreen() {
  console.log('🔍 AUTH SCREEN EXPLORATION STARTING...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  try {
    // Phase 1: Initial Load & First Impressions
    console.log('📊 Phase 1: Initial Load & First Impressions');
    const startTime = Date.now();
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    EXPLORATION_REPORT.measurements.loadTime = loadTime;

    await page.screenshot({
      path: '/tmp/auth-initial-load.png',
      fullPage: true
    });
    EXPLORATION_REPORT.screenshots.push('auth-initial-load.png');
    console.log(`✅ Page loaded in ${loadTime}ms`);

    // Phase 2: Discover All Interactive Elements
    console.log('\n📊 Phase 2: Discovering Interactive Elements');

    // Find all buttons
    const buttons = await page.locator('button').all();
    console.log(`   Found ${buttons.length} button(s)`);
    for (const btn of buttons) {
      const text = await btn.textContent();
      const visible = await btn.isVisible();
      const enabled = await btn.isEnabled();
      EXPLORATION_REPORT.interactiveElements.push({
        type: 'button',
        text: text?.trim(),
        visible,
        enabled
      });
      console.log(`   - Button: "${text?.trim()}" (visible: ${visible}, enabled: ${enabled})`);
    }

    // Find all inputs
    const inputs = await page.locator('input').all();
    console.log(`   Found ${inputs.length} input(s)`);
    for (const input of inputs) {
      const type = await input.getAttribute('type');
      const placeholder = await input.getAttribute('placeholder');
      const label = await input.getAttribute('aria-label') || await input.getAttribute('id');
      const visible = await input.isVisible();
      EXPLORATION_REPORT.interactiveElements.push({
        type: 'input',
        inputType: type,
        placeholder,
        label,
        visible
      });
      console.log(`   - Input: type="${type}" placeholder="${placeholder}" label="${label}" (visible: ${visible})`);
    }

    // Find toggles/switches
    const toggles = await page.locator('[role="switch"], input[type="checkbox"]').all();
    console.log(`   Found ${toggles.length} toggle(s)`);
    for (const toggle of toggles) {
      const label = await toggle.getAttribute('aria-label');
      const checked = await toggle.isChecked();
      const visible = await toggle.isVisible();
      EXPLORATION_REPORT.interactiveElements.push({
        type: 'toggle',
        label,
        checked,
        visible
      });
      console.log(`   - Toggle: "${label}" (checked: ${checked}, visible: ${visible})`);
    }

    // Find links
    const links = await page.locator('a').all();
    console.log(`   Found ${links.length} link(s)`);
    for (const link of links) {
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      const visible = await link.isVisible();
      EXPLORATION_REPORT.interactiveElements.push({
        type: 'link',
        text: text?.trim(),
        href,
        visible
      });
      console.log(`   - Link: "${text?.trim()}" href="${href}" (visible: ${visible})`);
    }

    // Phase 3: Discover Visual Elements
    console.log('\n📊 Phase 3: Discovering Visual Elements');

    // Check for logo/branding
    const logos = await page.locator('img, svg').all();
    console.log(`   Found ${logos.length} image/SVG element(s)`);
    for (const logo of logos) {
      const alt = await logo.getAttribute('alt');
      const ariaLabel = await logo.getAttribute('aria-label');
      const visible = await logo.isVisible();
      if (visible) {
        EXPLORATION_REPORT.visualElements.push({
          type: 'image/svg',
          alt,
          ariaLabel,
          visible
        });
        console.log(`   - Visual: alt="${alt}" aria-label="${ariaLabel}"`);
      }
    }

    // Check for headings
    const headings = await page.locator('h1, h2, h3, h4').all();
    console.log(`   Found ${headings.length} heading(s)`);
    for (const heading of headings) {
      const text = await heading.textContent();
      const tag = await heading.evaluate(el => el.tagName);
      const visible = await heading.isVisible();
      if (visible) {
        EXPLORATION_REPORT.visualElements.push({
          type: 'heading',
          tag,
          text: text?.trim(),
          visible
        });
        console.log(`   - ${tag}: "${text?.trim()}"`);
      }
    }

    // Check for descriptive text
    const paragraphs = await page.locator('p').all();
    console.log(`   Found ${paragraphs.length} paragraph(s)`);
    for (const p of paragraphs) {
      const text = await p.textContent();
      const visible = await p.isVisible();
      if (visible && text?.trim()) {
        EXPLORATION_REPORT.visualElements.push({
          type: 'paragraph',
          text: text.trim(),
          visible
        });
        console.log(`   - Text: "${text.trim().substring(0, 50)}${text.trim().length > 50 ? '...' : ''}"`);
      }
    }

    // Phase 4: Test Light/Dark Mode Toggle (if exists)
    console.log('\n📊 Phase 4: Testing Theme Toggle');
    const themeToggle = await page.locator('[aria-label*="theme"], [aria-label*="Theme"], button:has-text("☀"), button:has-text("🌙")').first();
    if (await themeToggle.count() > 0) {
      console.log('   Found theme toggle - testing both modes');

      // Capture light mode (or current mode)
      await page.screenshot({
        path: '/tmp/auth-theme-1.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('auth-theme-1.png');
      console.log('   ✅ Captured state 1');

      // Toggle
      await themeToggle.click();
      await page.waitForTimeout(300);

      // Capture dark mode (or toggled mode)
      await page.screenshot({
        path: '/tmp/auth-theme-2.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('auth-theme-2.png');
      console.log('   ✅ Captured state 2 (toggled)');

      EXPLORATION_REPORT.states.push({
        element: 'theme-toggle',
        before: 'auth-theme-1.png',
        after: 'auth-theme-2.png'
      });
    } else {
      console.log('   No theme toggle found');
    }

    // Phase 5: Test Password Input Interaction
    console.log('\n📊 Phase 5: Testing Password Input Interaction');
    const passwordInput = await page.locator('input[type="password"]').first();
    if (await passwordInput.count() > 0) {
      console.log('   Testing password field...');

      // Capture before interaction
      await page.screenshot({
        path: '/tmp/auth-password-empty.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('auth-password-empty.png');

      // Focus on field
      await passwordInput.click();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: '/tmp/auth-password-focused.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('auth-password-focused.png');
      console.log('   ✅ Captured focus state');

      // Type password
      await passwordInput.fill('Neuro25');
      await page.waitForTimeout(200);
      await page.screenshot({
        path: '/tmp/auth-password-filled.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('auth-password-filled.png');
      console.log('   ✅ Captured filled state');

      EXPLORATION_REPORT.states.push({
        element: 'password-input',
        empty: 'auth-password-empty.png',
        focused: 'auth-password-focused.png',
        filled: 'auth-password-filled.png'
      });
    }

    // Phase 6: Test Login Button States
    console.log('\n📊 Phase 6: Testing Login Button');
    const loginButton = await page.locator('button:has-text("Access"), button:has-text("Login"), button[type="submit"]').first();
    if (await loginButton.count() > 0) {
      const buttonText = await loginButton.textContent();
      console.log(`   Testing "${buttonText?.trim()}" button...`);

      // Test hover state
      await loginButton.hover();
      await page.waitForTimeout(100);
      await page.screenshot({
        path: '/tmp/auth-button-hover.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('auth-button-hover.png');
      console.log('   ✅ Captured hover state');

      // Test click feedback
      const clickStartTime = Date.now();
      await loginButton.click();
      await page.waitForTimeout(500); // Wait for transition/navigation
      const clickResponseTime = Date.now() - clickStartTime;

      await page.screenshot({
        path: '/tmp/auth-button-clicked.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('auth-button-clicked.png');
      console.log(`   ✅ Captured post-click state (response: ${clickResponseTime}ms)`);

      EXPLORATION_REPORT.measurements.loginResponseTime = clickResponseTime;
    }

    // Phase 7: Test at Different Viewports
    console.log('\n📊 Phase 7: Testing Responsive Behavior');

    const viewports = [
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 }
    ];

    for (const vp of viewports) {
      console.log(`   Testing ${vp.name} (${vp.width}×${vp.height})...`);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);

      await page.screenshot({
        path: `/tmp/auth-${vp.name.toLowerCase()}.png`,
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push(`auth-${vp.name.toLowerCase()}.png`);
      console.log(`   ✅ Captured ${vp.name} view`);

      // Check for overflow
      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > document.documentElement.clientWidth;
      });
      if (hasOverflow) {
        EXPLORATION_REPORT.issues.push({
          severity: 'medium',
          viewport: `${vp.name} (${vp.width}×${vp.height})`,
          issue: 'Horizontal overflow detected'
        });
        console.log(`   ⚠️  Horizontal overflow detected`);
      }
    }

    // Phase 8: Check for Accessibility Features
    console.log('\n📊 Phase 8: Checking Accessibility');

    // Reset to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    // Check for keyboard navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await page.screenshot({
      path: '/tmp/auth-keyboard-nav.png',
      fullPage: true
    });
    EXPLORATION_REPORT.screenshots.push('auth-keyboard-nav.png');
    console.log('   ✅ Tested keyboard navigation (Tab)');

    // Check for ARIA labels
    const ariaElements = await page.locator('[aria-label], [role]').all();
    console.log(`   Found ${ariaElements.length} elements with ARIA attributes`);

    // Phase 9: Complete User Flow Test
    console.log('\n📊 Phase 9: Testing Complete Login Flow');
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    const flowStartTime = Date.now();

    // Find and fill password
    const pwField = await page.locator('input[type="password"]').first();
    if (await pwField.count() > 0) {
      await pwField.fill('Neuro25');
      console.log('   ✅ Password entered');
    }

    // Find and click login
    const submitBtn = await page.locator('button:has-text("Access"), button:has-text("Login"), button[type="submit"]').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForLoadState('networkidle');
      const flowEndTime = Date.now();
      const totalFlowTime = flowEndTime - flowStartTime;

      EXPLORATION_REPORT.measurements.completeLoginFlowTime = totalFlowTime;
      console.log(`   ✅ Login flow completed in ${totalFlowTime}ms`);

      await page.screenshot({
        path: '/tmp/auth-flow-complete.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('auth-flow-complete.png');

      EXPLORATION_REPORT.userFlows.push({
        flow: 'Complete Login',
        duration: totalFlowTime,
        success: true
      });
    }

    // Final Report
    console.log('\n' + '='.repeat(80));
    console.log('🔍 AUTH SCREEN EXPLORATION COMPLETE');
    console.log('='.repeat(80));

    console.log('\n📊 INTERACTIVE ELEMENTS SUMMARY:');
    console.log(`   Buttons: ${EXPLORATION_REPORT.interactiveElements.filter(e => e.type === 'button').length}`);
    console.log(`   Inputs: ${EXPLORATION_REPORT.interactiveElements.filter(e => e.type === 'input').length}`);
    console.log(`   Toggles: ${EXPLORATION_REPORT.interactiveElements.filter(e => e.type === 'toggle').length}`);
    console.log(`   Links: ${EXPLORATION_REPORT.interactiveElements.filter(e => e.type === 'link').length}`);

    console.log('\n📸 SCREENSHOTS CAPTURED:');
    EXPLORATION_REPORT.screenshots.forEach(s => console.log(`   - ${s}`));

    console.log('\n⏱️  PERFORMANCE MEASUREMENTS:');
    console.log(`   Initial Load: ${EXPLORATION_REPORT.measurements.loadTime}ms`);
    console.log(`   Login Response: ${EXPLORATION_REPORT.measurements.loginResponseTime || 'N/A'}ms`);
    console.log(`   Complete Flow: ${EXPLORATION_REPORT.measurements.completeLoginFlowTime || 'N/A'}ms`);

    if (EXPLORATION_REPORT.issues.length > 0) {
      console.log('\n⚠️  ISSUES FOUND:');
      EXPLORATION_REPORT.issues.forEach(issue => {
        console.log(`   [${issue.severity.toUpperCase()}] ${issue.viewport || 'General'}: ${issue.issue}`);
      });
    } else {
      console.log('\n✅ No issues detected during exploration');
    }

    console.log('\n📝 All screenshots saved to /tmp/');
    console.log('\n✅ Ready for Human UX Evaluation phase');

  } catch (error) {
    console.error('\n❌ Exploration failed:', error);
    throw error;
  } finally {
    await browser.close();
  }

  return EXPLORATION_REPORT;
}

// Run exploration
exploreAuthScreen()
  .then(() => {
    console.log('\n🎯 Exploration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Exploration failed:', error);
    process.exit(1);
  });
