#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Build script for prayer collection
 * Validates JSON files and creates build artifacts
 */

console.log('🏗️  Building prayer collection...');

// Validate all JSON files in flat structure
const prayersDir = path.join(__dirname, '..', 'prayers');
const prayerFiles = fs.readdirSync(prayersDir)
  .filter(file => file.endsWith('.json'));

let totalPrayers = 0;
const buildReport = {
  primaryCategories: {},
  labels: {},
  importance: {},
  errors: [],
  warnings: []
};

prayerFiles.forEach(file => {
  const filePath = path.join(prayersDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const prayer = JSON.parse(content);
    
    // Validate required fields
    if (!prayer.metadata || !prayer.translations) {
      buildReport.errors.push(`${file}: Missing required fields`);
      return;
    }
    
    // Validate new metadata structure
    const requiredMetadata = ['id', 'title', 'primary_category', 'labels', 'importance', 'type', 'description', 'origin', 'origin_date', 'usage'];
    requiredMetadata.forEach(field => {
      if (!prayer.metadata[field]) {
        buildReport.errors.push(`${file}: Missing metadata field: ${field}`);
      }
    });
    
    // Validate primary_category is in labels array
    if (prayer.metadata.primary_category && prayer.metadata.labels) {
      if (!prayer.metadata.labels.includes(prayer.metadata.primary_category)) {
        buildReport.warnings.push(`${file}: primary_category "${prayer.metadata.primary_category}" should be included in labels array`);
      }
    }
    
    // Validate translations
    const requiredLanguages = ['la', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl'];
    requiredLanguages.forEach(lang => {
      if (!prayer.translations[lang]) {
        buildReport.warnings.push(`${file}: Missing translation for language: ${lang}`);
      }
    });
    
    // Track categories and labels for reporting
    const category = prayer.metadata.primary_category;
    if (category) {
      if (!buildReport.primaryCategories[category]) {
        buildReport.primaryCategories[category] = { count: 0, prayers: [] };
      }
      buildReport.primaryCategories[category].count++;
      buildReport.primaryCategories[category].prayers.push(prayer.metadata.id);
    }
    
    // Track labels
    if (prayer.metadata.labels) {
      prayer.metadata.labels.forEach(label => {
        if (!buildReport.labels[label]) {
          buildReport.labels[label] = { count: 0, prayers: [] };
        }
        buildReport.labels[label].count++;
        buildReport.labels[label].prayers.push(prayer.metadata.id);
      });
    }
    
    // Track importance levels
    const importance = prayer.metadata.importance;
    if (importance) {
      if (!buildReport.importance[importance]) {
        buildReport.importance[importance] = { count: 0, prayers: [] };
      }
      buildReport.importance[importance].count++;
      buildReport.importance[importance].prayers.push(prayer.metadata.id);
    }
    
    totalPrayers++;
    
  } catch (error) {
    buildReport.errors.push(`${file}: Invalid JSON - ${error.message}`);
  }
});

// Create lib directory for build artifacts
const libDir = path.join(__dirname, '..', 'lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir);
}

// Write build report
fs.writeFileSync(
  path.join(libDir, 'build-report.json'),
  JSON.stringify(buildReport, null, 2)
);

// Create prayer index
const prayerIndex = {
  total: totalPrayers,
  primaryCategories: Object.keys(buildReport.primaryCategories),
  labels: Object.keys(buildReport.labels),
  importanceLevels: Object.keys(buildReport.importance),
  lastBuilt: new Date().toISOString(),
  prayersByCategory: buildReport.primaryCategories,
  prayersByLabel: buildReport.labels,
  prayersByImportance: buildReport.importance
};

fs.writeFileSync(
  path.join(libDir, 'prayer-index.json'),
  JSON.stringify(prayerIndex, null, 2)
);

console.log(`✅ Build completed!`);
console.log(`📊 Total prayers: ${totalPrayers}`);
console.log(`📁 Primary categories: ${Object.keys(buildReport.primaryCategories).length}`);
console.log(`🏷️  Labels: ${Object.keys(buildReport.labels).length}`);
console.log(`⚠️  Warnings: ${buildReport.warnings.length}`);
console.log(`❌ Errors: ${buildReport.errors.length}`);

if (buildReport.errors.length > 0) {
  console.log('\n❌ Build errors:');
  buildReport.errors.forEach(error => console.log(`  - ${error}`));
  process.exit(1);
}

if (buildReport.warnings.length > 0) {
  console.log('\n⚠️  Build warnings:');
  buildReport.warnings.forEach(warning => console.log(`  - ${warning}`));
}
