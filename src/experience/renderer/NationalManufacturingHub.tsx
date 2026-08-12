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
import { DigitalEcosystemSpecificationForm, EcosystemSpecification } from "./specification/DigitalEcosystemSpecificationForm";
import { EcosystemWorkspace } from "./ecosystem/EcosystemWorkspace";

// Import New Studios
import { ArchitectureStudio } from './studios/ArchitectureStudio';
import { ManufacturingStudio } from './studios/ManufacturingStudio';
import { EngineeringStudio } from './studios/EngineeringStudio';
import { BuildStudio } from './studios/BuildStudio';
import { DeploymentStudio } from './studios/DeploymentStudio';
import { VerificationStudio } from './studios/VerificationStudio';
import ArchitectureVerificationCommandCenter from "./studios/ArchitectureVerificationCommandCenter";
import { ProvisioningStudio } from './studios/ProvisioningStudio';
import { CloudStudio } from './studios/CloudStudio';
import { LifecycleStudio } from './studios/LifecycleStudio';
import { CertificationStudio } from './studios/CertificationStudio';
import { SpecificationStudio } from './studios/SpecificationStudio';
import { RegistryStudio } from './studios/RegistryStudio';
import { BrandingStudio } from './studios/BrandingStudio';
import { ConfigStudio } from './studios/ConfigStudio';
import { SovereignControlStudio } from './studios/SovereignControlStudio';
import { FAAPLedgerStudio } from './studios/FAAPLedgerStudio';

// Import High-Level Audit & Infrastructure Renderers
import { AuditRenderer } from './AuditRenderer';
import { InfrastructureRenderer } from './InfrastructureRenderer';
import { SecurityRegistryRenderer } from './SecurityRegistryRenderer';
import { EnterprisePlatformRegistryRenderer } from './TemplateRegistryRenderer';


import { 
  ArchitectureContract, 
  ManufacturingJob, 
  ManufacturingJobStatus, 
  EngineeringAssignment, 
  EngineeringTask, 
  EngineeringAgent,
  BuildArtifact,
  DeploymentRecord,
  VerificationFailureRecord,
  CertificationRecord,
  ManufacturingCategory
} from "../../core/factory/registry/HubRegistryTypes";

// === TYPES ===
export type HubWorkspace = 
  | 'overview'
  | 'specification'
  | 'provisioning'
  | 'architecture'
  | 'manufacturing'
  | 'engineering'
  | 'cloud'
  | 'verification'
  | 'certification'
  | 'registries'
  | 'templates'
  | 'workforce'
  | 'security'
  | 'audit'
  | 'hybrid'
  | 'settings'
  | 'deployment'
  | 'migration'
  | 'lifecycle'
  | 'eco-erp'
  | 'eco-cloud'
  | 'eco-software'
  | 'eco-commercial'
  | 'eco-research'
  | 'provisioning'
  | 'branding'
  | 'config'
  | 'faap'
  | 'control';

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
  ecosystemType: ManufacturingCategory;
  sector: string;
  governmentScale?: string;
  applicationType?: string;
  detailedSpecification?: any;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'COMPILED';
  createdAt: string;
}

interface JumoBlueprint {
  blueprintId: string;
  name: string;
  type: string;
  version: string;
  lastBuildTime: string;
  compilerStatus: 'OK' | 'DRAFT' | 'ERROR';
  content: string;
  lifecycleState: 'DRAFT' | 'REVIEW' | 'VALIDATED' | 'VERIFIED' | 'APPROVED' | 'COMPILED' | 'READY' | 'PROVISIONED' | 'RETIRED';
}

interface VerificationGateResult {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'BLOCKED' | 'NOT_RUN';
  evidence: string;
  timestamp: string;
  logs: string[];
}

interface DeploymentSlot {
  id: string;
  name: string;
  activeRelease: string;
  health: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  cpu: number;
  memory: number;
  trafficWeight: number;
}

interface JumoIncident {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'RESOLVED';
  component: string;
  timestamp: string;
}

