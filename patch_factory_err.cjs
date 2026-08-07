const fs = require('fs');
let content = fs.readFileSync('src/experience/renderer/EnterpriseFactory.tsx', 'utf8');

content = content.replace(
  `const [secOpsSignature, setSecOpsSignature] = useState("");`,
  `const [secOpsSignature, setSecOpsSignature] = useState("");\n  const [provisionError, setProvisionError] = useState("");`
);

content = content.replace(
  `} catch (err: any) {`,
  `} catch (err: any) {\n      setProvisionError(err.message || "Failed to manufacture platform.");\n      console.error(err);`
);

const oldConfigFieldsWithSig = `              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Operator Authority</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Ministry of Education"
                  value={config.operator}
                  onChange={e => setConfig({...config, operator: e.target.value})}
                />
              </div>
            </div>
            
            <div className="mt-8 bg-red-50 border border-red-200 p-6 rounded-2xl space-y-4">`;

const newConfigFieldsWithSig = `              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Operator Authority</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Ministry of Education"
                  value={config.operator}
                  onChange={e => setConfig({...config, operator: e.target.value})}
                />
              </div>
            </div>
            
            {provisionError && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 font-bold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {provisionError}
              </div>
            )}
            
            <div className="mt-8 bg-red-50 border border-red-200 p-6 rounded-2xl space-y-4">`;

content = content.replace(oldConfigFieldsWithSig, newConfigFieldsWithSig);

fs.writeFileSync('src/experience/renderer/EnterpriseFactory.tsx', content);
