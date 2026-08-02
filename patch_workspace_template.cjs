const fs = require('fs');

let content = fs.readFileSync('experience/workspace/index.js', 'utf8');

// Find the start and end of workspaceTemplate
const startIdx = content.indexOf('export const workspaceTemplate =');
const nextExport = content.indexOf('export const contactTemplate =');
const endIdx = content.indexOf('};', nextExport !== -1 ? nextExport - 100 : content.length - 1); // rough guess

// Actually, let's use a regex to replace everything from export const workspaceTemplate up to window.switchWorkspaceTab
const replaceRegex = /export const workspaceTemplate = \([\s\S]*?(?=window\.switchWorkspaceTab =)/;

const newTemplate = `export const workspaceTemplate = (state) => {
  initializeWorkspaceState(state);
  const runtimeEngine = window.erpRuntimeEngine || state.runtimeEngine;
  const activeTemplate = state.session?.activeErpTemplate || (runtimeEngine ? runtimeEngine.getTemplate("edu-uni") : null);
  const institution = state.deployedInstitution || { name: "Enterprise Platform", portals: [] };
  const portals = activeTemplate?.governancePortals || institution.portals || [];
  institution.portals = portals;
  
  if (!state.activePortalId) {
    // Redirect to gateway to pick a portal
    setTimeout(() => window.navigate('/gateway'), 0);
    return;
  }
  
  const portal = portals.find(p => p.id === state.activePortalId) || { id: state.activePortalId, name: state.activePortalId, desc: "Sovereign Enterprise Portal" };
  const isAuth = state.portalAuths[portal.id];
  
  if (!isAuth) {
    // Portal Login View (No sidebars, no forms, secure auth only)
    app.innerHTML = \`
      <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <div class="bg-slate-900 p-8 text-center border-b border-slate-800">
             \${getOfficialLogoHtml({ size: "lg", textColor: "light" })}
          </div>
          <div class="p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">\${portal.name}</h2>
            <p class="text-sm text-slate-500 mb-6">\${portal.desc}</p>
            <form onsubmit="event.preventDefault(); window.submitPortalLogin(event, '\${portal.id}', '\${portal.name}')" class="space-y-4">
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
    \`;
    return;
  }
  
  // Portal Runtime Workspace
  const user = state.session?.user || { name: "Authorized User", role: "Portal Administrator", email: "user@enterprise.com" };
  const forms = DIGITAL_FORMS_CATALOGUE[state.activePortalId] || [
    { id: "gen-1", title: "General Request Form", desc: "Submit a general request to this department." },
    { id: "gen-2", title: "Activity Report", desc: "Log department activity and outcomes." }
  ];
  const modules = activeTemplate?.modules || ["Records", "Operations", "Reports", "Approvals"];
  
  const currentView = state.activePortalTab || 'dashboard';
  
  app.innerHTML = \`
    <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <!-- Horizontal Enterprise Navigation -->
      <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-6">
              <button onclick="window.navigate('/gateway')" class="text-slate-400 hover:text-white transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              </button>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                  <h1 class="text-white font-bold text-sm tracking-wide">\${portal.name}</h1>
                  <p class="text-emerald-400 text-[10px] font-mono tracking-widest uppercase">Secure Runtime</p>
                </div>
              </div>
            </div>
            
            <nav class="hidden md:flex space-x-1">
              <button onclick="window.switchPortalTab('dashboard')" class="px-4 py-2 rounded-md text-sm font-medium \${currentView === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition">Dashboard</button>
              <button onclick="window.switchPortalTab('modules')" class="px-4 py-2 rounded-md text-sm font-medium \${currentView === 'modules' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition">Modules</button>
              <button onclick="window.switchPortalTab('forms')" class="px-4 py-2 rounded-md text-sm font-medium \${currentView === 'forms' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition">Digital Forms</button>
              <button onclick="window.switchPortalTab('workflows')" class="px-4 py-2 rounded-md text-sm font-medium \${currentView === 'workflows' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition">Workflows</button>
              <button onclick="window.switchPortalTab('records')" class="px-4 py-2 rounded-md text-sm font-medium \${currentView === 'records' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} transition">Records & Audit</button>
            </nav>
            
            <div class="flex items-center gap-4">
              <button class="text-slate-400 hover:text-white transition relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <span class="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              </button>
              <div class="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 text-white font-bold text-xs cursor-pointer">
                \${user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Main Content Area -->
      <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        \${currentView === 'dashboard' ? \`
          <div class="mb-8 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-slate-900">Workspace Overview</h2>
              <p class="text-sm text-slate-500">Welcome to the \${portal.name} operating environment.</p>
            </div>
            <button onclick="window.switchPortalTab('forms')" class="bg-enterprise-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              New Action
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
              <div><p class="text-sm font-medium text-slate-500">Pending Approvals</p><p class="text-2xl font-bold text-slate-900">14</p></div>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></div>
              <div><p class="text-sm font-medium text-slate-500">Active Workflows</p><p class="text-2xl font-bold text-slate-900">8</p></div>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
              <div><p class="text-sm font-medium text-slate-500">Recent Activity</p><p class="text-2xl font-bold text-slate-900">124</p></div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 class="font-bold text-slate-800">Recent Workflow Activity</h3>
              <button onclick="window.switchPortalTab('workflows')" class="text-xs font-semibold text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div class="divide-y divide-slate-100">
              \${[1,2,3].map(i => \`
                <div class="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition">
                  <div class="flex items-center gap-4">
                    <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <p class="text-sm font-bold text-slate-900">Document Verification #\${8920 + i}</p>
                      <p class="text-xs text-slate-500 mt-0.5">Submitted by \${user.name} • 2 hours ago</p>
                    </div>
                  </div>
                  <span class="inline-flex px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold uppercase tracking-wider">Completed</span>
                </div>
              \`).join('')}
            </div>
          </div>
        \` : ''}
        
        \${currentView === 'modules' ? \`
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">Operational Modules</h2>
            <p class="text-sm text-slate-500">Applications and tools assigned to your role in this portal.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            \${modules.map(mod => \`
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col group cursor-pointer" onclick="window.executeDirectModuleAction('\${mod}')">
                <div class="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                </div>
                <h3 class="font-bold text-slate-900 mb-2">\${mod} Application</h3>
                <p class="text-sm text-slate-500 mb-4 flex-1">Execute specialized functions and operations within the \${mod} subsystem.</p>
                <div class="text-xs font-semibold text-enterprise-blue flex items-center gap-1">Launch Module <span>→</span></div>
              </div>
            \`).join('')}
          </div>
        \` : ''}
        
        \${currentView === 'forms' ? \`
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">Department Digital Forms</h2>
            <p class="text-sm text-slate-500">Initiate requests and submissions specific to this portal.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            \${forms.map(form => \`
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center group">
                <div>
                  <h3 class="font-bold text-slate-900">\${form.title}</h3>
                  <p class="text-sm text-slate-500 mt-1">\${form.desc}</p>
                </div>
                <button onclick="window.openFormModal('\${form.id}')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-bold transition">Fill Form</button>
              </div>
            \`).join('')}
          </div>
        \` : ''}
        
        \${currentView === 'workflows' ? \`
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">Workflow Execution Queue</h2>
            <p class="text-sm text-slate-500">Manage approvals, escalations, and automated processes.</p>
          </div>
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th class="p-4 font-bold">Workflow ID</th>
                  <th class="p-4 font-bold">Originator</th>
                  <th class="p-4 font-bold">Current Stage</th>
                  <th class="p-4 font-bold">Status</th>
                  <th class="p-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr class="hover:bg-slate-50">
                  <td class="p-4 font-mono text-sm text-slate-900 font-bold">WF-8921-A</td>
                  <td class="p-4 text-sm text-slate-600">Operations Dept</td>
                  <td class="p-4 text-sm text-slate-600">Director Approval</td>
                  <td class="p-4"><span class="inline-flex px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-[10px] font-bold uppercase tracking-wider">Pending You</span></td>
                  <td class="p-4"><button class="text-xs font-bold text-enterprise-blue hover:text-blue-800">Review</button></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="p-4 font-mono text-sm text-slate-900 font-bold">WF-8922-B</td>
                  <td class="p-4 text-sm text-slate-600">Finance Team</td>
                  <td class="p-4 text-sm text-slate-600">Treasury Clearance</td>
                  <td class="p-4"><span class="inline-flex px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-[10px] font-bold uppercase tracking-wider">In Progress</span></td>
                  <td class="p-4"><button class="text-xs font-bold text-slate-400 hover:text-slate-600">View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        \` : ''}
        
        \${currentView === 'records' ? \`
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">Immutable Records & Audit</h2>
            <p class="text-sm text-slate-500">Sovereign ledgers and historical logs for this portal.</p>
          </div>
          <div class="bg-slate-900 text-slate-300 rounded-xl p-6 font-mono text-xs shadow-inner">
            <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
              <span class="text-emerald-400 font-bold tracking-widest uppercase text-[10px]">AEGIS Audit Node Connected</span>
              <button class="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded transition">Export Logs</button>
            </div>
            <div class="space-y-3">
              \${(state.portalActionLogs || []).length > 0 
                ? state.portalActionLogs.map(log => \`<div>\${log}</div>\`).join('')
                : '<div>[SYSTEM] No recent immutable transactions recorded in this session.</div>'
              }
            </div>
          </div>
        \` : ''}
      </main>
      
      <!-- Modals (e.g. Form Fill Modal) -->
      \${state.activeFormId ? \`
        <div class="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 class="text-xl font-bold text-slate-900">Submit Document</h3>
                <p class="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">Form ID: \${state.activeFormId}</p>
              </div>
              <button onclick="window.state.activeFormId = null; window.render();" class="text-slate-400 hover:text-slate-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div class="p-6 overflow-y-auto flex-1 bg-slate-50">
              <form onsubmit="window.submitDigitalForm(event, '\${state.activeFormId}')" class="space-y-6">
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
      \` : ''}
    </div>
  \`;
};
`;

content = content.replace(replaceRegex, newTemplate);
fs.writeFileSync('experience/workspace/index.js', content, 'utf8');
console.log('Successfully patched workspaceTemplate');
