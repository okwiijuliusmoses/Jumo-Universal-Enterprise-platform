/**
 * JUMO UEOS
 * ERP Product Definition Registry
 */
import { ERPBlueprintRegistry } from "../factory/erp/ERPBlueprintRegistry.js";

export class ERPProductRegistry {
  constructor() {
    this.products = [];
    this.initializeFromBlueprints();
  }

  initializeFromBlueprints() {
    this.products = [];
    const ecosystems = ERPBlueprintRegistry.list();
    ecosystems.forEach(ecosystem => {
      if (ecosystem.configurableScope && Array.isArray(ecosystem.configurableScope)) {
        ecosystem.configurableScope.forEach(scope => {
          const productId = `${scope.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}-erp`;
          this.products.push({
            id: productId,
            name: `${scope} ERP`,
            ecosystemId: ecosystem.id,
            ecosystemName: ecosystem.name,
            domain: scope,
            governanceModel: `${scope} Executive Governance`,
            portals: [`${scope} Admin Portal`, `Operations Portal`],
            departments: [`${scope} Directorate`],
            modules: ecosystem.capabilities || [`Core ${scope} Management`],
            workflows: ["Standard Approval", "Audit Workflow", "Governance Workflow"],
            forms: ["Registry Form", "Operational Form"],
            components: ["Data Grid", "Analytics Board", "AI Assistant"],
            permissions: ecosystem.permissions || [],
            settings: ecosystem.settings || {}
          });
        });
      }
    });
  }

  list() {
    if (this.products.length === 0) {
      this.initializeFromBlueprints();
    }
    return this.products;
  }

  get(id) {
    if (this.products.length === 0) {
      this.initializeFromBlueprints();
    }
    return this.products.find(p => p.id === id);
  }
}

export const erpProductRegistry = new ERPProductRegistry();
