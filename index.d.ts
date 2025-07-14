/**
 * Prayer metadata interface
 */
export interface PrayerMetadata {
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

/**
 * Prayer translation interface
 */
export interface PrayerTranslation {
  language: string;
  text: string;
  notes?: string;
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
 * Prayer with category interface (used in search results)
 */
export interface PrayerWithCategory extends Prayer {
  category: string;
}

/**
 * Language codes supported by the prayer collection
 */
export type LanguageCode = 'la' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'pl';

/**
 * Prayer categories
 */
export type PrayerCategory = 'core' | 'creeds' | 'marian' | 'christological' | 'holy-spirit' | 'saints' | 'penitential' | 'daily' | 'liturgical' | 'devotional' | 'for-the-dead';

/**
 * Get all available prayer categories
 */
export function getCategories(): string[];

/**
 * Get all prayers in a specific category
 * @param category - The category name
 */
export function getPrayersByCategory(category: string): Prayer[];

/**
 * Get a specific prayer by ID
 * @param prayerId - The prayer ID
 */
export function getPrayerById(prayerId: string): Prayer | null;

/**
 * Get all prayers from all categories
 */
export function getAllPrayers(): { [category: string]: Prayer[] };

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
export function searchPrayers(searchTerm: string, language?: LanguageCode): PrayerWithCategory[];

/**
 * Get supported languages
 */
export function getSupportedLanguages(): LanguageCode[];
