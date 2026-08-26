/**
 * JUMO AI-GUIDED SPECIFICATION ENGINE
 *
 * Purpose:
 *   Convert guided client answers into a verified specification blueprint
 *   before architecture generation, ERP manufacturing or provisioning.
 *
 * Architectural rule:
 *   AI recommends; it does not silently invent or approve requirements.
 *
 * Pipeline:
 *   Intake
 *     -> Discovery
 *     -> Completeness
 *     -> Consistency
 *     -> AI Recommendations
 *     -> Client Confirmation
 *     -> Specification Verification
 *     -> Architecture Compilation
 *
 * No commercial product, ecosystem, ERP, package or module is hardcoded
 * into the execution engine. Those are supplied through registries/configuration.
 */

export type SpecificationPackage =
  | 'ORDINARY'
  | 'PREMIUM'
  | 'GLOBAL';

export type SpecificationStatus =
  | 'DRAFT'
  | 'INCOMPLETE'
  | 'READY_FOR_REVIEW'
  | 'AWAITING_CONFIRMATION'
  | 'APPROVED'
  | 'REJECTED';

export type RecommendationSeverity =
  | 'INFO'
  | 'RECOMMENDATION'
  | 'WARNING'
  | 'BLOCKING';

export type SpecificationFindingStatus =
  | 'OPEN'
  | 'RESOLVED'
  | 'WAIVED';

export interface SpecificationFieldDefinition {
  id: string;
  label: string;
  category: string;
  required: boolean;
  condition?: (
    specification: JumoEnterpriseSpecification
  ) => boolean;
  options?: string[];
  guidance?: string;
}

export interface SpecificationQuestion {
  id: string;
  fieldId: string;
  prompt: string;
  type:
    | 'TEXT'
    | 'NUMBER'
    | 'BOOLEAN'
    | 'SELECT'
    | 'MULTI_SELECT';
  options?: string[];
  required: boolean;
  guidance?: string;
}

export interface JumoPublicEnterpriseProfile {
  proposedName?: string;
  publicDescription?: string;
  logoReference?: string;
  primaryColour?: string;
  secondaryColour?: string;
  accentColour?: string;
  publicPhone?: string;
  publicEmail?: string;
  website?: string;
  physicalAddress?: string;
  postalAddress?: string;
  publicServices?: string[];
  publicCommunicationChannels?: string[];
}

export interface JumoOrganizationalStructure {
  headquarters?: string;
  branches?: number;
  locations?: number;
  departments?: number;
  operationalUnits?: number;
  administrativeStaff?: number;
  totalEmployees?: number;
  estimatedUsers?: number;
}

export interface JumoIntegrationRequirement {
  productId: string;
  required: boolean;
  reason?: string;
  confirmed: boolean;
}

export interface JumoEnterpriseSpecification {
  specificationId: string;
  version: number;

  ecosystemId?: string;
  enterpriseTypeId?: string;
  package?: SpecificationPackage;

  publicProfile: JumoPublicEnterpriseProfile;
  organization: JumoOrganizationalStructure;

  ownershipModel?: string;
  country?: string;
  operatingJurisdictions?: string[];

  businessModel?: string;
  coreServices?: string[];

  capabilities?: string[];
  workflows?: string[];
  dataDomains?: string[];

  userRoles?: string[];
  navigationRequirements?: string[];
  configurationRequirements?: string[];

  integrations: JumoIntegrationRequirement[];

  offlineRequired?: boolean;
  cloudRequired?: boolean;
  synchronizationRequired?: boolean;

  complianceRequirements?: string[];
  regulatoryRequirements?: string[];

  clientNotes?: string;

  status: SpecificationStatus;
  clientConfirmed: boolean;
}

export interface SpecificationRecommendation {
  id: string;
  severity: RecommendationSeverity;
  category: string;
  title: string;
  description: string;
  source: 'RULE' | 'AI' | 'SYSTEM';
  requiresClientConfirmation: boolean;
  accepted?: boolean;
}

export interface SpecificationFinding {
  id: string;
  category: string;
  severity: RecommendationSeverity;
  fieldId?: string;
  message: string;
  recommendation?: string;
  status: SpecificationFindingStatus;
}

export interface SpecificationVerificationResult {
  passed: boolean;
  score: number;
  mandatoryFindings: number;
  findings: SpecificationFinding[];
  recommendations: SpecificationRecommendation[];
}

