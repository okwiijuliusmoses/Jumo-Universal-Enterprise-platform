/**
 * JUMO UEOS Institution Generator
 * 
 * Generates sovereign identity boundaries, national branch hierarchies, and governance nodes for manufactured instances.
 */

import { GovernanceNode } from "../runtime/erpTemplateRegistry";

export interface GeneratedInstitutionMetadata {
  institutionId: string;
  name: string;
  country: string;
  region: string;
  governanceTree: GovernanceNode;
  branchHierarchy: {
    nationalHQ: string;
    regionalBranches: string[];
    districtNodes: string[];
  };
  domainEndpoint: string;
}

export class InstitutionGenerator {
  static generate(
    institutionName: string,
    country: string = "Uganda",
    region: string = "National HQ",
    baseGovernance?: GovernanceNode,
    branchCount: number = 4
  ): GeneratedInstitutionMetadata {
    const instId = `inst-${institutionName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;
    const slug = institutionName.toLowerCase().replace(/[^a-z0-9]/g, "");

    const regionalBranches = Array.from({ length: Math.min(branchCount, 8) }, (_, i) => `${country} Regional Directorate #${i + 1}`);
    const districtNodes = Array.from({ length: Math.min(branchCount * 2, 16) }, (_, i) => `${region} District Operational Node #${i + 1}`);

    const governanceTree: GovernanceNode = baseGovernance || {
      title: `${institutionName} Sovereign Council`,
      role: `Supreme Governing Body (${country})`,
      subNodes: [
        {
          title: `Executive Director General Office`,
          role: "Chief Executive Leadership",
          subNodes: [
            { title: "FAAP Treasury & Audit Directorate", role: "Financial & Double-Entry Ledger" },
            { title: "Operations & Sectoral Compliance", role: "Primary Institutional Execution" }
          ]
        }
      ]
    };

    return {
      institutionId: instId,
      name: institutionName,
      country,
      region,
      governanceTree,
      branchHierarchy: {
        nationalHQ: `${institutionName} National Headquarters (${country})`,
        regionalBranches,
        districtNodes
      },
      domainEndpoint: `https://${slug}.${country.toLowerCase().replace(/\s+/g, "")}.jumo.platform`
    };
  }
}

export default InstitutionGenerator;
