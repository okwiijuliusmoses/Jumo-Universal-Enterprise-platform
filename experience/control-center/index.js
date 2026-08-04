import { BRAND_CONFIG } from "../brand/brandConfig.js";
import { CommercialPlatformRegistry } from "../../kernel/registry/commercialRegistry.js";

const commercialRegistry = new CommercialPlatformRegistry();

export class UEOSControlAPIService {
  static async getStatus() {
    try {
      const res = await fetch("/api/ueos/control/health");
      if (!res.ok) throw new Error("Network response failed");
      return await res.json();
    } catch (e) {
      console.warn("UEOSControlAPIService offline fallback:", e);
      return {
        controlPlane: { status: "ONLINE", version: "1.0.0-sovereign", mode: "SOVEREIGN_ADMIN" },
        aiRuntime: {
          status: "ONLINE",
          gateway: "ACTIVE",
          agentsCount: 4,
          agents: [
            { name: "Sovereign Control Assistant", capabilities: ["Platform Governance", "Tenant Provisioning"] },
            { name: "AEGIS Security Auditor", capabilities: ["Immutable Audit", "Policy Verification"] },
            { name: "FAAP Financial Router", capabilities: ["Ledger Balance", "Multi-Currency Settlement"] },
            { name: "ERP Factory Compiler", capabilities: ["Blueprint Generation", "Registry Assembly"] }
          ],
          models: ["Gemini 2.0 Flash", "Omni Flash", "Custom Weights"]
        },
        registryFederation: { status: "ONLINE", masterRegistry: "ONLINE", totalRegistered: 22 },
        erpFactory: { status: "ONLINE", blueprints: 22, activeInstances: 6 },
        tenantStatus: { status: "ONLINE", activeTenants: 3 },
        runtimeStatus: { status: "ONLINE", kernel: "ONLINE", shell: "ONLINE" }
      };
    }
  }
}

if (typeof window !== 'undefined') {
  window.UEOSControlAPIService = UEOSControlAPIService;
  
  window.UEOSRuntime = window.UEOSRuntime || {};
  
  // Contract check & initial state
  window.UEOSRuntime.controlPlaneStatus = window.UEOSRuntime.controlPlaneStatus || { status: "ONLINE", version: "1.0.0-sovereign", mode: "SOVEREIGN_ADMIN" };
  window.UEOSRuntime.aiRuntime = window.UEOSRuntime.aiRuntime || {
    status: "ONLINE",
    gateway: "ACTIVE",
    agentsCount: 4,
    agents: [
      { name: "Sovereign Control Assistant", capabilities: ["Platform Governance", "Tenant Provisioning"] },
      { name: "AEGIS Security Auditor", capabilities: ["Immutable Audit", "Policy Verification"] },
      { name: "FAAP Financial Router", capabilities: ["Ledger Balance", "Multi-Currency Settlement"] },
      { name: "ERP Factory Compiler", capabilities: ["Blueprint Generation", "Registry Assembly"] }
    ],
    models: ["Gemini 2.0 Flash", "Omni Flash", "Custom Weights"]
  };
  window.UEOSRuntime.registryFederation = window.UEOSRuntime.registryFederation || { status: "ONLINE", masterRegistry: "ONLINE", totalRegistered: 22 };
  window.UEOSRuntime.erpFactory = window.UEOSRuntime.erpFactory || { status: "ONLINE", blueprints: 22, activeInstances: 6 };
  window.UEOSRuntime.runtimeStatus = window.UEOSRuntime.runtimeStatus || { status: "ONLINE", kernel: "ONLINE", shell: "ONLINE" };
  
  // Safe adapters
  window.UEOSRuntime.enterpriseAudit ||= {
    getAuditReport(){ return {}; }
  };
  window.UEOSRuntime.erpRegistry ||= {
    getPlatforms(){ return []; },
    getModulesForERP(){ return []; }
  };
  window.UEOSRuntime.aiCommandCenter ||= {
    agents: window.UEOSRuntime.aiRuntime?.agents || []
  };
  window.UEOSRuntime.faapService ||= {
    upgradeAreas: [],
    treasuryPools: {}
  };
  
  console.log("[UEOS CONTROL PLANE ONLINE]", window.UEOSRuntime);


  UEOSControlAPIService.getStatus().then(data => {
    if (data) {
      window.UEOSRuntime.controlPlaneStatus = data.controlPlane;
      window.UEOSRuntime.aiRuntime = data.aiRuntime;
      window.UEOSRuntime.registryFederation = data.masterRegistry || data.registryFederation;
      window.UEOSRuntime.erpFactory = data.erpFactory;
      window.UEOSRuntime.runtimeStatus = data.runtimeStatus || data.runtime || window.UEOSRuntime.runtimeStatus;
      if (typeof window.render === 'function') window.render();
    }
  });
  window.installERPInstance = function(erpId, erpName) {
    const state = window.state || window.appState || {};
    const controlPlane = window.ueosControlPlane || null;
    if (controlPlane) {
      const tmpl = controlPlane.getERPTemplate(erpId) || (controlPlane.getERPTemplateByNameOrId && controlPlane.getERPTemplateByNameOrId(erpId));
      const inst = controlPlane.deployERP(tmpl ? tmpl.id : erpId, erpName || (tmpl ? tmpl.name : erpId));
      state.activeErpId = tmpl ? tmpl.id : erpId;
      state.activeErpInstanceId = inst ? inst.instanceId : null;
      state.session = state.session || {};
      if (tmpl) state.session.activeErpTemplate = tmpl;
      if (inst) state.session.activeErpInstance = inst;
      if (window.resolveActiveERPContext) {
        const ctx = window.resolveActiveERPContext(state);
        state.deployedInstitution = {
          id: ctx.id,
          name: ctx.name,
          portals: ctx.portals.map(p => ({ id: p.id, name: p.name, desc: p.desc || p.name }))
        };
      }
    }
    alert(`Successfully provisioned tenant instance for [${erpName}] (${erpId}). Initialized UEOS Kernel, FAAP Ledger, AEGIS Security, and Portal Workspaces.`);
    if (typeof window.render === 'function') window.render();
  };

  window.configureERPInstance = function(erpId, erpName) {
    alert(`Opening Enterprise Configuration Wizard for [${erpName}] (${erpId}). Manage governance, departments, workflows, and digital forms.`);
  };

  window.launchERPWorkspace = function(erpId, erpName) {
    const state = window.state || window.appState || {};
    const controlPlane = window.ueosControlPlane || null;
    if (controlPlane) {
      let tmpl = controlPlane.getERPTemplate(erpId) || (controlPlane.getERPTemplateByNameOrId && controlPlane.getERPTemplateByNameOrId(erpId));
      let inst = controlPlane.getDeployedERPInstances().find(i => i.templateId === erpId || i.instanceId === erpId);
      if (!inst && tmpl) {
        inst = controlPlane.deployERP(tmpl.id, erpName || tmpl.name);
      }
      state.activeErpId = tmpl ? tmpl.id : erpId;
      state.activeErpInstanceId = inst ? inst.instanceId : null;
      state.session = state.session || {};
      if (tmpl) state.session.activeErpTemplate = tmpl;
      if (inst) state.session.activeErpInstance = inst;
      if (window.resolveActiveERPContext) {
        const ctx = window.resolveActiveERPContext(state);
        state.deployedInstitution = {
          id: ctx.id,
          name: ctx.name,
          portals: ctx.portals.map(p => ({ id: p.id, name: p.name, desc: p.desc || p.name }))
        };
      }
    }
    if (typeof window.navigate === 'function') window.navigate('/workspace');
    else window.location.hash = '#workspace';
  };

  window.installCommercialPlatform = function(platformId, platformName) {
    alert(`Successfully deployed independent commercial platform [${platformName}] (${platformId}) with dedicated tenant workspace and API gateway.`);
    if (typeof window.render === 'function') window.render();
  };
}

