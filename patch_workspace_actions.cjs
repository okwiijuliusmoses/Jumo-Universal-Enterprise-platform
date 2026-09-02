const fs = require('fs');
let content = fs.readFileSync('experience/workspace/index.js', 'utf8');

// We need to add submitPortalLogin if it doesn't exist, or replace it if it does
const functionBody = `
window.submitPortalLogin = function(e, portalId, portalName) {
  e.preventDefault();
  if (window.state) {
    if (!window.state.portalAuths) window.state.portalAuths = {};
    window.state.portalAuths[portalId] = true;
    
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    window.state.portalActionLogs.push(\`[\${time}] Successful Zero Trust Authentication into \${portalName}\`);
    
    window.render();
  }
};
`;

if (content.includes('window.submitPortalLogin = function')) {
  content = content.replace(/window\.submitPortalLogin = function[\s\S]*?(?=(window\.[a-zA-Z]+ = function|$;))/m, functionBody);
} else {
  content += '\n' + functionBody;
}

// Add switchPortalTab
const tabFunctionBody = `
window.switchPortalTab = function(tabName) {
  if (window.state) {
    window.state.activePortalTab = tabName;
    window.render();
  }
};
`;
if (content.includes('window.switchPortalTab = function')) {
  content = content.replace(/window\.switchPortalTab = function[\s\S]*?(?=(window\.[a-zA-Z]+ = function|$;))/m, tabFunctionBody);
} else {
  content += '\n' + tabFunctionBody;
}

fs.writeFileSync('experience/workspace/index.js', content, 'utf8');
console.log('Patched actions');
