export type ApplicationBuildStatus =
  | 'PLANNED'
  | 'READY'
  | 'BUILDING'
  | 'BUILT'
  | 'VERIFIED'
  | 'BLOCKED';

export type ApplicationBuildTarget =
  | 'BACKEND'
  | 'FRONTEND'
  | 'WORKSPACE'
  | 'PORTAL'
  | 'MODULE'
  | 'API'
  | 'DATABASE'
  | 'INTEGRATION'
  | 'SECURITY'
  | 'RUNTIME'
  | 'CONFIGURATION';

export interface ApplicationBuildElement {
  id: string;
  architectureElementId: string;
  target: ApplicationBuildTarget;
  name: string;
  description: string;
  required: boolean;
  dependencies: string[];
  status: ApplicationBuildStatus;
  sourceReference?: string;
  outputReference?: string;
  findings: string[];
}

export interface ApplicationBuildPlan {
  id: string;
  productId: string;
  architectureImplementationPlanId: string;
  createdAt: string;
  status: ApplicationBuildStatus;
  elements: ApplicationBuildElement[];
  blockingFindings: string[];
  recommendations: string[];
}

export interface ApplicationBuildRequest {
  productId: string;
  architectureImplementationPlanId: string;
  elements: Array<{
    id: string;
    architectureElementId: string;
    target: ApplicationBuildTarget;
    name: string;
    description?: string;
    required?: boolean;
    dependencies?: string[];
    sourceReference?: string;
  }>;
}

export class JumoApplicationBuildingEngine {
  private readonly plans = new Map<string, ApplicationBuildPlan>();

  createPlan(
    request: ApplicationBuildRequest
  ): ApplicationBuildPlan {
    if (!request.productId.trim()) {
      throw new Error('Product ID is required.');
    }

    if (!request.architectureImplementationPlanId.trim()) {
      throw new Error(
        'Verified architectural implementation plan ID is required.'
      );
    }

    const planId =
      `application-build-${request.productId}-${Date.now()}`;

    const elements: ApplicationBuildElement[] =
      request.elements.map((element) => ({
        id: element.id,
        architectureElementId: element.architectureElementId,
        target: element.target,
        name: element.name,
        description: element.description ?? '',
        required: element.required ?? true,
        dependencies: [...(element.dependencies ?? [])],
        status: 'PLANNED',
        sourceReference: element.sourceReference,
        findings: [],
      }));

    const plan: ApplicationBuildPlan = {
      id: planId,
      productId: request.productId,
      architectureImplementationPlanId:
        request.architectureImplementationPlanId,
      createdAt: new Date().toISOString(),
      status: elements.length > 0 ? 'READY' : 'BLOCKED',
      elements,
      blockingFindings:
        elements.length > 0
          ? []
          : ['Application build contains no build elements.'],
      recommendations:
        elements.length > 0
          ? []
          : ['Return to the approved architecture implementation plan.'],
    };

    this.plans.set(planId, plan);

    return this.get(planId);
  }

  get(planId: string): ApplicationBuildPlan {
    const plan = this.plans.get(planId);

    if (!plan) {
      throw new Error(
        `Application build plan not found: ${planId}`
      );
    }

    return this.clone(plan);
  }

  list(): ApplicationBuildPlan[] {
    return Array.from(this.plans.values()).map((plan) =>
      this.clone(plan)
    );
  }

  prepare(
    planId: string
  ): ApplicationBuildPlan {
    const plan = this.requireMutable(planId);

    for (const element of plan.elements) {
      element.findings = [];

      if (
        element.required &&
        !element.architectureElementId.trim()
      ) {
        element.findings.push(
          'Build element is not linked to an architectural element.'
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
                candidate.status !== 'BLOCKED'
            )
        )
      ) {
        element.findings.push(
          'One or more application build dependencies are unavailable.'
        );
        element.status = 'BLOCKED';
        continue;
      }

      element.status = 'READY';
    }

    this.recalculate(plan);

