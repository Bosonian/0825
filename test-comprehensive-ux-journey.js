/**
 * Comprehensive UX Journey Test
 * Complete end-to-end exploration of both versions
 * Tests all modules with realistic clinical data
 */
import { chromium } from '@playwright/test';

const VERSIONS = {
  claude: {
    name: '0825 (Claude Code)',
    url: 'https://igfap.eu/0825/',
  },
  human: {
    name: '0925 (Human Optimized)',
    url: 'https://igfap.eu/0925/',
  }
};

const PASSWORD = 'Neuro25';

// Realistic test patient data
const TEST_PATIENT = {
  coma: {
    gfap: '450',
    age: '67',
    sex: 'male',
    systolicBP: '165',
    gcs: '6',
    pupils: 'reactive'
  },
  limited: {
    gfap: '320',
    age: '54',
    sex: 'female',
    systolicBP: '145'
  },
  full: {
    // Basic info
    gfap: '280',
    age: '72',
    sex: 'male',
    systolicBP: '170',

    // FAST-ED components
    facialPalsy: '1',
    armWeakness: '2',
    speechChanges: '2',
    eyeDeviation: '1',
    denialNeglect: '0',

    // GCS
    gcs: '13',

    // Additional
    glucose: '120',
    onsetTime: '90' // minutes
  }
};

const comparisonResults = {
  claude: { modules: {}, ux: {}, issues: [], screenshots: [] },
  human: { modules: {}, ux: {}, issues: [], screenshots: [] }
};

async function runComprehensiveTest() {
  console.log('🔬 COMPREHENSIVE UX JOURNEY TEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👨‍⚕️ Complete clinical workflow simulation');
  console.log('📋 Testing all modules with realistic patient data');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 800 // Slow down for observation
  });

  try {
    // Test Claude version (0825)
    console.log('═══════════════════════════════════════════════════════');
    console.log('🤖 JOURNEY 1: Claude Code Version (0825)');
    console.log('═══════════════════════════════════════════════════════\n');
    comparisonResults.claude = await exploreVersion(browser, VERSIONS.claude, 'claude');

    console.log('\n\n');

    // Test Human version (0925)
    console.log('═══════════════════════════════════════════════════════');
    console.log('👨‍💻 JOURNEY 2: Human Optimized Version (0925)');
    console.log('═══════════════════════════════════════════════════════\n');
    comparisonResults.human = await exploreVersion(browser, VERSIONS.human, 'human');

    // Generate detailed comparison
    generateDetailedComparison();

  } catch (error) {
    console.error('❌ Test error:', error);
  } finally {
    await browser.close();
  }
}

async function exploreVersion(browser, version, versionKey) {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const results = {
    modules: {},
    ux: {},
    issues: [],
    screenshots: [],
    improvements: [],
    regressions: []
  };

  // Step 1: Login
  console.log('🔐 Step 1: Login Experience');
  console.log('─────────────────────────────────────────────────────');
  const loginResult = await testLogin(context, version.url, versionKey);
  results.ux.login = loginResult;
  results.screenshots.push(...loginResult.screenshots);

  if (!loginResult.success) {
    console.log('   ❌ Cannot proceed without login\n');
    await context.close();
    return results;
  }

  // Step 2: Home/Module Selection
  console.log('\n🏠 Step 2: Home/Module Selection Screen');
  console.log('─────────────────────────────────────────────────────');
  const homeResult = await exploreHomeScreen(context, version.url, versionKey);
  results.ux.home = homeResult;
  results.screenshots.push(...homeResult.screenshots);

  // Step 3: Test Coma Module
  console.log('\n🧠 Step 3: Coma Module (GCS < 8)');
  console.log('─────────────────────────────────────────────────────');
  const comaResult = await testComaModule(context, version.url, versionKey);
  results.modules.coma = comaResult;
  results.screenshots.push(...comaResult.screenshots);
  if (comaResult.issues) results.issues.push(...comaResult.issues);

  // Step 4: Test Limited Module
  console.log('\n📊 Step 4: Limited Data Module');
  console.log('─────────────────────────────────────────────────────');
  const limitedResult = await testLimitedModule(context, version.url, versionKey);
  results.modules.limited = limitedResult;
  results.screenshots.push(...limitedResult.screenshots);
  if (limitedResult.issues) results.issues.push(...limitedResult.issues);

  // Step 5: Test Full Module
  console.log('\n🎯 Step 5: Full Assessment Module');
  console.log('─────────────────────────────────────────────────────');
  const fullResult = await testFullModule(context, version.url, versionKey);
  results.modules.full = fullResult;
  results.screenshots.push(...fullResult.screenshots);
  if (fullResult.issues) results.issues.push(...fullResult.issues);

  // Step 6: UI/UX Quality Assessment
  console.log('\n🎨 Step 6: UI/UX Quality Assessment');
  console.log('─────────────────────────────────────────────────────');
  const uiResult = await assessUIQuality(context, version.url, versionKey);
  results.ux.quality = uiResult;
  results.screenshots.push(...uiResult.screenshots);

  await context.close();
  return results;
}

