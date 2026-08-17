import * as fs from 'fs';
import * as path from 'path';

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

  private constructor() {}

  public static getInstance(): FactoryArchitectureAuditor {
    if (!FactoryArchitectureAuditor.instance) {
      FactoryArchitectureAuditor.instance = new FactoryArchitectureAuditor();
    }
    return FactoryArchitectureAuditor.instance;
  }

  public auditSystem() {
    this.findings = [];
    console.log('[AUDITOR] Starting system scan...');
    // Simulated basic static analysis for hardcoded artifacts
    this.scanDirectory(path.resolve(process.cwd(), 'src/experience'));
    this.scanDirectory(path.resolve(process.cwd(), 'src/core'));
  }

  private scanDirectory(dir: string) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        this.scanFile(fullPath);
      }
    }
  }

  private scanFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Check for hardcoded stats
    if (content.match(/value={[\d]+}/) || content.match(/value={'?\+?\d+%?'?}/)) {
      this.record({
        id: `AUD-HARDCODE-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        severity: 'CRITICAL',
        category: 'HARDCODED_VALUE',
        affectedArtifact: relativePath,
        evidence: 'File contains hardcoded numbers in value={} props (mock telemetry/stats).',
        recommendation: 'Replace with authoritative registry lookup or display UNAVAILABLE.',
        timestamp: new Date().toISOString()
      });
    }

    // Check for "setInterval" fake progress
    if (content.match(/setInterval\([^,]+,\s*\d+\)/) && content.includes('progress') && !content.includes('AutonomousManufacturingOrchestrator')) {
      this.record({
        id: `AUD-MOCK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        severity: 'CRITICAL',
        category: 'MOCK_EXECUTION',
        affectedArtifact: relativePath,
        evidence: 'File uses setInterval to fake progress or state transitions.',
        recommendation: 'Remove setInterval simulation. Drive state transitions from execution ledger.',
        timestamp: new Date().toISOString()
      });
    }
  }

  public record(finding: ArchitectureFinding) {
    this.findings.push(finding);
  }

  public getFindings(): ArchitectureFinding[] {
    return [...this.findings];
  }
}
