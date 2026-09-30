import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { DAYS_DATA, SKILL_CATEGORIES } from '../data/roadmapData';
import { Sparkles, Award } from 'lucide-react';

export const SkillTracker: React.FC = () => {
  const { isDayCompleted, totalCompletedDays, overallPercentage } = useProgress();

  const getCategoryProgress = (category: string) => {
    let daysInCat = 0;
    let completedInCat = 0;

    DAYS_DATA.forEach(day => {
      // Map 'ml' category or related
      if (category === 'ml') {
        if (day.category === 'ml') {
          daysInCat++;
          if (isDayCompleted(day.day)) completedInCat++;
        }
      } else if (day.category === category) {
        daysInCat++;
        if (isDayCompleted(day.day)) completedInCat++;
      }
    });

    const percent = daysInCat > 0 ? Math.round((completedInCat / daysInCat) * 100) : 0;
    return { completedInCat, daysInCat, percent };
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-brand-blue rounded-lg">
              <Award className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Live Skill Tracker
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time mastery bars computed strictly from completed roadmap days.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Overall:</span>
          <span className="text-sm font-black text-brand-blue">{overallPercentage}%</span>
          <span className="text-xs text-slate-400">({totalCompletedDays}/90 Days)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {SKILL_CATEGORIES.map(skill => {
          const { completedInCat, daysInCat, percent } = getCategoryProgress(skill.id);
          
          return (
            <div key={skill.id} className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: skill.color }}
                  />
                  {skill.label}
                </span>
                <span className="font-semibold text-slate-500">
                  {completedInCat} / {daysInCat} Days ({percent}%)
                </span>
              </div>

              {/* Visual ProgressBar */}
              <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${percent}%`,
                    backgroundColor: percent === 100 ? '#16A34A' : skill.color
                  }}
                />
              </div>

              {/* Text representation requested in PRD (ASCII blocks) */}
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-0.5">
                <span>{skill.daysRange}</span>
                <span className="text-slate-600 font-medium">
                  {Array(10).fill(0).map((_, i) => (
                    <span key={i} className={i < Math.round(percent / 10) ? 'text-brand-blue font-bold' : 'text-slate-300'}>
                      {i < Math.round(percent / 10) ? '█' : '░'}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
