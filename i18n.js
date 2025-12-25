
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import traducaoEn from './public/traducoes/en.json';
import traducaoPt from './public/traducoes/pt.json';
import traducaoEs from './public/traducoes/es.json';

// Detecta o idioma do navegador
const supportedLangs = ['en', 'pt', 'es'];
let browserLang = typeof window !== 'undefined' ? (navigator.language || navigator.userLanguage || 'pt').slice(0, 2) : 'pt';
const len = supportedLangs.includes(browserLang) ? browserLang : 'pt';


i18n
  .use(initReactI18next)
  .init({
    lng: len,
    fallbackLng: 'pt',
    resources: {
      en: {
        translation: traducaoEn,
      },
      pt: {
        translation: traducaoPt,
      },
      es: {
        translation: traducaoEs,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;