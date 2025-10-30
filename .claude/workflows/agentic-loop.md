# Agentic Development Loop Workflow

This workflow implements an iterative development loop with visual verification.

## Workflow Steps

### Phase 1: Specification (Spec Creator Agent)

```bash
/agent spec-creator

Task: Create detailed specification for [feature name]

Input: High-level requirement from user
Output: Detailed spec with visual mocks and acceptance criteria
```

### Phase 2: Implementation (UI Implementer Agent)

```bash
/agent ui-implementer

Task: Implement [feature name] according to spec

Input: Spec from Phase 1
Output: Working code + initial screenshots
```

### Phase 3: Visual Verification (UI Implementer continues)

The UI Implementer automatically:
1. Builds the project
2. Starts preview server
3. Uses Playwright MCP to capture screenshots
4. Compares against spec
5. Documents discrepancies

### Phase 4: Iteration Loop

If discrepancies found:
```
UI Implementer → Fixes issues → Rebuilds → Re-screenshots → Compares
```

Repeat until acceptance criteria met or max iterations (5) reached.

### Phase 5: Human Review

User reviews screenshots and provides feedback:
- ✅ Approved: Merge and deploy
- 🔄 Needs changes: New iteration with specific feedback
- ❌ Rejected: Re-spec and restart

## Example Usage

### User Request
```
I want to add a "Back to Top" button that appears when scrolling down.
It should:
- Float in bottom-right corner
- Circular, 50px diameter
- Blue background with white ↑ arrow
- Fade in/out smoothly
- Only show when scrolled > 200px
```

### Agent Execution

**1. Spec Creator Agent**
- Creates detailed spec with exact colors, animations, positioning
- Defines scroll trigger logic
- Creates ASCII mock
- Lists acceptance criteria

**2. UI Implementer Agent**
- Implements component
- Adds scroll listener
- Styles button
- Builds project
- Screenshots at scrolled/not-scrolled states
- Compares with spec

**3. Iteration (if needed)**
- Finds: Button too large (60px vs 50px spec)
- Fixes: Adjusts CSS
- Re-screenshots
- Confirms match

**4. Completion**
- All criteria met
- Screenshots provided to user
- Commits code with proper message

## Playwright MCP Integration

### Screenshot Commands

```javascript
// Capture current state
await playwright.screenshot({
  url: 'http://localhost:3020/0825/',
  path: 'verification/feature-desktop.png',
  viewport: { width: 1920, height: 1080 }
});

// Capture after interaction
await playwright.goto({ url: 'http://localhost:3020/0825/' });
await playwright.click({ selector: '#backToTop' });
await playwright.screenshot({
  path: 'verification/feature-clicked.png'
});

// Capture at different viewport
await playwright.screenshot({
  viewport: { width: 375, height: 667 },
  path: 'verification/feature-mobile.png'
});
```

### Comparison Process

1. **Baseline**: Spec creator defines expected visual
2. **Implementation**: UI implementer captures actual visual
3. **Compare**: Manual or automated comparison
4. **Document**: Note differences in iteration log
5. **Fix**: Adjust code to match spec
6. **Re-verify**: Repeat until match

## Directory Structure

```
.claude/
├── agents/
│   ├── spec-creator.md      # Creates specifications
│   └── ui-implementer.md    # Implements and verifies
├── workflows/
│   └── agentic-loop.md      # This file
└── iterations/              # Stores iteration history
    └── feature-name/
        ├── spec.md
        ├── iteration-1/
        │   ├── code-changes.md
        │   ├── screenshots/
        │   └── comparison.md
        ├── iteration-2/
        └── final/
```

## Best Practices

### For Spec Creator
- Be extremely specific (exact pixels, hex codes, timings)
- Include edge cases in acceptance criteria
- Provide visual mocks when possible
- Reference existing design system

### For UI Implementer
- Follow spec exactly, don't improvise
- Document every change made
- Capture screenshots at each iteration
- Communicate clearly what matched/didn't match
- Ask for clarification if spec is ambiguous

### For Human Reviewer
- Review screenshots carefully
- Provide specific feedback
- Approve when 95%+ match achieved
- Don't nitpick minor pixel differences

## Iteration Log Template

```markdown
# Iteration Log: [Feature Name]

## Iteration 1
- **Changes**: Initial implementation
- **Screenshots**: ✅ Desktop, ✅ Mobile
- **Issues Found**:
  - Button 10px too wide
  - Animation 100ms too slow
- **Status**: Needs fixes

## Iteration 2
- **Changes**:
  - Adjusted button width: 60px → 50px
  - Animation timing: 200ms → 300ms
- **Screenshots**: ✅ Desktop, ✅ Mobile
- **Issues Found**: None
- **Status**: ✅ Complete

## Final Result
- All acceptance criteria met
- Screenshots approved
- Code committed: abc123
```

## Automation Opportunities

Future enhancements:
- Automated visual regression testing
- AI-powered screenshot comparison
- Automatic iteration triggering
- Design token validation
- Performance metrics collection
