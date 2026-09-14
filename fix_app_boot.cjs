const fs = require('fs');
let content = fs.readFileSync('experience/gateway/app.js', 'utf8');

content = content.replace(
  '    bootOrchestrator.boot(window.state);',
  '    await bootOrchestrator.boot(window.state);'
);
fs.writeFileSync('experience/gateway/app.js', content);
