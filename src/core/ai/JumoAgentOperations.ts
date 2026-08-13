/**
 * JUMO UEOS — Agent Operations Controller
 *
 * JUMO owns the workforce.
 *
 * External providers are model execution backends only.
 * They do not own:
 * - agent identity
 * - agent role
 * - agent expertise
 * - agent quota policy
 * - agent authority
 * - agent lifecycle
 *
 * Model providers may evolve underneath an existing JUMO agent.
 */

import {
  JumoAIGovernance,
  JumoAgentAuthority,
} from "./JumoAIGovernance";

export type JumoAgentOperationalStatus =
  | "READY"
  | "ACTIVE"
  | "PAUSED"
  | "BLOCKED"
  | "DEGRADED";

export interface JumoAgentOperationalConfiguration {
  agentId: string;

  enabled: boolean;

  status: JumoAgentOperationalStatus;

  authority: JumoAgentAuthority;

  approvedProviders: string[];

  preferredProvider?: string;

  modelAlias?: string;

  offlineFallbackEnabled: boolean;

  humanApprovalRequired: boolean;

  verificationRequired: boolean;

  /**
   * No quota is invented here.
   *
   * undefined means quota has not been assigned.
   * The agent can therefore be active while quota
   * governance remains configurable.
   */
  quotaPolicyId?: string;

  configurationSource:
    | "JUMO_CONFIGURATION"
    | "TENANT_CONFIGURATION"
    | "ADMINISTRATOR_CONFIGURATION"
    | "POLICY_ENGINE";
}

export class JumoAgentOperations {
  private static instance: JumoAgentOperations;

  private readonly agents =
    new Map<string, JumoAgentOperationalConfiguration>();

  private constructor() {}

  static getInstance(): JumoAgentOperations {
    if (!JumoAgentOperations.instance) {
      JumoAgentOperations.instance =
        new JumoAgentOperations();
    }

    return JumoAgentOperations.instance;
  }

  register(
    configuration: JumoAgentOperationalConfiguration,
  ): void {
    this.agents.set(configuration.agentId, {
      ...configuration,
      approvedProviders: [
        ...configuration.approvedProviders,
      ],
    });
  }

  activate(agentId: string): void {
    const agent = this.agents.get(agentId);

    if (!agent) {
      throw new Error(
        `JUMO agent is not registered: ${agentId}`,
      );
    }

    agent.enabled = true;
    agent.status = "ACTIVE";
  }

  pause(agentId: string): void {
    const agent = this.agents.get(agentId);

    if (!agent) {
      throw new Error(
        `JUMO agent is not registered: ${agentId}`,
      );
    }

    agent.status = "PAUSED";
  }

  block(agentId: string): void {
    const agent = this.agents.get(agentId);

    if (!agent) {
      throw new Error(
        `JUMO agent is not registered: ${agentId}`,
      );
    }

    agent.status = "BLOCKED";
  }

  get(agentId: string):
    | JumoAgentOperationalConfiguration
    | undefined {
    const agent = this.agents.get(agentId);

    if (!agent) {
      return undefined;
    }

    return {
      ...agent,
      approvedProviders: [
        ...agent.approvedProviders,
      ],
    };
  }

  list(): JumoAgentOperationalConfiguration[] {
    return Array.from(this.agents.values()).map(agent => ({
      ...agent,
      approvedProviders: [
        ...agent.approvedProviders,
      ],
    }));
  }

  active(): JumoAgentOperationalConfiguration[] {
    return this.list().filter(
      agent =>
        agent.enabled &&
        agent.status === "ACTIVE",
    );
  }

  /**
   * Returns the authoritative JUMO quota configuration.
   *
   * Provider quota is deliberately NOT consulted here.
   */
  getAgentQuota(agentId: string) {
    return JumoAIGovernance
      .getInstance()
      .getQuota(agentId);
  }

  /**
   * Provider model evolution does not replace the JUMO agent.
   *
   * The agent identity and authority remain stable while
   * the underlying model may change.
   */
  updateModel(
    agentId: string,
    modelAlias: string,
    provider: string,
  ): void {
    const agent = this.agents.get(agentId);

    if (!agent) {
      throw new Error(
        `JUMO agent is not registered: ${agentId}`,
      );
    }

    if (
      !agent.approvedProviders.includes(provider)
    ) {
      throw new Error(
        `Provider ${provider} is not approved for JUMO agent ${agentId}`,
      );
    }

    agent.modelAlias = modelAlias;
    agent.preferredProvider = provider;
  }
}

/**
 * Configure a JUMO agent from its declared expertise.
 *
 * No quotas are generated.
 */
export function configureJumoAgent(
  agent: {
    agentId: string;
    role?: string;
    specialization?: string;
  },
): JumoAgentOperationalConfiguration {
  const text =
    `${agent.role ?? ""} ${agent.specialization ?? ""}`
      .toLowerCase();

  let authority: JumoAgentAuthority =
    "GENERAL";

  let approvedProviders: string[] = [
    "OPENAI",
    "GEMINI",
    "COPILOT",
    "JUMO_LOCAL",
  ];

  let preferredProvider = "OPENAI";

  if (
    text.includes("conversation") ||
    text.includes("assistant")
  ) {
    authority = "CONVERSATIONAL";
    approvedProviders = [
      "OPENAI",
      "JUMO_LOCAL",
    ];
    preferredProvider = "OPENAI";
  } else if (
    text.includes("reasoning") ||
    text.includes("cognitive")
  ) {
    authority = "REASONING";
    approvedProviders = [
      "OPENAI",
      "JUMO_LOCAL",
    ];
    preferredProvider = "OPENAI";
  } else if (
    text.includes("administrator") ||
    text.includes("system administration") ||
    text.includes("platform administration")
  ) {
    authority = "SYSTEM_ADMINISTRATION";
    approvedProviders = [
      "OPENAI",
      "JUMO_LOCAL",
    ];
    preferredProvider = "OPENAI";
  } else if (
    text.includes("architect") ||
    text.includes("architecture")
  ) {
    authority = "PLATFORM_ARCHITECT";
    approvedProviders = [
      "OPENAI",
      "JUMO_LOCAL",
    ];
    preferredProvider = "OPENAI";
  } else if (
    text.includes("engineering") ||
    text.includes("engineer") ||
    text.includes("implementation") ||
    text.includes("developer") ||
    text.includes("frontend") ||
    text.includes("backend") ||
    text.includes("typescript") ||
    text.includes("react") ||
    text.includes("database") ||
    text.includes("security") ||
    text.includes("devops") ||
    text.includes("testing")
  ) {
    authority = "IMPLEMENTATION_ENGINEERING";
    approvedProviders = [
      "GEMINI",
      "COPILOT",
      "JUMO_LOCAL",
    ];
    preferredProvider = "GEMINI";
  } else if (
    text.includes("verification") ||
    text.includes("assurance") ||
    text.includes("audit") ||
    text.includes("quality")
  ) {
    authority = "VERIFICATION";
    approvedProviders = [
      "OPENAI",
      "GEMINI",
      "COPILOT",
      "JUMO_LOCAL",
    ];
    preferredProvider = "OPENAI";
  }

  return {
    agentId: agent.agentId,
    enabled: true,
    status: "READY",
    authority,
    approvedProviders,
    preferredProvider,
    offlineFallbackEnabled: true,
    humanApprovalRequired:
      authority === "SYSTEM_ADMINISTRATION" ||
      authority === "PLATFORM_ARCHITECT",
    verificationRequired: true,
    configurationSource:
      "JUMO_CONFIGURATION",
  };
}
