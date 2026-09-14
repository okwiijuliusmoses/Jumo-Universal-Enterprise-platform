export interface PlatformService {
  name: string;
  version: string;
  status: "uninitialized" | "starting" | "active" | "stopped" | "failed";
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}

export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services: Map<string, PlatformService> = new Map();

  private constructor() {}

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  public register(service: PlatformService): void {
    if (this.services.has(service.name)) {
      console.warn(`[WARN] Service Registry: Service with name '${service.name}' is already registered.`);
      return;
    }
    this.services.set(service.name, service);
    console.log(`[KERNEL] Registered Service: ${service.name} (v${service.version})`);
  }

  public getService(name: string): PlatformService | undefined {
    return this.services.get(name);
  }

  public getAllServices(): PlatformService[] {
    return Array.from(this.services.values());
  }

  public getActiveServiceNames(): string[] {
    return this.getAllServices()
      .filter(s => s.status === "active")
      .map(s => s.name);
  }
}

export const serviceRegistry = ServiceRegistry.getInstance();
