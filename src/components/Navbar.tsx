import React, { useState } from 'react';
import { 
  Sparkles, Share2, Bookmark, ShieldCheck, LogIn, LogOut, 
  User, ChevronDown, UserCheck, Flame 
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenBookmarks }) => {
  const { 
    currentActiveDay, 
    totalCompletedDays, 
    overallPercentage, 
    setTriggerShareModal,
    progress
  } = useProgress();

  const { 
    currentUser, 
    setIsAuthModalOpen, 
    setAuthModalInitialMode, 
    logout 
  } = useAuth();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const bookmarkCount = progress.bookmarkedDays.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform">
            AI
          </div>
          <div>
            <span className="font-black text-base sm:text-lg text-slate-900 tracking-tight block leading-tight">
              AI with Jeevan
            </span>
            <span className="text-[10px] font-semibold text-slate-400 block tracking-wide uppercase">
              90-Day AI/ML Journey
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs font-bold">
          {[
            { id: 'home', label: 'Home' },
            { id: 'roadmap', label: 'Roadmap' },
            { id: 'projects', label: 'Projects' },
            { id: 'progress', label: 'Progress' },
            { id: 'about', label: 'About' },
            ...(currentUser?.role === 'admin' ? [{ id: 'admin', label: 'Admin Portal ★' }] : [])
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-brand-blue shadow-sm'
                  : tab.id === 'admin'
                  ? 'text-amber-800 bg-amber-100/80 hover:bg-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right side: Progress Capsule, Bookmarks, Auth, Share */}
        <div className="flex items-center gap-2">
          {/* Quick Progress Capsule */}
          <div 
            onClick={() => setActiveTab('progress')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
            title="View overall progress"
          >
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">
                Day {currentActiveDay}/90
              </span>
              <span className="text-xs font-black text-brand-blue leading-none">
                {overallPercentage}%
              </span>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-[10px] font-black text-brand-green">
              {totalCompletedDays}
            </div>
          </div>

          {/* Bookmarks count button */}
          {bookmarkCount > 0 && (
            <button
              onClick={onOpenBookmarks}
              className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition-colors relative"
              title={`${bookmarkCount} Bookmarked Days`}
            >
              <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {bookmarkCount}
              </span>
            </button>
          )}

          {/* User Auth Profile / Log In Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
              >
                <div 
                  className="w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs shadow-xs"
                  style={{ backgroundColor: currentUser.avatarColor || '#2563EB' }}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden lg:block">
                  <span className="text-xs font-bold text-slate-800 block truncate max-w-[100px] leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight">
                    {currentUser.role === 'admin' ? 'Admin' : `Day ${currentUser.progress.currentDay || 1}`}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1 z-50 animate-fade-in text-xs">
                  <div className="p-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.2 bg-blue-50 text-brand-blue text-[10px] font-black rounded uppercase">
                      {currentUser.role}
                    </span>
                  </div>

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-amber-900 font-bold flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>Admin Portal</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                      if (activeTab === 'admin') {
                        setActiveTab('home');
                      }
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-red-50 text-red-600 font-medium flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setAuthModalInitialMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthModalInitialMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="hidden sm:inline-flex py-1.5 px-3 bg-brand-blue hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Share Button */}
          <button
            onClick={() => setTriggerShareModal(true)}
            className="p-2 sm:px-3 sm:py-2 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            title="Share My Progress"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};
