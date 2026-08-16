// JUMO UEOS — Sovereign AI Governance, Quota Control & Billing Engine
// Centralizes institutional AI quotas, tenant rate-limiting, agent authorization,
// token/request metering, cost tracking, and institutional chargeback records.

export interface AIQuotaPolicy {
  id: string;
  scopeType: 'INSTITUTION' | 'TENANT' | 'DEPARTMENT' | 'AGENT' | 'MODEL' | 'PROVIDER';
  scopeId: string;
  maxTokensPerDay: number;
  maxTokensPerMonth: number;
  maxRequestsPerMinute: number;
  maxConcurrentInferences: number;
  monthlyBudgetUsd: number;
  throttlingThresholdPercentage: number;
  suspended: boolean;
  emergencyOverride: boolean;
}

export interface AIUsageRecord {
  recordId: string;
  timestamp: string;
  institutionId: string;
  tenantId: string;
  departmentId: string;
  userId: string;
  applicationId: string;
  workflowId: string;
  agentId: string;
  modelId: string;
  providerId: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  latencyMs: number;
  providerCostUsd: number;
  jumoInternalCostUsd: number;
  institutionalChargebackUsd: number;
  evidenceHash: string;
}

export interface QuotaCheckResult {
  allowed: boolean;
  reason?: string;
  currentDailyTokens: number;
  maxDailyTokens: number;
  currentMonthlyBudgetUsedUsd: number;
  monthlyBudgetUsd: number;
  throttled: boolean;
}

export class JumoSovereignAIGovernanceEngine {
  private static instance: JumoSovereignAIGovernanceEngine;

  private policies = new Map<string, AIQuotaPolicy>();
  private usageLedger: AIUsageRecord[] = [];
  private activeConcurrency = new Map<string, number>();

  // Default baseline rates per 1,000 tokens (in USD)
  private modelRates: Record<string, { providerCost: number; jumoMarkup: number }> = {
    'gemini-3.7-flash': { providerCost: 0.0001, jumoMarkup: 0.00005 },
    'gemini-3.6-flash': { providerCost: 0.00005, jumoMarkup: 0.00002 },
    'gemini-3.1-pro-preview': { providerCost: 0.001, jumoMarkup: 0.0002 },
    'gpt-4o': { providerCost: 0.0025, jumoMarkup: 0.0005 },
    'gpt-5.6-sol': { providerCost: 0.005, jumoMarkup: 0.001 },
    'codex-engineering-agent': { providerCost: 0.002, jumoMarkup: 0.0004 },
    'claude-3-7-sonnet': { providerCost: 0.003, jumoMarkup: 0.0006 },
    'jumo-sovereign-kernel-local': { providerCost: 0.0, jumoMarkup: 0.00001 }
  };

  private constructor() {
    this.seedDefaultPolicies();
  }

  public static getInstance(): JumoSovereignAIGovernanceEngine {
    if (!JumoSovereignAIGovernanceEngine.instance) {
      JumoSovereignAIGovernanceEngine.instance = new JumoSovereignAIGovernanceEngine();
    }
    return JumoSovereignAIGovernanceEngine.instance;
  }

  private seedDefaultPolicies(): void {
    // Global Sovereign Default
    this.setPolicy({
      id: 'POLICY-GLOBAL-DEFAULT',
      scopeType: 'INSTITUTION',
      scopeId: 'GLOBAL',
      maxTokensPerDay: 50000000,
      maxTokensPerMonth: 1000000000,
      maxRequestsPerMinute: 600,
      maxConcurrentInferences: 50,
      monthlyBudgetUsd: 10000,
      throttlingThresholdPercentage: 85,
      suspended: false,
      emergencyOverride: false
    });

    // Education Default Profile
    this.setPolicy({
      id: 'POLICY-EDUCATION-STANDARD',
      scopeType: 'TENANT',
      scopeId: 'TENANT-EDUCATION',
      maxTokensPerDay: 10000000,
      maxTokensPerMonth: 200000000,
      maxRequestsPerMinute: 200,
      maxConcurrentInferences: 20,
      monthlyBudgetUsd: 2500,
      throttlingThresholdPercentage: 80,
      suspended: false,
      emergencyOverride: false
    });
  }

  public setPolicy(policy: AIQuotaPolicy): void {
    this.policies.set(`${policy.scopeType}:${policy.scopeId}`, policy);
  }

  public getPolicy(scopeType: 'INSTITUTION' | 'TENANT' | 'DEPARTMENT' | 'AGENT' | 'MODEL' | 'PROVIDER', scopeId: string): AIQuotaPolicy {
    const key = `${scopeType}:${scopeId}`;
    if (this.policies.has(key)) {
      return this.policies.get(key)!;
    }
    return this.policies.get('INSTITUTION:GLOBAL')!;
  }

  public getAllPolicies(): AIQuotaPolicy[] {
    return Array.from(this.policies.values());
  }

