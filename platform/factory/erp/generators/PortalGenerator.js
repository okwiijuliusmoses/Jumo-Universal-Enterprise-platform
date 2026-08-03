/**
 * JUMO UEOS
 * Enterprise Portal Generator
 *
 * Generates portals from Enterprise Platform Templates.
 */

import { enterprisePlatformTemplateRegistry } from "../templates/EnterprisePlatformTemplateRegistry.js";

export class PortalGenerator {

  generate(templateId){

    const template =
      enterprisePlatformTemplateRegistry.getTemplate(templateId);

    if(!template){
      throw new Error(
        `Enterprise Platform Template not found: ${templateId}`
      );
    }

    return [
      ...(template.portals || [])
    ];

  }

}

export const portalGenerator = new PortalGenerator();
