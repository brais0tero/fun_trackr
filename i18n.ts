import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

interface I18nConfig {
  fallbackLng: string;
  debug: boolean;
  interpolation: {
    escapeValue: boolean;
  };
}

i18n
  .use(
    resourcesToBackend((lng: string, ns: string) => 
      import(`./public/locales/${lng}/${ns}.json`)
    )
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  } as I18nConfig);
export default i18n;
