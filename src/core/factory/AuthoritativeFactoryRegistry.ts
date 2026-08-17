// JUMO UEOS — Authoritative Factory Registry
// Single authoritative root registry discovering all specialized and digital sub-factories & institutional operations engines

import { DigitalProductFactoryRegistry } from "./DigitalProductFactoryRegistry";
import { DigitalApplicationFactory } from "./subfactories/DigitalApplicationFactory";
import { DigitalModuleFactory } from "./subfactories/DigitalModuleFactory";
import { DigitalComponentFactory } from "./subfactories/DigitalComponentFactory";
import { DigitalServiceFactory } from "./subfactories/DigitalServiceFactory";
import { DigitalWorkflowFactory } from "./subfactories/DigitalWorkflowFactory";
import { DigitalDataFactory } from "./subfactories/DigitalDataFactory";
import { DigitalIntegrationFactory } from "./subfactories/DigitalIntegrationFactory";
import { DigitalPortalExperienceFactory } from "./subfactories/DigitalPortalExperienceFactory";
import { AIAgentToolFactory } from "./subfactories/AIAgentToolFactory";
import { DigitalConfigurationFactory } from "./subfactories/DigitalConfigurationFactory";
import { DigitalTestFactory } from "./subfactories/DigitalTestFactory";
import { DigitalProvisioningDeploymentFactory } from "./subfactories/DigitalProvisioningDeploymentFactory";
import { DigitalRuntimeEvolutionFactory } from "./subfactories/DigitalRuntimeEvolutionFactory";
import { DigitalQualityManagementEngine } from "./subfactories/DigitalQualityManagementEngine";
import { DigitalProductManufacturingOrchestrator } from "./DigitalProductManufacturingOrchestrator";
import { InstitutionalInstallationFactory as CoreInstitutionalInstallationFactory } from "../institutional/installation/InstitutionalInstallationFactory";
import { InstitutionalInstallationFactory as ManufacturingInstallationFactory } from "../manufacturing/installation/InstitutionalInstallationFactory";
import { InstitutionalOperationsEngine } from "../institutional/operations/InstitutionalOperationsEngine";

export interface FactoryDescriptor {
  factoryId: string;
  name: string;
  category: 'MANUFACTURING' | 'VERIFICATION' | 'PROVISIONING' | 'INSTITUTIONAL_INSTALLATION' | 'OPERATIONS' | 'COGNITIVE';
  version: string;
  contract: string;
  capabilities: string[];
  dependencies: string[];
  health: 'OPTIMAL' | 'DEGRADED' | 'MAINTENANCE';
  canExecute: boolean;
}

export interface FactoryMetricsSummary {
  authoritativeRoot: string;
  totalSpecializedProductFactories: number;
  totalManufacturedApplications: number;
  totalManufacturedModules: number;
  totalManufacturedComponents: number;
  totalManufacturedServices: number;
  totalManufacturedWorkflows: number;
  totalManufacturedSchemas: number;
  totalManufacturedIntegrations: number;
  totalManufacturedPortals: number;
  totalManufacturedAgents: number;
  totalManufacturedTools: number;
  totalConfigProfiles: number;
  totalExecutedTests: number;
  totalActiveDeployments: number;
  totalRunningInstances: number;
  totalDefectsManaged: number;
  totalInstitutionalInstallations: number;
  totalInstallationPlans: number;
  totalActiveOperations: number;
  overallFactoryHealth: 'OPTIMAL' | 'DEGRADED' | 'MAINTENANCE';
  timestamp: string;
}

export class AuthoritativeFactoryRegistry {
  private static instance: AuthoritativeFactoryRegistry;

  private constructor() {}

  public static getInstance(): AuthoritativeFactoryRegistry {
    if (!AuthoritativeFactoryRegistry.instance) {
      AuthoritativeFactoryRegistry.instance = new AuthoritativeFactoryRegistry();
    }
    return AuthoritativeFactoryRegistry.instance;
  }

  public getSpecializedProductFactories() {
    return DigitalProductFactoryRegistry.getAllFactories();
  }

  public getApplicationFactory() {
    return DigitalApplicationFactory.getInstance();
  }

  public getModuleFactory() {
    return DigitalModuleFactory.getInstance();
  }

  public getComponentFactory() {
    return DigitalComponentFactory.getInstance();
  }

  public getServiceFactory() {
    return DigitalServiceFactory.getInstance();
  }

  public getWorkflowFactory() {
    return DigitalWorkflowFactory.getInstance();
  }

  public getDataFactory() {
    return DigitalDataFactory.getInstance();
  }

