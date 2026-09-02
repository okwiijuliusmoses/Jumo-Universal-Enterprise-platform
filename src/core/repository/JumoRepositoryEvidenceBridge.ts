export interface JumoRepositoryEvidence {
  id: string;
  repositoryId: string;
  source:
    | 'SPECIFICATION'
    | 'ARCHITECTURE'
    | 'TEST'
    | 'VERIFICATION'
    | 'AI'
    | 'DEPLOYMENT'
    | 'OPERATION';
  reference: string;
  result:
    | 'PASS'
    | 'FAIL'
    | 'WARNING'
    | 'INFORMATION';
  details: Record<string, unknown>;
  createdAt: string;
}

export class JumoRepositoryEvidenceBridge {
  private readonly evidence = new Map<
    string,
    JumoRepositoryEvidence
  >();

  add(
    evidence: Omit<
      JumoRepositoryEvidence,
      'id' | 'createdAt'
    >
  ) {
    const record: JumoRepositoryEvidence = {
      ...evidence,
      id: `evidence-${evidence.repositoryId}-${Date.now()}-${this.evidence.size}`,
      createdAt:
        new Date().toISOString(),
    };

    this.evidence.set(
      record.id,
      record
    );

    return record;
  }

  list(repositoryId?: string) {
    const values =
      Array.from(this.evidence.values());

    return repositoryId
      ? values.filter(
          item =>
            item.repositoryId ===
            repositoryId
        )
      : values;
  }

  failures(repositoryId: string) {
    return this.list(repositoryId).filter(
      item => item.result === 'FAIL'
    );
  }

  hasBlockingFailure(
    repositoryId: string
  ) {
    return this.failures(repositoryId)
      .length > 0;
  }
}
