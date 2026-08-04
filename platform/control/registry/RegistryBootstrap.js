import { erpRecoveryEngine } from "../../factory/erp/recovery/ERPRecoveryEngine.js";
/**
 * JUMO UEOS
 * Registry Persistence Bootstrap
 */

import { registryPersistenceEngine } from "../../storage/RegistryPersistenceEngine.js";

import { erpRegistry } from "../../registry/ERPRegistry.js";
import { portalRegistry } from "../../registry/PortalRegistry.js";
import { moduleRegistry } from "../../registry/ModuleRegistry.js";
import { formRegistry } from "../../registry/formRegistry.js";
import { workflowRegistry } from "../../registry/workflowRegistry.js";
import { componentRegistry } from "../../registry/componentRegistry.js";
import { departmentRegistry } from "../../registry/departmentRegistry.js";
import { aiERPRegistry } from "../../registry/ai/AIERPRegistry.js";
import { erpInstanceRegistry } from "../../registry/ERPInstanceRegistry.js";
import { erpDiscoveryService } from "../../factory/erp/services/ERPDiscoveryService.js";
import { erpWorkspaceResolver } from "../../workspace/ERPWorkspaceResolver.js";
import { digitalAgentRegistry } from "../../ai/digitalAgentRegistry.js";
import { ERPBlueprintRegistry } from "../../factory/erp/ERPBlueprintRegistry.js";
import { erpEcosystemTemplateRegistry } from "../../factory/erp/ERPEcosystemTemplateRegistry.js";
import { erpFactoryManager } from "../../factory/erp/ERPFactoryManager.js";
import { erpFamilyRegistry } from "../../factory/erp/ERPFamilyRegistry.js";
import { erpActivationService } from "../../factory/erp/services/ERPActivationService.js";

// Settings Registries
import { universalSettingsRegistry } from "../settings/UniversalSettingsRegistry.js";
import { platformSettingsRegistry } from "../settings/PlatformSettingsRegistry.js";
import { applicationSettingsRegistry } from "../settings/ApplicationSettingsRegistry.js";
import { layerConfigurationRegistry } from "../settings/LayerConfigurationRegistry.js";
import { moduleConfigurationRegistry } from "../settings/ModuleConfigurationRegistry.js";
import { departmentConfigurationRegistry } from "../settings/DepartmentConfigurationRegistry.js";
import { serverConfigurationRegistry } from "../settings/ServerConfigurationRegistry.js";
import { componentConfigurationRegistry } from "../settings/ComponentConfigurationRegistry.js";
import { formConfigurationRegistry } from "../settings/FormConfigurationRegistry.js";
import { workflowConfigurationRegistry } from "../settings/WorkflowConfigurationRegistry.js";
import { commercialPlatformRegistry } from "../settings/CommercialPlatformRegistry.js";
import { navigationConfigurationRegistry } from "../settings/NavigationConfigurationRegistry.js";
import { publicExperienceRegistry } from "../settings/PublicExperienceRegistry.js";
import { lifecycleConfigurationRegistry } from "../settings/LifecycleConfigurationRegistry.js";
import { upgradeConfigurationRegistry } from "../settings/UpgradeConfigurationRegistry.js";

export function saveAllRegistries() {
  return {
    erp: registryPersistenceEngine.save("erp-registry", erpRegistry.list()),
    portals: registryPersistenceEngine.save("portal-registry", portalRegistry.list()),
    modules: registryPersistenceEngine.save("module-registry", moduleRegistry.list()),
    forms: registryPersistenceEngine.save("form-registry", formRegistry.list()),
    workflows: registryPersistenceEngine.save("workflow-registry", workflowRegistry.list()),
    components: registryPersistenceEngine.save("component-registry", componentRegistry.list()),
    departments: registryPersistenceEngine.save("department-registry", departmentRegistry.list()),
    ai: registryPersistenceEngine.save("ai-erp-registry", aiERPRegistry.list()),
    agents: registryPersistenceEngine.save("digital-agent-registry", digitalAgentRegistry.getAgents()),
    instances: registryPersistenceEngine.save("erp-instance-registry", erpInstanceRegistry.list()),
    
    // Save Settings
    universalSettings: registryPersistenceEngine.save("universal-settings", universalSettingsRegistry.list()),
    platformSettings: registryPersistenceEngine.save("platform-settings", platformSettingsRegistry.list()),
    applicationSettings: registryPersistenceEngine.save("application-settings", applicationSettingsRegistry.list()),
    layerConfigs: registryPersistenceEngine.save("layer-configs", layerConfigurationRegistry.list()),
    moduleConfigs: registryPersistenceEngine.save("module-configs", moduleConfigurationRegistry.list()),
    deptConfigs: registryPersistenceEngine.save("dept-configs", departmentConfigurationRegistry.list()),
    serverConfigs: registryPersistenceEngine.save("server-configs", serverConfigurationRegistry.list()),
    compConfigs: registryPersistenceEngine.save("comp-configs", componentConfigurationRegistry.list()),
    formConfigs: registryPersistenceEngine.save("form-configs", formConfigurationRegistry.list()),
    workflowConfigs: registryPersistenceEngine.save("workflow-configs", workflowConfigurationRegistry.list()),
    commercialPlatformSettings: registryPersistenceEngine.save("commercial-platform-settings", commercialPlatformRegistry.list()),
    navConfigs: registryPersistenceEngine.save("nav-configs", navigationConfigurationRegistry.list()),
    publicExperienceSettings: registryPersistenceEngine.save("public-experience-settings", publicExperienceRegistry.list()),
    lifecycleConfigs: registryPersistenceEngine.save("lifecycle-configs", lifecycleConfigurationRegistry.list()),
    upgradeConfigs: registryPersistenceEngine.save("upgrade-configs", upgradeConfigurationRegistry.list())
  };
}

