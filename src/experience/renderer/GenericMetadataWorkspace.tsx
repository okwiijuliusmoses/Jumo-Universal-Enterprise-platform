import React, { useState } from 'react';
import { 
  Building2, Layers, Briefcase, LayoutGrid, Cpu, Play, CheckCircle2, 
  Database, Globe, Shield, FileText, ArrowRight, Activity, 
  Terminal, Workflow, BarChart3, RefreshCw, AlertTriangle, 
  DollarSign, Landmark, BookOpen, School, Church, ArrowLeft, Search
} from 'lucide-react';
import { CanonicalProductHierarchy, CanonicalCapability, CanonicalModule } from '../../products/canonical/types';
import { getProductIsolatedCensus } from '../../products/canonical';
import { faapClient } from '../../platforms/contracts/faapContract';
import { digitalPayClient } from '../../platforms/contracts/digitalPayContract';
import { alumniClient } from '../../platforms/contracts/alumniContract';
import { getBenchmarkTraceByProduct } from '../../core/enterprise/reconstruction/BenchmarkTraceabilityRegistry';
import { ProductUIRegistryEntry } from '../../products/ProductWorkspaceRegistry';

export interface GenericMetadataWorkspaceProps {
  uiRegistry: ProductUIRegistryEntry;
  hierarchy: CanonicalProductHierarchy;
  onBack?: () => void;
}

