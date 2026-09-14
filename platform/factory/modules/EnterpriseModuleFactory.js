/**
 * JUMO UEOS
 * Enterprise Module Factory
 */

export class EnterpriseModuleFactory {
  constructor() {
    this.sectorModules = {
      education: [
        "Academic Management",
        "Student Lifecycle",
        "Admissions",
        "Examinations",
        "Learning Management",
        "Library Management",
        "Research Management",
        "Human Resource",
        "Finance Integration",
        "Procurement",
        "Accommodation",
        "Transport",
        "Healthcare Centre",
        "Alumni Relations"
      ],
      government: [
        "Citizen Services",
        "Ministry Management",
        "Public Finance",
        "Procurement & Tender",
        "HR & Payroll",
        "Records Management",
        "Policy Monitoring",
        "Audit & Compliance",
        "Revenue Collection",
        "Case Management"
      ],
      finance: [
        "Core Banking & Ledger",
        "Loan & Credit Management",
        "Treasury & Liquidity",
        "Risk & Compliance",
        "Savings & Deposits",
        "Payment Gateway Integration",
        "Customer Relationship Management",
        "Audit & Internal Controls"
      ],
      healthcare: [
        "Patient Management",
        "Clinical Operations",
        "Pharmacy Inventory",
        "Laboratory Diagnostics",
        "Billing & Insurance",
        "Equipment Maintenance",
        "HR & Staff Scheduling",
        "Emergency Services"
      ],
      commerce: [
        "Supply Chain Management",
        "Inventory Control",
        "Order Fulfillment",
        "Manufacturing Operations",
        "Sales & Distribution",
        "Procurement",
        "Financial Accounting",
        "Customer Portal"
      ],
      agriculture: [
        "Farmer Registry",
        "Cooperative Management",
        "Crop Collection & Grading",
        "Supply Chain Tracing",
        "Input Distribution",
        "Financial Accounting",
        "Market Intelligence"
      ],
      social: [
        "Grant Management",
        "Project Tracking",
        "Donor Reporting",
        "Beneficiary Registry",
        "Financial Accounting",
        "HR & Volunteer Management"
      ]
    };
  }

  getModulesForSector(sector) {
    const key = (sector || "").toLowerCase();
    for (const [sKey, mods] of Object.entries(this.sectorModules)) {
      if (key.includes(sKey)) {
        return mods;
      }
    }
    // Default general enterprise modules
    return [
      "Core Operations",
      "Document Management",
      "Workflow Engine",
      "Financial Integration",
      "Human Resources",
      "Reporting & Analytics",
      "Compliance Monitoring"
    ];
  }
}

export const enterpriseModuleFactory = new EnterpriseModuleFactory();
