 

import { ERP_CATALOGUE, ERPRuntimeEngine } from "./runtimeEngine.js";
import { getOfficialLogoHtml } from "../brand/brandConfig.js";

export const erpRuntime = new ERPRuntimeEngine();
if(typeof window !== 'undefined') window.erpRuntimeEngine = erpRuntime;
if (window.state) window.state.runtimeEngine = erpRuntime;

export const erpPlatformTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "sm", textColor: "light" });
  const installed = erpRuntime.getInstalled();

  window.app.innerHTML = `
    <div class="min-h-screen bg-slate-50 font-sans flex flex-col">
        
      <header class="bg-slate-900 text-white border-b border-slate-800 px-6 py-3 shrink-0 shadow-md">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-4 cursor-pointer" onclick="window.navigate('/gateway')">
            ${logoHtml}
            <div class="h-5 w-px bg-slate-700"></div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold rounded-full">
                JUMO ERP PLATFORM FACTORY
              </span>
            </div>
          </div>

          <div class="flex items-center space-x-2 text-xs font-bold">
            <button onclick="state.activeErpTab='store'; window.render();" class="px-3.5 py-1.5 rounded-lg transition cursor-pointer ${state.activeErpTab!=='installed'?'bg-emerald-600 text-white':'bg-slate-800 hover:bg-slate-700 text-slate-300'}">
              🛒 ERP Template Store
            </button>
            <button onclick="state.activeErpTab='installed'; window.render();" class="px-3.5 py-1.5 rounded-lg transition cursor-pointer ${state.activeErpTab==='installed'?'bg-emerald-600 text-white':'bg-slate-800 hover:bg-slate-700 text-slate-300'}">
              📦 Installed Instances (${installed.length})
            </button>
          </div>

          <div class="flex items-center space-x-3 text-xs font-bold">
            <button onclick="window.navigate('/gateway')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition cursor-pointer text-[11px]">&larr; Personal Gateway</button>
            <button onclick="window.navigate('/control-center')" class="px-3 py-1.5 bg-indigo-900/60 border border-indigo-700/50 hover:bg-indigo-800 text-indigo-200 rounded-lg transition cursor-pointer font-mono text-[11px]">Control Center</button>
          </div>
        </div>
      </header>

        
      <main class="flex-1 max-w-7xl w-full mx-auto p-6 lg:p-8 overflow-y-auto space-y-8">
          ${(!state.activeErpTab || state.activeErpTab === 'store') ? `
              
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
              ${(ERP_CATALOGUE || []).map(template => `
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
              
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="font-extrabold text-xl text-slate-900">Active Installed ERP Instances</h2>
                  <p class="text-xs text-slate-500">Manage and launch active enterprise institutional runtimes.</p>
                </div>
                <button onclick="state.activeErpTab='store'; window.render();" class="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition cursor-pointer">+ Deploy New ERP</button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${(installed || []).map(inst => `
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
                      <p class="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                        Institutional Governance Portals (${inst.structure.portals.length})
                      </p>
                      <div class="flex flex-wrap gap-1.5">
                        ${(inst.structure?.portals || []).map(p => `<span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold">${p.name}</span>`).join('')}
                      </div>
                    </div>
                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button onclick="window.launchErpInstance('${inst.instanceId}')" class="px-5 py-2.5 bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs">Launch ERP Portal &rarr;</button>
                      <button onclick="window.launchErpInstance('${inst.instanceId}')" class="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer">Configure</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `}
        </main>
    </div>
  `;
};

if(typeof window !== 'undefined') window.installErpTemplate = function(templateId) {
  const newInst = erpRuntime.installERP(templateId);
  window.launchErpInstance(newInst.instanceId);
};

if(typeof window !== 'undefined') window.launchErpInstance = function(instanceId) {
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
  window.window.navigate('/workspace');
};
