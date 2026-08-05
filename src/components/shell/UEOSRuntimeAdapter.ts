import { jumoFetch } from "../../core/config/api";
import { normalizeRuntime } from "../../core/runtime/runtimeNormalizer";

export interface RuntimeCard {
  id: string;
  name: string;
  version?: string;
  status: "Active" | "Inactive" | "Starting" | "Standby";
  description?: string;
  category?: string;
  price?: number;
}

export interface UEOSRuntimeState {
  connected: boolean;
  status: string;
  error?: string | null;
  ecosystems: any[];
  templates: any[];
  instances: any[];
  domains: RuntimeCard[];
  services: RuntimeCard[];
  systemHealth?: {
    platform?: string;
    version?: string;
    uptimeSeconds?: number;
    memoryUsage?: string;
    databaseMode?: string;
  };
}

export async function loadUEOSRuntime(): Promise<UEOSRuntimeState> {
  let connected = false;
  let ecosystems: any[] = [];
  let templates: any[] = [];
  let instances: any[] = [];
  let domains: RuntimeCard[] = [];
  let services: RuntimeCard[] = [];
  let systemHealth: any = null;
  let status = "JUMO UEOS Sovereign Runtime Active";

  try {
    const [ecoRes, tplRes, instRes, domainRes, statusRes] = await Promise.allSettled([
      jumoFetch("/api/ueos/ecosystems"),
      jumoFetch("/api/ueos/templates"),
      jumoFetch("/api/ueos/instances"),
      jumoFetch("/api/v1/domains"),
      jumoFetch("/api/v1/platform/status"),
    ]);

    if (ecoRes.status === "fulfilled" && Array.isArray(ecoRes.value)) {
      ecosystems = ecoRes.value;
      connected = true;
    }

    if (tplRes.status === "fulfilled" && Array.isArray(tplRes.value)) {
      templates = tplRes.value;
      connected = true;
    }

    if (instRes.status === "fulfilled" && Array.isArray(instRes.value)) {
      instances = instRes.value;
      connected = true;
    }

    if (domainRes.status === "fulfilled" && domainRes.value && typeof domainRes.value === "object") {
      const rawDomains = Array.isArray(domainRes.value.domains)
        ? domainRes.value.domains
        : (Array.isArray(domainRes.value) ? domainRes.value : []);

      if (rawDomains.length > 0) {
        domains = rawDomains.map((d: any, idx: number) => ({
          id: d?.id || `domain-${idx}`,
          name: d?.name || "Enterprise Domain",
          version: d?.version || "v1.0",
          status: (d?.status === "Active" || d?.isActive ? "Active" : "Inactive") as "Active" | "Inactive",
          description: d?.description || "Registry-driven UEOS Domain Module",
        }));
        connected = true;
      }
    }

    if (statusRes.status === "fulfilled" && statusRes.value) {
      systemHealth = statusRes.value;
      connected = true;
    }

    if (connected) {
      status = "JUMO UEOS Sovereign Runtime Active";
    } else {
      status = "JUMO UEOS Runtime Offline - Diagnostics Available";
    }
  } catch (err: any) {
    console.warn("[UEOSRuntimeAdapter] Network/Runtime fetch error:", err);
    status = "JUMO UEOS Runtime Offline - Diagnostics Available";
  }

  // Ensure default fallback domains if empty
  if (!domains || domains.length === 0) {
    domains = [
      { id: "domain-sacco", name: "SACCO ERP Node", version: "v1.0", status: "Active", description: "Credit Union & Microfinance Accounting" },
      { id: "domain-church", name: "Church ERP Platform", version: "v1.0", status: "Active", description: "Congregation & Donations Management" },
      { id: "domain-education", name: "Education ERP Module", version: "v1.0", status: "Active", description: "Academic & Institution Governance" },
      { id: "domain-enterprise", name: "Enterprise Multi-Tenant ERP", version: "v1.0", status: "Active", description: "Corporate Resource Suite & FAAP Integration" },
    ];
  }

  // Ensure default fallback services if empty
  if (!services || services.length === 0) {
    services = [
      { id: "svc-1", name: "Workflow Engine", version: "v17.x", status: "Active", description: "Automation & Process Pipelines" },
      { id: "svc-2", name: "Security & Zero-Trust Identity", version: "v1.0", status: "Active", description: "RBAC/ABAC Gatekeeper" },
      { id: "svc-3", name: "FAAP Treasury Ledger", version: "v2.0", status: "Active", description: "Double-Entry Balance Engine" },
      { id: "svc-4", name: "Runtime Health & Telemetry Monitor", version: "v1.0", status: "Active", description: "Platform Diagnostics" },
    ];
  }

  const rawNormalized = normalizeRuntime({
    connected,
    status,
    ecosystems,
    templates,
    instances,
    domains,
    services,
    systemHealth,
  });

  return {
    connected: rawNormalized.connected,
    status: rawNormalized.status,
    error: rawNormalized.error,
    ecosystems: rawNormalized.ecosystems || [],
    templates: rawNormalized.templates || [],
    instances: rawNormalized.instances || [],
    domains: Array.isArray(rawNormalized.domains) && rawNormalized.domains.length > 0 ? rawNormalized.domains : domains,
    services: Array.isArray(rawNormalized.services) && rawNormalized.services.length > 0 ? rawNormalized.services : services,
    systemHealth: rawNormalized.systemHealth,
  };
}
