#!/usr/bin/env python3
"""
Medical Safety Pre-Tool-Use Hook
Prevents operations that could compromise patient safety or HIPAA compliance
"""

import sys
import json
import re
from datetime import datetime
from pathlib import Path

def log_event(decision, reason, tool_input):
    """Log all pre-tool-use checks for audit trail"""
    log_dir = Path(__file__).parent.parent / "logs"
    log_dir.mkdir(exist_ok=True)

    log_entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "hook": "pre_tool_use",
        "decision": decision,
        "reason": reason,
        "tool": tool_input.get("tool", "unknown")[:100]  # Truncate for log
    }

    log_file = log_dir / "pre_tool_use.json"
    try:
        if log_file.exists():
            with open(log_file, 'r') as f:
                logs = json.load(f)
        else:
            logs = []

        logs.append(log_entry)

        with open(log_file, 'w') as f:
            json.dump(logs, f, indent=2)
    except Exception as e:
        # Don't fail if logging fails
        pass

def check_patient_data_logging(tool_input):
    """Prevent patient data from being logged to console"""
    tool_str = json.dumps(tool_input).lower()

    # Block console.log with medical data
    patient_data_patterns = [
        r'console\.log.*\bgfap\b',
        r'console\.log.*\bpatient\b',
        r'console\.log.*\bgcs\b.*\d',  # GCS with numbers
        r'console\.log.*\bnihss\b',
        r'console\.log.*\bblood.*pressure\b',
    ]

    for pattern in patient_data_patterns:
        if re.search(pattern, tool_str, re.IGNORECASE):
            return False, f"BLOCKED: Cannot log potential patient data (HIPAA violation)\nPattern matched: {pattern}"

    return True, ""

def check_dangerous_deletions(tool_input):
    """Prevent accidental deletion of patient or case data"""
    tool_str = json.dumps(tool_input).lower()

    dangerous_patterns = [
        r'\brm\b.*case.*data',
        r'\brm\b.*patient',
        r'\brm\b.*\.json.*case',
        r'delete\s+from\s+cases',  # SQL without WHERE
    ]

    for pattern in dangerous_patterns:
        if re.search(pattern, tool_str, re.IGNORECASE):
            return False, f"BLOCKED: Dangerous deletion operation detected\nPattern: {pattern}"

    return True, ""

def check_env_file_access(tool_input):
    """Prevent .env file commits or exposure"""
    tool_str = json.dumps(tool_input)

    # Allow .env.sample but block .env
    if '.env' in tool_str and '.env.sample' not in tool_str.lower():
        env_patterns = [
            r'git\s+add.*\.env\b',
            r'cat.*\.env\b',
            r'echo.*\.env\b',
        ]

        for pattern in env_patterns:
            if re.search(pattern, tool_str, re.IGNORECASE):
                return False, "BLOCKED: Cannot expose .env file (contains secrets)"

    return True, ""

def check_medical_calculation_safety(tool_input):
    """Ensure medical calculations have proper validation"""
    tool_str = json.dumps(tool_input).lower()

    # If editing ICH or medical calculation files, ensure validation exists
    if 'ich' in tool_str or 'calculator' in tool_str or 'prediction' in tool_str:
        if 'validate' not in tool_str and 'range' not in tool_str:
            # This is a warning, not a block - log but allow
            return True, "WARNING: Medical calculation edit without explicit validation"

    return True, ""

def main():
    try:
        # Read tool input from stdin
        tool_input_str = sys.stdin.read()

        if not tool_input_str.strip():
            sys.exit(0)  # Empty input, allow

        try:
            tool_input = json.loads(tool_input_str)
        except json.JSONDecodeError:
            # If not JSON, treat as string
            tool_input = {"raw": tool_input_str}

        # Run all safety checks
        checks = [
            check_patient_data_logging,
            check_dangerous_deletions,
            check_env_file_access,
            check_medical_calculation_safety,
        ]

        for check in checks:
            allowed, reason = check(tool_input)

            if not allowed:
                # Block operation
                log_event("blocked", reason, tool_input)
                sys.stderr.write(f"\n🚫 {reason}\n")
                sys.exit(2)  # Exit code 2 blocks execution

            if reason:  # Warning message
                log_event("warning", reason, tool_input)
                # Don't block, just log warning

        # All checks passed
        log_event("allowed", "All safety checks passed", tool_input)
        sys.exit(0)

    except Exception as e:
        # On error, allow operation (fail open for non-critical errors)
        sys.stderr.write(f"Hook error: {e}\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
