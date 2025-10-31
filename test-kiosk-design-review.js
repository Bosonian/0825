/**
 * Kiosk Design Review - Visual UI/UX Analysis
 * Using Playwright to capture and analyze kiosk design
 * Provides specific recommendations for visual polish
 */
import { chromium } from '@playwright/test';

const KIOSK_URL = 'https://igfap.eu/kiosk/';

async function reviewKioskDesign() {
  console.log('🎨 KIOSK DESIGN REVIEW & UI/UX ANALYSIS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👁️  Visual inspection using Playwright');
  console.log('📋 Analyzing layout, colors, typography, spacing, UX flows');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  try {
    console.log('🔍 Step 1: Initial Visual Assessment');
    console.log('─────────────────────────────────────────────────────────────');

    await page.goto(KIOSK_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture full screen
    await page.screenshot({
      path: 'test-screenshots/kiosk-design-01-full.png',
      fullPage: true
    });
    console.log('   📸 Full page screenshot captured');

    // Extract visual properties
    const visualAnalysis = await page.evaluate(() => {
      const analysis = {
        colors: {},
        layout: {},
        typography: {},
        spacing: {},
        elements: {}
      };

      // Header analysis
      const header = document.querySelector('header, .kiosk-header, #kioskHeader');
      if (header) {
        const headerStyle = window.getComputedStyle(header);
        analysis.colors.header = {
          background: headerStyle.backgroundColor,
          color: headerStyle.color,
          height: headerStyle.height
        };
      }

      // Body/background
      const body = document.body;
      const bodyStyle = window.getComputedStyle(body);
      analysis.colors.body = {
        background: bodyStyle.backgroundColor,
        color: bodyStyle.color
      };

      // Typography
      analysis.typography.bodyFont = bodyStyle.fontFamily;
      analysis.typography.bodySize = bodyStyle.fontSize;

      const h1 = document.querySelector('h1');
      if (h1) {
        const h1Style = window.getComputedStyle(h1);
        analysis.typography.h1Size = h1Style.fontSize;
        analysis.typography.h1Weight = h1Style.fontWeight;
        analysis.typography.h1Color = h1Style.color;
      }

      // Layout
      analysis.layout.containerWidth = body.offsetWidth;
      analysis.layout.hasFixedHeader = header ? window.getComputedStyle(header).position === 'fixed' : false;

      // Case cards
      const caseCards = document.querySelectorAll('.case-card, .case-item, [data-case-id]');
      analysis.elements.caseCardCount = caseCards.length;

      if (caseCards.length > 0) {
        const firstCard = caseCards[0];
        const cardStyle = window.getComputedStyle(firstCard);
        analysis.elements.caseCard = {
          background: cardStyle.backgroundColor,
          border: cardStyle.border,
          borderRadius: cardStyle.borderRadius,
          padding: cardStyle.padding,
          margin: cardStyle.margin,
          boxShadow: cardStyle.boxShadow
        };
      }

      // Buttons
      const buttons = document.querySelectorAll('button');
      analysis.elements.buttonCount = buttons.length;

      if (buttons.length > 0) {
        const firstBtn = buttons[0];
        const btnStyle = window.getComputedStyle(firstBtn);
        analysis.elements.button = {
          background: btnStyle.backgroundColor,
          color: btnStyle.color,
          border: btnStyle.border,
          borderRadius: btnStyle.borderRadius,
          padding: btnStyle.padding,
          fontSize: btnStyle.fontSize
        };
      }

      // Status indicators
      const statusElements = document.querySelectorAll('.status, .risk-indicator, .badge');
      analysis.elements.statusIndicators = statusElements.length;

      return analysis;
    });

    console.log('\n📊 Visual Properties Analysis:');
    console.log('─────────────────────────────────────────────────────────────');

    // Colors
    console.log('\n🎨 COLOR SCHEME:');
    console.log(`   Header Background: ${visualAnalysis.colors.header?.background || 'N/A'}`);
    console.log(`   Header Text: ${visualAnalysis.colors.header?.color || 'N/A'}`);
    console.log(`   Body Background: ${visualAnalysis.colors.body?.background || 'N/A'}`);
    console.log(`   Body Text: ${visualAnalysis.colors.body?.color || 'N/A'}`);

    // Typography
    console.log('\n✍️  TYPOGRAPHY:');
    console.log(`   Body Font: ${visualAnalysis.typography.bodyFont}`);
    console.log(`   Body Size: ${visualAnalysis.typography.bodySize}`);
    console.log(`   H1 Size: ${visualAnalysis.typography.h1Size || 'N/A'}`);
    console.log(`   H1 Weight: ${visualAnalysis.typography.h1Weight || 'N/A'}`);

    // Elements
    console.log('\n📦 UI ELEMENTS:');
    console.log(`   Case Cards: ${visualAnalysis.elements.caseCardCount}`);
    console.log(`   Buttons: ${visualAnalysis.elements.buttonCount}`);
    console.log(`   Status Indicators: ${visualAnalysis.elements.statusIndicators}`);

    if (visualAnalysis.elements.caseCard) {
      console.log(`   Card Background: ${visualAnalysis.elements.caseCard.background}`);
      console.log(`   Card Border: ${visualAnalysis.elements.caseCard.border}`);
      console.log(`   Card Radius: ${visualAnalysis.elements.caseCard.borderRadius}`);
      console.log(`   Card Shadow: ${visualAnalysis.elements.caseCard.boxShadow}`);
    }

    // Test 2: Responsive Design
    console.log('\n\n📱 Step 2: Responsive Design Testing');
    console.log('─────────────────────────────────────────────────────────────');

    const viewports = [
      { name: 'Large Display (Kiosk)', width: 1920, height: 1080 },
      { name: 'Standard Monitor', width: 1366, height: 768 },
      { name: 'Tablet Landscape', width: 1024, height: 768 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);

      const screenshot = `test-screenshots/kiosk-design-viewport-${viewport.width}x${viewport.height}.png`;
      await page.screenshot({ path: screenshot, fullPage: false }); // Above fold only

      console.log(`   📸 ${viewport.name} (${viewport.width}x${viewport.height}): ${screenshot}`);

      // Check for overflow
      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > document.body.clientWidth;
      });

      console.log(`      ${hasOverflow ? '⚠️  Horizontal overflow' : '✅ No overflow'}`);
    }

    // Reset viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Test 3: Interactive Elements
    console.log('\n\n🖱️  Step 3: Interactive Element Testing');
    console.log('─────────────────────────────────────────────────────────────');

    // Check for case cards and test clicking
    const caseCards = await page.locator('.case-card, .case-item, [data-case-id]').all();

    if (caseCards.length > 0) {
      console.log(`   Found ${caseCards.length} case cards`);

      // Test hover state on first card
      await caseCards[0].hover();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: 'test-screenshots/kiosk-design-hover-state.png',
        fullPage: false
      });
      console.log(`   📸 Hover state captured`);

      // Test click
      console.log(`   🖱️  Testing case card click...`);
      await caseCards[0].click();
      await page.waitForTimeout(2000);

      await page.screenshot({
        path: 'test-screenshots/kiosk-design-case-detail.png',
        fullPage: true
      });
      console.log(`   📸 Case detail view captured`);

      // Check if navigated to PWA
      const currentURL = page.url();
      if (currentURL.includes('/0825/') || currentURL.includes('/0925/')) {
        console.log(`   ✅ Successfully navigated to PWA results`);
      } else {
        console.log(`   ⚠️  Still on kiosk page: ${currentURL}`);
      }

      // Go back
      await page.goto(KIOSK_URL, { waitUntil: 'networkidle' });
    } else {
      console.log(`   ⚠️  No case cards found`);
    }

    // Test 4: Content Hierarchy
    console.log('\n\n📐 Step 4: Content Hierarchy Analysis');
    console.log('─────────────────────────────────────────────────────────────');

    const hierarchyAnalysis = await page.evaluate(() => {
      const hierarchy = {
        headings: [],
        textSizes: new Set(),
        colorCount: new Set()
      };

      // Find all headings
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
        const elements = document.querySelectorAll(tag);
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          hierarchy.headings.push({
            tag,
            text: el.textContent.trim().substring(0, 50),
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            color: style.color
          });
        });
      });

      // Find all text sizes
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        hierarchy.textSizes.add(style.fontSize);
        hierarchy.colorCount.add(style.color);
      });

      return {
        headings: hierarchy.headings,
        uniqueTextSizes: hierarchy.textSizes.size,
        uniqueColors: hierarchy.colorCount.size
      };
    });

    console.log(`   📊 Heading structure:`);
    hierarchyAnalysis.headings.forEach(h => {
      console.log(`      <${h.tag}> "${h.text}" - ${h.fontSize}, ${h.fontWeight}`);
    });
    console.log(`   📏 Unique font sizes: ${hierarchyAnalysis.uniqueTextSizes}`);
    console.log(`   🎨 Unique colors: ${hierarchyAnalysis.uniqueColors}`);

    // Test 5: Accessibility & Readability
    console.log('\n\n♿ Step 5: Accessibility Check');
    console.log('─────────────────────────────────────────────────────────────');

    const a11yCheck = await page.evaluate(() => {
      const issues = [];

      // Check for alt text on images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.alt) {
          issues.push(`Image without alt text: ${img.src.substring(0, 50)}`);
        }
      });

      // Check for button labels
      const buttons = document.querySelectorAll('button');
      buttons.forEach(btn => {
        if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
          issues.push('Button without text or aria-label');
        }
      });

      // Check for color contrast (simplified)
      const textElements = document.querySelectorAll('p, span, div, li, td');
      let lowContrastCount = 0;

      textElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;

        // Very basic check - real contrast calculation is complex
        if (color === 'rgb(255, 255, 255)' && bgColor === 'rgb(255, 255, 255)') {
          lowContrastCount++;
        }
      });

      return { issues, lowContrastCount };
    });

    if (a11yCheck.issues.length > 0) {
      console.log(`   ⚠️  ${a11yCheck.issues.length} accessibility issue(s) found:`);
      a11yCheck.issues.slice(0, 5).forEach(issue => {
        console.log(`      - ${issue}`);
      });
    } else {
      console.log(`   ✅ No major accessibility issues detected`);
    }

    // Generate recommendations
    console.log('\n\n');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('💡 UI/UX POLISH RECOMMENDATIONS');
    console.log('═══════════════════════════════════════════════════════════════\n');

    generateRecommendations(visualAnalysis, hierarchyAnalysis);

    console.log('\n📸 All design review screenshots saved to:');
    console.log('   test-screenshots/kiosk-design-*\n');

  } catch (error) {
    console.error('❌ Design review error:', error);
  } finally {
    await browser.close();
  }
}

