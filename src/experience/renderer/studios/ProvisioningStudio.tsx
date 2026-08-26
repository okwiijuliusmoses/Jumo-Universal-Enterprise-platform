import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, Search, Layers, Zap, CheckCircle2, RefreshCw, Package, FileText, Settings, Play
} from 'lucide-react';
import { UniversalHubRegistry } from '../../../core/factory/registry/UniversalHubRegistry';

interface ProvisioningStudioProps {
  onProvisionPlatform: (templateId: string, config: any) => void;
}

export const ProvisioningStudio: React.FC<ProvisioningStudioProps> = ({ onProvisionPlatform }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const templates = UniversalHubRegistry.getERPTemplates();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Provisioning & Configuration Studio</h2>
        <p className="text-xs text-slate-500 font-medium">Select a platform template and configure instance parameters for manufacturing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Available Templates</h3>
          {templates.map(template => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplateId(template.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedTemplateId === template.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="font-bold text-xs text-slate-900 block">{template.name}</span>
              <span className="text-[9px] text-slate-500 block truncate">{template.description}</span>
            </button>
          ))}
        </div>

        {/* Configuration Surface */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {selectedTemplateId ? (
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Configure Platform Instance</h3>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-slate-600">Selected: {templates.find(t => t.id === selectedTemplateId)?.name}</span>
              </div>
              
              {/* Form placeholder for configuration */}
              <div className="space-y-4">
                <input type="text" placeholder="Instance Name" className="w-full p-2 border border-slate-200 rounded" />
                <select className="w-full p-2 border border-slate-200 rounded">
                  <option>National Government</option>
                  <option>Regional</option>
                </select>
              </div>

              <button 
                onClick={() => onProvisionPlatform(selectedTemplateId, {})}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Play className="w-3 h-3" /> Initiate Manufacturing Job
              </button>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 font-bold uppercase text-xs">Select a template to configure</div>
          )}
        </div>
      </div>
    </div>
  );
};
