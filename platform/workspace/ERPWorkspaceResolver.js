/**
 * JUMO UEOS
 * ERP Workspace Resolver
 */

import { erpInstanceRegistry } from "../registry/ERPInstanceRegistry.js";
import { ERPBlueprintRegistry } from "../factory/erp/ERPBlueprintRegistry.js";
import { moduleRegistry } from "../registry/moduleRegistry.js";
import { portalRegistry } from "../registry/portalRegistry.js";
import { workflowRegistry } from "../registry/workflowRegistry.js";

export class ERPWorkspaceResolver {
  constructor() {
    this.status = "ONLINE";
  }

  resolveWorkspace(tenantId, erpId) {
    const instance = erpInstanceRegistry.get(erpId);
    if (!instance) {
      throw new Error(`ERP Instance ${erpId} not found or not active.`);
    }

    const blueprint = ERPBlueprintRegistry.getBlueprint(instance.templateId) || {};
    
    // Merge baseline capabilities with deployed capabilities
    const enabledModules = instance.modules || blueprint.modules || [];
    const enabledPortals = instance.portals || blueprint.portals || [];
    const enabledWorkflows = instance.workflows || blueprint.workflows || [];
    const activeAgents = instance.agents || blueprint.agents || [];

    const loadedModules = enabledModules.map(m => moduleRegistry.get(m) || { name: m, type: "Unknown" });
    const loadedPortals = enabledPortals.map(p => portalRegistry.get(p) || { name: p, type: "Unknown" });
    const loadedWorkflows = enabledWorkflows.map(w => workflowRegistry.get(w) || { name: w, type: "Unknown" });

    return {
      tenantId,
      erpId: instance.instanceId,
      erpName: instance.name,
      domain: instance.domain,
      status: instance.status,
      workspace: {
        modules: loadedModules,
        portals: loadedPortals,
        workflows: loadedWorkflows,
        agents: activeAgents
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
