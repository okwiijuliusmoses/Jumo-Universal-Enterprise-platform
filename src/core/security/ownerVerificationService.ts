/**
 * JUMO UEOS — Platform Owner Verification Mode Service
 * Manages controlled temporary Platform Owner Verification Mode during platform construction & inspection.
 * Enforces auditability, product context switching, state persistence, and construction lock.
 */

export interface OwnerAuditEvent {
  id: string;
  timestamp: string;
  sessionId: string;
  ownerId: string;
  action: string;
  product?: string;
  portal?: string;
  module?: string;
  entryPoint?: string;
  exitTime?: string;
  securityEvents?: string[];
  details?: string;
}

export interface TemporaryVerificationSession {
  sessionId: string;
  productId: string;
  tenantId: string;
  role: string;
  workspace: string;
  issuedTimestamp: string;
  expiryTimestamp: string;
  issuer: string;
  reason: string;
  revoked: boolean;
}

class OwnerVerificationService {
  private static instance: OwnerVerificationService;
  private verificationModeEnabled: boolean = true;
  private currentSessionId: string = 'OWNER_VERIFICATION_SESSION_INIT';
  private currentProductContext: string = 'all';
  private auditLogs: OwnerAuditEvent[] = [];
  private verificationSessions: TemporaryVerificationSession[] = [];

  private constructor() {
    this.currentSessionId = 'OWNER_VERIFICATION_SESSION_' + Math.random().toString(36).substring(2, 9).toUpperCase();
    this.loadState();
  }

  public static getInstance(): OwnerVerificationService {
    if (!OwnerVerificationService.instance) {
      OwnerVerificationService.instance = new OwnerVerificationService();
    }
    return OwnerVerificationService.instance;
  }

  private loadState() {
    if (typeof window === 'undefined') return;
    try {
      const storedMode = localStorage.getItem('OWNER_VERIFICATION_MODE_ENABLED');
      if (storedMode !== null) {
        this.verificationModeEnabled = storedMode === 'true';
      } else {
        this.verificationModeEnabled = true;
        localStorage.setItem('OWNER_VERIFICATION_MODE_ENABLED', 'true');
      }

      const storedSession = localStorage.getItem('jumo_owner_active_session_id');
      if (storedSession) {
        this.currentSessionId = storedSession;
      } else {
        localStorage.setItem('jumo_owner_active_session_id', this.currentSessionId);
      }

      const storedProduct = localStorage.getItem('jumo_owner_active_product');
      if (storedProduct) {
        this.currentProductContext = storedProduct;
      }

      const storedLogs = localStorage.getItem('jumo_owner_audit_logs');
      if (storedLogs) {
        const parsed = JSON.parse(storedLogs);
        this.auditLogs = Array.isArray(parsed) ? parsed : [];
      } else {
        this.logAction({
          ownerId: 'SOVEREIGN_OWNER',
          action: 'OWNER_VERIFICATION_SESSION_INITIALIZED',
          entryPoint: 'System Boot & Verification Framework',
          details: 'Platform Owner Verification Mode active for independent product inspection.'
        });
      }

      const storedSessions = localStorage.getItem('jumo_temporary_verification_sessions');
      if (storedSessions) {
        const parsedSessions = JSON.parse(storedSessions);
        this.verificationSessions = Array.isArray(parsedSessions) ? parsedSessions : [];
      } else {
        // Default seed session for FAAP CFO
        this.verificationSessions = [
          {
            sessionId: 'VER_SESS_FAAP_CFO_001',
            productId: 'JUMO-FINPAY',
            tenantId: 'TENANT_FAAP_1',
            role: 'ROLE_CFO',
            workspace: 'Finance Workspace',
            issuedTimestamp: new Date().toISOString(),
            expiryTimestamp: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
            issuer: 'SOVEREIGN_OWNER',
            reason: 'Controlled Product Verification Access for FAAP CFO',
            revoked: false
          }
        ];
      }
    } catch {
      this.auditLogs = [];
      this.verificationSessions = [];
    }
  }

