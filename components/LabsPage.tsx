import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, FlaskConical, MonitorPlay } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LABS } from '../constants';
import { LabItem } from '../types';

interface LabsPageProps {
  onNavigate: (path: string) => void;
}

interface LabCardProps {
  lab: LabItem;
  index: number;
}

export const LabCard: React.FC<LabCardProps> = ({ lab, index }) => {
  const { t } = useTranslation();
  const title = t(`labs.items.${lab.id}.title`);
  const description = t(`labs.items.${lab.id}.description`);
  const category = t(`labs.items.${lab.id}.category`, { defaultValue: lab.category });
  const status = t(`labs.items.${lab.id}.status`, { defaultValue: lab.status });
  const highlight = t(`labs.items.${lab.id}.highlight`, { defaultValue: lab.highlight });

  return (
    <article
      className="group flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/50 hover:bg-slate-800/70 hover:shadow-2xl hover:shadow-violet-950/20"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-violet-300/20 bg-violet-300/10 text-violet-300">
          <MonitorPlay className="h-5 w-5" />
        </div>
        <div className="text-right text-xs font-semibold text-slate-500">
          <div>{lab.date}</div>
          <div className="mt-1">{status}</div>
        </div>
      </div>

      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-300">{category}</p>
      <h2 className="text-xl font-semibold leading-snug text-slate-100">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <p className="mt-5 border-l border-violet-300/30 pl-3 text-sm font-medium leading-6 text-slate-300">
        {highlight}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('labsPage.tags_label')}>
        {lab.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <a
          href={lab.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-violet-300"
        >
          {t('labsPage.open_item')}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </article>
  );
};

const categoryTranslationKey = (category: string) =>
  `labsPage.category_${category.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`;

export const LabsPage: React.FC<LabsPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(LABS.map((lab) => lab.category)))],
    []
  );

  const visibleLabs = activeCategory === 'All'
    ? LABS
    : LABS.filter((lab) => lab.category === activeCategory);

  return (
    <main className="min-h-screen px-6 py-10 font-sans md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('labsPage.back_home')}
        </button>

        <section className="mb-10 max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-violet-300">
            <FlaskConical className="h-4 w-4" />
            {t('labsPage.eyebrow')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            {t('labsPage.title')}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            {t('labsPage.description')}
          </p>
        </section>

        <div className="mb-8 flex flex-wrap gap-2" aria-label={t('labsPage.filters_label')}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'border-violet-300 bg-violet-300/10 text-violet-200'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              {category === 'All' ? t('labsPage.all_filter') : t(categoryTranslationKey(category), { defaultValue: category })}
            </button>
          ))}
        </div>

        <section className="grid gap-5 md:grid-cols-2" aria-label={t('labsPage.grid_label')}>
          {visibleLabs.map((lab, index) => (
            <LabCard key={lab.id} lab={lab} index={index} />
          ))}
        </section>

        <footer className="mt-12 border-t border-slate-800 pt-8 text-sm text-slate-500">
          <a
            href="https://dun4ev.github.io"
            className="transition-colors hover:text-violet-300"
          >
            Dun4ev
          </a>
        </footer>
      </div>
    </main>
  );
};
