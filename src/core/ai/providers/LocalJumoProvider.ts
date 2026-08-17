import { JumoModelRegistry } from "../../registry/JumoModelRegistry";
import { LocalInferenceRuntimeRegistry } from "../runtime/LocalInferenceRuntime";
import {
  JumoAIProvider,
  JumoAIRequest,
  JumoAIResponse,
  JumoModelDiscovery,
} from "./JumoAIProvider";

export class LocalJumoProvider implements JumoAIProvider {
  readonly providerId = "JUMO_LOCAL";
  readonly displayName = "JUMO Sovereign Local Inference (Ollama / vLLM / llama.cpp)";
  readonly local = true;

  private runtime = LocalInferenceRuntimeRegistry.getInstance().getEngine();

  async isAvailable(): Promise<boolean> {
    const health = await this.runtime.healthCheck();
    return health.status === "HEALTHY";
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE"; latencyMs?: number; details?: string }> {
    const health = await this.runtime.healthCheck();
    return {
      status: health.status === "HEALTHY" ? "HEALTHY" : "UNAVAILABLE",
      latencyMs: health.latencyMs,
      details: health.details
    };
  }

  async discoverModels(): Promise<JumoModelDiscovery[]> {
    const localModels = await this.runtime.discoverModels();
    if (localModels.length > 0) {
      return localModels.map(m => ({
        modelId: m.modelId,
        displayName: `${m.displayName} (Local Sovereign)`,
        contextLength: m.contextLength || 8192,
        capabilities: m.capabilities || ["reasoning", "coding", "offline-sovereignty", "zero-external-ingress"]
      }));
    }
    return JumoModelRegistry.getModelsByProvider("JUMO_LOCAL").map(m => ({
      modelId: m.modelId,
      displayName: m.displayName,
      contextLength: m.contextLength,
      capabilities: m.capabilities
    }));
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const prompt = request.systemPrompt
      ? `${request.systemPrompt}\n\nUser: ${request.message}`
      : request.message;

    const result = await this.runtime.generate(prompt, {
      modelId: request.modelId,
      temperature: request.temperature ?? 0.2,
      systemPrompt: request.systemPrompt,
    });

    if (!result.success) {
      throw new Error(`Local inference execution failed: ${result.error}`);
    }

    return {
      text: result.text,
      modelId: result.modelId || request.modelId || "local-default",
      providerId: this.providerId,
      reasoning: false,
      usage: {
        totalTokens: result.tokensUsed || 0,
      },
      metadata: {
        latencyMs: result.latencyMs,
        localEngine: this.runtime.getRuntimeTelemetry().runtimeEngine
      },
      trace: [`Local inference executed in ${result.latencyMs}ms on engine ${this.runtime.getRuntimeTelemetry().runtimeEngine}`]
    };
  }
}
