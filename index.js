const fs = require('fs');
const path = require('path');

/**
 * Prayer Collection - A comprehensive collection of traditional Roman Catholic prayers
 * @module prayer-collection
 */

/**
 * Get all available prayer categories
 * @returns {string[]} Array of category names
 */
function getCategories() {
  const prayersDir = path.join(__dirname, 'prayers');
  return fs.readdirSync(prayersDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * Get all prayers in a specific category
 * @param {string} category - The category name (e.g., 'core', 'marian', 'saints')
 * @returns {Object[]} Array of prayer objects
 */
function getPrayersByCategory(category) {
  const categoryDir = path.join(__dirname, 'prayers', category);
  
  if (!fs.existsSync(categoryDir)) {
    throw new Error(`Category '${category}' not found. Available categories: ${getCategories().join(', ')}`);
  }
  
  const prayerFiles = fs.readdirSync(categoryDir)
    .filter(file => file.endsWith('.json'));
  
  return prayerFiles.map(file => {
    const filePath = path.join(categoryDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  });
}

/**
 * Get a specific prayer by ID
 * @param {string} prayerId - The prayer ID (e.g., 'our-father', 'hail-mary')
 * @returns {Object|null} Prayer object or null if not found
 */
function getPrayerById(prayerId) {
  const categories = getCategories();
  
  for (const category of categories) {
    const categoryDir = path.join(__dirname, 'prayers', category);
    const prayerFile = path.join(categoryDir, `${prayerId}.json`);
    
    if (fs.existsSync(prayerFile)) {
      const content = fs.readFileSync(prayerFile, 'utf8');
      return JSON.parse(content);
    }
  }
  
  return null;
}

/**
 * Get all prayers from all categories
 * @returns {Object} Object with categories as keys and arrays of prayers as values
 */
function getAllPrayers() {
  const categories = getCategories();
  const result = {};
  
  categories.forEach(category => {
    result[category] = getPrayersByCategory(category);
  });
  
  return result;
}

/**
 * Get prayer text in a specific language
 * @param {string} prayerId - The prayer ID
 * @param {string} language - Language code (e.g., 'en', 'la', 'es')
 * @returns {string|null} Prayer text or null if not found
 */
function getPrayerText(prayerId, language = 'en') {
  const prayer = getPrayerById(prayerId);
  
  if (!prayer || !prayer.translations || !prayer.translations[language]) {
    return null;
  }
  
  return prayer.translations[language].text;
}

/**
 * Search prayers by text content
 * @param {string} searchTerm - Term to search for
 * @param {string} language - Language to search in (default: 'en')
 * @returns {Object[]} Array of matching prayers
 */
function searchPrayers(searchTerm, language = 'en') {
  const allPrayers = getAllPrayers();
  const results = [];
  
  Object.keys(allPrayers).forEach(category => {
    allPrayers[category].forEach(prayer => {
      if (prayer.translations[language] && 
          prayer.translations[language].text.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({
          ...prayer,
          category: category
        });
      }
    });
  });
  
  return results;
}

/**
 * Get supported languages
 * @returns {string[]} Array of supported language codes
 */
function getSupportedLanguages() {
  return ['la', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl'];
}

module.exports = {
  getCategories,
  getPrayersByCategory,
  getPrayerById,
  getAllPrayers,
  getPrayerText,
  searchPrayers,
  getSupportedLanguages
};
