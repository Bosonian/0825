import { renderProgressIndicator } from '../components/progress.js';
import { renderCriticalAlert } from '../components/alerts.js';
import { renderDriversSection } from '../components/drivers.js';
import { renderStrokeCenterMap } from '../components/stroke-center-map.js';
import { getRiskLevel, formatTime } from '../../logic/formatters.js';
import { CRITICAL_THRESHOLDS } from '../../config.js';
import { t, i18n } from '../../localization/i18n.js';
import { store } from '../../state/store.js';
import { formatSummaryLabel, formatDisplayValue, formatDriverName } from '../../utils/label-formatter.js';
import {
  calculateICHVolume, estimateVolumeFromGFAP, estimateMortalityFromVolume, formatVolumeDisplay,
} from '../../logic/ich-volume-calculator.js';
import { renderCircularBrainDisplay, initializeVolumeAnimations } from '../components/brain-visualization.js';
// Dynamic import for React islands to avoid module resolution issues
// Using React island tachometer instead of the vanilla premium gauge
import { calculateLegacyICH } from '../../research/legacy-ich-model.js';
import { safeLogResearchData, isResearchModeEnabled } from '../../research/data-logger.js';
import { renderModelComparison, renderResearchToggle } from '../../research/comparison-ui.js';
// Premium vanilla JS tachometer implementation

function getModuleDisplayName(module) {
  const isDE = i18n.getCurrentLanguage() === 'de';
  const moduleNames = {
    Coma: isDE ? 'Koma-Modul' : 'Coma Module',
    Limited: isDE ? 'Begrenzte Daten' : 'Limited Data',
    Full: isDE ? 'Vollständige Bewertung' : 'Full Assessment',
  };
  return moduleNames[module] || module;
}

function renderInputSummary() {
  const state = store.getState();
  const { formData } = state;

  if (!formData || Object.keys(formData).length === 0) {
    return '';
  }

  let summaryHtml = '';

  // Iterate through each module's form data
  Object.entries(formData).forEach(([module, data]) => {
    if (data && Object.keys(data).length > 0) {
      const moduleTitle = t(`${module}ModuleTitle`) || module.charAt(0).toUpperCase() + module.slice(1);
      let itemsHtml = '';

      Object.entries(data).forEach(([key, value]) => {
        // Skip empty values
        if (value === '' || value === null || value === undefined) {
          return;
        }

        // Use consistent medical terminology from input forms
        const label = formatSummaryLabel(key);

        // Format value with appropriate units
        const displayValue = formatDisplayValue(value, key);

        itemsHtml += `
          <div class="summary-item">
            <span class="summary-label">${label}:</span>
            <span class="summary-value">${displayValue}</span>
          </div>
        `;
      });

      if (itemsHtml) {
        summaryHtml += `
          <div class="summary-module">
            <h4>${moduleTitle}</h4>
            <div class="summary-items">
              ${itemsHtml}
            </div>
          </div>
        `;
      }
    }
  });

  if (!summaryHtml) {
    return '';
  }

  return `
    <div class="input-summary">
      <h3>📋 ${t('inputSummaryTitle')}</h3>
      <p class="summary-subtitle">${t('inputSummarySubtitle')}</p>
      <div class="summary-content">
        ${summaryHtml}
      </div>
    </div>
  `;
}

