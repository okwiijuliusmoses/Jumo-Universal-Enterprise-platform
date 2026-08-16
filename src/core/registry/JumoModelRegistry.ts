// JUMO UEOS — JUMO Provider-Neutral AI Model Registry
// Dynamic registry supporting Google Gemini (2.x, 3.x, 3.1, 3.5 Flash, 3.6 Flash, 3.7 Flash with multi-step coding/agent planning),
// OpenAI (GPT-4o, o1, o1-mini, o3-mini, GPT-4.5), Copilot/Azure, Anthropic (Claude 3.5/3.7 Sonnet), and Local Air-Gapped models.

export type AIModelProviderType = 'GEMINI' | 'OPENAI' | 'COPILOT' | 'ANTHROPIC' | 'JUMO_LOCAL' | 'SOVEREIGN_CUSTOM';

export interface JumoModelDefinition {
  modelId: string;
  displayName: string;
  providerId: AIModelProviderType;
  purpose: string;
  reasoning: boolean;
  coding: boolean;
  multimodal: boolean;
  toolCalling: boolean;
  structuredOutput: boolean;
  streaming: boolean;
  local: boolean;
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'PLANNED';
  contextLength: number;
  maxOutputTokens: number;
  costTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'ZERO_LOCAL';
  latencyTier: 'ULTRA_FAST' | 'FAST' | 'BALANCED' | 'DEEP_REASONING';
  recommendedTasks: string[];
  capabilities: string[];
}

