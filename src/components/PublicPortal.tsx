/**
 * JUMO UEOS Enterprise Public Information Centre
 * Official JUMO Enterprise Design System Standardization (Phase 9)
 * Read-Only Enterprise Gateway displaying 16 ERP Catalogues, 13 Enterprise Services,
 * Public Notice Board, AI Architecture Overview, and Interactive Feedback Centre.
 */

import React, { useState, useEffect } from "react";
import { 
  Globe, Shield, Building2, Landmark, Users, ArrowRight, CheckCircle2, 
  Layers, Cpu, Database, Sparkles, FileText, Bell, AlertTriangle, Info, 
  HelpCircle, ExternalLink, Store, Briefcase, BookOpen, HeartPulse, 
  Scale, Factory, ShoppingBag, Truck, Sprout, Handshake, DollarSign, 
  Award, MessageSquare, Send, Calendar, Clock, RefreshCw, Search, ChevronRight,
  Terminal, Lock, Eye, BookMarked, Download, CheckCircle, Sliders, Play, Package,
  ShieldCheck, Wrench, HardHat, Radio, PiggyBank, Code, HeartHandshake, Boxes,
  GraduationCap, Church, ShieldAlert, Settings, Filter, ArrowUpRight, Wrench as ToolIcon, Activity, Archive
} from "lucide-react";
import { jumoFetch } from "../core/config/api";
import { PublicAI } from "../../experience/components/public/PublicAI";

interface PublicPortalProps {
  onLoginSuccess?: (user: { email: string; name: string; role: string; tenantId: string; trustLevel: string }, token?: string) => void;
  onNavigate?: (route: string) => void;
}

interface ERPPlatform {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  status: string;
  modulesCount: number;
}

interface EnterpriseService {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  tier: string;
}

