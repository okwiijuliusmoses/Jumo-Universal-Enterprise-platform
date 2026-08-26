import { workspaceManifestRegistry, ApplicationManifest, TenantWorkspaceContext } from './workspaceManifestRegistry';

export class WorkspaceContextEngine {
  private static instance: WorkspaceContextEngine;
  private currentContext: TenantWorkspaceContext;
  private activeManifest: ApplicationManifest;
  private listeners: ((context: TenantWorkspaceContext, manifest: ApplicationManifest) => void)[] = [];

  private constructor() {
    this.currentContext = workspaceManifestRegistry.resolveWorkspaceContext();
    const defaultManifest = workspaceManifestRegistry.getManifest(this.currentContext.activeAppId) || workspaceManifestRegistry.getAllManifests()[0];
    this.activeManifest = defaultManifest;
    this.currentContext.activeAppId = defaultManifest.id;
    this.currentContext.activeModuleId = defaultManifest.defaultModule;
  }

  public static getInstance(): WorkspaceContextEngine {
    if (!WorkspaceContextEngine.instance) {
      WorkspaceContextEngine.instance = new WorkspaceContextEngine();
    }
    return WorkspaceContextEngine.instance;
  }

  public getContext(): TenantWorkspaceContext {
    return { ...this.currentContext };
  }

  public getActiveManifest(): ApplicationManifest {
    return { ...this.activeManifest };
  }

  public switchApplication(appId: string): ApplicationManifest {
    const manifest = workspaceManifestRegistry.getManifest(appId);
    if (!manifest) {
      throw new Error(`Application manifest not found for ID: ${appId}`);
    }
    this.activeManifest = manifest;
    this.currentContext.activeAppId = manifest.id;
    this.currentContext.activeModuleId = manifest.defaultModule;

    this.notifyListeners();
    return manifest;
  }

  public switchModule(moduleId: string): void {
    this.currentContext.activeModuleId = moduleId;
    this.notifyListeners();
  }

  public switchTenant(tenantId: string, tenantName: string): void {
    this.currentContext.tenantId = tenantId;
    this.currentContext.tenantName = tenantName;
    this.notifyListeners();
  }

  public subscribe(listener: (context: TenantWorkspaceContext, manifest: ApplicationManifest) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.getContext(), this.getActiveManifest());
    }
  }
}

export const workspaceContextEngine = WorkspaceContextEngine.getInstance();
