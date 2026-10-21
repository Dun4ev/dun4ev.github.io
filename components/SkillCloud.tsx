import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraphData } from '../types';

interface SkillCloudProps {
    data: GraphData;
}

export const SkillCloud: React.FC<SkillCloudProps> = ({ data }) => {
    const { t } = useTranslation();

    // Group nodes by category
    const engineering = data.nodes.filter(n => n.group === 1 && n.id !== "Engineering");
    const dataTech = data.nodes.filter(n => n.group === 2 && n.id !== "Data & AI");
    const management = data.nodes.filter(n => n.group === 3 && n.id !== "Project Mgmt");

    const renderGroup = (title: string, skills: typeof engineering) => (
        <div className="group transition-all duration-300 hover:bg-slate-800/50 p-3 rounded-lg hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 text-slate-200 flex items-center gap-2">
                {title}
            </h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={skill.id}
                        className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-[13px] font-medium leading-5 text-teal-300 border border-teal-300/20 tech-tag-animate transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-400/20 hover:shadow-[0_0_10px_rgb(var(--teal-300)/0.2)] cursor-default"
                        style={{ animationDelay: `${index * 0.4}s` }}
                    >
                        {skill.id}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="my-6">
            <div className="space-y-4">
                {renderGroup(t('skills.groups.engineering'), engineering)}
                {renderGroup(t('skills.groups.data'), dataTech)}
                {renderGroup(t('skills.groups.management'), management)}
            </div>
        </div>
    );
};
