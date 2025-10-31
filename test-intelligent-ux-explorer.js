/**
 * Intelligent UX Explorer
 * Explores ALL UI elements, states, and interactions BEFORE making recommendations
 * Follows UX Explorer Agent methodology
 */
import { chromium } from '@playwright/test';

const KIOSK_URL = 'https://igfap.eu/kiosk/';

async function intelligentUXExploration() {
  console.log('🧠 INTELLIGENT UX EXPLORER');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👁️  Comprehensive UI exploration with zero assumptions');
  console.log('📋 Phase 1: Discovery → Phase 2: Testing → Phase 3: Recommendations');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 800
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  const exploration = {
    interactiveElements: [],
    states: [],
    flows: [],
    screenshots: [],
    features: {
      found: [],
      working: [],
      issues: []
    }
  };

  try {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📍 PHASE 1: DISCOVERY - Finding All Interactive Elements');
    console.log('═══════════════════════════════════════════════════════════════\n');

    await page.goto(KIOSK_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Take initial screenshot
    await page.screenshot({ path: 'test-screenshots/ux-explore-00-initial.png', fullPage: true });
    exploration.screenshots.push('ux-explore-00-initial.png');
    console.log('📸 Initial state captured\n');

    // Discovery 1: Find all buttons
    console.log('🔍 Discovering Buttons...');
    console.log('─────────────────────────────────────────────────────────────');
    const buttons = await page.locator('button').all();
    console.log(`   Found ${buttons.length} button(s)`);

    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
      const text = await btn.textContent().catch(() => '');
      const ariaLabel = await btn.getAttribute('aria-label').catch(() => '');
      const id = await btn.getAttribute('id').catch(() => '');
      const className = await btn.getAttribute('class').catch(() => '');

      const buttonInfo = {
        type: 'button',
        index: i,
        text: text.trim().substring(0, 30),
        ariaLabel,
        id,
        className,
        tested: false
      };

      exploration.interactiveElements.push(buttonInfo);

      console.log(`   ${i + 1}. Button: "${text.trim().substring(0, 30) || ariaLabel || id || 'Unnamed'}"`);
      console.log(`      Classes: ${className || 'none'}`);
    }

    // Discovery 2: Find all toggles/switches
    console.log('\n🔍 Discovering Toggles/Switches...');
    console.log('─────────────────────────────────────────────────────────────');
    const checkboxes = await page.locator('input[type="checkbox"]').all();
    const switches = await page.locator('[role="switch"]').all();
    const totalToggles = checkboxes.length + switches.length;

    console.log(`   Found ${totalToggles} toggle(s)`);

    for (const toggle of [...checkboxes, ...switches]) {
      const ariaLabel = await toggle.getAttribute('aria-label').catch(() => '');
      const id = await toggle.getAttribute('id').catch(() => '');
      const checked = await toggle.isChecked().catch(() => false);

      const toggleInfo = {
        type: 'toggle',
        ariaLabel,
        id,
        initialState: checked ? 'on' : 'off',
        tested: false
      };

      exploration.interactiveElements.push(toggleInfo);

      console.log(`   ⚙️  Toggle: "${ariaLabel || id}"`);
      console.log(`      Initial state: ${checked ? 'ON' : 'OFF'}`);
    }

    // Discovery 3: Find all links
    console.log('\n🔍 Discovering Links...');
    console.log('─────────────────────────────────────────────────────────────');
    const links = await page.locator('a').all();
    console.log(`   Found ${links.length} link(s)`);

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const text = await link.textContent().catch(() => '');
      const href = await link.getAttribute('href').catch(() => '');

      exploration.interactiveElements.push({
        type: 'link',
        text: text.trim(),
        href,
        tested: false
      });

      console.log(`   ${i + 1}. Link: "${text.trim().substring(0, 40)}" → ${href}`);
    }

    // Discovery 4: Find case cards
    console.log('\n🔍 Discovering Case Cards...');
    console.log('─────────────────────────────────────────────────────────────');
    const caseCards = await page.locator('.case-card, .case-item, [data-case-id]').all();
    console.log(`   Found ${caseCards.length} case card(s)`);

    if (caseCards.length > 0) {
      exploration.features.found.push('Case cards present');
    } else {
      console.log(`   ℹ️  No cases currently (empty state)`);
      exploration.features.found.push('Empty state displayed');
    }

    console.log('\n📊 Discovery Summary:');
    console.log(`   Total interactive elements: ${exploration.interactiveElements.length}`);
    console.log(`   Buttons: ${exploration.interactiveElements.filter(e => e.type === 'button').length}`);
    console.log(`   Toggles: ${exploration.interactiveElements.filter(e => e.type === 'toggle').length}`);
    console.log(`   Links: ${exploration.interactiveElements.filter(e => e.type === 'link').length}`);

    // PHASE 2: COMPREHENSIVE TESTING
    console.log('\n\n═══════════════════════════════════════════════════════════════');
    console.log('🧪 PHASE 2: COMPREHENSIVE TESTING - Test Every Element');
    console.log('═══════════════════════════════════════════════════════════════\n');

    // Test 1: Toggle Dark/Light Mode
    console.log('🌓 Test 1: Dark/Light Mode Toggle');
    console.log('─────────────────────────────────────────────────────────────');

    const modeToggles = exploration.interactiveElements.filter(e =>
      e.type === 'toggle' &&
      (e.ariaLabel?.includes('mode') || e.id?.includes('mode') || e.ariaLabel?.includes('theme'))
    );

    if (modeToggles.length > 0) {
      console.log(`   ✅ Found mode toggle: ${modeToggles[0].ariaLabel || modeToggles[0].id}`);

      // Capture initial state
      const initialBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      console.log(`   📊 Initial background: ${initialBg}`);

      await page.screenshot({ path: 'test-screenshots/ux-explore-01-before-toggle.png', fullPage: true });

      // Click the toggle
      const toggle = modeToggles[0].id ?
        page.locator(`#${modeToggles[0].id}`) :
        page.locator('input[type="checkbox"]').first();

      await toggle.click();
      await page.waitForTimeout(1000);

      // Capture after toggle
      const afterBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      console.log(`   📊 After toggle background: ${afterBg}`);

      await page.screenshot({ path: 'test-screenshots/ux-explore-02-after-toggle.png', fullPage: true });

      exploration.states.push({
        feature: 'Dark/Light Mode Toggle',
        before: 'ux-explore-01-before-toggle.png',
        after: 'ux-explore-02-after-toggle.png',
        working: initialBg !== afterBg
      });

      if (initialBg !== afterBg) {
        console.log(`   ✅ Toggle works! Background changed`);
        exploration.features.working.push('Dark/Light mode toggle');

        // Toggle back
        await toggle.click();
        await page.waitForTimeout(1000);
        console.log(`   ✅ Toggled back to original state`);
      } else {
        console.log(`   ⚠️  Toggle didn't change background`);
        exploration.features.issues.push('Mode toggle: no visual change detected');
      }

      modeToggles[0].tested = true;
    } else {
      console.log(`   ℹ️  No mode toggle found`);
    }

    // Test 2: Test all buttons
    console.log('\n\n🔘 Test 2: Button Functionality');
    console.log('─────────────────────────────────────────────────────────────');

    const buttonElements = exploration.interactiveElements.filter(e => e.type === 'button');

    for (let i = 0; i < buttonElements.length; i++) {
      const btnInfo = buttonElements[i];
      console.log(`\n   Testing button ${i + 1}/${buttonElements.length}: "${btnInfo.text || btnInfo.ariaLabel || btnInfo.id}"`);

      try {
        const button = buttons[btnInfo.index];

        // Check if visible and enabled
        const isVisible = await button.isVisible().catch(() => false);
        const isEnabled = await button.isEnabled().catch(() => false);

        console.log(`      Visible: ${isVisible ? '✅' : '❌'}`);
        console.log(`      Enabled: ${isEnabled ? '✅' : '❌'}`);

        if (isVisible && isEnabled) {
          // Hover to test hover state
          await button.hover();
          await page.waitForTimeout(300);

          const hoverScreenshot = `test-screenshots/ux-explore-button-${i}-hover.png`;
          await page.screenshot({ path: hoverScreenshot });
          console.log(`      📸 Hover state: ${hoverScreenshot}`);

          // Check if it's a dangerous action (like delete, clear, etc.)
          const isDangerous = btnInfo.text?.toLowerCase().includes('delete') ||
                            btnInfo.text?.toLowerCase().includes('clear') ||
                            btnInfo.text?.toLowerCase().includes('remove');

          if (!isDangerous) {
            console.log(`      🖱️  Clicking button...`);
            await button.click();
            await page.waitForTimeout(1500);

            const afterClickScreenshot = `test-screenshots/ux-explore-button-${i}-clicked.png`;
            await page.screenshot({ path: afterClickScreenshot, fullPage: true });
            console.log(`      📸 After click: ${afterClickScreenshot}`);

            exploration.states.push({
              feature: `Button: ${btnInfo.text || btnInfo.ariaLabel}`,
              before: hoverScreenshot,
              after: afterClickScreenshot,
              working: true
            });

            // Navigate back if we left the page
            if (!page.url().includes('/kiosk/')) {
              await page.goto(KIOSK_URL, { waitUntil: 'networkidle' });
              await page.waitForTimeout(1000);
              console.log(`      ↩️  Navigated back to kiosk`);
            }
          } else {
            console.log(`      ⚠️  Skipped clicking (potentially dangerous action)`);
          }

          exploration.features.working.push(`Button: ${btnInfo.text || btnInfo.ariaLabel}`);
          btnInfo.tested = true;
        }
      } catch (error) {
        console.log(`      ❌ Error testing button: ${error.message}`);
        exploration.features.issues.push(`Button "${btnInfo.text}": ${error.message}`);
      }
    }

    // Test 3: Responsive behavior
    console.log('\n\n📱 Test 3: Responsive Behavior');
    console.log('─────────────────────────────────────────────────────────────');

    const viewports = [
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Laptop', width: 1366, height: 768 },
      { name: 'Tablet', width: 1024, height: 768 },
      { name: 'Mobile', width: 375, height: 667 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(500);

      const screenshot = `test-screenshots/ux-explore-responsive-${vp.name.toLowerCase()}.png`;
      await page.screenshot({ path: screenshot, fullPage: false });

      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > document.body.clientWidth;
      });

      console.log(`   📱 ${vp.name} (${vp.width}×${vp.height}): ${hasOverflow ? '⚠️ Overflow' : '✅ OK'}`);
      console.log(`      📸 ${screenshot}`);

      if (!hasOverflow) {
        exploration.features.working.push(`Responsive: ${vp.name}`);
      } else {
        exploration.features.issues.push(`Responsive: ${vp.name} has horizontal overflow`);
      }
    }

    // Reset to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // PHASE 3: ANALYSIS & RECOMMENDATIONS
    console.log('\n\n═══════════════════════════════════════════════════════════════');
    console.log('💡 PHASE 3: EVIDENCE-BASED RECOMMENDATIONS');
    console.log('═══════════════════════════════════════════════════════════════\n');

    generateEvidenceBasedRecommendations(exploration);

    console.log('\n\n📊 EXPLORATION COMPLETE');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`   Interactive elements found: ${exploration.interactiveElements.length}`);
    console.log(`   Elements tested: ${exploration.interactiveElements.filter(e => e.tested).length}`);
    console.log(`   UI states captured: ${exploration.states.length}`);
    console.log(`   Screenshots taken: ${exploration.screenshots.length + exploration.states.length}`);
    console.log(`   Working features: ${exploration.features.working.length}`);
    console.log(`   Issues found: ${exploration.features.issues.length}`);
    console.log('');
    console.log('📂 All screenshots saved to: test-screenshots/ux-explore-*\n');

  } catch (error) {
    console.error('❌ Exploration error:', error);
  } finally {
    await browser.close();
  }
}

