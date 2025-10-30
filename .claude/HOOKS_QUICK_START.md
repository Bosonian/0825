# Hooks Quick Start Guide
## Get Medical Safety Hooks Running in 5 Minutes

**Goal**: Enable deterministic safety controls for medical AI development

---

## Step 1: Test the Hooks (30 seconds)

```bash
cd /Users/deepak/iGFAPAUG/iGFAP08/stroke-triage/0825

# Test pre-tool-use hook (should block patient data logging)
echo '{"tool": "Bash", "command": "console.log(gfap)"}' | python3 .claude/hooks/pre_tool_use.py
# Expected: Exit code 2, error message about HIPAA

# Test session start hook
python3 .claude/hooks/session_start.py --load-context | head -20
# Expected: Medical context output

# Test post-tool-use hook
echo '{"tool": "Edit", "file": "test.js"}' | python3 .claude/hooks/post_tool_use.py
# Expected: Creates audit log
cat .claude/logs/audit_trail.json
```

**✅ If all tests pass, hooks are working!**

---

## Step 2: Enable in Claude Code (1 minute)

### Option A: Enable All Hooks (Recommended)

Hooks auto-run if executable (already done: `chmod +x`).

Just verify:
```bash
ls -l .claude/hooks/*.py
# Should show: -rwxr-xr-x (executable)
```

### Option B: Enable Session Context Loading

Create/edit `.claude/settings.local.json`:
```json
{
  "hooks": {
    "session_start": {
      "enabled": true,
      "args": ["--load-context"]
    }
  }
}
```

---

## Step 3: Test in Real Session (2 minutes)

### Test 1: Block Patient Data Logging

In Claude Code, try:
```
"Write code that logs GFAP values to console"
```

**Expected**: Hook should block this operation with HIPAA violation message.

### Test 2: View Context Auto-Loading

Start a new Claude Code session. You should see medical context automatically loaded (GFAP ranges, GCS ranges, etc.)

### Test 3: View Audit Trail

After any operation:
```bash
cat .claude/logs/audit_trail.json | jq '.[-5:]'
```

**Expected**: See last 5 tool uses logged.

---

## Step 4: Verify HIPAA Compliance (1 minute)

```bash
# Check audit trail exists
test -f .claude/logs/audit_trail.json && echo "✅ Audit trail active"

# Check pre-tool-use logs exist
test -f .claude/logs/pre_tool_use.json && echo "✅ Pre-tool-use logging active"

# Count operations logged today
cat .claude/logs/audit_trail.json | jq '[.[] | select(.timestamp | startswith("2025-10-30"))] | length'
```

**Expected**: All checks pass.

---

## What You Just Enabled

### 🛡️ Safety Controls

**Pre-Tool-Use Hook**:
- ❌ Blocks patient data console logging
- ❌ Blocks dangerous deletions
- ❌ Blocks .env file exposure
- ⚠️  Warns about medical calculations without validation

### 📊 HIPAA Compliance

**Post-Tool-Use Hook**:
- ✅ Logs all tool uses (who, what, when)
- ✅ Immutable audit trail
- ✅ Patient data exposure warnings

### 🚀 Productivity

**Session Start Hook**:
- ✅ Auto-loads medical context (GFAP ranges, GCS, etc.)
- ✅ Shows git status
- ✅ Loads project instructions
- ✅ Lists available agents

---

## Quick Reference

### View Blocked Operations
```bash
cat .claude/logs/pre_tool_use.json | jq '[.[] | select(.decision == "blocked")]'
```

### View All Tool Uses
```bash
cat .claude/logs/audit_trail.json | jq
```

### Count Operations Today
```bash
cat .claude/logs/audit_trail.json | jq '[.[] | select(.timestamp | startswith("2025-10-30"))] | length'
```

### Bypass Hook (Emergency Only)
```bash
export CLAUDE_CODE_DISABLE_HOOKS=true
```

---

## Troubleshooting

### Hooks not running?

1. **Check executable**:
   ```bash
   ls -l .claude/hooks/*.py
   ```
   Should show `-rwxr-xr-x`. If not:
   ```bash
   chmod +x .claude/hooks/*.py
   ```

2. **Check Python version**:
   ```bash
   python3 --version
   ```
   Needs Python 3.7+

3. **Test manually**:
   ```bash
   echo '{}' | python3 .claude/hooks/pre_tool_use.py
   echo $?  # Should be 0
   ```

### Hook blocking valid operations?

View the blocking reason:
```bash
cat .claude/logs/pre_tool_use.json | jq '.[-1]'
```

If it's a false positive:
- Update pattern in `.claude/hooks/pre_tool_use.py`
- Or temporarily bypass: `export CLAUDE_CODE_DISABLE_HOOKS=true`

### No logs appearing?

```bash
# Check if directory exists
ls -la .claude/logs/

# Create if missing
mkdir -p .claude/logs

# Run a test
echo '{"tool": "Test"}' | python3 .claude/hooks/post_tool_use.py

# Check again
cat .claude/logs/audit_trail.json
```

---

## Next Steps

### Now Available
- ✅ Medical safety controls
- ✅ HIPAA audit logging
- ✅ Automatic context loading

### Recommended Next
1. Read full guide: `.claude/AGENT_OPTIMIZATION_RECOMMENDATIONS.md`
2. Review hooks code: `.claude/hooks/README.md`
3. Customize patterns in `pre_tool_use.py` for your needs

### Phase 2 (Optional)
- Add `subagent_stop.py` for agent validation
- Add `pre_compact.py` for transcript backups
- Add `notification.py` for audio alerts

---

## Success Criteria

After this quick start, you should have:

- [x] Hooks tested and working
- [x] Pre-tool-use blocking dangerous operations
- [x] Post-tool-use creating audit trail
- [x] Session start loading medical context
- [x] Logs directory created and populated

**🎉 You now have medical-grade safety controls for AI development!**

---

## Impact

### Before Hooks
- 😰 Agents could accidentally log patient data
- 😰 No audit trail for HIPAA compliance
- 😰 Repeated medical context questions
- 😰 Dangerous operations possible

### After Hooks
- ✅ Patient data logging blocked automatically
- ✅ Full HIPAA-compliant audit trail
- ✅ Medical context always available
- ✅ Dangerous operations prevented

**Safety improvement: Unmeasurable (prevents catastrophic errors)**

---

## Support

- **Full guide**: `.claude/AGENT_OPTIMIZATION_RECOMMENDATIONS.md`
- **Hook details**: `.claude/hooks/README.md`
- **Example repo**: https://github.com/disler/claude-code-hooks-mastery

**Questions?** Check logs in `.claude/logs/` for debugging.

---

**Remember**: These hooks are your safety net. They protect patients and ensure HIPAA compliance. Don't disable them unless absolutely necessary! 🛡️
