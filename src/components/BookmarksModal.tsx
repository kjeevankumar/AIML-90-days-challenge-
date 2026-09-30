import React from 'react';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { DAYS_DATA, getPhaseByDay } from '../data/roadmapData';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDay: (day: number) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({ isOpen, onClose, onSelectDay }) => {
  const { progress, toggleBookmark, isDayCompleted } = useProgress();

  if (!isOpen) return null;

  const bookmarkedDayTasks = DAYS_DATA.filter(d => progress.bookmarkedDays.includes(d.day));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 sm:p-6 space-y-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg">
              <Bookmark className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900">Bookmarked Days</h3>
              <p className="text-xs text-slate-500">{bookmarkedDayTasks.length} saved learning cards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {bookmarkedDayTasks.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-slate-400">
              <Bookmark className="w-8 h-8 mx-auto stroke-1" />
              <p className="text-xs sm:text-sm font-medium">No bookmarked days yet.</p>
              <p className="text-[11px] text-slate-400">Click the bookmark ribbon on any daily learning card to save it for quick review.</p>
            </div>
          ) : (
            bookmarkedDayTasks.map((day) => {
              const phase = getPhaseByDay(day.day);
              const completed = isDayCompleted(day.day);

              return (
                <div 
                  key={day.day}
                  className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/70 flex items-center justify-between gap-3 transition-colors"
                >
                  <div 
                    onClick={() => {
                      onSelectDay(day.day);
                      onClose();
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-brand-blue text-white px-2 py-0.5 rounded">
                        Day {day.day}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Phase {phase?.numberStr}
                      </span>
                      {completed && (
                        <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.2 rounded">
                          Done ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                      {day.title}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {day.topic}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleBookmark(day.day)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-white"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectDay(day.day);
                        onClose();
                      }}
                      className="p-2 bg-white border border-slate-200 text-brand-blue rounded-lg hover:bg-blue-50 transition-colors"
                      title="Go to day"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
