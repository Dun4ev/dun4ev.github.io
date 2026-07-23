import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
    size?: 'compact' | 'touch';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ size = 'compact' }) => {
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.resolvedLanguage?.startsWith('ru') ? 'ru' : 'en';
    const isTouchSize = size === 'touch';
    const languages = [
        { code: 'en', shortLabel: 'EN', name: t('language.english') },
        { code: 'ru', shortLabel: 'RU', name: t('language.russian') },
    ] as const;

    const changeLanguage = (language: 'en' | 'ru') => {
        void i18n.changeLanguage(language);
    };

    return (
        <div
            className={`inline-flex items-center rounded-full border border-lightestNavy bg-lightNavy p-1 text-xs font-medium text-slate ${
                isTouchSize ? 'w-52' : 'w-48'
            }`}
            role="group"
            aria-label={t('language.label')}
        >
            <Globe className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
            <span className={`${isTouchSize ? 'mx-2 w-14' : 'mx-1.5 w-14'} text-center tracking-wide`}>
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
                            className={`${isTouchSize ? 'h-11 w-11' : 'w-10 py-1.5'} rounded-full px-2.5 font-semibold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
                                isActive
                                    ? 'bg-teal text-navy shadow-[0_0_0_1px_rgba(100,255,218,0.45),0_0_14px_rgba(100,255,218,0.22)]'
                                    : 'text-slate hover:bg-lightestNavy hover:text-lightestSlate'
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
