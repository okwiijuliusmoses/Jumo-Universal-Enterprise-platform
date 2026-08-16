export type ApplicationTestType =
  | 'FUNCTIONAL'
  | 'UNIT'
  | 'INTEGRATION'
  | 'REGRESSION'
  | 'ACCESSIBILITY'
  | 'SECURITY'
  | 'PERFORMANCE'
  | 'API'
  | 'NAVIGATION'
  | 'CONFIGURATION';

export interface ApplicationTestDefinition {
  id: string;
  type: ApplicationTestType;
  name: string;
  description: string;
  required: boolean;
  metadata?: Record<string, unknown>;
}

export interface ApplicationTestResult {
  testId: string;
  status: 'PENDING' | 'PASSED' | 'FAILED' | 'BLOCKED';
  score: number;
  evidence: string[];
  findings: string[];
  executedAt?: string;
}

export interface ApplicationTestRun {
  id: string;
  productId: string;
  tests: ApplicationTestResult[];
  status: 'PENDING' | 'RUNNING' | 'PASSED' | 'FAILED' | 'BLOCKED';
  startedAt: string;
  completedAt?: string;
}

export class JumoApplicationTestingEngine {
  private readonly definitions =
    new Map<string, ApplicationTestDefinition>();

  private readonly runs = new Map<string, ApplicationTestRun>();

  register(definition: ApplicationTestDefinition): ApplicationTestDefinition {
    this.definitions.set(definition.id, definition);
    return definition;
  }

  listDefinitions(): ApplicationTestDefinition[] {
    return Array.from(this.definitions.values());
  }

  createRun(productId: string): ApplicationTestRun {
    const tests = this.listDefinitions().map(definition => ({
      testId: definition.id,
      status: 'PENDING' as const,
      score: 0,
      evidence: [],
      findings: [],
    }));

    const run: ApplicationTestRun = {
      id: `application-test-${productId}-${Date.now()}`,
      productId,
      tests,
      status: 'PENDING',
      startedAt: new Date().toISOString(),
    };

    this.runs.set(run.id, run);
    return run;
  }

  recordResult(
    runId: string,
    result: ApplicationTestResult,
  ): ApplicationTestRun {
    const run = this.runs.get(runId);

    if (!run) {
      throw new Error(`Application test run not found: ${runId}`);
    }

    const index = run.tests.findIndex(test => test.testId === result.testId);

    if (index === -1) {
      throw new Error(
        `Test ${result.testId} is not registered for run ${runId}.`,
      );
    }

    run.tests[index] = result;
    run.status = this.calculateRunStatus(run);

    if (
      run.status === 'PASSED' ||
      run.status === 'FAILED' ||
      run.status === 'BLOCKED'
    ) {
      run.completedAt = new Date().toISOString();
    }

    return run;
  }

  getRun(id: string): ApplicationTestRun | undefined {
    return this.runs.get(id);
  }

  private calculateRunStatus(
    run: ApplicationTestRun,
  ): ApplicationTestRun['status'] {
    if (run.tests.some(test => test.status === 'BLOCKED')) {
      return 'BLOCKED';
    }

    if (run.tests.some(test => test.status === 'FAILED')) {
      return 'FAILED';
    }

    if (
      run.tests.length > 0 &&
      run.tests.every(test => test.status === 'PASSED')
    ) {
      return 'PASSED';
    }

    return 'RUNNING';
  }
}

export const JUMO_APPLICATION_TESTING_ENGINE =
  new JumoApplicationTestingEngine();
