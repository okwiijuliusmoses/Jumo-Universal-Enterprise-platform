// JUMO UEOS — Global Digital Product Manufacturing Lifecycle Registry
// Authoritative 20-Stage Lifecycle Registry preserving canonical SPEC->CERT artifact lineage.
// Standard: JDPM-10000 Global Manufacturing Expansion Standard

import { JDPMArtifactType } from './JDPM2608LineageEngine';

export interface GlobalLifecycleStageDescriptor {
  stageNumber: number; // 1 to 20+
  id: string; // e.g. '01_INTENT'
  code: string; // e.g. 'INTENT'
  name: string;
  description: string;
  canonicalArtifactType?: JDPMArtifactType; // Links to SPEC, ARCH, BLUE, MFG, VER, CERT
  category: 'SPECIFICATION' | 'ARCHITECTURE' | 'MANUFACTURING' | 'ASSURANCE' | 'DEPLOYMENT' | 'OPERATIONS' | 'LIFECYCLE';
  requiredInputs: string[];
  producedOutputs: string[];
  requiredSubfactories: string[];
  requiredAgents: string[];
  qualityGates: string[];
  evidenceRequired: string[];
  isMandatory: boolean;
}

export class GlobalManufacturingLifecycleRegistry {
  private static instance: GlobalManufacturingLifecycleRegistry;
  private stages = new Map<string, GlobalLifecycleStageDescriptor>();

  private constructor() {
    this.bootstrap20GlobalStages();
  }

  public static getInstance(): GlobalManufacturingLifecycleRegistry {
    if (!GlobalManufacturingLifecycleRegistry.instance) {
      GlobalManufacturingLifecycleRegistry.instance = new GlobalManufacturingLifecycleRegistry();
    }
    return GlobalManufacturingLifecycleRegistry.instance;
  }

  public static getAllStages(): GlobalLifecycleStageDescriptor[] {
    return GlobalManufacturingLifecycleRegistry.getInstance().getAllStages();
  }

  public registerStage(stage: GlobalLifecycleStageDescriptor): void {
    this.stages.set(stage.id, stage);
  }

  public getStage(id: string): GlobalLifecycleStageDescriptor | undefined {
    return this.stages.get(id);
  }

  public getAllStages(): GlobalLifecycleStageDescriptor[] {
    return Array.from(this.stages.values()).sort((a, b) => a.stageNumber - b.stageNumber);
  }

  public getStagesByCategory(category: GlobalLifecycleStageDescriptor['category']): GlobalLifecycleStageDescriptor[] {
    return this.getAllStages().filter(s => s.category === category);
  }

