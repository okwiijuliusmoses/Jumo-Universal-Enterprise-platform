
import { ModuleGenerator, GeneratedModuleContract } from "../ModuleGenerator";

export class ModuleDivision {
  static generate(modules: any[], institutionId: string): GeneratedModuleContract[] {
    return ModuleGenerator.generateModules(modules, institutionId);
  }
}
