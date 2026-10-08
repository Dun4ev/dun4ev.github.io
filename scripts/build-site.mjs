import { build } from 'vite';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

await build();
await build({ build: { ssr: 'entry-server.tsx', outDir: 'dist-ssr' } });
const { render, INDEXABLE_PATHS } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
const analyticsScript = template.match(/<script\b[^>]*src="https:\/\/cloud\.umami\.is\/script\.js"[^>]*><\/script>/)?.[0];
if (!analyticsScript) throw new Error('Missing Umami tracker in the HTML template.');
if (!template.includes('<!--seo:start-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('Missing SEO or React root marker in the HTML template.');
}

for (const pathname of [...INDEXABLE_PATHS, '/spatial-demo/']) {
  const { body, head, language } = render(pathname);
  const metadata = pathname === '/spatial-demo/'
    ? `<title>Spatial navigation demo | Andrej Dunaev</title>
<meta name="description" content="An interactive exploration of Andrej Dunaev's engineering experience, projects and publications." />
<link rel="canonical" href="https://dun4ev.com/spatial-demo/" />`
    : head;
  const html = template.replace(/lang="en"/, `lang="${language}"`)
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n${metadata}\n<!--seo:end-->`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${body}</div>`);
  const directory = resolve('dist', `.${pathname}`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}

// Preserve old Labs URLs with a single transition and a canonical destination.
for (const language of ['en', 'ru']) {
  const prefix = language === 'ru' ? '/ru' : '';
  const target = `${prefix}/projects/`;
  const directory = resolve('dist', `.${prefix}/labs/`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), `<!doctype html><html lang="${language}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${language === 'ru' ? 'Проекты' : 'Projects'} | Andrej Dunaev</title>
<meta name="robots" content="noindex,follow"><link rel="canonical" href="https://dun4ev.com${target}">
<meta http-equiv="refresh" content="0;url=${target}"></head><body>
<a href="${target}">${language === 'ru' ? 'Перейти к проектам' : 'View projects'}</a>
</body></html>`);
}

// Discover indexable HTML after rendering, so new standalone pages join the sitemap.
const htmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const filename = resolve(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(filename) : entry.name.endsWith('.html') ? [filename] : [];
  }));
  return files.flat();
};
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map((match) => [match[1].toLowerCase(), match[3]]));
const xml = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const entries = [];
for (const filename of await htmlFiles(resolve('dist'))) {
  let html = await readFile(filename, 'utf8');
  // Standalone articles, notes and demos do not use the React HTML template.
  if (!html.includes('cloud.umami.is/script.js') && /<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${analyticsScript}\n</head>`);
    await writeFile(filename, html);
  }
  const metadata = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]));
  if (metadata.some((meta) => meta.name === 'robots' && /noindex/i.test(meta.content || ''))) continue;
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]));
  const canonical = links.find((link) => link.rel === 'canonical')?.href;
  if (!canonical) throw new Error(`Missing canonical in ${filename}`);
  const pathname = '/' + relative(resolve('dist'), filename).replaceAll('\\', '/').replace(/index\.html$/, '');
  if (canonical !== `https://dun4ev.com${pathname}`) throw new Error(`Canonical does not match output path: ${filename}`);
  const alternates = links.filter((link) => link.rel === 'alternate' && link.hreflang).map((link) => (
    `<xhtml:link rel="alternate" hreflang="${xml(link.hreflang)}" href="${xml(link.href)}" />`
  )).join('');
  entries.push(`<url><loc>${xml(canonical)}</loc>${alternates}</url>`);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.sort().join('\n')}
</urlset>\n`);
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: https://dun4ev.com/sitemap.xml\n');
console.log(`Generated ${INDEXABLE_PATHS.length} localized pages, a navigation demo, aliases and a ${entries.length}-URL sitemap.`);
