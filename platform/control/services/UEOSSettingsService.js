/**
 * JUMO UEOS
 * Unified Settings Federation Service
 */

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


export class UEOSSettingsService {

  getAllSettings() {
    return {
      universal: universalSettingsRegistry.list(),
      platforms: platformSettingsRegistry.list(),
      applications: applicationSettingsRegistry.list(),
      layers: layerConfigurationRegistry.list(),
      modules: moduleConfigurationRegistry.list(),
      departments: departmentConfigurationRegistry.list(),
      servers: serverConfigurationRegistry.list(),
      components: componentConfigurationRegistry.list(),
      forms: formConfigurationRegistry.list(),
      workflows: workflowConfigurationRegistry.list(),
      commercialPlatforms: commercialPlatformRegistry.list(),
      navigation: navigationConfigurationRegistry.list(),
      publicExperience: publicExperienceRegistry.list(),
      lifecycle: lifecycleConfigurationRegistry.list(),
      upgrades: upgradeConfigurationRegistry.list()
    };
  }

  getModuleSettings(moduleId) {
    return moduleConfigurationRegistry.get(moduleId);
  }

  getWorkflowSettings(workflowId) {
    return workflowConfigurationRegistry.get(workflowId);
  }

  getPlatformSettings() {
    return platformSettingsRegistry.list();
  }


 health(){

  return {

   registry:
   "JUMO UEOS Universal Settings Federation",

   status:"ONLINE",

   settings:{
    
    universal:
    universalSettingsRegistry.health(),

    platforms:
    platformSettingsRegistry.health(),

    applications:
    applicationSettingsRegistry.health(),

    layers:
    layerConfigurationRegistry.health(),

    modules:
    moduleConfigurationRegistry.health(),

    departments:
    departmentConfigurationRegistry.health(),

    servers:
    serverConfigurationRegistry.health(),

    components:
    componentConfigurationRegistry.health(),

    forms:
    formConfigurationRegistry.health(),

    workflows:
    workflowConfigurationRegistry.health(),

    commercialPlatforms:
    commercialPlatformRegistry.health(),

    navigation:
    navigationConfigurationRegistry.health(),

    publicExperience:
    publicExperienceRegistry.health(),

    lifecycle:
    lifecycleConfigurationRegistry.health(),

    upgrades:
    upgradeConfigurationRegistry.health()

   }

  };

 }

}


export const ueosSettingsService =
new UEOSSettingsService();
