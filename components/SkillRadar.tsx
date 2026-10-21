import React, { useState, useRef, useEffect } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { SKILL_METRICS } from '../constants';

interface RadarTickProps {
  x: number;
  y: number;
  textAnchor?: 'start' | 'middle' | 'end';
  payload: { value: string };
}

export const SkillRadar: React.FC = () => {
  const { t } = useTranslation();
  const [isRotating, setIsRotating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsRotating(false);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsRotating(true);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  const radarClass = `radar-web-base ${isRotating ? 'radar-rotate-web' : 'radar-web-static'}`;
  const metrics = SKILL_METRICS.map((metric) => ({
    ...metric,
    name: t(`radar.metrics.${metric.name}`),
  }));
  const renderMetricTick = ({ x, y, textAnchor = 'middle', payload }: RadarTickProps) => {
    const [label, detail] = payload.value.split('\n');

    const wrap = (text: string, limit: number) => text.split(' ').reduce<string[]>((lines, word) => {
      const last = lines.length - 1;
      if (last >= 0 && `${lines[last]} ${word}`.length <= limit) lines[last] += ` ${word}`;
      else lines.push(word);
      return lines;
    }, []);
    const lines = [...wrap(label, isMobile ? 14 : 20), ...wrap(detail || '', isMobile ? 17 : 22)];
    return (
      <text x={x} y={y} textAnchor={textAnchor} fill="rgb(var(--slate-300))" fontSize={isMobile ? 12 : 13}>
        {lines.map((line, index) => (
          <tspan key={index} x={x} dy={index === 0 ? `${-(lines.length - 1) * 0.65}em` : '1.3em'}>{line}</tspan>
        ))}
      </text>
    );
  };

  return (
    <div
      className="-mx-6 mt-8 mb-0 w-[calc(100%+3rem)] cursor-pointer sm:mx-0 sm:w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h4 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider text-center">{t('radar.title')}</h4>
      <div className="h-[340px] sm:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={isMobile ? '48%' : '66%'} data={metrics}>
          <PolarGrid stroke="rgb(var(--slate-700))" className={radarClass} />
          <PolarAngleAxis
            dataKey="name"
            tick={renderMetricTick}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="rgb(var(--teal))"
            strokeWidth={2}
            fill="rgb(var(--teal))"
            fillOpacity={0.3}
            className={radarClass}
          />
        </RadarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};
