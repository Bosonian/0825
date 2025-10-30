#!/usr/bin/env python3
"""
Session Start Hook - Loads Medical and Project Context
Automatically loads medical guidelines and project status on session start
"""

import sys
import json
import subprocess
from pathlib import Path
from datetime import datetime

def get_git_info():
    """Get current git status"""
    try:
        branch = subprocess.check_output(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            stderr=subprocess.DEVNULL,
            timeout=5
        ).decode().strip()

        uncommitted = subprocess.check_output(
            ["git", "status", "--porcelain"],
            stderr=subprocess.DEVNULL,
            timeout=5
        ).decode().strip()

        uncommitted_count = len(uncommitted.split('\n')) if uncommitted else 0

        last_commit = subprocess.check_output(
            ["git", "log", "-1", "--pretty=%B"],
            stderr=subprocess.DEVNULL,
            timeout=5
        ).decode().strip()

        return {
            "branch": branch,
            "uncommitted_files": uncommitted_count,
            "last_commit": last_commit[:100]  # Truncate
        }
    except Exception:
        return None

def load_context_file(file_path):
    """Load a context file if it exists"""
    path = Path(file_path)
    if path.exists():
        try:
            with open(path, 'r') as f:
                return f.read(5000)  # Limit to 5000 chars
        except Exception:
            return None
    return None

def load_medical_context():
    """Load medical domain knowledge"""
    medical_context = """
# Medical Context for Stroke Triage Assistant

## Critical Value Ranges
- GFAP: 29-10001 pg/mL (Glial Fibrillary Acidic Protein)
- GCS: 3-15 (Glasgow Coma Scale)
- Age: 18-120 years
- NIHSS: 0-42 (NIH Stroke Scale)

## Risk Thresholds
- ICH Critical: >70% probability (immediate intervention)
- ICH High: 50-70% probability (urgent review)
- ICH Medium: 30-50% probability (monitor)
- ICH Low: <30% probability (standard care)

## Clinical Decision Pathways
- GCS <8: Coma Assessment Module
- GCS 8-15 + Limited Data: Limited Assessment Module
- GCS 8-15 + Complete Data: Full Assessment Module

## Safety Rules
1. Never log patient data to console (HIPAA violation)
2. Always validate medical value ranges before calculation
3. Use deep cloning for case data (prevent reference sharing)
4. 30-day minimum data retention for audit trail
5. All predictions require clinical confirmation

## API Endpoints
- Coma: predict_coma_ich
- Limited: predict_limited_data_ich
- Full: predict_full_stroke
- Auth: authenticate-research-access
"""
    return medical_context

def main():
    try:
        # Parse command line arguments
        load_context = "--load-context" in sys.argv

        if not load_context:
            # No context requested, exit normally
            sys.exit(0)

        # Build context
        context_parts = []

        # 1. Medical Context
        context_parts.append("=" * 60)
        context_parts.append("MEDICAL DOMAIN CONTEXT")
        context_parts.append("=" * 60)
        context_parts.append(load_medical_context())

        # 2. Git Status
        git_info = get_git_info()
        if git_info:
            context_parts.append("\n" + "=" * 60)
            context_parts.append("GIT STATUS")
            context_parts.append("=" * 60)
            context_parts.append(f"Branch: {git_info['branch']}")
            context_parts.append(f"Uncommitted files: {git_info['uncommitted_files']}")
            context_parts.append(f"Last commit: {git_info['last_commit']}")

        # 3. Load CLAUDE.md (project instructions)
        claude_md = load_context_file("CLAUDE.md")
        if claude_md:
            context_parts.append("\n" + "=" * 60)
            context_parts.append("PROJECT INSTRUCTIONS (CLAUDE.md)")
            context_parts.append("=" * 60)
            context_parts.append(claude_md)

        # 4. Load TODO if exists
        todo = load_context_file(".claude/TODO.md")
        if todo:
            context_parts.append("\n" + "=" * 60)
            context_parts.append("ACTIVE TASKS (TODO.md)")
            context_parts.append("=" * 60)
            context_parts.append(todo)

        # 5. Load agent definitions summary
        agent_dir = Path(".claude/agents")
        if agent_dir.exists():
            agents = list(agent_dir.glob("*.md"))
            if agents:
                context_parts.append("\n" + "=" * 60)
                context_parts.append(f"AVAILABLE AGENTS ({len(agents)})")
                context_parts.append("=" * 60)
                for agent_file in agents:
                    context_parts.append(f"- {agent_file.stem}")

        # Combine context
        full_context = "\n".join(context_parts)

        # Output as hookSpecificOutput JSON
        output = {
            "hookSpecificOutput": {
                "additionalContext": full_context
            }
        }

        print(json.dumps(output, indent=2))
        sys.exit(0)

    except Exception as e:
        # On error, fail silently (fail open)
        sys.stderr.write(f"Session start hook error: {e}\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
