const fs = require('fs');
const content = fs.readFileSync('experience/workspace/index.js', 'utf8');
const match = content.match(/export const workspaceTemplate = [\s\S]*?;\n\s*\};\n/);
if (match) {
  fs.writeFileSync('workspace_func.js', match[0]);
  console.log("Extracted workspaceTemplate");
} else {
  console.log("Not found");
}
