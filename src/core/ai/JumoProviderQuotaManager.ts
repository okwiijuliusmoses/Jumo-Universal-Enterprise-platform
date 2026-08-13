// JUMO UEOS — Provider Quota Manager
// Prevents external provider quota limits from disabling the JUMO institutional workforce.

import { SovereignOperatingStateService } from "../runtime/sovereignState";
import { ProviderQuotaMetrics } from "../runtime/sovereignState.types";

export class JumoProviderQuotaManager {
  static getQuotas(): ProviderQuotaMetrics[] {
    return SovereignOperatingStateService.getState().providerQuotas;
  }

  static recordUsage(providerId: 'gemini' | 'openai' | 'copilot' | 'jumo_local', tokens: number, requests: number = 1): ProviderQuotaMetrics {
    let updatedQuota: ProviderQuotaMetrics | null = null;

    SovereignOperatingStateService.updateState(draft => {
      const quota = draft.providerQuotas.find(q => q.providerId === providerId);
      if (quota) {
        quota.tokensUsed += tokens;
        quota.requestsUsed += requests;

        if (quota.tokensUsed >= quota.tokenLimit || quota.requestsUsed >= quota.requestLimit) {
          quota.isExhausted = true;
          quota.status = "EXHAUSTED";

          // Mark provider degraded/quota_exhausted in AI Gateway
          const prov = draft.aiGateway.registeredProviders.find(p => p.providerId === providerId);
          if (prov) {
            prov.status = "QUOTA_EXHAUSTED";
            prov.isAvailable = false;
          }

          draft.auditEvents.unshift({
            id: `audit-quota-${Date.now()}`,
            actor: "JumoProviderQuotaManager",
            operation: "PROVIDER_QUOTA_EXHAUSTED",
            details: `Provider ${providerId} hit token/request limit (${quota.tokensUsed}/${quota.tokenLimit} tokens). Automatically failing over to next provider / JUMO Local.`,
            timestamp: new Date().toISOString()
          });
        } else if (quota.tokensUsed >= quota.tokenLimit * 0.8) {
          quota.status = "WARNING";
        }

        updatedQuota = { ...quota };
      }
    });

    return updatedQuota || {
      providerId,
      tokensUsed: tokens,
      tokenLimit: 10000000,
      requestsUsed: requests,
      requestLimit: 10000,
      rateLimitPerMin: 1000,
      quotaResetTimestamp: new Date(Date.now() + 86400000).toISOString(),
      isExhausted: false,
      status: "NORMAL"
    };
  }

  static resetProviderQuota(providerId: string): void {
    SovereignOperatingStateService.updateState(draft => {
      const quota = draft.providerQuotas.find(q => q.providerId === providerId);
      if (quota) {
        quota.tokensUsed = 0;
        quota.requestsUsed = 0;
        quota.isExhausted = false;
        quota.status = "NORMAL";
      }
      const prov = draft.aiGateway.registeredProviders.find(p => p.providerId === providerId);
      if (prov) {
        prov.status = "HEALTHY";
        prov.isAvailable = true;
      }
    });
  }
}
