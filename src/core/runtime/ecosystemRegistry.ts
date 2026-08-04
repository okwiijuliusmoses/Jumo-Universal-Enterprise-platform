/**
 * JUMO UEOS Ecosystem Registry
 *
 * Canonical hierarchy:
 * Ecosystem → ERP Templates → ERP Factory → ERP Instances
 *
 * An ecosystem is a classification boundary only.
 * It cannot be launched directly.
 * Only approved ERP templates can manufacture instances.
 */

export interface ERPSystemEcosystem {
  id: string;
  name: string;
  description: string;
  approvedTemplates: string[];
  status: "ACTIVE" | "DEPRECATED";
}

const ecosystems: ERPSystemEcosystem[] = [
  {
    id: "education",
    name: "Education ERP Ecosystem",
    description:
      "Institutional education platforms covering academic and alumni lifecycles.",
    approvedTemplates: [
      "university-erp",
      "college-erp",
      "technical-vocational-erp",
      "secondary-school-erp",
      "nursery-primary-erp",
      "alumni-erp"
    ],
    status: "ACTIVE"
  },

  {
    id: "hospitality",
    name: "Hospitality ERP Ecosystem",
    description:
      "Hospitality institutions including hotels, accommodation, restaurants and tourism operations.",
    approvedTemplates: [
      "hospitality-erp"
    ],
    status: "ACTIVE"
  },

  {
    id: "religious-diocese",
    name: "Religious & Diocese ERP Ecosystem",
    description:
      "Diocese and province institutional governance ecosystem.",
    approvedTemplates: [
      "diocese-province-erp"
    ],
    status: "ACTIVE"
  },

  {
    id: "clan-heritage",
    name: "Clan, Family & Heritage ERP Ecosystem",
    description:
      "Clan governance, heritage, genealogy and family networks.",
    approvedTemplates: [
      "clan-heritage-erp"
    ],
    status: "ACTIVE"
  },

  {
    id: "community-finance",
    name: "Community Finance ERP Ecosystem",
    description:
      "Community savings, SACCO, microfinance and credit operations.",
    approvedTemplates: [
      "community-finance-erp"
    ],
    status: "ACTIVE"
  }
];


export class EcosystemRegistry {

  static getAll(): ERPSystemEcosystem[] {
    return ecosystems;
  }


  static getById(id: string): ERPSystemEcosystem | undefined {
    return ecosystems.find(
      ecosystem => ecosystem.id === id
    );
  }


  static isApprovedTemplate(
    ecosystemId: string,
    templateId: string
  ): boolean {

    const ecosystem = this.getById(ecosystemId);

    if (!ecosystem) {
      return false;
    }

    return ecosystem.approvedTemplates.includes(templateId);
  }

}


export default EcosystemRegistry;
