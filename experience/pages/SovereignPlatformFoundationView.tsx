/**
 * JUMO UEOS Phase 28 — Sovereign Digital Platform Foundation Command Center
 * Authoritative UI displaying the 7 Independent JUMO Digital Platforms built in strict dependency order.
 * Allows interactive inspection of all 16 mandatory capabilities, deployment orchestration,
 * AI inference, enterprise factory generation, research incubation, and marketplace licensing.
 */

import React, { useState, useEffect } from 'react';
import {
  Shield, Server, Cloud, Cpu, Database, Globe, Sparkles, Layers, Store,
  GraduationCap, CheckCircle2, RefreshCw, Play, Plus, Terminal, ArrowRight,
  Lock, Activity, Box, Radio, Share2, FileText, Settings, Smartphone,
  WifiOff, Wifi, HelpCircle, BarChart3, BookOpen, Key, Users, AlertCircle, Zap,
  DollarSign, Building2, FileSpreadsheet, ShieldCheck, Scale, Eye
} from 'lucide-react';
import { JUMOEnterpriseHeader } from '../../src/components/JUMOEnterpriseHeader';
import { JUMOEnterpriseFooter } from '../../src/components/JUMOEnterpriseFooter';
import {
  PlatformFoundationBootstrap,
  jpsService,
  cloudPlatformService,
  integrationPlatformService,
  aiPlatformService,
  enterpriseFactoryService,
  researchPlatformService,
  marketplacePlatformService,
  digitalPayPlatformService,
  fintechPlatformService,
  faapPlatformService,
  aegisPlatformService,
  jupieService,
  JumoPlatformId,
  JumoPlatformManifest,
  PlatformCapabilityName,
} from '../../core/platform-foundation';

