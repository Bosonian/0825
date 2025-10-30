# Medical Context for Stroke Triage Assistant
## Essential Medical Knowledge for AI Agents

**Last Updated**: 2025-10-30
**Version**: 2.1

---

## Critical Value Ranges

### Biomarkers
- **GFAP** (Glial Fibrillary Acidic Protein): 29-10001 pg/mL
  - Purpose: ICH (intracerebral hemorrhage) prediction biomarker
  - Critical threshold: >150 pg/mL suggests increased ICH risk
  - Source: Clinical validation studies

### Vital Signs
- **Age**: 18-120 years
- **Blood Pressure (Systolic)**: 40-300 mmHg
- **Blood Pressure (Diastolic)**: 20-200 mmHg
- **Heart Rate**: 30-250 bpm

### Neurological Scales
- **GCS** (Glasgow Coma Scale): 3-15
  - 3 = Deep coma (worst)
  - 15 = Fully alert (best)
  - <9 = Comatose (requires special assessment pathway)

- **NIHSS** (NIH Stroke Scale): 0-42
  - 0 = No stroke symptoms
  - 42 = Severe stroke
  - >15 = Major stroke

- **FASTED Score**: 0-6
  - Facial palsy (0-1)
  - Arm weakness (0-1)
  - Speech (0-1)
  - Time (0-1)
  - Eye deviation (0-1)
  - Denial/neglect (0-2)
  - ≥4 = Likely LVO (large vessel occlusion)

---

## Risk Thresholds (Evidence-Based)

### ICH Probability
- **Critical** (>70%): Immediate neurosurgical consultation
- **High** (50-70%): Urgent CT imaging, BP management
- **Medium** (30-50%): CT imaging within 1 hour
- **Low** (<30%): Standard stroke protocol

### LVO Probability
- **High** (>50%): Consider mechanical thrombectomy
- **Medium** (30-50%): Monitor, prepare for intervention
- **Low** (<30%): Standard thrombolysis protocol

---

## Clinical Decision Rules

### Module Selection
1. **GCS < 9** → Coma Module (limited assessment)
2. **GCS ≥ 9 + Full examination possible** → Full Stroke Module
3. **GCS ≥ 9 + Limited examination** → Limited Data Module

### ICH Volume Calculation
**Formula**: ABC/2
```
volume_ml = (length_cm × width_cm × height_cm) / 2
```
- Measured from CT imaging
- Length = longest diameter
- Width = perpendicular to length
- Height = number of slices × slice thickness

### FASTED Score Interpretation
- **Score 0-3**: Low LVO probability, standard care
- **Score 4-6**: High LVO probability, consider comprehensive stroke center transfer

---

## Medical Safety Rules

### Data Display
1. **Never display probability >99.9%** (avoid false certainty)
2. **Always show confidence intervals** when available
3. **Round probabilities** to 1 decimal place
4. **Display units clearly** (pg/mL, mmHg, etc.)

### Clinical Validation
1. **Require manual clinical confirmation** for critical decisions
2. **Log all predictions** for audit trail (30-day minimum retention)
3. **Never auto-execute** medical interventions
4. **Provide source/evidence** for recommendations

