/**
 * JUMO UEOS Audit Engine Module
 */

export interface AuditEntry {
  auditId: string;
  timestamp: string;
  actorId: string;
  actorRole: string;
  action: string;
  resourceTarget: string;
  status: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  ipAddress: string;
  tenantId: string;
  metadata?: Record<string, any>;
}

export class AuditEngine {
  private auditLogs: AuditEntry[] = [
    {
      auditId: 'aud_001',
      timestamp: new Date().toISOString(),
      actorId: 'usr_owner_root',
      actorRole: 'OWNER',
      action: 'SYSTEM_BOOT',
      resourceTarget: 'UEOS_CORE',
      status: 'SUCCESS',
      ipAddress: '10.0.0.1',
      tenantId: 'tenant_owner_global',
    },
    {
      auditId: 'aud_002',
      timestamp: new Date().toISOString(),
      actorId: 'usr_finbank_admin',
      actorRole: 'TENANT',
      action: 'LIQUIDITY_DRAWDOWN_REQUEST',
      resourceTarget: 'TREASURY_POOL_USD',
      status: 'SUCCESS',
      ipAddress: '192.168.1.100',
      tenantId: 'tenant_finbank_01',
    },
  ];

  public logEvent(entry: Omit<AuditEntry, 'auditId' | 'timestamp'>): AuditEntry {
    const newEntry: AuditEntry = {
      ...entry,
      auditId: `aud_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(newEntry);
    return newEntry;
  }

  public getLogs(tenantId?: string): AuditEntry[] {
    if (!tenantId) return this.auditLogs;
    return this.auditLogs.filter((log) => log.tenantId === tenantId || log.tenantId === 'tenant_owner_global');
  }
}

export const auditEngine = new AuditEngine();