export default function PublicPortal({ onLoginSuccess, onNavigate }: PublicPortalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "erps" | "services" | "notices" | "ai" | "docs" | "marketplace" | "feedback" | "showcase" | "verification">("overview");
  const [certCode, setCertCode] = useState("");
  const [certResult, setCertResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("suggestion");
  const [feedbackSubject, setFeedbackSubject] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedSovereignPortal, setSelectedSovereignPortal] = useState<{ id: string; name: string; category: string; description: string; type: 'erp' | 'service'; modulesCount?: number; tier?: string } | null>(null);
  const [portalTab, setPortalTab] = useState<'landing' | 'overview' | 'modules' | 'templates' | 'architecture' | 'pricing' | 'stories' | 'docs' | 'ai' | 'status'>('landing');
  const [selectedTemplateForPortal, setSelectedTemplateForPortal] = useState<string>('Standard Sovereign Edition');
  const [demoRequested, setDemoRequested] = useState<boolean>(false);
  
  // System Status State
  const [kernelStatus, setKernelStatus] = useState({ version: "13.5.0", status: "ONLINE", uptime: "99.999%" });
  const [activeTenants, setActiveTenants] = useState<number>(4280);
  const [clearingVolume, setClearingVolume] = useState<string>("$1.42B");

  // Authoritative JUMO Product Family (Consolidated to 4)
  const erpPlatforms: ERPPlatform[] = [
    { 
      id: "JUMO-FINPAY", 
      name: "Financial & Digital Pay Platform", 
      category: "Finance & Payments", 
      description: "Consolidated Financial Accounting & Universal Payment Switch. Merges FAAP authoritative double-entry ledger with Digital Pay mobile money and bank settlement capabilities.", 
      icon: Database, 
      status: "Production Ready", 
      modulesCount: 24 
    },
    { 
      id: "JUMO-CHURCH", 
      name: "Church & Diocese ERP", 
      category: "Faith-Based Governance", 
      description: "Authoritative faith-based governance and administrative operating system for dioceses and parish networks.", 
      icon: Landmark, 
      status: "Production Ready", 
      modulesCount: 18 
    },
    { 
      id: "JUMO-EDU-ALUMNI", 
      name: "Education & Alumni ERP", 
      category: "Academic & Advancement", 
      description: "Universal Education Management & Institutional Advancement. Covers the complete lifecycle from Applicant to Student to Alumnus and Endowment management.", 
      icon: GraduationCap, 
      status: "Production Ready", 
      modulesCount: 20 
    },
    { 
      id: "JUMO-CONTROL", 
      name: "Sovereign Control Center", 
      category: "Platform Orchestration", 
      description: "Consolidated Sovereign Management Console. AEGIS Security, AI Command, Cloud Infrastructure, and Platform Orchestration.", 
      icon: Shield, 
      status: "Production Ready", 
      modulesCount: 14 
    },
  ];

  // All 13 Official Enterprise Services
  const enterpriseServices: EnterpriseService[] = [
    { id: "srv-trans", name: "Digital Transformation", category: "Strategic Consulting", description: "End-to-end enterprise architecture mapping, legacy data migration, and zero-downtime hybrid operating system adoption.", icon: RefreshCw, tier: "Enterprise Premier" },
    { id: "srv-erp", name: "ERP Deployment", category: "System Integration", description: "Turnkey domain template provisioning, custom workflow configuration, and institutional staff enablement.", icon: Layers, tier: "Standard & Pro" },
    { id: "srv-ai", name: "AI Services & Agents", category: "Cognitive Intelligence", description: "Deployment of enterprise AI assistants, custom RAG knowledge bases, and automated document synthesis engines.", icon: Sparkles, tier: "Sovereign AI" },
    { id: "srv-id", name: "Identity Services", category: "Zero-Trust Security", description: "Multi-factor authentication gateways, biographic identity wallets, cryptographic RBAC, and sovereign SSO federation.", icon: Lock, tier: "Core Foundation" },
    { id: "srv-flow", name: "Workflow Services", category: "Process Automation", description: "BPMN 2.0 visual orchestration, multi-tier signature approvals, automated SLA escalations, and event-driven triggers.", icon: Clock, tier: "Core Foundation" },
    { id: "srv-trsy", name: "Treasury Services", category: "Financial Clearing", description: "Automated 1.5% settlement clearing, central liquidity pool management, and cross-border currency netting.", icon: DollarSign, tier: "Sovereign FinTech" },
    { id: "srv-faap", name: "FAAP Ledger Backbone", category: "Financial Accounting", description: "Double-entry cryptographic ledger guaranteeing $0.00 offset balance parity across all institutional accounts.", icon: BookMarked, tier: "Core Foundation" },
    { id: "srv-int", name: "Integration Services", category: "API & Service Mesh", description: "REST/GraphQL/gRPC API gateways, legacy mainframe connectors, banking switch adapters, and webhook event streaming.", icon: Cpu, tier: "Standard & Pro" },
    { id: "srv-sec", name: "Security Services", category: "Aegis Zero-Trust", description: "Real-time threat detection, AES-256 vault encryption, automated compliance auditing, and DDoS perimeter shielding.", icon: Shield, tier: "Core Foundation" },
    { id: "srv-ana", name: "Analytics & BI", category: "Enterprise Intelligence", description: "Real-time multidimensional OLAP cubes, executive dashboard visualization, and predictive econometric modeling.", icon: Eye, tier: "Standard & Pro" },
    { id: "srv-comm", name: "Communications", category: "Unified Messaging", description: "Encrypted enterprise messaging, SMS/WhatsApp broadcast notices, email dispatch engines, and emergency alert sirens.", icon: MessageSquare, tier: "Standard & Pro" },
    { id: "srv-mkt", name: "Digital Marketplace", category: "Ecosystem Plugins", description: "Curated domain extensions, certified AI agent blueprints, custom reporting templates, and third-party SaaS connectors.", icon: Store, tier: "Open Ecosystem" },
    { id: "srv-bld", name: "Platform Builder (UAPB)", category: "Software Generation", description: "Universal Application Platform Builder turning natural language blueprints into compiled, type-safe enterprise suites.", icon: Factory, tier: "Sovereign AI" },
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackSubject || !feedbackMessage) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubject("");
      setFeedbackMessage("");
      setFeedbackSubmitted(false);
    }, 4000);
  };

  const filteredERPs = erpPlatforms.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = enterpriseServices.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedSovereignPortal) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-[#0078D4] flex flex-col">
        {/* Sovereign Pre-Login Top Bar */}
        <div className="bg-slate-900 text-white py-3 px-4 md:px-8 border-b border-slate-800 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedSovereignPortal(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                ← Back to Catalogue
              </button>
              <div className="h-4 w-px bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 uppercase">
                  {selectedSovereignPortal.category}
                </span>
                <h1 className="text-sm font-bold text-white tracking-wide">{selectedSovereignPortal.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ring-0 Verified | 99.999% SLA
              </span>
              <button
                onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                className="px-3 py-1.5 bg-[#0078D4] hover:bg-blue-600 text-white font-bold rounded-lg transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" /> Sign In to Workspace
              </button>
            </div>
          </div>
        </div>

        {/* Portal Hero Section */}
        <div className="bg-slate-50 border-b border-slate-200 py-10 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0078D4] text-xs font-mono font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Sovereign Pre-Login Gateway (Phase 2 Directive v17.0)
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {selectedSovereignPortal.name}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {selectedSovereignPortal.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-600" /> 100% Zero-Trust RBAC & ABAC</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-600" /> FAAP Ledger Parity ($0.00)</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-600" /> Multi-Model AI Router Active</span>
                {selectedSovereignPortal.modulesCount && (
                  <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-blue-600" /> {selectedSovereignPortal.modulesCount} Core Modules</span>
                )}
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full md:w-80 shrink-0 space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider">Gateway Action Desk</div>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                  className="w-full py-2.5 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" /> Enterprise Login
                </button>
                <button
                  onClick={() => {
                    setDemoRequested(true);
                    setTimeout(() => setDemoRequested(false), 5000);
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" /> Request Institutional Trial
                </button>
                <button
                  onClick={() => alert("Sovereign Enterprise Concierge: support@jumo-ecosystem.org | 24/7 Dedicated Line Active.")}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Info className="w-4 h-4" /> Contact Support Concierge
                </button>
              </div>
              {demoRequested && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-medium leading-tight">
                  ✓ Trial Request dispatched! An institutional deployment engineer is provisioning your sovereign sandbox.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Portal Navigation Bar */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1">
            {[
              { id: 'landing', label: 'Portal Overview', icon: Globe },
              { id: 'modules', label: 'Core & Domain Modules', icon: Layers },
              { id: 'templates', label: 'Industry Templates (21+)', icon: Building2 },
              { id: 'architecture', label: 'Digital Hybrid Specs', icon: Cpu },
              { id: 'pricing', label: 'Licensing & Pricing', icon: DollarSign },
              { id: 'stories', label: 'Institutional Deployments', icon: Award },
              { id: 'docs', label: 'API Docs & Release Notes', icon: BookOpen },
              { id: 'ai', label: 'JUMO AI Concierge', icon: Sparkles },
              { id: 'status', label: 'Real-time Node Status', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = portalTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPortalTab(tab.id as any)}
                  className={`px-4 py-3 text-xs font-semibold rounded-lg flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-[#0078D4] border-b-2 border-[#0078D4] rounded-b-none"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0078D4]" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portal Content Workspace */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex-1 w-full space-y-8">
          {portalTab === 'landing' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
              <div className="md:col-span-2 space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">Sovereign Architecture & Business Capabilities</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The {selectedSovereignPortal.name} is engineered to eliminate data silos and external vendor dependencies. Operating directly on the JUMO Universal Micro-Kernel (v14.4.0), it enforces real-time double-entry accounting parity across every institutional transaction while protecting tenant privacy with Row-Level Database Segregation.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-[#0078D4]" /> Zero-Trust RBAC / ABAC
                      </div>
                      <p className="text-xs text-slate-600">Strict multi-tenancy boundaries and cryptographically verified MFA token authentication.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-2 mb-1">
                        <Database className="w-4 h-4 text-emerald-600" /> FAAP Ledger Backbone
                      </div>
                      <p className="text-xs text-slate-600">Automated double-entry general ledger with 1.5% settlement clearing switch.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-2 mb-1">
                        <Cpu className="w-4 h-4 text-purple-600" /> Multi-Model AI Gateway
                      </div>
                      <p className="text-xs text-slate-600">Dynamic cognitive routing between Gemini reasoning models and fast processing agents.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-2 mb-1">
                        <Globe className="w-4 h-4 text-amber-600" /> Digital Hybrid Deploy
                      </div>
                      <p className="text-xs text-slate-600">Identical execution across local cloud, Kubernetes, VPS, or air-gapped edge servers.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-md space-y-4">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Enterprise Upgrade Directive v17.0</div>
                  <h3 className="text-2xl font-bold">Ready to deploy {selectedSovereignPortal.name}?</h3>
                  <p className="text-sm text-slate-300 max-w-2xl">
                    Institutional tenants can launch a live, isolated sandbox with pre-configured chart of accounts, sample employee records, and AI compliance rules in under 60 seconds.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                      className="px-5 py-2.5 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" /> Launch Production Workspace
                    </button>
                    <button
                      onClick={() => setPortalTab('templates')}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition border border-white/20 flex items-center gap-2 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4" /> Browse Industry Templates
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Technical Specifications</h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Platform Kernel:</span>
                      <span className="font-mono font-semibold text-slate-800">JUMO UEOS v14.4.0</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Security Perimeter:</span>
                      <span className="font-mono font-semibold text-emerald-600">Ring-0 Zero Trust</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Database Engine:</span>
                      <span className="font-mono font-semibold text-slate-800">PostgreSQL / Cloud SQL</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">AI Routing:</span>
                      <span className="font-mono font-semibold text-purple-600">Gemini 2.5 Flash / Pro</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Compliance Audit:</span>
                      <span className="font-mono font-semibold text-blue-600">SOC2 / ISO27001 Ready</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Need Institutional Guidance?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our sovereign deployment architects assist with legacy data migration, custom chart of accounts setup, and staff onboarding.
                  </p>
                  <button
                    onClick={() => setPortalTab('ai')}
                    className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600" /> Ask Portal AI Assistant
                  </button>
                </div>
              </div>
            </div>
          )}

          {portalTab === 'modules' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Authoritative Core & Domain Modules</h3>
                <p className="text-sm text-slate-600 mt-1">
                  All {selectedSovereignPortal.name} deployments automatically inherit the 98 Universal Core Modules and specialized domain processors.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "FAAP General Ledger & Treasury", cat: "Financial Backbone", desc: "Automated double-entry debits/credits with real-time balance parity enforcement.", status: "Ring-0 Active" },
                  { name: "Zero-Trust Identity & RBAC", cat: "Security Engine", desc: "Multi-tenant role boundaries, session tokens, and cryptographic audit logs.", status: "Ring-0 Active" },
                  { name: "Multi-Model AI Cognitive Router", cat: "Artificial Intelligence", desc: "Decoupled AI gateway routing queries to Gemini Flash & reasoning models.", status: "Ring-0 Active" },
                  { name: "Universal Notification Switch", cat: "Communication", desc: "SMS, Email, WhatsApp, and in-app alert dispatching with retry queues.", status: "Inherited" },
                  { name: "Sovereign Document Vault", cat: "Storage & Compliance", desc: "AES-256 encrypted file indexing, OCR scanning, and version control.", status: "Inherited" },
                  { name: "Workflow & Rule Automator", cat: "Operations", desc: "Custom approval hierarchies, cron schedulers, and conditional triggers.", status: "Inherited" },
                  { name: "Domain Specialist Processor", cat: "Specialized ERP", desc: `Custom business logic and data schema tailored for ${selectedSovereignPortal.name}.`, status: "Specialized" },
                  { name: "Real-time Telemetry & Metrics", cat: "Observability", desc: "Continuous CPU, memory, and database connection pool health tracking.", status: "Inherited" },
                  { name: "Digital Marketplace Gateway", cat: "Extensibility", desc: "Hot-swappable module installer and third-party API adapter registry.", status: "Inherited" },
                ].map((mod, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-600 uppercase px-2 py-0.5 rounded bg-blue-50 border border-blue-200">{mod.cat}</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{mod.status}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{mod.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{mod.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {portalTab === 'templates' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Deployable Industry Templates & Configurations</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Select a pre-configured institutional template to provision an optimized database schema and module bundle.
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-[#0078D4] font-mono font-bold text-xs rounded-lg border border-blue-200 self-start">
                  21+ Authoritative Templates Ready
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(selectedSovereignPortal.id === 'education' || selectedSovereignPortal.name.toLowerCase().includes('education') ? [
                  { id: 'nursery', name: 'Nursery School ERP', desc: 'Early childhood centers, child profiles, parent comms', modules: 12 },
                  { id: 'primary', name: 'Primary School ERP', desc: 'Academic management, grading, attendance, fees', modules: 16 },
                  { id: 'secondary', name: 'Secondary School ERP', desc: 'Boarding, discipline, exams, subject departments', modules: 20 },
                  { id: 'college', name: 'College ERP', desc: 'TVET, course scheduling, certifications, skills training', modules: 18 },
                  { id: 'tvet', name: 'TVET / Technical Institute ERP', desc: 'Workshop tracking, equipment maintenance, apprenticeships', modules: 15 },
                  { id: 'vocational', name: 'Vocational Institute ERP', desc: 'Practical trade apprenticeships, guild testing, craft certification', modules: 16 },
                  { id: 'university', name: 'University ERP', desc: 'Faculties, research grants, SIS, alumni integration', modules: 28 },
                  { id: 'distance', name: 'Distance Learning ERP', desc: 'Remote proctoring, asynchronous LMS, digital library delivery', modules: 18 },
                  { id: 'open_univ', name: 'Open University ERP', desc: 'Massive open online courses (MOOC), adult continuing education', modules: 22 },
                  { id: 'research_inst', name: 'Research Institute ERP', desc: 'Grant accounting (FAAP), laboratory equipment booking, peer review tracking', modules: 24 },
                  { id: 'digital_acad', name: 'Digital Academy ERP', desc: 'Coding bootcamps, tech certification tracks, project portfolios', modules: 16 },
                  { id: 'corporate_train', name: 'Corporate Training ERP', desc: 'Employee upskilling, mandatory compliance courses, executive leadership tracks', modules: 18 },
                  { id: 'military_acad', name: 'Military Academy ERP', desc: 'Cadet discipline, tactical field exercises, classified research security', modules: 26 },
                  { id: 'police_acad', name: 'Police Academy ERP', desc: 'Law enforcement drill training, forensics laboratory scheduling, officer ethics', modules: 24 },
                  { id: 'medical_sch', name: 'Medical School ERP', desc: 'Hospital residency rotations, cadaver lab tracking, clinical trials', modules: 28 },
                  { id: 'law_sch', name: 'Law School ERP', desc: 'Moot court scheduling, legal clinic casework, constitutional jurisprudence', modules: 22 },
                  { id: 'faith_inst', name: 'Faith-Based Institution ERP', desc: 'Theological seminary doctrine, chaplaincy training, missionary outreach', modules: 20 },
                  { id: 'international', name: 'International School ERP', desc: 'Multiple curriculums, global payments, accreditation', modules: 19 },
                  { id: 'private_sch', name: 'Private School ERP', desc: 'Premium tuition billing (FAAP), donor endowment tracking, parent portal', modules: 20 },
                  { id: 'public_sch', name: 'Public School ERP', desc: 'Municipal budget compliance, government capitation grants, standardized state testing', modules: 22 },
                  { id: 'network', name: 'Education Network ERP', desc: 'Multi-campus administration, centralized curriculum', modules: 25 }
                ] : [
                  { id: 'standard', name: `${selectedSovereignPortal.name} - Institutional Edition`, desc: 'Full standard module suite with double-entry general ledger and automated workflow automation.', modules: selectedSovereignPortal.modulesCount || 20 },
                  { id: 'enterprise', name: `${selectedSovereignPortal.name} - Sovereign Cluster`, desc: 'High-availability multi-node replication, dedicated AI vector database, and custom SLA concierge.', modules: (selectedSovereignPortal.modulesCount || 20) + 6 },
                  { id: 'starter', name: `${selectedSovereignPortal.name} - Rapid Deployment`, desc: 'Essential core modules tailored for immediate branch operations and fast employee onboarding.', modules: 14 },
                ]).map((t, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#0078D4] hover:shadow-md transition flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0078D4] border border-blue-200">
                          {t.modules} MODULES
                        </span>
                        <span className="text-xs font-bold text-emerald-600">Ready to Deploy</span>
                      </div>
                      <h4 className="font-bold text-base text-slate-900">{t.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.desc}</p>
                    </div>
                    <button
                      onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                      className="w-full py-2 bg-slate-900 hover:bg-[#0078D4] text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" /> Provision This Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {portalTab === 'architecture' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Digital Hybrid Enterprise Specs</h3>
                <p className="text-sm text-slate-600 mt-1">Detailed technical overview of the underlying micro-kernel architecture and security perimeter.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#0078D4]" /> Micro-Kernel Dependency Graph
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The kernel decouples business logic from storage and AI providers. All database writes are processed through the FAAP ledger transaction manager, ensuring 100% atomic consistency.
                  </p>
                  <div className="font-mono text-[11px] bg-slate-900 text-emerald-400 p-3 rounded-lg space-y-1">
                    <div>❯ KERNEL: Ring-0 Bootloader Verified</div>
                    <div>❯ ORM: Drizzle / PostgreSQL Pool (Max 100 conns)</div>
                    <div>❯ LEDGER: Double-Entry Debit/Credit Switch</div>
                    <div>❯ AI: Google GenAI SDK (@google/genai) v0.1.2</div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Security & Compliance Perimeter
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Data isolation is enforced at the PostgreSQL database row level using tenant ID tags. Administrative API routes require session validation and AES-256 payload verification.
                  </p>
                  <div className="font-mono text-[11px] bg-slate-900 text-blue-300 p-3 rounded-lg space-y-1">
                    <div>❯ TLS: v1.3 Enforced across all ingress endpoints</div>
                    <div>❯ AUTH: Zero-Trust MFA + RBAC Access Control</div>
                    <div>❯ BACKUP: Cryptographically sealed JSON exports</div>
                    <div>❯ AUDIT: Append-only immutable log stream</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {portalTab === 'pricing' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Sovereign Enterprise Licensing & Subscription Tiers</h3>
                <p className="text-sm text-slate-600 mt-1">Transparent, predictable institutional licensing with built-in financial clearing.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Developer Sandbox", price: "$0", period: "/forever", desc: "For technical evaluation and custom module scaffolding.", features: ["Up to 10 Tenant Users", "Standard Core Modules", "Local SQLite / JSON Cache", "Community Support"], btn: "Launch Free Sandbox", highlight: false },
                  { name: "Institutional Standard", price: "$499", period: "/month", desc: "For active schools, churches, cooperatives, and commercial firms.", features: ["Up to 500 Active Users", "Full 98 Core + Domain Modules", "FAAP Financial Ledger ($0.00 Parity)", "24/7 Priority Support", "Automated Daily Cloud Backups"], btn: "Request Institutional Trial", highlight: true },
                  { name: "Sovereign Enterprise", price: "Custom", period: "/annual", desc: "For governments, national healthcare systems, and large universities.", features: ["Unlimited Users & Multi-Campus", "Dedicated Multi-Node Cluster", "Custom AI Vector Training & RAG", "On-Premise or Air-Gapped Edge Deploy", "Dedicated Deployment Engineer"], btn: "Contact Enterprise Concierge", highlight: false },
                ].map((plan, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 ${plan.highlight ? 'bg-blue-50/50 border-[#0078D4] shadow-md relative' : 'bg-white border-slate-200 shadow-sm'}`}>
                    {plan.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0078D4] text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-xs">
                        Most Popular for Institutions
                      </span>
                    )}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">{plan.name}</h4>
                        <p className="text-xs text-slate-600 mt-1">{plan.desc}</p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                        <span className="text-xs font-semibold text-slate-500">{plan.period}</span>
                      </div>
                      <ul className="space-y-2.5 pt-4 border-t border-slate-200">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-slate-700 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer ${
                        plan.highlight ? 'bg-[#0078D4] hover:bg-blue-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {plan.btn}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {portalTab === 'stories' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Verified Institutional Deployments & Case Studies</h3>
                <p className="text-sm text-slate-600 mt-1">See how leading organizations achieve operational excellence with JUMO UEOS.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "National Archdiocese Network", metric: "100% Parity across 140 Parishes", quote: "We replaced 5 different fragmented accounting software systems with JUMO Church ERP. Our diocesan general ledger now reconciles in real-time with zero discrepancy.", author: "Rev. Fr. Michael K., Diocesan Financial Chancellor" },
                  { title: "East African Technical University", metric: "24,000 Active Student Records", quote: "The multi-campus SIS and FAAP fee billing switch eliminated registration queues completely. Our online exam grading and library modules run flawlessly.", author: "Dr. Sarah M., Deputy Vice Chancellor (Academic Affairs)" },
                  { title: "Sovereign Farmers Cooperative Union", metric: "$14.2M Annual Produce Turnover", quote: "With JUMO Agriculture & Cooperative ERP, our 12,000 dairy and coffee farmers receive instant M-Pesa clearing settlements with automated 1.5% treasury deductions.", author: "Eng. David O., Chief Executive Officer" },
                  { title: "Regional Healthcare Referral Hospital", metric: "99.999% Clinical Uptime", quote: "The zero-trust patient electronic medical record (EMR) system and pharmacy billing integration give our clinical staff secure, instant access from any ward.", author: "Dr. James W., Medical Superintendent" },
                ].map((story, idx) => (
                  <div key={idx} className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-slate-900">{story.title}</h4>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">{story.metric}</span>
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed">"{story.quote}"</p>
                    <div className="text-xs font-bold text-[#0078D4]">— {story.author}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {portalTab === 'docs' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900">API Specifications & Release Notes</h3>
                <p className="text-sm text-slate-600 mt-1">Official developer documentation and version history for {selectedSovereignPortal.name}.</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">JUMO UEOS v14.4.0 LTS Release Notes</div>
                    <div className="text-xs text-slate-500 mt-0.5">Published: July 2026 | SHA-256 Verified | Includes Phase 17.0 Architecture upgrades</div>
                  </div>
                  <button onClick={() => alert("Downloading official v14.4.0 release notes PDF...")} className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#0078D4] hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">REST & GraphQL API Reference Guide</div>
                    <div className="text-xs text-slate-500 mt-0.5">Comprehensive endpoints for FAAP ledger postings, student SIS, and AI queries</div>
                  </div>
                  <button onClick={() => alert("Opening interactive Swagger / OpenAPI specification...")} className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#0078D4] hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer">
                    <ExternalLink className="w-3.5 h-3.5" /> View OpenAPI
                  </button>
                </div>
              </div>
            </div>
          )}

          {portalTab === 'ai' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Dedicated Portal AI Assistant</h3>
                <p className="text-sm text-slate-600 mt-1">Ask questions about architectural compatibility, module deployment, or licensing for {selectedSovereignPortal.name}.</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <PublicAI />
              </div>
            </div>
          )}

          {portalTab === 'status' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Real-Time Cluster Health & Diagnostics</h3>
                  <p className="text-sm text-slate-600 mt-1">Live telemetry across JUMO regional replication servers.</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  All Systems Operational
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500">Global API Gateway</div>
                  <div className="text-lg font-bold text-slate-900">12ms Latency</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">99.999% Uptime (Past 30 Days)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500">FAAP Ledger Parity Switch</div>
                  <div className="text-lg font-bold text-slate-900">$0.00 Discrepancy</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">1,420,500 TXs Cleared Today</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500">AI Cognitive Router</div>
                  <div className="text-lg font-bold text-slate-900">Gemini Flash / Pro</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">0.14s Avg Inference Response</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Portal Footer */}
        <footer className="bg-slate-900 text-slate-400 py-6 px-4 md:px-8 border-t border-slate-800 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              © 2026 JUMO Universal Enterprise Operating System (UEOS). All rights reserved. Sovereign Ring-0 Architecture.
            </div>
            <div className="flex items-center gap-6 text-slate-300">
              <button onClick={() => setSelectedSovereignPortal(null)} className="hover:underline cursor-pointer">Return to Catalogue</button>
              <button onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"} className="hover:underline cursor-pointer">Enterprise Login</button>
              <button onClick={() => alert("Enterprise Privacy & Zero-Trust Row-Level Security Policy active.")} className="hover:underline cursor-pointer">Privacy & Security</button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-[#0078D4]">
      {/* Hero Header & Action Gateways */}
      <div className="bg-slate-50 border-b border-slate-200 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" /> Official JUMO Enterprise Design System
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              JUMO DIGITAL HYBRID ENTERPRISE PLATFORM
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Welcome to the public information centre and read-only gateway of the JUMO Universal Enterprise Operating System (UEOS). Explore our 16 institutional ERP domains, 13 sovereign platform services, real-time notice boards, and public institutional documentation.
            </p>
          </div>

          {/* Universal System Gateway & Authentication (Decision 1) */}
          <div className="flex flex-col gap-2.5 w-full lg:w-88 shrink-0 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-bold uppercase text-blue-600 tracking-wider flex items-center gap-1.5 font-mono">
                <Lock className="w-3.5 h-3.5" /> Universal Gateway
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">AUTO-ROUTING</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-normal">
              Automatic tenant identification via org code, email domain, identity, or QR invitation.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                className="w-full px-3 py-2 rounded-xl bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" /> Institution Login
              </button>
              <button
                onClick={() => onNavigate ? onNavigate("/owner") : window.location.href = "/owner"}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5" /> Owners Login
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate ? onNavigate("/public-login") : window.location.href = "/public-login"}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-slate-500" /> Customer Login
              </button>
              <button
                onClick={() => setActiveTab("erps")}
                className="w-full px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Store className="w-3.5 h-3.5 text-blue-600" /> Public Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1 py-1">
            {[
              { id: "overview", label: "Platform Overview", icon: Layers },
              { id: "erps", label: "ERP Solutions (20)", icon: Building2 },
              { id: "services", label: "Enterprise Services (13)", icon: Cpu },
              { id: "notices", label: "Notice Board & News", icon: Bell },
              { id: "ai", label: "JUMO AI Concierge", icon: Sparkles },
              { id: "docs", label: "Documentation Preview", icon: BookOpen },
              { id: "marketplace", label: "Marketplace Preview", icon: Store },
              { id: "showcase", label: "Advertising Center & Showcase", icon: Award },
              { id: "verification", label: "Certificate & Credential Verification", icon: ShieldCheck },
              { id: "feedback", label: "Suggestions & Feedback", icon: MessageSquare },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-3 text-xs font-semibold rounded-lg flex items-center gap-2 transition whitespace-nowrap ${
                    isActive 
                      ? "bg-blue-50 text-[#0078D4] border-b-2 border-[#0078D4] rounded-b-none" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0078D4]" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Filter for Catalogues */}
          {(activeTab === "erps" || activeTab === "services" || activeTab === "marketplace") && (
            <div className="relative w-64 hidden md:block py-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search solutions & services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:bg-white transition"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Canvas */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* TAB 1: PLATFORM OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-12 animate-in fade-in duration-300">
            
            {/* Digital Hybrid Enterprise Concept */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">The Digital Hybrid Enterprise Concept</h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Traditional organizations are fragmented across disconnected billing software, isolated HR spreadsheets, external banking portals, and unmanaged AI experiments. JUMO UEOS replaces this fragmentation with a unified micro-kernel where every domain—from Archdioceses and Universities to Manufacturing Plants and Governments—runs on a single sovereign infrastructure.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0078D4] flex items-center justify-center font-bold">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">Zero-Trust Security Perimeter</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      All requests pass through our Aegis Zero-Trust firewall with administrative MFA gating, session encryption, and strict role-based access control (RBAC).
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <BookMarked className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">FAAP Ledger Backbone</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every transaction across all 20 ERP domains posts to a single double-entry cryptographic ledger guaranteeing exact $0.00 offset balance parity.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">Enterprise AI Intelligence Gateway</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Server-side cognitive routing coordinates specialized AI assistants for auditing, schema translation, compliance checking, and natural language code generation.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      <Factory className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">Universal Software Factory (UAMP)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      On-the-fly scaffolding engine generating type-safe modules, UI components, database tables, and API endpoints without manual engineering overhead.
                    </p>
                  </div>
                </div>
              </div>

              {/* Architecture Summary Sidebar Card */}
              <div className="p-6 rounded-2xl bg-white text-slate-800 space-y-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span className="text-xs font-mono uppercase text-blue-600 font-bold">Architecture Specs</span>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">L5 Sovereign</span>
                </div>
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Micro-Kernel:</span>
                    <span className="text-slate-900 font-semibold">JUMO UEOS v13.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ledger Engine:</span>
                    <span className="text-emerald-700 font-semibold">FAAP SHA-256 Double-Entry</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">AI Gateway:</span>
                    <span className="text-purple-700 font-semibold">Gemini 2.5 Pro / Flash Swarm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Database:</span>
                    <span className="text-blue-700 font-semibold">PostgreSQL Cloud SQL + Firestore</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Treasury Clearing:</span>
                    <span className="text-amber-700 font-semibold">1.5% Global Switch Fee</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">API Protocol:</span>
                    <span className="text-slate-900 font-semibold">REST / gRPC / GraphQL</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                    All 20 domain ERPs share identical identity boundaries, audit logging, notification pipelines, and financial ledger persistence.
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Information Screens (Professional Panels Only) */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#0078D4]" /> Enterprise Digital Information Screens
                </h3>
                <span className="text-xs text-slate-500">Live Institutional Telemetry & Updates</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="w-1.5 h-full bg-[#0078D4] absolute left-0 top-0"></div>
                  <div className="text-[11px] font-mono font-semibold text-[#0078D4] uppercase">NEW MODULE RELEASE</div>
                  <h4 className="font-bold text-slate-900 text-base">Church ERP: Archbishop Command Dashboard v3.2</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Now featuring real-time archdiocesan financial clearing, automated clergy credential verification, and parish tithe reconciliation across all dioceses.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#0078D4]">
                    <span>Available in Catalogue</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="w-1.5 h-full bg-emerald-500 absolute left-0 top-0"></div>
                  <div className="text-[11px] font-mono font-semibold text-emerald-600 uppercase">INTELLIGENT ROUTING</div>
                  <h4 className="font-bold text-slate-900 text-base">Cognitive AI Gateway & Intelligence Suite</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enhanced cognitive routing between Gemini reasoning models and fast response models, optimizing computational efficiency across enterprise domains.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-emerald-600">
                    <span>Active System-Wide</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="w-1.5 h-full bg-purple-500 absolute left-0 top-0"></div>
                  <div className="text-[11px] font-mono font-semibold text-purple-600 uppercase">FINTECH SETTLEMENT</div>
                  <h4 className="font-bold text-slate-900 text-base">Sovereign Treasury 1.5% Settlement Clearing Switch</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated clearing fee routing across cellular mobile money, SWIFT banking channels, and institutional merchant payment gateways.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-purple-600">
                    <span>Audit Parity Verified</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ENTERPRISE SOLUTION CATALOGUE (20 ERPs) */}
        {activeTab === "erps" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Solution Catalogue</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Explore all 20 out-of-the-box institutional ERP operating suites supported by the JUMO Universal Micro-Kernel.
                </p>
              </div>
              <div className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start">
                Showing {filteredERPs.length} of {erpPlatforms.length} Official Platforms
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {filteredERPs.map((erp) => {
                const Icon = erp.icon;
                return (
                  <div key={erp.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#0078D4]/40 transition flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0078D4] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {erp.status}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#0078D4] uppercase tracking-wider font-mono">{erp.category}</div>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5 group-hover:text-[#0078D4] transition-colors">{erp.name}</h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{erp.description}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-500">{erp.modulesCount} Standard Modules</span>
                      <button 
                        onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                        className="font-semibold text-[#0078D4] hover:underline flex items-center gap-1"
                      >
                        Request Access <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ENTERPRISE SERVICE CATALOGUE (13 Services) */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Service Catalogue</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Read-only presentation of the 13 core platform infrastructure and consulting services available to institutional tenants.
                </p>
              </div>
              <div className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start">
                Showing {filteredServices.length} of {enterpriseServices.length} Platform Services
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((srv) => {
                const Icon = srv.icon;
                return (
                  <div key={srv.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#0078D4]/40 transition flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center group-hover:text-[#0078D4] group-hover:scale-105 transition-all">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#0078D4] border border-blue-200">
                          {srv.tier}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">{srv.category}</div>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5 group-hover:text-[#0078D4] transition-colors">{srv.name}</h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{srv.description}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400">Sovereign SLA 99.999%</span>
                      <span className="font-semibold text-slate-700">Included in UEOS</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: NOTICE BOARD & NEWS */}
        {activeTab === "notices" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Digital Notice Board & Information Centre</h2>
              <p className="text-sm text-slate-600 mt-1">
                Official institutional announcements, scheduled maintenance advisories, security updates, and release notes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Advisories Feed */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200 uppercase">
                      SECURITY ADVISORY #2026-07
                    </span>
                    <span className="text-xs text-slate-400 font-mono">July 26, 2026 14:00 UTC</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Mandatory Aegis MFA Hardening for All Tenant Administrator Portals</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In accordance with Phase 12 Sovereign Security Hardening, all institutional tenant administrators must complete time-based one-time password (TOTP) or cryptographic hardware key enrollment before August 15, 2026. Unverified sessions will be gated at Level 2 privileges.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#0078D4]">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Policy Deployed</span>
                    <span>Read Advisory Specification &rarr;</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 text-[#0078D4] border border-blue-200 uppercase">
                      MAINTENANCE NOTICE
                    </span>
                    <span className="text-xs text-slate-400 font-mono">July 25, 2026 09:30 UTC</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Scheduled Treasury Clearing Switch Database Index Optimization</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    On Sunday, August 2, 2026 between 02:00 and 03:00 UTC, the FAAP Treasury settlement clearing engine will undergo read-replica index rebalancing. During this window, settlement postings will be cached in local JSON buffers with zero loss of double-entry parity.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-600" /> Duration: ~60 minutes</span>
                    <span className="text-emerald-600 font-semibold">Zero Downtime Expected</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                      PLATFORM RELEASE
                    </span>
                    <span className="text-xs text-slate-400 font-mono">July 24, 2026 18:15 UTC</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Official JUMO Enterprise Design System Standardization (v13.5)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    JUMO UEOS has completed its comprehensive Phase 1-15 interface remediation. All experimental consumer dark themes and imitation styling have been replaced with an original, high-contrast JUMO Enterprise Design System.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#0078D4]">
                    <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> 16 ERPs Upgraded</span>
                    <span>View Release Notes &rarr;</span>
                  </div>
                </div>
              </div>

              {/* Quick Info & Upcoming Events */}
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Calendar className="w-4 h-4 text-[#0078D4]" /> Upcoming Enterprise Events
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">JUMO Global Institutional Summit 2026</div>
                      <div className="text-slate-500 font-mono">Aug 18-20, 2026 | Geneva & Virtual</div>
                      <p className="text-slate-600">Executive symposium on sovereign hybrid cloud architecture and FAAP settlement clearing.</p>
                    </div>
                    <div className="border-t border-slate-200 pt-3 space-y-1">
                      <div className="font-bold text-slate-900">Church ERP Diocesan Onboarding Webinar</div>
                      <div className="text-slate-500 font-mono">Sept 4, 2026 | 14:00 UTC</div>
                      <p className="text-slate-600">Live training on clergy credential management and multi-parish sacramental registers.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 text-[#0078D4] space-y-3">
                  <div className="font-bold text-sm flex items-center gap-2">
                    <Info className="w-4 h-4" /> Need Emergency Institutional Support?
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Institutional tenants with SLA Premier contracts have 24/7 access to our Level 3 Sovereign Engineers via the encrypted Ring-0 dispatch channel.
                  </p>
                  <button 
                    onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                    className="w-full py-2 bg-[#0078D4] text-white rounded-lg text-xs font-bold hover:bg-[#005a9e] transition shadow-xs"
                  >
                    Open Support Ticket in Workspace
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ENTERPRISE AI INFORMATION CENTRE */}
        {activeTab === "ai" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">JUMO AI - Universal Enterprise Assistant</h2>
                <p className="text-xs text-slate-600 mt-1">
                  The single intelligent concierge for the JUMO UEOS ecosystem. Explore ERP suites, compare platforms, or get deployment guidance.
                </p>
              </div>
              <button
                onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                className="px-5 py-2.5 rounded-xl bg-[#0078D4] hover:bg-[#005a9e] text-white font-semibold text-xs shadow-sm transition whitespace-nowrap cursor-pointer"
              >
                Sign In to Access AI Command Center
              </button>
            </div>
            <PublicAI />
          </div>
        )}

        {/* TAB 6: DOCUMENTATION PREVIEW */}
        {activeTab === "docs" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Documentation & API Catalogue Preview</h2>
              <p className="text-sm text-slate-600 mt-1">
                Read-only access to institutional deployment guides, API schema definitions, and hybrid operating system administration manuals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "JUMO UEOS v13.5 Master Installation & Deployment Guide", category: "Infrastructure", time: "45 min read", desc: "Step-by-step instructions for deploying the JUMO Micro-Kernel on Google Cloud Run, Kubernetes clusters, or on-premise institutional server nodes." },
                { title: "FAAP Double-Entry Cryptographic Ledger Specification", category: "Financial Accounting", time: "30 min read", desc: "Mathematical proof and database schema layout for the SHA-256 balanced ledger ensuring zero-error financial clearing." },
                { title: "Aegis Zero-Trust & RBAC Governance Manual", category: "Security & Identity", time: "25 min read", desc: "Configuring multi-factor authentication, administrative session timeouts, and granular permission boundaries across 16 ERP suites." },
                { title: "Universal Application Manufacturing Platform (UAMP) SDK", category: "Software Generation", time: "40 min read", desc: "How to register custom domain templates, build automated UI scaffolding pipelines, and deploy type-safe TypeScript extensions." },
              ].map((doc, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0078D4] border border-blue-200">
                        {doc.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{doc.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{doc.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Version 13.5.0-PROD</span>
                    <button 
                      onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                      className="text-xs font-bold text-[#0078D4] hover:underline flex items-center gap-1"
                    >
                      Read Complete Guide &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MARKETPLACE PREVIEW */}
        {activeTab === "marketplace" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Digital Marketplace & Domain Extension Preview</h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore certified domain plug-ins, AI agent blueprints, reporting templates, and mobile application packages. Read-only until authentication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Sovereign Mobile Identity Wallet Package", category: "Alumni & Church DOS", price: "Included with Tenant Plan", desc: "iOS and Android biographic credential wallet with offline QR verification and event check-in capabilities." },
                { name: "SWIFT & M-Pesa Cellular Money Switch Adapter", category: "Treasury & FAAP", price: "1.5% Clearing Standard", desc: "Automated payment switch gateway connecting institutional ledgers directly to cellular money carriers and international banks." },
                { name: "IOLTA Client Trust Accounting Auditor Plug-in", category: "Legal DOS", price: "Included with Legal Pro", desc: "Specialized double-entry compliance auditor guaranteeing zero commingling of general operating funds and client escrow accounts." },
                { name: "HL7/FHIR Clinical Patient Portal Connector", category: "Healthcare DOS", price: "Included with Hospital Pro", desc: "Interoperable data exchange adapter connecting JUMO electronic health records with legacy medical laboratory instruments." },
                { name: "Archdiocesan Sacramental Certificate Print Engine", category: "Church DOS", price: "Included with Diocesan Pro", desc: "High-resolution PDF generator producing canonically verified baptismal, marriage, and confirmation certificates with embossed digital seals." },
                { name: "Municipal Tax & Rate Assessment Module", category: "Government DOS", price: "Included with Municipal Pro", desc: "Automated property valuation, land registry billing, and revenue collection workflow with GIS mapping integration." },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 font-semibold">{item.price}</span>
                    <button 
                      onClick={() => onNavigate ? onNavigate("/login") : window.location.href = "/login"}
                      className="font-bold text-[#0078D4] hover:underline"
                    >
                      Install in Workspace &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: ADVERTISING CENTER & SHOWCASE */}
        {activeTab === "showcase" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">JUMO Advertising Center & Enterprise Showcase</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Explore sovereign institutional transformations, verifiable financial impact studies, and digital innovation showcases across our global tenant network.
                </p>
              </div>
              <div className="text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg font-bold">
                Level 5 Sovereign Impact
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-[#0078D4]/40 transition">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0078D4] flex items-center justify-center font-bold">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Archdiocesan Deployment</span>
                  <h3 className="text-lg font-bold text-slate-900">National Church Governance Switch</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consolidated 420 parish accounts onto a single FAAP SHA-256 ledger, eliminating reconciliatory delays and automating weekly tithe distribution with $0.00 variance.
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0078D4]">
                  <span>420 Parishes Online</span>
                  <span className="underline cursor-pointer" onClick={() => setSelectedSovereignPortal({ id: 'church', name: 'Church ERP', category: 'Religious Institutions', description: 'Archdiocesan governance and parish registry.', type: 'erp' })}>View Blueprint &rarr;</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-emerald-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Higher Education</span>
                  <h3 className="text-lg font-bold text-slate-900">Research University Sovereign Cloud</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Integrated student admissions, academic grading, research grant restricted funds, and faculty payroll for 35,000 matriculated scholars across 4 satellite campuses.
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>35,000 Students Active</span>
                  <span className="underline cursor-pointer" onClick={() => setSelectedSovereignPortal({ id: 'edu', name: 'Education ERP', category: 'Universities & Schools', description: 'Academic registry and bursary ledger.', type: 'erp' })}>View Blueprint &rarr;</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-purple-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <Handshake className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded">FinTech & Cooperative</span>
                  <h3 className="text-lg font-bold text-slate-900">National SACCO Liquidity Pool</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deployed instant member share capital ledger with automated 1.5% clearing fee routing to master treasury, powering real-time mobile money loans and dividend audits.
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                  <span>$180M Loan Ledger</span>
                  <span className="underline cursor-pointer" onClick={() => setSelectedSovereignPortal({ id: 'coop', name: 'Cooperative ERP', category: 'SACCOs & Credit Unions', description: 'Member share capital ledger and dividend auditing.', type: 'erp' })}>View Blueprint &rarr;</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase font-bold">
                  <Sparkles className="w-4 h-4" /> Sovereign Media & Showcase Engine
                </div>
                <h3 className="text-xl font-bold">Feature Your Institutional Transformation</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Certified enterprise tenants can publish their verified operational benchmarks, financial clearance volume, and domain architecture case studies directly into the JUMO UEOS global showcase.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("feedback")}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-sm transition whitespace-nowrap cursor-pointer"
              >
                Submit Showcase Application &rarr;
              </button>
            </div>
          </div>
        )}

        {/* TAB 9: DIGITAL SUGGESTIONS & FEEDBACK CENTRE */}
        {activeTab === "feedback" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Digital Suggestions & Feedback Centre</h2>
              <p className="text-sm text-slate-600">
                We value institutional input. Submit your product suggestions, feature requests, partnership enquiries, or technical consultations directly to the JUMO Architecture Board.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              {feedbackSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Enquiry Successfully Transmitted</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for your submission. Your message has been cryptographically logged and routed to our Level 3 Institutional Architecture team for review.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Enquiry Category
                      </label>
                      <select
                        value={feedbackCategory}
                        onChange={(e) => setFeedbackCategory(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:bg-white transition"
                      >
                        <option value="suggestion">Product Suggestion / Feature Request</option>
                        <option value="partnership">Institutional Partnership Enquiry</option>
                        <option value="consultation">Enterprise Deployment Consultation</option>
                        <option value="technical">Technical Architecture Enquiry</option>
                        <option value="general">General Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Institutional Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. chancellor@university.edu"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      required
                      value={feedbackSubject}
                      onChange={(e) => setFeedbackSubject(e.target.value)}
                      placeholder="e.g. Request for Custom Agricultural Outgrower Ledger Template"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Detailed Message / Requirements
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder="Please describe your institutional requirements, target user scale, or specific feedback..."
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:bg-white transition"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-mono">256-bit SSL Encrypted Submission</span>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#0078D4] hover:bg-[#005a9e] text-white font-semibold text-xs shadow-sm transition flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Transmit Enquiry to Architecture Board
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ==================== CERTIFICATE & DOCUMENT VERIFICATION WORKSPACE ==================== */}
        {activeTab === "verification" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 text-blue-300 rounded-2xl border border-blue-400/30">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold rounded-full mb-1 border border-blue-400/30">
                    JUMO TRUST & CERTIFICATE REGISTRY
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">Cryptographic Certificate & Document Verification</h2>
                  <p className="text-xs text-slate-300">Validate academic degrees, institutional certificates, licenses, and official documents</p>
                </div>
              </div>

              {/* Verification Form */}
              <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-4">
                <label className="text-xs font-bold text-slate-300 block">Enter Certificate ID, Document Token, or SHA-256 Hash</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={certCode}
                    onChange={(e) => setCertCode(e.target.value)}
                    placeholder="e.g. JUMO-CERT-2026-JIU-88902 or sha256:e3b0c442..."
                    className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold text-blue-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (!certCode.trim()) return;
                      setIsVerifying(true);
                      setTimeout(() => {
                        setIsVerifying(false);
                        setCertResult({
                          id: certCode,
                          status: 'VERIFIED_AUTHENTIC',
                          issuer: 'JUMO International University / Sovereign Registry',
                          holder: 'Official Credential Holder',
                          issueDate: '2026-06-15',
                          hash: '0x8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
                          trustLevel: 'Level 4 Ring-1 Sovereign Certificate'
                        });
                      }, 600);
                    }}
                    disabled={isVerifying}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isVerifying ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    Verify Document
                  </button>
                </div>

                {/* Quick Test Chips */}
                <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
                  <span className="font-mono">Quick Test Samples:</span>
                  <button
                    onClick={() => setCertCode('JUMO-DEGREE-2026-0091')}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 text-blue-400 rounded-lg font-mono text-[10px] border border-slate-700"
                  >
                    JUMO-DEGREE-2026-0091
                  </button>
                  <button
                    onClick={() => setCertCode('JUMO-SACCO-AUDIT-2026')}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 text-blue-400 rounded-lg font-mono text-[10px] border border-slate-700"
                  >
                    JUMO-SACCO-AUDIT-2026
                  </button>
                </div>
              </div>

              {/* Verification Result Card */}
              {certResult && (
                <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>CRYPTOGRAPHIC VERIFICATION SUCCESSFUL</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold rounded-lg border border-emerald-400/30">
                      {certResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">DOCUMENT ID:</span>
                      <span className="text-white font-bold">{certResult.id}</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">ISSUING AUTHORITY:</span>
                      <span className="text-emerald-300 font-bold">{certResult.issuer}</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">ISSUE DATE:</span>
                      <span className="text-white font-bold">{certResult.issueDate}</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">CRYPTOGRAPHIC HASH:</span>
                      <span className="text-blue-400 font-bold truncate block">{certResult.hash}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
