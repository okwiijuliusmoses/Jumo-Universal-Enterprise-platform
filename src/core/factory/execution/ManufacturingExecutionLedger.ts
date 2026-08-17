import { ManufacturingExecutionRecord } from './ExecutionTypes';

export class ManufacturingExecutionLedger {
  private static instance: ManufacturingExecutionLedger;
  private records: Map<string, ManufacturingExecutionRecord> = new Map();

  private constructor() {}

  public static getInstance(): ManufacturingExecutionLedger {
    if (!ManufacturingExecutionLedger.instance) {
      ManufacturingExecutionLedger.instance = new ManufacturingExecutionLedger();
    }
    return ManufacturingExecutionLedger.instance;
  }

  public recordExecution(record: ManufacturingExecutionRecord): void {
    this.records.set(record.executionId, record);
  }

  public getExecution(executionId: string): ManufacturingExecutionRecord | undefined {
    return this.records.get(executionId);
  }

  public getExecutionsForJob(jobId: string): ManufacturingExecutionRecord[] {
    return Array.from(this.records.values()).filter(r => r.jobId === jobId);
  }

  public getActiveExecutions(): ManufacturingExecutionRecord[] {
    return Array.from(this.records.values()).filter(r => r.status === 'EXECUTING');
  }

  public getAllRecords(): ManufacturingExecutionRecord[] {
    return Array.from(this.records.values());
  }
}
