import React, { useState, useEffect } from 'react';
import { 
  Building2, Activity, Users, ShieldCheck, DollarSign, Layers, Cpu, 
  Globe, Sliders, CheckCircle2, ArrowUpRight, Code, Sparkles, Plus, 
  Search, Trash2, Settings, HelpCircle, X, Clock, ArrowRight, ChevronRight, 
  ChevronDown, Database, BookOpen, HeartPulse, Landmark, ShieldAlert, Wrench, 
  Briefcase, RotateCw, Play, Lock, UserCheck, Server, HardHat, Sprout, Truck, 
  Shield, Smartphone, Laptop, Laptop2, Wifi, WifiOff, RefreshCw, Send, 
  AlertTriangle, FileText, Check, CheckSquare, ClipboardList, Eye, Download, 
  Star, Filter, BarChart3, MessageSquare, Bell, User, Phone, Mail, Home
} from 'lucide-react';
import { 
  DynamicConfigurationRegistry, 
  ModuleLifecycleConfig, 
  ERPDomainConfig 
} from '../../../core/governance/UniversalGovernanceEngine';

interface UniversalHybridMobileFirstWorkspaceProps {
  institutionName?: string;
  selectedFamily?: string;
  onNavigateBack?: () => void;
}

// Form collection interface for simulated offline records
interface OfflineRecord {
  id: string;
  type: 'User Registration' | 'Form Capture' | 'Transaction Record' | 'Document Scan';
  timestamp: string;
  data: Record<string, any>;
  status: 'QUEUED' | 'SYNCED';
  encrypted: boolean;
  compressed: boolean;
}

