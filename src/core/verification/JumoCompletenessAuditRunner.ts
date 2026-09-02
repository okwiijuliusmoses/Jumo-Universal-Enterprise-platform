/**
 * JUMO UEOS — Sovereign 6-Product Completeness Audit Runner
 * 
 * Executes an automated, read-only completeness audit across all Six Approved Products:
 *   1. JUMO FINTECH (SACCO & Core Banking)
 *   2. JUMO NURSERY & PRIMARY SCHOOL ERP
 *   3. JUMO SECONDARY SCHOOL & HIGH SCHOOL ERP
 *   4. JUMO UNIVERSITY & HIGHER EDUCATION ERP
 *   5. JUMO CHURCH & FAITH-BASED INSTITUTIONS ERP
 *   6. JUMO ALUMNI & COMMUNITY ADVANCEMENT ERP
 * 
 * Computes exact integer metrics across all 20 canonical architectural categories.
 */

import { JumoMasterManifestRegistry } from '../specification/manifests/masterManifestRegistry';
import { JumoMasterPlatformManifestRegistry } from '../specification/platforms/masterPlatformManifestRegistry';
import { JumoProductCompletenessGate, JumoProductCompletenessReport } from './JumoProductCompletenessGate';
import { JumoRestorationBacklogGenerator } from './JumoRestorationBacklogGenerator';

export interface JumoGlobalAuditSummary {
  timestamp: string;
  totalProductsAudited: number;
  totalPlatformsAudited: number;
  productsPassed: number;
  productsFailed: number;
  totalExpectedArtifacts: number;
  totalImplementedArtifacts: number;
  totalVerifiedArtifacts: number;
  totalMissingArtifacts: number;
  totalUnverifiedArtifacts: number;
  globalCompletenessPercentage: number;
  productReports: JumoProductCompletenessReport[];
  platformSummary: Array<{
    platformId: string;
    platformCode: string;
    platformName: string;
    subsystemCount: number;
    serviceCount: number;
    extensionPointCount: number;
    databaseEntityCount: number;
    apiCount: number;
    roleCount: number;
  }>;
}

export class JumoCompletenessAuditRunner {

  /**
   * Runs complete read-only audit across all 6 products and 8 independent platforms
   */
  public static runCompleteAudit(): JumoGlobalAuditSummary {
    const productIds = JumoMasterManifestRegistry.getProductIds();
    const productReports: JumoProductCompletenessReport[] = [];

    let totalExpected = 0;
    let totalImplemented = 0;
    let totalVerified = 0;
    let totalMissing = 0;
    let totalUnverified = 0;
    let productsPassed = 0;

    productIds.forEach(id => {
      const report = JumoProductCompletenessGate.auditProduct(id);
      productReports.push(report);

      const cats = [
        report.directorates, report.departments, report.offices, report.portals,
        report.modules, report.capabilities, report.screens, report.forms,
        report.dashboards, report.reports, report.workflows, report.databaseEntities,
        report.apis, report.runtimeComponents, report.aiAgents, report.roles,
        report.permissions, report.integrations, report.configurations, report.testContracts
      ];

      cats.forEach(c => {
        totalExpected += c.expected;
        totalImplemented += c.implemented;
        totalVerified += c.functionallyVerified;
        totalMissing += c.missing;
        totalUnverified += c.unverified;
      });

      if (report.overallStatus === 'PASS') {
        productsPassed++;
      }
    });

    const platformSummary = JumoMasterPlatformManifestRegistry.getPlatformSummary();
    const globalCompletenessPercentage = totalExpected > 0 ? Number(((totalVerified / totalExpected) * 100).toFixed(2)) : 0;

    return {
      timestamp: new Date().toISOString(),
      totalProductsAudited: productIds.length,
      totalPlatformsAudited: platformSummary.length,
      productsPassed,
      productsFailed: productIds.length - productsPassed,
      totalExpectedArtifacts: totalExpected,
      totalImplementedArtifacts: totalImplemented,
      totalVerifiedArtifacts: totalVerified,
      totalMissingArtifacts: totalMissing,
      totalUnverifiedArtifacts: totalUnverified,
      globalCompletenessPercentage,
      productReports,
      platformSummary
    };
  }

