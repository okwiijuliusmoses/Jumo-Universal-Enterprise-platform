import { JumoModelRegistry } from "../../registry/JumoModelRegistry";
import { JumoAIUrlResolver } from "../utils/JumoAIUrlUtils";
import {
  JumoAIProvider,
  JumoAIRequest,
  JumoAIResponse,
} from "./JumoAIProvider";

export class CopilotEngineeringProvider implements JumoAIProvider {
  readonly providerId = "copilot-engineering";
  readonly displayName = "JUMO Copilot Engineering Agent";
  readonly local = false;

  async isAvailable(): Promise<boolean> {
    return Boolean(
      process.env.JUMO_COPILOT_ENDPOINT?.trim(),
    );
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE"; latencyMs?: number; details?: string }> {
    const available = await this.isAvailable();
    return {
      status: available ? "HEALTHY" : "UNAVAILABLE",
      details: available ? "Copilot endpoint configured" : "Copilot endpoint missing"
    };
  }

  async discoverModels(): Promise<Array<{ modelId: string; displayName: string; contextLength: number; capabilities: string[] }>> {
    return JumoModelRegistry.getModelsByProvider("COPILOT").map(m => ({
      modelId: m.modelId,
      displayName: m.displayName,
      contextLength: m.contextLength,
      capabilities: m.capabilities
    }));
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const endpoint =
      process.env.JUMO_COPILOT_ENDPOINT?.trim();

    if (!endpoint) {
      throw new Error(
        "JUMO Copilot engineering endpoint is not configured.",
      );
    }

    const response = await fetch(JumoAIUrlResolver.resolve(endpoint, "/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.JUMO_COPILOT_TOKEN
          ? {
              Authorization:
                `Bearer ${process.env.JUMO_COPILOT_TOKEN}`,
            }
          : {}),
      },
      body: JSON.stringify({
        message: request.message,
        systemPrompt: request.systemPrompt,
        context: request.context,
        conversation: request.conversation,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Copilot engineering request failed: ${response.status}`,
      );
    }

    const data = (await response.json()) as {
      text?: string;
      output?: string;
    };

    return {
      text: data.text || data.output || "",
      modelId: "copilot-engineering",
      providerId: this.providerId,
      reasoning: true,
      metadata: {
        role: "ENGINEERING",
        authority: "JUMO_PRIMARY_AI",
      },
    };
  }
}
