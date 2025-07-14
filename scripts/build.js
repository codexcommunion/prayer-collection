#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Build script for prayer collection
 * Validates JSON files and creates build artifacts
 */

console.log('🏗️  Building prayer collection...');

// Validate all JSON files
const prayersDir = path.join(__dirname, '..', 'prayers');
const categories = fs.readdirSync(prayersDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let totalPrayers = 0;
const buildReport = {
  categories: {},
  errors: [],
  warnings: []
};

categories.forEach(category => {
  const categoryDir = path.join(prayersDir, category);
  const prayerFiles = fs.readdirSync(categoryDir)
    .filter(file => file.endsWith('.json'));
  
  buildReport.categories[category] = {
    count: prayerFiles.length,
    prayers: []
  };
  
  prayerFiles.forEach(file => {
    const filePath = path.join(categoryDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const prayer = JSON.parse(content);
      
      // Validate required fields
      if (!prayer.metadata || !prayer.translations) {
        buildReport.errors.push(`${category}/${file}: Missing required fields`);
        return;
      }
      
      // Validate metadata
      const requiredMetadata = ['id', 'title', 'category', 'type', 'description', 'origin', 'origin_date', 'usage'];
      requiredMetadata.forEach(field => {
        if (!prayer.metadata[field]) {
          buildReport.errors.push(`${category}/${file}: Missing metadata field: ${field}`);
        }
      });
      
      // Validate translations
      const requiredLanguages = ['la', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl'];
      requiredLanguages.forEach(lang => {
        if (!prayer.translations[lang]) {
          buildReport.warnings.push(`${category}/${file}: Missing translation for language: ${lang}`);
        }
      });
      
      buildReport.categories[category].prayers.push(prayer.metadata.id);
      totalPrayers++;
      
    } catch (error) {
      buildReport.errors.push(`${category}/${file}: Invalid JSON - ${error.message}`);
    }
  });
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
  categories: Object.keys(buildReport.categories),
  lastBuilt: new Date().toISOString(),
  prayers: {}
};

Object.keys(buildReport.categories).forEach(category => {
  prayerIndex.prayers[category] = buildReport.categories[category].prayers;
});

fs.writeFileSync(
  path.join(libDir, 'prayer-index.json'),
  JSON.stringify(prayerIndex, null, 2)
);

console.log(`✅ Build completed!`);
console.log(`📊 Total prayers: ${totalPrayers}`);
console.log(`📁 Categories: ${categories.length}`);
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
