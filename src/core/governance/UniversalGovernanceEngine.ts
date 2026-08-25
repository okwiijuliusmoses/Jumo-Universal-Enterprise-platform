/**
 * JUMO UEOS — Ring-0 Universal Governance Configuration Engine
 * Authoritative system registry, module lifecycles, and layer controllers.
 */

export interface ERPDomainConfig {
  id: string;
  name: string;
  family: string;
  status: 'ACTIVE' | 'DISABLED' | 'SUSPENDED' | 'UPGRADED';
  version: string;
  assignedModules: string[];
  subscription: string;
  usageCount: number;
}

export interface ModuleLifecycleConfig {
  id: string;
  name: string;
  erpFamily: string;
  status: 'Enabled' | 'Disabled' | 'Suspended' | 'Archived' | 'Available Upgrade';
  version: string;
  priceUSD: number;
}

export interface UIComponentConfig {
  id: string;
  name: string;
  version: string;
  owner: string;
  status: 'Enabled' | 'Disabled' | 'Updated' | 'Upgraded' | 'Replaced' | 'Removed';
  dependencies: string[];
  billingPlan: 'Core Foundation' | 'Enterprise Hybrid' | 'Sovereign Pro' | 'Beta Sandbox';
  configuration: Record<string, any>;
}

export interface LayerConfig {
  id: 'experience' | 'application' | 'intelligence' | 'security' | 'financial';
  name: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEGRADED' | 'SUSPENDED';
  version: string;
  config: {
    theme?: 'light' | 'dark' | 'hybrid';
    portalInterfaces?: string[];
    mfaLevel?: string;
    isolationLevel?: string;
    faapRules?: string[];
  };
}

export interface BillingSubscription {
  tenantId: string;
  institutionName: string;
  edition: string;
  activeModulesCount: number;
  optionalModulesCount: number;
  subscriptionType: string;
  status: 'Active' | 'Suspended' | 'Expired';
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  icon?: string;
  path: string;
  visible: boolean;
  roles: string[];
  folder: string;
}

export interface InstitutionBrandingConfig {
  institutionName: string;
  logoUrl?: string;
  brandColor: string;
  secondaryColor: string;
  subdomain: string;
  newsAnnouncement: string;
  contactEmail: string;
  supportPhone: string;
}

export interface AvailableUpdate {
  id: string;
  name: string;
  version: string;
  description: string;
  dependencies: string[];
  approved: boolean;
  scheduledTime?: string;
}

// Initial Mock Datasets representing complete system registries
const INITIAL_NAVIGATION: NavigationMenuItem[] = [
  { id: 'nav_dash', label: 'Operational Dashboard', icon: 'LayoutDashboard', path: '/dashboard', visible: true, roles: ['admin', 'executive', 'staff'], folder: 'Core Workspaces' },
  { id: 'nav_finance', label: 'General Ledger & FAAP', icon: 'DollarSign', path: '/finance', visible: true, roles: ['admin', 'finance'], folder: 'Core Workspaces' },
  { id: 'nav_members', label: 'Member / Student Directory', icon: 'Users', path: '/directory', visible: true, roles: ['admin', 'executive', 'staff'], folder: 'Directory & Records' },
  { id: 'nav_treasury', label: 'Specialized Treasury Router', icon: 'Shield', path: '/treasury', visible: false, roles: ['admin'], folder: 'Financial Systems' },
  { id: 'nav_reports', label: 'Analytics & Audit Reports', icon: 'FileText', path: '/reports', visible: true, roles: ['admin', 'executive', 'auditor'], folder: 'Reports & Audits' },
  { id: 'nav_ai', label: 'JUMO AI Command Center', icon: 'Cpu', path: '/ai-center', visible: true, roles: ['admin', 'executive', 'staff'], folder: 'AI & Intelligence' },
];

