import React, { useEffect, useMemo, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  firstDay: string;
  contributionDays: ContributionDay[];
}

interface ContributionData {
  username: string;
  name: string | null;
  url: string;
  generatedAt: string | null;
  totalContributions: number | null;
  weeks: ContributionWeek[];
}

const resolveDataUrl = () => {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return `${normalizedBase}data/github-contributions.json`;
};

const formatMonth = (date: string) => {
  return new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(date));
};

const visibleWeekCount = 26;

export const GitHubContributions: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ContributionData | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(resolveDataUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load contribution data: ${response.status}`);
        }

        return response.json();
      })
      .then((payload: ContributionData) => {
        if (isMounted) {
          setData(payload);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleWeeks = useMemo(() => {
    if (!data?.weeks.length) {
      return [];
    }

    return data.weeks.slice(-visibleWeekCount);
  }, [data]);

  const monthLabels = useMemo(() => {
    if (!visibleWeeks.length) {
      return [];
    }

    let previousMonth = '';

    return visibleWeeks.map((week) => {
      const firstDay = week.contributionDays[0]?.date || week.firstDay;
      const month = formatMonth(firstDay);
      const label = month !== previousMonth ? month : '';
      previousMonth = month;

      return label;
    });
  }, [visibleWeeks]);

  const hasCalendar = Boolean(visibleWeeks.length);

  return (
    <div className="mb-10 rounded-lg border border-slate-800 bg-slate-900/70 p-4 transition-colors hover:border-teal-300/40 hover:bg-slate-800/60">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-300">
            <Github className="h-4 w-4" />
            {t('githubActivity.eyebrow')}
          </p>
          <h3 className="text-lg font-semibold leading-snug text-slate-100">
            {data?.totalContributions != null
              ? t('githubActivity.total', { count: data.totalContributions })
              : t('githubActivity.pending')}
          </h3>
          {hasError && (
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t('githubActivity.error')}
            </p>
          )}
        </div>

        <a
          href={data?.url || 'https://github.com/Dun4ev'}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-max items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-teal-300"
        >
          {t('githubActivity.view_profile')}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {hasCalendar ? (
        <div className="pb-1">
          <div className="w-full max-w-[360px]">
            <div className="mb-1.5 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${visibleWeeks.length}, minmax(0, 1fr))` }}>
              {monthLabels.map((label, index) => (
                <span key={`${label}-${index}`} className="h-4 text-[10px] leading-4 text-slate-500">
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
                      date: day.date,
                    })}
                    className="aspect-square w-full rounded-[2px] border border-slate-900/40"
                    style={{ backgroundColor: day.color }}
                  />
                ))
              )}
            </div>
            <div className="mt-2 flex items-center justify-start gap-2 text-xs text-slate-500">
              <span>{t('githubActivity.less')}</span>
              {['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'].map((color) => (
                <span key={color} className="h-3 w-3 rounded-sm border border-slate-900/40" style={{ backgroundColor: color }} />
              ))}
              <span>{t('githubActivity.more')}</span>
            </div>
            <p className="mt-1.5 text-[11px] font-medium leading-4 text-slate-500">
              {t('githubActivity.visible_period')}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-400">
          {t('githubActivity.no_data')}
        </div>
      )}
    </div>
  );
};
