import React, { useState, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Hero } from './components/Hero';
import { PhaseJourneyMap } from './components/PhaseJourneyMap';
import { DailyLearningCard } from './components/DailyLearningCard';
import { ProjectsSection } from './components/ProjectsSection';
import { ProgressView } from './components/ProgressView';
import { AboutSection } from './components/AboutSection';
import { FilterSearchBar } from './components/FilterSearchBar';
import { CelebrationModal } from './components/CelebrationModal';
import { ShareModal } from './components/ShareModal';
import { BookmarksModal } from './components/BookmarksModal';
import { ProjectModal } from './components/ProjectModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { useProgress } from './context/ProgressContext';
import { useAuth } from './context/AuthContext';
import { 
  DAYS_DATA, 
  PHASES, 
  PROJECTS, 
  getDayTask, 
  getProjectById,
  searchRoadmap 
} from './data/roadmapData';
import { FilterCategory, ProjectInfo } from './types/roadmap';
import { 
  ArrowRight, Sparkles, BookOpen, Layers, CheckCircle2, 
  HelpCircle, Compass, Play, Calendar, Star, ChevronRight, Lock
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [modalProject, setModalProject] = useState<ProjectInfo | null>(null);

  const roadmapSectionRef = useRef<HTMLDivElement>(null);
  const dailyCardRef = useRef<HTMLDivElement>(null);

  const { 
    currentActiveDay, 
    setCurrentActiveDay, 
    isDayCompleted, 
    isDayUnlocked,
    getDayTaskCount,
    setTriggerShareModal 
  } = useProgress();

  const { currentUser, setIsAuthModalOpen, setAuthModalInitialMode } = useAuth();

  const currentDayTask = useMemo(() => {
    return getDayTask(currentActiveDay) || DAYS_DATA[0];
  }, [currentActiveDay]);

  // Filtered & Searched Days
  const filteredDays = useMemo(() => {
    let result = searchQuery.trim() ? searchRoadmap(searchQuery) : DAYS_DATA;

    if (activeFilter !== 'all') {
      if (activeFilter === 'projects') {
        result = result.filter(d => d.isProjectDay);
      } else if (activeFilter === 'python') {
        result = result.filter(d => d.category === 'python');
      } else if (activeFilter === 'data') {
        result = result.filter(d => d.category === 'data');
      } else if (activeFilter === 'ml') {
        result = result.filter(d => d.category === 'ml');
      } else if (activeFilter === 'deep-learning') {
        result = result.filter(d => d.category === 'deep-learning');
      } else if (activeFilter === 'genai') {
        result = result.filter(d => d.category === 'genai');
      } else if (activeFilter === 'agents') {
        result = result.filter(d => d.category === 'agents');
      }
    }

    return result;
  }, [searchQuery, activeFilter]);

  const handleSelectDay = (dayNumber: number) => {
    setCurrentActiveDay(dayNumber);
    // Smooth scroll to learning card on mobile
    if (dailyCardRef.current) {
      dailyCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenProject = (projectId: string) => {
    const proj = getProjectById(projectId);
    if (proj) setModalProject(proj);
  };

  const scrollToRoadmap = () => {
    if (activeTab !== 'roadmap') {
      setActiveTab('roadmap');
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const startJourney = () => {
    // Focus day card
    setActiveTab('home');
    setTimeout(() => {
      if (dailyCardRef.current) {
        dailyCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 pb-20 md:pb-12">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ========================================================
            TAB 1: HOME (Homepage as recommended in PRD Section 24)
            ======================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* 1. Hero */}
            <Hero 
              onStartJourney={startJourney}
              onExploreRoadmap={scrollToRoadmap}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              {/* 2. Today's Active Focus: Daily Learning Experience */}
              <div ref={dailyCardRef} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-ping" />
                    <h2 className="text-lg sm:text-xl font-black text-slate-900">
                      Your Daily Learning Focus
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Day {currentActiveDay} of 90
                  </span>
                </div>

                <DailyLearningCard 
                  dayTask={currentDayTask} 
                  onOpenProject={handleOpenProject}
                />
              </div>

              {/* 3. Visual Phase Map (The 9-Phase Progression) */}
              <div ref={roadmapSectionRef}>
                <PhaseJourneyMap 
                  onSelectDay={handleSelectDay}
                  onOpenProject={handleOpenProject}
                />
              </div>

              {/* 4. How It Works (Learn -> Practice -> Build -> Track -> Portfolio) */}
              <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="text-center max-w-lg mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Core Learning Philosophy
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    How The 90 Days Work
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Structured to remove confusion so you never have to wonder what to study next.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { step: "01", title: "Learn the Concept", desc: "Short, intuitive explanations answering: What is it, Why do I need it, and Where is it used?", color: "border-blue-200 bg-blue-50/40 text-brand-blue" },
                    { step: "02", title: "Practice Daily", desc: "Solve hands-on exercises and coding problems to build muscle memory before jumping ahead.", color: "border-amber-200 bg-amber-50/40 text-amber-700" },
                    { step: "03", title: "Build Real Apps", desc: "Create working mini-applications, scripts, and major capstones at the end of each phase.", color: "border-emerald-200 bg-emerald-50/40 text-brand-green" },
                    { step: "04", title: "Portfolio on Day 90", desc: "Graduate with 9 public GitHub repositories and an interactive deployed AI Job Assistant web app.", color: "border-purple-200 bg-purple-50/40 text-purple-700" },
                  ].map((p, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border ${p.color} space-y-2`}>
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-white shadow-xs">
                        Step {p.step}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Projects Preview Section */}
              <ProjectsSection onGoToDay={handleSelectDay} />

              {/* 6. About Section */}
              <AboutSection />

              {/* 7. Start Journey CTA Banner */}
              <div className="bg-gradient-to-r from-brand-blue to-blue-700 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-blue-800/60 px-3 py-1 rounded-full">
                  Ready to Become an AI/ML Engineer?
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Start Your 90-Day Journey Today
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto">
                  No previous ML experience required. Start with Python variables today and finish with autonomous AI Agents and a deployed portfolio.
                </p>
                <div className="pt-2">
                  <button
                    onClick={startJourney}
                    className="py-3 px-8 bg-white hover:bg-slate-100 text-brand-blue font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>START DAY 1 NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: ROADMAP (Detailed searchable, filterable 90 Days)
            ======================================================== */}
        {activeTab === 'roadmap' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Curriculum Explorer
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                The Complete 90-Day AI/ML Syllabus
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Filter by technical category, search any topic or algorithm, or select a day to view its complete learning card.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <FilterSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              totalResultsCount={filteredDays.length}
            />

            {/* Layout: Active Day Inspector on Desktop + Days Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: All Matching Days List (5 cols on lg) */}
              <div className="lg:col-span-5 space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
                {filteredDays.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border text-center text-slate-400 space-y-2">
                    <Compass className="w-8 h-8 mx-auto" />
                    <p className="text-sm font-semibold">No days found matching your query.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                      className="text-xs text-brand-blue font-bold hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  filteredDays.map((day) => {
                    const isDone = isDayCompleted(day.day);
                    const isUnlocked = isDayUnlocked(day.day);
                    const isCurrent = currentActiveDay === day.day;
                    const taskCount = getDayTaskCount(day.day);

                    return (
                      <button
                        key={day.day}
                        onClick={() => handleSelectDay(day.day)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                          isCurrent
                            ? 'bg-blue-50/80 border-brand-blue ring-1 ring-blue-300 shadow-sm'
                            : isDone
                            ? 'bg-white border-green-200 hover:border-green-300'
                            : isUnlocked
                            ? 'bg-white border-slate-200 hover:border-slate-300'
                            : 'bg-slate-100/60 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <span 
                            className={`w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${
                              isDone
                                ? 'bg-green-100 text-green-800'
                                : isCurrent
                                ? 'bg-brand-blue text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {isDone ? '✓' : day.day}
                          </span>

                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                                Day {day.day}
                              </span>
                              {day.isProjectDay && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-500" />
                                  Project
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {day.title}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {day.topic}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          {!isDone && isUnlocked && taskCount > 0 && (
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {taskCount}/3
                            </span>
                          )}
                          {!isUnlocked && (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Right Column: Active Daily Learning Card Inspector (7 cols on lg) */}
              <div ref={dailyCardRef} className="lg:col-span-7">
                <DailyLearningCard 
                  dayTask={currentDayTask} 
                  onOpenProject={handleOpenProject}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: PROJECTS (9 Major Projects)
            ======================================================== */}
        {activeTab === 'projects' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <ProjectsSection onGoToDay={handleSelectDay} />
          </div>
        )}

        {/* ========================================================
            TAB 4: PROGRESS (Dashboard, Skills, Heatmap, Graduation)
            ======================================================== */}
        {activeTab === 'progress' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <ProgressView onGoToDay={handleSelectDay} />
          </div>
        )}

        {/* ========================================================
            TAB 5: ABOUT
            ======================================================== */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <AboutSection />
          </div>
        )}

        {/* ========================================================
            TAB 6: ADMIN DASHBOARD (For Jeevan / Admins Only)
            ======================================================== */}
        {activeTab === 'admin' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {currentUser?.role === 'admin' ? (
              <AdminDashboard onGoToDay={handleSelectDay} />
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm my-10">
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-100">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Restricted Admin Access</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    This section is strictly reserved for the administrator. Please log in with your admin credentials to view learner analytics and login metrics.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAuthModalInitialMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="py-2.5 px-6 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Log In as Admin</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Modals */}
      <CelebrationModal />
      <ShareModal />
      <BookmarksModal 
        isOpen={isBookmarksOpen} 
        onClose={() => setIsBookmarksOpen(false)}
        onSelectDay={handleSelectDay}
      />
      <ProjectModal 
        project={modalProject}
        onClose={() => setModalProject(null)}
        onGoToDay={handleSelectDay}
      />
      <AuthModal />
    </div>
  );
};

export default App;
