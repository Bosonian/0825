# Agentic Coding Architecture for Stroke Triage Assistant

**Multi-Agent Development System for Medical Software**

---

## 🏗️ Architecture Overview

```
User Request
    ↓
Primary Agent (Orchestrator)
    ↓
    ├─→ Medical-Safety-Validator ⚕️  (Green)
    ├─→ Performance-Optimizer 🚀     (Purple)
    ├─→ Security-Auditor 🔒          (Green)
    ├─→ Data-Scientist 📊            (Red)
    ├─→ Debugger 🐛                  (Orange)
    └─→ Code-Reviewer 👁️            (Green)
    ↓
Primary Agent (Synthesis)
    ↓
User (Results + Recommendations)
```

---

## 🎯 Specialized Agents for Medical Software

### 1. **Medical-Safety-Validator** ⚕️
**Role**: Ensure patient safety and medical accuracy

**Responsibilities**:
- Validate medical value ranges (GFAP: 29-10001 pg/mL, blood pressure, GCS scores)
- Check data integrity (no patient data mixing)
- Verify ICH/LVO probability calculations
- Ensure proper error handling for critical medical data
- Validate timestamp accuracy for time-critical decisions
- Check for race conditions in patient data updates

**Triggers**:
- Any change to medical calculations
- Data flow modifications
- API endpoint updates
- Database schema changes

**Output**: Medical safety report with critical/high/medium/low findings

---

### 2. **Performance-Optimizer** 🚀
**Role**: Ensure real-time performance for emergency use

**Responsibilities**:
- Profile blood animation rendering (60fps target)
- Optimize API response times (<500ms for predictions)
- Minimize kiosk polling overhead
- Reduce PWA bundle size
- Optimize database queries
- Check for memory leaks in long-running kiosk

**Targets**:
- API Response: <500ms (p95)
- Animation FPS: 60fps (all devices)
- Kiosk Polling: <100ms overhead
- PWA Load Time: <2s on 3G
- Memory: No leaks over 24h kiosk operation

**Output**: Performance report with bottlenecks and optimization plan

---

### 3. **Security-Auditor** 🔒
**Role**: HIPAA compliance and security hardening

**Responsibilities**:
- Scan for hardcoded secrets/passwords
- Validate all user input sanitization
- Check API authentication/authorization
- Review CORS configurations
- Audit data encryption (at rest, in transit)
- Check rate limiting on all endpoints
- Validate session management

**Compliance**:
- HIPAA data privacy
- GDPR compliance (EU patients)
- Medical device software regulations

**Output**: Security audit with compliance checklist

---

### 4. **Data-Scientist** 📊
**Role**: Validate ML models and statistical accuracy

**Responsibilities**:
- Validate ICH/LVO prediction model inputs
- Check probability calculation accuracy
- Verify statistical significance
- Analyze prediction confidence intervals
- Review data preprocessing pipelines
- Validate model versioning

**Quality Gates**:
- Model accuracy meets clinical standards
- Proper handling of edge cases
- Confidence scores properly calibrated
- Input validation prevents garbage in/out

**Output**: Model validation report with accuracy metrics

---

### 5. **Debugger** 🐛
**Role**: Hunt and fix bugs proactively

**Responsibilities**:
- Find null/undefined errors
- Detect race conditions (GPS updates, case polling)
- Identify data type mismatches
- Check for infinite loops/recursion
- Find unreachable code
- Detect improper error handling

**Focus Areas**:
- Async operations (promises, fetch calls)
- Real-time data updates
- Cross-component data flow
- Browser compatibility issues

**Output**: Bug report with severity ranking and fixes

---

### 6. **Code-Reviewer** 👁️
**Role**: Maintain code quality and consistency

**Responsibilities**:
- Enforce coding standards
- Check documentation completeness
- Verify test coverage (target: >80%)
- Review code complexity
- Check for code duplication
- Validate naming conventions

**Standards**:
- Medical code requires extra documentation
- Critical paths require tests
- Error messages must be clear for medical staff
- No magic numbers in medical calculations

**Output**: Code review with pass/fail checklist

---

## 🔄 Agent Workflows

### Workflow 1: **Feature Addition**
```
User: "Add SMS notifications for incoming ambulances"
    ↓
Primary Agent:
    └─ Analyze request
    └─ Spawn agents in parallel:
       ├─ Code-Reviewer: Find similar notification patterns
       ├─ Security-Auditor: Check SMS API security requirements
       ├─ Medical-Safety-Validator: Verify notification timing safety
       └─ Data-Scientist: Check notification trigger logic
    ↓
Primary Agent:
    └─ Synthesize findings
    └─ Create implementation plan
    └─ Ask user for approval
    ↓
User: "Approved"
    ↓
Primary Agent:
    └─ Implement feature
    └─ Spawn agents for validation:
       ├─ Code-Reviewer: Review implementation
       ├─ Debugger: Find potential bugs
       ├─ Performance-Optimizer: Check SMS send latency
       └─ Security-Auditor: Validate API key storage
    ↓
Primary Agent:
    └─ Apply fixes from agent feedback
    └─ Run tests
    └─ Deploy
    ↓
User: "Feature complete + validation report"
```

