/**
 * JUMO UEOS — Authoritative Benchmark Registry & Cross-Product Normalization Engine
 * Dynamically aggregates forensic extractions from Alpha Academy, QuickBooks, SchoolPay,
 * IUIU Ultimate ERP, and JUMO UEOS Core.
 */

import {
  BenchmarkPackageExtraction,
  BenchmarkCapabilityDef,
  CrossProductGapItem
} from './types';
import { ALPHA_ACADEMY_EXTRACTION } from './AlphaAcademyPackage';
import { QUICKBOOKS_EXTRACTION } from './QuickBooksPackage';
import { SCHOOLPAY_EXTRACTION } from './SchoolPayPackage';
import { IUIU_ULTIMATE_ERP_EXTRACTION } from './IUIUUltimateERPPackage';
import { JUMO_EXISTING_EXTRACTION } from './JumoExistingCapabilityInventory';

export const ALL_BENCHMARK_PACKAGES: Record<string, BenchmarkPackageExtraction> = {
  ALPHA_ACADEMY: ALPHA_ACADEMY_EXTRACTION,
  QUICKBOOKS_ENTERPRISE: QUICKBOOKS_EXTRACTION,
  SCHOOLPAY_NETWORK: SCHOOLPAY_EXTRACTION,
  IUIU_ULTIMATE_ERP: IUIU_ULTIMATE_ERP_EXTRACTION,
  JUMO_EXISTING: JUMO_EXISTING_EXTRACTION
};

export const MASTER_CROSS_PRODUCT_GAPS: CrossProductGapItem[] = [
  {
    gapId: 'GAP-VOTEBOOK-01',
    capabilityName: 'Departmental Vote Book Commitment Accounting',
    sourceSystem: 'IUIU Institutional Model',
    affectedDirectorate: 'Directorate of Financial Services & Bursary',
    affectedOffice: 'Vote Book & Expenditure Control Office',
    jumoTargetMapping: 'FAAP Tier-2 Enterprise Financial Backbone (FAAP-05 / FAAP-14)',
    gapSeverity: 'CRITICAL_P0',
    architecturalRemedy: 'Implement pre-expenditure Vote Book encumbrance checks prior to purchase order approvals.',
    priority: 'P0'
  },
  {
    gapId: 'GAP-PRN-01',
    capabilityName: 'Deterministic Student Payment Code (PRN) Resolution',
    sourceSystem: 'SchoolPay Network',
    affectedDirectorate: 'Directorate of Financial Services & Bursary',
    affectedOffice: 'Student Accounts & Fee Billing Office',
    jumoTargetMapping: 'JUMO Fintech Intelligence & Universal Payment Switch',
    gapSeverity: 'CRITICAL_P0',
    architecturalRemedy: 'Implement real-time PRN resolution endpoint for bank teller and mobile money STK pushes.',
    priority: 'P0'
  },
  {
    gapId: 'GAP-SENATE-01',
    capabilityName: 'Four-Stage Senate Exam Results Moderation & CGPA Engine',
    sourceSystem: 'IUIU Institutional Model',
    affectedDirectorate: 'Directorate of Academic Affairs & Registrar',
    affectedOffice: 'Examinations & Senate Records Office',
    jumoTargetMapping: 'Education ERP Academic Authority Platform (EDU-09 / EDU-10)',
    gapSeverity: 'CRITICAL_P0',
    architecturalRemedy: 'Implement multi-stage marks review (Lecturer -> Dept -> Faculty -> Senate) with retake logs.',
    priority: 'P0'
  },
  {
    gapId: 'GAP-ISOLATION-01',
    capabilityName: 'Strict Role-to-Office Workspace Isolation Architecture',
    sourceSystem: 'IUIU Institutional Model & Alpha Academy',
    affectedDirectorate: 'All 16 Institutional Directorates',
    affectedOffice: 'All 42 Functional Offices',
    jumoTargetMapping: 'JUMO UEOS Universal Shell & Office Workspace Resolver',
    gapSeverity: 'CRITICAL_P0',
    architecturalRemedy: 'Resolve authenticated users directly into isolated functional office workspaces instead of generic dashboards.',
    priority: 'P0'
  },
  {
    gapId: 'GAP-CASHBOOK-01',
    capabilityName: 'Triple Cash Book (Cash, Bank, Discount) Studio',
    sourceSystem: 'IUIU Institutional Model & QuickBooks',
    affectedDirectorate: 'Directorate of Financial Services & Bursary',
    affectedOffice: 'Treasury & Cash Book Office',
    jumoTargetMapping: 'FAAP Core General Ledger & Cash Book (FAAP-01 / FAAP-11)',
    gapSeverity: 'HIGH_P1',
    architecturalRemedy: 'Add dedicated 3-column Cash Book ledger view with automated daily balancing and bank reconciliation.',
    priority: 'P1'
  },
  {
    gapId: 'GAP-CLEARANCE-01',
    capabilityName: 'Multi-Directorate Cryptographic Graduation Clearance',
    sourceSystem: 'IUIU Institutional Model',
    affectedDirectorate: 'Academic Registrar, Bursary, Library, Student Affairs',
    affectedOffice: 'Transcripts & Graduation Attestation Office',
    jumoTargetMapping: 'Education ERP Progressions & Attestation Vault (EDU-01 / EDU-12)',
    gapSeverity: 'HIGH_P1',
    architecturalRemedy: 'Implement 5-office digital sign-off pipeline yielding tamper-evident SHA-256 QR transcripts.',
    priority: 'P1'
  }
];

