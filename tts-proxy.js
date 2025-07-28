// tts-proxy.js
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.get('/tts', async (req, res) => {
  const word = req.query.word;
  if (!word) return res.status(400).send('Missing word');

  // Map voice param to Google TTS language codes
  const voiceParam = (req.query.voice || 'en-US').toLowerCase();
  const voiceMap = {
    'en-us': 'en',
    'american': 'en',
    'en-gb': 'en-GB',
    'british': 'en-GB',
  };
  const lang = voiceMap[voiceParam] || 'en';

  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    word
  )}&tl=${lang}&client=tw-ob`;

  try {
    const response = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Referer: 'https://translate.google.com/',
      },
    });
    if (!response.ok) return res.status(response.status).send('TTS fetch failed');

    res.set('Content-Type', 'audio/mpeg');
    res.set('Access-Control-Allow-Origin', '*');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Proxy error');
  }
});

app.listen(PORT, () => {
  console.log(`TTS Proxy running at http://localhost:${PORT}`);
});
