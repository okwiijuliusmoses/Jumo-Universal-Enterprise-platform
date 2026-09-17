/**
 * JUMO UEOS — Automated Restoration Backlog Generator
 * 
 * Automatically parses gaps between Authoritative Product Manifests and
 * the Implementation Registry, synthesizing itemized backlogs with stable IDs,
 * parent hierarchies, dependencies, and target file paths.
 */

import { JumoMasterManifestRegistry } from '../specification/manifests/masterManifestRegistry';
import { JumoProductCompletenessGate, JumoProductCompletenessReport } from './JumoProductCompletenessGate';

export interface JumoRestorationBacklogItem {
  id: string;
  productId: string;
  category: string;
  name: string;
  parent: string;
  status: 'MISSING' | 'UNVERIFIED' | 'BROKEN';
  dependencies: string[];
  missingEvidence: string[];
  targetImplementationPath: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export class JumoRestorationBacklogGenerator {

  /**
   * Generates an itemized backlog for a product
   */
  public static generateBacklog(productId: string): {
    productCode: string;
    productName: string;
    totalBacklogItems: number;
    items: JumoRestorationBacklogItem[];
    markdownReport: string;
  } {
    const report = JumoProductCompletenessGate.auditProduct(productId);
    const manifest = JumoMasterManifestRegistry.get(productId);
    if (!manifest) throw new Error(`Manifest not found for ${productId}`);

    const items: JumoRestorationBacklogItem[] = [];

    // 1. Process Missing Modules
    manifest.modules.forEach(mod => {
      if (report.missingObjectIds.includes(mod.id) || report.unverifiedObjectIds.includes(mod.id)) {
        const isMissing = report.missingObjectIds.includes(mod.id);
        items.push({
          id: mod.id,
          productId: manifest.productId,
          category: 'MODULE',
          name: mod.title,
          parent: `Office: ${mod.officeId} (Dept: ${mod.departmentId})`,
          status: isMissing ? 'MISSING' : 'UNVERIFIED',
          dependencies: [...mod.capabilityIds, ...mod.databaseEntityIds, ...mod.apiIds],
          missingEvidence: isMissing ? ['Source implementation', 'Runtime registration', 'UI Metadata'] : ['Functional verification'],
          targetImplementationPath: `/src/products/${manifest.productCode.toLowerCase()}/modules/${mod.code}.ts`,
          priority: 'CRITICAL'
        });
      }
    });

    // 2. Process Missing Portals
    manifest.portals.forEach(portal => {
      if (report.missingObjectIds.includes(portal.id) || report.unverifiedObjectIds.includes(portal.id)) {
        items.push({
          id: portal.id,
          productId: manifest.productId,
          category: 'PORTAL',
          name: portal.name,
          parent: `Product: ${manifest.productName}`,
          status: report.missingObjectIds.includes(portal.id) ? 'MISSING' : 'UNVERIFIED',
          dependencies: ['Shared Portal Engine', 'RBAC Auth Switch'],
          missingEvidence: ['Route registration', 'Portal shell mounting'],
          targetImplementationPath: `/src/products/${manifest.productCode.toLowerCase()}/portals/${portal.code}.tsx`,
          priority: 'CRITICAL'
        });
      }
    });

    // 3. Process Missing UI Metadata & Screens
    manifest.screens.forEach(screen => {
      if (report.missingObjectIds.includes(screen.id) || report.unverifiedObjectIds.includes(screen.id)) {
        items.push({
          id: screen.id,
          productId: manifest.productId,
          category: 'SCREEN',
          name: screen.title,
          parent: `Module: ${screen.moduleId}`,
          status: report.missingObjectIds.includes(screen.id) ? 'MISSING' : 'UNVERIFIED',
          dependencies: [screen.moduleId, 'Universal Metadata Runtime'],
          missingEvidence: ['Screen metadata definition', 'Route view binding'],
          targetImplementationPath: `/src/products/${manifest.productCode.toLowerCase()}/screens/${screen.id}.ts`,
          priority: 'HIGH'
        });
      }
    });

    // 4. Process Missing Database Entities
    manifest.databaseEntities.forEach(db => {
      if (report.missingObjectIds.includes(db.id) || report.unverifiedObjectIds.includes(db.id)) {
        items.push({
          id: db.id,
          productId: manifest.productId,
          category: 'DATABASE_ENTITY',
          name: db.tableName,
          parent: `Module: ${db.moduleId}`,
          status: report.missingObjectIds.includes(db.id) ? 'MISSING' : 'UNVERIFIED',
          dependencies: ['FAAP Ledger / Database Engine'],
          missingEvidence: ['Table migration schema', 'Repository accessor'],
          targetImplementationPath: `/src/database/schema/${db.tableName}.ts`,
          priority: 'HIGH'
        });
      }
    });

    // Generate Markdown Report
    let md = `# RESTORATION BACKLOG: ${manifest.productName.toUpperCase()}\n`;
    md += `**Product ID:** \`${manifest.productId}\` | **Total Items in Backlog:** \`${items.length}\`\n\n`;
    md += `| ID | Category | Name | Parent | Status | Target Path | Priority |\n`;
    md += `|---|---|---|---|---|---|:---:|\n`;
    items.slice(0, 50).forEach(item => {
      md += `| \`${item.id}\` | ${item.category} | ${item.name} | ${item.parent} | **${item.status}** | \`${item.targetImplementationPath}\` | **${item.priority}** |\n`;
    });
    if (items.length > 50) {
      md += `\n*... and ${items.length - 50} additional itemized objects in full backlog registry.*`;
    }

    return {
      productCode: manifest.productCode,
      productName: manifest.productName,
      totalBacklogItems: items.length,
      items,
      markdownReport: md
    };
  }
}
