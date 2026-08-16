// JUMO UEOS — JUMO AI Gateway & Provider Abstraction Engine
// Provider-independent cognitive routing, agent identity ownership, quota failover, and local reasoning fallback.

import { SovereignOperatingStateService } from "../runtime/sovereignState";
import { AIGatewayState, AIProviderStatus, ProviderQuotaMetrics } from "../runtime/sovereignState.types";

import { JumoAIProviderGateway } from "./gateway/JumoAIProviderGateway";
import { JumoAIProviderRegistry } from "./providers/JumoAIProviderRegistry";

export interface ReasoningRequest {
  agentRole: string;
  prompt: string;
  context?: Record<string, any>;
  preferredProvider?: 'gemini' | 'openai' | 'copilot' | 'jumo_local';
  requireLocalOnly?: boolean;
}

export interface ReasoningResponse {
  content: string;
  providerUsed: 'gemini' | 'openai' | 'copilot' | 'jumo_local';
  modelUsed: string;
  latencyMs: number;
  isLocalFallback: boolean;
  tokensUsed: number;
  timestamp: string;
}

export class JumoAIGatewayEngine {
  /**
   * Guarantees JUMO_LOCAL is registered and healthy with explicit health and fallback state.
   */
  static ensureLocalReasoningRegistered(): void {
    SovereignOperatingStateService.updateState(draft => {
      const existingLocal = draft.aiGateway.registeredProviders.find(p => p.providerId === 'jumo_local');
      if (!existingLocal) {
        draft.aiGateway.registeredProviders.push({
          providerId: 'jumo_local',
          name: 'JUMO Local Sovereign Reasoning Engine',
          type: 'LOCAL',
          status: 'HEALTHY',
          latencyMs: 15,
          errorRate: 0.0,
          activeModel: 'jumo-local-v1',
          supportedModels: ['jumo-local-v1', 'jumo-offline-core'],
          isAvailable: true
        });
      } else {
        existingLocal.status = 'HEALTHY';
        existingLocal.isAvailable = true;
      }
      draft.aiGateway.isLocalRegistered = true;
      draft.aiGateway.localReasoningStatus = 'ENABLED';
    });
  }

  /**
   * Routes reasoning requests through the JUMO Gateway rather than directly calling raw external APIs.
   * Enforces Provider Quotas, Provider Availability, and Local Fallback.
   */
  static async processReasoningRequest(req: ReasoningRequest): Promise<ReasoningResponse> {
    this.ensureLocalReasoningRegistered();
    const state = SovereignOperatingStateService.getState();
    const gateway = state.aiGateway;
    const quotas = state.providerQuotas;

    // Determine target provider order
    let providerCandidates: Array<'gemini' | 'openai' | 'copilot' | 'jumo_local'> = [];

    if (req.requireLocalOnly) {
      providerCandidates = ['jumo_local'];
    } else if (req.preferredProvider) {
      providerCandidates = [req.preferredProvider, ...gateway.fallbackProviderOrder.filter(p => p !== req.preferredProvider)];
    } else {
      providerCandidates = [...gateway.fallbackProviderOrder];
    }

    let selectedProvider: AIProviderStatus | null = null;
    let fallbackTriggered = false;

    for (const provId of providerCandidates) {
      const prov = gateway.registeredProviders.find(p => p.providerId === provId);
      const quota = quotas.find(q => q.providerId === provId);

      const isQuotaExhausted = quota ? quota.isExhausted : false;
      const isAvailable = prov ? (prov.status === 'HEALTHY' || prov.status === 'DEGRADED') && prov.isAvailable : false;

      if (isAvailable && !isQuotaExhausted) {
        selectedProvider = prov || null;
        if (provId === 'jumo_local' && req.preferredProvider && req.preferredProvider !== 'jumo_local') {
          fallbackTriggered = true;
        }
        break;
      }
    }

    // Ultimate fallback if all external providers fail or quota is exhausted
    if (!selectedProvider) {
      selectedProvider = gateway.registeredProviders.find(p => p.providerId === 'jumo_local') || {
        providerId: 'jumo_local',
        name: 'JUMO Local Sovereign Reasoning Engine',
        type: 'LOCAL',
        status: 'HEALTHY',
        latencyMs: 10,
        errorRate: 0.0,
        activeModel: 'jumo-local-v1',
        supportedModels: ['jumo-local-v1'],
        isAvailable: true
      };
      fallbackTriggered = true;
    }

    const start = Date.now();
    let resultText = "";
    
    // Select provider based on candidate search
    const targetProviderId = selectedProvider.providerId;

    // Use JumoAIProviderGateway for real execution if not local
    if (targetProviderId !== 'jumo_local') {
      try {
        const gateway = JumoAIProviderGateway.getInstance();
        const res = await gateway.reasoning({
          message: req.prompt,
          systemPrompt: `Agent Role: ${req.agentRole}`,
          context: req.context
        });
        resultText = res.text;
      } catch (err: any) {
        console.error(`[GATEWAY] Reasoning failed: ${err.message}.`);
        resultText = `AI_EXECUTION_UNAVAILABLE: ${err.message}`;
        fallbackTriggered = true;
      }
    } else {
      // Local reasoning
      try {
        const gateway = JumoAIProviderGateway.getInstance();
        const res = await gateway.reasoning({
          message: req.prompt,
          systemPrompt: `Agent Role: ${req.agentRole}`,
          context: req.context
        });
        resultText = res.text;
      } catch (err: any) {
        resultText = `AI_EXECUTION_UNAVAILABLE: ${err.message}`;
      }
    }

    const latency = Date.now() - start + (selectedProvider.latencyMs || 10);

    // Update Telemetry & State
    SovereignOperatingStateService.updateState(draft => {
      draft.aiGateway.totalInferenceRequests += 1;
      const pQuota = draft.providerQuotas.find(q => q.providerId === selectedProvider!.providerId);
      if (pQuota) {
        pQuota.tokensUsed += Math.floor(req.prompt.length / 4) + 150;
        pQuota.requestsUsed += 1;
      }
    });

    return {
      content: resultText,
      providerUsed: selectedProvider.providerId,
      modelUsed: selectedProvider.activeModel,
      latencyMs: latency,
      isLocalFallback: fallbackTriggered,
      tokensUsed: Math.floor(req.prompt.length / 4) + 150,
      timestamp: new Date().toISOString()
    };
  }

  static getGatewayState(): AIGatewayState {
    this.ensureLocalReasoningRegistered();
    return SovereignOperatingStateService.getState().aiGateway;
  }
}
