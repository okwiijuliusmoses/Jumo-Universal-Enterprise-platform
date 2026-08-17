import { serviceRegistry } from "./serviceRegistry";

export interface SystemMetrics {
  uptime: number;
  memory: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
  };
  cpuUsage: NodeJS.CpuUsage;
}

export class RuntimeHealthMonitor {
  private static instance: RuntimeHealthMonitor;
  private startTime: number;

  private constructor() {
    this.startTime = Date.now();
  }

  public static getInstance(): RuntimeHealthMonitor {
    if (!RuntimeHealthMonitor.instance) {
      RuntimeHealthMonitor.instance = new RuntimeHealthMonitor();
    }
    return RuntimeHealthMonitor.instance;
  }

  public getUptimeSeconds(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  public getMetrics(): SystemMetrics {
    const memory = process.memoryUsage();
    return {
      uptime: this.getUptimeSeconds(),
      memory: {
        rss: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memory.external / 1024 / 1024).toFixed(2)} MB`
      },
      cpuUsage: process.cpuUsage()
    };
  }

  public getServiceReport() {
    const services = serviceRegistry.getAllServices();
    return services.map(s => ({
      name: s.name,
      version: s.version,
      status: s.status
    }));
  }
}

export const runtimeHealthMonitor = RuntimeHealthMonitor.getInstance();