const INITIAL_BRANDING: InstitutionBrandingConfig = {
  institutionName: 'JUMO UEOS Sovereign Hybrid Platform',
  logoUrl: '',
  brandColor: '#0078D4',
  secondaryColor: '#0F172A',
  subdomain: 'platform.jumo-ueos.org',
  newsAnnouncement: 'System Operational - AEGIS Zero-Trust Shield Active across all 20 ERP families.',
  contactEmail: 'admin@jumo-ueos.org',
  supportPhone: '+254 700 000 000'
};

// Initial Mock Datasets representing complete system registries
const INITIAL_ERPS: ERPDomainConfig[] = [
  { id: 'JUMO-FINPAY', name: 'Financial & Digital Pay Platform', family: 'Finance & Payments', status: 'ACTIVE', version: 'v5.2.0', assignedModules: ['ledger', 'payments', 'budget', 'tax'], subscription: 'Enterprise Hybrid', usageCount: 42390 },
  { id: 'JUMO-EDU-ALUMNI', name: 'Education & Alumni ERP', family: 'Education & Advancement', status: 'ACTIVE', version: 'v4.5.0', assignedModules: ['admissions', 'alumni', 'student_info', 'endowment'], subscription: 'Enterprise Annual', usageCount: 8490 },
  { id: 'JUMO-CHURCH', name: 'Church & Diocese ERP', family: 'Faith Governance', status: 'ACTIVE', version: 'v3.6.0', assignedModules: ['membership', 'tithe', 'sacramental', 'diocese'], subscription: 'Diocesan Standard', usageCount: 9340 },
  { id: 'JUMO-CONTROL', name: 'Control Center', family: 'Sovereign Orchestration', status: 'ACTIVE', version: 'v14.0.0', assignedModules: ['aegis', 'ai_command', 'telemetry', 'registry'], subscription: 'Sovereign Root', usageCount: 2310 }
];

const INITIAL_MODULES: ModuleLifecycleConfig[] = [
  { id: 'ledger', name: 'General Ledger (FAAP)', erpFamily: 'JUMO-FINPAY', status: 'Enabled', version: 'v5.2', priceUSD: 300 },
  { id: 'payments', name: 'Universal Payment Switch', erpFamily: 'JUMO-FINPAY', status: 'Enabled', version: 'v5.2', priceUSD: 350 },
  { id: 'budget', name: 'Vote Book & Budgeting', erpFamily: 'JUMO-FINPAY', status: 'Enabled', version: 'v5.0', priceUSD: 150 },
  
  { id: 'admissions', name: 'Student Admissions', erpFamily: 'JUMO-EDU-ALUMNI', status: 'Enabled', version: 'v4.5', priceUSD: 150 },
  { id: 'alumni', name: 'Alumni & Endowment', erpFamily: 'JUMO-EDU-ALUMNI', status: 'Enabled', version: 'v4.5', priceUSD: 200 },
  
  { id: 'membership', name: 'Parishioner Registry', erpFamily: 'JUMO-CHURCH', status: 'Enabled', version: 'v3.6', priceUSD: 100 },
  { id: 'tithe', name: 'Tithe & Donation Ledger', erpFamily: 'JUMO-CHURCH', status: 'Enabled', version: 'v3.6', priceUSD: 120 },
  
  { id: 'aegis', name: 'AEGIS Security Wall', erpFamily: 'JUMO-CONTROL', status: 'Enabled', version: 'v14.0', priceUSD: 500 },
  { id: 'ai_command', name: 'AI Command Center', erpFamily: 'JUMO-CONTROL', status: 'Enabled', version: 'v14.0', priceUSD: 600 }
];

