import { JumoModelRegistry } from "../../registry/JumoModelRegistry";
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

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE" | "NOT_CONFIGURED"; latencyMs?: number; details?: string }> {
    const available = await this.isAvailable();
    return {
      status: available ? "HEALTHY" : "NOT_CONFIGURED",
      details: available ? "OpenAI API key configured" : "OpenAI API key missing (JUMO_OPENAI_API_KEY)"
    };
  }

  async discoverModels(): Promise<Array<{ modelId: string; displayName: string; contextLength: number; capabilities: string[] }>> {
    return JumoModelRegistry.getModelsByProvider("OPENAI").map(m => ({
      modelId: m.modelId,
      displayName: m.displayName,
      contextLength: m.contextLength,
      capabilities: m.capabilities
    }));
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
