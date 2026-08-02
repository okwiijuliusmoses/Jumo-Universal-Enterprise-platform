const fs = require('fs');
let content = fs.readFileSync('experience/workspace/index.js', 'utf8');

const moduleActions = `
window.executeDirectModuleAction = function(modName) {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(\`[\${time}] Executed Module Engine for: \${modName}\`);
    window.state.ccToastMessage = \`Launched Enterprise Module: \${modName}\`;
    // We could switch to a specific module view here if we had one, but for now we just show a toast.
    // Let's set a fake active module state
    window.state.activeModule = modName;
    window.render();
  }
};
`;

if (!content.includes('window.executeDirectModuleAction = function')) {
  content += '\n' + moduleActions;
  fs.writeFileSync('experience/workspace/index.js', content, 'utf8');
}
console.log('Patched module actions');
