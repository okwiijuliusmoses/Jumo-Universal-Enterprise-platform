// JUMO UEOS — JUMO Provider-Neutral AI Model Registry
// Dynamic registry supporting JUMO GPT-5.6, OpenAI, Codex, Google Gemini, Microsoft Copilot, Anthropic Claude Code, JUMO Local (Omalla), and Other Providers.

export type AIModelProviderType = 
  | 'JUMO_GPT_5_6'
  | 'OPENAI'
  | 'CODEX'
  | 'GEMINI'
  | 'COPILOT'
  | 'CLAUDE_CODE'
  | 'JUMO_LOCAL'
  | 'OTHER';

export interface JumoModelDefinition {
  modelId: string;
  displayName: string;
  providerId: AIModelProviderType;
  purpose: string;
  
  // Specific capabilities
  reasoning: boolean;
  coding: boolean;
  architecture: boolean;
  analysis: boolean;
  multimodal: boolean;
  toolCalling: boolean;
  structuredOutput: boolean;
  streaming: boolean;
  
  // Deployment & Infrastructure
  local: boolean;
  deploymentType: 'LOCAL' | 'CLOUD' | 'HYBRID';
  securityClassification: 'UNCLASSIFIED' | 'RESTRICTED' | 'SECRET' | 'TOP_SECRET';
  
  // Lifecyle State
  status: 'DISCOVERED' | 'REGISTERED' | 'CONFIGURED' | 'AVAILABLE' | 'HEALTHY' | 'IN_USE' | 'DEGRADED' | 'UNAVAILABLE' | 'FAILED';
  
  // Performance & Capacity
  contextLength: number; // context capacity
  maxOutputTokens: number;
  costTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'ZERO_LOCAL';
  latencyTier: 'ULTRA_FAST' | 'FAST' | 'BALANCED' | 'DEEP_REASONING';
  
  // Metadata & Diagnostics
  recommendedTasks: string[];
  capabilities: string[];
  parameterSize?: string;
  quantization?: string;
  digest?: string;
}

