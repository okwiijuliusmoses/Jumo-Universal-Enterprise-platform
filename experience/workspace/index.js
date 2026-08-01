import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";
import { DIGITAL_FORMS_CATALOGUE } from "../erp/runtimeEngine.js";

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
            <button onclick="state.activeWorkspaceTab='org'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeWorkspaceTab==='org'||!state.activeWorkspaceTab?'bg-enterprise-blue text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>🏢 Organization Scope</span>
            </button>
            <button onclick="state.activeWorkspaceTab='dept'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeWorkspaceTab==='dept'?'bg-enterprise-blue text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>⚙️ Department Scope</span>
            </button>
            <button onclick="state.activeWorkspaceTab='sacco'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeWorkspaceTab==='sacco'?'bg-emerald-600 text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>ERP Services Portal</span>
            </button>
            <button onclick="state.activeWorkspaceTab='forms'; render();" class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${state.activeWorkspaceTab==='forms'?'bg-enterprise-blue text-white':'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}">
              <span>📝 Digital Forms Engine</span>
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
                <h3 class="text-xl font-bold text-slate-900 font-sans">${state.session?.organization || "Resolved Enterprise Workspace"}</h3>
                <p class="text-xs text-slate-600 mt-2 leading-relaxed">${state.session?.activeErpTemplate?.description || 'Active institutional ERP runtime environment.'}</p>
              </div>

              <!-- ERP Governance Portals -->
              ${state.session?.activeErpTemplate ? `
                <div class="space-y-4">
                  <h4 class="font-bold text-sm text-slate-900">Enterprise Application Registry</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${(state.session.activeErpTemplate.applications || []).map(p => `
                      <div class="bg-white border border-slate-200 p-5 rounded-xl hover:border-enterprise-blue transition space-y-2">
                        <h5 class="font-extrabold text-slate-900 text-xs">${p.name}</h5>
                        <p class="text-[11px] text-slate-500 leading-relaxed">${p.desc}</p>
                        <button onclick="alert('Accessing ${p.name} portal...');" class="px-3 py-1.5 bg-enterprise-blue hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition cursor-pointer">Open Portal</button>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="space-y-4 pt-4">
                  <h4 class="font-bold text-sm text-slate-900">Installed Enterprise Modules</h4>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${(state.session.activeErpTemplate.modules || []).map(m => `
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

          <!-- Workspace Portal View (FAAP & Digital Pay Integrated) -->
          ${state.activeWorkspaceTab === 'sacco' ? `
            <div class="space-y-6 font-semibold">
              <div class="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-mono uppercase font-bold tracking-wider">
                    <span>🏦 Enterprise Financial Services</span>
                  </div>
                  <h3 class="text-xl font-extrabold font-sans">${state.session?.organization || "Resolved Enterprise Workspace"} Workspace</h3>
                  <p class="text-xs text-slate-300">Savings, shares, dividend clearing, and instant FAAP-backed loan disbursements for institutional staff.</p>
                </div>
                <button onclick="document.getElementById('sacco-loan-modal').classList.remove('hidden');" class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md">
                  + Apply for SACCO Loan
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div class="p-5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
                  <span class="text-slate-400 font-bold uppercase text-[10px]">Total SACCO Capital Reserve</span>
                  <p class="text-xl font-extrabold text-emerald-700 font-mono">$${(state.saccoReserve || 450000).toLocaleString()}</p>
                  <p class="text-[10px] text-slate-500">FAAP Wallet: 0x8F2A...E991</p>
                </div>
                <div class="p-5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
                  <span class="text-slate-400 font-bold uppercase text-[10px]">Registered Staff Members</span>
                  <p class="text-xl font-extrabold text-slate-900 font-mono">1,240 Staff</p>
                  <p class="text-[10px] text-emerald-600 font-bold">100% Active Payroll Opt-in</p>
                </div>
                <div class="p-5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
                  <span class="text-slate-400 font-bold uppercase text-[10px]">Active Loan Portfolio</span>
                  <p class="text-xl font-extrabold text-blue-700 font-mono">$185,000</p>
                  <p class="text-[10px] text-slate-500">14 Loans Outstanding</p>
                </div>
                <div class="p-5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
                  <span class="text-slate-400 font-bold uppercase text-[10px]">Annual Dividend Rate</span>
                  <p class="text-xl font-extrabold text-emerald-600 font-mono">12.5% p.a.</p>
                  <p class="text-[10px] text-slate-500">Cleared Bi-annually via FAAP</p>
                </div>
              </div>

              <!-- SACCO Loan Application Modal -->
              <div id="sacco-loan-modal" class="hidden fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div class="bg-white max-w-lg w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-slate-200">
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 class="font-extrabold text-slate-900 text-sm">Submit Workspace Loan Application</h4>
                    <button onclick="document.getElementById('sacco-loan-modal').classList.add('hidden');" class="text-slate-400 hover:text-slate-600 font-bold text-lg">&times;</button>
                  </div>
                  <form onsubmit="handleSaccoLoanSubmit(event)" class="space-y-4 text-xs font-semibold">
                    <div>
                      <label class="block text-slate-700 mb-1">Applicant Staff Member</label>
                      <input type="text" id="loan-applicant" value="${state.session?.user?.name || 'Dr. Sarah Namubiru'}" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    </div>
                    <div>
                      <label class="block text-slate-700 mb-1">Loan Category</label>
                      <select id="loan-category" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <option value="Development & Construction">Development & Construction</option>
                        <option value="School Fees & Education">School Fees & Education</option>
                        <option value="Emergency Medical">Emergency Medical</option>
                        <option value="Asset Financing">Asset Financing</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-slate-700 mb-1">Requested Loan Amount ($ USD)</label>
                      <input type="number" id="loan-amount" placeholder="e.g. 10000" min="500" max="50000" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold">
                    </div>
                    <div>
                      <label class="block text-slate-700 mb-1">Repayment Tenure (Months)</label>
                      <select id="loan-tenure" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <option value="12">12 Months (1 Year)</option>
                        <option value="24">24 Months (2 Years)</option>
                        <option value="36">36 Months (3 Years)</option>
                      </select>
                    </div>
                    <div class="pt-2 flex items-center justify-end gap-2">
                      <button type="button" onclick="document.getElementById('sacco-loan-modal').classList.add('hidden');" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Cancel</button>
                      <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold">Submit to Credit Committee &rarr;</button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Active SACCO Loans Ledger -->
              <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 class="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Active Workflow Applications</h4>
                  <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold rounded">Approval DAG: Active</span>
                </div>
                <div class="space-y-2 text-xs font-mono">
                  ${(state.saccoLoans || [
                    { id: "LOAN-101", applicant: "Dr. Sarah Namubiru", amount: "$15,000", purpose: "Development & Construction", status: "APPROVED", date: "2026-06-12" },
                    { id: "LOAN-102", applicant: "Prof. John Mukasa", amount: "$8,000", purpose: "School Fees & Education", status: "PENDING", date: "2026-07-28" }
                  ]).map(loan => `
                    <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p class="font-bold text-slate-900 font-sans">${loan.applicant}</p>
                        <p class="text-[10px] text-slate-500">${loan.id} &bull; ${loan.purpose} &bull; ${loan.date}</p>
                      </div>
                      <div class="flex items-center gap-4">
                        <span class="font-bold text-emerald-700 text-sm">${loan.amount}</span>
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${loan.status==='APPROVED'?'bg-emerald-100 text-emerald-800':'bg-amber-100 text-amber-800'}">${loan.status}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Digital Forms Engine View -->
          ${state.activeWorkspaceTab === 'forms' ? `
            <div class="space-y-6 font-semibold">
              <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-2">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-blue-50 text-enterprise-blue font-mono text-[10px] font-bold rounded-full">Digital Forms Catalogue</span>
                  <span class="text-xs font-mono text-slate-400">${DIGITAL_FORMS_CATALOGUE.length} Enterprise Forms</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900 font-sans">Institutional Digital Forms & Approval Workflows</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Fill, submit, route, and digitally sign enterprise forms across admissions, HR, procurement, finance, SACCO, and governance.</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${DIGITAL_FORMS_CATALOGUE.map(form => `
                  <div class="bg-white border border-slate-200 p-5 rounded-xl space-y-3 hover:border-enterprise-blue transition">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">${form.category}</span>
                      <span class="px-2 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] font-bold rounded">${form.id}</span>
                    </div>
                    <h4 class="font-extrabold text-slate-900 text-sm font-sans">${form.name}</h4>
                    <div class="space-y-1 text-[11px] text-slate-500">
                      <p><span class="font-bold text-slate-700">Fields:</span> ${form.fields.join(', ')}</p>
                      <p><span class="font-bold text-slate-700">Approval Route:</span> ${form.approvalPath.join(' → ')}</p>
                    </div>
                    <button onclick="window.openFormModal('${form.id}')" class="w-full py-2 bg-enterprise-blue hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition cursor-pointer">Open & Fill Form &rarr;</button>
                  </div>
                `).join('')}
              </div>

              <!-- Form Filling Modal Container -->
              <div id="digital-form-modal" class="hidden fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div id="digital-form-modal-content" class="bg-white max-w-xl w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
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

window.handleSaccoLoanSubmit = function(e) {
  e.preventDefault();
  const applicant = document.getElementById("loan-applicant")?.value || "Staff Member";
  const category = document.getElementById("loan-category")?.value || "Development";
  const amountVal = document.getElementById("loan-amount")?.value || "5000";
  const amount = `$${parseInt(amountVal).toLocaleString()}`;
  
  if (!window.state.saccoLoans) {
    window.state.saccoLoans = [
      { id: "LOAN-101", applicant: "Dr. Sarah Namubiru", amount: "$15,000", purpose: "Development & Construction", status: "APPROVED", date: "2026-06-12" },
      { id: "LOAN-102", applicant: "Prof. John Mukasa", amount: "$8,000", purpose: "School Fees & Education", status: "PENDING", date: "2026-07-28" }
    ];
  }

  const newLoan = {
    id: `LOAN-${Math.floor(100 + Math.random() * 900)}`,
    applicant,
    amount,
    purpose: category,
    status: "PENDING",
    date: new Date().toISOString().split('T')[0]
  };

  window.state.saccoLoans.unshift(newLoan);
  alert(`SACCO Loan application ${newLoan.id} for ${newLoan.applicant} submitted successfully to the Credit Committee!`);
  const modal = document.getElementById("sacco-loan-modal");
  if (modal) modal.classList.add("hidden");
  window.render();
};

window.openFormModal = function(formId) {
  const form = DIGITAL_FORMS_CATALOGUE.find(f => f.id === formId);
  if (!form) return;

  const modal = document.getElementById("digital-form-modal");
  const modalContent = document.getElementById("digital-form-modal-content");
  if (!modal || !modalContent) return;

  const fieldsHtml = form.fields.map((field, idx) => `
    <div>
      <label class="block text-slate-700 font-bold mb-1.5">${field}</label>
      <input type="text" id="form-field-${idx}" placeholder="Enter ${field}..." required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-enterprise-blue">
    </div>
  `).join('');

  modalContent.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-slate-100">
      <div>
        <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">${form.category}</span>
        <h4 class="font-extrabold text-slate-900 text-sm font-sans">${form.name}</h4>
      </div>
      <button onclick="document.getElementById('digital-form-modal').classList.add('hidden');" class="text-slate-400 hover:text-slate-600 font-bold text-lg">&times;</button>
    </div>
    <form onsubmit="window.submitDigitalForm(event, '${form.id}')" class="space-y-4 text-xs font-semibold">
      ${fieldsHtml}
      <div class="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-slate-600">
        <p class="font-bold text-enterprise-blue">Approval Pathway:</p>
        <p class="text-slate-500 font-mono text-[10px]">${form.approvalPath.join(' → ')}</p>
      </div>
      <div class="pt-2 flex items-center justify-end gap-2">
        <button type="button" onclick="document.getElementById('digital-form-modal').classList.add('hidden');" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-enterprise-blue hover:bg-blue-700 text-white rounded-xl font-bold">Submit Form & Sign &rarr;</button>
      </div>
    </form>
  `;

  modal.classList.remove("hidden");
};

window.submitDigitalForm = function(e, formId) {
  e.preventDefault();
  const form = DIGITAL_FORMS_CATALOGUE.find(f => f.id === formId);
  alert(`Digital Form "${form?.name || formId}" has been signed cryptographically and submitted to ${form?.approvalPath[0] || 'Approver'}!`);
  const modal = document.getElementById("digital-form-modal");
  if (modal) modal.classList.add("hidden");
};