export function getDynamicBenchmarkMetrics() {
  const packages = Object.values(ALL_BENCHMARK_PACKAGES);
  
  const allPortals = packages.flatMap(p => p.portals);
  const allDirectorates = packages.flatMap(p => p.directorates);
  const allDepartments = packages.flatMap(p => p.departments);
  const allOffices = packages.flatMap(p => p.offices);
  const allRoles = packages.flatMap(p => p.roles);
  const allApplications = packages.flatMap(p => p.applications);
  const allWorkflows = packages.flatMap(p => p.workflows);
  const allScreens = packages.flatMap(p => p.screens);
  const allForms = packages.flatMap(p => p.forms);
  const allDataObjects = packages.flatMap(p => p.dataObjects);
  const allReports = packages.flatMap(p => p.reports);
  const allNotifications = packages.flatMap(p => p.notifications);
  const allIntegrations = packages.flatMap(p => p.integrations);
  const allCapabilities = packages.flatMap(p => p.capabilities);
  
  const totalOperations = allCapabilities.reduce((acc, cap) => acc + cap.operations.length, 0);
  const totalSubmodules = new Set(allCapabilities.map(c => c.submoduleId)).size;
  const totalModules = new Set(allCapabilities.map(c => c.moduleId)).size;
  const totalAiOpportunities = allCapabilities.filter(c => !!c.aiOpportunity).length;
  
  return {
    totalProductsBenchmarked: packages.length,
    totalEcosystemsDiscovered: 5,
    totalPortalsDiscovered: allPortals.length,
    totalDirectoratesDiscovered: allDirectorates.length,
    totalDepartmentsDiscovered: allDepartments.length,
    totalOfficesDiscovered: allOffices.length,
    totalApplicationsDiscovered: allApplications.length,
    totalModulesDiscovered: totalModules,
    totalSubmodulesDiscovered: totalSubmodules,
    totalCapabilitiesDiscovered: allCapabilities.length,
    totalOperationsDiscovered: totalOperations,
    totalWorkflowsDiscovered: allWorkflows.length,
    totalScreensDiscovered: allScreens.length,
    totalFormsDiscovered: allForms.length,
    totalReportsDiscovered: allReports.length,
    totalDataObjectsDiscovered: allDataObjects.length,
    totalIntegrationsDiscovered: allIntegrations.length,
    totalRolesDiscovered: allRoles.length,
    totalNotificationsDiscovered: allNotifications.length,
    totalAiOpportunitiesDiscovered: totalAiOpportunities,
    totalIdentifiedGaps: MASTER_CROSS_PRODUCT_GAPS.length
  };
}
