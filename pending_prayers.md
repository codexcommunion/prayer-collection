# Pending Prayers

This document tracks prayers that are planned for future releases of the @codexcommunion/prayer-collection package.

## Location

All pending prayers that need to be converted to JSON format are located in the `pending_prayers/` directory.

## How to Add Prayers

To convert a pending prayer to the prayer collection:

1. Review the prayer text in the appropriate markdown file in `pending_prayers/`
2. Create a new JSON file in the `prayers/` directory following the schema defined in `prayer-schema.json`
3. Ensure all required fields are filled, including:
   - Unique `id` matching the filename (kebab-case)
   - `primary_category` and appropriate `labels` array
   - All 8 language translations (la, en, es, fr, de, it, pt, pl)
   - Complete metadata (origin_date, usage, importance, etc.)
4. Run `npm run validate` to check the JSON structure
5. Run `npm run build` to compile the static data
6. Remove the prayer from the pending markdown file once successfully added

See `CONTRIBUTING.md` for detailed contribution guidelines.

