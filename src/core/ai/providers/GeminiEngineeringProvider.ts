import { GoogleGenAI } from "@google/genai";
import {
  JumoAIProvider,
  JumoAIRequest,
  JumoAIResponse,
} from "./JumoAIProvider";

export class GeminiEngineeringProvider implements JumoAIProvider {
  readonly providerId = "gemini-engineering";
  readonly displayName = "JUMO Gemini Engineering Agent";
  readonly local = false;

  private client?: GoogleGenAI;

  private getClient(): GoogleGenAI | null {
    const apiKey =
      process.env.JUMO_GEMINI_API_KEY?.trim() ||
      process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) return null;

    if (!this.client) {
      this.client = new GoogleGenAI({ apiKey });
    }

    return this.client;
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(this.getClient());
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE"; latencyMs?: number; details?: string }> {
    const available = await this.isAvailable();
    return {
      status: available ? "HEALTHY" : "UNAVAILABLE",
      details: available ? "Gemini API key configured" : "Gemini API key missing"
    };
  }

  async discoverModels(): Promise<Array<{ modelId: string; displayName: string; contextLength: number; capabilities: string[] }>> {
    return [
      { modelId: "gemini-3.6-flash", displayName: "Gemini 3.6 Flash", contextLength: 1000000, capabilities: ["reasoning", "speed", "multimodal"] },
      { modelId: "gemini-2.5-pro", displayName: "Gemini 2.5 Pro", contextLength: 2000000, capabilities: ["complex-reasoning", "coding"] }
    ];
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const client = this.getClient();

    if (!client) {
      throw new Error(
        "JUMO Gemini engineering provider is not configured.",
      );
    }

    const model =
      process.env.JUMO_GEMINI_MODEL?.trim() ||
      "gemini-2.5-pro";

    const response = await client.models.generateContent({
      model,
      contents: request.message,
      config: {
        systemInstruction: request.systemPrompt,
      },
    });

    return {
      text: response.text || "",
      modelId: model,
      providerId: this.providerId,
      reasoning: true,
      metadata: {
        role: "ENGINEERING",
        authority: "JUMO_PRIMARY_AI",
      },
    };
  }
}
