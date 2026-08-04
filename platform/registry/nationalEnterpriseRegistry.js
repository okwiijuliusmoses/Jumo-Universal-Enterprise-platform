/**
 * JUMO UEOS
 * National Digital Enterprise Registry
 *
 * Foundation layer for:
 * - Governments
 * - Ministries
 * - Agencies
 * - Universities
 * - Corporations
 * - International Institutions
 */

import { ERPBlueprintRegistry } from "../factory/erp/ERPBlueprintRegistry.js";

export const ENTERPRISE_TYPES = {
  GOVERNMENT: "Government",
  MINISTRY: "Ministry",
  AGENCY: "Agency",
  EDUCATION: "Education",
  HEALTHCARE: "Healthcare",
  FINANCE: "Finance",
  CORPORATE: "Corporate",
  NGO: "NGO"
};


export class NationalEnterpriseRegistry {

  constructor() {

    this.enterprises = [];

    this.registerDefaults();

  }


  registerDefaults(){

    this.registerEnterprise({

      id: "gov-national-default",

      type: ENTERPRISE_TYPES.GOVERNMENT,

      name: "National Government Enterprise Platform",

      hierarchy: [

        "Country",

        "Ministry",

        "Agency",

        "Department",

        "Directorate",

        "Office"

      ],

      capabilities:[

        "Digital Identity",

        "Citizen Services",

        "Financial Management",

        "Procurement",

        "Human Capital",

        "Policy Management",

        "Analytics",

        "AI Governance"

      ]

    });

    // Automatically register all ERP ecosystems from Blueprint Registry
    ERPBlueprintRegistry.list().forEach(blueprint => {
        this.registerEnterprise({
            id: blueprint.id,
            type: ENTERPRISE_TYPES.CORPORATE, // Defaulting to Corporate, can be refined
            name: blueprint.name,
            hierarchy: [blueprint.category],
            capabilities: blueprint.capabilities || []
        });
    });

  }



  registerEnterprise(config){

    const enterprise = {

      id: config.id,

      type: config.type,

      name: config.name,

      hierarchy: config.hierarchy || [],

      capabilities: config.capabilities || [],

      portals: [],

      departments: [],

      createdAt:new Date().toISOString()

    };


    this.enterprises.push(enterprise);

    return enterprise;

  }



  getEnterprise(id){

    return this.enterprises.find(
      e => e.id === id
    );

  }



  getAll(){

    return this.enterprises;

  }


}


export const nationalEnterpriseRegistry =
new NationalEnterpriseRegistry();