export function restoreAllRegistries() {
  // 1. Module Registry
  const modules = registryPersistenceEngine.load("module-registry");
  if (Array.isArray(modules)) modules.forEach(m => moduleRegistry.register(m));

  // 2. Portal Registry
  const portals = registryPersistenceEngine.load("portal-registry");
  if (Array.isArray(portals)) portals.forEach(p => portalRegistry.register(p));

  // 3. Workflow Registry
  const workflows = registryPersistenceEngine.load("workflow-registry");
  if (Array.isArray(workflows)) workflows.forEach(w => workflowRegistry.register(w));

  // 4. Agent Registry
  const agents = registryPersistenceEngine.load("digital-agent-registry");
  if (Array.isArray(agents)) agents.forEach(a => digitalAgentRegistry.register(a));

  // 5. Restore Settings
  const universal = registryPersistenceEngine.load("universal-settings");
  if (universal && typeof universal === 'object') {
     Object.keys(universal).forEach(cat => {
        Object.keys(universal[cat]).forEach(key => {
            universalSettingsRegistry.register(cat, key, universal[cat][key]);
        });
     });
  }

  const pSettings = registryPersistenceEngine.load("platform-settings");
  if (Array.isArray(pSettings)) pSettings.forEach(s => platformSettingsRegistry.register(s));

  const aSettings = registryPersistenceEngine.load("application-settings");
  if (Array.isArray(aSettings)) aSettings.forEach(s => applicationSettingsRegistry.register(s));

  const layerConfigs = registryPersistenceEngine.load("layer-configs");
  if (Array.isArray(layerConfigs)) layerConfigs.forEach(s => layerConfigurationRegistry.register(s));

  const moduleConfigs = registryPersistenceEngine.load("module-configs");
  if (Array.isArray(moduleConfigs)) moduleConfigs.forEach(s => moduleConfigurationRegistry.register(s));

  const deptConfigs = registryPersistenceEngine.load("dept-configs");
  if (Array.isArray(deptConfigs)) deptConfigs.forEach(s => departmentConfigurationRegistry.register(s));

  const serverConfigs = registryPersistenceEngine.load("server-configs");
  if (Array.isArray(serverConfigs)) serverConfigs.forEach(s => serverConfigurationRegistry.register(s));

  const compConfigs = registryPersistenceEngine.load("comp-configs");
  if (Array.isArray(compConfigs)) compConfigs.forEach(s => componentConfigurationRegistry.register(s));

  const formConfigs = registryPersistenceEngine.load("form-configs");
  if (Array.isArray(formConfigs)) formConfigs.forEach(s => formConfigurationRegistry.register(s));

  const workflowConfigs = registryPersistenceEngine.load("workflow-configs");
  if (Array.isArray(workflowConfigs)) workflowConfigs.forEach(s => workflowConfigurationRegistry.register(s));

  const commercialPlatformSettings = registryPersistenceEngine.load("commercial-platform-settings");
  if (Array.isArray(commercialPlatformSettings)) commercialPlatformSettings.forEach(s => commercialPlatformRegistry.register(s));

  const navConfigs = registryPersistenceEngine.load("nav-configs");
  if (Array.isArray(navConfigs)) navConfigs.forEach(s => navigationConfigurationRegistry.register(s));

  const publicExperienceSettings = registryPersistenceEngine.load("public-experience-settings");
  if (Array.isArray(publicExperienceSettings)) publicExperienceSettings.forEach(s => publicExperienceRegistry.register(s));

  const lifecycleConfigs = registryPersistenceEngine.load("lifecycle-configs");
  if (Array.isArray(lifecycleConfigs)) lifecycleConfigs.forEach(s => lifecycleConfigurationRegistry.register(s));

  const upgradeConfigs = registryPersistenceEngine.load("upgrade-configs");
  if (Array.isArray(upgradeConfigs)) upgradeConfigs.forEach(s => upgradeConfigurationRegistry.register(s));

  // 6. ERP Instance Registry
  const instances = registryPersistenceEngine.load("erp-instance-registry");
  if (Array.isArray(instances)) {
    instances.forEach(instance => erpInstanceRegistry.register(instance));
  }
  console.log("[UEOS] ERP Instance Registry Count:", erpInstanceRegistry.list().length);
  console.log("[UEOS] ERP Instances Loaded:", erpInstanceRegistry.list().map(i => i.name));

  // Restore others
  const erps = registryPersistenceEngine.load("erp-registry");
  if (Array.isArray(erps)) erps.forEach(e => erpRegistry.register(e));

  const forms = registryPersistenceEngine.load("form-registry");
  if (Array.isArray(forms)) forms.forEach(f => formRegistry.register(f));

  const components = registryPersistenceEngine.load("component-registry");
  if (Array.isArray(components)) components.forEach(c => componentRegistry.register(c));

  const departments = registryPersistenceEngine.load("department-registry");
  if (Array.isArray(departments)) departments.forEach(d => departmentRegistry.register(d));

  const ai = registryPersistenceEngine.load("ai-erp-registry");
  if (Array.isArray(ai)) ai.forEach(a => aiERPRegistry.register(a));

  // 7. Automatic Enterprise Platform Bootstrap (Recover from Templates)
  bootstrapEnterprisePlatform();

  // Restore ERP metadata and availability
  return {
    status: "RESTORED",
    erpDiscoveryStatus: erpDiscoveryService.health(),
    workspaceResolverStatus: erpWorkspaceResolver.health(),
    restoredInstances: erpInstanceRegistry.list().length
  };
}

export function bootstrapEnterprisePlatform() {
  console.log("[UEOS] Bootstrapping Enterprise Platform Ecosystem...");
  return erpRecoveryEngine.auditAndRecover();
}