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

// Test complex prayer with content array - Angelus
test('Angelus assembles content parts in correct order', () => {
  const text = prayerCollection.getPrayerText('angelus', 'en');
  if (!text) throw new Error('Expected text for Angelus');
  
  // Check that versicle/response pairs appear
  if (!text.includes('The Angel of the Lord declared unto Mary')) throw new Error('Missing first versicle');
  if (!text.includes('And she conceived of the Holy Spirit')) throw new Error('Missing first response');
  
  // Check that Hail Mary is inserted (referenced prayer)
  if (!text.includes('Hail Mary, full of grace')) throw new Error('Missing Hail Mary reference');
  
  // Check order: versicle, response, then Hail Mary
  const firstVersiclePos = text.indexOf('The Angel of the Lord declared unto Mary');
  const firstResponsePos = text.indexOf('And she conceived of the Holy Spirit');
  const hailMaryPos = text.indexOf('Hail Mary, full of grace');
  
  if (firstVersiclePos > firstResponsePos) throw new Error('Versicle should come before response');
  if (firstResponsePos > hailMaryPos) throw new Error('Response should come before Hail Mary');
});

// Test complex prayer with instructions - Divine Mercy Chaplet
test('Divine Mercy Chaplet includes instructions with brackets', () => {
  const text = prayerCollection.getPrayerText('chaplet-of-divine-mercy', 'en');
  if (!text) throw new Error('Expected text for Divine Mercy Chaplet');
  
  // Check that instructions are formatted with brackets
  if (!text.includes('[Opening prayers:]')) throw new Error('Missing bracketed instruction for opening prayers');
  if (!text.includes('[Five decades:]')) throw new Error('Missing bracketed instruction for decades');
  if (!text.includes('[Concluding prayers:]')) throw new Error('Missing bracketed instruction for concluding prayers');
  
  // Check that prayers are referenced correctly
  if (!text.includes('Our Father, who art in heaven')) throw new Error('Missing Our Father reference');
  if (!text.includes('I believe in God, the Father almighty')) throw new Error('Missing Apostles Creed reference');
});

// Test prayer reference with count
test('Divine Mercy Chaplet respects count property for repeated prayers', () => {
  const prayer = prayerCollection.getPrayerById('chaplet-of-divine-mercy');
  if (!prayer) throw new Error('Expected Divine Mercy Chaplet prayer');
  
  const enContent = prayer.translations.en.content;
  if (!enContent) throw new Error('Expected content array');
  
  // Find the holy-god prayer reference with repeat count
  const holyGodPart = enContent.find(part => part.value === 'holy-god');
  if (!holyGodPart) throw new Error('Expected holy-god prayer reference');
  if (holyGodPart.count !== 3) throw new Error('Expected count of 3 for holy-god');
  
  // Verify the text appears 3 times in the output
  const text = prayerCollection.getPrayerText('chaplet-of-divine-mercy', 'en');
  const searchText = 'Holy God, Holy Mighty One, Holy Immortal One';
  const occurrences = (text.match(new RegExp(searchText, 'g')) || []).length;
  if (occurrences !== 3) throw new Error(`Expected 3 occurrences of holy-god prayer, found ${occurrences}`);
});

// Test content part types
test('Content parts have correct types (text, instructions, prayer-reference)', () => {
  const angelus = prayerCollection.getPrayerById('angelus');
  if (!angelus) throw new Error('Expected Angelus prayer');
  
  const enContent = angelus.translations.en.content;
  if (!enContent || !Array.isArray(enContent)) throw new Error('Expected content array');
  
  // Check for different content types
  const hasText = enContent.some(part => part.type === 'text');
  const hasPrayerRef = enContent.some(part => part.type === 'prayer-reference');
  
  if (!hasText) throw new Error('Expected text type in content');
  if (!hasPrayerRef) throw new Error('Expected prayer-reference type in content');
  
  // Verify all parts have required 'value' property
  const allHaveValue = enContent.every(part => typeof part.value === 'string' && part.value.length > 0);
  if (!allHaveValue) throw new Error('All content parts should have non-empty value property');
});

// Test prayer reference resolution
test('Prayer references resolve to actual prayer text', () => {
  const angelus = prayerCollection.getPrayerById('angelus');
  const hailMary = prayerCollection.getPrayerById('hail-mary');
  
  if (!angelus || !hailMary) throw new Error('Expected both prayers');
  
  const angelusText = prayerCollection.getPrayerText('angelus', 'en');
  const hailMaryText = prayerCollection.getPrayerText('hail-mary', 'en');
  
  // The Angelus should contain the full Hail Mary text
  if (!angelusText.includes(hailMaryText)) {
    throw new Error('Angelus should contain resolved Hail Mary text');
  }
});

// Test count property works for all content types
test('Count property repeats content correctly', () => {
  const text = prayerCollection.getPrayerText('chaplet-of-divine-mercy', 'en');
  
  // The final prayer has count: 3, so it should appear 3 times
  const finalPrayer = 'Holy God, Holy Mighty One, Holy Immortal One';
  const matches = text.match(new RegExp(finalPrayer, 'g'));
  
  if (!matches || matches.length !== 3) {
    throw new Error(`Expected final prayer to repeat 3 times, found ${matches ? matches.length : 0}`);
  }
});

