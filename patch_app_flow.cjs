const fs = require('fs');
let content = fs.readFileSync('experience/gateway/app.js', 'utf8');

content = content.replace(
  'await bootOrchestrator.boot(window.state);',
  'bootOrchestrator.boot(window.state);'
);

content = content.replace(
  'await new Promise(res => setTimeout(res, 400));',
  '// await new Promise(res => setTimeout(res, 400));'
);

fs.writeFileSync('experience/gateway/app.js', content);
