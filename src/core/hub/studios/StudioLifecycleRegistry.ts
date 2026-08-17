// JUMO UEOS — Dynamic Studio Lifecycle Registry
// Standardizes per-studio lifecycle stage declarations and transitions.
// Standard: JDPM-10001 Studio Lifecycle Navigation Architecture

export interface StudioLifecycleStage {
  id: string;
  code: string;
  name: string;
  description: string;
  order: number;
  capabilities: string[];
  requiredRoles: string[];
  requiredServices: string[];
  requiredEvidence: string[];
  entryConditions: string[];
  exitConditions: string[];
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
}

export interface StudioLifecycleDefinition {
  studioId: string;
  studioName: string;
  category: 'PLATFORM' | 'MANUFACTURING' | 'ASSURANCE' | 'OPERATIONS' | 'GOVERNANCE';
  stages: StudioLifecycleStage[];
  activeStageId: string;
  globalStageMapping?: string[]; // IDs from GlobalManufacturingLifecycleRegistry
}

export class StudioLifecycleRegistry {
  private static instance: StudioLifecycleRegistry;
  private lifecycles = new Map<string, StudioLifecycleDefinition>();

  private constructor() {
    this.bootstrapStudioLifecycles();
  }

  public static getInstance(): StudioLifecycleRegistry {
    if (!StudioLifecycleRegistry.instance) {
      StudioLifecycleRegistry.instance = new StudioLifecycleRegistry();
    }
    return StudioLifecycleRegistry.instance;
  }

  public registerStudioLifecycle(definition: StudioLifecycleDefinition): void {
    this.lifecycles.set(definition.studioId, definition);
  }

  public getStudioLifecycle(studioId: string): StudioLifecycleDefinition | undefined {
    return this.lifecycles.get(studioId);
  }

  public getAllStudioLifecycles(): StudioLifecycleDefinition[] {
    return Array.from(this.lifecycles.values());
  }

  public setActiveStage(studioId: string, stageId: string): void {
    const studio = this.lifecycles.get(studioId);
    if (studio) {
      const stageExists = studio.stages.some(s => s.id === stageId);
      if (stageExists) {
        studio.activeStageId = stageId;
      }
    }
  }