### Error Handling
1. **Reject invalid inputs** (don't process garbage data)
2. **Fail safe** (default to more conservative risk assessment)
3. **Alert on missing critical data**
4. **Never proceed with incomplete required fields**

---

## Medication Considerations

### Anticoagulants (Increase ICH Risk)
- **NOACs/DOACs** (Novel/Direct Oral Anticoagulants)
  - Dabigatran, Rivaroxaban, Apixaban, Edoxaban
  - Significantly increases bleeding risk

- **Warfarin** (Vitamin K antagonist)
  - Monitor INR (International Normalized Ratio)

- **Heparin** (Injectable)
  - Immediate anticoagulation

### Antiplatelets
- **Aspirin**, **Clopidogrel**, **Dipyridamole**
- Moderate bleeding risk increase

---

## Regulatory Compliance

### HIPAA Requirements
- **No PHI in logs** (Protected Health Information)
  - ❌ Don't log: Names, addresses, dates of birth, medical record numbers
  - ✅ Can log: Anonymized metrics, aggregated statistics

- **Data retention**: Minimum 30 days, maximum as per local regulations
- **Access control**: Only authorized clinical staff
- **Audit trail**: Log all data access and modifications

### GDPR Compliance (EU)
- **Right to deletion**: Ability to delete patient data on request
- **Data minimization**: Only collect necessary data
- **Consent tracking**: Document patient consent
- **Data portability**: Export data in standard format

### FDA Considerations (Class II Device)
- **Clinical validation**: Evidence-based thresholds
- **Performance monitoring**: Track prediction accuracy
- **Adverse event reporting**: Log any patient safety issues
- **Version control**: Track software changes affecting clinical decisions

---

## Clinical Workflow Integration

### Time-Critical Actions

**Within 0-10 minutes** (Door to assessment):
- Initial GCS assessment
- Vital signs measurement
- GFAP blood sample collection

**Within 10-20 minutes** (GFAP result):
- Enter data into stroke triage system
- Get ICH probability prediction
- Clinical decision: CT immediately vs standard protocol

**Within 20-30 minutes** (Imaging decision):
- If ICH risk >50%: Immediate CT
- If ICH risk 30-50%: CT within 1 hour
- If ICH risk <30%: Standard protocol

**Within 60 minutes** (Treatment decision):
- Thrombolysis decision (if ischemic stroke)
- Neurosurgical consultation (if ICH)
- Transfer to comprehensive center (if LVO)

---

## Common Pitfalls to Avoid

### ❌ Don't Do This

1. **Don't trust user input blindly**
   - Validate all ranges
   - Reject impossible values (GCS=20, Age=250, GFAP=999999)

2. **Don't mix up units**
   - GFAP in pg/mL (not ng/mL)
   - Blood pressure in mmHg (not kPa)
   - Time in minutes (not seconds)

3. **Don't ignore edge cases**
   - GCS = 3 (minimum, extremely critical)
   - GFAP at range limits (29 or 10001)
   - Missing optional fields

4. **Don't override clinical judgment**
   - AI is decision support, not decision maker
   - Clinical context matters (patient history, other findings)

### ✅ Do This

1. **Validate inputs strictly**
   ```javascript
   if (gfap < 29 || gfap > 10001) {
     throw new Error('GFAP out of valid range (29-10001 pg/mL)');
   }
   ```

2. **Provide context with predictions**
   ```javascript
   {
     prediction: 0.75,
     confidence: 0.85,
     interpretation: "High ICH risk (75%) - Recommend immediate CT imaging",
     evidence: "Based on GFAP=450 pg/mL, Age=70, GCS=12"
   }
   ```

3. **Fail safely**
   ```javascript
   if (!gfapValue) {
     return {
       error: "GFAP value required for ICH prediction",
       fallback: "Use clinical judgment and imaging"
     };
   }
   ```

---

## Medical Terminology Quick Reference

| Term | Full Name | Meaning |
|------|-----------|---------|
| ICH | Intracerebral Hemorrhage | Bleeding in brain tissue |
| LVO | Large Vessel Occlusion | Major artery blocked |
| GFAP | Glial Fibrillary Acidic Protein | Brain injury biomarker |
| GCS | Glasgow Coma Scale | Consciousness level |
| NIHSS | NIH Stroke Scale | Stroke severity score |
| CT | Computed Tomography | Brain imaging |
| MRI | Magnetic Resonance Imaging | Detailed brain scan |
| tPA | Tissue Plasminogen Activator | Clot-dissolving drug |
| NOAK/DOAC | Novel/Direct Oral Anticoagulants | Blood thinners |
| BP | Blood Pressure | Systolic/Diastolic |
| HR | Heart Rate | Beats per minute |

---

## Evidence Base

### Key Publications

1. **GFAP for ICH prediction**
   - Luger et al., Neurology (2017)
   - Sensitivity: 89%, Specificity: 81%

2. **FASTED Score for LVO**
   - Lima et al., Stroke (2016)
   - Sensitivity: 81%, Specificity: 61%

3. **ABC/2 Volume Calculation**
   - Kothari et al., Stroke (1996)
   - Accuracy: ±30% vs. planimetric method

---

## Contact Information

**Clinical Advisory**:
- Prof. Christian Förch (Neurology, RKH Klinikum Ludwigsburg)
- Dr. Lovepreet Kalra (Neurology)

**Technical Contact**:
- Deepak Bos (bosdeepak@gmail.com)

**Emergency Medical Protocol Questions**:
- Refer to institutional stroke protocol
- Neurology on-call: [Institution-specific]

---

## Version History

- **2.1** (2025-10-30): Added agent optimization context
- **2.0** (2025-08-31): Updated with kiosk integration
- **1.0** (2025-01-15): Initial medical context

---

**This context should be loaded automatically by hooks and consulted by all medical-related agents.** 🏥
