import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, Search, Filter, 
  ArrowUpDown, Download, Trash2, MoreVertical,
  CheckCircle, Clock, AlertCircle, FileText,
  ChevronDown, ChevronUp, Sliders, Eye, RefreshCw, 
  FileSpreadsheet, Shield, ShieldAlert, ShieldCheck, Play
} from 'lucide-react';

export interface ColumnConfig<T> {
  header: string;
  accessor: keyof T | string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: { label: string; value: string }[];
  type?: 'text' | 'number' | 'date' | 'status' | 'badge';
}

export interface RowAction<T> {
  label: string;
  icon: any;
  onClick: (row: T) => void;
  variant?: 'danger' | 'primary' | 'ghost' | 'success' | 'warning';
  showCondition?: (row: T) => boolean;
  requiredPermission?: string;
  requiredRole?: string;
}

export interface BulkAction<T> {
  label: string;
  icon?: any;
  action: (selectedRows: T[]) => void;
  variant?: 'danger' | 'primary' | 'success';
  requiredPermission?: string;
}

export interface AuditLogEntry {
  timestamp: string;
  action: string;
  actor: string;
  details: string;
}

export interface DynamicWorkingTableProps<T> {
  title?: string;
  subtitle?: string;
  data: T[];
  columns: ColumnConfig<T>[];
  actions?: RowAction<T>[];
  onRowClick?: (row: T) => void;
  bulkActions?: BulkAction<T>[];
  loading?: boolean;
  error?: string | null;
  currentUserRoles?: string[];
  currentUserPermissions?: string[];
  enableAuditTrail?: boolean;
  moduleIdentity?: string;
}

