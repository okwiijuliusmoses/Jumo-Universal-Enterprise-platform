/**
 * JUMO UEOS
 * Enterprise Module Generator
 *
 * Generates modules from Enterprise Platform Templates.
 */

import { enterprisePlatformTemplateRegistry } from "../templates/EnterprisePlatformTemplateRegistry.js";

export class ModuleGenerator {

  generate(templateId){

    const template =
      enterprisePlatformTemplateRegistry.getTemplate(templateId);

    if(!template){
      throw new Error(
        `Enterprise Platform Template not found: ${templateId}`
      );
    }

    return [
      ...(template.modules || [])
    ];

  }

}

export const moduleGenerator = new ModuleGenerator();
