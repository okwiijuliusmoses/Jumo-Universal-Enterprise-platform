import {
  JumoAIProvider,
  JumoAIRequest,
  JumoAIResponse,
} from "./JumoAIProvider";

export type JumoAIProviderRole =
  | "PRIMARY_REASONING"
  | "ENGINEERING"
  | "LOCAL_FALLBACK";

interface ProviderRegistration {
  provider: JumoAIProvider;
  role: JumoAIProviderRole;
  priority: number;
  enabled: boolean;
}

export class JumoAIProviderRegistry {
  private static instance: JumoAIProviderRegistry;

  private readonly providers: ProviderRegistration[] = [];

  static getInstance(): JumoAIProviderRegistry {
    if (!this.instance) {
      this.instance = new JumoAIProviderRegistry();
    }

    return this.instance;
  }

  register(registration: ProviderRegistration): void {
    const existing = this.providers.find(
      (item) =>
        item.provider.providerId ===
        registration.provider.providerId,
    );

    if (existing) {
      Object.assign(existing, registration);
      return;
    }

    this.providers.push(registration);
    this.providers.sort(
      (a, b) => a.priority - b.priority,
    );
  }

  getAll(): ProviderRegistration[] {
    return [...this.providers];
  }

  /**
   * Gateway compatibility surface.
   * Returns the concrete registered providers, not their registration wrappers.
   */
  list(): JumoAIProvider[] {
    return this.providers
      .filter((item) => item.enabled)
      .map((item) => item.provider);
  }

  /**
   * Resolve a concrete provider by canonical gateway ID or
   * by its registered provider ID.
   *
   * Canonical gateway IDs are intentionally kept separate from
   * the provider implementation IDs.
   */
  get(providerId: string): JumoAIProvider | undefined {
    const aliases: Record<string, string> = {
      OPENAI: "openai-primary",
      GEMINI: "gemini-engineering",
      COPILOT: "copilot-engineering",
      JUMO_LOCAL: "jumo-local",
      JUMO_RUNTIME: "jumo-runtime",
    };

    const resolvedId = aliases[providerId] ?? providerId;

    return this.providers.find(
      (item) =>
        item.enabled &&
        item.provider.providerId === resolvedId,
    )?.provider;
  }

  async resolve(
    role: JumoAIProviderRole,
  ): Promise<JumoAIProvider> {
    const candidates = this.providers
      .filter(
        (item) =>
          item.enabled &&
          item.role === role,
      )
      .sort(
        (a, b) => a.priority - b.priority,
      );

    for (const candidate of candidates) {
      if (await candidate.provider.isAvailable()) {
        return candidate.provider;
      }
    }

    throw new Error(
      `No available JUMO AI provider for role ${role}.`,
    );
  }

  async generate(
    role: JumoAIProviderRole,
    request: JumoAIRequest,
  ): Promise<JumoAIResponse> {
    const provider = await this.resolve(role);
    return provider.generate(request);
  }

  snapshot() {
    return this.providers.map((item) => ({
      providerId: item.provider.providerId,
      displayName: item.provider.displayName,
      role: item.role,
      priority: item.priority,
      enabled: item.enabled,
      local: item.provider.local,
    }));
  }
}

export const jumoAIProviderRegistry =
  JumoAIProviderRegistry.getInstance();
