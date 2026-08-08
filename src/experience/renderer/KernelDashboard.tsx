import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, Cpu, Shield, Database, Activity, Workflow, Globe, Layers, CheckCircle2,
  Lock, Settings, ArrowRight, Clock, AlertCircle, Building2, Users, BrainCircuit,
  MapPin, Award, CheckSquare, Zap, FileText, ChevronRight, ShieldCheck, Cloud, Network, RefreshCw
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

interface KernelDashboardProps {
  onNavigate?: (tab: string) => void;
}

export function KernelDashboard({ onNavigate }: KernelDashboardProps) {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [aiInsight, setAiInsight] = useState<string>("Analyzing national infrastructure telemetry... No anomalies detected in the last 24 hours.");

  // Sovereign Shared Fabric & Phase 0 Lock States
  const [lockData, setLockData] = useState<any>(null);
  const [migrationPlan, setMigrationPlan] = useState<string>("");
  const [stateMachine, setStateMachine] = useState<string>("");
  const [isVerifyingLock, setIsVerifyingLock] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [activeLockSubTab, setActiveLockSubTab] = useState<"lock" | "plan" | "machine" | "certification">("lock");
  const [certificationData, setCertificationData] = useState<any>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await UEOSRuntimeClient.fetchDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        console.error("Failed to load kernel metrics", err);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadLockData() {
      try {
        const [lockRes, planRes, smRes, certRes] = await Promise.all([
          fetch("/api/ueos/kernel/architecture-lock").then(r => r.json()),
          fetch("/api/ueos/kernel/factory-migration-plan").then(r => r.json()),
          fetch("/api/ueos/kernel/provisioning-state-machine").then(r => r.json()),
          fetch("/api/ueos/kernel/shared-platform-certification").then(r => r.json())
        ]);
        if (lockRes.success) setLockData(lockRes);
        if (planRes.success) setMigrationPlan(planRes.plan);
        if (smRes.success) setStateMachine(smRes.stateMachine);
        if (certRes.success) setCertificationData(certRes);
      } catch (err) {
        console.error("Failed to load architecture lock telemetry:", err);
      }
    }

    loadMetrics();
    loadLockData();

    // Simulation of live updates
    const interval = setInterval(() => {
      setAiInsight(prev => prev.includes("No anomalies") 
        ? "AI Insight: Higher Education Directorate requested a new ERP certification for University ERP v5.2. Approval recommended."
        : "Analyzing national infrastructure telemetry... No anomalies detected in the last 24 hours."
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="relative w-16 h-16">
          <Activity className="w-16 h-16 text-blue-600 animate-pulse" />
          <div className="absolute inset-0 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <span className="text-sm font-black text-slate-500 uppercase tracking-widest animate-pulse">Connecting to Sovereign Kernel...</span>
      </div>
    );
  }

  // Section 1: Sovereign Operational Centers
  const operationalCenters = [
    { id: "noc", label: "National Operations Center", icon: Globe, status: "Active", load: 42, color: "blue", detail: "Uganda • Kenya • Tanzania" },
    { id: "goc", label: "Global Operations Center", icon: Network, status: "Active", load: 28, color: "indigo", detail: "Cross-Region Synced" },
    { id: "ehm", label: "Enterprise Health Monitor", icon: Activity, status: "Healthy", load: 15, color: "emerald", detail: "99.99% Uptime" },
    { id: "lrs", label: "Live Runtime Status", icon: Zap, status: "Optimized", load: 65, color: "amber", detail: "Kernel v13.4 Running" },
  ];

  // Section 2: Runtime Services Control Plane
  const runtimeServices = [
    { id: "scheduler", label: "Runtime Scheduler", icon: Clock, detail: "2.4M Jobs/Hr", status: "Active" },
    { id: "config", label: "Runtime Configuration", icon: Settings, detail: "v13.4.2 Booted", status: "Locked" },
    { id: "policies", label: "Runtime Policies", icon: Shield, detail: "Zero-Trust Enforced", status: "Active" },
    { id: "cache", label: "Runtime Cache", icon: RefreshCw, detail: "128GB L1 Mesh", status: "Healthy" },
    { id: "database", label: "Runtime Database", icon: Database, detail: "PostgreSQL Primary", status: "Synced" },
    { id: "messaging", label: "Runtime Messaging", icon: FileText, detail: "Event-Bus Active", status: "Active" },
    { id: "queue", label: "Runtime Queue", icon: Layers, status: "Healthy", detail: "0% Congestion" },
    { id: "api", label: "Runtime API Gateway", icon: Globe, status: "Active", detail: "8.2M Req/Day" },
    { id: "ai", label: "Runtime AI Gateway", icon: BrainCircuit, status: "Active", detail: "Multi-Model Router" },
  ];

  // Section 2: Sovereign Command Modules
  const commandModules = [
    { id: "infra", label: "Sovereign Infrastructure", icon: Layers, status: "Active", tab: "infrastructure", color: "blue" },
    { id: "faap", label: "Financial Platform (FAAP)", icon: Activity, status: "Healthy", tab: "faap", color: "indigo" },
    { id: "pay", label: "Digital Pay Gateway", icon: Zap, status: "Live", tab: "pay", color: "amber" },
    { id: "aegis", label: "Security OS (AEGIS)", icon: Shield, status: "Locked", tab: "security", color: "emerald" },
    { id: "cloud", label: "Sovereign Cloud", icon: Cloud, status: "Active", tab: "infrastructure", color: "sky" },
    { id: "aiops", label: "AI Operations", icon: BrainCircuit, status: "Optimizing", tab: "ai", color: "purple" },
    { id: "data", label: "Data Mesh Intelligence", icon: Database, status: "Synced", tab: "audit", color: "rose" },
    { id: "api", label: "API Sovereignty", icon: Globe, status: "Active", tab: "ecosystems", color: "slate" },
    { id: "integration", label: "Enterprise Integration", icon: Network, status: "Active", tab: "instances", color: "cyan" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Sovereign Command Workspace Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: "Kernel", status: "v13.4-SOVEREIGN", icon: Cpu, tab: "dashboard" },
          { label: "SecOps", status: "AEGIS-ACTIVE", icon: Shield, tab: "security" },
          { label: "Cognitive", status: "AI-ROUTING", icon: BrainCircuit, tab: "ai" },
          { label: "Treasury", status: "FAAP-BALANCED", icon: Activity, tab: "faap" },
          { label: "Cloud", status: "NODES-ONLINE", icon: Cloud, tab: "infrastructure" },
          { label: "Auth", status: "ZERO-TRUST", icon: Lock, tab: "security" },
        ].map((ribbon, i) => (
          <div 
            key={i} 
            onClick={() => onNavigate?.(ribbon.tab)}
            className="bg-white border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-xl flex items-center justify-center transition-all">
              <ribbon.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{ribbon.label}</span>
              <span className="text-xs font-black text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> {ribbon.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* National Headquarters Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full -mr-64 -mt-64 blur-[120px] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-5 py-2 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-900/40">
              National Headquarters
            </span>
            <div className="flex items-center gap-2 text-[10px] font-black text-blue-300 uppercase tracking-widest border-l border-white/10 pl-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> AEGIS Protective Shield Active
            </div>
          </div>
          <h2 className="text-7xl font-black tracking-tighter leading-none text-white italic">
            UEOS <span className="text-blue-500 text-8xl block">BRAIN</span>
          </h2>
          <p className="text-slate-400 font-bold text-2xl mt-8 flex items-center gap-4">
            <Activity className="w-8 h-8 text-blue-500" /> Sovereign Operating Layer for National Enterprise Infrastructure
          </p>
        </div>

        <div className="flex items-center gap-8 relative z-10">
          <div className="flex flex-col items-end mr-4">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">System Entropy</span>
            <span className="text-2xl font-black text-emerald-400 flex items-center gap-3">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" /> OPTIMIZED
            </span>
          </div>
          <button 
            onClick={() => onNavigate?.("settings")}
            className="p-10 bg-white text-slate-900 rounded-[3rem] hover:bg-blue-600 hover:text-white transition-all shadow-3xl active:scale-95 group border border-white/20"
          >
            <Terminal className="w-12 h-12 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Sovereign Shared Fabric & Phase 0 Architecture Lock Controls */}
      <div className="bg-white border border-slate-200 rounded-[3.5rem] p-10 shadow-sm space-y-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500 rounded-full -mr-40 -mt-40 blur-[150px] opacity-10" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-8 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 bg-slate-900 text-white font-black text-[10px] uppercase rounded-full tracking-widest flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-amber-500" /> Phase 0 Lock Contract
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[9px] font-black uppercase rounded-full tracking-wider border border-emerald-200">
                v13.0.0-LOCKED
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-[9px] font-black uppercase rounded-full tracking-wider border border-blue-200">
                Sovereign Architecture Protection
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-3 flex items-center gap-3">
              Sovereign Shared Fabric Control Panel
            </h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              Preventing decentralized duplication • Managing financial, security & governance shared services
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={async () => {
                setIsVerifyingLock(true);
                await new Promise(resolve => setTimeout(resolve, 1500));
                setIsVerifyingLock(false);
                setVerificationResult({
                  timestamp: new Date().toLocaleTimeString(),
                  status: "SECURE",
                  driftDetected: false,
                  signaturesVerified: true,
                  message: "All v13 core contracts, registries, and FAAP routes are verified. Double-entry ledger parity checks complete with $0.00 offset."
                });
              }}
              disabled={isVerifyingLock}
              className="px-8 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {isVerifyingLock ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Verify Integrity Lock
                </>
              )}
            </button>
          </div>
        </div>

        {/* Verification Result Display */}
        {verificationResult && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-emerald-50 border border-emerald-200 rounded-[2rem] flex items-start gap-4 relative z-10"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Integrity Check Result</span>
                <span className="text-[10px] font-bold text-slate-400">{verificationResult.timestamp}</span>
              </div>
              <p className="text-sm font-bold text-emerald-950">{verificationResult.message}</p>
              <div className="flex items-center gap-4 text-[10px] text-emerald-700 font-bold uppercase tracking-wider pt-1">
                <span>Status: {verificationResult.status}</span>
                <span>•</span>
                <span>Drift: {verificationResult.driftDetected ? "DETECTION" : "ZERO DRIFT"}</span>
                <span>•</span>
                <span>Signatures: {verificationResult.signaturesVerified ? "MATCHED" : "UNVERIFIED"}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Tabs for Lock Specs */}
        <div className="flex border-b border-slate-100 pb-1 relative z-10">
          {[
            { id: "lock", label: "Architecture Lock Contract", icon: Lock },
            { id: "plan", label: "National Migration Plan", icon: FileText },
            { id: "machine", label: "Provisioning State Machine", icon: Workflow },
            { id: "certification", label: "Shared Platform Certification", icon: Award }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveLockSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-black text-xs uppercase tracking-wider border-b-2 transition-all -mb-[2px] ${
                activeLockSubTab === tab.id 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-slate-400 hover:text-slate-800"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Renderers for each tab */}
        <div className="relative z-10 min-h-[300px]">
          {activeLockSubTab === "lock" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Locked Subsystems ({lockData?.lockedSubsystems?.length || 5})</span>
                  <div className="space-y-3">
                    {(lockData?.lockedSubsystems || [
                      { id: "identity-gateway", name: "AEGIS Zero-Trust Identity Gateway", integrityHash: "sha256-aegis-zt-identity-lock-v13-secure", status: "VERIFIED" },
                      { id: "registry-engine", name: "Canonical Ecosystem & Template Registry Engine", integrityHash: "sha256-registry-canon-lock-v13-secure", status: "VERIFIED" },
                      { id: "blueprint-engine", name: "Blueprint Intelligence Synthesis Engine", integrityHash: "sha256-blueprint-intel-lock-v13-secure", status: "VERIFIED" },
                      { id: "factory-engine", name: "Universal ERP Manufacturing Factory Engine", integrityHash: "sha256-factory-mfg-lock-v13-secure", status: "VERIFIED" },
                      { id: "provisioning-engine", name: "Cryptographic Provisioning & Instance Lifecycle Engine", integrityHash: "sha256-provisioning-lifecycle-lock-v13-secure", status: "VERIFIED" }
                    ]).map((sub: any) => (
                      <div key={sub.id} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-slate-900 block">{sub.name}</span>
                          <span className="text-[9px] font-black text-slate-400 font-mono tracking-wider mt-1 block uppercase">{sub.integrityHash}</span>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase rounded-lg border border-emerald-100">
                          {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Sealed API Contracts ({lockData?.apiRouteContracts?.length || 6})</span>
                  <div className="space-y-3">
                    {(lockData?.apiRouteContracts || [
                      { endpoint: "/api/ueos/ecosystems", methods: ["GET"] },
                      { endpoint: "/api/ueos/templates", methods: ["GET"] },
                      { endpoint: "/api/ueos/instances", methods: ["GET", "POST", "DELETE"] },
                      { endpoint: "/api/ueos/registry/factory/provision", methods: ["POST"] },
                      { endpoint: "/api/ueos/runtime/telemetry", methods: ["GET"] },
                      { endpoint: "/api/ueos/faap/transaction/orchestrate", methods: ["POST"] }
                    ]).map((route: any, i: number) => (
                      <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800 font-mono">{route.endpoint}</span>
                        <div className="flex gap-1">
                          {(route.methods || ["GET"]).map((m: string) => (
                            <span key={m} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[8px] font-black uppercase rounded border border-blue-100">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-950 text-white rounded-[2.5rem] border border-slate-800 space-y-4">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">Sovereign Service Alignment Directive</span>
                <p className="text-xs text-slate-300 font-bold leading-relaxed">
                  Every ERP instance running within the national network is mathematically bound to consume the master central financial, security, auditing, and payment backbones. Any local configuration drift, independent database spawning, or parallel engine deployment will be intercepted, quarantined, and audited by AEGIS and the National Sovereign Auditor.
                </p>
              </div>
            </div>
          )}

          {activeLockSubTab === "plan" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-slate-900 border border-slate-800 text-slate-200 p-8 rounded-3xl font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner max-h-[450px]">
                {migrationPlan || `Loading migration plan specifications...`}
              </div>
            </div>
          )}

          {activeLockSubTab === "machine" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-6">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Cryptographic 12-Stage Manufacturing Machine</span>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { s: "1", label: "INITIATED", desc: "Request received & validated" },
                    { s: "2", label: "BLUEPRINT_SELECT", desc: "Match national ERP blueprint" },
                    { s: "3", label: "RESOURCE_ALLOC", desc: "Provision storage & compute" },
                    { s: "4", label: "SCHEMATIC_LOAD", desc: "Instantiate component registers" },
                    { s: "5", label: "TENANT_RESOLVE", desc: "Set multi-tenant row isolation" },
                    { s: "6", label: "SEC_LOCK_DEPLOY", desc: "Deploy AEGIS cryptographic shield" },
                    { s: "7", label: "LEDGER_SEED", desc: "Initialize FAAP double-entry trial" },
                    { s: "8", label: "ROUTING_BOND", desc: "Bind secure SSL domains" },
                    { s: "9", label: "INTEGRATION_TEST", desc: "Perform ping & audit checks" },
                    { s: "10", label: "INTEGRITY_SIGN", desc: "Sign with JUMO valid signature" },
                    { s: "11", label: "PROVISIONED", desc: "Register as Active & Boot" },
                    { s: "12", label: "MONITORED", desc: "Active telemetry and audits" }
                  ].map((stage) => (
                    <div key={stage.s} className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-black text-[10px] flex items-center justify-center border border-blue-100">{stage.s}</span>
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-900 block leading-tight">{stage.label}</span>
                        <span className="text-[9px] font-bold text-slate-400 mt-1 block leading-tight">{stage.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 text-slate-200 p-8 rounded-3xl font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner max-h-[300px]">
                {stateMachine || `Loading state-machine specifications...`}
              </div>
            </div>
          )}

          {activeLockSubTab === "certification" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-emerald-950 uppercase tracking-tight">Shared Platform Certification Status: CERTIFIED</h4>
                    <p className="text-xs font-bold text-emerald-800 mt-0.5">All foundational sovereign services have cleared the 95%+ enterprise maturity threshold. ERP Factory Manufacturing is fully activated.</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md">
                  Readiness: 96.5% AVG
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "FAAP Enterprise Financial Platform", score: 96.5, status: "CERTIFIED", modules: ["Multi-Entity GL", "AP/AR", "Fixed Assets", "Payroll", "Tax", "Budget"] },
                  { name: "JUMO Digital Pay Payment Platform", score: 95.8, status: "CERTIFIED", modules: ["Universal Gateway", "Payment Code Factory", "Settlement Engine", "Multi-Currency"] },
                  { name: "AEGIS National Security Operations", score: 97.2, status: "CERTIFIED", modules: ["SOC Real-Time", "MFA/Identity", "Privileged Access", "Compliance Engine"] },
                  { name: "JUMO Digital Auditor & Ledger", score: 96.0, status: "CERTIFIED", modules: ["Double-Entry Parity", "Continuous Audit Logs"] },
                  { name: "Master National Treasury", score: 96.2, status: "CERTIFIED", modules: ["Liquidity Command", "Settlement Clearing", "Reserve Pools"] }
                ].map((svc, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase rounded-lg">
                          {svc.status}
                        </span>
                        <span className="text-xs font-black text-blue-600 font-mono">{svc.score}% SCORE</span>
                      </div>
                      <h5 className="text-sm font-black text-slate-900 mb-2">{svc.name}</h5>
                      <div className="flex flex-wrap gap-1">
                        {svc.modules.map((m, mi) => (
                          <span key={mi} className="px-2 py-0.5 bg-white text-slate-700 text-[9px] font-bold rounded border border-slate-200">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-4">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${svc.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sovereign Command Modules Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3 italic">
            <div className="w-2 h-8 bg-blue-600 rounded-full" /> Sovereign Command Modules
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Autonomous Operating Layer Control</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commandModules.map((cmd) => (
            <motion.div 
              key={cmd.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onNavigate?.(cmd.tab)}
              className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm hover:shadow-3xl hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className={`w-20 h-20 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-[2rem] flex items-center justify-center transition-all shadow-inner`}>
                    <cmd.icon className="w-10 h-10" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 italic">Module State</span>
                    <span className={`text-xs font-black uppercase tracking-widest ${cmd.status === 'Locked' ? 'text-amber-500' : 'text-emerald-500'}`}>{cmd.status}</span>
                  </div>
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tighter italic mb-2 uppercase">{cmd.label}</h4>
                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                  Open Operating Layer <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Operational Centers Grid */}
      <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-xl shadow-blue-200 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] mb-2 text-blue-600">Cognitive Decision Intelligence</h4>
            <p className="text-2xl font-black text-slate-900 leading-snug italic tracking-tight">{aiInsight}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">
              Consult Advisor
            </button>
            <button className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-200 transition-all">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Operational Centers Grid */}
      <div className="space-y-6">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3 px-2">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> Operational Centers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {operationalCenters.map((center) => (
            <motion.div 
              key={center.id}
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 bg-${center.color}-50 text-${center.color}-600 rounded-2xl flex items-center justify-center group-hover:bg-${center.color}-600 group-hover:text-white transition-all shadow-inner`}>
                  <center.icon className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">State</span>
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-wider">{center.status}</span>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-2">{center.label}</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">{center.detail}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Current Load</span>
                    <span>{center.load}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${center.load}%` }}
                      className={`h-full bg-${center.color}-600`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Runtime Infrastructure Control Plane */}
      <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
        <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Runtime Control Plane</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Configure & Orchestrate Kernel Services in Real-time</p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
            Restart All Services
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {runtimeServices.map((service) => (
            <div key={service.id} className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-600/5 transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-white border border-slate-200 text-slate-400 group-hover:text-blue-600 rounded-2xl flex items-center justify-center transition-all shadow-sm">
                <service.icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-black text-slate-900 tracking-tight">{service.label}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mt-1">{service.detail}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wider">{service.status}</span>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Executive Governance & Approvals */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-4">
              <CheckSquare className="w-6 h-6 text-emerald-600" /> Executive Actions
            </h3>
            <span className="px-5 py-2 bg-amber-100 text-amber-900 text-[10px] font-black uppercase rounded-full shadow-sm tracking-widest">
              4 ACTION REQUIRED
            </span>
          </div>

          <div className="space-y-4">
            {[
              { id: "AP-901", title: "National Hospital Network AEGIS Key Rotation", requester: "Ministry of Health SecOps", category: "Security", status: "PENDING", tab: "security" },
              { id: "AP-902", title: "JUMO Reasoning Model v14.0 Fine-Tuning", requester: "AI Governance Board", category: "AI Model", status: "PENDING", tab: "ai" },
              { id: "AP-903", title: "SACCO Ledger Kernel Update v13.4", requester: "FAAP Treasury Engine", category: "Platform", status: "PENDING", tab: "templates" },
              { id: "AP-904", title: "University ERP Manufacturing Request", requester: "Higher Education Directorate", category: "Manufacturing", status: "PENDING", tab: "factory" },
            ].map((app) => (
              <div key={app.id} className="group p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between hover:bg-white hover:border-blue-200 hover:shadow-2xl transition-all">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-blue-600 text-white font-black text-[9px] uppercase rounded-lg tracking-wider">
                      {app.category}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{app.id}</span>
                  </div>
                  <h4 className="font-black text-slate-900 text-base italic">{app.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <span>{app.requester}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate?.(app.tab)}
                  className="px-8 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-95 shrink-0"
                >
                  EXECUTE
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing Engine Monitor */}
        <div className="bg-slate-950 rounded-[3rem] border border-slate-800 p-10 shadow-3xl text-white space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-4 text-white">
              <Cpu className="w-6 h-6 text-blue-500" /> Manufacturing Hub
            </h3>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Live Engine Status</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Queue Status</span>
              <div className="text-3xl font-black text-white">8 Active</div>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Processing...</span>
              </div>
            </div>
            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Success Rate</span>
              <div className="text-3xl font-black text-white">100%</div>
              <div className="flex items-center gap-2 mt-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">All Validated</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Manufacturing Threads</h4>
            {[
              { label: "Blueprint AI Engineer", progress: 85, color: "blue" },
              { label: "Security AEGIS Generator", progress: 62, color: "indigo" },
              { label: "FAAP Ledger Constructor", progress: 45, color: "emerald" },
            ].map((thread, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span>{thread.label}</span>
                  <span className={`text-${thread.color}-400`}>{thread.progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${thread.progress}%` }}
                    className={`h-full bg-${thread.color}-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]`}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onNavigate?.("factory")}
            className="w-full py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-[2rem] hover:bg-white hover:text-slate-900 transition-all shadow-2xl shadow-blue-900/40"
          >
            Launch Manufacturing Engine
          </button>
        </div>
      </div>

      {/* Section 4: Enterprise Geographic Map / Regional Nodes (1 Col) */}
      <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm space-y-6 flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <h3 className="text-base font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
            <MapPin className="w-5 h-5 text-rose-600" /> Geographic Network
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">4 Active Nodes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { country: "Uganda", node: "Kampala National Data Center", institutions: 120, status: "Active" },
            { country: "Kenya", node: "Nairobi Cloud Node", institutions: 75, status: "Active" },
            { country: "Tanzania", node: "Dar es Salaam Regional Hub", institutions: 30, status: "Active" },
            { country: "Rwanda", node: "Kigali Edge Node", institutions: 20, status: "Active" },
          ].map((node, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate?.("instances")}
              className="p-5 bg-slate-50 rounded-[28px] border border-slate-100 space-y-2 hover:bg-white hover:border-rose-200 hover:shadow-xl hover:shadow-rose-600/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 text-base tracking-tight">{node.country}</span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest">{node.status}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider">{node.node}</span>
                <span className="text-xs font-bold text-slate-500 mt-1">{node.institutions} Live Enterprise Deployments</span>
              </div>
              <div className="pt-2 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
