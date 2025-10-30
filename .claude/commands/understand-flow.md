---
description: Map out complete data flow from PWA to Kiosk
---

Launch 3 Explore agents in parallel to map the complete data flow:

1. **PWA Data Collection Flow** (medium thoroughness):
   - Trace from user input in assessment forms
   - Through API calls to Cloud Functions
   - To case storage in Cloud Storage
   - Document all data transformations

2. **Cloud Function Processing** (medium thoroughness):
   - How case-sharing receives case data
   - Data sanitization and validation
   - Storage structure in Cloud Storage
   - Archive and cleanup mechanisms

3. **Kiosk Display Flow** (medium thoroughness):
   - Polling mechanism for new cases
   - Data retrieval from Cloud Storage
   - Rendering in case cards
   - Real-time updates and notifications

After exploration, create a comprehensive flow diagram in markdown with:
- Sequence of operations
- Data format at each step
- Key functions and files involved
- Error handling at each stage
- Security checks in place