export const SovereignPlatformFoundationView: React.FC<{ onNavigate?: (route: string) => void; initialPlatformId?: JumoPlatformId }> = ({ onNavigate, initialPlatformId }) => {
  const [platforms, setPlatforms] = useState<JumoPlatformManifest[]>([]);
  const [selectedPlatformId, setSelectedPlatformId] = useState<JumoPlatformId>(initialPlatformId || 'jps');
  const [selectedCapability, setSelectedCapability] = useState<PlatformCapabilityName>('Executive Command Center');
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'capabilities' | 'workbench' | 'telemetry'>('workbench');
  const [integrationReport, setIntegrationReport] = useState<any>(null);

  // Workbench interactive state
  const [deployServiceName, setDeployServiceName] = useState('Sovereign-Portal-Node-101');
  const [deployTarget, setDeployTarget] = useState('Google Cloud');
  const [inferencePrompt, setInferencePrompt] = useState('Analyze liquidity risk across East Africa treasury accounts.');
  const [inferenceResult, setInferenceResult] = useState<any>(null);
  const [factorySolName, setFactorySolName] = useState('Diocesan Church & SACCO Financial Grid');
  const [factorySolType, setFactorySolType] = useState<any>('Church');
  const [researchTitle, setResearchTitle] = useState('AI-Assisted Climate Resilience & Agricultural Crop Yield Modeling');
  const [researchCategory, setResearchCategory] = useState<any>('Scientific Research');
  const [payAmount, setPayAmount] = useState('5000');
  const [payChannel, setPayChannel] = useState<'RTGS' | 'M-PESA' | 'SWIFT' | 'EFT'>('RTGS');
  const [fintechLoanAmount, setFintechLoanAmount] = useState('25000');
  const [faapPeriod, setFaapPeriod] = useState('2026-Q1');
  const [aegisEvidenceNote, setAegisEvidenceNote] = useState('Suspicious login attempt on root treasury vault.');

  // Phase 30: JUPIE state variables
  const [jupieAmount, setJupieAmount] = useState('150000');
  const [jupieCurrency, setJupieCurrency] = useState('UGX');
  const [jupieInstitution, setJupieInstitution] = useState('Mulago Referral Hospital');
  const [jupieDomain, setJupieDomain] = useState('Hospital');
  const [jupieDescription, setJupieDescription] = useState('Emergency Department CT Scan & Diagnostic Fee');
  const [jupieMode, setJupieMode] = useState<'Mode A (University Reg Num)' | 'Mode B (JUMO Standard Code)' | 'Option 3 (Hybrid Auto-Switching)'>('Option 3 (Hybrid Auto-Switching)');
  const [jupieUrnInput, setJupieUrnInput] = useState('2026/HD07/19428U');
  const [showWizard, setShowWizard] = useState(false);
  const [wizardInst, setWizardInst] = useState('Makerere University Kampala');
  const [wizardPrefix, setWizardPrefix] = useState('MAK');
  const [wizardDomain, setWizardDomain] = useState('University');

  useEffect(() => {
    PlatformFoundationBootstrap.initialize();
    setPlatforms(PlatformFoundationBootstrap.getAllPlatforms());
    if (initialPlatformId) {
      setSelectedPlatformId(initialPlatformId);
    }
  }, [initialPlatformId]);

  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else if (typeof window !== 'undefined') {
      window.location.href = route;
    }
  };

  const triggerOfflineSync = () => {
    setSyncStatus('Synchronizing CRDT engines across 7 digital platforms...');
    setTimeout(() => {
      const res = jpsService.triggerUniversalOfflineSync();
      setSyncStatus(`Sync Complete: ${res.recordsSynced.toLocaleString()} records synced across Level 5 encrypted store.`);
      setTimeout(() => setSyncStatus(null), 5000);
    }, 800);
  };

  const selectedPlatform = platforms.find((p) => p.id === selectedPlatformId) || platforms[0];
  const capabilityDetails = selectedPlatform?.capabilities?.[selectedCapability];

  // Icon mapper for platforms
  const getPlatformIcon = (id: JumoPlatformId) => {
    switch (id) {
      case 'jps': return Server;
      case 'cloud': return Cloud;
      case 'integration': return Share2;
      case 'ai': return Cpu;
      case 'enterprise-factory': return Layers;
      case 'research': return GraduationCap;
      case 'marketplace': return Store;
      default: return Box;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-black">
      {/* Universal Enterprise Header */}
      <JUMOEnterpriseHeader
        onNavigate={handleNav}
        titleOverride="Sovereign Digital Platform Command Center"
        subtitleOverride="Phase 29 — Government-Grade Hybrid OS Backbone"
        theme={{ bannerActive: true, bannerMessage: 'PHASE 29: 10 INDEPENDENT SOVEREIGN PRODUCTS REGISTERED IN DEPENDENCY ORDER (28.1 → 29.7)' }}
      />

      {/* Main Command Center Content */}
      <div className="max-w-7xl mx-auto w-full p-6 space-y-8 my-4 flex-1">
        
        {/* Executive Overview Banner */}
        <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-blue-950/80 border border-blue-500/40 rounded-2xl p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-[#0078D4] border border-blue-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Phase 29 Sovereign OS
                </span>
                <span className="text-xs font-mono text-blue-700">| Dependency Order: 1 → 10</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Digital Enterprise Operating System
              </h1>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                Transforming the JUMO Digital Enterprise Platform into a government-grade operating backbone composed of 
                <span className="text-[#0078D4] font-semibold"> 10 independent digital platforms</span>. These platforms are products, not modules. Each installs independently while registering authoritatively with the JUMO Product Services Platform (JPS).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => setIntegrationReport(PlatformFoundationBootstrap.verifySovereignPlatformIntegration())}
                className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verify Phase 29.9 Integration
              </button>
              <button
                onClick={triggerOfflineSync}
                className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" /> Trigger Universal Sync
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className="w-full sm:w-auto px-4 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-500/30 text-slate-700 hover:text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Terminal className="w-4 h-4 text-[#0078D4]" /> JPS Telemetry ({jpsService.getTelemetryLogs().length})
              </button>
            </div>
          </div>

          {/* Sync status toast */}
          {syncStatus && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-200 text-emerald-700 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{syncStatus}</span>
            </div>
          )}

          {/* Phase 29.9 Integration Verification Report */}
          {integrationReport && (
            <div className="mt-4 p-4 rounded-xl bg-white/90 border border-purple-500/60 text-xs space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white uppercase font-mono">Phase 29.9 Sovereign Platform Integration Verification Report</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-700 font-bold font-mono text-[10px]">
                    {integrationReport.overallStatus} ({integrationReport.totalPlatformsVerified} Platforms)
                  </span>
                  <button
                    onClick={() => setIntegrationReport(null)}
                    className="text-slate-600 hover:text-white text-xs underline font-sans"
                  >
                    Close Report
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                {integrationReport.checks.map((chk: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/80 border border-slate-200/80 space-y-1 font-mono">
                    <div className="flex items-center justify-between font-bold text-[11px]">
                      <span className="text-[#0078D4] truncate pr-2">{chk.category}</span>
                      <span className="text-emerald-400 font-extrabold">{chk.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-700 font-sans leading-relaxed">{chk.description}</p>
                    <div className="text-[9px] text-emerald-700 pt-1 border-t border-slate-200/60">{chk.details}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key System Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-200/60 font-mono text-xs">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200/50">
              <span className="text-[10px] text-blue-700 block uppercase font-sans font-semibold">Registered Platforms</span>
              <span className="text-xl font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span>7 / 7</span>
                <span className="text-[10px] text-emerald-400 font-sans font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-200">100% PRODUCTS</span>
              </span>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200/50">
              <span className="text-[10px] text-blue-700 block uppercase font-sans font-semibold">JPS Active Tenants</span>
              <span className="text-xl font-bold text-[#0078D4] mt-0.5 block">
                {jpsService.getSystemOverview().activeTenants.toLocaleString()}
              </span>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200/50">
              <span className="text-[10px] text-blue-700 block uppercase font-sans font-semibold">Sovereign Mesh Nodes</span>
              <span className="text-xl font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <span>256 ONLINE</span>
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
              </span>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200/50">
              <span className="text-[10px] text-blue-700 block uppercase font-sans font-semibold">Mandatory Capabilities</span>
              <span className="text-xl font-bold text-purple-300 mt-0.5 block">
                16 / 16 Enforced
              </span>
            </div>
          </div>
        </div>

        {/* The 7 Independent Digital Platforms (Dependency Order Selector) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-blue-700 uppercase tracking-wider font-bold">1. Select Sovereign Digital Platform (Built in Strict Dependency Order)</span>
            <span className="text-slate-600 font-sans">Each platform registers authoritatively with JPS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {platforms.map((p) => {
              const Icon = getPlatformIcon(p.id);
              const isSelected = p.id === selectedPlatformId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatformId(p.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-600 to-indigo-800 border-cyan-400 shadow-lg scale-[1.02]'
                      : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-600 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      isSelected ? 'bg-cyan-400 text-slate-900' : 'bg-slate-700 text-[#0078D4]'
                    }`}>
                      #{p.dependencyOrder}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-blue-400 group-hover:text-[#0078D4] transition-colors'}`} />
                  </div>
                  <div>
                    <h3 className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {p.name.replace('JUMO ', '')}
                    </h3>
                    <p className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-600'}`}>
                      {p.code} | {p.version}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> PRODUCT
                    </span>
                    <span className={isSelected ? 'text-blue-700' : 'text-blue-400'}>JPS: OK</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Platform Detail Area */}
        {selectedPlatform && (
          <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Platform Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-[#0078D4] border border-blue-500/30 rounded text-[11px] font-mono font-bold">
                    {selectedPlatform.phase}
                  </span>
                  <span className="text-xs text-slate-600 font-mono">| Version: {selectedPlatform.version}</span>
                </div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>{selectedPlatform.name}</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">
                    ACTIVE PRODUCT
                  </span>
                </h2>
                <p className="text-xs text-slate-700 mt-1 max-w-3xl leading-relaxed">
                  {selectedPlatform.description}
                </p>
              </div>

              <div className="flex bg-white/80 p-1 rounded-xl border border-slate-200 text-xs font-semibold shrink-0">
                <button
                  onClick={() => setActiveTab('workbench')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'workbench' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" /> Sovereign Workbench
                </button>
                <button
                  onClick={() => setActiveTab('capabilities')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'capabilities' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> 16 Quality Standards
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'telemetry' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" /> Telemetry & Audit
                </button>
              </div>
            </div>

            {/* TAB 1: SOVEREIGN WORKBENCH (Platform-Specific Controls) */}
            {activeTab === 'workbench' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#0078D4]" />
                  <span>Interactive Sovereign Runtime: {selectedPlatform.code}</span>
                </h3>

                {/* 28.1 JPS Workbench */}
                {selectedPlatform.id === 'jps' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase font-mono flex items-center gap-1.5">
                        <Server className="w-4 h-4" /> Sovereign Tenant Provisioner & Backbone
                      </h4>
                      <p className="text-xs text-slate-700">
                        Provision new tenant institutions directly on the Ring-0 operating backbone. Automatically configures mesh DNS, identity federation, and usage metering.
                      </p>
                      <div className="space-y-3 pt-2">
                        <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono space-y-1.5">
                          <div className="flex justify-between text-slate-600"><span>Tenant Registry Status:</span> <span className="text-emerald-400 font-bold">100% HEALTHY</span></div>
                          <div className="flex justify-between text-slate-600"><span>Active Institutional Tenants:</span> <span className="text-white font-bold">{jpsService.getSystemOverview().activeTenants}</span></div>
                          <div className="flex justify-between text-slate-600"><span>API Gateway Traffic:</span> <span className="text-[#0078D4] font-bold">18,450 req/sec</span></div>
                        </div>
                        <button
                          onClick={() => {
                            const res = jpsService.provisionTenant('New Institutional Node SACCO', 'newnode.sacco.jumo', 'admin@newnode.sacco');
                            alert(`Provisioned Tenant ID: ${res.tenantId}\nMesh Gateway: ${res.assignedMeshGateway}`);
                          }}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs transition-colors shadow"
                        >
                          + Provision Test Tenant Node
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Registered JUMO Products Grid
                      </h4>
                      <p className="text-xs text-slate-700">
                        Every other JUMO Platform registers with JPS to obtain their Ring-0 sovereign identity and service mesh token.
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {platforms.map((p) => (
                          <div key={p.id} className="flex items-center justify-between p-2 rounded bg-white/80 border border-slate-200/60 text-xs font-mono">
                            <span className="text-white font-bold">{p.code}</span>
                            <span className="text-slate-700">{p.name}</span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 text-[10px]">REGISTERED</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 28.2 Cloud Platform Workbench */}
                {selectedPlatform.id === 'cloud' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4">
                        <h4 className="text-xs font-bold text-[#0078D4] uppercase font-mono flex items-center gap-1.5">
                          <Cloud className="w-4 h-4" /> Centralized Deployment Orchestration (Not Static Hosting)
                        </h4>
                        <p className="text-xs text-slate-700">
                          Orchestrates deployments across multi-cloud environments. The objective is centralized deployment orchestration, not replacing underlying infrastructure providers.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                          {cloudPlatformService.getOrchestrationTargets().map((t) => (
                            <div key={t.provider} className="p-3 rounded-lg bg-white border border-slate-200/80 text-center font-mono space-y-1">
                              <span className="text-xs font-bold text-white block">{t.provider}</span>
                              <span className="text-[10px] text-emerald-400 block font-semibold">{t.status}</span>
                              <span className="text-[9px] text-slate-600 block">{t.activePipelines} pipelines active</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4">
                        <h4 className="text-xs font-bold text-blue-700 uppercase font-mono flex items-center gap-1.5">
                          <Play className="w-4 h-4" /> Deployment Factory Action
                        </h4>
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="text-[10px] text-slate-600 block font-mono mb-1">Service / Portal Name</label>
                            <input
                              type="text"
                              value={deployServiceName}
                              onChange={(e) => setDeployServiceName(e.target.value)}
                              className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-600 block font-mono mb-1">Target Orchestration Provider</label>
                            <select
                              value={deployTarget}
                              onChange={(e) => setDeployTarget(e.target.value)}
                              className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white font-mono"
                            >
                              <option value="Google Cloud">Google Cloud (Sovereign Run)</option>
                              <option value="GitHub">GitHub (GitOps Pipeline)</option>
                              <option value="Kubernetes">Kubernetes (Ring-0 Cluster)</option>
                              <option value="Docker">Docker (Isolated Sandbox)</option>
                              <option value="Termux">Termux (Mobile Dev Node)</option>
                            </select>
                          </div>
                          <button
                            onClick={() => {
                              const res = cloudPlatformService.deployService(deployServiceName, deployTarget, 'Production');
                              alert(`Deployed Service: ${res.serviceName}\nTarget: ${res.targetProvider}\nURL: ${res.url}`);
                            }}
                            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow"
                          >
                            Execute Orchestrated Deployment
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase font-mono">
                        Multi-Modal Hosting & Operations Center Status (13 Standard Modes)
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                        {cloudPlatformService.getHostingServices().map((hs) => (
                          <div key={hs.type} className="p-2.5 rounded bg-white/90 border border-slate-200/70 text-xs font-mono">
                            <span className="text-slate-200 font-bold block truncate">{hs.type}</span>
                            <span className="text-[#0078D4] text-[11px] block mt-1">{hs.instancesActive} active nodes</span>
                            <span className="text-[9px] text-emerald-400 font-bold block">{hs.health}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 28.3 Integration Platform Workbench */}
                {selectedPlatform.id === 'integration' && (
                  <div className="space-y-4">
                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-3">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase font-mono flex items-center gap-1.5">
                        <Share2 className="w-4 h-4" /> Sovereign Interoperability Connectors Grid
                      </h4>
                      <p className="text-xs text-slate-700">
                        High-throughput interoperability bridges for REST, GraphQL, event streams, banking (SWIFT/RTGS/M-Pesa), government (KRA/NIRA), and identity federation.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {integrationPlatformService.getConnectors().map((c) => (
                          <div key={c.id} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between gap-4 font-mono">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{c.name}</span>
                                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-700 text-[9px]">{c.category}</span>
                              </div>
                              <span className="text-[10px] text-slate-600 block mt-1">Protocol: <span className="text-[#0078D4]">{c.protocol}</span> | Throughput: <span className="text-emerald-400 font-bold">{c.throughputRps} RPS</span></span>
                            </div>
                            <button
                              onClick={() => {
                                const res = integrationPlatformService.testConnection(c.id);
                                alert(`Verified Connector: ${c.name}\nStatus: ${res.status}\nLatency: ${res.latencyMs}ms`);
                              }}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors shrink-0"
                            >
                              Test Bridge
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 28.4 AI Platform Workbench */}
                {selectedPlatform.id === 'ai' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase font-mono flex items-center gap-1.5">
                        <Cpu className="w-4 h-4" /> Supported AI Providers & Model Abstraction Layer
                      </h4>
                      <p className="text-xs text-slate-700">
                        Allows organizations to configure supported AI providers and models through a unified abstraction layer with Ring-0 sovereign guardrails.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {aiPlatformService.getModels().map((m) => (
                          <div key={m.modelId} className="p-3 rounded-xl bg-white border border-slate-200 font-mono space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-white">{m.displayName}</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 text-[9px]">{m.status}</span>
                            </div>
                            <span className="text-[10px] text-[#0078D4] block">Provider: {m.provider} ({m.type})</span>
                            <span className="text-[9px] text-slate-600 block">Context: {m.contextWindow} | Cost: {m.costPerMToken}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4">
                      <h4 className="text-xs font-bold text-purple-300 uppercase font-mono flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> JUMO AI Innovation Lab
                      </h4>
                      <div className="space-y-3 text-xs font-mono">
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Select Autonomous Agent</label>
                          <select
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                            id="agentSelector"
                          >
                            {aiPlatformService.getAgents().map((a) => (
                              <option key={a.agentId} value={a.agentId}>{a.name} ({a.category})</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Prompt / Inquiry</label>
                          <textarea
                            value={inferencePrompt}
                            onChange={(e) => setInferencePrompt(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white font-sans text-xs"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const selector = document.getElementById('agentSelector') as HTMLSelectElement;
                            const res = aiPlatformService.executeInference(selector.value, inferencePrompt);
                            setInferenceResult(res);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow"
                        >
                          Execute Sovereign Inference
                        </button>

                        {inferenceResult && (
                          <div className="p-3 rounded bg-white border border-purple-500/40 text-[11px] text-slate-200 space-y-1 mt-2">
                            <div className="text-[#0078D4] font-bold">Inference ID: {inferenceResult.inferenceId}</div>
                            <div>{inferenceResult.result}</div>
                            <div className="text-[10px] text-slate-600">Tokens used: {inferenceResult.tokensConsumed} | Model: {inferenceResult.modelUsed}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 29.2 Digital Pay Platform Workbench */}
                {selectedPlatform.id === 'digital-pay' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" /> Master Treasury 6-Stage Routing Audit Trail
                      </h4>
                      <p className="text-xs text-slate-700 font-sans">
                        All payments automatically execute mandatory 6-stage routing: JUMO Digital Pay → Master Treasury → Platform Fee → Tenant Revenue → Tax Reserve → Settlement.
                      </p>
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {digitalPayPlatformService.getTransactions().map((tx) => {
                          const latestStage = tx.treasuryRoute?.[tx.treasuryRoute.length - 1]?.stage || 'Settlement';
                          return (
                            <div key={tx.txId} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                              <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-white">{tx.paymentCode || tx.txId}</span>
                                <span className="text-emerald-400">{tx.currency} {tx.amount.toLocaleString()}</span>
                              </div>
                              <div className="text-[10px] text-[#0078D4]">URN: {tx.urn || 'N/A'} | Method: {tx.method} ({tx.provider})</div>
                              <div className="text-[9px] text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200">
                                <span>Tenant: {tx.tenantId} | Class: {tx.classification || 'Standard'}</span>
                                <span className="text-emerald-700 font-bold">{tx.status} ({latestStage})</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Route Sovereign Payment
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Amount (USD/KES)</label>
                          <input
                            type="number"
                            value={payAmount}
                            onChange={(e) => setPayAmount(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Payment Channel</label>
                          <select
                            value={payChannel}
                            onChange={(e: any) => setPayChannel(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          >
                            <option value="RTGS">RTGS Central Bank Settlement</option>
                            <option value="M-PESA">M-PESA Paybill / Till</option>
                            <option value="SWIFT">SWIFT International Wire</option>
                            <option value="EFT">EFT Bank Transfer</option>
                          </select>
                        </div>
                        <button
                          onClick={() => {
                            const method = payChannel === 'M-PESA' ? 'Mobile Money' : payChannel === 'SWIFT' ? 'SWIFT' : 'RTGS';
                            const provider = payChannel === 'M-PESA' ? 'M-Pesa' : payChannel === 'SWIFT' ? 'SWIFT Gateway' : 'Sovereign RTGS';
                            const tx = digitalPayPlatformService.processPayment(Number(payAmount) || 1000, 'USD', method as any, provider as any, 'merch_kampala_hospital_01', 't_gov_kenya', 'Sovereign tax settlement');
                            setPlatforms([...PlatformFoundationBootstrap.getAllPlatforms()]);
                            alert(`Payment Processed via 6-Stage Routing!\nPayment Code: ${tx.paymentCode}\nURN: ${tx.urn}\nTx ID: ${tx.txId}\nStatus: ${tx.status}`);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-lg font-bold transition-all shadow"
                        >
                          Execute 6-Stage Payment Route
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 29.3 FINTECH Platform Workbench */}
                {selectedPlatform.id === 'fintech' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" /> Sovereign Banking, Wallets & Commercial Lending Core
                      </h4>
                      <p className="text-xs text-slate-700 font-sans">
                        Authoritative financial switch managing Core Banking Products, Multi-Currency Wallets, SACCO Lending Origination, and Central Treasury accounts.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                        {fintechPlatformService.getBankingProducts().map((prod) => (
                          <div key={prod.productId} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                            <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-white">{prod.productId}</span>
                              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px]">{prod.type}</span>
                            </div>
                            <div className="text-[10px] text-slate-700">Balance: {prod.currency} {prod.balance.toLocaleString()} | Rate: {prod.interestRate || '0'}%</div>
                            <div className="text-[9px] text-emerald-400 font-bold pt-1 border-t border-slate-200">KYC/AML: {prod.kycAmlStatus}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Originate Sovereign Loan
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Loan Principal Amount ($)</label>
                          <input
                            type="number"
                            value={fintechLoanAmount}
                            onChange={(e) => setFintechLoanAmount(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const loan = fintechPlatformService.originateLoan('Starlight Farmers SACCO', 'Institutional', Number(fintechLoanAmount) || 50000);
                            setPlatforms([...PlatformFoundationBootstrap.getAllPlatforms()]);
                            alert(`Loan Originated successfully!\nID: ${loan.loanId}\nPrincipal: USD ${loan.principalUsd.toLocaleString()}\nAPR: ${loan.interestRateApr}%\nStatus: ${loan.status}`);
                          }}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-all shadow"
                        >
                          Originate Commercial Loan
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 29.4 FAAP Platform Workbench */}
                {selectedPlatform.id === 'faap' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase flex items-center gap-1.5">
                        <FileSpreadsheet className="w-4 h-4" /> 18 Core Accounting & Financial Management Modules
                      </h4>
                      <p className="text-xs text-slate-700 font-sans">
                        Authoritative general ledger, budgeting, procurement, payroll, taxation, and multi-currency accounting engine compliant with IFRS 15, IFRS 9, IFRS 16, and IPSAS.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                        {faapPlatformService.getModules().map((mod) => (
                          <div key={mod.moduleCode} className="p-2.5 rounded bg-white border border-slate-200 flex justify-between items-center text-xs">
                            <div>
                              <span className="text-white font-bold block">{mod.name} (<span className="text-[#0078D4]">{mod.moduleCode}</span>)</span>
                              <span className="text-[9px] text-slate-600">Vol: ${mod.monthlyVolumeUsd.toLocaleString()}/mo</span>
                            </div>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 text-[9px] font-bold">{mod.ifrsReady ? 'IFRS READY' : 'ACTIVE'}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> IFRS / IPSAS Compliance Verification
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Fiscal Reporting Period</label>
                          <input
                            type="text"
                            value={faapPeriod}
                            onChange={(e) => setFaapPeriod(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const rep = faapPlatformService.generateReport(`Sovereign Fiscal Compliance Statement - ${faapPeriod}`, 'IFRS', 'PDF (Enterprise Document)');
                            setPlatforms([...PlatformFoundationBootstrap.getAllPlatforms()]);
                            alert(`Compliance Statement Generated!\nReport ID: ${rep.reportId}\nStandard: ${rep.standard}\nFormat: ${rep.format}\nStatus: ${rep.status}`);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow"
                        >
                          Generate IFRS Compliance Seal
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 29.5 AEGIS Platform Workbench */}
                {selectedPlatform.id === 'aegis' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Financial, Administrative & Physical CCTV Surveillance Grid
                      </h4>
                      <p className="text-xs text-slate-700 font-sans">
                        Sovereign security monitoring across every operational dimension. Enforces continuous anti-corruption guardrails and cryptographic audit sealing.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        {aegisPlatformService.getCctvStreams().map((feed) => (
                          <div key={feed.streamId} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                            <span className="text-xs font-bold text-white block truncate">{feed.streamId}</span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 text-[9px] block w-fit">{feed.type}</span>
                            <span className="text-[10px] text-slate-700 block pt-1">{feed.domainMonitored}</span>
                            <span className="text-[9px] text-[#0078D4] font-bold block">{feed.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                        <Lock className="w-4 h-4" /> Seal Forensic Evidence
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Evidence Summary Note</label>
                          <textarea
                            value={aegisEvidenceNote}
                            onChange={(e) => setAegisEvidenceNote(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white font-sans text-xs"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const proof = aegisPlatformService.sealEvidencePackage(aegisEvidenceNote || 'W-10 Forensic Surveillance Audit Note', 'Evidence Packages');
                            setPlatforms([...PlatformFoundationBootstrap.getAllPlatforms()]);
                            alert(`Evidence Cryptographically Sealed!\nPackage ID: ${proof.packageId}\nTitle: ${proof.title}\nHash: ${proof.immutableAuditHash}\nStatus: ${proof.status}`);
                          }}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-all shadow"
                        >
                          Seal W-10 Forensic Evidence
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 28.5 Enterprise Factory Workbench */}
                {selectedPlatform.id === 'enterprise-factory' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase font-mono flex items-center gap-1.5">
                        <Layers className="w-4 h-4" /> Manufactured Enterprise Solutions Grid (100% Inheritance)
                      </h4>
                      <p className="text-xs text-slate-700">
                        Every generated solution automatically inherits Identity, Workflow, FAAP, FINTECH, AEGIS, AI, Cloud, and Integration capabilities from the foundation.
                      </p>
                      <div className="space-y-2.5 pt-2 max-h-64 overflow-y-auto pr-1">
                        {enterpriseFactoryService.getGeneratedSolutions().map((sol) => (
                          <div key={sol.solutionId} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-4 font-mono">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{sol.name}</span>
                                <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-[#0078D4] text-[9px] font-bold">{sol.domainType}</span>
                              </div>
                              <span className="text-[10px] text-emerald-400 block mt-1">Inherits: {sol.inheritedCapabilities.join(' • ')}</span>
                            </div>
                            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-200 text-[10px] font-bold shrink-0">
                              {sol.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Manufacture Enterprise Solution
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Solution / Institution Name</label>
                          <input
                            type="text"
                            value={factorySolName}
                            onChange={(e) => setFactorySolName(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Domain Type Blueprint</label>
                          <select
                            value={factorySolType}
                            onChange={(e) => setFactorySolType(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          >
                            <option value="ERP">ERP System</option>
                            <option value="ERP Suite">Domain-Specific ERP Suite</option>
                            <option value="Platform">Independent Digital Platform</option>
                            <option value="Custom Assembly">Custom Application Assembly</option>
                            <option value="Government">Government System</option>
                            <option value="University">University Campus System</option>
                            <option value="Hospital">Hospital / EHR System</option>
                            <option value="NGO">NGO Humanitarian System</option>
                            <option value="Church">Diocesan Church System</option>
                            <option value="SACCO">SACCO & Microfinance System</option>
                            <option value="Mobile App">Mobile Application (APK/PWA)</option>
                            <option value="Public Portal">Public Citizen Portal</option>
                            <option value="API">Sovereign API Service</option>
                          </select>
                        </div>
                        <button
                          onClick={() => {
                            const sol = enterpriseFactoryService.generateSolution(factorySolName, factorySolType, 't_custom_node');
                            setPlatforms([...PlatformFoundationBootstrap.getAllPlatforms()]);
                            alert(`Manufactured Solution: ${sol.name}\nID: ${sol.solutionId}\nInherits 100% of Foundation Capabilities!`);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-lg font-bold transition-all shadow"
                        >
                          Generate Solution Blueprint
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-3 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-purple-300 uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Phase 29.7 Sovereign Assembly Line: Multi-Tenant Deployments & Digital Certifications
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-[#0078D4] block">Multi-Tenant Deployments (Cloud, On-Premise, Hybrid, Enclaves)</span>
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {enterpriseFactoryService.getDeployments().map((d) => (
                              <div key={d.deploymentId} className="p-2.5 rounded bg-white border border-slate-200 text-[10px] space-y-0.5">
                                <div className="flex justify-between font-bold text-white">
                                  <span>{d.targetEnvironment} Mode</span>
                                  <span className="text-emerald-400">{d.status}</span>
                                </div>
                                <div className="text-slate-700">{d.datacenterRegion}</div>
                                <div className="text-[9px] text-slate-600">Solution ID: {d.solutionId}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-purple-300 block">Digital Certifications & Version Governance (Ed25519 Keys)</span>
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {enterpriseFactoryService.getCertifications().map((c) => (
                              <div key={c.certId} className="p-2.5 rounded bg-white border border-slate-200 text-[10px] space-y-0.5">
                                <div className="flex justify-between font-bold text-white">
                                  <span>{c.complianceStatus}</span>
                                  <span className="text-[#0078D4]">{c.securityScore}</span>
                                </div>
                                <div className="text-slate-700">By: {c.certifiedBy}</div>
                                <div className="text-[9px] text-emerald-400 font-mono">Sig: {c.cryptographicSignature}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 28.6 Research Platform Workbench */}
                {selectedPlatform.id === 'research' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase font-mono flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" /> National Research & Knowledge Repository
                      </h4>
                      <p className="text-xs text-slate-700">
                        Supports Academic, Scientific, Government, Legal, Technology research and Knowledge Management with AI synthesis and Level 5 cryptographic data isolation.
                      </p>
                      <div className="space-y-2.5 pt-2 max-h-64 overflow-y-auto pr-1">
                        {researchPlatformService.getProjects().map((proj) => (
                          <div key={proj.projectId} className="p-3 rounded-xl bg-white border border-slate-200 font-mono space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-xs font-bold text-white font-sans">{proj.title}</span>
                              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-[#0078D4] text-[9px] shrink-0 font-bold">{proj.category}</span>
                            </div>
                            <div className="text-[10px] text-slate-700">Institution: {proj.institution} | Lead: {proj.leadResearcher}</div>
                            <div className="flex items-center justify-between text-[9px] pt-1 border-t border-slate-200/60 text-slate-600">
                              <span>AI Model: <span className="text-[#0078D4]">{proj.aiModelAssisted}</span></span>
                              <span className="text-emerald-400 font-bold">{proj.dataSovereigntyLevel}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Incubate Research Grant / Study
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Research Project Title</label>
                          <textarea
                            value={researchTitle}
                            onChange={(e) => setResearchTitle(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white font-sans text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Research Domain Category</label>
                          <select
                            value={researchCategory}
                            onChange={(e) => setResearchCategory(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          >
                            <option value="Academic Research">Academic Research (Universities/Journals)</option>
                            <option value="Scientific Research">Scientific Research (Laboratories/Grants)</option>
                            <option value="Government Research">Government Research (Policy/Health/Agri)</option>
                            <option value="Industrial Research">Industrial & Manufacturing Research</option>
                            <option value="Medical Research">Medical & EHR Clinical Trials</option>
                            <option value="Agricultural Research">Agricultural & Climate Modeling</option>
                            <option value="Engineering Research">Engineering & Robotics Research</option>
                            <option value="Legal Research">Legal Research (Case Repos/Legislation)</option>
                            <option value="Policy Governance">Policy & Sovereign Governance</option>
                            <option value="Technology Research">Technology Research (AI/Robotics/Twins)</option>
                            <option value="Knowledge Management">Knowledge Management (Standards/Best Practice)</option>
                          </select>
                        </div>
                        <button
                          onClick={() => {
                            const p = researchPlatformService.createProject(researchTitle, researchCategory, 'National Sovereign Research Lab', 'Dr. J. Okwii');
                            alert(`Incubated Research Project: ${p.title}\nID: ${p.projectId}\nSovereignty Level: ${p.dataSovereigntyLevel}`);
                          }}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow"
                        >
                          Incubate National Research Project
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 28.7 Marketplace Platform Workbench */}
                {selectedPlatform.id === 'marketplace' && (
                  <div className="space-y-4">
                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-3">
                      <h4 className="text-xs font-bold text-[#0078D4] uppercase font-mono flex items-center gap-1.5">
                        <Store className="w-4 h-4" /> Commercial Ecosystem & Sovereign License Catalog
                      </h4>
                      <p className="text-xs text-slate-700">
                        Provides ERP catalogs, platform licenses, AI copilots, enterprise extensions, and industry templates with automated RTGS/M-Pesa billing.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 font-mono">
                        {marketplacePlatformService.getCatalogItems().map((item) => (
                          <div key={item.id} className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-[#0078D4] text-[9px] font-bold">{item.type}</span>
                                <span className="text-xs font-bold text-emerald-400">{item.pricing}</span>
                              </div>
                              <h5 className="text-xs font-bold text-white font-sans">{item.name}</h5>
                              <span className="text-[10px] text-slate-600 block mt-1">Publisher: {item.publisher}</span>
                            </div>
                            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[10px]">
                              <span className="text-slate-700">{item.installedCount} licensed nodes</span>
                              <button
                                onClick={() => {
                                  const tx = marketplacePlatformService.purchaseItem(item.id, 't_kampala_univ');
                                  alert(`License Purchased!\nKey: ${tx.licenseKey}\nStatus: ${tx.status}`);
                                }}
                                className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded font-bold text-xs transition-all shadow"
                              >
                                Purchase License
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 30.1 JUPIE Sovereign Payment Identity & Intelligent Settlement Workbench */}
                {selectedPlatform.id === 'jupie' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6 font-mono">
                      {/* Live Ledger */}
                      <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-blue-400 uppercase flex items-center gap-1.5">
                            <Scale className="w-4 h-4" /> Sovereign Payment Identity Ledger
                          </h4>
                          <button
                            onClick={() => {
                              const res = jupieService.syncOfflineQueue();
                              setPlatforms([...PlatformFoundationBootstrap.getAllPlatforms()]);
                              alert(`Offline Queue Synced!\nSynced: ${res.syncedCount}\nDuplicates Flagged: ${res.duplicateDetected}\nTotal Processed: ${res.resolvedRecords.length}`);
                            }}
                            className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded text-[10px] font-bold shadow"
                          >
                            Sync Offline ({jupieService.getOfflineQueue().length})
                          </button>
                        </div>
                        <p className="text-xs text-slate-700 font-sans">
                          Every transaction across all enterprise domains generates an authoritative payment identity before settlement. Nothing may bypass this service.
                        </p>
                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                          {jupieService.getLedger().map((rec) => (
                            <div key={rec.urn} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                              <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-[#0078D4]">{rec.paymentCode}</span>
                                <span className="text-emerald-400">{rec.currency} {rec.amount.toLocaleString()}</span>
                              </div>
                              <div className="text-[10px] text-slate-700 truncate">URN: <span className="text-[#0078D4]">{rec.urn}</span></div>
                              <div className="text-[9px] text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200">
                                <span>{rec.institution} ({rec.classification})</span>
                                <span className="text-emerald-700 font-bold">{rec.status} [{rec.aegisAccountabilityRecord?.authMethod || 'MFA'}]</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Templates & Routing Rules */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white/60 p-4 rounded-xl border border-slate-200/80 space-y-2">
                          <h5 className="text-xs font-bold text-[#0078D4] uppercase flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" /> Configurable Code Templates
                          </h5>
                          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-[10px]">
                            {jupieService.getTemplates().map((t) => (
                              <div key={t.ruleId} className="p-2 rounded bg-white border border-slate-200">
                                <div className="font-bold text-white">{t.templateName}</div>
                                <div className="text-[#0078D4] font-mono">Format: {t.exampleCode}</div>
                                <div className="text-slate-600">Prefix: {t.prefix} | Len: #{t.sequenceLength}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white/60 p-4 rounded-xl border border-slate-200/80 space-y-2">
                          <h5 className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" /> Intelligent Settlement Rules
                          </h5>
                          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-[10px]">
                            {jupieService.getRoutingRules().map((r) => (
                              <div key={r.ruleId} className="p-2 rounded bg-white border border-slate-200">
                                <div className="font-bold text-white">Rule: #{r.ruleId} ({r.classification})</div>
                                <div className="text-[#0078D4]">Route: {r.treasuryAccount} ({r.destinationInstitution})</div>
                                <div className="text-slate-600">ERP: {r.responsibleErp} | Fee: {r.platformFeeRate}% | Tax: {r.taxRate}%</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 p-5 rounded-xl border border-slate-200/80 space-y-4 font-mono h-fit">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-blue-400 uppercase flex items-center gap-1.5">
                          <Plus className="w-4 h-4" /> Issue Payment Identity
                        </h4>
                        <button
                          onClick={() => setShowWizard(!showWizard)}
                          className="px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-[#0078D4] text-[10px] font-bold border border-blue-200 transition-all flex items-center gap-1"
                        >
                          <Settings className="w-3 h-3" /> {showWizard ? 'Hide Wizard' : 'Onboard Wizard'}
                        </button>
                      </div>

                      {showWizard && (
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-200 space-y-2.5 text-xs animate-in fade-in">
                          <div className="flex items-center justify-between text-[#0078D4] font-bold border-b border-cyan-500/20 pb-1">
                            <span><Zap className="w-3.5 h-3.5 inline mr-1" />3-Step Onboarding Wizard</span>
                            <span className="text-[9px] bg-cyan-500 text-slate-950 px-1.5 py-0.5 rounded font-extrabold">READY</span>
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-600 block mb-0.5">1. Select Domain Archetype</label>
                            <select
                              value={wizardDomain}
                              onChange={(e) => {
                                setWizardDomain(e.target.value);
                                if (e.target.value === 'University') { setWizardInst('Makerere University'); setWizardPrefix('MAK'); }
                                else if (e.target.value === 'Hospital') { setWizardInst('Mulago Referral Hospital'); setWizardPrefix('HSP'); }
                                else if (e.target.value === 'SACCO') { setWizardInst('Starlight Farmers SACCO'); setWizardPrefix('SAC'); }
                                else { setWizardInst('JUMO Commercial Entity'); setWizardPrefix('JCE'); }
                              }}
                              className="w-full px-2 py-1 rounded bg-white border border-slate-200 text-white text-[11px]"
                            >
                              <option value="University">University / Education (Mode A / Mode B)</option>
                              <option value="Hospital">Hospital / Healthcare EHR</option>
                              <option value="SACCO">SACCO & Microfinance ERP</option>
                              <option value="Commerce">Commercial Enterprise</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] text-slate-600 block mb-0.5">2. Institution</label>
                              <input
                                type="text"
                                value={wizardInst}
                                onChange={(e) => setWizardInst(e.target.value)}
                                className="w-full px-2 py-1 rounded bg-white border border-slate-200 text-white text-[11px]"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-600 block mb-0.5">3. Prefix / Code</label>
                              <input
                                type="text"
                                value={wizardPrefix}
                                onChange={(e) => setWizardPrefix(e.target.value)}
                                className="w-full px-2 py-1 rounded bg-white border border-slate-200 text-white text-[11px] font-bold text-[#0078D4]"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setJupieInstitution(wizardInst);
                              setJupieDomain(wizardDomain);
                              setShowWizard(false);
                              alert(`Onboarding Wizard Complete!\nInstitution: ${wizardInst}\nDomain: ${wizardDomain}\nIdentity Prefix: ${wizardPrefix}\nZero-Bypass Enforcement: ACTIVE`);
                            }}
                            className="w-full py-1.5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white rounded font-bold text-[11px] shadow transition-all"
                          >
                            Apply & Activate Sovereign Identity Template
                          </button>
                        </div>
                      )}

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Identity Standard Routing Mode</label>
                          <select
                            value={jupieMode}
                            onChange={(e: any) => setJupieMode(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-cyan-500/50 text-[#0078D4] font-bold"
                          >
                            <option value="Option 3 (Hybrid Auto-Switching)">Option 3: Hybrid Auto-Switching (Recommended)</option>
                            <option value="Mode A (University Reg Num)">Mode A: Student/Citizen Reg Num (e.g. 2026/HD07/19428U)</option>
                            <option value="Mode B (JUMO Standard Code)">Mode B: Standard Payment Code (e.g. MAK-TUITION-0001)</option>
                          </select>
                        </div>

                        {(jupieMode === 'Mode A (University Reg Num)' || jupieMode === 'Option 3 (Hybrid Auto-Switching)') && (
                          <div>
                            <label className="text-[10px] text-slate-600 block mb-1">External Reg Num / Student Number</label>
                            <input
                              type="text"
                              value={jupieUrnInput}
                              onChange={(e) => setJupieUrnInput(e.target.value)}
                              placeholder="e.g. 2026/HD07/19428U"
                              className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-emerald-400 font-bold"
                            />
                          </div>
                        )}

                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Institution Name</label>
                          <input
                            type="text"
                            value={jupieInstitution}
                            onChange={(e) => setJupieInstitution(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-600 block mb-1">Amount</label>
                            <input
                              type="number"
                              value={jupieAmount}
                              onChange={(e) => setJupieAmount(e.target.value)}
                              className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-600 block mb-1">Currency</label>
                            <select
                              value={jupieCurrency}
                              onChange={(e) => setJupieCurrency(e.target.value)}
                              className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                            >
                              <option value="UGX">UGX (Uganda)</option>
                              <option value="USD">USD (International)</option>
                              <option value="KES">KES (Kenya)</option>
                              <option value="TZS">TZS (Tanzania)</option>
                              <option value="RWF">RWF (Rwanda)</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Enterprise Domain</label>
                          <select
                            value={jupieDomain}
                            onChange={(e) => setJupieDomain(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          >
                            <option value="Hospital">Hospital / Healthcare</option>
                            <option value="SACCO">SACCO / Cooperative</option>
                            <option value="University">University / Education</option>
                            <option value="Church">Church / Diocese</option>
                            <option value="Government">Government / Revenue</option>
                            <option value="Commerce">Commerce / Enterprise</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-600 block mb-1">Payment Description</label>
                          <input
                            type="text"
                            value={jupieDescription}
                            onChange={(e) => setJupieDescription(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-white border border-slate-200 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              const desc = jupieMode.includes('Mode A') || jupieMode.includes('Option 3')
                                ? `${jupieDescription} [Reg: ${jupieUrnInput} | Mode: ${jupieMode.split(' ')[0]}]`
                                : jupieDescription;
                              const id = jupieService.generatePaymentIdentity({
                                amount: Number(jupieAmount) || 10000,
                                currency: jupieCurrency,
                                institution: jupieInstitution,
                                domain: jupieDomain,
                                module: `${jupieDomain} Financial Gateway`,
                                transactionType: 'Sovereign Online Settlement',
                                tenantId: `t_${jupieDomain.toLowerCase()}_01`,
                                erpSystem: `JUMO ${jupieDomain} ERP`,
                                branch: 'MAIN',
                                department: 'FIN',
                                initiatingUser: `admin@${jupieDomain.toLowerCase()}.jumo.digital`,
                                description: desc,
                                deviceInfo: 'Sovereign Command Center Console',
                                location: 'East Africa Sovereign Cloud Grid',
                                authMethod: 'Ed25519 Hardware Token MFA',
                              });
                              setPlatforms([...PlatformFoundationBootstrap.getAllPlatforms()]);
                              alert(`Sovereign Payment Identity Issued!\nPayment Code: ${id.paymentCode}\nURN: ${id.urn}\nClassification: ${id.classification}\nMode: ${jupieMode}\nDestination: ${id.routingDetails?.destinationInstitution || 'Sovereign Treasury'}`);
                            }}
                            className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-1.5 text-xs"
                          >
                            <Zap className="w-3.5 h-3.5" /> Issue Online URN
                          </button>
                          <button
                            onClick={() => {
                              const desc = jupieMode.includes('Mode A') || jupieMode.includes('Option 3')
                                ? `${jupieDescription} [Reg: ${jupieUrnInput} | Mode: ${jupieMode.split(' ')[0]}]`
                                : jupieDescription;
                              const id = jupieService.generateOfflinePaymentIdentity({
                                amount: Number(jupieAmount) || 10000,
                                currency: jupieCurrency,
                                institution: jupieInstitution,
                                domain: jupieDomain,
                                module: `${jupieDomain} Financial Gateway`,
                                transactionType: 'Sovereign Offline Queue',
                                tenantId: `t_${jupieDomain.toLowerCase()}_01`,
                                erpSystem: `JUMO ${jupieDomain} ERP`,
                                branch: 'MAIN',
                                department: 'FIN',
                                initiatingUser: `admin@${jupieDomain.toLowerCase()}.jumo.digital`,
                                description: desc,
                                deviceInfo: 'Sovereign Offline Edge Node v29',
                                location: 'Remote Agriculture Enclave',
                                authMethod: 'Ed25519 Hardware Token MFA',
                              });
                              setPlatforms([...PlatformFoundationBootstrap.getAllPlatforms()]);
                              alert(`Offline Payment Identity Queued!\nPayment Code: ${id.paymentCode}\nURN: ${id.urn}\nMode: ${jupieMode}\nStatus: ${id.status}\nQueue Size: ${jupieService.getOfflineQueue().length}`);
                            }}
                            className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-1.5 text-xs"
                          >
                            <Plus className="w-3.5 h-3.5" /> Queue Offline URN
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: THE 16 MANDATORY QUALITY STANDARDS GRID */}
            {activeTab === 'capabilities' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span>16 Mandatory Platform Quality Standards</span>
                    </h3>
                    <p className="text-xs text-slate-600">
                      Every JUMO Digital Platform is an independent product required to enforce all 16 standardized enterprise capabilities.
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-200 text-emerald-400 font-mono text-xs font-bold shrink-0">
                    100% COMPLIANCE VERIFIED
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.values(selectedPlatform.capabilities || {}).map((cap: any) => {
                    const isSelectedCap = cap.name === selectedCapability;
                    return (
                      <button
                        key={cap.name}
                        onClick={() => setSelectedCapability(cap.name)}
                        className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between font-mono space-y-2 ${
                          isSelectedCap
                            ? 'bg-blue-600 text-white border-cyan-400 shadow-lg scale-[1.02]'
                            : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-600 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold leading-tight ${isSelectedCap ? 'text-white' : 'text-slate-900'}`}>
                            {cap.name}
                          </span>
                          <span className={`w-2 h-2 rounded-full ${cap.status === 'OPERATIONAL' ? 'bg-emerald-400' : 'bg-blue-400'}`}></span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className={isSelectedCap ? 'text-blue-700' : 'text-blue-400'}>{cap.version}</span>
                          <span className={`font-bold ${isSelectedCap ? 'text-white' : 'text-emerald-400'}`}>{cap.status}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Capability Detail Box */}
                {capabilityDetails && (
                  <div className="p-5 rounded-xl bg-white/80 border border-blue-200 font-mono space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-[10px] text-[#0078D4] uppercase font-bold">Inspect Capability Standard</span>
                        <h4 className="text-lg font-bold text-white font-sans">{capabilityDetails.name}</h4>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-700">
                          Version: {capabilityDetails.version}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-700 border border-emerald-200 font-bold">
                          {capabilityDetails.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 font-sans leading-relaxed">
                      {capabilityDetails.description}
                    </p>

                    <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-white/80 p-3 rounded border border-slate-200 space-y-1">
                        <span className="text-[10px] text-slate-600 uppercase block font-semibold">Authoritative REST Endpoint</span>
                        <code className="text-[#0078D4] font-bold block truncate">{capabilityDetails.endpoint}</code>
                      </div>
                      <div className="bg-white/80 p-3 rounded border border-slate-200 space-y-1">
                        <span className="text-[10px] text-slate-600 uppercase block font-semibold">Live Quality SLA & Telemetry</span>
                        <div className="flex flex-wrap gap-3 text-slate-200">
                          {Object.entries(capabilityDetails.metrics || {}).map(([k, v]) => (
                            <span key={k} className="bg-white px-2 py-0.5 rounded text-[11px]">
                              <span className="text-slate-600">{k}: </span>
                              <span className="text-emerald-400 font-bold">{String(v)}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: TELEMETRY & AUDIT */}
            {activeTab === 'telemetry' && (
              <div className="space-y-4 font-mono">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#0078D4]" />
                    <span>Real-Time Ring-0 Foundation Telemetry Stream</span>
                  </h3>
                  <span className="text-xs text-slate-600">Displaying authoritative system events</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 max-h-96 overflow-y-auto space-y-2 text-xs">
                  {jpsService.getTelemetryLogs().map((log, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded bg-white/60 border border-slate-200/50 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-[#0078D4] font-bold uppercase">{log.platformId}</span>
                        <span className="text-white font-semibold">{log.event}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <span className="text-slate-700 truncate max-w-md">{log.status}</span>
                        <span className="text-slate-500 text-[10px] shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Universal Enterprise Footer */}
      <JUMOEnterpriseFooter variant="dark" />
    </div>
  );
};

export default SovereignPlatformFoundationView;
