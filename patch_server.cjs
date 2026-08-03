const fs = require('fs');
let content = fs.readFileSync('server.js', 'utf8');

const healthCode = `
  if (pathname === "/api/system/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const servicesDetail = registry.list().map(name => ({
       name: name,
       status: "READY"
    }));
    res.end(JSON.stringify({
      status: "READY",
      kernel: "ONLINE",
      shell: "ONLINE",
      services: servicesDetail
    }, null, 2));
    return;
  }
`;

content = content.replace(
  'if (pathname === "/system/health") {',
  healthCode + '\n  if (pathname === "/system/health") {'
);

fs.writeFileSync('server.js', content);