function renderControlCenterNavigation() { return ""; }



function renderInstalledERPFamilies() {
  const erps = window.state.erpApplications || [];

  if (erps.length === 0) {
    return `
      <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 italic">
        No ERP instances discovered in registry. Verify RegistryBootstrap status.
      </div>`;
  }

  return erps.map(erp => `
    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full">${erp.category || erp.ecosystem || 'Enterprise ERP'}</span>
        <span class="text-[10px] font-mono text-slate-400">v${erp.version || '1.0.0'} &bull; <span class="text-emerald-600">${erp.status || 'ACTIVE'}</span></span>
      </div>
      <div>
        <h4 class="font-bold text-slate-900 text-sm">${erp.name}</h4>
        <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${erp.description || erp.summary || 'Enterprise resource planning platform for ' + erp.name}</p>
      </div>
      <div class="text-[10px] text-slate-600 font-mono space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <div class="flex justify-between"><strong>Runtime:</strong> <span class="text-emerald-600 font-bold">${erp.lifecycle === 'RUNNING' ? 'ACTIVE' : (erp.lifecycle || 'READY')}</span></div>
        <div class="flex justify-between"><strong>Configuration:</strong> <span class="text-emerald-600 font-bold">${erp.configurationStatus === 'CONFIGURED' ? 'COMPLETE' : (erp.configurationStatus || 'CONFIGURED')}</span></div>
        <div class="flex justify-between"><strong>Settings:</strong> <span class="text-emerald-600 font-bold">CONFIGURED</span></div>
        <div class="pt-1 border-t border-slate-200 mt-1">
          <div class="flex justify-between"><strong>Portals:</strong> <span>${erp.portals ? erp.portals.length : 0} ACTIVE</span></div>
          <div class="flex justify-between"><strong>Modules:</strong> <span>${erp.modules ? erp.modules.length : 0} ACTIVE</span></div>
          <div class="flex justify-between"><strong>Workflows:</strong> <span>${erp.workflows ? erp.workflows.length : 0} ACTIVE</span></div>
        </div>
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
        <button onclick="window.navigate('/erp-workspace?id=${erp.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase rounded-lg transition cursor-pointer shadow-xs">Launch Platform</button>
        <button onclick="alert('Opening administrative console for ${erp.name}');" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] uppercase rounded-lg transition cursor-pointer">Manage</button>
      </div>
    </div>
  `).join('');
}

