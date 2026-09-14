/**
 * JUMO UEOS
 * ERP Family Registry
 */

export class ERPFamilyRegistry {
  constructor() {
    this.families = [
      {
        id: "education-family",
        name: "Education ERP Family",
        code: "EDU",
        description: "Comprehensive institutional ERP platforms for schools, colleges, and universities.",
        sectors: ["Higher Education", "K-12", "Vocational Training", "Research Institutions"],
        templates: ["education-university-template", "education-k12-template"]
      },
      {
        id: "government-family",
        name: "Government ERP Family",
        code: "GOV",
        description: "Public sector management, ministries, local government administration, and citizen services.",
        sectors: ["Central Government", "Local Authorities", "Public Agencies"],
        templates: ["government-ministry-template", "government-local-template"]
      },
      {
        id: "financial-services-family",
        name: "Financial Services ERP Family",
        code: "FIN",
        description: "Core banking, microfinance, SACCOs, insurance, and financial technology institutions.",
        sectors: ["Banking", "Microfinance", "SACCO", "Insurance", "FinTech"],
        templates: ["finance-banking-template", "finance-sacco-template"]
      },
      {
        id: "healthcare-family",
        name: "Healthcare ERP Family",
        code: "MED",
        description: "Hospital management, clinics, medical laboratories, and pharmaceutical supply chains.",
        sectors: ["Hospitals", "Specialized Clinics", "Diagnostic Labs", "Pharmacies"],
        templates: ["healthcare-hospital-template", "healthcare-clinic-template"]
      },
      {
        id: "business-commerce-family",
        name: "Business & Commerce ERP Family",
        code: "COM",
        description: "Enterprise resource planning for commercial enterprises, retail, wholesale, and manufacturing.",
        sectors: ["Retail", "Wholesale", "Manufacturing", "Supply Chain", "Corporate"],
        templates: ["commerce-enterprise-template", "commerce-retail-template"]
      },
      {
        id: "agriculture-family",
        name: "Agriculture ERP Family",
        code: "AGR",
        description: "Agribusiness management, farmer cooperatives, and agricultural value-chain platforms.",
        sectors: ["Agribusiness", "Cooperatives", "AgriTech"],
        templates: ["agriculture-agribusiness-template", "agriculture-cooperative-template"]
      },
      {
        id: "social-institution-family",
        name: "Social Institution ERP Family",
        code: "SOC",
        description: "Management solutions for NGOs, religious institutions, community foundations, and alumni networks.",
        sectors: ["NGOs", "Religious Bodies", "Foundations", "Alumni Networks"],
        templates: ["social-ngo-template", "social-religious-template"]
      }
    ];
  }

  listFamilies() {
    return this.families;
  }

  getFamily(id) {
    return this.families.find(f => f.id === id || f.code === id);
  }
}

export const erpFamilyRegistry = new ERPFamilyRegistry();
