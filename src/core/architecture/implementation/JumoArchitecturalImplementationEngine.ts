export type ArchitecturalImplementationStatus =
  | 'PLANNED'
  | 'READY'
  | 'IMPLEMENTING'
  | 'IMPLEMENTED'
  | 'VERIFIED'
  | 'BLOCKED';

export type ArchitecturalElementKind =
  | 'LAYER'
  | 'SERVICE'
  | 'REGISTRY'
  | 'CONTRACT'
  | 'DATABASE'
  | 'API'
  | 'SECURITY_BOUNDARY'
  | 'INTEGRATION'
  | 'WORKSPACE'
  | 'PORTAL'
  | 'MODULE'
  | 'CONFIGURATION'
  | 'RUNTIME';

export interface ArchitecturalImplementationElement {
  id: string;
  architectureId: string;
  kind: ArchitecturalElementKind;
  name: string;
  description: string;
  required: boolean;
  dependencies: string[];
  status: ArchitecturalImplementationStatus;
  implementationReference?: string;
  verificationRequired: boolean;
  findings: string[];
}

export interface ArchitecturalImplementationPlan {
  id: string;
  architectureId: string;
  productId: string;
  createdAt: string;
  elements: ArchitecturalImplementationElement[];
  status: ArchitecturalImplementationStatus;
  blockingFindings: string[];
  recommendations: string[];
}

export interface ArchitecturalImplementationRequest {
  architectureId: string;
  productId: string;
  elements: Array<{
    id: string;
    kind: ArchitecturalElementKind;
    name: string;
    description?: string;
    required?: boolean;
    dependencies?: string[];
    implementationReference?: string;
  }>;
}

export class JumoArchitecturalImplementationEngine {
  private readonly plans = new Map<string, ArchitecturalImplementationPlan>();

  createPlan(
    request: ArchitecturalImplementationRequest
  ): ArchitecturalImplementationPlan {
    if (!request.architectureId.trim()) {
      throw new Error('Architecture ID is required.');
    }

    if (!request.productId.trim()) {
      throw new Error('Product ID is required.');
    }

    const planId =
      `architecture-implementation-${request.architectureId}-${request.productId}`;

    const elements: ArchitecturalImplementationElement[] =
      request.elements.map((element) => ({
        id: element.id,
        architectureId: request.architectureId,
        kind: element.kind,
        name: element.name,
        description: element.description ?? '',
        required: element.required ?? true,
        dependencies: [...(element.dependencies ?? [])],
        status: 'PLANNED',
        implementationReference: element.implementationReference,
        verificationRequired: true,
        findings: [],
      }));

    const plan: ArchitecturalImplementationPlan = {
      id: planId,
      architectureId: request.architectureId,
      productId: request.productId,
      createdAt: new Date().toISOString(),
      elements,
      status: elements.length > 0 ? 'READY' : 'BLOCKED',
      blockingFindings:
        elements.length > 0
          ? []
          : ['Approved architecture contains no implementation elements.'],
      recommendations:
        elements.length > 0
          ? []
          : ['Return to architecture definition before application building.'],
    };

    this.plans.set(planId, plan);

    return this.get(planId);
  }

  get(planId: string): ArchitecturalImplementationPlan {
    const plan = this.plans.get(planId);

    if (!plan) {
      throw new Error(
        `Architectural implementation plan not found: ${planId}`
      );
    }

    return this.clone(plan);
  }

  list(): ArchitecturalImplementationPlan[] {
    return Array.from(this.plans.values()).map((plan) => this.clone(plan));
  }

  beginImplementation(
    planId: string
  ): ArchitecturalImplementationPlan {
    const plan = this.requireMutable(planId);

    if (plan.status === 'BLOCKED') {
      return this.get(planId);
    }

    plan.status = 'IMPLEMENTING';

    for (const element of plan.elements) {
      if (element.status === 'PLANNED' || element.status === 'READY') {
        element.status = 'IMPLEMENTING';
      }
    }

    return this.get(planId);
  }

  registerImplementation(
    planId: string,
    elementId: string,
    implementationReference: string
  ): ArchitecturalImplementationPlan {
    const plan = this.requireMutable(planId);

    const element = plan.elements.find(
      (candidate) => candidate.id === elementId
    );

    if (!element) {
      throw new Error(
        `Architectural implementation element not found: ${elementId}`
      );
    }

    if (!implementationReference.trim()) {
      throw new Error('Implementation reference is required.');
    }

    element.implementationReference = implementationReference;
    element.status = 'IMPLEMENTED';

    this.recalculate(plan);

    return this.get(planId);
  }

