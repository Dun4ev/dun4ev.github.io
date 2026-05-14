import React from 'react';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { KNOWLEDGE_ITEMS } from '../constants';
import { KnowledgeItem } from '../types';

const resolveHref = (href: string) => {
  if (/^https?:\/\//i.test(href)) {
    return href;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = href.startsWith('/') ? href.slice(1) : href;

  return `${normalizedBase}${normalizedPath}`;
};

interface KnowledgeBasePageProps {
  onNavigate: (path: string) => void;
}

interface KnowledgeCardProps {
  item: KnowledgeItem;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ item }) => {
  const { t } = useTranslation();
  const href = resolveHref(item.href);

  return (
    <article className="group flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-slate-800/70 hover:shadow-2xl hover:shadow-cyan-950/20">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
          <BookOpen className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-400">
          {item.format}
        </span>
      </div>

      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-300">{item.category}</p>
      <h2 className="text-xl font-semibold leading-snug text-slate-100">
        {t(`knowledge.items.${item.id}.title`)}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {t(`knowledge.items.${item.id}.description`)}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('knowledgePage.tags_label')}>
        {item.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-cyan-300"
        >
          {t('knowledgePage.open_item')}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
};

export const KnowledgeBasePage: React.FC<KnowledgeBasePageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-6 py-10 font-sans md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('knowledgePage.back_home')}
        </button>

        <section className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-300">
            {t('knowledgePage.eyebrow')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            {t('knowledgePage.title')}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            {t('knowledgePage.description')}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label={t('knowledgePage.grid_label')}>
          {KNOWLEDGE_ITEMS.map((item) => (
            <KnowledgeCard key={item.id} item={item} />
          ))}
        </section>
      </div>
    </main>
  );
};
