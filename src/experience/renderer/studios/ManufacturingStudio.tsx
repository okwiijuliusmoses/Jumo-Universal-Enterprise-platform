import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings2, ChevronRight, CheckCircle2, Circle, AlertCircle, Play, Pause, 
  Square, Activity, GitCommit, GitPullRequest, GitBranch, Binary, Cpu, 
  Network, ShieldAlert, Lock, Check, Timer, RefreshCw
} from 'lucide-react';
import { ManufacturingJob, ManufacturingJobStatus, ArchitectureContract } from '../../../core/factory/registry/HubRegistryTypes';
import { CoordinationEvent } from '../../../core/runtime/sovereignState';

interface ManufacturingStudioProps {
  jobs: ManufacturingJob[];
  contracts?: ArchitectureContract[];
  onPromoteJob: (jobId: string) => void;
  onPauseJob: (jobId: string) => void;
  eventLog?: CoordinationEvent[];
}

// Canonical 32-Stage Government-Scale Manufacturing Lifecycle
const PIPELINE_STAGES: { stage: string; statusKey: ManufacturingJobStatus; label: string; desc: string; requiresApproval?: boolean }[] = [
  { stage: "01", statusKey: "DIGITAL_INTAKE", label: "Digital Intake", desc: "Ingesting raw specification from Digital Specification Studio." },
  { stage: "02", statusKey: "SPECIFICATION_NORMALIZATION", label: "Specification Normalization", desc: "Converting specs into standardized canonical schema properties." },
  { stage: "03", statusKey: "PLATFORM_INSTANCE_DEFINITION", label: "Platform Instance Definition", desc: "Establishing tenant-isolated runtime identifiers and limits." },
  { stage: "04", statusKey: "PROVISIONING", label: "Provisioning", desc: "Resolving platform templates and environment variables." },
  { stage: "05", statusKey: "ARCHITECTURE_DISCOVERY", label: "Architecture Discovery", desc: "Evaluating layer boundaries, system families, and interfaces." },
  { stage: "06", statusKey: "ARCHITECTURE_EXPANSION", label: "Architecture Expansion", desc: "Expanding system domains, portals, modules, and workforce requirements." },
  { stage: "07", statusKey: "ARCHITECTURE_VERIFICATION", label: "Architecture Verification", desc: "Verifying dependency completeness, security controls, and resilience." },
  { stage: "08", statusKey: "ARCHITECTURE_CONTRACT_GENERATION", label: "Architecture Contract Generation", desc: "Locking the authoritative, cryptographically signed contract.", requiresApproval: true },
  { stage: "09", statusKey: "HUMAN_ARCHITECT_APPROVAL", label: "Human Architect Approval", desc: "Mapping sovereign regulatory rules and administrative approval.", requiresApproval: true },
  { stage: "10", statusKey: "WORKFORCE_ORCHESTRATION", label: "Workforce Orchestration", desc: "Allocating registered engineering agents to manufacturing workloads." },
  { stage: "11", statusKey: "REQUIREMENTS_DECOMPOSITION", label: "Requirements Decomposition", desc: "Decomposing architecture specifications into granular engineering tasks." },
  { stage: "12", statusKey: "SYSTEM_DESIGN", label: "System Design", desc: "Synthesizing micro-services, state machines, and component boundaries." },
  { stage: "13", statusKey: "DATA_ARCHITECTURE", label: "Data Architecture", desc: "Structuring data domains, indexes, and persistence specifications." },
  { stage: "14", statusKey: "API_AND_INTEGRATION_ENGINEERING", label: "API & Integration Engineering", desc: "Establishing secure gateway protocols and interoperability stubs." },
  { stage: "15", statusKey: "SECURITY_ENGINEERING", label: "Security Engineering", desc: "Configuring zero-trust perimeters, cryptography, and RBAC rules." },
  { stage: "16", statusKey: "APPLICATION_ENGINEERING", label: "Application Engineering", desc: "Manufacturing user interfaces, workflows, and frontend controllers." },
  { stage: "17", statusKey: "COMMERCIAL_PRODUCT_ENGINEERING", label: "Commercial Product Engineering", desc: "Synthesizing commercial product extension packages and pricing logic." },
  { stage: "18", statusKey: "AI_AND_AUTOMATION_ENGINEERING", label: "AI & Automation Engineering", desc: "Wiring JUMO GPT reasoning agents and automated workflows." },
  { stage: "19", statusKey: "INFRASTRUCTURE_ENGINEERING", label: "Infrastructure Engineering", desc: "Synthesizing compute, container topology, and virtual networking." },
  { stage: "20", statusKey: "DEPENDENCY_RESOLUTION", label: "Dependency Resolution", desc: "Resolving version matrices and supply-chain air-gap packages." },
  { stage: "21", statusKey: "SCHEMA_MANUFACTURING", label: "Schema Manufacturing", desc: "Compiling database migrations and ORM schema definitions." },
  { stage: "22", statusKey: "SOURCE_AND_ARTIFACT_GENERATION", label: "Source & Artifact Generation", desc: "Generating build manifests and source code artifacts." },
  { stage: "23", statusKey: "COMPILATION", label: "Compilation", desc: "Executing software compilation with zero-leak memory verification." },
  { stage: "24", statusKey: "BUILD_ASSEMBLY", label: "Build Assembly", desc: "Assembling multi-layer binaries into sealed deployment artifacts." },
  { stage: "25", statusKey: "APPLICATION_COMPLETENESS_VERIFICATION", label: "Application Completeness Verification", desc: "Comparing requested specification against generated artifacts." },
  { stage: "26", statusKey: "SECURITY_AND_ZERO_TRUST_VERIFICATION", label: "Security & Zero-Trust Verification", desc: "Verifying zero-trust identity policies and cryptographic boundaries.", requiresApproval: true },
  { stage: "27", statusKey: "INTEGRATION_VERIFICATION", label: "Integration Verification", desc: "Validating inter-service APIs, database connections, and event queues." },
  { stage: "28", statusKey: "END_TO_END_SYSTEM_TESTING", label: "End-to-End System Testing", desc: "Validating total system end-to-end operational readiness." },
  { stage: "29", statusKey: "REGRESSION_AND_RESILIENCE_TESTING", label: "Regression & Resilience Testing", desc: "Simulating high-throughput load and failover resilience." },
  { stage: "30", statusKey: "CERTIFICATION_AND_HUMAN_ACCEPTANCE", label: "Certification & Human Acceptance", desc: "Issuing official Sovereign Manufacturing Hub Certification Seal.", requiresApproval: true },
  { stage: "31", statusKey: "DEPLOYMENT_AND_PUBLISHING", label: "Deployment & Publishing", desc: "Deploying release candidate to target production cluster nodes.", requiresApproval: true },
  { stage: "32", statusKey: "RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT", label: "Runtime Activation & Continuous Audit", desc: "Operating live platform instance with real-time health telemetry." }
];

