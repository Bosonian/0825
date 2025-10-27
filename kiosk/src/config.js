/**
 * Kiosk Configuration
 */

// Check if running in development
const isDevelopment = import.meta.env.DEV;

export const KIOSK_CONFIG = {
  // API Configuration
  caseSharingUrl: isDevelopment
    ? 'http://localhost:8080' // Local Cloud Function emulator
    : 'https://case-sharing-564499947017.europe-west3.run.app',

  // Polling interval (milliseconds)
  pollInterval: 5000, // 5 seconds

  // Auto-archive time (matches server)
  autoArchiveHours: 2,

  // GPS stale warning threshold
  staleGpsMinutes: 5,

  // Hospital ID (configure per kiosk installation)
  // Leave as null to show all cases, or set to specific hospital ID
  hospitalId: null, // e.g., 'BY-NS-001' for LMU Klinikum München

  // Hospital name for display
  hospitalName: 'Notaufnahme', // Update per installation

  // Google Maps API Key (for live tracking map)
  googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY_HERE',

  // Alert settings
  playAudioAlert: true,
  audioAlertVolume: 0.5, // 0.0 to 1.0

  // Display settings
  showArchivedCases: false, // Hide archived cases
  maxCasesDisplay: 20, // Maximum cases to show

  // Theme
  theme: 'dark', // 'dark' or 'light'
};

export const URGENCY_CONFIG = {
  IMMEDIATE: {
    color: '#ff4444',
    icon: '🚨',
    priority: 0,
  },
  TIME_CRITICAL: {
    color: '#ff8800',
    icon: '⏰',
    priority: 1,
  },
  URGENT: {
    color: '#ffcc00',
    icon: '⚠️',
    priority: 2,
  },
  STANDARD: {
    color: '#4a90e2',
    icon: '🏥',
    priority: 3,
  },
};
