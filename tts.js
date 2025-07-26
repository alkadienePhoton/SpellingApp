const espeak = require('node-espeak');

const ipaPhoneme = 'ɪkˈnjuːmən';

// Use the '-q' flag to suppress extra output, '-x' to interpret phonemes (eSpeak expects its own phoneme input but it accepts IPA too)
// You can pass '-v' for voice selection, e.g., 'en' for English

// IMPORTANT: eSpeak's phoneme input expects its own phoneme alphabet by default,
// but you can try passing IPA directly with -q -v en-us --pho flag for phoneme input.

// However, node-espeak uses eSpeak CLI under the hood; the --pho flag tells eSpeak input is phonemes

espeak.speak(ipaPhoneme, {
  flags: ['--pho'], // treat input as phonemes
  voice: 'en-us',
  // optional additional flags: '-q' quiet output, '-s' speed
}, (err) => {
  if (err) {
    console.error('Error speaking:', err);
  } else {
    console.log('Finished speaking IPA phoneme');
  }
});
