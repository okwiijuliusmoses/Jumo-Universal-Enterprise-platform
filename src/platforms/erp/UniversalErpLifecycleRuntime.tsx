/**
 * JUMO UEOS Universal ERP Platform Center & Runtime Lifecycle System (v24.0 & v25.0)
 * Authoritative production implementation of the ERP Installation Engine, Provisioning Layer,
 * Independent Sovereign Workspace Rule, Module Marketplace, Configuration Center, and 7 Universal Platform Centers.
 * Adheres strictly to the Page Composition Standard: Minimal Header, Collapsible Left Nav, Full Workspace.
 */

import React, { useState } from 'react';
import { UniversalModuleRegistry, validateRing0Authority } from '../../core/runtime/universalModuleRegistry';
import { UniversalModuleWorkspaceRuntime } from '../../components/universal-runtime/UniversalModuleWorkspaceRuntime';
import {
  Building2, DollarSign, Zap, Shield, Cloud, Cpu, Code, Microscope,
  Package, Sliders, Settings, Activity, CheckCircle2, Layers, Lock,
  Server, Users, GitBranch, Terminal, Globe, RefreshCw, Plus, Search,
  Landmark, BookOpen, Award, Sparkles, ChevronRight, Check, Play,
  FileText, Database, ArrowRight, Download, ExternalLink, ShieldCheck,
  AlertCircle, HelpCircle, UserCheck, CreditCard, ToggleLeft, ToggleRight,
  Filter, Grid, List, Wrench, Briefcase, HeartHandshake, GraduationCap,
  Home, Menu, X, ChevronDown, Info, Sprout, HeartPulse, Factory, Truck,
  HardHat, Scale, Church, Share2, Copy, Trash2, Edit3, Send, ShieldAlert,
  ArrowUpRight, BarChart3, PieChart, Bell, Upload, Calendar, Clock,
  CheckSquare, Smartphone, Monitor, HardDrive, Cpu as CpuIcon
} from 'lucide-react';

export interface UniversalErpLifecycleRuntimeProps {
  onNavigate?: (route: string) => void;
  currentUser?: {
    name?: string;
    email?: string;
    role?: string;
    tenantId?: string;
  };
  onLogout?: () => void;
  initialTab?: 'marketplace' | 'workspace' | 'modules' | 'config' | 'ai' | 'lifecycle' | 'platform-centers' | 'universal-runtime';
}

export interface InstalledErpState {
  id: string;
  family: string;
  templateName: string;
  edition: string;
  version: string;
  availableUpgrade: string;
  status: 'active' | 'upgrading' | 'maintenance';
  workspaceRoute: string;
  activeModules: string[];
  availableAddons: { name: string; category: string; description: string }[];
}

const getInitialErpModules = (familyKey: string, fallbackActive: string[], fallbackAddons: { name: string; category: string; description: string }[]) => {
  try {
    const modules = UniversalModuleRegistry.getModulesForErpFamily(familyKey);
    if (modules && modules.length > 0) {
      const active = modules.filter(m => m.status === 'INSTALLED' || m.licenseTier.includes('Core') || m.licenseTier.includes('Standard')).map(m => m.name);
      const addons = modules.filter(m => !active.includes(m.name)).map(m => ({
        name: m.name,
        category: m.domainCategory,
        description: m.description
      }));
      return {
        activeModules: active.length > 0 ? active : fallbackActive,
        availableAddons: addons.length > 0 ? addons : fallbackAddons
      };
    }
  } catch (e) {
    // fallback
  }
  return { activeModules: fallbackActive, availableAddons: fallbackAddons };
};

