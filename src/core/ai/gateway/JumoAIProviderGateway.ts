/**
 * JUMO UEOS — Authoritative AI Provider Gateway
 *
 * SINGLE EXECUTION GATEWAY FOR THE JUMO COGNITIVE WORKFORCE.
 *
 * Architecture:
 *
 * Agent
 *   ↓
 * Unified Product Specification / AI Policy
 *   ↓
 * AI Gateway
 *   ↓
 * Provider Registry
 *   ↓
 * Provider Adapter
 *   ↓
 * Verification / Evidence
 *   ↓
 * Event / Audit Trail
 *
 * The gateway does NOT bind JUMO agents to a specific external model.
 * Agents express policy; the gateway resolves the actual provider.
 *
 * Supported execution:
 *   LIVE      — external providers allowed
 *   HYBRID    — external providers + mandatory local fallback policy
 *   AIR-GAP   — JUMO Local only
 *
 * External providers:
 *   OPENAI
 *   GEMINI
 *   COPILOT
 *
 * Sovereign provider:
 *   JUMO_LOCAL
 */

import { AIAgentRecord } from "../types/JumoAITypes";
import { JumoSecretVault } from "../../security/JumoSecretVault";
import {
  JumoAIProvider,
  JumoAIProviderRegistry,
} from "../providers/JumoAIProviderRegistry";
import { UnifiedProductSpecification } from "../../specification/JumoUnifiedProductSpecificationContract";

export type AIExecutionMode = "LIVE" | "HYBRID" | "AIR-GAP";

export type AIProviderId =
  | "OPENAI"
  | "GEMINI"
  | "COPILOT"
  | "JUMO_LOCAL";

export interface AIProviderConfig {
  mode: AIExecutionMode;
  reasoningPolicy:
    | "CRITICAL_ARCH_PREFER_OPENAI"
    | "COST_SENSITIVE"
    | "BALANCED";

  openaiKey?: string;
  openaiModel: string;

  geminiKey?: string;
  geminiModel: string;

  timeoutMs: number;
  maxRetries: number;
  maxConcurrency: number;
}

export interface AIExecutionResult {
  success: boolean;

  provider: AIProviderId | "NONE";
  modelUsed: string;

  executionMode: AIExecutionMode;

  agentId: string;
  agentName: string;
  taskTitle: string;

  output: string;

  tokensUsed?: number;
  latencyMs: number;

  evidenceHash: string;
  timestamp: string;

  trace: string[];

  fallbackUsed?: boolean;
  verificationStatus?: "PASS" | "WARNING" | "FAIL";
}

export interface AIGatewayExecutionContext {
  specification?: UnifiedProductSpecification;
  tenantId?: string;
  productId?: string;
  workspaceId?: string;
  requestId?: string;

  /**
   * Optional task-level provider override.
   * This is still subject to gateway policy.
   */
  preferredProvider?: AIProviderId;

  metadata?: Record<string, unknown>;
}

export class JumoAIProviderGateway {
  private static instance: JumoAIProviderGateway;

  private constructor() {}

  public static getInstance(): JumoAIProviderGateway {
    if (!JumoAIProviderGateway.instance) {
      JumoAIProviderGateway.instance = new JumoAIProviderGateway();
    }

    return JumoAIProviderGateway.instance;
  }

  /**
   * Read runtime provider configuration from the sovereign vault.
   */
  public getConfig(): AIProviderConfig {
    const vault = JumoSecretVault.getInstance();

    return {
      mode: vault.getAIProviderMode(),
      reasoningPolicy: vault.getAIReasoningPolicy(),

      openaiKey: vault.getOpenAIKey(),
      openaiModel: vault.getOpenAIModel(),

      geminiKey: vault.getGeminiKey(),
      geminiModel: vault.getGeminiModel(),

      timeoutMs: vault.getAITimeoutMs(),
      maxRetries: vault.getAIMaxRetries(),
      maxConcurrency: vault.getAIMaxConcurrency(),
    };
  }

