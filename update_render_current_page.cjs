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
    
    // Simulate finding forms and workflows linked to this module
    const linkedForms = FormRegistry.filter(f => f.moduleId === activeModuleDef.id);
    const linkedReports = ReportRegistry.filter(r => r.moduleId === activeModuleDef.id);
    
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{activeModuleDef?.displayName}</h2>
            <p className="text-sm text-slate-500">{activeModuleDef?.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {linkedForms.length > 0 && <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold">New Entry</button>}
            {linkedReports.length > 0 && <button className="px-3 py-1.5 bg-slate-50 text-slate-700 border border-slate-200 rounded text-xs font-semibold">Reports</button>}
          </div>
        </div>
        
        <div className="p-6 flex-1 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
               <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Module ID</div>
               <div className="text-sm font-mono text-slate-800">{activeModuleDef.id}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
               <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Forms / Workflows</div>
               <div className="text-sm font-medium text-slate-800">{linkedForms.length} Linked Objects</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
               <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Security Clearance</div>
               <div className="text-sm font-medium text-emerald-600">Authorized for {activePortalId}</div>
            </div>
          </div>
          
          <div className="text-center text-slate-400 mt-12">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">Registry Module Mapped & Ready</h3>
            <p className="text-sm max-w-md mx-auto">
              This is a standard JUMO Digital Hybrid Platform capability. 
              Forms, workflows, and integrations for <strong>{activeModuleDef?.displayName}</strong> are governed by the central platform registry.
            </p>
          </div>
        </div>
      </div>
    );
  };
`;

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  
  // Replace the old renderCurrentPage with the new one
  c = c.replace(/const renderCurrentPage = \(\) => \{[\s\S]*?return \([\s\S]*?\);\n  \};\n/g, fallbackRender);
  
  // Also fix missing FormRegistry/ReportRegistry imports if they exist
  if (!c.includes('FormRegistry')) {
     c = c.replace("ModuleRegistry } from '../../registries'", "ModuleRegistry, FormRegistry, ReportRegistry } from '../../registries'");
  }
  
  fs.writeFileSync(f, c);
});
console.log("Replaced renderCurrentPage");
