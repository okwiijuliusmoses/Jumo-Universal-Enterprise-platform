/**
 * JUMO UEOS
 * Enterprise ERP Instance Registry
 */

import { ERPBlueprintRegistry } from "../factory/erp/ERPBlueprintRegistry.js";
import { portalGenerator } from "../factory/erp/generators/PortalGenerator.js";
import { moduleGenerator } from "../factory/erp/generators/ModuleGenerator.js";
import { workflowGenerator } from "../factory/erp/generators/WorkflowGenerator.js";
import { aiAgentGenerator } from "../factory/erp/generators/AIAgentGenerator.js";

export class ERPInstanceRegistry {
 constructor(){
   this.status="ONLINE";
   this.instances=[];
 }

 register(instance){
   const exists=this.instances.find(
     i=>i.id===instance.id
   );
   if(exists){
     return exists;
   }

   // Restore UEOS ERP runtime hydration from existing blueprints
   const blueprintId = instance.blueprintId || instance.templateId;
   if (blueprintId) {
     const blueprint = ERPBlueprintRegistry.getBlueprint(blueprintId);
     if (blueprint) {
       // Hydrate Portals
       instance.portals = instance.portals?.length 
         ? instance.portals 
         : (blueprint.portals || portalGenerator.generate(blueprint) || []);

       // Hydrate Modules
       instance.modules = instance.modules?.length 
         ? instance.modules 
         : (blueprint.modules || blueprint.capabilities || moduleGenerator.generate(blueprint) || []);

       // Hydrate Workflows
       instance.workflows = instance.workflows?.length 
         ? instance.workflows 
         : (blueprint.workflows || workflowGenerator.generate(blueprint) || []);

       // Hydrate AI Agents
       instance.agents = instance.agents?.length 
         ? instance.agents 
         : (blueprint.aiAgents || blueprint.agents || aiAgentGenerator.generate(blueprint) || []);

       // Hydrate configuration layer
       instance.settings = instance.settings || blueprint.settings || {};
       instance.configuration = instance.configuration || blueprint.configuration || {};
       instance.features = instance.features || blueprint.features || {};
       instance.permissions = instance.permissions || blueprint.permissions || [];
       instance.policies = instance.policies || blueprint.policies || {};
     }
   }
   
   this.instances.push({
     ...instance,
     status: instance.status || "ACTIVE",
     lifecycle:"INSTALLED",
     deployedAt: instance.deployedAt || new Date().toISOString()
   });
   
   return instance;
 }

 get(id){
   return this.instances.find(
     i=>i.id===id
   );
 }

 list(){
   return this.instances;
 }

 activate(id){
   const item=this.get(id);
   if(item){
     item.status="ACTIVE";
     item.lifecycle="RUNNING";
   }
   return item;
 }

 suspend(id){
   const item=this.get(id);
   if(item){
     item.status="SUSPENDED";
     item.lifecycle="SUSPENDED";
   }
   return item;
 }

 restore(id){
   const item=this.get(id);
   if(item){
     item.status="ACTIVE";
     item.lifecycle="RESTORED";
   }
   return item;
 }

 health(){
   return {
     registry:"UEOS ERP Instance Registry",
     status:this.status,
     instances:this.instances.length,
     active:this.instances.filter(
       i=>i.status==="ACTIVE"
     ).length
   };
 }
}

export const erpInstanceRegistry = new ERPInstanceRegistry();

export async function hydrateERPInstances(){
    const { restoreAllRegistries } = await import("../control/registry/RegistryBootstrap.js");
    return restoreAllRegistries();
}
