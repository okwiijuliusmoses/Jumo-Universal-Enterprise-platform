/**
 * JUMO UEOS
 * Enterprise Component Generator
 *
 * Generates reusable enterprise components for each manufactured ERP platform
 * and registers them in the central Component Registry.
 */

import { componentRegistry } from "../../../registry/componentRegistry.js";

export class ComponentGenerator {
  generate(blueprint, directive = {}) {
    const erpInstanceId = directive.instanceId || `${blueprint.id}-instance`;
    const sectorName = blueprint.name || "Enterprise";

    // Reusable enterprise components mandated by the production directive
    const coreComponents = [
      { id: `comp-${erpInstanceId}-form`, name: `${sectorName} Form Component`, type: "FORM" },
      { id: `comp-${erpInstanceId}-workflow`, name: `${sectorName} Workflow Component`, type: "WORKFLOW" },
      { id: `comp-${erpInstanceId}-portal`, name: `${sectorName} Portal Component`, type: "PORTAL" },
      { id: `comp-${erpInstanceId}-analytics`, name: `${sectorName} Analytics Component`, type: "ANALYTICS" },
      { id: `comp-${erpInstanceId}-ai`, name: `${sectorName} AI Component`, type: "AI" },
      { id: `comp-${erpInstanceId}-security`, name: `${sectorName} Security Component`, type: "SECURITY" },
      { id: `comp-${erpInstanceId}-integration`, name: `${sectorName} Integration Component`, type: "INTEGRATION" }
    ];

    coreComponents.forEach(comp => {
      componentRegistry.register({
        ...comp,
        erpId: erpInstanceId,
        status: "ACTIVE",
        createdAt: new Date().toISOString()
      });
    });

    const results = coreComponents.map(c => c.name);

    // Also support any template components or standard fallback list
    const fallbackList = [
      "Dashboard Component",
      "Data Table Component",
      "Search Component",
      "AI Assistant Panel",
      "Integration Gateway Status Board"
    ];

    return [...new Set([...results, ...fallbackList])];
  }
}

export const componentGenerator = new ComponentGenerator();
