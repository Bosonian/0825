import { renderProgressIndicator } from '../components/progress.js';
import { t } from '../../localization/i18n.js';

export function renderTriage1() {
  return `
    <div class="container">
      ${renderProgressIndicator(1)}
      <h2>${t('triage1Title')}</h2>
      <div class="triage-question">
        ${t('triage1Question')}
        <small class="help-text" title="Glasgow Coma Scale less than 9 indicates comatose state">
          ${t('triage1Help')}
          <span class="info-icon" aria-label="More information">ℹ️</span>
        </small>
      </div>
      <div class="triage-buttons">
        <button class="yes-btn triage-btn-enhanced" data-action="triage1" data-value="true">
          <span class="btn-icon">⚠️</span>
          <span class="btn-content">
            <span class="btn-primary-text">${t('triage1Yes')}</span>
            <span class="btn-secondary-text">GCS < 9</span>
          </span>
        </button>
        <button class="no-btn triage-btn-enhanced" data-action="triage1" data-value="false">
          <span class="btn-icon">✓</span>
          <span class="btn-content">
            <span class="btn-primary-text">${t('triage1No')}</span>
            <span class="btn-secondary-text">GCS ≥ 9</span>
          </span>
        </button>
      </div>
    </div>
  `;
}