---

### Workflow 2: **Pre-Release Quality Gate**
```
User: "Prepare for v2.1 release"
    ↓
Primary Agent:
    └─ Spawn ALL agents in parallel:
       ├─ Medical-Safety-Validator: Full safety audit
       ├─ Performance-Optimizer: Full performance profile
       ├─ Security-Auditor: HIPAA compliance check
       ├─ Data-Scientist: Model validation
       ├─ Debugger: Bug hunt (very thorough)
       └─ Code-Reviewer: Code quality review
    ↓
Primary Agent:
    └─ Collect all reports
    └─ Identify blocking issues
    └─ Create fix priority list
    └─ Present to user
    ↓
User: Reviews issues
    ↓
Primary Agent:
    └─ Fix critical issues
    └─ Re-run affected validators
    └─ Generate release notes
    └─ Deploy
```

---

### Workflow 3: **Bug Investigation**
```
User: "Kiosk showing wrong patient data sometimes"
    ↓
Primary Agent:
    └─ Spawn investigation team:
       ├─ Debugger: Find data flow bugs
       ├─ Medical-Safety-Validator: Check data integrity
       ├─ Code-Reviewer: Review data handling code
       └─ Data-Scientist: Analyze when corruption occurs
    ↓
Primary Agent:
    └─ Synthesize findings
    └─ Identify root cause
    └─ Propose fix
    ↓
User: Approves fix
    ↓
Primary Agent:
    └─ Implement fix
    └─ Run validators again
    └─ Add regression tests
    └─ Deploy
```

---

### Workflow 4: **Performance Emergency**
```
User: "Kiosk is freezing during high load"
    ↓
Primary Agent:
    └─ Spawn performance team:
       ├─ Performance-Optimizer: Profile rendering
       ├─ Debugger: Find infinite loops/memory leaks
       ├─ Data-Scientist: Analyze polling patterns
       └─ Code-Reviewer: Check for anti-patterns
    ↓
Primary Agent:
    └─ Identify bottlenecks
    └─ Create optimization plan
    ↓
User: "Fix critical path first"
    ↓
Primary Agent:
    └─ Implement optimizations
    └─ Benchmark improvements
    └─ Deploy hotfix
```

---

## 🎨 Custom Agent Definitions

Create specialized agents in `.claude/agents/`:

### `/agents/medical-safety.md`
```markdown
---
name: Medical-Safety-Validator
specialty: Patient safety and medical accuracy
color: green
---

You are a medical software safety validator specializing in stroke triage systems.

CRITICAL CHECKS:
1. Medical value ranges (GFAP, BP, GCS)
2. Data integrity (no patient mixing)
3. Calculation accuracy (ICH/LVO probabilities)
4. Timestamp precision (critical for triage)
5. Error handling (medical-grade reliability)

ALWAYS verify:
- No data corruption paths
- Proper validation on all inputs
- Clear error messages for clinicians
- No silent failures in critical paths

Output format:
- 🔴 CRITICAL: Issues that could harm patients
- 🟡 HIGH: Issues that could cause misdiagnosis
- 🟢 MEDIUM: Issues that could confuse users
- ⚪ LOW: Nice-to-have improvements
```

### `/agents/performance.md`
```markdown
---
name: Performance-Optimizer
specialty: Real-time performance for emergency use
color: purple
---

You optimize performance for emergency medical software.

TARGETS:
- API Response: <500ms (p95)
- Animation: 60fps (all devices)
- Kiosk Polling: <100ms overhead
- PWA Load: <2s on 3G
- Memory: No leaks over 24h

FOCUS AREAS:
1. Blood animation canvas rendering
2. SVG ring performance
3. API call patterns
4. Kiosk polling efficiency
5. Bundle size optimization

Output: Ranked bottlenecks with fix estimates
```

---

## 💻 Implementation Examples

### Example 1: Parallel Safety + Performance Check
```bash
"Primary agent: Review the results page.

Spawn in parallel:
1. Medical-Safety-Validator: Check ICH calculation accuracy
2. Performance-Optimizer: Profile rendering performance
3. Security-Auditor: Review data handling security

Synthesize findings and create action plan."
```

### Example 2: Pre-Deployment Gate
```bash
"Primary agent: Prepare for production deployment.

Run complete quality gate:
1. Medical-Safety-Validator (very thorough)
2. Security-Auditor (HIPAA compliance)
3. Performance-Optimizer (benchmark all critical paths)
4. Data-Scientist (validate all models)
5. Debugger (bug hunt)
6. Code-Reviewer (quality check)

Block deployment if any critical issues found."
```

