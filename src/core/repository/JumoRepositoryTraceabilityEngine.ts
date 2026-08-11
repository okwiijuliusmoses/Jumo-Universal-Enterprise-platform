export interface JumoTraceabilityRecord {
  id: string;
  repositoryId: string;
  specificationId?: string;
  architectureId?: string;
  artifactId?: string;
  verificationId?: string;
  releaseId?: string;
  deploymentId?: string;
  createdAt: string;
}

export class JumoRepositoryTraceabilityEngine {
  private readonly records = new Map<
    string,
    JumoTraceabilityRecord
  >();

  record(
    input: Omit<
      JumoTraceabilityRecord,
      'id' | 'createdAt'
    >
  ) {
    const record: JumoTraceabilityRecord = {
      ...input,
      id: `trace-${input.repositoryId}-${Date.now()}-${this.records.size}`,
      createdAt:
        new Date().toISOString(),
    };

    this.records.set(record.id, record);

    return record;
  }

  list(repositoryId?: string) {
    const records =
      Array.from(this.records.values());

    return repositoryId
      ? records.filter(
          record =>
            record.repositoryId === repositoryId
        )
      : records;
  }

  findBySpecification(
    specificationId: string
  ) {
    return this.list().filter(
      record =>
        record.specificationId ===
        specificationId
    );
  }

  findByVerification(
    verificationId: string
  ) {
    return this.list().filter(
      record =>
        record.verificationId ===
        verificationId
    );
  }
}
