#!/usr/bin/env node

const path = require('path');
const prayerCollection = require('../index');

/**
 * Test script for prayer collection API
 */

console.log('🧪 Testing prayer collection API...');

let testsPassed = 0;
let testsTotal = 0;

function test(description, testFn) {
  testsTotal++;
  try {
    testFn();
    console.log(`✅ ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${description}: ${error.message}`);
  }
}

// Test getAllPrayers (new flat structure)
test('getAllPrayers returns array of all prayers', () => {
  const prayers = prayerCollection.getAllPrayers();
  if (!Array.isArray(prayers)) throw new Error('Expected array');
  if (prayers.length === 0) throw new Error('Expected non-empty array');
  if (!prayers[0].metadata) throw new Error('Expected metadata in prayer');
});

// Test getPrimaryCategories
test('getPrimaryCategories returns array of primary categories', () => {
  const categories = prayerCollection.getPrimaryCategories();
  if (!Array.isArray(categories)) throw new Error('Expected array');
  if (categories.length === 0) throw new Error('Expected non-empty array');
  if (!categories.includes('marian')) throw new Error('Expected marian category');
});

// Test getLabels
test('getLabels returns array of labels', () => {
  const labels = prayerCollection.getLabels();
  if (!Array.isArray(labels)) throw new Error('Expected array');
  if (labels.length === 0) throw new Error('Expected non-empty array');
  if (!labels.includes('core')) throw new Error('Expected core label');
  if (!labels.includes('essential')) throw new Error('Expected essential label');
});

// Test getPrayersByPrimaryCategory
test('getPrayersByPrimaryCategory returns prayers for valid category', () => {
  const prayers = prayerCollection.getPrayersByPrimaryCategory('marian');
  if (!Array.isArray(prayers)) throw new Error('Expected array');
  if (prayers.length === 0) throw new Error('Expected non-empty array');
  if (!prayers[0].metadata) throw new Error('Expected metadata in prayer');
  if (prayers[0].metadata.primary_category !== 'marian') throw new Error('Expected marian category');
});

// Test getPrayersByLabel
test('getPrayersByLabel returns prayers for valid label', () => {
  const prayers = prayerCollection.getPrayersByLabel('core');
  if (!Array.isArray(prayers)) throw new Error('Expected array');
  if (prayers.length === 0) throw new Error('Expected non-empty array');
  if (!prayers[0].metadata.labels.includes('core')) throw new Error('Expected core label in results');
});

// Test getPrayersByImportance
test('getPrayersByImportance returns prayers for valid importance level', () => {
  const prayers = prayerCollection.getPrayersByImportance('essential');
  if (!Array.isArray(prayers)) throw new Error('Expected array');
  if (prayers.length === 0) throw new Error('Expected non-empty array');
  if (prayers[0].metadata.importance !== 'essential') throw new Error('Expected essential importance');
});

// Test legacy getCategories (deprecated)
test('getCategories (legacy) still works for backward compatibility', () => {
  const categories = prayerCollection.getCategories();
  if (!Array.isArray(categories)) throw new Error('Expected array');
  if (categories.length === 0) throw new Error('Expected non-empty array');
});

// Test getPrayerById
test('getPrayerById returns prayer for valid ID', () => {
  const prayer = prayerCollection.getPrayerById('our-father');
  if (!prayer) throw new Error('Expected prayer object');
  if (!prayer.metadata) throw new Error('Expected metadata');
  if (!prayer.translations) throw new Error('Expected translations');
});

// Test getPrayerById with invalid ID
test('getPrayerById returns null for invalid ID', () => {
  const prayer = prayerCollection.getPrayerById('non-existent-prayer');
  if (prayer !== null) throw new Error('Expected null for invalid ID');
});

// Test getAllPrayersByCategory
test('getAllPrayersByCategory returns all prayers organized by category', () => {
  const allPrayers = prayerCollection.getAllPrayersByCategory();
  if (typeof allPrayers !== 'object') throw new Error('Expected object');
  const categories = Object.keys(allPrayers);
  if (categories.length === 0) throw new Error('Expected categories');
  if (!Array.isArray(allPrayers[categories[0]])) throw new Error('Expected array for each category');
});

// Test getPrayerText
test('getPrayerText returns text for valid prayer and language', () => {
  const text = prayerCollection.getPrayerText('our-father', 'en');
  if (typeof text !== 'string') throw new Error('Expected string');
  if (text.length === 0) throw new Error('Expected non-empty string');
});

// Test getPrayerText with invalid language
test('getPrayerText returns null for invalid language', () => {
  const text = prayerCollection.getPrayerText('our-father', 'invalid');
  if (text !== null) throw new Error('Expected null for invalid language');
});

// Test searchPrayers
test('searchPrayers returns matching prayers', () => {
  const results = prayerCollection.searchPrayers('Father');
  if (!Array.isArray(results)) throw new Error('Expected array');
  if (results.length === 0) throw new Error('Expected to find prayers containing "Father"');
});

// Test getSupportedLanguages
test('getSupportedLanguages returns array of language codes', () => {
  const languages = prayerCollection.getSupportedLanguages();
  if (!Array.isArray(languages)) throw new Error('Expected array');
  if (!languages.includes('en')) throw new Error('Expected English language code');
  if (!languages.includes('la')) throw new Error('Expected Latin language code');
});

// Test new metadata structure
test('prayers have new metadata structure', () => {
  const prayer = prayerCollection.getPrayerById('our-father');
  if (!prayer.metadata.primary_category) throw new Error('Expected primary_category');
  if (!Array.isArray(prayer.metadata.labels)) throw new Error('Expected labels array');
  if (!prayer.metadata.importance) throw new Error('Expected importance');
  if (!prayer.metadata.labels.includes(prayer.metadata.primary_category)) {
    throw new Error('Expected primary_category to be in labels array');
  }
});

console.log(`\n📊 Test Results:`);
console.log(`Tests passed: ${testsPassed}/${testsTotal}`);
console.log(`Success rate: ${Math.round((testsPassed / testsTotal) * 100)}%`);

if (testsPassed !== testsTotal) {
  console.log('❌ Some tests failed!');
  process.exit(1);
}

console.log('🎉 All tests passed!');
