/**
 * JUMO UEOS
 * Enterprise Component Generator
 */

import { componentRegistry } from "../../../registry/componentRegistry.js";

export class ComponentGenerator {
  generate(instance, modules = [], layers = []) {
    const erpInstanceId = instance.id;
    const sectorName = instance.name || "Enterprise";

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

    return coreComponents;
  }
}

export const componentGenerator = new ComponentGenerator();
