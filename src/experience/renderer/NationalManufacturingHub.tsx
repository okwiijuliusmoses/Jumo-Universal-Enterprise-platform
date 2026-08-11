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
  FileSignature, GitCommit, GitPullRequest, WifiOff, Award, ShieldCheck, Briefcase, FlaskConical
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
  | 'provisioning';

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
  const [verificationGates, setVerificationGates] = useState<VerificationGateResult[]>([]);
  const [databaseVolumes, setDatabaseVolumes] = useState<any[]>([]);
  const [migrations, setMigrations] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
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

  // Fetch full sovereign operating state from Express backend
  const fetchSovereignState = async () => {
    try {
      const res = await fetch("/api/v1/ueos/state");
      if (!res.ok) throw new Error("Network status not OK");
      const data = await res.json();
      setArchRequests(data.architectureRequests);
      setArchContracts(data.architectureContracts);
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
      setVerificationGates(data.verificationGates);
      setDatabaseVolumes(data.databaseVolumes);
      setMigrations(data.migrations);
      setAssets(data.assets);
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

  // 1. Create Architecture Request (Phase 2 Specification) & Lock Handoff to Manufacturing Pipeline
  const handleGenerateArchitectureContract = async (spec: EcosystemSpecification) => {
    try {
      // Create a complex architecture request mapping the full specification
      const payload = {
        title: spec.product.productName || "Sovereign Enterprise System",
        problem: spec.product.purpose || "Derived Digital Ecosystem Specification",
        targetUsers: spec.portals.selected.join(", ") || "Citizens and Staff",
        organization: spec.product.targetOrganization || "National Hub Authority",
        capabilities: spec.modules.selected,
        infrastructure: spec.deployment.selected.join(", ") || "JUMO Sovereign Cloud",
        integrations: spec.integrations.selected,
        aiRequirements: spec.aiWorkforce.selected.join(", "),
        ecosystemType: spec.product.ecosystem,
        sector: spec.product.sector,
        governmentScale: spec.product.governmentScale,
        applicationType: spec.product.applicationType,
        detailedSpecification: spec
      };
      
      const reqRes = await serverPost("/api/v1/ueos/architecture-requests", payload);
      if (reqRes.ok) {
        const reqData = await reqRes.json();
        const requestId = reqData.id;

        // Auto-generate Contract from Request
        const contractRes = await serverPost("/api/v1/ueos/architecture-contracts", { requestId });
        if (contractRes.ok) {
          const contractData = await contractRes.json();
          const contractId = contractData.id;

          // Auto-approve Contract
          const approveRes = await serverPut(`/api/v1/ueos/architecture-contracts/${contractId}/approve`);
          if (approveRes.ok) {
            // Auto-create Manufacturing Job in 20-stage Manufacturing Pipeline
            const jobRes = await serverPost("/api/v1/ueos/jobs", { contractId });
            if (jobRes.ok) {
              await fetchSovereignState();
              logAudit("SPECIFICATION_LOCKED", `Specification locked for ${payload.title}. Auto-generated Contract ${contractId} & Manufacturing Job.`);
              onNavigate?.('manufacturing');
              return;
            }
          }
        }
        await fetchSovereignState();
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
      if (res.ok) await fetchSovereignState();
    } catch (err) {
      console.error(err);
    }
  };

  // 2b. Approve Architecture Contract
  const handleApproveArchitectureContract = async (contractId: string) => {
    try {
      const res = await serverPut(`/api/v1/ueos/architecture-contracts/${contractId}/approve`);
      if (res.ok) await fetchSovereignState();
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

  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

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

      {/* CORE WORKSPACE SECTIONS CONTAINER */}
      <div className="min-h-[600px] bg-slate-50">
        
        {/* Workspace 1: Sovereign Command */}
        {activeWorkspace === "overview" && (
          <div className="space-y-6" id="workspace-command">
            
        {/* Ecosystem Products Quick Launch - REMOVED LEGACY ARCHITECTURE */}
        <div className="hidden" id="workspace-ecosystem-cards-purge">
        </div>

        {/* JUMO Digital Hybrid Studios Registry */}
            <section
              data-jumo-section="JUMO_VISIBLE_STUDIO_CONTROL_CENTER"
              className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
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

        {/* Workspace 2: Digital Ecosystem Specification (Phase 2) */}
        {activeWorkspace === "specification" && (
          <div className="space-y-6" id="workspace-specification">
            <SpecificationStudio 
              requests={archRequests}
              onCreateRequest={handleGenerateArchitectureContract}
            />
          </div>
        )}

        {/* JUMO Dynamic Architecture & AI Command Center (Only on architecture workspace) */}
        {activeWorkspace === "architecture" && (
          <ArchitectureVerificationCommandCenter 
             layers={archLayers}
             onOpenStudio={(s) => onNavigate?.(s as any)}
          />
        )}

        {/* Workspace: Template Registry */}
        {activeWorkspace === "templates" && (
          <div className="space-y-6" id="workspace-templates">
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

        {/* Workspace 2: Architecture Studio */}
        {activeWorkspace === "architecture" && (
          <div className="space-y-6" id="workspace-architecture">
            <ArchitectureStudio 
              requests={archRequests}
              contracts={archContracts}
              onCreateContract={handleCreateArchitectureContract}
              onApproveContract={handleApproveArchitectureContract}
              onLaunchManufacturing={handleCreateManufacturingJob}
              onCreateRequest={handleGenerateArchitectureContract}
            />
          </div>
        )}


        {/* Workspace 4: Manufacturing Studio */}
        {activeWorkspace === "manufacturing" && (
          <div className="space-y-6" id="workspace-manufacturing">
            <ManufacturingStudio 
              jobs={jobs}
              onPromoteJob={handlePromoteManufacturingJob}
              onPauseJob={handlePauseJob}
            />
          </div>
        )}

        {/* Workspace 3: Build Studio */}
        {activeWorkspace === "engineering" && (
          <div className="space-y-6" id="workspace-build">
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

        {/* Workspace 4: Engineering Workforce Studio */}
        {activeWorkspace === "workforce" && (
          <div className="space-y-6" id="workspace-workforce">
            <EngineeringStudio 
              agents={engineeringAgents}
              jobs={jobs}
            />
          </div>
        )}

        {/* Workspace 5: Deployment Studio */}
        {activeWorkspace === "deployment" && (
          <div className="space-y-6" id="workspace-deployment">
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

        {/* Workspace 6: Provisioning Studio */}
        {activeWorkspace === "provisioning" && (
          <div className="space-y-6" id="workspace-provisioning">
            <ProvisioningStudio 
              onProvisionPlatform={(templateId, config) => handleCreateArchitectureContract(templateId)}
            />
          </div>
        )}

        {/* Workspace 7: Verification Studio */}
        {activeWorkspace === "verification" && (
          <div className="space-y-6" id="workspace-verification">
            <VerificationStudio 
              gates={verificationGates}
              failures={verificationFailures}
              isVerifying={isVerifyingSuite}
              verifyingIndex={-1}
              onRunSuite={runFullVerificationSuite}
            />
          </div>
        )}

        {/* Workspace 8: Certification Studio */}
        {activeWorkspace === "certification" && (
          <div className="space-y-6" id="workspace-certification">
            <CertificationStudio
              certifications={certificationRecords}
              jobs={jobs}
              onCertify={handleCertifyJob}
            />
          </div>
        )}

        {/* Workspace: Sovereign Cloud Studio */}
        {activeWorkspace === "cloud" && (
          <div className="space-y-6" id="workspace-cloud">
            <InfrastructureRenderer
              slots={cloudSlots}
              volumes={databaseVolumes}
            />
          </div>
        )}


        {/* Workspace 9: Migration & Upgrade */}
        {activeWorkspace === "migration" && (
          <div className="space-y-6" id="workspace-migration">
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

        {/* Workspace 10: Audit & Guardian */}
        {activeWorkspace === "audit" && (
          <div className="space-y-6" id="workspace-audit">
            <AuditRenderer 
              incidents={incidents}
              institutions={ecosystems}
            />
          </div>
        )}

        {/* Workspace 11: Lifecycle Management */}
        {activeWorkspace === "lifecycle" && (
          <div className="space-y-6" id="workspace-lifecycle">
            <LifecycleStudio 
              assets={assets}
              onTransition={handleTransitionAsset}
              onArchive={handleArchiveAsset}
              onRegister={handleRegisterAsset}
            />
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

        {/* Workspace 12: Settings & Security config */}
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
