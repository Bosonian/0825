/**
 * Visual Testing Agent - Comprehensive UI Rendering Test
 * Detects HTML entities, text encoding issues, and visual bugs
 */
import { chromium } from '@playwright/test';

// HTML entities to detect
const ENTITY_PATTERNS = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x2F;': '/',
  '&amp;': '&',
  '&#39;': "'",
};

// Critical text patterns that must render correctly
const CRITICAL_TEXT = [
  { text: 'Glasgow Coma Scale < 9', location: 'Triage Help' },
  { text: 'GFAP Value (pg/mL)', location: 'Form Labels' },
  { text: "Patient's age in years", location: 'Help Text' },
  { text: 'GCS < 9', location: 'Triage Question' },
];

async function testVisualRendering() {
  console.log('🎨 Visual Testing Agent - Starting Comprehensive UI Test\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const allIssues = [];
  let totalScreens = 0;
  let screensWithIssues = 0;

  try {
    // Test 1: Login Screen
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 Test 1: Login Screen');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const loginIssues = await testScreen(
      context,
      'https://igfap.eu/0825/',
      'login',
      {
        checkAuth: false,
        waitForElement: 'input[type="password"]'
      }
    );
    allIssues.push(...loginIssues);
    totalScreens++;
    if (loginIssues.length > 0) screensWithIssues++;

    // Test 2: Triage Screen (requires authentication, skip for now)
    // We can't test authenticated screens without valid login

    // Test 3: Results in Kiosk Mode (bypasses auth)
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 Test 2: Results Screen (Kiosk Mode)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const resultsIssues = await testScreen(
      context,
      'https://igfap.eu/0825/#results?display=kiosk&caseId=test_case',
      'results-kiosk',
      {
        checkAuth: false,
        waitForElement: '.results-container, .error-message',
        timeout: 10000
      }
    );
    allIssues.push(...resultsIssues);
    totalScreens++;
    if (resultsIssues.length > 0) screensWithIssues++;

    // Test 4: Kiosk Interface
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 Test 3: Kiosk Interface');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const kioskIssues = await testScreen(
      context,
      'https://igfap.eu/kiosk/',
      'kiosk-interface',
      {
        checkAuth: false,
        waitForElement: '#kioskHeader'
      }
    );
    allIssues.push(...kioskIssues);
    totalScreens++;
    if (kioskIssues.length > 0) screensWithIssues++;

    // Final Summary
    console.log('\n\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 VISUAL TESTING SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Total screens tested: ${totalScreens}`);
    console.log(`  Screens with issues: ${screensWithIssues}`);
    console.log(`  Total issues found: ${allIssues.length}`);

    if (allIssues.length === 0) {
      console.log('\n✅✅✅ ALL VISUAL TESTS PASSED! ✅✅✅');
      console.log('No HTML entity encoding issues detected');
    } else {
      console.log('\n❌ ISSUES DETECTED:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Group by severity
      const critical = allIssues.filter(i => i.severity === 'CRITICAL');
      const high = allIssues.filter(i => i.severity === 'HIGH');
      const medium = allIssues.filter(i => i.severity === 'MEDIUM');

      if (critical.length > 0) {
        console.log(`\n🚨 CRITICAL (${critical.length}):`);
        critical.forEach(issue => {
          console.log(`   Screen: ${issue.screen}`);
          console.log(`   Found: "${issue.found}"`);
          console.log(`   Expected: "${issue.expected}"`);
          console.log('');
        });
      }

      if (high.length > 0) {
        console.log(`\n⚠️  HIGH (${high.length}):`);
        high.forEach(issue => {
          console.log(`   Screen: ${issue.screen}`);
          console.log(`   Found: "${issue.found}"`);
          console.log(`   Expected: "${issue.expected}"`);
          console.log('');
        });
      }

      if (medium.length > 0) {
        console.log(`\n📋 MEDIUM (${medium.length}):`);
        medium.forEach(issue => {
          console.log(`   Screen: ${issue.screen} - ${issue.found}`);
        });
      }
    }

    console.log('\n📸 Screenshots saved to test-screenshots/visual-test-*.png');

  } catch (error) {
    console.error('\n❌ Visual testing error:', error.message);
    console.error(error.stack);
  }

  await browser.close();
}

/**
 * Test a single screen for visual issues
 */
async function testScreen(context, url, screenName, options = {}) {
  const page = await context.newPage();
  const issues = [];

  try {
    // Navigate to page
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: options.timeout || 30000
    });

    // Wait for specific element if specified
    if (options.waitForElement) {
      try {
        await page.waitForSelector(options.waitForElement, { timeout: 5000 });
      } catch (e) {
        console.log(`   ⚠️  Element ${options.waitForElement} not found (may be expected)`);
      }
    }

    // Wait a bit for dynamic content
    await page.waitForTimeout(2000);

    // Get all visible text
    const bodyText = await page.textContent('body');

    // Check for HTML entities
    Object.entries(ENTITY_PATTERNS).forEach(([entity, char]) => {
      if (bodyText.includes(entity)) {
        // Find context (where it appears)
        const contextLength = 50;
        const index = bodyText.indexOf(entity);
        const start = Math.max(0, index - contextLength);
        const end = Math.min(bodyText.length, index + entity.length + contextLength);
        const context = bodyText.substring(start, end).trim();

        issues.push({
          screen: screenName,
          severity: 'CRITICAL',
          type: 'HTML_ENTITY',
          found: entity,
          expected: char,
          context: context.length > 100 ? context.substring(0, 100) + '...' : context
        });
      }
    });

    // Check for critical text patterns
    CRITICAL_TEXT.forEach(({ text, location }) => {
      if (!bodyText.includes(text)) {
        // Check if the escaped version is present instead
        const escapedVersions = [
          text.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
          text.replace(/'/g, '&#x27;'),
          text.replace(/\//g, '&#x2F;'),
        ];

        const foundEscaped = escapedVersions.find(v => bodyText.includes(v));
        if (foundEscaped) {
          issues.push({
            screen: screenName,
            severity: 'HIGH',
            type: 'CRITICAL_TEXT_ESCAPED',
            found: foundEscaped,
            expected: text,
            location
          });
        }
      }
    });

    // Take screenshot
    await page.screenshot({
      path: `test-screenshots/visual-test-${screenName}.png`,
      fullPage: true
    });

    // Report results
    if (issues.length === 0) {
      console.log(`   ✅ No issues detected`);
    } else {
      console.log(`   ❌ ${issues.length} issue(s) detected`);
      issues.forEach((issue, idx) => {
        console.log(`      ${idx + 1}. ${issue.severity}: ${issue.found} (expected: ${issue.expected})`);
      });
    }

    console.log(`   📸 Screenshot: test-screenshots/visual-test-${screenName}.png`);

  } catch (error) {
    console.log(`   ❌ Error testing ${screenName}: ${error.message}`);
    issues.push({
      screen: screenName,
      severity: 'HIGH',
      type: 'TEST_ERROR',
      found: error.message,
      expected: 'Successful page load'
    });
  } finally {
    await page.close();
  }

  return issues;
}

// Run the tests
testVisualRendering();
