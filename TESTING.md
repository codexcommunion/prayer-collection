# Testing Documentation

## Test Coverage

The prayer collection has comprehensive test coverage to ensure the integrity of prayer data and API functionality.

### Test Suite Summary

**Total Tests**: 27  
**Success Rate**: 100%

## Test Categories

### 1. Basic API Tests (7 tests)
- `getAllPrayers()` returns array of all prayers
- `getPrimaryCategories()` returns array of primary categories  
- `getLabels()` returns array of labels
- `getPrayersByPrimaryCategory()` filters by primary category
- `getPrayersByLabel()` filters by label
- `getPrayersByImportance()` filters by importance level
- Legacy `getCategories()` maintains backward compatibility

### 2. Prayer Retrieval Tests (5 tests)
- `getPrayerById()` returns prayer for valid ID
- `getPrayerById()` returns null for invalid ID
- `getAllPrayersByCategory()` organizes prayers by category
- `getPrayerText()` returns text for valid prayer/language
- `getPrayerText()` returns null for invalid language

### 3. Search & Language Tests (3 tests)
- `searchPrayers()` finds matching prayers
- `getSupportedLanguages()` returns language codes
- Prayers have correct metadata structure

### 4. Complex Prayer Assembly Tests (8 tests)
- **Angelus**: Assembles content parts in correct order
- **Divine Mercy Chaplet**: Includes bracketed instructions
- **Divine Mercy Chaplet**: Respects count property for repetitions
- Content parts have correct types (text, instructions, prayer-reference)
- Prayer references resolve to actual prayer text
- Count property repeats content correctly
- Multiple prayer references assemble in correct sequence
- Content parts without count default to appearing once

### 5. Content Structure Tests (4 tests)
- Instructions formatted with brackets to distinguish from prayer text
- Invalid prayer references handled gracefully
- Content assembly works in multiple languages (en, es, la, fr)
- All prayers with content arrays have valid structure

## Complex Prayer Test Cases

### Angelus Prayer Tests
The Angelus demonstrates:
- **Versicle/Response pattern**: V. and R. dialogue structure
- **Prayer references**: Multiple Hail Mary insertions
- **Sequence integrity**: Correct ordering of content parts
- **Multilingual assembly**: Works across all supported languages

### Divine Mercy Chaplet Tests
The Divine Mercy Chaplet demonstrates:
- **Instructions**: Bracketed guidance text `[For each decade...]`
- **Multiple references**: Our Father, Hail Mary, Apostles Creed
- **Count property**: Final prayer repeated 3 times
- **Complex structure**: Mix of text, instructions, and references

## ContentPart Structure Tests

All content parts are validated for:
- **Required `type`**: Must be 'text', 'instructions', or 'prayer-reference'
- **Required `value`**: Must be non-empty string
- **Optional `count`**: Must be positive integer if present
- **Optional `speaker`**: Must be 'versicle', 'response', or 'both' if present

## Running Tests

```bash
# Run full test suite
npm test

# Run validation only
npm run validate

# Run build with validation
npm run build
```

## Test Maintenance

When adding new prayers with content arrays:
1. Ensure all content parts have `type` and `value`
2. Use `count` property for repetitions
3. Use `speaker` for liturgical dialogue
4. Test prayer references resolve correctly
5. Verify instructions are bracketed in output

## Continuous Integration

All tests must pass before:
- Publishing to NPM (via `prepublishOnly` hook)
- Merging pull requests
- Creating releases

## Test Files

- `scripts/test.js` - Main test suite
- `scripts/validate.js` - JSON structure validation
- `scripts/build.js` - Build-time validation
