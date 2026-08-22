import React, { useState, useEffect } from 'react';
import { 
  Building2, Activity, Users, ShieldCheck, DollarSign, Layers, Cpu, 
  Globe, Sliders, CheckCircle2, ArrowUpRight, Code, Sparkles, Plus, 
  Search, Trash2, Settings, HelpCircle, X, Clock, ArrowRight, ChevronRight, 
  ChevronDown, Database, BookOpen, HeartPulse, Landmark, ShieldAlert, Wrench, 
  Briefcase, RotateCw, Play, Lock, UserCheck, Server, HardHat, Sprout, Truck, Shield
} from 'lucide-react';
import { 
  DynamicConfigurationRegistry, 
  ERPDomainConfig, 
  ModuleLifecycleConfig, 
  UIComponentConfig, 
  LayerConfig, 
  BillingSubscription, 
  AvailableUpdate,
  NavigationMenuItem,
  InstitutionBrandingConfig
} from '../core/governance/UniversalGovernanceEngine';
import { OWNER_VERIFICATION_MODE } from '../core/security/OwnerVerificationModeRegistry';

interface OwnerControlCenterWorkspaceProps {
  institutionName?: string;
  selectedFamily?: string;
  onNavigateBack?: () => void;
}

export const OwnerControlCenterWorkspace: React.FC<OwnerControlCenterWorkspaceProps> = ({
  institutionName = 'East African Sovereign University',
  selectedFamily = 'education',
  onNavigateBack
}) => {
  // State from Local Dynamic Registries
  const [erps, setErps] = useState<ERPDomainConfig[]>([]);
  const [modules, setModules] = useState<ModuleLifecycleConfig[]>([]);
  const [components, setComponents] = useState<UIComponentConfig[]>([]);
  const [layers, setLayers] = useState<LayerConfig[]>([]);
  const [billing, setBilling] = useState<BillingSubscription[]>([]);
  const [updates, setUpdates] = useState<AvailableUpdate[]>([]);
  const [navItems, setNavItems] = useState<NavigationMenuItem[]>([]);
  const [branding, setBranding] = useState<InstitutionBrandingConfig>({
    institutionName: '',
    brandColor: '#0078D4',
    secondaryColor: '#0F172A',
    subdomain: '',
    newsAnnouncement: '',
    contactEmail: '',
    supportPhone: ''
  });

  // Selected Section Navigation
  const [activeMenu, setActiveMenu] = useState<
    'platforms' | 'modules' | 'components' | 'layers' | 'navigation' | 'billing' | 'updates' | 'rights' | 'registry'
  >('platforms');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Scaffolding forms state
  const [newModId, setNewModId] = useState('');
  const [newModName, setNewModName] = useState('');
  const [newModFamily, setNewModFamily] = useState('JUMO-EDU-ALUMNI');
  const [newModPrice, setNewModPrice] = useState(120);

  const [newCompId, setNewCompId] = useState('');
  const [newCompName, setNewCompName] = useState('');
  const [newCompPlan, setNewCompPlan] = useState<'Core Foundation' | 'Enterprise Hybrid' | 'Sovereign Pro' | 'Beta Sandbox'>('Core Foundation');

  // Navigation Builder state
  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavPath, setNewNavPath] = useState('');
  const [newNavFolder, setNewNavFolder] = useState('Core Workspaces');

  // UI Notifications/Audits simulation state
  const [logs, setLogs] = useState<string[]>([
    'SYSTEM INITIALIZED: Ring-0 sovereign console running in administrative context.',
    'SECURITY POLICY ENFORCED: AEGIS zero-trust credentials loaded and hashed.',
    'REGISTRY SYNC: Synchronized 10 active platforms and 191 modules.'
  ]);

  // Load all registries from the dynamic governance engine on mount
  useEffect(() => {
    setErps(DynamicConfigurationRegistry.getERPs());
    setModules(DynamicConfigurationRegistry.getModules());
    setComponents(DynamicConfigurationRegistry.getComponents());
    setLayers(DynamicConfigurationRegistry.getLayers());
    setBilling(DynamicConfigurationRegistry.getBilling());
    setUpdates(DynamicConfigurationRegistry.getUpdates());
    setNavItems(DynamicConfigurationRegistry.getNavigationItems());
    setBranding(DynamicConfigurationRegistry.getBranding());
  }, []);

  // Sync state back to DynamicConfigurationRegistry whenever local states change
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...(prev && Array.isArray(prev) ? prev : []).slice(0, 24)]);
  };

  // Sovereign Owner Verification Mode Indicator
  const renderVerificationMode = () => (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
      <h2 className="text-amber-900 font-bold">PLATFORM OWNER VERIFICATION MODE</h2>
      <p className="text-amber-700 text-sm">Direct access is active. All product boundaries are preserved.</p>
    </div>
  );

  // 1. ERP Domain actions
  const handleUpdateErpStatus = (id: string, status: ERPDomainConfig['status']) => {
    const updated = erps.map(erp => erp.id === id ? { ...erp, status } : erp);
    setErps(updated);
    DynamicConfigurationRegistry.saveERPs(updated);
    addLog(`ERP DOMAIN CONTROL: Updated status of ${id.toUpperCase()} ERP to ${status}.`);
  };

  const handleUpgradeErpVersion = (id: string, newVersion: string) => {
    const updated = erps.map(erp => erp.id === id ? { ...erp, version: newVersion } : erp);
    setErps(updated);
    DynamicConfigurationRegistry.saveERPs(updated);
    addLog(`ERP DOMAIN CONTROL: Upgraded ${id.toUpperCase()} ERP to version ${newVersion}.`);
  };

  // 2. Module Lifecycle actions
  const handleUpdateModStatus = (id: string, status: ModuleLifecycleConfig['status']) => {
    const updated = modules.map(m => m.id === id ? { ...m, status } : m);
    setModules(updated);
    DynamicConfigurationRegistry.saveModules(updated);
    addLog(`MODULE LIFECYCLE: Set ${id} status to [${status}].`);
  };

  const handleDeleteModule = (id: string) => {
    const updated = modules.filter(m => m.id !== id);
    setModules(updated);
    DynamicConfigurationRegistry.saveModules(updated);
    addLog(`MODULE LIFECYCLE: Permanently deleted module ${id} from system registry.`);
  };

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModId || !newModName) return;
    const newMod: ModuleLifecycleConfig = {
      id: newModId,
      name: newModName,
      erpFamily: newModFamily,
      status: 'Enabled',
      version: 'v1.0',
      priceUSD: newModPrice
    };
    const updated = [...modules, newMod];
    setModules(updated);
    DynamicConfigurationRegistry.saveModules(updated);
    addLog(`MODULE REGISTRY: Injected new dynamic module [${newModId}] - ${newModName}`);
    setNewModId('');
    setNewModName('');
  };

  // 3. Component Governance actions
  const handleUpdateComponentStatus = (id: string, status: UIComponentConfig['status']) => {
    const updated = components.map(c => c.id === id ? { ...c, status } : c);
    setComponents(updated);
    DynamicConfigurationRegistry.saveComponents(updated);
    addLog(`COMPONENT GOVERNANCE: Component ${id} state updated to ${status}.`);
  };

  const handleCreateComponent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompId || !newCompName) return;
    const newComp: UIComponentConfig = {
      id: newCompId,
      name: newCompName,
      version: 'v1.0',
      owner: 'System Custom Injector',
      status: 'Enabled',
      dependencies: ['ueos-kernel'],
      billingPlan: newCompPlan,
      configuration: {}
    };
    const updated = [...components, newComp];
    setComponents(updated);
    DynamicConfigurationRegistry.saveComponents(updated);
    addLog(`COMPONENT REGISTRY: Registered component [${newCompId}] - ${newCompName}`);
    setNewCompId('');
    setNewCompName('');
  };

  // 4. Layer Governance actions
  const handleUpdateLayerStatus = (id: LayerConfig['id'], status: LayerConfig['status']) => {
    const updated = layers.map(l => l.id === id ? { ...l, status } : l);
    setLayers(updated);
    DynamicConfigurationRegistry.saveLayers(updated);
    addLog(`LAYER ARCHITECTURE: Modified status of layer [${id}] to ${status}.`);
  };

  const handleUpdateLayerTheme = (id: LayerConfig['id'], theme: 'light' | 'dark' | 'hybrid') => {
    const updated = layers.map(l => {
      if (l.id === id) {
        return {
          ...l,
          config: {
            ...l.config,
            theme
          }
        };
      }
      return l;
    });
    setLayers(updated);
    DynamicConfigurationRegistry.saveLayers(updated);
    addLog(`LAYER ARCHITECTURE: Switched theme profile for layer [${id}] to [${theme}].`);
  };

  // 5. Navigation & Branding actions
  const handleToggleNavItem = (id: string) => {
    const updated = navItems.map(item => item.id === id ? { ...item, visible: !item.visible } : item);
    setNavItems(updated);
    DynamicConfigurationRegistry.saveNavigationItems(updated);
    addLog(`NAVIGATION REGISTRY: Toggled visibility for menu item [${id}].`);
  };

  const handleCreateNavItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNavLabel || !newNavPath) return;
    const item: NavigationMenuItem = {
      id: `nav_${Date.now()}`,
      label: newNavLabel,
      path: newNavPath,
      folder: newNavFolder,
      visible: true,
      roles: ['admin', 'executive', 'staff']
    };
    const updated = [...navItems, item];
    setNavItems(updated);
    DynamicConfigurationRegistry.saveNavigationItems(updated);
    addLog(`NAVIGATION BUILDER: Injected new menu route [${newNavLabel}] -> ${newNavPath}`);
    setNewNavLabel('');
    setNewNavPath('');
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    DynamicConfigurationRegistry.saveBranding(branding);
    addLog(`BRANDING REGISTRY: Updated system branding configuration for [${branding.institutionName || 'Platform'}]`);
  };

  // 6. Upgrade Center actions
  const handleApproveUpgrade = (id: string) => {
    const updated = updates.map(upd => upd.id === id ? { ...upd, approved: true, scheduledTime: 'Immediate' } : upd);
    setUpdates(updated);
    DynamicConfigurationRegistry.saveUpdates(updated);
    addLog(`UPGRADE MANAGER: Approved system-wide release patch [${id}]. Executing node orchestration...`);
  };

  // --- Sub-panel Render Functions ---
  
  // Section 1: ERP Domains
  const renderERPPlatformPanel = () => {
    const filtered = erps.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      <div className="space-y-6">
        {OWNER_VERIFICATION_MODE && renderVerificationMode()}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Universal ERP Domain Management</h2>
            <p className="text-xs text-slate-500">Enable, disable, configure, and provision enterprise-wide operational templates.</p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
            {erps.filter(e => e.status === 'ACTIVE').length} / {erps.length} DOMAINS ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(erp => (
            <div key={erp.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#0078D4]" />
                      {erp.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">ID: {erp.id} | Family: {erp.family}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-black rounded border uppercase ${
                    erp.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    erp.status === 'SUSPENDED' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {erp.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 font-medium">LTS Version:</span>
                    <span className="font-bold text-slate-800 ml-1 font-mono">{erp.version}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Billing Tier:</span>
                    <span className="font-bold text-slate-800 ml-1">{erp.subscription}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Assigned Modules:</span>
                    <span className="font-bold text-slate-800 ml-1 font-mono">{erp.assignedModules.length} Modules</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Active Invocations:</span>
                    <span className="font-bold text-slate-800 ml-1 font-mono">{erp.usageCount.toLocaleString()} calls</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 justify-end">
                <button
                  onClick={() => handleUpdateErpStatus(erp.id, erp.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE')}
                  className={`px-2 py-1 rounded text-[10px] font-extrabold transition cursor-pointer ${
                    erp.status === 'ACTIVE' 
                      ? 'bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {erp.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                </button>
                {erp.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleUpdateErpStatus(erp.id, 'SUSPENDED')}
                    className="px-2 py-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded hover:bg-amber-600 transition cursor-pointer"
                  >
                    Suspend
                  </button>
                )}
                <button
                  onClick={() => handleUpgradeErpVersion(erp.id, 'v2.2-stable')}
                  className="px-2 py-1 bg-blue-50 text-[#0078D4] border border-blue-200 text-[10px] font-bold rounded hover:bg-blue-100 transition cursor-pointer flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" /> Upgrade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Section 2: Module Lifecycles
  const renderModuleLifecyclePanel = () => {
    const filtered = modules.filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Universal Module Lifecycle Controller</h2>
            <p className="text-xs text-slate-500">Globally change module availability parameters, suspend features, or inject new dynamic custom capabilities.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active catalog */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search registered modules (e.g. admissions, ehr)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none text-xs text-slate-900 focus:outline-none placeholder-slate-400"
              />
            </div>

            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
              {filtered.map(mod => (
                <div key={mod.id} className="p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{mod.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-mono text-slate-500 font-bold uppercase">{mod.erpFamily.toUpperCase()}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Module ID: {mod.id} | System Target: {mod.erpFamily}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-extrabold uppercase border ${
                      mod.status === 'Enabled' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      mod.status === 'Suspended' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      mod.status === 'Disabled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      'bg-slate-100 text-slate-600 border-slate-300'
                    }`}>
                      {mod.status}
                    </span>
                    <select
                      value={mod.status}
                      onChange={(e) => handleUpdateModStatus(mod.id, e.target.value as any)}
                      className="p-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="Enabled">Enable</option>
                      <option value="Disabled">Disable</option>
                      <option value="Suspended">Suspend</option>
                      <option value="Archived">Archive</option>
                      <option value="Available Upgrade">Set Upgrade</option>
                    </select>
                    <button
                      onClick={() => handleDeleteModule(mod.id)}
                      className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
                      title="Sovereign Registry Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module Injector Form */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-fit space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1">
              <Code className="w-4 h-4 text-blue-600" />
              Sovereign Module Injector
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Inject a newly compiled module dynamically into the Ring-0 platform registry without stopping the dev server.
            </p>

            <form onSubmit={handleCreateModule} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Unique ID (lowercase, alphanumeric)</label>
                <input
                  type="text"
                  placeholder="e.g. edu_biometric_kyc"
                  value={newModId}
                  onChange={(e) => setNewModId(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Module Display Name</label>
                <input
                  type="text"
                  placeholder="e.g. Biometric Attendance Sync"
                  value={newModName}
                  onChange={(e) => setNewModName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Target ERP Family</label>
                <select
                  value={newModFamily}
                  onChange={(e) => setNewModFamily(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none focus:border-blue-500"
                >
                  <option value="JUMO-EDU-ALUMNI">Education & Alumni ERP</option>
                  <option value="JUMO-FINPAY">Financial & Digital Pay Platform</option>
                  <option value="JUMO-CHURCH">Church & Diocese ERP</option>
                  <option value="JUMO-CONTROL">Control Center</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Assigned Price Token (USD)</label>
                <input
                  type="number"
                  value={newModPrice}
                  onChange={(e) => setNewModPrice(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Inject Module to Registry
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Section 3: Component Governance
  const renderComponentPanel = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Registered Components Governance</h2>
            <p className="text-xs text-slate-500">Every operational widget, interactive form, and AI chat panel must reside in this central security ledger.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {components.map(comp => (
              <div key={comp.id} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{comp.name}</span>
                    <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-[#0078D4] text-[9px] rounded-full font-bold uppercase">{comp.billingPlan}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    ID: {comp.id} | Engine Version: {comp.version} | Owner Group: {comp.owner}
                  </div>
                  {comp.dependencies.length > 0 && (
                    <div className="text-[10px] text-slate-500 font-medium">
                      Dependencies: {comp.dependencies.join(', ')}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-extrabold uppercase border ${
                    comp.status === 'Enabled' || comp.status === 'Updated' || comp.status === 'Upgraded'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {comp.status}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleUpdateComponentStatus(comp.id, comp.status === 'Enabled' ? 'Disabled' : 'Enabled')}
                      className={`px-2 py-1 rounded text-[10px] font-extrabold transition cursor-pointer ${
                        comp.status === 'Enabled' 
                          ? 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {comp.status === 'Enabled' ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => handleUpdateComponentStatus(comp.id, 'Upgraded')}
                      className="px-2 py-1 bg-blue-50 text-[#0078D4] border border-blue-200 text-[10px] font-bold rounded hover:bg-blue-100 transition cursor-pointer"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-fit space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1">
              <Sliders className="w-4 h-4 text-blue-600" />
              Register Custom Component
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Every newly written client widget or chart must be declared before rendering, keeping security policies in full alignment.
            </p>

            <form onSubmit={handleCreateComponent} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Component System ID</label>
                <input
                  type="text"
                  placeholder="e.g. comp_tuition_chart"
                  value={newCompId}
                  onChange={(e) => setNewCompId(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Display Name</label>
                <input
                  type="text"
                  placeholder="e.g. High-Contrast Tuition Chart"
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Billing Plan Tier</label>
                <select
                  value={newCompPlan}
                  onChange={(e) => setNewCompPlan(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none font-medium"
                >
                  <option value="Core Foundation">Core Foundation</option>
                  <option value="Enterprise Hybrid">Enterprise Hybrid</option>
                  <option value="Sovereign Pro">Sovereign Pro</option>
                  <option value="Beta Sandbox">Beta Sandbox</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#0078D4] hover:bg-blue-600 text-white rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Declare UI Component
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Section 4: Layer Governance
  const renderLayerPanel = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Sovereign Layer Governance</h2>
            <p className="text-xs text-slate-500">Configure global activation, status tracking, and customization schemes for the 5 fundamental enterprise layers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map(layer => (
            <div key={layer.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-all">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-sm text-slate-900">{layer.name}</h3>
                    <span className="text-[10px] font-mono text-indigo-500 uppercase font-bold">{layer.id} layer</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
                    layer.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {layer.status}
                  </span>
                </div>
                <div className="space-y-1 font-mono text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                  <div>Engine Version: {layer.version}</div>
                  {layer.config.theme && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <span>Branding Theme:</span>
                      <span className="text-slate-800 font-extrabold uppercase bg-slate-100 px-1.5 py-0.2 rounded border">{layer.config.theme}</span>
                    </div>
                  )}
                  {layer.config.mfaLevel && (
                    <div>MFA Standard: <span className="font-bold text-slate-800">{layer.config.mfaLevel}</span></div>
                  )}
                  {layer.config.isolationLevel && (
                    <div>Database Isolation: <span className="font-bold text-slate-800">{layer.config.isolationLevel}</span></div>
                  )}
                  {layer.config.faapRules && (
                    <div className="mt-1">
                      <div className="font-bold text-slate-700">FAAP Ledger Rules:</div>
                      <ul className="list-disc pl-3 text-slate-500 space-y-0.5 mt-0.5">
                        {layer.config.faapRules.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 text-xs">
                <div className="flex gap-1">
                  {layer.config.theme && (
                    <select
                      value={layer.config.theme}
                      onChange={(e) => handleUpdateLayerTheme(layer.id, e.target.value as any)}
                      className="p-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  )}
                </div>
                <button
                  onClick={() => handleUpdateLayerStatus(layer.id, layer.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE')}
                  className={`px-2.5 py-1 rounded text-[10px] font-extrabold transition cursor-pointer border ${
                    layer.status === 'ACTIVE' 
                      ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100' 
                      : 'bg-emerald-600 text-white border-transparent hover:bg-emerald-700'
                  }`}
                >
                  {layer.status === 'ACTIVE' ? 'Set Maintenance' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Section 5: Navigation & Branding Governance
  const renderNavigationPanel = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900">Dynamic Navigation & Branding Governance Engine</h2>
          <p className="text-xs text-slate-500">Enable menu visibility, structure navigation folders, declare new routes, and customize institution branding parameters in real-time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          {/* Active Navigation Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#0078D4]" />
                  Active System Navigation Registry ({navItems.length} Routes)
                </h3>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#0078D4] px-2 py-0.5 rounded border border-blue-200">
                  REAL-TIME DYNAMIC
                </span>
              </div>

              <div className="space-y-2">
                {navItems.map(item => (
                  <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 hover:border-slate-300 transition">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{item.label}</span>
                        <span className="text-[9px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-bold">{item.folder}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Path: {item.path} | Roles: {item.roles.join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleNavItem(item.id)}
                        className={`px-2 py-1 rounded text-[10px] font-extrabold cursor-pointer border transition ${
                          item.visible
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        {item.visible ? 'VISIBLE' : 'HIDDEN'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Builder Form */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                Inject New Navigation Route
              </h3>
              <form onSubmit={handleCreateNavItem} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Menu Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Hostel Allocation"
                    value={newNavLabel}
                    onChange={(e) => setNewNavLabel(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-950 focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">System Route Path</label>
                  <input
                    type="text"
                    placeholder="e.g. /hostel"
                    value={newNavPath}
                    onChange={(e) => setNewNavPath(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-950 focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Folder Category</label>
                  <select
                    value={newNavFolder}
                    onChange={(e) => setNewNavFolder(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-950 focus:outline-none font-medium"
                  >
                    <option value="Core Workspaces">Core Workspaces</option>
                    <option value="Directory & Records">Directory & Records</option>
                    <option value="Financial Systems">Financial Systems</option>
                    <option value="Reports & Audits">Reports & Audits</option>
                    <option value="AI & Intelligence">AI & Intelligence</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#0078D4] hover:bg-blue-600 text-white rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Route to Navigation Registry
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Branding Management Settings */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-600" />
              Institution Branding Settings
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Customize local institution branding parameters, logo subdomains, and news bulletin alerts visible across portals.
            </p>

            <form onSubmit={handleSaveBranding} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Institution Display Name</label>
                <input
                  type="text"
                  value={branding.institutionName}
                  onChange={(e) => setBranding({ ...branding, institutionName: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Primary Brand Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={branding.brandColor}
                    onChange={(e) => setBranding({ ...branding, brandColor: e.target.value })}
                    className="h-9 w-12 rounded cursor-pointer border border-slate-200 p-1 bg-white"
                  />
                  <input
                    type="text"
                    value={branding.brandColor}
                    onChange={(e) => setBranding({ ...branding, brandColor: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Sovereign Subdomain</label>
                <input
                  type="text"
                  value={branding.subdomain}
                  onChange={(e) => setBranding({ ...branding, subdomain: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Public Bulletin Announcement</label>
                <textarea
                  rows={2}
                  value={branding.newsAnnouncement}
                  onChange={(e) => setBranding({ ...branding, newsAnnouncement: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-950 focus:outline-none text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Branding Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Section 6: Billing & Subscriptions
  const renderBillingPanel = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Billing & Subscription Governance</h2>
            <p className="text-xs text-slate-500">Configure corporate pricing plans, optional module subscription packages, and check active tenant accounts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {billing.map((sub, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-[#0078D4] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-slate-900">{sub.institutionName}</h3>
                    <span className="text-[10px] font-mono text-slate-400">ID: {sub.tenantId}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono text-[9px] font-bold">
                    {sub.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div>Package: <span className="font-bold text-slate-800">{sub.edition}</span></div>
                  <div>Active Modules: <span className="font-bold text-slate-800 font-mono">{sub.activeModulesCount}</span></div>
                  <div>Upgrade Candidates: <span className="font-bold text-slate-800 font-mono">{sub.optionalModulesCount}</span></div>
                  <div>Contract Plan: <span className="font-bold text-slate-800">{sub.subscriptionType}</span></div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-1.5">
                <button className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-[10px] font-bold rounded cursor-pointer transition">
                  Modify Tier
                </button>
                <button className="px-2 py-1 bg-[#0078D4] hover:bg-blue-600 text-white text-[10px] font-bold rounded cursor-pointer transition">
                  Add-ons
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Section 7: Update & Upgrade Center
  const renderUpdatesPanel = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900">JUMO UEOS Update & Core Release Center</h2>
          <p className="text-xs text-slate-500">Approve available updates for ERP Core, FAAP balance ledger engines, JUMO Trust logs, or AEGIS Security layers.</p>
        </div>

        <div className="space-y-4">
          {updates.map(upd => (
            <div key={upd.id} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 transition-all text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900 text-sm">{upd.name}</h3>
                  <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-[#0078D4] rounded font-mono text-[9px] font-bold">{upd.version}</span>
                  {upd.approved && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-mono text-[9px] font-bold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> APPROVED
                    </span>
                  )}
                </div>
                <p className="text-slate-600 max-w-3xl leading-relaxed">{upd.description}</p>
                <div className="text-[10px] text-slate-400 font-mono">
                  Package ID: {upd.id} | Dependency Target: {upd.dependencies.join(', ')}
                </div>
              </div>

              <div className="shrink-0 self-end md:self-auto flex items-center gap-2">
                {upd.approved ? (
                  <span className="text-[11px] text-slate-500 font-semibold font-mono flex items-center gap-1">
                    <Clock className="w-4.5 h-4.5 text-slate-400" /> Scheduled: Immediate
                  </span>
                ) : (
                  <button
                    onClick={() => handleApproveUpgrade(upd.id)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg cursor-pointer transition flex items-center gap-1 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Upgrade
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Section 8: Institution configuration limits vs Ring-0 boundaries
  const renderRightsPanel = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900">Institution Configuration Limits</h2>
          <p className="text-xs text-slate-500">Understand the boundary division between Ring-0 platform-wide governance and localized institution configuration rights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Ring 0 locked */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <Lock className="w-4.5 h-4.5" />
              Sovereign Ring-0 Locked Controls
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              These global boundaries are strictly audited by AEGIS. Individual schools, clinics, or cooperatives CANNOT alter or override these rules.
            </p>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between items-center p-2.5 bg-slate-950/80 rounded-lg border border-slate-800">
                <span className="text-slate-300">FAAP Parity Enforcement</span>
                <span className="text-emerald-400 font-bold">LOCKED FORCE-ON</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-950/80 rounded-lg border border-slate-800">
                <span className="text-slate-300">1.5% Settlement Switch</span>
                <span className="text-emerald-400 font-bold">LOCKED FORCE-ON</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-950/80 rounded-lg border border-slate-800">
                <span className="text-slate-300">Base Identity MFA Verification</span>
                <span className="text-amber-400 font-bold">FORCE-ON</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-950/80 rounded-lg border border-slate-800">
                <span className="text-slate-300">Database Schema Segregation</span>
                <span className="text-emerald-400 font-bold">SCHEMA ISO</span>
              </div>
            </div>
          </div>

          {/* Local Tenant Customizable */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#0078D4] flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Sliders className="w-4.5 h-4.5" />
              Tenant Local Customization Rights
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              These settings are fully delegated to individual institutions (like {institutionName}) to match local corporate style.
            </p>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600">Local Slogan & Branding Colors</span>
                <span className="text-blue-600 font-bold">DELEGATED</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600">Logo Letter & News Feed</span>
                <span className="text-blue-600 font-bold">DELEGATED</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600">Staff & Student Users Census</span>
                <span className="text-blue-600 font-bold">DELEGATED</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600">Local Departments & Roster files</span>
                <span className="text-blue-600 font-bold">DELEGATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section 9: Universal Platform Registry (Node graph visualization / full tables list)
  const renderRegistryPanel = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">Universal Platform Registry Visualizer</h2>
            <p className="text-xs text-slate-500">Live schema map detailing system-wide registries (ERP Registry, Module Registry, Component Registry, Service Registry, etc.).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
            <h3 className="font-extrabold text-blue-900 flex items-center gap-1">
              <Building2 className="w-4 h-4" /> ERP Registry
            </h3>
            <p className="text-[11px] text-blue-700">Preconfigured target industries.</p>
            <div className="font-bold font-mono text-slate-800 text-sm mt-2">{erps.length} Targets</div>
          </div>

          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <h3 className="font-extrabold text-emerald-900 flex items-center gap-1">
              <Layers className="w-4 h-4" /> Module Registry
            </h3>
            <p className="text-[11px] text-emerald-700">Individual business functions.</p>
            <div className="font-bold font-mono text-slate-800 text-sm mt-2">{modules.length} Modules</div>
          </div>

          <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-2">
            <h3 className="font-extrabold text-indigo-900 flex items-center gap-1">
              <Code className="w-4 h-4" /> Component Registry
            </h3>
            <p className="text-[11px] text-indigo-700">Interactive UI components.</p>
            <div className="font-bold font-mono text-slate-800 text-sm mt-2">{components.length} UI Widgets</div>
          </div>

          <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-2">
            <h3 className="font-extrabold text-purple-900 flex items-center gap-1">
              <Shield className="w-4 h-4" /> Security Registry
            </h3>
            <p className="text-[11px] text-purple-700">AEGIS protection logs.</p>
            <div className="font-bold font-mono text-slate-800 text-sm mt-2">Nominal Parity</div>
          </div>
        </div>

        {/* Live system state visual table */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs text-xs space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900">Current Ring-0 System Elements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold">
                  <th className="pb-2">Element Registry ID</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Active Version</th>
                  <th className="pb-2">Authorization Layer</th>
                  <th className="pb-2">Sovereign State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 text-slate-900 font-bold">SACCO_ERP_Core</td>
                  <td>Domain</td>
                  <td>v2.1.0</td>
                  <td className="text-[#0078D4]">admin-only</td>
                  <td className="text-emerald-600 font-bold">ACTIVE</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-900 font-bold">FAAP_DoubleEntry_Engine</td>
                  <td>Service</td>
                  <td>v1.4.2</td>
                  <td className="text-indigo-600">all-tenants</td>
                  <td className="text-emerald-600 font-bold">ACTIVE</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-900 font-bold">ZeroTrust_RBAC_Validator</td>
                  <td>Security</td>
                  <td>v3.0.1</td>
                  <td className="text-red-600">root-only</td>
                  <td className="text-emerald-600 font-bold">ACTIVE</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-900 font-bold">Gemini_Multimodel_Router</td>
                  <td>AI</td>
                  <td>v1.0.0</td>
                  <td className="text-indigo-600">all-tenants</td>
                  <td className="text-emerald-600 font-bold">ACTIVE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 flex flex-col antialiased">
      
      {/* 1. UNIVERSAL HEADER (COMPACT REDESIGN) */}
      <header className="bg-slate-900 text-white h-11 px-4 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-black text-xs tracking-wider text-amber-400">
            <Server className="w-4 h-4 text-amber-500" />
            <span>JUMO UEOS</span>
          </div>
          <span className="h-4 w-px bg-slate-700 hidden sm:block"></span>
          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-tight hidden sm:block">
            RING-0 OWNER CONTROL CENTER (LAUNCHPAD CONSOLE)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-emerald-400">NOMINAL</span>
          </div>
          {onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className="px-2.5 py-1 bg-red-600 text-white hover:bg-red-700 text-[10px] font-extrabold rounded transition flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Close Ring-0
            </button>
          )}
        </div>
      </header>

      {/* 2. BODY CONTAINER (LEFT NAVIGATION + MAIN WORKSPACE) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT NAVIGATION COLUMN */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none overflow-y-auto hidden md:flex">
          <div className="p-4 space-y-6">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider px-2">
                Governance Layers
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => { setActiveMenu('platforms'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'platforms' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>1. ERP Domains (Activate)</span>
                </button>

                <button
                  onClick={() => { setActiveMenu('modules'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'modules' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>2. Modules Lifecycle</span>
                </button>

                <button
                  onClick={() => { setActiveMenu('components'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'components' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>3. Component Registry</span>
                </button>

                <button
                  onClick={() => { setActiveMenu('layers'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'layers' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>4. Architectural Layers</span>
                </button>

                <button
                  onClick={() => { setActiveMenu('navigation'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'navigation' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>5. Dynamic Navigation</span>
                </button>

                <button
                  onClick={() => { setActiveMenu('billing'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'billing' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>6. Billing & Subscription</span>
                </button>

                <button
                  onClick={() => { setActiveMenu('updates'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'updates' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>7. Upgrade Center</span>
                </button>

                <button
                  onClick={() => { setActiveMenu('rights'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'rights' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>8. Institution Limits</span>
                </button>

                <button
                  onClick={() => { setActiveMenu('registry'); setSearchTerm(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    activeMenu === 'registry' 
                      ? 'bg-blue-50 text-[#0078D4]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>9. Registry Visualizer</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Core System Signature Status */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] font-mono text-slate-500 space-y-1 select-none">
            <div className="flex justify-between">
              <span>Sovereign ID:</span>
              <span className="font-bold text-slate-700">JUMO-UEOS-R0</span>
            </div>
            <div className="flex justify-between">
              <span>Version:</span>
              <span className="font-bold text-slate-700">v28.0-PROD</span>
            </div>
            <div className="flex justify-between">
              <span>MFA:</span>
              <span className="font-bold text-emerald-600">PASSKEY ACTIVE</span>
            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE REGION */}
        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* Breadcrumbs Banner */}
          <div className="bg-white border-b border-slate-200 h-10 px-6 flex items-center justify-between shrink-0 text-xs font-mono text-slate-400 select-none">
            <div className="flex items-center gap-1">
              <span>UEOS CENTRAL REGISTRY</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-[#0078D4] font-bold">
                {activeMenu === 'platforms' ? 'ERP Domains' : 
                 activeMenu === 'modules' ? 'Module Lifecycles' : 
                 activeMenu === 'components' ? 'Components Governance' :
                 activeMenu === 'layers' ? 'Architectural Layers' :
                 activeMenu === 'navigation' ? 'Navigation Governance' :
                 activeMenu === 'billing' ? 'Billing Subscriptions' :
                 activeMenu === 'updates' ? 'Upgrade Center' :
                 activeMenu === 'rights' ? 'Institution Limits' : 'Platform Registries'}
              </span>
            </div>

            <span className="text-[10px] text-slate-500 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
              AEGIS-ZERO-TRUST-SHIELD-ON
            </span>
          </div>

          {/* Active section viewport */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            
            {/* Mobile Navigation fallback */}
            <div className="md:hidden bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap gap-1.5 justify-start text-xs font-bold select-none">
              <button onClick={() => setActiveMenu('platforms')} className={`px-2 py-1 rounded-lg ${activeMenu === 'platforms' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>ERPs</button>
              <button onClick={() => setActiveMenu('modules')} className={`px-2 py-1 rounded-lg ${activeMenu === 'modules' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>Modules</button>
              <button onClick={() => setActiveMenu('components')} className={`px-2 py-1 rounded-lg ${activeMenu === 'components' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>Components</button>
              <button onClick={() => setActiveMenu('layers')} className={`px-2 py-1 rounded-lg ${activeMenu === 'layers' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>Layers</button>
              <button onClick={() => setActiveMenu('navigation')} className={`px-2 py-1 rounded-lg ${activeMenu === 'navigation' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>Navigation</button>
              <button onClick={() => setActiveMenu('billing')} className={`px-2 py-1 rounded-lg ${activeMenu === 'billing' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>Billing</button>
              <button onClick={() => setActiveMenu('updates')} className={`px-2 py-1 rounded-lg ${activeMenu === 'updates' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>Updates</button>
              <button onClick={() => setActiveMenu('rights')} className={`px-2 py-1 rounded-lg ${activeMenu === 'rights' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>Limits</button>
              <button onClick={() => setActiveMenu('registry')} className={`px-2 py-1 rounded-lg ${activeMenu === 'registry' ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600'}`}>Registry</button>
            </div>

            {/* Viewport switch content */}
            <div className="animate-in fade-in duration-200">
              {activeMenu === 'platforms' && renderERPPlatformPanel()}
              {activeMenu === 'modules' && renderModuleLifecyclePanel()}
              {activeMenu === 'components' && renderComponentPanel()}
              {activeMenu === 'layers' && renderLayerPanel()}
              {activeMenu === 'navigation' && renderNavigationPanel()}
              {activeMenu === 'billing' && renderBillingPanel()}
              {activeMenu === 'updates' && renderUpdatesPanel()}
              {activeMenu === 'rights' && renderRightsPanel()}
              {activeMenu === 'registry' && renderRegistryPanel()}
            </div>

            {/* Audit surveillance logger (Sovereign real-time telemetry) */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-4 md:p-5 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="font-extrabold text-xs text-amber-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-500" />
                  AEGIS Continuous Surveillance Logs
                </h3>
                <span className="text-[10px] font-mono text-slate-500">Live Telemetry Active</span>
              </div>
              <div className="font-mono text-[10px] space-y-1 max-h-32 overflow-y-auto pr-1">
                {logs.map((log, idx) => (
                  <div key={idx} className="text-slate-300 leading-relaxed truncate">
                    <span className="text-amber-500 font-bold">➔</span> {log}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* 3. UNIVERSAL FOOTER (COMPACT) */}
      <footer className="bg-slate-900 text-slate-400 h-9 px-4 flex items-center justify-between border-t border-slate-800 text-[10px] font-mono shrink-0 select-none">
        <div>System Status: <span className="text-emerald-400 font-bold">NOMINAL</span></div>
        <div className="hidden sm:block">JUMO Universal Enterprise Operating System (UEOS)</div>
        <div>v28.0.8 LTS (Sovereign-Cloud)</div>
      </footer>

    </div>
  );
};

export default OwnerControlCenterWorkspace;
