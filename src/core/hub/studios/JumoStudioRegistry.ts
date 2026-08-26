export type JumoStudioStatus =
  | 'INITIALIZING'
  | 'AVAILABLE'
  | 'READY'
  | 'RUNNING'
  | 'DEGRADED'
  | 'OFFLINE'
  | 'AWAITING_CONFIGURATION'
  | 'NO_INSTANCE_PROVISIONED';

export interface JumoStudioDefinition {
  id: string;
  name: string;
  family: string;
  description: string;
  status: JumoStudioStatus;
  icon: string;
  capabilities: string[];
  architectureLayers: string[];
  dependencies: string[];
  agents: string[];
  workflows: string[];
  registries: string[];
  verificationProfiles: string[];
  humanFacing: boolean;
  executable: boolean;
  route: string;
}

class JumoStudioRegistry {
  private readonly studios = new Map<string, JumoStudioDefinition>();

  constructor(initial: JumoStudioDefinition[] = []) {
    initial.forEach(studio => this.upsert(studio));
  }

  register(studio: JumoStudioDefinition): void {
    if (this.studios.has(studio.id)) {
      throw new Error(`JUMO studio already registered: ${studio.id}`);
    }
    this.studios.set(studio.id, studio);
  }

  upsert(studio: JumoStudioDefinition): void {
    this.studios.set(studio.id, studio);
  }

  get(id: string): JumoStudioDefinition | undefined {
    return this.studios.get(id);
  }

  list(): JumoStudioDefinition[] {
    return Array.from(this.studios.values());
  }

  active(): JumoStudioDefinition[] {
    return this.list().filter(
      studio =>
        studio.status === 'AVAILABLE' ||
        studio.status === 'READY' ||
        studio.status === 'RUNNING'
    );
  }

  humanFacing(): JumoStudioDefinition[] {
    return this.list().filter(studio => studio.humanFacing);
  }

  executable(): JumoStudioDefinition[] {
    return this.list().filter(studio => studio.executable);
  }

  families(): string[] {
    return [...new Set(this.list().map(studio => studio.family))];
  }

  remove(id: string): boolean {
    return this.studios.delete(id);
  }

  has(id: string): boolean {
    return this.studios.has(id);
  }

  clear(): void {
    this.studios.clear();
  }
}

const studio = (
  id: string,
  name: string,
  family: string,
  description: string,
  capabilities: string[],
  icon: string
): JumoStudioDefinition => ({
  id,
  name,
  family,
  description,
  status: 'AVAILABLE',
  icon,
  capabilities,
  architectureLayers: [],
  dependencies: [],
  agents: [],
  workflows: [],
  registries: [],
  verificationProfiles: [],
  humanFacing: true,
  executable: true,
  route: `/studios/${id}`,
});

export const JUMO_STUDIO_REGISTRY = new JumoStudioRegistry([
  studio('overview', 'Kernel Telemetry', 'OPERATIONS', 'Live instance telemetry, metrics and operational status.', ['Telemetry', 'Metrics'], 'home'),
  studio('products', 'Products & Platforms', 'PLATFORM', 'Sovereign commercial products and independent shared platforms.', ['Ecosystem', 'Products'], 'layers'),
  studio('fintech', 'JUMO FINTECH SACCO', 'COMMERCIAL_PRODUCTS', 'Sovereign SACCO and Core Banking ERP.', ['SACCO', 'Banking'], 'zap'),
  studio('nursery-primary', 'Nursery & Primary ERP', 'COMMERCIAL_PRODUCTS', 'Sovereign Primary Education ERP.', ['Primary', 'Education'], 'school'),
  studio('secondary-school', 'Secondary School ERP', 'COMMERCIAL_PRODUCTS', 'Sovereign Secondary Education ERP.', ['Secondary', 'Education'], 'book-open'),
  studio('university', 'University & Tertiary ERP', 'COMMERCIAL_PRODUCTS', 'Sovereign Tertiary & University ERP.', ['University', 'Tertiary'], 'graduation-cap'),
  studio('church', 'Church & Faith ERP', 'COMMERCIAL_PRODUCTS', 'Sovereign Church & Faith ERP.', ['Church', 'Faith'], 'church'),
  studio('alumni', 'Alumni & Community ERP', 'COMMERCIAL_PRODUCTS', 'Sovereign Alumni & Community ERP.', ['Alumni', 'Community'], 'users'),
  studio('faap', 'FAAP Double-Entry Ledger', 'SHARED_PLATFORMS', 'Sovereign Double-Entry Financial Accounting Platform.', ['Ledger', 'Accounting'], 'dollar-sign'),
  studio('digital-pay', 'Digital Pay Switch', 'SHARED_PLATFORMS', 'Sovereign Payment Switch and Settlement Engine.', ['Payment', 'Switch'], 'credit-card'),
  studio('aegis', 'Aegis Zero-Trust Security', 'SHARED_PLATFORMS', 'Sovereign Zero-Trust Security and Identity Platform.', ['Security', 'Zero-Trust'], 'shield-check'),
  studio('treasury', 'Treasury & Liquidity', 'SHARED_PLATFORMS', 'Automated Treasury Management and Liquidity Engine.', ['Treasury', 'Liquidity'], 'landmark'),
  studio('digital-auditor', 'Digital Forensic Auditor', 'SHARED_PLATFORMS', 'System-wide compliance audit trails and evidence records.', ['Auditing', 'Forensics'], 'shield'),
  studio('ai-hybrid', 'AI Digital Hybrid Mesh', 'SHARED_PLATFORMS', 'Universal cognitive gateway and sovereign agent orchestration.', ['AI', 'Mesh'], 'brain-circuit'),
  studio('workflow', 'Workflow Engine', 'SHARED_PLATFORMS', 'National business process automation engine.', ['Workflow', 'Automation'], 'workflow'),
  studio('cloud', 'Cloud & Compute Fabric', 'SHARED_PLATFORMS', 'Infrastructure provisioning, containers and scale.', ['Cloud', 'Compute'], 'cloud'),
  studio('compliance', 'Legal & Compliance', 'GOVERNANCE', 'Statutory compliance and regulatory framework.', ['Compliance', 'Legal'], 'shield-check'),
  studio('settings', 'Settings', 'GOVERNANCE', 'System preferences, tenant configurations and operator profile.', ['Preferences', 'Configuration'], 'settings'),
]);

export { JumoStudioRegistry };
