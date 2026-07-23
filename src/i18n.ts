import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ru from './locales/ru.json';

const syncDocumentLanguage = (language: string) => {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.lang = language.startsWith('ru') ? 'ru' : 'en';
};

i18n.on('languageChanged', syncDocumentLanguage);

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
        },
        supportedLngs: ['en', 'ru'],
        load: 'languageOnly',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
