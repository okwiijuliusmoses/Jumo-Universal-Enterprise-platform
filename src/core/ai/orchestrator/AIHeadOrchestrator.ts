import { JumoAIAgentRegistry } from "../registry/JumoAIAgentRegistry";
import { AgentExecutionService } from "../execution/AgentExecutionService";

export class AIHeadOrchestrator {
  /**
   * The AI Head coordinates workforce requests from JUMO GPT
   */
  public static async coordinateWorkforce(plan: any[], actor: string) {
    const results = [];
    
    // Distribute work
    for (const task of plan) {
      if (task.agent === 'Gemini' || task.agent === 'Copilot') {
        const agentRecord = JumoAIAgentRegistry.getAgentByName(task.agent);
        if (agentRecord) {
           const log = await AgentExecutionService.executeTask({
             agentId: agentRecord.agentId,
             jobId: `JOB-${Date.now()}`,
             task: task.instruction,
             division: agentRecord.division,
             specialization: agentRecord.specialization
           }, actor);
           results.push(log);
        }
      }
    }
    return results;
  }
}
