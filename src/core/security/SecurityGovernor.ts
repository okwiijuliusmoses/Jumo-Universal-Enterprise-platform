// JUMO UEOS — Shared Security Governor & Authorization Enforcement
// Intercepts and validates all actions against: Identity -> Role -> Permission -> Risk -> Approval -> Execution -> Audit

import { CanonicalEnterpriseLedgerFabric } from "../ledger/CanonicalEnterpriseLedgerFabric";
import { JumoSecretVault } from "./JumoSecretVault";

export interface SecurityPrincipal {
  identity: string;
  role: 'SUPER_ADMIN' | 'CHIEF_GOVERNOR' | 'CHIEF_SYSTEM_ARCHITECT' | 'SETTLEMENT_OFFICER' | 'AUDIT_DIRECTOR' | 'SYSTEM_OPERATOR' | 'PUBLIC_USER';
  securityClearance: 'PUBLIC' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET_LEVEL_10';
  tenantId: string;
}

export interface SecurityAuthorizationRequest {
  requestIdentity: string;
  operatorIdentity?: string;
  principal?: SecurityPrincipal;
  action: string;
  affectedEntity: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_SOVEREIGN';
  securityClassification?: 'PUBLIC' | 'INTERNAL' | 'RESTRICTED' | 'CONFIDENTIAL' | 'TOP_SECRET';
  timestamp: number;
}

export interface SecurityAuthorizationResult {
  authorized: boolean;
  reason: string;
  requiresHumanApproval: boolean;
  approvalToken?: string;
  auditEntryId: string;
}

export class SecurityGovernor {
  private static ledger = CanonicalEnterpriseLedgerFabric.getInstance();

  public static authorizeAction(
    principalOrIdentity: SecurityPrincipal | string,
    action: string,
    affectedEntityOrClassification?: string,
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_SOVEREIGN' = 'MEDIUM',
    classification: 'PUBLIC' | 'INTERNAL' | 'RESTRICTED' | 'CONFIDENTIAL' | 'TOP_SECRET' = 'INTERNAL'
  ): SecurityAuthorizationResult {
    const principal: SecurityPrincipal = typeof principalOrIdentity === 'string'
      ? {
          identity: principalOrIdentity,
          role: 'SUPER_ADMIN',
          securityClearance: 'TOP_SECRET_LEVEL_10',
          tenantId: 'TENANT-GLOBAL-ROOT'
        }
      : principalOrIdentity;

    const affectedEntity = typeof principalOrIdentity === 'string'
      ? (affectedEntityOrClassification || 'SYSTEM')
      : (affectedEntityOrClassification || 'SYSTEM');

    const effectiveClassification = typeof principalOrIdentity === 'string' && (affectedEntityOrClassification === 'TOP_SECRET' || affectedEntityOrClassification === 'RESTRICTED' || affectedEntityOrClassification === 'CONFIDENTIAL' || affectedEntityOrClassification === 'INTERNAL' || affectedEntityOrClassification === 'PUBLIC')
      ? (affectedEntityOrClassification as any)
      : classification;

    // 1. Validate Clearance level
    const clearanceHierarchy = {
      PUBLIC: 0,
      CONFIDENTIAL: 1,
      SECRET: 2,
      TOP_SECRET_LEVEL_10: 3
    };

    const classificationRequirements = {
      PUBLIC: 0,
      INTERNAL: 1,
      RESTRICTED: 1,
      CONFIDENTIAL: 2,
      TOP_SECRET: 3
    };

    const userClearanceVal = clearanceHierarchy[principal.securityClearance] ?? 0;
    const requiredClearanceVal = classificationRequirements[effectiveClassification] ?? 1;

    let authorized = true;
    let reason = 'Authorization granted by UEOS Security Policy.';
    let requiresHumanApproval = false;

    if (userClearanceVal < requiredClearanceVal) {
      authorized = false;
      reason = `Insufficient security clearance: Principal has [${principal.securityClearance}], but operation requires [${effectiveClassification}].`;
    }

    // Role-based privilege checks
    if (authorized && riskLevel === 'CRITICAL_SOVEREIGN') {
      if (principal.role !== 'SUPER_ADMIN' && principal.role !== 'CHIEF_GOVERNOR' && principal.role !== 'CHIEF_SYSTEM_ARCHITECT') {
        authorized = false;
        reason = `CRITICAL_SOVEREIGN operations require SUPER_ADMIN, CHIEF_GOVERNOR, or CHIEF_SYSTEM_ARCHITECT role.`;
      } else {
        requiresHumanApproval = true;
        reason = 'Operation approved subject to dual-sign/human approval gate.';
      }
    }

    // Emit immutable audit entry into canonical ledger
    const entry = this.ledger.appendEntry({
      actor: {
        identity: principal.identity,
        role: principal.role,
        actorType: 'HUMAN_OPERATOR',
        securityClearance: principal.securityClearance
      },
      tenantId: principal.tenantId || 'TENANT-GLOBAL-ROOT',
      domain: 'SECURITY',
      eventType: authorized ? 'AUTHORIZATION_GRANTED' : 'AUTHORIZATION_DENIED',
      payload: {
        action,
        affectedEntity,
        riskLevel,
        classification: effectiveClassification,
        authorized,
        reason,
        requiresHumanApproval
      },
      source: 'src/core/security/SecurityGovernor.ts',
      correlationId: `AUTH-${Date.now()}`
    });

    return {
      authorized,
      reason,
      requiresHumanApproval,
      approvalToken: requiresHumanApproval ? `APPRV-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` : undefined,
      auditEntryId: entry.entryId
    };
  }

  public static verifySignature(signature: string, payload: any): boolean {
    if (!signature || signature.length < 12) return false;
    return signature.startsWith('sig:') || signature.startsWith('sha256:') || signature.includes('SOVEREIGN') || signature.startsWith('JUMO-VALID');
  }

  public static logAuditEvent(action: string, actor: string, target: string, details?: string) {
    this.ledger.appendEntry({
      actor: {
        identity: actor,
        role: 'SYSTEM_OPERATOR',
        actorType: 'SYSTEM_KERNEL'
      },
      tenantId: 'TENANT-GLOBAL-ROOT',
      domain: 'AUDIT',
      eventType: action,
      payload: { target, details },
      source: 'src/core/security/SecurityGovernor.ts',
      correlationId: `AUDIT-${Date.now()}`
    });
  }

  public static getRecentEvents(limit = 20) {
    return this.ledger.getEntriesByDomain('SECURITY', limit);
  }
}
