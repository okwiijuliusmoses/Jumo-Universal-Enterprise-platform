
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Layers, 
  Shield, 
  ChevronRight, 
  Search, 
  Filter,
  Grid,
  List as ListIcon,
  BookOpen,
  Workflow,
  Plus
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function TemplateRegistryRenderer() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const data = await UEOSRuntimeClient.fetchTemplates();
        setTemplates(data || []);
      } catch (err) {
        console.error("Template loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTemplates();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-10 bg-slate-200 rounded-lg w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-slate-200 rounded-3xl" />)}
      </div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Enterprise Template Registry</h2>
          <p className="text-slate-500">Sovereign blueprints for institutional operating platforms.</p>
        </div>
        
        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
          <Plus className="w-4 h-4" />
          Propose Template
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input 
          type="text" 
          placeholder="Search blueprints by name, version, or industry..." 
          className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
        <Filter className="w-4 h-4 text-slate-400 mr-2" />
      </div>

      {templates.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Layers className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Registered Blueprints</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            The template registry is empty. Deploy a national blueprint to the kernel to enable platform manufacturing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {templates.map((template, i) => (
            <TemplateCard key={template.id} template={template} i={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function TemplateCard({ template, i }: any) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: i * 0.1 }}
      className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Layers className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-900 leading-tight">{template.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest">
                v{template.version}
              </span>
              <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-widest">
                {template.ecosystemId}
              </span>
            </div>
          </div>
        </div>
        <button className="text-blue-600 font-bold text-xs hover:underline">Blueprint Specs</button>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed mb-8">
        {template.description}
      </p>

      <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Governance</span>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-700">Multi-Tier</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Portals</span>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-700">{template.portals?.length || 0} Portals</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Workflows</span>
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-700">{template.workflows?.length || 0} Flows</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
