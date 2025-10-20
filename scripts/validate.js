#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Validation script for prayer collection
 * Performs comprehensive validation of all prayer files
 */

console.log('🔍 Validating prayer collection...');

const prayersDir = path.join(__dirname, '..', 'prayers');
const prayerFiles = fs.readdirSync(prayersDir)
  .filter(file => file.endsWith('.json'));

let isValid = true;
let totalPrayers = 0;
const prayerIds = new Set();

console.log(`\n📂 Validating ${prayerFiles.length} prayers in flat structure`);

// First pass: collect all prayer IDs
prayerFiles.forEach(file => {
  const filePath = path.join(prayersDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const prayer = JSON.parse(content);
    if (prayer.metadata && prayer.metadata.id) {
      prayerIds.add(prayer.metadata.id);
    }
  } catch (error) {
    // Skip invalid JSON for now, will catch in second pass
  }
});

// Second pass: validate each prayer
prayerFiles.forEach(file => {
  const filePath = path.join(prayersDir, file);
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
    
    // Validate new metadata structure
    const requiredFields = ['primary_category', 'labels', 'importance'];
    requiredFields.forEach(field => {
      if (!prayer.metadata[field]) {
        console.log(`  ❌ ${file}: Missing new metadata field: ${field}`);
        isValid = false;
      }
    });
    
    // Validate primary_category is in labels array
    if (prayer.metadata.primary_category && prayer.metadata.labels) {
      if (!prayer.metadata.labels.includes(prayer.metadata.primary_category)) {
        console.log(`  ⚠️  ${file}: primary_category "${prayer.metadata.primary_category}" should be included in labels array`);
      }
    }
    
    // Validate labels array is not empty
    if (prayer.metadata.labels && prayer.metadata.labels.length === 0) {
      console.log(`  ❌ ${file}: Labels array cannot be empty`);
      isValid = false;
    }
    
    // Validate required languages
    const requiredLanguages = ['la', 'en'];
    requiredLanguages.forEach(lang => {
      if (!prayer.translations[lang]) {
        console.log(`  ❌ ${file}: Missing required translation: ${lang}`);
        isValid = false;
        return;
      }
      
      const translation = prayer.translations[lang];
      
      // Check if it has either text or content
      if (!translation.text && !translation.content) {
        console.log(`  ❌ ${file}: Translation ${lang} must have either 'text' or 'content'`);
        isValid = false;
        return;
      }
      
      // If it has content, validate the structure
      if (translation.content) {
        if (!Array.isArray(translation.content)) {
          console.log(`  ❌ ${file}: Translation ${lang} 'content' must be an array`);
          isValid = false;
          return;
        }
        
        translation.content.forEach((part, index) => {
          if (!part.type || (part.type !== 'instructions' && part.type !== 'text' && part.type !== 'prayer-reference')) {
            console.log(`  ❌ ${file}: Translation ${lang} content[${index}] has invalid type: ${part.type}`);
            isValid = false;
          }
          
          // All types require 'value'
          if (!part.value) {
            console.log(`  ❌ ${file}: Translation ${lang} content[${index}] missing 'value'`);
            isValid = false;
          }
          
          // For prayer-reference, validate that the referenced prayer exists
          if (part.type === 'prayer-reference' && part.value && !prayerIds.has(part.value)) {
            console.log(`  ❌ ${file}: Translation ${lang} content[${index}] references unknown prayer ID: ${part.value}`);
            isValid = false;
          }
          
          // Validate count if present
          if (part.count && (typeof part.count !== 'number' || part.count < 1)) {
            console.log(`  ❌ ${file}: Translation ${lang} content[${index}] invalid count: ${part.count}`);
            isValid = false;
          }
          
          // Validate speaker attribute if present
          if (part.speaker && (part.speaker !== 'versicle' && part.speaker !== 'response' && part.speaker !== 'both')) {
            console.log(`  ❌ ${file}: Translation ${lang} content[${index}] invalid speaker: ${part.speaker} (must be 'versicle', 'response', or 'both')`);
            isValid = false;
          }
        });
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
console.log(`Total files processed: ${prayerFiles.length}`);
console.log(`Status: ${isValid ? '✅ VALID' : '❌ INVALID'}`);

if (!isValid) {
  process.exit(1);
}

console.log('\n🎉 All prayers validated successfully!');
