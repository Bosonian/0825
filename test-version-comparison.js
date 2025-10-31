/**
 * Version Comparison Test: 0825 (Claude) vs 0925 (Human Developer)
 * Comprehensive UI/UX evaluation across both versions
 */
import { chromium } from '@playwright/test';

const VERSIONS = {
  claude: {
    name: '0825 (Claude Code)',
    pwa: 'https://igfap.eu/0825/',
    kiosk: 'https://igfap.eu/kiosk/',
  },
  human: {
    name: '0925 (Human Developer)',
    pwa: 'https://igfap.eu/0925/',
    kiosk: 'https://igfap.eu/0925/kiosk/', // Assuming similar structure
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

// Test results storage
const results = {
  claude: { pwa: [], kiosk: [] },
  human: { pwa: [], kiosk: [] }
};

async function compareVersions() {
  console.log('🔬 VERSION COMPARISON TEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 Testing: 0825 (100% Claude Code) vs 0925 (Human "Optimized")');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // Slow down for observation
  });

  try {
    // Test Claude version (0825)
    console.log('═══════════════════════════════════════════════════════');
    console.log('🤖 TESTING: 0825 (Claude Code Version)');
    console.log('═══════════════════════════════════════════════════════\n');

    const claudeResults = await testVersion(browser, VERSIONS.claude, '0825-claude');
    results.claude = claudeResults;

    // Test Human version (0925)
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('👨‍💻 TESTING: 0925 (Human Developer Version)');
    console.log('═══════════════════════════════════════════════════════\n');

    const humanResults = await testVersion(browser, VERSIONS.human, '0925-human');
    results.human = humanResults;

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
    pwa: {
      issues: [],
      performance: {},
      features: {},
      screenshots: []
    },
    kiosk: {
      issues: [],
      features: {},
      screenshots: []
    }
  };

  // Test 1: PWA Login Screen
  console.log(`\n📱 Test 1: PWA Login Screen - ${version.name}`);
  console.log('─────────────────────────────────────────────────────');
  const loginTest = await testLoginScreen(context, version.pwa, screenshotPrefix);
  versionResults.pwa.issues.push(...loginTest.issues);
  versionResults.pwa.screenshots.push(loginTest.screenshot);

  // Test 2: PWA Authentication
  console.log(`\n🔐 Test 2: PWA Authentication - ${version.name}`);
  console.log('─────────────────────────────────────────────────────');
  const authTest = await testAuthentication(context, version.pwa, screenshotPrefix);
  versionResults.pwa.issues.push(...authTest.issues);
  versionResults.pwa.features.authentication = authTest.success;

  // Test 3: PWA Welcome/Module Selection
  if (authTest.success) {
    console.log(`\n🏠 Test 3: PWA Welcome Screen - ${version.name}`);
    console.log('─────────────────────────────────────────────────────');
    const welcomeTest = await testWelcomeScreen(context, version.pwa, screenshotPrefix);
    versionResults.pwa.issues.push(...welcomeTest.issues);
    versionResults.pwa.features.modules = welcomeTest.modules;
    versionResults.pwa.screenshots.push(welcomeTest.screenshot);
  }

  // Test 4: PWA Responsive Design
  console.log(`\n📱 Test 4: PWA Mobile Responsiveness - ${version.name}`);
  console.log('─────────────────────────────────────────────────────');
  const responsiveTest = await testResponsiveDesign(context, version.pwa, screenshotPrefix);
  versionResults.pwa.issues.push(...responsiveTest.issues);
  versionResults.pwa.screenshots.push(...responsiveTest.screenshots);

  // Test 5: Kiosk Interface
  console.log(`\n🖥️  Test 5: Kiosk Interface - ${version.name}`);
  console.log('─────────────────────────────────────────────────────');
  const kioskTest = await testKioskInterface(context, version.kiosk, screenshotPrefix);
  versionResults.kiosk.issues.push(...kioskTest.issues);
  versionResults.kiosk.features = kioskTest.features;
  versionResults.kiosk.screenshots.push(kioskTest.screenshot);

  await context.close();
  return versionResults;
}

