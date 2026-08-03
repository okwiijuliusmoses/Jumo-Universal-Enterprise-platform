/**
 * JUMO UEOS
 * AI ERP Module Generator
 */

import { moduleRegistry } from "../../../registry/moduleRegistry.js";

export class ModuleGenerator {

 generate(blueprint){
   const registeredModules = moduleRegistry.list().map(m => m.name);
   
   return [
     ...new Set([
       ...registeredModules,
       ...(blueprint.capabilities || [])
     ])
   ];

 }

}

export const moduleGenerator = new ModuleGenerator();
