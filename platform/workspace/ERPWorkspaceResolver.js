/**
 * JUMO UEOS
 * ERP Workspace Resolver
 */

import { erpInstanceRegistry } from "../registry/ERPInstanceRegistry.js";
import { ERPBlueprintRegistry } from "../factory/erp/ERPBlueprintRegistry.js";
import { moduleRegistry } from "../registry/ModuleRegistry.js";
import { portalRegistry } from "../registry/PortalRegistry.js";
import { workflowRegistry } from "../registry/workflowRegistry.js";
import { ERPEnterpriseStandard } from "../factory/erp/ERPEnterpriseStandard.js";

export class ERPWorkspaceResolver {
  constructor() {
    this.status = "ONLINE";
  }

  resolveWorkspace(tenantId, erpId) {
    const instance = erpInstanceRegistry.get(erpId);
    if (!instance) {
      throw new Error(`ERP Instance ${erpId} not found or not active.`);
    }

    const blueprint = ERPBlueprintRegistry.getBlueprint(instance.blueprintId || instance.templateId) || {};
    const standard = ERPEnterpriseStandard.getStandardProfile(blueprint);
    
    // Merge baseline capabilities with deployed capabilities
    const enabledModules = instance.modules || blueprint.modules || blueprint.capabilities || standard.modules;
    const enabledPortals = instance.portals || blueprint.portals || standard.portals;
    const enabledWorkflows = instance.workflows || blueprint.workflows || standard.workflows;
    const activeAgents = instance.agents || blueprint.agents || blueprint.aiAgents || [];
    const enabledComponents = instance.components || blueprint.components || standard.components;
    const enabledForms = instance.forms || blueprint.forms || standard.forms;
    const enabledDepartments = instance.departments || blueprint.departments || standard.departments;
    const enabledRoles = instance.roles || blueprint.roles || standard.roles;
    const enabledPermissions = instance.permissions || blueprint.permissions || standard.permissions;
    const enabledReports = instance.reports || blueprint.reports || standard.reports;
    const enabledDashboards = instance.dashboards || blueprint.dashboards || standard.dashboards;

    const loadedModules = enabledModules.map(m => {
      const modId = typeof m === 'string' ? m : m.id;
      return moduleRegistry.get(modId) || { name: typeof m === 'string' ? m : m.name, type: "Unknown", id: modId };
    });

    const loadedPortals = enabledPortals.map(p => {
      const portalId = typeof p === 'string' ? p : p.id;
      return portalRegistry.get(portalId) || { name: typeof p === 'string' ? p : p.name, type: "Portal", id: portalId };
    });

    const loadedWorkflows = enabledWorkflows.map(w => {
      const wfId = typeof w === 'string' ? w : w.id;
      return workflowRegistry.get(wfId) || { name: typeof w === 'string' ? w : w.name, type: "Workflow", id: wfId };
    });

    // Resolve settings from various registries if available
    const settings = {
       ...(standard.settings || {}),
       ...(blueprint.settings || {}),
       ...(instance.settings || {})
    };

    return {
      tenantId: instance.tenant || tenantId,
      erpId: instance.id || instance.instanceId,
      blueprintId: instance.blueprintId,
      erpName: instance.name,
      domain: instance.domain,
      lifecycle: instance.lifecycle || "RUNNING",
      status: instance.status || "ACTIVE",
      configurationStatus: instance.configurationStatus || "CONFIGURED",
      deploymentStatus: instance.deploymentStatus || "DEPLOYED",
      runtimeStatus: instance.runtimeStatus || "ONLINE",
      workspace: {
        modules: loadedModules,
        portals: loadedPortals,
        workflows: loadedWorkflows,
        components: enabledComponents,
        forms: enabledForms,
        departments: enabledDepartments,
        roles: enabledRoles,
        permissions: enabledPermissions,
        reports: enabledReports,
        dashboards: enabledDashboards,
        agents: activeAgents,
        settings: settings,
        navigation: blueprint.navigation || standard.navigation
      },
      configuration: {
        settings: settings,
        configuration: instance.configuration || blueprint.configuration || {},
        features: instance.features || blueprint.features || {},
        permissions: enabledPermissions,
        policies: instance.policies || blueprint.policies || {}
      },
      resolvedAt: new Date().toISOString()
    };
  }

  health() {
    return {
      status: this.status,
      resolver: "UEOS ERP Workspace Resolver"
    };
  }
}

export const erpWorkspaceResolver = new ERPWorkspaceResolver();
