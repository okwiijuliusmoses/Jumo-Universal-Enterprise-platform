import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, MoreHorizontal, Download, LayoutGrid, CheckSquare } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  sortable?: boolean;
}

interface JumoDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  searchPlaceholder?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  bulkActions?: React.ReactNode;
  emptyStateMessage?: string;
}

export function JumoDataTable<T extends { id: string | number }>({
  data,
  columns,
  title,
  onRowClick,
  actions,
  searchPlaceholder = "Search records...",
  selectable = false,
  onSelectionChange,
  bulkActions,
  emptyStateMessage = "No records found matching your criteria."
}: JumoDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = data.map(item => item.id);
      const newSet = new Set(allIds);
      setSelectedIds(newSet);
      onSelectionChange?.(Array.from(newSet).map(String));
    } else {
      setSelectedIds(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id: string | number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
    onSelectionChange?.(Array.from(newSet).map(String));
  };

  const filteredData = useMemo(() => {
    let result = data.filter(item => {
      if (!searchTerm) return true;
      return Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (sortConfig) {
      // Basic sorting logic (could be expanded)
      result.sort((a: any, b: any) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="px-5 py-3 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {title && <h3 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h3>}
          {selectedIds.size > 0 && bulkActions && (
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <span className="text-xs font-bold text-indigo-600">{selectedIds.size} selected</span>
              {bulkActions}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative max-w-xs w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors border border-transparent">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors border border-transparent">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[200px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wide border-b border-slate-200">
            <tr>
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    checked={data.length > 0 && selectedIds.size === data.length}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col, idx) => (
                <th key={idx} className={`px-4 py-3 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onRowClick?.(item)}
                  className={`group transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : 'hover:bg-slate-50/50'} ${selectedIds.has(item.id) ? 'bg-indigo-50/30' : ''}`}
                >
                  {selectable && (
                    <td className="px-4 py-3 w-10" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedIds.has(item.id)}
                        onChange={(e) => handleSelectRow(item.id, e)}
                      />
                    </td>
                  )}
                  {columns.map((col, idx) => (
                    <td key={idx} className={`px-4 py-3 ${col.className || ''} text-slate-700`}>
                      {typeof col.accessor === 'function' 
                        ? col.accessor(item) 
                        : (item[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="px-4 py-16 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <LayoutGrid className="w-8 h-8 text-slate-300" />
                    <span className="text-sm">{emptyStateMessage}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination */}
      <div className="px-5 py-3 border-t border-slate-200 bg-white flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-700">{filteredData.length}</span> of <span className="font-bold text-slate-700">{data.length}</span> results
        </span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-2 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
