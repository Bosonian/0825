/**
 * Version Comparison Test v2: Fair Comparison
 * 0825 (Claude Prototype) vs 0925 (Human Optimized)
 *
 * Focus: UI/UX quality, performance, code optimization
 * Excludes: Kiosk (new feature not in original scope)
 */
import { chromium } from '@playwright/test';

const VERSIONS = {
  claude: {
    name: '0825 (Claude Prototype)',
    pwa: 'https://igfap.eu/0825/',
  },
  human: {
    name: '0925 (Developer Optimized)',
    pwa: 'https://igfap.eu/0925/',
  }
};

const TEST_PASSWORD = 'Neuro25';

// HTML entity patterns to detect
const ENTITY_PATTERNS = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x2F;': '/',
  '&amp;': '&',
  '&#39;': "'",
};

const results = {
  claude: {},
  human: {}
};

async function compareVersions() {
  console.log('🔬 FAIR VERSION COMPARISON TEST v2');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 0825 (Claude Prototype) vs 0925 (Developer Optimized)');
  console.log('🎯 Focus: Performance, UI/UX Quality, Optimizations');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 300
  });

  try {
    // Test Claude version (0825)
    console.log('═══════════════════════════════════════════════════════');
    console.log('🤖 TESTING: 0825 (Claude Prototype)');
    console.log('═══════════════════════════════════════════════════════\n');

    results.claude = await testVersion(browser, VERSIONS.claude, '0825-claude');

    // Test Human version (0925)
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('👨‍💻 TESTING: 0925 (Developer Optimized)');
    console.log('═══════════════════════════════════════════════════════\n');

    results.human = await testVersion(browser, VERSIONS.human, '0925-human');

    // Generate comparison report
    generateComparisonReport();

  } catch (error) {
    console.error('❌ Test error:', error);
  } finally {
    await browser.close();
  }
}

async function testVersion(browser, version, screenshotPrefix) {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const versionResults = {
    performance: {},
    issues: [],
    features: {},
    userExperience: {},
    screenshots: []
  };

  // Test 1: Initial Load Performance
  console.log(`\n⚡ Test 1: Load Performance - ${version.name}`);
  console.log('─────────────────────────────────────────────────────');
  const perfTest = await testLoadPerformance(context, version.pwa, screenshotPrefix);
  versionResults.performance = perfTest.metrics;
  versionResults.screenshots.push(perfTest.screenshot);
  console.log(`   📸 Screenshot: ${perfTest.screenshot}`);

  // Test 2: Login Flow (with proper button detection)
  console.log(`\n🔐 Test 2: Login Flow - ${version.name}`);
  console.log('─────────────────────────────────────────────────────');
  const loginTest = await testLoginFlow(context, version.pwa, screenshotPrefix);
  versionResults.issues.push(...loginTest.issues);
  versionResults.features.authentication = loginTest.success;
  versionResults.userExperience.loginExperience = loginTest.experience;
  if (loginTest.screenshot) versionResults.screenshots.push(loginTest.screenshot);

  // Test 3: Main Interface Quality
  if (loginTest.success) {
    console.log(`\n🎨 Test 3: UI Quality & Text Rendering - ${version.name}`);
    console.log('─────────────────────────────────────────────────────');
    const uiTest = await testUIQuality(context, version.pwa, screenshotPrefix);
    versionResults.issues.push(...uiTest.issues);
    versionResults.features.uiElements = uiTest.elements;
    versionResults.screenshots.push(uiTest.screenshot);
  }

  // Test 4: Module Navigation
  if (loginTest.success) {
    console.log(`\n📦 Test 4: Module Navigation - ${version.name}`);
    console.log('─────────────────────────────────────────────────────');
    const moduleTest = await testModuleNavigation(context, version.pwa, screenshotPrefix);
    versionResults.issues.push(...moduleTest.issues);
    versionResults.features.modules = moduleTest.modules;
    versionResults.userExperience.navigation = moduleTest.experience;
    versionResults.screenshots.push(...moduleTest.screenshots);
  }

  // Test 5: Responsive Design
  console.log(`\n📱 Test 5: Responsive Design - ${version.name}`);
  console.log('─────────────────────────────────────────────────────');
  const responsiveTest = await testResponsiveDesign(context, version.pwa, screenshotPrefix);
  versionResults.issues.push(...responsiveTest.issues);
  versionResults.userExperience.responsive = responsiveTest.quality;
  versionResults.screenshots.push(...responsiveTest.screenshots);

  await context.close();
  return versionResults;
}

