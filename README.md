# Prayer Collection

A comprehensive collection of traditional Roman Catholic prayers in multiple languages, organized as structured JSON files with flexible label-based classification.

## Project Overview

This project provides a standardized collection of the most important prayers from the Roman Catholic tradition. Each prayer is stored as a separate JSON file with rich metadata and multilingual translations to support internationalization (i18n) efforts.

## Current Collection

**56 prayers currently available:**

```
prayers/
├── act-of-contrition.json ✅
├── act-of-faith.json ✅
├── act-of-hope.json ✅
├── act-of-love.json ✅
├── advent-antiphons.json ✅
├── alma-redemptoris-mater.json ✅
├── angelus.json ✅
├── anima-christi.json ✅
├── apostles-creed.json ✅
├── ave-regina-caelorum.json ✅
├── canticle-of-simeon.json ✅
├── canticle-of-zechariah.json ✅
├── chaplet-of-divine-mercy.json ✅
├── chaplet-of-st-michael.json ✅
├── christmas-prayer.json ✅
├── come-holy-spirit.json ✅
├── confiteor.json ✅
├── easter-prayer.json ✅
├── eternal-rest.json ✅
├── evening-prayer.json ✅
├── fatima-prayer.json ✅
├── glory-be.json ✅
├── grace-after-meals.json ✅
├── grace-before-meals.json ✅
├── hail-holy-queen.json ✅
├── hail-mary.json ✅
├── jesus-prayer.json ✅
├── lenten-prayer.json ✅
├── litany-of-loreto.json ✅
├── litany-of-the-sacred-heart.json ✅
├── magnificat.json ✅
├── memorare.json ✅
├── morning-offering.json ✅
├── our-father.json ✅
├── prayer-before-crucifix.json ✅
├── prayer-for-the-dead.json ✅
├── prayer-of-st-francis.json ✅
├── prayer-to-guardian-angel.json ✅
├── prayer-to-st-anthony.json ✅
├── prayer-to-st-joseph.json ✅
├── prayer-to-st-jude.json ✅
├── prayer-to-st-michael.json ✅
├── prayer-to-st-patrick.json ✅
├── prayer-to-st-rita.json ✅
├── prayer-to-st-therese.json ✅
├── regina-caeli.json ✅
├── salve-regina.json ✅
├── sub-tuum-praesidium.json ✅
├── te-deum.json ✅
└── veni-creator-spiritus.json ✅
```

**📋 Complete Current List:** [lib/prayer-index.json](lib/prayer-index.json)  
**🔮 Planned Additions:** [pending_prayers.md](pending_prayers.md)

## Prayer Organization

Prayers are organized using a flexible **multi-label classification system** that allows prayers to belong to multiple categories simultaneously.

