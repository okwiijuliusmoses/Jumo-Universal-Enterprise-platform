import type {
  ReasoningAIProvider,
  ReasoningRequest,
  ReasoningPlanStep,
} from './GeneralPurposeReasoningAI';

export class LocalHybridReasoningProvider
  implements ReasoningAIProvider
{
  async reason(request: ReasoningRequest) {
    const mode = request.mode ?? 'conversation';

    return {
      response:
        'JUMO Hybrid AI is operating in local fallback mode. ' +
        'No external reasoning provider is currently configured. ' +
        'The request has been safely received without fabricating an AI result.',

      understoodIntent:
        `Request received by JUMO Hybrid Reasoning AI in ${mode} mode.`,

      plan: [
        {
          id: 'hybrid-intake',
          title: 'Receive and classify request',
          description:
            'Register the request and determine its reasoning mode.',
          responsibleLayer: 'reasoning-ai' as const,
          status: 'READY',
        },
        {
          id: 'hybrid-context',
          title: 'Load UEOS context',
          description:
            'Use the supplied architecture, workspace, domain and authorization context.',
          responsibleLayer: 'ueos-kernel' as const,
          status: 'READY',
        },
        {
          id: 'hybrid-provider',
          title: 'Evaluate reasoning provider',
          description:
            'Determine whether an approved external reasoning provider is available.',
          responsibleLayer: 'reasoning-ai' as const,
          status: 'PROPOSED',
        },
        {
          id: 'hybrid-orchestration',
          title: 'Route to UEOS orchestration',
          description:
            'Continue through authorized local or specialized UEOS capabilities.',
          responsibleLayer: 'specialized-agent' as const,
          status: 'READY',
        },
      ] satisfies ReasoningPlanStep[],

      delegation: {
        required: false,
        reason:
          'External general-purpose reasoning is unavailable; local hybrid mode is active.',
      },

      requiresHumanApproval:
        mode === 'architecture' ||
        mode === 'decision',
    };
  }
}
