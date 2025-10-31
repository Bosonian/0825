import { i18n } from '../../localization/i18n.js';

export function renderProgressIndicator(currentStep) {
  const steps = [
    { id: 1, labelKey: 'progressTriage', icon: '🎯' },
    { id: 2, labelKey: 'progressAssessment', icon: '📋' },
    { id: 3, labelKey: 'progressResults', icon: '📊' },
  ];

  let html = '<div class="progress-indicator">';
  steps.forEach((step, index) => {
    const isActive = step.id === currentStep;
    const isCompleted = step.id < currentStep;
    const label = i18n.t(step.labelKey);

    html += `
      <div class="progress-step-container">
        <div class="progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"
             aria-label="${label}"
             title="${label}">
          ${isCompleted ? '✓' : step.id}
        </div>
        <div class="progress-label ${isActive ? 'active' : ''}">${label}</div>
      </div>
    `;
    if (index < steps.length - 1) {
      html += `<div class="progress-line ${isCompleted ? 'completed' : ''}"></div>`;
    }
  });
  html += '</div>';
  return html;
}
