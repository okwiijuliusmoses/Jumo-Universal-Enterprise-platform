/**
 * JUMO UEOS — FAAP Standardized RBAC & Context Isolation Framework
 * Enforces strict organizational context isolation for accounting controls,
 * Maker-Checker approval workflows, and audit trails across Fintech, Education, Church, and Alumni.
 */

export type DomainContext = 'JUMO-FINTECH' | 'JUMO-SCHOOL-ERP' | 'JUMO-CHURCH-ERP' | 'JUMO-ALUMNI-ERP';

export interface UserSecurityProfile {
  userId: string;
  username: string;
  primaryRole: string;
  allowedContexts: DomainContext[];
  tenantId: string;
  isSuperAdmin?: boolean;
}

export const DOMAIN_ROLE_MATRIX: Record<DomainContext, string[]> = {
  'JUMO-FINTECH': [
    'ROLE_CONTROLLER', 
    'ROLE_ACCOUNTANT', 
    'ROLE_CFO', 
    'ROLE_FINTECH_ADMIN', 
    'ROLE_TREASURER', 
    'ROLE_AUDITOR',
    'ROLE_TAX_ACCOUNTANT',
    'ROLE_ASSET_ACCOUNTANT',
    'ROLE_PAYROLL_ACCOUNTANT',
    'ROLE_PROJECT_ACCOUNTANT',
    'ROLE_FX_DEALER'
  ],
  'JUMO-SCHOOL-ERP': [
    'ROLE_BURSAR', 
    'ROLE_HEADTEACHER', 
    'ROLE_DOS', 
    'ROLE_DEAN', 
    'ROLE_SCHOOL_ADMIN',
    'ROLE_ACCOUNTS_CLERK'
  ],
  'JUMO-CHURCH-ERP': [
    'ROLE_PARISH_TREASURER', 
    'ROLE_DIOCESAN_SECRETARY', 
    'ROLE_PARISH_PRIEST', 
    'ROLE_CHURCH_AUDITOR', 
    'ROLE_CHURCH_ADMIN',
    'ROLE_DIOCESAN_TREASURER'
  ],
  'JUMO-ALUMNI-ERP': [
    'ROLE_ADVANCEMENT_DIR', 
    'ROLE_ALUMNI_TREASURER', 
    'ROLE_CHAPTER_LEAD', 
    'ROLE_ALUMNI_ADMIN',
    'ROLE_ENDOWMENT_OFFICER'
  ]
};

export class FaapRbacService {
  private static instance: FaapRbacService;

  private constructor() {}

  public static getInstance(): FaapRbacService {
    if (!FaapRbacService.instance) {
      FaapRbacService.instance = new FaapRbacService();
    }
    return FaapRbacService.instance;
  }

  /**
   * Verifies if a user role is authorized within a specific domain context.
   */
  public isRoleAuthorizedForContext(role: string, targetContext: DomainContext, isSuperAdmin: boolean = false): boolean {
    if (isSuperAdmin) return true;
    const allowedRoles = DOMAIN_ROLE_MATRIX[targetContext] || [];
    return allowedRoles.includes(role);
  }

  /**
   * Authorizes accounting actions (Journal Posting, Period Lock, Budget Approval, Disbursement)
   * with strict organizational context boundary isolation.
   */
  public authorizeAccountingAction(profile: UserSecurityProfile, actionParams: {
    actionName: 'POST_JOURNAL' | 'APPROVE_VOUCHER' | 'LOCK_FISCAL_PERIOD' | 'RECONCILE_BANK' | 'APPROVE_BUDGET' | 'RUN_PAYROLL';
    targetContext: DomainContext;
    targetTenantId: string;
  }): { allowed: boolean; reason?: string } {
    // 1. Check SuperAdmin override
    if (profile.isSuperAdmin) {
      return { allowed: true };
    }

    // 2. Validate Tenant Scope
    if (profile.tenantId !== actionParams.targetTenantId && profile.tenantId !== 'GLOBAL_ROOT') {
      return {
        allowed: false,
        reason: `Tenant Boundary Violation: User tenant (${profile.tenantId}) does not match target tenant (${actionParams.targetTenantId}).`
      };
    }

    // 3. Validate Context Boundary
    if (!profile.allowedContexts.includes(actionParams.targetContext)) {
      return {
        allowed: false,
        reason: `Organizational Context Isolation Violation: User profile is restricted to [${profile.allowedContexts.join(', ')}] and cannot execute actions in ${actionParams.targetContext}.`
      };
    }

    // 4. Validate Role Authorization
    const isRoleValid = this.isRoleAuthorizedForContext(profile.primaryRole, actionParams.targetContext);
    if (!isRoleValid) {
      return {
        allowed: false,
        reason: `RBAC Permission Denied: Role "${profile.primaryRole}" is not authorized for accounting action "${actionParams.actionName}" in ${actionParams.targetContext}.`
      };
    }

    return { allowed: true };
  }

  /**
   * Filters audit trail entries to ensure context isolation.
   */
  public filterAuditLogsByContext(logs: any[], userProfile: UserSecurityProfile, activeContext: DomainContext): any[] {
    if (userProfile.isSuperAdmin) return logs;

    return logs.filter(log => {
      const matchContext = !log.domainContext || log.domainContext === activeContext;
      const matchTenant = !log.tenantId || log.tenantId === userProfile.tenantId || userProfile.tenantId === 'GLOBAL_ROOT';
      return matchContext && matchTenant;
    });
  }
}
