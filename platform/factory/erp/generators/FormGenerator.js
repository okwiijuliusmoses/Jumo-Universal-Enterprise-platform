import { formRegistry } from "../../registry/formRegistry.js";

export class FormGenerator {

 generate(blueprint){
   const registeredForms = formRegistry.list().map(f => f.name);
   
   return [
     ...new Set([
       ...registeredForms,
       ...(blueprint.capabilities || [])
     ])
   ];

 }

}

export const formGenerator = new FormGenerator();
