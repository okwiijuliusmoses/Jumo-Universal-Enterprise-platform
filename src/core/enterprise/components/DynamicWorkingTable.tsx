import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, Download, AlertCircle, CheckCircle, 
  X, ChevronDown, ChevronUp, SlidersHorizontal, Lock, CheckSquare, 
  ChevronLeft, ChevronRight, Eye, RefreshCw, FileSpreadsheet, Sparkles
} from 'lucide-react';

export interface FieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'currency' | 'percent' | 'select';
  editable?: boolean;
  required?: boolean;
  options?: { label: string; value: any; colorClass?: string }[]; // For select type or badge mappings
  validation?: (value: any) => string | null;
  placeholder?: string;
  defaultValue?: any;
}

export interface ColumnConfig<T> {
  key: string;
  header: string;
  sortable?: boolean;
  hidden?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface PermissionMetadata {
  canCreate?: boolean;
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canExport?: boolean;
  allowedRoles?: string[];
  currentUserRole?: string;
}

export interface DynamicWorkingTableProps<T extends { id: string | number }> {
  title: string;
  subtitle?: string;
  data: T[];
  fields: FieldDefinition[];
  columns: ColumnConfig<T>[];
  permissions: PermissionMetadata;
  onCreate?: (record: any) => void | Promise<void>;
  onUpdate?: (id: string | number, record: any) => void | Promise<void>;
  onDelete?: (id: string | number) => void | Promise<void>;
  onBulkAction?: (ids: (string | number)[], action: string) => void | Promise<void>;
  bulkActions?: { label: string; value: string; className?: string }[];
  searchPlaceholder?: string;
  accentColor?: 'indigo' | 'slate' | 'emerald' | 'blue' | 'purple' | 'amber';
}

export function DynamicWorkingTable<T extends { id: string | number }>({
  title,
  subtitle,
  data,
  fields,
  columns,
  permissions,
  onCreate,
  onUpdate,
  onDelete,
  onBulkAction,
  bulkActions,
  searchPlaceholder = "Search dynamic entries...",
  accentColor = 'indigo'
}: DynamicWorkingTableProps<T>) {
  // Navigation & Search State
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dynamic Modals State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Form errors & data state
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Custom Dynamic Filters State (reacts to badge/select fields automatically!)
  const [dynamicFilters, setDynamicFilters] = useState<Record<string, string>>({});

  // Color map classes based on accent props
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      borderFocus: 'focus:ring-indigo-500 focus:border-indigo-500',
      text: 'text-indigo-600',
      lightBg: 'bg-indigo-50/50'
    },
    slate: {
      bg: 'bg-slate-900 hover:bg-slate-800 text-white',
      badge: 'bg-slate-100 text-slate-800 border-slate-200',
      borderFocus: 'focus:ring-slate-900 focus:border-slate-900',
      text: 'text-slate-900',
      lightBg: 'bg-slate-100/50'
    },
    emerald: {
      bg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      borderFocus: 'focus:ring-emerald-500 focus:border-emerald-500',
      text: 'text-emerald-600',
      lightBg: 'bg-emerald-50/50'
    },
    blue: {
      bg: 'bg-blue-600 hover:bg-blue-700 text-white',
      badge: 'bg-blue-50 text-blue-700 border-blue-100',
      borderFocus: 'focus:ring-blue-500 focus:border-blue-500',
      text: 'text-blue-600',
      lightBg: 'bg-blue-50/50'
    },
    purple: {
      bg: 'bg-purple-600 hover:bg-purple-700 text-white',
      badge: 'bg-purple-50 text-purple-700 border-purple-100',
      borderFocus: 'focus:ring-purple-500 focus:border-purple-500',
      text: 'text-purple-600',
      lightBg: 'bg-purple-50/50'
    },
    amber: {
      bg: 'bg-amber-600 hover:bg-amber-700 text-white',
      badge: 'bg-amber-50 text-amber-700 border-amber-100',
      borderFocus: 'focus:ring-amber-500 focus:border-amber-500',
      text: 'text-amber-600',
      lightBg: 'bg-amber-50/50'
    }
  };

  const style = colorMap[accentColor] || colorMap.indigo;

  // Role Gate Check
  const hasRolePermission = useMemo(() => {
    if (!permissions.allowedRoles) return true;
    if (!permissions.currentUserRole) return false;
    return permissions.allowedRoles.includes(permissions.currentUserRole);
  }, [permissions]);

  const canCreate = permissions.canCreate && hasRolePermission;
  const canUpdate = permissions.canUpdate && hasRolePermission;
  const canDelete = permissions.canDelete && hasRolePermission;
  const canExport = permissions.canExport && hasRolePermission;

  // Automap distinct filter options for select/badge fields to dynamically populate the filter panel
  const filterOptions = useMemo(() => {
    const opts: Record<string, string[]> = {};
    fields.forEach(f => {
      if (f.type === 'select' || f.type === 'badge' || f.type === 'boolean') {
        const distinct = new Set<string>();
        data.forEach((item: any) => {
          if (item[f.key] !== undefined && item[f.key] !== null) {
            distinct.add(String(item[f.key]));
          }
        });
        opts[f.key] = Array.from(distinct);
      }
    });
    return opts;
  }, [data, fields]);

  // Execute Search, Sorting, and Complex Dynamic Filtering
  const processedData = useMemo(() => {
    let result = [...data];

    // 1. Text Search across ALL mapped fields
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(item => {
        return fields.some(f => {
          const val = item[f.key as keyof T];
          return val !== undefined && val !== null && String(val).toLowerCase().includes(q);
        });
      });
    }

    // 2. Multi-column Dynamic Filters
    Object.entries(dynamicFilters).forEach(([key, filterVal]) => {
      if (filterVal && filterVal !== 'ALL') {
        result = result.filter(item => String((item as any)[key]) === filterVal);
      }
    });

    // 3. Robust Multi-type Sorting Engine
    if (sortField) {
      result.sort((a: any, b: any) => {
        let valA = a[sortField];
        let valB = b[sortField];

        // Format checking to avoid string vs number mismatching in sort
        const fieldDef = fields.find(f => f.key === sortField);
        if (fieldDef?.type === 'number' || fieldDef?.type === 'currency' || fieldDef?.type === 'percent') {
          valA = Number(valA) || 0;
          valB = Number(valB) || 0;
        } else {
          valA = String(valA || '').toLowerCase();
          valB = String(valB || '').toLowerCase();
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, search, dynamicFilters, sortField, sortDirection, fields]);

  // Pagination Window Slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize]);

  const totalPages = Math.ceil(processedData.length / pageSize) || 1;

  // Form input validation & state updates
  const handleInputChange = (key: string, value: any) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
    // Clear error dynamically as user fixes input
    if (formErrors[key]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  // Form submit & validation engine
  const validateForm = () => {
    const errors: Record<string, string> = {};
    fields.forEach(f => {
      const val = formValues[f.key];
      if (f.required && (val === undefined || val === null || String(val).trim() === '')) {
        errors[f.key] = `${f.label} is required`;
      } else if (f.validation) {
        const customError = f.validation(val);
        if (customError) errors[f.key] = customError;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openCreateModal = () => {
    const defaults: Record<string, any> = {};
    fields.forEach(f => {
      defaults[f.key] = f.defaultValue !== undefined ? f.defaultValue : (f.type === 'boolean' ? false : '');
    });
    setFormValues(defaults);
    setFormErrors({});
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (onCreate) {
        await onCreate(formValues);
        setIsCreateOpen(false);
      }
    } catch (err: any) {
      setFormErrors({ _global: err.message || 'Failed to create record' });
    }
  };

  const openEditModal = (item: T) => {
    setSelectedItem(item);
    const itemValues: Record<string, any> = {};
    fields.forEach(f => {
      itemValues[f.key] = item[f.key as keyof T] !== undefined ? item[f.key as keyof T] : '';
    });
    setFormValues(itemValues);
    setFormErrors({});
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedItem) return;
    try {
      if (onUpdate) {
        await onUpdate(selectedItem.id, formValues);
        setIsEditOpen(false);
        setSelectedItem(null);
      }
    } catch (err: any) {
      setFormErrors({ _global: err.message || 'Failed to update record' });
    }
  };

  const handleDeleteClick = async (id: string | number) => {
    if (window.confirm('Are you absolutely sure you want to delete this record? This action cannot be undone.')) {
      try {
        if (onDelete) {
          await onDelete(id);
          // Sync selected IDs
          const newSet = new Set(selectedIds);
          newSet.delete(id);
          setSelectedIds(newSet);
        }
      } catch (err) {
        alert('Deletion failed: ' + String(err));
      }
    }
  };

  // Selection managers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageIds = paginatedData.map(item => item.id);
      const newSet = new Set([...selectedIds, ...pageIds]);
      setSelectedIds(newSet);
    } else {
      const pageIds = paginatedData.map(item => item.id);
      const newSet = new Set(selectedIds);
      pageIds.forEach(id => newSet.delete(id));
      setSelectedIds(newSet);
    }
  };

  const handleSelectRow = (id: string | number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBulkActionExecute = async (action: string) => {
    if (selectedIds.size === 0) return;
    if (onBulkAction) {
      try {
        await onBulkAction(Array.from(selectedIds), action);
        setSelectedIds(new Set());
      } catch (err) {
        alert('Bulk action failed: ' + String(err));
      }
    }
  };

  // Standard CSV Export
  const handleExportCSV = () => {
    if (!canExport) return;
    const csvHeaders = columns.map(c => `"${c.header}"`).join(',') + '\n';
    const csvRows = processedData.map(item => {
      return columns.map(c => {
        let val = (item as any)[c.key];
        // Handle rendering mapping or fallback to raw
        if (typeof val === 'object') {
          return `""`;
        }
        return `"${String(val || '').replace(/"/g, '""')}"`;
      }).join(',');
    }).join('\n');

    const blob = new Blob([csvHeaders + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (key: string) => {
    if (sortField === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(key);
      setSortDirection('asc');
    }
  };

  const resetAllFilters = () => {
    setDynamicFilters({});
    setSearch('');
    setCurrentPage(1);
  };

  // Formatter for Currency, Percentage, Dates
  const formatValue = (value: any, type: string) => {
    if (value === undefined || value === null) return 'N/A';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'UGX', minimumFractionDigits: 0 }).format(Number(value));
      case 'percent':
        return `${Number(value).toFixed(1)}%`;
      case 'date':
        try {
          return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch {
          return String(value);
        }
      case 'boolean':
        return value ? (
          <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
            <CheckCircle className="w-2.5 h-2.5" /> YES
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[9px] font-black text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
            <X className="w-2.5 h-2.5" /> NO
          </span>
        );
      default:
        return String(value);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col transition-all">
      {/* 1. Shell Control Toolbar */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Main search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all outline-none"
            />
          </div>

          {/* Toggle filter drawer button */}
          <button 
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-1.5 text-xs font-bold ${Object.values(dynamicFilters).some(Boolean) ? 'border-indigo-400 bg-indigo-50/20 text-indigo-700' : ''}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          {/* Export action */}
          {canExport && (
            <button 
              onClick={handleExportCSV}
              className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Export Current Query to CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          )}

          {/* Create action */}
          {canCreate && (
            <button 
              onClick={openCreateModal}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${style.bg}`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Record</span>
            </button>
          )}

          {/* Gated visual notice */}
          {!hasRolePermission && permissions.allowedRoles && (
            <div className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 font-black border border-amber-200 px-2 py-1 rounded-lg">
              <Lock className="w-3 h-3" />
              <span>GATED ({permissions.currentUserRole || 'GUEST'})</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Collapsible Advanced Filters Drawer Panel */}
      {isFilterPanelOpen && (
        <div className="bg-slate-50/50 border-b border-slate-100 p-5 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b pb-2 mb-4 border-slate-200/60">
            <span className="font-black text-slate-900 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" /> Segment Filtering Matrix
            </span>
            <button 
              onClick={resetAllFilters} 
              className="text-[10px] font-black text-slate-500 hover:text-slate-900 cursor-pointer bg-white border border-slate-200 px-2 py-1 rounded-lg"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {fields.map(f => {
              if (f.type !== 'select' && f.type !== 'badge' && f.type !== 'boolean') return null;
              
              const options = f.options || filterOptions[f.key]?.map(val => ({ label: val, value: val })) || [];
              if (options.length === 0) return null;

              return (
                <div key={f.key} className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.label}</label>
                  <select
                    value={dynamicFilters[f.key] || 'ALL'}
                    onChange={(e) => {
                      setDynamicFilters(prev => ({ ...prev, [f.key]: e.target.value }));
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 font-bold text-slate-700"
                  >
                    <option value="ALL">All Values</option>
                    {f.type === 'boolean' ? (
                      <>
                        <option value="true">YES</option>
                        <option value="false">NO</option>
                      </>
                    ) : (
                      options.map((opt: any) => (
                        <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
                      ))
                    )}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Bulk Action Execution Toolbar */}
      {selectedIds.size > 0 && bulkActions && onBulkAction && (
        <div className="bg-indigo-50 border-b border-indigo-100 px-5 py-3.5 flex items-center justify-between gap-4 animate-fade-in text-xs font-bold text-indigo-900">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-500" />
            <span>Selected <span className="text-indigo-700 font-black">{selectedIds.size}</span> records for batch action</span>
          </div>

          <div className="flex items-center gap-2">
            {bulkActions.map(action => (
              <button
                key={action.value}
                onClick={() => handleBulkActionExecute(action.value)}
                className={`px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${action.className || ''}`}
              >
                {action.label}
              </button>
            ))}
            <button 
              onClick={() => setSelectedIds(new Set())}
              className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Cancel Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. High-Density Unified Table Structure */}
      <div className="overflow-x-auto min-h-[300px] custom-scrollbar">
        <table className="w-full text-left border-collapse table-auto text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
            <tr>
              {/* Optional multi-select check */}
              {bulkActions && onBulkAction && (
                <th className="py-3.5 px-5 w-10 text-center">
                  <input 
                    type="checkbox"
                    checked={paginatedData.length > 0 && paginatedData.every(item => selectedIds.has(item.id))}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4"
                  />
                </th>
              )}
              
              {/* Columns Header */}
              {columns.map(col => {
                if (col.hidden) return null;
                const isSortable = col.sortable !== false;
                const alignClass = col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left';

                return (
                  <th 
                    key={col.key} 
                    className={`py-3.5 px-5 ${alignClass} ${isSortable ? 'cursor-pointer hover:bg-slate-100 transition-colors' : ''} ${col.className || ''}`}
                    onClick={() => isSortable && handleSort(col.key)}
                  >
                    <div className={`flex items-center gap-1 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                      <span>{col.header}</span>
                      {isSortable && sortField === col.key && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-slate-600" /> : <ChevronDown className="w-3 h-3 text-slate-600" />
                      )}
                    </div>
                  </th>
                );
              })}

              <th className="py-3.5 px-5 text-right whitespace-nowrap">Action Shell</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="py-16 text-center text-slate-400 font-bold">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <span className="text-sm">No records match current parameters.</span>
                    <button onClick={resetAllFilters} className="text-xs font-black text-indigo-600 mt-2 hover:underline">
                      Reset Search Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map(item => {
                const isSelected = selectedIds.has(item.id);

                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-slate-50/70 transition-colors ${isSelected ? style.lightBg : ''}`}
                  >
                    {/* Multi-select box */}
                    {bulkActions && onBulkAction && (
                      <td className="py-3.5 px-5 text-center" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(item.id)}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4"
                        />
                      </td>
                    )}

                    {/* Dynamic column data formatting */}
                    {columns.map(col => {
                      if (col.hidden) return null;
                      const alignClass = col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left';
                      const rawValue = (item as any)[col.key];
                      const fieldDef = fields.find(f => f.key === col.key);

                      return (
                        <td key={col.key} className={`py-3.5 px-5 ${alignClass} ${col.className || ''}`}>
                          {col.render ? (
                            col.render(rawValue, item)
                          ) : fieldDef?.type === 'badge' ? (
                            (() => {
                              const matchOpt = fieldDef.options?.find(o => String(o.value) === String(rawValue));
                              return (
                                <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${matchOpt?.colorClass || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                                  {matchOpt?.label || String(rawValue)}
                                </span>
                              );
                            })()
                          ) : (
                            <span className={fieldDef?.type === 'number' || fieldDef?.type === 'currency' ? 'font-mono' : ''}>
                              {formatValue(rawValue, fieldDef?.type || 'text')}
                            </span>
                          )}
                        </td>
                      );
                    })}

                    {/* Standard Action Operations */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Detail Inspector Button */}
                        <button
                          onClick={() => { setSelectedItem(item); setIsViewOpen(true); }}
                          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
                          title="View Portfolio Records"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Action */}
                        {canUpdate && (
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
                            title="Edit Ledger Entry"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete Action */}
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-rose-500 hover:text-rose-700 cursor-pointer transition-colors"
                            title="Delete Dynamic Ledger Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

      {/* 5. Pagination Footer Navigation */}
      <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <span>
            Showing <span className="text-slate-800 font-black">{processedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="text-slate-800 font-black">{Math.min(currentPage * pageSize, processedData.length)}</span> of{' '}
            <span className="text-slate-800 font-black">{processedData.length}</span> records
          </span>

          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="px-2 py-1 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="text-xs font-black text-slate-700 px-3">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden animate-zoom-in border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">Dynamic Creation Console</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Creating in {title}</p>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white cursor-pointer p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto custom-scrollbar space-y-4 text-xs font-bold text-slate-700">
                {formErrors._global && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{formErrors._global}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map(f => {
                    if (f.editable === false && f.defaultValue === undefined) return null;

                    return (
                      <div key={f.key} className={`space-y-1 ${f.type === 'boolean' ? 'col-span-1 flex items-center gap-2 pt-5' : ''}`}>
                        {f.type !== 'boolean' && (
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-0.5">
                            <span>{f.label}</span>
                            {f.required && <span className="text-rose-500 font-black">*</span>}
                          </label>
                        )}

                        {f.type === 'boolean' ? (
                          <>
                            <input 
                              type="checkbox"
                              checked={!!formValues[f.key]}
                              onChange={(e) => handleInputChange(f.key, e.target.checked)}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                              id={`create_checkbox_${f.key}`}
                            />
                            <label htmlFor={`create_checkbox_${f.key}`} className="text-xs font-bold text-slate-700 cursor-pointer">{f.label}</label>
                          </>
                        ) : f.type === 'select' || f.type === 'badge' ? (
                          <select
                            value={formValues[f.key] || ''}
                            onChange={(e) => handleInputChange(f.key, e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-slate-900"
                          >
                            <option value="">Select option...</option>
                            {f.options?.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={f.type === 'number' || f.type === 'currency' || f.type === 'percent' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                            placeholder={f.placeholder || `Enter ${f.label.toLowerCase()}...`}
                            value={formValues[f.key] || ''}
                            onChange={(e) => handleInputChange(f.key, e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-slate-900 font-medium"
                          />
                        )}

                        {formErrors[f.key] && (
                          <p className="text-[10px] text-rose-500 font-bold">{formErrors[f.key]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase cursor-pointer ${style.bg}`}
                >
                  Confirm Creation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden animate-zoom-in border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">Dynamic Revision Console</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {selectedItem.id}</p>
              </div>
              <button onClick={() => { setIsEditOpen(false); setSelectedItem(null); }} className="text-slate-400 hover:text-white cursor-pointer p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="p-6 overflow-y-auto custom-scrollbar space-y-4 text-xs font-bold text-slate-700">
                {formErrors._global && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{formErrors._global}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map(f => {
                    const isEditable = f.editable !== false;

                    return (
                      <div key={f.key} className={`space-y-1 ${f.type === 'boolean' ? 'col-span-1 flex items-center gap-2 pt-5' : ''}`}>
                        {f.type !== 'boolean' && (
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-0.5">
                            <span>{f.label}</span>
                            {f.required && <span className="text-rose-500 font-black">*</span>}
                            {!isEditable && <span className="text-[9px] font-black bg-slate-100 text-slate-500 rounded px-1 scale-90 uppercase">READONLY</span>}
                          </label>
                        )}

                        {f.type === 'boolean' ? (
                          <>
                            <input 
                              type="checkbox"
                              checked={!!formValues[f.key]}
                              onChange={(e) => isEditable && handleInputChange(f.key, e.target.checked)}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer disabled:opacity-50"
                              disabled={!isEditable}
                              id={`edit_checkbox_${f.key}`}
                            />
                            <label htmlFor={`edit_checkbox_${f.key}`} className="text-xs font-bold text-slate-700 cursor-pointer">{f.label}</label>
                          </>
                        ) : f.type === 'select' || f.type === 'badge' ? (
                          <select
                            value={formValues[f.key] || ''}
                            onChange={(e) => handleInputChange(f.key, e.target.value)}
                            disabled={!isEditable}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-slate-900 disabled:opacity-50"
                          >
                            <option value="">Select option...</option>
                            {f.options?.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={f.type === 'number' || f.type === 'currency' || f.type === 'percent' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                            placeholder={f.placeholder}
                            value={formValues[f.key] || ''}
                            onChange={(e) => handleInputChange(f.key, e.target.value)}
                            disabled={!isEditable}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-slate-900 disabled:opacity-50 font-medium"
                          />
                        )}

                        {formErrors[f.key] && (
                          <p className="text-[10px] text-rose-500 font-bold">{formErrors[f.key]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => { setIsEditOpen(false); setSelectedItem(null); }}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase cursor-pointer ${style.bg}`}
                >
                  Confirm Revision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PORTFOLIO VIEW INSPECTOR DRAWER */}
      {isViewOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in border-l border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">Metadata Portfolio Inspector</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Record ID: {selectedItem.id}</p>
              </div>
              <button onClick={() => { setIsViewOpen(false); setSelectedItem(null); }} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6 text-xs font-bold text-slate-700">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5">
                {fields.map(f => {
                  const rawValue = selectedItem[f.key as keyof T];
                  return (
                    <div key={f.key} className="flex justify-between items-start border-b border-slate-100 pb-2.5 last:border-b-0 last:pb-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.label}</span>
                      <div className="text-slate-900 font-semibold text-right max-w-[280px] break-words">
                        {f.type === 'badge' ? (
                          (() => {
                            const matchOpt = f.options?.find(o => String(o.value) === String(rawValue));
                            return (
                              <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${matchOpt?.colorClass || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                                {matchOpt?.label || String(rawValue)}
                              </span>
                            );
                          })()
                        ) : (
                          formatValue(rawValue, f.type)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* JSON representation for developers/superadmins */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Raw System Schema Dump</span>
                <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[10px] font-mono overflow-x-auto">
                  {JSON.stringify(selectedItem, null, 2)}
                </pre>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => { setIsViewOpen(false); setSelectedItem(null); }}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold cursor-pointer"
              >
                Close Inspector
              </button>
              {canUpdate && (
                <button
                  onClick={() => {
                    const item = selectedItem;
                    setIsViewOpen(false);
                    openEditModal(item);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase cursor-pointer ${style.bg}`}
                >
                  Edit Record
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
