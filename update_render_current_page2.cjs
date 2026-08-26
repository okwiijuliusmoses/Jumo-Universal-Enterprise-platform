const fs = require('fs');

const files = [
  'src/products/digital-pay/web/DigitalPayWebShell.tsx',
  'src/products/faap/web/FaapWebShell.tsx',
  'src/products/church-erp/web/ChurchErpWebShell.tsx',
  'src/products/education-erp/web/EducationErpWebShell.tsx'
];

const fallbackRender = `
  const renderCurrentPage = () => {
    const activeModuleDef = ModuleRegistry.find(m => m.id === activeTab);
    if (!activeModuleDef) return null;
    
    const linkedForms = FormRegistry.filter(f => f.moduleId === activeModuleDef.id);
    const linkedWorkflows = WorkflowRegistry.filter(w => w.name.toUpperCase().includes(activeModuleDef.name.toUpperCase()) || w.displayName.toUpperCase().includes(activeModuleDef.displayName.toUpperCase()));
    
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full min-h-[500px]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{activeModuleDef.displayName}</h2>
            <p className="text-sm text-slate-500 mt-1">{activeModuleDef.description}</p>
          </div>
          <div className="flex items-center gap-3">
            {linkedWorkflows.length > 0 && <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-semibold text-xs rounded border border-emerald-200">Active Workflow Engine</span>}
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-mono text-[10px] font-bold rounded border border-blue-200">{activeModuleDef.id}</span>
          </div>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          {linkedForms.length > 0 ? (
            <div className="space-y-8">
              {linkedForms.map((form: any) => (
                <div key={form.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-3xl">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-800">{form.name}</h3>
                    <p className="text-xs text-slate-500">Universal Form Engine ID: {form.id}</p>
                  </div>
                  <div className="p-6">
                    <form onSubmit={e => e.preventDefault()} className="space-y-5">
                      {form.fields.map((field: any) => (
                        <div key={field.id}>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {field.type === 'select' ? (
                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow">
                              <option value="">Select {field.label}</option>
                              {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          ) : (
                            <input 
                              type={field.type} 
                              required={field.required}
                              placeholder={\`Enter \${field.label.toLowerCase()}\`}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            />
                          )}
                        </div>
                      ))}
                      <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        <button type="button" className="px-5 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                        <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">Submit Record</button>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Module Initialized</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                The core capabilities for <strong>{activeModuleDef.displayName}</strong> are loaded into the Universal Workflow Engine. Authorized personnel can provision new forms and data schemas through the Configuration Center.
              </p>
            </div>
          )}
          
          {linkedWorkflows.length > 0 && (
             <div className="mt-8 pt-8 border-t border-slate-200 max-w-3xl">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Active State Machine</h3>
               {linkedWorkflows.map((wf: any) => (
                 <div key={wf.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                   <div className="font-semibold text-slate-800 mb-1">{wf.displayName} Workflow</div>
                   <div className="text-xs text-slate-500 mb-3">{wf.description}</div>
                   <div className="flex flex-wrap items-center gap-2">
                     {wf.states.map((st: string, idx: number) => (
                       <React.Fragment key={st}>
                         <div className={\`px-2 py-1 text-[10px] font-bold rounded \${st === wf.initialState ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-slate-600 border border-slate-200'}\`}>
                           {st}
                         </div>
                         {idx < wf.states.length - 1 && <div className="text-slate-300 text-xs">→</div>}
                       </React.Fragment>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>
    );
  };
`;

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  
  // Replace the old renderCurrentPage with the new dynamic form renderer
  c = c.replace(/const renderCurrentPage = \(\) => \{[\s\S]*?return \([\s\S]*?\);\n  \};\n/g, fallbackRender);
  
  // Make sure React.Fragment is available
  if (!c.includes('import React')) {
     c = "import React from 'react';\n" + c;
  }
  
  // Ensure WorkflowRegistry is imported
  if (!c.includes('WorkflowRegistry')) {
     c = c.replace("ModuleRegistry, FormRegistry, ReportRegistry", "ModuleRegistry, FormRegistry, ReportRegistry, WorkflowRegistry");
     if (!c.includes('WorkflowRegistry')) {
         c = c.replace("ModuleRegistry }", "ModuleRegistry, FormRegistry, ReportRegistry, WorkflowRegistry }");
     }
  }

  fs.writeFileSync(f, c);
});
console.log("Replaced renderCurrentPage with dynamic form engine");
