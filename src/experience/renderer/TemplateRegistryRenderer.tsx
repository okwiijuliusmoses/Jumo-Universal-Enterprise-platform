import React, { useState, useEffect } from 'react';
import { Layers, Database, Shield, Layout, Settings2, Play, Search, Network } from 'lucide-react';
import { JUMO_STUDIO_REGISTRY } from '../../core/hub/studios/JumoStudioRegistry';
import { UniversalHubRegistry } from '../../core/factory/registry/UniversalHubRegistry';

// We promote the Template Registry Renderer to Provisioning Studio.
export interface EnterprisePlatformRegistryProps {
  onConfigureInFactory?: (templateId: string) => void;
}

export function EnterprisePlatformRegistryRenderer({ onConfigureInFactory }: EnterprisePlatformRegistryProps) {
  const [templates, setTemplates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Read from the actual authoritative registry
    const records = UniversalHubRegistry.getPlatforms();
    setTemplates(records);
  }, []);

  const filtered = templates.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.registryId?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Provisioning Studio</h2>
          </div>
          <p className="text-sm text-slate-500 font-medium">Discover templates and configure platform instances before manufacturing.</p>
        </div>
        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(template => (
          <div key={template.registryId} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:border-slate-300 hover:shadow-sm transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${template.lifecycleState === 'OPERATIONAL' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                {template.lifecycleState}
              </span>
            </div>
            
            <h3 className="text-lg font-black text-slate-900 mb-2">{template.name}</h3>
            <p className="text-xs text-slate-500 mb-6 flex-1 line-clamp-3">
              {template.metadata?.description || "Authoritative platform template definition."}
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="flex items-center gap-1.5"><Layout className="w-3.5 h-3.5" /> Capabilities</span>
                <span className="text-slate-900">{(template.capabilities || []).length}</span>
              </div>
              
              <button 
                onClick={() => onConfigureInFactory?.(template.registryId)}
                className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Configure Instance
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center opacity-50">
            <Network className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-sm font-black text-slate-900 uppercase">No templates found</p>
            <p className="text-xs text-slate-500 font-bold">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
