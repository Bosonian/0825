/**
 * Case Share Link Service
 * Handles generating shareable links and managing shared case state
 */

/**
 * Generate unique case code
 * Format: ABC1234 (3 letters + 4 digits)
 */
function generateCaseCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  let code = '';

  // 3 random letters
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // 4 random digits
  for (let i = 0; i < 4; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return code;
}

/**
 * Generate shareable link for current case
 * @returns {string} Shareable URL
 */
export function generateShareLink() {
  const caseCode = generateCaseCode();
  const timestamp = Date.now();

  // Store case data in sessionStorage with code
  const caseData = {
    code: caseCode,
    timestamp,
  };

  sessionStorage.setItem(`case_${caseCode}`, JSON.stringify(caseData));

  // Generate URL
  const baseUrl = window.location.origin;
  const path = window.location.pathname;
  const shareUrl = `${baseUrl}${path}#/results?caseId=${caseCode}&source=shared&ts=${timestamp}`;

  console.log('[CaseShareLink] Generated share link:', shareUrl);

  return shareUrl;
}

/**
 * Copy link to clipboard
 * @param {string} link - Link to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(link) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(link);
      console.log('[CaseShareLink] Link copied to clipboard');
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = link;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  } catch (error) {
    console.error('[CaseShareLink] Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Check if current page was loaded from shared link
 * @returns {Object} {isShared, caseId, timestamp}
 */
export function detectSharedLink() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const source = params.get('source');
  const caseId = params.get('caseId');
  const timestamp = parseInt(params.get('ts')) || 0;

  const isShared = source === 'shared' && !!caseId;

  if (isShared) {
    console.log('[CaseShareLink] Detected shared link:', { caseId, timestamp });
  }

  return {
    isShared,
    caseId: caseId || null,
    timestamp,
  };
}

/**
 * Check if case is expired (> 1 hour old)
 * @param {number} timestamp - Case timestamp
 * @returns {boolean}
 */
export function isCaseExpired(timestamp) {
  if (!timestamp) return false;

  const now = Date.now();
  const age = now - timestamp;
  const oneHour = 60 * 60 * 1000;

  return age > oneHour;
}

/**
 * Submit acknowledgment that case was seen by AvD
 * @param {string} caseId - Case ID
 * @returns {Promise<boolean>}
 */
export async function submitAcknowledgment(caseId) {
  try {
    console.log('[CaseShareLink] Submitting acknowledgment for case:', caseId);

    // For now, just store locally
    // TODO: Send to backend when endpoint is ready
    const acknowledgment = {
      caseId,
      timestamp: Date.now(),
      acknowledged: true,
    };

    localStorage.setItem(`ack_${caseId}`, JSON.stringify(acknowledgment));

    return true;
  } catch (error) {
    console.error('[CaseShareLink] Failed to submit acknowledgment:', error);
    return false;
  }
}

/**
 * Check if case has been acknowledged
 * @param {string} caseId - Case ID
 * @returns {boolean}
 */
export function isAcknowledged(caseId) {
  try {
    const ack = localStorage.getItem(`ack_${caseId}`);
    if (!ack) return false;

    const acknowledgment = JSON.parse(ack);
    return acknowledgment.acknowledged === true;
  } catch (error) {
    return false;
  }
}
