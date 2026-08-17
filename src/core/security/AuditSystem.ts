// JUMO UEOS — Sovereign Audit System
// Canonical projection of audit logs backed by CanonicalEnterpriseLedgerFabric

import { CanonicalEnterpriseLedgerFabric } from "../ledger/CanonicalEnterpriseLedgerFabric";

export interface AuditLog {
  action: string;
  operator: string;
  target: string;
  timestamp: number;
  status: 'APPROVED' | 'REJECTED';
  details?: Record<string, any>;
}

export class AuditSystem {
  private static ledger = CanonicalEnterpriseLedgerFabric.getInstance();

  static logAction(log: AuditLog) {
    this.ledger.appendEntry({
      actor: {
        identity: log.operator,
        role: 'AUDITOR',
        actorType: 'HUMAN_OPERATOR'
      },
      tenantId: 'TENANT-GLOBAL-ROOT',
      domain: 'AUDIT',
      eventType: log.action,
      payload: {
        target: log.target,
        status: log.status,
        ...log.details
      },
      source: 'src/core/security/AuditSystem.ts',
      correlationId: `AUDIT-EVT-${log.timestamp}`
    });
  }

  static getLogs(limit = 100) {
    return this.ledger.getEntriesByDomain('AUDIT', limit);
  }
}
