import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";

export const workspaceTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "sm", textColor: "light" });

  app.innerHTML = `
    <div class="min-h-screen flex bg-slate-50 font-sans">
      <!-- Sidebar with tab switches for organization, department, and user role workspace views -->
      <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        <div class="p-5 border-b border-slate-800 cursor-pointer" onclick="navigate('/gateway')">
          ${logoHtml}
        </div>

        <!-- Switch between Resolved Workspace scopes -->
        <div class="p-4 border-b border-slate-800 bg-slate-950/40 text-xs">
          <p class="text-[9px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">Resolved Workspace Scopes</p>
          <div class="space-y-1 font-bold">
            <button onclick="state.activeWorkspaceTab='org'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeWorkspaceTab==='org'?'bg-enterprise-blue text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>🏢 Organization Scope</span>
            </button>
            <button onclick="state.activeWorkspaceTab='dept'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeWorkspaceTab==='dept'?'bg-enterprise-blue text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>⚙️ Department Scope</span>
            </button>
            <button onclick="state.activeWorkspaceTab='role'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeWorkspaceTab==='role'?'bg-enterprise-blue text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>🔑 User Role Scope</span>
            </button>
          </div>
        </div>

        <div class="p-4 flex-1"></div>

        <div class="p-3 border-t border-slate-800 space-y-1.5 text-xs">
          <button onclick="navigate('/gateway')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">← Personal Gateway</button>
          <button onclick="navigate('/shell')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">Operating Shell</button>
          
          ${state.session?.user?.isAdmin ? `
            <button onclick="navigate('/control-center')" class="w-full py-2 bg-indigo-900/40 border border-indigo-700/50 hover:bg-indigo-800/40 text-indigo-200 font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition font-mono cursor-pointer">Control Center</button>
          ` : ''}

          <button onclick="handleLogout()" class="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">Sign Out</button>
        </div>
      </aside>

      <!-- Dynamic Workspace main area -->
      <div class="flex-1 flex flex-col min-w-0">
        <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div class="flex items-center space-x-2">
            <span class="font-extrabold text-slate-800 text-sm uppercase tracking-wider">JUMO Enterprise Workspace Resolver</span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-[10px] font-mono bg-blue-50 border border-blue-100 text-enterprise-blue font-bold uppercase tracking-wider px-2.5 py-1.5 rounded">RESOLVED TENANT: ${state.session?.tenantId || 'tenant-default-001'}</span>
            <button onclick="navigate('/gateway')" class="text-xs text-slate-500 hover:text-enterprise-blue font-bold">&larr; Return to Gateway</button>
          </div>
        </header>

        <main class="flex-1 p-6 lg:p-8 overflow-y-auto">
          <!-- Org scope Workspace -->
          ${state.activeWorkspaceTab === 'org' ? `
            <div class="space-y-6 font-semibold">
              <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                <div class="flex items-center justify-between mb-2">
                  <span class="px-3 py-1 bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold rounded-full">${state.session?.activeErpTemplate?.ecosystem || 'Enterprise'} Ecosystem</span>
                  <span class="text-xs font-mono text-slate-400">Tenant: ${state.session?.tenantId || 'tenant-default-001'}</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900 font-sans">${state.session?.organization || "University of Kampala"}</h3>
                <p class="text-xs text-slate-600 mt-2 leading-relaxed">${state.session?.activeErpTemplate?.description || 'Active institutional ERP runtime environment.'}</p>
              </div>

              <!-- ERP Governance Portals -->
              ${state.session?.activeErpTemplate ? `
                <div class="space-y-4">
                  <h4 class="font-bold text-sm text-slate-900">Institutional Governance Portals</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${(state.session.activeErpTemplate.governancePortals || []).map(p => `
                      <div class="bg-white border border-slate-200 p-5 rounded-xl hover:border-enterprise-blue transition space-y-2">
                        <h5 class="font-extrabold text-slate-900 text-xs">${p.name}</h5>
                        <p class="text-[11px] text-slate-500 leading-relaxed">${p.desc}</p>
                        <button onclick="alert('Accessing ${p.name} portal...');" class="px-3 py-1.5 bg-enterprise-blue hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition cursor-pointer">Open Portal</button>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="space-y-4 pt-4">
                  <h4 class="font-bold text-sm text-slate-900">Active Operational Modules & Staff SACCO (FAAP Integrated)</h4>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${(state.session.activeErpTemplate.defaultModules || []).map(m => `
                      <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-800">${m}</span>
                        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : `
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="bg-white border border-slate-200 p-6 rounded-xl text-xs">
                    <span class="text-lg">💰</span>
                    <h4 class="font-extrabold text-slate-900 mt-3 uppercase tracking-wider font-sans">Treasury Settlement Mappings</h4>
                    <p class="text-slate-500 mt-1 leading-relaxed">Treasury & Currency systems mapped under security Ring 1. Authorized via Zero-Trust.</p>
                  </div>
                  <div class="bg-white border border-slate-200 p-6 rounded-xl text-xs">
                    <span class="text-lg">🛡️</span>
                    <h4 class="font-extrabold text-slate-900 mt-3 uppercase tracking-wider font-sans">Sovereign Compliance Ledger</h4>
                    <p class="text-slate-500 mt-1 leading-relaxed">Sovereign State regulatory audits and compliance checkpoints verification.</p>
                  </div>
                  <div class="bg-white border border-slate-200 p-6 rounded-xl text-xs">
                    <span class="text-lg">🤖</span>
                    <h4 class="font-extrabold text-slate-900 mt-3 uppercase tracking-wider font-sans">Intelligent Agent Core</h4>
                    <p class="text-slate-500 mt-1 leading-relaxed">Active AI router agents mapping workflows, process logs, and synthetic audits.</p>
                  </div>
                </div>
              `}
            </div>
          ` : ''}

          <!-- Department Scope Workspace -->
          ${state.activeWorkspaceTab === 'dept' ? `
            <div class="space-y-6">
              <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-xs text-xs font-semibold">
                <p class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Department Scope Verification</p>
                <h3 class="text-lg font-bold text-slate-900 mt-1 uppercase font-sans">Department: Treasury & Sovereign Finance (FAAP Nodes)</h3>
                <p class="text-slate-600 mt-2 leading-relaxed">Underneath security isolation boundaries, FAAP represents the live API connecting currency disbursements, global vendor settlements, and state treasury mapping systems.</p>
              </div>

              <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs font-semibold">
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider">FAAP Transaction Ledger Settlement Node</h4>
                  <span class="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded font-bold font-mono text-[9px] uppercase tracking-wider">Node: Active</span>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-xs">
                  <div class="lg:col-span-5 bg-slate-50 border border-slate-200 p-5 rounded-xl">
                    <h5 class="font-bold uppercase text-slate-400 mb-4">Post Sovereign Transaction (Signed)</h5>
                    <form onsubmit="recordFaapTransaction(event)" class="space-y-4">
                      <div>
                        <label class="block text-slate-500 mb-1.5">Disbursement Amount</label>
                        <input type="number" id="faap-tx-amount" placeholder="e.g. 50000" required class="w-full p-2.5 bg-white border border-slate-200 rounded focus:outline-none font-bold">
                      </div>
                      <div>
                        <label class="block text-slate-500 mb-1.5">Asset Type / Category</label>
                        <select id="faap-tx-type" class="w-full p-2.5 bg-white border border-slate-200 rounded focus:outline-none font-bold">
                          <option value="FAAP Treasury Transfer">Treasury Reserve Allocation</option>
                          <option value="Global Vendor Settle">Global Vendor Settlement</option>
                          <option value="Sovereign Tax Disburse">Sovereign Tax Disbursement</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-slate-500 mb-1.5">Currency System</label>
                        <select id="faap-tx-currency" class="w-full p-2.5 bg-white border border-slate-200 rounded focus:outline-none font-bold">
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                        </select>
                      </div>
                      <button type="submit" class="w-full py-2.5 bg-enterprise-blue hover:bg-blue-700 text-white font-bold uppercase rounded cursor-pointer transition text-[10px] tracking-wider font-sans">Record & Sign Cryptographically</button>
                    </form>
                  </div>

                  <div class="lg:col-span-7 space-y-4">
                    <h5 class="font-bold text-slate-900 uppercase tracking-wider">FAAP Financial Transaction Register</h5>
                    <div class="space-y-2 max-h-64 overflow-y-auto font-mono text-[11px]">
                      ${(state.faapTransactions || []).map(tx => `
                        <div class="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs font-mono">
                          <div>
                            <span class="font-bold text-slate-800">${tx.type}</span>
                            <p class="text-[9px] text-slate-400 mt-0.5">${tx.id} &bull; ${tx.timestamp}</p>
                          </div>
                          <div class="text-right">
                            <span class="font-bold text-enterprise-blue">${tx.amount}</span>
                            <p class="text-[9px] text-emerald-600 font-bold uppercase mt-0.5">${tx.status}</p>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- User Role Scope workspace -->
          ${state.activeWorkspaceTab === 'role' ? `
            <div class="space-y-6 font-semibold">
              <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                <p class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">User Role Verification Context</p>
                <h3 class="text-xl font-bold text-slate-900 mt-1 font-sans">Role: ${state.session?.user?.role || "Enterprise Administrator"}</h3>
                <p class="text-xs text-slate-600 mt-2 leading-relaxed">This viewport displays the security permissions, authorization checks, and direct cryptographic Ring permissions allocated to your credential signatures.</p>
              </div>

              <div class="bg-white border border-slate-200 rounded-xl p-6 text-xs">
                <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Direct Platform Permissions Matrix</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between">
                    <span class="text-slate-800 font-bold">ALL_ACCESS (Ring-1 & Ring-2)</span>
                    <span class="text-emerald-700 font-bold font-mono">AUTHORIZED</span>
                  </div>
                  <div class="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between">
                    <span class="text-slate-800 font-bold">RING_0_BYPASS_CAPABILITY</span>
                    <span class="text-emerald-700 font-bold font-mono">AUTHORIZED</span>
                  </div>
                  <div class="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between">
                    <span class="text-slate-800 font-bold">COGNITIVE_AI_ROUTING</span>
                    <span class="text-emerald-700 font-bold font-mono">AUTHORIZED</span>
                  </div>
                  <div class="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between">
                    <span class="text-slate-800 font-bold">AEGIS_LEDGER_SIGNATURE_WRITE</span>
                    <span class="text-emerald-700 font-bold font-mono">AUTHORIZED</span>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}
        </main>
      </div>
    </div>
  `;
};
