import fs from 'fs/promises';
import path from 'path';

const updateTranslations = async (req, res) => {
  try {
    const { type, industry, key, translations } = req.body;

    // Read both translation files
    const enPath = path.resolve('./public/locales/en/translation.json');
    const nlPath = path.resolve('./public/locales/nl/translation.json');

    const enFile = JSON.parse(await fs.readFile(enPath, 'utf8'));
    const nlFile = JSON.parse(await fs.readFile(nlPath, 'utf8'));

    if (type === 'industry') {
      // Add new industry
      enFile.freelancerSignUp.industries[key] = translations.en;
      nlFile.freelancerSignUp.industries[key] = translations.nl;
      
      // Initialize empty work types object
      enFile.freelancerSignUp.workTypes[key] = {};
      nlFile.freelancerSignUp.workTypes[key] = {};
    } else if (type === 'workType') {
      // Add new work type to specific industry
      enFile.freelancerSignUp.workTypes[industry][key] = translations.en;
      nlFile.freelancerSignUp.workTypes[industry][key] = translations.nl;
    }

    // Write updated translations back to files
    await fs.writeFile(enPath, JSON.stringify(enFile, null, 2));
    await fs.writeFile(nlPath, JSON.stringify(nlFile, null, 2));

    res.json({ success: true });
  } catch (error) {
    console.error('Translation update error:', error);
    res.status(500).json({ error: 'Failed to update translations' });
  }
};

export default updateTranslations; 