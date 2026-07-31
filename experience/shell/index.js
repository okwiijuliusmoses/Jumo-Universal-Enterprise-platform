import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";

export const shellTemplate = (state) => {
  const logoHtml = getOfficialLogoHtml({ size: "sm", textColor: "light" });

  app.innerHTML = `
          <div class="min-h-screen flex bg-slate-50 font-sans">
            <!-- Left Navigation Panel -->
            <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
              <div class="p-5 border-b border-slate-800 cursor-pointer" onclick="navigate('/gateway')">
                ${logoHtml}
              </div>
              
              <!-- Tenant Swapper dropdown directly on sidebar -->
              <div class="p-4 border-b border-slate-800 bg-slate-950/40">
                <p class="text-[9px] font-mono uppercase tracking-wider text-slate-500 mb-1.5 font-bold">Active Tenant Mapping</p>
                <select onchange="switchTenant(this.value, this.options[this.selectedIndex].text)" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-600 font-bold">
                  <option value="tenant-default-001" ${state.activeTenantId==='tenant-default-001'?'selected':''}>Jumo Global HQ</option>
                  <option value="org-02" ${state.activeTenantId==='org-02'?'selected':''}>Ministry of Tech</option>
                  <option value="org-hospital-01" ${state.activeTenantId==='org-hospital-01'?'selected':''}>Metropolitan Hospital</option>
                </select>
              </div>

              <!-- Navigation Menu -->
              <nav class="flex-1 p-3 space-y-1 text-xs">
                <button onclick="state.activeTab='launcher'; render();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='launcher'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
                  <span>🛍️ Application Marketplace</span>
                </button>
                <button onclick="state.activeTab='domains'; render();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='domains'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
                  <span>🌍 Sovereign Domains</span>
                </button>
                <button onclick="state.activeTab='workflows'; fetchWorkflows();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='workflows'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
                  <span>⚙️ Workflow Center</span>
                </button>
                <button onclick="state.activeTab='aegis'; fetchAudit();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='aegis'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
                  <span>🛡️ AEGIS Audit Ledger</span>
                </button>
                <button onclick="state.activeTab='ai'; render();" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-bold uppercase tracking-wider text-left transition cursor-pointer ${state.activeTab==='ai'?'bg-indigo-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
                  <span>🤖 AI Gateway Assistant</span>
                </button>
              </nav>

              <!-- Footer navigation quick-switches -->
              <div class="p-3 border-t border-slate-800 space-y-1.5 text-xs">
                <button onclick="navigate('/gateway')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">&larr; Personal Gateway</button>
                <button onclick="navigate('/workspace')" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">Workspace Resolver</button>
                
                ${state.session?.user?.isAdmin ? `
                  <button onclick="navigate('/control-center')" class="w-full py-2 bg-indigo-900/40 border border-indigo-700/50 hover:bg-indigo-800/40 text-indigo-200 font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition font-mono cursor-pointer">Control Center</button>
                ` : ''}

                <button onclick="handleLogout()" class="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-[10px] uppercase tracking-wider rounded-md text-center transition cursor-pointer">Sign Out</button>
              </div>
            </aside>

            <!-- Main Content Container -->
            <div class="flex-1 flex flex-col min-w-0">
              <!-- Header utility -->
              <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
                <div class="flex items-center space-x-4 w-1/3">
                  <input type="text" placeholder="Search applications, logs, audit transactions..." oninput="performSearch(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 font-semibold">
                </div>
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <button onclick="state.notificationCenterOpen = !state.notificationCenterOpen; render();" class="p-2 text-slate-500 hover:text-slate-800 transition text-xs font-bold uppercase cursor-pointer">
                      🔔 Notifications (${state.notifications.length})
                    </button>
                    ${state.notificationCenterOpen ? `
                      <div class="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50 divide-y divide-slate-100 text-xs">
                        <p class="font-bold text-slate-700 pb-2 uppercase tracking-wider">UEOS Notifications Center</p>
                        ${state.notifications.map(n => `
                          <div class="py-2 font-semibold">
                            <p class="font-bold text-slate-900">${n.title}</p>
                            <p class="text-slate-500 mt-0.5 text-[10px]">${n.message}</p>
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}
                  </div>
                  <span class="text-[10px] font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-bold">IDENTITY: admin@jumo.org</span>
                </div>
              </header>

              <!-- Shell Dynamic Tab Panel -->
              <main class="flex-1 p-6 lg:p-8 overflow-y-auto">
                ${state.searchResults.length > 0 ? `
                  <div class="mb-8 p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <h4 class="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">Resolved Platform Search Results</h4>
                    <div class="space-y-2 text-xs font-semibold">
                      ${state.searchResults.map(r => `
                        <div class="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                          <span class="font-bold text-slate-900">${r.title}</span>
                          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold uppercase">${r.type}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Sub-application simulation manager if running -->
                ${state.simulatedAppRunning ? `
                  <div class="mb-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm relative">
                    <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                      <div class="flex items-center space-x-2.5">
                        <span class="w-2.5 h-2.5 rounded bg-emerald-500 animate-pulse"></span>
                        <h4 class="font-bold text-slate-900 uppercase text-xs font-mono">Simulated Sandboxed Sandbox Execution Environment: ${state.simulatedAppRunning}</h4>
                      </div>
                      <button onclick="state.simulatedAppRunning=null; render();" class="text-xs font-bold text-rose-500 hover:text-rose-700 uppercase tracking-wider cursor-pointer font-sans">Kill Simulation Context</button>
                    </div>
                    
                    ${state.simulatedAppRunning === 'FAAP Financial Ledger' ? `
                      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-semibold">
                        <div class="lg:col-span-5 bg-slate-50 border border-slate-200 p-5 rounded-xl text-xs">
                          <h5 class="font-bold uppercase text-slate-400 mb-4">Record Financial Ledger Block (Ring-1)</h5>
                          <form onsubmit="recordFaapTransaction(event)" class="space-y-4">
                            <div>
                              <label class="block text-slate-500 mb-1.5">Disbursement Amount</label>
                              <input type="number" id="faap-tx-amount" placeholder="e.g. 50000" required class="w-full p-2.5 bg-white border border-slate-200 rounded focus:outline-none font-bold">
                            </div>
                            <div>
                              <label class="block text-slate-500 mb-1.5">Asset Type / category</label>
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
                            <button type="submit" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded cursor-pointer transition text-[10px] tracking-wider font-sans">Record & Sign Cryptographically</button>
                          </form>
                        </div>
                        <div class="lg:col-span-7 space-y-4">
                          <h5 class="font-bold text-slate-900 text-xs uppercase tracking-wider font-sans">Financial ledger transaction logs (Live)</h5>
                          <div class="space-y-2 max-h-64 overflow-y-auto">
                            ${state.faapTransactions.map(tx => `
                              <div class="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs font-mono">
                                <div>
                                  <span class="font-bold text-slate-800">${tx.type}</span>
                                  <p class="text-[9px] text-slate-400 mt-0.5">${tx.id} &bull; ${tx.timestamp}</p>
                                </div>
                                <div class="text-right">
                                  <span class="font-bold text-indigo-600">${tx.amount}</span>
                                  <p class="text-[9px] text-emerald-600 font-bold uppercase mt-0.5">${tx.status}</p>
                                </div>
                              </div>
                            `).join('')}
                          </div>
                        </div>
                      </div>
                    ` : `
                      <div class="p-8 text-center text-xs text-slate-500 font-semibold">
                        <p class="font-bold uppercase text-slate-400 mb-2">IFrame Shell Container Mockup</p>
                        <p>Application context sandbox loaded on Ring-2 memory block. Fully sandbox isolated from Kernel.</p>
                      </div>
                    `}
                  </div>
                ` : ''}

                <!-- Tab 1: Marketplace / Applications -->
                ${state.activeTab === 'launcher' ? `
                  <div class="space-y-6">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="text-xl font-bold text-slate-900 font-sans">Enterprise Applications Shell</h3>
                        <p class="text-xs text-slate-500 mt-1">Sovereign modular solutions pre-verified with the JUMO UEOS kernel.</p>
                      </div>
                      <span class="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-mono font-bold uppercase rounded-full">Containers: 8 Installed</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-semibold">
                      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div>
                          <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full">Core</span>
                          <h4 class="font-bold text-slate-900 text-base mt-3 font-sans">UEOS Workspace Shell</h4>
                          <p class="text-xs text-slate-600 mt-1">Multi-tenant layout mapping directories and organizational spaces.</p>
                        </div>
                        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span class="text-emerald-600 font-bold">Installed</span>
                          <button onclick="launchSimulationApp('UEOS Workspace Shell')" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer font-sans">Launch</button>
                        </div>
                      </div>

                      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div>
                          <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full">Finance</span>
                          <h4 class="font-bold text-slate-900 text-base mt-3 font-sans">FAAP Financial Ledger</h4>
                          <p class="text-xs text-slate-600 mt-1">Multi-currency accounting treasury settlements, and asset ledgers.</p>
                        </div>
                        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span class="text-emerald-600 font-bold">Installed</span>
                          <button onclick="launchSimulationApp('FAAP Financial Ledger')" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer font-sans">Launch</button>
                        </div>
                      </div>

                      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div>
                          <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full">Operations</span>
                          <h4 class="font-bold text-slate-900 text-base mt-3 font-sans">Enterprise Workflow Engine</h4>
                          <p class="text-xs text-slate-600 mt-1">Design, execute and audit institutional approval workflow maps.</p>
                        </div>
                        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span class="text-emerald-600 font-bold">Installed</span>
                          <button onclick="state.activeTab='workflows'; fetchWorkflows();" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer font-sans">Explore Engine</button>
                        </div>
                      </div>

                      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div>
                          <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full">Security</span>
                          <h4 class="font-bold text-slate-900 text-base mt-3 font-sans">AEGIS Audit & Compliance</h4>
                          <p class="text-xs text-slate-600 mt-1">Immutable cryptographic signature monitoring and event checking.</p>
                        </div>
                        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span class="text-emerald-600 font-bold">Installed</span>
                          <button onclick="state.activeTab='aegis'; fetchAudit();" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer font-sans">Inspect Ledger</button>
                        </div>
                      </div>

                      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div>
                          <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full">Intelligence</span>
                          <h4 class="font-bold text-slate-900 text-base mt-3 font-sans">Jumo AI Assistant</h4>
                          <p class="text-xs text-slate-600 mt-1">Smart enterprise synthesis, report compiler and API router helper.</p>
                        </div>
                        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span class="text-emerald-600 font-bold">Installed</span>
                          <button onclick="state.activeTab='ai'; render();" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer font-sans">Chat AI</button>
                        </div>
                      </div>

                      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div>
                          <span class="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full">Education</span>
                          <h4 class="font-bold text-slate-900 text-base mt-3 font-sans">Education Campus Suite</h4>
                          <p class="text-xs text-slate-600 mt-1">Student information registers, class plans and campus finance nodes.</p>
                        </div>
                        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span class="text-slate-400 font-bold font-semibold">Available</span>
                          <button onclick="alert('Licensing verification required. Request Ring-0 approval.')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer font-sans">Acquire License</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ` : ''}

                <!-- Tab 2: Sovereign Domain Registry mapping details -->
                ${state.activeTab === 'domains' ? `
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-xl font-bold text-slate-900 font-sans">Sovereign Domain Registry Mappings</h3>
                      <p class="text-xs text-slate-500 mt-1 font-semibold">Pre-verified industrial framework integrations loading securely onto the kernel memory registers.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 font-semibold">
                      ${state.domains.map(d => `
                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-xs">
                          <div class="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                            <h4 class="font-bold text-slate-900 text-sm font-sans">${d.name}</h4>
                            <span class="font-mono text-indigo-600 font-bold uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded text-[10px] border border-indigo-100">${d.version}</span>
                          </div>
                          <p class="text-slate-600 mb-4 leading-relaxed">${d.description}</p>
                          <div class="flex items-center justify-between font-mono text-[10px] uppercase font-bold text-slate-400">
                            <span>Status: <span class="text-emerald-600 font-extrabold">${d.status}</span></span>
                            <span>Mapped Memory space ID: dmn-${d.id}</span>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Tab 3: Workflows approval logs -->
                ${state.activeTab === 'workflows' ? `
                  <div class="space-y-6 font-semibold">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="text-xl font-bold text-slate-900 font-sans">Workflow Approval & Routing Center</h3>
                        <p class="text-xs text-slate-500 mt-1">Audit state routing pipelines validating Ring-1 resource transactions.</p>
                      </div>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                      <table class="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-mono text-slate-500 uppercase font-bold">
                            <th class="p-4">Workflow Map Title</th>
                            <th class="p-4">Domain Context</th>
                            <th class="p-4">Operator Owner</th>
                            <th class="p-4">Current state</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-slate-700 font-sans text-xs">
                          ${state.workflows.map(w => `
                            <tr class="hover:bg-slate-50 transition">
                              <td class="p-4 font-bold text-slate-900">${w.title}</td>
                              <td class="p-4">${w.category}</td>
                              <td class="p-4 font-mono text-[11px]">${w.owner}</td>
                              <td class="p-4"><span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold border border-emerald-100 text-[10px] uppercase tracking-wider">${w.status}</span></td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ` : ''}

                <!-- Tab 4: AEGIS Cryptographic auditing ledger -->
                ${state.activeTab === 'aegis' ? `
                  <div class="space-y-6">
                    <div class="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <h3 class="text-xl font-bold text-slate-900 font-sans">AEGIS Cryptographic Audit Ledger</h3>
                        <p class="text-xs text-slate-500 mt-1 font-semibold">Immutable cryptographic signature logs tracking every single platform state changes.</p>
                      </div>
                      <div class="flex items-center space-x-3 text-xs font-bold font-sans">
                        <span id="aegis-ledger-status" class="text-emerald-600 font-mono tracking-wider uppercase">🛡️ Integrity State: SECURE</span>
                        <button onclick="verifyAegisIntegrity()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white uppercase text-[10px] tracking-wider rounded cursor-pointer transition">Re-Verify Integrity Chain</button>
                      </div>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
                      <table class="w-full text-left border-collapse">
                        <thead>
                          <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-mono text-slate-500 uppercase font-bold">
                            <th class="p-4">Event Code</th>
                            <th class="p-4">Audited Platform Action</th>
                            <th class="p-4">Responsible Actor</th>
                            <th class="p-4 font-mono">Secure Cryptographic Block Signature Hash</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
                          ${state.auditLogs.map(a => `
                            <tr class="hover:bg-slate-50 transition">
                              <td class="p-4 text-slate-500">${a.id}</td>
                              <td class="p-4 font-bold text-slate-900 font-sans text-xs">${a.event}</td>
                              <td class="p-4 font-sans text-xs">${a.actor}</td>
                              <td class="p-4 text-indigo-600 font-bold">${a.hash}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ` : ''}

                <!-- Tab 5: Intelligent AI Operator inside Shell tab -->
                ${state.activeTab === 'ai' ? `
                  <div class="max-w-3xl mx-auto space-y-6">
                    <div>
                      <h3 class="text-xl font-bold text-slate-900 text-center font-sans">JUMO AI Gateway Operator</h3>
                      <p class="text-xs text-slate-500 mt-1 text-center font-semibold">Formulate queries to generate audited synthesis logs, check compliance maps, or direct API instructions.</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-6 font-semibold">
                      <form onsubmit="askAi(event, 'shell-ai-prompt', 'aiResponse')" class="space-y-4">
                        <textarea id="shell-ai-prompt" rows="3" placeholder="e.g. Generate a compliance check log comparing the FAAP Treasury ledger against the AEGIS Zero-Trust security kernel." required class="w-full p-4 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-slate-50 font-semibold"></textarea>
                        <div class="text-right">
                          <button type="submit" class="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-indigo-700 transition cursor-pointer font-sans">Process AI query</button>
                        </div>
                      </form>
                      ${state.aiResponse ? `
                        <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                          <p class="text-[10px] font-mono text-indigo-600 uppercase font-bold tracking-wider mb-2">Resolved System Insights Output:</p>
                          <p class="text-xs text-slate-700 leading-relaxed">${state.aiResponse}</p>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                ` : ''}
              </main>
            </div>
          </div>
        `;
};