### **Primary Categories**
Each prayer has one primary theological focus:
- **`penitential`** - Prayers of repentance and confession (Act of Contrition, Confiteor)
- **`seasonal`** - Prayers for specific liturgical seasons (Advent Antiphons, Christmas Prayer)
- **`marian`** - Prayers to the Virgin Mary (Hail Mary, Angelus, Memorare, Hail Holy Queen)
- **`christological`** - Prayers focused on Jesus Christ (Our Father, Jesus Prayer)
- **`creeds`** - Statements of faith (Apostles' Creed)
- **`liturgical`** - Formal liturgical prayers (Glory Be, Te Deum)
- **`devotional`** - Private devotional prayers (Divine Mercy Chaplet)
- **`holy-spirit`** - Prayers to the Holy Spirit (Come Holy Spirit, Veni Creator Spiritus)
- **`for-the-dead`** - Prayers for the deceased (Eternal Rest, Prayer for the Dead)
- **`daily`** - Prayers for daily recitation (Morning Offering, Evening Prayer)
- **`saints`** - Prayers for saint intercession (St. Michael Prayer, Litany of Loreto)

### **Labels** 
Prayers can have multiple labels for flexible classification:
- **`core`** - Essential prayers every Catholic should know
- **`essential`** - Prayers of highest liturgical importance  
- **`common`** - Widely known prayers
- **`devotional`** - Private devotional prayers
- **`daily`** - Prayers for daily recitation
- **`rosary`** - Prayers used in the Rosary
- **`mass`** - Prayers used in the Mass
- **`protection`** - Prayers for spiritual protection
- **`marian`** - Related to Mary
- **`christological`** - Related to Christ
- **`saints`** - Related to saints
- **`penitential`** - Related to repentance
- **`liturgical`** - Formal liturgical use
- **`creeds`** - Statements of faith
- **`holy-spirit`** - Related to the Holy Spirit
- **`for-the-dead`** - Prayers for the deceased
- **`evening`** - Evening prayers
- **`morning`** - Morning prayers
- **`mercy`** - Mercy-focused prayers
- **`chaplet`** - Chaplet prayers
- **`angels`** - Angel-related prayers
- **`seasonal`** - Seasonal prayers (Advent, Christmas, Lent, Easter)
- **`meals`** - Prayers before/after meals
- **`family`** - Family prayers
- **`contemplative`** - Contemplative prayers
- **`eastern`** - Eastern Catholic traditions
- **`litany`** - Litany prayers
- **`petition`** - Petition prayers
- **`intercession`** - Intercessory prayers
- **`peace`** - Peace prayers
- **`franciscan`** - Franciscan spirituality
- **`praise`** - Prayers of praise

### **Importance Levels**
- **`essential`** - Core prayers of fundamental importance
- **`common`** - Standard prayers in regular use
- **`devotional`** - Optional prayers for personal devotion

### **Classification Examples**
- **Our Father**: `christological` + `["core", "essential", "christological", "daily", "rosary", "mass"]`
- **Hail Mary**: `marian` + `["core", "essential", "marian", "rosary", "daily"]`
- **St. Michael Prayer**: `saints` + `["saints", "protection", "common"]`

> **📋 Complete Prayer List**: See [lib/prayer-index.json](lib/prayer-index.json) for all available prayers and their classifications.
> 
> **🔮 Future Prayers**: See [pending_prayers.md](pending_prayers.md) for prayers planned for future releases.

## Prayer JSON Structure

Each prayer JSON file follows this standardized structure:

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
    },
    "es": {
      "language": "Spanish",
      "text": "Prayer text in Spanish",
      "notes": "Optional notes about this translation"
    },
    "fr": {
      "language": "French",
      "text": "Prayer text in French",
      "notes": "Optional notes about this translation"
    },
    "de": {
      "language": "German",
      "text": "Prayer text in German",
      "notes": "Optional notes about this translation"
    },
    "it": {
      "language": "Italian",
      "text": "Prayer text in Italian",
      "notes": "Optional notes about this translation"
    },
    "pt": {
      "language": "Portuguese",
      "text": "Prayer text in Portuguese",
      "notes": "Optional notes about this translation"
    },
    "pl": {
      "language": "Polish",
      "text": "Prayer text in Polish",
      "notes": "Optional notes about this translation"
    }
  }
}
```

## Metadata Fields

- **id**: Unique identifier for the prayer (kebab-case)
- **title**: The common name of the prayer
- **primary_category**: Main theological focus (see Primary Categories above)
- **labels**: Array of classification labels (cannot be empty, must include primary_category)
- **importance**: Liturgical significance ("essential", "common")
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
- **Prayer references**: `{"type": "prayer-reference", "id": "hail-mary", "count": 3}`
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
- **optional** (optional): Whether this content part is optional (default: false)

### Speaker Roles in Liturgical Dialogue

Some prayers contain call-and-response elements typical of Catholic liturgy. The `speaker` attribute identifies who traditionally says each part:

- **Versicle (V.)**: The leader or celebrant calls out
- **Response (R.)**: The congregation or people respond

This preserves the liturgical structure while allowing flexible presentation.

**Example:**
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

## Language Codes

The project uses ISO 639-1 language codes:
- `la` - Latin (original liturgical language)
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `pl` - Polish

## Installation

### NPM Package

Install the prayer collection as an NPM package:

```bash
npm install @codexcommunion/prayer-collection
```

### Browser Compatibility

This library is **fully compatible with browsers** and modern bundlers (Webpack, Vite, Rollup, etc.). The library uses static data imports instead of filesystem operations, making it work seamlessly in both Node.js and browser environments.

### Direct Download

You can also download the JSON files directly from this repository and use them in your project.

## Usage

> **📋 Prayer Reference**: See [lib/prayer-index.json](lib/prayer-index.json) for current prayer IDs and available categories/labels.

### Node.js / JavaScript

```javascript
const prayerCollection = require('@codexcommunion/prayer-collection');

// Get all prayers (flat array)
const allPrayers = prayerCollection.getAllPrayers();
console.log(allPrayers.length); // 56

// Get all primary categories
const categories = prayerCollection.getPrimaryCategories();
console.log(categories); // ['marian', 'christological', 'liturgical', 'saints', 'penitential', 'creeds']

// Get all available labels
const labels = prayerCollection.getLabels();
console.log(labels); // ['core', 'essential', 'marian', 'daily', 'rosary', ...]

// Get prayers by primary category
const marianPrayers = prayerCollection.getPrayersByPrimaryCategory('marian');
console.log(marianPrayers.length); // 10

// Get prayers by label (flexible multi-classification)
const corePrayers = prayerCollection.getPrayersByLabel('core');
console.log(corePrayers.length); // 3 (Our Father, Hail Mary, Glory Be)

