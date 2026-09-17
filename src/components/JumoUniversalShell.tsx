import React, { useState, useEffect } from "react";
import { 
  Building2, Server, Shield, CheckCircle2, XCircle, AlertTriangle, 
  RefreshCw, Search, ArrowUpRight, FolderTree, Code2, Database,
  DollarSign, CreditCard, Landmark, School, HeartPulse, Church,
  Sprout, Factory, UtensilsCrossed, Kanban, Key, Users, Layers,
  Activity, Cpu, ExternalLink, Terminal, ChevronRight, FileText,
  Lock, Eye, AlertCircle, Play, User, LogIn, ArrowRight, Bell,
  Sparkles, Check, Clock, Plus, BarChart3
} from "lucide-react";
import { ERPNextWorkspace } from "./foundations/ERPNextWorkspace";
import { QuickBooksWorkspace } from "./foundations/QuickBooksWorkspace";
import { SchoolPayWorkspace } from "./foundations/SchoolPayWorkspace";
import { DigitalPayWorkspace } from "./foundations/DigitalPayWorkspace";


interface FoundationApp {
  id: string;
  name: string;
  domain: string;
  category: string;
  repository: string;
  version: string;
  license: string;
  path: string;
  backend: string;
  frontend: string;
  database: string;
  route: string;
  authority: string;
  installed: boolean;
  fileCount: number;
  status: string;
  runtimeMode: string;
  healthCheck: string;
}

interface SourceFile {
  name: string;
  isDirectory: boolean;
  size: number;
}

