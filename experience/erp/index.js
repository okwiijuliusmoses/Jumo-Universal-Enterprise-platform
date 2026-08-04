import { getOfficialLogoHtml } from "../brand/brandConfig.js";

export const erpPlatformTemplate = async (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "md", textColor: "dark" });
  
  window.app.innerHTML = `
    <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        <!-- Top Enterprise Header -->
        <header class="h-16 border-b border-slate-200 bg-white flex items-center px-6 justify-between sticky top-0 z-50 shadow-sm">
            <div class="flex items-center gap-6">
                <div class="cursor-pointer flex items-center gap-2" onclick="window.navigate('/')">
                    ${logoHtml}
                </div>
                <div class="h-6 w-px bg-slate-200 hidden sm:block"></div>
                <div class="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md border border-slate-200 text-xs font-bold text-slate-700">
                    <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    UEOS ENTERPRISE FACTORY ENGINE
                </div>
            </div>

            <!-- Global Search & System Status -->
            <div class="flex items-center gap-4">
                <div class="relative hidden lg:block w-72">
                    <input type="text" id="erp-search-input" placeholder="Search ERP templates & ecosystems..." 
                           class="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                           onkeyup="window.filterERPCatalog()">
                    <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <div class="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-bold text-slate-700">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    ${state.session?.user?.name || "Platform Owner"}
                </div>
                <button onclick="window.navigate('/control-center')" class="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg transition border border-slate-200 cursor-pointer">Control Center</button>
                <button onclick="window.handleLogout(event)" class="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition cursor-pointer">Sign Out</button>
            </div>
        </header>

        <!-- Main Catalog Container -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
            
            <!-- Enterprise Console Banner -->
            <div class="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div class="flex items-center gap-2 text-xs font-mono uppercase text-blue-600 font-bold tracking-wider mb-1">
                        <span>Universal ERP Factory Catalogue</span>
                        <span>&bull;</span>
                        <span>10 Approved Institutional Templates</span>
                    </div>
                    <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">JUMO UEOS Enterprise Application Catalog</h1>
                    <p class="text-xs text-slate-500 mt-1 max-w-2xl">
                        Select an approved enterprise platform template to dynamically manufacture, configure, and launch an institutional ERP instance.
                    </p>
                </div>
                
                <div class="flex items-center gap-3 shrink-0">
                    <div class="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-center">
                        <span class="block text-xs text-slate-500 font-semibold uppercase tracking-wider">Approved Templates</span>
                        <span class="block text-lg font-extrabold text-slate-900" id="erp-count-badge">10</span>
                    </div>
                    <div class="px-4 py-2.5 bg-blue-50 border border-blue-100 rounded-lg text-center">
                        <span class="block text-xs text-blue-600 font-semibold uppercase tracking-wider">Ecosystem Families</span>
                        <span class="block text-lg font-extrabold text-blue-700">5</span>
                    </div>
                </div>
            </div>

            <!-- Ecosystem Category Filter Bar -->
            <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs font-bold" id="ecosystem-filter-bar">
                <button onclick="window.selectEcosystemFilter('all')" class="eco-filter-btn active px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm transition cursor-pointer whitespace-nowrap" data-eco="all">All Ecosystems (10)</button>
                <button onclick="window.selectEcosystemFilter('education')" class="eco-filter-btn px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap" data-eco="education">Education ERPs (6)</button>
                <button onclick="window.selectEcosystemFilter('hospitality')" class="eco-filter-btn px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap" data-eco="hospitality">Hospitality ERP (1)</button>
                <button onclick="window.selectEcosystemFilter('religious-diocese')" class="eco-filter-btn px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap" data-eco="religious-diocese">Religious & Diocese ERP (1)</button>
                <button onclick="window.selectEcosystemFilter('clan-heritage')" class="eco-filter-btn px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap" data-eco="clan-heritage">Clan & Heritage ERP (1)</button>
                <button onclick="window.selectEcosystemFilter('community-finance')" class="eco-filter-btn px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap" data-eco="community-finance">Community Finance ERP (1)</button>
            </div>

            <!-- ERP Grouped Catalog -->
            <div id="erp-grouped-catalog" class="space-y-10">
                <!-- Skeletons while loading -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${Array(6).fill().map(() => `
                        <div class="bg-white border border-slate-200 rounded-xl p-6 animate-pulse space-y-4">
                            <div class="h-4 bg-slate-100 rounded w-1/3"></div>
                            <div class="h-6 bg-slate-100 rounded w-2/3"></div>
                            <div class="h-20 bg-slate-50 rounded"></div>
                            <div class="h-10 bg-slate-100 rounded"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </main>
    </div>
  `;

  // Filter state
  window.currentEcoFilter = 'all';

  window.selectEcosystemFilter = (ecoId) => {
    window.currentEcoFilter = ecoId;
    document.querySelectorAll('.eco-filter-btn').forEach(btn => {
      if (btn.getAttribute('data-eco') === ecoId) {
        btn.className = "eco-filter-btn active px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm transition cursor-pointer whitespace-nowrap";
      } else {
        btn.className = "eco-filter-btn px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap";
      }
    });
    window.filterERPCatalog();
  };

  window.filterERPCatalog = () => {
    const searchVal = (document.getElementById('erp-search-input')?.value || '').toLowerCase();
    const sections = document.querySelectorAll('.erp-ecosystem-section');
    sections.forEach(sec => {
      const secEco = sec.getAttribute('data-ecosystem');
      const cards = sec.querySelectorAll('.erp-card-item');
      let visibleInSec = 0;

      cards.forEach(card => {
        const title = (card.getAttribute('data-title') || '').toLowerCase();
        const eco = card.getAttribute('data-eco') || '';
        
        const matchesEco = (window.currentEcoFilter === 'all' || window.currentEcoFilter === secEco);
        const matchesSearch = title.includes(searchVal);

        if (matchesEco && matchesSearch) {
          card.style.display = 'flex';
          visibleInSec++;
        } else {
          card.style.display = 'none';
        }
      });

      if (visibleInSec > 0) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  };

  try {
    const response = await fetch('/api/erp/ecosystem');
    if (!response.ok) throw new Error("Failed to load ERP Ecosystems");
    const data = await response.json();
    const erps = data.erps || [];
    
    document.getElementById('erp-count-badge').textContent = `${erps.length}`;
    
    const container = document.getElementById('erp-grouped-catalog');
    if (erps.length === 0) {
      container.innerHTML = `
        <div class="py-12 text-center border border-dashed border-slate-200 rounded-xl bg-white p-8">
            <svg class="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <h3 class="text-slate-800 font-bold mb-1">No ERP Templates Found</h3>
            <p class="text-xs text-slate-500">The Universal ERP Factory is preparing institutional templates.</p>
        </div>
      `;
      return;
    }

    // Group ERPs by Ecosystem Family
    const ecosystemsMap = {
      "education": { name: "Education ERP Family", desc: "Governance, Academic Registrar, Admissions, Faculties, and Student Lifecycles", erps: [] },
      "hospitality": { name: "Hospitality ERP Ecosystem", desc: "Hotel Operations, Accommodation, Restaurant, Bar, Tourism, and Guest Relations", erps: [] },
      "religious-diocese": { name: "Religious & Diocese ERP Ecosystem", desc: "Diocese Leadership, Parishes, Clergy, Health Facilities, and Member Care", erps: [] },
      "clan-heritage": { name: "Clan, Family & Heritage ERP Ecosystem", desc: "Clan Council, Member Registry, Genealogy Archives, Welfare, and Cultural Projects", erps: [] },
      "community-finance": { name: "Community Finance ERP Ecosystem", desc: "Savings, Loans, Credit Risk, Treasury, SACCOs, and Microfinance Operations", erps: [] }
    };

    erps.forEach(erp => {
      const ecoId = erp.blueprintId || erp.ecosystemId || "education";
      if (ecosystemsMap[ecoId]) {
        ecosystemsMap[ecoId].erps.push(erp);
      } else {
        // Fallback matching
        if (erp.id.includes("hospitality")) ecosystemsMap["hospitality"].erps.push(erp);
        else if (erp.id.includes("diocese") || erp.id.includes("province")) ecosystemsMap["religious-diocese"].erps.push(erp);
        else if (erp.id.includes("clan") || erp.id.includes("heritage")) ecosystemsMap["clan-heritage"].erps.push(erp);
        else if (erp.id.includes("community-finance") || erp.id.includes("sacco")) ecosystemsMap["community-finance"].erps.push(erp);
        else ecosystemsMap["education"].erps.push(erp);
      }
    });

    const getIconForERP = (id) => {
      if (id.includes('university') || id.includes('college')) {
        return `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>`;
      }
      if (id.includes('hospitality')) {
        return `<svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H7m4 0v10"></path></svg>`;
      }
      if (id.includes('community-finance')) {
        return `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
      }
      if (id.includes('clan') || id.includes('heritage')) {
        return `<svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`;
      }
      if (id.includes('diocese') || id.includes('religious')) {
        return `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`;
      }
      return `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`;
    };

    container.innerHTML = Object.entries(ecosystemsMap).map(([ecoKey, ecoGroup]) => {
      if (ecoGroup.erps.length === 0) return '';

      return `
        <div class="erp-ecosystem-section" data-ecosystem="${ecoKey}">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
                <div>
                    <h2 class="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        <span>${ecoGroup.name}</span>
                        <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full border border-slate-200">${ecoGroup.erps.length} Approved Templates</span>
                    </h2>
                    <p class="text-xs text-slate-500 mt-0.5">${ecoGroup.desc}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${ecoGroup.erps.map(erp => {
                  const governanceCount = erp.governance ? erp.governance.length : (erp.id.includes('university') ? 5 : 3);
                  const portalCount = erp.portals ? erp.portals.length : 5;
                  const deptCount = erp.departments ? erp.departments.length : 8;
                  const moduleCount = erp.modules ? erp.modules.length : 12;
                  const workflowCount = erp.workflows ? erp.workflows.length : 5;
                  const formCount = erp.forms ? erp.forms.length : 6;

                  return `
                    <div class="erp-card-item bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-xl p-5 transition-all flex flex-col justify-between group" data-title="${erp.name}" data-eco="${ecoKey}">
                        <div>
                            <!-- Header Bar -->
                            <div class="flex items-start justify-between gap-3 mb-3">
                                <div class="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                                    ${getIconForERP(erp.id)}
                                </div>
                                <div class="flex items-center gap-1.5">
                                    <span class="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-extrabold rounded border border-blue-100 uppercase tracking-wider">
                                        INSTITUTIONAL
                                    </span>
                                    <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-200 flex items-center gap-1">
                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        ${erp.status || 'ACTIVE'}
                                    </span>
                                </div>
                            </div>

                            <!-- Title & Identifier -->
                            <h3 class="text-base font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                ${erp.name}
                            </h3>
                            <p class="text-[11px] text-slate-500 line-clamp-2 mb-4">
                                Governed institutional ERP manufactured by Universal ERP Factory.
                            </p>

                            <!-- Governance & Capability Matrix -->
                            <div class="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-200 mb-5 font-mono">
                                <div>
                                    <span class="text-slate-400 block text-[9px] uppercase font-sans font-bold">Governance</span>
                                    <span class="font-bold text-slate-800">${governanceCount} Roles Installed</span>
                                </div>
                                <div>
                                    <span class="text-slate-400 block text-[9px] uppercase font-sans font-bold">Portals</span>
                                    <span class="font-bold text-slate-800">${portalCount} Portals</span>
                                </div>
                                <div>
                                    <span class="text-slate-400 block text-[9px] uppercase font-sans font-bold">Departments</span>
                                    <span class="font-bold text-slate-800">${deptCount} Directorates</span>
                                </div>
                                <div>
                                    <span class="text-slate-400 block text-[9px] uppercase font-sans font-bold">Modules</span>
                                    <span class="font-bold text-slate-800">${moduleCount} Modules</span>
                                </div>
                                <div>
                                    <span class="text-slate-400 block text-[9px] uppercase font-sans font-bold">Workflows</span>
                                    <span class="font-bold text-slate-800">${workflowCount} Chains</span>
                                </div>
                                <div>
                                    <span class="text-slate-400 block text-[9px] uppercase font-sans font-bold">AI Assistant</span>
                                    <span class="font-bold text-emerald-600">Provisioned</span>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="space-y-2 pt-3 border-t border-slate-100">
                            <button onclick="window.launchERPInstance('${erp.id}')" 
                                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-sm">
                                <span>Launch ERP</span>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                            <div class="grid grid-cols-2 gap-2">
                                <button onclick="window.launchERPInstance('${erp.id}')" class="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-1.5 px-3 rounded-lg text-[11px] border border-slate-200 transition cursor-pointer text-center">
                                    Configure
                                </button>
                                <button onclick="window.launchERPInstance('${erp.id}')" class="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-1.5 px-3 rounded-lg text-[11px] border border-slate-200 transition cursor-pointer text-center">
                                    Administration
                                </button>
                            </div>
                        </div>
                    </div>
                  `;
                }).join('')}
            </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error("Failed to render ERP catalog", err);
    document.getElementById('erp-grouped-catalog').innerHTML = `
      <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium">
        Failed to communicate with UEOS ERP Discovery Service.
      </div>
    `;
  }
};

import { erpRegistry } from "../../platform/registry/ERPRegistry.js";
export const erpRuntime = { 
 status:"ONLINE", 
 ai:{ enabled:true, engine:"UEOS AI Intelligence Runtime" }, 
 list(){ return erpRegistry.list(); }, 
 health(){ return { runtime:"UEOS AI ERP Experience Gateway", status:this.status, registry:erpRegistry.health(), ai:this.ai }; }
};
export default erpRuntime;