export function DynamicWorkingTable<T extends { id: string | number }>({
  title,
  subtitle,
  data = [],
  columns,
  actions = [],
  onRowClick,
  bulkActions = [],
  loading = false,
  error = null,
  currentUserRoles = [],
  currentUserPermissions = [],
  enableAuditTrail = true,
  moduleIdentity = 'JUMO-CORE'
}: DynamicWorkingTableProps<T>) {
  // Normalizing input to guarantee no crashes
  const normalizedData = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfigs, setSortConfigs] = useState<{ key: string; direction: 'asc' | 'desc' }[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isColumnPanelOpen, setIsColumnPanelOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map(col => String(col.accessor)))
  );
  
  // Audit trail state
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      action: 'BOOTSTRAP',
      actor: 'JUMO Platform kernel',
      details: `Initialized table projection for ${moduleIdentity}`
    }
  ]);
  const [showAuditPanel, setShowAuditPanel] = useState(false);

  // Helper to log actions
  const logAction = (action: string, details: string) => {
    if (!enableAuditTrail) return;
    const entry: AuditLogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      action,
      actor: currentUserRoles.includes('ROLE_CHURCH_ADMIN') ? 'Parish Administrator' : 'System Operator',
      details
    };
    setAuditLogs(prev => [entry, ...prev]);
  };

  // Check role & permission helper
  const hasAccess = (requiredRole?: string, requiredPermission?: string): boolean => {
    if (!requiredRole && !requiredPermission) return true;
    
    const roleMatch = !requiredRole || currentUserRoles.includes(requiredRole) || currentUserRoles.includes('ROLE_CHURCH_ADMIN') || currentUserRoles.includes('ROLE_ADMIN') || currentUserRoles.includes('ROLE_SUPER_ADMIN');
    const permMatch = !requiredPermission || currentUserPermissions.includes(requiredPermission) || currentUserRoles.includes('ROLE_CHURCH_ADMIN') || currentUserRoles.includes('ROLE_ADMIN') || currentUserRoles.includes('ROLE_SUPER_ADMIN');

    return roleMatch && permMatch;
  };

  // 1. Local Filtering
  const filteredData = useMemo(() => {
    return normalizedData.filter(item => {
      // Search logic (all fields)
      const matchesSearch = searchQuery.trim() === '' || Object.entries(item).some(([key, val]) => {
        if (!val) return false;
        if (typeof val === 'object') {
          return JSON.stringify(val).toLowerCase().includes(searchQuery.toLowerCase());
        }
        return String(val).toLowerCase().includes(searchQuery.toLowerCase());
      });

      // Compound Filters logic
      const matchesFilters = Object.entries(filters).every(([key, val]) => {
        if (!val || val === '') return true;
        
        // Nested lookup helper
        const itemVal = (item as any)[key];
        if (itemVal === undefined || itemVal === null) return false;

        if (typeof itemVal === 'boolean') {
          return String(itemVal) === val;
        }
        
        return String(itemVal).toLowerCase() === String(val).toLowerCase();
      });

      return matchesSearch && matchesFilters;
    });
  }, [normalizedData, searchQuery, filters]);

  // 2. Multi-column Sorting
  const sortedData = useMemo(() => {
    if (sortConfigs.length === 0) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      for (const config of sortConfigs) {
        let aVal = (a as any)[config.key];
        let bVal = (b as any)[config.key];

        // Safe conversion for sorting
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();

        if (aVal < bVal) return config.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfigs]);

  // 3. Local Pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
      logAction('BULK_DESELECT', 'Deselected all records in current page view');
    } else {
      const pageIds = paginatedData.map(r => r.id);
      setSelectedRows(new Set(pageIds));
      logAction('BULK_SELECT', `Selected all ${pageIds.length} records in current page view`);
    }
  };

  const toggleSelectRow = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
      logAction('ROW_DESELECT', `Deselected row with ID ${id}`);
    } else {
      newSelected.add(id);
      logAction('ROW_SELECT', `Selected row with ID ${id}`);
    }
    setSelectedRows(newSelected);
  };

  const handleSort = (key: string, multi: boolean = false) => {
    let newConfigs: { key: string; direction: 'asc' | 'desc' }[] = [];
    const existing = sortConfigs.find(c => c.key === key);
    
    if (existing) {
      if (existing.direction === 'asc') {
        newConfigs = sortConfigs.map(c => c.key === key ? { ...c, direction: 'desc' as const } : c);
        logAction('SORT_DESCENDING', `Sorted table descending by column: ${key}`);
      } else {
        newConfigs = sortConfigs.filter(c => c.key !== key);
        logAction('SORT_REMOVE', `Removed sorting from column: ${key}`);
      }
    } else {
      const newConfig = { key, direction: 'asc' as const };
      newConfigs = multi ? [...sortConfigs, newConfig] : [newConfig];
      logAction('SORT_ASCENDING', `Sorted table ascending by column: ${key}`);
    }

    setSortConfigs(newConfigs);
    setCurrentPage(1);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    logAction('FILTER_CHANGE', `Set filter ${key} to value "${value}"`);
  };

  const toggleColumnVisibility = (accessor: string) => {
    const next = new Set(visibleColumns);
    if (next.has(accessor)) {
      if (next.size > 1) { // keep at least 1 column visible
        next.delete(accessor);
        logAction('COLUMN_HIDE', `Hid column: ${accessor}`);
      }
    } else {
      next.add(accessor);
      logAction('COLUMN_SHOW', `Revealed column: ${accessor}`);
    }
    setVisibleColumns(next);
  };

  // Export handlers
  const exportToJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(sortedData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${moduleIdentity.toLowerCase()}_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logAction('EXPORT_JSON', `Exported ${sortedData.length} records to JSON file`);
  };

  const exportToCSV = () => {
    const headers = columns.filter(col => visibleColumns.has(String(col.accessor))).map(col => col.header).join(',');
    const rows = sortedData.map(row => {
      return columns
        .filter(col => visibleColumns.has(String(col.accessor)))
        .map(col => {
          const val = (row as any)[col.accessor];
          return `"${String(val || '').replace(/"/g, '""')}"`;
        })
        .join(',');
    });
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', `${moduleIdentity.toLowerCase()}_export.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logAction('EXPORT_CSV', `Exported ${sortedData.length} records to CSV file`);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Table Header Section */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white">
        <div>
          {title && <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5">{title}</h3>}
          {subtitle && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{subtitle}</p>}
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Column toggles */}
          <button 
            onClick={() => setIsColumnPanelOpen(!isColumnPanelOpen)}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all ${
              isColumnPanelOpen ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Columns
          </button>

          {/* Audit trail trigger */}
          {enableAuditTrail && (
            <button 
              onClick={() => setShowAuditPanel(!showAuditPanel)}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all ${
                showAuditPanel ? 'bg-purple-900 text-white border-purple-900' : 'bg-white border-slate-200 text-purple-600 hover:bg-purple-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Audit Trail ({auditLogs.length})
            </button>
          )}

          {/* Export options */}
          <div className="flex items-center border border-slate-200 rounded-lg divide-x divide-slate-100 overflow-hidden bg-white">
            <button 
              onClick={exportToCSV}
              title="Export as CSV"
              className="px-2.5 py-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              CSV
            </button>
            <button 
              onClick={exportToJSON}
              title="Export as JSON"
              className="px-2.5 py-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Column Config Panel */}
      {isColumnPanelOpen && (
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-150">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center w-full mb-1">Visible Columns</span>
          {columns.map(col => {
            const accessorStr = String(col.accessor);
            const isVisible = visibleColumns.has(accessorStr);
            return (
              <button
                key={accessorStr}
                onClick={() => toggleColumnVisibility(accessorStr)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold border flex items-center gap-1 transition-all ${
                  isVisible 
                    ? 'bg-white border-slate-300 text-slate-800 shadow-sm' 
                    : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                {col.header}
              </button>
            );
          })}
        </div>
      )}

      {/* Advanced Filter, Search Toolbar */}
      <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[260px] max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          <input 
            type="text" 
            placeholder="Search matching rows..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-100 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all outline-none font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          {columns.filter(c => c.filterable).map(col => (
            <div key={String(col.accessor)} className="flex items-center gap-1.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{col.header}:</span>
              {col.filterOptions ? (
                <select 
                  value={filters[String(col.accessor)] || ''}
                  onChange={(e) => handleFilterChange(String(col.accessor), e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 focus:ring-1 focus:ring-slate-900 outline-none"
                >
                  <option value="">All</option>
                  {col.filterOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input 
                  type="text"
                  placeholder="Filter..."
                  value={filters[String(col.accessor)] || ''}
                  onChange={(e) => handleFilterChange(String(col.accessor), e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 w-24 focus:ring-1 focus:ring-slate-900 outline-none"
                />
              )}
            </div>
          ))}

          {Object.values(filters).filter(Boolean).length > 0 && (
            <button 
              onClick={() => {
                setFilters({});
                logAction('FILTER_CLEAR', 'Cleared all table filters');
              }}
              className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors ml-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedRows.size > 0 && (
        <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between gap-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bulk Execution</span>
            <span className="px-2 py-0.5 rounded bg-white/20 text-white font-mono text-xs font-bold">
              {selectedRows.size} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            {bulkActions.map((action, idx) => {
              if (action.requiredPermission && !currentUserPermissions.includes(action.requiredPermission)) return null;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    const matchedRows = normalizedData.filter(r => selectedRows.has(r.id));
                    action.action(matchedRows);
                    logAction('BULK_ACTION', `Executed bulk action "${action.label}" on ${selectedRows.size} rows`);
                    setSelectedRows(new Set());
                  }}
                  className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-all ${
                    action.variant === 'danger' ? 'bg-rose-600 hover:bg-rose-700 text-white' :
                    action.variant === 'success' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' :
                    'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {action.icon && <action.icon className="w-3 h-3" />}
                  {action.label}
                </button>
              );
            })}
            <button 
              onClick={() => {
                setSelectedRows(new Set());
                logAction('BULK_CANCEL', 'Cancelled bulk selection');
              }}
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Split Audit Trail and Table Grid Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Table Viewport */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          {error ? (
            <div className="p-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mx-auto">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Security & Execution Failure</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg"
              >
                Retry Request
              </button>
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">No Active Projections</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                {searchQuery || Object.values(filters).filter(Boolean).length > 0 
                  ? 'No records match search constraints' 
                  : 'Sovereign database returned empty registry record'
                }
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr className="border-b border-slate-100">
                  <th className="p-3 w-10 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={toggleSelectAll}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                  </th>
                  {columns.filter(col => visibleColumns.has(String(col.accessor))).map((col, idx) => {
                    const sort = sortConfigs.find(c => c.key === col.accessor);
                    return (
                      <th 
                        key={idx}
                        onClick={() => col.sortable && handleSort(String(col.accessor))}
                        className={`p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest ${
                          col.sortable ? 'cursor-pointer hover:text-slate-900 transition-colors' : ''
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {col.header}
                          {col.sortable && (
                            <div className="flex flex-col -space-y-0.5">
                              <ChevronUp className={`w-2.5 h-2.5 ${sort?.direction === 'asc' ? 'text-slate-900' : 'text-slate-300'}`} />
                              <ChevronDown className={`w-2.5 h-2.5 ${sort?.direction === 'desc' ? 'text-slate-900' : 'text-slate-300'}`} />
                            </div>
                          )}
                        </div>
                      </th>
                    );
                  })}
                  {actions.length > 0 && (
                    <th className="p-3 w-20 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-3"><div className="w-3.5 h-3.5 bg-slate-100 rounded" /></td>
                      {columns.filter(c => visibleColumns.has(String(c.accessor))).map((_, j) => (
                        <td key={j} className="p-3"><div className="h-3.5 bg-slate-100 rounded w-2/3" /></td>
                      ))}
                      {actions.length > 0 && <td className="p-3"><div className="w-12 h-3.5 bg-slate-100 rounded ml-auto" /></td>}
                    </tr>
                  ))
                ) : (
                  paginatedData.map((row) => (
                    <tr 
                      key={row.id}
                      onClick={() => onRowClick?.(row)}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    >
                      <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={selectedRows.has(row.id)}
                          onChange={() => toggleSelectRow(row.id)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                      </td>
                      {columns.filter(col => visibleColumns.has(String(col.accessor))).map((col, idx) => {
                        const cellVal = (row as any)[col.accessor];
                        return (
                          <td key={idx} className="p-3 text-slate-600 font-medium whitespace-nowrap">
                            {col.render ? (
                              col.render(cellVal, row)
                            ) : col.type === 'status' ? (
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider inline-flex items-center gap-1 border ${
                                String(cellVal).toUpperCase() === 'ACTIVE' || String(cellVal).toUpperCase() === 'VERIFIED'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : String(cellVal).toUpperCase() === 'PENDING'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                              }`}>
                                {String(cellVal)}
                              </span>
                            ) : (
                              String(cellVal || '')
                            )}
                          </td>
                        );
                      })}
                      {actions.length > 0 && (
                        <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {actions
                              .filter(a => !a.showCondition || a.showCondition(row))
                              .map((action, aIdx) => {
                                const allowed = hasAccess(action.requiredRole, action.requiredPermission);
                                if (!allowed) return null;
                                
                                return (
                                  <button
                                    key={aIdx}
                                    onClick={() => {
                                      action.onClick(row);
                                      logAction('ROW_ACTION', `Executed row action "${action.label}" on row ID ${row.id}`);
                                    }}
                                    title={action.label}
                                    className={`p-1 rounded-md border border-transparent transition-all ${
                                      action.variant === 'danger' ? 'text-rose-600 hover:bg-rose-50 hover:border-rose-100' :
                                      action.variant === 'success' ? 'text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100' :
                                      action.variant === 'primary' ? 'text-slate-900 hover:bg-slate-100' :
                                      'text-slate-400 hover:bg-slate-50 hover:text-slate-950'
                                    }`}
                                  >
                                    <action.icon className="w-3.5 h-3.5" />
                                  </button>
                                );
                              })}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Audit Panel (Collapsible slide-out) */}
        {enableAuditTrail && showAuditPanel && (
          <div className="w-80 border-l border-slate-200 bg-slate-50 flex flex-col animate-in slide-in-from-right-4 duration-150">
            <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-white">
              <strong className="text-[10px] font-black text-purple-950 uppercase tracking-widest flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-purple-700" />
                Ledger Security Audit Logs
              </strong>
              <button 
                onClick={() => setShowAuditPanel(false)}
                className="text-slate-400 hover:text-slate-900 text-[11px] font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-[9px] text-slate-500 custom-scrollbar">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="p-2 rounded bg-white border border-slate-100 space-y-1">
                  <div className="flex justify-between text-[8px] text-slate-400 font-bold border-b pb-1 mb-1">
                    <span>{log.timestamp}</span>
                    <span className="text-purple-600 font-black">{log.action}</span>
                  </div>
                  <div className="text-slate-800 font-bold">{log.actor}</div>
                  <div className="text-slate-500 whitespace-pre-wrap">{log.details}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex flex-wrap items-center justify-between bg-slate-50/50 gap-3">
        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          Showing <span className="text-slate-900">{totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span> to <span className="text-slate-900">{Math.min(totalItems, currentPage * pageSize)}</span> of <span className="text-slate-900">{totalItems}</span> records
        </div>
        
        <div className="flex items-center gap-2">
          {/* Page size selector */}
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <span>Size:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded-md px-1.5 py-0.5 text-xs font-bold text-slate-700 outline-none focus:ring-1 focus:ring-slate-900"
            >
              {[5, 10, 20, 50, 100].map(sz => (
                <option key={sz} value={sz}>{sz}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-slate-700 px-1 font-mono">
              {currentPage} / {totalPages || 1}
            </span>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-sm"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
