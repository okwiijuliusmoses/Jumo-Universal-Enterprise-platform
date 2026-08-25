/**
 * JUMO UEOS Policy & RBAC Security Engine Module
 */

export interface SecurityPolicy {
  policyId: string;
  name: string;
  allowedRoles: ('OWNER' | 'TENANT' | 'SECURITY')[];
  resourcePattern: string;
  action: 'READ' | 'WRITE' | 'EXECUTE' | 'OVERRIDE';
  requiresMultiFactor: boolean;
  minRiskScoreThreshold?: number;
}

export class PolicyEngine {
  private policies: SecurityPolicy[] = [
    {
      policyId: 'pol_owner_full_access',
      name: 'Global Owner Administration Policy',
      allowedRoles: ['OWNER'],
      resourcePattern: '*',
      action: 'OVERRIDE',
      requiresMultiFactor: true,
    },
    {
      policyId: 'pol_tenant_faap_write',
      name: 'Tenant FAAP Journal Posting Policy',
      allowedRoles: ['OWNER', 'TENANT'],
      resourcePattern: 'faap:journal:*',
      action: 'WRITE',
      requiresMultiFactor: false,
    },
    {
      policyId: 'pol_treasury_drawdown',
      name: 'Treasury Pool Allocation Policy',
      allowedRoles: ['OWNER', 'TENANT'],
      resourcePattern: 'treasury:pool:drawdown',
      action: 'EXECUTE',
      requiresMultiFactor: false,
      minRiskScoreThreshold: 75,
    },
  ];

  public evaluateAccess(
    role: 'OWNER' | 'TENANT' | 'SECURITY',
    resource: string,
    action: 'READ' | 'WRITE' | 'EXECUTE' | 'OVERRIDE',
    riskScore?: number
  ): { granted: boolean; reason: string } {
    if (role === 'OWNER') {
      return { granted: true, reason: 'OWNER_SUPERUSER_ACCESS' };
    }

    const matchedPolicy = this.policies.find(
      (p) => p.action === action && p.allowedRoles.includes(role)
    );

    if (!matchedPolicy) {
      return { granted: false, reason: 'NO_MATCHING_POLICY' };
    }

    if (
      matchedPolicy.minRiskScoreThreshold !== undefined &&
      riskScore !== undefined &&
      riskScore < matchedPolicy.minRiskScoreThreshold
    ) {
      return { granted: false, reason: `RISK_SCORE_BELOW_THRESHOLD (${riskScore} < ${matchedPolicy.minRiskScoreThreshold})` };
    }

    return { granted: true, reason: 'POLICY_AUTHORIZED' };
  }

  public getPolicies(): SecurityPolicy[] {
    return this.policies;
  }
}

export const policyEngine = new PolicyEngine();
