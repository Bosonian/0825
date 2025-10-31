import { renderProgressIndicator } from '../components/progress.js';
import { GFAP_RANGES } from '../../config.js';
import { t } from '../../localization/i18n.js';

export function renderComa() {
  return `
    <div class="container">
      ${renderProgressIndicator(2)}
      <div class="module-header">
        <span class="module-icon">🧠</span>
        <h2>${t('comaModuleTitle') || 'Coma Module'}</h2>
        <p class="module-subtitle">For patients with Glasgow Coma Scale < 9</p>
      </div>
      <form data-module="coma">
        <div class="input-grid">
          <div class="input-group enhanced-input">
            <label for="gfap_value" class="enhanced-label">
              <span class="label-icon">🔬</span>
              <span class="label-text">
                <span class="label-primary">${t('gfapValueLabel')}</span>
                <span class="label-secondary">Glial Fibrillary Acidic Protein</span>
              </span>
              <span class="tooltip info-tooltip">ℹ️
                <span class="tooltiptext">${t('gfapTooltipLong')}</span>
              </span>
            </label>
            <div class="input-wrapper">
              <input
                type="number"
                id="gfap_value"
                name="gfap_value"
                min="${GFAP_RANGES.min}"
                max="${GFAP_RANGES.max}"
                step="0.1"
                required
                aria-describedby="gfap-help"
                placeholder="Enter value (e.g., 150.5)"
                class="enhanced-number-input"
              >
              <span class="input-unit">pg/mL</span>
            </div>
            <div id="gfap-help" class="input-help enhanced-help">
              <span class="help-icon">📊</span>
              <span>${t('gfapRange').replace('{min}', GFAP_RANGES.min).replace('{max}', GFAP_RANGES.max)}</span>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <button type="submit" class="primary btn-enhanced">
            <span class="btn-icon">🔍</span>
            <span class="btn-text">${t('analyzeIchRisk')}</span>
          </button>
          <button type="button" class="secondary btn-enhanced" data-action="reset">
            <span class="btn-icon">↻</span>
            <span class="btn-text">${t('startOver')}</span>
          </button>
        </div>
      </form>
    </div>
  `;
}
