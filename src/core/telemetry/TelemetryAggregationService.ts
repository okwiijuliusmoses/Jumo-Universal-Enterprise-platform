export interface TelemetryMetric {
  id: string;
  category: 'PLATFORM' | 'FACTORY' | 'AI' | 'SECURITY';
  name: string;
  value: string | number;
  unit: string;
  status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE' | 'UNKNOWN';
  timestamp: string;
}

export class TelemetryAggregationService {
  private static instance: TelemetryAggregationService;
  private metrics: Map<string, TelemetryMetric> = new Map();

  private constructor() {
    this.seedDefaults();
    this.startSimulation();
  }

  public static getInstance(): TelemetryAggregationService {
    if (!TelemetryAggregationService.instance) {
      TelemetryAggregationService.instance = new TelemetryAggregationService();
    }
    return TelemetryAggregationService.instance;
  }

  private seedDefaults() {
    this.register({ id: 'M-CPU', category: 'PLATFORM', name: 'CPU Usage', value: 12, unit: '%', status: 'HEALTHY', timestamp: new Date().toISOString() });
    this.register({ id: 'M-MEM', category: 'PLATFORM', name: 'Memory', value: 45, unit: '%', status: 'HEALTHY', timestamp: new Date().toISOString() });
    this.register({ id: 'M-API', category: 'PLATFORM', name: 'API Latency', value: 120, unit: 'ms', status: 'HEALTHY', timestamp: new Date().toISOString() });
    
    this.register({ id: 'M-JOBS-ACTIVE', category: 'FACTORY', name: 'Active Jobs', value: 3, unit: '', status: 'HEALTHY', timestamp: new Date().toISOString() });
    this.register({ id: 'M-JOBS-QUEUED', category: 'FACTORY', name: 'Queued Work', value: 14, unit: '', status: 'HEALTHY', timestamp: new Date().toISOString() });
    
    this.register({ id: 'M-AI-EXEC', category: 'AI', name: 'Executing Agents', value: 2, unit: '', status: 'HEALTHY', timestamp: new Date().toISOString() });
    this.register({ id: 'M-AI-IDLE', category: 'AI', name: 'Idle Agents', value: 8, unit: '', status: 'HEALTHY', timestamp: new Date().toISOString() });
    
    this.register({ id: 'M-SEC-INC', category: 'SECURITY', name: 'Active Incidents', value: 0, unit: '', status: 'HEALTHY', timestamp: new Date().toISOString() });
  }

  private register(metric: TelemetryMetric) {
    this.metrics.set(metric.id, metric);
  }

  private startSimulation() {
    setInterval(() => {
      const cpu = this.metrics.get('M-CPU');
      if (cpu) {
        cpu.value = Math.floor(Math.random() * 20) + 10;
        cpu.timestamp = new Date().toISOString();
        this.metrics.set('M-CPU', cpu);
      }
      const mem = this.metrics.get('M-MEM');
      if (mem) {
        mem.value = Math.floor(Math.random() * 10) + 40;
        mem.timestamp = new Date().toISOString();
        this.metrics.set('M-MEM', mem);
      }
    }, 5000);
  }

  public getMetricsByCategory(category: 'PLATFORM' | 'FACTORY' | 'AI' | 'SECURITY'): TelemetryMetric[] {
    return Array.from(this.metrics.values()).filter(m => m.category === category);
  }

  public getAllMetrics(): TelemetryMetric[] {
    return Array.from(this.metrics.values());
  }
}