const dailyPrayers = prayerCollection.getPrayersByLabel('daily');
console.log(dailyPrayers.length); // Prayers suitable for daily recitation

// Get prayers by importance level
const essentialPrayers = prayerCollection.getPrayersByImportance('essential');
console.log(essentialPrayers.length); // Most important prayers

// Get a specific prayer
const ourFather = prayerCollection.getPrayerById('our-father');
console.log(ourFather.metadata.primary_category); // "christological"
console.log(ourFather.metadata.labels); // ["core", "essential", "christological", "daily", "rosary", "mass"]

// Get prayer text in a specific language
const prayerText = prayerCollection.getPrayerText('our-father', 'en');
console.log(prayerText); // "Our Father, who art in heaven..."

// Search prayers (now searches title, description, and text)
const results = prayerCollection.searchPrayers('Mary');
console.log(results.length); // Returns prayers containing "Mary"

// Get all prayers organized by category (if needed)
const prayersByCategory = prayerCollection.getAllPrayersByCategory();
console.log(Object.keys(prayersByCategory)); // All primary categories

// Get supported languages
const languages = prayerCollection.getSupportedLanguages();
console.log(languages); // ['la', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl']

// Legacy functions (deprecated but still work)
const legacyCategories = prayerCollection.getCategories(); // Same as getPrimaryCategories
```

### TypeScript

```typescript
import { 
  getPrayerById, 
  getPrayerText, 
  searchPrayers, 
  Prayer, 
  LanguageCode 
} from '@codexcommunion/prayer-collection';

// Type-safe usage
const prayer: Prayer | null = getPrayerById('hail-mary');
const text: string | null = getPrayerText('hail-mary', 'la');
const results = searchPrayers('holy', 'en');
```

### React Example

```jsx
import React, { useState, useEffect } from 'react';
import { getPrayersByLabel, getPrayerText } from '@codexcommunion/prayer-collection';

function PrayerApp() {
  const [prayers, setPrayers] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    // This works seamlessly in browser environments
    const corePrayers = getPrayersByLabel('core');
    setPrayers(corePrayers);
  }, []);

  return (
    <div>
      <h1>Catholic Prayers</h1>
      <select onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="la">Latin</option>
        <option value="es">Spanish</option>
      </select>
      
      {prayers.map(prayer => (
        <div key={prayer.metadata.id}>
          <h2>{prayer.metadata.title}</h2>
          <p>{getPrayerText(prayer.metadata.id, selectedLanguage)}</p>
        </div>
      ))}
    </div>
  );
}

export default PrayerApp;
```

> **🌐 Browser Note**: This library uses static data imports, making it fully compatible with React, Create React App, Next.js, and other modern bundlers without requiring special configuration.

### Vue.js Example

```vue
<template>
  <div>
    <h1>Catholic Prayers</h1>
    <select v-model="selectedLanguage">
      <option value="en">English</option>
      <option value="la">Latin</option>
      <option value="es">Spanish</option>
    </select>
    
    <div v-for="prayer in prayers" :key="prayer.metadata.id">
      <h2>{{ prayer.metadata.title }}</h2>
      <p>{{ getPrayerText(prayer.metadata.id, selectedLanguage) }}</p>
    </div>
  </div>
</template>

<script>
import { getPrayersByPrimaryCategory, getPrayerText } from '@codexcommunion/prayer-collection';

