import {
  ApplicationTestResult,
  JumoApplicationTestingEngine,
} from './JumoApplicationTestingEngine';

export interface EndToEndScenario {
  id: string;
  name: string;
  description: string;
  steps: string[];
  required: boolean;
  metadata?: Record<string, unknown>;
}

export interface EndToEndRun {
  id: string;
  productId: string;
  scenarioResults: ApplicationTestResult[];
  status: 'PENDING' | 'RUNNING' | 'PASSED' | 'FAILED' | 'BLOCKED';
  startedAt: string;
  completedAt?: string;
}

export class JumoEndToEndTestingEngine {
  private readonly scenarios = new Map<string, EndToEndScenario>();
  private readonly runs = new Map<string, EndToEndRun>();

  constructor(
    private readonly applicationTestingEngine: JumoApplicationTestingEngine,
  ) {}

  registerScenario(scenario: EndToEndScenario): EndToEndScenario {
    this.scenarios.set(scenario.id, scenario);
    return scenario;
  }

  listScenarios(): EndToEndScenario[] {
    return Array.from(this.scenarios.values());
  }

  createRun(productId: string): EndToEndRun {
    const scenarioResults = this.listScenarios().map(scenario => ({
      testId: scenario.id,
      status: 'PENDING' as const,
      score: 0,
      evidence: [],
      findings: [],
    }));

    const run: EndToEndRun = {
      id: `e2e-${productId}-${Date.now()}`,
      productId,
      scenarioResults,
      status: 'PENDING',
      startedAt: new Date().toISOString(),
    };

    this.runs.set(run.id, run);
    return run;
  }

  recordScenarioResult(
    runId: string,
    result: ApplicationTestResult,
  ): EndToEndRun {
    const run = this.runs.get(runId);

    if (!run) {
      throw new Error(`E2E run not found: ${runId}`);
    }

    const index = run.scenarioResults.findIndex(
      scenario => scenario.testId === result.testId,
    );

    if (index === -1) {
      throw new Error(
        `E2E scenario ${result.testId} is not registered for ${runId}.`,
      );
    }

    run.scenarioResults[index] = result;

    if (run.scenarioResults.some(item => item.status === 'BLOCKED')) {
      run.status = 'BLOCKED';
    } else if (run.scenarioResults.some(item => item.status === 'FAILED')) {
      run.status = 'FAILED';
    } else if (
      run.scenarioResults.length > 0 &&
      run.scenarioResults.every(item => item.status === 'PASSED')
    ) {
      run.status = 'PASSED';
    } else {
      run.status = 'RUNNING';
    }

    if (
      run.status === 'PASSED' ||
      run.status === 'FAILED' ||
      run.status === 'BLOCKED'
    ) {
      run.completedAt = new Date().toISOString();
    }

    return run;
  }

  getRun(id: string): EndToEndRun | undefined {
    return this.runs.get(id);
  }
}