  /**
   * Execute an AI workforce task through the authoritative gateway.
   */
  public async executeAgentTask(
    agent: AIAgentRecord,
    taskTitle: string,
    prompt: string,
    context?: unknown,
    gatewayContext?: AIGatewayExecutionContext,
  ): Promise<AIExecutionResult> {
    const startedAt = Date.now();

    const config = this.getConfig();

    const trace: string[] = [];

    const requestId =
      gatewayContext?.requestId ??
      `jumo-ai-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;

    trace.push(
      `[GATEWAY] Request ${requestId} initiated.`,
    );

    trace.push(
      `[GATEWAY] Agent ${agent.jumoName} (${agent.agentId}) executing "${taskTitle}".`,
    );

    trace.push(
      `[GATEWAY] Execution mode=${config.mode}; reasoningPolicy=${config.reasoningPolicy}.`,
    );

    /**
     * Resolve specification-level AI policy first.
     */
    const specificationAI =
      gatewayContext?.specification?.ai;

    const preferredProvider =
      gatewayContext?.preferredProvider ??
      specificationAI?.primaryProvider ??
      this.normalizeProvider(agent.modelPolicy?.preferredProvider);

    const fallbackProviders =
      specificationAI?.fallbackProviders?.map((provider) =>
        this.normalizeProvider(provider),
      ) ??
      this.defaultFallbackOrder();

    const localFallbackEnabled =
      specificationAI?.localFallbackEnabled ??
      agent.modelPolicy?.offlineFallbackEnabled ??
      true;

    trace.push(
      `[POLICY] Preferred provider=${preferredProvider}.`,
    );

    trace.push(
      `[POLICY] Local fallback=${localFallbackEnabled}.`,
    );

    /**
     * AIR-GAP is an absolute execution boundary.
     */
    if (config.mode === "AIR-GAP") {
      trace.push(
        `[POLICY] AIR-GAP active. External providers prohibited.`,
      );

      return this.executeLocal(
        agent,
        taskTitle,
        prompt,
        context,
        requestId,
        config.mode,
        trace,
        startedAt,
      );
    }

    const registry = JumoAIProviderRegistry.getInstance();

    /**
     * Determine healthy providers.
     */
    const healthyProviders =
      await this.getHealthyProviders(registry, trace);

    /**
     * Resolve provider candidates from specification policy.
     */
    const candidates = this.resolveCandidates(
      preferredProvider,
      fallbackProviders,
      healthyProviders,
      trace,
    );

    /**
     * Attempt providers sequentially.
     *
     * This is deliberately deterministic.
     * The gateway never fabricates successful execution.
     */
    for (const providerId of candidates) {
      const provider = healthyProviders.find(
        (candidate) => candidate.providerId === providerId,
      );

      if (!provider) {
        continue;
      }

      try {
        trace.push(
          `[DISPATCH] ${providerId} selected for ${agent.jumoName}.`,
        );

        const response = await this.executeProvider(
          provider,
          agent,
          prompt,
          context,
          config,
        );

        const latencyMs = Date.now() - startedAt;

        trace.push(
          `[SUCCESS] ${providerId} completed execution in ${latencyMs}ms.`,
        );

        return {
          success: true,
          provider: providerId,
          modelUsed:
            response.modelUsed ??
            agent.modelPolicy?.modelAlias ??
            "provider-default",

          executionMode: config.mode,

          agentId: agent.agentId,
          agentName: agent.jumoName,
          taskTitle,

          output: response.text,

          tokensUsed: response.tokensUsed,
          latencyMs,

          evidenceHash: this.createEvidenceHash(
            requestId,
            providerId,
            response.text,
          ),

          timestamp: new Date().toISOString(),

          trace,

          fallbackUsed:
            providerId !== preferredProvider,

          verificationStatus: "PASS",
        };
      } catch (error: any) {
        trace.push(
          `[FAILURE] ${providerId}: ${error?.message ?? String(error)}.`,
        );

        /**
         * Continue to the next policy-approved provider.
         */
      }
    }

    /**
     * No external provider succeeded.
     *
     * HYBRID and specification-enabled local fallback
     * terminate at JUMO Local rather than returning fabricated
     * external intelligence.
     */
    if (
      config.mode === "HYBRID" &&
      localFallbackEnabled
    ) {
      trace.push(
        `[FALLBACK] External providers exhausted. Routing to JUMO_LOCAL.`,
      );

      return this.executeLocal(
        agent,
        taskTitle,
        prompt,
        context,
        requestId,
        config.mode,
        trace,
        startedAt,
      );
    }

    /**
     * Strict LIVE execution with no valid provider.
     */
    trace.push(
      `[FAIL] No approved AI provider could execute the task.`,
    );

    return {
      success: false,
      provider: "NONE",
      modelUsed: "NONE",

      executionMode: config.mode,

      agentId: agent.agentId,
      agentName: agent.jumoName,
      taskTitle,

      output:
        "AI_EXECUTION_BLOCKED: No approved provider was available and local fallback was not permitted.",

      latencyMs: Date.now() - startedAt,

      evidenceHash: this.createEvidenceHash(
        requestId,
        "NONE",
        "AI_EXECUTION_BLOCKED",
      ),

      timestamp: new Date().toISOString(),

      trace,

      fallbackUsed: false,
      verificationStatus: "FAIL",
    };
  }

  /**
   * Provider health is resolved dynamically.
   * The gateway does not hard-code a fixed workforce size.
   */
  private async getHealthyProviders(
    registry: JumoAIProviderRegistry,
    trace: string[],
  ): Promise<JumoAIProvider[]> {
    const providers = registry.list();

    const healthy: JumoAIProvider[] = [];

    for (const provider of providers) {
      try {
        if (provider.local) {
          healthy.push(provider);
          trace.push(
            `[HEALTH] ${provider.providerId}=LOCAL_READY.`,
          );
          continue;
        }

        const health = await provider.getHealth();

        if (health.status === "HEALTHY") {
          healthy.push(provider);

          trace.push(
            `[HEALTH] ${provider.providerId}=HEALTHY.`,
          );
        } else {
          trace.push(
            `[HEALTH] ${provider.providerId}=${health.status}.`,
          );
        }
      } catch (error: any) {
        trace.push(
          `[HEALTH] ${provider.providerId}=ERROR: ${
            error?.message ?? String(error)
          }.`,
        );
      }
    }

    return healthy;
  }

  /**
   * Resolve provider order.
   *
   * Specification policy is authoritative.
   * Provider availability is authoritative at runtime.
   */
  private resolveCandidates(
    preferred: AIProviderId,
    fallbacks: AIProviderId[],
    healthy: JumoAIProvider[],
    trace: string[],
  ): AIProviderId[] {
    const available = new Set(
      healthy.map((provider) =>
        this.normalizeProvider(provider.providerId),
      ),
    );

    const requested = [
      preferred,
      ...fallbacks,
    ];

    const candidates: AIProviderId[] = [];

    for (const provider of requested) {
      if (
        provider === "JUMO_LOCAL" ||
        available.has(provider)
      ) {
        if (!candidates.includes(provider)) {
          candidates.push(provider);
        }
      }
    }

    /**
     * Ensure deterministic sovereign fallback remains available
     * if it is registered.
     */
    if (
      available.has("JUMO_LOCAL") &&
      !candidates.includes("JUMO_LOCAL")
    ) {
      candidates.push("JUMO_LOCAL");
    }

    trace.push(
      `[ROUTING] Candidate chain=${candidates.join(" -> ") || "NONE"}.`,
    );

    return candidates;
  }

  /**
   * Execute a provider adapter.
   */
  private async executeProvider(
    provider: JumoAIProvider,
    agent: AIAgentRecord,
    prompt: string,
    context: unknown,
    config: AIProviderConfig,
  ): Promise<{
    text: string;
    modelUsed?: string;
    tokensUsed?: number;
  }> {
    const result = await provider.generate({
      message: prompt,

      temperature:
        agent.modelPolicy?.temperature ?? 0.2,

      systemPrompt: [
        `JUMO UEOS AI WORKFORCE AGENT`,
        `Agent Role: ${agent.role}`,
        `Specialization: ${agent.specialization}`,
        `Provider execution is governed by JUMO UEOS policy.`,
        `Do not fabricate verification, certification, deployment, or execution evidence.`,
      ].join("\n"),

      context: {
        ...(typeof context === "object" && context !== null
          ? context
          : { value: context }),

        gateway: {
          timeoutMs: config.timeoutMs,
          maxRetries: config.maxRetries,
          executionMode: config.mode,
        },
      },
    });

    return {
      text: result.text,
      modelUsed:
        (result as any).modelUsed ??
        (result as any).model ??
        agent.modelPolicy?.modelAlias,

      tokensUsed:
        (result as any).tokensUsed ??
        (result as any).usage?.totalTokens,
    };
  }

  /**
   * Sovereign local execution.
   */
  private async executeLocal(
    agent: AIAgentRecord,
    taskTitle: string,
    prompt: string,
    context: unknown,
    requestId: string,
    mode: AIExecutionMode,
    trace: string[],
    startedAt: number,
  ): Promise<AIExecutionResult> {
    const registry =
      JumoAIProviderRegistry.getInstance();

    let localProvider: JumoAIProvider;

    try {
      localProvider = registry.get("JUMO_LOCAL");
    } catch {
      trace.push(
        `[FAIL] JUMO_LOCAL provider is not registered.`,
      );

      return {
        success: false,
        provider: "NONE",
        modelUsed: "NONE",
        executionMode: mode,

        agentId: agent.agentId,
        agentName: agent.jumoName,
        taskTitle,

        output:
          "SOVEREIGN_AI_UNAVAILABLE: JUMO_LOCAL provider is not registered.",

        latencyMs: Date.now() - startedAt,

        evidenceHash: this.createEvidenceHash(
          requestId,
          "NONE",
          "SOVEREIGN_AI_UNAVAILABLE",
        ),

        timestamp: new Date().toISOString(),

        trace,

        fallbackUsed: true,
        verificationStatus: "FAIL",
      };
    }

    try {
      const result = await localProvider.generate({
        message: prompt,

        temperature:
          agent.modelPolicy?.temperature ?? 0.2,

        systemPrompt: [
          "JUMO UEOS SOVEREIGN LOCAL AI",
          `Agent Role: ${agent.role}`,
          `Specialization: ${agent.specialization}`,
          "Operate without external model dependency.",
          "Never fabricate unavailable evidence.",
        ].join("\n"),

        context,
      });

      const latencyMs = Date.now() - startedAt;

      trace.push(
        `[LOCAL] JUMO_LOCAL completed execution in ${latencyMs}ms.`,
      );

      return {
        success: true,
        provider: "JUMO_LOCAL",

        modelUsed:
          (result as any).modelUsed ??
          (result as any).model ??
          agent.modelPolicy?.modelAlias ??
          "jumo-local",

        executionMode: mode,

        agentId: agent.agentId,
        agentName: agent.jumoName,
        taskTitle,

        output: result.text,

        tokensUsed:
          (result as any).tokensUsed ??
          (result as any).usage?.totalTokens,

        latencyMs,

        evidenceHash: this.createEvidenceHash(
          requestId,
          "JUMO_LOCAL",
          result.text,
        ),

        timestamp: new Date().toISOString(),

        trace,

        fallbackUsed: true,
        verificationStatus: "PASS",
      };
    } catch (error: any) {
      trace.push(
        `[LOCAL-FAILURE] ${
          error?.message ?? String(error)
        }.`,
      );

      return {
        success: false,
        provider: "JUMO_LOCAL",

        modelUsed: "jumo-local",

        executionMode: mode,

        agentId: agent.agentId,
        agentName: agent.jumoName,
        taskTitle,

        output:
          "SOVEREIGN_AI_EXECUTION_FAILED: JUMO Local execution failed.",

        latencyMs: Date.now() - startedAt,

        evidenceHash: this.createEvidenceHash(
          requestId,
          "JUMO_LOCAL",
          "SOVEREIGN_AI_EXECUTION_FAILED",
        ),

        timestamp: new Date().toISOString(),

        trace,

        fallbackUsed: true,
        verificationStatus: "FAIL",
      };
    }
  }

  /**
   * Normalize legacy provider identifiers into the authoritative
   * JUMO provider vocabulary.
   */
  private normalizeProvider(
    provider?: string,
  ): AIProviderId {
    switch ((provider ?? "").toUpperCase()) {
      case "OPENAI":
        return "OPENAI";

      case "GEMINI":
      case "GOOGLE_GENAI":
        return "GEMINI";

      case "COPILOT":
        return "COPILOT";

      case "JUMO_LOCAL":
      case "JUMO_LOCAL_RUNTIME":
      case "CUSTOM_HYBRID":
        return "JUMO_LOCAL";

      default:
        return "JUMO_LOCAL";
    }
  }

  private defaultFallbackOrder(): AIProviderId[] {
    return [
      "GEMINI",
      "OPENAI",
      "COPILOT",
      "JUMO_LOCAL",
    ];
  }

  /**
   * Lightweight deterministic evidence identifier.
   *
   * This is an execution correlation identifier, not a cryptographic
   * certification signature. Formal certification remains owned by
   * Product Assurance / Verification.
   */
  private createEvidenceHash(
    requestId: string,
    provider: string,
    output: string,
  ): string {
    let hash = 2166136261;

    const value =
      `${requestId}|${provider}|${output}`;

    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash =
        Math.imul(hash, 16777619) >>> 0;
    }

    return `jumo-ai-${hash.toString(16)}`;
  }
}
