
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Layers, 
  Shield, 
  ChevronRight, 
  Globe, 
  Search, 
  Filter,
  Grid,
  List as ListIcon
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function RuntimeWorkspaceRenderer() {
  const [ecosystems, setEcosystems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const data = await UEOSRuntimeClient.fetchEcosystems();
        setEcosystems(data || []);
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Enterprise Ecosystems</h2>
          <p className="text-slate-500">Global registry of sovereign enterprise boundaries.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="bg-white border border-slate-200 rounded-xl p-1 flex items-center shadow-sm">
             <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
             >
               <Grid className="w-4 h-4" />
             </button>
             <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
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
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {ecosystems.map((ecosystem, i) => (
            <EnterpriseEcosystemCard key={ecosystem.id} ecosystem={ecosystem} i={i} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

function EnterpriseEcosystemCard({ ecosystem, i, viewMode }: any) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: i * 0.1 }}
      className={`bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all overflow-hidden ${
        viewMode === "grid" ? "rounded-3xl p-6 flex flex-col h-full" : "rounded-2xl p-4 flex items-center gap-6"
      }`}
    >
      <div className={`flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 ${viewMode === "list" ? "w-12 h-12" : "mb-6"}`}>
        <Layers className={viewMode === "list" ? "w-6 h-6" : "w-8 h-8"} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-slate-900 truncate">{ecosystem.name}</h4>
          <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">
            {ecosystem.id}
          </span>
        </div>
        <p className={`text-slate-500 leading-relaxed ${viewMode === "grid" ? "text-sm line-clamp-2" : "text-xs truncate"}`}>
          {ecosystem.description}
        </p>
      </div>

      <div className={viewMode === "grid" ? "mt-auto pt-6 flex items-center justify-between" : "flex items-center gap-8 pr-4"}>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Templates</span>
          <span className="font-bold text-slate-700">{ecosystem.templateCount || 0} Blueprints</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-600">Active</span>
          </div>
        </div>
        <button className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
