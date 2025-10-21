# Documentation Index

Quick navigation guide for the prayer-collection package documentation.

## Documentation Files

| File | Purpose |
|------|---------|
| [README.md](../README.md) | Installation, quick start, overview |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | How to contribute (GitHub issue or PR) |
| [DATA_STRUCTURE.md](DATA_STRUCTURE.md) | JSON prayer format guide |
| [API_REFERENCE.md](API_REFERENCE.md) | API overview → see [index.d.ts](../index.d.ts) for details |
| [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) | Code examples for Node.js, React, Vue |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Build system overview → see [scripts/](../scripts/) for details |
| [PRAYER_ORGANIZATION.md](PRAYER_ORGANIZATION.md) | Classification overview → see [prayer-schema.json](../prayer-schema.json) for schema |

## Source Files (Authoritative Documentation)

| File | Contents |
|------|----------|
| [index.d.ts](../index.d.ts) | TypeScript types and JSDoc for all API functions |
| [index.js](../index.js) | API implementation with inline documentation |
| [prayer-schema.json](../prayer-schema.json) | JSON Schema defining prayer structure and categories |
| [lib/prayer-index.json](../lib/prayer-index.json) | Auto-generated list of all available prayers |
| [scripts/](../scripts/) | Build system implementation (see inline comments) |
| [prayers/](../prayers/) | JSON files for all prayers (browse for examples) |

## Quick Start Paths

**I want to use this package:**
1. [README.md](../README.md) - Install and basic usage
2. [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) - Framework-specific examples
3. [index.d.ts](../index.d.ts) - All available functions

**I want to contribute a prayer:**
1. [CONTRIBUTING.md](../CONTRIBUTING.md) - GitHub issue or PR workflow
2. [DATA_STRUCTURE.md](DATA_STRUCTURE.md) - JSON format guide
3. [prayers/our-father.json](../prayers/our-father.json) - Example to copy

**I want to understand how it works:**
1. [ARCHITECTURE.md](ARCHITECTURE.md) - Build flow overview
2. [scripts/build.js](../scripts/build.js) - Build implementation
3. [index.js](../index.js) - API implementation

---

**💡 Self-Documenting Codebase**: Most documentation files point to authoritative source files rather than duplicating information. When in doubt, check the actual source code, schema files, or generated indexes.
