export interface EcosystemRecord {
  id: string;
  name: string;
  domain: string;
  lifecycleState: 'ACTIVE' | 'INCUBATION' | 'DEPRECATED';
  availableProducts: string[];
  capabilities: string[];
  securityClassification: string;
  regionalAvailability: string[];
}

export class EcosystemRegistry {
  private static instance: EcosystemRegistry;
  private ecosystems: Map<string, EcosystemRecord> = new Map();

  private constructor() {
    this.seedDefaults();
  }

  public static getInstance(): EcosystemRegistry {
    if (!EcosystemRegistry.instance) {
      EcosystemRegistry.instance = new EcosystemRegistry();
    }
    return EcosystemRegistry.instance;
  }

  private seedDefaults() {
    this.register({
      id: 'ECO-ERP-01',
      name: 'National ERP Ecosystem',
      domain: 'Sovereign Core',
      lifecycleState: 'ACTIVE',
      availableProducts: ['PROD-FIN-01', 'PROD-HR-01'],
      capabilities: ['Finance', 'HR', 'Procurement'],
      securityClassification: 'SECRET',
      regionalAvailability: ['NATIONAL']
    });
    this.register({
      id: 'ECO-EDU-01',
      name: 'National Education Ecosystem',
      domain: 'Education OS',
      lifecycleState: 'ACTIVE',
      availableProducts: ['PROD-EDU-01'],
      capabilities: ['Student Management', 'Curriculum', 'Assessment'],
      securityClassification: 'OFFICIAL',
      regionalAvailability: ['NATIONAL']
    });
  }

  public register(ecosystem: EcosystemRecord) {
    this.ecosystems.set(ecosystem.id, ecosystem);
  }

  public getEcosystem(id: string): EcosystemRecord | undefined {
    return this.ecosystems.get(id);
  }

  public getAllEcosystems(): EcosystemRecord[] {
    return Array.from(this.ecosystems.values());
  }
}
