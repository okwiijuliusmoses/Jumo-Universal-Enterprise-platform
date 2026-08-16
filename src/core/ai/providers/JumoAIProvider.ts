import { JumoModelRegistry } from "../../registry/JumoModelRegistry";
import { LocalInferenceRuntimeRegistry } from "../runtime/LocalInferenceRuntime";
import { LocalInferenceAdapter } from "../../../engine/ai/providers/local/LocalInferenceAdapter";
// JUMO UEOS — JUMO AI Providers Layer
// Unified contract and concrete adapters for Google Gemini, OpenAI, Copilot/Microsoft, and JUMO Local Engines.

import { GoogleGenAI } from "@google/genai";
import { OpenAI } from "openai";
import { JumoSecretVault } from "../../security/JumoSecretVault";

export interface JumoAIRequest {
  message: string;
  systemPrompt?: string;
  context?: Record<string, unknown>;
  conversation?: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  reasoningEffort?: "low" | "medium" | "high" | "max";
  modelId?: string;
  temperature?: number;
}

export interface JumoAIResponse {
  text: string;
  modelId: string;
  providerId: string;
  reasoning: boolean;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
  };
  metadata?: Record<string, unknown>;
  trace?: string[];
}

export interface JumoModelDiscovery {
  modelId: string;
  displayName: string;
  contextLength: number;
  capabilities: string[];
}

export interface JumoAIProvider {
  readonly providerId: string;
  readonly displayName: string;
  readonly local: boolean;

  isAvailable(): Promise<boolean>;
  getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE" | "NOT_CONFIGURED" | "UNREACHABLE" | "NOT_CONFIGURED" | "UNREACHABLE"; latencyMs?: number; details?: string }>;
  discoverModels(): Promise<JumoModelDiscovery[]>;
  generate(request: JumoAIRequest): Promise<JumoAIResponse>;
}

// ==========================================
// 1. OPENAI PROVIDER ADAPTER
// ==========================================
export class OpenAIProvider implements JumoAIProvider {
  readonly providerId = "OPENAI";
  readonly displayName = "OpenAI Enterprise Cloud";
  readonly local = false;

  async isAvailable(): Promise<boolean> {
    return !!JumoSecretVault.getInstance().getOpenAIKey();
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE" | "NOT_CONFIGURED" | "UNREACHABLE" | "NOT_CONFIGURED" | "UNREACHABLE"; latencyMs?: number; details?: string }> {
    const vault = JumoSecretVault.getInstance();
    const key = vault.getOpenAIKey();
    if (!key) {
      return { status: "NOT_CONFIGURED", details: "API Key (JUMO_OPENAI_API_KEY) is missing in system secret vault." };
    }
    const start = Date.now();
    try {
      const openai = new OpenAI({ apiKey: key });
      const model = vault.getOpenAIModel();
      // Small verification request to check endpoint health
      await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1
      });
      return { status: "HEALTHY", latencyMs: Date.now() - start, details: `Verified OpenAI connectivity. Model: ${model}` };
    } catch (err: any) {
      return { status: "UNREACHABLE", latencyMs: Date.now() - start, details: `Authentication error or service degraded: ${err.message}` };
    }
  }

  async discoverModels(): Promise<JumoModelDiscovery[]> {
    return JumoModelRegistry.getModelsByProvider("OPENAI");
  }


  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const start = Date.now();
    const vault = JumoSecretVault.getInstance();
    const key = vault.getOpenAIKey();
    if (!key) {
      return {
        text: "AI_EXECUTION_UNAVAILABLE: Cannot execute: JUMO_OPENAI_API_KEY is not configured.",
        modelId: request.modelId || "UNKNOWN",
        providerId: this.providerId,
        metadata: { error: "NOT_CONFIGURED" }
      };
    }

    const openai = new OpenAI({ apiKey: key });
    const model = request.modelId || vault.getOpenAIModel();
    const sysPrompt = request.systemPrompt || "You are JUMO GPT Sovereign Intelligence. Respond accurately and structured.";
    
    const messages: any[] = [{ role: "system", content: sysPrompt }];
    if (request.conversation) {
      messages.push(...request.conversation);
    }
    messages.push({ role: "user", content: request.message });

    try {
      const response = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: request.temperature ?? 0.2,
      });

      const text = response.choices[0]?.message?.content || "";
      const latencyMs = Date.now() - start;

      return {
        text,
        modelId: model,
        providerId: this.providerId,
        reasoning: true,
        usage: {
          inputTokens: response.usage?.prompt_tokens,
          outputTokens: response.usage?.completion_tokens,
          totalTokens: response.usage?.total_tokens
        },
        metadata: { latencyMs, finishReason: response.choices[0]?.finish_reason }
      };
    } catch (err: any) {
      throw new Error(`OpenAI Provider execution failed: [${err.code || "API_ERROR"}] ${err.message}`);
    }
  }
}

