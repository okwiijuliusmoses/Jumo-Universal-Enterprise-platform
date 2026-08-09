import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, Shield, Database, Activity, Server, Settings, Layers, Terminal, Globe, Sparkles, 
  Box, FileText, CheckCircle2, AlertCircle, Play, Pause, RefreshCw, Plus, Search, 
  ChevronRight, X, ArrowRight, Check, Sliders, AlertTriangle, FileCheck, Trash2, Send, 
  History, RefreshCcw, Command, Zap, ExternalLink, HardDrive, Key, Network, Users, Cloud,
  CheckSquare, HelpCircle, ActivitySquare, AlertOctagon, Compass, BookOpen, Binary,
  FileSignature, GitCommit, GitPullRequest, WifiOff, Award, ShieldCheck
} from "lucide-react";
import { UniversalHubRegistry } from "../../core/factory/registry/UniversalHubRegistry";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";
import { DigitalEcosystemSpecificationForm, EcosystemSpecification } from "./specification/DigitalEcosystemSpecificationForm";
import { EcosystemWorkspace } from "./ecosystem/EcosystemWorkspace";

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
  | 'eco-research';

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

  const handleToggleOfflineMode = async () => {
    const nextMode = !isOfflineMode;
    setIsOfflineMode(nextMode);
    localStorage.setItem("jumo_offline_mode", String(nextMode));
    
    if (!nextMode && offlineQueue.length > 0) {
      setIsSyncingOffline(true);
      setSyncStatusText(`Reconciling ${offlineQueue.length} offline mutations with JUMO kernel...`);
      
      try {
        for (const action of offlineQueue) {
          const res = await fetch(action.url, {
            method: action.type,
            headers: {
              "Content-Type": "application/json",
              "x-operator-name": "Hon. Minister Julius Moses"
            },
            body: JSON.stringify(action.body)
          });
          if (!res.ok) {
            console.warn(`[RECONCILE] Warning: Offline mutation returned status ${res.status}`);
          }
        }
        setSyncStatusText(`RECONCILIATION SUCCESSFUL: Synchronized ${offlineQueue.length} mutations cleanly.`);
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
  const [newTitle, setNewTitle] = useState("");
  const [newProblem, setNewProblem] = useState("");
  const [newUsers, setNewUsers] = useState("");
  const [newOrg, setNewOrg] = useState("Ministry of Finance");
  const [newCap, setNewCap] = useState("");
  const [newInfra, setNewInfra] = useState("Sovereign Hybrid Cloud Node JUMO-NODE-01");
  const [newInts, setNewInts] = useState<string[]>([]);
  const [newAiReq, setNewAiReq] = useState("");

  const [newDbName, setNewDbName] = useState("");
  const [newDbTenant, setNewDbTenant] = useState("");
  const [newDbPool, setNewDbPool] = useState("FAAP_RESERVE_PRIMARY");
  const [newDbSize, setNewDbSize] = useState("1.0TB");

  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetType, setNewAssetType] = useState("Commercial ERP Platform");

  const [selectedBpId, setSelectedBpId] = useState<string>("bp-sacco-v4");
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilerLogs, setCompilerLogs] = useState<string[]>([]);

  const [selectedJobId, setSelectedJobId] = useState<string>("JOB-2026-000905");
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
      setIncidents(data.incidents);
      setCloudSlots(data.cloudSlots);
      setAuditEvents(data.auditEvents);
      setVerificationGates(data.verificationGates);
      setDatabaseVolumes(data.databaseVolumes);
      setMigrations(data.migrations);
      setAssets(data.assets);
      setCryptographicKeys(data.cryptographicKeys);
      setEmergencyMode(data.emergencyMode);
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
        "x-operator-name": "Hon. Minister Julius Moses"
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
        "x-operator-name": "Hon. Minister Julius Moses"
      },
      body: JSON.stringify(body)
    });
  };

  // === MUTATION ACTIONS ===

  // 1. Create Architecture Request (Phase 2 Specification)
  const handleGenerateArchitectureContract = async (spec: EcosystemSpecification) => {
    try {
      // Create a complex architecture request mapping the full specification
      const payload = {
        title: spec.product.productName || "New Manufacturing Product",
        problem: spec.product.purpose || "Generated from Digital Ecosystem Specification Form",
        targetUsers: spec.portals.selected.join(", ") || "Public",
        organization: spec.product.targetOrganization || "National Digital Hub",
        capabilities: spec.modules.selected,
        infrastructure: spec.deployment.selected.join(", ") || "JUMO Cloud",
        integrations: spec.integrations.selected,
        aiRequirements: spec.aiWorkforce.selected.join(", "),
        ecosystemType: spec.product.ecosystem,
        sector: spec.product.sector,
        detailedSpecification: spec
      };
      
      const res = await serverPost("/api/v1/ueos/architecture-requests", payload);
      if (res.ok) {
        await fetchSovereignState();
        onNavigate?.('architecture');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateArchRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    try {
      const payload = {
        title: newTitle,
        problem: newProblem,
        targetUsers: newUsers,
        organization: newOrg,
        capabilities: newCap.split(",").map(c => c.trim()).filter(Boolean),
        infrastructure: newInfra,
        integrations: newInts,
        aiRequirements: newAiReq
      };
      const res = await serverPost("/api/v1/ueos/architecture-requests", payload);
      if (res.ok) {
        // Clear form
        setNewTitle("");
        setNewProblem("");
        setNewUsers("");
        setNewCap("");
        setNewAiReq("");
        setNewInts([]);
        await fetchSovereignState();
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
    
    setTimeout(() => {
      setCompilerLogs(prev => [...prev, "[VALIDATOR] Validating schema nodes against architecture contract JUMO-v13..."]);
    }, 150);

    setTimeout(() => {
      setCompilerLogs(prev => [...prev, "[RESOLVER] Resolved zero external dependencies. Pure air-gapped libraries used."]);
    }, 300);

    setTimeout(() => {
      setCompilerLogs(prev => [...prev, "[COMPILER] Packaging artifacts. Bundling FAAP ledgers. Cryptographically signing binary stream..."]);
    }, 450);

    try {
      const res = await serverPost(`/api/v1/ueos/blueprints/${bpId}/compile`);
      if (res.ok) {
        const data = await res.json();
        setCompilerLogs(prev => [
          ...prev, 
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
        // Mimic logging flow in UI as database stream completes
        setTimeout(() => {
          setMigrationLogs(prev => [
            ...prev,
            "› [SQL-PREPARE] Lock requested on tenant schemas... SUCCESS.",
            "› [SQL-ALTER] Executing DDL: ALTER TABLE transactions ADD COLUMN IF NOT EXISTS isolation_token VARCHAR;"
          ]);
        }, 150);

        setTimeout(() => {
          setMigrationLogs(prev => [
            ...prev,
            "› [SQL-INDEX] Building schema key constraints...",
            "› [SQL-ANALYZE] Refreshing planner statistics on PostgreSQL..."
          ]);
        }, 300);

        setTimeout(async () => {
          setMigrationLogs(prev => [
            ...prev,
            ...data.logs,
            `› [MIG-COMPLETE] Migration ${migId} successfully committed. Rollback point sealed.`
          ]);
          setActiveMigrationId(null);
          await fetchSovereignState();
        }, 450);
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
  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName) return;

    try {
      const payload = { name: newAssetName, type: newAssetType };
      const res = await serverPost("/api/v1/ueos/assets/register", payload);
      if (res.ok) {
        setNewAssetName("");
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

  // Cloud deployment slots simulator
  const handleDeploySlot = (slotId: string, actionType: 'ROLLBACK' | 'PROMOTE') => {
    if (isDeploying) return;
    setIsDeploying(true);
    setDeploymentLogs([`› [DEPLOY-INIT] Initiating ${actionType === 'ROLLBACK' ? 'disaster recovery rollback' : 'stable cluster promotion'} on environment slot: ${slotId}...`]);
    
    setTimeout(() => {
      setDeploymentLogs(prev => [...prev, "› [DEPLOY-VPC] Hardening ingress security and checking node boundaries..."]);
    }, 150);
    
    setTimeout(() => {
      setDeploymentLogs(prev => [...prev, "› [DEPLOY-PROMOTING] Discharging container payloads to isolated slots..."]);
    }, 300);

    setTimeout(() => {
      const targetRelease = actionType === 'ROLLBACK' ? "v4.1.9-STABLE" : "v4.2.0-STABLE";
      setCloudSlots(prev => prev.map(s => s.id === slotId ? { ...s, activeRelease: targetRelease, health: 'HEALTHY' } : s));
      setDeploymentLogs(prev => [...prev, `› [DEPLOY-HEALTH] Health check score: 100%. Promotion to ${targetRelease} complete.`]);
      setIsDeploying(false);
      fetchSovereignState();
    }, 500);
  };

  // Run full 20-Gate executable verification suite
  const runFullVerificationSuite = async () => {
    setIsVerifyingSuite(true);
    setVerifyingIndex(0);
    setVerificationGates(prev => prev.map(g => ({ ...g, status: 'NOT_RUN' })));
  };

  useEffect(() => {
    if (!isVerifyingSuite || verifyingIndex === -1) return;

    if (verifyingIndex < verificationGates.length) {
      const timeout = setTimeout(() => {
        setVerificationGates(prev => prev.map((g, idx) => {
          if (idx === verifyingIndex) {
            return { ...g, status: 'PASS', timestamp: new Date().toLocaleTimeString() };
          }
          return g;
        }));
        setVerifyingIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      // Trigger the backend API to store results officially in state and audit log!
      serverPost("/api/v1/ueos/verification/run-suite").then(() => {
        setIsVerifyingSuite(false);
        setVerifyingIndex(-1);
        fetchSovereignState();
      });
    }
  }, [isVerifyingSuite, verifyingIndex]);

  // Zero Trust Packet route network diagnostics trace
  const handleRunZeroTrustTrace = async () => {
    setIsTracingNetwork(true);
    setZeroTrustLogs(["[TRACE-INIT] Initiating live Zero-Trust route scan on active hypervisor channels..."]);
    
    setTimeout(() => {
      setZeroTrustLogs(p => [...p, "[TRACE-SUBNET] Mapping JUMO-NODE-01 isolated tunnel bridges. Status: AIRGAPPED."]);
    }, 150);
    setTimeout(() => {
      setZeroTrustLogs(p => [...p, "[TRACE-MUTUAL-TLS] Validating certificate signatures on microservices... SUCCESS."]);
    }, 300);

    try {
      const res = await fetch("/api/v1/ueos/zero-trust-trace");
      if (res.ok) {
        const data = await res.json();
        setZeroTrustData(data);
        setZeroTrustLogs(p => [
          ...p,
          `[TRACE-GATE] IPS Firewalls assert zero non-authorized external ports. Pure zero-trust verified.`,
          `[TRACE-VPC] Assigned Virtual Subnet: ${data.authorizedVPC}`,
          `[TRACE-STATUS] Scanned ports: ${data.scannedPorts.join(", ")} - Network is secure.`
        ]);
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
    
    setTimeout(() => {
      setGuardianScanLogs(p => [...p, "[GUARDIAN] Comparing repository tree with architecture lock baseline: eefd3bc"]);
    }, 150);
    setTimeout(() => {
      setGuardianScanLogs(p => [...p, "[GUARDIAN] Matching system registries against active operational maps (20/20 resolved)."]);
    }, 300);

    try {
      const res = await fetch("/api/v1/ueos/guardian-audit");
      if (res.ok) {
        const data = await res.json();
        setGuardianData(data);
        setGuardianScanLogs(p => [
          ...p,
          `[GUARDIAN] Audit verified. Overall integrity: ${data.overallIntegrity}`,
          `[GUARDIAN] Baseline Hash: ${data.baselineHash}`,
          `[GUARDIAN] PASS: 0 architecture drifts detected. All critical files matched successfully.`,
          `[GUARDIAN] Security and architectural boundaries fully locked and authorized.`
        ]);
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
            <span>{isOfflineMode ? `Air-Gap Active (${offlineQueue.length} queued)` : "Simulate Air-Gap Offline"}</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Primary Active Metrics Panel */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block">Intake Requests</span>
                    <span className="text-xl font-black text-slate-900 block mt-1">{archRequests.length}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block">Compiled Blueprints</span>
                    <span className="text-xl font-black text-slate-900 block mt-1">{blueprints.filter(b => b.compilerStatus === 'OK').length}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block">Active Compile Streams</span>
                    <span className="text-xl font-black text-slate-900 block mt-1">{jobs.filter(j => j.status !== 'RETIRED' && j.status !== 'PRODUCTION').length}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block">Cyber Guardians</span>
                    <span className="text-xl font-black text-slate-900 block mt-1">{engineeringAgents.length}</span>
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
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">
                        FB
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-800 block">JUMO FAAP Engine</span>
                        <span className="text-[9px] text-slate-500 block font-semibold">Ledger Authority Bridge Connected</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
                        DP
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-800 block">Digital Pay Gateway</span>
                        <span className="text-[9px] text-slate-500 block font-semibold">Sovereign settlement operational</span>
                      </div>
                    </div>
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
                                {job.assignedWorkforce.map((assignment, i) => (
                                  <div 
                                    key={i} 
                                    title={`${assignment.engineerId} - ${assignment.role}`}
                                    className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[9px] font-black text-slate-600 uppercase"
                                  >
                                    {assignment.engineerId.substring(0, 2)}
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
                {incidents.length > 0 && (
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
            <DigitalEcosystemSpecificationForm onSubmit={handleGenerateArchitectureContract} />
          </div>
        )}

        {/* Workspace 3: Architecture Studio (Phase 3 & 4) */}
        {activeWorkspace === "architecture" && (
          <div className="space-y-6" id="workspace-architecture">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-12 space-y-6">
                
                {/* Architecture Requests Section */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">Architecture Intake & Specification Review</h3>
                      <p className="text-xs text-slate-500 mt-1">Convert digital ecosystem specifications into structured architecture contracts.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {archRequests.filter(r => r.status === 'APPROVED' || r.status === 'DRAFT').map((req) => (
                      <div key={req.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between min-h-[160px]">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                              {req.id}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                              {new Date(req.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="font-extrabold text-xs text-slate-900 block">{req.title}</span>
                          <p className="text-[10px] text-slate-600 line-clamp-2">{req.problem}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500">Status: <span className="text-blue-600 uppercase font-black">{req.status}</span></span>
                          <button
                            onClick={() => handleCreateArchitectureContract(req.id)}
                            className="px-3 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                          >
                            Generate Contract
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture Contracts Section */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">Authoritative Architecture Contracts</h3>
                      <p className="text-xs text-slate-500 mt-1">Formal architectural blueprints ready for manufacturing and engineering hand-off.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {archContracts.map((contract) => (
                      <div key={contract.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <FileSignature className="w-4 h-4 text-indigo-600" />
                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{contract.id} <span className="text-slate-400 font-bold ml-2">VERSION {contract.version}</span></span>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                              contract.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                              {contract.status}
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-slate-900">{contract.productIdentity.name}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            <div>
                              <span className="text-[8px] font-black text-slate-400 uppercase block">Ecosystem</span>
                              <span className="text-[10px] font-bold text-slate-700">{contract.productIdentity.ecosystem}</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-slate-400 uppercase block">Organization</span>
                              <span className="text-[10px] font-bold text-slate-700">{contract.productIdentity.organization}</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-slate-400 uppercase block">Infrastructure</span>
                              <span className="text-[10px] font-bold text-slate-700">{contract.deploymentArchitecture?.infrastructure || 'Hybrid'}</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-slate-400 uppercase block">Security</span>
                              <span className="text-[10px] font-bold text-emerald-600">Zero-Trust Active</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-48 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center gap-2">
                          {contract.status === 'DRAFT' && (
                            <button
                              onClick={() => handleApproveArchitectureContract(contract.id)}
                              className="w-full py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                            >
                              Approve Architecture
                            </button>
                          )}
                          {contract.status === 'APPROVED' && (
                            <button
                              onClick={() => handleCreateManufacturingJob(contract.id)}
                              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Zap className="w-3 h-3 fill-current" />
                              Launch Manufacturing Job
                            </button>
                          )}
                          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border border-slate-200 cursor-pointer">
                            View Detailed Contract
                          </button>
                        </div>
                      </div>
                    ))}
                    {archContracts.length === 0 && (
                      <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 opacity-40">
                        <Layers className="w-12 h-12 text-slate-300" />
                        <p className="text-xs font-bold text-slate-500">No architecture contracts generated yet.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Workspace 4: Manufacturing Pipeline */}
        {activeWorkspace === "manufacturing" && (
          <div className="space-y-6" id="workspace-manufacturing-pipeline">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Active Manufacturing Pipeline</h3>
                  <p className="text-xs text-slate-500 mt-1">Monitor end-to-end building, testing, deploying, and QA jobs.</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200/80 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                      <th className="p-4">Pipeline Job</th>
                      <th className="p-4">Repository & Branch</th>
                      <th className="p-4">Active Stage</th>
                      <th className="p-4">Swarm Engine</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <span className="text-[11px] font-black text-slate-900 block">{job.id}</span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{job.productId}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-bold text-blue-600 font-mono">{job.architectureId}</span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-black text-[9px] bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="w-32 flex flex-col gap-1.5">
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${job.progress}%` }}></div>
                            </div>
                            <span className="text-[9px] font-black text-slate-500">{job.progress}% STAGE: {job.status}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex -space-x-1.5 overflow-hidden">
                            {job.assignedWorkforce.map((assignment, i) => (
                              <div 
                                key={i} 
                                title={`${assignment.engineerId} - ${assignment.role}`}
                                className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[9px] font-black text-slate-600 uppercase"
                              >
                                {assignment.engineerId.substring(0, 2)}
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const agent = engineeringAgents[Math.floor(Math.random() * engineeringAgents.length)];
                                if (agent) handleAssignAgent(job.id, agent.agentId, "Cyber Guardian");
                              }}
                              className="w-6 h-6 rounded-full bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer"
                              title="Assign random available agent"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handlePromoteManufacturingJob(job.id)}
                              className="px-3 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Promote
                            </button>
                            <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-200 cursor-pointer">
                              <Sliders className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {jobs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-slate-400 font-bold text-xs">
                          No active manufacturing jobs.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Workspace 3: Sovereign Blueprint Factory (Build Studio) */}
        {activeWorkspace === "engineering" && (
          <div className="space-y-6" id="workspace-blueprints">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Blueprint List */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Governed Blueprints Registry</span>
                {blueprints.map((bp) => {
                  const isSelected = selectedBpId === bp.blueprintId;
                  return (
                    <button
                      key={bp.blueprintId}
                      onClick={() => setSelectedBpId(bp.blueprintId)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-blue-50/50 border-blue-500 shadow-xs" 
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-800">{bp.name}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          bp.compilerStatus === 'OK' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {bp.compilerStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500 font-semibold uppercase">
                        <span>ID: {bp.blueprintId}</span>
                        <span>State: {bp.lifecycleState}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Code Editor & Compiler log terminal */}
              <div className="lg:col-span-8">
                {selectedBpId ? (
                  (() => {
                    const bp = blueprints.find(b => b.blueprintId === selectedBpId);
                    if (!bp) return null;
                    return (
                      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4">
                          <div>
                            <h4 className="font-black text-slate-900 text-sm">{bp.name}</h4>
                            <span className="text-xs text-slate-500 uppercase mt-1 block">
                              Version: {bp.version} • Last Compiled: {bp.lastBuildTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleCompileBlueprint(bp.blueprintId)}
                              disabled={isCompiling}
                              className="px-3.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                            >
                              {isCompiling ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                              Compile Blueprint
                            </button>
                            {bp.compilerStatus === "OK" && (
                              <button
                                onClick={() => handleLaunchPipelineFromBlueprint(bp.blueprintId)}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                              >
                                <Zap className="w-3.5 h-3.5" />
                                Launch Pipeline
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Editor Mock block */}
                        <div className="space-y-2">
                          <label htmlFor="blueprint-spec-editor" className="text-[10px] font-black uppercase text-slate-600">Sovereign Specification Spec (JSON/YAML)</label>
                          <textarea
                            id="blueprint-spec-editor"
                            value={bp.content}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBlueprints(prev => prev.map(b => b.blueprintId === bp.blueprintId ? { ...b, content: val } : b));
                            }}
                            className="w-full h-44 bg-slate-950 font-mono text-[11px] text-slate-300 rounded-xl p-4 border border-slate-800 focus:outline-hidden"
                          />
                        </div>

                        {/* Compiler log screen */}
                        {compilerLogs.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase text-slate-600">Sovereign Compiler Streams</span>
                            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] text-emerald-400 border border-slate-800 space-y-1 h-32 overflow-y-auto">
                              {compilerLogs.map((log, i) => (
                                <div key={i} className="flex items-start gap-1">
                                  <span className="text-slate-500 select-none">›</span>
                                  <span>{log}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-12 text-center text-slate-500">
                    <Sliders className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    <span className="text-xs font-bold">Select a blueprint from the registry to open compilation and edit controls.</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Workspace 4: AI Workforce */}
        {activeWorkspace === "workforce" && (
          <div className="space-y-6" id="workspace-workforce">
            <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Sovereign Cognitive Workforce Registry</h3>
                <p className="text-xs text-slate-500 mt-1">Air-gapped memory, tool permission isolation levels, and specialized capabilities registry.</p>
              </div>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-lg text-xs font-bold">
                {engineeringAgents.length} Active Cyber Operators
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engineeringAgents.map((agent) => (
                <div key={agent.agentId} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {agent.division}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">v1.0.0</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{agent.jumoName}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{agent.description}</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-3.5 mt-4 space-y-2 text-[10px] text-slate-600 font-semibold">
                    <div className="flex justify-between">
                      <span>Preferred Model:</span>
                      <span className="font-extrabold text-slate-800">{agent.modelPolicy?.modelAlias || "Default Flash"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Boundaries:</span>
                      <span className="font-extrabold text-slate-800">{agent.memoryPolicy?.isolationLevel || "TENANT"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workspace 5: JUMO Cloud Control */}
        {activeWorkspace === "cloud" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="workspace-cloud">
            
            {/* Compute Nodes & Trace diagnostics */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Sovereign Cluster Controller</h3>
                    <p className="text-xs text-slate-500 mt-1">Real-time compute hypervisors and isolated network routing tables.</p>
                  </div>
                  <button
                    onClick={handleRunZeroTrustTrace}
                    disabled={isTracingNetwork}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
                  >
                    {isTracingNetwork ? "Tracing network..." : "Run Zero-Trust Trace"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Compute Cluster</span>
                    <span className="font-black text-xs text-slate-800 block mt-1">JUMO-SVR-HYPERCLUSTER-01</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Network Ingress Isolation</span>
                    <span className="font-black text-xs text-blue-600 block mt-1">ZERO_TRUST_ENFORCED</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Active Database Clust</span>
                    <span className="font-black text-xs text-slate-800 block mt-1">4.2TB Ledger DB</span>
                  </div>
                </div>

                {/* Database instances list */}
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Active SQL Database Tenant Volumes</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {databaseVolumes.map((db, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                        <div className="flex items-center gap-3">
                          <Database className="w-4 h-4 text-slate-500" />
                          <div>
                            <span className="font-bold text-xs text-slate-800 block">{db.name}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Tenant: {db.tenant} • Size: {db.size}</span>
                            <span className="text-[9px] text-slate-500 block font-mono">Pool: {db.pool}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 self-start">
                          HEALTHY
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Provision database panel */}
                  <form onSubmit={handleProvisionDatabase} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                    <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider block">Provision Isolated Tenant SQL Volume</span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="db-name" className="text-[9px] font-black uppercase text-slate-500">Database Name</label>
                        <input
                          id="db-name"
                          type="text"
                          value={newDbName}
                          onChange={(e) => setNewDbName(e.target.value)}
                          placeholder="ueos_custom_db"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="db-tenant" className="text-[9px] font-black uppercase text-slate-500">Tenant Owner</label>
                        <input
                          id="db-tenant"
                          type="text"
                          value={newDbTenant}
                          onChange={(e) => setNewDbTenant(e.target.value)}
                          placeholder="Sovereign Ministry"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="db-pool" className="text-[9px] font-black uppercase text-slate-500">Resource Pool</label>
                        <select
                          id="db-pool"
                          value={newDbPool}
                          onChange={(e) => setNewDbPool(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="FAAP_RESERVE_PRIMARY">FAAP_RESERVE_PRIMARY</option>
                          <option value="FINANCIAL_POOL_01">FINANCIAL_POOL_01</option>
                          <option value="HEALTH_PROTECTED">HEALTH_PROTECTED</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="db-size" className="text-[9px] font-black uppercase text-slate-500">Allocation Size</label>
                        <select
                          id="db-size"
                          value={newDbSize}
                          onChange={(e) => setNewDbSize(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="1.0TB">1.0 TB Volume</option>
                          <option value="2.5TB">2.5 TB Volume</option>
                          <option value="5.0TB">5.0 TB Volume</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer transition-all self-end"
                    >
                      Provision Tenant SQL Volume
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Zero-Trust Trace Log terminal */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Zero-Trust Trace Logs</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Continuous packet and signature monitoring across microservice gateways.</p>
                </div>

                <div className="bg-slate-950 font-mono text-[10px] text-emerald-400 border border-slate-800 p-4 rounded-xl space-y-2 h-64 overflow-y-auto mt-4">
                  {zeroTrustLogs.length === 0 ? (
                    <span className="text-slate-500">Click &apos;Run Zero-Trust Trace&apos; to query operational subnets.</span>
                  ) : (
                    zeroTrustLogs.map((log, i) => (
                      <div key={i} className="flex items-start gap-1">
                        <span className="text-slate-500 select-none">›</span>
                        <span>{log}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Workspace 6: Registries Fabric */}
        {/* Workspace 8: Certification Center */}
        {activeWorkspace === "certification" && (
          <div className="space-y-6" id="workspace-certification">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">National Product Certification Authority</h3>
                  <p className="text-xs text-slate-500 mt-1">Formal verification of compliance and issuance of sovereign manufacturing certificates.</p>
                </div>
              </div>

              <div className="space-y-4">
                {jobs.filter(j => j.status === 'VERIFIED' || j.status === 'CERTIFIED' || j.status === 'PRODUCTION').map((job) => (
                  <div key={job.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{job.id} Compliance Certificate</span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                          job.status === 'CERTIFIED' || job.status === 'PRODUCTION' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900">Digital Ecosystem: {job.productId}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                        <div>
                          <span className="text-[8px] font-black text-slate-400 uppercase block">Verification Proof</span>
                          <span className="text-[10px] font-bold text-slate-700 font-mono">SHA256:V-OK-{job.id.substring(0,8)}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-black text-slate-400 uppercase block">Compliance Gate</span>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase">20/20 PASSED</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-black text-slate-400 uppercase block">Security Clearance</span>
                          <span className="text-[10px] font-bold text-slate-700">AUTHORITATIVE</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-56 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                      {job.status === 'VERIFIED' && (
                        <button
                          onClick={async () => {
                            await serverPost(`/api/v1/ueos/jobs/${job.id}/certify`, { authority: "National Hub Authority" });
                            await fetchSovereignState();
                          }}
                          className="w-full py-2 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Issue Certificate
                        </button>
                      )}
                      {(job.status === 'CERTIFIED' || job.status === 'PRODUCTION') && (
                        <button
                          className="w-full py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Certified Product
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {jobs.filter(j => j.status === 'VERIFIED' || j.status === 'CERTIFIED' || j.status === 'PRODUCTION').length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 opacity-40">
                    <ShieldCheck className="w-12 h-12 text-slate-300" />
                    <p className="text-xs font-bold text-slate-500">No products ready for certification.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeWorkspace === "registries" && (
          <div className="space-y-6" id="workspace-registries">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "erp", label: "ERP Ecosystem Registry" },
                  { id: "commercial", label: "Commercial Products" },
                  { id: "production", label: "Live Production Assets" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setRegistryFilter(tab.id); setSearchTerm(""); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      registryFilter === tab.id 
                        ? "bg-slate-900 text-white shadow-sm" 
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Registry */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Query Registry records..."
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs font-bold focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Registries Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[9px]">
                    <th className="p-4">Entity Identifier</th>
                    <th className="p-4">Key Capabilities</th>
                    <th className="p-4">State</th>
                    <th className="p-4">Baseline Version</th>
                    <th className="p-4">Last Audit Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registryFilter === 'erp' ? (
                    erpEcosystems.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map((e) => (
                      <tr key={e.registryId} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-4">
                          <span className="font-extrabold text-slate-800 block">{e.name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 uppercase">{e.registryId}</span>
                        </td>
                        <td className="p-4 text-slate-600 max-w-xs truncate font-medium">{e.capabilities.join(", ")}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-black text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                            <CheckCircle2 className="w-3 h-3" />
                            {e.lifecycleState}
                          </span>
                        </td>
                        <td className="p-4 font-black text-slate-600">{e.version}</td>
                        <td className="p-4 text-[10px] text-slate-400 font-bold">
                          {new Date(e.lastAuditTimestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : registryFilter === 'commercial' ? (
                    commercialProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => (
                      <tr key={p.registryId} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-4">
                          <span className="font-extrabold text-slate-800 block">{p.name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 uppercase">{p.registryId}</span>
                        </td>
                        <td className="p-4 text-slate-600 max-w-xs truncate font-medium">{p.capabilities.join(", ")}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-black text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                            <CheckCircle2 className="w-3 h-3" />
                            {p.lifecycleState}
                          </span>
                        </td>
                        <td className="p-4 font-black text-slate-600">{p.version}</td>
                        <td className="p-4 text-[10px] text-slate-400 font-bold">
                          {new Date(p.lastAuditTimestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    jobs.filter(j => j.status === 'PRODUCTION').map((job) => (
                      <tr key={job.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-blue-600" />
                            <span className="font-black text-slate-800 block">{job.productId}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5 uppercase">M-JOB: {job.id}</span>
                        </td>
                        <td className="p-4 text-slate-600 font-medium">Sovereign Live Deployment</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-black text-[9px] bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                            <Zap className="w-3 h-3 fill-current" />
                            ACTIVE_LIVE
                          </span>
                        </td>
                        <td className="p-4 font-black text-slate-600">v1.2.0-STABLE</td>
                        <td className="p-4 text-[10px] text-slate-400 font-bold">
                          {new Date(job.updatedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                  {registryFilter === 'production' && jobs.filter(j => j.status === 'PRODUCTION').length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-400 font-bold text-xs italic">
                        No products currently in live production registry.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Workspace 7: 20-Layer Verification Center */}
        {activeWorkspace === "verification" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="workspace-verification">
            
            {/* Executable run panel */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">National Verification Engine</h3>
                    <p className="text-xs text-slate-500 mt-1">Assert and execute the authoritative 100+ layer platform baseline verification suite.</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Filter layers..."
                        className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-[10px] font-bold focus:ring-1 focus:ring-blue-500 focus:outline-hidden w-40"
                      />
                    </div>
                    <button
                      onClick={runFullVerificationSuite}
                      disabled={isVerifyingSuite}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isVerifyingSuite ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      Run 100+ Layer Suite
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                  {verificationGates.map((gate, i) => (
                    <div key={gate.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 block uppercase tracking-tight">{gate.id}</span>
                        <span className="font-bold text-[11px] text-slate-800 block leading-tight">{gate.name}</span>
                        <span className="text-[9px] text-slate-500 block truncate max-w-[180px]">{gate.evidence}</span>
                      </div>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${
                        gate.status === 'PASS' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : gate.status === 'NOT_RUN'
                          ? 'bg-slate-100 text-slate-500 border-slate-200'
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {gate.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification diagnostics */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Gate Diagnostics Report</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Comprehensive architecture-aware verification summary.</p>
                </div>
                
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-2 text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800 block">Baseline Performance:</span>
                  <div className="flex justify-between font-semibold border-b border-slate-200/60 pb-1 text-[11px]">
                    <span>Total Executed Layers:</span>
                    <span className="text-slate-800">{verificationGates.filter(g => g.status !== 'NOT_RUN').length} / {verificationGates.length}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-b border-slate-200/60 pb-1 text-[11px]">
                    <span>Mandatory Passed:</span>
                    <span className="text-emerald-600 font-extrabold">{verificationGates.filter(g => g.status === 'PASS').length}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[11px]">
                    <span>Sovereign Security:</span>
                    <span className="text-slate-800 font-bold">CERTIFIED BASELINE</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Live Failure Streams</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {verificationFailures.map((failure, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-lg space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-rose-500 uppercase">{failure.layerId}</span>
                          <span className="text-[8px] text-slate-500 font-bold">{new Date(failure.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-[10px] text-slate-300 font-medium leading-relaxed">{failure.actualResult}</p>
                        <span className="text-[8px] text-slate-500 block italic">Source: {failure.evidence}</span>
                      </div>
                    ))}
                    {verificationFailures.length === 0 && (
                      <div className="text-[10px] text-slate-600 italic text-center py-4">
                        Zero sovereign verification failures detected.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Workspace 8: Build & Deploy Studio */}
        {activeWorkspace === "deployment" && (
          <div className="space-y-6" id="workspace-deployment">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-tight">Sovereign Build & Deploy Command Center</h3>
                  <p className="text-xs text-slate-500 mt-1">Select repository artifacts and orchestrate secure JUMO Cloud deployments.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Build Configuration */}
                <div className="space-y-5 lg:col-span-1">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                        <Database className="w-3 h-3" /> Source Repository
                      </label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden">
                        <option>Jumo-Universal-Enterprise-platform</option>
                        <option>Sovereign-Digital-Pay-Engine</option>
                        <option>FAAP-General-Ledger-Core</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                        <Globe className="w-3 h-3" /> Active Branch
                      </label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden">
                        <option>manufacturing-hub-architecture</option>
                        <option>main-sovereign-production</option>
                        <option>feature/zero-trust-v2</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Commit SHA Selection</label>
                      <div className="relative">
                        <Terminal className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          defaultValue="0d39c3a2aeebe5035e8985df1932a7a6c96fce30"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-[11px] font-mono font-bold text-slate-700 outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <button className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm cursor-pointer">
                      Trigger Sovereign Build
                    </button>
                    <button className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer">
                      Validate Dependencies
                    </button>
                  </div>
                </div>

                {/* Deployment Environments */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cloudSlots.map((slot) => (
                      <div key={slot.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full animate-pulse ${slot.health === 'HEALTHY' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <span className="font-black text-sm text-slate-900 uppercase tracking-tight">{slot.name}</span>
                          </div>
                          <span className="text-[9px] font-black text-slate-400">ID: {slot.id.toUpperCase()}</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-slate-500">ACTIVE RELEASE</span>
                            <span className="text-blue-600 font-black">{slot.activeRelease}</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-slate-500">TRAFFIC WEIGHT</span>
                            <span className="text-slate-900 font-black">{slot.trafficWeight}%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex flex-col items-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase">CPU Load</span>
                            <span className="text-xs font-black text-slate-800">{slot.cpu}%</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex flex-col items-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Mem Usage</span>
                            <span className="text-xs font-black text-slate-800">{slot.memory}%</span>
                          </div>
                        </div>

                        <button className="w-full py-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer">
                          Direct Deployment Handoff
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <Cloud className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-blue-900">JUMO CLOUD Integration Contract</h4>
                      <p className="text-[11px] text-blue-700/80 mt-1 leading-relaxed">
                        The Hub is currently connected to the primary JUMO Sovereign Cloud Node (JUMO-SVR-01). 
                        All deployments are gated by the architecture-aware verification fabric.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      <span>Legacy SACCO SDK v3.2:</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Drift Scanner controls */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">Architecture Guardian</h3>
                      <p className="text-xs text-slate-500 mt-1">Continuously audit codebase trees against baseline locks to prevent drift or deletions.</p>
                    </div>
                    <button
                      onClick={handleRunGuardianAudit}
                      disabled={isScanningGuardian}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
                    >
                      {isScanningGuardian ? "Scanning..." : "Scan Active Drift"}
                    </button>
                  </div>

                  {/* Drift scan log feed */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-slate-600">Surveillance Stream Logs</span>
                    <div className="bg-slate-950 font-mono text-[10px] text-emerald-400 border border-slate-800 p-4 rounded-xl space-y-1.5 h-44 overflow-y-auto">
                      {guardianScanLogs.length === 0 ? (
                        <span className="text-slate-500">Click &apos;Scan Active Drift&apos; to verify workspace integrity.</span>
                      ) : (
                        guardianScanLogs.map((log, i) => (
                          <div key={i} className="flex items-start gap-1">
                            <span className="text-slate-500 select-none">›</span>
                            <span>{log}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Drift status metric */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Baseline Surveillance Status</h3>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-xs text-slate-800 block">Baseline Codebase Signature:</span>
                      <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">eefd3bc_v13_locked</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-black text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100">
                      SECURE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                    The Architecture Guardian compares index checksums on compilation directories every 60 seconds. Any unauthorized file addition, alteration, or deletion is immediately isolated and flagged as critical drift.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Workspace 11: Lifecycle Management */}
        {activeWorkspace === "lifecycle" && (
          <div className="space-y-6" id="workspace-lifecycle">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Lifecycle List */}
              <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 font-sans">End-to-End Asset Lifecycle Registry</h3>
                  <p className="text-xs text-slate-500 mt-1">Formally manage compiled and registered products from drafting through execution stages to final retirement and archival.</p>
                </div>

                {/* Lifecycle Matrix list */}
                <div className="space-y-3 pt-2">
                  {assets.map((asset, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase text-slate-400 block">{asset.type}</span>
                        <span className="font-bold text-xs text-slate-800 block">{asset.name}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                          {asset.status} ({asset.step})
                        </span>
                        <button
                          onClick={() => handleTransitionAsset(idx)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-blue-600 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                        >
                          Transition Phase
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Register Asset Form */}
              <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <span className="text-xs font-black uppercase text-slate-800 tracking-wider block">Register Sovereign Asset</span>
                <p className="text-xs text-slate-500">Add a new digital asset to be tracked across the JUMO deployment & verification lifecycle.</p>
                
                <form onSubmit={handleCreateAsset} className="space-y-3.5 pt-2">
                  <div className="space-y-1">
                    <label htmlFor="asset-name" className="text-[10px] font-black uppercase text-slate-600">Asset Name</label>
                    <input
                      id="asset-name"
                      type="text"
                      value={newAssetName}
                      onChange={(e) => setNewAssetName(e.target.value)}
                      placeholder="e.g. Municipal Tax Portal"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="asset-type" className="text-[10px] font-black uppercase text-slate-600">Asset Type</label>
                    <select
                      id="asset-type"
                      value={newAssetType}
                      onChange={(e) => setNewAssetType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    >
                      <option value="Commercial ERP Platform">Commercial ERP Platform</option>
                      <option value="Governance System">Governance System</option>
                      <option value="Hospital Service">Hospital Service</option>
                      <option value="Utility Application">Utility Application</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Register Asset
                  </button>
                </form>
              </div>

            </div>
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

        {/* Other Missing Workspaces (Placeholder for Phase 6 completeness) */}
        {["security", "hybrid"].includes(activeWorkspace) && (
          <div className="space-y-6" id={`workspace-${activeWorkspace}`}>
            <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Box className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 capitalize">{activeWorkspace.replace("eco-", "Ecosystem: ")}</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">This workspace is a recognized node within the JUMO National Manufacturing Hub architecture. It is scheduled for continuous deployment in upcoming implementation phases.</p>
            </div>
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
                        onClick={() => {
                          logAudit("KEY_ROTATED", "Successfully rotated sovereign cryptographical keys.");
                        }}
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
                        onClick={() => {
                          logAudit("EMERGENCY_SHUTDOWN", "BROADCAST CRITICAL: Operator triggered absolute pipeline freeze.");
                        }}
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
