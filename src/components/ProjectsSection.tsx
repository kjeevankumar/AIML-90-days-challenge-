import React, { useState } from 'react';
import { PROJECTS, getPhaseByDay } from '../data/roadmapData';
import { ProjectInfo } from '../types/roadmap';
import { ProjectModal } from './ProjectModal';
import { useProgress } from '../context/ProgressContext';
import { CheckCircle2, ArrowRight, Layers, Star, ExternalLink, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  onGoToDay: (day: number) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onGoToDay }) => {
  const { isDayCompleted } = useProgress();
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Portfolio Building
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          9 Major AI/ML Projects
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Build practical, demonstrable applications throughout the 90 days. Graduate with a rock-solid GitHub portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project) => {
          const isDone = isDayCompleted(project.day);
          const phase = getPhaseByDay(project.day);

          return (
            <div
              key={project.id}
              className={`bg-white rounded-3xl border transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:shadow-lg ${
                isDone 
                  ? 'border-green-300 ring-1 ring-green-100' 
                  : project.number === 9 
                  ? 'border-amber-300 ring-1 ring-amber-100 bg-gradient-to-b from-white to-amber-50/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-blue bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    PROJECT {project.number.toString().padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      Day {project.day}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      project.difficulty === 'Beginner'
                        ? 'bg-green-50 text-brand-green border border-green-200'
                        : project.difficulty === 'Intermediate'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Phase {phase?.numberStr}: {phase?.title}
                  </p>
                </div>

                {/* Outcome */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {project.outcome}
                </p>

                {/* Architecture Step visual */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-700 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                    <Layers className="w-3 h-3 text-brand-blue" />
                    Architecture Flow
                  </span>
                  <p className="font-mono text-slate-800 font-medium truncate">
                    {project.architecture.steps.join(' ➔ ')}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="text-[10px] text-slate-400 px-1 py-0.5">
                      +{project.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer / Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {isDone ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-green">
                    <CheckCircle2 className="w-4 h-4" />
                    Completed
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400">
                    Not Completed
                  </span>
                )}

                <button
                  onClick={() => setSelectedProject(project)}
                  className="py-1.5 px-3.5 bg-slate-900 hover:bg-brand-blue text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>VIEW PROJECT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onGoToDay={onGoToDay}
      />
    </div>
  );
};
