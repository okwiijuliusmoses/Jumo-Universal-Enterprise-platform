import { AuditLogRepository } from "../repositories/repositories";
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

export class MonitoringService {
  private static instance: MonitoringService;
  private errorLogs: ErrorLog[] = [];
  private metricsHistory: MetricSnapshot[] = [];

  private constructor() {
    // Periodically collect metric snapshot in development or production
    setInterval(() => {
      this.collectMetrics();
    }, 60000).unref(); // Run every minute in background without holding process alive
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

    // Log this error as blocked/failed in audit logs
    AuditLogRepository.log(
      context || "System_Monitor",
      "RUNTIME_ERROR",
      `Error captured: ${message}`,
      "failed"
    );
  }

  public getErrors(): ErrorLog[] {
    return [...this.errorLogs];
  }

  public getMetricsHistory(): MetricSnapshot[] {
    return [...this.metricsHistory];
  }

  public publishAuditEvent(actor: string, action: string, details: string, status: "success" | "failed" | "blocked" = "success"): void {
    AuditLogRepository.log(actor, action, details, status);
  }
}

export const monitoringService = MonitoringService.getInstance();
export default monitoringService;
