/**
 * JUMO UEOS
 * General-Purpose Conversational Reasoning AI
 *
 * Architectural role:
 *   Human-facing conversational reasoning and planning layer.
 *
 * This is NOT a specialized execution agent.
 * It understands the human request, maintains context,
 * reasons about architecture, creates plans and delegates
 * executable work to specialized agents.
 *
 * Provider/model execution is intentionally abstracted.
 */

export type ReasoningMode =
  | 'conversation'
  | 'architecture'
  | 'planning'
  | 'analysis'
  | 'decision'
  | 'delegation';

export interface ConversationTurn {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ReasoningContext {
  tenantId?: string;
  userId?: string;
  workspaceId?: string;
  domainId?: string;
  activeModule?: string;
  activeStudio?: string;
  architectureSnapshot?: unknown;
  selectedAgent?: string;
  turns?: ConversationTurn[];
  metadata?: Record<string, unknown>;
}

export interface ReasoningRequest {
  message: string;
  mode?: ReasoningMode;
  context?: ReasoningContext;
}

export interface ReasoningPlanStep {
  id: string;
  title: string;
  description: string;
  responsibleLayer:
    | 'reasoning-ai'
    | 'specialized-agent'
    | 'ueos-kernel'
    | 'human-approval';
  status: 'PROPOSED' | 'READY' | 'BLOCKED';
}

export interface ReasoningResponse {
  requestId: string;
  mode: ReasoningMode;
  understoodIntent: string;
  response: string;
  plan: ReasoningPlanStep[];
  delegation?: {
    required: boolean;
    agentId?: string;
    reason?: string;
  };
  requiresHumanApproval: boolean;
  timestamp: string;
}

export interface ReasoningAIProvider {
  reason(
    request: ReasoningRequest
  ): Promise<{
    response: string;
    understoodIntent: string;
    plan?: ReasoningPlanStep[];
    delegation?: ReasoningResponse['delegation'];
    requiresHumanApproval?: boolean;
  }>;
}

/**
 * Provider-neutral conversational reasoning facade.
 *
 * The UEOS kernel talks to this interface rather than directly
 * depending on one AI vendor or model.
 */
export class GeneralPurposeReasoningAI {
  private readonly provider?: ReasoningAIProvider;

  constructor(provider?: ReasoningAIProvider) {
    this.provider = provider;
  }

  async process(
    request: ReasoningRequest
  ): Promise<ReasoningResponse> {
    const timestamp = new Date().toISOString();
    const requestId = this.createRequestId();

    const mode = request.mode ?? this.inferMode(request.message);

    if (!request.message || !request.message.trim()) {
      return {
        requestId,
        mode,
        understoodIntent: 'No request supplied',
        response:
          'Please provide the instruction, question, or architectural problem you want JUMO UEOS to reason about.',
        plan: [],
        requiresHumanApproval: false,
        timestamp,
      };
    }

    if (!this.provider) {
      return this.createProviderUnavailableResponse(
        request,
        requestId,
        mode,
        timestamp
      );
    }

    const result = await this.provider.reason({
      ...request,
      mode,
    });

    return {
      requestId,
      mode,
      understoodIntent:
        result.understoodIntent || 'Intent interpretation completed.',
      response: result.response || '',
      plan: result.plan ?? [],
      delegation: result.delegation,
      requiresHumanApproval:
        result.requiresHumanApproval ?? false,
      timestamp,
    };
  }

  private inferMode(message: string): ReasoningMode {
    const text = message.toLowerCase();

    if (
      /(architecture|architect|system design|layer|kernel|platform)/.test(
        text
      )
    ) {
      return 'architecture';
    }

    if (
      /(plan|planning|roadmap|steps|implement|implementation)/.test(
        text
      )
    ) {
      return 'planning';
    }

    if (
      /(compare|analyse|analyze|why|evaluate|review|audit)/.test(
        text
      )
    ) {
      return 'analysis';
    }

    if (
      /(should we|recommend|recommendation|decision|choose)/.test(
        text
      )
    ) {
      return 'decision';
    }

    if (
      /(execute|deploy|build|test|compile|create|generate)/.test(
        text
      )
    ) {
      return 'delegation';
    }

    return 'conversation';
  }

  private createProviderUnavailableResponse(
    request: ReasoningRequest,
    requestId: string,
    mode: ReasoningMode,
    timestamp: string
  ): ReasoningResponse {
    return {
      requestId,
      mode,
      understoodIntent:
        'Conversational reasoning layer is registered, but no AI provider is currently bound.',
      response:
        'The JUMO UEOS General-Purpose Conversational Reasoning AI is structurally active, but its model provider has not yet been connected. No simulated AI response will be generated.',
      plan: [
        {
          id: 'reasoning-provider',
          title: 'Bind reasoning provider',
          description:
            'Connect an approved conversational reasoning model through the provider adapter.',
          responsibleLayer: 'ueos-kernel',
          status: 'BLOCKED',
        },
        {
          id: 'reasoning-context',
          title: 'Load UEOS context',
          description:
            'Provide the conversational layer with the authorized workspace, architecture and domain context.',
          responsibleLayer: 'reasoning-ai',
          status: 'READY',
        },
      ],
      delegation: {
        required: false,
        reason:
          'No provider is currently bound; execution must not be fabricated.',
      },
      requiresHumanApproval: false,
      timestamp,
    };
  }

  private createRequestId(): string {
    return `reason-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}`;
  }
}
