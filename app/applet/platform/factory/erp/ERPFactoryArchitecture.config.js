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

        {
          id:"secondary-school",
          name:"Secondary School ERP",
          type:"institutional"
        },

        {
          id:"college",
          name:"College ERP",
          type:"institutional"
        },

        {
          id:"technical-vocational",
          name:"Technical & Vocational ERP",
          type:"institutional"
        },

        {
          id:"nursery-primary",
          name:"Nursery & Primary School ERP",
          type:"institutional"
        },

        {
          id:"university",
          name:"University ERP",
          type:"institutional"
        }

      ],


      sharedServices:[

        "Digital Learning",

        "Examination Engine",

        "Assessment Engine",

        "Student Information",

        "Academic Calendar",

        "Content Management",

        "AI Learning Assistant"

      ]

    },


    {


      id:"healthcare",

      name:"Healthcare ERP Ecosystem",

      templates:[

        {
          id:"hospital",
          name:"Hospital ERP"
        },

        {
          id:"clinic",
          name:"Clinic ERP"
        },

        {
          id:"pharmacy",
          name:"Pharmacy ERP"
        },

        {
          id:"healthcare-network",
          name:"Healthcare Network ERP"
        }

      ],


      sharedServices:[

        "Patient Management",

        "Medical Records",

        "Billing",

        "Pharmacy Management"

      ]

    },


    {


      id:"commerce",

      name:"Commerce ERP Ecosystem",

      templates:[

        {
          id:"wholesale",
          name:"Wholesale ERP"
        },


        {
          id:"retail",
          name:"Retail ERP"
        },


        {
          id:"distribution",
          name:"Distribution ERP"
        }

      ],


      sharedServices:[

        "Inventory",

        "Sales",

        "Procurement",

        "Warehouse"

      ]

    },


    {


      id:"financial-services",

      name:"Financial Services ERP Ecosystem",

      templates:[

        {
          id:"microfinance",
          name:"Microfinance ERP"
        },

        {
          id:"sacco",
          name:"SACCO ERP"
        },

        {
          id:"cooperative-finance",
          name:"Cooperative Finance ERP"
        }

      ],


      sharedServices:[

        "FAAP Finance",

        "Loans",

        "Savings",

        "Compliance"

      ]

    },


    {


      id:"institution-community",

      name:"Institution & Community ERP Ecosystem",

      templates:[


        {
          id:"church",
          name:"Church ERP"
        },


        {
          id:"clan",
          name:"Clan ERP"
        },


        {
          id:"family",
          name:"Family Organization ERP"
        },


        {
          id:"alumni",
          name:"Alumni ERP"
        }

      ],


      sharedServices:[

        "Membership",

        "Communication",

        "Events",

        "Donations"

      ]

    },


    {


      id:"hospitality",

      name:"Hospitality ERP Ecosystem",

      templates:[


        {
          id:"hotel",
          name:"Hotel ERP"
        },


        {
          id:"restaurant",
          name:"Restaurant ERP"
        }

      ],


      sharedServices:[

        "Reservations",

        "Guest Management",

        "Billing"

      ]

    }


  ],



  createTemplate(ecosystemId, template){

    const ecosystem =
      this.ecosystems.find(
        e=>e.id===ecosystemId
      );


    if(!ecosystem){

      throw new Error(
        "ERP Ecosystem not found"
      );

    }


    ecosystem.templates.push(template);


    return template;

  }

};


export default ERPFactoryArchitecture;