function renderRiskCard(type, data, results) {
  if (!data) {
    console.log(`[RiskCard] No data for ${type}`);
    return '';
  }

  const percent = Math.round((data.probability || 0) * 100);
  console.log(`[RiskCard] ${type} - probability: ${data.probability}, percent: ${percent}%`);

  const riskLevel = getRiskLevel(percent, type);
  const isCritical = percent > 70; // Very high risk threshold
  const isHigh = percent > CRITICAL_THRESHOLDS[type].high;

  const icons = { ich: '🩸', lvo: '🧠' };
  const titles = { ich: t('ichProbability'), lvo: t('lvoProbability') };

  const level = isCritical ? 'critical' : isHigh ? 'high' : 'normal';
  return `
    <div class="enhanced-risk-card ${type} ${level}">
      <div class="risk-header">
        <div class="risk-icon">${icons[type]}</div>
        <div class="risk-title">
          <h3>${titles[type]}</h3>
        </div>
      </div>
      
      <div class="risk-probability">
        <div class="circles-container">
          <div class="rings-row">
            <div class="circle-item">
              <div class="probability-circle" data-react-ring data-percent="${percent}" data-level="${level}">
                <svg viewBox="0 0 120 120" class="probability-svg">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8"/>
                  <circle cx="60" cy="60" r="50" fill="none"
                    stroke="${level === 'critical' ? '#ff4444' : level === 'high' ? '#ff8800' : '#0066cc'}"
                    stroke-width="8"
                    stroke-dasharray="${Math.PI * 100}"
                    stroke-dashoffset="${Math.PI * 100 * (1 - percent / 100)}"
                    stroke-linecap="round"
                    transform="rotate(-90 60 60)"/>
                  <text x="60" y="60" text-anchor="middle" dominant-baseline="middle"
                    class="probability-text" fill="currentColor" font-size="20" font-weight="bold">
                    ${percent}%
                  </text>
                </svg>
              </div>
              <div class="circle-label">${type === 'ich' ? 'ICH Risk' : 'LVO Risk'}</div>
            </div>
          </div>
          <div class="risk-level ${level}">${riskLevel}</div>
        </div>
        
        <div class="risk-assessment"></div>
      </div>
    </div>
  `;
}

/**
 * Render ICH volume display for integration into risk card
 * @param {object} data - ICH risk data containing GFAP value
 * @returns {string} HTML for volume display
 */
function renderICHVolumeDisplay(data) {
  // Get GFAP value from the data
  const gfapValue = data.gfap_value || getCurrentGfapValue();

  if (!gfapValue || gfapValue <= 0) {
    return '';
  }

  // Use synchronous estimate for immediate UI rendering
  const estVolume = estimateVolumeFromGFAP(gfapValue);
  return `
    <div class="volume-display-container">
      ${renderCircularBrainDisplay(estVolume)}
    </div>
  `;
}

/**
 * Get current GFAP value from form data
 * @returns {number} GFAP value or 0 if not available
 */
function getCurrentGfapValue() {
  const state = store.getState();
  const { formData } = state;

  // Check all modules for GFAP value
  for (const module of ['coma', 'limited', 'full']) {
    if (formData[module]?.gfap_value) {
      return parseFloat(formData[module].gfap_value);
    }
  }

  return 0;
}

function renderLVONotPossible() {
  return `
    <div class="enhanced-risk-card lvo not-possible">
      <div class="risk-header">
        <div class="risk-icon">🔍</div>
        <div class="risk-title">
          <h3>${t('lvoProbability')}</h3>
          <span class="risk-module">${t('limitedAssessment')}</span>
        </div>
      </div>
      
      <div class="not-possible-content">
        <p>${t('lvoNotPossible')}</p>
        <p>${t('fullExamRequired')}</p>
      </div>
    </div>
  `;
}

export function renderResults(results, startTime) {
  try {
    // Add error handling for missing results
    if (!results) {
      console.error('renderResults: No results data provided');
      return `
        <div class="container">
          <div class="error-message">
            <h2>No Results Available</h2>
            <p>Please complete an assessment first.</p>
            <button class="primary" onclick="window.location.reload()">Start Over</button>
          </div>
        </div>
      `;
    }

    const { ich, lvo } = results;

    // Determine current module
    const currentModule = getCurrentModuleName(ich);

    // Calculate legacy model for research comparison (only for stroke modules)
    const legacyResults = currentModule !== 'coma' ? calculateLegacyFromResults(results) : null;

    // Debug logging for research mode

    // Log research data if research mode is enabled (background, non-breaking)
    if (legacyResults && isResearchModeEnabled(currentModule)) {
      safeLogResearchData(ich, legacyResults, getPatientInputs());
    }

    // Detect which module was used based on the data
    const isLimitedOrComa = ich?.module === 'Limited' || ich?.module === 'Coma' || lvo?.notPossible === true;
    const isFullModule = ich?.module === 'Full Stroke' || ich?.module?.includes('Full');

    let resultsHtml;

    // Debug logging
    console.log('[Results] ICH data:', ich);
    console.log('[Results] LVO data:', lvo);
    console.log('[Results] ICH module:', ich?.module);
    console.log('[Results] isLimitedOrComa:', isLimitedOrComa);
    console.log('[Results] isFullModule:', isFullModule);

    // For limited/coma modules - only show ICH
    if (isLimitedOrComa) {
      resultsHtml = renderICHFocusedResults(ich, results, startTime, legacyResults, currentModule);
    } else {
    // For full module - show ICH prominently with conditional LVO text
      resultsHtml = renderFullModuleResults(ich, lvo, results, startTime, legacyResults, currentModule);
    }

    // Initialize animations after DOM update
    setTimeout(async () => {
      console.log('[Results] Initializing volume animations...');
      initializeVolumeAnimations();
      try {
        const { mountIslands } = await import('../../react/mountIslands.jsx');
        mountIslands();
      } catch (err) {
      // ('React islands not available:', err);
      }
    }, 100);

    return resultsHtml;
  } catch (error) {
    console.error('Error in renderResults:', error);
    return `
      <div class="container">
        <div class="error-message">
          <h2>Error Displaying Results</h2>
          <p>There was an error displaying the results. Error: ${error.message}</p>
          <button class="primary" onclick="window.location.reload()">Start Over</button>
        </div>
      </div>
    `;
  }
}

