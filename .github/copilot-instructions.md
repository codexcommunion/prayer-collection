# Prayer Collection Development Guide

## Project Overview
This is an NPM package providing structured Catholic prayers as JSON files with multilingual support. The project follows a category-based architecture with strict data validation and TypeScript definitions.

## Core Architecture

### Data Structure
- **Flat File Structure**: All prayers in single `prayers/` directory as `prayer-name.json`
- **Multi-Label Classification**: Rich metadata with primary category + multiple labels
  - `primary_category`: Main theological focus ("marian", "christological", "saints")
  - `labels`: Array of classifications (["core", "essential", "rosary", "daily"])
  - `importance`: Liturgical significance ("essential", "common", "devotional")
- **Multilingual**: Each prayer supports 8 languages (la, en, es, fr, de, it, pt, pl) with required translations
- **Metadata-driven**: Rich metadata includes origin dates, usage contexts, feast days, and devotions

### Proposed File Organization
```
prayers/
├── our-father.json          # labels: ["core", "essential", "christological"]
├── hail-mary.json          # labels: ["core", "essential", "marian", "rosary"]
├── angelus.json            # labels: ["marian", "daily", "devotional"]
├── st-michael-prayer.json  # labels: ["saints", "protection", "common"]
└── [all-prayers].json      # No subdirectories - flat structure
```

## Development Workflows

### Adding New Prayers
1. **JSON Structure**: Copy existing prayer JSON, ensure `id` matches filename (kebab-case)
2. **Label Classification**: Set `primary_category` and add appropriate `labels` array
3. **Required Fields**: All metadata fields are mandatory, especially `origin_date` (use ISO 8601 ranges like "0030/0033")
4. **Language Coverage**: Include all 8 supported languages; partial translations trigger warnings

### Build System Commands
```bash
npm run build      # Validates JSONs, creates lib/build-report.json and lib/prayer-index.json
npm run validate   # Comprehensive validation with detailed error reporting
npm test          # Runs test suite against API functions
```

### Critical Build Artifacts
- `lib/build-report.json`: Validation results, error/warning counts by category  
- `lib/prayer-index.json`: Runtime index for API functions, tracks total prayers and categories

## Code Patterns

### API Design Philosophy
- **Functional API**: All exports are pure functions (`getPrayerById`, `getPrayersByCategory`)
- **Graceful Degradation**: Returns `null` for missing prayers, throws errors only for invalid categories
- **Type Safety**: Full TypeScript definitions in `index.d.ts` with `Prayer`, `PrayerMetadata` interfaces

### Data Validation Rules
- **Filename Convention**: JSON filename must match `metadata.id` exactly
- **Label Validation**: `primary_category` should match one label in `labels` array
- **Date Formats**: Use ISO 8601, ranges for uncertain dates ("1050/1150"), approximate with "~" prefix
- **Language Codes**: ISO 639-1 standard (la, en, es, fr, de, it, pt, pl)

### Common Gotchas
- **Label Consistency**: Ensure `primary_category` appears in `labels` array
- **Missing Translations**: Warnings (not errors) for incomplete language coverage
- **ID Conflicts**: Build fails if multiple prayers share same ID
- **JSON Syntax**: Any malformed JSON breaks validation

## Integration Points

### NPM Package Structure
- **Entry Point**: `index.js` provides runtime API, `index.d.ts` for TypeScript
- **Distribution**: Only `prayers/`, `lib/`, `index.*` files included via `package.json` files field
- **Pre-publish**: `prepublishOnly` hook runs build + validation automatically

### External Dependencies  
- **Zero Runtime Dependencies**: Pure Node.js fs/path modules only
- **Build Dependencies**: Node.js >=12.0.0 required for scripts
- **Validation Logic**: Custom validation in `scripts/validate.js`, not using external schema validators

When working on this codebase, always run `npm run validate` after JSON changes and understand that the build system is central to data integrity - all prayers must pass validation to publish.