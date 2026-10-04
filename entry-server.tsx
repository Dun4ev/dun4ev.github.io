import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { LanguagePathContext } from './components/LanguageSwitcher';
import { createSiteI18n } from './src/i18n';
import { getLanguage } from './src/routes';
import { INDEXABLE_PATHS, renderMetadata } from './src/seo';

export { INDEXABLE_PATHS };
export const render = (pathname: string) => {
  const i18n = createSiteI18n(getLanguage(pathname));
  return {
    language: getLanguage(pathname),
    body: renderToString(<I18nextProvider i18n={i18n}><LanguagePathContext.Provider value={pathname}><App initialPath={pathname} /></LanguagePathContext.Provider></I18nextProvider>),
    head: pathname === '/spatial-demo/' ? '' : renderMetadata(pathname, (key) => i18n.t(key)),
  };
};
