# Usage Examples

Quick-start code examples for common use cases. For complete API documentation, see [index.d.ts](../index.d.ts) (TypeScript types) and [index.js](../index.js) (implementation).

> **💡 Self-Documenting Code**: The examples below demonstrate basic patterns. For real-world usage:
> - Explore prayer data: `node -p "require('@codexcommunion/prayer-collection').getAllPrayers().map(p => p.metadata.id)"`
> - Check available functions: See [index.d.ts](../index.d.ts) or use TypeScript autocomplete
> - Test with real data: Run `node` and `require('@codexcommunion/prayer-collection')` to experiment interactively

## Quick Start

### Node.js / JavaScript

```javascript
const pc = require('@codexcommunion/prayer-collection');

// Discover what's available
console.log(pc.getAllPrayers().length);
console.log(pc.getPrimaryCategories());
console.log(pc.getLabels());

// Get specific prayers
const prayer = pc.getPrayerById('our-father');
const text = pc.getPrayerText('hail-mary', 'en');

// Filter by classification
const marianPrayers = pc.getPrayersByPrimaryCategory('marian');
const corePrayers = pc.getPrayersByLabel('core');
const essentialPrayers = pc.getPrayersByImportance('essential');

// Search
const results = pc.searchPrayers('Mary', 'en');
```

### TypeScript

```typescript
import { 
  getAllPrayers,
  getPrayerById, 
  getPrayerText,
  Prayer,
  LanguageCode 
} from '@codexcommunion/prayer-collection';

// Full type safety from index.d.ts
const prayer: Prayer | null = getPrayerById('hail-mary');
const text: string | null = getPrayerText('our-father', 'la');
const all: Prayer[] = getAllPrayers();
```

## Framework Integration

### React

```jsx
import { useState, useEffect } from 'react';
import { getPrayersByLabel, getPrayerText } from '@codexcommunion/prayer-collection';

function PrayerList() {
  const [prayers, setPrayers] = useState([]);
  
  useEffect(() => {
    setPrayers(getPrayersByLabel('rosary'));
  }, []);

  return (
    <div>
      {prayers.map(p => (
        <div key={p.metadata.id}>
          <h2>{p.metadata.title}</h2>
          <p>{getPrayerText(p.metadata.id, 'en')}</p>
        </div>
      ))}
    </div>
  );
}
```

### Vue 3

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { getPrayersByPrimaryCategory, getPrayerText } from '@codexcommunion/prayer-collection';

const prayers = ref([]);

onMounted(() => {
  prayers.value = getPrayersByPrimaryCategory('marian');
});
</script>

<template>
  <div v-for="prayer in prayers" :key="prayer.metadata.id">
    <h2>{{ prayer.metadata.title }}</h2>
    <p>{{ getPrayerText(prayer.metadata.id, 'en') }}</p>
  </div>
</template>
```

## Advanced Patterns

### Custom Prayer Service (TypeScript)

```typescript
import { Prayer, getPrayerById, getPrayerText, LanguageCode } from '@codexcommunion/prayer-collection';

class PrayerService {
  formatForDisplay(id: string, lang: LanguageCode = 'en'): string {
    const prayer = getPrayerById(id);
    const text = getPrayerText(id, lang);
    
    if (!prayer || !text) return 'Prayer not found';
    
    return `${prayer.metadata.title}\n${'='.repeat(50)}\n${text}`;
  }
}
```

### React Custom Hook

```typescript
import { useState, useEffect } from 'react';
import { Prayer, searchPrayers } from '@codexcommunion/prayer-collection';

function usePrayerSearch(query: string) {
  const [results, setResults] = useState<Prayer[]>([]);
  
  useEffect(() => {
    setResults(query ? searchPrayers(query) : []);
  }, [query]);
  
  return results;
}
```

## Interactive Exploration

Try these in your terminal or browser console:

```javascript
// Node.js REPL exploration
const pc = require('@codexcommunion/prayer-collection');
pc.getAllPrayers().filter(p => p.metadata.labels.includes('rosary'));
pc.getPrimaryCategories().map(cat => ({ 
  category: cat, 
  count: pc.getPrayersByPrimaryCategory(cat).length 
}));
```

```javascript
// Browser console (after importing)
import('@codexcommunion/prayer-collection').then(pc => {
  console.table(pc.getAllPrayers().map(p => ({
    id: p.metadata.id,
    category: p.metadata.primary_category,
    importance: p.metadata.importance
  })));
});
```

---

**📚 For Complete Documentation**:
- **API Functions**: [index.d.ts](../index.d.ts) - All function signatures with JSDoc
- **Data Structure**: [DATA_STRUCTURE.md](DATA_STRUCTURE.md) - JSON prayer format
- **Available Prayers**: [lib/prayer-index.json](../lib/prayer-index.json) - Current prayer IDs and metadata
