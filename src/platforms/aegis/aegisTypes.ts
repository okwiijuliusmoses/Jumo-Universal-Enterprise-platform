/**
 * JUMO AEGIS SECURITY PLATFORM
 * Zero-Trust Policy Matrix, RBAC/ABAC & Cryptographic Signing Contracts
 * Authority: JUMO UEOS Architecture V2.0
 */

export type UserRole =
  | "SYSTEM_SUPER_ADMIN"
  | "CHIEF_FINANCIAL_CONTROLLER"
  | "ACADEMIC_REGISTRAR"
  | "HOSPITAL_DIRECTOR"
  | "SACCO_MANAGER"
  | "CHURCH_ADMINISTRATOR"
  | "AUDITOR_GENERAL"
  | "OPERATIONAL_CLERK";

export type SecurityClassification =
  | "PUBLIC"
  | "INTERNAL_RESTRICTED"
  | "CONFIDENTIAL"
  | "STATUTORY_PROTECTED"
  | "TOP_SECRET_CRYPTOGRAPHIC";

export interface AegisSecurityPrincipal {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  institutionId: string;
  department: string;
  clearanceLevel: SecurityClassification;
  mfaEnforced: boolean;
  hsmKeyFingerprint: string;
}

export interface AccessPolicyRule {
  id: string;
  name: string;
  resourcePattern: string; // e.g. "faap:gl:*", "digitalpay:settlement:*"
  allowedRoles: UserRole[];
  minimumClearance: SecurityClassification;
  requireFourEyesApproval: boolean;
  active: boolean;
}

export interface SecurityAuditToken {
  tokenId: string;
  principalId: string;
  issuedAt: string;
  expiresAt: string;
  sessionHash: string;
  signatureProof: string;
}

export interface FourEyesApprovalRequest {
  requestId: string;
  initiatorPrincipalId: string;
  actionType: string;
  resourceTarget: string;
  payloadHash: string;
  approverPrincipalId?: string;
  status: "PENDING_SECOND_EYE" | "APPROVED" | "REJECTED";
  timestamp: string;
  approvedAt?: string;
}