export const CANONICAL_JUMO_MODELS: JumoModelDefinition[] = [
  // Google Gemini Generations
  {
    modelId: 'gemini-3.7-flash',
    displayName: 'Gemini 3.7 Flash (Hybrid Coding & Agentic Reasoning)',
    providerId: 'GEMINI',
    purpose: 'Google flagship hybrid model for multi-step agent planning, complex coding loops, tool execution, and architecture synthesis.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 1048576,
    maxOutputTokens: 65536,
    costTier: 'LOW',
    latencyTier: 'FAST',
    recommendedTasks: ['agent-workforce-orchestration', 'code-generation', 'architecture-synthesis', 'multi-step-planning'],
    capabilities: ['fast-agentic-loops', 'code-execution', 'multimodal', 'tool-calling', 'interactions-api']
  },
  {
    modelId: 'gemini-3.6-flash',
    displayName: 'Gemini 3.6 Flash (High-Velocity Agentic Execution)',
    providerId: 'GEMINI',
    purpose: 'Optimized for high-velocity coding, real-time agent loops, and fast task completion.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 1048576,
    maxOutputTokens: 8192,
    costTier: 'LOW',
    latencyTier: 'ULTRA_FAST',
    recommendedTasks: ['telemetry-analysis', 'routine-transformation', 'rapid-triage'],
    capabilities: ['speed', 'code-execution', 'high-concurrency']
  },
  {
    modelId: 'gemini-3.1-pro-preview',
    displayName: 'Gemini 3.1 Pro Preview (Architectural Reasoning)',
    providerId: 'GEMINI',
    purpose: 'High-capacity reasoning engine for deep invariant audits and massive context multi-domain specifications.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 2097152,
    maxOutputTokens: 65536,
    costTier: 'MEDIUM',
    latencyTier: 'DEEP_REASONING',
    recommendedTasks: ['architecture-invariants-audit', 'massive-spec-ingestion', 'formal-verification'],
    capabilities: ['deep-architectural-reasoning', 'complex-verification', 'software-engineering', 'broad-reasoning']
  },
  {
    modelId: 'gemini-2.5-pro',
    displayName: 'Gemini 2.5 Pro (Enterprise Workhorse)',
    providerId: 'GEMINI',
    purpose: 'Stable enterprise generation with high mathematical and compliance accuracy.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 2097152,
    maxOutputTokens: 8192,
    costTier: 'MEDIUM',
    latencyTier: 'BALANCED',
    recommendedTasks: ['compliance-audit', 'verification-testing', 'security-analysis'],
    capabilities: ['multimodal', 'reasoning', 'tool-calling']
  },

  // OpenAI / Sovereign Primary Intelligence
  {
    modelId: 'gpt-5.6-sol',
    displayName: 'OpenAI GPT-5.6 Sol (Primary JUMO System Intelligence)',
    providerId: 'OPENAI',
    purpose: 'Authoritative primary system intelligence for JUMO GPT orchestration, system administration, high-risk architecture governance, escalation, and policy interpretation.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 500000,
    maxOutputTokens: 100000,
    costTier: 'HIGH',
    latencyTier: 'DEEP_REASONING',
    recommendedTasks: [
      'system-administration',
      'architecture-governance',
      'high-risk-engineering-reasoning',
      'manufacturing-supervision',
      'workforce-supervision',
      'policy-interpretation',
      'escalation-handling'
    ],
    capabilities: [
      'primary-system-intelligence',
      'orchestration',
      'policy-governance',
      'high-risk-reasoning',
      'system-administration'
    ]
  },
  {
    modelId: 'codex-engineering-agent',
    displayName: 'Codex Engineering Engine (Repository & Code Transformation Specialist)',
    providerId: 'OPENAI',
    purpose: 'Engineering repository specialist for deep codebase synthesis, AST transformations, and formal refactoring.',
    reasoning: true,
    coding: true,
    multimodal: false,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 250000,
    maxOutputTokens: 65536,
    costTier: 'MEDIUM',
    latencyTier: 'FAST',
    recommendedTasks: ['codebase-transformation', 'refactoring', 'ast-generation'],
    capabilities: ['coding', 'repo-synthesis', 'tool-calling']
  },
  {
    modelId: 'gpt-4o',
    displayName: 'GPT-4o (Omni Enterprise Engine)',
    providerId: 'OPENAI',
    purpose: 'High-speed omni model for general multi-turn reasoning and tool invocation.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 128000,
    maxOutputTokens: 16384,
    costTier: 'MEDIUM',
    latencyTier: 'FAST',
    recommendedTasks: ['general-reasoning', 'api-contracts', 'conversational-intelligence'],
    capabilities: ['omni-multimodal', 'tool-calling', 'json-mode']
  },
  {
    modelId: 'o1',
    displayName: 'OpenAI o1 (Deep Formal Reasoning)',
    providerId: 'OPENAI',
    purpose: 'Autonomous chain-of-thought engine for hard mathematical logic, cryptographic proofs, and algorithm design.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: false,
    structuredOutput: true,
    streaming: false,
    local: false,
    status: 'AVAILABLE',
    contextLength: 200000,
    maxOutputTokens: 100000,
    costTier: 'HIGH',
    latencyTier: 'DEEP_REASONING',
    recommendedTasks: ['cryptographic-proofs', 'complex-compiler-design', 'security-boundary-analysis'],
    capabilities: ['deep-reasoning', 'formal-logic', 'math-olympiad-tier']
  },
  {
    modelId: 'o3-mini',
    displayName: 'OpenAI o3-mini (High-Velocity Reasoning & STEM)',
    providerId: 'OPENAI',
    purpose: 'Lightweight, ultra-fast reasoning model optimized for coding, mathematics, and science benchmarks.',
    reasoning: true,
    coding: true,
    multimodal: false,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 200000,
    maxOutputTokens: 100000,
    costTier: 'LOW',
    latencyTier: 'FAST',
    recommendedTasks: ['fast-stem-reasoning', 'code-refactoring', 'test-case-generation'],
    capabilities: ['fast-reasoning', 'coding', 'tool-calling']
  },

  // Microsoft Copilot / Azure Ecosystem
  {
    modelId: 'copilot-intelligent-mesh',
    displayName: 'Microsoft Copilot Intelligent Mesh (Azure Enterprise)',
    providerId: 'COPILOT',
    purpose: 'Enterprise productivity, Microsoft 365 / Azure integration, and cross-service orchestration.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 32000,
    maxOutputTokens: 4096,
    costTier: 'MEDIUM',
    latencyTier: 'FAST',
    recommendedTasks: ['azure-orchestration', 'enterprise-productivity', 'document-indexing'],
    capabilities: ['azure-integration', 'enterprise-mesh']
  },

  // Anthropic Family
  {
    modelId: 'claude-3-7-sonnet',
    displayName: 'Claude 3.7 Sonnet (Hybrid Reasoning & Coding)',
    providerId: 'ANTHROPIC',
    purpose: 'Hybrid reasoning and coding model with fine-grained thinking budgets and high nuance.',
    reasoning: true,
    coding: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    status: 'AVAILABLE',
    contextLength: 200000,
    maxOutputTokens: 8192,
    costTier: 'MEDIUM',
    latencyTier: 'FAST',
    recommendedTasks: ['nuanced-coding', 'large-codebase-refactoring', 'detailed-documentation'],
    capabilities: ['extended-thinking', 'coding', 'computer-use']
  },

  // JUMO Local Air-Gapped Sovereign Engine
  {
    modelId: 'jumo-sovereign-kernel-local',
    displayName: 'JUMO Sovereign Kernel Local (Air-Gapped Deterministic)',
    providerId: 'JUMO_LOCAL',
    purpose: 'Deterministic air-gapped zero-egress fallback running directly on memory-locked secure kernels.',
    reasoning: true,
    coding: false,
    multimodal: false,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: true,
    status: 'AVAILABLE',
    contextLength: 16000,
    maxOutputTokens: 4096,
    costTier: 'ZERO_LOCAL',
    latencyTier: 'ULTRA_FAST',
    recommendedTasks: ['air-gap-failover', 'deterministic-assertions', 'zero-leak-execution'],
    capabilities: ['air-gap', 'deterministic-rules', 'zero-leak', 'offline-guarantee']
  }
];

export class JumoModelRegistry {
  private static dynamicModels: Map<string, JumoModelDefinition> = new Map();

  static {
    CANONICAL_JUMO_MODELS.forEach(m => {
      this.dynamicModels.set(m.modelId, m);
    });
  }

  public static registerModel(model: JumoModelDefinition): void {
    this.dynamicModels.set(model.modelId, model);
  }

  public static getModel(modelId: string): JumoModelDefinition | undefined {
    return this.dynamicModels.get(modelId);
  }

  public static getAllModels(): JumoModelDefinition[] {
    return Array.from(this.dynamicModels.values());
  }

  public static getModelsByProvider(providerId: AIModelProviderType): JumoModelDefinition[] {
    return Array.from(this.dynamicModels.values()).filter(m => m.providerId === providerId);
  }

  public static getDefaultModelForTask(taskType: 'FAST' | 'DEEP_REASONING' | 'CODING' | 'AIR_GAP' = 'FAST'): string {
    switch (taskType) {
      case 'AIR_GAP':
        return 'jumo-sovereign-kernel-local';
      case 'DEEP_REASONING':
        return 'gemini-3.7-flash';
      case 'CODING':
        return 'gemini-3.7-flash';
      case 'FAST':
      default:
        return 'gemini-3.6-flash';
    }
  }
}
