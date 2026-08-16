import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Settings2,
  Network,
  Brain,
  Sparkles,
  Plus,
  Search,
  Lock,
  Terminal,
  ArrowRight,
  ShieldAlert,
  FileText,
  Check,
  Cpu,
  Wand2,
  Key,
  RefreshCw,
  X,
  Database,
  Globe,
  Server,
  ChevronRight,
  Eye,
  Sliders
} from "lucide-react";

import { JUMO_HYBRID_ARCHITECTURE_REGISTRY, JumoArchitectureLayer } from "../../../core/hub/architecture/JumoHybridArchitectureLayers";
import { JumoAIAgentRegistry } from "../../../core/ai/registry/JumoAIAgentRegistry";
import { JumoApplicationCompletenessVerificationEngine, ApplicationCompletenessReport } from "../../../core/verification/JumoApplicationCompletenessVerificationEngine";
import { jumoCryptoManager } from "../../../core/security/JumoCryptographicProvider";

export interface ArchitectureVerificationCommandCenterProps {
  layers?: JumoArchitectureLayer[];
  specification?: any;
  onOpenLayer?: (layerId: string) => void;
  onOpenStudio?: (studioId: string) => void;
  onApproveContractAndLaunchManufacturing?: (contractId: string) => void;
}

export function ArchitectureVerificationCommandCenter({
  layers: propLayers,
  specification,
  onOpenLayer,
  onOpenStudio,
  onApproveContractAndLaunchManufacturing
}: ArchitectureVerificationCommandCenterProps) {
  const [activeTab, setActiveTab] = useState<'graph' | 'catalogue' | 'verification' | 'expansion' | 'workforce'>('graph');
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>("L001");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<string>("ALL");
  const [isExpanding, setIsExpanding] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [expansionLog, setExpansionLog] = useState<string | null>(null);

  // Dynamic registry layers read directly from authoritative JumoHybridArchitectureRegistry
  const allLayers = useMemo(() => {
    return JUMO_HYBRID_ARCHITECTURE_REGISTRY.all();
  }, [propLayers, expansionLog]);

  const families = useMemo(
    () => [...new Set(allLayers.map((l) => l.family))],
    [allLayers]
  );

  const activeLayers = useMemo(
    () => allLayers.filter((l) => l.status === 'ACTIVE' || l.status === 'FOUNDATION' || l.status === 'GOVERNED'),
    [allLayers]
  );

  const executableLayers = useMemo(
    () => allLayers.filter((l) => l.executable),
    [allLayers]
  );

  const humanFacingLayers = useMemo(
    () => allLayers.filter((l) => l.humanFacing),
    [allLayers]
  );

  // Run completeness verification engine
  const completenessReport: ApplicationCompletenessReport = useMemo(() => {
    return JumoApplicationCompletenessVerificationEngine.verifyCompleteness(
      specification || {},
      allLayers
    );
  }, [specification, allLayers]);

  // Selected layer details for inspector
  const selectedLayer = useMemo(() => {
    if (!selectedLayerId) return allLayers[0];
    return allLayers.find(l => l.id === selectedLayerId) || allLayers[0];
  }, [selectedLayerId, allLayers]);

  // Dependants of selected layer
  const dependants = useMemo(() => {
    if (!selectedLayer) return [];
    return allLayers.filter(l => l.dependencies.includes(selectedLayer.id));
  }, [selectedLayer, allLayers]);

  // Assigned cognitive agent for selected layer
  const assignedAgents = useMemo(() => {
    if (!selectedLayer) return [];
    const divMap: Record<string, string> = {
      'Platform Kernel': 'ARCHITECTURE',
      'Identity & IAM': 'SECURITY',
      'Data Architecture': 'DATABASE',
      'API & Integration': 'INTEGRATION',
      'Security Engineering': 'SECURITY',
      'Application Engineering': 'FRONTEND',
      'Commercial Products': 'COMMERCIAL',
      'AI & Workforce': 'AI_ENGINEERING',
      'Infrastructure': 'DEVOPS',
      'Observability': 'DIAGNOSTICS',
      'Disaster Recovery': 'COMPLIANCE'
    };
    const div = divMap[selectedLayer.family] || 'ARCHITECTURE';
    return JumoAIAgentRegistry.getAgentsByDivision(div as any).slice(0, 3);
  }, [selectedLayer]);

  // Handle Architecture Expansion
  const handleExpandArchitecture = (expansionModule: string) => {
    setIsExpanding(true);
    setTimeout(() => {
      const nextId = `L${String(allLayers.length + 1).padStart(3, '0')}`;
      const familyMap: Record<string, string> = {
        'Zero-Trust Mesh': 'Security Engineering',
        'Sovereign Payment Switch': 'Commercial Products',
        'Multi-Region Nodes': 'Infrastructure',
        'AI Autonomous Code Gen': 'AI & Workforce',
        'Offline Edge Sync': 'Disaster Recovery',
        'National Citizen Portal': 'Application Engineering',
        'ISO 20022 Financial Gateway': 'API & Integration',
        'HSM Cryptographic Vault': 'Security Engineering'
      };

      const family = familyMap[expansionModule] || 'Application Engineering';
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.register({
        id: nextId,
        family,
        name: `${expansionModule} Core Layer`,
        responsibility: `Authoritative enterprise layer executing ${expansionModule} operations for sovereign runtime.`,
        studio: 'architecture',
        status: 'ACTIVE',
        dependencies: ['L001', 'L013'],
        humanFacing: true,
        executable: true
      });

      setExpansionLog(`[EXPAND] Successfully expanded architecture with Layer ${nextId}: ${expansionModule}`);
      setIsExpanding(false);
      setSelectedLayerId(nextId);
    }, 400);
  };

  // Handle Lock and Sign Contract
  const handleLockAndSignContract = async () => {
    setIsSigning(true);
    try {
      const provider = jumoCryptoManager.getProvider();
      const contractPayload = {
        contractId: `ARCH-CONTRACT-${Date.now()}`,
        totalLayers: allLayers.length,
        completenessScore: completenessReport.completenessScore,
        decision: completenessReport.readinessDecision,
        timestamp: new Date().toISOString()
      };

      const signatureResult = await provider.signPayload(contractPayload, 'Sovereign Architect Lead');
      console.log('[ARCH LOCK] Cryptographic Contract Signature Result:', signatureResult);

      if (onApproveContractAndLaunchManufacturing) {
        onApproveContractAndLaunchManufacturing(contractPayload.contractId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigning(false);
    }
  };

  // Filtered layers for catalogue
  const filteredLayers = useMemo(() => {
    return allLayers.filter(l => {
      const matchesSearch = searchQuery === "" ||
        (l.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.responsibility || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFamily = selectedFamilyFilter === "ALL" || l.family === selectedFamilyFilter;
      return matchesSearch && matchesFamily;
    });
  }, [allLayers, searchQuery, selectedFamilyFilter]);

  return (
    <section
      data-jumo-studio="architecture-verification-command-center"
      className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden font-sans"
    >
      {/* Header Bar */}
      <div className="border-b border-slate-200 bg-slate-900 text-white px-6 py-5">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">
                  Architecture Verification Command Center
                </h2>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300">
                  PRE-LOCK CONTROL PLANE
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Authoritative pre-lock engineering control plane, dependency graph visualizer, and dynamic architecture expansion engine.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 min-w-[90px]">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Layers className="h-3.5 w-3.5" />
                <span className="text-[9px] uppercase tracking-wide font-black">Registered</span>
              </div>
              <div className="mt-0.5 text-base font-extrabold text-white">
                {allLayers.length} <span className="text-[10px] text-emerald-400 font-normal">(Open)</span>
              </div>
            </div>

            <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 min-w-[90px]">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-[9px] uppercase tracking-wide font-black">Completeness</span>
              </div>
              <div className="mt-0.5 text-base font-extrabold text-amber-400">
                {completenessReport.completenessScore}%
              </div>
            </div>

            <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 min-w-[90px]">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-[9px] uppercase tracking-wide font-black">Decision</span>
              </div>
              <div className={`mt-0.5 text-xs font-black uppercase px-2 py-0.5 rounded ${
                completenessReport.readinessDecision === 'READY_TO_LOCK' ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' : 'bg-amber-950 border border-amber-800 text-amber-400'
              }`}>
                {(completenessReport?.readinessDecision || 'UNKNOWN').replace(/_/g, ' ')}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 mt-5 border-t border-slate-800 pt-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'graph' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Layer Dependency Graph
          </button>

          <button
            onClick={() => setActiveTab('catalogue')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'catalogue' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Layer Catalogue ({allLayers.length})
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'verification' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Completeness & Evidence ({completenessReport.evidenceTrail.length})
          </button>

          <button
            onClick={() => setActiveTab('expansion')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'expansion' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            Architecture Expansion Engine
          </button>
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="p-6 bg-slate-50 min-h-[600px]">
        
        {/* 1. LAYER DEPENDENCY GRAPH VISUALIZER */}
        {activeTab === 'graph' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Visual Canvas Panel */}
            <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-black uppercase text-slate-200 tracking-wider">Automated Layer Dependency Graph</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Click any layer node to inspect dependencies & cognitive agents</span>
              </div>

              {/* Node Grid Graph Display */}
              <div className="max-h-[520px] overflow-y-auto pr-2 space-y-6">
                {families.map((family) => {
                  const familyLayers = allLayers.filter(l => l.family === family);
                  return (
                    <div key={family} className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">{family} ({familyLayers.length})</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {familyLayers.map((layer) => {
                          const isSelected = selectedLayerId === layer.id;
                          const hasMissingDeps = layer.dependencies.some(d => !allLayers.some(l => l.id === d));

                          return (
                            <button
                              key={layer.id}
                              onClick={() => setSelectedLayerId(layer.id)}
                              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-400/50 shadow-md'
                                  : hasMissingDeps
                                  ? 'bg-rose-950/40 border-rose-800 text-rose-300 hover:border-rose-600'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-mono text-[9px] opacity-80">{layer.id}</span>
                                {layer.executable && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Executable Layer"></span>}
                              </div>
                              <div className="text-[11px] font-bold truncate mt-0.5">{layer.name}</div>
                              {layer.dependencies.length > 0 && (
                                <div className="text-[9px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                                  <span>→ {layer.dependencies.length} deps</span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Inspector Panel */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
              {selectedLayer ? (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-blue-600 font-extrabold">{selectedLayer.id}</span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {selectedLayer.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mt-1">{selectedLayer.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{selectedLayer.responsibility}</p>
                  </div>

                  {/* Metadata badging */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block uppercase font-bold">Family</span>
                      <span className="font-extrabold text-slate-800">{selectedLayer.family}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block uppercase font-bold">Studio Target</span>
                      <span className="font-extrabold text-slate-800">{selectedLayer.studio}</span>
                    </div>
                  </div>

                  {/* Direct Dependencies */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-slate-600 block tracking-wider">Direct Dependencies ({selectedLayer.dependencies.length})</span>
                    {selectedLayer.dependencies.length > 0 ? (
                      <div className="space-y-1">
                        {selectedLayer.dependencies.map(depId => {
                          const depObj = allLayers.find(l => l.id === depId);
                          return (
                            <div key={depId} className="p-2 rounded bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                              <span className="font-mono font-bold text-slate-700">{depId}</span>
                              <span className="text-[11px] text-slate-600">{depObj ? depObj.name : 'Missing Dependency!'}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic">No upstream dependencies (Foundation Root)</div>
                    )}
                  </div>

                  {/* Dependants */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-slate-600 block tracking-wider">Dependent Downstream Layers ({dependants.length})</span>
                    {dependants.length > 0 ? (
                      <div className="max-h-28 overflow-y-auto space-y-1">
                        {dependants.map(dep => (
                          <div key={dep.id} className="p-1.5 rounded bg-slate-50 border border-slate-200 text-[11px] flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-700">{dep.id}</span>
                            <span className="text-slate-600 truncate max-w-[150px]">{dep.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic">No downstream dependants registered</div>
                    )}
                  </div>

                  {/* Assigned Cognitive Agents */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase text-blue-600 block tracking-wider flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-blue-600" />
                      Assigned Workforce Agents ({assignedAgents.length})
                    </span>
                    <div className="space-y-1.5">
                      {assignedAgents.map(ag => (
                        <div key={ag.agentId} className="p-2 bg-blue-50/50 border border-blue-100 rounded-lg text-xs space-y-0.5">
                          <div className="flex items-center justify-between font-bold text-slate-800">
                            <span>{ag.jumoName}</span>
                            <span className="text-[9px] font-mono text-blue-700">{ag.role}</span>
                          </div>
                          <div className="text-[10px] text-slate-500">{ag.specialization}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">Select a layer node from the visual graph to inspect.</div>
              )}
            </div>
          </div>
        )}

        {/* 2. LAYER CATALOGUE & FAMILY EXPLORER */}
        {activeTab === 'catalogue' && (
          <div className="space-y-4">
            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search layers by name, ID, or purpose..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-500">Family:</span>
                <select
                  value={selectedFamilyFilter}
                  onChange={(e) => setSelectedFamilyFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 cursor-pointer focus:ring-1 focus:ring-blue-500 outline-hidden"
                >
                  <option value="ALL">All Families ({allLayers.length})</option>
                  {families.map(fam => (
                    <option key={fam} value={fam}>{fam}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table of Layers */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-100">
                {filteredLayers.map(layer => (
                  <div key={layer.id} className="p-4 hover:bg-slate-50/80 transition flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600">{layer.id}</span>
                        <h4 className="text-xs font-black text-slate-800">{layer.name}</h4>
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {layer.status}
                        </span>
                        {layer.executable && <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Executable</span>}
                        {layer.humanFacing && <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">Human-facing</span>}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{layer.responsibility}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-0.5">
                        <span>Family: <strong>{layer.family}</strong></span>
                        <span>•</span>
                        <span>Studio: <strong>{layer.studio}</strong></span>
                        <span>•</span>
                        <span>Dependencies: <strong>{layer.dependencies.join(", ") || "None"}</strong></span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedLayerId(layer.id);
                        setActiveTab('graph');
                      }}
                      className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[10px] font-bold cursor-pointer transition shrink-0"
                    >
                      Inspect in Graph →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. COMPLETENESS & EVIDENCE ENGINE */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Application Completeness Analysis & Evidence Trail</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Machine-readable verification output comparing Specification vs Architecture vs Build Artifacts.</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-blue-600">{completenessReport.completenessScore}% Completeness</div>
                  <div className="text-[10px] font-bold text-slate-400">{completenessReport.passedCount} Passed / {completenessReport.criticalGapsCount} Gaps</div>
                </div>
              </div>

              {/* Critical Findings / Gaps */}
              {completenessReport.findings.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase text-amber-600 tracking-wider block">Unresolved Architecture Blockers ({completenessReport.findings.length})</span>
                  <div className="space-y-2">
                    {completenessReport.findings.map(f => (
                      <div key={f.id} className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-900">{f.title}</span>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">{f.severity}</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">{f.explanation}</p>
                        <div className="text-[10px] text-amber-800 font-semibold pt-1">
                          Remediation: {f.remediationPath} (Assigned Agent: {f.responsibleAgentId})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence Log Table */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-black uppercase text-slate-700 tracking-wider block">Verifiable Cryptographic Evidence Log</span>
                <div className="bg-slate-950 font-mono text-[10px] text-emerald-400 border border-slate-800 p-4 rounded-xl space-y-2 max-h-72 overflow-y-auto">
                  {completenessReport.evidenceTrail.map((ev, idx) => (
                    <div key={idx} className="border-b border-slate-850 pb-1.5 space-y-0.5">
                      <div className="flex items-center justify-between text-slate-300 font-bold">
                        <span>[{ev.result}] {ev.gateName} — {ev.requirement}</span>
                        <span className="text-emerald-500">{ev.evidenceHash}</span>
                      </div>
                      <div className="text-slate-500 text-[9px] flex justify-between">
                        <span>Component: {ev.component}</span>
                        <span>Agent: {ev.responsibleAgent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ARCHITECTURE EXPANSION ENGINE */}
        {activeTab === 'expansion' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 mb-2">
                  <Wand2 className="w-3.5 h-3.5 text-amber-500" />
                  Dynamic Blueprint Expansion Engine
                </div>
                <h3 className="text-sm font-black text-slate-900">Expand Architecture Capabilities On-Demand</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select enterprise modules to automatically derive and insert missing architecture layers directly into the JUMO Hybrid Architecture Registry.
                </p>
              </div>

              {expansionLog && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono rounded-xl">
                  {expansionLog}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: "Zero-Trust Mesh", family: "Security Engineering", desc: "mTLS network segmentation and packet verification." },
                  { name: "Sovereign Payment Switch", family: "Commercial Products", desc: "ISO 20022 wire messaging and mobile money switch." },
                  { name: "Multi-Region Nodes", family: "Infrastructure", desc: "Cross-datacenter regional replication and automated failover." },
                  { name: "AI Autonomous Code Gen", family: "AI & Workforce", desc: "Autonomous compilation of domain models to TypeScript." },
                  { name: "Offline Edge Sync", family: "Disaster Recovery", desc: "Local offline operation during network blackout." },
                  { name: "National Citizen Portal", family: "Application Engineering", desc: "Citizen-facing public identity portal and status tracking." },
                  { name: "ISO 20022 Financial Gateway", family: "API & Integration", desc: "Standardized banking message serializer." },
                  { name: "HSM Cryptographic Vault", family: "Security Engineering", desc: "Hardware security module for root signing keys." }
                ].map((mod) => (
                  <div key={mod.name} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] font-black uppercase text-blue-600">{mod.family}</div>
                      <h4 className="text-xs font-black text-slate-800 mt-0.5">{mod.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{mod.desc}</p>
                    </div>
                    <button
                      onClick={() => handleExpandArchitecture(mod.name)}
                      disabled={isExpanding}
                      className="w-full py-1.5 bg-slate-900 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-[10px] font-bold cursor-pointer transition"
                    >
                      {isExpanding ? "Injecting..." : "+ Expand Blueprint"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Lock Readiness Action Banner */}
      <div className="border-t border-slate-200 bg-slate-900 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest block">Architecture Lock Gate</span>
          <h4 className="text-sm font-black text-white mt-0.5">
            Ready to Lock Architecture Contract ({allLayers.length} Layers Validated)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Signs contract with Cryptographic Provider and automatically creates & transitions to Manufacturing Studio.
          </p>
        </div>

        <button
          onClick={handleLockAndSignContract}
          disabled={isSigning || completenessReport.readinessDecision === 'BLOCKED_CRITICAL_GAP'}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg cursor-pointer flex items-center gap-2 whitespace-nowrap"
        >
          {isSigning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Signing Contract...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Sign Contract & Launch Manufacturing →
            </>
          )}
        </button>
      </div>
    </section>
  );
}

export default ArchitectureVerificationCommandCenter;
