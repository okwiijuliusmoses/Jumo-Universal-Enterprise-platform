/**
 * JUMO UEOS
 *
 * Termux is an external/local execution environment.
 * It is intentionally NOT renamed or represented as a JUMO terminal.
 *
 * JUMO communicates with it through this adapter.
 */

export interface TermuxExecutionRequest {
  command: string;
  workingDirectory?: string;
  environment?: Record<string, string>;
  timeoutMs?: number;
  approved: boolean;
}

export interface TermuxExecutionResult {
  adapterId: 'termux-local-execution';
  accepted: boolean;
  executed: boolean;
  exitCode?: number;
  stdout?: string;
  stderr?: string;
  reason?: string;
  timestamp: string;
}

export class TermuxExecutionAdapter {
  readonly adapterId = 'termux-local-execution' as const;

  async execute(
    request: TermuxExecutionRequest
  ): Promise<TermuxExecutionResult> {
    const timestamp = new Date().toISOString();

    if (!request.approved) {
      return {
        adapterId: this.adapterId,
        accepted: false,
        executed: false,
        reason: 'Execution requires an approved JUMO execution request.',
        timestamp,
      };
    }

    /*
     * The adapter intentionally does not execute arbitrary shell commands
     * from the browser or conversational layer.
     *
     * Actual local execution is performed by the trusted Termux-side
     * execution bridge.
     */
    return {
      adapterId: this.adapterId,
      accepted: true,
      executed: false,
      reason:
        'Request accepted by the JUMO-Termux execution contract; trusted local execution bridge is required.',
      timestamp,
    };
  }
}

export const termuxExecutionAdapter =
  new TermuxExecutionAdapter();