function renderICHFocusedResults(ich, results, startTime, legacyResults, currentModule) {
  const criticalAlert = ich && ich.probability > 0.6 ? renderCriticalAlert() : '';
  const ichPercentLocal = Math.round((ich?.probability || 0) * 100);
  const strokeCenterHtml = renderStrokeCenterMap(results);
  const inputSummaryHtml = renderInputSummary();
  const researchToggleHtml = isResearchModeEnabled(currentModule) ? renderResearchToggle() : '';
  const researchComparisonHtml = (legacyResults && isResearchModeEnabled(currentModule))
    ? renderModelComparison(ich, legacyResults, getPatientInputs()) : '';

  // Add alternative diagnoses for coma module
  const alternativeDiagnosesHtml = (ich?.module === 'Coma') ? renderComaAlternativeDiagnoses(ich.probability) : '';

  // Add differential diagnoses for stroke modules (limited and full)
  const strokeDifferentialHtml = (ich?.module !== 'Coma') ? renderStrokeDifferentialDiagnoses(ich.probability) : '';

  return `
    <div class="container">
      ${renderProgressIndicator(3)}
      <h2>${t('bleedingRiskAssessment') || 'Blutungsrisiko-Bewertung / Bleeding Risk Assessment'}</h2>
      ${criticalAlert}
      
      <!-- Single ICH Risk Card -->
      <div class="risk-results-single">
        ${renderRiskCard('ich', ich, results)}
      </div>

      ${ich?.module === 'Coma' && ichPercentLocal >= 50 ? `
      <!-- ICH Volume Card (Coma only) -->
      <div class="risk-results-single">
        ${renderVolumeCard(ich)}
      </div>
      ` : ''}
      
      <!-- Alternative Diagnoses for Coma Module -->
      ${alternativeDiagnosesHtml}
      
      <!-- Differential Diagnoses for Stroke Modules -->
      ${strokeDifferentialHtml}
      
      <!-- Research Model Comparison (hidden unless research mode) -->
      ${researchComparisonHtml}
      
      <!-- ICH Drivers Only (not shown for Coma module) -->
      ${ich?.module !== 'Coma' ? `
        <div class="enhanced-drivers-section">
          <h3>${t('riskFactorsTitle') || 'Hauptrisikofaktoren / Main Risk Factors'}</h3>
          ${renderICHDriversOnly(ich)}
        </div>
      ` : ''}
      
      <!-- Collapsible Additional Information -->
      <div class="additional-info-section">
        <button class="info-toggle" data-target="input-summary">
          <span class="toggle-icon">📋</span>
          <span class="toggle-text">${t('inputSummaryTitle')}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="input-summary" style="display: none;">
          ${inputSummaryHtml}
        </div>
        
        <button class="info-toggle" data-target="stroke-centers">
          <span class="toggle-icon">🏥</span>
          <span class="toggle-text">${t('nearestCentersTitle')}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="stroke-centers" style="display: none;">
          ${strokeCenterHtml}
        </div>
      </div>
      
      <div class="results-actions">
        <div class="primary-actions">
          <button type="button" class="primary" id="shareToKiosk"> 🚀 Send to Hospital </button>
          <button type="button" class="primary" id="printResults"> 📄 ${t('printResults')} </button>
          <button type="button" class="secondary" data-action="reset"> ${t('newAssessment')} </button>
        </div>
        <div class="navigation-actions">
          <button type="button" class="tertiary" data-action="goBack"> ← ${t('goBack')} </button>
          <button type="button" class="tertiary" data-action="goHome"> 🏠 ${t('goHome')} </button>
        </div>
      </div>
      
      <div class="disclaimer">
        <strong>⚠️ ${t('importantNote')}:</strong> ${t('importantText')} Results generated at ${new Date().toLocaleTimeString()}.
      </div>
      
      ${renderBibliography(ich)}
      ${researchToggleHtml}
    </div>
  `;
}

