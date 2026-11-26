import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import data from '../public/data/github-contributions.json';

const visibleWeeks = data.weeks.slice(-26);
const zeroDay = data.weeks.flatMap((week) => week.contributionDays).find((day) => day.contributionCount === 0);
const legendColors = [zeroDay?.color ?? '#ebedf0', ...data.colors];

export const GitHubContributions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || 'en';
  const monthFormat = new Intl.DateTimeFormat(language, { month: 'short', timeZone: 'UTC' });
  const dayFormat = new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' });
  const updatedFormat = new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' });

  const months = visibleWeeks.map((week) => monthFormat.format(new Date(week.firstDay)));
  const monthLabels = months.map((month, index) => months[index - 1] === month ? '' : month);
  // Omit a short leading month when its label would overlap the next month.
  const nextMonth = monthLabels.findIndex((label, index) => index > 0 && label);
  if (nextMonth > 0 && nextMonth < 3) monthLabels[0] = '';

  return (
    <div className="mb-10 rounded-lg border border-slate-800 bg-slate-900/70 p-4 transition-colors hover:border-teal-300/40 hover:bg-slate-800/60">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-300">
            <Github className="h-4 w-4" />
            {t('githubActivity.eyebrow')}
          </p>
          {data.totalContributions != null && (
            <h3 className="text-lg font-semibold leading-snug text-slate-100">
              {t('githubActivity.total', { count: data.totalContributions })}
            </h3>
          )}
          {data.generatedAt && (
            <p className="mt-1 text-xs text-slate-400">
              <time dateTime={data.generatedAt}>
                {t('githubActivity.updated', { date: updatedFormat.format(new Date(data.generatedAt)) })}
              </time>
            </p>
          )}
        </div>

        <a
          href={data.url || 'https://github.com/Dun4ev'}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-max items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-teal-300"
        >
          {t('githubActivity.view_profile')}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {visibleWeeks.length > 0 ? (
        <div className="min-h-[180px] pb-1">
          <div className="w-full max-w-[360px]">
            <div className="mb-1.5 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${visibleWeeks.length}, minmax(0, 1fr))` }}>
              {monthLabels.map((label, index) => (
                <span key={`${label}-${index}`} className="h-4 text-xs leading-4 text-slate-500">
                  {label}
                </span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]" aria-label={t('githubActivity.calendar_label')}>
              {visibleWeeks.flatMap((week) =>
                week.contributionDays.map((day) => (
                  <span
                    key={day.date}
                    title={t('githubActivity.day_title', {
                      count: day.contributionCount,
                      date: dayFormat.format(new Date(day.date)),
                    })}
                    className="aspect-square w-full rounded-[2px] border border-slate-900/40"
                    style={{ backgroundColor: day.color }}
                  />
                ))
              )}
            </div>
            <div className="mt-2 flex items-center justify-start gap-2 text-xs text-slate-500">
              <span>{t('githubActivity.less')}</span>
              {legendColors.map((color) => (
                <span key={color} className="h-3 w-3 rounded-sm border border-slate-900/40" style={{ backgroundColor: color }} />
              ))}
              <span>{t('githubActivity.more')}</span>
            </div>
            <p className="mt-1.5 text-[13px] font-medium leading-5 text-slate-500">
              {t('githubActivity.visible_period')}
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-[180px] rounded-md border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
          {t('githubActivity.no_data')}
        </div>
      )}
    </div>
  );
};
