const fs = require("fs");

// Read the file
fs.readFile("words.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Split by spaces, filter out 1-letter words, and join with newlines
  const cleaned = data
    .split(/\s+/)
    .filter(word => word.length > 1)
    .join("\n");

  // Write to a new file
  fs.writeFile("cleaned_words.txt", cleaned, err => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Cleaned words saved to cleaned_words.txt");
    }
  });
});