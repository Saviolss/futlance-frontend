
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import traducaoEn from './public/traducoes/en.json';
import traducaoPt from './public/traducoes/pt.json';
import traducaoEs from './public/traducoes/es.json';
import traducaoFr from './public/traducoes/fr.json';
import traducaoDe from './public/traducoes/de.json';
import traducaoIt from './public/traducoes/it.json';

export const translationResources = {
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
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'pt',
    fallbackLng: 'pt',
    resources: translationResources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;