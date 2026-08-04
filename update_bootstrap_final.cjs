const fs = require('fs');
let content = fs.readFileSync('platform/control/registry/RegistryBootstrap.js', 'utf8');

const importStatement = `import { erpRecoveryEngine } from "../../factory/erp/recovery/ERPRecoveryEngine.js";\n`;
if (!content.includes('ERPRecoveryEngine.js')) {
    content = importStatement + content;
}

const replacement = `export function bootstrapEnterprisePlatform() {
  console.log("[UEOS] Bootstrapping Enterprise Platform Ecosystem...");
  return erpRecoveryEngine.auditAndRecover();
}`;

content = content.replace(/export function bootstrapEnterprisePlatform\(\) \{[\s\S]*$/, replacement);
fs.writeFileSync('platform/control/registry/RegistryBootstrap.js', content);
