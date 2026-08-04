
import { getOfficialLogoHtml } from "../brand/brandConfig.js";

const initializeWorkspaceState = (state) => {
  if (!state.activeView) state.activeView = 'Overview';
  if (!state.portalActionLogs) state.portalActionLogs = [];
  if (!state.submittedForms) state.submittedForms = [];
  if (!state.expandedNavGroups) state.expandedNavGroups = { 'Organization': true, 'Departments': true };
};

export const workspaceTemplate = (state) => {
  initializeWorkspaceState(state);
  
  const user = state.session?.user || { name: 'Admin', role: 'Administrator' };
  const runtime = state.session?.activeErpInstance || state.erpRuntime || {};
  const workspace = runtime.workspace || runtime.structure || {};
  const navigation = workspace.navigation || [];
  const portals = workspace.portals || [];
  const modules = workspace.modules || [];
  
  const activeView = state.activeView;

  // Render navigation tree
  const renderNav = () => {
    return navigation.map((nav, index) => {
      if (nav.children && nav.children.length > 0) {
        const isExpanded = state.expandedNavGroups[nav.label] !== false;
        return `
          <div class="mb-1">
            <button onclick="window.state.expandedNavGroups['${nav.label}'] = !${isExpanded}; window.render();" class="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded transition cursor-pointer">
              <span>${nav.label}</span>
              <svg class="w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
            <div class="${isExpanded ? 'block' : 'hidden'} pl-4 pr-2 py-1 space-y-0.5">
              ${nav.children.map(child => `
                <button onclick="window.state.activeView = '${child}'; window.render();" class="w-full text-left px-3 py-1.5 text-xs font-medium rounded transition cursor-pointer ${activeView === child ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'}">
                  ${child}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      } else if (activeView === 'Portals') {
      return \`
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 class="text-2xl font-semibold text-slate-900">Provisioned Portals</h1>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            \${portals.map(p => \`
              <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition">
                <h3 class="font-bold text-slate-800 text-lg">\${p.name || p}</h3>
                <p class="text-xs text-slate-500 mt-2">Enterprise Access Portal</p>
                <div class="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                   <button class="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider">Access</button>
                </div>
              </div>
            \`).join('')}
          </div>
        </div>
      \`;
    } else if (activeView === 'Modules') {
      return \`
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 class="text-2xl font-semibold text-slate-900">Enterprise Modules</h1>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            \${modules.map(m => \`
              <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                <h4 class="font-bold text-slate-800 text-sm">\${m.name || m}</h4>
                <div class="flex justify-between items-center mt-2">
                   <span class="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded border border-emerald-100">ACTIVE</span>
                   <span class="text-[10px] text-slate-400 font-mono">\${m.id || 'N/A'}</span>
                </div>
              </div>
            \`).join('')}
          </div>
        </div>
      \`;
    } else {
        return `
          <div class="mb-1">
            <button onclick="window.state.activeView = '${nav.label}'; window.render();" class="w-full text-left px-3 py-2 text-xs font-bold rounded transition cursor-pointer ${activeView === nav.label ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}">
              ${nav.label}
            </button>
          </div>
        `;
      }
    }).join('');
  };

  // Render view content
  const renderContent = () => {
    if (activeView === 'Overview') {
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-slate-900">${runtime.name || 'Enterprise'} Overview</h1>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">ACTIVE</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Portals</h3>
              <p class="text-3xl font-light text-slate-800">${portals.length}</p>
            </div>
            <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Modules</h3>
              <p class="text-3xl font-light text-slate-800">${modules.length}</p>
            </div>
            <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">System Status</h3>
              <p class="text-lg font-medium text-emerald-600 mt-2">Operational</p>
            </div>
          </div>
        </div>
      `;
    } else if (activeView === 'Configuration') {
      const configSections = Object.keys(workspace.settings || {});
      return `
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 class="text-2xl font-semibold text-slate-900">Configuration Center</h1>
          </div>
          <div class="flex items-start gap-8">
            <div class="w-64 flex-shrink-0 border-r border-slate-200 pr-4">
               <ul class="space-y-1">
                 ${configSections.map(s => `<li class="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded cursor-pointer capitalize">${s}</li>`).join('')}
               </ul>
            </div>
            <div class="flex-1 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
               <h3 class="text-lg font-semibold text-slate-800 mb-4">Configuration Data</h3>
               <pre class="text-xs text-slate-600 bg-slate-50 p-4 rounded overflow-auto border border-slate-200">${JSON.stringify(workspace.settings, null, 2)}</pre>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="space-y-6">
          <h1 class="text-2xl font-semibold text-slate-900">${activeView}</h1>
          <div class="bg-white p-8 rounded-lg border border-slate-200 shadow-sm flex items-center justify-center min-h-[400px]">
             <div class="text-center">
                <svg class="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                <h3 class="text-lg font-medium text-slate-700">Workspace Generated</h3>
                <p class="text-sm text-slate-500 mt-2">The factory has successfully provisioned the ${activeView} workspace.</p>
             </div>
          </div>
        </div>
      `;
    }
  };

  window.app.innerHTML = `
    <div class="min-h-screen bg-white flex flex-col font-sans text-slate-800">
       
      <!-- M365 Style Header -->
      <header class="bg-blue-600 border-b border-blue-700 sticky top-0 z-[60]">
        <div class="px-4 flex items-center justify-between h-12">
          <div class="flex items-center gap-4">
             <button onclick="window.navigate('/gateway')" class="w-8 h-8 rounded flex items-center justify-center text-white hover:bg-blue-700 transition cursor-pointer" title="App Launcher">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
             </button>
             <div class="text-white font-semibold text-sm tracking-wide">
               JUMO UEOS
             </div>
          </div>
          
          <div class="flex-1 max-w-lg mx-auto hidden md:block">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="text" placeholder="Search across ${runtime.name}..." class="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-md leading-5 bg-blue-500/50 text-white placeholder-blue-200 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 sm:text-sm transition duration-150 ease-in-out">
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 rounded flex items-center justify-center text-white hover:bg-blue-700 transition cursor-pointer" title="Settings">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <button class="w-8 h-8 rounded flex items-center justify-center text-white hover:bg-blue-700 transition cursor-pointer" title="Help">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <div class="h-8 w-8 ml-2 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold text-xs cursor-pointer shadow-sm">
              ${user.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <!-- App Breadcrumbs Context -->
      <div class="bg-white border-b border-slate-200">
        <div class="px-6 h-10 flex items-center gap-2 text-xs font-medium text-slate-500">
           <span class="hover:text-slate-800 cursor-pointer">Enterprise Factory</span>
           <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
           <span class="text-slate-800">${runtime.name || 'Application'}</span>
        </div>
      </div>
      
      <!-- Main Layout with Left Navigation -->
      <div class="flex-1 flex overflow-hidden bg-slate-50">
        
        <!-- Left Sidebar Navigation -->
        <aside class="w-64 flex-shrink-0 bg-white border-r border-slate-200 overflow-y-auto pt-4 pb-12 shadow-sm z-10">
          <div class="px-3">
             ${renderNav()}
          </div>
        </aside>
        
        <!-- Content Area -->
        <main class="flex-1 overflow-y-auto p-8 relative">
           <div class="max-w-6xl mx-auto">
             ${renderContent()}
           </div>
        </main>
        
      </div>
    </div>
  `;
};
