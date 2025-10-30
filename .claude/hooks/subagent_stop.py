#!/usr/bin/env python3
"""
Subagent Stop Hook - Validates Agent Task Completion
Ensures agents complete tasks properly before finishing
"""

import sys
import json
from datetime import datetime
from pathlib import Path

def log_event(agent_name, validation_result, output_summary):
    """Log subagent completion events for audit trail"""
    log_dir = Path(__file__).parent.parent / "logs"
    log_dir.mkdir(exist_ok=True)

    log_entry = {
        "timestamp": datetime.now().isoformat() + "Z",
        "hook": "subagent_stop",
        "agent": agent_name,
        "validation": validation_result,
        "output_length": len(output_summary)
    }

    log_file = log_dir / "subagent_completion.json"
    try:
        if log_file.exists():
            with open(log_file, 'r') as f:
                logs = json.load(f)
        else:
            logs = []

        logs.append(log_entry)

        with open(log_file, 'w') as f:
            json.dump(logs, f, indent=2)
    except Exception:
        pass  # Don't fail if logging fails

def validate_medical_safety_validator(output):
    """Validate Medical-Safety-Validator agent output"""
    required_sections = [
        "Data Integrity Score",
        "Critical Issues",
        "Recommendations"
    ]

    missing = []
    for section in required_sections:
        if section not in output:
            missing.append(section)

    if missing:
        return False, f"Medical-Safety report missing: {', '.join(missing)}"

    # Check for actual content
    if "score:" not in output.lower() and "/100" not in output:
        return False, "Missing data integrity score"

    return True, "Complete medical safety report"

def validate_debugger(output):
    """Validate Debugger agent output"""
    # Must report bug count
    has_bug_count = (
        "bugs found:" in output.lower() or
        "critical bugs" in output.lower() or
        "total bugs" in output.lower() or
        "no bugs" in output.lower()
    )

    if not has_bug_count:
        return False, "Debugger must report bug count"

    # Should have priority classification
    has_priority = any(word in output.lower() for word in ["critical", "high", "medium", "low"])
    if not has_priority:
        return False, "Missing bug priority classification"

    return True, "Complete debugging report"

def validate_performance_optimizer(output):
    """Validate Performance-Optimizer agent output"""
    required_metrics = [
        ("performance", "score"),
        ("fps", "animation"),
        ("memory", "leak"),
        ("api", "response")
    ]

    found_metrics = 0
    for metric_group in required_metrics:
        if any(metric.lower() in output.lower() for metric in metric_group):
            found_metrics += 1

    if found_metrics < 2:
        return False, "Missing performance metrics (need at least 2 of: FPS, memory, API, score)"

    return True, "Complete performance report"

def validate_security_auditor(output):
    """Validate Security-Auditor agent output"""
    # Must mention security score or vulnerabilities
    has_security_assessment = (
        "security score" in output.lower() or
        "vulnerabilities" in output.lower() or
        "hipaa" in output.lower() or
        "compliance" in output.lower()
    )

    if not has_security_assessment:
        return False, "Missing security assessment"

    return True, "Complete security audit"

def validate_data_scientist(output):
    """Validate Data-Scientist agent output"""
    required_elements = [
        "data flow",
        "integrity",
        "model"
    ]

    found = sum(1 for elem in required_elements if elem in output.lower())

    if found < 2:
        return False, f"Missing data science elements (found {found}/3)"

    return True, "Complete data science report"

def validate_generic_agent(output):
    """Generic validation for unknown agents"""
    # Basic checks
    if len(output.strip()) < 100:
        return False, "Output too short (< 100 characters)"

    # Should have some structure (bullets, numbers, or headers)
    has_structure = any(marker in output for marker in ["-", "*", "1.", "2.", "##", "###"])
    if not has_structure:
        return False, "Output lacks structure (no bullets/numbers/headers)"

    return True, "Generic validation passed"

def main():
    try:
        # Read subagent output from stdin
        input_data_str = sys.stdin.read()

        if not input_data_str.strip():
            sys.exit(0)  # Empty input, allow

        try:
            input_data = json.loads(input_data_str)
        except json.JSONDecodeError:
            # If not JSON, treat as plain text output
            input_data = {"output": input_data_str}

        # Extract agent info
        agent_name = input_data.get("agent_name", "unknown")
        output = input_data.get("output", str(input_data))

        # Select appropriate validator
        validators = {
            "medical-safety-validator": validate_medical_safety_validator,
            "medical-safety": validate_medical_safety_validator,
            "debugger": validate_debugger,
            "performance-optimizer": validate_performance_optimizer,
            "performance": validate_performance_optimizer,
            "security-auditor": validate_security_auditor,
            "security": validate_security_auditor,
            "data-scientist": validate_data_scientist,
            "data": validate_data_scientist,
        }

        # Get validator (case-insensitive)
        validator = None
        for key, val in validators.items():
            if key in agent_name.lower():
                validator = val
                break

        # Use generic validator if no specific one found
        if validator is None:
            validator = validate_generic_agent

        # Run validation
        is_valid, message = validator(output)

        # Log the event
        log_event(agent_name, "valid" if is_valid else "invalid", output[:200])

        if not is_valid:
            # Block completion if validation fails
            sys.stderr.write(f"\n⚠️  Agent validation failed: {message}\n")
            sys.stderr.write(f"Agent: {agent_name}\n")
            sys.stderr.write(f"\nPlease ensure the agent completes its task fully.\n")
            sys.exit(2)  # Block with exit code 2

        # Validation passed
        sys.exit(0)

    except Exception as e:
        # On error, allow (fail open)
        sys.stderr.write(f"Subagent stop hook error: {e}\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
