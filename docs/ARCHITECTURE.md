# Architecture & Implementation

Technical documentation covering the implementation details, build system, and architecture of the prayer-collection package.

## Universal Compatibility Architecture

This library uses a **static data import approach** to ensure compatibility across all JavaScript environments:

- **Build Process**: During `npm run build`, all JSON files are pre-imported and compiled into a static JavaScript module (`lib/prayer-data.js`)
- **No Runtime File I/O**: The library doesn't use `fs.readFileSync()` or other Node.js filesystem operations at runtime
- **Bundler Friendly**: Works seamlessly with Webpack, Vite, Rollup, Parcel, and other modern bundlers
- **Tree Shaking**: Modern bundlers can optimize and tree-shake the static data as needed

## Build Pipeline

The build system consists of several scripts that work together to validate and compile the prayer data:

### 1. `scripts/generate-static-data.js`

Converts JSON files to a JavaScript module for universal compatibility.

**Purpose**: Pre-compile all prayer JSON files into a static JavaScript module that can be imported in any environment.

**Output**: `lib/prayer-data.js` containing all prayer data as a JavaScript object.

**Why**: Eliminates the need for filesystem operations at runtime, enabling browser compatibility.

### 2. `scripts/build.js`

Validates prayer structure and generates metadata.

**Purpose**: 
- Validates all prayer JSON files for structural correctness
- Generates `lib/prayer-index.json` with metadata about all prayers
- Creates `lib/build-report.json` with build statistics
- Calls `generate-static-data.js` to create the static data module

**Validation Checks**:
- JSON syntax validation
- Required metadata fields
- Translation completeness
- Filename matches prayer ID
- Label consistency (primary_category in labels array)

**Output Files**:
- `lib/prayer-data.js` - Static data module
- `lib/prayer-index.json` - Prayer metadata index
- `lib/build-report.json` - Build statistics and validation report

### 3. `scripts/validate.js`

Comprehensive validation with detailed error reporting.

**Purpose**: Standalone validation tool for thorough checking of prayer data.

**Validation Rules**:
- Filename convention (JSON filename must match `metadata.id`)
- Label validation (primary_category should appear in labels array)
- Date formats (ISO 8601, ranges for uncertain dates)
- Language codes (ISO 639-1 standard)
- Missing translations (warnings for incomplete language coverage)
- ID conflicts (fails if multiple prayers share same ID)

**Usage**: Can be run independently via `npm run validate`

### 4. `scripts/validate-with-schema.js`

Enhanced validation using JSON Schema (optional).

**Purpose**: Provides JSON Schema-based validation with detailed error messages.

**Features**:
- Uses `prayer-schema.json` for formal validation
- Falls back to custom validation if Ajv is not installed
- More detailed error messages following JSON Schema standards
- Better IDE integration

**Usage**: 
```bash
npm install --save-dev ajv  # Optional dependency
npm run validate:schema
```

See [`SCHEMA.md`](../SCHEMA.md) for complete documentation.

### 5. `scripts/test.js`

Runs API function tests to ensure the package works correctly.

**Purpose**: Tests all exported API functions with sample data.

**Test Coverage**:
- Prayer retrieval functions
- Category and label filtering
- Search functionality
- Language support
- Error handling

### 6. `scripts/test-browser-compatibility.js`

Tests browser compatibility of the static data import approach.

**Purpose**: Validates that the library works in browser environments without filesystem access.

**Tests**:
- Static import functionality
- Data availability
- API functions in browser context

## Performance Benefits

### Faster Loading
No dynamic file reads at runtime - everything is pre-bundled and ready to use immediately.

### Better Caching
Static imports can be cached more effectively by bundlers and browsers, improving load times on subsequent visits.

### Smaller Bundle Size
With tree shaking, only the prayers actually used in your application get included in the final bundle, reducing overall size.

### No Filesystem Dependencies
Works identically in Node.js and browser environments without special configuration or polyfills.

## File Structure

```
prayer-collection/
├── prayers/                    # Prayer JSON files (source data)
│   ├── our-father.json
│   ├── hail-mary.json
│   └── ...
├── lib/                        # Generated/compiled files
│   ├── prayer-data.js         # Static data module (generated)
│   ├── prayer-index.json      # Prayer metadata index (generated)
│   └── build-report.json      # Build statistics (generated)
├── scripts/                    # Build and validation scripts
│   ├── build.js               # Main build script
│   ├── generate-static-data.js # Static data compiler
│   ├── validate.js            # Validation tool
│   ├── test.js                # API tests
│   └── test-browser-compatibility.js # Browser tests
├── index.js                    # Main API (imports from lib/prayer-data.js)
├── index.d.ts                 # TypeScript definitions
└── package.json               # Package configuration
```

