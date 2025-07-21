const fs = require("fs");
const path = require("path");
const https = require("https");

const INPUT_FILE = "cleaned_words.txt";
const OUTPUT_DIR = "C:\\Users\\athar\\spelling-pronounciations";
const BATCH_SIZE = 20;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read and clean words
const words = fs.readFileSync(INPUT_FILE, "utf8")
  .split(/\r?\n/)
  .map(word => word.trim().toLowerCase())
  .filter(word => word.length > 1);

function getGoogleTTSUrl(word) {
  return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(word)}&tl=en&client=tw-ob`;
}

async function downloadAudio(word) {
  const filePath = path.join(OUTPUT_DIR, `${word}.mp3`);
  if (fs.existsSync(filePath)) {
    console.log(`✅ Cached: ${word}`);
    return;
  }

  console.log(`🔄 Downloading ${word}...`);
  const url = getGoogleTTSUrl(word);

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode !== 200) {
        console.error(`❌ Error for "${word}": Status ${res.statusCode}`);
        return resolve();
      }

      const file = fs.createWriteStream(filePath);
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`🎧 Downloaded: ${word}`);
        resolve();
      });
    }).on("error", err => {
      console.error(`❌ Error for "${word}":`, err.message);
      resolve();
    });
  });
}

async function processInBatches(words, batchSize) {
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    await Promise.all(batch.map(word => downloadAudio(word)));
  }
}

processInBatches(words, BATCH_SIZE);