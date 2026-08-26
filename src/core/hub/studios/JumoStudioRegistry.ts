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
  studio('specification', 'Digital Specification', 'PLATFORM', 'Authoritative intake and platform-instance specification.', ['Intake', 'Specification'], 'file-text'),
  studio('provisioning', 'Provisioning Studio', 'PLATFORM', 'Template inspection, instance configuration and provisioning plans.', ['Template Discovery', 'Configuration', 'Plan Generation'], 'database'),
  studio('manufacturing', 'Manufacturing Pipeline', 'MANUFACTURING', 'Central operational workspace orchestrating the lifecycle flow.', ['Pipeline Jobs', 'Transitions', 'Audit'], 'zap'),
  studio('engineering', 'Build Studio', 'MANUFACTURING', 'Compilation, artifact creation and build verification.', ['Compilation', 'Artifacts'], 'terminal'),
  studio('workforce', 'Engineering Workforce', 'MANUFACTURING', 'Management and orchestration of engineering agents.', ['Agent Delegation', 'Supervision'], 'users'),
  studio('verification', 'Verification Studio', 'MANUFACTURING', 'Verification gates, structural integrity and compliance.', ['Gates', 'Compliance'], 'shield'),
  studio('certification', 'Certification Studio', 'MANUFACTURING', 'Quality sign-offs and regulatory approval processes.', ['Sign-offs', 'Approval'], 'award'),
  studio('deployment', 'Deployment Studio', 'MANUFACTURING', 'Cloud slot allocation, release and runtime activation.', ['Releases', 'Cloud Slots'], 'cloud'),
  studio('overview', 'Runtime Instance', 'OPERATIONS', 'Live instance telemetry, metrics and operational status.', ['Telemetry', 'Metrics'], 'home'),
  studio('cloud', 'Cloud & Infrastructure', 'OPERATIONS', 'Infrastructure provisioning, containers and scale.', ['Containers', 'Infrastructure'], 'server'),
  studio('security', 'Security & SOC', 'OPERATIONS', 'Threat detection, access controls and Zero-Trust monitoring.', ['SOC', 'Zero-Trust'], 'shield-check'),
  studio('migration', 'Schema Migration', 'OPERATIONS', 'Database migrations and schema evolution.', ['Database', 'Schema'], 'database'),
  studio('lifecycle', 'Lifecycle Studio', 'OPERATIONS', 'Upgrades, maintenance and ecosystem retirement.', ['Upgrades', 'Maintenance'], 'refresh-ccw'),
  studio('architecture', 'Architecture Studio', 'GOVERNANCE', 'Architecture inspection, dependency graph and topology.', ['Dependencies', 'Topology'], 'layers'),
  studio('templates', 'Registry Fabric', 'GOVERNANCE', 'Authoritative source for base registries and component orchestration.', ['Registries', 'Orchestration'], 'layers'),
  studio('audit', 'Audit', 'GOVERNANCE', 'System-wide compliance audit trails and evidence records.', ['Evidence', 'Audit Trails'], 'activity'),
  studio('settings', 'Settings', 'GOVERNANCE', 'System preferences, tenant configurations and operator profile.', ['Preferences', 'Configuration'], 'settings'),
]);

export { JumoStudioRegistry };
