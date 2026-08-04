/**
 * JUMO UEOS
 * ERP Recovery Engine
 */
import { erpProductRegistry } from "../../../registry/ERPProductRegistry.js";
import { erpProvisioningStateRegistry } from "../../../registry/ERPProvisioningStateRegistry.js";
import { erpFactoryManager } from "../ERPFactoryManager.js";
import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";

export class ERPRecoveryEngine {
  
  auditAndRecover() {
    console.log("[UEOS] ERP Recovery Engine: Auditing product definitions and instance provision state...");
    const products = erpProductRegistry.list();
    let recoveredCount = 0;

    products.forEach(product => {
      const isProvisioned = erpProvisioningStateRegistry.isProvisioned(product.id);
      const existingInstance = erpInstanceRegistry.get(`${product.id}-instance`);

      if (!isProvisioned || !existingInstance) {
        console.log(`[UEOS] Missing instance for product: ${product.name}. Triggering generation...`);
        
        try {
          const erpDefinition = {
            id: `${product.id}-instance`,
            name: product.name,
            blueprintId: product.ecosystemId,
            templateId: product.id,
            tenant: "system",
            domain: product.domain,
            portals: product.portals,
            departments: product.departments,
            modules: product.modules,
            workflows: product.workflows,
            forms: product.forms,
            components: product.components,
            status: "ACTIVE"
          };
          
          erpFactoryManager.generateERP(erpDefinition);
          erpProvisioningStateRegistry.setProvisioned(product.id, erpDefinition.id);
          recoveredCount++;
        } catch (err) {
          console.error(`[UEOS] Failed to recover ERP instance for ${product.name}:`, err);
        }
      }
    });

    console.log(`[UEOS] ERP Recovery Engine: Recovered ${recoveredCount} missing instances.`);
    return {
      status: "RECOVERY_COMPLETE",
      productsAudited: products.length,
      instancesRecovered: recoveredCount
    };
  }
}

export const erpRecoveryEngine = new ERPRecoveryEngine();
