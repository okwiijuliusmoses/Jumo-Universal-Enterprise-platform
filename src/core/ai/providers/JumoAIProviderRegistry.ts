// JUMO UEOS — JUMO AI Provider Registry
// Authoritative registry and singleton tracking for registered sovereign intelligence reasoning adapters.

import { JumoAIProvider, OpenAIProvider, GeminiProvider, CopilotProvider, JumoLocalReasoningProvider, FutureProviderAdapter } from "./JumoAIProvider";
import { CodexEngineeringProvider } from "./CodexEngineeringProvider";
import { LocalJumoProvider } from "./LocalJumoProvider";
import { AnthropicClaudeProvider } from "./AnthropicClaudeProvider";
import { OllaProvider } from "../../../engine/ai/providers/local/OllaProvider";

export class JumoAIProviderRegistry {
  private static instance: JumoAIProviderRegistry;
  private readonly providers = new Map<string, JumoAIProvider>();

  private constructor() {
    this.register(new OpenAIProvider());
    this.register(new GeminiProvider());
    this.register(new CopilotProvider());
    this.register(new CodexEngineeringProvider());
    this.register(new AnthropicClaudeProvider());
    this.register(new LocalJumoProvider());
    this.register(new JumoLocalReasoningProvider());
    this.register(new OllaProvider());
    this.register(new FutureProviderAdapter());
  }

  public static getInstance(): JumoAIProviderRegistry {
    if (!JumoAIProviderRegistry.instance) {
      JumoAIProviderRegistry.instance = new JumoAIProviderRegistry();
    }
    return JumoAIProviderRegistry.instance;
  }

  public static getAll(): JumoAIProvider[] {
    return JumoAIProviderRegistry.getInstance().list();
  }

  register(provider: JumoAIProvider): void {
    this.providers.set(provider.providerId, provider);
  }

  get(providerId: string): JumoAIProvider {
    const provider = this.providers.get(providerId);
    if (!provider) {
      throw new Error(`JUMO AI provider is not registered: ${providerId}`);
    }
    return provider;
  }

  list(): JumoAIProvider[] {
    return Array.from(this.providers.values());
  }

  async available(): Promise<JumoAIProvider[]> {
    const result: JumoAIProvider[] = [];
    for (const provider of this.providers.values()) {
      if (await provider.isAvailable()) {
        result.push(provider);
      }
    }
    return result;
  }
}
