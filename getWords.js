const fs = require('fs');

// Read the file
const content = fs.readFileSync('cleaned_words.txt', 'utf8');

// Split by newlines, trim each word, and filter out empty lines
const words = content
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(Boolean);

// Create JS array string (with quotes around each word)
const arrayString = '[' + words.map(w => JSON.stringify(w)).join(', ') + ']';

console.log(arrayString);
