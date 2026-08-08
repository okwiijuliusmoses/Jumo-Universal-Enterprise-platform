import jumoNewLogo from "../branding/JUMO NEW LOGO.png";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";
import { 
  Shield, 
  Globe, 
  Layers, 
  ArrowRight, 
  Building2, 
  Cpu, 
  CheckCircle2, 
  ChevronRight,
  User,
  Key,
  Loader2,
  Terminal,
  Search,
  Sparkles,
  Bot,
  Send,
  MessageSquare,
  Megaphone,
  Briefcase,
  BookOpen,
  Filter,
  X,
  ExternalLink,
  Lock,
  Activity,
  Server,
  Database,
  ShoppingCart,
  Users,
  Fingerprint,
  Zap,
  ShieldAlert,
  ScrollText,
  Phone,
  Settings,
  BrainCircuit,
  HelpCircle,
  FileText,
  AlertTriangle
} from "lucide-react";

interface PublicGatewayProps {
  onLoginSuccess: (user: any) => void;
}

// Defining the Customization Branding Profiles
interface InstitutionProfile {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  category: "Education" | "Healthcare" | "Financial" | "Government";
  themeAccent: string;
  logoChar: string;
  services: Array<{ title: string; desc: string; secure: boolean; code: string }>;
  news: Array<{ title: string; date: string; category: string; snippet: string }>;
  notices: Array<{ title: string; level: "urgent" | "info"; date: string }>;
  campaign: { title: string; imageDesc: string; actionText: string };
  contact: string;
}

