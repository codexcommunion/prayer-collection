# Architecture & Implementation

This document explains where to find information about the project's architecture and build system. The actual implementation is self-documenting through code comments and structure.

## Understanding the Architecture

### **Build Pipeline** → Read the Build Scripts

The build system is documented in the scripts themselves:

- **`scripts/generate-static-data.js`** - Compiles JSON files into static JavaScript module
- **`scripts/build.js`** - Main build orchestration, validation, and report generation
- **`scripts/validate.js`** - Validation rules and checks
- **`scripts/validate-with-schema.js`** - Optional JSON Schema validation (requires Ajv)
- **`scripts/test.js`** - API function tests
- **`scripts/test-browser-compatibility.js`** - Browser compatibility tests

Each script has detailed comments explaining its purpose and logic.

### **Data Flow** → Follow the Code

```
prayers/*.json (source data)
    ↓
scripts/generate-static-data.js (compile to JS)
    ↓
lib/prayer-data.js (static module)
    ↓
index.js (API functions import from lib/prayer-data.js)
    ↓
Your application
```

### **File Structure** → Explore the Repository

```
prayer-collection/
├── prayers/           # Source: Prayer JSON files
├── lib/              # Generated: prayer-data.js, prayer-index.json, build-report.json
├── scripts/          # Build system (read these for pipeline details)
├── index.js          # Runtime API (read for function implementations)
├── index.d.ts        # TypeScript definitions (read for API surface)
└── package.json      # NPM scripts and publishing config
```

## Key Concepts

### Static Data Compilation (Browser Compatibility)

**Why:** Enables browser usage without Node.js filesystem operations.

**How:** `scripts/generate-static-data.js` imports all JSON files at build time and creates `lib/prayer-data.js` as a static JavaScript module that works everywhere.

**Implication:** Never import from `prayers/*.json` directly in runtime code. Always import from the package entry point.

### Validation Chain

Two validation modes available:

1. **`npm run validate`** - Custom validation (zero dependencies, always works)
2. **`npm run validate:schema`** - JSON Schema validation (requires `npm install -D ajv`)

Both enforce the same rules. Read `scripts/validate.js` for the complete list of validation checks.

### Pre-publish Hook

`package.json` line 23: `"prepublishOnly": "npm run build && npm run validate"`

This automatically runs before `npm publish` to prevent publishing invalid data.

## NPM Scripts Quick Reference

```bash
npm run build           # Build + validate + generate reports
npm run validate        # Standalone validation
npm run validate:schema # Schema-based validation (optional)
npm test               # API function tests
npm run test:browser   # Browser compatibility tests
npm run prepublishOnly # Auto-runs before publishing
```

See `package.json` scripts section for the exact commands.

## Adding New Prayers

1. Create `prayers/your-prayer-id.json` (see [DATA_STRUCTURE.md](DATA_STRUCTURE.md))
2. Run `npm run build` to regenerate static data
3. Run `npm run validate` to check for errors
4. Commit the JSON file (generated files in `lib/` are also committed)

The build system automatically includes new prayers in `lib/prayer-data.js` and updates `lib/prayer-index.json`.

## Publishing Workflow

See `package.json` for version management:

```bash
npm version patch  # or minor, major
npm publish       # prepublishOnly hook runs automatically
```

The `prepublishOnly` hook ensures validation passes before publishing.

## Troubleshooting

### "Prayer not appearing after adding JSON file"
Run `npm run build` to regenerate `lib/prayer-data.js`.

### "Validation errors"
Read the error output - it tells you exactly what's wrong. Common issues:
- Filename doesn't match `metadata.id`
- Missing required metadata fields
- `primary_category` not in `labels` array

### "TypeScript errors"
Check `index.d.ts` for correct type definitions and usage.

