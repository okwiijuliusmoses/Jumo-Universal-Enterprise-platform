const fs = require('fs');
let content = fs.readFileSync('platform/workspace/ERPWorkspaceResolver.js', 'utf8');

const importStatement = `import { erpRecoveryEngine } from "../factory/erp/recovery/ERPRecoveryEngine.js";\n`;
if (!content.includes('ERPRecoveryEngine.js')) {
    content = importStatement + content;
}

const resolveFnOriginal = `resolveWorkspace(tenantId, erpId) {
    const instance = erpInstanceRegistry.get(erpId);
    if (!instance) {
      throw new Error(\`ERP Instance \${erpId} not found or not active.\`);
    }`;

const resolveFnNew = `resolveWorkspace(tenantId, erpId) {
    let instance = erpInstanceRegistry.get(erpId);
    if (!instance) {
      console.log(\`[UEOS] ERP Instance \${erpId} not found. Triggering recovery...\`);
      erpRecoveryEngine.auditAndRecover();
      instance = erpInstanceRegistry.get(erpId);
      if (!instance) {
        throw new Error(\`ERP Instance \${erpId} not found or not active.\`);
      }
    }`;

content = content.replace(resolveFnOriginal, resolveFnNew);
fs.writeFileSync('platform/workspace/ERPWorkspaceResolver.js', content);
