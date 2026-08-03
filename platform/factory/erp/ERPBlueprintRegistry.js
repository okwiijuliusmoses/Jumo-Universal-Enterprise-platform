/**
 * JUMO UEOS
 * Legacy compatibility wrapper
 *
 * Enterprise Platform Template Registry
 * is now the single source of truth.
 */

import { EnterprisePlatformTemplateRegistry } from "./templates/EnterprisePlatformTemplateRegistry.js";


export const ERPBlueprintRegistry = {

version:
EnterprisePlatformTemplateRegistry.version,


templates:
EnterprisePlatformTemplateRegistry.templates,


list(){

return EnterprisePlatformTemplateRegistry.list();

},


getBlueprint(id){

return EnterprisePlatformTemplateRegistry.getTemplate(id);

}

};