const INSTITUTIONS: Record<string, InstitutionProfile> = {
  jumo: {
    id: "jumo",
    name: "JUMO UNIVERSAL ENTERPRISE PLATFORM",
    shortName: "JUMO UEOS Core",
    tagline: "Sovereign digital operating system for high-trust national infrastructures.",
    category: "Government",
    themeAccent: "#2563eb", // Sovereign Blue
    logoChar: "J",
    services: [
      { title: "Platform Sandbox", desc: "Test secure transaction states and zero-trust workflows.", secure: true, code: "SVC-SANDBOX" },
      { title: "Ecosystem Registries", desc: "Inspect national institutional registration and AI schemas.", secure: true, code: "SVC-REGISTRIES" },
      { title: "National Clearing Portal", desc: "Audit cross-carrier fintech fee structures and ledger parity.", secure: true, code: "SVC-CLEARING" },
      { title: "Sovereign Cloud Management", desc: "Monitor node clusters and cluster health diagnostics.", secure: true, code: "SVC-CLOUD" }
    ],
    news: [
      { title: "JUMO UEOS Phase 13 Core Baseline Confirmed", date: "2026-08-07", category: "System Release", snippet: "The National Security Advisory Council approved JUMO UEOS 13.0 as the unified government cloud standard." },
      { title: "Zero-Trust Security AEGIS Update Distributed", date: "2026-08-06", category: "Security", snippet: "AEGIS identity protocols upgraded with dual-signature biometric simulations for administrative gates." }
    ],
    notices: [
      { title: "Universal clearing rules updated for regional mobile carriers.", level: "info", date: "Today" },
      { title: "Scheduled cloud node maintenance in sector-4.", level: "urgent", date: "Tomorrow" }
    ],
    campaign: {
      title: "National Digital Sovereignty Initiative 2026",
      imageDesc: "Empowering 12 sovereign ministries with shared ledger databases and zero-trust identity gates.",
      actionText: "Request Platform Credentials"
    },
    contact: "secops@jumo.net"
  },
  makerere: {
    id: "makerere",
    name: "MAKERERE UNIVERSITY ENTERPRISE PLATFORM",
    shortName: "Makerere University",
    tagline: "Dynamic academic portal powered by JUMO Higher Education ERP blueprint.",
    category: "Education",
    themeAccent: "#047857", // Deep Green branding
    logoChar: "M",
    services: [
      { title: "Admissions Gateway", desc: "Submit and track national student enrollment applications.", secure: false, code: "SVC-ADMISSIONS" },
      { title: "Student Services Ledger", desc: "Register courses, request grading audits, and view semester status.", secure: true, code: "SVC-STUDENTS" },
      { title: "Academic Research Registry", desc: "Search and index published journals and institutional libraries.", secure: false, code: "SVC-RESEARCH" },
      { title: "FAAP Bursary & Tuition Clearance", desc: "Settle semester tuition via cellular money or credit network.", secure: true, code: "SVC-FAAP" }
    ],
    news: [
      { title: "Admissions Portal Opened for Fall 2026 Semester", date: "2026-08-05", category: "Academic", snippet: "All prospective students are instructed to submit biometric files via JUMO identity gates." },
      { title: "FAAP Direct Bursar Routing Operational", date: "2026-08-03", category: "Financial", snippet: "Makerere has fully integrated tuition collection into the FAAP ledger, reducing settlement latency." }
    ],
    notices: [
      { title: "Tuition clearance deadline strictly set for end of current month.", level: "urgent", date: "Aug 31" },
      { title: "Notice: Campus local database migration successfully synced to JUMO Cloud.", level: "info", date: "Aug 02" }
    ],
    campaign: {
      title: "Centennial Research Funding Allocations",
      imageDesc: "Grants managed transparently via JUMO Ledger smart contract schemas.",
      actionText: "Submit Research Grant Proposals"
    },
    contact: "bursar@makerere.jumo.net"
  },
  mulago: {
    id: "mulago",
    name: "MULAGO NATIONAL REFERRAL HOSPITAL ERP",
    shortName: "Mulago Hospital",
    tagline: "Clinical intelligence, patient registries, and pharmaceutical ledger integration.",
    category: "Healthcare",
    themeAccent: "#b91c1c", // Clinical Red
    logoChar: "H",
    services: [
      { title: "Patient Intake Registry", desc: "Register biometric files and view sovereign medical history.", secure: true, code: "SVC-PATIENTS" },
      { title: "Outpatient Booking", desc: "Schedule expert consultations and specialized scan appointments.", secure: false, code: "SVC-BOOKING" },
      { title: "Sovereign EMR Search", desc: "Securely retrieve medical files filtered by authorized practitioners.", secure: true, code: "SVC-EMR" },
      { title: "Pharmaceutical Stock Auditor", desc: "Monitor national drug distribution chains and supply integrity.", secure: true, code: "SVC-PHARMA" }
    ],
    news: [
      { title: "Mulago Deploys Real-Time Vaccine Tracking", date: "2026-08-06", category: "Clinical", snippet: "The tracking utilizes JUMO supply chain sensors and decentralized ledger logging to secure batches." },
      { title: "Electronic Medical Records Compliance Rate Reaches 100%", date: "2026-08-04", category: "Compliance", snippet: "Integration of the JUMO AEGIS patient permission boundary eliminates unauthorized file access." }
    ],
    notices: [
      { title: "Intake forms updated with standardized national allergy codes.", level: "info", date: "Today" },
      { title: "Critical stock notice: Pediatric tetanus vaccines reallocated to Sector B.", level: "urgent", date: "Today" }
    ],
    campaign: {
      title: "Universal Citizen Medical Records Portal",
      imageDesc: "Control your biometric medical files through JUMO permission gates.",
      actionText: "Register Medical Profile"
    },
    contact: "intake@mulago.jumo.net"
  },
  wazalendo: {
    id: "wazalendo",
    name: "WAZALENDO FINANCIAL COOPERATIVE SACCO",
    shortName: "Wazalendo SACCO",
    tagline: "Decentralized credit origination, mobile deposits, and dividend ledger audits.",
    category: "Financial",
    themeAccent: "#d97706", // Amber Financial
    logoChar: "W",
    services: [
      { title: "Member Share Ledger", desc: "Inspect active equity deposits and real-time interest yields.", secure: true, code: "SVC-SHARES" },
      { title: "Mobile Money Deposit Gateway", desc: "Disburse and deposit capital instantly via MTN or Airtel.", secure: true, code: "SVC-FINTECH" },
      { title: "Autonomous Loan Calculator", desc: "Simulate interest repayment structures using risk metrics.", secure: false, code: "SVC-LOANS" },
      { title: "Dividend Settlement Panel", desc: "Track scheduled annual cooperative payouts and balance parity.", secure: true, code: "SVC-DIVIDENDS" }
    ],
    news: [
      { title: "Wazalendo Declares Record $4.2M Dividend Pool", date: "2026-08-07", category: "Annual Report", snippet: "Payouts routed through JUMO Digital Pay settled instantly into 12,450 mobile wallets within 200ms." },
      { title: "Risk-Rating AI Algorithms Fully Operational", date: "2026-08-05", category: "FinTech AI", snippet: "Loan approvals are now pre-audited by JUMO-PEA-001 systems, securing repayment structures." }
    ],
    notices: [
      { title: "Annual General Assembly meeting scheduled online.", level: "info", date: "Aug 15" },
      { title: "Regulatory limit for cellular withdrawals increased to $5,000/day.", level: "info", date: "Aug 01" }
    ],
    campaign: {
      title: "Secure Enterprise Agricultural Growth Loan",
      imageDesc: "Guaranteed interest capped at 4.5% for local food distribution cooperatives.",
      actionText: "Apply For Agro Loan"
    },
    contact: "treasury@wazalendo.jumo.net"
  }
};