// ==========================================
// 2. GOOGLE GEMINI PROVIDER ADAPTER
// ==========================================
export class GeminiProvider implements JumoAIProvider {
  readonly providerId = "GEMINI";
  readonly displayName = "Google Gemini Sovereign Cloud";
  readonly local = false;

  async isAvailable(): Promise<boolean> {
    return !!JumoSecretVault.getInstance().getGeminiKey();
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE" | "NOT_CONFIGURED" | "UNREACHABLE" | "NOT_CONFIGURED" | "UNREACHABLE"; latencyMs?: number; details?: string }> {
    const vault = JumoSecretVault.getInstance();
    const key = vault.getGeminiKey();
    if (!key) {
      return { status: "NOT_CONFIGURED", details: "API Key (JUMO_GEMINI_API_KEY) is missing in system secret vault." };
    }
    const start = Date.now();
    try {
      const ai = new GoogleGenAI({ 
        apiKey: key,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });
      const modelName = vault.getGeminiModel();
      
      // Quick request to verify credentials validity
      await ai.models.generateContent({
        model: modelName,
        contents: [{ role: "user", parts: [{ text: "ping" }] }],
        config: { maxOutputTokens: 1 }
      });
      return { status: "HEALTHY", latencyMs: Date.now() - start, details: `Verified Google GenAI connectivity. Model: ${modelName}` };
    } catch (err: any) {
      return { status: "UNREACHABLE", latencyMs: Date.now() - start, details: `Credential degradation or network block: ${err.message}` };
    }
  }

  async discoverModels(): Promise<JumoModelDiscovery[]> {
    return JumoModelRegistry.getModelsByProvider("GEMINI");
  }


  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const start = Date.now();
    const vault = JumoSecretVault.getInstance();
    const key = vault.getGeminiKey();
    if (!key) {
      return {
        text: "AI_EXECUTION_UNAVAILABLE: Cannot execute: JUMO_GEMINI_API_KEY is not configured.",
        modelId: request.modelId || "UNKNOWN",
        providerId: this.providerId,
        metadata: { error: "NOT_CONFIGURED" }
      };
    }

    try {
      const ai = new GoogleGenAI({ 
        apiKey: key,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const modelName = request.modelId || vault.getGeminiModel();
      
      const contents: any[] = [];
      if (request.conversation) {
        request.conversation.forEach(c => {
          contents.push({
            role: c.role === "assistant" ? "model" : c.role,
            parts: [{ text: c.content }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: request.message }]
      });

      const result = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: request.systemPrompt || "You are JUMO GPT Sovereign Intelligence.",
          temperature: request.temperature ?? 0.2,
        }
      });

      const text = result.text || "";
      const latencyMs = Date.now() - start;

      return {
        text,
        modelId: modelName,
        providerId: this.providerId,
        reasoning: true,
        usage: {
          inputTokens: result.usageMetadata?.promptTokenCount,
          outputTokens: result.usageMetadata?.candidatesTokenCount,
          totalTokens: result.usageMetadata?.totalTokenCount
        },
        metadata: { latencyMs }
      };
    } catch (err: any) {
      throw new Error(`Gemini Provider execution failed: ${err.message}`);
    }
  }
}

