import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";

/**
 * JUMO UEOS Digital Control Center Login (/control-center/login)
 * Dedicated Platform Owner Authentication (Strictly sovereign platform headquarters - updated 2026)
 */
export const controlCenterLoginTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "lg", textColor: "dark" });

  app.innerHTML = `
    <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800">
      <!-- Top Header -->
      <header class="p-6 border-b border-slate-200 bg-white shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3 cursor-pointer" onclick="navigate('/')">
            <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">J</div>
            <div>
              <div class="font-extrabold text-slate-900 tracking-tight text-base">JUMO UEOS</div>
              <div class="text-[10px] text-emerald-700 font-bold tracking-widest uppercase">Digital Control Center</div>
            </div>
          </div>
          <button onclick="navigate('/')" class="text-xs font-bold text-slate-600 hover:text-emerald-700 transition flex items-center gap-1 cursor-pointer">
            &larr; Return to Public Gateway
          </button>
        </div>
      </header>

      <!-- Center Owner Authentication Box -->
      <div class="flex-1 flex items-center justify-center p-6">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 md:p-10 space-y-6">
          <div class="text-center space-y-2">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold font-mono uppercase border border-emerald-200">
              <span>🛡️ JUMO UEOS Platform Owner Authentication</span>
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900">JUMO UEOS DIGITAL CONTROL CENTER</h1>
            <p class="text-xs text-slate-500">Sovereign operating headquarters for platform control and enterprise governance</p>
          </div>

          ${state.controlCenterAuthError ? `
            <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
              ⚠️ ${state.controlCenterAuthError}
            </div>
          ` : ''}

          <form onsubmit="handleControlCenterLogin(event)" class="space-y-5 text-xs font-semibold">
            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Platform Owner Identity / Email</label>
              <input type="email" id="cc-email" value="owner@jumo.ueos" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-slate-50 font-bold text-slate-900">
            </div>

            <div>
              <label class="block text-slate-700 uppercase tracking-wider mb-2">Master Cryptographic Password</label>
              <input type="password" id="cc-password" value="owner123" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-slate-50 font-bold text-slate-900">
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">🔒</div>
              <div>
                <p class="font-bold text-slate-800">Enterprise Security Notice</p>
                <p class="text-[10px] text-slate-500">Authorized platform owner access only. No institutional branding. All operations logged immutably via AEGIS.</p>
              </div>
            </div>

            <button type="submit" class="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer">
              Authenticate & Access Control Center &rarr;
            </button>
          </form>

          <div class="pt-4 border-t border-slate-100 text-center">
            <p class="text-[11px] text-slate-400 font-mono">JUMO UEOS v1.0-genesis &bull; Sovereign Architecture</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="py-4 text-center text-xs text-slate-500 bg-white border-t border-slate-200 font-mono">
        ${BRAND_CONFIG.ownership} &bull; ${BRAND_CONFIG.poweredBy}
      </footer>
    </div>
  `;
};

window.handleControlCenterLogin = function(e) {
  e.preventDefault();
  const emailInput = document.getElementById("cc-email");
  const email = emailInput ? emailInput.value : "owner@jumo.ueos";

  state.ccSession = {
    user: {
      name: "Platform Owner",
      email: email,
      role: "Sovereign Owner",
      isOwner: true
    }
  };
  navigate("/control-center");
};

/**
 * JUMO UEOS Digital Control Center Main Workspace (/control-center)
 */
