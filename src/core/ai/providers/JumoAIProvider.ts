export interface JumoAIRequest {
  message: string;
  systemPrompt?: string;
  context?: Record<string, unknown>;
  conversation?: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  reasoningEffort?: 'low' | 'medium' | 'high' | 'max';
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
}

export interface JumoAIProvider {
  readonly providerId: string;
  readonly displayName: string;
  readonly local: boolean;

  isAvailable(): Promise<boolean>;

  generate(
    request: JumoAIRequest
  ): Promise<JumoAIResponse>;
}
