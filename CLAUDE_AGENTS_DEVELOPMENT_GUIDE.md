# Claude Sub-Agents Development Guide
**How to Make Development Phenomenally Awesome**

---

## 🚀 Available Sub-Agents

### 1. **Explore Agent** (Fastest - Use Often!)
**Specialty:** Quick codebase exploration and pattern matching

**When to use:**
- "Where are errors handled?"
- "Find all API endpoints"
- "How does authentication work?"
- "Show me all the stroke prediction models"
- "What files handle GPS tracking?"

**Why it's awesome:**
- Searches multiple locations simultaneously
- Understands context and relationships
- Fast keyword and pattern matching
- Great for understanding unfamiliar code

**Example commands:**
```
"Use Explore agent to find all places where ICH risk is calculated"
"Explore agent: find all CORS configurations in the project"
"Use Explore to map out the kiosk-to-PWA data flow"
```

---

### 2. **General-Purpose Agent**
**Specialty:** Complex multi-step tasks, research, and implementation

**When to use:**
- Multi-file refactoring
- Research + implementation tasks
- Bug hunting across multiple files
- Performance optimization analysis
- Security audits

**Why it's awesome:**
- Can make decisions autonomously
- Handles complex workflows
- Searches, reads, analyzes, and implements
- Great for tasks that need investigation

**Example commands:**
```
"General agent: Optimize the blood animation performance across all browsers"
"Use general agent to implement offline mode for the PWA"
"General agent: Find and fix all memory leaks in the kiosk"
```

---

## 💡 Phenomenal Development Patterns

### Pattern 1: **Parallel Investigation**
Run multiple agents at once to explore different aspects:

```
"Launch 3 agents in parallel:
1. Explore agent: Find all authentication flows
2. Explore agent: Find all API error handling
3. Explore agent: Map out all data sanitization points"
```

**Result:** Get comprehensive codebase understanding in seconds instead of minutes

---

### Pattern 2: **Research Before Implementing**
Always explore first, then implement:

```
Step 1: "Explore agent: How is form data currently validated?"
Step 2: "Based on that, implement server-side validation for all inputs"
```

**Why:** Ensures consistency with existing patterns

---

### Pattern 3: **Security Audit Workflow**

```
"Launch 2 agents in parallel:
1. Explore agent (very thorough): Find all places passwords are used
2. Explore agent (very thorough): Find all user input that isn't sanitized"
```

**Result:** Comprehensive security review of entire codebase

---

### Pattern 4: **Performance Optimization**

```
"General agent: Profile the results page rendering and identify bottlenecks"
```

Then:

```
"Explore agent: Find all places where we render SVG circles"
```

**Result:** Targeted optimization based on actual performance data

---

## 🎯 Specific Use Cases for Your Project

### Use Case 1: **Adding a New Feature**
Example: Add SMS notifications for incoming ambulances

```bash
# Step 1: Research (Explore)
"Explore agent (medium): Find all notification/alert mechanisms in the kiosk"

# Step 2: Research (Explore)
"Explore agent: Find how we currently send data to the kiosk"

# Step 3: Implementation (General)
"General agent: Implement SMS notification system that:
- Integrates with Twilio API
- Follows existing notification patterns
- Adds config to environment.js
- Updates kiosk to display SMS status"
```

---

### Use Case 2: **Debugging Complex Issues**
Example: Cases showing wrong data

```bash
# Launch parallel investigation
"Launch 3 agents in parallel:
1. Explore agent: Find all places where formData is passed between components
2. Explore agent: Find all deep clone operations
3. General agent: Trace the data flow from PWA → Cloud Storage → Kiosk"
```

**Result:** Find root cause faster by investigating all angles simultaneously

---

### Use Case 3: **Code Quality Improvement**

```bash
"General agent: Review all error handling in cloud functions and:
- Identify missing try-catch blocks
- Find places where errors aren't logged
- Suggest improvements following best practices"
```

---

### Use Case 4: **Migration Tasks**
Example: Migrate from one library to another

```bash
# Step 1: Explore
"Explore agent (very thorough): Find all uses of moment.js"

# Step 2: Plan
"Based on those findings, create a migration plan to date-fns"

# Step 3: Execute in parallel
"Launch 3 general agents to migrate files in parallel:
1. Migrate src/ui/** files
2. Migrate src/logic/** files
3. Migrate cloud-functions/** files"
```

---

### Use Case 5: **Documentation Generation**

