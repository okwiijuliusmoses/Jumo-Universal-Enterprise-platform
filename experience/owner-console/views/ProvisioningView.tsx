import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, AlertCircle, Search, Filter, Download, 
  Settings, RefreshCw, ChevronDown, ChevronUp, Check, X, 
  ArrowUpDown, Layers, Building2, User, Play, FileSpreadsheet
} from 'lucide-react';
import { AppRegistryService } from '../../../core/application-runtime/registry';
import { AppManifest } from '../../../core/application-runtime/types';

export const ProvisioningView: React.FC = () => {
  const [apps, setApps] = useState<AppManifest[]>(() => AppRegistryService.getAllApps());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'pending' | 'subscribed'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [sortField, setSortField] = useState<'name' | 'category' | 'status'>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const itemsPerPage = 8;

  const refreshData = () => {
    setApps([...AppRegistryService.getAllApps()]);
    setSelectedIds([]);
  };

  const handleApprove = (id: string) => {
    AppRegistryService.approveSubscription(id);
    setActionFeedback(`Application runtime ${id} successfully provisioned.`);
    setTimeout(() => setActionFeedback(null), 3000);
    refreshData();
  };

  const handleRevoke = (id: string) => {
    AppRegistryService.revokeSubscription(id);
    setActionFeedback(`Application runtime ${id} provisioning revoked.`);
    setTimeout(() => setActionFeedback(null), 3000);
    refreshData();
  };

  const handleBatchApprove = () => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach(id => AppRegistryService.approveSubscription(id));
    setActionFeedback(`Successfully provisioned ${selectedIds.length} application runtimes in batch.`);
    setTimeout(() => setActionFeedback(null), 3000);
    refreshData();
  };

  const handleBatchRevoke = () => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach(id => AppRegistryService.revokeSubscription(id));
    setActionFeedback(`Revoked ${selectedIds.length} application runtimes in batch.`);
    setTimeout(() => setActionFeedback(null), 3000);
    refreshData();
  };

  const toggleSelectAll = (filtered: AppManifest[]) => {
    if (selectedIds.length === filtered.length && filtered.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(a => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const categories = Array.from(new Set(apps.map(a => a.category)));

  const filteredApps = apps.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesCat = categoryFilter === 'ALL' || a.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  }).sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase() || '';
    const valB = b[sortField]?.toString().toLowerCase() || '';
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pendingCount = apps.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Tenant Subscription & Provisioning Queue</h1>
          <p className="text-xs text-slate-500">Enterprise data grid for managing zero-trust domain runtimes, tenant subscriptions, and hardware schema isolation queues.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-bold text-xs flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{pendingCount} Pending Authorizations</span>
          </div>
          <button
            onClick={refreshData}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
            title="Refresh Grid"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Grid</span>
          </button>
        </div>
      </div>

      {/* Action Feedback Toast */}
      {actionFeedback && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md text-xs font-bold flex items-center justify-between px-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionFeedback}</span>
          </div>
          <button onClick={() => setActionFeedback(null)} className="text-white hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Enterprise Data Grid Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search runtime ID, application name, or description..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Filters & Export */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Status: All Runtimes</option>
              <option value="pending">Status: Pending Review ({pendingCount})</option>
              <option value="subscribed">Status: Provisioned Online</option>
            </select>

            <select
              value={categoryFilter}
              onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Category: All Modules</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              onClick={() => alert('Exporting tenant subscription grid to CSV / Excel per Phase 22 mandate...')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              title="Export to CSV / Excel"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export CSV/Excel</span>
            </button>
          </div>
        </div>

        {/* Batch Actions Bar if items selected */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <span className="px-2 py-0.5 bg-blue-600 text-white rounded-md font-mono">{selectedIds.length}</span>
              <span>runtimes selected for batch governance action</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBatchApprove}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve & Provision Selected</span>
              </button>
              <button
                onClick={handleBatchRevoke}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Revoke Selected</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enterprise Data Grid Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase text-[11px]">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredApps.length && filteredApps.length > 0}
                    onChange={() => toggleSelectAll(filteredApps)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                </th>
                <th className="p-3 cursor-pointer hover:bg-slate-100" onClick={() => { setSortField('name'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Application Runtime / Module</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th className="p-3 cursor-pointer hover:bg-slate-100" onClick={() => { setSortField('category'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Category & Tier</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th className="p-3">Pricing & Licensing</th>
                <th className="p-3 cursor-pointer hover:bg-slate-100" onClick={() => { setSortField('status'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Governance Status</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th className="p-3 text-right">Sovereign Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-600">
                    No enterprise application runtimes match your current filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedApps.map(app => {
                  const isSelected = selectedIds.includes(app.id);
                  const isPending = app.status === 'pending';

                  return (
                    <tr 
                      key={app.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-blue-50/50' : ''}`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(app.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{app.name}</span>
                          <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">ID: {app.id}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 max-w-md line-clamp-1 mt-0.5">{app.description}</p>
                      </td>
                      <td className="p-3 font-semibold text-slate-700">
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px]">
                          {app.category}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-600">
                        {app.pricing}
                      </td>
                      <td className="p-3">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-100 text-blue-800 font-bold text-[11px] rounded-full uppercase">
                            <Clock className="w-3 h-3 text-blue-600 animate-pulse" />
                            <span>Pending Review</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-full uppercase">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Provisioned Online</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isPending ? (
                            <>
                              <button
                                onClick={() => handleApprove(app.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors"
                              >
                                Authorize
                              </button>
                              <button
                                onClick={() => handleRevoke(app.id)}
                                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-lg transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleRevoke(app.id)}
                              className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs rounded-lg transition-colors"
                            >
                              Revoke Runtime
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

        {/* Pagination Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div>
            Showing <span className="text-slate-900 font-bold">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredApps.length)}</span> to{' '}
            <span className="text-slate-900 font-bold">{Math.min(currentPage * itemsPerPage, filteredApps.length)}</span> of{' '}
            <span className="text-slate-900 font-bold">{filteredApps.length}</span> total runtimes
          </div>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 bg-white border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-slate-100 font-bold"
            >
              Previous
            </button>
            <span className="px-3 py-1 font-mono">Page {currentPage} of {totalPages || 1}</span>
            <button
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 bg-white border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-slate-100 font-bold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
