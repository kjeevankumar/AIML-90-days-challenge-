import React from 'react';
import { 
  Trophy, CheckCircle2, Flame, Award, Sparkles, Share2, 
  RotateCcw, Compass, ArrowRight, BookOpen, Layers, CheckSquare, ListOrdered 
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { SkillTracker } from './SkillTracker';
import { PHASES, DAYS_DATA, TOTAL_DAYS } from '../data/roadmapData';

interface ProgressViewProps {
  onGoToDay: (day: number) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onGoToDay }) => {
  const { 
    progress, 
    currentActiveDay, 
    totalCompletedDays, 
    overallPercentage, 
    isDayCompleted,
    setTriggerShareModal,
    loadSampleProgress,
    resetAllProgress
  } = useProgress();

  const isGraduated = totalCompletedDays === TOTAL_DAYS;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner: YOUR JOURNEY */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-500/30">
                Dashboard & Analytics
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2 text-white">
                YOUR JOURNEY
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Real-time tracking from Day 1 to your Day 90 AI/ML Portfolio.
              </p>
            </div>

            <button
              onClick={() => setTriggerShareModal(true)}
              className="py-2.5 px-5 bg-brand-blue hover:bg-blue-600 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
            >
              <Share2 className="w-4 h-4" />
              <span>SHARE MY PROGRESS</span>
            </button>
          </div>

          {/* Metric Boxes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-slate-300 block uppercase">Completed Days</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                {totalCompletedDays} <span className="text-xs font-medium text-slate-400">/ 90</span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-slate-300 block uppercase">Progress</span>
              <p className="text-2xl sm:text-3xl font-black text-brand-yellow mt-1">
                {overallPercentage}%
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-slate-300 block uppercase">Current Focus</span>
              <p className="text-2xl sm:text-3xl font-black text-sky-400 mt-1">
                Day {currentActiveDay}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-slate-300 block uppercase">Days Remaining</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                {TOTAL_DAYS - totalCompletedDays}
              </p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Overall Roadmap Completion</span>
              <span className="font-bold text-white">{totalCompletedDays} of 90 Days Completed</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
              <div 
                className="bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-green h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(2, overallPercentage)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skill Tracker section */}
      <SkillTracker />

      {/* 90-Day Mini Heatmap / Grid of all 90 Days */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">90-Day Completion Grid</h3>
            <p className="text-xs text-slate-500">Click any day node to immediately inspect its daily learning card.</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-green-500" /> Done
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-500" /> Active
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200" /> Pending
            </span>
          </div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5 sm:gap-2">
          {DAYS_DATA.map((day) => {
            const isDone = isDayCompleted(day.day);
            const isActive = currentActiveDay === day.day;

            return (
              <button
                key={day.day}
                onClick={() => onGoToDay(day.day)}
                className={`aspect-square rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center relative group ${
                  isDone
                    ? 'bg-brand-green text-white hover:bg-green-700 shadow-sm'
                    : isActive
                    ? 'bg-brand-blue text-white ring-2 ring-blue-300 shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`Day ${day.day}: ${day.title}`}
              >
                <span>{day.day}</span>
                {day.isProjectDay && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Graduation & Career Pathways Preview (Section 21) */}
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-amber-50 border border-blue-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-brand-yellow" />
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Day 90 Outcome & Career Pathways
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          By completing this journey, you master Python, Data Analysis, Scikit-learn, Deep Learning, RAG, and AI Agents. You will be qualified to pursue multiple high-growth directions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          {[
            { role: "AI Engineer", desc: "Build enterprise apps combining LLMs, RAG, and APIs" },
            { role: "ML Engineer", desc: "Train, tune, optimize, and deploy models in production" },
            { role: "GenAI Engineer", desc: "Specialize in foundation models, fine-tuning & agents" },
            { role: "Data Scientist", desc: "Statistical modeling, deep analysis, and predictive insights" },
            { role: "AI App Developer", desc: "Full-stack apps integrating state-of-the-art AI" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <span className="text-[10px] font-black uppercase text-brand-blue tracking-wide">Path {idx + 1}</span>
              <p className="text-sm font-bold text-slate-900">{item.role}</p>
              <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reset & Demo Controls */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          <span>Data is stored automatically in your browser's local storage.</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadSampleProgress}
            className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
          >
            Load Sample Progress (Phase 1)
          </button>
          <button
            onClick={resetAllProgress}
            className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
