import type {
  JumoAIRequest,
  JumoAIResponse,
  JumoAIProvider,
} from '../providers/JumoAIProvider';

export interface JumoAIContext extends Record<string, unknown> {
  tenantId?: string;
  workspaceId?: string;
  userId?: string;
  domain?: string;
  architecture?: unknown;
  activeStudio?: string;
  permissions?: string[];
  metadata?: Record<string, unknown>;
}

export interface JumoReasoningRequest extends JumoAIRequest {
  context?: JumoAIContext;
  objective?: string;
  requirePlanning?: boolean;
  requireVerification?: boolean;
  requireHumanApproval?: boolean;
}

export interface JumoReasoningResult extends JumoAIResponse {
  requestId: string;
  plan?: JumoPlan;
  verification?: JumoVerification;
}

export interface JumoPlanStep {
  id: string;
  title: string;
  description: string;
  responsibleRuntime: string;
  status: 'READY' | 'BLOCKED' | 'REQUIRES_APPROVAL';
}

export interface JumoPlan {
  objective: string;
  steps: JumoPlanStep[];
}

export interface JumoVerification {
  status: 'PASS' | 'FAIL' | 'WARNING' | 'NOT_RUN';
  evidence: string[];
}

import { OpenAIPrimaryProvider } from '../providers/OpenAIPrimaryProvider';

export class JumoAIRuntime {
  private provider?: JumoAIProvider;

  constructor(provider?: JumoAIProvider) {
    this.provider = provider || new OpenAIPrimaryProvider();
  }

  bindProvider(provider: JumoAIProvider): void {
    this.provider = provider;
  }

  async execute(
    request: JumoReasoningRequest
  ): Promise<JumoReasoningResult> {
    const requestId = this.createRequestId();

    if (!this.provider) {
      return {
        requestId,
        text:
          'JUMO General-Purpose Conversational Reasoning AI is structurally active, but no reasoning provider is currently bound.',
        modelId: 'jumo-general-reasoning',
        providerId: 'jumo-runtime',
        reasoning: true,
        plan: request.requirePlanning
          ? {
              objective:
                request.objective ?? 'Unspecified JUMO reasoning objective',
              steps: [
                {
                  id: 'provider-binding',
                  title: 'Bind reasoning provider',
                  description:
                    'Connect an approved model through the JUMO provider abstraction.',
                  responsibleRuntime: 'jumo-ai-gateway',
                  status: 'BLOCKED',
                },
              ],
            }
          : undefined,
        verification: {
          status: 'WARNING',
          evidence: [
            'No reasoning provider is bound.',
            'No AI response was fabricated.',
          ],
        },
      };
    }

    const available = await this.provider.isAvailable();

    if (!available) {
      return {
        requestId,
        text:
          'The configured JUMO reasoning provider is unavailable. JUMO execution has been stopped without fabricating a response.',
        modelId: 'jumo-general-reasoning',
        providerId: this.provider.providerId,
        reasoning: true,
        verification: {
          status: 'FAIL',
          evidence: [
            `Provider ${this.provider.providerId} reported unavailable.`,
          ],
        },
      };
    }

    const response = await this.provider.generate(request);

    return {
      ...response,
      requestId,
      verification: {
        status: 'PASS',
        evidence: [
          'Provider availability verified.',
          'Reasoning request executed through JUMO AI runtime.',
        ],
      },
    };
  }

  private createRequestId(): string {
    return `jumo-reason-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}`;
  }
}