  private bootstrap20GlobalStages(): void {
    const defaultStages: GlobalLifecycleStageDescriptor[] = [
      {
        stageNumber: 1,
        id: '01_INTENT',
        code: 'INTENT',
        name: '01 — Intent & Demand Intake',
        description: 'Sovereign problem declaration, institutional need intake, and strategic alignment.',
        category: 'SPECIFICATION',
        requiredInputs: ['Problem Statement', 'Operating Organization'],
        producedOutputs: ['Intent Contract', 'Sovereign Mandate'],
        requiredSubfactories: ['INSTITUTIONAL_INSTALLATION_FACTORY'],
        requiredAgents: ['GOV_SPECIALIST'],
        qualityGates: ['Sovereign Mandate Approved'],
        evidenceRequired: ['Mandate Signing Certificate'],
        isMandatory: true
      },
      {
        stageNumber: 2,
        id: '02_SPECIFICATION',
        code: 'SPECIFICATION',
        name: '02 — Product Specification',
        description: 'Implementation-grade 19-layer specification contract formulation (SPEC).',
        canonicalArtifactType: 'SPEC',
        category: 'SPECIFICATION',
        requiredInputs: ['Intent Contract', 'Tenancy Schema'],
        producedOutputs: ['JDPM Specification Contract (SPEC)'],
        requiredSubfactories: ['INSTITUTIONAL_INSTALLATION_FACTORY'],
        requiredAgents: ['SPEC_ARCHITECT'],
        qualityGates: ['JDPM-1000 Completeness Gate'],
        evidenceRequired: ['Specification SHA-256 Digest'],
        isMandatory: true
      },
      {
        stageNumber: 3,
        id: '03_ARCHITECTURE',
        code: 'ARCHITECTURE',
        name: '03 — Hybrid Architecture Design',
        description: 'Multi-layer sovereign architecture, clearance mapping, and system topology (ARCH).',
        canonicalArtifactType: 'ARCH',
        category: 'ARCHITECTURE',
        requiredInputs: ['JDPM Specification Contract (SPEC)'],
        producedOutputs: ['JDPM Architecture Contract (ARCH)'],
        requiredSubfactories: ['DIGITAL_APPLICATION_FACTORY'],
        requiredAgents: ['SYSTEM_ARCHITECT'],
        qualityGates: ['JDPM-2000 Architectural Gate'],
        evidenceRequired: ['Architecture Verification Matrix'],
        isMandatory: true
      },
      {
        stageNumber: 4,
        id: '04_ENGINEERING',
        code: 'ENGINEERING',
        name: '04 — System Engineering',
        description: 'Deep technical schema engineering, database design, and interface definition.',
        category: 'ARCHITECTURE',
        requiredInputs: ['JDPM Architecture Contract (ARCH)'],
        producedOutputs: ['System Engineering Package'],
        requiredSubfactories: ['DIGITAL_COMPONENT_FACTORY', 'DIGITAL_MODULE_FACTORY'],
        requiredAgents: ['WORKFORCE_ORCHESTRATOR'],
        qualityGates: ['Schema Consistency Check'],
        evidenceRequired: ['Database DDL Digest'],
        isMandatory: true
      },
      {
        stageNumber: 5,
        id: '05_BLUEPRINT',
        code: 'BLUEPRINT',
        name: '05 — Digital Blueprint Ingestion',
        description: 'Component design, machine-readable dependency graphs, and assembly blueprints (BLUE).',
        canonicalArtifactType: 'BLUE',
        category: 'ARCHITECTURE',
        requiredInputs: ['System Engineering Package'],
        producedOutputs: ['JDPM Blueprint Contract (BLUE)'],
        requiredSubfactories: ['DIGITAL_MODULE_FACTORY'],
        requiredAgents: ['BLUEPRINT_ENGINEER'],
        qualityGates: ['Dependency Graph Resolution'],
        evidenceRequired: ['Blueprint Provenance Record'],
        isMandatory: true
      },
      {
        stageNumber: 6,
        id: '06_DESIGN_ASSURANCE',
        code: 'DESIGN_ASSURANCE',
        name: '06 — Design & Architectural Assurance',
        description: 'Pre-manufacturing zero-trust validation, security boundary verification, and drift checks.',
        category: 'ASSURANCE',
        requiredInputs: ['JDPM Blueprint Contract (BLUE)'],
        producedOutputs: ['Design Assurance Clearance'],
        requiredSubfactories: ['SECURITY_POLICY_FACTORY'],
        requiredAgents: ['SEC_OPERATOR'],
        qualityGates: ['Zero-Trust Policy Gate'],
        evidenceRequired: ['Design Security Certificate'],
        isMandatory: true
      },
      {
        stageNumber: 7,
        id: '07_COMPONENT_MFG',
        code: 'COMPONENT_MANUFACTURING',
        name: '07 — Component Manufacturing',
        description: 'Precision compilation of low-level digital components, UI widgets, and micro-utilities.',
        category: 'MANUFACTURING',
        requiredInputs: ['JDPM Blueprint Contract (BLUE)'],
        producedOutputs: ['Compiled Component Artifacts'],
        requiredSubfactories: ['DIGITAL_COMPONENT_FACTORY', 'DIGITAL_FORM_FACTORY'],
        requiredAgents: ['FACT_ENGINEER'],
        qualityGates: ['Unit Compilation Gate'],
        evidenceRequired: ['Component Hash Integrity Manifest'],
        isMandatory: true
      },
      {
        stageNumber: 8,
        id: '08_MODULE_MFG',
        code: 'MODULE_MANUFACTURING',
        name: '08 — Module Manufacturing',
        description: 'Assembly of functional domain modules (ERP, Financial, Medical, Governance).',
        category: 'MANUFACTURING',
        requiredInputs: ['Compiled Component Artifacts'],
        producedOutputs: ['Domain Module Packages'],
        requiredSubfactories: ['DIGITAL_MODULE_FACTORY', 'DIGITAL_PORTAL_FACTORY'],
        requiredAgents: ['FACT_ENGINEER'],
        qualityGates: ['Module Integration Test'],
        evidenceRequired: ['Module Digest Record'],
        isMandatory: true
      },
      {
        stageNumber: 9,
        id: '09_SERVICE_INTEGRATION_MFG',
        code: 'SERVICE_INTEGRATION_MANUFACTURING',
        name: '09 — Service & Integration Manufacturing',
        description: 'API endpoint generation, external ERP connectors, and RPC gateway assembly.',
        category: 'MANUFACTURING',
        requiredInputs: ['Domain Module Packages'],
        producedOutputs: ['Active API & Service Connectors'],
        requiredSubfactories: ['DIGITAL_SERVICE_FACTORY', 'DIGITAL_API_FACTORY', 'DIGITAL_INTEGRATION_FACTORY'],
        requiredAgents: ['FACT_ENGINEER'],
        qualityGates: ['API Contract Validation'],
        evidenceRequired: ['Service Endpoint Registry Manifest'],
        isMandatory: true
      },
      {
        stageNumber: 10,
        id: '10_APPLICATION_ASSEMBLY',
        code: 'APPLICATION_ASSEMBLY',
        name: '10 — Application Assembly',
        description: 'Unified product bundle synthesis, executable build packaging (MFG).',
        canonicalArtifactType: 'MFG',
        category: 'MANUFACTURING',
        requiredInputs: ['Domain Module Packages', 'Active API & Service Connectors'],
        producedOutputs: ['JDPM Manufacturing Package (MFG)'],
        requiredSubfactories: ['DIGITAL_PRODUCT_FACTORY'],
        requiredAgents: ['FACT_ENGINEER'],
        qualityGates: ['JDPM-3000 Manufacturing Gate'],
        evidenceRequired: ['Assembly Build Certificate'],
        isMandatory: true
      },
      {
        stageNumber: 11,
        id: '11_CONFIGURATION_INSTITUTIONALIZATION',
        code: 'CONFIGURATION_INSTITUTIONALIZATION',
        name: '11 — Configuration & Institutionalization',
        description: 'Hierarchical parameter injection, white-label branding, and institutional defaults.',
        category: 'MANUFACTURING',
        requiredInputs: ['JDPM Manufacturing Package (MFG)'],
        producedOutputs: ['Configured Product Bundle'],
        requiredSubfactories: ['DIGITAL_CONFIGURATION_FACTORY'],
        requiredAgents: ['GOV_SPECIALIST'],
        qualityGates: ['Hierarchical Config Validation'],
        evidenceRequired: ['Configuration Hash Record'],
        isMandatory: true
      },
      {
        stageNumber: 12,
        id: '12_VERIFICATION_VALIDATION',
        code: 'VERIFICATION_VALIDATION',
        name: '12 — Verification & Validation',
        description: 'Rigorous 20-gate automated testing suite, security scan, and performance stress (VER).',
        canonicalArtifactType: 'VER',
        category: 'ASSURANCE',
        requiredInputs: ['Configured Product Bundle'],
        producedOutputs: ['JDPM Verification Record (VER)'],
        requiredSubfactories: ['DIGITAL_TEST_FACTORY'],
        requiredAgents: ['QA_SPECIALIST'],
        qualityGates: ['20-Gate Assurance Pass'],
        evidenceRequired: ['Full Audit Verification Log'],
        isMandatory: true
      },
      {
        stageNumber: 13,
        id: '13_CERTIFICATION_RELEASE',
        code: 'CERTIFICATION_RELEASE',
        name: '13 — Certification & Release',
        description: 'Sovereign clearance sign-off, cryptographic seal, and national release issuance (CERT).',
        canonicalArtifactType: 'CERT',
        category: 'ASSURANCE',
        requiredInputs: ['JDPM Verification Record (VER)'],
        producedOutputs: ['JDPM Certification Record (CERT)'],
        requiredSubfactories: ['SECURITY_POLICY_FACTORY'],
        requiredAgents: ['GOV_SPECIALIST'],
        qualityGates: ['JDPM-4000 Sovereign Clearance'],
        evidenceRequired: ['Sovereign Release Certificate'],
        isMandatory: true
      },
      {
        stageNumber: 14,
        id: '14_PROVISIONING_DEPLOYMENT',
        code: 'PROVISIONING_DEPLOYMENT',
        name: '14 — Provisioning & Cloud Deployment',
        description: 'Enclave allocation, database provisioning, and production slot deployment.',
        category: 'DEPLOYMENT',
        requiredInputs: ['JDPM Certification Record (CERT)'],
        producedOutputs: ['Live Cloud Deployment Enclave'],
        requiredSubfactories: ['DIGITAL_DEPLOYMENT_FACTORY', 'DIGITAL_PROVISIONING_FACTORY'],
        requiredAgents: ['OPS_ENGINEER'],
        qualityGates: ['Enclave Readiness Check'],
        evidenceRequired: ['Cloud Infrastructure Manifest'],
        isMandatory: true
      },
      {
        stageNumber: 15,
        id: '15_INSTITUTIONAL_COMMISSIONING',
        code: 'INSTITUTIONAL_COMMISSIONING',
        name: '15 — Institutional Commissioning',
        description: 'On-site/tenant onboarding, identity integration, and institutional smoke testing.',
        category: 'DEPLOYMENT',
        requiredInputs: ['Live Cloud Deployment Enclave'],
        producedOutputs: ['Commissioned Institution Instance'],
        requiredSubfactories: ['COMMISSIONING_FACTORY', 'INSTITUTIONAL_INSTALLATION_FACTORY'],
        requiredAgents: ['OPS_ENGINEER'],
        qualityGates: ['Commissioning Gate'],
        evidenceRequired: ['Institutional Acceptance Record'],
        isMandatory: true
      },
      {
        stageNumber: 16,
        id: '16_GO_LIVE_ACCEPTANCE',
        code: 'GO_LIVE_ACCEPTANCE',
        name: '16 — Go-Live & Final Acceptance',
        description: 'Public cutover, DNS routing, and official operational handover.',
        category: 'OPERATIONS',
        requiredInputs: ['Commissioned Institution Instance'],
        producedOutputs: ['Live Operational Enterprise System'],
        requiredSubfactories: ['DIGITAL_OPERATIONS_FACTORY'],
        requiredAgents: ['GOV_SPECIALIST', 'OPS_ENGINEER'],
        qualityGates: ['Final Go-Live Authorization'],
        evidenceRequired: ['Go-Live Handover Evidence'],
        isMandatory: true
      },
      {
        stageNumber: 17,
        id: '17_OPERATIONS_MONITORING',
        code: 'OPERATIONS_MONITORING',
        name: '17 — Operations & Telemetry Monitoring',
        description: 'Continuous health telemetry, auto-scaling, incident detection, and log auditing.',
        category: 'OPERATIONS',
        requiredInputs: ['Live Operational Enterprise System'],
        producedOutputs: ['Operational Health Telemetry Streams'],
        requiredSubfactories: ['DIGITAL_OPERATIONS_FACTORY'],
        requiredAgents: ['OPS_ENGINEER'],
        qualityGates: ['SLA Telemetry Thresholds'],
        evidenceRequired: ['Daily Telemetry Summary Digest'],
        isMandatory: true
      },
      {
        stageNumber: 18,
        id: '18_MAINTENANCE_SUPPORT',
        code: 'MAINTENANCE_SUPPORT',
        name: '18 — Maintenance & Support',
        description: 'Patch management, backup execution, and hotfix application.',
        category: 'LIFECYCLE',
        requiredInputs: ['Operational Health Telemetry Streams'],
        producedOutputs: ['Patched & Backed-up System State'],
        requiredSubfactories: ['MAINTENANCE_FACTORY'],
        requiredAgents: ['OPS_ENGINEER'],
        qualityGates: ['Backup Integrity Verification'],
        evidenceRequired: ['Maintenance Action Log'],
        isMandatory: true
      },
      {
        stageNumber: 19,
        id: '19_EVOLUTION_UPGRADE',
        code: 'EVOLUTION_UPGRADE',
        name: '19 — Evolution & Upgrade',
        description: 'In-place schema migration, version elevation, and seamless rolling upgrade.',
        category: 'LIFECYCLE',
        requiredInputs: ['Patched & Backed-up System State'],
        producedOutputs: ['Upgraded System Version'],
        requiredSubfactories: ['EVOLUTION_UPGRADE_FACTORY'],
        requiredAgents: ['SYSTEM_ARCHITECT'],
        qualityGates: ['Zero-Downtime Migration Check'],
        evidenceRequired: ['Schema Migration Audit Trail'],
        isMandatory: true
      },
      {
        stageNumber: 20,
        id: '20_RETIREMENT_ARCHIVAL',
        code: 'RETIREMENT_ARCHIVAL',
        name: '20 — Retirement & Archival',
        description: 'Sovereign data export, cryptographically sealed archive, and graceful decommissioning.',
        category: 'LIFECYCLE',
        requiredInputs: ['Upgraded System Version'],
        producedOutputs: ['Sealed Archive Package'],
        requiredSubfactories: ['INSTITUTIONAL_INSTALLATION_FACTORY'],
        requiredAgents: ['GOV_SPECIALIST'],
        qualityGates: ['Archival Completeness Verification'],
        evidenceRequired: ['Decommissioning & Export Certificate'],
        isMandatory: true
      }
    ];

    defaultStages.forEach(s => this.registerStage(s));
  }
}

export const globalManufacturingLifecycleRegistry = GlobalManufacturingLifecycleRegistry.getInstance();
