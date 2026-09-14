import { serviceRegistry, PlatformService } from "./serviceRegistry";
import { shutdownManager } from "./shutdownManager";
import { db } from "../../database/db";

export class LifecycleManager {
  private static instance: LifecycleManager;
  private isBooted = false;

  private constructor() {}

  public static getInstance(): LifecycleManager {
    if (!LifecycleManager.instance) {
      LifecycleManager.instance = new LifecycleManager();
    }
    return LifecycleManager.instance;
  }

  public async bootstrap(registerDefaultServices: PlatformService[] = []): Promise<void> {
    if (this.isBooted) return;
    
    console.log("[BOOT] JUMO UEOS Platform Lifecycle Bootloader starting...");

    // 1. Setup Signal Handlers for Safe Teardowns
    shutdownManager.setupSignalHandlers();

    // 2. Initialize Database engine
    console.log("[BOOT] Initializing database core connectivity...");
    try {
      // Connect/Check the DB connection or load JSON fallback
      await db.load();
      console.log("[BOOT] Database subsystem loaded successfully.");
    } catch (err: any) {
      console.error("[FATAL] Database bootstrap failed:", err.message);
      throw err;
    }

    // Register a cleanup handler to save the database cache
    shutdownManager.registerCleanup(async () => {
      console.log("[SHUTDOWN] Executing JUMODBEngine auto-save commit...");
      db.save();
    });

    // 3. Register standard services and boot them
    for (const service of registerDefaultServices) {
      serviceRegistry.register(service);
    }

    const services = serviceRegistry.getAllServices();
    console.log(`[BOOT] Bootstrapping ${services.length} registered platform services...`);
    
    for (const service of services) {
      try {
        console.log(`[BOOT] Initializing: ${service.name}...`);
        await service.initialize();
      } catch (err: any) {
        console.error(`[FATAL] Service initialisation failed for ${service.name}:`, err.message);
        throw err;
      }
    }

    this.isBooted = true;
    console.log("[BOOT] JUMO UEOS Platform Kernel successfully booted. All services ACTIVE.");
  }

  public isPlatformHealthy(): boolean {
    const services = serviceRegistry.getAllServices();
    return services.every(s => s.status === "active");
  }
}

export const lifecycleManager = LifecycleManager.getInstance();
