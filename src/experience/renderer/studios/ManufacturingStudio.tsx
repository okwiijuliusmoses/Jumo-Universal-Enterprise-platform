import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings2, ChevronRight, CheckCircle2, Circle, AlertCircle, Play, Pause, 
  Square, Activity, GitCommit, GitPullRequest, GitBranch, Binary, Cpu, 
  Network, ShieldAlert, Lock, Check, Timer, RefreshCw
} from 'lucide-react';
import { ManufacturingJob, ManufacturingJobStatus } from '../../../core/factory/registry/HubRegistryTypes';

interface ManufacturingStudioProps {
  jobs: ManufacturingJob[];
  onPromoteJob: (jobId: string) => void;
  onPauseJob: (jobId: string) => void;
}

// Canonical 32-Stage Government-Scale Manufacturing Lifecycle
const PIPELINE_STAGES: { stage: string; statusKey: ManufacturingJobStatus; label: string; desc: string; requiresApproval?: boolean }[] = [
  { stage: "01", statusKey: "DIGITAL_INTAKE", label: "Digital Intake", desc: "Ingesting raw specification from Digital Specification Studio." },
  { stage: "02", statusKey: "REQUIREMENTS_NORMALIZATION", label: "Requirements Normalization", desc: "Converting specs into standardized canonical schema properties." },
  { stage: "03", statusKey: "INSTANCE_DEFINED", label: "Platform Instance Definition", desc: "Establishing tenant-isolated runtime identifiers and limits." },
  { stage: "04", statusKey: "PROVISIONING", label: "Provisioning Configuration", desc: "Resolving platform templates and environment variables." },
  { stage: "05", statusKey: "ARCHITECTURE_RESOLVING", label: "Architecture Resolution", desc: "Evaluating layer boundaries, system families, and interfaces." },
  { stage: "06", statusKey: "CONTRACT_GENERATED", label: "Architecture Contract Generation", desc: "Locking the authoritative, cryptographically signed contract.", requiresApproval: true },
  { stage: "07", statusKey: "GOVERNANCE_POLICY_MAPPING", label: "Governance & Policy Mapping", desc: "Mapping sovereign regulatory rules and administrative policies.", requiresApproval: true },
  { stage: "08", statusKey: "SECURITY_CLASSIFICATION", label: "Security Classification", desc: "Classifying data sensitivity, zero-trust perimeter, and encryption." },
  { stage: "09", statusKey: "DATA_ARCHITECTURE", label: "Data Architecture", desc: "Structuring data domains, indexes, and persistence specifications." },
  { stage: "10", statusKey: "INTEGRATION_CONTRACTING", label: "Integration Contracting", desc: "Establishing secure gateway protocols and interoperability stubs." },
  { stage: "11", statusKey: "EXPERIENCE_SPECIFICATION", label: "Experience Specification", desc: "Configuring portal interfaces, accessibility, and RBAC layouts." },
  { stage: "12", statusKey: "AI_WORKFORCE_ASSIGNMENT", label: "AI Workforce Assignment", desc: "Allocating JUMO GPT agent swarm to manufacturing workloads." },
  { stage: "13", statusKey: "DEPENDENCY_RESOLUTION", label: "Dependency Resolution", desc: "Resolving version matrices and supply-chain air-gap packages." },
  { stage: "14", statusKey: "LAYERS_ASSEMBLING", label: "Layers Assembly", desc: "Synthesizing and aligning multi-layer software modules." },
  { stage: "15", statusKey: "INFRASTRUCTURE_DESIGN", label: "Infrastructure Design", desc: "Synthesizing compute, container topology, and virtual networking." },
  { stage: "16", statusKey: "SCHEMA_MANUFACTURING", label: "Schema Manufacturing", desc: "Compiling database migrations and ORM schema definitions." },
  { stage: "17", statusKey: "ARTIFACT_GENERATION", label: "Artifact Generation", desc: "Generating build manifests and source code artifacts." },
  { stage: "18", statusKey: "COMPILING_BUILDING", label: "Compiling & Building", desc: "Executing software compilation with zero-leak memory verification." },
  { stage: "19", statusKey: "STATIC_SUPPLY_CHAIN_ANALYSIS", label: "Static Supply-Chain Analysis", desc: "Auditing dependencies and code patterns for security vulnerabilities." },
  { stage: "20", statusKey: "UNIT_TESTING", label: "Unit Testing", desc: "Executing automated unit test suites with zero-regression assertion." },
  { stage: "21", statusKey: "INTEGRATION_TESTING", label: "Integration Testing", desc: "Validating inter-service APIs, database connections, and event queues." },
  { stage: "22", statusKey: "SECURITY_VERIFICATION", label: "Security Verification", desc: "Verifying zero-trust identity policies and cryptographic boundaries.", requiresApproval: true },
  { stage: "23", statusKey: "PERFORMANCE_RESILIENCE_TESTING", label: "Performance & Resilience Testing", desc: "Simulating high-throughput load and failover resilience." },
  { stage: "24", statusKey: "SYSTEM_E2E_VERIFICATION", label: "System E2E Verification", desc: "Validating total system end-to-end operational readiness." },
  { stage: "25", statusKey: "COMPLIANCE_VERIFICATION", label: "Compliance Verification", desc: "Auditing platform compliance against national sovereign standards." },
  { stage: "26", statusKey: "CERTIFICATION_ACCEPTANCE", label: "Certification Acceptance", desc: "Issuing official Sovereign Manufacturing Hub Certification Seal.", requiresApproval: true },
  { stage: "27", statusKey: "RELEASE_CANDIDATE", label: "Release Candidate", desc: "Signing release candidate package and locking binary checksums.", requiresApproval: true },
  { stage: "28", statusKey: "PRODUCTION_DEPLOYMENT", label: "Production Deployment", desc: "Deploying release candidate to target production cluster nodes.", requiresApproval: true },
  { stage: "29", statusKey: "PRODUCTION_VERIFICATION", label: "Production Verification", desc: "Executing post-deployment smoke tests and runtime health assertion." },
  { stage: "30", statusKey: "PUBLISHING_ACTIVATION", label: "Publishing & Activation", desc: "Activating public routing, DNS, and operational gateways.", requiresApproval: true },
  { stage: "31", statusKey: "RUNTIME_ACTIVE", label: "Runtime Active", desc: "Operating live platform instance with real-time health telemetry." },
  { stage: "32", statusKey: "CONTINUOUS_OPERATIONS", label: "Continuous Operations", desc: "Ongoing zero-trust security monitoring, audit logging, and scaling." }
];

