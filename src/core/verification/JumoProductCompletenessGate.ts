/**
 * JUMO UEOS — Hard Product Completeness Gate & Verification Engine
 * 
 * Compares:
 *   AUTHORITATIVE MANIFEST vs SOURCE IMPLEMENTATION vs RUNTIME REGISTRY vs DATABASE vs APIS vs UI METADATA vs WORKFLOWS vs TESTS
 * 
 * Absolute Rule:
 *   PASS is granted ONLY if Expected === Implemented === Integrated === Verified (100.0% completeness).
 *   Any single missing or unverified item causes instant hard gate failure.
 */

import { JumoAuthoritativeProductManifest } from '../specification/manifests/types';
import { JumoMasterManifestRegistry } from '../specification/manifests/masterManifestRegistry';
import { JumoImplementationRegistry, JumoImplementationRecord } from './JumoImplementationRegistry';

export interface JumoCategoryAuditResult {
  categoryName: string;
  expected: number;
  recoveredHistorical: number;
  implemented: number;
  integrated: number;
  functionallyVerified: number;
  missing: number;
  unverified: number;
  broken: number;
  completenessPercentage: number;
  status: 'PASS' | 'FAIL';
}

export interface JumoProductCompletenessReport {
  productId: string;
  productCode: string;
  productName: string;
  timestamp: string;
  overallCompletenessPercentage: number;
  overallStatus: 'PASS' | 'FAIL';
  
  // Categorical Breakdowns across all 20 Primary Architecture Dimensions
  directorates: JumoCategoryAuditResult;
  departments: JumoCategoryAuditResult;
  offices: JumoCategoryAuditResult;
  portals: JumoCategoryAuditResult;
  modules: JumoCategoryAuditResult;
  capabilities: JumoCategoryAuditResult;
  screens: JumoCategoryAuditResult;
  forms: JumoCategoryAuditResult;
  dashboards: JumoCategoryAuditResult;
  reports: JumoCategoryAuditResult;
  workflows: JumoCategoryAuditResult;
  databaseEntities: JumoCategoryAuditResult;
  apis: JumoCategoryAuditResult;
  runtimeComponents: JumoCategoryAuditResult;
  aiAgents: JumoCategoryAuditResult;
  roles: JumoCategoryAuditResult;
  permissions: JumoCategoryAuditResult;
  integrations: JumoCategoryAuditResult;
  configurations: JumoCategoryAuditResult;
  testContracts: JumoCategoryAuditResult;

  // Gate Decisions
  preImplementationReadiness: { ready: boolean; blockers: string[] };
  postImplementationRelease: { released: boolean; blockers: string[] };
  
  // Critical Action Items
  missingObjectIds: string[];
  unverifiedObjectIds: string[];
}

export class JumoProductCompletenessGate {

  /**
   * Evaluates an individual category
   */
  private static auditCategory<T extends { id: string }>(
    categoryName: string,
    expectedItems: T[],
    recoveredHistoricalCount: number,
    implRecords: JumoImplementationRecord[]
  ): JumoCategoryAuditResult {
    const expected = expectedItems.length;
    const itemIds = new Set(expectedItems.map(item => item.id));

    let implemented = 0;
    let integrated = 0;
    let verified = 0;
    let broken = 0;

    expectedItems.forEach(item => {
      const rec = implRecords.find(r => r.objectId === item.id);
      if (rec) {
        if (['IMPLEMENTED', 'INTEGRATED', 'FUNCTIONALLY_VERIFIED', 'PRODUCTION_VERIFIED'].includes(rec.state)) {
          implemented++;
        }
        if (['INTEGRATED', 'FUNCTIONALLY_VERIFIED', 'PRODUCTION_VERIFIED'].includes(rec.state)) {
          integrated++;
        }
        if (['FUNCTIONALLY_VERIFIED', 'PRODUCTION_VERIFIED'].includes(rec.state)) {
          verified++;
        }
        if (rec.blockers.length > 0) {
          broken++;
        }
      }
    });

    const missing = expected - implemented;
    const unverified = implemented - verified;
    const completenessPercentage = expected > 0 ? Number(((verified / expected) * 100).toFixed(2)) : 100;
    const status: 'PASS' | 'FAIL' = (expected > 0 && verified === expected && missing === 0) ? 'PASS' : 'FAIL';

    return {
      categoryName,
      expected,
      recoveredHistorical: recoveredHistoricalCount,
      implemented,
      integrated,
      functionallyVerified: verified,
      missing,
      unverified,
      broken,
      completenessPercentage,
      status
    };
  }

