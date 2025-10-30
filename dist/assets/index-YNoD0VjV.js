const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/research-tools-BiPm2YBi.js","assets/medical-core-BW5NUVL9.js","assets/enterprise-features-C-AmcgLw.js"])))=>i.map(i=>d[i]);
var gt=Object.defineProperty;var pt=(i,e,t)=>e in i?gt(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var U=(i,e,t)=>pt(i,typeof e!="symbol"?e+"":e,t);import{s as m,v as ft,b as yt,a as I,P as he,m as p,M as f}from"./medical-core-BW5NUVL9.js";import{p as Be,a as ze,b as Ue,A as vt,e as Ve,c as bt}from"./prediction-models-D1v59S95.js";import{s as j,a as V,b as J,m as Se,c as ke}from"./enterprise-features-C-AmcgLw.js";import{i as Y,s as St,c as kt,r as Ge,a as Ke,b as wt,d as we,e as Ee,q as ue}from"./research-tools-BiPm2YBi.js";import{i as Et,r as We,a as Tt,b as At}from"./ui-components-kKBGWTFH.js";import"./index-YNoD0VjV.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const Ct=!1,It={success:!0,message:"Development mode - authentication bypassed",session_token:`dev-token-${Date.now()}`,expires_at:new Date(Date.now()+30*60*1e3).toISOString(),session_duration:1800},Lt={coma_ich:{probability:25.3,ich_probability:25.3,drivers:{gfap_value:.4721,baseline_risk:.1456},confidence:.75},limited_ich:{probability:31.7,ich_probability:31.7,drivers:{age_years:.2845,systolic_bp:.1923,gfap_value:.4231,vigilanzminderung:.3456},confidence:.65},full_stroke:{ich_prediction:{probability:28.4,drivers:{age_years:.1834,gfap_value:.3921,systolic_bp:.2341,vigilanzminderung:.2876},confidence:.88},lvo_prediction:{probability:45.2,drivers:{fast_ed_score:.7834,age_years:.2341,eye_deviation:.1923},confidence:.82}},authenticate:{success:!0,message:"Development mode - authentication bypassed",session_token:`dev-token-${Date.now()}`,expires_at:new Date(Date.now()+30*60*1e3).toISOString(),session_duration:1800}},X={COMA_ICH:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_coma_ich",LDM_ICH:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_limited_data_ich",FULL_STROKE:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_full_stroke",LVO_PREDICTION:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_lvo",AUTHENTICATE:"https://europe-west3-igfap-452720.cloudfunctions.net/authenticate-research-access"},qe={isDevelopment:Ct,mockAuthResponse:It,mockApiResponses:Lt},je={ich:{medium:25,high:50},lvo:{medium:25,high:50}},M={min:29,max:10001,normal:100,elevated:500,critical:1e3},Te={autoSaveInterval:18e4,sessionTimeout:30*60*1e3},_={caseSharingUrl:"https://case-sharing-564499947017.europe-west3.run.app",googleMapsApiKey:"AIzaSyACBndIj8HD1wwZ4Vw8PDDI0bIe6DoBExI",gpsUpdateInterval:3e4,gpsHighAccuracy:!0,gpsTimeout:1e4,gpsMaxAge:0,autoArchiveHours:2,staleGpsMinutes:5},qi={age_years:{required:!0,min:0,max:120,type:"integer",medicalCheck:i=>i<18?"Emergency stroke assessment typically for adults (≥18 years)":null},systolic_bp:{required:!0,min:60,max:300,type:"number",medicalCheck:(i,e)=>{const t=e==null?void 0:e.diastolic_bp;return t&&i<=t?"Systolic BP must be higher than diastolic BP":null}},diastolic_bp:{required:!0,min:30,max:200,type:"number",medicalCheck:(i,e)=>{const t=e==null?void 0:e.systolic_bp;return t&&i>=t?"Diastolic BP must be lower than systolic BP":null}},gfap_value:{required:!0,min:M.min,max:M.max,type:"number",medicalCheck:i=>i>8e3?"Warning: Extremely high GFAP value - please verify lab result (still valid)":null},fast_ed_score:{required:!0,min:0,max:9,type:"integer",medicalCheck:i=>i>=4?"High FAST-ED score suggests LVO - consider urgent intervention":null},gcs:{required:!0,min:3,max:15,type:"integer",medicalCheck:i=>i<8?"GCS < 8 indicates severe consciousness impairment - consider coma module":null}},Mt=-.825559,Rt=-.408314,_t=-.82645,Pt=1.651521,Dt=-0,Nt=1,$t=3.701422,Ot=2.306173,xt=1.11742,Ft=-1.032167,Ht=.333333,Bt=1e-15,zt=0,Ut=16;function Vt(i,e){return Math.abs(e)<Bt?Math.log(i+1):((i+1)**e-1)/e}function Ae(i,e,t){return(i-e)/t}function Gt(i){return i>500?1:i<-500?0:1/(1+Math.exp(-i))}function Kt(i,e){if(i==null)throw new Error("gfap is required");if(e==null)throw new Error("fasted is required");const t=Number(i),s=Number(e);if(!Number.isFinite(t))throw new Error("gfap must be a finite number");if(!Number.isFinite(s))throw new Error("fasted must be a finite number");if(t<0)throw new Error("GFAP value must be non-negative");return{gfap:t,fasted:s}}function Wt(i,e){const t=Kt(i,e),s=Math.max(zt,Math.min(Ut,t.fasted)),a=Vt(t.gfap,Mt),r=Ae(a,Dt,Nt),n=Ae(s,$t,Ot),l=Rt+_t*r+Pt*n,c=xt*l+Ft;return Gt(c)}function ji(i,e){return Wt(i,e)>=Ht?1:0}const Ce={en:{appTitle:"iGFAP",emergencyBadge:"Emergency Tool",helpButton:"Help and Instructions",darkModeButton:"Toggle dark mode",languageToggle:"Language",step1:"Initial Assessment",step2:"Data Collection",step3:"Results",comaModuleTitle:"Coma Module",limitedDataModuleTitle:"Limited Data Module",fullStrokeModuleTitle:"Full Stroke Module",triage1Title:"Patient Assessment",triage1Question:"Is the patient comatose?",triage1Help:"Glasgow Coma Scale < 9",triage1Yes:"YES - Comatose",triage1No:"NO - Conscious",triage2Title:"Examination Capability",triage2Question:"Can the patient be reliably examined?",triage2Help:"Patient is not aphasic, confused, or uncooperative",triage2Yes:"YES - Full Exam Possible",triage2No:"NO - Limited Exam Only",ageLabel:"Age (years)",ageHelp:"Patient age in years",systolicLabel:"Systolic BP (mmHg)",systolicHelp:"Systolic blood pressure",diastolicLabel:"Diastolic BP (mmHg)",diastolicHelp:"Diastolic blood pressure",gfapLabel:"GFAP Value (pg/mL)",gfapHelp:"GFAP biomarker level",fastEdLabel:"FAST-ED Score",fastEdHelp:"FAST-ED assessment score (0-9)",headacheLabel:"Headache",vigilanzLabel:"Reduced consciousness",armPareseLabel:"Arm weakness",beinPareseLabel:"Leg weakness",eyeDeviationLabel:"Eye deviation",atrialFibLabel:"Atrial fibrillation",anticoagLabel:"Anticoagulated (NOAK)",antiplateletsLabel:"Antiplatelets",analyzeButton:"Analyze",analyzing:"Analyzing...",printResults:"Print Results",newAssessment:"Start New Assessment",startOver:"Start Over",goBack:"Go Back",goHome:"Go Home",basicInformation:"Basic Information",biomarkersScores:"Biomarkers & Scores",clinicalSymptoms:"Clinical Symptoms",medicalHistory:"Medical History",ageYearsLabel:"Age (years)",systolicBpLabel:"Systolic BP (mmHg)",diastolicBpLabel:"Diastolic BP (mmHg)",gfapValueLabel:"GFAP Value (pg/mL)",fastEdScoreLabel:"FAST-ED Score",ageYearsHelp:"Patient's age in years",systolicBpHelp:"Normal: 90-140 mmHg",diastolicBpHelp:"Normal: 60-90 mmHg",gfapTooltip:"Brain injury biomarker",gfapTooltipLong:"Glial Fibrillary Acidic Protein - Brain injury biomarker",gfapRange:"Range: {min} - {max} pg/mL",fastEdTooltip:"0-9 scale for LVO screening",analyzeIchRisk:"Analyze ICH Risk",analyzeStrokeRisk:"Analyze Stroke Risk",criticalPatient:"Critical Patient",comaAlert:"Patient is comatose (GCS < 9). Rapid assessment required.",vigilanceReduction:"Vigilance Reduction (Decreased alertness)",armParesis:"Arm Paresis",legParesis:"Leg Paresis",eyeDeviation:"Eye Deviation",atrialFibrillation:"Atrial Fibrillation",onNoacDoac:"On NOAC/DOAC",onAntiplatelets:"On Antiplatelets",resultsTitle:"Assessment Results",bleedingRiskAssessment:"Bleeding Risk Assessment",ichProbability:"ICH Probability",lvoProbability:"LVO Probability",lvoMayBePossible:"Large vessel occlusion possible - further evaluation recommended",riskFactorsTitle:"Main Risk Factors",increasingRisk:"Increasing Risk",decreasingRisk:"Decreasing Risk",noFactors:"No factors",riskLevel:"Risk Level",lowRisk:"Low Risk",mediumRisk:"Medium Risk",highRisk:"High Risk",riskLow:"Low",riskMedium:"Medium",riskHigh:"High",riskFactorsAnalysis:"Risk Factors",contributingFactors:"Contributing factors to the assessment",riskFactors:"Risk Factors",increaseRisk:"INCREASE",decreaseRisk:"DECREASE",noPositiveFactors:"No increasing factors",noNegativeFactors:"No decreasing factors",ichRiskFactors:"ICH Risk Factors",lvoRiskFactors:"LVO Risk Factors",ichRisk:"ICH Risk",lvoRisk:"LVO Risk",sendToHospital:"Send to Hospital",criticalAlertTitle:"CRITICAL RISK DETECTED",criticalAlertMessage:"High probability of intracerebral hemorrhage detected.",immediateActionsRequired:"Immediate actions required",initiateStrokeProtocol:"Initiate stroke protocol immediately",urgentCtImaging:"Urgent CT imaging required",considerBpManagement:"Consider blood pressure management",prepareNeurosurgicalConsult:"Prepare for potential neurosurgical consultation",helpTitle:"Quick Reference Guide",gcsTitle:"Glasgow Coma Scale (GCS)",gcsLow:"GCS < 9: Comatose patient - use Coma Module",gcsMod:"GCS 8-12: Moderate impairment",gcsHigh:"GCS 13-15: Mild impairment",fastEdTitle:"FAST-ED Score Components",fastEdFacial:"Facial Palsy: 0-1 points",fastEdArm:"Arm Weakness: 0-2 points",fastEdSpeech:"Speech Changes: 0-2 points",fastEdTime:"Time: Critical factor",fastEdEye:"Eye Deviation: 0-2 points",fastEdDenial:"Denial/Neglect: 0-2 points",criticalValuesTitle:"Critical Values",criticalBp:"Systolic BP > 180: Increased ICH risk",criticalGfap:"GFAP > 500 pg/mL: Significant marker",criticalFastEd:"FAST-ED ≥ 4: Consider LVO",fastEdCalculatorTitle:"FAST-ED Score Calculator",fastEdCalculatorSubtitle:"Click to calculate FAST-ED score components",facialPalsyTitle:"Facial Palsy",facialPalsyNormal:"Normal (0)",facialPalsyMild:"Present (1)",armWeaknessTitle:"Arm Weakness",armWeaknessNormal:"Normal (0)",armWeaknessMild:"Mild weakness or drift (1)",armWeaknessSevere:"Severe weakness or falls immediately (2)",speechChangesTitle:"Speech Abnormalities",speechChangesNormal:"Normal (0)",speechChangesMild:"Mild dysarthria or aphasia (1)",speechChangesSevere:"Severe dysarthria or aphasia (2)",eyeDeviationTitle:"Eye Deviation",eyeDeviationNormal:"Normal (0)",eyeDeviationPartial:"Partial gaze deviation (1)",eyeDeviationForced:"Forced gaze deviation (2)",denialNeglectTitle:"Denial/Neglect",denialNeglectNormal:"Normal (0)",denialNeglectPartial:"Partial neglect (1)",denialNeglectComplete:"Complete neglect (2)",totalScoreTitle:"Total FAST-ED Score",riskLevel:"Risk Level",riskLevelLow:"LOW (Score <4)",riskLevelHigh:"HIGH (Score ≥4 - Consider LVO)",applyScore:"Apply Score",cancel:"Cancel",riskAnalysis:"Risk Analysis",riskAnalysisSubtitle:"Clinical factors in this assessment",contributingFactors:"Contributing factors",factorsShown:"shown",positiveFactors:"Positive factors",negativeFactors:"Negative factors",clinicalInformation:"Clinical Information",clinicalRecommendations:"Clinical Recommendations",clinicalRec1:"Consider immediate imaging if ICH risk is high",clinicalRec2:"Activate stroke team for LVO scores ≥ 50%",clinicalRec3:"Monitor blood pressure closely",clinicalRec4:"Document all findings thoroughly",noDriverData:"No driver data available",driverAnalysisUnavailable:"Driver analysis unavailable",driverInfoNotAvailable:"Driver information not available from this prediction model",driverAnalysisNotAvailable:"Driver analysis not available for this prediction",lvoNotPossible:"LVO assessment not possible with limited data",fullExamRequired:"Full neurological examination required for LVO screening",limitedAssessment:"Limited Assessment",disclaimer:"Clinical Disclaimer",disclaimerText:"This tool is for clinical decision support only. Always use clinical judgment and follow local protocols. Not a replacement for physician assessment.",importantNote:"Important",importantText:"These results are for clinical decision support only. Always use clinical judgment and follow institutional protocols.",predictedMortality:"Predicted 30-day mortality",ichVolumeLabel:"ICH Volume",references:"References",inputSummaryTitle:"Input Summary",inputSummarySubtitle:"Values used for this analysis",privacyLink:"Privacy Policy",disclaimerLink:"Medical Disclaimer",versionLink:"Version 2.1.0 - Research Preview",privacyPolicy:"Privacy Policy: This tool processes data locally. No patient data is stored or transmitted.",medicalDisclaimer:"Medical Disclaimer: This tool is for clinical decision support only. Always use clinical judgment and follow local protocols.",networkError:"Network error - please check your connection and try again",requestTimeout:"Request timeout - please try again",apiError:"Failed to get results",validationError:"Please check your input values",sessionTimeout:"Your session has been idle for 30 minutes. Would you like to continue?",unsavedData:"You have unsaved data. Are you sure you want to leave?",nearestCentersTitle:"Nearest Stroke Centers",useCurrentLocation:"Use Current Location",enterLocationPlaceholder:"Enter city or address...",enterManually:"Enter Location Manually",search:"Search",yourLocation:"Your Location",recommendedCenters:"Recommended Centers",alternativeCenters:"Alternative Centers",noCentersFound:"No stroke centers found in this area",gettingLocation:"Getting your location",searchingLocation:"Searching location",locationError:"Unable to get your location",locationPermissionDenied:"Location access denied. Please allow location access and try again.",locationUnavailable:"Location information is unavailable",locationTimeout:"Location request timed out",geolocationNotSupported:"Geolocation is not supported by this browser",geocodingNotImplemented:"Location search not available. Please use GPS or enter coordinates manually.",tryManualEntry:"Try entering your location manually or use GPS.",distanceNote:"Distances are calculated as straight-line distances. Actual travel times may vary.",travelTimeNote:"Travel times calculated for emergency vehicles with sirens and priority routing.",calculatingTravelTimes:"Calculating travel times",minutes:"min",poweredByOrs:"Travel times powered by OpenRoute Service",comprehensiveCenter:"Comprehensive Stroke Center",primaryCenter:"Primary Stroke Center",telemetryCenter:"Telemedicine Center",thrombectomy:"Thrombectomy",neurosurgery:"Neurosurgery",icu:"Intensive Care",telemedicine:"Telemedicine",stroke_unit:"Stroke Unit",call:"Call",directions:"Directions",emergency:"Emergency",certified:"Certified",prerequisitesTitle:"Prerequisites for Stroke Triage",prerequisitesIntro:"Please confirm that all of the following prerequisites are met:",prerequisitesWarning:"All prerequisites must be met to continue",continue:"Continue",acute_deficit:"Acute (severe) neurological deficit present",symptom_onset:"Symptom onset within 6 hours",no_preexisting:"No pre-existing severe neurological deficits",no_trauma:"No traumatic brain injury present",differentialDiagnoses:"Differential Diagnoses",reconfirmTimeWindow:"Please reconfirm time window!",unclearTimeWindow:"With unclear/extended time window, early demarcated brain infarction is also possible",rareDiagnoses:"Rare diagnoses such as glioblastoma are also possible",researchAccessRequired:"Research Access Required",researchPreviewDescription:"This is a research preview of the iGFAP Stroke Triage Assistant for clinical validation.",importantNotice:"Important Notice",researchUseOnly:"Research Use Only",researchUseOnlyDesc:"Not for clinical decision making",noPatientDataStorage:"No Patient Data Storage",noPatientDataStorageDesc:"All data processed locally",clinicalAdvisory:"Clinical Advisory",clinicalAdvisoryDesc:"Under supervision of Prof. Christian Förch & Dr. Lovepreet Kalra",contact:"Contact",researchAccessCode:"Research Access Code",enterResearchAccessCode:"Enter research access code",accessResearchSystem:"Access Research System",regulatoryStatus:"Regulatory Status",regulatoryStatusDesc:"Research prototype - CE certification pending",dataProtection:"Data Protection",dataProtectionDesc:"GDPR compliant - local processing only",clinicalOversight:"Clinical Oversight",clinicalOversightDesc:"RKH Klinikum Ludwigsburg, Neurologie",accessDenied:"Access Denied",invalidResearchCode:"Invalid research access code. Please try again."},de:{appTitle:"iGFAP",emergencyBadge:"Notfall-Tool",helpButton:"Hilfe und Anweisungen",darkModeButton:"Dunklen Modus umschalten",languageToggle:"Sprache",step1:"Erstbeurteilung",step2:"Datenerhebung",step3:"Ergebnisse",comaModuleTitle:"Koma-Modul",limitedDataModuleTitle:"Begrenzte Daten Modul",fullStrokeModuleTitle:"Vollständiges Schlaganfall-Modul",triage1Title:"Patientenbeurteilung",triage1Question:"Ist der Patient komatös?",triage1Help:"Glasgow Coma Scale < 9",triage1Yes:"JA - Komatös",triage1No:"NEIN - Bei Bewusstsein",triage2Title:"Untersuchungsfähigkeit",triage2Question:"Kann der Patient zuverlässig untersucht werden?",triage2Help:"Patient ist nicht aphasisch, verwirrt oder unkooperativ",triage2Yes:"JA - Vollständige Untersuchung möglich",triage2No:"NEIN - Nur begrenzte Untersuchung",ageLabel:"Alter (Jahre)",ageHelp:"Patientenalter in Jahren",systolicLabel:"Systolischer RR (mmHg)",systolicHelp:"Systolischer Blutdruck",diastolicLabel:"Diastolischer RR (mmHg)",diastolicHelp:"Diastolischer Blutdruck",gfapLabel:"GFAP-Wert (pg/mL)",gfapHelp:"GFAP-Biomarker-Wert",fastEdLabel:"FAST-ED-Score",fastEdHelp:"FAST-ED-Bewertungsscore (0-9)",headacheLabel:"Kopfschmerzen",vigilanzLabel:"Bewusstseinstrübung",armPareseLabel:"Armschwäche",beinPareseLabel:"Beinschwäche",eyeDeviationLabel:"Blickdeviation",atrialFibLabel:"Vorhofflimmern",anticoagLabel:"Antikoaguliert (NOAK)",antiplateletsLabel:"Thrombozytenaggregationshemmer",analyzeButton:"Analysieren",analyzing:"Analysiere...",printResults:"Ergebnisse drucken",newAssessment:"Neue Bewertung starten",startOver:"Von vorn beginnen",goBack:"Zurück",goHome:"Zur Startseite",basicInformation:"Grundinformationen",biomarkersScores:"Biomarker & Scores",clinicalSymptoms:"Klinische Symptome",medicalHistory:"Anamnese",ageYearsLabel:"Alter (Jahre)",systolicBpLabel:"Systolischer RR (mmHg)",diastolicBpLabel:"Diastolischer RR (mmHg)",gfapValueLabel:"GFAP-Wert (pg/mL)",fastEdScoreLabel:"FAST-ED-Score",ageYearsHelp:"Patientenalter in Jahren",systolicBpHelp:"Normal: 90-140 mmHg",diastolicBpHelp:"Normal: 60-90 mmHg",gfapTooltip:"Hirnverletzungs-Biomarker",gfapTooltipLong:"Glial Fibrillary Acidic Protein - Hirnverletzungs-Biomarker",gfapRange:"Bereich: {min} - {max} pg/mL",fastEdTooltip:"0-9 Skala für LVO-Screening",analyzeIchRisk:"ICB-Risiko analysieren",analyzeStrokeRisk:"Schlaganfall-Risiko analysieren",criticalPatient:"Kritischer Patient",comaAlert:"Patient ist komatös (GCS < 9). Schnelle Beurteilung erforderlich.",vigilanceReduction:"Vigilanzminderung (Verminderte Wachheit)",armParesis:"Armparese",legParesis:"Beinparese",eyeDeviation:"Blickdeviation",atrialFibrillation:"Vorhofflimmern",onNoacDoac:"NOAK/DOAK-Therapie",onAntiplatelets:"Thrombozytenaggregationshemmer",resultsTitle:"Bewertungsergebnisse",bleedingRiskAssessment:"Blutungsrisiko-Bewertung",ichProbability:"ICB-Risiko",lvoProbability:"LVO-Risiko",lvoMayBePossible:"Großgefäßverschluss möglich - weitere Abklärung empfohlen",riskFactorsTitle:"Hauptrisikofaktoren",increasingRisk:"Risikoerhöhend",decreasingRisk:"Risikomindernd",noFactors:"Keine Faktoren",riskLevel:"Risikostufe",lowRisk:"Niedriges Risiko",mediumRisk:"Mittleres Risiko",highRisk:"Hohes Risiko",riskLow:"Niedrig",riskMedium:"Mittel",riskHigh:"Hoch",riskFactorsAnalysis:"Risikofaktoren",contributingFactors:"Beitragende Faktoren zur Bewertung",riskFactors:"Risikofaktoren",increaseRisk:"ERHÖHEN",decreaseRisk:"VERRINGERN",noPositiveFactors:"Keine erhöhenden Faktoren",noNegativeFactors:"Keine verringernden Faktoren",ichRiskFactors:"ICB-Risikofaktoren",lvoRiskFactors:"LVO-Risikofaktoren",ichRisk:"ICB-Risiko",lvoRisk:"LVO-Risiko",sendToHospital:"An Krankenhaus senden",criticalAlertTitle:"KRITISCHES RISIKO ERKANNT",criticalAlertMessage:"Hohe Wahrscheinlichkeit einer intrazerebralen Blutung erkannt.",immediateActionsRequired:"Sofortige Maßnahmen erforderlich",initiateStrokeProtocol:"Schlaganfall-Protokoll sofort einleiten",urgentCtImaging:"Dringende CT-Bildgebung erforderlich",considerBpManagement:"Blutdruckmanagement erwägen",prepareNeurosurgicalConsult:"Neurochirurgische Konsultation vorbereiten",helpTitle:"Kurzreferenzleitfaden",gcsTitle:"Glasgow Coma Scale (GCS)",gcsLow:"GCS < 9: Komatöser Patient - Koma-Modul verwenden",gcsMod:"GCS 8-12: Mäßige Beeinträchtigung",gcsHigh:"GCS 13-15: Leichte Beeinträchtigung",fastEdTitle:"FAST-ED-Score-Komponenten",fastEdFacial:"Faziale Parese: 0-1 Punkte",fastEdArm:"Armschwäche: 0-2 Punkte",fastEdSpeech:"Sprachveränderungen: 0-2 Punkte",fastEdTime:"Zeit: Kritischer Faktor",fastEdEye:"Blickdeviation: 0-2 Punkte",fastEdDenial:"Verneinung/Neglect: 0-2 Punkte",criticalValuesTitle:"Kritische Werte",criticalBp:"Systolischer RR > 180: Erhöhtes ICB-Risiko",criticalGfap:"GFAP > 500 pg/mL: Signifikanter Marker",criticalFastEd:"FAST-ED ≥ 4: LVO in Betracht ziehen",fastEdCalculatorTitle:"FAST-ED-Score-Rechner",fastEdCalculatorSubtitle:"Klicken Sie, um FAST-ED-Score-Komponenten zu berechnen",facialPalsyTitle:"Fazialisparese",facialPalsyNormal:"Normal (0)",facialPalsyMild:"Vorhanden (1)",armWeaknessTitle:"Armschwäche",armWeaknessNormal:"Normal (0)",armWeaknessMild:"Leichte Schwäche oder Absinken (1)",armWeaknessSevere:"Schwere Schwäche oder fällt sofort ab (2)",speechChangesTitle:"Sprachstörungen",speechChangesNormal:"Normal (0)",speechChangesMild:"Leichte Dysarthrie oder Aphasie (1)",speechChangesSevere:"Schwere Dysarthrie oder Aphasie (2)",eyeDeviationTitle:"Blickdeviation",eyeDeviationNormal:"Normal (0)",eyeDeviationPartial:"Partielle Blickdeviation (1)",eyeDeviationForced:"Forcierte Blickdeviation (2)",denialNeglectTitle:"Verneinung/Neglect",denialNeglectNormal:"Normal (0)",denialNeglectPartial:"Partieller Neglect (1)",denialNeglectComplete:"Kompletter Neglect (2)",totalScoreTitle:"Gesamt-FAST-ED-Score",riskLevel:"Risikostufe",riskLevelLow:"NIEDRIG (Score <4)",riskLevelHigh:"HOCH (Score ≥4 - LVO erwägen)",applyScore:"Score Anwenden",cancel:"Abbrechen",riskAnalysis:"Risikoanalyse",riskAnalysisSubtitle:"Klinische Faktoren in dieser Bewertung",contributingFactors:"Beitragende Faktoren",factorsShown:"angezeigt",positiveFactors:"Positive Faktoren",negativeFactors:"Negative Faktoren",clinicalInformation:"Klinische Informationen",clinicalRecommendations:"Klinische Empfehlungen",clinicalRec1:"Sofortige Bildgebung erwägen bei hohem ICB-Risiko",clinicalRec2:"Stroke-Team aktivieren bei LVO-Score ≥ 50%",clinicalRec3:"Blutdruck engmaschig überwachen",clinicalRec4:"Alle Befunde gründlich dokumentieren",noDriverData:"Keine Treiberdaten verfügbar",driverAnalysisUnavailable:"Treiberanalyse nicht verfügbar",driverInfoNotAvailable:"Treiberinformationen von diesem Vorhersagemodell nicht verfügbar",driverAnalysisNotAvailable:"Treiberanalyse für diese Vorhersage nicht verfügbar",lvoNotPossible:"LVO-Bewertung mit begrenzten Daten nicht möglich",fullExamRequired:"Vollständige neurologische Untersuchung für LVO-Screening erforderlich",limitedAssessment:"Begrenzte Bewertung",disclaimer:"Klinischer Haftungsausschluss",disclaimerText:"Dieses Tool dient nur zur klinischen Entscheidungsunterstützung. Verwenden Sie immer klinisches Urteilsvermögen und befolgen Sie lokale Protokolle. Kein Ersatz für ärztliche Beurteilung.",importantNote:"Wichtig",importantText:"Diese Ergebnisse dienen nur zur klinischen Entscheidungsunterstützung. Verwenden Sie immer klinisches Urteilsvermögen und befolgen Sie institutionelle Protokolle.",predictedMortality:"Vorhergesagte 30-Tage-Mortalität",ichVolumeLabel:"ICB-Volumen",references:"Referenzen",inputSummaryTitle:"Eingabezusammenfassung",inputSummarySubtitle:"Für diese Analyse verwendete Werte",privacyLink:"Datenschutzrichtlinie",disclaimerLink:"Medizinischer Haftungsausschluss",versionLink:"Version 2.1.0 - Research Preview",privacyPolicy:"Datenschutzrichtlinie: Dieses Tool verarbeitet Daten lokal. Keine Patientendaten werden gespeichert oder übertragen.",medicalDisclaimer:"Medizinischer Haftungsausschluss: Dieses Tool dient nur zur klinischen Entscheidungsunterstützung. Verwenden Sie immer klinisches Urteilsvermögen und befolgen Sie lokale Protokolle.",networkError:"Netzwerkfehler - bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut",requestTimeout:"Anfrage-Timeout - bitte versuchen Sie es erneut",apiError:"Ergebnisse konnten nicht abgerufen werden",validationError:"Bitte überprüfen Sie Ihre Eingabewerte",sessionTimeout:"Ihre Sitzung war 30 Minuten lang inaktiv. Möchten Sie fortfahren?",unsavedData:"Sie haben ungespeicherte Daten. Sind Sie sicher, dass Sie verlassen möchten?",nearestCentersTitle:"Nächstgelegene Schlaganfall-Zentren",useCurrentLocation:"Aktuellen Standort verwenden",enterLocationPlaceholder:"Stadt oder Adresse eingeben...",enterManually:"Standort manuell eingeben",search:"Suchen",yourLocation:"Ihr Standort",recommendedCenters:"Empfohlene Zentren",alternativeCenters:"Alternative Zentren",noCentersFound:"Keine Schlaganfall-Zentren in diesem Bereich gefunden",gettingLocation:"Standort wird ermittelt",searchingLocation:"Standort wird gesucht",locationError:"Standort konnte nicht ermittelt werden",locationPermissionDenied:"Standortzugriff verweigert. Bitte erlauben Sie Standortzugriff und versuchen Sie es erneut.",locationUnavailable:"Standortinformationen sind nicht verfügbar",locationTimeout:"Standortanfrage ist abgelaufen",geolocationNotSupported:"Geolokalisierung wird von diesem Browser nicht unterstützt",geocodingNotImplemented:"Standortsuche nicht verfügbar. Bitte verwenden Sie GPS oder geben Sie Koordinaten manuell ein.",tryManualEntry:"Versuchen Sie, Ihren Standort manuell einzugeben oder GPS zu verwenden.",distanceNote:"Entfernungen werden als Luftlinie berechnet. Tatsächliche Fahrzeiten können variieren.",travelTimeNote:"Fahrzeiten berechnet für Rettungsfahrzeuge mit Sondersignalen und Vorfahrtsberechtigung.",calculatingTravelTimes:"Fahrzeiten werden berechnet",minutes:"Min",poweredByOrs:"Fahrzeiten bereitgestellt von OpenRoute Service",comprehensiveCenter:"Überregionales Schlaganfall-Zentrum",primaryCenter:"Regionales Schlaganfall-Zentrum",telemetryCenter:"Telemedizin-Zentrum",thrombectomy:"Thrombektomie",neurosurgery:"Neurochirurgie",icu:"Intensivstation",telemedicine:"Telemedizin",stroke_unit:"Stroke Unit",call:"Anrufen",directions:"Wegbeschreibung",emergency:"Notfall",certified:"Zertifiziert",prerequisitesTitle:"Voraussetzungen für Schlaganfall-Triage",prerequisitesIntro:"Bitte bestätigen Sie, dass alle folgenden Voraussetzungen erfüllt sind:",prerequisitesWarning:"Alle Voraussetzungen müssen erfüllt sein, um fortzufahren",continue:"Weiter",acute_deficit:"Akutes (schweres) neurologisches Defizit vorhanden",symptom_onset:"Symptombeginn innerhalb 6h",no_preexisting:"Keine vorbestehende schwere neurologische Defizite",no_trauma:"Kein Schädelhirntrauma vorhanden",differentialDiagnoses:"Differentialdiagnosen",reconfirmTimeWindow:"Bitte Zeitfenster rekonfirmieren!",unclearTimeWindow:"Bei unklarem/erweitertem Zeitfenster ist auch ein beginnend demarkierter Hirninfarkt möglich",rareDiagnoses:"Seltene Diagnosen wie ein Glioblastom sind auch möglich",researchAccessRequired:"Forschungszugang erforderlich",researchPreviewDescription:"Dies ist eine Forschungsvorschau des iGFAP Schlaganfall-Triage-Assistenten zur klinischen Validierung.",importantNotice:"Wichtiger Hinweis",researchUseOnly:"Nur für Forschungszwecke",researchUseOnlyDesc:"Nicht für klinische Entscheidungen",noPatientDataStorage:"Keine Patientendatenspeicherung",noPatientDataStorageDesc:"Alle Daten werden lokal verarbeitet",clinicalAdvisory:"Klinische Beratung",clinicalAdvisoryDesc:"Unter Aufsicht von Prof. Christian Förch & Dr. Lovepreet Kalra",contact:"Kontakt",researchAccessCode:"Forschungszugangscode",enterResearchAccessCode:"Forschungszugangscode eingeben",accessResearchSystem:"Zugang zum Forschungssystem",regulatoryStatus:"Regulatorischer Status",regulatoryStatusDesc:"Forschungsprototyp - CE-Zertifizierung ausstehend",dataProtection:"Datenschutz",dataProtectionDesc:"DSGVO-konform - nur lokale Verarbeitung",clinicalOversight:"Klinische Aufsicht",clinicalOversightDesc:"RKH Klinikum Ludwigsburg, Neurologie",accessDenied:"Zugriff verweigert",invalidResearchCode:"Ungültiger Forschungszugangscode. Bitte versuchen Sie es erneut."}};class qt{constructor(){this.supportedLanguages=["en","de"],this.currentLanguage=this.detectLanguage()}detectLanguage(){const e=localStorage.getItem("language");return e&&this.supportedLanguages.includes(e)?e:(navigator.language||navigator.userLanguage).substring(0,2).toLowerCase()==="de"?"de":"en"}getCurrentLanguage(){return this.currentLanguage}setLanguage(e){return this.supportedLanguages.includes(e)?(this.currentLanguage=e,localStorage.setItem("language",e),window.dispatchEvent(new CustomEvent("languageChanged",{detail:{language:e}})),!0):!1}getSupportedLanguages(){return[...this.supportedLanguages]}t(e){return(Ce[this.currentLanguage]||Ce.en)[e]||e}toggleLanguage(){const e=this.currentLanguage==="en"?"de":"en";return this.setLanguage(e)}getLanguageDisplayName(e=null){const t=e||this.currentLanguage;return{en:"English",de:"Deutsch"}[t]||t}formatDateTime(e){const t=this.currentLanguage==="de"?"de-DE":"en-US";return new Intl.DateTimeFormat(t,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)}formatTime(e){const t=this.currentLanguage==="de"?"de-DE":"en-US";return new Intl.DateTimeFormat(t,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)}}const R=new qt,o=i=>R.t(i),jt=()=>[{id:"acute_deficit",checked:!1},{id:"symptom_onset",checked:!1},{id:"no_preexisting",checked:!1},{id:"no_trauma",checked:!1}];function Yt(){const i=jt();return`
    <div id="prerequisitesModal" class="modal prerequisites-modal" style="display: flex;">
      <div class="modal-content prerequisites-content">
        <div class="modal-header">
          <h2>${o("prerequisitesTitle")}</h2>
          <button class="modal-close" id="closePrerequisites">&times;</button>
        </div>
        
        <div class="modal-body">
          <p class="prerequisites-intro">
            ${o("prerequisitesIntro")}
          </p>
          
          <div class="prerequisites-list">
            ${i.map(e=>`
              <div class="prerequisite-item" data-id="${e.id}">
                <label class="toggle-switch">
                  <input type="checkbox" id="${e.id}" class="toggle-input">
                  <span class="toggle-slider"></span>
                </label>
                <span class="prerequisite-label">
                  ${o(e.id)}
                </span>
              </div>
            `).join("")}
          </div>
          
          <div class="prerequisites-warning" id="prerequisitesWarning" style="display: none;">
            <span class="warning-icon">⚠️</span>
            <span class="warning-text">
              ${o("prerequisitesWarning")}
            </span>
          </div>
        </div>
        
        <div class="modal-footer">
          <div class="button-group">
            <button type="button" class="secondary" id="cancelPrerequisites">
              ${o("cancel")}
            </button>
            <button type="button" class="primary" id="confirmPrerequisites">
              ${o("continue")}
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function Qt(){const i=document.getElementById("prerequisitesModal");if(!i)return;const e=document.getElementById("closePrerequisites"),t=document.getElementById("cancelPrerequisites"),s=document.getElementById("confirmPrerequisites"),a=()=>{i.remove(),G("welcome")};e==null||e.addEventListener("click",a),t==null||t.addEventListener("click",a),s==null||s.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const l=i.querySelectorAll(".toggle-input");if(Array.from(l).every(d=>d.checked))i.remove(),G("triage2");else{const d=document.getElementById("prerequisitesWarning");d&&(d.style.display="flex",d.classList.add("shake"),setTimeout(()=>d.classList.remove("shake"),500))}});const r=i.querySelectorAll(".toggle-input");r.forEach(n=>{n.addEventListener("change",()=>{const l=Array.from(r).every(d=>d.checked),c=document.getElementById("prerequisitesWarning");l&&c&&(c.style.display="none")})})}function Zt(){const i=document.getElementById("prerequisitesModal");i&&i.remove();const e=document.createElement("div");try{j(e,Yt());const t=e.firstElementChild;if(!t)throw new Error("Failed to create modal element");document.body.appendChild(t)}catch(t){console.error("Prerequisites modal sanitization failed:",t);const s=document.createElement("div");s.className="modal prerequisites-modal",s.style.display="flex",s.textContent="Prerequisites modal could not be displayed securely. Please refresh the page.",document.body.appendChild(s);return}Qt()}function Jt(i){m.logEvent("triage1_answer",{comatose:i}),i?G("coma"):Zt()}function Xt(i){m.logEvent("triage2_answer",{examinable:i}),G(i?"full":"limited")}function G(i){m.logEvent("navigate",{from:m.getState().currentScreen,to:i}),m.navigate(i),window.scrollTo(0,0)}function es(){m.hasUnsavedData()&&!confirm("Are you sure you want to start over? All entered data will be lost.")||(m.logEvent("reset"),m.reset())}function ts(){m.goBack()?(m.logEvent("navigate_back"),window.scrollTo(0,0)):Ye()}function Ye(){m.logEvent("navigate_home"),m.goHome(),window.scrollTo(0,0)}async function ss(i,e){var c,d;i.preventDefault();const t=i.target,{module:s}=t.dataset,a=ft(t);if(!a.isValid){yt(e,a.validationErrors);try{const u=Object.keys(a.validationErrors)[0];if(u&&t.elements[u]){const E=t.elements[u];E.focus({preventScroll:!0}),E.scrollIntoView({behavior:"smooth",block:"center"})}const h=document.createElement("div");h.className="sr-only",h.setAttribute("role","status"),h.setAttribute("aria-live","polite");const g=Object.keys(a.validationErrors).length;h.textContent=`${g} field${g===1?"":"s"} need attention.`,document.body.appendChild(h),setTimeout(()=>h.remove(),1200)}catch(u){}return}const r={};Array.from(t.elements).forEach(u=>{if(u.name)if(u.type==="checkbox")r[u.name]=u.checked;else if(u.type==="number"){const h=parseFloat(u.value);r[u.name]=isNaN(h)?0:h}else u.type==="hidden"&&u.name==="armparese"?r[u.name]=u.value==="true":r[u.name]=u.value}),m.setFormData(s,r);const n=t.querySelector("button[type=submit]"),l=n?n.innerHTML:"";if(n){n.disabled=!0;try{j(n,`<span class="loading-spinner"></span> ${o("analyzing")}`)}catch(u){console.error("Button loading state sanitization failed:",u),n.textContent=o("analyzing")||"Analyzing..."}}try{console.log("[Submit] Module:",s),console.log("[Submit] Inputs:",r);let u;switch(s){case"coma":u={ich:{...await Ue(r),module:"Coma"},lvo:null};break;case"limited":u={ich:{...await ze(r),module:"Limited"},lvo:{notPossible:!0}};break;case"full":if(u=await Be(r),console.log("[Submit] Full results:",{ich:!!(u!=null&&u.ich),lvo:!!(u!=null&&u.lvo),ichP:(c=u==null?void 0:u.ich)==null?void 0:c.probability,lvoP:(d=u==null?void 0:u.lvo)==null?void 0:d.probability}),!u||!u.ich)throw new Error("Invalid response structure from Full Stroke API");u.ich&&!u.ich.probability&&u.ich.ich_probability!==void 0&&(u.ich.probability=u.ich.ich_probability,console.log("[Submit] Fixed ICH probability for Full Stroke:",u.ich.probability)),u.ich&&!u.ich.module&&(u.ich.module="Full Stroke"),u.lvo&&!u.lvo.module&&(u.lvo.module="Full Stroke");break;default:throw new Error(`Unknown module: ${s}`)}console.log("[Submit] Setting results in store:",u),m.setResults(u),m.logEvent("models_complete",{module:s,results:u});const h=m.getState();console.log("[Submit] State after setResults:",{hasResults:!!h.results,currentScreen:h.currentScreen}),console.log("[Submit] Navigating to results..."),G("results"),Ie("✅ Results loaded",2e3),setTimeout(()=>{try{const g=m.getState().currentScreen;console.log("[Submit] currentScreen after navigate:",g),g!=="results"&&(m.navigate("results"),Ie("🔁 Forced results view",1500))}catch(g){}},0)}catch(u){const h=["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!0;if(s==="full"&&h)try{const E=qe.mockApiResponses.full_stroke,C=E.ich_prediction||{},N=E.lvo_prediction||{},W=parseFloat(C.probability)||0,F=parseFloat(N.probability)||0,le={ich:{probability:W>1?W/100:W,drivers:C.drivers||null,confidence:parseFloat(C.confidence)||.85,module:"Full Stroke"},lvo:{probability:F>1?F/100:F,drivers:N.drivers||null,confidence:parseFloat(N.confidence)||.85,module:"Full Stroke"}};m.setResults(le),m.logEvent("models_complete_fallback",{module:s,reason:u.message}),G("results");return}catch(E){}let g="An error occurred during analysis. Please try again.";if(u instanceof vt&&(g=u.message),is(e,g),n){n.disabled=!1;try{j(n,l)}catch(E){console.error("Button restore sanitization failed:",E),n.textContent="Submit"}}}}function is(i,e){i.querySelectorAll(".critical-alert").forEach(l=>{var c,d;(d=(c=l.querySelector("h4"))==null?void 0:c.textContent)!=null&&d.includes("Error")&&l.remove()});const t=document.createElement("div");t.className="critical-alert";const s=document.createElement("h4"),a=document.createElement("span");a.className="alert-icon",a.textContent="⚠️",s.appendChild(a),s.appendChild(document.createTextNode(" Error"));const r=document.createElement("p");r.textContent=e,t.appendChild(s),t.appendChild(r);const n=i.querySelector(".container");n?n.prepend(t):i.prepend(t),setTimeout(()=>t.remove(),1e4)}function Ie(i,e=2e3){try{const t=document.createElement("div");t.textContent=i,t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText=`
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: #0066CC;
      color: #fff;
      padding: 10px 14px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10000;
      font-size: 14px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 160ms ease;
    `,document.body.appendChild(t),requestAnimationFrame(()=>{t.style.opacity="1"}),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>t.remove(),200)},e)}catch(t){}}const w={LOW:"low",MEDIUM:"medium",HIGH:"high",CRITICAL:"critical"},S={NETWORK:"network",VALIDATION:"validation",AUTHENTICATION:"authentication",CALCULATION:"calculation",STORAGE:"storage",RENDERING:"rendering",MEDICAL:"medical",SECURITY:"security"};class T extends Error{constructor(e,t,s=S.MEDICAL,a=w.MEDIUM){super(e),this.name="MedicalError",this.code=t,this.category=s,this.severity=a,this.timestamp=new Date().toISOString(),this.context={}}withContext(e){return this.context={...this.context,...e},this}getUserMessage(){switch(this.category){case S.NETWORK:return"Network connection issue. Please check your internet connection and try again.";case S.VALIDATION:return"Please check your input data and try again.";case S.AUTHENTICATION:return"Authentication failed. Please log in again.";case S.CALCULATION:return"Unable to complete calculation. Please verify your input data.";case S.MEDICAL:return"Medical calculation could not be completed. Please verify all clinical data.";default:return"An unexpected error occurred. Please try again."}}}class as{constructor(){this.errorQueue=[],this.maxQueueSize=100,this.setupGlobalHandlers()}setupGlobalHandlers(){window.addEventListener("unhandledrejection",e=>{this.handleError(e.reason,S.NETWORK,w.HIGH),e.preventDefault()}),window.addEventListener("error",e=>{this.handleError(e.error,S.RENDERING,w.MEDIUM)})}handleError(e,t=S.NETWORK,s=w.MEDIUM){const a={error:e instanceof Error?e:new Error(String(e)),category:t,severity:s,timestamp:new Date().toISOString(),userAgent:navigator.userAgent.substring(0,100),url:window.location.href};this.errorQueue.push(a),this.errorQueue.length>this.maxQueueSize&&this.errorQueue.shift(),s===w.CRITICAL&&this.handleCriticalError(a)}handleCriticalError(e){e.category===S.MEDICAL&&this.showMedicalAlert(e.error.message)}showMedicalAlert(e){const t=document.createElement("div");t.className="critical-medical-alert",t.style.cssText=`
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff4444;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      max-width: 90%;
      text-align: center;
    `,t.textContent=`⚠️ Medical Error: ${e}`,document.body.appendChild(t),setTimeout(()=>{document.body.contains(t)&&document.body.removeChild(t)},1e4)}getErrorSummary(){return{totalErrors:this.errorQueue.length,criticalErrors:this.errorQueue.filter(e=>e.severity===w.CRITICAL).length,recentErrors:this.errorQueue.slice(-10)}}}const rs=new as;async function y(i,e={}){const{category:t=S.NETWORK,severity:s=w.MEDIUM,fallback:a=null,timeout:r=3e4,retries:n=0,context:l={}}=e;for(let c=0;c<=n;c++)try{const d=new Promise((h,g)=>{setTimeout(()=>g(new Error("Operation timeout")),r)});return await Promise.race([i(),d])}catch(d){if(rs.handleError(d,t,s),c<n){await new Promise(h=>setTimeout(h,1e3*(c+1)));continue}if(a!==null)return typeof a=="function"?a(d):a;throw new T(d.message||"Operation failed",d.code||"UNKNOWN",t,s).withContext(l)}}async function Le(i,e={}){return y(i,{category:S.AUTHENTICATION,severity:w.HIGH,timeout:15e3,fallback:()=>({success:!1,error:!0,message:"Authentication service unavailable"}),...e})}function ns(i){const e=[],t=[];return!i||typeof i!="object"?(e.push("Patient data must be an object"),{isValid:!1,errors:e,warnings:t}):((typeof i.age!="number"||i.age<0||i.age>120)&&e.push("Age must be a number between 0 and 120"),["male","female","other"].includes(i.gender)||e.push('Gender must be "male", "female", or "other"'),(typeof i.gfap!="number"||i.gfap<29||i.gfap>10001)&&e.push("GFAP must be a number between 29 and 10001 pg/mL"),i.nihss!==void 0&&(typeof i.nihss!="number"||i.nihss<0||i.nihss>42)&&e.push("NIHSS must be a number between 0 and 42"),i.gcs!==void 0&&(typeof i.gcs!="number"||i.gcs<3||i.gcs>15)&&e.push("GCS must be a number between 3 and 15"),i.sbp!==void 0&&(typeof i.sbp!="number"||i.sbp<50||i.sbp>300)&&t.push("Systolic BP should typically be between 50-300 mmHg"),i.dbp!==void 0&&(typeof i.dbp!="number"||i.dbp<30||i.dbp>200)&&t.push("Diastolic BP should typically be between 30-200 mmHg"),{isValid:e.length===0,errors:e,warnings:t})}function os(i){const e=[],t=[];return!i||typeof i!="object"?(e.push("ICH risk result must be an object"),{isValid:!1,errors:e,warnings:t}):((typeof i.probability!="number"||i.probability<0||i.probability>1)&&e.push("Probability must be a number between 0 and 1"),(typeof i.percentage!="number"||i.percentage<0||i.percentage>100)&&e.push("Percentage must be a number between 0 and 100"),["low","moderate","high","critical"].includes(i.riskLevel)||e.push('Risk level must be "low", "moderate", "high", or "critical"'),(!i.timestamp||!Date.parse(i.timestamp))&&e.push("Timestamp must be a valid ISO date string"),{isValid:e.length===0,errors:e,warnings:t})}function ls(i){return ns(i).isValid}function cs(i){return os(i).isValid}class ds{static ensureType(e,t,s){let a=!1,r=typeof e;switch(t){case"PatientData":a=ls(e),r="Invalid PatientData";break;case"ICHRiskResult":a=cs(e),r="Invalid ICHRiskResult";break;case"number":a=typeof e=="number"&&!isNaN(e);break;case"string":a=typeof e=="string";break;case"boolean":a=typeof e=="boolean";break;default:a=typeof e===t}if(!a)throw new TypeError(`Type error in ${s}: expected ${t}, got ${r}. This is a critical error in medical calculations.`)}static ensureRange(e,t,s){this.ensureType(e,"number",s);const[a,r]=t;if(e<a||e>r)throw new RangeError(`Range error in ${s}: value ${e} must be between ${a} and ${r}. This is a critical error in medical calculations.`)}}const $={DEBUG:{level:0,name:"DEBUG",color:"#6366f1"},INFO:{level:1,name:"INFO",color:"#10b981"},WARN:{level:2,name:"WARN",color:"#f59e0b"},ERROR:{level:3,name:"ERROR",color:"#ef4444"},CRITICAL:{level:4,name:"CRITICAL",color:"#dc2626"}},b={AUTHENTICATION:"AUTH",MEDICAL_CALCULATION:"MEDICAL",NETWORK:"NETWORK",PERFORMANCE:"PERF",SECURITY:"SECURITY",USER_INTERACTION:"UI",DATA_VALIDATION:"VALIDATION",AUDIT:"AUDIT",SYSTEM:"SYSTEM",ERROR:"ERROR"};class us{constructor(){this.logLevel=this.getLogLevel(),this.sessionId=this.generateSessionId(),this.logBuffer=[],this.maxBufferSize=1e3,this.isProduction=window.location.hostname!=="localhost"&&window.location.hostname!=="127.0.0.1",this.enableConsole=!this.isProduction,this.enableStorage=!0,this.enableNetwork=!1,this.setupErrorHandlers(),this.startPeriodicFlush()}getLogLevel(){try{const e=localStorage.getItem("medicalLogLevel");if(e&&$[e.toUpperCase()])return $[e.toUpperCase()].level}catch(e){}return this.isProduction?$.INFO.level:$.DEBUG.level}generateSessionId(){const e=Date.now().toString(36),t=Math.random().toString(36).substring(2,8);return`sess_${e}_${t}`}setupErrorHandlers(){window.addEventListener("error",e=>{var t;try{this.critical("Unhandled JavaScript Error",{category:b.ERROR,message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno,stack:(t=e.error)==null?void 0:t.stack})}catch(s){console.error("Logging failed:",s),console.error("Original error:",e.error)}}),window.addEventListener("unhandledrejection",e=>{var t,s;try{this.critical("Unhandled Promise Rejection",{category:b.ERROR,reason:((t=e.reason)==null?void 0:t.message)||String(e.reason)||"Unknown rejection",stack:(s=e.reason)==null?void 0:s.stack})}catch(a){console.error("Logging failed:",a),console.error("Original rejection:",e.reason)}})}createLogEntry(e,t,s={}){var l;const a=s&&typeof s=="object"?s:{},r={timestamp:new Date().toISOString(),level:((l=$[e])==null?void 0:l.name)||e,category:a.category||b.SYSTEM,message:this.sanitizeMessage(t),sessionId:this.sessionId,context:this.sanitizeContext(a),performance:this.getPerformanceMetrics()};(e==="ERROR"||e==="CRITICAL")&&(r.stackTrace=new Error().stack);const n=this.getAnonymizedUserId();return n&&(r.userId=n),r}sanitizeMessage(e){return typeof e!="string"&&(e=String(e)),e.replace(/\b\d{3}-\d{2}-\d{4}\b/g,"***-**-****").replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,"***@***.***").replace(/\b\d{10,}\b/g,"**********").replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,"[NAME]")}sanitizeContext(e){if(!e||typeof e!="object")return{};const t={...e},s=["password","token","sessionToken","authToken","patientName","firstName","lastName","fullName","email","phone","ssn","mrn","dob","dateOfBirth"],a=r=>{if(!r||typeof r!="object")return r;const n=Array.isArray(r)?[]:{};for(const[l,c]of Object.entries(r)){const d=l.toLowerCase();s.some(u=>d.includes(u))?n[l]="[REDACTED]":typeof c=="object"&&c!==null?n[l]=a(c):n[l]=c}return n};return a(t)}getAnonymizedUserId(){try{const e=sessionStorage.getItem("session_hash");if(e)return`user_${e.substring(0,8)}`}catch(e){}return null}getPerformanceMetrics(){var e;try{if("performance"in window){const t=Me.getEntriesByType("navigation")[0];return{memoryUsed:((e=Me.memory)==null?void 0:e.usedJSHeapSize)||0,loadTime:(t==null?void 0:t.loadEventEnd)-(t==null?void 0:t.loadEventStart)||0,domReady:(t==null?void 0:t.domContentLoadedEventEnd)-(t==null?void 0:t.domContentLoadedEventStart)||0}}}catch(t){}return null}log(e,t,s={}){return y(async()=>{if(!e||!t)return;const a=$[e.toUpperCase()];if(!a||a.level<this.logLevel)return;const r=this.createLogEntry(e.toUpperCase(),t,s);this.addToBuffer(r),this.enableConsole&&this.outputToConsole(r),this.enableStorage&&this.storeEntry(r),this.enableNetwork&&await this.sendToLoggingService(r)},{category:S.SYSTEM,context:{operation:"logging",level:e,message:t.substring(0,100)}})}addToBuffer(e){this.logBuffer.push(e),this.logBuffer.length>this.maxBufferSize&&(this.logBuffer=this.logBuffer.slice(-this.maxBufferSize))}outputToConsole(e){const t=$[e.level],a=`color: ${(t==null?void 0:t.color)||"#666666"}; font-weight: bold;`,r=new Date(e.timestamp).toLocaleTimeString();e.level==="ERROR"||e.level==="CRITICAL"||e.level,console.groupCollapsed(`%c[${e.level}] ${r} [${e.category}] ${e.message}`,a),e.context&&Object.keys(e.context).length>0&&console.log("Context:",e.context),e.performance&&console.log("Performance:",e.performance),e.stackTrace&&(e.level==="ERROR"||e.level==="CRITICAL")&&console.log("Stack Trace:",e.stackTrace),console.groupEnd()}storeEntry(e){try{const t=`medicalLog_${e.timestamp}`,s=JSON.stringify(e);sessionStorage.setItem(t,s),this.cleanOldEntries()}catch(t){}}cleanOldEntries(){try{const e=Object.keys(sessionStorage).filter(t=>t.startsWith("medicalLog_")).sort().reverse();e.length>100&&e.slice(100).forEach(t=>{sessionStorage.removeItem(t)})}catch(e){}}async sendToLoggingService(e){return Promise.resolve()}startPeriodicFlush(){setInterval(()=>{this.flushBuffer()},3e4)}flushBuffer(){this.logBuffer.length!==0&&this.info("Log buffer flushed",{category:b.SYSTEM,entriesCount:this.logBuffer.length})}debug(e,t={}){return this.log("DEBUG",e,t)}info(e,t={}){return this.log("INFO",e,t)}warn(e,t={}){return this.log("WARN",e,t)}error(e,t={}){return this.log("ERROR",e,t)}critical(e,t={}){return this.log("CRITICAL",e,t)}medicalCalculation(e,t,s={}){return this.info(`Medical calculation: ${e}`,{category:b.MEDICAL_CALCULATION,operation:e,success:!s.error,...s})}authentication(e,t,s={}){return this.info(`Authentication: ${e}`,{category:b.AUTHENTICATION,action:e,success:t,...s})}userInteraction(e,t={}){return this.debug(`User interaction: ${e}`,{category:b.USER_INTERACTION,action:e,...t})}networkRequest(e,t,s,a={}){const r=s>=400?"ERROR":s>=300?"WARN":"DEBUG";return this.log(r,`Network request: ${t} ${e}`,{category:b.NETWORK,method:t,url:this.sanitizeUrl(e),status:s,...a})}performance(e,t,s={}){return this.debug(`Performance metric: ${e} = ${t}`,{category:b.PERFORMANCE,metric:e,value:t,...s})}auditTrail(e,t={}){return this.info(`Audit: ${e}`,{category:b.AUDIT,event:e,...t})}sanitizeUrl(e){try{const t=new URL(e);return["token","auth","key","secret"].forEach(a=>{t.searchParams.has(a)&&t.searchParams.set(a,"[REDACTED]")}),t.toString()}catch(t){return e}}getLogs(e={}){var a;const t=[...this.logBuffer];try{Object.keys(sessionStorage).filter(n=>n.startsWith("medicalLog_")).sort().forEach(n=>{try{const l=JSON.parse(sessionStorage.getItem(n));l&&!t.find(c=>c.timestamp===l.timestamp)&&t.push(l)}catch(l){}})}catch(r){}let s=t.sort((r,n)=>new Date(n.timestamp)-new Date(r.timestamp));if(e.level){const r=((a=$[e.level.toUpperCase()])==null?void 0:a.level)||0;s=s.filter(n=>{var c;return(((c=$[n.level])==null?void 0:c.level)||0)>=r})}if(e.category&&(s=s.filter(r=>r.category===e.category)),e.since){const r=new Date(e.since);s=s.filter(n=>new Date(n.timestamp)>=r)}return e.limit&&(s=s.slice(0,e.limit)),s}exportLogs(e="json"){const t=this.getLogs();return e==="csv"?this.logsToCSV(t):JSON.stringify(t,null,2)}logsToCSV(e){if(e.length===0)return"";const t=["timestamp","level","category","message","sessionId"],s=e.map(a=>[a.timestamp,a.level,a.category,`"${a.message.replace(/"/g,'""')}"`,a.sessionId]);return[t.join(","),...s.map(a=>a.join(","))].join(`
`)}clearLogs(){this.logBuffer=[];try{Object.keys(sessionStorage).filter(t=>t.startsWith("medicalLog_")).forEach(t=>sessionStorage.removeItem(t))}catch(e){}this.info("Log storage cleared",{category:b.SYSTEM})}}const v=new us,{debug:Yi,info:Qi,warn:Zi,error:Ji,critical:Xi,medicalCalculation:ea,authentication:ta,userInteraction:sa,networkRequest:ia,performance:Me,auditTrail:aa}=v;class hs{constructor(){this.isAuthenticated=!1,this.sessionToken=null,this.sessionExpiry=null,this.lastActivity=Date.now(),this.setupActivityTracking()}async authenticate(e){return Le(async()=>{if(v.info("Authentication attempt started",{category:b.AUTHENTICATION,hasPassword:!!e&&e.length>0,isDevelopment:qe.isDevelopment}),ds.ensureType(e,"string","authentication password"),!e||e.trim().length===0)throw v.warn("Authentication failed: empty password",{category:b.AUTHENTICATION}),new T("Password is required","EMPTY_PASSWORD",S.VALIDATION,w.MEDIUM);v.debug("Sending authentication request to backend",{category:b.AUTHENTICATION,url:X.AUTHENTICATE});const t=await fetch(X.AUTHENTICATE,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e.trim()})});if(!t.ok){let a="Authentication failed",r="AUTH_FAILED";throw t.status===429?(a="Too many authentication attempts. Please wait and try again.",r="RATE_LIMITED"):t.status>=500&&(a="Authentication service temporarily unavailable",r="SERVICE_ERROR"),new T(a,r,S.AUTHENTICATION,t.status>=500?w.HIGH:w.MEDIUM).withContext({statusCode:t.status,url:X.AUTHENTICATE})}const s=await t.json();if(!s||typeof s!="object")throw new T("Invalid response from authentication service","INVALID_RESPONSE",S.AUTHENTICATION,w.HIGH);if(s.success){this.isAuthenticated=!0,this.sessionToken=s.session_token,this.sessionExpiry=s.expires_at?new Date(s.expires_at):null,this.lastActivity=Date.now();try{this.storeSecureSession()}catch(a){console.warn("Session storage failed:",a.message)}return{success:!0,message:"Authentication successful",sessionDuration:s.session_duration}}throw await this.delayFailedAttempt(),new T(s.message||"Invalid credentials","INVALID_CREDENTIALS",S.AUTHENTICATION,w.MEDIUM).withContext({remainingAttempts:s.rate_limit_remaining,statusCode:t.status})},{timeout:15e3,fallback:t=>{var s;return{success:!1,message:t instanceof T?t.getUserMessage():"Authentication service unavailable. Please try again.",errorCode:t.code||"NETWORK_ERROR",details:t.message,remainingAttempts:(s=t.context)==null?void 0:s.remainingAttempts}},context:{operation:"user_authentication",endpoint:"authenticate"}})}isValidSession(){return this.isAuthenticated?this.sessionExpiry&&new Date>this.sessionExpiry?(this.logout(),!1):!0:this.checkStoredSession()}async validateSessionWithServer(){return this.sessionToken?Le(async()=>{if(["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!0)return this.updateActivity(),!0;const t=await fetch(X.AUTHENTICATE,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"validate_session",session_token:this.sessionToken})});if(!t.ok){if(t.status===401||t.status===403)return this.logout(),!1;throw new T("Session validation service error","VALIDATION_ERROR",S.AUTHENTICATION,w.MEDIUM).withContext({statusCode:t.status})}const s=await t.json();if(!s||typeof s!="object")throw new T("Invalid response from session validation service","INVALID_RESPONSE",S.AUTHENTICATION,w.MEDIUM);return s.success?(this.updateActivity(),!0):(this.logout(),!1)},{timeout:1e4,fallback:e=>(console.warn("Session validation failed, continuing with local session:",e.message),this.isValidSession()),context:{operation:"session_validation",endpoint:"validate_session"}}):!1}updateActivity(){this.lastActivity=Date.now(),this.storeAuthSession()}async logout(){v.info("User logout initiated",{category:b.AUTHENTICATION}),this.isAuthenticated=!1,this.sessionToken=null,this.sessionExpiry=null;try{await V("auth_session",!0),await V("auth_timestamp",!0),await V("session_token",!0),await V("session_expiry",!0),sessionStorage.removeItem("auth_session"),sessionStorage.removeItem("auth_timestamp"),sessionStorage.removeItem("session_token"),sessionStorage.removeItem("session_expiry"),v.info("Session data cleared during logout",{category:b.SECURITY})}catch(e){v.warn("Failed to clear some session data during logout",{category:b.SECURITY,error:e.message})}}async hashPassword(e){return y(async()=>{if(!e||typeof e!="string")throw new T("Invalid input for password hashing","INVALID_INPUT",S.VALIDATION,w.MEDIUM);if(!crypto||!crypto.subtle)throw new T("Crypto API not available","CRYPTO_UNAVAILABLE",S.SECURITY,w.HIGH);const s=new TextEncoder().encode(e),a=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(a)).map(l=>l.toString(16).padStart(2,"0")).join("")},{category:S.SECURITY,severity:w.HIGH,timeout:5e3,fallback:()=>{let t=0;for(let s=0;s<e.length;s++){const a=e.charCodeAt(s);t=(t<<5)-t+a,t&=t}return Math.abs(t).toString(16)},context:{operation:"password_hashing",inputLength:e?e.length:0}})}storeSecureSession(){return y(async()=>{if(!this.isAuthenticated||!this.sessionToken)throw new T("Cannot store session: not authenticated","NOT_AUTHENTICATED",S.AUTHENTICATION,w.LOW);if(typeof sessionStorage=="undefined")throw new T("Session storage not available","STORAGE_UNAVAILABLE",S.STORAGE,w.MEDIUM);return sessionStorage.setItem("auth_session","verified"),sessionStorage.setItem("auth_timestamp",this.lastActivity.toString()),sessionStorage.setItem("session_token",this.sessionToken),this.sessionExpiry&&sessionStorage.setItem("session_expiry",this.sessionExpiry.toISOString()),!0},{category:S.STORAGE,severity:w.LOW,timeout:1e3,fallback:e=>(console.warn("Failed to store session:",e.message),!1),context:{operation:"store_session",hasToken:!!this.sessionToken,hasExpiry:!!this.sessionExpiry}})}storeAuthSession(){this.storeSecureSession()}checkStoredSession(){try{return y(async()=>{if(typeof sessionStorage=="undefined")throw new T("Session storage not available","STORAGE_UNAVAILABLE",S.STORAGE,w.LOW);const e=await J("auth_session",!0),t=await J("auth_timestamp",!0),s=await J("session_token",!0),a=await J("session_expiry",!0);if(e==="verified"&&t&&s){if(a){const n=new Date(a);if(new Date>n)return this.logout(),!1;this.sessionExpiry=n}const r=parseInt(t);if(isNaN(r))throw new T("Invalid session timestamp","INVALID_SESSION_DATA",S.STORAGE,w.MEDIUM);return this.isAuthenticated=!0,this.sessionToken=s,this.lastActivity=r,!0}return this.logout(),!1},{category:S.STORAGE,severity:w.LOW,timeout:1e3,fallback:e=>(console.warn("Failed to check stored session:",e.message),this.logout(),!1),context:{operation:"check_stored_session"}})}catch(e){return this.logout(),!1}}setupActivityTracking(){const e=["mousedown","mousemove","keypress","scroll","touchstart"],t=()=>{this.isAuthenticated&&this.updateActivity()};e.forEach(s=>{document.addEventListener(s,t,{passive:!0})})}async delayFailedAttempt(){return y(async()=>new Promise(e=>{setTimeout(e,1e3)}),{category:S.AUTHENTICATION,severity:w.LOW,timeout:2e3,fallback:()=>Promise.resolve(),context:{operation:"auth_delay"}})}getSessionInfo(){if(!this.isAuthenticated)return{authenticated:!1};const e=this.sessionTimeout-(Date.now()-this.lastActivity),t=Math.floor(e/(60*60*1e3)),s=Math.floor(e%(60*60*1e3)/(60*1e3));return{authenticated:!0,timeRemaining:`${t}h ${s}m`,lastActivity:new Date(this.lastActivity).toLocaleTimeString()}}}const A=new hs;function z(i){const e=[{id:1,label:"Triage"},{id:2,label:"Assessment"},{id:3,label:"Results"}];let t='<div class="progress-indicator">';return e.forEach((s,a)=>{const r=s.id===i,n=s.id<i;t+=`
      <div class="progress-step ${r?"active":""} ${n?"completed":""}">
        ${n?"":s.id}
      </div>
    `,a<e.length-1&&(t+=`<div class="progress-line ${n?"completed":""}"></div>`)}),t+="</div>",t}function Re(){return`
    <div class="container">
      ${z(1)}
      <h2>${o("triage1Title")}</h2>
      <div class="triage-question">
        ${o("triage1Question")}
        <small>${o("triage1Help")}</small>
      </div>
      <div class="triage-buttons">
        <button class="yes-btn" data-action="triage1" data-value="true">${o("triage1Yes")}</button>
        <button class="no-btn" data-action="triage1" data-value="false">${o("triage1No")}</button>
      </div>
    </div>
  `}function ms(){return`
    <div class="container">
      ${z(1)}
      <h2>${o("triage2Title")}</h2>
      <div class="triage-question">
        ${o("triage2Question")}
        <small>${o("triage2Help")}</small>
      </div>
      <div class="triage-buttons">
        <button class="yes-btn" data-action="triage2" data-value="true">${o("triage2Yes")}</button>
        <button class="no-btn" data-action="triage2" data-value="false">${o("triage2No")}</button>
      </div>
    </div>
  `}function gs(){return`
    <div class="container">
      ${z(2)}
      <h2>${o("comaModuleTitle")||"Coma Module"}</h2>
      <form data-module="coma">
        <div class="input-grid">
          <div class="input-group">
            <label for="gfap_value">
              ${o("gfapValueLabel")}
              <span class="tooltip">ℹ️
                <span class="tooltiptext">${o("gfapTooltipLong")}</span>
              </span>
            </label>
            <input type="number" id="gfap_value" name="gfap_value" min="${M.min}" max="${M.max}" step="0.1" required aria-describedby="gfap-help">
            <div id="gfap-help" class="input-help">
              ${o("gfapRange").replace("{min}",M.min).replace("{max}",M.max)}
            </div>
          </div>
        </div>
        <button type="submit" class="primary">${o("analyzeIchRisk")}</button>
        <button type="button" class="secondary" data-action="reset">${o("startOver")}</button>
      </form>
    </div>
  `}function ps(){return`
    <div class="container">
      ${z(2)}
      <h2>${o("limitedDataModuleTitle")||"Limited Data Module"}</h2>
      <form data-module="limited">
        <div class="input-grid">
          <div class="input-group">
            <label for="age_years">${o("ageYearsLabel")}</label>
            <input type="number" name="age_years" id="age_years" min="0" max="120" required aria-describedby="age-help">
            <div id="age-help" class="input-help">${o("ageYearsHelp")}</div>
          </div>
          <div class="input-group">
            <label for="systolic_bp">${o("systolicBpLabel")}</label>
            <div class="input-with-unit">
              <input type="number" name="systolic_bp" id="systolic_bp" min="60" max="300" required aria-describedby="sbp-help" inputmode="numeric">
              <span class="unit">mmHg</span>
            </div>
            <div id="sbp-help" class="input-help">${o("systolicBpHelp")}</div>
          </div>
          <div class="input-group">
            <label for="diastolic_bp">${o("diastolicBpLabel")}</label>
            <div class="input-with-unit">
              <input type="number" name="diastolic_bp" id="diastolic_bp" min="30" max="200" required aria-describedby="dbp-help" inputmode="numeric">
              <span class="unit">mmHg</span>
            </div>
            <div id="dbp-help" class="input-help">${o("diastolicBpHelp")}</div>
          </div>
          <div class="input-group">
            <label for="gfap_value">
              ${o("gfapValueLabel")}
              <span class="tooltip">ℹ️
                <span class="tooltiptext">${o("gfapTooltipLong")}</span>
              </span>
            </label>
            <div class="input-with-unit">
              <input type="number" name="gfap_value" id="gfap_value" min="${M.min}" max="${M.max}" step="0.1" required inputmode="decimal">
              <span class="unit">pg/mL</span>
            </div>
          </div>
        </div>
        <div class="checkbox-group">
          <label class="checkbox-wrapper">
            <input type="checkbox" name="vigilanzminderung" id="vigilanzminderung">
            <span class="checkbox-label">${o("vigilanceReduction")}</span>
          </label>
        </div>
        <button type="submit" class="primary">${o("analyzeIchRisk")}</button>
        <button type="button" class="secondary" data-action="reset">${o("startOver")}</button>
      </form>
    </div>
  `}function fs(){return`
    <div class="container">
      ${z(2)}
      <h2>${o("fullStrokeModuleTitle")||"Full Stroke Module"}</h2>
      <form data-module="full">
        <h3>${o("basicInformation")}</h3>
        <div class="input-grid">
          <div class="input-group">
            <label for="age_years">${o("ageYearsLabel")}</label>
            <input type="number" name="age_years" id="age_years" min="0" max="120" required>
          </div>
          <div class="input-group">
            <label for="systolic_bp">${o("systolicBpLabel")}</label>
            <div class="input-with-unit">
              <input type="number" name="systolic_bp" id="systolic_bp" min="60" max="300" required inputmode="numeric">
              <span class="unit">mmHg</span>
            </div>
          </div>
          <div class="input-group">
            <label for="diastolic_bp">${o("diastolicBpLabel")}</label>
            <div class="input-with-unit">
              <input type="number" name="diastolic_bp" id="diastolic_bp" min="30" max="200" required inputmode="numeric">
              <span class="unit">mmHg</span>
            </div>
          </div>
        </div>

        <h3>${o("biomarkersScores")}</h3>
        <div class="input-grid">
          <div class="input-group">
            <label for="gfap_value">
              ${o("gfapValueLabel")}
              <span class="tooltip">ℹ️
                <span class="tooltiptext">${o("gfapTooltip")}</span>
              </span>
            </label>
            <div class="input-with-unit">
              <input type="number" name="gfap_value" id="gfap_value" min="${M.min}" max="${M.max}" step="0.1" required inputmode="decimal">
              <span class="unit">pg/mL</span>
            </div>
          </div>
          <div class="input-group">
            <label for="fast_ed_score">
              ${o("fastEdScoreLabel")}
              <span class="tooltip">ℹ️
                <span class="tooltiptext">${o("fastEdCalculatorSubtitle")}</span>
              </span>
            </label>
            <input type="number" name="fast_ed_score" id="fast_ed_score" min="0" max="9" required readonly placeholder="${o("fastEdCalculatorSubtitle")}" style="cursor: pointer;">
            <input type="hidden" name="armparese" id="armparese_hidden" value="false">
            <input type="hidden" name="eye_deviation" id="eye_deviation_hidden" value="false">
          </div>
        </div>

        <h3>${o("clinicalSymptoms")}</h3>
        <div class="input-grid">
          <div class="checkbox-group">
            <label class="checkbox-wrapper">
              <input type="checkbox" name="headache" id="headache">
              <span class="checkbox-label">${o("headacheLabel")}</span>
            </label>
            <label class="checkbox-wrapper">
              <input type="checkbox" name="vigilanzminderung" id="vigilanzminderung">
              <span class="checkbox-label">${o("vigilanzLabel")}</span>
            </label>
          </div>
          <div class="checkbox-group">
            <label class="checkbox-wrapper">
              <input type="checkbox" name="beinparese" id="beinparese">
              <span class="checkbox-label">${o("legParesis")}</span>
            </label>
          </div>
        </div>

        <h3>${o("medicalHistory")}</h3>
        <div class="input-grid">
          <div class="checkbox-group">
            <label class="checkbox-wrapper">
              <input type="checkbox" name="atrial_fibrillation" id="atrial_fibrillation">
              <span class="checkbox-label">${o("atrialFibrillation")}</span>
            </label>
          </div>
          <div class="checkbox-group">
            <label class="checkbox-wrapper">
              <input type="checkbox" name="anticoagulated_noak" id="anticoagulated_noak">
              <span class="checkbox-label">${o("onNoacDoac")}</span>
            </label>
          </div>
          <div class="checkbox-group">
            <label class="checkbox-wrapper">
              <input type="checkbox" name="antiplatelets" id="antiplatelets">
              <span class="checkbox-label">${o("onAntiplatelets")}</span>
            </label>
          </div>
        </div>

        <button type="submit" class="primary">${o("analyzeStrokeRisk")}</button>
        <button type="button" class="secondary" data-action="reset">${o("startOver")}</button>
      </form>
    </div>
  `}function Qe(){return`
    <div class="critical-alert">
      <h4><span class="alert-icon">🚨</span> ${o("criticalAlertTitle")}</h4>
      <p>${o("criticalAlertMessage")}</p>
    </div>
  `}const ys={age_years:"ageLabel",age:"ageLabel",systolic_bp:"systolicLabel",diastolic_bp:"diastolicLabel",systolic_blood_pressure:"systolicLabel",diastolic_blood_pressure:"diastolicLabel",blood_pressure_systolic:"systolicLabel",blood_pressure_diastolic:"diastolicLabel",gfap_value:"gfapLabel",gfap:"gfapLabel",gfap_level:"gfapLabel",fast_ed_score:"fastEdLabel",fast_ed:"fastEdLabel",fast_ed_total:"fastEdLabel",vigilanzminderung:"vigilanzLabel",vigilance_reduction:"vigilanzLabel",reduced_consciousness:"vigilanzLabel",armparese:"armPareseLabel",arm_paresis:"armPareseLabel",arm_weakness:"armPareseLabel",beinparese:"beinPareseLabel",leg_paresis:"beinPareseLabel",leg_weakness:"beinPareseLabel",eye_deviation:"eyeDeviationLabel",blickdeviation:"eyeDeviationLabel",headache:"headacheLabel",kopfschmerzen:"headacheLabel",atrial_fibrillation:"atrialFibLabel",vorhofflimmern:"atrialFibLabel",anticoagulated_noak:"anticoagLabel",anticoagulation:"anticoagLabel",antiplatelets:"antiplateletsLabel",thrombozytenaggregationshemmer:"antiplateletsLabel"},vs=[{pattern:/_score$/,replacement:" Score"},{pattern:/_value$/,replacement:" Level"},{pattern:/_bp$/,replacement:" Blood Pressure"},{pattern:/_years?$/,replacement:" (years)"},{pattern:/^ich_/,replacement:"Brain Bleeding "},{pattern:/^lvo_/,replacement:"Large Vessel "},{pattern:/parese$/,replacement:"Weakness"},{pattern:/deviation$/,replacement:"Movement"}];function re(i){if(!i)return"";const e=ys[i.toLowerCase()];if(e){const s=o(e);if(s&&s!==e)return s}let t=i.toLowerCase();return vs.forEach(({pattern:s,replacement:a})=>{t=t.replace(s,a)}),t=t.replace(/_/g," ").replace(/\b\w/g,s=>s.toUpperCase()).trim(),t}function bs(i){return re(i).replace(/\s*\([^)]*\)\s*/g,"").trim()}function Ss(i,e=""){return i==null||i===""?"":typeof i=="boolean"?i?"✓":"✗":typeof i=="number"?e.includes("bp")||e.includes("blood_pressure")?`${i} mmHg`:e.includes("gfap")?`${i} pg/mL`:e.includes("age")?`${i} years`:e.includes("score")||Number.isInteger(i)?i.toString():i.toFixed(1):i.toString()}function ks(i,e){if(!(i!=null&&i.drivers)&&!(e!=null&&e.drivers))return"";let t=`
    <div class="drivers-section">
      <div class="drivers-header">
        <h3><span class="driver-header-icon">🎯</span> ${o("riskAnalysis")}</h3>
        <p class="drivers-subtitle">${o("riskAnalysisSubtitle")}</p>
      </div>
      <div class="enhanced-drivers-grid">
  `;return console.log("[Drivers] ICH has drivers:",!!(i!=null&&i.drivers),i==null?void 0:i.drivers),console.log("[Drivers] LVO has drivers:",!!(e!=null&&e.drivers),"notPossible:",e==null?void 0:e.notPossible,e==null?void 0:e.drivers),i!=null&&i.drivers&&(console.log("🧠 Rendering ICH drivers panel"),t+=_e(i.drivers,"ICH","ich",i.probability)),e!=null&&e.drivers&&!e.notPossible&&(console.log("🩸 Rendering LVO drivers panel"),t+=_e(e.drivers,"LVO","lvo",e.probability)),t+=`
      </div>
    </div>
  `,t}function _e(i,e,t,s){if(!i||Object.keys(i).length===0)return`
      <div class="enhanced-drivers-panel ${t}">
        <div class="panel-header">
          <div class="panel-icon ${t}">${t==="ich"?"🩸":"🧠"}</div>
          <div class="panel-title">
            <h4>${e} ${o("riskFactors")}</h4>
            <span class="panel-subtitle">${o("noDriverData")}</span>
          </div>
        </div>
        <p class="no-drivers-message">
          ${o("driverInfoNotAvailable")}
        </p>
      </div>
    `;const a=i;if(a.kind==="unavailable")return`
      <div class="enhanced-drivers-panel ${t}">
        <div class="panel-header">
          <div class="panel-icon ${t}">${t==="ich"?"🩸":"🧠"}</div>
          <div class="panel-title">
            <h4>${e} ${o("riskFactors")}</h4>
            <span class="panel-subtitle">${o("driverAnalysisUnavailable")}</span>
          </div>
        </div>
        <p class="no-drivers-message">
          ${o("driverAnalysisNotAvailable")}
        </p>
      </div>
    `;const r=(a.positive||[]).sort((h,g)=>Math.abs(g.weight)-Math.abs(h.weight)).slice(0,3),n=(a.negative||[]).sort((h,g)=>Math.abs(g.weight)-Math.abs(h.weight)).slice(0,3),l=Math.max(...r.map(h=>Math.abs(h.weight)),...n.map(h=>Math.abs(h.weight)),.01);console.log(`[Drivers] ${t} maxWeight:`,l),console.log(`[Drivers] ${t} positive:`,r.map(h=>`${h.label}: ${h.weight}`)),console.log(`[Drivers] ${t} negative:`,n.map(h=>`${h.label}: ${h.weight}`)),console.log(`[Drivers] ${t} positive weights:`,r.map(h=>Math.abs(h.weight))),console.log(`[Drivers] ${t} negative weights:`,n.map(h=>Math.abs(h.weight)));let c=`
    <div class="enhanced-drivers-panel ${t}">
      <div class="panel-header">
        <div class="panel-icon ${t}">${t==="ich"?"🩸":"🧠"}</div>
        <div class="panel-title">
          <h4>${e} ${o("riskFactors")}</h4>
          <span class="panel-subtitle">${o("contributingFactors")}</span>
        </div>
      </div>
      
      <div class="drivers-split-view">
        <div class="drivers-column positive-column">
          <div class="column-header">
            <span class="column-icon">↑</span>
            <span class="column-title">${o("increaseRisk")}</span>
          </div>
          <div class="compact-drivers">
  `;const d=r.reduce((h,g)=>h+Math.abs(g.weight),0);r.length>0?r.forEach((h,g)=>{const E=d>0?Math.abs(h.weight)/d*100:0,C=Math.abs(h.weight)/l*100;console.log(`[Drivers] ${t} positive driver "${h.label}": weight=${Math.abs(h.weight)}, relativeImportance=${E.toFixed(1)}%, barWidth=${C}%`);const N=re(h.label);c+=`
        <div class="compact-driver-item">
          <div class="compact-driver-label">${N}</div>
          <div class="compact-driver-bar positive" style="width: ${C}%">
            <span class="compact-driver-value">+${E.toFixed(0)}%</span>
          </div>
        </div>
      `}):c+=`<div class="no-factors">${o("noPositiveFactors")}</div>`,c+=`
          </div>
        </div>
        
        <div class="drivers-column negative-column">
          <div class="column-header">
            <span class="column-icon">↓</span>
            <span class="column-title">${o("decreaseRisk")}</span>
          </div>
          <div class="compact-drivers">
  `;const u=n.reduce((h,g)=>h+Math.abs(g.weight),0);return n.length>0?n.forEach((h,g)=>{const E=u>0?Math.abs(h.weight)/u*100:0,C=Math.abs(h.weight)/l*100;console.log(`[Drivers] ${t} negative driver "${h.label}": weight=${Math.abs(h.weight)}, relativeImportance=${E.toFixed(1)}%, barWidth=${C}%`);const N=re(h.label);c+=`
        <div class="compact-driver-item">
          <div class="compact-driver-label">${N}</div>
          <div class="compact-driver-bar negative" style="width: ${C}%">
            <span class="compact-driver-value">-${E.toFixed(0)}%</span>
          </div>
        </div>
      `}):c+=`<div class="no-factors">${o("noNegativeFactors")}</div>`,c+=`
          </div>
        </div>
      </div>
    </div>
  `,c}const Ze={bayern:{neurosurgicalCenters:[{id:"BY-NS-001",name:"LMU Klinikum München - Großhadern",address:"Marchioninistraße 15, 81377 München",coordinates:{lat:48.1106,lng:11.4684},phone:"+49 89 4400-0",emergency:"+49 89 4400-73331",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1440,network:"TEMPiS"},{id:"BY-NS-002",name:"Klinikum rechts der Isar München (TUM)",address:"Ismaninger Str. 22, 81675 München",coordinates:{lat:48.1497,lng:11.6052},phone:"+49 89 4140-0",emergency:"+49 89 4140-2249",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1161,network:"TEMPiS"},{id:"BY-NS-003",name:"Städtisches Klinikum München Schwabing",address:"Kölner Platz 1, 80804 München",coordinates:{lat:48.1732,lng:11.5755},phone:"+49 89 3068-0",emergency:"+49 89 3068-2050",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:648,network:"TEMPiS"},{id:"BY-NS-004",name:"Städtisches Klinikum München Bogenhausen",address:"Englschalkinger Str. 77, 81925 München",coordinates:{lat:48.1614,lng:11.6254},phone:"+49 89 9270-0",emergency:"+49 89 9270-2050",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:689,network:"TEMPiS"},{id:"BY-NS-005",name:"Universitätsklinikum Erlangen",address:"Maximiliansplatz 2, 91054 Erlangen",coordinates:{lat:49.5982,lng:11.0037},phone:"+49 9131 85-0",emergency:"+49 9131 85-39003",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1371,network:"TEMPiS"},{id:"BY-NS-006",name:"Universitätsklinikum Regensburg",address:"Franz-Josef-Strauß-Allee 11, 93053 Regensburg",coordinates:{lat:49.0134,lng:12.0991},phone:"+49 941 944-0",emergency:"+49 941 944-7501",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1042,network:"TEMPiS"},{id:"BY-NS-007",name:"Universitätsklinikum Würzburg",address:"Oberdürrbacher Str. 6, 97080 Würzburg",coordinates:{lat:49.784,lng:9.9721},phone:"+49 931 201-0",emergency:"+49 931 201-24444",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1264,network:"TEMPiS"},{id:"BY-NS-008",name:"Klinikum Nürnberg Nord",address:"Prof.-Ernst-Nathan-Str. 1, 90419 Nürnberg",coordinates:{lat:49.4521,lng:11.0767},phone:"+49 911 398-0",emergency:"+49 911 398-2369",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1368,network:"TEMPiS"},{id:"BY-NS-009",name:"Universitätsklinikum Augsburg",address:"Stenglinstr. 2, 86156 Augsburg",coordinates:{lat:48.3668,lng:10.9093},phone:"+49 821 400-01",emergency:"+49 821 400-2356",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1740,network:"TEMPiS"},{id:"BY-NS-010",name:"Klinikum Aschaffenburg-Alzenau",address:"Am Hasenkopf 1, 63739 Aschaffenburg",coordinates:{lat:49.9737,lng:9.157},phone:"+49 6021 32-0",emergency:"+49 6021 32-2800",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:40,network:"TRANSIT"},{id:"BY-NS-011",name:"Klinikum Landshut",address:"Robert-Koch-Str. 1, 84034 Landshut",coordinates:{lat:48.5665,lng:12.1512},phone:"+49 871 698-0",emergency:"+49 871 698-3333",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:505,network:"TEMPiS"},{id:"BY-NS-012",name:"Klinikum Coburg",address:"Ketschendorfer Str. 33, 96450 Coburg",coordinates:{lat:50.2596,lng:10.9644},phone:"+49 9561 22-0",emergency:"+49 9561 22-6800",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:547,network:"STENO"},{id:"BY-NS-013",name:"Klinikum Passau",address:"Bischof-Pilgrim-Str. 1, 94032 Passau",coordinates:{lat:48.5665,lng:13.4777},phone:"+49 851 5300-0",emergency:"+49 851 5300-2222",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:696,network:"TEMPiS"}],comprehensiveStrokeCenters:[{id:"BY-CS-001",name:"Klinikum Bamberg",address:"Buger Str. 80, 96049 Bamberg",coordinates:{lat:49.8988,lng:10.9027},phone:"+49 951 503-0",emergency:"+49 951 503-11101",thrombectomy:!0,thrombolysis:!0,beds:630,network:"TEMPiS"},{id:"BY-CS-002",name:"Klinikum Bayreuth",address:"Preuschwitzer Str. 101, 95445 Bayreuth",coordinates:{lat:49.9459,lng:11.5779},phone:"+49 921 400-0",emergency:"+49 921 400-5401",thrombectomy:!0,thrombolysis:!0,beds:848,network:"TEMPiS"},{id:"BY-CS-003",name:"Klinikum Coburg",address:"Ketschendorfer Str. 33, 96450 Coburg",coordinates:{lat:50.2596,lng:10.9685},phone:"+49 9561 22-0",emergency:"+49 9561 22-6300",thrombectomy:!0,thrombolysis:!0,beds:522,network:"TEMPiS"}],regionalStrokeUnits:[{id:"BY-RSU-001",name:"Goldberg-Klinik Kelheim",address:"Traubenweg 3, 93309 Kelheim",coordinates:{lat:48.9166,lng:11.8742},phone:"+49 9441 702-0",emergency:"+49 9441 702-6800",thrombolysis:!0,beds:200,network:"TEMPiS"},{id:"BY-RSU-002",name:"DONAUISAR Klinikum Deggendorf",address:"Perlasberger Str. 41, 94469 Deggendorf",coordinates:{lat:48.8372,lng:12.9619},phone:"+49 991 380-0",emergency:"+49 991 380-2201",thrombolysis:!0,beds:450,network:"TEMPiS"},{id:"BY-RSU-003",name:"Klinikum St. Elisabeth Straubing",address:"St.-Elisabeth-Str. 23, 94315 Straubing",coordinates:{lat:48.8742,lng:12.5733},phone:"+49 9421 710-0",emergency:"+49 9421 710-2000",thrombolysis:!0,beds:580,network:"TEMPiS"},{id:"BY-RSU-004",name:"Klinikum Freising",address:"Mainburger Str. 29, 85356 Freising",coordinates:{lat:48.4142,lng:11.7461},phone:"+49 8161 24-0",emergency:"+49 8161 24-2800",thrombolysis:!0,beds:380,network:"TEMPiS"},{id:"BY-RSU-005",name:"Klinikum Landkreis Erding",address:"Bajuwarenstr. 5, 85435 Erding",coordinates:{lat:48.3061,lng:11.9067},phone:"+49 8122 59-0",emergency:"+49 8122 59-2201",thrombolysis:!0,beds:350,network:"TEMPiS"},{id:"BY-RSU-006",name:"Helios Amper-Klinikum Dachau",address:"Krankenhausstr. 15, 85221 Dachau",coordinates:{lat:48.2599,lng:11.4342},phone:"+49 8131 76-0",emergency:"+49 8131 76-2201",thrombolysis:!0,beds:480,network:"TEMPiS"},{id:"BY-RSU-007",name:"Klinikum Fürstenfeldbruck",address:"Dachauer Str. 33, 82256 Fürstenfeldbruck",coordinates:{lat:48.1772,lng:11.2578},phone:"+49 8141 99-0",emergency:"+49 8141 99-2201",thrombolysis:!0,beds:420,network:"TEMPiS"},{id:"BY-RSU-008",name:"Klinikum Ingolstadt",address:"Krumenauerstraße 25, 85049 Ingolstadt",coordinates:{lat:48.7665,lng:11.4364},phone:"+49 841 880-0",emergency:"+49 841 880-2201",thrombolysis:!0,beds:665,network:"TEMPiS"},{id:"BY-RSU-009",name:"Klinikum Passau",address:"Bischof-Pilgrim-Str. 1, 94032 Passau",coordinates:{lat:48.5665,lng:13.4513},phone:"+49 851 5300-0",emergency:"+49 851 5300-2100",thrombolysis:!0,beds:540,network:"TEMPiS"},{id:"BY-RSU-010",name:"Klinikum Landshut",address:"Robert-Koch-Str. 1, 84034 Landshut",coordinates:{lat:48.5436,lng:12.1619},phone:"+49 871 698-0",emergency:"+49 871 698-3333",thrombolysis:!0,beds:790,network:"TEMPiS"},{id:"BY-RSU-011",name:"RoMed Klinikum Rosenheim",address:"Pettenkoferstr. 10, 83022 Rosenheim",coordinates:{lat:47.8567,lng:12.1265},phone:"+49 8031 365-0",emergency:"+49 8031 365-3711",thrombolysis:!0,beds:870,network:"TEMPiS"},{id:"BY-RSU-012",name:"Klinikum Memmingen",address:"Bismarckstr. 23, 87700 Memmingen",coordinates:{lat:47.9833,lng:10.1833},phone:"+49 8331 70-0",emergency:"+49 8331 70-2500",thrombolysis:!0,beds:520,network:"TEMPiS"},{id:"BY-RSU-013",name:"Klinikum Kempten-Oberallgäu",address:"Robert-Weixler-Str. 50, 87439 Kempten",coordinates:{lat:47.7261,lng:10.3097},phone:"+49 831 530-0",emergency:"+49 831 530-2201",thrombolysis:!0,beds:650,network:"TEMPiS"},{id:"BY-RSU-014",name:"Klinikum Aschaffenburg-Alzenau",address:"Am Hasenkopf 1, 63739 Aschaffenburg",coordinates:{lat:49.9747,lng:9.1581},phone:"+49 6021 32-0",emergency:"+49 6021 32-2700",thrombolysis:!0,beds:590,network:"TEMPiS"}],thrombolysisHospitals:[{id:"BY-TH-001",name:"Krankenhaus Vilsbiburg",address:"Sonnenstraße 10, 84137 Vilsbiburg",coordinates:{lat:48.6333,lng:12.2833},phone:"+49 8741 60-0",thrombolysis:!0,beds:180},{id:"BY-TH-002",name:"Krankenhaus Eggenfelden",address:"Pfarrkirchener Str. 5, 84307 Eggenfelden",coordinates:{lat:48.4,lng:12.7667},phone:"+49 8721 98-0",thrombolysis:!0,beds:220}]},badenWuerttemberg:{neurosurgicalCenters:[{id:"BW-NS-001",name:"Universitätsklinikum Freiburg",address:"Hugstetter Str. 55, 79106 Freiburg",coordinates:{lat:48.0025,lng:7.8347},phone:"+49 761 270-0",emergency:"+49 761 270-34010",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1600,network:"FAST"},{id:"BW-NS-002",name:"Universitätsklinikum Heidelberg",address:"Im Neuenheimer Feld 400, 69120 Heidelberg",coordinates:{lat:49.4178,lng:8.6706},phone:"+49 6221 56-0",emergency:"+49 6221 56-36643",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1621,network:"FAST"},{id:"BW-NS-003",name:"Universitätsklinikum Tübingen",address:"Geissweg 3, 72076 Tübingen",coordinates:{lat:48.5378,lng:9.0538},phone:"+49 7071 29-0",emergency:"+49 7071 29-82211",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1550,network:"FAST"},{id:"BW-NS-004",name:"Universitätsklinikum Ulm",address:"Albert-Einstein-Allee 23, 89081 Ulm",coordinates:{lat:48.4196,lng:9.9592},phone:"+49 731 500-0",emergency:"+49 731 500-63001",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1264,network:"FAST"},{id:"BW-NS-005",name:"Klinikum Stuttgart - Katharinenhospital",address:"Kriegsbergstraße 60, 70174 Stuttgart",coordinates:{lat:48.7784,lng:9.1682},phone:"+49 711 278-0",emergency:"+49 711 278-32001",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:950,network:"FAST"},{id:"BW-NS-006",name:"Städtisches Klinikum Karlsruhe",address:"Moltkestraße 90, 76133 Karlsruhe",coordinates:{lat:49.0047,lng:8.3858},phone:"+49 721 974-0",emergency:"+49 721 974-2301",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1570,network:"FAST"},{id:"BW-NS-007",name:"Klinikum Ludwigsburg",address:"Posilipostraße 4, 71640 Ludwigsburg",coordinates:{lat:48.8901,lng:9.1953},phone:"+49 7141 99-0",emergency:"+49 7141 99-67201",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:720,network:"FAST"}],comprehensiveStrokeCenters:[{id:"BW-CS-001",name:"Universitätsmedizin Mannheim",address:"Theodor-Kutzer-Ufer 1-3, 68167 Mannheim",coordinates:{lat:49.4828,lng:8.4664},phone:"+49 621 383-0",emergency:"+49 621 383-2251",thrombectomy:!0,thrombolysis:!0,beds:1400,network:"FAST"}],regionalStrokeUnits:[{id:"BW-RSU-001",name:"Robert-Bosch-Krankenhaus Stuttgart",address:"Auerbachstraße 110, 70376 Stuttgart",coordinates:{lat:48.7447,lng:9.2294},phone:"+49 711 8101-0",emergency:"+49 711 8101-3456",thrombolysis:!0,beds:850,network:"FAST"}],thrombolysisHospitals:[]},nordrheinWestfalen:{neurosurgicalCenters:[{id:"NRW-NS-001",name:"Universitätsklinikum Düsseldorf",address:"Moorenstraße 5, 40225 Düsseldorf",coordinates:{lat:51.1906,lng:6.8064},phone:"+49 211 81-0",emergency:"+49 211 81-17700",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1300,network:"NEVANO+"},{id:"NRW-NS-002",name:"Universitätsklinikum Köln",address:"Kerpener Str. 62, 50937 Köln",coordinates:{lat:50.9253,lng:6.9187},phone:"+49 221 478-0",emergency:"+49 221 478-32500",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1500,network:"NEVANO+"},{id:"NRW-NS-003",name:"Universitätsklinikum Essen",address:"Hufelandstraße 55, 45147 Essen",coordinates:{lat:51.4285,lng:7.0073},phone:"+49 201 723-0",emergency:"+49 201 723-84444",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1350,network:"NEVANO+"},{id:"NRW-NS-004",name:"Universitätsklinikum Münster",address:"Albert-Schweitzer-Campus 1, 48149 Münster",coordinates:{lat:51.9607,lng:7.6261},phone:"+49 251 83-0",emergency:"+49 251 83-47255",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1513,network:"NEVANO+"},{id:"NRW-NS-005",name:"Universitätsklinikum Bonn",address:"Venusberg-Campus 1, 53127 Bonn",coordinates:{lat:50.6916,lng:7.1127},phone:"+49 228 287-0",emergency:"+49 228 287-15107",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1200,network:"NEVANO+"},{id:"NRW-NS-006",name:"Klinikum Dortmund",address:"Beurhausstraße 40, 44137 Dortmund",coordinates:{lat:51.5036,lng:7.4663},phone:"+49 231 953-0",emergency:"+49 231 953-20050",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1200,network:"NVNR"},{id:"NRW-NS-007",name:"Rhein-Maas Klinikum Würselen",address:"Mauerfeldstraße 25, 52146 Würselen",coordinates:{lat:50.8178,lng:6.1264},phone:"+49 2405 62-0",emergency:"+49 2405 62-2222",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:420,network:"NEVANO+"}],comprehensiveStrokeCenters:[{id:"NRW-CS-001",name:"Universitätsklinikum Aachen",address:"Pauwelsstraße 30, 52074 Aachen",coordinates:{lat:50.778,lng:6.0614},phone:"+49 241 80-0",emergency:"+49 241 80-89611",thrombectomy:!0,thrombolysis:!0,beds:1400,network:"NEVANO+"}],regionalStrokeUnits:[{id:"NRW-RSU-001",name:"Helios Universitätsklinikum Wuppertal",address:"Heusnerstraße 40, 42283 Wuppertal",coordinates:{lat:51.2467,lng:7.1703},phone:"+49 202 896-0",emergency:"+49 202 896-2180",thrombolysis:!0,beds:1050,network:"NEVANO+"}],thrombolysisHospitals:[{id:"NRW-TH-009",name:"Elisabeth-Krankenhaus Essen",address:"Klara-Kopp-Weg 1, 45138 Essen",coordinates:{lat:51.4495,lng:7.0137},phone:"+49 201 897-0",thrombolysis:!0,beds:583},{id:"NRW-TH-010",name:"Klinikum Oberberg Gummersbach",address:"Wilhelm-Breckow-Allee 20, 51643 Gummersbach",coordinates:{lat:51.0277,lng:7.5694},phone:"+49 2261 17-0",thrombolysis:!0,beds:431},{id:"NRW-TH-011",name:"St. Vincenz-Krankenhaus Limburg",address:"Auf dem Schafsberg, 65549 Limburg",coordinates:{lat:50.3856,lng:8.0584},phone:"+49 6431 292-0",thrombolysis:!0,beds:452},{id:"NRW-TH-012",name:"Klinikum Lüdenscheid",address:"Paulmannshöher Straße 14, 58515 Lüdenscheid",coordinates:{lat:51.2186,lng:7.6298},phone:"+49 2351 46-0",thrombolysis:!0,beds:869}]}},ra={routePatient(i){const{location:e,state:t,ichProbability:s,timeFromOnset:a,clinicalFactors:r}=i,n=t||this.detectState(e),l=Ze[n];if(s>=.5){const d=this.findNearest(e,l.neurosurgicalCenters);if(!d)throw new Error(`No neurosurgical centers available in ${n}`);return{category:"NEUROSURGICAL_CENTER",destination:d,urgency:"IMMEDIATE",reasoning:"High bleeding probability (≥50%) - neurosurgical evaluation required",preAlert:"Activate neurosurgery team",bypassLocal:!0,threshold:"≥50%",state:n}}if(s>=.3){const d=[...l.neurosurgicalCenters,...l.comprehensiveStrokeCenters];return{category:"COMPREHENSIVE_CENTER",destination:this.findNearest(e,d),urgency:"URGENT",reasoning:"Intermediate bleeding risk (30-50%) - CT and possible intervention",preAlert:"Prepare for possible neurosurgical consultation",transferPlan:this.findNearest(e,l.neurosurgicalCenters),threshold:"30-50%",state:n}}if(a&&a<=270){const d=[...l.neurosurgicalCenters,...l.comprehensiveStrokeCenters,...l.regionalStrokeUnits,...l.thrombolysisHospitals];return{category:"THROMBOLYSIS_CAPABLE",destination:this.findNearest(e,d),urgency:"TIME_CRITICAL",reasoning:"Low bleeding risk (<30%), within tPA window - nearest thrombolysis",preAlert:"Prepare for thrombolysis protocol",bypassLocal:!1,threshold:"<30%",timeWindow:"≤4.5h",state:n}}const c=[...l.neurosurgicalCenters,...l.comprehensiveStrokeCenters,...l.regionalStrokeUnits];return{category:"STROKE_UNIT",destination:this.findNearest(e,c),urgency:"STANDARD",reasoning:a>270?"Low bleeding risk, outside tPA window - standard stroke evaluation":"Low bleeding risk - standard stroke evaluation",preAlert:"Standard stroke protocol",bypassLocal:!1,threshold:"<30%",timeWindow:a?">4.5h":"unknown",state:n}},detectState(i){return i.lat>=47.5&&i.lat<=49.8&&i.lng>=7.5&&i.lng<=10.2?"badenWuerttemberg":i.lat>=50.3&&i.lat<=52.5&&i.lng>=5.9&&i.lng<=9.5?"nordrheinWestfalen":i.lat>=47.2&&i.lat<=50.6&&i.lng>=10.2&&i.lng<=13.8?"bayern":this.findNearestState(i)},findNearestState(i){const e={bayern:{lat:49,lng:11.5},badenWuerttemberg:{lat:48.5,lng:9},nordrheinWestfalen:{lat:51.5,lng:7.5}};let t="bayern",s=1/0;for(const[a,r]of Object.entries(e)){const n=this.calculateDistance(i,r);n<s&&(s=n,t=a)}return t},findNearest(i,e){return!e||e.length===0?null:e.map(t=>!t.coordinates||typeof t.coordinates.lat!="number"?null:{...t,distance:this.calculateDistance(i,t.coordinates)}).filter(t=>t!==null).sort((t,s)=>t.distance-s.distance)[0]},calculateDistance(i,e){const s=this.toRad(e.lat-i.lat),a=this.toRad(e.lng-i.lng),r=Math.sin(s/2)*Math.sin(s/2)+Math.cos(this.toRad(i.lat))*Math.cos(this.toRad(e.lat))*Math.sin(a/2)*Math.sin(a/2);return 6371*(2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r)))},toRad(i){return i*(Math.PI/180)}};function Je(i,e,t,s){const r=ee(t-i),n=ee(s-e),l=Math.sin(r/2)*Math.sin(r/2)+Math.cos(ee(i))*Math.cos(ee(t))*Math.sin(n/2)*Math.sin(n/2);return 6371*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))}function ee(i){return i*(Math.PI/180)}async function ws(i,e,t,s,a="driving-car"){try{const r=`https://api.openrouteservice.org/v2/directions/${a}`,l=await fetch(r,{method:"POST",headers:{Accept:"application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",Authorization:"5b3ce3597851110001cf624868c4c27b63ae476c9c26c8bffbc35688","Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({coordinates:[[e,i],[s,t]],radiuses:[1e3,1e3],format:"json"})});if(!l.ok)throw new Error(`Routing API error: ${l.status}`);const c=await l.json();if(c.routes&&c.routes.length>0){const d=c.routes[0];return{duration:Math.round(d.summary.duration/60),distance:Math.round(d.summary.distance/1e3),source:"routing"}}throw new Error("No route found")}catch(r){let n="estimated";r.name==="TypeError"&&r.message.includes("Failed to fetch")?(console.info("[TravelTime] OpenRouteService blocked by CORS, using distance estimation"),n="cors-fallback"):r.message.includes("signal")?(console.info("[TravelTime] OpenRouteService timeout, using distance estimation"),n="timeout-fallback"):(console.info("[TravelTime] OpenRouteService error, using distance estimation:",r.message),n="error-fallback");const l=Je(i,e,t,s);return{duration:Math.round(l/.8),distance:Math.round(l),source:n}}}async function na(i,e,t,s){try{const a=await ws(i,e,t,s,"driving-car");return{duration:Math.round(a.duration*.75),distance:a.distance,source:a.source==="routing"?"emergency-routing":"emergency-estimated"}}catch(a){const r=Je(i,e,t,s);return{duration:Math.round(r/1.2),distance:Math.round(r),source:"emergency-estimated"}}}function Es(i,e){const t=Number(i),s=je[e];return t>=s.high?"🔴 HIGH RISK":t>=s.medium?"🟡 MEDIUM RISK":"🟢 LOW RISK"}function ge(){const i=window.location.hash||"",e=new URLSearchParams(i.split("?")[1]||""),t=e.get("display"),s=e.get("caseId"),a=t==="kiosk"&&s;return console.log("[KioskLoader] Kiosk mode detection:",{hash:i,display:t,caseId:s,isKioskMode:a}),{isKioskMode:a,caseId:s}}async function Ts(i){try{console.log("[KioskLoader] Fetching case data:",i);const e=await fetch(`${_.caseSharingUrl}/get-cases`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Failed to fetch cases: ${e.status}`);const s=(await e.json()).cases.find(a=>a.id===i);if(!s)throw new Error(`Case not found: ${i}`);return console.log("[KioskLoader] Case data loaded:",s),s}catch(e){throw console.error("[KioskLoader] Failed to fetch case data:",e),e}}async function As(i){try{const e=await Ts(i);return m.setState({results:e.results,formData:e.formData||{},currentScreen:"results"}),console.log("[KioskLoader] Store populated with case data"),e}catch(e){throw console.error("[KioskLoader] Failed to load kiosk case:",e),e}}function Xe(){return"https://igfap.eu/kiosk/"}function et(){const i=m.getState(),{formData:e}=i;if(!e||Object.keys(e).length===0)return"";let t="";return Object.entries(e).forEach(([s,a])=>{if(a&&Object.keys(a).length>0){const r=o(`${s}ModuleTitle`)||s.charAt(0).toUpperCase()+s.slice(1);let n="";Object.entries(a).forEach(([l,c])=>{if(c===""||c===null||c===void 0)return;const d=bs(l),u=Ss(c,l);n+=`
          <div class="summary-item">
            <span class="summary-label">${d}:</span>
            <span class="summary-value">${u}</span>
          </div>
        `}),n&&(t+=`
          <div class="summary-module">
            <h4>${r}</h4>
            <div class="summary-items">
              ${n}
            </div>
          </div>
        `)}}),t?`
    <div class="input-summary">
      <h3>📋 ${o("inputSummaryTitle")}</h3>
      <p class="summary-subtitle">${o("inputSummarySubtitle")}</p>
      <div class="summary-content">
        ${t}
      </div>
    </div>
  `:""}function me(i,e,t){if(!e)return console.log(`[RiskCard] No data for ${i}`),"";const s=Math.round((e.probability||0)*100);console.log(`[RiskCard] ${i} - probability: ${e.probability}, percent: ${s}%`);const a=Es(s,i),r=s>70,n=s>je[i].high,l={ich:"🩸",lvo:"🧠"},c={ich:o("ichProbability"),lvo:o("lvoProbability")},d=r?"critical":n?"high":"normal",u=d==="critical"?"#ff4444":d==="high"?"#ff8800":"#0066cc",h=Math.PI*100,g=h*(1-s/100);return`
    <div class="enhanced-risk-card ${i} ${d}">
      <div class="risk-header">
        <div class="risk-icon">${l[i]}</div>
        <div class="risk-title">
          <h3>${c[i]}</h3>
        </div>
      </div>

      <div class="risk-probability">
        <div class="circles-container">
          <div class="rings-row">
            <div class="circle-item">
              <div class="probability-circle">
                <svg viewBox="0 0 120 120" width="120" height="120" style="display: block; overflow: visible;">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8"/>
                  <circle cx="60" cy="60" r="50" fill="none"
                    stroke="${u}"
                    stroke-width="8"
                    stroke-dasharray="${h}"
                    stroke-dashoffset="${g}"
                    stroke-linecap="round"
                    transform="rotate(-90 60 60)"/>
                  <text x="60" y="65"
                    text-anchor="middle"
                    font-family="system-ui, -apple-system, sans-serif"
                    font-size="24"
                    font-weight="bold"
                    fill="currentColor"
                    class="risk-percentage-text"
                    style="pointer-events: none;">
                    ${s}%
                  </text>
                </svg>
              </div>
              <div class="circle-label">${o(i==="ich"?"ichRisk":"lvoRisk")}</div>
            </div>
          </div>
          <div class="risk-level ${d}">${a}</div>
        </div>

        <div class="risk-assessment"></div>
      </div>
    </div>
  `}function Cs(i){const e=i.gfap_value||pe();if(!e||e<=0)return"";const t=Ve(e);return`
    <div class="volume-display-container">
      ${Tt(t)}
    </div>
  `}function pe(){var t;const i=m.getState(),{formData:e}=i;for(const s of["coma","limited","full"])if((t=e[s])!=null&&t.gfap_value)return parseFloat(e[s].gfap_value);return 0}function Is(i,e){var t;try{if(!i)return console.error("renderResults: No results data provided"),`
        <div class="container">
          <div class="error-message">
            <h2>No Results Available</h2>
            <p>Please complete an assessment first.</p>
            <button class="primary" onclick="window.location.reload()">Start Over</button>
          </div>
        </div>
      `;const{ich:s,lvo:a}=i,r=Ds(s),n=r!=="coma"?_s(i):null;n&&Y(r)&&St(s,n,ne());const l=(s==null?void 0:s.module)==="Limited"||(s==null?void 0:s.module)==="Coma"||(a==null?void 0:a.notPossible)===!0,c=(s==null?void 0:s.module)==="Full Stroke"||((t=s==null?void 0:s.module)==null?void 0:t.includes("Full"));let d;return console.log("[Results] ICH data:",s),console.log("[Results] LVO data:",a),console.log("[Results] ICH module:",s==null?void 0:s.module),console.log("[Results] isLimitedOrComa:",l),console.log("[Results] isFullModule:",c),l?d=Ls(s,i,e,n,r):d=Ms(s,a,i,e,n,r),setTimeout(()=>{console.log("[Results] Initializing volume animations..."),Et()},100),d}catch(s){return console.error("Error in renderResults:",s),`
      <div class="container">
        <div class="error-message">
          <h2>Error Displaying Results</h2>
          <p>There was an error displaying the results. Error: ${s.message}</p>
          <button class="primary" onclick="window.location.reload()">Start Over</button>
        </div>
      </div>
    `}}function Ls(i,e,t,s,a){const n=ge().isKioskMode,l=i&&i.probability>.6?Qe():"",c=Math.round(((i==null?void 0:i.probability)||0)*100),d=We(),u=et(),h=Y(a)?Ge():"",g=s&&Y(a)?Ke(i,s,ne()):"",E=(i==null?void 0:i.module)==="Coma"?Ps(i.probability):"",C=(i==null?void 0:i.module)!=="Coma"?it(i.probability):"";return`
    <div class="container">
      ${z(3)}
      <h2>${o("bleedingRiskAssessment")||"Blutungsrisiko-Bewertung / Bleeding Risk Assessment"}</h2>
      ${l}
      
      <!-- Single ICH Risk Card -->
      <div class="risk-results-single">
        ${me("ich",i)}
      </div>

      ${(i==null?void 0:i.module)==="Coma"&&c>=50?`
      <!-- ICH Volume Card (Coma only) -->
      <div class="risk-results-single">
        ${at(i)}
      </div>
      `:""}
      
      <!-- Alternative Diagnoses for Coma Module -->
      ${E}
      
      <!-- Differential Diagnoses for Stroke Modules -->
      ${C}
      
      <!-- Research Model Comparison (hidden unless research mode) -->
      ${g}
      
      <!-- ICH Drivers Only (not shown for Coma module) -->
      ${(i==null?void 0:i.module)!=="Coma"?`
        <div class="enhanced-drivers-section">
          <h3>${o("riskFactorsTitle")||"Hauptrisikofaktoren / Main Risk Factors"}</h3>
          ${tt(i)}
        </div>
      `:""}
      
      <!-- Collapsible Additional Information -->
      <div class="additional-info-section">
        <button class="info-toggle" data-target="input-summary">
          <span class="toggle-icon">📋</span>
          <span class="toggle-text">${o("inputSummaryTitle")}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="input-summary" style="display: none;">
          ${u}
        </div>
        
        <button class="info-toggle" data-target="stroke-centers">
          <span class="toggle-icon">🏥</span>
          <span class="toggle-text">${o("nearestCentersTitle")}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="stroke-centers" style="display: none;">
          ${d}
        </div>
      </div>
      
      <div class="results-actions">
        ${n?`
          <!-- Kiosk Mode: Simple navigation back to case list -->
          <div class="primary-actions">
            <button type="button" class="primary" onclick="window.location.href='${Xe()}'">
              🏠 Zurück zur Fallliste / Back to Case List
            </button>
            <button type="button" class="secondary" id="printResults"> 📄 ${o("printResults")} </button>
          </div>
        `:`
          <!-- Normal Mode: Full actions -->
          <div class="primary-actions">
            <button type="button" class="primary" id="shareToKiosk"> 🚀 ${o("sendToHospital")} </button>
            <button type="button" class="primary" id="printResults"> 📄 ${o("printResults")} </button>
            <button type="button" class="secondary" data-action="reset"> ${o("newAssessment")} </button>
          </div>
          <div class="navigation-actions">
            <button type="button" class="tertiary" data-action="goBack"> ← ${o("goBack")} </button>
            <button type="button" class="tertiary" data-action="goHome"> 🏠 ${o("goHome")} </button>
          </div>
        `}
      </div>
      
      <div class="disclaimer">
        <strong>⚠️ ${o("importantNote")}:</strong> ${o("importantText")} Results generated at ${new Date().toLocaleTimeString()}.
      </div>
      
      ${st(i)}
      ${h}
    </div>
  `}function Ms(i,e,t,s,a,r){var ve,be;const l=ge().isKioskMode,c=Math.round(((i==null?void 0:i.probability)||0)*100),d=Math.round(((e==null?void 0:e.probability)||0)*100);console.log("[FullModuleResults] ICH probability:",i==null?void 0:i.probability,"-> %:",c),console.log("[FullModuleResults] LVO probability:",e==null?void 0:e.probability,"-> %:",d);const u=i&&i.probability>.6?Qe():"",h=We(),g=et(),E=Y(r)?Ge():"",C=a&&Y(r)?Ke(i,a,ne()):"",N=m.getState(),W=parseInt((be=(ve=N.formData)==null?void 0:ve.full)==null?void 0:be.fast_ed_score)||0,F=r==="full"||(i==null?void 0:i.module)==="Full",le=e&&typeof e.probability=="number"&&!e.notPossible,ce=F&&W>3&&le,fe=c>=50,de=d/Math.max(c,.5),dt=de>=.6&&de<=1.7,ut=F&&c>=50&&d>=50&&!dt,ye=F&&c>=30&&d>=30;let Z=1;ce&&Z++,fe&&Z++;const ht=Z===1?"risk-results-single":Z===2?"risk-results-dual":"risk-results-triple",mt=it(i.probability);return`
    <div class="container">
      ${z(3)}
      <h2>${o("resultsTitle")}</h2>
      ${u}
      
      <!-- Risk Assessment Display -->
      <div class="${ht}">
        ${me("ich",i)}
        ${ce?me("lvo",e):""}
        ${fe?at(i):""}
      </div>
      
      <!-- Treatment Decision Gauge (when strong signal) -->
      ${ye?Ns(c,d):""}
      ${!ye&&ut?Rs(c,d,de):""}
      
      <!-- Differential Diagnoses for Stroke Modules -->
      ${mt}
      
      <!-- Research Model Comparison (hidden unless research mode) -->
      ${C}
      
      <!-- Risk Factor Drivers -->
      <div class="enhanced-drivers-section">
        <h3>${o("riskFactorsTitle")||"Risikofaktoren / Risk Factors"}</h3>
        ${ce?ks(i,e):tt(i)}
      </div>
      
      <!-- Collapsible Additional Information -->
      <div class="additional-info-section">
        <button class="info-toggle" data-target="input-summary">
          <span class="toggle-icon">📋</span>
          <span class="toggle-text">${o("inputSummaryTitle")}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="input-summary" style="display: none;">
          ${g}
        </div>
        
        <button class="info-toggle" data-target="stroke-centers">
          <span class="toggle-icon">🏥</span>
          <span class="toggle-text">${o("nearestCentersTitle")}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="stroke-centers" style="display: none;">
          ${h}
        </div>
      </div>
      
      <div class="results-actions">
        ${l?`
          <!-- Kiosk Mode: Simple navigation back to case list -->
          <div class="primary-actions">
            <button type="button" class="primary" onclick="window.location.href='${Xe()}'">
              🏠 Zurück zur Fallliste / Back to Case List
            </button>
            <button type="button" class="secondary" id="printResults"> 📄 ${o("printResults")} </button>
          </div>
        `:`
          <!-- Normal Mode: Full actions -->
          <div class="primary-actions">
            <button type="button" class="primary" id="shareToKiosk"> 🚀 ${o("sendToHospital")} </button>
            <button type="button" class="primary" id="printResults"> 📄 ${o("printResults")} </button>
            <button type="button" class="secondary" data-action="reset"> ${o("newAssessment")} </button>
          </div>
          <div class="navigation-actions">
            <button type="button" class="tertiary" data-action="goBack"> ← ${o("goBack")} </button>
            <button type="button" class="tertiary" data-action="goHome"> 🏠 ${o("goHome")} </button>
          </div>
        `}
      </div>
      
      <div class="disclaimer">
        <strong>⚠️ ${o("importantNote")}:</strong> ${o("importantText")} Results generated at ${new Date().toLocaleTimeString()}.
      </div>
      
      ${st(i)}
      ${E}
    </div>
  `}function Rs(i,e,t){const s=t>1?"LVO":"ICH",a=s==="LVO"?"🧠":"🩸",r=R.getCurrentLanguage()==="de"?s==="LVO"?"LVO-dominant":"ICH-dominant":s==="LVO"?"LVO dominant":"ICH dominant",n=R.getCurrentLanguage()==="de"?`Verhältnis LVO/ICH: ${t.toFixed(2)}`:`LVO/ICH ratio: ${t.toFixed(2)}`;return`
    <div class="tachometer-section">
      <div class="tachometer-card">
        <div class="treatment-recommendation ${s==="LVO"?"lvo-dominant":"ich-dominant"}">
          <div class="recommendation-icon">${a}</div>
          <div class="recommendation-text">
            <h4>${r}</h4>
            <p>${n}</p>
          </div>
          <div class="probability-summary">
            ICH: ${i}% | LVO: ${e}%
          </div>
        </div>
      </div>
    </div>
  `}function tt(i){if(!i||!i.drivers)return'<p class="no-drivers">No driver data available</p>';const e=i.drivers;if(!e.positive&&!e.negative)return'<p class="no-drivers">Driver format error</p>';const t=e.positive||[],s=e.negative||[];return`
    <div class="drivers-split-view">
      <div class="drivers-column positive-column">
        <div class="column-header">
          <span class="column-icon">⬆</span>
          <span class="column-title">${o("increasingRisk")||"Risikoerhöhend / Increasing Risk"}</span>
        </div>
        <div class="compact-drivers">
          ${t.length>0?t.slice(0,5).map(a=>Pe(a,"positive")).join(""):`<p class="no-factors">${o("noFactors")||"Keine Faktoren / No factors"}</p>`}
        </div>
      </div>
      
      <div class="drivers-column negative-column">
        <div class="column-header">
          <span class="column-icon">⬇</span>
          <span class="column-title">${o("decreasingRisk")||"Risikomindernd / Decreasing Risk"}</span>
        </div>
        <div class="compact-drivers">
          ${s.length>0?s.slice(0,5).map(a=>Pe(a,"negative")).join(""):`<p class="no-factors">${o("noFactors")||"Keine Faktoren / No factors"}</p>`}
        </div>
      </div>
    </div>
  `}function Pe(i,e){const t=Math.abs(i.weight*100),s=Math.min(t*2,100);return`
    <div class="compact-driver-item">
      <div class="compact-driver-label">${re(i.label)}</div>
      <div class="compact-driver-bar ${e}" style="width: ${s}%;">
        <span class="compact-driver-value">${t.toFixed(1)}%</span>
      </div>
    </div>
  `}function st(i){if(!i||!i.probability||Math.round((i.probability||0)*100)<50)return"";const t=pe();return!t||t<=0?"":`
    <div class="bibliography-section">
      <h4>${o("references")}</h4>
      <div class="citations">
        <div class="citation">
          <span class="citation-number">¹</span>
          <span class="citation-text">Broderick et al. (1993). Volume of intracerebral hemorrhage. A powerful and easy-to-use predictor of 30-day mortality. Stroke, 24(7), 987-993.</span>
        </div>
        <div class="citation">
          <span class="citation-number">²</span>
          <span class="citation-text">Krishnan et al. (2013). Hematoma expansion in intracerebral hemorrhage: Predictors and outcomes. Neurology, 81(19), 1660-1666.</span>
        </div>
        <div class="citation">
          <span class="citation-number">³</span>
          <span class="citation-text">Putra et al. (2020). Functional outcomes and mortality in patients with intracerebral hemorrhage. Critical Care Medicine, 48(3), 347-354.</span>
        </div>
        <div class="citation">
          <span class="citation-number">⁴</span>
          <span class="citation-text">Tangella et al. (2020). Early prediction of mortality in intracerebral hemorrhage using clinical markers. Journal of Neurocritical Care, 13(2), 89-97.</span>
        </div>
      </div>
    </div>
  `}function _s(i){try{const e=ne();return!e.age||!e.gfap?null:kt(e)}catch(e){return null}}function ne(){const i=m.getState(),{formData:e}=i;let t=null,s=null;for(const r of["coma","limited","full"])e[r]&&(t=t||e[r].age_years,s=s||e[r].gfap_value);return{age:parseInt(t)||null,gfap:parseFloat(s)||null}}function it(i){return Math.round(i*100)>25?`
      <div class="alternative-diagnosis-card">
        <div class="diagnosis-header">
          <span class="lightning-icon">⚡</span>
          <h3>${o("differentialDiagnoses")}</h3>
        </div>
        <div class="diagnosis-content">
          <!-- Time Window Confirmation - Clinical Action -->
          <h4 class="clinical-action-heading">${o("reconfirmTimeWindow")}</h4>
          
          <!-- Actual Differential Diagnoses -->
          <ul class="diagnosis-list">
            <li>${o("unclearTimeWindow")}</li>
            <li>${o("rareDiagnoses")}</li>
          </ul>
        </div>
      </div>
    `:""}function Ps(i){const e=Math.round(i*100),t=R.getCurrentLanguage()==="de";return e>25?`
      <div class="alternative-diagnosis-card">
        <div class="diagnosis-header">
          <span class="lightning-icon">⚡</span>
          <h3>${t?"Differentialdiagnosen":"Differential Diagnoses"}</h3>
        </div>
        <div class="diagnosis-content">
          <ul class="diagnosis-list">
            <li>
              ${t?"Alternative Diagnosen sind SAB, SDH, EDH (Subarachnoidalblutung, Subduralhämatom, Epiduralhämatom)":"Alternative diagnoses include SAH, SDH, EDH (Subarachnoid Hemorrhage, Subdural Hematoma, Epidural Hematoma)"}
            </li>
            <li>
              ${t?"Bei unklarem Zeitfenster seit Symptombeginn oder im erweiterten Zeitfenster kommen auch ein demarkierter Infarkt oder hypoxischer Hirnschaden in Frage":"In cases of unclear time window since symptom onset or extended time window, demarcated infarction or hypoxic brain injury should also be considered"}
            </li>
          </ul>
        </div>
      </div>
    `:`
      <div class="alternative-diagnosis-card">
        <div class="diagnosis-header">
          <span class="lightning-icon">⚡</span>
          <h3>${t?"Differentialdiagnosen":"Differential Diagnoses"}</h3>
        </div>
        <div class="diagnosis-content">
          <ul class="diagnosis-list">
            <li>
              ${t?"Alternative Diagnose von Vigilanzminderung wahrscheinlich":"Alternative diagnosis for reduced consciousness likely"}
            </li>
            <li>
              ${t?"Ein Verschluss der Arteria Basilaris ist nicht ausgeschlossen":"Basilar artery occlusion cannot be excluded"}
            </li>
          </ul>
        </div>
      </div>
    `}function Ds(i){if(!(i!=null&&i.module))return"unknown";const e=i.module.toLowerCase();return e.includes("coma")?"coma":e.includes("limited")?"limited":e.includes("full")?"full":"unknown"}function at(i){const e=pe();if(!e||e<=0)return"";const t=Ve(e),s=bt(t);return Math.round(((i==null?void 0:i.probability)||0)*100),`
    <div class="enhanced-risk-card volume-card normal">
      <div class="risk-header">
        <div class="risk-icon">🧮</div>
        <div class="risk-title">
          <h3>${o("ichVolumeLabel")}</h3>
        </div>
      </div>
      
      <div class="risk-probability">
        <div class="circles-container">
          <div class="rings-row">
            <div class="circle-item">
              ${Cs(i)}
              <div class="circle-label">${o("ichVolumeLabel")}</div>
            </div>
          </div>
        </div>
        
        <div class="risk-assessment">
          <div class="mortality-assessment">
            ${o("predictedMortality")}: ${s}
          </div>
      </div>
    </div>
  </div>
  `}function Ns(i,e){const t=e/Math.max(i,1);return`
    <div class="tachometer-section">
      <div class="tachometer-card">
        <div class="tachometer-header">
          <h3>🎯 ${R.getCurrentLanguage()==="de"?"Entscheidungshilfe – LVO/ICH":"Decision Support – LVO/ICH"}</h3>
          <div class="ratio-display">LVO/ICH Ratio: ${t.toFixed(2)}</div>
        </div>
        
        <div class="tachometer-gauge" id="tachometer-canvas-container">
          <div data-react-tachometer data-ich="${i}" data-lvo="${e}" data-title="${R.getCurrentLanguage()==="de"?"Entscheidungshilfe – LVO/ICH":"Decision Support – LVO/ICH"}"></div>
        </div>

        <!-- Legend chips for zones -->
        <div class="tachometer-legend" aria-hidden="true">
          <span class="legend-chip ich">ICH</span>
          <span class="legend-chip uncertain">${R.getCurrentLanguage()==="de"?"Unsicher":"Uncertain"}</span>
          <span class="legend-chip lvo">LVO</span>
        </div>

        <!-- Metrics row: ratio, confidence, absolute difference -->
        <div class="metrics-row" role="group" aria-label="Tachometer metrics">
          <div class="metric-card">
            <div class="metric-label">Ratio</div>
            <div class="metric-value">${t.toFixed(2)}</div>
            <div class="metric-unit">LVO/ICH</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Confidence</div>
            <div class="metric-value">${(()=>{const s=Math.abs(e-i),a=Math.max(e,i);let r=s<10?Math.round(30+a*.3):s<20?Math.round(50+a*.4):Math.round(70+a*.3);return r=Math.max(0,Math.min(100,r)),r})()}%</div>
            <div class="metric-unit">percent</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Difference</div>
            <div class="metric-value">${Math.abs(e-i).toFixed(0)}%</div>
            <div class="metric-unit">|LVO − ICH|</div>
          </div>
        </div>
        
        <div class="probability-summary">
          ICH: ${i}% | LVO: ${e}%
        </div>
        
        <!-- Hidden probability summary for initialization -->
        <div class="probability-summary" style="display: none;">
          ICH: ${i}% | LVO: ${e}%
        </div>
      </div>
    </div>
  `}function $s(){return`
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="app-logo">
            <div class="logo-icon">🧠</div>
            <h1>iGFAP Stroke Triage</h1>
            <div class="version-badge">Research Preview v2.1</div>
          </div>
        </div>

        <div class="login-content">
          <div class="access-notice">
            <h2>🔬 ${o("researchAccessRequired")}</h2>
            <p>${o("researchPreviewDescription")}</p>

            <div class="research-disclaimer">
              <h3>⚠️ ${o("importantNotice")}</h3>
              <ul>
                <li><strong>${o("researchUseOnly")}</strong> - ${o("researchUseOnlyDesc")}</li>
                <li><strong>${o("noPatientDataStorage")}</strong> - ${o("noPatientDataStorageDesc")}</li>
                <li><strong>${o("clinicalAdvisory")}</strong> - ${o("clinicalAdvisoryDesc")}</li>
                <li><strong>${o("contact")}:</strong> Deepak Bos (bosdeepak@gmail.com)</li>
              </ul>
            </div>
          </div>

          <form id="loginForm" class="login-form">
            <div class="form-group">
              <label for="researchPassword">${o("researchAccessCode")}</label>
              <input
                type="password"
                id="researchPassword"
                name="password"
                required
                autocomplete="off"
                placeholder="${o("enterResearchAccessCode")}"
                class="password-input"
              >
            </div>

            <div id="loginError" class="error-message" style="display: none;"></div>

            <button type="submit" class="login-button primary">
              <span class="button-text">${o("accessResearchSystem")}</span>
              <span class="loading-spinner" style="display: none;">⏳</span>
            </button>
          </form>

          <div class="login-footer">
            <div class="regulatory-notice">
              <p><strong>${o("regulatoryStatus")}:</strong> ${o("regulatoryStatusDesc")}</p>
              <p><strong>${o("dataProtection")}:</strong> ${o("dataProtectionDesc")}</p>
              <p><strong>${o("clinicalOversight")}:</strong> ${o("clinicalOversightDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Os(){const i=document.getElementById("loginForm");if(!i)return;const e=document.getElementById("researchPassword"),t=document.getElementById("loginError"),s=i.querySelector(".login-button");e.focus(),i.addEventListener("submit",async l=>{l.preventDefault();const c=e.value.trim();if(!c){a("Please enter the research access code");return}n(!0),r();try{const d=await A.authenticate(c);if(d.success)m.logEvent("auth_success",{timestamp:new Date().toISOString(),userAgent:navigator.userAgent.substring(0,100)}),m.navigate("triage1");else{const u=d.message;a(u),e.value="",e.focus(),m.logEvent("auth_failed",{timestamp:new Date().toISOString(),errorCode:d.errorCode})}}catch(d){a("Authentication system error. Please try again.")}finally{n(!1)}}),e.addEventListener("input",()=>{r()});function a(l){t.textContent=l,t.style.display="block",e.classList.add("error")}function r(){t.style.display="none",e.classList.remove("error")}function n(l){const c=s.querySelector(".button-text"),d=s.querySelector(".loading-spinner");l?(c.style.display="none",d.style.display="inline",s.disabled=!0):(c.style.display="inline",d.style.display="none",s.disabled=!1)}}function xs(i){const e=document.createElement("div");e.className="sr-only",e.setAttribute("role","status"),e.setAttribute("aria-live","polite");const t={triage1:"Coma assessment",triage2:"Examination capability assessment",coma:"Coma module",limited:"Limited data module",full:"Full stroke assessment",results:"Assessment results"};e.textContent=`Navigated to ${t[i]||i}`,document.body.appendChild(e),setTimeout(()=>e.remove(),1e3)}function Fs(i){const e="iGFAP",s={triage1:"Initial Assessment",triage2:"Examination Capability",coma:"Coma Module",limited:"Limited Data Module",full:"Full Stroke Module",results:"Assessment Results"}[i];document.title=s?`${e} — ${s}`:e}function Hs(){setTimeout(()=>{const i=document.querySelector("h2");i&&(i.setAttribute("tabindex","-1"),i.focus(),setTimeout(()=>i.removeAttribute("tabindex"),100))},100)}class Bs{constructor(){this.scores={facial_palsy:0,arm_weakness:0,speech_changes:0,eye_deviation:0,denial_neglect:0},this.onApply=null,this.modal=null}getTotal(){return Object.values(this.scores).reduce((e,t)=>e+t,0)}getRiskLevel(){return this.getTotal()>=4?"high":"low"}render(){const e=this.getTotal(),t=this.getRiskLevel();return`
      <div id="fastEdModal" class="modal" role="dialog" aria-labelledby="fastEdModalTitle" aria-hidden="true" style="display: none !important;">
        <div class="modal-content fast-ed-modal">
          <div class="modal-header">
            <h2 id="fastEdModalTitle">${o("fastEdCalculatorTitle")}</h2>
            <button class="modal-close" aria-label="Close">&times;</button>
          </div>
          <div class="modal-body">
            
            <!-- Facial Palsy -->
            <div class="fast-ed-component">
              <h3>${o("facialPalsyTitle")}</h3>
              <div class="radio-group">
                <label class="radio-option">
                  <input type="radio" name="facial_palsy" value="0" ${this.scores.facial_palsy===0?"checked":""}>
                  <span class="radio-label">${o("facialPalsyNormal")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="facial_palsy" value="1" ${this.scores.facial_palsy===1?"checked":""}>
                  <span class="radio-label">${o("facialPalsyMild")}</span>
                </label>
              </div>
            </div>

            <!-- Arm Weakness -->
            <div class="fast-ed-component">
              <h3>${o("armWeaknessTitle")}</h3>
              <div class="radio-group">
                <label class="radio-option">
                  <input type="radio" name="arm_weakness" value="0" ${this.scores.arm_weakness===0?"checked":""}>
                  <span class="radio-label">${o("armWeaknessNormal")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="arm_weakness" value="1" ${this.scores.arm_weakness===1?"checked":""}>
                  <span class="radio-label">${o("armWeaknessMild")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="arm_weakness" value="2" ${this.scores.arm_weakness===2?"checked":""}>
                  <span class="radio-label">${o("armWeaknessSevere")}</span>
                </label>
              </div>
            </div>

            <!-- Speech Changes -->
            <div class="fast-ed-component">
              <h3>${o("speechChangesTitle")}</h3>
              <div class="radio-group">
                <label class="radio-option">
                  <input type="radio" name="speech_changes" value="0" ${this.scores.speech_changes===0?"checked":""}>
                  <span class="radio-label">${o("speechChangesNormal")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="speech_changes" value="1" ${this.scores.speech_changes===1?"checked":""}>
                  <span class="radio-label">${o("speechChangesMild")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="speech_changes" value="2" ${this.scores.speech_changes===2?"checked":""}>
                  <span class="radio-label">${o("speechChangesSevere")}</span>
                </label>
              </div>
            </div>

            <!-- Eye Deviation -->
            <div class="fast-ed-component">
              <h3>${o("eyeDeviationTitle")}</h3>
              <div class="radio-group">
                <label class="radio-option">
                  <input type="radio" name="eye_deviation" value="0" ${this.scores.eye_deviation===0?"checked":""}>
                  <span class="radio-label">${o("eyeDeviationNormal")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="eye_deviation" value="1" ${this.scores.eye_deviation===1?"checked":""}>
                  <span class="radio-label">${o("eyeDeviationPartial")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="eye_deviation" value="2" ${this.scores.eye_deviation===2?"checked":""}>
                  <span class="radio-label">${o("eyeDeviationForced")}</span>
                </label>
              </div>
            </div>

            <!-- Denial/Neglect -->
            <div class="fast-ed-component">
              <h3>${o("denialNeglectTitle")}</h3>
              <div class="radio-group">
                <label class="radio-option">
                  <input type="radio" name="denial_neglect" value="0" ${this.scores.denial_neglect===0?"checked":""}>
                  <span class="radio-label">${o("denialNeglectNormal")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="denial_neglect" value="1" ${this.scores.denial_neglect===1?"checked":""}>
                  <span class="radio-label">${o("denialNeglectPartial")}</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="denial_neglect" value="2" ${this.scores.denial_neglect===2?"checked":""}>
                  <span class="radio-label">${o("denialNeglectComplete")}</span>
                </label>
              </div>
            </div>

            <!-- Total Score Display -->
            <div class="fast-ed-total">
              <div class="score-display">
                <h3>${o("totalScoreTitle")}: <span class="total-score">${e}/9</span></h3>
                <div class="risk-indicator ${t}">
                  ${o("riskLevel")}: ${o(t==="high"?"riskLevelHigh":"riskLevelLow")}
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <div class="button-group">
              <button class="secondary" data-action="cancel-fast-ed">${o("cancel")}</button>
              <button class="primary" data-action="apply-fast-ed">${o("applyScore")}</button>
            </div>
          </div>
        </div>
      </div>
    `}setupEventListeners(){if(this.modal=document.getElementById("fastEdModal"),!this.modal)return;this.modal.addEventListener("change",a=>{if(a.target.type==="radio"){const r=a.target.name,n=parseInt(a.target.value);this.scores[r]=n,this.updateDisplay()}});const e=this.modal.querySelector(".modal-close");e==null||e.addEventListener("click",()=>this.close());const t=this.modal.querySelector('[data-action="cancel-fast-ed"]');t==null||t.addEventListener("click",()=>this.close());const s=this.modal.querySelector('[data-action="apply-fast-ed"]');s==null||s.addEventListener("click",()=>this.apply()),this.modal.addEventListener("click",a=>{a.target===this.modal&&(a.preventDefault(),a.stopPropagation())}),document.addEventListener("keydown",a=>{var r;a.key==="Escape"&&((r=this.modal)!=null&&r.classList.contains("show"))&&this.close()})}updateDisplay(){var s,a;const e=(s=this.modal)==null?void 0:s.querySelector(".total-score"),t=(a=this.modal)==null?void 0:a.querySelector(".risk-indicator");if(e&&(e.textContent=`${this.getTotal()}/9`),t){const r=this.getRiskLevel();t.className=`risk-indicator ${r}`,t.textContent=`${o("riskLevel")}: ${o(r==="high"?"riskLevelHigh":"riskLevelLow")}`}}show(e=0,t=null){this.onApply=t,e>0&&e<=9&&this.approximateFromTotal(e),document.getElementById("fastEdModal")?(this.modal.remove(),document.body.insertAdjacentHTML("beforeend",this.render()),this.modal=document.getElementById("fastEdModal")):document.body.insertAdjacentHTML("beforeend",this.render()),this.setupEventListeners(),this.modal.setAttribute("aria-hidden","false"),this.modal.style.display="flex",this.modal.classList.add("show");const s=this.modal.querySelector('input[type="radio"]');s==null||s.focus()}close(){this.modal&&(this.modal.classList.remove("show"),this.modal.style.display="none",this.modal.setAttribute("aria-hidden","true"))}apply(){const e=this.getTotal(),t=this.scores.arm_weakness>0,s=this.scores.eye_deviation>0;this.onApply&&this.onApply({total:e,components:{...this.scores},armWeaknessBoolean:t,eyeDeviationBoolean:s}),this.close()}approximateFromTotal(e){this.scores={facial_palsy:0,arm_weakness:0,speech_changes:0,eye_deviation:0,denial_neglect:0};let t=e;const s=Object.keys(this.scores);for(const a of s){if(t<=0)break;const n=Math.min(t,a==="facial_palsy"?1:2);this.scores[a]=n,t-=n}}}const zs=new Bs;function B(i){const e=m.getState(),{currentScreen:t,results:s,startTime:a,screenHistory:r}=e;console.log("[Render] Rendering screen:",t,"Has results:",!!s);const n=document.createElement("div"),l=document.getElementById("backButton");l&&(l.style.display=r&&r.length>0?"flex":"none");let c="";switch(t){case"login":c=$s();break;case"triage1":if(!A.isValidSession()){m.navigate("login");return}c=Re();break;case"triage2":c=ms();break;case"coma":c=gs();break;case"limited":c=ps();break;case"full":c=fs();break;case"results":c=Is(s,a);break;default:c=Re()}try{j(n,c)}catch(u){n.textContent="Error loading content. Please refresh."}for(;i.firstChild;)i.removeChild(i.firstChild);for(;n.firstChild;)i.appendChild(n.firstChild);const d=i.querySelector("form[data-module]");if(d){const{module:u}=d.dataset;Us(d,u)}Vs(i),t==="login"&&setTimeout(()=>{Os()},100),t==="results"&&s&&setTimeout(()=>{try{console.log("[Render] Initializing stroke center map with results:",s),At(s)}catch(u){console.error("[Render] Stroke center map initialization failed:",u)}},100),setTimeout(()=>{try{wt()}catch(u){}},150),xs(t),Fs(t),Hs()}function Us(i,e){const t=m.getFormData(e);!t||Object.keys(t).length===0||Object.entries(t).forEach(([s,a])=>{const r=i.elements[s];r&&(r.type==="checkbox"?r.checked=a===!0||a==="on"||a==="true":r.value=a)})}function Vs(i){i.querySelectorAll('input[type="number"]').forEach(a=>{a.addEventListener("input",()=>{const r=a.closest(".input-group");r&&r.classList.contains("error")&&(r.classList.remove("error"),r.querySelectorAll(".error-message").forEach(n=>n.remove()))})}),i.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",r=>{const{action:n,value:l}=r.currentTarget.dataset,c=l==="true";switch(n){case"triage1":Jt(c);break;case"triage2":Xt(c);break;case"reset":es();break;case"goBack":ts();break;case"goHome":Ye();break}})}),i.querySelectorAll("form[data-module]").forEach(a=>{a.addEventListener("submit",r=>{ss(r,i)})});const e=i.querySelector("#printResults");e&&e.addEventListener("click",()=>window.print());const t=i.querySelector("#fast_ed_score");t&&(t.addEventListener("click",a=>{a.preventDefault();const r=parseInt(t.value)||0;zs.show(r,n=>{t.value=n.total;const l=i.querySelector("#armparese_hidden");l&&(l.value=n.armWeaknessBoolean?"true":"false");const c=i.querySelector("#eye_deviation_hidden");c&&(c.value=n.eyeDeviationBoolean?"true":"false"),t.dispatchEvent(new Event("change",{bubbles:!0}))})}),t.addEventListener("keydown",a=>{a.preventDefault()})),i.querySelectorAll(".info-toggle").forEach(a=>{a.addEventListener("click",r=>{const n=a.dataset.target,l=i.querySelector(`#${n}`),c=a.querySelector(".toggle-arrow");l&&(l.style.display!=="none"?(l.style.display="none",l.classList.remove("show"),a.classList.remove("active"),c.style.transform="rotate(0deg)"):(l.style.display="block",l.classList.add("show"),a.classList.add("active"),c.style.transform="rotate(180deg)"))})})}class Gs{constructor(){this.container=null,this.eventListeners=new Map,this.isInitialized=!1}initialize(e){this.container=e,this.setupGlobalEventListeners(),this.setupHelpModal(),this.setupFooterLinks(),this.initializeApiModeToggle(),this.initializeResearchMode(),this.setCurrentYear(),this.isInitialized=!0}setupGlobalEventListeners(){this.addEventListenerSafe("backButton","click",()=>{m.goBack(),B(this.container)}),this.addEventListenerSafe("homeButton","click",()=>{m.goHome(),B(this.container)}),this.addEventListenerSafe("languageToggle","click",()=>{this.toggleLanguage()}),this.addEventListenerSafe("darkModeToggle","click",()=>{this.toggleDarkMode()}),this.addEventListenerSafe("apiModeToggle","click",e=>{e.preventDefault(),this.toggleApiMode()}),this.addEventListenerSafe("researchModeToggle","click",e=>{e.preventDefault(),e.stopPropagation(),this.toggleResearchMode()}),this.addGlobalEventListener("keydown",e=>{e.key==="Escape"&&this.closeModal("helpModal")}),this.addGlobalEventListener("beforeunload",e=>{m.hasUnsavedData()&&(e.preventDefault(),e.returnValue="You have unsaved data. Are you sure you want to leave?")})}initializeApiModeToggle(){if(!document.getElementById("apiModeToggle"))return;const t=["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname);localStorage.getItem("use_mock_api")===null&&t&&localStorage.setItem("use_mock_api","true"),this.updateApiModeButton()}toggleApiMode(){const t=localStorage.getItem("use_mock_api")==="true"?"false":"true";localStorage.setItem("use_mock_api",t),this.updateApiModeButton();try{const s=document.createElement("div");s.className="sr-only",s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.textContent=t==="true"?"Mock data enabled":"Live API enabled",document.body.appendChild(s),setTimeout(()=>s.remove(),1200)}catch(s){}}updateApiModeButton(){const e=document.getElementById("apiModeToggle");if(!e)return;localStorage.getItem("use_mock_api")!=="false"?(e.textContent="🧪",e.title="Mock data: ON (click to use API)",e.setAttribute("aria-label","Mock data enabled")):(e.textContent="☁️",e.title="Live API: ON (click to use mock)",e.setAttribute("aria-label","Live API enabled"))}addEventListenerSafe(e,t,s){const a=document.getElementById(e);if(a){const r=n=>{try{s(n)}catch(l){this.handleUIError(l,`${e}_${t}`)}};a.addEventListener(t,r),this.eventListeners.set(`${e}_${t}`,{element:a,handler:r})}}addGlobalEventListener(e,t){const s=a=>{try{t(a)}catch(r){this.handleUIError(r,`global_${e}`)}};if(e==="keydown"||e==="beforeunload"){const a=e==="beforeunload"?window:document;a.addEventListener(e,s),this.eventListeners.set(`global_${e}`,{element:a,handler:s})}}setupHelpModal(){y(async()=>{const e=document.getElementById("helpButton"),t=document.getElementById("helpModal"),s=t==null?void 0:t.querySelector(".modal-close");e&&t&&(this.closeModal("helpModal"),this.addEventListenerSafe("helpButton","click",()=>{this.openModal("helpModal")}),s&&s.addEventListener("click",()=>{this.closeModal("helpModal")}),t.addEventListener("click",a=>{a.target===t&&this.closeModal("helpModal")}))},e=>{})}setupFooterLinks(){this.addEventListenerSafe("privacyLink","click",e=>{e.preventDefault(),this.showPrivacyPolicy()}),this.addEventListenerSafe("disclaimerLink","click",e=>{e.preventDefault(),this.showDisclaimer()})}toggleLanguage(){y(async()=>{R.toggleLanguage(),this.updateLanguage()},e=>{})}updateLanguage(){document.documentElement.lang=R.getCurrentLanguage(),this.updateElementText(".app-header h1",o("appTitle")),this.updateElementText(".emergency-badge",o("emergencyBadge")),this.updateButtonAttributes("languageToggle",o("languageToggle")),this.updateButtonAttributes("helpButton",o("helpButton")),this.updateButtonAttributes("darkModeToggle",o("darkModeButton")),this.updateElementText("#modalTitle",o("helpTitle"));const e=document.getElementById("languageToggle");if(e){const t=R.getCurrentLanguage();e.textContent=t==="en"?"🇬🇧":"🇩🇪",e.dataset.lang=t}}updateElementText(e,t){const s=document.querySelector(e);s&&t&&(s.textContent=t)}updateButtonAttributes(e,t){const s=document.getElementById(e);s&&t&&(s.title=t,s.setAttribute("aria-label",t))}toggleDarkMode(){const e=document.getElementById("darkModeToggle");document.body.classList.toggle("dark-mode");const t=document.body.classList.contains("dark-mode");e&&(e.textContent=t?"☀️":"🌙"),localStorage.setItem("theme",t?"dark":"light")}initializeResearchMode(){document.getElementById("researchModeToggle")&&this.updateResearchMode()}updateResearchMode(){const e=document.getElementById("researchModeToggle");if(e){const t=this.getCurrentModuleFromResults(),s=t==="limited"||t==="full";e.style.display=s?"flex":"none",e.style.opacity=s?"1":"0.5"}}getCurrentModuleFromResults(){var s,a;const e=m.getState();if(e.currentScreen!=="results"||!((a=(s=e.results)==null?void 0:s.ich)!=null&&a.module))return null;const t=e.results.ich.module.toLowerCase();return t.includes("coma")?"coma":t.includes("limited")?"limited":t.includes("full")?"full":null}toggleResearchMode(){const e=document.getElementById("researchPanel");if(!e)return;const t=e.style.display!=="none";e.style.display=t?"none":"block";const s=document.getElementById("researchModeToggle");return s&&(s.style.background=t?"rgba(255, 255, 255, 0.1)":"rgba(0, 102, 204, 0.2)"),!1}showResearchActivationMessage(){y(async()=>{const e=document.createElement("div");e.className="research-activation-toast";try{j(e,`
            <div class="toast-content">
              🔬 <strong>Research Mode Activated</strong><br>
              <small>Model comparison features enabled</small>
            </div>
          `)}catch(t){e.textContent="🔬 Research Mode Activated - Model comparison features enabled"}document.body.appendChild(e),setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},3e3)},e=>{})}openModal(e){const t=document.getElementById(e);t&&(t.style.display="flex",t.classList.add("show"),t.setAttribute("aria-hidden","false"))}closeModal(e){const t=document.getElementById(e);t&&(t.classList.remove("show"),t.style.display="none",t.setAttribute("aria-hidden","true"))}showPrivacyPolicy(){alert("Privacy Policy: This tool processes data locally. No patient data is stored or transmitted.")}showDisclaimer(){alert("Medical Disclaimer: This tool is for clinical decision support only. Always use clinical judgment and follow local protocols.")}setCurrentYear(){const e=document.getElementById("currentYear");e&&(e.textContent=new Date().getFullYear())}handleUIError(e,t){try{const s=new CustomEvent("uiError",{detail:{error:e,context:t,timestamp:Date.now()}});document.dispatchEvent(s)}catch(s){}}async preloadCriticalComponents(){return y(async()=>{const t=["appContainer","helpModal","languageToggle","darkModeToggle"].filter(s=>!document.getElementById(s));if(t.length>0)throw new Error(`Missing critical UI elements: ${t.join(", ")}`);return!0},e=>!1)}getStatus(){return{isInitialized:this.isInitialized,hasContainer:!!this.container,eventListenersCount:this.eventListeners.size,currentLanguage:R.getCurrentLanguage(),isDarkMode:document.body.classList.contains("dark-mode")}}destroy(){this.eventListeners.forEach(({element:e,handler:t},s)=>{const[,a]=s.split("_");e&&t&&e.removeEventListener(a,t)}),this.eventListeners.clear(),this.container=null,this.isInitialized=!1}}class Ks{constructor(){this.currentTheme="light",this.isInitialized=!1,this.storageKey="theme"}initialize(){this.loadSavedTheme(),this.setupThemeDetection(),this.isInitialized=!0}async loadSavedTheme(){return y(async()=>{const e=localStorage.getItem(this.storageKey),t=window.matchMedia("(prefers-color-scheme: dark)").matches;let s;return e==="dark"||e==="light"?s=e:t?s="dark":s="light",this.applyTheme(s),this.updateThemeButton(),s},e=>(this.applyTheme("light"),this.updateThemeButton(),"light"))}setupThemeDetection(){const e=window.matchMedia("(prefers-color-scheme: dark)"),t=s=>{if(!localStorage.getItem(this.storageKey)){const r=s.matches?"dark":"light";this.applyTheme(r),this.updateThemeButton()}};e.addEventListener?e.addEventListener("change",t):e.addListener(t)}applyTheme(e){e!=="light"&&e!=="dark"&&(e="light"),this.currentTheme=e,e==="dark"?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode"),this.updateMetaThemeColor(e),this.dispatchThemeChangeEvent(e)}toggleTheme(){const e=this.currentTheme==="dark"?"light":"dark";this.setTheme(e)}setTheme(e){return y(async()=>(this.applyTheme(e),this.saveTheme(e),this.updateThemeButton(),e),t=>this.currentTheme)}saveTheme(e){try{localStorage.setItem(this.storageKey,e)}catch(t){}}updateThemeButton(){const e=document.getElementById("darkModeToggle");if(e){const t=this.currentTheme==="dark";e.textContent=t?"☀️":"🌙";const s=t?"Switch to light mode":"Switch to dark mode";e.setAttribute("aria-label",s),e.title=s}}updateMetaThemeColor(e){let t=document.querySelector('meta[name="theme-color"]');t||(t=document.createElement("meta"),t.name="theme-color",document.head.appendChild(t));const s={light:"#ffffff",dark:"#1a1a1a"};t.content=s[e]||s.light}dispatchThemeChangeEvent(e){try{const t=new CustomEvent("themeChanged",{detail:{theme:e,timestamp:Date.now()}});document.dispatchEvent(t)}catch(t){}}getCurrentTheme(){return this.currentTheme}isDarkMode(){return this.currentTheme==="dark"}getSystemPreferredTheme(){try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){return"light"}}resetToSystemTheme(){const e=this.getSystemPreferredTheme();this.setTheme(e);try{localStorage.removeItem(this.storageKey)}catch(t){}}getStatus(){return{isInitialized:this.isInitialized,currentTheme:this.currentTheme,isDarkMode:this.isDarkMode(),systemPreferred:this.getSystemPreferredTheme(),hasExplicitPreference:!!localStorage.getItem(this.storageKey)}}destroy(){this.isInitialized=!1}}class Ws{constructor(){this.autoSaveInterval=null,this.sessionCheckInterval=null,this.isInitialized=!1,this.lastAutoSave=0}initialize(){this.validateStoredSession(),this.startAutoSave(),this.setupSessionTimeout(),this.setupSessionValidation(),this.isInitialized=!0}async validateStoredSession(){return y(async()=>A.isValidSession()?(this.restoreFormData(),!0):(this.clearSessionData(),!1),e=>(this.clearSessionData(),!1))}startAutoSave(){this.autoSaveInterval&&clearInterval(this.autoSaveInterval),this.autoSaveInterval=setInterval(()=>{this.performAutoSave()},Te.autoSaveInterval)}async performAutoSave(){return y(async()=>{const e=document.getElementById("appContainer");if(!e)return!1;const t=e.querySelectorAll("form[data-module]");let s=0;for(const a of t)try{const{module:r}=a.dataset;if(r){const n=this.extractFormData(a);this.hasFormDataChanged(r,n)&&(m.setFormData(r,n),s++)}}catch(r){}return this.lastAutoSave=Date.now(),s>0},e=>!1)}extractFormData(e){const t=new FormData(e),s={};return t.forEach((a,r)=>{const n=e.elements[r];if(n)if(n.type==="checkbox")s[r]=n.checked;else if(n.type==="number"){const l=parseFloat(a);s[r]=isNaN(l)?a:l}else s[r]=a}),s}hasFormDataChanged(e,t){try{const s=m.getFormData(e);return JSON.stringify(s)!==JSON.stringify(t)}catch(s){return!0}}restoreFormData(){y(async()=>{const e=document.getElementById("appContainer");if(!e)return;e.querySelectorAll("form[data-module]").forEach(s=>{try{const{module:a}=s.dataset;if(a){const r=m.getFormData(a);r&&Object.keys(r).length>0&&this.populateForm(s,r)}}catch(a){}})},e=>{})}populateForm(e,t){Object.entries(t).forEach(([s,a])=>{const r=e.elements[s];if(r)try{r.type==="checkbox"?r.checked=!!a:r.type==="radio"?r.value===a&&(r.checked=!0):r.value=a,r.dispatchEvent(new Event("input",{bubbles:!0}))}catch(n){}})}setupSessionTimeout(){setTimeout(()=>{this.showSessionTimeoutWarning()},Te.sessionTimeout-6e4)}setupSessionValidation(){this.sessionCheckInterval=setInterval(()=>{this.validateCurrentSession()},5*60*1e3)}async validateCurrentSession(){return y(async()=>A.isValidSession()?await A.validateSessionWithServer()?!0:(this.handleSessionExpiry(),!1):(this.handleSessionExpiry(),!1),e=>A.isValidSession())}showSessionTimeoutWarning(){y(async()=>{confirm("Your session will expire in 1 minute. Would you like to continue?")?(A.updateActivity(),this.setupSessionTimeout()):this.endSession()},e=>{})}handleSessionExpiry(){this.clearSessionData(),m.navigate("login"),this.showSessionExpiredMessage()}showSessionExpiredMessage(){const e=document.createElement("div");e.style.cssText=`
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff9800;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `,e.textContent="⏰ Session expired. Please log in again.",document.body.appendChild(e),setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},5e3)}endSession(){A.logout(),this.clearSessionData(),m.reset(),m.navigate("login")}async clearSessionData(){try{v.info("Clearing session data",{category:b.SECURITY}),m.clearAllFormData(),await V("temp_data",!0),await V("research_data",!0),sessionStorage.removeItem("temp_data"),sessionStorage.removeItem("research_data"),v.info("Session data cleared successfully",{category:b.SECURITY})}catch(e){v.warn("Failed to clear some session data",{category:b.SECURITY,error:e.message})}}async forceSave(){return this.performAutoSave()}getStatus(){var e;return{isInitialized:this.isInitialized,isAuthenticated:A.isValidSession(),lastAutoSave:this.lastAutoSave,autoSaveActive:!!this.autoSaveInterval,sessionCheckActive:!!this.sessionCheckInterval,sessionInfo:((e=A.getSessionInfo)==null?void 0:e.call(A))||{}}}destroy(){this.autoSaveInterval&&(clearInterval(this.autoSaveInterval),this.autoSaveInterval=null),this.sessionCheckInterval&&(clearInterval(this.sessionCheckInterval),this.sessionCheckInterval=null),this.isInitialized=!1}}const P={MEMORY:"memory",SESSION:"session",LOCAL:"local",INDEXED_DB:"indexed_db"},H={CRITICAL:"critical",HIGH:"high",NORMAL:"normal",LOW:"low"},qs={API_RESPONSES:15*60*1e3};class De{constructor(e,t,s,a=H.NORMAL,r={}){this.key=e,this.value=this.sanitizeValue(t),this.ttl=s,this.priority=a,this.metadata={...r,createdAt:Date.now(),accessCount:0,lastAccessed:Date.now()},this.expiresAt=s>0?Date.now()+s:null,this.encrypted=!1}sanitizeValue(e){if(typeof e!="object"||e===null)return e;const t=JSON.parse(JSON.stringify(e)),s=["ssn","mrn","patient_id","user_id","session_token"];return this.removeSensitiveFields(t,s),t}removeSensitiveFields(e,t){Object.keys(e).forEach(s=>{t.some(a=>s.toLowerCase().includes(a))?e[s]="[REDACTED]":typeof e[s]=="object"&&e[s]!==null&&this.removeSensitiveFields(e[s],t)})}isExpired(){return this.expiresAt!==null&&Date.now()>this.expiresAt}markAccessed(){this.metadata.accessCount+=1,this.metadata.lastAccessed=Date.now()}getAge(){return Date.now()-this.metadata.createdAt}getTimeToExpiration(){return this.expiresAt===null?1/0:Math.max(0,this.expiresAt-Date.now())}getEvictionScore(){const t={[H.CRITICAL]:1e3,[H.HIGH]:100,[H.NORMAL]:10,[H.LOW]:1}[this.priority]||1,s=Math.log(this.metadata.accessCount+1),a=1/(this.getAge()+1);return t*s*a}}class te{constructor(e=P.MEMORY,t={}){this.storageType=e,this.options={maxSize:100*1024*1024,maxEntries:1e3,cleanupInterval:5*60*1e3,enableEncryption:!1,enableMetrics:!0,...t},this.cache=new Map,this.cleanupTimer=null,this.totalSize=0,this.hitCount=0,this.missCount=0,this.evictionCount=0,this.initializeStorage(),this.startCleanupTimer()}initializeStorage(){switch(this.storageType){case P.SESSION:this.storage=sessionStorage,this.loadFromStorage();break;case P.LOCAL:this.storage=localStorage,this.loadFromStorage();break;case P.INDEXED_DB:this.initializeIndexedDB();break;default:this.storage=null}}loadFromStorage(){if(this.storage)try{const e=this.storage.getItem("medical_cache");if(e){const t=JSON.parse(e);Object.entries(t).forEach(([s,a])=>{const r=new De(a.key,a.value,a.ttl,a.priority,a.metadata);r.expiresAt=a.expiresAt,r.isExpired()||(this.cache.set(s,r),this.totalSize+=this.calculateSize(r.value))})}}catch(e){}}saveToStorage(){if(this.storage)try{const e={};this.cache.forEach((t,s)=>{e[s]={key:t.key,value:t.value,ttl:t.ttl,priority:t.priority,metadata:t.metadata,expiresAt:t.expiresAt}}),this.storage.setItem("medical_cache",JSON.stringify(e))}catch(e){}}async initializeIndexedDB(){}set(e,t,s=qs.API_RESPONSES,a=H.NORMAL,r={}){const n=I.startMeasurement(he.CACHE,"cache_set",{key:e,priority:a});try{this.ensureCapacity();const l=new De(e,t,s,a,r),c=this.calculateSize(t);if(this.cache.has(e)){const d=this.cache.get(e);this.totalSize-=this.calculateSize(d.value)}return this.cache.set(e,l),this.totalSize+=c,this.storageType!==P.MEMORY&&this.saveToStorage(),p.publish(f.AUDIT_EVENT,{action:"cache_set",key:e,size:c,ttl:s,priority:a}),I.endMeasurement(n,{success:!0}),!0}catch(l){return I.endMeasurement(n,{success:!1,error:l.message}),!1}}get(e){const t=I.startMeasurement(he.CACHE,"cache_get",{key:e});try{const s=this.cache.get(e);return s?s.isExpired()?(this.cache.delete(e),this.totalSize-=this.calculateSize(s.value),this.missCount+=1,I.endMeasurement(t,{hit:!1,expired:!0}),null):(s.markAccessed(),this.hitCount+=1,I.endMeasurement(t,{hit:!0}),s.value):(this.missCount+=1,I.endMeasurement(t,{hit:!1}),null)}catch(s){return I.endMeasurement(t,{hit:!1,error:s.message}),null}}has(e){const t=this.cache.get(e);return t&&!t.isExpired()}delete(e){const t=this.cache.get(e);return t?(this.totalSize-=this.calculateSize(t.value),this.cache.delete(e),this.storageType!==P.MEMORY&&this.saveToStorage(),p.publish(f.AUDIT_EVENT,{action:"cache_delete",key:e}),!0):!1}clear(){const e=this.cache.size;this.cache.clear(),this.totalSize=0,this.storage&&this.storage.removeItem("medical_cache"),p.publish(f.AUDIT_EVENT,{action:"cache_cleared",entriesCleared:e})}ensureCapacity(){for(;this.totalSize>this.options.maxSize;)this.evictLeastImportant();for(;this.cache.size>=this.options.maxEntries;)this.evictLeastImportant()}evictLeastImportant(){let e=1/0,t=null;this.cache.forEach((s,a)=>{if(s.priority===H.CRITICAL&&!s.isExpired())return;const r=s.getEvictionScore();r<e&&(e=r,t=a)}),t&&(this.delete(t),this.evictionCount+=1)}cleanup(){const e=performance.now();let t=0;this.cache.forEach((a,r)=>{a.isExpired()&&(this.delete(r),t+=1)});const s=performance.now()-e;return p.publish(f.AUDIT_EVENT,{action:"cache_cleanup",cleanedCount:t,duration:s,remainingEntries:this.cache.size}),t}startCleanupTimer(){this.cleanupTimer&&clearInterval(this.cleanupTimer),this.cleanupTimer=setInterval(()=>{this.cleanup()},this.options.cleanupInterval)}stopCleanupTimer(){this.cleanupTimer&&(clearInterval(this.cleanupTimer),this.cleanupTimer=null)}calculateSize(e){try{return JSON.stringify(e).length*2}catch(t){return 0}}getStats(){const e=this.hitCount+this.missCount>0?this.hitCount/(this.hitCount+this.missCount)*100:0;return{entries:this.cache.size,totalSize:this.totalSize,maxSize:this.options.maxSize,hitCount:this.hitCount,missCount:this.missCount,hitRate:`${e.toFixed(2)}%`,evictionCount:this.evictionCount,storageType:this.storageType,utilizationPercent:`${(this.totalSize/this.options.maxSize*100).toFixed(2)}%`}}getEntryInfo(e){const t=this.cache.get(e);return t?{key:t.key,size:this.calculateSize(t.value),priority:t.priority,ttl:t.ttl,age:t.getAge(),timeToExpiration:t.getTimeToExpiration(),accessCount:t.metadata.accessCount,lastAccessed:new Date(t.metadata.lastAccessed).toISOString(),isExpired:t.isExpired(),evictionScore:t.getEvictionScore()}:null}dispose(){this.stopCleanupTimer(),this.clear()}}class x{static getPatientDataCache(){return this.patientDataCache||(this.patientDataCache=new te(P.SESSION,{maxSize:10*1024*1024,maxEntries:100,enableEncryption:!0})),this.patientDataCache}static getPredictionCache(){return this.predictionCache||(this.predictionCache=new te(P.MEMORY,{maxSize:50*1024*1024,maxEntries:500})),this.predictionCache}static getValidationCache(){return this.validationCache||(this.validationCache=new te(P.LOCAL,{maxSize:5*1024*1024,maxEntries:200})),this.validationCache}static getApiCache(){return this.apiCache||(this.apiCache=new te(P.SESSION,{maxSize:20*1024*1024,maxEntries:300})),this.apiCache}static clearAllCaches(){[this.patientDataCache,this.predictionCache,this.validationCache,this.apiCache].forEach(e=>{e&&e.clear()})}static disposeAllCaches(){[this.patientDataCache,this.predictionCache,this.validationCache,this.apiCache].forEach(e=>{e&&e.dispose()}),this.patientDataCache=null,this.predictionCache=null,this.validationCache=null,this.apiCache=null}}U(x,"patientDataCache",null),U(x,"predictionCache",null),U(x,"validationCache",null),U(x,"apiCache",null);x.getPatientDataCache();const oa=x.getPredictionCache();x.getValidationCache();x.getApiCache();const js="modulepreload",Ys=function(i){return"/0825/"+i},Ne={},O=function(e,t,s){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),l=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));a=Promise.allSettled(t.map(c=>{if(c=Ys(c),c in Ne)return;Ne[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":js,d||(h.as="script"),h.crossOrigin="",h.href=c,l&&h.setAttribute("nonce",l),document.head.appendChild(h),d)return new Promise((g,E)=>{h.addEventListener("load",g),h.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return a.then(n=>{for(const l of n||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})},k={CRITICAL:"critical",HIGH:"high",NORMAL:"normal",LOW:"low"},D={PENDING:"pending",LOADING:"loading",LOADED:"loaded",ERROR:"error"};class Qs{constructor(e,t,s={}){this.name=e,this.loader=t,this.priority=s.priority||k.NORMAL,this.state=D.PENDING,this.component=null,this.error=null,this.loadTime=null,this.dependencies=s.dependencies||[],this.retryCount=0,this.maxRetries=s.maxRetries||3,this.loadPromise=null}async load(){if(this.state===D.LOADED)return this.component;if(this.loadPromise)return this.loadPromise;const e=I.startMeasurement(he.USER_INTERACTION,`lazy_load_${this.name}`,{priority:this.priority});return this.state=D.LOADING,this.loadPromise=this.executeLoad(e),this.loadPromise}async executeLoad(e){try{const t=performance.now();return await this.loadDependencies(),this.component=await this.loader(),this.loadTime=performance.now()-t,this.state=D.LOADED,I.endMeasurement(e,{success:!0,loadTime:this.loadTime,retryCount:this.retryCount}),p.publish(f.AUDIT_EVENT,{action:"lazy_component_loaded",component:this.name,loadTime:this.loadTime,priority:this.priority}),this.component}catch(t){if(this.error=t,this.retryCount++,I.endMeasurement(e,{success:!1,error:t.message,retryCount:this.retryCount}),this.retryCount<this.maxRetries){const s=Math.min(1e3*2**(this.retryCount-1),5e3);return await new Promise(a=>setTimeout(a,s)),this.loadPromise=null,this.load()}throw this.state=D.ERROR,p.publish(f.AUDIT_EVENT,{action:"lazy_component_load_failed",component:this.name,error:t.message,retryCount:this.retryCount}),t}}async loadDependencies(){if(this.dependencies.length===0)return;const e=this.dependencies.map(t=>typeof t=="string"?rt.load(t):typeof t=="function"?t():t.load());await Promise.all(e)}getStatus(){var e;return{name:this.name,state:this.state,priority:this.priority,loadTime:this.loadTime,error:(e=this.error)==null?void 0:e.message,retryCount:this.retryCount}}}class rt{constructor(){this.components=new Map,this.intersectionObserver=null,this.idleCallback=null,this.loadQueue={[k.CRITICAL]:[],[k.HIGH]:[],[k.NORMAL]:[],[k.LOW]:[]},this.isProcessingQueue=!1,this.initializeObservers()}initializeObservers(){"IntersectionObserver"in window&&(this.intersectionObserver=new IntersectionObserver(e=>this.handleIntersectionChanges(e),{rootMargin:"50px",threshold:.1})),this.scheduleIdleLoading()}register(e,t,s={}){const a=new Qs(e,t,s);return this.components.set(e,a),this.loadQueue[a.priority].push(a),a.priority===k.CRITICAL&&this.processLoadQueue(),p.publish(f.AUDIT_EVENT,{action:"lazy_component_registered",component:e,priority:a.priority}),a}async load(e){const t=this.components.get(e);if(!t)throw new Error(`Component '${e}' not registered`);return t.load()}async preload(e=k.HIGH){const t=[k.CRITICAL,k.HIGH,k.NORMAL,k.LOW],s=t.slice(0,t.indexOf(e)+1),a=[];s.forEach(r=>{this.loadQueue[r].forEach(n=>{n.state===D.PENDING&&a.push(n.load())})}),await Promise.allSettled(a),p.publish(f.AUDIT_EVENT,{action:"lazy_components_preloaded",priority:e,count:a.length})}observeElement(e,t){this.intersectionObserver&&(e.dataset.lazyComponent=t,this.intersectionObserver.observe(e))}handleIntersectionChanges(e){e.forEach(t=>{if(t.isIntersecting){const s=t.target.dataset.lazyComponent;s&&(this.load(s).catch(a=>{}),this.intersectionObserver.unobserve(t.target))}})}async processLoadQueue(){if(!this.isProcessingQueue){this.isProcessingQueue=!0;try{await this.processQueueByPriority(k.CRITICAL),await this.processQueueByPriority(k.HIGH)}catch(e){}finally{this.isProcessingQueue=!1}}}async processQueueByPriority(e){const s=this.loadQueue[e].filter(r=>r.state===D.PENDING);if(s.length===0)return;const a=s.map(r=>r.load().catch(n=>null));await Promise.allSettled(a)}scheduleIdleLoading(){const e=()=>{"requestIdleCallback"in window?this.idleCallback=requestIdleCallback(t=>{this.processIdleQueue(t),e()},{timeout:5e3}):setTimeout(()=>{this.processIdleQueue({timeRemaining:()=>50}),e()},100)};e()}async processIdleQueue(e){const t=this.loadQueue[k.NORMAL],s=this.loadQueue[k.LOW],a=[...t.filter(r=>r.state===D.PENDING),...s.filter(r=>r.state===D.PENDING)];for(const r of a)if(e.timeRemaining()>10)try{await r.load()}catch(n){}else break}getStats(){const e={total:this.components.size,byState:{pending:0,loading:0,loaded:0,error:0},byPriority:{critical:0,high:0,normal:0,low:0},totalLoadTime:0,averageLoadTime:0};let t=0,s=0;return this.components.forEach(a=>{e.byState[a.state]++,e.byPriority[a.priority]++,a.loadTime&&(t+=a.loadTime,s++)}),e.totalLoadTime=t,e.averageLoadTime=s>0?t/s:0,e}async reload(e){const t=this.components.get(e);if(!t)throw new Error(`Component '${e}' not registered`);return t.state=D.PENDING,t.component=null,t.error=null,t.loadTime=null,t.retryCount=0,t.loadPromise=null,t.load()}dispose(){this.intersectionObserver&&this.intersectionObserver.disconnect(),this.idleCallback&&cancelIdleCallback(this.idleCallback),this.components.clear(),Object.values(this.loadQueue).forEach(e=>e.length=0),p.publish(f.AUDIT_EVENT,{action:"lazy_loader_disposed"})}}class Zs{constructor(e){this.lazyLoader=e,this.registerMedicalComponents()}registerMedicalComponents(){this.lazyLoader.register("advanced-analytics",()=>O(()=>import("./research-tools-BiPm2YBi.js").then(e=>e.g),__vite__mapDeps([0,1])),{priority:k.LOW}),this.lazyLoader.register("clinical-reporting",()=>O(()=>import("./research-tools-BiPm2YBi.js").then(e=>e.f),__vite__mapDeps([0,1])),{priority:k.LOW}),this.lazyLoader.register("audit-trail",()=>O(()=>import("./research-tools-BiPm2YBi.js").then(e=>e.h),__vite__mapDeps([0,1])),{priority:k.LOW}),this.lazyLoader.register("medical-service-worker",()=>O(()=>import("./enterprise-features-C-AmcgLw.js").then(e=>e.e),__vite__mapDeps([2,1])),{priority:k.LOW}),this.lazyLoader.register("sw-manager",()=>O(()=>import("./enterprise-features-C-AmcgLw.js").then(e=>e.d),__vite__mapDeps([2,1])),{priority:k.LOW}),this.lazyLoader.register("command-pattern",()=>O(()=>Promise.resolve().then(()=>ki),void 0),{priority:k.NORMAL}),this.lazyLoader.register("prediction-strategy",()=>O(()=>Promise.resolve().then(()=>Ii),void 0),{priority:k.NORMAL}),this.lazyLoader.register("validation-factory",()=>O(()=>Promise.resolve().then(()=>Fi),void 0),{priority:k.NORMAL})}async loadByClinicalPriority(e){switch(e){case"emergency":await this.lazyLoader.preload(k.HIGH);break;case"routine":await this.lazyLoader.preload(k.NORMAL);break;case"research":await this.lazyLoader.load("advanced-analytics"),await this.lazyLoader.load("clinical-reporting"),await this.lazyLoader.load("audit-trail");break;case"background":await this.lazyLoader.load("medical-service-worker"),await this.lazyLoader.load("sw-manager");break;default:await this.lazyLoader.preload(k.NORMAL)}}async preloadForModule(e){const s={coma:["command-pattern"],limited:["prediction-strategy"],full:["command-pattern","prediction-strategy","validation-factory"],research:["advanced-analytics","clinical-reporting","audit-trail"]}[e]||[],a=s.map(r=>this.lazyLoader.load(r));await Promise.allSettled(a),p.publish(f.AUDIT_EVENT,{action:"medical_components_preloaded",moduleType:e,components:s})}async loadEnterpriseFeatures(){const e=["medical-service-worker","sw-manager","advanced-analytics","clinical-reporting","audit-trail"],t=e.map(r=>this.lazyLoader.load(r).catch(n=>(console.warn(`Enterprise feature ${r} failed to load:`,n),null))),a=(await Promise.allSettled(t)).filter(r=>r.status==="fulfilled"&&r.value!==null).length;return p.publish(f.AUDIT_EVENT,{action:"enterprise_features_loaded",requested:e.length,loaded:a}),a}}const ie=new rt;new Zs(ie);class Js{constructor(){this.isInitialized=!1,this.phase3Status={serviceWorker:!1,performanceMonitor:!1,syncManager:!1,lazyLoader:!1},this.phase4Status={reportingSystem:!1,qualityMetrics:!1,auditTrail:!1}}async initialize(){return y(async()=>(await this.initializePhase3Features(),await this.initializePhase4Features(),this.isInitialized=!0,!0),e=>!1)}async initializePhase3Features(){return y(async()=>(await this.initializePerformanceMonitor(),this.initializeServiceWorker(),await this.initializeSyncManager(),await this.initializeProgressiveLoading(),!0),e=>!1)}async initializePerformanceMonitor(){return y(async()=>(I.start(),this.phase3Status.performanceMonitor=!0,!0),e=>(this.phase3Status.performanceMonitor=!1,!1))}async initializeServiceWorker(){y(async()=>{const e=await Se.initialize();return this.phase3Status.serviceWorker=e,e&&await this.prefetchCriticalResources(),e},e=>(this.phase3Status.serviceWorker=!1,!1))}async initializeSyncManager(){return y(async()=>{const e=await ke.initialize();return this.phase3Status.syncManager=e,e},e=>(this.phase3Status.syncManager=!1,!1))}async initializeProgressiveLoading(){return y(async()=>(await ie.preload("critical"),setTimeout(()=>this.setupViewportLoading(),100),this.phase3Status.lazyLoader=!0,!0),e=>(this.phase3Status.lazyLoader=!1,!1))}setupViewportLoading(){try{document.querySelectorAll(".brain-visualization-placeholder").forEach(s=>{ie.observeElement(s,"brain-visualization")}),document.querySelectorAll(".stroke-center-map-placeholder").forEach(s=>{ie.observeElement(s,"stroke-center-map")})}catch(e){}}async prefetchCriticalResources(){return y(async()=>{const e=["/0925/src/logic/lvo-local-model.js","/0925/src/logic/ich-volume-calculator.js","/0925/src/patterns/prediction-strategy.js","/0925/src/performance/medical-cache.js"];return await Se.prefetchResources(e),!0},e=>!1)}async initializePhase4Features(){return y(async()=>(await this.initializeAuditTrail(),await this.initializeReportingSystem(),await this.initializeQualityMetrics(),this.setupPhase4EventHandlers(),!0),e=>!1)}async initializeAuditTrail(){return y(async()=>(await we.initialize(),this.phase4Status.auditTrail=!0,!0),e=>(this.phase4Status.auditTrail=!1,!1))}async initializeReportingSystem(){return y(async()=>(Ee.start(),this.phase4Status.reportingSystem=!0,!0),e=>(this.phase4Status.reportingSystem=!1,!1))}async initializeQualityMetrics(){return y(async()=>(await ue.initialize(),this.phase4Status.qualityMetrics=!0,!0),e=>(this.phase4Status.qualityMetrics=!1,!1))}setupPhase4EventHandlers(){document.addEventListener("submit",async e=>{const t=e.target;t.dataset.module&&await y(async()=>{const s=new FormData(t),a=Object.fromEntries(s.entries());return this.phase4Status.auditTrail&&we.logEvent("data_entry",{module:t.dataset.module,timestamp:new Date().toISOString(),data_points:Object.keys(a).length}),this.phase4Status.qualityMetrics&&(ue.recordMetric("form_completion","count",1),ue.recordMetric("data_quality","completeness",Object.values(a).filter(r=>r&&r.trim()).length/Object.keys(a).length*100)),!0},s=>!1)})}getStatus(){return{isInitialized:this.isInitialized,phase3:{...this.phase3Status,overall:Object.values(this.phase3Status).some(e=>e)},phase4:{...this.phase4Status,overall:Object.values(this.phase4Status).some(e=>e)},systemStatus:this.getSystemStatus()}}getSystemStatus(){return{serviceWorkerSupported:"serviceWorker"in navigator,indexedDBSupported:"indexedDB"in window,notificationSupported:"Notification"in window,cacheSupported:"caches"in window,webLockSupported:"locks"in navigator,performanceSupported:"performance"in window}}async restart(){return this.destroy(),this.initialize()}destroy(){var e,t,s,a,r,n;if(this.phase3Status.performanceMonitor)try{(t=(e=I).stop)==null||t.call(e)}catch(l){}if(this.phase3Status.syncManager)try{(a=(s=ke).destroy)==null||a.call(s)}catch(l){}if(this.phase4Status.reportingSystem)try{(n=(r=Ee).stop)==null||n.call(r)}catch(l){}this.phase3Status={serviceWorker:!1,performanceMonitor:!1,syncManager:!1,lazyLoader:!1},this.phase4Status={reportingSystem:!1,qualityMetrics:!1,auditTrail:!1},this.isInitialized=!1}}class Xs{constructor(){this.container=null,this.unsubscribe=null,this.isInitialized=!1,this.uiManager=new Gs,this.themeManager=new Ks,this.sessionManager=new Ws,this.advancedFeaturesManager=new Js}async init(){return y(async()=>{if(v.info("Application initialization started",{category:b.SYSTEM,version:"2.1.0",userAgent:navigator.userAgent.substring(0,100)}),document.readyState==="loading")return v.debug("Waiting for DOM ready",{category:b.SYSTEM}),new Promise(e=>{document.addEventListener("DOMContentLoaded",()=>e(this.init()))});if(this.container=document.getElementById("appContainer"),!this.container)throw v.critical("App container not found",{category:b.SYSTEM,containerId:"appContainer"}),new Error("Critical initialization failure: App container not found");return v.debug("App container found",{category:b.SYSTEM}),A.isValidSession()||(v.info("No valid session, redirecting to login",{category:b.AUTHENTICATION}),m.navigate("login")),v.info("Initializing core features",{category:b.SYSTEM}),await this.initializeCoreFeatures(),v.info("Skipping advanced features initialization",{category:b.SYSTEM}),this.setupRenderingSystem(),v.debug("Initializing UI manager",{category:b.SYSTEM}),this.uiManager.initialize(this.container),v.debug("Initializing theme manager",{category:b.SYSTEM}),this.themeManager.initialize(),v.debug("Initializing session manager",{category:b.SYSTEM}),this.sessionManager.initialize(),B(this.container),this.isInitialized=!0,v.info("Application initialization completed successfully",{category:b.SYSTEM,initializationTime:performance.now()}),!0},e=>{throw v.critical("Application initialization failed",{category:b.SYSTEM,error:e.message,stack:e.stack}),new Error(`App initialization failed: ${e.message}`)})}async initializeCoreFeatures(){return y(async()=>{const e=[this.uiManager.preloadCriticalComponents(),this.themeManager.loadSavedTheme(),this.sessionManager.validateStoredSession()],s=(await Promise.allSettled(e)).filter(a=>a.status==="rejected");if(s.length>0)throw new Error(`${s.length} core features failed to initialize`);return!0},e=>!1)}async initializeAdvancedFeatures(){y(async()=>(await this.advancedFeaturesManager.initialize(),!0),e=>!1)}setupRenderingSystem(){this.unsubscribe=m.subscribe(()=>{B(this.container),setTimeout(()=>this.uiManager.updateResearchMode(),200)}),window.addEventListener("languageChanged",()=>{this.uiManager.updateLanguage(),B(this.container)})}getStatus(){return{isInitialized:this.isInitialized,hasContainer:!!this.container,isAuthenticated:A.isValidSession(),ui:this.uiManager.getStatus(),theme:this.themeManager.getStatus(),session:this.sessionManager.getStatus(),advancedFeatures:this.advancedFeaturesManager.getStatus()}}destroy(){this.unsubscribe&&this.unsubscribe(),this.uiManager.destroy(),this.themeManager.destroy(),this.sessionManager.destroy(),this.advancedFeaturesManager.destroy(),this.isInitialized=!1}}async function ei(){const i=new Xs;try{return await i.init(),i}catch(e){throw new Error(`Failed to create application: ${e.message}`)}}const se={authentication:"https://europe-west3-igfap-452720.cloudfunctions.net/authenticate-research-access",comaIch:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_coma_ich",limitedIch:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_limited_data_ich",fullStroke:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_full_stroke",lvo:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_lvo"},$e={authentication:{action:"validate_session",session_token:"warmup-test-token"},comaIch:{gfap_value:100},limitedIch:{age_years:65,systolic_bp:140,diastolic_bp:80,gfap_value:100,vigilanzminderung:0},fullStroke:{age_years:65,systolic_bp:140,diastolic_bp:80,gfap_value:100,fast_ed_score:4,headache:0,vigilanzminderung:0,armparese:0,beinparese:0,eye_deviation:0,atrial_fibrillation:0,anticoagulated_noak:0,antiplatelets:0},lvo:{gfap_value:100,fast_ed_score:4}};class ti{constructor(){this.warmupAttempts=0,this.successfulWarmups=0,this.warmupResults={},this.isWarming=!1}async warmupAllAPIs(e=!0){if(this.isWarming)return v.info("API warmup already in progress",{category:"WARMUP"}),this.warmupResults;this.isWarming=!0,this.warmupAttempts=0,this.successfulWarmups=0,this.warmupResults={},v.info("Starting API warmup process",{category:"WARMUP",endpoints:Object.keys(se).length});const t=Object.entries(se).map(async([s,a])=>{try{const r=await this.warmupSingleAPI(s,a,$e[s]);return this.warmupResults[s]=r,r.success&&this.successfulWarmups++,r}catch(r){const n={success:!1,error:r.message,duration:0,timestamp:new Date().toISOString()};return this.warmupResults[s]=n,n}});return e?(Promise.all(t).then(()=>{this.completeWarmup()}).catch(s=>{v.error("Background API warmup failed",{category:"WARMUP",error:s.message}),this.isWarming=!1}),{status:"warming",message:"APIs warming up in background"}):(await Promise.all(t),this.completeWarmup(),this.warmupResults)}async warmupSingleAPI(e,t,s){const a=Date.now();this.warmupAttempts++;try{v.info(`Warming up ${e} API`,{category:"WARMUP",url:t});const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":"iGFAP-Warmup/2.1.0"},body:JSON.stringify(s),signal:AbortSignal.timeout(1e4)}),n=Date.now()-a,l={success:!0,status:r.status,duration:n,message:`${e} API warmed up`,timestamp:new Date().toISOString()};return v.info(`Successfully warmed up ${e} API`,{category:"WARMUP",duration:n,status:r.status}),l}catch(r){const n=Date.now()-a;return r.name==="TypeError"&&r.message.includes("Failed to fetch")?(v.info(`${e} API warmup encountered CORS (expected), function still warmed`,{category:"WARMUP",duration:n}),{success:!0,status:"cors-blocked",duration:n,message:`${e} API warmed (CORS blocked but function activated)`,timestamp:new Date().toISOString()}):(v.warn(`Failed to warm up ${e} API`,{category:"WARMUP",error:r.message,duration:n}),{success:!1,error:r.message,duration:n,timestamp:new Date().toISOString()})}}completeWarmup(){this.isWarming=!1;const e={total:this.warmupAttempts,successful:this.successfulWarmups,failed:this.warmupAttempts-this.successfulWarmups,results:this.warmupResults};v.info("API warmup process completed",{category:"WARMUP",summary:e}),typeof window!="undefined"&&window.dispatchEvent(new CustomEvent("api-warmup-complete",{detail:e}))}getWarmupStatus(){return{isWarming:this.isWarming,attempts:this.warmupAttempts,successful:this.successfulWarmups,results:this.warmupResults}}async warmupCriticalAPIs(){const e=["authentication","comaIch","limitedIch"];v.info("Starting critical API warmup",{category:"WARMUP",apis:e});const t={};for(const s of e)se[s]&&(t[s]=await this.warmupSingleAPI(s,se[s],$e[s]));return v.info("Critical API warmup completed",{category:"WARMUP",results:t}),t}}const Oe=new ti;async function nt(i={}){const{background:e=!0,criticalOnly:t=!1}=i;try{return t?await Oe.warmupCriticalAPIs():await Oe.warmupAllAPIs(e)}catch(s){return v.error("API warmup initialization failed",{category:"WARMUP",error:s.message}),{error:s.message}}}typeof window!="undefined"&&setTimeout(()=>{nt({background:!0,criticalOnly:!1})},1e3);class si{constructor(){this.watchId=null,this.isTracking=!1,this.lastLocation=null,this.onLocationUpdate=null,this.onError=null,this.updateInterval=_.gpsUpdateInterval,this.lastUpdateTime=null}isAvailable(){return"geolocation"in navigator}async getCurrentLocation(){if(!this.isAvailable())throw new Error("Geolocation not available in this browser");return new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(s=>{const a={latitude:s.coords.latitude,longitude:s.coords.longitude,accuracy:s.coords.accuracy,timestamp:new Date(s.timestamp).toISOString()};this.lastLocation=a,e(a)},s=>{t(this.handleGeolocationError(s))},{enableHighAccuracy:_.gpsHighAccuracy,timeout:_.gpsTimeout,maximumAge:_.gpsMaxAge})})}start(e,t){if(!this.isAvailable()){const s=new Error("Geolocation not available");return t&&t(s),!1}return this.isTracking?(console.warn("[GPSTracker] Already tracking"),!0):(this.onLocationUpdate=e,this.onError=t,this.watchId=navigator.geolocation.watchPosition(s=>{const a=Date.now();if(this.lastUpdateTime&&a-this.lastUpdateTime<this.updateInterval)return;this.lastUpdateTime=a;const r={latitude:s.coords.latitude,longitude:s.coords.longitude,accuracy:s.coords.accuracy,timestamp:new Date(s.timestamp).toISOString()};this.lastLocation=r,console.log("[GPSTracker] Location update:",{lat:r.latitude.toFixed(6),lng:r.longitude.toFixed(6),accuracy:`${r.accuracy.toFixed(0)}m`}),this.onLocationUpdate&&this.onLocationUpdate(r)},s=>{const a=this.handleGeolocationError(s);console.error("[GPSTracker] Error:",a),this.onError&&this.onError(a)},{enableHighAccuracy:_.gpsHighAccuracy,timeout:_.gpsTimeout,maximumAge:_.gpsMaxAge}),this.isTracking=!0,console.log("[GPSTracker] Started tracking"),!0)}stop(){this.watchId!==null&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null,this.isTracking=!1,console.log("[GPSTracker] Stopped tracking"))}getStatus(){return{isTracking:this.isTracking,hasLocation:this.lastLocation!==null,lastLocation:this.lastLocation,lastUpdateTime:this.lastUpdateTime?new Date(this.lastUpdateTime).toISOString():null}}handleGeolocationError(e){return{[e.PERMISSION_DENIED]:{code:"PERMISSION_DENIED",message:"Location permission denied. Please enable location access.",userMessage:"Bitte aktivieren Sie die Standortfreigabe / Please enable location access",recoverable:!1},[e.POSITION_UNAVAILABLE]:{code:"POSITION_UNAVAILABLE",message:"Location information unavailable.",userMessage:"Standort nicht verfügbar / Location unavailable",recoverable:!0},[e.TIMEOUT]:{code:"TIMEOUT",message:"Location request timed out.",userMessage:"Standortabfrage Zeitüberschreitung / Location timeout",recoverable:!0}}[e.code]||{code:"UNKNOWN",message:e.message||"Unknown GPS error",userMessage:"GPS-Fehler / GPS error",recoverable:!0}}async requestPermission(){if(!("permissions"in navigator))try{return await this.getCurrentLocation(),"granted"}catch(e){return"denied"}try{return(await navigator.permissions.query({name:"geolocation"})).state}catch(e){return console.warn("[GPSTracker] Permission query not supported"),"prompt"}}}const q=new si;class ii{constructor(){U(this,"handleEscKey",e=>{e.key==="Escape"&&this.close()});this.currentLocation=null,this.hospitals=[],this.selectedHospital=null,this.onSelect=null}async show(e){this.onSelect=e;try{this.currentLocation=await q.getCurrentLocation(),this.hospitals=this.getNearbyHospitals(this.currentLocation,50),this.render(),this.attachEventListeners()}catch(t){console.error("[HospitalSelector] Error:",t),this.showError(t.message)}}getNearbyHospitals(e,t){const s=[];return Object.values(Ze).forEach(r=>{r.neurosurgicalCenters&&s.push(...r.neurosurgicalCenters),r.comprehensiveStrokeCenters&&s.push(...r.comprehensiveStrokeCenters),r.regionalStrokeUnits&&s.push(...r.regionalStrokeUnits)}),s.map(r=>({...r,distance:this.calculateDistance(e.latitude,e.longitude,r.coordinates.lat,r.coordinates.lng)})).filter(r=>r.distance<=t).sort((r,n)=>{const l=d=>{let u=0;return d.neurosurgery&&(u+=100),d.thrombectomy&&(u+=50),d.thrombolysis&&(u+=25),u},c=l(n)-l(r);return c!==0?c:r.distance-n.distance}).slice(0,10)}calculateDistance(e,t,s,a){const n=this.toRad(s-e),l=this.toRad(a-t),c=Math.sin(n/2)*Math.sin(n/2)+Math.cos(this.toRad(e))*Math.cos(this.toRad(s))*Math.sin(l/2)*Math.sin(l/2),d=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c));return Math.round(6371*d*10)/10}toRad(e){return e*Math.PI/180}render(){const e=`
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
            ${this.hospitals.length>0?this.hospitals.map((s,a)=>this.renderHospitalCard(s,a)).join(""):'<p class="no-hospitals">Keine Krankenhäuser in der Nähe gefunden / No nearby hospitals found</p>'}
          </div>

          <div class="modal-footer">
            <button class="secondary" id="cancelHospitalSelect">Abbrechen / Cancel</button>
          </div>
        </div>
      </div>
    `,t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t.firstElementChild)}renderHospitalCard(e,t){const s=[];return e.neurosurgery&&s.push('<span class="capability-badge neurosurgery" title="Neurosurgery">🧠 NS</span>'),e.thrombectomy&&s.push('<span class="capability-badge thrombectomy" title="Thrombectomy">🩸 TE</span>'),e.thrombolysis&&s.push('<span class="capability-badge thrombolysis" title="Thrombolysis">💉 TL</span>'),`
      <div class="hospital-card ${t===0?"recommended":""}" data-hospital-index="${t}">
        <div class="hospital-header">
          <div class="hospital-name-section">
            <h3>${e.name}</h3>
            ${t===0?'<span class="recommended-badge">Empfohlen / Recommended</span>':""}
          </div>
          <div class="hospital-distance">
            <span class="distance-value">${e.distance}</span>
            <span class="distance-unit">km</span>
          </div>
        </div>

        <div class="hospital-details">
          <p class="address">📍 ${e.address}</p>
          <p class="phone">📞 ${e.emergency||e.phone}</p>

          <div class="capabilities">
            ${s.join("")}
            ${e.network?`<span class="network-badge">${e.network}</span>`:""}
          </div>

          <div class="hospital-meta">
            <span>${e.beds} Betten / Beds</span>
          </div>
        </div>

        <button class="select-hospital-button" data-hospital-index="${t}">
          Auswählen / Select →
        </button>
      </div>
    `}attachEventListeners(){const e=document.getElementById("hospitalSelectorModal");if(!e)return;const t=document.getElementById("closeHospitalSelector");t&&t.addEventListener("click",()=>this.close());const s=document.getElementById("cancelHospitalSelect");s&&s.addEventListener("click",()=>this.close()),e.querySelectorAll(".select-hospital-button").forEach(r=>{r.addEventListener("click",n=>{const l=parseInt(n.target.dataset.hospitalIndex);this.selectHospital(l)})}),e.addEventListener("click",r=>{r.target===e&&this.close()}),document.addEventListener("keydown",this.handleEscKey)}selectHospital(e){this.selectedHospital=this.hospitals[e],console.log("[HospitalSelector] Hospital selected:",this.selectedHospital.name),this.onSelect&&this.onSelect(this.selectedHospital),this.close()}showError(e){var a;const t=`
      <div class="hospital-selector-overlay" id="hospitalSelectorModal">
        <div class="hospital-selector-modal error">
          <div class="modal-header">
            <h2>⚠️ Fehler / Error</h2>
            <button class="close-button" id="closeHospitalSelector">✕</button>
          </div>

          <div class="error-message">
            <p>${e}</p>
            <p class="error-hint">Bitte überprüfen Sie Ihre Standortfreigabe / Please check your location permissions</p>
          </div>

          <div class="modal-footer">
            <button class="secondary" id="closeHospitalSelector">Schließen / Close</button>
          </div>
        </div>
      </div>
    `,s=document.createElement("div");s.innerHTML=t,document.body.appendChild(s.firstElementChild),(a=document.getElementById("closeHospitalSelector"))==null||a.addEventListener("click",()=>this.close())}close(){const e=document.getElementById("hospitalSelectorModal");e&&e.remove(),document.removeEventListener("keydown",this.handleEscKey)}}const ai=new ii;class ri{constructor(){this.apiKey=_.googleMapsApiKey,this.directionsService=null,this.mapsLoaded=!1}async loadGoogleMaps(){return this.mapsLoaded&&window.google&&window.google.maps?!0:this.apiKey==="YOUR_GOOGLE_MAPS_API_KEY_HERE"?(console.warn("[ETACalculator] Google Maps API key not configured, using fallback"),!1):new Promise(e=>{if(window.google&&window.google.maps){this.mapsLoaded=!0,this.directionsService=new google.maps.DirectionsService,e(!0);return}const t=document.createElement("script");t.src=`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=geometry`,t.async=!0,t.defer=!0,t.onload=()=>{this.mapsLoaded=!0,this.directionsService=new google.maps.DirectionsService,console.log("[ETACalculator] Google Maps loaded"),e(!0)},t.onerror=()=>{console.error("[ETACalculator] Failed to load Google Maps"),e(!1)},document.head.appendChild(t)})}async calculateETA(e,t){if(await this.loadGoogleMaps())try{return await this.calculateGoogleMapsETA(e,t)}catch(s){console.warn("[ETACalculator] Google Maps failed, falling back:",s)}return this.calculateSimpleETA(e,t)}async calculateGoogleMapsETA(e,t){return new Promise((s,a)=>{this.directionsService.route({origin:new google.maps.LatLng(e.lat,e.lng),destination:new google.maps.LatLng(t.lat,t.lng),travelMode:google.maps.TravelMode.DRIVING,drivingOptions:{departureTime:new Date,trafficModel:google.maps.TrafficModel.PESSIMISTIC}},(r,n)=>{if(n===google.maps.DirectionsStatus.OK){const l=r.routes[0],c=l.legs[0],d=c.duration.value,h=Math.round(d*.7),g={duration:Math.round(h/60),distance:Math.round(c.distance.value/1e3),arrivalTime:new Date(Date.now()+h*1e3).toISOString(),route:this.encodeRoute(l),source:"google_maps"};console.log("[ETACalculator] Google Maps ETA:",{duration:`${g.duration} min`,distance:`${g.distance} km`}),s(g)}else a(new Error(`Google Maps Directions failed: ${n}`))})})}calculateSimpleETA(e,t){const s=this.calculateDistance(e.lat,e.lng,t.lat,t.lng),r=Math.round(s/80*60),n={duration:r,distance:Math.round(s*10)/10,arrivalTime:new Date(Date.now()+r*60*1e3).toISOString(),route:null,source:"estimated"};return console.log("[ETACalculator] Simple ETA:",{duration:`${n.duration} min`,distance:`${n.distance} km`}),n}calculateDistance(e,t,s,a){const n=this.toRad(s-e),l=this.toRad(a-t),c=Math.sin(n/2)*Math.sin(n/2)+Math.cos(this.toRad(e))*Math.cos(this.toRad(s))*Math.sin(l/2)*Math.sin(l/2);return 6371*(2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c)))}toRad(e){return e*Math.PI/180}encodeRoute(e){if(!e||!e.overview_path)return null;const t=e.overview_path,s=[];for(let a=0;a<t.length;a+=10)s.push({lat:t[a].lat(),lng:t[a].lng()});if(t.length>0){const a=t[t.length-1];s.push({lat:a.lat(),lng:a.lng()})}return s}async updateETA(e,t,s){const a=await this.calculateETA(e,t);return s&&Math.abs(a.duration-s.duration)>2&&console.log("[ETACalculator] ETA changed significantly:",{previous:`${s.duration} min`,new:`${a.duration} min`}),a}}const xe=new ri;class ni{constructor(){this.baseUrl=_.caseSharingUrl,this.activeCase=null,this.updateInterval=null,this.retryCount=0,this.maxRetries=3}async sendCase(e,t,s,a){try{console.log("[CaseTransmitter] Sending case to hospital:",a.name);const r=await q.getCurrentLocation(),n=await xe.calculateETA({lat:r.latitude,lng:r.longitude},{lat:a.coordinates.lat,lng:a.coordinates.lng}),l={results:e,formData:this.sanitizeFormData(t),moduleType:s,location:{lat:r.latitude,lng:r.longitude,accuracy:r.accuracy,timestamp:r.timestamp},destination:{lat:a.coordinates.lat,lng:a.coordinates.lng},hospitalId:a.id,hospitalName:a.name,estimatedArrival:n.arrivalTime,distance:n.distance,duration:n.duration,ambulanceId:this.generateAmbulanceId()},c=await this.sendWithRetry(`${this.baseUrl}/store-case`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!c.success)throw new Error(c.error||"Failed to store case");return console.log("[CaseTransmitter] Case created:",c.caseId),this.activeCase={caseId:c.caseId,hospital:a,startTime:Date.now()},this.startLocationTracking(),{success:!0,caseId:c.caseId,eta:n.duration}}catch(r){throw console.error("[CaseTransmitter] Failed to send case:",r),r}}startLocationTracking(){this.activeCase&&(console.log("[CaseTransmitter] Starting location tracking for case:",this.activeCase.caseId),q.start(async e=>{await this.updateLocation(e)},e=>{console.error("[CaseTransmitter] GPS error:",e)}))}async updateLocation(e){if(this.activeCase)try{const t=await xe.calculateETA({lat:e.latitude,lng:e.longitude},{lat:this.activeCase.hospital.coordinates.lat,lng:this.activeCase.hospital.coordinates.lng}),s={caseId:this.activeCase.caseId,location:{lat:e.latitude,lng:e.longitude,accuracy:e.accuracy,timestamp:e.timestamp},estimatedArrival:t.arrivalTime,distance:t.distance,duration:t.duration};(await this.sendWithRetry(`${this.baseUrl}/update-location`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).success&&(console.log("[CaseTransmitter] Location updated:",{eta:`${t.duration} min`,distance:`${t.distance} km`}),this.retryCount=0)}catch(t){console.error("[CaseTransmitter] Failed to update location:",t)}}stopTracking(){this.activeCase&&(console.log("[CaseTransmitter] Stopping tracking for case:",this.activeCase.caseId),q.stop(),this.markArrived(this.activeCase.caseId).catch(e=>{console.error("[CaseTransmitter] Failed to mark arrived:",e)}),this.activeCase=null)}async markArrived(e){try{const t=await this.sendWithRetry(`${this.baseUrl}/mark-arrived`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({caseId:e})});return console.log("[CaseTransmitter] Case marked as arrived"),t}catch(t){throw console.error("[CaseTransmitter] Failed to mark arrived:",t),t}}async sendWithRetry(e,t,s=1){try{const a=await fetch(e,{...t,timeout:1e4});if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);return await a.json()}catch(a){if(s<this.maxRetries)return console.warn(`[CaseTransmitter] Retry ${s}/${this.maxRetries}:`,a.message),await this.sleep(1e3*Math.pow(2,s-1)),this.sendWithRetry(e,t,s+1);throw a}}sanitizeFormData(e){const t={...e};return["name","patientName","id","patientId","ssn","insurance"].forEach(a=>{t[a]&&delete t[a]}),t}generateAmbulanceId(){const e="RTW",t=["M","K","S","B"][Math.floor(Math.random()*4)],s=Math.floor(1e3+Math.random()*9e3);return`${e}-${t}-${s}`}getStatus(){if(!this.activeCase)return{isTracking:!1};const e=q.getStatus();return{isTracking:!0,caseId:this.activeCase.caseId,hospital:this.activeCase.hospital.name,startTime:new Date(this.activeCase.startTime).toISOString(),duration:Math.floor((Date.now()-this.activeCase.startTime)/1e3/60),gpsActive:e.isTracking,hasLocation:e.hasLocation,lastUpdate:e.lastUpdateTime}}sleep(e){return new Promise(t=>setTimeout(t,e))}}const ae=new ni;function oi(){document.addEventListener("click",async i=>{const e=i.target.closest("#shareToKiosk");e&&await li(e),i.target.closest("#stopTracking")&&ui()}),console.log("[KioskHandlers] Kiosk handlers initialized")}async function li(i){var e;try{if(ae.getStatus().isTracking){if(!confirm(`Ein Case wird bereits verfolgt. Möchten Sie diesen stoppen und einen neuen senden?

A case is already being tracked. Do you want to stop it and send a new one?`))return;ae.stopTracking(),(e=document.getElementById("trackingStatus"))==null||e.remove()}i.disabled=!0,i.classList.add("sending");const s=i.textContent;i.textContent="⏳ Krankenhaus auswählen... / Selecting Hospital...",ai.show(async a=>{try{i.textContent="📡 Sende Case... / Sending Case...";const r=m.getState(),{results:n,formData:l}=r;if(!n||!n.ich)throw new Error("No assessment results available");const c=ci(n);console.log("[KioskHandlers] Sending case:",{moduleType:c,hospital:a.name,ichRisk:Math.round(n.ich.probability*100)});const d=await ae.sendCase(n,l,c,a);i.classList.remove("sending"),i.classList.add("success"),i.textContent=`✓ Gesendet an / Sent to ${a.name}`,i.disabled=!1,di(d.caseId,a,d.eta),setTimeout(()=>{i.classList.remove("success"),i.textContent=s},5e3)}catch(r){console.error("[KioskHandlers] Failed to send case:",r),hi(i,s,r)}})}catch(t){console.error("[KioskHandlers] Hospital selection error:",t),i.classList.remove("sending"),i.textContent="❌ Fehler / Error - Try Again",i.disabled=!1}}function ci(i){if(!i.ich||!i.ich.module)return"unknown";const e=i.ich.module.toLowerCase();return e.includes("coma")?"coma":e.includes("limited")?"limited":e.includes("full")?"full":"unknown"}function di(i,e,t){const s=document.getElementById("trackingStatus");s&&s.remove();const a=`
    <div class="tracking-status" id="trackingStatus">
      <div class="tracking-header">
        <div class="tracking-title">
          <strong>📡 Live-Tracking aktiv / Live Tracking Active</strong>
          <span class="tracking-badge">GPS aktiv / GPS Active</span>
        </div>
        <button class="stop-tracking" id="stopTracking">Stoppen / Stop</button>
      </div>

      <div class="tracking-info">
        <div class="tracking-detail">
          <span class="detail-label">Case ID:</span>
          <span class="detail-value">${i}</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">Ziel / Destination:</span>
          <span class="detail-value">${e.name}</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">Entfernung / Distance:</span>
          <span class="detail-value">${e.distance} km</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">ETA:</span>
          <span class="detail-value">${t} Minuten / Minutes</span>
        </div>
      </div>

      <div class="tracking-note">
        <p>📍 GPS-Position wird alle 30 Sekunden aktualisiert</p>
        <p>📍 GPS position updates every 30 seconds</p>
      </div>
    </div>
  `,r=document.querySelector(".results-actions");r&&(r.insertAdjacentHTML("afterend",a),setTimeout(()=>{var n;(n=document.getElementById("trackingStatus"))==null||n.scrollIntoView({behavior:"smooth",block:"nearest"})},100))}function ui(){if(confirm(`Möchten Sie das Live-Tracking beenden?

Do you want to stop live tracking?`)){ae.stopTracking();const e=document.getElementById("trackingStatus");e&&(e.style.transition="opacity 0.3s ease",e.style.opacity="0",setTimeout(()=>{e.remove()},300)),console.log("[KioskHandlers] Tracking stopped by user")}}function hi(i,e,t){i.classList.remove("sending"),i.classList.add("error");let s="❌ Fehler / Error";t.message.includes("GPS")||t.message.includes("location")?s="❌ GPS-Fehler / GPS Error":(t.message.includes("network")||t.message.includes("fetch"))&&(s="❌ Netzwerkfehler / Network Error"),i.textContent=s,i.disabled=!1,setTimeout(()=>{i.classList.remove("error"),i.textContent=e},3e3)}const mi={BASE_URL:"/0825/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};let L=null;async function ot(){return y(async()=>{L=await ei(),setTimeout(()=>{nt({background:!0,criticalOnly:!1}).then(t=>{console.info("[Main] API warmup started:",t.status||"completed")}).catch(t=>{console.warn("[Main] API warmup failed:",t.message)})},2e3);const i=L.getStatus(),e=new CustomEvent("appInitialized",{detail:{timestamp:new Date().toISOString(),status:i,version:"2.1.0",build:"production"}});return document.dispatchEvent(e),L},i=>{throw gi(i),i})}function gi(i){const e=document.getElementById("appContainer");e&&(e.innerHTML=`
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
        padding: 20px;
        text-align: center;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <div style="
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 24px;
          max-width: 500px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        ">
          <h2 style="color: #856404; margin: 0 0 16px 0;">
            ⚠️ Application Initialization Failed
          </h2>
          <p style="color: #856404; margin: 0 0 16px 0; line-height: 1.5;">
            The medical triage system could not start properly.
            This may be due to a network issue or browser compatibility problem.
          </p>
          <button
            onclick="window.location.reload()"
            style="
              background: #007bff;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
              margin-right: 12px;
            "
          >
            🔄 Reload Application
          </button>
          <button
            onclick="window.open('mailto:bosdeepak@gmail.com?subject=iGFAP App Error', '_blank')"
            style="
              background: #6c757d;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
            "
          >
            📧 Report Issue
          </button>
        </div>
        <small style="color: #6c757d; margin-top: 20px;">
          Error: ${i.message||"Unknown initialization error"}
        </small>
      </div>
    `);const t=new CustomEvent("appInitializationFailed",{detail:{error:i.message,timestamp:new Date().toISOString(),userAgent:navigator.userAgent.substring(0,100)}});document.dispatchEvent(t)}function Fe(){if(L)try{L.destroy()}catch(i){}}function pi(){document.addEventListener("visibilitychange",()=>{L&&document.visibilityState==="visible"&&(L.getStatus().isAuthenticated||window.location.reload())}),window.addEventListener("beforeunload",Fe),window.addEventListener("unload",Fe)}async function He(){try{try{if(["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!(import.meta&&mi&&!1)&&"serviceWorker"in navigator){const s=await navigator.serviceWorker.getRegistrations();for(const a of s)try{await a.unregister()}catch(r){}window.addEventListener("beforeinstallprompt",a=>{a.preventDefault()})}}catch(t){}pi(),await ot();const i=ge();if(i.isKioskMode){console.log("[Main] Kiosk mode detected - loading case:",i.caseId);try{await As(i.caseId);const t=document.getElementById("appContainer");t&&B(t)}catch(t){console.error("[Main] Failed to load kiosk case:",t);const s=document.getElementById("appContainer");s&&(s.innerHTML=`
            <div class="container" style="text-align: center; padding: 40px;">
              <h2>⚠️ Case Not Found</h2>
              <p>The requested case could not be loaded.</p>
              <button onclick="window.location.href='https://igfap.eu/kiosk/'" class="primary">
                🏠 Return to Case List
              </button>
            </div>
          `);return}}oi();const e=new CustomEvent("appReady",{detail:{timestamp:new Date().toISOString(),version:"2.1.0"}});document.dispatchEvent(e)}catch(i){}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",He):He();typeof window!="undefined"&&(window.iGFAPApp={getApp:()=>L,getStatus:()=>(L==null?void 0:L.getStatus())||{error:"App not initialized"},restart:async()=>(L&&L.destroy(),ot()),getCurrentScreen:()=>{try{return m.getState().currentScreen}catch(i){return"unknown"}},forceResults:()=>{try{m.navigate("results");const i=document.getElementById("appContainer");return i&&B(i),!0}catch(i){return!1}}});class K{constructor(e,t,s={}){this.name=e,this.description=t,this.metadata={...s,id:`cmd_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,timestamp:new Date().toISOString()},this.executed=!1,this.undone=!1}async execute(){if(this.executed&&!this.undone)throw new Error(`Command ${this.name} has already been executed`);try{p.publish(f.AUDIT_EVENT,{action:"command_execute_start",command:this.name,commandId:this.metadata.id});const e=await this.doExecute();return this.executed=!0,this.undone=!1,p.publish(f.AUDIT_EVENT,{action:"command_execute_success",command:this.name,commandId:this.metadata.id}),e}catch(e){throw p.publish(f.AUDIT_EVENT,{action:"command_execute_error",command:this.name,commandId:this.metadata.id,error:e.message}),e}}async undo(){if(!this.executed||this.undone)throw new Error(`Command ${this.name} cannot be undone`);try{p.publish(f.AUDIT_EVENT,{action:"command_undo_start",command:this.name,commandId:this.metadata.id});const e=await this.doUndo();return this.undone=!0,p.publish(f.AUDIT_EVENT,{action:"command_undo_success",command:this.name,commandId:this.metadata.id}),e}catch(e){throw p.publish(f.AUDIT_EVENT,{action:"command_undo_error",command:this.name,commandId:this.metadata.id,error:e.message}),e}}async doExecute(){throw new Error("doExecute() must be implemented by concrete command")}async doUndo(){throw new Error("doUndo() must be implemented by concrete command")}canUndo(){return this.executed&&!this.undone}getSummary(){return{name:this.name,description:this.description,id:this.metadata.id,timestamp:this.metadata.timestamp,executed:this.executed,undone:this.undone}}}class fi extends K{constructor(e,t,s,a){super("UPDATE_PATIENT_DATA",`Update ${e} from ${s} to ${t}`,{fieldName:e,newValue:t,previousValue:s}),this.fieldName=e,this.newValue=t,this.previousValue=s,this.store=a}async doExecute(){const e=this.store.getFormData("current")||{};return e[this.fieldName]=this.newValue,this.store.setFormData("current",e),p.publish(f.PATIENT_DATA_UPDATED,{field:this.fieldName,newValue:this.newValue,previousValue:this.previousValue}),{field:this.fieldName,value:this.newValue}}async doUndo(){const e=this.store.getFormData("current")||{};return this.previousValue===null||this.previousValue===void 0?delete e[this.fieldName]:e[this.fieldName]=this.previousValue,this.store.setFormData("current",e),p.publish(f.PATIENT_DATA_UPDATED,{field:this.fieldName,newValue:this.previousValue,previousValue:this.newValue,action:"undo"}),{field:this.fieldName,value:this.previousValue}}}class yi extends K{constructor(e,t,s){super("NAVIGATE",`Navigate from ${t} to ${e}`,{targetScreen:e,sourceScreen:t}),this.targetScreen=e,this.sourceScreen=t,this.store=s}async doExecute(){return this.store.navigate(this.targetScreen),p.publish(f.NAVIGATION_CHANGED,{from:this.sourceScreen,to:this.targetScreen}),{from:this.sourceScreen,to:this.targetScreen}}async doUndo(){return this.store.navigate(this.sourceScreen),p.publish(f.NAVIGATION_CHANGED,{from:this.targetScreen,to:this.sourceScreen,action:"undo"}),{from:this.targetScreen,to:this.sourceScreen}}}class vi extends K{constructor(e,t,s){super("SUBMIT_FORM",`Submit ${t} form for prediction`,{moduleType:t,formFields:Object.keys(e)}),this.formData={...e},this.moduleType=t,this.predictionStrategy=s,this.results=null}async doExecute(){return this.predictionStrategy.setStrategy(this.getStrategyName()),this.results=await this.predictionStrategy.predict(this.formData),p.publish(f.FORM_SUBMITTED,{moduleType:this.moduleType,fieldsCount:Object.keys(this.formData).length,success:!0}),this.results}async doUndo(){return this.results=null,p.publish(f.FORM_SUBMITTED,{moduleType:this.moduleType,action:"undo"}),null}getStrategyName(){switch(this.moduleType){case"coma":return"COMA_ICH";case"limited":return"LIMITED_DATA_ICH";case"full":return"FULL_STROKE";default:throw new Error(`Unknown module type: ${this.moduleType}`)}}}class bi extends K{constructor(e,t){super("CLEAR_DATA",`Clear ${e} data for privacy compliance`,{dataType:e}),this.dataType=e,this.store=t,this.backupData=null}async doExecute(){switch(this.backupData=this.store.getState(),this.dataType){case"all":this.store.reset();break;case"forms":this.store.clearFormData();break;case"results":this.store.clearResults();break;default:throw new Error(`Unknown data type: ${this.dataType}`)}return p.publish(f.AUDIT_EVENT,{action:"data_cleared",dataType:this.dataType}),{dataType:this.dataType,cleared:!0}}async doUndo(){if(this.backupData)return this.store.setState(this.backupData),p.publish(f.AUDIT_EVENT,{action:"data_restored",dataType:this.dataType}),{dataType:this.dataType,restored:!0};throw new Error("Cannot undo data clear: backup not available")}}class lt{constructor(){this.commandHistory=[],this.currentIndex=-1,this.maxHistorySize=100}async executeCommand(e){if(!(e instanceof K))throw new Error("Command must extend MedicalCommand");const t=await e.execute();return this.commandHistory=this.commandHistory.slice(0,this.currentIndex+1),this.commandHistory.push(e),this.currentIndex=this.commandHistory.length-1,this.commandHistory.length>this.maxHistorySize&&(this.commandHistory.shift(),this.currentIndex-=1),t}async undo(){if(this.currentIndex<0)throw new Error("No commands to undo");const e=this.commandHistory[this.currentIndex];if(!e.canUndo())throw new Error(`Command ${e.name} cannot be undone`);const t=await e.undo();return this.currentIndex-=1,t}async redo(){if(this.currentIndex>=this.commandHistory.length-1)throw new Error("No commands to redo");return this.currentIndex+=1,await this.commandHistory[this.currentIndex].execute()}canUndo(){return this.currentIndex>=0&&this.commandHistory[this.currentIndex]&&this.commandHistory[this.currentIndex].canUndo()}canRedo(){return this.currentIndex<this.commandHistory.length-1}getCommandHistory(){return this.commandHistory.map(e=>e.getSummary())}clearHistory(){this.commandHistory=[],this.currentIndex=-1}getStats(){return{totalCommands:this.commandHistory.length,currentIndex:this.currentIndex,canUndo:this.canUndo(),canRedo:this.canRedo(),executedCommands:this.currentIndex+1}}}const Si=new lt,ki=Object.freeze(Object.defineProperty({__proto__:null,ClearDataCommand:bi,MedicalCommand:K,MedicalCommandInvoker:lt,NavigationCommand:yi,SubmitFormCommand:vi,UpdatePatientDataCommand:fi,medicalCommandInvoker:Si},Symbol.toStringTag,{value:"Module"}));class oe{constructor(e,t){this.name=e,this.description=t,this.requiredFields=[],this.optionalFields=[]}validateInput(e){const t=[],s=[];return this.requiredFields.forEach(a=>{(!(a in e)||e[a]===null||e[a]===void 0)&&s.push(a)}),s.length>0&&t.push(`Missing required fields: ${s.join(", ")}`),{isValid:t.length===0,errors:t,missingFields:s}}preprocessInput(e){return{...e}}async predict(e){throw new Error("predict() method must be implemented by concrete strategy")}postprocessResult(e,t){return{...e,strategy:this.name,timestamp:new Date().toISOString(),inputSummary:this.createInputSummary(t)}}createInputSummary(e){const t={};return[...this.requiredFields,...this.optionalFields].forEach(s=>{s in e&&(t[s]=typeof e[s])}),t}}class wi extends oe{constructor(){super("COMA_ICH","ICH prediction for comatose patients"),this.requiredFields=["gfap"],this.optionalFields=["age","symptoms_duration"]}preprocessInput(e){return{gfap:parseFloat(e.gfap),patientType:"comatose"}}async predict(e){const t=this.validateInput(e);if(!t.isValid)throw new Error(`Validation failed: ${t.errors.join(", ")}`);const s=this.preprocessInput(e);p.publish(f.ASSESSMENT_STARTED,{strategy:this.name,inputFields:Object.keys(s)});try{const a=await Ue(s),r=this.postprocessResult(a,e);return p.publish(f.RESULTS_GENERATED,{strategy:this.name,success:!0,confidence:r.confidence}),r}catch(a){throw p.publish(f.SECURITY_EVENT,{type:"prediction_error",strategy:this.name,error:a.message}),a}}}class Ei extends oe{constructor(){super("LIMITED_DATA_ICH","ICH prediction with limited clinical data"),this.requiredFields=["gfap","age","systolic_bp","diastolic_bp"],this.optionalFields=["weakness_sudden","speech_sudden","vigilanzminderung"]}preprocessInput(e){return{gfap:parseFloat(e.gfap),age:parseInt(e.age,10),systolic_bp:parseFloat(e.systolic_bp),diastolic_bp:parseFloat(e.diastolic_bp),weakness_sudden:e.weakness_sudden===!0||e.weakness_sudden==="true",speech_sudden:e.speech_sudden===!0||e.speech_sudden==="true",vigilanzminderung:e.vigilanzminderung===!0||e.vigilanzminderung==="true"}}async predict(e){const t=this.validateInput(e);if(!t.isValid)throw new Error(`Validation failed: ${t.errors.join(", ")}`);const s=this.preprocessInput(e);p.publish(f.ASSESSMENT_STARTED,{strategy:this.name,inputFields:Object.keys(s)});try{const a=await ze(s),r=this.postprocessResult(a,e);return p.publish(f.RESULTS_GENERATED,{strategy:this.name,success:!0,confidence:r.confidence}),r}catch(a){throw p.publish(f.SECURITY_EVENT,{type:"prediction_error",strategy:this.name,error:a.message}),a}}}class Ti extends oe{constructor(){super("FULL_STROKE","Comprehensive stroke prediction with full clinical data"),this.requiredFields=["gfap","age","systolic_bp","diastolic_bp","fast_ed_score","sex","facialtwitching","armparese","speechdeficit","gaze","agitation"],this.optionalFields=["strokeOnsetKnown","medical_history"]}preprocessInput(e){return{gfap:parseFloat(e.gfap),age:parseInt(e.age,10),systolic_bp:parseFloat(e.systolic_bp),diastolic_bp:parseFloat(e.diastolic_bp),fast_ed_score:parseInt(e.fast_ed_score,10),sex:e.sex==="male"?1:0,facialtwitching:e.facialtwitching===!0||e.facialtwitching==="true",armparese:e.armparese===!0||e.armparese==="true",speechdeficit:e.speechdeficit===!0||e.speechdeficit==="true",gaze:e.gaze===!0||e.gaze==="true",agitation:e.agitation===!0||e.agitation==="true",strokeOnsetKnown:e.strokeOnsetKnown===!0||e.strokeOnsetKnown==="true"}}async predict(e){const t=this.validateInput(e);if(!t.isValid)throw new Error(`Validation failed: ${t.errors.join(", ")}`);const s=this.preprocessInput(e);p.publish(f.ASSESSMENT_STARTED,{strategy:this.name,inputFields:Object.keys(s)});try{const a=await Be(s),r=this.postprocessResult(a,e);return p.publish(f.RESULTS_GENERATED,{strategy:this.name,success:!0,confidence:r.confidence}),r}catch(a){throw p.publish(f.SECURITY_EVENT,{type:"prediction_error",strategy:this.name,error:a.message}),a}}}class ct{constructor(){this.strategies=new Map,this.currentStrategy=null,this.predictionHistory=[],this.registerStrategy(new wi),this.registerStrategy(new Ei),this.registerStrategy(new Ti)}registerStrategy(e){if(!(e instanceof oe))throw new Error("Strategy must extend PredictionStrategy");this.strategies.set(e.name,e)}setStrategy(e){const t=this.strategies.get(e);if(!t)throw new Error(`Unknown strategy: ${e}`);this.currentStrategy=t}async predict(e){if(!this.currentStrategy)throw new Error("No prediction strategy selected");const t=performance.now();try{const s=await this.currentStrategy.predict(e),a=performance.now()-t;return this.predictionHistory.push({strategy:this.currentStrategy.name,timestamp:new Date().toISOString(),duration:a,success:!0}),s}catch(s){const a=performance.now()-t;throw this.predictionHistory.push({strategy:this.currentStrategy.name,timestamp:new Date().toISOString(),duration:a,success:!1,error:s.message}),s}}getAvailableStrategies(){return Array.from(this.strategies.keys())}getStrategyInfo(e){const t=this.strategies.get(e);return t?{name:t.name,description:t.description,requiredFields:t.requiredFields,optionalFields:t.optionalFields}:null}getPredictionHistory(){return[...this.predictionHistory]}clearHistory(){this.predictionHistory=[]}}const Ai=new ct,Ci={COMA_ICH:"COMA_ICH",LIMITED_DATA_ICH:"LIMITED_DATA_ICH",FULL_STROKE:"FULL_STROKE"},Ii=Object.freeze(Object.defineProperty({__proto__:null,PREDICTION_STRATEGIES:Ci,PredictionContext:ct,predictionContext:Ai},Symbol.toStringTag,{value:"Module"}));class Li{constructor(e,t=!1){this.name=e,this.required=t,this.validators=[],this.medicalChecks=[]}addValidator(e){return this.validators.push(e),this}addMedicalCheck(e){return this.medicalChecks.push(e),this}validate(e,t=null){const s=[];this.required&&!e&&e!==0&&s.push("This field is required");for(const a of this.validators){const r=a(e);r&&s.push(r)}for(const a of this.medicalChecks){const r=a(e,t);r&&s.push(r)}return s}toConfig(){return{required:this.required,validate:(e,t)=>this.validate(e,t)}}}class Q extends Li{constructor(e,t=!1,s=null,a=null){super(e,t),this.min=s,this.max=a,this.type="number",s!==null&&this.addValidator(r=>r!==""&&!isNaN(r)&&parseFloat(r)<s?`Value must be at least ${s}`:null),a!==null&&this.addValidator(r=>r!==""&&!isNaN(r)&&parseFloat(r)>a?`Value must be at most ${a}`:null)}toConfig(){return{...super.toConfig(),min:this.min,max:this.max,type:this.type}}}class Mi extends Q{constructor(e,t,s){super(e,!0,s.min,s.max),this.biomarkerType=t,this.ranges=s,this.addMedicalCheck(a=>{const r=parseFloat(a);return isNaN(r)?null:t==="GFAP"&&r>s.critical?"Extremely high GFAP value - please verify lab result":null})}}class Ri extends Q{constructor(e,t,s,a){super(e,!0,s,a),this.vitalType=t,this.addMedicalCheck((r,n)=>{const l=parseFloat(r);if(isNaN(l))return null;switch(t){case"SYSTOLIC_BP":if(n!=null&&n.diastolic_bp){const c=parseFloat(n.diastolic_bp);if(!isNaN(c)&&l<=c)return"Systolic BP must be higher than diastolic BP"}break;case"DIASTOLIC_BP":if(n!=null&&n.systolic_bp){const c=parseFloat(n.systolic_bp);if(!isNaN(c)&&l>=c)return"Diastolic BP must be lower than systolic BP"}break}return null})}}class _i extends Q{constructor(e){super(e,!0,0,120),this.addMedicalCheck(t=>{const s=parseFloat(t);return isNaN(s)?null:s<18?"Emergency stroke assessment typically for adults (≥18 years)":null})}}class Pi extends Q{constructor(e,t,s,a){super(e,!0,s,a),this.scaleType=t,this.addMedicalCheck(r=>{const n=parseFloat(r);if(isNaN(n))return null;switch(t){case"GCS":if(n<8)return"GCS < 8 indicates severe consciousness impairment - consider coma module";break;case"FAST_ED":if(n>=4)return"High FAST-ED score suggests LVO - consider urgent intervention";break}return null})}}class Di{static createRule(e,t,s={}){switch(e){case"AGE":return new _i(t);case"BIOMARKER":if(s.biomarkerType==="GFAP")return new Mi(t,"GFAP",M);throw new Error(`Unsupported biomarker type: ${s.biomarkerType}`);case"VITAL_SIGN":return new Ri(t,s.vitalType,s.min,s.max);case"CLINICAL_SCALE":return new Pi(t,s.scaleType,s.min,s.max);case"NUMERIC":return new Q(t,s.required,s.min,s.max);default:throw new Error(`Unsupported validation rule type: ${e}`)}}static createModuleValidation(e){const t={};switch(e){case"LIMITED":t.age_years=this.createRule("AGE","age_years").toConfig(),t.systolic_bp=this.createRule("VITAL_SIGN","systolic_bp",{vitalType:"SYSTOLIC_BP",min:60,max:300}).toConfig(),t.diastolic_bp=this.createRule("VITAL_SIGN","diastolic_bp",{vitalType:"DIASTOLIC_BP",min:30,max:200}).toConfig(),t.gfap_value=this.createRule("BIOMARKER","gfap_value",{biomarkerType:"GFAP"}).toConfig();break;case"FULL":Object.assign(t,this.createModuleValidation("LIMITED")),t.fast_ed_score=this.createRule("CLINICAL_SCALE","fast_ed_score",{scaleType:"FAST_ED",min:0,max:9}).toConfig();break;case"COMA":t.gfap_value=this.createRule("BIOMARKER","gfap_value",{biomarkerType:"GFAP"}).toConfig(),t.gcs=this.createRule("CLINICAL_SCALE","gcs",{scaleType:"GCS",min:3,max:15}).toConfig();break;default:throw new Error(`Unsupported module type: ${e}`)}return t}static validateModule(e,t){const s=this.createModuleValidation(t),a={};let r=!0;return Object.entries(s).forEach(([n,l])=>{const c=e[n],d=l.validate(c,e);d.length>0&&(a[n]=d,r=!1)}),{isValid:r,validationErrors:a}}}const Ni={AGE:"AGE",BIOMARKER:"BIOMARKER",VITAL_SIGN:"VITAL_SIGN",CLINICAL_SCALE:"CLINICAL_SCALE",NUMERIC:"NUMERIC"},$i={GFAP:"GFAP"},Oi={SYSTOLIC_BP:"SYSTOLIC_BP",DIASTOLIC_BP:"DIASTOLIC_BP"},xi={GCS:"GCS",FAST_ED:"FAST_ED"},Fi=Object.freeze(Object.defineProperty({__proto__:null,BIOMARKER_TYPES:$i,CLINICAL_SCALE_TYPES:xi,MedicalValidationFactory:Di,VALIDATION_RULE_TYPES:Ni,VITAL_SIGN_TYPES:Oi},Symbol.toStringTag,{value:"Module"}));export{X as A,Ze as C,qe as D,S as E,b as L,T as M,ra as R,qi as V,w as a,ji as b,Je as c,na as d,Wt as l,v as m,oa as p,y as s,o as t};
//# sourceMappingURL=index-YNoD0VjV.js.map
