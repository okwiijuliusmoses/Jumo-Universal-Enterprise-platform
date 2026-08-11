import type { JumoAIProvider } from './JumoAIProvider';

export class JumoAIProviderRegistry {
  private readonly providers = new Map<string, JumoAIProvider>();

  register(provider: JumoAIProvider): void {
    if (this.providers.has(provider.providerId)) {
      throw new Error(
        `JUMO AI provider already registered: ${provider.providerId}`
      );
    }

    this.providers.set(provider.providerId, provider);
  }

  get(providerId: string): JumoAIProvider {
    const provider = this.providers.get(providerId);

    if (!provider) {
      throw new Error(
        `JUMO AI provider is not registered: ${providerId}`
      );
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
