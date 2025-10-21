#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Enhanced validation script using JSON Schema
 * 
 * This script provides two validation modes:
 * 1. Schema validation (if Ajv is installed)
 * 2. Fallback custom validation (always available)
 */

console.log('🔍 Validating prayer collection...');

// Try to load Ajv for JSON Schema validation
let Ajv = null;
let ajv = null;
let schema = null;

try {
  Ajv = require('ajv');
  ajv = new Ajv({ allErrors: true });
  const schemaPath = path.join(__dirname, '..', 'prayer-schema.json');
  schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  console.log('✅ Using JSON Schema validation (Ajv installed)\n');
} catch (error) {
  console.log('ℹ️  Ajv not installed, using custom validation');
  console.log('   To enable JSON Schema validation, run: npm install --save-dev ajv\n');
}

const prayersDir = path.join(__dirname, '..', 'prayers');
const prayerFiles = fs.readdirSync(prayersDir)
  .filter(file => file.endsWith('.json'));

let isValid = true;
let totalPrayers = 0;
const prayerIds = new Set();
const validationErrors = [];
const validationWarnings = [];

console.log(`📂 Validating ${prayerFiles.length} prayers\n`);

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

// Validation function
function validatePrayer(file, prayer, filePath) {
  const errors = [];
  const warnings = [];
  
  // JSON Schema validation (if available)
  if (ajv && schema) {
    const validate = ajv.compile(schema);
    const valid = validate(prayer);
    
    if (!valid) {
      validate.errors.forEach(error => {
        errors.push(`Schema: ${error.instancePath || 'root'} ${error.message}`);
      });
    }
  }
  
  // Custom validations (always run)
  if (!prayer.metadata || !prayer.translations) {
    errors.push('Missing required structure (metadata or translations)');
    return { errors, warnings };
  }
  
  const { metadata, translations } = prayer;
  const expectedId = file.replace('.json', '');
  
  // Validate filename matches ID
  if (metadata.id !== expectedId) {
    errors.push(`ID mismatch: filename is "${expectedId}" but metadata.id is "${metadata.id}"`);
  }
  
  // Validate primary_category in labels
  if (!metadata.labels.includes(metadata.primary_category)) {
    warnings.push(`primary_category "${metadata.primary_category}" not found in labels array`);
  }
  
  // Validate required metadata fields
  const requiredFields = [
    'id', 'title', 'primary_category', 'labels', 'importance', 
    'type', 'description', 'origin', 'origin_date', 'usage',
    'feast_days', 'devotions', 'created_date', 'last_modified'
  ];
  
  requiredFields.forEach(field => {
    if (!metadata[field]) {
      errors.push(`Missing required metadata field: ${field}`);
    }
  });
  
  // Validate labels is not empty
  if (!metadata.labels || metadata.labels.length === 0) {
    errors.push('labels array cannot be empty');
  }
  
  // Validate importance
  const validImportance = ['essential', 'common', 'devotional'];
  if (metadata.importance && !validImportance.includes(metadata.importance)) {
    errors.push(`Invalid importance level: "${metadata.importance}". Must be one of: ${validImportance.join(', ')}`);
  }
  
  // Validate primary_category
  const validCategories = [
    'marian', 'christological', 'saints', 'penitential', 
    'liturgical', 'devotional', 'creeds', 'holy-spirit', 
    'for-the-dead', 'daily', 'seasonal'
  ];
  if (metadata.primary_category && !validCategories.includes(metadata.primary_category)) {
    errors.push(`Invalid primary_category: "${metadata.primary_category}". Must be one of: ${validCategories.join(', ')}`);
  }
  
  // Validate translations
  const supportedLanguages = ['la', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl'];
  const presentLanguages = Object.keys(translations);
  
  supportedLanguages.forEach(lang => {
    if (!translations[lang]) {
      warnings.push(`Missing translation for language: ${lang}`);
    } else {
      const translation = translations[lang];
      
      if (!translation.language) {
        errors.push(`Translation ${lang}: missing 'language' field`);
      }
      
      if (!translation.text && !translation.content) {
        errors.push(`Translation ${lang}: must have either 'text' or 'content' field`);
      }
      
      // Validate prayer references in content
      if (translation.content) {
        translation.content.forEach((part, idx) => {
          if (part.type === 'prayer-reference') {
            if (!prayerIds.has(part.value)) {
              errors.push(`Translation ${lang}, content[${idx}]: references non-existent prayer "${part.value}"`);
            }
          }
          
          if (!part.type || !part.value) {
            errors.push(`Translation ${lang}, content[${idx}]: missing required 'type' or 'value'`);
          }
          
          const validTypes = ['text', 'prayer-reference', 'instructions'];
          if (part.type && !validTypes.includes(part.type)) {
            errors.push(`Translation ${lang}, content[${idx}]: invalid type "${part.type}". Must be one of: ${validTypes.join(', ')}`);
          }
        });
      }
    }
  });
  
  // Check for extra languages not in spec
  presentLanguages.forEach(lang => {
    if (!supportedLanguages.includes(lang)) {
      warnings.push(`Unsupported language code: ${lang}`);
    }
  });
  
  return { errors, warnings };
}

// Second pass: validate each prayer
prayerFiles.forEach(file => {
  const filePath = path.join(prayersDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const prayer = JSON.parse(content);
    
    const { errors, warnings } = validatePrayer(file, prayer, filePath);
    
    if (errors.length > 0) {
      console.log(`❌ ${file}:`);
      errors.forEach(error => console.log(`     ${error}`));
      validationErrors.push({ file, errors });
      isValid = false;
    } else if (warnings.length > 0) {
      console.log(`⚠️  ${file}:`);
      warnings.forEach(warning => console.log(`     ${warning}`));
      validationWarnings.push({ file, warnings });
    } else {
      console.log(`✅ ${file}`);
    }
    
    totalPrayers++;
  } catch (error) {
    console.log(`❌ ${file}: ${error.message}`);
    validationErrors.push({ file, errors: [error.message] });
    isValid = false;
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total prayers validated: ${totalPrayers}`);
console.log(`Errors: ${validationErrors.length}`);
console.log(`Warnings: ${validationWarnings.length}`);

if (validationErrors.length > 0) {
  console.log('\n❌ Validation failed with errors');
  process.exit(1);
} else if (validationWarnings.length > 0) {
  console.log('\n⚠️  Validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ All validations passed!');
  process.exit(0);
}
