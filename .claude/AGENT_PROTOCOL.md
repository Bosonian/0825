# Agent Coordination Protocol
## Standardized Agent Communication for Medical Software

**Version**: 1.0
**Last Updated**: 2025-10-30
**Status**: Active

---

## Purpose

This protocol defines how agents communicate, hand off tasks, and coordinate their work to ensure:
1. No duplicate analysis
2. Complete coverage (no gaps)
3. Efficient workflows
4. Traceable decision chains

---

## Agent Output Format

All agents MUST return structured JSON with these fields:

```json
{
  "agent": "Medical-Safety-Validator",
  "version": "1.0",
  "status": "complete",
  "timestamp": "2025-10-30T16:30:00Z",
  "findings": [
    {
      "severity": "critical",
      "category": "data_integrity",
      "description": "Reference sharing in case-listener.js:184",
      "location": "kiosk-temp/src/services/case-listener.js:184-189",
      "impact": "Data corruption between cases",
      "recommendation": "Use JSON.parse(JSON.stringify()) for deep clone"
    }
  ],
  "metrics": {
    "files_analyzed": 8,
    "lines_reviewed": 2100,
    "issues_found": 5,
    "critical": 2,
    "high": 2,
    "medium": 1
  },
  "handoff": {
    "next_agent": "Debugger",
    "context": {
      "focus_areas": ["case-listener.js:184-189", "case-detail.js:122"],
      "recommended_tests": ["Test case data isolation", "Test concurrent case arrival"],
      "dependencies": []
    },
    "reason": "Need root cause analysis of reference sharing bug"
  }
}
```

---

## Required Fields

### Mandatory (All Agents)

| Field | Type | Description |
|-------|------|-------------|
| `agent` | string | Agent name (e.g., "Medical-Safety-Validator") |
| `status` | enum | "complete", "partial", "failed", "blocked" |
| `timestamp` | ISO8601 | When analysis completed |
| `findings` | array | List of issues/observations found |

### Recommended (Most Agents)

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Agent version for reproducibility |
| `metrics` | object | Quantifiable measures of analysis |
| `handoff` | object | Info for next agent in chain |

---

## Finding Object Structure

Each finding MUST include:

```json
{
  "severity": "critical",          // "critical" | "high" | "medium" | "low"
  "category": "data_integrity",    // Classification tag
  "description": "Clear problem statement",
  "location": "file.js:line-range",
  "impact": "What happens if not fixed",
  "recommendation": "Specific fix suggestion"
}
```

### Optional Finding Fields

- `code_snippet`: Relevant code section
- `fix_effort`: Estimated time ("5min", "2h", "1day")
- `priority`: Urgency ranking (1-5)
- `reproducible`: Boolean - can be consistently reproduced

---

## Agent Handoff Protocol

### When to Hand Off

Hand off to another agent when:
1. **Complementary expertise needed** - "I found the bug, Debugger can analyze root cause"
2. **Sequential workflow** - "Security audit complete, Performance can optimize now"
3. **Verification required** - "I fixed it, Medical-Safety should validate"

### Handoff Object

```json
{
  "next_agent": "Debugger",
  "context": {
    "focus_areas": ["Files or code sections"],
    "recommended_tests": ["What to test"],
    "dependencies": ["What must be done first"],
    "findings_summary": "Brief context"
  },
  "reason": "Why this agent should go next",
  "urgency": "normal"  // "critical" | "high" | "normal" | "low"
}
```

---

## Status Codes

| Status | Meaning | Next Action |
|--------|---------|-------------|
| `complete` | Task fully finished | Hand off or end |
| `partial` | Some work done, more needed | Continue or hand off |
| `failed` | Could not complete | Report error, suggest alternative |
| `blocked` | Waiting for dependency | Specify what's blocking |

---

## Agent Chains

### Medical Validation Chain

```
Data-Scientist → Medical-Safety → Code-Reviewer
```

**Flow**:
1. Data-Scientist validates input ranges & statistical accuracy
2. Medical-Safety verifies clinical decision logic
3. Code-Reviewer ensures implementation correctness

