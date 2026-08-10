export type JumoStudioStatus =
  | 'FOUNDATION'
  | 'ACTIVE'
  | 'PLANNED'
  | 'INTEGRATION'
  | 'GOVERNED';

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
        studio.status === 'FOUNDATION' ||
        studio.status === 'ACTIVE' ||
        studio.status === 'GOVERNED'
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
  status: 'ACTIVE',
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
  studio(
    'architecture-systems',
    'Architecture & Systems Studio',
    'ARCHITECTURE',
    'Architecture modelling, contracts, dependencies and system design.',
    ['Architecture Registry', 'System Model', 'Dependency Graph', 'Architecture Contracts'],
    'architecture'
  ),

  studio(
    'conversational-reasoning',
    'Conversational Reasoning Studio',
    'INTELLIGENCE',
    'Human instruction interpretation, reasoning and architectural planning.',
    ['Instruction Interpretation', 'Requirement Extraction', 'Reasoning', 'Decision Support'],
    'brain'
  ),

  studio(
    'intelligence',
    'Intelligence Studio',
    'INTELLIGENCE',
    'AI provider, model, routing, evaluation and execution governance.',
    ['AI Gateway', 'Model Registry', 'Provider Registry', 'Model Routing', 'AI Evaluation'],
    'sparkles'
  ),

  studio(
    'agent-workforce',
    'Agent Workforce Studio',
    'INTELLIGENCE',
    'Management and orchestration of specialized JUMO agents.',
    ['Agent Registry', 'Agent Identity', 'Delegation', 'Supervision', 'Scheduling'],
    'bot'
  ),

  studio(
    'product-ecosystem',
    'Product & Ecosystem Studio',
    'PRODUCT',
    'Product, ecosystem, application, ERP and module manufacturing.',
    ['Product Factory', 'Ecosystem Factory', 'Application Factory', 'ERP Factory'],
    'boxes'
  ),

  studio(
    'data-knowledge',
    'Data & Knowledge Studio',
    'DATA',
    'Enterprise data, schemas, ontology, knowledge and lineage.',
    ['Data Registry', 'Schema Registry', 'Data Mesh', 'Knowledge Graph'],
    'database'
  ),

  studio(
    'software-engineering',
    'Software Engineering Studio',
    'ENGINEERING',
    'Source engineering, APIs, components, testing and dependency management.',
    ['Source Registry', 'API Engineering', 'Testing', 'Static Analysis'],
    'code'
  ),

  studio(
    'manufacturing',
    'Manufacturing Studio',
    'MANUFACTURING',
    'Manufacturing orchestration and production execution.',
    ['Production Registry', 'Production Planning', 'Production Jobs', 'Quality'],
    'factory'
  ),

  studio(
    'build',
    'Build Studio',
    'DELIVERY',
    'Compilation, artifact creation and build verification.',
    ['Build Pipeline', 'Compilation', 'Artifact Creation', 'Build Verification'],
    'hammer'
  ),

  studio(
    'deployment',
    'Deployment Studio',
    'DELIVERY',
    'Release, environment, deployment and rollback management.',
    ['Release Management', 'Environment Management', 'Deployment', 'Rollback'],
    'rocket'
  ),

  studio(
    'verification',
    'Verification Studio',
    'GOVERNANCE',
    'Authoritative configurable verification control plane.',
    ['Verification Layers', 'Profiles', 'Gates', 'Evidence', 'Standards'],
    'shield-check'
  ),

  studio(
    'registry',
    'Registry Studio',
    'GOVERNANCE',
    'Authoritative JUMO registries and registry lifecycle management.',
    ['Registry Management', 'Discovery', 'Validation', 'Lifecycle'],
    'registry'
  ),

  studio(
    'hybrid-runtime',
    'Infrastructure & Hybrid Runtime Studio',
    'PLATFORM',
    'Local, sovereign, cloud, offline and hybrid runtime orchestration.',
    ['Local Runtime', 'Sovereign Runtime', 'Cloud Runtime', 'Hybrid Routing'],
    'server'
  ),

  studio(
    'security-aegis',
    'Security & AEGIS Studio',
    'SECURITY',
    'Security governance, threat detection and protective controls.',
    ['Threat Detection', 'Intrusion Controls', 'Authorization', 'Security Events'],
    'shield'
  ),

  studio(
    'identity-access',
    'Identity & Access Studio',
    'SECURITY',
    'Identity, authentication, authorization, RBAC and tenant boundaries.',
    ['Identity', 'Authentication', 'RBAC', 'Authorization', 'Tenant Isolation'],
    'key'
  ),

  studio(
    'faap',
    'FAAP Studio',
    'FINANCIAL',
    'Financial accounting, assets, ledgers and financial governance.',
    ['General Ledger', 'Journals', 'Assets', 'Balances', 'Financial Audit'],
    'landmark'
  ),

  studio(
    'digital-pay',
    'DIGITAL PAY Studio',
    'FINANCIAL',
    'Payment intent, routing, charging, settlement and reconciliation.',
    ['Payment Intent', 'Routing', 'Charging', 'Settlement', 'Reconciliation'],
    'credit-card'
  ),

  studio(
    'treasury',
    'Treasury Studio',
    'FINANCIAL',
    'Liquidity, reserves, treasury routing and settlement.',
    ['Liquidity', 'Reserves', 'Allocation', 'Treasury Routing'],
    'wallet'
  ),

  studio(
    'digital-auditor',
    'Digital Auditor Studio',
    'GOVERNANCE',
    'Continuous audit, evidence, cryptographic proof and compliance.',
    ['Evidence', 'Audit Chain', 'Proof', 'Compliance', 'Archive'],
    'file-check'
  ),

  studio(
    'workflow',
    'Workflow Studio',
    'OPERATIONS',
    'Governed workflow design, execution and state management.',
    ['Workflow Design', 'Execution', 'Approval', 'State', 'History'],
    'workflow'
  ),

  studio(
    'integration',
    'Integration Studio',
    'PLATFORM',
    'APIs, connectors, events and interoperability.',
    ['API Integration', 'Connectors', 'Event Bus', 'Interoperability'],
    'network'
  ),

  studio(
    'cloud',
    'Cloud Studio',
    'PLATFORM',
    'Sovereign cloud infrastructure and resource orchestration.',
    ['Nodes', 'Clusters', 'Provisioning', 'Scaling'],
    'cloud'
  ),

  studio(
    'offline-edge',
    'Offline & Edge Studio',
    'PLATFORM',
    'Offline-first execution, synchronization and edge workloads.',
    ['Offline Runtime', 'Synchronization', 'Conflict Resolution', 'Edge Execution'],
    'wifi-off'
  ),

  studio(
    'lifecycle-upgrade',
    'Lifecycle & Upgrade Studio',
    'LIFECYCLE',
    'Versioning, migration, upgrade, retirement and archival.',
    ['Versioning', 'Migration', 'Upgrade', 'Deprecation', 'Archive'],
    'refresh'
  ),

  studio(
    'observability',
    'Observability Studio',
    'OPERATIONS',
    'Metrics, traces, health, alerts and runtime observability.',
    ['Metrics', 'Tracing', 'Health', 'Alerts', 'Analysis'],
    'activity'
  ),

  studio(
    'disaster-recovery',
    'Disaster Recovery Studio',
    'RESILIENCE',
    'Backup, restoration, failover and continuity.',
    ['Backup', 'Restore', 'Failover', 'RPO', 'RTO'],
    'life-buoy'
  ),

  studio(
    'research-innovation',
    'Research & Innovation Studio',
    'INNOVATION',
    'Research, experimentation and new JUMO technology development.',
    ['Research', 'Experiments', 'Prototypes', 'Innovation'],
    'flask'
  ),

  studio(
    'education-systems',
    'Education Systems Studio',
    'SECTOR',
    'Education ecosystem and education ERP manufacturing.',
    ['University', 'College', 'TVET', 'Secondary', 'Pre & Primary'],
    'graduation-cap'
  ),

  studio(
    'health-systems',
    'Health Systems Studio',
    'SECTOR',
    'Health-sector platform and healthcare system manufacturing.',
    ['Hospital', 'Clinic', 'Patient', 'Clinical', 'Health Administration'],
    'heart-pulse'
  ),

  studio(
    'financial-systems',
    'Financial Systems Studio',
    'SECTOR',
    'Financial-sector system manufacturing and governance.',
    ['Banking', 'SACCO', 'Microfinance', 'Credit', 'Financial Services'],
    'bank'
  ),

  studio(
    'government-systems',
    'Government Systems Studio',
    'SECTOR',
    'Government and public-sector system manufacturing.',
    ['Government', 'Municipal', 'Citizen Services', 'Public Administration'],
    'building'
  ),

  studio(
    'commercial-products',
    'Commercial Products Studio',
    'COMMERCIAL',
    'Manufacturing and lifecycle management of JUMO commercial products.',
    ['Product Registration', 'Product Manufacturing', 'Product Verification', 'Product Lifecycle'],
    'shopping-bag'
  ),

  studio(
    'ux-experience',
    'UX & Experience Studio',
    'EXPERIENCE',
    'Public portals, workspaces and JUMO user experience systems.',
    ['Portal Design', 'Workspace Design', 'Accessibility', 'Responsive Experience'],
    'layout'
  ),

  studio(
    'web-mobile-applications',
    'Mobile & Web Application Studio',
    'APPLICATIONS',
    'Web and mobile application generation and lifecycle management.',
    ['Web Applications', 'Mobile Applications', 'UI Generation', 'Application Runtime'],
    'smartphone'
  ),
]);

export { JumoStudioRegistry };
