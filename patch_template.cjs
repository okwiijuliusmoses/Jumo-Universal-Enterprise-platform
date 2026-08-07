const fs = require('fs');
const content = `import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Layers, 
  Globe, 
  ArrowRight,
  Shield,
  Activity
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function TemplateRegistryRenderer() {
  const [ecosystems, setEcosystems] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [ecoData, tplData] = await Promise.all([
          UEOSRuntimeClient.fetchEcosystems(),
          UEOSRuntimeClient.fetchTemplates()
        ]);
        setEcosystems(ecoData || []);
        setTemplates(tplData || []);
      } catch (err) {
        console.error("Template registry loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Template Marketplace</h2>
        <p className="text-slate-500">ERP Blueprints mapped to their sovereign ecosystems.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl flex items-start gap-4">
         <Shield className="w-6 h-6 flex-shrink-0 text-blue-600" />
         <div>
           <h4 className="font-bold text-blue-900 uppercase tracking-wider text-sm">Architectural Directive</h4>
           <p className="text-sm text-blue-800 opacity-90 leading-relaxed mt-1">
             Templates must never appear independently without their parent ecosystem. 
             They are strictly bound to their ecosystem governance structure.
           </p>
         </div>
      </div>

      <div className="space-y-12">
        {ecosystems.map((ecosystem) => {
          const ecoTemplates = templates.filter(t => t.ecosystemId === ecosystem.id);
          if (ecoTemplates.length === 0) return null;
          
          return (
            <div key={ecosystem.id} className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
                <Globe className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-black text-slate-800">{ecosystem.name}</h3>
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">
                  {ecoTemplates.length} Blueprints
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ecoTemplates.map((template, i) => (
                  <motion.div
                    key={template.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 leading-tight">{template.name}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{template.id}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 h-10">
                      {template.description}
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 font-bold text-sm py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      View in Ecosystem <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/experience/renderer/TemplateRegistryRenderer.tsx', content);
