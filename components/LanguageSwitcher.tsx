import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.resolvedLanguage?.startsWith('ru') ? 'ru' : 'en';
    const languages = [
        { code: 'en', shortLabel: 'EN', name: t('language.english') },
        { code: 'ru', shortLabel: 'RU', name: t('language.russian') },
    ] as const;

    const changeLanguage = (language: 'en' | 'ru') => {
        void i18n.changeLanguage(language);
    };

    return (
        <div
            className="inline-flex w-48 items-center rounded-full border border-slate-700 bg-slate-800/50 p-1 text-xs font-medium text-slate-400"
            role="group"
            aria-label={t('language.label')}
        >
            <Globe className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
            <span className="mx-1.5 w-14 text-center tracking-wide">
                {t('language.label')}
            </span>
            <span className="flex items-center gap-0.5">
                {languages.map((language) => {
                    const isActive = language.code === currentLanguage;

                    return (
                        <button
                            key={language.code}
                            type="button"
                            onClick={() => changeLanguage(language.code)}
                            className={`w-10 rounded-full px-2.5 py-1.5 font-semibold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                                isActive
                                    ? 'bg-teal-300 text-slate-950 shadow-[0_0_0_1px_rgba(94,234,212,0.45),0_0_14px_rgba(45,212,191,0.22)]'
                                    : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
                            }`}
                            aria-label={t('language.switch_to', { language: language.name })}
                            aria-pressed={isActive}
                        >
                            {language.shortLabel}
                        </button>
                    );
                })}
            </span>
        </div>
    );
};