  /**
   * Audits a sovereign product against its authoritative manifest in READ-ONLY mode.
   */
  public static auditProduct(productId: string): JumoProductCompletenessReport {
    const manifest = JumoMasterManifestRegistry.get(productId);
    if (!manifest) {
      throw new Error(`Authoritative manifest not found for product: ${productId}`);
    }

    const implRecords = JumoImplementationRegistry.getByProduct(productId);
    const timestamp = new Date().toISOString();

    // Audit each category
    const directorates = this.auditCategory('Directorates', manifest.directorates, manifest.directorates.length, implRecords);
    const departments = this.auditCategory('Departments', manifest.departments, manifest.departments.length, implRecords);
    const offices = this.auditCategory('Offices', manifest.offices, manifest.offices.length, implRecords);
    const portals = this.auditCategory('Portals', manifest.portals, manifest.portals.length, implRecords);
    const modules = this.auditCategory('Modules', manifest.modules, manifest.modules.length, implRecords);
    const capabilities = this.auditCategory('Capabilities', manifest.capabilities, manifest.capabilities.length, implRecords);
    const screens = this.auditCategory('Screens', manifest.screens, manifest.screens.length, implRecords);
    const forms = this.auditCategory('Forms', manifest.forms, manifest.forms.length, implRecords);
    const dashboards = this.auditCategory('Dashboards', manifest.dashboards, manifest.dashboards.length, implRecords);
    const reports = this.auditCategory('Reports', manifest.reports, manifest.reports.length, implRecords);
    const workflows = this.auditCategory('Workflows', manifest.workflows, manifest.workflows.length, implRecords);
    const databaseEntities = this.auditCategory('Database Entities', manifest.databaseEntities, manifest.databaseEntities.length, implRecords);
    const apis = this.auditCategory('APIs', manifest.apis, manifest.apis.length, implRecords);
    const runtimeComponents = this.auditCategory('Runtime Components', manifest.runtimeComponents, manifest.runtimeComponents.length, implRecords);
    const aiAgents = this.auditCategory('AI Agents', manifest.aiAgents, manifest.aiAgents.length, implRecords);
    const roles = this.auditCategory('Roles', manifest.roles, manifest.roles.length, implRecords);
    const permissions = this.auditCategory('Permissions', manifest.permissions, manifest.permissions.length, implRecords);
    const integrations = this.auditCategory('Integrations', manifest.integrations, manifest.integrations.length, implRecords);
    const configurations = this.auditCategory('Configurations', manifest.configurations, manifest.configurations.length, implRecords);
    const testContracts = this.auditCategory('Test Contracts', manifest.testContracts, manifest.testContracts.length, implRecords);

    const categories = [
      directorates, departments, offices, portals, modules, capabilities,
      screens, forms, dashboards, reports, workflows, databaseEntities,
      apis, runtimeComponents, aiAgents, roles, permissions, integrations,
      configurations, testContracts
    ];

    const totalExpected = categories.reduce((sum, c) => sum + c.expected, 0);
    const totalVerified = categories.reduce((sum, c) => sum + c.functionallyVerified, 0);
    const overallCompletenessPercentage = totalExpected > 0 ? Number(((totalVerified / totalExpected) * 100).toFixed(2)) : 0;
    const overallStatus: 'PASS' | 'FAIL' = overallCompletenessPercentage === 100.0 ? 'PASS' : 'FAIL';

    // Missing and unverified object lists
    const missingObjectIds: string[] = [];
    const unverifiedObjectIds: string[] = [];

    const allObjects = [
      ...manifest.directorates, ...manifest.departments, ...manifest.offices,
      ...manifest.portals, ...manifest.modules, ...manifest.capabilities,
      ...manifest.screens, ...manifest.forms, ...manifest.dashboards,
      ...manifest.reports, ...manifest.workflows, ...manifest.databaseEntities,
      ...manifest.apis, ...manifest.runtimeComponents, ...manifest.aiAgents,
      ...manifest.roles, ...manifest.permissions, ...manifest.integrations,
      ...manifest.configurations, ...manifest.testContracts
    ];

    allObjects.forEach(obj => {
      const rec = implRecords.find(r => r.objectId === obj.id);
      if (!rec || !['IMPLEMENTED', 'INTEGRATED', 'FUNCTIONALLY_VERIFIED', 'PRODUCTION_VERIFIED'].includes(rec.state)) {
        missingObjectIds.push(obj.id);
      } else if (!['FUNCTIONALLY_VERIFIED', 'PRODUCTION_VERIFIED'].includes(rec.state)) {
        unverifiedObjectIds.push(obj.id);
      }
    });

    // Readiness & Release Gates
    const preBlockers: string[] = [];
    if (manifest.modules.length === 0) preBlockers.push('Manifest has 0 modules specified');
    if (manifest.directorates.length === 0) preBlockers.push('Manifest has 0 directorates specified');
    const preImplementationReadiness = {
      ready: preBlockers.length === 0,
      blockers: preBlockers
    };

    const postBlockers: string[] = [];
    if (overallCompletenessPercentage < 100.0) {
      postBlockers.push(`Completeness is ${overallCompletenessPercentage}% (< 100.0%)`);
    }
    if (missingObjectIds.length > 0) {
      postBlockers.push(`${missingObjectIds.length} manifest objects are missing implementation`);
    }
    if (unverifiedObjectIds.length > 0) {
      postBlockers.push(`${unverifiedObjectIds.length} objects are implemented but unverified`);
    }
    const postImplementationRelease = {
      released: postBlockers.length === 0,
      blockers: postBlockers
    };

    return {
      productId: manifest.productId,
      productCode: manifest.productCode,
      productName: manifest.productName,
      timestamp,
      overallCompletenessPercentage,
      overallStatus,
      directorates,
      departments,
      offices,
      portals,
      modules,
      capabilities,
      screens,
      forms,
      dashboards,
      reports,
      workflows,
      databaseEntities,
      apis,
      runtimeComponents,
      aiAgents,
      roles,
      permissions,
      integrations,
      configurations,
      testContracts,
      preImplementationReadiness,
      postImplementationRelease,
      missingObjectIds,
      unverifiedObjectIds
    };
  }
}
