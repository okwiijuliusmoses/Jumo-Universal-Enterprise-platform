import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSignature, Layers, Shield, Box, Cpu, Sparkles, 
  CheckCircle2, AlertCircle, ArrowRight, Zap, FileText,
  Sliders, Settings, Globe, ShieldCheck, Plus, Terminal, 
  RefreshCw, BarChart2, ShieldAlert, Check, HelpCircle
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
  onCreateRequest: (data: any) => void;
}

export const ArchitectureStudio: React.FC<ArchitectureStudioProps> = ({
  requests,
  contracts,
  onCreateContract,
  onApproveContract,
  onLaunchManufacturing,
  onCreateRequest
}) => {
  // Navigation tabs for the Left Column (Specification Intake vs Custom Sandbox Designer)
  const [leftTab, setLeftTab] = useState<'designer' | 'intake'>('designer');

  // Sandbox Blueprint Designer States
  const [designTitle, setDesignTitle] = useState('');
  const [designOrg, setDesignOrg] = useState('');
  const [designProblem, setDesignProblem] = useState('');
  const [designEcosystem, setDesignEcosystem] = useState('SOVEREIGN_GOVERNMENT_ECOSYSTEM');
  const [designSector, setDesignSector] = useState('GOVERNMENT');
  const [selectedCaps, setSelectedCaps] = useState<string[]>(['Zero-Trust Gatekeeping', 'Continuous Audit Logging']);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['Sovereign Architect', 'Sovereign Security']);
  const [targetInfrastructure, setTargetInfrastructure] = useState('JUMO-NODE-01 Sovereign Hybrid Cloud');
  const [targetUsers, setTargetUsers] = useState('National Bank Authorities, Sovereign Treasury Engineers');

  // AI Security and Regulatory Audit State per Contract
  const [auditingContracts, setAuditingContracts] = useState<Record<string, boolean>>({});
  const [auditReports, setAuditReports] = useState<Record<string, { ok: boolean; response: string; plan: any[] }>>({});

  // Form submission handler to generate an Official Platform Specification Request
  const handleCompileSpecification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designTitle.trim() || !designOrg.trim() || !designProblem.trim()) return;

    const specPayload = {
      product: {
        productName: designTitle.trim(),
        purpose: designProblem.trim(),
        targetOrganization: designOrg.trim(),
        ecosystem: designEcosystem,
        sector: designSector,
        governmentScale: 'NATIONAL',
        applicationType: 'Sovereign Platform Service'
      },
      portals: {
        selected: [targetUsers]
      },
      modules: {
        selected: selectedCaps
      },
      deployment: {
        selected: [targetInfrastructure]
      },
      integrations: {
        selected: ['Local Sovereign Ledger Engine']
      },
      aiWorkforce: {
        selected: selectedAgents
      }
    };

    onCreateRequest(specPayload);

    // Reset Form and switch to Intake list to see new request
    setDesignTitle('');
    setDesignOrg('');
    setDesignProblem('');
    setLeftTab('intake');
  };

  const toggleCap = (cap: string) => {
    setSelectedCaps(prev => 
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  const toggleAgent = (agent: string) => {
    setSelectedAgents(prev => 
      prev.includes(agent) ? prev.filter(a => a !== agent) : [...prev, agent]
    );
  };

  // Run a live AI Architectural compliance audit on a draft contract using the real server-side JUMO reasoning AI!
  const runLiveAIAudit = async (contract: ArchitectureContract) => {
    setAuditingContracts(prev => ({ ...prev, [contract.id]: true }));
    try {
      const promptText = `Conduct a comprehensive, authoritative regulatory and Zero-Trust architecture security audit on this contract.
ID: ${contract.id}
Product: ${contract.productIdentity.name}
Ecosystem: ${contract.productIdentity.ecosystem}
Core Capabilities: ${(contract.functionalArchitecture?.capabilities ?? []).join(', ')}
Modules: ${(contract.functionalArchitecture?.modules ?? []).join(', ')}
Target Infra: ${contract.deploymentArchitecture?.target || 'Sovereign Cluster'}
Services: ${(contract.functionalArchitecture?.services ?? []).join(', ')}`;

      const response = await fetch('/api/v1/ueos/ai/reason', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-operator-name': 'Sovereign Lead Architect'
        },
        body: JSON.stringify({
          message: promptText,
          mode: 'analysis',
          context: {
            activeStudio: 'architecture',
            contractId: contract.id
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Audit error (HTTP ${response.status})`);
      }

      const data = await response.json();
      if (data.ok && data.result) {
        setAuditReports(prev => ({
          ...prev,
          [contract.id]: {
            ok: true,
            response: data.result.response,
            plan: data.result.plan || []
          }
        }));
      } else {
        throw new Error(data.error || 'Audit returned invalid response structure.');
      }
    } catch (err: any) {
      setAuditReports(prev => ({
        ...prev,
        [contract.id]: {
          ok: false,
          response: `AI Audit Link Failure: ${err.message}. Please verify the JUMO AI provider connectivity.`,
          plan: []
        }
      }));
    } finally {
      setAuditingContracts(prev => ({ ...prev, [contract.id]: false }));
    }
  };

  // Pre-configured capabilities for selection
  const availableCapabilities = [
    'Zero-Trust Gatekeeping',
    'Consensus double-entry verification',
    'Liquidity Pool Allocation',
    'Continuous Audit Logging',
    'AES-256 HSM Crypto Encapsulation',
    'Real-time Anomaly Intrusion Sentinel'
  ];

  // Pre-configured agents for selection
  const availableAgents = [
    'Sovereign Architect',
    'Sovereign Frontend',
    'Sovereign Backend',
    'Sovereign Security'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Architecture Studio</h2>
              <p className="text-xs text-slate-500 font-medium">Authoritative Specification & Architecture Contract Governance Control Surface</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full">LEVEL-08-ARCHITECT</span>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">SWARM INTEGRATION MODE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Requests, Intake & Sandbox Spec Designer */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Column Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1 gap-1">
              <button
                onClick={() => setLeftTab('designer')}
                className={`flex-1 py-2 text-center rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                  leftTab === 'designer' 
                    ? 'bg-white text-slate-900 border border-slate-200/60 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Sandbox Designer</span>
                </div>
              </button>
              <button
                onClick={() => setLeftTab('intake')}
                className={`flex-1 py-2 text-center rounded-lg text-[10px] font-black uppercase tracking-wider transition-all relative ${
                  leftTab === 'intake' 
                    ? 'bg-white text-slate-900 border border-slate-200/60 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Intake Specifications</span>
                  {(requests ?? []).length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 block animate-ping absolute top-1 right-2"></span>
                  )}
                </div>
              </button>
            </div>

            <div className="p-5">
              <AnimatePresence mode="wait">
                {leftTab === 'designer' ? (
                  <motion.form 
                    key="designer-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleCompileSpecification}
                    className="space-y-4 text-xs"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Project Identity & Title</label>
                      <input 
                        type="text" 
                        required
                        value={designTitle}
                        onChange={(e) => setDesignTitle(e.target.value)}
                        placeholder="e.g. National Treasury Ledger Engine"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Governing Agency</label>
                        <input 
                          type="text" 
                          required
                          value={designOrg}
                          onChange={(e) => setDesignOrg(e.target.value)}
                          placeholder="e.g. Ministry of Finance"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Ecosystem Archetype</label>
                        <select 
                          value={designEcosystem}
                          onChange={(e) => setDesignEcosystem(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none font-bold"
                        >
                          <option value="SOVEREIGN_GOVERNMENT_ECOSYSTEM">Sovereign Government</option>
                          <option value="FINANCIAL_LEDGER_ECOSYSTEM">Sovereign Financial</option>
                          <option value="CYBERSECURITY_SHIELD_ECOSYSTEM">Aegis Security</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Problem Statement & Scope</label>
                      <textarea 
                        required
                        rows={3}
                        value={designProblem}
                        onChange={(e) => setDesignProblem(e.target.value)}
                        placeholder="Detail the technical or business problem that requires direct, isolated, and double-entry verified architecture execution."
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium leading-relaxed"
                      />
                    </div>

                    {/* Capabilities selector */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Sovereign Capabilities Required</label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableCapabilities.map((cap) => {
                          const isSelected = selectedCaps.includes(cap);
                          return (
                            <button
                              key={cap}
                              type="button"
                              onClick={() => toggleCap(cap)}
                              className={`p-2 rounded-lg border text-left text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                                isSelected 
                                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <div className={`w-3 h-3 rounded flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300'}`}>
                                {isSelected && <Check className="w-2.5 h-2.5" />}
                              </div>
                              <span className="truncate">{cap}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Agent Nodes assigner */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Assigned Workforce Swarm Nodes</label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableAgents.map((agent) => {
                          const isSelected = selectedAgents.includes(agent);
                          return (
                            <button
                              key={agent}
                              type="button"
                              onClick={() => toggleAgent(agent)}
                              className={`p-2 rounded-lg border text-left text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                                isSelected 
                                  ? 'bg-purple-50 text-purple-700 border-purple-200' 
                                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <div className={`w-3 h-3 rounded flex items-center justify-center ${isSelected ? 'bg-purple-600 text-white' : 'border border-slate-300'}`}>
                                {isSelected && <Check className="w-2.5 h-2.5" />}
                              </div>
                              <span className="truncate">{agent}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Generate Official Specification
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="intake-requests"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Pipeline Intake</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{(requests ?? []).length} Pending</span>
                    </div>

                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                      {(requests ?? []).map((req) => (
                        <div 
                          key={req.id}
                          className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase">{req.id}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">{new Date(req.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-900">{req.title}</h4>
                            <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{req.problem}</p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {(req.capabilities ?? []).slice(0, 3).map((cap, i) => (
                              <span key={i} className="text-[8px] font-bold text-slate-500 bg-white border border-slate-100 px-1.5 py-0.5 rounded">
                                {cap}
                              </span>
                            ))}
                            {(req.capabilities ?? []).length > 3 && (
                              <span className="text-[8px] font-bold text-slate-400 bg-white border border-slate-100 px-1.5 py-0.5 rounded">
                                +{(req.capabilities ?? []).length - 3} more
                              </span>
                            )}
                          </div>
                          
                          <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase">STATUS: <span className="text-slate-700">{req.status}</span></span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onCreateContract(req.id);
                              }}
                              className="px-3 py-1.5 bg-slate-900 text-white text-[9px] font-black rounded-lg uppercase tracking-wider hover:bg-blue-600 transition-colors"
                            >
                              Generate Contract
                            </button>
                          </div>
                        </div>
                      ))}

                      {(requests ?? []).length === 0 && (
                        <div className="py-20 text-center space-y-2 opacity-40">
                          <FileText className="w-10 h-10 mx-auto text-slate-300" />
                          <p className="text-[10px] font-bold text-slate-500 uppercase">No pending specifications</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Active Architecture Contracts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Authoritative Architecture Contracts</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">{(contracts ?? []).filter(c => c.status === 'LOCKED').length} Locked</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-full">{(contracts ?? []).filter(c => c.status === 'DRAFT').length} Draft</span>
              </div>
            </div>

            <div className="space-y-5">
              {(contracts ?? []).map((contract) => {
                const isAuditing = auditingContracts[contract.id] || false;
                const auditReport = auditReports[contract.id];

                return (
                  <motion.div 
                    key={contract.id}
                    layout
                    className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${contract.status === 'LOCKED' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                          {contract.status === 'LOCKED' ? <ShieldCheck className="w-5 h-5" /> : <FileSignature className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight">{contract.id}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">v{contract.version}</span>
                          </div>
                          <h4 className="text-xs font-black text-slate-900">{contract.productIdentity.name}</h4>
                        </div>
                      </div>
                      <div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${
                          contract.status === 'LOCKED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {contract.status === 'LOCKED' ? 'LOCKED ARCHITECTURE CONTRACT' : 'DRAFT CONTRACT'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Target Ecosystem</span>
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <Box className="w-3 h-3 text-blue-500 animate-pulse" />
                          {contract.productIdentity.ecosystem.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Assigned Agents</span>
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-500" />
                          {(contract.aiArchitecture?.assignedAgents ?? []).length} Swarm Nodes
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Security Protocol</span>
                        <span className="font-bold text-emerald-600 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {contract.securityArchitecture?.authentication || 'MFA-SAML'}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Last Verification</span>
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {new Date(contract.updatedAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {/* Functional and Deployment Details */}
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/50 grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px]">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-1">
                          <Cpu className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-black uppercase text-slate-800 tracking-wider">Functional Layers</span>
                        </div>
                        <div className="space-y-1 text-slate-600">
                          <div className="flex justify-between"><span>Core Modules:</span> <span className="font-bold text-slate-900">{(contract.functionalArchitecture?.modules ?? []).join(', ')}</span></div>
                          <div className="flex justify-between"><span>Capabilities:</span> <span className="font-bold text-slate-900">{(contract.functionalArchitecture?.capabilities ?? []).join(', ')}</span></div>
                          <div className="flex justify-between"><span>Services:</span> <span className="font-bold text-slate-900">{(contract.functionalArchitecture?.services ?? []).join(', ')}</span></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-1">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-black uppercase text-slate-800 tracking-wider">Deployment Infra</span>
                        </div>
                        <div className="space-y-1 text-slate-600">
                          <div className="flex justify-between"><span>Target Node:</span> <span className="font-bold text-slate-900">{contract.deploymentArchitecture?.target || 'Sovereign Cluster'}</span></div>
                          <div className="flex justify-between"><span>Scaling Mode:</span> <span className="font-bold text-slate-900">{contract.deploymentArchitecture?.scaling || 'Isolated-Auto'}</span></div>
                          <div className="flex justify-between"><span>Regionality:</span> <span className="font-bold text-slate-900">{(contract.deploymentArchitecture?.regionalDeployment ?? []).join(', ')}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* AI Security Compliance and Threat Audit Box */}
                    <AnimatePresence>
                      {auditReport && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border border-slate-900 bg-slate-950 text-slate-100 rounded-lg p-4 font-mono text-[9px] overflow-hidden shadow-inner space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <div className="flex items-center gap-1.5 text-emerald-400">
                              <Terminal className="w-3.5 h-3.5 animate-pulse" />
                              <span className="font-bold uppercase tracking-wider">JUMO Cybernetic Security & Compliance Audit</span>
                            </div>
                            <span className="text-slate-500 text-[8px] uppercase">ANALYSIS ENGINE V4</span>
                          </div>

                          <div className="whitespace-pre-wrap leading-relaxed text-slate-300">
                            {auditReport.response}
                          </div>

                          {auditReport.plan && auditReport.plan.length > 0 && (
                            <div className="pt-2 border-t border-slate-800 space-y-2">
                              <div className="font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                                <ShieldAlert className="w-3 h-3 text-amber-500" />
                                <span>Risk Mitigation Action Items</span>
                              </div>
                              <div className="space-y-1.5 pl-2">
                                {auditReport.plan.map((step, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                    <span className="text-amber-500 font-extrabold">•</span>
                                    <div>
                                      <span className="text-slate-100 font-bold">{step.title}</span>
                                      <span className="text-slate-400"> — {step.description}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => runLiveAIAudit(contract)}
                          disabled={isAuditing}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/60 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
                        >
                          {isAuditing ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin text-blue-600" />
                              <span>Auditing...</span>
                            </>
                          ) : (
                            <>
                              <HelpCircle className="w-3 h-3 text-blue-500" />
                              <span>AI Security Audit</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {contract.status === 'DRAFT' && (
                          <button 
                            onClick={() => onApproveContract(contract.id)}
                            className="px-5 py-2 bg-slate-950 hover:bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shadow-xs"
                          >
                            Lock Architecture Contract
                          </button>
                        )}
                        {contract.status === 'LOCKED' && (
                          <button 
                            onClick={() => onLaunchManufacturing(contract.id)}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5"
                          >
                            <Zap className="w-3 h-3 fill-current" />
                            Initialize Manufacturing
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

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
