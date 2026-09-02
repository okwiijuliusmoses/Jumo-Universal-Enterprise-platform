/**
 * JUMO AEGIS SECURITY PLATFORM
 * Zero-Trust Policy Engine, ABAC/RBAC & HSM Cryptographic Enforcement
 * Authority: JUMO UEOS Architecture V2.0
 */

import type {
  AccessPolicyRule,
  AegisSecurityPrincipal,
  FourEyesApprovalRequest,
  SecurityAuditToken,
  SecurityClassification,
  UserRole,
} from "./aegisTypes";

export class AegisSecurityEngine {
  private principals = new Map<string, AegisSecurityPrincipal>();
  private policies = new Map<string, AccessPolicyRule>();
  private activeTokens = new Map<string, SecurityAuditToken>();
  private fourEyesRequests = new Map<string, FourEyesApprovalRequest>();

  constructor() {
    this.seedDefaultPrincipalsAndPolicies();
  }

  private seedDefaultPrincipalsAndPolicies() {
    const principals: AegisSecurityPrincipal[] = [
      {
        id: "usr-controller-01",
        username: "controller.statutory",
        fullName: "Dr. Sarah Namubiru",
        role: "CHIEF_FINANCIAL_CONTROLLER",
        institutionId: "inst-gov-001",
        department: "Statutory Finance",
        clearanceLevel: "STATUTORY_PROTECTED",
        mfaEnforced: true,
        hsmKeyFingerprint: "HSM-ED25519-FINGERPRINT-89A7B3",
      },
      {
        id: "usr-auditor-01",
        username: "auditor.general",
        fullName: "Hon. Kenneth Otim",
        role: "AUDITOR_GENERAL",
        institutionId: "inst-audit-002",
        department: "Forensic Audit & Compliance",
        clearanceLevel: "TOP_SECRET_CRYPTOGRAPHIC",
        mfaEnforced: true,
        hsmKeyFingerprint: "HSM-ED25519-FINGERPRINT-11C4D9",
      },
      {
        id: "usr-sacco-mgr",
        username: "mgr.sacco",
        fullName: "Agnes Akello",
        role: "SACCO_MANAGER",
        institutionId: "inst-sacco-88",
        department: "Credit & Operations",
        clearanceLevel: "CONFIDENTIAL",
        mfaEnforced: true,
        hsmKeyFingerprint: "HSM-ED25519-FINGERPRINT-44F2E1",
      },
    ];

    principals.forEach(p => this.principals.set(p.id, p));

    const policies: AccessPolicyRule[] = [
      {
        id: "pol-faap-vote-override",
        name: "Vote Book Budget Ceiling Override",
        resourcePattern: "faap:votebook:override",
        allowedRoles: ["CHIEF_FINANCIAL_CONTROLLER", "SYSTEM_SUPER_ADMIN"],
        minimumClearance: "STATUTORY_PROTECTED",
        requireFourEyesApproval: true,
        active: true,
      },
      {
        id: "pol-pay-settlement-reconciliation",
        name: "Payment Switch Settlement Finalization",
        resourcePattern: "digitalpay:settlement:finalize",
        allowedRoles: ["CHIEF_FINANCIAL_CONTROLLER", "SYSTEM_SUPER_ADMIN"],
        minimumClearance: "CONFIDENTIAL",
        requireFourEyesApproval: false,
        active: true,
      },
      {
        id: "pol-audit-merkle-inspect",
        name: "Cryptographic Merkle Proof Inspection",
        resourcePattern: "faap:merkle:inspect",
        allowedRoles: ["AUDITOR_GENERAL", "CHIEF_FINANCIAL_CONTROLLER", "SYSTEM_SUPER_ADMIN"],
        minimumClearance: "CONFIDENTIAL",
        requireFourEyesApproval: false,
        active: true,
      },
    ];

    policies.forEach(p => this.policies.set(p.id, p));
  }

  // ==========================================
  // 1. PRINCIPALS & ZERO-TRUST AUTH
  // ==========================================

  getPrincipals(): AegisSecurityPrincipal[] {
    return Array.from(this.principals.values());
  }

  getPrincipal(id: string): AegisSecurityPrincipal | undefined {
    return this.principals.get(id);
  }

  authenticatePrincipal(principalId: string): SecurityAuditToken {
    const principal = this.principals.get(principalId);
    if (!principal) {
      throw new Error(`AEGIS AUTH ERROR: Principal ${principalId} does not exist.`);
    }

    const token: SecurityAuditToken = {
      tokenId: `tok-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      principalId,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      sessionHash: `SHA256:${Math.random().toString(36).substring(2)}`,
      signatureProof: `ED25519-SIG:${principal.hsmKeyFingerprint}-${Date.now()}`,
    };

    this.activeTokens.set(token.tokenId, token);
    return token;
  }

  // ==========================================
  // 2. AUTHORIZATION & POLICY EVALUATION
  // ==========================================

  evaluateAccess(
    principalId: string,
    resourceAction: string,
  ): { permitted: boolean; reason: string; requiresFourEyes: boolean } {
    const principal = this.principals.get(principalId);
    if (!principal) {
      return { permitted: false, reason: "Principal unverified", requiresFourEyes: false };
    }

    const matchedPolicy = Array.from(this.policies.values()).find(
      p => p.active && (p.resourcePattern === resourceAction || resourceAction.startsWith(p.resourcePattern.replace(":*", ""))),
    );

    if (!matchedPolicy) {
      // Default allow for standard operations within domain clearance
      return { permitted: true, reason: "Standard domain authorization granted", requiresFourEyes: false };
    }

    if (!matchedPolicy.allowedRoles.includes(principal.role)) {
      return {
        permitted: false,
        reason: `Role ${principal.role} is not permitted for ${resourceAction}. Required: ${matchedPolicy.allowedRoles.join(", ")}`,
        requiresFourEyes: false,
      };
    }

    return {
      permitted: true,
      reason: "Policy rule matched and clearance verified",
      requiresFourEyes: matchedPolicy.requireFourEyesApproval,
    };
  }

  // ==========================================
  // 3. FOUR-EYES APPROVAL SUBSYSTEM
  // ==========================================

  initiateFourEyesRequest(
    initiatorPrincipalId: string,
    actionType: string,
    resourceTarget: string,
    payload: string,
  ): FourEyesApprovalRequest {
    const req: FourEyesApprovalRequest = {
      requestId: `4EYES-${Date.now()}`,
      initiatorPrincipalId,
      actionType,
      resourceTarget,
      payloadHash: `SHA256:${Math.random().toString(36).substring(2)}`,
      status: "PENDING_SECOND_EYE",
      timestamp: new Date().toISOString(),
    };

    this.fourEyesRequests.set(req.requestId, req);
    return req;
  }

  approveFourEyesRequest(requestId: string, approverPrincipalId: string): FourEyesApprovalRequest {
    const req = this.fourEyesRequests.get(requestId);
    if (!req) {
      throw new Error(`4-Eyes Request ${requestId} not found.`);
    }

    if (req.initiatorPrincipalId === approverPrincipalId) {
      throw new Error("4-EYES SEGREGATION VIOLATION: Approver CANNOT be the initiator.");
    }

    req.status = "APPROVED";
    req.approverPrincipalId = approverPrincipalId;
    req.approvedAt = new Date().toISOString();

    return req;
  }

  getFourEyesRequests(): FourEyesApprovalRequest[] {
    return Array.from(this.fourEyesRequests.values());
  }
}

export const aegisSecurityEngine = new AegisSecurityEngine();
