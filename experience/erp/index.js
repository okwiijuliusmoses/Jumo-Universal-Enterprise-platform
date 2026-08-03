import { getOfficialLogoHtml } from "../brand/brandConfig.js";

export const erpPlatformTemplate = async (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "light" });
  
  window.app.innerHTML = `
    <div class="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-200">
        <!-- Top Navbar -->
        <header class="h-16 border-b border-slate-800 bg-slate-950 flex items-center px-6 justify-between sticky top-0 z-50 shadow-sm">
            <div class="flex items-center gap-4">
                ${logoHtml}
                <div class="h-6 w-px bg-slate-800"></div>
                <div class="text-xs font-bold text-slate-300 tracking-wider">UEOS ERP ECOSYSTEM</div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-xs font-semibold text-slate-300">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    ${state.session?.user?.name || "Platform Owner"}
                </div>
                <button onclick="window.navigate('/control-center')" class="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition">Control Center</button>
                <button onclick="window.handleLogout(event)" class="text-xs font-bold text-rose-400 hover:text-rose-300 cursor-pointer transition">Sign Out</button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
            <div class="mb-12">
                <h1 class="text-3xl font-extrabold text-white mb-2 tracking-tight">JUMO DIGITAL HYBRID PLATFORM</h1>
                <h2 class="text-lg text-slate-400 font-medium">Enterprise Applications</h2>
            </div>
            
            <div class="flex justify-between items-end mb-6">
                <div>
                    <h3 class="text-xl font-bold text-slate-200">Available ERP Platforms</h3>
                    <p class="text-sm text-slate-500 mt-1">Select an enterprise resource planning instance to launch</p>
                </div>
                <div class="text-xs font-mono text-slate-500" id="erp-count-badge">Loading...</div>
            </div>

            <div id="erp-catalog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <!-- Loading skeletons -->
                ${Array(8).fill().map(() => `
                <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 animate-pulse">
                    <div class="h-4 bg-slate-800 rounded w-1/3 mb-4"></div>
                    <div class="h-6 bg-slate-800 rounded w-3/4 mb-6"></div>
                    <div class="space-y-3">
                        <div class="h-3 bg-slate-800 rounded w-1/2"></div>
                        <div class="h-3 bg-slate-800 rounded w-2/3"></div>
                    </div>
                </div>
                `).join('')}
            </div>
        </main>
    </div>
  `;

  try {
    const response = await fetch('/api/erp/ecosystem');
    if (!response.ok) throw new Error("Failed to load ERPs");
    const data = await response.json();
    const erps = data.erps || [];
    
    document.getElementById('erp-count-badge').textContent = `Total Instances: ${erps.length}`;
    
    const grid = document.getElementById('erp-catalog-grid');
    if (erps.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
            <svg class="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <h3 class="text-slate-300 font-bold mb-1">No ERPs Found</h3>
            <p class="text-sm text-slate-500">The ERP Instance Registry is currently empty.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = erps.map(erp => `
        <div class="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 flex flex-col group">
            <div class="flex justify-between items-start mb-4">
                <span class="inline-flex px-2 py-1 bg-slate-800 text-[10px] font-bold text-slate-400 rounded uppercase tracking-wider">${erp.domain}</span>
                <span class="inline-flex px-2 py-1 bg-emerald-500/10 text-[10px] font-bold text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ${erp.status}
                </span>
            </div>
            
            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">${erp.name}</h3>
            
            <div class="mt-4 space-y-2 mb-6">
                <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-500 font-medium">Portals</span>
                    <span class="text-slate-300 font-bold font-mono">${erp.blueprint?.portals?.length || (erp.portals ? erp.portals.length : 0)}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-500 font-medium">Modules</span>
                    <span class="text-slate-300 font-bold font-mono">${erp.blueprint?.modules?.length || (erp.modules ? erp.modules.length : 0)}</span>
                </div>
            </div>
            
            <div class="mt-auto pt-4 border-t border-slate-800">
                <button onclick="window.navigate('/erp-workspace?id=${erp.id}')" class="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-2.5 px-4 rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-2">
                    Launch Platform
                    <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>
        </div>
    `).join('');

  } catch (err) {
    console.error("Failed to render ERP catalog", err);
    document.getElementById('erp-catalog-grid').innerHTML = `
      <div class="col-span-full p-4 bg-rose-950/30 border border-rose-900 rounded-xl text-rose-400 text-sm font-medium">
        Failed to communicate with UEOS ERP Discovery Service.
      </div>
    `;
  }
};

import { erpRegistry } from "../../platform/registry/ERPRegistry.js";
export const erpRuntime = { 
 status:"ONLINE", 
 ai:{   enabled:true,   engine:"UEOS AI Intelligence Runtime" }, 
 list(){   return erpRegistry.list(); }, 
 health(){   return {    runtime:"UEOS AI ERP Experience Gateway",    status:this.status,    registry:erpRegistry.health(),    ai:this.ai   }; }
};
export default erpRuntime;
