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
    const canonicalKey = this.normalizeKey(provider.providerId);
    this.providers.set(canonicalKey, provider);
    // Also preserve exact providerId
    this.providers.set(provider.providerId, provider);
  }

  private normalizeKey(key: string): string {
    const cleaned = (key || '').trim().toUpperCase().replace(/[-_]/g, '');
    if (cleaned === 'JUMOLOCAL' || cleaned === 'OLLALOCAL' || cleaned === 'LOCAL' || cleaned === 'JUMO') {
      return 'JUMO_LOCAL';
    }
    return cleaned;
  }

  get(providerId: string): JumoAIProvider {
    const normalized = this.normalizeKey(providerId);
    
    // Check normalized map first
    for (const [key, provider] of this.providers.entries()) {
      if (this.normalizeKey(key) === normalized) {
        return provider;
      }
    }

    // Direct lookup fallback
    const direct = this.providers.get(providerId);
    if (direct) {
      return direct;
    }

    throw new Error(`JUMO AI provider is not registered: ${providerId}`);
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
