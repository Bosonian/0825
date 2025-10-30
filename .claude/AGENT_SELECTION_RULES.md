# Priority-Based Agent Selection Rules
## Automatic Agent Selection for Medical Software Tasks

**Last Updated**: 2025-10-30

---

## Task Classification System

### Priority Levels

| Level | Description | Response Time | Agents |
|-------|-------------|---------------|--------|
| **🔴 CRITICAL** | Life-threatening potential | <60s | 3-4 agents in parallel |
| **🟡 HIGH** | Safety/security impact | <120s | 2-3 agents |
| **🟢 MEDIUM** | Quality improvement | <300s | 1-2 agents |
| **⚪ LOW** | Nice-to-have | <180s | 1 agent |

---

## Automatic Agent Selection

### CRITICAL Tasks (Parallel Execution)

**Triggers**:
- Keywords: "data mixing", "patient safety", "data corruption", "authentication bypass"
- File patterns: `auth/*.js`, `*-sanitize*.js`, medical calculation files
- Impact: Could harm patients or violate HIPAA

**Agents** (ALL in parallel):
1. **Medical-Safety-Validator** - Check patient safety impact
2. **Security-Auditor** - Check HIPAA/security implications
3. **Debugger** - Find root cause immediately
4. **Data-Scientist** (optional) - Trace data flow if data-related

**Timeout**: 60 seconds max

**Example**:
```
User: "The kiosk is showing wrong patient data sometimes"

Auto-select:
- Medical-Safety-Validator (CRITICAL: data mixing risk)
- Security-Auditor (CRITICAL: HIPAA violation risk)
- Debugger (CRITICAL: find bug immediately)
- Data-Scientist (HIGH: trace data flow)
```

---

### HIGH Priority Tasks

**Triggers**:
- Keywords: "memory leak", "security", "authentication", "API error", "crash"
- Performance degradation
- Security vulnerabilities

**Agents** (2-3 in parallel):
- **Debugger** + **Performance-Optimizer** (for memory/performance issues)
- **Security-Auditor** + **Debugger** (for security issues)
- **Medical-Safety** + **Debugger** (for calculation errors)

**Timeout**: 120 seconds

**Example**:
```
User: "The kiosk has a memory leak"

Auto-select:
- Debugger (HIGH: find leak source)
- Performance-Optimizer (HIGH: profile memory usage)
```

---

### MEDIUM Priority Tasks

**Triggers**:
- Keywords: "optimize", "refactor", "improve", "polish", "review"
- Code quality improvements
- Performance enhancements

**Agents** (1-2):
- **Code-Reviewer** (for code quality)
- **Performance-Optimizer** (for optimization)
- **Medical-Safety** (for medical calculation reviews)

**Timeout**: 300 seconds

**Example**:
```
User: "Review the results page for improvements"

Auto-select:
- Code-Reviewer (MEDIUM: code quality check)
- Performance-Optimizer (MEDIUM: performance review)
```

---

### LOW Priority Tasks

**Triggers**:
- Keywords: "documentation", "comment", "style", "format"
- Minor improvements
- Documentation updates

**Agents** (1):
- **Code-Reviewer** (single agent, quick review)

**Timeout**: 180 seconds

**Example**:
```
User: "Add comments to this function"

Auto-select:
- Code-Reviewer (LOW: simple task)
```

---

## Task-to-Agent Mapping

### Data Issues → Data-Scientist

**When to use**:
- Data flow problems
- Statistical accuracy questions
- ML model validation
- Data integrity issues

**Keywords**: `data flow`, `prediction`, `model`, `accuracy`, `validation`, `integrity`

---

### Bugs → Debugger

**When to use**:
- Runtime errors
- Logic bugs
- Race conditions
- Memory leaks

**Keywords**: `bug`, `error`, `crash`, `leak`, `race condition`, `not working`

---

### Performance → Performance-Optimizer

**When to use**:
- Slow operations
- FPS issues
- Network performance
- Memory usage

**Keywords**: `slow`, `lag`, `fps`, `performance`, `optimize`, `memory`

---

### Security → Security-Auditor

**When to use**:
- Authentication issues
- HIPAA compliance
- Secrets management
- API security

**Keywords**: `security`, `auth`, `password`, `token`, `hipaa`, `compliance`

---

### Medical Accuracy → Medical-Safety-Validator

**When to use**:
- Medical calculations
- Clinical decision logic
- Patient safety
- Range validation

**Keywords**: `gfap`, `gcs`, `ich`, `calculation`, `medical`, `clinical`, `patient safety`

---

### Code Quality → Code-Reviewer

**When to use**:
- Code review
- Refactoring
- Best practices
- Documentation

**Keywords**: `review`, `refactor`, `clean`, `document`, `comment`

---

## Workflow Decision Tree

