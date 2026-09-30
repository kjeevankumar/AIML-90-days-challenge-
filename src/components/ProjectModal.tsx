import React from 'react';
import { X, CheckCircle2, ArrowRight, ExternalLink, Code2, Layers, Cpu, GitBranch } from 'lucide-react';
import { ProjectInfo } from '../types/roadmap';
import { useProgress } from '../context/ProgressContext';
import { getPhaseByDay } from '../data/roadmapData';

interface ProjectModalProps {
  project: ProjectInfo | null;
  onClose: () => void;
  onGoToDay: (day: number) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onGoToDay }) => {
  const { isDayCompleted } = useProgress();

  if (!project) return null;

  const isCompleted = isDayCompleted(project.day);
  const phase = getPhaseByDay(project.day);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto p-5 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-brand-blue">
                Project {project.number.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Day {project.day} • Phase {phase?.numberStr}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                project.difficulty === 'Beginner' 
                  ? 'bg-green-100 text-green-800' 
                  : project.difficulty === 'Intermediate'
                  ? 'bg-amber-100 text-amber-850'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {project.difficulty}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Outcome */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Outcome</p>
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            {project.outcome}
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue">
            <Layers className="w-4 h-4" />
            <span>Architecture & Data Flow</span>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 font-mono text-xs overflow-x-auto border border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              {project.architecture.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sky-300 font-bold whitespace-nowrap shadow-sm">
                    {idx + 1}. {step}
                  </div>
                  {idx < project.architecture.steps.length - 1 && (
                    <span className="text-amber-400 font-bold">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-3 font-sans border-t border-slate-800 pt-2">
              Full Flow: {project.architecture.diagramFlow}
            </p>
          </div>
        </div>

        {/* Skills Involved */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Skills Acquired</p>
          <div className="flex flex-wrap gap-1.5">
            {project.skills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 bg-blue-50 text-brand-blue text-xs font-semibold rounded-lg border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Requirements & Features</p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-brand-green font-bold">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverable */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
          <span className="font-bold text-slate-900 block mb-0.5">GitHub Deliverable:</span>
          {project.deliverable}
        </div>

        {/* Bottom CTA */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onGoToDay(project.day);
            }}
            className="flex-1 py-3 px-4 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <span>Open Day {project.day} Learning Card</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