function renderFullModuleResults(ich, lvo, results, startTime, legacyResults, currentModule) {
  const ichPercent = Math.round((ich?.probability || 0) * 100);
  const lvoPercent = Math.round((lvo?.probability || 0) * 100);

  console.log('[FullModuleResults] ICH probability:', ich?.probability, '-> %:', ichPercent);
  console.log('[FullModuleResults] LVO probability:', lvo?.probability, '-> %:', lvoPercent);

  const criticalAlert = ich && ich.probability > 0.6 ? renderCriticalAlert() : '';
  const strokeCenterHtml = renderStrokeCenterMap(results);
  const inputSummaryHtml = renderInputSummary();
  const researchToggleHtml = isResearchModeEnabled(currentModule) ? renderResearchToggle() : '';
  const researchComparisonHtml = (legacyResults && isResearchModeEnabled(currentModule))
    ? renderModelComparison(ich, legacyResults, getPatientInputs()) : '';

  // Get FAST-ED score from form data to determine LVO display
  const state = store.getState();
  const fastEdScore = parseInt(state.formData?.full?.fast_ed_score) || 0;

  // Ensure we only show LVO in full module and when LVO data is available
  const isFullModule = currentModule === 'full' || ich?.module === 'Full';
  const hasValidLVO = lvo && typeof lvo.probability === 'number' && !lvo.notPossible;
  const showLVORiskCard = isFullModule && fastEdScore > 3 && hasValidLVO;

  // ('  Conditions: isFullModule:', isFullModule);
  // ('  Conditions: fastEdScore > 3:', fastEdScore > 3);
  // ('  Conditions: hasValidLVO:', hasValidLVO);
  // ('  Show LVO Card:', showLVORiskCard);

  // Determine layout configuration
  const showVolumeCard = ichPercent >= 50;
  const maxProbability = Math.max(ichPercent, lvoPercent);
  // Robust ratio for gating (avoid divide-by-zero)
  const eps = 0.5;
  const ratio = lvoPercent / Math.max(ichPercent, eps);
  const inRatioBand = ratio >= 0.6 && ratio <= 1.7;
  // Strong-signal gate: both ICH and LVO at least 50%, and ratio in an informative band
  const showTachometer = isFullModule && ichPercent >= 50 && lvoPercent >= 50 && inRatioBand;
  const showDominanceBanner = isFullModule && ichPercent >= 50 && lvoPercent >= 50 && !inRatioBand;
  // DEBUG: Temporary relaxed conditions for testing
  const debugShowTachometer = isFullModule && ichPercent >= 30 && lvoPercent >= 30;

  // Calculate number of cards and layout class
  let cardCount = 1; // Always have ICH
  // No placeholder needed - only show LVO card when FAST-ED > 3
  if (showLVORiskCard) {
    cardCount++;
  }
  if (showVolumeCard) {
    cardCount++;
  }

  const layoutClass = cardCount === 1 ? 'risk-results-single'
    : cardCount === 2 ? 'risk-results-dual'
      : 'risk-results-triple';

  // Add differential diagnoses for stroke modules
  const strokeDifferentialHtml = renderStrokeDifferentialDiagnoses(ich.probability);

  return `
    <div class="container">
      ${renderProgressIndicator(3)}
      <h2>${t('resultsTitle')}</h2>
      ${criticalAlert}
      
      <!-- Risk Assessment Display -->
      <div class="${layoutClass}">
        ${renderRiskCard('ich', ich, results)}
        ${showLVORiskCard ? renderRiskCard('lvo', lvo, results) : ''}
        ${showVolumeCard ? renderVolumeCard(ich) : ''}
      </div>
      
      <!-- Treatment Decision Gauge (when strong signal) -->
      ${debugShowTachometer ? renderTachometerGauge(ichPercent, lvoPercent) : ''}
      ${!debugShowTachometer && showDominanceBanner ? renderDominanceBanner(ichPercent, lvoPercent, ratio) : ''}
      
      <!-- Differential Diagnoses for Stroke Modules -->
      ${strokeDifferentialHtml}
      
      <!-- Research Model Comparison (hidden unless research mode) -->
      ${researchComparisonHtml}
      
      <!-- Risk Factor Drivers -->
      <div class="enhanced-drivers-section">
        <h3>${t('riskFactorsTitle') || 'Risikofaktoren / Risk Factors'}</h3>
        ${showLVORiskCard ? renderDriversSection(ich, lvo) : renderICHDriversOnly(ich)}
      </div>
      
      <!-- Collapsible Additional Information -->
      <div class="additional-info-section">
        <button class="info-toggle" data-target="input-summary">
          <span class="toggle-icon">📋</span>
          <span class="toggle-text">${t('inputSummaryTitle')}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="input-summary" style="display: none;">
          ${inputSummaryHtml}
        </div>
        
        <button class="info-toggle" data-target="stroke-centers">
          <span class="toggle-icon">🏥</span>
          <span class="toggle-text">${t('nearestCentersTitle')}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="stroke-centers" style="display: none;">
          ${strokeCenterHtml}
        </div>
      </div>
      
      <div class="results-actions">
        <div class="primary-actions">
          <button type="button" class="primary" id="shareToKiosk"> 🚀 Send to Hospital </button>
          <button type="button" class="primary" id="printResults"> 📄 ${t('printResults')} </button>
          <button type="button" class="secondary" data-action="reset"> ${t('newAssessment')} </button>
        </div>
        <div class="navigation-actions">
          <button type="button" class="tertiary" data-action="goBack"> ← ${t('goBack')} </button>
          <button type="button" class="tertiary" data-action="goHome"> 🏠 ${t('goHome')} </button>
        </div>
      </div>
      
      <div class="disclaimer">
        <strong>⚠️ ${t('importantNote')}:</strong> ${t('importantText')} Results generated at ${new Date().toLocaleTimeString()}.
      </div>
      
      ${renderBibliography(ich)}
      ${researchToggleHtml}
    </div>
  `;
}

