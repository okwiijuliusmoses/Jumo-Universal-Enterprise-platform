/**
 * JUMO UEOS — PHASE 3A
 * JUMO_PHASE3_AUDIT_ENGINE.ts
 *
 * Master Forensic Audit Engine that coordinates audit across all 6 sovereign products.
 */

import { JUMOPhase3ProductAudit } from './JUMO_PHASE3_PRODUCT_AUDIT';
import { UniversalPhase3AuditReport, ProductAuditRecord } from './JUMO_PHASE3_AUDIT_TYPES';

export const AUTHORITATIVE_SIX_PRODUCT_IDS = [
  "JUMO-FINTECH",
  "JUMO-NURSERY-PRIMARY-ERP",
  "JUMO-SECONDARY-ERP",
  "JUMO-ALUMNI",
  "JUMO-CHURCH",
  "JUMO-CONTROL"
] as const;

export class JUMOPhase3AuditEngine {
  public static executeFullAudit(): UniversalPhase3AuditReport {
    const products: ProductAuditRecord[] = [];
    let totalModulesAudited = 0;
    let functionalRuntimeModules = 0;
    let staticPlaceholderModules = 0;

    const loginRoutesAudited: UniversalPhase3AuditReport['loginRoutesAudited'] = [];

    const routeMap: Record<string, string> = {
      "JUMO-FINTECH": "/products/fintech/login",
      "JUMO-NURSERY-PRIMARY-ERP": "/products/nursery-primary/login",
      "JUMO-SECONDARY-ERP": "/products/secondary/login",
      "JUMO-ALUMNI": "/products/alumni/login",
      "JUMO-CHURCH": "/products/church/login",
      "JUMO-CONTROL": "/products/owners-control-center/login"
    };

    for (const pid of AUTHORITATIVE_SIX_PRODUCT_IDS) {
      const productAudit = JUMOPhase3ProductAudit.auditProduct(pid);
      products.push(productAudit);

      totalModulesAudited += productAudit.totalModules;
      functionalRuntimeModules += productAudit.functionalModules;
      staticPlaceholderModules += productAudit.staticModules + productAudit.placeholderModules;

      loginRoutesAudited.push({
        productId: pid,
        route: routeMap[pid] || `/products/${pid.toLowerCase()}/login`,
        status: productAudit.loginRouteStatus,
        error: productAudit.loginRouteError
      });
    }

    const allLoginsPassing = loginRoutesAudited.every(l => l.status === "PASS");
    const overallParityPercentage = (functionalRuntimeModules / (totalModulesAudited || 1)) * 100;

    return {
      generatedAt: new Date().toISOString(),
      version: "3.0.0",
      phase: "PHASE_3_FORENSIC_AUDIT_AND_RECONSTRUCTION",
      overallParityPercentage,
      totalModulesAudited,
      functionalRuntimeModules,
      staticPlaceholderModules,
      loginRoutesAudited,
      products
    };
  }
}
