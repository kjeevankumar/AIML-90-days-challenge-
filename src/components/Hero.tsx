import React from 'react';
import { ArrowRight, Sparkles, Compass, CheckCircle2, Flame, Trophy, Play } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface HeroProps {
  onStartJourney: () => void;
  onExploreRoadmap: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExploreRoadmap }) => {
  const { currentActiveDay, totalCompletedDays, overallPercentage } = useProgress();

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-10 sm:pb-14 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white border-b border-slate-200/80 rounded-b-[2.5rem]">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-blue-400/10 via-amber-300/10 to-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Brand Tag / Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-xs font-bold text-slate-700 animate-soft-pulse">
          <span className="w-2 h-2 rounded-full bg-brand-blue" />
          <span className="text-brand-blue uppercase tracking-wider">AI with Jeevan</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-medium">90-Day Guided AI/ML Journey</span>
        </div>

        {/* PRD Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            90 DAYS <span className="text-brand-blue">→</span> ONE AI/ML SKILL
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl font-bold text-slate-700 max-w-2xl mx-auto">
            Start with Python. Learn AI/ML step by step. Build real projects. Finish with a portfolio.
          </p>

          {/* Supporting Text */}
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            A practical 90-day roadmap for students and beginners who want to learn AI/ML without getting lost in hundreds of random tutorials.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartJourney}
            className="w-full sm:w-auto py-3.5 px-7 bg-brand-blue hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2.5 transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START MY JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreRoadmap}
            className="w-full sm:w-auto py-3.5 px-6 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-sm sm:text-base rounded-2xl shadow-sm hover:border-slate-400 transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-brand-blue" />
            <span>EXPLORE ROADMAP</span>
          </button>
        </div>

        {/* Visual Progress Path: DAY 1 → DAY 90 */}
        <div className="pt-6 max-w-lg mx-auto">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-brand-blue flex items-center gap-1">
                <span>DAY 1</span>
                <span className="text-[10px] font-normal text-slate-400">(Python)</span>
              </span>
              <span className="text-slate-400 font-semibold">
                Current: <strong className="text-slate-800">Day {currentActiveDay}</strong>
              </span>
              <span className="text-brand-green flex items-center gap-1">
                <span>DAY 90</span>
                <span className="text-[10px] font-normal text-slate-400">(Portfolio)</span>
              </span>
            </div>

            {/* Visual connected progress line */}
            <div className="relative w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-green h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, overallPercentage)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>9 Structured Phases</span>
              <span className="font-bold text-brand-blue">{overallPercentage}% Completed</span>
              <span>9 Real Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