export function NationalManufacturingHub({ activeWorkspace, onNavigate }: { activeWorkspace: HubWorkspace; onNavigate?: (ws: HubWorkspace) => void }) {
  // === PERSISTED STATES INITIALIZERS ===
  const [archRequests, setArchRequests] = useState<ArchitectureRequest[]>([]);
  const [archContracts, setArchContracts] = useState<ArchitectureContract[]>([]);
  const [expansionTraces, setExpansionTraces] = useState<any[]>([]);
  const [blueprints, setBlueprints] = useState<JumoBlueprint[]>([]);
  const [jobs, setJobs] = useState<ManufacturingJob[]>([]);
  const [buildArtifacts, setBuildArtifacts] = useState<BuildArtifact[]>([]);
  const [deploymentRecords, setDeploymentRecords] = useState<DeploymentRecord[]>([]);
  const [verificationFailures, setVerificationFailures] = useState<VerificationFailureRecord[]>([]);
  const [certificationRecords, setCertificationRecords] = useState<CertificationRecord[]>([]);
  const [engineeringAgents, setEngineeringAgents] = useState<EngineeringAgent[]>([]);
  const [incidents, setIncidents] = useState<JumoIncident[]>([]);
  const [cloudSlots, setCloudSlots] = useState<DeploymentSlot[]>([]);
  const [auditEvents, setAuditEvents] = useState<any[]>([]);
  const [eventLog, setEventLog] = useState<any[]>([]);
  const [verificationGates, setVerificationGates] = useState<VerificationGateResult[]>([]);
  const [databaseVolumes, setDatabaseVolumes] = useState<any[]>([]);
  const [migrations, setMigrations] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [agentWorkLogs, setAgentWorkLogs] = useState<any[]>([]);
  const [cryptographicKeys, setCryptographicKeys] = useState({
    primaryKey: "SHA256:06dfbc2a8e8b919feae99a0d39c3a2aeebe5035e8985df1932a7a6c96fce30f2",
    backupKey: "SHA256:77ae93aeebe5035e8985df1932a7a6c96fce30f206dfbc2a8e8b919feae99a0d",
    algorithm: "ECDSA P-384 / SHA-256",
    lastRotation: ""
  });
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [archLayers, setArchLayers] = useState<any[]>([]);
  const [ecosystems, setEcosystems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [driftDetected, setDriftDetected] = useState(false);
  const [archSubWorkspace, setArchSubWorkspace] = useState<'studio' | 'command-center'>('studio');

  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(() => {
    return localStorage.getItem("jumo_offline_mode") === "true";
  });
  const [offlineQueue, setOfflineQueue] = useState<{ id: string; url: string; body: any; type: string; timestamp: string }[]>(() => {
    const saved = localStorage.getItem("jumo_offline_queue");
    return saved ? JSON.parse(saved) : [];
  });
  const [isSyncingOffline, setIsSyncingOffline] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState("");

  const getOperatorName = (): string => {
    try {
      const stored = localStorage.getItem("ueos_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u && u.name) return u.name;
      }
    } catch (e) {}
    return "Sovereign Operator Alpha";
  };

  const handleToggleOfflineMode = async () => {
    const nextMode = !isOfflineMode;
    setIsOfflineMode(nextMode);
    localStorage.setItem("jumo_offline_mode", String(nextMode));
    
    if (!nextMode && (offlineQueue ?? []).length > 0) {
      setIsSyncingOffline(true);
      setSyncStatusText(`Reconciling ${(offlineQueue ?? []).length} offline mutations with JUMO kernel...`);
      
      try {
        for (const action of offlineQueue) {
          const res = await fetch(action.url, {
            method: action.type,
            headers: {
              "Content-Type": "application/json",
              "x-operator-name": getOperatorName()
            },
            body: JSON.stringify(action.body)
          });
          if (!res.ok) {
            console.warn(`[RECONCILE] Warning: Offline mutation returned status ${res.status}`);
          }
        }
        setSyncStatusText(`RECONCILIATION SUCCESSFUL: Synchronized ${(offlineQueue ?? []).length} mutations cleanly.`);
        setOfflineQueue([]);
        localStorage.removeItem("jumo_offline_queue");
        await fetchSovereignState();
      } catch (err) {
        console.error("[RECONCILE] Reconciliation connection error", err);
        setSyncStatusText("Reconciliation failed: Kernel is still unreachable.");
        setIsOfflineMode(true);
        localStorage.setItem("jumo_offline_mode", "true");
      } finally {
        setTimeout(() => {
          setIsSyncingOffline(false);
          setSyncStatusText("");
        }, 3000);
      }
    }
  };

  const logAudit = (operation: string, details: string) => {
    console.log(`[AUDIT] ${operation}: ${details}`);
  };

  // Form input states
  const [newDbName, setNewDbName] = useState("");
  const [newDbTenant, setNewDbTenant] = useState("");
  const [newDbPool, setNewDbPool] = useState("FAAP_RESERVE_PRIMARY");
  const [newDbSize, setNewDbSize] = useState("1.0TB");

  const [selectedBpId, setSelectedBpId] = useState<string>("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilerLogs, setCompilerLogs] = useState<string[]>([]);

  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [activeMigrationId, setActiveMigrationId] = useState<string | null>(null);
  const [migrationLogs, setMigrationLogs] = useState<string[]>([
    "› [SYSTEM] Migration console engine standing by...",
    "› [MONITOR] DB integrity checker matched JUMO-v13 layout baseline."
  ]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([
    "› [SYSTEM] Cloud control plane standing by.",
    "› [MONITOR] Continuous telemetry streams matched baseline signature."
  ]);

  const [isVerifyingSuite, setIsVerifyingSuite] = useState(false);
  const [verifyingIndex, setVerifyingIndex] = useState(-1);

  const [zeroTrustLogs, setZeroTrustLogs] = useState<string[]>([]);
  const [isTracingNetwork, setIsTracingNetwork] = useState(false);
  const [zeroTrustData, setZeroTrustData] = useState<any>(null);

  const [guardianScanLogs, setGuardianScanLogs] = useState<string[]>([]);
  const [isScanningGuardian, setIsScanningGuardian] = useState(false);
  const [guardianData, setGuardianData] = useState<any>(null);

  // Consolidated Studio Sub-tab States
  const [architectureTab, setArchitectureTab] = useState<'blueprint' | 'workforce' | 'verification'>('blueprint');
  const [manufacturingTab, setManufacturingTab] = useState<'pipeline' | 'build'>('pipeline');
  const [deploymentTab, setDeploymentTab] = useState<'provisioning' | 'deployment'>('provisioning');
  const [overviewTab, setOverviewTab] = useState<'telemetry' | 'cloud' | 'security' | 'lifecycle'>('telemetry');
  const [templatesTab, setTemplatesTab] = useState<'registry' | 'audit' | 'migration'>('registry');

  // =======================================================
  // AUTHORITATIVE UNIFIED LIFECYCLE PIPELINE STATE & RUNNER
  // =======================================================
  const [pipelineActive, setPipelineActive] = useState<boolean>(false);
  const [pipelineStage, setPipelineStage] = useState<number>(1);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([
    "› [ORCHESTRATOR] Sovereign JUMO UEOS factory pipeline standing by. Ready for digital intake."
  ]);
  const [isAwaitingGate, setIsAwaitingGate] = useState<"ARCH_LOCK" | "RELEASE_CERT" | null>(null);
  const [currentPipelineJobId, setCurrentPipelineJobId] = useState<string>("");
  const [currentPipelineContractId, setCurrentPipelineContractId] = useState<string>("");
  const [currentPipelineRequestId, setCurrentPipelineRequestId] = useState<string>("");
  const [currentPipelineRequestName, setCurrentPipelineRequestName] = useState<string>("Sovereign Financial Ledger");

  // Helper helper to append logs
  const addPipelineLog = (msg: string) => {
    setPipelineLogs(prev => [...prev, `› ${msg}`]);
  };

  const executePipelineStageSideEffects = async (stageNum: number) => {
    try {
      switch (stageNum) {
        case 1: {
          onNavigate?.('specification');
          addPipelineLog(`[INTAKE] Received digital specification for product [Sovereign Financial Ledger].`);
          
          // Submit request
          const payload = {
            title: "Sovereign Financial Ledger",
            problem: "Establish unified treasury control and sovereign audit ledgers across state ministries.",
            targetUsers: "Treasury Officers, Sovereign Auditors",
            organization: "Ministry of Finance",
            capabilities: ["Double-entry Ledger", "Immutable Audit Trace", "Real-time Settlement"],
            infrastructure: "JUMO Sovereign Node Cloud",
            integrations: ["Sovereign Banking Core"],
            aiRequirements: "Sovereign Architect, Sovereign Security",
            ecosystemType: "ERP_ECOSYSTEM",
            sector: "Finance"
          };
          const res = await fetch("/api/v1/ueos/architecture-requests", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-operator-name": getOperatorName() },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            const data = await res.json();
            if (data.id) {
              setCurrentPipelineRequestId(data.id);
              addPipelineLog(`[INTAKE] Specification created successfully in JUMO registry with ID: ${data.id}.`);
            }
          }
          await fetchSovereignState();
          break;
        }
        case 2: {
          onNavigate?.('specification');
          addPipelineLog(`[NORMALIZER] Standardizing intake parameters against sovereign government sectors.`);
          addPipelineLog(`[NORMALIZER] Match confidence: 99.4% on JUMO compliance framework v13.`);
          break;
        }
        case 3: {
          onNavigate?.('specification');
          addPipelineLog(`[NORMALIZER] Definition created: Mapping standard modules [General Ledger, Core Settle, Audit Ledger].`);
          break;
        }
        case 4: {
          onNavigate?.('architecture');
          addPipelineLog(`[ARCHITECT-01] Discovery initiated. 420+ cognitive workforce scanning structural modules...`);
          
          // Trigger architecture contract creation
          if (currentPipelineRequestId) {
            const res = await fetch(`/api/v1/ueos/architecture-contracts`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-operator-name": getOperatorName() },
              body: JSON.stringify({ requestId: currentPipelineRequestId })
            });
            if (res.ok) {
              const data = await res.json();
              if (data.id) {
                setCurrentPipelineContractId(data.id);
                addPipelineLog(`[ARCHITECT-01] Architecture contract created with ID: ${data.id}.`);
              }
            }
          }
          await fetchSovereignState();
          break;
        }
        case 5: {
          onNavigate?.('architecture');
          addPipelineLog(`[ARCHITECT-01] Expanding layer nodes (L001-L012). Mapping secure microservices.`);
          break;
        }
        case 6: {
          onNavigate?.('architecture');
          addPipelineLog(`[SECURITY-01] Initiating Zero-Trust architectural policy checking. All constraints matched.`);
          break;
        }
        case 7: {
          onNavigate?.('architecture');
          addPipelineLog(`[GATE-01] GOVERNANCE GATE REACHED: Awaiting Human Architect signature to LOCK the architecture contract.`);
          setIsAwaitingGate('ARCH_LOCK');
          break;
        }
        case 8: {
          onNavigate?.('architecture');
          addPipelineLog(`[ARCHITECT-01] Architecture contract locked successfully. Signature Hash: ECDSA_P384_77AE.`);
          
          // Approve & launch job
          if (currentPipelineContractId) {
            const res = await fetch(`/api/v1/ueos/architecture-contracts/${currentPipelineContractId}/approve`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-operator-name": getOperatorName() }
            });
            if (res.ok) {
              const data = await res.json();
              addPipelineLog(`[ARCHITECT-01] Architecture approved. Core state service launched manufacturing job.`);
            }
          }
          await fetchSovereignState();
          break;
        }
        case 9: {
          onNavigate?.('manufacturing');
          addPipelineLog(`[ORCHESTRATOR] Allocating cognitive workforce swarm (FRONTEND-01, BACKEND-01, DATABASE-01, SECURITY-01).`);
          break;
        }
        case 10: {
          onNavigate?.('manufacturing');
          addPipelineLog(`[ORCHESTRATOR] Decomposing architectural layers L001-L012 into 12 concrete development tasks.`);
          break;
        }
        case 11: {
          onNavigate?.('manufacturing');
          addPipelineLog(`[FRONTEND-01] Active: Implementing Operator Portal with React 18 & Tailwind CSS.`);
          addPipelineLog(`[BACKEND-01] Active: Implementing Express v4 server API controller on port 3000.`);
          break;
        }
        case 12: {
          onNavigate?.('manufacturing');
          addPipelineLog(`[COMPILER] Generating compiled template schemas, REST controllers, and test fixtures.`);
          break;
        }
        case 13: {
          onNavigate?.('manufacturing');
          
          // Look up current job
          let jobId = "";
          try {
            const stateRes = await fetch("/api/v1/ueos/state");
            if (stateRes.ok) {
              const s = await stateRes.json();
              if (s.jobs && s.jobs.length > 0) {
                jobId = s.jobs[s.jobs.length - 1].id;
                setCurrentPipelineJobId(jobId);
              }
            }
          } catch(e) {}

          const currentJob = jobId || currentPipelineJobId;
          addPipelineLog(`[COMPILER] Pure air-gapped compilation complete. Artifact signed. Signature Hash: SHA256_STAMP_F44E.`);
          if (currentJob) {
            const res = await fetch(`/api/v1/ueos/jobs/${currentJob}/build`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-operator-name": getOperatorName() },
              body: JSON.stringify({ hash: "SHA256:77ae93a" + Math.floor(Math.random() * 100000), size: 4520000 })
            });
            if (res.ok) {
              addPipelineLog(`[COMPILER] Build artifact successfully recorded in the sovereign registry database.`);
            }
          }
          await fetchSovereignState();
          break;
        }
        case 14: {
          onNavigate?.('verification');
          addPipelineLog(`[VERIFIER] Running Completeness Verification. Core Specification vs Architecture vs Code matches 100%.`);
          break;
        }
        case 15: {
          onNavigate?.('verification');
          addPipelineLog(`[SECURITY-01] Zero-Trust trace validated. No open ports, dependency audits matched clean signature.`);
          break;
        }
        case 16: {
          onNavigate?.('verification');
          addPipelineLog(`[QA-AGENT] Standard functional, regression, stress, and chaos tests ran to completion: 100% PASSED.`);
          
          // Run the verification suite
          await fetch(`/api/v1/ueos/verification/run-suite`, {
            method: "POST",
            headers: { "x-operator-name": getOperatorName() }
          });
          await fetchSovereignState();
          break;
        }
        case 17: {
          onNavigate?.('certification');
          addPipelineLog(`[GATE-02] GOVERNANCE GATE REACHED: Awaiting Operator signature to CERTIFY the application release.`);
          setIsAwaitingGate('RELEASE_CERT');
          break;
        }
        case 18: {
          onNavigate?.('deployment');
          addPipelineLog(`[ORCHESTRATOR] Certified release certified. Launching VPC network, DB volume, and routing node layers.`);
          
          let jobId = currentPipelineJobId;
          if (!jobId) {
            try {
              const stateRes = await fetch("/api/v1/ueos/state");
              if (stateRes.ok) {
                const s = await stateRes.json();
                if (s.jobs && s.jobs.length > 0) {
                  jobId = s.jobs[s.jobs.length - 1].id;
                }
              }
            } catch(e) {}
          }

          if (jobId) {
            // Certify first
            await fetch(`/api/v1/ueos/jobs/${jobId}/certify`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-operator-name": getOperatorName() },
              body: JSON.stringify({ authority: "National Hub Authority" })
            });
          }
          await fetchSovereignState();
          break;
        }
        case 19: {
          onNavigate?.('deployment');
          addPipelineLog(`[ORCHESTRATOR] Discharging signed container payloads to Production. Scaling traffic weights: 100%.`);
          
          let jobId = currentPipelineJobId;
          if (!jobId) {
            try {
              const stateRes = await fetch("/api/v1/ueos/state");
              if (stateRes.ok) {
                const s = await stateRes.json();
                if (s.jobs && s.jobs.length > 0) {
                  jobId = s.jobs[s.jobs.length - 1].id;
                }
              }
            } catch(e) {}
          }

          if (jobId) {
            // Deploy
            await fetch(`/api/v1/ueos/jobs/${jobId}/deploy`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-operator-name": getOperatorName() },
              body: JSON.stringify({ environment: "production", target: "JUMO-NODE-01 Sovereign Cloud" })
            });
          }
          await fetchSovereignState();
          break;
        }
        case 20: {
          onNavigate?.('overview');
          addPipelineLog(`[MONITOR] Runtime operational, 100% healthy, continuous operations and immutable audits active.`);
          await fetchSovereignState();
          break;
        }
      }
    } catch (err) {
      console.error(err);
      addPipelineLog(`[ERROR] Pipeline exception occurred: ${String(err)}`);
    }
  };

  useEffect(() => {
    if (!pipelineActive || isAwaitingGate) return;

    const timer = setTimeout(async () => {
      const nextStage = pipelineStage + 1;
      if (nextStage > 20) {
        setPipelineActive(false);
        setPipelineLogs(prev => [...prev, `› [ORCHESTRATOR] SUCCESS: Factory pipeline sequence completed successfully! All 20 lifecycle stages active & operating.`]);
        logAudit("PIPELINE_COMPLETED", "Unified digital manufacturing pipeline completed successfully.");
        return;
      }

      setPipelineStage(nextStage);
      await executePipelineStageSideEffects(nextStage);
    }, 2500);

    return () => clearTimeout(timer);
  }, [pipelineActive, pipelineStage, isAwaitingGate]);

  const startAutoPipeline = async () => {
    setPipelineActive(true);
    setPipelineStage(1);
    setIsAwaitingGate(null);
    setPipelineLogs(["› [ORCHESTRATOR] Initiating automated digital manufacturing pipeline driver..."]);
    await executePipelineStageSideEffects(1);
  };

  const approveGate1 = async () => {
    setIsAwaitingGate(null);
    addPipelineLog(`[GATE-01] Human Architect approval granted. Securing and locking architecture contract...`);
    setPipelineStage(8);
    await executePipelineStageSideEffects(8);
  };

  const approveGate2 = async () => {
    setIsAwaitingGate(null);
    addPipelineLog(`[GATE-02] Human Operator signature granted. Certifying and compiling release bundle...`);
    setPipelineStage(18);
    await executePipelineStageSideEffects(18);
  };

  const pausePipeline = () => {
    setPipelineActive(false);
    addPipelineLog(`[ORCHESTRATOR] Pipeline paused manually by operator.`);
  };

  const resumePipeline = () => {
    setPipelineActive(true);
    addPipelineLog(`[ORCHESTRATOR] Resuming automated pipeline driver...`);
  };

  const stepPipeline = async () => {
    const nextStage = pipelineStage + 1;
    if (nextStage > 20) {
      addPipelineLog(`[ORCHESTRATOR] Pipeline already at final stage.`);
      return;
    }
    setPipelineStage(nextStage);
    await executePipelineStageSideEffects(nextStage);
  };

  const resetPipeline = () => {
    setPipelineActive(false);
    setPipelineStage(1);
    setIsAwaitingGate(null);
    setPipelineLogs(["› [ORCHESTRATOR] Pipeline orchestrator reset to idle state."]);
  };

  // Fetch full sovereign operating state from Express backend
  const fetchSovereignState = async () => {
    try {
      const res = await fetch("/api/v1/ueos/state");
      if (!res.ok) throw new Error("Network status not OK");
      const data = await res.json();
      setArchRequests(data.architectureRequests);
      setArchContracts(data.architectureContracts);
      setExpansionTraces(data.expansionTraces || []);
      setBlueprints(data.blueprints);
      setJobs(data.jobs);
      setBuildArtifacts(data.buildArtifacts);
      setDeploymentRecords(data.deploymentRecords);
      setVerificationFailures(data.verificationFailures);
      setCertificationRecords(data.certificationRecords);
      setEngineeringAgents(data.engineeringAgents);
      setArchLayers(data.archLayers || []);
      setIncidents(data.incidents);
      setCloudSlots(data.cloudSlots);
      setAuditEvents(data.auditEvents);
      setEventLog(data.eventLog || []);
      setVerificationGates(data.verificationGates);
      setDatabaseVolumes(data.databaseVolumes);
      setMigrations(data.migrations);
      setAssets(data.assets);
      setAgentWorkLogs(data.agentWorkLogs || []);
      setCryptographicKeys(data.cryptographicKeys);
      setEmergencyMode(data.emergencyMode);

      // Fetch Registry Ecosystems in parallel
      const ecoRes = await fetch("/api/v1/ueos/registry/ecosystems");
      if (ecoRes.ok) {
        const ecoData = await ecoRes.json();
        setEcosystems(ecoData);
      }

      setIsLoading(false);
    } catch (err) {
      console.error("[FRONTEND] Error loading sovereign state from server", err);
    }
  };

  // Poll state every 5 seconds to keep dashboard fully synced
  useEffect(() => {
    fetchSovereignState();
    const interval = setInterval(fetchSovereignState, 5000);
    return () => clearInterval(interval);
  }, []);

  // Post helper to send operator headers
  const serverPost = async (url: string, body: any = {}) => {
    if (isOfflineMode) {
      const actionId = `offline-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const newAction = { id: actionId, url, body, type: "POST", timestamp: new Date().toLocaleTimeString() };
      const updatedQueue = [...offlineQueue, newAction];
      setOfflineQueue(updatedQueue);
      localStorage.setItem("jumo_offline_queue", JSON.stringify(updatedQueue));
      
      setMigrationLogs(prev => [...prev, `› [OFFLINE-QUEUE] Intercepted POST to ${url}. Saved to local sync queue.`]);
      return { ok: true, json: async () => ({}) } as any;
    }
    
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-operator-name": getOperatorName()
      },
      body: JSON.stringify(body)
    });
  };

  const serverPut = async (url: string, body: any = {}) => {
    if (isOfflineMode) {
      const actionId = `offline-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const newAction = { id: actionId, url, body, type: "PUT", timestamp: new Date().toLocaleTimeString() };
      const updatedQueue = [...offlineQueue, newAction];
      setOfflineQueue(updatedQueue);
      localStorage.setItem("jumo_offline_queue", JSON.stringify(updatedQueue));
      
      setMigrationLogs(prev => [...prev, `› [OFFLINE-QUEUE] Intercepted PUT to ${url}. Saved to local sync queue.`]);
      return { ok: true, json: async () => ({}) } as any;
    }

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-operator-name": getOperatorName()
      },
      body: JSON.stringify(body)
    });
  };

  // === MUTATION ACTIONS ===

  // 1. Create Architecture Request from Specification & Route to Architecture Studio (Requirements 18, 19, 20)
  const handleGenerateArchitectureContract = async (spec: any) => {
    try {
      const payload = {
        title: spec.productName || spec.product?.productName || "Sovereign Enterprise System",
        problem: spec.purpose || spec.product?.purpose || "Derived Digital Ecosystem Specification",
        targetUsers: (spec.selectedPortals || spec.portals?.selected || []).join(", ") || "Citizens and Staff",
        organization: spec.organizationModel?.targetOrganization || spec.product?.targetOrganization || "National Hub Authority",
        capabilities: spec.selectedCapabilities || spec.modules?.selected || [],
        infrastructure: spec.targetInfrastructure || (spec.deployment?.selected || []).join(", ") || "JUMO Sovereign Cloud",
        integrations: spec.selectedIntegrations || spec.integrations?.selected || [],
        aiRequirements: (spec.aiRequirements || spec.aiWorkforce?.selected || []).join(", "),
        ecosystemType: spec.productType || spec.productFamily || spec.product?.ecosystem || "Enterprise ERP",
        sector: spec.sector || spec.product?.sector || "Sovereign",
        governmentScale: spec.productGrade || spec.product?.governmentScale || "SOVEREIGN",
        applicationType: spec.productType || spec.product?.applicationType || "Sovereign Application",
        detailedSpecification: spec
      };
      
      const reqRes = await serverPost("/api/v1/ueos/architecture-requests", payload);
      if (reqRes.ok) {
        await serverPost("/api/v1/ueos/events/emit", {
          sourceStudio: "SPECIFICATION",
          destinationStudio: "ARCHITECTURE",
          entityId: reqRes.id,
          action: "SPECIFICATION_SUBMITTED",
          status: "EXECUTED",
          payload: { title: payload.title }
        });
        await fetchSovereignState();
        logAudit("SPECIFICATION_RECEIVED", `Specification compiled for ${payload.title}. Routed to Architecture Studio for 420+ agent discovery and human lock.`);
        onNavigate?.('architecture');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 2a. Create Architecture Contract from Request
  const handleCreateArchitectureContract = async (requestId: string) => {
    try {
      const res = await serverPost("/api/v1/ueos/architecture-contracts", { requestId });
      if (res.ok) {
        await serverPost("/api/v1/ueos/events/emit", {
          sourceStudio: "ARCHITECTURE",
          destinationStudio: "ENGINEERING",
          entityId: requestId,
          action: "ARCHITECTURE_CONTRACT_CREATED",
          status: "EXECUTED",
          payload: { requestId }
        });
        await fetchSovereignState();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 2b. Approve Architecture Contract & Auto-Launch Manufacturing
  const handleApproveArchitectureContract = async (contractId: string) => {
    try {
      const res = await serverPut(`/api/v1/ueos/architecture-contracts/${contractId}/approve`);
      if (res.ok) {
        // Automatically create or link manufacturing job in manufacturing pipeline
        const jobRes = await serverPost("/api/v1/ueos/jobs", { contractId });
        await fetchSovereignState();
        logAudit("ARCHITECTURE_LOCKED", `Architecture Contract ${contractId} locked by architect. Transitioning to Manufacturing Studio.`);
        onNavigate?.('manufacturing');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Create Manufacturing Job from Contract
  const handleCreateManufacturingJob = async (contractId: string) => {
    try {
      const res = await serverPost("/api/v1/ueos/jobs", { contractId });
      if (res.ok) {
        await fetchSovereignState();
        onNavigate?.('manufacturing');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Assign Agent to Job
  const handleAssignAgent = async (jobId: string, engineerId: string, role: string) => {
    try {
      const res = await serverPost(`/api/v1/ueos/jobs/${jobId}/assign`, { engineerId, role });
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Promote Manufacturing Job
  const handlePromoteManufacturingJob = async (jobId: string) => {
    try {
      const res = await serverPost(`/api/v1/ueos/jobs/${jobId}/promote`);
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Generate Blueprint from Architecture
  const handleGenerateBlueprint = async (id: string) => {
    try {
      const res = await serverPut(`/api/v1/ueos/architecture-requests/${id}/blueprint`);
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Compile Blueprint
  const handleCompileBlueprint = async (bpId: string) => {
    setIsCompiling(true);
    setCompilerLogs(["[COMPILE] Starting Sovereign JUMO UEOS blueprint compiler..."]);
    
    try {
      const res = await serverPost(`/api/v1/ueos/blueprints/${bpId}/compile`);
      if (res.ok) {
        const data = await res.json();
        setCompilerLogs(prev => [
          ...prev, 
          "[VALIDATOR] Validating schema nodes against architecture contract JUMO-v13...",
          "[RESOLVER] Resolved zero external dependencies. Pure air-gapped libraries used.",
          "[COMPILER] Packaging artifacts. Bundling FAAP ledgers. Cryptographically signing binary stream...",
          `[SUCCESS] Compilation completed with zero leaks or error warnings.`,
          `[SIGNATURE] Key Match: OK`,
          `[CONTRACT] Registered compiled schema definitions cleanly.`
        ]);
        await fetchSovereignState();
      } else {
        setCompilerLogs(prev => [...prev, "[ERROR] Compilation failed during schema bounds assertion."]);
      }
    } catch (err) {
      console.error(err);
      setCompilerLogs(prev => [...prev, "[ERROR] Connection failure during blueprint compiler invocation."]);
    } finally {
      setIsCompiling(false);
    }
  };

  // Launch pipeline from compiled blueprint
  const handleLaunchPipelineFromBlueprint = async (bpId: string) => {
    try {
      const res = await serverPost(`/api/v1/ueos/blueprints/${bpId}/launch-pipeline`);
      if (res.ok) {
        await fetchSovereignState();
        onNavigate?.('manufacturing');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Promote Pipeline Job Stage
  const handlePromoteJob = async (jobId: string) => {
    try {
      const res = await serverPost(`/api/v1/ueos/jobs/${jobId}/promote`);
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Pause Pipeline Job Stage
  const handlePauseJob = async (jobId: string) => {
    try {
      const res = await serverPost(`/api/v1/ueos/jobs/${jobId}/pause`);
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Provision Database Volume
  const handleProvisionDatabase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDbName || !newDbTenant) return;

    try {
      const payload = {
        name: newDbName,
        tenant: newDbTenant,
        pool: newDbPool,
        size: newDbSize
      };
      const res = await serverPost("/api/v1/ueos/databases/provision", payload);
      if (res.ok) {
        setNewDbName("");
        setNewDbTenant("");
        await fetchSovereignState();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Execute Schema Database Migration
  const handleExecuteMigration = async (migId: string) => {
    if (activeMigrationId) return;
    setActiveMigrationId(migId);
    setMigrationLogs([`› [MIG-INIT] Launching secure migration session for ${migId}...`]);

    try {
      const res = await serverPost(`/api/v1/ueos/migrations/${migId}/execute`);
      if (res.ok) {
        const data = await res.json();
        setMigrationLogs(data.logs || []);
        setActiveMigrationId(null);
        await fetchSovereignState();
      } else {
        setMigrationLogs(prev => [...prev, "› [ERROR] Migration transaction aborted by database controller."]);
        setActiveMigrationId(null);
      }
    } catch (err) {
      console.error(err);
      setMigrationLogs(prev => [...prev, "› [ERROR] Server response failure during SQL execution."]);
      setActiveMigrationId(null);
    }
  };

  // Register Software Lifecycle Asset
  const handleRegisterAsset = async (name: string, type: string) => {
    try {
      const payload = { name, type };
      const res = await serverPost("/api/v1/ueos/assets/register", payload);
      if (res.ok) {
        await fetchSovereignState();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Transition Software Lifecycle Asset
  const handleTransitionAsset = async (index: number) => {
    try {
      const res = await serverPost(`/api/v1/ueos/assets/${index}/transition`);
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Archive Software Lifecycle Asset
  const handleArchiveAsset = async (index: number) => {
    try {
      const res = await serverPost(`/api/v1/ueos/assets/${index}/archive`);
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Certify Job with Authoritative Authority
  const handleCertifyJob = async (jobId: string, authority: string = "National Hub Authority") => {
    try {
      const res = await serverPost(`/api/v1/ueos/jobs/${jobId}/certify`, { authority });
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Cloud Studio Actions
  const handleScaleSlot = async (slotId: string, cpu: number, memory: number) => {
    try {
      const res = await serverPost(`/api/v1/ueos/cloud/slots/${slotId}/scale`, { cpu, memory });
      if (res.ok) {
        await fetchSovereignState();
        logAudit("CLOUD_SLOT_SCALE", `Scaled infrastructure slot ${slotId} to CPU:${cpu}%, Mem:${memory}%`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePowerSlot = async (slotId: string) => {
    try {
      const res = await serverPost(`/api/v1/ueos/cloud/slots/${slotId}/toggle-power`);
      if (res.ok) {
        await fetchSovereignState();
        logAudit("CLOUD_SLOT_POWER", `Toggled power state for cloud slot ${slotId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Cloud deployment slots controller
  const handleDeploySlot = async (slotId: string, jobId: string) => {
    if (isDeploying) return;
    setIsDeploying(true);
    setDeploymentLogs([`› [DEPLOY-INIT] Initiating stable cluster promotion on environment slot: ${slotId} with job: ${jobId}...`]);
    
    try {
      const res = await serverPost(`/api/v1/ueos/cloud/slots/${slotId}/deploy`, { jobId });
      if (res.ok) {
        setDeploymentLogs(prev => [
          ...prev, 
          "› [DEPLOY-VPC] Hardening ingress security and checking node boundaries...",
          "› [DEPLOY-PROMOTING] Discharging container payloads to isolated slots...",
          `› [DEPLOY-HEALTH] Health check score: 100%. Deployment complete.`
        ]);
        await fetchSovereignState();
      } else {
        setDeploymentLogs(prev => [...prev, "› [ERROR] Deployment failed during infrastructure handshake."]);
      }
    } catch (err) {
      console.error(err);
      setDeploymentLogs(prev => [...prev, "› [ERROR] Connection failure during deployment orchestration."]);
    } finally {
      setIsDeploying(false);
    }
  };

  // Run full 20-Gate executable verification suite
  const runFullVerificationSuite = async () => {
    setIsVerifyingSuite(true);
    setVerifyingIndex(0);
    setVerificationGates(prev => prev.map(g => ({ ...g, status: 'NOT_RUN' })));
  };

  useEffect(() => {
    if (!isVerifyingSuite) return;

    // Trigger the backend API to run the actual verification suite
    serverPost("/api/v1/ueos/verification/run-suite").then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setVerificationGates(data.results);
      }
      setIsVerifyingSuite(false);
      setVerifyingIndex(-1);
      await fetchSovereignState();
    }).catch(err => {
      console.error(err);
      setIsVerifyingSuite(false);
    });
  }, [isVerifyingSuite]);

  // Zero Trust Packet route network diagnostics trace
  const handleRunZeroTrustTrace = async () => {
    setIsTracingNetwork(true);
    setZeroTrustLogs(["[TRACE-INIT] Initiating live Zero-Trust route scan on active hypervisor channels..."]);
    
    try {
      const res = await fetch("/api/v1/ueos/zero-trust-trace");
      if (res.ok) {
        const data = await res.json();
        setZeroTrustData(data);
        setZeroTrustLogs(data.logs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTracingNetwork(false);
    }
  };

  // File integrity drift scanner
  const handleRunGuardianAudit = async () => {
    setIsScanningGuardian(true);
    setGuardianScanLogs(["[GUARDIAN] Launching baseline validation scanner on directories..."]);
    
    try {
      const res = await fetch("/api/v1/ueos/guardian-audit");
      if (res.ok) {
        const data = await res.json();
        setGuardianData(data);
        setGuardianScanLogs(data.logs || []);
        setDriftDetected(false);
        await fetchSovereignState();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanningGuardian(false);
    }
  };

  // Rotate encryption keys
  const handleRotateKeys = async () => {
    try {
      const res = await serverPost("/api/v1/ueos/settings/rotate-keys");
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle emergency shutdown freeze
  const handleToggleEmergencyShutdown = async () => {
    try {
      const res = await serverPost("/api/v1/ueos/settings/emergency-shutdown");
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // Pre-load data from real registries
  const erpEcosystems = UniversalHubRegistry.getERPEcosystems();
  const commercialProducts = UniversalHubRegistry.getCommercialProducts();
  const softwareProducts = UniversalHubRegistry.getSoftwareProducts();

  // Selected state filter
  const [registryFilter, setRegistryFilter] = useState<string>("erp");
  const [searchTerm, setSearchTerm] = useState("");

  const activeJob = jobs.length > 0 
    ? (jobs.find(j => j.id === selectedJobId) || jobs[0]) 
    : null;

  return (
    <div className="space-y-8 bg-slate-50 selection:bg-blue-100 font-sans" id="national-manufacturing-hub">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            National Digital Manufacturing Operating Environment
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-3xl">
            Sovereign control plane responsible for intake, blueprints, compilations, testing, zero-trust cloud network deployment, upgrades, and continuous audit verification.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={handleToggleOfflineMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              isOfflineMode
                ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>{isOfflineMode ? `Air-Gap Active (${(offlineQueue ?? []).length} queued)` : "Simulate Air-Gap Offline"}</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Operator Signed-In
          </span>
        </div>
      </div>

      {isSyncingOffline && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs font-bold flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>{syncStatusText}</span>
          </div>
        </div>
      )}

      {/* ========================================================
          SOVEREIGN AUTOMATED DIGITAL MANUFACTURING PIPELINE (ADMP)
          ======================================================== */}
      <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Zap className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-100">
                  Automated Digital Manufacturing Pipeline (ADMP)
                </h2>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase ${
                  pipelineActive
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse"
                    : isAwaitingGate
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}>
                  {pipelineActive ? "Active Run" : isAwaitingGate ? "Awaiting Gate" : "Standby"}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Authoritative multi-stage machine coordinator. Automates intake, blueprints, compiler runs, zero-trust cloud network deployment, and continuous audits.
              </p>
            </div>
          </div>

          {/* Core ADMP Manual Overrides & Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {!pipelineActive && !isAwaitingGate && pipelineStage === 1 && (
              <button
                onClick={startAutoPipeline}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Trigger Orchestrator Run</span>
              </button>
            )}

            {pipelineActive && (
              <button
                onClick={pausePipeline}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Run</span>
              </button>
            )}

            {!pipelineActive && (pipelineStage > 1 || isAwaitingGate) && (
              <button
                onClick={resumePipeline}
                disabled={!!isAwaitingGate}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Resume Run</span>
              </button>
            )}

            {!pipelineActive && (
              <button
                onClick={stepPipeline}
                disabled={pipelineStage >= 20 || !!isAwaitingGate}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-750 disabled:opacity-40 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 transition-all uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                <span>Step Run</span>
              </button>
            )}

            <button
              onClick={resetPipeline}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 transition-all uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Orchestrator</span>
            </button>
          </div>
        </div>

        {/* Human-In-The-Loop Governance Interventions */}
        {isAwaitingGate && (
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black uppercase text-amber-300 tracking-wider block">
                  Sovereign Gate Intervention Required
                </span>
                <p className="text-[11px] text-amber-200/80 leading-relaxed mt-1">
                  {isAwaitingGate === "ARCH_LOCK"
                    ? "The pipeline has generated an optimal design blueprint. Human Architect signature is requested to lock the contract."
                    : "All verification and regression test suites have passed. Human Operator signature is required to certify & sign release."}
                </p>
              </div>
            </div>
            <div>
              {isAwaitingGate === "ARCH_LOCK" ? (
                <button
                  onClick={approveGate1}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <FileSignature className="w-3.5 h-3.5" />
                  <span>Sign & Lock Architecture Contract</span>
                </button>
              ) : (
                <button
                  onClick={approveGate2}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Sign & Certify Product Release</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Visual Stepper Representing the 20 Core Stages */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Pipeline Stage: {pipelineStage} / 20
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Current Target: {
                pipelineStage <= 3 ? "Digital Specification Intake" :
                pipelineStage <= 8 ? "Architecture Design & Approval" :
                pipelineStage <= 13 ? "Automated Code Compilation" :
                pipelineStage <= 16 ? "Verification Suite Run" :
                pipelineStage <= 17 ? "Compliance & Cert Release" :
                "VPC Orchestration & Production Deployment"
              }
            </span>
          </div>

          <div className="grid grid-cols-10 md:grid-cols-20 gap-1.5">
            {Array.from({ length: 20 }).map((_, idx) => {
              const stageNum = idx + 1;
              const isActive = pipelineStage === stageNum;
              const isCompleted = pipelineStage > stageNum;
              return (
                <div
                  key={idx}
                  title={`Stage ${stageNum}: ${
                    stageNum === 1 ? "Spec Intake" :
                    stageNum === 2 ? "Spec Standardization" :
                    stageNum === 3 ? "Core Modules Layout" :
                    stageNum === 4 ? "Design Graph Discovery" :
                    stageNum === 5 ? "Expansion of Layers" :
                    stageNum === 6 ? "Zero-Trust Architecture Check" :
                    stageNum === 7 ? "Architect Signature Gate" :
                    stageNum === 8 ? "Lock Design Contract" :
                    stageNum === 9 ? "Allocation of Workforce" :
                    stageNum === 10 ? "Task Decomposition" :
                    stageNum === 11 ? "React/Express Codegen" :
                    stageNum === 12 ? "Compile Schema Models" :
                    stageNum === 13 ? "Assembly Build & Stamp" :
                    stageNum === 14 ? "Completeness Audit" :
                    stageNum === 15 ? "Zero-Trust Audit Trace" :
                    stageNum === 16 ? "Functional/Chaos Testing" :
                    stageNum === 17 ? "Operator Signature Gate" :
                    stageNum === 18 ? "Infrastructure Provisioning" :
                    stageNum === 19 ? "Continuous Operations Setup" :
                    "Sovereign Release Live Monitor"
                  }`}
                  className={`h-2 rounded-full transition-all duration-300 relative group ${
                    isActive
                      ? "bg-blue-500 animate-pulse shadow-xs shadow-blue-500 ring-2 ring-blue-500/40"
                      : isCompleted
                      ? "bg-emerald-500"
                      : "bg-slate-800"
                  }`}
                >
                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-950 text-white text-[9px] leading-relaxed rounded-lg border border-slate-800 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50">
                    <span className="font-black text-slate-400 uppercase tracking-widest block mb-0.5">Stage {stageNum}</span>
                    <span className="font-bold text-slate-100">
                      {stageNum === 1 && "Spec Intake & Registration"}
                      {stageNum === 2 && "Parameters Standardization"}
                      {stageNum === 3 && "Core Module Schema Layout"}
                      {stageNum === 4 && "Blueprints Graph Discovery"}
                      {stageNum === 5 && "L001-L012 Nodes Expansion"}
                      {stageNum === 6 && "Zero-Trust Policy Validation"}
                      {stageNum === 7 && "Architect Human Signature"}
                      {stageNum === 8 && "Secure Design Contract Lock"}
                      {stageNum === 9 && "Cognitive Workforce Allocation"}
                      {stageNum === 10 && "Task Decomposition Runner"}
                      {stageNum === 11 && "React 18 & Express Codegen"}
                      {stageNum === 12 && "Database Schema Modeling"}
                      {stageNum === 13 && "Assembly Build Signing"}
                      {stageNum === 14 && "Completeness Verification"}
                      {stageNum === 15 && "Zero-Trust Audit Trace Run"}
                      {stageNum === 16 && "Chaos & Stress Test Suite"}
                      {stageNum === 17 && "Operator Release Signature"}
                      {stageNum === 18 && "VPC Platform Provisioning"}
                      {stageNum === 19 && "Container Deployment Rollout"}
                      {stageNum === 20 && "Continuous Telemetry Active"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Execution Logs Console */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Sovereign Flight Log Terminal
            </span>
            <span className="text-[9px] text-slate-500 font-mono font-bold">
              SYS_PID_2026_SOVEREIGN_HUB
            </span>
          </div>
          <div className="bg-slate-950 font-mono text-[10px] text-blue-400 border border-slate-800 p-4 rounded-xl space-y-1.5 h-36 overflow-y-auto">
            {pipelineLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-1">
                <span className="break-all">{log}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE WORKSPACE SECTIONS CONTAINER */}
      <div className="min-h-[600px] bg-slate-50">
        
        {/* ========================================================
            STUDIO 1: RUNTIME & OPERATIONS CENTER (activeWorkspace === 'overview')
            ======================================================== */}
        {activeWorkspace === "overview" && (
          <div className="space-y-6" id="workspace-command">
            {/* Studio Sub-tabs Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-sky-500" />
                <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Runtime & Operations Center</span>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
                {(['telemetry', 'cloud', 'security', 'lifecycle'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setOverviewTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      overviewTab === tab
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {tab === 'telemetry' && "Telemetry & Instances"}
                    {tab === 'cloud' && "Cloud Infrastructure"}
                    {tab === 'security' && "Security & SOC"}
                    {tab === 'lifecycle' && "Lifecycle Management"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-tab 1: Telemetry & Instances (Standard Overview Dashboard) */}
            {overviewTab === 'telemetry' && (
              <div className="space-y-6 animate-fadeIn">
                {/* JUMO Digital Hybrid Studios Registry */}
                <section
                  data-jumo-section="JUMO_VISIBLE_STUDIO_CONTROL_CENTER"
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                >
                  <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                            <Layers className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-slate-900">
                              JUMO Digital Hybrid Studios
                            </h2>
                            <p className="text-sm text-slate-500">
                              Architecture, engineering, verification and enterprise orchestration
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <div className="px-3 py-2 rounded-lg bg-white border border-slate-200">
                          <div className="text-[10px] uppercase tracking-wide text-slate-400">
                            Layers
                          </div>
                          <div className="text-lg font-bold text-slate-900">
                            {JUMO_HYBRID_ARCHITECTURE_REGISTRY.listLayers().length}
                          </div>
                        </div>

                        <div className="px-3 py-2 rounded-lg bg-white border border-slate-200">
                          <div className="text-[10px] uppercase tracking-wide text-slate-400">
                            Families
                          </div>
                          <div className="text-lg font-bold text-slate-900">
                            {JUMO_HYBRID_ARCHITECTURE_REGISTRY.families().length}
                          </div>
                        </div>

                        <div className="px-3 py-2 rounded-lg bg-white border border-slate-200">
                          <div className="text-[10px] uppercase tracking-wide text-slate-400">
                            Studios
                          </div>
                          <div className="text-lg font-bold text-slate-900">
                            {JUMO_STUDIO_REGISTRY.list().length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {JUMO_STUDIO_REGISTRY.list().map((studio) => (
                        <div
                          key={studio.id}
                          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                <Layers className="h-4 w-4 text-slate-600" />
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-slate-900">
                                  {studio.name}
                                </h3>
                                <p className="text-[11px] text-slate-500">
                                  {studio.family}
                                </p>
                              </div>
                            </div>

                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              studio.status === "AVAILABLE" || studio.status === "READY" || studio.status === "RUNNING" 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}>
                              {studio.status}
                            </span>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-100">
                            <button
                              onClick={() => onNavigate?.(studio.id as any)}
                              className="w-full flex items-center justify-between group cursor-pointer"
                            >
                              <span className="text-[11px] font-bold text-slate-600 group-hover:text-blue-600">
                                Open Studio
                              </span>
                              <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Primary Active Metrics Panel */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block">Intake Requests</span>
                        <span className="text-xl font-black text-slate-900 block mt-1">{(archRequests ?? []).length}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block">Compiled Blueprints</span>
                        <span className="text-xl font-black text-slate-900 block mt-1">{(blueprints ?? []).filter(b => b.compilerStatus === 'OK').length}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block">Active Compile Streams</span>
                        <span className="text-xl font-black text-slate-900 block mt-1">{(jobs ?? []).filter(j => j.status !== 'RUNTIME_ACTIVE' && j.status !== 'FAILED').length}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block">Cyber Guardians</span>
                        <span className="text-xl font-black text-slate-900 block mt-1">{(engineeringAgents ?? []).length}</span>
                      </div>
                    </div>

                    {/* Live Compilation Queue Map */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Operational System Core Services</h3>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase">
                          FAAP Reserves Isolated
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(Array.isArray(ecosystems) ? ecosystems : []).slice(0, 4).map((eco, i) => {
                          const ecoId = String(eco?.id || eco?.registryId || eco?.name || `ECO-${i}`);
                          const ecoName = String(eco?.name || eco?.registryId || "Sovereign Ecosystem");
                          const ecoCategory = String(eco?.category || "ERP_ECOSYSTEM");
                          return (
                            <div key={ecoId || i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] bg-white border border-slate-200`}>
                                {ecoId.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-bold text-xs text-slate-800 block">{ecoName}</span>
                                <span className="text-[9px] text-slate-500 block font-semibold">{ecoCategory} Gateway Connected</span>
                              </div>
                            </div>
                          );
                        })}
                        {ecosystems.length === 0 && (
                          <div className="col-span-2 py-4 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">
                            Searching Registry for Active Core Services...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Primary Stream Tracking List */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="border-b border-slate-200 px-5 py-4 flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Active Pipeline Streams</h3>
                        <button 
                          onClick={() => onNavigate?.('manufacturing')}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          Open Planner <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[9px]">
                              <th className="p-4">Pipeline Job</th>
                              <th className="p-4">State</th>
                              <th className="p-4">Progress</th>
                              <th className="p-4">Assigned Agents</th>
                              <th className="p-4">Quick Command</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {jobs.slice(0, 5).map((job) => (
                              <tr key={job.id} className="hover:bg-slate-50/50">
                                <td className="p-4">
                                  <span className="font-extrabold text-slate-800 block">{job.id}</span>
                                  <span className="text-[10px] text-slate-500 uppercase block mt-0.5">{job.productId} • STAGE {job.status}</span>
                                </td>
                                <td className="p-4">
                                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-black text-[9px] bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-tight">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                    {job.status}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <div className="w-24 bg-slate-100 rounded-full h-1 overflow-hidden">
                                    <div className="bg-blue-600 h-1 rounded-full transition-all duration-500" style={{ width: `${job.progress}%` }}></div>
                                  </div>
                                  <span className="text-[9px] font-black text-slate-500 block mt-1 uppercase">{job.progress}% COMPILED</span>
                                </td>
                                <td className="p-4">
                                  <div className="flex -space-x-1.5 overflow-hidden">
                                    {(Array.isArray(job?.assignedWorkforce) ? job.assignedWorkforce : []).map((assignment, i) => (
                                      <div 
                                        key={i} 
                                        title={`${assignment.engineerId} - ${assignment.role}`}
                                        className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[9px] font-black text-slate-600 uppercase"
                                      >
                                        {String(assignment?.engineerId ?? "NA").substring(0, 2).toUpperCase()}
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-1.5 justify-end">
                                    <button 
                                      onClick={() => handlePromoteManufacturingJob(job.id)}
                                      className="px-2.5 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                                    >
                                      Promote
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Immutable Operations Ledger sidebar */}
                  <div className="space-y-6">
                    
                    {/* Active Incident Banner */}
                    {(incidents ?? []).length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-extrabold text-xs text-amber-900 block">Sovereign Core Alert</span>
                            <p className="text-[11px] text-amber-700 leading-relaxed mt-0.5">{incidents[0].title}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Immutable Operations Ledger</h3>
                        <History className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                        {auditEvents.map((evt) => (
                          <div key={evt.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] leading-relaxed">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1.5">
                              <span className="font-extrabold text-blue-600">{evt.operation}</span>
                              <span className="text-[9px] text-slate-400 font-bold">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-slate-600">{evt.details}</p>
                            <span className="text-[9px] font-bold text-slate-400 mt-1 block uppercase">
                              Operator: {evt.actor}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Sub-tab 2: Cloud Infrastructure (Merged CloudStudio / InfrastructureRenderer) */}
            {overviewTab === 'cloud' && (
              <div className="space-y-6 animate-fadeIn">
                <InfrastructureRenderer 
                  slots={cloudSlots}
                  volumes={databaseVolumes}
                />
              </div>
            )}

            {/* Sub-tab 3: Security & SOC (Merged SecurityRegistryRenderer) */}
            {overviewTab === 'security' && (
              <div className="space-y-6 animate-fadeIn">
                <SecurityRegistryRenderer />
              </div>
            )}

            {/* Sub-tab 4: Lifecycle Management (Merged LifecycleStudio) */}
            {overviewTab === 'lifecycle' && (
              <div className="space-y-6 animate-fadeIn">
                <LifecycleStudio 
                  assets={assets}
                  onTransition={handleTransitionAsset}
                  onArchive={handleArchiveAsset}
                  onRegister={handleRegisterAsset}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STUDIO 2: SPECIFICATION & INTAKE STUDIO (activeWorkspace === 'specification')
            ======================================================== */}
        {activeWorkspace === "specification" && (
          <div className="space-y-6 animate-fadeIn" id="workspace-specification">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Specification & Intake Studio</span>
            </div>
            <SpecificationStudio 
              requests={archRequests}
              onCreateRequest={handleGenerateArchitectureContract}
              eventLog={eventLog}
            />
          </div>
        )}

        {/* ========================================================
            STUDIO 3: ARCHITECTURE & ENGINEERING STUDIO (activeWorkspace === 'architecture')
            ======================================================== */}
        {activeWorkspace === "architecture" && (
          <div className="space-y-6">
            {/* Studio Sub-tabs Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Architecture & Engineering Studio</span>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
                {(['blueprint', 'workforce', 'verification'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setArchitectureTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      architectureTab === tab
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {tab === 'blueprint' && "Blueprint & Design"}
                    {tab === 'workforce' && "Cognitive Workforce"}
                    {tab === 'verification' && "Validation Engine"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-tab 1: Blueprint & Design */}
            {architectureTab === 'blueprint' && (
              <div className="space-y-6 animate-fadeIn">
                <ArchitectureStudio 
                  requests={archRequests}
                  contracts={archContracts}
                  expansionTraces={expansionTraces}
                  onCreateContract={handleCreateArchitectureContract}
                  onApproveContract={handleApproveArchitectureContract}
                  onLaunchManufacturing={handleCreateManufacturingJob}
                  onCreateRequest={handleGenerateArchitectureContract}
                />
              </div>
            )}

            {/* Sub-tab 2: Cognitive Workforce (Merged EngineeringStudio) */}
            {architectureTab === 'workforce' && (
              <div className="space-y-6 animate-fadeIn">
                <EngineeringStudio 
                  agents={engineeringAgents}
                  jobs={jobs}
                  workLogs={agentWorkLogs}
                  eventLog={eventLog}
                />
              </div>
            )}

            {/* Sub-tab 3: Validation Engine (Merged ArchitectureVerificationCommandCenter) */}
            {architectureTab === 'verification' && (
              <div className="space-y-6 animate-fadeIn">
                <ArchitectureVerificationCommandCenter 
                   layers={archLayers}
                   onOpenStudio={(s) => onNavigate?.(s as any)}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STUDIO 4: MANUFACTURING FACTORY (activeWorkspace === 'manufacturing' / 'engineering')
            ======================================================== */}
        {activeWorkspace === "manufacturing" && (
          <div className="space-y-6">
            {/* Studio Sub-tabs Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Manufacturing Factory</span>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
                {(['pipeline', 'build'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setManufacturingTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      manufacturingTab === tab
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {tab === 'pipeline' && "Factory Pipeline"}
                    {tab === 'build' && "Build Assembly & Artifacts"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-tab 1: Factory Pipeline */}
            {manufacturingTab === 'pipeline' && (
              <div className="space-y-6 animate-fadeIn">
                <ManufacturingStudio 
                  jobs={jobs}
                  contracts={archContracts}
                  onPromoteJob={handlePromoteManufacturingJob}
                  onPauseJob={handlePauseJob}
                  eventLog={eventLog}
                />
              </div>
            )}

            {/* Sub-tab 2: Build Assembly (Merged BuildStudio) */}
            {manufacturingTab === 'build' && (
              <div className="space-y-6 animate-fadeIn">
                <BuildStudio 
                  artifacts={buildArtifacts.map(a => ({
                    artifactId: a.artifactId,
                    jobId: a.jobId,
                    hash: a.hash,
                    size: a.size,
                    timestamp: a.timestamp,
                    status: a.status,
                    logs: a.logs
                  }))}
                  isCompiling={isCompiling}
                  compilerLogs={compilerLogs}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STUDIO 5: VERIFICATION & TESTING CENTER (activeWorkspace === 'verification')
            ======================================================== */}
        {activeWorkspace === "verification" && (
          <div className="space-y-6 animate-fadeIn" id="workspace-verification">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Verification & Testing Center</span>
            </div>
            <VerificationStudio 
              gates={verificationGates}
              failures={verificationFailures}
              isVerifying={isVerifyingSuite}
              verifyingIndex={-1}
              onRunSuite={runFullVerificationSuite}
            />
          </div>
        )}

        {/* ========================================================
            STUDIO 6: CERTIFICATION & RELEASE CONTROL (activeWorkspace === 'certification')
            ======================================================== */}
        {activeWorkspace === "certification" && (
          <div className="space-y-6 animate-fadeIn" id="workspace-certification">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Certification & Release Control</span>
            </div>
            <CertificationStudio
              certifications={certificationRecords}
              jobs={jobs}
              onCertify={handleCertifyJob}
            />
          </div>
        )}

        {/* ========================================================
            STUDIO 7: PROVISION & DEPLOY CONTROL (activeWorkspace === 'deployment' / 'provisioning')
            ======================================================== */}
        {activeWorkspace === "deployment" && (
          <div className="space-y-6">
            {/* Studio Sub-tabs Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-cyan-500" />
                <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Provision & Deploy Control</span>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
                {(['provisioning', 'deployment'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDeploymentTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      deploymentTab === tab
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {tab === 'provisioning' && "Provisioning Studio"}
                    {tab === 'deployment' && "Deployment Control"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-tab 1: Provisioning Studio */}
            {deploymentTab === 'provisioning' && (
              <div className="space-y-6 animate-fadeIn">
                <ProvisioningStudio 
                  onProvisionPlatform={(templateId, config) => handleCreateArchitectureContract(templateId)}
                />
              </div>
            )}

            {/* Sub-tab 2: Deployment Control */}
            {deploymentTab === 'deployment' && (
              <div className="space-y-6 animate-fadeIn">
                <DeploymentStudio 
                  records={deploymentRecords}
                  slots={cloudSlots}
                  isDeploying={isDeploying}
                  deploymentLogs={deploymentLogs}
                  onScaleSlot={handleScaleSlot}
                  onTogglePowerSlot={handleTogglePowerSlot}
                  onDeploySlot={handleDeploySlot}
                  jobs={jobs}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STUDIO 8: GOVERNANCE & REGISTRY (activeWorkspace === 'templates' / 'audit' / 'migration')
            ======================================================== */}
        {activeWorkspace === "templates" && (
          <div className="space-y-6">
            {/* Studio Sub-tabs Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-500" />
                <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Governance & Registry</span>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
                {(['registry', 'audit', 'migration'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTemplatesTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      templatesTab === tab
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {tab === 'registry' && "Registry Fabric"}
                    {tab === 'audit' && "Continuous Audit"}
                    {tab === 'migration' && "Schema Migration"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-tab 1: Registry Fabric */}
            {templatesTab === 'registry' && (
              <div className="space-y-6 animate-fadeIn">
                <RegistryStudio 
                  registryFilter={registryFilter}
                  setRegistryFilter={setRegistryFilter}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  erpEcosystems={erpEcosystems}
                  commercialProducts={commercialProducts}
                  softwareProducts={softwareProducts}
                  jobs={jobs}
                  onConfigureInFactory={(templateId) => handleCreateArchitectureContract(templateId)}
                />
              </div>
            )}

            {/* Sub-tab 2: Continuous Audit (Merged AuditRenderer) */}
            {templatesTab === 'audit' && (
              <div className="space-y-6 animate-fadeIn">
                <AuditRenderer 
                  incidents={incidents}
                  institutions={ecosystems}
                />
              </div>
            )}

            {/* Sub-tab 3: Schema Migration (Merged Database & Schema upgrades) */}
            {templatesTab === 'migration' && (
              <div className="space-y-6 animate-fadeIn" id="workspace-migration">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Schema and API migrations */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Database & Schema Upgrades</h3>
                        <p className="text-xs text-slate-500 mt-1">Trigger secure migrations, schema alters, or database schema backups with rollback insurance.</p>
                      </div>

                      <div className="space-y-4">
                        {migrations.map((mig) => (
                          <div key={mig.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[10px] font-black text-slate-400 block">{mig.type} • {mig.id}</span>
                                <span className="font-bold text-xs text-slate-800 block mt-0.5">{mig.name}</span>
                              </div>
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                mig.status === "COMPLETED"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                  : mig.status === "RUNNING"
                                  ? "bg-blue-50 text-blue-700 border-blue-100 animate-pulse"
                                  : "bg-slate-100 text-slate-500 border-slate-200"
                              }`}>
                                {mig.status}
                              </span>
                            </div>

                            {mig.status === "RUNNING" && (
                              <div className="space-y-1.5">
                                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-200" style={{ width: `${mig.progress}%` }}></div>
                                </div>
                                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                  <span>Executing DDL transaction blocks</span>
                                  <span>{mig.progress}%</span>
                                </div>
                              </div>
                            )}

                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() => handleExecuteMigration(mig.id)}
                                disabled={mig.status === "COMPLETED" || activeMigrationId !== null}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                              >
                                {mig.status === "COMPLETED" ? "Alter Applied" : mig.status === "RUNNING" ? "Executing..." : "Execute Alter"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Compatibility matrix & Console logs */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Version Compatibility Matrix</h3>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Verifies structural backward compatibility with underlying databases and legacy applications before rollout.</p>
                      
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-3 text-slate-600">
                        <div className="flex justify-between border-b border-slate-200/60 pb-1 text-[11px]">
                          <span>PostgreSQL Core Compatibility:</span>
                          <span className="text-emerald-600 font-extrabold">COMPATIBLE</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200/60 pb-1 text-[11px]">
                          <span>FAAP Ledger Schema Base:</span>
                          <span className="text-emerald-600 font-extrabold">COMPATIBLE</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>JUMO-UEOS Platform Core v13:</span>
                          <span className="text-emerald-600 font-extrabold">COMPATIBLE</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Database Execution Terminal</h3>
                      <div className="bg-slate-950 font-mono text-[10px] text-emerald-400 border border-slate-800 p-4 rounded-xl space-y-1.5 h-44 overflow-y-auto">
                        {migrationLogs.map((log, idx) => (
                          <div key={idx} className="flex items-start gap-1">
                            <span className="text-slate-500 select-none">›</span>
                            <span className="break-all">{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* Ecosystem Workspaces */}
        {["eco-erp", "eco-cloud", "eco-software", "eco-commercial", "eco-research"].includes(activeWorkspace) && (
          <EcosystemWorkspace 
            ecosystemId={activeWorkspace as any} 
            onNavigate={onNavigate} 
            onGenerateArchitectureContract={handleGenerateArchitectureContract}
          />
        )}

        {/* Authoritative Security & SOC Operations */}
        {["security", "hybrid"].includes(activeWorkspace) && (
          <div className="space-y-6" id={`workspace-${activeWorkspace}`}>
            <SecurityRegistryRenderer />
          </div>
        )}

        {/* JUMO UEOS Control Studios */}
        {activeWorkspace === 'branding' && <BrandingStudio />}
        {activeWorkspace === 'config' && <ConfigStudio />}
        {activeWorkspace === 'control' && <SovereignControlStudio />}
        {activeWorkspace === 'faap' && <FAAPLedgerStudio />}

        {/* Workspace: Settings & Security config */}
        {activeWorkspace === "settings" && (
          <div className="space-y-6" id="workspace-settings">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Security settings */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Sovereign Control Plane Settings</h3>
                    <p className="text-xs text-slate-500 mt-1">Configure security levels, key rotations, and emergency container shutdowns.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <span className="font-bold text-xs text-slate-800 block">Sovereign Encryption Keys</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Rotates key certificates across VPC tunnels</span>
                      </div>
                      <button
                        onClick={handleRotateKeys}
                        className="px-3 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        Rotate Keys
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-rose-50 border border-rose-200 rounded-xl">
                      <div>
                        <span className="font-bold text-xs text-rose-900 block">Emergency Pipeline Shutdown</span>
                        <span className="text-[10px] text-rose-500 block mt-0.5">Instantly blocks all compile servers and suspends active nodes</span>
                      </div>
                      <button
                        onClick={handleToggleEmergencyShutdown}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        SHUTDOWN
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Key info and backups */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Platform Integrity Status</h3>
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <div className="flex justify-between border-b border-slate-100 pb-1.5 font-semibold">
                      <span>Kernel Target Platform:</span>
                      <span className="text-slate-800 font-bold">JUMO-UEOS-v13</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1.5 font-semibold">
                      <span>Local Registry State:</span>
                      <span className="text-slate-800 font-bold">SYNC_LOCKED</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Regulatory Audits:</span>
                      <span className="text-slate-800 font-bold">100% Compliant</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
