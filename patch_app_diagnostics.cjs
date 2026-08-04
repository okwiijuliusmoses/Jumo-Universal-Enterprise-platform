const fs = require('fs');
let content = fs.readFileSync('experience/gateway/app.js', 'utf8');

if (!content.includes('import { startupDiagnostics }')) {
  content = `import { startupDiagnostics } from "../../kernel/runtime/startupDiagnostics.js";\n` + content;
}

content = content.replace(
  'document.addEventListener("DOMContentLoaded", async () => {',
  `document.addEventListener("DOMContentLoaded", async () => {
  startupDiagnostics.log("HTML LOADED");
`
);

content = content.replace(
  'window.state = {',
  `startupDiagnostics.log("CONFIG LOADED");
window.state = {`
);

content = content.replace(
  'await bootOrchestrator.boot(window.state);',
  `startupDiagnostics.log("KERNEL LOADED");
    await bootOrchestrator.boot(window.state);`
);

content = content.replace(
  'window.render();\n});',
  `startupDiagnostics.log("SHELL MOUNTED");
  window.render();
});`
);

content = content.replace(
  'validateUEOSState();',
  `validateUEOSState();\n  startupDiagnostics.log("WORKSPACE READY");`
);

fs.writeFileSync('experience/gateway/app.js', content);
