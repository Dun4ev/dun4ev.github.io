import React, { useState } from 'react';
import { ArrowLeft, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LABS, PROJECTS } from '../constants';
import { LabCard } from './LabsPage';
import { ProjectGridCard } from './ProjectGridCard';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'engineering', 'interactive', 'presentations'] as const;
  const visibleProjects = activeFilter === 'all' || activeFilter === 'engineering' ? PROJECTS : [];
  const visibleLabs = activeFilter === 'all'
    ? LABS
    : LABS.filter((lab) => {
        if (activeFilter === 'interactive') {
          return lab.category === 'Interactive Demo' || lab.category === 'Engineering Concept';
        }

        return lab.category === 'Business Presentation' || lab.category === 'Engineering Report';
      });

  return (
    <main className="min-h-screen px-6 py-10 font-sans md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-teal-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('projectsPage.back_home')}
        </button>

        <section className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-teal-300">
            {t('projectsPage.eyebrow')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            {t('projectsPage.title')}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            {t('projectsPage.description')}
          </p>
        </section>

        <div className="mb-8 flex flex-wrap gap-2" aria-label={t('projectsPage.filters_label')}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                activeFilter === filter
                  ? 'border-teal-300 bg-teal-300/10 text-teal-200'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              {t(`projectsPage.filter_${filter}`)}
            </button>
          ))}
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label={t('projectsPage.grid_label')}>
          {visibleProjects.map((project) => (
            <ProjectGridCard key={project.id} project={project} />
          ))}
          {visibleLabs.map((lab, index) => (
            <LabCard key={lab.id} lab={lab} index={index} />
          ))}
        </section>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <a
            href="https://github.com/Dun4ev?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-teal-300"
          >
            <Github className="h-4 w-4" />
            {t('projectsPage.github_archive')}
          </a>
        </div>
      </div>
    </main>
  );
};