**Example Handoff**:
```json
{
  "agent": "Data-Scientist",
  "status": "complete",
  "findings": [...],
  "handoff": {
    "next_agent": "Medical-Safety-Validator",
    "context": {
      "focus_areas": ["ich-volume-calculator.js", "prediction-models.js"],
      "validated_ranges": {
        "GFAP": "29-10001 pg/mL ✅",
        "GCS": "3-15 ✅"
      },
      "concerns": ["Volume calculation uses ABC/2 - verify formula"]
    }
  }
}
```

### Security Audit Chain

```
Security-Auditor → Debugger → Performance-Optimizer
```

**Flow**:
1. Security-Auditor finds vulnerabilities
2. Debugger root-causes security issues
3. Performance-Optimizer ensures fixes don't degrade performance

### Bug Investigation Chain

```
Debugger → Data-Scientist → Medical-Safety
```

**Flow**:
1. Debugger finds bugs
2. Data-Scientist traces data flow to understand bug cause
3. Medical-Safety validates fix doesn't introduce clinical errors

---

## Parallel Agent Execution

When agents can work simultaneously, coordinate via shared context:

```json
{
  "parallel_execution": true,
  "agents": [
    {
      "agent": "Security-Auditor",
      "task": "Audit authentication.js"
    },
    {
      "agent": "Performance-Optimizer",
      "task": "Profile kiosk polling"
    },
    {
      "agent": "Medical-Safety",
      "task": "Validate ICH calculations"
    }
  ],
  "consolidation_agent": "Code-Reviewer",
  "consolidation_task": "Synthesize all findings into release checklist"
}
```

---

## Error Handling Protocol

### Agent Failure

If agent fails, return:

```json
{
  "agent": "Performance-Optimizer",
  "status": "failed",
  "error": {
    "code": "PROFILING_TOOL_NOT_FOUND",
    "message": "Chrome DevTools not available",
    "suggestion": "Use alternative profiling method or skip FPS analysis"
  },
  "partial_results": {
    "memory_analysis": "completed",
    "fps_analysis": "failed",
    "network_analysis": "completed"
  }
}
```

### Agent Blocked

If agent is blocked:

```json
{
  "agent": "Medical-Safety-Validator",
  "status": "blocked",
  "blocking_issue": "Missing medical context file",
  "required": ".claude/MEDICAL_CONTEXT.md",
  "workaround": "Can proceed with limited validation using inline knowledge"
}
```

---

## Context Preservation

Agents MUST preserve context across handoffs:

```json
{
  "context_chain": [
    {
      "agent": "Data-Scientist",
      "findings_count": 4,
      "key_insight": "Data flow breaks at PWA → Cloud Function boundary"
    },
    {
      "agent": "Debugger",
      "findings_count": 1,
      "key_insight": "Root cause: Missing JSON.stringify before transmission"
    }
  ],
  "accumulated_evidence": [
    "case-transmitter.js:237 - shallow copy",
    "cloud-function/main.py:145 - expects deep object"
  ]
}
```

---

## Metrics Standardization

### Performance Metrics

```json
{
  "performance": {
    "api_response_time_ms": 650,
    "animation_fps": 45,
    "memory_stable": true,
    "polling_overhead_ms": 200,
    "bundle_size_kb": 196
  }
}
```

### Security Metrics

```json
{
  "security": {
    "vulnerabilities_found": 3,
    "hipaa_compliance_score": 95,
    "critical_issues": 0,
    "secrets_exposed": 0,
    "auth_score": 90
  }
}
```

### Medical Safety Metrics

```json
{
  "medical_safety": {
    "data_integrity_score": 92,
    "clinical_accuracy": 100,
    "range_violations": 0,
    "calculation_errors": 0,
    "patient_safety_risks": 1
  }
}
```

---

## Best Practices

### DO ✅

- Use consistent field names across all agents
- Include specific file locations (file.js:line)
- Provide actionable recommendations
- Estimate fix effort when possible
- Preserve context chain for traceability
- Return structured JSON (not freeform text)

