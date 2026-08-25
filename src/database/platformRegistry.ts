/**
 * JUMO ENTERPRISE PLATFORM REGISTRY & DATABASE ARCHITECTURE
 * Authoritative persistence and discovery layer for all sovereign platforms, financial engines,
 * institutional ERPs, AI swarms, and government platforms in the JUMO UEOS Ecosystem.
 */

export type PlatformStatus = 
  | 'INSTALLED_CORE' 
  | 'INSTALLED_ACTIVE' 
  | 'AVAILABLE' 
  | 'CONFIGURING' 
  | 'SUSPENDED' 
  | 'MAINTENANCE' 
  | 'ARCHIVED';

export type TenantAvailability = 
  | 'Multi-Tenant Isolated' 
  | 'Dedicated Sovereign Tenant' 
  | 'Global Shared Kernel';

export interface PlatformItem {
  id: string;
  code: string;
  name: string;
  category: string;
  parentProductId?: string; // Links capability to one of the 6 Authoritative Products
  version: string;
  owner: string;
  status: PlatformStatus;
  description: string;
  tenantAvailability: TenantAvailability;
  modules: string[];
  apis: string[];
  aiCapabilities: string[];
  aiEnabled: boolean;
  securityLevel: string;
  documentationUrl: string;
  route: string;
  iconName: string; // Mapped to Lucide icons in frontend view
  color: string;
  bgColor: string;
  borderColor: string;
  monthlyPrice?: number;
}

export const OFFICIAL_PLATFORM_CATEGORIES = [
  'All Platforms',
  'Authoritative JUMO ERPs',
  'Shared Platform Services'
] as const;

export type OfficialCategory = typeof OFFICIAL_PLATFORM_CATEGORIES[number];

