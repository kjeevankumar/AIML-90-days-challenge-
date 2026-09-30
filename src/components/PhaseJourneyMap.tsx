import React, { useState } from 'react';
import { 
  CheckCircle2, Lock, ChevronDown, ChevronUp, ArrowRight, 
  Code2, BarChart3, Cpu, LineChart, Sliders, Network, Sparkles, Bot, Rocket,
  CircleDot, Star, FolderCheck
} from 'lucide-react';
import { PHASES, DAYS_DATA } from '../data/roadmapData';
import { PhaseInfo } from '../types/roadmap';
import { useProgress } from '../context/ProgressContext';

interface PhaseJourneyMapProps {
  onSelectDay: (day: number) => void;
  onOpenProject: (projectId: string) => void;
}

export const PhaseJourneyMap: React.FC<PhaseJourneyMapProps> = ({ onSelectDay, onOpenProject }) => {
  const { isDayCompleted, isDayUnlocked, currentActiveDay, getDayTaskCount } = useProgress();
  const [expandedPhaseId, setExpandedPhaseId] = useState<number | null>(() => {
    // Default expand the phase of currentActiveDay
    const currentPhase = PHASES.find(p => currentActiveDay >= p.startDay && currentActiveDay <= p.endDay);
    return currentPhase ? currentPhase.id : 1;
  });

  const getPhaseIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case 'Code2': return <Code2 className={className} />;
      case 'BarChart3': return <BarChart3 className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'LineChart': return <LineChart className={className} />;
      case 'Sliders': return <Sliders className={className} />;
      case 'Network': return <Network className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'Rocket': return <Rocket className={className} />;
      default: return <Code2 className={className} />;
    }
  };

  const getPhaseStats = (phase: PhaseInfo) => {
    let completedCount = 0;
    const totalPhaseDays = phase.endDay - phase.startDay + 1;
    for (let d = phase.startDay; d <= phase.endDay; d++) {
      if (isDayCompleted(d)) completedCount++;
    }
    const percent = Math.round((completedCount / totalPhaseDays) * 100);
    const isFinished = completedCount === totalPhaseDays;
    const isUnlocked = isDayUnlocked(phase.startDay);
    return { completedCount, totalPhaseDays, percent, isFinished, isUnlocked };
  };

  const togglePhase = (phaseId: number) => {
    setExpandedPhaseId(prev => prev === phaseId ? null : phaseId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Visual Journey Roadmap
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Your 9-Phase Progression
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          A game-like skill progression from Python zero to building autonomous AI agents and deploying your portfolio.
        </p>
      </div>

      {/* Vertical Connected Stage Map */}
      <div className="relative max-w-2xl mx-auto pl-6 sm:pl-8 space-y-4">
        {/* Continuous Journey Line */}
        <div className="absolute top-6 bottom-6 left-[21px] sm:left-[29px] w-1 bg-slate-200 rounded-full" />

        {PHASES.map((phase, index) => {
          const stats = getPhaseStats(phase);
          const isExpanded = expandedPhaseId === phase.id;
          const isCurrentPhase = currentActiveDay >= phase.startDay && currentActiveDay <= phase.endDay;
          const phaseDays = DAYS_DATA.filter(d => d.phaseId === phase.id);

          return (
            <div key={phase.id} className="relative transition-smooth">
              {/* Node on the journey line */}
              <div 
                className={`absolute -left-[22px] sm:-left-[30px] top-5 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
                  stats.isFinished
                    ? 'bg-brand-green border-white text-white shadow-md'
                    : isCurrentPhase
                    ? 'bg-brand-blue border-white text-white shadow-lg ring-4 ring-blue-100 scale-110'
                    : stats.isUnlocked
                    ? 'bg-white border-slate-300 text-slate-500'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {stats.isFinished ? (
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                ) : !stats.isUnlocked ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-xs font-black">{phase.numberStr}</span>
                )}
              </div>

              {/* Phase Card */}
              <div 
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isCurrentPhase 
                    ? 'border-blue-400 shadow-md ring-1 ring-blue-100' 
                    : stats.isFinished
                    ? 'border-emerald-200 hover:border-emerald-300 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Header clickable to expand/collapse */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div 
                      className="p-2.5 rounded-xl shrink-0 mt-0.5"
                      style={{ 
                        backgroundColor: `${phase.color}15`, 
                        color: phase.color 
                      }}
                    >
                      {getPhaseIcon(phase.iconName, "w-6 h-6")}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          Phase {phase.numberStr}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {phase.daysRange}
                        </span>
                        {isCurrentPhase && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-brand-blue px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {phase.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {phase.outcome}
                      </p>

                      {/* Mini project preview tag */}
                      <div className="pt-1 flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <FolderCheck className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                        <span className="text-slate-500">Project:</span>
                        <span className="font-semibold text-slate-800">{phase.projectTitle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-600">
                        {stats.completedCount}/{stats.totalPhaseDays}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                    {/* Mini progress bar */}
                    <div className="w-16 sm:w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${stats.percent}%`,
                          backgroundColor: stats.percent === 100 ? '#16A34A' : phase.color
                        }}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded Day Nodes List */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 border-t border-slate-100 bg-slate-50/50 space-y-3 animate-fade-in">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Days in Phase {phase.numberStr}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phaseDays.map((day) => {
                        const dayDone = isDayCompleted(day.day);
                        const dayUnlocked = isDayUnlocked(day.day);
                        const isActive = currentActiveDay === day.day;
                        const taskCount = getDayTaskCount(day.day);

                        return (
                          <button
                            key={day.day}
                            onClick={() => onSelectDay(day.day)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                              isActive
                                ? 'bg-blue-50 border-brand-blue ring-1 ring-blue-300'
                                : dayDone
                                ? 'bg-white border-green-200 hover:border-green-300'
                                : dayUnlocked
                                ? 'bg-white border-slate-200 hover:border-slate-300'
                                : 'bg-slate-100/70 border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <span 
                                className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                  dayDone
                                    ? 'bg-green-100 text-green-800'
                                    : isActive
                                    ? 'bg-brand-blue text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {dayDone ? '✓' : day.day}
                              </span>

                              <div className="overflow-hidden">
                                <p className="text-xs font-bold text-slate-800 truncate">
                                  {day.title}
                                </p>
                                <p className="text-[11px] text-slate-500 truncate">
                                  {day.isProjectDay ? '★ Capstone Project' : day.topic}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center gap-1">
                              {day.isProjectDay && (
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              )}
                              {!dayDone && dayUnlocked && taskCount > 0 && (
                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {taskCount}/3
                                </span>
                              )}
                              {!dayUnlocked && (
                                <Lock className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Final Stage: Day 90 Outcome Node */}
        <div className="relative pt-2">
          <div className="absolute -left-[22px] sm:-left-[30px] top-5 w-8 h-8 rounded-full border-2 bg-amber-400 border-white text-slate-900 font-black text-xs flex items-center justify-center shadow-lg">
            ★
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-slate-800 space-y-1.5 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
              Day 90 Destination
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              One Practical AI/ML Skill & One Strong Portfolio
            </h3>
            <p className="text-xs text-slate-600">
              Deploy your AI Job Assistant, polish your GitHub repositories, and choose your specialized AI career track!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
