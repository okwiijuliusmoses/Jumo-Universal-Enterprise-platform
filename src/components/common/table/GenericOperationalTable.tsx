
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, Search, Filter, 
  ArrowUpDown, Download, Trash2, MoreVertical,
  CheckCircle, Clock, AlertCircle, FileText,
  ChevronDown, ChevronUp
} from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: { label: string; value: string }[];
}

interface Action<T> {
  label: string;
  icon: any;
  onClick: (row: T) => void;
  variant?: 'danger' | 'primary' | 'ghost';
  showCondition?: (row: T) => boolean;
}

interface GenericOperationalTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  onRowClick?: (row: T) => void;
  bulkActions?: {
    label: string;
    action: (selectedRows: T[]) => void;
    icon?: any;
    variant?: 'danger' | 'primary';
  }[];
  loading?: boolean;
  // Server-side props
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sorts: { key: keyof T; direction: 'asc' | 'desc' }[]) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  onSearchChange?: (query: string) => void;
  pageSize?: number;
  currentPage?: number;
}

export function GenericOperationalTable<T extends { id: string }>({ 
  data, 
  columns, 
  actions,
  onRowClick,
  bulkActions,
  loading = false,
  totalItems,
  onPageChange,
  onSortChange,
  onFilterChange,
  onSearchChange,
  pageSize = 10,
  currentPage = 1
}: GenericOperationalTableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfigs, setSortConfigs] = useState<{ key: keyof T; direction: 'asc' | 'desc' }[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const isServerSide = !!onPageChange;
  const activePage = isServerSide ? currentPage : internalPage;

  // 1. Filtering (Local fallback)
  const filteredData = useMemo(() => {
    if (isServerSide) return data;
    return data.filter(item => {
      const matchesSearch = Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesFilters = Object.entries(filters).every(([key, val]) => {
        if (!val) return true;
        const itemVal = (item as any)[key];
        return String(itemVal || '').toLowerCase() === String(val).toLowerCase();
      });
      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, filters, isServerSide]);

  // 2. Sorting (Local fallback + Multi-column)
  const sortedData = useMemo(() => {
    if (isServerSide || sortConfigs.length === 0) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      for (const config of sortConfigs) {
        const aVal = a[config.key];
        const bVal = b[config.key];
        if (aVal < bVal) return config.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfigs, isServerSide]);

  // 3. Pagination (Local fallback)
  const paginatedData = useMemo(() => {
    if (isServerSide) return data;
    const start = (activePage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [data, sortedData, activePage, pageSize, isServerSide]);

  const effectiveTotalItems = isServerSide ? (totalItems || 0) : sortedData.length;
  const totalPages = Math.ceil(effectiveTotalItems / pageSize);

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(r => r.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSort = (key: keyof T, multi: boolean = false) => {
    let newConfigs: { key: keyof T; direction: 'asc' | 'desc' }[] = [];
    const existing = sortConfigs.find(c => c.key === key);
    
    if (existing) {
      if (existing.direction === 'asc') {
        newConfigs = sortConfigs.map(c => c.key === key ? { ...c, direction: 'desc' as const } : c);
      } else {
        newConfigs = sortConfigs.filter(c => c.key !== key);
      }
    } else {
      const newConfig = { key, direction: 'asc' as const };
      newConfigs = multi ? [...sortConfigs, newConfig] : [newConfig];
    }

    setSortConfigs(newConfigs);
    onSortChange?.(newConfigs);
  };

  const handlePageChange = (page: number) => {
    if (isServerSide) {
      onPageChange?.(page);
    } else {
      setInternalPage(page);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Table Header / Toolbar */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text" 
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearchChange?.(e.target.value);
              }}
              className="w-full bg-slate-50 border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all outline-none"
            />
          </div>
          <button 
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
              isFilterPanelOpen ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            Filters
            {Object.values(filters).filter(Boolean).length > 0 && (
              <span className="bg-emerald-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]">
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {selectedRows.size > 0 && bulkActions?.map((action, i) => (
            <button
              key={i}
              onClick={() => action.action(data.filter(r => selectedRows.has(r.id)))}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                action.variant === 'danger' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {action.icon && <action.icon className="w-3.5 h-3.5" />}
              {action.label} ({selectedRows.size})
            </button>
          ))}
          <button className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      {isFilterPanelOpen && (
        <div className="p-6 bg-slate-50 border-b border-slate-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in slide-in-from-top-2 duration-300">
          {columns.filter(c => c.filterable).map(col => (
            <div key={String(col.accessor)} className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{col.header}</label>
              {col.filterOptions ? (
                <select 
                  value={filters[String(col.accessor)] || ''}
                  onChange={(e) => handleFilterChange(String(col.accessor), e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-tight focus:ring-2 focus:ring-slate-900 outline-none"
                >
                  <option value="">All {col.header}</option>
                  {col.filterOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input 
                  type="text"
                  placeholder={`Filter by ${col.header}...`}
                  value={filters[String(col.accessor)] || ''}
                  onChange={(e) => handleFilterChange(String(col.accessor), e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-tight focus:ring-2 focus:ring-slate-900 outline-none"
                />
              )}
            </div>
          ))}
          <div className="flex items-end">
            <button 
              onClick={() => {
                setFilters({});
                onFilterChange?.({});
              }}
              className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Table Body */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="p-4 w-12 border-b border-slate-100">
                <input 
                  type="checkbox" 
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
              </th>
              {columns.map((col, i) => {
                const sort = sortConfigs.find(c => c.key === col.accessor);
                return (
                  <th 
                    key={i} 
                    className={`p-4 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest ${col.sortable ? 'cursor-pointer hover:text-slate-900 transition-colors' : ''}`}
                    onClick={(e) => col.sortable && handleSort(col.accessor, e.shiftKey)}
                  >
                    <div className="flex items-center gap-2">
                      {col.header}
                      {col.sortable && (
                        <div className="flex flex-col -space-y-1">
                          <ChevronUp className={`w-2.5 h-2.5 ${sort?.direction === 'asc' ? 'text-slate-900' : 'text-slate-200'}`} />
                          <ChevronDown className={`w-2.5 h-2.5 ${sort?.direction === 'desc' ? 'text-slate-900' : 'text-slate-200'}`} />
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
              {actions && <th className="p-4 w-12 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="p-4"><div className="w-4 h-4 bg-slate-100 rounded" /></td>
                  {columns.map((_, j) => (
                    <td key={j} className="p-4"><div className="h-4 bg-slate-100 rounded w-3/4" /></td>
                  ))}
                  {actions && <td className="p-4"><div className="w-4 h-4 bg-slate-100 rounded ml-auto" /></td>}
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => onRowClick?.(row)}
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedRows.has(row.id)}
                      onChange={() => toggleSelectRow(row.id)}
                      className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                  </td>
                  {columns.map((col, i) => (
                    <td key={i} className="p-4 text-sm font-medium text-slate-600">
                      {col.render ? col.render((row as any)[col.accessor], row) : String((row as any)[col.accessor] || '')}
                    </td>
                  ))}
                  {actions && (
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {actions.filter(a => !a.showCondition || a.showCondition(row)).map((action, i) => (
                          <button
                            key={i}
                            onClick={() => action.onClick(row)}
                            title={action.label}
                            className={`p-1.5 rounded-lg transition-all ${
                              action.variant === 'danger' ? 'text-rose-500 hover:bg-rose-50' :
                              action.variant === 'primary' ? 'text-slate-900 hover:bg-slate-100' :
                              'text-slate-400 hover:bg-slate-50'
                            }`}
                          >
                            <action.icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 2 : 1)} className="p-20 text-center">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-6 shadow-inner">
                    <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No records found</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-3">Adjust your filters or initiate a search query</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination */}
      <div className="p-6 border-t border-slate-100 flex flex-wrap items-center justify-between bg-slate-50/50 gap-4">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Showing <span className="text-slate-900">{Math.min(effectiveTotalItems, (activePage - 1) * pageSize + 1)}</span> to <span className="text-slate-900">{Math.min(effectiveTotalItems, activePage * pageSize)}</span> of <span className="text-slate-900">{effectiveTotalItems}</span> records
        </div>
        <div className="flex items-center gap-1">
          <button 
            disabled={activePage === 1}
            onClick={() => handlePageChange(activePage - 1)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] no-scrollbar">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              // Simple pagination logic: show first, last, and a few around active
              if (totalPages > 7 && pageNum > 1 && pageNum < totalPages && (pageNum < activePage - 1 || pageNum > activePage + 1)) {
                if (pageNum === activePage - 2 || pageNum === activePage + 2) {
                   return <span key={i} className="text-slate-300">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all shrink-0 ${
                    activePage === pageNum 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                      : 'text-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button 
            disabled={activePage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(activePage + 1)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
