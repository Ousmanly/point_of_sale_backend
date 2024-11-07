import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    // fallbackLng: 'en', // Langue par défaut
    preload: ['fr', 'en', 'ar'],
    backend: {
      loadPath: path.join(__dirname, '../translation/locales/{{lng}}.json'),
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie'],
    },
  });

export default i18n;
