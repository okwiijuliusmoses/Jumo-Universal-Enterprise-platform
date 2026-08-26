/**
 * JUMO UEOS — PHASE 3
 * JUMO_PHASE3_AUDIT_REPORT.ts
 *
 * Report Generator producing machine-readable JSON reports in src/recovery/reports/phase3/
 */

import { JUMOPhase3AuditEngine } from './JUMO_PHASE3_AUDIT_ENGINE';
import { UniversalPhase3AuditReport, ProductAuditRecord } from './JUMO_PHASE3_AUDIT_TYPES';

export class JUMOPhase3AuditReportGenerator {
  public static generateAllReports(): {
    universalReport: UniversalPhase3AuditReport;
    productReports: Record<string, ProductAuditRecord>;
  } {
    const universalReport = JUMOPhase3AuditEngine.executeFullAudit();
    const productReports: Record<string, ProductAuditRecord> = {};

    for (const prod of universalReport.products) {
      productReports[prod.productId] = prod;
    }

    return {
      universalReport,
      productReports
    };
  }
}
