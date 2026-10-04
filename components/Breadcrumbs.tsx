import React from 'react';
import { useTranslation } from 'react-i18next';
import { localizedHref, type SiteLanguage } from '../src/routes';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Breadcrumbs = ({ current }: { current: string }) => {
  const { t, i18n } = useTranslation();
  const language: SiteLanguage = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';
  return <div className="mb-10">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
    <nav aria-label={language === 'ru' ? 'Навигационная цепочка' : 'Breadcrumb'}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <li><a className="font-semibold hover:text-teal-300" href={localizedHref('/', language)}>{t('mobileNav.home')}</a></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
    <LanguageSwitcher />
    </div>
    <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400" aria-label={language === 'ru' ? 'Разделы сайта' : 'Site sections'}>
      <a href={localizedHref('/projects', language)} className="hover:text-teal-300">{t('projectsPage.title')}</a>
      <a href={localizedHref('/articles', language)} className="hover:text-amber-300">{t('articlesPage.title')}</a>
      <a href={localizedHref('/knowledge-base', language)} className="hover:text-cyan-300">{t('knowledgePage.title')}</a>
    </nav>
  </div>;
};
