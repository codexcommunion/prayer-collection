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

### Static Data Compilation
- **Universal Compatibility**: Pre-compiled static data for Node.js + browser environments
- **No Runtime File I/O**: All JSON files compiled into `lib/prayer-data.js` during build
- **Bundler Friendly**: Works with Webpack, Vite, Rollup, Parcel without special configuration

## Development Workflows

### Adding New Prayers
1. **JSON Structure**: Copy existing prayer JSON, ensure `id` matches filename (kebab-case)
2. **Label Classification**: Set `primary_category` and add appropriate `labels` array
3. **Required Fields**: All metadata fields are mandatory, especially `origin_date` (use ISO 8601 ranges like "0030/0033")
4. **Language Coverage**: Include all 8 supported languages; partial translations trigger warnings

### Build System Commands
```bash
npm run build      # Generates static data + validates JSONs, creates lib/build-report.json
npm run validate   # Comprehensive validation with detailed error reporting
npm test          # Runs API function tests
npm run test:browser # Tests browser compatibility
npm run prepublishOnly # Auto-runs build + validate before publishing
```

### Git Workflow
To maintain code quality and minimize risk:

1. **Branching**: Always create a feature branch for new work (`git checkout -b feature/add-new-prayer`)
2. **Incremental Commits**: Make frequent, small commits during development to capture progress and enable easy rollbacks
3. **Validation**: Run `npm run validate` and `npm test` before each commit
4. **Merge Strategy**: When work is complete, merge back to main with squash commits if the branch has many small commits
5. **Push**: Push feature branches to origin for backup and collaboration

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