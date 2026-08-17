import {
  JumoInstitutionalDigitalSpecification,
} from "./JumoInstitutionalDigitalSpecification";

export class JumoInstitutionalSpecificationEngine {
  private readonly specifications =
    new Map<string, JumoInstitutionalDigitalSpecification>();

  public create(
    input: Omit<
      JumoInstitutionalDigitalSpecification,
      "id" | "version" | "createdAt" | "updatedAt"
    >,
  ): JumoInstitutionalDigitalSpecification {
    const now = new Date().toISOString();

    const specification: JumoInstitutionalDigitalSpecification = {
      ...input,
      id: `SPEC-INSTITUTION-${Date.now()}`,
      version: "1.0.0",
      createdAt: now,
      updatedAt: now,
    };

    this.specifications.set(specification.id, specification);

    return specification;
  }

  public get(
    specificationId: string,
  ): JumoInstitutionalDigitalSpecification | undefined {
    return this.specifications.get(specificationId);
  }

  public list(): JumoInstitutionalDigitalSpecification[] {
    return Array.from(this.specifications.values());
  }

  public validate(
    specification: JumoInstitutionalDigitalSpecification,
  ): string[] {
    const errors: string[] = [];

    if (!specification.identity.legalName.trim()) {
      errors.push("Institution legal name is required.");
    }

    if (!specification.identity.institutionType.trim()) {
      errors.push("Institution type is required.");
    }

    if (!specification.identity.jurisdiction.trim()) {
      errors.push("Operating jurisdiction is required.");
    }

    if (specification.governance.departments.length === 0) {
      errors.push("At least one institutional department is required.");
    }

    if (specification.operations.businessProcesses.length === 0) {
      errors.push("At least one institutional business process is required.");
    }

    if (specification.installation.domainsToInstall.length === 0) {
      errors.push("At least one installation domain is required.");
    }

    if (specification.configuration.enabledModules.length === 0) {
      errors.push("At least one ERP/module configuration is required.");
    }

    return errors;
  }

  public isReadyForArchitecture(
    specification: JumoInstitutionalDigitalSpecification,
  ): boolean {
    return this.validate(specification).length === 0;
  }
}
