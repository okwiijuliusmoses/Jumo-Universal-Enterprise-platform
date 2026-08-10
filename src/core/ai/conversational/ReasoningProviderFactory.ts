import { OpenAIReasoningProvider } from './OpenAIReasoningProvider';

export function createReasoningProvider() {
  const provider =
    process.env.JUMO_AI_PROVIDER?.trim().toLowerCase() || 'openai';

  switch (provider) {
    case 'openai':
      return new OpenAIReasoningProvider();

    default:
      throw new Error(
        `Unsupported JUMO AI provider: ${provider}`
      );
  }
}
