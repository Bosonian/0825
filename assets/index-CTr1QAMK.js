const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/research-tools-BvzcIJm_.js","assets/medical-core-ut6K_BvQ.js","assets/enterprise-features-BHfEsmtF.js"])))=>i.map(i=>d[i]);
var ns=Object.defineProperty;var os=(a,e,t)=>e in a?ns(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var me=(a,e,t)=>os(a,typeof e!="symbol"?e+"":e,t);import{s as m,v as ls,b as cs,a as z,P as Je,m as f,M as y}from"./medical-core-ut6K_BvQ.js";import{p as Rt,a as _t,b as Pt,A as ds,e as Dt,c as us}from"./prediction-models-DshwIk0g.js";import{s as Te,a as ge,b as Pe,m as lt,c as ct}from"./enterprise-features-BHfEsmtF.js";import{i as Ae,s as hs,c as ms,r as Nt,a as xt,b as gs,d as dt,e as ut,q as Ze}from"./research-tools-BvzcIJm_.js";import{r as Ee,R as se,c as ht}from"./vendor-McBd-j_V.js";import{i as ps,r as Ot,a as fs,b as ys}from"./ui-components-C7pMwVlr.js";import"./index-CTr1QAMK.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const bs=!1,vs={success:!0,message:"Development mode - authentication bypassed",session_token:`dev-token-${Date.now()}`,expires_at:new Date(Date.now()+30*60*1e3).toISOString(),session_duration:1800},Ss={coma_ich:{probability:25.3,ich_probability:25.3,drivers:{gfap_value:.4721,baseline_risk:.1456},confidence:.75},limited_ich:{probability:31.7,ich_probability:31.7,drivers:{age_years:.2845,systolic_bp:.1923,gfap_value:.4231,vigilanzminderung:.3456},confidence:.65},full_stroke:{ich_prediction:{probability:28.4,drivers:{age_years:.1834,gfap_value:.3921,systolic_bp:.2341,vigilanzminderung:.2876},confidence:.88},lvo_prediction:{probability:45.2,drivers:{fast_ed_score:.7834,age_years:.2341,eye_deviation:.1923},confidence:.82}},authenticate:{success:!0,message:"Development mode - authentication bypassed",session_token:`dev-token-${Date.now()}`,expires_at:new Date(Date.now()+30*60*1e3).toISOString(),session_duration:1800}},De={COMA_ICH:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_coma_ich",LDM_ICH:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_limited_data_ich",FULL_STROKE:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_full_stroke",LVO_PREDICTION:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_lvo",AUTHENTICATE:"https://europe-west3-igfap-452720.cloudfunctions.net/authenticate-research-access"},$t={isDevelopment:bs,mockAuthResponse:vs,mockApiResponses:Ss},Ft={ich:{medium:25,high:50},lvo:{medium:25,high:50}},K={min:29,max:10001,normal:100,elevated:500,critical:1e3},mt={autoSaveInterval:18e4,sessionTimeout:30*60*1e3},Q={caseSharingUrl:"https://case-sharing-564499947017.europe-west3.run.app",googleMapsApiKey:"AIzaSyACBndIj8HD1wwZ4Vw8PDDI0bIe6DoBExI",gpsUpdateInterval:3e4,gpsHighAccuracy:!0,gpsTimeout:1e4,gpsMaxAge:0,autoArchiveHours:2,staleGpsMinutes:5},Va={age_years:{required:!0,min:0,max:120,type:"integer",medicalCheck:a=>a<18?"Emergency stroke assessment typically for adults (≥18 years)":null},systolic_bp:{required:!0,min:60,max:300,type:"number",medicalCheck:(a,e)=>{const t=e==null?void 0:e.diastolic_bp;return t&&a<=t?"Systolic BP must be higher than diastolic BP":null}},diastolic_bp:{required:!0,min:30,max:200,type:"number",medicalCheck:(a,e)=>{const t=e==null?void 0:e.systolic_bp;return t&&a>=t?"Diastolic BP must be lower than systolic BP":null}},gfap_value:{required:!0,min:K.min,max:K.max,type:"number",medicalCheck:a=>a>8e3?"Warning: Extremely high GFAP value - please verify lab result (still valid)":null},fast_ed_score:{required:!0,min:0,max:9,type:"integer",medicalCheck:a=>a>=4?"High FAST-ED score suggests LVO - consider urgent intervention":null},gcs:{required:!0,min:3,max:15,type:"integer",medicalCheck:a=>a<8?"GCS < 8 indicates severe consciousness impairment - consider coma module":null}},ks=-.825559,ws=-.408314,Es=-.82645,Ts=1.651521,As=-0,Cs=1,Is=3.701422,Ls=2.306173,Ms=1.11742,Rs=-1.032167,_s=.333333,Ps=1e-15,Ds=0,Ns=16;function xs(a,e){return Math.abs(e)<Ps?Math.log(a+1):((a+1)**e-1)/e}function gt(a,e,t){return(a-e)/t}function Os(a){return a>500?1:a<-500?0:1/(1+Math.exp(-a))}function $s(a,e){if(a==null)throw new Error("gfap is required");if(e==null)throw new Error("fasted is required");const t=Number(a),s=Number(e);if(!Number.isFinite(t))throw new Error("gfap must be a finite number");if(!Number.isFinite(s))throw new Error("fasted must be a finite number");if(t<0)throw new Error("GFAP value must be non-negative");return{gfap:t,fasted:s}}function Fs(a,e){const t=$s(a,e),s=Math.max(Ds,Math.min(Ns,t.fasted)),r=xs(t.gfap,ks),i=gt(r,As,Cs),n=gt(s,Is,Ls),l=ws+Es*i+Ts*n,c=Ms*l+Rs;return Os(c)}function Ga(a,e){return Fs(a,e)>=_s?1:0}const pt={en:{appTitle:"iGFAP",emergencyBadge:"Emergency Tool",helpButton:"Help and Instructions",darkModeButton:"Toggle dark mode",languageToggle:"Language",step1:"Initial Assessment",step2:"Data Collection",step3:"Results",comaModuleTitle:"Coma Module",limitedDataModuleTitle:"Limited Data Module",fullStrokeModuleTitle:"Full Stroke Module",triage1Title:"Patient Assessment",triage1Question:"Is the patient comatose?",triage1Help:"Glasgow Coma Scale < 9",triage1Yes:"YES - Comatose",triage1No:"NO - Conscious",triage2Title:"Examination Capability",triage2Question:"Can the patient be reliably examined?",triage2Help:"Patient is not aphasic, confused, or uncooperative",triage2Yes:"YES - Full Exam Possible",triage2No:"NO - Limited Exam Only",ageLabel:"Age (years)",ageHelp:"Patient age in years",systolicLabel:"Systolic BP (mmHg)",systolicHelp:"Systolic blood pressure",diastolicLabel:"Diastolic BP (mmHg)",diastolicHelp:"Diastolic blood pressure",gfapLabel:"GFAP Value (pg/mL)",gfapHelp:"GFAP biomarker level",fastEdLabel:"FAST-ED Score",fastEdHelp:"FAST-ED assessment score (0-9)",headacheLabel:"Headache",vigilanzLabel:"Reduced consciousness",armPareseLabel:"Arm weakness",beinPareseLabel:"Leg weakness",eyeDeviationLabel:"Eye deviation",atrialFibLabel:"Atrial fibrillation",anticoagLabel:"Anticoagulated (NOAK)",antiplateletsLabel:"Antiplatelets",analyzeButton:"Analyze",analyzing:"Analyzing...",printResults:"Print Results",newAssessment:"Start New Assessment",startOver:"Start Over",goBack:"Go Back",goHome:"Go Home",basicInformation:"Basic Information",biomarkersScores:"Biomarkers & Scores",clinicalSymptoms:"Clinical Symptoms",medicalHistory:"Medical History",ageYearsLabel:"Age (years)",systolicBpLabel:"Systolic BP (mmHg)",diastolicBpLabel:"Diastolic BP (mmHg)",gfapValueLabel:"GFAP Value (pg/mL)",fastEdScoreLabel:"FAST-ED Score",ageYearsHelp:"Patient's age in years",systolicBpHelp:"Normal: 90-140 mmHg",diastolicBpHelp:"Normal: 60-90 mmHg",gfapTooltip:"Brain injury biomarker",gfapTooltipLong:"Glial Fibrillary Acidic Protein - Brain injury biomarker",gfapRange:"Range: {min} - {max} pg/mL",fastEdTooltip:"0-9 scale for LVO screening",analyzeIchRisk:"Analyze ICH Risk",analyzeStrokeRisk:"Analyze Stroke Risk",criticalPatient:"Critical Patient",comaAlert:"Patient is comatose (GCS < 9). Rapid assessment required.",vigilanceReduction:"Vigilance Reduction (Decreased alertness)",armParesis:"Arm Paresis",legParesis:"Leg Paresis",eyeDeviation:"Eye Deviation",atrialFibrillation:"Atrial Fibrillation",onNoacDoac:"On NOAC/DOAC",onAntiplatelets:"On Antiplatelets",resultsTitle:"Assessment Results",bleedingRiskAssessment:"Bleeding Risk Assessment",ichProbability:"ICH Probability",lvoProbability:"LVO Probability",lvoMayBePossible:"Large vessel occlusion possible - further evaluation recommended",riskFactorsTitle:"Main Risk Factors",increasingRisk:"Increasing Risk",decreasingRisk:"Decreasing Risk",noFactors:"No factors",riskLevel:"Risk Level",lowRisk:"Low Risk",mediumRisk:"Medium Risk",highRisk:"High Risk",riskLow:"Low",riskMedium:"Medium",riskHigh:"High",riskFactorsAnalysis:"Risk Factors",contributingFactors:"Contributing factors to the assessment",riskFactors:"Risk Factors",increaseRisk:"INCREASE",decreaseRisk:"DECREASE",noPositiveFactors:"No increasing factors",noNegativeFactors:"No decreasing factors",ichRiskFactors:"ICH Risk Factors",lvoRiskFactors:"LVO Risk Factors",ichRisk:"ICH Risk",lvoRisk:"LVO Risk",sendToHospital:"Send to Hospital",criticalAlertTitle:"CRITICAL RISK DETECTED",criticalAlertMessage:"High probability of intracerebral hemorrhage detected.",immediateActionsRequired:"Immediate actions required",initiateStrokeProtocol:"Initiate stroke protocol immediately",urgentCtImaging:"Urgent CT imaging required",considerBpManagement:"Consider blood pressure management",prepareNeurosurgicalConsult:"Prepare for potential neurosurgical consultation",helpTitle:"Quick Reference Guide",gcsTitle:"Glasgow Coma Scale (GCS)",gcsLow:"GCS < 9: Comatose patient - use Coma Module",gcsMod:"GCS 8-12: Moderate impairment",gcsHigh:"GCS 13-15: Mild impairment",fastEdTitle:"FAST-ED Score Components",fastEdFacial:"Facial Palsy: 0-1 points",fastEdArm:"Arm Weakness: 0-2 points",fastEdSpeech:"Speech Changes: 0-2 points",fastEdTime:"Time: Critical factor",fastEdEye:"Eye Deviation: 0-2 points",fastEdDenial:"Denial/Neglect: 0-2 points",criticalValuesTitle:"Critical Values",criticalBp:"Systolic BP > 180: Increased ICH risk",criticalGfap:"GFAP > 500 pg/mL: Significant marker",criticalFastEd:"FAST-ED ≥ 4: Consider LVO",fastEdCalculatorTitle:"FAST-ED Score Calculator",fastEdCalculatorSubtitle:"Click to calculate FAST-ED score components",facialPalsyTitle:"Facial Palsy",facialPalsyNormal:"Normal (0)",facialPalsyMild:"Present (1)",armWeaknessTitle:"Arm Weakness",armWeaknessNormal:"Normal (0)",armWeaknessMild:"Mild weakness or drift (1)",armWeaknessSevere:"Severe weakness or falls immediately (2)",speechChangesTitle:"Speech Abnormalities",speechChangesNormal:"Normal (0)",speechChangesMild:"Mild dysarthria or aphasia (1)",speechChangesSevere:"Severe dysarthria or aphasia (2)",eyeDeviationTitle:"Eye Deviation",eyeDeviationNormal:"Normal (0)",eyeDeviationPartial:"Partial gaze deviation (1)",eyeDeviationForced:"Forced gaze deviation (2)",denialNeglectTitle:"Denial/Neglect",denialNeglectNormal:"Normal (0)",denialNeglectPartial:"Partial neglect (1)",denialNeglectComplete:"Complete neglect (2)",totalScoreTitle:"Total FAST-ED Score",riskLevel:"Risk Level",riskLevelLow:"LOW (Score <4)",riskLevelHigh:"HIGH (Score ≥4 - Consider LVO)",applyScore:"Apply Score",cancel:"Cancel",riskAnalysis:"Risk Analysis",riskAnalysisSubtitle:"Clinical factors in this assessment",contributingFactors:"Contributing factors",factorsShown:"shown",positiveFactors:"Positive factors",negativeFactors:"Negative factors",clinicalInformation:"Clinical Information",clinicalRecommendations:"Clinical Recommendations",clinicalRec1:"Consider immediate imaging if ICH risk is high",clinicalRec2:"Activate stroke team for LVO scores ≥ 50%",clinicalRec3:"Monitor blood pressure closely",clinicalRec4:"Document all findings thoroughly",noDriverData:"No driver data available",driverAnalysisUnavailable:"Driver analysis unavailable",driverInfoNotAvailable:"Driver information not available from this prediction model",driverAnalysisNotAvailable:"Driver analysis not available for this prediction",lvoNotPossible:"LVO assessment not possible with limited data",fullExamRequired:"Full neurological examination required for LVO screening",limitedAssessment:"Limited Assessment",disclaimer:"Clinical Disclaimer",disclaimerText:"This tool is for clinical decision support only. Always use clinical judgment and follow local protocols. Not a replacement for physician assessment.",importantNote:"Important",importantText:"These results are for clinical decision support only. Always use clinical judgment and follow institutional protocols.",predictedMortality:"Predicted 30-day mortality",ichVolumeLabel:"ICH Volume",references:"References",inputSummaryTitle:"Input Summary",inputSummarySubtitle:"Values used for this analysis",privacyLink:"Privacy Policy",disclaimerLink:"Medical Disclaimer",versionLink:"Version 2.1.0 - Research Preview",privacyPolicy:"Privacy Policy: This tool processes data locally. No patient data is stored or transmitted.",medicalDisclaimer:"Medical Disclaimer: This tool is for clinical decision support only. Always use clinical judgment and follow local protocols.",networkError:"Network error - please check your connection and try again",requestTimeout:"Request timeout - please try again",apiError:"Failed to get results",validationError:"Please check your input values",sessionTimeout:"Your session has been idle for 30 minutes. Would you like to continue?",unsavedData:"You have unsaved data. Are you sure you want to leave?",nearestCentersTitle:"Nearest Stroke Centers",useCurrentLocation:"Use Current Location",enterLocationPlaceholder:"Enter city or address...",enterManually:"Enter Location Manually",search:"Search",yourLocation:"Your Location",recommendedCenters:"Recommended Centers",alternativeCenters:"Alternative Centers",noCentersFound:"No stroke centers found in this area",gettingLocation:"Getting your location",searchingLocation:"Searching location",locationError:"Unable to get your location",locationPermissionDenied:"Location access denied. Please allow location access and try again.",locationUnavailable:"Location information is unavailable",locationTimeout:"Location request timed out",geolocationNotSupported:"Geolocation is not supported by this browser",geocodingNotImplemented:"Location search not available. Please use GPS or enter coordinates manually.",tryManualEntry:"Try entering your location manually or use GPS.",distanceNote:"Distances are calculated as straight-line distances. Actual travel times may vary.",travelTimeNote:"Travel times calculated for emergency vehicles with sirens and priority routing.",calculatingTravelTimes:"Calculating travel times",minutes:"min",poweredByOrs:"Travel times powered by OpenRoute Service",comprehensiveCenter:"Comprehensive Stroke Center",primaryCenter:"Primary Stroke Center",telemetryCenter:"Telemedicine Center",thrombectomy:"Thrombectomy",neurosurgery:"Neurosurgery",icu:"Intensive Care",telemedicine:"Telemedicine",stroke_unit:"Stroke Unit",call:"Call",directions:"Directions",emergency:"Emergency",certified:"Certified",prerequisitesTitle:"Prerequisites for Stroke Triage",prerequisitesIntro:"Please confirm that all of the following prerequisites are met:",prerequisitesWarning:"All prerequisites must be met to continue",continue:"Continue",acute_deficit:"Acute (severe) neurological deficit present",symptom_onset:"Symptom onset within 6 hours",no_preexisting:"No pre-existing severe neurological deficits",no_trauma:"No traumatic brain injury present",differentialDiagnoses:"Differential Diagnoses",reconfirmTimeWindow:"Please reconfirm time window!",unclearTimeWindow:"With unclear/extended time window, early demarcated brain infarction is also possible",rareDiagnoses:"Rare diagnoses such as glioblastoma are also possible",researchAccessRequired:"Research Access Required",researchPreviewDescription:"This is a research preview of the iGFAP Stroke Triage Assistant for clinical validation.",importantNotice:"Important Notice",researchUseOnly:"Research Use Only",researchUseOnlyDesc:"Not for clinical decision making",noPatientDataStorage:"No Patient Data Storage",noPatientDataStorageDesc:"All data processed locally",clinicalAdvisory:"Clinical Advisory",clinicalAdvisoryDesc:"Under supervision of Prof. Christian Förch & Dr. Lovepreet Kalra",contact:"Contact",researchAccessCode:"Research Access Code",enterResearchAccessCode:"Enter research access code",accessResearchSystem:"Access Research System",regulatoryStatus:"Regulatory Status",regulatoryStatusDesc:"Research prototype - CE certification pending",dataProtection:"Data Protection",dataProtectionDesc:"GDPR compliant - local processing only",clinicalOversight:"Clinical Oversight",clinicalOversightDesc:"RKH Klinikum Ludwigsburg, Neurologie",accessDenied:"Access Denied",invalidResearchCode:"Invalid research access code. Please try again."},de:{appTitle:"iGFAP",emergencyBadge:"Notfall-Tool",helpButton:"Hilfe und Anweisungen",darkModeButton:"Dunklen Modus umschalten",languageToggle:"Sprache",step1:"Erstbeurteilung",step2:"Datenerhebung",step3:"Ergebnisse",comaModuleTitle:"Koma-Modul",limitedDataModuleTitle:"Begrenzte Daten Modul",fullStrokeModuleTitle:"Vollständiges Schlaganfall-Modul",triage1Title:"Patientenbeurteilung",triage1Question:"Ist der Patient komatös?",triage1Help:"Glasgow Coma Scale < 9",triage1Yes:"JA - Komatös",triage1No:"NEIN - Bei Bewusstsein",triage2Title:"Untersuchungsfähigkeit",triage2Question:"Kann der Patient zuverlässig untersucht werden?",triage2Help:"Patient ist nicht aphasisch, verwirrt oder unkooperativ",triage2Yes:"JA - Vollständige Untersuchung möglich",triage2No:"NEIN - Nur begrenzte Untersuchung",ageLabel:"Alter (Jahre)",ageHelp:"Patientenalter in Jahren",systolicLabel:"Systolischer RR (mmHg)",systolicHelp:"Systolischer Blutdruck",diastolicLabel:"Diastolischer RR (mmHg)",diastolicHelp:"Diastolischer Blutdruck",gfapLabel:"GFAP-Wert (pg/mL)",gfapHelp:"GFAP-Biomarker-Wert",fastEdLabel:"FAST-ED-Score",fastEdHelp:"FAST-ED-Bewertungsscore (0-9)",headacheLabel:"Kopfschmerzen",vigilanzLabel:"Bewusstseinstrübung",armPareseLabel:"Armschwäche",beinPareseLabel:"Beinschwäche",eyeDeviationLabel:"Blickdeviation",atrialFibLabel:"Vorhofflimmern",anticoagLabel:"Antikoaguliert (NOAK)",antiplateletsLabel:"Thrombozytenaggregationshemmer",analyzeButton:"Analysieren",analyzing:"Analysiere...",printResults:"Ergebnisse drucken",newAssessment:"Neue Bewertung starten",startOver:"Von vorn beginnen",goBack:"Zurück",goHome:"Zur Startseite",basicInformation:"Grundinformationen",biomarkersScores:"Biomarker & Scores",clinicalSymptoms:"Klinische Symptome",medicalHistory:"Anamnese",ageYearsLabel:"Alter (Jahre)",systolicBpLabel:"Systolischer RR (mmHg)",diastolicBpLabel:"Diastolischer RR (mmHg)",gfapValueLabel:"GFAP-Wert (pg/mL)",fastEdScoreLabel:"FAST-ED-Score",ageYearsHelp:"Patientenalter in Jahren",systolicBpHelp:"Normal: 90-140 mmHg",diastolicBpHelp:"Normal: 60-90 mmHg",gfapTooltip:"Hirnverletzungs-Biomarker",gfapTooltipLong:"Glial Fibrillary Acidic Protein - Hirnverletzungs-Biomarker",gfapRange:"Bereich: {min} - {max} pg/mL",fastEdTooltip:"0-9 Skala für LVO-Screening",analyzeIchRisk:"ICB-Risiko analysieren",analyzeStrokeRisk:"Schlaganfall-Risiko analysieren",criticalPatient:"Kritischer Patient",comaAlert:"Patient ist komatös (GCS < 9). Schnelle Beurteilung erforderlich.",vigilanceReduction:"Vigilanzminderung (Verminderte Wachheit)",armParesis:"Armparese",legParesis:"Beinparese",eyeDeviation:"Blickdeviation",atrialFibrillation:"Vorhofflimmern",onNoacDoac:"NOAK/DOAK-Therapie",onAntiplatelets:"Thrombozytenaggregationshemmer",resultsTitle:"Bewertungsergebnisse",bleedingRiskAssessment:"Blutungsrisiko-Bewertung",ichProbability:"ICB-Risiko",lvoProbability:"LVO-Risiko",lvoMayBePossible:"Großgefäßverschluss möglich - weitere Abklärung empfohlen",riskFactorsTitle:"Hauptrisikofaktoren",increasingRisk:"Risikoerhöhend",decreasingRisk:"Risikomindernd",noFactors:"Keine Faktoren",riskLevel:"Risikostufe",lowRisk:"Niedriges Risiko",mediumRisk:"Mittleres Risiko",highRisk:"Hohes Risiko",riskLow:"Niedrig",riskMedium:"Mittel",riskHigh:"Hoch",riskFactorsAnalysis:"Risikofaktoren",contributingFactors:"Beitragende Faktoren zur Bewertung",riskFactors:"Risikofaktoren",increaseRisk:"ERHÖHEN",decreaseRisk:"VERRINGERN",noPositiveFactors:"Keine erhöhenden Faktoren",noNegativeFactors:"Keine verringernden Faktoren",ichRiskFactors:"ICB-Risikofaktoren",lvoRiskFactors:"LVO-Risikofaktoren",ichRisk:"ICB-Risiko",lvoRisk:"LVO-Risiko",sendToHospital:"An Krankenhaus senden",criticalAlertTitle:"KRITISCHES RISIKO ERKANNT",criticalAlertMessage:"Hohe Wahrscheinlichkeit einer intrazerebralen Blutung erkannt.",immediateActionsRequired:"Sofortige Maßnahmen erforderlich",initiateStrokeProtocol:"Schlaganfall-Protokoll sofort einleiten",urgentCtImaging:"Dringende CT-Bildgebung erforderlich",considerBpManagement:"Blutdruckmanagement erwägen",prepareNeurosurgicalConsult:"Neurochirurgische Konsultation vorbereiten",helpTitle:"Kurzreferenzleitfaden",gcsTitle:"Glasgow Coma Scale (GCS)",gcsLow:"GCS < 9: Komatöser Patient - Koma-Modul verwenden",gcsMod:"GCS 8-12: Mäßige Beeinträchtigung",gcsHigh:"GCS 13-15: Leichte Beeinträchtigung",fastEdTitle:"FAST-ED-Score-Komponenten",fastEdFacial:"Faziale Parese: 0-1 Punkte",fastEdArm:"Armschwäche: 0-2 Punkte",fastEdSpeech:"Sprachveränderungen: 0-2 Punkte",fastEdTime:"Zeit: Kritischer Faktor",fastEdEye:"Blickdeviation: 0-2 Punkte",fastEdDenial:"Verneinung/Neglect: 0-2 Punkte",criticalValuesTitle:"Kritische Werte",criticalBp:"Systolischer RR > 180: Erhöhtes ICB-Risiko",criticalGfap:"GFAP > 500 pg/mL: Signifikanter Marker",criticalFastEd:"FAST-ED ≥ 4: LVO in Betracht ziehen",fastEdCalculatorTitle:"FAST-ED-Score-Rechner",fastEdCalculatorSubtitle:"Klicken Sie, um FAST-ED-Score-Komponenten zu berechnen",facialPalsyTitle:"Fazialisparese",facialPalsyNormal:"Normal (0)",facialPalsyMild:"Vorhanden (1)",armWeaknessTitle:"Armschwäche",armWeaknessNormal:"Normal (0)",armWeaknessMild:"Leichte Schwäche oder Absinken (1)",armWeaknessSevere:"Schwere Schwäche oder fällt sofort ab (2)",speechChangesTitle:"Sprachstörungen",speechChangesNormal:"Normal (0)",speechChangesMild:"Leichte Dysarthrie oder Aphasie (1)",speechChangesSevere:"Schwere Dysarthrie oder Aphasie (2)",eyeDeviationTitle:"Blickdeviation",eyeDeviationNormal:"Normal (0)",eyeDeviationPartial:"Partielle Blickdeviation (1)",eyeDeviationForced:"Forcierte Blickdeviation (2)",denialNeglectTitle:"Verneinung/Neglect",denialNeglectNormal:"Normal (0)",denialNeglectPartial:"Partieller Neglect (1)",denialNeglectComplete:"Kompletter Neglect (2)",totalScoreTitle:"Gesamt-FAST-ED-Score",riskLevel:"Risikostufe",riskLevelLow:"NIEDRIG (Score <4)",riskLevelHigh:"HOCH (Score ≥4 - LVO erwägen)",applyScore:"Score Anwenden",cancel:"Abbrechen",riskAnalysis:"Risikoanalyse",riskAnalysisSubtitle:"Klinische Faktoren in dieser Bewertung",contributingFactors:"Beitragende Faktoren",factorsShown:"angezeigt",positiveFactors:"Positive Faktoren",negativeFactors:"Negative Faktoren",clinicalInformation:"Klinische Informationen",clinicalRecommendations:"Klinische Empfehlungen",clinicalRec1:"Sofortige Bildgebung erwägen bei hohem ICB-Risiko",clinicalRec2:"Stroke-Team aktivieren bei LVO-Score ≥ 50%",clinicalRec3:"Blutdruck engmaschig überwachen",clinicalRec4:"Alle Befunde gründlich dokumentieren",noDriverData:"Keine Treiberdaten verfügbar",driverAnalysisUnavailable:"Treiberanalyse nicht verfügbar",driverInfoNotAvailable:"Treiberinformationen von diesem Vorhersagemodell nicht verfügbar",driverAnalysisNotAvailable:"Treiberanalyse für diese Vorhersage nicht verfügbar",lvoNotPossible:"LVO-Bewertung mit begrenzten Daten nicht möglich",fullExamRequired:"Vollständige neurologische Untersuchung für LVO-Screening erforderlich",limitedAssessment:"Begrenzte Bewertung",disclaimer:"Klinischer Haftungsausschluss",disclaimerText:"Dieses Tool dient nur zur klinischen Entscheidungsunterstützung. Verwenden Sie immer klinisches Urteilsvermögen und befolgen Sie lokale Protokolle. Kein Ersatz für ärztliche Beurteilung.",importantNote:"Wichtig",importantText:"Diese Ergebnisse dienen nur zur klinischen Entscheidungsunterstützung. Verwenden Sie immer klinisches Urteilsvermögen und befolgen Sie institutionelle Protokolle.",predictedMortality:"Vorhergesagte 30-Tage-Mortalität",ichVolumeLabel:"ICB-Volumen",references:"Referenzen",inputSummaryTitle:"Eingabezusammenfassung",inputSummarySubtitle:"Für diese Analyse verwendete Werte",privacyLink:"Datenschutzrichtlinie",disclaimerLink:"Medizinischer Haftungsausschluss",versionLink:"Version 2.1.0 - Research Preview",privacyPolicy:"Datenschutzrichtlinie: Dieses Tool verarbeitet Daten lokal. Keine Patientendaten werden gespeichert oder übertragen.",medicalDisclaimer:"Medizinischer Haftungsausschluss: Dieses Tool dient nur zur klinischen Entscheidungsunterstützung. Verwenden Sie immer klinisches Urteilsvermögen und befolgen Sie lokale Protokolle.",networkError:"Netzwerkfehler - bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut",requestTimeout:"Anfrage-Timeout - bitte versuchen Sie es erneut",apiError:"Ergebnisse konnten nicht abgerufen werden",validationError:"Bitte überprüfen Sie Ihre Eingabewerte",sessionTimeout:"Ihre Sitzung war 30 Minuten lang inaktiv. Möchten Sie fortfahren?",unsavedData:"Sie haben ungespeicherte Daten. Sind Sie sicher, dass Sie verlassen möchten?",nearestCentersTitle:"Nächstgelegene Schlaganfall-Zentren",useCurrentLocation:"Aktuellen Standort verwenden",enterLocationPlaceholder:"Stadt oder Adresse eingeben...",enterManually:"Standort manuell eingeben",search:"Suchen",yourLocation:"Ihr Standort",recommendedCenters:"Empfohlene Zentren",alternativeCenters:"Alternative Zentren",noCentersFound:"Keine Schlaganfall-Zentren in diesem Bereich gefunden",gettingLocation:"Standort wird ermittelt",searchingLocation:"Standort wird gesucht",locationError:"Standort konnte nicht ermittelt werden",locationPermissionDenied:"Standortzugriff verweigert. Bitte erlauben Sie Standortzugriff und versuchen Sie es erneut.",locationUnavailable:"Standortinformationen sind nicht verfügbar",locationTimeout:"Standortanfrage ist abgelaufen",geolocationNotSupported:"Geolokalisierung wird von diesem Browser nicht unterstützt",geocodingNotImplemented:"Standortsuche nicht verfügbar. Bitte verwenden Sie GPS oder geben Sie Koordinaten manuell ein.",tryManualEntry:"Versuchen Sie, Ihren Standort manuell einzugeben oder GPS zu verwenden.",distanceNote:"Entfernungen werden als Luftlinie berechnet. Tatsächliche Fahrzeiten können variieren.",travelTimeNote:"Fahrzeiten berechnet für Rettungsfahrzeuge mit Sondersignalen und Vorfahrtsberechtigung.",calculatingTravelTimes:"Fahrzeiten werden berechnet",minutes:"Min",poweredByOrs:"Fahrzeiten bereitgestellt von OpenRoute Service",comprehensiveCenter:"Überregionales Schlaganfall-Zentrum",primaryCenter:"Regionales Schlaganfall-Zentrum",telemetryCenter:"Telemedizin-Zentrum",thrombectomy:"Thrombektomie",neurosurgery:"Neurochirurgie",icu:"Intensivstation",telemedicine:"Telemedizin",stroke_unit:"Stroke Unit",call:"Anrufen",directions:"Wegbeschreibung",emergency:"Notfall",certified:"Zertifiziert",prerequisitesTitle:"Voraussetzungen für Schlaganfall-Triage",prerequisitesIntro:"Bitte bestätigen Sie, dass alle folgenden Voraussetzungen erfüllt sind:",prerequisitesWarning:"Alle Voraussetzungen müssen erfüllt sein, um fortzufahren",continue:"Weiter",acute_deficit:"Akutes (schweres) neurologisches Defizit vorhanden",symptom_onset:"Symptombeginn innerhalb 6h",no_preexisting:"Keine vorbestehende schwere neurologische Defizite",no_trauma:"Kein Schädelhirntrauma vorhanden",differentialDiagnoses:"Differentialdiagnosen",reconfirmTimeWindow:"Bitte Zeitfenster rekonfirmieren!",unclearTimeWindow:"Bei unklarem/erweitertem Zeitfenster ist auch ein beginnend demarkierter Hirninfarkt möglich",rareDiagnoses:"Seltene Diagnosen wie ein Glioblastom sind auch möglich",researchAccessRequired:"Forschungszugang erforderlich",researchPreviewDescription:"Dies ist eine Forschungsvorschau des iGFAP Schlaganfall-Triage-Assistenten zur klinischen Validierung.",importantNotice:"Wichtiger Hinweis",researchUseOnly:"Nur für Forschungszwecke",researchUseOnlyDesc:"Nicht für klinische Entscheidungen",noPatientDataStorage:"Keine Patientendatenspeicherung",noPatientDataStorageDesc:"Alle Daten werden lokal verarbeitet",clinicalAdvisory:"Klinische Beratung",clinicalAdvisoryDesc:"Unter Aufsicht von Prof. Christian Förch & Dr. Lovepreet Kalra",contact:"Kontakt",researchAccessCode:"Forschungszugangscode",enterResearchAccessCode:"Forschungszugangscode eingeben",accessResearchSystem:"Zugang zum Forschungssystem",regulatoryStatus:"Regulatorischer Status",regulatoryStatusDesc:"Forschungsprototyp - CE-Zertifizierung ausstehend",dataProtection:"Datenschutz",dataProtectionDesc:"DSGVO-konform - nur lokale Verarbeitung",clinicalOversight:"Klinische Aufsicht",clinicalOversightDesc:"RKH Klinikum Ludwigsburg, Neurologie",accessDenied:"Zugriff verweigert",invalidResearchCode:"Ungültiger Forschungszugangscode. Bitte versuchen Sie es erneut."}};class Hs{constructor(){this.supportedLanguages=["en","de"],this.currentLanguage=this.detectLanguage()}detectLanguage(){const e=localStorage.getItem("language");return e&&this.supportedLanguages.includes(e)?e:(navigator.language||navigator.userLanguage).substring(0,2).toLowerCase()==="de"?"de":"en"}getCurrentLanguage(){return this.currentLanguage}setLanguage(e){return this.supportedLanguages.includes(e)?(this.currentLanguage=e,localStorage.setItem("language",e),window.dispatchEvent(new CustomEvent("languageChanged",{detail:{language:e}})),!0):!1}getSupportedLanguages(){return[...this.supportedLanguages]}t(e){return(pt[this.currentLanguage]||pt.en)[e]||e}toggleLanguage(){const e=this.currentLanguage==="en"?"de":"en";return this.setLanguage(e)}getLanguageDisplayName(e=null){const t=e||this.currentLanguage;return{en:"English",de:"Deutsch"}[t]||t}formatDateTime(e){const t=this.currentLanguage==="de"?"de-DE":"en-US";return new Intl.DateTimeFormat(t,{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)}formatTime(e){const t=this.currentLanguage==="de"?"de-DE":"en-US";return new Intl.DateTimeFormat(t,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)}}const q=new Hs,o=a=>q.t(a),Bs=()=>[{id:"acute_deficit",checked:!1},{id:"symptom_onset",checked:!1},{id:"no_preexisting",checked:!1},{id:"no_trauma",checked:!1}];function zs(){const a=Bs();return`
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
            ${a.map(e=>`
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
  `}function Us(){const a=document.getElementById("prerequisitesModal");if(!a)return;const e=document.getElementById("closePrerequisites"),t=document.getElementById("cancelPrerequisites"),s=document.getElementById("confirmPrerequisites"),r=()=>{a.remove(),pe("welcome")};e==null||e.addEventListener("click",r),t==null||t.addEventListener("click",r),s==null||s.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const l=a.querySelectorAll(".toggle-input");if(Array.from(l).every(h=>h.checked))a.remove(),pe("triage2");else{const h=document.getElementById("prerequisitesWarning");h&&(h.style.display="flex",h.classList.add("shake"),setTimeout(()=>h.classList.remove("shake"),500))}});const i=a.querySelectorAll(".toggle-input");i.forEach(n=>{n.addEventListener("change",()=>{const l=Array.from(i).every(h=>h.checked),c=document.getElementById("prerequisitesWarning");l&&c&&(c.style.display="none")})})}function Vs(){const a=document.getElementById("prerequisitesModal");a&&a.remove();const e=document.createElement("div");try{Te(e,zs());const t=e.firstElementChild;if(!t)throw new Error("Failed to create modal element");document.body.appendChild(t)}catch(t){console.error("Prerequisites modal sanitization failed:",t);const s=document.createElement("div");s.className="modal prerequisites-modal",s.style.display="flex",s.textContent="Prerequisites modal could not be displayed securely. Please refresh the page.",document.body.appendChild(s);return}Us()}function Gs(a){m.logEvent("triage1_answer",{comatose:a}),a?pe("coma"):Vs()}function Ws(a){m.logEvent("triage2_answer",{examinable:a}),pe(a?"full":"limited")}function pe(a){m.logEvent("navigate",{from:m.getState().currentScreen,to:a}),m.navigate(a),window.scrollTo(0,0)}function Ks(){m.hasUnsavedData()&&!confirm("Are you sure you want to start over? All entered data will be lost.")||(m.logEvent("reset"),m.reset())}function qs(){m.goBack()?(m.logEvent("navigate_back"),window.scrollTo(0,0)):Ht()}function Ht(){m.logEvent("navigate_home"),m.goHome(),window.scrollTo(0,0)}async function js(a,e){var c,h;a.preventDefault();const t=a.target,{module:s}=t.dataset,r=ls(t);if(!r.isValid){cs(e,r.validationErrors);try{const d=Object.keys(r.validationErrors)[0];if(d&&t.elements[d]){const E=t.elements[d];E.focus({preventScroll:!0}),E.scrollIntoView({behavior:"smooth",block:"center"})}const u=document.createElement("div");u.className="sr-only",u.setAttribute("role","status"),u.setAttribute("aria-live","polite");const g=Object.keys(r.validationErrors).length;u.textContent=`${g} field${g===1?"":"s"} need attention.`,document.body.appendChild(u),setTimeout(()=>u.remove(),1200)}catch(d){}return}const i={};Array.from(t.elements).forEach(d=>{if(d.name)if(d.type==="checkbox")i[d.name]=d.checked;else if(d.type==="number"){const u=parseFloat(d.value);i[d.name]=isNaN(u)?0:u}else d.type==="hidden"&&d.name==="armparese"?i[d.name]=d.value==="true":i[d.name]=d.value}),m.setFormData(s,i);const n=t.querySelector("button[type=submit]"),l=n?n.innerHTML:"";if(n){n.disabled=!0;try{Te(n,`<span class="loading-spinner"></span> ${o("analyzing")}`)}catch(d){console.error("Button loading state sanitization failed:",d),n.textContent=o("analyzing")||"Analyzing..."}}try{console.log("[Submit] Module:",s),console.log("[Submit] Inputs:",i);let d;switch(s){case"coma":d={ich:{...await Pt(i),module:"Coma"},lvo:null};break;case"limited":d={ich:{...await _t(i),module:"Limited"},lvo:{notPossible:!0}};break;case"full":if(d=await Rt(i),console.log("[Submit] Full results:",{ich:!!(d!=null&&d.ich),lvo:!!(d!=null&&d.lvo),ichP:(c=d==null?void 0:d.ich)==null?void 0:c.probability,lvoP:(h=d==null?void 0:d.lvo)==null?void 0:h.probability}),!d||!d.ich)throw new Error("Invalid response structure from Full Stroke API");d.ich&&!d.ich.probability&&d.ich.ich_probability!==void 0&&(d.ich.probability=d.ich.ich_probability,console.log("[Submit] Fixed ICH probability for Full Stroke:",d.ich.probability)),d.ich&&!d.ich.module&&(d.ich.module="Full Stroke"),d.lvo&&!d.lvo.module&&(d.lvo.module="Full Stroke");break;default:throw new Error(`Unknown module: ${s}`)}console.log("[Submit] Setting results in store:",d),m.setResults(d),m.logEvent("models_complete",{module:s,results:d});const u=m.getState();console.log("[Submit] State after setResults:",{hasResults:!!u.results,currentScreen:u.currentScreen}),console.log("[Submit] Navigating to results..."),pe("results"),ft("✅ Results loaded",2e3),setTimeout(()=>{try{const g=m.getState().currentScreen;console.log("[Submit] currentScreen after navigate:",g),g!=="results"&&(m.navigate("results"),ft("🔁 Forced results view",1500))}catch(g){}},0)}catch(d){const u=["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!0;if(s==="full"&&u)try{const E=$t.mockApiResponses.full_stroke,L=E.ich_prediction||{},_=E.lvo_prediction||{},$=parseFloat(L.probability)||0,R=parseFloat(_.probability)||0,ie={ich:{probability:$>1?$/100:$,drivers:L.drivers||null,confidence:parseFloat(L.confidence)||.85,module:"Full Stroke"},lvo:{probability:R>1?R/100:R,drivers:_.drivers||null,confidence:parseFloat(_.confidence)||.85,module:"Full Stroke"}};m.setResults(ie),m.logEvent("models_complete_fallback",{module:s,reason:d.message}),pe("results");return}catch(E){}let g="An error occurred during analysis. Please try again.";if(d instanceof ds&&(g=d.message),Ys(e,g),n){n.disabled=!1;try{Te(n,l)}catch(E){console.error("Button restore sanitization failed:",E),n.textContent="Submit"}}}}function Ys(a,e){a.querySelectorAll(".critical-alert").forEach(l=>{var c,h;(h=(c=l.querySelector("h4"))==null?void 0:c.textContent)!=null&&h.includes("Error")&&l.remove()});const t=document.createElement("div");t.className="critical-alert";const s=document.createElement("h4"),r=document.createElement("span");r.className="alert-icon",r.textContent="⚠️",s.appendChild(r),s.appendChild(document.createTextNode(" Error"));const i=document.createElement("p");i.textContent=e,t.appendChild(s),t.appendChild(i);const n=a.querySelector(".container");n?n.prepend(t):a.prepend(t),setTimeout(()=>t.remove(),1e4)}function ft(a,e=2e3){try{const t=document.createElement("div");t.textContent=a,t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>{t.style.opacity="1"}),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>t.remove(),200)},e)}catch(t){}}const A={LOW:"low",MEDIUM:"medium",HIGH:"high",CRITICAL:"critical"},w={NETWORK:"network",VALIDATION:"validation",AUTHENTICATION:"authentication",CALCULATION:"calculation",STORAGE:"storage",RENDERING:"rendering",MEDICAL:"medical",SECURITY:"security"};class x extends Error{constructor(e,t,s=w.MEDICAL,r=A.MEDIUM){super(e),this.name="MedicalError",this.code=t,this.category=s,this.severity=r,this.timestamp=new Date().toISOString(),this.context={}}withContext(e){return this.context={...this.context,...e},this}getUserMessage(){switch(this.category){case w.NETWORK:return"Network connection issue. Please check your internet connection and try again.";case w.VALIDATION:return"Please check your input data and try again.";case w.AUTHENTICATION:return"Authentication failed. Please log in again.";case w.CALCULATION:return"Unable to complete calculation. Please verify your input data.";case w.MEDICAL:return"Medical calculation could not be completed. Please verify all clinical data.";default:return"An unexpected error occurred. Please try again."}}}class Qs{constructor(){this.errorQueue=[],this.maxQueueSize=100,this.setupGlobalHandlers()}setupGlobalHandlers(){window.addEventListener("unhandledrejection",e=>{this.handleError(e.reason,w.NETWORK,A.HIGH),e.preventDefault()}),window.addEventListener("error",e=>{this.handleError(e.error,w.RENDERING,A.MEDIUM)})}handleError(e,t=w.NETWORK,s=A.MEDIUM){const r={error:e instanceof Error?e:new Error(String(e)),category:t,severity:s,timestamp:new Date().toISOString(),userAgent:navigator.userAgent.substring(0,100),url:window.location.href};this.errorQueue.push(r),this.errorQueue.length>this.maxQueueSize&&this.errorQueue.shift(),s===A.CRITICAL&&this.handleCriticalError(r)}handleCriticalError(e){e.category===w.MEDICAL&&this.showMedicalAlert(e.error.message)}showMedicalAlert(e){const t=document.createElement("div");t.className="critical-medical-alert",t.style.cssText=`
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
    `,t.textContent=`⚠️ Medical Error: ${e}`,document.body.appendChild(t),setTimeout(()=>{document.body.contains(t)&&document.body.removeChild(t)},1e4)}getErrorSummary(){return{totalErrors:this.errorQueue.length,criticalErrors:this.errorQueue.filter(e=>e.severity===A.CRITICAL).length,recentErrors:this.errorQueue.slice(-10)}}}const Zs=new Qs;async function b(a,e={}){const{category:t=w.NETWORK,severity:s=A.MEDIUM,fallback:r=null,timeout:i=3e4,retries:n=0,context:l={}}=e;for(let c=0;c<=n;c++)try{const h=new Promise((u,g)=>{setTimeout(()=>g(new Error("Operation timeout")),i)});return await Promise.race([a(),h])}catch(h){if(Zs.handleError(h,t,s),c<n){await new Promise(u=>setTimeout(u,1e3*(c+1)));continue}if(r!==null)return typeof r=="function"?r(h):r;throw new x(h.message||"Operation failed",h.code||"UNKNOWN",t,s).withContext(l)}}async function yt(a,e={}){return b(a,{category:w.AUTHENTICATION,severity:A.HIGH,timeout:15e3,fallback:()=>({success:!1,error:!0,message:"Authentication service unavailable"}),...e})}function Js(a){const e=[],t=[];return!a||typeof a!="object"?(e.push("Patient data must be an object"),{isValid:!1,errors:e,warnings:t}):((typeof a.age!="number"||a.age<0||a.age>120)&&e.push("Age must be a number between 0 and 120"),["male","female","other"].includes(a.gender)||e.push('Gender must be "male", "female", or "other"'),(typeof a.gfap!="number"||a.gfap<29||a.gfap>10001)&&e.push("GFAP must be a number between 29 and 10001 pg/mL"),a.nihss!==void 0&&(typeof a.nihss!="number"||a.nihss<0||a.nihss>42)&&e.push("NIHSS must be a number between 0 and 42"),a.gcs!==void 0&&(typeof a.gcs!="number"||a.gcs<3||a.gcs>15)&&e.push("GCS must be a number between 3 and 15"),a.sbp!==void 0&&(typeof a.sbp!="number"||a.sbp<50||a.sbp>300)&&t.push("Systolic BP should typically be between 50-300 mmHg"),a.dbp!==void 0&&(typeof a.dbp!="number"||a.dbp<30||a.dbp>200)&&t.push("Diastolic BP should typically be between 30-200 mmHg"),{isValid:e.length===0,errors:e,warnings:t})}function Xs(a){const e=[],t=[];return!a||typeof a!="object"?(e.push("ICH risk result must be an object"),{isValid:!1,errors:e,warnings:t}):((typeof a.probability!="number"||a.probability<0||a.probability>1)&&e.push("Probability must be a number between 0 and 1"),(typeof a.percentage!="number"||a.percentage<0||a.percentage>100)&&e.push("Percentage must be a number between 0 and 100"),["low","moderate","high","critical"].includes(a.riskLevel)||e.push('Risk level must be "low", "moderate", "high", or "critical"'),(!a.timestamp||!Date.parse(a.timestamp))&&e.push("Timestamp must be a valid ISO date string"),{isValid:e.length===0,errors:e,warnings:t})}function ei(a){return Js(a).isValid}function ti(a){return Xs(a).isValid}class si{static ensureType(e,t,s){let r=!1,i=typeof e;switch(t){case"PatientData":r=ei(e),i="Invalid PatientData";break;case"ICHRiskResult":r=ti(e),i="Invalid ICHRiskResult";break;case"number":r=typeof e=="number"&&!isNaN(e);break;case"string":r=typeof e=="string";break;case"boolean":r=typeof e=="boolean";break;default:r=typeof e===t}if(!r)throw new TypeError(`Type error in ${s}: expected ${t}, got ${i}. This is a critical error in medical calculations.`)}static ensureRange(e,t,s){this.ensureType(e,"number",s);const[r,i]=t;if(e<r||e>i)throw new RangeError(`Range error in ${s}: value ${e} must be between ${r} and ${i}. This is a critical error in medical calculations.`)}}const te={DEBUG:{level:0,name:"DEBUG",color:"#6366f1"},INFO:{level:1,name:"INFO",color:"#10b981"},WARN:{level:2,name:"WARN",color:"#f59e0b"},ERROR:{level:3,name:"ERROR",color:"#ef4444"},CRITICAL:{level:4,name:"CRITICAL",color:"#dc2626"}},S={AUTHENTICATION:"AUTH",MEDICAL_CALCULATION:"MEDICAL",NETWORK:"NETWORK",PERFORMANCE:"PERF",SECURITY:"SECURITY",USER_INTERACTION:"UI",DATA_VALIDATION:"VALIDATION",AUDIT:"AUDIT",SYSTEM:"SYSTEM",ERROR:"ERROR"};class ii{constructor(){this.logLevel=this.getLogLevel(),this.sessionId=this.generateSessionId(),this.logBuffer=[],this.maxBufferSize=1e3,this.isProduction=window.location.hostname!=="localhost"&&window.location.hostname!=="127.0.0.1",this.enableConsole=!this.isProduction,this.enableStorage=!0,this.enableNetwork=!1,this.setupErrorHandlers(),this.startPeriodicFlush()}getLogLevel(){try{const e=localStorage.getItem("medicalLogLevel");if(e&&te[e.toUpperCase()])return te[e.toUpperCase()].level}catch(e){}return this.isProduction?te.INFO.level:te.DEBUG.level}generateSessionId(){const e=Date.now().toString(36),t=Math.random().toString(36).substring(2,8);return`sess_${e}_${t}`}setupErrorHandlers(){window.addEventListener("error",e=>{var t;try{this.critical("Unhandled JavaScript Error",{category:S.ERROR,message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno,stack:(t=e.error)==null?void 0:t.stack})}catch(s){console.error("Logging failed:",s),console.error("Original error:",e.error)}}),window.addEventListener("unhandledrejection",e=>{var t,s;try{this.critical("Unhandled Promise Rejection",{category:S.ERROR,reason:((t=e.reason)==null?void 0:t.message)||String(e.reason)||"Unknown rejection",stack:(s=e.reason)==null?void 0:s.stack})}catch(r){console.error("Logging failed:",r),console.error("Original rejection:",e.reason)}})}createLogEntry(e,t,s={}){var l;const r=s&&typeof s=="object"?s:{},i={timestamp:new Date().toISOString(),level:((l=te[e])==null?void 0:l.name)||e,category:r.category||S.SYSTEM,message:this.sanitizeMessage(t),sessionId:this.sessionId,context:this.sanitizeContext(r),performance:this.getPerformanceMetrics()};(e==="ERROR"||e==="CRITICAL")&&(i.stackTrace=new Error().stack);const n=this.getAnonymizedUserId();return n&&(i.userId=n),i}sanitizeMessage(e){return typeof e!="string"&&(e=String(e)),e.replace(/\b\d{3}-\d{2}-\d{4}\b/g,"***-**-****").replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,"***@***.***").replace(/\b\d{10,}\b/g,"**********").replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,"[NAME]")}sanitizeContext(e){if(!e||typeof e!="object")return{};const t={...e},s=["password","token","sessionToken","authToken","patientName","firstName","lastName","fullName","email","phone","ssn","mrn","dob","dateOfBirth"],r=i=>{if(!i||typeof i!="object")return i;const n=Array.isArray(i)?[]:{};for(const[l,c]of Object.entries(i)){const h=l.toLowerCase();s.some(d=>h.includes(d))?n[l]="[REDACTED]":typeof c=="object"&&c!==null?n[l]=r(c):n[l]=c}return n};return r(t)}getAnonymizedUserId(){try{const e=sessionStorage.getItem("session_hash");if(e)return`user_${e.substring(0,8)}`}catch(e){}return null}getPerformanceMetrics(){var e;try{if("performance"in window){const t=bt.getEntriesByType("navigation")[0];return{memoryUsed:((e=bt.memory)==null?void 0:e.usedJSHeapSize)||0,loadTime:(t==null?void 0:t.loadEventEnd)-(t==null?void 0:t.loadEventStart)||0,domReady:(t==null?void 0:t.domContentLoadedEventEnd)-(t==null?void 0:t.domContentLoadedEventStart)||0}}}catch(t){}return null}log(e,t,s={}){return b(async()=>{if(!e||!t)return;const r=te[e.toUpperCase()];if(!r||r.level<this.logLevel)return;const i=this.createLogEntry(e.toUpperCase(),t,s);this.addToBuffer(i),this.enableConsole&&this.outputToConsole(i),this.enableStorage&&this.storeEntry(i),this.enableNetwork&&await this.sendToLoggingService(i)},{category:w.SYSTEM,context:{operation:"logging",level:e,message:t.substring(0,100)}})}addToBuffer(e){this.logBuffer.push(e),this.logBuffer.length>this.maxBufferSize&&(this.logBuffer=this.logBuffer.slice(-this.maxBufferSize))}outputToConsole(e){const t=te[e.level],r=`color: ${(t==null?void 0:t.color)||"#666666"}; font-weight: bold;`,i=new Date(e.timestamp).toLocaleTimeString();e.level==="ERROR"||e.level==="CRITICAL"||e.level,console.groupCollapsed(`%c[${e.level}] ${i} [${e.category}] ${e.message}`,r),e.context&&Object.keys(e.context).length>0&&console.log("Context:",e.context),e.performance&&console.log("Performance:",e.performance),e.stackTrace&&(e.level==="ERROR"||e.level==="CRITICAL")&&console.log("Stack Trace:",e.stackTrace),console.groupEnd()}storeEntry(e){try{const t=`medicalLog_${e.timestamp}`,s=JSON.stringify(e);sessionStorage.setItem(t,s),this.cleanOldEntries()}catch(t){}}cleanOldEntries(){try{const e=Object.keys(sessionStorage).filter(t=>t.startsWith("medicalLog_")).sort().reverse();e.length>100&&e.slice(100).forEach(t=>{sessionStorage.removeItem(t)})}catch(e){}}async sendToLoggingService(e){return Promise.resolve()}startPeriodicFlush(){setInterval(()=>{this.flushBuffer()},3e4)}flushBuffer(){this.logBuffer.length!==0&&this.info("Log buffer flushed",{category:S.SYSTEM,entriesCount:this.logBuffer.length})}debug(e,t={}){return this.log("DEBUG",e,t)}info(e,t={}){return this.log("INFO",e,t)}warn(e,t={}){return this.log("WARN",e,t)}error(e,t={}){return this.log("ERROR",e,t)}critical(e,t={}){return this.log("CRITICAL",e,t)}medicalCalculation(e,t,s={}){return this.info(`Medical calculation: ${e}`,{category:S.MEDICAL_CALCULATION,operation:e,success:!s.error,...s})}authentication(e,t,s={}){return this.info(`Authentication: ${e}`,{category:S.AUTHENTICATION,action:e,success:t,...s})}userInteraction(e,t={}){return this.debug(`User interaction: ${e}`,{category:S.USER_INTERACTION,action:e,...t})}networkRequest(e,t,s,r={}){const i=s>=400?"ERROR":s>=300?"WARN":"DEBUG";return this.log(i,`Network request: ${t} ${e}`,{category:S.NETWORK,method:t,url:this.sanitizeUrl(e),status:s,...r})}performance(e,t,s={}){return this.debug(`Performance metric: ${e} = ${t}`,{category:S.PERFORMANCE,metric:e,value:t,...s})}auditTrail(e,t={}){return this.info(`Audit: ${e}`,{category:S.AUDIT,event:e,...t})}sanitizeUrl(e){try{const t=new URL(e);return["token","auth","key","secret"].forEach(r=>{t.searchParams.has(r)&&t.searchParams.set(r,"[REDACTED]")}),t.toString()}catch(t){return e}}getLogs(e={}){var r;const t=[...this.logBuffer];try{Object.keys(sessionStorage).filter(n=>n.startsWith("medicalLog_")).sort().forEach(n=>{try{const l=JSON.parse(sessionStorage.getItem(n));l&&!t.find(c=>c.timestamp===l.timestamp)&&t.push(l)}catch(l){}})}catch(i){}let s=t.sort((i,n)=>new Date(n.timestamp)-new Date(i.timestamp));if(e.level){const i=((r=te[e.level.toUpperCase()])==null?void 0:r.level)||0;s=s.filter(n=>{var c;return(((c=te[n.level])==null?void 0:c.level)||0)>=i})}if(e.category&&(s=s.filter(i=>i.category===e.category)),e.since){const i=new Date(e.since);s=s.filter(n=>new Date(n.timestamp)>=i)}return e.limit&&(s=s.slice(0,e.limit)),s}exportLogs(e="json"){const t=this.getLogs();return e==="csv"?this.logsToCSV(t):JSON.stringify(t,null,2)}logsToCSV(e){if(e.length===0)return"";const t=["timestamp","level","category","message","sessionId"],s=e.map(r=>[r.timestamp,r.level,r.category,`"${r.message.replace(/"/g,'""')}"`,r.sessionId]);return[t.join(","),...s.map(r=>r.join(","))].join(`
`)}clearLogs(){this.logBuffer=[];try{Object.keys(sessionStorage).filter(t=>t.startsWith("medicalLog_")).forEach(t=>sessionStorage.removeItem(t))}catch(e){}this.info("Log storage cleared",{category:S.SYSTEM})}}const v=new ii,{debug:Wa,info:Ka,warn:qa,error:ja,critical:Ya,medicalCalculation:Qa,authentication:Za,userInteraction:Ja,networkRequest:Xa,performance:bt,auditTrail:er}=v;class ai{constructor(){this.isAuthenticated=!1,this.sessionToken=null,this.sessionExpiry=null,this.lastActivity=Date.now(),this.setupActivityTracking()}async authenticate(e){return yt(async()=>{if(v.info("Authentication attempt started",{category:S.AUTHENTICATION,hasPassword:!!e&&e.length>0,isDevelopment:$t.isDevelopment}),si.ensureType(e,"string","authentication password"),!e||e.trim().length===0)throw v.warn("Authentication failed: empty password",{category:S.AUTHENTICATION}),new x("Password is required","EMPTY_PASSWORD",w.VALIDATION,A.MEDIUM);v.debug("Sending authentication request to backend",{category:S.AUTHENTICATION,url:De.AUTHENTICATE});const t=await fetch(De.AUTHENTICATE,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e.trim()})});if(!t.ok){let r="Authentication failed",i="AUTH_FAILED";throw t.status===429?(r="Too many authentication attempts. Please wait and try again.",i="RATE_LIMITED"):t.status>=500&&(r="Authentication service temporarily unavailable",i="SERVICE_ERROR"),new x(r,i,w.AUTHENTICATION,t.status>=500?A.HIGH:A.MEDIUM).withContext({statusCode:t.status,url:De.AUTHENTICATE})}const s=await t.json();if(!s||typeof s!="object")throw new x("Invalid response from authentication service","INVALID_RESPONSE",w.AUTHENTICATION,A.HIGH);if(s.success){this.isAuthenticated=!0,this.sessionToken=s.session_token,this.sessionExpiry=s.expires_at?new Date(s.expires_at):null,this.lastActivity=Date.now();try{this.storeSecureSession()}catch(r){console.warn("Session storage failed:",r.message)}return{success:!0,message:"Authentication successful",sessionDuration:s.session_duration}}throw await this.delayFailedAttempt(),new x(s.message||"Invalid credentials","INVALID_CREDENTIALS",w.AUTHENTICATION,A.MEDIUM).withContext({remainingAttempts:s.rate_limit_remaining,statusCode:t.status})},{timeout:15e3,fallback:t=>{var s;return{success:!1,message:t instanceof x?t.getUserMessage():"Authentication service unavailable. Please try again.",errorCode:t.code||"NETWORK_ERROR",details:t.message,remainingAttempts:(s=t.context)==null?void 0:s.remainingAttempts}},context:{operation:"user_authentication",endpoint:"authenticate"}})}isValidSession(){return this.isAuthenticated?this.sessionExpiry&&new Date>this.sessionExpiry?(this.logout(),!1):!0:this.checkStoredSession()}async validateSessionWithServer(){return this.sessionToken?yt(async()=>{if(["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!0)return this.updateActivity(),!0;const t=await fetch(De.AUTHENTICATE,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"validate_session",session_token:this.sessionToken})});if(!t.ok){if(t.status===401||t.status===403)return this.logout(),!1;throw new x("Session validation service error","VALIDATION_ERROR",w.AUTHENTICATION,A.MEDIUM).withContext({statusCode:t.status})}const s=await t.json();if(!s||typeof s!="object")throw new x("Invalid response from session validation service","INVALID_RESPONSE",w.AUTHENTICATION,A.MEDIUM);return s.success?(this.updateActivity(),!0):(this.logout(),!1)},{timeout:1e4,fallback:e=>(console.warn("Session validation failed, continuing with local session:",e.message),this.isValidSession()),context:{operation:"session_validation",endpoint:"validate_session"}}):!1}updateActivity(){this.lastActivity=Date.now(),this.storeAuthSession()}async logout(){v.info("User logout initiated",{category:S.AUTHENTICATION}),this.isAuthenticated=!1,this.sessionToken=null,this.sessionExpiry=null;try{await ge("auth_session",!0),await ge("auth_timestamp",!0),await ge("session_token",!0),await ge("session_expiry",!0),sessionStorage.removeItem("auth_session"),sessionStorage.removeItem("auth_timestamp"),sessionStorage.removeItem("session_token"),sessionStorage.removeItem("session_expiry"),v.info("Session data cleared during logout",{category:S.SECURITY})}catch(e){v.warn("Failed to clear some session data during logout",{category:S.SECURITY,error:e.message})}}async hashPassword(e){return b(async()=>{if(!e||typeof e!="string")throw new x("Invalid input for password hashing","INVALID_INPUT",w.VALIDATION,A.MEDIUM);if(!crypto||!crypto.subtle)throw new x("Crypto API not available","CRYPTO_UNAVAILABLE",w.SECURITY,A.HIGH);const s=new TextEncoder().encode(e),r=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(r)).map(l=>l.toString(16).padStart(2,"0")).join("")},{category:w.SECURITY,severity:A.HIGH,timeout:5e3,fallback:()=>{let t=0;for(let s=0;s<e.length;s++){const r=e.charCodeAt(s);t=(t<<5)-t+r,t&=t}return Math.abs(t).toString(16)},context:{operation:"password_hashing",inputLength:e?e.length:0}})}storeSecureSession(){return b(async()=>{if(!this.isAuthenticated||!this.sessionToken)throw new x("Cannot store session: not authenticated","NOT_AUTHENTICATED",w.AUTHENTICATION,A.LOW);if(typeof sessionStorage=="undefined")throw new x("Session storage not available","STORAGE_UNAVAILABLE",w.STORAGE,A.MEDIUM);return sessionStorage.setItem("auth_session","verified"),sessionStorage.setItem("auth_timestamp",this.lastActivity.toString()),sessionStorage.setItem("session_token",this.sessionToken),this.sessionExpiry&&sessionStorage.setItem("session_expiry",this.sessionExpiry.toISOString()),!0},{category:w.STORAGE,severity:A.LOW,timeout:1e3,fallback:e=>(console.warn("Failed to store session:",e.message),!1),context:{operation:"store_session",hasToken:!!this.sessionToken,hasExpiry:!!this.sessionExpiry}})}storeAuthSession(){this.storeSecureSession()}checkStoredSession(){try{return b(async()=>{if(typeof sessionStorage=="undefined")throw new x("Session storage not available","STORAGE_UNAVAILABLE",w.STORAGE,A.LOW);const e=await Pe("auth_session",!0),t=await Pe("auth_timestamp",!0),s=await Pe("session_token",!0),r=await Pe("session_expiry",!0);if(e==="verified"&&t&&s){if(r){const n=new Date(r);if(new Date>n)return this.logout(),!1;this.sessionExpiry=n}const i=parseInt(t);if(isNaN(i))throw new x("Invalid session timestamp","INVALID_SESSION_DATA",w.STORAGE,A.MEDIUM);return this.isAuthenticated=!0,this.sessionToken=s,this.lastActivity=i,!0}return this.logout(),!1},{category:w.STORAGE,severity:A.LOW,timeout:1e3,fallback:e=>(console.warn("Failed to check stored session:",e.message),this.logout(),!1),context:{operation:"check_stored_session"}})}catch(e){return this.logout(),!1}}setupActivityTracking(){const e=["mousedown","mousemove","keypress","scroll","touchstart"],t=()=>{this.isAuthenticated&&this.updateActivity()};e.forEach(s=>{document.addEventListener(s,t,{passive:!0})})}async delayFailedAttempt(){return b(async()=>new Promise(e=>{setTimeout(e,1e3)}),{category:w.AUTHENTICATION,severity:A.LOW,timeout:2e3,fallback:()=>Promise.resolve(),context:{operation:"auth_delay"}})}getSessionInfo(){if(!this.isAuthenticated)return{authenticated:!1};const e=this.sessionTimeout-(Date.now()-this.lastActivity),t=Math.floor(e/(60*60*1e3)),s=Math.floor(e%(60*60*1e3)/(60*1e3));return{authenticated:!0,timeRemaining:`${t}h ${s}m`,lastActivity:new Date(this.lastActivity).toLocaleTimeString()}}}const O=new ai;function ze(){const a=window.location.hash||"",e=new URLSearchParams(a.split("?")[1]||""),t=e.get("display"),s=e.get("caseId"),r=t==="kiosk"&&!!s;return console.log("[KioskLoader] Kiosk mode detection:",{hash:a,display:t,caseId:s,isKioskMode:r}),{isKioskMode:r,caseId:s}}async function ri(a){try{console.log("[KioskLoader] Fetching case data:",a);const e=await fetch(`${Q.caseSharingUrl}/get-cases`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Failed to fetch cases: ${e.status}`);const s=(await e.json()).cases.find(r=>r.id===a);if(!s)throw new Error(`Case not found: ${a}`);return console.log("[KioskLoader] Case data loaded:",s),s}catch(e){throw console.error("[KioskLoader] Failed to fetch case data:",e),e}}async function ni(a){try{const e=await ri(a);return m.setState({results:e.results,formData:e.formData||{},currentScreen:"results"}),console.log("[KioskLoader] Store populated with case data"),e}catch(e){throw console.error("[KioskLoader] Failed to load kiosk case:",e),e}}function oi(){return"https://igfap.eu/kiosk/"}function tr(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}function Ne(a){return getComputedStyle(document.documentElement).getPropertyValue(a).trim()}function li({percent:a=0,level:e="normal"}){const t=Ee.useRef(null),s=Ee.useRef(null);return Ee.useEffect(()=>{const r=t.current,i=r==null?void 0:r.parentElement;if(!i||!r)return;s.current=i;const n=()=>{const h=window.devicePixelRatio||1,d=i.offsetWidth||120;r.width=Math.max(1,Math.floor(d*h)),r.height=Math.max(1,Math.floor(d*h));const u=r.getContext("2d");u.setTransform(1,0,0,1,0,0),u.scale(h,h);const g=d,E=d,L=g/2,_=E/2,$=d/2-8,R=Math.min(Math.max($*.12,6),12),ie=Math.max(R-2,6),V=R%2===1?$-.5:$;u.clearRect(0,0,g,E);const j=document.body.classList.contains("dark-mode"),ye=Ne("--border-color")||(j?"#2f3336":"#dee2e6");u.save(),u.globalAlpha=j?.36:.65,u.strokeStyle=ye,u.lineWidth=ie,u.lineCap="round",u.beginPath(),u.arc(L,_,V,0,Math.PI*2),u.stroke(),u.restore();let F=Ne("--primary-color");e==="high"&&(F=Ne("--warning-color")||"#ff9800"),e==="critical"&&(F=Ne("--danger-color")||"#DC143C"),j&&F.includes("#")&&(e==="high"&&(F="#ffaa00"),e==="critical"&&(F="#ff1744"));const G=-Math.PI/2,X=G+Math.PI*2*(Math.max(0,Math.min(100,a))/100);u.save(),u.strokeStyle=j?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.15)",u.lineWidth=R+1.5,u.beginPath(),u.arc(L,_,V,G,X,!1),u.stroke(),u.restore(),u.strokeStyle=F,u.lineWidth=R,u.beginPath(),u.arc(L,_,V,G,X,!1),u.stroke()},l=requestAnimationFrame(n),c=new ResizeObserver(()=>requestAnimationFrame(n));return c.observe(i),()=>{cancelAnimationFrame(l),c.disconnect()}},[a,e]),se.createElement(se.Fragment,null,se.createElement("div",{className:"probability-number"},Math.round(a),se.createElement("span",null,"%")),se.createElement("canvas",{ref:t,className:"probability-canvas"}))}function ci({lvoProb:a=0,ichProb:e=0,title:t="Decision Support – LVO/ICH"}){const s=Ee.useRef(null);return Ee.useEffect(()=>{const r=s.current;if(!r)return;const i=r.getContext("2d");let n=null,l=.5;const h=Math.max(e,.5),d=a/h,E=Math.max(.5,Math.min(2,d)),L=(Math.log2(E)+1)/2,_=Math.abs(a-e),$=Math.max(a,e);let R=_<10?Math.round(30+$*.3):_<20?Math.round(50+$*.4):Math.round(70+$*.3);R=Math.max(0,Math.min(100,R));const ie=()=>{const V=window.devicePixelRatio||1,j=r.getBoundingClientRect(),ye=j.width||300,F=j.height||200;r.width=Math.max(1,Math.floor(ye*V)),r.height=Math.max(1,Math.floor(F*V)),i.setTransform(1,0,0,1,0,0),i.scale(V,V);const G=ye,X=F,W=G<480,oe=G>=480&&G<1024,ee=W?12:oe?14:16,be=15,Ie=G/2-be-ee/2,ve=X/2-be-ee/2,Xt=oe?Math.min(ve,X*.42):ve,C=Math.max(10,Math.min(Ie,Xt)),p=G/2,k=X-(be+ee/2+C);i.clearRect(0,0,G,X);const H=document.body.classList.contains("dark-mode"),tt={day:{bezel:"#e8eaed",bezelShadow:"#c1c7cd",track:"#f5f7fa",ich:"#8b1538",lvo:"#1e3a5f",neutral:"#6b7280",needle:"#d4af37",text:"#374151",tickMajor:"#4b5563",tickMinor:"#9ca3af"},night:{bezel:"#2d3036",bezelShadow:"#1a1d23",track:"#383c42",ich:"#dc2626",lvo:"#3b82f6",neutral:"#64748b",needle:"#fbbf24",text:"#f3f4f6",tickMajor:"#d1d5db",tickMinor:"#6b7280"}},P=H?tt.night:tt.day,Se=i.createLinearGradient(p-C,k-C,p+C,k+C);Se.addColorStop(0,P.bezel),Se.addColorStop(.3,P.bezelShadow),Se.addColorStop(.7,P.bezel),Se.addColorStop(1,P.bezelShadow),i.strokeStyle=Se,i.lineWidth=ee+4,i.lineCap="round",i.beginPath(),i.arc(p,k,C+2,0,Math.PI,!1),i.stroke(),i.strokeStyle=P.track,i.lineWidth=ee,i.beginPath(),i.arc(p,k,C,0,Math.PI,!1),i.stroke();const Ge=60,st=Math.PI/Ge;for(let M=0;M<Ge;M++){const D=M/(Ge-1),I=M*st,B=Math.min((M+1)*st,Math.PI);let N,ke,Qe;if(D<=.5){const he=D*2;N=Math.round(0+242*he),ke=Math.round(154+66*he),Qe=Math.round(255*(1-he))}else{const he=(D-.5)*2;N=Math.round(242+13*he),ke=Math.round(220*(1-he)),Qe=Math.round(0)}const rs=`rgba(${N}, ${ke}, ${Qe}, 0.85)`;i.strokeStyle=rs,i.lineWidth=ee-4,i.beginPath(),i.arc(p,k,C,I,B,!1),i.stroke()}const es=[.5,.75,1,1.5,2],ts=W?[]:[.6,.9,1.2,1.8];es.forEach(M=>{const D=(Math.log2(M)+1)/2,I=Math.PI-D*Math.PI,B=C-12,N=C-24;i.strokeStyle=P.tickMajor,i.lineWidth=1.5,i.lineCap="round",i.beginPath(),i.moveTo(p+Math.cos(I)*B,k+Math.sin(I)*B),i.lineTo(p+Math.cos(I)*N,k+Math.sin(I)*N),i.stroke(),i.fillStyle=P.text;const ke=W?13:15;i.font=`600 ${ke}px "SF Pro Display", system-ui, sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText(M.toFixed(1),p+Math.cos(I)*(C-35),k+Math.sin(I)*(C-35))}),ts.forEach(M=>{const D=(Math.log2(M)+1)/2,I=Math.PI-D*Math.PI,B=C-8,N=C-16;i.strokeStyle=P.tickMinor,i.lineWidth=.8,i.lineCap="round",i.beginPath(),i.moveTo(p+Math.cos(I)*B,k+Math.sin(I)*B),i.lineTo(p+Math.cos(I)*N,k+Math.sin(I)*N),i.stroke()}),[{val:.77,label:"ICH",side:"left"},{val:1.3,label:"LVO",side:"right"}].forEach(M=>{const D=(Math.log2(M.val)+1)/2,I=Math.PI-D*Math.PI,B=C-2,N=C+12;i.strokeStyle=M.side==="left"?P.ich:P.lvo,i.lineWidth=2,i.setLineDash([3,2]),i.beginPath(),i.moveTo(p+Math.cos(I)*B,k+Math.sin(I)*B),i.lineTo(p+Math.cos(I)*N,k+Math.sin(I)*N),i.stroke(),i.setLineDash([])});const ss=W?15:17,Le=W?C+35:C+42;i.fillStyle=H?"#ff4444":"#ff0000",i.font=`700 ${ss}px "SF Pro Display", system-ui, sans-serif`,i.textAlign="center",i.textBaseline="middle",H&&(i.shadowColor="rgba(0,0,0,0.8)",i.shadowBlur=3,i.shadowOffsetY=1),i.fillText("ICH",p+Math.cos(Math.PI)*Le,k+Math.sin(Math.PI)*Le-10),i.fillStyle=H?"#4499ff":"#0099ff",i.fillText("LVO",p+Math.cos(0)*Le,k+Math.sin(0)*Le-10),i.shadowBlur=0,i.shadowOffsetY=0,l+=(L-l)*.12;const ae=Math.PI-l*Math.PI,le=Math.max(0,C-ee/2-6),it=(1-R/100)*(Math.PI*.05);i.save(),i.globalAlpha=H?.2:.25,i.fillStyle=P.neutral,i.beginPath(),i.moveTo(p,k),i.arc(p,k,le*.85,ae-it,ae+it,!1),i.closePath(),i.fill(),i.restore();const Y=P.needle,is=performance.now(),Me=i.createLinearGradient(p,k,p+Math.cos(ae)*le,k+Math.sin(ae)*le);Me.addColorStop(0,Y+"ff"),Me.addColorStop(.7,Y+"dd"),Me.addColorStop(1,Y+"bb"),i.strokeStyle=Me,i.lineWidth=2.5,i.lineCap="round",i.shadowColor=H?"rgba(0,0,0,0.8)":"rgba(0,0,0,0.3)",i.shadowBlur=4,i.shadowOffsetY=2,i.beginPath(),i.moveTo(p,k),i.lineTo(p+Math.cos(ae)*le,k+Math.sin(ae)*le),i.stroke(),i.shadowBlur=0,i.shadowOffsetY=0;const We=p+Math.cos(ae)*le,Ke=k+Math.sin(ae)*le,Re=.6+.4*Math.sin(is*.006),qe=3+Re*2;i.save(),i.globalAlpha=.15+Re*.25,i.fillStyle=Y,i.beginPath(),i.arc(We,Ke,qe*3.5,0,Math.PI*2),i.fill(),i.restore(),i.save(),i.globalAlpha=.4+Re*.3,i.fillStyle=Y,i.beginPath(),i.arc(We,Ke,qe*1.8,0,Math.PI*2),i.fill(),i.restore(),i.fillStyle=Y,i.shadowColor=Y,i.shadowBlur=4+Re*6,i.beginPath(),i.arc(We,Ke,qe,0,Math.PI*2),i.fill(),i.shadowBlur=0;const je=14,at=8,_e=i.createRadialGradient(p,k,0,p,k,je);_e.addColorStop(0,H?"#4a5568":"#718096"),_e.addColorStop(.7,H?"#2d3748":"#4a5568"),_e.addColorStop(1,H?"#1a202c":"#2d3748"),i.fillStyle=_e,i.beginPath(),i.arc(p,k,je,0,Math.PI*2),i.fill();const Ye=i.createRadialGradient(p,k,0,p,k,at);Ye.addColorStop(0,Y+"aa"),Ye.addColorStop(1,Y+"44"),i.fillStyle=Ye,i.beginPath(),i.arc(p,k,at,0,Math.PI*2),i.fill(),i.strokeStyle=Y,i.lineWidth=1,i.beginPath(),i.arc(p,k,je-1,0,Math.PI*2),i.stroke();const as=W?18:22,rt=k-C*.65,nt=W?60:80,ot=W?24:30;if(i.save(),i.globalAlpha=H?.9:.95,i.fillStyle=H?"#1f2937":"#ffffff",i.shadowColor=H?"rgba(0,0,0,0.5)":"rgba(0,0,0,0.2)",i.shadowBlur=8,i.shadowOffsetY=2,i.fillRect(p-nt/2,rt-ot/2,nt,ot),i.restore(),i.fillStyle=P.text,i.font=`700 ${as}px "SF Mono", ui-monospace, monospace`,i.textAlign="center",i.textBaseline="middle",i.fillText(E.toFixed(2),p,rt),!W){const M=k+C*.15,D=60,I=4;i.fillStyle=H?"#374151":"#e5e7eb",i.fillRect(p-D/2,M,D,I);const B=R/100*D,N=i.createLinearGradient(p-D/2,M,p-D/2+B,M);N.addColorStop(0,P.neutral),N.addColorStop(1,P.needle),i.fillStyle=N,i.fillRect(p-D/2,M,B,I),i.fillStyle=P.text,i.font='500 11px "SF Pro Display", system-ui, sans-serif',i.textAlign="center",i.fillText(`${R}% confidence`,p,M+18)}n=requestAnimationFrame(ie)};return ie(),()=>{n&&cancelAnimationFrame(n)}},[a,e]),se.createElement("div",{className:"gauge-wrapper"},se.createElement("canvas",{ref:s,className:"gauge-canvas"}))}function di(){document.querySelectorAll("[data-react-ring]").forEach(a=>{if(a.__mounted)return;const e=parseFloat(a.getAttribute("data-percent"))||0,t=a.getAttribute("data-level")||"normal",s=ht(a);s.render(se.createElement(li,{percent:e,level:t})),a.__mounted=!0,a.__root=s}),document.querySelectorAll("[data-react-tachometer]").forEach(a=>{if(a.__mounted)return;const e=parseFloat(a.getAttribute("data-ich"))||0,t=parseFloat(a.getAttribute("data-lvo"))||0,s=a.getAttribute("data-title")||"Decision Support – LVO/ICH",r=ht(a);r.render(se.createElement(ci,{ichProb:e,lvoProb:t,title:s})),a.__mounted=!0,a.__root=r})}function ue(a){const e=[{id:1,label:"Triage"},{id:2,label:"Assessment"},{id:3,label:"Results"}];let t='<div class="progress-indicator">';return e.forEach((s,r)=>{const i=s.id===a,n=s.id<a;t+=`
      <div class="progress-step ${i?"active":""} ${n?"completed":""}">
        ${n?"":s.id}
      </div>
    `,r<e.length-1&&(t+=`<div class="progress-line ${n?"completed":""}"></div>`)}),t+="</div>",t}function vt(){return`
    <div class="container">
      ${ue(1)}
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
  `}function ui(){return`
    <div class="container">
      ${ue(1)}
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
  `}function hi(){return`
    <div class="container">
      ${ue(2)}
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
            <input type="number" id="gfap_value" name="gfap_value" min="${K.min}" max="${K.max}" step="0.1" required aria-describedby="gfap-help">
            <div id="gfap-help" class="input-help">
              ${o("gfapRange").replace("{min}",K.min).replace("{max}",K.max)}
            </div>
          </div>
        </div>
        <button type="submit" class="primary">${o("analyzeIchRisk")}</button>
        <button type="button" class="secondary" data-action="reset">${o("startOver")}</button>
      </form>
    </div>
  `}function mi(){return`
    <div class="container">
      ${ue(2)}
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
              <input type="number" name="gfap_value" id="gfap_value" min="${K.min}" max="${K.max}" step="0.1" required inputmode="decimal">
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
  `}function gi(){return`
    <div class="container">
      ${ue(2)}
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
              <input type="number" name="gfap_value" id="gfap_value" min="${K.min}" max="${K.max}" step="0.1" required inputmode="decimal">
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
  `}function Bt(){return`
    <div class="critical-alert">
      <h4><span class="alert-icon">🚨</span> ${o("criticalAlertTitle")}</h4>
      <p>${o("criticalAlertMessage")}</p>
    </div>
  `}const pi={age_years:"ageLabel",age:"ageLabel",systolic_bp:"systolicLabel",diastolic_bp:"diastolicLabel",systolic_blood_pressure:"systolicLabel",diastolic_blood_pressure:"diastolicLabel",blood_pressure_systolic:"systolicLabel",blood_pressure_diastolic:"diastolicLabel",gfap_value:"gfapLabel",gfap:"gfapLabel",gfap_level:"gfapLabel",fast_ed_score:"fastEdLabel",fast_ed:"fastEdLabel",fast_ed_total:"fastEdLabel",vigilanzminderung:"vigilanzLabel",vigilance_reduction:"vigilanzLabel",reduced_consciousness:"vigilanzLabel",armparese:"armPareseLabel",arm_paresis:"armPareseLabel",arm_weakness:"armPareseLabel",beinparese:"beinPareseLabel",leg_paresis:"beinPareseLabel",leg_weakness:"beinPareseLabel",eye_deviation:"eyeDeviationLabel",blickdeviation:"eyeDeviationLabel",headache:"headacheLabel",kopfschmerzen:"headacheLabel",atrial_fibrillation:"atrialFibLabel",vorhofflimmern:"atrialFibLabel",anticoagulated_noak:"anticoagLabel",anticoagulation:"anticoagLabel",antiplatelets:"antiplateletsLabel",thrombozytenaggregationshemmer:"antiplateletsLabel"},fi=[{pattern:/_score$/,replacement:" Score"},{pattern:/_value$/,replacement:" Level"},{pattern:/_bp$/,replacement:" Blood Pressure"},{pattern:/_years?$/,replacement:" (years)"},{pattern:/^ich_/,replacement:"Brain Bleeding "},{pattern:/^lvo_/,replacement:"Large Vessel "},{pattern:/parese$/,replacement:"Weakness"},{pattern:/deviation$/,replacement:"Movement"}];function Be(a){if(!a)return"";const e=pi[a.toLowerCase()];if(e){const s=o(e);if(s&&s!==e)return s}let t=a.toLowerCase();return fi.forEach(({pattern:s,replacement:r})=>{t=t.replace(s,r)}),t=t.replace(/_/g," ").replace(/\b\w/g,s=>s.toUpperCase()).trim(),t}function yi(a){return Be(a).replace(/\s*\([^)]*\)\s*/g,"").trim()}function bi(a,e=""){return a==null||a===""?"":typeof a=="boolean"?a?"✓":"✗":typeof a=="number"?e.includes("bp")||e.includes("blood_pressure")?`${a} mmHg`:e.includes("gfap")?`${a} pg/mL`:e.includes("age")?`${a} years`:e.includes("score")||Number.isInteger(a)?a.toString():a.toFixed(1):a.toString()}function vi(a,e){if(!(a!=null&&a.drivers)&&!(e!=null&&e.drivers))return"";let t=`
    <div class="drivers-section">
      <div class="drivers-header">
        <h3><span class="driver-header-icon">🎯</span> ${o("riskAnalysis")}</h3>
        <p class="drivers-subtitle">${o("riskAnalysisSubtitle")}</p>
      </div>
      <div class="enhanced-drivers-grid">
  `;return console.log("[Drivers] ICH has drivers:",!!(a!=null&&a.drivers),a==null?void 0:a.drivers),console.log("[Drivers] LVO has drivers:",!!(e!=null&&e.drivers),"notPossible:",e==null?void 0:e.notPossible,e==null?void 0:e.drivers),a!=null&&a.drivers&&(console.log("🧠 Rendering ICH drivers panel"),t+=St(a.drivers,"ICH","ich",a.probability)),e!=null&&e.drivers&&!e.notPossible&&(console.log("🩸 Rendering LVO drivers panel"),t+=St(e.drivers,"LVO","lvo",e.probability)),t+=`
      </div>
    </div>
  `,t}function St(a,e,t,s){if(!a||Object.keys(a).length===0)return`
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
    `;const r=a;if(r.kind==="unavailable")return`
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
    `;const i=(r.positive||[]).sort((u,g)=>Math.abs(g.weight)-Math.abs(u.weight)).slice(0,3),n=(r.negative||[]).sort((u,g)=>Math.abs(g.weight)-Math.abs(u.weight)).slice(0,3),l=Math.max(...i.map(u=>Math.abs(u.weight)),...n.map(u=>Math.abs(u.weight)),.01);console.log(`[Drivers] ${t} maxWeight:`,l),console.log(`[Drivers] ${t} positive:`,i.map(u=>`${u.label}: ${u.weight}`)),console.log(`[Drivers] ${t} negative:`,n.map(u=>`${u.label}: ${u.weight}`)),console.log(`[Drivers] ${t} positive weights:`,i.map(u=>Math.abs(u.weight))),console.log(`[Drivers] ${t} negative weights:`,n.map(u=>Math.abs(u.weight)));let c=`
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
  `;const h=i.reduce((u,g)=>u+Math.abs(g.weight),0);i.length>0?i.forEach((u,g)=>{const E=h>0?Math.abs(u.weight)/h*100:0,L=Math.abs(u.weight)/l*100;console.log(`[Drivers] ${t} positive driver "${u.label}": weight=${Math.abs(u.weight)}, relativeImportance=${E.toFixed(1)}%, barWidth=${L}%`);const _=Be(u.label);c+=`
        <div class="compact-driver-item">
          <div class="compact-driver-label">${_}</div>
          <div class="compact-driver-bar positive" style="width: ${L}%">
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
  `;const d=n.reduce((u,g)=>u+Math.abs(g.weight),0);return n.length>0?n.forEach((u,g)=>{const E=d>0?Math.abs(u.weight)/d*100:0,L=Math.abs(u.weight)/l*100;console.log(`[Drivers] ${t} negative driver "${u.label}": weight=${Math.abs(u.weight)}, relativeImportance=${E.toFixed(1)}%, barWidth=${L}%`);const _=Be(u.label);c+=`
        <div class="compact-driver-item">
          <div class="compact-driver-label">${_}</div>
          <div class="compact-driver-bar negative" style="width: ${L}%">
            <span class="compact-driver-value">-${E.toFixed(0)}%</span>
          </div>
        </div>
      `}):c+=`<div class="no-factors">${o("noNegativeFactors")}</div>`,c+=`
          </div>
        </div>
      </div>
    </div>
  `,c}const zt={bayern:{neurosurgicalCenters:[{id:"BY-NS-001",name:"LMU Klinikum München - Großhadern",address:"Marchioninistraße 15, 81377 München",coordinates:{lat:48.1106,lng:11.4684},phone:"+49 89 4400-0",emergency:"+49 89 4400-73331",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1440,network:"TEMPiS"},{id:"BY-NS-002",name:"Klinikum rechts der Isar München (TUM)",address:"Ismaninger Str. 22, 81675 München",coordinates:{lat:48.1497,lng:11.6052},phone:"+49 89 4140-0",emergency:"+49 89 4140-2249",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1161,network:"TEMPiS"},{id:"BY-NS-003",name:"Städtisches Klinikum München Schwabing",address:"Kölner Platz 1, 80804 München",coordinates:{lat:48.1732,lng:11.5755},phone:"+49 89 3068-0",emergency:"+49 89 3068-2050",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:648,network:"TEMPiS"},{id:"BY-NS-004",name:"Städtisches Klinikum München Bogenhausen",address:"Englschalkinger Str. 77, 81925 München",coordinates:{lat:48.1614,lng:11.6254},phone:"+49 89 9270-0",emergency:"+49 89 9270-2050",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:689,network:"TEMPiS"},{id:"BY-NS-005",name:"Universitätsklinikum Erlangen",address:"Maximiliansplatz 2, 91054 Erlangen",coordinates:{lat:49.5982,lng:11.0037},phone:"+49 9131 85-0",emergency:"+49 9131 85-39003",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1371,network:"TEMPiS"},{id:"BY-NS-006",name:"Universitätsklinikum Regensburg",address:"Franz-Josef-Strauß-Allee 11, 93053 Regensburg",coordinates:{lat:49.0134,lng:12.0991},phone:"+49 941 944-0",emergency:"+49 941 944-7501",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1042,network:"TEMPiS"},{id:"BY-NS-007",name:"Universitätsklinikum Würzburg",address:"Oberdürrbacher Str. 6, 97080 Würzburg",coordinates:{lat:49.784,lng:9.9721},phone:"+49 931 201-0",emergency:"+49 931 201-24444",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1264,network:"TEMPiS"},{id:"BY-NS-008",name:"Klinikum Nürnberg Nord",address:"Prof.-Ernst-Nathan-Str. 1, 90419 Nürnberg",coordinates:{lat:49.4521,lng:11.0767},phone:"+49 911 398-0",emergency:"+49 911 398-2369",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1368,network:"TEMPiS"},{id:"BY-NS-009",name:"Universitätsklinikum Augsburg",address:"Stenglinstr. 2, 86156 Augsburg",coordinates:{lat:48.3668,lng:10.9093},phone:"+49 821 400-01",emergency:"+49 821 400-2356",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1740,network:"TEMPiS"},{id:"BY-NS-010",name:"Klinikum Aschaffenburg-Alzenau",address:"Am Hasenkopf 1, 63739 Aschaffenburg",coordinates:{lat:49.9737,lng:9.157},phone:"+49 6021 32-0",emergency:"+49 6021 32-2800",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:40,network:"TRANSIT"},{id:"BY-NS-011",name:"Klinikum Landshut",address:"Robert-Koch-Str. 1, 84034 Landshut",coordinates:{lat:48.5665,lng:12.1512},phone:"+49 871 698-0",emergency:"+49 871 698-3333",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:505,network:"TEMPiS"},{id:"BY-NS-012",name:"Klinikum Coburg",address:"Ketschendorfer Str. 33, 96450 Coburg",coordinates:{lat:50.2596,lng:10.9644},phone:"+49 9561 22-0",emergency:"+49 9561 22-6800",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:547,network:"STENO"},{id:"BY-NS-013",name:"Klinikum Passau",address:"Bischof-Pilgrim-Str. 1, 94032 Passau",coordinates:{lat:48.5665,lng:13.4777},phone:"+49 851 5300-0",emergency:"+49 851 5300-2222",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:696,network:"TEMPiS"}],comprehensiveStrokeCenters:[{id:"BY-CS-001",name:"Klinikum Bamberg",address:"Buger Str. 80, 96049 Bamberg",coordinates:{lat:49.8988,lng:10.9027},phone:"+49 951 503-0",emergency:"+49 951 503-11101",thrombectomy:!0,thrombolysis:!0,beds:630,network:"TEMPiS"},{id:"BY-CS-002",name:"Klinikum Bayreuth",address:"Preuschwitzer Str. 101, 95445 Bayreuth",coordinates:{lat:49.9459,lng:11.5779},phone:"+49 921 400-0",emergency:"+49 921 400-5401",thrombectomy:!0,thrombolysis:!0,beds:848,network:"TEMPiS"},{id:"BY-CS-003",name:"Klinikum Coburg",address:"Ketschendorfer Str. 33, 96450 Coburg",coordinates:{lat:50.2596,lng:10.9685},phone:"+49 9561 22-0",emergency:"+49 9561 22-6300",thrombectomy:!0,thrombolysis:!0,beds:522,network:"TEMPiS"}],regionalStrokeUnits:[{id:"BY-RSU-001",name:"Goldberg-Klinik Kelheim",address:"Traubenweg 3, 93309 Kelheim",coordinates:{lat:48.9166,lng:11.8742},phone:"+49 9441 702-0",emergency:"+49 9441 702-6800",thrombolysis:!0,beds:200,network:"TEMPiS"},{id:"BY-RSU-002",name:"DONAUISAR Klinikum Deggendorf",address:"Perlasberger Str. 41, 94469 Deggendorf",coordinates:{lat:48.8372,lng:12.9619},phone:"+49 991 380-0",emergency:"+49 991 380-2201",thrombolysis:!0,beds:450,network:"TEMPiS"},{id:"BY-RSU-003",name:"Klinikum St. Elisabeth Straubing",address:"St.-Elisabeth-Str. 23, 94315 Straubing",coordinates:{lat:48.8742,lng:12.5733},phone:"+49 9421 710-0",emergency:"+49 9421 710-2000",thrombolysis:!0,beds:580,network:"TEMPiS"},{id:"BY-RSU-004",name:"Klinikum Freising",address:"Mainburger Str. 29, 85356 Freising",coordinates:{lat:48.4142,lng:11.7461},phone:"+49 8161 24-0",emergency:"+49 8161 24-2800",thrombolysis:!0,beds:380,network:"TEMPiS"},{id:"BY-RSU-005",name:"Klinikum Landkreis Erding",address:"Bajuwarenstr. 5, 85435 Erding",coordinates:{lat:48.3061,lng:11.9067},phone:"+49 8122 59-0",emergency:"+49 8122 59-2201",thrombolysis:!0,beds:350,network:"TEMPiS"},{id:"BY-RSU-006",name:"Helios Amper-Klinikum Dachau",address:"Krankenhausstr. 15, 85221 Dachau",coordinates:{lat:48.2599,lng:11.4342},phone:"+49 8131 76-0",emergency:"+49 8131 76-2201",thrombolysis:!0,beds:480,network:"TEMPiS"},{id:"BY-RSU-007",name:"Klinikum Fürstenfeldbruck",address:"Dachauer Str. 33, 82256 Fürstenfeldbruck",coordinates:{lat:48.1772,lng:11.2578},phone:"+49 8141 99-0",emergency:"+49 8141 99-2201",thrombolysis:!0,beds:420,network:"TEMPiS"},{id:"BY-RSU-008",name:"Klinikum Ingolstadt",address:"Krumenauerstraße 25, 85049 Ingolstadt",coordinates:{lat:48.7665,lng:11.4364},phone:"+49 841 880-0",emergency:"+49 841 880-2201",thrombolysis:!0,beds:665,network:"TEMPiS"},{id:"BY-RSU-009",name:"Klinikum Passau",address:"Bischof-Pilgrim-Str. 1, 94032 Passau",coordinates:{lat:48.5665,lng:13.4513},phone:"+49 851 5300-0",emergency:"+49 851 5300-2100",thrombolysis:!0,beds:540,network:"TEMPiS"},{id:"BY-RSU-010",name:"Klinikum Landshut",address:"Robert-Koch-Str. 1, 84034 Landshut",coordinates:{lat:48.5436,lng:12.1619},phone:"+49 871 698-0",emergency:"+49 871 698-3333",thrombolysis:!0,beds:790,network:"TEMPiS"},{id:"BY-RSU-011",name:"RoMed Klinikum Rosenheim",address:"Pettenkoferstr. 10, 83022 Rosenheim",coordinates:{lat:47.8567,lng:12.1265},phone:"+49 8031 365-0",emergency:"+49 8031 365-3711",thrombolysis:!0,beds:870,network:"TEMPiS"},{id:"BY-RSU-012",name:"Klinikum Memmingen",address:"Bismarckstr. 23, 87700 Memmingen",coordinates:{lat:47.9833,lng:10.1833},phone:"+49 8331 70-0",emergency:"+49 8331 70-2500",thrombolysis:!0,beds:520,network:"TEMPiS"},{id:"BY-RSU-013",name:"Klinikum Kempten-Oberallgäu",address:"Robert-Weixler-Str. 50, 87439 Kempten",coordinates:{lat:47.7261,lng:10.3097},phone:"+49 831 530-0",emergency:"+49 831 530-2201",thrombolysis:!0,beds:650,network:"TEMPiS"},{id:"BY-RSU-014",name:"Klinikum Aschaffenburg-Alzenau",address:"Am Hasenkopf 1, 63739 Aschaffenburg",coordinates:{lat:49.9747,lng:9.1581},phone:"+49 6021 32-0",emergency:"+49 6021 32-2700",thrombolysis:!0,beds:590,network:"TEMPiS"}],thrombolysisHospitals:[{id:"BY-TH-001",name:"Krankenhaus Vilsbiburg",address:"Sonnenstraße 10, 84137 Vilsbiburg",coordinates:{lat:48.6333,lng:12.2833},phone:"+49 8741 60-0",thrombolysis:!0,beds:180},{id:"BY-TH-002",name:"Krankenhaus Eggenfelden",address:"Pfarrkirchener Str. 5, 84307 Eggenfelden",coordinates:{lat:48.4,lng:12.7667},phone:"+49 8721 98-0",thrombolysis:!0,beds:220}]},badenWuerttemberg:{neurosurgicalCenters:[{id:"BW-NS-001",name:"Universitätsklinikum Freiburg",address:"Hugstetter Str. 55, 79106 Freiburg",coordinates:{lat:48.0025,lng:7.8347},phone:"+49 761 270-0",emergency:"+49 761 270-34010",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1600,network:"FAST"},{id:"BW-NS-002",name:"Universitätsklinikum Heidelberg",address:"Im Neuenheimer Feld 400, 69120 Heidelberg",coordinates:{lat:49.4178,lng:8.6706},phone:"+49 6221 56-0",emergency:"+49 6221 56-36643",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1621,network:"FAST"},{id:"BW-NS-003",name:"Universitätsklinikum Tübingen",address:"Geissweg 3, 72076 Tübingen",coordinates:{lat:48.5378,lng:9.0538},phone:"+49 7071 29-0",emergency:"+49 7071 29-82211",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1550,network:"FAST"},{id:"BW-NS-004",name:"Universitätsklinikum Ulm",address:"Albert-Einstein-Allee 23, 89081 Ulm",coordinates:{lat:48.4196,lng:9.9592},phone:"+49 731 500-0",emergency:"+49 731 500-63001",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1264,network:"FAST"},{id:"BW-NS-005",name:"Klinikum Stuttgart - Katharinenhospital",address:"Kriegsbergstraße 60, 70174 Stuttgart",coordinates:{lat:48.7784,lng:9.1682},phone:"+49 711 278-0",emergency:"+49 711 278-32001",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:950,network:"FAST"},{id:"BW-NS-006",name:"Städtisches Klinikum Karlsruhe",address:"Moltkestraße 90, 76133 Karlsruhe",coordinates:{lat:49.0047,lng:8.3858},phone:"+49 721 974-0",emergency:"+49 721 974-2301",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1570,network:"FAST"},{id:"BW-NS-007",name:"Klinikum Ludwigsburg",address:"Posilipostraße 4, 71640 Ludwigsburg",coordinates:{lat:48.8901,lng:9.1953},phone:"+49 7141 99-0",emergency:"+49 7141 99-67201",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:720,network:"FAST"}],comprehensiveStrokeCenters:[{id:"BW-CS-001",name:"Universitätsmedizin Mannheim",address:"Theodor-Kutzer-Ufer 1-3, 68167 Mannheim",coordinates:{lat:49.4828,lng:8.4664},phone:"+49 621 383-0",emergency:"+49 621 383-2251",thrombectomy:!0,thrombolysis:!0,beds:1400,network:"FAST"}],regionalStrokeUnits:[{id:"BW-RSU-001",name:"Robert-Bosch-Krankenhaus Stuttgart",address:"Auerbachstraße 110, 70376 Stuttgart",coordinates:{lat:48.7447,lng:9.2294},phone:"+49 711 8101-0",emergency:"+49 711 8101-3456",thrombolysis:!0,beds:850,network:"FAST"}],thrombolysisHospitals:[]},nordrheinWestfalen:{neurosurgicalCenters:[{id:"NRW-NS-001",name:"Universitätsklinikum Düsseldorf",address:"Moorenstraße 5, 40225 Düsseldorf",coordinates:{lat:51.1906,lng:6.8064},phone:"+49 211 81-0",emergency:"+49 211 81-17700",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1300,network:"NEVANO+"},{id:"NRW-NS-002",name:"Universitätsklinikum Köln",address:"Kerpener Str. 62, 50937 Köln",coordinates:{lat:50.9253,lng:6.9187},phone:"+49 221 478-0",emergency:"+49 221 478-32500",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1500,network:"NEVANO+"},{id:"NRW-NS-003",name:"Universitätsklinikum Essen",address:"Hufelandstraße 55, 45147 Essen",coordinates:{lat:51.4285,lng:7.0073},phone:"+49 201 723-0",emergency:"+49 201 723-84444",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1350,network:"NEVANO+"},{id:"NRW-NS-004",name:"Universitätsklinikum Münster",address:"Albert-Schweitzer-Campus 1, 48149 Münster",coordinates:{lat:51.9607,lng:7.6261},phone:"+49 251 83-0",emergency:"+49 251 83-47255",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1513,network:"NEVANO+"},{id:"NRW-NS-005",name:"Universitätsklinikum Bonn",address:"Venusberg-Campus 1, 53127 Bonn",coordinates:{lat:50.6916,lng:7.1127},phone:"+49 228 287-0",emergency:"+49 228 287-15107",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1200,network:"NEVANO+"},{id:"NRW-NS-006",name:"Klinikum Dortmund",address:"Beurhausstraße 40, 44137 Dortmund",coordinates:{lat:51.5036,lng:7.4663},phone:"+49 231 953-0",emergency:"+49 231 953-20050",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:1200,network:"NVNR"},{id:"NRW-NS-007",name:"Rhein-Maas Klinikum Würselen",address:"Mauerfeldstraße 25, 52146 Würselen",coordinates:{lat:50.8178,lng:6.1264},phone:"+49 2405 62-0",emergency:"+49 2405 62-2222",neurosurgery:!0,thrombectomy:!0,thrombolysis:!0,beds:420,network:"NEVANO+"}],comprehensiveStrokeCenters:[{id:"NRW-CS-001",name:"Universitätsklinikum Aachen",address:"Pauwelsstraße 30, 52074 Aachen",coordinates:{lat:50.778,lng:6.0614},phone:"+49 241 80-0",emergency:"+49 241 80-89611",thrombectomy:!0,thrombolysis:!0,beds:1400,network:"NEVANO+"}],regionalStrokeUnits:[{id:"NRW-RSU-001",name:"Helios Universitätsklinikum Wuppertal",address:"Heusnerstraße 40, 42283 Wuppertal",coordinates:{lat:51.2467,lng:7.1703},phone:"+49 202 896-0",emergency:"+49 202 896-2180",thrombolysis:!0,beds:1050,network:"NEVANO+"}],thrombolysisHospitals:[{id:"NRW-TH-009",name:"Elisabeth-Krankenhaus Essen",address:"Klara-Kopp-Weg 1, 45138 Essen",coordinates:{lat:51.4495,lng:7.0137},phone:"+49 201 897-0",thrombolysis:!0,beds:583},{id:"NRW-TH-010",name:"Klinikum Oberberg Gummersbach",address:"Wilhelm-Breckow-Allee 20, 51643 Gummersbach",coordinates:{lat:51.0277,lng:7.5694},phone:"+49 2261 17-0",thrombolysis:!0,beds:431},{id:"NRW-TH-011",name:"St. Vincenz-Krankenhaus Limburg",address:"Auf dem Schafsberg, 65549 Limburg",coordinates:{lat:50.3856,lng:8.0584},phone:"+49 6431 292-0",thrombolysis:!0,beds:452},{id:"NRW-TH-012",name:"Klinikum Lüdenscheid",address:"Paulmannshöher Straße 14, 58515 Lüdenscheid",coordinates:{lat:51.2186,lng:7.6298},phone:"+49 2351 46-0",thrombolysis:!0,beds:869}]}},sr={routePatient(a){const{location:e,state:t,ichProbability:s,timeFromOnset:r,clinicalFactors:i}=a,n=t||this.detectState(e),l=zt[n];if(s>=.5){const h=this.findNearest(e,l.neurosurgicalCenters);if(!h)throw new Error(`No neurosurgical centers available in ${n}`);return{category:"NEUROSURGICAL_CENTER",destination:h,urgency:"IMMEDIATE",reasoning:"High bleeding probability (≥50%) - neurosurgical evaluation required",preAlert:"Activate neurosurgery team",bypassLocal:!0,threshold:"≥50%",state:n}}if(s>=.3){const h=[...l.neurosurgicalCenters,...l.comprehensiveStrokeCenters];return{category:"COMPREHENSIVE_CENTER",destination:this.findNearest(e,h),urgency:"URGENT",reasoning:"Intermediate bleeding risk (30-50%) - CT and possible intervention",preAlert:"Prepare for possible neurosurgical consultation",transferPlan:this.findNearest(e,l.neurosurgicalCenters),threshold:"30-50%",state:n}}if(r&&r<=270){const h=[...l.neurosurgicalCenters,...l.comprehensiveStrokeCenters,...l.regionalStrokeUnits,...l.thrombolysisHospitals];return{category:"THROMBOLYSIS_CAPABLE",destination:this.findNearest(e,h),urgency:"TIME_CRITICAL",reasoning:"Low bleeding risk (<30%), within tPA window - nearest thrombolysis",preAlert:"Prepare for thrombolysis protocol",bypassLocal:!1,threshold:"<30%",timeWindow:"≤4.5h",state:n}}const c=[...l.neurosurgicalCenters,...l.comprehensiveStrokeCenters,...l.regionalStrokeUnits];return{category:"STROKE_UNIT",destination:this.findNearest(e,c),urgency:"STANDARD",reasoning:r>270?"Low bleeding risk, outside tPA window - standard stroke evaluation":"Low bleeding risk - standard stroke evaluation",preAlert:"Standard stroke protocol",bypassLocal:!1,threshold:"<30%",timeWindow:r?">4.5h":"unknown",state:n}},detectState(a){return a.lat>=47.5&&a.lat<=49.8&&a.lng>=7.5&&a.lng<=10.2?"badenWuerttemberg":a.lat>=50.3&&a.lat<=52.5&&a.lng>=5.9&&a.lng<=9.5?"nordrheinWestfalen":a.lat>=47.2&&a.lat<=50.6&&a.lng>=10.2&&a.lng<=13.8?"bayern":this.findNearestState(a)},findNearestState(a){const e={bayern:{lat:49,lng:11.5},badenWuerttemberg:{lat:48.5,lng:9},nordrheinWestfalen:{lat:51.5,lng:7.5}};let t="bayern",s=1/0;for(const[r,i]of Object.entries(e)){const n=this.calculateDistance(a,i);n<s&&(s=n,t=r)}return t},findNearest(a,e){return!e||e.length===0?null:e.map(t=>!t.coordinates||typeof t.coordinates.lat!="number"?null:{...t,distance:this.calculateDistance(a,t.coordinates)}).filter(t=>t!==null).sort((t,s)=>t.distance-s.distance)[0]},calculateDistance(a,e){const s=this.toRad(e.lat-a.lat),r=this.toRad(e.lng-a.lng),i=Math.sin(s/2)*Math.sin(s/2)+Math.cos(this.toRad(a.lat))*Math.cos(this.toRad(e.lat))*Math.sin(r/2)*Math.sin(r/2);return 6371*(2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)))},toRad(a){return a*(Math.PI/180)}};function Ut(a,e,t,s){const i=xe(t-a),n=xe(s-e),l=Math.sin(i/2)*Math.sin(i/2)+Math.cos(xe(a))*Math.cos(xe(t))*Math.sin(n/2)*Math.sin(n/2);return 6371*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))}function xe(a){return a*(Math.PI/180)}async function Si(a,e,t,s,r="driving-car"){try{const i=`https://api.openrouteservice.org/v2/directions/${r}`,l=await fetch(i,{method:"POST",headers:{Accept:"application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",Authorization:"5b3ce3597851110001cf624868c4c27b63ae476c9c26c8bffbc35688","Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({coordinates:[[e,a],[s,t]],radiuses:[1e3,1e3],format:"json"})});if(!l.ok)throw new Error(`Routing API error: ${l.status}`);const c=await l.json();if(c.routes&&c.routes.length>0){const h=c.routes[0];return{duration:Math.round(h.summary.duration/60),distance:Math.round(h.summary.distance/1e3),source:"routing"}}throw new Error("No route found")}catch(i){let n="estimated";i.name==="TypeError"&&i.message.includes("Failed to fetch")?(console.info("[TravelTime] OpenRouteService blocked by CORS, using distance estimation"),n="cors-fallback"):i.message.includes("signal")?(console.info("[TravelTime] OpenRouteService timeout, using distance estimation"),n="timeout-fallback"):(console.info("[TravelTime] OpenRouteService error, using distance estimation:",i.message),n="error-fallback");const l=Ut(a,e,t,s);return{duration:Math.round(l/.8),distance:Math.round(l),source:n}}}async function ir(a,e,t,s){try{const r=await Si(a,e,t,s,"driving-car");return{duration:Math.round(r.duration*.75),distance:r.distance,source:r.source==="routing"?"emergency-routing":"emergency-estimated"}}catch(r){const i=Ut(a,e,t,s);return{duration:Math.round(i/1.2),distance:Math.round(i),source:"emergency-estimated"}}}function ki(a,e){const t=Number(a),s=Ft[e];return t>=s.high?"🔴 HIGH RISK":t>=s.medium?"🟡 MEDIUM RISK":"🟢 LOW RISK"}function Vt(){const a=m.getState(),{formData:e}=a;if(!e||Object.keys(e).length===0)return"";let t="";return Object.entries(e).forEach(([s,r])=>{if(r&&Object.keys(r).length>0){const i=o(`${s}ModuleTitle`)||s.charAt(0).toUpperCase()+s.slice(1);let n="";Object.entries(r).forEach(([l,c])=>{if(c===""||c===null||c===void 0)return;const h=yi(l),d=bi(c,l);n+=`
          <div class="summary-item">
            <span class="summary-label">${h}:</span>
            <span class="summary-value">${d}</span>
          </div>
        `}),n&&(t+=`
          <div class="summary-module">
            <h4>${i}</h4>
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
  `:""}function Xe(a,e,t){if(!e)return console.log(`[RiskCard] No data for ${a}`),"";const s=Math.round((e.probability||0)*100);console.log(`[RiskCard] ${a} - probability: ${e.probability}, percent: ${s}%`);const r=ki(s,a),i=s>70,n=s>Ft[a].high,l={ich:"🩸",lvo:"🧠"},c={ich:o("ichProbability"),lvo:o("lvoProbability")},h=i?"critical":n?"high":"normal",d=h==="critical"?"#ff4444":h==="high"?"#ff8800":"#0066cc",u=Math.PI*100,g=u*(1-s/100);return`
    <div class="enhanced-risk-card ${a} ${h}">
      <div class="risk-header">
        <div class="risk-icon">${l[a]}</div>
        <div class="risk-title">
          <h3>${c[a]}</h3>
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
                    stroke="${d}"
                    stroke-width="8"
                    stroke-dasharray="${u}"
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
              <div class="circle-label">${o(a==="ich"?"ichRisk":"lvoRisk")}</div>
            </div>
          </div>
          <div class="risk-level ${h}">${r}</div>
        </div>

        <div class="risk-assessment"></div>
      </div>
    </div>
  `}function wi(a){const e=a.gfap_value||et();if(!e||e<=0)return"";const t=Dt(e);return`
    <div class="volume-display-container">
      ${fs(t)}
    </div>
  `}function et(){var t;const a=m.getState(),{formData:e}=a;for(const s of["coma","limited","full"])if((t=e[s])!=null&&t.gfap_value)return parseFloat(e[s].gfap_value);return 0}function kt(a,e){var t;try{if(!a)return console.error("renderResults: No results data provided"),`
        <div class="container">
          <div class="error-message">
            <h2>No Results Available</h2>
            <p>Please complete an assessment first.</p>
            <button class="primary" data-action="reload">Start Over</button>
          </div>
        </div>
      `;const{ich:s,lvo:r}=a,i=Li(s),n=i!=="coma"?Ci(a):null;n&&Ae(i)&&hs(s,n,Ue());const l=(s==null?void 0:s.module)==="Limited"||(s==null?void 0:s.module)==="Coma"||(r==null?void 0:r.notPossible)===!0,c=(s==null?void 0:s.module)==="Full Stroke"||((t=s==null?void 0:s.module)==null?void 0:t.includes("Full"));let h;return console.log("[Results] ICH data:",s),console.log("[Results] LVO data:",r),console.log("[Results] ICH module:",s==null?void 0:s.module),console.log("[Results] isLimitedOrComa:",l),console.log("[Results] isFullModule:",c),l?h=Ei(s,a,e,n,i):h=Ti(s,r,a,e,n,i),setTimeout(()=>{console.log("[Results] Initializing volume animations..."),ps()},100),h}catch(s){return console.error("Error in renderResults:",s),`
      <div class="container">
        <div class="error-message">
          <h2>Error Displaying Results</h2>
          <p>There was an error displaying the results. Error: ${s.message}</p>
          <button class="primary" data-action="reload">Start Over</button>
        </div>
      </div>
    `}}function Ei(a,e,t,s,r){const n=ze().isKioskMode,l=a&&a.probability>.6?Bt():"",c=Math.round(((a==null?void 0:a.probability)||0)*100),h=Ot(),d=Vt(),u=Ae(r)?Nt():"",g=s&&Ae(r)?xt(a,s,Ue()):"",E=(a==null?void 0:a.module)==="Coma"?Ii(a.probability):"",L=(a==null?void 0:a.module)!=="Coma"?Kt(a.probability):"";return`
    <div class="container">
      ${ue(3)}
      <h2>${o("bleedingRiskAssessment")||"Blutungsrisiko-Bewertung / Bleeding Risk Assessment"}</h2>
      ${l}
      
      <!-- Single ICH Risk Card -->
      <div class="risk-results-single">
        ${Xe("ich",a)}
      </div>

      ${(a==null?void 0:a.module)==="Coma"&&c>=50?`
      <!-- ICH Volume Card (Coma only) -->
      <div class="risk-results-single">
        ${qt(a)}
      </div>
      `:""}
      
      <!-- Alternative Diagnoses for Coma Module -->
      ${E}
      
      <!-- Differential Diagnoses for Stroke Modules -->
      ${L}
      
      <!-- Research Model Comparison (hidden unless research mode) -->
      ${g}
      
      <!-- ICH Drivers Only (not shown for Coma module) -->
      ${(a==null?void 0:a.module)!=="Coma"?`
        <div class="enhanced-drivers-section">
          <h3>${o("riskFactorsTitle")||"Hauptrisikofaktoren / Main Risk Factors"}</h3>
          ${Gt(a)}
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
          ${d}
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
        ${n?`
          <!-- Kiosk Mode: Simple navigation back to case list -->
          <div class="primary-actions">
            <button type="button" class="primary" data-action="kiosk-home">
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
      
      ${Wt(a)}
      ${u}
    </div>
  `}function Ti(a,e,t,s,r,i){var Ie,ve;const l=ze().isKioskMode,c=Math.round(((a==null?void 0:a.probability)||0)*100),h=Math.round(((e==null?void 0:e.probability)||0)*100);console.log("[FullModuleResults] ICH probability:",a==null?void 0:a.probability,"-> %:",c),console.log("[FullModuleResults] LVO probability:",e==null?void 0:e.probability,"-> %:",h);const d=a&&a.probability>.6?Bt():"",u=Ot(),g=Vt(),E=Ae(i)?Nt():"",L=r&&Ae(i)?xt(a,r,Ue()):"",_=m.getState(),$=parseInt((ve=(Ie=_.formData)==null?void 0:Ie.full)==null?void 0:ve.fast_ed_score)||0,R=i==="full"||(a==null?void 0:a.module)==="Full",ie=e&&typeof e.probability=="number"&&!e.notPossible,V=R&&$>3&&ie,j=c>=50,F=h/Math.max(c,.5),G=F>=.6&&F<=1.7,X=R&&c>=50&&h>=50&&!G,W=R&&c>=30&&h>=30;let oe=1;V&&oe++,j&&oe++;const ee=oe===1?"risk-results-single":oe===2?"risk-results-dual":"risk-results-triple",be=Kt(a.probability);return`
    <div class="container">
      ${ue(3)}
      <h2>${o("resultsTitle")}</h2>
      ${d}
      
      <!-- Risk Assessment Display -->
      <div class="${ee}">
        ${Xe("ich",a)}
        ${V?Xe("lvo",e):""}
        ${j?qt(a):""}
      </div>
      
      <!-- Treatment Decision Gauge (when strong signal) -->
      ${W?Mi(c,h):""}
      ${!W&&X?Ai(c,h,F):""}
      
      <!-- Differential Diagnoses for Stroke Modules -->
      ${be}
      
      <!-- Research Model Comparison (hidden unless research mode) -->
      ${L}
      
      <!-- Risk Factor Drivers -->
      <div class="enhanced-drivers-section">
        <h3>${o("riskFactorsTitle")||"Risikofaktoren / Risk Factors"}</h3>
        ${V?vi(a,e):Gt(a)}
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
          ${u}
        </div>
      </div>
      
      <div class="results-actions">
        ${l?`
          <!-- Kiosk Mode: Simple navigation back to case list -->
          <div class="primary-actions">
            <button type="button" class="primary" data-action="kiosk-home">
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
      
      ${Wt(a)}
      ${E}
    </div>
  `}function Ai(a,e,t){const s=t>1?"LVO":"ICH",r=s==="LVO"?"🧠":"🩸",i=q.getCurrentLanguage()==="de"?s==="LVO"?"LVO-dominant":"ICH-dominant":s==="LVO"?"LVO dominant":"ICH dominant",n=q.getCurrentLanguage()==="de"?`Verhältnis LVO/ICH: ${t.toFixed(2)}`:`LVO/ICH ratio: ${t.toFixed(2)}`;return`
    <div class="tachometer-section">
      <div class="tachometer-card">
        <div class="treatment-recommendation ${s==="LVO"?"lvo-dominant":"ich-dominant"}">
          <div class="recommendation-icon">${r}</div>
          <div class="recommendation-text">
            <h4>${i}</h4>
            <p>${n}</p>
          </div>
          <div class="probability-summary">
            ICH: ${a}% | LVO: ${e}%
          </div>
        </div>
      </div>
    </div>
  `}function Gt(a){if(!a||!a.drivers)return'<p class="no-drivers">No driver data available</p>';const e=a.drivers;if(!e.positive&&!e.negative)return'<p class="no-drivers">Driver format error</p>';const t=e.positive||[],s=e.negative||[];return`
    <div class="drivers-split-view">
      <div class="drivers-column positive-column">
        <div class="column-header">
          <span class="column-icon">⬆</span>
          <span class="column-title">${o("increasingRisk")||"Risikoerhöhend / Increasing Risk"}</span>
        </div>
        <div class="compact-drivers">
          ${t.length>0?t.slice(0,5).map(r=>wt(r,"positive")).join(""):`<p class="no-factors">${o("noFactors")||"Keine Faktoren / No factors"}</p>`}
        </div>
      </div>
      
      <div class="drivers-column negative-column">
        <div class="column-header">
          <span class="column-icon">⬇</span>
          <span class="column-title">${o("decreasingRisk")||"Risikomindernd / Decreasing Risk"}</span>
        </div>
        <div class="compact-drivers">
          ${s.length>0?s.slice(0,5).map(r=>wt(r,"negative")).join(""):`<p class="no-factors">${o("noFactors")||"Keine Faktoren / No factors"}</p>`}
        </div>
      </div>
    </div>
  `}function wt(a,e){const t=Math.abs(a.weight*100),s=Math.min(t*2,100);return`
    <div class="compact-driver-item">
      <div class="compact-driver-label">${Be(a.label)}</div>
      <div class="compact-driver-bar ${e}" style="width: ${s}%;">
        <span class="compact-driver-value">${t.toFixed(1)}%</span>
      </div>
    </div>
  `}function Wt(a){if(!a||!a.probability||Math.round((a.probability||0)*100)<50)return"";const t=et();return!t||t<=0?"":`
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
  `}function Ci(a){try{const e=Ue();return!e.age||!e.gfap?null:ms(e)}catch(e){return null}}function Ue(){const a=m.getState(),{formData:e}=a;let t=null,s=null;for(const i of["coma","limited","full"])e[i]&&(t=t||e[i].age_years,s=s||e[i].gfap_value);return{age:parseInt(t)||null,gfap:parseFloat(s)||null}}function Kt(a){return Math.round(a*100)>25?`
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
    `:""}function Ii(a){const e=Math.round(a*100),t=q.getCurrentLanguage()==="de";return e>25?`
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
    `}function Li(a){if(!(a!=null&&a.module))return"unknown";const e=a.module.toLowerCase();return e.includes("coma")?"coma":e.includes("limited")?"limited":e.includes("full")?"full":"unknown"}function qt(a){const e=et();if(!e||e<=0)return"";const t=Dt(e),s=us(t);return Math.round(((a==null?void 0:a.probability)||0)*100),`
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
              ${wi(a)}
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
  `}function Mi(a,e){const t=e/Math.max(a,1);return`
    <div class="tachometer-section">
      <div class="tachometer-card">
        <div class="tachometer-header">
          <h3>🎯 ${q.getCurrentLanguage()==="de"?"Entscheidungshilfe – LVO/ICH":"Decision Support – LVO/ICH"}</h3>
          <div class="ratio-display">LVO/ICH Ratio: ${t.toFixed(2)}</div>
        </div>
        
        <div class="tachometer-gauge" id="tachometer-canvas-container">
          <div data-react-tachometer data-ich="${a}" data-lvo="${e}" data-title="${q.getCurrentLanguage()==="de"?"Entscheidungshilfe – LVO/ICH":"Decision Support – LVO/ICH"}"></div>
        </div>

        <!-- Legend chips for zones -->
        <div class="tachometer-legend" aria-hidden="true">
          <span class="legend-chip ich">ICH</span>
          <span class="legend-chip uncertain">${q.getCurrentLanguage()==="de"?"Unsicher":"Uncertain"}</span>
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
            <div class="metric-value">${(()=>{const s=Math.abs(e-a),r=Math.max(e,a);let i=s<10?Math.round(30+r*.3):s<20?Math.round(50+r*.4):Math.round(70+r*.3);return i=Math.max(0,Math.min(100,i)),i})()}%</div>
            <div class="metric-unit">percent</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Difference</div>
            <div class="metric-value">${Math.abs(e-a).toFixed(0)}%</div>
            <div class="metric-unit">|LVO − ICH|</div>
          </div>
        </div>
        
        <div class="probability-summary">
          ICH: ${a}% | LVO: ${e}%
        </div>
        
        <!-- Hidden probability summary for initialization -->
        <div class="probability-summary" style="display: none;">
          ICH: ${a}% | LVO: ${e}%
        </div>
      </div>
    </div>
  `}function Ri(){return`
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
  `}function _i(){const a=document.getElementById("loginForm");if(!a)return;const e=document.getElementById("researchPassword"),t=document.getElementById("loginError"),s=a.querySelector(".login-button");e.focus(),a.addEventListener("submit",async l=>{l.preventDefault();const c=e.value.trim();if(!c){r("Please enter the research access code");return}n(!0),i();try{const h=await O.authenticate(c);if(h.success)m.logEvent("auth_success",{timestamp:new Date().toISOString(),userAgent:navigator.userAgent.substring(0,100)}),m.navigate("triage1");else{const d=h.message;r(d),e.value="",e.focus(),m.logEvent("auth_failed",{timestamp:new Date().toISOString(),errorCode:h.errorCode})}}catch(h){r("Authentication system error. Please try again.")}finally{n(!1)}}),e.addEventListener("input",()=>{i()});function r(l){t.textContent=l,t.style.display="block",e.classList.add("error")}function i(){t.style.display="none",e.classList.remove("error")}function n(l){const c=s.querySelector(".button-text"),h=s.querySelector(".loading-spinner");l?(c.style.display="none",h.style.display="inline",s.disabled=!0):(c.style.display="inline",h.style.display="none",s.disabled=!1)}}function Pi(a){const e=document.createElement("div");e.className="sr-only",e.setAttribute("role","status"),e.setAttribute("aria-live","polite");const t={triage1:"Coma assessment",triage2:"Examination capability assessment",coma:"Coma module",limited:"Limited data module",full:"Full stroke assessment",results:"Assessment results"};e.textContent=`Navigated to ${t[a]||a}`,document.body.appendChild(e),setTimeout(()=>e.remove(),1e3)}function Di(a){const e="iGFAP",s={triage1:"Initial Assessment",triage2:"Examination Capability",coma:"Coma Module",limited:"Limited Data Module",full:"Full Stroke Module",results:"Assessment Results"}[a];document.title=s?`${e} — ${s}`:e}function Ni(){setTimeout(()=>{const a=document.querySelector("h2");a&&(a.setAttribute("tabindex","-1"),a.focus(),setTimeout(()=>a.removeAttribute("tabindex"),100))},100)}class xi{constructor(){this.scores={facial_palsy:0,arm_weakness:0,speech_changes:0,eye_deviation:0,denial_neglect:0},this.onApply=null,this.modal=null}getTotal(){return Object.values(this.scores).reduce((e,t)=>e+t,0)}getRiskLevel(){return this.getTotal()>=4?"high":"low"}render(){const e=this.getTotal(),t=this.getRiskLevel();return`
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
    `}setupEventListeners(){if(this.modal=document.getElementById("fastEdModal"),!this.modal)return;this.modal.addEventListener("change",r=>{if(r.target.type==="radio"){const i=r.target.name,n=parseInt(r.target.value);this.scores[i]=n,this.updateDisplay()}});const e=this.modal.querySelector(".modal-close");e==null||e.addEventListener("click",()=>this.close());const t=this.modal.querySelector('[data-action="cancel-fast-ed"]');t==null||t.addEventListener("click",()=>this.close());const s=this.modal.querySelector('[data-action="apply-fast-ed"]');s==null||s.addEventListener("click",()=>this.apply()),this.modal.addEventListener("click",r=>{r.target===this.modal&&(r.preventDefault(),r.stopPropagation())}),document.addEventListener("keydown",r=>{var i;r.key==="Escape"&&((i=this.modal)!=null&&i.classList.contains("show"))&&this.close()})}updateDisplay(){var s,r;const e=(s=this.modal)==null?void 0:s.querySelector(".total-score"),t=(r=this.modal)==null?void 0:r.querySelector(".risk-indicator");if(e&&(e.textContent=`${this.getTotal()}/9`),t){const i=this.getRiskLevel();t.className=`risk-indicator ${i}`,t.textContent=`${o("riskLevel")}: ${o(i==="high"?"riskLevelHigh":"riskLevelLow")}`}}show(e=0,t=null){this.onApply=t,e>0&&e<=9&&this.approximateFromTotal(e),document.getElementById("fastEdModal")?(this.modal.remove(),document.body.insertAdjacentHTML("beforeend",this.render()),this.modal=document.getElementById("fastEdModal")):document.body.insertAdjacentHTML("beforeend",this.render()),this.setupEventListeners(),this.modal.setAttribute("aria-hidden","false"),this.modal.style.display="flex",this.modal.classList.add("show");const s=this.modal.querySelector('input[type="radio"]');s==null||s.focus()}close(){this.modal&&(this.modal.classList.remove("show"),this.modal.style.display="none",this.modal.setAttribute("aria-hidden","true"))}apply(){const e=this.getTotal(),t=this.scores.arm_weakness>0,s=this.scores.eye_deviation>0;this.onApply&&this.onApply({total:e,components:{...this.scores},armWeaknessBoolean:t,eyeDeviationBoolean:s}),this.close()}approximateFromTotal(e){this.scores={facial_palsy:0,arm_weakness:0,speech_changes:0,eye_deviation:0,denial_neglect:0};let t=e;const s=Object.keys(this.scores);for(const r of s){if(t<=0)break;const n=Math.min(t,r==="facial_palsy"?1:2);this.scores[r]=n,t-=n}}}const Oi=new xi;function de(a){const e=m.getState(),{currentScreen:t,results:s,startTime:r,screenHistory:i}=e,l=ze().isKioskMode;console.log("[Render] Rendering screen:",t,"Has results:",!!s,"Kiosk mode:",l);const c=document.createElement("div"),h=document.getElementById("backButton");h&&(h.style.display=i&&i.length>0&&!l?"flex":"none");let d="";switch(t){case"login":l?d=kt(s,r):d=Ri();break;case"triage1":if(!l&&!O.isValidSession()){m.navigate("login");return}d=vt();break;case"triage2":d=ui();break;case"coma":d=hi();break;case"limited":d=mi();break;case"full":d=gi();break;case"results":d=kt(s,r);break;default:d=vt()}try{Te(c,d)}catch(g){c.textContent="Error loading content. Please refresh."}for(;a.firstChild;)a.removeChild(a.firstChild);for(;c.firstChild;)a.appendChild(c.firstChild);const u=a.querySelector("form[data-module]");if(u){const{module:g}=u.dataset;$i(u,g)}Fi(a),t==="login"&&setTimeout(()=>{_i()},100),t==="results"&&s&&setTimeout(()=>{try{console.log("[Render] Initializing stroke center map with results:",s),ys(s),console.log("[Render] Mounting React islands..."),di()}catch(g){console.error("[Render] Results initialization failed:",g)}},100),setTimeout(()=>{try{gs()}catch(g){}},150),Pi(t),Di(t),Ni()}function $i(a,e){const t=m.getFormData(e);!t||Object.keys(t).length===0||Object.entries(t).forEach(([s,r])=>{const i=a.elements[s];i&&(i.type==="checkbox"?i.checked=r===!0||r==="on"||r==="true":i.value=r)})}function Fi(a){a.querySelectorAll('input[type="number"]').forEach(r=>{r.addEventListener("input",()=>{const i=r.closest(".input-group");i&&i.classList.contains("error")&&(i.classList.remove("error"),i.querySelectorAll(".error-message").forEach(n=>n.remove()))})}),a.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",i=>{const{action:n,value:l}=i.currentTarget.dataset,c=l==="true";switch(n){case"triage1":Gs(c);break;case"triage2":Ws(c);break;case"reset":Ks();break;case"goBack":qs();break;case"goHome":Ht();break;case"reload":window.location.reload();break;case"kiosk-home":window.location.href=oi();break}})}),a.querySelectorAll("form[data-module]").forEach(r=>{r.addEventListener("submit",i=>{js(i,a)})});const e=a.querySelector("#printResults");e&&e.addEventListener("click",()=>window.print());const t=a.querySelector("#fast_ed_score");t&&(t.addEventListener("click",r=>{r.preventDefault();const i=parseInt(t.value)||0;Oi.show(i,n=>{t.value=n.total;const l=a.querySelector("#armparese_hidden");l&&(l.value=n.armWeaknessBoolean?"true":"false");const c=a.querySelector("#eye_deviation_hidden");c&&(c.value=n.eyeDeviationBoolean?"true":"false"),t.dispatchEvent(new Event("change",{bubbles:!0}))})}),t.addEventListener("keydown",r=>{r.preventDefault()})),a.querySelectorAll(".info-toggle").forEach(r=>{r.addEventListener("click",i=>{const n=r.dataset.target,l=a.querySelector(`#${n}`),c=r.querySelector(".toggle-arrow");l&&(l.style.display!=="none"?(l.style.display="none",l.classList.remove("show"),r.classList.remove("active"),c.style.transform="rotate(0deg)"):(l.style.display="block",l.classList.add("show"),r.classList.add("active"),c.style.transform="rotate(180deg)"))})})}class Hi{constructor(){this.container=null,this.eventListeners=new Map,this.isInitialized=!1}initialize(e){this.container=e,this.setupGlobalEventListeners(),this.setupHelpModal(),this.setupFooterLinks(),this.initializeApiModeToggle(),this.initializeResearchMode(),this.setCurrentYear(),this.isInitialized=!0}setupGlobalEventListeners(){this.addEventListenerSafe("backButton","click",()=>{m.goBack(),de(this.container)}),this.addEventListenerSafe("homeButton","click",()=>{m.goHome(),de(this.container)}),this.addEventListenerSafe("languageToggle","click",()=>{this.toggleLanguage()}),this.addEventListenerSafe("darkModeToggle","click",()=>{this.toggleDarkMode()}),this.addEventListenerSafe("apiModeToggle","click",e=>{e.preventDefault(),this.toggleApiMode()}),this.addEventListenerSafe("researchModeToggle","click",e=>{e.preventDefault(),e.stopPropagation(),this.toggleResearchMode()}),this.addGlobalEventListener("keydown",e=>{e.key==="Escape"&&this.closeModal("helpModal")}),this.addGlobalEventListener("beforeunload",e=>{m.hasUnsavedData()&&(e.preventDefault(),e.returnValue="You have unsaved data. Are you sure you want to leave?")})}initializeApiModeToggle(){if(!document.getElementById("apiModeToggle"))return;const t=["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname);localStorage.getItem("use_mock_api")===null&&t&&localStorage.setItem("use_mock_api","true"),this.updateApiModeButton()}toggleApiMode(){const t=localStorage.getItem("use_mock_api")==="true"?"false":"true";localStorage.setItem("use_mock_api",t),this.updateApiModeButton();try{const s=document.createElement("div");s.className="sr-only",s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.textContent=t==="true"?"Mock data enabled":"Live API enabled",document.body.appendChild(s),setTimeout(()=>s.remove(),1200)}catch(s){}}updateApiModeButton(){const e=document.getElementById("apiModeToggle");if(!e)return;localStorage.getItem("use_mock_api")!=="false"?(e.textContent="🧪",e.title="Mock data: ON (click to use API)",e.setAttribute("aria-label","Mock data enabled")):(e.textContent="☁️",e.title="Live API: ON (click to use mock)",e.setAttribute("aria-label","Live API enabled"))}addEventListenerSafe(e,t,s){const r=document.getElementById(e);if(r){const i=n=>{try{s(n)}catch(l){this.handleUIError(l,`${e}_${t}`)}};r.addEventListener(t,i),this.eventListeners.set(`${e}_${t}`,{element:r,handler:i})}}addGlobalEventListener(e,t){const s=r=>{try{t(r)}catch(i){this.handleUIError(i,`global_${e}`)}};if(e==="keydown"||e==="beforeunload"){const r=e==="beforeunload"?window:document;r.addEventListener(e,s),this.eventListeners.set(`global_${e}`,{element:r,handler:s})}}setupHelpModal(){b(async()=>{const e=document.getElementById("helpButton"),t=document.getElementById("helpModal"),s=t==null?void 0:t.querySelector(".modal-close");e&&t&&(this.closeModal("helpModal"),this.addEventListenerSafe("helpButton","click",()=>{this.openModal("helpModal")}),s&&s.addEventListener("click",()=>{this.closeModal("helpModal")}),t.addEventListener("click",r=>{r.target===t&&this.closeModal("helpModal")}))},e=>{})}setupFooterLinks(){this.addEventListenerSafe("privacyLink","click",e=>{e.preventDefault(),this.showPrivacyPolicy()}),this.addEventListenerSafe("disclaimerLink","click",e=>{e.preventDefault(),this.showDisclaimer()})}toggleLanguage(){b(async()=>{q.toggleLanguage(),this.updateLanguage()},e=>{})}updateLanguage(){document.documentElement.lang=q.getCurrentLanguage(),this.updateElementText(".app-header h1",o("appTitle")),this.updateElementText(".emergency-badge",o("emergencyBadge")),this.updateButtonAttributes("languageToggle",o("languageToggle")),this.updateButtonAttributes("helpButton",o("helpButton")),this.updateButtonAttributes("darkModeToggle",o("darkModeButton")),this.updateElementText("#modalTitle",o("helpTitle"));const e=document.getElementById("languageToggle");if(e){const t=q.getCurrentLanguage();e.textContent=t==="en"?"🇬🇧":"🇩🇪",e.dataset.lang=t}}updateElementText(e,t){const s=document.querySelector(e);s&&t&&(s.textContent=t)}updateButtonAttributes(e,t){const s=document.getElementById(e);s&&t&&(s.title=t,s.setAttribute("aria-label",t))}toggleDarkMode(){const e=document.getElementById("darkModeToggle");document.body.classList.toggle("dark-mode");const t=document.body.classList.contains("dark-mode");e&&(e.textContent=t?"☀️":"🌙"),localStorage.setItem("theme",t?"dark":"light")}initializeResearchMode(){document.getElementById("researchModeToggle")&&this.updateResearchMode()}updateResearchMode(){const e=document.getElementById("researchModeToggle");if(e){const t=this.getCurrentModuleFromResults(),s=t==="limited"||t==="full";e.style.display=s?"flex":"none",e.style.opacity=s?"1":"0.5"}}getCurrentModuleFromResults(){var s,r;const e=m.getState();if(e.currentScreen!=="results"||!((r=(s=e.results)==null?void 0:s.ich)!=null&&r.module))return null;const t=e.results.ich.module.toLowerCase();return t.includes("coma")?"coma":t.includes("limited")?"limited":t.includes("full")?"full":null}toggleResearchMode(){const e=document.getElementById("researchPanel");if(!e)return;const t=e.style.display!=="none";e.style.display=t?"none":"block";const s=document.getElementById("researchModeToggle");return s&&(s.style.background=t?"rgba(255, 255, 255, 0.1)":"rgba(0, 102, 204, 0.2)"),!1}showResearchActivationMessage(){b(async()=>{const e=document.createElement("div");e.className="research-activation-toast";try{Te(e,`
            <div class="toast-content">
              🔬 <strong>Research Mode Activated</strong><br>
              <small>Model comparison features enabled</small>
            </div>
          `)}catch(t){e.textContent="🔬 Research Mode Activated - Model comparison features enabled"}document.body.appendChild(e),setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},3e3)},e=>{})}openModal(e){const t=document.getElementById(e);t&&(t.style.display="flex",t.classList.add("show"),t.setAttribute("aria-hidden","false"))}closeModal(e){const t=document.getElementById(e);t&&(t.classList.remove("show"),t.style.display="none",t.setAttribute("aria-hidden","true"))}showPrivacyPolicy(){alert("Privacy Policy: This tool processes data locally. No patient data is stored or transmitted.")}showDisclaimer(){alert("Medical Disclaimer: This tool is for clinical decision support only. Always use clinical judgment and follow local protocols.")}setCurrentYear(){const e=document.getElementById("currentYear");e&&(e.textContent=new Date().getFullYear())}handleUIError(e,t){try{const s=new CustomEvent("uiError",{detail:{error:e,context:t,timestamp:Date.now()}});document.dispatchEvent(s)}catch(s){}}async preloadCriticalComponents(){return b(async()=>{const t=["appContainer","helpModal","languageToggle","darkModeToggle"].filter(s=>!document.getElementById(s));if(t.length>0)throw new Error(`Missing critical UI elements: ${t.join(", ")}`);return!0},e=>!1)}getStatus(){return{isInitialized:this.isInitialized,hasContainer:!!this.container,eventListenersCount:this.eventListeners.size,currentLanguage:q.getCurrentLanguage(),isDarkMode:document.body.classList.contains("dark-mode")}}destroy(){this.eventListeners.forEach(({element:e,handler:t},s)=>{const[,r]=s.split("_");e&&t&&e.removeEventListener(r,t)}),this.eventListeners.clear(),this.container=null,this.isInitialized=!1}}class Bi{constructor(){this.currentTheme="light",this.isInitialized=!1,this.storageKey="theme"}initialize(){this.loadSavedTheme(),this.setupThemeDetection(),this.isInitialized=!0}async loadSavedTheme(){return b(async()=>{const e=localStorage.getItem(this.storageKey),t=window.matchMedia("(prefers-color-scheme: dark)").matches;let s;return e==="dark"||e==="light"?s=e:t?s="dark":s="light",this.applyTheme(s),this.updateThemeButton(),s},e=>(this.applyTheme("light"),this.updateThemeButton(),"light"))}setupThemeDetection(){const e=window.matchMedia("(prefers-color-scheme: dark)"),t=s=>{if(!localStorage.getItem(this.storageKey)){const i=s.matches?"dark":"light";this.applyTheme(i),this.updateThemeButton()}};e.addEventListener?e.addEventListener("change",t):e.addListener(t)}applyTheme(e){e!=="light"&&e!=="dark"&&(e="light"),this.currentTheme=e,e==="dark"?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode"),this.updateMetaThemeColor(e),this.dispatchThemeChangeEvent(e)}toggleTheme(){const e=this.currentTheme==="dark"?"light":"dark";this.setTheme(e)}setTheme(e){return b(async()=>(this.applyTheme(e),this.saveTheme(e),this.updateThemeButton(),e),t=>this.currentTheme)}saveTheme(e){try{localStorage.setItem(this.storageKey,e)}catch(t){}}updateThemeButton(){const e=document.getElementById("darkModeToggle");if(e){const t=this.currentTheme==="dark";e.textContent=t?"☀️":"🌙";const s=t?"Switch to light mode":"Switch to dark mode";e.setAttribute("aria-label",s),e.title=s}}updateMetaThemeColor(e){let t=document.querySelector('meta[name="theme-color"]');t||(t=document.createElement("meta"),t.name="theme-color",document.head.appendChild(t));const s={light:"#ffffff",dark:"#1a1a1a"};t.content=s[e]||s.light}dispatchThemeChangeEvent(e){try{const t=new CustomEvent("themeChanged",{detail:{theme:e,timestamp:Date.now()}});document.dispatchEvent(t)}catch(t){}}getCurrentTheme(){return this.currentTheme}isDarkMode(){return this.currentTheme==="dark"}getSystemPreferredTheme(){try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){return"light"}}resetToSystemTheme(){const e=this.getSystemPreferredTheme();this.setTheme(e);try{localStorage.removeItem(this.storageKey)}catch(t){}}getStatus(){return{isInitialized:this.isInitialized,currentTheme:this.currentTheme,isDarkMode:this.isDarkMode(),systemPreferred:this.getSystemPreferredTheme(),hasExplicitPreference:!!localStorage.getItem(this.storageKey)}}destroy(){this.isInitialized=!1}}class zi{constructor(){this.autoSaveInterval=null,this.sessionCheckInterval=null,this.isInitialized=!1,this.lastAutoSave=0}initialize(){this.validateStoredSession(),this.startAutoSave(),this.setupSessionTimeout(),this.setupSessionValidation(),this.isInitialized=!0}async validateStoredSession(){return b(async()=>O.isValidSession()?(this.restoreFormData(),!0):(this.clearSessionData(),!1),e=>(this.clearSessionData(),!1))}startAutoSave(){this.autoSaveInterval&&clearInterval(this.autoSaveInterval),this.autoSaveInterval=setInterval(()=>{this.performAutoSave()},mt.autoSaveInterval)}async performAutoSave(){return b(async()=>{const e=document.getElementById("appContainer");if(!e)return!1;const t=e.querySelectorAll("form[data-module]");let s=0;for(const r of t)try{const{module:i}=r.dataset;if(i){const n=this.extractFormData(r);this.hasFormDataChanged(i,n)&&(m.setFormData(i,n),s++)}}catch(i){}return this.lastAutoSave=Date.now(),s>0},e=>!1)}extractFormData(e){const t=new FormData(e),s={};return t.forEach((r,i)=>{const n=e.elements[i];if(n)if(n.type==="checkbox")s[i]=n.checked;else if(n.type==="number"){const l=parseFloat(r);s[i]=isNaN(l)?r:l}else s[i]=r}),s}hasFormDataChanged(e,t){try{const s=m.getFormData(e);return JSON.stringify(s)!==JSON.stringify(t)}catch(s){return!0}}restoreFormData(){b(async()=>{const e=document.getElementById("appContainer");if(!e)return;e.querySelectorAll("form[data-module]").forEach(s=>{try{const{module:r}=s.dataset;if(r){const i=m.getFormData(r);i&&Object.keys(i).length>0&&this.populateForm(s,i)}}catch(r){}})},e=>{})}populateForm(e,t){Object.entries(t).forEach(([s,r])=>{const i=e.elements[s];if(i)try{i.type==="checkbox"?i.checked=!!r:i.type==="radio"?i.value===r&&(i.checked=!0):i.value=r,i.dispatchEvent(new Event("input",{bubbles:!0}))}catch(n){}})}setupSessionTimeout(){setTimeout(()=>{this.showSessionTimeoutWarning()},mt.sessionTimeout-6e4)}setupSessionValidation(){this.sessionCheckInterval=setInterval(()=>{this.validateCurrentSession()},5*60*1e3)}async validateCurrentSession(){return b(async()=>O.isValidSession()?await O.validateSessionWithServer()?!0:(this.handleSessionExpiry(),!1):(this.handleSessionExpiry(),!1),e=>O.isValidSession())}showSessionTimeoutWarning(){b(async()=>{confirm("Your session will expire in 1 minute. Would you like to continue?")?(O.updateActivity(),this.setupSessionTimeout()):this.endSession()},e=>{})}handleSessionExpiry(){this.clearSessionData(),m.navigate("login"),this.showSessionExpiredMessage()}showSessionExpiredMessage(){const e=document.createElement("div");e.style.cssText=`
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
    `,e.textContent="⏰ Session expired. Please log in again.",document.body.appendChild(e),setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},5e3)}endSession(){O.logout(),this.clearSessionData(),m.reset(),m.navigate("login")}async clearSessionData(){try{v.info("Clearing session data",{category:S.SECURITY}),m.clearAllFormData(),await ge("temp_data",!0),await ge("research_data",!0),sessionStorage.removeItem("temp_data"),sessionStorage.removeItem("research_data"),v.info("Session data cleared successfully",{category:S.SECURITY})}catch(e){v.warn("Failed to clear some session data",{category:S.SECURITY,error:e.message})}}async forceSave(){return this.performAutoSave()}getStatus(){var e;return{isInitialized:this.isInitialized,isAuthenticated:O.isValidSession(),lastAutoSave:this.lastAutoSave,autoSaveActive:!!this.autoSaveInterval,sessionCheckActive:!!this.sessionCheckInterval,sessionInfo:((e=O.getSessionInfo)==null?void 0:e.call(O))||{}}}destroy(){this.autoSaveInterval&&(clearInterval(this.autoSaveInterval),this.autoSaveInterval=null),this.sessionCheckInterval&&(clearInterval(this.sessionCheckInterval),this.sessionCheckInterval=null),this.isInitialized=!1}}const Z={MEMORY:"memory",SESSION:"session",LOCAL:"local",INDEXED_DB:"indexed_db"},ce={CRITICAL:"critical",HIGH:"high",NORMAL:"normal",LOW:"low"},Ui={API_RESPONSES:15*60*1e3};class Et{constructor(e,t,s,r=ce.NORMAL,i={}){this.key=e,this.value=this.sanitizeValue(t),this.ttl=s,this.priority=r,this.metadata={...i,createdAt:Date.now(),accessCount:0,lastAccessed:Date.now()},this.expiresAt=s>0?Date.now()+s:null,this.encrypted=!1}sanitizeValue(e){if(typeof e!="object"||e===null)return e;const t=JSON.parse(JSON.stringify(e)),s=["ssn","mrn","patient_id","user_id","session_token"];return this.removeSensitiveFields(t,s),t}removeSensitiveFields(e,t){Object.keys(e).forEach(s=>{t.some(r=>s.toLowerCase().includes(r))?e[s]="[REDACTED]":typeof e[s]=="object"&&e[s]!==null&&this.removeSensitiveFields(e[s],t)})}isExpired(){return this.expiresAt!==null&&Date.now()>this.expiresAt}markAccessed(){this.metadata.accessCount+=1,this.metadata.lastAccessed=Date.now()}getAge(){return Date.now()-this.metadata.createdAt}getTimeToExpiration(){return this.expiresAt===null?1/0:Math.max(0,this.expiresAt-Date.now())}getEvictionScore(){const t={[ce.CRITICAL]:1e3,[ce.HIGH]:100,[ce.NORMAL]:10,[ce.LOW]:1}[this.priority]||1,s=Math.log(this.metadata.accessCount+1),r=1/(this.getAge()+1);return t*s*r}}class Oe{constructor(e=Z.MEMORY,t={}){this.storageType=e,this.options={maxSize:100*1024*1024,maxEntries:1e3,cleanupInterval:5*60*1e3,enableEncryption:!1,enableMetrics:!0,...t},this.cache=new Map,this.cleanupTimer=null,this.totalSize=0,this.hitCount=0,this.missCount=0,this.evictionCount=0,this.initializeStorage(),this.startCleanupTimer()}initializeStorage(){switch(this.storageType){case Z.SESSION:this.storage=sessionStorage,this.loadFromStorage();break;case Z.LOCAL:this.storage=localStorage,this.loadFromStorage();break;case Z.INDEXED_DB:this.initializeIndexedDB();break;default:this.storage=null}}loadFromStorage(){if(this.storage)try{const e=this.storage.getItem("medical_cache");if(e){const t=JSON.parse(e);Object.entries(t).forEach(([s,r])=>{const i=new Et(r.key,r.value,r.ttl,r.priority,r.metadata);i.expiresAt=r.expiresAt,i.isExpired()||(this.cache.set(s,i),this.totalSize+=this.calculateSize(i.value))})}}catch(e){}}saveToStorage(){if(this.storage)try{const e={};this.cache.forEach((t,s)=>{e[s]={key:t.key,value:t.value,ttl:t.ttl,priority:t.priority,metadata:t.metadata,expiresAt:t.expiresAt}}),this.storage.setItem("medical_cache",JSON.stringify(e))}catch(e){}}async initializeIndexedDB(){}set(e,t,s=Ui.API_RESPONSES,r=ce.NORMAL,i={}){const n=z.startMeasurement(Je.CACHE,"cache_set",{key:e,priority:r});try{this.ensureCapacity();const l=new Et(e,t,s,r,i),c=this.calculateSize(t);if(this.cache.has(e)){const h=this.cache.get(e);this.totalSize-=this.calculateSize(h.value)}return this.cache.set(e,l),this.totalSize+=c,this.storageType!==Z.MEMORY&&this.saveToStorage(),f.publish(y.AUDIT_EVENT,{action:"cache_set",key:e,size:c,ttl:s,priority:r}),z.endMeasurement(n,{success:!0}),!0}catch(l){return z.endMeasurement(n,{success:!1,error:l.message}),!1}}get(e){const t=z.startMeasurement(Je.CACHE,"cache_get",{key:e});try{const s=this.cache.get(e);return s?s.isExpired()?(this.cache.delete(e),this.totalSize-=this.calculateSize(s.value),this.missCount+=1,z.endMeasurement(t,{hit:!1,expired:!0}),null):(s.markAccessed(),this.hitCount+=1,z.endMeasurement(t,{hit:!0}),s.value):(this.missCount+=1,z.endMeasurement(t,{hit:!1}),null)}catch(s){return z.endMeasurement(t,{hit:!1,error:s.message}),null}}has(e){const t=this.cache.get(e);return t&&!t.isExpired()}delete(e){const t=this.cache.get(e);return t?(this.totalSize-=this.calculateSize(t.value),this.cache.delete(e),this.storageType!==Z.MEMORY&&this.saveToStorage(),f.publish(y.AUDIT_EVENT,{action:"cache_delete",key:e}),!0):!1}clear(){const e=this.cache.size;this.cache.clear(),this.totalSize=0,this.storage&&this.storage.removeItem("medical_cache"),f.publish(y.AUDIT_EVENT,{action:"cache_cleared",entriesCleared:e})}ensureCapacity(){for(;this.totalSize>this.options.maxSize;)this.evictLeastImportant();for(;this.cache.size>=this.options.maxEntries;)this.evictLeastImportant()}evictLeastImportant(){let e=1/0,t=null;this.cache.forEach((s,r)=>{if(s.priority===ce.CRITICAL&&!s.isExpired())return;const i=s.getEvictionScore();i<e&&(e=i,t=r)}),t&&(this.delete(t),this.evictionCount+=1)}cleanup(){const e=performance.now();let t=0;this.cache.forEach((r,i)=>{r.isExpired()&&(this.delete(i),t+=1)});const s=performance.now()-e;return f.publish(y.AUDIT_EVENT,{action:"cache_cleanup",cleanedCount:t,duration:s,remainingEntries:this.cache.size}),t}startCleanupTimer(){this.cleanupTimer&&clearInterval(this.cleanupTimer),this.cleanupTimer=setInterval(()=>{this.cleanup()},this.options.cleanupInterval)}stopCleanupTimer(){this.cleanupTimer&&(clearInterval(this.cleanupTimer),this.cleanupTimer=null)}calculateSize(e){try{return JSON.stringify(e).length*2}catch(t){return 0}}getStats(){const e=this.hitCount+this.missCount>0?this.hitCount/(this.hitCount+this.missCount)*100:0;return{entries:this.cache.size,totalSize:this.totalSize,maxSize:this.options.maxSize,hitCount:this.hitCount,missCount:this.missCount,hitRate:`${e.toFixed(2)}%`,evictionCount:this.evictionCount,storageType:this.storageType,utilizationPercent:`${(this.totalSize/this.options.maxSize*100).toFixed(2)}%`}}getEntryInfo(e){const t=this.cache.get(e);return t?{key:t.key,size:this.calculateSize(t.value),priority:t.priority,ttl:t.ttl,age:t.getAge(),timeToExpiration:t.getTimeToExpiration(),accessCount:t.metadata.accessCount,lastAccessed:new Date(t.metadata.lastAccessed).toISOString(),isExpired:t.isExpired(),evictionScore:t.getEvictionScore()}:null}dispose(){this.stopCleanupTimer(),this.clear()}}class ne{static getPatientDataCache(){return this.patientDataCache||(this.patientDataCache=new Oe(Z.SESSION,{maxSize:10*1024*1024,maxEntries:100,enableEncryption:!0})),this.patientDataCache}static getPredictionCache(){return this.predictionCache||(this.predictionCache=new Oe(Z.MEMORY,{maxSize:50*1024*1024,maxEntries:500})),this.predictionCache}static getValidationCache(){return this.validationCache||(this.validationCache=new Oe(Z.LOCAL,{maxSize:5*1024*1024,maxEntries:200})),this.validationCache}static getApiCache(){return this.apiCache||(this.apiCache=new Oe(Z.SESSION,{maxSize:20*1024*1024,maxEntries:300})),this.apiCache}static clearAllCaches(){[this.patientDataCache,this.predictionCache,this.validationCache,this.apiCache].forEach(e=>{e&&e.clear()})}static disposeAllCaches(){[this.patientDataCache,this.predictionCache,this.validationCache,this.apiCache].forEach(e=>{e&&e.dispose()}),this.patientDataCache=null,this.predictionCache=null,this.validationCache=null,this.apiCache=null}}me(ne,"patientDataCache",null),me(ne,"predictionCache",null),me(ne,"validationCache",null),me(ne,"apiCache",null);ne.getPatientDataCache();const ar=ne.getPredictionCache();ne.getValidationCache();ne.getApiCache();const Vi="modulepreload",Gi=function(a){return"/0825/"+a},Tt={},re=function(e,t,s){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),l=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));r=Promise.allSettled(t.map(c=>{if(c=Gi(c),c in Tt)return;Tt[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":Vi,h||(u.as="script"),u.crossOrigin="",u.href=c,l&&u.setAttribute("nonce",l),document.head.appendChild(u),h)return new Promise((g,E)=>{u.addEventListener("load",g),u.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return r.then(n=>{for(const l of n||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})},T={CRITICAL:"critical",HIGH:"high",NORMAL:"normal",LOW:"low"},J={PENDING:"pending",LOADING:"loading",LOADED:"loaded",ERROR:"error"};class Wi{constructor(e,t,s={}){this.name=e,this.loader=t,this.priority=s.priority||T.NORMAL,this.state=J.PENDING,this.component=null,this.error=null,this.loadTime=null,this.dependencies=s.dependencies||[],this.retryCount=0,this.maxRetries=s.maxRetries||3,this.loadPromise=null}async load(){if(this.state===J.LOADED)return this.component;if(this.loadPromise)return this.loadPromise;const e=z.startMeasurement(Je.USER_INTERACTION,`lazy_load_${this.name}`,{priority:this.priority});return this.state=J.LOADING,this.loadPromise=this.executeLoad(e),this.loadPromise}async executeLoad(e){try{const t=performance.now();return await this.loadDependencies(),this.component=await this.loader(),this.loadTime=performance.now()-t,this.state=J.LOADED,z.endMeasurement(e,{success:!0,loadTime:this.loadTime,retryCount:this.retryCount}),f.publish(y.AUDIT_EVENT,{action:"lazy_component_loaded",component:this.name,loadTime:this.loadTime,priority:this.priority}),this.component}catch(t){if(this.error=t,this.retryCount++,z.endMeasurement(e,{success:!1,error:t.message,retryCount:this.retryCount}),this.retryCount<this.maxRetries){const s=Math.min(1e3*2**(this.retryCount-1),5e3);return await new Promise(r=>setTimeout(r,s)),this.loadPromise=null,this.load()}throw this.state=J.ERROR,f.publish(y.AUDIT_EVENT,{action:"lazy_component_load_failed",component:this.name,error:t.message,retryCount:this.retryCount}),t}}async loadDependencies(){if(this.dependencies.length===0)return;const e=this.dependencies.map(t=>typeof t=="string"?jt.load(t):typeof t=="function"?t():t.load());await Promise.all(e)}getStatus(){var e;return{name:this.name,state:this.state,priority:this.priority,loadTime:this.loadTime,error:(e=this.error)==null?void 0:e.message,retryCount:this.retryCount}}}class jt{constructor(){this.components=new Map,this.intersectionObserver=null,this.idleCallback=null,this.loadQueue={[T.CRITICAL]:[],[T.HIGH]:[],[T.NORMAL]:[],[T.LOW]:[]},this.isProcessingQueue=!1,this.initializeObservers()}initializeObservers(){"IntersectionObserver"in window&&(this.intersectionObserver=new IntersectionObserver(e=>this.handleIntersectionChanges(e),{rootMargin:"50px",threshold:.1})),this.scheduleIdleLoading()}register(e,t,s={}){const r=new Wi(e,t,s);return this.components.set(e,r),this.loadQueue[r.priority].push(r),r.priority===T.CRITICAL&&this.processLoadQueue(),f.publish(y.AUDIT_EVENT,{action:"lazy_component_registered",component:e,priority:r.priority}),r}async load(e){const t=this.components.get(e);if(!t)throw new Error(`Component '${e}' not registered`);return t.load()}async preload(e=T.HIGH){const t=[T.CRITICAL,T.HIGH,T.NORMAL,T.LOW],s=t.slice(0,t.indexOf(e)+1),r=[];s.forEach(i=>{this.loadQueue[i].forEach(n=>{n.state===J.PENDING&&r.push(n.load())})}),await Promise.allSettled(r),f.publish(y.AUDIT_EVENT,{action:"lazy_components_preloaded",priority:e,count:r.length})}observeElement(e,t){this.intersectionObserver&&(e.dataset.lazyComponent=t,this.intersectionObserver.observe(e))}handleIntersectionChanges(e){e.forEach(t=>{if(t.isIntersecting){const s=t.target.dataset.lazyComponent;s&&(this.load(s).catch(r=>{}),this.intersectionObserver.unobserve(t.target))}})}async processLoadQueue(){if(!this.isProcessingQueue){this.isProcessingQueue=!0;try{await this.processQueueByPriority(T.CRITICAL),await this.processQueueByPriority(T.HIGH)}catch(e){}finally{this.isProcessingQueue=!1}}}async processQueueByPriority(e){const s=this.loadQueue[e].filter(i=>i.state===J.PENDING);if(s.length===0)return;const r=s.map(i=>i.load().catch(n=>null));await Promise.allSettled(r)}scheduleIdleLoading(){const e=()=>{"requestIdleCallback"in window?this.idleCallback=requestIdleCallback(t=>{this.processIdleQueue(t),e()},{timeout:5e3}):setTimeout(()=>{this.processIdleQueue({timeRemaining:()=>50}),e()},100)};e()}async processIdleQueue(e){const t=this.loadQueue[T.NORMAL],s=this.loadQueue[T.LOW],r=[...t.filter(i=>i.state===J.PENDING),...s.filter(i=>i.state===J.PENDING)];for(const i of r)if(e.timeRemaining()>10)try{await i.load()}catch(n){}else break}getStats(){const e={total:this.components.size,byState:{pending:0,loading:0,loaded:0,error:0},byPriority:{critical:0,high:0,normal:0,low:0},totalLoadTime:0,averageLoadTime:0};let t=0,s=0;return this.components.forEach(r=>{e.byState[r.state]++,e.byPriority[r.priority]++,r.loadTime&&(t+=r.loadTime,s++)}),e.totalLoadTime=t,e.averageLoadTime=s>0?t/s:0,e}async reload(e){const t=this.components.get(e);if(!t)throw new Error(`Component '${e}' not registered`);return t.state=J.PENDING,t.component=null,t.error=null,t.loadTime=null,t.retryCount=0,t.loadPromise=null,t.load()}dispose(){this.intersectionObserver&&this.intersectionObserver.disconnect(),this.idleCallback&&cancelIdleCallback(this.idleCallback),this.components.clear(),Object.values(this.loadQueue).forEach(e=>e.length=0),f.publish(y.AUDIT_EVENT,{action:"lazy_loader_disposed"})}}class Ki{constructor(e){this.lazyLoader=e,this.registerMedicalComponents()}registerMedicalComponents(){this.lazyLoader.register("advanced-analytics",()=>re(()=>import("./research-tools-BvzcIJm_.js").then(e=>e.g),__vite__mapDeps([0,1])),{priority:T.LOW}),this.lazyLoader.register("clinical-reporting",()=>re(()=>import("./research-tools-BvzcIJm_.js").then(e=>e.f),__vite__mapDeps([0,1])),{priority:T.LOW}),this.lazyLoader.register("audit-trail",()=>re(()=>import("./research-tools-BvzcIJm_.js").then(e=>e.h),__vite__mapDeps([0,1])),{priority:T.LOW}),this.lazyLoader.register("medical-service-worker",()=>re(()=>import("./enterprise-features-BHfEsmtF.js").then(e=>e.e),__vite__mapDeps([2,1])),{priority:T.LOW}),this.lazyLoader.register("sw-manager",()=>re(()=>import("./enterprise-features-BHfEsmtF.js").then(e=>e.d),__vite__mapDeps([2,1])),{priority:T.LOW}),this.lazyLoader.register("command-pattern",()=>re(()=>Promise.resolve().then(()=>fa),void 0),{priority:T.NORMAL}),this.lazyLoader.register("prediction-strategy",()=>re(()=>Promise.resolve().then(()=>wa),void 0),{priority:T.NORMAL}),this.lazyLoader.register("validation-factory",()=>re(()=>Promise.resolve().then(()=>Da),void 0),{priority:T.NORMAL})}async loadByClinicalPriority(e){switch(e){case"emergency":await this.lazyLoader.preload(T.HIGH);break;case"routine":await this.lazyLoader.preload(T.NORMAL);break;case"research":await this.lazyLoader.load("advanced-analytics"),await this.lazyLoader.load("clinical-reporting"),await this.lazyLoader.load("audit-trail");break;case"background":await this.lazyLoader.load("medical-service-worker"),await this.lazyLoader.load("sw-manager");break;default:await this.lazyLoader.preload(T.NORMAL)}}async preloadForModule(e){const s={coma:["command-pattern"],limited:["prediction-strategy"],full:["command-pattern","prediction-strategy","validation-factory"],research:["advanced-analytics","clinical-reporting","audit-trail"]}[e]||[],r=s.map(i=>this.lazyLoader.load(i));await Promise.allSettled(r),f.publish(y.AUDIT_EVENT,{action:"medical_components_preloaded",moduleType:e,components:s})}async loadEnterpriseFeatures(){const e=["medical-service-worker","sw-manager","advanced-analytics","clinical-reporting","audit-trail"],t=e.map(i=>this.lazyLoader.load(i).catch(n=>(console.warn(`Enterprise feature ${i} failed to load:`,n),null))),r=(await Promise.allSettled(t)).filter(i=>i.status==="fulfilled"&&i.value!==null).length;return f.publish(y.AUDIT_EVENT,{action:"enterprise_features_loaded",requested:e.length,loaded:r}),r}}const Fe=new jt;new Ki(Fe);class qi{constructor(){this.isInitialized=!1,this.phase3Status={serviceWorker:!1,performanceMonitor:!1,syncManager:!1,lazyLoader:!1},this.phase4Status={reportingSystem:!1,qualityMetrics:!1,auditTrail:!1}}async initialize(){return b(async()=>(await this.initializePhase3Features(),await this.initializePhase4Features(),this.isInitialized=!0,!0),e=>!1)}async initializePhase3Features(){return b(async()=>(await this.initializePerformanceMonitor(),this.initializeServiceWorker(),await this.initializeSyncManager(),await this.initializeProgressiveLoading(),!0),e=>!1)}async initializePerformanceMonitor(){return b(async()=>(z.start(),this.phase3Status.performanceMonitor=!0,!0),e=>(this.phase3Status.performanceMonitor=!1,!1))}async initializeServiceWorker(){b(async()=>{const e=await lt.initialize();return this.phase3Status.serviceWorker=e,e&&await this.prefetchCriticalResources(),e},e=>(this.phase3Status.serviceWorker=!1,!1))}async initializeSyncManager(){return b(async()=>{const e=await ct.initialize();return this.phase3Status.syncManager=e,e},e=>(this.phase3Status.syncManager=!1,!1))}async initializeProgressiveLoading(){return b(async()=>(await Fe.preload("critical"),setTimeout(()=>this.setupViewportLoading(),100),this.phase3Status.lazyLoader=!0,!0),e=>(this.phase3Status.lazyLoader=!1,!1))}setupViewportLoading(){try{document.querySelectorAll(".brain-visualization-placeholder").forEach(s=>{Fe.observeElement(s,"brain-visualization")}),document.querySelectorAll(".stroke-center-map-placeholder").forEach(s=>{Fe.observeElement(s,"stroke-center-map")})}catch(e){}}async prefetchCriticalResources(){return b(async()=>{const e=["/0925/src/logic/lvo-local-model.js","/0925/src/logic/ich-volume-calculator.js","/0925/src/patterns/prediction-strategy.js","/0925/src/performance/medical-cache.js"];return await lt.prefetchResources(e),!0},e=>!1)}async initializePhase4Features(){return b(async()=>(await this.initializeAuditTrail(),await this.initializeReportingSystem(),await this.initializeQualityMetrics(),this.setupPhase4EventHandlers(),!0),e=>!1)}async initializeAuditTrail(){return b(async()=>(await dt.initialize(),this.phase4Status.auditTrail=!0,!0),e=>(this.phase4Status.auditTrail=!1,!1))}async initializeReportingSystem(){return b(async()=>(ut.start(),this.phase4Status.reportingSystem=!0,!0),e=>(this.phase4Status.reportingSystem=!1,!1))}async initializeQualityMetrics(){return b(async()=>(await Ze.initialize(),this.phase4Status.qualityMetrics=!0,!0),e=>(this.phase4Status.qualityMetrics=!1,!1))}setupPhase4EventHandlers(){document.addEventListener("submit",async e=>{const t=e.target;t.dataset.module&&await b(async()=>{const s=new FormData(t),r=Object.fromEntries(s.entries());return this.phase4Status.auditTrail&&dt.logEvent("data_entry",{module:t.dataset.module,timestamp:new Date().toISOString(),data_points:Object.keys(r).length}),this.phase4Status.qualityMetrics&&(Ze.recordMetric("form_completion","count",1),Ze.recordMetric("data_quality","completeness",Object.values(r).filter(i=>i&&i.trim()).length/Object.keys(r).length*100)),!0},s=>!1)})}getStatus(){return{isInitialized:this.isInitialized,phase3:{...this.phase3Status,overall:Object.values(this.phase3Status).some(e=>e)},phase4:{...this.phase4Status,overall:Object.values(this.phase4Status).some(e=>e)},systemStatus:this.getSystemStatus()}}getSystemStatus(){return{serviceWorkerSupported:"serviceWorker"in navigator,indexedDBSupported:"indexedDB"in window,notificationSupported:"Notification"in window,cacheSupported:"caches"in window,webLockSupported:"locks"in navigator,performanceSupported:"performance"in window}}async restart(){return this.destroy(),this.initialize()}destroy(){var e,t,s,r,i,n;if(this.phase3Status.performanceMonitor)try{(t=(e=z).stop)==null||t.call(e)}catch(l){}if(this.phase3Status.syncManager)try{(r=(s=ct).destroy)==null||r.call(s)}catch(l){}if(this.phase4Status.reportingSystem)try{(n=(i=ut).stop)==null||n.call(i)}catch(l){}this.phase3Status={serviceWorker:!1,performanceMonitor:!1,syncManager:!1,lazyLoader:!1},this.phase4Status={reportingSystem:!1,qualityMetrics:!1,auditTrail:!1},this.isInitialized=!1}}class ji{constructor(){this.container=null,this.unsubscribe=null,this.isInitialized=!1,this.uiManager=new Hi,this.themeManager=new Bi,this.sessionManager=new zi,this.advancedFeaturesManager=new qi}async init(){return b(async()=>{if(v.info("Application initialization started",{category:S.SYSTEM,version:"2.1.0",userAgent:navigator.userAgent.substring(0,100)}),document.readyState==="loading")return v.debug("Waiting for DOM ready",{category:S.SYSTEM}),new Promise(e=>{document.addEventListener("DOMContentLoaded",()=>e(this.init()))});if(this.container=document.getElementById("appContainer"),!this.container)throw v.critical("App container not found",{category:S.SYSTEM,containerId:"appContainer"}),new Error("Critical initialization failure: App container not found");return v.debug("App container found",{category:S.SYSTEM}),O.isValidSession()||(v.info("No valid session, redirecting to login",{category:S.AUTHENTICATION}),m.navigate("login")),v.info("Initializing core features",{category:S.SYSTEM}),await this.initializeCoreFeatures(),v.info("Skipping advanced features initialization",{category:S.SYSTEM}),this.setupRenderingSystem(),v.debug("Initializing UI manager",{category:S.SYSTEM}),this.uiManager.initialize(this.container),v.debug("Initializing theme manager",{category:S.SYSTEM}),this.themeManager.initialize(),v.debug("Initializing session manager",{category:S.SYSTEM}),this.sessionManager.initialize(),de(this.container),this.isInitialized=!0,v.info("Application initialization completed successfully",{category:S.SYSTEM,initializationTime:performance.now()}),!0},e=>{throw v.critical("Application initialization failed",{category:S.SYSTEM,error:e.message,stack:e.stack}),new Error(`App initialization failed: ${e.message}`)})}async initializeCoreFeatures(){return b(async()=>{const e=[this.uiManager.preloadCriticalComponents(),this.themeManager.loadSavedTheme(),this.sessionManager.validateStoredSession()],s=(await Promise.allSettled(e)).filter(r=>r.status==="rejected");if(s.length>0)throw new Error(`${s.length} core features failed to initialize`);return!0},e=>!1)}async initializeAdvancedFeatures(){b(async()=>(await this.advancedFeaturesManager.initialize(),!0),e=>!1)}setupRenderingSystem(){this.unsubscribe=m.subscribe(()=>{de(this.container),setTimeout(()=>this.uiManager.updateResearchMode(),200)}),window.addEventListener("languageChanged",()=>{this.uiManager.updateLanguage(),de(this.container)})}getStatus(){return{isInitialized:this.isInitialized,hasContainer:!!this.container,isAuthenticated:O.isValidSession(),ui:this.uiManager.getStatus(),theme:this.themeManager.getStatus(),session:this.sessionManager.getStatus(),advancedFeatures:this.advancedFeaturesManager.getStatus()}}destroy(){this.unsubscribe&&this.unsubscribe(),this.uiManager.destroy(),this.themeManager.destroy(),this.sessionManager.destroy(),this.advancedFeaturesManager.destroy(),this.isInitialized=!1}}async function Yi(){const a=new ji;try{return await a.init(),a}catch(e){throw new Error(`Failed to create application: ${e.message}`)}}const $e={comaIch:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_coma_ich",limitedIch:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_limited_data_ich",fullStroke:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_full_stroke",lvo:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_lvo"},At={comaIch:{gfap_value:100},limitedIch:{age_years:65,systolic_bp:140,diastolic_bp:80,gfap_value:100,vigilanzminderung:0},fullStroke:{age_years:65,systolic_bp:140,diastolic_bp:80,gfap_value:100,fast_ed_score:4,headache:0,vigilanzminderung:0,armparese:0,beinparese:0,eye_deviation:0,atrial_fibrillation:0,anticoagulated_noak:0,antiplatelets:0},lvo:{gfap_value:100,fast_ed_score:4}};class Qi{constructor(){this.warmupAttempts=0,this.successfulWarmups=0,this.warmupResults={},this.isWarming=!1}async warmupAllAPIs(e=!0){if(this.isWarming)return v.info("API warmup already in progress",{category:"WARMUP"}),this.warmupResults;this.isWarming=!0,this.warmupAttempts=0,this.successfulWarmups=0,this.warmupResults={},v.info("Starting API warmup process",{category:"WARMUP",endpoints:Object.keys($e).length});const t=Object.entries($e).map(async([s,r])=>{try{const i=await this.warmupSingleAPI(s,r,At[s]);return this.warmupResults[s]=i,i.success&&this.successfulWarmups++,i}catch(i){const n={success:!1,error:i.message,duration:0,timestamp:new Date().toISOString()};return this.warmupResults[s]=n,n}});return e?(Promise.all(t).then(()=>{this.completeWarmup()}).catch(s=>{v.error("Background API warmup failed",{category:"WARMUP",error:s.message}),this.isWarming=!1}),{status:"warming",message:"APIs warming up in background"}):(await Promise.all(t),this.completeWarmup(),this.warmupResults)}async warmupSingleAPI(e,t,s){const r=Date.now();this.warmupAttempts++;try{v.info(`Warming up ${e} API`,{category:"WARMUP",url:t});const i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":"iGFAP-Warmup/2.1.0"},body:JSON.stringify(s),signal:AbortSignal.timeout(1e4)}),n=Date.now()-r,l={success:!0,status:i.status,duration:n,message:`${e} API warmed up`,timestamp:new Date().toISOString()};return v.info(`Successfully warmed up ${e} API`,{category:"WARMUP",duration:n,status:i.status}),l}catch(i){const n=Date.now()-r;return i.name==="TypeError"&&i.message.includes("Failed to fetch")?(v.info(`${e} API warmup encountered CORS (expected), function still warmed`,{category:"WARMUP",duration:n}),{success:!0,status:"cors-blocked",duration:n,message:`${e} API warmed (CORS blocked but function activated)`,timestamp:new Date().toISOString()}):(v.warn(`Failed to warm up ${e} API`,{category:"WARMUP",error:i.message,duration:n}),{success:!1,error:i.message,duration:n,timestamp:new Date().toISOString()})}}completeWarmup(){this.isWarming=!1;const e={total:this.warmupAttempts,successful:this.successfulWarmups,failed:this.warmupAttempts-this.successfulWarmups,results:this.warmupResults};v.info("API warmup process completed",{category:"WARMUP",summary:e}),typeof window!="undefined"&&window.dispatchEvent(new CustomEvent("api-warmup-complete",{detail:e}))}getWarmupStatus(){return{isWarming:this.isWarming,attempts:this.warmupAttempts,successful:this.successfulWarmups,results:this.warmupResults}}async warmupCriticalAPIs(){const e=["comaIch","limitedIch"];v.info("Starting critical API warmup",{category:"WARMUP",apis:e});const t={};for(const s of e)$e[s]&&(t[s]=await this.warmupSingleAPI(s,$e[s],At[s]));return v.info("Critical API warmup completed",{category:"WARMUP",results:t}),t}}const Ct=new Qi;async function Yt(a={}){const{background:e=!0,criticalOnly:t=!1}=a;try{return t?await Ct.warmupCriticalAPIs():await Ct.warmupAllAPIs(e)}catch(s){return v.error("API warmup initialization failed",{category:"WARMUP",error:s.message}),{error:s.message}}}typeof window!="undefined"&&setTimeout(()=>{Yt({background:!0,criticalOnly:!1})},1e3);class Zi{constructor(){this.watchId=null,this.isTracking=!1,this.lastLocation=null,this.onLocationUpdate=null,this.onError=null,this.updateInterval=Q.gpsUpdateInterval,this.lastUpdateTime=null}isAvailable(){return"geolocation"in navigator}async getCurrentLocation(){if(!this.isAvailable())throw new Error("Geolocation not available in this browser");return new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(s=>{const r={latitude:s.coords.latitude,longitude:s.coords.longitude,accuracy:s.coords.accuracy,timestamp:new Date(s.timestamp).toISOString()};this.lastLocation=r,e(r)},s=>{t(this.handleGeolocationError(s))},{enableHighAccuracy:Q.gpsHighAccuracy,timeout:Q.gpsTimeout,maximumAge:Q.gpsMaxAge})})}start(e,t){if(!this.isAvailable()){const s=new Error("Geolocation not available");return t&&t(s),!1}return this.isTracking?(console.warn("[GPSTracker] Already tracking"),!0):(this.onLocationUpdate=e,this.onError=t,this.watchId=navigator.geolocation.watchPosition(s=>{const r=Date.now();if(this.lastUpdateTime&&r-this.lastUpdateTime<this.updateInterval)return;this.lastUpdateTime=r;const i={latitude:s.coords.latitude,longitude:s.coords.longitude,accuracy:s.coords.accuracy,timestamp:new Date(s.timestamp).toISOString()};this.lastLocation=i,console.log("[GPSTracker] Location update:",{lat:i.latitude.toFixed(6),lng:i.longitude.toFixed(6),accuracy:`${i.accuracy.toFixed(0)}m`}),this.onLocationUpdate&&this.onLocationUpdate(i)},s=>{const r=this.handleGeolocationError(s);console.error("[GPSTracker] Error:",r),this.onError&&this.onError(r)},{enableHighAccuracy:Q.gpsHighAccuracy,timeout:Q.gpsTimeout,maximumAge:Q.gpsMaxAge}),this.isTracking=!0,console.log("[GPSTracker] Started tracking"),!0)}stop(){this.watchId!==null&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null,this.isTracking=!1,console.log("[GPSTracker] Stopped tracking"))}getStatus(){return{isTracking:this.isTracking,hasLocation:this.lastLocation!==null,lastLocation:this.lastLocation,lastUpdateTime:this.lastUpdateTime?new Date(this.lastUpdateTime).toISOString():null}}handleGeolocationError(e){return{[e.PERMISSION_DENIED]:{code:"PERMISSION_DENIED",message:"Location permission denied. Please enable location access.",userMessage:"Bitte aktivieren Sie die Standortfreigabe / Please enable location access",recoverable:!1},[e.POSITION_UNAVAILABLE]:{code:"POSITION_UNAVAILABLE",message:"Location information unavailable.",userMessage:"Standort nicht verfügbar / Location unavailable",recoverable:!0},[e.TIMEOUT]:{code:"TIMEOUT",message:"Location request timed out.",userMessage:"Standortabfrage Zeitüberschreitung / Location timeout",recoverable:!0}}[e.code]||{code:"UNKNOWN",message:e.message||"Unknown GPS error",userMessage:"GPS-Fehler / GPS error",recoverable:!0}}async requestPermission(){if(!("permissions"in navigator))try{return await this.getCurrentLocation(),"granted"}catch(e){return"denied"}try{return(await navigator.permissions.query({name:"geolocation"})).state}catch(e){return console.warn("[GPSTracker] Permission query not supported"),"prompt"}}}const we=new Zi;class Ji{constructor(){me(this,"handleEscKey",e=>{e.key==="Escape"&&this.close()});this.currentLocation=null,this.hospitals=[],this.selectedHospital=null,this.onSelect=null}async show(e){this.onSelect=e;try{this.currentLocation=await we.getCurrentLocation(),this.hospitals=this.getNearbyHospitals(this.currentLocation,50),this.render(),this.attachEventListeners()}catch(t){console.error("[HospitalSelector] Error:",t),this.showError(t.message)}}getNearbyHospitals(e,t){const s=[];return Object.values(zt).forEach(i=>{i.neurosurgicalCenters&&s.push(...i.neurosurgicalCenters),i.comprehensiveStrokeCenters&&s.push(...i.comprehensiveStrokeCenters),i.regionalStrokeUnits&&s.push(...i.regionalStrokeUnits)}),s.map(i=>({...i,distance:this.calculateDistance(e.latitude,e.longitude,i.coordinates.lat,i.coordinates.lng)})).filter(i=>i.distance<=t).sort((i,n)=>{const l=h=>{let d=0;return h.neurosurgery&&(d+=100),h.thrombectomy&&(d+=50),h.thrombolysis&&(d+=25),d},c=l(n)-l(i);return c!==0?c:i.distance-n.distance}).slice(0,10)}calculateDistance(e,t,s,r){const n=this.toRad(s-e),l=this.toRad(r-t),c=Math.sin(n/2)*Math.sin(n/2)+Math.cos(this.toRad(e))*Math.cos(this.toRad(s))*Math.sin(l/2)*Math.sin(l/2),h=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c));return Math.round(6371*h*10)/10}toRad(e){return e*Math.PI/180}render(){const e=`
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
            ${this.hospitals.length>0?this.hospitals.map((s,r)=>this.renderHospitalCard(s,r)).join(""):'<p class="no-hospitals">Keine Krankenhäuser in der Nähe gefunden / No nearby hospitals found</p>'}
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
    `}attachEventListeners(){const e=document.getElementById("hospitalSelectorModal");if(!e)return;const t=document.getElementById("closeHospitalSelector");t&&t.addEventListener("click",()=>this.close());const s=document.getElementById("cancelHospitalSelect");s&&s.addEventListener("click",()=>this.close()),e.querySelectorAll(".select-hospital-button").forEach(i=>{i.addEventListener("click",n=>{const l=parseInt(n.target.dataset.hospitalIndex);this.selectHospital(l)})}),e.addEventListener("click",i=>{i.target===e&&this.close()}),document.addEventListener("keydown",this.handleEscKey)}selectHospital(e){this.selectedHospital=this.hospitals[e],console.log("[HospitalSelector] Hospital selected:",this.selectedHospital.name),this.onSelect&&this.onSelect(this.selectedHospital),this.close()}showError(e){var r;const t=`
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
    `,s=document.createElement("div");s.innerHTML=t,document.body.appendChild(s.firstElementChild),(r=document.getElementById("closeHospitalSelector"))==null||r.addEventListener("click",()=>this.close())}close(){const e=document.getElementById("hospitalSelectorModal");e&&e.remove(),document.removeEventListener("keydown",this.handleEscKey)}}const Xi=new Ji;class ea{constructor(){this.apiKey=Q.googleMapsApiKey,this.directionsService=null,this.mapsLoaded=!1}async loadGoogleMaps(){return this.mapsLoaded&&window.google&&window.google.maps?!0:this.apiKey==="YOUR_GOOGLE_MAPS_API_KEY_HERE"?(console.warn("[ETACalculator] Google Maps API key not configured, using fallback"),!1):new Promise(e=>{if(window.google&&window.google.maps){this.mapsLoaded=!0,this.directionsService=new google.maps.DirectionsService,e(!0);return}const t=document.createElement("script");t.src=`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=geometry`,t.async=!0,t.defer=!0,t.onload=()=>{this.mapsLoaded=!0,this.directionsService=new google.maps.DirectionsService,console.log("[ETACalculator] Google Maps loaded"),e(!0)},t.onerror=()=>{console.error("[ETACalculator] Failed to load Google Maps"),e(!1)},document.head.appendChild(t)})}async calculateETA(e,t){if(await this.loadGoogleMaps())try{return await this.calculateGoogleMapsETA(e,t)}catch(s){console.warn("[ETACalculator] Google Maps failed, falling back:",s)}return this.calculateSimpleETA(e,t)}async calculateGoogleMapsETA(e,t){return new Promise((s,r)=>{this.directionsService.route({origin:new google.maps.LatLng(e.lat,e.lng),destination:new google.maps.LatLng(t.lat,t.lng),travelMode:google.maps.TravelMode.DRIVING,drivingOptions:{departureTime:new Date,trafficModel:google.maps.TrafficModel.PESSIMISTIC}},(i,n)=>{if(n===google.maps.DirectionsStatus.OK){const l=i.routes[0],c=l.legs[0],h=c.duration.value,u=Math.round(h*.7),g={duration:Math.round(u/60),distance:Math.round(c.distance.value/1e3),arrivalTime:new Date(Date.now()+u*1e3).toISOString(),route:this.encodeRoute(l),source:"google_maps"};console.log("[ETACalculator] Google Maps ETA:",{duration:`${g.duration} min`,distance:`${g.distance} km`}),s(g)}else r(new Error(`Google Maps Directions failed: ${n}`))})})}calculateSimpleETA(e,t){const s=this.calculateDistance(e.lat,e.lng,t.lat,t.lng),i=Math.round(s/80*60),n={duration:i,distance:Math.round(s*10)/10,arrivalTime:new Date(Date.now()+i*60*1e3).toISOString(),route:null,source:"estimated"};return console.log("[ETACalculator] Simple ETA:",{duration:`${n.duration} min`,distance:`${n.distance} km`}),n}calculateDistance(e,t,s,r){const n=this.toRad(s-e),l=this.toRad(r-t),c=Math.sin(n/2)*Math.sin(n/2)+Math.cos(this.toRad(e))*Math.cos(this.toRad(s))*Math.sin(l/2)*Math.sin(l/2);return 6371*(2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c)))}toRad(e){return e*Math.PI/180}encodeRoute(e){if(!e||!e.overview_path)return null;const t=e.overview_path,s=[];for(let r=0;r<t.length;r+=10)s.push({lat:t[r].lat(),lng:t[r].lng()});if(t.length>0){const r=t[t.length-1];s.push({lat:r.lat(),lng:r.lng()})}return s}async updateETA(e,t,s){const r=await this.calculateETA(e,t);return s&&Math.abs(r.duration-s.duration)>2&&console.log("[ETACalculator] ETA changed significantly:",{previous:`${s.duration} min`,new:`${r.duration} min`}),r}}const It=new ea;class ta{constructor(){this.baseUrl=Q.caseSharingUrl,this.activeCase=null,this.updateInterval=null,this.retryCount=0,this.maxRetries=3}async sendCase(e,t,s,r){try{console.log("[CaseTransmitter] Sending case to hospital:",r.name);const i=await we.getCurrentLocation(),n=await It.calculateETA({lat:i.latitude,lng:i.longitude},{lat:r.coordinates.lat,lng:r.coordinates.lng}),l={results:e,formData:this.sanitizeFormData(t),moduleType:s,location:{lat:i.latitude,lng:i.longitude,accuracy:i.accuracy,timestamp:i.timestamp},destination:{lat:r.coordinates.lat,lng:r.coordinates.lng},hospitalId:r.id,hospitalName:r.name,estimatedArrival:n.arrivalTime,distance:n.distance,duration:n.duration,ambulanceId:this.generateAmbulanceId()},c=await this.sendWithRetry(`${this.baseUrl}/store-case`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!c.success)throw new Error(c.error||"Failed to store case");return console.log("[CaseTransmitter] Case created:",c.caseId),this.activeCase={caseId:c.caseId,hospital:r,startTime:Date.now()},this.startLocationTracking(),{success:!0,caseId:c.caseId,eta:n.duration}}catch(i){throw console.error("[CaseTransmitter] Failed to send case:",i),i}}startLocationTracking(){this.activeCase&&(console.log("[CaseTransmitter] Starting location tracking for case:",this.activeCase.caseId),we.start(async e=>{await this.updateLocation(e)},e=>{console.error("[CaseTransmitter] GPS error:",e)}))}async updateLocation(e){if(this.activeCase)try{const t=await It.calculateETA({lat:e.latitude,lng:e.longitude},{lat:this.activeCase.hospital.coordinates.lat,lng:this.activeCase.hospital.coordinates.lng}),s={caseId:this.activeCase.caseId,location:{lat:e.latitude,lng:e.longitude,accuracy:e.accuracy,timestamp:e.timestamp},estimatedArrival:t.arrivalTime,distance:t.distance,duration:t.duration};(await this.sendWithRetry(`${this.baseUrl}/update-location`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).success&&(console.log("[CaseTransmitter] Location updated:",{eta:`${t.duration} min`,distance:`${t.distance} km`}),this.retryCount=0)}catch(t){console.error("[CaseTransmitter] Failed to update location:",t)}}stopTracking(){this.activeCase&&(console.log("[CaseTransmitter] Stopping tracking for case:",this.activeCase.caseId),we.stop(),this.markArrived(this.activeCase.caseId).catch(e=>{console.error("[CaseTransmitter] Failed to mark arrived:",e)}),this.activeCase=null)}async markArrived(e){try{const t=await this.sendWithRetry(`${this.baseUrl}/mark-arrived`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({caseId:e})});return console.log("[CaseTransmitter] Case marked as arrived"),t}catch(t){throw console.error("[CaseTransmitter] Failed to mark arrived:",t),t}}async sendWithRetry(e,t,s=1){try{const r=await fetch(e,{...t,timeout:1e4});if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);return await r.json()}catch(r){if(s<this.maxRetries)return console.warn(`[CaseTransmitter] Retry ${s}/${this.maxRetries}:`,r.message),await this.sleep(1e3*Math.pow(2,s-1)),this.sendWithRetry(e,t,s+1);throw r}}sanitizeFormData(e){const t={...e};return["name","patientName","id","patientId","ssn","insurance"].forEach(r=>{t[r]&&delete t[r]}),t}generateAmbulanceId(){const e="RTW",t=["M","K","S","B"][Math.floor(Math.random()*4)],s=Math.floor(1e3+Math.random()*9e3);return`${e}-${t}-${s}`}getStatus(){if(!this.activeCase)return{isTracking:!1};const e=we.getStatus();return{isTracking:!0,caseId:this.activeCase.caseId,hospital:this.activeCase.hospital.name,startTime:new Date(this.activeCase.startTime).toISOString(),duration:Math.floor((Date.now()-this.activeCase.startTime)/1e3/60),gpsActive:e.isTracking,hasLocation:e.hasLocation,lastUpdate:e.lastUpdateTime}}sleep(e){return new Promise(t=>setTimeout(t,e))}}const He=new ta;function sa(){document.addEventListener("click",async a=>{const e=a.target.closest("#shareToKiosk");e&&await ia(e),a.target.closest("#stopTracking")&&na()}),console.log("[KioskHandlers] Kiosk handlers initialized")}async function ia(a){var e;try{if(He.getStatus().isTracking){if(!confirm(`Ein Case wird bereits verfolgt. Möchten Sie diesen stoppen und einen neuen senden?

A case is already being tracked. Do you want to stop it and send a new one?`))return;He.stopTracking(),(e=document.getElementById("trackingStatus"))==null||e.remove()}a.disabled=!0,a.classList.add("sending");const s=a.textContent;a.textContent="⏳ Krankenhaus auswählen... / Selecting Hospital...",Xi.show(async r=>{try{a.textContent="📡 Sende Case... / Sending Case...";const i=m.getState(),{results:n,formData:l}=i;if(!n||!n.ich)throw new Error("No assessment results available");const c=aa(n);console.log("[KioskHandlers] Sending case:",{moduleType:c,hospital:r.name,ichRisk:Math.round(n.ich.probability*100)});const h=await He.sendCase(n,l,c,r);a.classList.remove("sending"),a.classList.add("success"),a.textContent=`✓ Gesendet an / Sent to ${r.name}`,a.disabled=!1,ra(h.caseId,r,h.eta),setTimeout(()=>{a.classList.remove("success"),a.textContent=s},5e3)}catch(i){console.error("[KioskHandlers] Failed to send case:",i),oa(a,s,i)}})}catch(t){console.error("[KioskHandlers] Hospital selection error:",t),a.classList.remove("sending"),a.textContent="❌ Fehler / Error - Try Again",a.disabled=!1}}function aa(a){if(!a.ich||!a.ich.module)return"unknown";const e=a.ich.module.toLowerCase();return e.includes("coma")?"coma":e.includes("limited")?"limited":e.includes("full")?"full":"unknown"}function ra(a,e,t){const s=document.getElementById("trackingStatus");s&&s.remove();const r=`
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
          <span class="detail-value">${a}</span>
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
  `,i=document.querySelector(".results-actions");i&&(i.insertAdjacentHTML("afterend",r),setTimeout(()=>{var n;(n=document.getElementById("trackingStatus"))==null||n.scrollIntoView({behavior:"smooth",block:"nearest"})},100))}function na(){if(confirm(`Möchten Sie das Live-Tracking beenden?

Do you want to stop live tracking?`)){He.stopTracking();const e=document.getElementById("trackingStatus");e&&(e.style.transition="opacity 0.3s ease",e.style.opacity="0",setTimeout(()=>{e.remove()},300)),console.log("[KioskHandlers] Tracking stopped by user")}}function oa(a,e,t){a.classList.remove("sending"),a.classList.add("error");let s="❌ Fehler / Error";t.message.includes("GPS")||t.message.includes("location")?s="❌ GPS-Fehler / GPS Error":(t.message.includes("network")||t.message.includes("fetch"))&&(s="❌ Netzwerkfehler / Network Error"),a.textContent=s,a.disabled=!1,setTimeout(()=>{a.classList.remove("error"),a.textContent=e},3e3)}const la={BASE_URL:"/0825/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};let U=null;async function Qt(){return b(async()=>{U=await Yi(),setTimeout(()=>{Yt({background:!0,criticalOnly:!1}).then(t=>{console.info("[Main] API warmup started:",t.status||"completed")}).catch(t=>{console.warn("[Main] API warmup failed:",t.message)})},2e3);const a=U.getStatus(),e=new CustomEvent("appInitialized",{detail:{timestamp:new Date().toISOString(),status:a,version:"2.1.0",build:"production"}});return document.dispatchEvent(e),U},a=>{throw ca(a),a})}function ca(a){const e=document.getElementById("appContainer");e&&(e.innerHTML=`
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
          Error: ${a.message||"Unknown initialization error"}
        </small>
      </div>
    `);const t=new CustomEvent("appInitializationFailed",{detail:{error:a.message,timestamp:new Date().toISOString(),userAgent:navigator.userAgent.substring(0,100)}});document.dispatchEvent(t)}function Lt(){if(U)try{U.destroy()}catch(a){}}function da(){document.addEventListener("visibilitychange",()=>{U&&document.visibilityState==="visible"&&(U.getStatus().isAuthenticated||window.location.reload())}),window.addEventListener("beforeunload",Lt),window.addEventListener("unload",Lt)}async function Mt(){try{try{if(["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!(import.meta&&la&&!1)&&"serviceWorker"in navigator){const s=await navigator.serviceWorker.getRegistrations();for(const r of s)try{await r.unregister()}catch(i){}window.addEventListener("beforeinstallprompt",r=>{r.preventDefault()})}}catch(t){}da(),await Qt();const a=ze();if(a.isKioskMode){console.log("[Main] Kiosk mode detected - loading case:",a.caseId);try{await ni(a.caseId);const t=document.getElementById("appContainer");t&&de(t)}catch(t){console.error("[Main] Failed to load kiosk case:",t);const s=document.getElementById("appContainer");s&&(s.innerHTML=`
            <div class="container" style="text-align: center; padding: 40px;">
              <h2>⚠️ Case Not Found</h2>
              <p>The requested case could not be loaded.</p>
              <button onclick="window.location.href='https://igfap.eu/kiosk/'" class="primary">
                🏠 Return to Case List
              </button>
            </div>
          `);return}}sa();const e=new CustomEvent("appReady",{detail:{timestamp:new Date().toISOString(),version:"2.1.0"}});document.dispatchEvent(e)}catch(a){}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Mt):Mt();typeof window!="undefined"&&(window.iGFAPApp={getApp:()=>U,getStatus:()=>(U==null?void 0:U.getStatus())||{error:"App not initialized"},restart:async()=>(U&&U.destroy(),Qt()),getCurrentScreen:()=>{try{return m.getState().currentScreen}catch(a){return"unknown"}},forceResults:()=>{try{m.navigate("results");const a=document.getElementById("appContainer");return a&&de(a),!0}catch(a){return!1}}});class fe{constructor(e,t,s={}){this.name=e,this.description=t,this.metadata={...s,id:`cmd_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,timestamp:new Date().toISOString()},this.executed=!1,this.undone=!1}async execute(){if(this.executed&&!this.undone)throw new Error(`Command ${this.name} has already been executed`);try{f.publish(y.AUDIT_EVENT,{action:"command_execute_start",command:this.name,commandId:this.metadata.id});const e=await this.doExecute();return this.executed=!0,this.undone=!1,f.publish(y.AUDIT_EVENT,{action:"command_execute_success",command:this.name,commandId:this.metadata.id}),e}catch(e){throw f.publish(y.AUDIT_EVENT,{action:"command_execute_error",command:this.name,commandId:this.metadata.id,error:e.message}),e}}async undo(){if(!this.executed||this.undone)throw new Error(`Command ${this.name} cannot be undone`);try{f.publish(y.AUDIT_EVENT,{action:"command_undo_start",command:this.name,commandId:this.metadata.id});const e=await this.doUndo();return this.undone=!0,f.publish(y.AUDIT_EVENT,{action:"command_undo_success",command:this.name,commandId:this.metadata.id}),e}catch(e){throw f.publish(y.AUDIT_EVENT,{action:"command_undo_error",command:this.name,commandId:this.metadata.id,error:e.message}),e}}async doExecute(){throw new Error("doExecute() must be implemented by concrete command")}async doUndo(){throw new Error("doUndo() must be implemented by concrete command")}canUndo(){return this.executed&&!this.undone}getSummary(){return{name:this.name,description:this.description,id:this.metadata.id,timestamp:this.metadata.timestamp,executed:this.executed,undone:this.undone}}}class ua extends fe{constructor(e,t,s,r){super("UPDATE_PATIENT_DATA",`Update ${e} from ${s} to ${t}`,{fieldName:e,newValue:t,previousValue:s}),this.fieldName=e,this.newValue=t,this.previousValue=s,this.store=r}async doExecute(){const e=this.store.getFormData("current")||{};return e[this.fieldName]=this.newValue,this.store.setFormData("current",e),f.publish(y.PATIENT_DATA_UPDATED,{field:this.fieldName,newValue:this.newValue,previousValue:this.previousValue}),{field:this.fieldName,value:this.newValue}}async doUndo(){const e=this.store.getFormData("current")||{};return this.previousValue===null||this.previousValue===void 0?delete e[this.fieldName]:e[this.fieldName]=this.previousValue,this.store.setFormData("current",e),f.publish(y.PATIENT_DATA_UPDATED,{field:this.fieldName,newValue:this.previousValue,previousValue:this.newValue,action:"undo"}),{field:this.fieldName,value:this.previousValue}}}class ha extends fe{constructor(e,t,s){super("NAVIGATE",`Navigate from ${t} to ${e}`,{targetScreen:e,sourceScreen:t}),this.targetScreen=e,this.sourceScreen=t,this.store=s}async doExecute(){return this.store.navigate(this.targetScreen),f.publish(y.NAVIGATION_CHANGED,{from:this.sourceScreen,to:this.targetScreen}),{from:this.sourceScreen,to:this.targetScreen}}async doUndo(){return this.store.navigate(this.sourceScreen),f.publish(y.NAVIGATION_CHANGED,{from:this.targetScreen,to:this.sourceScreen,action:"undo"}),{from:this.targetScreen,to:this.sourceScreen}}}class ma extends fe{constructor(e,t,s){super("SUBMIT_FORM",`Submit ${t} form for prediction`,{moduleType:t,formFields:Object.keys(e)}),this.formData={...e},this.moduleType=t,this.predictionStrategy=s,this.results=null}async doExecute(){return this.predictionStrategy.setStrategy(this.getStrategyName()),this.results=await this.predictionStrategy.predict(this.formData),f.publish(y.FORM_SUBMITTED,{moduleType:this.moduleType,fieldsCount:Object.keys(this.formData).length,success:!0}),this.results}async doUndo(){return this.results=null,f.publish(y.FORM_SUBMITTED,{moduleType:this.moduleType,action:"undo"}),null}getStrategyName(){switch(this.moduleType){case"coma":return"COMA_ICH";case"limited":return"LIMITED_DATA_ICH";case"full":return"FULL_STROKE";default:throw new Error(`Unknown module type: ${this.moduleType}`)}}}class ga extends fe{constructor(e,t){super("CLEAR_DATA",`Clear ${e} data for privacy compliance`,{dataType:e}),this.dataType=e,this.store=t,this.backupData=null}async doExecute(){switch(this.backupData=this.store.getState(),this.dataType){case"all":this.store.reset();break;case"forms":this.store.clearFormData();break;case"results":this.store.clearResults();break;default:throw new Error(`Unknown data type: ${this.dataType}`)}return f.publish(y.AUDIT_EVENT,{action:"data_cleared",dataType:this.dataType}),{dataType:this.dataType,cleared:!0}}async doUndo(){if(this.backupData)return this.store.setState(this.backupData),f.publish(y.AUDIT_EVENT,{action:"data_restored",dataType:this.dataType}),{dataType:this.dataType,restored:!0};throw new Error("Cannot undo data clear: backup not available")}}class Zt{constructor(){this.commandHistory=[],this.currentIndex=-1,this.maxHistorySize=100}async executeCommand(e){if(!(e instanceof fe))throw new Error("Command must extend MedicalCommand");const t=await e.execute();return this.commandHistory=this.commandHistory.slice(0,this.currentIndex+1),this.commandHistory.push(e),this.currentIndex=this.commandHistory.length-1,this.commandHistory.length>this.maxHistorySize&&(this.commandHistory.shift(),this.currentIndex-=1),t}async undo(){if(this.currentIndex<0)throw new Error("No commands to undo");const e=this.commandHistory[this.currentIndex];if(!e.canUndo())throw new Error(`Command ${e.name} cannot be undone`);const t=await e.undo();return this.currentIndex-=1,t}async redo(){if(this.currentIndex>=this.commandHistory.length-1)throw new Error("No commands to redo");return this.currentIndex+=1,await this.commandHistory[this.currentIndex].execute()}canUndo(){return this.currentIndex>=0&&this.commandHistory[this.currentIndex]&&this.commandHistory[this.currentIndex].canUndo()}canRedo(){return this.currentIndex<this.commandHistory.length-1}getCommandHistory(){return this.commandHistory.map(e=>e.getSummary())}clearHistory(){this.commandHistory=[],this.currentIndex=-1}getStats(){return{totalCommands:this.commandHistory.length,currentIndex:this.currentIndex,canUndo:this.canUndo(),canRedo:this.canRedo(),executedCommands:this.currentIndex+1}}}const pa=new Zt,fa=Object.freeze(Object.defineProperty({__proto__:null,ClearDataCommand:ga,MedicalCommand:fe,MedicalCommandInvoker:Zt,NavigationCommand:ha,SubmitFormCommand:ma,UpdatePatientDataCommand:ua,medicalCommandInvoker:pa},Symbol.toStringTag,{value:"Module"}));class Ve{constructor(e,t){this.name=e,this.description=t,this.requiredFields=[],this.optionalFields=[]}validateInput(e){const t=[],s=[];return this.requiredFields.forEach(r=>{(!(r in e)||e[r]===null||e[r]===void 0)&&s.push(r)}),s.length>0&&t.push(`Missing required fields: ${s.join(", ")}`),{isValid:t.length===0,errors:t,missingFields:s}}preprocessInput(e){return{...e}}async predict(e){throw new Error("predict() method must be implemented by concrete strategy")}postprocessResult(e,t){return{...e,strategy:this.name,timestamp:new Date().toISOString(),inputSummary:this.createInputSummary(t)}}createInputSummary(e){const t={};return[...this.requiredFields,...this.optionalFields].forEach(s=>{s in e&&(t[s]=typeof e[s])}),t}}class ya extends Ve{constructor(){super("COMA_ICH","ICH prediction for comatose patients"),this.requiredFields=["gfap"],this.optionalFields=["age","symptoms_duration"]}preprocessInput(e){return{gfap:parseFloat(e.gfap),patientType:"comatose"}}async predict(e){const t=this.validateInput(e);if(!t.isValid)throw new Error(`Validation failed: ${t.errors.join(", ")}`);const s=this.preprocessInput(e);f.publish(y.ASSESSMENT_STARTED,{strategy:this.name,inputFields:Object.keys(s)});try{const r=await Pt(s),i=this.postprocessResult(r,e);return f.publish(y.RESULTS_GENERATED,{strategy:this.name,success:!0,confidence:i.confidence}),i}catch(r){throw f.publish(y.SECURITY_EVENT,{type:"prediction_error",strategy:this.name,error:r.message}),r}}}class ba extends Ve{constructor(){super("LIMITED_DATA_ICH","ICH prediction with limited clinical data"),this.requiredFields=["gfap","age","systolic_bp","diastolic_bp"],this.optionalFields=["weakness_sudden","speech_sudden","vigilanzminderung"]}preprocessInput(e){return{gfap:parseFloat(e.gfap),age:parseInt(e.age,10),systolic_bp:parseFloat(e.systolic_bp),diastolic_bp:parseFloat(e.diastolic_bp),weakness_sudden:e.weakness_sudden===!0||e.weakness_sudden==="true",speech_sudden:e.speech_sudden===!0||e.speech_sudden==="true",vigilanzminderung:e.vigilanzminderung===!0||e.vigilanzminderung==="true"}}async predict(e){const t=this.validateInput(e);if(!t.isValid)throw new Error(`Validation failed: ${t.errors.join(", ")}`);const s=this.preprocessInput(e);f.publish(y.ASSESSMENT_STARTED,{strategy:this.name,inputFields:Object.keys(s)});try{const r=await _t(s),i=this.postprocessResult(r,e);return f.publish(y.RESULTS_GENERATED,{strategy:this.name,success:!0,confidence:i.confidence}),i}catch(r){throw f.publish(y.SECURITY_EVENT,{type:"prediction_error",strategy:this.name,error:r.message}),r}}}class va extends Ve{constructor(){super("FULL_STROKE","Comprehensive stroke prediction with full clinical data"),this.requiredFields=["gfap","age","systolic_bp","diastolic_bp","fast_ed_score","sex","facialtwitching","armparese","speechdeficit","gaze","agitation"],this.optionalFields=["strokeOnsetKnown","medical_history"]}preprocessInput(e){return{gfap:parseFloat(e.gfap),age:parseInt(e.age,10),systolic_bp:parseFloat(e.systolic_bp),diastolic_bp:parseFloat(e.diastolic_bp),fast_ed_score:parseInt(e.fast_ed_score,10),sex:e.sex==="male"?1:0,facialtwitching:e.facialtwitching===!0||e.facialtwitching==="true",armparese:e.armparese===!0||e.armparese==="true",speechdeficit:e.speechdeficit===!0||e.speechdeficit==="true",gaze:e.gaze===!0||e.gaze==="true",agitation:e.agitation===!0||e.agitation==="true",strokeOnsetKnown:e.strokeOnsetKnown===!0||e.strokeOnsetKnown==="true"}}async predict(e){const t=this.validateInput(e);if(!t.isValid)throw new Error(`Validation failed: ${t.errors.join(", ")}`);const s=this.preprocessInput(e);f.publish(y.ASSESSMENT_STARTED,{strategy:this.name,inputFields:Object.keys(s)});try{const r=await Rt(s),i=this.postprocessResult(r,e);return f.publish(y.RESULTS_GENERATED,{strategy:this.name,success:!0,confidence:i.confidence}),i}catch(r){throw f.publish(y.SECURITY_EVENT,{type:"prediction_error",strategy:this.name,error:r.message}),r}}}class Jt{constructor(){this.strategies=new Map,this.currentStrategy=null,this.predictionHistory=[],this.registerStrategy(new ya),this.registerStrategy(new ba),this.registerStrategy(new va)}registerStrategy(e){if(!(e instanceof Ve))throw new Error("Strategy must extend PredictionStrategy");this.strategies.set(e.name,e)}setStrategy(e){const t=this.strategies.get(e);if(!t)throw new Error(`Unknown strategy: ${e}`);this.currentStrategy=t}async predict(e){if(!this.currentStrategy)throw new Error("No prediction strategy selected");const t=performance.now();try{const s=await this.currentStrategy.predict(e),r=performance.now()-t;return this.predictionHistory.push({strategy:this.currentStrategy.name,timestamp:new Date().toISOString(),duration:r,success:!0}),s}catch(s){const r=performance.now()-t;throw this.predictionHistory.push({strategy:this.currentStrategy.name,timestamp:new Date().toISOString(),duration:r,success:!1,error:s.message}),s}}getAvailableStrategies(){return Array.from(this.strategies.keys())}getStrategyInfo(e){const t=this.strategies.get(e);return t?{name:t.name,description:t.description,requiredFields:t.requiredFields,optionalFields:t.optionalFields}:null}getPredictionHistory(){return[...this.predictionHistory]}clearHistory(){this.predictionHistory=[]}}const Sa=new Jt,ka={COMA_ICH:"COMA_ICH",LIMITED_DATA_ICH:"LIMITED_DATA_ICH",FULL_STROKE:"FULL_STROKE"},wa=Object.freeze(Object.defineProperty({__proto__:null,PREDICTION_STRATEGIES:ka,PredictionContext:Jt,predictionContext:Sa},Symbol.toStringTag,{value:"Module"}));class Ea{constructor(e,t=!1){this.name=e,this.required=t,this.validators=[],this.medicalChecks=[]}addValidator(e){return this.validators.push(e),this}addMedicalCheck(e){return this.medicalChecks.push(e),this}validate(e,t=null){const s=[];this.required&&!e&&e!==0&&s.push("This field is required");for(const r of this.validators){const i=r(e);i&&s.push(i)}for(const r of this.medicalChecks){const i=r(e,t);i&&s.push(i)}return s}toConfig(){return{required:this.required,validate:(e,t)=>this.validate(e,t)}}}class Ce extends Ea{constructor(e,t=!1,s=null,r=null){super(e,t),this.min=s,this.max=r,this.type="number",s!==null&&this.addValidator(i=>i!==""&&!isNaN(i)&&parseFloat(i)<s?`Value must be at least ${s}`:null),r!==null&&this.addValidator(i=>i!==""&&!isNaN(i)&&parseFloat(i)>r?`Value must be at most ${r}`:null)}toConfig(){return{...super.toConfig(),min:this.min,max:this.max,type:this.type}}}class Ta extends Ce{constructor(e,t,s){super(e,!0,s.min,s.max),this.biomarkerType=t,this.ranges=s,this.addMedicalCheck(r=>{const i=parseFloat(r);return isNaN(i)?null:t==="GFAP"&&i>s.critical?"Extremely high GFAP value - please verify lab result":null})}}class Aa extends Ce{constructor(e,t,s,r){super(e,!0,s,r),this.vitalType=t,this.addMedicalCheck((i,n)=>{const l=parseFloat(i);if(isNaN(l))return null;switch(t){case"SYSTOLIC_BP":if(n!=null&&n.diastolic_bp){const c=parseFloat(n.diastolic_bp);if(!isNaN(c)&&l<=c)return"Systolic BP must be higher than diastolic BP"}break;case"DIASTOLIC_BP":if(n!=null&&n.systolic_bp){const c=parseFloat(n.systolic_bp);if(!isNaN(c)&&l>=c)return"Diastolic BP must be lower than systolic BP"}break}return null})}}class Ca extends Ce{constructor(e){super(e,!0,0,120),this.addMedicalCheck(t=>{const s=parseFloat(t);return isNaN(s)?null:s<18?"Emergency stroke assessment typically for adults (≥18 years)":null})}}class Ia extends Ce{constructor(e,t,s,r){super(e,!0,s,r),this.scaleType=t,this.addMedicalCheck(i=>{const n=parseFloat(i);if(isNaN(n))return null;switch(t){case"GCS":if(n<8)return"GCS < 8 indicates severe consciousness impairment - consider coma module";break;case"FAST_ED":if(n>=4)return"High FAST-ED score suggests LVO - consider urgent intervention";break}return null})}}class La{static createRule(e,t,s={}){switch(e){case"AGE":return new Ca(t);case"BIOMARKER":if(s.biomarkerType==="GFAP")return new Ta(t,"GFAP",K);throw new Error(`Unsupported biomarker type: ${s.biomarkerType}`);case"VITAL_SIGN":return new Aa(t,s.vitalType,s.min,s.max);case"CLINICAL_SCALE":return new Ia(t,s.scaleType,s.min,s.max);case"NUMERIC":return new Ce(t,s.required,s.min,s.max);default:throw new Error(`Unsupported validation rule type: ${e}`)}}static createModuleValidation(e){const t={};switch(e){case"LIMITED":t.age_years=this.createRule("AGE","age_years").toConfig(),t.systolic_bp=this.createRule("VITAL_SIGN","systolic_bp",{vitalType:"SYSTOLIC_BP",min:60,max:300}).toConfig(),t.diastolic_bp=this.createRule("VITAL_SIGN","diastolic_bp",{vitalType:"DIASTOLIC_BP",min:30,max:200}).toConfig(),t.gfap_value=this.createRule("BIOMARKER","gfap_value",{biomarkerType:"GFAP"}).toConfig();break;case"FULL":Object.assign(t,this.createModuleValidation("LIMITED")),t.fast_ed_score=this.createRule("CLINICAL_SCALE","fast_ed_score",{scaleType:"FAST_ED",min:0,max:9}).toConfig();break;case"COMA":t.gfap_value=this.createRule("BIOMARKER","gfap_value",{biomarkerType:"GFAP"}).toConfig(),t.gcs=this.createRule("CLINICAL_SCALE","gcs",{scaleType:"GCS",min:3,max:15}).toConfig();break;default:throw new Error(`Unsupported module type: ${e}`)}return t}static validateModule(e,t){const s=this.createModuleValidation(t),r={};let i=!0;return Object.entries(s).forEach(([n,l])=>{const c=e[n],h=l.validate(c,e);h.length>0&&(r[n]=h,i=!1)}),{isValid:i,validationErrors:r}}}const Ma={AGE:"AGE",BIOMARKER:"BIOMARKER",VITAL_SIGN:"VITAL_SIGN",CLINICAL_SCALE:"CLINICAL_SCALE",NUMERIC:"NUMERIC"},Ra={GFAP:"GFAP"},_a={SYSTOLIC_BP:"SYSTOLIC_BP",DIASTOLIC_BP:"DIASTOLIC_BP"},Pa={GCS:"GCS",FAST_ED:"FAST_ED"},Da=Object.freeze(Object.defineProperty({__proto__:null,BIOMARKER_TYPES:Ra,CLINICAL_SCALE_TYPES:Pa,MedicalValidationFactory:La,VALIDATION_RULE_TYPES:Ma,VITAL_SIGN_TYPES:_a},Symbol.toStringTag,{value:"Module"}));export{De as A,zt as C,$t as D,w as E,S as L,x as M,sr as R,Va as V,A as a,Ga as b,Ut as c,ir as d,tr as g,Fs as l,v as m,ar as p,b as s,o as t};
//# sourceMappingURL=index-CTr1QAMK.js.map
