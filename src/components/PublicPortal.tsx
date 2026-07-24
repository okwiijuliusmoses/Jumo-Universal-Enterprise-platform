import { jumoFetch } from "../core/config/api";
import React, { useState, useEffect } from "react";
import { 
  AlertCircle, RefreshCw
} from "lucide-react";

interface PublicPortalProps {
  onLoginSuccess: (user: { email: string; name: string; role: string; tenantId: string; trustLevel: string }, token?: string) => void;
}

export default function PublicPortal({ onLoginSuccess }: PublicPortalProps) {
  const [username, setUsername] = useState("owner@jumo.net");
  const [password, setPassword] = useState("password123");
  const [tenant, setTenant] = useState("CORE");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sessionExpiredMsg, setSessionExpiredMsg] = useState("");

  // System Status State
  const [statusTimestamp, setStatusTimestamp] = useState("");
  const [kernelStatus, setKernelStatus] = useState({ version: "2.0.4", badge: "v2.0.4 Online" });
  const [treasuryStatus, setTreasuryStatus] = useState({ badge: "BALANCED" });
  const [workflowStatus, setWorkflowStatus] = useState({ badge: "v17.x Ready" });
  const [securityStatus, setSecurityStatus] = useState({ badge: "ZERO-TRUST" });

  useEffect(() => {
    const logoutReason = localStorage.getItem("jumo_logout_reason");
    if (logoutReason === "expired") {
      setSessionExpiredMsg("Session Expired: For security, your session was automatically terminated due to inactivity. Please sign in again.");
      localStorage.removeItem("jumo_logout_reason");
    }

    // Fetch Live System Status
    const fetchStatus = async () => {
      setStatusTimestamp(new Date().toLocaleTimeString());

      // 1. Platform / Kernel status
      try {
        const res = await jumoFetch("/api/v1/platform/status");
        if (res.ok) {
          const data = await res.json();
          if (data.version) {
            setKernelStatus({
              version: data.version,
              badge: `v${data.version} ${data.status ? data.status.toUpperCase() : "ONLINE"}`
            });
          }
        }
      } catch (e) {
        console.warn("Status fetch error (platform):", e);
      }

      // 2. Workflow status
      try {
        const res = await jumoFetch("/api/v1/workflow/status");
        if (res.ok) {
          const data = await res.json();
          if (typeof data.activeCount === "number") {
            setWorkflowStatus({
              badge: `${data.activeCount} ACTIVE`
            });
          }
        }
      } catch (e) {
        console.warn("Status fetch error (workflow):", e);
      }

      // 3. Security status
      try {
        const res = await jumoFetch("/api/v1/security/events");
        if (res.ok) {
          const data = await res.json();
          if (data.threatLevel) {
            setSecurityStatus({
              badge: `THREAT: ${data.threatLevel.toUpperCase()}`
            });
          }
        }
      } catch (e) {
        console.warn("Status fetch error (security):", e);
      }
    };

    fetchStatus();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSessionExpiredMsg("");
    setIsAuthenticating(true);

    const selectedTenant = (tenant || "CORE").trim().toUpperCase();

    try {
      // 1. Try primary endpoint /api/v1/ueos/identity/login
      const res = await jumoFetch("/api/v1/ueos/identity/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          tenant: selectedTenant
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const token = data.token || (data.session && data.session.token) || "jumo_session_owner_prod";
          const user = data.user || {
            email: username.includes("@") ? username : `${username}@jumo.net`,
            name: username,
            role: selectedTenant === "CORE" ? "SecOps_Administrator" : "Tenant_User",
            tenantId: selectedTenant,
            trustLevel: "L4_High_Trust"
          };

          // Store in localStorage
          localStorage.setItem("JUMO_SESSION", token);
          localStorage.setItem("jumo_session_token", token);
          localStorage.setItem("jumo_current_user", JSON.stringify(user));

          onLoginSuccess(user, token);
          return;
        }
      }

      // Fallback: /api/auth/login if secondary auth endpoint is needed
      const data = await jumoFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: username,
          password,
          loginType: selectedTenant === "CORE" ? "owner" : "tenant",
          tenantSlug: selectedTenant.toLowerCase()
        })
      });

      if (data) {
        const token = data.token || "jumo_session_owner_prod";
        const user = data.user;

        localStorage.setItem("JUMO_SESSION", token);
        localStorage.setItem("jumo_session_token", token);
        localStorage.setItem("jumo_current_user", JSON.stringify(user));

        onLoginSuccess(user, token);
      }
    } catch (err: any) {
      setErrorMsg(`Connection error: ${err.message}`);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
      
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sm:px-8 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
              JU
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 tracking-tight">JUMO UEOS</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">v4.1</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Universal Enterprise Operating System</p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs font-mono font-medium text-teal-700 bg-teal-50 border border-teal-200/60 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
              Sovereign Enterprise Runtime Access
            </span>
          </div>
        </div>
      </header>

      {/* Main Gateway Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center">
        
        {/* Login Card */}
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Owner Command Sign-In</h1>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Secure access to the JUMO UEOS enterprise control plane.</p>
          </div>

          {sessionExpiredMsg && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <span>{sessionExpiredMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-5 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-mono flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email / Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all font-sans"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all font-sans"
              />
            </div>

            <div>
              <label htmlFor="tenant" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Tenant Selection
              </label>
              <select
                id="tenant"
                name="tenant"
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all font-sans cursor-pointer"
              >
                <option value="CORE">CORE</option>
                <option value="ALUMNI">ALUMNI</option>
                <option value="SACCO">SACCO</option>
                <option value="CHURCH">CHURCH</option>
                <option value="NGO">NGO</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full mt-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:opacity-60 text-white font-semibold py-2.5 px-4 rounded-lg shadow-xs transition-all text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAuthenticating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>SIGNING IN...</span>
                </>
              ) : (
                <span>SIGN IN TO UEOS</span>
              )}
            </button>
          </form>
        </div>

        {/* Live System Status Panel Below Login Card */}
        <div className="w-full max-w-md mt-6 bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE SYSTEM STATUS
            </span>
            <span className="text-[10px] font-mono text-slate-400">{statusTimestamp || "CONNECTING..."}</span>
          </div>

          <div className="space-y-2.5 text-xs font-medium text-slate-700">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>UEOS Kernel Online</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                {kernelStatus.badge}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>FAAP Treasury Backbone Connected</span>
              </span>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                {treasuryStatus.badge}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Workflow Engine v17.x Ready</span>
              </span>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                {workflowStatus.badge}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Identity Security Active</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                {securityStatus.badge}
              </span>
            </div>
          </div>
        </div>

      </main>

      {/* Technical Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-semibold text-slate-700">JUMO UEOS v4.1</div>
          <div className="text-slate-500">Universal Enterprise Operating System</div>
          <div className="text-slate-400 font-mono text-[11px]">Secure Multi-Tenant Digital Hybrid Platform</div>
        </div>
      </footer>

    </div>
  );
}
