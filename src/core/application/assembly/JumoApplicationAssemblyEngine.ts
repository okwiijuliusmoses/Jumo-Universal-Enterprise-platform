export type AssemblyStatus =
  | 'PLANNED'
  | 'READY'
  | 'ASSEMBLING'
  | 'ASSEMBLED'
  | 'VERIFIED'
  | 'BLOCKED';

export type AssemblyTarget =
  | 'BACKEND_FRONTEND'
  | 'API'
  | 'DATABASE'
  | 'AUTHENTICATION'
  | 'SECURITY'
  | 'AI'
  | 'PAYMENTS'
  | 'ACCOUNTING'
  | 'TREASURY'
  | 'SHARED_PRODUCT'
  | 'ERP_MODULE'
  | 'WORKSPACE'
  | 'PORTAL'
  | 'CLOUD'
  | 'RUNTIME';

export interface ApplicationAssemblyElement {
  id: string;
  buildElementId: string;
  target: AssemblyTarget;
  name: string;
  description: string;
  required: boolean;
  dependencies: string[];
  status: AssemblyStatus;
  sourceReference?: string;
  integrationReference?: string;
  findings: string[];
}

export interface ApplicationAssemblyPlan {
  id: string;
  productId: string;
  applicationBuildPlanId: string;
  createdAt: string;
  status: AssemblyStatus;
  elements: ApplicationAssemblyElement[];
  blockingFindings: string[];
  recommendations: string[];
}

export interface ApplicationAssemblyRequest {
  productId: string;
  applicationBuildPlanId: string;
  elements: Array<{
    id: string;
    buildElementId: string;
    target: AssemblyTarget;
    name: string;
    description?: string;
    required?: boolean;
    dependencies?: string[];
    sourceReference?: string;
  }>;
}

export class JumoApplicationAssemblyEngine {
  private readonly plans =
    new Map<string, ApplicationAssemblyPlan>();

  createPlan(
    request: ApplicationAssemblyRequest
  ): ApplicationAssemblyPlan {
    if (!request.productId.trim()) {
      throw new Error('Product ID is required.');
    }

    if (!request.applicationBuildPlanId.trim()) {
      throw new Error(
        'Application build plan ID is required.'
      );
    }

    const planId =
      `application-assembly-${request.productId}-${Date.now()}`;

    const elements: ApplicationAssemblyElement[] =
      request.elements.map((element) => ({
        id: element.id,
        buildElementId: element.buildElementId,
        target: element.target,
        name: element.name,
        description: element.description ?? '',
        required: element.required ?? true,
        dependencies: [...(element.dependencies ?? [])],
        status: 'PLANNED',
        sourceReference: element.sourceReference,
        findings: [],
      }));

    const plan: ApplicationAssemblyPlan = {
      id: planId,
      productId: request.productId,
      applicationBuildPlanId:
        request.applicationBuildPlanId,
      createdAt: new Date().toISOString(),
      status:
        elements.length > 0
          ? 'READY'
          : 'BLOCKED',
      elements,
      blockingFindings:
        elements.length > 0
          ? []
          : ['Application assembly contains no integration elements.'],
      recommendations:
        elements.length > 0
          ? []
          : ['Return to the application building stage.'],
    };

    this.plans.set(planId, plan);

    return this.get(planId);
  }

  get(planId: string): ApplicationAssemblyPlan {
    const plan = this.plans.get(planId);

    if (!plan) {
      throw new Error(
        `Application assembly plan not found: ${planId}`
      );
    }

    return this.clone(plan);
  }

  list(): ApplicationAssemblyPlan[] {
    return Array.from(this.plans.values()).map((plan) =>
      this.clone(plan)
    );
  }

  prepare(
    planId: string
  ): ApplicationAssemblyPlan {
    const plan = this.requireMutable(planId);

    for (const element of plan.elements) {
      element.findings = [];

      if (
        element.required &&
        !element.buildElementId.trim()
      ) {
        element.findings.push(
          'Required assembly element is not linked to an application build element.'
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
          'Required assembly dependency is unavailable.'
        );
        element.status = 'BLOCKED';
        continue;
      }

      element.status = 'READY';
    }

    this.recalculate(plan);

    return this.get(planId);
  }

