
import { InstitutionGenerator, GeneratedInstitutionMetadata } from "../InstitutionGenerator";
import { GovernanceNode } from "../../../ueos/kernel/GovernanceEngine";

export class GovernanceDivision {
  static generate(name: string, country: string, region: string, governance: GovernanceNode, branchCount: number): GeneratedInstitutionMetadata {
    return InstitutionGenerator.generate(name, country, region, governance, branchCount);
  }
}
