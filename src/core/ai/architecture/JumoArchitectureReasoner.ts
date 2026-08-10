import {
  JumoAIRuntime,
  type JumoReasoningRequest,
  type JumoReasoningResult,
} from '../runtime/JumoAIRuntime';

export interface ArchitectureReasoningInput {
  instruction: string;
  context?: Record<string, unknown>;
  activeStudio?: string;
  domain?: string;
  workspaceId?: string;
}

export class JumoArchitectureReasoner {
  constructor(private readonly runtime: JumoAIRuntime) {}

  async reason(
    input: ArchitectureReasoningInput
  ): Promise<JumoReasoningResult> {
    const request: JumoReasoningRequest = {
      message: input.instruction,

      objective:
        'Understand the human architectural instruction, identify requirements, missing layers, dependencies, risks and implementation steps.',

      systemPrompt: `
You are JUMO General-Purpose Conversational Reasoning AI.

Your role is to reason broadly about JUMO UEOS architecture.

You must:
- understand human instructions;
- preserve approved architectural decisions;
- identify missing components and layers;
- distinguish architecture from implementation;
- identify dependencies;
- identify contradictions;
- produce implementation plans;
- recommend appropriate JUMO studios and agents;
- never fabricate completed implementation;
- never claim an external model is a JUMO-owned model;
- respect UEOS security, identity, authorization and governance boundaries;
- return actionable structured reasoning.
      `.trim(),

      context: {
        ...input.context,
        activeStudio: input.activeStudio,
        domain: input.domain,
        workspaceId: input.workspaceId,
      },

      requirePlanning: true,
      requireVerification: true,
    };

    return this.runtime.execute(request);
  }
}
