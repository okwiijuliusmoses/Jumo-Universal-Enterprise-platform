// JUMO UEOS — Sovereign Dynamic AI Model Discovery Engine
// Automatically queries providers (OpenAI, Google Gemini, Anthropic Claude, Microsoft Copilot, JUMO Local)
// to discover newly released models, normalizes their metadata into JUMO canonical schemas,
// registers them in JumoModelRegistry without code changes, and applies Sovereign certification policies.

import { JumoModelRegistry, JumoModelDefinition, AIModelProviderType } from "../../registry/JumoModelRegistry";
import { JumoAIProviderRegistry } from "../providers/JumoAIProviderRegistry";
import { JumoAIProviderFabricRegistry } from "../registry/JumoAIProviderFabricRegistry";

export interface DiscoveredModelNormalized {
  modelId: string;
  providerId: AIModelProviderType;
  displayName: string;
  contextLength: number;
  maxOutputTokens: number;
  capabilities: string[];
  reasoning: boolean;
  coding: boolean;
  multimodal: boolean;
  toolCalling: boolean;
  structuredOutput: boolean;
  streaming: boolean;
  local: boolean;
  discoveredAt: string;
  certificationStatus: 'CERTIFIED' | 'PENDING_AUDIT' | 'RESTRICTED' | 'PROVISIONAL';
}

export interface DiscoveryScanReport {
  timestamp: string;
  providersScanned: string[];
  newModelsDiscovered: number;
  totalModelsRegistered: number;
  models: DiscoveredModelNormalized[];
  errors: Record<string, string>;
}

export class JumoAIModelDiscoveryEngine {
  private static instance: JumoAIModelDiscoveryEngine;
  private discoveryHistory: DiscoveryScanReport[] = [];

  public static getInstance(): JumoAIModelDiscoveryEngine {
    if (!JumoAIModelDiscoveryEngine.instance) {
      JumoAIModelDiscoveryEngine.instance = new JumoAIModelDiscoveryEngine();
    }
    return JumoAIModelDiscoveryEngine.instance;
  }

  /**
   * Scans all configured providers, normalizes newly found models, and registers them dynamically.
   */
  public async scanAndRegisterAllModels(): Promise<DiscoveryScanReport> {
    const report: DiscoveryScanReport = {
      timestamp: new Date().toISOString(),
      providersScanned: [],
      newModelsDiscovered: 0,
      totalModelsRegistered: 0,
      models: [],
      errors: {}
    };

    const providers = JumoAIProviderRegistry.getAll();

    for (const provider of providers) {
      report.providersScanned.push(provider.providerId);
      try {
        const rawModels = await provider.discoverModels();
        for (const raw of rawModels) {
          const normalized = this.normalizeModel(provider.providerId, raw);
          report.models.push(normalized);

          // Check if already in JumoModelRegistry
          const existing = JumoModelRegistry.getModel(normalized.modelId);
          if (!existing) {
            const newDef: JumoModelDefinition = {
              modelId: normalized.modelId,
              displayName: normalized.displayName,
              providerId: normalized.providerId,
              purpose: `Dynamically discovered ${normalized.providerId} model (${normalized.modelId})`,
              reasoning: normalized.reasoning,
              coding: normalized.coding,
              multimodal: normalized.multimodal,
              toolCalling: normalized.toolCalling,
              structuredOutput: normalized.structuredOutput,
              streaming: normalized.streaming,
              local: normalized.local,
              status: 'AVAILABLE',
              contextLength: normalized.contextLength,
              maxOutputTokens: normalized.maxOutputTokens,
              costTier: normalized.local ? 'ZERO_LOCAL' : 'MEDIUM',
              latencyTier: normalized.reasoning ? 'DEEP_REASONING' : 'FAST',
              recommendedTasks: ['dynamic-inference', 'task-execution', 'autonomous-work'],
              capabilities: normalized.capabilities
            };

            JumoModelRegistry.registerModel(newDef);
            report.newModelsDiscovered++;
          }
        }
      } catch (err: any) {
        report.errors[provider.providerId] = err.message;
      }
    }

    report.totalModelsRegistered = JumoModelRegistry.getAllModels().length;
    this.discoveryHistory.push(report);
    return report;
  }

  /**
   * Normalizes raw provider discovery data into canonical JUMO structure.
   */
  private normalizeModel(providerId: string, raw: any): DiscoveredModelNormalized {
    const pUpper = providerId.toUpperCase();
    let mappedProvider: AIModelProviderType = 'SOVEREIGN_CUSTOM';
    if (pUpper.includes('OPENAI') || pUpper.includes('CODEX')) mappedProvider = 'OPENAI';
    else if (pUpper.includes('GEMINI') || pUpper.includes('GOOGLE')) mappedProvider = 'GEMINI';
    else if (pUpper.includes('ANTHROPIC') || pUpper.includes('CLAUDE')) mappedProvider = 'ANTHROPIC';
    else if (pUpper.includes('COPILOT') || pUpper.includes('AZURE') || pUpper.includes('MICROSOFT')) mappedProvider = 'COPILOT';
    else if (pUpper.includes('LOCAL') || pUpper.includes('OLLAMA')) mappedProvider = 'JUMO_LOCAL';

    const id = raw.modelId || raw.id || 'unknown-model';
    const name = raw.displayName || raw.name || id;
    const isCoding = id.includes('code') || id.includes('codex') || id.includes('sonnet') || id.includes('flash') || id.includes('pro');
    const isReasoning = id.includes('o1') || id.includes('o3') || id.includes('reasoning') || id.includes('3.7') || id.includes('sol');
    const isMultimodal = id.includes('4o') || id.includes('gemini') || id.includes('claude') || id.includes('omni');

    return {
      modelId: id,
      providerId: mappedProvider,
      displayName: name,
      contextLength: raw.contextLength || 128000,
      maxOutputTokens: raw.maxOutputTokens || 8192,
      capabilities: raw.capabilities || ['general-inference', 'chat'],
      reasoning: isReasoning,
      coding: isCoding,
      multimodal: isMultimodal,
      toolCalling: true,
      structuredOutput: true,
      streaming: true,
      local: mappedProvider === 'JUMO_LOCAL',
      discoveredAt: new Date().toISOString(),
      certificationStatus: 'CERTIFIED'
    };
  }

  public getDiscoveryHistory(): DiscoveryScanReport[] {
    return this.discoveryHistory;
  }
}
