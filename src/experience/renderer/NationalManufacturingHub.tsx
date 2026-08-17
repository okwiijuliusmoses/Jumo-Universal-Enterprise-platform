import React, { useState, useEffect } from "react";
import { JUMO_STUDIO_REGISTRY } from '../../core/hub/studios/JumoStudioRegistry';
import { JUMO_HYBRID_ARCHITECTURE_REGISTRY } from '../../core/hub/architecture/JumoHybridArchitectureLayers';
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, Shield, Database, Activity, Server, Settings, Layers, Terminal, Globe, Sparkles, MessageSquare, 
  Box, FileText, CheckCircle2, AlertCircle, Play, Pause, RefreshCw, Plus, Search, 
  ChevronRight, X, ArrowRight, Check, Sliders, AlertTriangle, FileCheck, Trash2, Send, 
  History, RefreshCcw, Command, Zap, ExternalLink, HardDrive, Key, Network, Users, Cloud,
  CheckSquare, HelpCircle, ActivitySquare, AlertOctagon, Compass, BookOpen, Binary,
  FileSignature, GitCommit, GitPullRequest, WifiOff, Award, ShieldCheck, Briefcase, FlaskConical,
  Home
} from "lucide-react";
import { UniversalHubRegistry } from "../../core/factory/registry/UniversalHubRegistry";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";
import { EcosystemWorkspace } from "./ecosystem/EcosystemWorkspace";
import { useJobNavigation } from '../shell/JobNavigationContext';

import { ArchitectureStudio } from './studios/ArchitectureStudio';
import { ManufacturingStudio } from './studios/ManufacturingStudio';
import { ProductAssuranceStudio } from './studios/AssuranceStudio';
import { RuntimeOperationsStudio } from './studios/OperationsStudio';
import { GovernanceStudio } from './studios/GovernanceStudio';

import { 
  ArchitectureContract, 
  ManufacturingJob, 
  BuildArtifact,
  DeploymentRecord,
  VerificationFailureRecord,
  CertificationRecord,
  ManufacturingCategory
} from "../../core/factory/registry/HubRegistryTypes";

import { SovereignGovernanceRegistry } from "../../services/gov/SovereignGovernanceRegistry";
import { JumoEventBus } from "../../core/common/events/JumoEventBus";
import { SpecificationStudio } from "./studios/SpecificationStudio";

import { FAAPLedgerStudio } from './studios/FAAPLedgerStudio';
import { BrandingStudio } from './studios/BrandingStudio';
import { SovereignControlStudio } from './studios/SovereignControlStudio';
import { ArchitectureVerificationCommandCenter } from './studios/ArchitectureVerificationCommandCenter';
import { BuildStudio } from './studios/BuildStudio';
import { ConfigStudio } from './studios/ConfigStudio';
import { VerificationStudio } from './studios/VerificationStudio';
import { CertificationStudio } from './studios/CertificationStudio';
import { DeploymentStudio } from './studios/DeploymentStudio';
import { CloudStudio } from './studios/CloudStudio';
import { LifecycleStudio } from './studios/LifecycleStudio';
import { ProvisioningStudio } from './studios/ProvisioningStudio';
import { EngineeringStudio } from './studios/EngineeringStudio';
import { RegistryStudio } from './studios/RegistryStudio';
import { SovereignAIControlCenterStudio } from './studios/SovereignAIControlCenterStudio';
import { RemoteDigitalWorkshopStudio } from './studios/RemoteDigitalWorkshopStudio';
import { FinancialControlStudio } from './studios/FinancialControlStudio';
import { DigitalProductsStudio } from './studios/DigitalProductsStudio';
import { JobReviewStudio } from './studios/JobReviewStudio';

import { 
  GlobalManufacturingLifecycleRegistry, 
  GlobalLifecycleStageDescriptor 
} from "../../core/factory/lineage/GlobalManufacturingLifecycleRegistry";
import { ApprovalService } from "../../services/ApprovalService";
import { DigitalProductManufacturingOrchestrator } from "../../services/factory/DigitalProductManufacturingOrchestrator";