  private bootstrapStudioLifecycles(): void {
    // 1. Specification Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'specification',
      studioName: 'Specification & Intake Studio',
      category: 'PLATFORM',
      activeStageId: 'INTAKE',
      globalStageMapping: ['01_INTENT', '02_SPECIFICATION'],
      stages: [
        {
          id: 'INTAKE',
          code: 'INTAKE',
          name: 'Intake',
          description: 'Sovereign problem statement & mandate intake',
          order: 1,
          capabilities: ['MANDATE_INTAKE'],
          requiredRoles: ['GOV_SPECIALIST'],
          requiredServices: ['SpecificationService'],
          requiredEvidence: ['Sovereign Mandate Document'],
          entryConditions: ['Project Initialization'],
          exitConditions: ['Mandate Accepted'],
          status: 'COMPLETED'
        },
        {
          id: 'REQUIREMENTS',
          code: 'REQUIREMENTS',
          name: 'Requirements',
          description: '19-layer technical parameter specification',
          order: 2,
          capabilities: ['SCHEMA_DEFINITION'],
          requiredRoles: ['SPEC_ARCHITECT'],
          requiredServices: ['SpecificationService'],
          requiredEvidence: ['19-Layer Parameter Draft'],
          entryConditions: ['Mandate Accepted'],
          exitConditions: ['Schema Validated'],
          status: 'IN_PROGRESS'
        },
        {
          id: 'SCOPE',
          code: 'SCOPE',
          name: 'Scope',
          description: 'Tenancy, user population & capacity bounds',
          order: 3,
          capabilities: ['CAPACITY_PLANNING'],
          requiredRoles: ['SPEC_ARCHITECT'],
          requiredServices: ['TenancyEngine'],
          requiredEvidence: ['Capacity Matrix'],
          entryConditions: ['Schema Validated'],
          exitConditions: ['Scope Finalized'],
          status: 'PENDING'
        },
        {
          id: 'PRODUCT_DEFINITION',
          code: 'PRODUCT_DEFINITION',
          name: 'Product Definition',
          description: 'ERP/Commercial/Software product classification',
          order: 4,
          capabilities: ['PRODUCT_CLASSIFICATION'],
          requiredRoles: ['PRODUCT_OWNER'],
          requiredServices: ['CatalogRegistry'],
          requiredEvidence: ['Product Classification Record'],
          entryConditions: ['Scope Finalized'],
          exitConditions: ['Classification Complete'],
          status: 'PENDING'
        },
        {
          id: 'APPROVAL',
          code: 'APPROVAL',
          name: 'Approval',
          description: 'Specification contract approval & digital signature',
          order: 5,
          capabilities: ['DIGITAL_SIGNATURE'],
          requiredRoles: ['GOV_SPECIALIST'],
          requiredServices: ['SovereignGovernanceRegistry'],
          requiredEvidence: ['Signed SPEC Contract'],
          entryConditions: ['Classification Complete'],
          exitConditions: ['SPEC Approved'],
          status: 'PENDING'
        },
        {
          id: 'HANDOFF',
          code: 'HANDOFF',
          name: 'Handoff',
          description: 'Handoff to Architecture & Engineering Studio',
          order: 6,
          capabilities: ['PIPELINE_TRIGGER'],
          requiredRoles: ['SPEC_ARCHITECT'],
          requiredServices: ['DigitalProductManufacturingOrchestrator'],
          requiredEvidence: ['SPEC Handoff Hash'],
          entryConditions: ['SPEC Approved'],
          exitConditions: ['Architecture Pipeline Initiated'],
          status: 'PENDING'
        }
      ]
    });

    // 2. Architecture Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'architecture',
      studioName: 'Architecture & Engineering Studio',
      category: 'PLATFORM',
      activeStageId: 'DISCOVERY',
      globalStageMapping: ['03_ARCHITECTURE', '04_ENGINEERING'],
      stages: [
        { id: 'INTAKE', code: 'INTAKE', name: 'Intake', description: 'SPEC contract ingestion', order: 1, capabilities: ['SPEC_INGESTION'], requiredRoles: ['SYSTEM_ARCHITECT'], requiredServices: ['ArchitectureEngine'], requiredEvidence: ['SPEC Ingestion Log'], entryConditions: ['SPEC Available'], exitConditions: ['Ingested'], status: 'COMPLETED' },
        { id: 'DISCOVERY', code: 'DISCOVERY', name: 'Discovery', description: 'System topology & layer analysis', order: 2, capabilities: ['TOPOLOGY_ANALYSIS'], requiredRoles: ['SYSTEM_ARCHITECT'], requiredServices: ['ArchitectureEngine'], requiredEvidence: ['Layer Topology Map'], entryConditions: ['Ingested'], exitConditions: ['Topology Analyzed'], status: 'IN_PROGRESS' },
        { id: 'MODELING', code: 'MODELING', name: 'Modeling', description: 'Hybrid enclave & database schema design', order: 3, capabilities: ['SCHEMA_MODELING'], requiredRoles: ['DATABASE_ARCHITECT'], requiredServices: ['SchemaGenerator'], requiredEvidence: ['DDL Schema Blueprint'], entryConditions: ['Topology Analyzed'], exitConditions: ['Schema Modeled'], status: 'PENDING' },
        { id: 'DEPENDENCIES', code: 'DEPENDENCIES', name: 'Dependencies', description: 'Component dependency resolution', order: 4, capabilities: ['GRAPH_RESOLUTION'], requiredRoles: ['SYSTEM_ARCHITECT'], requiredServices: ['ComponentGenerator'], requiredEvidence: ['Dependency Graph Digest'], entryConditions: ['Schema Modeled'], exitConditions: ['Graph Resolved'], status: 'PENDING' },
        { id: 'REVIEW', code: 'REVIEW', name: 'Review', description: 'Zero-trust clearance & security review', order: 5, capabilities: ['SECURITY_REVIEW'], requiredRoles: ['SEC_OPERATOR'], requiredServices: ['SovereignGovernanceRegistry'], requiredEvidence: ['Security Review Matrix'], entryConditions: ['Graph Resolved'], exitConditions: ['Review Passed'], status: 'PENDING' },
        { id: 'ARCH_APPROVAL', code: 'ARCH_APPROVAL', name: 'Arch Approval', description: 'ARCH contract sign-off & blueprint dispatch', order: 6, capabilities: ['ARCH_SIGNOFF'], requiredRoles: ['CHIEF_ARCHITECT'], requiredServices: ['ArchitectureEngine'], requiredEvidence: ['ARCH Contract Signature'], entryConditions: ['Review Passed'], exitConditions: ['Blueprint Generated'], status: 'PENDING' }
      ]
    });

    // 3. Manufacturing Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'factory',
      studioName: 'Digital Product Factory',
      category: 'MANUFACTURING',
      activeStageId: 'ASSEMBLY',
      globalStageMapping: ['07_COMPONENT_MFG', '08_MODULE_MFG', '09_SERVICE_INTEGRATION_MFG', '10_APPLICATION_ASSEMBLY'],
      stages: [
        { id: 'READY', code: 'READY', name: 'Ready', description: 'BLUE contract ingestion & job queueing', order: 1, capabilities: ['JOB_QUEUING'], requiredRoles: ['FACT_ENGINEER'], requiredServices: ['ManufacturingJobEngine'], requiredEvidence: ['BLUE Ingest Manifest'], entryConditions: ['BLUE Approved'], exitConditions: ['Job Queued'], status: 'COMPLETED' },
        { id: 'COMPONENTS', code: 'COMPONENTS', name: 'Components', description: 'Component subfactory compilation', order: 2, capabilities: ['COMPONENT_BUILD'], requiredRoles: ['FACT_ENGINEER'], requiredServices: ['DigitalComponentFactory'], requiredEvidence: ['Component Build Hash'], entryConditions: ['Job Queued'], exitConditions: ['Components Compiled'], status: 'COMPLETED' },
        { id: 'MODULES', code: 'MODULES', name: 'Modules', description: 'Module assembly & feature binding', order: 3, capabilities: ['MODULE_BUILD'], requiredRoles: ['FACT_ENGINEER'], requiredServices: ['DigitalModuleFactory'], requiredEvidence: ['Module Manifest'], entryConditions: ['Components Compiled'], exitConditions: ['Modules Assembled'], status: 'IN_PROGRESS' },
        { id: 'SERVICES', code: 'SERVICES', name: 'Services', description: 'API & RPC gateway compilation', order: 4, capabilities: ['SERVICE_BUILD'], requiredRoles: ['FACT_ENGINEER'], requiredServices: ['DigitalServiceFactory'], requiredEvidence: ['Service API Digest'], entryConditions: ['Modules Assembled'], exitConditions: ['Services Compiled'], status: 'PENDING' },
        { id: 'ASSEMBLY', code: 'ASSEMBLY', name: 'Assembly', description: 'Unified product bundle synthesis', order: 5, capabilities: ['PRODUCT_SYNTHESIS'], requiredRoles: ['FACT_ENGINEER'], requiredServices: ['DigitalProductFactory'], requiredEvidence: ['MFG Build Bundle'], entryConditions: ['Services Compiled'], exitConditions: ['Bundle Synthesized'], status: 'PENDING' },
        { id: 'MFG_COMPLETE', code: 'MFG_COMPLETE', name: 'MFG Complete', description: 'Manufacturing completed & handoff to Assurance', order: 6, capabilities: ['MFG_RELEASE'], requiredRoles: ['FACT_ENGINEER'], requiredServices: ['DigitalProductManufacturingOrchestrator'], requiredEvidence: ['MFG Completion Certificate'], entryConditions: ['Bundle Synthesized'], exitConditions: ['Assurance Queue Initiated'], status: 'PENDING' }
      ]
    });

    // 4. Verification Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'verification',
      studioName: 'Product Assurance & Verification Studio',
      category: 'ASSURANCE',
      activeStageId: 'STATIC_ANALYSIS',
      globalStageMapping: ['12_VERIFICATION_VALIDATION'],
      stages: [
        { id: 'INTAKE', code: 'INTAKE', name: 'Intake', description: 'MFG bundle ingestion for testing', order: 1, capabilities: ['BUNDLE_INGESTION'], requiredRoles: ['QA_SPECIALIST'], requiredServices: ['VerificationEngine'], requiredEvidence: ['Ingestion Manifest'], entryConditions: ['MFG Complete'], exitConditions: ['Ready for Test'], status: 'COMPLETED' },
        { id: 'STATIC_ANALYSIS', code: 'STATIC_ANALYSIS', name: 'Static Analysis', description: 'Code quality & AST static analysis', order: 2, capabilities: ['STATIC_CHECK'], requiredRoles: ['QA_SPECIALIST'], requiredServices: ['LintService'], requiredEvidence: ['Static Analysis Report'], entryConditions: ['Ready for Test'], exitConditions: ['Static Passed'], status: 'IN_PROGRESS' },
        { id: 'FUNCTIONAL_TEST', code: 'FUNCTIONAL_TEST', name: 'Functional Test', description: 'Unit & integration test suite execution', order: 3, capabilities: ['UNIT_TESTING'], requiredRoles: ['QA_SPECIALIST'], requiredServices: ['TestSuiteRunner'], requiredEvidence: ['Unit Test Execution Log'], entryConditions: ['Static Passed'], exitConditions: ['Functional Passed'], status: 'PENDING' },
        { id: 'SECURITY', code: 'SECURITY', name: 'Security', description: 'FIPS-140-3 & Zero-Trust vulnerability scan', order: 4, capabilities: ['VULN_SCAN'], requiredRoles: ['SEC_OPERATOR'], requiredServices: ['AegisSecurityService'], requiredEvidence: ['Vulnerability Scan Certificate'], entryConditions: ['Functional Passed'], exitConditions: ['Security Cleared'], status: 'PENDING' },
        { id: 'PERFORMANCE', code: 'PERFORMANCE', name: 'Performance', description: 'Load, concurrency & memory stress testing', order: 5, capabilities: ['STRESS_TESTING'], requiredRoles: ['QA_SPECIALIST'], requiredServices: ['StressTestRunner'], requiredEvidence: ['Performance Metrics Log'], entryConditions: ['Security Cleared'], exitConditions: ['Performance Met'], status: 'PENDING' },
        { id: 'DECISION', code: 'DECISION', name: 'Decision', description: 'VER artifact generation & certification handoff', order: 6, capabilities: ['VER_ISSUANCE'], requiredRoles: ['QA_LEAD'], requiredServices: ['SovereignGovernanceRegistry'], requiredEvidence: ['Signed VER Artifact'], entryConditions: ['Performance Met'], exitConditions: ['VER Certified'], status: 'PENDING' }
      ]
    });

    // 5. Certification Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'certification',
      studioName: 'Certification & Sovereign Release Studio',
      category: 'ASSURANCE',
      activeStageId: 'EVIDENCE_REVIEW',
      globalStageMapping: ['13_CERTIFICATION_RELEASE'],
      stages: [
        { id: 'EVIDENCE_REVIEW', code: 'EVIDENCE_REVIEW', name: 'Evidence Review', description: 'Comprehensive audit evidence audit', order: 1, capabilities: ['EVIDENCE_AUDIT'], requiredRoles: ['AUDITOR'], requiredServices: ['JumoAuditorPlatform'], requiredEvidence: ['Evidence Verification Log'], entryConditions: ['VER Complete'], exitConditions: ['Evidence Approved'], status: 'IN_PROGRESS' },
        { id: 'COMPLIANCE', code: 'COMPLIANCE', name: 'Compliance', description: 'National standard & regulatory check', order: 2, capabilities: ['COMPLIANCE_CHECK'], requiredRoles: ['GOV_SPECIALIST'], requiredServices: ['SovereignGovernanceRegistry'], requiredEvidence: ['Regulatory Check Sheet'], entryConditions: ['Evidence Approved'], exitConditions: ['Compliance Approved'], status: 'PENDING' },
        { id: 'QUALITY', code: 'QUALITY', name: 'Quality', description: 'Sovereign quality score calculation', order: 3, capabilities: ['QUALITY_RATING'], requiredRoles: ['QA_LEAD'], requiredServices: ['QualityRatingEngine'], requiredEvidence: ['Quality Score Certificate'], entryConditions: ['Compliance Approved'], exitConditions: ['Score Calculated'], status: 'PENDING' },
        { id: 'APPROVAL', code: 'APPROVAL', name: 'Approval', description: 'Sovereign authority digital sign-off', order: 4, capabilities: ['NATIONAL_SIGNOFF'], requiredRoles: ['SOVEREIGN_AUTHORITY'], requiredServices: ['SovereignGovernanceRegistry'], requiredEvidence: ['Authority Seal Signature'], entryConditions: ['Score Calculated'], exitConditions: ['Signed'], status: 'PENDING' },
        { id: 'CERTIFICATE', code: 'CERTIFICATE', name: 'Certificate', description: 'JDPM CERT artifact & cryptographic passport', order: 5, capabilities: ['CERT_ISSUANCE'], requiredRoles: ['SOVEREIGN_AUTHORITY'], requiredServices: ['JDPM2608LineageEngine'], requiredEvidence: ['JDPM CERT Artifact'], entryConditions: ['Signed'], exitConditions: ['Passport Issued'], status: 'PENDING' },
        { id: 'RELEASE', code: 'RELEASE', name: 'Release', description: 'National repository publication & deployment authorization', order: 6, capabilities: ['RELEASE_ISSUANCE'], requiredRoles: ['SOVEREIGN_AUTHORITY'], requiredServices: ['ReleaseRegistry'], requiredEvidence: ['Release Clearance Certificate'], entryConditions: ['Passport Issued'], exitConditions: ['Authorized for Deployment'], status: 'PENDING' }
      ]
    });

    // 6. Deployment / Provisioning Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'deployment',
      studioName: 'Provisioning & Deployment Studio',
      category: 'OPERATIONS',
      activeStageId: 'ENVIRONMENT',
      globalStageMapping: ['14_PROVISIONING_DEPLOYMENT', '15_INSTITUTIONAL_COMMISSIONING'],
      stages: [
        { id: 'INTAKE', code: 'INTAKE', name: 'Release Intake', description: 'CERT artifact & release manifest ingestion', order: 1, capabilities: ['RELEASE_INGESTION'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['DeploymentEngine'], requiredEvidence: ['Release Manifest Log'], entryConditions: ['CERT Approved'], exitConditions: ['Release Ingested'], status: 'COMPLETED' },
        { id: 'ENVIRONMENT', code: 'ENVIRONMENT', name: 'Environment', description: 'Sovereign cloud enclave allocation', order: 2, capabilities: ['ENCLAVE_PROVISIONING'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['JumoCloudService'], requiredEvidence: ['Enclave Provisioning Certificate'], entryConditions: ['Release Ingested'], exitConditions: ['Enclave Ready'], status: 'IN_PROGRESS' },
        { id: 'PROVISIONING', code: 'PROVISIONING', name: 'Provisioning', description: 'Database schema migration & service binding', order: 3, capabilities: ['DB_MIGRATION'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['DatabaseMigrationEngine'], requiredEvidence: ['Schema Migration Digest'], entryConditions: ['Enclave Ready'], exitConditions: ['Database Provisioned'], status: 'PENDING' },
        { id: 'DEPLOYMENT', code: 'DEPLOYMENT', name: 'Deployment', description: 'Application container & server deployment', order: 4, capabilities: ['CONTAINER_DEPLOYMENT'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['DeploymentEngine'], requiredEvidence: ['Container Deployment Digest'], entryConditions: ['Database Provisioned'], exitConditions: ['Deployed'], status: 'PENDING' },
        { id: 'HEALTH_CHECK', code: 'HEALTH_CHECK', name: 'Health Check', description: 'Automated post-deployment ping & smoke test', order: 5, capabilities: ['SMOKE_TEST'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['HealthMonitorService'], requiredEvidence: ['Health Check Matrix'], entryConditions: ['Deployed'], exitConditions: ['Health Operational'], status: 'PENDING' },
        { id: 'COMMISSIONING', code: 'COMMISSIONING', name: 'Commissioning', description: 'Institutional commissioning & handover', order: 6, capabilities: ['COMMISSIONING_HANDOVER'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['InstitutionalCommissioningEngine'], requiredEvidence: ['Commissioning Certificate'], entryConditions: ['Health Operational'], exitConditions: ['Live Operational'], status: 'PENDING' }
      ]
    });

    // 7. Operations Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'overview',
      studioName: 'Runtime Operations Studio',
      category: 'OPERATIONS',
      activeStageId: 'MONITORING',
      globalStageMapping: ['16_GO_LIVE_ACCEPTANCE', '17_OPERATIONS_MONITORING', '18_MAINTENANCE_SUPPORT'],
      stages: [
        { id: 'GO_LIVE', code: 'GO_LIVE', name: 'Go-Live', description: 'Public endpoint cutover & DNS resolution', order: 1, capabilities: ['CUTOVER'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['DNSGateway'], requiredEvidence: ['Go-Live Log'], entryConditions: ['Commissioned'], exitConditions: ['Live'], status: 'COMPLETED' },
        { id: 'MONITORING', code: 'MONITORING', name: 'Monitoring', description: 'Real-time telemetry, latency & CPU tracking', order: 2, capabilities: ['TELEMETRY'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['TelemetryService'], requiredEvidence: ['Telemetry Feed'], entryConditions: ['Live'], exitConditions: ['Normal Operations'], status: 'IN_PROGRESS' },
        { id: 'INCIDENTS', code: 'INCIDENTS', name: 'Incidents', description: 'Incident response, auto-healing & alert routing', order: 3, capabilities: ['INCIDENT_HEALING'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['SelfHealingEngine'], requiredEvidence: ['Incident Log'], entryConditions: ['Alert Triggered'], exitConditions: ['Resolved'], status: 'PENDING' },
        { id: 'MAINTENANCE', code: 'MAINTENANCE', name: 'Maintenance', description: 'Scheduled patch application & backup', order: 4, capabilities: ['BACKUP_PATCH'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['MaintenanceEngine'], requiredEvidence: ['Backup Integrity Hash'], entryConditions: ['Window Reached'], exitConditions: ['Patched'], status: 'PENDING' },
        { id: 'OPTIMIZATION', code: 'OPTIMIZATION', name: 'Optimization', description: 'Resource auto-scaling & memory tuning', order: 5, capabilities: ['AUTOSCALING'], requiredRoles: ['OPS_ENGINEER'], requiredServices: ['AutoScalerService'], requiredEvidence: ['Optimization Log'], entryConditions: ['Patched'], exitConditions: ['Optimized'], status: 'PENDING' }
      ]
    });

    // 8. Sovereign Control Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'control',
      studioName: 'Sovereign Control & Governance Studio',
      category: 'GOVERNANCE',
      activeStageId: 'AUDIT',
      globalStageMapping: ['06_DESIGN_ASSURANCE', '13_CERTIFICATION_RELEASE'],
      stages: [
        { id: 'POLICY', code: 'POLICY', name: 'Policy', description: 'Zero-trust security policy definition', order: 1, capabilities: ['POLICY_ENGINE'], requiredRoles: ['SEC_OPERATOR'], requiredServices: ['SovereignGovernanceRegistry'], requiredEvidence: ['Policy Definition Spec'], entryConditions: ['Policy Ingestion'], exitConditions: ['Policy Active'], status: 'COMPLETED' },
        { id: 'CLEARANCE', code: 'CLEARANCE', name: 'Clearance', description: 'Identity, tenant & HSM key clearance management', order: 2, capabilities: ['CLEARANCE_MGMT'], requiredRoles: ['SEC_OPERATOR'], requiredServices: ['IdentityService'], requiredEvidence: ['Clearance Matrix'], entryConditions: ['Policy Active'], exitConditions: ['Clearance Validated'], status: 'COMPLETED' },
        { id: 'AUDIT', code: 'AUDIT', name: 'Audit', description: 'Immutability ledger verification & tamper check', order: 3, capabilities: ['LEDGER_AUDIT'], requiredRoles: ['AUDITOR'], requiredServices: ['EnterpriseLedgerEngine'], requiredEvidence: ['Audit Trail Certificate'], entryConditions: ['Clearance Validated'], exitConditions: ['Audit Complete'], status: 'IN_PROGRESS' },
        { id: 'GOVERNANCE_GATE', code: 'GOVERNANCE_GATE', name: 'Governance Gate', description: 'System-wide gate evaluation & emergency controls', order: 4, capabilities: ['EMERGENCY_OVERRIDE'], requiredRoles: ['SOVEREIGN_AUTHORITY'], requiredServices: ['SovereignControlEngine'], requiredEvidence: ['Governance Decision Record'], entryConditions: ['Audit Complete'], exitConditions: ['Gate Passed'], status: 'PENDING' }
      ]
    });

    // 9. Engineering Workforce Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'engineering',
      studioName: 'Engineering Workforce Studio',
      category: 'MANUFACTURING',
      activeStageId: 'SWARM_ALLOCATION',
      globalStageMapping: ['04_ENGINEERING', '05_MODULE_BUILD'],
      stages: [
        { id: 'INTAKE', code: 'INTAKE', name: 'Workforce Intake', description: 'Task directive ingestion & agent routing', order: 1, capabilities: ['TASK_ROUTING'], requiredRoles: ['ENGINEER'], requiredServices: ['JumoWorkforceOrchestrator'], requiredEvidence: ['Task Ingestion Manifest'], entryConditions: ['Blueprint Ready'], exitConditions: ['Task Routed'], status: 'COMPLETED' },
        { id: 'LOGIC_DESIGN', code: 'LOGIC_DESIGN', name: 'Logic Design', description: 'Algorithmic decomposition & schema mapping', order: 2, capabilities: ['LOGIC_DECOMPOSITION'], requiredRoles: ['ENGINEER'], requiredServices: ['JumoAIGatewayEngine'], requiredEvidence: ['Logic Blueprint Digest'], entryConditions: ['Task Routed'], exitConditions: ['Logic Decomposed'], status: 'COMPLETED' },
        { id: 'SWARM_ALLOCATION', code: 'SWARM_ALLOCATION', name: 'Swarm Allocation', description: '420+ Cognitive agent specialization assignment', order: 3, capabilities: ['AGENT_ALLOCATION'], requiredRoles: ['ENGINEER'], requiredServices: ['JumoAIAgentRegistry'], requiredEvidence: ['Agent Allocation Matrix'], entryConditions: ['Logic Decomposed'], exitConditions: ['Agents Assigned'], status: 'IN_PROGRESS' },
        { id: 'CODE_COMPILATION', code: 'CODE_COMPILATION', name: 'Code Compilation', description: 'Autonomous source synthesis & linting', order: 4, capabilities: ['CODE_SYNTHESIS'], requiredRoles: ['ENGINEER'], requiredServices: ['CodexEngineeringProvider'], requiredEvidence: ['Source Build Hash'], entryConditions: ['Agents Assigned'], exitConditions: ['Source Compiled'], status: 'PENDING' },
        { id: 'UNIT_VERIFICATION', code: 'UNIT_VERIFICATION', name: 'Unit Verification', description: 'FIPS & zero-trust unit verification', order: 5, capabilities: ['UNIT_TESTING'], requiredRoles: ['QA_SPECIALIST'], requiredServices: ['VerificationEngine'], requiredEvidence: ['Verification Report'], entryConditions: ['Source Compiled'], exitConditions: ['Verification Passed'], status: 'PENDING' }
      ]
    });

    // 10. FAAP Sovereign Financial Ledger Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'faap',
      studioName: 'FAAP Sovereign Financial Ledger Studio',
      category: 'GOVERNANCE',
      activeStageId: 'TREASURY_POSITION',
      globalStageMapping: ['19_FINANCIAL_AUDIT', '20_RECONCILIATION'],
      stages: [
        { id: 'JOURNAL_INGEST', code: 'JOURNAL_INGEST', name: 'Journal Ingest', description: 'ISO 20022 XML financial journal ingestion', order: 1, capabilities: ['FINANCIAL_INGEST'], requiredRoles: ['AUDITOR'], requiredServices: ['FAAPService'], requiredEvidence: ['Journal Ingest Log'], entryConditions: ['Journal Received'], exitConditions: ['Journal Validated'], status: 'COMPLETED' },
        { id: 'TREASURY_POSITION', code: 'TREASURY_POSITION', name: 'Treasury Position', description: 'Sovereign capital & liquidity evaluation', order: 2, capabilities: ['TREASURY_AUDIT'], requiredRoles: ['AUDITOR'], requiredServices: ['FAAPService'], requiredEvidence: ['Treasury Audit Record'], entryConditions: ['Journal Validated'], exitConditions: ['Liquidity Verified'], status: 'IN_PROGRESS' },
        { id: 'LEDGER_SETTLEMENT', code: 'LEDGER_SETTLEMENT', name: 'Ledger Settlement', description: 'Hash-chained double-entry ledger settlement', order: 3, capabilities: ['LEDGER_SETTLEMENT'], requiredRoles: ['AUDITOR'], requiredServices: ['EnterpriseLedgerEngine'], requiredEvidence: ['Settlement Certificate'], entryConditions: ['Liquidity Verified'], exitConditions: ['Ledger Settled'], status: 'PENDING' }
      ]
    });

    // 11. Configuration & Parameter Governance Studio Lifecycle
    this.registerStudioLifecycle({
      studioId: 'config',
      studioName: 'Hierarchical Configuration Governance Studio',
      category: 'GOVERNANCE',
      activeStageId: 'PARAMETER_RESOLVE',
      globalStageMapping: ['02_SPECIFICATION', '06_DESIGN_ASSURANCE'],
      stages: [
        { id: 'SCOPE_TREE', code: 'SCOPE_TREE', name: 'Scope Tree', description: '7-Layer scope hierarchy tree analysis', order: 1, capabilities: ['SCOPE_ANALYSIS'], requiredRoles: ['GOV_SPECIALIST'], requiredServices: ['HierarchicalConfigurationEngine'], requiredEvidence: ['Scope Tree Digest'], entryConditions: ['Config Ingest'], exitConditions: ['Scope Verified'], status: 'COMPLETED' },
        { id: 'PARAMETER_RESOLVE', code: 'PARAMETER_RESOLVE', name: 'Parameter Resolve', description: 'Hierarchical override & default fallback resolution', order: 2, capabilities: ['PARAMETER_RESOLUTION'], requiredRoles: ['GOV_SPECIALIST'], requiredServices: ['HierarchicalConfigurationEngine'], requiredEvidence: ['Resolved Parameter Map'], entryConditions: ['Scope Verified'], exitConditions: ['Parameters Resolved'], status: 'IN_PROGRESS' },
        { id: 'DRIFT_DETECTION', code: 'DRIFT_DETECTION', name: 'Drift Detection', description: 'Zero-trust parameter drift detection audit', order: 3, capabilities: ['DRIFT_AUDIT'], requiredRoles: ['AUDITOR'], requiredServices: ['HierarchicalConfigurationEngine'], requiredEvidence: ['Drift Audit Report'], entryConditions: ['Parameters Resolved'], exitConditions: ['Drift Cleared'], status: 'PENDING' }
      ]
    });
  }
}

export const studioLifecycleRegistry = StudioLifecycleRegistry.getInstance();
