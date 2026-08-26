export interface DomainEcosystem {
  id: string;
  domainId?: string;
  name: string;
  sector: 'ALUMNI' | 'CHURCH' | 'SCHOOL' | 'SACCO' | 'NGO' | 'GOV' | 'HOSPITALITY' | 'LEGAL' | 'CORPORATE' | 'HOSPITALITY_EOS' | string;
  description: string;
  modules: string[];
  capabilities?: string[];
  status: 'ACTIVE' | 'PROVISIONING' | 'UPGRADING' | 'DEPRECATED';
  tenantCount?: number;
  activeTenants?: number;
  aiAgentCount?: number;
  phases?: string[];
}

const INITIAL_ECOSYSTEMS: DomainEcosystem[] = [
  {
    id: 'domain_hospitality',
    name: 'Hospitality-EOS (Digital Hybrid)',
    sector: 'HOSPITALITY',
    description: 'Next-generation Hospitality Enterprise Operating System unifying accommodation, tourism, food service, entertainment, events, property management, guest experience, finance, AI, and smart-building technologies.',
    modules: ['Smart Digital Twin', 'AI Intelligence Network', 'Smart Guest Identity', 'Smart Rooms', 'Commerce & POS', 'Event & Venue Platform', 'Tourism & Destination', 'Workforce ERP', 'Facility IoT', 'Experience Intel', 'Sustainability & Green'],
    status: 'ACTIVE',
    tenantCount: 142,
    aiAgentCount: 18,
    phases: [
      'Phase 1 – Hospitality Digital Ecosystem Foundation',
      'Phase 2 – Smart Hospitality Digital Twin',
      'Phase 3 – Hospitality AI Intelligence Network',
      'Phase 4 – Smart Guest Identity Platform',
      'Phase 5 – Smart Rooms',
      'Phase 6 – Guest Digital Companion',
      'Phase 7 – Hospitality Commerce Platform',
      'Phase 8 – Event & Venue Enterprise Platform',
      'Phase 9 – Tourism & Destination Platform',
      'Phase 10 – Hospitality Workforce Platform',
      'Phase 11 – Smart Facility Management',
      'Phase 12 – Hospitality Experience Intelligence',
      'Phase 13 – Digital Communication Centre',
      'Phase 14 – Sustainability & Green Hospitality',
      'Phase 15 – Hospitality ERP Marketplace'
    ]
  },
  {
    id: 'domain_sacco',
    name: 'SACCO & Microfinance ERP',
    sector: 'SACCO',
    description: 'Complete SACCO management system with automated savings, loans, dividend calculation, and 1.5% FAAP treasury routing.',
    modules: ['Member Onboarding', 'Savings & Share Capital', 'Loan Appraisal Engine', 'Dividend Distribution', 'Treasury & FAAP Integration'],
    status: 'ACTIVE',
    tenantCount: 89,
    aiAgentCount: 12
  },
  {
    id: 'domain_church',
    name: 'Church & Diocese ERP',
    sector: 'CHURCH',
    description: 'Diocesan operations, parish management, tithe tracking, clergy assignment, and community outreach coordination.',
    modules: ['Parish & Diocese Registry', 'Tithe & Offering Accounting', 'Clergy & Staff Deployment', 'Asset & Land Management', 'Community Outreach'],
    status: 'ACTIVE',
    tenantCount: 64,
    aiAgentCount: 8
  },
  {
    id: 'domain_school',
    name: 'School & University ERP',
    sector: 'SCHOOL',
    description: 'Academic institution management with admissions, student records, fee billing, grading, and alumni identity wallet.',
    modules: ['Admissions & Enrollment', 'Fee Billing & Scholarships', 'Academic Grading & Transcripts', 'Alumni Identity Wallet', 'Hostel Management'],
    status: 'ACTIVE',
    tenantCount: 115,
    aiAgentCount: 14
  },
  {
    id: 'domain_ngo',
    name: 'NGO & Humanitarian ERP',
    sector: 'NGO',
    description: 'Grant management, donor compliance, project tracking, field operations, and fund accountability.',
    modules: ['Grant & Donor Accounting', 'Project Budgeting', 'Field Procurement', 'Compliance Reporting', 'Impact Tracking'],
    status: 'ACTIVE',
    tenantCount: 41,
    aiAgentCount: 6
  },
  {
    id: 'domain_gov',
    name: 'Government & Municipal ERP',
    sector: 'GOV',
    description: 'Public sector administration, revenue collection, citizen portal, infrastructure planning, and municipal budgeting.',
    modules: ['Citizen Identity Registry', 'Tax & Revenue Collection', 'Municipal Budgeting', 'Public Works & Procurement', 'E-Governance Portal'],
    status: 'ACTIVE',
    tenantCount: 19,
    aiAgentCount: 22
  },
  {
    id: 'domain_legal',
    name: 'Legal & Judiciary ERP',
    sector: 'LEGAL',
    description: 'Court case tracking, law firm billing, document archiving, compliance auditing, and contract analytics.',
    modules: ['Case Management', 'Trust Accounting', 'Document Vault', 'Compliance Auditing', 'AI Legal Researcher'],
    status: 'ACTIVE',
    tenantCount: 28,
    aiAgentCount: 10
  },
  {
    id: 'domain_alumni',
    name: 'Global Alumni Federation',
    sector: 'ALUMNI',
    description: 'Sovereign alumni identity wallet, fundraising, endowment fund accounting, mentorship, and career networking.',
    modules: ['Alumni Directory', 'Sovereign Identity Wallet', 'Endowment Accounting', 'Mentorship Matching', 'Event Ticketing'],
    status: 'ACTIVE',
    tenantCount: 53,
    aiAgentCount: 7
  }
];

let ecosystemsStore: DomainEcosystem[] = [...INITIAL_ECOSYSTEMS];

export const domainFramework = {
  getEcosystems(): DomainEcosystem[] {
    return ecosystemsStore.map(e => ({
      ...e,
      domainId: e.id,
      activeTenants: e.tenantCount || 1,
    }));
  },
  registerEcosystem(eco: Partial<DomainEcosystem>): DomainEcosystem {
    const newId = eco.id || eco.domainId || 'domain_' + Math.random().toString(36).substring(2, 8);
    const newEco: DomainEcosystem = {
      id: newId,
      domainId: newId,
      name: eco.name || 'New Domain Ecosystem',
      sector: eco.sector || 'GENERAL',
      description: eco.description || 'Configurable domain ecosystem module.',
      modules: eco.modules || ['Core Runtime', 'Identity Gateway', 'FAAP Ledger'],
      status: eco.status || 'ACTIVE',
      tenantCount: eco.tenantCount || eco.activeTenants || 1,
      activeTenants: eco.tenantCount || eco.activeTenants || 1,
      aiAgentCount: eco.aiAgentCount || 4,
      phases: eco.phases || []
    };
    ecosystemsStore.push(newEco);
    return newEco;
  },
  provisionTenantDomain(domainId: string, tenantId: string): { success: boolean; domainId: string; tenantId: string; timestamp: string; status: string } {
    const existing = ecosystemsStore.find(e => e.id === domainId || e.domainId === domainId || (e.sector && e.sector.toLowerCase() === domainId.toLowerCase()));
    if (existing) {
      existing.tenantCount = (existing.tenantCount || 0) + 1;
      existing.activeTenants = (existing.activeTenants || 0) + 1;
    }
    return {
      success: true,
      domainId,
      tenantId,
      timestamp: new Date().toISOString(),
      status: 'PROVISIONED_ACTIVE'
    };
  }
};