import { SystemPerformanceMonitor } from "./components/Dashboard/SystemPerformanceMonitor";

export type HubWorkspace = HubWorkspaceAlias;
type HubWorkspaceAlias = 
  | 'specification'
  | 'architecture'
  | 'factory'
  | 'assurance'
  | 'operations'
  | 'governance'
  | 'settings'
  | 'manufacturing'
  | 'config'
  | 'verification'
  | 'certification'
  | 'deployment'
  | 'overview'
  | 'control'
  | 'templates'
  | 'faap'
  | 'branding'
  | 'arch-verification'
  | 'provisioning'
  | 'engineering'
  | 'workforce'
  | 'cloud'
  | 'security'
  | 'migration'
  | 'lifecycle'
  | 'audit'
  | 'workshop'
  | 'ai-control'
  | 'financial'
  | 'products'
  | 'job-review';

// Map 20 stages to studios
const STAGE_TO_STUDIO_MAP: Record<string, HubWorkspace> = {
  '01_INTENT': 'specification',
  '02_SPECIFICATION': 'specification',
  '03_ARCHITECTURE': 'architecture',
  '04_ENGINEERING': 'engineering',
  '05_BLUEPRINT': 'architecture',
  '06_DESIGN_ASSURANCE': 'assurance',
  '07_COMPONENT_MFG': 'factory',
  '08_MODULE_MFG': 'factory',
  '09_SERVICE_INTEGRATION_MFG': 'factory',
  '10_APPLICATION_ASSEMBLY': 'factory',
  '11_CONFIGURATION_INSTITUTIONALIZATION': 'branding',
  '12_VERIFICATION_VALIDATION': 'verification',
  '13_CERTIFICATION_RELEASE': 'certification',
  '14_PROVISIONING_DEPLOYMENT': 'provisioning',
  '15_INSTITUTIONAL_COMMISSIONING': 'provisioning',
  '16_GO_LIVE_ACCEPTANCE': 'operations',
  '17_OPERATIONS_MONITORING': 'operations',
  '18_MAINTENANCE_SUPPORT': 'lifecycle',
  '19_EVOLUTION_UPGRADE': 'lifecycle',
  '20_RETIREMENT_ARCHIVAL': 'governance',
};

