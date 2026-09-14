// JUMO UEOS — JUMO Model Gateway
// Abstraction & Routing Layer for Third-Party Foundation Models & Local Runtimes
// Delegates to modern JumoAIProviderGateway for unified multi-provider execution.

import { AIAgentRecord } from "../types/JumoAITypes";
import { JumoAIProviderGateway } from "./JumoAIProviderGateway";

export interface AIInvocationRequest {
  agent: AIAgentRecord;
  systemPrompt: string;
  userPrompt: string;
  contextData?: Record<string, any>;
}

export interface AIInvocationResponse {
  agentId: string;
  jumoName: string;
  output: string;
  tokenCountUsage?: number;
  providerUsed: string;
  isOfflineFallback: boolean;
  timestamp: string;
}

export class JumoModelGateway {
  private static instance: JumoModelGateway;

  private constructor() {}

  public static getInstance(): JumoModelGateway {
    if (!JumoModelGateway.instance) {
      JumoModelGateway.instance = new JumoModelGateway();
    }
    return JumoModelGateway.instance;
  }

  public async invokeAgent(request: AIInvocationRequest): Promise<AIInvocationResponse> {
    const gateway = JumoAIProviderGateway.getInstance();
    const { agent, systemPrompt, userPrompt, contextData } = request;
    
    const combinedPrompt = `${systemPrompt}\n\nConstraints:\n${agent.architectureConstraints.join("\n")}\n\nContext:\n${JSON.stringify(contextData || {})}\n\nUser Prompt: ${userPrompt}`;
    const result = await gateway.executeAgentTask(agent, "ModelGateway Ingress Invocation", combinedPrompt, contextData);

    return {
      agentId: agent.agentId,
      jumoName: agent.jumoName,
      output: result.output,
      providerUsed: `${result.provider} (${result.modelUsed})`,
      isOfflineFallback: result.provider === "JUMO_LOCAL",
      timestamp: result.timestamp
    };
  }
}