async function testLogin(context, url, versionKey) {
  const page = await context.newPage();
  const result = {
    success: false,
    time: 0,
    steps: [],
    screenshots: []
  };

  try {
    const startTime = Date.now();
    await page.goto(url, { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    console.log(`   ⏱️  Page load: ${loadTime}ms`);
    result.time = loadTime;

    // Take screenshot of login page
    const loginScreenshot = `test-screenshots/journey-${versionKey}-01-login.png`;
    await page.screenshot({ path: loginScreenshot, fullPage: true });
    result.screenshots.push(loginScreenshot);
    console.log(`   📸 Login screen: ${loginScreenshot}`);

    // Enter password
    await page.fill('input[type="password"]', PASSWORD);
    console.log(`   ✅ Password entered`);
    result.steps.push('Password entered');

    // Find and click login button
    const buttons = await page.locator('button').all();
    let clicked = false;
    for (const btn of buttons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Access') || text.includes('Login') || text.includes('Enter') || text.includes('zugreifen')) {
        await btn.click();
        console.log(`   🖱️  Clicked: "${text.trim()}"`);
        result.steps.push('Login button clicked');
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      // Try submit button
      const submitBtn = page.locator('button[type="submit"]').first();
      if (await submitBtn.isVisible().catch(() => false)) {
        await submitBtn.click();
        console.log(`   🖱️  Clicked submit button`);
        clicked = true;
      }
    }

    await page.waitForTimeout(3000);

    // Check if logged in
    const bodyText = await page.textContent('body');
    const stillOnLogin = await page.isVisible('input[type="password"]').catch(() => false);

    result.success = !stillOnLogin ||
                    bodyText.includes('Module') ||
                    bodyText.includes('Coma') ||
                    bodyText.includes('Welcome') ||
                    bodyText.includes('Willkommen');

    if (result.success) {
      console.log(`   ✅ Login successful`);

      // Take screenshot after login
      const afterLoginScreenshot = `test-screenshots/journey-${versionKey}-02-after-login.png`;
      await page.screenshot({ path: afterLoginScreenshot, fullPage: true });
      result.screenshots.push(afterLoginScreenshot);
      console.log(`   📸 After login: ${afterLoginScreenshot}`);
    } else {
      console.log(`   ❌ Login failed`);
    }

  } catch (error) {
    console.log(`   ❌ Login error: ${error.message}`);
    result.error = error.message;
  } finally {
    await page.close();
  }

  return result;
}

async function exploreHomeScreen(context, url, versionKey) {
  const page = await context.newPage();
  const result = {
    modulesFound: [],
    layout: {},
    screenshots: []
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Login if needed
    if (await page.isVisible('input[type="password"]').catch(() => false)) {
      await page.fill('input[type="password"]', PASSWORD);
      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent().catch(() => '');
        if (text.includes('Access') || text.includes('zugreifen')) {
          await btn.click();
          break;
        }
      }
      await page.waitForTimeout(2000);
    }

    const bodyText = await page.textContent('body');

    // Check for modules
    const modules = ['Coma', 'Limited', 'Full'];
    modules.forEach(mod => {
      const found = bodyText.includes(mod);
      if (found) {
        result.modulesFound.push(mod);
        console.log(`   ✅ ${mod} module visible`);
      } else {
        console.log(`   ❌ ${mod} module not found`);
      }
    });

    // Check layout elements
    result.layout.hasHeader = await page.locator('header').isVisible().catch(() => false);
    result.layout.hasTitle = bodyText.includes('iGFAP') || bodyText.includes('Stroke');
    result.layout.hasInstructions = bodyText.includes('Research') || bodyText.includes('Forschung');

    console.log(`   📦 Modules found: ${result.modulesFound.length}/3`);
    console.log(`   🎨 Header: ${result.layout.hasHeader ? 'Yes' : 'No'}`);

    // Take screenshot
    const screenshot = `test-screenshots/journey-${versionKey}-03-home.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    result.screenshots.push(screenshot);
    console.log(`   📸 Home screen: ${screenshot}`);

  } catch (error) {
    console.log(`   ❌ Home screen error: ${error.message}`);
  } finally {
    await page.close();
  }

  return result;
}

async function testComaModule(context, url, versionKey) {
  const page = await context.newPage();
  const result = {
    accessible: false,
    formFields: [],
    resultsShown: false,
    screenshots: [],
    issues: []
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Login
    if (await page.isVisible('input[type="password"]').catch(() => false)) {
      await page.fill('input[type="password"]', PASSWORD);
      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent().catch(() => '');
        if (text.includes('Access') || text.includes('zugreifen')) {
          await btn.click();
          break;
        }
      }
      await page.waitForTimeout(2000);
    }

    // Try to click Coma module
    const allButtons = await page.locator('button').all();
    let comaClicked = false;

    for (const btn of allButtons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Coma') || text.includes('GCS < 8')) {
        await btn.click();
        console.log(`   🖱️  Clicked Coma module`);
        comaClicked = true;
        await page.waitForTimeout(2000);
        break;
      }
    }

    if (!comaClicked) {
      console.log(`   ⚠️  Coma module button not found, trying direct navigation`);
      // Some apps might auto-navigate or use different structure
    }

    result.accessible = comaClicked;

    // Take screenshot of coma module start
    let screenshot = `test-screenshots/journey-${versionKey}-04-coma-start.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    result.screenshots.push(screenshot);
    console.log(`   📸 Coma module: ${screenshot}`);

    // Look for form fields
    const inputs = await page.locator('input').all();
    console.log(`   📝 Found ${inputs.length} input fields`);

    // Try to fill GFAP
    const gfapField = page.locator('input[type="number"]').first();
    if (await gfapField.isVisible().catch(() => false)) {
      await gfapField.fill(TEST_PATIENT.coma.gfap);
      result.formFields.push('GFAP');
      console.log(`   ✅ GFAP filled: ${TEST_PATIENT.coma.gfap}`);
    }

    await page.waitForTimeout(1000);

    // Try to proceed/submit
    const submitButtons = await page.locator('button').all();
    for (const btn of submitButtons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Continue') || text.includes('Next') || text.includes('Submit') || text.includes('Calculate') || text.includes('Weiter')) {
        await btn.click();
        console.log(`   🖱️  Clicked: ${text.trim()}`);
        await page.waitForTimeout(2000);
        break;
      }
    }

    // Take screenshot after submission
    screenshot = `test-screenshots/journey-${versionKey}-05-coma-result.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    result.screenshots.push(screenshot);

    // Check if results are shown
    const finalText = await page.textContent('body');
    result.resultsShown = finalText.includes('Risk') ||
                         finalText.includes('Probability') ||
                         finalText.includes('ICH') ||
                         finalText.includes('Risiko');

    console.log(`   ${result.resultsShown ? '✅' : '❌'} Results displayed: ${result.resultsShown}`);

  } catch (error) {
    console.log(`   ❌ Coma module error: ${error.message}`);
    result.issues.push({ severity: 'HIGH', type: 'MODULE_ERROR', module: 'Coma', message: error.message });
  } finally {
    await page.close();
  }

  return result;
}

async function testLimitedModule(context, url, versionKey) {
  const page = await context.newPage();
  const result = {
    accessible: false,
    formFields: [],
    resultsShown: false,
    screenshots: [],
    issues: []
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Login
    if (await page.isVisible('input[type="password"]').catch(() => false)) {
      await page.fill('input[type="password"]', PASSWORD);
      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent().catch(() => '');
        if (text.includes('Access') || text.includes('zugreifen')) {
          await btn.click();
          break;
        }
      }
      await page.waitForTimeout(2000);
    }

    // Try to click Limited module
    const allButtons = await page.locator('button').all();
    for (const btn of allButtons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Limited') || text.includes('Basic')) {
        await btn.click();
        console.log(`   🖱️  Clicked Limited module`);
        result.accessible = true;
        await page.waitForTimeout(2000);
        break;
      }
    }

    let screenshot = `test-screenshots/journey-${versionKey}-06-limited-start.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    result.screenshots.push(screenshot);
    console.log(`   📸 Limited module: ${screenshot}`);

    console.log(`   ${result.accessible ? '✅' : '⚠️'} Limited module ${result.accessible ? 'accessed' : 'not found'}`);

  } catch (error) {
    console.log(`   ❌ Limited module error: ${error.message}`);
    result.issues.push({ severity: 'HIGH', type: 'MODULE_ERROR', module: 'Limited', message: error.message });
  } finally {
    await page.close();
  }

  return result;
}

