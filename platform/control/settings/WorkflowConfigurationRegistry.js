/**
 * JUMO UEOS
 * Workflow Configuration Registry
 */

export class WorkflowConfigurationRegistry {

 constructor(){
  this.workflows=[];
 }

 register(workflow){

  const exists=this.workflows.find(
   w=>w.id===workflow.id
  );

  if(exists){
   return exists;
  }

  this.workflows.push({
   ...workflow,
   status:"ACTIVE"
  });

  return workflow;
 }

 list(){
  return this.workflows;
 }

 health(){
  return {
   registry:"UEOS Workflow Configuration Registry",
   workflows:this.workflows.length,
   status:"ONLINE"
  };
 }

}

export const workflowConfigurationRegistry =
new WorkflowConfigurationRegistry();