export function JumoUniversalShell() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [financeSubTab, setFinanceSubTab] = useState<"quickbooks" | "erpnext" | "schoolpay" | "payments">("quickbooks");
  const [educationSubTab, setEducationSubTab] = useState<"schoolpay" | "gibbon">("schoolpay");
  const [adminSubTab, setAdminSubTab] = useState<"identity" | "tenants" | "applications" | "audit">("applications");

  const [applications, setApplications] = useState<FoundationApp[]>([]);
  const [selectedApp, setSelectedApp] = useState<FoundationApp | null>(null);
  const [sourceFiles, setSourceFiles] = useState<SourceFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeTenant, setActiveTenant] = useState<string>("TENT-1");
  const [loadingRegistry, setLoadingRegistry] = useState<boolean>(true);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
    name: string;
    role: string;
    clearance: string;
  }>({
    id: "usr-sovereign-01",
    email: "operator@jumo.net",
    name: "Sovereign Operator Alpha",
    role: "ADMIN",
    clearance: "LEVEL-10-NATIONAL"
  });
  const [loginEmail, setLoginEmail] = useState<string>("operator@jumo.net");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/ueos/identity/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginEmail, tenant: activeTenant })
      });
      if (res.ok) {
        const d = await res.json();
        if (d.user) {
          setCurrentUser(d.user);
          setShowLoginModal(false);
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Load Foundation Registry
  const fetchRegistry = async () => {
    setLoadingRegistry(true);
    try {
      const res = await fetch("/api/v1/foundations/registry");
      if (res.ok) {
        const data = await res.json();
        if (data.applications) {
          setApplications(data.applications);
        }
      }
    } catch (err) {
      console.error("Failed to fetch foundation registry:", err);
    } finally {
      setLoadingRegistry(false);
    }
  };

  useEffect(() => {
    fetchRegistry();
  }, []);

  const handleSelectApp = async (app: FoundationApp) => {
    setSelectedApp(app);
    setLoadingFiles(true);
    try {
      const res = await fetch(`/api/v1/foundations/inspect?path=${encodeURIComponent(app.path)}`);
      if (res.ok) {
        const data = await res.json();
        setSourceFiles(data.files || []);
      } else {
        setSourceFiles([]);
      }
    } catch (err) {
      console.error("Failed to inspect source:", err);
      setSourceFiles([]);
    } finally {
      setLoadingFiles(false);
    }
  };

  const navItems = [
    { id: "home", label: "Dashboard", icon: Activity },
    { id: "finance", label: "Business & Finance", icon: DollarSign },
    { id: "education", label: "Education (SchoolPay)", icon: School },
    { id: "digitalpay", label: "DigitalPay Gateway", icon: CreditCard },
    { id: "sectors", label: "Sectoral Portals", icon: Layers },
    { id: "admin", label: "Administration", icon: Shield },
  ];

  const sectorApps = [
    { id: "healthcare", label: "Healthcare (Bahmni)", icon: HeartPulse, cat: "Healthcare" },
    { id: "church", label: "Faith (ChurchCRM)", icon: Church, cat: "Church & Faith" },
    { id: "agriculture", label: "Agri (farmOS)", icon: Sprout, cat: "Agriculture" },
    { id: "hospitality", label: "Hospitality (TastyIgniter)", icon: UtensilsCrossed, cat: "Hospitality" },
    { id: "projects", label: "Projects (OpenProject)", icon: Kanban, cat: "Projects" },
  ];

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" ? true :
                          statusFilter === "installed" ? app.installed :
                          statusFilter === "missing" ? !app.installed : true;

    const matchesCategory = categoryFilter === "all" ? true : app.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const installedCount = applications.filter(a => a.installed).length;
  const missingCount = applications.filter(a => !a.installed).length;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* SIDEBAR NAVIGATION (WHITE ENTERPRISE STYLE) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-xs z-20">
        <div>
          {/* LOGO */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-black text-lg text-white shadow-xs">
                J
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-tight text-slate-900 leading-none">JUMO</h1>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-1">Enterprise Platform</p>
              </div>
            </div>
          </div>

          {/* TENANT SELECTOR */}
          <div className="p-3.5 border-b border-slate-100 bg-slate-50/50">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Active Organization
            </label>
            <select 
              value={activeTenant}
              onChange={(e) => setActiveTenant(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg text-xs py-1.5 px-2.5 text-slate-800 focus:outline-none focus:border-blue-500 font-medium shadow-2xs"
            >
              <option value="TENT-1">Faith Parish (TENT-1)</option>
              <option value="TENT-2">Primary Academy (TENT-2)</option>
              <option value="TENT-4">Retail Distributors (TENT-4)</option>
            </select>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Core Platform</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100 shadow-2xs" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 pb-2">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sectoral Reach</p>
              {sectorApps.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive 
                        ? "bg-slate-100 text-slate-900 font-semibold border border-slate-200 shadow-2xs" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 opacity-70" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* FOOTER SYSTEM STATUS */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-600 flex items-center gap-1.5 font-medium text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Enterprise Gateway
            </span>
            <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ONLINE</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Foundations</span>
            <span className="font-semibold text-slate-700">{installedCount} / {applications.length} Present</span>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT (CLEAN WHITE ENTERPRISE WORKSPACE) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        {/* TOP ENTERPRISE HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-2xs z-10">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide bg-slate-100 px-2.5 py-1 rounded">
              {activeTenant}
            </span>
            <div className="h-4 w-px bg-slate-200"></div>
            <span className="text-xs text-slate-500 font-medium">
              Sovereign Enterprise OS • Build v3.4.1
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-1.5 right-1.5"></span>
            </button>

            <div className="h-4 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-slate-800">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400">{currentUser.clearance}</div>
              </div>
            </div>

            <button 
              onClick={() => setShowLoginModal(true)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Switch Profile</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
          {activeTab === "home" && (
            <div className="space-y-10 max-w-7xl mx-auto">
               <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sovereign Dashboard</h2>
                    <p className="text-slate-500 text-sm mt-1">Operational overview across financial, educational and sectoral domains.</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5" />
                        Sync Ledgers
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: "Cash Position", value: "UGX 4.2B", trend: "+12.4%", color: "emerald", icon: Landmark },
                    { label: "Accounts Receivable", value: "UGX 840M", trend: "-2.1%", color: "blue", icon: DollarSign },
                    { label: "Fee Collections", value: "UGX 1.1B", trend: "+45.0%", color: "indigo", icon: School },
                    { label: "Gateway Status", value: "99.98%", trend: "STABLE", color: "amber", icon: Activity },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-3 relative overflow-hidden group">
                       <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 border border-${stat.color}-100`}>
                             <stat.icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] font-bold text-${stat.color}-700 bg-${stat.color}-50 px-2 py-0.5 rounded-full border border-${stat.color}-100`}>
                             {stat.trend}
                          </span>
                       </div>
                       <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                          <h3 className="text-xl font-black text-slate-900 mt-1">{stat.value}</h3>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                     <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-800">QuickBooks Liquidity</h3>
                        <button className="text-xs text-blue-600 font-bold hover:underline" onClick={() => setActiveTab("finance")}>View Ledger</button>
                     </div>
                     <div className="flex-1 p-8 flex items-center justify-center text-slate-300">
                        <BarChart3 className="w-16 h-16 opacity-20" />
                     </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                     <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-800">SchoolPay Performance</h3>
                        <button className="text-xs text-blue-600 font-bold hover:underline" onClick={() => setActiveTab("education")}>View Collections</button>
                     </div>
                     <div className="flex-1 p-8 flex items-center justify-center text-slate-300">
                        <Activity className="w-16 h-16 opacity-20" />
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === "finance" && <QuickBooksWorkspace />}
          {activeTab === "education" && <SchoolPayWorkspace />}
          {activeTab === "digitalpay" && <DigitalPayWorkspace />}

          {activeTab === "admin" && (
            <div className="max-w-7xl mx-auto space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Administration</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Application Registry", desc: "Manage foundation apps and disk source mappings.", icon: FolderTree, sub: "applications" },
                    { title: "Identity & SSO", desc: "Keycloak integration and sovereign user federation.", icon: Key, sub: "identity" },
                    { title: "Sovereign Audit", desc: "UEOS architectural drift and integrity logs.", icon: Shield, sub: "audit" },
                  ].map((adm, i) => (
                    <div key={i} onClick={() => { setAdminSubTab(adm.sub as any); }} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-blue-400 cursor-pointer transition-all space-y-3">
                       <adm.icon className="w-8 h-8 text-blue-600" />
                       <h3 className="font-bold text-sm text-slate-900">{adm.title}</h3>
                       <p className="text-xs text-slate-500">{adm.desc}</p>
                    </div>
                  ))}
               </div>

               {adminSubTab === "applications" && (
                 <div className="space-y-6 pt-6 border-t border-slate-200">
                    <h3 className="font-bold text-slate-800">Foundation Registry</h3>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                       <div className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Operational Foundations Detected on Disk
                       </div>
                       <div className="divide-y divide-slate-100">
                          {applications.map(app => (
                            <div key={app.id} className="p-4 flex items-center justify-between">
                               <div>
                                  <div className="text-xs font-bold text-slate-800">{app.name}</div>
                                  <div className="text-[10px] text-slate-400">{app.domain}</div>
                               </div>
                               <button onClick={() => handleSelectApp(app)} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600">Inspect Source</button>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
               )}
            </div>
          )}

          {sectorApps.some(s => s.id === activeTab) && (
            <div className="max-w-7xl mx-auto space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {sectorApps.find(s => s.id === activeTab)?.label}
                  </h2>
               </div>
               <div className="bg-white border border-slate-200 rounded-2xl p-20 text-center space-y-4 shadow-sm">
                  <Layers className="w-12 h-12 text-slate-200 mx-auto" />
                  <h3 className="font-bold text-slate-800">Operational Sector Domain</h3>
                  <p className="text-sm text-slate-500 max-w-lg mx-auto">This foundation is physically present in the repository and available for local provisioning. High-parity integration with Jumo DigitalPay is active.</p>
                  <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md">Initialize Application Interface</button>
               </div>
            </div>
          )}
        </main>
      </div>

      {/* APPLICATION DETAIL / SOURCE INSPECTOR MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* MODAL HEADER */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${selectedApp.installed ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{selectedApp.name}</h3>
                  <p className="text-xs text-slate-500">{selectedApp.domain}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 font-bold"
              >
                ✕
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 block font-semibold">License</span>
                  <span className="text-xs font-bold text-slate-800">{selectedApp.license}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 block font-semibold">Source Files</span>
                  <span className="text-xs font-bold text-slate-800">{selectedApp.fileCount}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 block font-semibold">Repository Path</span>
                  <span className="text-xs font-mono font-bold text-slate-800 truncate block">{selectedApp.path}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 block font-semibold">Runtime Mode</span>
                  <span className="text-xs font-bold text-slate-800">{selectedApp.runtimeMode}</span>
                </div>
              </div>

              {/* SOURCE FILE LIST */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Repository File Tree Sample</span>
                  <span className="text-slate-400 font-normal">{sourceFiles.length} top-level entries</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto font-mono text-xs">
                  {loadingFiles ? (
                    <div className="p-6 text-center text-slate-400">Inspecting source tree...</div>
                  ) : sourceFiles.length > 0 ? (
                    sourceFiles.map((file, idx) => (
                      <div key={idx} className="p-2.5 px-4 flex items-center justify-between hover:bg-slate-50">
                        <span className="text-slate-700">{file.name}</span>
                        <span className="text-[11px] text-slate-400">
                          {file.isDirectory ? "DIR" : `${(file.size / 1024).toFixed(1)} KB`}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-slate-400">No source files present in directory path.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Switch Sovereign Profile</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Operator Identity</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Apply Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