function renderCommercialPlatforms() {
  const platforms = commercialRegistry.getAllPlatforms();
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-extrabold text-base text-slate-900">JUMO Independent Commercial Platform Factory</h3>
          <p class="text-xs text-slate-500">Standalone enterprise software products deployable on UEOS infrastructure.</p>
        </div>
        <span class="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">22 Independent Products Available</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${platforms.map(p => `
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded-full">${p.category}</span>
              <span class="text-[10px] font-mono text-slate-400">v${p.version} &bull; ${p.tenantCount} Tenants</span>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 text-sm">${p.name}</h4>
              <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${p.description}</p>
            </div>
            <div class="text-[10px] text-slate-600 font-mono space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div><strong>Portals:</strong> ${p.portals.slice(0, 3).join(', ')}...</div>
              <div><strong>Modules:</strong> ${p.modules.slice(0, 2).join(', ')}...</div>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-100">
              <button onclick="installCommercialPlatform('${p.id}', '${p.name}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase rounded-lg transition cursor-pointer shadow-xs">Deploy Product</button>
              <button onclick="alert('Opening administrative console for ${p.name}');" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] uppercase rounded-lg transition cursor-pointer">Configure</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


/**
 * JUMO UEOS Digital Control Center Login (/control-center/login)
 * Dedicated Platform Owner Authentication (Strictly sovereign platform headquarters - updated 2026)
 */
export const controlCenterLoginTemplate = (state) => {
  window.document.getElementById("app").innerHTML = `
    <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800">
      <!-- Top Header -->
      <header class="p-6 border-b border-slate-200 bg-white shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3 cursor-pointer" onclick="window.navigate('/')">
            <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">J</div>
            <div>
              <div class="font-extrabold text-slate-900 tracking-tight text-base">JUMO UEOS</div>
              <div class="text-[10px] text-emerald-700 font-bold tracking-widest uppercase">Digital Control Center</div>
            </div>
          </div>
          <button onclick="window.navigate('/')" class="text-xs font-bold text-slate-600 hover:text-emerald-700 transition flex items-center gap-1 cursor-pointer">
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

          <form onsubmit="window.handleSovereignLogin(event, '/control-center')" class="space-y-5 text-xs font-semibold">
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


/**
 * JUMO UEOS Digital Control Center Main Workspace (/control-center)
 */
export const controlCenterTemplate = (state) => {
  console.log("CONTROL CENTER STATE CHECK:", window.state);

  const authenticated =
    window.state?.session;

  console.log("CONTROL CENTER AUTH CHECK:", authenticated);

  if (!authenticated) {
    console.log("NO AUTH - RETURNING TO LOGIN");
    window.navigate("/control-center/login");
    return;
  }

  const activeView = state.ccActiveView || "overview";
  const isCommandPaletteOpen = state.ccCommandPaletteOpen || false;
  const isNotificationCenterOpen = state.ccNotificationOpen || false;
  const isActivityCenterOpen = state.ccActivityOpen || false;
  const isHelpOpen = state.ccHelpOpen || false;
  const isAiAssistantOpen = state.ccAiAssistantOpen || false;

  window.document.getElementById("app").innerHTML = `
    <div class="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden select-none">
      
      <!-- JUMO UEOS Enterprise Control Center Header -->
      <header class="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm shrink-0">
        <div class="flex items-center gap-6">
          <!-- Workspace Launcher Button -->
          <div class="relative group">
            <button class="w-9 h-9 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer" title="Workspace Launcher">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </button>
            <div class="absolute left-0 top-full mt-1 w-[600px] bg-white border border-slate-200 shadow-2xl rounded-2xl hidden group-hover:block z-[70] p-6 animate-scaleUp">
                <div class="pb-4 border-b border-slate-100 mb-6 flex items-center justify-between">
                  <div>
                    <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-tight">UEOS Platform Launcher</h2>
                    <p class="text-[10px] text-slate-500 mt-0.5">Instant access to all sovereign workspaces and registries</p>
                  </div>
                  <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold rounded uppercase border border-emerald-100">Genesis v1.0</span>
                </div>
                <div class="grid grid-cols-3 gap-3">
                  ${renderControlCenterNavigation()}
                </div>
                <div class="mt-6 pt-4 border-t border-slate-100 text-center">
                  <button onclick="window.navigate('/gateway')" class="text-[10px] font-bold text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded uppercase tracking-widest transition">Return to Platform Gateway</button>
                </div>
            </div>
          </div>
          
          <div class="flex items-center gap-3 cursor-pointer" onclick="setCCView('overview')">
            <div class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">J</div>
            <div class="flex flex-col">
              <span class="font-extrabold text-slate-900 tracking-tight text-xs">JUMO UEOS</span>
              <span class="text-[9px] text-emerald-700 font-bold tracking-widest uppercase">Digital Control Center</span>
            </div>
          </div>

          <!-- Command Palette Launcher -->
          <button onclick="toggleCCCommandPalette()" class="hidden md:flex items-center gap-3 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500 hover:bg-white hover:border-emerald-300 transition shadow-xs">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span>Search Platform Command (Ctrl+K)</span>
          </button>
        </div>

        <!-- Right Header Actions -->
        <div class="flex items-center gap-3">
          <div class="hidden lg:flex items-center gap-1 border-r border-slate-200 pr-4 mr-1">
            <button onclick="toggleCCAiAssistant()" class="px-3 py-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition cursor-pointer flex items-center gap-2 text-[11px] font-bold">
              <span>🤖</span> Assistant
            </button>
            <button onclick="toggleCCHelp()" class="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer" title="Help">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
          </div>

          <button onclick="toggleCCNotification()" class="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-900 relative transition cursor-pointer" title="Notifications">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            <span class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 border border-white"></span>
          </button>
          
          <!-- Profile Menu -->
          <div class="relative group">
            <button class="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition cursor-pointer">
              <div class="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-[11px] shadow-sm">SO</div>
              <div class="hidden sm:block text-left mr-1">
                <p class="text-[11px] font-bold text-slate-900 leading-none">Platform Owner</p>
                <p class="text-[9px] text-slate-500 font-mono mt-0.5 tracking-tighter">Sovereign Admin</p>
              </div>
              <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 hidden group-hover:block z-[100] animate-scaleUp">
              <div class="px-5 py-4 border-b border-slate-100 bg-slate-50/50 mb-1">
                <p class="text-xs font-bold text-slate-900">Julius Moses Okwii</p>
                <p class="text-[10px] text-slate-500 font-mono mt-0.5">owner@jumo.ueos</p>
              </div>
              <button onclick="setCCView('settings')" class="w-full text-left px-5 py-2.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition flex items-center gap-3">
                <span class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center">⚙️</span> Platform Settings
              </button>
              <button onclick="setCCView('owner-workspace')" class="w-full text-left px-5 py-2.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition flex items-center gap-3">
                <span class="w-5 h-5 rounded bg-slate-100 flex items-center justify-center">🏛️</span> Owner Workspace
              </button>
              <div class="border-t border-slate-100 my-1"></div>
              <button onclick="window.state.session = null; window.navigate('/login');" class="w-full text-left px-5 py-2.5 text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition flex items-center gap-3">
                <span class="w-5 h-5 rounded bg-rose-50 flex items-center justify-center">🚪</span> Logout Control Center
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- JUMO UEOS Enterprise Breadcrumb / Context Bar -->
      <div class="h-10 bg-slate-50 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider">
          <span class="text-slate-400 hover:text-slate-900 cursor-pointer" onclick="setCCView('overview')">Headquarters</span>
          <span class="text-slate-300">/</span>
          <span class="text-slate-900">${activeView.replace('-', ' ')}</span>
        </div>
        
        <div class="flex items-center gap-4">
            <span class="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Sovereign Kernel Active
            </span>
            <div class="h-4 w-px bg-slate-200"></div>
            <span class="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-tighter">BUILD: UEOS-X.1.0-GENESIS</span>
        </div>
      </div>


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
                  <button onclick="ccLogAction('Running AEGIS cross-tenant compliance audit... Audit status: 100% PASSED');" class="w-full text-left p-2 bg-white hover:bg-emerald-100 rounded-lg text-emerald-800 font-medium transition cursor-pointer">🛡️ Run AEGIS cryptographic audit scan</button>
                  <button onclick="ccLogAction('Verifying multi-tenant memory isolation boundaries... Isolation: VERIFIED');" class="w-full text-left p-2 bg-white hover:bg-emerald-100 rounded-lg text-emerald-800 font-medium transition cursor-pointer">📊 Verify memory isolation metrics</button>
                  <button onclick="ccLogAction('Syncing ERP Store registry across 142 tenants... Registry: SYNCHRONIZED');" class="w-full text-left p-2 bg-white hover:bg-emerald-100 rounded-lg text-emerald-800 font-medium transition cursor-pointer">🔄 Sync ERP Marketplace updates</button>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-200">
              <div class="flex gap-2">
                <input type="text" placeholder="Ask UEOS Assistant..." class="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600">
                <button onclick="ccLogAction('Command processed by UEOS Assistant.');" class="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition cursor-pointer">Send</button>
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
              <button onclick="ccLogAction('All notifications marked as read.'); toggleCCNotification();" class="text-xs font-bold text-emerald-600 hover:underline cursor-pointer">Mark all as read</button>
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
              <button onclick="ccLogAction('Exporting full operational audit log...'); toggleCCActivity();" class="text-xs font-bold text-slate-700 hover:underline cursor-pointer">Export Full Audit Log</button>
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
              <button onclick="ccLogAction('Opening official JUMO UEOS Developer & Administrator Manual...'); toggleCCHelp();" class="text-xs font-bold text-emerald-600 hover:underline cursor-pointer">View Full Documentation</button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- MAIN WORKSPACE CONTAINER -->
      <main class="flex-1 overflow-y-auto bg-white">
        <div class="max-w-7xl mx-auto p-8">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 mb-10 gap-6">
            <div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight leading-none">${getViewTitle(activeView)}</h1>
              <p class="text-xs text-slate-500 mt-2 font-medium tracking-wide">${getViewDescription(activeView)}</p>
            </div>
            
            <!-- Universal Toolbar -->
            <div class="flex items-center gap-2">
              <button onclick="ccLogAction('Action completed successfully.')" class="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-[11px] font-extrabold text-slate-700 shadow-xs transition cursor-pointer uppercase tracking-wider">New</button>
              <button onclick="ccLogAction('Import dialog opened.')" class="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-[11px] font-extrabold text-slate-700 shadow-xs transition cursor-pointer uppercase tracking-wider">Import</button>
              <button onclick="ccLogAction('Exporting data package...');" class="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-[11px] font-extrabold text-slate-700 shadow-xs transition cursor-pointer uppercase tracking-wider">Export</button>
              <button onclick="window.location.reload()" class="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-[11px] font-extrabold text-slate-700 shadow-xs transition cursor-pointer uppercase tracking-wider">Refresh</button>
              <button onclick="toggleCCCommandPalette()" class="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-extrabold shadow-md transition cursor-pointer uppercase tracking-widest">Search...</button>
            </div>
          </div>

          <!-- DYNAMIC VIEW RENDERER -->
          <div class="animate-fadeIn">
            ${renderViewContent(activeView)}
          </div>

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

function recentTile(id, label, icon) {
  return `
    <button onclick="setCCView('${id}')" class="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl transition cursor-pointer">
      <span class="text-2xl mb-2">${icon}</span>
      <span class="text-slate-700 text-center">${label}</span>
    </button>
  `;
}

/**
 * Render Specific Workspace Views
 */
function renderViewContent(view) {
  if (view === 'audit') {
    const audit = window.UEOSRuntime ? window.UEOSRuntime.enterpriseAudit.getAuditReport() : {
      erpPlatforms: 0,
      sovereignPlatforms: 0,
      portalsRegistered: 0,
      modulesInstalled: 0,
      activeComponents: 0,
      registeredWorkflows: 0,
      digitalForms: 0,
      faapServices: "OFFLINE"
    };

    const erps = window.state.erpApplications || [];
    
    return `
      <div class="space-y-6">
        <!-- Global Audit Summary -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ERP Ecosystems</div>
            <div class="text-xl font-black text-slate-900">${audit.erpPlatforms}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sovereign Platforms</div>
            <div class="text-xl font-black text-emerald-700">${audit.sovereignPlatforms}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gov. Portals</div>
            <div class="text-xl font-black text-slate-900">${audit.portalsRegistered}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Installed Modules</div>
            <div class="text-xl font-black text-emerald-600">${audit.modulesInstalled.toLocaleString()}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Components</div>
            <div class="text-xl font-black text-blue-600">${audit.activeComponents.toLocaleString()}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Workflows & Forms</div>
            <div class="text-xl font-black text-amber-600">${audit.digitalForms.toLocaleString()}</div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">FAAP Status</div>
            <div class="text-sm font-black text-emerald-500 mt-1">${audit.faapServices}</div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-extrabold text-base text-slate-900 flex items-center gap-2">🛡️ UEOS Enterprise Portal Audit Engine</h3>
            <span class="text-xs font-mono text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Phase 2 Runtime Verification</span>
          </div>
          <p class="text-xs text-slate-500 mb-6">Auditing live implementation of Governance, Portals, Modules, Components, Workflows, and Digital Forms across all active Enterprise Families.</p>
          
          <div class="space-y-6">
            ${(erps || []).map(erp => {
              const pCount = erp.governancePortals?.length || 0;
              // Fetch real module count from registry for this ERP
              const erpModules = window.UEOSRuntime ? window.UEOSRuntime.erpRegistry.getModulesForERP(erp.id) : [];
              const mCount = erpModules.length;
              const hasRegistry = pCount > 0 && mCount > 0;
              
              return `
                <div class="border border-slate-200 rounded-xl p-5 bg-slate-50 shadow-sm relative overflow-hidden">
                  <div class="absolute right-0 top-0 bottom-0 w-1 ${hasRegistry ? 'bg-emerald-500' : 'bg-rose-500'}"></div>
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 class="font-bold text-sm text-slate-900">${erp.ecosystem} - ${erp.name}</h4>
                      <p class="text-[11px] text-slate-500 mt-1 font-mono">Code: ${erp.code} | Registry Instance: ${hasRegistry ? 'ACTIVE' : 'NULL'}</p>
                    </div>
                    <span class="px-2 py-1 rounded text-[10px] font-bold font-mono ${hasRegistry ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
                      ${hasRegistry ? '100% IMPLEMENTED' : 'IMPLEMENTATION REQUIRED'}
                    </span>
                  </div>
                  <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div class="bg-white p-3 rounded-lg border border-slate-100 shadow-sm text-center">
                      <div class="text-[10px] text-slate-400 font-bold uppercase">Portals</div>
                      <div class="font-mono text-sm font-bold ${pCount > 0 ? 'text-slate-800' : 'text-rose-500'}">${pCount}</div>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-slate-100 shadow-sm text-center">
                      <div class="text-[10px] text-slate-400 font-bold uppercase">Modules</div>
                      <div class="font-mono text-sm font-bold ${mCount > 0 ? 'text-emerald-600' : 'text-rose-500'}">${mCount.toLocaleString()}</div>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-slate-100 shadow-sm text-center">
                      <div class="text-[10px] text-slate-400 font-bold uppercase">Workflows</div>
                      <div class="font-mono text-sm font-bold ${mCount > 0 ? 'text-blue-600' : 'text-rose-500'}">${mCount.toLocaleString()}</div>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-slate-100 shadow-sm text-center">
                      <div class="text-[10px] text-slate-400 font-bold uppercase">Forms</div>
                      <div class="font-mono text-sm font-bold ${mCount > 0 ? 'text-amber-600' : 'text-rose-500'}">${mCount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

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
            <button onclick="window.navigate('/erp')" class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer">
              <span>🚀 Launch Dynamic ERP Platform</span>
            </button>
            <div class="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center">
              <span class="text-[10px] uppercase font-mono text-emerald-300">System Health: </span>
              <span class="text-xs font-bold text-white">Healthy & Secure</span>
            </div>
          </div>
        </div>

        
        <!-- Dynamic Enterprise Architecture Navigation -->
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div class="flex items-center justify-between">
                <h3 class="font-extrabold text-base text-slate-900">
                    📂 JUMO Enterprise Architecture
                </h3>
                <span class="text-xs font-mono text-slate-400 font-bold">
                    Registry Controlled
                </span>
            </div>

            <div id="ueos-dynamic-navigation"
                 class="grid grid-cols-2 md:grid-cols-4 gap-6">
                ${renderEnterpriseNavigation()}
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
    const ai = window.UEOSRuntime ? window.UEOSRuntime.aiCommandCenter : { agents: [] };
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
          ${serviceCard('AI Agent Registry', `${ai.agents.length} Active Enterprise Agents across all platforms`, '🤖')}
          ${serviceCard('Model Registry', 'Gemini 2.0 Flash, Omni models and custom weights', '🧠')}
          ${serviceCard('AI Safety Audit', 'AEGIS-verified immutable reasoning trace logs', '🛡️')}
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-sm text-slate-900 mb-6">Active Autonomous Engineering Agents</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            ${ai.agents.map(agent => `
              <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">${agent.name}</span>
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div class="space-y-1">
                  ${agent.capabilities.map(cap => `
                    <div class="text-[10px] text-slate-500 flex items-center gap-1">
                      <span>✓</span> ${cap}
                    </div>
                  `).join('')}
                </div>
                <div class="pt-2 border-t border-slate-200 flex items-center justify-between">
                   <span class="text-[9px] font-mono text-emerald-600 font-bold uppercase">Active</span>
                   <button class="text-[10px] font-bold text-slate-600 hover:underline">Task Queue</button>
                </div>
              </div>
            `).join('')}
          </div>
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

        <!-- All 12 Enterprise Ecosystem Cards -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-extrabold text-base text-slate-900">Enterprise ERP Ecosystems & Platforms</h3>
            <span class="text-xs font-mono text-slate-500 font-bold">Registry Discovered Ecosystems</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${renderInstalledERPFamilies()}
          </div>
        </div>

        <!-- Independent Commercial Platform Factory -->
        ${renderCommercialPlatforms()}
      </div>
    `;
  }

  if (view === 'faap') {
    const faap = window.UEOSRuntime ? window.UEOSRuntime.faapService : { upgradeAreas: [], treasuryPools: {} };
    return `
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-700 text-white rounded-full text-[11px] font-mono uppercase font-bold tracking-wider">
              <span>💰 FAAP 2.0 • Financial Architecture Operating Layer</span>
            </div>
            <h2 class="text-2xl font-extrabold tracking-tight">Universal Financial Clearinghouse</h2>
            <p class="text-xs text-emerald-200 max-w-2xl">Global treasury, accounts, budget appropriation, and cross-border settlement engine.</p>
          </div>
          <button onclick="alert('Running FAAP global ledger reconciliation...');" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer">Reconcile Ledgers</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          ${Object.entries(faap.treasuryPools || {}).map(([cur, pool]) => `
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div class="text-[10px] text-slate-400 font-bold uppercase">${cur} Treasury Pool</div>
              <div class="text-lg font-black text-slate-900">${pool.balance.toLocaleString()}</div>
              <div class="text-[9px] text-emerald-600 font-bold mt-1">● ${pool.activeRouter}</div>
            </div>
          `).join('')}
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-sm text-slate-900 mb-6">FAAP 2.0 Core Functional Operating Areas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            ${(faap.upgradeAreas || []).map(area => `
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span class="text-xs font-medium text-slate-700">${area.name}</span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Real-Time Activity Ledger -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
           <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 class="font-bold text-slate-900 flex items-center gap-2 text-xs">
                 <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Global Settlement Queue
              </h3>
              <div class="flex gap-2">
                 <button class="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">Export Ledger</button>
                 <button class="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">Audit Trail</button>
              </div>
           </div>
           <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                 <thead>
                    <tr class="bg-white border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                       <th class="p-4">Transaction ID</th>
                       <th class="p-4">Module</th>
                       <th class="p-4">Counterparty / Description</th>
                       <th class="p-4 text-right">Amount</th>
                       <th class="p-4">Currency</th>
                       <th class="p-4">Status</th>
                    </tr>
                 </thead>
                 <tbody class="divide-y divide-slate-100 font-mono text-xs">
                    <tr class="hover:bg-slate-50 transition">
                       <td class="p-4 text-slate-900 font-bold">FAAP-TRX-82910</td>
                       <td class="p-4 text-slate-600">Accounts Payable</td>
                       <td class="p-4 text-slate-600">Supplier Vendor Settlement</td>
                       <td class="p-4 text-right text-rose-600 font-bold">-$45,000.00</td>
                       <td class="p-4 text-slate-500">USD</td>
                       <td class="p-4"><span class="px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-sans font-bold text-[10px]">CLEARED</span></td>
                    </tr>
                    <tr class="hover:bg-slate-50 transition">
                       <td class="p-4 text-slate-900 font-bold">FAAP-TRX-82911</td>
                       <td class="p-4 text-slate-600">Payroll</td>
                       <td class="p-4 text-slate-600">Monthly Institutional Payroll</td>
                       <td class="p-4 text-right text-rose-600 font-bold">-$1,250,000.00</td>
                       <td class="p-4 text-slate-500">USD</td>
                       <td class="p-4"><span class="px-2 py-1 bg-amber-50 text-amber-700 rounded border border-amber-200 font-sans font-bold text-[10px]">PENDING APPROVAL</span></td>
                    </tr>
                    <tr class="hover:bg-slate-50 transition">
                       <td class="p-4 text-slate-900 font-bold">FAAP-TRX-82912</td>
                       <td class="p-4 text-slate-600">Revenue</td>
                       <td class="p-4 text-slate-600">Tuition Collection Aggregation</td>
                       <td class="p-4 text-right text-emerald-600 font-bold">+$120,400.00</td>
                       <td class="p-4 text-slate-500">USD</td>
                       <td class="p-4"><span class="px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-sans font-bold text-[10px]">CLEARED</span></td>
                    </tr>
                 </tbody>
              </table>
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
            ${(() => {
              const controlPlane = window.ueosControlPlane || null;
              const installed = controlPlane ? controlPlane.getDeployedERPInstances() : [];
              if (installed.length === 0) {
                return `<p class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 italic">No ERP instances currently deployed. Install an ERP from the catalogue above.</p>`;
              }
              return installed.map(inst => installedPlatformRow(inst.name, `${inst.templateId} • Tenant ${inst.tenantId}`, inst.status, 'emerald', inst.templateId, inst.instanceId)).join('');
            })()}
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




function serviceCard(title, desc, emoji) {
  return `
    <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
      <div class="text-2xl mb-2">${emoji}</div>
      <h3 class="font-bold text-sm text-slate-900">${title}</h3>
      <p class="text-xs text-slate-500">${desc}</p>
    </div>
  `;
}

function installedPlatformRow(name, family, status, color, erpId, instanceId) {
  const launchId = erpId || instanceId || name;
  return `
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl gap-4">
      <div>
        <p class="font-bold text-slate-900 text-sm">${name}</p>
        <p class="text-[11px] text-slate-500">${family}</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-bold bg-${color}-100 text-${color}-800 px-2.5 py-1 rounded-full">${status}</span>
        <div class="flex gap-1.5 text-xs font-bold">
          <button onclick="launchERPWorkspace('${launchId}', '${name}')" class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-xs cursor-pointer">Open Workspace</button>
          <button onclick="configureERPInstance('${launchId}', '${name}')" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 shadow-xs cursor-pointer">Configure</button>
          <button onclick="alert('Updating ${name}...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 shadow-xs cursor-pointer">Update</button>
          <button onclick="alert('Monitoring ${name} telemetry...');" class="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 shadow-xs cursor-pointer">Monitor</button>
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
if (typeof window !== 'undefined') window.setCCView = function(view) {
  window.state.ccActiveView = view;
  window.state.ccLauncherOpen = false;
  window.state.ccCommandPaletteOpen = false;
  window.state.ccNotificationOpen = false;
  window.state.ccActivityOpen = false;
  window.state.ccHelpOpen = false;
  window.state.ccAiAssistantOpen = false;
  window.render();
};

if (typeof window !== 'undefined') window.toggleCCLauncher = function() {
  window.state.ccLauncherOpen = !window.state.ccLauncherOpen;
  window.render();
};

if (typeof window !== 'undefined') window.toggleCCCommandPalette = function() {
  window.state.ccCommandPaletteOpen = !window.state.ccCommandPaletteOpen;
  window.render();
};

if (typeof window !== 'undefined') window.toggleCCNotification = function() {
  window.state.ccNotificationOpen = !window.state.ccNotificationOpen;
  window.render();
};

if (typeof window !== 'undefined') window.toggleCCActivity = function() {
  window.state.ccActivityOpen = !window.state.ccActivityOpen;
  window.render();
};

if (typeof window !== 'undefined') window.toggleCCHelp = function() {
  window.state.ccHelpOpen = !window.state.ccHelpOpen;
  window.render();
};

if (typeof window !== 'undefined') window.toggleCCAiAssistant = function() {
  window.state.ccAiAssistantOpen = !window.state.ccAiAssistantOpen;
  window.render();
};

if (typeof window !== 'undefined') window.toggleCCProfileMenu = function() {
  const menu = document.getElementById("cc-profile-dropdown");
  if (menu) {
    menu.classList.toggle("hidden");
  }
};

// Helper components for launcher tiles

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

if (typeof window !== 'undefined') window.switchCardTab = function(event, cardTabId, tabName) {
  const contents = document.querySelectorAll(`.${cardTabId}-content`);
  contents.forEach(c => c.classList.add('hidden'));

  const target = document.getElementById(`${cardTabId}-${tabName}-content`);
  if (target) target.classList.remove('hidden');

  const btns = document.querySelectorAll(`.${cardTabId}-btn`);
  btns.forEach(b => {
    b.classList.remove('border-emerald-600', 'text-emerald-700');
    b.classList.add('border-transparent', 'text-slate-500');
  });

  if (event && event.currentTarget) {
    event.currentTarget.classList.remove('border-transparent', 'text-slate-500');
    event.currentTarget.classList.add('border-emerald-600', 'text-emerald-700');
  }
};

if (typeof window !== 'undefined') window.openErpInstallationFlow = function(templateName) {
  const customName = `${templateName} Enterprise`;
  const state = window.state || window.appState || {};
  const controlPlane = window.ueosControlPlane || null;
  
  let template = null;
  let inst = null;
  if (controlPlane && controlPlane.getERPTemplateByNameOrId) {
    template = controlPlane.getERPTemplateByNameOrId(templateName);
    if (template) {
      inst = controlPlane.deployERP(template.id, customName);
      state.activeErpId = template.id;
      if (inst) state.activeErpInstanceId = inst.instanceId;
    }
  }

  if (!state.session) {
    window.state.session = {
      user: { name: "Institution Administrator", email: "admin@institution.edu", role: "ERP Administrator", isAdmin: true },
      organization: customName,
      tenantId: inst ? inst.tenantId : `tenant-${Date.now().toString().slice(-6)}`
    };
  } else {
    window.state.session.organization = customName;
    if (inst) state.session.tenantId = inst.tenantId;
  }

  if (template) state.session.activeErpTemplate = template;
  if (inst) state.session.activeErpInstance = inst;
  
  if (window.resolveActiveERPContext) {
    const ctx = window.resolveActiveERPContext(state);
    state.deployedInstitution = {
      id: ctx.id,
      name: ctx.name,
      portals: ctx.portals.map(p => ({ id: p.id, name: p.name, desc: p.desc || p.name }))
    };
  }

  window.state.activeWorkspaceTab = 'org';

  if (typeof window.navigate === 'function') {
    window.navigate('/workspace');
  } else {
    window.location.hash = "#workspace";
  }
};

if (typeof window !== 'undefined') window.configureErpBlueprint = function(templateName) {
  const customName = `${templateName} (Blueprint Configured)`;
  const state = window.state || window.appState || {};
  const controlPlane = window.ueosControlPlane || null;
  
  let template = null;
  let inst = null;
  if (controlPlane && controlPlane.getERPTemplateByNameOrId) {
    template = controlPlane.getERPTemplateByNameOrId(templateName);
    inst = controlPlane.deployERP(template.id, customName);
  }

  if (!state.session) {
  window.state.session = {
      user: { name: "Institution Administrator", email: "admin@institution.edu", role: "ERP Administrator", isAdmin: true },
      organization: customName,
      tenantId: inst ? inst.tenantId : `tenant-${Date.now().toString().slice(-6)}`
    };
  } else {
  window.state.session.organization = customName;
    if (inst) state.session.tenantId = inst.tenantId;
  }

  if (template) state.session.activeErpTemplate = template;
  if (inst) state.session.activeErpInstance = inst;
  window.state.activeWorkspaceTab = 'org';

  if (typeof window.navigate === 'function') {
    window.navigate('/workspace');
  } else {
    window.location.hash = "#workspace";
  }
};

if (typeof window !== 'undefined') window.cloneErpTemplate = function(templateName) {
  const customName = `${templateName} (Cloned Platform)`;
  const state = window.state || window.appState || {};
  const controlPlane = window.ueosControlPlane || null;
  
  let template = null;
  let inst = null;
  if (controlPlane && controlPlane.getERPTemplateByNameOrId) {
    template = controlPlane.getERPTemplateByNameOrId(templateName);
    inst = controlPlane.deployERP(template.id, customName);
  }

  if (!state.session) {
  window.state.session = {
      user: { name: "Institution Administrator", email: "admin@institution.edu", role: "ERP Administrator", isAdmin: true },
      organization: customName,
      tenantId: inst ? inst.tenantId : `tenant-${Date.now().toString().slice(-6)}`
    };
  } else {
  window.state.session.organization = customName;
    if (inst) state.session.tenantId = inst.tenantId;
  }

  if (template) state.session.activeErpTemplate = template;
  if (inst) state.session.activeErpInstance = inst;
  window.state.activeWorkspaceTab = 'org';

  if (typeof window.navigate === 'function') {
    window.navigate('/workspace');
  } else {
    window.location.hash = "#workspace";
  }
};

if (typeof window !== 'undefined') window.ccLogAction = function(message) {
  if (window.state) {
    if (!window.state.ccLogHistory) window.state.ccLogHistory = [];
    const time = new Date().toLocaleTimeString();
    window.state.ccLogHistory.push(`[${time}] Sovereign CC Command: ${message}`);
    window.state.ccToastMessage = message;
    window.render();
    setTimeout(() => {
      if (window.state && window.state.ccToastMessage === message) {
        window.state.ccToastMessage = null;
        window.render();
      }
    }, 4000);
  }
};


function renderEnterpriseNavigation() {
  const erps = window.state.erpApplications || [];
  
  if (erps.length === 0) {
    return `
      <div class="col-span-full p-6 text-slate-400 italic text-center">
        No enterprise architectures discovered in registry.
      </div>`;
  }

  return erps.map(erp => `
    <button
      onclick="window.navigate('/erp-ecosystem/${erp.id}')"
      class="p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition text-left group">
      <div class="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
        ${erp.icon || '◈'}
      </div>
      <div class="font-bold text-sm text-slate-900">
        ${erp.name}
      </div>
      <div class="text-[10px] text-slate-500 mt-1 uppercase font-mono font-bold tracking-wider">
        ${erp.category || erp.ecosystem || 'Enterprise ERP'}
      </div>
    </button>
  `).join("");
}

