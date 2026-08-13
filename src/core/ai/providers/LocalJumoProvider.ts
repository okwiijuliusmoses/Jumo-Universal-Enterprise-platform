import {
  JumoAIProvider,
  JumoAIRequest,
  JumoAIResponse,
} from "./JumoAIProvider";

export class LocalJumoProvider implements JumoAIProvider {
  readonly providerId = "jumo-local";
  readonly displayName = "JUMO Sovereign Local Runtime";
  readonly local = true;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    return {
      text:
        `JUMO local resolution received the request: ${request.message}`,
      modelId: "jumo-local-runtime",
      providerId: this.providerId,
      reasoning: true,
      metadata: {
        role: "LOCAL_FALLBACK",
        sovereign: true,
      },
    };
  }
}
