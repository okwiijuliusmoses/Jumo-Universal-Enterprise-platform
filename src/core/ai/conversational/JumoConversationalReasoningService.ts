import { JumoAIProviderGateway } from "../gateway/JumoAIProviderGateway";
import { SovereignOperatingStateService } from "../../runtime/sovereignState";

export interface ReasoningRequest {
  message: string;
  mode?: 'STRATEGIC' | 'TECHNICAL' | 'GOVERNANCE';
  context?: any;
}

export interface ReasoningResult {
  requestId: string;
  conversationId?: string;
  provider: string;
  model: string;
  response: string; // The main text response
  status: 'SUCCESS' | 'ERROR';
  latency: number;
  thoughtProcess?: string[];
  findings?: string[];
  recommendations?: string[];
  suggestedAction?: {
    type: string;
    payload: any;
  };
  error?: string;
  timestamp: string;
}

export class JumoConversationalReasoningService {
  private static instance: JumoConversationalReasoningService;
  private gateway = JumoAIProviderGateway.getInstance();

  public static getInstance(): JumoConversationalReasoningService {
    if (!JumoConversationalReasoningService.instance) {
      JumoConversationalReasoningService.instance = new JumoConversationalReasoningService();
    }
    return JumoConversationalReasoningService.instance;
  }

  public async reason(request: ReasoningRequest): Promise<ReasoningResult> {
    const { message, mode = 'TECHNICAL', context = {} } = request;

    console.log(`[REASONING_SERVICE] Processing request in ${mode} mode: ${message.slice(0, 50)}...`);

    const systemPrompt = `
      You are the JUMO Universal Enterprise Operating System (UEOS) Reasoning Core.
      Your task is to analyze human requests, reason over the sovereign state, and provide structured strategic or technical guidance.
      
      Mode: ${mode}
      
      Respond in a structured JSON format with:
      - thoughtProcess: string[] (Your internal logic steps)
      - findings: string[] (Key discoveries in the request or state)
      - recommendations: string[] (Actionable next steps)
      - suggestedAction: { type: string, payload: any } (Optional specific UEOS API action to trigger)
    `;

    const state = SovereignOperatingStateService.getState();
    const augmentedContext = {
      ...context,
      activeJobs: state.jobs.length,
      activeArchitectureRequests: state.architectureRequests.length,
      emergencyMode: state.emergencyMode
    };

    const startTime = Date.now();
    const requestId = `req-${Date.now()}`;

    try {
      const response = await this.gateway.reasoning({
        message,
        systemPrompt,
        context: augmentedContext
      });

      const latency = Date.now() - startTime;
      const text = response.text;
      
      let thoughtProcess = ["Analyzed request against sovereign state"];
      let findings = ["Request received"];
      let recommendations = ["Proceed with standard manufacturing"];
      let suggestedAction = undefined;

      try {
        const parsed = JSON.parse(text);
        if (parsed.thoughtProcess) thoughtProcess = parsed.thoughtProcess;
        if (parsed.findings) findings = parsed.findings;
        if (parsed.recommendations) recommendations = parsed.recommendations;
        if (parsed.suggestedAction) suggestedAction = parsed.suggestedAction;
        
        return {
          requestId,
          provider: 'JUMO_GATEWAY',
          model: 'JUMO_MODEL',
          response: parsed.response || JSON.stringify(parsed, null, 2),
          status: 'SUCCESS',
          latency,
          thoughtProcess,
          findings,
          recommendations,
          suggestedAction,
          timestamp: new Date().toISOString()
        };
      } catch {
        // Fallback for non-JSON responses
        return {
          requestId,
          provider: 'JUMO_GATEWAY',
          model: 'JUMO_MODEL',
          response: text,
          status: 'SUCCESS',
          latency,
          thoughtProcess: ["Interpreted human intent", "Verified baseline constraints"],
          findings: ["Request processed through sovereign gateway"],
          recommendations: ["Manually review request in Architecture Studio"],
          suggestedAction: {
            type: "ARCHITECTURE_REVIEW",
            payload: { message }
          },
          timestamp: new Date().toISOString()
        };
      }
    } catch (error: any) {
      console.error("[REASONING_SERVICE] AI Execution failed:", error);
      return {
        requestId,
        provider: 'Local_Fallback',
        model: 'Error_Recovery',
        response: `Gateway failure encountered: ${error.message}. Please verify the JUMO AI provider configuration or fallback limits.`,
        status: 'ERROR',
        latency: Date.now() - startTime,
        thoughtProcess: ["Gateway failure encountered"],
        findings: ["External AI providers unreachable or air-gap restricted"],
        recommendations: ["Failover to local rule-based reasoning", "Check system logs"],
        suggestedAction: {
          type: "SYSTEM_ALERT",
          payload: { error: error.message }
        },
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

export const jumoConversationalReasoning = JumoConversationalReasoningService.getInstance();
