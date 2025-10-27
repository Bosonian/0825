/**
 * Hospital Selector Component
 * Shows nearby hospitals for case transmission
 */
import { COMPREHENSIVE_HOSPITAL_DATABASE } from '../../data/comprehensive-stroke-centers.js';
import { gpsTracker } from '../../services/gps-tracker.js';

export class HospitalSelector {
  constructor() {
    this.currentLocation = null;
    this.hospitals = [];
    this.selectedHospital = null;
    this.onSelect = null;
  }

  /**
   * Show hospital selector modal
   * @param {Function} onSelectCallback - Callback when hospital is selected
   * @returns {Promise<void>}
   */
  async show(onSelectCallback) {
    this.onSelect = onSelectCallback;

    try {
      // Get current location
      this.currentLocation = await gpsTracker.getCurrentLocation();

      // Get nearby hospitals
      this.hospitals = this.getNearbyHospitals(this.currentLocation, 50); // 50km radius

      // Render modal
      this.render();

      // Add event listeners
      this.attachEventListeners();
    } catch (error) {
      console.error('[HospitalSelector] Error:', error);
      this.showError(error.message);
    }
  }

  /**
   * Get hospitals within radius
   */
  getNearbyHospitals(location, radiusKm) {
    const allHospitals = [];

    // Collect all hospitals from all states
    Object.values(COMPREHENSIVE_HOSPITAL_DATABASE).forEach((state) => {
      if (state.neurosurgicalCenters) {
        allHospitals.push(...state.neurosurgicalCenters);
      }
      if (state.comprehensiveStrokeCenters) {
        allHospitals.push(...state.comprehensiveStrokeCenters);
      }
      if (state.regionalStrokeUnits) {
        allHospitals.push(...state.regionalStrokeUnits);
      }
    });

    // Calculate distance and filter
    const hospitalsWithDistance = allHospitals
      .map((hospital) => ({
        ...hospital,
        distance: this.calculateDistance(
          location.latitude,
          location.longitude,
          hospital.coordinates.lat,
          hospital.coordinates.lng,
        ),
      }))
      .filter((h) => h.distance <= radiusKm)
      .sort((a, b) => {
        // Sort by capability first, then distance
        const capabilityScore = (h) => {
          let score = 0;
          if (h.neurosurgery) {
            score += 100;
          }
          if (h.thrombectomy) {
            score += 50;
          }
          if (h.thrombolysis) {
            score += 25;
          }
          return score;
        };

        const scoreDiff = capabilityScore(b) - capabilityScore(a);
        if (scoreDiff !== 0) {
          return scoreDiff;
        }

        return a.distance - b.distance;
      });

    return hospitalsWithDistance.slice(0, 10); // Top 10
  }

  /**
   * Calculate distance (Haversine)
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(this.toRad(lat1))
        * Math.cos(this.toRad(lat2))
        * Math.sin(dLon / 2)
        * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal
  }

  toRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Render the modal
   */
  render() {
    const modalHTML = `
      <div class="hospital-selector-overlay" id="hospitalSelectorModal">
        <div class="hospital-selector-modal">
          <div class="modal-header">
            <h2>🏥 Zielkrankenhaus auswählen / Select Hospital</h2>
            <button class="close-button" id="closeHospitalSelector">✕</button>
          </div>

          <div class="current-location">
            <p>📍 Aktueller Standort / Current Location:</p>
            <p class="location-coords">
              ${this.currentLocation.latitude.toFixed(6)}, ${this.currentLocation.longitude.toFixed(6)}
            </p>
          </div>

          <div class="hospital-list">
            ${this.hospitals.length > 0
    ? this.hospitals.map((hospital, index) => this.renderHospitalCard(hospital, index)).join('')
    : '<p class="no-hospitals">Keine Krankenhäuser in der Nähe gefunden / No nearby hospitals found</p>'
}
          </div>

          <div class="modal-footer">
            <button class="secondary" id="cancelHospitalSelect">Abbrechen / Cancel</button>
          </div>
        </div>
      </div>
    `;

    // Add to body
    const container = document.createElement('div');
    container.innerHTML = modalHTML;
    document.body.appendChild(container.firstElementChild);
  }

