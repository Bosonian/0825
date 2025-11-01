const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/research-tools-BkedTj7J.js","assets/medical-core-BGk_aHbc.js","assets/enterprise-features-DIAO-rWl.js","assets/command-BgXKcLyy.js","assets/prediction-strategy-DQoKlrSj.js","assets/prediction-models-DCU63o_D.js","assets/validation-factory-CX2rMsC-.js"])))=>i.map(i=>d[i]);
var Bt=Object.defineProperty;var Vt=(a,e,t)=>e in a?Bt(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var Je=(a,e,t)=>Vt(a,typeof e!="symbol"?e+"":e,t);import{s as h,v as Ut,D as ft,b as Wt,A as Me,K as G,G as ee,C as vt,c as Ze,m as ae,M as ie,a as fe,P as qt}from"./medical-core-BGk_aHbc.js";import{p as Gt,a as Kt,b as jt,A as Yt,T as Qt,e as yt,c as Jt}from"./prediction-models-DCU63o_D.js";import{t as o,i as U,a as ye,s as Zt,c as Xt,r as bt,b as wt,d as es,e as Xe,f as et,q as Be}from"./research-tools-BkedTj7J.js";import{s as be,a as tt,m as f,L as E,b as le,c as v,E as _,d as I,M as H,e as Ie,f as st,g as at}from"./enterprise-features-DIAO-rWl.js";import{r as ve,R as Q,c as it}from"./vendor-MujBQnBx.js";import{i as ts,r as kt,a as ss,b as as,C as is}from"./ui-components-tkCfQkE0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const ns=()=>[{id:"acute_deficit",checked:!1},{id:"symptom_onset",checked:!1},{id:"no_preexisting",checked:!1},{id:"no_trauma",checked:!1}];function os(){const a=ns();return`
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
  `}function rs(){const a=document.getElementById("prerequisitesModal");if(!a)return;const e=document.getElementById("closePrerequisites"),t=document.getElementById("cancelPrerequisites"),s=document.getElementById("confirmPrerequisites"),n=()=>{a.remove(),ce("welcome")};e==null||e.addEventListener("click",n),t==null||t.addEventListener("click",n),s==null||s.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const c=a.querySelectorAll(".toggle-input");if(Array.from(c).every(p=>p.checked))a.remove(),ce("triage2");else{const p=document.getElementById("prerequisitesWarning");p&&(p.style.display="flex",p.classList.add("shake"),setTimeout(()=>p.classList.remove("shake"),500))}});const i=a.querySelectorAll(".toggle-input");i.forEach(r=>{r.addEventListener("change",()=>{const c=Array.from(i).every(p=>p.checked),u=document.getElementById("prerequisitesWarning");c&&u&&(u.style.display="none")})})}function ls(){const a=document.getElementById("prerequisitesModal");a&&a.remove();const e=document.createElement("div");try{be(e,os());const t=e.firstElementChild;if(!t)throw new Error("Failed to create modal element");document.body.appendChild(t)}catch(t){console.error("Prerequisites modal sanitization failed:",t);const s=document.createElement("div");s.className="modal prerequisites-modal",s.style.display="flex",s.textContent="Prerequisites modal could not be displayed securely. Please refresh the page.",document.body.appendChild(s);return}rs()}function cs(a){h.logEvent("triage1_answer",{comatose:a}),a?ce("coma"):ls()}function ds(a){h.logEvent("triage2_answer",{examinable:a}),ce(a?"full":"limited")}function ce(a){h.logEvent("navigate",{from:h.getState().currentScreen,to:a}),h.navigate(a),window.scrollTo(0,0)}function us(){h.hasUnsavedData()&&!confirm("Are you sure you want to start over? All entered data will be lost.")||(h.logEvent("reset"),h.reset())}function ps(){h.goBack()?(h.logEvent("navigate_back"),window.scrollTo(0,0)):St()}function St(){h.logEvent("navigate_home"),h.goHome(),window.scrollTo(0,0)}async function hs(a,e){var u,p;a.preventDefault();const t=a.target,{module:s}=t.dataset,n=Ut(t);if(!n.isValid){Wt(e,n.validationErrors);try{const l=Object.keys(n.validationErrors)[0];if(l&&t.elements[l]){const b=t.elements[l];b.focus({preventScroll:!0}),b.scrollIntoView({behavior:"smooth",block:"center"})}const d=document.createElement("div");d.className="sr-only",d.setAttribute("role","status"),d.setAttribute("aria-live","polite");const m=Object.keys(n.validationErrors).length;d.textContent=`${m} field${m===1?"":"s"} need attention.`,document.body.appendChild(d),setTimeout(()=>d.remove(),1200)}catch(l){}return}const i={};Array.from(t.elements).forEach(l=>{if(l.name)if(l.type==="checkbox")i[l.name]=l.checked;else if(l.type==="number"){const d=parseFloat(l.value);i[l.name]=isNaN(d)?0:d}else l.type==="hidden"&&l.name==="armparese"?i[l.name]=l.value==="true":i[l.name]=l.value}),h.setFormData(s,i);const r=t.querySelector("button[type=submit]"),c=r?r.innerHTML:"";if(r){r.disabled=!0;try{be(r,`<span class="loading-spinner"></span> ${o("analyzing")}`)}catch(l){console.error("Button loading state sanitization failed:",l),r.textContent=o("analyzing")||"Analyzing..."}}try{console.log("[Submit] Module:",s),console.log("[Submit] Inputs:",i);let l;switch(s){case"coma":l={ich:{...await jt(i),module:"Coma"},lvo:null};break;case"limited":l={ich:{...await Kt(i),module:"Limited"},lvo:{notPossible:!0}};break;case"full":if(l=await Gt(i),console.log("[Submit] Full results:",{ich:!!(l!=null&&l.ich),lvo:!!(l!=null&&l.lvo),ichP:(u=l==null?void 0:l.ich)==null?void 0:u.probability,lvoP:(p=l==null?void 0:l.lvo)==null?void 0:p.probability}),!l||!l.ich)throw new Error("Invalid response structure from Full Stroke API");l.ich&&!l.ich.probability&&l.ich.ich_probability!==void 0&&(l.ich.probability=l.ich.ich_probability,console.log("[Submit] Fixed ICH probability for Full Stroke:",l.ich.probability)),l.ich&&!l.ich.module&&(l.ich.module="Full Stroke"),l.lvo&&!l.lvo.module&&(l.lvo.module="Full Stroke");break;default:throw new Error(`Unknown module: ${s}`)}console.log("[Submit] Setting results in store:",l),h.setResults(l),h.logEvent("models_complete",{module:s,results:l});const d=h.getState();console.log("[Submit] State after setResults:",{hasResults:!!d.results,currentScreen:d.currentScreen}),console.log("[Submit] Navigating to results..."),ce("results"),nt("✅ Results loaded",2e3),setTimeout(()=>{try{const m=h.getState().currentScreen;console.log("[Submit] currentScreen after navigate:",m),m!=="results"&&(h.navigate("results"),nt("🔁 Forced results view",1500))}catch(m){}},0)}catch(l){const d=["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!0;if(s==="full"&&d)try{const b=ft.mockApiResponses.full_stroke,T=b.ich_prediction||{},L=b.lvo_prediction||{},D=parseFloat(T.probability)||0,M=parseFloat(L.probability)||0,J={ich:{probability:D>1?D/100:D,drivers:T.drivers||null,confidence:parseFloat(T.confidence)||.85,module:"Full Stroke"},lvo:{probability:M>1?M/100:M,drivers:L.drivers||null,confidence:parseFloat(L.confidence)||.85,module:"Full Stroke"}};h.setResults(J),h.logEvent("models_complete_fallback",{module:s,reason:l.message}),ce("results");return}catch(b){}let m="An error occurred during analysis. Please try again.";if(l instanceof Yt&&(m=l.message),ms(e,m),r){r.disabled=!1;try{be(r,c)}catch(b){console.error("Button restore sanitization failed:",b),r.textContent="Submit"}}}}function ms(a,e){a.querySelectorAll(".critical-alert").forEach(c=>{var u,p;(p=(u=c.querySelector("h4"))==null?void 0:u.textContent)!=null&&p.includes("Error")&&c.remove()});const t=document.createElement("div");t.className="critical-alert";const s=document.createElement("h4"),n=document.createElement("span");n.className="alert-icon",n.textContent="⚠️",s.appendChild(n),s.appendChild(document.createTextNode(" Error"));const i=document.createElement("p");i.textContent=e,t.appendChild(s),t.appendChild(i);const r=a.querySelector(".container");r?r.prepend(t):a.prepend(t),setTimeout(()=>t.remove(),1e4)}function nt(a,e=2e3){try{const t=document.createElement("div");t.textContent=a,t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>{t.style.opacity="1"}),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>t.remove(),200)},e)}catch(t){}}class gs{constructor(){this.isAuthenticated=!1,this.sessionToken=null,this.sessionExpiry=null,this.lastActivity=Date.now(),this.setupActivityTracking()}async authenticate(e){return tt(async()=>{if(f.info("Authentication attempt started",{category:E.AUTHENTICATION,hasPassword:!!e&&e.length>0,isDevelopment:ft.isDevelopment}),Qt.ensureType(e,"string","authentication password"),!e||e.trim().length===0)throw f.warn("Authentication failed: empty password",{category:E.AUTHENTICATION}),new H("Password is required","EMPTY_PASSWORD",_.VALIDATION,I.MEDIUM);f.debug("Sending authentication request to backend",{category:E.AUTHENTICATION,url:Me.AUTHENTICATE});const t=await fetch(Me.AUTHENTICATE,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e.trim()})});if(!t.ok){let n="Authentication failed",i="AUTH_FAILED";throw t.status===429?(n="Too many authentication attempts. Please wait and try again.",i="RATE_LIMITED"):t.status>=500&&(n="Authentication service temporarily unavailable",i="SERVICE_ERROR"),new H(n,i,_.AUTHENTICATION,t.status>=500?I.HIGH:I.MEDIUM).withContext({statusCode:t.status,url:Me.AUTHENTICATE})}const s=await t.json();if(!s||typeof s!="object")throw new H("Invalid response from authentication service","INVALID_RESPONSE",_.AUTHENTICATION,I.HIGH);if(s.success){this.isAuthenticated=!0,this.sessionToken=s.session_token,this.sessionExpiry=s.expires_at?new Date(s.expires_at):null,this.lastActivity=Date.now();try{this.storeSecureSession()}catch(n){console.warn("Session storage failed:",n.message)}return{success:!0,message:"Authentication successful",sessionDuration:s.session_duration}}throw await this.delayFailedAttempt(),new H(s.message||"Invalid credentials","INVALID_CREDENTIALS",_.AUTHENTICATION,I.MEDIUM).withContext({remainingAttempts:s.rate_limit_remaining,statusCode:t.status})},{timeout:15e3,fallback:t=>{var s;return{success:!1,message:t instanceof H?t.getUserMessage():"Authentication service unavailable. Please try again.",errorCode:t.code||"NETWORK_ERROR",details:t.message,remainingAttempts:(s=t.context)==null?void 0:s.remainingAttempts}},context:{operation:"user_authentication",endpoint:"authenticate"}})}isValidSession(){return this.isAuthenticated?this.sessionExpiry&&new Date>this.sessionExpiry?(this.logout(),!1):!0:this.checkStoredSession()}async validateSessionWithServer(){return this.sessionToken?tt(async()=>{if(["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!0)return this.updateActivity(),!0;const t=await fetch(Me.AUTHENTICATE,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"validate_session",session_token:this.sessionToken})});if(!t.ok){if(t.status===401||t.status===403)return this.logout(),!1;throw new H("Session validation service error","VALIDATION_ERROR",_.AUTHENTICATION,I.MEDIUM).withContext({statusCode:t.status})}const s=await t.json();if(!s||typeof s!="object")throw new H("Invalid response from session validation service","INVALID_RESPONSE",_.AUTHENTICATION,I.MEDIUM);return s.success?(this.updateActivity(),!0):(this.logout(),!1)},{timeout:1e4,fallback:e=>(console.warn("Session validation failed, continuing with local session:",e.message),this.isValidSession()),context:{operation:"session_validation",endpoint:"validate_session"}}):!1}updateActivity(){this.lastActivity=Date.now(),this.storeAuthSession()}async logout(){f.info("User logout initiated",{category:E.AUTHENTICATION}),this.isAuthenticated=!1,this.sessionToken=null,this.sessionExpiry=null;try{await le("auth_session",!0),await le("auth_timestamp",!0),await le("session_token",!0),await le("session_expiry",!0),sessionStorage.removeItem("auth_session"),sessionStorage.removeItem("auth_timestamp"),sessionStorage.removeItem("session_token"),sessionStorage.removeItem("session_expiry"),f.info("Session data cleared during logout",{category:E.SECURITY})}catch(e){f.warn("Failed to clear some session data during logout",{category:E.SECURITY,error:e.message})}}async hashPassword(e){return v(async()=>{if(!e||typeof e!="string")throw new H("Invalid input for password hashing","INVALID_INPUT",_.VALIDATION,I.MEDIUM);if(!crypto||!crypto.subtle)throw new H("Crypto API not available","CRYPTO_UNAVAILABLE",_.SECURITY,I.HIGH);const s=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(n)).map(c=>c.toString(16).padStart(2,"0")).join("")},{category:_.SECURITY,severity:I.HIGH,timeout:5e3,fallback:()=>{let t=0;for(let s=0;s<e.length;s++){const n=e.charCodeAt(s);t=(t<<5)-t+n,t&=t}return Math.abs(t).toString(16)},context:{operation:"password_hashing",inputLength:e?e.length:0}})}storeSecureSession(){return v(async()=>{if(!this.isAuthenticated||!this.sessionToken)throw new H("Cannot store session: not authenticated","NOT_AUTHENTICATED",_.AUTHENTICATION,I.LOW);if(typeof sessionStorage=="undefined")throw new H("Session storage not available","STORAGE_UNAVAILABLE",_.STORAGE,I.MEDIUM);return sessionStorage.setItem("auth_session","verified"),sessionStorage.setItem("auth_timestamp",this.lastActivity.toString()),sessionStorage.setItem("session_token",this.sessionToken),this.sessionExpiry&&sessionStorage.setItem("session_expiry",this.sessionExpiry.toISOString()),!0},{category:_.STORAGE,severity:I.LOW,timeout:1e3,fallback:e=>(console.warn("Failed to store session:",e.message),!1),context:{operation:"store_session",hasToken:!!this.sessionToken,hasExpiry:!!this.sessionExpiry}})}storeAuthSession(){this.storeSecureSession()}checkStoredSession(){try{return v(async()=>{if(typeof sessionStorage=="undefined")throw new H("Session storage not available","STORAGE_UNAVAILABLE",_.STORAGE,I.LOW);const e=await Ie("auth_session",!0),t=await Ie("auth_timestamp",!0),s=await Ie("session_token",!0),n=await Ie("session_expiry",!0);if(e==="verified"&&t&&s){if(n){const r=new Date(n);if(new Date>r)return this.logout(),!1;this.sessionExpiry=r}const i=parseInt(t);if(isNaN(i))throw new H("Invalid session timestamp","INVALID_SESSION_DATA",_.STORAGE,I.MEDIUM);return this.isAuthenticated=!0,this.sessionToken=s,this.lastActivity=i,!0}return this.logout(),!1},{category:_.STORAGE,severity:I.LOW,timeout:1e3,fallback:e=>(console.warn("Failed to check stored session:",e.message),this.logout(),!1),context:{operation:"check_stored_session"}})}catch(e){return this.logout(),!1}}setupActivityTracking(){const e=["mousedown","mousemove","keypress","scroll","touchstart"],t=()=>{this.isAuthenticated&&this.updateActivity()};e.forEach(s=>{document.addEventListener(s,t,{passive:!0})})}async delayFailedAttempt(){return v(async()=>new Promise(e=>{setTimeout(e,1e3)}),{category:_.AUTHENTICATION,severity:I.LOW,timeout:2e3,fallback:()=>Promise.resolve(),context:{operation:"auth_delay"}})}getSessionInfo(){if(!this.isAuthenticated)return{authenticated:!1};const e=this.sessionTimeout-(Date.now()-this.lastActivity),t=Math.floor(e/(60*60*1e3)),s=Math.floor(e%(60*60*1e3)/(60*1e3));return{authenticated:!0,timeRemaining:`${t}h ${s}m`,lastActivity:new Date(this.lastActivity).toLocaleTimeString()}}}const P=new gs;function we(){const a=window.location.hash||"",e=new URLSearchParams(a.split("?")[1]||""),t=e.get("display"),s=e.get("caseId"),n=t==="kiosk"&&!!s;return console.log("[KioskLoader] Kiosk mode detection:",{hash:a,display:t,caseId:s,isKioskMode:n}),{isKioskMode:n,caseId:s}}async function fs(a){try{console.log("[KioskLoader] Fetching case data:",a);const e=await fetch(`${G.caseSharingUrl}/get-cases`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Failed to fetch cases: ${e.status}`);const s=(await e.json()).cases.find(n=>n.id===a);if(!s)throw new Error(`Case not found: ${a}`);return console.log("[KioskLoader] Case data loaded:",s),s}catch(e){throw console.error("[KioskLoader] Failed to fetch case data:",e),e}}async function vs(a){try{const e=await fs(a);return h.setState({results:e.results,formData:e.formData||{},currentScreen:"results"}),console.log("[KioskLoader] Store populated with case data"),e}catch(e){throw console.error("[KioskLoader] Failed to load kiosk case:",e),e}}function ys(){return"https://igfap.eu/kiosk/"}function Le(a){return getComputedStyle(document.documentElement).getPropertyValue(a).trim()}function bs({percent:a=0,level:e="normal"}){const t=ve.useRef(null),s=ve.useRef(null);return ve.useEffect(()=>{const n=t.current,i=n==null?void 0:n.parentElement;if(!i||!n)return;s.current=i;const r=()=>{const p=window.devicePixelRatio||1,l=i.offsetWidth||120;n.width=Math.max(1,Math.floor(l*p)),n.height=Math.max(1,Math.floor(l*p));const d=n.getContext("2d");d.setTransform(1,0,0,1,0,0),d.scale(p,p);const m=l,b=l,T=m/2,L=b/2,D=l/2-8,M=Math.min(Math.max(D*.12,6),12),J=Math.max(M-2,6),z=M%2===1?D-.5:D;d.clearRect(0,0,m,b);const W=document.body.classList.contains("dark-mode"),de=Le("--border-color")||(W?"#2f3336":"#dee2e6");d.save(),d.globalAlpha=W?.36:.65,d.strokeStyle=de,d.lineWidth=J,d.lineCap="round",d.beginPath(),d.arc(T,L,z,0,Math.PI*2),d.stroke(),d.restore();let R=Le("--primary-color");e==="high"&&(R=Le("--warning-color")||"#ff9800"),e==="critical"&&(R=Le("--danger-color")||"#DC143C"),W&&R.includes("#")&&(e==="high"&&(R="#ffaa00"),e==="critical"&&(R="#ff1744"));const B=-Math.PI/2,j=B+Math.PI*2*(Math.max(0,Math.min(100,a))/100);d.save(),d.strokeStyle=W?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.15)",d.lineWidth=M+1.5,d.beginPath(),d.arc(T,L,z,B,j,!1),d.stroke(),d.restore(),d.strokeStyle=R,d.lineWidth=M,d.beginPath(),d.arc(T,L,z,B,j,!1),d.stroke()},c=requestAnimationFrame(r),u=new ResizeObserver(()=>requestAnimationFrame(r));return u.observe(i),()=>{cancelAnimationFrame(c),u.disconnect()}},[a,e]),Q.createElement(Q.Fragment,null,Q.createElement("div",{className:"probability-number"},Math.round(a),Q.createElement("span",null,"%")),Q.createElement("canvas",{ref:t,className:"probability-canvas"}))}function ws({lvoProb:a=0,ichProb:e=0,title:t="Decision Support – LVO/ICH"}){const s=ve.useRef(null);return ve.useEffect(()=>{const n=s.current;if(!n)return;const i=n.getContext("2d");let r=null,c=.5;const p=Math.max(e,.5),l=a/p,b=Math.max(.5,Math.min(2,l)),T=(Math.log2(b)+1)/2,L=Math.abs(a-e),D=Math.max(a,e);let M=L<10?Math.round(30+D*.3):L<20?Math.round(50+D*.4):Math.round(70+D*.3);M=Math.max(0,Math.min(100,M));const J=()=>{const z=window.devicePixelRatio||1,W=n.getBoundingClientRect(),de=W.width||300,R=W.height||200;n.width=Math.max(1,Math.floor(de*z)),n.height=Math.max(1,Math.floor(R*z)),i.setTransform(1,0,0,1,0,0),i.scale(z,z);const B=de,j=R,V=B<480,te=B>=480&&B<1024,Y=V?12:te?14:16,ue=15,ke=B/2-ue-Y/2,pe=j/2-ue-Y/2,Dt=te?Math.min(pe,j*.42):pe,k=Math.max(10,Math.min(ke,Dt)),g=B/2,y=j-(ue+Y/2+k);i.clearRect(0,0,B,j);const O=document.body.classList.contains("dark-mode"),We={day:{bezel:"#e8eaed",bezelShadow:"#c1c7cd",track:"#f5f7fa",ich:"#8b1538",lvo:"#1e3a5f",neutral:"#6b7280",needle:"#d4af37",text:"#374151",tickMajor:"#4b5563",tickMinor:"#9ca3af"},night:{bezel:"#2d3036",bezelShadow:"#1a1d23",track:"#383c42",ich:"#dc2626",lvo:"#3b82f6",neutral:"#64748b",needle:"#fbbf24",text:"#f3f4f6",tickMajor:"#d1d5db",tickMinor:"#6b7280"}},A=O?We.night:We.day,he=i.createLinearGradient(g-k,y-k,g+k,y+k);he.addColorStop(0,A.bezel),he.addColorStop(.3,A.bezelShadow),he.addColorStop(.7,A.bezel),he.addColorStop(1,A.bezelShadow),i.strokeStyle=he,i.lineWidth=Y+4,i.lineCap="round",i.beginPath(),i.arc(g,y,k+2,0,Math.PI,!1),i.stroke(),i.strokeStyle=A.track,i.lineWidth=Y,i.beginPath(),i.arc(g,y,k,0,Math.PI,!1),i.stroke();const De=60,qe=Math.PI/De;for(let C=0;C<De;C++){const $=C/(De-1),S=C*qe,F=Math.min((C+1)*qe,Math.PI);let x,me,ze;if($<=.5){const re=$*2;x=Math.round(0+242*re),me=Math.round(154+66*re),ze=Math.round(255*(1-re))}else{const re=($-.5)*2;x=Math.round(242+13*re),me=Math.round(220*(1-re)),ze=Math.round(0)}const zt=`rgba(${x}, ${me}, ${ze}, 0.85)`;i.strokeStyle=zt,i.lineWidth=Y-4,i.beginPath(),i.arc(g,y,k,S,F,!1),i.stroke()}const Rt=[.5,.75,1,1.5,2],Ot=V?[]:[.6,.9,1.2,1.8];Rt.forEach(C=>{const $=(Math.log2(C)+1)/2,S=Math.PI-$*Math.PI,F=k-12,x=k-24;i.strokeStyle=A.tickMajor,i.lineWidth=1.5,i.lineCap="round",i.beginPath(),i.moveTo(g+Math.cos(S)*F,y+Math.sin(S)*F),i.lineTo(g+Math.cos(S)*x,y+Math.sin(S)*x),i.stroke(),i.fillStyle=A.text;const me=V?13:15;i.font=`600 ${me}px "SF Pro Display", system-ui, sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText(C.toFixed(1),g+Math.cos(S)*(k-35),y+Math.sin(S)*(k-35))}),Ot.forEach(C=>{const $=(Math.log2(C)+1)/2,S=Math.PI-$*Math.PI,F=k-8,x=k-16;i.strokeStyle=A.tickMinor,i.lineWidth=.8,i.lineCap="round",i.beginPath(),i.moveTo(g+Math.cos(S)*F,y+Math.sin(S)*F),i.lineTo(g+Math.cos(S)*x,y+Math.sin(S)*x),i.stroke()}),[{val:.77,label:"ICH",side:"left"},{val:1.3,label:"LVO",side:"right"}].forEach(C=>{const $=(Math.log2(C.val)+1)/2,S=Math.PI-$*Math.PI,F=k-2,x=k+12;i.strokeStyle=C.side==="left"?A.ich:A.lvo,i.lineWidth=2,i.setLineDash([3,2]),i.beginPath(),i.moveTo(g+Math.cos(S)*F,y+Math.sin(S)*F),i.lineTo(g+Math.cos(S)*x,y+Math.sin(S)*x),i.stroke(),i.setLineDash([])});const Ft=V?15:17,Se=V?k+35:k+42;i.fillStyle=O?"#ff4444":"#ff0000",i.font=`700 ${Ft}px "SF Pro Display", system-ui, sans-serif`,i.textAlign="center",i.textBaseline="middle",O&&(i.shadowColor="rgba(0,0,0,0.8)",i.shadowBlur=3,i.shadowOffsetY=1),i.fillText("ICH",g+Math.cos(Math.PI)*Se,y+Math.sin(Math.PI)*Se-10),i.fillStyle=O?"#4499ff":"#0099ff",i.fillText("LVO",g+Math.cos(0)*Se,y+Math.sin(0)*Se-10),i.shadowBlur=0,i.shadowOffsetY=0,c+=(T-c)*.12;const Z=Math.PI-c*Math.PI,se=Math.max(0,k-Y/2-6),Ge=(1-M/100)*(Math.PI*.05);i.save(),i.globalAlpha=O?.2:.25,i.fillStyle=A.neutral,i.beginPath(),i.moveTo(g,y),i.arc(g,y,se*.85,Z-Ge,Z+Ge,!1),i.closePath(),i.fill(),i.restore();const q=A.needle,Ht=performance.now(),Ee=i.createLinearGradient(g,y,g+Math.cos(Z)*se,y+Math.sin(Z)*se);Ee.addColorStop(0,q+"ff"),Ee.addColorStop(.7,q+"dd"),Ee.addColorStop(1,q+"bb"),i.strokeStyle=Ee,i.lineWidth=2.5,i.lineCap="round",i.shadowColor=O?"rgba(0,0,0,0.8)":"rgba(0,0,0,0.3)",i.shadowBlur=4,i.shadowOffsetY=2,i.beginPath(),i.moveTo(g,y),i.lineTo(g+Math.cos(Z)*se,y+Math.sin(Z)*se),i.stroke(),i.shadowBlur=0,i.shadowOffsetY=0;const Re=g+Math.cos(Z)*se,Oe=y+Math.sin(Z)*se,Te=.6+.4*Math.sin(Ht*.006),Fe=3+Te*2;i.save(),i.globalAlpha=.15+Te*.25,i.fillStyle=q,i.beginPath(),i.arc(Re,Oe,Fe*3.5,0,Math.PI*2),i.fill(),i.restore(),i.save(),i.globalAlpha=.4+Te*.3,i.fillStyle=q,i.beginPath(),i.arc(Re,Oe,Fe*1.8,0,Math.PI*2),i.fill(),i.restore(),i.fillStyle=q,i.shadowColor=q,i.shadowBlur=4+Te*6,i.beginPath(),i.arc(Re,Oe,Fe,0,Math.PI*2),i.fill(),i.shadowBlur=0;const He=14,Ke=8,Ce=i.createRadialGradient(g,y,0,g,y,He);Ce.addColorStop(0,O?"#4a5568":"#718096"),Ce.addColorStop(.7,O?"#2d3748":"#4a5568"),Ce.addColorStop(1,O?"#1a202c":"#2d3748"),i.fillStyle=Ce,i.beginPath(),i.arc(g,y,He,0,Math.PI*2),i.fill();const Ne=i.createRadialGradient(g,y,0,g,y,Ke);Ne.addColorStop(0,q+"aa"),Ne.addColorStop(1,q+"44"),i.fillStyle=Ne,i.beginPath(),i.arc(g,y,Ke,0,Math.PI*2),i.fill(),i.strokeStyle=q,i.lineWidth=1,i.beginPath(),i.arc(g,y,He-1,0,Math.PI*2),i.stroke();const Nt=V?18:22,je=y-k*.65,Ye=V?60:80,Qe=V?24:30;if(i.save(),i.globalAlpha=O?.9:.95,i.fillStyle=O?"#1f2937":"#ffffff",i.shadowColor=O?"rgba(0,0,0,0.5)":"rgba(0,0,0,0.2)",i.shadowBlur=8,i.shadowOffsetY=2,i.fillRect(g-Ye/2,je-Qe/2,Ye,Qe),i.restore(),i.fillStyle=A.text,i.font=`700 ${Nt}px "SF Mono", ui-monospace, monospace`,i.textAlign="center",i.textBaseline="middle",i.fillText(b.toFixed(2),g,je),!V){const C=y+k*.15,$=60,S=4;i.fillStyle=O?"#374151":"#e5e7eb",i.fillRect(g-$/2,C,$,S);const F=M/100*$,x=i.createLinearGradient(g-$/2,C,g-$/2+F,C);x.addColorStop(0,A.neutral),x.addColorStop(1,A.needle),i.fillStyle=x,i.fillRect(g-$/2,C,F,S),i.fillStyle=A.text,i.font='500 11px "SF Pro Display", system-ui, sans-serif',i.textAlign="center",i.fillText(`${M}% confidence`,g,C+18)}r=requestAnimationFrame(J)};return J(),()=>{r&&cancelAnimationFrame(r)}},[a,e]),Q.createElement("div",{className:"gauge-wrapper"},Q.createElement("canvas",{ref:s,className:"gauge-canvas"}))}function ks(){document.querySelectorAll("[data-react-ring]").forEach(a=>{if(a.__mounted)return;const e=parseFloat(a.getAttribute("data-percent"))||0,t=a.getAttribute("data-level")||"normal",s=it(a);s.render(Q.createElement(bs,{percent:e,level:t})),a.__mounted=!0,a.__root=s}),document.querySelectorAll("[data-react-tachometer]").forEach(a=>{if(a.__mounted)return;const e=parseFloat(a.getAttribute("data-ich"))||0,t=parseFloat(a.getAttribute("data-lvo"))||0,s=a.getAttribute("data-title")||"Decision Support – LVO/ICH",n=it(a);n.render(Q.createElement(ws,{ichProb:e,lvoProb:t,title:s})),a.__mounted=!0,a.__root=n})}function oe(a){const e=[{id:1,labelKey:"progressTriage",icon:"🎯"},{id:2,labelKey:"progressAssessment",icon:"📋"},{id:3,labelKey:"progressResults",icon:"📊"}];let t='<div class="progress-indicator">';return e.forEach((s,n)=>{const i=s.id===a,r=s.id<a,c=U.t(s.labelKey);t+=`
      <div class="progress-step-container">
        <div class="progress-step ${i?"active":""} ${r?"completed":""}"
             aria-label="${c}"
             title="${c}">
          ${r?"✓":s.id}
        </div>
        <div class="progress-label ${i?"active":""}">${c}</div>
      </div>
    `,n<e.length-1&&(t+=`<div class="progress-line ${r?"completed":""}"></div>`)}),t+="</div>",t}function ot(){return`
    <div class="container">
      ${oe(1)}
      <h2>${o("triage1Title")}</h2>
      <div class="triage-question">
        ${o("triage1Question")}
        <small class="help-text" title="Glasgow Coma Scale less than 9 indicates comatose state">
          ${o("triage1Help")}
          <span class="info-icon" aria-label="More information">ℹ️</span>
        </small>
      </div>
      <div class="triage-buttons">
        <button class="yes-btn triage-btn-enhanced" data-action="triage1" data-value="true">
          <span class="btn-icon">⚠️</span>
          <span class="btn-content">
            <span class="btn-primary-text">${o("triage1Yes")}</span>
            <span class="btn-secondary-text">GCS < 9</span>
          </span>
        </button>
        <button class="no-btn triage-btn-enhanced" data-action="triage1" data-value="false">
          <span class="btn-icon">✓</span>
          <span class="btn-content">
            <span class="btn-primary-text">${o("triage1No")}</span>
            <span class="btn-secondary-text">GCS ≥ 9</span>
          </span>
        </button>
      </div>
    </div>
  `}function Ss(){return`
    <div class="container">
      ${oe(1)}
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
  `}function Es(){return`
    <div class="container">
      ${oe(2)}
      <div class="module-header">
        <span class="module-icon">🧠</span>
        <h2>${o("comaModuleTitle")||"Coma Module"}</h2>
        <p class="module-subtitle">For patients with Glasgow Coma Scale < 9</p>
      </div>
      <form data-module="coma">
        <div class="input-grid">
          <div class="input-group enhanced-input">
            <label for="gfap_value" class="enhanced-label">
              <span class="label-icon">🔬</span>
              <span class="label-text">
                <span class="label-primary">${o("gfapValueLabel")}</span>
                <span class="label-secondary">Glial Fibrillary Acidic Protein</span>
              </span>
              <span class="tooltip info-tooltip">ℹ️
                <span class="tooltiptext">${o("gfapTooltipLong")}</span>
              </span>
            </label>
            <div class="input-wrapper">
              <input
                type="number"
                id="gfap_value"
                name="gfap_value"
                min="${ee.min}"
                max="${ee.max}"
                step="0.1"
                required
                aria-describedby="gfap-help"
                placeholder="Enter value (e.g., 150.5)"
                class="enhanced-number-input"
              >
              <span class="input-unit">pg/mL</span>
            </div>
            <div id="gfap-help" class="input-help enhanced-help">
              <span class="help-icon">📊</span>
              <span>${o("gfapRange").replace("{min}",ee.min).replace("{max}",ee.max)}</span>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <button type="submit" class="primary btn-enhanced">
            <span class="btn-icon">🔍</span>
            <span class="btn-text">${o("analyzeIchRisk")}</span>
          </button>
          <button type="button" class="secondary btn-enhanced" data-action="reset">
            <span class="btn-icon">↻</span>
            <span class="btn-text">${o("startOver")}</span>
          </button>
        </div>
      </form>
    </div>
  `}function Ts(){return`
    <div class="container">
      ${oe(2)}
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
              <input type="number" name="gfap_value" id="gfap_value" min="${ee.min}" max="${ee.max}" step="0.1" required inputmode="decimal">
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
  `}function Cs(){return`
    <div class="container">
      ${oe(2)}
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
              <input type="number" name="gfap_value" id="gfap_value" min="${ee.min}" max="${ee.max}" step="0.1" required inputmode="decimal">
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
  `}function Et(){return`
    <div class="critical-alert">
      <h4><span class="alert-icon">🚨</span> ${o("criticalAlertTitle")}</h4>
      <p>${o("criticalAlertMessage")}</p>
    </div>
  `}const Ms={age_years:"ageLabel",age:"ageLabel",systolic_bp:"systolicLabel",diastolic_bp:"diastolicLabel",systolic_blood_pressure:"systolicLabel",diastolic_blood_pressure:"diastolicLabel",blood_pressure_systolic:"systolicLabel",blood_pressure_diastolic:"diastolicLabel",gfap_value:"gfapLabel",gfap:"gfapLabel",gfap_level:"gfapLabel",fast_ed_score:"fastEdLabel",fast_ed:"fastEdLabel",fast_ed_total:"fastEdLabel",vigilanzminderung:"vigilanzLabel",vigilance_reduction:"vigilanzLabel",reduced_consciousness:"vigilanzLabel",armparese:"armPareseLabel",arm_paresis:"armPareseLabel",arm_weakness:"armPareseLabel",beinparese:"beinPareseLabel",leg_paresis:"beinPareseLabel",leg_weakness:"beinPareseLabel",eye_deviation:"eyeDeviationLabel",blickdeviation:"eyeDeviationLabel",headache:"headacheLabel",kopfschmerzen:"headacheLabel",atrial_fibrillation:"atrialFibLabel",vorhofflimmern:"atrialFibLabel",anticoagulated_noak:"anticoagLabel",anticoagulation:"anticoagLabel",antiplatelets:"antiplateletsLabel",thrombozytenaggregationshemmer:"antiplateletsLabel"},Is=[{pattern:/_score$/,replacement:" Score"},{pattern:/_value$/,replacement:" Level"},{pattern:/_bp$/,replacement:" Blood Pressure"},{pattern:/_years?$/,replacement:" (years)"},{pattern:/^ich_/,replacement:"Brain Bleeding "},{pattern:/^lvo_/,replacement:"Large Vessel "},{pattern:/parese$/,replacement:"Weakness"},{pattern:/deviation$/,replacement:"Movement"}];function _e(a){if(!a)return"";const e=Ms[a.toLowerCase()];if(e){const s=o(e);if(s&&s!==e)return s}let t=a.toLowerCase();return Is.forEach(({pattern:s,replacement:n})=>{t=t.replace(s,n)}),t=t.replace(/_/g," ").replace(/\b\w/g,s=>s.toUpperCase()).trim(),t}function Ls(a){return _e(a).replace(/\s*\([^)]*\)\s*/g,"").trim()}function As(a,e=""){return a==null||a===""?"":typeof a=="boolean"?a?"✓":"✗":typeof a=="number"?e.includes("bp")||e.includes("blood_pressure")?`${a} mmHg`:e.includes("gfap")?`${a} pg/mL`:e.includes("age")?`${a} years`:e.includes("score")||Number.isInteger(a)?a.toString():a.toFixed(1):a.toString()}function $s(a,e){if(!(a!=null&&a.drivers)&&!(e!=null&&e.drivers))return"";let t=`
    <div class="drivers-section">
      <div class="drivers-header">
        <h3><span class="driver-header-icon">🎯</span> ${o("riskAnalysis")}</h3>
        <p class="drivers-subtitle">${o("riskAnalysisSubtitle")}</p>
      </div>
      <div class="enhanced-drivers-grid">
  `;return console.log("[Drivers] ICH has drivers:",!!(a!=null&&a.drivers),a==null?void 0:a.drivers),console.log("[Drivers] LVO has drivers:",!!(e!=null&&e.drivers),"notPossible:",e==null?void 0:e.notPossible,e==null?void 0:e.drivers),a!=null&&a.drivers&&(console.log("🧠 Rendering ICH drivers panel"),t+=rt(a.drivers,"ICH","ich",a.probability)),e!=null&&e.drivers&&!e.notPossible&&(console.log("🩸 Rendering LVO drivers panel"),t+=rt(e.drivers,"LVO","lvo",e.probability)),t+=`
      </div>
    </div>
  `,t}function rt(a,e,t,s){if(!a||Object.keys(a).length===0)return`
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
    `;const n=a;if(n.kind==="unavailable")return`
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
    `;const i=(n.positive||[]).sort((d,m)=>Math.abs(m.weight)-Math.abs(d.weight)).slice(0,3),r=(n.negative||[]).sort((d,m)=>Math.abs(m.weight)-Math.abs(d.weight)).slice(0,3),c=Math.max(...i.map(d=>Math.abs(d.weight)),...r.map(d=>Math.abs(d.weight)),.01);console.log(`[Drivers] ${t} maxWeight:`,c),console.log(`[Drivers] ${t} positive:`,i.map(d=>`${d.label}: ${d.weight}`)),console.log(`[Drivers] ${t} negative:`,r.map(d=>`${d.label}: ${d.weight}`)),console.log(`[Drivers] ${t} positive weights:`,i.map(d=>Math.abs(d.weight))),console.log(`[Drivers] ${t} negative weights:`,r.map(d=>Math.abs(d.weight)));let u=`
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
  `;const p=i.reduce((d,m)=>d+Math.abs(m.weight),0);i.length>0?i.forEach((d,m)=>{const b=p>0?Math.abs(d.weight)/p*100:0,T=Math.abs(d.weight)/c*100;console.log(`[Drivers] ${t} positive driver "${d.label}": weight=${Math.abs(d.weight)}, relativeImportance=${b.toFixed(1)}%, barWidth=${T}%`);const L=_e(d.label);u+=`
        <div class="compact-driver-item">
          <div class="compact-driver-label">${L}</div>
          <div class="compact-driver-bar positive" style="width: ${T}%">
            <span class="compact-driver-value">+${b.toFixed(0)}%</span>
          </div>
        </div>
      `}):u+=`<div class="no-factors">${o("noPositiveFactors")}</div>`,u+=`
          </div>
        </div>
        
        <div class="drivers-column negative-column">
          <div class="column-header">
            <span class="column-icon">↓</span>
            <span class="column-title">${o("decreaseRisk")}</span>
          </div>
          <div class="compact-drivers">
  `;const l=r.reduce((d,m)=>d+Math.abs(m.weight),0);return r.length>0?r.forEach((d,m)=>{const b=l>0?Math.abs(d.weight)/l*100:0,T=Math.abs(d.weight)/c*100;console.log(`[Drivers] ${t} negative driver "${d.label}": weight=${Math.abs(d.weight)}, relativeImportance=${b.toFixed(1)}%, barWidth=${T}%`);const L=_e(d.label);u+=`
        <div class="compact-driver-item">
          <div class="compact-driver-label">${L}</div>
          <div class="compact-driver-bar negative" style="width: ${T}%">
            <span class="compact-driver-value">-${b.toFixed(0)}%</span>
          </div>
        </div>
      `}):u+=`<div class="no-factors">${o("noNegativeFactors")}</div>`,u+=`
          </div>
        </div>
      </div>
    </div>
  `,u}function xs(a,e){const t=Number(a),s=vt[e];return t>=s.high?"🔴 HIGH RISK":t>=s.medium?"🟡 MEDIUM RISK":"🟢 LOW RISK"}function _s(){const a="ABCDEFGHIJKLMNOPQRSTUVWXYZ",e="0123456789";let t="";for(let s=0;s<3;s++)t+=a.charAt(Math.floor(Math.random()*a.length));for(let s=0;s<4;s++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}function Ps(){const a=_s(),e=Date.now(),t={code:a,timestamp:e};sessionStorage.setItem(`case_${a}`,JSON.stringify(t));const s=window.location.origin,n=window.location.pathname,i=`${s}${n}#/results?caseId=${a}&source=shared&ts=${e}`;return console.log("[CaseShareLink] Generated share link:",i),i}async function Ds(a){try{if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(a),console.log("[CaseShareLink] Link copied to clipboard"),!0;{const e=document.createElement("textarea");e.value=a,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();const t=document.execCommand("copy");return document.body.removeChild(e),t}}catch(e){return console.error("[CaseShareLink] Failed to copy to clipboard:",e),!1}}function Tt(){const a=new URLSearchParams(window.location.hash.split("?")[1]||""),e=a.get("source"),t=a.get("caseId"),s=parseInt(a.get("ts"))||0,n=e==="shared"&&!!t;return n&&console.log("[CaseShareLink] Detected shared link:",{caseId:t,timestamp:s}),{isShared:n,caseId:t||null,timestamp:s}}function Rs(a){if(!a)return!1;const t=Date.now()-a,s=60*60*1e3;return t>s}async function Os(a){try{console.log("[CaseShareLink] Submitting acknowledgment for case:",a);const e={caseId:a,timestamp:Date.now(),acknowledged:!0};return localStorage.setItem(`ack_${a}`,JSON.stringify(e)),!0}catch(e){return console.error("[CaseShareLink] Failed to submit acknowledgment:",e),!1}}function Fs(a){try{const e=localStorage.getItem(`ack_${a}`);return e?JSON.parse(e).acknowledged===!0:!1}catch(e){return!1}}function Ct(){const a=h.getState(),{formData:e}=a;if(!e||Object.keys(e).length===0)return"";let t="";return Object.entries(e).forEach(([s,n])=>{if(n&&Object.keys(n).length>0){const i=o(`${s}ModuleTitle`)||s.charAt(0).toUpperCase()+s.slice(1);let r="";Object.entries(n).forEach(([c,u])=>{if(u===""||u===null||u===void 0)return;const p=Ls(c),l=As(u,c);r+=`
          <div class="summary-item">
            <span class="summary-label">${p}:</span>
            <span class="summary-value">${l}</span>
          </div>
        `}),r&&(t+=`
          <div class="summary-module">
            <h4>${i}</h4>
            <div class="summary-items">
              ${r}
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
  `:""}function Ve(a,e,t){if(!e)return console.log(`[RiskCard] No data for ${a}`),"";const s=Math.round((e.probability||0)*100);console.log(`[RiskCard] ${a} - probability: ${e.probability}, percent: ${s}%`);const n=xs(s,a),i=s>70,r=s>vt[a].high,c={ich:"🩸",lvo:"🧠"},u={ich:o("ichProbability"),lvo:o("lvoProbability")},p=i?"critical":r?"high":"normal",l=p==="critical"?"#ff4444":p==="high"?"#ff8800":"#0066cc",d=Math.PI*100,m=d*(1-s/100);return`
    <div class="enhanced-risk-card ${a} ${p}">
      <div class="risk-header">
        <div class="risk-icon">${c[a]}</div>
        <div class="risk-title">
          <h3>${u[a]}</h3>
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
                    stroke="${l}"
                    stroke-width="8"
                    stroke-dasharray="${d}"
                    stroke-dashoffset="${m}"
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
              <div class="circle-label">${a==="ich"?o("ichRisk"):o("lvoRisk")}</div>
            </div>
          </div>
          <div class="risk-level ${p}">${n}</div>
        </div>

        <div class="risk-assessment"></div>
      </div>
    </div>
  `}function Hs(a){const e=a.gfap_value||Ue();if(!e||e<=0)return"";const t=yt(e);return`
    <div class="volume-display-container">
      ${ss(t)}
    </div>
  `}function Ue(){var t;const a=h.getState(),{formData:e}=a;for(const s of["coma","limited","full"])if((t=e[s])!=null&&t.gfap_value)return parseFloat(e[s].gfap_value);return 0}function Mt(){const a=Tt();if(!a.isShared)return"";const e=Rs(a.timestamp),t=Fs(a.caseId);return`
    <div class="shared-case-banner ${e?"expired":""}">
      <div class="banner-header">
        <span class="banner-icon">📲</span>
        <h3>${o("caseShared")}</h3>
        <span class="case-id">ID: ${a.caseId}</span>
      </div>

      ${e?`
        <div class="expiration-warning">
          <span class="warning-icon">⏰</span>
          <span>${o("caseExpired")}</span>
        </div>
      `:""}

      ${t?`
        <div class="acknowledged-status">
          <span class="check-icon">✓</span>
          <span>${o("acknowledgmentSuccess")}</span>
        </div>
      `:`
        <div class="acknowledgment-section">
          <label class="acknowledgment-checkbox">
            <input type="checkbox" id="avdAcknowledgment" />
            <span>${o("seenByAvD")}</span>
          </label>
          <button
            type="button"
            class="acknowledgment-button"
            id="submitAcknowledgment"
            disabled>
            ${o("submitAcknowledgment")}
          </button>
          <div class="acknowledgment-status" id="acknowledgmentStatus"></div>
        </div>
      `}
    </div>
  `}function lt(a,e){var t;try{if(!a)return console.error("renderResults: No results data provided"),`
        <div class="container">
          <div class="error-message">
            <h2>No Results Available</h2>
            <p>Please complete an assessment first.</p>
            <button class="primary" data-action="reload">Start Over</button>
          </div>
        </div>
      `;const{ich:s,lvo:n}=a,i=Ws(s),r=i!=="coma"?Vs(a):null;r&&ye(i)&&Zt(s,r,Pe());const c=(s==null?void 0:s.module)==="Limited"||(s==null?void 0:s.module)==="Coma"||(n==null?void 0:n.notPossible)===!0,u=(s==null?void 0:s.module)==="Full Stroke"||((t=s==null?void 0:s.module)==null?void 0:t.includes("Full"));let p;return console.log("[Results] ICH data:",s),console.log("[Results] LVO data:",n),console.log("[Results] ICH module:",s==null?void 0:s.module),console.log("[Results] isLimitedOrComa:",c),console.log("[Results] isFullModule:",u),c?p=Ns(s,a,e,r,i):p=zs(s,n,a,e,r,i),setTimeout(()=>{console.log("[Results] Initializing volume animations..."),ts()},100),p}catch(s){return console.error("Error in renderResults:",s),`
      <div class="container">
        <div class="error-message">
          <h2>Error Displaying Results</h2>
          <p>There was an error displaying the results. Error: ${s.message}</p>
          <button class="primary" data-action="reload">Start Over</button>
        </div>
      </div>
    `}}function Ns(a,e,t,s,n){const r=we().isKioskMode,c=a&&a.probability>.6?Et():"",u=Math.round(((a==null?void 0:a.probability)||0)*100),p=kt(),l=Ct(),d=ye(n)?bt():"",m=s&&ye(n)?wt(a,s,Pe()):"",b=(a==null?void 0:a.module)==="Coma"?Us(a.probability):"",T=(a==null?void 0:a.module)!=="Coma"?At(a.probability):"";return`
    <div class="container">
      ${oe(3)}
      ${Mt()}
      <h2>${o("bleedingRiskAssessment")||"Blutungsrisiko-Bewertung / Bleeding Risk Assessment"}</h2>
      ${c}
      
      <!-- Single ICH Risk Card -->
      <div class="risk-results-single">
        ${Ve("ich",a)}
      </div>

      ${(a==null?void 0:a.module)==="Coma"&&u>=50?`
      <!-- ICH Volume Card (Coma only) -->
      <div class="risk-results-single">
        ${$t(a)}
      </div>
      `:""}
      
      <!-- Alternative Diagnoses for Coma Module -->
      ${b}
      
      <!-- Differential Diagnoses for Stroke Modules -->
      ${T}
      
      <!-- Research Model Comparison (hidden unless research mode) -->
      ${m}
      
      <!-- ICH Drivers Only (not shown for Coma module) -->
      ${(a==null?void 0:a.module)!=="Coma"?`
        <div class="enhanced-drivers-section">
          <h3>${o("riskFactorsTitle")||"Hauptrisikofaktoren / Main Risk Factors"}</h3>
          ${It(a)}
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
          ${l}
        </div>
        
        <button class="info-toggle" data-target="stroke-centers">
          <span class="toggle-icon">🏥</span>
          <span class="toggle-text">${o("nearestCentersTitle")}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="stroke-centers" style="display: none;">
          ${p}
        </div>
      </div>
      
      <div class="results-actions">
        ${r?`
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
            <button type="button" class="primary" id="shareCaseLink"> 📲 ${o("shareCase")} </button>
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
      
      ${Lt(a)}
      ${d}
    </div>
  `}function zs(a,e,t,s,n,i){var ke,pe;const c=we().isKioskMode,u=Math.round(((a==null?void 0:a.probability)||0)*100),p=Math.round(((e==null?void 0:e.probability)||0)*100);console.log("[FullModuleResults] ICH probability:",a==null?void 0:a.probability,"-> %:",u),console.log("[FullModuleResults] LVO probability:",e==null?void 0:e.probability,"-> %:",p);const l=a&&a.probability>.6?Et():"",d=kt(),m=Ct(),b=ye(i)?bt():"",T=n&&ye(i)?wt(a,n,Pe()):"",L=h.getState(),D=parseInt((pe=(ke=L.formData)==null?void 0:ke.full)==null?void 0:pe.fast_ed_score)||0,M=i==="full"||(a==null?void 0:a.module)==="Full",J=e&&typeof e.probability=="number"&&!e.notPossible,z=M&&D>3&&J,W=u>=50,R=p/Math.max(u,.5),B=R>=.6&&R<=1.7,j=M&&u>=50&&p>=50&&!B,V=M&&u>=30&&p>=30;let te=1;z&&te++,W&&te++;const Y=te===1?"risk-results-single":te===2?"risk-results-dual":"risk-results-triple",ue=At(a.probability);return`
    <div class="container">
      ${oe(3)}
      ${Mt()}
      <h2>${o("resultsTitle")}</h2>
      ${l}
      
      <!-- Risk Assessment Display -->
      <div class="${Y}">
        ${Ve("ich",a)}
        ${z?Ve("lvo",e):""}
        ${W?$t(a):""}
      </div>
      
      <!-- Treatment Decision Gauge (when strong signal) -->
      ${V?qs(u,p):""}
      ${!V&&j?Bs(u,p,R):""}
      
      <!-- Differential Diagnoses for Stroke Modules -->
      ${ue}
      
      <!-- Research Model Comparison (hidden unless research mode) -->
      ${T}
      
      <!-- Risk Factor Drivers -->
      <div class="enhanced-drivers-section">
        <h3>${o("riskFactorsTitle")||"Risikofaktoren / Risk Factors"}</h3>
        ${z?$s(a,e):It(a)}
      </div>
      
      <!-- Collapsible Additional Information -->
      <div class="additional-info-section">
        <button class="info-toggle" data-target="input-summary">
          <span class="toggle-icon">📋</span>
          <span class="toggle-text">${o("inputSummaryTitle")}</span>
          <span class="toggle-arrow">▼</span>
        </button>
        <div class="collapsible-content" id="input-summary" style="display: none;">
          ${m}
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
        ${c?`
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
            <button type="button" class="primary" id="shareCaseLink"> 📲 ${o("shareCase")} </button>
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
      
      ${Lt(a)}
      ${b}
    </div>
  `}function Bs(a,e,t){const s=t>1?"LVO":"ICH",n=s==="LVO"?"🧠":"🩸",i=U.getCurrentLanguage()==="de"?s==="LVO"?"LVO-dominant":"ICH-dominant":s==="LVO"?"LVO dominant":"ICH dominant",r=U.getCurrentLanguage()==="de"?`Verhältnis LVO/ICH: ${t.toFixed(2)}`:`LVO/ICH ratio: ${t.toFixed(2)}`;return`
    <div class="tachometer-section">
      <div class="tachometer-card">
        <div class="treatment-recommendation ${s==="LVO"?"lvo-dominant":"ich-dominant"}">
          <div class="recommendation-icon">${n}</div>
          <div class="recommendation-text">
            <h4>${i}</h4>
            <p>${r}</p>
          </div>
          <div class="probability-summary">
            ICH: ${a}% | LVO: ${e}%
          </div>
        </div>
      </div>
    </div>
  `}function It(a){if(!a||!a.drivers)return'<p class="no-drivers">No driver data available</p>';const e=a.drivers;if(!e.positive&&!e.negative)return'<p class="no-drivers">Driver format error</p>';const t=e.positive||[],s=e.negative||[];return`
    <div class="drivers-split-view">
      <div class="drivers-column positive-column">
        <div class="column-header">
          <span class="column-icon">⬆</span>
          <span class="column-title">${o("increasingRisk")||"Risikoerhöhend / Increasing Risk"}</span>
        </div>
        <div class="compact-drivers">
          ${t.length>0?t.slice(0,5).map(n=>ct(n,"positive")).join(""):`<p class="no-factors">${o("noFactors")||"Keine Faktoren / No factors"}</p>`}
        </div>
      </div>
      
      <div class="drivers-column negative-column">
        <div class="column-header">
          <span class="column-icon">⬇</span>
          <span class="column-title">${o("decreasingRisk")||"Risikomindernd / Decreasing Risk"}</span>
        </div>
        <div class="compact-drivers">
          ${s.length>0?s.slice(0,5).map(n=>ct(n,"negative")).join(""):`<p class="no-factors">${o("noFactors")||"Keine Faktoren / No factors"}</p>`}
        </div>
      </div>
    </div>
  `}function ct(a,e){const t=Math.abs(a.weight*100),s=Math.min(t*2,100);return`
    <div class="compact-driver-item">
      <div class="compact-driver-label">${_e(a.label)}</div>
      <div class="compact-driver-bar ${e}" style="width: ${s}%;">
        <span class="compact-driver-value">${t.toFixed(1)}%</span>
      </div>
    </div>
  `}function Lt(a){if(!a||!a.probability||Math.round((a.probability||0)*100)<50)return"";const t=Ue();return!t||t<=0?"":`
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
  `}function Vs(a){try{const e=Pe();return!e.age||!e.gfap?null:Xt(e)}catch(e){return null}}function Pe(){const a=h.getState(),{formData:e}=a;let t=null,s=null;for(const i of["coma","limited","full"])e[i]&&(t=t||e[i].age_years,s=s||e[i].gfap_value);return{age:parseInt(t)||null,gfap:parseFloat(s)||null}}function At(a){return Math.round(a*100)>25?`
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
    `:""}function Us(a){const e=Math.round(a*100),t=U.getCurrentLanguage()==="de";return e>25?`
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
    `}function Ws(a){if(!(a!=null&&a.module))return"unknown";const e=a.module.toLowerCase();return e.includes("coma")?"coma":e.includes("limited")?"limited":e.includes("full")?"full":"unknown"}function $t(a){const e=Ue();if(!e||e<=0)return"";const t=yt(e),s=Jt(t);return Math.round(((a==null?void 0:a.probability)||0)*100),`
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
              ${Hs(a)}
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
  `}function qs(a,e){const t=e/Math.max(a,1);return`
    <div class="tachometer-section">
      <div class="tachometer-card">
        <div class="tachometer-header">
          <h3>🎯 ${U.getCurrentLanguage()==="de"?"Entscheidungshilfe – LVO/ICH":"Decision Support – LVO/ICH"}</h3>
          <div class="ratio-display">LVO/ICH Ratio: ${t.toFixed(2)}</div>
        </div>
        
        <div class="tachometer-gauge" id="tachometer-canvas-container">
          <div data-react-tachometer data-ich="${a}" data-lvo="${e}" data-title="${U.getCurrentLanguage()==="de"?"Entscheidungshilfe – LVO/ICH":"Decision Support – LVO/ICH"}"></div>
        </div>

        <!-- Legend chips for zones -->
        <div class="tachometer-legend" aria-hidden="true">
          <span class="legend-chip ich">ICH</span>
          <span class="legend-chip uncertain">${U.getCurrentLanguage()==="de"?"Unsicher":"Uncertain"}</span>
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
            <div class="metric-value">${(()=>{const s=Math.abs(e-a),n=Math.max(e,a);let i=s<10?Math.round(30+n*.3):s<20?Math.round(50+n*.4):Math.round(70+n*.3);return i=Math.max(0,Math.min(100,i)),i})()}%</div>
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
  `}function Gs(){return`
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="app-logo">
            <svg class="logo-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="iGFAP Brain Logo">
              <!-- Brain icon with GFAP molecular structure -->
              <defs>
                <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                </linearGradient>
              </defs>
              <!-- Brain outline -->
              <path d="M50,15 C30,15 15,30 15,50 C15,55 16,60 18,64 C20,68 25,75 30,80 C35,85 45,90 50,90 C55,90 65,85 70,80 C75,75 80,68 82,64 C84,60 85,55 85,50 C85,30 70,15 50,15 Z"
                    fill="url(#brainGradient)" stroke="white" stroke-width="2"/>
              <!-- Neural pathways (simplified GFAP structure) -->
              <path d="M35,35 L42,45 M48,30 L48,50 M58,35 L65,45 M42,55 L42,70 M58,55 L58,70"
                    stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
              <!-- Center nucleus -->
              <circle cx="50" cy="50" r="6" fill="white" opacity="0.9"/>
            </svg>
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
            <details class="regulatory-details">
              <summary class="regulatory-summary">
                <span class="regulatory-icon">ℹ️</span>
                <span>${o("regulatoryInformation")||"Regulatory Information"}</span>
                <span class="toggle-icon">▼</span>
              </summary>
              <div class="regulatory-notice">
                <p><strong>${o("regulatoryStatus")}:</strong> ${o("regulatoryStatusDesc")}</p>
                <p><strong>${o("dataProtection")}:</strong> ${o("dataProtectionDesc")}</p>
                <p><strong>${o("clinicalOversight")}:</strong> ${o("clinicalOversightDesc")}</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  `}function Ks(){const a=document.getElementById("loginForm");if(!a)return;const e=document.getElementById("researchPassword"),t=document.getElementById("loginError"),s=a.querySelector(".login-button");e.focus(),a.addEventListener("submit",async c=>{c.preventDefault();const u=e.value.trim();if(!u){n("Please enter the research access code");return}r(!0),i();try{const p=await P.authenticate(u);if(p.success)h.logEvent("auth_success",{timestamp:new Date().toISOString(),userAgent:navigator.userAgent.substring(0,100)}),h.navigate("triage1");else{const l=p.message;n(l),e.value="",e.focus(),h.logEvent("auth_failed",{timestamp:new Date().toISOString(),errorCode:p.errorCode})}}catch(p){n("Authentication system error. Please try again.")}finally{r(!1)}}),e.addEventListener("input",()=>{i()});function n(c){t.textContent=c,t.style.display="block",e.classList.add("error")}function i(){t.style.display="none",e.classList.remove("error")}function r(c){const u=s.querySelector(".button-text"),p=s.querySelector(".loading-spinner");c?(u.style.display="none",p.style.display="inline",s.disabled=!0):(u.style.display="inline",p.style.display="none",s.disabled=!1)}}function js(a){const e=document.createElement("div");e.className="sr-only",e.setAttribute("role","status"),e.setAttribute("aria-live","polite");const t={triage1:"Coma assessment",triage2:"Examination capability assessment",coma:"Coma module",limited:"Limited data module",full:"Full stroke assessment",results:"Assessment results"};e.textContent=`Navigated to ${t[a]||a}`,document.body.appendChild(e),setTimeout(()=>e.remove(),1e3)}function Ys(a){const e="iGFAP",s={triage1:"Initial Assessment",triage2:"Examination Capability",coma:"Coma Module",limited:"Limited Data Module",full:"Full Stroke Module",results:"Assessment Results"}[a];document.title=s?`${e} — ${s}`:e}function Qs(){setTimeout(()=>{const a=document.querySelector("h2");a&&(a.setAttribute("tabindex","-1"),a.focus(),setTimeout(()=>a.removeAttribute("tabindex"),100))},100)}class Js{constructor(){this.scores={facial_palsy:0,arm_weakness:0,speech_changes:0,eye_deviation:0,denial_neglect:0},this.onApply=null,this.modal=null}getTotal(){return Object.values(this.scores).reduce((e,t)=>e+t,0)}getRiskLevel(){return this.getTotal()>=4?"high":"low"}render(){const e=this.getTotal(),t=this.getRiskLevel();return`
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
                  ${o("riskLevel")}: ${t==="high"?o("riskLevelHigh"):o("riskLevelLow")}
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
    `}setupEventListeners(){if(this.modal=document.getElementById("fastEdModal"),!this.modal)return;this.modal.addEventListener("change",n=>{if(n.target.type==="radio"){const i=n.target.name,r=parseInt(n.target.value);this.scores[i]=r,this.updateDisplay()}});const e=this.modal.querySelector(".modal-close");e==null||e.addEventListener("click",()=>this.close());const t=this.modal.querySelector('[data-action="cancel-fast-ed"]');t==null||t.addEventListener("click",()=>this.close());const s=this.modal.querySelector('[data-action="apply-fast-ed"]');s==null||s.addEventListener("click",()=>this.apply()),this.modal.addEventListener("click",n=>{n.target===this.modal&&(n.preventDefault(),n.stopPropagation())}),document.addEventListener("keydown",n=>{var i;n.key==="Escape"&&((i=this.modal)!=null&&i.classList.contains("show"))&&this.close()})}updateDisplay(){var s,n;const e=(s=this.modal)==null?void 0:s.querySelector(".total-score"),t=(n=this.modal)==null?void 0:n.querySelector(".risk-indicator");if(e&&(e.textContent=`${this.getTotal()}/9`),t){const i=this.getRiskLevel();t.className=`risk-indicator ${i}`,t.textContent=`${o("riskLevel")}: ${i==="high"?o("riskLevelHigh"):o("riskLevelLow")}`}}show(e=0,t=null){this.onApply=t,e>0&&e<=9&&this.approximateFromTotal(e),document.getElementById("fastEdModal")?(this.modal.remove(),document.body.insertAdjacentHTML("beforeend",this.render()),this.modal=document.getElementById("fastEdModal")):document.body.insertAdjacentHTML("beforeend",this.render()),this.setupEventListeners(),this.modal.setAttribute("aria-hidden","false"),this.modal.style.display="flex",this.modal.classList.add("show");const s=this.modal.querySelector('input[type="radio"]');s==null||s.focus()}close(){this.modal&&(this.modal.classList.remove("show"),this.modal.style.display="none",this.modal.setAttribute("aria-hidden","true"))}apply(){const e=this.getTotal(),t=this.scores.arm_weakness>0,s=this.scores.eye_deviation>0;this.onApply&&this.onApply({total:e,components:{...this.scores},armWeaknessBoolean:t,eyeDeviationBoolean:s}),this.close()}approximateFromTotal(e){this.scores={facial_palsy:0,arm_weakness:0,speech_changes:0,eye_deviation:0,denial_neglect:0};let t=e;const s=Object.keys(this.scores);for(const n of s){if(t<=0)break;const r=Math.min(t,n==="facial_palsy"?1:2);this.scores[n]=r,t-=r}}}const Zs=new Js;function ne(a){const e=h.getState(),{currentScreen:t,results:s,startTime:n,screenHistory:i}=e,c=we().isKioskMode;console.log("[Render] Rendering screen:",t,"Has results:",!!s,"Kiosk mode:",c);const u=document.createElement("div"),p=document.getElementById("backButton");p&&(p.style.display=i&&i.length>0&&!c?"flex":"none");let l="";switch(t){case"login":c?l=lt(s,n):l=Gs();break;case"triage1":if(!c&&!P.isValidSession()){h.navigate("login");return}l=ot();break;case"triage2":l=Ss();break;case"coma":l=Es();break;case"limited":l=Ts();break;case"full":l=Cs();break;case"results":l=lt(s,n);break;default:l=ot()}try{be(u,l)}catch(m){u.textContent="Error loading content. Please refresh."}for(;a.firstChild;)a.removeChild(a.firstChild);for(;u.firstChild;)a.appendChild(u.firstChild);const d=a.querySelector("form[data-module]");if(d){const{module:m}=d.dataset;Xs(d,m)}ea(a),t==="login"&&setTimeout(()=>{Ks()},100),t==="results"&&s&&setTimeout(()=>{try{console.log("[Render] Initializing stroke center map with results:",s),as(s),console.log("[Render] Mounting React islands..."),ks()}catch(m){console.error("[Render] Results initialization failed:",m)}},100),setTimeout(()=>{try{es()}catch(m){}},150),js(t),Ys(t),Qs()}function Xs(a,e){const t=h.getFormData(e);!t||Object.keys(t).length===0||Object.entries(t).forEach(([s,n])=>{const i=a.elements[s];i&&(i.type==="checkbox"?i.checked=n===!0||n==="on"||n==="true":i.value=n)})}function ea(a){a.querySelectorAll('input[type="number"]').forEach(n=>{n.addEventListener("input",()=>{const i=n.closest(".input-group");i&&i.classList.contains("error")&&(i.classList.remove("error"),i.querySelectorAll(".error-message").forEach(r=>r.remove()))})}),a.querySelectorAll("[data-action]").forEach(n=>{n.addEventListener("click",i=>{const{action:r,value:c}=i.currentTarget.dataset,u=c==="true";switch(r){case"triage1":cs(u);break;case"triage2":ds(u);break;case"reset":us();break;case"goBack":ps();break;case"goHome":St();break;case"reload":window.location.reload();break;case"kiosk-home":window.location.href=ys();break}})}),a.querySelectorAll("form[data-module]").forEach(n=>{n.addEventListener("submit",i=>{hs(i,a)})});const e=a.querySelector("#printResults");e&&e.addEventListener("click",()=>window.print());const t=a.querySelector("#fast_ed_score");t&&(t.addEventListener("click",n=>{n.preventDefault();const i=parseInt(t.value)||0;Zs.show(i,r=>{t.value=r.total;const c=a.querySelector("#armparese_hidden");c&&(c.value=r.armWeaknessBoolean?"true":"false");const u=a.querySelector("#eye_deviation_hidden");u&&(u.value=r.eyeDeviationBoolean?"true":"false"),t.dispatchEvent(new Event("change",{bubbles:!0}))})}),t.addEventListener("keydown",n=>{n.preventDefault()})),a.querySelectorAll(".info-toggle").forEach(n=>{n.addEventListener("click",i=>{const r=n.dataset.target,c=a.querySelector(`#${r}`),u=n.querySelector(".toggle-arrow");c&&(c.style.display!=="none"?(c.style.display="none",c.classList.remove("show"),n.classList.remove("active"),u.style.transform="rotate(0deg)"):(c.style.display="block",c.classList.add("show"),n.classList.add("active"),u.style.transform="rotate(180deg)"))})})}class ta{constructor(){this.container=null,this.eventListeners=new Map,this.isInitialized=!1}initialize(e){this.container=e,this.setupGlobalEventListeners(),this.setupHelpModal(),this.setupFooterLinks(),this.initializeApiModeToggle(),this.initializeResearchMode(),this.setCurrentYear(),this.isInitialized=!0}setupGlobalEventListeners(){this.addEventListenerSafe("backButton","click",()=>{h.goBack(),ne(this.container)}),this.addEventListenerSafe("homeButton","click",()=>{const{isKioskMode:e}=we();if(e){const s=["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)?"http://localhost:3001/":"https://igfap.eu/kiosk/";window.location.href=s}else h.goHome(),ne(this.container)}),this.addEventListenerSafe("languageToggle","click",()=>{this.toggleLanguage()}),this.addEventListenerSafe("darkModeToggle","click",()=>{this.toggleDarkMode()}),this.addEventListenerSafe("apiModeToggle","click",e=>{e.preventDefault(),this.toggleApiMode()}),this.addEventListenerSafe("researchModeToggle","click",e=>{e.preventDefault(),e.stopPropagation(),this.toggleResearchMode()}),this.addGlobalEventListener("keydown",e=>{e.key==="Escape"&&this.closeModal("helpModal")}),this.addGlobalEventListener("beforeunload",e=>{h.hasUnsavedData()&&(e.preventDefault(),e.returnValue="You have unsaved data. Are you sure you want to leave?")})}initializeApiModeToggle(){if(!document.getElementById("apiModeToggle"))return;const t=["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname);localStorage.getItem("use_mock_api")===null&&t&&localStorage.setItem("use_mock_api","true"),this.updateApiModeButton()}toggleApiMode(){const t=localStorage.getItem("use_mock_api")==="true"?"false":"true";localStorage.setItem("use_mock_api",t),this.updateApiModeButton();try{const s=document.createElement("div");s.className="sr-only",s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.textContent=t==="true"?"Mock data enabled":"Live API enabled",document.body.appendChild(s),setTimeout(()=>s.remove(),1200)}catch(s){}}updateApiModeButton(){const e=document.getElementById("apiModeToggle");if(!e)return;localStorage.getItem("use_mock_api")!=="false"?(e.textContent="🧪",e.title="Mock data: ON (click to use API)",e.setAttribute("aria-label","Mock data enabled")):(e.textContent="☁️",e.title="Live API: ON (click to use mock)",e.setAttribute("aria-label","Live API enabled"))}addEventListenerSafe(e,t,s){const n=document.getElementById(e);if(n){const i=r=>{try{s(r)}catch(c){this.handleUIError(c,`${e}_${t}`)}};n.addEventListener(t,i),this.eventListeners.set(`${e}_${t}`,{element:n,handler:i})}}addGlobalEventListener(e,t){const s=n=>{try{t(n)}catch(i){this.handleUIError(i,`global_${e}`)}};if(e==="keydown"||e==="beforeunload"){const n=e==="beforeunload"?window:document;n.addEventListener(e,s),this.eventListeners.set(`global_${e}`,{element:n,handler:s})}}setupHelpModal(){v(async()=>{const e=document.getElementById("helpButton"),t=document.getElementById("helpModal"),s=t==null?void 0:t.querySelector(".modal-close");e&&t&&(this.closeModal("helpModal"),this.addEventListenerSafe("helpButton","click",()=>{this.openModal("helpModal")}),s&&s.addEventListener("click",()=>{this.closeModal("helpModal")}),t.addEventListener("click",n=>{n.target===t&&this.closeModal("helpModal")}))},e=>{})}setupFooterLinks(){this.addEventListenerSafe("privacyLink","click",e=>{e.preventDefault(),this.showPrivacyPolicy()}),this.addEventListenerSafe("disclaimerLink","click",e=>{e.preventDefault(),this.showDisclaimer()})}toggleLanguage(){v(async()=>{U.toggleLanguage(),this.updateLanguage()},e=>{})}updateLanguage(){document.documentElement.lang=U.getCurrentLanguage(),this.updateElementText(".app-header h1",o("appTitle")),this.updateElementText(".emergency-badge",o("emergencyBadge")),this.updateButtonAttributes("languageToggle",o("languageToggle")),this.updateButtonAttributes("helpButton",o("helpButton")),this.updateButtonAttributes("darkModeToggle",o("darkModeButton")),this.updateElementText("#modalTitle",o("helpTitle"));const e=document.getElementById("languageToggle");if(e){const t=U.getCurrentLanguage();e.textContent=t==="en"?"🇬🇧":"🇩🇪",e.dataset.lang=t}}updateElementText(e,t){const s=document.querySelector(e);s&&t&&(s.textContent=t)}updateButtonAttributes(e,t){const s=document.getElementById(e);s&&t&&(s.title=t,s.setAttribute("aria-label",t))}toggleDarkMode(){const e=document.getElementById("darkModeToggle");document.body.classList.toggle("dark-mode");const t=document.body.classList.contains("dark-mode");e&&(e.textContent=t?"☀️":"🌙"),localStorage.setItem("theme",t?"dark":"light")}initializeResearchMode(){document.getElementById("researchModeToggle")&&this.updateResearchMode()}updateResearchMode(){const e=document.getElementById("researchModeToggle");if(e){const t=this.getCurrentModuleFromResults(),s=t==="limited"||t==="full";e.style.display=s?"flex":"none",e.style.opacity=s?"1":"0.5"}}getCurrentModuleFromResults(){var s,n;const e=h.getState();if(e.currentScreen!=="results"||!((n=(s=e.results)==null?void 0:s.ich)!=null&&n.module))return null;const t=e.results.ich.module.toLowerCase();return t.includes("coma")?"coma":t.includes("limited")?"limited":t.includes("full")?"full":null}toggleResearchMode(){const e=document.getElementById("researchPanel");if(!e)return;const t=e.style.display!=="none";e.style.display=t?"none":"block";const s=document.getElementById("researchModeToggle");return s&&(s.style.background=t?"rgba(255, 255, 255, 0.1)":"rgba(0, 102, 204, 0.2)"),!1}showResearchActivationMessage(){v(async()=>{const e=document.createElement("div");e.className="research-activation-toast";try{be(e,`
            <div class="toast-content">
              🔬 <strong>Research Mode Activated</strong><br>
              <small>Model comparison features enabled</small>
            </div>
          `)}catch(t){e.textContent="🔬 Research Mode Activated - Model comparison features enabled"}document.body.appendChild(e),setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},3e3)},e=>{})}openModal(e){const t=document.getElementById(e);t&&(t.style.display="flex",t.classList.add("show"),t.setAttribute("aria-hidden","false"))}closeModal(e){const t=document.getElementById(e);t&&(t.classList.remove("show"),t.style.display="none",t.setAttribute("aria-hidden","true"))}showPrivacyPolicy(){alert("Privacy Policy: This tool processes data locally. No patient data is stored or transmitted.")}showDisclaimer(){alert("Medical Disclaimer: This tool is for clinical decision support only. Always use clinical judgment and follow local protocols.")}setCurrentYear(){const e=document.getElementById("currentYear");e&&(e.textContent=new Date().getFullYear())}handleUIError(e,t){try{const s=new CustomEvent("uiError",{detail:{error:e,context:t,timestamp:Date.now()}});document.dispatchEvent(s)}catch(s){}}async preloadCriticalComponents(){return v(async()=>{const t=["appContainer","helpModal","languageToggle","darkModeToggle"].filter(s=>!document.getElementById(s));if(t.length>0)throw new Error(`Missing critical UI elements: ${t.join(", ")}`);return!0},e=>!1)}getStatus(){return{isInitialized:this.isInitialized,hasContainer:!!this.container,eventListenersCount:this.eventListeners.size,currentLanguage:U.getCurrentLanguage(),isDarkMode:document.body.classList.contains("dark-mode")}}destroy(){this.eventListeners.forEach(({element:e,handler:t},s)=>{const[,n]=s.split("_");e&&t&&e.removeEventListener(n,t)}),this.eventListeners.clear(),this.container=null,this.isInitialized=!1}}class sa{constructor(){this.currentTheme="light",this.isInitialized=!1,this.storageKey="theme"}initialize(){this.loadSavedTheme(),this.setupThemeDetection(),this.isInitialized=!0}async loadSavedTheme(){return v(async()=>{const e=localStorage.getItem(this.storageKey),t=window.matchMedia("(prefers-color-scheme: dark)").matches;let s;return e==="dark"||e==="light"?s=e:t?s="dark":s="light",this.applyTheme(s),this.updateThemeButton(),s},e=>(this.applyTheme("light"),this.updateThemeButton(),"light"))}setupThemeDetection(){const e=window.matchMedia("(prefers-color-scheme: dark)"),t=s=>{if(!localStorage.getItem(this.storageKey)){const i=s.matches?"dark":"light";this.applyTheme(i),this.updateThemeButton()}};e.addEventListener?e.addEventListener("change",t):e.addListener(t)}applyTheme(e){e!=="light"&&e!=="dark"&&(e="light"),this.currentTheme=e,e==="dark"?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode"),this.updateMetaThemeColor(e),this.dispatchThemeChangeEvent(e)}toggleTheme(){const e=this.currentTheme==="dark"?"light":"dark";this.setTheme(e)}setTheme(e){return v(async()=>(this.applyTheme(e),this.saveTheme(e),this.updateThemeButton(),e),t=>this.currentTheme)}saveTheme(e){try{localStorage.setItem(this.storageKey,e)}catch(t){}}updateThemeButton(){const e=document.getElementById("darkModeToggle");if(e){const t=this.currentTheme==="dark";e.textContent=t?"☀️":"🌙";const s=t?"Switch to light mode":"Switch to dark mode";e.setAttribute("aria-label",s),e.title=s}}updateMetaThemeColor(e){let t=document.querySelector('meta[name="theme-color"]');t||(t=document.createElement("meta"),t.name="theme-color",document.head.appendChild(t));const s={light:"#ffffff",dark:"#1a1a1a"};t.content=s[e]||s.light}dispatchThemeChangeEvent(e){try{const t=new CustomEvent("themeChanged",{detail:{theme:e,timestamp:Date.now()}});document.dispatchEvent(t)}catch(t){}}getCurrentTheme(){return this.currentTheme}isDarkMode(){return this.currentTheme==="dark"}getSystemPreferredTheme(){try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){return"light"}}resetToSystemTheme(){const e=this.getSystemPreferredTheme();this.setTheme(e);try{localStorage.removeItem(this.storageKey)}catch(t){}}getStatus(){return{isInitialized:this.isInitialized,currentTheme:this.currentTheme,isDarkMode:this.isDarkMode(),systemPreferred:this.getSystemPreferredTheme(),hasExplicitPreference:!!localStorage.getItem(this.storageKey)}}destroy(){this.isInitialized=!1}}class aa{constructor(){this.autoSaveInterval=null,this.sessionCheckInterval=null,this.isInitialized=!1,this.lastAutoSave=0}initialize(){this.validateStoredSession(),this.startAutoSave(),this.setupSessionTimeout(),this.setupSessionValidation(),this.isInitialized=!0}async validateStoredSession(){return v(async()=>P.isValidSession()?(this.restoreFormData(),!0):(this.clearSessionData(),!1),e=>(this.clearSessionData(),!1))}startAutoSave(){this.autoSaveInterval&&clearInterval(this.autoSaveInterval),this.autoSaveInterval=setInterval(()=>{this.performAutoSave()},Ze.autoSaveInterval)}async performAutoSave(){return v(async()=>{const e=document.getElementById("appContainer");if(!e)return!1;const t=e.querySelectorAll("form[data-module]");let s=0;for(const n of t)try{const{module:i}=n.dataset;if(i){const r=this.extractFormData(n);this.hasFormDataChanged(i,r)&&(h.setFormData(i,r),s++)}}catch(i){}return this.lastAutoSave=Date.now(),s>0},e=>!1)}extractFormData(e){const t=new FormData(e),s={};return t.forEach((n,i)=>{const r=e.elements[i];if(r)if(r.type==="checkbox")s[i]=r.checked;else if(r.type==="number"){const c=parseFloat(n);s[i]=isNaN(c)?n:c}else s[i]=n}),s}hasFormDataChanged(e,t){try{const s=h.getFormData(e);return JSON.stringify(s)!==JSON.stringify(t)}catch(s){return!0}}restoreFormData(){v(async()=>{const e=document.getElementById("appContainer");if(!e)return;e.querySelectorAll("form[data-module]").forEach(s=>{try{const{module:n}=s.dataset;if(n){const i=h.getFormData(n);i&&Object.keys(i).length>0&&this.populateForm(s,i)}}catch(n){}})},e=>{})}populateForm(e,t){Object.entries(t).forEach(([s,n])=>{const i=e.elements[s];if(i)try{i.type==="checkbox"?i.checked=!!n:i.type==="radio"?i.value===n&&(i.checked=!0):i.value=n,i.dispatchEvent(new Event("input",{bubbles:!0}))}catch(r){}})}setupSessionTimeout(){setTimeout(()=>{this.showSessionTimeoutWarning()},Ze.sessionTimeout-6e4)}setupSessionValidation(){this.sessionCheckInterval=setInterval(()=>{this.validateCurrentSession()},5*60*1e3)}async validateCurrentSession(){return v(async()=>P.isValidSession()?await P.validateSessionWithServer()?!0:(this.handleSessionExpiry(),!1):(this.handleSessionExpiry(),!1),e=>P.isValidSession())}showSessionTimeoutWarning(){v(async()=>{confirm("Your session will expire in 1 minute. Would you like to continue?")?(P.updateActivity(),this.setupSessionTimeout()):this.endSession()},e=>{})}handleSessionExpiry(){this.clearSessionData(),h.navigate("login"),this.showSessionExpiredMessage()}showSessionExpiredMessage(){const e=document.createElement("div");e.style.cssText=`
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
    `,e.textContent="⏰ Session expired. Please log in again.",document.body.appendChild(e),setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},5e3)}endSession(){P.logout(),this.clearSessionData(),h.reset(),h.navigate("login")}async clearSessionData(){try{f.info("Clearing session data",{category:E.SECURITY}),h.clearAllFormData(),await le("temp_data",!0),await le("research_data",!0),sessionStorage.removeItem("temp_data"),sessionStorage.removeItem("research_data"),f.info("Session data cleared successfully",{category:E.SECURITY})}catch(e){f.warn("Failed to clear some session data",{category:E.SECURITY,error:e.message})}}async forceSave(){return this.performAutoSave()}getStatus(){var e;return{isInitialized:this.isInitialized,isAuthenticated:P.isValidSession(),lastAutoSave:this.lastAutoSave,autoSaveActive:!!this.autoSaveInterval,sessionCheckActive:!!this.sessionCheckInterval,sessionInfo:((e=P.getSessionInfo)==null?void 0:e.call(P))||{}}}destroy(){this.autoSaveInterval&&(clearInterval(this.autoSaveInterval),this.autoSaveInterval=null),this.sessionCheckInterval&&(clearInterval(this.sessionCheckInterval),this.sessionCheckInterval=null),this.isInitialized=!1}}const ia="modulepreload",na=function(a){return"/0825/"+a},dt={},X=function(e,t,s){let n=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),c=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));n=Promise.allSettled(t.map(u=>{if(u=na(u),u in dt)return;dt[u]=!0;const p=u.endsWith(".css"),l=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${l}`))return;const d=document.createElement("link");if(d.rel=p?"stylesheet":ia,p||(d.as="script"),d.crossOrigin="",d.href=u,c&&d.setAttribute("nonce",c),document.head.appendChild(d),p)return new Promise((m,b)=>{d.addEventListener("load",m),d.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return n.then(r=>{for(const c of r||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},w={CRITICAL:"critical",HIGH:"high",NORMAL:"normal",LOW:"low"},K={PENDING:"pending",LOADING:"loading",LOADED:"loaded",ERROR:"error"};class oa{constructor(e,t,s={}){this.name=e,this.loader=t,this.priority=s.priority||w.NORMAL,this.state=K.PENDING,this.component=null,this.error=null,this.loadTime=null,this.dependencies=s.dependencies||[],this.retryCount=0,this.maxRetries=s.maxRetries||3,this.loadPromise=null}async load(){if(this.state===K.LOADED)return this.component;if(this.loadPromise)return this.loadPromise;const e=fe.startMeasurement(qt.USER_INTERACTION,`lazy_load_${this.name}`,{priority:this.priority});return this.state=K.LOADING,this.loadPromise=this.executeLoad(e),this.loadPromise}async executeLoad(e){try{const t=performance.now();return await this.loadDependencies(),this.component=await this.loader(),this.loadTime=performance.now()-t,this.state=K.LOADED,fe.endMeasurement(e,{success:!0,loadTime:this.loadTime,retryCount:this.retryCount}),ae.publish(ie.AUDIT_EVENT,{action:"lazy_component_loaded",component:this.name,loadTime:this.loadTime,priority:this.priority}),this.component}catch(t){if(this.error=t,this.retryCount++,fe.endMeasurement(e,{success:!1,error:t.message,retryCount:this.retryCount}),this.retryCount<this.maxRetries){const s=Math.min(1e3*2**(this.retryCount-1),5e3);return await new Promise(n=>setTimeout(n,s)),this.loadPromise=null,this.load()}throw this.state=K.ERROR,ae.publish(ie.AUDIT_EVENT,{action:"lazy_component_load_failed",component:this.name,error:t.message,retryCount:this.retryCount}),t}}async loadDependencies(){if(this.dependencies.length===0)return;const e=this.dependencies.map(t=>typeof t=="string"?xt.load(t):typeof t=="function"?t():t.load());await Promise.all(e)}getStatus(){var e;return{name:this.name,state:this.state,priority:this.priority,loadTime:this.loadTime,error:(e=this.error)==null?void 0:e.message,retryCount:this.retryCount}}}class xt{constructor(){this.components=new Map,this.intersectionObserver=null,this.idleCallback=null,this.loadQueue={[w.CRITICAL]:[],[w.HIGH]:[],[w.NORMAL]:[],[w.LOW]:[]},this.isProcessingQueue=!1,this.initializeObservers()}initializeObservers(){"IntersectionObserver"in window&&(this.intersectionObserver=new IntersectionObserver(e=>this.handleIntersectionChanges(e),{rootMargin:"50px",threshold:.1})),this.scheduleIdleLoading()}register(e,t,s={}){const n=new oa(e,t,s);return this.components.set(e,n),this.loadQueue[n.priority].push(n),n.priority===w.CRITICAL&&this.processLoadQueue(),ae.publish(ie.AUDIT_EVENT,{action:"lazy_component_registered",component:e,priority:n.priority}),n}async load(e){const t=this.components.get(e);if(!t)throw new Error(`Component '${e}' not registered`);return t.load()}async preload(e=w.HIGH){const t=[w.CRITICAL,w.HIGH,w.NORMAL,w.LOW],s=t.slice(0,t.indexOf(e)+1),n=[];s.forEach(i=>{this.loadQueue[i].forEach(r=>{r.state===K.PENDING&&n.push(r.load())})}),await Promise.allSettled(n),ae.publish(ie.AUDIT_EVENT,{action:"lazy_components_preloaded",priority:e,count:n.length})}observeElement(e,t){this.intersectionObserver&&(e.dataset.lazyComponent=t,this.intersectionObserver.observe(e))}handleIntersectionChanges(e){e.forEach(t=>{if(t.isIntersecting){const s=t.target.dataset.lazyComponent;s&&(this.load(s).catch(n=>{}),this.intersectionObserver.unobserve(t.target))}})}async processLoadQueue(){if(!this.isProcessingQueue){this.isProcessingQueue=!0;try{await this.processQueueByPriority(w.CRITICAL),await this.processQueueByPriority(w.HIGH)}catch(e){}finally{this.isProcessingQueue=!1}}}async processQueueByPriority(e){const s=this.loadQueue[e].filter(i=>i.state===K.PENDING);if(s.length===0)return;const n=s.map(i=>i.load().catch(r=>null));await Promise.allSettled(n)}scheduleIdleLoading(){const e=()=>{"requestIdleCallback"in window?this.idleCallback=requestIdleCallback(t=>{this.processIdleQueue(t),e()},{timeout:5e3}):setTimeout(()=>{this.processIdleQueue({timeRemaining:()=>50}),e()},100)};e()}async processIdleQueue(e){const t=this.loadQueue[w.NORMAL],s=this.loadQueue[w.LOW],n=[...t.filter(i=>i.state===K.PENDING),...s.filter(i=>i.state===K.PENDING)];for(const i of n)if(e.timeRemaining()>10)try{await i.load()}catch(r){}else break}getStats(){const e={total:this.components.size,byState:{pending:0,loading:0,loaded:0,error:0},byPriority:{critical:0,high:0,normal:0,low:0},totalLoadTime:0,averageLoadTime:0};let t=0,s=0;return this.components.forEach(n=>{e.byState[n.state]++,e.byPriority[n.priority]++,n.loadTime&&(t+=n.loadTime,s++)}),e.totalLoadTime=t,e.averageLoadTime=s>0?t/s:0,e}async reload(e){const t=this.components.get(e);if(!t)throw new Error(`Component '${e}' not registered`);return t.state=K.PENDING,t.component=null,t.error=null,t.loadTime=null,t.retryCount=0,t.loadPromise=null,t.load()}dispose(){this.intersectionObserver&&this.intersectionObserver.disconnect(),this.idleCallback&&cancelIdleCallback(this.idleCallback),this.components.clear(),Object.values(this.loadQueue).forEach(e=>e.length=0),ae.publish(ie.AUDIT_EVENT,{action:"lazy_loader_disposed"})}}class ra{constructor(e){this.lazyLoader=e,this.registerMedicalComponents()}registerMedicalComponents(){this.lazyLoader.register("advanced-analytics",()=>X(()=>import("./research-tools-BkedTj7J.js").then(e=>e.h),__vite__mapDeps([0,1,2])),{priority:w.LOW}),this.lazyLoader.register("clinical-reporting",()=>X(()=>import("./research-tools-BkedTj7J.js").then(e=>e.g),__vite__mapDeps([0,1,2])),{priority:w.LOW}),this.lazyLoader.register("audit-trail",()=>X(()=>import("./research-tools-BkedTj7J.js").then(e=>e.j),__vite__mapDeps([0,1,2])),{priority:w.LOW}),this.lazyLoader.register("medical-service-worker",()=>X(()=>import("./enterprise-features-DIAO-rWl.js").then(e=>e.i),__vite__mapDeps([2,1])),{priority:w.LOW}),this.lazyLoader.register("sw-manager",()=>X(()=>import("./enterprise-features-DIAO-rWl.js").then(e=>e.h),__vite__mapDeps([2,1])),{priority:w.LOW}),this.lazyLoader.register("command-pattern",()=>X(()=>import("./command-BgXKcLyy.js"),__vite__mapDeps([3,1])),{priority:w.NORMAL}),this.lazyLoader.register("prediction-strategy",()=>X(()=>import("./prediction-strategy-DQoKlrSj.js"),__vite__mapDeps([4,5,1,2])),{priority:w.NORMAL}),this.lazyLoader.register("validation-factory",()=>X(()=>import("./validation-factory-CX2rMsC-.js"),__vite__mapDeps([6,1])),{priority:w.NORMAL})}async loadByClinicalPriority(e){switch(e){case"emergency":await this.lazyLoader.preload(w.HIGH);break;case"routine":await this.lazyLoader.preload(w.NORMAL);break;case"research":await this.lazyLoader.load("advanced-analytics"),await this.lazyLoader.load("clinical-reporting"),await this.lazyLoader.load("audit-trail");break;case"background":await this.lazyLoader.load("medical-service-worker"),await this.lazyLoader.load("sw-manager");break;default:await this.lazyLoader.preload(w.NORMAL)}}async preloadForModule(e){const s={coma:["command-pattern"],limited:["prediction-strategy"],full:["command-pattern","prediction-strategy","validation-factory"],research:["advanced-analytics","clinical-reporting","audit-trail"]}[e]||[],n=s.map(i=>this.lazyLoader.load(i));await Promise.allSettled(n),ae.publish(ie.AUDIT_EVENT,{action:"medical_components_preloaded",moduleType:e,components:s})}async loadEnterpriseFeatures(){const e=["medical-service-worker","sw-manager","advanced-analytics","clinical-reporting","audit-trail"],t=e.map(i=>this.lazyLoader.load(i).catch(r=>(console.warn(`Enterprise feature ${i} failed to load:`,r),null))),n=(await Promise.allSettled(t)).filter(i=>i.status==="fulfilled"&&i.value!==null).length;return ae.publish(ie.AUDIT_EVENT,{action:"enterprise_features_loaded",requested:e.length,loaded:n}),n}}const $e=new xt;new ra($e);class la{constructor(){this.isInitialized=!1,this.phase3Status={serviceWorker:!1,performanceMonitor:!1,syncManager:!1,lazyLoader:!1},this.phase4Status={reportingSystem:!1,qualityMetrics:!1,auditTrail:!1}}async initialize(){return v(async()=>(await this.initializePhase3Features(),await this.initializePhase4Features(),this.isInitialized=!0,!0),e=>!1)}async initializePhase3Features(){return v(async()=>(await this.initializePerformanceMonitor(),this.initializeServiceWorker(),await this.initializeSyncManager(),await this.initializeProgressiveLoading(),!0),e=>!1)}async initializePerformanceMonitor(){return v(async()=>(fe.start(),this.phase3Status.performanceMonitor=!0,!0),e=>(this.phase3Status.performanceMonitor=!1,!1))}async initializeServiceWorker(){v(async()=>{const e=await st.initialize();return this.phase3Status.serviceWorker=e,e&&await this.prefetchCriticalResources(),e},e=>(this.phase3Status.serviceWorker=!1,!1))}async initializeSyncManager(){return v(async()=>{const e=await at.initialize();return this.phase3Status.syncManager=e,e},e=>(this.phase3Status.syncManager=!1,!1))}async initializeProgressiveLoading(){return v(async()=>(await $e.preload("critical"),setTimeout(()=>this.setupViewportLoading(),100),this.phase3Status.lazyLoader=!0,!0),e=>(this.phase3Status.lazyLoader=!1,!1))}setupViewportLoading(){try{document.querySelectorAll(".brain-visualization-placeholder").forEach(s=>{$e.observeElement(s,"brain-visualization")}),document.querySelectorAll(".stroke-center-map-placeholder").forEach(s=>{$e.observeElement(s,"stroke-center-map")})}catch(e){}}async prefetchCriticalResources(){return v(async()=>{const e=["/0925/src/logic/lvo-local-model.js","/0925/src/logic/ich-volume-calculator.js","/0925/src/patterns/prediction-strategy.js","/0925/src/performance/medical-cache.js"];return await st.prefetchResources(e),!0},e=>!1)}async initializePhase4Features(){return v(async()=>(await this.initializeAuditTrail(),await this.initializeReportingSystem(),await this.initializeQualityMetrics(),this.setupPhase4EventHandlers(),!0),e=>!1)}async initializeAuditTrail(){return v(async()=>(await Xe.initialize(),this.phase4Status.auditTrail=!0,!0),e=>(this.phase4Status.auditTrail=!1,!1))}async initializeReportingSystem(){return v(async()=>(et.start(),this.phase4Status.reportingSystem=!0,!0),e=>(this.phase4Status.reportingSystem=!1,!1))}async initializeQualityMetrics(){return v(async()=>(await Be.initialize(),this.phase4Status.qualityMetrics=!0,!0),e=>(this.phase4Status.qualityMetrics=!1,!1))}setupPhase4EventHandlers(){document.addEventListener("submit",async e=>{const t=e.target;t.dataset.module&&await v(async()=>{const s=new FormData(t),n=Object.fromEntries(s.entries());return this.phase4Status.auditTrail&&Xe.logEvent("data_entry",{module:t.dataset.module,timestamp:new Date().toISOString(),data_points:Object.keys(n).length}),this.phase4Status.qualityMetrics&&(Be.recordMetric("form_completion","count",1),Be.recordMetric("data_quality","completeness",Object.values(n).filter(i=>i&&i.trim()).length/Object.keys(n).length*100)),!0},s=>!1)})}getStatus(){return{isInitialized:this.isInitialized,phase3:{...this.phase3Status,overall:Object.values(this.phase3Status).some(e=>e)},phase4:{...this.phase4Status,overall:Object.values(this.phase4Status).some(e=>e)},systemStatus:this.getSystemStatus()}}getSystemStatus(){return{serviceWorkerSupported:"serviceWorker"in navigator,indexedDBSupported:"indexedDB"in window,notificationSupported:"Notification"in window,cacheSupported:"caches"in window,webLockSupported:"locks"in navigator,performanceSupported:"performance"in window}}async restart(){return this.destroy(),this.initialize()}destroy(){var e,t,s,n,i,r;if(this.phase3Status.performanceMonitor)try{(t=(e=fe).stop)==null||t.call(e)}catch(c){}if(this.phase3Status.syncManager)try{(n=(s=at).destroy)==null||n.call(s)}catch(c){}if(this.phase4Status.reportingSystem)try{(r=(i=et).stop)==null||r.call(i)}catch(c){}this.phase3Status={serviceWorker:!1,performanceMonitor:!1,syncManager:!1,lazyLoader:!1},this.phase4Status={reportingSystem:!1,qualityMetrics:!1,auditTrail:!1},this.isInitialized=!1}}class ca{constructor(){this.container=null,this.unsubscribe=null,this.isInitialized=!1,this.uiManager=new ta,this.themeManager=new sa,this.sessionManager=new aa,this.advancedFeaturesManager=new la}async init(){return v(async()=>{if(f.info("Application initialization started",{category:E.SYSTEM,version:"2.1.0",userAgent:navigator.userAgent.substring(0,100)}),document.readyState==="loading")return f.debug("Waiting for DOM ready",{category:E.SYSTEM}),new Promise(e=>{document.addEventListener("DOMContentLoaded",()=>e(this.init()))});if(this.container=document.getElementById("appContainer"),!this.container)throw f.critical("App container not found",{category:E.SYSTEM,containerId:"appContainer"}),new Error("Critical initialization failure: App container not found");return f.debug("App container found",{category:E.SYSTEM}),P.isValidSession()||(f.info("No valid session, redirecting to login",{category:E.AUTHENTICATION}),h.navigate("login")),f.info("Initializing core features",{category:E.SYSTEM}),await this.initializeCoreFeatures(),f.info("Skipping advanced features initialization",{category:E.SYSTEM}),this.setupRenderingSystem(),f.debug("Initializing UI manager",{category:E.SYSTEM}),this.uiManager.initialize(this.container),f.debug("Initializing theme manager",{category:E.SYSTEM}),this.themeManager.initialize(),f.debug("Initializing session manager",{category:E.SYSTEM}),this.sessionManager.initialize(),ne(this.container),this.isInitialized=!0,f.info("Application initialization completed successfully",{category:E.SYSTEM,initializationTime:performance.now()}),!0},e=>{throw f.critical("Application initialization failed",{category:E.SYSTEM,error:e.message,stack:e.stack}),new Error(`App initialization failed: ${e.message}`)})}async initializeCoreFeatures(){return v(async()=>{const e=[this.uiManager.preloadCriticalComponents(),this.themeManager.loadSavedTheme(),this.sessionManager.validateStoredSession()],s=(await Promise.allSettled(e)).filter(n=>n.status==="rejected");if(s.length>0)throw new Error(`${s.length} core features failed to initialize`);return!0},e=>!1)}async initializeAdvancedFeatures(){v(async()=>(await this.advancedFeaturesManager.initialize(),!0),e=>!1)}setupRenderingSystem(){this.unsubscribe=h.subscribe(()=>{ne(this.container),setTimeout(()=>this.uiManager.updateResearchMode(),200)}),window.addEventListener("languageChanged",()=>{this.uiManager.updateLanguage(),ne(this.container)})}getStatus(){return{isInitialized:this.isInitialized,hasContainer:!!this.container,isAuthenticated:P.isValidSession(),ui:this.uiManager.getStatus(),theme:this.themeManager.getStatus(),session:this.sessionManager.getStatus(),advancedFeatures:this.advancedFeaturesManager.getStatus()}}destroy(){this.unsubscribe&&this.unsubscribe(),this.uiManager.destroy(),this.themeManager.destroy(),this.sessionManager.destroy(),this.advancedFeaturesManager.destroy(),this.isInitialized=!1}}async function da(){const a=new ca;try{return await a.init(),a}catch(e){throw new Error(`Failed to create application: ${e.message}`)}}const Ae={comaIch:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_coma_ich",limitedIch:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_limited_data_ich",fullStroke:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_full_stroke",lvo:"https://europe-west3-igfap-452720.cloudfunctions.net/predict_lvo"},ut={comaIch:{gfap_value:100},limitedIch:{age_years:65,systolic_bp:140,diastolic_bp:80,gfap_value:100,vigilanzminderung:0},fullStroke:{age_years:65,systolic_bp:140,diastolic_bp:80,gfap_value:100,fast_ed_score:4,headache:0,vigilanzminderung:0,armparese:0,beinparese:0,eye_deviation:0,atrial_fibrillation:0,anticoagulated_noak:0,antiplatelets:0},lvo:{gfap_value:100,fast_ed_score:4}};class ua{constructor(){this.warmupAttempts=0,this.successfulWarmups=0,this.warmupResults={},this.isWarming=!1}async warmupAllAPIs(e=!0){if(this.isWarming)return f.info("API warmup already in progress",{category:"WARMUP"}),this.warmupResults;this.isWarming=!0,this.warmupAttempts=0,this.successfulWarmups=0,this.warmupResults={},f.info("Starting API warmup process",{category:"WARMUP",endpoints:Object.keys(Ae).length});const t=Object.entries(Ae).map(async([s,n])=>{try{const i=await this.warmupSingleAPI(s,n,ut[s]);return this.warmupResults[s]=i,i.success&&this.successfulWarmups++,i}catch(i){const r={success:!1,error:i.message,duration:0,timestamp:new Date().toISOString()};return this.warmupResults[s]=r,r}});return e?(Promise.all(t).then(()=>{this.completeWarmup()}).catch(s=>{f.error("Background API warmup failed",{category:"WARMUP",error:s.message}),this.isWarming=!1}),{status:"warming",message:"APIs warming up in background"}):(await Promise.all(t),this.completeWarmup(),this.warmupResults)}async warmupSingleAPI(e,t,s){const n=Date.now();this.warmupAttempts++;try{f.info(`Warming up ${e} API`,{category:"WARMUP",url:t});const i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":"iGFAP-Warmup/2.1.0"},body:JSON.stringify(s),signal:AbortSignal.timeout(1e4)}),r=Date.now()-n,c={success:!0,status:i.status,duration:r,message:`${e} API warmed up`,timestamp:new Date().toISOString()};return f.info(`Successfully warmed up ${e} API`,{category:"WARMUP",duration:r,status:i.status}),c}catch(i){const r=Date.now()-n;return i.name==="TypeError"&&i.message.includes("Failed to fetch")?(f.info(`${e} API warmup encountered CORS (expected), function still warmed`,{category:"WARMUP",duration:r}),{success:!0,status:"cors-blocked",duration:r,message:`${e} API warmed (CORS blocked but function activated)`,timestamp:new Date().toISOString()}):(f.warn(`Failed to warm up ${e} API`,{category:"WARMUP",error:i.message,duration:r}),{success:!1,error:i.message,duration:r,timestamp:new Date().toISOString()})}}completeWarmup(){this.isWarming=!1;const e={total:this.warmupAttempts,successful:this.successfulWarmups,failed:this.warmupAttempts-this.successfulWarmups,results:this.warmupResults};f.info("API warmup process completed",{category:"WARMUP",summary:e}),typeof window!="undefined"&&window.dispatchEvent(new CustomEvent("api-warmup-complete",{detail:e}))}getWarmupStatus(){return{isWarming:this.isWarming,attempts:this.warmupAttempts,successful:this.successfulWarmups,results:this.warmupResults}}async warmupCriticalAPIs(){const e=["comaIch","limitedIch"];f.info("Starting critical API warmup",{category:"WARMUP",apis:e});const t={};for(const s of e)Ae[s]&&(t[s]=await this.warmupSingleAPI(s,Ae[s],ut[s]));return f.info("Critical API warmup completed",{category:"WARMUP",results:t}),t}}const pt=new ua;async function _t(a={}){const{background:e=!0,criticalOnly:t=!1}=a;try{return t?await pt.warmupCriticalAPIs():await pt.warmupAllAPIs(e)}catch(s){return f.error("API warmup initialization failed",{category:"WARMUP",error:s.message}),{error:s.message}}}typeof window!="undefined"&&setTimeout(()=>{_t({background:!0,criticalOnly:!1})},1e3);class pa{constructor(){this.watchId=null,this.isTracking=!1,this.lastLocation=null,this.onLocationUpdate=null,this.onError=null,this.updateInterval=G.gpsUpdateInterval,this.lastUpdateTime=null}isAvailable(){return"geolocation"in navigator}async getCurrentLocation(){if(!this.isAvailable())throw new Error("Geolocation not available in this browser");return new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(s=>{const n={latitude:s.coords.latitude,longitude:s.coords.longitude,accuracy:s.coords.accuracy,timestamp:new Date(s.timestamp).toISOString()};this.lastLocation=n,e(n)},s=>{t(this.handleGeolocationError(s))},{enableHighAccuracy:G.gpsHighAccuracy,timeout:G.gpsTimeout,maximumAge:G.gpsMaxAge})})}start(e,t){if(!this.isAvailable()){const s=new Error("Geolocation not available");return t&&t(s),!1}return this.isTracking?(console.warn("[GPSTracker] Already tracking"),!0):(this.onLocationUpdate=e,this.onError=t,this.watchId=navigator.geolocation.watchPosition(s=>{const n=Date.now();if(this.lastUpdateTime&&n-this.lastUpdateTime<this.updateInterval)return;this.lastUpdateTime=n;const i={latitude:s.coords.latitude,longitude:s.coords.longitude,accuracy:s.coords.accuracy,timestamp:new Date(s.timestamp).toISOString()};this.lastLocation=i,console.log("[GPSTracker] Location update:",{lat:i.latitude.toFixed(6),lng:i.longitude.toFixed(6),accuracy:`${i.accuracy.toFixed(0)}m`}),this.onLocationUpdate&&this.onLocationUpdate(i)},s=>{const n=this.handleGeolocationError(s);console.error("[GPSTracker] Error:",n),this.onError&&this.onError(n)},{enableHighAccuracy:G.gpsHighAccuracy,timeout:G.gpsTimeout,maximumAge:G.gpsMaxAge}),this.isTracking=!0,console.log("[GPSTracker] Started tracking"),!0)}stop(){this.watchId!==null&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null,this.isTracking=!1,console.log("[GPSTracker] Stopped tracking"))}getStatus(){return{isTracking:this.isTracking,hasLocation:this.lastLocation!==null,lastLocation:this.lastLocation,lastUpdateTime:this.lastUpdateTime?new Date(this.lastUpdateTime).toISOString():null}}handleGeolocationError(e){return{[e.PERMISSION_DENIED]:{code:"PERMISSION_DENIED",message:"Location permission denied. Please enable location access.",userMessage:"Bitte aktivieren Sie die Standortfreigabe / Please enable location access",recoverable:!1},[e.POSITION_UNAVAILABLE]:{code:"POSITION_UNAVAILABLE",message:"Location information unavailable.",userMessage:"Standort nicht verfügbar / Location unavailable",recoverable:!0},[e.TIMEOUT]:{code:"TIMEOUT",message:"Location request timed out.",userMessage:"Standortabfrage Zeitüberschreitung / Location timeout",recoverable:!0}}[e.code]||{code:"UNKNOWN",message:e.message||"Unknown GPS error",userMessage:"GPS-Fehler / GPS error",recoverable:!0}}async requestPermission(){if(!("permissions"in navigator))try{return await this.getCurrentLocation(),"granted"}catch(e){return"denied"}try{return(await navigator.permissions.query({name:"geolocation"})).state}catch(e){return console.warn("[GPSTracker] Permission query not supported"),"prompt"}}}const ge=new pa;class ha{constructor(){Je(this,"handleEscKey",e=>{e.key==="Escape"&&this.close()});this.currentLocation=null,this.hospitals=[],this.selectedHospital=null,this.onSelect=null}async show(e){this.onSelect=e;try{this.currentLocation=await ge.getCurrentLocation(),this.hospitals=this.getNearbyHospitals(this.currentLocation,50),this.render(),this.attachEventListeners()}catch(t){console.error("[HospitalSelector] Error:",t),this.showError(t.message)}}getNearbyHospitals(e,t){const s=[];return Object.values(is).forEach(i=>{i.neurosurgicalCenters&&s.push(...i.neurosurgicalCenters),i.comprehensiveStrokeCenters&&s.push(...i.comprehensiveStrokeCenters),i.regionalStrokeUnits&&s.push(...i.regionalStrokeUnits)}),s.map(i=>({...i,distance:this.calculateDistance(e.latitude,e.longitude,i.coordinates.lat,i.coordinates.lng)})).filter(i=>i.distance<=t).sort((i,r)=>{const c=p=>{let l=0;return p.neurosurgery&&(l+=100),p.thrombectomy&&(l+=50),p.thrombolysis&&(l+=25),l},u=c(r)-c(i);return u!==0?u:i.distance-r.distance}).slice(0,10)}calculateDistance(e,t,s,n){const r=this.toRad(s-e),c=this.toRad(n-t),u=Math.sin(r/2)*Math.sin(r/2)+Math.cos(this.toRad(e))*Math.cos(this.toRad(s))*Math.sin(c/2)*Math.sin(c/2),p=2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u));return Math.round(6371*p*10)/10}toRad(e){return e*Math.PI/180}render(){const e=`
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
            ${this.hospitals.length>0?this.hospitals.map((s,n)=>this.renderHospitalCard(s,n)).join(""):'<p class="no-hospitals">Keine Krankenhäuser in der Nähe gefunden / No nearby hospitals found</p>'}
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
    `}attachEventListeners(){const e=document.getElementById("hospitalSelectorModal");if(!e)return;const t=document.getElementById("closeHospitalSelector");t&&t.addEventListener("click",()=>this.close());const s=document.getElementById("cancelHospitalSelect");s&&s.addEventListener("click",()=>this.close()),e.querySelectorAll(".select-hospital-button").forEach(i=>{i.addEventListener("click",r=>{const c=parseInt(r.target.dataset.hospitalIndex);this.selectHospital(c)})}),e.addEventListener("click",i=>{i.target===e&&this.close()}),document.addEventListener("keydown",this.handleEscKey)}selectHospital(e){this.selectedHospital=this.hospitals[e],console.log("[HospitalSelector] Hospital selected:",this.selectedHospital.name),this.onSelect&&this.onSelect(this.selectedHospital),this.close()}showError(e){var n;const t=`
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
    `,s=document.createElement("div");s.innerHTML=t,document.body.appendChild(s.firstElementChild),(n=document.getElementById("closeHospitalSelector"))==null||n.addEventListener("click",()=>this.close())}close(){const e=document.getElementById("hospitalSelectorModal");e&&e.remove(),document.removeEventListener("keydown",this.handleEscKey)}}const ma=new ha;class ga{constructor(){this.apiKey=G.googleMapsApiKey,this.directionsService=null,this.mapsLoaded=!1}async loadGoogleMaps(){return this.mapsLoaded&&window.google&&window.google.maps?!0:this.apiKey==="YOUR_GOOGLE_MAPS_API_KEY_HERE"?(console.warn("[ETACalculator] Google Maps API key not configured, using fallback"),!1):new Promise(e=>{if(window.google&&window.google.maps){this.mapsLoaded=!0,this.directionsService=new google.maps.DirectionsService,e(!0);return}const t=document.createElement("script");t.src=`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=geometry`,t.async=!0,t.defer=!0,t.onload=()=>{this.mapsLoaded=!0,this.directionsService=new google.maps.DirectionsService,console.log("[ETACalculator] Google Maps loaded"),e(!0)},t.onerror=()=>{console.error("[ETACalculator] Failed to load Google Maps"),e(!1)},document.head.appendChild(t)})}async calculateETA(e,t){if(await this.loadGoogleMaps())try{return await this.calculateGoogleMapsETA(e,t)}catch(s){console.warn("[ETACalculator] Google Maps failed, falling back:",s)}return this.calculateSimpleETA(e,t)}async calculateGoogleMapsETA(e,t){return new Promise((s,n)=>{this.directionsService.route({origin:new google.maps.LatLng(e.lat,e.lng),destination:new google.maps.LatLng(t.lat,t.lng),travelMode:google.maps.TravelMode.DRIVING,drivingOptions:{departureTime:new Date,trafficModel:google.maps.TrafficModel.PESSIMISTIC}},(i,r)=>{if(r===google.maps.DirectionsStatus.OK){const c=i.routes[0],u=c.legs[0],p=u.duration.value,d=Math.round(p*.7),m={duration:Math.round(d/60),distance:Math.round(u.distance.value/1e3),arrivalTime:new Date(Date.now()+d*1e3).toISOString(),route:this.encodeRoute(c),source:"google_maps"};console.log("[ETACalculator] Google Maps ETA:",{duration:`${m.duration} min`,distance:`${m.distance} km`}),s(m)}else n(new Error(`Google Maps Directions failed: ${r}`))})})}calculateSimpleETA(e,t){const s=this.calculateDistance(e.lat,e.lng,t.lat,t.lng),i=Math.round(s/80*60),r={duration:i,distance:Math.round(s*10)/10,arrivalTime:new Date(Date.now()+i*60*1e3).toISOString(),route:null,source:"estimated"};return console.log("[ETACalculator] Simple ETA:",{duration:`${r.duration} min`,distance:`${r.distance} km`}),r}calculateDistance(e,t,s,n){const r=this.toRad(s-e),c=this.toRad(n-t),u=Math.sin(r/2)*Math.sin(r/2)+Math.cos(this.toRad(e))*Math.cos(this.toRad(s))*Math.sin(c/2)*Math.sin(c/2);return 6371*(2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u)))}toRad(e){return e*Math.PI/180}encodeRoute(e){if(!e||!e.overview_path)return null;const t=e.overview_path,s=[];for(let n=0;n<t.length;n+=10)s.push({lat:t[n].lat(),lng:t[n].lng()});if(t.length>0){const n=t[t.length-1];s.push({lat:n.lat(),lng:n.lng()})}return s}async updateETA(e,t,s){const n=await this.calculateETA(e,t);return s&&Math.abs(n.duration-s.duration)>2&&console.log("[ETACalculator] ETA changed significantly:",{previous:`${s.duration} min`,new:`${n.duration} min`}),n}}const ht=new ga;class fa{constructor(){this.baseUrl=G.caseSharingUrl,this.activeCase=null,this.updateInterval=null,this.retryCount=0,this.maxRetries=3}async sendCase(e,t,s,n){try{console.log("[CaseTransmitter] Sending case to hospital:",n.name);const i=await ge.getCurrentLocation(),r=await ht.calculateETA({lat:i.latitude,lng:i.longitude},{lat:n.coordinates.lat,lng:n.coordinates.lng}),c={results:e,formData:this.sanitizeFormData(t),moduleType:s,location:{lat:i.latitude,lng:i.longitude,accuracy:i.accuracy,timestamp:i.timestamp},destination:{lat:n.coordinates.lat,lng:n.coordinates.lng},hospitalId:n.id,hospitalName:n.name,estimatedArrival:r.arrivalTime,distance:r.distance,duration:r.duration,ambulanceId:this.generateAmbulanceId()},u=await this.sendWithRetry(`${this.baseUrl}/store-case`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(!u.success)throw new Error(u.error||"Failed to store case");return console.log("[CaseTransmitter] Case created:",u.caseId),this.activeCase={caseId:u.caseId,hospital:n,startTime:Date.now()},this.startLocationTracking(),{success:!0,caseId:u.caseId,eta:r.duration}}catch(i){throw console.error("[CaseTransmitter] Failed to send case:",i),i}}startLocationTracking(){this.activeCase&&(console.log("[CaseTransmitter] Starting location tracking for case:",this.activeCase.caseId),ge.start(async e=>{await this.updateLocation(e)},e=>{console.error("[CaseTransmitter] GPS error:",e)}))}async updateLocation(e){if(this.activeCase)try{const t=await ht.calculateETA({lat:e.latitude,lng:e.longitude},{lat:this.activeCase.hospital.coordinates.lat,lng:this.activeCase.hospital.coordinates.lng}),s={caseId:this.activeCase.caseId,location:{lat:e.latitude,lng:e.longitude,accuracy:e.accuracy,timestamp:e.timestamp},estimatedArrival:t.arrivalTime,distance:t.distance,duration:t.duration};(await this.sendWithRetry(`${this.baseUrl}/update-location`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).success&&(console.log("[CaseTransmitter] Location updated:",{eta:`${t.duration} min`,distance:`${t.distance} km`}),this.retryCount=0)}catch(t){console.error("[CaseTransmitter] Failed to update location:",t)}}stopTracking(){this.activeCase&&(console.log("[CaseTransmitter] Stopping tracking for case:",this.activeCase.caseId),ge.stop(),this.markArrived(this.activeCase.caseId).catch(e=>{console.error("[CaseTransmitter] Failed to mark arrived:",e)}),this.activeCase=null)}async markArrived(e){try{const t=await this.sendWithRetry(`${this.baseUrl}/mark-arrived`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({caseId:e})});return console.log("[CaseTransmitter] Case marked as arrived"),t}catch(t){throw console.error("[CaseTransmitter] Failed to mark arrived:",t),t}}async sendWithRetry(e,t,s=1){try{const n=await fetch(e,{...t,timeout:1e4});if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`);return await n.json()}catch(n){if(s<this.maxRetries)return console.warn(`[CaseTransmitter] Retry ${s}/${this.maxRetries}:`,n.message),await this.sleep(1e3*Math.pow(2,s-1)),this.sendWithRetry(e,t,s+1);throw n}}sanitizeFormData(e){const t={...e};return["name","patientName","id","patientId","ssn","insurance"].forEach(n=>{t[n]&&delete t[n]}),t}generateAmbulanceId(){const e="RTW",t=["M","K","S","B"][Math.floor(Math.random()*4)],s=Math.floor(1e3+Math.random()*9e3);return`${e}-${t}-${s}`}getStatus(){if(!this.activeCase)return{isTracking:!1};const e=ge.getStatus();return{isTracking:!0,caseId:this.activeCase.caseId,hospital:this.activeCase.hospital.name,startTime:new Date(this.activeCase.startTime).toISOString(),duration:Math.floor((Date.now()-this.activeCase.startTime)/1e3/60),gpsActive:e.isTracking,hasLocation:e.hasLocation,lastUpdate:e.lastUpdateTime}}sleep(e){return new Promise(t=>setTimeout(t,e))}}const xe=new fa;function va(){document.addEventListener("click",async a=>{const e=a.target.closest("#shareToKiosk");e&&await ya(e),a.target.closest("#stopTracking")&&ka()}),console.log("[KioskHandlers] Kiosk handlers initialized")}async function ya(a){var e;try{if(xe.getStatus().isTracking){if(!confirm(`Ein Case wird bereits verfolgt. Möchten Sie diesen stoppen und einen neuen senden?

A case is already being tracked. Do you want to stop it and send a new one?`))return;xe.stopTracking(),(e=document.getElementById("trackingStatus"))==null||e.remove()}a.disabled=!0,a.classList.add("sending");const s=a.textContent;a.textContent="⏳ Krankenhaus auswählen... / Selecting Hospital...",ma.show(async n=>{try{a.textContent="📡 Sende Case... / Sending Case...";const i=h.getState(),{results:r,formData:c}=i;if(!r||!r.ich)throw new Error("No assessment results available");const u=ba(r);console.log("[KioskHandlers] Sending case:",{moduleType:u,hospital:n.name,ichRisk:Math.round(r.ich.probability*100)});const p=await xe.sendCase(r,c,u,n);a.classList.remove("sending"),a.classList.add("success"),a.textContent=`✓ Gesendet an / Sent to ${n.name}`,a.disabled=!1,wa(p.caseId,n,p.eta),setTimeout(()=>{a.classList.remove("success"),a.textContent=s},5e3)}catch(i){console.error("[KioskHandlers] Failed to send case:",i),Sa(a,s,i)}})}catch(t){console.error("[KioskHandlers] Hospital selection error:",t),a.classList.remove("sending"),a.textContent="❌ Fehler / Error - Try Again",a.disabled=!1}}function ba(a){if(!a.ich||!a.ich.module)return"unknown";const e=a.ich.module.toLowerCase();return e.includes("coma")?"coma":e.includes("limited")?"limited":e.includes("full")?"full":"unknown"}function wa(a,e,t){const s=document.getElementById("trackingStatus");s&&s.remove();const n=`
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
  `,i=document.querySelector(".results-actions");i&&(i.insertAdjacentHTML("afterend",n),setTimeout(()=>{var r;(r=document.getElementById("trackingStatus"))==null||r.scrollIntoView({behavior:"smooth",block:"nearest"})},100))}function ka(){if(confirm(`Möchten Sie das Live-Tracking beenden?

Do you want to stop live tracking?`)){xe.stopTracking();const e=document.getElementById("trackingStatus");e&&(e.style.transition="opacity 0.3s ease",e.style.opacity="0",setTimeout(()=>{e.remove()},300)),console.log("[KioskHandlers] Tracking stopped by user")}}function Sa(a,e,t){a.classList.remove("sending"),a.classList.add("error");let s="❌ Fehler / Error";t.message.includes("GPS")||t.message.includes("location")?s="❌ GPS-Fehler / GPS Error":(t.message.includes("network")||t.message.includes("fetch"))&&(s="❌ Netzwerkfehler / Network Error"),a.textContent=s,a.disabled=!1,setTimeout(()=>{a.classList.remove("error"),a.textContent=e},3e3)}function Ea(){document.addEventListener("click",async a=>{const e=a.target.closest("#shareCaseLink");e&&await Ta(e);const t=a.target.closest("#submitAcknowledgment");t&&await Ma(t)}),document.addEventListener("change",a=>{a.target.id==="avdAcknowledgment"&&Ca(a.target)}),console.log("[ShareHandlers] Share handlers initialized")}async function Ta(a){try{a.disabled=!0;const e=a.textContent;a.textContent="⏳ Generiere Link... / Generating Link...";const t=Ps();await Ds(t)?(a.classList.add("success"),a.textContent=`✓ ${o("shareCaseCopied")}`,Ia(a,o("shareCaseCopied")),setTimeout(()=>{a.classList.remove("success"),a.textContent=e,a.disabled=!1},5e3)):(alert(`Link generated:

${t}

Please copy this link manually.`),a.textContent=e,a.disabled=!1)}catch(e){console.error("[ShareHandlers] Failed to share case:",e),a.classList.add("error"),a.textContent="❌ Fehler / Error",a.disabled=!1,setTimeout(()=>{a.classList.remove("error"),a.textContent=`📲 ${o("shareCase")}`},3e3)}}function Ca(a){const e=document.getElementById("submitAcknowledgment");e&&(e.disabled=!a.checked)}async function Ma(a){try{const e=Tt();if(!e.isShared||!e.caseId){console.error("[ShareHandlers] No case ID found");return}a.disabled=!0;const t=a.textContent;if(a.textContent="⏳ Speichern... / Saving...",await Os(e.caseId)){a.classList.add("success"),a.textContent=`✓ ${o("acknowledgmentSuccess")}`;const n=document.getElementById("acknowledgmentStatus");n&&(n.innerHTML=`<span class="success-message">✓ ${o("acknowledgmentSuccess")}</span>`),setTimeout(()=>{const i=document.querySelector(".acknowledgment-section");i&&(i.innerHTML=`
            <div class="acknowledged-status">
              <span class="check-icon">✓</span>
              <span>${o("acknowledgmentSuccess")}</span>
            </div>
          `)},2e3)}else a.classList.add("error"),a.textContent="❌ Fehler / Error",a.disabled=!1,setTimeout(()=>{a.classList.remove("error"),a.textContent=t},3e3)}catch(e){console.error("[ShareHandlers] Failed to submit acknowledgment:",e),a.classList.add("error"),a.textContent="❌ Fehler / Error",a.disabled=!1}}function Ia(a,e){const t=document.createElement("div");t.className="share-success-toast",t.textContent=e,t.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    background: #00c853;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    font-size: 14px;
    animation: slideIn 0.3s ease;
  `,document.body.appendChild(t),setTimeout(()=>{t.style.animation="slideOut 0.3s ease",setTimeout(()=>{t.remove()},300)},4e3)}const La={BASE_URL:"/0825/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};let N=null;async function Pt(){return v(async()=>{N=await da(),setTimeout(()=>{_t({background:!0,criticalOnly:!1}).then(t=>{console.info("[Main] API warmup started:",t.status||"completed")}).catch(t=>{console.warn("[Main] API warmup failed:",t.message)})},2e3);const a=N.getStatus(),e=new CustomEvent("appInitialized",{detail:{timestamp:new Date().toISOString(),status:a,version:"2.1.0",build:"production"}});return document.dispatchEvent(e),N},a=>{throw Aa(a),a})}function Aa(a){const e=document.getElementById("appContainer");e&&(e.innerHTML=`
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
    `);const t=new CustomEvent("appInitializationFailed",{detail:{error:a.message,timestamp:new Date().toISOString(),userAgent:navigator.userAgent.substring(0,100)}});document.dispatchEvent(t)}function mt(){if(N)try{N.destroy()}catch(a){}}function $a(){document.addEventListener("visibilitychange",()=>{N&&document.visibilityState==="visible"&&(N.getStatus().isAuthenticated||window.location.reload())}),window.addEventListener("beforeunload",mt),window.addEventListener("unload",mt)}async function gt(){try{try{if(["localhost","127.0.0.1","0.0.0.0"].includes(window.location.hostname)&&!(import.meta&&La&&!1)&&"serviceWorker"in navigator){const s=await navigator.serviceWorker.getRegistrations();for(const n of s)try{await n.unregister()}catch(i){}window.addEventListener("beforeinstallprompt",n=>{n.preventDefault()})}}catch(t){}$a(),await Pt();const a=we();if(a.isKioskMode){console.log("[Main] Kiosk mode detected - loading case:",a.caseId);try{await vs(a.caseId);const t=document.getElementById("appContainer");t&&ne(t)}catch(t){console.error("[Main] Failed to load kiosk case:",t);const s=document.getElementById("appContainer");s&&(s.innerHTML=`
            <div class="container" style="text-align: center; padding: 40px;">
              <h2>⚠️ Case Not Found</h2>
              <p>The requested case could not be loaded.</p>
              <button onclick="window.location.href='https://igfap.eu/kiosk/'" class="primary">
                🏠 Return to Case List
              </button>
            </div>
          `);return}}va(),Ea();const e=new CustomEvent("appReady",{detail:{timestamp:new Date().toISOString(),version:"2.1.0"}});document.dispatchEvent(e)}catch(a){}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",gt):gt();typeof window!="undefined"&&(window.iGFAPApp={getApp:()=>N,getStatus:()=>(N==null?void 0:N.getStatus())||{error:"App not initialized"},restart:async()=>(N&&N.destroy(),Pt()),getCurrentScreen:()=>{try{return h.getState().currentScreen}catch(a){return"unknown"}},forceResults:()=>{try{h.navigate("results");const a=document.getElementById("appContainer");return a&&ne(a),!0}catch(a){return!1}}});
//# sourceMappingURL=index-BLlcIVfQ.js.map
