/**
 * Coma Assessment Screen UX Explorer
 *
 * Purpose: Explore the screen after clicking "YES - Comatose"
 * Methodology: UX Explorer Agent - explore first, recommend later
 */

import { chromium } from '@playwright/test';

const EXPLORATION_REPORT = {
  interactiveElements: [],
  formFields: [],
  states: [],
  visualElements: [],
  screenshots: [],
  issues: [],
  measurements: {}
};

async function exploreComaScreen() {
  console.log('🔍 COMA ASSESSMENT SCREEN EXPLORATION STARTING...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  try {
    // Phase 1: Navigate to coma screen
    console.log('📊 Phase 1: Navigating to Coma Assessment Screen');

    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    // Login
    const passwordField = await page.locator('input[type="password"]').first();
    await passwordField.fill('Neuro25');
    const loginButton = await page.locator('button:has-text("Access")').first();
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    console.log('✅ Logged in');

    // Click YES - Comatose
    const yesButton = await page.locator('button:has-text("YES")').first();
    const clickTime = Date.now();
    await yesButton.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    const transitionTime = Date.now() - clickTime;

    EXPLORATION_REPORT.measurements.transitionTime = transitionTime;
    console.log(`✅ Clicked "YES - Comatose" (transition: ${transitionTime}ms)\n`);

    // Capture initial state
    await page.screenshot({
      path: '/tmp/coma-initial.png',
      fullPage: true
    });
    EXPLORATION_REPORT.screenshots.push('coma-initial.png');
    console.log('📸 Captured initial coma assessment screen\n');

    // Phase 2: Discover All Interactive Elements
    console.log('📊 Phase 2: Discovering Interactive Elements');

    // Find all form inputs
    const inputs = await page.locator('input, select, textarea').all();
    console.log(`   Found ${inputs.length} form field(s)`);

    for (const input of inputs) {
      const type = await input.getAttribute('type') || 'text';
      const name = await input.getAttribute('name');
      const id = await input.getAttribute('id');
      const label = await input.getAttribute('aria-label') || await input.getAttribute('placeholder');
      const visible = await input.isVisible();
      const required = await input.getAttribute('required') !== null;

      if (visible) {
        EXPLORATION_REPORT.formFields.push({
          type,
          name,
          id,
          label,
          required,
          visible
        });
        console.log(`   - ${type}: "${label || name || id}" ${required ? '(required)' : ''}`);
      }
    }

    // Find all buttons
    const buttons = await page.locator('button').all();
    console.log(`   Found ${buttons.length} button(s)`);

    for (const btn of buttons) {
      const text = await btn.textContent();
      const visible = await btn.isVisible();
      const enabled = await btn.isEnabled();

      if (visible) {
        EXPLORATION_REPORT.interactiveElements.push({
          type: 'button',
          text: text?.trim(),
          visible,
          enabled
        });
        console.log(`   - Button: "${text?.trim()}" (enabled: ${enabled})`);
      }
    }

    // Phase 3: Discover Visual Elements
    console.log('\n📊 Phase 3: Discovering Visual Elements');

    // Find headings
    const headings = await page.locator('h1, h2, h3, h4').all();
    console.log(`   Found ${headings.length} heading(s)`);

    for (const heading of headings) {
      const text = await heading.textContent();
      const tag = await heading.evaluate(el => el.tagName);
      const visible = await heading.isVisible();

      if (visible && text?.trim()) {
        EXPLORATION_REPORT.visualElements.push({
          type: 'heading',
          tag,
          text: text.trim()
        });
        console.log(`   - ${tag}: "${text.trim()}"`);
      }
    }

    // Find labels
    const labels = await page.locator('label').all();
    console.log(`   Found ${labels.length} label(s)`);

    for (const label of labels) {
      const text = await label.textContent();
      const visible = await label.isVisible();

      if (visible && text?.trim()) {
        console.log(`   - Label: "${text.trim()}"`);
      }
    }

    // Check for help text or descriptions
    const helpTexts = await page.locator('small, .help-text, .description').all();
    console.log(`   Found ${helpTexts.length} help text element(s)`);

    // Phase 4: Test Form Interactions
    console.log('\n📊 Phase 4: Testing Form Interactions');

    // Test filling out the first few fields
    const firstInput = await page.locator('input[type="number"], input[type="text"]').first();
    if (await firstInput.count() > 0) {
      console.log('   Testing input field interaction...');

      await page.screenshot({
        path: '/tmp/coma-form-empty.png',
        fullPage: true
      });

      await firstInput.click();
      await page.waitForTimeout(200);

      await page.screenshot({
        path: '/tmp/coma-form-focused.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('coma-form-empty.png', 'coma-form-focused.png');
      console.log('   ✅ Captured form focus state');
    }

    // Phase 5: Test Progress Indicator
    console.log('\n📊 Phase 5: Checking Progress Indicator');

    const progressSteps = await page.locator('.progress-step').all();
    console.log(`   Found ${progressSteps.length} progress step(s)`);

    const activeStep = await page.locator('.progress-step.active').count();
    console.log(`   Active step: ${activeStep > 0 ? 'Step ' + activeStep : 'None'}`);

    // Phase 6: Test Responsive Behavior
    console.log('\n📊 Phase 6: Testing Responsive Behavior');

    const viewports = [
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 }
    ];

    for (const vp of viewports) {
      console.log(`   Testing ${vp.name} (${vp.width}×${vp.height})...`);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(300);

      await page.screenshot({
        path: `/tmp/coma-${vp.name.toLowerCase()}.png`,
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push(`coma-${vp.name.toLowerCase()}.png`);
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

    // Phase 7: Measure Content Complexity
    console.log('\n📊 Phase 7: Analyzing Form Complexity');

    // Reset to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    const formComplexity = {
      requiredFields: EXPLORATION_REPORT.formFields.filter(f => f.required).length,
      optionalFields: EXPLORATION_REPORT.formFields.filter(f => !f.required).length,
      totalFields: EXPLORATION_REPORT.formFields.length,
      buttons: EXPLORATION_REPORT.interactiveElements.filter(e => e.type === 'button').length
    };

    EXPLORATION_REPORT.measurements.formComplexity = formComplexity;

    console.log(`   Total fields: ${formComplexity.totalFields}`);
    console.log(`   Required: ${formComplexity.requiredFields}`);
    console.log(`   Optional: ${formComplexity.optionalFields}`);
    console.log(`   Buttons: ${formComplexity.buttons}`);

    if (formComplexity.totalFields > 10) {
      EXPLORATION_REPORT.issues.push({
        severity: 'medium',
        issue: `High form complexity: ${formComplexity.totalFields} fields`,
        recommendation: 'Consider grouping fields or using progressive disclosure'
      });
      console.log('   ⚠️  High form complexity detected');
    }

    // Final Report
    console.log('\n' + '='.repeat(80));
    console.log('🔍 COMA ASSESSMENT SCREEN EXPLORATION COMPLETE');
    console.log('='.repeat(80));

    console.log('\n📊 SUMMARY:');
    console.log(`   Form Fields: ${EXPLORATION_REPORT.formFields.length}`);
    console.log(`   Interactive Elements: ${EXPLORATION_REPORT.interactiveElements.length}`);
    console.log(`   Visual Elements: ${EXPLORATION_REPORT.visualElements.length}`);
    console.log(`   Screenshots: ${EXPLORATION_REPORT.screenshots.length}`);

    console.log('\n⏱️  PERFORMANCE:');
    console.log(`   Transition Time: ${EXPLORATION_REPORT.measurements.transitionTime}ms`);

    if (EXPLORATION_REPORT.issues.length > 0) {
      console.log('\n⚠️  ISSUES FOUND:');
      EXPLORATION_REPORT.issues.forEach(issue => {
        console.log(`   [${issue.severity.toUpperCase()}] ${issue.viewport || 'General'}: ${issue.issue}`);
      });
    } else {
      console.log('\n✅ No major issues detected');
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
exploreComaScreen()
  .then(() => {
    console.log('\n🎯 Exploration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Exploration failed:', error);
    process.exit(1);
  });
