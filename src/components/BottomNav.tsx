import React from 'react';
import { Home, Compass, BarChart2, FolderGit2, ShieldCheck } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { overallPercentage } = useProgress();
  const { currentUser } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'roadmap', label: 'Roadmap', icon: Compass },
    { id: 'progress', label: 'Progress', icon: BarChart2, badge: `${overallPercentage}%` },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    ...(currentUser?.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: ShieldCheck }] : [])
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive 
                  ? 'text-brand-blue font-bold scale-105' 
                  : item.id === 'admin'
                  ? 'text-amber-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-4 px-1 py-0.2 bg-blue-100 text-brand-blue text-[9px] font-black rounded-full leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
