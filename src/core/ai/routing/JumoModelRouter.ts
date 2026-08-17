// JUMO UEOS — JUMO Intelligent Model Router
// Routes tasks based on Task Classification -> Required Capability -> Risk -> Context Size -> Latency Requirement -> Cost Policy -> Available Models

import { JumoModelRegistry, JumoModelDefinition, AIModelProviderType } from "../../registry/JumoModelRegistry";
import { JumoSecretVault } from "../../security/JumoSecretVault";

export type TaskClassification =
  | 'ARCHITECTURE_RECONCILIATION'
  | 'LARGE_REPO_AUDIT'
  | 'ROUTINE_CODE_TRANSFORMATION'
  | 'TELEMETRY_SUMMARIZATION'
  | 'SECURITY_CRITICAL_DECISION'
  | 'PRODUCTION_MUTATION'
  | 'FORMAL_VERIFICATION'
  | 'CONVERSATIONAL_ASSISTANCE';

export interface ModelRoutingRequest {
  taskType: TaskClassification;
  prompt: string;
  contextSizeEstimateTokens?: number;
  requiresReasoning?: boolean;
  requiresCoding?: boolean;
  requiresTools?: boolean;
  costSensitivity?: 'LOW_COST' | 'BALANCED' | 'MAX_QUALITY';
  latencyPreference?: 'LOWEST_LATENCY' | 'BALANCED' | 'THOROUGH';
  isAirGapped?: boolean;
  humanApprovalRequired?: boolean;
}

export interface ModelRoutingDecision {
  selectedModel: JumoModelDefinition;
  provider: AIModelProviderType;
  confidenceScore: number;
  routingReason: string;
  fallbackModel?: JumoModelDefinition;
  humanApprovalGate: boolean;
}

export class JumoModelRouter {
  private static instance: JumoModelRouter;

  private constructor() {}

  public static getInstance(): JumoModelRouter {
    if (!JumoModelRouter.instance) {
      JumoModelRouter.instance = new JumoModelRouter();
    }
    return JumoModelRouter.instance;
  }

  public routeTask(request: ModelRoutingRequest): ModelRoutingDecision {
    const vault = JumoSecretVault.getInstance();
    const mode = vault.getAIProviderMode(); // LIVE | HYBRID | AIR-GAP

    // 1. Air-gap override
    if (request.isAirGapped || mode === 'AIR-GAP') {
      const localModel = JumoModelRegistry.getModel('jumo-sovereign-kernel-local')!;
      return {
        selectedModel: localModel,
        provider: 'JUMO_LOCAL',
        confidenceScore: 1.0,
        routingReason: 'Air-gapped policy active: routed strictly to local memory-isolated sovereign kernel.',
        humanApprovalGate: false
      };
    }

    const availableModels = JumoModelRegistry.getAllModels().filter(m => m.status === 'AVAILABLE');

    // 2. Security Critical, Production Mutation, System Administration -> GPT-5.6 Sol primary
    if (request.taskType === 'SECURITY_CRITICAL_DECISION' || request.taskType === 'PRODUCTION_MUTATION') {
      const primaryAdminModel = JumoModelRegistry.getModel('gpt-5.6-sol') || JumoModelRegistry.getModel('o1') || availableModels[0];
      return {
        selectedModel: primaryAdminModel,
        provider: primaryAdminModel.providerId,
        confidenceScore: 0.99,
        routingReason: 'Security-critical / Production mutation task routed to OpenAI GPT-5.6 Sol (Primary System Intelligence) with mandatory human approval gate.',
        fallbackModel: JumoModelRegistry.getModel('gemini-3.7-flash'),
        humanApprovalGate: true
      };
    }

    // 3. Architecture Reconciliation & Formal Verification -> GPT-5.6 Sol + Gemini 3.7 Flash Specialist
    if (request.taskType === 'ARCHITECTURE_RECONCILIATION' || request.taskType === 'FORMAL_VERIFICATION') {
      const primaryArchModel = JumoModelRegistry.getModel('gpt-5.6-sol') || JumoModelRegistry.getModel('gemini-3.7-flash') || availableModels[0];
      return {
        selectedModel: primaryArchModel,
        provider: primaryArchModel.providerId,
        confidenceScore: 0.98,
        routingReason: 'Complex multi-turn architectural reconciliation routed to OpenAI GPT-5.6 Sol primary with Gemini 3.7 Flash specialist synthesis.',
        fallbackModel: JumoModelRegistry.getModel('gemini-3.7-flash'),
        humanApprovalGate: false
      };
    }

    // 4. Large repo audit & Coding Specialist (Gemini 3.7 Flash / Codex)
    if (request.taskType === 'LARGE_REPO_AUDIT' || (request.contextSizeEstimateTokens && request.contextSizeEstimateTokens > 100000)) {
      const specialistModel = JumoModelRegistry.getModel('gemini-3.7-flash') || JumoModelRegistry.getModel('gemini-3.1-pro-preview') || availableModels[0];
      return {
        selectedModel: specialistModel,
        provider: specialistModel.providerId,
        confidenceScore: 0.97,
        routingReason: 'Large context codebase audit routed to Gemini 3.7 Flash coding & multi-step specialist.',
        fallbackModel: JumoModelRegistry.getModel('codex-engineering-agent'),
        humanApprovalGate: false
      };
    }

    // 5. Routine code transformation -> Codex / Gemini 3.7 Flash
    if (request.taskType === 'ROUTINE_CODE_TRANSFORMATION') {
      const codingModel = JumoModelRegistry.getModel('codex-engineering-agent') || JumoModelRegistry.getModel('gemini-3.7-flash') || availableModels[0];
      return {
        selectedModel: codingModel,
        provider: codingModel.providerId,
        confidenceScore: 0.96,
        routingReason: 'Routine code transformation routed to Codex Engineering specialist.',
        fallbackModel: JumoModelRegistry.getModel('gemini-3.6-flash'),
        humanApprovalGate: false
      };
    }

    // 6. Telemetry Summarization (Cost & speed optimized)
    if (request.taskType === 'TELEMETRY_SUMMARIZATION') {
      const fastModel = JumoModelRegistry.getModel('gemini-3.6-flash') || JumoModelRegistry.getModel('gpt-4o') || availableModels[0];
      return {
        selectedModel: fastModel,
        provider: fastModel.providerId,
        confidenceScore: 0.94,
        routingReason: 'High-frequency telemetry analysis routed to ultra-fast low-cost model.',
        fallbackModel: JumoModelRegistry.getModel('jumo-sovereign-kernel-local'),
        humanApprovalGate: false
      };
    }

    // Default conversational assistance -> GPT-5.6 Sol primary
    const defaultModel = JumoModelRegistry.getModel('gpt-5.6-sol') || JumoModelRegistry.getModel('gpt-4o') || availableModels[0];
    return {
      selectedModel: defaultModel,
      provider: defaultModel.providerId,
      confidenceScore: 0.95,
      routingReason: 'General conversational intelligence routed to primary JUMO GPT system intelligence (GPT-5.6 Sol).',
      fallbackModel: JumoModelRegistry.getModel('gemini-3.7-flash'),
      humanApprovalGate: false
    };
  }
}
