/**
 * JUMO UEOS
 * Enterprise Registry Snapshot Manager
 */

import { registryPersistenceEngine } 
from "./RegistryPersistenceEngine.js";

import { erpRegistry } 
from "../registry/ERPRegistry.js";

import { erpInstanceRegistry } 
from "../registry/ERPInstanceRegistry.js";

import { portalRegistry } 
from "../registry/PortalRegistry.js";

import { moduleRegistry } 
from "../registry/ModuleRegistry.js";

import { formRegistry } 
from "../registry/formRegistry.js";

import { workflowRegistry } 
from "../registry/workflowRegistry.js";

import { componentRegistry } 
from "../registry/componentRegistry.js";

import { departmentRegistry } 
from "../registry/departmentRegistry.js";

import { aiERPRegistry } 
from "../registry/ai/AIERPRegistry.js";

// Settings Registries
import { universalSettingsRegistry } from "../control/settings/UniversalSettingsRegistry.js";
import { platformSettingsRegistry } from "../control/settings/PlatformSettingsRegistry.js";
import { applicationSettingsRegistry } from "../control/settings/ApplicationSettingsRegistry.js";
import { layerConfigurationRegistry } from "../control/settings/LayerConfigurationRegistry.js";
import { moduleConfigurationRegistry } from "../control/settings/ModuleConfigurationRegistry.js";
import { departmentConfigurationRegistry } from "../control/settings/DepartmentConfigurationRegistry.js";
import { serverConfigurationRegistry } from "../control/settings/ServerConfigurationRegistry.js";
import { componentConfigurationRegistry } from "../control/settings/ComponentConfigurationRegistry.js";
import { formConfigurationRegistry } from "../control/settings/FormConfigurationRegistry.js";
import { workflowConfigurationRegistry } from "../control/settings/WorkflowConfigurationRegistry.js";
import { commercialPlatformRegistry } from "../control/settings/CommercialPlatformRegistry.js";
import { navigationConfigurationRegistry } from "../control/settings/NavigationConfigurationRegistry.js";
import { publicExperienceRegistry } from "../control/settings/PublicExperienceRegistry.js";
import { lifecycleConfigurationRegistry } from "../control/settings/LifecycleConfigurationRegistry.js";
import { upgradeConfigurationRegistry } from "../control/settings/UpgradeConfigurationRegistry.js";

export class UEOSRegistrySnapshotManager {


 saveAll(){

   return {

    erp:
    registryPersistenceEngine.save(
      "erp-registry",
      erpRegistry.list()
    ),

    erpInstances:
    registryPersistenceEngine.save(
      "erp-instance-registry",
      erpInstanceRegistry.list()
    ),

    portals:
    registryPersistenceEngine.save(
      "portal-registry",
      portalRegistry.list()
    ),

    modules:
    registryPersistenceEngine.save(
      "module-registry",
      moduleRegistry.list()
    ),

    forms:
    registryPersistenceEngine.save(
      "form-registry",
      formRegistry.list()
    ),

    workflows:
    registryPersistenceEngine.save(
      "workflow-registry",
      workflowRegistry.list()
    ),

    components:
    registryPersistenceEngine.save(
      "component-registry",
      componentRegistry.list()
    ),

    departments:
    registryPersistenceEngine.save(
      "department-registry",
      departmentRegistry.list()
    ),

    ai:
    registryPersistenceEngine.save(
      "ai-erp-registry",
      aiERPRegistry.list()
    ),

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

 loadAll(){
    // Dependencies first
    const modules = registryPersistenceEngine.load("module-registry");
    modules.forEach(i => moduleRegistry.register(i));

    const portals = registryPersistenceEngine.load("portal-registry");
    portals.forEach(i => portalRegistry.register(i));

    const workflows = registryPersistenceEngine.load("workflow-registry");
    workflows.forEach(i => workflowRegistry.register(i));

    // Instances later
    const erpInstances = registryPersistenceEngine.load("erp-instance-registry");
    erpInstances.forEach(i => erpInstanceRegistry.register(i));

    const erp = registryPersistenceEngine.load("erp-registry");
    erp.forEach(i => erpRegistry.register(i));

    const forms = registryPersistenceEngine.load("form-registry");
    forms.forEach(i => formRegistry.register(i));

    const components = registryPersistenceEngine.load("component-registry");
    components.forEach(i => componentRegistry.register(i));

    const departments = registryPersistenceEngine.load("department-registry");
    departments.forEach(i => departmentRegistry.register(i));

    const ai = registryPersistenceEngine.load("ai-erp-registry");
    ai.forEach(i => aiERPRegistry.register(i));

    // Restore Settings
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

    return {
        erp: erp.length,
        erpInstances: erpInstances.length,
        portals: portals.length,
        modules: modules.length,
        forms: forms.length,
        workflows: workflows.length,
        components: components.length,
        departments: departments.length,
        ai: ai.length
    };
 }


}


export const ueosRegistrySnapshotManager =
new UEOSRegistrySnapshotManager();
