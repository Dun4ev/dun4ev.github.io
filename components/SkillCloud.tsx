import React from 'react';
import { GraphData } from '../types';

interface SkillCloudProps {
    data: GraphData;
}

export const SkillCloud: React.FC<SkillCloudProps> = ({ data }) => {
    // Group nodes by category
    const engineering = data.nodes.filter(n => n.group === 1);
    const dataTech = data.nodes.filter(n => n.group === 2);
    const management = data.nodes.filter(n => n.group === 3);

    const renderGroup = (title: string, skills: typeof engineering) => (
        <div className="mb-6 last:mb-0 group transition-all duration-300 hover:bg-slate-800/50 p-4 rounded-lg hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg">
            <h5 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-200 flex items-center gap-2">
                {title}
            </h5>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={skill.id}
                        className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 border border-teal-300/20 tech-tag-animate transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-400/20 hover:shadow-[0_0_10px_rgba(94,234,212,0.2)] cursor-default"
                        style={{ animationDelay: `${index * 0.4}s` }}
                    >
                        {skill.id}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="my-8">
            <h4 className="text-sm font-semibold text-slate-200 mb-6 uppercase tracking-wider">Core Competencies</h4>

            <div className="space-y-2">
                {renderGroup("Engineering & Design", engineering)}
                {renderGroup("Data & Automation", dataTech)}
                {renderGroup("Management & Strategy", management)}
            </div>
        </div>
    );
};
