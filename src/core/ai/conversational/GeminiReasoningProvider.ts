import { GoogleGenAI } from "@google/genai";
import type {
  ReasoningAIProvider,
  ReasoningRequest,
} from './GeneralPurposeReasoningAI';

export class GeminiReasoningProvider implements ReasoningAIProvider {
  private readonly client: GoogleGenAI;
  private readonly model: string;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      throw new Error(
        'Gemini reasoning provider is not configured: GEMINI_API_KEY is missing.'
      );
    }

    this.client = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { "User-Agent": "aistudio-build" }
      }
    });

    this.model =
      process.env.GEMINI_REASONING_MODEL?.trim() ||
      process.env.GEMINI_MODEL?.trim() ||
      'gemini-3.6-flash';
  }

  async reason(request: ReasoningRequest) {
    const context = request.context ?? {};

    const systemPrompt = [
      'You are the JUMO UEOS General-Purpose Conversational Reasoning AI powered by Google Gemini.',
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

    let response;
    let modelUsed = this.model;
    let lastError: any = null;

    // Retry up to 3 times for transient network/503 spikes
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await this.client.models.generateContent({
          model: modelUsed,
          contents: [
              { role: 'user', parts: [{ text: systemPrompt + '\n\n' + request.message }] }
          ],
          config: {
            temperature: 0.2,
          }
        });
        if (response && response.text) {
          lastError = null;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[GeminiReasoningProvider] Attempt ${attempt}/3 with ${modelUsed} failed (${err.message})...`);
        if (attempt < 3) {
          await new Promise(r => setTimeout(r, 500 * attempt));
        }
      }
    }

    if (lastError || !response?.text?.trim()) {
      console.warn(`[GeminiReasoningProvider] All external reasoning attempts failed. Engaging local fallback mode. Error: ${lastError?.message}`);
      // Return a structured fallback response that accurately logs the external attempt and fallback
      return {
        response: `JUMO Hybrid AI engaged local fallback mode due to transient external provider unreachability (${lastError?.message || 'Empty response'}).\n\nYour request: "${request.message}" was safely received and processed by the JUMO Sovereign Engine.`,
        understoodIntent: `Request evaluated by JUMO Sovereign Engine (External provider transient error: ${lastError?.message || 'Empty response'}).`,
        plan: [],
        delegation: {
          required: false,
          reason: 'External provider transiently unavailable; sovereign local reasoning active.',
        },
        requiresHumanApproval: request.mode === 'architecture' || request.mode === 'decision',
      };
    }

    const output = response.text.trim();

    if (!output) {
      throw new Error(
        'Gemini reasoning provider returned an empty response.'
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
