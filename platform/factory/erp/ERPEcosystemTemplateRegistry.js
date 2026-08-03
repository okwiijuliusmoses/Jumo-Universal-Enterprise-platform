/**
 * JUMO UEOS
 * Legacy ERP Ecosystem Template Adapter
 */

import { EnterprisePlatformTemplateRegistry } from "./templates/EnterprisePlatformTemplateRegistry.js";


export class ERPEcosystemTemplateRegistry {

listTemplates(){

return EnterprisePlatformTemplateRegistry.list();

}


getTemplate(id){

return EnterprisePlatformTemplateRegistry.getTemplate(id);

}

}


export const erpEcosystemTemplateRegistry =
new ERPEcosystemTemplateRegistry();
