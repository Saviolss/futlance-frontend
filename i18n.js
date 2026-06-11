
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import traducaoEn from './public/traducoes/en.json';
import traducaoPt from './public/traducoes/pt.json';
import traducaoEs from './public/traducoes/es.json';
import traducaoFr from './public/traducoes/fr.json';
import traducaoDe from './public/traducoes/de.json';
import traducaoIt from './public/traducoes/it.json';

// Detecta o idioma do navegador
const supportedLangs = ['en', 'pt', 'es', 'fr', 'de', 'it'];
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
      fr: {
        translation: traducaoFr,
      },
      de: {
        translation: traducaoDe,
      },
      it: {
        translation: traducaoIt,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;