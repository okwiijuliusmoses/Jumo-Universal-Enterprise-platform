import { workflowRegistry } from "../../registry/workflowRegistry.js";

export class WorkflowGenerator {

 generate(blueprint){
   const registeredWorkflows = workflowRegistry.list().map(w => w.name);
   
   return [
     ...new Set([
       ...registeredWorkflows
     ])
   ];

 }

}

export const workflowGenerator = new WorkflowGenerator();