export const UniversalErpLifecycleRuntime: React.FC<UniversalErpLifecycleRuntimeProps> = ({
  onNavigate,
  currentUser,
  onLogout,
  initialTab = 'workspace'
}) => {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'marketplace' | 'workspace' | 'modules' | 'config' | 'ai' | 'lifecycle' | 'platform-centers' | 'universal-runtime'>(initialTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected ERP Profile in Operating Workspace
  const [activeErpId, setActiveErpId] = useState<string>('erp-edu-univ');
  const [activeWorkspaceSubTab, setActiveWorkspaceSubTab] = useState<string>('academic');

  // Installation Wizard State (v24.0 Sec 1)
  const [wizardOpen, setWizardOpen] = useState<boolean>(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [wizFamily, setWizFamily] = useState<string>('Education ERP Family');
  const [wizTemplate, setWizTemplate] = useState<string>('University ERP');
  const [wizEdition, setWizEdition] = useState<string>('Public University');
  const [wizModules, setWizModules] = useState<string[]>([
    'Student Information System (SIS)', 'Admissions', 'Registration', 'Faculties', 'Departments',
    'Examination Management', 'Digital Exams', 'Research Projects', 'LMS', 'FAAP Accounting', 'JUMO Education Assistant'
  ]);
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);
  const [provisionProgress, setProvisionProgress] = useState<number>(0);

  // Installed ERPs Registry (v24.0 Sec 2 & 3)
  const [installedErps, setInstalledErps] = useState<Record<string, InstalledErpState>>(() => {
    const eduMods = getInitialErpModules('edu', [
      'Student Information System (SIS)', 'Admissions & Registration', 'Faculties & Departments',
      'Examination Management & Grading', 'Digital Library Archives', 'Research Projects & Grants',
      'Virtual Classroom LMS', 'FAAP Fee Accounting ($0.00 Parity)', 'JUMO Education Assistant'
    ], [
      { name: 'Hostel & Dormitory Management', category: 'Facility', description: 'Automated room allocation, biometric entry tracking, and billing.' },
      { name: 'University Fleet & Transport', category: 'Logistics', description: 'GPS bus scheduling, maintenance routing, and student pass scanning.' },
      { name: 'Alumni & Endowment Portal', category: 'Community', description: 'Sovereign alumni directory, fundraising campaigns, and trust accounting.' },
      { name: 'International Student & Visa Compliance', category: 'Governance', description: 'Automated immigration tracking, health insurance, and foreign credential evaluation.' },
      { name: 'National Accreditation & ISO Audit Module', category: 'Compliance', description: 'Real-time statutory audit preparation and curriculum compliance scoring.' },
      { name: 'Smart Campus IoT & Access Control', category: 'Security', description: 'Ring-0 smart card access for labs, libraries, and examination halls.' }
    ]);

    const coopMods = getInitialErpModules('coop', [
      'Member Onboarding & KYC', 'Savings & Deposit Accounts', 'Loan Origination & Amortization',
      'AI Credit Scoring Engine', 'Share Capital Registers', 'Automated Dividend Calculation',
      'FAAP Double-Entry Treasury (1.5% Switch)', 'Statutory Compliance & Reporting'
    ], [
      { name: 'Agency Banking POS Module', category: 'FinTech', description: 'Rural biometric merchant terminals and float management.' },
      { name: 'Mobile Lending Instant Disbursement', category: 'Lending', description: 'Automated M-Pesa USSD loan scoring and instant credit.' },
      { name: 'Group Guaranteed Lending (Chama)', category: 'Cooperative', description: 'Co-guarantor risk sharing and joint liability recovery.' }
    ]);

    const healthMods = getInitialErpModules('hlth', [
      'Electronic Patient Records (EHR)', 'Doctor & Theatre Appointments', 'Laboratory Diagnostics Tracking',
      'Pharmacy Inventory & Dispensing', 'FAAP Medical Billing & Insurance Claims', 'JUMO AI Health Assistant'
    ], [
      { name: 'Digital Radiography & PACS Archive', category: 'Clinical', description: 'DICOM medical imaging cloud storage and AI tumor diagnostic scan.' },
      { name: 'ICU Telemetry & Ward Management', category: 'Inpatient', description: 'Real-time ventilator bed tracking and nurse shift allocation.' }
    ]);

    return {
      'erp-edu-univ': {
        id: 'erp-edu-univ',
        family: 'Education ERP Family',
        templateName: 'University ERP',
        edition: 'Public University Edition',
        version: 'v14.4.0',
        availableUpgrade: 'v14.5.0',
        status: 'active',
        workspaceRoute: '/workspace/education/university',
        activeModules: eduMods.activeModules,
        availableAddons: eduMods.availableAddons
      },
      'erp-fin-coop': {
        id: 'erp-fin-coop',
        family: 'Finance & Cooperative ERP Family',
        templateName: 'Cooperative Enterprise ERP',
        edition: 'National SACCO Edition',
        version: 'v12.1.0',
        availableUpgrade: 'v12.2.0',
        status: 'active',
        workspaceRoute: '/workspace/finance/sacco',
        activeModules: coopMods.activeModules,
        availableAddons: coopMods.availableAddons
      },
      'erp-health-gen': {
        id: 'erp-health-gen',
        family: 'Healthcare ERP Family',
        templateName: 'Medical Center & Hospital ERP',
        edition: 'General Hospital Edition',
        version: 'v11.0.0',
        availableUpgrade: 'v11.1.0',
        status: 'active',
        workspaceRoute: '/workspace/healthcare/hospital',
        activeModules: healthMods.activeModules,
        availableAddons: healthMods.availableAddons
      }
    };
  });

  // Upgrade Simulation State (v24.0 Sec 8 / v25.0 Sec 15)
  const [upgradingId, setUpgradingId] = useState<string | null>(null);

  // Configuration Center State (v24.0 Sec 5 / v25.0 Sec 4)
  const [configOrgName, setConfigOrgName] = useState<string>('East African Sovereign University');
  const [configCampuses, setConfigCampuses] = useState<string>('Main Campus (Kampala), Tech Campus (Jinja), Medical School (Mulago)');
  const [configCurrency, setConfigCurrency] = useState<string>('UGX / USD / EUR (Multi-Currency Engine)');
  const [configFaapSwitch, setConfigFaapSwitch] = useState<boolean>(true);
  const [configAiEnabled, setConfigAiEnabled] = useState<boolean>(true);
  const [configSaved, setConfigSaved] = useState<boolean>(false);

  // AI Assistant Chat State (v24.0 Sec 7 / v25.0 Sec 6)
  const [aiInput, setAiInput] = useState<string>('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: `Greetings, Sovereign Administrator. I am the **${installedErps[activeErpId]?.templateName ? `JUMO ${installedErps[activeErpId].templateName.split(' ')[0]} Assistant` : 'JUMO AI Enterprise Assistant'}** (Roadmap v24.0 & v25.0). How can I assist you with ${installedErps[activeErpId]?.edition || 'your workspace'} today? I can analyze SIS attendance, simulate FAAP fee clearing, or explain statutory accreditation rules.`,
      time: 'Just now'
    }
  ]);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  // Helper Handlers
  const handleLaunchRoute = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else if (typeof window !== 'undefined') {
      window.location.href = route;
    }
  };

  const handleToggleWizModule = (mod: string) => {
    if (wizModules.includes(mod)) {
      setWizModules(prev => prev.filter(m => m !== mod));
    } else {
      setWizModules(prev => [...prev, mod]);
    }
  };

  const handleStartProvisioning = () => {
    setIsProvisioning(true);
    setProvisionProgress(10);
    const interval = setInterval(() => {
      setProvisionProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProvisioning(false);
            setWizardOpen(false);
            setWizardStep(1);
            setActiveTab('workspace');
          }, 600);
          return 100;
        }
        return prev + 18;
      });
    }, 400);
  };

  const handleInstallAddon = (addonName: string) => {
    // Enforce Ring-0 Governance on global module installation/licensing
    const userRole = currentUser?.role || 'erp_admin';
    if (!validateRing0Authority(userRole)) {
      alert(`Ring-0 Governance Enforcement: Module installation, enabling, disabling, and global licensing are strictly restricted to the Owner Control Center (Ring-0). As an ERP administrator, you only have authority to configure local rules and workflows for modules assigned to this ERP.`);
      return;
    }
    const current = installedErps[activeErpId];
    if (!current) return;
    const updatedModules = [...current.activeModules, addonName];
    const updatedAddons = current.availableAddons.filter(a => a.name !== addonName);
    setInstalledErps({
      ...installedErps,
      [activeErpId]: {
        ...current,
        activeModules: updatedModules,
        availableAddons: updatedAddons
      }
    });
  };

  const handleRunUpgrade = (id: string) => {
    setUpgradingId(id);
    setTimeout(() => {
      const target = installedErps[id];
      if (target) {
        setInstalledErps({
          ...installedErps,
          [id]: {
            ...target,
            version: target.availableUpgrade,
            availableUpgrade: 'Up to Date'
          }
        });
      }
      setUpgradingId(null);
    }, 2000);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userMsg = { sender: 'user' as const, text: aiInput, time: 'Just now' };
    setAiMessages(prev => [...prev, userMsg]);
    const query = aiInput.toLowerCase();
    setAiInput('');
    setAiThinking(true);

    setTimeout(() => {
      let reply = `I have analyzed the **${installedErps[activeErpId]?.templateName || 'Sovereign Workspace'}** runtime telemetry. `;
      if (query.includes('fee') || query.includes('finance') || query.includes('money') || query.includes('faap')) {
        reply += `All fee installments are verified through the **FAAP Financial Backbone** with strict $0.00 double-entry parity. The 1.5% treasury settlement switch is active and clearing in real-time.`;
      } else if (query.includes('student') || query.includes('exam') || query.includes('academic') || query.includes('sis')) {
        reply += `The **Student Information System (SIS)** shows 4,820 active enrollments across 12 university faculties. Digital examination grading is locked with Ring-0 cryptographically sealed transcripts.`;
      } else if (query.includes('upgrade') || query.includes('version') || query.includes('update')) {
        reply += `Under Roadmap v24.0 Section 8, you can upgrade from ${installedErps[activeErpId]?.version} directly via the Lifecycle Engine. All database schemas and custom tenant policies will migrate automatically without downtime.`;
      } else {
        reply += `In accordance with Roadmap v24.0 & v25.0, this independent workspace operates without sharing operational pages with other ERP families. All data rests in your dedicated tenant partition with Zero-Trust RBAC enforced.`;
      }
      setAiMessages(prev => [...prev, { sender: 'ai' as const, text: reply, time: 'Just now' }]);
      setAiThinking(false);
    }, 1000);
  };

  const currentErp = installedErps[activeErpId] || installedErps['erp-edu-univ'];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-[#0078D4] flex flex-col">
      {/* 1. TOP MINIMAL UNIVERSAL IDENTITY BAR (v24.0 Sec 6 / v25.0 Sec 2 Page Composition Rule) */}
      <header className="bg-slate-950 text-white px-4 md:px-6 py-3 border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer flex items-center justify-center md:hidden"
              title="Toggle Sidebar"
            >
              {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0078D4] flex items-center justify-center font-black text-white text-sm shadow-xs">
                J
              </div>
              <span className="font-black tracking-tight text-base text-white">
                {currentErp ? currentErp.templateName.toUpperCase() : 'JUMO UEOS'} <span className="text-amber-400 font-mono font-normal text-xs ml-1.5 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">v25.0 RUNTIME</span>
              </span>
            </div>
          </div>

          {/* Center Search / Status Pill (v24.0 Rule: Identity | Search | JUMO AI | Settings) */}
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${currentErp?.templateName || 'ERP'} modules...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#0078D4] transition"
              />
            </div>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> FAAP Switch Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('ai')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Open Dedicated JUMO AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">JUMO AI</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              title="ERP Settings & Configuration"
            >
              <Settings className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

            <button
              onClick={() => handleLaunchRoute('/control-center')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 transition border border-slate-700 cursor-pointer flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Owner Center</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE WITH COLLAPSIBLE LEFT ICON NAVIGATION & FULL OPERATIONAL CENTER AREA */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Collapsible Navigation (v24.0 Sec 6 Rule: Icon Navigation, No crowded right sidebar) */}
        <aside className={`bg-slate-50 border-r border-slate-200 shrink-0 transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } ${sidebarCollapsed ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="truncate">
                <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">Workspace Mode</div>
                <div className="text-xs font-extrabold text-[#0078D4] truncate">{currentErp?.templateName}</div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition cursor-pointer ml-auto"
              title={sidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"}
            >
              <ChevronRight className={`w-4 h-4 transform transition-transform ${!sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
            {/* Top Level Runtime Tabs */}
            {[
              { id: 'universal-runtime', label: '⚡ Universal Runtime v27.0', subtitle: '190+ Reusable Authoritative Modules', icon: Activity },
              { id: 'workspace', label: '1. Operating Workspace', subtitle: 'Full-Screen Sovereign Runtime', icon: Grid },
              { id: 'marketplace', label: '2. Install & Marketplace', subtitle: '11 Families & Wizard Provisioner', icon: Package },
              { id: 'modules', label: '3. Installed Modules', subtitle: 'Active & Available Addons', icon: Layers },
              { id: 'config', label: '4. Configuration Center', subtitle: 'Organization, RBAC & FAAP Switch', icon: Sliders },
              { id: 'ai', label: '5. JUMO AI Assistant', subtitle: 'Dedicated Enterprise Assistant', icon: Sparkles },
              { id: 'lifecycle', label: '6. Lifecycle & Upgrades', subtitle: 'v24.0 / v25.0 Version Management', icon: RefreshCw },
              { id: 'platform-centers', label: '7. 7 Platform Centers', subtitle: 'Universal Data Mesh Architecture', icon: Globe },
            ].map((nav) => {
              const Icon = nav.icon;
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id as any)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#0078D4] text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/60 font-semibold'
                  }`}
                  title={sidebarCollapsed ? nav.label : undefined}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#0078D4]'}`} />
                  {!sidebarCollapsed && (
                    <div className="truncate">
                      <div className="text-xs">{nav.label}</div>
                      <div className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-500'} font-normal truncate`}>{nav.subtitle}</div>
                    </div>
                  )}
                </button>
              );
            })}

            {/* ERP Switcher section if not collapsed */}
            {!sidebarCollapsed && (
              <div className="pt-4 mt-4 border-t border-slate-200">
                <div className="px-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Switch Installed ERP Tenant
                </div>
                <div className="space-y-1">
                  {(Object.values(installedErps) as InstalledErpState[]).map((erp) => {
                    const isSelected = activeErpId === erp.id;
                    return (
                      <button
                        key={erp.id}
                        onClick={() => {
                          setActiveErpId(erp.id);
                          setActiveTab('workspace');
                        }}
                        className={`w-full p-2 rounded-lg text-left text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                          isSelected ? 'bg-blue-50 text-[#0078D4] border border-blue-200' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{erp.templateName}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                          {erp.version}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>

          {/* Footer Quick Action */}
          <div className="p-3 border-t border-slate-200 mt-auto">
            <button
              onClick={() => {
                setWizardOpen(true);
                setWizardStep(1);
              }}
              className="w-full p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              title={sidebarCollapsed ? "Install New ERP" : undefined}
            >
              <Plus className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Install New ERP Template</span>}
            </button>
          </div>
        </aside>

        {/* Center Full Workspace (v24.0 Sec 6: No right sidebar, No stacked cards below) */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* TAB 1: OPERATING WORKSPACE (v24.0 Sec 6 & Sec 3 / v25.0 Sec 2) */}
          {activeTab === 'workspace' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Sovereign Workspace Identity Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-mono font-bold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" /> Independent Sovereign Workspace Rule Enforced
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black">{currentErp?.templateName} Operating Workspace</h1>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Edition: <strong className="text-amber-400">{currentErp?.edition}</strong> | Tenant Partition: <strong className="text-emerald-400">{currentErp?.workspaceRoute}</strong>. 
                    This ERP does NOT share operational pages with SACCO, Healthcare, or Government ERPs.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('universal-runtime')}
                    className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" /> Launch 190+ Module Universal Runtime
                  </button>
                  <button
                    onClick={() => setActiveTab('modules')}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition border border-slate-700 cursor-pointer flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-blue-400" /> Manage {currentErp?.activeModules.length} Modules
                  </button>
                  <button
                    onClick={() => setActiveTab('config')}
                    className="px-4 py-2.5 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer flex items-center gap-2"
                  >
                    <Sliders className="w-4 h-4" /> Workspace Configuration
                  </button>
                </div>
              </div>

              {/* Sub-Navigation specific to this ERP (v24.0 Sec 6 Icon Nav) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
                {[
                  { id: 'academic', label: '🏫 Academic SIS & Core', activeFor: ['erp-edu-univ'] },
                  { id: 'exams', label: '📝 Examination Engine', activeFor: ['erp-edu-univ'] },
                  { id: 'library', label: '📚 Digital Library', activeFor: ['erp-edu-univ'] },
                  { id: 'research', label: '🔬 Research Center', activeFor: ['erp-edu-univ'] },
                  { id: 'sacco-core', label: '🏦 Savings & Loans Core', activeFor: ['erp-fin-coop'] },
                  { id: 'credit', label: '⚖ AI Credit Scoring', activeFor: ['erp-fin-coop'] },
                  { id: 'ehr', label: '🏥 Patient EHR & Appointments', activeFor: ['erp-health-gen'] },
                  { id: 'pharmacy', label: '💊 Clinical Pharmacy', activeFor: ['erp-health-gen'] },
                  { id: 'finance', label: '💰 FAAP Accounting ($0.00)', activeFor: ['erp-edu-univ', 'erp-fin-coop', 'erp-health-gen'] },
                  { id: 'ai-layer', label: '🤖 JUMO Assistant', activeFor: ['erp-edu-univ', 'erp-fin-coop', 'erp-health-gen'] },
                ].filter(tab => tab.activeFor.includes(activeErpId)).map((sub) => {
                  const isSelected = activeWorkspaceSubTab === sub.id || (activeWorkspaceSubTab === 'academic' && !sub.activeFor.includes('erp-edu-univ'));
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setActiveWorkspaceSubTab(sub.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                        activeWorkspaceSubTab === sub.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>

              {/* Simulated Live Operational Screen (Full Workspace width, No sidebar) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {activeErpId === 'erp-edu-univ' && 'Student Information System (SIS) — Academic Year 2026/2027'}
                      {activeErpId === 'erp-fin-coop' && 'Cooperative Savings & Loan Portfolio — National Clearing'}
                      {activeErpId === 'erp-health-gen' && 'Outpatient EHR & Clinical Diagnostic Tracking — General Ward'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Real-time sovereign data partition. Zero-Trust RBAC enforced for tenant <span className="font-mono text-[#0078D4] font-bold">{currentErp?.id}</span>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300">
                      FAAP Parity: $0.00 Balanced
                    </span>
                  </div>
                </div>

                {/* Simulated Table Data */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Record ID / Reference</th>
                        <th className="p-3.5">Primary Entity / Subject</th>
                        <th className="p-3.5">Department / Category</th>
                        <th className="p-3.5">Ledger Settlement</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {activeErpId === 'erp-edu-univ' && (
                        <>
                          <tr>
                            <td className="p-3.5 font-mono font-bold text-[#0078D4]">EASU/2026/001</td>
                            <td className="p-3.5 font-extrabold text-slate-900">Dr. Julius Moses Okwii</td>
                            <td className="p-3.5">Faculty of Computing & IT</td>
                            <td className="p-3.5 font-mono text-emerald-600 font-bold">$0.00 (Cleared)</td>
                            <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Enrolled</span></td>
                            <td className="p-3.5 text-right"><button className="text-[#0078D4] hover:underline font-bold">Open Record</button></td>
                          </tr>
                          <tr>
                            <td className="p-3.5 font-mono font-bold text-[#0078D4]">EASU/2026/042</td>
                            <td className="p-3.5 font-extrabold text-slate-900">Grace Nakato Mukasa</td>
                            <td className="p-3.5">Faculty of Law & Jurisprudence</td>
                            <td className="p-3.5 font-mono text-emerald-600 font-bold">$0.00 (Cleared)</td>
                            <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Enrolled</span></td>
                            <td className="p-3.5 text-right"><button className="text-[#0078D4] hover:underline font-bold">Open Record</button></td>
                          </tr>
                          <tr>
                            <td className="p-3.5 font-mono font-bold text-[#0078D4]">EASU/2026/118</td>
                            <td className="p-3.5 font-extrabold text-slate-900">Samuel Ochieng Otieno</td>
                            <td className="p-3.5">School of Medicine & Surgery</td>
                            <td className="p-3.5 font-mono text-amber-600 font-bold">$450.00 (Installment 2)</td>
                            <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">Pending Clearing</span></td>
                            <td className="p-3.5 text-right"><button className="text-[#0078D4] hover:underline font-bold">Open Record</button></td>
                          </tr>
                        </>
                      )}

                      {activeErpId === 'erp-fin-coop' && (
                        <>
                          <tr>
                            <td className="p-3.5 font-mono font-bold text-[#0078D4]">SACCO/DEP/8821</td>
                            <td className="p-3.5 font-extrabold text-slate-900">East African Teachers Savings Group</td>
                            <td className="p-3.5">Fixed Term Deposit</td>
                            <td className="p-3.5 font-mono text-emerald-600 font-bold">+UGX 145,000,000</td>
                            <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Active Float</span></td>
                            <td className="p-3.5 text-right"><button className="text-[#0078D4] hover:underline font-bold">Audit Ledger</button></td>
                          </tr>
                          <tr>
                            <td className="p-3.5 font-mono font-bold text-[#0078D4]">SACCO/LOAN/1049</td>
                            <td className="p-3.5 font-extrabold text-slate-900">Julius Moses Okwii (Member #01)</td>
                            <td className="p-3.5">Commercial Amortized Loan</td>
                            <td className="p-3.5 font-mono text-blue-600 font-bold">-UGX 25,000,000 (Scored 98%)</td>
                            <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">Disbursed</span></td>
                            <td className="p-3.5 text-right"><button className="text-[#0078D4] hover:underline font-bold">Audit Ledger</button></td>
                          </tr>
                        </>
                      )}

                      {activeErpId === 'erp-health-gen' && (
                        <>
                          <tr>
                            <td className="p-3.5 font-mono font-bold text-[#0078D4]">EHR/PAT/5012</td>
                            <td className="p-3.5 font-extrabold text-slate-900">David Kipketer Komen</td>
                            <td className="p-3.5">Cardiology Ward (Bed 14-B)</td>
                            <td className="p-3.5 font-mono text-emerald-600 font-bold">Insurance Covered ($0.00)</td>
                            <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Stable / Admitted</span></td>
                            <td className="p-3.5 text-right"><button className="text-[#0078D4] hover:underline font-bold">View EHR Scan</button></td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTALLATION ENGINE & MARKETPLACE (v24.0 Sec 1) */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    Roadmap v24.0 Installation Engine
                  </span>
                  <h2 className="text-2xl font-black mt-1">11 Sovereign ERP Industry Families</h2>
                  <p className="text-xs text-slate-300">Select any template to launch the 3-step Installation Wizard and provision an independent workspace.</p>
                </div>
                <button
                  onClick={() => {
                    setWizardOpen(true);
                    setWizardStep(1);
                  }}
                  className="px-5 py-2.5 bg-[#0078D4] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Launch Installation Wizard
                </button>
              </div>

              {/* Grid of ERP Families */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'University & Higher Ed ERP', edition: 'Public University Edition v14.4.0', fam: 'Education ERP Family', desc: 'Complete academic SIS, digital exam grading, research grants, and library archives with FAAP fee clearing.', icon: GraduationCap, active: true },
                  { name: 'Cooperative & SACCO ERP', edition: 'National SACCO Edition v12.1.0', fam: 'Finance & Cooperative', desc: 'Member deposit accounts, AI credit loan scoring, dividend calculations, and agency banking float.', icon: DollarSign, active: true },
                  { name: 'General Hospital & Clinic ERP', edition: 'Hospital Edition v11.0.0', fam: 'Healthcare ERP Family', desc: 'Electronic patient records (EHR), outpatient triage, clinical pharmacy dispensing, and ward beds.', icon: HeartPulse, active: true },
                  { name: 'National Ministry & Municipal ERP', edition: 'Government Edition v10.2.0', fam: 'Government ERP Family', desc: 'Sovereign citizen registries, permit licensing, treasury IFMIS, and procurement tenders.', icon: Landmark, active: false },
                  { name: 'Traditional Kingdom & Cultural ERP', edition: 'Heritage Edition v9.5.0', fam: 'Cultural & Community', desc: 'Genealogical lineage preservation, heritage artifact archives, and royal leadership governance.', icon: Church, active: false },
                  { name: 'Commercial Plantation & Agri ERP', edition: 'Agribusiness Edition v8.8.0', fam: 'Agriculture ERP Family', desc: 'Farmer cooperative directories, crop harvest tracking, fertilizer inventory, and auction logistics.', icon: Sprout, active: false },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#0078D4] transition flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-xl bg-blue-50 text-[#0078D4]">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                            {item.fam}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900">{item.name}</h3>
                          <div className="text-xs font-mono text-[#0078D4] font-semibold mt-0.5">{item.edition}</div>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        {item.active ? (
                          <button
                            onClick={() => {
                              if (item.name.includes('University')) setActiveErpId('erp-edu-univ');
                              else if (item.name.includes('SACCO')) setActiveErpId('erp-fin-coop');
                              else setActiveErpId('erp-health-gen');
                              setActiveTab('workspace');
                            }}
                            className="w-full py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-xl transition border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Open Active Workspace
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setWizFamily(item.fam);
                              setWizTemplate(item.name);
                              setWizEdition(item.edition);
                              setWizardOpen(true);
                              setWizardStep(1);
                            }}
                            className="w-full py-2 bg-[#0078D4] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5" /> Install & Launch Wizard
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: INSTALLED MODULES & ADDON MARKETPLACE (v24.0 Sec 4 / v25.0 Sec 3) */}
          {activeTab === 'modules' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{currentErp?.templateName} — Module Marketplace</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Manage active runtime modules and install validated enterprise add-ons.</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-blue-50 text-[#0078D4] border border-blue-200">
                    {currentErp?.activeModules.length} Active Modules
                  </span>
                </div>

                {/* Ring-0 Governance Banner */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-900">Sovereign Ring-0 Module Governance Enforced</h4>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      In accordance with JUMO UEOS v28.0 Universal Module Governance, global installation, licensing, enabling, or disabling of modules is strictly restricted to the <strong>Owner Control Center (Ring-0)</strong>. ERP administrators have full authority to configure local tenant workflows and rules for assigned modules.
                    </p>
                  </div>
                </div>

                {/* Active Modules Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Currently Installed & Active Modules</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentErp?.activeModules.map((mod, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-800 truncate" title={mod}>{mod}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            ACTIVE
                          </span>
                          <button
                            onClick={() => alert(`Opening Ring-0 Tenant Configuration for "${mod}". As an ERP Administrator, you have authority to configure local rules, parameters, and workflows for this assigned module.`)}
                            className="px-2 py-1 text-[10px] font-bold bg-white border border-slate-200 hover:bg-[#0078D4] hover:text-white hover:border-[#0078D4] rounded-lg text-slate-700 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                            title="Configure Local Module Rules"
                          >
                            <Sliders className="w-3 h-3" /> Config
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Add-ons Section */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Available Add-on Modules (Ready for 1-Click Installation)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentErp?.availableAddons.map((addon, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0078D4] transition flex flex-col justify-between space-y-3 shadow-2xs">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-slate-900">{addon.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                              {addon.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{addon.description}</p>
                        </div>
                        <button
                          onClick={() => handleInstallAddon(addon.name)}
                          className="w-full py-2 bg-slate-900 hover:bg-[#0078D4] text-white font-bold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" /> Install Module
                        </button>
                      </div>
                    ))}
                    {currentErp?.availableAddons.length === 0 && (
                      <div className="col-span-2 p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs font-medium">
                        All available add-on modules have been installed for this ERP workspace!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONFIGURATION CENTER (v24.0 Sec 5 / v25.0 Sec 4) */}
          {activeTab === 'config' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-black text-slate-900">{currentErp?.templateName} — Configuration Center</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manage organization parameters, Ring-0 RBAC access policies, FAAP billing connections, and AI governance.</p>
                </div>

                <form onSubmit={handleSaveConfig} className="space-y-6 max-w-3xl">
                  {/* General Settings */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider bg-slate-100 p-2 rounded">
                      1. Organization & Campus Parameters
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Organization Legal Name</label>
                        <input
                          type="text"
                          value={configOrgName}
                          onChange={(e) => setConfigOrgName(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0078D4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Currency & Billing Engine</label>
                        <input
                          type="text"
                          value={configCurrency}
                          onChange={(e) => setConfigCurrency(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0078D4]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Registered Campuses / Locations</label>
                      <input
                        type="text"
                        value={configCampuses}
                        onChange={(e) => setConfigCampuses(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0078D4]"
                      />
                    </div>
                  </div>

                  {/* Financial & AI Toggles */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider bg-slate-100 p-2 rounded">
                      2. FAAP Financial Backbone & AI Governance
                    </h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-600" /> FAAP Treasury Clearing Switch (1.5% Settlement)
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Enforce real-time double-entry $0.00 parity across all fee installments and loan disbursements.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setConfigFaapSwitch(!configFaapSwitch)}
                          className="text-2xl text-[#0078D4] cursor-pointer"
                        >
                          {configFaapSwitch ? <ToggleRight className="w-8 h-8 text-emerald-600" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
                        </button>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-600" /> Enable JUMO AI Enterprise Assistant & RAG
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Allow domain AI subagents to query statutory regulations and automate student attendance triage.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setConfigAiEnabled(!configAiEnabled)}
                          className="text-2xl text-[#0078D4] cursor-pointer"
                        >
                          {configAiEnabled ? <ToggleRight className="w-8 h-8 text-[#0078D4]" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#0078D4] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Save Workspace Configuration
                    </button>
                    {configSaved && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4" /> Configuration Synchronized to Ring-0 Kernel!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: JUMO AI ASSISTANT (v24.0 Sec 7 / v25.0 Sec 6 Google AI Style Chat) */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-[#0078D4] flex items-center justify-center font-bold shadow-sm">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm">
                        {currentErp ? `JUMO ${currentErp.templateName.split(' ')[0]} Assistant` : 'JUMO AI Enterprise Assistant'}
                      </div>
                      <div className="text-[10px] text-purple-300 font-mono">
                        Model: Gemini 2.5 Pro Sovereign RAG | Tenant: {currentErp?.id}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                    Online & Grounded
                  </span>
                </div>

                {/* Chat Message History */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                  {aiMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#0078D4] text-white rounded-br-none font-medium'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none font-normal'
                      }`}>
                        <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                  {aiThinking && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono italic p-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0078D4]" />
                      <span>Querying Ring-0 Semantic Memory Index & FAAP Ledger...</span>
                    </div>
                  )}
                </div>

                {/* Chat Input Bar (Google AI Style) */}
                <form onSubmit={handleSendAi} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`Ask ${currentErp?.templateName} Assistant to generate reports, explain regulations, or triage records...`}
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    className="flex-1 p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0078D4] transition"
                  />
                  <button
                    type="submit"
                    disabled={!aiInput.trim() || aiThinking}
                    className="px-5 py-3 bg-[#0078D4] hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer flex items-center gap-2"
                  >
                    <span>Send Query</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: LIFECYCLE MANAGEMENT & UPGRADES (v24.0 Sec 8 / v25.0 Sec 15) */}
          {activeTab === 'lifecycle' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-black text-slate-900">Universal ERP Lifecycle & Upgrade Engine</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Control version updates, database schema migrations, automated rollback capability, and health monitoring.</p>
                </div>

                <div className="space-y-4">
                  {(Object.values(installedErps) as InstalledErpState[]).map((erp) => {
                    const isUpgrading = upgradingId === erp.id;
                    const hasUpgrade = erp.availableUpgrade !== 'Up to Date';
                    return (
                      <div key={erp.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">{erp.templateName}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                              {erp.edition}
                            </span>
                          </div>
                          <div className="text-xs text-slate-600">
                            Current Installed Version: <strong className="font-mono text-slate-900">{erp.version}</strong>
                          </div>
                          <div className="text-xs font-mono text-slate-500">
                            Sovereign Partition: {erp.workspaceRoute}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {hasUpgrade ? (
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                                Update Available: {erp.availableUpgrade}
                              </span>
                              <button
                                disabled={isUpgrading}
                                onClick={() => handleRunUpgrade(erp.id)}
                                className="px-4 py-2 bg-[#0078D4] hover:bg-blue-600 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                              >
                                {isUpgrading ? (
                                  <>
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                    <span>Migrating Schema...</span>
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Install Update</span>
                                  </>
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> Up to Date
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: 7 UNIVERSAL PLATFORM CENTERS (v25.0 Sec 16) */}
          {activeTab === 'platform-centers' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                    Roadmap v25.0 Section 16 Architecture
                  </span>
                  <h2 className="text-2xl font-black mt-1">7 Authoritative Platform Centers</h2>
                  <p className="text-xs text-slate-300">Every JUMO platform operates as an independent enterprise runtime with its own workspace, identity, and AI layer.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: '1. ERP Platform Center', route: '/erp-center', desc: 'Authoritative entrance for all 11 industry ERP families and 45+ sovereign templates.', icon: Building2, color: 'text-blue-500' },
                  { name: '2. Financial Platform Center', route: '/platform/faap', desc: 'FAAP General Ledger, FINTECH Clearing Switch, DIGITAL PAY Wallets, and Treasury.', icon: DollarSign, color: 'text-emerald-500' },
                  { name: '3. Security Platform Center', route: '/platform/aegis', desc: 'AEGIS Zero-Trust identity, RBAC policies, encryption keys, and intrusion telemetry.', icon: ShieldAlert, color: 'text-rose-500' },
                  { name: '4. Cloud Platform Center', route: '/platform/cloud', desc: 'Hybrid multi-cloud compute, Kubernetes container orchestration, and disaster recovery.', icon: Cloud, color: 'text-sky-500' },
                  { name: '5. AI Platform Center', route: '/platform/ai', desc: 'Sovereign AI model router, vector memory indices, and multi-agent swarm routines.', icon: CpuIcon, color: 'text-purple-500' },
                  { name: '6. Factory Platform Center', route: '/erp-factory', desc: 'ERP template studio, web/mobile app builders, and CI/CD deployment pipelines.', icon: Factory, color: 'text-amber-500' },
                  { name: '7. Innovation Platform Center', route: '/platform/research', desc: 'Digital twins, enterprise simulation labs, and experimental research repositories.', icon: Microscope, color: 'text-teal-500' },
                ].map((ctr, idx) => {
                  const Icon = ctr.icon;
                  return (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#0078D4] transition flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-slate-50 w-fit border border-slate-200">
                          <Icon className={`w-6 h-6 ${ctr.color}`} />
                        </div>
                        <h3 className="font-black text-base text-slate-900">{ctr.name}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{ctr.desc}</p>
                      </div>
                      <button
                        onClick={() => handleLaunchRoute(ctr.route)}
                        className="w-full py-2.5 bg-slate-900 hover:bg-[#0078D4] text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                      >
                        <span>Launch Platform Center</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 8: UNIVERSAL RUNTIME v27.0 (190+ MODULES) */}
          {activeTab === 'universal-runtime' && (
            <div className="h-full -m-6 md:-m-8 animate-in fade-in duration-300">
              <UniversalModuleWorkspaceRuntime
                erpId={currentErp?.id || 'erp-edu-univ'}
                erpName={currentErp?.templateName || 'University ERP Platform'}
                currentUser={currentUser}
                onNavigate={(route) => {
                  if (route === '/workspace/home') setActiveTab('workspace');
                  else if (onNavigate) onNavigate(route);
                }}
                onLogout={onLogout}
              />
            </div>
          )}
        </main>
      </div>

      {/* 3. ERP INSTALLATION WIZARD MODAL (v24.0 Section 1: Template & Module Selection -> Provisioning) */}
      {wizardOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Wizard Header */}
            <div className="bg-slate-950 text-white p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0078D4] flex items-center justify-center font-bold">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">ERP Installation Wizard (v24.0)</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Step {wizardStep} of 3 — Provisioning Independent Sovereign Workspace</p>
                </div>
              </div>
              <button
                disabled={isProvisioning}
                onClick={() => setWizardOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1: Template & Edition Selection */}
            {wizardStep === 1 && (
              <div className="p-6 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-black text-slate-900">Step 1: Select ERP Template & Sovereign Edition</h4>
                  <p className="text-xs text-slate-600">Choose the industry framework and specific institutional edition to provision.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ERP Industry Family</label>
                    <select
                      value={wizFamily}
                      onChange={(e) => setWizFamily(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option>Education ERP Family</option>
                      <option>Finance & Cooperative ERP Family</option>
                      <option>Healthcare ERP Family</option>
                      <option>Government & Public Sector ERP Family</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Template</label>
                    <select
                      value={wizTemplate}
                      onChange={(e) => setWizTemplate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option>University ERP v14.4.0</option>
                      <option>College ERP v14.4.0</option>
                      <option>Secondary School ERP v14.4.0</option>
                      <option>Cooperative Enterprise ERP v12.1.0</option>
                      <option>General Hospital ERP v11.0.0</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Select Institutional Edition</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Public University Edition', 'Private University Edition', 'Research University Edition', 'International University Edition', 'Digital University Edition'].map((ed, i) => (
                        <div
                          key={i}
                          onClick={() => setWizEdition(ed)}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                            wizEdition === ed ? 'bg-blue-50 border-[#0078D4] font-bold text-[#0078D4]' : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="text-xs">{ed}</span>
                          {wizEdition === ed && <CheckCircle2 className="w-4 h-4 text-[#0078D4]" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-6 py-3 bg-[#0078D4] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                  >
                    <span>Next: Select Modules</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Module Selection (v24.0 Sec 1 Step 2) */}
            {wizardStep === 2 && (
              <div className="p-6 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-black text-slate-900">Step 2: Toggle Reusable Enterprise Modules</h4>
                  <p className="text-xs text-slate-600">Select active runtime modules across Academic Core, Examination, Research, and AI layers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1">
                  {[
                    'Student Information System (SIS)', 'Admissions', 'Registration', 'Faculties', 'Departments',
                    'Examination Management', 'Digital Exams', 'Question Bank', 'Results Processing',
                    'Research Projects', 'Grants Management', 'Publications', 'Laboratory Management',
                    'LMS', 'Virtual Classroom', 'Online Courses', 'Digital Library',
                    'FAAP Accounting', 'Fees Management', 'Payments', 'Budgeting',
                    'JUMO Education Assistant', 'Student Support AI', 'Research AI', 'Administration AI'
                  ].map((modName, i) => {
                    const isChecked = wizModules.includes(modName);
                    return (
                      <div
                        key={i}
                        onClick={() => handleToggleWizModule(modName)}
                        className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                          isChecked ? 'bg-blue-50/60 border-[#0078D4] font-bold text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <input type="checkbox" checked={isChecked} onChange={() => {}} className="rounded text-[#0078D4]" />
                          <span className="text-xs truncate">{modName}</span>
                        </div>
                        {isChecked && <Check className="w-4 h-4 text-[#0078D4] shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="px-6 py-3 bg-[#0078D4] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                  >
                    <span>Next: Provision Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Provisioning & Launch (v24.0 Sec 2 & Sec 6) */}
            {wizardStep === 3 && (
              <div className="p-8 text-center space-y-6">
                {!isProvisioning ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0078D4] flex items-center justify-center mx-auto border border-blue-200">
                      <Server className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Ready to Provision {wizTemplate}</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      You are about to deploy an independent sovereign workspace for <strong className="text-slate-900">{wizEdition}</strong> with <strong className="text-[#0078D4]">{wizModules.length} active modules</strong> bound to FAAP ledger clearing.
                    </p>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs font-mono text-slate-700 max-w-md mx-auto space-y-1">
                      <div>Target Route: <strong className="text-[#0078D4]">/workspace/education/university</strong></div>
                      <div>Security Layer: <strong className="text-emerald-600">Zero-Trust RBAC Enforced</strong></div>
                      <div>Ledger Parity: <strong className="text-amber-600">FAAP $0.00 Double-Entry</strong></div>
                    </div>
                    <div className="flex justify-center gap-4 pt-4">
                      <button
                        onClick={() => setWizardStep(2)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleStartProvisioning}
                        className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-xl shadow-lg transition cursor-pointer flex items-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Provision & Launch Workspace</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 py-6">
                    <div className="w-16 h-16 rounded-full border-4 border-[#0078D4] border-t-transparent animate-spin mx-auto"></div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black text-slate-900">Provisioning Sovereign Partition... ({provisionProgress}%)</h4>
                      <p className="text-xs text-slate-500 font-mono">
                        {provisionProgress < 40 && 'Initializing Ring-0 Zero-Trust security boundary...'}
                        {provisionProgress >= 40 && provisionProgress < 75 && 'Binding FAAP double-entry treasury clearing switch...'}
                        {provisionProgress >= 75 && 'Mounting JUMO AI Enterprise Assistant & full-screen workspace...'}
                      </p>
                    </div>
                    <div className="w-full max-w-md mx-auto h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-[#0078D4] transition-all duration-300" style={{ width: `${provisionProgress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalErpLifecycleRuntime;