export const CANONICAL_JUMO_MODELS: JumoModelDefinition[] = [
  // 1. JUMO GPT-5.6
  {
    modelId: 'jumo-gpt-5.6-sol',
    displayName: 'JUMO GPT-5.6 Sol (Sovereign Core Reasoning Engine)',
    providerId: 'JUMO_GPT_5_6',
    purpose: 'Flagship JUMO reasoning intelligence for supreme administration, compliance, policy interpretation, and governance.',
    reasoning: true,
    coding: true,
    architecture: true,
    analysis: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    deploymentType: 'HYBRID',
    securityClassification: 'TOP_SECRET',
    status: 'AVAILABLE' as any, // fallback to healthy in usage
    contextLength: 1000000,
    maxOutputTokens: 65536,
    costTier: 'HIGH',
    latencyTier: 'DEEP_REASONING',
    recommendedTasks: ['system-administration', 'architecture-governance', 'policy-interpretation', 'escalation-handling'],
    capabilities: ['reasoning', 'policy-compliance', 'governance', 'complex-coordination']
  },

  // 2. OpenAI
  {
    modelId: 'gpt-4o',
    displayName: 'GPT-4o (OpenAI Omni Engine)',
    providerId: 'OPENAI',
    purpose: 'Balanced enterprise omni model for fast multi-turn interaction, document search, and structured analysis.',
    reasoning: true,
    coding: true,
    architecture: true,
    analysis: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'SECRET',
    status: 'AVAILABLE' as any,
    contextLength: 128000,
    maxOutputTokens: 16384,
    costTier: 'MEDIUM',
    latencyTier: 'FAST',
    recommendedTasks: ['general-reasoning', 'document-indexing', 'api-contracts'],
    capabilities: ['speed', 'multimodal', 'tool-calling', 'json-mode']
  },
  {
    modelId: 'o1',
    displayName: 'OpenAI o1 (Formal Multi-Step Reasoner)',
    providerId: 'OPENAI',
    purpose: 'Deep chain-of-thought engine for math modeling, code verification, and security risk auditing.',
    reasoning: true,
    coding: true,
    architecture: true,
    analysis: true,
    multimodal: true,
    toolCalling: false,
    structuredOutput: true,
    streaming: false,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'TOP_SECRET',
    status: 'AVAILABLE' as any,
    contextLength: 200000,
    maxOutputTokens: 100000,
    costTier: 'HIGH',
    latencyTier: 'DEEP_REASONING',
    recommendedTasks: ['formal-proofs', 'algorithm-design', 'vulnerability-audit'],
    capabilities: ['deep-reasoning', 'formal-logic', 'complex-verification']
  },
  {
    modelId: 'o3-mini',
    displayName: 'OpenAI o3-mini (High-Velocity Reasoner)',
    providerId: 'OPENAI',
    purpose: 'Fast logical model designed for software engineering loops and high-throughput STEM calculations.',
    reasoning: true,
    coding: true,
    architecture: false,
    analysis: true,
    multimodal: false,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'SECRET',
    status: 'AVAILABLE' as any,
    contextLength: 200000,
    maxOutputTokens: 100000,
    costTier: 'LOW',
    latencyTier: 'FAST',
    recommendedTasks: ['code-generation', 'refactoring', 'test-generation'],
    capabilities: ['reasoning', 'coding', 'speed']
  },

  // 3. Codex
  {
    modelId: 'codex-engineering-agent',
    displayName: 'Codex Engineering Agent (AST Specialist)',
    providerId: 'CODEX',
    purpose: 'Low-level code transformation specialist focusing on syntax parsing, compilers, and database script assembly.',
    reasoning: false,
    coding: true,
    architecture: false,
    analysis: true,
    multimodal: false,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'RESTRICTED',
    status: 'AVAILABLE' as any,
    contextLength: 64000,
    maxOutputTokens: 16384,
    costTier: 'MEDIUM',
    latencyTier: 'FAST',
    recommendedTasks: ['code-synthesis', 'ast-refactoring', 'sql-generation'],
    capabilities: ['coding', 'ast-parsing', 'formatting']
  },

  // 4. Google Gemini
  {
    modelId: 'gemini-3.7-flash',
    displayName: 'Gemini 3.7 Flash (Agentic Reasoning & Tool Orchestrator)',
    providerId: 'GEMINI',
    purpose: 'Google flagship hybrid model for autonomous agent loops, code compilation, and full-stack integration.',
    reasoning: true,
    coding: true,
    architecture: true,
    analysis: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'SECRET',
    status: 'AVAILABLE' as any,
    contextLength: 1048576,
    maxOutputTokens: 65536,
    costTier: 'LOW',
    latencyTier: 'FAST',
    recommendedTasks: ['agentic-workflows', 'compilation-supervision', 'architecture-synthesis'],
    capabilities: ['interactions-api', 'tool-calling', 'code-execution', 'speed']
  },
  {
    modelId: 'gemini-3.1-pro-preview',
    displayName: 'Gemini 3.1 Pro Preview (Massive Invariant Audit)',
    providerId: 'GEMINI',
    purpose: 'Deep multi-domain context processing for specification auditing and security perimeter tracing.',
    reasoning: true,
    coding: true,
    architecture: true,
    analysis: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'TOP_SECRET',
    status: 'AVAILABLE' as any,
    contextLength: 2097152,
    maxOutputTokens: 65536,
    costTier: 'MEDIUM',
    latencyTier: 'DEEP_REASONING',
    recommendedTasks: ['broad-auditing', 'contract-verification', 'multi-file-analysis'],
    capabilities: ['long-context', 'reasoning', 'multimodal', 'security-tracing']
  },

  // 5. Microsoft Copilot
  {
    modelId: 'copilot-intelligent-mesh',
    displayName: 'Microsoft Copilot Intelligent Mesh (Enterprise Integration)',
    providerId: 'COPILOT',
    purpose: 'Productivity alignment, Microsoft Azure resource modeling, and corporate dependency coordination.',
    reasoning: true,
    coding: true,
    architecture: false,
    analysis: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'RESTRICTED',
    status: 'AVAILABLE' as any,
    contextLength: 32000,
    maxOutputTokens: 8192,
    costTier: 'MEDIUM',
    latencyTier: 'FAST',
    recommendedTasks: ['dependency-coordination', 'cloud-mapping', 'executive-reports'],
    capabilities: ['azure-integration', 'structured-output']
  },

  // 6. Anthropic Claude Code
  {
    modelId: 'claude-code-sonnet',
    displayName: 'Claude Code Sonnet (Advanced Repository Synthesis)',
    providerId: 'CLAUDE_CODE',
    purpose: 'Repository specialist for generating responsive UI components, test suites, and handling semantic diff refactoring.',
    reasoning: true,
    coding: true,
    architecture: true,
    analysis: true,
    multimodal: true,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'SECRET',
    status: 'AVAILABLE' as any,
    contextLength: 200000,
    maxOutputTokens: 8192,
    costTier: 'MEDIUM',
    latencyTier: 'FAST',
    recommendedTasks: ['ui-generation', 'unit-testing', 'diff-refactoring', 'component-assembly'],
    capabilities: ['coding', 'computer-use', 'tool-calling']
  },

  // 7. JUMO Local
  {
    modelId: 'jumo-sovereign-kernel-local',
    displayName: 'JUMO Sovereign Kernel Local (Air-Gapped Core)',
    providerId: 'JUMO_LOCAL',
    purpose: 'Air-gapped secure fallback executing in host server kernel memory. Guarantees 100% security classification compliance.',
    reasoning: true,
    coding: true,
    architecture: true,
    analysis: true,
    multimodal: false,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: true,
    deploymentType: 'LOCAL',
    securityClassification: 'TOP_SECRET',
    status: 'AVAILABLE' as any,
    contextLength: 32000,
    maxOutputTokens: 8192,
    costTier: 'ZERO_LOCAL',
    latencyTier: 'ULTRA_FAST',
    recommendedTasks: ['secure-fallback', 'confidential-verification', 'offline-audit'],
    capabilities: ['air-gapped', 'zero-leak', 'local-inference']
  },
  {
    modelId: 'llama3-local-8b',
    displayName: 'Llama-3 Local 8B (Omalla/Olla Discovered)',
    providerId: 'JUMO_LOCAL',
    purpose: 'Standard discovered local model for basic user questions, routine log analysis, and system checks.',
    reasoning: true,
    coding: true,
    architecture: false,
    analysis: true,
    multimodal: false,
    toolCalling: false,
    structuredOutput: true,
    streaming: true,
    local: true,
    deploymentType: 'LOCAL',
    securityClassification: 'SECRET',
    status: 'REGISTERED' as any,
    contextLength: 8192,
    maxOutputTokens: 4096,
    costTier: 'ZERO_LOCAL',
    latencyTier: 'FAST',
    recommendedTasks: ['log-analysis', 'routine-checks', 'help-utilities'],
    capabilities: ['local-inference', 'chat']
  },
  {
    modelId: 'mistral-local-7b',
    displayName: 'Mistral Local 7B (Omalla/Olla Discovered)',
    providerId: 'JUMO_LOCAL',
    purpose: 'Highly compact discovered model optimized for fast responses and minor task execution.',
    reasoning: true,
    coding: true,
    architecture: false,
    analysis: true,
    multimodal: false,
    toolCalling: true,
    structuredOutput: true,
    streaming: true,
    local: true,
    deploymentType: 'LOCAL',
    securityClassification: 'SECRET',
    status: 'REGISTERED' as any,
    contextLength: 16384,
    maxOutputTokens: 4096,
    costTier: 'ZERO_LOCAL',
    latencyTier: 'FAST',
    recommendedTasks: ['rapid-inference', 'command-synthesizer'],
    capabilities: ['local-inference', 'tool-calling']
  },

  // 8. Other Providers
  {
    modelId: 'custom-neural-node',
    displayName: 'Custom Neural Node (Extensible Routing Endpoint)',
    providerId: 'OTHER',
    purpose: 'User-configured custom neural node or external endpoint router.',
    reasoning: true,
    coding: false,
    architecture: false,
    analysis: true,
    multimodal: false,
    toolCalling: false,
    structuredOutput: false,
    streaming: true,
    local: false,
    deploymentType: 'CLOUD',
    securityClassification: 'UNCLASSIFIED',
    status: 'REGISTERED' as any,
    contextLength: 8192,
    maxOutputTokens: 2048,
    costTier: 'LOW',
    latencyTier: 'FAST',
    recommendedTasks: ['generic-routing', 'text-summarization'],
    capabilities: ['summarization', 'chat']
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
    this.dynamicModels.set(model.modelId, {
      ...model,
      // Default to registered/available if unspecified
      status: model.status || 'AVAILABLE' as any,
      deploymentType: model.deploymentType || (model.local ? 'LOCAL' : 'CLOUD'),
      securityClassification: model.securityClassification || 'SECRET'
    });
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

  /**
   * Resolves compatible models based on capability constraints, provider policies, and availability.
   * Part of the Agent Requirement -> Capability Resolver pattern.
   */
  public static resolveCompatibleModels(requirements: {
    reasoning?: boolean;
    coding?: boolean;
    architecture?: boolean;
    analysis?: boolean;
    multimodal?: boolean;
    toolCalling?: boolean;
    requireLocal?: boolean;
    securityClassification?: 'UNCLASSIFIED' | 'RESTRICTED' | 'SECRET' | 'TOP_SECRET';
  }): JumoModelDefinition[] {
    let list = Array.from(this.dynamicModels.values());

    if (requirements.reasoning) list = list.filter(m => m.reasoning);
    if (requirements.coding) list = list.filter(m => m.coding);
    if (requirements.architecture) list = list.filter(m => m.architecture);
    if (requirements.analysis) list = list.filter(m => m.analysis);
    if (requirements.multimodal) list = list.filter(m => m.multimodal);
    if (requirements.toolCalling) list = list.filter(m => m.toolCalling);
    if (requirements.requireLocal) list = list.filter(m => m.local);

    // Filter by security classification if provided
    if (requirements.securityClassification) {
      const order = ['UNCLASSIFIED', 'RESTRICTED', 'SECRET', 'TOP_SECRET'];
      const targetIdx = order.indexOf(requirements.securityClassification);
      list = list.filter(m => {
        const modelIdx = order.indexOf(m.securityClassification);
        return modelIdx >= targetIdx; // Model has equal or higher classification capability
      });
    }

    return list;
  }

  public static getDefaultModelForTask(taskType: 'FAST' | 'DEEP_REASONING' | 'CODING' | 'AIR_GAP' = 'FAST'): string {
    switch (taskType) {
      case 'AIR_GAP':
        return 'jumo-sovereign-kernel-local';
      case 'DEEP_REASONING':
        return 'jumo-gpt-5.6-sol';
      case 'CODING':
        return 'claude-code-sonnet';
      case 'FAST':
      default:
        return 'gemini-3.7-flash';
    }
  }
}
