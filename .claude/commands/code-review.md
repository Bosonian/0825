---
description: Comprehensive code review of recent changes
---

Launch a General-Purpose agent to perform comprehensive code review:

**Review Scope**: All uncommitted changes or last commit

**Review Checklist**:

1. **Code Quality**:
   - Follow project conventions and patterns?
   - Proper error handling?
   - Meaningful variable/function names?
   - Appropriate comments?

2. **Security**:
   - No hardcoded secrets or passwords?
   - Proper input validation?
   - SQL injection prevention?
   - XSS prevention?

3. **Performance**:
   - Efficient algorithms?
   - No unnecessary re-renders?
   - Proper memory management?
   - Optimized database queries?

4. **Testing**:
   - Tests included for new features?
   - Edge cases covered?
   - Error cases tested?

5. **Accessibility**:
   - Proper ARIA labels?
   - Keyboard navigation?
   - Screen reader friendly?

6. **Medical Safety** (Critical for this project):
   - Data integrity maintained?
   - No patient data mixing?
   - Proper validation of medical values?
   - Clear error messages for medical staff?

**Output Format**:
- ✅ Passed checks
- ⚠️  Warnings (should fix)
- 🚨 Critical issues (must fix)
- 💡 Suggestions for improvement
