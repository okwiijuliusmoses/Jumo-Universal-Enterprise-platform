const fs = require('fs');

const content = `/**
 * JUMO UEOS
 * Configurable AI ERP Blueprint Registry
 * 
 * Blueprints are configurable generation rules,
 * not locked ERP products.
 */

export const ERPBlueprintRegistry = {
  version: "1.0",
  standards: {
    portals: 20,
    modules: 200,
    forms: 500,
    workflows: 100,
    components: 100,
    aiAgents: 20
  },
  blueprints: [
    {
      id: "education-erp",
      name: "Education ERP Ecosystem",
      category: "Institutional ERP",
      templates: [
        { id: "university", name: "University ERP" },
        { id: "college", name: "College ERP" },
        { id: "vocational", name: "Vocational & Technical ERP" },
        { id: "secondary", name: "Secondary ERP" },
        { id: "primary", name: "Primary ERP" }
      ],
      capabilities: [
        "Academic Management",
        "Student Lifecycle",
        "Admissions",
        "Examinations",
        "Learning Management",
        "Library",
        "Accommodation",
        "Research Administration",
        "Alumni Integration"
      ],
      portals: [
        "Executive Portal",
        "Administration Portal",
        "Student Portal",
        "Staff Portal",
        "Finance Portal"
      ],
      settings: { theme: "JUMO Enterprise Light" },
      generationRules: { configurable: true }
    },
    {
      id: "healthcare-erp",
      name: "Healthcare ERP Ecosystem",
      category: "Clinical ERP",
      templates: [
        { id: "hospital", name: "Hospital Information ERP" },
        { id: "clinic", name: "Clinic Management ERP" },
        { id: "health-network", name: "Healthcare Network ERP" }
      ],
      capabilities: [
        "Patient Management",
        "Medical Records",
        "Pharmacy",
        "Billing",
        "Laboratory"
      ],
      portals: [
        "Executive Portal",
        "Administration Portal",
        "Patient Portal",
        "Staff Portal",
        "Finance Portal"
      ],
      settings: { theme: "JUMO Enterprise Light" },
      generationRules: { configurable: true }
    },
    {
      id: "finance-erp",
      name: "Finance ERP Ecosystem",
      category: "Financial ERP",
      templates: [
        { id: "commercial-bank", name: "Commercial Bank ERP" },
        { id: "microfinance", name: "Microfinance ERP" },
        { id: "sacco", name: "SACCO ERP" }
      ],
      capabilities: [
        "Core Banking Engine",
        "Asset Management",
        "Liquidity Control",
        "Risk Assessment",
        "Regulatory Reporting"
      ],
      portals: [
        "Executive Portal",
        "Administration Portal",
        "Customer Portal",
        "Staff Portal",
        "Finance Portal"
      ],
      settings: { theme: "JUMO Enterprise Light" },
      generationRules: { configurable: true }
    },
    {
      id: "government-erp",
      name: "Government ERP Ecosystem",
      category: "Public Sector ERP",
      templates: [
        { id: "ministry", name: "Ministry ERP" },
        { id: "agency", name: "Agency ERP" },
        { id: "local-gov", name: "Local Government ERP" }
      ],
      capabilities: [
        "Public Service Delivery",
        "Citizen Records",
        "Revenue Collection",
        "Public Finance",
        "Procurement"
      ],
      portals: [
        "Executive Portal",
        "Administration Portal",
        "Citizen Portal",
        "Staff Portal",
        "Finance Portal"
      ],
      settings: { theme: "JUMO Enterprise Light" },
      generationRules: { configurable: true }
    },
    {
      id: "agriculture-erp",
      name: "Agriculture ERP Ecosystem",
      category: "Agribusiness ERP",
      templates: [
        { id: "farm", name: "Farm Management ERP" },
        { id: "agribusiness", name: "Agribusiness ERP" },
        { id: "cooperative", name: "Farmers Cooperative ERP" }
      ],
      capabilities: [
        "Production Management",
        "Supply Chain",
        "Inventory",
        "Farmer Management"
      ],
      portals: [
        "Executive Portal",
        "Administration Portal",
        "Farmer Portal",
        "Staff Portal",
        "Finance Portal"
      ],
      settings: { theme: "JUMO Enterprise Light" },
      generationRules: { configurable: true }
    }
  ],

  getBlueprint(id) {
    return this.blueprints.find(blueprint => blueprint.id === id);
  },

  list() {
    return this.blueprints;
  }
};
`;

fs.writeFileSync('platform/factory/erp/ERPBlueprintRegistry.js', content);
console.log('Blueprints minimized');
