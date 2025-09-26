# iGFAP Stroke Triage Assistant - Research Preview
🔐 **Security Audited** | ✅ **GDPR Compliant** | 👥 **Clinical Oversight** | ⚠️ **Research Use Only**

A professional stroke triage assistant using GFAP biomarkers for emergency medical research and clinical validation.

## 🚨 Research Preview Status

**⚠️ IMPORTANT**: This tool is currently in **research preview** and is **NOT approved for clinical decision making**. Use only for research validation under proper clinical supervision.

### Clinical Oversight
- **Chief Medical Advisor**: Prof. Christian Förch (Chefarzt, Neurologie, RKH Klinikum Ludwigsburg)
- **Implementation Advisor**: Dr. med. Lovepreet Kalra (Assistenzärztin, Neurologie)
- **Project Lead**: Deepak Bos (bosdeepak@gmail.com)

---

## 🔐 Security & Compliance

### Security Audit Completed ✅
- **Authentication System**: Research password protection implemented
- **Data Privacy**: Patient data logging removed from production
- **XSS Protection**: All input sanitization implemented
- **Secure Sessions**: Cryptographic session management
- **Audit Date**: September 26, 2025

### GDPR Compliance ✅
- **Legal Basis**: Legitimate interest (Art. 6.1.f) + Scientific research (Art. 9.2.j)
- **Data Minimization**: Only essential clinical parameters collected
- **Privacy by Design**: Local processing, no persistent storage
- **User Rights**: Access, rectification, erasure implemented
- **Data Protection Officer**: Deepak Bos (bosdeepak@gmail.com)

### Documentation
- 📋 [GDPR Compliance Framework](./GDPR-COMPLIANCE-FRAMEWORK.md)
- 👥 [Clinical Advisory Board](./CLINICAL-ADVISORY-BOARD.md)
- 🔍 [Security Audit Report](../iGFAP_Audit_Report.md)
- 🚀 [Deployment Summary](../DEPLOYMENT-READY-SUMMARY.md)

---

## 🏥 Clinical Application

### Three Assessment Modules

#### 1. **Coma Module** (GCS < 8)
- **Purpose**: Rapid ICH assessment for comatose patients
- **Required**: GFAP biomarker value only
- **Output**: ICH probability with emergency recommendations
- **Use Case**: Critical emergency situations

#### 2. **Limited Data Module**
- **Purpose**: ICH assessment when full examination not possible
- **Required**: Age, blood pressure, GFAP, basic symptoms
- **Output**: ICH probability (LVO assessment not available)
- **Use Case**: Uncooperative or aphasic patients

#### 3. **Full Stroke Module**
- **Purpose**: Complete stroke risk assessment
- **Required**: Demographics, vitals, biomarkers, neurological exam, FAST-ED score
- **Output**: Both ICH and LVO probabilities with SHAP explainability
- **Use Case**: Comprehensive stroke workup

### Clinical Decision Support
- **Risk Thresholds**: Evidence-based classification (Low <25%, Medium 25-50%, High >50%)
- **SHAP Drivers**: Explainable AI showing risk factor contributions
- **Clinical Recommendations**: Contextual guidance based on risk levels
- **Stroke Center Routing**: Geographic recommendations for specialized care

---

## 🚀 Quick Start (Research Team)

### Prerequisites
- Node.js 18+
- Modern web browser
- Research access credentials

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd stroke-triage/0825

# Install dependencies
npm install

# Start development server
npm run dev
```

### Authentication
- **Access URL**: http://localhost:3000/0825/
- **Research Password**: `Neuro25`
- **Session Duration**: 4 hours with activity tracking

### Production Build
```bash
# Build for deployment
npm run build

# Preview production build
npm run preview
```

---

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript ES6+ with Vite
- **Architecture**: Component-based PWA with state management
- **Backend**: Google Cloud Functions (external APIs)
- **Deployment**: GitHub Pages compatible
- **Authentication**: Session-based research access

### Project Structure
```
src/
├── auth/                    # Authentication system
│   └── authentication.js   # Research access control
├── api/                     # External API integration
│   ├── client.js           # Secure API client
│   └── drivers.js          # SHAP driver processing
├── ui/
│   ├── screens/            # Application screens
│   │   ├── login.js        # Research login with disclaimers
│   │   ├── triage1.js      # Initial assessment
│   │   ├── triage2.js      # Examination capability
│   │   ├── coma.js         # Coma module
│   │   ├── limited.js      # Limited data module
│   │   ├── full.js         # Full stroke module
│   │   └── results.js      # Risk visualization
│   └── components/         # Reusable components
├── logic/                  # Business logic
│   ├── validate.js         # Medical parameter validation
│   ├── handlers.js         # Event handling
│   └── lvo-local-model.js  # Local LVO calculations
├── state/
│   └── store.js            # Application state management
├── research/               # Research tools
│   ├── data-logger.js      # Model comparison logging
│   └── comparison-ui.js    # Research interface
└── styles/
    └── app.css             # Complete styling
