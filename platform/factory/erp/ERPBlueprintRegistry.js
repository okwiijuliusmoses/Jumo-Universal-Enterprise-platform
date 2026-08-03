/**
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
      id:"education-erp",
      name:"Education ERP",
      category:"Institutional ERP",

      configurableScope:[
        "University",
        "College",
        "Vocational",
        "Secondary",
        "Primary"
      ],

      capabilities:[
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

      generationRules:{
        configurable:true
      }
    },


    {
      id:"government-erp",
      name:"Government ERP",
      category:"Public Administration ERP",

      configurableScope:[
        "Ministry",
        "Agency",
        "Local Government",
        "Public Institution"
      ],

      capabilities:[
        "Administration",
        "Citizen Services",
        "Procurement",
        "Compliance",
        "Records"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"finance-microfinance-erp",
      name:"Finance & Microfinance ERP",
      category:"Financial Institution ERP",

      configurableScope:[
        "Microfinance",
        "SACCO",
        "Cooperative",
        "Financial Institution"
      ],

      capabilities:[
        "Member Management",
        "Savings",
        "Loans",
        "Credit Management",
        "Financial Operations"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"healthcare-erp",
      name:"Healthcare ERP",
      category:"Healthcare Operations ERP",

      configurableScope:[
        "Hospital",
        "Clinic",
        "Healthcare Network"
      ],

      capabilities:[
        "Patient Management",
        "Medical Records",
        "Pharmacy",
        "Billing"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"agriculture-erp",
      name:"Agriculture ERP",
      category:"Agribusiness ERP",

      configurableScope:[
        "Farm",
        "Agribusiness",
        "Agricultural Organization"
      ],

      capabilities:[
        "Production",
        "Supply Chain",
        "Inventory",
        "Farmer Management"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"commerce-erp",
      name:"Wholesale Retail & Supermarket ERP",
      category:"Commerce ERP",

      configurableScope:[
        "Wholesale",
        "Retail",
        "Supermarket",
        "Distribution"
      ],

      capabilities:[
        "Sales",
        "Inventory",
        "POS",
        "Warehousing"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"enterprise-company-erp",
      name:"Enterprise Company ERP",
      category:"Corporate ERP",

      configurableScope:[
        "Professional Company",
        "Service Company",
        "Universal Company"
      ],

      capabilities:[
        "Operations",
        "CRM",
        "HR",
        "Projects"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"community-cultural-erp",
      name:"Community & Cultural Institutions ERP",
      category:"Social Institution ERP",

      configurableScope:[
        "Community",
        "Culture",
        "Clan",
        "Family",
        "Religious Institution"
      ],

      capabilities:[
        "Membership",
        "Events",
        "Heritage",
        "Community Services"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"alumni-endowment-erp",
      name:"Alumni & Endowment ERP",
      category:"Institutional Network ERP",

      configurableScope:[
        "Alumni Network",
        "Foundation",
        "Endowment"
      ],

      capabilities:[
        "Alumni Relations",
        "Donations",
        "Scholarships"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"hospitality-erp",
      name:"Hospitality ERP",
      category:"Hospitality Operations ERP",

      configurableScope:[
        "Hotel",
        "Restaurant",
        "Tourism Business"
      ],

      capabilities:[
        "Reservations",
        "Guest Management",
        "Operations"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"legal-case-management-erp",
      name:"Legal & Case Management ERP",
      category:"Justice ERP",

      configurableScope:[
        "Law Firm",
        "Court",
        "Legal Institution"
      ],

      capabilities:[
        "Case Management",
        "Client Management",
        "Document Management",
        "Compliance"
      ],

      generationRules:{
        configurable:true
      }
    }

  ],


  getBlueprint(id){

    return this.blueprints.find(
      blueprint=>blueprint.id===id
    );

  },


  list(){

    return this.blueprints;

  }

};