  public getIntegrationFactory() {
    return DigitalIntegrationFactory.getInstance();
  }

  public getPortalFactory() {
    return DigitalPortalExperienceFactory.getInstance();
  }

  public getAIAgentToolFactory() {
    return AIAgentToolFactory.getInstance();
  }

  public getConfigurationFactory() {
    return DigitalConfigurationFactory.getInstance();
  }

  public getTestFactory() {
    return DigitalTestFactory.getInstance();
  }

  public getProvisioningDeploymentFactory() {
    return DigitalProvisioningDeploymentFactory.getInstance();
  }

  public getRuntimeEvolutionFactory() {
    return DigitalRuntimeEvolutionFactory.getInstance();
  }

  public getQualityManagementEngine() {
    return DigitalQualityManagementEngine.getInstance();
  }

  public getManufacturingOrchestrator() {
    return DigitalProductManufacturingOrchestrator.getInstance();
  }

  public getInstitutionalInstallationFactory() {
    return CoreInstitutionalInstallationFactory.getInstance();
  }

  public getManufacturingInstallationFactory() {
    return ManufacturingInstallationFactory.getInstance();
  }

  public getInstitutionalOperationsEngine() {
    return InstitutionalOperationsEngine.getInstance();
  }

  /**
   * Discovers all 10 authoritative factory capabilities and descriptors
   */
  public getFactoryInventory(): FactoryDescriptor[] {
    return [
      {
        factoryId: 'FACT-APP-00',
        name: 'Digital Application Factory',
        category: 'MANUFACTURING',
        version: '2026.08',
        contract: 'JDPM-100 Digital Application Standard',
        capabilities: ['Application Synthesis', 'Route Manifests', 'Permission Contracts', 'Runtime Profiles'],
        dependencies: ['UEOS Kernel', 'FACT-MOD-01'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-MOD-01',
        name: 'Digital Module Factory',
        category: 'MANUFACTURING',
        version: '2026.08',
        contract: 'JDPM-200 Digital Module Standard',
        capabilities: ['Domain Decomposition', 'Capability Packaging', 'Zero-Downtime Upgrade Policies', 'Integrity Digesting'],
        dependencies: ['FACT-COMP-02', 'FACT-SRV-03'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-COMP-02',
        name: 'Digital Component Factory',
        category: 'MANUFACTURING',
        version: '2026.08',
        contract: 'JDPM-200 Component Contract Standard',
        capabilities: ['Component Synthesis', 'Contract Typing', 'Coverage Analysis', 'Integrity Hashing'],
        dependencies: ['UEOS Kernel'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-SRV-03',
        name: 'Digital Service Factory',
        category: 'MANUFACTURING',
        version: '2026.08',
        contract: 'JDPM-300 Microservice Contract Standard',
        capabilities: ['Service Manifest Generation', 'Zero-Trust Ingress Routing', 'Circuit Breakers', 'Live Probes'],
        dependencies: ['FACT-COMP-02'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-WF-04',
        name: 'Digital Workflow Factory',
        category: 'MANUFACTURING',
        version: '2026.08',
        contract: 'JDPM-400 State-Machine Workflow Standard',
        capabilities: ['State Machine Engine', 'Step Orchestration', 'Compensation Logic', 'SLA Timers'],
        dependencies: ['FACT-SRV-03'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-DATA-05',
        name: 'Digital Data Factory',
        category: 'MANUFACTURING',
        version: '2026.08',
        contract: 'JDPM-500 Relational Data & RLS Standard',
        capabilities: ['DDL Migration Generation', 'Row-Level Security', 'Foreign Key Validation', 'Multi-tenant Sharding'],
        dependencies: ['FACT-COMP-02'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-INTG-06',
        name: 'Digital Integration Factory',
        category: 'MANUFACTURING',
        version: '2026.08',
        contract: 'JDPM-600 Enterprise Integration Standard',
        capabilities: ['ISO 20022 Interop', 'mTLS Gateway', 'Rate Limiting', 'Dead-Letter Queues'],
        dependencies: ['FACT-SRV-03'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-PORTAL-07',
        name: 'Digital Portal & Experience Factory',
        category: 'MANUFACTURING',
        version: '2026.08',
        contract: 'JDPM-800 Digital Portal Experience Standard',
        capabilities: ['Dynamic Navigation Trees', 'Metadata-Driven Portals', 'Role-Based Dashboards', 'Theme Packaging'],
        dependencies: ['FACT-APP-00'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-AI-08',
        name: 'AI Agent & AI Tool Factory',
        category: 'COGNITIVE',
        version: '2026.08',
        contract: 'JDPM-900 Cognitive Agent & Tool Standard',
        capabilities: ['Provider-Neutral Dynamic Routing', 'Tool Contract Synthesis', 'Human-in-the-Loop Policies', 'Air-Gap Fallback'],
        dependencies: ['JUMO AI Gateway'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-CFG-09',
        name: 'Digital Configuration & Deployment Factory',
        category: 'PROVISIONING',
        version: '2026.08',
        contract: 'JDPM-1000 Sovereign Provisioning Standard',
        capabilities: ['7-Layer Hierarchy', 'Drift Detection', 'Zero-Trust Enclave Provisioning', 'One-Click Rollbacks'],
        dependencies: ['UEOS Vault', 'FACT-TEST-10'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-TEST-10',
        name: 'Digital Test & Verification Factory',
        category: 'VERIFICATION',
        version: '2026.08',
        contract: 'JDPM-800 Verification Evidence Standard',
        capabilities: ['Automated Test Suites', 'Cryptographic Digest Verification', 'Gate Evaluation'],
        dependencies: ['FACT-COMP-02', 'FACT-SRV-03'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-INST-11',
        name: 'Institutional Installation Factory',
        category: 'INSTITUTIONAL_INSTALLATION',
        version: '2026.08',
        contract: 'JDPM-3000 Institutional Commissioning Standard',
        capabilities: ['CERT Artifact Consumption', 'InstallationPlan Synthesis', 'Environment Readiness', 'Artifact Deployment', 'Dual-Key Acceptance', 'Go-Live Execution'],
        dependencies: ['FACT-CFG-09', 'JDPM-CERT'],
        health: 'OPTIMAL',
        canExecute: true
      },
      {
        factoryId: 'FACT-OPS-12',
        name: 'Institutional Operations Engine',
        category: 'OPERATIONS',
        version: '2026.08',
        contract: 'JDPM-4000 Institutional Operations & Maintenance Standard',
        capabilities: ['Live Telemetry', 'Preventive Maintenance', 'AI Incident Remediation', 'Backup Recovery', 'Zero-Downtime Upgrades'],
        dependencies: ['FACT-INST-11'],
        health: 'OPTIMAL',
        canExecute: true
      }
    ];
  }

  public getGlobalFactoryMetrics(): FactoryMetricsSummary {
    const apps = this.getApplicationFactory().getAllApplications();
    const mods = this.getModuleFactory().getAllModules();
    const comp = this.getComponentFactory().getAllComponents();
    const srv = this.getServiceFactory().getAllServices();
    const wf = this.getWorkflowFactory().getAllWorkflows();
    const data = this.getDataFactory().getAllSchemas();
    const intg = this.getIntegrationFactory().getAllIntegrations();
    const portals = this.getPortalFactory().getAllPortals();
    const agents = this.getAIAgentToolFactory().getAllAgents();
    const tools = this.getAIAgentToolFactory().getAllTools();
    const cfg = this.getConfigurationFactory().getAllConfigs();
    const tst = this.getTestFactory().getAllTests();
    const dep = this.getProvisioningDeploymentFactory().getAllDeployments();
    const run = this.getRuntimeEvolutionFactory().getAllRuntimeInstances();
    const def = this.getQualityManagementEngine().getAllDefects();
    const inst = this.getInstitutionalInstallationFactory().getAllInstallations();
    const plans = this.getManufacturingInstallationFactory().getAllPlans();
    const maint = this.getInstitutionalOperationsEngine().getAllMaintenanceTasks();

    return {
      authoritativeRoot: 'JUMO_AUTHORITATIVE_MANUFACTURING_ROOT_FACTORY',
      totalSpecializedProductFactories: this.getSpecializedProductFactories().length,
      totalManufacturedApplications: apps.length,
      totalManufacturedModules: mods.length,
      totalManufacturedComponents: comp.length,
      totalManufacturedServices: srv.length,
      totalManufacturedWorkflows: wf.length,
      totalManufacturedSchemas: data.length,
      totalManufacturedIntegrations: intg.length,
      totalManufacturedPortals: portals.length,
      totalManufacturedAgents: agents.length,
      totalManufacturedTools: tools.length,
      totalConfigProfiles: cfg.length,
      totalExecutedTests: tst.length,
      totalActiveDeployments: dep.length,
      totalRunningInstances: run.length,
      totalDefectsManaged: def.length,
      totalInstitutionalInstallations: inst.length,
      totalInstallationPlans: plans.length,
      totalActiveOperations: maint.length,
      overallFactoryHealth: 'OPTIMAL',
      timestamp: new Date().toISOString()
    };
  }
}