// ==========================================
// 3. COPILOT COMPATIBLE PROVIDER ADAPTER
// ==========================================
export class CopilotProvider implements JumoAIProvider {
  readonly providerId = "COPILOT";
  readonly displayName = "Microsoft Copilot Enterprise";
  readonly local = false;

  async isAvailable(): Promise<boolean> {
    const vault = JumoSecretVault.getInstance();
    return !!vault.getCopilotProviderEndpoint() && !!vault.getCopilotKey();
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE" | "NOT_CONFIGURED" | "UNREACHABLE"; latencyMs?: number; details?: string }> {
    const vault = JumoSecretVault.getInstance();
    const endpoint = vault.getCopilotProviderEndpoint();
    const key = vault.getCopilotKey();
    if (!endpoint) {
      return { status: "UNAVAILABLE", details: "Copilot Endpoint (JUMO_COPILOT_PROVIDER_ENDPOINT) is not configured." };
    }
    if (!key) {
      return { status: "UNAVAILABLE", details: "Copilot Key (JUMO_COPILOT_API_KEY) is not configured in the vault." };
    }
    const start = Date.now();
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (key) {
        headers["Authorization"] = `Bearer ${key}`;
      }
      const res = await fetch(`${endpoint}/health`, { method: "GET", headers });
      if (res.ok) {
        return { status: "HEALTHY", latencyMs: Date.now() - start, details: "Copilot endpoint reachable and verified." };
      }
      return { status: "DEGRADED", latencyMs: Date.now() - start, details: `Copilot endpoint returned status: ${res.status}` };
    } catch (err: any) {
      return { status: "UNAVAILABLE", latencyMs: Date.now() - start, details: `Connection to Copilot endpoint failed: ${err.message}` };
    }
  }

  async discoverModels(): Promise<JumoModelDiscovery[]> {
    return JumoModelRegistry.getModelsByProvider("COPILOT");
  }


  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const start = Date.now();
    const vault = JumoSecretVault.getInstance();
    const endpoint = vault.getCopilotProviderEndpoint();
    const key = vault.getCopilotKey();
    if (!endpoint) {
      return {
        text: "AI_EXECUTION_UNAVAILABLE: Cannot execute: JUMO_COPILOT_PROVIDER_ENDPOINT is not configured.",
        modelId: request.modelId || "UNKNOWN",
        providerId: this.providerId,
        metadata: { error: "NOT_CONFIGURED" }
      };
    }

    try {
      const model = request.modelId || vault.getCopilotModel();
      const payload = {
        model,
        messages: [
          { role: "system", content: request.systemPrompt || "Sovereign Copilot Engine Active" },
          { role: "user", content: request.message }
        ],
        temperature: request.temperature ?? 0.2
      };

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (key) {
        headers["Authorization"] = `Bearer ${key}`;
      }

      const res = await fetch(`${endpoint}/chat/completions`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "";
      const latencyMs = Date.now() - start;

      return {
        text,
        modelId: model,
        providerId: this.providerId,
        reasoning: true,
        usage: {
          inputTokens: data.usage?.prompt_tokens || 0,
          outputTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0
        },
        metadata: { latencyMs }
      };
    } catch (err: any) {
      throw new Error(`Copilot Provider execution failed: ${err.message}`);
    }
  }
}

// ==========================================
// 4. JUMO LOCAL REASONING PROVIDER
// ==========================================
export class JumoLocalReasoningProvider implements JumoAIProvider {
  readonly providerId = "JUMO_LOCAL";
  readonly displayName = "JUMO Local Sovereign Engine";
  readonly local = true;

