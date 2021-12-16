import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('./locales/en/translations.json')
    },
    el: {
      translations: require('./locales/el/translations.json')
    },
    es: {
      translations: require('./locales/el/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

// i18n.languages = ['en', 'el'];
i18n.languageNames = {
  'en': 'English',
  'el': 'Greek'
}

i18n.getLanguages = () => {
  return Object.keys(i18n.languageNames)
}

i18n.otherOptions = (current) => {
  return i18n.getLanguages()
    .filter(language => language !== current)
    .map(language => ({label:i18n.languageNames[language], code:language}));
}

export default i18n;