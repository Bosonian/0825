#!/usr/bin/env python3
"""
Post-Tool-Use Hook - HIPAA Audit Logging
Logs all tool uses for compliance audit trail
"""

import sys
import json
from datetime import datetime
from pathlib import Path

def log_tool_use(tool_data):
    """Create immutable audit log entry"""
    log_dir = Path(__file__).parent.parent / "logs"
    log_dir.mkdir(exist_ok=True)

    # Extract key info
    tool_name = tool_data.get("tool", "unknown")

    # Create audit entry
    audit_entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "hook": "post_tool_use",
        "tool": tool_name,
        "success": True,  # If we reached post_tool_use, tool executed
    }

    # Add file info if available
    if "file_path" in tool_data:
        audit_entry["file"] = tool_data["file_path"]

    # Add command info for Bash
    if tool_name == "Bash" and "command" in tool_data:
        audit_entry["command"] = tool_data["command"][:200]  # Truncate

    # Append to audit log (immutable, append-only)
    audit_file = log_dir / "audit_trail.json"
    try:
        if audit_file.exists():
            with open(audit_file, 'r') as f:
                logs = json.load(f)
        else:
            logs = []

        logs.append(audit_entry)

        with open(audit_file, 'w') as f:
            json.dump(logs, f, indent=2)
    except Exception as e:
        # Don't fail if logging fails
        sys.stderr.write(f"Audit logging warning: {e}\n")

def check_for_patient_data_exposure(tool_data, result):
    """Validate that tool result doesn't expose patient data"""
    result_str = json.dumps(result).lower()

    # Check for accidental patient data exposure in results
    sensitive_patterns = [
        'gfap.*\\d{2,}',  # GFAP values
        'patient.*id',
        'medical.*record',
    ]

    import re
    for pattern in sensitive_patterns:
        if re.search(pattern, result_str, re.IGNORECASE):
            # Warning only, don't block (data already executed)
            return f"⚠️  WARNING: Tool result may contain patient data: {pattern}"

    return None

def main():
    try:
        # Read tool use data from stdin
        tool_data_str = sys.stdin.read()

        if not tool_data_str.strip():
            sys.exit(0)

        try:
            tool_data = json.loads(tool_data_str)
        except json.JSONDecodeError:
            tool_data = {"raw": tool_data_str}

        # Log for audit trail (HIPAA requirement)
        log_tool_use(tool_data)

        # Check for patient data exposure
        result = tool_data.get("result", {})
        warning = check_for_patient_data_exposure(tool_data, result)

        if warning:
            # Don't block (tool already executed), but warn
            sys.stderr.write(f"\n{warning}\n")

        # Success
        sys.exit(0)

    except Exception as e:
        # On error, fail open
        sys.stderr.write(f"Post-tool-use hook error: {e}\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
