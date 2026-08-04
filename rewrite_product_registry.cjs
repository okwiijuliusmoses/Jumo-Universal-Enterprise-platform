const fs = require('fs');

const content = `/**
 * JUMO UEOS
 * ERP Product Definition Registry
 */

import { erpEcosystemTemplateRegistry } from "../factory/erp/ERPEcosystemTemplateRegistry.js";
import { ERPBlueprintRegistry } from "../factory/erp/ERPBlueprintRegistry.js";

export class ERPProductRegistry {
  constructor() {
    this.products = [];
    this.initializeFromTemplates();
  }

  initializeFromTemplates() {
    this.products = [];
    const templates = erpEcosystemTemplateRegistry.listTemplates();

    templates.forEach(template => {
      const blueprint = ERPBlueprintRegistry.getBlueprint(template.ecosystemId);
      
      this.products.push({
        id: template.id,
        name: template.name,
        ecosystemId: template.ecosystemId,
        ecosystemName: blueprint ? blueprint.name : "Unknown Ecosystem",
        domain: template.name.replace(' ERP', ''),
        governanceModel: \`\${template.name.replace(' ERP', '')} Executive Governance\`,
        portals: template.portals,
        departments: template.departments,
        modules: template.modules,
        workflows: template.workflows,
        forms: ["Registry Form", "Operational Form"],
        components: template.components,
        permissions: [],
        settings: blueprint?.settings || {}
      });
    });
  }

  list() {
    return this.products;
  }

  getProduct(id) {
    return this.products.find(p => p.id === id);
  }

  registerProduct(product) {
    if (!this.products.find(p => p.id === product.id)) {
      this.products.push(product);
    }
  }
}

export const erpProductRegistry = new ERPProductRegistry();
`;

fs.writeFileSync('platform/registry/ERPProductRegistry.js', content);
console.log('Product Registry rewritten to use Template Registry');
