/**
 * JUMO UEOS
 * ERP Runtime Provisioning Service
 */

import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { erpWorkspaceResolver } from "../../../workspace/ERPWorkspaceResolver.js";
import { GovernanceStructureEngine } from "../GovernanceStructureEngine.js";
import { navigationGenerator } from "../generators/NavigationGenerator.js";
import { DepartmentGenerator } from "../generators/DepartmentGenerator.js";
import { PortalGenerator } from "../generators/PortalGenerator.js";
import { ModuleGenerator } from "../generators/ModuleGenerator.js";
import { ComponentGenerator } from "../generators/ComponentGenerator.js";
import { FormGenerator } from "../generators/FormGenerator.js";
import { WorkflowGenerator } from "../generators/WorkflowGenerator.js";
import { AIAgentGenerator } from "../generators/AIAgentGenerator.js";

export class ERPProvisioningService {
  constructor() {
    this.status = "ONLINE";
  }

  async provisionERP(instanceId) {
    console.log(`[UEOS] Provisioning ERP Instance: ${instanceId}`);
    const instance = erpInstanceRegistry.get(instanceId);
    if (!instance) throw new Error("ERP Instance not found");

    erpInstanceRegistry.updateLifecycle(instanceId, "PROVISIONED");
    this.configureERP(instanceId);
    
    return instance;
  }

  async configureERP(instanceId) {
    console.log(`[UEOS] Configuring ERP Instance: ${instanceId}`);
    erpInstanceRegistry.updateLifecycle(instanceId, "CONFIGURED");
    return erpInstanceRegistry.get(instanceId);
  }

  async launchERP(instanceId) {
    console.log(`[UEOS] Launching ERP Factory Pipeline for Instance: ${instanceId}`);
    
    const instance = erpInstanceRegistry.get(instanceId);
    if (!instance) throw new Error("ERP Instance not found");

    // FACTORY LIFECYCLE PIPELINE

    // 1. Governance Builder
    const governanceEngine = new GovernanceStructureEngine();
    const governance = governanceEngine.generateGovernance(instance);

    // 2. Department Builder
    const deptGenerator = new DepartmentGenerator();
    const departments = deptGenerator.generate(instance);

    // 4. Portal Builder
    const portalGen = new PortalGenerator();
    const portals = portalGen.generate(instance, departments);

    // 5. Module Builder
    const modGen = new ModuleGenerator();
    const modules = modGen.generate(instance, portals);

    // 6. Layer Builder
    const layers = [
      { id: "layer-business", name: "Business Layer" },
      { id: "layer-app", name: "Application Layer" },
      { id: "layer-workflow", name: "Workflow Layer" },
      { id: "layer-security", name: "Security Layer" },
      { id: "layer-integration", name: "Integration Layer" },
      { id: "layer-reporting", name: "Reporting Layer" },
      { id: "layer-ai", name: "AI Layer" },
      { id: "layer-automation", name: "Automation Layer" },
      { id: "layer-data", name: "Data Layer" }
    ];

    // 7. Component Builder
    const compGen = new ComponentGenerator();
    const components = compGen.generate(instance, modules, layers);

    // 8. Form Builder
    const formGen = new FormGenerator();
    const forms = formGen.generate(instance, components);

    // 9. Workflow Builder
    const wfGen = new WorkflowGenerator();
    const workflows = wfGen.generate(instance, forms);

    // 3. Navigation Builder (Universal Navigation Service)
    const navigation = navigationGenerator.generateEnterpriseNavigation(instance, governance, departments, portals, modules, forms, workflows);

    // 10. AI Builder
    const aiGen = new AIAgentGenerator();
    const aiAssistant = aiGen.generate(instance);

    // 11. Configuration Builder (Automatic Settings)
    const configuration = {
       branding: { primaryColor: "Enterprise Blue", logo: "Default" },
       identity: { provider: "UEOS ID", sso: true },
       governance: governance,
       organization: instance.name,
       departments: departments,
       portals: portals,
       modules: modules,
       layers: layers,
       forms: forms,
       components: components,
       automation: "Enabled",
       workflows: workflows,
       ai: aiAssistant,
       notifications: "Configured",
       reports: "Enterprise Analytics",
       security: { level: "High", zeroTrust: true },
       audit: "Active",
       integrations: [],
       extensions: [],
       system: { status: "Active" },
       backup: "Automated",
       recovery: "Active",
       registrySynchronization: "Synchronized",
       telemetry: "Enabled"
    };

    // Attach to instance and update registry
    instance.governance = governance;
    instance.departments = departments;
    instance.navigation = navigation;
    instance.portals = portals;
    instance.modules = modules;
    instance.layers = layers;
    instance.components = components;
    instance.forms = forms;
    instance.workflows = workflows;
    instance.aiAssistant = aiAssistant;
    instance.configurationCenter = configuration;
    instance.settings = configuration; // Automatic Settings

    erpInstanceRegistry.register(instance);

    erpInstanceRegistry.updateLifecycle(instanceId, "READY");
    erpInstanceRegistry.activate(instanceId);
    erpInstanceRegistry.updateLifecycle(instanceId, "RUNNING");

    return {
      erpId: instance.id,
      name: instance.name,
      status: "RUNNING",
      lifecycle: "RUNNING",
      workspace: {
          governance,
          departments,
          portals,
          modules,
          layers,
          components,
          forms,
          workflows,
          aiAssistant,
          navigation,
          settings: configuration
      },
      configuration: configuration
    };
  }

  health() {
    return {
      service: "JUMO ERP Provisioning Service",
      status: this.status
    };
  }
}

export const erpProvisioningService = new ERPProvisioningService();
