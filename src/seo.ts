import { getLanguage, getPagePath, localizedHref, PAGE_PATHS, type SiteLanguage } from './routes';

export const SITE_URL = 'https://dun4ev.com';

const descriptions = {
  en: {
    '/': 'Andrej Dunaev: energy infrastructure engineer with 20+ years of experience. Engineering coordination, technical documentation, vendor collaboration and automation projects.',
    '/projects': 'Engineering automation tools, client websites and interactive demos by Andrej Dunaev. Project descriptions, screenshots, source repositories and published examples.',
    '/articles': 'Articles and visual investigations by Andrej Dunaev on engineering automation, vendor documentation, AI coding agents and professional development.',
    '/knowledge-base': 'Visual guides, diagrams and practical notes on AI agents, engineering automation and documentation workflows, collected by Andrej Dunaev.',
  },
  ru: {
    '/': 'Андрей Дунаев: инженер энергетической инфраструктуры с опытом более 20 лет. Инженерная координация, техническая документация, работа с поставщиками и автоматизация.',
    '/projects': 'Инструменты инженерной автоматизации, клиентские сайты и интерактивные демо Андрея Дунаева. Описания проектов, скриншоты, исходный код и опубликованные примеры.',
    '/articles': 'Статьи и визуальные исследования Андрея Дунаева об инженерной автоматизации, документации поставщиков, AI-агентах и профессиональном развитии.',
    '/knowledge-base': 'Визуальные руководства, схемы и практические заметки об AI-агентах, инженерной автоматизации и работе с документацией в подборке Андрея Дунаева.',
  },
};

export const getPageMetadata = (pathname: string, translate: (key: string) => string) => {
  const language = getLanguage(pathname);
  const page = getPagePath(pathname);
  const titleKey = page === '/projects' ? 'projectsPage.title'
    : page === '/articles' ? 'articlesPage.title'
      : page === '/knowledge-base' ? 'knowledgePage.title' : 'header.title';
  const authorName = translate('header.title');
  const title = page === '/'
    ? language === 'en' ? 'Andrej Dunaev | Energy Infrastructure Engineer' : 'Андрей Дунаев | Инженер энергетической инфраструктуры'
    : `${translate(titleKey)} | ${authorName}`;
  const canonical = `${SITE_URL}${localizedHref(page, language)}`;
  const person = {
    '@type': 'Person', '@id': `${SITE_URL}/#author`, name: 'Andrej Dunaev',
    alternateName: 'Андрей Дунаев', url: `${SITE_URL}/`,
    jobTitle: 'Energy Infrastructure Engineer',
    description: translate('about.p1'),
    sameAs: ['https://github.com/Dun4ev'],
  };
  const graph: Record<string, unknown>[] = [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'Dun4Ev', publisher: { '@id': person['@id'] } },
    person,
    { '@type': page === '/' ? 'ProfilePage' : 'CollectionPage', '@id': `${canonical}#page`, url: canonical,
      name: title, description: descriptions[language][page], inLanguage: language,
      isPartOf: { '@id': `${SITE_URL}/#website` }, ...(page === '/' ? { mainEntity: { '@id': person['@id'] } } : {}) },
  ];
  if (page !== '/') graph.push({
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: translate('mobileNav.home'), item: `${SITE_URL}${localizedHref('/', language)}` },
      { '@type': 'ListItem', position: 2, name: translate(titleKey), item: canonical },
    ],
  });
  return { language, title, description: descriptions[language][page], canonical, graph };
};

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => (
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!
));

export const renderMetadata = (pathname: string, translate: (key: string) => string) => {
  const metadata = getPageMetadata(pathname, translate);
  const page = getPagePath(pathname);
  const alternates = (['en', 'ru'] as SiteLanguage[]).map((language) => (
    `<link rel="alternate" hreflang="${language}" href="${SITE_URL}${localizedHref(page, language)}" />`
  )).join('\n');
  return `<title>${escapeHtml(metadata.title)}</title>
<meta name="description" content="${escapeHtml(metadata.description)}" />
<meta name="author" content="${escapeHtml(translate('header.title'))}" />
<link rel="canonical" href="${metadata.canonical}" />
${alternates}
<link rel="alternate" hreflang="x-default" href="${SITE_URL}${localizedHref(page, 'en')}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Dun4Ev" />
<meta property="og:locale" content="${metadata.language === 'ru' ? 'ru_RU' : 'en_US'}" />
<meta property="og:url" content="${metadata.canonical}" />
<meta property="og:title" content="${escapeHtml(metadata.title)}" />
<meta property="og:description" content="${escapeHtml(metadata.description)}" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': metadata.graph }).replace(/</g, '\\u003c')}</script>`;
};

export const INDEXABLE_PATHS = PAGE_PATHS.flatMap((page) => [localizedHref(page, 'en'), localizedHref(page, 'ru')]);
