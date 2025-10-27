//
//  LocalizedStrings.swift
//  iGFAP Stroke Triage Assistant
//
//  Comprehensive localization strings (English and German)
//  Translations from PWA baseline
//

import Foundation

struct LocalizedStrings {

    // MARK: - English Translations

    static let english: [String: String] = [
        // App & Navigation
        "appTitle": "iGFAP",
        "strokeTriageAssistant": "Stroke Triage Assistant",
        "emergencyBadge": "Emergency Tool",
        "goBack": "Go Back",
        "goHome": "Go Home",
        "cancel": "Cancel",
        "continue": "Continue",

        // Triage Screens
        "patientAssessment": "Patient Assessment",
        "stepOf": "Step %d of %d",
        "isPatientComatose": "Is the patient comatose?",
        "glasgowComaScale": "Glasgow Coma Scale < 8",
        "whatIsGCS": "What is GCS?",
        "yesComatose": "Yes (GCS < 8)",
        "patientIsComatose": "Patient is comatose",
        "noComatose": "No (GCS ≥ 8)",
        "patientIsNotComatose": "Patient is not comatose",

        // Examination
        "examinationCapability": "Examination Capability",
        "canBeReliablyExamined": "Can the patient be reliably examined?",
        "patientNotAphasic": "Patient is not aphasic, confused, or uncooperative",
        "yesFullExam": "Yes - Full Exam Possible",
        "fullExamPossible": "Full examination possible",
        "noLimitedExam": "No - Limited Exam Only",
        "limitedExamOnly": "Limited examination only",

        // Prerequisites
        "prerequisitesTitle": "Prerequisites for Stroke Triage",
        "prerequisitesIntro": "Please confirm that all of the following prerequisites are met:",
        "prerequisitesWarning": "All prerequisites must be met to continue",
        "acuteDeficit": "Acute (severe) neurological deficit present",
        "symptomOnset": "Symptom onset within 6 hours",
        "noPreexisting": "No pre-existing severe neurological deficits",
        "noTrauma": "No traumatic brain injury present",
        "button.continue": "Continue",
        "button.back": "Back",

        // Forms
        "basicInformation": "Basic Information",
        "biomarkersScores": "Biomarkers & Scores",
        "clinicalSymptoms": "Clinical Symptoms",
        "medicalHistory": "Medical History",

        // Form Labels
        "age": "Age (years)",
        "ageHelp": "Patient age in years",
        "systolicBP": "Systolic BP (mmHg)",
        "systolicBPHelp": "Systolic blood pressure",
        "diastolicBP": "Diastolic BP (mmHg)",
        "diastolicBPHelp": "Diastolic blood pressure",
        "gfapValue": "GFAP Value (pg/mL)",
        "gfapHelp": "GFAP biomarker level",
        "fastEdScore": "FAST-ED Score",
        "fastEdHelp": "FAST-ED assessment score (0-9)",

        // Checkboxes
        "headache": "Headache",
        "reducedConsciousness": "Reduced consciousness",
        "armWeakness": "Arm weakness",
        "legWeakness": "Leg weakness",
        "eyeDeviation": "Eye deviation",
        "atrialFibrillation": "Atrial fibrillation",
        "anticoagulated": "Anticoagulated (NOAK)",
        "antiplatelets": "Antiplatelets",

        // Buttons
        "analyze": "Analyze",
        "analyzing": "Analyzing...",
        "printResults": "Print Results",
        "newAssessment": "New Assessment",
        "startOver": "Start Over",
        "exportPDF": "Export PDF Report",

        // Results
        "assessmentResults": "Assessment Results",
        "criticalRiskDetected": "Critical Risk Detected",
        "immediateIntervention": "Immediate medical intervention recommended. Consider imaging and specialist consultation.",
        "ichRisk": "ICH Risk",
        "lvoRisk": "LVO Risk",
        "ichProbability": "ICH Probability",
        "lvoProbability": "LVO Probability",
        "riskLevel": "Risk Level",
        "lowRisk": "Low Risk",
        "mediumRisk": "Medium Risk",
        "highRisk": "High Risk",
        "veryHighRisk": "Very High Risk",

        // Risk Factors
        "riskFactors": "Risk Factors",
        "increasingRisk": "Increasing Risk ⬆",
        "decreasingRisk": "Decreasing Risk ⬇",
        "ichRiskFactors": "ICH Risk Factors",
        "lvoRiskFactors": "LVO Risk Factors",

        // ICH Volume
        "ichVolumeEstimation": "ICH Volume Estimation",
        "estimatedICHVolume": "Estimated ICH Volume",
        "mortality": "Mortality: %@",
        "basedOnGFAP": "Based on GFAP biomarker correlation (Broderick et al., 1993)",

        // Hospital Routing
        "recommendedDestination": "Recommended Destination",
        "findNearestHospital": "Find Nearest Hospital",
        "useCurrentLocation": "Use Current Location",
        "enterLocationManually": "Enter Location Manually",
        "hideManualInput": "Hide Manual Input",
        "enterLocation": "e.g. Stuttgart, Heidelberg or 48.78,9.18",
        "search": "Search",
        "gettingLocation": "Getting your location...",
        "nearestStrokeCenters": "Nearest Stroke Centers",
        "primaryDestination": "Primary Destination",
        "alternativeCenters": "Alternative Centers",
        "call": "Call",
        "directions": "Directions",
        "distance": "%@ km",
        "travelTime": "%@ min",

        // Center Types
        "neurosurgicalCenter": "NEUROSURGICAL CENTER",
        "comprehensiveCenter": "COMPREHENSIVE CENTER",
        "thrombolysisCapable": "THROMBOLYSIS CAPABLE",
        "strokeUnit": "STROKE UNIT",

        // Urgency Levels
        "immediate": "IMMEDIATE",
        "urgent": "URGENT",
        "timeCritical": "TIME CRITICAL",
        "standard": "STANDARD",

        // Routing Explanation
        "routingLogic": "Routing Logic:",
        "preAlert": "Pre-Alert:",
        "highBleedingProbability": "High bleeding probability (≥50%) - neurosurgical evaluation required",
        "activateNeurosurgery": "Activate neurosurgery team",
        "intermediateBleedingRisk": "Intermediate bleeding risk (30-50%) - CT and possible intervention",
        "prepareNeurosurgicalConsult": "Prepare for possible neurosurgical consultation",
        "lowBleedingRisk": "Low bleeding risk (<30%) - nearest thrombolysis capable center",
        "prepareThrombolysis": "Prepare for thrombolysis protocol",

        // Additional Results Components
        // Input Summary
        "inputSummaryTitle": "📋 Input Data Summary",
        "inputSummarySubtitle": "Review all entered patient data",
        "vigilanceReduction": "Vigilance Reduction",
        "yes": "Yes",

        // Differential Diagnoses
        "differentialDiagnoses": "Differential Diagnoses",
        "alternativeDiagnoses": "Alternative Diagnoses",
        "sabSdhEdh": "Alternative diagnoses include SAH, SDH, EDH (Subarachnoid Hemorrhage, Subdural Hematoma, Epidural Hematoma)",
        "reconfirmTimeWindow": "Please reconfirm time window!",
        "unclearTimeWindow": "With unclear/extended time window, an early demarcated cerebral infarction is also possible",
        "rareDiagnoses": "Rare diagnoses such as glioblastoma are also possible",

        // Tachometer Gauge
        "decisionSupport": "Decision Support – LVO/ICH",
        "confidence": "Confidence",
        "difference": "Difference",
        "percent": "percent",
        "uncertain": "Uncertain",
        "ichDominant": "ICH Dominant",
        "lvoDominant": "LVO Dominant",

        // Disclaimer
        "importantNotice": "⚠️ Important Notice",
        "disclaimerText": "This assessment is for research purposes only. Clinical decisions should be made by qualified medical professionals based on comprehensive evaluation.",

        // Login
        "login": "Login",
        "accessCode": "Access Code",
        "enterAccessCode": "Enter Access Code",
        "invalidAccessCode": "Invalid access code. Please try again.",
        "logout": "Logout",

        // Errors
        "error": "Error",
        "networkError": "Network error - please check your connection and try again",
        "apiError": "Failed to get results",
        "locationError": "Unable to get your location",
        "locationPermissionDenied": "Location access denied. Please allow location access and try again.",

        // Login Screen (additional)
        "researchAccess": "Research Access",
        "researchToolOnly": "Research Tool Only",
        "researchToolDisclaimer": "This application is for research purposes only and is not approved for clinical use. Always consult qualified medical professionals for patient care decisions.",
        "researchAccessCode": "Research Access Code",
        "contactResearchCoordinator": "Contact your research coordinator for access",
        "secureLogin": "Secure Login",
        "ceCertificationPending": "CE certification pending",
        "clinicalOversight": "Clinical oversight: RKH Klinikum Ludwigsburg",
        "contactEmail": "Contact: bosdeepak@gmail.com",

        // Assessment Modules
        "comaModule": "Coma Module",
        "gcsRapidAssessment": "GCS < 8 - Rapid Assessment",
        "criticalPatient": "Critical Patient",
        "comaModuleDescription": "This module provides rapid ICH risk assessment for comatose patients using only GFAP biomarker data.",
        "limitedDataModule": "Limited Data Module",
        "forPatientsCannotExam": "For patients who cannot be fully examined",
        "fullAssessment": "Full Assessment",
        "comprehensiveStrokeEvaluation": "Comprehensive stroke evaluation",

        // Form Fields
        "enterValue": "Enter value",
        "pgml": "pg/mL",
        "validRange": "Valid range: 29 - 10,001 pg/mL",
        "valueBelowMinimum": "⚠️ Value below minimum (29 pg/mL)",
        "valueExceedsMaximum": "⚠️ Value exceeds maximum (10,001 pg/mL)",
        "extremelyHighValue": "⚠️ Extremely high value - please verify",
        "validValue": "✓ Valid value",
        "calculateICHRisk": "Calculate ICH Risk",
        "back": "Back",
        "home": "Home",
        "bloodPressure": "Blood Pressure",
        "systolic": "Systolic",
        "diastolic": "Diastolic",
        "mmHg": "mmHg",
        "systolicGreaterThanDiastolic": "⚠️ Systolic must be greater than diastolic",
        "neurologicalStatus": "Neurological Status",
        "years": "years",

        // Full Assessment
        "calculate": "Calculate",
        "tapToCalculate": "Tap the field to load calculator",
        "symptoms": "Symptoms",
        "fromFASTED": "From FAST-ED",
        "armParesis": "Arm Paresis",
        "legParesis": "Leg Paresis",
        "calculateICHLVORisk": "Calculate ICH & LVO Risk",

        // Clinical Recommendations
        "clinicalRecommendations": "Clinical Recommendations",
        "timeSinceAssessment": "Time since assessment started:",
        "urgentCT": "IMMEDIATE: Urgent CT imaging required",
        "considerBPManagement": "Consider immediate BP management if SBP > 150 mmHg",
        "highPriority": "HIGH PRIORITY",
        "expediteCT": "HIGH PRIORITY: Expedite CT imaging",
        "monitorBP": "Monitor blood pressure closely",
        "considerWithholdAnticoagulation": "Consider withholding anticoagulation",
        "standardStrokeProtocol": "Standard stroke protocol with close monitoring",
        "obtainCT": "Obtain CT imaging as per protocol",
        "lowICHRisk": "Low ICH risk - proceed with standard evaluation",
        "considerDirectTransportCSC": "Consider direct transport to comprehensive stroke center",
        "alertInterventionalTeam": "Alert interventional team for potential thrombectomy",
        "transportStrokeCapable": "Transport to stroke-capable facility",
        "considerCTA": "Consider CTA for LVO confirmation",
        "moderateLVORisk": "Moderate LVO risk - standard stroke evaluation",
        "documentSymptomOnset": "Document symptom onset time accurately",
        "notifyReceivingFacility": "Notify receiving facility early for resource preparation",

        // Intelligent Routing
        "basedOnRiskProfile": "Based on patient risk profile",
        "locationAccessDenied": "Location access denied. Please enable in Settings.",
        "calculatingRoute": "Calculating optimal route...",

        // FAST-ED Calculator
        "fastedFullName": "Field Assessment Stroke Triage for Emergency Destination",
        "totalScore": "Total Score: 0-9",
        "highLVORisk": "High LVO Risk",
        "lowLVORisk": "Low LVO Risk",
        "facialPalsy": "Facial Palsy",
        "speechChanges": "Speech Changes",
        "denialNeglect": "Denial/Neglect",
        "normal": "Normal",
        "mild": "Mild",
        "severe": "Severe",
        "present": "Present",
        "absent": "Absent",
        "armWeaknessMild": "Mild: Drift. Severe: Falls rapidly",
        "speechMild": "Mild: Slurred. Severe: Aphasia/mute",
        "eyeDeviationDescription": "Gaze preference to one side",
        "denialNeglectDescription": "Does not recognize deficit",
        "interpretation": "Interpretation",
        "fastedInterpretationHigh": "FAST-ED ≥ 4: Highly suggestive of large vessel occlusion (LVO)",
        "fastedInterpretationLow": "FAST-ED < 4: Lower probability of LVO",
        "useScore": "Use Score:",
    ]

