import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgressState, UserDayProgress } from '../types/roadmap';
import { DAYS_DATA, PHASES, TOTAL_DAYS } from '../data/roadmapData';
import { useAuth } from './AuthContext';

interface CelebrationState {
  type: 'day' | 'phase' | 'day90';
  dayNumber: number;
  phaseId?: number;
}

interface ProgressContextType {
  progress: UserProgressState;
  toggleTask: (day: number, task: 'learn' | 'practice' | 'build') => void;
  markDayAllComplete: (day: number) => void;
  resetDay: (day: number) => void;
  resetAllProgress: () => void;
  loadSampleProgress: () => void;
  isDayCompleted: (day: number) => boolean;
  getDayTaskCount: (day: number) => number;
  isDayUnlocked: (day: number) => boolean;
  totalCompletedDays: number;
  overallPercentage: number;
  currentActiveDay: number;
  setCurrentActiveDay: (day: number) => void;
  toggleBookmark: (day: number) => void;
  saveDayNote: (day: number, note: string) => void;
  celebration: CelebrationState | null;
  clearCelebration: () => void;
  triggerShareModal: boolean;
  setTriggerShareModal: (open: boolean) => void;
}

const EMPTY_PROGRESS: UserProgressState = {
  completedDays: {},
  currentDay: 1,
  bookmarkedDays: [],
  notes: {},
  lastUpdated: new Date().toISOString(),
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateUserProgress, setIsAuthModalOpen, setAuthModalInitialMode } = useAuth();

  const [progress, setProgress] = useState<UserProgressState>(() => {
    if (currentUser && currentUser.progress) {
      return currentUser.progress;
    }
    return EMPTY_PROGRESS;
  });

  const [currentActiveDay, setCurrentActiveDay] = useState<number>(1);
  const [celebration, setCelebration] = useState<CelebrationState | null>(null);
  const [triggerShareModal, setTriggerShareModal] = useState<boolean>(false);

  // When currentUser changes (e.g. login, logout, switch user)
  useEffect(() => {
    if (currentUser && currentUser.progress) {
      // Load progress strictly for this authenticated email
      setProgress(currentUser.progress);
      setCurrentActiveDay(currentUser.progress.currentDay || 1);
    } else {
      // When logged out, strictly EMPTY all progress (0% / 0 days / empty checkboxes)
      setProgress(EMPTY_PROGRESS);
      setCurrentActiveDay(1);
    }
  }, [currentUser?.id]);

  // Sync progress back to user account in database when logged in
  useEffect(() => {
    if (currentUser) {
      updateUserProgress(currentUser.id, progress);
    }
  }, [progress, currentUser?.id]);

  const isDayCompleted = (day: number): boolean => {
    const dayData = progress.completedDays[day];
    return !!(dayData && dayData.learn && dayData.practice && dayData.build);
  };

  const getDayTaskCount = (day: number): number => {
    const dayData = progress.completedDays[day];
    if (!dayData) return 0;
    let count = 0;
    if (dayData.learn) count++;
    if (dayData.practice) count++;
    if (dayData.build) count++;
    return count;
  };

  const isDayUnlocked = (day: number): boolean => {
    if (day === 1) return true;
    return isDayCompleted(day - 1);
  };

  const totalCompletedDays = Object.keys(progress.completedDays).filter(d => 
    isDayCompleted(Number(d))
  ).length;

  const overallPercentage = Math.round((totalCompletedDays / TOTAL_DAYS) * 100);

  const checkMilestoneTriggers = (day: number, wasAlreadyCompleted: boolean, nowCompleted: boolean) => {
    if (!wasAlreadyCompleted && nowCompleted) {
      if (day === 90) {
        setCelebration({ type: 'day90', dayNumber: 90 });
        return;
      }
      
      const phase = PHASES.find(p => p.endDay === day);
      if (phase) {
        setCelebration({ type: 'phase', dayNumber: day, phaseId: phase.id });
        return;
      }

      setCelebration({ type: 'day', dayNumber: day });
    }
  };

  const ensureAuthenticated = (): boolean => {
    if (!currentUser) {
      setAuthModalInitialMode('login');
      setIsAuthModalOpen(true);
      return false;
    }
    return true;
  };

  const toggleTask = (day: number, task: 'learn' | 'practice' | 'build') => {
    if (!ensureAuthenticated()) return;

    const currentDayProg: UserDayProgress = progress.completedDays[day] || {
      learn: false,
      practice: false,
      build: false,
    };

    const wasCompleted = currentDayProg.learn && currentDayProg.practice && currentDayProg.build;

    const updatedTaskProg: UserDayProgress = {
      ...currentDayProg,
      [task]: !currentDayProg[task],
    };

    const isNowCompleted = updatedTaskProg.learn && updatedTaskProg.practice && updatedTaskProg.build;

    if (isNowCompleted && !wasCompleted) {
      updatedTaskProg.completedAt = new Date().toISOString();
    }

    setProgress(prev => {
      const nextCompleted = {
        ...prev.completedDays,
        [day]: updatedTaskProg,
      };

      let nextCurrentDay = prev.currentDay;
      if (isNowCompleted && day >= nextCurrentDay && day < TOTAL_DAYS) {
        nextCurrentDay = day + 1;
      }

      return {
        ...prev,
        completedDays: nextCompleted,
        currentDay: nextCurrentDay,
        lastUpdated: new Date().toISOString(),
      };
    });

    checkMilestoneTriggers(day, wasCompleted, isNowCompleted);
  };

  const markDayAllComplete = (day: number) => {
    if (!ensureAuthenticated()) return;

    const wasCompleted = isDayCompleted(day);
    const updatedTaskProg: UserDayProgress = {
      learn: true,
      practice: true,
      build: true,
      completedAt: new Date().toISOString(),
    };

    setProgress(prev => {
      const nextCompleted = {
        ...prev.completedDays,
        [day]: updatedTaskProg,
      };

      let nextCurrentDay = prev.currentDay;
      if (day >= nextCurrentDay && day < TOTAL_DAYS) {
        nextCurrentDay = day + 1;
      }

      return {
        ...prev,
        completedDays: nextCompleted,
        currentDay: nextCurrentDay,
        lastUpdated: new Date().toISOString(),
      };
    });

    checkMilestoneTriggers(day, wasCompleted, true);
  };

  const resetDay = (day: number) => {
    if (!ensureAuthenticated()) return;

    setProgress(prev => {
      const next = { ...prev.completedDays };
      delete next[day];
      return {
        ...prev,
        completedDays: next,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const resetAllProgress = () => {
    if (!ensureAuthenticated()) return;

    if (window.confirm("Are you sure you want to reset your progress? This will reset all your completed tasks.")) {
      setProgress(EMPTY_PROGRESS);
      setCurrentActiveDay(1);
    }
  };

  const loadSampleProgress = () => {
    if (!ensureAuthenticated()) return;

    const sampleCompleted: Record<number, UserDayProgress> = {};
    for (let i = 1; i <= 15; i++) {
      sampleCompleted[i] = {
        learn: true,
        practice: true,
        build: true,
        completedAt: new Date().toISOString(),
      };
    }
    sampleCompleted[16] = {
      learn: true,
      practice: true,
      build: false,
    };

    setProgress({
      completedDays: sampleCompleted,
      currentDay: 16,
      bookmarkedDays: [1, 15],
      notes: { 15: "Completed Expense Tracker with SQLite and JSON persistence!" },
      lastUpdated: new Date().toISOString(),
    });
    setCurrentActiveDay(16);
  };

  const toggleBookmark = (day: number) => {
    if (!ensureAuthenticated()) return;

    setProgress(prev => {
      const exists = prev.bookmarkedDays.includes(day);
      const nextBookmarks = exists
        ? prev.bookmarkedDays.filter(d => d !== day)
        : [...prev.bookmarkedDays, day];
      return {
        ...prev,
        bookmarkedDays: nextBookmarks,
      };
    });
  };

  const saveDayNote = (day: number, note: string) => {
    if (!ensureAuthenticated()) return;

    setProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [day]: note,
      }
    }));
  };

  const clearCelebration = () => {
    setCelebration(null);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        toggleTask,
        markDayAllComplete,
        resetDay,
        resetAllProgress,
        loadSampleProgress,
        isDayCompleted,
        getDayTaskCount,
        isDayUnlocked,
        totalCompletedDays,
        overallPercentage,
        currentActiveDay,
        setCurrentActiveDay,
        toggleBookmark,
        saveDayNote,
        celebration,
        clearCelebration,
        triggerShareModal,
        setTriggerShareModal,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
