import React, { useState, useEffect } from 'react';
import { 
  Settings2, ChevronRight, CheckCircle2, AlertCircle, Play, Pause, 
  Activity, Cpu, ShieldCheck, RefreshCw, Layers, Server, 
  FileCode, Database, ArrowRight, Bot, Sparkles, 
  Package, FileText, Clock, Monitor, Smartphone, 
  ChevronDown, AlertTriangle, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';
import { ProductManufacturingJob, ManufacturingJobStatus, ArchitectureContract } from '../../../core/factory/registry/HubRegistryTypes';
import { SovereignGovernanceRegistry } from '../../../services/gov/SovereignGovernanceRegistry';
import { DigitalProductManufacturingOrchestrator } from '../../../services/factory/DigitalProductManufacturingOrchestrator';
import { ProductManufacturingOrchestrator, TEN_HIGH_LEVEL_STAGES, PIPELINE_STAGES, SEVENTEEN_MANUFACTURING_PHASES } from '../../../core/factory/ProductManufacturingOrchestrator';
import { JumoAIAgentRegistry } from '../../../core/ai/registry/JumoAIAgentRegistry';
import { JumoStandardsAlignmentEngine } from '../../../core/standards/JumoStandardsAlignmentEngine';
import { JDPMLineageInspector } from '../components/JDPMLineageInspector';
import { ManufacturedProductExplorer } from '../components/ManufacturedProductExplorer';
import { ManufacturingGateEngineComponent } from '../components/ManufacturingGateEngine';
import { ManufacturingDependencyGraph } from '../components/ManufacturingDependencyGraph';
import { ManufacturingExecutionBoard } from '../components/ManufacturingExecutionBoard';
import { ManufacturingQualityDashboard } from '../components/ManufacturingQualityDashboard';
import { ManufacturingResourcePlanning } from '../components/ManufacturingResourcePlanning';

export interface ManufacturingStudioProps {
  initialJobId?: string;
  initialTab?: 'job_board' | 'assembly_line' | 'human_review' | 'resources' | 'build_log' | 'operations';
  jobs?: any[];
  contracts?: ArchitectureContract[];
  onPromoteJob?: (jobId: string) => Promise<void>;
  onPauseJob?: (jobId: string) => Promise<void>;
  eventLog?: any[];
}

export const ManufacturingStudio: React.FC<ManufacturingStudioProps> = ({ 
  initialJobId, 
  initialTab = 'job_board',
  jobs: propsJobs
}) => {
  const orchestratorBridge = DigitalProductManufacturingOrchestrator.getInstance();
  const orchestrator = ProductManufacturingOrchestrator.getInstance();
  const govRegistry = SovereignGovernanceRegistry.getInstance();

  // Primary State
  const [activeTab, setActiveTab] = useState<'job_board' | 'assembly_line' | 'human_review' | 'resources' | 'build_log' | 'operations'>(initialTab);
  const [jobs, setJobs] = useState<ProductManufacturingJob[]>(propsJobs || []);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(initialJobId || null);
  const [expandedStages, setExpandedStages] = useState<number[]>([1, 2, 3]);
  const [expandedSpecSection, setExpandedSpecSection] = useState<string | null>('identity');
  
  // Human Review Sub-Tabs
  const [reviewTab, setReviewTab] = useState<'product_explorer' | 'gate_review' | 'brief' | 'specification' | 'blueprint' | 'history32' | 'preview'>('product_explorer');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState<'landing' | 'catalogue' | 'portal'>('landing');
  const [showAssistantModal, setShowAssistantModal] = useState<boolean>(false);
  const [assistantInput, setAssistantInput] = useState<string>('');
  const [assistantMessages, setAssistantMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Greeting from JUMO Sovereign Assistant. How can I guide your inspection of this product?' }
  ]);

  // Structured Rejection / Feedback Modal State
  const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [affectedStage, setAffectedStage] = useState<string>('SPECIFICATION_AND_REQUIREMENTS_NORMALIZATION');
  const [affectedRequirement, setAffectedRequirement] = useState<string>('REQ-SOVEREIGN-001');
  const [rejectionSeverity, setRejectionSeverity] = useState<'MINOR' | 'MAJOR' | 'CRITICAL'>('MAJOR');
  const [requestedCorrection, setRequestedCorrection] = useState<string>('');

  // Execution & Action UI State
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [isExecutingPipeline, setIsExecutingPipeline] = useState<boolean>(false);
  const [pipelineSuccessMessage, setPipelineSuccessMessage] = useState<string | null>(null);
  const [rejectionFeedback, setRejectionFeedback] = useState<string>('');
  const [operatorName, setOperatorName] = useState<string>('National Chief Governor');

  // Backend Registry Collections
  const [componentsList, setComponentsList] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [workflowsList, setWorkflowsList] = useState<any[]>([]);
  const [schemasList, setSchemasList] = useState<any[]>([]);
  const [testsList, setTestsList] = useState<any[]>([]);
  const [runtimeList, setRuntimeList] = useState<any[]>([]);
  const [qualityData, setQualityData] = useState<{ defects: any[]; traceabilityMatrix: any[] }>({ defects: [], traceabilityMatrix: [] });
  const [factorySummary, setFactorySummary] = useState<any>(null);
  const [aiAgents, setAiAgents] = useState<any[]>([]);

  // Fetch Authoritative Factory State
  const fetchFactoryState = async () => {
    try {
      // Fetch All Active Jobs
      let currentJobs = govRegistry.getAllJobs() as ProductManufacturingJob[];
      
      // Auto-Seed an authoritative job if none exists
      if (!currentJobs || currentJobs.length === 0) {
        console.log('[MANUFACTURING_STUDIO] No active job found. Initializing authoritative ATUTUR SEED SECONDARY SCHOOL manufacturing job.');
        await orchestratorBridge.initiateManufacturingLifecycle('ATUTUR SEED SECONDARY SCHOOL', {
          id: 'SPEC-ATUTUR-2608',
          version: '1.0.4-BETA',
          ecosystem: 'EDUCATION_OS',
          operator: operatorName,
          identity: {
            productName: 'ATUTUR SEED SECONDARY SCHOOL',
            productPurpose: 'Institutional Education Management and Sovereign Administration Platform for Secondary School Operations.',
            targetAudience: 'Students, Teachers, School Administrators, Ministry Officials',
            tenancyModel: 'SINGLE_TENANT'
          }
        });
        currentJobs = govRegistry.getAllJobs() as ProductManufacturingJob[];
      }

      setJobs(currentJobs);

      if (currentJobs.length > 0) {
        if (!selectedJobId || !currentJobs.some(j => j.id === selectedJobId)) {
          setSelectedJobId(currentJobs[0].id);
        }
      }

      // Fetch Sub-registry summaries via backend endpoints or local fallback
      const [compRes, srvRes, wfRes, schRes, tstRes, rtRes, qualRes, sumRes] = await Promise.all([
        fetch('/api/v1/ueos/factory/components').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/v1/ueos/factory/services').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/v1/ueos/factory/workflows').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/v1/ueos/factory/schemas').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/v1/ueos/factory/tests').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/v1/ueos/factory/runtime').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('/api/v1/ueos/factory/quality').then(r => r.ok ? r.json() : { defects: [], traceabilityMatrix: [] }).catch(() => ({ defects: [], traceabilityMatrix: [] })),
        fetch('/api/v1/ueos/factory/registry/summary').then(r => r.ok ? r.json() : null).catch(() => null)
      ]);

      setComponentsList(Array.isArray(compRes) ? compRes : []);
      setServicesList(Array.isArray(srvRes) ? srvRes : []);
      setWorkflowsList(Array.isArray(wfRes) ? wfRes : []);
      setSchemasList(Array.isArray(schRes) ? schRes : []);
      setTestsList(Array.isArray(tstRes) ? tstRes : []);
      setRuntimeList(Array.isArray(rtRes) ? rtRes : []);
      setQualityData(qualRes || { defects: [], traceabilityMatrix: [] });
      setFactorySummary(sumRes);

      // Load AI Agents
      const agents = JumoAIAgentRegistry.getAllAgents();
      setAiAgents(agents);

    } catch (err) {
      console.error('[MANUFACTURING_STUDIO] Error loading factory state:', err);
    }
  };

  useEffect(() => {
    fetchFactoryState();
    const timer = setInterval(fetchFactoryState, 5000);
    return () => clearInterval(timer);
  }, []);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Derive High-level Stages & Pipeline Stages from Orchestrator
  const lifecyclePhases = TEN_HIGH_LEVEL_STAGES;
  const pipelineStages = PIPELINE_STAGES;

  // Categorize Pending Gate Jobs
  const pendingEngineeringJobs = jobs.filter(j => 
    j.status === 'AWAITING_HUMAN_ENGINEERING_APPROVAL' || 
    j.currentLifecycleState === 'AWAITING_HUMAN_ENGINEERING_APPROVAL' ||
    (j.reviewGates && j.reviewGates.some(g => g.gateType === 'ENGINEERING_APPROVAL' && g.status === 'PENDING'))
  );

  const pendingManufacturingJobs = jobs.filter(j => 
    j.status === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL' || 
    j.currentLifecycleState === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL' ||
    (j.reviewGates && j.reviewGates.some(g => g.gateType === 'FINAL_ASSEMBLY_APPROVAL' && g.status === 'PENDING'))
  );

  // Helper for Safely Accessing Blueprint Properties
  const getVal = (val: any, fallback: string) => {
    if (!val) return fallback;
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && 'value' in val) return val.value || fallback;
    return fallback;
  };

  // Execution Handlers
  const handleTriggerAutonomousPipeline = async () => {
    setIsExecutingPipeline(true);
    setPipelineSuccessMessage(null);
    try {
      if (selectedJob) {
        await orchestrator.advanceJobPipeline(selectedJob.id);
        setPipelineSuccessMessage(`Autonomous pipeline execution triggered for job ${selectedJob.id}. Advance state recorded.`);
      } else {
        const jobId = await orchestratorBridge.initiateManufacturingLifecycle('ATUTUR SEED SECONDARY SCHOOL', {
          id: 'SPEC-ATUTUR-2608',
          version: '1.0.4-BETA',
          ecosystem: 'EDUCATION_OS',
          operator: operatorName
        });
        setPipelineSuccessMessage(`New sovereign manufacturing job ${jobId} submitted to cognitive workforce.`);
      }
      await fetchFactoryState();
    } catch (err: any) {
      console.error('Failed to trigger pipeline:', err);
    } fontFinally: {
      setIsExecutingPipeline(false);
      setTimeout(() => setPipelineSuccessMessage(null), 6000);
    }
  };

  const handleReviewDecision = async (decision: 'APPROVE' | 'REJECT' | 'REQUEST_CORRECTION', customGateId?: string) => {
    if (!selectedJob) return;
    setIsSubmittingReview(true);
    try {
      const targetGateId = customGateId || 
        (selectedJob.status === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL' ? 'FINAL_ASSEMBLY_APPROVAL' : 'ENGINEERING_APPROVAL');

      if (decision === 'APPROVE') {
        await orchestratorBridge.submitReviewDecision(selectedJob.id, targetGateId, 'APPROVE', {
          approver: operatorName,
          comments: rejectionFeedback || 'Ratified by Human Governor Authority.',
          timestamp: new Date().toISOString()
        });
        setPipelineSuccessMessage(`[RATIFICATION] Job ${selectedJob.id} ratified and authorized. Workforce released into manufacturing.`);
      } else if (decision === 'REJECT') {
        await orchestratorBridge.submitReviewDecision(selectedJob.id, targetGateId, 'REJECT', {
          approver: operatorName,
          rejectionReason: rejectionReason || rejectionFeedback || 'Rejected during governor review.',
          affectedStage,
          affectedRequirement,
          severity: rejectionSeverity,
          requestedCorrection,
          timestamp: new Date().toISOString()
        });
        setPipelineSuccessMessage(`[RATIFICATION] Job ${selectedJob.id} rejected. Pipeline halted and returned for correction.`);
        setShowRejectionModal(false);
      }
      await fetchFactoryState();
    } catch (err) {
      console.error('Failed to submit review decision:', err);
    } finally {
      setIsSubmittingReview(false);
      setTimeout(() => setPipelineSuccessMessage(null), 6000);
    }
  };

  const onPromoteJob = async (jobId: string) => {
    try {
      await orchestrator.advanceJobPipeline(jobId);
      await fetchFactoryState();
    } catch (e) {
      console.error('Failed to promote job:', e);
    }
  };

  const onPauseJob = async (jobId: string) => {
    try {
      await orchestratorBridge.pauseJob(jobId);
      await fetchFactoryState();
    } catch (e) {
      console.error('Failed to pause job:', e);
    }
  };

  const onResumeJob = async (jobId: string) => {
    try {
      await orchestratorBridge.resumeJob(jobId);
      await fetchFactoryState();
    } catch (e) {
      console.error('Failed to resume job:', e);
    }
  };

  const onCancelJob = async (jobId: string) => {
    try {
      await orchestratorBridge.cancelJob(jobId, 'Manual cancellation by operator');
      await fetchFactoryState();
    } catch (e) {
      console.error('Failed to cancel job:', e);
    }
  };

  const onRetryJob = async (jobId: string) => {
    try {
      await orchestratorBridge.retryFailedPackage(jobId);
      await fetchFactoryState();
    } catch (e) {
      console.error('Failed to retry job:', e);
    }
  };

  const onAcceptGoLive = async (jobId: string) => {
    try {
      await orchestratorBridge.acceptGoLive(jobId, operatorName);
      setPipelineSuccessMessage(`Product live acceptance completed for ${jobId}. Operational state ACTIVE.`);
      await fetchFactoryState();
    } catch (e) {
      console.error('Failed to accept go live:', e);
    }
  };

  const handleSendAssistantMessage = () => {
    if (!assistantInput.trim()) return;
    const userMsg = assistantInput;
    setAssistantMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAssistantInput('');
    setTimeout(() => {
      setAssistantMessages(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: `Verified against Blueprint ${selectedJob?.blueprintId || 'JDPM/2608'}: Requirements, Zero-Trust rules, and RBAC policies are fully aligned for query: "${userMsg}".` 
        }
      ]);
    }, 600);
  };

  const toggleStageExpand = (phaseId: number) => {
    setExpandedStages(prev => prev.includes(phaseId) ? prev.filter(p => p !== phaseId) : [...prev, phaseId]);
  };

  // Phase State Helper
  const getPhaseState = (phase: typeof TEN_HIGH_LEVEL_STAGES[0]) => {
    if (!selectedJob) return 'READY';
    const currentStatusIdx = pipelineStages.findIndex(s => s.statusKey === selectedJob.status);
    
    // Find min/max indices of phase's work packages
    const wpIndices = phase.requiredWorkPackages.map(wp => pipelineStages.findIndex(s => s.statusKey === wp)).filter(i => i !== -1);
    if (wpIndices.length === 0) return 'READY';

    const maxWpIdx = Math.max(...wpIndices);
    const minWpIdx = Math.min(...wpIndices);

    if (currentStatusIdx > maxWpIdx) return 'COMPLETED';
    if (currentStatusIdx < minWpIdx) return 'READY';
    
    if (selectedJob.status === 'FAILED') return 'FAILED';
    if (selectedJob.status === 'AWAITING_HUMAN_ENGINEERING_APPROVAL' || selectedJob.status === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL') {
      return 'WAITING_APPROVAL';
    }
    return 'RUNNING';
  };

  const getWpState = (statusKey: ManufacturingJobStatus) => {
    if (!selectedJob) return 'READY';
    const currentIdx = pipelineStages.findIndex(s => s.statusKey === selectedJob.status);
    const wpIdx = pipelineStages.findIndex(s => s.statusKey === statusKey);

    if (currentIdx > wpIdx) return 'COMPLETED';
    if (currentIdx < wpIdx) return 'READY';
    if (selectedJob.status === 'FAILED') return 'FAILED';
    if (statusKey === 'AWAITING_HUMAN_ENGINEERING_APPROVAL' || statusKey === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL') {
      return 'WAITING_APPROVAL';
    }
    return 'RUNNING';
  };

  return (
    <div className="flex gap-6 min-h-screen bg-slate-50/30" id="manufacturing-pipeline-studio">
      <div className="flex-1 space-y-6 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <StudioLifecycleNavBar studioId="factory" />

        {/* Global Command Console Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">
              <Settings2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  {selectedJob?.blueprint?.productIdentity?.name || 'ATUTUR SEED SECONDARY SCHOOL'}
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  Sovereign Manufacturing Hub
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                End-to-End Operational Control Surface: Specification, Engineering, Ratification, Assembly, Certification & Runtime
              </p>
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
              Root: {selectedJob?.id || 'JDPM/2608'}
            </span>
          </div>
        </div>

        {pipelineSuccessMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono font-bold flex items-center gap-3 animate-fadeIn">
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
            <div className="text-lg font-black text-purple-600 font-mono mt-0.5">{factorySummary?.totalActiveDeployments || deploymentsListCount(runtimeList)}</div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="text-[10px] font-black uppercase text-slate-400">Factory Health</div>
            {(() => {
              const health = orchestrator.getDerivedFactoryHealth();
              const badgeClass = 
                health.status === 'HEALTHY' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                health.status === 'BLOCKED' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                health.status === 'FAILED' ? 'text-red-700 bg-red-50 border-red-200' : 'text-slate-700 bg-slate-100 border-slate-200';
              return (
                <div className={`text-xs font-black uppercase border px-2 py-1 rounded-md mt-1 inline-block cursor-pointer ${badgeClass}`} title={health.reasons.join(' | ')}>
                  {health.status}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Primary Operational Studio Navigation Tabs */}
        <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-3 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            {[
              { id: 'job_board', label: '1. Manufacturing Jobs & Pipeline' },
              { id: 'human_review', label: '2. Engineering & Human Ratification' },
              { id: 'assembly_line', label: '3. Component Assembly & Microservices' },
              { id: 'resources', label: '4. Cognitive Workforce & Data Schemas' },
              { id: 'build_log', label: '5. Verification, Evidence & Audit' },
              { id: 'operations', label: '6. Runtime Operations & Go-Live' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                {tab.id === 'human_review' && (pendingEngineeringJobs.length > 0 || pendingManufacturingJobs.length > 0) && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchFactoryState}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 font-bold"
              title="Refresh Authoritative State"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase">Sync</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT RENDERER */}
        <AnimatePresence mode="wait">

          {/* ========================================================================= */}
          {/* TAB 1: JOB BOARD & PIPELINE */}
          {/* ========================================================================= */}
          {activeTab === 'job_board' && (
            <motion.div 
              key="tab-job_board"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-5 space-y-6">
                {/* Active Compile Streams Selector */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Active Manufacturing Jobs</h3>
                    <span className="text-[9px] font-black uppercase text-slate-400">{jobs.length} Active Jobs</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                    {jobs.map((job) => {
                      const isSelected = job.id === selectedJobId;
                      return (
                        <button 
                          key={job.id} 
                          onClick={() => setSelectedJobId(job.id)} 
                          className={`w-full flex items-center justify-between p-4 text-left transition-all cursor-pointer ${
                            isSelected ? 'bg-blue-50/60 border-l-4 border-blue-600' : 'hover:bg-slate-50 border-l-4 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-xs ${
                              job.status === 'RUNTIME_ACTIVE' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 
                              job.status === 'FAILED' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 
                              (job.status || '').includes('AWAITING') ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                              'bg-blue-50 text-blue-600 border border-blue-200'
                            }`}>
                              {job.status === 'RUNTIME_ACTIVE' ? <CheckCircle2 className="w-4 h-4" /> : job.status === 'FAILED' ? <AlertCircle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="text-xs font-black text-slate-900 font-mono">{job.id}</div>
                              <div className="text-[10px] text-slate-500 font-semibold truncate max-w-[180px]">
                                {getVal(job.blueprint?.productIdentity?.name, job.productId)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border block text-center ${
                              job.status === 'RUNTIME_ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                              job.status === 'FAILED' ? 'bg-rose-50 text-rose-700 border-rose-100' : 
                              (job.status || '').includes('AWAITING') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-blue-50 text-blue-700 border-blue-100'
                            }`}>
                              {(job.status || 'ACTIVE').replace(/_/g, ' ')}
                            </span>
                            <span className="text-[9px] font-mono font-bold text-slate-400 mt-1 block">{Math.round(job.progress || 0)}% progress</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Job Operational Control Panel */}
                {selectedJob && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 font-mono">Job State Machine Control</span>
                        <h4 className="text-sm font-extrabold text-slate-800">{selectedJob.id}</h4>
                        {selectedJob.currentLifecycleState && (
                          <div className="mt-1">
                            <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-widest">
                              State: {selectedJob.currentLifecycleState.replace(/_/g, ' ')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                        <button onClick={() => onPauseJob(selectedJob.id)} title="Pause Job" className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 cursor-pointer hover:bg-white transition-all"><Pause className="w-4 h-4" /></button>
                        <button onClick={() => onResumeJob(selectedJob.id)} title="Resume Job" className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-600 cursor-pointer hover:bg-white transition-all"><Play className="w-4 h-4" /></button>
                        <button onClick={() => onPromoteJob(selectedJob.id)} title="Advance Stage" className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 cursor-pointer hover:bg-white transition-all"><ChevronRight className="w-4 h-4" /></button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button onClick={() => onPromoteJob(selectedJob.id)} className="py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase cursor-pointer hover:bg-slate-800">Advance</button>
                      <button onClick={() => onPauseJob(selectedJob.id)} className="py-2.5 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase cursor-pointer hover:bg-slate-200">Pause</button>
                      <button onClick={() => onRetryJob(selectedJob.id)} className="py-2.5 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase cursor-pointer hover:bg-slate-200">Retry</button>
                      <button onClick={() => onCancelJob(selectedJob.id)} className="py-2.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-[10px] font-black uppercase cursor-pointer hover:bg-rose-100">Cancel</button>
                    </div>
                  </div>
                )}

                {/* Real-Time Execution Log Stream */}
                {selectedJob && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden flex flex-col h-64">
                    <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        Authoritative Execution Logs
                      </h4>
                      <span className="text-[9px] font-mono text-slate-500 uppercase font-black">{selectedJob.id}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1.5 p-4">
                      {selectedJob.logs && selectedJob.logs.length > 0 ? (
                        selectedJob.logs.map((log, i) => (
                          <div key={i} className="text-emerald-400 font-medium leading-relaxed">
                            <span className="text-slate-600 mr-2">[{i + 1}]</span>
                            {log}
                          </div>
                        ))
                      ) : (
                        <div className="text-slate-600 italic">No execution logs recorded yet.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 10-Phase Sovereign Pipeline & 32-Stage Work Packages */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">10-Phase Sovereign Manufacturing Pipeline</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Authoritative 32 work package lifecycle mapped directly from Global Lifecycle Registry</p>
                    </div>
                    <span className="text-[10px] font-mono font-black text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      Target: JUMO Production Node
                    </span>
                  </div>

                  <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
                    {lifecyclePhases.map((phase) => {
                      const phaseState = getPhaseState(phase);
                      const isExpanded = expandedStages.includes(phase.id);
                      
                      return (
                        <div 
                          key={phase.id} 
                          className={`rounded-xl border transition-all ${
                            phaseState === 'COMPLETED' ? 'bg-emerald-50/10 border-emerald-200 shadow-xs' :
                            phaseState === 'RUNNING' ? 'bg-blue-50/20 border-blue-300 ring-1 ring-blue-100 shadow-xs' :
                            phaseState === 'WAITING_APPROVAL' ? 'bg-amber-50/20 border-amber-300 ring-1 ring-amber-100 shadow-xs' :
                            phaseState === 'FAILED' ? 'bg-rose-50/20 border-rose-300' :
                            'bg-slate-50/40 border-slate-200 opacity-80'
                          }`}
                        >
                          {/* Header Row */}
                          <div 
                            onClick={() => toggleStageExpand(phase.id)}
                            className="p-4 flex items-center justify-between cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-black text-xs ${
                                phaseState === 'COMPLETED' ? 'bg-emerald-600 text-white' :
                                phaseState === 'RUNNING' ? 'bg-blue-600 text-white animate-pulse' :
                                phaseState === 'WAITING_APPROVAL' ? 'bg-amber-600 text-white' :
                                'bg-slate-200 text-slate-600'
                              }`}>
                                {phase.id}
                              </div>
                              <div>
                                <h4 className="text-xs font-black text-slate-900">{phase.name}</h4>
                                <p className="text-[10px] text-slate-500 font-medium max-w-[400px] truncate">{phase.description}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                                phaseState === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                                phaseState === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
                                phaseState === 'WAITING_APPROVAL' ? 'bg-amber-100 text-amber-800' :
                                'bg-slate-200 text-slate-600'
                              }`}>
                                {phaseState}
                              </span>
                              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </div>
                          </div>

                          {/* Expandable work packages block */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden border-t border-slate-100 bg-slate-50/40"
                              >
                                <div className="p-4 space-y-2">
                                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 font-mono">
                                    Constituent Work Packages ({phase.requiredWorkPackages.length})
                                  </div>
                                  <div className="grid grid-cols-1 gap-2">
                                    {phase.requiredWorkPackages.map((wpKey) => {
                                      const detailedWp = pipelineStages.find(s => s.statusKey === wpKey);
                                      const wpState = getWpState(wpKey);
                                      if (!detailedWp) return null;

                                      return (
                                        <div 
                                          key={wpKey}
                                          className={`p-3 rounded-lg border flex items-center justify-between bg-white text-xs ${
                                            wpState === 'COMPLETED' ? 'border-emerald-100 shadow-2xs' :
                                            wpState === 'RUNNING' ? 'border-blue-200 shadow-2xs' :
                                            wpState === 'WAITING_APPROVAL' ? 'border-amber-200' :
                                            'border-slate-100 opacity-60'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                                              wpState === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' :
                                              wpState === 'RUNNING' ? 'bg-blue-50 text-blue-700 animate-pulse' :
                                              wpState === 'WAITING_APPROVAL' ? 'bg-amber-50 text-amber-700' :
                                              'bg-slate-100 text-slate-500'
                                            }`}>
                                              {detailedWp.stage}
                                            </div>
                                            <div>
                                              <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
                                                <span>{detailedWp.label}</span>
                                                {detailedWp.requiresApproval && (
                                                  <span className="text-[8px] font-black uppercase text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">Ratification Gate</span>
                                                )}
                                              </div>
                                              <div className="text-[9px] text-slate-400 font-medium">{detailedWp.desc}</div>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-2">
                                            {wpState === 'RUNNING' && (
                                              <span className="flex h-1.5 w-1.5 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                                              </span>
                                            )}
                                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase font-mono tracking-wider ${
                                              wpState === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                              wpState === 'RUNNING' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                              wpState === 'WAITING_APPROVAL' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                              'bg-slate-100 text-slate-400'
                                            }`}>
                                              {wpState}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: INTEGRATED ENGINEERING & HUMAN RATIFICATION STUDIO */}
          {/* ========================================================================= */}
          {activeTab === 'human_review' && (
            <motion.div 
              key="tab-human_review"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              {/* Header Banner */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                      Authoritative Ratification & Gate Control Studio
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight">Institutional Architecture & Blueprint Ratification Surface</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl font-medium">
                    Human-in-the-loop governance: Inspect specifications, architectural blueprints, 32-stage history, and live product previews before authorizing autonomous workforce manufacturing.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[9px] font-black uppercase text-slate-500 block">Active Governor</span>
                    <input 
                      type="text" 
                      value={operatorName} 
                      onChange={e => setOperatorName(e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white text-right focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Central Grid: Left Review Queue & Right Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
                
                {/* Left Queue Panel */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ratification Queue</span>
                    <Filter size={12} className="text-slate-400" />
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {jobs.length === 0 ? (
                      <div className="p-8 text-center space-y-2 opacity-50 my-auto">
                        <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
                        <p className="text-xs font-bold text-slate-800">Corridor Clear</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">No manufacturing jobs are pending governor review.</p>
                      </div>
                    ) : (
                      jobs.map(job => {
                        const isPending = (job.status || '').includes('AWAITING') || (job.currentLifecycleState || '').includes('AWAITING');
                        return (
                          <button
                            key={job.id}
                            onClick={() => setSelectedJobId(job.id)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                              selectedJobId === job.id 
                                ? 'bg-blue-50/60 border-blue-300 shadow-xs' 
                                : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50/40'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-black uppercase bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                                {job.id}
                              </span>
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                isPending ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {(job.status || job.currentLifecycleState || '').replace(/_/g, ' ')}
                              </span>
                            </div>
                            
                            <h3 className="text-xs font-bold text-slate-900 truncate mb-1">
                              {getVal(job.blueprint?.productIdentity?.name, job.productId)}
                            </h3>
                            
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                              <span className="uppercase tracking-wide">{job.ecosystem?.replace(/_/g, ' ') || 'EDUCATION OS'}</span>
                            </div>

                            <div className="mt-3 flex items-center justify-between text-[10px] font-medium text-slate-500 pt-2 border-t border-slate-100/50">
                              <div className="flex items-center gap-1">
                                <Clock size={11} className="text-slate-400" />
                                <span>{new Date(job.createdAt).toLocaleTimeString()}</span>
                              </div>
                              <span className="text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                                {Math.round(job.progress || 0)}%
                              </span>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right Workspace Panel */}
                <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
                  {selectedJob ? (
                    <>
                      {/* Workspace Header Tabs */}
                      <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs">
                            J
                          </div>
                          <div>
                            <h2 className="text-sm font-black text-slate-900">
                              {getVal(selectedJob.blueprint?.productIdentity?.name, selectedJob.productId)}
                            </h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                              Product Scope: {selectedJob.productId}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl border border-slate-200 overflow-x-auto">
                          {[
                            { id: 'product_explorer', label: '1. Navigable Product Explorer' },
                            { id: 'gate_review', label: '2. Authoritative Gate Review' },
                            { id: 'brief', label: 'Brief' },
                            { id: 'specification', label: 'Specifications' },
                            { id: 'blueprint', label: 'Blueprint' },
                            { id: 'history32', label: '32-Stage History' },
                            { id: 'preview', label: 'Interactive Preview' }
                          ].map(t => (
                            <button 
                              key={t.id}
                              onClick={() => setReviewTab(t.id as any)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all whitespace-nowrap cursor-pointer ${
                                reviewTab === t.id ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Workspace Body */}
                      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 space-y-6">
                        
                        {/* 0. Navigable Product Structure Explorer */}
                        {reviewTab === 'product_explorer' && (
                          <ManufacturedProductExplorer job={selectedJob} />
                        )}

                        {/* 0.1 Authoritative Gate Review Engine */}
                        {reviewTab === 'gate_review' && (
                          <ManufacturingGateEngineComponent job={selectedJob} onDecisionExecuted={fetchFactoryState} />
                        )}
                        {reviewTab === 'brief' && (
                          <div className="space-y-6 max-w-4xl">
                            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                                <FileText size={16} className="text-blue-600" />
                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Original Human Briefing</h3>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Domain Sector</span>
                                  <p className="text-xs font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200/50 uppercase tracking-wide">
                                    {getVal(selectedJob.blueprint?.productIdentity?.sector, selectedJob.ecosystem)}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Organization</span>
                                  <p className="text-xs font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                                    {getVal(selectedJob.blueprint?.productIdentity?.organization, 'Institutional Authority')}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Version Standard</span>
                                  <p className="text-xs font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                                    v{selectedJob.version || '1.0.4-BETA'}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Statement of Purpose</span>
                                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/50 font-medium">
                                  {getVal(selectedJob.blueprint?.productIdentity?.purpose, 'Establish a private national service platform aligned with security parameters.')}
                                </p>
                              </div>

                              <div className="space-y-2">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-black">Target Operational Audience</span>
                                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/50 font-medium">
                                  {getVal(selectedJob.blueprint?.productIdentity?.targetUsers, 'National Institutional Workforce and Public Constituents.')}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                                <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                                  <ShieldCheck size={14} className="text-emerald-500" />
                                  Sovereignty Controls
                                </h4>
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                                    <span className="text-slate-500 font-medium">Data Residency</span>
                                    <span className="font-bold text-slate-800">LOCAL_ONLY</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                                    <span className="text-slate-500 font-medium">Isolation Level</span>
                                    <span className="font-bold text-slate-800">ENCLAVE_ISOLATED</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                                    <span className="text-slate-500 font-medium">Compliance Framework</span>
                                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">GDPR_Sovereign</span>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                                <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                                  <Cpu size={14} className="text-blue-500" />
                                  Platform Directives
                                </h4>
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                                    <span className="text-slate-500 font-medium">Host Cluster Model</span>
                                    <span className="font-bold text-slate-800">Modular Monolith</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                                    <span className="text-slate-500 font-medium">Primary DB Engine</span>
                                    <span className="font-bold text-slate-800">PostgreSQL (Drizzle)</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                                    <span className="text-slate-500 font-medium">API Gateway Standard</span>
                                    <span className="font-bold text-slate-800">TLS 1.3 / JWT Token</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2. Specification Tree Sub-Tab */}
                        {reviewTab === 'specification' && (
                          <div className="space-y-4 max-w-4xl">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
                              <div>
                                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Implementation-Grade Specification Tree</h3>
                                <p className="text-[11px] text-slate-500 font-medium">Inspect structural clauses normalized by JUMO Spec Engine</p>
                              </div>
                              <span className="text-[10px] font-mono font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                                Spec ID: {selectedJob.specificationId || 'SPEC-ATUTUR-2608'}
                              </span>
                            </div>

                            {[
                              { id: 'identity', title: 'Clause 1: Identity & Organizational Purpose', data: selectedJob.blueprint?.productIdentity },
                              { id: 'experience', title: 'Clause 2: Digital & Public Experience', data: selectedJob.experienceBlueprint?.publicExperience },
                              { id: 'functional', title: 'Clause 3: Functional Architecture & Capabilities', data: selectedJob.blueprint?.functionalArchitecture },
                              { id: 'technical', title: 'Clause 4: Technical & Compute Topology', data: selectedJob.blueprint?.technicalArchitecture },
                              { id: 'security', title: 'Clause 5: Security & Zero-Trust Perimeters', data: selectedJob.blueprint?.securityArchitecture },
                              { id: 'governance', title: 'Clause 6: Governance & Audit Matrix', data: selectedJob.blueprint?.aiArchitecture }
                            ].map(sec => (
                              <div key={sec.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                                <button
                                  onClick={() => setExpandedSpecSection(expandedSpecSection === sec.id ? null : sec.id)}
                                  className="w-full p-4 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-all"
                                >
                                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">{sec.title}</span>
                                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedSpecSection === sec.id ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedSpecSection === sec.id && (
                                  <div className="p-4 border-t border-slate-100 bg-slate-950 font-mono text-[10px] text-emerald-400 overflow-x-auto max-h-80">
                                    <pre>{JSON.stringify(sec.data || { status: 'NORMALIZED', clause: sec.title }, null, 2)}</pre>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 3. Blueprint Sub-Tab */}
                        {reviewTab === 'blueprint' && (
                          <div className="space-y-4 max-w-4xl">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
                              <div>
                                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">Synthesized Architecture Blueprint</h3>
                                <p className="text-[11px] text-slate-500 font-medium">Reconciled system blueprint generated prior to workforce manufacturing release</p>
                              </div>
                              <span className="text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                                Blueprint ID: {selectedJob.blueprintId || `ARCH-BP-${selectedJob.id}`}
                              </span>
                            </div>

                            <div className="bg-slate-950 rounded-xl p-5 font-mono text-[10px] text-emerald-400 overflow-x-auto max-h-[500px]">
                              <pre>{JSON.stringify(selectedJob.blueprint || { message: 'Blueprint expansion active in cognitive registry.' }, null, 2)}</pre>
                            </div>
                          </div>
                        )}

                        {/* 4. 32-Stage History Sub-Tab */}
                        {reviewTab === 'history32' && (
                          <div className="space-y-4 max-w-4xl">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
                              <div>
                                <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">32-Stage Manufacturing Execution History</h3>
                                <p className="text-[11px] text-slate-500 font-medium">Granular work package execution timeline with operator checksums</p>
                              </div>
                              <span className="text-[10px] font-mono font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                                Progress: {Math.round(selectedJob.progress || 0)}%
                              </span>
                            </div>

                            <div className="space-y-2">
                              {pipelineStages.map((wp) => {
                                const state = getWpState(wp.statusKey);
                                return (
                                  <div key={wp.stage} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                                        state === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                                        state === 'RUNNING' ? 'bg-blue-100 text-blue-800 animate-pulse' :
                                        state === 'WAITING_APPROVAL' ? 'bg-amber-100 text-amber-800' :
                                        'bg-slate-100 text-slate-500'
                                      }`}>
                                        {wp.stage}
                                      </span>
                                      <div>
                                        <div className="font-black text-slate-900">{wp.label}</div>
                                        <div className="text-[10px] text-slate-400">{wp.desc}</div>
                                      </div>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono ${
                                      state === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' :
                                      state === 'RUNNING' ? 'bg-blue-50 text-blue-700' :
                                      state === 'WAITING_APPROVAL' ? 'bg-amber-50 text-amber-700' :
                                      'bg-slate-100 text-slate-400'
                                    }`}>
                                      {state}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* 5. Interactive Product Preview Sub-Tab */}
                        {reviewTab === 'preview' && (
                          <div className="space-y-4 max-w-5xl">
                            {/* Control Bar */}
                            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-slate-400 font-mono">Viewport:</span>
                                <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                                  <button 
                                    onClick={() => setPreviewViewport('desktop')}
                                    className={`px-3 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 transition-all ${
                                      previewViewport === 'desktop' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                                    }`}
                                  >
                                    <Monitor size={12} /> Desktop
                                  </button>
                                  <button 
                                    onClick={() => setPreviewViewport('mobile')}
                                    className={`px-3 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1 transition-all ${
                                      previewViewport === 'mobile' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                                    }`}
                                  >
                                    <Smartphone size={12} /> Mobile
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-slate-400 font-mono">View Mode:</span>
                                <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                                  {(['landing', 'catalogue', 'portal'] as const).map(m => (
                                    <button 
                                      key={m}
                                      onClick={() => setPreviewMode(m)}
                                      className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-all ${
                                        previewMode === m ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-500'
                                      }`}
                                    >
                                      {m}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <button 
                                onClick={() => setShowAssistantModal(true)}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-black uppercase flex items-center gap-1.5 shadow-xs"
                              >
                                <Bot size={12} /> Test AI Assistant
                              </button>
                            </div>

                            {/* Preview Frame */}
                            <div className={`mx-auto transition-all ${previewViewport === 'mobile' ? 'max-w-sm' : 'w-full'}`}>
                              <div className="bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden min-h-[480px] flex flex-col text-slate-100">
                                {/* Browser Bar */}
                                <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                                  <div className="flex gap-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                                  </div>
                                  <div className="flex-1 bg-slate-900 px-3 py-1 rounded-md text-slate-300 font-medium truncate text-center">
                                    https://{selectedJob.productId.toLowerCase()}.jumo.internal/
                                  </div>
                                </div>

                                {/* Mock Interactive App Body */}
                                <div className="p-8 flex-1 bg-gradient-to-b from-slate-900 to-slate-950 space-y-6">
                                  <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-[10px] font-mono text-blue-300 uppercase font-black">
                                    Sovereign Sandbox Active
                                  </div>
                                  <h1 className="text-2xl font-black text-white">
                                    {getVal(selectedJob.blueprint?.productIdentity?.name, 'ATUTUR SEED SECONDARY SCHOOL')}
                                  </h1>
                                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                                    {getVal(selectedJob.blueprint?.productIdentity?.purpose, 'Institutional Operations Management & Digital Administration Service Platform.')}
                                  </p>

                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
                                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
                                      <div className="text-[10px] font-bold text-slate-400 uppercase">Student Intake</div>
                                      <div className="text-lg font-black text-white mt-1">1,240 Registered</div>
                                    </div>
                                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
                                      <div className="text-[10px] font-bold text-slate-400 uppercase">Faculty Portal</div>
                                      <div className="text-lg font-black text-emerald-400 mt-1">48 Active Staff</div>
                                    </div>
                                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
                                      <div className="text-[10px] font-bold text-slate-400 uppercase">Curriculum Modules</div>
                                      <div className="text-lg font-black text-blue-400 mt-1">32 Enrolled</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Ratification & Approval Control Panel */}
                      <div className="p-6 border-t border-slate-200 bg-white space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              Governor Ratification & Decision Panel
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Ratifying issues an immutable governance decision releasing autonomous workforce agents into factory manufacturing stages.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-slate-400 font-mono">Current Status:</span>
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase font-mono border ${
                              (selectedJob.status || '').includes('AWAITING') ? 'bg-amber-50 text-amber-800 border-amber-200' :
                              selectedJob.status === 'RUNTIME_ACTIVE' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                              'bg-blue-50 text-blue-800 border-blue-200'
                            }`}>
                              {(selectedJob.status || 'ACTIVE').replace(/_/g, ' ')}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 font-mono">Ratification / Feedback Notes</label>
                          <textarea 
                            rows={2}
                            placeholder="Enter governance review notes, approval directives, or feedback..."
                            value={rejectionFeedback}
                            onChange={(e) => setRejectionFeedback(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <button 
                            onClick={() => handleReviewDecision('APPROVE')}
                            disabled={isSubmittingReview}
                            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95 disabled:opacity-50"
                          >
                            {isSubmittingReview ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                            <span>Authorize Factory Production</span>
                          </button>

                          <button 
                            onClick={() => setShowRejectionModal(true)}
                            disabled={isSubmittingReview}
                            className="px-5 py-3 bg-transparent border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Reject & Request Corrections
                          </button>

                          <div className="ml-auto flex items-center gap-2">
                            <button onClick={() => onPauseJob(selectedJob.id)} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-black uppercase">Pause Job</button>
                            <button onClick={() => onResumeJob(selectedJob.id)} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-black uppercase">Resume Job</button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center text-slate-400 font-bold">Select a job from the queue to start ratification inspection.</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: COMPONENT ASSEMBLY & MICROSERVICES */}
          {/* ========================================================================= */}
          {activeTab === 'assembly_line' && (
            <motion.div 
              key="tab-assembly_line"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              {/* Dependency Topology Graph */}
              {selectedJob && <ManufacturingDependencyGraph job={selectedJob} />}

              {/* Execution Board */}
              {selectedJob && <ManufacturingExecutionBoard job={selectedJob} />}

              {/* Components Section */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Digital Component Assembly</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Reusable, cryptographically verified software components generated by the cognitive workforce.</p>
                  </div>
                  <span className="text-xs font-mono font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
                    {componentsList.length} Components Registered
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {componentsList.map(comp => (
                    <div key={comp.componentId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-mono font-black text-slate-900">{comp.componentId}</span>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          {comp.verificationStatus || 'VERIFIED'} ({comp.testCoveragePercent || 98}%)
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{comp.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400">Category: {comp.category || 'UI_COMPONENT'} | Ver: {comp.version || '1.0.0'}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl font-mono text-[10px] text-emerald-400 overflow-x-auto max-h-32">
                        <code>{comp.implementationSnippet || 'export async function exec() { /* Autonomous implementation */ }'}</code>
                      </div>
                      <div className="space-y-1 text-[10px] font-mono text-slate-500">
                        <div className="truncate">Ref: <span className="text-slate-800 font-bold">{comp.blueprintRef || 'BP-MODULE-01'}</span></div>
                        <div className="truncate">Hash: <span className="text-slate-600">{comp.cryptographicHash || 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Microservices Section */}
              <div className="space-y-4 pt-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Executable Micro-Services</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Isolated service containers with active telemetry probes and zero-trust verification gateways.</p>
                  </div>
                  <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                    {servicesList.length} Microservices Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicesList.map(srv => (
                    <div key={srv.serviceId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-mono font-black text-slate-900">{srv.serviceId}</span>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          {srv.healthStatus || 'HEALTHY'}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{srv.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400">Port: {srv.runtimeConfig?.port || 3001} | Concurrency: {srv.runtimeConfig?.concurrency || 100}</span>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase text-slate-400 font-mono">Endpoints:</span>
                        {srv.endpoints?.map((ep: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg text-[10px] font-mono border border-slate-100">
                            <span className="font-black text-indigo-600">{ep.method || 'GET'} {ep.path || '/api/v1'}</span>
                            <span className="text-slate-400">{ep.requiredClearance || 'PUBLIC'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: WORKFORCE & DATA SCHEMAS */}
          {/* ========================================================================= */}
          {activeTab === 'resources' && (
            <motion.div 
              key="tab-resources"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              {/* Manufacturing Resource Planning (MRP) */}
              <ManufacturingResourcePlanning />
              {/* Cognitive AI Workforce Grid & Audit Summary */}
              <div className="space-y-4">
                {(() => {
                  const audit = JumoAIAgentRegistry.auditCognitiveWorkforce();
                  return (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
                        <div className="text-[10px] font-black uppercase text-emerald-800">Real Executing</div>
                        <div className="text-xl font-black text-emerald-700 font-mono mt-1">{audit.executingEngineers}</div>
                        <div className="text-[9px] text-emerald-600 font-medium mt-0.5">Connected to @google/genai</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
                        <div className="text-[10px] font-black uppercase text-blue-800">Registered Idle</div>
                        <div className="text-xl font-black text-blue-700 font-mono mt-1">{audit.registeredIdle}</div>
                        <div className="text-[9px] text-blue-600 font-medium mt-0.5">Tools authorized</div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 p-3.5 rounded-xl">
                        <div className="text-[10px] font-black uppercase text-purple-800">No Execution Engine</div>
                        <div className="text-xl font-black text-purple-700 font-mono mt-1">{audit.capabilityNoExecutor}</div>
                        <div className="text-[9px] text-purple-600 font-medium mt-0.5">Capability registered</div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
                        <div className="text-[10px] font-black uppercase text-amber-800">Config Placeholders</div>
                        <div className="text-xl font-black text-amber-700 font-mono mt-1">{audit.configurationPlaceholders}</div>
                        <div className="text-[9px] text-amber-600 font-medium mt-0.5">Templates pending</div>
                      </div>
                      <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-xl">
                        <div className="text-[10px] font-black uppercase text-slate-700">Simulated / Mock</div>
                        <div className="text-xl font-black text-slate-800 font-mono mt-1">{audit.mockSimulated}</div>
                        <div className="text-[9px] text-slate-500 font-medium mt-0.5">Fallbacks</div>
                      </div>
                    </div>
                  );
                })()}

                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Cognitive AI Agent Workforce Registry</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Authoritative agent registry allocating cognitive divisions to manufacturing stages.</p>
                  </div>
                  <span className="text-xs font-mono font-black text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-lg">
                    {aiAgents.length} Autonomous Agents Registered
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiAgents.map((agent) => (
                    <div key={agent.agentId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-mono font-black text-slate-900">{agent.agentId}</span>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                          {agent.division}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{agent.jumoName}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{agent.role}</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 text-[10px] font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Provider:</span>
                          <span className="font-bold text-slate-800">{agent.modelPolicy?.preferredProvider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Model:</span>
                          <span className="font-bold text-slate-800">{agent.modelPolicy?.primaryModel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Latency:</span>
                          <span className="font-bold text-emerald-600">{agent.executionMetrics?.averageLatencyMs || 120}ms</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data & Database Schemas Section */}
              <div className="space-y-4 pt-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Database Schemas & Isolated Storage</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Isolated storage partitions, relational schemas, migrations, and Row-Level Security policy registers.</p>
                  </div>
                  <span className="text-xs font-mono font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                    {schemasList.length} Databases Registered
                  </span>
                </div>

                <div className="space-y-4">
                  {schemasList.map(sch => (
                    <div key={sch.schemaId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-mono font-black text-slate-900">{sch.schemaId}</span>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          Target: {sch.targetRDBMS || 'PostgreSQL'}
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
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: VERIFICATION, EVIDENCE & AUDIT */}
          {/* ========================================================================= */}
          {activeTab === 'build_log' && (
            <motion.div 
              key="tab-build_log"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              {/* Quality Control & Impact Dashboard */}
              {selectedJob && <ManufacturingQualityDashboard job={selectedJob} />}
              {/* JDPM Lineage & Artifact Provenance Traversal Engine */}
              <div className="pt-4">
                <JDPMLineageInspector 
                  productName={getVal(selectedJob?.blueprint?.productIdentity?.name, 'ATUTUR SEED SECONDARY SCHOOL')} 
                />
              </div>

              {/* Test Evidence Section */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Verified Test Suite Evidence</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Automated test suites confirming regression security with cryptographically signed verifiable evidence.</p>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                    {testsList.length} Suites Executed
                  </span>
                </div>

                <div className="space-y-3">
                  {testsList.map(tst => (
                    <div key={tst.testId} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
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
                      <div className="text-right font-mono text-[11px]">
                        <span className="text-xs font-black text-emerald-700">{tst.passedCount}/{tst.assertionsCount} Passed</span>
                        <span className="text-[9px] text-slate-400 block">{tst.durationMs}ms | Digest: {tst.evidenceDigest?.substring(0, 14)}...</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & Traceability Matrix */}
              <div className="space-y-4 pt-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Quality Management & Traceability Matrix</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Authoritative verifiable trace records linking original requirements, blueprint items, and runtime logs.</p>
                  </div>
                  <span className="text-xs font-mono font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                    {qualityData.traceabilityMatrix?.length || 1} Trace Links
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 font-mono">End-to-End Traceability Links</h4>
                  {qualityData.traceabilityMatrix?.map((link, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-[10px] space-y-2 overflow-x-auto shadow-2xs">
                      <div className="flex items-center gap-2 whitespace-nowrap">
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
              </div>

              {/* International Standards Alignment Control Matrix (ISO 9001, 15288, 12207, 25010, 27001, 42001, 31000, 19011, 10006, IEC 62443) */}
              <div className="space-y-4 pt-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">International Manufacturing Standards Alignment</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Authoritative mapping of ISO/IEC international quality, lifecycle, security, AI governance, risk, and industrial standards.</p>
                  </div>
                  <span className="text-xs font-mono font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
                    10 Standards Mapped
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-sans text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[10px] uppercase text-slate-500">
                          <th className="p-3 font-black">Standard Code</th>
                          <th className="p-3 font-black">Control Objective</th>
                          <th className="p-3 font-black">JUMO Control ID</th>
                          <th className="p-3 font-black">Lifecycle Phase</th>
                          <th className="p-3 font-black">Evidence Requirement</th>
                          <th className="p-3 font-black">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[10px]">
                        {JumoStandardsAlignmentEngine.getInstance().getAllMappings().map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-bold text-slate-900 whitespace-nowrap">{m.standardCode}</td>
                            <td className="p-3 text-slate-600 font-sans">{m.controlObjective}</td>
                            <td className="p-3 font-bold text-indigo-700 whitespace-nowrap">{m.jumoControlId}</td>
                            <td className="p-3 text-slate-700 font-bold whitespace-nowrap">{m.lifecyclePhaseName}</td>
                            <td className="p-3 text-slate-500 font-sans max-w-[200px] truncate">{m.evidenceRequirement}</td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold uppercase text-[9px]">
                                {m.alignmentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: RUNTIME OPERATIONS & GO-LIVE */}
          {/* ========================================================================= */}
          {activeTab === 'operations' && (
            <motion.div 
              key="tab-operations"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              {/* Deployments & Active Instances Section */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Active Deployments & Container Clusters</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Live instances registered in the secure regional network topology displaying operational telemetry.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedJob && (
                      <button 
                        onClick={() => onAcceptGoLive(selectedJob.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accept & Go Live
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {runtimeList.map(inst => (
                    <div key={inst.instanceId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-mono font-black text-slate-900">{inst.instanceId}</span>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          {inst.operationalState || 'RUNNING'}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-slate-900">{inst.productName || 'ATUTUR SEED SECONDARY SCHOOL'} (v{inst.version || '1.0.4'})</h4>
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl font-mono text-[10px]">
                        <div>
                          <span className="text-slate-400 block">CPU Load</span>
                          <span className="font-bold text-slate-800">{inst.cpuUsagePercent || 12}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Memory</span>
                          <span className="font-bold text-slate-800">{inst.memoryUsageMb || 240} MB</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Throughput</span>
                          <span className="font-bold text-slate-800">{inst.transactionsPerSecond || 45} TPS</span>
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Endpoint: <span className="text-blue-600 font-bold">{inst.endpoint || 'https://atutur.jumo.internal'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Structured Rejection / Change Request Modal */}
        {showRejectionModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="text-sm font-black uppercase tracking-wider">Reject Blueprint & Request Corrections</h3>
                </div>
                <button onClick={() => setShowRejectionModal(false)} className="text-slate-400 hover:text-slate-700 font-black">X</button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Rejection Severity</label>
                  <select 
                    value={rejectionSeverity} 
                    onChange={e => setRejectionSeverity(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-slate-800"
                  >
                    <option value="MINOR">MINOR — Non-blocking adjustments</option>
                    <option value="MAJOR">MAJOR — Requires architectural revision</option>
                    <option value="CRITICAL">CRITICAL — Violates sovereignty or compliance rules</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Affected Work Package / Stage</label>
                  <input 
                    type="text" 
                    value={affectedStage} 
                    onChange={e => setAffectedStage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Detailed Rejection Reason</label>
                  <textarea 
                    rows={3}
                    placeholder="Specify exact reasons for rejection..."
                    value={rejectionReason}
                    onChange={e => setRejectionReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Requested Correction</label>
                  <textarea 
                    rows={2}
                    placeholder="Describe required changes for cognitive workforce re-synthesis..."
                    value={requestedCorrection}
                    onChange={e => setRequestedCorrection(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button onClick={() => setShowRejectionModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900">Cancel</button>
                <button 
                  onClick={() => handleReviewDecision('REJECT')}
                  disabled={isSubmittingReview}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Confirm Rejection & Request Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive AI Assistant Modal */}
        {showAssistantModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Bot className="w-5 h-5" />
                  <h3 className="text-sm font-black uppercase tracking-wider">Sovereign RAG Product Guide</h3>
                </div>
                <button onClick={() => setShowAssistantModal(false)} className="text-slate-400 hover:text-slate-700 font-black">X</button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                {assistantMessages.map((m, idx) => (
                  <div key={idx} className={`p-3 rounded-xl text-xs max-w-[85%] ${
                    m.sender === 'user' ? 'bg-indigo-600 text-white ml-auto font-medium' : 'bg-white border border-slate-200 text-slate-800 font-medium'
                  }`}>
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="text"
                  placeholder="Ask assistant about product specifications..."
                  value={assistantInput}
                  onChange={e => setAssistantInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendAssistantMessage()}
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
                <button 
                  onClick={handleSendAssistantMessage}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Hierarchical Right Inspector Console */}
      <HierarchicalSidebar 
        job={selectedJob} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        runtimeList={runtimeList}
      />
    </div>
  );
};

// Helper function for deployments count
function deploymentsListCount(runtimeList: any[]) {
  return runtimeList && runtimeList.length > 0 ? runtimeList.length : 1;
}

interface HierarchicalSidebarProps {
  job?: ProductManufacturingJob;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  runtimeList: any[];
}

const HierarchicalSidebar: React.FC<HierarchicalSidebarProps> = ({ job, activeTab, setActiveTab, runtimeList }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['PRODUCT', 'RATIFICATION', 'MANUFACTURING']);

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
      label: 'PRODUCT IDENTITY',
      icon: <Package className="w-4 h-4" />,
      subcategories: [
        { id: 'identity', label: 'Identity', detail: blueprint?.productIdentity?.name || 'ATUTUR SEED SECONDARY SCHOOL' },
        { id: 'business', label: 'Tenancy', detail: blueprint?.productIdentity?.tenancyModel || 'SINGLE_TENANT' },
        { id: 'domain', label: 'Domain', detail: blueprint?.productIdentity?.sector || 'EDUCATION_OS' },
      ]
    },
    {
      id: 'RATIFICATION',
      label: 'RATIFICATION & GATES',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      subcategories: [
        { id: 'status', label: 'Gate Status', detail: (selectedJob?.status || 'ACTIVE').replace(/_/g, ' ') },
        { id: 'cert', label: 'Certification', detail: selectedJob?.certificationId ? 'Certified' : 'Pending Review' },
      ]
    },
    {
      id: 'EXPERIENCE',
      label: 'EXPERIENCE ARCH',
      icon: <Sparkles className="w-4 h-4" />,
      subcategories: [
        { id: 'public', label: 'Public Hero', detail: expBlueprint?.publicExperience?.landingPage?.heroTitle || 'Sovereign Portal' },
        { id: 'nav', label: 'Navigation', detail: expBlueprint?.navigationExperience?.sidebarEnabled ? 'SIDEBAR' : 'TOPBAR' },
      ]
    },
    {
      id: 'ARCHITECTURE',
      label: 'SYSTEM ARCHITECTURE',
      icon: <Layers className="w-4 h-4" />,
      subcategories: [
        { id: 'tech', label: 'Compute', detail: blueprint?.technicalArchitecture?.computeTier || 'T3.Large' },
        { id: 'db', label: 'Database', detail: blueprint?.technicalArchitecture?.databaseType || 'PostgreSQL' },
      ]
    },
    {
      id: 'MANUFACTURING',
      label: 'MANUFACTURING PLAN',
      icon: <Settings2 className="w-4 h-4" />,
      subcategories: [
        { id: 'stages', label: '32 Work Packages', detail: selectedJob?.currentManufacturingStage ? `Stage ${selectedJob.currentManufacturingStage}/32` : 'Active' },
        { id: 'progress', label: 'Completion', detail: `${Math.round(selectedJob?.progress || 0)}%` },
      ]
    },
    {
      id: 'RUNTIME',
      label: 'RUNTIME TELEMETRY',
      icon: <Activity className="w-4 h-4" />,
      subcategories: [
        { id: 'health', label: 'Health', detail: jobRuntime?.operationalState || 'HEALTHY' },
        { id: 'endpoint', label: 'Endpoint', detail: jobRuntime?.endpoint || 'https://atutur.jumo.internal' },
      ]
    }
  ];

  return (
    <div className="w-72 shrink-0 bg-slate-50 border-l border-slate-200 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden xl:block shadow-xs">
      <div className="p-4 border-b border-slate-200 bg-white">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Navigation Console</h3>
        <p className="text-[11px] font-bold text-slate-900 truncate">{blueprint?.productIdentity?.name || selectedJob?.productId || 'ATUTUR SEED SECONDARY SCHOOL'}</p>
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
                      <div 
                        key={sub.id}
                        className="w-full pl-10 pr-4 py-2 text-left hover:bg-white transition-all group border-b border-slate-50 last:border-0"
                      >
                        <div className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600">{sub.label}</div>
                        <div className="text-[9px] text-slate-400 font-mono truncate">{sub.detail}</div>
                      </div>
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
