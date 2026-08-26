import { runtimeHealthMonitor } from "../core/runtime/runtimeHealthMonitor";

export interface MetricSnapshot {
  timestamp: string;
  uptimeSeconds: number;
  memory: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
  };
}

export interface ErrorLog {
  timestamp: string;
  message: string;
  stack?: string;
  context?: string;
}

export interface AuditEventLog {
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  status: "success" | "failed" | "blocked";
}

export class MonitoringService {
  private static instance: MonitoringService;
  private errorLogs: ErrorLog[] = [];
  private metricsHistory: MetricSnapshot[] = [];
  private auditEvents: AuditEventLog[] = [];

  private constructor() {
    // Periodically collect metric snapshot in development or production
    if (typeof setInterval !== "undefined") {
      const interval = setInterval(() => {
        this.collectMetrics();
      }, 60000);
      if (interval && typeof interval.unref === "function") {
        interval.unref();
      }
    }
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private collectMetrics() {
    const health = runtimeHealthMonitor.getMetrics();
    this.metricsHistory.push({
      timestamp: new Date().toISOString(),
      uptimeSeconds: health.uptime,
      memory: {
        rss: health.memory.rss,
        heapTotal: health.memory.heapTotal,
        heapUsed: health.memory.heapUsed
      }
    });

    // Limit history length to 100 entries to protect memory
    if (this.metricsHistory.length > 100) {
      this.metricsHistory.shift();
    }
  }

  public logError(message: string, stack?: string, context?: string): void {
    const err: ErrorLog = {
      timestamp: new Date().toISOString(),
      message,
      stack,
      context
    };
    this.errorLogs.push(err);
    if (this.errorLogs.length > 100) {
      this.errorLogs.shift();
    }

    console.error(`[MONITORING_ERROR] [${context || "System_Monitor"}]: ${message}`);
  }

  public getErrors(): ErrorLog[] {
    return [...this.errorLogs];
  }

  public getMetricsHistory(): MetricSnapshot[] {
    return [...this.metricsHistory];
  }

  public publishAuditEvent(actor: string, action: string, details: string, status: "success" | "failed" | "blocked" = "success"): void {
    const event: AuditEventLog = {
      timestamp: new Date().toISOString(),
      actor,
      action,
      details,
      status
    };
    this.auditEvents.push(event);
    if (this.auditEvents.length > 200) {
      this.auditEvents.shift();
    }
    console.log(`[AUDIT_EVENT] [${actor}] [${action}]: ${details} (${status})`);
  }

  public getAuditEvents(): AuditEventLog[] {
    return [...this.auditEvents];
  }
}

export const monitoringService = MonitoringService.getInstance();
export default monitoringService;
