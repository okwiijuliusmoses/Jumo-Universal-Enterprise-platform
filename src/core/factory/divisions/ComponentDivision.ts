
import { ComponentGenerator, GeneratedComponentContract } from "../ComponentGenerator";

export class ComponentDivision {
  static generate(components: any[]): GeneratedComponentContract[] {
    return ComponentGenerator.generateComponents(components);
  }
}
