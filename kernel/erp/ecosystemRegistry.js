import { universityConfig } from './education/universityConfig.js';
import { collegeConfig } from './education/collegeConfig.js';
import { vocationalConfig } from './education/vocationalConfig.js';
import { secondaryConfig } from './education/secondaryConfig.js';
import { primaryConfig } from './education/primaryConfig.js';
import { alumniConfig } from './education/alumniConfig.js';

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
          primaryConfig,
          alumniConfig
        ],
        installedInstances: 6
      },
      Government: {
        name: "Government Ecosystem",
        templates: [
          { id: "Ministry-ERP", name: "Ministry & Public Service ERP", family: "Government", governanceModel: "Permanent Secretary & Minister" },
          { id: "LocalGov-ERP", name: "Local Government & District ERP", family: "Government", governanceModel: "District Chairperson & Chief Administrative Officer" }
        ],
        installedInstances: 2
      },
      Healthcare: {
        name: "Healthcare Ecosystem",
        templates: [
          { id: "Hospital-ERP", name: "General Hospital ERP", family: "Healthcare", governanceModel: "Medical Director & Hospital Board" },
          { id: "Clinic-ERP", name: "Specialized Clinic ERP", family: "Healthcare", governanceModel: "Chief Medical Officer" }
        ],
        installedInstances: 2
      },
      Finance: {
        name: "Financial & Banking Ecosystem",
        templates: [
          { id: "FAAP-Financials", name: "FAAP General Ledger & Treasury ERP", family: "Finance", governanceModel: "Chief Financial Officer & Board Audit Committee" },
          { id: "Banking-Core", name: "Digital Banking Core ERP", family: "Finance", governanceModel: "Managing Director & Risk Directorate" }
        ],
        installedInstances: 3
      },
      Hospitality: {
        name: "Hospitality Ecosystem",
        templates: [
          { id: "Hotel-Resort-ERP", name: "Hotel & Resort Management ERP", family: "Hospitality", governanceModel: "General Manager & Executive Committee" }
        ],
        installedInstances: 1
      },
      Church: {
        name: "Faith-Based Ecosystem",
        templates: [
          { id: "Diocese-Church-ERP", name: "Diocese & Church Administration ERP", family: "Church", governanceModel: "Bishop & Diocesan Council" }
        ],
        installedInstances: 1
      },
      BusinessAssociation: {
        name: "Business Association & Chamber Ecosystem",
        templates: [
          { id: "Chamber-ERP", name: "Chamber of Commerce & Trade Association ERP", family: "BusinessAssociation", governanceModel: "President & Executive Secretariat" }
        ],
        installedInstances: 1
      },
      Company: {
        name: "Universal Corporate Enterprise Ecosystem",
        templates: [
          { id: "Corporate-ERP", name: "Multi-Department Corporate Enterprise ERP", family: "Company", governanceModel: "CEO & Board of Directors" }
        ],
        installedInstances: 4
      },
      Microfinance: {
        name: "Microfinance & SACCO Ecosystem",
        templates: [
          { id: "SACCO-ERP", name: "SACCO & Microfinance Lending ERP", family: "Microfinance", governanceModel: "SACCO Board & Credit Committee" }
        ],
        installedInstances: 2
      },
      Agribusiness: {
        name: "Agribusiness & Cooperative Ecosystem",
        templates: [
          { id: "Agri-ERP", name: "Agribusiness & Farmers Cooperative ERP", family: "Agribusiness", governanceModel: "Cooperative Board & General Manager" }
        ],
        installedInstances: 2
      },
      GeneralMerchandise: {
        name: "Wholesale & Retail Merchandise Ecosystem",
        templates: [
          { id: "Retail-ERP", name: "Wholesale & Retail Chain Merchandise ERP", family: "GeneralMerchandise", governanceModel: "Operations Director & Logistics Head" }
        ],
        installedInstances: 3
      },
      FamilyClan: {
        name: "Family & Heritage Clan Ecosystem",
        templates: [
          { id: "Clan-ERP", name: "Family Heritage & Clan Council ERP", family: "FamilyClan", governanceModel: "Clan Elders & Executive Council" }
        ],
        installedInstances: 1
      },
      LegalServices: {
        name: "Legal Practice & Law Firm Ecosystem",
        templates: [
          { id: "LawFirm-ERP", name: "Legal Practice & Case Management ERP", family: "LegalServices", governanceModel: "Managing Partner & Senior Counsel" }
        ],
        installedInstances: 1
      },
      ProfessionalServices: {
        name: "Professional Consultancy & Agency Ecosystem",
        templates: [
          { id: "Agency-ERP", name: "Professional Consultancy & Project Agency ERP", family: "ProfessionalServices", governanceModel: "Principal Consultant & Managing Partners" }
        ],
        installedInstances: 2
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

