import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";
import { DIGITAL_FORMS_CATALOGUE } from "../erp/runtimeEngine.js";

// Initialize missing state variables on load to ensure smooth execution
const initializeWorkspaceState = (state) => {
  if (!state.activeWorkspaceTab) state.activeWorkspaceTab = 'org';
  if (!state.activePortalTab) state.activePortalTab = 'modules';
  if (!state.portalActionLogs) state.portalActionLogs = [];
  if (!state.portalAuths) state.portalAuths = {};
  if (!state.pendingPortalAuth) state.pendingPortalAuth = null;
  if (!state.faapTransactions) {
    state.faapTransactions = [
      { id: "TX-99081", type: "FAAP Treasury Transfer", amount: "$150,000", status: "CONFIRMED", timestamp: "2026-05-18 10:14:02" },
      { id: "TX-99082", type: "Global Vendor Settle", amount: "$42,500", status: "CONFIRMED", timestamp: "2026-05-18 11:02:18" }
    ];
  }
  if (!state.saccoLoans) {
    state.saccoLoans = [
      { id: "LOAN-101", applicant: "Dr. Sarah Namubiru", amount: "$15,000", purpose: "Development & Construction", status: "APPROVED", date: "2026-06-12" },
      { id: "LOAN-102", applicant: "Prof. John Mukasa", amount: "$8,000", purpose: "School Fees & Education", status: "PENDING", date: "2026-07-28" }
    ];
  }
  if (!state.submittedForms) {
    state.submittedForms = [
      {
        id: "SUB-8291",
        formId: "form-proc-req",
        formName: "Institutional Procurement & Supply Requisition",
        applicant: "Dr. Sarah Namubiru",
        submittedAt: "2026-07-29 09:12:00",
        fields: { "Requisition Title": "High-Performance Compute Cluster Nodes", "Department Code & Cost Center": "CS-01", "Item Technical Specifications": "8x GPU cluster for AI workflows", "Quantity Required": "2", "Estimated Cost ($ USD)": "25,000" },
        status: "PENDING",
        signature: "0x82FA49...9E10",
        history: [
          { step: "Submission", user: "Dr. Sarah Namubiru", date: "2026-07-29 09:12:00", action: "Submitted", comment: "Essential equipment for deep learning lab." }
        ]
      }
    ];
  }
  if (!state.activePersona) state.activePersona = 'admin'; // Default is all-access Admin
  if (!state.navigationHistory) {
    state.navigationHistory = [{ tab: 'org', portalId: null }];
    state.navigationHistoryIndex = 0;
  }
  if (!state.favorites) state.favorites = [];
  if (!state.searchQuery) state.searchQuery = '';
  if (!state.jumoChatOpen) state.jumoChatOpen = false;
  if (!state.jumoChatMessages) {
    state.jumoChatMessages = [
      { sender: 'ai', text: `Welcome! I am the JUMO Front Desk Assistant. I can help you discover available public services, locate the correct institutional portal, and assist with general enquiries like admissions and registration. I cannot access or disclose internal institutional records. How can I help you today?` }
    ];
  }
};

