/**
 * Primary theological categories for prayers
 */
export type PrimaryCategory = 'marian' | 'christological' | 'saints' | 'penitential' | 'liturgical' | 'devotional' | 'creeds' | 'holy-spirit' | 'for-the-dead';

/**
 * Classification labels for prayers (can have multiple)
 */
export type Label = 'core' | 'essential' | 'common' | 'devotional' | 'daily' | 'rosary' | 'marian' | 'christological' | 'saints' | 'penitential' | 'liturgical' | 'creeds' | 'holy-spirit' | 'for-the-dead' | 'protection' | 'mass' | 'evening' | 'morning';

/**
 * Liturgical importance levels
 */
export type ImportanceLevel = 'essential' | 'common' | 'devotional';

/**
 * Prayer metadata interface
 */
export interface PrayerMetadata {
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

/**
 * Prayer translation interface
 */
export interface PrayerTranslation {
  language: string;
  text?: string; // For simple prayers without references
  content?: ContentPart[]; // For prayers that reference other prayers
  notes?: string;
}

/**
 * Content part for prayer translations
 */
export interface ContentPart {
  type: 'instructions' | 'text' | 'prayer-reference';
  value: string; // For 'text'/'instructions': the text content; For 'prayer-reference': the prayer ID to reference
  count?: number; // Number of times to repeat this content part (default: 1)
  speaker?: 'versicle' | 'response' | 'both'; // Optional liturgical speaker role for dialogue prayers
  optional?: boolean; // Whether this content part is optional (default: false)
}

/**
 * Prayer interface
 */
export interface Prayer {
  metadata: PrayerMetadata;
  translations: {
    [languageCode: string]: PrayerTranslation;
  };
}



/**
 * Language codes supported by the prayer collection
 */
export type LanguageCode = 'la' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'pl';

/**
 * Get all available primary categories
 */
export function getPrimaryCategories(): PrimaryCategory[];

/**
 * Get all available labels
 */
export function getLabels(): Label[];

/**
 * Get prayers by primary category
 * @param category - The primary category name
 */
export function getPrayersByPrimaryCategory(category: PrimaryCategory): Prayer[];

/**
 * Get prayers by label (can include prayers from multiple primary categories)
 * @param label - The label to filter by
 */
export function getPrayersByLabel(label: Label): Prayer[];

/**
 * Get prayers by importance level
 * @param importance - The importance level
 */
export function getPrayersByImportance(importance: ImportanceLevel): Prayer[];

/**
 * Get all prayers in a specific category (legacy function - searches primary_category)
 * @param category - The category name
 * @deprecated Use getPrayersByPrimaryCategory instead
 */
export function getPrayersByCategory(category: string): Prayer[];

/**
 * Get a specific prayer by ID
 * @param prayerId - The prayer ID
 */
export function getPrayerById(prayerId: string): Prayer | null;

/**
 * Get all prayers as a flat array
 */
export function getAllPrayers(): Prayer[];

/**
 * Get all prayers organized by primary category
 */
export function getAllPrayersByCategory(): { [category in PrimaryCategory]: Prayer[] };

/**
 * Get prayer text in a specific language
 * @param prayerId - The prayer ID
 * @param language - Language code (default: 'en')
 */
export function getPrayerText(prayerId: string, language?: LanguageCode): string | null;

/**
 * Search prayers by text content
 * @param searchTerm - Term to search for
 * @param language - Language to search in (default: 'en')
 */
export function searchPrayers(searchTerm: string, language?: LanguageCode): Prayer[];

/**
 * Get supported languages
 */
export function getSupportedLanguages(): LanguageCode[];
