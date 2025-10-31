export function renderProgressIndicator(currentStep) {
  const steps = [
    { id: 1, label: 'Triage', icon: '🎯' },
    { id: 2, label: 'Assessment', icon: '📋' },
    { id: 3, label: 'Results', icon: '📊' },
  ];

  let html = '<div class="progress-indicator">';
  steps.forEach((step, index) => {
    const isActive = step.id === currentStep;
    const isCompleted = step.id < currentStep;
    html += `
      <div class="progress-step-container">
        <div class="progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"
             aria-label="${step.label}"
             title="${step.label}">
          ${isCompleted ? '✓' : step.id}
        </div>
        <div class="progress-label ${isActive ? 'active' : ''}">${step.label}</div>
      </div>
    `;
    if (index < steps.length - 1) {
      html += `<div class="progress-line ${isCompleted ? 'completed' : ''}"></div>`;
    }
  });
  html += '</div>';
  return html;
}
