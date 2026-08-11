import { OpenAIReasoningProvider } from './OpenAIReasoningProvider';
import { LocalHybridReasoningProvider } from './LocalHybridReasoningProvider';

export function createReasoningProvider() {
  const configuredProvider =
    process.env.JUMO_AI_PROVIDER?.trim().toLowerCase();

  /*
   * External AI providers are optional.
   *
   * UEOS must remain operational when an external provider has not
   * been configured. This preserves the Digital Hybrid architecture:
   *
   *   UEOS Runtime
   *        |
   *   AI Provider Factory
   *      /       \
   * external     local
   *
   * No credentials are hardcoded and no external provider is allowed
   * to become a platform-wide boot dependency.
   */

  if (
    configuredProvider === 'openai' &&
    process.env.OPENAI_API_KEY?.trim()
  ) {
    return new OpenAIReasoningProvider();
  }

  if (
    configuredProvider &&
    configuredProvider !== 'openai' &&
    configuredProvider !== 'local' &&
    configuredProvider !== 'hybrid'
  ) {
    console.warn(
      `[JUMO AI] Unsupported provider "${configuredProvider}". ` +
      'Falling back to local hybrid reasoning.'
    );
  }

  if (configuredProvider === 'openai') {
    console.warn(
      '[JUMO AI] OpenAI selected but OPENAI_API_KEY is unavailable. ' +
      'Falling back to local hybrid reasoning.'
    );
  }

  return new LocalHybridReasoningProvider();
}
