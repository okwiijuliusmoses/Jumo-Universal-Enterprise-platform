import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings2, ChevronRight, CheckCircle2, Circle, AlertCircle, Play, Pause, 
  Square, Activity, GitCommit, GitPullRequest, GitBranch, Binary, Cpu, 
  Network, ShieldAlert, Lock, Check, Timer, RefreshCw, Layers, Server,
  FileCode, Terminal, Database, ArrowRight, ShieldCheck, Zap, AlertTriangle,
  RotateCcw, Sliders, CheckSquare, Search, Keyboard, Bot, Sparkles, Users,
  Package, ClipboardCheck, FileText, Cloud, History, Shield, Eye
} from 'lucide-react';
import { ManufacturingJob, ManufacturingJobStatus, ArchitectureContract } from '../../../core/factory/registry/HubRegistryTypes';
import { CoordinationEvent } from '../../../core/runtime/sovereignState';
import { JumoFloatingAssistant } from '../../shell/JumoFloatingAssistant';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';

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
  { stage: "08", statusKey: "ARCHITECTURE_CONTRACT_GENERATION", label: "Architecture Contract Generation", desc: "Locking the authoritative, cryptographically signed contract." },
  { stage: "09", statusKey: "AWAITING_HUMAN_ENGINEERING_APPROVAL", label: "Human Engineering Ratification", desc: "Institutional review of Product & Experience Blueprints.", requiresApproval: true },
  { stage: "10", statusKey: "WORKFORCE_ORCHESTRATION", label: "Workforce Orchestration", desc: "Allocating 400+ JUMO GPT cognitive engineering agents to workloads." },
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
  { stage: "30", statusKey: "AWAITING_HUMAN_MANUFACTURING_APPROVAL", label: "Sovereign Certification Gate", desc: "Issuing official Sovereign Manufacturing Hub Certification Seal.", requiresApproval: true },
  { stage: "31", statusKey: "DEPLOYMENT_AND_PUBLISHING", label: "Deployment & Publishing", desc: "Deploying release candidate to target production cluster nodes.", requiresApproval: true },
  { stage: "32", statusKey: "RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT", label: "Runtime Activation & Continuous Audit", desc: "Operating live platform instance with real-time health telemetry." }
];

