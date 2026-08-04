const fs = require('fs');
let content = fs.readFileSync('experience/workspace/index.js', 'utf8');

// Find the initializeWorkspaceState function
const startToken = 'const initializeWorkspaceState = (state) => {';
const endToken = '  if (!state.activeComponentId) state.activeComponentId = \'dashboard\';';

const startIndex = content.indexOf(startToken);
const endIndex = content.indexOf(endToken, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `const initializeWorkspaceState = (state) => {
  if (!state.activeWorkspaceTab) state.activeWorkspaceTab = 'org';
  if (!state.activePortalTab) state.activePortalTab = 'modules';
  if (!state.portalActionLogs) state.portalActionLogs = [];
  if (!state.portalAuths) state.portalAuths = {};
  if (!state.pendingPortalAuth) state.pendingPortalAuth = null;
  
  const activeErp = state.session?.activeErpInstance || state.erpRuntime;
  
  if (!state.faapTransactions) state.faapTransactions = [];
  if (!state.saccoLoans) state.saccoLoans = [];
  if (!state.submittedForms) state.submittedForms = [];
`;
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync('experience/workspace/index.js', content);
    console.log('Fixed initializeWorkspaceState');
} else {
    console.log('Could not find initializeWorkspaceState block');
}