  beginAssembly(
    planId: string
  ): ApplicationAssemblyPlan {
    const plan = this.requireMutable(planId);

    this.recalculate(plan);

    if (plan.status === 'BLOCKED') {
      return this.get(planId);
    }

    plan.status = 'ASSEMBLING';

    for (const element of plan.elements) {
      if (element.status === 'READY') {
        element.status = 'ASSEMBLING';
      }
    }

    return this.get(planId);
  }

  registerIntegration(
    planId: string,
    elementId: string,
    integrationReference: string
  ): ApplicationAssemblyPlan {
    const plan = this.requireMutable(planId);

    const element = plan.elements.find(
      (candidate) => candidate.id === elementId
    );

    if (!element) {
      throw new Error(
        `Assembly element not found: ${elementId}`
      );
    }

    if (!integrationReference.trim()) {
      throw new Error(
        'Integration reference is required.'
      );
    }

    element.integrationReference =
      integrationReference;
    element.status = 'ASSEMBLED';

    this.recalculate(plan);

    return this.get(planId);
  }

  verifyAssembly(
    planId: string
  ): ApplicationAssemblyPlan {
    const plan = this.requireMutable(planId);

    for (const element of plan.elements) {
      element.findings = [];

      if (
        element.required &&
        !element.integrationReference
      ) {
        element.findings.push(
          'Required integration has no registered integration reference.'
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
                Boolean(candidate.integrationReference)
            )
        )
      ) {
        element.findings.push(
          'A required integration dependency has not been assembled.'
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
      assemblingPlans: plans.filter(
        (plan) => plan.status === 'ASSEMBLING'
      ).length,
      assembledPlans: plans.filter(
        (plan) => plan.status === 'ASSEMBLED'
      ).length,
      verifiedPlans: plans.filter(
        (plan) => plan.status === 'VERIFIED'
      ).length,
      blockedPlans: plans.filter(
        (plan) => plan.status === 'BLOCKED'
      ).length,
      verifiedIntegrations: plans.reduce(
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
  ): ApplicationAssemblyPlan {
    const plan = this.plans.get(planId);

    if (!plan) {
      throw new Error(
        `Application assembly plan not found: ${planId}`
      );
    }

    return plan;
  }

  private recalculate(
    plan: ApplicationAssemblyPlan
  ): void {
    plan.blockingFindings =
      plan.elements.flatMap(
        (element) =>
          element.findings.map(
            (finding) =>
              `${element.name}: ${finding}`
          )
      );

    if (plan.blockingFindings.length > 0) {
      plan.status = 'BLOCKED';
      plan.recommendations = [
        'Correct every blocking assembly finding.',
        'Re-run application assembly verification.',
      ];
      return;
    }

    const required =
      plan.elements.filter(
        (element) => element.required
      );

    if (
      required.length > 0 &&
      required.every(
        (element) =>
          element.status === 'VERIFIED'
      )
    ) {
      plan.status = 'VERIFIED';
      plan.recommendations = [
        'Application assembly is verified.',
        'The application may enter full application testing.',
      ];
      return;
    }

    if (
      required.length > 0 &&
      required.every(
        (element) =>
          element.status === 'ASSEMBLED' ||
          element.status === 'VERIFIED'
      )
    ) {
      plan.status = 'ASSEMBLED';
      plan.recommendations = [
        'Assembly exists but requires integration verification.',
      ];
      return;
    }

    if (
      required.some(
        (element) =>
          element.status === 'ASSEMBLING'
      )
    ) {
      plan.status = 'ASSEMBLING';
      return;
    }

    if (
      required.every(
        (element) =>
          element.status === 'READY'
      )
    ) {
      plan.status = 'READY';
      return;
    }

    plan.status = 'PLANNED';
  }

  private clone(
    plan: ApplicationAssemblyPlan
  ): ApplicationAssemblyPlan {
    return {
      ...plan,
      elements: plan.elements.map(
        (element) => ({
          ...element,
          dependencies: [
            ...element.dependencies,
          ],
          findings: [
            ...element.findings,
          ],
        })
      ),
      blockingFindings: [
        ...plan.blockingFindings,
      ],
      recommendations: [
        ...plan.recommendations,
      ],
    };
  }
}

export const jumoApplicationAssemblyEngine =
  new JumoApplicationAssemblyEngine();