async function testLoadPerformance(context, url, prefix) {
  const page = await context.newPage();
  const metrics = {};
  let screenshot = '';

  try {
    // Measure load time
    const startTime = Date.now();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const loadTime = Date.now() - startTime;

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        dns: nav.domainLookupEnd - nav.domainLookupStart,
        connection: nav.connectEnd - nav.connectStart,
        ttfb: nav.responseStart - nav.requestStart,
        domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
        domComplete: nav.domComplete,
      };
    });

    metrics.loadTime = loadTime;
    metrics.ttfb = Math.round(performanceMetrics.ttfb);
    metrics.domComplete = Math.round(performanceMetrics.domComplete);

    console.log(`   ⏱️  Total Load Time: ${loadTime}ms`);
    console.log(`   ⚡ Time to First Byte: ${metrics.ttfb}ms`);
    console.log(`   📄 DOM Complete: ${metrics.domComplete}ms`);

    // Take screenshot
    screenshot = `test-screenshots/v2-${prefix}-load.png`;
    await page.screenshot({ path: screenshot, fullPage: true });

  } catch (error) {
    console.log(`   ❌ Performance test error: ${error.message}`);
  } finally {
    await page.close();
  }

  return { metrics, screenshot };
}

async function testLoginFlow(context, url, prefix) {
  const page = await context.newPage();
  const issues = [];
  const experience = {};
  let success = false;
  let screenshot = '';

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Check for HTML entities on login screen
    let bodyText = await page.textContent('body');
    let entityCount = 0;
    Object.entries(ENTITY_PATTERNS).forEach(([entity, char]) => {
      if (bodyText.includes(entity)) {
        entityCount++;
        issues.push({
          severity: 'CRITICAL',
          type: 'HTML_ENTITY',
          screen: 'Login',
          found: entity,
          expected: char
        });
      }
    });

    if (entityCount > 0) {
      console.log(`   ❌ HTML Entities Found: ${entityCount}`);
    } else {
      console.log(`   ✅ Text Rendering: Clean (no HTML entities)`);
    }

    // Find password field
    const passwordField = await page.locator('input[type="password"]').first();
    await passwordField.fill(TEST_PASSWORD);
    console.log(`   ✅ Password entered: ${TEST_PASSWORD}`);

    // Find and click login/access button (try multiple selectors)
    let loginButton = null;
    const buttonSelectors = [
      'button.primary',
      'button[type="submit"]',
      'button:has-text("Access")',
      'button:has-text("Login")',
      'button:has-text("Enter")',
      '.login-button',
      '#loginButton',
      'button.btn-primary'
    ];

    for (const selector of buttonSelectors) {
      try {
        const btn = page.locator(selector).first();
        if (await btn.isVisible({ timeout: 1000 })) {
          loginButton = btn;
          console.log(`   ✅ Found button: ${selector}`);
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    if (loginButton) {
      await loginButton.click();
      console.log(`   🖱️  Clicked login button`);
      await page.waitForTimeout(3000);

      // Check if login successful
      const afterLoginText = await page.textContent('body');
      const stillOnLogin = await page.isVisible('input[type="password"]').catch(() => false);
      const hasModules = afterLoginText.includes('Module') ||
                        afterLoginText.includes('Coma') ||
                        afterLoginText.includes('Assessment');

      success = !stillOnLogin || hasModules;

      if (success) {
        console.log(`   ✅ Authentication: SUCCESS`);
        console.log(`   ✅ Redirected to main interface`);
        experience.loginSuccess = true;
        experience.requiresReload = false;
      } else {
        console.log(`   ❌ Authentication: FAILED (still on login screen)`);
        issues.push({
          severity: 'HIGH',
          type: 'AUTH_FAILED',
          screen: 'Authentication',
          found: 'Login failed or no redirect'
        });
      }

      screenshot = `test-screenshots/v2-${prefix}-after-login.png`;
      await page.screenshot({ path: screenshot, fullPage: true });

    } else {
      console.log(`   ❌ Login button not found (tried ${buttonSelectors.length} selectors)`);
      issues.push({
        severity: 'CRITICAL',
        type: 'NO_LOGIN_BUTTON',
        screen: 'Login',
        found: 'Cannot find login/access button'
      });
    }

  } catch (error) {
    console.log(`   ❌ Login flow error: ${error.message}`);
    issues.push({
      severity: 'HIGH',
      type: 'LOGIN_ERROR',
      screen: 'Login',
      found: error.message
    });
  } finally {
    await page.close();
  }

  return { success, issues, experience, screenshot };
}

async function testUIQuality(context, url, prefix) {
  const page = await context.newPage();
  const issues = [];
  const elements = {};
  let screenshot = '';

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Login if needed
    const hasPassword = await page.isVisible('input[type="password"]').catch(() => false);
    if (hasPassword) {
      await page.fill('input[type="password"]', TEST_PASSWORD);
      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent().catch(() => '');
        if (text.includes('Access') || text.includes('Login') || text.includes('Enter')) {
          await btn.click();
          break;
        }
      }
      await page.waitForTimeout(2000);
    }

    // Check for HTML entities throughout the interface
    const bodyText = await page.textContent('body');
    let entityCount = 0;
    Object.entries(ENTITY_PATTERNS).forEach(([entity, char]) => {
      if (bodyText.includes(entity)) {
        entityCount++;
        issues.push({
          severity: 'HIGH',
          type: 'HTML_ENTITY',
          screen: 'Main UI',
          found: entity,
          expected: char
        });
      }
    });

    console.log(`   ${entityCount === 0 ? '✅' : '❌'} HTML Entities: ${entityCount === 0 ? 'None' : entityCount + ' found'}`);

    // Check for critical UI elements
    const hasHeader = await page.locator('header, .app-header, .header').first().isVisible().catch(() => false);
    const hasNavigation = await page.locator('nav, .navigation, button[data-action]').first().isVisible().catch(() => false);
    const hasContent = await page.locator('main, .container, .app-content').first().isVisible().catch(() => false);

    elements.header = hasHeader;
    elements.navigation = hasNavigation;
    elements.mainContent = hasContent;

    console.log(`   ${hasHeader ? '✅' : '❌'} Header present`);
    console.log(`   ${hasNavigation ? '✅' : '❌'} Navigation elements`);
    console.log(`   ${hasContent ? '✅' : '❌'} Main content area`);

    // Check color contrast and accessibility
    const contrastIssues = await page.evaluate(() => {
      const issues = [];
      const elements = document.querySelectorAll('button, a, .card, .module-card');
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        // Basic check - more sophisticated tools exist
        if (color === bgColor) {
          issues.push('Low contrast detected');
        }
      });
      return issues;
    });

    if (contrastIssues.length > 0) {
      console.log(`   ⚠️  Potential contrast issues: ${contrastIssues.length}`);
    } else {
      console.log(`   ✅ Color contrast: Good`);
    }

    screenshot = `test-screenshots/v2-${prefix}-ui-quality.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    console.log(`   📸 Screenshot: ${screenshot}`);

  } catch (error) {
    console.log(`   ❌ UI quality test error: ${error.message}`);
  } finally {
    await page.close();
  }

  return { issues, elements, screenshot };
}

async function testModuleNavigation(context, url, prefix) {
  const page = await context.newPage();
  const issues = [];
  const modules = {};
  const experience = {};
  const screenshots = [];

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Login
    const hasPassword = await page.isVisible('input[type="password"]').catch(() => false);
    if (hasPassword) {
      await page.fill('input[type="password"]', TEST_PASSWORD);
      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent().catch(() => '');
        if (text.includes('Access') || text.includes('Login') || text.includes('Enter')) {
          await btn.click();
          break;
        }
      }
      await page.waitForTimeout(2000);
    }

    // Look for modules
    const bodyText = await page.textContent('body');

    const moduleNames = ['Coma', 'Limited', 'Full'];
    let foundModules = 0;

    for (const moduleName of moduleNames) {
      const found = bodyText.includes(moduleName);
      modules[moduleName] = found;
      if (found) foundModules++;
      console.log(`   ${found ? '✅' : '❌'} ${moduleName} Module`);
    }

    experience.allModulesPresent = foundModules === 3;
    experience.moduleCount = foundModules;

    // Try to click first module
    const moduleButtons = await page.locator('button[data-action*="module"], .module-card button, button:has-text("Start")').all();

    if (moduleButtons.length > 0) {
      console.log(`   ✅ Found ${moduleButtons.length} clickable module(s)`);

      // Click first module
      try {
        await moduleButtons[0].click();
        await page.waitForTimeout(2000);

        const afterClickText = await page.textContent('body');
        const navigated = !afterClickText.includes('Select') &&
                         (afterClickText.includes('Triage') ||
                          afterClickText.includes('Assessment') ||
                          afterClickText.includes('Patient'));

        if (navigated) {
          console.log(`   ✅ Module navigation: Working`);
          experience.navigationWorks = true;

          const navScreenshot = `test-screenshots/v2-${prefix}-module-nav.png`;
          await page.screenshot({ path: navScreenshot, fullPage: true });
          screenshots.push(navScreenshot);
        } else {
          console.log(`   ⚠️  Module clicked but no navigation detected`);
          experience.navigationWorks = false;
        }
      } catch (e) {
        console.log(`   ❌ Module click error: ${e.message}`);
      }
    } else {
      console.log(`   ❌ No clickable modules found`);
      issues.push({
        severity: 'HIGH',
        type: 'NO_MODULES',
        screen: 'Modules',
        found: 'No interactive module buttons found'
      });
    }

  } catch (error) {
    console.log(`   ❌ Module navigation error: ${error.message}`);
  } finally {
    await page.close();
  }

  return { issues, modules, experience, screenshots };
}

async function testResponsiveDesign(context, url, prefix) {
  const issues = [];
  const screenshots = [];
  const quality = {};

  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
  ];

  for (const viewport of viewports) {
    const page = await context.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      const bodyOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > document.body.clientWidth;
      });

      console.log(`   📱 ${viewport.name} (${viewport.width}x${viewport.height}): ${bodyOverflow ? '⚠️ Overflow' : '✅ OK'}`);

      if (bodyOverflow) {
        issues.push({
          severity: 'MEDIUM',
          type: 'RESPONSIVE',
          screen: viewport.name,
          found: 'Horizontal overflow detected'
        });
      }

      const screenshot = `test-screenshots/v2-${prefix}-${viewport.name.toLowerCase()}.png`;
      await page.screenshot({ path: screenshot, fullPage: true });
      screenshots.push(screenshot);

    } catch (error) {
      console.log(`   ❌ ${viewport.name} error: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  quality.responsive = issues.length === 0;
  return { issues, screenshots, quality };
}

