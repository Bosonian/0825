/**
 * Exhaustive Clinical Workflow Test
 * Complete end-to-end testing with full form completion
 * Tests every input field, every navigation step, every results screen
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

// Comprehensive test patient data
const TEST_CASES = {
  comaModule: {
    name: 'Coma Module (GCS < 8)',
    patient: {
      gfap: '450',
      age: '67',
      sex: 'male',
      systolicBP: '165',
      gcs: '6',
      pupils: 'reactive',
      glucose: '110'
    }
  },
  limitedModule: {
    name: 'Limited Data Module',
    patient: {
      gfap: '320',
      age: '54',
      sex: 'female',
      systolicBP: '145',
      glucose: '95'
    }
  },
  fullModule: {
    name: 'Full Assessment Module',
    patient: {
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

      gcs: '13',
      glucose: '120',
      onsetTime: '90'
    }
  }
};

const comparison = {
  claude: { workflows: {}, performance: {}, ux: {} },
  human: { workflows: {}, performance: {}, ux: {} }
};

async function runExhaustiveTest() {
  console.log('🔬 EXHAUSTIVE CLINICAL WORKFLOW TEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👨‍⚕️ Complete clinical assessment simulation');
  console.log('📝 All forms filled, all steps navigated, all results analyzed');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  try {
    // Test Claude version
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🤖 COMPLETE WORKFLOW TESTING: Claude Code (0825)');
    console.log('═══════════════════════════════════════════════════════════════\n');
    comparison.claude = await testCompleteWorkflow(browser, VERSIONS.claude, 'claude');

    console.log('\n\n');

    // Test Human version
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('👨‍💻 COMPLETE WORKFLOW TESTING: Human Optimized (0925)');
    console.log('═══════════════════════════════════════════════════════════════\n');
    comparison.human = await testCompleteWorkflow(browser, VERSIONS.human, 'human');

    // Generate comprehensive comparison
    generateComprehensiveComparison();

  } catch (error) {
    console.error('❌ Test error:', error);
  } finally {
    await browser.close();
  }
}

async function testCompleteWorkflow(browser, version, versionKey) {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const results = {
    workflows: {},
    performance: {},
    ux: {},
    screenshots: []
  };

  const page = await context.newPage();

  // Login
  console.log('🔐 STEP 1: Initial Login');
  console.log('─────────────────────────────────────────────────────────────');
  const loginStart = Date.now();
  await page.goto(version.url, { waitUntil: 'networkidle' });
  results.performance.initialLoad = Date.now() - loginStart;
  console.log(`   ⏱️  Page load: ${results.performance.initialLoad}ms`);

  await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-00-login.png`, fullPage: true });
  results.screenshots.push(`exhaustive-${versionKey}-00-login.png`);

  await page.fill('input[type="password"]', PASSWORD);
  const buttons = await page.locator('button').all();
  for (const btn of buttons) {
    const text = await btn.textContent().catch(() => '');
    if (text.includes('Access') || text.includes('zugreifen')) {
      await btn.click();
      console.log(`   ✅ Clicked: "${text.trim().substring(0, 20)}..."`);
      break;
    }
  }
  await page.waitForTimeout(2000);

  await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-01-home.png`, fullPage: true });
  results.screenshots.push(`exhaustive-${versionKey}-01-home.png`);
  console.log(`   📸 Home screen captured\n`);

  // Test Coma Module
  console.log('🧠 WORKFLOW 1: Coma Module (Complete Assessment)');
  console.log('─────────────────────────────────────────────────────────────');
  results.workflows.coma = await testComaModuleComplete(page, versionKey);

  // Return to home for next module
  await page.goto(version.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Test Limited Module
  console.log('\n📊 WORKFLOW 2: Limited Data Module (Complete Assessment)');
  console.log('─────────────────────────────────────────────────────────────');
  results.workflows.limited = await testLimitedModuleComplete(page, versionKey);

  // Return to home for next module
  await page.goto(version.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Test Full Module
  console.log('\n🎯 WORKFLOW 3: Full Assessment Module (Complete Workflow)');
  console.log('─────────────────────────────────────────────────────────────');
  results.workflows.full = await testFullModuleComplete(page, versionKey);

  await page.close();
  await context.close();
  return results;
}

async function testComaModuleComplete(page, versionKey) {
  const workflow = {
    accessible: false,
    screens: [],
    fieldsCompleted: 0,
    resultsReached: false,
    resultsData: {},
    uxIssues: [],
    screenshots: []
  };

  try {
    // Navigate to Coma module
    const buttons = await page.locator('button').all();
    for (const btn of buttons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Coma') || text.includes('GCS < 8') || text.includes('GCS &lt; 8')) {
        await btn.click();
        console.log(`   ✅ Navigated to Coma module`);
        workflow.accessible = true;
        await page.waitForTimeout(1500);
        break;
      }
    }

    if (!workflow.accessible) {
      console.log(`   ⚠️  Could not find Coma module button`);
      return workflow;
    }

    workflow.screens.push('module-selection');

    // Screen 1: Triage questions (if present)
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-coma-01-start.png`, fullPage: true });
    workflow.screenshots.push(`coma-01-start.png`);

    let bodyText = await page.textContent('body');

    // Check if there's a triage question about GCS
    if (bodyText.includes('GCS') && bodyText.includes('9')) {
      console.log(`   📋 Triage screen detected`);
      workflow.screens.push('triage');

      // Look for "Yes" button (GCS < 9 = Yes for coma)
      const allButtons = await page.locator('button').all();
      for (const btn of allButtons) {
        const text = await btn.textContent().catch(() => '');
        if (text.toLowerCase().includes('yes') || text.toLowerCase().includes('ja')) {
          await btn.click();
          console.log(`   ✅ Selected: Yes (GCS < 9)`);
          await page.waitForTimeout(1500);
          break;
        }
      }
    }

    // Screen 2: Data input form
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-coma-02-form.png`, fullPage: true });
    workflow.screenshots.push(`coma-02-form.png`);
    workflow.screens.push('data-input');

    console.log(`   📝 Filling patient data...`);

    // Fill GFAP
    const gfapInput = page.locator('input[type="number"]').first();
    if (await gfapInput.isVisible().catch(() => false)) {
      await gfapInput.fill(TEST_CASES.comaModule.patient.gfap);
      console.log(`   ✅ GFAP: ${TEST_CASES.comaModule.patient.gfap} pg/mL`);
      workflow.fieldsCompleted++;
    }

    // Fill age
    const ageInput = page.locator('input[type="number"]').nth(1);
    if (await ageInput.isVisible().catch(() => false)) {
      await ageInput.fill(TEST_CASES.comaModule.patient.age);
      console.log(`   ✅ Age: ${TEST_CASES.comaModule.patient.age} years`);
      workflow.fieldsCompleted++;
    }

    // Fill systolic BP
    const bpInput = page.locator('input[type="number"]').nth(2);
    if (await bpInput.isVisible().catch(() => false)) {
      await bpInput.fill(TEST_CASES.comaModule.patient.systolicBP);
      console.log(`   ✅ Systolic BP: ${TEST_CASES.comaModule.patient.systolicBP} mmHg`);
      workflow.fieldsCompleted++;
    }

    // Select sex (radio buttons)
    const maleRadio = page.locator('input[type="radio"][value="male"]').first();
    if (await maleRadio.isVisible().catch(() => false)) {
      await maleRadio.click();
      console.log(`   ✅ Sex: Male`);
      workflow.fieldsCompleted++;
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-coma-03-filled.png`, fullPage: true });
    workflow.screenshots.push(`coma-03-filled.png`);

    // Submit/Calculate
    const submitButtons = await page.locator('button').all();
    for (const btn of submitButtons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Calculate') || text.includes('Submit') || text.includes('Analyze') ||
          text.includes('Berechnen') || text.includes('Continue') || text.includes('Weiter')) {
        await btn.click();
        console.log(`   🖱️  Clicked: "${text.trim().substring(0, 20)}..."`);
        await page.waitForTimeout(3000);
        break;
      }
    }

    // Screen 3: Results
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-coma-04-results.png`, fullPage: true });
    workflow.screenshots.push(`coma-04-results.png`);
    workflow.screens.push('results');

    bodyText = await page.textContent('body');

    // Check if results are displayed
    workflow.resultsReached = bodyText.includes('Risk') ||
                             bodyText.includes('Probability') ||
                             bodyText.includes('ICH') ||
                             bodyText.includes('Risiko') ||
                             bodyText.includes('%');

    if (workflow.resultsReached) {
      console.log(`   ✅ Results screen reached`);

      // Try to extract result values
      const percentMatches = bodyText.match(/(\d+\.?\d*)\s*%/g);
      if (percentMatches) {
        workflow.resultsData.percentages = percentMatches;
        console.log(`   📊 Results found: ${percentMatches.join(', ')}`);
      }

      // Check for risk level text
      if (bodyText.includes('High') || bodyText.includes('Very High') || bodyText.includes('Hoch')) {
        console.log(`   ⚠️  High risk indicated`);
        workflow.resultsData.riskLevel = 'high';
      } else if (bodyText.includes('Low') || bodyText.includes('Niedrig')) {
        console.log(`   ✅ Low risk indicated`);
        workflow.resultsData.riskLevel = 'low';
      }

      // Check for visualization elements
      const hasSVG = await page.locator('svg').count();
      const hasCanvas = await page.locator('canvas').count();
      workflow.resultsData.visualizations = {
        svg: hasSVG,
        canvas: hasCanvas
      };
      console.log(`   🎨 Visualizations: ${hasSVG} SVG, ${hasCanvas} Canvas`);

    } else {
      console.log(`   ❌ Results screen not detected`);
      workflow.uxIssues.push('Results screen not reached or not recognized');
    }

    console.log(`   ✅ Coma workflow complete: ${workflow.screens.length} screens, ${workflow.fieldsCompleted} fields filled`);

  } catch (error) {
    console.log(`   ❌ Coma workflow error: ${error.message}`);
    workflow.uxIssues.push(error.message);
  }

  return workflow;
}

async function testLimitedModuleComplete(page, versionKey) {
  const workflow = {
    accessible: false,
    screens: [],
    fieldsCompleted: 0,
    resultsReached: false,
    resultsData: {},
    uxIssues: [],
    screenshots: []
  };

  try {
    // Navigate to Limited module
    const buttons = await page.locator('button').all();
    for (const btn of buttons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Limited') || text.includes('Basic') || text.includes('Begrenzt')) {
        await btn.click();
        console.log(`   ✅ Navigated to Limited module`);
        workflow.accessible = true;
        await page.waitForTimeout(1500);
        break;
      }
    }

    if (!workflow.accessible) {
      console.log(`   ⚠️  Limited module not accessible (may not be visible)`);
      return workflow;
    }

    workflow.screens.push('module-selection');

    // Triage
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-limited-01-start.png`, fullPage: true });
    workflow.screenshots.push(`limited-01-start.png`);

    let bodyText = await page.textContent('body');
    if (bodyText.includes('GCS') && (bodyText.includes('9') || bodyText.includes('12'))) {
      workflow.screens.push('triage');
      // Select "No" for GCS < 9
      const allButtons = await page.locator('button').all();
      for (const btn of allButtons) {
        const text = await btn.textContent().catch(() => '');
        if (text.toLowerCase().includes('no') || text.toLowerCase().includes('nein')) {
          await btn.click();
          console.log(`   ✅ Selected: No (GCS >= 9)`);
          await page.waitForTimeout(1500);
          break;
        }
      }
    }

    // Data input
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-limited-02-form.png`, fullPage: true });
    workflow.screenshots.push(`limited-02-form.png`);
    workflow.screens.push('data-input');

    console.log(`   📝 Filling patient data...`);

    // Fill GFAP
    const inputs = await page.locator('input[type="number"]').all();
    if (inputs.length > 0) {
      await inputs[0].fill(TEST_CASES.limitedModule.patient.gfap);
      console.log(`   ✅ GFAP: ${TEST_CASES.limitedModule.patient.gfap} pg/mL`);
      workflow.fieldsCompleted++;
    }

    // Fill age
    if (inputs.length > 1) {
      await inputs[1].fill(TEST_CASES.limitedModule.patient.age);
      console.log(`   ✅ Age: ${TEST_CASES.limitedModule.patient.age} years`);
      workflow.fieldsCompleted++;
    }

    // Fill BP
    if (inputs.length > 2) {
      await inputs[2].fill(TEST_CASES.limitedModule.patient.systolicBP);
      console.log(`   ✅ Systolic BP: ${TEST_CASES.limitedModule.patient.systolicBP} mmHg`);
      workflow.fieldsCompleted++;
    }

    // Select sex
    const femaleRadio = page.locator('input[type="radio"][value="female"]').first();
    if (await femaleRadio.isVisible().catch(() => false)) {
      await femaleRadio.click();
      console.log(`   ✅ Sex: Female`);
      workflow.fieldsCompleted++;
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-limited-03-filled.png`, fullPage: true });
    workflow.screenshots.push(`limited-03-filled.png`);

    // Submit
    const submitButtons = await page.locator('button').all();
    for (const btn of submitButtons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Calculate') || text.includes('Submit') || text.includes('Continue')) {
        await btn.click();
        console.log(`   🖱️  Submitted form`);
        await page.waitForTimeout(3000);
        break;
      }
    }

    // Results
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-limited-04-results.png`, fullPage: true });
    workflow.screenshots.push(`limited-04-results.png`);
    workflow.screens.push('results');

    bodyText = await page.textContent('body');
    workflow.resultsReached = bodyText.includes('Risk') || bodyText.includes('Probability') || bodyText.includes('%');

    if (workflow.resultsReached) {
      console.log(`   ✅ Results displayed`);
      const percentMatches = bodyText.match(/(\d+\.?\d*)\s*%/g);
      if (percentMatches) {
        workflow.resultsData.percentages = percentMatches;
        console.log(`   📊 Results: ${percentMatches.join(', ')}`);
      }
    }

    console.log(`   ✅ Limited workflow: ${workflow.screens.length} screens, ${workflow.fieldsCompleted} fields`);

  } catch (error) {
    console.log(`   ❌ Limited workflow error: ${error.message}`);
    workflow.uxIssues.push(error.message);
  }

  return workflow;
}

async function testFullModuleComplete(page, versionKey) {
  const workflow = {
    accessible: false,
    screens: [],
    fieldsCompleted: 0,
    resultsReached: false,
    resultsData: {},
    uxIssues: [],
    screenshots: []
  };

  try {
    // Navigate to Full module
    const buttons = await page.locator('button').all();
    for (const btn of buttons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Full') || text.includes('Complete') || text.includes('FAST')) {
        await btn.click();
        console.log(`   ✅ Navigated to Full module`);
        workflow.accessible = true;
        await page.waitForTimeout(1500);
        break;
      }
    }

    if (!workflow.accessible) {
      console.log(`   ⚠️  Full module not accessible (may not be visible)`);
      return workflow;
    }

    workflow.screens.push('module-selection');

    // Triage
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-full-01-start.png`, fullPage: true });
    workflow.screenshots.push(`full-01-start.png`);

    let bodyText = await page.textContent('body');
    if (bodyText.includes('GCS') && bodyText.includes('9')) {
      workflow.screens.push('triage');
      const allButtons = await page.locator('button').all();
      for (const btn of allButtons) {
        const text = await btn.textContent().catch(() => '');
        if (text.toLowerCase().includes('no') || text.toLowerCase().includes('nein')) {
          await btn.click();
          console.log(`   ✅ Triage: No (GCS >= 9)`);
          await page.waitForTimeout(1500);
          break;
        }
      }
    }

    // Full assessment form (may have multiple screens)
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-full-02-form.png`, fullPage: true });
    workflow.screenshots.push(`full-02-form.png`);
    workflow.screens.push('data-input');

    console.log(`   📝 Filling comprehensive assessment...`);

    // This module typically has many fields - fill as many as we can find
    const inputs = await page.locator('input[type="number"]').all();
    const fieldData = [
      TEST_CASES.fullModule.patient.gfap,
      TEST_CASES.fullModule.patient.age,
      TEST_CASES.fullModule.patient.systolicBP,
      TEST_CASES.fullModule.patient.glucose,
      TEST_CASES.fullModule.patient.onsetTime,
      TEST_CASES.fullModule.patient.facialPalsy,
      TEST_CASES.fullModule.patient.armWeakness,
      TEST_CASES.fullModule.patient.speechChanges,
      TEST_CASES.fullModule.patient.eyeDeviation,
      TEST_CASES.fullModule.patient.denialNeglect,
      TEST_CASES.fullModule.patient.gcs
    ];

    for (let i = 0; i < Math.min(inputs.length, fieldData.length); i++) {
      if (fieldData[i]) {
        await inputs[i].fill(fieldData[i]);
        workflow.fieldsCompleted++;
      }
    }

    console.log(`   ✅ Filled ${workflow.fieldsCompleted} fields`);

    // Select sex
    const maleRadio = page.locator('input[type="radio"][value="male"]').first();
    if (await maleRadio.isVisible().catch(() => false)) {
      await maleRadio.click();
      workflow.fieldsCompleted++;
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-full-03-filled.png`, fullPage: true });
    workflow.screenshots.push(`full-03-filled.png`);

    // Submit
    const submitButtons = await page.locator('button').all();
    for (const btn of submitButtons) {
      const text = await btn.textContent().catch(() => '');
      if (text.includes('Calculate') || text.includes('Submit') || text.includes('Analyze') || text.includes('Continue')) {
        await btn.click();
        console.log(`   🖱️  Submitted comprehensive assessment`);
        await page.waitForTimeout(3000);
        break;
      }
    }

    // Results
    await page.screenshot({ path: `test-screenshots/exhaustive-${versionKey}-full-04-results.png`, fullPage: true });
    workflow.screenshots.push(`full-04-results.png`);
    workflow.screens.push('results');

    bodyText = await page.textContent('body');
    workflow.resultsReached = bodyText.includes('Risk') ||
                             bodyText.includes('Probability') ||
                             bodyText.includes('ICH') ||
                             bodyText.includes('LVO') ||
                             bodyText.includes('%');

    if (workflow.resultsReached) {
      console.log(`   ✅ Results displayed`);

      const percentMatches = bodyText.match(/(\d+\.?\d*)\s*%/g);
      if (percentMatches) {
        workflow.resultsData.percentages = percentMatches;
        console.log(`   📊 Results: ${percentMatches.join(', ')}`);
      }

      // Check for tachometer/speedometer (unique to full module)
      const hasTachometer = bodyText.includes('LVO') && bodyText.includes('ICH');
      if (hasTachometer) {
        console.log(`   🎯 Tachometer/Decision support detected`);
        workflow.resultsData.hasTachometer = true;
      }

      // Check for visualizations
      const svgCount = await page.locator('svg').count();
      const canvasCount = await page.locator('canvas').count();
      workflow.resultsData.visualizations = { svg: svgCount, canvas: canvasCount };
      console.log(`   🎨 Visualizations: ${svgCount} SVG, ${canvasCount} Canvas`);
    }

    console.log(`   ✅ Full workflow: ${workflow.screens.length} screens, ${workflow.fieldsCompleted} fields`);

  } catch (error) {
    console.log(`   ❌ Full workflow error: ${error.message}`);
    workflow.uxIssues.push(error.message);
  }

  return workflow;
}

function generateComprehensiveComparison() {
  console.log('\n\n');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('📊 COMPREHENSIVE WORKFLOW COMPARISON');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Performance
  console.log('⚡ PERFORMANCE:');
  console.log(`   🤖 Claude (0825): ${comparison.claude.performance.initialLoad}ms initial load`);
  console.log(`   👨‍💻 Human (0925):  ${comparison.human.performance.initialLoad}ms initial load`);
  const perfDiff = comparison.claude.performance.initialLoad - comparison.human.performance.initialLoad;
  const perfWinner = perfDiff > 0 ? 'Human' : 'Claude';
  const perfPercent = Math.round(Math.abs(perfDiff) / Math.max(comparison.claude.performance.initialLoad, comparison.human.performance.initialLoad) * 100);
  console.log(`   🏆 Winner: ${perfWinner} (${Math.abs(perfDiff)}ms / ${perfPercent}% faster)\n`);

  // Coma Module
  console.log('🧠 COMA MODULE COMPARISON:');
  const claudeComa = comparison.claude.workflows.coma || {};
  const humanComa = comparison.human.workflows.coma || {};

  console.log('   🤖 Claude (0825):');
  console.log(`      Accessible: ${claudeComa.accessible ? '✅' : '❌'}`);
  console.log(`      Screens: ${claudeComa.screens?.length || 0}`);
  console.log(`      Fields completed: ${claudeComa.fieldsCompleted || 0}`);
  console.log(`      Results reached: ${claudeComa.resultsReached ? '✅' : '❌'}`);
  if (claudeComa.resultsData?.percentages) {
    console.log(`      Results: ${claudeComa.resultsData.percentages.join(', ')}`);
  }
  if (claudeComa.resultsData?.visualizations) {
    console.log(`      Visualizations: ${claudeComa.resultsData.visualizations.svg} SVG, ${claudeComa.resultsData.visualizations.canvas} Canvas`);
  }

  console.log('   👨‍💻 Human (0925):');
  console.log(`      Accessible: ${humanComa.accessible ? '✅' : '❌'}`);
  console.log(`      Screens: ${humanComa.screens?.length || 0}`);
  console.log(`      Fields completed: ${humanComa.fieldsCompleted || 0}`);
  console.log(`      Results reached: ${humanComa.resultsReached ? '✅' : '❌'}`);
  if (humanComa.resultsData?.percentages) {
    console.log(`      Results: ${humanComa.resultsData.percentages.join(', ')}`);
  }
  if (humanComa.resultsData?.visualizations) {
    console.log(`      Visualizations: ${humanComa.resultsData.visualizations.svg} SVG, ${humanComa.resultsData.visualizations.canvas} Canvas`);
  }
  console.log('');

  // Limited Module
  console.log('📊 LIMITED MODULE COMPARISON:');
  const claudeLimited = comparison.claude.workflows.limited || {};
  const humanLimited = comparison.human.workflows.limited || {};

  console.log('   🤖 Claude (0825):');
  console.log(`      Accessible: ${claudeLimited.accessible ? '✅' : '⚠️ Not found'}`);
  console.log(`      Fields completed: ${claudeLimited.fieldsCompleted || 0}`);
  console.log(`      Results reached: ${claudeLimited.resultsReached ? '✅' : '❌'}`);

  console.log('   👨‍💻 Human (0925):');
  console.log(`      Accessible: ${humanLimited.accessible ? '✅' : '⚠️ Not found'}`);
  console.log(`      Fields completed: ${humanLimited.fieldsCompleted || 0}`);
  console.log(`      Results reached: ${humanLimited.resultsReached ? '✅' : '❌'}`);
  console.log('');

  // Full Module
  console.log('🎯 FULL MODULE COMPARISON:');
  const claudeFull = comparison.claude.workflows.full || {};
  const humanFull = comparison.human.workflows.full || {};

  console.log('   🤖 Claude (0825):');
  console.log(`      Accessible: ${claudeFull.accessible ? '✅' : '⚠️ Not found'}`);
  console.log(`      Fields completed: ${claudeFull.fieldsCompleted || 0}`);
  console.log(`      Results reached: ${claudeFull.resultsReached ? '✅' : '❌'}`);
  if (claudeFull.resultsData?.hasTachometer) {
    console.log(`      Tachometer: ✅`);
  }

  console.log('   👨‍💻 Human (0925):');
  console.log(`      Accessible: ${humanFull.accessible ? '✅' : '⚠️ Not found'}`);
  console.log(`      Fields completed: ${humanFull.fieldsCompleted || 0}`);
  console.log(`      Results reached: ${humanFull.resultsReached ? '✅' : '❌'}`);
  if (humanFull.resultsData?.hasTachometer) {
    console.log(`      Tachometer: ✅`);
  }
  console.log('');

  // Screenshots
  console.log('📸 SCREENSHOTS CAPTURED:');
  console.log(`   🤖 Claude: ${comparison.claude.screenshots?.length || 0} screenshots`);
  console.log(`   👨‍💻 Human:  ${comparison.human.screenshots?.length || 0} screenshots`);
  console.log('   📂 Location: test-screenshots/exhaustive-*\n');

  // Summary
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🏆 KEY FINDINGS');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const findings = [];

  // Performance
  if (perfDiff > 500) {
    findings.push(`✅ IMPROVEMENT: ${perfPercent}% faster load time (${Math.abs(perfDiff)}ms)`);
  }

  // Feature parity
  const claudeModuleCount = [claudeComa.accessible, claudeLimited.accessible, claudeFull.accessible].filter(Boolean).length;
  const humanModuleCount = [humanComa.accessible, humanLimited.accessible, humanFull.accessible].filter(Boolean).length;

  if (humanModuleCount > claudeModuleCount) {
    findings.push(`✅ IMPROVEMENT: More modules accessible (${humanModuleCount} vs ${claudeModuleCount})`);
  } else if (humanModuleCount < claudeModuleCount) {
    findings.push(`❌ REGRESSION: Fewer modules accessible (${humanModuleCount} vs ${claudeModuleCount})`);
  } else {
    findings.push(`🤝 PARITY: Same module accessibility (${humanModuleCount} modules)`);
  }

  // Results quality
  if (humanComa.resultsReached && claudeComa.resultsReached) {
    findings.push(`✅ PARITY: Both versions show results correctly`);
  }

  findings.forEach(finding => console.log(finding));
  console.log('');
}

// Run the exhaustive test
runExhaustiveTest();
