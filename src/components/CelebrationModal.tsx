import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Trophy, ArrowRight, Sparkles, X, Compass, ExternalLink } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { DAYS_DATA, PHASES } from '../data/roadmapData';

export const CelebrationModal: React.FC = () => {
  const { celebration, clearCelebration, setCurrentActiveDay, setTriggerShareModal } = useProgress();

  useEffect(() => {
    if (celebration) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: celebration.type === 'day90' ? 150 : 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#F4B400', '#16A34A', '#DC2626', '#9333EA']
        });
      } catch (e) {
        console.warn('Confetti unavailable', e);
      }
    }
  }, [celebration]);

  if (!celebration) return null;

  const currentDayData = DAYS_DATA.find(d => d.day === celebration.dayNumber);
  const nextDayData = celebration.dayNumber < 90 ? DAYS_DATA.find(d => d.day === celebration.dayNumber + 1) : null;
  const phaseData = celebration.phaseId ? PHASES.find(p => p.id === celebration.phaseId) : null;
  const nextPhase = phaseData && phaseData.id < 9 ? PHASES.find(p => p.id === phaseData.id + 1) : null;

  const handleContinue = () => {
    if (celebration.dayNumber < 90) {
      setCurrentActiveDay(celebration.dayNumber + 1);
    }
    clearCelebration();
  };

  const handleStartNextPhase = () => {
    if (nextPhase) {
      setCurrentActiveDay(nextPhase.startDay);
    }
    clearCelebration();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          onClick={clearCelebration}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Standard Day Complete State */}
        {celebration.type === 'day' && (
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 bg-green-50 rounded-2xl border border-green-200 text-brand-green mb-1 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="inline-block text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-green-100 text-green-800">
                Milestone Reached
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                DAY {celebration.dayNumber} COMPLETE!
              </h2>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">You Learned</p>
              <p className="text-base font-semibold text-slate-800">{currentDayData?.title}</p>
              <p className="text-xs text-slate-500">{currentDayData?.topic}</p>
            </div>

            {nextDayData && (
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 text-left flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-brand-blue uppercase">Up Next</p>
                  <p className="text-sm font-bold text-slate-800">
                    Day {nextDayData.day} — {nextDayData.title}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleContinue}
                className="flex-1 py-3 px-4 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                CONTINUE JOURNEY
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  clearCelebration();
                  setTriggerShareModal(true);
                }}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
              >
                Share Progress
              </button>
            </div>
          </div>
        )}

        {/* 2. Phase Complete State */}
        {celebration.type === 'phase' && phaseData && (
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 bg-amber-50 rounded-2xl border border-amber-200 text-brand-yellow mb-1 animate-soft-pulse">
              <Trophy className="w-10 h-10 text-amber-500" />
            </div>

            <div className="space-y-1">
              <span className="inline-block text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                Phase Completed
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                PHASE {phaseData.numberStr} COMPLETE!
              </h2>
              <p className="text-sm font-medium text-slate-600">{phaseData.title}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">You Can Now:</p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {phaseData.learnOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {nextPhase && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-left flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-brand-blue">Next Destination</p>
                  <p className="text-sm font-extrabold text-slate-900">
                    Phase {nextPhase.numberStr} — {nextPhase.title}
                  </p>
                  <p className="text-xs text-slate-500">{nextPhase.daysRange}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold">
                  →
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleStartNextPhase}
                className="flex-1 py-3 px-4 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {nextPhase ? `START PHASE ${nextPhase.numberStr}` : 'CONTINUE JOURNEY'}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  clearCelebration();
                  setTriggerShareModal(true);
                }}
                className="py-3 px-4 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold rounded-xl transition-colors text-sm"
              >
                Share Story
              </button>
            </div>
          </div>
        )}

        {/* 3. Day 90 Celebration State */}
        {celebration.type === 'day90' && (
          <div className="text-center space-y-4 max-h-[80vh] overflow-y-auto pr-1">
            <div className="inline-flex p-3 bg-blue-50 rounded-2xl border border-blue-200 text-brand-blue mb-1 animate-soft-pulse">
              <Sparkles className="w-12 h-12 text-brand-blue" />
            </div>

            <div className="space-y-1">
              <span className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-green-100 text-green-800">
                Graduation Milestone
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                90 DAYS COMPLETE!
              </h2>
              <p className="text-sm font-semibold text-brand-blue">
                YOU BUILT YOUR COMPLETE AI/ML FOUNDATION
              </p>
            </div>

            {/* Journey steps recap */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your 90-Day Journey</p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-700">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded">Python</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded">Data</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">ML</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded">Advanced ML</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded">Deep Learning</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded">GenAI</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">AI Agents</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-bold">Deployed Portfolio</span>
              </div>
            </div>

            {/* Career next steps */}
            <div className="text-left space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Compass className="w-4 h-4 text-brand-blue" />
                <span>Choose Your Next Career Direction:</span>
              </div>
              <p className="text-xs text-slate-500">
                All 5 pathways are open to you with the foundational skills you built:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { title: "AI Engineer", desc: "Build enterprise apps combining LLMs, RAG, and APIs" },
                  { title: "ML Engineer", desc: "Train, tune, optimize, and deploy models in production" },
                  { title: "GenAI Engineer", desc: "Specialize in foundation models, fine-tuning & agents" },
                  { title: "Data Scientist", desc: "Statistical modeling, deep analysis, and predictive insights" },
                  { title: "AI Application Developer", desc: "Full-stack apps integrating state-of-the-art AI" }
                ].map((path, idx) => (
                  <div key={idx} className="p-2.5 border border-slate-200 rounded-lg bg-white hover:border-brand-blue transition-colors">
                    <p className="font-bold text-slate-900">{path.title}</p>
                    <p className="text-[11px] text-slate-500">{path.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  clearCelebration();
                  setTriggerShareModal(true);
                }}
                className="flex-1 py-3 px-4 bg-brand-green hover:bg-green-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                SHARE GRADUATION STORY
              </button>
              <button
                onClick={clearCelebration}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
