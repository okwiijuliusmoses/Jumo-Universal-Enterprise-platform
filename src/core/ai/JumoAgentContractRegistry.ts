// JUMO UEOS — JUMO Agent Contract Registry
// Decouples local AI workforce identities and capabilities from underlying external model providers.

import { SovereignOperatingStateService } from "../runtime/sovereignState";
import { AgentContract } from "../runtime/sovereignState.types";

export class JumoAgentContractRegistry {
  private static baselineContracts: AgentContract[] = [
    {
      agentId: "ag-contract-gov",
      name: "Governance Agent",
      role: "GOVERNANCE",
      purpose: "Enforce institutional policy, compliance, audit trails, and ledger integrity.",
      capabilities: ["Policy Evaluation", "Audit Logging", "Compliance Verification", "Ledger Guarding"],
      tools: ["GovernanceEngine", "SovereignGovernanceRegistry", "AuditSystem"],
      permissions: ["READ_GOVERNANCE", "WRITE_AUDIT", "ENFORCE_POLICY"],
      knowledgeSources: ["NationalEnterpriseStandard", "SovereignState"],
      reasoningPolicy: "STRICT_COMPLIANCE",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 99.5, maxLatencyMs: 250 },
      securitySpec: { isolationLevel: "SOVEREIGN_TENANT", dataBoundary: "RESTRICTED" },
      status: "ACTIVE",
      version: "1.0.0"
    },
    {
      agentId: "ag-contract-mfg",
      name: "Manufacturing Agent",
      role: "MANUFACTURING",
      purpose: "Orchestrate digital product manufacturing, build suites, and module generation.",
      capabilities: ["ERP Manufacturing", "Code Compilation", "Module Synthesis"],
      tools: ["DigitalProductManufacturingOrchestrator", "ManufacturingEngine"],
      permissions: ["WRITE_BLUEPRINT", "EXECUTE_BUILD"],
      knowledgeSources: ["ERPFactoryEngine", "UniversalHubRegistry"],
      reasoningPolicy: "DETERMINISTIC_MANUFACTURING",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 99.0, maxLatencyMs: 300 },
      securitySpec: { isolationLevel: "SOVEREIGN_TENANT", dataBoundary: "RESTRICTED" },
      status: "ACTIVE",
      version: "1.0.0"
    },
    {
      agentId: "ag-contract-arch",
      name: "Architecture Agent",
      role: "ARCHITECTURE",
      purpose: "Design system layers, verify architecture contracts, and manage specification schemas.",
      capabilities: ["Blueprint Synthesis", "Layer Validation", "Contract Verification"],
      tools: ["ArchitectureEngine", "ArchitectureIntelligenceService"],
      permissions: ["READ_ARCHITECTURE", "WRITE_SPECIFICATION"],
      knowledgeSources: ["ARCHITECTURE_LOCK.md", "JumoHybridArchitectureLayers"],
      reasoningPolicy: "ARCHITECTURAL_PARITY",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 99.8, maxLatencyMs: 200 },
      securitySpec: { isolationLevel: "SOVEREIGN_TENANT", dataBoundary: "RESTRICTED" },
      status: "ACTIVE",
      version: "1.0.0"
    },
    {
      agentId: "ag-contract-sec",
      name: "Security Agent",
      role: "SECURITY",
      purpose: "Enforce zero-trust boundaries, cryptography, token validation, and secret vaults.",
      capabilities: ["Cryptographic Signing", "Zero-Trust Guarding", "Token Verification"],
      tools: ["JumoSecretVault", "JumoCryptographicProvider", "SecurityGovernor"],
      permissions: ["GENERATE_TOKENS", "ENCRYPT_PAYLOAD", "AUDIT_SECURITY"],
      knowledgeSources: ["SecurityGovernor", "CryptographicSpec"],
      reasoningPolicy: "ZERO_TRUST_STRICT",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 100.0, maxLatencyMs: 150 },
      securitySpec: { isolationLevel: "AIR_GAPPED_VAULT", dataBoundary: "STRICTLY_ISOLATED" },
      status: "ACTIVE",
      version: "1.0.0"
    },
    {
      agentId: "ag-contract-verif",
      name: "Verification Agent",
      role: "VERIFICATION",
      purpose: "Execute automated verification suites, runtime health audits, and completeness gates.",
      capabilities: ["Post-Manufacturing Verification", "Runtime Health Audit", "Completeness Gate"],
      tools: ["JumoPostManufacturingVerificationEngine", "UniversalVerificationEngine"],
      permissions: ["EXECUTE_VERIFICATION", "WRITE_VERIFICATION_LOG"],
      knowledgeSources: ["VerificationEngine", "CompletenessRules"],
      reasoningPolicy: "RIGOROUS_PROOF",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 99.9, maxLatencyMs: 220 },
      securitySpec: { isolationLevel: "SOVEREIGN_TENANT", dataBoundary: "RESTRICTED" },
      status: "ACTIVE",
      version: "1.0.0"
    },
    {
      agentId: "ag-contract-fin",
      name: "Finance Agent",
      role: "FINANCE",
      purpose: "Manage ledger postings, treasury queues, revenue recognition, and commercial products.",
      capabilities: ["Ledger Posting", "Treasury Audit", "Revenue Recognition"],
      tools: ["LedgerPostingEngine", "JumoAutomatedTreasuryEngine", "TransactionOrchestrator"],
      permissions: ["WRITE_LEDGER", "READ_TREASURY"],
      knowledgeSources: ["FAAPEnterpriseRuntime", "FinancialPolicy"],
      reasoningPolicy: "AUDITABLE_TRANSACTIONAL",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 100.0, maxLatencyMs: 250 },
      securitySpec: { isolationLevel: "FINANCIAL_VAULT", dataBoundary: "ENCRYPTED" },
      status: "ACTIVE",
      version: "1.0.0"
    },
    {
      agentId: "ag-contract-edu",
      name: "Education Agent",
      role: "EDUCATION",
      purpose: "Onboard institution users, generate documentation, and guide workflow training.",
      capabilities: ["Interactive Guidance", "Documentation Synthesis", "Role Training"],
      tools: ["JumoFloatingAssistant", "KnowledgeRAGRenderer"],
      permissions: ["READ_DOCUMENTATION", "GUIDE_USER"],
      knowledgeSources: ["UserManuals", "WorkflowTemplates"],
      reasoningPolicy: "EMPATHIC_INSTRUCTIONAL",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 98.0, maxLatencyMs: 300 },
      securitySpec: { isolationLevel: "USER_ASSISTANT", dataBoundary: "PUBLIC_KNOWLEDGE" },
      status: "ACTIVE",
      version: "1.0.0"
    },
    {
      agentId: "ag-contract-maint",
      name: "Autonomous Maintenance Agent",
      role: "MAINTENANCE",
      purpose: "Detect, diagnose, plan, verify, repair, test, deploy, monitor, and rollback institutional faults.",
      capabilities: ["Exception Fingerprinting", "RCA Engine", "Patch Generation", "26-Step Pipeline"],
      tools: ["JumoAutonomousMaintenanceEngine", "JumoMaintenanceManufacturingPipeline"],
      permissions: ["DIAGNOSE_SYSTEM", "APPLY_PATCH", "EXECUTE_ROLLBACK"],
      knowledgeSources: ["UEOSDiagnostics", "SovereignStateLogs"],
      reasoningPolicy: "SELF_HEALING_WITH_GUARDRAILS",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 99.9, maxLatencyMs: 200 },
      securitySpec: { isolationLevel: "SOVEREIGN_TENANT", dataBoundary: "SCOPED_MAINTENANCE_TOKEN" },
      status: "ACTIVE",
      version: "1.0.0"
    },
    {
      agentId: "ag-contract-supp",
      name: "Support Agent",
      role: "SUPPORT",
      purpose: "Handle operational inquiries, diagnostic package formatting, and maintenance sessions.",
      capabilities: ["Diagnostic Intake", "Session Authorization", "Support Ticket Resolution"],
      tools: ["JumoFloatingAssistant", "DiagnosticsRenderer"],
      permissions: ["READ_DIAGNOSTICS", "CREATE_MAINTENANCE_SESSION"],
      knowledgeSources: ["UEOSSystemHealth", "SupportRunbooks"],
      reasoningPolicy: "SUPPORT_DIAGNOSTIC",
      primaryModel: "gemini-3.6-flash",
      fallbackModels: ["gpt-4o", "jumo-local-v1"],
      localModel: "jumo-local-v1",
      performanceSpec: { minAccuracyPercentage: 98.5, maxLatencyMs: 250 },
      securitySpec: { isolationLevel: "SOVEREIGN_TENANT", dataBoundary: "SCOPED_SUPPORT" },
      status: "ACTIVE",
      version: "1.0.0"
    }
  ];

  static initializeContracts(): void {
    SovereignOperatingStateService.updateState(draft => {
      if (!draft.agentContracts || draft.agentContracts.length === 0) {
        draft.agentContracts = [...this.baselineContracts];
      }
    });
  }

  static getContracts(): AgentContract[] {
    this.initializeContracts();
    return SovereignOperatingStateService.getState().agentContracts;
  }

  static getContractByRole(role: string): AgentContract | undefined {
    return this.getContracts().find(c => c.role.toLowerCase() === role.toLowerCase() || c.name.toLowerCase().includes(role.toLowerCase()));
  }

  static updateAgentModelPreference(agentId: string, primaryModel: string, fallbackModels: string[]): boolean {
    let updated = false;
    SovereignOperatingStateService.updateState(draft => {
      const target = draft.agentContracts.find(a => a.agentId === agentId);
      if (target) {
        target.primaryModel = primaryModel;
        target.fallbackModels = fallbackModels;
        updated = true;
      }
    });
    return updated;
  }
}
