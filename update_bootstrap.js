const fs = require('fs');
let content = fs.readFileSync('platform/control/registry/RegistryBootstrap.js', 'utf8');

const replacement = `import { erpRecoveryEngine } from "../../factory/erp/recovery/ERPRecoveryEngine.js";

export function bootstrapEnterprisePlatform() {
  console.log("[UEOS] Bootstrapping Enterprise Platform Ecosystem...");
  return erpRecoveryEngine.auditAndRecover();
}
`;

content = content.replace(/export function bootstrapEnterprisePlatform\(\) \{[\s\S]*\}$/, replacement);
fs.writeFileSync('platform/control/registry/RegistryBootstrap.js', content);