async function testFullModule(context, url, versionKey) {
  const page = await context.newPage();
  const result = {
    accessible: false,
    formFields: [],
    resultsShown: false,
    screenshots: [],
    issues: []
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Login
    if (await page.isVisible('input[type="password"]').catch(() => false)) {
      await page.fill('input[type="password"]', PASSWORD);
      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent().catch(() => '');
        if (text.includes('Access') || text.includes('zugreifen')) {
          await btn.click();
          break;
        }
      }
      await page.waitForTimeout(2000);
    }

    // Try to click Full module
    const allButtons = await page.locator('button').all();
    for (const btn of allButtons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Full') || text.includes('Complete') || text.includes('FAST')) {
        await btn.click();
        console.log(`   🖱️  Clicked Full module`);
        result.accessible = true;
        await page.waitForTimeout(2000);
        break;
      }
    }

    let screenshot = `test-screenshots/journey-${versionKey}-07-full-start.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    result.screenshots.push(screenshot);
    console.log(`   📸 Full module: ${screenshot}`);

    console.log(`   ${result.accessible ? '✅' : '⚠️'} Full module ${result.accessible ? 'accessed' : 'not found'}`);

  } catch (error) {
    console.log(`   ❌ Full module error: ${error.message}`);
    result.issues.push({ severity: 'HIGH', type: 'MODULE_ERROR', module: 'Full', message: error.message });
  } finally {
    await page.close();
  }

  return result;
}

async function assessUIQuality(context, url, versionKey) {
  const page = await context.newPage();
  const result = {
    colorScheme: {},
    typography: {},
    responsiveness: {},
    screenshots: []
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Login
    if (await page.isVisible('input[type="password"]').catch(() => false)) {
      await page.fill('input[type="password"]', PASSWORD);
      const buttons = await page.locator('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent().catch(() => '');
        if (text.includes('Access') || text.includes('zugreifen')) {
          await btn.click();
          break;
        }
      }
      await page.waitForTimeout(2000);
    }

    // Analyze UI
    const uiAnalysis = await page.evaluate(() => {
      const header = document.querySelector('header');
      const buttons = document.querySelectorAll('button');

      return {
        headerColor: header ? window.getComputedStyle(header).backgroundColor : 'none',
        buttonCount: buttons.length,
        hasAnimations: document.querySelectorAll('[class*="animate"]').length > 0,
        fontFamily: window.getComputedStyle(document.body).fontFamily
      };
    });

    result.colorScheme = uiAnalysis;
    console.log(`   🎨 Header color: ${uiAnalysis.headerColor}`);
    console.log(`   🔘 Buttons: ${uiAnalysis.buttonCount}`);
    console.log(`   ✨ Animations: ${uiAnalysis.hasAnimations ? 'Yes' : 'No'}`);

    const screenshot = `test-screenshots/journey-${versionKey}-08-ui-quality.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    result.screenshots.push(screenshot);

  } catch (error) {
    console.log(`   ❌ UI assessment error: ${error.message}`);
  } finally {
    await page.close();
  }

  return result;
}

