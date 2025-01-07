// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Laadt vertalingen via HTTP
  .use(HttpBackend)
  // Detecteert de taal van de gebruiker
  .use(LanguageDetector)
  // Integreert met React
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true, // Zet op false in productie

    interpolation: {
      escapeValue: false, // React ontsnapt standaard al waarden
    },
    backend: {
      // Pad naar vertaalbestanden in de public map
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      // Volgorde van detectie
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
