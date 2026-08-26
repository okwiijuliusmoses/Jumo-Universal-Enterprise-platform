import React from 'react';
import { Filter } from 'lucide-react';

interface MetadataFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  statuses?: string[];
  selectedStatus?: string;
  onSelectStatus?: (status: string) => void;
  className?: string;
}

export const MetadataFilter: React.FC<MetadataFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  statuses,
  selectedStatus,
  onSelectStatus,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mr-1">
        <Filter className="w-3.5 h-3.5" />
        <span>Filter:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {statuses && onSelectStatus && (
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Status:</span>
          {statuses.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => onSelectStatus(st)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-medium'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
