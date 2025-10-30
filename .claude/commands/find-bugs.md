---
description: Hunt for common bugs and code smells
---

Launch 3 Explore agents (very thorough) in parallel to find bugs:

1. **Logic Bugs**:
   - Undefined variable access
   - Null/undefined checks missing
   - Off-by-one errors
   - Incorrect boolean logic
   - Race conditions in async code
   - Missing error handlers in promises

2. **Data Bugs**:
   - Type mismatches
   - String/number confusion
   - Date handling errors
   - Timezone issues
   - Data validation gaps
   - Deep clone vs shallow clone issues

3. **Integration Bugs**:
   - CORS misconfigurations
   - API endpoint mismatches
   - Incorrect request/response formats
   - Missing authentication checks
   - Rate limiting gaps
   - Session management issues

After finding issues, categorize and prioritize:
- 🔴 Critical (causes crashes or data loss)
- 🟡 High (causes incorrect behavior)
- 🟢 Medium (causes minor issues)
- 🔵 Low (code smells, potential issues)

Include:
- File and line number
- Description of the bug
- Potential impact
- Suggested fix
