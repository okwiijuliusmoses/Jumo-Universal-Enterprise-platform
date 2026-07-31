import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";

export const controlCenterTemplate = (state) => {
  // Privilege verification check
  const isAdmin = state.session?.user?.isAdmin === true;
  if (!isAdmin) {
    app.innerHTML = `
      <div class="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
        <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-rose-200 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-2xl">
            🔒
          </div>
          <h2 class="text-xl font-bold text-slate-900">Access Denied</h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            The JUMO UEOS Administrative Control Center requires privileged Administrator credentials.
          </p>
          <button onclick="navigate('/gateway')" class="w-full py-3 rounded-xl bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm">
            &larr; Return to Personal Gateway
          </button>
        </div>
      </div>
    `;
    return;
  }

  const logoHtml = getOfficialLogoHtml({ size: "sm", textColor: "light" });

  app.innerHTML = `
    <div class="min-h-screen flex bg-slate-50 font-sans">
      <!-- Sidebar for Admin Control Center tabs -->
      <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        <div class="p-5 border-b border-slate-800 cursor-pointer" onclick="navigate('/gateway')">
          ${logoHtml}
        </div>

        <div class="px-5 py-2 bg-rose-950/40 border-b border-slate-800 text-[10px] font-mono text-rose-300 font-bold uppercase tracking-wider">
          Internal UEOS Control Center
        </div>

        <!-- Admin controls tabs -->
        <nav class="flex-1 p-3 space-y-1 text-xs">
          <button onclick="state.activeTab='diagnostics'; fetchRuntime();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='diagnostics'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
            <span>📊 Kernel Telemetry</span>
          </button>
          <button onclick="state.activeTab='services'; fetchRuntime();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='services'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
            <span>🛠 Service Registry</span>
          </button>
          <button onclick="state.activeTab='security-rules'; render();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='security-rules'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
            <span>🔒 Security Policies</span>
          </button>
          <button onclick="state.activeTab='config'; render();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='config'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
            <span>⚙️ System Parameters</span>
          </button>
        </nav>

        <div class="p-3 border-t border-slate-800 space-y-1.5 text-xs">
          <button onclick="navigate('/gateway')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">&larr; Return to Gateway</button>
          <button onclick="navigate('/workspace')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">Workspace Resolver</button>
          <button onclick="navigate('/shell')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer font-mono">Operating Shell</button>
          <button onclick="handleLogout()" class="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">Exit Admin Mode</button>
        </div>
      </aside>

      <!-- Control Center panel area -->
      <div class="flex-1 flex flex-col min-w-0">
        <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 font-sans">
          <div class="flex items-center space-x-3">
            <span class="font-extrabold text-slate-800 text-sm uppercase tracking-wider">JUMO UEOS Live Control Center</span>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-[10px] font-mono bg-rose-100 text-rose-800 border border-rose-200 font-bold uppercase tracking-wider px-2.5 py-1.5 rounded">ADMINISTERING: ${BRAND_CONFIG.poweredBy}</span>
            <button onclick="navigate('/gateway')" class="text-xs font-bold text-slate-600 hover:text-enterprise-blue">&larr; Back to Gateway</button>
          </div>
        </header>

        <main class="flex-1 p-6 lg:p-8 overflow-y-auto">
          <!-- Tab: Telemetry dashboard -->
          ${state.activeTab === 'diagnostics' || !state.activeTab ? `
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-slate-900 font-sans">Kernel Telemetry & Memory Isolation Metrics</h3>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-semibold">
                <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                  <span class="font-semibold text-slate-400 uppercase tracking-wider">Kernel State</span>
                  <p class="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">Running</p>
                </div>
                <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                  <span class="font-semibold text-slate-400 uppercase tracking-wider">Active Services</span>
                  <p class="text-2xl font-extrabold text-indigo-600 mt-1 font-mono">57 Bound</p>
                </div>
                <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                  <span class="font-semibold text-slate-400 uppercase tracking-wider">Memory Allocation</span>
                  <p class="text-2xl font-extrabold text-slate-900 mt-1 font-mono">74.2 MB RSS</p>
                </div>
                <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                  <span class="font-semibold text-slate-400 uppercase tracking-wider">System Process ID</span>
                  <p class="text-2xl font-extrabold text-slate-900 mt-1 font-mono">PID: 2459</p>
                </div>
              </div>

              <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs font-semibold">
                <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Active Security & Infrastructure Daemons</h4>
                <div class="space-y-2 text-xs">
                  <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <span class="font-bold text-slate-800">AEGIS Cryptographic Audit Compliance Scan</span>
                      <p class="text-[10px] text-slate-400 mt-0.5 font-mono">Interval: 3600s &bull; Status: RUNNING</p>
                    </div>
                    <span class="text-emerald-600 font-bold font-mono">PASS</span>
                  </div>
                  <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <span class="font-bold text-slate-800">Multi-Tenant Isolation Verification</span>
                      <p class="text-[10px] text-slate-400 mt-0.5 font-mono">Interval: 86400s &bull; Status: SCHEDULED</p>
                    </div>
                    <span class="text-slate-500 font-bold font-mono">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Tab: Service registry -->
          ${state.activeTab === 'services' ? `
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-slate-900">UEOS Bound Service Registry</h3>
              <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-xs">
                <p class="text-slate-600 mb-4 font-semibold">Live registered kernel services bound into ${BRAND_CONFIG.poweredBy}:</p>
                <div class="space-y-3 font-mono">
                  <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span class="font-bold text-slate-900">Identity & Tenant Resolution Service</span>
                    <span class="text-emerald-600 font-bold">v1.0.0 ACTIVE</span>
                  </div>
                  <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span class="font-bold text-slate-900">Unified Workflow & Approval Engine</span>
                    <span class="text-emerald-600 font-bold">v1.0.0 ACTIVE</span>
                  </div>
                  <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span class="font-bold text-slate-900">AI Model Abstraction & Request Router</span>
                    <span class="text-emerald-600 font-bold">v1.0.0 ACTIVE</span>
                  </div>
                  <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span class="font-bold text-slate-900">FAAP Financial & Multi-Currency Ledger</span>
                    <span class="text-emerald-600 font-bold">v1.0.0 ACTIVE</span>
                  </div>
                  <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span class="font-bold text-slate-900">AEGIS Immutable Accountability Ledger</span>
                    <span class="text-emerald-600 font-bold">v1.0.0 ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Tab: Security policies -->
          ${state.activeTab === 'security-rules' ? `
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-slate-900">AEGIS Cryptographic Security Policies</h3>
              <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-xs space-y-4 font-semibold">
                <div class="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <h4 class="font-bold text-enterprise-blue">Ring-0 Physical Execution Isolation</h4>
                  <p class="text-slate-600 text-xs mt-1">Enforces memory boundary checks across all multi-tenant organization execution spaces.</p>
                </div>
                <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <h4 class="font-bold text-emerald-800">Zero-Trust Identity Authentication</h4>
                  <p class="text-slate-600 text-xs mt-1">Requires digital signature signatures and cryptographic token checks on every endpoint call.</p>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Tab: Live Config -->
          ${state.activeTab === 'config' ? `
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-slate-900">Live Config Parameters</h3>
              <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-xs font-mono space-y-2">
                <p class="text-slate-800">PLATFORM_NAME = "${BRAND_CONFIG.platformName}"</p>
                <p class="text-slate-800">SYSTEM_NAME = "${BRAND_CONFIG.poweredBy}"</p>
                <p class="text-slate-800">OWNER = "${BRAND_CONFIG.ownership}"</p>
                <p class="text-slate-800">SOVEREIGN_REGION = "${BRAND_CONFIG.officeLocations.country}"</p>
              </div>
            </div>
          ` : ''}
        </main>
      </div>
    </div>
  `;
};
