const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { exec } = require('child_process');

// Load files
const allWords = fs.readFileSync(path.join(__dirname, 'all_words.txt'), 'utf-8')
  .split('\n')
  .map(word => word.trim().toLowerCase())
  .filter(Boolean);

const cleanedWords = new Set(fs.readFileSync(path.join(__dirname, 'cleaned_words.txt'), 'utf-8')
  .split('\n')
  .map(word => word.trim().toLowerCase())
  .filter(Boolean));

const profanityBase64 = fs.readFileSync(path.join(__dirname, 'profanity.txt'), 'utf-8')
  .split('\n')
  .map(line => Buffer.from(line.trim(), 'base64').toString('utf-8').toLowerCase())
  .filter(Boolean);

const profanityWords = new Set(profanityBase64);

// Subtract profanity + cleaned
const filteredWords = allWords.filter(
  word => !cleanedWords.has(word) && !profanityWords.has(word)
);

// Use lodash for better shuffling
const selected = _.shuffle(filteredWords).slice(0, 15);

console.log('Selected words:', selected);

// Open them in Merriam-Webster
selected.forEach(word => {
  const url = `https://www.merriam-webster.com/dictionary/${encodeURIComponent(word)}`;
  exec(`start ${url}`);
});
