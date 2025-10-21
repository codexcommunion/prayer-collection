# Prayer Data Structure

Each prayer JSON file follows this standardized structure.

> **📋 JSON Schema**: A formal JSON Schema is available at [`prayer-schema.json`](../prayer-schema.json) for automated validation and IDE support.

## Complete JSON Schema

```json
{
  "metadata": {
    "id": "unique-prayer-identifier",
    "title": "Prayer Title",
    "primary_category": "main-theological-focus",
    "labels": ["classification", "labels", "array"],
    "importance": "essential",
    "type": "prayer-type",
    "description": "Brief description of the prayer",
    "origin": "Historical origin or source",
    "origin_date": "Earliest known date or century of origin in ISO 8601 format",
    "usage": "When and how the prayer is typically used",
    "feast_days": ["associated-feast-days"],
    "devotions": ["associated-devotions"],
    "created_date": "2025-07-14",
    "last_modified": "2025-07-14"
  },
  "translations": {
    "la": {
      "language": "Latin",
      "text": "Prayer text in Latin (for simple prayers)",
      "content": [
        {"type": "text", "value": "Opening text"},
        {"type": "prayer-reference", "value": "hail-mary", "count": 3},
        {"type": "text", "value": "Closing text"}
      ],
      "notes": "Optional notes about this translation"
    },
    "en": {
      "language": "English",
      "text": "Prayer text in English (for simple prayers)",
      "content": [
        {"type": "text", "value": "Opening text"},
        {"type": "prayer-reference", "value": "our-father"},
        {"type": "prayer-reference", "value": "hail-mary"},
        {"type": "text", "value": "Closing text"}
      ],
      "notes": "Optional notes about this translation"
    }
  }
}
```

## Metadata Fields

- **id**: Unique identifier for the prayer (kebab-case)
- **title**: The common name of the prayer
- **primary_category**: Main theological focus (see [Prayer Organization](PRAYER_ORGANIZATION.md))
- **labels**: Array of classification labels (cannot be empty, must include primary_category). **Labels are free-form** and can be customized for each prayer using kebab-case format (e.g., `my-custom-label`). See [Prayer Organization](PRAYER_ORGANIZATION.md) for commonly used labels.
- **importance**: Liturgical significance ("essential", "common", "devotional")
- **type**: Specific prayer type (e.g., "scriptural", "devotional", "liturgical", "prayer")
- **description**: Brief explanation of the prayer's purpose
- **origin**: Historical background or source
- **origin_date**: Earliest known date or century of origin in ISO 8601 format. Use ranges for uncertain dates (e.g., "0030/0033", "1050/1150") or approximate dates with "~" prefix (e.g., "~0200", "~1200")
- **usage**: Context in which the prayer is typically used
- **feast_days**: Associated liturgical celebrations
- **devotions**: Related devotional practices (e.g., "rosary", "divine-mercy")
- **created_date**: Date the JSON file was created (ISO 8601 format)
- **last_modified**: Date the JSON file was last updated (ISO 8601 format)

## Translation Fields

- **language**: Full name of the language
- **text**: The prayer text in that language (for simple prayers without references)
- **content**: Array of content parts for prayers that reference other prayers (see below)
- **notes**: Optional field for translation notes, historical context, or variations

## Content Structure for Prayer References

Some prayers (like chaplets, rosaries, or liturgical sequences) incorporate other prayers multiple times. To avoid duplication, these prayers use a `content` array instead of (or in addition to) the `text` field. The content array contains parts that are either:

- **Text parts**: `{"type": "text", "value": "actual prayer text"}`
- **Prayer references**: `{"type": "prayer-reference", "value": "hail-mary", "count": 3}`
- **Instructions**: `{"type": "instructions", "value": "guidance for the prayer"}`

### Content Part Properties

Each content part has these properties:

- **type** (required): The type of content part
  - `"text"`: Spoken prayer content
  - `"prayer-reference"`: Reference to another prayer
  - `"instructions"`: Guidance text (formatted with brackets `[...]` in output)
- **value** (required): The content
  - For `text`/`instructions`: The actual text
  - For `prayer-reference`: The prayer ID to reference
- **count** (optional): Number of times to repeat this content part (default: 1)
- **speaker** (optional): Liturgical speaker role for dialogue prayers
  - `"versicle"`: The call/lead part (traditionally said by the leader/celebrant)
  - `"response"`: The reply part (traditionally said by the congregation/people)
  - `"both"`: Text said by everyone together
- **optional** (optional): Whether this content part is optional (default: false)

### Speaker Roles in Liturgical Dialogue

Some prayers contain call-and-response elements typical of Catholic liturgy. The `speaker` attribute identifies who traditionally says each part:

- **Versicle (V.)**: The leader or celebrant calls out
- **Response (R.)**: The congregation or people respond

This preserves the liturgical structure while allowing flexible presentation.

### Example Content Structure

```json
"content": [
  {"type": "text", "value": "The Angel of the Lord declared unto Mary.", "speaker": "versicle"},
  {"type": "text", "value": "And she conceived of the Holy Spirit.", "speaker": "response"},
  {"type": "prayer-reference", "value": "hail-mary"},
  {"type": "prayer-reference", "value": "hail-mary", "count": 3},
  {"type": "instructions", "value": "For each decade of the rosary:"}
]
```

The API automatically assembles the full prayer text by replacing references with the actual prayer content.
