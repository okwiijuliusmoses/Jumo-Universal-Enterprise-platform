/**
 * JUMO UEOS ERP Application Platform & Runtime Views
 * Renders installable ERP templates, dynamic governance portals, department expansion,
 * modular applications, digital forms, and workflows.
 */

import { ERP_CATALOGUE, ERPRuntimeEngine } from "./runtimeEngine.js";
import { getOfficialLogoHtml } from "../brand/brandConfig.js";

const erpRuntime = new ERPRuntimeEngine();

export const erpPlatformTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "sm", textColor: "light" });
  const installed = erpRuntime.getInstalled();

  app.innerHTML = `
    <div class="min-h-screen flex bg-slate-50 font-sans">
      <!-- Enterprise Sidebar -->
      <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        <div class="p-5 border-b border-slate-800 cursor-pointer" onclick="navigate('/gateway')">
          ${logoHtml}
        </div>

        <div class="p-4 border-b border-slate-800 bg-slate-950/40 text-xs">
          <p class="text-[9px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">ERP Runtime Navigation</p>
          <div class="space-y-1 font-bold">
            <button onclick="state.activeErpTab='store'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeErpTab!=='installed'?'bg-emerald-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>🛒 ERP Template Store</span>
            </button>
            <button onclick="state.activeErpTab='installed'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeErpTab==='installed'?'bg-emerald-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>📦 Installed ERP Instances</span>
            </button>
          </div>
        </div>

        <div class="p-4 flex-1"></div>

        <div class="p-3 border-t border-slate-800 space-y-1.5 text-xs">
          <button onclick="navigate('/gateway')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">&larr; Personal Gateway</button>
          <button onclick="navigate('/control-center')" class="w-full py-2 bg-indigo-900/40 border border-indigo-700/50 hover:bg-indigo-800/40 text-indigo-200 font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition font-mono cursor-pointer">Control Center</button>
        </div>
      </aside>

      <!-- Main Workspace -->
      <div class="flex-1 flex flex-col min-w-0">
        <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div class="flex items-center space-x-3">
            <span class="font-extrabold text-slate-900 text-sm uppercase tracking-wider">JUMO UEOS Dynamic ERP Application Platform</span>
            <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-bold rounded">RUNTIME: v1.0-genesis</span>
          </div>
          <div class="flex items-center space-x-4 text-xs font-bold">
            <span class="text-slate-500">Active Tenant: ${state.session?.tenantId || 'tenant-default-001'}</span>
          </div>
        </header>

        <main class="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8">
          ${(!state.activeErpTab || state.activeErpTab === 'store') ? `
            <!-- ERP Template Store & Factory -->
            <div class="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div class="space-y-2">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-[11px] font-mono uppercase font-bold tracking-wider">
                  <span>🏭 JUMO ERP Ecosystem Marketplace</span>
                </div>
                <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">Deployable Enterprise ERP Templates</h2>
                <p class="text-xs text-slate-300 max-w-2xl">Select a certified institutional template to instantly provision an isolated enterprise ERP with inherited UEOS kernel, FAAP treasury, Digital Pay clearinghouse, and Staff SACCO.</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${ERP_CATALOGUE.map(template => `
                <div class="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:border-emerald-500 transition flex flex-col justify-between space-y-4">
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-3xl">${template.icon}</span>
                      <span class="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono font-bold text-[10px] rounded-lg">${template.code}</span>
                    </div>
                    <div>
                      <h3 class="font-extrabold text-base text-slate-900">${template.name}</h3>
                      <p class="text-xs text-slate-500 mt-1 leading-relaxed">${template.description}</p>
                    </div>
                  </div>
                  <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span class="text-[11px] font-bold text-emerald-700">${template.ecosystem} Ecosystem</span>
                    <button onclick="window.installErpTemplate('${template.id}')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs">Install ERP</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <!-- Installed ERP Instances -->
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="font-extrabold text-xl text-slate-900">Active Installed ERP Instances</h2>
                  <p class="text-xs text-slate-500">Manage and launch active enterprise institutional runtimes.</p>
                </div>
                <button onclick="state.activeErpTab='store'; render();" class="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition cursor-pointer">+ Deploy New ERP</button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${installed.map(inst => `
                  <div class="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div class="flex items-center justify-between">
                      <span class="px-3 py-1 bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold rounded-full">${inst.status}</span>
                      <span class="text-xs text-slate-400 font-mono">Installed: ${inst.installedAt}</span>
                    </div>
                    <div>
                      <h3 class="font-extrabold text-lg text-slate-900">${inst.name}</h3>
                      <p class="text-xs text-slate-500 mt-1">Tenant ID: <span class="font-mono font-bold text-slate-700">${inst.tenantId}</span></p>
                    </div>
                    <div class="space-y-2">
                      <p class="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Active Enabled Modules (${inst.activeModules.length})</p>
                      <div class="flex flex-wrap gap-1.5">
                        ${inst.activeModules.map(m => `<span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold">${m}</span>`).join('')}
                      </div>
                    </div>
                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button onclick="window.launchErpInstance('${inst.instanceId}')" class="px-5 py-2.5 bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs">Launch ERP Portal &rarr;</button>
                      <button onclick="alert('Configuration saved');" class="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer">Configure</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `}
        </main>
      </div>
    </div>
  `;
};

window.installErpTemplate = function(templateId) {
  const newInst = erpRuntime.installERP(templateId);
  alert(`Successfully installed and provisioned ERP instance for ${newInst.name}!`);
  window.state.activeErpTab = 'installed';
  window.render();
};

window.launchErpInstance = function(instanceId) {
  const inst = erpRuntime.getInstalled().find(i => i.instanceId === instanceId);
  if (!inst) return;
  const template = ERP_CATALOGUE.find(t => t.id === inst.templateId);
  
  // Navigate to workspace with this ERP context
  window.state.session = {
    user: { name: "Institution Administrator", email: "admin@institution.edu", role: "ERP Administrator", isAdmin: true },
    organization: inst.name,
    tenantId: inst.tenantId,
    activeErpInstance: inst,
    activeErpTemplate: template
  };
  window.navigate('/workspace');
};