export interface JumoSpecificationBlueprint {
  specificationId: string;
  generatedAt: string;
  ecosystemId?: string;
  enterpriseTypeId?: string;
  package?: SpecificationPackage;

  requiredLayers: string[];
  requiredProducts: string[];
  requiredCapabilities: string[];
  requiredWorkspaces: string[];
  requiredNavigationAreas: string[];

  assumptions: string[];
  unresolvedItems: string[];

  verification: SpecificationVerificationResult;
}

export interface JumoSpecificationRule {
  id: string;
  name: string;
  description: string;

  evaluate(
    specification: JumoEnterpriseSpecification,
    context: JumoSpecificationContext
  ): SpecificationRecommendation | null;
}

export interface JumoSpecificationContext {
  fields: SpecificationFieldDefinition[];
  questions: SpecificationQuestion[];
  ecosystems: Map<string, unknown>;
  enterpriseTypes: Map<string, unknown>;
  products: Map<string, unknown>;
  capabilities: Map<string, unknown>;
  layers: Map<string, unknown>;
  rules: JumoSpecificationRule[];
}

export interface JumoAIGuidedSpecificationReport {
  specification: JumoEnterpriseSpecification;
  completeness: number;
  recommendations: SpecificationRecommendation[];
  verification: SpecificationVerificationResult;
  blueprint?: JumoSpecificationBlueprint;
}

export class JumoAIGuidedSpecificationEngine {
  private readonly specifications =
    new Map<string, JumoEnterpriseSpecification>();

  private readonly fields =
    new Map<string, SpecificationFieldDefinition>();

  private readonly rules =
    new Map<string, JumoSpecificationRule>();

  private readonly ecosystems =
    new Map<string, unknown>();

  private readonly enterpriseTypes =
    new Map<string, unknown>();

  private readonly products =
    new Map<string, unknown>();

  private readonly capabilities =
    new Map<string, unknown>();

  private readonly layers =
    new Map<string, unknown>();

  constructor() {
    this.registerDefaultSpecificationRules();
  }

  registerField(field: SpecificationFieldDefinition): void {
    if (!field.id.trim()) {
      throw new Error('Specification field requires an ID.');
    }

    this.fields.set(field.id, field);
  }

  registerRule(rule: JumoSpecificationRule): void {
    if (!rule.id.trim()) {
      throw new Error('Specification rule requires an ID.');
    }

    this.rules.set(rule.id, rule);
  }

  registerEcosystem(id: string, definition: unknown): void {
    this.ecosystems.set(id, definition);
  }

  registerEnterpriseType(id: string, definition: unknown): void {
    this.enterpriseTypes.set(id, definition);
  }

  registerProduct(id: string, definition: unknown): void {
    this.products.set(id, definition);
  }

  registerCapability(id: string, definition: unknown): void {
    this.capabilities.set(id, definition);
  }

  registerLayer(id: string, definition: unknown): void {
    this.layers.set(id, definition);
  }

