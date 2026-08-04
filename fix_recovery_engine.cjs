const fs = require('fs');
let content = fs.readFileSync('platform/factory/erp/recovery/ERPRecoveryEngine.js', 'utf8');

content = content.replace(/id: \`\$\{product\.id\}-instance\`,/g, `id: \`\$\{product.id\}-instance\`, instanceId: \`\$\{product.id\}-instance\`,`);

fs.writeFileSync('platform/factory/erp/recovery/ERPRecoveryEngine.js', content);
console.log('Fixed ERPRecoveryEngine');
