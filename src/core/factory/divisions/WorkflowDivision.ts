
import { WorkflowGenerator, GeneratedWorkflowContract } from "../WorkflowGenerator";

export class WorkflowDivision {
  static generate(workflows: any[]): GeneratedWorkflowContract[] {
    return WorkflowGenerator.generateWorkflows(workflows);
  }
}
