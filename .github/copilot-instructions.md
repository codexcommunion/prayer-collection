# Prayer Collection Development Guide

## Project Overview
NPM package providing traditional Catholic prayers as structured JSON files with multilingual support and static data compilation for universal compatibility (Node.js + browsers).

## Critical Architecture Patterns

### Static Data Compilation (Universal Compatibility)
**WHY**: Enables browser usage without filesystem operations - critical differentiator from typical JSON packages

**Build Flow**:
1. `scripts/generate-static-data.js` → Imports all JSON files, generates `lib/prayer-data.js` module
2. `scripts/build.js` → Validates structure, creates `lib/prayer-index.json` + `lib/build-report.json`
3. `index.js` → Imports from `lib/prayer-data.js` (NOT directly from `prayers/` directory)

**Implication**: Never use `require('./prayers/some-prayer.json')` in runtime code. All prayer data MUST flow through the build pipeline.

### Flat File Structure with Multi-Label Classification
**Structure**: All prayers in single `prayers/` directory as `prayers/prayer-id.json` (no subdirectories)

**Classification System** (see `prayers/our-father.json` example):
- `primary_category`: Fixed theological enum ("marian", "christological", "saints", etc.)
- `labels`: Free-form array (kebab-case) - MUST include `primary_category` 
- `importance`: Liturgical weight ("essential", "common", "devotional")

**Example**: `prayers/chaplet-of-divine-mercy.json` has `primary_category: "devotional"` and `labels: ["devotional", "mercy", "chaplet", "common"]`

### Content Structure for Complex Prayers
**Simple prayers** use `text` field: `{ "la": { "text": "Pater noster..." } }`

**Complex prayers** (chaplets, rosaries) use `content` array to reference other prayers:
```json
{
  "content": [
    { "type": "instructions", "value": "Opening prayers:" },
    { "type": "prayer-reference", "value": "our-father" },
    { "type": "prayer-reference", "value": "hail-mary", "count": 3 },
    { "type": "text", "value": "Glory be to the Father..." }
  ]
}
```

**getPrayerText()** function (lines 120-160 in `index.js`) recursively resolves references and assembles full text.

## Development Workflows

### Adding New Prayers
1. **Create JSON**: `prayers/new-prayer-id.json` (filename MUST match `metadata.id`)
2. **Copy Template**: Use `prayers/our-father.json` as base structure
3. **Required Metadata**: All 14 metadata fields mandatory (see `prayer-schema.json` lines 11-29)
4. **Origin Dates**: ISO 8601 format - use ranges for uncertainty ("1050/1150"), prefix "~" for approximation ("~1200")
5. **Translations**: 8 languages required (la, en, es, fr, de, it, pt, pl) - missing translations generate warnings, not errors
6. **Validate**: Run `npm run build` - must pass to publish

### Validation Chain
**Two validation modes**:
- `npm run validate` - Custom validation (zero dependencies, always available)
- `npm run validate:schema` - JSON Schema validation (requires `ajv` dev dependency, more detailed errors)

**Critical Rules** (enforced in `scripts/validate.js` lines 47-69):
- Filename matches `metadata.id` exactly
- `primary_category` appears in `labels` array (warning if missing)
- `labels` array not empty
- Required languages (la, en) must have `text` OR `content` field
- No duplicate prayer IDs across all files

### Build Commands Critical Path
```bash
npm run build          # 1. Generate static data 2. Validate 3. Create build-report.json
npm run validate       # Standalone validation (run after any JSON edit)
npm test               # API function tests (uses lib/prayer-data.js)
npm run test:browser   # Browser compatibility tests
npm run prepublishOnly # AUTO-RUNS on `npm publish` - build + validate MUST pass
```

**Pre-publish Hook**: `package.json` line 19 - `npm publish` blocked if validation fails

## API Patterns

### Functional API Design (index.js)
**Immutability**: All functions return copies (`[...ALL_PRAYERS]`, `{ ...PRAYERS[id] }`) - prevent mutations
**Graceful Degradation**: Returns `null` for missing data, never throws on valid input
**Pre-indexed Data**: Static lookups via `PRAYERS_BY_CATEGORY`, `PRAYERS_BY_LABEL` (built at compile time)

**Example**:
```javascript
getPrayersByLabel('rosary') // Returns pre-indexed array from PRAYERS_BY_LABEL
getPrayerById('invalid-id') // Returns null, not error
getPrayerText('hail-mary', 'en', true) // skipOptional=true for nested references
```

### TypeScript Integration
`index.d.ts` defines `Prayer`, `PrayerMetadata`, `Translation`, `LanguageCode` types
No runtime overhead - pure type hints for consumers

## Common Gotchas

1. **Label Consistency**: Forgetting to include `primary_category` in `labels` array triggers warning
2. **Content vs Text**: Complex prayers need `content` array with `prayer-reference` types - can't use simple `text`
3. **Date Ranges**: Uncertain dates require forward slash separator ("1050/1150"), not dash
4. **Build Before Test**: Tests import from `lib/prayer-data.js` - must run `npm run build` after JSON changes
5. **ID Filename Mismatch**: `prayers/hail-mary.json` with `"id": "hail-mary-prayer"` fails validation

## Sacred Content Guidelines
These are liturgical Catholic prayers - maintain theological accuracy and use established translations. See `CONTRIBUTING.md` for full guidelines on respectful contribution.

## File Dependencies
- **Runtime**: `index.js` → `lib/prayer-data.js` (generated)
- **Build**: `scripts/build.js` → calls `scripts/generate-static-data.js`
- **Validation**: `scripts/validate.js` (standalone) OR `scripts/validate-with-schema.js` (uses `prayer-schema.json`)
- **Distribution**: Only `prayers/`, `lib/`, `index.js`, `index.d.ts` published (see `package.json` files field)