const INITIAL_COMPONENTS: UIComponentConfig[] = [
  { id: 'comp_dashboard_grid', name: 'Sovereign Dashboard Grid widget', version: 'v1.0', owner: 'JUMO Design Core', status: 'Enabled', dependencies: ['ueos-kernel'], billingPlan: 'Core Foundation', configuration: { columns: 3, spacing: 'compact' } },
  { id: 'comp_intake_form', name: 'Generic Patient Intake Form', version: 'v1.2', owner: 'Healthcare Subteam', status: 'Enabled', dependencies: ['patient_ehr'], billingPlan: 'Core Foundation', configuration: { requiredFields: ['name', 'dob', 'nationalId'] } },
  { id: 'comp_amortization_table', name: 'Amortization Loan Table', version: 'v2.0', owner: 'FinTech Subteam', status: 'Enabled', dependencies: ['loan_underwriting'], billingPlan: 'Enterprise Hybrid', configuration: { defaultInterestRate: 12 } },
  { id: 'comp_ai_assistant_panel', name: 'Sovereign JUMO Assistant Chatbox', version: 'v1.5', owner: 'AI Intelligence Group', status: 'Enabled', dependencies: ['jumo-ai-core'], billingPlan: 'Sovereign Pro', configuration: { contextLength: 4096 } }
];

const INITIAL_LAYERS: LayerConfig[] = [
  { id: 'experience', name: 'Experience Layer', status: 'ACTIVE', version: 'v2.6', config: { theme: 'light', portalInterfaces: ['Public Welcome', 'Executive Portal', 'Staff Workspace', 'Client Portal'] } },
  { id: 'application', name: 'Application Layer', status: 'ACTIVE', version: 'v3.0', config: { portalInterfaces: ['Sovereign ERP Center', 'FAAP Platform'] } },
  { id: 'intelligence', name: 'Intelligence Layer', status: 'ACTIVE', version: 'v1.5', config: {} },
  { id: 'security', name: 'Security Layer', status: 'ACTIVE', version: 'v5.0', config: { mfaLevel: 'Hardware Passkey Required', isolationLevel: 'Schema-Level Separation' } },
  { id: 'financial', name: 'Financial Layer', status: 'ACTIVE', version: 'v4.0', config: { faapRules: ['$0.00 Double-entry parity check', '1.5% Clearing fee collection'] } }
];

const INITIAL_BILLING: BillingSubscription[] = [
  { tenantId: 'easu-univ-hq', institutionName: 'East African Sovereign University', edition: 'University ERP Enterprise Edition', activeModulesCount: 85, optionalModulesCount: 15, subscriptionType: 'Enterprise Annual', status: 'Active' },
  { tenantId: 'sacco-coop-node', institutionName: 'Lusaka Cooperative Credit Union', edition: 'SACCO Professional Edition', activeModulesCount: 42, optionalModulesCount: 8, subscriptionType: 'Sovereign Pro Quarterly', status: 'Active' },
  { tenantId: 'muni-kamp-hq', institutionName: 'Kampala Municipal Authority', edition: 'Government Standard Package', activeModulesCount: 58, optionalModulesCount: 22, subscriptionType: 'Enterprise Annual', status: 'Active' }
];

const INITIAL_UPDATES: AvailableUpdate[] = [
  { id: 'update_erp_core', name: 'ERP Core', version: 'v2.1', description: 'Upgraded cross-domain data sync pipeline, improved CSV/Excel import matching speed, and optimized memory allocations.', dependencies: ['ueos-kernel'], approved: false },
  { id: 'update_faap', name: 'FAAP Double-Entry Engine', version: 'v4.0', description: 'Sub-second inter-branch settlement parity validations, multi-currency ledger routing, and automatic tax file generation.', dependencies: ['ledger-core'], approved: false },
  { id: 'update_jumo_trust', name: 'JUMO Trust Compliance Suite', version: 'v3.2', description: 'Whistleblower cryptographic storage vaults, board governance audits workflow logs, and CCTV video AI frames pipeline.', dependencies: ['audit-engine'], approved: false },
  { id: 'update_aegis_sec', name: 'AEGIS Security Access Wall', version: 'v5.0', description: 'Hardware security passkey enforcement, administrative MFA signature walls, and row-level database crypt isolation.', dependencies: ['identity-engine'], approved: false }
];

