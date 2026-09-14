
export interface AuditLog {
  action: string;
  operator: string;
  target: string;
  timestamp: number;
  status: 'APPROVED' | 'REJECTED';
}

export class AuditSystem {
  static logs: AuditLog[] = [];

  static logAction(log: AuditLog) {
    this.logs.push(log);
    console.log(`[AuditSystem] ${log.status}: ${log.action} on ${log.target} by ${log.operator} at ${new Date(log.timestamp).toISOString()}`);
  }
}