### Example 3: Smart Feature Development
```bash
"Primary agent: Add real-time GPS tracking map.

Phase 1 - Research (parallel):
- Code-Reviewer: Find existing map/GPS code
- Security-Auditor: GPS data privacy requirements
- Performance-Optimizer: Map rendering performance targets

Phase 2 - Design:
- Synthesize findings
- Create implementation plan
- Get user approval

Phase 3 - Implementation:
- Code the feature
- Run validators in parallel
- Fix issues
- Deploy"
```

---

## 🚀 Advanced Patterns

### Pattern A: **Continuous Quality Monitoring**
Run agents on git hooks:

**Pre-commit**:
```bash
Primary Agent:
├─ Code-Reviewer: Check changed files
├─ Debugger: Quick bug scan
└─ Medical-Safety-Validator: If medical code changed
```

**Pre-push**:
```bash
Primary Agent:
├─ ALL agents (quick mode)
└─ Block push if critical issues
```

---

### Pattern B: **Agent Specialization Evolution**

Start with 2 agents:
```
Medical-Safety + Code-Reviewer
```

Add complexity as needed:
```
Medical-Safety + Security + Code-Reviewer
```

Scale to full suite:
```
All 6 specialized agents
```

---

### Pattern C: **Context-Aware Agent Selection**

Primary agent automatically selects agents based on changes:

```javascript
if (changedFiles.includes('prediction-models')) {
  spawn([DataScientist, MedicalSafety, CodeReviewer]);
} else if (changedFiles.includes('cloud-functions')) {
  spawn([SecurityAuditor, PerformanceOptimizer, CodeReviewer]);
} else if (changedFiles.includes('animations')) {
  spawn([PerformanceOptimizer, Debugger]);
}
```

---

## 📊 Success Metrics

Track agent effectiveness:

```markdown
## Weekly Agent Report

Medical-Safety-Validator:
- Critical issues caught: 2 (100% before production)
- False positives: 0
- Average review time: 45s

Performance-Optimizer:
- Optimizations suggested: 8
- Performance improvements: 32% average
- Issues caught: 3 memory leaks

Security-Auditor:
- Vulnerabilities found: 1 (before release)
- HIPAA compliance: 100%
- False positives: 1

Code-Reviewer:
- Issues found: 23
- Code quality score: 8.7/10
- Test coverage: 84% → 89%
```

---

## 🎯 Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Create Medical-Safety-Validator agent
- [ ] Create Code-Reviewer agent
- [ ] Test with small changes

### Phase 2: Expansion (Week 2)
- [ ] Add Security-Auditor
- [ ] Add Performance-Optimizer
- [ ] Create workflows for common tasks

### Phase 3: Intelligence (Week 3)
- [ ] Add Data-Scientist
- [ ] Add Debugger
- [ ] Implement context-aware selection

### Phase 4: Automation (Week 4)
- [ ] Git hooks integration
- [ ] Continuous monitoring
- [ ] Metrics dashboard

---

## 🏆 Benefits

**For Medical Safety**:
- ✅ No patient data mixing (caught by Medical-Safety-Validator)
- ✅ Accurate calculations (validated by Data-Scientist)
- ✅ Reliable error handling (checked by Debugger)

**For Development Speed**:
- ✅ Parallel agent execution (6x faster than sequential)
- ✅ Automated quality gates (no manual checklists)
- ✅ Proactive bug detection (catch before users report)

**For Code Quality**:
- ✅ Consistent standards (Code-Reviewer enforcement)
- ✅ Optimized performance (Performance-Optimizer)
- ✅ Secure by default (Security-Auditor)

---

## 🎓 Best Practices

1. **Always use Medical-Safety-Validator** for medical code changes
2. **Run all agents before releases** (quality gate)
3. **Let Primary Agent orchestrate** (don't micromanage sub-agents)
4. **Trust agent expertise** (they're specialized for a reason)
5. **Review agent reports** (they surface issues you'd miss)
6. **Iterate on agents** (improve prompts based on results)

---

## 💡 Pro Tips

**Tip 1**: Start conversations with agent objectives:
```
"Primary agent: Add SMS feature.
Agents: Medical-Safety, Security, Code-Reviewer"
```

**Tip 2**: Use agent consensus for critical decisions:
```
"All agents: Should we use WebSockets or polling for real-time updates?"
```

**Tip 3**: Agent voting for architecture decisions:
```
"Performance-Optimizer and Security-Auditor: Debate the best approach"
```

---

## 🚀 Next Steps

1. **Try the simple workflow**:
   ```
   "Primary agent: Review my last commit.
   Spawn: Medical-Safety-Validator, Code-Reviewer"
   ```

2. **Implement first custom agent**:
   - Create `.claude/agents/medical-safety.md`
   - Test with medical code changes

3. **Scale to full suite**:
   - Add all 6 specialized agents
   - Create workflows for common tasks

4. **Automate**:
   - Git hooks integration
   - Continuous quality monitoring

---

**Remember**: The Primary Agent is your coding partner, and the specialized agents are your expert team. Let them work together to build phenomenally awesome medical software! 🏥✨