    // MARK: - German Translations

    static let german: [String: String] = [
        // App & Navigation
        "appTitle": "iGFAP",
        "strokeTriageAssistant": "Schlaganfall-Triage-Assistent",
        "emergencyBadge": "Notfall-Tool",
        "goBack": "Zurück",
        "goHome": "Zur Startseite",
        "cancel": "Abbrechen",
        "continue": "Fortfahren",

        // Triage Screens
        "patientAssessment": "Patientenbeurteilung",
        "stepOf": "Schritt %d von %d",
        "isPatientComatose": "Ist der Patient komatös?",
        "glasgowComaScale": "Glasgow Coma Scale < 8",
        "whatIsGCS": "Was ist GCS?",
        "yesComatose": "Ja (GCS < 8)",
        "patientIsComatose": "Patient ist komatös",
        "noComatose": "Nein (GCS ≥ 8)",
        "patientIsNotComatose": "Patient ist bei Bewusstsein",

        // Examination
        "examinationCapability": "Untersuchungsfähigkeit",
        "canBeReliablyExamined": "Kann der Patient zuverlässig untersucht werden?",
        "patientNotAphasic": "Patient ist nicht aphasisch, verwirrt oder unkooperativ",
        "yesFullExam": "Ja - Vollständige Untersuchung möglich",
        "fullExamPossible": "Vollständige Beurteilung",
        "noLimitedExam": "Nein- Nur begrenzte Untersuchung möglich",
        "limitedExamOnly": "Nur begrenzte Daten möglich",

        // Voraussetzungen
        "prerequisitesTitle": "Voraussetzungen für Schlaganfall-Triage",
        "prerequisitesIntro": "Bitte bestätigen Sie, dass alle folgenden Voraussetzungen erfüllt sind:",
        "prerequisitesWarning": "Alle Voraussetzungen müssen erfüllt sein, um fortzufahren",
        "acuteDeficit": "Akutes (schweres) neurologisches Defizit vorhanden",
        "symptomOnset": "Symptombeginn innerhalb 6h",
        "noPreexisting": "Keine vorbestehende schwere neurologische Defizite",
        "noTrauma": "Kein Schädelhirntrauma vorhanden",
        "button.continue": "Fortfahren",
        "button.back": "Zurück",

        // Forms
        "basicInformation": "Grundinformationen",
        "biomarkersScores": "Biomarker & Scores",
        "clinicalSymptoms": "Klinische Symptome",
        "medicalHistory": "Anamnese",

        // Form Labels
        "age": "Alter (Jahre)",
        "ageHelp": "Patientenalter in Jahren",
        "systolicBP": "Systolischer RR (mmHg)",
        "systolicBPHelp": "Systolischer Blutdruck",
        "diastolicBP": "Diastolischer RR (mmHg)",
        "diastolicBPHelp": "Diastolischer Blutdruck",
        "gfapValue": "GFAP-Wert (pg/mL)",
        "gfapHelp": "GFAP-Biomarker-Wert",
        "fastEdScore": "FAST-ED-Score",
        "fastEdHelp": "FAST-ED-Bewertungsscore (0-9)",

        // Checkboxes
        "headache": "Kopfschmerzen",
        "reducedConsciousness": "Bewusstseinstrübung",
        "armWeakness": "Armschwäche",
        "legWeakness": "Beinschwäche",
        "eyeDeviation": "Blickdeviation",
        "atrialFibrillation": "Vorhofflimmern",
        "anticoagulated": "Antikoaguliert (NOAK)",
        "antiplatelets": "Thrombozytenaggregationshemmer",

        // Buttons
        "analyze": "Analysieren",
        "analyzing": "Analysiere...",
        "printResults": "Ergebnisse drucken",
        "newAssessment": "Neue Bewertung",
        "startOver": "Von vorn beginnen",
        "exportPDF": "PDF-Bericht exportieren",

        // Results
        "assessmentResults": "Bewertungsergebnisse",
        "criticalRiskDetected": "Kritisches Risiko erkannt",
        "immediateIntervention": "Sofortige medizinische Intervention empfohlen. Bildgebung und Fachkonsultation erwägen.",
        "ichRisk": "ICB-Risiko",
        "lvoRisk": "LVO-Risiko",
        "ichProbability": "ICB-Wahrscheinlichkeit",
        "lvoProbability": "LVO-Wahrscheinlichkeit",
        "riskLevel": "Risikostufe",
        "lowRisk": "Niedriges Risiko",
        "mediumRisk": "Mittleres Risiko",
        "highRisk": "Hohes Risiko",
        "veryHighRisk": "Sehr hohes Risiko",

        // Risk Factors
        "riskFactors": "Risikofaktoren",
        "increasingRisk": "Risikoerhöhend ⬆",
        "decreasingRisk": "Risikomindernd ⬇",
        "ichRiskFactors": "ICB-Risikofaktoren",
        "lvoRiskFactors": "LVO-Risikofaktoren",

        // ICH Volume
        "ichVolumeEstimation": "ICB-Volumen-Schätzung",
        "estimatedICHVolume": "Geschätztes ICB-Volumen",
        "mortality": "Mortalität: %@",
        "basedOnGFAP": "Basierend auf GFAP-Biomarker-Korrelation (Broderick et al., 1993)",

        // Hospital Routing
        "recommendedDestination": "Empfohlenes Ziel",
        "findNearestHospital": "Nächstes Krankenhaus finden",
        "useCurrentLocation": "Aktuellen Standort verwenden",
        "enterLocationManually": "Standort manuell eingeben",
        "hideManualInput": "Manuelle Eingabe ausblenden",
        "enterLocation": "z.B. Stuttgart, Heidelberg oder 48.78,9.18",
        "search": "Suchen",
        "gettingLocation": "Standort wird ermittelt...",
        "nearestStrokeCenters": "Nächste Schlaganfall-Zentren",
        "primaryDestination": "Primäres Ziel",
        "alternativeCenters": "Alternative Zentren",
        "call": "Anrufen",
        "directions": "Wegbeschreibung",
        "distance": "%@ km",
        "travelTime": "%@ Min",

        // Center Types
        "neurosurgicalCenter": "NEUROCHIRURGISCHES ZENTRUM",
        "comprehensiveCenter": "UMFASSENDES ZENTRUM",
        "thrombolysisCapable": "THROMBOLYSE-FÄHIG",
        "strokeUnit": "STROKE UNIT",

        // Urgency Levels
        "immediate": "SOFORT",
        "urgent": "DRINGEND",
        "timeCritical": "ZEITKRITISCH",
        "standard": "STANDARD",

        // Routing Explanation
        "routingLogic": "Routing-Logik:",
        "preAlert": "Voralarm:",
        "highBleedingProbability": "Hohe Blutungswahrscheinlichkeit (≥50%) - neurochirurgische Beurteilung erforderlich",
        "activateNeurosurgery": "Neurochirurgie-Team aktivieren",
        "intermediateBleedingRisk": "Mittleres Blutungsrisiko (30-50%) - CT und mögliche Intervention",
        "prepareNeurosurgicalConsult": "Neurochirurgische Konsultation vorbereiten",
        "lowBleedingRisk": "Niedriges Blutungsrisiko (<30%) - nächstes Thrombolyse-fähiges Zentrum",
        "prepareThrombolysis": "Thrombolyse-Protokoll vorbereiten",

        // Additional Results Components
        // Input Summary
        "inputSummaryTitle": "📋 Eingabedaten-Zusammenfassung",
        "inputSummarySubtitle": "Überprüfen Sie alle eingegebenen Patientendaten",
        "vigilanceReduction": "Vigilanzminderung",
        "yes": "Ja",

        // Differential Diagnoses
        "differentialDiagnoses": "Differentialdiagnosen",
        "alternativeDiagnoses": "Alternative Diagnosen",
        "sabSdhEdh": "Alternative Diagnosen sind SAB, SDH, EDH (Subarachnoidalblutung, Subduralhämatom, Epiduralhämatom)",
        "reconfirmTimeWindow": "Bitte Zeitfenster rekonfirmieren!",
        "unclearTimeWindow": "Bei unklarem/erweitertem Zeitfenster ist auch ein beginnend demarkierter Hirninfarkt möglich",
        "rareDiagnoses": "Seltene Diagnosen wie ein Glioblastom sind auch möglich",

        // Tachometer Gauge
        "decisionSupport": "Entscheidungshilfe – LVO/ICH",
        "confidence": "Vertrauen",
        "difference": "Unterschied",
        "percent": "Prozent",
        "uncertain": "Unsicher",
        "ichDominant": "ICH Dominant",
        "lvoDominant": "LVO Dominant",

        // Disclaimer
        "importantNotice": "⚠️ Wichtiger Hinweis",
        "disclaimerText": "Diese Bewertung dient nur Forschungszwecken. Klinische Entscheidungen sollten von qualifizierten medizinischen Fachkräften auf der Grundlage einer umfassenden Beurteilung getroffen werden.",

        // Login
        "login": "Anmelden",
        "accessCode": "Zugangscode",
        "enterAccessCode": "Zugangscode eingeben",
        "invalidAccessCode": "Ungültiger Zugangscode. Bitte versuchen Sie es erneut.",
        "logout": "Abmelden",

        // Errors
        "error": "Fehler",
        "networkError": "Netzwerkfehler - bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut",
        "apiError": "Ergebnisse konnten nicht abgerufen werden",
        "locationError": "Standort konnte nicht ermittelt werden",
        "locationPermissionDenied": "Standortzugriff verweigert. Bitte erlauben Sie den Standortzugriff und versuchen Sie es erneut.",

        // Login Screen (additional)
        "researchAccess": "Forschungszugang",
        "researchToolOnly": "Nur Forschungstool",
        "researchToolDisclaimer": "Diese Anwendung dient ausschließlich Forschungszwecken und ist nicht für den klinischen Einsatz zugelassen. Konsultieren Sie für Patientenversorgungsentscheidungen immer qualifizierte medizinische Fachkräfte.",
        "researchAccessCode": "Forschungs-Zugangscode",
        "contactResearchCoordinator": "Kontaktieren Sie Ihren Forschungskoordinator für Zugang",
        "secureLogin": "Sichere Anmeldung",
        "ceCertificationPending": "CE-Zertifizierung ausstehend",
        "clinicalOversight": "Klinische Aufsicht: RKH Klinikum Ludwigsburg",
        "contactEmail": "Kontakt: bosdeepak@gmail.com",

        // Assessment Modules
        "comaModule": "Koma-Modul",
        "gcsRapidAssessment": "GCS < 8 - Schnellbewertung",
        "criticalPatient": "Kritischer Patient",
        "comaModuleDescription": "Dieses Modul bietet eine schnelle ICB-Risikobewertung für komatöse Patienten unter Verwendung nur von GFAP-Biomarker-Daten.",
        "limitedDataModule": "Begrenztes Datenmodul",
        "forPatientsCannotExam": "Für Patienten, die nicht vollständig untersucht werden können",
        "fullAssessment": "Vollständige Bewertung",
        "comprehensiveStrokeEvaluation": "Umfassende Schlaganfall-Evaluierung",

        // Form Fields
        "enterValue": "Wert eingeben",
        "pgml": "pg/mL",
        "validRange": "Gültiger Bereich: 29 - 10.001 pg/mL",
        "valueBelowMinimum": "⚠️ Wert unter Minimum (29 pg/mL)",
        "valueExceedsMaximum": "⚠️ Wert überschreitet Maximum (10.001 pg/mL)",
        "extremelyHighValue": "⚠️ Extrem hoher Wert - bitte überprüfen",
        "validValue": "✓ Gültiger Wert",
        "calculateICHRisk": "ICB-Risiko berechnen",
        "back": "Zurück",
        "home": "Startseite",
        "bloodPressure": "Blutdruck",
        "systolic": "Systolisch",
        "diastolic": "Diastolisch",
        "mmHg": "mmHg",
        "systolicGreaterThanDiastolic": "⚠️ Systolischer muss größer als diastolischer sein",
        "neurologicalStatus": "Neurologischer Status",
        "years": "Jahre",

        // Full Assessment
        "calculate": "Berechnen",
        "tapToCalculate": "Tippen Sie auf das Feld, um den Rechner zu laden",
        "symptoms": "Symptome",
        "fromFASTED": "Von FAST-ED",
        "armParesis": "Armparese",
        "legParesis": "Beinparese",
        "calculateICHLVORisk": "ICB- & LVO-Risiko berechnen",

        // Clinical Recommendations
        "clinicalRecommendations": "Klinische Empfehlungen",
        "timeSinceAssessment": "Zeit seit Bewertungsbeginn:",
        "urgentCT": "SOFORT: Dringende CT-Bildgebung erforderlich",
        "considerBPManagement": "Sofortige RR-Behandlung erwägen wenn SBP > 150 mmHg",
        "highPriority": "HOHE PRIORITÄT",
        "expediteCT": "HOHE PRIORITÄT: CT-Bildgebung beschleunigen",
        "monitorBP": "Blutdruck engmaschig überwachen",
        "considerWithholdAnticoagulation": "Zurückhalten der Antikoagulation erwägen",
        "standardStrokeProtocol": "Standard-Schlaganfall-Protokoll mit engmaschiger Überwachung",
        "obtainCT": "CT-Bildgebung gemäß Protokoll durchführen",
        "lowICHRisk": "Niedriges ICB-Risiko - Standardbewertung fortsetzen",
        "considerDirectTransportCSC": "Direkttransport zum umfassenden Schlaganfallzentrum erwägen",
        "alertInterventionalTeam": "Interventionelles Team für mögliche Thrombektomie alarmieren",
        "transportStrokeCapable": "Transport zur schlaganfallfähigen Einrichtung",
        "considerCTA": "CTA zur LVO-Bestätigung erwägen",
        "moderateLVORisk": "Mittleres LVO-Risiko - Standard-Schlaganfall-Bewertung",
        "documentSymptomOnset": "Symptomentritt genau dokumentieren",
        "notifyReceivingFacility": "Aufnehmende Einrichtung frühzeitig benachrichtigen zur Ressourcenvorbereitung",

        // Intelligent Routing
        "basedOnRiskProfile": "Basierend auf Patientenrisikoprofil",
        "locationAccessDenied": "Standortzugriff verweigert. Bitte in Einstellungen aktivieren.",
        "calculatingRoute": "Optimale Route wird berechnet...",

        // FAST-ED Calculator
        "fastedFullName": "Feldbeurteilung Schlaganfall-Triage für Notfallzielort",
        "totalScore": "Gesamtpunktzahl: 0-9",
        "highLVORisk": "Hohes LVO-Risiko",
        "lowLVORisk": "Niedriges LVO-Risiko",
        "facialPalsy": "Gesichtslähmung",
        "speechChanges": "Sprachveränderungen",
        "denialNeglect": "Verleugnung/Neglect",
        "normal": "Normal",
        "mild": "Leicht",
        "severe": "Schwer",
        "present": "Vorhanden",
        "absent": "Nicht vorhanden",
        "armWeaknessMild": "Leicht: Drift. Schwer: Fällt schnell",
        "speechMild": "Leicht: Verwaschen. Schwer: Aphasie/stumm",
        "eyeDeviationDescription": "Blickpräferenz zu einer Seite",
        "denialNeglectDescription": "Erkennt Defizit nicht",
        "interpretation": "Interpretation",
        "fastedInterpretationHigh": "FAST-ED ≥ 4: Stark hinweisend auf Großgefäßverschluss (LVO)",
        "fastedInterpretationLow": "FAST-ED < 4: Geringere Wahrscheinlichkeit für LVO",
        "useScore": "Score verwenden:",
    ]
}
