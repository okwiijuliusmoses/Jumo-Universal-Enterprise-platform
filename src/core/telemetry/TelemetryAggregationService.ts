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
  }

  public static getInstance(): TelemetryAggregationService {
    if (!TelemetryAggregationService.instance) {
      TelemetryAggregationService.instance = new TelemetryAggregationService();
    }
    return TelemetryAggregationService.instance;
  }

  private seedDefaults() {
    this.register({ id: 'M-CPU', category: 'PLATFORM', name: 'CPU Usage', value: 'NOT MEASURED', unit: '', status: 'UNKNOWN', timestamp: new Date().toISOString() });
    this.register({ id: 'M-MEM', category: 'PLATFORM', name: 'Memory', value: 'NOT MEASURED', unit: '', status: 'UNKNOWN', timestamp: new Date().toISOString() });
    this.register({ id: 'M-API', category: 'PLATFORM', name: 'API Latency', value: 'NOT MEASURED', unit: '', status: 'UNKNOWN', timestamp: new Date().toISOString() });
    
    this.register({ id: 'M-JOBS-ACTIVE', category: 'FACTORY', name: 'Active Jobs', value: 'NOT MEASURED', unit: '', status: 'UNKNOWN', timestamp: new Date().toISOString() });
    this.register({ id: 'M-JOBS-QUEUED', category: 'FACTORY', name: 'Queued Work', value: 'NOT MEASURED', unit: '', status: 'UNKNOWN', timestamp: new Date().toISOString() });
    
    this.register({ id: 'M-AI-EXEC', category: 'AI', name: 'Executing Agents', value: 'NOT MEASURED', unit: '', status: 'UNKNOWN', timestamp: new Date().toISOString() });
    this.register({ id: 'M-AI-IDLE', category: 'AI', name: 'Idle Agents', value: 'NOT MEASURED', unit: '', status: 'UNKNOWN', timestamp: new Date().toISOString() });
    
    this.register({ id: 'M-SEC-INC', category: 'SECURITY', name: 'Active Incidents', value: 'NOT MEASURED', unit: '', status: 'UNKNOWN', timestamp: new Date().toISOString() });
  }

  private register(metric: TelemetryMetric) {
    this.metrics.set(metric.id, metric);
  }

  public getMetricsByCategory(category: 'PLATFORM' | 'FACTORY' | 'AI' | 'SECURITY'): TelemetryMetric[] {
    return Array.from(this.metrics.values()).filter(m => m.category === category);
  }

  public getAllMetrics(): TelemetryMetric[] {
    return Array.from(this.metrics.values());
  }
}
