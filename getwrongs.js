const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.error("Usage: node exportIncorrects.js <path-to-csv>");
  process.exit(1);
}

const csvPath = process.argv[2];
const outputPath = "incorrect_words.json";

try {
  const csvData = fs.readFileSync(csvPath, "utf-8");
  const lines = csvData.trim().split("\n").slice(1); // skip header

  const incorrectWords = lines
    .map((line) => {
      const [wordRaw, statusRaw] = line.split(",").map((s) =>
        s.replace(/(^"|"$)/g, "").trim()
      );
      return { word: wordRaw, status: statusRaw.toLowerCase() };
    })
    .filter((entry) => entry.status === "incorrect")
    .map((entry) => entry.word);

  fs.writeFileSync(outputPath, JSON.stringify(incorrectWords, null, 2), "utf-8");
  console.log(`Exported ${incorrectWords.length} incorrect word(s) to ${outputPath}`);
} catch (err) {
  console.error("Error processing file:", err.message);
}
