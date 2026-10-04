import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const origin = 'https://dun4ev.com';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Sitemap contains duplicate URLs.');
assert.ok(urls.includes(`${origin}/`) && urls.includes(`${origin}/ru/`), 'Both home-page languages must be in the sitemap.');
const titles = new Set();
const descriptions = new Set();
let internalLinks = 0;
let images = 0;
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map((match) => [match[1].toLowerCase(), match[3]]));
const htmlPath = (url) => resolve('dist', `.${new URL(url).pathname}`, 'index.html');

for (const url of urls) {
  const html = await readFile(htmlPath(url), 'utf8');
  const path = new URL(url).pathname;
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]));
  const canonical = links.filter((link) => link.rel === 'canonical');
  assert.equal(canonical.length, 1, `${path}: exactly one canonical required.`);
  assert.equal(canonical[0].href, url, `${path}: canonical must match the sitemap URL.`);
  const description = meta.filter((item) => item.name === 'description');
  assert.equal(description.length, 1, `${path}: exactly one meta description required.`);
  assert.ok(description[0].content?.length > 30, `${path}: description too short.`);
  assert.ok(!descriptions.has(description[0].content), `${path}: duplicate description.`);
  descriptions.add(description[0].content);
  assert.ok(!meta.some((item) => /noindex/i.test(item.content || '') && item.name === 'robots'), `${path}: indexable page has noindex.`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `${path}: missing or duplicate title.`);
  titles.add(title);
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${path}: exactly one H1 required.`);
  assert.ok(!html.includes('cdn.tailwindcss.com'), `${path}: runtime Tailwind must not load.`);

  if (/^\/(?:ru\/)?(?:projects\/|articles\/|knowledge-base\/)?$/.test(path)) {
    const language = path.startsWith('/ru/') ? 'ru' : 'en';
    assert.ok(html.includes(`lang="${language}"`), `${path}: wrong document language.`);
    assert.ok(html.includes('data-prerendered="true"'), `${path}: missing pre-rendered HTML.`);
    assert.ok(html.includes(language === 'ru' ? 'Андрей' : 'Andrej'), `${path}: missing localized content.`);
    assert.ok(html.includes(language === 'ru' ? 'Главная' : 'Home'), `${path}: missing navigation.`);
    for (const alternateLanguage of ['en', 'ru', 'x-default']) {
      const alternate = links.find((link) => link.hreflang === alternateLanguage);
      assert.ok(alternate && urls.includes(alternate.href), `${path}: invalid ${alternateLanguage} alternate.`);
    }
  }

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const data = JSON.parse(match[1]);
    assert.equal(data['@context'], 'https://schema.org', `${path}: invalid structured data context.`);
    assert.ok(!JSON.stringify(data).includes('FAQPage'), `${path}: FAQ rich results are no longer used.`);
  }
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const { href } = attributes(match[0]);
    if (!href || /^(?:mailto:|tel:|https?:\/\/(?!dun4ev\.com(?:\/|$)))/.test(href)) continue;
    const target = new URL(href, url);
    if (target.origin !== origin) continue;
    const filename = /\.[^/]+$/.test(target.pathname) ? resolve('dist', `.${target.pathname}`) : htmlPath(target);
    await access(filename).catch(() => { throw new Error(`${path}: broken internal link ${href}`); });
    if (target.hash && filename.endsWith('.html')) {
      const targetHtml = await readFile(filename, 'utf8');
      assert.ok(targetHtml.includes(`id="${target.hash.slice(1)}"`) || targetHtml.includes(`id='${target.hash.slice(1)}'`), `${path}: missing fragment ${href}`);
    }
    internalLinks++;
  }
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const image = attributes(match[0]);
    assert.ok('alt' in image, `${path}: image has no alt attribute.`);
    if (image.src?.startsWith('/')) await access(resolve('dist', `.${image.src}`));
    images++;
  }
}
const robots = await readFile('dist/robots.txt', 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!/Disallow:\s*\//.test(robots), 'Googlebot must be allowed to crawl public content.');
const notFound = await readFile('dist/404.html', 'utf8');
assert.ok(!notFound.includes('window.location'), 'Unknown URLs must not redirect to the home page.');
assert.ok(notFound.includes('noindex,follow'));
console.log(`SEO checks passed: ${urls.length} pages, ${internalLinks} internal links and ${images} images; metadata, languages, sitemap and 404 behavior verified.`);