  /**
   * Render individual hospital card
   */
  renderHospitalCard(hospital, index) {
    const capabilities = [];
    if (hospital.neurosurgery) {
      capabilities.push('<span class="capability-badge neurosurgery" title="Neurosurgery">🧠 NS</span>');
    }
    if (hospital.thrombectomy) {
      capabilities.push('<span class="capability-badge thrombectomy" title="Thrombectomy">🩸 TE</span>');
    }
    if (hospital.thrombolysis) {
      capabilities.push('<span class="capability-badge thrombolysis" title="Thrombolysis">💉 TL</span>');
    }

    return `
      <div class="hospital-card ${index === 0 ? 'recommended' : ''}" data-hospital-index="${index}">
        <div class="hospital-header">
          <div class="hospital-name-section">
            <h3>${hospital.name}</h3>
            ${index === 0 ? '<span class="recommended-badge">Empfohlen / Recommended</span>' : ''}
          </div>
          <div class="hospital-distance">
            <span class="distance-value">${hospital.distance}</span>
            <span class="distance-unit">km</span>
          </div>
        </div>

        <div class="hospital-details">
          <p class="address">📍 ${hospital.address}</p>
          <p class="phone">📞 ${hospital.emergency || hospital.phone}</p>

          <div class="capabilities">
            ${capabilities.join('')}
            ${hospital.network ? `<span class="network-badge">${hospital.network}</span>` : ''}
          </div>

          <div class="hospital-meta">
            <span>${hospital.beds} Betten / Beds</span>
          </div>
        </div>

        <button class="select-hospital-button" data-hospital-index="${index}">
          Auswählen / Select →
        </button>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const modal = document.getElementById('hospitalSelectorModal');
    if (!modal) {
      return;
    }

    // Close button
    const closeButton = document.getElementById('closeHospitalSelector');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }

    // Cancel button
    const cancelButton = document.getElementById('cancelHospitalSelect');
    if (cancelButton) {
      cancelButton.addEventListener('click', () => this.close());
    }

    // Select hospital buttons
    const selectButtons = modal.querySelectorAll('.select-hospital-button');
    selectButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.hospitalIndex);
        this.selectHospital(index);
      });
    });

    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.close();
      }
    });

    // ESC key to close
    document.addEventListener('keydown', this.handleEscKey);
  }

  /**
   * Handle ESC key
   */
  handleEscKey = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  /**
   * Select hospital
   */
  selectHospital(index) {
    this.selectedHospital = this.hospitals[index];

    console.log('[HospitalSelector] Hospital selected:', this.selectedHospital.name);

    // Call callback
    if (this.onSelect) {
      this.onSelect(this.selectedHospital);
    }

    // Close modal
    this.close();
  }

  /**
   * Show error
   */
  showError(message) {
    const errorHTML = `
      <div class="hospital-selector-overlay" id="hospitalSelectorModal">
        <div class="hospital-selector-modal error">
          <div class="modal-header">
            <h2>⚠️ Fehler / Error</h2>
            <button class="close-button" id="closeHospitalSelector">✕</button>
          </div>

          <div class="error-message">
            <p>${message}</p>
            <p class="error-hint">Bitte überprüfen Sie Ihre Standortfreigabe / Please check your location permissions</p>
          </div>

          <div class="modal-footer">
            <button class="secondary" id="closeHospitalSelector">Schließen / Close</button>
          </div>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = errorHTML;
    document.body.appendChild(container.firstElementChild);

    // Attach close listener
    document.getElementById('closeHospitalSelector')?.addEventListener('click', () => this.close());
  }

  /**
   * Close modal
   */
  close() {
    const modal = document.getElementById('hospitalSelectorModal');
    if (modal) {
      modal.remove();
    }

    // Remove ESC listener
    document.removeEventListener('keydown', this.handleEscKey);
  }
}

// Export singleton
export const hospitalSelector = new HospitalSelector();
