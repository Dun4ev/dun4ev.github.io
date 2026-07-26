import React, { useEffect, useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ExperienceStage, Job } from '../types';
import BorderGlow from './BorderGlow';
import { ExperienceCard } from './ExperienceCard';

interface Props {
  stage: ExperienceStage;
  jobs: Job[];
}

export const ExperienceStageCard: React.FC<Props> = ({ stage, jobs }) => {
  const { t } = useTranslation();
  const translationKey = `experience.stages.${stage.id}`;
  const contentId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpandedSettled, setIsExpandedSettled] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsExpandedSettled(false);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsExpandedSettled(true);
      return;
    }

    const timer = window.setTimeout(() => setIsExpandedSettled(true), 750);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const toggleStage = () => {
    setIsExpandedSettled(false);
    setIsOpen((current) => !current);
  };

  return (
    <BorderGlow
      className="experience-stage-glow"
      edgeSensitivity={28}
      glowColor="169 75 64"
      backgroundColor="#0f172a"
      borderRadius={12}
      glowRadius={26}
      glowIntensity={0.7}
      coneSpread={22}
      colors={['#5eead4', '#2dd4bf', '#38bdf8']}
      fillOpacity={0.24}
    >
      <div className={`rounded-xl bg-transparent transition-colors ${isOpen ? 'bg-slate-900/50' : ''}`}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={toggleStage}
          className="group w-full cursor-pointer rounded-xl px-4 py-5 text-left transition-colors hover:bg-slate-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-300 sm:px-6 sm:py-6"
        >
          <div className="grid sm:grid-cols-10 sm:gap-6 md:gap-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 sm:mb-0 sm:mt-1">
              {t(`${translationKey}.period`)}
            </div>

            <div className="sm:col-span-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold leading-snug text-slate-200">
                  {t(`${translationKey}.title`)}
                </h3>
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors group-hover:border-teal-300/50 group-hover:text-teal-300">
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {t(`${translationKey}.summary`)}
              </p>

              <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wide text-teal-300">
                {t(isOpen ? 'experience.stages.collapse' : 'experience.stages.toggle')}
              </span>
            </div>
          </div>
        </button>

        <div
          id={contentId}
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-[750ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          } ${isOpen && isExpandedSettled ? 'overflow-visible' : 'overflow-hidden'}`}
        >
          <div className="min-h-0">
            <div className="border-t border-slate-800/80 px-4 pb-1 pt-8 sm:px-6 sm:pt-10">
              <div className="group/list">
                {jobs.map((job) => (
                  <div key={job.id} className="mb-12 last:mb-8">
                    <ExperienceCard job={job} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BorderGlow>
  );
};