```bash
"General agent: Generate API documentation by:
- Reading all cloud function endpoints
- Extracting request/response formats
- Creating markdown with examples
- Including error codes and rate limits"
```

---

## 🔥 Pro Tips for Phenomenal Development

### Tip 1: **Use Thoroughness Levels**
```
"quick" - Basic search (seconds)
"medium" - Moderate exploration (good default)
"very thorough" - Deep analysis (when you need everything)
```

Example:
```
"Explore agent (very thorough): Find EVERY place where patient data is stored"
```

---

### Tip 2: **Parallel Agents for Independent Tasks**
```
"Launch 4 agents in parallel:
1. Explore: Find all TODO comments
2. Explore: Find all console.log statements
3. Explore: Find all hardcoded URLs
4. Explore: Find all magic numbers"
```

**Time saved:** 4x faster than sequential

---

### Tip 3: **Agent Chaining for Complex Workflows**

```bash
# Agent 1: Research
"Explore agent: Find all CSS files with animations"

# Agent 2: Analyze (based on results)
"General agent: Analyze those animations for:
- Performance issues
- Browser compatibility
- Accessibility concerns"

# Agent 3: Implement (based on analysis)
"Implement fixes for the issues found"
```

---

### Tip 4: **Pre-Implementation Research**

Before adding ANY feature:
```
"Explore agent: Show me how similar features are implemented in the codebase"
```

**Result:** Consistent code that follows existing patterns

---

## 🎨 Real Examples from Your Project

### Example 1: **Improve Blood Animation Performance**

```bash
# Parallel research
"Launch 2 agents in parallel:
1. Explore agent: Find all requestAnimationFrame usage
2. Explore agent: Find all canvas performance optimizations"

# Implementation
"General agent: Optimize blood animation to:
- Run at 60fps on all devices
- Use offscreen canvas where supported
- Implement frame throttling for low-end devices"
```

---

### Example 2: **Comprehensive Security Audit**

```bash
"Launch 4 agents in parallel:
1. Explore (very thorough): Find all password/credential handling
2. Explore (very thorough): Find all database queries
3. Explore (very thorough): Find all API endpoints without authentication
4. Explore (very thorough): Find all XSS vulnerabilities in user inputs"
```

---

### Example 3: **Add Multi-Language Support**

```bash
# Step 1: Research
"Explore agent: Find all user-facing text strings in the kiosk"

# Step 2: Implementation
"General agent: Implement i18n for the kiosk:
- Extract all strings to translation files
- Support German and English
- Add language selector to UI
- Follow the PWA's existing i18n pattern"
```

---

### Example 4: **Performance Profiling**

```bash
"General agent: Profile the entire results page and create a report showing:
- Render time for each component
- Memory usage
- Network requests
- Recommendations for optimization"
```

---

### Example 5: **iOS App Integration**

```bash
# Parallel exploration
"Launch 3 agents in parallel:
1. Explore agent: Find all WebView bridges in iOS app
2. Explore agent: Find all data storage in iOS app
3. General agent: Document the iOS app architecture"

# Implementation
"General agent: Add offline data sync between iOS app and PWA"
```

---

## 🚀 Advanced Patterns

### Pattern A: **Incremental Feature Development**

```bash
# Day 1: Research
"Explore agent: Research how other medical apps handle patient privacy"

# Day 2: Design
"General agent: Design HIPAA-compliant data encryption for our app"

# Day 3: Implement Core
"General agent: Implement core encryption module"

# Day 4: Integrate
"Launch 3 agents in parallel to integrate encryption:
1. PWA data storage
2. Kiosk data display
3. Cloud Functions API"

# Day 5: Test
"General agent: Create comprehensive test suite for encryption"
```

---

### Pattern B: **Rapid Prototyping**

```bash
"General agent: Create a working prototype of real-time GPS tracking on a map:
- Use OpenStreetMap
- Show ambulance position
- Update every 10 seconds
- Estimate time to hospital
Don't worry about perfect code, just make it work"
```

Then refine:
```
"Now refactor that prototype to production quality"
```

---

### Pattern C: **Code Migration**

```bash
# Step 1: Inventory
"Explore (very thorough): Find every single API call in the PWA"

# Step 2: Plan
"Create migration plan from Cloud Functions to Cloud Run"

# Step 3: Execute in parallel
"Launch 5 general agents to migrate:
1. Authentication endpoints
2. Prediction models
3. Case sharing
4. GPS tracking
5. Analytics"
```

---

