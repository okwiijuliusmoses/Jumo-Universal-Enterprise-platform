import OpenAI from "openai";
import {
  JumoAIProvider,
  JumoAIRequest,
  JumoAIResponse,
} from "./JumoAIProvider";

export class OpenAIPrimaryProvider implements JumoAIProvider {
  readonly providerId = "openai-primary";
  readonly displayName = "JUMO OpenAI Primary Reasoning";
  readonly local = false;

  private client?: OpenAI;

  private getClient(): OpenAI | null {
    const apiKey =
      process.env.JUMO_OPENAI_API_KEY?.trim() ||
      process.env.OPENAI_API_KEY?.trim();

    if (!apiKey) return null;

    if (!this.client) {
      this.client = new OpenAI({ apiKey });
    }

    return this.client;
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(this.getClient());
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const client = this.getClient();

    if (!client) {
      throw new Error(
        "JUMO OpenAI primary provider is not configured.",
      );
    }

    const model =
      process.env.JUMO_OPENAI_MODEL?.trim() ||
      "gpt-5.6";

    const response = await client.responses.create({
      model,
      instructions: request.systemPrompt,
      input: request.message,
    });

    return {
      text: response.output_text || "",
      modelId: model,
      providerId: this.providerId,
      reasoning: true,
      metadata: {
        role: "PRIMARY_REASONING",
        architectureAuthority: "JUMO",
      },
    };
  }
}