const INITIAL_PLATFORM_CATALOG: PlatformItem[] = [
  // 1. Authoritative JUMO ERPs & Platforms
  {
    id: 'JUMO-FINTECH',
    code: 'JUMO-FINTECH-01',
    name: 'JUMO FINTECH',
    category: 'Authoritative JUMO ERPs',
    version: 'v16.0.0',
    owner: 'JUMO Sovereign Ledger & Payments Authority',
    status: 'INSTALLED_CORE',
    description: 'Unified financial-services platform. Combines FAAP Accounting, Digital Pay, Banking, Lending, Microfinance, and SACCO capabilities into one modular ecosystem.',
    tenantAvailability: 'Global Shared Kernel',
    modules: ['Accounting & GL', 'Universal Payments', 'Digital Banking', 'Lending & Credit', 'Microfinance & SACCO', 'Treasury & Liquidity', 'Risk & Compliance'],
    apis: ['POST /api/v1/ledger/post', 'POST /api/v1/payments/initiate', 'GET /api/v1/ledger/parity'],
    aiCapabilities: ['Financial Swarm Auditor', 'Credit Risk Copilot', 'Ledger Parity Verification', 'Fraud Scoring'],
    aiEnabled: true,
    securityLevel: 'SOV-TREASURY (PCI-DSS Tier 1)',
    documentationUrl: '/docs/fintech',
    route: '/products/fintech',
    iconName: 'Database',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    monthlyPrice: 599
  },
  {
    id: 'JUMO-EDU-ALUMNI',
    code: 'JUMO-EDU-ALUM-02',
    name: 'JUMO Education & Alumni ERP',
    category: 'Authoritative JUMO ERPs',
    version: 'v14.4.0',
    owner: 'JUMO Academic & Advancement Group',
    status: 'INSTALLED_ACTIVE',
    description: 'Universal Education Management & Institutional Advancement. Covers the complete lifecycle from Applicant to Student to Alumnus and Endowment management.',
    tenantAvailability: 'Multi-Tenant Isolated',
    modules: ['Student Information System', 'Academic Management', 'Alumni Directory', 'Endowment & Donations', 'Mentorship & Career', 'Exam & Transcripts', 'Campus Operations'],
    apis: ['POST /api/edu/admissions', 'GET /api/alumni/directory', 'POST /api/alumni/donations'],
    aiCapabilities: ['Attrition Early Warning', 'Mentorship Matching AI', 'Donor Propensity Scoring', 'Timetable Optimization'],
    aiEnabled: true,
    securityLevel: 'FERPA/Academic Compliant',
    documentationUrl: '/docs/education-alumni',
    route: '/products/education-alumni',
    iconName: 'GraduationCap',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    monthlyPrice: 499
  },
  {
    id: 'JUMO-CHURCH',
    code: 'JUMO-CHURCH-03',
    name: 'JUMO Church & Diocese ERP',
    category: 'Authoritative JUMO ERPs',
    version: 'v8.0.0',
    owner: 'JUMO Faith Systems',
    status: 'INSTALLED_ACTIVE',
    description: 'Authoritative faith-based governance and administrative operating system for dioceses and parish networks.',
    tenantAvailability: 'Multi-Tenant Isolated',
    modules: ['Parishioner Registry', 'Tithe Ledger', 'Sacramental Vault', 'Diocesan Governance', 'Clergy Payroll', 'Events & Missions'],
    apis: ['POST /api/church/tithes', 'GET /api/church/members'],
    aiCapabilities: ['Congregational Analytics', 'Sermon Semantic Search', 'Governance Advisor'],
    aiEnabled: true,
    securityLevel: 'Diocesan Zero-Trust',
    documentationUrl: '/docs/church',
    route: '/products/church-erp',
    iconName: 'Landmark',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    monthlyPrice: 299
  },
  {
    id: 'CHURCH-DEV-PORTAL',
    code: 'JUMO-DEV-CHURCH-01',
    name: 'JUMO Church & Diocese Developer Portal',
    category: 'Shared Platform Services',
    version: 'v1.0.0',
    owner: 'JUMO Faith Systems',
    status: 'INSTALLED_ACTIVE',
    description: 'Developer portal for Church & Diocese ERP. Manage API keys, webhooks, and sacramental register integrations.',
    tenantAvailability: 'Global Shared Kernel',
    modules: ['API Management', 'Webhook Configuration', 'Integration Registry', 'Developer Documentation'],
    apis: ['GET /api/dev/keys', 'POST /api/dev/webhooks'],
    aiCapabilities: ['Code Generation Copilot', 'API Optimization Advisor'],
    aiEnabled: true,
    securityLevel: 'DEV-SECURE',
    documentationUrl: '/docs/church/dev',
    route: '/products/church/developer',
    iconName: 'Code',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    monthlyPrice: 0
  },
  {
    id: 'FINTECH-DEV-PORTAL',
    code: 'JUMO-DEV-FINTECH-01',
    name: 'JUMO FINTECH Developer Portal',
    category: 'Shared Platform Services',
    version: 'v1.0.0',
    owner: 'JUMO Sovereign Ledger & Payments Authority',
    status: 'INSTALLED_ACTIVE',
    description: 'Developer portal for JUMO FINTECH. Manage API keys for payments, lending, and banking services.',
    tenantAvailability: 'Global Shared Kernel',
    modules: ['Payment API Keys', 'Banking Integration', 'Lending Webhooks', 'Developer Hub'],
    apis: ['GET /api/fintech/dev/keys', 'POST /api/fintech/dev/webhooks'],
    aiCapabilities: ['Smart Contract Auditor', 'Financial API Copilot'],
    aiEnabled: true,
    securityLevel: 'DEV-SECURE-TREASURY',
    documentationUrl: '/docs/fintech/dev',
    route: '/products/fintech/families',
    iconName: 'Code',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    monthlyPrice: 0
  },
  {
    id: 'EDU-ALUMNI-DEV-PORTAL',
    code: 'JUMO-DEV-EDU-01',
    name: 'JUMO Education & Alumni Developer Portal',
    category: 'Shared Platform Services',
    version: 'v1.0.0',
    owner: 'JUMO Academic & Advancement Group',
    status: 'INSTALLED_ACTIVE',
    description: 'Developer portal for Education & Alumni ERP. Manage API keys for SIS, admissions, and alumni networking.',
    tenantAvailability: 'Global Shared Kernel',
    modules: ['SIS API Keys', 'Admissions Webhooks', 'Alumni Integration Hub', 'Developer Docs'],
    apis: ['GET /api/edu/dev/keys', 'POST /api/edu/dev/webhooks'],
    aiCapabilities: ['SIS Schema Advisor', 'Education API Copilot'],
    aiEnabled: true,
    securityLevel: 'DEV-SECURE-EDU',
    documentationUrl: '/docs/edu/dev',
    route: '/products/education/developer',
    iconName: 'Code',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    monthlyPrice: 0
  }
];

const STORAGE_KEY = 'jumo_ueos_authoritative_platform_catalog_v5';

export class PlatformRegistryDatabase {
  public static getAllPlatforms(): PlatformItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading platform registry:', err);
    }
    return INITIAL_PLATFORM_CATALOG;
  }

  public static saveCatalog(catalog: PlatformItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
    } catch (err) {
      console.error('Error saving platform registry:', err);
    }
  }

  public static getPlatformByIdOrCode(idOrCode: string): PlatformItem | undefined {
    const all = this.getAllPlatforms();
    return all.find(p => p.id === idOrCode || p.code === idOrCode);
  }

  public static getPlatformsByCategory(category: string): PlatformItem[] {
    const all = this.getAllPlatforms();
    if (category === 'All Platforms') return all;
    return all.filter(p => p.category === category);
  }

  public static resetToDefault(): PlatformItem[] {
    this.saveCatalog(INITIAL_PLATFORM_CATALOG);
    return INITIAL_PLATFORM_CATALOG;
  }

  public static updatePlatformStatus(id: string, status: PlatformStatus): void {
    const catalog = this.getAllPlatforms();
    const index = catalog.findIndex(p => p.id === id);
    if (index !== -1) {
      catalog[index].status = status;
      this.saveCatalog(catalog);
    }
  }
}
