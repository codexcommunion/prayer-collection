// Import static prayer data for universal compatibility (Node.js + browser)
const {
  ALL_PRAYERS,
  PRIMARY_CATEGORIES,
  ALL_LABELS,
  SUPPORTED_LANGUAGES,
  PRAYERS_BY_CATEGORY,
  PRAYERS_BY_LABEL,
  PRAYERS_BY_IMPORTANCE,
  PRAYERS
} = require('./lib/prayer-data');

/**
 * Prayer Collection - A comprehensive collection of traditional Roman Catholic prayers
 * @module prayer-collection
 */

/**
 * Get all prayers from static data
 * @returns {Object[]} Array of all prayer objects
 */
function getAllPrayers() {
  return [...ALL_PRAYERS]; // Return a copy to prevent mutations
}

/**
 * Get all available primary categories
 * @returns {string[]} Array of primary category names
 */
function getPrimaryCategories() {
  return [...PRIMARY_CATEGORIES]; // Return a copy to prevent mutations
}

/**
 * Get all available labels
 * @returns {string[]} Array of label names
 */
function getLabels() {
  return [...ALL_LABELS]; // Return a copy to prevent mutations
}

/**
 * Get all available prayer categories (legacy function)
 * @returns {string[]} Array of category names
 * @deprecated Use getPrimaryCategories instead
 */
function getCategories() {
  return getPrimaryCategories();
}

/**
 * Get prayers by primary category
 * @param {string} category - The primary category name (e.g., 'marian', 'christological', 'saints')
 * @returns {Object[]} Array of prayer objects
 */
function getPrayersByPrimaryCategory(category) {
  return PRAYERS_BY_CATEGORY[category] ? [...PRAYERS_BY_CATEGORY[category]] : [];
}

/**
 * Get prayers by label (can include prayers from multiple primary categories)
 * @param {string} label - The label to filter by (e.g., 'core', 'essential', 'daily')
 * @returns {Object[]} Array of prayer objects
 */
function getPrayersByLabel(label) {
  return PRAYERS_BY_LABEL[label] ? [...PRAYERS_BY_LABEL[label]] : [];
}

/**
 * Get prayers by importance level
 * @param {string} importance - The importance level ('essential', 'common', 'devotional')
 * @returns {Object[]} Array of prayer objects
 */
function getPrayersByImportance(importance) {
  return PRAYERS_BY_IMPORTANCE[importance] ? [...PRAYERS_BY_IMPORTANCE[importance]] : [];
}

/**
 * Get all prayers in a specific category (legacy function - searches primary_category)
 * @param {string} category - The category name
 * @returns {Object[]} Array of prayer objects
 * @deprecated Use getPrayersByPrimaryCategory instead
 */
function getPrayersByCategory(category) {
  return getPrayersByPrimaryCategory(category);
}

/**
 * Get a specific prayer by ID
 * @param {string} prayerId - The prayer ID (e.g., 'our-father', 'hail-mary')
 * @returns {Object|null} Prayer object or null if not found
 */
function getPrayerById(prayerId) {
  return PRAYERS[prayerId] ? { ...PRAYERS[prayerId] } : null; // Return a copy to prevent mutations
}

/**
 * Get all prayers organized by primary category
 * @returns {Object} Object with primary categories as keys and arrays of prayers as values
 */
function getAllPrayersByCategory() {
  // Return a deep copy to prevent mutations
  const result = {};
  Object.keys(PRAYERS_BY_CATEGORY).forEach(category => {
    result[category] = [...PRAYERS_BY_CATEGORY[category]];
  });
  return result;
}

/**
 * Get prayer text in a specific language
 * @param {string} prayerId - The prayer ID
 * @param {string} language - Language code (e.g., 'en', 'la', 'es')
 * @param {boolean} skipOptional - Whether to skip optional content parts (default: false)
 * @returns {string|null} Prayer text or null if not found
 */
function getPrayerText(prayerId, language = 'en', skipOptional = false) {
  const prayer = getPrayerById(prayerId);
  
  if (!prayer || !prayer.translations || !prayer.translations[language]) {
    return null;
  }
  
  const translation = prayer.translations[language];
  
  // If it has content array, assemble the text
  if (translation.content) {
    return translation.content.map(part => {
      // Skip optional content parts if requested
      if (skipOptional && part.optional) return '';
      
      const count = part.count || 1;
      
      if (part.type === 'text') {
        const text = part.value || '';
        return Array(count).fill(text).join('\n\n');
      } else if (part.type === 'instructions') {
        // Include instructions with formatting to distinguish them
        const instruction = `[${part.value}]`;
        return Array(count).fill(instruction).join('\n\n');
      } else if (part.type === 'prayer-reference') {
        const referencedPrayer = getPrayerById(part.value);
        if (!referencedPrayer) return `[Prayer ${part.value} not found]`;
        
        const referencedText = getPrayerText(part.value, language, true); // Skip optional parts in references
        if (!referencedText) return `[Prayer ${part.value} has no text in ${language}]`;
        
        return Array(count).fill(referencedText).join('\n\n');
      }
      return '';
    }).filter(text => text !== '').join('\n\n');
  }
  
  // Fallback to direct text
  return translation.text || null;
}

/**
 * Search prayers by text content
 * @param {string} searchTerm - Term to search for
 * @param {string} language - Language to search in (default: 'en')
 * @returns {Object[]} Array of matching prayers
 */
function searchPrayers(searchTerm, language = 'en') {
  const prayers = getAllPrayers();
  
  return prayers.filter(prayer => {
    const translation = prayer.translations[language];
    if (!translation) return false;
    
    // Get the assembled text
    const fullText = getPrayerText(prayer.metadata.id, language);
    if (fullText && fullText.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    
    // Also search in prayer title and description
    const metadata = prayer.metadata;
    return metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           metadata.description.toLowerCase().includes(searchTerm.toLowerCase());
  });
}

/**
 * Get supported languages
 * @returns {string[]} Array of supported language codes
 */
function getSupportedLanguages() {
  return [...SUPPORTED_LANGUAGES]; // Return a copy to prevent mutations
}

module.exports = {
  // New flat structure functions
  getAllPrayers,
  getPrimaryCategories,
  getLabels,
  getPrayersByPrimaryCategory,
  getPrayersByLabel,
  getPrayersByImportance,
  getAllPrayersByCategory,
  
  // Core functions
  getPrayerById,
  getPrayerText,
  searchPrayers,
  getSupportedLanguages,
  
  // Legacy functions (deprecated)
  getCategories,
  getPrayersByCategory
};
