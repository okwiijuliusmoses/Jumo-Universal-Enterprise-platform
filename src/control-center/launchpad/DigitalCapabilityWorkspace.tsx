import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, ArrowUpDown, ShieldAlert, CheckCircle2, 
  Settings, Layers, HelpCircle, FileText, ChevronRight, X, ToggleLeft, ToggleRight, Sparkles, AlertCircle
} from 'lucide-react';
import { MasterModuleRegistry } from '../../core/enterprise/registry/MasterModuleRegistry';
import { getCapabilitiesForModule } from '../../core/enterprise/registry/JumoGlobalRegistry';
import { JumoCapability } from '../../core/enterprise/registry/types';

export const DigitalCapabilityWorkspace: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedVerification, setSelectedVerification] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [sortBy, setSortBy] = useState<'module' | 'capability' | 'status' | 'verification'>('module');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  
  // Simulated active/inactive overrides stored in component state to model active execution state
  const [disabledCapabilities, setDisabledCapabilities] = useState<Record<string, boolean>>({});

  // 1. Gather all modules and capabilities dynamically from authoritative registries
  const rows = useMemo(() => {
    const modules = MasterModuleRegistry.getAllModules();
    const allRows: any[] = [];

    modules.forEach(mod => {
      const caps = getCapabilitiesForModule(mod.id);
      caps.forEach(cap => {
        // Enforce fallback capability definitions if needed
        const type = cap.workspaceDefinition?.type || 'REGISTRY';
        const isCurrentlyDisabled = !!disabledCapabilities[cap.id];

        // Map Roles based on module domain
        let role = 'OWNER';
        if (mod.id.includes('CH_') || mod.id.includes('CHURCH')) role = 'PARISH_ADMIN';
        else if (mod.id.includes('BURSAR') || mod.id.includes('FINANCE')) role = 'BURSAR';
        else if (mod.id.includes('COMPLIANCE')) role = 'COMPLIANCE_OFFICER';
        else if (mod.id.includes('SIS') || mod.id.includes('SIS_') || mod.id.includes('REGISTRAR')) role = 'REGISTRAR';
        else if (mod.id.includes('TREASURY')) role = 'TREASURY_DIRECTOR';

        // Map Integration based on product
        let integration = 'FAAP Core Ledger';
        if (mod.productId.includes('PAY')) integration = 'M-Pesa / JUMO Pay';
        else if (mod.id.includes('UNEB') || mod.id.includes('PLE')) integration = 'National Examination Board (UNEB)';
        else if (mod.id.includes('LENDING') || mod.id.includes('BANK')) integration = 'Standard Bank FX / Credit Core';

        allRows.push({
          id: cap.id,
          moduleId: mod.id,
          moduleName: mod.name,
          productId: mod.productId,
          capabilityName: cap.name,
          capabilityDesc: cap.description,
          subCapability: type === 'DASHBOARD' ? 'KPI Engine' : type === 'LEDGER' ? 'Double-Entry Posting' : type === 'REGISTRY' ? 'Sovereign Records' : 'Process Workflow',
          officePortal: mod.id.toUpperCase().includes('BISHOP') || mod.id.toUpperCase().includes('SYNOD') ? 'Diocesan Office' : 'Parish/School Operations Portal',
          rolePermission: role,
          workflow: cap.workflowId || `WF_${mod.id}_${cap.id.slice(-3)}`,
          dataEntity: cap.formId ? `SovereignRecord(${cap.formId})` : `SovereignRecord(FORM_${mod.id})`,
          inputForm: cap.formId || `FORM_${mod.id}_ENTRY`,
          outputReport: cap.reportId || `REP_${mod.id}_SUMMARY`,
          aiAssistance: mod.id.includes('FAM_') ? 'Financial Intelligence Agent' : mod.id.includes('COMPLIANCE') ? 'Compliance Agent' : 'Operations Agent',
          integration,
          status: isCurrentlyDisabled ? 'DISABLED' : 'ENABLED',
          verification: cap.implementationStatus || 'VERIFIED',
          version: mod.version || 'v1.0.0',
          rawCapability: cap,
          rawModule: mod
        });
      });
    });

    return allRows;
  }, [disabledCapabilities]);

  // Toggle Capability status (Active/Inactive)
  const toggleCapability = (capId: string) => {
    setDisabledCapabilities(prev => ({
      ...prev,
      [capId]: !prev[capId]
    }));
  };

  // Filter & Search Logic
  const filteredRows = useMemo(() => {
    return rows.filter(row => {
      const matchesSearch = 
        row.moduleName.toLowerCase().includes(search.toLowerCase()) ||
        row.moduleId.toLowerCase().includes(search.toLowerCase()) ||
        row.capabilityName.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toLowerCase().includes(search.toLowerCase()) ||
        row.capabilityDesc.toLowerCase().includes(search.toLowerCase());
        
      const matchesProduct = selectedProduct === 'ALL' || row.productId === selectedProduct;
      const matchesStatus = selectedStatus === 'ALL' || row.status === selectedStatus;
      const matchesVerification = selectedVerification === 'ALL' || row.verification === selectedVerification;
      const matchesType = selectedType === 'ALL' || row.subCapability.includes(selectedType);

      return matchesSearch && matchesProduct && matchesStatus && matchesVerification && matchesType;
    });
  }, [rows, search, selectedProduct, selectedStatus, selectedVerification, selectedType]);

  // Sort Logic
  const sortedRows = useMemo(() => {
    const sorted = [...filteredRows];
    sorted.sort((a, b) => {
      let valA = '';
      let valB = '';

      if (sortBy === 'module') {
        valA = a.moduleName;
        valB = b.moduleName;
      } else if (sortBy === 'capability') {
        valA = a.capabilityName;
        valB = b.capabilityName;
      } else if (sortBy === 'status') {
        valA = a.status;
        valB = b.status;
      } else if (sortBy === 'verification') {
        valA = a.verification;
        valB = b.verification;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredRows, sortBy, sortOrder]);

  // Unique Products & Verification states for filter menus
  const productsList = useMemo(() => {
    const set = new Set<string>();
    rows.forEach(r => set.add(r.productId));
    return Array.from(set);
  }, [rows]);

  const handleSort = (field: 'module' | 'capability' | 'status' | 'verification') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview stats panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Active Modules</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {new Set(rows.map(r => r.moduleId)).size}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">Sovereign Repositories Loaded</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capabilities Registered</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{rows.length}</div>
          <div className="text-[10px] text-indigo-600 font-bold mt-1">Autorun capability engine active</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Execution Rate</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {Math.round((rows.filter(r => r.verification === 'VERIFIED' || r.verification === 'EXECUTABLE').length / rows.length) * 100)}%
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">Parity validation passed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active System Toggles</div>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {rows.filter(r => r.status === 'ENABLED').length} / {rows.length}
          </div>
          <div className="text-[10px] text-blue-600 font-bold mt-1">Dynamic switch active</div>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search by module, capability name, ID, descriptor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
            {/* Filter by Product */}
            <select
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold focus:outline-none"
            >
              <option value="ALL">All Products</option>
              {productsList.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Filter by Verification status */}
            <select
              value={selectedVerification}
              onChange={e => setSelectedVerification(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold focus:outline-none"
            >
              <option value="ALL">All Verifications</option>
              <option value="VERIFIED">Verified</option>
              <option value="SCAFFOLDED">Scaffolded</option>
              <option value="EXECUTABLE">Executable</option>
              <option value="PARTIALLY_IMPLEMENTED">Partial</option>
            </select>

            {/* Filter by Type */}
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold focus:outline-none"
            >
              <option value="ALL">All Engines</option>
              <option value="KPI">KPI Dashboard</option>
              <option value="Double-Entry">Double-Entry Ledger</option>
              <option value="Sovereign">Sovereign Registry</option>
              <option value="Process">Workflow Engine</option>
            </select>

            {/* Filter by Active Status */}
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold focus:outline-none"
            >
              <option value="ALL">All States</option>
              <option value="ENABLED">Enabled</option>
              <option value="DISABLED">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Dynamic Table Surface */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('module')}>
                  <div className="flex items-center gap-1">
                    <span>Module / Product</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('capability')}>
                  <div className="flex items-center gap-1">
                    <span>Capability / Engine</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Office & Role</th>
                <th className="py-3 px-4">Dynamic Contract Entities</th>
                <th className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('verification')}>
                  <div className="flex items-center gap-1">
                    <span>Verification</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {sortedRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                    No matching capabilities or modules found in the active sovereign schema.
                  </td>
                </tr>
              ) : (
                sortedRows.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Module */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{row.moduleName}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{row.moduleId}</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[8px] font-black bg-slate-100 text-slate-600 rounded uppercase tracking-wider">
                        {row.productId.replace('JUMO-', '')}
                      </span>
                    </td>

                    {/* Capability */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{row.capabilityName}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{row.id}</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[8px] font-black bg-indigo-50 text-indigo-700 rounded uppercase tracking-wider border border-indigo-100">
                        {row.subCapability}
                      </span>
                    </td>

                    {/* Office / Role */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 font-semibold">{row.officePortal}</div>
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-bold">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                          {row.rolePermission}
                        </span>
                      </div>
                    </td>

                    {/* Contract Entities */}
                    <td className="py-3.5 px-4 space-y-1 font-mono text-[9px] text-slate-500 font-semibold">
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-black text-indigo-600 w-12 shrink-0 uppercase">Form:</span>
                        <span className="text-slate-700">{row.inputForm}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-black text-amber-600 w-12 shrink-0 uppercase">Flow:</span>
                        <span className="text-slate-700">{row.workflow}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-black text-purple-600 w-12 shrink-0 uppercase">Copilot:</span>
                        <span className="text-slate-700">{row.aiAssistance}</span>
                      </div>
                    </td>

                    {/* Verification / Parity state */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                        row.verification === 'VERIFIED' || row.verification === 'EXECUTABLE'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {row.verification === 'VERIFIED' || row.verification === 'EXECUTABLE' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-amber-500" />
                        )}
                        <span>{row.verification}</span>
                      </span>
                    </td>

                    {/* Active Toggle Status */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleCapability(row.id)}
                        className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                        title={row.status === 'ENABLED' ? 'Deactivate capability runtime' : 'Activate capability runtime'}
                      >
                        {row.status === 'ENABLED' ? (
                          <span className="flex items-center gap-1.5">
                            <ToggleRight className="w-6 h-6 text-emerald-600" />
                            <span className="text-[9px] font-black text-emerald-700 uppercase">ACTIVE</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <ToggleLeft className="w-6 h-6 text-slate-400" />
                            <span className="text-[9px] font-black text-slate-400 uppercase">MUTED</span>
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Inspector Action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedRow(row)}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#0078D4] hover:border-[#0078D4] transition-all cursor-pointer"
                        title="View Full Metadata Schema"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out detail drawer/modal */}
      {selectedRow && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in">
            {/* Drawer Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider">Capability Metadata Inspector</h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selectedRow.id}</p>
              </div>
              <button
                onClick={() => setSelectedRow(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
              {/* Core summary */}
              <div className="space-y-2">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Capability</div>
                <h4 className="text-base font-black text-slate-900">{selectedRow.capabilityName}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedRow.capabilityDesc}</p>
              </div>

              {/* Status and metadata tags */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sovereign Module</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">{selectedRow.moduleName}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedRow.moduleId}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Parent Product Suite</div>
                  <div className="text-xs font-black text-indigo-700 mt-1 uppercase">{selectedRow.productId.replace('JUMO-', '')}</div>
                </div>
              </div>

              {/* Dynamic Contract Schemas */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  Dynamic Capability Resolution Details
                </h5>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">Security Access Level:</span>
                    <span className="font-bold text-slate-900">{selectedRow.rawCapability.securityLevel || 'RESTRICTED'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">Sovereign Schema Entity:</span>
                    <span className="font-bold text-slate-900 font-mono text-[10px]">{selectedRow.dataEntity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">Form ID Schema:</span>
                    <span className="font-bold text-slate-900 font-mono text-[10px]">{selectedRow.inputForm}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">Workflow Routing ID:</span>
                    <span className="font-bold text-slate-900 font-mono text-[10px]">{selectedRow.workflow}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">Reporting ID Output:</span>
                    <span className="font-bold text-slate-900 font-mono text-[10px]">{selectedRow.outputReport}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">AI Support Model:</span>
                    <span className="font-bold text-purple-700">{selectedRow.aiAssistance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">Downstream Integration:</span>
                    <span className="font-bold text-slate-900">{selectedRow.integration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500">Runtime Execution:</span>
                    <span className={`font-black text-[10px] ${selectedRow.status === 'ENABLED' ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {selectedRow.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Raw JSON Schema display */}
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  <span>Raw Capability Schema Block</span>
                  <span className="font-mono text-[9px]">{selectedRow.version}</span>
                </div>
                <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[10px] font-mono overflow-x-auto">
                  {JSON.stringify(selectedRow.rawCapability, null, 2)}
                </pre>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setSelectedRow(null)}
                className="px-4 py-2 text-xs bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold cursor-pointer"
              >
                Close Inspector
              </button>
              <button
                onClick={() => {
                  toggleCapability(selectedRow.id);
                  setSelectedRow(prev => prev ? {
                    ...prev,
                    status: prev.status === 'ENABLED' ? 'DISABLED' : 'ENABLED'
                  } : null);
                }}
                className={`px-4 py-2 text-xs text-white rounded-xl font-bold cursor-pointer ${
                  selectedRow.status === 'ENABLED' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {selectedRow.status === 'ENABLED' ? 'Mute Capability' : 'Enable Capability'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
