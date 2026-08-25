import React from 'react';
import { Search, X } from 'lucide-react';

interface MetadataSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const MetadataSearch: React.FC<MetadataSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search metadata entities, schemas, attributes...',
  className = ''
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/90 text-slate-200 placeholder:text-slate-500 border border-slate-700/80 rounded-lg pl-9 pr-8 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
