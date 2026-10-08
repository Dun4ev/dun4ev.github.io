import { ARTICLES, KNOWLEDGE_ITEMS, LABS, PROJECTS, SOCIAL_LINKS } from '../constants';
import { getLanguage, localizedHref } from './routes';

type EventData = Record<string, string | number>;
type AnalyticsWindow = Window & {
  umami?: { track: (name: string, data: EventData) => Promise<unknown> | void };
};

// Use capture so the source page is recorded before React navigates away.
// Umami sends requests with keepalive; tracking must never delay navigation.
export const installAnalytics = () => {
  const trackerWindow = window as AnalyticsWindow;
  const normalize = (href: string) => {
    const url = new URL(href, window.location.origin);
    return `${url.origin}${url.pathname.replace(/^\/ru(?=\/|$)/, '').replace(/\/index\.html$/, '/').replace(/\/$/, '')}`;
  };
  const items = new Map<string, { event: string; id: string }>([
    ...PROJECTS.filter((item) => item.link).map((item) => [normalize(item.link!), { event: 'project_open', id: item.id }] as const),
    ...LABS.map((item) => [normalize(item.href), { event: 'demo_open', id: item.id }] as const),
    ...ARTICLES.flatMap((item) => [item.href, localizedHref(item.href, 'ru')].map((href) => (
      [normalize(href), { event: 'article_open', id: item.id }] as const
    ))),
    ...KNOWLEDGE_ITEMS.map((item) => [normalize(item.href), { event: 'knowledge_open', id: item.id }] as const),
  ]);

  const track = (name: string, data: EventData): boolean => {
    if (!trackerWindow.umami) return false;
    try {
      const result = trackerWindow.umami.track(name, {
        ...data,
        page: window.location.pathname,
        language: getLanguage(window.location.pathname),
      });
      Promise.resolve(result).catch(() => {});
      return true;
    } catch {
      return false;
    }
  };

  const onClick = (event: MouseEvent) => {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const target = event.target instanceof Element ? event.target : null;
    const control = target?.closest<HTMLElement>('a, button');
    if (!control || control.hasAttribute('disabled')) return;
    const source = control.closest('section[id]')?.id
      || control.closest('nav, header, footer, main')?.tagName.toLowerCase() || 'page';
    const position = target?.closest('img') ? 'image'
      : target?.closest('h2, h3, h4') ? 'title' : 'link';
    const explicitEvent = control.dataset.analyticsEvent;
    if (explicitEvent) {
      track(explicitEvent, { value: control.dataset.analyticsValue || '', source });
      return;
    }
    if (!(control instanceof HTMLAnchorElement)) return;
    const url = new URL(control.href);
    if (url.protocol === 'mailto:' || url.protocol === 'tel:') {
      track('contact_click', { channel: url.protocol === 'mailto:' ? 'email' : 'phone', source });
      return;
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
    if (normalize(control.href) === normalize(SOCIAL_LINKS.linkedin)) {
      track('contact_click', { channel: 'linkedin', source });
      return;
    }
    const item = items.get(normalize(control.href));
    if (item) {
      track(item.event, { id: item.id, source, position, destination: url.hostname });
    } else if (url.origin === window.location.origin) {
      const name = /\/resume\.pdf$/.test(url.pathname) ? 'resume_open'
        : /\/(?:demos|spatial-demo)(?:\/|$)/.test(url.pathname) ? 'demo_open' : 'navigation_click';
      // Omit query strings and contact addresses from custom event properties.
      track(name, { target: `${url.pathname}${url.hash}`, source });
    } else {
      track(url.hostname === 'github.com' ? 'github_open' : 'outbound_click', {
        destination: url.hostname, source,
      });
    }
  };

  const reachedDepths = new Set<number>();
  let scrollFrame = 0;
  const onScroll = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      const page = document.scrollingElement;
      if (!page || page.scrollHeight <= page.clientHeight) return;
      const depth = 100 * page.scrollTop / (page.scrollHeight - page.clientHeight);
      for (const threshold of [25, 50, 75, 100]) {
        if (depth >= threshold - 0.1 && !reachedDepths.has(threshold)
          && track('scroll_depth', { percent: threshold })) {
          reachedDepths.add(threshold);
        }
      }
    });
  };

  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('auxclick', onClick, true);
    window.removeEventListener('scroll', onScroll);
    window.cancelAnimationFrame(scrollFrame);
  };
};
