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

    return (
      <text x={x} y={y} textAnchor={textAnchor} fill="#94a3b8" fontSize={11}>
        <tspan x={x} dy="-0.35em">{label}</tspan>
        <tspan x={x} dy="1.3em">{detail}</tspan>
      </text>
    );
  };

  return (
    <div
      className="-mx-6 mt-8 mb-12 h-[300px] w-[calc(100%+3rem)] cursor-pointer sm:mx-0 sm:w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h4 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider text-center">Competency Overview</h4>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={isMobile ? '68%' : '80%'} data={metrics}>
          <PolarGrid stroke="#334155" className={radarClass} />
          <PolarAngleAxis
            dataKey="name"
            tick={renderMetricTick}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#64ffda"
            strokeWidth={2}
            fill="#64ffda"
            fillOpacity={0.3}
            className={radarClass}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
