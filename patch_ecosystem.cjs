const fs = require('fs');

const content = `import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Layers, 
  Shield, 
  ChevronRight, 
  Globe, 
  Search, 
  Filter,
  Grid,
  List as ListIcon,
  ArrowLeft,
  Cpu,
  Database,
  Lock,
  Terminal
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function RuntimeWorkspaceRenderer() {
  const [ecosystems, setEcosystems] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedEcosystem, setSelectedEcosystem] = useState<any>(null);

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const [ecoData, tplData] = await Promise.all([
          UEOSRuntimeClient.fetchEcosystems(),
          UEOSRuntimeClient.fetchTemplates()
        ]);
        setEcosystems(ecoData || []);
        setTemplates(tplData || []);
      } catch (err) {
        console.error("Workspace loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadWorkspace();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-10 bg-slate-200 rounded-lg w-1/4" />
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-200 rounded-2xl" />)}
      </div>
    </div>;
  }

  if (selectedEcosystem) {
    const ecosystemTemplates = templates.filter(t => t.ecosystemId === selectedEcosystem.id);
    return <EcosystemWorkspace ecosystem={selectedEcosystem} templates={ecosystemTemplates} onBack={() => setSelectedEcosystem(null)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Enterprise Ecosystems</h2>
          <p className="text-slate-500">Global registry of sovereign enterprise boundaries.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="bg-white border border-slate-200 rounded-xl p-1 flex items-center shadow-sm">
             <button
               onClick={() => setViewMode("grid")}
              className={\`p-1.5 rounded-lg transition-colors \${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}\`}
             >
               <Grid className="w-4 h-4" />
             </button>
             <button
               onClick={() => setViewMode("list")}
              className={\`p-1.5 rounded-lg transition-colors \${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}\`}
             >
               <ListIcon className="w-4 h-4" />
             </button>
           </div>
           <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
             <Plus className="w-4 h-4" />
             Register Ecosystem
           </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input 
          type="text" 
          placeholder="Filter ecosystems by name, domain, or ID..." 
          className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
        <div className="h-6 w-[1px] bg-slate-100" />
        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 px-3">
          <Filter className="w-4 h-4" />
          Advanced Filters
        </button>
      </div>

      {ecosystems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Globe className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Registered Ecosystems</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-8">
            The UEOS Runtime is currently waiting for ecosystem registration. Connect to the registry service to begin provisioning.
          </p>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all">
            Initiate Registry Synchronization
          </button>
        </motion.div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
          {ecosystems.map((ecosystem, i) => (
            <EnterpriseEcosystemCard 
              key={ecosystem.id} 
              ecosystem={ecosystem} 
              i={i} 
              viewMode={viewMode} 
              templatesCount={templates.filter(t => t.ecosystemId === ecosystem.id).length}
              onClick={() => setSelectedEcosystem(ecosystem)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EnterpriseEcosystemCard({ ecosystem, i, viewMode, templatesCount, onClick }: any) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: i * 0.1 }}
      className={\`bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all overflow-hidden flex flex-col \${
        viewMode === "grid" ? "rounded-3xl h-full" : "rounded-2xl p-4 flex-row items-center gap-6"
      }\`}
    >
      <div className={\`\${viewMode === "grid" ? "p-6 border-b border-slate-100" : "flex items-center gap-4 flex-1"}\`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 border border-slate-200">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg leading-tight">{ecosystem.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase tracking-tighter">
                {ecosystem.category || "Enterprise"}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{ecosystem.id}</span>
            </div>
          </div>
        </div>
        <p className={\`text-slate-600 text-sm leading-relaxed \${viewMode === "grid" ? "line-clamp-2" : "line-clamp-1"}\`}>
          {ecosystem.description}
        </p>
      </div>

      <div className={\`\${viewMode === "grid" ? "p-6 bg-slate-50 flex-1 flex flex-col justify-between gap-6" : "flex items-center gap-6 pr-4"}\`}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Templates</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Layers className="w-4 h-4 text-indigo-500" />
              {templatesCount} Active
            </div>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Instances</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Database className="w-4 h-4 text-emerald-500" />
              {ecosystem.instancesCount || 0} Nodes
            </div>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Governance</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Shield className="w-4 h-4 text-amber-500" />
              {ecosystem.governance?.type || "Standard"}
            </div>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Security</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Lock className="w-4 h-4 text-red-500" />
              {ecosystem.securityClassification || "Restricted"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <button onClick={onClick} className="flex-1 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
            View Templates
          </button>
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Create ERP
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function EcosystemWorkspace({ ecosystem, templates, onBack }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Ecosystems
      </button>

      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Globe className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {ecosystem.category || "Enterprise"} Ecosystem
            </span>
            <span className="text-slate-400 text-sm font-mono">{ecosystem.id}</span>
          </div>
          <h2 className="text-3xl font-black mb-4">{ecosystem.name}</h2>
          <p className="text-slate-400 leading-relaxed text-lg mb-8">
            {ecosystem.description}
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New ERP Instance
            </button>
            <button className="bg-slate-800 text-white border border-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">
              Manage Ecosystem
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 mb-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-500" />
          Available ERP Blueprints
        </h3>
      </div>

      <div className="space-y-6">
        {templates.map((template: any) => (
          <div key={template.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-xl font-bold text-slate-900">{template.name}</h4>
                <p className="text-slate-500 text-sm mt-1">{template.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Governance</span>
                  <span className="text-sm font-bold text-slate-700">{template.governance?.title || "Standard Board"}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Security</span>
                  <span className="text-sm font-bold text-slate-700">{template.securityClassification || "Restricted"}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                 <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold border border-blue-100">
                   {template.availableModules?.length || 0} Modules
                 </span>
                 <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                   {template.workflows?.length || 0} Workflows
                 </span>
                 <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold border border-purple-100">
                   {template.portals?.length || 0} Portals
                 </span>
                 <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold border border-amber-100">
                   {template.forms?.length || 0} Forms
                 </span>
              </div>
            </div>
            
            <div className="w-full md:w-64 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
               <button className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2">
                 <Terminal className="w-4 h-4" />
                 Provision ERP
               </button>
               <button className="w-full bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                 View Schema Details
               </button>
            </div>
          </div>
        ))}
        {templates.length === 0 && (
           <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-medium">
             No ERP templates currently registered in this ecosystem.
           </div>
        )}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/experience/renderer/RuntimeWorkspaceRenderer.tsx', content);