import { JumoFloatingAssistant } from '../../shell/JumoFloatingAssistant';
import { Search, Keyboard, Bot, Sparkles, Users } from 'lucide-react';

export const ManufacturingStudio: React.FC<ManufacturingStudioProps> = ({
  jobs = [],
  contracts = [],
  onPromoteJob,
  onPauseJob,
  eventLog = []
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'pipeline' | 'assistant'>('pipeline');

  useEffect(() => {
    if (jobs && jobs.length > 0 && !selectedJobId) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId]);

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const linkedContract = selectedJob && contracts.find(c => 
    c.id === selectedJob.productId || 
    (c.productIdentity?.name || "").toLowerCase() === (selectedJob?.productId || "").toLowerCase()
  );

  const getStageState = (stageKey: ManufacturingJobStatus, index: number): 'COMPLETED' | 'RUNNING' | 'FAILED' | 'BLOCKED' | 'READY' | 'WAITING_APPROVAL' | 'NOT_CONFIGURED' | 'NO_ACTIVE_JOB' => {
    if (!selectedJob) return 'NO_ACTIVE_JOB';
    const stageSequenceKeys = PIPELINE_STAGES.map(s => s.statusKey);
    const currentIdx = stageSequenceKeys.indexOf(selectedJob.status);
    
    if (selectedJob.status === 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT') {
      return 'COMPLETED';
    }

    if (selectedJob.status === 'FAILED') {
      if (index < currentIdx) return 'COMPLETED';
      if (index === currentIdx) return 'FAILED';
      return 'BLOCKED';
    }

    if (index < currentIdx) return 'COMPLETED';
    else if (index === currentIdx) {
      if (selectedJob.status === 'BLOCKED') return 'BLOCKED';
      
      const approvalStages: ManufacturingJobStatus[] = [
        'HUMAN_ARCHITECT_APPROVAL', 
        'ARCHITECTURE_CONTRACT_GENERATION', 
        'SECURITY_AND_ZERO_TRUST_VERIFICATION', 
        'CERTIFICATION_AND_HUMAN_ACCEPTANCE', 
        'DEPLOYMENT_AND_PUBLISHING'
      ];
      
      if (approvalStages.includes(stageKey)) return 'WAITING_APPROVAL';
      return 'RUNNING';
    } else return 'READY';
  };

  return (
    <div className="space-y-6" id="manufacturing-pipeline-studio">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center">
            <Settings2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">National Manufacturing Pipeline</h2>
            <p className="text-xs text-slate-500 font-semibold">Immutable Orchestration & Sovereign Instance Deployment Control</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveView('pipeline')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${activeView === 'pipeline' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}
          >
            Pipeline
          </button>
          <button 
            onClick={() => setActiveView('assistant')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${activeView === 'assistant' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
          >
            Assistant
          </button>
          <span className="text-[10px] font-black tracking-wider px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full uppercase">
            {jobs.filter(j => j.status !== 'RUNTIME_ACTIVE' && j.status !== 'FAILED').length} Active Compile Streams
          </span>
        </div>
      </div>

      {/* JUMO UEOS — Relocated Studio Capabilities (Search & Shortcuts) */}
      <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search Manufacturing Streams (Jobs, Artifacts, Stages)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 border border-slate-200 cursor-pointer"
            title="Studio Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
            <span>Shortcuts</span>
          </button>
          <button 
            onClick={() => setActiveView('assistant')}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Ask JUMO GPT</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'pipeline' ? (
          <motion.div 
            key="view-pipeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Compile Streams</h3>
              <span className="text-[9px] font-black uppercase text-slate-400">Select Job To View Pipeline</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
              {jobs.map((job) => {
                const isSelected = job.id === selectedJobId;
                return (
                  <button key={job.id} onClick={() => setSelectedJobId(job.id)} className={'w-full flex items-center justify-between p-4 text-left transition-all ' + (isSelected ? 'bg-blue-50/30 border-l-4 border-blue-600' : 'hover:bg-slate-50/40 border-l-4 border-transparent')}>
                    <div className="flex items-center gap-3">
                      <div className={'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ' + (job.status === 'RUNTIME_ACTIVE' ? 'bg-emerald-50 text-emerald-600' : job.status === 'FAILED' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600 animate-pulse')}>
                        {job.status === 'RUNTIME_ACTIVE' ? <CheckCircle2 className="w-4 h-4" /> : job.status === 'FAILED' ? <AlertCircle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-800 tracking-tight font-mono">{job.id}</div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">{job.productId}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={'px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border block text-center ' + (job.status === 'RUNTIME_ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : job.status === 'FAILED' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100')}>
                        {job.status}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-slate-400 mt-1 block">{Math.round(job.progress)}% progress</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          {selectedJob && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 font-mono">Job Orchestration Interface</span>
                  <h4 className="text-sm font-extrabold text-slate-800">{selectedJob.id} Control Panel</h4>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => onPauseJob(selectedJob.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 cursor-pointer hover:bg-white transition-all"><Pause className="w-4 h-4" /></button>
                  <button onClick={() => onPromoteJob(selectedJob.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 cursor-pointer hover:bg-white transition-all"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => onPromoteJob(selectedJob.id)} className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase cursor-pointer">Promote</button>
                <button onClick={() => onPauseJob(selectedJob.id)} className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase cursor-pointer">Pause</button>
              </div>
            </div>
          )}
          {selectedJob && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden flex flex-col h-72">
              <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Activity className="w-3.5 h-3.5" />Logs</h4>
                <span className="text-[9px] font-mono text-slate-500 uppercase font-black">{selectedJob.id}</span>
              </div>
              <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-2 p-4">
                {selectedJob.logs.map((log, i) => <div key={i} className="text-emerald-400">{log}</div>)}
              </div>
            </div>
          )}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                Coordination Fabric Event Log
              </h3>
            </div>
            <div className="max-h-64 overflow-y-auto p-4 space-y-2">
              {eventLog.map(evt => (
                <div key={evt.id} className="text-[10px] text-slate-500 font-medium">
                  <span className="font-bold text-slate-800">{evt.action}</span>
                  <p className="line-clamp-1">Target: {evt.entityId}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col h-[700px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">Manufacturing Pipeline Execution</h3>
            {selectedJob && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-400">Current Node:</span>
                <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{selectedJob.status}</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            {PIPELINE_STAGES.map((stage, idx) => {
              const state = getStageState(stage.statusKey, idx);
              return (
                <div 
                  key={stage.stage}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                    state === 'RUNNING' ? 'bg-blue-50/50 border-blue-200 shadow-sm' :
                    state === 'COMPLETED' ? 'bg-slate-50 border-slate-100 opacity-60' :
                    state === 'FAILED' ? 'bg-rose-50 border-rose-200' :
                    'bg-white border-slate-100 opacity-40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border ${
                      state === 'RUNNING' ? 'bg-blue-600 border-blue-600 text-white animate-pulse' :
                      state === 'COMPLETED' ? 'bg-emerald-600 border-emerald-600 text-white' :
                      state === 'FAILED' ? 'bg-rose-600 border-rose-600 text-white' :
                      'bg-white border-slate-200 text-slate-400'
                    }`}>
                      {state === 'COMPLETED' ? <Check className="w-4 h-4" /> : stage.stage}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{stage.label}</span>
                        {stage.requiresApproval && (
                          <span className="text-[8px] font-black px-1.5 py-0.5 bg-amber-100 text-amber-700 border border-amber-200 rounded-sm uppercase tracking-widest">Auth Required</span>
                        )}
                      </div>
                      <p className="text-[9px] font-medium text-slate-500 mt-0.5 leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[9px] font-black uppercase tracking-wider ${
                      state === 'RUNNING' ? 'text-blue-600' :
                      state === 'COMPLETED' ? 'text-emerald-600' :
                      state === 'FAILED' ? 'text-rose-600' :
                      'text-slate-400'
                    }`}>
                      {state}
                    </span>
                    {state === 'RUNNING' && <Timer className="w-3.5 h-3.5 text-blue-400 animate-spin" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    ) : (
      <motion.div 
        key="view-assistant"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl h-[700px]"
      >
        <JumoFloatingAssistant activeStudio="MANUFACTURING" variant="embedded" />
      </motion.div>
    )}
    </AnimatePresence>
    </div>
  );
};
