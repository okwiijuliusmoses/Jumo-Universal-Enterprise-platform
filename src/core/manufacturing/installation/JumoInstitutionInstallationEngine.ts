// JUMO UEOS — Institution Installation Engine (Adapter to InstitutionalInstallationFactory)
import { InstitutionalInstallationFactory, InstitutionalIntakeRequest } from "../../institutional/installation/InstitutionalInstallationFactory";

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
  private factory = InstitutionalInstallationFactory.getInstance();

  public createRequest(request: InstallationRequest): InstallationResult {
    const intake: InstitutionalIntakeRequest = {
      institutionId: request.institutionId,
      institutionName: `Institution ${request.institutionId}`,
      institutionType: 'NATIONAL_GOVERNMENT',
      tenantId: `TENANT-${request.institutionId}`,
      location: 'Sovereign Enclave',
      operatingEnvironment: request.environment === 'AIR_GAPPED' ? 'AIR_GAPPED_ENCLAVE' : 'SOVEREIGN_ON_PREM',
      administrators: [{ name: 'Admin', email: 'admin@gov.local', role: 'CHIEF_ADMIN', securityClearance: 'SECRET' }],
      departments: ['Executive', 'Operations'],
      domains: request.domains,
      requiredModules: request.modules,
      requiredServices: request.portals,
      requiredWorkflows: ['DEFAULT_APPROVAL_WORKFLOW'],
      dataSources: [{ name: 'PrimaryDB', type: 'PostgreSQL', uri: 'postgresql://db.local:5432/primary', encryption: 'AES_256_GCM' }],
      integrations: request.integrations.map(intg => ({ targetSystem: intg, protocol: 'REST/JSON', authMethod: 'mTLS' })),
      securityRequirements: {
        zeroTrustRequired: true,
        dataResidencyCountry: 'DOMESTIC',
        encryptionAtRest: 'AES_256_GCM',
        mfaEnforced: true,
        auditRetentionDays: 3650
      },
      aiRequirements: {
        primaryIntelligence: 'JUMO_GPT_SOVEREIGN',
        specialistAssigned: 'GEMINI_FLASH',
        humanInTheLoopThreshold: 'CRITICAL_ALL',
        offlineFallbackAllowed: true
      },
      branding: {
        displayName: request.institutionId,
        primaryColor: '#1E40AF',
        language: 'en',
        currency: 'USD',
        timezone: 'UTC'
      },
      complianceFrameworks: ['ISO 27001', 'SOC 2 Type II'],
      offlineOperatingSupport: true
    };

    const { intakeId } = this.factory.registerIntake(intake);

    return {
      id: intakeId || `INSTALL-${Date.now()}`,
      productId: request.productId,
      institutionId: request.institutionId,
      status: "QUEUED",
      installedDomains: request.domains,
      installedModules: request.modules,
      installedPortals: request.portals,
      installedIntegrations: request.integrations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  public execute(installationId: string): InstallationResult {
    const inst = this.factory.getInstallation(installationId);
    if (!inst) {
      return {
        id: installationId,
        productId: "UNKNOWN",
        institutionId: "UNKNOWN",
        status: "INSTALLED",
        installedDomains: [],
        installedModules: [],
        installedPortals: [],
        installedIntegrations: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    return {
      id: inst.installationId,
      productId: inst.productId,
      institutionId: inst.institutionId,
      status: "INSTALLED",
      installedDomains: [],
      installedModules: inst.installedModules,
      installedPortals: inst.installedServices,
      installedIntegrations: inst.installedIntegrations,
      createdAt: inst.createdAt,
      updatedAt: inst.updatedAt
    };
  }

  public get(installationId: string): InstallationResult | undefined {
    const inst = this.factory.getInstallation(installationId);
    if (!inst) return undefined;
    return {
      id: inst.installationId,
      productId: inst.productId,
      institutionId: inst.institutionId,
      status: inst.currentStage === 'GO_LIVE_OPERATIONAL' || inst.currentStage === 'COMMISSIONING_COMPLETED' ? 'INSTALLED' : 'INSTALLING',
      installedDomains: [],
      installedModules: inst.installedModules,
      installedPortals: inst.installedServices,
      installedIntegrations: inst.installedIntegrations,
      createdAt: inst.createdAt,
      updatedAt: inst.updatedAt
    };
  }

  public list(): InstallationResult[] {
    return this.factory.getAllInstallations().map(inst => ({
      id: inst.installationId,
      productId: inst.productId,
      institutionId: inst.institutionId,
      status: inst.currentStage === 'GO_LIVE_OPERATIONAL' ? 'INSTALLED' : 'INSTALLING',
      installedDomains: [],
      installedModules: inst.installedModules,
      installedPortals: inst.installedServices,
      installedIntegrations: inst.installedIntegrations,
      createdAt: inst.createdAt,
      updatedAt: inst.updatedAt
    }));
  }
}
