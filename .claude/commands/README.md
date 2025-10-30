# Custom Claude Commands

These slash commands are designed for rapid development of the iGFAP Stroke Triage Assistant.

## 🚀 Available Commands

### `/audit-security`
**Run comprehensive security audit**
- Checks passwords, credentials, API keys
- Validates all user inputs
- Reviews API security and CORS
- Audits data storage and encryption
- **Output**: Security report with critical/medium/low issues

**When to use**: Before releases, after major changes, or weekly reviews

---

### `/deploy-all`
**Build and deploy PWA + Kiosk + Cloud Functions**
- Builds PWA and commits dist files
- Deploys changed Cloud Functions
- Verifies deployment success
- **Output**: Deployment summary with URLs and test results

**When to use**: When ready to push changes to production

---

### `/optimize-performance`
**Profile and optimize application**
- Profiles rendering performance
- Identifies memory leaks
- Analyzes bundle size
- Reviews API patterns
- **Output**: Optimization plan with priorities and time estimates

**When to use**: When app feels slow, before releases, or quarterly reviews

---

### `/understand-flow`
**Map complete data flow from PWA to Kiosk**
- Traces PWA data collection
- Documents Cloud Function processing
- Maps Kiosk display flow
- **Output**: Comprehensive flow diagram with all transformations

**When to use**: Onboarding new developers, debugging complex issues

---

### `/add-feature "description"`
**Smart feature development workflow**
- Researches similar existing features
- Designs following existing patterns
- Asks for approval before implementing
- Implements, tests, and documents
- **Output**: Complete feature with tests and docs

**Usage**: `/add-feature "Add SMS notifications for ambulances"`

**When to use**: Adding any new feature to the application

---

### `/code-review`
**Comprehensive code review**
- Reviews code quality and conventions
- Checks security (secrets, validation, XSS)
- Analyzes performance
- Verifies testing coverage
- Validates medical safety (critical!)
- **Output**: ✅/⚠️/🚨 categorized feedback

**When to use**: Before committing major changes, before PRs

---

### `/find-bugs`
**Hunt for bugs and issues**
- Finds logic bugs (null checks, race conditions)
- Detects data bugs (type mismatches, validation gaps)
- Identifies integration bugs (CORS, API mismatches)
- **Output**: Prioritized bug list with fixes

**When to use**: After refactoring, before releases, when tracking down issues

---

### `/clean-code`
**Clean up code quality**
- Finds dead code and unused imports
- Locates debug code (console.log, debugger)
- Identifies code smells and duplicates
- Checks documentation gaps
- **Output**: Cleanup plan with time estimates

**When to use**: Monthly cleanup, before releases, after major features

---

## 💡 How to Use

1. **Type the command** in Claude Code chat:
   ```
   /audit-security
   ```

2. **Wait for agents** to complete their work

3. **Review the output** and decide on actions

4. **Execute fixes** or ask Claude to implement them

---

## 🎯 Example Workflows

### Weekly Development Routine
```bash
Monday: /understand-flow  # Get oriented
Daily:  /code-review      # Before committing
Friday: /clean-code       # Weekend cleanup
```

### Before Release
```bash
1. /find-bugs
2. /audit-security
3. /optimize-performance
4. /code-review
5. /deploy-all
```

### Adding New Feature
```bash
1. /add-feature "description"
2. Follow the guided workflow
3. /code-review
4. /deploy-all
```

---

## 🔧 Customization

To add your own commands, create a new `.md` file in this directory:

```markdown
---
description: Short description for /help command
---

Your command instructions here.
Use markdown for formatting.
Can include code blocks, lists, etc.
```

File name becomes the command (e.g., `my-command.md` → `/my-command`)

---

## 📚 Learn More

See `CLAUDE_AGENTS_DEVELOPMENT_GUIDE.md` for in-depth guide on using agents effectively.

---

**Pro Tip**: Commands can be combined! Run `/audit-security`, then immediately `/find-bugs` to get comprehensive quality review.