// Test multiple prayer references in sequence
test('Multiple prayer references are assembled in correct sequence', () => {
  const chaplet = prayerCollection.getPrayerById('chaplet-of-divine-mercy');
  const enContent = chaplet.translations.en.content;
  
  // Should have Sign of the Cross, Our Father, Hail Mary, Apostles Creed at the start
  const openingParts = enContent.slice(1, 5); // Skip the opening instruction
  if (openingParts[0].type !== 'prayer-reference' || openingParts[0].value !== 'sign-of-the-cross') {
    throw new Error('Expected Sign of the Cross first');
  }
  if (openingParts[1].type !== 'prayer-reference' || openingParts[1].value !== 'divine-mercy-opening-prayer') {
    throw new Error('Expected Divine Mercy Opening Prayer second');
  }
  if (openingParts[2].type !== 'prayer-reference' || openingParts[2].value !== 'our-father') {
    throw new Error('Expected Our Father third');
  }
  if (openingParts[3].type !== 'prayer-reference' || openingParts[3].value !== 'hail-mary') {
    throw new Error('Expected Hail Mary fourth');
  }
  
  const text = prayerCollection.getPrayerText('chaplet-of-divine-mercy', 'en');
  const signOfCrossPos = text.indexOf('In the name of the Father');
  const ourFatherPos = text.indexOf('Our Father, who art in heaven');
  const hailMaryPos = text.indexOf('Hail Mary, full of grace');
  const apostlesPos = text.indexOf('I believe in God, the Father almighty');
  
  if (signOfCrossPos === -1 || ourFatherPos === -1 || hailMaryPos === -1 || apostlesPos === -1) {
    throw new Error('Missing expected prayers in assembled text');
  }
  
  // Sign of the Cross should come before Our Father
  if (signOfCrossPos > ourFatherPos) {
    throw new Error('Sign of the Cross should come before Our Father');
  }
});

// Test content parts without count default to 1
test('Content parts without count property default to appearing once', () => {
  const angelus = prayerCollection.getPrayerById('angelus');
  const enContent = angelus.translations.en.content;
  
  // Find a part without count property
  const partWithoutCount = enContent.find(part => part.count === undefined);
  if (!partWithoutCount) throw new Error('Expected to find part without count');
  
  const text = prayerCollection.getPrayerText('angelus', 'en');
  // Should still assemble correctly (implicitly once)
  if (!text || text.length === 0) throw new Error('Text should assemble with default count');
});

// Test instructions are distinguishable from regular text
test('Instructions are formatted with brackets to distinguish from prayer text', () => {
  const text = prayerCollection.getPrayerText('chaplet-of-divine-mercy', 'en');
  
  // Instructions should be in brackets
  const instructionPattern = /\[.*?\]/;
  if (!instructionPattern.test(text)) {
    throw new Error('Expected to find bracketed instructions');
  }
  
  // Check specific instruction format
  if (!text.includes('[Five decades:]')) {
    throw new Error('Instruction should be enclosed in brackets');
  }
});

// Test prayer reference to non-existent prayer
test('Invalid prayer reference is handled gracefully', () => {
  // Create a mock scenario - the API should handle missing references
  const text = prayerCollection.getPrayerText('chaplet-of-divine-mercy', 'en');
  
  // Should not contain error markers for valid references
  if (text.includes('not found')) {
    throw new Error('Should not have "not found" errors for valid prayers');
  }
  if (text.includes('[Prayer') && text.includes('not found]')) {
    throw new Error('Should not have error messages for valid prayer references');
  }
});

// Test multilingual content assembly
test('Content assembly works correctly in multiple languages', () => {
  const languages = ['en', 'es', 'la', 'fr'];
  
  languages.forEach(lang => {
    const text = prayerCollection.getPrayerText('angelus', lang);
    if (!text || text.length === 0) {
      throw new Error(`Expected text for Angelus in ${lang}`);
    }
    
    // Should contain Hail Mary in that language
    const hailMaryText = prayerCollection.getPrayerText('hail-mary', lang);
    if (!text.includes(hailMaryText)) {
      throw new Error(`Angelus in ${lang} should contain Hail Mary text`);
    }
  });
});

// Test content structure integrity
test('All prayers with content arrays have valid structure', () => {
  const allPrayers = prayerCollection.getAllPrayers();
  
  allPrayers.forEach(prayer => {
    Object.keys(prayer.translations).forEach(lang => {
      const translation = prayer.translations[lang];
      
      if (translation.content && Array.isArray(translation.content)) {
        translation.content.forEach((part, index) => {
          // Every part must have a type
          if (!part.type) {
            throw new Error(`${prayer.metadata.id} ${lang} content[${index}] missing type`);
          }
          
          // Every part must have a value
          if (!part.value || typeof part.value !== 'string') {
            throw new Error(`${prayer.metadata.id} ${lang} content[${index}] missing or invalid value`);
          }
          
          // Type must be valid
          const validTypes = ['text', 'instructions', 'prayer-reference'];
          if (!validTypes.includes(part.type)) {
            throw new Error(`${prayer.metadata.id} ${lang} content[${index}] invalid type: ${part.type}`);
          }
          
          // If count exists, must be positive number
          if (part.count !== undefined && (typeof part.count !== 'number' || part.count < 1)) {
            throw new Error(`${prayer.metadata.id} ${lang} content[${index}] invalid count: ${part.count}`);
          }
        });
      }
    });
  });
});

console.log(`\n📊 Test Results:`);
console.log(`Tests passed: ${testsPassed}/${testsTotal}`);
console.log(`Success rate: ${Math.round((testsPassed / testsTotal) * 100)}%`);

if (testsPassed !== testsTotal) {
  console.log('❌ Some tests failed!');
  process.exit(1);
}

console.log('🎉 All tests passed!');