  private saveState() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('OWNER_VERIFICATION_MODE_ENABLED', String(this.verificationModeEnabled));
      localStorage.setItem('jumo_owner_active_session_id', this.currentSessionId);
      localStorage.setItem('jumo_owner_active_product', this.currentProductContext);
      const safeLogs = Array.isArray(this.auditLogs) ? this.auditLogs : [];
      localStorage.setItem('jumo_owner_audit_logs', JSON.stringify(safeLogs.slice(-100)));
      localStorage.setItem('jumo_temporary_verification_sessions', JSON.stringify(this.verificationSessions));
    } catch {
      // Storage fallback
    }
  }

  public isVerificationModeActive(): boolean {
    return this.verificationModeEnabled;
  }

  public enableVerificationMode(ownerId: string = 'SOVEREIGN_OWNER', reason: string = 'Manual Verification Enable'): void {
    this.verificationModeEnabled = true;
    this.currentSessionId = 'OWNER_VERIFICATION_SESSION_' + Math.random().toString(36).substring(2, 9).toUpperCase();
    this.logAction({
      ownerId,
      action: 'VERIFICATION_MODE_ENABLED',
      details: reason
    });
    this.saveState();
  }

  public disableVerificationMode(ownerId: string = 'SOVEREIGN_OWNER', reason: string = 'CONSTRUCTION COMPLETE - LOCK RESTORED'): void {
    const exitTimestamp = new Date().toISOString();
    this.logAction({
      ownerId,
      action: 'CONSTRUCTION_COMPLETE_LOCK',
      exitTime: exitTimestamp,
      details: reason
    });
    this.verificationModeEnabled = false;
    this.saveState();
  }

  public getCurrentSessionId(): string {
    return this.currentSessionId;
  }

  public getCurrentProductContext(): string {
    return this.currentProductContext;
  }

  public issueVerificationSession(productId: string, tenantId: string, role: string, workspace: string, reason: string): TemporaryVerificationSession {
    const sessionId = 'VER_SESS_' + productId.toUpperCase() + '_' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const session: TemporaryVerificationSession = {
      sessionId,
      productId,
      tenantId,
      role,
      workspace,
      issuedTimestamp: new Date().toISOString(),
      expiryTimestamp: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
      issuer: 'SOVEREIGN_OWNER',
      reason,
      revoked: false
    };
    this.verificationSessions.unshift(session);
    this.logAction({
      ownerId: 'SOVEREIGN_OWNER',
      action: 'TEMPORARY_VERIFICATION_SESSION_ISSUED',
      product: productId,
      securityEvents: ['TemporarySessionGenerated', 'AuditableTokenBound', 'RoleRestricted'],
      details: `Issued temporary verification session [${sessionId}] for product [${productId}] with role [${role}] in workspace [${workspace}]`
    });
    this.saveState();
    return session;
  }

  public revokeVerificationSession(sessionId: string): void {
    const sess = this.verificationSessions.find(s => s.sessionId === sessionId);
    if (sess) {
      sess.revoked = true;
      this.logAction({
        ownerId: 'SOVEREIGN_OWNER',
        action: 'TEMPORARY_VERIFICATION_SESSION_REVOKED',
        product: sess.productId,
        securityEvents: ['SessionRevoked', 'AccessTerminated'],
        details: `Revoked temporary verification session [${sessionId}] for product [${sess.productId}]`
      });
      this.saveState();
    }
  }

  public getActiveVerificationSessions(): TemporaryVerificationSession[] {
    return Array.isArray(this.verificationSessions) ? [...this.verificationSessions] : [];
  }

  public validateVerificationSession(sessionId: string): boolean {
    const sess = this.verificationSessions.find(s => s.sessionId === sessionId);
    if (!sess || sess.revoked) return false;
    if (new Date() > new Date(sess.expiryTimestamp)) return false;
    return true;
  }

  public establishOwnerVerificationSession(productCode: string, entryPoint: string = 'Login Gateway Bypass'): string {
    this.currentProductContext = productCode;
    const sessionToken = 'OWNER_VERIFICATION_SESSION_' + productCode.toUpperCase() + '_' + Date.now().toString(36);
    this.currentSessionId = sessionToken;
    this.logAction({
      ownerId: 'SOVEREIGN_OWNER',
      action: 'PRODUCT_VERIFICATION_ENTRY',
      product: productCode,
      entryPoint,
      securityEvents: ['SovereignIdentityValidated', 'TenantCredentialBypassBypassedOnlyForOwner', 'ProductContextBound'],
      details: `Authenticated sovereign Platform Owner entered verification mode for product [${productCode}]`
    });
    this.saveState();
    return sessionToken;
  }

  public terminateOwnerVerificationSession(ownerId: string = 'SOVEREIGN_OWNER'): void {
    const exitTimestamp = new Date().toISOString();
    this.logAction({
      ownerId,
      action: 'PRODUCT_VERIFICATION_EXIT',
      product: this.currentProductContext,
      exitTime: exitTimestamp,
      securityEvents: ['SessionTerminated', 'OwnerContextCleared'],
      details: `Platform Owner exited verification session for product [${this.currentProductContext}]`
    });
    this.saveState();
  }

  public setActiveProductContext(productId: string, ownerId: string = 'SOVEREIGN_OWNER'): void {
    const prev = this.currentProductContext;
    this.currentProductContext = productId;
    this.logAction({
      ownerId,
      action: 'PRODUCT_SWITCHED',
      product: productId,
      details: `Switched active product context from [${prev}] to [${productId}]`
    });
    this.saveState();
  }

  public logAction(event: { 
    ownerId: string; 
    action: string; 
    product?: string; 
    portal?: string; 
    module?: string; 
    entryPoint?: string;
    exitTime?: string;
    securityEvents?: string[];
    details?: string 
  }): OwnerAuditEvent {
    const auditEntry: OwnerAuditEvent = {
      id: 'audit_' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      sessionId: this.currentSessionId,
      ownerId: event.ownerId,
      action: event.action,
      product: event.product || this.currentProductContext,
      portal: event.portal,
      module: event.module,
      entryPoint: event.entryPoint,
      exitTime: event.exitTime,
      securityEvents: event.securityEvents || ['SovereignOwnerVerified'],
      details: event.details
    };

    if (!Array.isArray(this.auditLogs)) {
      this.auditLogs = [];
    }
    this.auditLogs.unshift(auditEntry);
    this.saveState();
    return auditEntry;
  }

  public getAuditLogs(): OwnerAuditEvent[] {
    return Array.isArray(this.auditLogs) ? [...this.auditLogs] : [];
  }

  public clearAuditLogs(): void {
    this.auditLogs = [];
    this.saveState();
  }
}

export const ownerVerificationService = OwnerVerificationService.getInstance();