export function PublicGateway({ onLoginSuccess }: PublicGatewayProps) {
  const [institutions, setInstitutions] = useState<Record<string, InstitutionProfile>>(INSTITUTIONS);
  // Configurable dynamic selected institution
  const [selectedInstKey, setSelectedInstKey] = useState<string>("jumo");
  const inst = institutions[selectedInstKey] || institutions.jumo || INSTITUTIONS.jumo;

  useEffect(() => {
    async function loadInstances() {
      try {
        const instances = await UEOSRuntimeClient.fetchInstances();
        if (instances && Array.isArray(instances)) {
          const mapped: Record<string, InstitutionProfile> = { ...INSTITUTIONS };
          instances.forEach((instance: any) => {
            const id = instance.id.toLowerCase().replace(/[^a-z0-9]/g, '');
            // Deduce categories and theme colors dynamically
            const category = instance.ecosystemId?.toLowerCase().includes("edu") ? "Education" :
                             instance.ecosystemId?.toLowerCase().includes("health") ? "Healthcare" :
                             instance.ecosystemId?.toLowerCase().includes("sacco") || instance.ecosystemId?.toLowerCase().includes("fin") || instance.ecosystemId?.toLowerCase().includes("mfi") ? "Financial" : "Government";
                             
            const themeAccent = category === "Education" ? "#047857" :
                                category === "Healthcare" ? "#b91c1c" :
                                category === "Financial" ? "#d97706" : "#2563eb";

            const publicConfig = instance.configuration?.publicExperience || {};
            
            mapped[id] = {
              id,
              name: instance.name.toUpperCase(),
              shortName: instance.name,
              tagline: publicConfig.tagline || `${instance.name} is a high-trust sovereign enterprise platform compiled under JUMO UEOS kernel standard.`,
              category,
              themeAccent,
              logoChar: instance.name.charAt(0).toUpperCase(),
              services: (instance.configuration?.portals || []).flatMap((p: any) => 
                (p.modules || []).map((m: any, idx: number) => ({
                  title: `${m} Access`,
                  desc: `Secure gateway access for ${m} operations in ${p.name}.`,
                  secure: true,
                  code: `SVC-${p.id?.toUpperCase() || "PORTAL"}-${idx}`
                }))
              ).slice(0, 4),
              news: [
                { 
                  title: `${instance.name} Platform Instance Compiled`, 
                  date: instance.createdAt ? instance.createdAt.split('T')[0] : new Date().toISOString().split('T')[0], 
                  category: "System Launch", 
                  snippet: `Sovereign deployment of ${instance.name} has successfully compiled. Verified under JUMO UEOS v13-LOCKED.` 
                },
                { 
                  title: `Zero-Trust Identity Gates Active`, 
                  date: instance.createdAt ? instance.createdAt.split('T')[0] : new Date().toISOString().split('T')[0], 
                  category: "Security", 
                  snippet: `AEGIS role-based access controllers are now actively gating all ${instance.name} service portals.` 
                }
              ],
              notices: [
                { title: `All transactional services resolved securely via standard FAAP Ledger framework.`, level: "info", date: "Today" },
                { title: `Audit parity checked successfully with zero-offset balancing active.`, level: "info", date: "Today" }
              ],
              campaign: {
                title: `${instance.name} Citizen Digital Services`,
                imageDesc: publicConfig.description || `Access secure applications, process payments, and verify documents.`,
                actionText: "Access Portal"
              },
              contact: `secops@${id}.jumo.net`
            };
          });
          setInstitutions(mapped);
        }
      } catch (err) {
        console.error("Failed to load manufactured instances in Public Gateway:", err);
      }
    }
    loadInstances();
  }, []);

  const [view, setView] = useState<"landing" | "marketplace" | "ai" | "search" | "login" | "register">("landing");
  const [aiOpen, setAiOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDetailService, setActiveDetailService] = useState<any | null>(null);

  // Security Simulation State
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  // AI Manufacturing Telemetry
  const [aiAgentTelemetry, setAiAgentTelemetry] = useState({
    activeAgents: 5,
    generationQueue: "IDLE",
    lastPageUpdate: new Date().toLocaleTimeString(),
    accessibilityRating: "99.98% (WCAG AA Locked)",
    brandCompliance: "100% STRICT"
  });

  // Selected Services matching search
  const filteredServices = inst.services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccessSecureService = (s: any) => {
    if (s.secure) {
      setSecurityNotice(`Access Denied: "${s.title}" is protected by JUMO Zero-Trust AEGIS boundaries. Authentication Signature Required.`);
      setTimeout(() => {
        setView("login");
        setSecurityNotice(null);
      }, 2500);
    } else {
      setActiveDetailService(s);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 overflow-x-hidden flex flex-col justify-between" id="ueos-public-viewport">
      <div>
        {/* FIXED ENTERPRISE HEADER */}
        <header className="fixed top-0 left-0 right-0 h-24 bg-slate-950 border-b border-slate-900 z-50 flex items-center justify-between px-6 md:px-16 text-white shadow-xl" id="ueos-fixed-header">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setView("landing"); setSelectedInstKey("jumo"); }} id="ueos-header-logo-container">
            <img
              src={jumoNewLogo}
              alt="JUMO UNIVERSAL ENTERPRISE PLATFORM"
              className="w-12 h-12 md:w-14 md:h-14 object-contain shrink-0"
              width={56}
              height={56}
            />
            <div>
              <span className="font-black text-xs md:text-sm tracking-tight text-white block uppercase">JUMO UNIVERSAL ENTERPRISE PLATFORM</span>
              <span className="text-[9px] text-blue-500 font-bold uppercase tracking-[0.2em]">{inst.shortName} Layer</span>
            </div>
          </div>
          
          {/* Centre Navigation */}
          <div className="hidden lg:flex items-center gap-6 text-[10px] text-slate-400 font-black uppercase tracking-widest" id="ueos-header-nav">
            <button onClick={() => { setView("landing"); }} className={`hover:text-blue-500 transition-colors ${view === "landing" ? "text-blue-500" : ""}`}>About</button>
            <button onClick={() => { setView("landing"); const el = document.getElementById("services-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-blue-500 transition-colors">Services</button>
            <button onClick={() => { setView("search"); }} className="hover:text-blue-500 transition-colors">Institutions</button>
            <button onClick={() => { setView("marketplace"); }} className={`hover:text-blue-500 transition-colors ${view === "marketplace" ? "text-blue-500" : ""}`}>Digital Services</button>
            <button onClick={() => { setView("landing"); const el = document.getElementById("info-hub-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-blue-500 transition-colors">News</button>
            <button onClick={() => { setView("landing"); const el = document.getElementById("footer-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-blue-500 transition-colors">Support</button>
          </div>

          {/* Right Action Block */}
          <div className="flex items-center gap-4" id="ueos-header-actions">
            <select 
              className="bg-slate-900 text-slate-300 text-[10px] font-bold border border-slate-800 rounded-lg px-2 py-1 outline-none hidden sm:block"
              aria-label="Select Language"
            >
              <option>EN (Sovereign)</option>
              <option>FR (Sovereign)</option>
              <option>ES (Sovereign)</option>
            </select>
            
            <div className="hidden xl:flex flex-col items-end gap-0.5">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Front Desk AI</span>
              <div className="flex items-center gap-2 text-[9px] text-emerald-400 font-bold uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
              </div>
            </div>

            <button 
              onClick={() => setView("login")} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md shadow-blue-900/20"
              id="btn-portal-login"
            >
              Portal Login
            </button>
          </div>
        </header>

        {/* FACTORY PLAYGROUND CONTROLLER (Institution Branding Customization Layer Selector) */}
        <div className="pt-24 bg-slate-900 border-b border-slate-800 py-3.5 px-6 md:px-16 text-white flex flex-col md:flex-row items-center justify-between gap-4" id="ueos-factory-playground-control">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-blue-500 shrink-0" />
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block">ERP Manufacturing Factory</span>
              <span className="text-xs font-bold text-white">Dynamic Institution Branding Customization Layer</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.keys(INSTITUTIONS).map((key) => (
              <button
                key={key}
                onClick={() => { setSelectedInstKey(key); setView("landing"); }}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${
                  selectedInstKey === key
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {INSTITUTIONS[key].shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Security Notification Banner */}
        <AnimatePresence>
          {securityNotice && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-50 text-red-800 border-b border-red-200 px-6 py-4 flex items-center justify-between gap-4 font-bold text-xs"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                <span>{securityNotice}</span>
              </div>
              <button onClick={() => setSecurityNotice(null)}><X className="w-4 h-4 text-red-800" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN BODY VIEW ROUTING */}
        <main className="min-h-[600px]" id="ueos-public-main-content">
          <AnimatePresence mode="wait">
            {view === "landing" && (
              <motion.div 
                key="landing" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="space-y-16"
              >
                {/* HERO SECTION */}
                <section 
                  className="relative px-6 md:px-16 py-28 md:py-40 text-slate-900 border-b border-slate-200 bg-slate-50 overflow-hidden" 
                  id="hero-section"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent)] pointer-events-none" />
                  
                  <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-3xl space-y-8 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-full">
                        <Shield className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-[9px] font-black uppercase tracking-widest">JUMO National ERP Standard</span>
                      </div>

                      <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tight leading-none uppercase">
                          {inst.name}
                        </h1>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl italic">
                          {inst.tagline}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <button 
                          onClick={() => { const el = document.getElementById("services-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest px-8 py-4.5 rounded-2xl transition-all shadow-lg shadow-blue-600/15 flex items-center justify-center gap-2.5"
                        >
                          Access Service Portals <ArrowRight className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setView("login")}
                          className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-black text-[10px] uppercase tracking-widest px-8 py-4.5 rounded-2xl transition-all shadow-sm"
                        >
                          Authenticate Identity
                        </button>
                        <button 
                          onClick={() => setAiOpen(true)}
                          className="bg-slate-950 hover:bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest px-8 py-4.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2.5"
                        >
                          Inquire with Front Desk AI <Bot className="w-4 h-4 text-blue-500" />
                        </button>
                      </div>
                    </div>

                    {/* Standardized Branding Card */}
                    <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[3rem] p-10 shadow-xl flex flex-col justify-between shrink-0 relative">
                      <div className="absolute top-6 right-6 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[8px] font-black uppercase tracking-widest rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> COMPLIANT
                      </div>

                      <div className="space-y-6">
                        <img
                          src={jumoNewLogo}
                          alt="JUMO UNIVERSAL ENTERPRISE PLATFORM"
                          width={100}
                          height={100}
                          className="w-[100px] h-[100px] object-contain shrink-0"
                        />

                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Customization Profile</span>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">{inst.shortName}</h3>
                          <span className="text-xs font-bold text-slate-500 block">Category: {inst.category} Ecosystem</span>
                        </div>

                        <div className="space-y-3.5 border-t border-slate-100 pt-6">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400 font-bold uppercase text-[9px]">Layout System</span>
                            <span className="text-slate-900 font-black uppercase text-[9px]">JUMO LOCKED</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400 font-bold uppercase text-[9px]">Access Control</span>
                            <span className="text-slate-900 font-black uppercase text-[9px]">Zero-Trust Gated</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400 font-bold uppercase text-[9px]">Secure Certs</span>
                            <span className="text-emerald-600 font-black uppercase text-[9px]">VERIFIED (JUMO-13)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ENTERPRISE SERVICE HUB */}
                <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto space-y-12" id="services-section">
                  <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
                    <div>
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] block">Ecosystem Services</span>
                      <h2 className="text-3xl font-black text-slate-950 tracking-tight uppercase mt-1">Enterprise Service Catalogue</h2>
                      <p className="text-slate-500 font-medium text-xs mt-1">Manufactured and provisioned directly from the JUMO {inst.category} ERP Blueprint.</p>
                    </div>

                    {/* Service Search Bar */}
                    <div className="relative w-full max-w-md shrink-0">
                      <Search className="w-4 h-4 absolute left-4.5 top-3.5 text-slate-400" />
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search services (e.g. ${inst.services[0]?.title || "Tuition"})...`}
                        className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 text-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredServices.map((s, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => handleAccessSecureService(s)}
                        className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-500 transition-all flex flex-col justify-between min-h-[220px] cursor-pointer group relative overflow-hidden"
                      >
                        {s.secure && (
                          <div className="absolute top-4 right-4 text-blue-600">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="space-y-4">
                          <div className="w-10 h-10 bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-xl flex items-center justify-center transition-all">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-black text-xs text-slate-900 uppercase tracking-widest">{s.title}</h3>
                            <p className="text-slate-500 text-[10px] font-semibold italic mt-2 leading-relaxed">{s.desc}</p>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[8px] font-black tracking-widest text-slate-400 uppercase group-hover:text-blue-600 transition-colors">
                          <span>{s.secure ? "SECURE PORTAL" : "OPEN ACCESS"}</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                    {filteredServices.length === 0 && (
                      <div className="col-span-full py-12 text-center text-slate-400 text-xs italic">
                        No services matching "{searchQuery}" manufactured in the current profile.
                      </div>
                    )}
                  </div>
                </section>

                {/* JUMO PUBLIC EXPERIENCE AI DIVISION CONSOLE */}
                <section className="py-16 px-6 md:px-16 bg-slate-950 text-white border-t border-slate-900">
                  <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                      <div>
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] block">Sovereign AI Workforce</span>
                        <h2 className="text-3xl font-black text-white tracking-tight uppercase mt-1">AI Public Experience Division</h2>
                        <p className="text-slate-400 font-semibold text-xs mt-1">Autonomous cognitive agents controlling and validating the JUMO Public Digital Experience standard.</p>
                      </div>
                      
                      <div className="flex items-center gap-6 text-[10px] text-slate-500 font-black uppercase shrink-0">
                        <div>
                          <span>AGENT QUEUE:</span> <span className="text-emerald-400 font-black">{aiAgentTelemetry.generationQueue}</span>
                        </div>
                        <div>
                          <span>COMPLIANCE:</span> <span className="text-blue-400 font-black">{aiAgentTelemetry.brandCompliance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                      {[
                        { 
                          name: "JUMO-PEA-001", 
                          role: "Experience Architect", 
                          status: "ACTIVE", 
                          desc: "Renders landing pages, layouts, and public menus based on the ERP blueprint, locking visual rules.", 
                          metric: "AA Accessibility Locked" 
                        },
                        { 
                          name: "JUMO Brand Identity AI", 
                          role: "Identity Custodian", 
                          status: "ACTIVE", 
                          desc: "Enforces the JUMO Sovereign Blue visual schema, pairing typography, assets, and logo customization.", 
                          metric: "100% Brand Compliant" 
                        },
                        { 
                          name: "JUMO Public Content AI", 
                          role: "Content Intelligence", 
                          status: "ACTIVE", 
                          desc: "Indexes legal filings, official press updates, notice boards, and document indices automatically.", 
                          metric: "News Engine Indexed" 
                        },
                        { 
                          name: "JUMO Front Desk AI", 
                          role: "Chat Integration", 
                          status: "ACTIVE", 
                          desc: "Handles incoming public citizen chat inquiries, routing information from the long-term memory indices.", 
                          metric: "<150ms Latency" 
                        },
                        { 
                          name: "JUMO Accessibility AI", 
                          role: "Usability Compliance", 
                          status: "ACTIVE", 
                          desc: "Audits contrast ratios, screen reader metadata, responsive break flow, and multi-language triggers.", 
                          metric: "WCAG AA Secure" 
                        }
                      ].map((agent, i) => (
                        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col justify-between space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-blue-400 tracking-wider font-mono">{agent.name}</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <div>
                              <h3 className="font-bold text-xs text-white uppercase">{agent.role}</h3>
                              <p className="text-slate-400 text-[10px] font-semibold leading-relaxed mt-2 italic">{agent.desc}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
                            {agent.metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* PUBLIC INFORMATION HUB (News, Notices,notice Board) */}
                <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-12" id="info-hub-section">
                  {/* Left: News Centre */}
                  <div className="xl:col-span-2 space-y-8">
                    <div>
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] block">Sovereign Press</span>
                      <h2 className="text-2xl font-black text-slate-950 tracking-tight uppercase mt-1">Official Communications</h2>
                      <p className="text-slate-500 font-medium text-xs mt-1">Authenticated announcements authorized by JUMO Content Intelligence agents.</p>
                    </div>

                    <div className="space-y-6">
                      {inst.news.map((item, idx) => (
                        <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-blue-500 transition-all font-bold">
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <span className="text-[9px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-black italic">{item.date}</span>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug mb-2">{item.title}</h3>
                          <p className="text-xs text-slate-500 font-semibold italic leading-relaxed leading-normal">{item.snippet}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Notices & Notices Board */}
                  <div className="bg-slate-950 text-white p-10 rounded-[3rem] border border-white/5 shadow-xl flex flex-col justify-between">
                    <div className="space-y-8">
                      <div>
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] block">Governance notices</span>
                        <h3 className="text-xl font-black text-slate-100 tracking-tight mt-1">Active Notice Board</h3>
                      </div>

                      <div className="space-y-6">
                        {inst.notices.map((n, idx) => (
                          <div key={idx} className="space-y-1 pb-4 border-b border-white/5 last:border-b-0">
                            <div className="flex items-center justify-between text-[8px] font-black uppercase">
                              <span className={n.level === "urgent" ? "text-red-400" : "text-blue-400"}>
                                {n.level} notice
                              </span>
                              <span className="text-slate-500">{n.date}</span>
                            </div>
                            <p className="text-xs font-bold text-slate-200 italic leading-relaxed">{n.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Document downloads */}
                    <div className="pt-8 border-t border-white/10 space-y-4">
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Institutional Documents</span>
                      <button 
                        onClick={() => alert(`Initiating download for standard JUMO ${inst.category} Compliance Specification PDF.`)}
                        className="w-full py-4.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl font-black text-[9px] uppercase tracking-widest text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2.5"
                      >
                        <FileText className="w-4 h-4 text-blue-500" /> Download Compliance Specs
                      </button>
                    </div>
                  </div>
                </section>

                {/* ADVERTISEMENT AND PARTNERSHIP HUB */}
                <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-slate-200">
                  <div className="bg-slate-50 border border-slate-200 p-10 rounded-[3.5rem] grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-blue-600" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest font-bold">Campaign Notice</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">{inst.campaign.title}</h3>
                      <p className="text-slate-500 text-xs font-semibold italic max-w-2xl">{inst.campaign.imageDesc}</p>
                    </div>
                    <div className="text-center lg:text-right shrink-0">
                      <button 
                        onClick={() => alert(`Dispatched request for: ${inst.campaign.title}. Representative will contact you via ${inst.contact}.`)}
                        className="w-full lg:w-auto bg-slate-950 hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest px-8 py-4.5 rounded-2xl transition-all shadow-md"
                      >
                        {inst.campaign.actionText}
                      </button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {view === "marketplace" && (
              <motion.div 
                key="marketplace" 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="py-16 px-6 md:px-16 max-w-7xl mx-auto space-y-10"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[9px] font-black uppercase tracking-widest">Digital Marketplace</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Platform Registries & Notices</h2>
                  <p className="text-slate-500 text-xs font-bold mt-1">Discover verified enterprise platforms and manufactured templates across our national ecosystems.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "National Higher Education Portal v13.0", category: "Featured Platform", eco: "Education", desc: "Sovereign student registries, academic records, and FAAP bursar accounting clearance." },
                    { title: "Sovereign Healthcare Operating System", category: "Enterprise Solution", eco: "Healthcare", desc: "Hospital database, inpatient clinical charts, and drug stock ledger auditor." },
                    { title: "SACCO Financial Ledger & Wallet API", category: "Financial Engine", eco: "Financial", desc: "Mobile deposit routing, loan credit models, and shared treasury clearings." },
                    { title: "Government Ministry E-Service Gateway", category: "Public Services", eco: "Government", desc: "Public service desk, permit registration, and citizen biometric authorization." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-500 transition-all flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">
                            {item.category}
                          </span>
                          <span className="text-xs font-bold text-slate-400">{item.eco}</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">{item.title}</h3>
                        <p className="text-slate-500 text-xs font-bold italic leading-relaxed leading-normal">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => alert(`Notice details dispatched for: ${item.title}. This platform operates on JUMO UEOS kernels.`)}
                        className="w-full bg-slate-950 text-white font-black text-[9px] uppercase py-4 rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        Request Deployment Blueprint
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {view === "search" && (
              <motion.div 
                key="search" 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="py-16 px-6 md:px-16 max-w-4xl mx-auto space-y-8 text-center"
              >
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Sovereign Registry Registry</h2>
                  <p className="text-slate-500 font-medium text-xs max-w-xl mx-auto">Explore dynamically provisioned institution platforms running under JUMO UEOS baseline architectures.</p>
                </div>

                <div className="space-y-4 text-left">
                  {Object.values(institutions).map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:border-blue-500 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white" style={{ backgroundColor: item.themeAccent }}>
                          {item.logoChar}
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 text-md uppercase tracking-tight">{item.name}</h3>
                          <span className="text-[10px] text-slate-400 font-bold block mt-1">{item.category} Ecosystem | Status: Active</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setSelectedInstKey(item.id); setView("landing"); }}
                        className="bg-slate-950 text-white font-black text-[9px] uppercase px-5 py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                      >
                        View Public Layer <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {view === "login" && (
              <motion.div 
                key="login" 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="py-16 px-6"
              >
                <LoginView onLoginSuccess={onLoginSuccess} onNavigate={setView} />
              </motion.div>
            )}

            {view === "register" && (
              <motion.div 
                key="register" 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="py-16 px-6"
              >
                <RegisterView onNavigate={setView} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* JUMO FRONT DESK AI PANEL DRAWER */}
      <AnimatePresence>
        {aiOpen && (
          <PublicAiAssistantDrawer onClose={() => setAiOpen(false)} selectedInstitution={inst} />
        )}
      </AnimatePresence>

      {/* Floating AI Trigger */}
      <button 
        onClick={() => setAiOpen(true)} 
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4.5 rounded-full shadow-2xl hover:scale-105 transition-all z-40 border border-white/20"
        title="Consult Front Desk AI"
        id="btn-floating-ai"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-20 px-6 md:px-16 border-t border-slate-900 text-xs font-semibold" id="footer-section">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <span className="font-black text-white text-base tracking-widest block uppercase">JUMO UNIVERSAL ENTERPRISE PLATFORM</span>
              <p className="text-[10px] text-slate-500 leading-relaxed max-w-sm italic">
                Sovereign full-stack operating infrastructure. Zero-Trust RBAC & ABAC, multi-model AI routing, and the FAAP double-entry ledger backbone.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-white text-xs font-black uppercase tracking-widest">Active Inst Profile</h5>
              <p className="text-[10px] text-slate-500 italic leading-relaxed">
                Institution: {inst.name}<br/>
                Category: {inst.category} Ecosystem<br/>
                Enforced Support Desk: {inst.contact}
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="text-white text-xs font-black uppercase tracking-widest font-bold">Certification</h5>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
                <Shield className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-[9px] text-slate-300 font-mono">CERT-JUMO-13.0-SECURE</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8 text-[9px] text-slate-500 font-black uppercase tracking-wider">
            <div className="flex gap-6">
              <button className="hover:text-white transition-colors">Privacy Shield</button>
              <button className="hover:text-white transition-colors">Security Rules</button>
              <button className="hover:text-white transition-colors">Compliance Audits</button>
              <button className="hover:text-white transition-colors">System Terms</button>
            </div>
            <div>
              © 2026 JUMO UNIVERSAL ENTERPRISE PLATFORM. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeDetailService && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" id="service-detail-modal">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[3rem] border border-slate-200 max-w-md w-full p-10 space-y-6 text-slate-800 relative shadow-2xl"
            >
              <button onClick={() => setActiveDetailService(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-black tracking-widest block uppercase">SERVICE CATALOGUE</span>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mt-1">{activeDetailService.title}</h3>
                  <span className="text-[9px] font-mono font-bold text-slate-400">Code: {activeDetailService.code}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-bold italic leading-relaxed leading-normal">{activeDetailService.desc}</p>

              <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                <button 
                  onClick={() => { alert(`Initiating workflow instance for service ${activeDetailService.code}.`); setActiveDetailService(null); }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase py-4 rounded-xl shadow-md"
                >
                  Initiate Secure Workflow
                </button>
                <button 
                  onClick={() => setActiveDetailService(null)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-[10px] uppercase py-4 rounded-xl"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// JUMO FRONT DESK AI CHAT ASSISTANT
interface PublicAiAssistantDrawerProps {
  onClose: () => void;
  selectedInstitution: InstitutionProfile;
}

function PublicAiAssistantDrawer({ onClose, selectedInstitution }: PublicAiAssistantDrawerProps) {
  const [messages, setMessages] = useState<any[]>([
    { sender: "ai", text: `Welcome to the ${selectedInstitution.shortName} Public Portal. I am the JUMO Front Desk AI Agent (Registry ID: JUMO-PEA-001). I can assist you with service routing, tuition clearance inquiries, clinical intake information, or member dividend auditing rules. How can I assist you today?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/ueos/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, tenantId: selectedInstitution.id })
      });
      const data = await response.json();
      if (data.text || data.reply) {
        setMessages(prev => [...prev, { sender: "ai", text: data.text || data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: "ai", text: `JUMO UEOS has successfully indexed the ${selectedInstitution.shortName} specifications. All current platform services (e.g. ${selectedInstitution.services[0]?.title}) are operational within the sovereign cloud node.` }]);
      }
    } catch (_) {
      setMessages(prev => [...prev, { sender: "ai", text: `I have received your inquiry. Regarding "${userMsg}", JUMO is operating the standard ERP manufacturing layer for ${selectedInstitution.shortName}. Authorized portal users can sign in using their sovereign credentials, or contact the administrative desk at ${selectedInstitution.contact}.` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-end"
      id="public-ai-drawer-overlay"
    >
      <motion.div 
        initial={{ x: 300 }} 
        animate={{ x: 0 }} 
        exit={{ x: 300 }} 
        className="bg-slate-950 text-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-slate-900"
        id="public-ai-drawer-body"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm uppercase">JUMO Front Desk AI Agent</h3>
              <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest block font-mono">ID: JUMO-PEA-001</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-900 rounded-xl text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs font-semibold" id="ai-chat-messages-container">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-5 rounded-2xl leading-relaxed italic ${
                m.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-slate-900 text-slate-300 border border-slate-800 rounded-bl-none"
              }`}>
                {m.sender === "ai" && (
                  <span className="text-[8px] text-blue-400 uppercase tracking-widest font-black font-mono block mb-2">Front Desk Copilot</span>
                )}
                <p>{m.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" /> Thinking...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-900 flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about public services, tuition limits, or medical intake..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white outline-none focus:border-blue-500 placeholder:text-slate-500"
          />
          <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-xl">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// COMPLIANT AUTHENTICATION VIEW
function LoginView({ onLoginSuccess, onNavigate }: { onLoginSuccess: (user: any) => void; onNavigate: (v: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/v1/ueos/identity/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password, tenant: "Global" })
      });
      const data = await response.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
      } else {
        setError(data.error || "Authentication failed. Sovereign access record not found.");
      }
    } catch (err) {
      setError("Unable to communicate with sovereign Identity Gateway.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto" id="login-view-container">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-900/10 border border-white/10">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-950 tracking-tight uppercase">Sovereign identity Gate</h1>
        <p className="text-slate-500 font-bold text-xs mt-1">Authenticate credentials with zero-trust RBAC.</p>
      </div>
      
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-10">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
              Identity Profile (Email Address)
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jumo.net"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
              Access Signature (Secure Password)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-slate-950 hover:bg-blue-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-md transition-all disabled:opacity-70 mt-4"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Authenticate Signature <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Need an instance? <button onClick={() => onNavigate("register")} className="text-blue-600 font-black hover:underline">Register Institution</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// COMPLIANT INSTITUTIONAL REGISTRATION VIEW
function RegisterView({ onNavigate }: { onNavigate: (v: any) => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto" id="register-view-container">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-900/10 border border-white/10">
          <Globe className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-950 tracking-tight uppercase">Sovereign Instance Registration</h1>
        <p className="text-slate-500 font-bold text-xs mt-1">Submit institutional metadata to initiate ERP manufacturing pipelines.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-10">
        {submitted ? (
          <div className="text-center py-8 space-y-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">Registration Request Dispatched</h3>
            <p className="text-slate-500 text-xs font-bold italic max-w-md mx-auto leading-relaxed">
              Your institutional metadata has been dispatched to the JUMO Public Experience Architect AI (JUMO-PEA-001) for template verification and layer generation.
            </p>
            <button 
              onClick={() => { setSubmitted(false); onNavigate("login"); }} 
              className="bg-slate-950 hover:bg-blue-600 text-white font-black text-[9px] uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all"
            >
              Return to Login Gate
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6 text-xs font-bold text-slate-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Institution Name</label>
                <input type="text" required placeholder="e.g. National Technical College" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800 text-xs" />
              </div>
              <div className="space-y-2">
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Ecosystem Category</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800 text-xs">
                  <option>Education Ecosystem Blueprint</option>
                  <option>Healthcare Ecosystem Blueprint</option>
                  <option>Financial SACCO Blueprint</option>
                  <option>Government Ecosystem Blueprint</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Administrator Official Email</label>
              <input type="email" required placeholder="admin@college.jumo.net" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800 text-xs" />
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Sovereign Jurisdiction / Country</label>
              <input type="text" required placeholder="e.g. Republic of Zambia" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800 text-xs" />
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-950 hover:bg-blue-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-md transition-all mt-4"
            >
              Submit Registration payload <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Already registered? <button onClick={() => onNavigate("login")} className="text-blue-600 font-black hover:underline">Sign In</button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
