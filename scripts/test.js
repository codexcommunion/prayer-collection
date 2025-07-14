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

// Test getCategories
test('getCategories returns array of categories', () => {
  const categories = prayerCollection.getCategories();
  if (!Array.isArray(categories)) throw new Error('Expected array');
  if (categories.length === 0) throw new Error('Expected non-empty array');
  if (!categories.includes('core')) throw new Error('Expected core category');
});

// Test getPrayersByCategory
test('getPrayersByCategory returns prayers for valid category', () => {
  const prayers = prayerCollection.getPrayersByCategory('core');
  if (!Array.isArray(prayers)) throw new Error('Expected array');
  if (prayers.length === 0) throw new Error('Expected non-empty array');
  if (!prayers[0].metadata) throw new Error('Expected metadata in prayer');
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

// Test getAllPrayers
test('getAllPrayers returns all prayers organized by category', () => {
  const allPrayers = prayerCollection.getAllPrayers();
  if (typeof allPrayers !== 'object') throw new Error('Expected object');
  if (!allPrayers.core) throw new Error('Expected core category');
  if (!Array.isArray(allPrayers.core)) throw new Error('Expected array for core category');
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

// Test error handling
test('getPrayersByCategory throws error for invalid category', () => {
  try {
    prayerCollection.getPrayersByCategory('invalid-category');
    throw new Error('Expected error to be thrown');
  } catch (error) {
    if (!error.message.includes('not found')) throw new Error('Expected "not found" error message');
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
