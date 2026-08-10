export type SpecificationFieldType =
  | 'TEXT'
  | 'LONG_TEXT'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'SELECT'
  | 'MULTI_SELECT'
  | 'STRUCTURE'
  | 'CONTACT'
  | 'ADDRESS'
  | 'ASSET'
  | 'CURRENCY'
  | 'CAPABILITY';

export interface SpecificationOption {
  id: string;
  label: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface SpecificationField {
  id: string;
  label: string;
  type: SpecificationFieldType;
  required?: boolean;
  options?: SpecificationOption[];
  dependsOn?: string[];
  validation?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SpecificationSchema {
  id: string;
  version: string;
  name: string;
  description?: string;
  fields: SpecificationField[];
  metadata?: Record<string, unknown>;
}

export interface EnterpriseSpecification {
  id: string;
  schemaId: string;
  schemaVersion: string;
  values: Record<string, unknown>;
  status:
    | 'DRAFT'
    | 'GUIDED'
    | 'READY_FOR_ARCHITECTURE'
    | 'APPROVED'
    | 'ARCHIVED';
  version: number;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface SpecificationIssue {
  id: string;
  fieldId?: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'BLOCKING';
  code: string;
  message: string;
  recommendation?: string;
}

export interface SpecificationAnalysis {
  complete: boolean;
  score: number;
  issues: SpecificationIssue[];
  missingFields: string[];
  contradictions: string[];
  recommendations: string[];
}

export class JumoDigitalSpecificationEngine {
  private readonly schemas = new Map<string, SpecificationSchema>();
  private readonly specifications =
    new Map<string, EnterpriseSpecification>();

  registerSchema(schema: SpecificationSchema): SpecificationSchema {
    if (!schema.id) throw new Error('Specification schema requires an ID.');
    if (!schema.version) {
      throw new Error(`Specification schema ${schema.id} requires a version.`);
    }

    this.schemas.set(`${schema.id}:${schema.version}`, schema);
    return schema;
  }

  getSchema(id: string, version: string): SpecificationSchema | undefined {
    return this.schemas.get(`${id}:${version}`);
  }

  listSchemas(): SpecificationSchema[] {
    return Array.from(this.schemas.values());
  }

  create(
    schemaId: string,
    schemaVersion: string,
    values: Record<string, unknown> = {},
  ): EnterpriseSpecification {
    const schema = this.getSchema(schemaId, schemaVersion);

    if (!schema) {
      throw new Error(
        `Specification schema not registered: ${schemaId}:${schemaVersion}`,
      );
    }

    const now = new Date().toISOString();

    const specification: EnterpriseSpecification = {
      id: `spec-${schemaId}-${Date.now()}`,
      schemaId,
      schemaVersion,
      values: { ...values },
      status: 'DRAFT',
      version: 1,
      createdAt: now,
      updatedAt: now,
    };

    this.specifications.set(specification.id, specification);
    return specification;
  }

  get(id: string): EnterpriseSpecification | undefined {
    return this.specifications.get(id);
  }

  update(
    id: string,
    values: Record<string, unknown>,
  ): EnterpriseSpecification {
    const specification = this.specifications.get(id);

    if (!specification) {
      throw new Error(`Specification not found: ${id}`);
    }

    specification.values = {
      ...specification.values,
      ...values,
    };

    specification.version += 1;
    specification.updatedAt = new Date().toISOString();

    return specification;
  }

  analyze(id: string): SpecificationAnalysis {
    const specification = this.specifications.get(id);

    if (!specification) {
      throw new Error(`Specification not found: ${id}`);
    }

    const schema = this.getSchema(
      specification.schemaId,
      specification.schemaVersion,
    );

    if (!schema) {
      throw new Error(
        `Specification schema not registered: ${specification.schemaId}:${specification.schemaVersion}`,
      );
    }

    const issues: SpecificationIssue[] = [];
    const missingFields: string[] = [];

    for (const field of schema.fields) {
      if (!field.required) continue;

      const value = specification.values[field.id];

      const missing =
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);

      if (missing) {
        missingFields.push(field.id);

        issues.push({
          id: `missing-${field.id}`,
          fieldId: field.id,
          severity: 'BLOCKING',
          code: 'REQUIRED_FIELD_MISSING',
          message: `Required specification field "${field.label}" is incomplete.`,
          recommendation: `Complete "${field.label}" before architecture generation.`,
        });
      }
    }

    const contradictions = this.detectContradictions(specification);

    for (const contradiction of contradictions) {
      issues.push({
        id: `contradiction-${issues.length + 1}`,
        severity: 'ERROR',
        code: 'SPECIFICATION_CONTRADICTION',
        message: contradiction,
        recommendation:
          'Review the conflicting requirements before approving the specification.',
      });
    }

    const total = schema.fields.filter(field => field.required).length;
    const completed = Math.max(total - missingFields.length, 0);
    const score = total === 0 ? 100 : Math.round((completed / total) * 100);

    return {
      complete:
        missingFields.length === 0 &&
        contradictions.length === 0,
      score,
      issues,
      missingFields,
      contradictions,
      recommendations: this.generateRecommendations(specification),
    };
  }

  approve(id: string): EnterpriseSpecification {
    const specification = this.specifications.get(id);

    if (!specification) {
      throw new Error(`Specification not found: ${id}`);
    }

    const analysis = this.analyze(id);

    if (!analysis.complete) {
      throw new Error(
        `Specification ${id} cannot be approved. Resolve blocking specification issues first.`,
      );
    }

    specification.status = 'APPROVED';
    specification.updatedAt = new Date().toISOString();

    return specification;
  }

  private detectContradictions(
    specification: EnterpriseSpecification,
  ): string[] {
    const contradictions: string[] = [];
    const values = specification.values;

    if (
      values['packageClass'] === 'ORDINARY' &&
      values['requiresGlobalCapabilities'] === true
    ) {
      contradictions.push(
        'The selected package class does not satisfy the requested global capabilities.',
      );
    }

    if (
      values['offlineRequired'] === true &&
      values['cloudOnlyOperation'] === true
    ) {
      contradictions.push(
        'Offline operation and cloud-only operation were both requested.',
      );
    }

    return contradictions;
  }

  private generateRecommendations(
    specification: EnterpriseSpecification,
  ): string[] {
    const recommendations: string[] = [];
    const values = specification.values;

    if (values['branches']) {
      recommendations.push(
        'Generate branch-aware organization, permissions and reporting requirements.',
      );
    }

    if (values['departments']) {
      recommendations.push(
        'Generate department-specific workflows, roles and reporting boundaries.',
      );
    }

    if (values['paymentRequirements']) {
      recommendations.push(
        'Evaluate configurable JUMO Digital Pay, FAAP and Treasury integration requirements.',
      );
    }

    if (values['securityRequirements']) {
      recommendations.push(
        'Evaluate AEGIS identity, authorization and security-boundary requirements.',
      );
    }

    return recommendations;
  }
}

export const JUMO_DIGITAL_SPECIFICATION_ENGINE =
  new JumoDigitalSpecificationEngine();