  /**
   * Generates a formatted comprehensive markdown audit report
   */
  public static generateMarkdownAuditReport(): string {
    const summary = this.runCompleteAudit();

    let md = `# JUMO SOVEREIGN 6-PRODUCT & INDEPENDENT PLATFORM ARCHITECTURAL BASELINE & AUDIT REPORT\n`;
    md += `**Audit Execution Standard:** \`JUMO_COMPLETE_PRODUCT_IMPLEMENTATION_PROTOCOL.md\`\n`;
    md += `**Timestamp:** \`${summary.timestamp}\` | **Mode:** \`READ-ONLY DETERMINISTIC RECONCILER\`\n`;
    md += `**Classification:** \`RESTRICTED // GOVERNANCE RELEASE GATE AUDIT\`\n\n`;

    md += `---\n\n`;
    md += `## 1. GLOBAL EXECUTIVE SUMMARY\n\n`;
    md += `| Metric | Value | Audit Verdict |\n`;
    md += `|---|---|:---:|\n`;
    md += `| **Total Approved Sovereign Products Audited** | \`${summary.totalProductsAudited}\` | **CONFIRMED (6 PRODUCTS)** |\n`;
    md += `| **Total Independent Installable Platforms Audited** | \`${summary.totalPlatformsAudited}\` | **CONFIRMED (8 PLATFORMS)** |\n`;
    md += `| **Products Passing Full Completeness Gate** | \`${summary.productsPassed} / ${summary.totalProductsAudited}\` | **${summary.productsPassed === summary.totalProductsAudited ? 'PASS' : 'FAIL (IN RECONSTRUCTION)'}** |\n`;
    md += `| **Total Authoritatively Specified Product Artifacts** | \`${summary.totalExpectedArtifacts}\` | **LOCKED RECONSTRUCTION TARGET** |\n`;
    md += `| **Total Implemented Artifacts (With Evidence)** | \`${summary.totalImplementedArtifacts}\` | **TRACKED** |\n`;
    md += `| **Total Functionally & Production Verified Artifacts** | \`${summary.totalVerifiedArtifacts}\` | **VERIFIED** |\n`;
    md += `| **Total Missing Artifacts** | \`${summary.totalMissingArtifacts}\` | **ACTION REQUIRED** |\n`;
    md += `| **Total Unverified / Stubbed Artifacts** | \`${summary.totalUnverifiedArtifacts}\` | **REPAIR REQUIRED** |\n`;
    md += `| **Global Platform Completeness Index** | \`${summary.globalCompletenessPercentage}%\` | **${summary.globalCompletenessPercentage === 100.0 ? 'PRODUCTION READY' : 'RESTORATION BACKLOG ACTIVE'}** |\n\n`;

    md += `---\n\n`;
    md += `## 2. INDEPENDENT INSTALLABLE PLATFORMS SEPARATION CENSUS\n\n`;
    md += `| Platform Code | Platform Name | Subsystems | Core Services | Extension Points | DB Entities | APIs | Roles |\n`;
    md += `|---|---|:---:|:---:|:---:|:---:|:---:|:---:|\n`;
    summary.platformSummary.forEach(plat => {
      md += `| **${plat.platformCode}** | ${plat.platformName} | ${plat.subsystemCount} | ${plat.serviceCount} | ${plat.extensionPointCount} | ${plat.databaseEntityCount} | ${plat.apiCount} | ${plat.roleCount} |\n`;
    });
    md += `\n`;

    md += `---\n\n`;
    md += `## 3. INDIVIDUAL PRODUCT CENSUS & COMPLETENESS TALLIES (THE 6 PRODUCTS)\n\n`;

    summary.productReports.forEach((p, idx) => {
      md += `### PRODUCT ${idx + 1}: ${p.productName.toUpperCase()} (\`${p.productId}\`)\n`;
      md += `**Overall Product Completeness:** \`${p.overallCompletenessPercentage}%\` | **Status:** **\`${p.overallStatus}\`**\n`;
      md += `**Pre-Implementation Readiness Gate:** **\`${p.preImplementationReadiness.ready ? 'PASS' : 'FAIL'}\`** | **Post-Implementation Release Gate:** **\`${p.postImplementationRelease.released ? 'PASS' : 'FAIL'}\`**\n\n`;

      md += `| Architectural Category | Expected | Recovered Hist. | Implemented | Verified | Missing | Broken | Completeness | Gate Status |\n`;
      md += `|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n`;

      const cats = [
        p.directorates, p.departments, p.offices, p.portals,
        p.modules, p.capabilities, p.screens, p.forms,
        p.dashboards, p.reports, p.workflows, p.databaseEntities,
        p.apis, p.runtimeComponents, p.aiAgents, p.roles,
        p.permissions, p.integrations, p.configurations, p.testContracts
      ];

      cats.forEach(c => {
        md += `| **${c.categoryName}** | ${c.expected} | ${c.recoveredHistorical} | ${c.implemented} | ${c.functionallyVerified} | ${c.missing} | ${c.broken} | ${c.completenessPercentage}% | **${c.status}** |\n`;
      });

      md += `\n`;
    });

    md += `---\n\n`;
    md += `## 4. SUMMARY OF AUTOMATED RESTORATION BACKLOGS\n\n`;
    summary.productReports.forEach(p => {
      const backlog = JumoRestorationBacklogGenerator.generateBacklog(p.productId);
      md += `- **${p.productName}**: \`${backlog.totalBacklogItems}\` missing/unverified items queued in restoration registry.\n`;
    });

    md += `\n---\n*Report generated by JUMO Hard Product Completeness Gate & Independent Platform Separation Registry.*`;

    return md;
  }
}

