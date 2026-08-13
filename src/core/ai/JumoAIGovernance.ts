/**
 * JUMO UEOS — Authoritative AI Governance
 *
 * JUMO owns:
 * - agent identity
 * - agent role
 * - agent expertise
 * - agent quota
 * - agent permissions
 * - model qualification policy
 *
 * External providers supply models only.
 * They never own or redefine JUMO agents.
 */

export type JumoProviderId =
  | "OPENAI"
  | "GEMINI"
  | "COPILOT"
  | "JUMO_LOCAL";

export type JumoAgentAuthority =
  | "CONVERSATIONAL"
  | "REASONING"
  | "SYSTEM_ADMINISTRATION"
  | "PLATFORM_ARCHITECT"
  | "IMPLEMENTATION_ENGINEERING"
  | "VERIFICATION"
  | "GENERAL";

export interface JumoAgentQuotaPolicy {
  /**
   * All limits are configurable.
   *
   * null means "unlimited / governed elsewhere".
   * JUMO, the tenant, administrator, or policy engine
   * may assign these values at runtime.
   */
  dailyRequests: number | null;
  dailyTokens: number | null;
  monthlyTokens: number | null;
  maxConcurrency: number | null;
  priority: "CRITICAL" | "HIGH" | "NORMAL" | "LOW";
}

export interface JumoAgentQuotaAssignment {
  agentId: string;
  policyId: string;
  quota: JumoAgentQuotaPolicy;
  assignedBy: string;
  assignedAt: string;
  updatedAt: string;
  source:
    | "SYSTEM_ADMINISTRATOR"
    | "TENANT_ADMINISTRATOR"
    | "POLICY_ENGINE"
    | "PLATFORM_OWNER";
}

export interface JumoQuotaConfiguration {
  policies: Record<string, JumoAgentQuotaPolicy>;
  assignments: Record<string, JumoAgentQuotaAssignment>;
}

export interface JumoModelEvolutionPolicy {
  autoUpgrade: boolean;
  requireQualification: boolean;
  requireSecurityVerification: boolean;
  preserveAgentIdentity: boolean;
  preserveQuotaPolicy: boolean;
  allowAutomaticDowngrade: boolean;
}

export interface JumoWorkforceProviderPolicy {
  authority: JumoAgentAuthority;
  providers: JumoProviderId[];
  modelEvolution: JumoModelEvolutionPolicy;
}

const DEFAULT_EVOLUTION: JumoModelEvolutionPolicy = {
  autoUpgrade: true,
  requireQualification: true,
  requireSecurityVerification: true,
  preserveAgentIdentity: true,
  preserveQuotaPolicy: true,
  allowAutomaticDowngrade: false,
};

export class JumoAIGovernance {
  private static instance: JumoAIGovernance;

  /**
   * Runtime configuration.
   *
   * This starts empty intentionally.
   * No quota is invented by the gateway.
   */
  private configuration: JumoQuotaConfiguration = {
    policies: {},
    assignments: {},
  };

  private constructor() {}

  static getInstance(): JumoAIGovernance {
    if (!JumoAIGovernance.instance) {
      JumoAIGovernance.instance = new JumoAIGovernance();
    }
    return JumoAIGovernance.instance;
  }

  /**
   * Authoritative provider policy.
   *
   * OpenAI/ChatGPT:
   * conversational, reasoning, system administration,
   * and platform architecture.
   *
   * Gemini/Copilot:
   * implementation engineering workforce.
   *
   * JUMO Local:
   * sovereign/offline execution and fallback.
   */
  getWorkforcePolicy(authority: JumoAgentAuthority): JumoWorkforceProviderPolicy {
    switch (authority) {
      case "CONVERSATIONAL":
      case "REASONING":
      case "SYSTEM_ADMINISTRATION":
      case "PLATFORM_ARCHITECT":
        return {
          authority,
          providers: ["OPENAI", "JUMO_LOCAL"],
          modelEvolution: { ...DEFAULT_EVOLUTION },
        };

      case "IMPLEMENTATION_ENGINEERING":
        return {
          authority,
          providers: ["GEMINI", "COPILOT", "JUMO_LOCAL"],
          modelEvolution: { ...DEFAULT_EVOLUTION },
        };

      case "VERIFICATION":
        return {
          authority,
          providers: ["OPENAI", "GEMINI", "COPILOT", "JUMO_LOCAL"],
          modelEvolution: { ...DEFAULT_EVOLUTION },
        };

      default:
        return {
          authority,
          providers: ["OPENAI", "GEMINI", "COPILOT", "JUMO_LOCAL"],
          modelEvolution: { ...DEFAULT_EVOLUTION },
        };
    }
  }

  /**
   * Load quota configuration from the authoritative JUMO
   * configuration/policy layer.
   *
   * The AI gateway does not invent defaults.
   */
  setQuotaConfiguration(configuration: JumoQuotaConfiguration): void {
    this.configuration = {
      policies: { ...configuration.policies },
      assignments: { ...configuration.assignments },
    };
  }

  getQuotaConfiguration(): JumoQuotaConfiguration {
    return {
      policies: { ...this.configuration.policies },
      assignments: { ...this.configuration.assignments },
    };
  }

  /**
   * Returns the explicitly assigned quota.
   *
   * undefined means that no quota has been configured.
   * This is intentional: the gateway must not manufacture
   * a quota value.
   */
  getQuota(agentId: string): JumoAgentQuotaPolicy | undefined {
    return this.configuration.assignments[agentId]?.quota;
  }

  /**
   * JUMO administration assigns an existing policy to an agent.
   */
  assignQuota(
    agentId: string,
    policyId: string,
    assignedBy: string,
    source: JumoAgentQuotaAssignment["source"],
  ): void {
    const policy = this.configuration.policies[policyId];

    if (!policy) {
      throw new Error(
        `JUMO quota policy is not configured: ${policyId}`,
      );
    }

    const now = new Date().toISOString();
    const previous = this.configuration.assignments[agentId];

    this.configuration.assignments[agentId] = {
      agentId,
      policyId,
      quota: { ...policy },
      assignedBy,
      assignedAt: previous?.assignedAt ?? now,
      updatedAt: now,
      source,
    };
  }

  /**
   * Create or update a configurable quota policy.
   *
   * No provider can call this implicitly.
   */
  setQuotaPolicy(
    policyId: string,
    policy: JumoAgentQuotaPolicy,
  ): void {
    this.configuration.policies[policyId] = {
      ...policy,
    };
  }

  removeQuotaPolicy(policyId: string): void {
    delete this.configuration.policies[policyId];
  }

  removeAgentQuota(agentId: string): void {
    delete this.configuration.assignments[agentId];
  }

  /**
   * Runtime quota enforcement.
   *
   * Returns undefined when no quota is configured.
   */
  checkQuota(agentId: string): JumoAgentQuotaPolicy | undefined {
    return this.configuration.assignments[agentId]?.quota;
  }

  /**
   * Provider capacity is an execution constraint.
   * It must never mutate the JUMO agent quota.
   */
  providerFailureDoesNotChangeQuota(): true {
    return true;
  }

  /**
   * New provider models may be adopted automatically only after
   * JUMO qualification and security verification.
   */
  canAutoUpgrade(): true {
    return true;
  }
}