```
User Request
    ↓
[Keywords Analysis]
    ↓
┌───────────────────────────────────────┐
│ Contains CRITICAL keywords?           │
│ (patient safety, data mixing, auth)   │
└───────────────────────────────────────┘
    ↓ YES                    ↓ NO
[CRITICAL]              [Check HIGH]
    ↓                        ↓
Medical-Safety         Contains HIGH keywords?
Security-Auditor       (memory leak, security, crash)
Debugger                    ↓ YES          ↓ NO
Data-Scientist         [HIGH]         [Check MEDIUM]
(all parallel)         Debugger +          ↓
                       relevant      Contains MEDIUM keywords?
                       agent         (optimize, review, improve)
                                          ↓ YES        ↓ NO
                                     [MEDIUM]      [LOW]
                                     1-2 agents    1 agent
```

---

## Special Cases

### Feature Addition

```
Task: "Add SMS notifications"

Agent Selection:
1. Security-Auditor (check SMS API security)
2. Medical-Safety (check notification timing safety)
3. Performance-Optimizer (check latency impact)

Priority: MEDIUM
Execution: Parallel for research phase
```

### Pre-Release Check

```
Task: "Run all quality checks before deploy"

Agent Selection:
1. Medical-Safety-Validator ✅
2. Performance-Optimizer ✅
3. Security-Auditor ✅
4. Code-Reviewer ✅
5. Debugger ✅

Priority: HIGH
Execution: ALL in parallel
Timeout: 300s (comprehensive check)
```

### Bug Investigation

```
Task: "The kiosk shows duplicate cases"

Agent Selection:
1. Debugger (find bug)
2. Data-Scientist (trace data flow)
3. Medical-Safety (check if patient data mixed)

Priority: CRITICAL
Execution: Parallel
```

---

## Agent Combination Rules

### Compatible (Can run in parallel)

✅ Medical-Safety + Security-Auditor
✅ Debugger + Performance-Optimizer
✅ Data-Scientist + Medical-Safety
✅ Security-Auditor + Code-Reviewer

### Sequential (Must run in order)

1. Data-Scientist → Medical-Safety → Code-Reviewer
   - Validate data → Verify medical logic → Check implementation

2. Security-Auditor → Debugger → Performance-Optimizer
   - Find vulnerability → Fix it → Ensure fix doesn't slow down app

3. Debugger → Data-Scientist → Medical-Safety
   - Find bug → Understand data flow → Validate fix safety

---

## Quick Reference

```bash
# CRITICAL (Parallel: 3-4 agents, <60s)
- Data mixing, patient safety, auth bypass
- Medical-Safety + Security + Debugger + Data-Scientist

# HIGH (Parallel: 2-3 agents, <120s)
- Memory leaks, security issues, crashes
- Debugger + Performance OR Security + Debugger

# MEDIUM (1-2 agents, <300s)
- Optimization, refactoring, reviews
- Code-Reviewer + Performance

# LOW (1 agent, <180s)
- Documentation, comments, minor fixes
- Code-Reviewer
```

---

## Automation Examples

### Example 1: User says "Is the authentication secure?"

```python
keywords = ["authentication", "secure"]
priority = HIGH (security-related)
agents = ["Security-Auditor"]  # Single agent sufficient for review
execution = "sequential"
timeout = 120
```

### Example 2: User says "The kiosk crashes when showing ICH results"

```python
keywords = ["crash", "ich", "results"]
priority = CRITICAL (crash + medical)
agents = ["Debugger", "Medical-Safety-Validator", "Data-Scientist"]
execution = "parallel"
timeout = 60
reason = "Crash affects patient care + medical data involved"
```

### Example 3: User says "Optimize the blood animation"

```python
keywords = ["optimize", "animation"]
priority = MEDIUM (performance improvement)
agents = ["Performance-Optimizer"]
execution = "sequential"
timeout = 300
```

---

## Escalation Rules

### When to Escalate Priority

Escalate from **MEDIUM → HIGH** if:
- Task affects patient care workflow
- Multiple failures detected
- Time-sensitive (< 24h to fix)

Escalate from **HIGH → CRITICAL** if:
- Patient safety at risk
- HIPAA violation possible
- Data corruption detected
- Authentication compromised

### De-escalation

De-escalate from **CRITICAL → HIGH** if:
- Issue is theoretical (not actively occurring)
- Workaround exists
- Affects non-critical path

---

## Success Metrics

Track these to optimize agent selection:

1. **Time to resolution** (by priority level)
2. **Agent accuracy** (how often agent finds issue)
3. **False positives** (agent reports non-issue)
4. **Coverage** (% of code/issues found)
5. **User satisfaction** (issue actually fixed)

**Target Metrics**:
- CRITICAL tasks: 100% success rate, <5 min resolution
- HIGH tasks: >95% success rate, <15 min resolution
- MEDIUM tasks: >90% success rate, <30 min resolution
- LOW tasks: >85% success rate, <10 min resolution

---

**This selection system ensures the right agents are deployed for each task, optimizing speed and accuracy while maintaining medical safety standards.**
