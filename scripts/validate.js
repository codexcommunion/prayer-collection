#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Validation script for prayer collection
 * Performs comprehensive validation of all prayer files
 */

console.log('🔍 Validating prayer collection...');

const prayersDir = path.join(__dirname, '..', 'prayers');
const categories = fs.readdirSync(prayersDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let isValid = true;
let totalPrayers = 0;

categories.forEach(category => {
  const categoryDir = path.join(prayersDir, category);
  const prayerFiles = fs.readdirSync(categoryDir)
    .filter(file => file.endsWith('.json'));
  
  console.log(`\n📂 Validating category: ${category} (${prayerFiles.length} prayers)`);
  
  prayerFiles.forEach(file => {
    const filePath = path.join(categoryDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const prayer = JSON.parse(content);
      
      // Validate structure
      if (!prayer.metadata || !prayer.translations) {
        console.log(`  ❌ ${file}: Missing required structure`);
        isValid = false;
        return;
      }
      
      // Validate metadata ID matches filename
      const expectedId = path.basename(file, '.json');
      if (prayer.metadata.id !== expectedId) {
        console.log(`  ❌ ${file}: ID mismatch (expected: ${expectedId}, got: ${prayer.metadata.id})`);
        isValid = false;
      }
      
      // Validate category matches directory
      if (prayer.metadata.category !== category) {
        console.log(`  ⚠️  ${file}: Category mismatch (directory: ${category}, metadata: ${prayer.metadata.category})`);
      }
      
      // Validate required languages
      const requiredLanguages = ['la', 'en'];
      requiredLanguages.forEach(lang => {
        if (!prayer.translations[lang] || !prayer.translations[lang].text) {
          console.log(`  ❌ ${file}: Missing required translation: ${lang}`);
          isValid = false;
        }
      });
      
      // Validate date format
      if (prayer.metadata.origin_date && !isValidDateFormat(prayer.metadata.origin_date)) {
        console.log(`  ❌ ${file}: Invalid date format: ${prayer.metadata.origin_date}`);
        isValid = false;
      }
      
      console.log(`  ✅ ${file}: Valid`);
      totalPrayers++;
      
    } catch (error) {
      console.log(`  ❌ ${file}: Invalid JSON - ${error.message}`);
      isValid = false;
    }
  });
});

function isValidDateFormat(dateStr) {
  // Check for valid ISO 8601 date formats used in the project
  const patterns = [
    /^\d{4}\/\d{4}$/,  // Range: 1200/1300
    /^~\d{4}$/,        // Approximate: ~1200
    /^\d{4}$/,         // Exact: 1886
    /^\d{4}-\d{2}-\d{2}$/ // ISO: 2025-07-14
  ];
  
  return patterns.some(pattern => pattern.test(dateStr));
}

console.log(`\n📊 Validation Summary:`);
console.log(`Total prayers validated: ${totalPrayers}`);
console.log(`Categories: ${categories.length}`);
console.log(`Status: ${isValid ? '✅ VALID' : '❌ INVALID'}`);

if (!isValid) {
  process.exit(1);
}

console.log('\n🎉 All prayers validated successfully!');
