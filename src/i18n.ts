import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';

import { getLanguage, type SiteLanguage } from './routes';

export const createSiteI18n = (language: SiteLanguage) => {
    const instance = createInstance();
    void instance.use(initReactI18next).init({
        resources: { en: { translation: en }, ru: { translation: ru } },
        lng: language,
        supportedLngs: ['en', 'ru'],
        fallbackLng: 'en',
        initImmediate: false,
        interpolation: {
            escapeValue: false,
        },
    });
    return instance;
};

// A URL always represents the same language, including with JavaScript disabled.
const i18n = createSiteI18n(typeof window === 'undefined' ? 'en' : getLanguage(window.location.pathname));
export default i18n;
