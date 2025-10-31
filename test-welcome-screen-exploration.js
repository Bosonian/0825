/**
 * Welcome/Triage Screen UX Explorer
 *
 * Purpose: Explore the first screen after authentication
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

async function exploreWelcomeScreen() {
  console.log('🔍 WELCOME SCREEN EXPLORATION STARTING...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  try {
    // Phase 1: Navigate past auth screen
    console.log('📊 Phase 1: Navigating to Welcome Screen');
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    // Login
    const passwordField = await page.locator('input[type="password"]').first();
    await passwordField.fill('Neuro25');

    const loginButton = await page.locator('button:has-text("Access")').first();
    const loginStartTime = Date.now();
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Allow any animations to complete
    const loginTime = Date.now() - loginStartTime;

    console.log(`✅ Logged in successfully (${loginTime}ms)`);
    EXPLORATION_REPORT.measurements.loginTransitionTime = loginTime;

    // Capture initial state
    await page.screenshot({
      path: '/tmp/welcome-initial.png',
      fullPage: true
    });
    EXPLORATION_REPORT.screenshots.push('welcome-initial.png');
    console.log('📸 Captured initial welcome screen\n');

    // Phase 2: Discover All Interactive Elements
    console.log('📊 Phase 2: Discovering Interactive Elements');

    // Find all buttons
    const buttons = await page.locator('button').all();
    console.log(`   Found ${buttons.length} button(s)`);
    for (const btn of buttons) {
      const text = await btn.textContent();
      const visible = await btn.isVisible();
      const enabled = await btn.isEnabled();
      const ariaLabel = await btn.getAttribute('aria-label');

      if (visible) {
        EXPLORATION_REPORT.interactiveElements.push({
          type: 'button',
          text: text?.trim(),
          ariaLabel,
          visible,
          enabled
        });
        console.log(`   - Button: "${text?.trim()}" (enabled: ${enabled})`);
      }
    }

    // Find all cards/modules
    const cards = await page.locator('.card, .module-card, .option-card, [role="button"]').all();
    console.log(`   Found ${cards.length} card(s)`);
    for (const card of cards) {
      const text = await card.textContent();
      const visible = await card.isVisible();

      if (visible && text?.trim()) {
        EXPLORATION_REPORT.interactiveElements.push({
          type: 'card',
          text: text.trim().substring(0, 100),
          visible
        });
        console.log(`   - Card: "${text.trim().substring(0, 50)}..."`);
      }
    }

    // Find all links
    const links = await page.locator('a').all();
    console.log(`   Found ${links.length} link(s)`);
    for (const link of links) {
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      const visible = await link.isVisible();

      if (visible && text?.trim()) {
        EXPLORATION_REPORT.interactiveElements.push({
          type: 'link',
          text: text.trim(),
          href,
          visible
        });
        console.log(`   - Link: "${text.trim()}"`);
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
          text: text.trim(),
          visible
        });
        console.log(`   - ${tag}: "${text.trim()}"`);
      }
    }

    // Find paragraphs and descriptions
    const paragraphs = await page.locator('p').all();
    console.log(`   Found ${paragraphs.length} paragraph(s)`);
    let visibleParagraphs = 0;
    for (const p of paragraphs) {
      const text = await p.textContent();
      const visible = await p.isVisible();

      if (visible && text?.trim()) {
        visibleParagraphs++;
        EXPLORATION_REPORT.visualElements.push({
          type: 'paragraph',
          text: text.trim(),
          visible
        });
        console.log(`   - Text: "${text.trim().substring(0, 60)}${text.trim().length > 60 ? '...' : ''}"`);
      }
    }
    console.log(`   Total visible paragraphs: ${visibleParagraphs}`);

    // Phase 4: Test Module Selection Cards
    console.log('\n📊 Phase 4: Testing Module Selection Interactions');

    // Find module selection cards/buttons
    const moduleSelectors = [
      'button:has-text("Coma")',
      'button:has-text("Limited")',
      'button:has-text("Full")',
      '[data-module="coma"]',
      '[data-module="limited"]',
      '[data-module="full"]'
    ];

    let modulesFound = 0;
    for (const selector of moduleSelectors) {
      const elements = await page.locator(selector).all();
      if (elements.length > 0) {
        console.log(`   Found ${elements.length} element(s) for: ${selector}`);
        modulesFound += elements.length;

        // Test hover state on first element
        const firstElement = elements[0];
        const elementText = await firstElement.textContent();
        console.log(`   Testing hover on: "${elementText?.trim()}"`);

        await page.screenshot({
          path: `/tmp/welcome-before-hover-${modulesFound}.png`,
          fullPage: true
        });

        await firstElement.hover();
        await page.waitForTimeout(200);

        await page.screenshot({
          path: `/tmp/welcome-hover-${modulesFound}.png`,
          fullPage: true
        });
        EXPLORATION_REPORT.screenshots.push(`welcome-hover-${modulesFound}.png`);
        console.log(`   ✅ Captured hover state`);
      }
    }

    if (modulesFound === 0) {
      console.log('   ⚠️  No module selection cards found with expected selectors');
      console.log('   Let me search more broadly...');

      // Try to find any clickable elements in the main content
      const mainContent = await page.locator('main, #appContainer, .container').first();
      if (await mainContent.count() > 0) {
        const clickableElements = await mainContent.locator('button, [role="button"], a').all();
        console.log(`   Found ${clickableElements.length} clickable elements in main content`);
      }
    }

    // Phase 5: Test Theme Toggle on This Screen
    console.log('\n📊 Phase 5: Testing Theme Toggle');
    const themeToggle = await page.locator('button:has-text("🌙"), button:has-text("☀")').first();
    if (await themeToggle.count() > 0) {
      console.log('   Testing dark/light mode on welcome screen');

      await page.screenshot({
        path: '/tmp/welcome-theme-1.png',
        fullPage: true
      });

      await themeToggle.click();
      await page.waitForTimeout(300);

      await page.screenshot({
        path: '/tmp/welcome-theme-2.png',
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push('welcome-theme-1.png', 'welcome-theme-2.png');
      console.log('   ✅ Captured both theme states');
    }

    // Phase 6: Test at Different Viewports
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
        path: `/tmp/welcome-${vp.name.toLowerCase()}.png`,
        fullPage: true
      });
      EXPLORATION_REPORT.screenshots.push(`welcome-${vp.name.toLowerCase()}.png`);
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

    // Phase 7: Test Keyboard Navigation
    console.log('\n📊 Phase 7: Testing Keyboard Navigation');

    // Reset to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Tab through elements
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await page.screenshot({
      path: '/tmp/welcome-keyboard-nav-1.png',
      fullPage: true
    });

    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await page.screenshot({
      path: '/tmp/welcome-keyboard-nav-2.png',
      fullPage: true
    });

    EXPLORATION_REPORT.screenshots.push('welcome-keyboard-nav-1.png', 'welcome-keyboard-nav-2.png');
    console.log('   ✅ Tested keyboard navigation (Tab)');

    // Phase 8: Measure Content Density
    console.log('\n📊 Phase 8: Analyzing Content Density');

    const textDensity = await page.evaluate(() => {
      const mainContent = document.querySelector('main, #appContainer, .container');
      if (!mainContent) return { totalChars: 0, wordCount: 0 };

      const text = mainContent.textContent || '';
      return {
        totalChars: text.length,
        wordCount: text.split(/\s+/).filter(w => w.length > 0).length
      };
    });

    EXPLORATION_REPORT.measurements.textDensity = textDensity;
    console.log(`   Total characters: ${textDensity.totalChars}`);
    console.log(`   Word count: ${textDensity.wordCount}`);

    if (textDensity.totalChars > 1000) {
      console.log('   ⚠️  High text density - may overwhelm users');
      EXPLORATION_REPORT.issues.push({
        severity: 'medium',
        issue: `High text density: ${textDensity.totalChars} characters`,
        recommendation: 'Consider reducing text or using progressive disclosure'
      });
    }

    // Final Report
    console.log('\n' + '='.repeat(80));
    console.log('🔍 WELCOME SCREEN EXPLORATION COMPLETE');
    console.log('='.repeat(80));

    console.log('\n📊 INTERACTIVE ELEMENTS SUMMARY:');
    console.log(`   Buttons: ${EXPLORATION_REPORT.interactiveElements.filter(e => e.type === 'button').length}`);
    console.log(`   Cards: ${EXPLORATION_REPORT.interactiveElements.filter(e => e.type === 'card').length}`);
    console.log(`   Links: ${EXPLORATION_REPORT.interactiveElements.filter(e => e.type === 'link').length}`);

    console.log('\n📸 SCREENSHOTS CAPTURED:');
    EXPLORATION_REPORT.screenshots.forEach(s => console.log(`   - ${s}`));

    console.log('\n⏱️  PERFORMANCE MEASUREMENTS:');
    console.log(`   Login Transition: ${EXPLORATION_REPORT.measurements.loginTransitionTime}ms`);
    console.log(`   Text Density: ${textDensity.totalChars} chars, ${textDensity.wordCount} words`);

    if (EXPLORATION_REPORT.issues.length > 0) {
      console.log('\n⚠️  ISSUES FOUND:');
      EXPLORATION_REPORT.issues.forEach(issue => {
        console.log(`   [${issue.severity.toUpperCase()}] ${issue.viewport || 'General'}: ${issue.issue}`);
      });
    } else {
      console.log('\n✅ No major issues detected during exploration');
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
exploreWelcomeScreen()
  .then(() => {
    console.log('\n🎯 Exploration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Exploration failed:', error);
    process.exit(1);
  });
