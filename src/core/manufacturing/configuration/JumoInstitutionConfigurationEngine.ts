export interface InstitutionalConfiguration {
  institutionId: string;
  branding: Record<string, string>;
  terminology: Record<string, string>;
  enabledModules: string[];
  enabledWorkflows: string[];
  enabledPortals: string[];
  enabledServices: string[];
  localization: {
    language: string;
    timezone: string;
    currency: string;
  };
}

export interface ConfigurationResult {
  institutionId: string;
  status: "PENDING" | "CONFIGURED" | "FAILED";
  configuration: InstitutionalConfiguration;
  updatedAt: string;
}

export class JumoInstitutionConfigurationEngine {
  private readonly configurations =
    new Map<string, ConfigurationResult>();

  public configure(
    configuration: InstitutionalConfiguration,
  ): ConfigurationResult {
    const result: ConfigurationResult = {
      institutionId: configuration.institutionId,
      status: "CONFIGURED",
      configuration,
      updatedAt: new Date().toISOString(),
    };

    this.configurations.set(
      configuration.institutionId,
      result,
    );

    return result;
  }

  public get(
    institutionId: string,
  ): ConfigurationResult | undefined {
    return this.configurations.get(institutionId);
  }

  public list(): ConfigurationResult[] {
    return Array.from(this.configurations.values());
  }
}
