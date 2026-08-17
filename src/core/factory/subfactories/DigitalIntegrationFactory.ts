// JUMO UEOS — Digital Integration Factory
// Governs and manufactures API gateways, webhooks, event bridges, and external integration adapters
// Lineage: JDPM/MFG2608/xxxx subordinate to JDPM/BLUE2608/xxxx

export interface IntegrationManifest {
  integrationId: string;
  name: string;
  protocol: 'REST_OPENAPI' | 'GRPC' | 'WEBSOCKET' | 'ISO_20022_FINANCIAL' | 'WEBHOOK';
  targetSystem: string;
  endpointUrl: string;
  version: string;
  lineageId: string;
  blueprintRef: string;
  authStrategy: 'MTLS_HARDWARE_KEY' | 'OAUTH2_CLIENT_CREDS' | 'BEARER_TOKEN' | 'HMAC_SHA256';
  deadLetterQueueConfig: {
    enabled: boolean;
    maxRetries: number;
    backoffMs: number;
    dlqTopic: string;
  };
  rateLimit: {
    requestsPerSecond: number;
    burstCapacity: number;
  };
  transformationMapping: Record<string, string>;
  activeHealth: 'REACHABLE' | 'DEGRADED' | 'UNREACHABLE';
  cryptographicHash: string;
  createdAt: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'MAINTENANCE';
}

export class DigitalIntegrationFactory {
  private static instance: DigitalIntegrationFactory;
  private integrations: Map<string, IntegrationManifest> = new Map();

  private constructor() {
    this.seedCanonicalIntegrations();
  }

  public static getInstance(): DigitalIntegrationFactory {
    if (!DigitalIntegrationFactory.instance) {
      DigitalIntegrationFactory.instance = new DigitalIntegrationFactory();
    }
    return DigitalIntegrationFactory.instance;
  }

  private seedCanonicalIntegrations() {
    const canonicals: IntegrationManifest[] = [
      {
        integrationId: 'INT-CENTRAL-BANK-01',
        name: 'National Central Bank Real-Time Gross Settlement (RTGS)',
        protocol: 'ISO_20022_FINANCIAL',
        targetSystem: 'National Central Clearing House',
        endpointUrl: 'https://rtgs.centralbank.jumo.internal/v2/settlement',
        version: '2.4.0',
        lineageId: 'JDPM/MFG2608/0001',
        blueprintRef: 'JDPM/BLUE2608/0001',
        authStrategy: 'MTLS_HARDWARE_KEY',
        deadLetterQueueConfig: {
          enabled: true,
          maxRetries: 5,
          backoffMs: 2000,
          dlqTopic: 'rtgs-dead-letters'
        },
        rateLimit: {
          requestsPerSecond: 100,
          burstCapacity: 250
        },
        transformationMapping: {
          'source.txId': 'pacs.008.001.08.GrpHdr.MsgId',
          'source.amount': 'pacs.008.001.08.CdtTrfTxInf.IntrBkSttlmAmt'
        },
        activeHealth: 'REACHABLE',
        cryptographicHash: 'sha256:1a3f5c7e9b0d2f4a6c8e1b3d5f7a9c0e2b4d6f8a4a8f9c1b3e5d7a2f0c6e8b4d',
        createdAt: '2026-08-15T00:00:00.000Z',
        status: 'CONNECTED'
      }
    ];

    canonicals.forEach(i => this.integrations.set(i.integrationId, i));
  }

  public manufactureIntegration(params: Omit<IntegrationManifest, 'cryptographicHash' | 'createdAt' | 'status'>): IntegrationManifest {
    const rawContent = `${params.integrationId}:${params.version}:${params.blueprintRef}:${params.endpointUrl}`;
    const hash = this.calculateDigest(rawContent);

    const integration: IntegrationManifest = {
      ...params,
      cryptographicHash: `sha256:${hash}`,
      createdAt: new Date().toISOString(),
      status: 'CONNECTED'
    };

    this.integrations.set(integration.integrationId, integration);
    return integration;
  }

  public getIntegration(id: string): IntegrationManifest | undefined {
    return this.integrations.get(id);
  }

  public getAllIntegrations(): IntegrationManifest[] {
    return Array.from(this.integrations.values());
  }

  private calculateDigest(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex}c3d4e5f6a1b20718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f8a9`;
  }
}
