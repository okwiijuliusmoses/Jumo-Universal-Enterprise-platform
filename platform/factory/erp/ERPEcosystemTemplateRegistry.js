/**
 * JUMO UEOS
 * ERP Ecosystem Template Registry
 */

export class ERPEcosystemTemplateRegistry {
  constructor() {
    this.templates = [
      {
        id: "education-university-template",
        familyId: "education-family",
        name: "University & Higher Education Platform Template",
        description: "Full institutional ERP template for universities, colleges, and tertiary institutions.",
        blueprintId: "education-erp",
        defaultPortals: ["Student Portal", "Faculty Portal", "Administration Portal", "Finance Portal", "Research Portal"],
        defaultModules: ["Admissions", "Student Management", "Academic Management", "Examinations", "Learning Management", "Library", "Research", "Alumni", "Finance"],
        defaultDepartments: ["Academic Affairs", "Registrar Office", "Finance Directorate", "Human Resources", "ICT", "Research Office", "Library", "Student Affairs"]
      },
      {
        id: "government-ministry-template",
        familyId: "government-family",
        name: "Government Ministry & Public Sector Template",
        description: "Comprehensive public sector administration, citizen portals, and regulatory workflows.",
        blueprintId: "government-erp",
        defaultPortals: ["Citizen Portal", "Ministry Portal", "Administration Portal", "Service Center"],
        defaultModules: ["Citizen Services", "Ministry Management", "Public Finance", "Procurement", "HR & Payroll", "Records Management", "Policy Monitoring", "Audit"],
        defaultDepartments: ["Executive Ministry", "Treasury", "Public Service", "Procurement Directorate", "Internal Audit"]
      },
      {
        id: "finance-banking-template",
        familyId: "financial-services-family",
        name: "Core Banking & Financial Services Template",
        description: "Enterprise core banking, financial transaction processing, regulatory compliance, and risk management.",
        blueprintId: "finance-banking-erp",
        defaultPortals: ["Customer Portal", "Teller Portal", "Treasury Portal", "Compliance Portal"],
        defaultModules: ["Core Banking", "Loan Management", "Treasury & Liquidity", "Risk & Compliance", "General Ledger", "Customer Relationship", "Audit & Controls"],
        defaultDepartments: ["Credit Committee", "Treasury Desk", "Risk Management", "Customer Operations", "Internal Audit"]
      },
      {
        id: "healthcare-hospital-template",
        familyId: "healthcare-family",
        name: "Hospital & Medical Center ERP Template",
        description: "Integrated hospital management, patient records, clinical operations, and pharmacy administration.",
        blueprintId: "healthcare-erp",
        defaultPortals: ["Patient Portal", "Clinician Portal", "Pharmacy Portal", "Administration Portal"],
        defaultModules: ["Patient Management", "Clinical Operations", "Pharmacy", "Laboratory", "Billing & Insurance", "Inventory", "HR & Scheduling"],
        defaultDepartments: ["Medical Staff", "Nursing Directorate", "Pharmacy", "Laboratory Services", "Hospital Administration"]
      },
      {
        id: "commerce-enterprise-template",
        familyId: "business-commerce-family",
        name: "Enterprise Commerce & Supply Chain Template",
        description: "End-to-end ERP for wholesale, retail, manufacturing, and supply chain management.",
        blueprintId: "commerce-erp",
        defaultPortals: ["Customer Portal", "Vendor Portal", "Warehouse Portal", "Management Portal"],
        defaultModules: ["Supply Chain", "Inventory Control", "Order Management", "Manufacturing", "Sales & Distribution", "Procurement", "Financial Accounting"],
        defaultDepartments: ["Supply Chain Directorate", "Sales & Marketing", "Procurement", "Manufacturing", "Finance"]
      },
      {
        id: "agriculture-agribusiness-template",
        familyId: "agriculture-family",
        name: "Agribusiness & Cooperative Platform Template",
        description: "Agribusiness operations, farmer cooperative management, and agricultural supply chain tracing.",
        blueprintId: "agriculture-erp",
        defaultPortals: ["Farmer Portal", "Cooperative Portal", "Buyer Portal", "Admin Portal"],
        defaultModules: ["Farmer Registry", "Cooperative Management", "Crop Collection", "Supply Chain Tracing", "Input Distribution", "Financial Accounting"],
        defaultDepartments: ["Operations", "Cooperative Services", "Quality Assurance", "Finance & Grants"]
      },
      {
        id: "social-ngo-template",
        familyId: "social-institution-family",
        name: "NGO & Institutional Foundation Template",
        description: "Grant management, donor reporting, project tracking, and beneficiary impact monitoring for non-profits.",
        blueprintId: "ngo-erp",
        defaultPortals: ["Donor Portal", "Beneficiary Portal", "Project Manager Portal", "Executive Portal"],
        defaultModules: ["Grant Management", "Project Tracking", "Donor Reporting", "Beneficiary Registry", "Financial Accounting", "HR & Volunteers"],
        defaultDepartments: ["Program Management", "Grant Administration", "Finance", "MEAL (Monitoring & Evaluation)"]
      }
    ];
  }

  listTemplates() {
    return this.templates;
  }

  getTemplate(id) {
    return this.templates.find(t => t.id === id);
  }

  getTemplatesByFamily(familyId) {
    return this.templates.filter(t => t.familyId === familyId);
  }
}

export const erpEcosystemTemplateRegistry = new ERPEcosystemTemplateRegistry();