    return this.get(planId);
  }

  beginBuild(
    planId: string
  ): ApplicationBuildPlan {
    const plan = this.requireMutable(planId);

    this.recalculate(plan);

    if (plan.status === 'BLOCKED') {
      return this.get(planId);
    }

    plan.status = 'BUILDING';

    for (const element of plan.elements) {
      if (element.status === 'READY') {
        element.status = 'BUILDING';
      }
    }

    return this.get(planId);
  }

  registerBuildOutput(
    planId: string,
    elementId: string,
    outputReference: string
  ): ApplicationBuildPlan {
    const plan = this.requireMutable(planId);

    const element = plan.elements.find(
      (candidate) => candidate.id === elementId
    );

    if (!element) {
      throw new Error(
        `Application build element not found: ${elementId}`
      );
    }

    if (!outputReference.trim()) {
      throw new Error('Build output reference is required.');
    }

    element.outputReference = outputReference;
    element.status = 'BUILT';

    this.recalculate(plan);

    return this.get(planId);
  }

  verifyBuild(
    planId: string
  ): ApplicationBuildPlan {
    const plan = this.requireMutable(planId);

    for (const element of plan.elements) {
      element.findings = [];

      if (
        element.required &&
        !element.outputReference
      ) {
        element.findings.push(
          'Required application element has no build output.'
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
                Boolean(candidate.outputReference)
            )
        )
      ) {
        element.findings.push(
          'A required application dependency has not been built.'
        );
        element.status = 'BLOCKED';
        continue;
      }

      element.status = 'VERIFIED';
    }

    this.recalculate(plan);

    return this.get(planId);
  }

  canEnterApplicationTesting(
    planId: string
  ): boolean {
    const plan = this.requireMutable(planId);

    this.recalculate(plan);

    return (
      plan.status === 'VERIFIED' &&
      plan.elements.every(
        (element) =>
          !element.required ||
          element.status === 'VERIFIED'
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
      readyPlans: plans.filter(
        (plan) => plan.status === 'READY'
      ).length,
      buildingPlans: plans.filter(
        (plan) => plan.status === 'BUILDING'
      ).length,
      verifiedPlans: plans.filter(
        (plan) => plan.status === 'VERIFIED'
      ).length,
      blockedPlans: plans.filter(
        (plan) => plan.status === 'BLOCKED'
      ).length,
      builtElements: plans.reduce(
        (count, plan) =>
          count +
          plan.elements.filter(
            (element) =>
              element.status === 'BUILT' ||
              element.status === 'VERIFIED'
          ).length,
        0
      ),
      verifiedElements: plans.reduce(
        (count, plan) =>
          count +
          plan.elements.filter(
            (element) =>
              element.status === 'VERIFIED'
          ).length,
        0
      ),
    };
  }

  private requireMutable(
    planId: string
  ): ApplicationBuildPlan {
    const plan = this.plans.get(planId);

    if (!plan) {
      throw new Error(
        `Application build plan not found: ${planId}`
      );
    }

    return plan;
  }

  private recalculate(
    plan: ApplicationBuildPlan
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
        'Correct every blocking application-build finding.',
        'Run application-build verification again.',
      ];
      return;
    }

    const required = plan.elements.filter(
      (element) => element.required
    );

    if (
      required.length > 0 &&
      required.every(
        (element) => element.status === 'VERIFIED'
      )
    ) {
      plan.status = 'VERIFIED';
      plan.recommendations = [
        'Application build is verified.',
        'Application testing pipelines may now consume this build.',
      ];
      return;
    }

    if (
      required.length > 0 &&
      required.every(
        (element) =>
          element.status === 'BUILT' ||
          element.status === 'VERIFIED'
      )
    ) {
      plan.status = 'BUILT';
      plan.recommendations = [
        'Application elements are built but require verification.',
      ];
      return;
    }

    if (
      required.some(
        (element) => element.status === 'BUILDING'
      )
    ) {
      plan.status = 'BUILDING';
      return;
    }

    if (
      required.every(
        (element) => element.status === 'READY'
      )
    ) {
      plan.status = 'READY';
      return;
    }

    plan.status = 'PLANNED';
  }

  private clone(
    plan: ApplicationBuildPlan
  ): ApplicationBuildPlan {
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

export const jumoApplicationBuildingEngine =
  new JumoApplicationBuildingEngine();