  verifyImplementation(
    planId: string
  ): ArchitecturalImplementationPlan {
    const plan = this.requireMutable(planId);

    for (const element of plan.elements) {
      element.findings = [];

      if (element.required && !element.implementationReference) {
        element.findings.push(
          'Required architectural element has no implementation reference.'
        );
        element.status = 'BLOCKED';
        continue;
      }

      if (
        element.required &&
        element.dependencies.some(
          (dependency) =>
            !plan.elements.some(
              (candidate) =>
                candidate.id === dependency &&
                candidate.implementationReference
            )
        )
      ) {
        element.findings.push(
          'One or more architectural dependencies are not implemented.'
        );
        element.status = 'BLOCKED';
        continue;
      }

      element.status = 'VERIFIED';
    }

    this.recalculate(plan);

    return this.get(planId);
  }

  markApplicationBuildReady(
    planId: string
  ): boolean {
    const plan = this.requireMutable(planId);

    this.recalculate(plan);

    return (
      plan.status === 'VERIFIED' &&
      plan.elements.every(
        (element) =>
          !element.required ||
          (element.status === 'VERIFIED' &&
            Boolean(element.implementationReference))
      )
    );
  }

  remove(planId: string): boolean {
    return this.plans.delete(planId);
  }

  status() {
    const plans = this.list();

    return {
      planCount: plans.length,
      readyForApplicationBuilding: plans.filter(
        (plan) => plan.status === 'VERIFIED'
      ).length,
      blockedPlans: plans.filter(
        (plan) => plan.status === 'BLOCKED'
      ).length,
      implementedElements: plans.reduce(
        (count, plan) =>
          count +
          plan.elements.filter(
            (element) =>
              element.status === 'IMPLEMENTED' ||
              element.status === 'VERIFIED'
          ).length,
        0
      ),
      verifiedElements: plans.reduce(
        (count, plan) =>
          count +
          plan.elements.filter(
            (element) => element.status === 'VERIFIED'
          ).length,
        0
      ),
    };
  }

  private requireMutable(
    planId: string
  ): ArchitecturalImplementationPlan {
    const plan = this.plans.get(planId);

    if (!plan) {
      throw new Error(
        `Architectural implementation plan not found: ${planId}`
      );
    }

    return plan;
  }

  private recalculate(
    plan: ArchitecturalImplementationPlan
  ): void {
    plan.blockingFindings = plan.elements.flatMap(
      (element) =>
        element.findings.map(
          (finding) => `${element.name}: ${finding}`
        )
    );

    if (plan.blockingFindings.length > 0) {
      plan.status = 'BLOCKED';
      plan.recommendations = [
        'Correct every blocking architectural implementation finding.',
        'Re-run implementation verification before application building.',
      ];
      return;
    }

    const requiredElements = plan.elements.filter(
      (element) => element.required
    );

    const verified = requiredElements.every(
      (element) => element.status === 'VERIFIED'
    );

    const implemented = requiredElements.every(
      (element) =>
        element.status === 'IMPLEMENTED' ||
        element.status === 'VERIFIED'
    );

    if (verified) {
      plan.status = 'VERIFIED';
      plan.recommendations = [
        'Architecture implementation is verified.',
        'Application Building Engine may consume this plan.',
      ];
      return;
    }

    if (implemented) {
      plan.status = 'IMPLEMENTED';
      plan.recommendations = [
        'Implementation exists but has not completed architectural verification.',
      ];
      return;
    }

    plan.status = 'IMPLEMENTING';
  }

  private clone(
    plan: ArchitecturalImplementationPlan
  ): ArchitecturalImplementationPlan {
    return {
      ...plan,
      elements: plan.elements.map((element) => ({
        ...element,
        dependencies: [...element.dependencies],
        findings: [...element.findings],
      })),
      blockingFindings: [...plan.blockingFindings],
      recommendations: [...plan.recommendations],
    };
  }
}

export const jumoArchitecturalImplementationEngine =
  new JumoArchitecturalImplementationEngine();
