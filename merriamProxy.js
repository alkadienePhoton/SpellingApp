// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 2000;
const MW_API_KEY = process.env.MW_API_KEY;

app.use(cors()); // Allow frontend to access this server

app.get('/api/define', async (req, res) => {
  const word = req.query.word;
  if (!word) return res.status(400).send("Missing 'word' query param.");

  try {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${MW_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch definition' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