function renderLVONotification() {
  return `
    <div class="secondary-notification">
      <p class="lvo-possible">
        ⚡ ${t('lvoMayBePossible') || 'Großgefäßverschluss möglich / Large vessel occlusion possible'}
      </p>
    </div>
  `;
}

function renderDominanceBanner(ichPercent, lvoPercent, ratio) {
  const dominant = ratio > 1 ? 'LVO' : 'ICH';
  const icon = dominant === 'LVO' ? '🧠' : '🩸';
  const dominantText = i18n.getCurrentLanguage() === 'de'
    ? (dominant === 'LVO' ? 'LVO-dominant' : 'ICH-dominant')
    : (dominant === 'LVO' ? 'LVO dominant' : 'ICH dominant');
  const subtitle = i18n.getCurrentLanguage() === 'de'
    ? `Verhältnis LVO/ICH: ${ratio.toFixed(2)}`
    : `LVO/ICH ratio: ${ratio.toFixed(2)}`;
  return `
    <div class="tachometer-section">
      <div class="tachometer-card">
        <div class="treatment-recommendation ${dominant === 'LVO' ? 'lvo-dominant' : 'ich-dominant'}">
          <div class="recommendation-icon">${icon}</div>
          <div class="recommendation-text">
            <h4>${dominantText}</h4>
            <p>${subtitle}</p>
          </div>
          <div class="probability-summary">
            ICH: ${ichPercent}% | LVO: ${lvoPercent}%
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderICHDriversOnly(ich) {
  if (!ich || !ich.drivers) {
    return '<p class="no-drivers">No driver data available</p>';
  }

  // Drivers are already formatted from API with positive/negative arrays
  const driversData = ich.drivers;

  // Check if drivers have the correct structure
  if (!driversData.positive && !driversData.negative) {
    // Fallback for unexpected format
    return '<p class="no-drivers">Driver format error</p>';
  }

  const positiveDrivers = driversData.positive || [];
  const negativeDrivers = driversData.negative || [];

  return `
    <div class="drivers-split-view">
      <div class="drivers-column positive-column">
        <div class="column-header">
          <span class="column-icon">⬆</span>
          <span class="column-title">${t('increasingRisk') || 'Risikoerhöhend / Increasing Risk'}</span>
        </div>
        <div class="compact-drivers">
          ${positiveDrivers.length > 0
    ? positiveDrivers.slice(0, 5).map((d) => renderCompactDriver(d, 'positive')).join('')
    : `<p class="no-factors">${t('noFactors') || 'Keine Faktoren / No factors'}</p>`
}
        </div>
      </div>
      
      <div class="drivers-column negative-column">
        <div class="column-header">
          <span class="column-icon">⬇</span>
          <span class="column-title">${t('decreasingRisk') || 'Risikomindernd / Decreasing Risk'}</span>
        </div>
        <div class="compact-drivers">
          ${negativeDrivers.length > 0
    ? negativeDrivers.slice(0, 5).map((d) => renderCompactDriver(d, 'negative')).join('')
    : `<p class="no-factors">${t('noFactors') || 'Keine Faktoren / No factors'}</p>`
}
        </div>
      </div>
    </div>
  `;
}

function renderCompactDriver(driver, type) {
  // Driver object has 'label' and 'weight' properties
  const percentage = Math.abs(driver.weight * 100);
  const width = Math.min(percentage * 2, 100); // Scale for display

  return `
    <div class="compact-driver-item">
      <div class="compact-driver-label">${formatDriverName(driver.label)}</div>
      <div class="compact-driver-bar ${type}" style="width: ${width}%;">
        <span class="compact-driver-value">${percentage.toFixed(1)}%</span>
      </div>
    </div>
  `;
}

/**
 * Render bibliography footer with research citations
 * @param {object} ichData - ICH risk data containing probability
 * @returns {string} HTML for bibliography section
 */
function renderBibliography(ichData) {
  // Only show bibliography if ICH risk is >= 50%
  if (!ichData || !ichData.probability) {
    return '';
  }

  const ichPercent = Math.round((ichData.probability || 0) * 100);
  if (ichPercent < 50) {
    return '';
  }

  const gfapValue = getCurrentGfapValue();
  if (!gfapValue || gfapValue <= 0) {
    return '';
  }

  return `
    <div class="bibliography-section">
      <h4>${t('references')}</h4>
      <div class="citations">
        <div class="citation">
          <span class="citation-number">¹</span>
          <span class="citation-text">Broderick et al. (1993). Volume of intracerebral hemorrhage. A powerful and easy-to-use predictor of 30-day mortality. Stroke, 24(7), 987-993.</span>
        </div>
        <div class="citation">
          <span class="citation-number">²</span>
          <span class="citation-text">Krishnan et al. (2013). Hematoma expansion in intracerebral hemorrhage: Predictors and outcomes. Neurology, 81(19), 1660-1666.</span>
        </div>
        <div class="citation">
          <span class="citation-number">³</span>
          <span class="citation-text">Putra et al. (2020). Functional outcomes and mortality in patients with intracerebral hemorrhage. Critical Care Medicine, 48(3), 347-354.</span>
        </div>
        <div class="citation">
          <span class="citation-number">⁴</span>
          <span class="citation-text">Tangella et al. (2020). Early prediction of mortality in intracerebral hemorrhage using clinical markers. Journal of Neurocritical Care, 13(2), 89-97.</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Calculate legacy model results from current results data (background, non-breaking)
 * @param {object} results - Main model results
 * @returns {object|null} - Legacy model results or null if not possible
 */
function calculateLegacyFromResults(results) {
  try {
    const patientInputs = getPatientInputs();

    if (!patientInputs.age || !patientInputs.gfap) {
      // console.log('🔍 Missing required inputs for legacy model:', {
      //  age: patientInputs.age,
      //  gfap: patientInputs.gfap,
      // });
      return null;
    }

    const legacyResult = calculateLegacyICH(patientInputs);

    return legacyResult;
  } catch (error) {
    // console.log('Legacy model calculation failed (non-critical):', error);
    return null;
  }
}

/**
 * Get patient input data from store for research logging
 * @returns {object} - Patient input data
 */
function getPatientInputs() {
  const state = store.getState();
  const { formData } = state;

  // Extract age and GFAP from any module
  let age = null;
  let gfap = null;

  for (const module of ['coma', 'limited', 'full']) {
    if (formData[module]) {
      age = age || formData[module].age_years;
      gfap = gfap || formData[module].gfap_value;
    }
  }

  const result = {
    age: parseInt(age) || null,
    gfap: parseFloat(gfap) || null,
  };

  return result;
}

/**
 * Render alternative diagnoses for coma module
 * @param {number} probability - ICH probability (0-1)
 * @returns {string} HTML for alternative diagnoses
 */
function renderStrokeDifferentialDiagnoses(probability) {
  const percent = Math.round(probability * 100);

  if (percent > 25) {
    return `
      <div class="alternative-diagnosis-card">
        <div class="diagnosis-header">
          <span class="lightning-icon">⚡</span>
          <h3>${t('differentialDiagnoses')}</h3>
        </div>
        <div class="diagnosis-content">
          <!-- Time Window Confirmation - Clinical Action -->
          <h4 class="clinical-action-heading">${t('reconfirmTimeWindow')}</h4>
          
          <!-- Actual Differential Diagnoses -->
          <ul class="diagnosis-list">
            <li>${t('unclearTimeWindow')}</li>
            <li>${t('rareDiagnoses')}</li>
          </ul>
        </div>
      </div>
    `;
  }

  return '';
}

function renderComaAlternativeDiagnoses(probability) {
  const percent = Math.round(probability * 100);
  const isDE = i18n.getCurrentLanguage() === 'de';

  if (percent > 25) {
    // High probability - show SAB, SDH, EDH
    return `
      <div class="alternative-diagnosis-card">
        <div class="diagnosis-header">
          <span class="lightning-icon">⚡</span>
          <h3>${isDE ? 'Differentialdiagnosen' : 'Differential Diagnoses'}</h3>
        </div>
        <div class="diagnosis-content">
          <ul class="diagnosis-list">
            <li>
              ${isDE
    ? 'Alternative Diagnosen sind SAB, SDH, EDH (Subarachnoidalblutung, Subduralhämatom, Epiduralhämatom)'
    : 'Alternative diagnoses include SAH, SDH, EDH (Subarachnoid Hemorrhage, Subdural Hematoma, Epidural Hematoma)'
}
            </li>
            <li>
              ${isDE
    ? 'Bei unklarem Zeitfenster seit Symptombeginn oder im erweiterten Zeitfenster kommen auch ein demarkierter Infarkt oder hypoxischer Hirnschaden in Frage'
    : 'In cases of unclear time window since symptom onset or extended time window, demarcated infarction or hypoxic brain injury should also be considered'
}
            </li>
          </ul>
        </div>
      </div>
    `;
  }
  // Low probability - other causes of altered consciousness
  return `
      <div class="alternative-diagnosis-card">
        <div class="diagnosis-header">
          <span class="lightning-icon">⚡</span>
          <h3>${isDE ? 'Differentialdiagnosen' : 'Differential Diagnoses'}</h3>
        </div>
        <div class="diagnosis-content">
          <ul class="diagnosis-list">
            <li>
              ${isDE
    ? 'Alternative Diagnose von Vigilanzminderung wahrscheinlich'
    : 'Alternative diagnosis for reduced consciousness likely'
}
            </li>
            <li>
              ${isDE
    ? 'Ein Verschluss der Arteria Basilaris ist nicht ausgeschlossen'
    : 'Basilar artery occlusion cannot be excluded'
}
            </li>
          </ul>
        </div>
      </div>
    `;
}

/**
 * Get current module name from results
 * @param {object} ich - ICH results containing module information
 * @returns {string} - Module name ('coma', 'limited', 'full')
 */
function getCurrentModuleName(ich) {
  if (!ich?.module) {
    return 'unknown';
  }

  const module = ich.module.toLowerCase();
  if (module.includes('coma')) {
    return 'coma';
  }
  if (module.includes('limited')) {
    return 'limited';
  }
  if (module.includes('full')) {
    return 'full';
  }

  return 'unknown';
}

/**
 * Render volume as a standalone risk card (for horizontal layout)
 * @param {object} ichData - ICH data containing volume information
 * @returns {string} HTML for volume risk card
 */
function renderVolumeCard(ichData) {
  const gfapValue = getCurrentGfapValue();
  if (!gfapValue || gfapValue <= 0) {
    return '';
  }

  // Use fast estimate for immediate UI and mortality band
  const estVolume = estimateVolumeFromGFAP(gfapValue);
  const mortality = estimateMortalityFromVolume(estVolume);
  const percent = Math.round((ichData?.probability || 0) * 100);

  return `
    <div class="enhanced-risk-card volume-card normal">
      <div class="risk-header">
        <div class="risk-icon">🧮</div>
        <div class="risk-title">
          <h3>${t('ichVolumeLabel')}</h3>
        </div>
      </div>
      
      <div class="risk-probability">
        <div class="circles-container">
          <div class="rings-row">
            <div class="circle-item">
              ${renderICHVolumeDisplay(ichData)}
              <div class="circle-label">${t('ichVolumeLabel')}</div>
            </div>
          </div>
        </div>
        
        <div class="risk-assessment">
          <div class="mortality-assessment">
            ${t('predictedMortality')}: ${mortality}
          </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Render tachometer gauge for treatment decision when high risk
 * @param {number} ichPercent - ICH probability percentage
 * @param {number} lvoPercent - LVO probability percentage
 * @returns {string} HTML for tachometer gauge
 */
function renderTachometerGauge(ichPercent, lvoPercent) {
  const ratio = lvoPercent / Math.max(ichPercent, 1);

  return `
    <div class="tachometer-section">
      <div class="tachometer-card">
        <div class="tachometer-header">
          <h3>🎯 ${i18n.getCurrentLanguage() === 'de' ? 'Entscheidungshilfe – LVO/ICH' : 'Decision Support – LVO/ICH'}</h3>
          <div class="ratio-display">LVO/ICH Ratio: ${ratio.toFixed(2)}</div>
        </div>
        
        <div class="tachometer-gauge" id="tachometer-canvas-container">
          <div data-react-tachometer data-ich="${ichPercent}" data-lvo="${lvoPercent}" data-title="${i18n.getCurrentLanguage() === 'de' ? 'Entscheidungshilfe – LVO/ICH' : 'Decision Support – LVO/ICH'}"></div>
        </div>

        <!-- Legend chips for zones -->
        <div class="tachometer-legend" aria-hidden="true">
          <span class="legend-chip ich">ICH</span>
          <span class="legend-chip uncertain">${i18n.getCurrentLanguage() === 'de' ? 'Unsicher' : 'Uncertain'}</span>
          <span class="legend-chip lvo">LVO</span>
        </div>

        <!-- Metrics row: ratio, confidence, absolute difference -->
        <div class="metrics-row" role="group" aria-label="Tachometer metrics">
          <div class="metric-card">
            <div class="metric-label">Ratio</div>
            <div class="metric-value">${ratio.toFixed(2)}</div>
            <div class="metric-unit">LVO/ICH</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Confidence</div>
            <div class="metric-value">${(() => {
    const diff = Math.abs(lvoPercent - ichPercent);
    const maxP = Math.max(lvoPercent, ichPercent);
    let c = diff < 10 ? Math.round(30 + maxP * 0.3) : diff < 20 ? Math.round(50 + maxP * 0.4) : Math.round(70 + maxP * 0.3);
    c = Math.max(0, Math.min(100, c));
    return c;
  })()}%</div>
            <div class="metric-unit">percent</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Difference</div>
            <div class="metric-value">${Math.abs(lvoPercent - ichPercent).toFixed(0)}%</div>
            <div class="metric-unit">|LVO − ICH|</div>
          </div>
        </div>
        
        <div class="probability-summary">
          ICH: ${ichPercent}% | LVO: ${lvoPercent}%
        </div>
        
        <!-- Hidden probability summary for initialization -->
        <div class="probability-summary" style="display: none;">
          ICH: ${ichPercent}% | LVO: ${lvoPercent}%
        </div>
      </div>
    </div>
  `;
}

// Premium (vanilla) tachometer disabled in favor of React island gauge
