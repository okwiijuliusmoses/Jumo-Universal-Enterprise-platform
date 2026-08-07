const fs = require('fs');

// Patch UniversalERPFactory
let factory = fs.readFileSync('src/core/runtime/universalERPFactory.ts', 'utf8');
factory = factory.replace(
  `static manufacture(templateId: string, config: { name: string; country: string; region: string; operator: string }): EnterpriseInstance {`,
  `static manufacture(templateId: string, config: { name: string; country: string; region: string; operator: string }, signature: string): EnterpriseInstance {`
);
factory = factory.replace(/\"JUMO-VALID-SIG-2026\"/g, "signature");
fs.writeFileSync('src/core/runtime/universalERPFactory.ts', factory);

// Patch server.ts
let server = fs.readFileSync('server.ts', 'utf8');
server = server.replace(
  `const { templateId, config } = req.body;`,
  `const { templateId, config, signature } = req.body;`
);
server = server.replace(
  `UniversalERPFactory.manufacture(templateId, config);`,
  `UniversalERPFactory.manufacture(templateId, config, signature);`
);
fs.writeFileSync('server.ts', server);

// Patch UEOSRuntimeClient
let client = fs.readFileSync('src/ueos/runtime/UEOSRuntimeClient.ts', 'utf8');
client = client.replace(
  `static async provisionPlatform(templateId: string, config: any) {`,
  `static async provisionPlatform(templateId: string, config: any, signature: string) {`
);
client = client.replace(
  `body: JSON.stringify({ templateId, config })`,
  `body: JSON.stringify({ templateId, config, signature })`
);
fs.writeFileSync('src/ueos/runtime/UEOSRuntimeClient.ts', client);

// Patch EnterpriseFactory.tsx
let ui = fs.readFileSync('src/experience/renderer/EnterpriseFactory.tsx', 'utf8');
ui = ui.replace(
  `const data = await UEOSRuntimeClient.provisionPlatform(selectedTemplate.id, config);`,
  `const data = await UEOSRuntimeClient.provisionPlatform(selectedTemplate.id, config, secOpsSignature);`
);
fs.writeFileSync('src/experience/renderer/EnterpriseFactory.tsx', ui);