async function testLoginScreen(context, url, prefix) {
  const page = await context.newPage();
  const issues = [];
  let screenshot = '';

  try {
    const startTime = Date.now();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const loadTime = Date.now() - startTime;

    console.log(`   ⏱️  Load time: ${loadTime}ms`);

    // Wait for password field
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });

    // Check for HTML entities
    const bodyText = await page.textContent('body');
    Object.entries(ENTITY_PATTERNS).forEach(([entity, char]) => {
      if (bodyText.includes(entity)) {
        issues.push({
          severity: 'CRITICAL',
          type: 'HTML_ENTITY',
          screen: 'Login',
          found: entity,
          expected: char
        });
        console.log(`   ❌ HTML entity: ${entity} (should be "${char}")`);
      }
    });

    // Check for key elements
    const hasPasswordField = await page.isVisible('input[type="password"]');
    const hasLoginButton = await page.isVisible('button.primary');

    console.log(`   ${hasPasswordField ? '✅' : '❌'} Password field present`);
    console.log(`   ${hasLoginButton ? '✅' : '❌'} Login button present`);

    if (!hasPasswordField || !hasLoginButton) {
      issues.push({
        severity: 'HIGH',
        type: 'MISSING_ELEMENT',
        screen: 'Login',
        found: 'Missing UI elements'
      });
    }

    // Take screenshot
    screenshot = `test-screenshots/comparison-${prefix}-login.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    console.log(`   📸 Screenshot: ${screenshot}`);

    if (issues.length === 0) {
      console.log(`   ✅ Login screen: PASSED`);
    } else {
      console.log(`   ❌ Login screen: ${issues.length} issue(s)`);
    }

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    issues.push({
      severity: 'HIGH',
      type: 'TEST_ERROR',
      screen: 'Login',
      found: error.message
    });
  } finally {
    await page.close();
  }

  return { issues, screenshot };
}

async function testAuthentication(context, url, prefix) {
  const page = await context.newPage();
  const issues = [];
  let success = false;

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });

    // Enter password
    await page.fill('input[type="password"]', TEST_PASSWORD);

    // Click login button
    const loginButton = await page.locator('button.primary').first();
    await loginButton.click();

    // Wait for navigation or success indicator
    await page.waitForTimeout(3000);

    // Check if login successful (should see module selection or no longer see password field)
    const passwordFieldVisible = await page.isVisible('input[type="password"]');
    const hasModuleSelection = await page.isVisible('.module-card, .app-modules, [data-action*="module"]');

    success = !passwordFieldVisible || hasModuleSelection;

    console.log(`   ${success ? '✅' : '❌'} Authentication: ${success ? 'SUCCESS' : 'FAILED'}`);

    if (!success) {
      // Check for error messages
      const errorText = await page.textContent('body');
      if (errorText.includes('429') || errorText.includes('Too Many Requests')) {
        issues.push({
          severity: 'HIGH',
          type: 'RATE_LIMIT',
          screen: 'Authentication',
          found: 'HTTP 429 - Rate limiting active'
        });
        console.log(`   ⚠️  Rate limiting detected (HTTP 429)`);
      } else if (errorText.includes('Invalid') || errorText.includes('incorrect')) {
        issues.push({
          severity: 'HIGH',
          type: 'AUTH_FAILED',
          screen: 'Authentication',
          found: 'Invalid credentials error'
        });
      }
    }

  } catch (error) {
    console.log(`   ❌ Authentication error: ${error.message}`);
    issues.push({
      severity: 'HIGH',
      type: 'AUTH_ERROR',
      screen: 'Authentication',
      found: error.message
    });
  } finally {
    await page.close();
  }

  return { success, issues };
}

async function testWelcomeScreen(context, url, prefix) {
  const page = await context.newPage();
  const issues = [];
  const modules = [];
  let screenshot = '';

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Login first
    const passwordField = await page.isVisible('input[type="password"]');
    if (passwordField) {
      await page.fill('input[type="password"]', TEST_PASSWORD);
      await page.locator('button.primary').first().click();
      await page.waitForTimeout(2000);
    }

    // Check for module cards
    const moduleCards = await page.locator('.module-card, [data-action*="module"]').count();
    console.log(`   📦 Module cards found: ${moduleCards}`);

    // Check for specific modules
    const bodyText = await page.textContent('body');

    const expectedModules = ['Coma', 'Limited', 'Full'];
    expectedModules.forEach(moduleName => {
      const found = bodyText.includes(moduleName);
      modules.push({ name: moduleName, present: found });
      console.log(`   ${found ? '✅' : '❌'} ${moduleName} module`);
    });

    // Check for HTML entities
    Object.entries(ENTITY_PATTERNS).forEach(([entity, char]) => {
      if (bodyText.includes(entity)) {
        issues.push({
          severity: 'CRITICAL',
          type: 'HTML_ENTITY',
          screen: 'Welcome',
          found: entity,
          expected: char
        });
        console.log(`   ❌ HTML entity: ${entity}`);
      }
    });

    // Take screenshot
    screenshot = `test-screenshots/comparison-${prefix}-welcome.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    console.log(`   📸 Screenshot: ${screenshot}`);

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    issues.push({
      severity: 'HIGH',
      type: 'TEST_ERROR',
      screen: 'Welcome',
      found: error.message
    });
  } finally {
    await page.close();
  }

  return { issues, modules, screenshot };
}

