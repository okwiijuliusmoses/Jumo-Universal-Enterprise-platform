import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ChevronLeft, ChevronRight, Download, 
  Plus, Edit, Trash2, Eye, MoreVertical, CheckCircle, 
  Clock, AlertCircle, ArrowUpDown, ChevronDown, ChevronUp,
  FileSpreadsheet, ShieldCheck
} from 'lucide-react';

export interface GridColumn<T = any> {
  id: string;
  header: string;
  accessor?: keyof T | ((row: T) => any);
  render?: (val: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface UniversalDataGridProps<T extends { id: string } = any> {
  title?: string;
  data: T[];
  columns?: GridColumn<T>[];
  onAddRecord?: () => void;
  onViewRecord?: (row: T) => void;
  onEditRecord?: (row: T) => void;
  onDeleteRecord?: (row: T) => void;
  pageSize?: number;
  emptyMessage?: string;
}

export function UniversalDataGrid<T extends { id: string }>({
  title = 'Institutional Records Ledger',
  data = [],
  columns,
  onAddRecord,
  onViewRecord,
  onEditRecord,
  onDeleteRecord,
  pageSize = 10,
  emptyMessage = 'No institutional records found.'
}: UniversalDataGridProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Auto-generate columns from data if not provided
  const activeColumns: GridColumn<T>[] = useMemo(() => {
    if (columns && columns.length > 0) return columns;
    if (data.length === 0) {
      return [
        { id: 'id', header: 'Record ID', accessor: 'id', sortable: true },
        { id: 'name', header: 'Subject / Title', accessor: (r: any) => r.fullName || r.name || r.title || r.id, sortable: true },
        { id: 'status', header: 'Status', accessor: 'status', sortable: true }
      ];
    }
    const sample = data[0];
    const keys = Object.keys(sample).filter(k => k !== 'password' && k !== 'secret' && k !== 'hash');
    return keys.slice(0, 6).map(k => ({
      id: k,
      header: k.replace(/([A-Z])/g, ' $1').toUpperCase(),
      accessor: (r: any) => r[k],
      sortable: true
    }));
  }, [columns, data]);

  // Filter
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(item => {
      return Object.values(item).some(val => 
        String(val ?? '').toLowerCase().includes(q)
      );
    });
  }, [data, search]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const col = activeColumns.find(c => c.id === sortKey);
      const aVal = typeof col?.accessor === 'function' ? col.accessor(a) : (a as any)[col?.accessor || sortKey];
      const bVal = typeof col?.accessor === 'function' ? col.accessor(b) : (b as any)[col?.accessor || sortKey];
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDir, activeColumns]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const handleSort = (colId: string) => {
    if (sortKey === colId) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(colId);
      setSortDir('asc');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(paginatedData.map(d => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleExportCSV = () => {
    if (data.length === 0) return;
    const headers = activeColumns.map(c => c.header).join(',');
    const rows = filteredData.map(row => {
      return activeColumns.map(col => {
        const val = typeof col.accessor === 'function' ? col.accessor(row) : (row as any)[col.accessor || col.id];
        return `"${String(val ?? '').replace(/"/g, '""')}"`;
      }).join(',');
    });
    const csv = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `ledger_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* TOOLBAR */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search records by name, ID, category..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {filteredData.length} records
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>

          {onAddRecord && (
            <button
              onClick={onAddRecord}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> New Record
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-200 select-none">
            <tr>
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length}
                  className="rounded text-slate-900 focus:ring-slate-900"
                />
              </th>
              {activeColumns.map(col => (
                <th
                  key={col.id}
                  onClick={() => col.sortable && handleSort(col.id)}
                  className={`py-3 px-4 ${col.sortable ? 'cursor-pointer hover:text-slate-900' : ''}`}
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      sortKey === col.id ? (
                        sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-slate-900" /> : <ChevronDown className="w-3 h-3 text-slate-900" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-300" />
                      )
                    )}
                  </div>
                </th>
              ))}
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={activeColumns.length + 2} className="py-12 text-center text-slate-400">
                  <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-bold text-slate-600">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map(row => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <tr key={row.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-slate-50' : ''}`}>
                    <td className="py-2.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(row.id)}
                        className="rounded text-slate-900 focus:ring-slate-900"
                      />
                    </td>
                    {activeColumns.map(col => {
                      const val = typeof col.accessor === 'function' ? col.accessor(row) : (row as any)[col.accessor || col.id];
                      return (
                        <td key={col.id} className="py-2.5 px-4 text-slate-800">
                          {col.render ? col.render(val, row) : (
                            typeof val === 'boolean' ? (val ? 'Yes' : 'No') :
                            val === null || val === undefined ? '—' :
                            String(val)
                          )}
                        </td>
                      );
                    })}
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onViewRecord && (
                          <button
                            onClick={() => onViewRecord(row)}
                            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                            title="View / Workflow"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onEditRecord && (
                          <button
                            onClick={() => onEditRecord(row)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Edit Record"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onDeleteRecord && (
                          <button
                            onClick={() => onDeleteRecord(row)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Archive Record"
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

      {/* PAGINATION FOOTER */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
        <div className="text-[10px] font-bold text-slate-500">
          Showing {sortedData.length > 0 ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, sortedData.length)} of {sortedData.length} entries
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-black text-slate-700 px-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