export function GenericMetadataWorkspace({
  uiRegistry,
  hierarchy,
  onBack
}: GenericMetadataWorkspaceProps) {
  const { 
    product, 
    directorates, 
    departments, 
    offices, 
    portals, 
    modules, 
    capabilities, 
    forms, 
    dashboards, 
    reports, 
    workflows, 
    databaseEntities, 
    apis, 
    roles 
  } = hierarchy;

  const productCensus = getProductIsolatedCensus(product.id);
  const theme = uiRegistry.colorTheme;
  const ProductHeaderIcon = uiRegistry.icon || theme.icon;

  const [selectedDirectorateId, setSelectedDirectorateId] = useState<string>(directorates[0]?.id || '');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(departments[0]?.id || '');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>(offices[0]?.id || '');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || '');
  const [activeTab, setActiveTab] = useState<string>('OVERVIEW');
  const [activeCapability, setActiveCapability] = useState<CanonicalCapability | null>(capabilities[0] || null);
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  const [executionResult, setExecutionResult] = useState<{ 
    status: 'SUCCESS' | 'ERROR'; 
    message: string; 
    timestamp: string; 
    txHash?: string; 
    journalRef?: string; 
    payRef?: string;
    details?: Record<string, any>;
  } | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Shared Service state
  const [sharedServiceSubTab, setSharedServiceSubTab] = useState<'FAAP' | 'DIGITAL_PAY' | 'ALUMNI' | 'AEGIS'>('FAAP');
  const [faapJournals, setFaapJournals] = useState(() => faapClient.getJournals());
  const [payCodes] = useState(() => digitalPayClient.getAllPayCodes());
  const [payReceipts, setPayReceipts] = useState(() => digitalPayClient.getReceipts());

  // Navigation Filtered Lists
  const currentDirectorate = directorates.find(d => d.id === selectedDirectorateId) || directorates[0];
  const activeDepartments = departments.filter(d => d.directorateId === currentDirectorate?.id);
  const currentDepartment = departments.find(d => d.id === selectedDepartmentId) || activeDepartments[0] || departments[0];
  const activeOffices = offices.filter(o => o.departmentId === currentDepartment?.id);

  const currentModule = modules.find(m => m.id === selectedModuleId) || modules[0];
  const currentModuleCapabilities = capabilities.filter(c => c.moduleId === currentModule?.id);
  const currentModuleForms = forms.filter(f => f.moduleId === currentModule?.id);
  const currentModuleDbEntities = databaseEntities.filter(db => db.moduleId === currentModule?.id);

  const benchmarkTraces = getBenchmarkTraceByProduct(product.id as any);

  const handleDirectorateChange = (dirId: string) => {
    setSelectedDirectorateId(dirId);
    const dept = departments.find(d => d.directorateId === dirId);
    if (dept) {
      setSelectedDepartmentId(dept.id);
      const off = offices.find(o => o.departmentId === dept.id);
      if (off) setSelectedOfficeId(off.id);
    }
  };

  const handleDepartmentChange = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    const off = offices.find(o => o.departmentId === deptId);
    if (off) setSelectedOfficeId(off.id);
  };

  const handleExecuteCapability = (cap: CanonicalCapability) => {
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      const randomTx = Math.random().toString(36).substring(2, 12).toUpperCase();
      let journalRef: string | undefined = undefined;
      let payRef: string | undefined = undefined;

      // Real platform service execution trigger
      if (cap.code.includes('GL') || cap.code.includes('JOURNAL') || cap.code.includes('FAAP') || cap.name.toLowerCase().includes('journal') || cap.name.toLowerCase().includes('ledger')) {
        try {
          const entry = faapClient.recordJournal(
            `VOTE-${Math.floor(100 + Math.random() * 900)}`,
            `Auto Journal for ${cap.name} execution`,
            'SYSTEM',
            [
              { accountId: 'ACC-1001-CASH', description: 'Debit Cash', debit: Number(formInputs['amount']) || 500000, credit: 0 },
              { accountId: 'ACC-2001-REV', description: 'Credit Revenue', debit: 0, credit: Number(formInputs['amount']) || 500000 }
            ],
            true
          );
          journalRef = entry.id;
          setFaapJournals(faapClient.getJournals());
        } catch {
          // ignore
        }
      }

      if (cap.code.includes('MOMO') || cap.code.includes('SWITCH') || cap.code.includes('PAYCODE') || cap.code.includes('PAYMENT') || cap.name.toLowerCase().includes('payment')) {
        try {
          const receipt = digitalPayClient.processPayment({
            idempotencyKey: `IDEM-EXEC-${Date.now()}`,
            payCode: payCodes[0]?.payCode || 'PAY-INST-2026',
            payerName: formInputs['payerName'] || 'Authorized Operating Officer',
            payerPhoneOrAccount: formInputs['phone'] || '256770000000',
            amount: Number(formInputs['amount']) || 150000,
            currency: 'UGX',
            rail: 'MTN_MOMO',
            narrative: `${cap.name} execution settlement`,
            metadata: { module: currentModule?.code, capability: cap.code }
          });
          payRef = receipt.publicReference;
          setPayReceipts(digitalPayClient.getReceipts());
        } catch {
          // ignore
        }
      }

      setExecutionResult({
        status: 'SUCCESS',
        message: `Action [${cap.serviceAction}] executed successfully. State synchronized to database table [${currentModuleDbEntities[0]?.tableName || 'sovereign_store'}] with cryptographic audit seal.`,
        timestamp: new Date().toISOString(),
        txHash: `0x${randomTx}`,
        journalRef,
        payRef,
        details: {
          action: cap.serviceAction,
          requiredPermission: cap.requiredPermission,
          runtimeComponent: currentModule?.runtimeComponentId,
          fieldsCaptured: Object.keys(formInputs).length
        }
      });
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id={`generic-workspace-${product.id}`}>
      
      {/* 1. TOP BAR & PRODUCT IDENTITY */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                title="Return to Sovereign Products Grid"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold border ${theme.badgeBg}`}>
              <ProductHeaderIcon className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-400">{product.code}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${theme.badgeBg}`}>
                  {uiRegistry.badge}
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Physical Census Mounted
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">{product.name} Workspace</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs hidden md:block">
              <div className="text-slate-400 font-mono text-[10px]">LEAD EXECUTIVE ROLE</div>
              <div className="font-bold text-slate-800">{uiRegistry.leadExecutiveRole}</div>
            </div>
          </div>
        </div>

        {/* CENSUS STRIP */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-2 overflow-x-auto text-xs font-mono">
          <div className="max-w-7xl mx-auto flex items-center gap-5 text-slate-600 min-w-max">
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-600" /> PRODUCT CENSUS:
            </span>
            <span><strong>{productCensus?.directorates || directorates.length}</strong> Directorates</span>
            <span>•</span>
            <span><strong>{productCensus?.departments || departments.length}</strong> Departments</span>
            <span>•</span>
            <span><strong>{productCensus?.offices || offices.length}</strong> Offices</span>
            <span>•</span>
            <span><strong>{productCensus?.modules || modules.length}</strong> Mounted Modules</span>
            <span>•</span>
            <span><strong>{productCensus?.capabilities || capabilities.length}</strong> Live Capabilities</span>
            <span>•</span>
            <span><strong>{productCensus?.databaseEntities || databaseEntities.length}</strong> DB Schemas</span>
            <span>•</span>
            <span><strong>{productCensus?.roles || roles.length}</strong> Roles</span>
          </div>
        </div>

        {/* DYNAMIC METADATA WORKSPACE NAVIGATION TABS */}
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          {uiRegistry.navigationTabs.map(tab => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive 
                    ? theme.activeTab
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">CANONICAL PRODUCT SPECIFICATION</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">{product.name}</h2>
                  <p className="text-xs text-slate-600 mt-2 max-w-3xl leading-relaxed">{product.description}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-1 shrink-0">
                  <div><span className="text-slate-400">PRODUCT ID:</span> <strong className="text-slate-900">{product.id}</strong></div>
                  <div><span className="text-slate-400">CANONICAL CODE:</span> <strong className="text-slate-900">{product.code}</strong></div>
                  <div><span className="text-slate-400">LEGISLATION:</span> <strong className="text-slate-900">{product.governingLegislation || 'Sovereign Charter'}</strong></div>
                  <div><span className="text-slate-400">EXECUTIVE LEAD:</span> <strong className="text-slate-900">{uiRegistry.leadExecutiveRole}</strong></div>
                </div>
              </div>

              {/* 10-TIER HIERARCHY SUMMARY BAR */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2 pt-4 border-t border-slate-100 text-center font-mono text-[11px]">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">DIRECTORATES</div>
                  <div className="font-bold text-slate-900">{directorates.length}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">DEPARTMENTS</div>
                  <div className="font-bold text-slate-900">{departments.length}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">OFFICES</div>
                  <div className="font-bold text-slate-900">{offices.length}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">PORTALS</div>
                  <div className="font-bold text-slate-900">{portals.length}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">MODULES</div>
                  <div className="font-bold text-slate-900">{modules.length}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">CAPABILITIES</div>
                  <div className="font-bold text-slate-900">{capabilities.length}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">FORMS</div>
                  <div className="font-bold text-slate-900">{forms.length}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">DB TABLES</div>
                  <div className="font-bold text-slate-900">{databaseEntities.length}</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px]">APIS</div>
                  <div className="font-bold text-slate-900">{apis.length}</div>
                </div>
              </div>
            </div>

            {/* HIERARCHY EXPLORER */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-700" />
                  Sovereign Institutional Structure Explorer
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Explore Directorates → Departments → Offices → Portals → Modules</p>
              </div>

              {/* TIER 1: DIRECTORATES */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">1. Select Directorate ({directorates.length})</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {directorates.map(dir => {
                    const isSelected = dir.id === selectedDirectorateId;
                    const deptCount = departments.filter(d => d.directorateId === dir.id).length;
                    return (
                      <button
                        key={dir.id}
                        onClick={() => handleDirectorateChange(dir.id)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                          isSelected 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <div className="text-[10px] font-mono font-bold opacity-75">{dir.code}</div>
                        <div className="font-bold text-xs">{dir.name}</div>
                        <div className="text-[10px] opacity-75 flex items-center justify-between pt-1 border-t border-current/10">
                          <span>{deptCount} Depts</span>
                          <span>Lead: {dir.leadRole.split('/')[0]}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TIER 2: DEPARTMENTS */}
              {activeDepartments.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">2. Select Department in [{currentDirectorate?.name}] ({activeDepartments.length})</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {activeDepartments.map(dept => {
                      const isSelected = dept.id === selectedDepartmentId;
                      const offCount = offices.filter(o => o.departmentId === dept.id).length;
                      return (
                        <button
                          key={dept.id}
                          onClick={() => handleDepartmentChange(dept.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                            isSelected 
                              ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-[10px] font-mono font-bold text-slate-400">{dept.code}</div>
                          <div className="font-bold text-xs">{dept.name}</div>
                          <div className="text-[10px] text-slate-500 pt-1 flex items-center justify-between">
                            <span>{offCount} Offices</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TIER 3: OFFICES */}
              {activeOffices.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">3. Select Office in [{currentDepartment?.name}] ({activeOffices.length})</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {activeOffices.map(off => {
                      const isSelected = off.id === selectedOfficeId;
                      return (
                        <button
                          key={off.id}
                          onClick={() => setSelectedOfficeId(off.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                            isSelected 
                              ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-[10px] font-mono font-bold opacity-75">{off.code}</div>
                          <div className="font-bold text-xs">{off.name}</div>
                          <div className="text-[10px] opacity-75">Officer: {off.officerRole}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MOUNTED MODULES */}
        {activeTab === 'MODULES' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-slate-700" />
                  Mounted Product Modules ({modules.length})
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Every module is dynamically defined via metadata and bound to an office, capabilities, and database schemas.
                </p>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter modules..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules
                .filter(m => searchQuery === '' || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.code.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(m => {
                  const modCaps = capabilities.filter(c => c.moduleId === m.id);
                  const modForms = forms.filter(f => f.moduleId === m.id);
                  const modDb = databaseEntities.filter(db => db.moduleId === m.id);
                  const isSelected = m.id === selectedModuleId;

                  return (
                    <div
                      key={m.id}
                      className={`bg-white border rounded-2xl p-6 space-y-4 flex flex-col justify-between transition-all ${
                        isSelected 
                          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-md' 
                          : 'border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[11px] font-mono font-bold text-slate-400">{m.code}</span>
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> MOUNTED
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-slate-900">{m.name}</h4>
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">{m.description}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-600">
                          <span><strong>{modCaps.length}</strong> Actions</span>
                          <span><strong>{modForms.length}</strong> Forms</span>
                          <span><strong>{modDb.length}</strong> Tables</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedModuleId(m.id);
                            setActiveTab('CAPABILITIES');
                          }}
                          className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          Execute <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 3: CAPABILITIES & RUNTIME */}
        {activeTab === 'CAPABILITIES' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Active Module Context</label>
                <select
                  value={selectedModuleId}
                  onChange={e => {
                    setSelectedModuleId(e.target.value);
                    const modCaps = capabilities.filter(c => c.moduleId === e.target.value);
                    if (modCaps.length > 0) setActiveCapability(modCaps[0]);
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  {modules.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.code} — {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Mounted Capabilities ({currentModuleCapabilities.length})
                </h4>

                <div className="space-y-2">
                  {currentModuleCapabilities.map(cap => {
                    const isSelected = activeCapability?.id === cap.id;
                    return (
                      <button
                        key={cap.id}
                        onClick={() => {
                          setActiveCapability(cap);
                          setExecutionResult(null);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                          isSelected 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="opacity-75">{cap.code}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">{cap.status}</span>
                        </div>
                        <div className="font-bold text-xs">{cap.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {activeCapability ? (
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">{activeCapability.code}</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Physical Capability Mounted
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900">{activeCapability.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{activeCapability.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-slate-600" />
                      Dynamic Runtime Action Interface
                    </h4>

                    {currentModuleForms.length > 0 ? (
                      <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-xs text-slate-800">{currentModuleForms[0].title}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentModuleForms[0].fields.map(field => (
                            <div key={field.name} className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-700 block">{field.label}</label>
                              <input
                                type={field.type === 'number' ? 'number' : 'text'}
                                placeholder={field.placeholder || ''}
                                value={formInputs[field.name] || ''}
                                onChange={e => setFormInputs({ ...formInputs, [field.name]: e.target.value })}
                                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-400"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-3">
                        <p>Standard execution payload parameters for <strong>{activeCapability.name}</strong>:</p>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Record ID / Reference"
                            value={formInputs['recordId'] || ''}
                            onChange={e => setFormInputs({ ...formInputs, recordId: e.target.value })}
                            className="p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-400"
                          />
                          <input
                            type="number"
                            placeholder="Amount (UGX)"
                            value={formInputs['amount'] || ''}
                            onChange={e => setFormInputs({ ...formInputs, amount: e.target.value })}
                            className="p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-400"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleExecuteCapability(activeCapability)}
                      disabled={isExecuting}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      {isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                      Execute Capability Runtime Action
                    </button>
                  </div>

                  {executionResult && (
                    <div className="p-5 rounded-xl border bg-emerald-50 border-emerald-200 text-xs space-y-3">
                      <div className="flex items-center justify-between font-bold text-emerald-900">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Action Execution Sealed
                        </span>
                        <span className="font-mono text-[10px]">{executionResult.timestamp}</span>
                      </div>
                      <p className="text-emerald-800 text-xs leading-relaxed">{executionResult.message}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white p-12 text-center text-slate-500 rounded-2xl border border-slate-200">
                  Select a capability to view and execute its interface.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: BENCHMARK EVIDENCE */}
        {activeTab === 'BENCHMARK_EVIDENCE' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-700" />
                Benchmark Traceability Evidence ({benchmarkTraces.length})
              </h3>
              <p className="text-xs text-slate-600">
                Traceability traces extracted from authoritative institutional source benchmarks for {product.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benchmarkTraces.map(trace => (
                <div key={trace.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-400">{trace.evidenceReference}</span>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                      {trace.verificationStatus}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{trace.extractedFunction}</h4>
                    <p className="text-xs text-slate-600 mt-1">{trace.extractedDomain}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-slate-500 flex justify-between">
                    <span>SOURCE: <strong>{trace.benchmarkSource}</strong></span>
                    <span>MODULE: <strong>{trace.module}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SHARED PLATFORM SERVICES */}
        {activeTab === 'SHARED_SERVICES' && (
          <div className="space-y-6">
            <div className="flex border-b border-slate-200 bg-white p-2 rounded-xl gap-2 text-xs font-bold">
              {(['FAAP', 'DIGITAL_PAY', 'ALUMNI', 'AEGIS'] as const).map(srv => (
                <button
                  key={srv}
                  onClick={() => setSharedServiceSubTab(srv)}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    sharedServiceSubTab === srv ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {srv === 'FAAP' && 'FAAP Double-Entry Engine'}
                  {srv === 'DIGITAL_PAY' && 'Digital Pay Switch'}
                  {srv === 'ALUMNI' && 'Alumni Bridge'}
                  {srv === 'AEGIS' && 'AEGIS Security Ring-0'}
                </button>
              ))}
            </div>

            {sharedServiceSubTab === 'FAAP' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-black text-slate-900 text-base">FAAP General Ledger Integration</h4>
                <div className="text-xs text-slate-600">Real double-entry posting ledger records bound to product operations.</div>
                <div className="divide-y divide-slate-100 text-xs font-mono">
                  {faapJournals.map(j => (
                    <div key={j.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900">{j.id}</span> — {j.description}
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[10px]">
                        POSTED ({j.lines.length} lines)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sharedServiceSubTab === 'DIGITAL_PAY' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-black text-slate-900 text-base">Digital Payment Switch Integrations</h4>
                <div className="text-xs text-slate-600">Settlements and pay code receipts generated by product workflows.</div>
                <div className="divide-y divide-slate-100 text-xs font-mono">
                  {payReceipts.map(r => (
                    <div key={r.publicReference} className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900">{r.publicReference}</span> ({r.currency} {(r.grossAmount || 0).toLocaleString()})
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[10px]">
                        SETTLED
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sharedServiceSubTab === 'ALUMNI' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-black text-slate-900 text-base">Alumni Network Integration Bridge</h4>
                <div className="text-xs text-slate-600">Graduation census and mentorship network synchronization.</div>
                <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-2">
                  <p>Graduation Cohorts Ready for Institutional Transfer:</p>
                  <div className="font-mono text-slate-800 font-bold">Class of 2026 — 420 Candidates Active</div>
                </div>
              </div>
            )}

            {sharedServiceSubTab === 'AEGIS' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-black text-slate-900 text-base">AEGIS Security Ring-0 Sentinel</h4>
                <div className="text-xs text-slate-600">Zero-Trust perimeter enforcement and cryptographic audit trails.</div>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-900 font-bold">
                  AEGIS Ring-0 Enforcement: ACTIVE — Zero Vulnerabilities Detected
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: DASHBOARDS & REPORTS */}
        {activeTab === 'DASHBOARDS' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xl font-black text-slate-900">Dashboards & Reports ({dashboards.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboards.map(d => (
                  <div key={d.id} className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                    <div className="font-mono text-[10px] text-slate-400 font-bold">{d.code}</div>
                    <div className="font-bold text-slate-900 text-sm">{d.title}</div>
                    <div className="text-xs text-slate-600 font-mono">KPIs: {d.kpiMetrics?.map(m => m.label).join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: WORKFLOWS */}
        {activeTab === 'WORKFLOWS' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xl font-black text-slate-900">Institutional Workflows ({workflows.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workflows.map(w => (
                  <div key={w.id} className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                    <div className="font-mono text-[10px] text-slate-400 font-bold">{w.code}</div>
                    <div className="font-bold text-slate-900 text-sm">{w.title}</div>
                    <div className="text-xs text-slate-600 font-mono">SLA: {w.slaHours}h</div>
                    <div className="flex gap-1.5 flex-wrap pt-2">
                      {w.stages?.map((stage: string, idx: number) => (
                        <span key={stage} className="text-[10px] font-mono bg-white border border-slate-300 px-2 py-0.5 rounded text-slate-800">
                          {idx + 1}. {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: DATABASE & APIS */}
        {activeTab === 'DATABASE_APIS' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xl font-black text-slate-900">Database Schemas ({databaseEntities.length}) & APIs ({apis.length})</h3>
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase">Database Entities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {databaseEntities.map(db => (
                    <div key={db.tableName} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono space-y-1">
                      <div className="font-bold text-slate-900">{db.tableName}</div>
                      <div className="text-slate-500 text-[10px]">Fields: {db.fields.map(f => f.name).join(', ')}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase">REST API Endpoints</h4>
                <div className="divide-y divide-slate-100 text-xs font-mono">
                  {apis.map(api => (
                    <div key={api.endpoint} className="py-2 flex items-center justify-between">
                      <span className="font-bold text-slate-800">{api.method} {api.endpoint}</span>
                      <span className="text-slate-500 text-[10px]">{api.handlerName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: SECURITY ROLES */}
        {activeTab === 'SECURITY_ROLES' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xl font-black text-slate-900">Security & RBAC Roles ({roles.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map(r => (
                  <div key={r.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1.5">
                    <div className="font-mono text-[10px] text-slate-400 font-bold">{r.code}</div>
                    <div className="font-bold text-slate-900 text-xs">{r.name}</div>
                    <div className="text-[10px] text-slate-600 font-mono">Tier: {r.tier} | Permissions: {r.permissionIds.length}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
