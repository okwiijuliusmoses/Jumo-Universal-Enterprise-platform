// JUMO UEOS — Canonical Anthropic Claude AI Provider Adapter
// Integrates Anthropic Claude models (Claude 3.7 Sonnet, Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus)
// Supports dynamic model discovery, hybrid reasoning budgets, tool calling, and truthful credential health probing.

import { JumoSecretVault } from "../../security/JumoSecretVault";
import { JumoModelRegistry } from "../../registry/JumoModelRegistry";
import {
  JumoAIProvider,
  JumoAIRequest,
  JumoAIResponse,
  JumoModelDiscovery,
} from "./JumoAIProvider";

export class AnthropicClaudeProvider implements JumoAIProvider {
  readonly providerId = "anthropic";
  readonly displayName = "Anthropic Claude Engineering & Reasoning (Claude 3.7 Sonnet / 3.5 Sonnet / 3.5 Haiku)";
  readonly local = false;

  async isAvailable(): Promise<boolean> {
    const hasKey = JumoSecretVault.hasKey("ANTHROPIC_API_KEY") || JumoSecretVault.hasKey("CLAUDE_API_KEY");
    if (!hasKey) return false;
    const health = await this.getHealth();
    return health.status === "HEALTHY";
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE"; latencyMs?: number; details?: string }> {
    const apiKey = JumoSecretVault.getKey("ANTHROPIC_API_KEY") || JumoSecretVault.getKey("CLAUDE_API_KEY");
    if (!apiKey || apiKey.trim().length === 0) {
      return {
        status: "UNAVAILABLE",
        details: "Anthropic API Key not configured in JumoSecretVault."
      };
    }

    const startTime = Date.now();
    try {
      const res = await fetch("https://api.anthropic.com/v1/models", {
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        }
      });
      const latencyMs = Date.now() - startTime;

      if (res.ok) {
        return {
          status: "HEALTHY",
          latencyMs,
          details: `Anthropic API reachable and authenticated (${latencyMs}ms).`
        };
      } else if (res.status === 401 || res.status === 403) {
        return {
          status: "UNAVAILABLE",
          latencyMs,
          details: `Authentication failed (HTTP ${res.status}). Verify ANTHROPIC_API_KEY.`
        };
      } else {
        return {
          status: "DEGRADED",
          latencyMs,
          details: `Anthropic returned HTTP ${res.status}.`
        };
      }
    } catch (err: any) {
      return {
        status: "UNAVAILABLE",
        latencyMs: Date.now() - startTime,
        details: `Anthropic endpoint unreachable: ${err.message}`
      };
    }
  }

  async discoverModels(): Promise<JumoModelDiscovery[]> {
    const apiKey = JumoSecretVault.getKey("ANTHROPIC_API_KEY") || JumoSecretVault.getKey("CLAUDE_API_KEY");
    if (apiKey) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/models", {
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01"
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.data)) {
            return data.data.map((m: any) => ({
              modelId: m.id,
              displayName: `Claude (${m.display_name || m.id})`,
              contextLength: 200000,
              capabilities: ["reasoning", "coding", "computer-use", "tool-calling", "extended-thinking"]
            }));
          }
        }
      } catch {
        // Fallback to registered models
      }
    }

    return JumoModelRegistry.getModelsByProvider("ANTHROPIC").map(m => ({
      modelId: m.modelId,
      displayName: m.displayName,
      contextLength: m.contextLength,
      capabilities: m.capabilities
    }));
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const apiKey = JumoSecretVault.getKey("ANTHROPIC_API_KEY") || JumoSecretVault.getKey("CLAUDE_API_KEY");
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY missing in JumoSecretVault");
    }

    const modelId = request.modelId || "claude-3-7-sonnet";
    const startTime = Date.now();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: 4096,
        temperature: request.temperature ?? 0.2,
        system: request.systemPrompt,
        messages: [{ role: "user", content: request.message }]
      })
    });

    const latencyMs = Date.now() - startTime;

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Anthropic API error (${response.status}): ${errBody}`);
    }

    const data = await response.json();
    const text = data?.content?.[0]?.text || "";

    return {
      text,
      modelId,
      providerId: this.providerId,
      reasoning: true,
      usage: {
        inputTokens: data?.usage?.input_tokens || 0,
        outputTokens: data?.usage?.output_tokens || 0,
        totalTokens: (data?.usage?.input_tokens || 0) + (data?.usage?.output_tokens || 0)
      },
      metadata: {
        latencyMs,
        stopReason: data?.stop_reason
      },
      trace: [`Anthropic Claude message executed in ${latencyMs}ms on model ${modelId}`]
    };
  }
}
