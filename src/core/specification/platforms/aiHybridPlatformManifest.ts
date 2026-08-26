import { JumoPlatformAuthoritativeManifest } from './types';

export const JUMO_AI_HYBRID_PLATFORM_MANIFEST: JumoPlatformAuthoritativeManifest = {
  platformId: 'plat-ai-hybrid',
  platformCode: 'AI_HYBRID',
  platformName: 'JUMO AI DIGITAL HYBRID (Cognitive Enterprise AI & Anomaly Platform)',
  classification: 'SHARED_INDEPENDENT_PLATFORM',
  version: '2026.4.0',
  description: 'Enterprise AI orchestration platform providing natural language query interpretation, intelligent OCR document extraction, predictive financial forecasting, and real-time fraud anomaly scoring.',
  subsystems: [
    {
      id: 'AI-SUB-001',
      code: 'AI_DOC_INTELLIGENCE',
      name: 'Document Intelligence & OCR Extraction Subsystem',
      description: 'Parses National IDs, financial bank statements, tuition receipts, and KYC documents into structured JSON.',
      serviceIds: ['AI-SRV-001'],
      capabilities: ['KYC Document Extraction', 'Receipt OCR Parsing', 'Identity Cross-Validation'],
      databaseEntities: ['ai_parsed_documents']
    },
    {
      id: 'AI-SUB-002',
      code: 'AI_ANOMALY_ENGINE',
      name: 'Cognitive Anomaly & Fraud Scoring Subsystem',
      description: 'Applies heuristic and machine learning scoring to transaction velocity and behavioral patterns.',
      serviceIds: ['AI-SRV-002'],
      capabilities: ['Real-time Risk Scoring', 'Behavioral Anomaly Detection', 'Collusion Pattern Analysis'],
      databaseEntities: ['ai_risk_scores']
    }
  ],
  services: [
    {
      id: 'AI-SRV-001',
      code: 'DocumentOcrService',
      name: 'Document Intelligence & OCR Service',
      description: 'Extracts structured entity attributes from scanned images and PDFs.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/ai/extract-doc', '/api/v1/ai/validate-kyc']
    },
    {
      id: 'AI-SRV-002',
      code: 'FraudScoringService',
      name: 'Fraud & Anomaly Scoring Service',
      description: 'Scores transactions against known fraud patterns in sub-100ms.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/ai/score-transaction', '/api/v1/ai/fraud-risk']
    }
  ],
  extensionPoints: [
    {
      id: 'AI-EXT-001',
      hookName: 'onDocumentUploaded',
      description: 'Triggered when a user uploads identity or receipt media.',
      supportedProducts: [
        'prod-fintech',
        'prod-nursery-primary',
        'prod-secondary-school',
        'prod-university-tertiary',
        'prod-church-faith',
        'prod-alumni-community'
      ],
      requiredProtocol: 'AI_PIPELINE_V1'
    }
  ],
  databaseEntities: [
    {
      id: 'AI-DB-001',
      tableName: 'ai_parsed_documents',
      description: 'Structured metadata extracted from uploaded files.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'document_hash', type: 'VARCHAR(64)', required: true },
        { name: 'extracted_data', type: 'JSONB', required: true },
        { name: 'confidence_score', type: 'DECIMAL(5,4)', required: true }
      ]
    }
  ],
  apis: [
    {
      id: 'AI-API-001',
      endpoint: '/api/v1/ai/extract-doc',
      method: 'POST',
      description: 'Submits document for asynchronous cognitive parsing.',
      authLevel: 'STAFF'
    }
  ],
  roles: [
    {
      id: 'AI-ROLE-001',
      name: 'AI Operations & Model Supervisor',
      description: 'Monitors model inference quality and threshold tunings.',
      permissions: ['ai:models:configure', 'ai:telemetry:view']
    }
  ],
  testContracts: [
    {
      id: 'AI-TEST-001',
      targetId: 'AI_DOC_INTELLIGENCE',
      testType: 'PLATFORM_COMPLIANCE',
      expectedAssertion: 'Standard ID extraction must return confidence score above 0.85 on clear images.'
    }
  ]
};
