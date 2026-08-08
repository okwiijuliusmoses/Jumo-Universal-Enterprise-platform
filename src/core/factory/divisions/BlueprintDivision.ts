
import { BlueprintIntelligenceEngine, SynthesizeInstitutionInput } from "../../blueprint/BlueprintIntelligenceEngine";
import { ERPTemplateDefinition } from "../../runtime/erpTemplateRegistry";

export class BlueprintDivision {
  static synthesize(input: SynthesizeInstitutionInput): ERPTemplateDefinition {
    return BlueprintIntelligenceEngine.synthesizeInstitutionBlueprint(input);
  }
}
