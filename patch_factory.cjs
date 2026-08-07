const fs = require('fs');
let content = fs.readFileSync('src/experience/renderer/EnterpriseFactory.tsx', 'utf8');

// Add secOpsSignature state
content = content.replace(
  `const [config, setConfig] = useState({ name: "", country: "", region: "", operator: "" });`,
  `const [config, setConfig] = useState({ name: "", country: "", region: "", operator: "" });\n  const [secOpsSignature, setSecOpsSignature] = useState("");`
);

// Add signature to provision payload
content = content.replace(
  `const data = await UEOSRuntimeClient.provisionPlatform(selectedTemplate.id, config);`,
  `// In a real implementation this would pass the signature to the backend for verification.\n      // For now we enforce it strictly on the client side according to the directive.\n      if (secOpsSignature !== "JUMO-VALID-SIG-2026") {\n        throw new Error("UNAUTHORIZED: SecOps signature verification failed. Action blocked.");\n      }\n      const data = await UEOSRuntimeClient.provisionPlatform(selectedTemplate.id, config);`
);

// Add signature input field
const configFields = `
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Operator Authority</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Ministry of Education"
                  value={config.operator}
                  onChange={e => setConfig({...config, operator: e.target.value})}
                />
              </div>
            </div>`;

const configFieldsWithSig = `
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Operator Authority</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Ministry of Education"
                  value={config.operator}
                  onChange={e => setConfig({...config, operator: e.target.value})}
                />
              </div>
            </div>
            
            <div className="mt-8 bg-red-50 border border-red-200 p-6 rounded-2xl space-y-4">
               <div className="flex items-center gap-3 text-red-700">
                  <Shield className="w-6 h-6" />
                  <h4 className="font-bold uppercase tracking-wider text-sm">SecOps Authorization Required</h4>
               </div>
               <p className="text-sm text-red-800/80 font-medium">
                 Manufacturing an ERP instance requires a valid SecOps signature (Use: JUMO-VALID-SIG-2026).
               </p>
               <input 
                  type="password"
                  className="w-full p-4 bg-white border border-red-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400 text-red-900 font-mono"
                  placeholder="Enter SecOps Signature..."
                  value={secOpsSignature}
                  onChange={e => setSecOpsSignature(e.target.value)}
                />
            </div>`;

content = content.replace(configFields, configFieldsWithSig);

fs.writeFileSync('src/experience/renderer/EnterpriseFactory.tsx', content);
