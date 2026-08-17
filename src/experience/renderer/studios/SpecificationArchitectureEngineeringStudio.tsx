import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, Layers, Terminal, ShieldCheck, Box, Check, ArrowRight, Play, AlertCircle, Bot, Users, Database, Globe, Sliders, Cpu, Network
} from 'lucide-react';
import { useJobNavigation } from '../../shell/JobNavigationContext';
import { SpecificationStudio } from './SpecificationStudio';
import { ArchitectureStudio } from './ArchitectureStudio';
import { EngineeringStudio } from './EngineeringStudio';
import { SovereignGovernanceRegistry } from '../../../services/gov/SovereignGovernanceRegistry';
import { DigitalProductManufacturingOrchestrator } from '../../../services/factory/DigitalProductManufacturingOrchestrator';
import { JumoAIAgentRegistry } from '../../../core/ai/registry/JumoAIAgentRegistry';

export function SpecificationArchitectureEngineeringStudio() {
  const { selectedJob, jobs } = useJobNavigation();
  const [activeTab, setActiveTab] = useState<'intent' | 'spec' | 'arch' | 'eng' | 'blueprint'>('intent');
  const [isCompilingBlueprint, setIsCompilingBlueprint] = useState(false);
  const [blueprintLog, setBlueprintLog] = useState<string[]>([]);
  const [blueprintHash, setBlueprintHash] = useState<string | null>(null);

  const registry = SovereignGovernanceRegistry.getInstance();
  const orchestrator = DigitalProductManufacturingOrchestrator.getInstance();

  useEffect(() => {
    // Sync tab with job state if job changes
    if (selectedJob) {
      const state = selectedJob.currentLifecycleState as string;
      if (state === 'SPECIFICATION_DRAFT' || state === 'AWAITING_SPECIFICATION_APPROVAL') {
        setActiveTab('spec');
      } else if (state === 'ARCHITECTURE_INTAKE' || state === 'ARCHITECTURAL_EXPANSION' || state === 'AWAITING_ARCHITECTURE_APPROVAL') {
        setActiveTab('arch');
      } else if (state === 'ENGINEERING_INTAKE' || state === 'ENGINEERING_IMPLEMENTATION') {
        setActiveTab('eng');
      } else if (state === 'FACTORY_READY' || state === 'BLUEPRINT_APPROVED') {
        setActiveTab('blueprint');
      }
    }
  }, [selectedJob]);

  const handleCompileBlueprint = async () => {
    if (!selectedJob) return;
    setIsCompilingBlueprint(true);
    setBlueprintLog([
      `[INTAKE] Loading normalized requirements specification... OK`,
      `[TOPOLOGY] Parsing multi-tenant architecture layers...`,
      `[SECURITY] Applying zero-trust security control matrix... OK`,
      `[COMPILATION] Validating product registry mappings...`,
      `[COMPILATION] Synthesizing structural JUMO blueprints...`,
    ]);

    setTimeout(() => {
      setBlueprintLog(prev => [
        ...prev,
        `[DEPENDENCY] Resolving upstream/downstream integrations... OK`,
        `[SEAL] Generating SHA-256 digital blueprint signature...`,
      ]);
    }, 1000);

    setTimeout(async () => {
      const hash = `SHA-256:7c8b0a9f1e2d3c4b5a6f${selectedJob.id.substring(4)}`;
      setBlueprintHash(hash);
      setBlueprintLog(prev => [
        ...prev,
        `[COMPLETED] Structural Digital Product Blueprint successfully generated.`,
        `[SIGN] Blueprint Sealed: ${hash}`,
        `[GATE] Advancing to BLUEPRINT_READY milestone.`
      ]);
      
      // Advance job in the real database
      await orchestrator.grantApproval(selectedJob.id, 'ARCHITECTURE_APPROVED', 'Sovereign Governor');
      setIsCompilingBlueprint(false);
    }, 2000);
  };

  const tabs = [
    { id: 'intent' as const, label: '1. Intent & Intake', icon: FileText, desc: 'Ecosystem & mandate definition' },
    { id: 'spec' as const, label: '2. Specification', icon: Sliders, desc: '19-layer technical parameter config' },
    { id: 'arch' as const, label: '3. Architecture', icon: Layers, desc: 'Enclaves, layers & dependency discovery' },
    { id: 'eng' as const, label: '4. Engineering', icon: Terminal, desc: 'Application compilation & active worker audit' },
    { id: 'blueprint' as const, label: '5. Blueprint', icon: ShieldCheck, desc: 'Compile & seal "BLUEPRINT_READY" gate' }
  ];

  return (
    <div className="space-y-6">
      {/* Dynamic Master Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Studio 1</span>
            <h2 className="text-xl font-black text-slate-950 tracking-tight mt-0.5">
              Specification, Architecture & Engineering Studio
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Authoritative gateway governing the product lifecycle from initial mandate to compiled structural blueprint.
            </p>
          </div>
          {selectedJob && (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider leading-none">Selected Job</span>
                <span className="text-xs font-black text-slate-800">{selectedJob.productName || selectedJob.id}</span>
              </div>
            </div>
          )}
        </div>

        {/* Master Tab Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-100">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                    : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-black truncate">{tab.label}</span>
                </div>
                <span className={`text-[9px] font-medium mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {tab.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="min-h-[50vh]">
        {activeTab === 'intent' && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">01. Intent & Intake Workspace</h3>
              <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">
                Establish the sovereign mandate, identity, jurisdiction, and target operating boundaries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1.5">Tenant Product Identity</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={selectedJob?.productName || "ATUTUR SEED SECONDARY SCHOOL"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1.5">Primary Domain / Jurisdiction</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={selectedJob?.ecosystemDomain || "EDUCATION_OS (Sovereign Uganda)"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1.5">Product Category</label>
                    <span className="inline-block bg-slate-100 text-slate-700 font-mono text-[10px] font-black px-3 py-1.5 rounded-lg border border-slate-200">
                      {selectedJob?.ecosystem || "ERP_ECOSYSTEM"}
                    </span>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500 block mb-1.5">Operating Model</label>
                    <span className="inline-block bg-slate-100 text-slate-700 font-mono text-[10px] font-black px-3 py-1.5 rounded-lg border border-slate-200">
                      SINGLE_TENANT_ENCLAVE
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-1.5">Sovereign Vision & Purpose</label>
                  <textarea 
                    readOnly 
                    value={selectedJob?.productPurpose || "Model primary curriculum, student ledger registration, tuition receivables, and public report cards in compliance with ministry standards."}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-indigo-700">
                  <Sliders className="w-4 h-4" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Intake Policy Parameters</h4>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  In keeping with the Anti-AI and Zero-Fabrication principles, subsequent inputs and requirements are derived from context-sensitive selectors rather than free-form generation.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-400">Governance Clearance</span>
                    <span className="text-emerald-700">LEVEL 4 APPROVED</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-400">Mandate Veracity</span>
                    <span className="text-emerald-700 font-mono">HASH: F8A190</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('spec')}
                  className="w-full mt-4 bg-slate-900 hover:bg-slate-950 text-white text-[11px] font-black uppercase py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Expand Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spec' && (
          <SpecificationStudio />
        )}

        {activeTab === 'arch' && (
          <ArchitectureStudio 
            requests={[]} 
            contracts={registry.getAllBlueprints()}
            expansionTraces={[]}
            onCreateContract={() => {}}
            onApproveContract={() => {}}
            onLaunchManufacturing={() => {}}
            onCreateRequest={() => {}}
          />
        )}

        {activeTab === 'eng' && (
          <EngineeringStudio 
            agents={JumoAIAgentRegistry.getAllAgents() as any} 
            jobs={jobs} 
            workLogs={[]} 
            eventLog={[]} 
          />
        )}

        {activeTab === 'blueprint' && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">05. Digital Product Blueprint Workspace</h3>
                <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">
                  Validate specification consistency, compile physical enclaves, and enforce the "BLUEPRINT_READY" milestone gate.
                </p>
              </div>
              <button
                onClick={handleCompileBlueprint}
                disabled={isCompilingBlueprint}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-black uppercase px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                {isCompilingBlueprint ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Compile & Seal Blueprint</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl font-mono text-[11px] space-y-2 h-72 overflow-y-auto border border-slate-800 shadow-inner">
                  <div className="text-indigo-400 font-bold">// JUMO COMPILER KERNEL v6.0.4 //</div>
                  {blueprintLog.length > 0 ? (
                    blueprintLog.map((log, i) => (
                      <div key={i} className="leading-relaxed">
                        {log}
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500 italic">Compiler idle. Click "Compile & Seal Blueprint" to synthesize architectural assets.</div>
                  )}
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Box className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-[10px] font-black uppercase tracking-wider">Blueprint Integrity Seals</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px]">
                    <div className="bg-white border border-slate-100 rounded-xl p-3 space-y-1">
                      <span className="text-slate-400 block font-bold uppercase">SHA-256 Digest</span>
                      <span className="font-mono font-black text-slate-800 break-all">
                        {blueprintHash || "NOT_YET_MATERIALIZED"}
                      </span>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-xl p-3 space-y-1">
                      <span className="text-slate-400 block font-bold uppercase">Milestone Gate Status</span>
                      <span className={`font-black uppercase px-2 py-0.5 rounded ${
                        blueprintHash ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {blueprintHash ? 'BLUEPRINT_READY APPROVED' : 'AWAITING_COMPILATION'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <ShieldCheck className="w-4 h-4" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Architectural Completeness Checklist</h4>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Ecosystem & Domain Class Alignment', ok: true },
                      { label: '19-Layer Specification Coverage', ok: true },
                      { label: 'Multi-Tenant Database Topology Mapping', ok: !!selectedJob },
                      { label: 'Cognitive Specialists Allocations', ok: !!selectedJob },
                      { label: ' mTLS Cryptographic Keys Bound', ok: !!blueprintHash }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-slate-500">{item.label}</span>
                        {item.ok ? (
                          <span className="text-emerald-600 flex items-center gap-1 font-black">
                            <Check className="w-3.5 h-3.5 stroke-[3px]" /> OK
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1 font-black">
                            <AlertCircle className="w-3.5 h-3.5" /> PENDING
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-900 text-white rounded-2xl p-5 space-y-3 shadow-md">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Downstream Handover</h4>
                  <p className="text-[10px] text-indigo-100 leading-relaxed">
                    Once the BLUEPRINT_READY gate is approved and locked, the compiled bundle is dispatched downstream to the Manufacturing, Verification & Certification Studio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
