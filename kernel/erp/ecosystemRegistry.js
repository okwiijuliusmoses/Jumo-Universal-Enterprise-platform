import { universityConfig } from './education/universityConfig.js';
import { collegeConfig } from './education/collegeConfig.js';
import { vocationalConfig } from './education/vocationalConfig.js';
import { secondaryConfig } from './education/secondaryConfig.js';
import { primaryConfig } from './education/primaryConfig.js';

export class EcosystemRegistry {
  constructor() {
    this.ecosystems = {
      Education: {
        name: "Education Ecosystem",
        templates: [
          universityConfig,
          collegeConfig,
          vocationalConfig,
          secondaryConfig,
          primaryConfig
        ],
        installedInstances: 5
      },
      Government: {
        name: "Government Ecosystem",
        templates: [
          { id: "Ministry-ERP", name: "Ministry & Public Service ERP", family: "Government" },
          { id: "LocalGov-ERP", name: "Local Government & District ERP", family: "Government" }
        ],
        installedInstances: 2
      },
      Healthcare: {
        name: "Healthcare Ecosystem",
        templates: [
          { id: "Hospital-ERP", name: "General Hospital ERP", family: "Healthcare" },
          { id: "Clinic-ERP", name: "Specialized Clinic ERP", family: "Healthcare" }
        ],
        installedInstances: 2
      },
      Finance: {
        name: "Financial & Banking Ecosystem",
        templates: [
          { id: "FAAP-Financials", name: "FAAP General Ledger & Treasury ERP", family: "Finance" },
          { id: "Banking-Core", name: "Digital Banking Core ERP", family: "Finance" }
        ],
        installedInstances: 3
      },
      Hospitality: {
        name: "Hospitality Ecosystem",
        templates: [
          { id: "Hotel-Resort-ERP", name: "Hotel & Resort Management ERP", family: "Hospitality" }
        ],
        installedInstances: 1
      },
      Church: {
        name: "Faith-Based Ecosystem",
        templates: [
          { id: "Diocese-Church-ERP", name: "Diocese & Church Administration ERP", family: "Church" }
        ],
        installedInstances: 1
      }
    };
  }

  getEcosystems() {
    return Object.keys(this.ecosystems);
  }

  getTemplates(ecosystem) {
    return this.ecosystems[ecosystem]?.templates || [];
  }

  getAllTemplates() {
    let all = [];
    for (const eco of Object.values(this.ecosystems)) {
      all = all.concat(eco.templates);
    }
    return all;
  }
}

