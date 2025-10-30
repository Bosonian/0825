---
description: Clean up code quality issues
---

Launch 4 Explore agents (very thorough) in parallel to find cleanup opportunities:

1. **Dead Code**:
   - Unused functions
   - Unused variables
   - Commented out code
   - Unreachable code
   - Unused imports

2. **Debug Code**:
   - console.log statements
   - debugger statements
   - Test data
   - Development-only code in production

3. **Code Smells**:
   - Duplicate code
   - Long functions (>50 lines)
   - Too many parameters (>5)
   - Magic numbers
   - Hardcoded values that should be constants

4. **Documentation Issues**:
   - Missing JSDoc comments
   - Outdated comments
   - TODO/FIXME comments
   - Missing README sections

After finding issues, create a cleanup plan:
- Quick fixes (automated)
- Manual fixes required
- Refactoring opportunities
- Estimated time for each

Ask user which items to fix before proceeding.
