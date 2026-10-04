export type SiteLanguage = 'en' | 'ru';

export const PAGE_PATHS = ['/', '/projects/', '/articles/', '/knowledge-base/'] as const;
export type PagePath = (typeof PAGE_PATHS)[number];

export const getLanguage = (pathname: string): SiteLanguage => (
  /^\/ru(?:\/|$)/.test(pathname) ? 'ru' : 'en'
);

export const getPagePath = (pathname: string): string => {
  const path = pathname.replace(/^\/ru(?=\/|$)/, '').replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
  return path === '/labs' ? '/projects' : path;
};

export const localizedHref = (href: string, language: SiteLanguage): string => {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const suffixStart = href.search(/[?#]/);
  const pathname = suffixStart === -1 ? href : href.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? '' : href.slice(suffixStart);
  const page = getPagePath(pathname);
  if (page === '/spatial-demo') return `/spatial-demo/${suffix}`;
  if (PAGE_PATHS.some((path) => getPagePath(path) === page)) {
    const canonicalPath = page === '/' ? '/' : `${page}/`;
    return `${language === 'ru' ? '/ru' : ''}${canonicalPath}${suffix}`;
  }
  if (/^\/articles\/agent-incident-map(?:\/(?:ru|es))?\/?$/.test(pathname)) {
    return `/articles/agent-incident-map/${language === 'ru' ? 'ru/' : ''}${suffix}`;
  }
  if (pathname.replace(/\/$/, '') === '/demos/epc-document-flow') {
    return `/demos/epc-document-flow/?lang=${language}`;
  }
  return href;
};
