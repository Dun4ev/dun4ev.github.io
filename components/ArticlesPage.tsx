import React from 'react';
import { ArrowLeft, ArrowUpRight, BookMarked, Clock3, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ARTICLES } from '../constants';
import { ArticleItem } from '../types';

interface ArticlesPageProps {
  onNavigate: (path: string) => void;
}

interface ArticleCardProps {
  article: ArticleItem;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const { t } = useTranslation();
  const progressLabels = ['L0', 'L3', 'L6', 'L9', 'L11'];

  return (
    <article
      className="group flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/50 hover:bg-slate-800/70 hover:shadow-2xl hover:shadow-amber-950/20"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-amber-300/20 bg-amber-300/10 text-amber-300">
          <BookMarked className="h-5 w-5" />
        </div>
        <div className="text-right text-xs font-semibold text-slate-500">
          <div>{article.date}</div>
          <div className="mt-1 inline-flex items-center gap-1">
            <Clock3 className="h-3 w-3" />
            {article.readTime}
          </div>
        </div>
      </div>

      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-300">{article.category}</p>
      <h2 className="text-xl font-semibold leading-snug text-slate-100">
        {t(`articles.items.${article.id}.title`)}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {t(`articles.items.${article.id}.description`)}
      </p>

      <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950/40 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-200">
          <Sparkles className="h-3.5 w-3.5" />
          {t('articlesPage.highlight_label')}
        </div>
        <p className="text-sm leading-6 text-slate-300">{article.highlight}</p>
        {article.id === 'it-levels-l0-l11' && (
          <div className="mt-4 grid grid-cols-5 gap-2" aria-label={t('articlesPage.levels_label')}>
            {progressLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-center text-xs font-bold text-amber-100 transition-colors group-hover:border-amber-300/40 group-hover:bg-amber-300/20"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('articlesPage.tags_label')}>
        {article.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <a
          href={article.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-amber-300"
        >
          {t('articlesPage.open_item')}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </article>
  );
};

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-6 py-10 font-sans md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-amber-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('articlesPage.back_home')}
        </button>

        <section className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-300">
            {t('articlesPage.eyebrow')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            {t('articlesPage.title')}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            {t('articlesPage.description')}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label={t('articlesPage.grid_label')}>
          {ARTICLES.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </section>
      </div>
    </main>
  );
};
