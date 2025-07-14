# Prayer Collection

A comprehensive collection of traditional Roman Catholic prayers in multiple languages, organized as structured JSON files.

## Project Overview

This project provides a standardized collection of the most important prayers from the Roman Catholic tradition. Each prayer is stored as a separate JSON file with metadata and multilingual translations to support internationalization (i18n) efforts.

## Directory Structure

```
prayer-collection/
├── README.md
└── prayers/
    ├── core/
    │   ├── our-father.json
    │   ├── hail-mary.json
    │   ├── glory-be.json
    │   └── sign-of-the-cross.json (TODO)
    ├── creeds/
    │   ├── apostles-creed.json
    │   └── nicene-creed.json (TODO)
    ├── marian/
    │   ├── angelus.json
    │   ├── memorare.json
    │   ├── hail-holy-queen.json
    │   ├── regina-caeli.json (TODO)
    │   ├── alma-redemptoris-mater.json (TODO)
    │   ├── ave-regina-caelorum.json (TODO)
    │   ├── sub-tuum-praesidium.json (TODO)
    │   └── litany-of-loreto.json (TODO)
    ├── christological/
    │   ├── anima-christi.json (TODO)
    │   ├── prayer-before-crucifix.json (TODO)
    │   ├── jesus-prayer.json (TODO)
    │   └── litany-of-the-sacred-heart.json (TODO)
    ├── holy-spirit/
    │   ├── veni-creator-spiritus.json (TODO)
    │   └── come-holy-spirit.json (TODO)
    ├── saints/
    │   ├── st-michael-prayer.json
    │   ├── prayer-to-st-joseph.json (TODO)
    │   └── prayer-to-guardian-angel.json (TODO)
    ├── penitential/
    │   ├── act-of-contrition.json
    │   ├── act-of-faith.json (TODO)
    │   ├── act-of-hope.json (TODO)
    │   └── act-of-love.json (TODO)
    ├── daily/
    │   ├── morning-offering.json (TODO)
    │   └── evening-prayer.json (TODO)
    ├── liturgical/
    │   ├── te-deum.json (TODO)
    │   ├── magnificat.json (TODO)
    │   ├── canticle-of-zechariah.json (TODO)
    │   └── canticle-of-simeon.json (TODO)
    ├── devotional/
    │   └── divine-mercy-chaplet.json (TODO)
    └── for-the-dead/
        ├── prayer-for-the-dead.json (TODO)
        └── eternal-rest.json (TODO)
```

## Prayer Categories

### **Core Prayers (`core/`)**
The most fundamental prayers every Catholic should know:
- **Our Father** - The Lord's Prayer taught by Jesus Christ ✅
- **Hail Mary** - Central Marian prayer combining biblical and traditional elements ✅
- **Glory Be** - Trinitarian doxology of praise ✅
- **Sign of the Cross** - Fundamental Christian prayer and blessing

### **Creeds (`creeds/`)**
Statements of Christian faith:
- **Apostles' Creed** - Statement of Christian faith ✅
- **Nicene Creed** - More detailed statement of faith from the Councils of Nicaea and Constantinople

### **Marian Prayers (`marian/`)**
Prayers dedicated to the Blessed Virgin Mary:
- **Angelus** - Marian devotion with versicles and responses ✅
- **Memorare** - Prayer of confident petition to Mary ✅
- **Hail Holy Queen** - Marian antiphon (Salve Regina) ✅
- **Regina Caeli** - Easter season antiphon to Mary
- **Alma Redemptoris Mater** - Advent/Christmas season Marian antiphon
- **Ave Regina Caelorum** - Lenten season Marian antiphon
- **Sub Tuum Praesidium** - Ancient prayer seeking Mary's protection
- **Litany of Loreto** - Traditional litany of invocations to Mary

### **Christological Prayers (`christological/`)**
Prayers focused on Jesus Christ:
- **Anima Christi** - Prayer for spiritual communion with Christ
- **Prayer Before Crucifix** - Meditation before the cross of Christ
- **Jesus Prayer** - Eastern Christian prayer of the heart
- **Litany of the Sacred Heart** - Devotional prayer to the Sacred Heart of Jesus

### **Holy Spirit Prayers (`holy-spirit/`)**
Prayers to the Third Person of the Trinity:
- **Veni Creator Spiritus** - Ancient hymn invoking the Holy Spirit
- **Come Holy Spirit** - Prayer for the gifts of the Holy Spirit

### **Prayers to Saints (`saints/`)**
Intercession through the communion of saints:
- **St. Michael Prayer** - Protection prayer against evil ✅
- **Prayer to St. Joseph** - Prayer to the patron of the universal Church
- **Prayer to Guardian Angel** - Prayer for angelic protection and guidance

### **Penitential Prayers (`penitential/`)**
Prayers expressing sorrow for sin and acts of virtue:
- **Act of Contrition** - Penitential prayer expressing sorrow for sin ✅
- **Act of Faith** - Expression of belief in God and divine truth
- **Act of Hope** - Expression of trust in God's promises
- **Act of Love** - Expression of love for God and neighbor

