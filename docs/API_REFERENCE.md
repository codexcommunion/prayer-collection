# API Reference

This package is designed to be self-documenting. To understand the API, consult these files:

## Primary Sources

### **`index.d.ts`** - TypeScript Type Definitions
The single source of truth for the complete API surface. Contains:
- All exported functions with parameter types and return types
- TypeScript interfaces (`Prayer`, `PrayerMetadata`, `Translation`, etc.)
- Type definitions (`LanguageCode`, `PrimaryCategory`, `ImportanceLevel`, `Label`)
- JSDoc comments explaining each function

**Start here** for a complete understanding of available functions and data structures.

### **`index.js`** - Runtime Implementation
The actual implementation with:
- JSDoc comments for each function
- Usage examples in comments
- Function signatures and behavior

Good for understanding how functions work internally.

### **`lib/prayer-index.json`** - Available Data
Generated file listing:
- All available prayer IDs
- All primary categories in use
- All labels in use
- Prayer counts by category

Use this to see what prayers are currently available in the collection.

## Quick Reference

### Find Available Functions
```bash
# View all exported functions
grep "^export function" index.d.ts

# Or look at the module.exports in index.js
grep -A 20 "module.exports" index.js
```

### Find Available Types
```bash
# View all TypeScript types
grep "^export type\|^export interface" index.d.ts
```

### Find Available Prayers
```bash
# View the generated index
cat lib/prayer-index.json
```

## Examples

For usage examples, see:
- **[USAGE_EXAMPLES.md](USAGE_EXAMPLES.md)** - Code examples for Node.js, TypeScript, React, Vue
- **[README.md](../README.md)** - Quick start examples
- Existing prayer files in `prayers/` directory for JSON structure examples
