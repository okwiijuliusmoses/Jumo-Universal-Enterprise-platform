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
  status: JumoStudioStatus;
  families: string[];
  capabilities: string[];
  humanFacing: boolean;
  executable: boolean;
}

const INITIAL_STUDIOS: JumoStudioDefinition[] = [
  {
    id: 'reasoning',
    name: 'JUMO General-Purpose Reasoning Studio',
    description: 'Human-facing planning, reasoning and instruction interpretation.',
    status: 'FOUNDATION',
    families: ['REASONING', 'PLANNING'],
    capabilities: ['Conversation', 'Planning', 'Requirement Analysis', 'Decision Support'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'intelligence',
    name: 'JUMO Intelligence Studio',
    description: 'External AI-provider integration, routing, context and model governance.',
    status: 'ACTIVE',
    families: ['AI'],
    capabilities: ['Provider Routing', 'Model Registry', 'Context', 'Evaluation'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'agent-workforce',
    name: 'JUMO Agent Workforce Studio',
    description: 'Specialized AI-agent registration, delegation, supervision and lifecycle.',
    status: 'ACTIVE',
    families: ['AGENTS'],
    capabilities: ['Agent Registry', 'Delegation', 'Scheduling', 'Supervision'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'architecture',
    name: 'JUMO Architecture & Systems Studio',
    description: 'Architecture modelling, contracts, dependencies and validation.',
    status: 'ACTIVE',
    families: ['ARCHITECTURE'],
    capabilities: ['System Models', 'Component Models', 'Contracts', 'Dependency Graphs'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'product-ecosystem',
    name: 'JUMO Product & Ecosystem Studio',
    description: 'Products, ecosystems, ERP templates, modules and product packaging.',
    status: 'ACTIVE',
    families: ['PRODUCT'],
    capabilities: ['Product Registry', 'Ecosystem Registry', 'ERP Factory', 'Module Factory'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'data-knowledge',
    name: 'JUMO Data & Knowledge Studio',
    description: 'Enterprise data, schemas, ontology, knowledge and governance.',
    status: 'ACTIVE',
    families: ['DATA'],
    capabilities: ['Schema Registry', 'Knowledge Graph', 'Lineage', 'Data Governance'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'software-engineering',
    name: 'JUMO Software Engineering Studio',
    description: 'Source, components, APIs, testing, builds and release engineering.',
    status: 'ACTIVE',
    families: ['ENGINEERING'],
    capabilities: ['Source Registry', 'API Engineering', 'Testing', 'Build Pipeline'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'manufacturing',
    name: 'JUMO Manufacturing Studio',
    description: 'Production planning, jobs, engineering workforce and production evidence.',
    status: 'ACTIVE',
    families: ['MANUFACTURING'],
    capabilities: ['Production Planning', 'Jobs', 'Scheduling', 'Quality'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'hybrid-runtime',
    name: 'JUMO Infrastructure & Hybrid Runtime Studio',
    description: 'Local, sovereign, cloud, offline and synchronization runtime orchestration.',
    status: 'FOUNDATION',
    families: ['HYBRID'],
    capabilities: ['Local Runtime', 'Sovereign Runtime', 'Cloud Runtime', 'Offline Runtime'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'verification',
    name: 'JUMO Verification Studio',
    description: 'Configurable architecture, product and deployment verification.',
    status: 'ACTIVE',
    families: ['VERIFICATION', 'COMPLIANCE'],
    capabilities: ['Verification Layers', 'Quality Gates', 'Evidence', 'Certification'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'deployment',
    name: 'JUMO Deployment Studio',
    description: 'Release, deployment, environment and rollback orchestration.',
    status: 'ACTIVE',
    families: ['DEPLOYMENT'],
    capabilities: ['Environment Management', 'Release', 'Rollback', 'Health'],
    humanFacing: true,
    executable: true
  },
  {
    id: 'registry',
    name: 'JUMO Registry Studio',
    description: 'Authoritative registries for architecture, products, ecosystems and runtime.',
    status: 'ACTIVE',
    families: ['REGISTRY'],
    capabilities: ['Registry Management', 'Discovery', 'Lifecycle', 'Authority'],
    humanFacing: true,
    executable: true
  }
];

class JumoStudioRegistry {
  private readonly studios = new Map<string, JumoStudioDefinition>();

  constructor() {
    for (const studio of INITIAL_STUDIOS) {
      this.upsert(studio);
    }
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
        studio.status === 'ACTIVE' ||
        studio.status === 'FOUNDATION' ||
        studio.status === 'INTEGRATION'
    );
  }

  executable(): JumoStudioDefinition[] {
    return this.list().filter(studio => studio.executable);
  }

  humanFacing(): JumoStudioDefinition[] {
    return this.list().filter(studio => studio.humanFacing);
  }

  families(): string[] {
    return Array.from(
      new Set(this.list().flatMap(studio => studio.families))
    );
  }

  has(id: string): boolean {
    return this.studios.has(id);
  }

  remove(id: string): boolean {
    return this.studios.delete(id);
  }

  clear(): void {
    this.studios.clear();
  }

  count(): number {
    return this.studios.size;
  }
}

export const JUMO_STUDIO_REGISTRY = new JumoStudioRegistry();

export { JumoStudioRegistry };