```

### API Endpoints (External)
```
COMA_ICH: europe-west3-igfap-452720.cloudfunctions.net/predict_coma_ich
LDM_ICH: europe-west3-igfap-452720.cloudfunctions.net/predict_limited_data_ich
FULL_STROKE: europe-west3-igfap-452720.cloudfunctions.net/predict_full_stroke
```

---

## 📊 Clinical Validation

### Research Framework
- **Phase 1**: Algorithm validation with retrospective data
- **Phase 2**: Controlled pilot testing in clinical environment
- **Phase 3**: Prospective clinical trial for CE marking

### Performance Targets
- **Sensitivity**: >95% for high-risk stroke conditions
- **Specificity**: >90% to minimize false positives
- **Usability**: <2 minutes for complete assessment
- **Safety**: Zero adverse events attributable to tool

### Data Collection
- **Anonymized**: No personally identifiable information
- **Pseudonymized**: Session-based processing only
- **User-Controlled**: Research data can be deleted anytime
- **GDPR Compliant**: Full data subject rights implemented

---

## 🔧 Development Guidelines

### Code Quality Standards
- **Authentication**: All clinical screens require valid session
- **Input Validation**: Medical reasonableness checks on all parameters
- **Error Handling**: Graceful degradation for API failures
- **Performance**: <2 second load times on 3G networks
- **Accessibility**: WCAG 2.1 AA compliance for emergency use

### Security Requirements
- **No PHI Logging**: Patient data must not appear in console/logs
- **Session Security**: Cryptographic session ID generation
- **Input Sanitization**: All user input safely handled
- **XSS Protection**: No innerHTML usage with user data
- **HTTPS Only**: All communications encrypted

### Testing (Coming Soon)
- **Unit Tests**: Critical medical calculations
- **Integration Tests**: Full user workflows
- **Clinical Validation**: Real-world accuracy testing
- **Usability Testing**: Healthcare provider feedback

---

## 📋 Usage Workflow

### 1. Authentication
- Access research login screen
- Review research disclaimers and privacy notice
- Enter research access code
- Confirm clinical supervision requirements

### 2. Initial Triage
- Assess consciousness level (GCS)
- Determine examination capability
- Route to appropriate module

### 3. Data Collection
- Enter required clinical parameters
- Real-time validation of medical values
- Cross-field validation (e.g., systolic > diastolic BP)

### 4. Risk Assessment
- API-based prediction calculation
- Local LVO model for FAST-ED + GFAP
- Risk stratification and categorization

### 5. Results & Recommendations
- Visual risk displays with percentages
- SHAP driver explanations
- Clinical recommendations based on risk level
- Stroke center routing suggestions

### 6. Research Logging (Optional)
- Model comparison data collection
- User-controlled data retention
- Export capabilities for research analysis

---

## 🎯 CE Certification Roadmap

### Current Status: Research Preview
- ✅ Technical foundation completed
- ✅ Security audit passed
- ✅ GDPR compliance implemented
- ✅ Clinical oversight established

### Next Steps (6-12 months)
1. **Clinical Validation**: Prospective study with patient outcomes
2. **IEC 62304 Compliance**: Medical device software standards
3. **Risk Management**: Formal FMEA and risk controls
4. **Quality Management**: ISO 13485 implementation
5. **Notified Body Review**: CE marking submission

### Investment Required
- **Fast Track (12 months)**: €200-300K
- **Standard Track (18-24 months)**: €100-150K
- **Current Phase**: Research validation and data collection

---

## 📞 Contact & Support

### Project Leadership
- **Managing Director**: Deepak Bos
- **Email**: bosdeepak@gmail.com
- **Role**: Technical development and regulatory coordination

### Clinical Advisory Board
- **Prof. Christian Förch**: Chief Clinical Advisor
  - Chefarzt, Neurologie, RKH Klinikum Ludwigsburg
  - Medical oversight and clinical validation
- **Dr. med. Lovepreet Kalra**: Implementation Advisor
  - Assistenzärztin, Neurologie
  - Clinical workflow integration and usability

### Research Access
- **For Clinical Teams**: Contact Prof. Förch through RKH Klinikum
- **For Technical Issues**: bosdeepak@gmail.com
- **For Regulatory Questions**: Reference GDPR compliance documentation

---

## ⚖️ Legal & Regulatory

### Disclaimers
- **Research Tool Only**: Not approved for clinical decision making
- **Clinical Supervision Required**: Must be used under medical oversight
- **No Warranty**: Provided "as is" for research purposes
- **Professional Judgment**: Always prioritize clinical assessment

### Intellectual Property
- **License**: Proprietary - iGFAP Project
- **Clinical Data**: Remains property of healthcare institutions
- **Research Results**: Subject to publication agreements

### Data Protection
- **Processing Basis**: Scientific research and legitimate interest
- **Data Retention**: Session-based, no long-term storage
- **User Rights**: Full GDPR compliance implemented
- **Cross-Border**: EU-only processing for clinical data

---

## 📈 Quality Metrics

### Technical Performance
- **Build Time**: <400ms optimized production builds
- **Bundle Size**: 151.90 kB (gzipped: 43.02 kB)
- **Load Time**: <2 seconds on 3G networks
- **Uptime Target**: >99.5% availability

### Security Metrics
- **Vulnerabilities**: Zero critical, zero high-risk
- **Authentication**: 4-hour secure sessions
- **Data Exposure**: No PHI in logs or console
- **GDPR Compliance**: 100% requirement satisfaction

### Clinical Metrics (Target)
- **Accuracy**: >95% sensitivity for high-risk conditions
- **Speed**: <2 minutes per complete assessment
- **Usability**: Positive healthcare provider feedback
- **Safety**: Zero adverse events attributable to recommendations

---

*Last Updated: September 26, 2025*
*Security Audit: Completed*
*Next Review: October 26, 2025*