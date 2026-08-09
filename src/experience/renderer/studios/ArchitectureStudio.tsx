import React from 'react';
import { motion } from 'motion/react';
import { 
  FileSignature, Layers, Shield, Box, Cpu, Sparkles, 
  CheckCircle2, AlertCircle, ArrowRight, Zap, FileText,
  Search, Sliders, Settings, Globe, ShieldCheck
} from 'lucide-react';
import { ArchitectureContract } from '../../../core/factory/registry/HubRegistryTypes';

interface ArchitectureRequest {
  id: string;
  title: string;
  problem: string;
  targetUsers: string;
  organization: string;
  capabilities: string[];
  infrastructure: string;
  integrations: string[];
  aiRequirements: string;
  ecosystemType: string;
  sector: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'COMPILED';
  createdAt: string;
}

interface ArchitectureStudioProps {
  requests: ArchitectureRequest[];
  contracts: ArchitectureContract[];
  onCreateContract: (requestId: string) => void;
  onApproveContract: (contractId: string) => void;
  onLaunchManufacturing: (contractId: string) => void;
}

export const ArchitectureStudio: React.FC<ArchitectureStudioProps> = ({
  requests,
  contracts,
  onCreateContract,
  onApproveContract,
  onLaunchManufacturing
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Architecture Studio</h2>
            <p className="text-xs text-slate-500 font-medium">Authoritative Specification & Architecture Contract Governance Control Surface</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Requests & Specifications */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Intake Specifications</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{(requests ?? []).length} Pending</span>
            </div>
            
            <div className="space-y-3">
              {(requests ?? []).filter(r => r.status === 'DRAFT' || r.status === 'REVIEW').map((req) => (
                <motion.div 
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase">{req.id}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900 line-clamp-1">{req.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{req.problem}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase">STATUS: <span className="text-slate-700">{req.status}</span></span>
                    <button 
                      onClick={() => onCreateContract(req.id)}
                      className="px-2.5 py-1 bg-slate-900 text-white text-[9px] font-black rounded-lg uppercase tracking-wider hover:bg-blue-600 transition-colors"
                    >
                      Generate Contract
                    </button>
                  </div>
                </motion.div>
              ))}
              {(requests ?? []).filter(r => r.status === 'DRAFT' || r.status === 'REVIEW').length === 0 && (
                <div className="py-8 text-center space-y-2 opacity-40">
                  <FileText className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase">No pending specifications</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Active Contracts */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Authoritative Architecture Contracts</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">{(contracts ?? []).filter(c => c.status === 'LOCKED').length} Locked</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-full">{(contracts ?? []).filter(c => c.status === 'DRAFT').length} Draft</span>
              </div>
            </div>

            <div className="space-y-4">
              {(contracts ?? []).map((contract) => (
                <motion.div 
                  key={contract.id}
                  layout
                  className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${contract.status === 'LOCKED' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        {contract.status === 'LOCKED' ? <ShieldCheck className="w-6 h-6" /> : <FileSignature className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{contract.id}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">VERSION {contract.version}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900">{contract.productIdentity.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        contract.status === 'LOCKED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {contract.status === 'LOCKED' ? 'LOCKED ARCHITECTURE CONTRACT' : 'DRAFT ARCHITECTURE'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Target Ecosystem</span>
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Box className="w-3 h-3 text-blue-500" />
                        {contract.productIdentity.ecosystem.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Assigned Agents</span>
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-purple-500" />
                        {(contract.aiArchitecture?.assignedAgents ?? []).length} Swarm Nodes
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Security Layer</span>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <Shield className="w-3 h-3" />
                        {contract.securityArchitecture?.authentication || 'MFA-SAML'}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Last Verification</span>
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {new Date(contract.updatedAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Expanded View for Contract Details */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px]">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                        <Cpu className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-black uppercase text-slate-800 tracking-wider">Functional Architecture</span>
                      </div>
                      <div className="space-y-2 text-slate-600">
                        <div className="flex justify-between"><span>Core Modules:</span> <span className="font-bold text-slate-900">{(contract.functionalArchitecture?.modules ?? []).join(', ')}</span></div>
                        <div className="flex justify-between"><span>Capabilities:</span> <span className="font-bold text-slate-900">{(contract.functionalArchitecture?.capabilities ?? []).join(', ')}</span></div>
                        <div className="flex justify-between"><span>Services:</span> <span className="font-bold text-slate-900">{(contract.functionalArchitecture?.services ?? []).join(', ')}</span></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-black uppercase text-slate-800 tracking-wider">Deployment Architecture</span>
                      </div>
                      <div className="space-y-2 text-slate-600">
                        <div className="flex justify-between"><span>Target Infra:</span> <span className="font-bold text-slate-900">{contract.deploymentArchitecture?.target || 'Sovereign Cluster'}</span></div>
                        <div className="flex justify-between"><span>Scaling Mode:</span> <span className="font-bold text-slate-900">{contract.deploymentArchitecture?.scaling || 'Auto'}</span></div>
                        <div className="flex justify-between"><span>Regionality:</span> <span className="font-bold text-slate-900">{(contract.deploymentArchitecture?.regionalDeployment ?? []).join(', ')}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all">
                      View Full Manifest
                    </button>
                    {contract.status === 'DRAFT' && (
                      <button 
                        onClick={() => onApproveContract(contract.id)}
                        className="px-6 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-sm"
                      >
                        Lock Architecture Contract
                      </button>
                    )}
                    {contract.status === 'LOCKED' && (
                      <button 
                        onClick={() => onLaunchManufacturing(contract.id)}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        Initialize Manufacturing
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {(contracts ?? []).length === 0 && (
                <div className="py-20 text-center space-y-4 opacity-40">
                  <Layers className="w-16 h-16 mx-auto text-slate-300" />
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase">No active architecture contracts</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Generate a contract from an approved specification to begin.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
