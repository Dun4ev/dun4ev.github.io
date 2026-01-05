import React from 'react';
import { Project } from '../types';
import { Folder, Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Ensure local assets respect the GitHub Pages base path
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

interface Props {
  project: Project;
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const imageSrc = resolveImageSrc(project.image);
  const { t } = useTranslation();

  return (
    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>


      {/* Project Image Column */}
      <div className="z-10 sm:col-span-2 mt-1">
        {imageSrc ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-700 group-hover:border-teal-300/50 transition-colors">
            <img
              src={imageSrc}
              alt={t(`projects.items.${project.id}.title`)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 mt-1 rounded bg-slate-800/50 border border-slate-700 text-teal-300 group-hover:border-teal-300/50 transition-colors">
            <Folder className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug text-slate-200">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
          >
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
            <span>
              {t(`projects.items.${project.id}.title`)}
              <span className="inline-block ml-1">
                <ExternalLink className="h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
              </span>
            </span>
          </a>
        </h3>
        <p className="mt-2 text-sm leading-normal text-slate-400">
          {t(`projects.items.${project.id}.description`)}
        </p>
        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
          {project.tools.map((tech, index) => (
            <li key={tech} className="mr-1.5 mt-2">
              <div
                className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 border border-teal-300/10 tech-tag-animate"
                style={{ animationDelay: `${index * 0.8}s` }}
              >
                {tech}
              </div>
            </li>
          ))}
        </ul>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center text-sm font-medium text-slate-400 hover:text-teal-300 transition-colors w-max relative z-10"
          >
            <Github className="w-4 h-4 mr-2" />
            <span>View on GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
};
