export class Scheduler {
  constructor() {
    this.jobs = new Map([
      ["job-01", { id: "job-01", name: "AEGIS Hourly Audit Check", interval: "3600s", status: "Running", lastRun: new Date().toISOString() }],
      ["job-02", { id: "job-02", name: "Tenant Ledger Settlement", interval: "86400s", status: "Scheduled", lastRun: new Date().toISOString() }],
      ["job-03", { id: "job-03", name: "Telemetry Metrics Aggregation", interval: "60s", status: "Running", lastRun: new Date().toISOString() }]
    ]);
  }

  listJobs() {
    return Array.from(this.jobs.values());
  }

  triggerJob(jobId) {
    const job = this.jobs.get(jobId);
    if (job) {
      job.lastRun = new Date().toISOString();
      job.status = "Triggered successfully";
      return job;
    }
    throw new Error("Job not found");
  }
}
