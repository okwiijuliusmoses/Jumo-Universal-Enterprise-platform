export interface InstallationRequest {
  productId: string;
  institutionId: string;
  deploymentModel: string;
  domains: string[];
  modules: string[];
  portals: string[];
  integrations: string[];
  databaseProfile: string;
  environment: string;
}

export interface InstallationResult {
  id: string;
  productId: string;
  institutionId: string;
  status: "QUEUED" | "INSTALLING" | "INSTALLED" | "FAILED";
  installedDomains: string[];
  installedModules: string[];
  installedPortals: string[];
  installedIntegrations: string[];
  createdAt: string;
  updatedAt: string;
}

export class JumoInstitutionInstallationEngine {
  private readonly installations =
    new Map<string, InstallationResult>();

  public createRequest(
    request: InstallationRequest,
  ): InstallationResult {
    const now = new Date().toISOString();

    const result: InstallationResult = {
      id: `INSTALL-${Date.now()}`,
      productId: request.productId,
      institutionId: request.institutionId,
      status: "QUEUED",
      installedDomains: [],
      installedModules: [],
      installedPortals: [],
      installedIntegrations: [],
      createdAt: now,
      updatedAt: now,
    };

    this.installations.set(result.id, result);

    return result;
  }

  public execute(
    installationId: string,
  ): InstallationResult {
    const installation = this.installations.get(installationId);

    if (!installation) {
      throw new Error(
        `Installation request not found: ${installationId}`,
      );
    }

    installation.status = "INSTALLING";
    installation.updatedAt = new Date().toISOString();

    installation.status = "INSTALLED";
    installation.updatedAt = new Date().toISOString();

    return installation;
  }

  public get(
    installationId: string,
  ): InstallationResult | undefined {
    return this.installations.get(installationId);
  }

  public list(): InstallationResult[] {
    return Array.from(this.installations.values());
  }
}