export const UniversalHybridMobileFirstWorkspace: React.FC<UniversalHybridMobileFirstWorkspaceProps> = ({
  institutionName = 'East African Sovereign University',
  selectedFamily = 'education',
  onNavigateBack
}) => {
  // 1. Core Platform Switcher (Mobile / Web / Desktop)
  const [activeEnvironment, setActiveEnvironment] = useState<'mobile' | 'web' | 'desktop'>('mobile');

  // 2. Active Tab Inside Mobile Simulator
  const [activeMobileTab, setActiveMobileTab] = useState<'home' | 'launcher' | 'approvals' | 'sync' | 'field' | 'docs' | 'chat' | 'profile'>('home');

  // 3. Simulated Connection State
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');
  const [isSyncing, setIsSyncing] = useState(false);
  const [offlineRecords, setOfflineRecords] = useState<OfflineRecord[]>([
    {
      id: 'REC-001',
      type: 'User Registration',
      timestamp: '2026-07-28 10:14:02',
      data: { name: 'Amara Diop', role: 'Student Intake', nationalId: 'KE-84920' },
      status: 'SYNCED',
      encrypted: true,
      compressed: true
    },
    {
      id: 'REC-002',
      type: 'Transaction Record',
      timestamp: '2026-07-28 11:32:15',
      data: { amount: 350, feeCategory: 'Exam Card', account: 'FAAP-Cash' },
      status: 'QUEUED',
      encrypted: true,
      compressed: true
    }
  ]);

  // 4. Form States for Offline Field Operations
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState<'User Registration' | 'Form Capture' | 'Transaction Record'>('User Registration');
  const [fieldNotes, setFieldNotes] = useState('');

  // 5. App Install / Upgrade States
  const [isAppCompiling, setIsAppCompiling] = useState(false);
  const [appVersion, setAppVersion] = useState('v2.1.4-LTS');
  const [installStatus, setInstallStatus] = useState<Record<string, 'Installed' | 'Available' | 'Compiling'>>({
    android: 'Installed',
    ios: 'Available',
    pwa: 'Installed',
    desktop: 'Available'
  });

  // 6. Active Registered Modules from Ring-0 Registry
  const [registeredModules, setRegisteredModules] = useState<ModuleLifecycleConfig[]>([]);
  const [erps, setErps] = useState<ERPDomainConfig[]>([]);

  // 7. Sync Logs State
  const [syncLogs, setSyncLogs] = useState<string[]>([
    'SYNC CORE: Initialized JUMO Sync Engine v4.1 with AES-256 local isolation.',
    'SECURITY POLICY: Local storage encrypted. Key stored securely under hardware passkey.',
    'NETWORK: Online state confirmed. Active heartbeat telemetry synchronized with Cloud Node.'
  ]);

  // Load registered modules on mount
  useEffect(() => {
    setRegisteredModules(DynamicConfigurationRegistry.getModules());
    setErps(DynamicConfigurationRegistry.getERPs());
  }, []);

  const addSyncLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setSyncLogs(prev => [`[${time}] ${message}`, ...(Array.isArray(prev) ? prev : []).slice(0, 15)]);
  };

  // Switch connection mode
  const toggleConnection = () => {
    const next = connectionStatus === 'online' ? 'offline' : 'online';
    setConnectionStatus(next);
    addSyncLog(`NETWORK MODE: Switched to [${next.toUpperCase()}] mode.`);
    if (next === 'offline') {
      addSyncLog('OFFLINE CORE: Enabled local SQLite persistent backup cache. Secure storage enforced.');
    } else {
      addSyncLog('ONLINE CORE: Connection restored. Ready to initiate synchronization protocol.');
    }
  };

  // Submit offline field operation
  const handleFieldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldName) return;

    const newRec: OfflineRecord = {
      id: `REC-${Math.floor(100 + Math.random() * 900)}`,
      type: fieldType,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      data: { name: fieldName, notes: fieldNotes, collector: 'Field Officer #102' },
      status: connectionStatus === 'online' ? 'SYNCED' : 'QUEUED',
      encrypted: true,
      compressed: true
    };

    setOfflineRecords(prev => [newRec, ...prev]);
    setFieldName('');
    setFieldNotes('');

    if (connectionStatus === 'online') {
      addSyncLog(`TRANSACTION PUSHED: ${newRec.type} pushed directly to Cloud DB with $0.00 FAAP balance audit.`);
    } else {
      addSyncLog(`OFFLINE STORED: Encrypted record ${newRec.id} (${newRec.type}) stored in local SQLite cache.`);
    }
  };

  // Trigger synchronize engine
  const handleTriggerSync = () => {
    if (connectionStatus === 'offline') {
      addSyncLog('SYNC WARNING: Cannot synchronize while offline. Please restore connection first.');
      return;
    }
    
    setIsSyncing(true);
    addSyncLog('SYNC TRIGGERED: Initializing background synchronization thread...');
    
    setTimeout(() => {
      addSyncLog('SYNC LOG: Encrypting payload with JUMO-trust certificate authority...');
      setTimeout(() => {
        addSyncLog('SYNC LOG: GZIP compressing payload (ratio 4.2x)...');
        setTimeout(() => {
          setOfflineRecords(prev => prev.map(rec => ({ ...rec, status: 'SYNCED' })));
          setIsSyncing(false);
          addSyncLog('SYNC COMPLETE: Synchronized all records. Ledger state verified in balance.');
        }, 800);
      }, 600);
    }, 600);
  };

  // Compile app custom build
  const handleCompileApp = (platform: string) => {
    setInstallStatus(prev => ({ ...prev, [platform]: 'Compiling' }));
    addSyncLog(`INSTALLER CORE: Initiating custom compilation pipeline for ${platform.toUpperCase()} platform...`);
    
    setTimeout(() => {
      setInstallStatus(prev => ({ ...prev, [platform]: 'Installed' }));
      const newVer = `v2.1.5-${platform.toUpperCase()}`;
      setAppVersion(newVer);
      addSyncLog(`INSTALLER COMPLETE: Successfully generated secure bundle for ${platform.toUpperCase()} [${newVer}].`);
    }, 2000);
  };

  // Module Grade Helper
  const getModuleGrade = (modId: string): { level: string; desc: string; color: string; bg: string } => {
    if (['admissions', 'patient_ehr', 'shares_capital'].includes(modId)) {
      return { level: 'Grade 1 — Foundation', desc: 'Basic operational data fields and profiles', color: 'text-blue-700 border-blue-200', bg: 'bg-blue-50' };
    }
    if (['ward_bed', 'loan_underwriting'].includes(modId)) {
      return { level: 'Grade 2 — Professional', desc: 'Adds advanced workflows, approvals and automation', color: 'text-amber-700 border-amber-200', bg: 'bg-amber-50' };
    }
    if (['pharmacy', 'dividend_calculator', 'transport'].includes(modId)) {
      return { level: 'Grade 3 — Enterprise', desc: 'Multi-branch/campus support and core ledger auditing', color: 'text-purple-700 border-purple-200', bg: 'bg-purple-50' };
    }
    return { level: 'Grade 4 — Digital Hybrid', desc: 'Digital twin integration, predictive analytics, decision support', color: 'text-emerald-700 border-emerald-200', bg: 'bg-emerald-50' };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold rounded-full">
            <Smartphone className="w-3.5 h-3.5" /> Mobile-First Architecture Core
          </div>
          <h2 className="text-lg font-black tracking-tight">{institutionName} Mobile Engine</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            JUMO Universal Hybrid Architecture delivers high-fidelity offline field operations, active sync pipelines, and fully customizable institution branding.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto text-xs font-bold font-mono">
          <button 
            onClick={() => setActiveEnvironment('mobile')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${activeEnvironment === 'mobile' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'}`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile App
          </button>
          <button 
            onClick={() => setActiveEnvironment('web')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${activeEnvironment === 'web' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
          >
            <Globe className="w-3.5 h-3.5" /> Web Portal
          </button>
          <button 
            onClick={() => setActiveEnvironment('desktop')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${activeEnvironment === 'desktop' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
          >
            <Laptop className="w-3.5 h-3.5" /> Desktop
          </button>
        </div>
      </div>

      {/* Primary Mobile Experience Workspace */}
      {activeEnvironment === 'mobile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: The Mobile Phone Simulator Viewport (Span 5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[360px] h-[720px] bg-slate-950 rounded-[3rem] border-[10px] border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-50">
                <div className="w-36 h-4 bg-slate-900 rounded-b-xl flex items-center justify-between px-4 text-[9px] text-slate-400 font-mono">
                  <span>9:41</span>
                  <div className="w-2.5 h-2.5 bg-camera rounded-full"></div>
                  <div className="flex items-center gap-1">
                    {connectionStatus === 'online' ? <Wifi className="w-2.5 h-2.5 text-emerald-400" /> : <WifiOff className="w-2.5 h-2.5 text-rose-400" />}
                    <span className="w-3.5 h-2 bg-slate-600 rounded-xs"></span>
                  </div>
                </div>
              </div>

              {/* Main App Content Body */}
              <div className="flex-1 bg-white pt-6 overflow-y-auto flex flex-col justify-between text-slate-900">
                
                {/* Header Section */}
                <div className="bg-slate-900 text-white p-3.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-amber-500 text-slate-950 font-black rounded-lg flex items-center justify-center text-xs">
                      {institutionName[0]}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[11px] leading-tight text-white">{institutionName.split(' ')[0]} Mobile</h4>
                      <p className="text-[8px] text-amber-400 leading-none">Powered by JUMO UEOS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {connectionStatus === 'offline' && (
                      <span className="px-1.5 py-0.5 bg-rose-500/15 text-rose-400 border border-rose-500/20 rounded font-mono text-[8px] font-bold">
                        OFFLINE
                      </span>
                    )}
                    <span className="text-[8px] font-mono font-bold text-slate-400">{appVersion.split('-')[0]}</span>
                  </div>
                </div>

                {/* Simulated Tab Workspaces */}
                <div className="flex-1 p-3.5 space-y-3">
                  {/* TAB 1: HOME */}
                  {activeMobileTab === 'home' && (
                    <div className="space-y-3.5 text-xs animate-in fade-in duration-200">
                      {/* Welcome banner */}
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-slate-900">Welcome, Executive Director</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                        <p className="text-[10px] text-slate-500">ABC University Mobile Portal configured successfully.</p>
                      </div>

                      {/* Stat summary */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-400 text-[10px] block">Ledger Integrity</span>
                          <span className="text-emerald-600 font-extrabold">$0.00 Parity</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-400 text-[10px] block">Offline Queue</span>
                          <span className="text-slate-700 font-extrabold">
                            {offlineRecords.filter(r => r.status === 'QUEUED').length} pending
                          </span>
                        </div>
                      </div>

                      {/* Dynamic launcher grid */}
                      <div className="space-y-1.5">
                        <h5 className="font-extrabold text-[11px] text-slate-400 tracking-wider uppercase block">Quick Actions</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => setActiveMobileTab('field')}
                            className="p-3 bg-white border border-slate-200 hover:border-amber-400 rounded-xl flex flex-col items-center gap-1.5 text-center transition shadow-xs cursor-pointer"
                          >
                            <ClipboardList className="w-5 h-5 text-amber-500" />
                            <span className="font-bold text-[10px] text-slate-800">Field Forms</span>
                          </button>
                          <button 
                            onClick={() => setActiveMobileTab('sync')}
                            className="p-3 bg-white border border-slate-200 hover:border-blue-400 rounded-xl flex flex-col items-center gap-1.5 text-center transition shadow-xs cursor-pointer"
                          >
                            <RefreshCw className="w-5 h-5 text-blue-500" />
                            <span className="font-bold text-[10px] text-slate-800">Sync Engine</span>
                          </button>
                          <button 
                            onClick={() => setActiveMobileTab('approvals')}
                            className="p-3 bg-white border border-slate-200 hover:border-purple-400 rounded-xl flex flex-col items-center gap-1.5 text-center transition shadow-xs cursor-pointer"
                          >
                            <CheckSquare className="w-5 h-5 text-purple-500" />
                            <span className="font-bold text-[10px] text-slate-800">Field Approvals</span>
                          </button>
                          <button 
                            onClick={() => setActiveMobileTab('launcher')}
                            className="p-3 bg-white border border-slate-200 hover:border-slate-800 rounded-xl flex flex-col items-center gap-1.5 text-center transition shadow-xs cursor-pointer"
                          >
                            <Sliders className="w-5 h-5 text-slate-700" />
                            <span className="font-bold text-[10px] text-slate-800">App Launcher</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: APP LAUNCHER */}
                  {activeMobileTab === 'launcher' && (
                    <div className="space-y-3 text-xs animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-black text-slate-900">Mobile Enterprise Launcher</h4>
                        <p className="text-[10px] text-slate-400">Showing modules currently enabled in the Owner Control Center.</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'fin', label: 'Finance Platform', icon: DollarSign, enabled: true },
                          { id: 'hr', label: 'HR & Personnel', icon: Users, enabled: true },
                          { id: 'ops', label: 'Field Operations', icon: HardHat, enabled: true },
                          { id: 'docs', label: 'Doc Management', icon: FileText, enabled: true },
                          { id: 'rep', label: 'Performance Reports', icon: BarChart3, enabled: true },
                          { id: 'chat', label: 'Secure Messaging', icon: MessageSquare, enabled: true },
                          { id: 'ai', label: 'Sovereign Assistant', icon: Sparkles, enabled: true },
                          { id: 'sec', label: 'AEGIS Protection', icon: ShieldCheck, enabled: true }
                        ].map(app => (
                          <div 
                            key={app.id} 
                            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center text-center gap-1 relative overflow-hidden"
                          >
                            <app.icon className="w-5 h-5 text-[#0078D4]" />
                            <span className="font-extrabold text-[9px] text-slate-800 leading-none mt-1">{app.label}</span>
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: APPROVALS */}
                  {activeMobileTab === 'approvals' && (
                    <div className="space-y-3.5 text-xs animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-black text-slate-900">Pending Field Approvals</h4>
                        <p className="text-[10px] text-slate-400">Review and authorize high-priority administrative transactions.</p>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-extrabold text-slate-800 text-[11px] block">Procurement: Hospital Bed Outlay</span>
                              <span className="text-[9px] font-mono text-slate-400">ID: PROC-4091 | Target: Ward B</span>
                            </div>
                            <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-mono font-bold">
                              PENDING
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500">Waiver allocation requested for $3,200. Double-entry balance checked.</p>
                          <div className="flex gap-1.5 pt-1">
                            <button className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded text-[10px] transition cursor-pointer">
                              Approve
                            </button>
                            <button className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 font-bold rounded text-[10px] transition cursor-pointer">
                              Reject
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-extrabold text-slate-800 text-[11px] block">Student Loan: Amortization Waiver</span>
                              <span className="text-[9px] font-mono text-slate-400">ID: SACCO-1029 | Amara Diop</span>
                            </div>
                            <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-mono font-bold">
                              PENDING
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500">Interest rate waiver reduction from 12% to 10% requested.</p>
                          <div className="flex gap-1.5 pt-1">
                            <button className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded text-[10px] transition cursor-pointer">
                              Approve
                            </button>
                            <button className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 font-bold rounded text-[10px] transition cursor-pointer">
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: SYNC ENGINE */}
                  {activeMobileTab === 'sync' && (
                    <div className="space-y-3.5 text-xs animate-in fade-in duration-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-black text-slate-900">JUMO Sync Engine</h4>
                          <p className="text-[10px] text-slate-400">Manage offline data state and cloud consistency checks.</p>
                        </div>
                        <button 
                          onClick={toggleConnection}
                          className={`px-2 py-1 rounded text-[10px] font-extrabold border transition cursor-pointer flex items-center gap-1 ${
                            connectionStatus === 'online' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                          }`}
                        >
                          {connectionStatus === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                          {connectionStatus.toUpperCase()}
                        </button>
                      </div>

                      {/* Stat summary bar */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 block">Encrypted Cache:</span>
                          <span className="font-bold text-slate-800">AES-256 Enabled</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Unsynced Records:</span>
                          <span className="font-bold text-slate-800">
                            {offlineRecords.filter(r => r.status === 'QUEUED').length} items
                          </span>
                        </div>
                      </div>

                      {/* Pending payloads */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          <span>Local Cache Records</span>
                          <span>Status</span>
                        </div>

                        <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                          {offlineRecords.map(rec => (
                            <div key={rec.id} className="p-2 bg-white border border-slate-200 rounded-lg flex items-center justify-between font-mono text-[9px]">
                              <div>
                                <span className="font-bold text-slate-800 block">{rec.type}</span>
                                <span className="text-[8px] text-slate-400">{rec.id} | {rec.timestamp}</span>
                              </div>
                              <span className={`px-1.5 py-0.2 rounded font-bold uppercase border ${
                                rec.status === 'SYNCED' 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}>
                                {rec.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sync button */}
                      <button
                        onClick={handleTriggerSync}
                        disabled={connectionStatus === 'offline' || isSyncing}
                        className={`w-full py-2 rounded-xl text-[11px] font-black tracking-wide cursor-pointer transition flex items-center justify-center gap-1.5 ${
                          connectionStatus === 'offline' 
                            ? 'bg-slate-100 text-slate-400 border border-slate-200' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        }`}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        {isSyncing ? 'Syncing payload...' : 'Synchronize Sync Engine'}
                      </button>
                    </div>
                  )}

                  {/* TAB 5: FIELD OPERATIONS */}
                  {activeMobileTab === 'field' && (
                    <div className="space-y-3.5 text-xs animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-black text-slate-900">Offline Field Operations</h4>
                        <p className="text-[10px] text-slate-400">Register users, record audits, or gather files offline.</p>
                      </div>

                      <form onSubmit={handleFieldSubmit} className="space-y-2.5">
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Record Type</label>
                          <select 
                            value={fieldType} 
                            onChange={(e) => setFieldType(e.target.value as any)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:border-amber-400"
                          >
                            <option value="User Registration">User Registration</option>
                            <option value="Form Capture">Form Capture</option>
                            <option value="Transaction Record">Transaction Record</option>
                          </select>
                        </div>

                        <div className="space-y-0.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Entity Name / Title</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Lusaka Coop Inspection #4"
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-400"
                            required
                          />
                        </div>

                        <div className="space-y-0.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block">Detailed Field Notes</label>
                          <textarea 
                            placeholder="Describe current status, biometric verification, or audit metrics..."
                            value={fieldNotes}
                            onChange={(e) => setFieldNotes(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-[11px] h-14 focus:outline-none focus:border-amber-400 resize-none"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black tracking-wide rounded-xl cursor-pointer transition flex items-center justify-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Save Record (Encrypted)
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 6: DOCUMENTS */}
                  {activeMobileTab === 'docs' && (
                    <div className="space-y-3.5 text-xs animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-black text-slate-900">Mobile Document Hub</h4>
                        <p className="text-[10px] text-slate-400">Capture, verify, and stamp institutional files directly on the field.</p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2 cursor-pointer hover:border-[#0078D4] transition">
                        <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                        <span className="font-bold text-slate-800 text-[11px] block">Capture Document Scan</span>
                        <p className="text-[9px] text-slate-400">Supports direct camera scanning & cryptographic signature injection.</p>
                      </div>

                      <div className="space-y-1.5">
                        <h5 className="font-extrabold text-[10px] text-slate-400 uppercase">Crypt Stamped Files</h5>
                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0078D4]" />
                            <div>
                              <span className="font-bold text-slate-800 block leading-none">Amara_Intake_NationalID.pdf</span>
                              <span className="text-[8px] font-mono text-slate-400">Signed with AEGIS Hardware Key</span>
                            </div>
                          </div>
                          <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-mono text-[8px] font-bold">VERIFIED</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 7: CHAT */}
                  {activeMobileTab === 'chat' && (
                    <div className="space-y-3.5 text-xs animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-black text-slate-900">Secure Messaging Layer</h4>
                        <p className="text-[10px] text-slate-400">Encrypted peer-to-peer workspace chat for field teams.</p>
                      </div>

                      <div className="space-y-2.5 max-h-[170px] overflow-y-auto pr-1">
                        <div className="p-2.5 bg-indigo-50/50 text-slate-800 border border-indigo-100 rounded-xl max-w-[85%] self-start space-y-0.5">
                          <span className="text-[8px] font-bold text-indigo-700 block">JUMO AI Assistant</span>
                          <p className="text-[11px] leading-tight">I have automatically verified the balance parity for the current cohort tuition waiver. You are clear to approve.</p>
                        </div>
                        <div className="p-2.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl max-w-[85%] ml-auto text-right space-y-0.5">
                          <span className="text-[8px] font-bold text-slate-600 block">Field Officer #102</span>
                          <p className="text-[11px] leading-tight">Excellent. Initiating physical biometric verification now.</p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <input 
                          type="text" 
                          placeholder="Type secure team message..."
                          className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-[11px] focus:outline-none"
                        />
                        <button className="p-2 bg-[#0078D4] text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 8: PROFILE */}
                  {activeMobileTab === 'profile' && (
                    <div className="space-y-3.5 text-xs animate-in fade-in duration-200 text-center py-2">
                      <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center border-2 border-[#0078D4]">
                        <User className="w-8 h-8 text-[#0078D4]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-slate-900 text-sm">Amara Diop</h4>
                        <p className="text-[10px] font-mono text-slate-400">Role: Field Registrar | ABC University</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-left text-[11px] font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Device Staged:</span>
                          <span className="font-bold text-slate-800">Passkey Match</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">AEGIS Secure Scope:</span>
                          <span className="font-bold text-slate-800">Tenant Read-Write</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">MFA Validation:</span>
                          <span className="font-bold text-emerald-600">FIDO2 Active</span>
                        </div>
                      </div>

                      <button className="w-full py-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-bold hover:bg-rose-100 transition cursor-pointer text-[10px]">
                        Secure Remote Logout
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Bar */}
                <div className="bg-slate-950 text-white border-t border-slate-900 p-2 grid grid-cols-5 gap-1 text-[9px] font-bold text-center">
                  {[
                    { id: 'home', label: 'Home', icon: Home },
                    { id: 'launcher', label: 'Apps', icon: Sliders },
                    { id: 'field', label: 'Forms', icon: ClipboardList },
                    { id: 'sync', label: 'Sync', icon: RefreshCw },
                    { id: 'profile', label: 'Profile', icon: User }
                  ].map(t => {
                    const Icon = t.icon;
                    const isSelected = activeMobileTab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveMobileTab(t.id as any)}
                        className={`flex flex-col items-center gap-0.5 transition py-1 cursor-pointer rounded-lg ${
                          isSelected ? 'text-amber-400 bg-slate-900' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                        <span className="scale-[0.95]">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Phone Home Bar */}
              <div className="absolute bottom-1 inset-x-0 h-3 flex justify-center z-50">
                <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Desktop Administration, Modules Maturity, Sync Config (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. App Compiling & Distribution Hub */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <Wrench className="w-4.5 h-4.5 text-blue-600" />
                    Mobile App Distribution Hub
                  </h3>
                  <p className="text-[11px] text-slate-400">PWA, Android App, and iOS platform build status.</p>
                </div>
                <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded border">
                  Bundle Target: Universal
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Platform targets */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold text-slate-800 block">Android Package</span>
                        <span className="text-[10px] text-slate-400">Download APK / bundle file</span>
                      </div>
                    </div>
                    {installStatus.android === 'Compiling' ? (
                      <span className="text-[10px] font-mono text-amber-600 font-bold flex items-center gap-1">
                        <RotateCw className="w-3 h-3 animate-spin" /> Compiling
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleCompileApp('android')}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-[10px] rounded cursor-pointer transition"
                      >
                        Install / Sync
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="font-bold text-slate-800 block">iOS Application</span>
                        <span className="text-[10px] text-slate-400">App Store staging bundle</span>
                      </div>
                    </div>
                    {installStatus.ios === 'Compiling' ? (
                      <span className="text-[10px] font-mono text-amber-600 font-bold flex items-center gap-1">
                        <RotateCw className="w-3 h-3 animate-spin" /> Compiling
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleCompileApp('ios')}
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-[#0078D4] border border-blue-200 font-bold text-[10px] rounded cursor-pointer transition"
                      >
                        Compile Staging
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-700" />
                      <div>
                        <span className="font-bold text-slate-800 block">Progressive Web App</span>
                        <span className="text-[10px] text-slate-400">Install to home screen directly</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono text-[9px] font-bold">
                      ACTIVE / PWA
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Laptop2 className="w-4 h-4 text-indigo-600" />
                      <div>
                        <span className="font-bold text-slate-800 block">Desktop Workspace App</span>
                        <span className="text-[10px] text-slate-400">Windows/macOS binary</span>
                      </div>
                    </div>
                    {installStatus.desktop === 'Compiling' ? (
                      <span className="text-[10px] font-mono text-amber-600 font-bold flex items-center gap-1">
                        <RotateCw className="w-3 h-3 animate-spin" /> Compiling
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleCompileApp('desktop')}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-[10px] rounded cursor-pointer transition"
                      >
                        Generate Binary
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. JUMO Sync Engine Live Diagnostics Console */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-1.5">
                    <Database className="w-4.5 h-4.5 text-blue-400" />
                    JUMO Hybrid Sync Engine Console
                  </h3>
                  <p className="text-[11px] text-slate-400">Telemetry logs tracking sqlite payload encryption, compression ratio, and background replication.</p>
                </div>
                <button 
                  onClick={() => setSyncLogs([])}
                  className="text-[10px] text-slate-500 hover:text-white"
                >
                  Clear Logs
                </button>
              </div>

              {/* Terminal screen */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-300 space-y-1.5 h-[160px] overflow-y-auto">
                {syncLogs.length === 0 ? (
                  <span className="text-slate-600">Console silent. Ready for sync trigger.</span>
                ) : (
                  syncLogs.map((log, index) => {
                    let color = 'text-slate-300';
                    if (log.includes('COMPLETE') || log.includes('SYNCED')) color = 'text-emerald-400';
                    if (log.includes('TRIGGERED') || log.includes('COMPILING')) color = 'text-blue-400';
                    if (log.includes('WARNING')) color = 'text-amber-400';
                    return <div key={index} className={color}>{log}</div>;
                  })
                )}
              </div>
            </div>

            {/* 3. Module Maturity Grades Registry */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Star className="w-4.5 h-4.5 text-amber-500" />
                  Universal Module Maturity Grades Registry
                </h3>
                <p className="text-[11px] text-slate-400">Every module inside JUMO UEOS follows strict development metrics: Foundation, Professional, Enterprise, or Hybrid.</p>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {registeredModules.map(mod => {
                  const grade = getModuleGrade(mod.id);
                  return (
                    <div key={mod.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between gap-4 text-xs hover:border-slate-300 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{mod.name}</span>
                          <span className="px-1.5 py-0.2 bg-slate-100 border border-slate-200 rounded text-[8px] font-mono font-bold uppercase">{mod.id}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{grade.desc}</p>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Mobile: READY | Offline: READY | Version: {mod.version}
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded border font-mono text-[9px] font-bold shrink-0 uppercase text-center ${grade.color} ${grade.bg}`}>
                        {grade.level.split(' — ')[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Alternate View: Simulated Web App Interface */}
      {activeEnvironment === 'web' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-center space-y-4 max-w-2xl mx-auto py-12">
          <Globe className="w-12 h-12 text-[#0078D4] mx-auto animate-pulse" />
          <div className="space-y-2">
            <h3 className="font-black text-lg text-slate-900">Web Application Environment Active</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Serving highly responsive, secure browser assets directly over HTTPS. Powered by JUMO UEOS Edge networks with robust routing controls.
            </p>
          </div>
          <div className="pt-2">
            <button 
              onClick={() => setActiveEnvironment('mobile')}
              className="px-4 py-2 bg-[#0078D4] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl transition cursor-pointer"
            >
              Back to Primary Mobile Experience
            </button>
          </div>
        </div>
      )}

      {/* Alternate View: Simulated Desktop Enterprise Workspace */}
      {activeEnvironment === 'desktop' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-center space-y-4 max-w-2xl mx-auto py-12">
          <Laptop2 className="w-12 h-12 text-indigo-600 mx-auto animate-pulse" />
          <div className="space-y-2">
            <h3 className="font-black text-lg text-slate-900">Desktop Enterprise Workspace Connected</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Native binary environment staged with multi-window support, hardware accelerated visual pipelines, and direct file explorer staging.
            </p>
          </div>
          <div className="pt-2">
            <button 
              onClick={() => setActiveEnvironment('mobile')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition cursor-pointer"
            >
              Back to Primary Mobile Experience
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