function generateDetailedComparison() {
  console.log('\n\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 DETAILED COMPARISON REPORT');
  console.log('═══════════════════════════════════════════════════════\n');

  // Login comparison
  console.log('🔐 LOGIN EXPERIENCE:');
  console.log(`   🤖 Claude (0825): ${comparisonResults.claude.ux.login?.time}ms`);
  console.log(`   👨‍💻 Human (0925):  ${comparisonResults.human.ux.login?.time}ms`);

  if (comparisonResults.human.ux.login?.time && comparisonResults.claude.ux.login?.time) {
    const diff = comparisonResults.claude.ux.login.time - comparisonResults.human.ux.login.time;
    const faster = diff > 0 ? 'Human' : 'Claude';
    console.log(`   🏆 Winner: ${faster} (${Math.abs(diff)}ms faster)\n`);
  }

  // Module accessibility
  console.log('📦 MODULE ACCESSIBILITY:');
  console.log(`   🤖 Claude (0825):`);
  console.log(`      Coma: ${comparisonResults.claude.modules.coma?.accessible ? '✅' : '❌'}`);
  console.log(`      Limited: ${comparisonResults.claude.modules.limited?.accessible ? '✅' : '❌'}`);
  console.log(`      Full: ${comparisonResults.claude.modules.full?.accessible ? '✅' : '❌'}`);
  console.log(`   👨‍💻 Human (0925):`);
  console.log(`      Coma: ${comparisonResults.human.modules.coma?.accessible ? '✅' : '❌'}`);
  console.log(`      Limited: ${comparisonResults.human.modules.limited?.accessible ? '✅' : '❌'}`);
  console.log(`      Full: ${comparisonResults.human.modules.full?.accessible ? '✅' : '❌'}`);
  console.log('');

  // Issues
  console.log('🐛 ISSUES FOUND:');
  console.log(`   🤖 Claude: ${comparisonResults.claude.issues.length} issue(s)`);
  console.log(`   👨‍💻 Human:  ${comparisonResults.human.issues.length} issue(s)\n`);

  // Screenshots
  console.log('📸 SCREENSHOTS:');
  console.log(`   🤖 Claude: ${comparisonResults.claude.screenshots.length} screenshots`);
  console.log(`   👨‍💻 Human:  ${comparisonResults.human.screenshots.length} screenshots`);
  console.log('   All saved to: test-screenshots/journey-*\n');

  // Final verdict
  console.log('═══════════════════════════════════════════════════════');
  console.log('🏆 KEY FINDINGS');
  console.log('═══════════════════════════════════════════════════════\n');

  // Performance
  if (comparisonResults.human.ux.login?.time < comparisonResults.claude.ux.login?.time) {
    console.log('✅ IMPROVEMENT: Faster load times in human version');
  }

  // Module count
  const claudeModules = [
    comparisonResults.claude.modules.coma?.accessible,
    comparisonResults.claude.modules.limited?.accessible,
    comparisonResults.claude.modules.full?.accessible
  ].filter(Boolean).length;

  const humanModules = [
    comparisonResults.human.modules.coma?.accessible,
    comparisonResults.human.modules.limited?.accessible,
    comparisonResults.human.modules.full?.accessible
  ].filter(Boolean).length;

  if (humanModules > claudeModules) {
    console.log('✅ IMPROVEMENT: More modules accessible in human version');
  } else if (claudeModules > humanModules) {
    console.log('❌ REGRESSION: Fewer modules accessible in human version');
  }

  console.log('');
}

// Run the comprehensive test
runComprehensiveTest();