export const ManufacturingStudio: React.FC<ManufacturingStudioProps> = ({
  jobs = [],
  onPromoteJob,
  onPauseJob
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Auto-select the first job if none selected
  useEffect(() => {
    if (jobs && jobs.length > 0 && !selectedJobId) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId]);

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  // Helper to determine the status of a specific stage for the selected job
  const getStageState = (stageKey: ManufacturingJobStatus, index: number): 'COMPLETED' | 'RUNNING' | 'FAILED' | 'BLOCKED' | 'READY' | 'WAITING_APPROVAL' | 'NOT_CONFIGURED' | 'NO_ACTIVE_JOB' => {
    if (!selectedJob) return 'NO_ACTIVE_JOB';

    const stageSequenceKeys = PIPELINE_STAGES.map(s => s.statusKey);
    const currentIdx = stageSequenceKeys.indexOf(selectedJob.status);

    if (selectedJob.status === 'RUNTIME_ACTIVE') {
      return 'COMPLETED';
    }

    if (selectedJob.status === 'FAILED') {
      if (index < currentIdx) return 'COMPLETED';
      if (index === currentIdx) return 'FAILED';
      return 'BLOCKED';
    }

    // Special state when a job is paused
    const isPaused = selectedJob.logs.some(l => l.includes('PAUSED')) && !selectedJob.logs.some(l => l.includes('RESUMED'));

    if (index < currentIdx) {
      return 'COMPLETED';
    } else if (index === currentIdx) {
      if (isPaused) return 'BLOCKED';
      // Specific stages requiring human operator approval gate
      const approvalStages: ManufacturingJobStatus[] = [
        'CONTRACT_GENERATED',
        'GOVERNANCE_POLICY_MAPPING',
        'SECURITY_VERIFICATION',
        'CERTIFICATION_ACCEPTANCE',
        'RELEASE_CANDIDATE',
        'PRODUCTION_DEPLOYMENT',
        'PUBLISHING_ACTIVATION'
      ];
      if (approvalStages.includes(stageKey)) {
        return 'WAITING_APPROVAL';
      }
      return 'RUNNING';
    } else {
      return 'READY';
    }
  };

  return (
    <div className="space-y-6" id="manufacturing-pipeline-studio">
      {/* Header */}
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
          <span className="text-[10px] font-black tracking-wider px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full uppercase">
            {jobs.filter(j => j.status !== 'RUNTIME_ACTIVE' && j.status !== 'FAILED').length} Active Compile Streams
          </span>
          <span className="text-[10px] font-black tracking-wider px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase">
            {jobs.filter(j => j.status === 'RUNTIME_ACTIVE').length} Activated Runtimes
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Jobs & Active Console Logs) - Span 5 */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Streams List */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Compile Streams</h3>
              <span className="text-[9px] font-black uppercase text-slate-400">Select Job To View Pipeline</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
              {jobs.map((job) => {
                const isSelected = job.id === selectedJobId;
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`w-full flex items-center justify-between p-4 text-left transition-all ${
                      isSelected ? 'bg-blue-50/30 border-l-4 border-blue-600' : 'hover:bg-slate-50/40 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        job.status === 'RUNTIME_ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 
                        job.status === 'FAILED' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600 animate-pulse'
                      }`}>
                        {job.status === 'RUNTIME_ACTIVE' ? <CheckCircle2 className="w-4 h-4" /> : 
                         job.status === 'FAILED' ? <AlertCircle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-800 tracking-tight font-mono">{job.id}</div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">{job.productId}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border block text-center ${
                        job.status === 'RUNTIME_ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        job.status === 'FAILED' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        {job.status}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-slate-400 mt-1 block">{Math.round(job.progress)}% progress</span>
                    </div>
                  </button>
                );
              })}

              {jobs.length === 0 && (
                <div className="p-16 text-center space-y-3 opacity-50">
                  <Activity className="w-10 h-10 mx-auto text-slate-400 animate-pulse" />
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase">No Active Compiler Jobs</p>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 leading-relaxed">
                      Deploy and compile system specs in the Digital Specification or Architecture Studio to spin up a pipeline.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Core Controls for selected Job */}
          {selectedJob && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 font-mono">Job Orchestration Interface</span>
                  <h4 className="text-sm font-extrabold text-slate-800">{selectedJob.id} Control Panel</h4>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => onPauseJob(selectedJob.id)}
                    disabled={selectedJob.status === 'RUNTIME_ACTIVE' || selectedJob.status === 'FAILED'}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 disabled:opacity-30 cursor-pointer hover:bg-white transition-all"
                    title="Pause Compile Process"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onPromoteJob(selectedJob.id)}
                    disabled={selectedJob.status === 'RUNTIME_ACTIVE' || selectedJob.status === 'FAILED'}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 disabled:opacity-30 cursor-pointer hover:bg-white transition-all"
                    title="Manually Promote Stage"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => onPromoteJob(selectedJob.id)}
                  disabled={selectedJob.status === 'RUNTIME_ACTIVE' || selectedJob.status === 'FAILED'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase transition-all shadow-xs disabled:opacity-40 disabled:hover:bg-slate-900 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                  Promote Stage
                </button>
                <button
                  onClick={() => onPauseJob(selectedJob.id)}
                  disabled={selectedJob.status === 'RUNTIME_ACTIVE' || selectedJob.status === 'FAILED'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase transition-all border border-slate-200/60 disabled:opacity-40 disabled:hover:bg-slate-100 cursor-pointer"
                >
                  <Pause className="w-4 h-4" />
                  Pause Stream
                </button>
              </div>
            </div>
          )}

          {/* Immutable Logs Console */}
          {selectedJob && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden flex flex-col h-72">
              <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  Stream Cryptographic Logs
                </h4>
                <span className="text-[9px] font-mono text-slate-500 uppercase font-black">{selectedJob.id}</span>
              </div>
              <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-2 p-4 scrollbar-thin scrollbar-thumb-slate-800">
                {selectedJob.logs.map((log, i) => (
                  <div key={i} className="flex gap-2 text-emerald-400/90 leading-relaxed">
                    <span className="text-slate-600 select-none">›</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Complete 20-Stage Pipeline Visualization Map - Span 7 */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col">
          <div className="border-b border-slate-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-tight">Authoritative 20-Stage Operating System Pipeline</h3>
              <p className="text-xs text-slate-500 mt-1">Live status of the compiled specification transitioning through JUMO UEOS core layers.</p>
            </div>
            {selectedJob && (
              <div className="px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-[9px] font-black uppercase text-slate-400 block">Overall compile progress</span>
                <span className="text-xs font-black text-slate-800">{Math.round(selectedJob.progress)}%</span>
              </div>
            )}
          </div>

          {/* 20-Stage Stepper View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 max-h-[640px] overflow-y-auto pr-1">
            {PIPELINE_STAGES.map((stage, idx) => {
              const state = getStageState(stage.statusKey, idx);
              
              // Map states to color guidelines and visual presentation
              let stateBgClass = '';
              let stateBorderClass = '';
              let stateIcon: React.ReactNode = null;
              let labelColorClass = 'text-slate-700';

              switch (state) {
                case 'COMPLETED':
                  stateBgClass = 'bg-emerald-500 text-white';
                  stateBorderClass = 'border-emerald-500';
                  stateIcon = <Check className="w-3.5 h-3.5 font-bold" />;
                  break;
                case 'RUNNING':
                  stateBgClass = 'bg-blue-600 text-white animate-pulse';
                  stateBorderClass = 'border-blue-600';
                  stateIcon = <Activity className="w-3.5 h-3.5 animate-spin" />;
                  labelColorClass = 'text-blue-900 font-black';
                  break;
                case 'FAILED':
                  stateBgClass = 'bg-rose-600 text-white';
                  stateBorderClass = 'border-rose-600';
                  stateIcon = <ShieldAlert className="w-3.5 h-3.5" />;
                  labelColorClass = 'text-rose-900 font-black';
                  break;
                case 'BLOCKED':
                  stateBgClass = 'bg-slate-300 text-slate-600';
                  stateBorderClass = 'border-slate-300';
                  stateIcon = <Lock className="w-3.5 h-3.5" />;
                  labelColorClass = 'text-slate-400';
                  break;
                case 'WAITING_APPROVAL':
                  stateBgClass = 'bg-amber-500 text-white animate-pulse';
                  stateBorderClass = 'border-amber-500';
                  stateIcon = <Timer className="w-3.5 h-3.5" />;
                  labelColorClass = 'text-amber-950 font-black';
                  break;
                case 'READY':
                  stateBgClass = 'bg-slate-100 text-slate-500';
                  stateBorderClass = 'border-slate-200';
                  stateIcon = <Circle className="w-3.5 h-3.5 text-slate-400" />;
                  labelColorClass = 'text-slate-500';
                  break;
                case 'NOT_CONFIGURED':
                case 'NO_ACTIVE_JOB':
                default:
                  stateBgClass = 'bg-slate-100 text-slate-400';
                  stateBorderClass = 'border-slate-200';
                  stateIcon = <Circle className="w-3.5 h-3.5 text-slate-300" />;
                  labelColorClass = 'text-slate-400';
                  break;
              }

              return (
                <div 
                  key={stage.stage}
                  className={`flex gap-3.5 p-3.5 rounded-xl border text-left transition-all ${
                    state === 'RUNNING' ? 'bg-blue-50/20 border-blue-500/50 shadow-xs' : 
                    state === 'FAILED' ? 'bg-rose-50/10 border-rose-500/30' : 
                    state === 'WAITING_APPROVAL' ? 'bg-amber-50/20 border-amber-500/40' : 
                    'bg-slate-50/40 border-slate-200/80'
                  }`}
                >
                  {/* Circle Step Number */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 font-mono font-black text-xs ${stateBgClass} ${stateBorderClass}`}>
                    {stateIcon ? stateIcon : stage.stage}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">Stage {stage.stage}</span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest ${
                        state === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' : 
                        state === 'RUNNING' ? 'bg-blue-50 text-blue-700' : 
                        state === 'FAILED' ? 'bg-rose-50 text-rose-700' : 
                        state === 'WAITING_APPROVAL' ? 'bg-amber-50 text-amber-700' : 
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {state}
                      </span>
                    </div>
                    <span className={`text-xs font-extrabold block leading-tight ${labelColorClass}`}>{stage.label}</span>
                    <p className="text-[10px] text-slate-500 leading-normal">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
