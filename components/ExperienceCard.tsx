import React from 'react';
import { Job } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  job: Job;
}

export const ExperienceCard: React.FC<Props> = ({ job }) => {
  const { t } = useTranslation();

  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-10 sm:gap-6 md:gap-5 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
        {job.period}
      </header>
      <div className="z-10 sm:col-span-8">
        <h3 className="font-medium leading-snug text-slate-200">
          <div>
            <a
              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
              href="#"
              aria-label={`${t(`experience.jobs.${job.id}.title`)} at ${job.company}`}
            >
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
              <span>
                {t(`experience.jobs.${job.id}.title`)} ·{' '}
                <span className="inline-block">
                  {job.company}
                  <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1" />
                </span>
              </span>
            </a>
          </div>
          <div className="text-slate-500 text-xs font-normal mt-1">
            {job.location}
          </div>
        </h3>
        <ul className="ml-4 mt-3 list-disc space-y-2.5 text-[0.9375rem] leading-relaxed text-slate-400">
          {t(`experience.jobs.${job.id}.description`, { returnObjects: true }) instanceof Array &&
            (t(`experience.jobs.${job.id}.description`, { returnObjects: true }) as string[]).map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
        </ul>
        <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
          {job.technologies.map((tech, index) => (
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
      </div>
    </div>
  );
};
