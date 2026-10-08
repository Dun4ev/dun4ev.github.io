import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { LanguagePathContext } from './components/LanguageSwitcher';
import i18n from './src/i18n';
import './src/styles.css';
import { getLanguage, getPagePath, localizedHref, PAGE_PATHS } from './src/routes';
import { installAnalytics } from './src/analytics';

const disposeAnalytics = installAnalytics();
if (import.meta.hot) import.meta.hot.dispose(disposeAnalytics);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguagePathContext.Provider value={window.location.pathname}>
        <App initialPath={window.location.pathname} />
      </LanguagePathContext.Provider>
    </I18nextProvider>
  </React.StrictMode>
);

// Older GitHub Pages links used a query redirect. Keep those bookmarks working.
const legacyPath = new URLSearchParams(window.location.search).get('redirect');
const legacyUrl = legacyPath?.startsWith('/') && !legacyPath.startsWith('//')
  ? new URL(legacyPath, window.location.origin) : null;
const legacyIsKnown = legacyUrl?.origin === window.location.origin
  && PAGE_PATHS.some((path) => getPagePath(path) === getPagePath(legacyUrl.pathname));
if (legacyIsKnown && legacyUrl) {
  window.location.replace(localizedHref(`${legacyUrl.pathname}${legacyUrl.hash}`, getLanguage(legacyUrl.pathname)));
} else if (rootElement.dataset.prerendered === 'true') {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
