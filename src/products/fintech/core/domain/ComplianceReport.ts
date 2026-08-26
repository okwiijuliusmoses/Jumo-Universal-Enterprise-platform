export type ReportType = 'AML_SCREENING' | 'TRANSACTION_MONITORING' | 'REGULATORY_FILING' | 'AUDIT_LOG';
export type ReportStatus = 'DRAFT' | 'GENERATED' | 'FILED' | 'ARCHIVED';

export interface ComplianceReport {
  id: string;
  tenantId: string;
  type: ReportType;
  status: ReportStatus;
  periodStart: string;
  periodEnd: string;
  generatedBy: string;
  generatedAt: string;
  data: any; // The actual report content
  signatures?: string[];
}

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  condition: string; // e.g., Rule engine expression
  action: 'ALERT' | 'BLOCK' | 'FLAG_FOR_REVIEW';
  isActive: boolean;
}

export interface ComplianceViolation {
  id: string;
  ruleId: string;
  transactionId?: string;
  identityId?: string;
  timestamp: string;
  details: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'FALSE_POSITIVE';
}
