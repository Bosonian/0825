---
description: Run comprehensive security audit across PWA, Kiosk, and Cloud Functions
---

Launch 4 Explore agents (very thorough) in parallel to audit security:

1. **Password & Credentials Audit**: Find all password handling, API keys, secrets, and credential storage across the entire codebase
2. **Input Validation Audit**: Find all user inputs that aren't sanitized or validated in PWA, kiosk, and cloud functions
3. **API Security Audit**: Find all API endpoints, check for authentication, rate limiting, and CORS configuration
4. **Data Storage Audit**: Find all database operations, localStorage, sessionStorage usage and check for encryption

After all agents complete, create a security audit report in markdown format with:
- Critical issues (immediate action required)
- Medium issues (should fix soon)
- Low issues (nice to have)
- Recommendations for each finding
