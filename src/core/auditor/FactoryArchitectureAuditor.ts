export interface ArchitectureFinding {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  category: 'HARDCODED_VALUE' | 'DUPLICATE_REGISTRY' | 'UNREACHABLE_CAPABILITY' | 'MOCK_EXECUTION' | 'DISCONNECTED_ENGINE';
  affectedArtifact: string;
  evidence: string;
  recommendation: string;
  timestamp: string;
}

export class FactoryArchitectureAuditor {
  private static instance: FactoryArchitectureAuditor;
  private findings: ArchitectureFinding[] = [];

  private constructor() {
    this.runInitialAudit();
  }

  public static getInstance(): FactoryArchitectureAuditor {
    if (!FactoryArchitectureAuditor.instance) {
      FactoryArchitectureAuditor.instance = new FactoryArchitectureAuditor();
    }
    return FactoryArchitectureAuditor.instance;
  }

  private runInitialAudit() {
    this.record({
      id: 'AUD-001',
      severity: 'WARNING',
      category: 'HARDCODED_VALUE',
      affectedArtifact: 'UEOSShell.tsx',
      evidence: 'Sidebar contains static user context menu items',
      recommendation: 'Migrate user context menu to NavigationRegistry',
      timestamp: new Date().toISOString()
    });
  }

  public record(finding: ArchitectureFinding) {
    this.findings.push(finding);
  }

  public getFindings(): ArchitectureFinding[] {
    return [...this.findings];
  }
}