### **Daily Prayers (`daily/`)**
Prayers for sanctifying the day:
- **Morning Offering** - Consecration of the day to God
- **Evening Prayer** - Prayer of gratitude and examination at day's end

### **Liturgical Prayers (`liturgical/`)**
Prayers from the Church's official worship:
- **Te Deum** - Ancient hymn of praise
- **Magnificat** - Canticle of Mary (Luke 1:46-55)
- **Canticle of Zechariah** - Benedictus (Luke 1:68-79)
- **Canticle of Simeon** - Nunc Dimittis (Luke 2:29-32)

### **Devotional Prayers (`devotional/`)**
Prayers from approved private devotions:
- **Divine Mercy Chaplet** - Prayer based on the revelations to St. Faustina

### **Prayers for the Dead (`for-the-dead/`)**
Intercession for souls in purgatory:
- **Prayer for the Dead** - Intercession for souls in purgatory
- **Eternal Rest** - Prayer for the repose of souls

## Prayer JSON Structure

Each prayer JSON file follows this standardized structure:

```json
{
  "metadata": {
    "id": "unique-prayer-identifier",
    "title": "Prayer Title",
    "category": "prayer-category",
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
      "text": "Prayer text in Latin",
      "notes": "Optional notes about this translation"
    },
    "en": {
      "language": "English",
      "text": "Prayer text in English",
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
- **category**: Type of prayer (e.g., "marian", "christological", "petition", "praise")
- **type**: Specific prayer type (e.g., "devotional", "liturgical", "scriptural")
- **description**: Brief explanation of the prayer's purpose
- **origin**: Historical background or source
- **origin_date**: Earliest known date or century of origin in ISO 8601 format. Use ranges for uncertain dates (e.g., "0030/0033", "1050/1150") or approximate dates with "~" prefix (e.g., "~0200", "~1200")
- **usage**: Context in which the prayer is typically used
- **feast_days**: Associated liturgical celebrations
- **devotions**: Related devotional practices (e.g., "rosary", "divine-mercy")
- **created_date**: Date the JSON file was created
- **last_modified**: Date the JSON file was last updated

## Translation Fields

- **language**: Full name of the language
- **text**: The prayer text in that language
- **notes**: Optional field for translation notes, historical context, or variations

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

### Direct Download

You can also download the JSON files directly from this repository and use them in your project.

## Usage

### Node.js / JavaScript

```javascript
const prayerCollection = require('@codexcommunion/prayer-collection');

// Get all available categories
const categories = prayerCollection.getCategories();
console.log(categories); // ['core', 'creeds', 'marian', 'saints', ...]

// Get all prayers in a category
const corePrayers = prayerCollection.getPrayersByCategory('core');
console.log(corePrayers.length); // 3

// Get a specific prayer
const ourFather = prayerCollection.getPrayerById('our-father');
console.log(ourFather.metadata.title); // "Our Father"

// Get prayer text in a specific language
const prayerText = prayerCollection.getPrayerText('our-father', 'en');
console.log(prayerText); // "Our Father, who art in heaven..."

// Search prayers
const results = prayerCollection.searchPrayers('Mary');
console.log(results.length); // Returns prayers containing "Mary"

// Get all prayers
const allPrayers = prayerCollection.getAllPrayers();
console.log(Object.keys(allPrayers)); // All categories

// Get supported languages
const languages = prayerCollection.getSupportedLanguages();
console.log(languages); // ['la', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl']
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
import { getPrayersByCategory, getPrayerText } from '@codexcommunion/prayer-collection';

function PrayerApp() {
  const [prayers, setPrayers] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const corePrayers = getPrayersByCategory('core');
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
```

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
import { getPrayersByCategory, getPrayerText } from '@codexcommunion/prayer-collection';

export default {
  data() {
    return {
      prayers: [],
      selectedLanguage: 'en'
    };
  },
  mounted() {
    this.prayers = getPrayersByCategory('marian');
  },
  methods: {
    getPrayerText
  }
};
</script>
```

## API Reference

### Functions

#### `getCategories(): string[]`
Returns an array of all available prayer categories.

#### `getPrayersByCategory(category: string): Prayer[]`
Returns all prayers in the specified category.

#### `getPrayerById(prayerId: string): Prayer | null`
Returns a specific prayer by its ID, or null if not found.

#### `getAllPrayers(): { [category: string]: Prayer[] }`
Returns all prayers organized by category.

#### `getPrayerText(prayerId: string, language?: string): string | null`
Returns the prayer text in the specified language (default: 'en').

#### `searchPrayers(searchTerm: string, language?: string): Prayer[]`
Searches for prayers containing the specified term.

#### `getSupportedLanguages(): string[]`
Returns an array of supported language codes.

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
  category: string;
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

#### `PrayerTranslation`
```typescript
interface PrayerTranslation {
  language: string;
  text: string;
  notes?: string;
}
```

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
