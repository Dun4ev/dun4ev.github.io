import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Project } from '../types';

const resolveImageSrc = (imagePath?: string) => {
  if (!imagePath) {
    return undefined;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  return `${normalizedBase}${normalizedPath}`;
};

interface ProjectGridCardProps {
  project: Project;
}

export const ProjectGridCard: React.FC<ProjectGridCardProps> = ({ project }) => {
  const { t } = useTranslation();
  const imageSrc = resolveImageSrc(project.image);
  const title = t(`projects.items.${project.id}.title`);
  const description = t(`projects.items.${project.id}.description`);
  const impact = t(`projects.items.${project.id}.impact`, { defaultValue: project.impact || '' });

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/70 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/50 hover:bg-slate-800/70 hover:shadow-2xl hover:shadow-teal-950/20">
      {imageSrc && (
        <a href={project.link} target="_blank" rel="noreferrer" className="block overflow-hidden border-b border-slate-800">
          <img
            src={imageSrc}
            alt={title}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </a>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {project.category && (
            <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs font-medium text-teal-300">
              {project.category}
            </span>
          )}
          {project.status && (
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-400">
              {project.status}
            </span>
          )}
        </div>

        <h2 className="text-lg font-semibold leading-snug text-slate-100">
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 hover:text-teal-300">
            {title}
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>

        {impact && (
          <p className="mt-4 border-l border-teal-300/30 pl-3 text-sm font-medium leading-6 text-slate-300">
            {impact}
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('projectsPage.card_tools')}>
          {project.tools.map((tool) => (
            <li key={tool} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              {tool}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-teal-300"
          >
            <Github className="h-4 w-4" />
            {t('projectsPage.view_project')}
          </a>
        </div>
      </div>
    </article>
  );
};
