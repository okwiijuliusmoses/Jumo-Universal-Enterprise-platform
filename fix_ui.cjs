const fs = require('fs');
let content = fs.readFileSync('/app/applet/src/experience/renderer/AIGatewayRenderer.tsx', 'utf8');

content = content.replace(/status: "Operational" /g, 'status: "Active" ');
content = content.replace(/status: "Ready" /g, 'status: "Active" ');
content = content.replace(/status: "100% Passed" /g, 'status: "Active" ');

fs.writeFileSync('/app/applet/src/experience/renderer/AIGatewayRenderer.tsx', content, 'utf8');