export const controlCenterTemplate = (state) => {
  if (!state.ccSession) {
    navigate("/control-center/login");
    return;
  }

  const activeView = state.ccActiveView || "overview";
  const isLauncherOpen = state.ccLauncherOpen || false;
  const isCommandPaletteOpen = state.ccCommandPaletteOpen || false;
  const isNotificationCenterOpen = state.ccNotificationOpen || false;
  const isActivityCenterOpen = state.ccActivityOpen || false;
  const isHelpOpen = state.ccHelpOpen || false;
  const isAiAssistantOpen = state.ccAiAssistantOpen || false;

  app.innerHTML = `
    <div class="flex flex-col h-screen bg-[#F8F9FB] text-slate-900 font-sans antialiased overflow-hidden select-none">
      
      <!-- 1. GLOBAL HEADER -->
      <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-40 shrink-0 shadow-xs">
        <div class="flex items-center gap-4">
          <!-- Workspace Launcher Button -->
          <button onclick="toggleCCLauncher()" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 flex items-center justify-center transition cursor-pointer" title="Open Apps & Services Launcher">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          </button>
          
          <div class="flex items-center gap-3 cursor-pointer" onclick="setCCView('overview')">
            <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">J</div>
            <div>
              <div class="font-extrabold text-slate-900 tracking-tight text-sm">JUMO UEOS DIGITAL CONTROL CENTER</div>
              <div class="text-[10px] text-emerald-700 font-bold tracking-widest uppercase">Platform Operating Headquarters</div>
            </div>
          </div>
        </div>

        <!-- Global Search Bar (Triggers Command Palette / Ctrl+K) -->
        <div class="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div onclick="toggleCCCommandPalette()" class="w-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-500 flex items-center justify-between cursor-pointer transition shadow-xs">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Search everything (ERPs, installed apps, services, settings)...
            </span>
            <span class="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 font-bold">Ctrl+K</span>
          </div>
        </div>

        <!-- Right Header Actions -->
        <div class="flex items-center gap-2">
          <button onclick="toggleCCAiAssistant()" class="p-2 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition cursor-pointer flex items-center gap-1.5 px-3 text-xs font-bold" title="UEOS Operations Assistant">
            <span>🤖</span>
            <span class="hidden sm:inline">UEOS Assistant</span>
          </button>

          <button onclick="toggleCCNotification()" class="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition cursor-pointer" title="Notifications">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          </button>
          
          <button onclick="toggleCCActivity()" class="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer" title="Global Activity Center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </button>

          <button onclick="toggleCCHelp()" class="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer" title="Context Help">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>

          <!-- Profile Dropdown Menu -->
          <div class="relative ml-2">
            <button onclick="toggleCCProfileMenu()" class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">SO</div>
              <span class="text-xs font-bold text-slate-700 hidden sm:inline">Platform Owner</span>
            </button>
            <div id="cc-profile-dropdown" class="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 hidden z-50">
              <div class="px-4 py-2 border-b border-slate-100">
                <p class="text-xs font-bold text-slate-900">Platform Owner</p>
                <p class="text-[10px] text-slate-500 font-mono">owner@jumo.ueos</p>
              </div>
              <button onclick="setCCView('settings'); toggleCCProfileMenu();" class="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium">Platform Settings</button>
              <button onclick="setCCView('owner-workspace'); toggleCCProfileMenu();" class="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium">Owner Workspace & Master Registries</button>
              <button onclick="setCCView('aegis'); toggleCCProfileMenu();" class="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium">AEGIS Security Audit</button>
              <div class="border-t border-slate-100 my-1"></div>
              <button onclick="state.ccSession = null; navigate('/control-center/login');" class="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold">Logout Control Center</button>
            </div>
          </div>
        </div>
      </header>

      <!-- 2. WORKSPACE LAUNCHER -->
      ${isLauncherOpen ? `
        <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex animate-fadeIn" onclick="toggleCCLauncher()">
          <div class="bg-white w-full max-w-2xl h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideRight" onclick="event.stopPropagation()">
            <div>
              <div class="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
                <div>
                  <h2 class="text-lg font-bold text-slate-900">JUMO UEOS Platform Launcher</h2>
                  <p class="text-xs text-slate-500">Instant access to all sovereign operating workspaces and modules</p>
                </div>
                <button onclick="toggleCCLauncher()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold cursor-pointer">&times;</button>
              </div>

              <div class="grid grid-cols-3 gap-4">
                ${launcherTile('overview', '🏠', 'Platform Overview', 'Executive Dashboard')}
                ${launcherTile('platform-services', '⚙️', 'Platform Services', 'Identity, Workflow, Messaging')}
                ${launcherTile('ai-command-center', '🧠', 'AI Command Center', 'Master AI Authority & Agent Registry')}
                ${launcherTile('engineering-workspace', '🛠️', 'Engineering Center', 'ERP Provisioning, Build & Deploy')}
                ${launcherTile('release-center', '🚀', 'Release Center', 'Version Control & Rollbacks')}
                ${launcherTile('erp-factory', '🏭', 'ERP Factory', 'Ecosystem Blueprints')}
                ${launcherTile('erp-store', '🛒', 'ERP Store', 'Marketplace & Distribution')}
                ${launcherTile('installed-apps', '📦', 'Installed Platforms', 'Active Enterprise Instances')}
                ${launcherTile('ai-platform', '🤖', 'AI Platform', 'Models, Agents & Workflows')}
                ${launcherTile('faap', '💰', 'FAAP Financials', 'Treasury, Ledger & Budget')}
                ${launcherTile('digital-pay', '💳', 'Digital Pay', 'Payments, Wallets & CBDC')}
                ${launcherTile('aegis', '🛡️', 'AEGIS Security', 'Audit, Compliance & Cryptography')}
                ${launcherTile('config', '🔧', 'Configuration', 'Identity, Branding, Domains')}
                ${launcherTile('settings', '⚙️', 'Platform Settings', 'Policies, Network & Plugins')}
                ${launcherTile('owner-workspace', '🏛️', 'Owner Workspace', 'Master Governance Registries')}
                ${launcherTile('system-services', '📊', 'System Services', 'Kernel & Runtime Monitoring')}
              </div>
            </div>

            <div class="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>JUMO UEOS Sovereign Layer</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 3. UNIVERSAL COMMAND PALETTE (Ctrl+K) -->
      ${isCommandPaletteOpen ? `
        <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-24 p-4 animate-fadeIn" onclick="toggleCCCommandPalette()">
          <div class="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp" onclick="event.stopPropagation()">
            <div class="flex items-center px-5 py-4 border-b border-slate-200 bg-slate-50">
              <svg class="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" id="cc-palette-input" placeholder="Search ERPs, installed apps, services, settings..." class="w-full bg-transparent text-sm text-slate-900 focus:outline-none font-medium" autofocus>
              <span class="text-[10px] font-mono bg-slate-200 text-slate-600 px-2 py-1 rounded">ESC</span>
            </div>
            <div class="p-3 max-h-96 overflow-y-auto space-y-1">
              <div class="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 py-1">Quick Navigation & Commands</div>
              ${paletteItem('overview', '🏠', 'Platform Overview', 'Executive Dashboard')}
              ${paletteItem('erp-factory', '🏭', 'ERP Factory', 'Design Enterprise Blueprints')}
              ${paletteItem('installed-apps', '📦', 'Installed Enterprise Platforms', 'Manage All Deployed Instances')}
              ${paletteItem('erp-store', '🛒', 'ERP Store Marketplace', 'Manage Installs & Updates')}
              ${paletteItem('ai-platform', '🤖', 'AI Platform & Agents', 'Manage Models & Workflows')}
              ${paletteItem('faap', '💰', 'FAAP Treasury & Ledger', 'Global Financials')}
              ${paletteItem('digital-pay', '💳', 'Digital Pay', 'Gateways & Settlements')}
              ${paletteItem('aegis', '🛡️', 'AEGIS Security & Audit', 'Compliance & Cryptography')}
              ${paletteItem('system-services', '📊', 'System Services & Runtime Monitoring', 'Kernel & Diagnostics')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 4. UEOS OPERATIONS ASSISTANT MODAL (Owner AI) -->
      ${isAiAssistantOpen ? `
        <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn" onclick="toggleCCAiAssistant()">
          <div class="bg-white w-full max-w-lg h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft" onclick="event.stopPropagation()">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">🤖</div>
                  <div>
                    <h3 class="font-bold text-slate-900 text-sm">UEOS Operations Assistant</h3>
                    <p class="text-[11px] text-emerald-700 font-bold">Sovereign Platform Management AI</p>
                  </div>
                </div>
                <button onclick="toggleCCAiAssistant()" class="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
              </div>

              <div class="space-y-4 text-xs">
                <div class="p-3 bg-slate-100 rounded-xl text-slate-700">
                  <p class="font-bold mb-1">Greetings, Platform Owner.</p>
                  <p>I am your UEOS Operations Assistant. I can help you monitor cluster deployments, verify AEGIS compliance rings, inspect tenancy quotas, or trigger ERP updates.</p>
                </div>

                <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                  <p class="font-bold text-emerald-900">Suggested Sovereign Commands:</p>
                  <button onclick="alert('Running AEGIS cross-tenant compliance audit...');" class="w-full text-left p-2 bg-white hover:bg-emerald-100 rounded-lg text-emerald-800 font-medium transition">🛡️ Run AEGIS cryptographic audit scan</button>
                  <button onclick="alert('Verifying multi-tenant memory isolation boundaries...');" class="w-full text-left p-2 bg-white hover:bg-emerald-100 rounded-lg text-emerald-800 font-medium transition">📊 Verify memory isolation metrics</button>
                  <button onclick="alert('Syncing ERP Store registry across 142 tenants...');" class="w-full text-left p-2 bg-white hover:bg-emerald-100 rounded-lg text-emerald-800 font-medium transition">🔄 Sync ERP Marketplace updates</button>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-200">
              <div class="flex gap-2">
                <input type="text" placeholder="Ask UEOS Assistant..." class="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600">
                <button onclick="alert('Command processed by UEOS Assistant.');" class="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition">Send</button>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 5. NOTIFICATION CENTER MODAL -->
      ${isNotificationCenterOpen ? `
        <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn" onclick="toggleCCNotification()">
          <div class="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft" onclick="event.stopPropagation()">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div>
                  <h3 class="font-bold text-slate-900">Universal Notification Center</h3>
                  <p class="text-xs text-slate-500">Platform alerts, security ring & deployments</p>
                </div>
                <button onclick="toggleCCNotification()" class="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
              </div>

              <div class="space-y-3">
                ${notifCard('security', 'AEGIS Audit Completed', 'Zero-trust cryptographic ring verified across 57 tenant nodes.', '10m ago', 'emerald')}
                ${notifCard('deployment', 'University ERP v1.2.0 Deployed', 'Successfully propagated to Education Ecosystem clusters.', '45m ago', 'blue')}
                ${notifCard('payment', 'FAAP Treasury Settlement', 'Global multi-currency reconciliation completed successfully.', '2h ago', 'emerald')}
                ${notifCard('ai', 'JUMO AI Model Weights Updated', 'Advanced inference routing active for all tenant agents.', '5h ago', 'purple')}
              </div>
            </div>
            <div class="pt-4 border-t border-slate-200 text-center">
              <button onclick="alert('All notifications marked as read.'); toggleCCNotification();" class="text-xs font-bold text-emerald-600 hover:underline">Mark all as read</button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 6. GLOBAL ACTIVITY CENTER MODAL -->
      ${isActivityCenterOpen ? `
        <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn" onclick="toggleCCActivity()">
          <div class="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft" onclick="event.stopPropagation()">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div>
                  <h3 class="font-bold text-slate-900">Global Activity Center</h3>
                  <p class="text-xs text-slate-500">Operational audit trail & platform events</p>
                </div>
                <button onclick="toggleCCActivity()" class="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
              </div>

              <div class="space-y-4 text-xs">
                ${activityItem('University ERP Installed', 'ERP Store deployed new tenant instance', 'Just now')}
                ${activityItem('Identity Service Updated', 'OAuth token rotation policy enforced', '15m ago')}
                ${activityItem('Workflow Published', 'Automated approval DAG compiled', '1h ago')}
                ${activityItem('AI Agent Created', 'Customer support LLM instance bound', '3h ago')}
                ${activityItem('Institution Registered', 'Kampala Institute of Tech onboarded', '5h ago')}
                ${activityItem('Payment Gateway Connected', 'JUMO Digital Pay SWIFT bridge active', '1d ago')}
              </div>
            </div>
            <div class="pt-4 border-t border-slate-200 text-center">
              <button onclick="alert('Exporting full operational audit log...'); toggleCCActivity();" class="text-xs font-bold text-slate-700 hover:underline">Export Full Audit Log</button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 7. CONTEXT HELP PANEL -->
      ${isHelpOpen ? `
        <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn" onclick="toggleCCHelp()">
          <div class="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft" onclick="event.stopPropagation()">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div>
                  <h3 class="font-bold text-slate-900">Context Help & Documentation</h3>
                  <p class="text-xs text-slate-500">JUMO UEOS Sovereign Operating Guidelines</p>
                </div>
                <button onclick="toggleCCHelp()" class="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
              </div>

              <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>The <strong>JUMO UEOS Digital Control Center</strong> is the sovereign operating headquarters of the JUMO DIGITAL ENTERPRISE PLATFORM.</p>
                <p><strong>Key Principles:</strong></p>
                <ul class="list-disc pl-4 space-y-1">
                  <li>No permanent left sidebars. Workspace remains maximum width.</li>
                  <li>Use the Workspace Launcher (grid icon) for instant navigation.</li>
                  <li>Press <strong>Ctrl+K</strong> anywhere to invoke the Universal Command Palette.</li>
                  <li>System diagnostics and runtime metrics are exclusively located under <strong>System Services > Runtime Monitoring</strong>.</li>
                </ul>
              </div>
            </div>
            <div class="pt-4 border-t border-slate-200 text-center">
              <button onclick="alert('Opening official JUMO UEOS Developer & Administrator Manual...'); toggleCCHelp();" class="text-xs font-bold text-emerald-600 hover:underline">View Full Documentation</button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- MAIN WORKSPACE CONTAINER -->
      <main class="flex-1 overflow-y-auto bg-[#F8F9FB]">
        <div class="max-w-7xl mx-auto p-8">
          
          <!-- Breadcrumb & Page Header -->
          <nav class="text-xs text-slate-500 mb-3 font-medium flex items-center gap-2">
            <span>Home</span>
            <span>&gt;</span>
            <span class="capitalize font-bold text-slate-700">${activeView.replace('-', ' ')}</span>
          </nav>

          <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
            <div>
              <h1 class="text-2xl font-black text-slate-900 tracking-tight">${getViewTitle(activeView)}</h1>
              <p class="text-xs text-slate-500 mt-1">${getViewDescription(activeView)}</p>
            </div>
            
            <!-- Universal Toolbar -->
            <div class="flex items-center gap-2">
              <button onclick="alert('Action completed successfully.')" class="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer">New</button>
              <button onclick="alert('Import dialog opened.')" class="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer">Import</button>
              <button onclick="alert('Exporting data package...');" class="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer">Export</button>
              <button onclick="window.location.reload()" class="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer">Refresh</button>
              <button onclick="toggleCCCommandPalette()" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer">Search...</button>
            </div>
          </div>

          <!-- DYNAMIC VIEW RENDERER -->
          ${renderViewContent(activeView)}

        </div>
      </main>

    </div>
  `;
};

function getViewTitle(view) {
  switch(view) {
    case 'overview': return 'JUMO UEOS Control Center • Executive Dashboard';
    case 'platform-services': return 'Platform Services Catalog';
    case 'ai-command-center': return 'JUMO AI Command & Management Center';
    case 'engineering-workspace': return 'JUMO ERP Engineering & Deployment Workspace';
    case 'release-center': return 'JUMO Release & Version Management Center';
    case 'erp-factory': return 'ERP Factory & Ecosystem Blueprints';
    case 'erp-store': return 'ERP Store Marketplace & Distribution';
    case 'installed-apps': return 'Installed Enterprise Platforms';
    case 'ai-platform': return 'JUMO AI Platform & Agents';
    case 'faap': return 'FAAP Financials & Treasury Engine';
    case 'digital-pay': return 'JUMO Digital Pay & Settlements';
    case 'aegis': return 'AEGIS Security, Audit & Cryptography';
    case 'config': return 'Platform Configuration & Branding';
    case 'settings': return 'Platform Settings & Policies';
    case 'owner-workspace': return 'Owner Workspace & Master Registries';
    case 'system-services': return 'System Services & Runtime Monitoring';
    default: return 'Control Center Workspace';
  }
}

function getViewDescription(view) {
  switch(view) {
    case 'overview': return 'Good morning. Executive overview of platform applications, ecosystem factory, installed instances, and overall system health.';
    case 'platform-services': return 'Identity, authentication, workflow, notifications, messaging, reporting, and licensing.';
    case 'ai-command-center': return 'Centralized AI authority managing all enterprise agents, LLM models, prompt policies, and AI security audit logs across the JUMO ecosystem.';
    case 'engineering-workspace': return 'Platform engineering headquarters for ERP template provisioning, building, deployment targets, build monitoring, and runtime diagnostics.';
    case 'release-center': return 'Manage platform version releases, deployment history, changelogs, and instant cryptographic rollbacks.';
    case 'erp-factory': return 'Design and configure modular enterprise ERP blueprints across Education, Hospitality, Church, Alumni, and Corporate.';
    case 'erp-store': return 'Manage installed ERP packages, version upgrades, and marketplace distributions.';
    case 'installed-apps': return 'Comprehensive master registry of every deployed ERP installation across all tenant institutions.';
    case 'ai-platform': return 'LLM models, autonomous agents, prompt management, and knowledge bases.';
    case 'faap': return 'Global treasury, accounting, general ledger, procurement, and payroll engine.';
    case 'digital-pay': return 'Payment providers, collections, receipts, mobile money, and CBDC bridges.';
    case 'aegis': return 'Immutable compliance logs, encryption rings, digital signatures, and forensics.';
    case 'config': return 'Platform identity, localization, cloud storage, domains, and messaging gateways.';
    case 'settings': return 'General platform policies, security rings, database connectors, and plugins.';
    case 'owner-workspace': return 'Master registries for tenants, applications, services, and deployments.';
    case 'system-services': return 'Kernel runtime metrics, memory allocation, process IDs, and isolated daemon logs.';
    default: return 'Sovereign operating environment for the JUMO Enterprise Platform.';
  }
}

/**
 * Render Specific Workspace Views
 */
function renderViewContent(view) {
  if (view === 'overview') {
    return `
      <div class="space-y-8">
        <!-- Executive Greeting & Status -->
        <div class="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 text-emerald-200 rounded-full text-[11px] font-mono uppercase font-bold tracking-wider">
              <span>🛡️ Sovereign Control Center</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">Good morning, Platform Owner</h2>
            <p class="text-xs text-emerald-200 max-w-xl">JUMO UEOS operating headquarters is running at peak multi-tenant efficiency. All platform services, AEGIS audit rings, and FAAP ledgers are fully synchronized.</p>
          </div>
          <div class="flex flex-col items-center gap-3 shrink-0">
            <button onclick="navigate('/erp')" class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer">
              <span>🚀 Launch Dynamic ERP Platform</span>
            </button>
            <div class="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center">
              <span class="text-[10px] uppercase font-mono text-emerald-300">System Health: </span>
              <span class="text-xs font-bold text-white">Healthy & Secure</span>
            </div>
          </div>
        </div>

        <!-- Core Applications Grid (Strictly as requested) -->
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-extrabold text-base text-slate-900 flex items-center gap-2">📂 Platform Applications & Ecosystems</h3>
            <span class="text-xs font-mono text-slate-400 font-bold">Control Center Core</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${appCard('ERP Factory', 'Design blueprints', '🏭', 'erp-factory', 'emerald')}
            ${appCard('ERP Store', 'Marketplace & updates', '🛒', 'erp-store', 'amber')}
            ${appCard('Installed Platforms', 'Manage active instances', '📦', 'installed-apps', 'indigo')}
            ${appCard('AI Platform', 'Models, agents & RAG', '🤖', 'purple')}
            ${appCard('Digital Pay', 'Gateways & settlements', '💳', 'blue')}
            ${appCard('FAAP Financials', 'Treasury & ledger', '💰', 'emerald')}
            ${appCard('AEGIS Security', 'Audit & compliance', '🛡️', 'slate')}
            ${appCard('Identity Platform', 'Access & tokens', '🔐', 'blue')}
          </div>
        </div>

        <!-- Recently Used Workspaces -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-sm text-slate-900">Recently Used Workspaces</h3>
            <span class="text-[10px] font-mono text-slate-400">Quick Access</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs font-semibold">
            ${recentTile('installed-apps', 'Installed Platforms', '📦')}
            ${recentTile('erp-factory', 'ERP Factory', '🏭')}
            ${recentTile('ai-platform', 'AI Platform', '🤖')}
            ${recentTile('faap', 'FAAP Financials', '💰')}
            ${recentTile('system-services', 'System Services', '📊')}
          </div>
        </div>
      </div>
    `;
  }

  if (view === 'ai-command-center') {
    return `
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-[11px] font-mono uppercase font-bold tracking-wider">
              <span>🧠 Centralized Master AI Authority</span>
            </div>
            <h2 class="text-2xl font-extrabold tracking-tight">JUMO AI Command & Management Center</h2>
            <p class="text-xs text-slate-300 max-w-2xl">Master oversight of all autonomous enterprise agents, LLM model registries, prompt governance, task queues, and AEGIS AI security audit logs.</p>
          </div>
          <button onclick="alert('Synchronizing all agent clusters...');" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer">Sync AI Fleet</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${serviceCard('AI Agent Registry', '142 Active Enterprise Agents across all tenants', '🤖')}
          ${serviceCard('Model Registry', 'Gemini, Llama and custom enterprise LLM weights', '🧠')}
          ${serviceCard('Prompt Governance', 'Version-controlled security prompt policies', '✍️')}
          ${serviceCard('Task Queue', 'Active asynchronous agent reasoning jobs', '⚡')}
          ${serviceCard('AEGIS AI Audit Logs', 'Immutable reasoning trace and compliance logs', '🛡️')}
          ${serviceCard('Memory & Knowledge RAG', 'Vector embeddings and document indices', '📚')}
        </div>
      </div>
    `;
  }

  if (view === 'engineering-workspace') {
    return `
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-[11px] font-mono uppercase font-bold tracking-wider">
              <span>🛠️ Platform Engineering Headquarters</span>
            </div>
            <h2 class="text-2xl font-extrabold tracking-tight">JUMO ERP Engineering & Deployment Workspace</h2>
            <p class="text-xs text-slate-300 max-w-2xl">Provisioning, building, upgrading, and maintaining certified ERP templates and tenant instances. Strictly restricted to Platform Engineers.</p>
          </div>
          <button onclick="alert('Initializing new ERP build sequence...');" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer">New Build Sequence</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-sm text-slate-900">Assigned Platform Engineer & Status</h3>
            <div class="space-y-3 text-xs">
              <div class="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span class="text-slate-500">Assigned Lead Engineer</span>
                <span class="font-bold text-slate-900">Dr. Julius Moses Okwii (Sovereign Lead)</span>
              </div>
              <div class="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span class="text-slate-500">Current Release</span>
                <span class="font-mono font-bold text-emerald-700">v1.0-genesis (Production)</span>
              </div>
              <div class="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span class="text-slate-500">Repository Status</span>
                <span class="font-bold text-emerald-600">Clean &bull; Synchronized with Origin</span>
              </div>
              <div class="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span class="text-slate-500">Next Scheduled Release</span>
                <span class="font-mono font-bold text-slate-800">2026-08-15 (v1.1-enterprise)</span>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-sm text-slate-900">Engineering Operations & Actions</h3>
            <div class="grid grid-cols-2 gap-3 text-xs font-bold">
              <button onclick="alert('Provisioning ERP blueprint container...');" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-left transition cursor-pointer">➕ Provision ERP</button>
              <button onclick="alert('Running rolling upgrade across all nodes...');" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-left transition cursor-pointer">🚀 Upgrade ERP</button>
              <button onclick="alert('Backing up master state database...');" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-left transition cursor-pointer">💾 Backup State</button>
              <button onclick="alert('Restoring from cryptographic snapshot...');" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-left transition cursor-pointer">🔄 Restore Snapshot</button>
              <button onclick="alert('Opening secure Linux terminal console...');" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-left transition cursor-pointer">💻 Open Terminal</button>
              <button onclick="alert('Exporting build diagnostics report...');" class="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl text-left transition cursor-pointer">📊 Export Logs</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (view === 'release-center') {
    return `
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-[11px] font-mono uppercase font-bold tracking-wider">
              <span>🚀 Version Control & Rollback Management</span>
            </div>
            <h2 class="text-2xl font-extrabold tracking-tight">JUMO Release Center</h2>
            <p class="text-xs text-slate-300 max-w-2xl">Manage platform build versions, deployment history, changelogs, and instant cryptographic rollbacks.</p>
          </div>
          <button onclick="alert('Creating new release tag...');" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer">Publish Release</button>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="font-bold text-sm text-slate-900">Recent Platform Releases & Deployment History</h3>
          <div class="space-y-3 text-xs">
            <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p class="font-bold text-slate-900">v1.0-genesis &bull; Sovereign UEOS Core Architecture</p>
                <p class="text-[11px] text-slate-500">Deployed to production clusters with full FAAP, Digital Pay, AEGIS security, and 9 ERP ecosystems.</p>
              </div>
              <span class="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">Active Production</span>
            </div>
            <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p class="font-bold text-slate-900">v0.9-beta &bull; Public Experience Gateway</p>
                <p class="text-[11px] text-slate-500">Initial public gateway and assistant integration.</p>
              </div>
              <span class="px-3 py-1 bg-slate-200 text-slate-700 font-bold rounded-full text-[10px]">Archived</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (view === 'platform-services') {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${serviceCard('Identity & Access', 'Authentication, OAuth and Role Governance', '🛡️')}
        ${serviceCard('Workflow Engine', 'Business process automation and approval DAGs', '⚡')}
        ${serviceCard('Notification Platform', 'Multi-channel event alerts and SMS/Email', '🔔')}
        ${serviceCard('Search & Indexing', 'Global multi-tenant search indexing', '🔍')}
        ${serviceCard('Document Platform', 'Digital signatures and secure vault storage', '📄')}
        ${serviceCard('Licensing & Tiers', 'Tenant provisioning and enterprise billing', '📜')}
      </div>
    `;
  }

  if (view === 'erp-factory' || view === 'erp-store') {
    return `
      <div class="space-y-8">
        <!-- Enterprise Ecosystem Banner -->
        <div class="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-[11px] font-mono uppercase font-bold tracking-wider">
              <span>🏭 JUMO ERP Ecosystem Factory & Store</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">Universal Enterprise Ecosystem Marketplace</h2>
            <p class="text-xs text-slate-300 max-w-2xl">Provision, configure, and manage modular enterprise ERP ecosystems. Every template inherits the sovereign UEOS kernel, FAAP treasury, Digital Pay clearinghouse, AEGIS security, and Staff SACCO platform.</p>
          </div>
          <button onclick="alert('Opening ERP Provisioning Wizard...');" class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer shrink-0">
            <span>➕ Create New ERP</span>
          </button>
        </div>

        <!-- Inherited Platform Services Banner -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">⚡ Inherited Platform Services (Auto-Bound to Every ERP)</h3>
            <span class="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">Zero-Duplication Architecture</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-6 gap-3 text-[11px] font-semibold">
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-600"></span>FAAP Financials</div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-600"></span>JUMO Digital Pay</div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-600"></span>AEGIS Security</div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-600"></span>AI Platform</div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-600"></span>Staff SACCO</div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-600"></span>Workflow Engine</div>
          </div>
        </div>

        <!-- All 9 Ecosystems Catalog -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-extrabold text-base text-slate-900">Enterprise ERP Ecosystems & Templates</h3>
            <span class="text-xs font-mono text-slate-500 font-bold">9 Certified Ecosystem Families</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 1. Education Ecosystem -->
            ${ecosystemCard('Education ERP Ecosystem', '🎓', 'Multi-tier academic management across universities, colleges, technical institutes, secondary, and primary schools.', 'emerald', [
              { name: 'University ERP', desc: 'Executive Council, Senate, faculties, student portal & research.' },
              { name: 'College ERP', desc: 'Campuses, departments, certificates & timetabling.' },
              { name: 'Vocational & Technical ERP', desc: 'Workshop management, practical grading & certifications.' },
              { name: 'Secondary School ERP', desc: 'O/A-Level structures, term reports & discipline registries.' },
              { name: 'Nursery & Primary School ERP', desc: 'Attendance, continuous assessment & parent communication.' }
            ])}

            <!-- 2. Church Ecosystem -->
            ${ecosystemCard('Church ERP Ecosystem', '⛪', 'Ecclesiastical governance, parish administration, tithes, offerings, and SACCO integration.', 'emerald', [
              { name: 'Local Church ERP', desc: 'Parishioners, local treasury, weekly collections & ministries.' },
              { name: 'Diocese ERP', desc: 'Archdeaconries, clergy registry, diocesan projects & assets.' },
              { name: 'Province ERP', desc: 'Provincial synods, bishoprics & multi-diocese reports.' },
              { name: 'National & International Church', desc: 'Global assemblies, mission boards & international aid.' }
            ])}

            <!-- 3. Hospitality Ecosystem -->
            ${ecosystemCard('Hospitality ERP Ecosystem', '🏨', 'Hotel, restaurant, resort, tourism, and lodge management.', 'emerald', [
              { name: 'Hotel & Resort ERP', desc: 'Front desk, room inventory, housekeeping & billing.' },
              { name: 'Restaurant & Dining ERP', desc: 'POS, kitchen display, table reservations & inventory.' },
              { name: 'Tourism & Tour Operator ERP', desc: 'Safaris, bookings, transport & guide scheduling.' },
              { name: 'Lodge & Conference Centre ERP', desc: 'Event halls, catering, guest check-in & billing.' }
            ])}

            <!-- 4. Alumni Ecosystem -->
            ${ecosystemCard('Alumni ERP Ecosystem', '🤝', 'Comprehensive alumni networks, chapters, donations, and career portals.', 'emerald', [
              { name: 'University Alumni Portal', desc: 'Graduation cohorts, chapters, endowment funds & mentoring.' },
              { name: 'College & School Alumni Network', desc: 'Yearbook records, reunions & institutional fundraising.' },
              { name: 'Professional Association Alumni', desc: 'Credential verification, continuing education & networking.' }
            ])}

            <!-- 5. Corporate Ecosystem -->
            ${ecosystemCard('Corporate ERP Ecosystem', '🏢', 'Private companies, holding groups, manufacturing, retail, and SME enterprise suites.', 'emerald', [
              { name: 'Enterprise Corporate ERP', desc: 'Subsidiaries, cross-company reporting, procurement & assets.' },
              { name: 'Manufacturing & Supply Chain ERP', desc: 'BOM, production lines, warehouse & logistics.' },
              { name: 'Retail Chain ERP', desc: 'Multi-branch POS, inventory synchronization & customer loyalty.' },
              { name: 'SME Business Suite', desc: 'Invoicing, tax compliance, payroll & general ledger.' }
            ])}

            <!-- 6. NGO Ecosystem -->
            ${ecosystemCard('NGO Ecosystem', '🌍', 'Non-governmental organisations, foundations, charities, and development partner aid tracking.', 'emerald', [
              { name: 'NGO & Foundation ERP', desc: 'Grant management, donor reporting, project milestones & field audits.' },
              { name: 'Charity & Community Organisation', desc: 'Beneficiary registries, volunteer management & relief distribution.' },
              { name: 'Faith-Based Organisation Network', desc: 'Community development programs & cross-border aid.' }
            ])}

            <!-- 7. Government Ecosystem -->
            ${ecosystemCard('Government Ecosystem', '🏛️', 'Ministries, departments, agencies, authorities, commissions, districts, and city councils.', 'emerald', [
              { name: 'Ministry & Department ERP', desc: 'Public sector budgeting, legislative tracking & citizen services.' },
              { name: 'District & City Council ERP', desc: 'Local revenue collection, public works, land registry & permits.' },
              { name: 'Public Authority & Commission', desc: 'Regulatory oversight, licensing registries & public hearings.' }
            ])}

            <!-- 8. Healthcare Ecosystem -->
            ${ecosystemCard('Healthcare Ecosystem', '🏥', 'National hospitals, regional clinics, medical laboratories, and health training institutions.', 'emerald', [
              { name: 'National & Regional Hospital ERP', desc: 'Patient EMR, ward management, pharmacy, billing & surgery.' },
              { name: 'District Health Centre & Clinic', desc: 'Outpatient queue, immunisation records & drug stock control.' },
              { name: 'Medical Laboratory & Training', desc: 'Diagnostic results, specimen tracking & student enrollment.' }
            ])}

            <!-- 9. Agriculture Ecosystem -->
            ${ecosystemCard('Agriculture Ecosystem', '🌾', 'Agricultural cooperatives, farmer groups, seed companies, processors, and exporters.', 'emerald', [
              { name: 'Agricultural Cooperative ERP', desc: 'Farmer member registries, crop collection, grading & payouts.' },
              { name: 'Agro-Processor & Exporter ERP', desc: 'Processing plant metrics, quality control, shipping & export documentation.' },
              { name: 'Seed & Input Distribution Company', desc: 'Agro-input supply chain, agent networks & credit sales.' }
            ])}
          </div>
        </div>
      </div>
    `;
  }

  if (view === 'installed-apps') {
    return `
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-bold text-sm text-slate-900">Installed Enterprise Platforms</h2>
              <p class="text-xs text-slate-500">Manage, configure, update, or suspend every deployed ERP installation across the platform.</p>
            </div>
            <button onclick="alert('Deploying new ERP instance...');" class="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition">Deploy New Instance</button>
          </div>

          <div class="space-y-3 text-xs">
            ${installedPlatformRow('University of Kampala', 'Education Ecosystem • University ERP', 'Active • 12,400 Users', 'emerald')}
            ${installedPlatformRow('Kampala Cathedral Diocese', 'Church Ecosystem • Diocese ERP', 'Active • 4,500 Users', 'emerald')}
            ${installedPlatformRow('Grand Serena Resort', 'Hospitality Ecosystem • Hospitality ERP', 'Active • 850 Users', 'emerald')}
            ${installedPlatformRow('Ministry of Finance', 'Government Ecosystem • Ministry ERP', 'Active • 3,200 Users', 'emerald')}
          </div>
        </div>
      </div>
    `;
  }

  if (view === 'ai-platform') {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${serviceCard('JUMO AI Models', 'Fine-tuned LLM inference routing and weights', '🤖')}
        ${serviceCard('Autonomous Agents', 'Specialized enterprise reasoning bots', '⚡')}
        ${serviceCard('Prompt Management', 'Version-controlled prompt templates', '✍️')}
        ${serviceCard('Knowledge Base', 'RAG vector embeddings and document indexing', '📚')}
        ${serviceCard('AI Workflows', 'Automated agentic multi-step task execution', '🔄')}
        ${serviceCard('Usage & Telemetry', 'Token consumption and latency monitoring', '📊')}
      </div>
    `;
  }

  if (view === 'faap') {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${serviceCard('Global Treasury', 'Multi-currency liquidity and cash management', '💰')}
        ${serviceCard('General Ledger', 'Double-entry sovereign accounting engine', '📖')}
        ${serviceCard('Budget & Assets', 'Capital allocation and fixed asset tracking', '📈')}
        ${serviceCard('Procurement', 'Purchase orders, vendor vetting and invoicing', '🛒')}
        ${serviceCard('Payroll Engine', 'Automated multi-jurisdiction salary disbursement', '💵')}
        ${serviceCard('Tax & Settlement', 'Automated tax withholding and clearinghouse', '🧾')}
      </div>
    `;
  }

  if (view === 'digital-pay') {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${serviceCard('Payment Gateways', 'Integration with SWIFT, VISA, Mastercard', '💳')}
        ${serviceCard('Mobile Money', 'MTN, Airtel and regional mobile wallets', '📱')}
        ${serviceCard('Collections & Invoices', 'Automated billing and payment reconciliation', '📥')}
        ${serviceCard('CBDC & Crypto', 'Central bank digital currency settlement rails', '🪙')}
      </div>
    `;
  }

  if (view === 'aegis') {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${serviceCard('Immutable Audit Logs', 'Cryptographically sealed system event stream', '🛡️')}
        ${serviceCard('Compliance Checker', 'Automated GDPR, SOC2 and ISO compliance', '✅')}
        ${serviceCard('Encryption Rings', 'AES-256 tenant data isolation keys', '🔑')}
        ${serviceCard('Forensics & Alerts', 'Threat detection and security incident response', '🚨')}
      </div>
    `;
  }

  if (view === 'config') {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${serviceCard('Platform Identity', 'Global naming, domains and SSL certificates', '🌐')}
        ${serviceCard('Localization', 'Languages, regional date formats and currencies', '🌍')}
        ${serviceCard('Cloud Storage', 'Multi-region S3, bucket policies and backups', '☁️')}
        ${serviceCard('Messaging Gateways', 'SMTP, Twilio SMS and webhook endpoints', '📨')}
      </div>
    `;
  }

  if (view === 'settings') {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${serviceCard('General Policies', 'Global operational limits and timeouts', '⚙️')}
        ${serviceCard('Authentication Policies', 'MFA enforcement and session lifetimes', '🔐')}
        ${serviceCard('Updates & Deployment', 'Zero-downtime rolling update configuration', '🚀')}
        ${serviceCard('Plugins & Extensions', 'Third-party module marketplace permissions', '🧩')}
      </div>
    `;
  }

  if (view === 'owner-workspace') {
    return `
      <div class="space-y-4">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 class="font-bold text-sm text-slate-900">Master Platform Registries & Configuration Authority</h2>
          <p class="text-xs text-slate-500">Only the Control Center Platform Owner can enable new ERP products, install apps, modify UEOS services, change platform security, disable FAAP/AEGIS, or modify AI infrastructure. Institution administrators are strictly restricted to institutional governance portals.</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            ${registryBox('ERP Registry', '4 Active Families')}
            ${registryBox('Service Registry', '57 Bound Services')}
            ${registryBox('Tenant Registry', '142 Active Tenants')}
            ${registryBox('Deployment Registry', 'v1.0-genesis')}
          </div>
        </div>
      </div>
    `;
  }

  if (view === 'system-services') {
    return `
      <div class="space-y-6">
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-3">
          <span class="text-xl">📊</span>
          <div>
            <p class="font-bold">System Services & Runtime Monitoring</p>
            <p class="text-[11px] text-emerald-700">Official kernel telemetry, runtime metrics, and memory isolation metrics. (Strictly located under System Services > Runtime Monitoring).</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${diagnosticCard('Kernel State', 'RUNNING (v1.0-genesis)', 'emerald')}
          ${diagnosticCard('Active Services', '57 Bound Daemons', 'emerald')}
          ${diagnosticCard('Memory RSS', '74.2 MB', 'blue')}
          ${diagnosticCard('Process ID', 'PID: 2459', 'slate')}
          ${diagnosticCard('AEGIS Audit Scan', 'Interval: 3600s • PASS', 'emerald')}
          ${diagnosticCard('Multi-Tenant Isolation', 'Verified Active', 'emerald')}
        </div>
      </div>
    `;
  }

  return `<div>Workspace view under construction.</div>`;
}

// UI Building Blocks for Views
function ecosystemCard(title, emoji, desc, color, templates) {
  const templatesHtml = templates.map(t => `
    <div class="p-3.5 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 rounded-xl transition flex flex-col justify-between space-y-2">
      <div>
        <p class="font-extrabold text-slate-900 text-xs">${t.name}</p>
        <p class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">${t.desc}</p>
      </div>
      <div class="flex items-center gap-2 pt-2.5 border-t border-slate-200/60">
        <button onclick="alert('Provisioning ${t.name} institutional instance...');" class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition cursor-pointer shadow-xs">Install</button>
        <button onclick="alert('Configuring ${t.name} blueprint settings...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-[10px] transition cursor-pointer shadow-xs">Configure</button>
        <button onclick="alert('Cloning ${t.name} template...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-[10px] transition cursor-pointer shadow-xs">Clone</button>
      </div>
    </div>
  `).join('');

  return `
    <div class="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
      <div class="flex items-start gap-4 pb-4 border-b border-slate-100">
        <div class="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
          ${emoji}
        </div>
        <div class="space-y-1">
          <h3 class="font-extrabold text-base text-slate-900">${title}</h3>
          <p class="text-xs text-slate-500 leading-relaxed">${desc}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        ${templatesHtml}
      </div>
    </div>
  `;
}

function appCard(title, desc, emoji, viewKey, color) {
  return `
    <div onclick="setCCView('${viewKey}')" class="p-6 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 rounded-2xl cursor-pointer transition flex flex-col items-center text-center group shadow-xs">
      <div class="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-xl mb-3 group-hover:scale-105 transition">
        ${emoji}
      </div>
      <h3 class="font-bold text-xs text-slate-900 group-hover:text-emerald-700">${title}</h3>
      <p class="text-[10px] text-slate-500 mt-1">${desc}</p>
    </div>
  `;
}

function pinnedTile(viewKey, title, emoji, color) {
  return `
    <div onclick="setCCView('${viewKey}')" class="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 rounded-2xl cursor-pointer transition flex flex-col items-center text-center">
      <span class="text-2xl mb-2">${emoji}</span>
      <span class="font-bold text-xs text-slate-800">${title}</span>
    </div>
  `;
}

function recentTile(viewKey, title, emoji) {
  return `
    <div onclick="setCCView('${viewKey}')" class="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition flex items-center gap-2">
      <span class="text-lg">${emoji}</span>
      <span class="text-slate-700 truncate">${title}</span>
    </div>
  `;
}

function healthMetric(service, status, color) {
  return `
    <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
      <span class="text-xs font-bold text-slate-700">${service}</span>
      <span class="text-[10px] font-mono font-bold bg-${color}-100 text-${color}-800 px-2 py-0.5 rounded">${status}</span>
    </div>
  `;
}

function serviceCard(title, desc, emoji) {
  return `
    <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
      <div class="text-2xl mb-2">${emoji}</div>
      <h3 class="font-bold text-sm text-slate-900">${title}</h3>
      <p class="text-xs text-slate-500">${desc}</p>
    </div>
  `;
}

function storeAppCard(title, meta, status, color) {
  return `
    <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-sm text-slate-900">${title}</h3>
        <span class="text-[10px] font-bold uppercase tracking-wider bg-${color}-100 text-${color}-800 px-2.5 py-1 rounded-full">${status}</span>
      </div>
      <p class="text-xs text-slate-500">${meta}</p>
      <button onclick="alert('Managing ${title} package...');" class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">Manage Package</button>
    </div>
  `;
}

function installedPlatformRow(name, family, status, color) {
  return `
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl gap-4">
      <div>
        <p class="font-bold text-slate-900 text-sm">${name}</p>
        <p class="text-[11px] text-slate-500">${family}</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-bold bg-${color}-100 text-${color}-800 px-2.5 py-1 rounded-full">${status}</span>
        <div class="flex gap-1.5 text-xs font-bold">
          <button onclick="alert('Opening ${name} instance...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 shadow-xs">Open</button>
          <button onclick="alert('Configuring ${name}...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 shadow-xs">Configure</button>
          <button onclick="alert('Updating ${name}...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 shadow-xs">Update</button>
          <button onclick="alert('Monitoring ${name} telemetry...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 shadow-xs">Monitor</button>
          <button onclick="alert('Backing up ${name}...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 shadow-xs">Backup</button>
          <button onclick="alert('Suspending ${name}...');" class="px-2.5 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg text-rose-700 shadow-xs">Suspend</button>
        </div>
      </div>
    </div>
  `;
}

function registryBox(name, count) {
  return `
    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
      <p class="font-bold text-slate-800">${name}</p>
      <p class="text-[11px] font-mono text-emerald-700 font-bold">${count}</p>
    </div>
  `;
}

function diagnosticCard(label, val, color) {
  return `
    <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
      <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">${label}</p>
      <p class="text-base font-bold text-${color}-700 font-mono">${val}</p>
    </div>
  `;
}

// Global Control Center State Handlers attached to window
window.setCCView = function(view) {
  state.ccActiveView = view;
  state.ccLauncherOpen = false;
  state.ccCommandPaletteOpen = false;
  state.ccNotificationOpen = false;
  state.ccActivityOpen = false;
  state.ccHelpOpen = false;
  state.ccAiAssistantOpen = false;
  render();
};

window.toggleCCLauncher = function() {
  state.ccLauncherOpen = !state.ccLauncherOpen;
  render();
};

window.toggleCCCommandPalette = function() {
  state.ccCommandPaletteOpen = !state.ccCommandPaletteOpen;
  render();
};

window.toggleCCNotification = function() {
  state.ccNotificationOpen = !state.ccNotificationOpen;
  render();
};

window.toggleCCActivity = function() {
  state.ccActivityOpen = !state.ccActivityOpen;
  render();
};

window.toggleCCHelp = function() {
  state.ccHelpOpen = !state.ccHelpOpen;
  render();
};

window.toggleCCAiAssistant = function() {
  state.ccAiAssistantOpen = !state.ccAiAssistantOpen;
  render();
};

window.toggleCCProfileMenu = function() {
  const menu = document.getElementById("cc-profile-dropdown");
  if (menu) {
    menu.classList.toggle("hidden");
  }
};

// Helper components for launcher tiles
function launcherTile(viewKey, iconSymbol, title, desc) {
  return `
    <div onclick="setCCView('${viewKey}'); toggleCCLauncher();" class="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 rounded-2xl cursor-pointer transition flex flex-col items-center text-center group">
      <div class="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-xl mb-3 group-hover:scale-105 transition">
        ${iconSymbol}
      </div>
      <h3 class="font-bold text-xs text-slate-900 group-hover:text-emerald-700">${title}</h3>
      <p class="text-[10px] text-slate-500 mt-1">${desc}</p>
    </div>
  `;
}

function paletteItem(viewKey, iconSymbol, title, desc) {
  return `
    <div onclick="setCCView('${viewKey}'); toggleCCCommandPalette();" class="flex items-center justify-between px-3 py-2.5 hover:bg-emerald-50 rounded-xl cursor-pointer transition">
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">${iconSymbol}</span>
        <div>
          <p class="text-xs font-bold text-slate-800">${title}</p>
          <p class="text-[10px] text-slate-500">${desc}</p>
        </div>
      </div>
      <span class="text-[10px] font-mono text-slate-400">&rarr;</span>
    </div>
  `;
}

function notifCard(type, title, desc, time, badgeColor) {
  return `
    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold uppercase tracking-wider text-${badgeColor}-700 bg-${badgeColor}-100 px-2 py-0.5 rounded">${type}</span>
        <span class="text-[10px] text-slate-400 font-mono">${time}</span>
      </div>
      <h4 class="font-bold text-xs text-slate-900">${title}</h4>
      <p class="text-xs text-slate-600">${desc}</p>
    </div>
  `;
}

function activityItem(action, detail, time) {
  return `
    <div class="flex items-start justify-between pb-3 border-b border-slate-100">
      <div>
        <p class="font-bold text-slate-900">${action}</p>
        <p class="text-slate-500 text-[11px]">${detail}</p>
      </div>
      <span class="text-[10px] text-slate-400 font-mono">${time}</span>
    </div>
  `;
}
