import React from 'react';
import { Job } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  job: Job;
}

export const ExperienceCard: React.FC<Props> = ({ job }) => {
  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
        {job.period}
      </header>
      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug text-slate-200">
          <div>
            <a
              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
              href="#"
              aria-label={`${job.title} at ${job.company}`}
            >
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
              <span>
                {job.title} ·{' '}
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
        <ul className="mt-2 text-sm leading-normal text-slate-400 list-disc ml-4 space-y-2">
            {job.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
            ))}
        </ul>
        <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
          {job.technologies.map((tech) => (
            <li key={tech} className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                {tech}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};