export class WorkflowGenerator {

generate(template){

return template.workflows || [];

}

}

export const workflowGenerator = new WorkflowGenerator();
