const fs = require('fs');
let content = fs.readFileSync('experience/workspace/index.js', 'utf8');

const targetStr = `  if (!state.activeComponentId) state.activeComponentId = 'dashboard';

  window.app.innerHTML = \``;
  
if (content.includes("if (!state.activeComponentId) state.activeComponentId = 'dashboard';")) {
  console.log("Found target line");
}

const replacement = `};

export const workspaceTemplate = (state) => {
  initializeWorkspaceState(state);
  
  if (!state.activeComponentId) state.activeComponentId = 'dashboard';

  window.app.innerHTML = \``;

content = content.replace(/  if \(\!state\.activeComponentId\) state\.activeComponentId = 'dashboard';\s*window\.app\.innerHTML = \`/, replacement);

fs.writeFileSync('experience/workspace/index.js', content);
console.log('Restored workspaceTemplate export');
