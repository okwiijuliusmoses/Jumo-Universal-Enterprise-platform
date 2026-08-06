/**
 * JUMO UEOS Configuration Engine
 *
 * Runtime configuration resolver.
 *
 * The UI and services consume generated configuration,
 * never hardcoded ERP-specific conditions.
 */

import ERPInstanceRegistry from "./instanceRegistry";


export interface RuntimeNavigationItem {
  id: string;
  name: string;
  type: "PORTAL" | "MODULE" | "DEPARTMENT" | "WORKFLOW" | "SERVICE";
}

export interface RuntimeConfiguration {
  instanceId: string;
  apps: string[];
  modules: string[];
  services: string[];
  navigation: RuntimeNavigationItem[];
  workflows: string[];
  portals: string[];
  departments: string[];
  forms: string[];
  components: string[];
  aiProfile: string;
  securityProfile?: any;
  governanceStructure?: any;
  publicExperience?: any;
}

export class ConfigurationEngine {
  static loadInstanceConfiguration(instanceId: string): RuntimeConfiguration {
    const instance = ERPInstanceRegistry.getById(instanceId);

    if (!instance) {
      throw new Error(`ERP instance not found: ${instanceId}`);
    }

    const config: any = instance.configuration || {};
    const portals = Array.isArray(config.portals) ? config.portals : [];
    const modules = Array.isArray(config.modules) ? config.modules : (Array.isArray(instance.modules) ? instance.modules : []);
    const departments = Array.isArray(config.departments) ? config.departments : [];
    const workflows = Array.isArray(config.workflows) ? config.workflows : (Array.isArray(instance.workflows) ? instance.workflows : []);
    const forms = Array.isArray(config.forms) ? config.forms : [];
    const components = Array.isArray(config.components) ? config.components : [];

    const apps = Array.isArray(config.apps) && config.apps.length > 0
      ? config.apps
      : (Array.isArray(instance.apps) && instance.apps.length > 0 ? instance.apps : portals);

    const services = Array.isArray(config.services) && config.services.length > 0
      ? config.services
      : (Array.isArray(instance.services) && instance.services.length > 0
        ? instance.services
        : ["FAAP Ledger Service", "Identity & Zero-Trust Service", "Workflow Engine Service"]);

    const navigation: RuntimeNavigationItem[] = [];

    portals.forEach(portal => {
      navigation.push({
        id: portal.toLowerCase().replace(/\s+/g, "-"),
        name: portal,
        type: "PORTAL"
      });
    });

    modules.forEach(module => {
      navigation.push({
        id: module.toLowerCase().replace(/\s+/g, "-"),
        name: module,
        type: "MODULE"
      });
    });

    departments.forEach(department => {
      navigation.push({
        id: department.toLowerCase().replace(/\s+/g, "-"),
        name: department,
        type: "DEPARTMENT"
      });
    });

    workflows.forEach(workflow => {
      navigation.push({
        id: workflow.toLowerCase().replace(/\s+/g, "-"),
        name: workflow,
        type: "WORKFLOW"
      });
    });

    services.forEach(service => {
      navigation.push({
        id: service.toLowerCase().replace(/\s+/g, "-"),
        name: service,
        type: "SERVICE"
      });
    });

    const rawConfig: RuntimeConfiguration = {
      instanceId,
      apps,
      modules,
      services,
      navigation,
      workflows,
      portals,
      departments,
      forms,
      components,
      aiProfile: config.aiProfile || "sovereign-ai",
      securityProfile: config.securityProfile,
      governanceStructure: config.governanceStructure,
      publicExperience: config.publicExperience
    };

    return this.validateAndNormalizeWorkspace(rawConfig);
  }

  static validateAndNormalizeWorkspace<T extends Record<string, any>>(workspace: T): T {
    if (!workspace || typeof workspace !== "object") {
      workspace = {} as T;
    }
    (workspace as any).apps = Array.isArray((workspace as any).apps) ? (workspace as any).apps : [];
    (workspace as any).modules = Array.isArray((workspace as any).modules) ? (workspace as any).modules : [];
    (workspace as any).services = Array.isArray((workspace as any).services) ? (workspace as any).services : [];
    (workspace as any).navigation = Array.isArray((workspace as any).navigation) ? (workspace as any).navigation : [];
    (workspace as any).workflows = Array.isArray((workspace as any).workflows) ? (workspace as any).workflows : [];
    (workspace as any).portals = Array.isArray((workspace as any).portals) ? (workspace as any).portals : [];
    (workspace as any).departments = Array.isArray((workspace as any).departments) ? (workspace as any).departments : [];
    (workspace as any).forms = Array.isArray((workspace as any).forms) ? (workspace as any).forms : [];
    (workspace as any).components = Array.isArray((workspace as any).components) ? (workspace as any).components : [];
    return workspace;
  }

  static validateConfiguration(configuration: RuntimeConfiguration): boolean {
    if (!configuration) return false;
    this.validateAndNormalizeWorkspace(configuration);
    return Boolean(
      configuration.instanceId &&
      configuration.modules.length >= 0 &&
      configuration.navigation.length >= 0
    );
  }
}



export default ConfigurationEngine;
