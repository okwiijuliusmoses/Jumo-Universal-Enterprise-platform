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
import { ERP_CATALOGUE } from '../../experience/erp/runtimeEngine.js';

export class EcosystemRegistry {
  constructor() {
    const getReal = (catalogueId, fallback) => {
      const found = ERP_CATALOGUE.find(t => t.id === catalogueId);
      if (found) {
        return {
          ...fallback,
          ...found,
          id: fallback.id, // Preserve original config ID for installation/routing bindings
          name: fallback.name || found.name,
          description: fallback.description || found.description,
          catalogueId: catalogueId
        };
      }
      return fallback;
    };

    this.ecosystems = {
      Education: {
        name: "Education ERP Ecosystem",
        templates: [
          getReal("edu-uni", universityConfig),
          getReal("edu-col", collegeConfig),
          getReal("edu-voc", vocationalConfig),
          getReal("edu-sec", secondaryConfig),
          getReal("edu-pri", primaryConfig),
          getReal("standalone-alumni", alumniConfig)
        ],
        installedInstances: 6
      },
      Government: {
        name: "Government & Public Service Ecosystem",
        templates: [
          getReal("standalone-gov", governmentConfig),
          getReal("standalone-gov", { id: "LocalGov-ERP", name: "Local Government & District ERP", family: "Government", governanceModel: "District Chairperson & CAO", description: "District council administration and local service delivery platform." })
        ],
        installedInstances: 2
      },
      Healthcare: {
        name: "Healthcare & Hospital Ecosystem",
        templates: [
          getReal("standalone-health", healthcareConfig),
          getReal("standalone-health", { id: "Clinic-ERP", name: "Specialized Clinic & Diagnostics ERP", family: "Healthcare", governanceModel: "Chief Medical Officer", description: "Outpatient and specialized clinic operating system." })
        ],
        installedInstances: 2
      },
      Finance: {
        name: "Financial & Banking Ecosystem",
        templates: [
          getReal("standalone-micro", financeConfig),
          getReal("standalone-micro", { id: "Banking-Core", name: "Digital Banking Core ERP", family: "Finance", governanceModel: "Managing Director & Risk Directorate", description: "Core banking ledger, customer accounts, and lending engine." })
        ],
        installedInstances: 3
      },
      Church: {
        name: "Faith & Church Ecosystem",
        templates: [
          getReal("church-prov", churchConfig),
          getReal("church-dio", { id: "Church-Diocese-ERP", name: "Church Diocese Operating Platform", family: "Church", governanceModel: "Bishop & Standing Committee", description: "Diocesan level governance, lands trust, and clergy postings." }),
          getReal("church-parish", { id: "Church-Parish-ERP", name: "Local Parish Operational Platform", family: "Church", governanceModel: "Senior Priest & Elders Council", description: "Local parish member registry, weekly FAAP tithes clearance, and cell groups." })
        ],
        installedInstances: 3
      },
      GeneralMerchandise: {
        name: "Commercial & Retail Ecosystem",
        templates: [
          getReal("comp-retail", commercialConfig)
        ],
        installedInstances: 3
      },
      Agribusiness: {
        name: "Agriculture & Cooperative Ecosystem",
        templates: [
          getReal("standalone-custom", agriConfig)
        ],
        installedInstances: 2
      },
      LegalServices: {
        name: "Professional & Legal Services Ecosystem",
        templates: [
          getReal("standalone-legal", professionalConfig)
        ],
        installedInstances: 1
      },
      FamilyClan: {
        name: "Community & Clan Ecosystem",
        templates: [
          getReal("standalone-clan", clanConfig)
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

