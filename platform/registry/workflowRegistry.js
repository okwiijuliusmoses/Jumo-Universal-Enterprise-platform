/**
 * JUMO UEOS
 * Workflow Registry
 */

export class WorkflowRegistry {

 constructor(){
   this.status="ONLINE";
   this.workflows=[];
 }

 register(workflow){
   this.workflows.push(workflow);
   return workflow;
 }

 list(){
   return this.workflows;
 }

 health(){
   return {
    registry:"JUMO Workflow Registry",
    status:this.status,
    workflows:this.workflows.length
   };
 }

}

export const workflowRegistry = new WorkflowRegistry();