function generateComparisonReport() {
  console.log('\n\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 COMPREHENSIVE COMPARISON REPORT');
  console.log('═══════════════════════════════════════════════════════\n');

  // Performance Comparison
  console.log('⚡ PERFORMANCE:');
  console.log(`   🤖 Claude (0825):`);
  console.log(`      Load Time: ${results.claude.performance.loadTime}ms`);
  console.log(`      TTFB: ${results.claude.performance.ttfb}ms`);
  console.log(`      DOM Complete: ${results.claude.performance.domComplete}ms`);
  console.log('');
  console.log(`   👨‍💻 Human (0925):`);
  console.log(`      Load Time: ${results.human.performance.loadTime}ms`);
  console.log(`      TTFB: ${results.human.performance.ttfb}ms`);
  console.log(`      DOM Complete: ${results.human.performance.domComplete}ms`);
  console.log('');

  const perfWinner = results.human.performance.loadTime < results.claude.performance.loadTime ? 'Human' : 'Claude';
  const perfDiff = Math.abs(results.human.performance.loadTime - results.claude.performance.loadTime);
  console.log(`   🏆 Performance Winner: ${perfWinner} (${perfDiff}ms faster)\n`);

  // Issue Count
  console.log('🐛 ISSUES FOUND:');
  console.log(`   🤖 Claude (0825):     ${results.claude.issues.length} issue(s)`);
  console.log(`   👨‍💻 Human (0925):      ${results.human.issues.length} issue(s)`);
  console.log('');

  // Break down by severity
  const claudeCritical = results.claude.issues.filter(i => i.severity === 'CRITICAL').length;
  const humanCritical = results.human.issues.filter(i => i.severity === 'CRITICAL').length;

  console.log('   Severity Breakdown:');
  console.log(`   🤖 Claude: ${claudeCritical} Critical, ${results.claude.issues.length - claudeCritical} Other`);
  console.log(`   👨‍💻 Human:  ${humanCritical} Critical, ${results.human.issues.length - humanCritical} Other`);
  console.log('');

  // Features
  console.log('✨ FEATURES:');
  console.log(`   🤖 Claude (0825):`);
  console.log(`      Authentication: ${results.claude.features.authentication ? '✅ Working' : '❌ Failed'}`);
  console.log(`      Modules Present: ${results.claude.features.modules?.Coma ? '✅' : '❌'} Coma, ${results.claude.features.modules?.Limited ? '✅' : '❌'} Limited, ${results.claude.features.modules?.Full ? '✅' : '❌'} Full`);
  console.log('');
  console.log(`   👨‍💻 Human (0925):`);
  console.log(`      Authentication: ${results.human.features.authentication ? '✅ Working' : '❌ Failed'}`);
  console.log(`      Modules Present: ${results.human.features.modules?.Coma ? '✅' : '❌'} Coma, ${results.human.features.modules?.Limited ? '✅' : '❌'} Limited, ${results.human.features.modules?.Full ? '✅' : '❌'} Full`);
  console.log('');

  // Detailed Issues
  if (results.claude.issues.length > 0) {
    console.log('🤖 CLAUDE ISSUES:');
    results.claude.issues.forEach((issue, idx) => {
      console.log(`   ${idx + 1}. [${issue.severity}] ${issue.type} - ${issue.screen}`);
      if (issue.found) console.log(`      "${issue.found}"`);
    });
    console.log('');
  }

  if (results.human.issues.length > 0) {
    console.log('👨‍💻 HUMAN DEVELOPER ISSUES:');
    results.human.issues.forEach((issue, idx) => {
      console.log(`   ${idx + 1}. [${issue.severity}] ${issue.type} - ${issue.screen}`);
      if (issue.found) console.log(`      "${issue.found}"`);
    });
    console.log('');
  }

  // Final Verdict
  console.log('═══════════════════════════════════════════════════════');
  console.log('🏆 FINAL VERDICT');
  console.log('═══════════════════════════════════════════════════════\n');

  const claudeScore = {
    performance: results.human.performance.loadTime < results.claude.performance.loadTime ? 0 : 1,
    quality: results.claude.issues.length < results.human.issues.length ? 1 : 0,
    features: results.claude.features.authentication ? 1 : 0,
  };

  const humanScore = {
    performance: results.human.performance.loadTime < results.claude.performance.loadTime ? 1 : 0,
    quality: results.human.issues.length < results.claude.issues.length ? 1 : 0,
    features: results.human.features.authentication ? 1 : 0,
  };

  const claudeTotal = Object.values(claudeScore).reduce((a, b) => a + b, 0);
  const humanTotal = Object.values(humanScore).reduce((a, b) => a + b, 0);

  console.log(`   📊 Score: Claude ${claudeTotal}/3 vs Human ${humanTotal}/3\n`);

  if (claudeTotal > humanTotal) {
    console.log('   🤖 WINNER: Claude Code (0825)');
    console.log('   The prototype remains superior\n');
  } else if (humanTotal > claudeTotal) {
    console.log('   👨‍💻 WINNER: Human Developer (0925)');
    console.log('   Optimization successful!\n');
  } else {
    console.log('   🤝 TIE: Both versions have equal quality\n');
  }

  console.log('📸 All screenshots saved to test-screenshots/v2-*');
}

// Run
compareVersions();
