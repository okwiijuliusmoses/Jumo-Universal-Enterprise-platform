const fs = require('fs');
let content = fs.readFileSync('experience/gateway/app.js', 'utf8');

// Replace boot logic
content = content.replace(
  'await bootOrchestrator.boot();',
  'await bootOrchestrator.boot(window.state);'
);

content = content.replace(
  'const bootProgress = document.getElementById("boot-progress");',
  `if (window.state && window.state.bootComplete) {
    if (typeof window.render === 'function') window.render();
    return;
  }
  const bootProgress = document.getElementById("boot-progress");`
);

fs.writeFileSync('experience/gateway/app.js', content);
