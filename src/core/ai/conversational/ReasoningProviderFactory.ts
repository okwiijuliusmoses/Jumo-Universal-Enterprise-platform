import { OpenAIReasoningProvider } from './OpenAIReasoningProvider';
import { GeminiReasoningProvider } from './GeminiReasoningProvider';
import { LocalHybridReasoningProvider } from './LocalHybridReasoningProvider';
import type { ReasoningAIProvider, ReasoningRequest } from './GeneralPurposeReasoningAI';
import dotenv from 'dotenv';

export class ReasoningProviderFactory {
  private static instance: ReasoningProviderFactory;
  private providers: Map<string, ReasoningAIProvider> = new Map();
  private activeProviderId: string = 'local';
  
  public static getInstance(): ReasoningProviderFactory {
    if (!ReasoningProviderFactory.instance) {
      ReasoningProviderFactory.instance = new ReasoningProviderFactory();
      ReasoningProviderFactory.instance.refreshProviders();
    }
    return ReasoningProviderFactory.instance;
  }
  
  public refreshProviders() {
    dotenv.config({ override: true });
    this.providers.clear();
    
    const configuredProvider = process.env.JUMO_AI_PROVIDER?.trim().toLowerCase();
    const openAiKey = process.env.OPENAI_API_KEY?.trim();
    const geminiKey = process.env.GEMINI_API_KEY?.trim();
    
    if (openAiKey) {
      try {
        this.providers.set('openai', new OpenAIReasoningProvider());
      } catch(err: any) {
        console.warn(`[JUMO AI] OpenAI reasoning provider initialization failed: ${err.message}`);
      }
    }
    
    if (geminiKey) {
      try {
        this.providers.set('gemini', new GeminiReasoningProvider());
      } catch(err: any) {
        console.warn(`[JUMO AI] Gemini reasoning provider initialization failed: ${err.message}`);
      }
    }
    
    this.providers.set('local', new LocalHybridReasoningProvider());
    
    if (configuredProvider && this.providers.has(configuredProvider)) {
       this.activeProviderId = configuredProvider;
    } else if (this.providers.has('openai')) {
      this.activeProviderId = 'openai';
    } else if (this.providers.has('gemini')) {
      this.activeProviderId = 'gemini';
    } else {
      this.activeProviderId = 'local';
    }
  }

  public getActiveProvider(): ReasoningAIProvider {
    return this.providers.get(this.activeProviderId) || this.providers.get('local')!;
  }
}

export function createReasoningProvider(): ReasoningAIProvider {
  return {
    reason: async (request: ReasoningRequest) => {
      const provider = ReasoningProviderFactory.getInstance().getActiveProvider();
      return provider.reason(request);
    }
  };
}
