import {
  GeneralPurposeReasoningAI,
  type ReasoningContext,
  type ReasoningMode,
  type ReasoningResponse,
} from './GeneralPurposeReasoningAI';

import { createReasoningProvider } from './ReasoningProviderFactory';

export interface JumoConversationRequest {
  message: string;
  mode?: ReasoningMode;
  context?: ReasoningContext;
}

export class JumoConversationalReasoningService {
  private readonly reasoningAI: GeneralPurposeReasoningAI;

  constructor() {
    this.reasoningAI = new GeneralPurposeReasoningAI(
      createReasoningProvider()
    );
  }

  async reason(
    request: JumoConversationRequest
  ): Promise<ReasoningResponse> {
    return this.reasoningAI.process({
      message: request.message,
      mode: request.mode,
      context: request.context,
    });
  }
}

export const jumoConversationalReasoning =
  new JumoConversationalReasoningService();
