#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Migrating prayer files from id/repeat to value/count...');

const prayersDir = path.join(__dirname, '..', 'prayers');
const files = fs.readdirSync(prayersDir).filter(f => f.endsWith('.json'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(prayersDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(content);
  
  let changed = false;
  
  if (json.translations) {
    Object.keys(json.translations).forEach(lang => {
      const trans = json.translations[lang];
      if (trans.content && Array.isArray(trans.content)) {
        trans.content.forEach(part => {
          // Change 'id' to 'value' for prayer-reference type
          if (part.type === 'prayer-reference' && part.id) {
            part.value = part.id;
            delete part.id;
            changed = true;
          }
          // Change 'repeat' to 'count'
          if (part.repeat !== undefined) {
            part.count = part.repeat;
            delete part.repeat;
            changed = true;
          }
        });
      }
    });
  }
  
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n');
    console.log(`  ✅ Updated ${file}`);
    updated++;
  }
});

console.log(`\n✅ Migration complete! Updated ${updated} files.`);
