import {
  EnterpriseSpecification,
  JumoDigitalSpecificationEngine,
} from '../specification/JumoDigitalSpecificationEngine';

export interface ArchitectureRequirement {
  id: string;
  category:
    | 'LAYER'
    | 'COMPONENT'
    | 'MODULE'
    | 'INTEGRATION'
    | 'NAVIGATION'
    | 'SECURITY'
    | 'DATA'
    | 'AI'
    | 'CLOUD';
  name: string;
  required: boolean;
  rationale: string;
  source: string;
  metadata?: Record<string, unknown>;
}

export interface EnterpriseArchitectureBlueprint {
  id: string;
  specificationId: string;
  specificationVersion: number;
  requirements: ArchitectureRequirement[];
  status: 'DRAFT' | 'READY_FOR_MANUFACTURING' | 'APPROVED';
  generatedAt: string;
  metadata?: Record<string, unknown>;
}

export class JumoAISpecificationArchitect {
  private readonly blueprints =
    new Map<string, EnterpriseArchitectureBlueprint>();

  constructor(
    private readonly specificationEngine: JumoDigitalSpecificationEngine,
  ) {}

  generate(specificationId: string): EnterpriseArchitectureBlueprint {
    const specification = this.specificationEngine.get(specificationId);

    if (!specification) {
      throw new Error(`Specification not found: ${specificationId}`);
    }

    const analysis = this.specificationEngine.analyze(specificationId);

    if (!analysis.complete) {
      throw new Error(
        `Architecture cannot be generated from incomplete specification ${specificationId}.`,
      );
    }

    const requirements = this.deriveRequirements(specification);

    const blueprint: EnterpriseArchitectureBlueprint = {
      id: `architecture-${specificationId}-${Date.now()}`,
      specificationId,
      specificationVersion: specification.version,
      requirements,
      status: 'READY_FOR_MANUFACTURING',
      generatedAt: new Date().toISOString(),
    };

    this.blueprints.set(blueprint.id, blueprint);
    return blueprint;
  }

  get(id: string): EnterpriseArchitectureBlueprint | undefined {
    return this.blueprints.get(id);
  }

  list(): EnterpriseArchitectureBlueprint[] {
    return Array.from(this.blueprints.values());
  }

  private deriveRequirements(
    specification: EnterpriseSpecification,
  ): ArchitectureRequirement[] {
    const values = specification.values;
    const requirements: ArchitectureRequirement[] = [];

    const add = (
      category: ArchitectureRequirement['category'],
      name: string,
      rationale: string,
      required = true,
    ) => {
      requirements.push({
        id: `requirement-${requirements.length + 1}`,
        category,
        name,
        required,
        rationale,
        source: specification.id,
      });
    };

    add(
      'LAYER',
      'Enterprise Runtime Layer',
      'Every manufactured enterprise requires an executable runtime foundation.',
    );

    add(
      'NAVIGATION',
      'Enterprise Navigation System',
      'The approved enterprise must provide navigable workspaces and application routes.',
    );

    add(
      'COMPONENT',
      'Enterprise Configuration System',
      'The application must be configurable rather than dependent on source-code changes.',
    );

    add(
      'SECURITY',
      'Identity and Authorization',
      'Enterprise applications require controlled identity and access boundaries.',
    );

    add(
      'DATA',
      'Enterprise Data Layer',
      'Enterprise records require controlled persistence and lifecycle management.',
    );

    if (values['paymentRequirements']) {
      add(
        'INTEGRATION',
        'JUMO Digital Pay',
        'Payment requirements require configurable payment integration.',
      );
    }

    if (values['accountingRequirements']) {
      add(
        'INTEGRATION',
        'FAAP',
        'Accounting requirements require configurable financial integration.',
      );
    }

    if (values['treasuryRequirements']) {
      add(
        'INTEGRATION',
        'JUMO Treasury',
        'Treasury requirements require configurable treasury integration.',
      );
    }

    if (values['securityRequirements']) {
      add(
        'SECURITY',
        'AEGIS',
        'Security requirements require configurable AEGIS integration.',
      );
    }

    if (values['cloudRequirements']) {
      add(
        'CLOUD',
        'JUMO Cloud Quality Provisioning',
        'Cloud requirements require quality-controlled provisioning.',
      );
    }

    if (values['aiRequirements']) {
      add(
        'AI',
        'JUMO AI Guidance',
        'AI requirements require governed AI routing and automation.',
      );
    }

    return requirements;
  }
}
