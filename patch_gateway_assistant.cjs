const fs = require('fs');
let content = fs.readFileSync('experience/gateway/index.js', 'utf8');

content = content.replace(
  /Hello! I am your JUMO AI Assistant\. How can I assist you with .* today\?/g,
  `Welcome! I am the Public Front Desk Assistant. I can help you discover available public services, locate the correct institutional portal, and assist with general enquiries. I cannot access or disclose internal institutional records. How can I help you today?`
);

content = content.replace(
  /<h4 class="font-bold text-sm">JUMO AI Assistant<\/h4>/g,
  `<h4 class="font-bold text-sm">Public Front Desk Assistant</h4>`
);

fs.writeFileSync('experience/gateway/index.js', content, 'utf8');
console.log('Patched AI Assistant in Gateway');