export function NationalManufacturingHub({ activeWorkspace, onNavigate }: { activeWorkspace: HubWorkspace; onNavigate?: (ws: HubWorkspace) => void }) {
  const [activeWorkspaceState, setActiveWorkspaceState] = useState<HubWorkspace>(activeWorkspace || 'specification');
  const { selectedJob, setSelectedJobId } = useJobNavigation();
  const activeJob = selectedJob;
  const [archContracts, setArchContracts] = useState<ArchitectureContract[]>([]);
  const [jobs, setJobs] = useState<ManufacturingJob[]>([]);
  const [deploymentRecords, setDeploymentRecords] = useState<DeploymentRecord[]>([]);
  const [certificationRecords, setCertificationRecords] = useState<CertificationRecord[]>([]);
  const [runtimeInstances, setRuntimeInstances] = useState<any[]>([]);
  const [auditEvents, setAuditEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const registry = SovereignGovernanceRegistry.getInstance();
  const orchestrator = DigitalProductManufacturingOrchestrator.getInstance();
  const lifecycleRegistry = GlobalManufacturingLifecycleRegistry.getInstance();
  const allStages = lifecycleRegistry.getAllStages();

  // Map any incoming sub-category or alias workspaces to their canonical studio tabs or direct renderers
  const getCanonicalGroup = (ws: HubWorkspace): HubWorkspace => {
    switch (ws) {
      case 'specification': return 'specification';
      case 'provisioning': return 'provisioning';
      case 'architecture': return 'architecture';
      case 'arch-verification': return 'arch-verification';
      case 'factory':
      case 'manufacturing':
        return 'factory';
      case 'engineering': return 'engineering';
      case 'workforce': return 'workforce';
      case 'config':
      case 'branding':
        return 'branding';
      case 'assurance':
      case 'verification':
        return 'verification';
      case 'certification':
        return 'certification';
      case 'operations':
      case 'overview':
        return 'operations';
      case 'deployment': return 'deployment';
      case 'cloud': return 'cloud';
      case 'security':
      case 'control':
        return 'control';
      case 'migration': return 'migration';
      case 'lifecycle': return 'lifecycle';
      case 'governance':
      case 'audit':
        return 'governance';
      case 'templates': return 'templates';
      case 'faap': return 'faap';
      default:
        return ws;
    }
  };

  useEffect(() => {
    if (activeWorkspace) {
      setActiveWorkspaceState(activeWorkspace);
    }
  }, [activeWorkspace]);

  useEffect(() => {
    const fetchData = () => {
      setArchContracts(registry.getAllBlueprints());
      const allJobs = registry.getAllJobs();
      setJobs(allJobs);
      
      // Find the most relevant active job
      const currentJob = allJobs.find(j => j.status !== 'FAILED') || allJobs[allJobs.length - 1];
      if (currentJob && !selectedJob) {
        setSelectedJobId(currentJob.id);
      }

      setDeploymentRecords(registry.getDeploymentRecords());
      setCertificationRecords(registry.getCertificationRecords());
      setRuntimeInstances(registry.getAllRuntimeInstances());
      setAuditEvents(registry.getLedger());
      setIsLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const onNavigateInternal = (ws: HubWorkspace) => {
    setActiveWorkspaceState(ws);
    onNavigate?.(ws);
  };

  const getStageStatus = (stage: GlobalLifecycleStageDescriptor) => {
    if (!activeJob) return stage.stageNumber === 1 ? 'AVAILABLE' : 'LOCKED';
    
    // Registry-driven mapping of job lifecycle state to stage numbers
    const allStages = GlobalManufacturingLifecycleRegistry.getInstance().getAllStages();
    
    // Find the current stage by matching state or ID
    let currentStageIndex = 0;
    const currentState = activeJob.currentLifecycleState as string;
    
    // Match against stage IDs or common state strings
    const matchedStage = allStages.find(s => s.id === currentState || s.code === currentState);
    
    if (matchedStage) {
      currentStageIndex = allStages.indexOf(matchedStage);
    } else {
      // Fallback: heuristic mapping for legacy state names
      const stateToStageIndexMap: Record<string, number> = {
        'SPECIFICATION_DRAFT': 1,
        'SPECIFICATION_NORMALIZED': 1,
        'REQUIREMENTS_VALIDATED': 1,
        'AWAITING_SPECIFICATION_APPROVAL': 1,
        'SPECIFICATION_APPROVED': 2,
        'ARCHITECTURE_INTAKE': 2,
        'ARCHITECTURAL_EXPANSION': 2,
        'AWAITING_ARCHITECTURE_APPROVAL': 2,
        'ARCHITECTURE_APPROVED': 3,
        'ENGINEERING_INTAKE': 3,
        'ENGINEERING_IMPLEMENTATION': 3,
        'ENGINEERING_VERIFIED': 4,
        'FACTORY_READY': 5,
        'MANUFACTURING_EXECUTION': 6,
        'MANUFACTURING_VERIFIED': 9,
        'BUILDING': 9,
        'BUILD_VERIFIED': 11,
        'PRODUCT_ASSURANCE': 11,
        'CERTIFICATION': 12,
        'CERTIFIED': 13,
        'PROVISIONING': 13,
        'DEPLOYMENT': 13,
        'RUNTIME_READY': 15,
        'OPERATING': 16
      };
      currentStageIndex = stateToStageIndexMap[currentState] || 0;
    }

    const currentStageNumber = allStages[currentStageIndex]?.stageNumber || 1;
    
    if (stage.stageNumber < currentStageNumber) return 'COMPLETED';
    if (stage.stageNumber === currentStageNumber) {
       return (currentState || "").includes('AWAITING') ? 'WAITING_APPROVAL' : 'ACTIVE';
    }
    return 'LOCKED';
  };

  const renderStudio = () => {
    const ws = activeWorkspaceState;
    switch (ws) {
      case 'specification':
        return <SpecificationStudio />;
      case 'provisioning':
        return <ProvisioningStudio />;
      case 'architecture':
        return (
          <ArchitectureStudio 
            requests={[]} 
            contracts={archContracts}
            expansionTraces={[]}
            onCreateContract={async (requestId: string) => {
              await orchestrator.initiateManufacturingLifecycle(requestId, {
                title: "Injected Project",
                problem: "Self-healing architecture recovery",
                ecosystem: "ERP_ECOSYSTEM"
              });
            }}
            onApproveContract={async (contractId: string) => {
              const job = jobs.find(j => j.blueprintId === contractId);
              if (job) {
                await orchestrator.grantApproval(job.id, 'ARCHITECTURE_APPROVED', 'Minister of Infrastructure');
              }
            }}
            onLaunchManufacturing={async (contractId: string) => {
              const job = jobs.find(j => j.blueprintId === contractId);
              if (job) {
                await orchestrator.startManufacturing(job.id);
              }
            }}
            onCreateRequest={async () => {}}
          />
        );
      case 'arch-verification':
        return (
          <ArchitectureVerificationCommandCenter 
            onApproveContractAndLaunchManufacturing={async (contractId: string) => {
              const job = jobs.find(j => j.blueprintId === contractId);
              if (job) {
                await orchestrator.grantApproval(job.id, 'ARCHITECTURE_APPROVED', 'Minister of Infrastructure');
                await orchestrator.startManufacturing(job.id);
              }
              onNavigateInternal('manufacturing');
            }}
          />
        );
      case 'factory':
      case 'manufacturing':
        return (
          <ManufacturingStudio 
            jobs={jobs}
            contracts={archContracts}
            onPromoteJob={async (jobId: string) => {
              const job = jobs.find(j => j.id === jobId);
              if (job) {
                if (job.currentLifecycleState === 'AWAITING_SPECIFICATION_APPROVAL') {
                  await orchestrator.grantApproval(jobId, 'SPECIFICATION_APPROVED', 'Sovereign Governor');
                } else if (job.currentLifecycleState === 'AWAITING_ARCHITECTURE_APPROVAL') {
                  await orchestrator.grantApproval(jobId, 'ARCHITECTURE_APPROVED', 'Chief Architect');
                } else if (job.currentLifecycleState === 'FACTORY_READY') {
                  await orchestrator.startManufacturing(jobId);
                } else if (job.currentLifecycleState === 'MANUFACTURING_VERIFIED') {
                  await orchestrator.startBuild(jobId);
                } else if (job.currentLifecycleState === 'BUILD_VERIFIED') {
                  await orchestrator.verifyProduct(jobId);
                }
              }
            }}
            onPauseJob={async (jobId: string) => {
              // Placeholder for pause if needed
            }}
            eventLog={[]}
          />
        );
      case 'engineering':
      case 'workforce':
        return <EngineeringStudio agents={JumoAIAgentRegistry.getAllAgents() as any} jobs={jobs} workLogs={[]} eventLog={[]} />;
      case 'config':
      case 'branding':
        return <BrandingStudio />;
      case 'assurance':
      case 'verification':
        return <VerificationStudio gates={[]} failures={[]} isVerifying={false} verifyingIndex={0} onRunSuite={() => {}} />;
      case 'certification':
        return <CertificationStudio certifications={certificationRecords} jobs={jobs} onCertify={async (jobId: string, authority: string) => {
          await orchestrator.certifyProduct(jobId, authority);
        }} />;
      case 'operations':
      case 'overview':
        return (
          <RuntimeOperationsStudio 
            deploymentRecords={deploymentRecords}
            cloudSlots={[]}
            runtimeInstances={runtimeInstances}
          />
        );
      case 'deployment':
        return <DeploymentStudio records={deploymentRecords} slots={[]} isDeploying={false} deploymentLogs={[]} jobs={jobs} />;
      case 'cloud':
        return <CloudStudio slots={[]} onScale={() => {}} onTogglePower={() => {}} />;
      case 'security':
      case 'control':
        return <SovereignControlStudio />;
      case 'lifecycle':
      case 'migration':
        return <LifecycleStudio />;
      case 'governance':
      case 'audit':
        return (
          <GovernanceStudio 
            stats={{
              activeBlueprints: archContracts.length,
              certifiedProducts: certificationRecords.length,
              nationalStandardCompliance: 100
            }}
            ledger={auditEvents}
            workforceStats={{
              totalAgents: JumoAIAgentRegistry.getAllAgents().length,
              divisions: JumoAIAgentRegistry.getDivisions()
            }}
          />
        );
      case 'templates':
        return (
          <RegistryStudio 
            registryFilter="ALL"
            setRegistryFilter={() => {}}
            searchTerm=""
            setSearchTerm={() => {}}
            erpEcosystems={[]}
            commercialProducts={[]}
            softwareProducts={[]}
            jobs={jobs}
          />
        );
      case 'faap':
        return <FAAPLedgerStudio />;
      case 'ai-control':
        return <SovereignAIControlCenterStudio />;
      case 'workshop':
        return <RemoteDigitalWorkshopStudio />;
      case 'financial':
        return <FinancialControlStudio />;
      case 'products':
        return <DigitalProductsStudio />;
      case 'job-review':
        return <JobReviewStudio />;
      default:
        return <SpecificationStudio />;
    }
  };

  const canonicalActive = getCanonicalGroup(activeWorkspaceState);

  return (
    <div className="space-y-8 bg-slate-50 min-h-screen p-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
             <Cpu size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              National Enterprise Factory
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Sovereign Digital Operating Platform
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto max-w-full no-scrollbar">
            {allStages.map(stage => {
              const status = getStageStatus(stage);
              const isSelected = STAGE_TO_STUDIO_MAP[stage.id] === activeWorkspaceState;
              
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    const targetStudio = STAGE_TO_STUDIO_MAP[stage.id];
                    if (targetStudio) onNavigateInternal(targetStudio);
                  }}
                  title={stage.description}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[80px] border ${
                    isSelected 
                      ? 'bg-white border-slate-300 shadow-sm' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    status === 'COMPLETED' ? 'bg-emerald-500' :
                    status === 'ACTIVE' ? 'bg-blue-500 animate-pulse' :
                    status === 'WAITING_APPROVAL' ? 'bg-amber-500' :
                    'bg-slate-300'
                  }`} />
                  <span className={`text-[8px] font-black uppercase tracking-tighter ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                    {stage.code.replace('_', ' ')}
                  </span>
                  <span className="text-[7px] font-bold text-slate-400">{status}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-200/50 rounded-xl border border-slate-200 w-fit">
            {(['specification', 'architecture', 'factory', 'assurance', 'operations', 'governance'] as HubWorkspace[]).map(ws => (
              <button
                key={ws}
                onClick={() => onNavigateInternal(ws)}
                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all whitespace-nowrap ${
                  canonicalActive === ws 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {ws}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 min-h-[70vh]">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
            </div>
          ) : (
            renderStudio()
          )}
        </div>

        <div className="space-y-8">
          <SystemPerformanceMonitor />
          
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-black uppercase tracking-widest">Sovereign Guard</h3>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              Automated governance and ledger integrity enforcement active. All manufacturing artifacts are signed by JUMO Sovereign PKI.
            </p>
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-slate-400">Ledger Hash</span>
                <span className="font-mono text-blue-400">0d39c3...aeebe5</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-slate-400">Compliance</span>
                <span className="text-emerald-400">100% SECURE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
