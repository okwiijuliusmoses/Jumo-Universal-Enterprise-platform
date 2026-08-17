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
  // 01 — JUMO MANUFACTURING PIPELINE
  studio('specification', 'Specification & Intake', 'MANUFACTURING', 'Authoritative intake and platform-instance specification.', ['Intake', 'Specification'], 'file-text'),
  studio('architecture', 'Architecture & Engineering', 'MANUFACTURING', 'Architecture inspection, dependency graph and topology.', ['Dependencies', 'Topology'], 'layers'),
  studio('blueprint', 'Architecture Blueprint', 'MANUFACTURING', 'Structural blueprint and authoritative system design.', ['Blueprint', 'Design'], 'layers'),
  studio('assurance', 'Design Assurance', 'MANUFACTURING', 'Design verification and architectural integrity checks.', ['Assurance', 'Integrity'], 'shield-check'),
  studio('manufacturing', 'Component Manufacturing', 'MANUFACTURING', 'Central operational workspace orchestrating component creation.', ['Component', 'Build'], 'zap'),
  studio('engineering', 'Application Assembly', 'MANUFACTURING', 'Compilation, artifact creation and build verification.', ['Compilation', 'Artifacts'], 'terminal'),
  studio('branding', 'Institutional Configuration', 'MANUFACTURING', 'Brand identity, white-label assets and institutional parameters.', ['Branding', 'Theme'], 'sliders'),
  studio('verification', 'Verification & Validation', 'MANUFACTURING', 'Verification gates, structural integrity and compliance.', ['Gates', 'Compliance'], 'shield'),
  studio('certification', 'Certification & Release', 'MANUFACTURING', 'Quality sign-offs and regulatory approval processes.', ['Sign-offs', 'Approval'], 'award'),
  studio('provisioning', 'Provisioning & Deployment', 'MANUFACTURING', 'Template inspection, instance configuration and provisioning plans.', ['Template Discovery', 'Configuration', 'Plan Generation'], 'database'),

  // 02 — JUMO DIGITAL OPERATIONS
  studio('overview', 'Application Operations', 'OPERATIONS', 'Live instance telemetry, metrics and operational status.', ['Telemetry', 'Metrics'], 'activity'),
  studio('runtime', 'Runtime Control', 'OPERATIONS', 'Live runtime instance control and health telemetry.', ['Runtime', 'Control'], 'cpu'),
  studio('deployments', 'Deployments & Releases', 'OPERATIONS', 'Deployment tracking, release management and versions.', ['Deployments', 'Releases'], 'refresh-ccw'),
  studio('cloud', 'Nodes & Environments', 'OPERATIONS', 'Infrastructure provisioning, containers and scale.', ['Containers', 'Infrastructure'], 'server'),

  // 03 — JUMO REMOTE DIGITAL WORKSHOP
  studio('workshop', 'Remote Diagnostics', 'WORKSHOP', 'Remote monitoring, live diagnostics and AI triage.', ['Remote Triage', 'Diagnostics'], 'wrench'),
  studio('repair', 'Repair & Maintenance', 'WORKSHOP', 'Autonomous repair, patching and upgrades.', ['Repair', 'Maintenance'], 'wrench'),
  studio('lifecycle', 'Evolution & Retirement', 'WORKSHOP', 'Upgrades, maintenance and ecosystem retirement.', ['Upgrades', 'Maintenance'], 'refresh-ccw'),

  // 04 — SOVEREIGN CONTROL CENTER
  studio('institutions', 'Institutions & Tenants', 'CONTROL_CENTER', 'Institutional control plane for sovereign entities.', ['Institutions', 'Tenants'], 'building-2'),
  studio('ai-control', 'AI Control Center', 'CONTROL_CENTER', 'Unified AI Provider Fabric, Models and Quotas.', ['Provider Fabric', 'Model Discovery'], 'bot'),
  studio('workforce', 'AI Workforce', 'CONTROL_CENTER', 'Management of 420+ cognitive engineering specialists.', ['Agent Delegation', 'Supervision'], 'users'),
  studio('kernel', 'Kernel & System Control', 'CONTROL_CENTER', 'Kernel runtime, services and event fabric control.', ['Kernel', 'Events'], 'cpu'),

  // 05 — GOVERNANCE & ADMINISTRATION
  studio('control', 'Sovereign Governance', 'GOVERNANCE', 'Zero-Trust security governor and compliance mandates.', ['Zero-Trust', 'Governance'], 'shield-check'),
  studio('users', 'Users & Permissions', 'GOVERNANCE', 'RBAC, roles and institutional access control.', ['RBAC', 'Access'], 'users'),
  studio('audit', 'Compliance & Audit', 'GOVERNANCE', 'System-wide compliance audit trails and evidence records.', ['Evidence', 'Audit'], 'activity'),

  // 06 — FINANCIAL CONTROL
  studio('financial', 'Financial Control & Billing', 'FINANCE', 'Institutional product billing and usage cost allocation.', ['Billing', 'Subscriptions'], 'credit-card'),
  studio('pricing', 'Pricing & Packages', 'FINANCE', 'Product pricing, tiers and commercial packages.', ['Pricing', 'Tiers'], 'dollar-sign'),

  // 07 — SOVEREIGN TREASURY
  studio('faap', 'Sovereign Treasury', 'TREASURY', 'Double-entry sovereign ledger journal and chart of accounts.', ['FAAP', 'Ledger'], 'landmark'),

  // 08 — DATA & INFORMATION
  studio('data-mgmt', 'Data Management', 'DATA_INFO', 'Data residency boundaries and schema migrations.', ['Data Residency', 'Schema'], 'database'),
  studio('info-model', 'Information Modeling', 'DATA_INFO', 'Data domains, models and classification.', ['Domains', 'Models'], 'layers'),

  // 09 — APPLICATION VAULT
  studio('vault', 'Sovereign Application Vault', 'VAULT', 'Encrypted storage of API keys, certificates and secrets.', ['Secrets', 'HSM'], 'lock'),

  // 10 — APPLICATION DOCUMENTATION & REPOSITORY
  studio('documentation', 'Application Documentation', 'DOCS_REPO', 'Authoritative blueprint specifications and blueprints.', ['Specs', 'Documentation'], 'file-text'),
  studio('repository', 'Application Repository', 'DOCS_REPO', 'Manufactured builds, packages and artifacts.', ['Artifacts', 'Builds'], 'box'),

  // 11 — DIGITAL PRODUCTS
  studio('products', 'Digital Products Catalogue', 'PRODUCTS', 'Manufactured ERP ecosystems and platforms catalogue.', ['Products', 'Catalogue'], 'boxes'),
  studio('templates', 'Registry Fabric', 'PRODUCTS', 'Authoritative source for base registries.', ['Registries', 'Orchestration'], 'layers'),
  studio('job-review', 'Job Review & Verification', 'GOVERNANCE', 'Authoritative human governance gate for manufacturing jobs.', ['Review', 'Approval', 'Governance'], 'shield-check'),

  // Three Consolidated Master Studios
  studio('spec-arch-eng', 'Specification, Architecture & Engineering Studio', 'MANUFACTURING', 'Coherent workspace for INTENT → SPECIFICATION → ARCHITECTURE → ENGINEERING → BLUEPRINT.', ['Intake', 'Specification', 'Architecture', 'Engineering', 'Blueprint'], 'file-text'),
  studio('mfg-ver-cert', 'Manufacturing, Verification & Certification Studio', 'MANUFACTURING', 'Live control surface for PREPARE → MANUFACTURE → ASSEMBLE → INTEGRATE → VERIFY → CERTIFY → RELEASE.', ['Manufacturing', 'Verification', 'Certification', 'Lineage', 'Release'], 'zap'),
  studio('inst-exp-deploy', 'Institutionalization, Experience & Deployment Studio', 'OPERATIONS', 'Sovereign plane for INSTITUTIONALIZE → CONFIGURE → EXPERIENCE → BRAND → PROVISION → INSTALL → DEPLOY → GO-LIVE → HANDOVER.', ['Institutionalization', 'Configuration', 'Experience', 'Branding', 'Provisioning', 'Deployment'], 'globe'),
]);


(JumoStudioRegistry as any).getInstance = function(): JumoStudioRegistry {
  return JUMO_STUDIO_REGISTRY;
};

export { JumoStudioRegistry };
