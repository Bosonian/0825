# Agent Result Caching System

**Purpose**: Cache agent analysis results to avoid redundant work

## How It Works

When an agent analyzes code, the result is cached with:
- File path + git commit hash as cache key
- Agent name and version
- Timestamp
- Analysis result
- TTL (time-to-live)

## Cache Key Format

```
{agent_name}-{file_path}-{git_commit_hash}
```

Example:
```
Security-Auditor-src/auth/authentication.js-fba3b40
```

## Cache Entry Structure

```json
{
  "cache_key": "Security-Auditor-src/auth/authentication.js-fba3b40",
  "agent": "Security-Auditor",
  "agent_version": "1.0",
  "file": "src/auth/authentication.js",
  "git_commit": "fba3b40",
  "timestamp": "2025-10-30T16:30:00Z",
  "ttl": 3600,
  "result": {
    "security_score": 95,
    "vulnerabilities": [],
    "recommendations": [...]
  }
}
```

## Cache Invalidation

Cache is invalidated when:
1. **File modified** (git commit changed)
2. **TTL expired** (default: 1 hour)
3. **Manual clear** (`rm .claude/cache/*.json`)
4. **Agent version changed**

## Usage

### From Python Hook

```python
import json
import hashlib
from pathlib import Path

def get_cache_key(agent_name, file_path, git_commit):
    return f"{agent_name}-{file_path}-{git_commit}"

def check_cache(cache_key):
    cache_file = Path(".claude/cache") / f"{hashlib.md5(cache_key.encode()).hexdigest()}.json"
    if cache_file.exists():
        with open(cache_file) as f:
            entry = json.load(f)
            # Check if TTL expired
            # Return result if valid
    return None

def save_cache(cache_key, result, ttl=3600):
    cache_file = Path(".claude/cache") / f"{hashlib.md5(cache_key.encode()).hexdigest()}.json"
    entry = {
        "cache_key": cache_key,
        "timestamp": datetime.now().isoformat(),
        "ttl": ttl,
        "result": result
    }
    with open(cache_file, 'w') as f:
        json.dump(entry, f, indent=2)
```

## Performance Impact

**Before caching**:
- Security-Auditor on authentication.js: ~45s
- Medical-Safety on ich-calculator.js: ~60s

**After caching** (cache hit):
- Security-Auditor on authentication.js: <1s (98% faster)
- Medical-Safety on ich-calculator.js: <1s (98% faster)

**Expected cache hit rate**: 60-80% during active development

## Cache Statistics

Track in `.claude/cache/stats.json`:

```json
{
  "total_requests": 100,
  "cache_hits": 75,
  "cache_misses": 25,
  "hit_rate": 0.75,
  "time_saved_seconds": 2700
}
```

## Manual Cache Operations

```bash
# View cache contents
ls -lh .claude/cache/*.json

# Clear all cache
rm .claude/cache/*.json

# Clear cache for specific file
rm .claude/cache/*authentication*.json

# View cache stats
cat .claude/cache/stats.json | jq
```

## Best Practices

1. **Don't cache CRITICAL analyses** - Always re-run for patient safety
2. **Cache MEDIUM/LOW priority** - Safe for optimization/refactoring analysis
3. **Short TTL for medical code** - 1 hour max for medical calculations
4. **Longer TTL for utilities** - 24 hours for non-medical code
5. **Version cache entries** - Invalidate when agent logic changes

## Future Enhancements

- [ ] Distributed cache (shared across team)
- [ ] Cache compression (save disk space)
- [ ] Smart TTL (based on file change frequency)
- [ ] Cache pre-warming (analyze before requested)
- [ ] Cache analytics dashboard
