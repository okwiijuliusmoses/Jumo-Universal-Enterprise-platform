/**
 * Domain Template Library
 * Metadata-driven templates for JUMO UEOS domain packages.
 * Consolidated into the Authoritative 4-Product JUMO Architecture.
 */

import { DomainDefinition } from '../types';

export const DomainTemplateLibrary: Record<string, Omit<DomainDefinition, 'id'>> = {
  'edu-alumni': {
    name: 'Education & Alumni',
    displayName: 'JUMO Education & Alumni ERP',
    icon: 'GraduationCap',
    status: 'AVAILABLE',
    config: { onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner', securityIsolation: 'Row-Level' },
    aiProfile: { agentId: 'edu-alumni-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'System prompt for Higher Education academic administration, student retention, and alumni advancement AI.' },
    erpModules: [
      { id: 'ea_mod_01', name: 'Executive Academic Overview', description: 'Student enrollment telemetrics, retention rates, and AI academic advisor.', status: 'ACTIVE', config: {} },
      { id: 'ea_mod_02', name: 'Tuition & Alumni Giving Gateway', description: 'Automated M-Pesa, SWIFT, scholarship billing, and endowment trust fundraising.', status: 'ACTIVE', config: {} },
      { id: 'ea_mod_03', name: 'Student & Alumni Census', description: 'Online QR student enrollment and alumni directory registry.', status: 'ACTIVE', config: {} },
      { id: 'ea_mod_04', name: 'Separated Institutional Portals', description: 'Dean, Lecturer, Student, and Alumni Networking Portals.', status: 'ACTIVE', config: {} },
      { id: 'ea_mod_05', name: 'Credential Verification Seal', description: 'Cryptographic SHA-256 degree and transcript authentication.', status: 'ACTIVE', config: {} },
      { id: 'ea_mod_06', name: 'Mentorship & Neural Matching', description: 'AI matching of graduating students with executive alumni mentors.', status: 'ACTIVE', config: {} }
    ],
    manifest: {
      name: 'Education & Alumni ERP',
      version: '3.0.0',
      type: 'enterprise-domain',
      dependencies: ['JUMO Identity', 'FAAP', 'Workflow Engine', 'AI Fabric'],
      modules: ['members', 'chapters', 'events', 'fundraising', 'mentorship', 'verification', 'sis', 'registrar'],
      security: 'schema-isolated',
      billing: 'subscription'
    }
  },
  'church': {
    name: 'Church & Diocese',
    displayName: 'JUMO Church & Diocese ERP',
    icon: 'Heart',
    status: 'AVAILABLE',
    config: { onboardingPolicy: 'Auto-approve', approvalPolicy: 'Strict Single Owner', securityIsolation: 'Schema-Level' },
    aiProfile: { agentId: 'church-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'System prompt for Ecclesiastical administration, pastoral care, and synod governance.' },
    erpModules: [
      { id: 'ch_mod_01', name: 'Executive Ministry Overview', description: 'Congregation demographics, cell group health, and AI pastoral copilot.', status: 'ACTIVE', config: {} },
      { id: 'ch_mod_02', name: 'Tithe & Pledge Payment Engine', description: 'Automated M-Pesa, MTN, and SWIFT tithing, pledges, and canonical reporting.', status: 'ACTIVE', config: {} },
      { id: 'ch_mod_03', name: 'Demographic Census & Self-Reg', description: 'QR kiosk self-registration with age cohorts, gender, and marital profiling.', status: 'ACTIVE', config: {} },
      { id: 'ch_mod_04', name: 'Separated Ecclesiastical Portals', description: 'Dedicated portals for Clergy, Lay Readers, Support Staff, and Members.', status: 'ACTIVE', config: {} },
      { id: 'ch_mod_05', name: 'Document Verification Suite', description: 'AI vision verification of baptismal, marriage, and ordination certificates.', status: 'ACTIVE', config: {} },
      { id: 'ch_mod_06', name: 'Digital Museum & Archive', description: 'Centuries of parish registers, royal decrees, and sermon audio archives.', status: 'ACTIVE', config: {} }
    ]
  },
  'finpay': {
    name: 'Financial & Digital Pay',
    displayName: 'JUMO Financial & Digital Pay Platform',
    icon: 'Landmark',
    status: 'AVAILABLE',
    config: { onboardingPolicy: 'Manual Review', approvalPolicy: 'Dual Consent', securityIsolation: 'Hardware Sandbox' },
    aiProfile: { agentId: 'finpay-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'System prompt for sovereign banking, credit risk, digital payments, and liquidity AI.' },
    erpModules: [
      { id: 'fp_mod_01', name: 'Executive Overview & AI Copilot', description: 'Real-time treasury liquidity, capital adequacy, and payment switch telemetrics.', status: 'ACTIVE', config: {} },
      { id: 'fp_mod_02', name: 'Automated Ledger & Clearing Engine', description: 'FAAP double-entry general ledger with RTGS, SWIFT, and Mobile Money switch clearing.', status: 'ACTIVE', config: {} },
      { id: 'fp_mod_03', name: 'Merchant Census & KYC Hub', description: 'Automated biometric identity verification and AML risk scoring for merchants.', status: 'ACTIVE', config: {} },
      { id: 'fp_mod_04', name: 'Treasury & Split Clearing Router', description: 'Global treasury routing with automated 1.5% settlement fee calculation.', status: 'ACTIVE', config: {} },
      { id: 'fp_mod_05', name: 'SchoolPay & Collection Ingress', description: 'Universal student fee collection engine via 10-digit candidate codes.', status: 'ACTIVE', config: {} },
      { id: 'fp_mod_06', name: 'AEGIS 10-W Master Ledger', description: 'Immutable double-entry cryptographic transaction audit trail.', status: 'ACTIVE', config: {} }
    ]
  },
  'control': {
    name: 'Control Center',
    displayName: 'JUMO Consolidated Control Center',
    icon: 'Cloud',
    status: 'AVAILABLE',
    config: { onboardingPolicy: 'Manual Review', approvalPolicy: 'Strict Single Owner', securityIsolation: 'Database-Level' },
    aiProfile: { agentId: 'control-ai', modelName: 'JUMO AI Enterprise Engine', promptTemplate: 'System prompt for Ring-0 sovereign administration and governance.' },
    erpModules: [
      { id: 'cc_overview', name: 'System Monitoring & Observability', description: 'Real-time cluster health and telemetry.', status: 'ACTIVE', config: {} },
      { id: 'cc_registry', name: 'Platform Store & Registry', description: 'Official catalog for enterprise capabilities.', status: 'ACTIVE', config: {} },
      { id: 'cc_security', name: 'AEGIS Security Operations', description: 'Zero-Trust access control and secrets vault.', status: 'ACTIVE', config: {} },
      { id: 'cc_ai_cmd', name: 'AI Command Center', description: 'Multi-model router and agent workforce registry.', status: 'ACTIVE', config: {} },
      { id: 'cc_infra', name: 'Cloud & Infrastructure Console', description: 'K8s, DB, and network management.', status: 'ACTIVE', config: {} },
      { id: 'cc_governance', name: 'JUMO TRUST & Governance', description: 'Institutional integrity and compliance auditing.', status: 'ACTIVE', config: {} }
    ]
  }
};
