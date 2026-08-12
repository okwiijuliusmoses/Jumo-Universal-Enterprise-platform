export interface JumoModelDefinition {
  modelId: string;
  displayName: string;
  purpose: string;
  reasoning: boolean;
  local: boolean;
  providerId: string;
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'PLANNED';
  contextLength?: number;
  capabilities?: string[];
}

export const JUMO_MODELS: JumoModelDefinition[] = [
  {
    modelId: 'gemini-3.6-flash',
    displayName: 'Gemini 3.6 Flash (Fast Agentic Execution)',
    purpose: 'Optimized for high-velocity coding, agentic loops, and rapid task completion.',
    reasoning: true,
    local: false,
    providerId: 'GEMINI',
    status: 'AVAILABLE',
    contextLength: 1048576,
    capabilities: ['fast-agentic-loops', 'code-execution', 'multimodal', 'high-concurrency']
  },
  {
    modelId: 'gemini-3.1-pro-preview',
    displayName: 'Gemini 3.1 Pro Preview (Architectural Reasoning)',
    purpose: 'Suited to complex architectural verification, broad reasoning, and software engineering.',
    reasoning: true,
    local: false,
    providerId: 'GEMINI',
    status: 'AVAILABLE',
    contextLength: 2097152,
    capabilities: ['deep-architectural-reasoning', 'complex-verification', 'software-engineering', 'broad-reasoning']
  },
  {
    modelId: 'gpt-5.6-sol',
    displayName: 'GPT-5.6 Sol (Enterprise Flagship)',
    purpose: 'Complex enterprise reasoning, formal logic audits, and multi-turn architectural planning.',
    reasoning: true,
    local: false,
    providerId: 'OPENAI',
    status: 'AVAILABLE',
    contextLength: 128000,
    capabilities: ['enterprise-reasoning', 'formal-verification', 'multi-turn-planning']
  },
  {
    modelId: 'copilot-intelligent-mesh',
    displayName: 'Copilot Intelligent Mesh (Azure)',
    purpose: 'Enterprise productivity and cross-service orchestration.',
    reasoning: true,
    local: false,
    providerId: 'COPILOT',
    status: 'AVAILABLE',
    contextLength: 32000,
    capabilities: ['azure-integration', 'enterprise-copilot']
  },
  {
    modelId: 'jumo-sovereign-kernel-local',
    displayName: 'JUMO Sovereign Kernel Local (Air-Gapped)',
    purpose: 'Deterministic air-gapped fallback for zero-leak local processing.',
    reasoning: true,
    local: true,
    providerId: 'JUMO_LOCAL',
    status: 'AVAILABLE',
    contextLength: 16000,
    capabilities: ['air-gap', 'deterministic-rules', 'zero-leak']
  }
];

export class JumoModelRegistry {
  public static getModel(modelId: string): JumoModelDefinition | undefined {
    return JUMO_MODELS.find(m => m.modelId === modelId);
  }

  public static getModelsByProvider(providerId: string): JumoModelDefinition[] {
    return JUMO_MODELS.filter(m => m.providerId === providerId);
  }

  public static getDefaultModelForTask(taskType: 'FAST' | 'DEEP_REASONING' | 'AIR_GAP' = 'FAST'): string {
    if (taskType === 'AIR_GAP') return 'jumo-sovereign-kernel-local';
    return 'gemini-3.6-flash';
  }
}