export const workspaceTemplate = (state) => {
  initializeWorkspaceState(state);
  const runtimeEngine = window.erpRuntimeEngine || state.runtimeEngine;

  const activeErp = state.session?.activeErpInstance;

  const erpStructure = activeErp?.structure || {
    portals: [],
    departments: [],
    modules: [],
    components: [],
    workflows: []
  };

  const institution = state.deployedInstitution || {
    name: activeErp?.name || "Enterprise Platform",
    portals: erpStructure.portals
  };

  const portals = erpStructure.portals || [];

  institution.portals = portals;
  
  if (!state.activePortalId) {
    // Redirect to gateway to pick a portal
    setTimeout(() => window.navigate('/gateway'), 0);
    return;
  }
  
  const authPortal = portals.find(p => p.id === state.activePortalId) || { id: state.activePortalId, name: state.activePortalId, desc: "Sovereign Enterprise Portal" };
  const isAuth = state.portalAuths[authPortal.id];
  
  if (!isAuth) {
    // Portal Login View (No sidebars, no forms, secure auth only)
    app.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <div class="bg-slate-900 p-8 text-center border-b border-slate-800">
             ${getOfficialLogoHtml({ size: "lg", textColor: "light" })}
          </div>
          <div class="p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">${authPortal.name}</h2>
            <p class="text-sm text-slate-500 mb-6">${authPortal.desc}</p>
            <form onsubmit="event.preventDefault(); window.submitPortalLogin(event, '${authPortal.id}', '${authPortal.name}')" class="space-y-4">
               <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Portal Access Identity</label>
                  <input type="text" id="portal-user" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent font-medium" placeholder="Staff ID or Email" required>
               </div>
               <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Zero Trust Credentials</label>
                  <input type="password" id="portal-pass" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent font-mono" placeholder="••••••••" required>
               </div>
               <button type="submit" class="w-full bg-enterprise-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all mt-6 text-sm tracking-wide">AUTHENTICATE & ENTER</button>
               <button type="button" onclick="window.navigate('/gateway')" class="w-full bg-white text-slate-600 hover:text-slate-900 font-bold py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-all mt-3 text-sm">CANCEL</button>
            </form>
          </div>
        </div>
      </div>
    `;
    return;
  }
  
  // Portal Runtime Workspace
  const user = state.session?.user || { name: "Authorized User", role: "Portal Administrator", email: "user@enterprise.com" };
  const forms = DIGITAL_FORMS_CATALOGUE[state.activePortalId] || [];
  
  const activePortal = erpStructure.portals.find(
    p => p.id === state.activePortalId
) || erpStructure.portals[0] || {
    id: "portal-not-configured",
    name: "Portal Configuration Required",
    departments: [],
    modules: [],
    components: [],
    workflows: []
};
  
  const currentView = state.activePortalTab || 'modules';
  
  // Group modules by category
  const modulesByCategory = {};
  (activePortal.modules || []).forEach(mod => {
    if (!modulesByCategory[mod.category]) {
      modulesByCategory[mod.category] = [];
    }
    modulesByCategory[mod.category].push(mod);
  });

  const selectedModule = (activePortal.modules || []).find(m => m.id === state.activeModuleId);
  if (!state.activeComponentId) state.activeComponentId = 'dashboard';

  app.innerHTML = `
    <div class="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      <!-- Horizontal Enterprise Navigation -->
      <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-6">
              <button onclick="window.navigate('/gateway')" class="text-slate-400 hover:text-white transition cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              </button>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                  <h1 class="text-white font-bold text-sm tracking-wide">${activePortal.name}</h1>
                  <p class="text-emerald-400 text-[10px] font-mono tracking-widest uppercase">Secure Enterprise Workspace</p>
                </div>
              </div>
            </div>
            
            <nav class="hidden md:flex space-x-1">
              <button onclick="state.activeModuleId = null; window.switchPortalTab('modules')" class="px-4 py-2 rounded-md text-sm font-medium ${currentView === 'modules' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition cursor-pointer">Modules</button>
              <button onclick="window.switchPortalTab('forms')" class="px-4 py-2 rounded-md text-sm font-medium ${currentView === 'forms' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition cursor-pointer">Digital Forms</button>
              <button onclick="window.switchPortalTab('workflows')" class="px-4 py-2 rounded-md text-sm font-medium ${currentView === 'workflows' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition cursor-pointer">Workflows</button>
              <button onclick="window.switchPortalTab('records')" class="px-4 py-2 rounded-md text-sm font-medium ${currentView === 'records' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition cursor-pointer">Security Ledger</button>
            </nav>
            
            <div class="flex items-center gap-4">
              <span class="text-xs text-slate-400 font-medium">Tenant ID: <strong class="text-emerald-400 font-mono">${activeErp?.tenantId || 'tenant-001'}</strong></span>
              <div class="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 text-white font-bold text-xs cursor-pointer">
                ${user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Main Content Area -->
      <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        ${currentView === 'modules' ? `
          ${!selectedModule ? `
            <!-- High-Density Registry-Driven Modules Catalog -->
            <div class="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 mb-1">Operational Module Directory</h2>
                <p class="text-sm text-slate-500">Programmatic directory containing 100 fully validated operational modules for ${activePortal.name}.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-full font-mono text-xs font-bold">100 Modules Registered</span>
                <span class="px-3 py-1 bg-blue-500/10 text-blue-700 border border-blue-500/20 rounded-full font-mono text-xs font-bold">UEOS-DRIVEN</span>
              </div>
            </div>

            <!-- Categories Grid -->
            <div class="space-y-8">
              ${Object.entries(modulesByCategory).map(([catName, modsList]) => `
                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div class="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 class="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      ${catName}
                    </h3>
                    <span class="text-xs font-bold text-slate-500 bg-slate-200/60 px-2.5 py-0.5 rounded-full">${modsList.length} Modules</span>
                  </div>
                  <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    ${modsList.map(mod => `
                      <div onclick="window.state.activeModuleId='${mod.id}'; window.state.activeComponentId='dashboard'; window.render();" class="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/10 transition duration-150 cursor-pointer flex flex-col justify-between h-[130px] group">
                        <div>
                          <div class="flex items-center justify-between mb-1.5">
                            <span class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide bg-slate-200/50 px-1.5 py-0.5 rounded">${mod.categoryPrefix}</span>
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          </div>
                          <h4 class="font-bold text-xs text-slate-800 leading-snug group-hover:text-emerald-700 transition duration-150">${mod.name.split(' - ')[1] || mod.name}</h4>
                        </div>
                        <div class="flex items-center justify-between border-t border-slate-200/60 pt-2 text-[10px] text-slate-400 font-medium">
                          <span>${mod.components?.length || 0} Components</span>
                          <span class="text-emerald-600 font-bold group-hover:translate-x-0.5 transition duration-150">Open &rarr;</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <!-- MODULE WORKSPACE EXPLORER PANEL -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
              <!-- Header Block -->
              <div class="bg-slate-900 text-white p-8 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div class="space-y-2">
                  <button onclick="window.state.activeModuleId = null; window.render();" class="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer">
                    &larr; Back to Operational Directory
                  </button>
                  <div class="flex items-center gap-3">
                    <span class="px-3 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold rounded-full">${selectedModule.category}</span>
                    <span class="px-3 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px] font-bold rounded-full">${selectedModule.id}</span>
                  </div>
                  <h2 class="text-2xl font-extrabold tracking-tight">${selectedModule.name}</h2>
                  <p class="text-xs text-slate-400">Owner: <strong class="text-white">${selectedModule.owner}</strong> | Access Level: <span class="text-red-400 font-mono font-bold">${selectedModule.dataAccessPolicy}</span></p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-1.5">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Fully Operational
                  </span>
                </div>
              </div>

              <!-- Workspace Sub-navigation (18 Components unified into 6 primary operational controllers) -->
              <div class="bg-slate-50 border-b border-slate-200 px-8 py-3 flex flex-wrap gap-2">
                <button onclick="window.state.activeComponentId='dashboard'; window.render();" class="px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${state.activeComponentId==='dashboard'?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-200'}" id="comp-tab-dashboard">📊 Dashboard Metrics</button>
                <button onclick="window.state.activeComponentId='registry'; window.render();" class="px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${state.activeComponentId==='registry'?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-200'}" id="comp-tab-registry">🗃️ Master Registry</button>
                <button onclick="window.state.activeComponentId='forms'; window.render();" class="px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${state.activeComponentId==='forms'?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-200'}" id="comp-tab-forms">📝 Digital Form Console</button>
                <button onclick="window.state.activeComponentId='workflow'; window.render();" class="px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${state.activeComponentId==='workflow'?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-200'}" id="comp-tab-workflow">🔄 Approval Workflows</button>
                <button onclick="window.state.activeComponentId='security'; window.render();" class="px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${state.activeComponentId==='security'?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-200'}" id="comp-tab-security">🔐 AEGIS Ledger Logs</button>
                <button onclick="window.state.activeComponentId='ai'; window.render();" class="px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${state.activeComponentId==='ai'?'bg-slate-900 text-white':'text-slate-600 hover:bg-slate-200'}" id="comp-tab-ai">🤖 Cognitive AI Auditor</button>
              </div>

              <!-- Operational Controller Canvas -->
              <div class="p-8">
                ${state.activeComponentId === 'dashboard' ? `
                  <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">SLA SLA Compliance</span>
                        <h4 class="text-3xl font-extrabold text-slate-900 mt-1">98.4%</h4>
                        <p class="text-xs text-emerald-600 mt-1">&bull; Target SLA exceeded by 1.4%</p>
                      </div>
                      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">Registered Records</span>
                        <h4 class="text-3xl font-extrabold text-slate-900 mt-1">14,290</h4>
                        <p class="text-xs text-slate-500 mt-1">&bull; Secure biometric ledger</p>
                      </div>
                      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">Pending Approvals</span>
                        <h4 class="text-3xl font-extrabold text-slate-900 mt-1">1 Queue</h4>
                        <p class="text-xs text-amber-600 mt-1">&bull; Standard approval routing</p>
                      </div>
                      <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">AEGIS Ledger Status</span>
                        <h4 class="text-3xl font-extrabold text-emerald-600 mt-1">SECURED</h4>
                        <p class="text-xs text-slate-500 mt-1">&bull; Block key: verified</p>
                      </div>
                    </div>

                    <div class="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800">
                      <h3 class="font-bold text-sm mb-3">Modular Registry Capabilities (${selectedModule.components.length} Active Components)</h3>
                      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-[10px] font-mono text-slate-400">
                        ${selectedModule.components.map(comp => `
                          <div class="p-3.5 bg-slate-800/50 border border-slate-800 rounded-xl flex items-center gap-2">
                            <span class="text-emerald-400">&bull;</span>
                            <span class="truncate">${comp}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                ` : ''}

                ${state.activeComponentId === 'registry' ? `
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <h3 class="font-extrabold text-slate-900 text-base">Module Active Master Registry</h3>
                      <span class="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-bold rounded-lg">Operational Access Approved</span>
                    </div>
                    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <table class="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr class="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-slate-500 font-bold font-mono">
                            <th class="p-4">Record Identifier</th>
                            <th class="p-4">Asset Type</th>
                            <th class="p-4">SLA Owner</th>
                            <th class="p-4">Authorization</th>
                            <th class="p-4">Audit Trace</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-medium">
                          <tr class="hover:bg-slate-50">
                            <td class="p-4 font-mono font-bold text-slate-900">REC-M01-0982</td>
                            <td class="p-4">General Operational Ledger</td>
                            <td class="p-4">${selectedModule.officerRole}</td>
                            <td class="p-4"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">VERIFIED</span></td>
                            <td class="p-4 font-mono text-slate-400">0xAEF91...2A</td>
                          </tr>
                          <tr class="hover:bg-slate-50">
                            <td class="p-4 font-mono font-bold text-slate-900">REC-M01-0983</td>
                            <td class="p-4">Regulatory Standard Ledger</td>
                            <td class="p-4">${selectedModule.approvalAuthority}</td>
                            <td class="p-4"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">VERIFIED</span></td>
                            <td class="p-4 font-mono text-slate-400">0xAEF92...9B</td>
                          </tr>
                          <tr class="hover:bg-slate-50">
                            <td class="p-4 font-mono font-bold text-slate-900">REC-M01-0984</td>
                            <td class="p-4">SLA Compliance Baseline</td>
                            <td class="p-4">${selectedModule.officerRole}</td>
                            <td class="p-4"><span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold">PENDING AUDIT</span></td>
                            <td class="p-4 font-mono text-slate-400">0xAEF93...4C</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ` : ''}

                ${state.activeComponentId === 'forms' ? `
                  <div class="max-w-2xl mx-auto space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <div>
                      <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">${selectedModule.category} Form Node</span>
                      <h3 class="font-extrabold text-slate-900 text-lg mt-1">Digital Clearance & Requisition Form</h3>
                      <p class="text-xs text-slate-500 mt-1">Submit signed requisitions to the portal clearance workflow.</p>
                    </div>

                    <form onsubmit="window.submitDigitalForm(event, 'form-${state.activePortalId}-requisition')" class="space-y-4 text-xs font-semibold">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-slate-700 font-bold mb-1.5">Applicant Full Name</label>
                          <input type="text" id="form-applicant-name" value="${user.name}" required class="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800">
                        </div>
                        <div>
                          <label class="block text-slate-700 font-bold mb-1.5">Applicant Identification Code</label>
                          <input type="text" id="form-applicant-id" placeholder="e.g. CM82910-U" value="UEOS-STAFF-982" required class="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800">
                        </div>
                      </div>

                      <!-- Contextual Registry Fields -->
                      <div class="space-y-4">
                        <div>
                          <label class="block text-slate-700 font-bold mb-1.5">Cost Center Allocation</label>
                          <input type="text" id="form-field-0" value="${selectedModule.owner}" required class="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800">
                        </div>
                        <div>
                          <label class="block text-slate-700 font-bold mb-1.5">Line Item Description</label>
                          <input type="text" id="form-field-1" value="Administrative logistics backing for ${selectedModule.name}" required class="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label class="block text-slate-700 font-bold mb-1.5">Target Delivery Date</label>
                            <input type="text" id="form-field-2" value="2026-09-01" required class="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800">
                          </div>
                          <div>
                            <label class="block text-slate-700 font-bold mb-1.5">Asset Quantity Requirement</label>
                            <input type="text" id="form-field-3" value="1 Unit" required class="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800">
                          </div>
                          <div>
                            <label class="block text-slate-700 font-bold mb-1.5">Budget Threshold ($ USD)</label>
                            <input type="text" id="form-field-4" value="$ 45,000" required class="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800">
                          </div>
                        </div>
                      </div>

                      <!-- Document Dropzone -->
                      <div class="space-y-2">
                        <label class="block text-slate-700 font-bold">Supporting Document Attachments</label>
                        <div id="file-dropzone" ondragover="window.handleDragOver(event)" ondrop="window.handleFileDrop(event)" class="border-2 border-dashed border-slate-200 p-6 rounded-xl text-center bg-white hover:border-emerald-500 transition duration-150 cursor-pointer">
                          <p class="text-xs text-slate-600">Drag files here or click below to simulate upload</p>
                          <input type="file" class="hidden" id="form-file-attachment" onchange="window.handleManualFileUpload(event)">
                          <button type="button" onclick="document.getElementById('form-file-attachment').click()" class="mt-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px]">Browse Local Directory</button>
                        </div>
                        ${(state.uploadedFiles || []).length > 0 ? `
                          <div class="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Validated Uploads:</p>
                            ${state.uploadedFiles.map(file => `
                              <div class="flex items-center justify-between text-[11px] font-mono">
                                <span class="text-slate-700 font-semibold">${file.name} (${file.size})</span>
                                <span class="text-emerald-600 font-bold">${file.hash}</span>
                              </div>
                            `).join('')}
                          </div>
                        ` : ''}
                      </div>

                      <!-- Signature Pad -->
                      <div class="space-y-2">
                        <p class="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-200 pb-1">Cryptographic Signature Signoff</p>
                        <div class="bg-white border border-slate-200 p-4 rounded-xl">
                          <label class="block text-slate-600 mb-1.5">Type Cryptographic Authorization Code</label>
                          <input type="text" id="form-sig-text" placeholder="e.g. /${user.name}/" value="/${user.name}/" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-[11px] font-mono font-bold">
                        </div>
                      </div>

                      <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-slate-600">
                        <p class="font-bold text-emerald-800">Clearance Route Escalation Map:</p>
                        <p class="text-slate-500 font-mono text-[10px] mt-1">${selectedModule.workflow}</p>
                      </div>

                      <div class="pt-2 flex items-center justify-end gap-2">
                        <button type="submit" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition">Sign & Submit Requisition</button>
                      </div>
                    </form>
                  </div>
                ` : ''}

                ${state.activeComponentId === 'workflow' ? `
                  <div class="space-y-6">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="font-extrabold text-slate-900 text-base">Module Active Approval Queue</h3>
                        <p class="text-xs text-slate-500">Approve, reject, or escalate pending modular requisitions.</p>
                      </div>
                      <span class="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-mono text-xs font-bold rounded-lg border border-emerald-100">Live Workflow Engine Active</span>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <table class="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr class="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 font-mono uppercase tracking-wide">
                            <th class="p-4">Submission ID</th>
                            <th class="p-4">Originator</th>
                            <th class="p-4">Workflow Target</th>
                            <th class="p-4">Signed Stamp</th>
                            <th class="p-4">Workflow Status</th>
                            <th class="p-4 text-right">Approval Decisions</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-medium">
                          ${(state.submittedForms || []).map(sf => `
                            <tr class="hover:bg-slate-50">
                              <td class="p-4 font-mono font-bold text-slate-900">${sf.id}</td>
                              <td class="p-4 text-slate-700">${sf.applicant}</td>
                              <td class="p-4 text-slate-600">${sf.formName}</td>
                              <td class="p-4 font-mono text-slate-500">${sf.signature}</td>
                              <td class="p-4">
                                <span class="px-2.5 py-0.5 rounded font-bold uppercase text-[9px] tracking-wider
                                  ${sf.status === 'PENDING' ? 'bg-amber-100 text-amber-800 border border-amber-200' : ''}
                                  ${sf.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : ''}
                                  ${sf.status === 'ESCALATED' ? 'bg-blue-100 text-blue-800 border border-blue-200' : ''}
                                  ${sf.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-200' : ''}
                                ">
                                  ${sf.status}
                                </span>
                              </td>
                              <td class="p-4 text-right space-x-1">
                                ${sf.status === 'PENDING' ? `
                                  <button onclick="window.executeWorkflowAction('${sf.id}', 'APPROVED')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition cursor-pointer text-[10px]">Approve</button>
                                  <button onclick="window.executeWorkflowAction('${sf.id}', 'REJECTED')" class="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition cursor-pointer text-[10px]">Reject</button>
                                ` : `
                                  <span class="text-slate-400 font-mono text-[10px]">Closed Log Entry</span>
                                `}
                              </td>
                            </tr>
                          `).join('')}
                          <tr class="hover:bg-slate-50">
                            <td class="p-4 font-mono font-bold text-slate-900">SUB-WF-9082</td>
                            <td class="p-4 text-slate-700">Audit Desk Officer</td>
                            <td class="p-4 text-slate-600">Quarterly SLA Compliance Attestation</td>
                            <td class="p-4 font-mono text-slate-500">0xAEF289B0C12A</td>
                            <td class="p-4">
                              <span class="px-2.5 py-0.5 rounded font-bold uppercase text-[9px] tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                                APPROVED
                              </span>
                            </td>
                            <td class="p-4 text-right">
                              <span class="text-slate-400 font-mono text-[10px]">Closed Log Entry</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ` : ''}

                ${state.activeComponentId === 'security' ? `
                  <div class="space-y-6">
                    <div class="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <h3 class="font-extrabold text-slate-900 text-base">Immutable AEGIS Cryptographic Ledger</h3>
                        <p class="text-xs text-slate-500">Auditable blockchain blocks protecting transactional entries from tamper operations.</p>
                      </div>
                      <button onclick="window.triggerAegisSystemBackup()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm transition">Generate Immutable Snapshot</button>
                    </div>

                    <!-- Ledger Log block list -->
                    <div class="space-y-4">
                      <div class="p-5 bg-slate-900 text-slate-300 font-mono text-xs rounded-2xl border border-slate-800 space-y-3 shadow-inner">
                        <div class="flex items-center justify-between text-emerald-400 border-b border-slate-800 pb-2">
                          <span class="font-bold uppercase text-[10px]">AEGIS Block Node: Connected</span>
                          <span>Chain Version: 2.1.8-Core</span>
                        </div>
                        <div class="space-y-2 text-slate-400">
                          ${(state.portalActionLogs || []).length > 0 
                            ? (state.portalActionLogs || []).map(log => `<div>${log}</div>`).join('')
                            : '<div>[SYSTEM] Zero transactional modifications recorded in active session memory.</div>'
                          }
                          <div>[12:14:02] Connected to AEGIS Consensus Engine. Validator Node ID: US-WEST-019. Status 200 OK.</div>
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[11px] text-slate-600">
                        <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                          <p class="font-bold text-slate-800 border-b pb-1">Block #128,910</p>
                          <p>Hash: <strong class="text-indigo-600">0x81FA...91CE</strong></p>
                          <p>Consensus: <span class="text-emerald-600">99.4% Agreed</span></p>
                          <p>Status: <span class="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded">IMMUTABLE</span></p>
                        </div>
                        <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                          <p class="font-bold text-slate-800 border-b pb-1">Block #128,911</p>
                          <p>Hash: <strong class="text-indigo-600">0x20BC...44EF</strong></p>
                          <p>Consensus: <span class="text-emerald-600">100% Agreed</span></p>
                          <p>Status: <span class="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded">IMMUTABLE</span></p>
                        </div>
                        <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                          <p class="font-bold text-slate-800 border-b pb-1">Block #128,912</p>
                          <p>Hash: <strong class="text-indigo-600">0xCB82...98A1</strong></p>
                          <p>Consensus: <span class="text-emerald-600">99.8% Agreed</span></p>
                          <p>Status: <span class="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded">IMMUTABLE</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ` : ''}

                ${state.activeComponentId === 'ai' ? `
                  <div class="space-y-6 max-w-2xl mx-auto">
                    <div>
                      <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Cognitive Systems</span>
                      <h3 class="font-extrabold text-slate-900 text-lg mt-1">JUMO Gemini Core Compliance Assistant</h3>
                      <p class="text-xs text-slate-500 mt-1">Audit active operations, scan rulebook alignment, and evaluate compliance thresholds.</p>
                    </div>

                    <div class="space-y-4">
                      <div class="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                        <label class="block text-slate-700 font-bold mb-2">Audit Inquiry Console</label>
                        <textarea id="portal-ai-query-area" placeholder="Ask Gemini to audit records or check regulatory limits e.g., 'Verify SLA threshold levels for current ledger entries'..." rows="4" class="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder-slate-400 leading-relaxed"></textarea>
                        
                        <div class="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-slate-200/60">
                          <div class="flex flex-wrap gap-1.5">
                            <button onclick="window.insertAiQueryPlaceholder('Audit transaction threshold limits')" class="px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-500 rounded-lg text-[10px] text-slate-600 font-bold transition">Audit Thresholds</button>
                            <button onclick="window.insertAiQueryPlaceholder('Verify SLA standards alignment for ledger')" class="px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-500 rounded-lg text-[10px] text-slate-600 font-bold transition">Verify SLAs</button>
                            <button onclick="window.insertAiQueryPlaceholder('Review access keys permissions policies')" class="px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-500 rounded-lg text-[10px] text-slate-600 font-bold transition">Review Policy Keys</button>
                          </div>
                          <button onclick="window.submitPortalAiQuery('${selectedModule.name}')" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm transition">Run Cognitive Audit</button>
                        </div>
                      </div>

                      <!-- AI Response Output -->
                      <div id="ai-response-container" class="hidden p-6 bg-indigo-50 border border-indigo-100 rounded-2xl text-xs text-slate-700 shadow-xs">
                        <!-- Filled Dynamically -->
                      </div>
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          `}
        ` : ''}
        
        ${currentView === 'forms' ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-1">Departmental Digital Forms</h2>
            <p class="text-sm text-slate-500">Initiate secure requisitions, credentials signoffs, and audits specific to this portal.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${(forms || []).map(form => `
              <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center group">
                <div class="space-y-1">
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9px] font-bold uppercase rounded">${form.category || 'Forms'}</span>
                  <h3 class="font-bold text-slate-900 text-sm">${form.title}</h3>
                  <p class="text-xs text-slate-500">${form.desc}</p>
                </div>
                <button onclick="window.state.activeModuleId='${activePortal.id}-MOD-003'; window.state.activeComponentId='forms'; window.state.activePortalTab='modules'; window.render();" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer">Open Form</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${currentView === 'workflows' ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-1">Active Workflow Execution Queues</h2>
            <p class="text-sm text-slate-500">Track and authorize multi-level clearings, escalations, and audit signoffs.</p>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider font-mono">
                  <th class="p-4">Submission ID</th>
                  <th class="p-4">Applicant</th>
                  <th class="p-4">Workflow Target</th>
                  <th class="p-4">Signed Stamp</th>
                  <th class="p-4">Workflow Status</th>
                  <th class="p-4 text-right">Approval Decisions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                ${(state.submittedForms || []).map(sf => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-4 font-mono font-bold text-slate-900">${sf.id}</td>
                    <td class="p-4 text-slate-700">${sf.applicant}</td>
                    <td class="p-4 text-slate-600">${sf.formName}</td>
                    <td class="p-4 font-mono text-slate-500">${sf.signature}</td>
                    <td class="p-4">
                      <span class="px-2.5 py-0.5 rounded font-bold uppercase text-[9px] tracking-wider
                        ${sf.status === 'PENDING' ? 'bg-amber-100 text-amber-800 border border-amber-200' : ''}
                        ${sf.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : ''}
                        ${sf.status === 'ESCALATED' ? 'bg-blue-100 text-blue-800 border border-blue-200' : ''}
                        ${sf.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-200' : ''}
                      ">
                        ${sf.status}
                      </span>
                    </td>
                    <td class="p-4 text-right space-x-1">
                      ${sf.status === 'PENDING' ? `
                        <button onclick="window.executeWorkflowAction('${sf.id}', 'APPROVED')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition cursor-pointer text-[10px]">Approve</button>
                        <button onclick="window.executeWorkflowAction('${sf.id}', 'REJECTED')" class="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition cursor-pointer text-[10px]">Reject</button>
                      ` : `
                        <span class="text-slate-400 font-mono text-[10px]">Closed Log Entry</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
                <tr class="hover:bg-slate-50">
                  <td class="p-4 font-mono font-bold text-slate-900">WF-8921-A</td>
                  <td class="p-4 text-slate-600">Operations Directorate</td>
                  <td class="p-4 text-slate-600">Quarterly SLA Compliance Audit</td>
                  <td class="p-4 font-mono text-slate-400">0x8A2C19EF90</td>
                  <td class="p-4"><span class="inline-flex px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[9px] font-bold uppercase tracking-wider">Pending You</span></td>
                  <td class="p-4 text-right"><button onclick="window.advanceWorkflow('WF-8921-A', 'Pending You')" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer">Advance Workflow &rarr;</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        ` : ''}
        
        ${currentView === 'records' ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-1">Immutable AEGIS Blockchain Security Node</h2>
            <p class="text-sm text-slate-500">Sovereign ledgers and tamper-proof session action logs for this portal.</p>
          </div>
          <div class="bg-slate-900 text-slate-300 rounded-2xl p-6 font-mono text-xs shadow-inner space-y-4">
            <div class="flex items-center justify-between pb-4 border-b border-slate-800">
              <span class="text-emerald-400 font-bold tracking-widest uppercase text-[10px]">AEGIS Secure Consensus Active</span>
              <button onclick="window.triggerAegisSystemBackup()" class="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer">Export Ledger Snapshot</button>
            </div>
            <div class="space-y-2 text-slate-400">
              ${(state.portalActionLogs || []).length > 0 
                ? (state.portalActionLogs || []).map(log => `<div>${log}</div>`).join('')
                : '<div>[SYSTEM] No recent immutable transactions recorded in this session.</div>'
              }
              <div>[12:14:02] Connected to AEGIS Consensus Engine. Validator Node ID: US-WEST-019. Status 200 OK.</div>
            </div>
          </div>
        ` : ''}
      </main>

      <!-- Floating JUMO Front Desk Assistant Chat Window -->
      <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        ${state.jumoChatOpen ? `
          <div id="public-ai-chat" class="mb-4 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden h-[450px]">
            <div class="bg-emerald-600 p-4 flex items-center justify-between text-white shadow-sm shrink-0">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  🤖
                </div>
                <div>
                  <h4 class="font-bold text-sm">JUMO Front Desk Assistant</h4>
                  <p class="text-[10px] text-emerald-100">JUMO Core Interop Active</p>
                </div>
              </div>
              <button onclick="window.toggleJumoChat()" class="text-white/80 hover:text-white transition p-1 cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div class="p-6 flex-1 overflow-y-auto bg-slate-50 text-xs space-y-4">
              ${(state.jumoChatMessages || []).map(msg => `
                <div class="flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}">
                  ${msg.sender !== 'user' ? `
                    <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs shadow-sm">🤖</div>
                  ` : ''}
                  <div class="p-4 rounded-xl border leading-relaxed shadow-xs max-w-[85%]
                    ${msg.sender === 'user' ? 'bg-emerald-600 text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'}
                  ">
                    ${msg.text}
                  </div>
                </div>
              `).join('')}
            </div>
            <form onsubmit="window.sendJumoChatMessage(event)" class="p-4 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
              <input type="text" id="jumo-chat-input" placeholder="Type your inquiry here..." required class="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50">
              <button type="submit" class="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition cursor-pointer shadow-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </form>
          </div>
        ` : ''}
        
        <!-- Floating Chat Button -->
        <button onclick="window.toggleJumoChat()" class="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:bg-emerald-700 transition hover:scale-105 active:scale-95 cursor-pointer relative group">
          <div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-lg">🤖</div>
        </button>
      </div>
    </div>
 
      <!-- Modals (e.g. Form Fill Modal) -->
      ${state.activeFormId ? `
        <div class="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 class="text-xl font-bold text-slate-900">Submit Document</h3>
                <p class="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">Form ID: ${state.activeFormId}</p>
              </div>
              <button onclick="window.state.activeFormId = null; window.render();" class="text-slate-400 hover:text-slate-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div class="p-6 overflow-y-auto flex-1 bg-slate-50">
              <form onsubmit="window.submitDigitalForm(event, '${state.activeFormId}')" class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-2">Subject / Title</label>
                  <input type="text" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-2">Detailed Justification</label>
                  <textarea rows="4" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></textarea>
                </div>
                <div class="bg-white p-4 rounded-lg border border-slate-200">
                  <label class="block text-sm font-bold text-slate-700 mb-2">Digital Signature required</label>
                  <input type="password" placeholder="Enter PIN to sign" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono" required>
                </div>
                <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <button type="button" onclick="window.state.activeFormId = null; window.render();" class="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-bold hover:bg-slate-50">Cancel</button>
                  <button type="submit" class="px-6 py-2 bg-enterprise-blue hover:bg-blue-700 text-white rounded-lg font-bold">Sign & Submit to Workflow</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
};
window.switchWorkspaceTab = function(tabName) {
  if (window.state) {
    window.state.activeWorkspaceTab = tabName;
    if (tabName !== 'org') {
      window.state.activePortalId = null;
    }
    window.render();
  }
};

window.openErpPortal = function(portalId) {
  if (window.state) {
    if (!window.state.portalAuths) window.state.portalAuths = {};
    if (!window.state.portalAuths[portalId] && window.state.activePersona !== 'admin') {
      window.state.pendingPortalAuth = portalId;
      window.render();
      return;
    }
    window.state.activePortalId = portalId;
    window.state.activePortalTab = 'dashboard';
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Opened Governance Portal authority workspace: "${portalId}"`);
    window.render();
  }
};


window.submitPortalLogin = function(e, portalId, portalName) {
  e.preventDefault();
  if (window.state) {
    if (!window.state.portalAuths) window.state.portalAuths = {};
    window.state.portalAuths[portalId] = true;
    
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Successful Zero Trust Authentication into ${portalName}`);
    
    window.render();
  }
};
window.cancelPortalLogin = function() {
  if (window.state) {
    window.state.pendingPortalAuth = null;
    window.render();
  }
};

window.closeErpPortal = function() {
  if (window.state) {
    window.state.activePortalId = null;
    window.render();
  }
};


window.switchPortalTab = function(tabName) {
  if (window.state) {
    window.state.activePortalTab = tabName;
    window.render();
  }
};
window.switchActivePersona = function(personaCode) {
  if (window.state) {
    window.state.activePersona = personaCode;
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Authenticated Session Token claim swapped to persona: "${personaCode}"`);
    window.render();
  }
};

window.togglePortalFavorite = function(portalId) {
  if (window.state) {
    if (!window.state.favorites) window.state.favorites = [];
    const idx = window.state.favorites.indexOf(portalId);
    if (idx === -1) {
      window.state.favorites.push(portalId);
    } else {
      window.state.favorites.splice(idx, 1);
    }
    window.render();
  }
};

// SVG Chart click logs with zero alert/popups
window.logChartInteraction = function(sectorName, value) {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Analytical drilldown on chart: Sector "${sectorName}" is at ${value}% capacity`);
    window.render();
  }
};

window.runPortalAction = function(actionName) {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Executed operational module step: "${actionName}" - Status 200 OK`);
    window.render();
  }
};

window.executeDirectModuleAction = function(moduleName) {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Triggered granular regulatory diagnostic audit for module: "${moduleName}"`);
    window.render();
  }
};

window.runBatchDiagnostic = function(portalName) {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Batch compliance diagnostics completed for portal authority: "${portalName}" - SLA targets fully satisfied.`);
    window.render();
  }
};

window.executeWorkflowAction = function(id, status) {
  if (window.state) {
    const item = window.state.submittedForms.find(sf => sf.id === id);
    if (item) {
      item.status = status;
      if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
      const time = new Date().toLocaleTimeString();
      window.state.portalActionLogs.push(`[${time}] Workflow decision for ${id}: Claim status modified to ${status}`);
    }
    window.render();
  }
};

// Canvas-based Digital Signatures & Dynamic forms modal
window.openFormModal = function(formId) {
  const allForms = Object.values(DIGITAL_FORMS_CATALOGUE).flat();
  const form = allForms.find(f => f.id === formId);
  if (!form) return;

  const modal = document.getElementById("digital-form-modal");
  const modalContent = document.getElementById("digital-form-modal-content");
  if (!modal || !modalContent) return;

  const fieldsHtml = (form.fields || []).map((field, idx) => `
    <div>
      <label class="block text-slate-700 font-bold mb-1.5">${field}</label>
      <input type="text" id="form-field-${idx}" placeholder="Enter ${field}..." required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 placeholder-slate-400">
    </div>
  `).join('');

  modalContent.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-slate-100">
      <div>
        <span class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">${form.category || 'Forms'}</span>
        <h4 class="font-extrabold text-slate-900 text-sm font-sans tracking-tight">${form.title}</h4>
      </div>
      <button onclick="document.getElementById('digital-form-modal').classList.add('hidden');" class="text-slate-400 hover:text-slate-600 font-bold text-lg">&times;</button>
    </div>
    
    <form onsubmit="window.submitDigitalForm(event, '${form.id}')" class="space-y-4 text-xs font-semibold">
      
      <!-- Multi-section layout: Part 1 - Info -->
      <div class="space-y-4">
        <p class="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 pb-1">1. Requisition & Clearance Details</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-slate-700 font-bold mb-1.5">Applicant Full Name</label>
            <input type="text" id="form-applicant-name" value="${window.state.session?.user?.name || 'Dr. Sarah Namubiru'}" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800">
          </div>
          <div>
            <label class="block text-slate-700 font-bold mb-1.5">National ID / Passport Number</label>
            <input type="text" id="form-applicant-id" placeholder="e.g. CM82910-U" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800">
          </div>
        </div>
        ${fieldsHtml}
      </div>

      <!-- Multi-section: Part 2 - Attachments -->
      <div class="space-y-2">
        <p class="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 pb-1">2. Supporting Attachments</p>
        <div class="border-2 border-dashed border-slate-200 p-4 rounded-xl text-center bg-slate-50">
          <p class="text-xs text-slate-600">Simulate Supporting File Uploads (Drag files or click below)</p>
          <input type="file" class="hidden" id="form-file-attachment">
          <button type="button" onclick="document.getElementById('form-file-attachment').click()" class="mt-2 px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded text-[10px] text-slate-700 font-bold">Select Attachments</button>
        </div>
      </div>

      <!-- Multi-section: Part 3 - Digital Signature Pad -->
      <div class="space-y-2">
        <p class="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 pb-1">3. Cryptographic Signature Stamp</p>
        <div class="bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <label class="block text-slate-600 mb-1">Type Cryptographic Name for Sign-Off</label>
          <input type="text" id="form-sig-text" placeholder="Type your full signature code e.g. /Sarah Namubiru/" required class="w-full p-2 bg-white border border-slate-200 rounded focus:outline-none text-[11px] font-mono font-bold">
        </div>
      </div>

      <div class="p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-slate-600">
        <p class="font-bold text-blue-800 font-sans">Multi-level Clearance Routing:</p>
        <p class="text-slate-500 font-mono text-[10px]">${(form.approvalPath || ['Initial Submission', 'Departmental Approval', 'Treasury Clearance']).join(' &rarr; ')}</p>
      </div>

      <div class="pt-2 flex items-center justify-end gap-2">
        <button type="button" onclick="document.getElementById('digital-form-modal').classList.add('hidden');" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold">Submit Requisition & Sign</button>
      </div>
    </form>
  `;

  modal.classList.remove("hidden");
};

window.submitDigitalForm = function(e, formId) {
  e.preventDefault();
  const allForms = Object.values(DIGITAL_FORMS_CATALOGUE).flat();
  const form = allForms.find(f => f.id === formId);
  if (!form) return;
  
  const applicantName = document.getElementById("form-applicant-name")?.value || "Staff Member";
  const sigText = document.getElementById("form-sig-text")?.value || "Cryptographic Sign";
  
  // Hash calculation generator simulation
  const sigHash = `0x${Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase()}`;

  // Gather fields values
  const fieldsData = {};
  (form.fields || []).forEach((field, idx) => {
    const input = document.getElementById(`form-field-${idx}`);
    fieldsData[field] = input ? input.value : "Value N/A";
  });

  const newSubmission = {
    id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
    formId,
    formName: form.title,
    applicant: applicantName,
    submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    fields: fieldsData,
    status: "PENDING",
    signature: sigHash,
    history: [
      { step: "Submission", user: applicantName, date: new Date().toISOString().split('T')[0], action: "Submitted", comment: `Digitally signed using stamp code ${sigText}` }
    ]
  };

  if (window.state) {
    if (!window.state.submittedForms) window.state.submittedForms = [];
    window.state.submittedForms.unshift(newSubmission);

    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Signed Digital Form "${form.title}" submitted securely. Clearance ID: ${newSubmission.id}`);
  }

  const modal = document.getElementById("digital-form-modal");
  if (modal) modal.classList.add("hidden");
  window.render();
};

// Drag & Drop / File Upload Utilities
window.handleDragOver = function(e) {
  e.preventDefault();
  const el = document.getElementById('file-dropzone');
  if (el) {
    el.classList.add('border-blue-500', 'bg-blue-50/20');
  }
};

window.handleFileDrop = function(e) {
  e.preventDefault();
  const el = document.getElementById('file-dropzone');
  if (el) {
    el.classList.remove('border-blue-500', 'bg-blue-50/20');
  }

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    window.registerUploadedFile(files[0]);
  }
};

window.handleManualFileUpload = function(e) {
  const files = e.target.files;
  if (files.length > 0) {
    window.registerUploadedFile(files[0]);
  }
};

window.registerUploadedFile = function(fileObj) {
  if (window.state) {
    if (!window.state.uploadedFiles) window.state.uploadedFiles = [];
    
    // Create cryptographic hash
    const fakeHash = `0x${Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase()}`;
    const fileSizeStr = fileObj.size > 1024 * 1024 
      ? `${(fileObj.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${(fileObj.size / 1024).toFixed(1)} KB`;

    window.state.uploadedFiles.unshift({
      name: fileObj.name,
      size: fileSizeStr,
      hash: fakeHash
    });

    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Stored document upload: "${fileObj.name}" validated with SHA256 code: ${fakeHash}`);
    
    window.render();
  }
};

// Simulated Gemini LLM Area with structured output dispatches
window.insertAiQueryPlaceholder = function(queryText) {
  const el = document.getElementById('portal-ai-query-area');
  if (el) el.value = queryText;
};

window.submitPortalAiQuery = function(portalName) {
  const textarea = document.getElementById('portal-ai-query-area');
  const container = document.getElementById('ai-response-container');
  if (!textarea || !container) return;

  const val = textarea.value.trim();
  if (!val) return;

  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="space-y-2 leading-relaxed">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
        <p class="font-extrabold text-indigo-900 font-mono text-[11px]">COGNITIVE COMPLIANCE REVIEW OUTCOME:</p>
      </div>
      <p class="text-slate-700 font-normal">
        Processed query: <strong class="text-slate-900 font-sans">"${val}"</strong>. The active JUMO-UEOS Gemini Core audited compliance checks for this transaction signature.
      </p>
      <div class="bg-white border border-indigo-100 p-3 rounded-lg text-[11px] text-slate-500 font-mono">
        <p class="font-bold text-slate-700 font-sans uppercase text-[9px] tracking-wider">Statutory Rules Audited:</p>
        <p class="mt-1">&bull; Regulatory Framework Alignment: 100% Passed</p>
        <p>&bull; SLA Threshold verification: Checked & Signed</p>
        <p>&bull; FAAP Consensus Threshold: Verified on chain (Node Endpoint)</p>
      </div>
    </div>
  `;
};

// General Global Settings saving and Backups
window.savePortalSettings = function(portalName) {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Saved custom local configurations for portal: "${portalName}"`);
    window.render();
  }
};

window.saveGeneralSettings = function() {
  const instName = document.getElementById("setting-inst-name")?.value || "JUMO University";
  if (window.state) {
    window.state.session.organization = instName;
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Saved global institutional profile configurations.`);
    window.render();
  }
};

window.triggerAegisSystemBackup = function() {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(`[${time}] Completed full platform backup of Active Records & SACCO ledgers to the immutable AEGIS ledger.`);
    window.render();
  }
};

// Navigation History Managers
window.navigateHistoryBack = function() {
  if (window.state && window.state.navigationHistoryIndex > 0) {
    window.state.navigationHistoryIndex--;
    const snapshot = window.state.navigationHistory[window.state.navigationHistoryIndex];
    window.state.activeWorkspaceTab = snapshot.tab;
    window.state.activePortalId = snapshot.portalId;
    window.render();
  }
};

window.navigateHistoryForward = function() {
  if (window.state && window.state.navigationHistoryIndex < window.state.navigationHistory.length - 1) {
    window.state.navigationHistoryIndex++;
    const snapshot = window.state.navigationHistory[window.state.navigationHistoryIndex];
    window.state.activeWorkspaceTab = snapshot.tab;
    window.state.activePortalId = snapshot.portalId;
    window.render();
  }
};

// Global Search
window.handleGlobalSearch = function(e) {
  if (window.state) {
    window.state.searchQuery = e.target.value;
    window.render();
    
    // Focus search input after rendering to maintain cursor position
    setTimeout(() => {
      const el = document.getElementById('global-search-input');
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    }, 10);
  }
};

// Show keyboard helper modal
window.showKeyboardShortcutsModal = function() {
  const el = document.getElementById('shortcuts-modal');
  if (el) el.classList.remove('hidden');
};

// Listen to keyboard shortcut triggers
document.addEventListener('keydown', (e) => {
  // Only trigger if focus is not on input/textarea
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

  if (e.key === '1') {
    window.switchWorkspaceTab('org');
  } else if (e.key === '2') {
    window.switchWorkspaceTab('dept');
  } else if (e.key === '3') {
    window.switchWorkspaceTab('sacco');
  } else if (e.key === '4') {
    window.switchWorkspaceTab('forms');
  } else if (e.key === '5') {
    window.switchWorkspaceTab('role');
  } else if (e.key === '?') {
    window.showKeyboardShortcutsModal();
  }
});

// Floating JUMO AI Assistant Chat Handlers
window.toggleJumoChat = function() {
  if (window.state) {
    window.state.jumoChatOpen = !window.state.jumoChatOpen;
    window.render();
  }
};

window.sendJumoChatMessage = function(e) {
  e.preventDefault();
  const input = document.getElementById('jumo-chat-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;

  if (window.state) {
    if (!window.state.jumoChatMessages) window.state.jumoChatMessages = [];
    window.state.jumoChatMessages.push({ sender: 'user', text: val });

    let reply = `I understand you're asking about "${val}". As the JUMO Front Desk Assistant, I can guide you to our public services or direct you to the correct login gateway for authorized access. Please note I do not have access to internal staff, financial, or student records.`;
    const lower = val.toLowerCase();
    if (lower.includes('login') || lower.includes('portal') || lower.includes('access')) {
      reply = `To access secure institutional services, please navigate to the Portal Directory and select your designated portal. You will need your authorized credentials to proceed.`;
    } else if (lower.includes('admissions') || lower.includes('apply') || lower.includes('register')) {
      reply = `For admissions and registration, please visit the Public Applicant Portal from the Portal Directory. There you can submit forms, upload documents, and track your application status.`;
    } else if (lower.includes('contact') || lower.includes('help')) {
      reply = `If you need specialized assistance, please use the Contact Support link in the resources menu. Official institutional representatives will assist you further.`;
    } else if (lower.includes('student') || lower.includes('staff') || lower.includes('finance') || lower.includes('record')) {
      reply = `I cannot access or disclose internal records, staff information, or financial data. Please authenticate through your designated secure portal to access personalized institutional information.`;
    }
    
    setTimeout(() => {
      window.state.jumoChatMessages.push({ sender: 'ai', text: reply });
      window.render();
    }, 400);

    window.render();
  }
};


window.advanceWorkflow = function(wfId, currentStatus) {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    let nextStatus = "Completed";
    if (currentStatus === "Pending You") nextStatus = "Approved & Escalated";
    
    window.state.portalActionLogs.push(`[${time}] Executed Workflow Engine progression on ${wfId}: Status changed from '${currentStatus}' to '${nextStatus}'`);
    window.state.ccToastMessage = `Workflow ${wfId} successfully advanced to ${nextStatus}`;
    window.render();
  }
};