  create(
    partial: Partial<JumoEnterpriseSpecification> = {}
  ): JumoEnterpriseSpecification {
    const specification: JumoEnterpriseSpecification = {
      specificationId:
        partial.specificationId ??
        `spec-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

      version: partial.version ?? 1,

      ecosystemId: partial.ecosystemId,
      enterpriseTypeId: partial.enterpriseTypeId,
      package: partial.package,

      publicProfile: partial.publicProfile ?? {},
      organization: partial.organization ?? {},

      ownershipModel: partial.ownershipModel,
      country: partial.country,
      operatingJurisdictions:
        partial.operatingJurisdictions ?? [],

      businessModel: partial.businessModel,
      coreServices: partial.coreServices ?? [],

      capabilities: partial.capabilities ?? [],
      workflows: partial.workflows ?? [],
      dataDomains: partial.dataDomains ?? [],

      userRoles: partial.userRoles ?? [],
      navigationRequirements:
        partial.navigationRequirements ?? [],
      configurationRequirements:
        partial.configurationRequirements ?? [],

      integrations: partial.integrations ?? [],

      offlineRequired: partial.offlineRequired ?? false,
      cloudRequired: partial.cloudRequired ?? true,
      synchronizationRequired:
        partial.synchronizationRequired ?? false,

      complianceRequirements:
        partial.complianceRequirements ?? [],
      regulatoryRequirements:
        partial.regulatoryRequirements ?? [],

      clientNotes: partial.clientNotes,

      status: partial.status ?? 'DRAFT',
      clientConfirmed: partial.clientConfirmed ?? false,
    };

    this.specifications.set(
      specification.specificationId,
      specification
    );

    return specification;
  }

  update(
    specificationId: string,
    patch: Partial<JumoEnterpriseSpecification>
  ): JumoEnterpriseSpecification {
    const current = this.require(specificationId);

    const updated: JumoEnterpriseSpecification = {
      ...current,
      ...patch,
      publicProfile: {
        ...current.publicProfile,
        ...(patch.publicProfile ?? {}),
      },
      organization: {
        ...current.organization,
        ...(patch.organization ?? {}),
      },
      integrations:
        patch.integrations ?? current.integrations,
      version: current.version + 1,
    };

    this.specifications.set(specificationId, updated);

    return updated;
  }

  get(specificationId: string) {
    return this.specifications.get(specificationId);
  }

  require(specificationId: string) {
    const specification = this.get(specificationId);

    if (!specification) {
      throw new Error(
        `Specification not found: ${specificationId}`
      );
    }

    return specification;
  }

  discover(
    specificationId: string
  ): JumoAIGuidedSpecificationReport {
    const specification = this.require(specificationId);

    const completeness =
      this.calculateCompleteness(specification);

    const recommendations =
      this.generateRecommendations(specification);

    const verification =
      this.verify(specification, recommendations);

    const status =
      verification.passed && specification.clientConfirmed
        ? 'APPROVED'
        : verification.passed
          ? 'AWAITING_CONFIRMATION'
          : completeness < 100
            ? 'INCOMPLETE'
            : 'READY_FOR_REVIEW';

    specification.status = status;

    this.specifications.set(
      specification.specificationId,
      specification
    );

    return {
      specification,
      completeness,
      recommendations,
      verification,
    };
  }

  confirm(
    specificationId: string
  ): JumoAIGuidedSpecificationReport {
    const specification = this.require(specificationId);

    const report = this.discover(specificationId);

    if (!report.verification.passed) {
      throw new Error(
        'Specification cannot be confirmed while mandatory verification findings remain.'
      );
    }

    specification.clientConfirmed = true;
    specification.status = 'APPROVED';

    this.specifications.set(
      specificationId,
      specification
    );

    return this.discover(specificationId);
  }

  compileArchitecture(
    specificationId: string
  ): JumoSpecificationBlueprint {
    const specification = this.require(specificationId);

    const report = this.discover(specificationId);

    if (!report.verification.passed) {
      throw new Error(
        'Architecture compilation blocked: specification verification has not passed.'
      );
    }

    if (!specification.clientConfirmed) {
      throw new Error(
        'Architecture compilation blocked: client confirmation is required.'
      );
    }

    const requiredProducts =
      specification.integrations
        .filter(item => item.required)
        .map(item => item.productId);

    const requiredCapabilities =
      specification.capabilities ?? [];

    const requiredWorkspaces =
      this.deriveWorkspaces(specification);

    const requiredNavigationAreas =
      specification.navigationRequirements ?? [];

    const requiredLayers =
      this.deriveLayers(specification);

    const unresolvedItems =
      this.findUnresolvedItems(specification);

    if (unresolvedItems.length > 0) {
      throw new Error(
        `Architecture compilation blocked by ${unresolvedItems.length} unresolved specification item(s).`
      );
    }

    return {
      specificationId: specification.specificationId,
      generatedAt: new Date().toISOString(),

      ecosystemId: specification.ecosystemId,
      enterpriseTypeId: specification.enterpriseTypeId,
      package: specification.package,

      requiredLayers,
      requiredProducts,
      requiredCapabilities,
      requiredWorkspaces,
      requiredNavigationAreas,

      assumptions: [],
      unresolvedItems,

      verification: report.verification,
    };
  }

  private calculateCompleteness(
    specification: JumoEnterpriseSpecification
  ): number {
    const activeFields = Array.from(
      this.fields.values()
    ).filter(field =>
      field.condition
        ? field.condition(specification)
        : true
    );

    if (activeFields.length === 0) {
      return 100;
    }

    let completed = 0;

    for (const field of activeFields) {
      if (this.fieldHasValue(specification, field.id)) {
        completed++;
      }
    }

    return Math.round(
      (completed / activeFields.length) * 100
    );
  }

  private fieldHasValue(
    specification: JumoEnterpriseSpecification,
    fieldId: string
  ): boolean {
    const source =
      specification as unknown as Record<string, unknown>;

    const value = source[fieldId];

    if (value !== undefined && value !== null) {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return true;
    }

    if (fieldId.startsWith('public.')) {
      const key = fieldId.slice(7);

      if (
        key in specification.publicProfile
      ) {
        return this.fieldHasNestedValue(
          specification.publicProfile,
          key as keyof JumoPublicEnterpriseProfile
        );
      }

      return false;
    }

    if (fieldId.startsWith('organization.')) {
      const key = fieldId.slice(13);

      if (
        key in specification.organization
      ) {
        return this.fieldHasNestedValue(
          specification.organization,
          key as keyof JumoOrganizationalStructure
        );
      }

      return false;
    }

    return false;
  }

  private fieldHasNestedValue<T extends object>(
    object: T,
    key: keyof T
  ): boolean {
    const value = object[key];

    if (value === undefined || value === null) {
      return false;
    }

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return true;
  }

  private generateRecommendations(
    specification: JumoEnterpriseSpecification
  ): SpecificationRecommendation[] {
    const context = this.context();

    return Array.from(this.rules.values())
      .map(rule =>
        rule.evaluate(specification, context)
      )
      .filter(
        (
          recommendation
        ): recommendation is SpecificationRecommendation =>
          recommendation !== null
      );
  }

  private verify(
    specification: JumoEnterpriseSpecification,
    recommendations: SpecificationRecommendation[]
  ): SpecificationVerificationResult {
    const findings: SpecificationFinding[] = [];

    for (const field of this.fields.values()) {
      const active =
        field.condition
          ? field.condition(specification)
          : true;

      if (
        active &&
        field.required &&
        !this.fieldHasValue(specification, field.id)
      ) {
        findings.push({
          id: `missing-${field.id}`,
          category: field.category,
          severity: 'BLOCKING',
          fieldId: field.id,
          message:
            `Required specification field "${field.label}" is missing.`,
          recommendation:
            field.guidance ??
            `Complete "${field.label}" before continuing.`,
          status: 'OPEN',
        });
      }
    }

    for (const recommendation of recommendations) {
      if (recommendation.severity === 'BLOCKING') {
        findings.push({
          id: recommendation.id,
          category: recommendation.category,
          severity: recommendation.severity,
          message: recommendation.description,
          recommendation: recommendation.title,
          status: 'OPEN',
        });
      }
    }

    const mandatoryFindings =
      findings.filter(
        finding =>
          finding.severity === 'BLOCKING' &&
          finding.status === 'OPEN'
      ).length;

    const score = Math.max(
      0,
      100 -
        mandatoryFindings * 10
    );

    return {
      passed: mandatoryFindings === 0,
      score,
      mandatoryFindings,
      findings,
      recommendations,
    };
  }

  private deriveWorkspaces(
    specification: JumoEnterpriseSpecification
  ): string[] {
    const workspaces = new Set<string>();

    workspaces.add('executive');
    workspaces.add('administration');

    if (
      (specification.userRoles ?? []).length > 0
    ) {
      workspaces.add('role-based');
    }

    if (
      (specification.capabilities ?? []).length > 0
    ) {
      workspaces.add('operations');
    }

    if (
      (specification.integrations ?? []).length > 0
    ) {
      workspaces.add('integrations');
    }

    workspaces.add('configuration');
    workspaces.add('reports');

    return Array.from(workspaces);
  }

  private deriveLayers(
    specification: JumoEnterpriseSpecification
  ): string[] {
    const layers = new Set<string>();

    layers.add('public-platform');
    layers.add('identity-access');
    layers.add('specification');
    layers.add('architecture');
    layers.add('configuration');
    layers.add('navigation');
    layers.add('design');
    layers.add('commercial-products');
    layers.add('runtime');
    layers.add('data');
    layers.add('integration');
    layers.add('security');
    layers.add('ai');
    layers.add('verification');
    layers.add('testing');
    layers.add('operations');

    if (specification.offlineRequired) {
      layers.add('offline-hybrid');
    }

    if (
      (specification.complianceRequirements ?? []).length > 0
    ) {
      layers.add('compliance');
    }

    return Array.from(layers);
  }

  private findUnresolvedItems(
    specification: JumoEnterpriseSpecification
  ): string[] {
    const unresolved: string[] = [];

    if (!specification.ecosystemId) {
      unresolved.push('ecosystem');
    }

    if (!specification.enterpriseTypeId) {
      unresolved.push('enterprise-type');
    }

    if (!specification.package) {
      unresolved.push('commercial-package');
    }

    if (
      !specification.publicProfile.proposedName
    ) {
      unresolved.push('public-enterprise-name');
    }

    return unresolved;
  }

  private context(): JumoSpecificationContext {
    return {
      fields: Array.from(this.fields.values()),
      questions: [],
      ecosystems: this.ecosystems,
      enterpriseTypes: this.enterpriseTypes,
      products: this.products,
      capabilities: this.capabilities,
      layers: this.layers,
      rules: Array.from(this.rules.values()),
    };
  }

  private registerDefaultSpecificationRules(): void {
    this.registerField({
      id: 'ecosystemId',
      label: 'Enterprise ecosystem',
      category: 'classification',
      required: true,
      guidance:
        'Select the ecosystem that best represents the enterprise.',
    });

    this.registerField({
      id: 'enterpriseTypeId',
      label: 'Enterprise type',
      category: 'classification',
      required: true,
    });

    this.registerField({
      id: 'package',
      label: 'Commercial package',
      category: 'commercial',
      required: true,
    });

    this.registerField({
      id: 'public.proposedName',
      label: 'Proposed enterprise name',
      category: 'public-platform',
      required: true,
    });

    this.registerField({
      id: 'organization.branches',
      label: 'Number of branches',
      category: 'organization',
      required: true,
    });

    this.registerField({
      id: 'organization.departments',
      label: 'Number of departments',
      category: 'organization',
      required: true,
    });

    this.registerField({
      id: 'organization.totalEmployees',
      label: 'Total employees',
      category: 'organization',
      required: true,
    });

    this.registerRule({
      id: 'package-scale-review',
      name: 'Package Scale Review',
      description:
        'Review whether the selected package corresponds to the declared enterprise scale.',
      evaluate: specification => {
        const employees =
          specification.organization.totalEmployees ?? 0;

        if (
          specification.package === 'GLOBAL' &&
          employees < 100
        ) {
          return {
            id: 'package-scale-review',
            severity: 'WARNING',
            category: 'commercial',
            title:
              'Confirm Global package requirement',
            description:
              'The selected Global package may exceed the currently declared enterprise scale. Confirm the requirement or select another package.',
            source: 'RULE',
            requiresClientConfirmation: true,
          };
        }

        return null;
      },
    });

    this.registerRule({
      id: 'offline-cloud-review',
      name: 'Hybrid Operation Review',
      description:
        'Verify cloud and offline requirements are explicitly understood.',
      evaluate: specification => {
        if (
          specification.offlineRequired &&
          !specification.synchronizationRequired
        ) {
          return {
            id: 'offline-sync-review',
            severity: 'RECOMMENDATION',
            category: 'hybrid',
            title:
              'Configure synchronization policy',
            description:
              'Offline operation has been requested without an explicit synchronization requirement.',
            source: 'RULE',
            requiresClientConfirmation: true,
          };
        }

        return null;
      },
    });

    this.registerRule({
      id: 'public-profile-review',
      name: 'Public Profile Review',
      description:
        'Ensure the enterprise has enough information for its public platform.',
      evaluate: specification => {
        const profile =
          specification.publicProfile;

        if (
          profile.proposedName &&
          !profile.publicDescription
        ) {
          return {
            id: 'public-description-review',
            severity: 'RECOMMENDATION',
            category: 'public-platform',
            title:
              'Add public enterprise description',
            description:
              'A public enterprise name exists but no public description has been supplied.',
            source: 'RULE',
            requiresClientConfirmation: true,
          };
        }

        return null;
      },
    });
  }
}

export const jumoAIGuidedSpecificationEngine =
  new JumoAIGuidedSpecificationEngine();