export class DynamicConfigurationRegistry {
  private static get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  }

  private static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // ERP Registry APIs
  public static getERPs(): ERPDomainConfig[] {
    return this.get<ERPDomainConfig[]>('ueos_gov_erps', INITIAL_ERPS);
  }

  public static saveERPs(erps: ERPDomainConfig[]): void {
    this.set('ueos_gov_erps', erps);
  }

  // Module Registry APIs
  public static getModules(): ModuleLifecycleConfig[] {
    return this.get<ModuleLifecycleConfig[]>('ueos_gov_modules', INITIAL_MODULES);
  }

  public static saveModules(modules: ModuleLifecycleConfig[]): void {
    this.set('ueos_gov_modules', modules);
  }

  // Component Registry APIs
  public static getComponents(): UIComponentConfig[] {
    return this.get<UIComponentConfig[]>('ueos_gov_components', INITIAL_COMPONENTS);
  }

  public static saveComponents(components: UIComponentConfig[]): void {
    this.set('ueos_gov_components', components);
  }

  // Layer Registry APIs
  public static getLayers(): LayerConfig[] {
    return this.get<LayerConfig[]>('ueos_gov_layers', INITIAL_LAYERS);
  }

  public static saveLayers(layers: LayerConfig[]): void {
    this.set('ueos_gov_layers', layers);
  }

  // Billing Registry APIs
  public static getBilling(): BillingSubscription[] {
    return this.get<BillingSubscription[]>('ueos_gov_billing', INITIAL_BILLING);
  }

  public static saveBilling(billing: BillingSubscription[]): void {
    this.set('ueos_gov_billing', billing);
  }

  // Updates Registry APIs
  public static getUpdates(): AvailableUpdate[] {
    return this.get<AvailableUpdate[]>('ueos_gov_updates', INITIAL_UPDATES);
  }

  public static saveUpdates(updates: AvailableUpdate[]): void {
    this.set('ueos_gov_updates', updates);
  }

  // Navigation Registry APIs
  public static getNavigationItems(): NavigationMenuItem[] {
    return this.get<NavigationMenuItem[]>('ueos_gov_nav_items', INITIAL_NAVIGATION);
  }

  public static saveNavigationItems(items: NavigationMenuItem[]): void {
    this.set('ueos_gov_nav_items', items);
  }

  // Branding Registry APIs
  public static getBranding(): InstitutionBrandingConfig {
    return this.get<InstitutionBrandingConfig>('ueos_gov_branding', INITIAL_BRANDING);
  }

  public static saveBranding(branding: InstitutionBrandingConfig): void {
    this.set('ueos_gov_branding', branding);
  }

  // --- Runtime Query Methods (The ERP runtimes ask these) ---
  public static isModuleEnabled(moduleId: string, erpFamilyId?: string): boolean {
    const modules = this.getModules();
    const found = modules.find(m => m.id === moduleId || m.name.toLowerCase().includes(moduleId.toLowerCase()));
    if (!found) return false;
    
    // Check if parent ERP family is active
    if (erpFamilyId) {
      const erps = this.getERPs();
      const erp = erps.find(e => e.id === erpFamilyId);
      if (erp && erp.status !== 'ACTIVE') return false;
    }

    return found.status === 'Enabled';
  }

  public static isFeatureAvailable(componentId: string): boolean {
    const components = this.getComponents();
    const found = components.find(c => c.id === componentId || c.name.toLowerCase().includes(componentId.toLowerCase()));
    if (!found) return true; // Default available if unregistered to prevent crash
    return found.status === 'Enabled' || found.status === 'Updated' || found.status === 'Upgraded';
  }

  public static getConfiguration(id: string): Record<string, any> {
    const components = this.getComponents();
    const found = components.find(c => c.id === id);
    return found ? found.configuration : {};
  }
}

export const UniversalPlatformRegistry = {
  getERPs: () => DynamicConfigurationRegistry.getERPs(),
  getModules: () => DynamicConfigurationRegistry.getModules(),
  getComponents: () => DynamicConfigurationRegistry.getComponents(),
  getLayers: () => DynamicConfigurationRegistry.getLayers(),
  getBilling: () => DynamicConfigurationRegistry.getBilling(),
  getUpdates: () => DynamicConfigurationRegistry.getUpdates()
};
