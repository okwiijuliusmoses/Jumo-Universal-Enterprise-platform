import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";
import { EcosystemRegistry } from "../../kernel/erp/ecosystemRegistry.js";
import { ueosControlPlane } from "../../platform/control/UEOSControlPlane.js";
import { CommercialPlatformRegistry } from "../../kernel/registry/commercialRegistry.js";

const ecosystemRegistry = new EcosystemRegistry();
const commercialRegistry = new CommercialPlatformRegistry();

if (typeof window !== 'undefined') {
  window.handleSovereignLogin = function(e, redirectRoute = '/control-center') {
    e.preventDefault();
    const emailInput = document.getElementById("cc-email") || document.getElementById("sov-email") || document.getElementById("login-email") || { value: "owner@jumo.ueos" };
    const email = emailInput.value || "owner@jumo.ueos";
    
    if (!window.state) window.state = {};
    window.state.session = {
      user: {
        name: email.split("@")[0].replace(".", " "),
        email: email,
        role: "Platform Owner",
        isAdmin: true,
        status: "Sovereign Administrator"
      },
      organization: "JUMO GLOBAL PLATFORM HQ",
      tenantId: "tenant-sovereign-000"
    };
    
    if (!window.state.bootStatus) window.state.bootStatus = [];
    if (!window.state.bootStatus.includes("Sovereign Identity Validated")) {
      window.state.bootStatus.push("Sovereign Identity Validated");
    }
    
    if (typeof window.navigate === 'function') {
      window.navigate(redirectRoute);
    } else {
      window.location.hash = redirectRoute;
    }
  };

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



function renderInstalledERPFamilies(){

  const controlPlane = window.ueosControlPlane || null;


  if(!controlPlane){

    return `
    <div class="p-6 text-rose-600">
      UEOS AI Control Plane unavailable
    </div>`;

  }


  const health =
    controlPlane && typeof controlPlane.health === "function"
    ? controlPlane.health()
    : {
        registries:{erp:{platforms:[]}},
        factories:{enterpriseERP:{templates:0}}
      };


  const registry =
    health?.registries?.erp || {};


  const generated =
    typeof controlPlane.getGeneratedERPInstances === "function"
    ? controlPlane.getGeneratedERPInstances()
    : [];


  const registered =
    registry.platforms || [];


  const instances =
    [
      ...registered,
      ...generated
    ].filter(
      (item,index,array)=>
      array.findIndex(
        x=>x.id===item.id
      )===index
    );



  return `

  <div class="space-y-6">


    <div class="bg-white rounded-xl border border-slate-200 p-6">

      <h2 class="text-xl font-bold text-slate-800">
        JUMO UEOS AI ERP Factory
      </h2>

      <p class="text-slate-500 mt-2">
        Configurable enterprise ERP generation platform
      </p>


      <div class="grid grid-cols-3 gap-4 mt-5">

        <div class="p-4 bg-slate-50 rounded-lg">
          <b>${registry.platforms?.length || 0}</b>
          <span class="block text-xs">
          Registered ERP Systems
          </span>
        </div>


        <div class="p-4 bg-slate-50 rounded-lg">
          <b>${generated.length}</b>
          <span class="block text-xs">
          AI Generated Instances
          </span>
        </div>


        <div class="p-4 bg-slate-50 rounded-lg">
          <b>${health?.factories?.enterpriseERP?.templates || 0}</b>
          <span class="block text-xs">
          Blueprint Templates
          </span>
        </div>

      </div>


    </div>



    <div class="bg-white rounded-xl border border-slate-200 p-6">


      <h3 class="font-bold text-slate-800 mb-4">
        Deployed ERP Ecosystems
      </h3>



      ${
      instances.length === 0

      ?

      `
      <p class="text-slate-500">
      No ERP instances generated yet.
      </p>
      `

      :

      instances.map(erp=>`

      <div class="border rounded-lg p-4 mb-3">

        <div class="font-bold">
          ${erp.name}
        </div>

        <div class="text-sm text-slate-500">
          ${erp.category || "Enterprise ERP"}
        </div>


        <div class="grid grid-cols-3 gap-3 mt-3 text-xs">

          <span>
          Portals:
          ${erp.portals?.length || 0}
          </span>

          <span>
          Modules:
          ${erp.modules?.length || 0}
          </span>

          <span>
          Status:
          ${erp.status}
          </span>

        </div>

      </div>

      `).join("")

      }


    </div>


  </div>

  `;

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
  const logoHtml = getOfficialLogoHtml({ size: "lg", textColor: "dark" });

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
  const isLauncherOpen = state.ccLauncherOpen || false;
  const isCommandPaletteOpen = state.ccCommandPaletteOpen || false;
  const isNotificationCenterOpen = state.ccNotificationOpen || false;
  const isActivityCenterOpen = state.ccActivityOpen || false;
  const isHelpOpen = state.ccHelpOpen || false;
  const isAiAssistantOpen = state.ccAiAssistantOpen || false;

  window.document.getElementById("app").innerHTML = `
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
              <button onclick="window.state.session = null; window.navigate('/login');" class="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold">Logout Control Center</button>
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
                ${renderControlCenterNavigation()}
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
              <button onclick="ccLogAction('Action completed successfully.')" class="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer">New</button>
              <button onclick="ccLogAction('Import dialog opened.')" class="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer">Import</button>
              <button onclick="ccLogAction('Exporting data package...');" class="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer">Export</button>
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

    const erps = window.UEOSRuntime ? window.UEOSRuntime.erpRegistry.getPlatforms() : [];
    
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
            <span class="text-xs font-mono text-slate-500 font-bold">12 Certified Ecosystem Families</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 1. Education ERP -->
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
          ${Object.entries(faap.treasuryPools).map(([cur, pool]) => `
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
            ${faap.upgradeAreas.map(area => `
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span class="text-xs font-medium text-slate-700">${area.name}</span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
            `).join('')}
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

  if (view === 'faap') {
    html = `
      <div class="space-y-6">
        <div class="flex items-center justify-between bg-emerald-900 rounded-xl p-6 shadow-md border border-emerald-800 text-white">
          <div>
            <h2 class="text-2xl font-bold">FAAP Treasury & Multi-Currency Ledger</h2>
            <p class="text-emerald-200 text-sm mt-1">Enterprise Financial Operating Platform</p>
          </div>
          <div class="flex items-center gap-4">
             <div class="text-right">
                <p class="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Total Liquidity Position</p>
                <p class="text-3xl font-bold font-mono">$1.42B</p>
             </div>
             <button class="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-sm font-bold shadow transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Create Transaction
             </button>
          </div>
        </div>
        
        <!-- FAAP Sub-Modules Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
           ${['General Ledger', 'Budgeting', 'Accounts Payable', 'Accounts Receivable', 'Payroll', 'Treasury', 'Bank Reconciliation', 'Cash Management', 'Assets', 'Procurement', 'Tax', 'Revenue', 'Settlement', 'Wallets', 'Financial Reports'].map(mod => `
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-center items-center text-center group">
                 <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:bg-emerald-100 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </div>
                 <h3 class="text-xs font-bold text-slate-800 leading-tight">${mod}</h3>
              </div>
           `).join('')}
        </div>
        
        <!-- Real-Time Activity Ledger -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-8">
           <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 class="font-bold text-slate-900 flex items-center gap-2">
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
  render();
};

if (typeof window !== 'undefined') window.toggleCCLauncher = function() {
  window.state.ccLauncherOpen = !state.ccLauncherOpen;
  render();
};

if (typeof window !== 'undefined') window.toggleCCCommandPalette = function() {
  window.state.ccCommandPaletteOpen = !state.ccCommandPaletteOpen;
  render();
};

if (typeof window !== 'undefined') window.toggleCCNotification = function() {
  window.state.ccNotificationOpen = !state.ccNotificationOpen;
  render();
};

if (typeof window !== 'undefined') window.toggleCCActivity = function() {
  window.state.ccActivityOpen = !state.ccActivityOpen;
  render();
};

if (typeof window !== 'undefined') window.toggleCCHelp = function() {
  window.state.ccHelpOpen = !state.ccHelpOpen;
  render();
};

if (typeof window !== 'undefined') window.toggleCCAiAssistant = function() {
  window.state.ccAiAssistantOpen = !state.ccAiAssistantOpen;
  render();
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

if (typeof window !== 'undefined') window.switchCardTab = function(cardTabId, tabName) {
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


function renderEnterpriseNavigation(){

    const registry =
        window.UEOSArchitectureRegistry ||
        {};

    const platforms =
        registry.platforms || [];

    const portals =
        registry.portals || [];

    const items = [
        ...platforms,
        ...portals
    ];

    return items.map(item => `
        <button
        onclick="window.navigate('${item.id || item.portal}')"
        class="p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition text-left">

            <div class="text-2xl mb-3">
                ${item.icon || '◈'}
            </div>

            <div class="font-bold text-sm text-slate-900">
                ${item.name}
            </div>

            <div class="text-xs text-slate-500 mt-1">
                ${item.type || item.category || 'Enterprise Service'}
            </div>

        </button>
    `).join("");

}

