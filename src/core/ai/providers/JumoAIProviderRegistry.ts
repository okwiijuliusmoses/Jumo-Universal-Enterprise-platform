// JUMO UEOS — JUMO AI Provider Registry
// Active registry and singleton tracking for registered sovereign intelligence reasoning adapters.

import { JumoAIProvider, OpenAIProvider, GeminiProvider, CopilotProvider, JumoLocalReasoningProvider, FutureProviderAdapter } from "./JumoAIProvider";

export type { JumoAIProvider };

export class JumoAIProviderRegistry {
  private static instance: JumoAIProviderRegistry;
  private readonly providers = new Map<string, JumoAIProvider>();

  private constructor() {
    // Automatically seed the 5 standard provider adapters
    this.register(new OpenAIProvider());
    this.register(new GeminiProvider());
    this.register(new CopilotProvider());
    this.register(new JumoLocalReasoningProvider());
    this.register(new FutureProviderAdapter());
  }

  public static getInstance(): JumoAIProviderRegistry {
    if (!JumoAIProviderRegistry.instance) {
      JumoAIProviderRegistry.instance = new JumoAIProviderRegistry();
    }
    return JumoAIProviderRegistry.instance;
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


// Public contract export for gateway and runtime consumers.

// Public contract export for gateway and runtime consumers.
