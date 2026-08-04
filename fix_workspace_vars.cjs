const fs = require('fs');
let content = fs.readFileSync('experience/workspace/index.js', 'utf8');

const targetStr = `export const workspaceTemplate = (state) => {
  initializeWorkspaceState(state);
  
  if (!state.activeComponentId) state.activeComponentId = 'dashboard';`;

const replacement = `export const workspaceTemplate = (state) => {
  initializeWorkspaceState(state);
  
  const user = state.session?.user || { name: 'Admin', role: 'Administrator' };
  const portals = state.session?.activeErpInstance?.portals || [
    { id: 'admin-portal', name: 'Administration Portal', desc: 'Central governance' },
    { id: 'ops-portal', name: 'Operations Portal', desc: 'Daily operations' }
  ];
  if (!state.activePortalId && portals.length > 0) state.activePortalId = portals[0].id;
  const activePortal = portals.find(p => p.id === state.activePortalId) || portals[0];
  
  const allModules = state.session?.activeErpInstance?.modules || [
      { id: 'mod-1', name: 'Core Operations', category: 'Management', components: ['Dashboard', 'Records'] }
  ];
  
  const selectedModule = state.activeModuleId ? allModules.find(m => m.id === state.activeModuleId) || allModules[0] : null;
  const currentView = state.activePortalTab || 'modules';
  const forms = state.submittedForms || [];
  
  const modulesByCategory = allModules.reduce((acc, mod) => {
    if (!acc[mod.category]) acc[mod.category] = [];
    acc[mod.category].push(mod);
    return acc;
  }, {});

  if (!state.activeComponentId) state.activeComponentId = 'dashboard';`;

content = content.replace(targetStr, replacement);
fs.writeFileSync('experience/workspace/index.js', content);
console.log('Fixed workspaceTemplate variables');
