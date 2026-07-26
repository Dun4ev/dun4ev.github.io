import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ExperienceStage, Job } from '../types';
import { ExperienceCard } from './ExperienceCard';

interface Props {
  stage: ExperienceStage;
  jobs: Job[];
}

export const ExperienceStageCard: React.FC<Props> = ({ stage, jobs }) => {
  const { t } = useTranslation();
  const translationKey = `experience.stages.${stage.id}`;

  return (
    <details className="group rounded-xl border border-slate-800/80 bg-slate-900/30 transition-colors open:border-slate-700 open:bg-slate-900/50">
      <summary className="list-none cursor-pointer rounded-xl px-4 py-5 transition-colors hover:bg-slate-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-300 sm:px-6 sm:py-6 [&::-webkit-details-marker]:hidden">
        <div className="grid sm:grid-cols-8 sm:gap-8 md:gap-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 sm:mb-0 sm:mt-1">
            {t(`${translationKey}.period`)}
          </div>

          <div className="sm:col-span-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold leading-snug text-slate-200">
                {t(`${translationKey}.title`)}
              </h3>
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors group-hover:border-teal-300/50 group-hover:text-teal-300">
                <ChevronDown className="h-4 w-4 transition-transform duration-200 motion-reduce:transition-none group-open:rotate-180" />
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {t(`${translationKey}.summary`)}
            </p>

            <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wide text-teal-300">
              {t('experience.stages.toggle')}
            </span>
          </div>
        </div>
      </summary>

      <div className="border-t border-slate-800/80 px-4 pb-1 pt-8 sm:px-6 sm:pt-10">
        <div className="group/list">
          {jobs.map((job) => (
            <div key={job.id} className="mb-12 last:mb-8">
              <ExperienceCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </details>
  );
};
