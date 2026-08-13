/**
 * JUMO UEOS — Authoritative AI Workforce Policy
 *
 * JUMO owns all agents.
 * External providers supply models only.
 *
 * Authority:
 *   CHATGPT / OPENAI
 *     - General conversational reasoning
 *     - System administration
 *     - Platform architecture
 *     - Authoritative platform reasoning
 *
 *   GEMINI / COPILOT
 *     - Implementation engineering
 *     - Assigned according to registered expertise
 *
 *   JUMO_LOCAL
 *     - Sovereign local execution
 *     - Offline / air-gapped fallback
 *
 * Provider model evolution may upgrade an agent's model,
 * but MUST NOT change the agent's JUMO identity, ownership,
 * authority, role, quota or assignment.
 */

export type JumoAIWorkforceAuthority =
  | "CHATGPT"
  | "IMPLEMENTATION_ENGINEERING"
  | "JUMO_LOCAL";

export type JumoImplementationProvider =
  | "GEMINI"
  | "COPILOT"
  | "JUMO_LOCAL";

export interface JumoAgentAuthorityPolicy {
  authority: JumoAIWorkforceAuthority;
  allowedProviders: JumoImplementationProvider[];
  primaryProvider?: "OPENAI" | "GEMINI" | "COPILOT" | "JUMO_LOCAL";
  modelUpgradeEnabled: boolean;
  providerControlsIdentity: false;
  providerControlsQuota: false;
  providerControlsAssignment: false;
}

export interface JumoAgentExpertiseRule {
  id: string;
  keywords: string[];
  specialties: string[];
  preferredImplementationProviders: Array<"GEMINI" | "COPILOT">;
}

/**
 * Provider/model capability discovery can update this registry.
 * It never transfers ownership of the JUMO agent.
 */
export interface JumoModelUpgradeRecord {
  agentId: string;
  previousModel?: string;
  upgradedModel: string;
  provider: string;
  capabilityScore?: number;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  upgradedAt: string;
  reason: string;
}

export const JUMO_WORKFORCE_AUTHORITIES = {
  CHATGPT: {
    authority: "CHATGPT" as const,
    allowedProviders: ["JUMO_LOCAL"] as JumoImplementationProvider[],
    primaryProvider: "OPENAI" as const,
    modelUpgradeEnabled: true,
    providerControlsIdentity: false as const,
    providerControlsQuota: false as const,
    providerControlsAssignment: false as const,
  },

  IMPLEMENTATION_ENGINEERING: {
    authority: "IMPLEMENTATION_ENGINEERING" as const,
    allowedProviders: [
      "GEMINI",
      "COPILOT",
      "JUMO_LOCAL",
    ] as JumoImplementationProvider[],
    modelUpgradeEnabled: true,
    providerControlsIdentity: false as const,
    providerControlsQuota: false as const,
    providerControlsAssignment: false as const,
  },

  JUMO_LOCAL: {
    authority: "JUMO_LOCAL" as const,
    allowedProviders: ["JUMO_LOCAL"] as JumoImplementationProvider[],
    primaryProvider: "JUMO_LOCAL" as const,
    modelUpgradeEnabled: false,
    providerControlsIdentity: false as const,
    providerControlsQuota: false as const,
    providerControlsAssignment: false as const,
  },
} satisfies Record<string, JumoAgentAuthorityPolicy>;

export const JUMO_ENGINEERING_EXPERTISE: JumoAgentExpertiseRule[] = [
  {
    id: "ARCHITECTURE",
    keywords: ["architecture", "system design", "platform design", "ueos"],
    specialties: ["enterprise architecture", "platform architecture"],
    preferredImplementationProviders: ["GEMINI", "COPILOT"],
  },
  {
    id: "FRONTEND",
    keywords: ["frontend", "react", "ui", "ux", "experience"],
    specialties: ["frontend engineering", "UI engineering", "UX implementation"],
    preferredImplementationProviders: ["GEMINI", "COPILOT"],
  },
  {
    id: "BACKEND",
    keywords: ["backend", "api", "server", "service", "runtime"],
    specialties: ["backend engineering", "API engineering", "runtime engineering"],
    preferredImplementationProviders: ["GEMINI", "COPILOT"],
  },
  {
    id: "DATABASE",
    keywords: ["database", "postgres", "sql", "data", "storage"],
    specialties: ["database engineering", "data architecture"],
    preferredImplementationProviders: ["GEMINI", "COPILOT"],
  },
  {
    id: "SECURITY",
    keywords: ["security", "aegis", "zero trust", "encryption", "identity"],
    specialties: ["security engineering", "identity engineering"],
    preferredImplementationProviders: ["GEMINI", "COPILOT"],
  },
  {
    id: "AI",
    keywords: ["ai", "model", "agent", "reasoning", "machine learning"],
    specialties: ["AI engineering", "agent engineering", "model integration"],
    preferredImplementationProviders: ["GEMINI", "COPILOT"],
  },
  {
    id: "VERIFICATION",
    keywords: ["verification", "assurance", "audit", "quality", "testing"],
    specialties: ["verification engineering", "QA", "assurance"],
    preferredImplementationProviders: ["GEMINI", "COPILOT"],
  },
  {
    id: "DEVOPS",
    keywords: ["deployment", "devops", "infrastructure", "ci", "cd"],
    specialties: ["deployment engineering", "infrastructure engineering"],
    preferredImplementationProviders: ["GEMINI", "COPILOT"],
  },
];

export function classifyJumoAuthority(
  text: string,
): JumoAIWorkforceAuthority {
  const value = text.toLowerCase();

  if (
    value.includes("conversation") ||
    value.includes("conversational") ||
    value.includes("system administrator") ||
    value.includes("platform administrator") ||
    value.includes("platform architecture") ||
    value.includes("authoritative reasoning")
  ) {
    return "CHATGPT";
  }

  if (
    value.includes("implementation") ||
    value.includes("engineering") ||
    value.includes("code") ||
    value.includes("build") ||
    value.includes("frontend") ||
    value.includes("backend") ||
    value.includes("database") ||
    value.includes("security") ||
    value.includes("verification")
  ) {
    return "IMPLEMENTATION_ENGINEERING";
  }

  return "JUMO_LOCAL";
}

export function selectImplementationProvider(
  agentId: string,
  specialization: string,
): "GEMINI" | "COPILOT" {
  const text = `${agentId} ${specialization}`.toLowerCase();

  const matching = JUMO_ENGINEERING_EXPERTISE.find(rule =>
    rule.keywords.some(keyword => text.includes(keyword)),
  );

  if (!matching) {
    return "GEMINI";
  }

  return matching.preferredImplementationProviders[0] ?? "GEMINI";
}