export default {
  name: 'PrayerApp',
  data() {
    return {
      prayers: [],
      selectedLanguage: 'en'
    };
  },
  mounted() {
    // Works perfectly in browser environments with Vue CLI, Vite, etc.
    this.prayers = getPrayersByPrimaryCategory('marian');
  },
  methods: {
    getPrayerText
  }
};
</script>
```

> **🌐 Browser Note**: This library is fully compatible with Vue.js, Vue CLI, Vite, and Nuxt.js without requiring special bundler configuration.

## API Reference

### Functions

#### `getAllPrayers(): Prayer[]`
Returns all prayers as a flat array.

#### `getPrimaryCategories(): string[]`
Returns an array of all primary category names.

#### `getLabels(): string[]`
Returns an array of all available labels.

#### `getPrayersByPrimaryCategory(category: PrimaryCategory): Prayer[]`
Returns all prayers with the specified primary category.

#### `getPrayersByLabel(label: Label): Prayer[]`
Returns all prayers that have the specified label.

#### `getPrayersByImportance(importance: ImportanceLevel): Prayer[]`
Returns all prayers with the specified importance level.

#### `getPrayerById(prayerId: string): Prayer | null`
Returns a specific prayer by its ID, or null if not found.

#### `getAllPrayersByCategory(): { [category: string]: Prayer[] }`
Returns all prayers organized by primary category.

#### `getPrayerText(prayerId: string, language?: string): string | null`
Returns the prayer text in the specified language (default: 'en').

#### `searchPrayers(searchTerm: string, language?: string): Prayer[]`
Searches for prayers containing the specified term in text, title, or description.

#### `getSupportedLanguages(): string[]`
Returns an array of supported language codes.

### Legacy Functions (Deprecated)

#### `getCategories(): string[]`
Returns primary categories. Use `getPrimaryCategories()` instead.

#### `getPrayersByCategory(category: string): Prayer[]`
Returns prayers by primary category. Use `getPrayersByPrimaryCategory()` instead.

### Types (TypeScript)

#### `Prayer`
```typescript
interface Prayer {
  metadata: PrayerMetadata;
  translations: { [languageCode: string]: PrayerTranslation };
}
```

#### `PrayerMetadata`
```typescript
interface PrayerMetadata {
  id: string;
  title: string;
  primary_category: PrimaryCategory;
  labels: Label[];
  importance: ImportanceLevel;
  type: string;
  description: string;
  origin: string;
  origin_date: string;
  usage: string;
  feast_days: string[];
  devotions: string[];
  created_date: string;
  last_modified: string;
}
```

#### `PrimaryCategory`
```typescript
type PrimaryCategory = 'marian' | 'christological' | 'saints' | 'penitential' | 'liturgical' | 'devotional' | 'creeds' | 'holy-spirit' | 'for-the-dead' | 'daily' | 'seasonal';
```

#### `Label`
```typescript
type Label = 'core' | 'essential' | 'common' | 'devotional' | 'daily' | 'rosary' | 'marian' | 'christological' | 'saints' | 'penitential' | 'liturgical' | 'creeds' | 'holy-spirit' | 'for-the-dead' | 'protection' | 'mass' | 'evening' | 'morning' | 'mercy' | 'chaplet' | 'angels' | 'seasonal' | 'advent' | 'christmas' | 'easter' | 'lent' | 'meals' | 'family' | 'contemplative' | 'eastern' | 'litany' | 'petition' | 'passion' | 'intercession' | 'peace' | 'franciscan' | 'anthony' | 'joseph' | 'jude' | 'patrick' | 'rita' | 'therese' | 'praise' | 'biblical' | 'eucharistic' | 'ancient' | 'virtues' | 'confession' | 'brief' | 'fatima';
```

#### `ImportanceLevel`
```typescript
type ImportanceLevel = 'essential' | 'common' | 'devotional';
```

#### `PrayerTranslation`
```typescript
interface PrayerTranslation {
  language: string;
  text?: string; // For simple prayers without references
  content?: ContentPart[]; // For prayers that reference other prayers
  notes?: string;
}
```

#### `ContentPart`
```typescript
interface ContentPart {
  type: 'instructions' | 'text' | 'prayer-reference';
  value: string; // For 'text'/'instructions': the text content; For 'prayer-reference': the prayer ID to reference
  count?: number; // Number of times to repeat this content part (default: 1)
  speaker?: 'versicle' | 'response' | 'both'; // Optional liturgical speaker role for dialogue prayers
  optional?: boolean; // Whether this content part is optional (default: false)
}
```

## Implementation Details

### Universal Compatibility Architecture

This library uses a **static data import approach** to ensure compatibility across all JavaScript environments:

- **Build Process**: During `npm run build`, all JSON files are pre-imported and compiled into a static JavaScript module (`lib/prayer-data.js`)
- **No Runtime File I/O**: The library doesn't use `fs.readFileSync()` or other Node.js filesystem operations at runtime
- **Bundler Friendly**: Works seamlessly with Webpack, Vite, Rollup, Parcel, and other modern bundlers
- **Tree Shaking**: Modern bundlers can optimize and tree-shake the static data as needed

### Build Pipeline

1. **`scripts/generate-static-data.js`**: Converts JSON files to JavaScript module
2. **`scripts/build.js`**: Validates prayer structure and generates metadata
3. **`scripts/validate.js`**: Comprehensive validation with error reporting
4. **`index.js`**: Main API that imports from static data module

### Performance Benefits

- **Faster Loading**: No dynamic file reads, everything is pre-bundled
- **Better Caching**: Static imports can be cached more effectively by bundlers
- **Smaller Bundle Size**: Only used prayers get included in final bundles (with tree shaking)

## Publishing

To publish a new version:

1. Update the version in `package.json`
2. Run the build and validation scripts:
   ```bash
   npm run build
   npm run validate
   npm test
   ```
3. Commit your changes
4. Create a git tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
5. Publish to NPM:
   ```bash
   npm publish
   ```
