import OpenAI from 'openai';
import type {
  ReasoningAIProvider,
  ReasoningRequest,
} from './GeneralPurposeReasoningAI';

export class OpenAIReasoningProvider implements ReasoningAIProvider {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY?.trim();

    if (!apiKey) {
      throw new Error(
        'JUMO GPT reasoning provider is not configured: OPENAI_API_KEY is missing.'
      );
    }

    this.client = new OpenAI({ apiKey });

    this.model =
      process.env.JUMO_REASONING_MODEL?.trim() ||
      'gpt-5.6';
  }

  async reason(request: ReasoningRequest) {
    const context = request.context ?? {};

    const systemPrompt = [
      'You are the JUMO UEOS General-Purpose Conversational Reasoning AI.',
      '',
      'You are the primary human-facing reasoning and architecture layer.',
      'Understand broad human instructions before specialized agents execute work.',
      'Reason across the supplied UEOS architecture, workspace, domain and studio context.',
      'Do not fabricate execution, deployment, test results, registry records, or completed work.',
      'When execution is required, produce an explicit plan for the UEOS orchestration layer.',
      'Respect authorization boundaries and human approval requirements.',
      'Specialized agents are execution/delegation components, not replacements for general-purpose reasoning.',
      '',
      `Reasoning mode: ${request.mode ?? 'conversation'}`,
      '',
      'Authorized UEOS context:',
      JSON.stringify(context),
    ].join('\n');

    const response = await this.client.responses.create({
      model: this.model,
      instructions: systemPrompt,
      input: request.message,
      reasoning: {
        effort: 'high',
      },
      text: {
        verbosity: 'high',
      },
      store: true,
    });

    const output = response.output_text?.trim();

    if (!output) {
      throw new Error(
        'JUMO GPT reasoning provider returned an empty response.'
      );
    }

    return {
      response: output,
      understoodIntent:
        `Request analysed by JUMO General-Purpose Conversational Reasoning AI using ${this.model}.`,
      plan: [],
      delegation: {
        required: false,
        reason:
          'UEOS orchestration determines specialized-agent delegation after general-purpose reasoning.',
      },
      requiresHumanApproval:
        request.mode === 'architecture' ||
        request.mode === 'decision',
    };
  }
}
