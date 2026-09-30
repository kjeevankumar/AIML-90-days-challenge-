import React from 'react';
import { Search, X, Sparkles, Filter } from 'lucide-react';
import { FilterCategory } from '../types/roadmap';

interface FilterSearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  totalResultsCount: number;
}

const FILTER_OPTIONS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Days (90)' },
  { id: 'python', label: 'Python' },
  { id: 'data', label: 'Data Analysis' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'deep-learning', label: 'Deep Learning' },
  { id: 'genai', label: 'Generative AI' },
  { id: 'agents', label: 'AI Agents' },
  { id: 'projects', label: '9 Projects' },
];

export const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalResultsCount,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Search Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search topic, day (e.g. 'Day 37'), skill ('RAG', 'Random Forest', 'CNN')..."
          className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] pl-1 shrink-0 flex items-center gap-1">
          <Filter className="w-3 h-3 text-slate-400" />
          Filter:
        </span>
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onFilterChange(opt.id)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              activeFilter === opt.id
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Search Results Summary if searching */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>Found <strong>{totalResultsCount}</strong> matching days</span>
          <button
            onClick={() => onSearchChange('')}
            className="text-brand-blue hover:underline font-semibold"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};