function generateRecommendations(visualAnalysis, hierarchyAnalysis) {
  const recommendations = [];

  // Color recommendations
  console.log('🎨 COLOR SCHEME IMPROVEMENTS:');

  if (visualAnalysis.colors.header?.background === 'rgba(0, 0, 0, 0)' ||
      visualAnalysis.colors.header?.background === 'transparent') {
    console.log('   ❌ ISSUE: Header has transparent background');
    console.log('   ✅ FIX: Add solid branded color');
    console.log('      background: #0059b0; /* Professional medical blue */');
    console.log('      color: white;');
    console.log('');
  }

  if (visualAnalysis.colors.body?.background === 'rgb(255, 255, 255)') {
    console.log('   💡 SUGGESTION: Add subtle background color');
    console.log('   ✅ FIX: Use light gray for better contrast with cards');
    console.log('      background: #f5f7fa; /* Softer than pure white */');
    console.log('');
  }

  // Card design
  console.log('\n📦 CASE CARD ENHANCEMENTS:');

  if (visualAnalysis.elements.caseCard) {
    const card = visualAnalysis.elements.caseCard;

    if (!card.boxShadow || card.boxShadow === 'none') {
      console.log('   ❌ ISSUE: Cards have no shadow depth');
      console.log('   ✅ FIX: Add subtle elevation');
      console.log('      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);');
      console.log('      transition: box-shadow 0.3s ease;');
      console.log('   ✅ HOVER: Increase elevation on hover');
      console.log('      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);');
      console.log('      transform: translateY(-2px);');
      console.log('');
    }

    const borderRadius = parseInt(card.borderRadius);
    if (borderRadius < 8) {
      console.log('   💡 SUGGESTION: Increase border radius for modern look');
      console.log('   ✅ FIX: border-radius: 12px; /* Friendlier, modern */');
      console.log('');
    }
  }

  // Typography
  console.log('\n✍️  TYPOGRAPHY REFINEMENTS:');

  if (hierarchyAnalysis.uniqueTextSizes > 8) {
    console.log('   ⚠️  ISSUE: Too many font sizes (${hierarchyAnalysis.uniqueTextSizes})');
    console.log('   ✅ FIX: Establish consistent type scale');
    console.log('      H1: 2.5rem (40px) - Page title');
    console.log('      H2: 1.875rem (30px) - Section headers');
    console.log('      H3: 1.5rem (24px) - Card titles');
    console.log('      Body: 1rem (16px) - Normal text');
    console.log('      Small: 0.875rem (14px) - Metadata');
    console.log('');
  }

  if (!visualAnalysis.typography.bodyFont?.includes('system-ui')) {
    console.log('   💡 SUGGESTION: Use system font stack for better performance');
    console.log('   ✅ FIX: font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;');
    console.log('');
  }

  // Layout & Spacing
  console.log('\n📐 LAYOUT & SPACING:');
  console.log('   💡 SUGGESTION: Use consistent spacing scale');
  console.log('   ✅ FIX: Define spacing variables');
  console.log('      --space-xs: 0.25rem (4px)');
  console.log('      --space-sm: 0.5rem (8px)');
  console.log('      --space-md: 1rem (16px)');
  console.log('      --space-lg: 1.5rem (24px)');
  console.log('      --space-xl: 2rem (32px)');
  console.log('      --space-2xl: 3rem (48px)');
  console.log('');

  // Status indicators
  console.log('\n🚦 STATUS INDICATORS:');
  console.log('   💡 SUGGESTION: Use color-coded risk levels');
  console.log('   ✅ FIX: Define clear status colors');
  console.log('      Low Risk: #10b981 (green)');
  console.log('      Medium Risk: #f59e0b (amber)');
  console.log('      High Risk: #ef4444 (red)');
  console.log('      Critical: #dc2626 (dark red)');
  console.log('');
  console.log('   ✅ Add visual badges:');
  console.log('      border-left: 4px solid var(--risk-color);');
  console.log('      or circular badge with risk level');
  console.log('');

  // Interactive feedback
  console.log('\n🖱️  INTERACTIVE FEEDBACK:');
  console.log('   ✅ Add hover states:');
  console.log('      cursor: pointer;');
  console.log('      transition: all 0.2s ease;');
  console.log('');
  console.log('   ✅ Add loading states:');
  console.log('      Show spinner when navigating to case');
  console.log('      Skeleton loaders for case list');
  console.log('');
  console.log('   ✅ Add focus indicators:');
  console.log('      outline: 2px solid #0066cc;');
  console.log('      outline-offset: 2px;');
  console.log('');

  // Animations
  console.log('\n✨ MICRO-INTERACTIONS:');
  console.log('   ✅ Add subtle animations:');
  console.log('      /* Case card entrance */');
  console.log('      @keyframes fadeInUp {');
  console.log('        from {');
  console.log('          opacity: 0;');
  console.log('          transform: translateY(20px);');
  console.log('        }');
  console.log('        to {');
  console.log('          opacity: 1;');
  console.log('          transform: translateY(0);');
  console.log('        }');
  console.log('      }');
  console.log('');
  console.log('      .case-card {');
  console.log('        animation: fadeInUp 0.4s ease-out;');
  console.log('      }');
  console.log('');

  // Mobile optimization
  console.log('\n📱 MOBILE/TABLET OPTIMIZATION:');
  console.log('   ✅ Responsive grid:');
  console.log('      @media (min-width: 768px) {');
  console.log('        .case-grid {');
  console.log('          grid-template-columns: repeat(2, 1fr);');
  console.log('        }');
  console.log('      }');
  console.log('      @media (min-width: 1200px) {');
  console.log('        .case-grid {');
  console.log('          grid-template-columns: repeat(3, 1fr);');
  console.log('        }');
  console.log('      }');
  console.log('');

  // Data visualization
  console.log('\n📊 DATA VISUALIZATION:');
  console.log('   ✅ Add quick stats header:');
  console.log('      Total Cases | Active | High Risk | Avg Wait Time');
  console.log('');
  console.log('   ✅ Visual timeline:');
  console.log('      Show case age with color gradient');
  console.log('      <5min: green, 5-15min: yellow, >15min: red');
  console.log('');

  // Polish touches
  console.log('\n✨ FINAL POLISH:');
  console.log('   ✅ Add hospital branding space');
  console.log('   ✅ Real-time updates indicator');
  console.log('   ✅ Empty state with helpful message');
  console.log('   ✅ Smooth scroll behavior');
  console.log('   ✅ Print-friendly CSS for reports');
  console.log('');
}

// Run the design review
reviewKioskDesign();
