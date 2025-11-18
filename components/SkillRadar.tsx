import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis
} from 'recharts';
import { SKILL_METRICS } from '../constants';

export const SkillRadar: React.FC = () => {
  return (
    <div className="h-[300px] w-full mt-8 mb-12">
        <h4 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider text-center">Competency Overview</h4>
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_METRICS}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8', fontSize: 11 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
                name="Skills"
                dataKey="value"
                stroke="#64ffda"
                strokeWidth={2}
                fill="#64ffda"
                fillOpacity={0.3}
            />
            </RadarChart>
        </ResponsiveContainer>
    </div>
  );
};