### DON'T ❌

- Return vague descriptions ("There's a problem")
- Omit file locations ("Somewhere in the code")
- Skip severity classification
- Break the JSON structure
- Duplicate analysis another agent did
- Recommend fixes without understanding impact

---

## Example: Complete Agent Workflow

### Scenario: Fix PWA-Kiosk Data Corruption

**Step 1: Data-Scientist Analysis**

```json
{
  "agent": "Data-Scientist",
  "status": "complete",
  "findings": [
    {
      "severity": "critical",
      "category": "data_flow",
      "description": "PWA sends shallow copy, kiosk expects deep object",
      "location": "case-transmitter.js:237",
      "impact": "Cases share references, data corruption possible",
      "recommendation": "Deep clone before transmission"
    }
  ],
  "handoff": {
    "next_agent": "Debugger",
    "context": {
      "focus_areas": ["case-transmitter.js:237-251", "case-listener.js:184-189"],
      "reproduction_steps": ["Open 2 kiosks", "Send 2 cases within 100ms", "Observe data mixing"],
      "validated": "Confirmed data corruption in 3/10 test cases"
    },
    "reason": "Need root cause analysis and fix verification"
  }
}
```

**Step 2: Debugger Fix & Test**

```json
{
  "agent": "Debugger",
  "status": "complete",
  "findings": [
    {
      "severity": "critical",
      "category": "bug_fix",
      "description": "Added JSON.parse(JSON.stringify()) deep clone",
      "location": "case-transmitter.js:237",
      "fix_applied": true,
      "testing": {
        "before": "3/10 cases showed data mixing",
        "after": "0/100 cases showed data mixing",
        "confidence": "high"
      }
    }
  ],
  "handoff": {
    "next_agent": "Medical-Safety-Validator",
    "context": {
      "fix_applied": "Deep clone before transmission",
      "testing_completed": true,
      "verification_needed": "Ensure fix doesn't break medical data integrity"
    },
    "reason": "Medical validation required before deployment"
  }
}
```

**Step 3: Medical-Safety Validation**

```json
{
  "agent": "Medical-Safety-Validator",
  "status": "complete",
  "findings": [
    {
      "severity": "low",
      "category": "validation",
      "description": "Deep clone preserves all medical data correctly",
      "testing": {
        "gfap_values": "preserved ✅",
        "gcs_scores": "preserved ✅",
        "timestamps": "preserved ✅",
        "ich_predictions": "preserved ✅"
      },
      "approval": "Safe to deploy"
    }
  ],
  "handoff": null,  // No further handoff needed
  "deployment_approval": true
}
```

---

## Compliance

All agents working on medical software MUST:

1. **Log all analysis** to `.claude/logs/`
2. **Preserve audit trail** in handoff chain
3. **Never expose patient data** in logs
4. **Validate medical accuracy** before approval
5. **Report HIPAA implications** if found

---

## Version History

- **1.0** (2025-10-30): Initial protocol definition
  - Defined JSON output format
  - Established handoff mechanism
  - Created medical validation chain
  - Added metrics standardization

---

## Quick Reference Card

```
🔄 AGENT WORKFLOW

1. Receive task + context
2. Analyze using expertise
3. Generate structured JSON output
4. Hand off to next agent (if needed)
5. Log completion

📋 REQUIRED OUTPUT FIELDS

- agent (string)
- status (complete|partial|failed|blocked)
- timestamp (ISO8601)
- findings (array)

🔗 HANDOFF CHECKLIST

- ✅ Specify next_agent
- ✅ Provide context & focus areas
- ✅ Explain why handoff is needed
- ✅ Include accumulated evidence

⚠️ MEDICAL SOFTWARE RULES

- 🚫 No patient data in logs
- ✅ Validate medical accuracy
- ✅ Preserve HIPAA compliance
- ✅ Maintain audit trail
```

---

**This protocol ensures coordinated, efficient, and safe agent collaboration for medical software development.**
