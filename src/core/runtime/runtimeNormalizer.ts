export interface NormalizedRuntime {
  connected: boolean;
  status: string;
  error?: string | null;
  ecosystems: any[];
  templates: any[];
  instances: any[];
  domains: any[];
  services: any[];
  systemHealth?: any;
}

export function normalizeRuntime(data: any): NormalizedRuntime {
  if (!data || typeof data !== "object") {
    return {
      connected: false,
      status: "JUMO UEOS Runtime Offline - Diagnostics Available",
      ecosystems: [],
      templates: [],
      instances: [],
      domains: [],
      services: [],
      systemHealth: null,
    };
  }
  return {
    connected: Boolean(data.connected),
    status: data.status || "JUMO UEOS Sovereign Runtime Active",
    error: data.error || null,
    ecosystems: Array.isArray(data.ecosystems) ? data.ecosystems : [],
    templates: Array.isArray(data.templates) ? data.templates : [],
    instances: Array.isArray(data.instances) ? data.instances : [],
    domains: Array.isArray(data.domains) ? data.domains : [],
    services: Array.isArray(data.services) ? data.services : [],
    systemHealth: data.systemHealth || null,
  };
}

export function safeArray<T>(arr: any): T[] {
  return Array.isArray(arr) ? arr : [];
}
