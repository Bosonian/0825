#!/usr/bin/env python3
"""
User Prompt Submit Hook - Medical Keyword Enrichment
Automatically adds medical context when medical terms detected in prompts
"""

import sys
import json
from datetime import datetime
from pathlib import Path

# Medical keyword database with context
MEDICAL_KEYWORDS = {
    'gfap': {
        'full_name': 'Glial Fibrillary Acidic Protein',
        'context': 'Biomarker for detecting intracerebral hemorrhage (ICH). Normal range: 29-10001 pg/mL.',
        'usage': 'Used in ICH prediction models to assess bleeding risk.'
    },
    'gcs': {
        'full_name': 'Glasgow Coma Scale',
        'context': 'Consciousness assessment scale ranging from 3 (deep coma) to 15 (fully alert).',
        'usage': 'GCS < 9 indicates comatose patient requiring specialized assessment pathway.'
    },
    'ich': {
        'full_name': 'Intracerebral Hemorrhage',
        'context': 'Bleeding within the brain tissue, a type of hemorrhagic stroke.',
        'usage': 'Critical condition requiring immediate imaging and potential neurosurgical intervention.'
    },
    'lvo': {
        'full_name': 'Large Vessel Occlusion',
        'context': 'Blockage of major cerebral arteries causing ischemic stroke.',
        'usage': 'May require mechanical thrombectomy. FASTED score ≥4 suggests LVO.'
    },
    'fasted': {
        'full_name': 'Facial palsy, Arm weakness, Speech, Time, Eye deviation, Denial/neglect',
        'context': 'Clinical scoring system (0-6) for assessing LVO probability.',
        'usage': 'Score ≥4 indicates likely LVO, requiring comprehensive stroke center transfer.'
    },
    'nihss': {
        'full_name': 'NIH Stroke Scale',
        'context': 'Comprehensive stroke severity assessment (0-42 points).',
        'usage': 'Higher scores indicate more severe neurological deficit.'
    },
    'abc/2': {
        'full_name': 'ABC/2 Formula',
        'context': 'ICH volume calculation method: (length × width × height) / 2',
        'usage': 'Estimates hemorrhage volume from CT imaging measurements.'
    },
    'noak': {
        'full_name': 'Novel Oral Anticoagulants',
        'context': 'Modern anticoagulants (also called DOACs - Direct Oral Anticoagulants).',
        'usage': 'Increases ICH risk. Important medication history for bleeding risk assessment.'
    },
    'doac': {
        'full_name': 'Direct Oral Anticoagulants',
        'context': 'Same as NOACs - modern anticoagulant medications.',
        'usage': 'Increases bleeding risk. Check for use before thrombolytic therapy.'
    },
}

def log_prompt_enrichment(prompt, enriched, keywords_found):
    """Log prompt enrichment events"""
    log_dir = Path(__file__).parent.parent / "logs"
    log_dir.mkdir(exist_ok=True)

    log_entry = {
        "timestamp": datetime.now().isoformat() + "Z",
        "hook": "user_prompt_submit",
        "original_length": len(prompt),
        "enriched_length": len(enriched),
        "keywords_found": keywords_found,
        "enrichment_applied": enriched != prompt
    }

    log_file = log_dir / "prompt_enrichment.json"
    try:
        if log_file.exists():
            with open(log_file, 'r') as f:
                logs = json.load(f)
        else:
            logs = []

        logs.append(log_entry)

        # Keep only last 100 entries
        if len(logs) > 100:
            logs = logs[-100:]

        with open(log_file, 'w') as f:
            json.dump(logs, f, indent=2)
    except Exception:
        pass  # Don't fail if logging fails

def enrich_prompt_with_medical_context(prompt):
    """Add medical context when medical keywords detected"""
    prompt_lower = prompt.lower()
    enrichments = []
    keywords_found = []

    # Check for each medical keyword
    for keyword, info in MEDICAL_KEYWORDS.items():
        # Match whole word (not part of another word)
        import re
        pattern = r'\b' + re.escape(keyword) + r'\b'
        if re.search(pattern, prompt_lower):
            keywords_found.append(keyword.upper())
            enrichment = f"\n\n📋 Medical Context - **{keyword.upper()}** ({info['full_name']}):\n"
            enrichment += f"- {info['context']}\n"
            enrichment += f"- Usage: {info['usage']}"
            enrichments.append(enrichment)

    if enrichments:
        # Add enrichments at the end of prompt
        enriched_prompt = prompt + "\n" + "\n".join(enrichments)
        log_prompt_enrichment(prompt, enriched_prompt, keywords_found)
        return enriched_prompt, keywords_found
    else:
        log_prompt_enrichment(prompt, prompt, [])
        return prompt, []

def main():
    try:
        # Read prompt data from stdin
        input_data_str = sys.stdin.read()

        if not input_data_str.strip():
            sys.exit(0)  # Empty input, allow

        try:
            input_data = json.loads(input_data_str)
        except json.JSONDecodeError:
            # If not JSON, treat as plain text prompt
            input_data = {"prompt": input_data_str}

        # Extract prompt
        prompt = input_data.get("prompt", str(input_data))

        # Enrich prompt with medical context
        enriched_prompt, keywords = enrich_prompt_with_medical_context(prompt)

        # Output enriched prompt as hookSpecificOutput
        if enriched_prompt != prompt:
            output = {
                "hookSpecificOutput": {
                    "enrichedPrompt": enriched_prompt,
                    "keywordsFound": keywords,
                    "enrichmentApplied": True
                }
            }
            print(json.dumps(output, indent=2))

        # Success (allow prompt to proceed)
        sys.exit(0)

    except Exception as e:
        # On error, allow (fail open)
        sys.stderr.write(f"User prompt submit hook error: {e}\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
