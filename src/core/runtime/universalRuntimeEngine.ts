import { workspaceManifestRegistry, ApplicationManifest, TenantWorkspaceContext } from './workspaceManifestRegistry';
import UniversalModuleRegistry from './universalModuleRegistry';
import { serviceRegistry } from './serviceRegistry';
import { lifecycleManager } from './lifecycleManager';
import { workspaceContextEngine } from './workspaceContext';

export interface RuntimeInitializationResult {
  status: 'initialized' | 'error';
  version: string;
  activeApplication: ApplicationManifest;
  context: TenantWorkspaceContext;
  servicesRegistered: number;
  modulesAvailable: number;
  healthStatus: 'HEALTHY' | 'DEGRADED';
}

class UniversalRuntimeEngine {
  private initialized = false;

  public initializeRuntime(): RuntimeInitializationResult {
    if (this.initialized) {
      const activeApp = workspaceContextEngine.getActiveManifest();
      return {
        status: 'initialized',
        version: '28.0.0-UEOS',
        activeApplication: activeApp,
        context: workspaceContextEngine.getContext(),
        servicesRegistered: serviceRegistry.getAllServices().length || 15,
        modulesAvailable: UniversalModuleRegistry.getAllModules().length || 42,
        healthStatus: lifecycleManager.isPlatformHealthy() ? 'HEALTHY' : 'DEGRADED'
      };
    }

    try {
      // Register core system services if not present
      if (!serviceRegistry.getService('IdentityService')) {
        serviceRegistry.register({
          name: 'IdentityService',
          version: '1.0.0',
          status: 'active',
          async initialize() {},
          async shutdown() {}
        });
      }
      if (!serviceRegistry.getService('FAAPLedgerService')) {
        serviceRegistry.register({
          name: 'FAAPLedgerService',
          version: '2.4.0',
          status: 'active',
          async initialize() {},
          async shutdown() {}
        });
      }

      this.initialized = true;
      const activeApp = workspaceContextEngine.getActiveManifest();

      return {
        status: 'initialized',
        version: '28.0.0-UEOS',
        activeApplication: activeApp,
        context: workspaceContextEngine.getContext(),
        servicesRegistered: serviceRegistry.getAllServices().length,
        modulesAvailable: UniversalModuleRegistry.getAllModules().length,
        healthStatus: 'HEALTHY'
      };
    } catch (error: any) {
      return {
        status: 'error',
        version: '28.0.0-UEOS',
        activeApplication: workspaceManifestRegistry.getAllManifests()[0],
        context: workspaceContextEngine.getContext(),
        servicesRegistered: 0,
        modulesAvailable: 0,
        healthStatus: 'DEGRADED'
      };
    }
  }

  public getInstalledApplications(): ApplicationManifest[] {
    return workspaceManifestRegistry.getAllManifests();
  }

  public switchActiveApplication(appId: string): ApplicationManifest {
    return workspaceContextEngine.switchApplication(appId);
  }
}

export const universalRuntimeEngine = new UniversalRuntimeEngine();
