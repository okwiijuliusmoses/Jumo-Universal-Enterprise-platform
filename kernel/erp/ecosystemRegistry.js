import { universityConfig } from './education/universityConfig.js';
import { collegeConfig } from './education/collegeConfig.js';
import { vocationalConfig } from './education/vocationalConfig.js';
import { secondaryConfig } from './education/secondaryConfig.js';
import { primaryConfig } from './education/primaryConfig.js';
import { alumniConfig } from './education/alumniConfig.js';
import { governmentConfig } from './governmentConfig.js';
import { healthcareConfig } from './healthcareConfig.js';
import { financeConfig } from './financeConfig.js';
import { churchConfig } from './churchConfig.js';
import { commercialConfig } from './commercialConfig.js';
import { agriConfig } from './agriConfig.js';
import { professionalConfig } from './professionalConfig.js';
import { clanConfig } from './clanConfig.js';

export class EcosystemRegistry {
  constructor() {
    this.ecosystems = {
      Education: {
        name: "Education ERP Ecosystem",
        templates: [
          universityConfig,
          collegeConfig,
          vocationalConfig,
          secondaryConfig,
          primaryConfig,
          alumniConfig
        ],
        installedInstances: 6
      },
      Government: {
        name: "Government & Public Service Ecosystem",
        templates: [
          governmentConfig,
          { id: "LocalGov-ERP", name: "Local Government & District ERP", family: "Government", governanceModel: "District Chairperson & CAO", description: "District council administration and local service delivery platform." }
        ],
        installedInstances: 2
      },
      Healthcare: {
        name: "Healthcare & Hospital Ecosystem",
        templates: [
          healthcareConfig,
          { id: "Clinic-ERP", name: "Specialized Clinic & Diagnostics ERP", family: "Healthcare", governanceModel: "Chief Medical Officer", description: "Outpatient and specialized clinic operating system." }
        ],
        installedInstances: 2
      },
      Finance: {
        name: "Financial & Banking Ecosystem",
        templates: [
          financeConfig,
          { id: "Banking-Core", name: "Digital Banking Core ERP", family: "Finance", governanceModel: "Managing Director & Risk Directorate", description: "Core banking ledger, customer accounts, and lending engine." }
        ],
        installedInstances: 3
      },
      Church: {
        name: "Faith & Church Ecosystem",
        templates: [
          churchConfig
        ],
        installedInstances: 1
      },
      GeneralMerchandise: {
        name: "Commercial & Retail Ecosystem",
        templates: [
          commercialConfig
        ],
        installedInstances: 3
      },
      Agribusiness: {
        name: "Agriculture & Cooperative Ecosystem",
        templates: [
          agriConfig
        ],
        installedInstances: 2
      },
      LegalServices: {
        name: "Professional & Legal Services Ecosystem",
        templates: [
          professionalConfig
        ],
        installedInstances: 1
      },
      FamilyClan: {
        name: "Community & Clan Ecosystem",
        templates: [
          clanConfig
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

