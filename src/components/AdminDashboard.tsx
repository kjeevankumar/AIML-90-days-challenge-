import React, { useState, useMemo } from 'react';
import { 
  Users, ShieldCheck, LogIn, TrendingUp, Search, Download, 
  Eye, RefreshCw, Trash2, CheckCircle2, Award, Clock, ArrowRight, X, ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserAccount } from '../types/auth';
import { PHASES, TOTAL_DAYS, getPhaseByDay } from '../data/roadmapData';

interface AdminDashboardProps {
  onGoToDay?: (day: number) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onGoToDay }) => {
  const { usersList, currentUser, switchUser, deleteUser, resetUserProgressInDb } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserForInspection, setSelectedUserForInspection] = useState<UserAccount | null>(null);
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'admin'>('all');

  // Calculate Metrics
  const stats = useMemo(() => {
    const totalLearners = usersList.length;
    const totalLogins = usersList.reduce((acc, u) => acc + (u.loginCount || 1), 0);
    
    // Average completion percentage
    let totalPercents = 0;
    usersList.forEach(u => {
      const completedCount = Object.keys(u.progress?.completedDays || {}).filter(d => {
        const item = u.progress.completedDays[Number(d)];
        return item && item.learn && item.practice && item.build;
      }).length;
      totalPercents += (completedCount / TOTAL_DAYS) * 100;
    });
    const avgProgress = totalLearners > 0 ? Math.round(totalPercents / totalLearners) : 0;

    // Phase distribution
    const phaseCounts: Record<number, number> = {};
    PHASES.forEach(p => { phaseCounts[p.id] = 0; });

    usersList.forEach(u => {
      const currentDay = u.progress?.currentDay || 1;
      const phase = getPhaseByDay(currentDay);
      if (phase) {
        phaseCounts[phase.id] = (phaseCounts[phase.id] || 0) + 1;
      }
    });

    return { totalLearners, totalLogins, avgProgress, phaseCounts };
  }, [usersList]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return usersList.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [usersList, searchQuery, filterRole]);

  const handleExportCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Role', 'Logins Count', 'Current Day', 'Completed Days', 'Progress %', 'Created At', 'Last Active'];
    const rows = usersList.map(u => {
      const completedDays = Object.keys(u.progress?.completedDays || {}).filter(d => {
        const item = u.progress.completedDays[Number(d)];
        return item && item.learn && item.practice && item.build;
      }).length;
      const percent = Math.round((completedDays / TOTAL_DAYS) * 100);

      return [
        u.id,
        `"${u.name}"`,
        u.email,
        u.role,
        u.loginCount || 1,
        u.progress?.currentDay || 1,
        completedDays,
        `${percent}%`,
        new Date(u.createdAt).toLocaleDateString(),
        new Date(u.lastLoginAt).toLocaleDateString()
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AI_with_Jeevan_Learners_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Learner Progression & Login Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Monitor all registered students, total authentication logins, active days, and learning milestone completion in real time.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Registered Learners</span>
            <div className="p-2 bg-blue-50 text-brand-blue rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{stats.totalLearners}</p>
          <p className="text-[11px] text-slate-500 font-medium">Unique learner accounts</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Logins</span>
            <div className="p-2 bg-green-50 text-brand-green rounded-xl">
              <LogIn className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-brand-green">{stats.totalLogins}</p>
          <p className="text-[11px] text-slate-500 font-medium">Authentication sessions recorded</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Average Progress</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-brand-yellow">{stats.avgProgress}%</p>
          <p className="text-[11px] text-slate-500 font-medium">Across all enrolled learners</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Logged In As</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-base font-black text-slate-900 truncate">{currentUser?.name || 'Admin'}</p>
          <p className="text-[11px] text-purple-600 font-bold uppercase">{currentUser?.role || 'admin'}</p>
        </div>
      </div>

      {/* Phase Progression Distribution Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            Learner Distribution Across 9 Phases
          </h3>
          <span className="text-xs text-slate-400 font-medium">Active enrollment by phase</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {PHASES.map((phase) => {
            const count = stats.phaseCounts[phase.id] || 0;
            return (
              <div 
                key={phase.id}
                className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1"
              >
                <span className="text-[10px] font-black text-slate-400 uppercase block">
                  P{phase.numberStr}
                </span>
                <span className="text-lg font-black text-slate-800 block">
                  {count}
                </span>
                <span className="text-[9px] text-slate-500 truncate block font-medium">
                  {phase.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learners Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
        {/* Table Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search learner by name or email..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold uppercase">Role:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
              {(['all', 'student', 'admin'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setFilterRole(role)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all ${
                    filterRole === role
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-black tracking-wider text-[10px]">
                <th className="py-3 px-3">Learner</th>
                <th className="py-3 px-3">Total Logins</th>
                <th className="py-3 px-3">Current Focus</th>
                <th className="py-3 px-3">Progress</th>
                <th className="py-3 px-3">Last Active</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    No learners found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const completedDays = Object.keys(user.progress?.completedDays || {}).filter(d => {
                    const item = user.progress.completedDays[Number(d)];
                    return item && item.learn && item.practice && item.build;
                  }).length;
                  const percent = Math.round((completedDays / TOTAL_DAYS) * 100);
                  const currentDay = user.progress?.currentDay || 1;
                  const phase = getPhaseByDay(currentDay);

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Learner Info */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div 
                            className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-xs"
                            style={{ backgroundColor: user.avatarColor || '#2563EB' }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 truncate block">
                                {user.name}
                              </span>
                              {user.role === 'admin' && (
                                <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-black rounded">
                                  ADMIN
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 truncate block">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Logins Count */}
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-brand-blue font-black rounded-lg text-xs">
                          <LogIn className="w-3 h-3" />
                          {user.loginCount || 1} logins
                        </span>
                      </td>

                      {/* Current Day & Phase */}
                      <td className="py-3.5 px-3">
                        <div>
                          <span className="font-bold text-slate-800 block">
                            Day {currentDay} of 90
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">
                            Phase {phase?.numberStr}: {phase?.title}
                          </span>
                        </div>
                      </td>

                      {/* Progress Bar & Percentage */}
                      <td className="py-3.5 px-3 min-w-[130px]">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-700">{completedDays}/90 Days</span>
                            <span className="font-black text-brand-blue">{percent}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${percent}%`,
                                backgroundColor: percent === 100 ? '#16A34A' : '#2563EB'
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Last Active */}
                      <td className="py-3.5 px-3 text-[11px] text-slate-500 whitespace-nowrap">
                        {new Date(user.lastLoginAt).toLocaleDateString([], { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedUserForInspection(user)}
                            className="p-1.5 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-brand-blue rounded-lg transition-colors"
                            title="Inspect details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              switchUser(user.id);
                              alert(`Switched active view to: ${user.name}`);
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700 rounded-lg transition-colors"
                            title="Switch to view as this user"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>

                          {user.role !== 'admin' && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to remove user "${user.name}"?`)) {
                                  deleteUser(user.id);
                                }
                              }}
                              className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Progress Detail Inspection Modal */}
      {selectedUserForInspection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 my-auto max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-2xl text-white font-bold flex items-center justify-center text-sm shadow-sm"
                  style={{ backgroundColor: selectedUserForInspection.avatarColor }}
                >
                  {selectedUserForInspection.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    {selectedUserForInspection.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedUserForInspection.email} • {selectedUserForInspection.loginCount} total logins
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUserForInspection(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Day</span>
                <span className="text-lg font-black text-brand-blue">
                  Day {selectedUserForInspection.progress.currentDay || 1}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed</span>
                <span className="text-lg font-black text-brand-green">
                  {Object.keys(selectedUserForInspection.progress.completedDays || {}).length} / 90
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Notes Written</span>
                <span className="text-lg font-black text-purple-600">
                  {Object.keys(selectedUserForInspection.progress.notes || {}).length}
                </span>
              </div>
            </div>

            {/* Notes inspection */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Learner's Saved Notes & Insights
              </h4>
              {Object.keys(selectedUserForInspection.progress.notes || {}).length === 0 ? (
                <p className="text-xs text-slate-400 italic">No notes logged yet by this student.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {Object.entries(selectedUserForInspection.progress.notes).map(([day, note]) => (
                    <div key={day} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <span className="font-bold text-brand-blue block mb-1">Day {day} Takeaway:</span>
                      <p className="text-slate-700 leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions inside inspector */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  switchUser(selectedUserForInspection.id);
                  setSelectedUserForInspection(null);
                }}
                className="flex-1 py-2.5 px-4 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Switch Active View to this Student</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedUserForInspection(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