## 📊 When to Use Which Agent

| Task | Agent Type | Thoroughness | Why |
|------|------------|--------------|-----|
| Find files by pattern | Explore | quick | Fast glob matching |
| Understand auth flow | Explore | medium | Need to see relationships |
| Security audit | Explore | very thorough | Can't miss anything |
| Add new feature | General | n/a | Needs implementation |
| Debug complex bug | General | n/a | Needs analysis + fixes |
| Refactor code | General | n/a | Multi-file changes |
| Performance tuning | General | n/a | Needs profiling + fixes |

---

## 🎯 Project-Specific Agent Commands

### For PWA Development:
```bash
"Explore agent: Find all service worker cache strategies"
"General agent: Implement offline-first data sync"
"Explore: Find all localStorage usage for migration to IndexedDB"
```

### For Kiosk Development:
```bash
"Explore: Map out all real-time data update mechanisms"
"General agent: Optimize kiosk polling to reduce server load"
"Explore: Find all CSS animations for performance review"
```

### For Cloud Functions:
```bash
"Explore: Find all error handling patterns in cloud functions"
"General agent: Add structured logging to all endpoints"
"Explore (very thorough): Find all CORS configurations"
```

### For iOS App:
```bash
"Explore: Map out the entire SwiftUI navigation structure"
"General agent: Implement biometric authentication"
"Explore: Find all hardcoded strings for localization"
```

---

## 🏆 Best Practices

### ✅ DO:

1. **Always use Explore before implementing**
   ```
   "Explore: How do we currently handle X?"
   "Based on that, implement Y"
   ```

2. **Run agents in parallel for independent tasks**
   ```
   "Launch 3 agents in parallel: [task1], [task2], [task3]"
   ```

3. **Be specific about thoroughness**
   ```
   "Explore (very thorough): Find ALL password references"
   ```

4. **Let agents make decisions**
   ```
   "General agent: Research best approach and implement the optimal solution"
   ```

### ❌ DON'T:

1. **Don't use agents for simple file reads**
   ```
   ❌ "Agent: Read config.js"
   ✅ "Read config.js"
   ```

2. **Don't use Explore for implementation**
   ```
   ❌ "Explore agent: Add new feature"
   ✅ "General agent: Add new feature"
   ```

3. **Don't forget to specify parallel when needed**
   ```
   ❌ "Agent A do task1, Agent B do task2" (sequential)
   ✅ "Launch 2 agents in parallel: [task1], [task2]"
   ```

---

## 🎓 Learning Exercise

Try this workflow for your next feature:

```bash
# 1. Understand current state (2 agents in parallel)
"Launch 2 Explore agents in parallel:
1. Find all similar features
2. Find all relevant config/constants"

# 2. Research best practices (1 agent)
"General agent: Research industry best practices for [feature]"

# 3. Implement (1 agent)
"General agent: Implement [feature] following the patterns found"

# 4. Test (1 agent)
"General agent: Create comprehensive tests"

# 5. Document (1 agent)
"General agent: Update documentation"
```

---

## 🚀 Next-Level Development

### Continuous Quality Improvement:
Schedule weekly:
```bash
"Launch 5 agents in parallel:
1. Explore (very thorough): Find code smells
2. Explore (very thorough): Find security issues
3. Explore (very thorough): Find performance bottlenecks
4. General: Suggest architecture improvements
5. General: Review test coverage"
```

### Automated Code Reviews:
Before each PR:
```bash
"General agent: Review this pull request for:
- Security issues
- Performance problems
- Missing tests
- Documentation gaps
- Accessibility concerns"
```

---

## 💎 Golden Rules

1. **Explore First, Implement Second** - Always understand before changing
2. **Parallel Everything** - Run independent tasks simultaneously
3. **Be Specific** - Tell agents exactly what thoroughness you need
4. **Chain Agents** - Research → Plan → Implement → Test
5. **Trust Autonomy** - Let agents make decisions within their scope

---

## 🎉 The Result

Following these patterns, you can:
- ✅ Understand complex codebases 10x faster
- ✅ Implement features with consistent quality
- ✅ Catch bugs before they reach production
- ✅ Maintain security and performance standards
- ✅ Ship phenomenally awesome software

**The secret:** Let Claude's agents do what they're best at - exploring, analyzing, and implementing - while you focus on strategy and product decisions.

---

**Remember:** The more specific you are about what you want agents to do, the better results you'll get. Don't be afraid to run multiple agents in parallel - they're designed for it!