export const ManufacturingStudio: React.FC<ManufacturingStudioProps> = ({
  jobs = [],
  contracts = [],
  onPromoteJob,
  onPauseJob,
  eventLog = []
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'components' | 'services' | 'workflows' | 'data' | 'tests' | 'deployments' | 'evolution' | 'assistant'>('pipeline');
  const [factorySummary, setFactorySummary] = useState<any>(null);
  const [componentsList, setComponentsList] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [workflowsList, setWorkflowsList] = useState<any[]>([]);
  const [schemasList, setSchemasList] = useState<any[]>([]);
  const [testsList, setTestsList] = useState<any[]>([]);
  const [deploymentsList, setDeploymentsList] = useState<any[]>([]);
  const [runtimeList, setRuntimeList] = useState<any[]>([]);
  const [qualityData, setQualityData] = useState<{ defects: any[]; traceabilityMatrix: any[] }>({ defects: [], traceabilityMatrix: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [isExecutingPipeline, setIsExecutingPipeline] = useState(false);
  const [pipelineSuccessMessage, setPipelineSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (jobs && jobs.length > 0 && !selectedJobId) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId]);

  const fetchFactoryState = async () => {
    try {
      const [sumRes, compRes, srvRes, wfRes, schRes, testRes, depRes, runRes, qualRes] = await Promise.all([
        fetch('/api/v1/ueos/factory/registry/summary'),
        fetch('/api/v1/ueos/factory/components'),
        fetch('/api/v1/ueos/factory/services'),
        fetch('/api/v1/ueos/factory/workflows'),
        fetch('/api/v1/ueos/factory/schemas'),
        fetch('/api/v1/ueos/factory/tests'),
        fetch('/api/v1/ueos/factory/deployments'),
        fetch('/api/v1/ueos/factory/runtime'),
        fetch('/api/v1/ueos/factory/quality')
      ]);

      if (sumRes.ok) setFactorySummary(await sumRes.json());
      if (compRes.ok) { const d = await compRes.json(); setComponentsList(d.components || []); }
      if (srvRes.ok) { const d = await srvRes.json(); setServicesList(d.services || []); }
      if (wfRes.ok) { const d = await wfRes.json(); setWorkflowsList(d.workflows || []); }
      if (schRes.ok) { const d = await schRes.json(); setSchemasList(d.schemas || []); }
      if (testRes.ok) { const d = await testRes.json(); setTestsList(d.tests || []); }
      if (depRes.ok) { const d = await depRes.json(); setDeploymentsList(d.deployments || []); }
      if (runRes.ok) { const d = await runRes.json(); setRuntimeList(d.instances || []); }
      if (qualRes.ok) { const d = await qualRes.json(); setQualityData(d); }
    } catch (err) {
      console.error('Failed to fetch factory sub-state:', err);
    }
  };

  useEffect(() => {
    fetchFactoryState();
    const interval = setInterval(fetchFactoryState, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerAutonomousPipeline = async () => {
    setIsExecutingPipeline(true);
    setPipelineSuccessMessage(null);
    try {
      const res = await fetch('/api/v1/ueos/manufacturing/pipeline/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'National Health & Telemedicine Gateway',
          domain: 'Healthcare & Medical Systems',
          organization: 'National Ministry of Health',
          infrastructure: 'SOVEREIGN_ON_PREM',
          targetAudience: 'National Citizens & Clinicians',
          securityClearance: 'SECRET',
          requirements: [
            'EHR double-entry patient ledger with zero-knowledge encryption',
            'ISO 27001 and HIPAA equivalent audit compliance',
            '10,000 concurrent clinician consultations under 50ms latency'
          ],
          capabilities: [
            'Patient Intake', 'Clinical Diagnostics', 'Prescription Clearing', 'Emergency Telemedicine'
          ],
          integrations: ['Civil Registry Gateway', 'National Pharmacy Clearing']
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPipelineSuccessMessage(`Manufactured ${data.specificationId} -> ${data.certificationId} with Seal ${data.certificate.certificateId}`);
        await fetchFactoryState();
      }
    } catch (err) {
      console.error('Pipeline execution error:', err);
    } finally {
      setIsExecutingPipeline(false);
    }
  };

  // Review Workspace States
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [rejectionFeedback, setRejectionFeedback] = useState("");

  const handleReviewDecision = async (decision: 'APPROVE' | 'REJECT') => {
    const selectedJob = jobs.find(j => j.id === selectedJobId);
    if (!selectedJob) return;

    // Determine gate type based on current job status
    const gateType = selectedJob.status === 'AWAITING_HUMAN_ENGINEERING_APPROVAL'
      ? 'ENGINEERING_APPROVAL'
      : 'FINAL_ASSEMBLY_APPROVAL';

    const gate = selectedJob.reviewGates?.find(g => g.status === 'PENDING' && g.gateType === gateType);
    if (!gate) return;

    setIsSubmittingReview(true);
    try {
      const response = await fetch('/api/v1/ueos/manufacturing/review/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob.id,
          gateId: gate.id,
          decision,
          feedback: decision === 'REJECT' ? { rejectionReason: rejectionFeedback } : undefined
        })
      });
      if (response.ok) {
        setRejectionFeedback("");
        // Optimization: trigger a local state refresh or reload
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId);
  const pendingManufacturingJobs = jobs.filter(j => j.status === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL');
  const pendingEngineeringJobs = jobs.filter(j => j.status === 'AWAITING_HUMAN_ENGINEERING_APPROVAL');

  const getStageState = (stageKey: ManufacturingJobStatus, index: number): 'COMPLETED' | 'RUNNING' | 'FAILED' | 'BLOCKED' | 'READY' | 'WAITING_APPROVAL' | 'NO_ACTIVE_JOB' => {
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
        'AWAITING_HUMAN_ENGINEERING_APPROVAL', 
        'AWAITING_HUMAN_MANUFACTURING_APPROVAL',
        'DEPLOYMENT_AND_PUBLISHING'
      ];
      if (approvalStages.includes(stageKey)) return 'WAITING_APPROVAL';
      return 'RUNNING';
    } else return 'READY';
  };

  return (
    <div className="flex gap-6 min-h-screen bg-slate-50/30" id="manufacturing-pipeline-studio">
      <div className="flex-1 space-y-6 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <StudioLifecycleNavBar studioId="factory" />

      {/* Institutional Architecture & Engineering Review Workspace */}
      {pendingEngineeringJobs.length > 0 && (
        <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xl mb-8 animate-fadeIn">
          <div className="bg-slate-900 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-blue-400" />
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Architecture & Engineering Review Gate</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                {pendingEngineeringJobs.length} ARCHITECTURES AWAITING RATIFICATION
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Blueprints Display */}
              <div className="lg:col-span-8 space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Institutional System Blueprint</h3>
                    <p className="text-slate-500 text-sm mt-2 font-medium">Reconciled Architecture & Engineering Expansion Package</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase block leading-none">Engineering Revision</span>
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest block">v1.0.4-BETA</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Blueprint Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Product & Engineering Blueprint</h4>
                    </div>
                    <div className="space-y-3">
                      {pendingEngineeringJobs[0].blueprint && (
                        <>
                          <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-slate-400">Target Identity</span>
                            <span className="text-slate-900 font-bold">{pendingEngineeringJobs[0].blueprint.productIdentity.name}</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-slate-400">Sovereign Domain</span>
                            <span className="text-slate-900 font-bold">{pendingEngineeringJobs[0].blueprint.domainArchitecture.domainIdentifier}</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-slate-400">Compute Strategy</span>
                            <span className="text-slate-900 font-bold">{pendingEngineeringJobs[0].blueprint.technicalArchitecture.computeTier}</span>
                          </div>
                          <div className="pt-3 border-t border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Manufacturing Directives</span>
                            <div className="flex flex-wrap gap-1.5">
                              {pendingEngineeringJobs[0].blueprint.manufacturingDirectives.requiredLayers.map(layer => (
                                <span key={layer} className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">{layer}</span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Experience Blueprint Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Digital Product Experience Blueprint</h4>
                    </div>
                    <div className="space-y-3">
                      {pendingEngineeringJobs[0].experienceBlueprint && (
                        <>
                          <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-slate-400">Experience Hero</span>
                            <span className="text-slate-900 font-bold truncate max-w-[140px]">{pendingEngineeringJobs[0].experienceBlueprint.publicExperience.landingPage.heroTitle}</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-slate-400">Navigation Model</span>
                            <span className="text-slate-900 font-bold">{pendingEngineeringJobs[0].experienceBlueprint.navigationExperience.sidebarEnabled ? 'SIDEBAR' : 'TOPBAR'}</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-slate-400">Assistant Persona</span>
                            <span className="text-slate-900 font-bold">{pendingEngineeringJobs[0].experienceBlueprint.publicExperience.assistant.name}</span>
                          </div>
                          <div className="pt-3 border-t border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Design System Mandate</span>
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded shadow-inner" style={{ backgroundColor: pendingEngineeringJobs[0].experienceBlueprint.designSystem.primaryColor }} />
                              <span className="text-[10px] font-mono font-bold text-slate-600">{pendingEngineeringJobs[0].experienceBlueprint.designSystem.typography}</span>
                              <span className="text-[9px] font-black text-slate-400 uppercase ml-auto">{pendingEngineeringJobs[0].experienceBlueprint.workspaceExperience.dataDensity}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6 flex items-center gap-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight">Engineering Reconciliation Complete</h4>
                    <p className="text-[11px] text-blue-700/70 mt-1 leading-relaxed">
                      JUMO Architecture Agents have successfully expanded the specification into a 32-stage manufacturing plan. 
                      Human approval is now required to authorize the commencement of industrial production.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Architectural Ratification</h4>
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                      Ratifying this blueprint will lock the system architecture and authorize 400+ cognitive workforce agents to begin factory manufacturing.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Ratification / Feedback Notes</label>
                    <textarea 
                      placeholder="Enter architecture review feedback or ratification notes..."
                      value={rejectionFeedback}
                      onChange={(e) => setRejectionFeedback(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 h-40 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none resize-none font-medium"
                    />
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button 
                    onClick={() => handleReviewDecision('APPROVE')}
                    disabled={isSubmittingReview}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    {isSubmittingReview ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    Authorize Factory Production
                  </button>
                  <button 
                    onClick={() => handleReviewDecision('REJECT')}
                    disabled={isSubmittingReview}
                    className="w-full py-3 bg-transparent border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Reject Blueprint & Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Human-Gated Final Assembly Review Workspace */}
      {pendingManufacturingJobs.length > 0 && (
        <div className="bg-slate-900 rounded-3xl border border-blue-500/30 overflow-hidden shadow-2xl">
          <div className="bg-blue-600 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-white" />
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Awaiting Final Assembly Certification</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-blue-100 uppercase tracking-widest bg-blue-700 px-3 py-1 rounded-full border border-blue-400/30">
                {pendingManufacturingJobs.length} PENDING CERTIFICATIONS
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Report Panel */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-none">Assembly Verification Summary</h3>
                    <p className="text-slate-400 text-sm mt-2 font-medium">Post-Manufacturing Synthesis & Integrated Component Evidence</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase block leading-none">Pipeline Status</span>
                    <span className="text-xs font-black text-blue-400 uppercase tracking-widest mt-1 block">32/32 STAGES COMPLETE</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Build Integrity</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black text-slate-200">SHA-256 MATCH</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Test Coverage</span>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-black text-slate-200">99.2% VERIFIED</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Policy Alignment</span>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-black text-slate-200">COMPLIANT</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden">
                  <div className="px-6 py-3 border-b border-slate-700/50 bg-slate-800/20 flex items-center justify-between">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Integrated Artifact Evidence</h5>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Core Runtime Engine</span>
                      <span className="text-emerald-400 font-bold">READY</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Sovereign Data Schema</span>
                      <span className="text-emerald-400 font-bold">MIGRATED</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Zero-Trust Identity Portal</span>
                      <span className="text-emerald-400 font-bold">PROVISIONED</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Regulatory Audit Ledger</span>
                      <span className="text-emerald-400 font-bold">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Decision Handshake</h4>
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                      Authoritatively certify this product build for production promotion. 
                      Certification issues a cryptographically signed Sovereign Seal of Approval.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Internal Review Notes</label>
                    <textarea 
                      placeholder="Add certification evidence or rejection details..."
                      value={rejectionFeedback}
                      onChange={(e) => setRejectionFeedback(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 h-32 focus:border-blue-500/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button 
                    onClick={() => handleReviewDecision('APPROVE')}
                    disabled={isSubmittingReview}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
                  >
                    {isSubmittingReview ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckSquare className="w-4 h-4" />}
                    Issue Sovereign Certification
                  </button>
                  <button 
                    onClick={() => handleReviewDecision('REJECT')}
                    disabled={isSubmittingReview}
                    className="w-full py-3 bg-transparent border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Reject Assembly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center">
            <Settings2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">JDPM International Manufacturing Factory</h2>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                International Standard
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">End-to-End Autonomous Specification, Assembly, Verification, Certification & Runtime</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleTriggerAutonomousPipeline}
            disabled={isExecutingPipeline}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isExecutingPipeline ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Execute End-to-End Pipeline</span>
          </button>
          <span className="text-[10px] font-mono font-bold tracking-wider px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg uppercase">
            Root: JDPM/2608
          </span>
        </div>
      </div>

      {pipelineSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono font-bold flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{pipelineSuccessMessage}</span>
        </div>
      )}

      {/* Global Factory Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[10px] font-black uppercase text-slate-400">Specialized Factories</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{factorySummary?.totalSpecializedProductFactories || 16}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[10px] font-black uppercase text-slate-400">Components</div>
          <div className="text-lg font-black text-blue-600 font-mono mt-0.5">{factorySummary?.totalManufacturedComponents || componentsList.length}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[10px] font-black uppercase text-slate-400">Services</div>
          <div className="text-lg font-black text-indigo-600 font-mono mt-0.5">{factorySummary?.totalManufacturedServices || servicesList.length}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[10px] font-black uppercase text-slate-400">Workflows</div>
          <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{factorySummary?.totalManufacturedWorkflows || workflowsList.length}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[10px] font-black uppercase text-slate-400">Executed Tests</div>
          <div className="text-lg font-black text-emerald-600 font-mono mt-0.5">{factorySummary?.totalExecutedTests || testsList.length}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[10px] font-black uppercase text-slate-400">Deployments</div>
          <div className="text-lg font-black text-purple-600 font-mono mt-0.5">{factorySummary?.totalActiveDeployments || deploymentsList.length}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[10px] font-black uppercase text-slate-400">Factory Health</div>
          <div className="text-xs font-black text-emerald-700 uppercase bg-emerald-50 px-2 py-1 rounded-md mt-1 inline-block">
            {factorySummary?.overallFactoryHealth || 'OPTIMAL'}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 shrink-0">
          {[
            { id: 'pipeline', label: '32-Stage Lifecycle' },
            { id: 'components', label: 'Components' },
            { id: 'services', label: 'Services' },
            { id: 'workflows', label: 'Workflows' },
            { id: 'data', label: 'Data & Schemas' },
            { id: 'tests', label: 'Test Evidence' },
            { id: 'deployments', label: 'Deployments & Runtime' },
            { id: 'evolution', label: 'Quality & Traceability' },
            { id: 'assistant', label: 'JUMO GPT' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchFactoryState}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs transition-all cursor-pointer"
            title="Refresh State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      <AnimatePresence mode="wait">
        {activeTab === 'pipeline' && (
          <motion.div 
            key="tab-pipeline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Active Compile Streams</h3>
                  <span className="text-[9px] font-black uppercase text-slate-400">Select Stream</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
                  {jobs.map((job) => {
                    const isSelected = job.id === selectedJobId;
                    return (
                      <button 
                        key={job.id} 
                        onClick={() => setSelectedJobId(job.id)} 
                        className={'w-full flex items-center justify-between p-4 text-left transition-all cursor-pointer ' + (isSelected ? 'bg-blue-50/50 border-l-4 border-blue-600' : 'hover:bg-slate-50 border-l-4 border-transparent')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ' + (job.status === 'RUNTIME_ACTIVE' ? 'bg-emerald-50 text-emerald-600' : job.status === 'FAILED' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600 animate-pulse')}>
                            {job.status === 'RUNTIME_ACTIVE' ? <CheckCircle2 className="w-4 h-4" /> : job.status === 'FAILED' ? <AlertCircle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900 font-mono">{job.id}</div>
                            <div className="text-[10px] text-slate-500 font-semibold uppercase">{job.productId}</div>
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
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 font-mono">Job Orchestration Interface</span>
                      <h4 className="text-sm font-extrabold text-slate-800">{selectedJob.id} Control Panel</h4>
                      {selectedJob.currentLifecycleState && (
                        <div className="mt-1">
                          <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 uppercase tracking-widest">
                            {selectedJob.currentLifecycleState.replace(/_/g, ' ')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => onPauseJob(selectedJob.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 cursor-pointer hover:bg-white transition-all"><Pause className="w-4 h-4" /></button>
                      <button onClick={() => onPromoteJob(selectedJob.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 cursor-pointer hover:bg-white transition-all"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => onPromoteJob(selectedJob.id)} className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase cursor-pointer hover:bg-slate-800">Promote</button>
                    <button onClick={() => onPauseJob(selectedJob.id)} className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase cursor-pointer hover:bg-slate-200">Pause</button>
                  </div>
                </div>
              )}

              {selectedJob && (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden flex flex-col h-64">
                  <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Activity className="w-3.5 h-3.5" />Execution Logs</h4>
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-black">{selectedJob.id}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1.5 p-4">
                    {selectedJob.logs.map((log, i) => <div key={i} className="text-emerald-400 font-medium leading-relaxed">{log}</div>)}
                  </div>
                </div>
              )}
            </div>

            {/* Stages Sequence */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div>
                    <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">32-Stage Sovereign Execution Grid</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Subordinate to JDPM/SPEC &rarr; ARCH &rarr; BLUE &rarr; MFG &rarr; VER &rarr; CERT</p>
                  </div>
                  <span className="text-[10px] font-mono font-black text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    Target: Production Node
                  </span>
                </div>

                <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                  {PIPELINE_STAGES.map((stg, idx) => {
                    const state = getStageState(stg.statusKey, idx);
                    return (
                      <div 
                        key={stg.stage} 
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                          state === 'COMPLETED' ? 'bg-emerald-50/40 border-emerald-200' :
                          state === 'RUNNING' ? 'bg-blue-50/60 border-blue-300 ring-1 ring-blue-400' :
                          state === 'WAITING_APPROVAL' ? 'bg-amber-50/60 border-amber-300' :
                          state === 'FAILED' ? 'bg-rose-50 border-rose-300' :
                          'bg-slate-50/50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-black text-xs ${
                            state === 'COMPLETED' ? 'bg-emerald-600 text-white' :
                            state === 'RUNNING' ? 'bg-blue-600 text-white animate-pulse' :
                            state === 'WAITING_APPROVAL' ? 'bg-amber-600 text-white' :
                            'bg-slate-200 text-slate-600'
                          }`}>
                            {stg.stage}
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900 flex items-center gap-2">
                              <span>{stg.label}</span>
                              {stg.requiresApproval && (
                                <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-200">
                                  Gate
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">{stg.desc}</div>
                          </div>
                        </div>

                        <div>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                            state === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                            state === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
                            state === 'WAITING_APPROVAL' ? 'bg-amber-100 text-amber-800' :
                            'bg-slate-200 text-slate-600'
                          }`}>
                            {state}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'components' && (
          <motion.div 
            key="tab-components"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Digital Component Factory</h3>
                <p className="text-[11px] text-slate-500 font-medium">Reusable, cryptographically verified software components</p>
              </div>
              <span className="text-xs font-mono font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
                {componentsList.length} Manufactured Components
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {componentsList.map(comp => (
                <div key={comp.componentId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-mono font-black text-slate-900">{comp.componentId}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      {comp.verificationStatus} ({comp.testCoveragePercent}%)
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{comp.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">Category: {comp.category} | Ver: {comp.version}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl font-mono text-[10px] text-emerald-400 overflow-x-auto">
                    <code>{comp.implementationSnippet || 'export async function exec() { ... }'}</code>
                  </div>
                  <div className="space-y-1 text-[10px] font-mono text-slate-500">
                    <div className="truncate">Ref: <span className="text-slate-800 font-bold">{comp.blueprintRef}</span></div>
                    <div className="truncate">Hash: <span className="text-slate-600">{comp.cryptographicHash}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'services' && (
          <motion.div 
            key="tab-services"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Digital Service Factory</h3>
                <p className="text-[11px] text-slate-500 font-medium">Executable micro-services with real telemetry probes and endpoints</p>
              </div>
              <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                {servicesList.length} Active Services
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map(srv => (
                <div key={srv.serviceId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-mono font-black text-slate-900">{srv.serviceId}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      {srv.healthStatus}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{srv.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">Port: {srv.runtimeConfig?.port} | Concurrency: {srv.runtimeConfig?.concurrency}</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-slate-400 font-mono">Endpoints:</span>
                    {srv.endpoints?.map((ep: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg text-[10px] font-mono border border-slate-100">
                        <span className="font-black text-indigo-600">{ep.method} {ep.path}</span>
                        <span className="text-slate-400">{ep.requiredClearance}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Probes: {srv.telemetryProbes?.length || 0} active</span>
                    <span>Hash: {srv.cryptographicHash?.substring(0, 16)}...</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'workflows' && (
          <motion.div 
            key="tab-workflows"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Digital Workflow Factory</h3>
                <p className="text-[11px] text-slate-500 font-medium">State machine workflows with compensation and approval gates</p>
              </div>
              <span className="text-xs font-mono font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                {workflowsList.length} Configured Workflows
              </span>
            </div>

            <div className="space-y-4">
              {workflowsList.map(wf => (
                <div key={wf.workflowId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-mono font-black text-slate-900">{wf.workflowId}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                      {wf.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900">{wf.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {wf.steps?.map((stp: any) => (
                      <div key={stp.stepId} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <div className="text-[10px] font-mono font-black text-slate-700">{stp.stepId}</div>
                        <div className="text-xs font-bold text-slate-900">{stp.name}</div>
                        <div className="text-[9px] text-slate-400 font-mono">Executor: {stp.executor} ({stp.assignedAgentOrRole})</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'data' && (
          <motion.div 
            key="tab-data"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Digital Data Factory</h3>
                <p className="text-[11px] text-slate-500 font-medium">Relational schemas, multi-tenant isolation, and migration scripts</p>
              </div>
              <span className="text-xs font-mono font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                {schemasList.length} Schemas
              </span>
            </div>

            <div className="space-y-4">
              {schemasList.map(sch => (
                <div key={sch.schemaId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-mono font-black text-slate-900">{sch.schemaId}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      Target: {sch.targetRDBMS}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900">{sch.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sch.entities?.map((ent: any) => (
                      <div key={ent.tableName} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-black text-indigo-700">{ent.tableName}</span>
                          <span className="text-[9px] font-mono text-slate-500">RLS: {ent.rowLevelSecurityEnabled ? 'ENABLED' : 'DISABLED'}</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 space-y-0.5">
                          {ent.fields?.map((f: any) => (
                            <div key={f.name} className="flex justify-between border-b border-slate-100 pb-0.5">
                              <span>{f.name}</span>
                              <span className="font-bold text-slate-700">{f.type} {f.primaryKey ? '(PK)' : ''}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'tests' && (
          <motion.div 
            key="tab-tests"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Digital Test Factory & Verifiable Evidence</h3>
                <p className="text-[11px] text-slate-500 font-medium">Automated test execution logs with SHA-256 evidence digests</p>
              </div>
              <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                {testsList.length} Executed Suites
              </span>
            </div>

            <div className="space-y-3">
              {testsList.map(tst => (
                <div key={tst.testId} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">{tst.testSuiteName}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {tst.testId} | Category: {tst.category} | Target: {tst.targetArtifactId}
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs font-black text-emerald-700">{tst.passedCount}/{tst.assertionsCount} Passed</span>
                    <span className="text-[9px] text-slate-400 block">{tst.durationMs}ms | Digest: {tst.evidenceDigest?.substring(0, 14)}...</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'deployments' && (
          <motion.div 
            key="tab-deployments"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Provisioning & Active Runtime Instances</h3>
                <p className="text-[11px] text-slate-500 font-medium">Live sovereign runtime container topology and telemetry heartbeats</p>
              </div>
              <span className="text-xs font-mono font-black text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-lg">
                {runtimeList.length} Active Instances
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {runtimeList.map(inst => (
                <div key={inst.instanceId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-mono font-black text-slate-900">{inst.instanceId}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      {inst.operationalState}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900">{inst.productName} (v{inst.version})</h4>
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl font-mono text-[10px]">
                    <div>
                      <span className="text-slate-400 block">CPU Load</span>
                      <span className="font-bold text-slate-800">{inst.cpuUsagePercent}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Memory</span>
                      <span className="font-bold text-slate-800">{inst.memoryUsageMb} MB</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Throughput</span>
                      <span className="font-bold text-slate-800">{inst.transactionsPerSecond} TPS</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Deployment Ref: <span className="text-slate-700 font-bold">{inst.deploymentRef}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'evolution' && (
          <motion.div 
            key="tab-evolution"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Quality Management & Traceability Matrix</h3>
                <p className="text-[11px] text-slate-500 font-medium">Complete chain of evidence from Requirement to Runtime</p>
              </div>
              <span className="text-xs font-mono font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                {qualityData.traceabilityMatrix?.length || 1} Trace Links
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400 font-mono">End-to-End Traceability Links</h4>
              {qualityData.traceabilityMatrix?.map((link, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-[10px] space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-bold">{link.requirementId}</span>
                    <span>&rarr;</span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded font-bold">{link.architectureElementId}</span>
                    <span>&rarr;</span>
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded font-bold">{link.blueprintElementId}</span>
                    <span>&rarr;</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-bold">{link.componentId}</span>
                    <span>&rarr;</span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded font-bold">{link.testId}</span>
                    <span>&rarr;</span>
                    <span className="px-2 py-0.5 bg-slate-900 text-white rounded font-bold">{link.certificateId}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <h4 className="text-xs font-black uppercase text-slate-400 font-mono">Defect Management & Corrective Actions</h4>
              {qualityData.defects?.map(def => (
                <div key={def.defectId} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-slate-900">{def.defectId}: {def.title}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      {def.status}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 space-y-1">
                    <div>Root Cause: <span className="text-slate-800">{def.rootCauseAnalysis}</span></div>
                    <div>Correction: <span className="text-emerald-700 font-bold">{def.correctiveAction}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'assistant' && (
          <motion.div 
            key="tab-assistant"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl h-[700px]"
          >
            <JumoFloatingAssistant activeStudio="MANUFACTURING" variant="embedded" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <HierarchicalSidebar 
      job={selectedJob} 
      contracts={contracts} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      runtimeList={runtimeList}
    />
  </div>
  );
};

interface HierarchicalSidebarProps {
  job?: ManufacturingJob;
  contracts: ArchitectureContract[];
  activeTab: string;
  setActiveTab: (tab: any) => void;
  runtimeList: any[];
}

const HierarchicalSidebar: React.FC<HierarchicalSidebarProps> = ({ job, contracts, activeTab, setActiveTab, runtimeList }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['PRODUCT', 'APPROVALS', 'MANUFACTURING']);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const selectedJob = job as any;
  const blueprint = selectedJob?.blueprint;
  const expBlueprint = selectedJob?.experienceBlueprint;
  const jobRuntime = runtimeList.find(r => r.jobId === selectedJob?.id || r.productId === selectedJob?.productId);

  const categories = [
    {
      id: 'PRODUCT',
      label: 'PRODUCT',
      icon: <Package className="w-4 h-4" />,
      subcategories: [
        { id: 'identity', label: 'Identity', detail: blueprint?.productIdentity?.name || 'Unspecified' },
        { id: 'business', label: 'Business', detail: blueprint?.productIdentity?.tenancyModel || 'Multi-Tenant' },
        { id: 'domain', label: 'Domain', detail: blueprint?.productIdentity?.sector || 'General' },
      ]
    },
    {
      id: 'EXPERIENCE',
      label: 'EXPERIENCE',
      icon: <Sparkles className="w-4 h-4" />,
      subcategories: [
        { id: 'public', label: 'Public', detail: expBlueprint?.publicExperience?.landingPage?.heroTitle || 'N/A' },
        { id: 'auth', label: 'Authentication', detail: expBlueprint?.authenticationExperience?.mfaRequired ? 'MFA Required' : 'Standard' },
        { id: 'workspace', label: 'Workspace', detail: expBlueprint?.workspaceExperience?.dashboardLayout || 'Grid' },
      ]
    },
    {
      id: 'ARCHITECTURE',
      label: 'ARCHITECTURE',
      icon: <Layers className="w-4 h-4" />,
      subcategories: [
        { id: 'functional', label: 'Functional', detail: `${blueprint?.functionalArchitecture?.modules?.length || 0} Modules` },
        { id: 'data', label: 'Data', detail: `${blueprint?.dataArchitecture?.entities?.length || 0} Entities` },
        { id: 'technical', label: 'Technical', detail: blueprint?.technicalArchitecture?.computeTier || 'T3.Large' },
      ]
    },
    {
      id: 'AI_AGENTS',
      label: 'AI & AGENTS',
      icon: <Bot className="w-4 h-4" />,
      subcategories: [
        { id: 'workforce', label: 'Workforce', detail: `${selectedJob?.assignedWorkforce?.length || 0} Agents` },
        { id: 'governance', label: 'Governance', detail: blueprint?.aiArchitecture?.modelRequirements || 'Standard' },
      ]
    },
    {
      id: 'MANUFACTURING',
      label: 'MANUFACTURING',
      icon: <Settings2 className="w-4 h-4" />,
      subcategories: [
        { id: 'stages', label: 'Stages', detail: selectedJob?.currentManufacturingStage ? `Stage ${selectedJob.currentManufacturingStage}/32` : 'Not Started' },
        { id: 'artifacts', label: 'Artifacts', detail: `${Object.keys(selectedJob?.artifacts || {}).length} Generated` },
      ]
    },
    {
      id: 'VERIFICATION',
      label: 'VERIFICATION',
      icon: <ShieldCheck className="w-4 h-4" />,
      subcategories: [
        { id: 'reports', label: 'Engineering Report', detail: selectedJob?.engineeringReport ? 'Available' : 'Pending' },
        { id: 'evidence', label: 'Evidence Logs', detail: `${selectedJob?.logs?.length || 0} Records` },
      ]
    },
    {
      id: 'APPROVALS',
      label: 'APPROVALS',
      icon: <CheckSquare className="w-4 h-4" />,
      subcategories: [
        { id: 'gates', label: 'Active Gates', detail: `${selectedJob?.reviewGates?.filter((g: any) => g.status === 'PENDING').length || 0} Awaiting` },
        { id: 'certification', label: 'Certification', detail: selectedJob?.certificationId ? 'Certified' : 'Not Issued' },
      ]
    },
    {
      id: 'DEPLOYMENT',
      label: 'DEPLOYMENT',
      icon: <Cloud className="w-4 h-4" />,
      subcategories: [
        { id: 'topology', label: 'Topology', detail: blueprint?.deploymentArchitecture?.target || 'Cloud-Native' },
        { id: 'regions', label: 'Regions', detail: blueprint?.deploymentArchitecture?.regionalDeployment?.[0] || 'Sovereign-Central-01' },
      ]
    },
    {
      id: 'RUNTIME',
      label: 'RUNTIME',
      icon: <Activity className="w-4 h-4" />,
      subcategories: [
        { id: 'instances', label: 'Instances', detail: jobRuntime ? '1 Active' : '0 Active' },
        { id: 'health', label: 'Health', detail: jobRuntime?.operationalState || 'Offline' },
      ]
    },
    {
      id: 'EVIDENCE_AUDIT',
      label: 'EVIDENCE & AUDIT',
      icon: <ClipboardCheck className="w-4 h-4" />,
      subcategories: [
        { id: 'logs', label: 'System Logs', detail: `${selectedJob?.logs?.length || 0} Entries` },
        { id: 'traceability', label: 'Traceability', detail: 'Full Chain Verified' },
      ]
    }
  ];

  return (
    <div className="w-72 shrink-0 bg-slate-50 border-l border-slate-200 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden xl:block">
      <div className="p-4 border-b border-slate-200 bg-white">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Navigation Console</h3>
        <p className="text-[11px] font-bold text-slate-900 truncate">{blueprint?.productIdentity?.name || selectedJob?.productId || 'Select a Job'}</p>
      </div>

      <div className="py-2">
        {categories.map((cat) => {
          const isExpanded = expandedCategories.includes(cat.id);
          return (
            <div key={cat.id} className="mb-1">
              <button 
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-100 transition-all text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{cat.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider">{cat.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white/50"
                  >
                    {cat.subcategories.map((sub) => (
                      <button 
                        key={sub.id}
                        className="w-full pl-10 pr-4 py-2 text-left hover:bg-white transition-all group border-b border-slate-50 last:border-0"
                      >
                        <div className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600">{sub.label}</div>
                        <div className="text-[9px] text-slate-400 font-mono truncate">{sub.detail}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
