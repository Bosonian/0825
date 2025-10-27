# iOS App Bug Report and Fixes

## Date: 2025-10-22

## Critical Bugs Found

### 1. AppState.swift - Async Sleep Error
**Location:** `/iGFAPStrokeAssistant/App/AppState.swift:89`

**Issue:** Missing `try` keyword and parameter label for Task.sleep
```swift
// WRONG:
await Task.sleep(500_000_000)

// CORRECT:
try await Task.sleep(nanoseconds: 500_000_000)
```

**Impact:** Code will not compile
**Severity:** HIGH
**Status:** NEEDS FIX

---

### 2. Test Files - Incorrect Method Names
**Location:** Multiple test files

**Issue:** Test files reference methods that don't exist in AppState:
- `appState.navigateTo()` should be `appState.navigate(to:)`
- `appState.showError(message:)` should be `appState.setError()`
- `appState.dismissError()` should be `appState.clearError()`
- `appState.updatePatientData()` does not exist - should directly set `currentPatientData`
- `appState.resetToTriage()` should be `appState.reset()`

**Impact:** Tests will not compile
**Severity:** HIGH
**Status:** NEEDS FIX

---

### 3. Test Files - Missing Async Context
**Location:** `AppStateTests.swift` - Multiple test methods

**Issue:** Some test methods call async functions but aren't marked as `async`
```swift
// WRONG:
func testSubmitComaAssessment() {
    await appState.submitComaAssessment(gfap: 500)
}

// CORRECT:
func testSubmitComaAssessment() async {
    await appState.submitComaAssessment(gfap: 500)
}
```

**Impact:** Tests will not compile
**Severity:** HIGH
**Status:** NEEDS FIX

---

### 4. AppState.swift - Login Method Signature
**Location:** `/iGFAPStrokeAssistant/App/AppState.swift:82`

**Issue:** Login method is marked as `async` but doesn't actually make async calls (except Task.sleep)
Should either:
1. Add `try` to Task.sleep call
2. Or make login method non-async and just use regular Task

**Impact:** Potential runtime issues
**Severity:** MEDIUM
**Status:** NEEDS FIX

---

### 5. Test Files - Missing `@MainActor` on Test Setup
**Location:** `AppStateTests.swift:16-17`

**Issue:** setUp/tearDown marked with `@MainActor` but not needed since AppState handles it
Actually this is OK since AppState is @MainActor - the tests need to be on MainActor too.

**Impact:** None - this is correct
**Severity:** NONE
**Status:** OK

---

### 6. PredictionService Tests - Invalid Test Assumptions
**Location:** `PredictionServiceTests.swift`

**Issue:** Tests assume network calls will succeed, but in a test environment the API endpoints may not be accessible. Need mock service or conditional testing.

**Tests that need network:**
- `testComaICHPredictionValidInput`
- `testLimitedICHPredictionValidData`
- `testFullStrokePredictionValidData`

**Recommendation:** Create a `MockPredictionService` for unit tests

**Impact:** Tests will fail in environments without network access
**Severity:** MEDIUM
**Status:** NEEDS IMPROVEMENT

---

### 7. Missing APIError Definition
**Location:** Referenced in `PredictionService.swift:145` but not defined

**Issue:** Need to create APIError enum

**Impact:** Code will not compile
**Severity:** HIGH
**Status:** NEEDS FIX

---

### 8. Missing Results Property in Assessment
**Location:** `AppState.swift:143-147`

**Issue:** Creating `AssessmentResults` with property name `ich` but then accessing `currentAssessment?.results?.ichPrediction`

Looking closer at Assessment.swift:82-84, the property is named `ich`, not `ichPrediction`.
Actually in Assessment.swift line 83 it's `let ich: ICHPrediction`
So this is CORRECT.

**Impact:** None
**Severity:** NONE
**Status:** OK

---

### 9. ICHVolumeCalculator and LVOModel Missing Import
**Location:** Test files reference these but may not import them correctly

**Issue:** Need to verify @testable import brings in all domain models

**Impact:** Potential import errors
**Severity:** LOW
**Status:** VERIFY

---

## Summary

**Critical Issues (Will Not Compile):**
1. AppState.swift Line 89 - Missing `try` for Task.sleep
2. Test files - Incorrect method names throughout
3. Test files - Missing `async` keywords
4. Missing APIError definition

**Medium Issues (Runtime Problems):**
5. PredictionService tests need mocking
6. Login method async handling

**Low Issues (Code Quality):**
7. Import verification needed

## Fixes Required

See next section for code fixes.
