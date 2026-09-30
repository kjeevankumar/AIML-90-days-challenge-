import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, Clock, Check, ChevronLeft, ChevronRight, 
  Bookmark, BookmarkCheck, FileText, Sparkles, FolderGit2, AlertCircle,
  HelpCircle, Eye, ArrowUpRight, Share2, Layers
} from 'lucide-react';
import { DayTask } from '../types/roadmap';
import { useProgress } from '../context/ProgressContext';
import { getPhaseByDay, getProjectByDay } from '../data/roadmapData';

interface DailyLearningCardProps {
  dayTask: DayTask;
  onOpenProject?: (projectId: string) => void;
}

export const DailyLearningCard: React.FC<DailyLearningCardProps> = ({ dayTask, onOpenProject }) => {
  const { 
    progress, 
    toggleTask, 
    markDayAllComplete, 
    isDayCompleted, 
    getDayTaskCount,
    isDayUnlocked,
    currentActiveDay,
    setCurrentActiveDay,
    toggleBookmark,
    saveDayNote,
    setTriggerShareModal
  } = useProgress();

  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [localNote, setLocalNote] = useState(progress.notes[dayTask.day] || '');

  const dayProgress = progress.completedDays[dayTask.day] || {
    learn: false,
    practice: false,
    build: false,
  };

  const completed = isDayCompleted(dayTask.day);
  const taskCount = getDayTaskCount(dayTask.day);
  const unlocked = isDayUnlocked(dayTask.day);
  const isBookmarked = progress.bookmarkedDays.includes(dayTask.day);
  const phaseInfo = getPhaseByDay(dayTask.day);
  const projectInfo = getProjectByDay(dayTask.day);

  const handleSaveNote = () => {
    saveDayNote(dayTask.day, localNote);
    setShowNoteEditor(false);
  };

  return (
    <div className={`bg-white rounded-3xl border transition-all duration-300 shadow-sm overflow-hidden ${
      completed ? 'border-green-300 ring-1 ring-green-100' : 'border-slate-200 hover:border-slate-300'
    }`}>
      {/* Top Header / Status bar */}
      <div className="bg-slate-50/80 px-4 sm:px-6 py-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-black tracking-wider uppercase bg-brand-blue text-white shadow-sm">
            DAY {dayTask.day}
          </span>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            Phase {phaseInfo?.numberStr}: {phaseInfo?.title}
          </span>
          {dayTask.keyConceptTag && (
            <span className="inline-block text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-full">
              ★ {dayTask.keyConceptTag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Estimated time */}
          <div className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{dayTask.estimatedTime}</span>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(dayTask.day)}
            className={`p-1.5 rounded-full border transition-colors ${
              isBookmarked 
                ? 'bg-amber-50 border-amber-200 text-amber-500' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this day'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Title & Topic */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {dayTask.title}
              </h2>
              <p className="text-sm font-semibold text-brand-blue mt-0.5">
                {dayTask.topic}
              </p>
            </div>

            {/* Quick Completion Badge */}
            {completed ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold text-xs tracking-wide shadow-sm animate-fade-in shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                DAY COMPLETE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-semibold text-xs shrink-0">
                <span>{taskCount} / 3 completed</span>
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            {dayTask.summary}
          </p>
        </div>

        {/* 3 Core Questions: What, Why, Where (Beginner Clarity) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              1. What is it?
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {dayTask.whatIsIt}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              2. Why do I need it?
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {dayTask.whyNeedIt}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              3. Where is it used?
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {dayTask.whereUsed}
            </p>
          </div>
        </div>

        {/* 4 Learning Pillars: LEARN | PRACTICE | BUILD | DELIVERABLE */}
        <div className="space-y-4">
          {/* 1. LEARN */}
          <div className={`p-4 rounded-2xl border transition-all ${
            dayProgress.learn ? 'bg-blue-50/40 border-blue-200' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-brand-blue flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-blue" />
                LEARN
              </span>
              <button
                onClick={() => toggleTask(dayTask.day, 'learn')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  dayProgress.learn 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {dayProgress.learn ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Circle className="w-3.5 h-3.5" />}
                {dayProgress.learn ? 'Learned ✓' : 'Mark Learned'}
              </button>
            </div>
            <ul className="space-y-1.5">
              {dayTask.learn.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="text-brand-blue font-bold mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. PRACTICE */}
          <div className={`p-4 rounded-2xl border transition-all ${
            dayProgress.practice ? 'bg-amber-50/40 border-amber-200' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                PRACTICE TASK
              </span>
              <button
                onClick={() => toggleTask(dayTask.day, 'practice')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  dayProgress.practice 
                    ? 'bg-amber-600 text-white shadow-sm' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {dayProgress.practice ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Circle className="w-3.5 h-3.5" />}
                {dayProgress.practice ? 'Practiced ✓' : 'Mark Practiced'}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              {dayTask.practice}
            </p>
          </div>

          {/* 3. BUILD */}
          <div className={`p-4 rounded-2xl border transition-all ${
            dayProgress.build ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-brand-green flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-green" />
                BUILD REAL APPLICATION
              </span>
              <button
                onClick={() => toggleTask(dayTask.day, 'build')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  dayProgress.build 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {dayProgress.build ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Circle className="w-3.5 h-3.5" />}
                {dayProgress.build ? 'Built ✓' : 'Mark Built'}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              {dayTask.build}
            </p>
          </div>

          {/* 4. DELIVERABLE */}
          <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-800 text-sky-400">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  DELIVERABLE / GITHUB
                </span>
                <p className="text-xs font-medium text-slate-200">
                  {dayTask.deliverable}
                </p>
              </div>
            </div>

            {dayTask.isProjectDay && projectInfo && onOpenProject && (
              <button
                onClick={() => onOpenProject(projectInfo.id)}
                className="py-1.5 px-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>View Project Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Complete / Share Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {!completed ? (
              <button
                onClick={() => markDayAllComplete(dayTask.day)}
                className="py-2 px-3.5 bg-green-50 hover:bg-green-100 text-brand-green border border-green-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark All Complete</span>
              </button>
            ) : (
              <button
                onClick={() => setTriggerShareModal(true)}
                className="py-2 px-3.5 bg-blue-50 hover:bg-blue-100 text-brand-blue border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Day {dayTask.day}</span>
              </button>
            )}

            <button
              onClick={() => setShowNoteEditor(!showNoteEditor)}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{progress.notes[dayTask.day] ? 'Edit Notes' : 'Add Notes'}</span>
            </button>
          </div>

          {/* Navigation to Previous / Next Day */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (dayTask.day > 1) setCurrentActiveDay(dayTask.day - 1);
              }}
              disabled={dayTask.day <= 1}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors text-slate-700"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-slate-500 px-1">
              {dayTask.day} / 90
            </span>

            <button
              onClick={() => {
                if (dayTask.day < 90) setCurrentActiveDay(dayTask.day + 1);
              }}
              disabled={dayTask.day >= 90}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors text-slate-700"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Note editor drawer */}
        {showNoteEditor && (
          <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 animate-fade-in">
            <label className="text-xs font-bold text-slate-700 block">
              Personal Notes & Key Takeaways for Day {dayTask.day}
            </label>
            <textarea
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              placeholder="e.g. Code snippets, GitHub link, insights, key errors solved..."
              rows={3}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNoteEditor(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-3.5 py-1.5 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
