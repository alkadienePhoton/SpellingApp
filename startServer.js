const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public")); // Serve your HTML here

app.use("/audio", express.static("C:\\Users\\athar\\spelling-pronounciations"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});