  private adapter = LocalInferenceAdapter.getInstance();
  private runtime = LocalInferenceRuntimeRegistry.getInstance().getEngine();

  async isAvailable(): Promise<boolean> {
    const health = await this.getHealth();
    return health.status === "HEALTHY";
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE" | "NOT_CONFIGURED" | "UNREACHABLE"; latencyMs?: number; details?: string }> {
    const healthRes = await this.adapter.checkInferenceHealth();
    const runtimeHealth = await this.runtime.healthCheck();
    return {
      status: (healthRes.status === "HEALTHY" || runtimeHealth.status === "HEALTHY") ? "HEALTHY" : "UNAVAILABLE",
      latencyMs: healthRes.latencyMs || runtimeHealth.latencyMs,
      details: `${healthRes.diagnosticReport} | Engine: ${runtimeHealth.details}`
    };
  }

  async discoverModels(): Promise<JumoModelDiscovery[]> {
    const adapterModels = await this.adapter.discoverModels();
    if (adapterModels.length > 0) {
      return adapterModels.map(m => ({
        modelId: m.modelId,
        displayName: m.modelName,
        contextLength: m.contextLength,
        capabilities: m.capabilities
      }));
    }
    return this.runtime.discoverModels();
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    const models = await this.discoverModels();
    const targetModel = request.modelId || (models[0] ? models[0].modelId : "omalla-llama-3-8b");

    // Primary execution route through LocalInferenceAdapter
    const adapterRes = await this.adapter.executeInference(
      targetModel,
      request.message,
      request.systemPrompt,
      request.temperature ?? 0.2
    );

    if (adapterRes.text && !adapterRes.text.includes("AIR_GAPPED_FAIL")) {
      return {
        text: adapterRes.text,
        modelId: targetModel,
        providerId: this.providerId,
        reasoning: true,
        usage: {
          totalTokens: adapterRes.tokens
        },
        metadata: {
          role: "LOCAL_SOVEREIGN_INFERENCE",
          sovereign: true,
          latencyMs: adapterRes.latencyMs,
          tokensUsed: adapterRes.tokens
        }
      };
    }

    // Fallback through JumoLocalInferenceEngine
    const res = await this.runtime.generate(request.message, {
      modelId: targetModel,
      temperature: request.temperature,
      systemPrompt: request.systemPrompt
    });

    if (!res.success) {
      throw new Error(res.error || "AI_EXECUTION_UNAVAILABLE: No local inference runtime is currently available.");
    }

    return {
      text: res.text,
      modelId: res.modelId || targetModel,
      providerId: this.providerId,
      reasoning: true,
      metadata: {
        role: "LOCAL_SOVEREIGN_INFERENCE",
        sovereign: true,
        latencyMs: res.latencyMs,
        tokensUsed: res.tokensUsed
      }
    };
  }
}

// ==========================================
// 5. FUTURE COMPATIBILITY ADAPTER
// ==========================================
export class FutureProviderAdapter implements JumoAIProvider {
  readonly providerId = "FUTURE_ADAPTER";
  readonly displayName = "Future Platform Expansion Adapter";
  readonly local = false;

  async isAvailable(): Promise<boolean> {
    return false; // Reserved for hot-pluggable on-premise additions
  }

  async getHealth(): Promise<{ status: "HEALTHY" | "DEGRADED" | "UNAVAILABLE" | "NOT_CONFIGURED" | "UNREACHABLE"; latencyMs?: number; details?: string }> {
    return { status: "UNAVAILABLE", details: "Compatibility slot unprovisioned. Standing by for schema." };
  }

  async discoverModels(): Promise<JumoModelDiscovery[]> {
    return [];
  }

  async generate(request: JumoAIRequest): Promise<JumoAIResponse> {
    throw new Error("Sovereign slots for future plug-in adapters are currently unprovisioned.");
  }
}