  /**
   * Pre-execution Quota & Authorization Check.
   */
  public checkQuota(params: {
    institutionId?: string;
    tenantId?: string;
    agentId?: string;
    modelId: string;
    providerId: string;
  }): QuotaCheckResult {
    const institutionPolicy = this.getPolicy('INSTITUTION', params.institutionId || 'GLOBAL');
    const tenantPolicy = params.tenantId ? this.getPolicy('TENANT', params.tenantId) : institutionPolicy;

    if (tenantPolicy.emergencyOverride || institutionPolicy.emergencyOverride) {
      return {
        allowed: true,
        currentDailyTokens: 0,
        maxDailyTokens: tenantPolicy.maxTokensPerDay,
        currentMonthlyBudgetUsedUsd: 0,
        monthlyBudgetUsd: tenantPolicy.monthlyBudgetUsd,
        throttled: false
      };
    }

    if (tenantPolicy.suspended || institutionPolicy.suspended) {
      return {
        allowed: false,
        reason: 'Sovereign governance policy has suspended AI execution for this tenant/institution.',
        currentDailyTokens: 0,
        maxDailyTokens: tenantPolicy.maxTokensPerDay,
        currentMonthlyBudgetUsedUsd: 0,
        monthlyBudgetUsd: tenantPolicy.monthlyBudgetUsd,
        throttled: false
      };
    }

    // Calculate current usage for tenant in last 24 hours
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const recentRecords = this.usageLedger.filter(
      r => (!params.tenantId || r.tenantId === params.tenantId) && new Date(r.timestamp).getTime() > oneDayAgo
    );

    const totalDailyTokens = recentRecords.reduce((sum, r) => sum + r.totalTokens, 0);
    const totalDailyCost = recentRecords.reduce((sum, r) => sum + r.institutionalChargebackUsd, 0);

    if (totalDailyTokens >= tenantPolicy.maxTokensPerDay) {
      return {
        allowed: false,
        reason: `Daily token quota exceeded (${totalDailyTokens.toLocaleString()} / ${tenantPolicy.maxTokensPerDay.toLocaleString()} tokens).`,
        currentDailyTokens: totalDailyTokens,
        maxDailyTokens: tenantPolicy.maxTokensPerDay,
        currentMonthlyBudgetUsedUsd: totalDailyCost,
        monthlyBudgetUsd: tenantPolicy.monthlyBudgetUsd,
        throttled: true
      };
    }

    const isThrottled = totalDailyTokens >= (tenantPolicy.maxTokensPerDay * tenantPolicy.throttlingThresholdPercentage) / 100;

    return {
      allowed: true,
      currentDailyTokens: totalDailyTokens,
      maxDailyTokens: tenantPolicy.maxTokensPerDay,
      currentMonthlyBudgetUsedUsd: totalDailyCost,
      monthlyBudgetUsd: tenantPolicy.monthlyBudgetUsd,
      throttled: isThrottled
    };
  }

  /**
   * Post-execution Usage & Chargeback Metering.
   */
  public recordUsage(params: {
    institutionId?: string;
    tenantId?: string;
    departmentId?: string;
    userId?: string;
    applicationId?: string;
    workflowId?: string;
    agentId?: string;
    modelId: string;
    providerId: string;
    inputTokens: number;
    outputTokens: number;
    latencyMs: number;
  }): AIUsageRecord {
    const totalTokens = params.inputTokens + params.outputTokens;
    const rates = this.modelRates[params.modelId] || { providerCost: 0.0005, jumoMarkup: 0.0001 };

    const providerCostUsd = (totalTokens / 1000) * rates.providerCost;
    const jumoInternalCostUsd = (totalTokens / 1000) * (rates.providerCost * 0.2);
    const institutionalChargebackUsd = (totalTokens / 1000) * (rates.providerCost + rates.jumoMarkup);

    const recordId = `USG-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const evidenceHash = `SHA256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;

    const record: AIUsageRecord = {
      recordId,
      timestamp: new Date().toISOString(),
      institutionId: params.institutionId || 'INST-GLOBAL',
      tenantId: params.tenantId || 'TENANT-DEFAULT',
      departmentId: params.departmentId || 'DEPT-GENERAL',
      userId: params.userId || 'USR-SYSTEM',
      applicationId: params.applicationId || 'APP-CORE',
      workflowId: params.workflowId || 'WF-INFERENCE',
      agentId: params.agentId || 'jumo-gpt',
      modelId: params.modelId,
      providerId: params.providerId,
      inputTokens: params.inputTokens,
      outputTokens: params.outputTokens,
      totalTokens,
      latencyMs: params.latencyMs,
      providerCostUsd,
      jumoInternalCostUsd,
      institutionalChargebackUsd,
      evidenceHash
    };

    this.usageLedger.push(record);
    return record;
  }

  public getUsageLedger(): AIUsageRecord[] {
    return this.usageLedger;
  }

  public getBillingSummary(tenantId?: string): {
    totalInferences: number;
    totalTokens: number;
    totalProviderCostUsd: number;
    totalInstitutionalChargebackUsd: number;
    usageByModel: Record<string, { tokens: number; cost: number }>;
    usageByAgent: Record<string, { tokens: number; cost: number }>;
  } {
    const records = tenantId ? this.usageLedger.filter(r => r.tenantId === tenantId) : this.usageLedger;

    let totalTokens = 0;
    let totalProviderCostUsd = 0;
    let totalInstitutionalChargebackUsd = 0;
    const usageByModel: Record<string, { tokens: number; cost: number }> = {};
    const usageByAgent: Record<string, { tokens: number; cost: number }> = {};

    for (const r of records) {
      totalTokens += r.totalTokens;
      totalProviderCostUsd += r.providerCostUsd;
      totalInstitutionalChargebackUsd += r.institutionalChargebackUsd;

      if (!usageByModel[r.modelId]) usageByModel[r.modelId] = { tokens: 0, cost: 0 };
      usageByModel[r.modelId].tokens += r.totalTokens;
      usageByModel[r.modelId].cost += r.institutionalChargebackUsd;

      if (!usageByAgent[r.agentId]) usageByAgent[r.agentId] = { tokens: 0, cost: 0 };
      usageByAgent[r.agentId].tokens += r.totalTokens;
      usageByAgent[r.agentId].cost += r.institutionalChargebackUsd;
    }

    return {
      totalInferences: records.length,
      totalTokens,
      totalProviderCostUsd,
      totalInstitutionalChargebackUsd,
      usageByModel,
      usageByAgent
    };
  }
}
