import React, { useState } from 'react';
import { 
  Box, Cloud, Terminal, Briefcase, FlaskConical,
  Edit3, Hexagon, Cpu, CheckSquare, Layers, FileText
} from 'lucide-react';
import { DigitalEcosystemSpecificationForm, EcosystemSpecification } from '../specification/DigitalEcosystemSpecificationForm';
import { useSovereignState } from '../../../hooks/useSovereignState';

interface EcosystemWorkspaceProps {
  ecosystemId: 'eco-erp' | 'eco-cloud' | 'eco-software' | 'eco-commercial' | 'eco-research';
  onNavigate?: (ws: any) => void;
  onGenerateArchitectureContract?: (spec: EcosystemSpecification) => Promise<void>;
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
          <div className="space-y-4">
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

        {/* Placeholders for other tabs for now */}
        {['queue', 'qa', 'audit'].includes(activeTab) && (
          <div className="bg-slate-50 p-10 rounded-xl border border-slate-200 border-dashed text-center">
            <h3 className="text-lg font-bold text-slate-700 capitalize">{activeTab}</h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              This module operates securely within the {label} and is connected to the central UEOS Sovereign State.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