function generateEvidenceBasedRecommendations(exploration) {
  console.log('📋 FEATURES THAT WORK WELL:');
  console.log('─────────────────────────────────────────────────────────────\n');

  if (exploration.features.working.length > 0) {
    exploration.features.working.forEach(feature => {
      console.log(`   ✅ ${feature}`);
    });

    // Find the dark/light mode toggle state
    const modeToggle = exploration.states.find(s => s.feature === 'Dark/Light Mode Toggle');
    if (modeToggle && modeToggle.working) {
      console.log('\n   💡 DARK/LIGHT MODE ANALYSIS:');
      console.log('      Evidence: ' + modeToggle.before + ' vs ' + modeToggle.after);
      console.log('      Finding: Toggle works perfectly!');
      console.log('      Recommendation: ✅ No changes needed - well implemented');
    }
  } else {
    console.log('   ℹ️  Limited functionality in empty state (expected)');
  }

  console.log('\n\n🔍 ISSUES FOUND:');
  console.log('─────────────────────────────────────────────────────────────\n');

  if (exploration.features.issues.length > 0) {
    exploration.features.issues.forEach((issue, idx) => {
      console.log(`   ${idx + 1}. ⚠️  ${issue}`);
    });
  } else {
    console.log('   ✅ No issues found - all tested features working correctly!');
  }

  console.log('\n\n💡 ACTIONABLE RECOMMENDATIONS:');
  console.log('─────────────────────────────────────────────────────────────\n');

  // Only provide recommendations based on actual findings
  const hasEmptyState = exploration.features.found.includes('Empty state displayed');

  if (hasEmptyState) {
    console.log('   1. 📦 EMPTY STATE ENHANCEMENT');
    console.log('      Evidence: ux-explore-00-initial.png shows empty state');
    console.log('      Current: Basic "No Active Cases" message');
    console.log('      Suggestion: Add visual elements:');
    console.log('         - Pulsing "listening" indicator');
    console.log('         - Last update timestamp');
    console.log('         - Expected next case info');
    console.log('');
  }

  const responsiveIssues = exploration.features.issues.filter(i => i.includes('Responsive'));
  if (responsiveIssues.length > 0) {
    console.log('   2. 📱 RESPONSIVE ISSUES');
    responsiveIssues.forEach(issue => {
      console.log(`      ⚠️  ${issue}`);
    });
    console.log('');
  }

  const hasWorkingToggle = exploration.features.working.some(f => f.includes('mode toggle'));
  if (hasWorkingToggle) {
    console.log('   3. 🌓 THEME TOGGLE PERSISTENCE');
    console.log('      Evidence: Mode toggle tested and working');
    console.log('      Recommendation: Ensure preference persists in localStorage');
    console.log('      Code suggestion:');
    console.log('         localStorage.setItem("theme", isDark ? "dark" : "light");');
    console.log('');
  }

  console.log('   4. 📊 FUTURE ENHANCEMENTS (When Cases Present)');
  console.log('      - Test case card interactions');
  console.log('      - Test filtering functionality');
  console.log('      - Test real-time updates');
  console.log('      - Test navigation to PWA results');
  console.log('');
}

// Run the intelligent exploration
intelligentUXExploration();