async function testResponsiveDesign(context, url, prefix) {
  const issues = [];
  const screenshots = [];
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  for (const viewport of viewports) {
    const page = await context.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Check if content is visible and not overflowing
      const bodyOverflow = await page.evaluate(() => {
        const body = document.body;
        return {
          scrollWidth: body.scrollWidth,
          clientWidth: body.clientWidth,
          hasHorizontalScroll: body.scrollWidth > body.clientWidth
        };
      });

      console.log(`   📱 ${viewport.name} (${viewport.width}x${viewport.height})`);
      console.log(`      ${bodyOverflow.hasHorizontalScroll ? '⚠️' : '✅'} Horizontal scroll: ${bodyOverflow.hasHorizontalScroll ? 'PRESENT' : 'None'}`);

      if (bodyOverflow.hasHorizontalScroll) {
        issues.push({
          severity: 'MEDIUM',
          type: 'RESPONSIVE_ISSUE',
          screen: `Responsive-${viewport.name}`,
          found: 'Horizontal scrolling detected'
        });
      }

      const screenshot = `test-screenshots/comparison-${prefix}-${viewport.name.toLowerCase()}.png`;
      await page.screenshot({ path: screenshot, fullPage: true });
      screenshots.push(screenshot);
      console.log(`      📸 Screenshot: ${screenshot}`);

    } catch (error) {
      console.log(`   ❌ ${viewport.name} error: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  return { issues, screenshots };
}

async function testKioskInterface(context, url, prefix) {
  const page = await context.newPage();
  const issues = [];
  const features = {};
  let screenshot = '';

  try {
    console.log(`   🌐 Testing URL: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    const bodyText = await page.textContent('body');

    // Check if kiosk loads
    const hasKioskHeader = bodyText.includes('Hospital') || bodyText.includes('Cases') || bodyText.includes('Kiosk');
    const hasError = bodyText.includes('Error') || bodyText.includes('404') || bodyText.includes('Not Found');

    features.loads = !hasError;
    features.hasContent = hasKioskHeader;

    console.log(`   ${features.loads ? '✅' : '❌'} Kiosk interface loads`);
    console.log(`   ${features.hasContent ? '✅' : '❌'} Kiosk content present`);

    if (hasError) {
      issues.push({
        severity: 'CRITICAL',
        type: 'KIOSK_ERROR',
        screen: 'Kiosk',
        found: 'Kiosk interface shows error or 404'
      });
    }

    // Check for HTML entities
    Object.entries(ENTITY_PATTERNS).forEach(([entity, char]) => {
      if (bodyText.includes(entity)) {
        issues.push({
          severity: 'CRITICAL',
          type: 'HTML_ENTITY',
          screen: 'Kiosk',
          found: entity,
          expected: char
        });
        console.log(`   ❌ HTML entity: ${entity}`);
      }
    });

    // Take screenshot
    screenshot = `test-screenshots/comparison-${prefix}-kiosk.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    console.log(`   📸 Screenshot: ${screenshot}`);

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    issues.push({
      severity: 'HIGH',
      type: 'TEST_ERROR',
      screen: 'Kiosk',
      found: error.message
    });
    features.loads = false;
  } finally {
    await page.close();
  }

  return { issues, features, screenshot };
}

function generateComparisonReport() {
  console.log('\n\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 COMPARISON REPORT: Claude vs Human Developer');
  console.log('═══════════════════════════════════════════════════════\n');

  const claudeIssues = [
    ...results.claude.pwa.issues,
    ...results.claude.kiosk.issues
  ];

  const humanIssues = [
    ...results.human.pwa.issues,
    ...results.human.kiosk.issues
  ];

  console.log('📈 ISSUE COUNT:');
  console.log(`   🤖 0825 (Claude):         ${claudeIssues.length} issue(s)`);
  console.log(`   👨‍💻 0925 (Human Dev):     ${humanIssues.length} issue(s)`);
  console.log('');

  // Breakdown by severity
  const claudeCritical = claudeIssues.filter(i => i.severity === 'CRITICAL').length;
  const claudeHigh = claudeIssues.filter(i => i.severity === 'HIGH').length;
  const claudeMedium = claudeIssues.filter(i => i.severity === 'MEDIUM').length;

  const humanCritical = humanIssues.filter(i => i.severity === 'CRITICAL').length;
  const humanHigh = humanIssues.filter(i => i.severity === 'HIGH').length;
  const humanMedium = humanIssues.filter(i => i.severity === 'MEDIUM').length;

  console.log('📊 SEVERITY BREAKDOWN:');
  console.log('');
  console.log('   🤖 0825 (Claude Code):');
  console.log(`      🚨 Critical: ${claudeCritical}`);
  console.log(`      ⚠️  High:     ${claudeHigh}`);
  console.log(`      📋 Medium:   ${claudeMedium}`);
  console.log('');
  console.log('   👨‍💻 0925 (Human Developer):');
  console.log(`      🚨 Critical: ${humanCritical}`);
  console.log(`      ⚠️  High:     ${humanHigh}`);
  console.log(`      📋 Medium:   ${humanMedium}`);
  console.log('');

  // Detailed issues
  if (claudeIssues.length > 0) {
    console.log('🤖 0825 (Claude) - ISSUES FOUND:');
    claudeIssues.forEach((issue, idx) => {
      console.log(`   ${idx + 1}. [${issue.severity}] ${issue.type} - ${issue.screen}`);
      console.log(`      Found: "${issue.found}"`);
      if (issue.expected) console.log(`      Expected: "${issue.expected}"`);
    });
    console.log('');
  } else {
    console.log('🤖 0825 (Claude): ✅✅✅ NO ISSUES FOUND!\n');
  }

  if (humanIssues.length > 0) {
    console.log('👨‍💻 0925 (Human Developer) - ISSUES FOUND:');
    humanIssues.forEach((issue, idx) => {
      console.log(`   ${idx + 1}. [${issue.severity}] ${issue.type} - ${issue.screen}`);
      console.log(`      Found: "${issue.found}"`);
      if (issue.expected) console.log(`      Expected: "${issue.expected}"`);
    });
    console.log('');
  } else {
    console.log('👨‍💻 0925 (Human Developer): ✅✅✅ NO ISSUES FOUND!\n');
  }

  // Final verdict
  console.log('═══════════════════════════════════════════════════════');
  console.log('🏆 FINAL VERDICT');
  console.log('═══════════════════════════════════════════════════════');

  if (claudeIssues.length < humanIssues.length) {
    console.log('');
    console.log('   🤖 WINNER: 0825 (Claude Code)');
    console.log('   Claude Code version has FEWER issues');
    console.log(`   Difference: ${humanIssues.length - claudeIssues.length} fewer issue(s)`);
  } else if (humanIssues.length < claudeIssues.length) {
    console.log('');
    console.log('   👨‍💻 WINNER: 0925 (Human Developer)');
    console.log('   Human optimized version has FEWER issues');
    console.log(`   Difference: ${claudeIssues.length - humanIssues.length} fewer issue(s)`);
  } else {
    console.log('');
    console.log('   🤝 TIE: Both versions have equal issue count');
    console.log('   Quality comparison inconclusive');
  }
  console.log('');

  // Screenshots summary
  console.log('📸 SCREENSHOTS SAVED:');
  console.log(`   🤖 Claude (0825): test-screenshots/comparison-0825-claude-*`);
  console.log(`   👨‍💻 Human (0925):  test-screenshots/comparison-0925-human-*`);
  console.log('');
}

// Run the comparison
compareVersions();
