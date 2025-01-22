const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Add CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // or whatever your frontend URL is
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Add language detection (simple version)
function detectLanguage(text) {
  // Dutch-specific characters and common words
  const dutchPatterns = /[èéêëïìíîöòóôüùúû]|^(de|het|een|en|of|bij|voor|naar|met|van)$/i;
  return dutchPatterns.test(text) ? 'nl' : 'en';
}

app.post('/api/translations/update', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { type, key, name, translations, isEdit = false } = req.body;
    
    const enPath = path.join(__dirname, '..', 'public', 'locales', 'en', 'translation.json');
    const nlPath = path.join(__dirname, '..', 'public', 'locales', 'nl', 'translation.json');

    let enFile = JSON.parse(await fs.readFile(enPath, 'utf8'));
    let nlFile = JSON.parse(await fs.readFile(nlPath, 'utf8'));

    // Ensure the required structures exist
    enFile.freelancerSignUp = enFile.freelancerSignUp || {};
    nlFile.freelancerSignUp = nlFile.freelancerSignUp || {};

    if (type === 'industry') {
      // Initialize if not exists
      enFile.freelancerSignUp.industries = enFile.freelancerSignUp.industries || {};
      nlFile.freelancerSignUp.industries = nlFile.freelancerSignUp.industries || {};

      // Update translations
      enFile.freelancerSignUp.industries[key] = translations.en;
      nlFile.freelancerSignUp.industries[key] = translations.nl;

      if (!isEdit) {
        // Only initialize work types object for new industries
        enFile.freelancerSignUp.workTypes = enFile.freelancerSignUp.workTypes || {};
        nlFile.freelancerSignUp.workTypes = nlFile.freelancerSignUp.workTypes || {};
        enFile.freelancerSignUp.workTypes[key] = {};
        nlFile.freelancerSignUp.workTypes[key] = {};
      }

    } else if (type === 'workType') {
      const { industry } = req.body;
      
      // Initialize if not exists
      enFile.freelancerSignUp.workTypes = enFile.freelancerSignUp.workTypes || {};
      nlFile.freelancerSignUp.workTypes = nlFile.freelancerSignUp.workTypes || {};
      enFile.freelancerSignUp.workTypes[industry] = enFile.freelancerSignUp.workTypes[industry] || {};
      nlFile.freelancerSignUp.workTypes[industry] = nlFile.freelancerSignUp.workTypes[industry] || {};

      // Update translations
      enFile.freelancerSignUp.workTypes[industry][key] = translations.en;
      nlFile.freelancerSignUp.workTypes[industry][key] = translations.nl;
    }

    // Write updated translations back to files
    await fs.writeFile(enPath, JSON.stringify(enFile, null, 2));
    await fs.writeFile(nlPath, JSON.stringify(nlFile, null, 2));

    res.json({ success: true });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/translations/delete', async (req, res) => {
  try {
    console.log('Delete request:', req.body);
    const { type, key, industry } = req.body;
    
    const enPath = path.join(__dirname, '..', 'public', 'locales', 'en', 'translation.json');
    const nlPath = path.join(__dirname, '..', 'public', 'locales', 'nl', 'translation.json');

    let enFile = JSON.parse(await fs.readFile(enPath, 'utf8'));
    let nlFile = JSON.parse(await fs.readFile(nlPath, 'utf8'));

    if (type === 'industry') {
      // Delete industry and its work types
      if (enFile.freelancerSignUp?.industries) {
        delete enFile.freelancerSignUp.industries[key];
      }
      if (nlFile.freelancerSignUp?.industries) {
        delete nlFile.freelancerSignUp.industries[key];
      }
      if (enFile.freelancerSignUp?.workTypes) {
        delete enFile.freelancerSignUp.workTypes[key];
      }
      if (nlFile.freelancerSignUp?.workTypes) {
        delete nlFile.freelancerSignUp.workTypes[key];
      }
    } else if (type === 'workType' && industry) {
      // Delete work type
      if (enFile.freelancerSignUp?.workTypes?.[industry]) {
        delete enFile.freelancerSignUp.workTypes[industry][key];
      }
      if (nlFile.freelancerSignUp?.workTypes?.[industry]) {
        delete nlFile.freelancerSignUp.workTypes[industry][key];
      }
    }

    await fs.writeFile(enPath, JSON.stringify(enFile, null, 2));
    await fs.writeFile(nlPath, JSON.stringify(nlFile, null, 2));

    res.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 