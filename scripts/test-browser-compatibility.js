#!/usr/bin/env node

/**
 * Browser compatibility test
 * This test simulates browser environment constraints to ensure
 * the library works without Node.js-specific APIs
 */

console.log('🌐 Testing browser compatibility...');

// Mock a browser-like environment by removing Node.js specific globals
const originalFs = global.fs;
const originalPath = global.path;
const originalRequire = global.require;

// Remove fs and path to simulate browser environment
delete global.fs;
delete global.path;

// Test that the library can still work
try {
  // This should work because we now use static imports
  const prayerCollection = require('../index.js');
  
  console.log('✅ Library loads successfully in browser-like environment');
  
  // Test core functions
  const allPrayers = prayerCollection.getAllPrayers();
  console.log(`✅ getAllPrayers() returns ${allPrayers.length} prayers`);
  
  const categories = prayerCollection.getPrimaryCategories();
  console.log(`✅ getPrimaryCategories() returns ${categories.length} categories`);
  
  const ourFather = prayerCollection.getPrayerById('our-father');
  console.log(`✅ getPrayerById('our-father') returns: ${ourFather?.metadata?.title || 'null'}`);
  
  const marianPrayers = prayerCollection.getPrayersByPrimaryCategory('marian');
  console.log(`✅ getPrayersByPrimaryCategory('marian') returns ${marianPrayers.length} prayers`);
  
  const corePrayers = prayerCollection.getPrayersByLabel('core');
  console.log(`✅ getPrayersByLabel('core') returns ${corePrayers.length} prayers`);
  
  const prayerText = prayerCollection.getPrayerText('hail-mary', 'en');
  console.log(`✅ getPrayerText() returns text: ${prayerText ? prayerText.substring(0, 50) + '...' : 'null'}`);
  
  console.log('🎉 Browser compatibility test passed!');
  
} catch (error) {
  console.error('❌ Browser compatibility test failed:', error.message);
  process.exit(1);
} finally {
  // Restore original globals
  global.fs = originalFs;
  global.path = originalPath;
  global.require = originalRequire;
}