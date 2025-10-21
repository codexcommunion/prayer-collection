# API Reference

Complete API documentation for the prayer-collection package.

> **📋 Prayer Reference**: See [lib/prayer-index.json](../lib/prayer-index.json) for current prayer IDs and available categories/labels.

## Functions

### Core Functions

#### `getAllPrayers(): Prayer[]`
Returns all prayers as a flat array.

```javascript
const allPrayers = prayerCollection.getAllPrayers();
console.log(allPrayers.length); // 56
```

#### `getPrayerById(prayerId: string): Prayer | null`
Returns a specific prayer by its ID, or null if not found.

```javascript
const ourFather = prayerCollection.getPrayerById('our-father');
console.log(ourFather.metadata.title); // "Our Father"
```

#### `getPrayerText(prayerId: string, language?: string): string | null`
Returns the prayer text in the specified language (default: 'en').

```javascript
const prayerText = prayerCollection.getPrayerText('our-father', 'en');
console.log(prayerText); // "Our Father, who art in heaven..."
```

### Category & Label Functions

#### `getPrimaryCategories(): string[]`
Returns an array of all primary category names.

```javascript
const categories = prayerCollection.getPrimaryCategories();
// ['penitential', 'seasonal', 'marian', 'christological', 'creeds', 'liturgical', 'devotional', 'holy-spirit', 'for-the-dead', 'daily', 'saints']
```

#### `getLabels(): string[]`
Returns an array of all available labels.

```javascript
const labels = prayerCollection.getLabels();
// ['core', 'essential', 'marian', 'daily', 'rosary', ...]
```

#### `getPrayersByPrimaryCategory(category: PrimaryCategory): Prayer[]`
Returns all prayers with the specified primary category.

```javascript
const marianPrayers = prayerCollection.getPrayersByPrimaryCategory('marian');
console.log(marianPrayers.length); // 10
```

#### `getPrayersByLabel(label: Label): Prayer[]`
Returns all prayers that have the specified label.

```javascript
const corePrayers = prayerCollection.getPrayersByLabel('core');
console.log(corePrayers.length); // 4

const dailyPrayers = prayerCollection.getPrayersByLabel('daily');
console.log(dailyPrayers.length); // 9
```

#### `getPrayersByImportance(importance: ImportanceLevel): Prayer[]`
Returns all prayers with the specified importance level.

```javascript
const essentialPrayers = prayerCollection.getPrayersByImportance('essential');
console.log(essentialPrayers.length); // 10
```

#### `getAllPrayersByCategory(): { [category: string]: Prayer[] }`
Returns all prayers organized by primary category.

```javascript
const prayersByCategory = prayerCollection.getAllPrayersByCategory();
console.log(Object.keys(prayersByCategory)); // All primary categories
```

### Search & Utility Functions

#### `searchPrayers(searchTerm: string, language?: string): Prayer[]`
Searches for prayers containing the specified term in text, title, or description.

```javascript
const results = prayerCollection.searchPrayers('Mary');
console.log(results.length); // Returns prayers containing "Mary"
```

#### `getSupportedLanguages(): string[]`
Returns an array of supported language codes.

```javascript
const languages = prayerCollection.getSupportedLanguages();
console.log(languages); // ['la', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl']
```

### Legacy Functions (Deprecated)

#### `getCategories(): string[]`
Returns primary categories. **Use `getPrimaryCategories()` instead.**

#### `getPrayersByCategory(category: string): Prayer[]`
Returns prayers by primary category. **Use `getPrayersByPrimaryCategory()` instead.**

## TypeScript Types

### Prayer

```typescript
interface Prayer {
  metadata: PrayerMetadata;
  translations: { [languageCode: string]: PrayerTranslation };
}
```

### PrayerMetadata

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

### PrimaryCategory

```typescript
type PrimaryCategory = 
  | 'marian' 
  | 'christological' 
  | 'saints' 
  | 'penitential' 
  | 'liturgical' 
  | 'devotional' 
  | 'creeds' 
  | 'holy-spirit' 
  | 'for-the-dead' 
  | 'daily' 
  | 'seasonal';
```

### Label

```typescript
type Label = 
  | 'core' 
  | 'essential' 
  | 'common' 
  | 'devotional' 
  | 'daily' 
  | 'rosary' 
  | 'marian' 
  | 'christological' 
  | 'saints' 
  | 'penitential' 
  | 'liturgical' 
  | 'creeds' 
  | 'holy-spirit' 
  | 'for-the-dead' 
  | 'protection' 
  | 'mass' 
  | 'evening' 
  | 'morning' 
  | 'mercy' 
  | 'chaplet' 
  | 'angels' 
  | 'seasonal' 
  | 'advent' 
  | 'christmas' 
  | 'easter' 
  | 'lent' 
  | 'meals' 
  | 'family' 
  | 'contemplative' 
  | 'eastern' 
  | 'litany' 
  | 'petition' 
  | 'passion' 
  | 'intercession' 
  | 'peace' 
  | 'franciscan' 
  | 'anthony' 
  | 'joseph' 
  | 'jude' 
  | 'patrick' 
  | 'rita' 
  | 'therese' 
  | 'praise' 
  | 'biblical' 
  | 'eucharistic' 
  | 'ancient' 
  | 'virtues' 
  | 'confession' 
  | 'brief' 
  | 'fatima';
```

### ImportanceLevel

```typescript
type ImportanceLevel = 'essential' | 'common' | 'devotional';
```

### PrayerTranslation

```typescript
interface PrayerTranslation {
  language: string;
  text?: string; // For simple prayers without references
  content?: ContentPart[]; // For prayers that reference other prayers
  notes?: string;
}
```

### ContentPart

```typescript
interface ContentPart {
  type: 'instructions' | 'text' | 'prayer-reference';
  value: string; // For 'text'/'instructions': the text content; For 'prayer-reference': the prayer ID to reference
  count?: number; // Number of times to repeat this content part (default: 1)
  speaker?: 'versicle' | 'response' | 'both'; // Optional liturgical speaker role for dialogue prayers
  optional?: boolean; // Whether this content part is optional (default: false)
}
```

### LanguageCode

```typescript
type LanguageCode = 'la' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'pl';
```
