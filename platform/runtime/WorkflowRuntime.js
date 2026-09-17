export class WorkflowRuntime {
 constructor(){ this.status="ONLINE"; }
 health(){ return {runtime:"Workflow Runtime",status:this.status}; }
}
export const workflowRuntime = new WorkflowRuntime();
