/**
 * JUMO UEOS ERP FACTORY ARCHITECTURE CONTRACT
 *
 * IMPORTANT:
 *
 * Ecosystems manufacture ERP products.
 * Products contain portals.
 * Portals contain modules.
 *
 * Modules are NEVER ERPs.
 *
 * No hardcoded runtime instances.
 * Instances are generated from this metadata.
 */

export const ERPFactoryArchitecture = {

  version: "1.0",

  architectureRules: {

    ecosystemIsFactory: true,

    productIsInstitutionalERP: true,

    moduleCannotBecomeERP: true,

    portalCannotBecomeERP: true,

    workflowCannotBecomeERP: true,

    runtimeGenerationEnabled: true,

    metadataDriven: true
  },


  ecosystems: [

    {
      id: "education",
      name: "Education ERP Ecosystem",
      templates: [
        { id: "university", name: "University ERP", type: "institutional" },
        { id: "college", name: "College ERP", type: "institutional" },
        { id: "technical-vocational", name: "Technical & Vocational ERP", type: "institutional" },
        { id: "secondary-school", name: "Secondary School ERP", type: "institutional" },
        { id: "nursery-primary", name: "Nursery & Primary School ERP", type: "institutional" },
        { id: "alumni", name: "Alumni ERP", type: "institutional" }
      ],
      sharedServices: [
        "Digital Learning Platform",
        "Examination Engine",
        "Student Information System",
        "Assessment Management",
        "Learning Content Management",
        "Library Services",
        "Fees & Finance Integration",
        "Academic Records",
        "Research Management",
        "Graduation Management",
        "Alumni Management"
      ]
    },

    {
      id: "clan-family",
      name: "Clan & Family ERP Ecosystem",
      templates: [
        { id: "clan-organization", name: "Clan Organization ERP", type: "institutional" },
        { id: "family-network", name: "Family Network ERP", type: "institutional" },
        { id: "heritage-institution", name: "Heritage Institution ERP", type: "institutional" },
        { id: "community-association", name: "Community Association ERP", type: "institutional" }
      ],
      sharedServices: [
        "Membership",
        "Genealogy",
        "Events",
        "Contributions",
        "Communication",
        "Heritage Records"
      ]
    },

    {
      id: "hospitality",
      name: "Hospitality ERP Ecosystem",
      templates: [
        { id: "hotel", name: "Hotel ERP", type: "institutional" },
        { id: "restaurant", name: "Restaurant ERP", type: "institutional" },
        { id: "tourism-business", name: "Tourism Business ERP", type: "institutional" },
        { id: "accommodation", name: "Accommodation ERP", type: "institutional" }
      ],
      sharedServices: [
        "Reservations",
        "Guest Management",
        "Inventory",
        "Billing",
        "Staff Management",
        "Customer Relations"
      ]
    },

    {
      id: "microfinance",
      name: "Microfinance ERP Ecosystem",
      templates: [
        { id: "microfinance-institution", name: "Microfinance Institution ERP", type: "institutional" },
        { id: "sacco", name: "SACCO ERP", type: "institutional" },
        { id: "credit-union", name: "Credit Union ERP", type: "institutional" },
        { id: "cooperative-finance", name: "Cooperative Finance ERP", type: "institutional" }
      ],
      sharedServices: [
        "Member Management",
        "Loans",
        "Savings",
        "Payments",
        "Risk Management",
        "FAAP Integration",
        "Reporting"
      ]
    },

    {
      id: "reserved-future",
      name: "Reserved Future Ecosystem Slot",
      templates: [],
      sharedServices: [
        "Reserved Enterprise Service"
      ]
    }

  ],

  createTemplate(ecosystemId, template) {
    const ecosystem = this.ecosystems.find(e => e.id === ecosystemId);
    if (!ecosystem) {
      throw new Error("ERP Ecosystem not found");
    }
    ecosystem.templates.push(template);
    return template;
  }

};

export default ERPFactoryArchitecture;
