const fs = require('fs');
let content = fs.readFileSync('experience/gateway/app.js', 'utf8');

const askAiCode = `
window.askAi = function(e, inputId, stateKey) {
  e.preventDefault();
  const input = document.getElementById(inputId);
  if (input && input.value) {
    const query = input.value;
    input.value = '';
    window.state[stateKey] = "AI Gateway Processing: Analysing your request...";
    window.render();
    
    setTimeout(() => {
      window.state[stateKey] = "UEOS AI Analysis Complete: " + query + ". (Simulated Enterprise Response)";
      window.render();
    }, 1500);
  }
};
`;

content = content.replace(
  'window.recordFaapTransaction = function(e) {',
  askAiCode + '\nwindow.recordFaapTransaction = function(e) {'
);

fs.writeFileSync('experience/gateway/app.js', content);
