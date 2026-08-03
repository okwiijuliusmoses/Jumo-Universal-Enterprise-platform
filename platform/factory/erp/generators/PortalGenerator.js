import { portalRegistry } from "../../../registry/portalRegistry.js";

export class PortalGenerator {

 generate(blueprint){
   const registeredPortals = portalRegistry.list().map(p => p.name);
   
   return [
     ...new Set([
       ...registeredPortals,
       `${blueprint.category} Portal`
     ])
   ];

 }

}

export const portalGenerator = new PortalGenerator();
