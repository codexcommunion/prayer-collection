# JSON Schema for Prayer Collection

This directory contains the JSON Schema definition for validating prayer JSON files.

## Schema File

- **`prayer-schema.json`** - Complete JSON Schema (Draft 7) for prayer data structure

## Using the Schema

### In VS Code

Add this to your workspace settings (`.vscode/settings.json`):

```json
{
  "json.schemas": [
    {
      "fileMatch": ["prayers/*.json"],
      "url": "./prayer-schema.json"
    }
  ]
}
```

This enables:
- ✅ Auto-completion for prayer fields
- ✅ Inline validation errors
- ✅ Hover documentation
- ✅ Schema-aware editing

### With Ajv (Programmatic Validation)

Install Ajv:

```bash
npm install --save-dev ajv
```

Use the enhanced validation script:

```bash
npm run validate:schema
```

Or use programmatically:

```javascript
const Ajv = require('ajv');
const schema = require('./prayer-schema.json');
const prayer = require('./prayers/our-father.json');

const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(prayer);

if (!valid) {
  console.log(validate.errors);
}
```

### With Other Tools

The schema can be used with any JSON Schema validator:

- **Python**: `jsonschema` library
- **Java**: `json-schema-validator`
- **Go**: `gojsonschema`
- **Online**: https://www.jsonschemavalidator.net/

## Schema Features

### Comprehensive Validation

- ✅ Required fields enforcement
- ✅ Enum validation for categories and importance levels
- ✅ Free-form labels (with pattern validation for kebab-case)
- ✅ Pattern validation for IDs, dates
- ✅ Type checking (strings, arrays, objects)
- ✅ Array constraints (min items, uniqueness)
- ✅ Conditional validation (oneOf for text/content)

### Documentation

- 📝 Description for every field
- 📝 Examples for common patterns
- 📝 Clear error messages

### IDE Support

- 🔍 Auto-completion
- 🔍 Inline validation
- 🔍 Hover tooltips
- 🔍 Schema-aware refactoring

## Validation Modes

### 1. Custom Validation (Default)

```bash
npm run validate
```

Uses `scripts/validate.js` - always available, no dependencies required.

### 2. Schema Validation (Enhanced)

```bash
npm run validate:schema
```

Uses `scripts/validate-with-schema.js` - requires Ajv, provides more detailed errors.

Both modes run the same core validations, but schema validation provides:
- More detailed error messages
- Standard JSON Schema error format
- Better IDE integration

## Schema Updates

When updating the schema:

1. Edit `prayer-schema.json`
2. Update `docs/DATA_STRUCTURE.md` if structure changes
3. Run validation to ensure existing prayers still pass:
   ```bash
   npm run validate:schema
   ```
4. Update this README if new features are added

## Validation Rules

See [`docs/DATA_STRUCTURE.md`](docs/DATA_STRUCTURE.md) for complete documentation of:
- Metadata fields and formats
- Translation requirements
- Content structure rules
- Label and category definitions

### Important Notes

**Labels are free-form**: The schema validates that labels follow kebab-case format (e.g., `my-custom-label`) but does not restrict which labels can be used. Contributors can create new labels as needed. The schema includes common examples for guidance, but these are not exhaustive.

**Primary categories are fixed**: Unlike labels, `primary_category` values must be one of the predefined theological categories to maintain consistency.

## Contributing

When adding new validation rules:
1. Update `prayer-schema.json`
2. Document in `docs/DATA_STRUCTURE.md`
3. Test with existing prayers
4. Update examples if needed
