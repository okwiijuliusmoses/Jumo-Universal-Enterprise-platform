const fs = require('fs');
let content = fs.readFileSync('experience/workspace/index.js', 'utf8');

const workflowActions = `
window.advanceWorkflow = function(wfId, currentStatus) {
  if (window.state) {
    if (!window.state.portalActionLogs) window.state.portalActionLogs = [];
    const time = new Date().toLocaleTimeString();
    let nextStatus = "Completed";
    if (currentStatus === "Pending You") nextStatus = "Approved & Escalated";
    
    window.state.portalActionLogs.push(\`[\${time}] Executed Workflow Engine progression on \${wfId}: Status changed from '\${currentStatus}' to '\${nextStatus}'\`);
    window.state.ccToastMessage = \`Workflow \${wfId} successfully advanced to \${nextStatus}\`;
    window.render();
  }
};
`;

if (!content.includes('window.advanceWorkflow = function')) {
  content += '\n' + workflowActions;
  fs.writeFileSync('experience/workspace/index.js', content, 'utf8');
}
console.log('Patched workflow actions');
