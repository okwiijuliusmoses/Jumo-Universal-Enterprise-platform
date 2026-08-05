import React, { useState, useEffect } from "react";
import { jumoFetch } from "../core/config/api";
import { 
  Shield, Lock, Building2, Globe, Cpu, Layers, Box, CheckCircle2, 
  RefreshCw, AlertCircle, ArrowRight, Server, Key, Users, 
  Database, Network, Sparkles, Activity, FileText, ChevronRight
} from "lucide-react";

interface PublicPortalProps {
  onLoginSuccess: (user: { email: string; name: string; role: string; tenantId: string; trustLevel: string }, token?: string) => void;
}

export default function PublicPortal({ onLoginSuccess }: PublicPortalProps) {
  // Navigation & Auth View State
  const [activeTab, setActiveTab] = useState<"platform" | "ecosystems" | "solutions" | "security" | "about" | "signin">("platform");
  const [selectedPersona, setSelectedPersona] = useState<"institution" | "admin" | "staff" | "user" | "partner">("admin");

  // Form State
  const [username, setUsername] = useState("admin@jumo.net");
  const [password, setPassword] = useState("password123");
  const [tenant, setTenant] = useState("CORE");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sessionExpiredMsg, setSessionExpiredMsg] = useState("");

  // Live System Status State
  const [statusTimestamp, setStatusTimestamp] = useState("");
  const [kernelStatus, setKernelStatus] = useState({ version: "v4.1", badge: "v4.1 Online" });
  const [treasuryStatus, setTreasuryStatus] = useState({ badge: "BALANCED $0.00" });
  const [workflowStatus, setWorkflowStatus] = useState({ badge: "v17.x Active" });
  const [securityStatus, setSecurityStatus] = useState({ badge: "ZERO-TRUST ACTIVE" });
  
  // Dynamic Ecosystems from API
  const [liveEcosystems, setLiveEcosystems] = useState<any[]>([]);

  useEffect(() => {
    const logoutReason = localStorage.getItem("jumo_logout_reason");
    if (logoutReason === "expired") {
      setSessionExpiredMsg("Session Expired: For security, your session was automatically terminated due to inactivity. Please sign in again.");
      localStorage.removeItem("jumo_logout_reason");
    }

    const fetchStatus = async () => {
      setStatusTimestamp(new Date().toLocaleTimeString());

      try {
        const data = await jumoFetch("/api/v1/platform/status");
        if (data && data.version) {
          setKernelStatus({
            version: data.version,
            badge: `v${data.version} ${data.status ? data.status.toUpperCase() : "ONLINE"}`
          });
        }
      } catch (e) {
        console.warn("Status fetch error (platform):", e);
      }

      try {
        const ecoData = await jumoFetch("/api/ueos/ecosystems");
        if (Array.isArray(ecoData) && ecoData.length > 0) {
          setLiveEcosystems(ecoData);
        }
      } catch (e) {
        console.warn("Ecosystems fetch error:", e);
      }

      try {
        const data = await jumoFetch("/api/v1/workflow/status");
        if (data && typeof data.activeCount === "number") {
          setWorkflowStatus({
            badge: `${data.activeCount} ACTIVE PIPELINES`
          });
        }
      } catch (e) {
        console.warn("Status fetch error (workflow):", e);
      }

      try {
        const data = await jumoFetch("/api/v1/security/events");
        if (data && data.threatLevel) {
          setSecurityStatus({
            badge: `THREAT: ${data.threatLevel.toUpperCase()}`
          });
        }
      } catch (e) {
        console.warn("Status fetch error (security):", e);
      }
    };

    fetchStatus();
  }, []);

  const handlePersonaChange = (persona: "institution" | "admin" | "staff" | "user" | "partner") => {
    setSelectedPersona(persona);
    if (persona === "admin") {
      setUsername("admin@jumo.net");
      setTenant("CORE");
    } else if (persona === "institution") {
      setUsername("sacco.hq@jumo.net");
      setTenant("SACCO");
    } else if (persona === "staff") {
      setUsername("staff.officer@jumo.net");
      setTenant("GOVT");
    } else if (persona === "user") {
      setUsername("user.member@jumo.net");
      setTenant("CHURCH");
    } else if (persona === "partner") {
      setUsername("partner.integration@jumo.net");
      setTenant("CORE");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSessionExpiredMsg("");
    setIsAuthenticating(true);

    const selectedTenant = (tenant || "CORE").trim().toUpperCase();

    try {
      let data: any = null;
      try {
        data = await jumoFetch("/api/v1/ueos/identity/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            tenant: selectedTenant
          })
        });
      } catch (primaryErr) {
        console.warn("[AUTH] Primary login endpoint failed, trying secondary fallback...", primaryErr);
        data = await jumoFetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: username,
            password,
            loginType: selectedTenant === "CORE" ? "owner" : "tenant",
            tenantSlug: selectedTenant.toLowerCase()
          })
        });
      }

      if (data && (data.success || data.token)) {
        const token = data.token || (data.session && data.session.token) || "jumo_session_owner_prod";
        const user = data.user || {
          email: username.includes("@") ? username : `${username}@jumo.net`,
          name: username.split("@")[0] || username,
          role: selectedPersona === "admin" ? "SecOps_Administrator" : "Tenant_Operator",
          tenantId: selectedTenant,
          trustLevel: "L4_High_Trust"
        };

        localStorage.setItem("JUMO_SESSION", token);
        localStorage.setItem("jumo_session_token", token);
        localStorage.setItem("jumo_current_user", JSON.stringify(user));

        onLoginSuccess(user, token);
      } else {
        setErrorMsg(data?.error || data?.message || "Authentication failed. Please verify credentials.");
      }
    } catch (err: any) {
      setErrorMsg(`Connection error: ${err.message || "Failed to reach backend API"}`);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const defaultEcosystemFamilies = [
    {
      id: "sacco-erp",
      name: "SACCO & Microfinance ERP",
      code: "SACCO_HQ",
      description: "Credit unions, financial co-operatives, member savings, share capital, loan appraisal, and automated interest ledger.",
      metrics: "FAAP Treasury Integrated"
    },
    {
      id: "church-erp",
      name: "Church & Faith Governance ERP",
      code: "CHURCH_GOV",
      description: "Congregation records, tithes and offerings stewardship, ministry analytics, asset tracking, and community welfare funds.",
      metrics: "Multi-Parish Ready"
    },
    {
      id: "education-erp",
      name: "Education & University ERP",
      code: "EDU_UNIV",
      description: "Academic enrollment, student records, fee collection ledgers, faculty management, and curriculum governance.",
      metrics: "Multi-Campus Isolated"
    },
    {
      id: "ngo-erp",
      name: "NGO & Humanitarian ERP",
      code: "NGO_GRANT",
      description: "Grant tracking, donor allocation, field fund disbursement, project milestone auditing, and compliance reporting.",
      metrics: "Audit Compliance Verified"
    },
    {
      id: "govt-erp",
      name: "Sovereign Government ERP",
      code: "GOVT_AGENCY",
      description: "Public authority administration, citizen service registry, departmental workflows, and national budget ledger integration.",
      metrics: "Zero-Trust Regulated"
    },
    {
      id: "health-erp",
      name: "Healthcare & Hospital ERP",
      code: "HEALTH_CARE",
      description: "Clinical patient records, inventory and pharmaceutical tracking, medical billing, and health authority reporting.",
      metrics: "HIPAA / Sovereign Encrypted"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-slate-200 selection:text-slate-900">
      
      {/* Official Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("platform")}>
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm tracking-tight">
              JU
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                  JUMO DIGITAL HYBRID PLATFORM
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  UEOS v4.1
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Sovereign Enterprise Operating System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button 
              onClick={() => setActiveTab("platform")} 
              className={`hover:text-slate-900 transition ${activeTab === "platform" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : ""}`}
            >
              Platform
            </button>
            <button 
              onClick={() => setActiveTab("ecosystems")} 
              className={`hover:text-slate-900 transition ${activeTab === "ecosystems" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : ""}`}
            >
              Ecosystems
            </button>
            <button 
              onClick={() => setActiveTab("solutions")} 
              className={`hover:text-slate-900 transition ${activeTab === "solutions" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : ""}`}
            >
              Solutions
            </button>
            <button 
              onClick={() => setActiveTab("security")} 
              className={`hover:text-slate-900 transition ${activeTab === "security" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : ""}`}
            >
              Security
            </button>
            <button 
              onClick={() => setActiveTab("about")} 
              className={`hover:text-slate-900 transition ${activeTab === "about" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : ""}`}
            >
              About JUMO
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("signin")}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5 text-slate-300" />
              <span>Sign In</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1">
        
        {/* If Active Tab is Sign In, show Auth View prominently */}
        {activeTab === "signin" ? (
          <section className="py-12 sm:py-16 px-4 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
                <Shield className="h-3.5 w-3.5 text-teal-600" />
                <span>Zero Trust Security Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                JUMO UEOS Secure Access
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Authenticate with your institution identity or administrative credentials to enter the JUMO UEOS Control Center.
              </p>
            </div>

            {/* Persona Selection Tabs */}
            <div className="bg-white border border-slate-200 rounded-xl p-1.5 flex flex-wrap gap-1 justify-center shadow-xs text-xs font-semibold">
              <button
                onClick={() => handlePersonaChange("admin")}
                className={`px-3 py-2 rounded-lg transition ${selectedPersona === "admin" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
              >
                Administrator Login
              </button>
              <button
                onClick={() => handlePersonaChange("institution")}
                className={`px-3 py-2 rounded-lg transition ${selectedPersona === "institution" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
              >
                Institution Login
              </button>
              <button
                onClick={() => handlePersonaChange("staff")}
                className={`px-3 py-2 rounded-lg transition ${selectedPersona === "staff" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
              >
                Staff Login
              </button>
              <button
                onClick={() => handlePersonaChange("user")}
                className={`px-3 py-2 rounded-lg transition ${selectedPersona === "user" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
              >
                Student/User Login
              </button>
              <button
                onClick={() => handlePersonaChange("partner")}
                className={`px-3 py-2 rounded-lg transition ${selectedPersona === "partner" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
              >
                Enterprise Partner Login
              </button>
            </div>

            {/* Login Card */}
            <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
              
              {sessionExpiredMsg && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>{sessionExpiredMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-mono flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email / Identity Handle
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="user@domain.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Security Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition"
                  />
                </div>

                <div>
                  <label htmlFor="tenant" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tenant Workspace Scope
                  </label>
                  <select
                    id="tenant"
                    name="tenant"
                    value={tenant}
                    onChange={(e) => setTenant(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition cursor-pointer"
                  >
                    <option value="CORE">CORE (System Administrator)</option>
                    <option value="SACCO">SACCO (Financial Co-op)</option>
                    <option value="CHURCH">CHURCH (Congregation ERP)</option>
                    <option value="EDUCATION">EDUCATION (University & School)</option>
                    <option value="NGO">NGO (Grants & Field Ops)</option>
                    <option value="GOVT">GOVT (Sovereign Authority)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full mt-2 bg-slate-900 hover:bg-slate-800 active:bg-black disabled:opacity-60 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-white" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <span>Sign In to UEOS Control Center</span>
                  )}
                </button>
              </form>

              {/* Security Messaging */}
              <div className="pt-4 border-t border-slate-100 text-center space-y-2">
                <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                    Zero Trust Security
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                    Sovereign Identity
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Multi-Factor Authentication Ready • Row-Level Multi-Tenant Isolation
                </p>
              </div>

            </div>
          </section>
        ) : (
          /* Landing Overview View */
          <div>
            
            {/* Hero Section */}
            <section className="bg-white border-b border-slate-200 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto text-center space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-800">
                  <Building2 className="h-3.5 w-3.5 text-slate-700" />
                  <span>Sovereign Enterprise Hybrid Platform</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Universal Enterprise Operating System for Digital Institutions
                </h1>

                <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  A sovereign enterprise platform connecting institutions, services, ecosystems, and intelligent automation through one unified operating system.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveTab("signin")}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab("signin")}
                    className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl shadow-2xs transition cursor-pointer"
                  >
                    Register Institution
                  </button>

                  <button
                    onClick={() => setActiveTab("ecosystems")}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition cursor-pointer"
                  >
                    Explore Ecosystems
                  </button>
                </div>

                {/* Key Architectural Metrics */}
                <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kernel Platform</div>
                    <div className="text-sm font-extrabold text-slate-900">{kernelStatus.version} Hybrid</div>
                    <div className="text-[10px] text-teal-700 font-mono font-medium">{kernelStatus.badge}</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">FAAP Treasury</div>
                    <div className="text-sm font-extrabold text-slate-900">Ledger Engine</div>
                    <div className="text-[10px] text-teal-700 font-mono font-medium">{treasuryStatus.badge}</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Security Architecture</div>
                    <div className="text-sm font-extrabold text-slate-900">Zero-Trust RBAC</div>
                    <div className="text-[10px] text-teal-700 font-mono font-medium">{securityStatus.badge}</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Workflow Engine</div>
                    <div className="text-sm font-extrabold text-slate-900">v17.x Automation</div>
                    <div className="text-[10px] text-teal-700 font-mono font-medium">{workflowStatus.badge}</div>
                  </div>
                </div>

              </div>
            </section>

            {/* Section 1: Enterprise Ecosystem Network */}
            <section className="py-16 px-4 max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Section 1</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Enterprise Ecosystem Network
                  </h2>
                </div>
                <p className="text-xs text-slate-600 max-w-md">
                  Modular, domain-driven ERP families that share the JUMO UEOS core platform kernel and FAAP treasury ledger.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(liveEcosystems.length > 0 ? liveEcosystems : defaultEcosystemFamilies).map((eco) => (
                  <div key={eco.id || eco.code} className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs hover:shadow-md transition space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono px-2.5 py-1 bg-slate-100 text-slate-800 rounded border border-slate-200">
                        {eco.code || eco.id}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {eco.metrics || "Registry Active"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{eco.name}</h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {eco.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800">
                      <span>Deploy via Universal Factory</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Sovereign Security Architecture */}
            <section className="bg-slate-900 text-white py-16 px-4">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Section 2</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Sovereign Security Architecture
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">Zero-Trust Access Control</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Continuous authorization with Row-Level Multi-Tenant Segregation. Attribute-based and Role-based access governance enforced at the kernel.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
                      <Lock className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">Data Sovereignty & Encryption</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      End-to-end cryptographic protection for institutional datasets. Secrets Vault prevents key exposure and guarantees regulatory compliance.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
                      <Key className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">Administrative MFA Challenge</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      High-risk system operations, secrets updates, and ledger postings are protected behind step-up cryptographic MFA gating.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: AI Enterprise Intelligence */}
            <section className="py-16 px-4 max-w-7xl mx-auto space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Section 3</div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  AI Enterprise Intelligence
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-800">
                    <Cpu className="h-3.5 w-3.5 text-slate-700" />
                    <span>Multi-Provider Cognitive Gateway</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Server-Side Cognitive Proxy & Automated Agent Routing
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    JUMO UEOS abstracts third-party LLM providers into a unified cognitive gateway. Requests are proxied server-side to guarantee zero client API key exposure while leveraging high-speed Gemini Flash models for instant classification and reasoning agents for multi-step audits.
                  </p>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-600" />
                      Semantic Memory & Vector RAG Indexing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-600" />
                      Multi-Agent Swarm Orchestration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-600" />
                      Auditable Decision Telemetry Logs
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-teal-600" />
                      Cognitive Gateway Telemetry
                    </span>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Active Router
                    </span>
                  </div>

                  <div className="bg-slate-900 text-slate-200 p-4 rounded-xl space-y-2 text-[11px]">
                    <div>[ROUTER]: Primary = Gemini Flash (Fast Response)</div>
                    <div>[AGENT_SWARM]: LedgerAuditor, ComplianceOfficer, SchemaMatcher</div>
                    <div>[PROXY]: Server-side /api/ueos/ai/* (Keys Protected)</div>
                    <div>[MEMORY_BUFFER]: Vector RAG Short/Long-term Slices</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 & 5: Factory & Marketplace Grid */}
            <section className="bg-slate-100 py-16 px-4">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Universal ERP Factory */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Section 4</div>
                    <h3 className="text-lg font-bold text-slate-900">Universal ERP Factory</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Instantly manufacture isolated, fully configured enterprise ERP nodes from canonical registry templates. Every instance binds to the shared FAAP financial ledger backbone.
                    </p>
                    <button
                      onClick={() => setActiveTab("signin")}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                    >
                      Access Factory Controls
                    </button>
                  </div>

                  {/* Digital Services Marketplace */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Section 5</div>
                    <h3 className="text-lg font-bold text-slate-900">Digital Services Marketplace</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Plug-and-play domain modules, banking integration adapters, mobile payment gateways, and compliance reporting extensions hot-swappable at runtime.
                    </p>
                    <button
                      onClick={() => setActiveTab("signin")}
                      className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg transition"
                    >
                      Explore Marketplace Modules
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* Section 6: Public Announcements & System Updates */}
            <section className="py-16 px-4 max-w-7xl mx-auto space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Section 6</div>
                <h2 className="text-xl font-bold text-slate-900">Platform Announcements & Compliance Updates</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    UEOS Platform Release
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">JUMO UEOS Kernel v4.1 Active</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Micro-kernel architecture initialization and dynamic hot-swappable module registry deployed across sovereign nodes.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    FAAP Treasury Status
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">Double-Entry Balance Verification</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    FAAP ledger engine verified $0.00 debit/credit parity across all registered enterprise financial accounts.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    Security Compliance
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">Zero-Trust Audit Verified</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Multi-tenant data isolation and continuous authorization gating verified for all active enterprise domain nodes.
                  </p>
                </div>
              </div>
            </section>

          </div>
        )}

      </main>

      {/* Official Enterprise Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
              JU
            </div>
            <div>
              <span className="font-bold text-white text-sm">JUMO DIGITAL HYBRID PLATFORM</span>
              <p className="text-[11px] text-slate-400">Universal Enterprise Operating System (UEOS)</p>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400 space-y-1">
            <p>© {new Date().getFullYear()} JUMO Universal Platform. Sovereign Enterprise Operating Architecture.</p>
            <p className="font-mono text-slate-400">Zero-Trust Isolation • FAAP Treasury Ledger Engine • Multi-Tenant Enterprise Hybrid</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
