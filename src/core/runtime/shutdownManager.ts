import { serviceRegistry } from "./serviceRegistry";

export type ShutdownCallback = () => Promise<void> | void;

export class ShutdownManager {
  private static instance: ShutdownManager;
  private cleanupCallbacks: ShutdownCallback[] = [];
  private isShuttingDown = false;

  private constructor() {}

  public static getInstance(): ShutdownManager {
    if (!ShutdownManager.instance) {
      ShutdownManager.instance = new ShutdownManager();
    }
    return ShutdownManager.instance;
  }

  public registerCleanup(callback: ShutdownCallback): void {
    this.cleanupCallbacks.push(callback);
  }

  public async shutdown(signal: string): Promise<void> {
    if (this.isShuttingDown) return;
    this.isShuttingDown = true;
    
    console.log(`\n[SHUTDOWN] Signal ${signal} intercepted. Gracefully halting JUMO UEOS...`);

    // 1. Terminate all active registered platform services
    const services = serviceRegistry.getAllServices();
    for (const service of services) {
      if (service.status === "active") {
        try {
          console.log(`[SHUTDOWN] Halting service: ${service.name}...`);
          await service.shutdown();
        } catch (err: any) {
          console.error(`[SHUTDOWN_ERROR] Failed to halt service ${service.name}:`, err.message);
        }
      }
    }

    // 2. Trigger registered cleanup callbacks
    for (const callback of this.cleanupCallbacks) {
      try {
        await callback();
      } catch (err: any) {
        console.error("[SHUTDOWN_ERROR] Failed during custom cleanup handler:", err.message);
      }
    }

    console.log("[SHUTDOWN] Clean shutdown sequence finalized. System exiting.");
    process.exit(0);
  }

  public setupSignalHandlers(): void {
    if (typeof window === "undefined" && typeof process !== "undefined" && typeof process.on === "function") {
      process.on("SIGINT", () => this.shutdown("SIGINT"));
      process.on("SIGTERM", () => this.shutdown("SIGTERM"));
    }
  }
}

export const shutdownManager = ShutdownManager.getInstance();
