import { JumoPlatformAuthoritativeManifest } from './types';

export const JUMO_AEGIS_PLATFORM_MANIFEST: JumoPlatformAuthoritativeManifest = {
  platformId: 'plat-aegis',
  platformCode: 'AEGIS',
  platformName: 'JUMO AEGIS (Sovereign Security, Identity, HSM, PKI & RBAC Platform)',
  classification: 'SHARED_INDEPENDENT_PLATFORM',
  version: '2026.4.0',
  description: 'Enterprise sovereign security platform managing hardware security module (HSM) keys, public key infrastructure (PKI), zero-trust attribute-based access control (ABAC/RBAC), dual-authorization controls, and cryptographic audit proofs.',
  subsystems: [
    {
      id: 'AEGIS-SUB-001',
      code: 'AEGIS_IDENTITY_RBAC',
      name: 'Unified Sovereign Identity & RBAC Subsystem',
      description: 'Centralized tenant directory, role-permission graph, token issuance, and multi-factor authentication.',
      serviceIds: ['AEGIS-SRV-001', 'AEGIS-SRV-002'],
      capabilities: ['JWT Token Issuance', 'Fine-Grained RBAC Evaluation', 'MFA Verification', 'Session Revocation'],
      databaseEntities: ['aegis_users', 'aegis_roles', 'aegis_user_roles', 'aegis_sessions']
    },
    {
      id: 'AEGIS-SUB-002',
      code: 'AEGIS_DUAL_AUTH_HSM',
      name: 'Dual-Authorization & HSM Cryptographic Subsystem',
      description: 'Four-eyes approval engine for high-value financial actions and sovereign signing via HSM keys.',
      serviceIds: ['AEGIS-SRV-003', 'AEGIS-SRV-004'],
      capabilities: ['Maker-Checker Orchestration', 'Digital Signature Signing', 'HSM Key Rotation'],
      databaseEntities: ['aegis_dual_auth_requests', 'aegis_key_rings']
    },
    {
      id: 'AEGIS-SUB-003',
      code: 'AEGIS_AUDIT_PROOFS',
      name: 'Cryptographic Audit Trail & Tamper-Evident Logs',
      description: 'Merkle-tree backed immutable audit logging recording every security-critical event.',
      serviceIds: ['AEGIS-SRV-005'],
      capabilities: ['Immutable Event Streaming', 'Merkle Root Verification', 'Anomaly Detection'],
      databaseEntities: ['aegis_audit_events', 'aegis_merkle_roots']
    }
  ],
  services: [
    {
      id: 'AEGIS-SRV-001',
      code: 'IdentityAuthService',
      name: 'Identity & Authentication Service',
      description: 'Handles login, OAuth2/OIDC claims, biometrics, and SSO federation.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/aegis/auth/login', '/api/v1/aegis/auth/refresh', '/api/v1/aegis/auth/mfa']
    },
    {
      id: 'AEGIS-SRV-002',
      code: 'AccessControlService',
      name: 'Access Control & Permission Evaluator',
      description: 'Zero-trust authorization engine evaluating policies per request.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/aegis/access/evaluate', '/api/v1/aegis/access/roles']
    },
    {
      id: 'AEGIS-SRV-003',
      code: 'DualAuthorizationService',
      name: 'Dual-Authorization & Maker-Checker Service',
      description: 'Enforces maker-checker validation across sensitive actions.',
      serviceTier: 'ORCHESTRATOR',
      endpoints: ['/api/v1/aegis/dual-auth/submit', '/api/v1/aegis/dual-auth/approve']
    },
    {
      id: 'AEGIS-SRV-004',
      code: 'HsmCryptoVaultService',
      name: 'HSM Cryptographic Key Vault Service',
      description: 'Signs transactions and verifies digital certificates with hardware protection.',
      serviceTier: 'VAULT',
      endpoints: ['/api/v1/aegis/crypto/sign', '/api/v1/aegis/crypto/verify']
    },
    {
      id: 'AEGIS-SRV-005',
      code: 'AuditProofStreamService',
      name: 'Tamper-Evident Audit Streaming Service',
      description: 'Appends SHA-256 chained audit entries into secure storage.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/aegis/audit/log', '/api/v1/aegis/audit/verify-chain']
    }
  ],
  extensionPoints: [
    {
      id: 'AEGIS-EXT-001',
      hookName: 'onAccessEvaluated',
      description: 'Invoked before executing any privileged API or mutation in any JUMO product.',
      supportedProducts: [
        'prod-fintech',
        'prod-nursery-primary',
        'prod-secondary-school',
        'prod-university-tertiary',
        'prod-church-faith',
        'prod-alumni-community'
      ],
      requiredProtocol: 'AEGIS_INTERCEPTOR_V1'
    }
  ],
  databaseEntities: [
    {
      id: 'AEGIS-DB-001',
      tableName: 'aegis_users',
      description: 'Global identity and credential repository.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'tenant_id', type: 'VARCHAR(64)', required: true },
        { name: 'username', type: 'VARCHAR(128)', required: true },
        { name: 'email', type: 'VARCHAR(255)', required: true },
        { name: 'is_active', type: 'BOOLEAN', required: true },
        { name: 'created_at', type: 'TIMESTAMP', required: true }
      ]
    },
    {
      id: 'AEGIS-DB-002',
      tableName: 'aegis_audit_events',
      description: 'Immutable cryptographic ledger of system events.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'actor_id', type: 'VARCHAR(64)', required: true },
        { name: 'action', type: 'VARCHAR(128)', required: true },
        { name: 'resource', type: 'VARCHAR(255)', required: true },
        { name: 'prev_hash', type: 'VARCHAR(64)', required: true },
        { name: 'current_hash', type: 'VARCHAR(64)', required: true }
      ]
    }
  ],
  apis: [
    {
      id: 'AEGIS-API-001',
      endpoint: '/api/v1/aegis/auth/login',
      method: 'POST',
      description: 'Authenticates a user and issues sovereign JWT tokens.',
      authLevel: 'PUBLIC'
    },
    {
      id: 'AEGIS-API-002',
      endpoint: '/api/v1/aegis/security/posture',
      method: 'GET',
      description: 'Returns real-time security posture and threat detection telemetry.',
      authLevel: 'PKI_SOVEREIGN'
    }
  ],
  roles: [
    {
      id: 'AEGIS-ROLE-001',
      name: 'Sovereign Security Administrator',
      description: 'Full authority over cryptographic certificates, RBAC assignments, and access policies.',
      permissions: ['aegis:security:all', 'aegis:pki:rotate', 'aegis:audit:inspect']
    }
  ],
  testContracts: [
    {
      id: 'AEGIS-TEST-001',
      targetId: 'AEGIS_IDENTITY_RBAC',
      testType: 'PLATFORM_COMPLIANCE',
      expectedAssertion: 'Unauthenticated requests to protected endpoints must be rejected with 401 Unauthorized.'
    }
  ]
};