## Data Flow

```
Prayer JSON Files (prayers/*.json)
    ↓
[Build Process - scripts/build.js]
    ↓
├── Validation (scripts/validate.js)
├── Static Data Generation (scripts/generate-static-data.js)
│   ↓
│   lib/prayer-data.js (static JavaScript module)
└── Metadata Generation
    ↓
    lib/prayer-index.json
    lib/build-report.json
    ↓
[Runtime - index.js]
    ↓
Imports static data from lib/prayer-data.js
    ↓
Exports API functions
    ↓
[Your Application]
```

## NPM Scripts

### `npm run build`
Generates static data, validates JSON files, and creates build reports.

**When to run**: Before committing changes, before publishing.

**Output**: 
- `lib/prayer-data.js`
- `lib/prayer-index.json`
- `lib/build-report.json`

### `npm run validate`
Comprehensive validation with detailed error reporting.

**When to run**: After modifying prayer JSON files, during development.

**Output**: Console report of validation results, exits with error code if validation fails.

### `npm test`
Runs API function tests.

**When to run**: Before committing, before publishing, after API changes.

**Output**: Test results for all API functions.

### `npm run test:browser`
Tests browser compatibility.

**When to run**: After changes to build system or data structure.

**Output**: Browser compatibility test results.

### `npm run prepublishOnly`
Automatically runs before publishing to npm.

**What it does**: Runs `npm run build` and `npm run validate` to ensure package integrity.

**Why**: Prevents publishing broken or invalid data.

## Publishing Workflow

To publish a new version:

1. **Update version** in `package.json`

2. **Run validation and tests**:
   ```bash
   npm run build
   npm run validate
   npm test
   ```

3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Release v1.0.0"
   ```

4. **Create git tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

5. **Publish to NPM**:
   ```bash
   npm publish
   ```

The `prepublishOnly` hook automatically runs build and validation before publishing.

## Integration Points

### NPM Package Structure

**Entry Point**: `index.js` provides runtime API, `index.d.ts` for TypeScript

**Distribution**: Only `prayers/`, `lib/`, `index.*` files included via `package.json` files field

**Pre-publish**: `prepublishOnly` hook runs build + validation automatically

### External Dependencies

**Runtime**: Zero runtime dependencies - pure Node.js fs/path modules only (used during build, not at runtime)

**Build Dependencies**: Node.js >=12.0.0 required for build scripts

**Validation Logic**: Custom validation in `scripts/validate.js`, not using external schema validators

## Browser Compatibility

The library is fully compatible with:
- **React** (Create React App, Next.js, Vite)
- **Vue.js** (Vue CLI, Vite, Nuxt.js)
- **Angular** (Angular CLI)
- **Svelte** (SvelteKit, Vite)
- **Vanilla JavaScript** (Webpack, Rollup, Parcel, esbuild)

No special configuration required - works out of the box with all modern bundlers.

## Adding New Prayers

When adding a new prayer to the collection:

1. **Create JSON file** in `prayers/` directory
   - Filename must match prayer ID (kebab-case)
   - Example: `prayer-to-st-john.json` → `id: "prayer-to-st-john"`

2. **Follow data structure** (see [DATA_STRUCTURE.md](DATA_STRUCTURE.md))
   - All required metadata fields
   - Translations for all 8 supported languages
   - Proper label classification

3. **Set classification**:
   - Choose appropriate `primary_category`
   - Add relevant labels (must include primary_category)
   - Set `importance` level

4. **Validate and build**:
   ```bash
   npm run build
   npm run validate
   ```

5. **Commit changes**:
   ```bash
   git add prayers/prayer-to-st-john.json
   git commit -m "Add Prayer to St. John"
   ```

The build system will automatically:
- Validate the new prayer
- Include it in `lib/prayer-data.js`
- Update `lib/prayer-index.json`
- Generate updated build report

## Common Issues & Solutions

### Issue: Prayer not appearing after adding JSON file
**Solution**: Run `npm run build` to regenerate the static data module.

### Issue: Validation errors about missing translations
**Solution**: These are warnings, not errors. Add translations for all languages or accept the warning.

### Issue: Build fails with "ID conflict"
**Solution**: Ensure the JSON filename matches the `metadata.id` field exactly.

### Issue: Library not working in browser
**Solution**: Make sure you're importing from the package, not directly from JSON files. The static data module handles browser compatibility.

### Issue: TypeScript type errors
**Solution**: Ensure you're using the correct types from `index.d.ts`. Import types like `Prayer`, `LanguageCode`, etc.
