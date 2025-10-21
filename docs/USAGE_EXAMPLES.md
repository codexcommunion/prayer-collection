# Usage Examples

Code examples demonstrating how to use the prayer-collection package in various frameworks and environments.

> **📋 Prayer Reference**: See [lib/prayer-index.json](../lib/prayer-index.json) for current prayer IDs and available categories/labels.

## Table of Contents

- [Node.js / JavaScript](#nodejs--javascript)
- [TypeScript](#typescript)
- [React](#react)
- [Vue.js](#vuejs)

## Node.js / JavaScript

### Basic Usage

```javascript
const prayerCollection = require('@codexcommunion/prayer-collection');

// Get all prayers (flat array)
const allPrayers = prayerCollection.getAllPrayers();
console.log(allPrayers.length); // 56

// Get all primary categories
const categories = prayerCollection.getPrimaryCategories();
console.log(categories); 
// ['penitential', 'seasonal', 'marian', 'christological', 'creeds', 
//  'liturgical', 'devotional', 'holy-spirit', 'for-the-dead', 'daily', 'saints']

// Get all available labels
const labels = prayerCollection.getLabels();
console.log(labels); 
// ['core', 'essential', 'marian', 'daily', 'rosary', ...]
```

### Filtering Prayers

```javascript
// Get prayers by primary category
const marianPrayers = prayerCollection.getPrayersByPrimaryCategory('marian');
console.log(marianPrayers.length); // 10

// Get prayers by label (flexible multi-classification)
const corePrayers = prayerCollection.getPrayersByLabel('core');
console.log(corePrayers.length); // 4 (Our Father, Hail Mary, Glory Be, Sign of the Cross)

const dailyPrayers = prayerCollection.getPrayersByLabel('daily');
console.log(dailyPrayers.length); // 9

// Get prayers by importance level
const essentialPrayers = prayerCollection.getPrayersByImportance('essential');
console.log(essentialPrayers.length); // 10
```

### Working with Individual Prayers

```javascript
// Get a specific prayer
const ourFather = prayerCollection.getPrayerById('our-father');
console.log(ourFather.metadata.primary_category); // "christological"
console.log(ourFather.metadata.labels); 
// ["core", "essential", "christological", "daily", "rosary", "mass"]

// Get prayer text in a specific language
const prayerText = prayerCollection.getPrayerText('our-father', 'en');
console.log(prayerText); // "Our Father, who art in heaven..."

// Search prayers (searches title, description, and text)
const results = prayerCollection.searchPrayers('Mary');
console.log(results.length); // Returns prayers containing "Mary"
```

### Organizing Prayers

```javascript
// Get all prayers organized by category
const prayersByCategory = prayerCollection.getAllPrayersByCategory();
console.log(Object.keys(prayersByCategory)); // All primary categories

// Get supported languages
const languages = prayerCollection.getSupportedLanguages();
console.log(languages); // ['la', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl']
```

## TypeScript

### Type-Safe Usage

```typescript
import { 
  getPrayerById, 
  getPrayerText, 
  searchPrayers,
  getPrayersByLabel,
  Prayer, 
  LanguageCode,
  Label,
  PrimaryCategory
} from '@codexcommunion/prayer-collection';

// Type-safe prayer retrieval
const prayer: Prayer | null = getPrayerById('hail-mary');
if (prayer) {
  console.log(prayer.metadata.title);
  console.log(prayer.metadata.primary_category);
  console.log(prayer.metadata.labels);
}

// Type-safe text retrieval
const text: string | null = getPrayerText('hail-mary', 'la');

// Type-safe search
const results: Prayer[] = searchPrayers('holy', 'en');

// Using typed constants
const language: LanguageCode = 'en';
const label: Label = 'rosary';
const category: PrimaryCategory = 'marian';

const rosaryPrayers = getPrayersByLabel(label);
```

### Building a Prayer Service

```typescript
import { 
  Prayer, 
  getPrayerById, 
  getPrayersByLabel,
  getPrayerText,
  LanguageCode 
} from '@codexcommunion/prayer-collection';

class PrayerService {
  getCorePrayers(): Prayer[] {
    return getPrayersByLabel('core');
  }

  getPrayerInLanguage(prayerId: string, language: LanguageCode): string | null {
    return getPrayerText(prayerId, language);
  }

  formatPrayerForDisplay(prayerId: string, language: LanguageCode = 'en'): string {
    const prayer = getPrayerById(prayerId);
    const text = getPrayerText(prayerId, language);
    
    if (!prayer || !text) {
      return 'Prayer not found';
    }

    return `
      ${prayer.metadata.title}
      ${'-'.repeat(prayer.metadata.title.length)}
      
      ${text}
      
      Origin: ${prayer.metadata.origin}
      Usage: ${prayer.metadata.usage}
    `;
  }
}

const service = new PrayerService();
console.log(service.formatPrayerForDisplay('our-father', 'en'));
```

## React

### Basic React Component

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

### React with TypeScript

```tsx
import React, { useState, useEffect } from 'react';
import { 
  Prayer, 
  getPrayersByPrimaryCategory, 
  getPrayerText,
  LanguageCode,
  PrimaryCategory 
} from '@codexcommunion/prayer-collection';

interface PrayerListProps {
  category: PrimaryCategory;
  defaultLanguage?: LanguageCode;
}

const PrayerList: React.FC<PrayerListProps> = ({ 
  category, 
  defaultLanguage = 'en' 
}) => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    const categoryPrayers = getPrayersByPrimaryCategory(category);
    setPrayers(categoryPrayers);
  }, [category]);

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Prayers</h1>
      
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
      >
        <option value="en">English</option>
        <option value="la">Latin</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>

      <div className="prayer-list">
        {prayers.map(prayer => (
          <article key={prayer.metadata.id}>
            <h2>{prayer.metadata.title}</h2>
            <p className="prayer-text">
              {getPrayerText(prayer.metadata.id, language)}
            </p>
            <footer>
              <small>{prayer.metadata.description}</small>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PrayerList;
```

### React Hooks Example

```tsx
import { useState, useEffect, useMemo } from 'react';
import { 
  Prayer, 
  getAllPrayers, 
  getPrayerText, 
  searchPrayers,
  LanguageCode 
} from '@codexcommunion/prayer-collection';

// Custom hook for prayer management
function usePrayers(searchTerm: string = '') {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const results = searchTerm 
      ? searchPrayers(searchTerm) 
      : getAllPrayers();
    setPrayers(results);
    setLoading(false);
  }, [searchTerm]);

  return { prayers, loading };
}

// Custom hook for prayer text
function usePrayerText(prayerId: string, language: LanguageCode = 'en') {
  return useMemo(() => {
    return getPrayerText(prayerId, language);
  }, [prayerId, language]);
}

// Component using the hooks
function SearchablePrayerList() {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const { prayers, loading } = usePrayers(search);

  if (loading) return <div>Loading prayers...</div>;

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search prayers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <select value={language} onChange={(e) => setLanguage(e.target.value as LanguageCode)}>
        <option value="en">English</option>
        <option value="la">Latin</option>
      </select>

      {prayers.map(prayer => (
        <PrayerCard 
          key={prayer.metadata.id} 
          prayer={prayer} 
          language={language} 
        />
      ))}
    </div>
  );
}

function PrayerCard({ prayer, language }: { prayer: Prayer; language: LanguageCode }) {
  const text = usePrayerText(prayer.metadata.id, language);
  
  return (
    <div className="prayer-card">
      <h3>{prayer.metadata.title}</h3>
      <p>{text}</p>
      <div className="tags">
        {prayer.metadata.labels.map(label => (
          <span key={label} className="tag">{label}</span>
        ))}
      </div>
    </div>
  );
}
```

## Vue.js

### Vue 3 Composition API

```vue
<template>
  <div>
    <h1>Catholic Prayers</h1>
    
    <select v-model="selectedLanguage">
      <option value="en">English</option>
      <option value="la">Latin</option>
      <option value="es">Spanish</option>
    </select>
    
    <div v-for="prayer in prayers" :key="prayer.metadata.id" class="prayer">
      <h2>{{ prayer.metadata.title }}</h2>
      <p>{{ getPrayerText(prayer.metadata.id, selectedLanguage) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPrayersByPrimaryCategory, getPrayerText } from '@codexcommunion/prayer-collection';

const prayers = ref([]);
const selectedLanguage = ref('en');

onMounted(() => {
  prayers.value = getPrayersByPrimaryCategory('marian');
});
</script>

<style scoped>
.prayer {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
```

> **🌐 Browser Note**: This library is fully compatible with Vue.js, Vue CLI, Vite, and Nuxt.js without requiring special bundler configuration.

### Vue 3 Options API

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

### Vue 3 with TypeScript

```vue
<template>
  <div>
    <h1>{{ category }} Prayers</h1>
    
    <select v-model="language">
      <option v-for="lang in languages" :key="lang" :value="lang">
        {{ getLanguageName(lang) }}
      </option>
    </select>

    <div v-for="prayer in prayers" :key="prayer.metadata.id">
      <h2>{{ prayer.metadata.title }}</h2>
      <p>{{ getPrayerTextForLanguage(prayer.metadata.id) }}</p>
      <div class="labels">
        <span v-for="label in prayer.metadata.labels" :key="label" class="label">
          {{ label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  Prayer,
  PrimaryCategory,
  LanguageCode,
  getPrayersByPrimaryCategory, 
  getPrayerText,
  getSupportedLanguages 
} from '@codexcommunion/prayer-collection';

interface Props {
  category: PrimaryCategory;
}

const props = defineProps<Props>();

const prayers = ref<Prayer[]>([]);
const language = ref<LanguageCode>('en');
const languages = ref<LanguageCode[]>([]);

onMounted(() => {
  prayers.value = getPrayersByPrimaryCategory(props.category);
  languages.value = getSupportedLanguages() as LanguageCode[];
});

const getPrayerTextForLanguage = (prayerId: string): string | null => {
  return getPrayerText(prayerId, language.value);
};

const getLanguageName = (code: LanguageCode): string => {
  const names: Record<LanguageCode, string> = {
    la: 'Latin',
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    pl: 'Polish'
  };
  return names[code] || code;
};
</script>
```
