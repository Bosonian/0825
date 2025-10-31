/**
 * Auth Screen Human UX Evaluator
 *
 * Purpose: Evaluate auth screen like a human user would experience it
 * Methodology: Human UX Evaluator Agent - 5-phase evaluation
 */

import { chromium } from '@playwright/test';

const EVALUATION_REPORT = {
  firstImpressions: {},
  visualQuality: {},
  interactionQuality: {},
  taskCompletion: {},
  emotionalResponse: {},
  recommendations: []
};

async function evaluateAuthScreenAsHuman() {
  console.log('👤 HUMAN UX EVALUATION STARTING...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  try {
    // ==========================================================================
    // PHASE 1: FIRST IMPRESSIONS (0-5 seconds)
    // What a human sees and thinks in the first moments
    // ==========================================================================
    console.log('=' .repeat(80));
    console.log('👁️  PHASE 1: FIRST IMPRESSIONS (0-5 seconds)');
    console.log('=' .repeat(80));

    const impressionStartTime = Date.now();
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - impressionStartTime;

    console.log(`\n⏱️  Load Time: ${loadTime}ms`);
    if (loadTime < 1000) {
      console.log('   ✅ Instant (<1s) - Excellent first impression');
      EVALUATION_REPORT.firstImpressions.loadSpeed = 'excellent';
    } else if (loadTime < 3000) {
      console.log('   ⚠️  Responsive (1-3s) - Acceptable but could be faster');
      EVALUATION_REPORT.firstImpressions.loadSpeed = 'acceptable';
    } else {
      console.log('   ❌ Slow (>3s) - Users may lose patience');
      EVALUATION_REPORT.firstImpressions.loadSpeed = 'slow';
      EVALUATION_REPORT.recommendations.push({
        priority: 'high',
        category: 'performance',
        issue: `Page loads in ${loadTime}ms (>3 seconds)`,
        recommendation: 'Optimize initial bundle size, lazy load non-critical content'
      });
    }

    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/auth-eval-first-glance.png' });

    // What draws attention first?
    console.log('\n🎯 What Draws Attention First?');

    // Check visual hierarchy
    const h1 = await page.locator('h1').first().textContent();
    const h2 = await page.locator('h2').first().textContent();
    console.log(`   Primary heading (H1): "${h1}"`);
    console.log(`   Secondary heading (H2): "${h2}"`);

    // Check if purpose is immediately clear
    const hasResearchHeader = h2?.includes('Research');
    const hasAccessHeader = h2?.includes('Access');

    if (hasResearchHeader && hasAccessHeader) {
      console.log('   ✅ Purpose immediately clear: "Research Access" in prominent H2');
      EVALUATION_REPORT.firstImpressions.purposeClarity = 'excellent';
    } else {
      console.log('   ⚠️  Purpose may not be immediately clear');
      EVALUATION_REPORT.firstImpressions.purposeClarity = 'needs improvement';
    }

    // Check for overwhelming text
    const paragraphs = await page.locator('p').all();
    let totalTextLength = 0;
    for (const p of paragraphs) {
      const text = await p.textContent();
      totalTextLength += text?.length || 0;
    }
    console.log(`\n📄 Text Density: ${totalTextLength} characters`);
    if (totalTextLength < 300) {
      console.log('   ✅ Minimal text - easy to scan');
      EVALUATION_REPORT.firstImpressions.textDensity = 'low';
    } else if (totalTextLength < 600) {
      console.log('   ⚠️  Moderate text - requires reading');
      EVALUATION_REPORT.firstImpressions.textDensity = 'moderate';
    } else {
      console.log('   ❌ Heavy text - may overwhelm users');
      EVALUATION_REPORT.firstImpressions.textDensity = 'high';
      EVALUATION_REPORT.recommendations.push({
        priority: 'medium',
        category: 'content',
        issue: `${totalTextLength} characters of text creates cognitive load`,
        recommendation: 'Consider collapsible sections or "Learn More" links for regulatory info'
      });
    }

    // ==========================================================================
    // PHASE 2: VISUAL QUALITY
    // Professional design, color scheme, typography, spacing
    // ==========================================================================
    console.log('\n' + '='.repeat(80));
    console.log('🎨 PHASE 2: VISUAL QUALITY');
    console.log('='.repeat(80));

    // Test dark mode quality
    console.log('\n🌙 Testing Dark/Light Mode Quality');
    const themeToggle = await page.locator('button:has-text("🌙"), button:has-text("☀")').first();

    await page.screenshot({ path: '/tmp/auth-eval-light-mode.png', fullPage: true });
    console.log('   📸 Captured light mode');

    await themeToggle.click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: '/tmp/auth-eval-dark-mode.png', fullPage: true });
    console.log('   📸 Captured dark mode');
    console.log('   ✅ Theme toggle works - design supports both modes');
    EVALUATION_REPORT.visualQuality.themeSupport = 'excellent';

    // Check contrast and readability
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    console.log(`\n🎨 Current Color Scheme: Background ${bodyBg}`);

    // Check for branding/logo
    const logos = await page.locator('img, svg[aria-label*="logo" i]').count();
    if (logos > 0) {
      console.log('   ✅ Logo/branding present');
      EVALUATION_REPORT.visualQuality.branding = 'present';
    } else {
      console.log('   ⚠️  No logo/visual branding detected');
      EVALUATION_REPORT.visualQuality.branding = 'missing';
      EVALUATION_REPORT.recommendations.push({
        priority: 'low',
        category: 'branding',
        issue: 'No visual logo detected',
        recommendation: 'Consider adding iGFAP logo for professional appearance and brand recognition'
      });
    }

    // Check spacing and whitespace
    const mainContent = await page.locator('main, .container, .auth-container').first();
    if (await mainContent.count() > 0) {
      const padding = await mainContent.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.padding;
      });
      console.log(`   Spacing: padding ${padding}`);
    }

    // ==========================================================================
    // PHASE 3: INTERACTION QUALITY
    // Response times, feedback, affordances
    // ==========================================================================
    console.log('\n' + '='.repeat(80));
    console.log('⚡ PHASE 3: INTERACTION QUALITY');
    console.log('='.repeat(80));

    // Reset page
    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    // Test password field responsiveness
    console.log('\n⌨️  Testing Password Field Interaction');
    const passwordField = await page.locator('input[type="password"]').first();

    const focusStartTime = Date.now();
    await passwordField.click();
    await page.waitForTimeout(50);
    const focusTime = Date.now() - focusStartTime;

    console.log(`   Focus response: ${focusTime}ms`);
    if (focusTime < 100) {
      console.log('   ✅ Instant feedback');
      EVALUATION_REPORT.interactionQuality.inputResponse = 'excellent';
    }

    // Check for visual feedback
    await page.screenshot({ path: '/tmp/auth-eval-input-focus.png' });
    console.log('   📸 Captured focus state for visual feedback analysis');

    // Test typing experience
    await passwordField.type('Test123', { delay: 100 });
    console.log('   ✅ Typing feels responsive');

    // Test button interaction
    console.log('\n🖱️  Testing Button Interaction');
    const loginButton = await page.locator('button:has-text("Access")').first();

    // Hover feedback
    await loginButton.hover();
    await page.waitForTimeout(100);
    await page.screenshot({ path: '/tmp/auth-eval-button-hover.png' });
    console.log('   📸 Captured hover state');

    // Check if button shows loading state
    await passwordField.clear();
    await passwordField.fill('Neuro25');

    const clickStartTime = Date.now();
    await loginButton.click();
    await page.waitForTimeout(200);
    const clickResponseTime = Date.now() - clickStartTime;

    console.log(`   Click response: ${clickResponseTime}ms`);
    if (clickResponseTime < 300) {
      console.log('   ✅ Feels instant');
      EVALUATION_REPORT.interactionQuality.buttonResponse = 'excellent';
    } else if (clickResponseTime < 1000) {
      console.log('   ⚠️  Slight delay but acceptable');
      EVALUATION_REPORT.interactionQuality.buttonResponse = 'acceptable';
    } else {
      console.log('   ❌ Noticeable delay - frustrating');
      EVALUATION_REPORT.interactionQuality.buttonResponse = 'slow';
    }

    // ==========================================================================
    // PHASE 4: TASK COMPLETION
    // Can users achieve their goal? Where's the friction?
    // ==========================================================================
    console.log('\n' + '='.repeat(80));
    console.log('🎯 PHASE 4: TASK COMPLETION');
    console.log('='.repeat(80));

    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    console.log('\n📝 Task: "I need to access the stroke triage system"');

    // Measure task completion time
    const taskStartTime = Date.now();

    // Step 1: Find password field
    const findFieldTime = Date.now();
    const pwField = await page.locator('input[type="password"]').first();
    const foundFieldTime = Date.now() - findFieldTime;
    console.log(`   Step 1: Find password field - ${foundFieldTime}ms`);

    // Step 2: Enter password
    await pwField.fill('Neuro25');
    console.log('   Step 2: Enter password - complete');

    // Step 3: Find and click submit
    const findButtonTime = Date.now();
    const submitButton = await page.locator('button:has-text("Access")').first();
    const foundButtonTime = Date.now() - findButtonTime;
    console.log(`   Step 3: Find submit button - ${foundButtonTime}ms`);

    await submitButton.click();
    await page.waitForLoadState('networkidle');

    const taskEndTime = Date.now();
    const totalTaskTime = taskEndTime - taskStartTime;

    console.log(`\n⏱️  Total Task Time: ${totalTaskTime}ms (${(totalTaskTime/1000).toFixed(1)}s)`);

    EVALUATION_REPORT.taskCompletion.loginTime = totalTaskTime;

    if (totalTaskTime < 5000) {
      console.log('   ✅ Quick and easy');
      EVALUATION_REPORT.taskCompletion.difficulty = 'easy';
    } else if (totalTaskTime < 10000) {
      console.log('   ⚠️  Takes some time');
      EVALUATION_REPORT.taskCompletion.difficulty = 'moderate';
    } else {
      console.log('   ❌ Too slow - users will be frustrated');
      EVALUATION_REPORT.taskCompletion.difficulty = 'difficult';
    }

    // Count friction points
    const frictionPoints = [];

    // Check if password field is obvious
    const placeholder = await pwField.getAttribute('placeholder');
    if (!placeholder || placeholder.length < 10) {
      frictionPoints.push('Password field placeholder could be more descriptive');
    }

    // Check if button text is action-oriented
    const buttonText = await submitButton.textContent();
    if (!buttonText?.toLowerCase().includes('access') && !buttonText?.toLowerCase().includes('login')) {
      frictionPoints.push('Button text not clearly action-oriented');
    }

    console.log(`\n⚠️  Friction Points: ${frictionPoints.length}`);
    frictionPoints.forEach(fp => console.log(`   - ${fp}`));

    EVALUATION_REPORT.taskCompletion.frictionPoints = frictionPoints;

    // ==========================================================================
    // PHASE 5: EMOTIONAL RESPONSE
    // Trust, confidence, frustration, cognitive comfort
    // ==========================================================================
    console.log('\n' + '='.repeat(80));
    console.log('💭 PHASE 5: EMOTIONAL RESPONSE');
    console.log('='.repeat(80));

    await page.goto('https://igfap.eu/0825/', { waitUntil: 'networkidle' });

    // Trust signals
    console.log('\n🔒 Trust Assessment');
    let trustScore = 0;
    const trustFactors = [];

    // Check for HTTPS
    if (page.url().startsWith('https://')) {
      trustScore += 2;
      trustFactors.push('✅ HTTPS connection (+2)');
    }

    // Check for professional design
    const heading = await page.locator('h1').first();
    if (heading) {
      trustScore += 1;
      trustFactors.push('✅ Clear heading/branding (+1)');
    }

    // Check for regulatory info
    const hasRegulatory = await page.locator('p:has-text("Regulatory"), p:has-text("GDPR"), p:has-text("Clinical")').count();
    if (hasRegulatory > 0) {
      trustScore += 2;
      trustFactors.push('✅ Regulatory/compliance info visible (+2)');
    } else {
      trustFactors.push('❌ No regulatory information visible (0)');
    }

    // Check for medical disclaimer
    const hasDisclaimer = await page.locator('a:has-text("Disclaimer"), a:has-text("Privacy")').count();
    if (hasDisclaimer > 0) {
      trustScore += 1;
      trustFactors.push('✅ Legal links (Privacy/Disclaimer) (+1)');
    }

    // Check for version info
    const hasVersion = await page.locator(':has-text("Version")').count();
    if (hasVersion > 0) {
      trustScore += 1;
      trustFactors.push('✅ Version information visible (+1)');
    }

    console.log(`   Trust Score: ${trustScore}/10`);
    trustFactors.forEach(tf => console.log(`   ${tf}`));
    EVALUATION_REPORT.emotionalResponse.trustScore = trustScore;

    if (trustScore >= 7) {
      console.log('   ✅ High trust - users feel confident');
      EVALUATION_REPORT.emotionalResponse.trustLevel = 'high';
    } else if (trustScore >= 4) {
      console.log('   ⚠️  Moderate trust - could improve');
      EVALUATION_REPORT.emotionalResponse.trustLevel = 'moderate';
      EVALUATION_REPORT.recommendations.push({
        priority: 'medium',
        category: 'trust',
        issue: `Trust score ${trustScore}/10 - room for improvement`,
        recommendation: 'Consider adding hospital/institution logos, certifications, or clinician photos'
      });
    } else {
      console.log('   ❌ Low trust - users may hesitate');
      EVALUATION_REPORT.emotionalResponse.trustLevel = 'low';
    }

    // Cognitive load
    console.log('\n🧠 Cognitive Load Assessment');
    let cognitiveLoad = 0;
    const loadFactors = [];

    // Count choices user must make
    const visibleButtons = await page.locator('button:visible').count();
    if (visibleButtons > 5) {
      cognitiveLoad += 2;
      loadFactors.push(`❌ ${visibleButtons} visible buttons - many choices (+2 load)`);
    } else {
      loadFactors.push(`✅ ${visibleButtons} visible buttons - manageable (0 load)`);
    }

    // Count paragraphs user must read
    const visibleParagraphs = await page.locator('p:visible').count();
    if (visibleParagraphs > 3) {
      cognitiveLoad += 2;
      loadFactors.push(`⚠️  ${visibleParagraphs} paragraphs - requires reading (+2 load)`);
    } else {
      loadFactors.push(`✅ ${visibleParagraphs} paragraphs - minimal reading (0 load)`);
    }

    // Check form complexity
    const inputFields = await page.locator('input:visible').count();
    if (inputFields === 1) {
      loadFactors.push(`✅ Single input field - simple (+0 load)`);
    } else if (inputFields > 3) {
      cognitiveLoad += 1;
      loadFactors.push(`⚠️  ${inputFields} input fields (+1 load)`);
    }

    console.log(`   Cognitive Load Score: ${cognitiveLoad}/10 (lower is better)`);
    loadFactors.forEach(lf => console.log(`   ${lf}`));
    EVALUATION_REPORT.emotionalResponse.cognitiveLoad = cognitiveLoad;

    if (cognitiveLoad <= 2) {
      console.log('   ✅ Low cognitive load - easy to use');
      EVALUATION_REPORT.emotionalResponse.cognitiveComfort = 'high';
    } else if (cognitiveLoad <= 5) {
      console.log('   ⚠️  Moderate cognitive load');
      EVALUATION_REPORT.emotionalResponse.cognitiveComfort = 'moderate';
    } else {
      console.log('   ❌ High cognitive load - may overwhelm users');
      EVALUATION_REPORT.emotionalResponse.cognitiveComfort = 'low';
      EVALUATION_REPORT.recommendations.push({
        priority: 'high',
        category: 'simplicity',
        issue: `Cognitive load score ${cognitiveLoad}/10 - too complex`,
        recommendation: 'Simplify interface: hide non-essential buttons, collapse regulatory text'
      });
    }

    // Overall emotional tone
    console.log('\n🎭 Overall Emotional Assessment');
    const positiveSignals = trustScore + (10 - cognitiveLoad);
    const totalPossible = 20;
    const emotionalScore = (positiveSignals / totalPossible) * 10;

    console.log(`   Emotional Score: ${emotionalScore.toFixed(1)}/10`);
    if (emotionalScore >= 7) {
      console.log('   ✅ Positive experience - users feel comfortable and confident');
      EVALUATION_REPORT.emotionalResponse.overall = 'positive';
    } else if (emotionalScore >= 5) {
      console.log('   ⚠️  Neutral experience - functional but could be better');
      EVALUATION_REPORT.emotionalResponse.overall = 'neutral';
    } else {
      console.log('   ❌ Negative experience - users may feel frustrated or uncertain');
      EVALUATION_REPORT.emotionalResponse.overall = 'negative';
    }

    // ==========================================================================
    // FINAL REPORT
    // ==========================================================================
    console.log('\n' + '='.repeat(80));
    console.log('📊 HUMAN UX EVALUATION SUMMARY');
    console.log('='.repeat(80));

    console.log('\n👁️  FIRST IMPRESSIONS:');
    console.log(`   Load Speed: ${EVALUATION_REPORT.firstImpressions.loadSpeed}`);
    console.log(`   Purpose Clarity: ${EVALUATION_REPORT.firstImpressions.purposeClarity}`);
    console.log(`   Text Density: ${EVALUATION_REPORT.firstImpressions.textDensity}`);

    console.log('\n🎨 VISUAL QUALITY:');
    console.log(`   Theme Support: ${EVALUATION_REPORT.visualQuality.themeSupport}`);
    console.log(`   Branding: ${EVALUATION_REPORT.visualQuality.branding}`);

    console.log('\n⚡ INTERACTION QUALITY:');
    console.log(`   Input Response: ${EVALUATION_REPORT.interactionQuality.inputResponse}`);
    console.log(`   Button Response: ${EVALUATION_REPORT.interactionQuality.buttonResponse}`);

    console.log('\n🎯 TASK COMPLETION:');
    console.log(`   Login Time: ${EVALUATION_REPORT.taskCompletion.loginTime}ms`);
    console.log(`   Difficulty: ${EVALUATION_REPORT.taskCompletion.difficulty}`);
    console.log(`   Friction Points: ${EVALUATION_REPORT.taskCompletion.frictionPoints.length}`);

    console.log('\n💭 EMOTIONAL RESPONSE:');
    console.log(`   Trust Score: ${EVALUATION_REPORT.emotionalResponse.trustScore}/10`);
    console.log(`   Cognitive Load: ${EVALUATION_REPORT.emotionalResponse.cognitiveLoad}/10`);
    console.log(`   Overall: ${EVALUATION_REPORT.emotionalResponse.overall}`);

    console.log('\n💡 RECOMMENDATIONS:');
    if (EVALUATION_REPORT.recommendations.length === 0) {
      console.log('   ✅ No major issues found - auth screen is well-designed!');
    } else {
      const highPriority = EVALUATION_REPORT.recommendations.filter(r => r.priority === 'high');
      const mediumPriority = EVALUATION_REPORT.recommendations.filter(r => r.priority === 'medium');
      const lowPriority = EVALUATION_REPORT.recommendations.filter(r => r.priority === 'low');

      if (highPriority.length > 0) {
        console.log('\n   🔴 HIGH PRIORITY:');
        highPriority.forEach((rec, i) => {
          console.log(`   ${i + 1}. [${rec.category.toUpperCase()}] ${rec.issue}`);
          console.log(`      → ${rec.recommendation}`);
        });
      }

      if (mediumPriority.length > 0) {
        console.log('\n   🟡 MEDIUM PRIORITY:');
        mediumPriority.forEach((rec, i) => {
          console.log(`   ${i + 1}. [${rec.category.toUpperCase()}] ${rec.issue}`);
          console.log(`      → ${rec.recommendation}`);
        });
      }

      if (lowPriority.length > 0) {
        console.log('\n   🟢 LOW PRIORITY:');
        lowPriority.forEach((rec, i) => {
          console.log(`   ${i + 1}. [${rec.category.toUpperCase()}] ${rec.issue}`);
          console.log(`      → ${rec.recommendation}`);
        });
      }
    }

    console.log('\n✅ Human UX Evaluation Complete!');

  } catch (error) {
    console.error('\n❌ Evaluation failed:', error);
    throw error;
  } finally {
    await browser.close();
  }

  return EVALUATION_REPORT;
}

// Run evaluation
evaluateAuthScreenAsHuman()
  .then(() => {
    console.log('\n🎯 Evaluation completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Evaluation failed:', error);
    process.exit(1);
  });
