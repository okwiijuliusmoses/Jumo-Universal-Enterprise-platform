import React, { useState } from 'react';
import { 
  Box, Cloud, Terminal, Briefcase, FlaskConical,
  Edit3, Hexagon, Cpu, CheckSquare, Layers, FileText
} from 'lucide-react';
import { DigitalEcosystemSpecificationForm, EcosystemSpecification } from '../specification/DigitalEcosystemSpecificationForm';
import { useSovereignState } from '../../../hooks/useSovereignState';
import { JumoSpecificationCompiler } from '../../../core/specification/JumoSpecificationCompiler';

interface EcosystemWorkspaceProps {
  ecosystemId: 'eco-erp' | 'eco-cloud' | 'eco-software' | 'eco-commercial' | 'eco-research';
  onNavigate?: (ws: any) => void;
  onGenerateArchitectureContract?: (spec: any) => Promise<void>;
}

export const EcosystemWorkspace: React.FC<EcosystemWorkspaceProps> = ({ ecosystemId, onNavigate, onGenerateArchitectureContract }) => {
  const [activeTab, setActiveTab] = useState<'registry' | 'queue' | 'specifications' | 'architecture' | 'qa' | 'audit'>('registry');
  const { state } = useSovereignState();

  const getEcoData = () => {
    switch (ecosystemId) {
      case 'eco-erp': return { label: 'ERP Ecosystem', icon: Box, color: 'text-blue-600', bg: 'bg-blue-100', category: 'ERP_ECOSYSTEM' };
      case 'eco-cloud': return { label: 'JUMO Cloud Ecosystem', icon: Cloud, color: 'text-cyan-600', bg: 'bg-cyan-100', category: 'JUMO_CLOUD_ECOSYSTEM' };
      case 'eco-software': return { label: 'Software Ecosystem', icon: Terminal, color: 'text-purple-600', bg: 'bg-purple-100', category: 'SOFTWARE_ECOSYSTEM' };
      case 'eco-commercial': return { label: 'Commercial Products Ecosystem', icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100', category: 'COMMERCIAL_PRODUCTS_ECOSYSTEM' };
      case 'eco-research': return { label: 'Research & Innovation Ecosystem', icon: FlaskConical, color: 'text-pink-600', bg: 'bg-pink-100', category: 'RESEARCH_INNOVATION_ECOSYSTEM' };
    }
  };

  const { label, icon: Icon, color, bg, category } = getEcoData();

  // Registry Filter
  const registryRecords = state?.assets.filter(a => a.type === category) || [];

  const quickTemplates = [
    { id: 'milk', name: 'Milk Hub ERP', icon: Box, description: 'Dairy collection, processing & sales' },
    { id: 'coffee', name: 'Coffee Hub ERP', icon: Layers, description: 'Coffee washing, drying & export' },
    { id: 'sacco', name: 'SACCO Hub ERP', icon: Cpu, description: 'Savings, credit & dividends' },
    { id: 'school', name: 'School Hub ERP', icon: FileText, description: 'Academic & financial management' }
  ];

  const handleQuickLaunch = (tplId: string) => {
    const tpl = quickTemplates.find(t => t.id === tplId);
    if (!tpl || !onGenerateArchitectureContract) return;
    
    const compiledSpec = JumoSpecificationCompiler.compileSpecification({
      productName: tpl.name,
      productType: 'General Enterprise ERP',
      productFamily: 'ENTERPRISE_MANAGEMENT',
      purpose: tpl.description,
      sector: 'Private',
      organizationModel: {
        targetOrganization: `${tpl.name} Cooperative`,
        organizationType: 'Cooperative',
        hierarchyNodes: ['Board of Directors', 'Management', 'Operations']
      }
    });

    onGenerateArchitectureContract(compiledSpec);
    setActiveTab('architecture');
  };

  return (
    <div className="space-y-6" id={`workspace-${ecosystemId}`}>
      {/* Ecosystem Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{label}</h2>
          <p className="text-sm text-slate-500">Authoritative manufacturing and registry environment.</p>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="flex space-x-1 border-b border-slate-200 overflow-x-auto hide-scrollbar">
        {[
          { id: 'registry', label: 'Manufactured Registry', icon: Layers },
          { id: 'queue', label: 'Manufacturing Queue', icon: Cpu },
          { id: 'specifications', label: 'Specifications', icon: Edit3 },
          { id: 'architecture', label: 'Architecture Studio', icon: Hexagon },
          { id: 'qa', label: 'QA & Verification', icon: CheckSquare },
          { id: 'audit', label: 'Audit History', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'registry' && (
          <div className="space-y-6">
            {ecosystemId === 'eco-erp' && (
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Quick Launch Hub Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickTemplates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => handleQuickLaunch(tpl.id)}
                      className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-600 hover:shadow-md transition-all text-left group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <tpl.icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{tpl.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{tpl.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Manufactured Registry</h3>
              {registryRecords.length === 0 && <div className="bg-slate-50 p-10 rounded-xl border border-slate-200 border-dashed text-center text-slate-500">No products manufactured in this ecosystem.</div>}
              {registryRecords.map((asset, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{asset.name}</h4>
                  <p className="text-sm text-slate-500">Status: {asset.status} | Step: {asset.step}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${asset.status === 'OPERATIONAL' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                  {asset.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

        {activeTab === 'specifications' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <DigitalEcosystemSpecificationForm 
              onSubmit={async (spec) => {
                if (onGenerateArchitectureContract) {
                  await onGenerateArchitectureContract(spec);
                }
                setActiveTab('architecture');
              }} 
            />
          </div>
        )}
        
        {activeTab === 'architecture' && (
           <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm text-center">
             <Hexagon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-slate-700">Architecture Studio</h3>
             <p className="text-slate-500 mt-2 max-w-md mx-auto">
               Generated Architecture Contracts are reviewed and approved here before being dispatched to the manufacturing queue.
             </p>
           </div>
        )}

        {activeTab === 'queue' && (
          <div className="space-y-4">
            {state?.jobs.filter(j => j.ecosystem === category).length === 0 && <div className="bg-slate-50 p-10 rounded-xl border border-slate-200 border-dashed text-center text-slate-500">No active manufacturing jobs in this queue.</div>}
            {state?.jobs.filter(j => j.ecosystem === category).map((job) => (
              <div key={job.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{job.id}</h4>
                  <p className="text-sm text-slate-500">{job.productId} • Stage: {job.status}</p>
                </div>
                <div className="text-right">
                   <div className="w-24 bg-slate-100 rounded-full h-1 overflow-hidden">
                     <div className="bg-blue-600 h-1 rounded-full transition-all" style={{ width: `${job.progress}%` }}></div>
                   </div>
                   <span className="text-[10px] font-bold text-slate-500 mt-1 block uppercase">{job.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'qa' && (
          <div className="space-y-4">
            {state?.verificationGates.length === 0 && <div className="bg-slate-50 p-10 rounded-xl border border-slate-200 border-dashed text-center text-slate-500">No verification results available.</div>}
            {state?.verificationGates.slice(0, 10).map((gate, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckSquare className={`w-5 h-5 ${gate.status === 'PASS' ? 'text-emerald-500' : 'text-rose-500'}`} />
                  <div>
                    <h4 className="font-bold text-slate-900">{gate.name}</h4>
                    <p className="text-xs text-slate-500">{gate.timestamp}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${gate.status === 'PASS' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {gate.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-3">
            {state?.auditEvents.filter(e => e.details.includes(label) || e.operation.includes('ECOSYSTEM')).length === 0 && (
               <div className="bg-slate-50 p-10 rounded-xl border border-slate-200 border-dashed text-center text-slate-500">No specific audit history for this ecosystem.</div>
            )}
            {state?.auditEvents.filter(e => e.details.includes(label) || e.operation.includes('ECOSYSTEM')).slice(0, 15).map((evt) => (
              <div key={evt.id} className="p-3 bg-white rounded-lg border border-slate-200 text-xs shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-50 pb-1.5 mb-1.5">
                  <span className="font-bold text-indigo-600 uppercase">{evt.operation}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{new Date(evt.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-slate-600">{evt.details}</p>
                <span className="text-[9px] font-bold text-slate-400 mt-1 block uppercase">Operator: {evt.actor}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
