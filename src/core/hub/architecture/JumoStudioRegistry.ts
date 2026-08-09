export type JumoStudioStatus =
  | 'FOUNDATION'
  | 'ACTIVE'
  | 'PLANNED'
  | 'INTEGRATION'
  | 'GOVERNED';

export interface JumoStudioDefinition {
  id: string;
  name: string;
  description: string;
  family: string;
  status: JumoStudioStatus;
  humanFacing: boolean;
  executable: boolean;
  configurable: boolean;
  verificationLayers: string[];
  dependencies: string[];
}

class JumoStudioRegistry {
  private readonly studios = new Map<string, JumoStudioDefinition>();

  constructor() {
    this.seed();
  }

  private seed(): void {
    const definitions: JumoStudioDefinition[] = [
      {
        id: 'architecture',
        name: 'JUMO Architecture & Systems Studio',
        description: 'Architecture design, system modelling, contracts and dependency planning.',
        family: 'ARCHITECTURE',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['ARCHITECTURE', 'DEPENDENCY', 'CONTRACT', 'VALIDATION'],
        dependencies: []
      },
      {
        id: 'intelligence',
        name: 'JUMO Intelligence Studio',
        description: 'JUMO Open AI integration, model routing, AI governance and reasoning orchestration.',
        family: 'AI',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['AI', 'MODEL', 'PROVIDER', 'SAFETY', 'EVALUATION'],
        dependencies: ['architecture']
      },
      {
        id: 'conversational-reasoning',
        name: 'JUMO Conversational Reasoning Studio',
        description: 'Human instruction interpretation, planning and enterprise reasoning.',
        family: 'REASONING',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['REASONING', 'PLANNING', 'CONTEXT', 'APPROVAL'],
        dependencies: ['intelligence']
      },
      {
        id: 'agent-workforce',
        name: 'JUMO Agent Workforce Studio',
        description: 'Agent registration, skills, delegation, supervision and lifecycle management.',
        family: 'AGENTS',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['AGENT', 'IDENTITY', 'DELEGATION', 'SUPERVISION'],
        dependencies: ['intelligence']
      },
      {
        id: 'product-ecosystem',
        name: 'JUMO Product & Ecosystem Studio',
        description: 'Products, ecosystems, ERP templates, modules, workflows and product packaging.',
        family: 'PRODUCT',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['PRODUCT', 'ECOSYSTEM', 'ERP', 'MODULE', 'WORKFLOW'],
        dependencies: ['architecture']
      },
      {
        id: 'data-knowledge',
        name: 'JUMO Data & Knowledge Studio',
        description: 'Data, schemas, ontology, knowledge graph, lineage and governance.',
        family: 'DATA',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['DATA', 'SCHEMA', 'KNOWLEDGE', 'LINEAGE', 'GOVERNANCE'],
        dependencies: ['architecture']
      },
      {
        id: 'software-engineering',
        name: 'JUMO Software Engineering Studio',
        description: 'Source, components, APIs, tests, builds, dependencies and releases.',
        family: 'ENGINEERING',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['SOURCE', 'API', 'TEST', 'BUILD', 'ARTIFACT', 'RELEASE'],
        dependencies: ['architecture', 'product-ecosystem']
      },
      {
        id: 'manufacturing',
        name: 'JUMO Manufacturing Studio',
        description: 'Manufacturing planning, production jobs, resources, workforce and quality.',
        family: 'MANUFACTURING',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['PRODUCTION', 'RESOURCE', 'SCHEDULING', 'QUALITY'],
        dependencies: ['product-ecosystem', 'software-engineering']
      },
      {
        id: 'build',
        name: 'JUMO Build Studio',
        description: 'Artifact compilation, packaging, validation and build orchestration.',
        family: 'BUILD',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['BUILD', 'COMPILE', 'PACKAGE', 'ARTIFACT'],
        dependencies: ['software-engineering']
      },
      {
        id: 'deployment',
        name: 'JUMO Deployment Studio',
        description: 'Environment provisioning, deployment, health checks and rollback.',
        family: 'DEPLOYMENT',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['ENVIRONMENT', 'CONFIG', 'HEALTH', 'ROLLBACK'],
        dependencies: ['build']
      },
      {
        id: 'verification',
        name: 'JUMO Verification Studio',
        description: 'Configurable architecture, product and runtime verification layers.',
        family: 'VERIFICATION',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['ALL_REGISTERED_LAYERS'],
        dependencies: ['architecture', 'deployment']
      },
      {
        id: 'registry',
        name: 'JUMO Registries Studio',
        description: 'Authoritative registration and discovery of architectures, products, ecosystems, agents and runtimes.',
        family: 'REGISTRY',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['REGISTRY', 'IDENTITY', 'VERSION', 'LIFECYCLE'],
        dependencies: ['architecture']
      },
      {
        id: 'infrastructure-hybrid',
        name: 'JUMO Infrastructure & Hybrid Runtime Studio',
        description: 'Local, sovereign, cloud, offline and hybrid runtime orchestration.',
        family: 'HYBRID',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['LOCAL', 'SOVEREIGN', 'CLOUD', 'OFFLINE', 'SYNC'],
        dependencies: ['architecture']
      },
      {
        id: 'planning',
        name: 'JUMO Planning Studio',
        description: 'Enterprise planning, architectural planning, implementation planning and execution roadmaps.',
        family: 'PLANNING',
        status: 'ACTIVE',
        humanFacing: true,
        executable: true,
        configurable: true,
        verificationLayers: ['PLANNING', 'DEPENDENCY', 'RISK', 'MILESTONE'],
        dependencies: ['conversational-reasoning', 'architecture']
      }
    ];

    for (const studio of definitions) {
      this.studios.set(studio.id, studio);
    }
  }

  register(studio: JumoStudioDefinition): void {
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
    return this.list().filter(s => s.status === 'ACTIVE');
  }

  executable(): JumoStudioDefinition[] {
    return this.list().filter(s => s.executable);
  }

  humanFacing(): JumoStudioDefinition[] {
    return this.list().filter(s => s.humanFacing);
  }

  configurable(): JumoStudioDefinition[] {
    return this.list().filter(s => s.configurable);
  }

  size(): number {
    return this.studios.size;
  }
}

export const JUMO_STUDIO_REGISTRY = new JumoStudioRegistry();

export { JumoStudioRegistry };
