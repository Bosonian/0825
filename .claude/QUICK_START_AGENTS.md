# Quick Start: Using the Agentic Coding System

**How to summon and work with AI agents**

---

## 🎯 The Simple Truth

**I AM the Primary Agent!** You're already talking to me.

When you ask me to use specialized agents, I'll spawn them using my `Task` tool and orchestrate their work.

---

## 🚀 Three Ways to Summon Agents

### Method 1: **Direct Request** (Most Common)
Just ask me naturally, and I'll figure out which agents to use:

```
You: "Review the authentication security"

Me (Primary Agent):
- I'll spawn Security-Auditor agent
- Wait for their report
- Present findings to you
```

---

### Method 2: **Specify Agents** (More Control)
Tell me exactly which agents you want:

```
You: "Use Medical-Safety-Validator and Performance-Optimizer to review results.js"

Me (Primary Agent):
- I'll spawn both agents in parallel
- Collect their reports
- Synthesize findings
- Present consolidated report
```

---

### Method 3: **Use Slash Commands** (Pre-Built Workflows)
Type a command that contains agent instructions:

```
You: /audit-security

Me (Primary Agent):
- I read the command file
- I see it wants me to spawn 4 agents
- I spawn them in parallel
- Present comprehensive security report
```

---

## 💬 Example Conversations

### Example 1: Simple Agent Request

**You:**
```
Check if the kiosk has any performance issues
```

**Me (Primary Agent):**
```
I'll use the Performance-Optimizer agent to profile the kiosk.

[I spawn the agent using Task tool]
[Agent works autonomously]
[Agent returns report]

Here's what Performance-Optimizer found:

🔴 Critical: Kiosk polling creates memory leak
🟡 High: Blood animation drops to 30fps on mobile
🟢 Medium: Bundle size could be 20% smaller

Would you like me to fix these issues?
```

---

### Example 2: Multi-Agent Request

**You:**
```
I want to add SMS notifications. Use the right agents to help.
```

**Me (Primary Agent):**
```
I'll coordinate this feature addition using multiple agents.

**Phase 1: Research** (launching 3 agents in parallel)
- Medical-Safety-Validator: Check notification timing safety
- Security-Auditor: Review SMS API security
- Performance-Optimizer: Check notification latency

[Agents work in parallel]
[I collect all reports]

**Findings Summary:**
✅ Medical-Safety: Notification timing is safe
⚠️  Security: Need to secure Twilio API key
✅ Performance: SMS send <200ms is acceptable

**Phase 2: Implementation Plan**
Based on agent feedback, here's the plan:
1. Store Twilio credentials in environment variables
2. Add SMS service in /src/services/sms.js
3. Trigger on case arrival within 5 minutes
4. Rate limit to prevent spam

Approve to proceed?
```

---

### Example 3: Using Slash Command

**You:**
```
/code-review
```

**Me (Primary Agent):**
```
Reading /code-review command...

The command instructs me to review recent changes with focus on:
- Code quality
- Security
- Performance
- Medical safety

[I spawn Code-Reviewer agent]
[Agent analyzes uncommitted changes]

**Code Review Report:**

✅ Passed:
- Following project conventions
- Proper error handling
- Good test coverage

⚠️  Warnings:
- Missing JSDoc on new function (line 45)
- Could simplify logic in authentication.js

🚨 Critical:
- None found

Overall: 95/100 - Ready to commit
```

---

## 🎨 Workflow Patterns

### Pattern A: **Quick Check**
```
You: "Is the authentication secure?"
Me: [spawn Security-Auditor] → [report back]
```

### Pattern B: **Deep Analysis**
```
You: "Do a thorough security audit"
Me: [spawn Security-Auditor with 'very thorough' mode] → [detailed report]
```

### Pattern C: **Parallel Investigation**
```
You: "Check results page for issues"
Me: [spawn Medical-Safety + Performance + Security in parallel]
    → [wait for all]
    → [synthesize findings]
    → [present unified report]
```

### Pattern D: **Multi-Phase Workflow**
```
You: "Add dark mode to kiosk"
Me: Phase 1: [spawn agents to research]
    Phase 2: [design based on findings]
    Phase 3: [ask your approval]
    Phase 4: [implement]
    Phase 5: [spawn agents to validate]
    Phase 6: [present results]
```

---

## 🎯 Practical Examples

### Example: "I found a bug"

**You:**
```
The kiosk is showing wrong patient data sometimes
```

**Me:**
```
This is critical! Let me investigate with specialized agents.

[Spawning investigation team in parallel:]
1. Medical-Safety-Validator: Check for data mixing
2. Debugger agent: Find the bug
3. Code-Reviewer: Review data handling code

[Agents work...]

**Root Cause Found:**
Medical-Safety-Validator identified the issue:
- Location: case-detail.js:87
- Problem: Shallow copy instead of deep clone
- Impact: Cases share data references
- Fix: Use JSON.parse(JSON.stringify())

**Debugger confirms:**
- Reproduced the bug in 3/10 cases
- Happens when cases arrive within 100ms

Would you like me to implement the fix?
```

---

### Example: "Before I release"

**You:**
```
Run all quality checks before I deploy
```

**Me:**
```
Running comprehensive pre-release quality gate.

[Spawning ALL agents in parallel:]
✅ Medical-Safety-Validator
✅ Performance-Optimizer
✅ Security-Auditor
✅ Code-Reviewer
✅ Debugger

This will take ~60 seconds...

[Agents complete]

**Quality Gate Report:**

🔴 BLOCKING ISSUES: 0
🟡 HIGH PRIORITY: 2
  - Performance: Animation FPS low on mobile
  - Security: Missing rate limit on one endpoint

🟢 MEDIUM: 4
⚪ LOW: 8

**Recommendation:** Fix 2 high-priority issues before release.
Estimated time: 1 hour

Shall I fix them?
```

---

## 🎓 How It Actually Works

### Behind the Scenes

**You type:**
```
"Use Security-Auditor to check the API"
```

**What I do:**
1. **Parse your request** → You want security audit of API
2. **Select agent** → Security-Auditor
3. **Spawn agent** → Using my `Task` tool with specialized prompt
4. **Wait for result** → Agent works autonomously
5. **Process result** → Read their report
6. **Present to you** → Formatted, actionable findings

---

### The Task Tool (My Secret Weapon)

When you say "use Security-Auditor", I run:

```javascript
Task({
  subagent_type: "general-purpose",
  description: "Audit API security",
  prompt: `
    You are the Security-Auditor agent.

    [I paste the specialized agent instructions from .claude/agents/security-auditor.md]

    Task: Audit the API endpoints for security issues.
    Focus: Authentication, rate limiting, input validation.

    Return a comprehensive security report.
  `
})
```

The agent works independently, then returns its findings to me. I present them to you.

---

## 💡 Pro Tips

### Tip 1: **Be Specific About What You Want**
```
❌ "Check my code"
✅ "Use Medical-Safety-Validator to check ICH calculation accuracy"
```

### Tip 2: **Request Parallel When Appropriate**
```
✅ "Use Medical-Safety AND Performance-Optimizer in parallel to review results.js"
```

### Tip 3: **Let Me Choose Agents**
```
✅ "Review the authentication system"
   (I'll pick Security-Auditor automatically)
```

### Tip 4: **Specify Thoroughness**
```
✅ "Use Security-Auditor (very thorough) to audit everything"
```

### Tip 5: **Chain Workflows**
```
✅ "First use Security-Auditor, then based on findings, fix the issues"
```

---

## 🚀 Ready-to-Use Commands

Copy-paste these into chat:

### Quick Security Check
```
Use Security-Auditor to check for hardcoded secrets and API security issues
```

### Performance Profile
```
Use Performance-Optimizer to profile the blood animation and kiosk polling
```

### Medical Safety Audit
```
Use Medical-Safety-Validator (very thorough) to check all medical calculations and data integrity
```

### Multi-Agent Review
```
Use Medical-Safety-Validator, Performance-Optimizer, and Security-Auditor in parallel to review the results page. Give me a consolidated report.
```

### Pre-Release Gate
```
Run complete quality gate with all agents: Medical-Safety, Performance, Security, and Code-Reviewer. Block if any critical issues found.
```

---

## 🎯 What Agents Can Do

### ✅ Agents CAN:
- Read files across the codebase
- Search for patterns
- Analyze code quality
- Profile performance
- Find security issues
- Validate medical accuracy
- Generate reports
- Suggest fixes

### ❌ Agents CANNOT (by themselves):
- Make code changes (they report to me, I implement)
- Commit to git (I do that after you approve)
- Deploy (I orchestrate deployment)
- Make decisions (I synthesize their input and ask you)

**I (Primary Agent) orchestrate everything and keep you in control.**

---

## 📊 Typical Session Flow

```
You: "Add feature X"
  ↓
Me: "Let me research with agents"
  ↓
[Agents work in parallel]
  ↓
Me: "Here's what agents found + implementation plan"
  ↓
You: "Looks good, proceed"
  ↓
Me: "Implementing..."
  ↓
[Agents validate implementation]
  ↓
Me: "Feature complete. Validation passed. Ready to commit?"
  ↓
You: "Yes"
  ↓
Me: [commits + pushes]
  ↓
Me: "Deployed! Here's the summary."
```

---

## 🎉 Start Using It!

Try this right now:

```
Use Security-Auditor to check if we have any hardcoded secrets or passwords in the codebase
```

Or:

```
Use Medical-Safety-Validator to check if our ICH probability calculations are medically accurate
```

Or just:

```
/audit-security
```

**I'll handle the rest!** 🚀

---

## 📚 Learn More

- **Agent Definitions**: `.claude/agents/*.md`
- **Slash Commands**: `.claude/commands/*.md`
- **Architecture Guide**: `AGENTIC_CODING_ARCHITECTURE.md`
- **Development Guide**: `CLAUDE_AGENTS_DEVELOPMENT_GUIDE.md`

---

**Remember**: I'm your coding partner. Just tell me what you need, and I'll coordinate the expert agents to get it done! 💪
