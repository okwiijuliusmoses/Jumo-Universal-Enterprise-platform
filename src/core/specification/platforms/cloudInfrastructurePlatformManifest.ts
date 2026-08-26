import { JumoPlatformAuthoritativeManifest } from './types';

export const JUMO_CLOUD_INFRASTRUCTURE_PLATFORM_MANIFEST: JumoPlatformAuthoritativeManifest = {
  platformId: 'plat-cloud-infra',
  platformCode: 'CLOUD_INFRA',
  platformName: 'JUMO CLOUD (Multi-Tenant Sovereign Infrastructure & Vault Platform)',
  classification: 'SHARED_INDEPENDENT_PLATFORM',
  version: '2026.4.0',
  description: 'Sovereign cloud infrastructure orchestrator handling multi-tenant database provisioning, storage vault isolation, tenant onboarding, automated data backups, and geo-redundant clustering.',
  subsystems: [
    {
      id: 'CLOUD-SUB-001',
      code: 'CLOUD_TENANT_MANAGER',
      name: 'Tenant Lifecycle & Provisioning Subsystem',
      description: 'Creates isolated tenant schemas, configures subscription quotas, and provisions initial admin credentials.',
      serviceIds: ['CLOUD-SRV-001'],
      capabilities: ['Tenant Provisioning', 'Quota Enforcement', 'Tenant Deprovisioning'],
      databaseEntities: ['cloud_tenants', 'cloud_tenant_quotas']
    },
    {
      id: 'CLOUD-SUB-002',
      code: 'CLOUD_STORAGE_VAULT',
      name: 'Encrypted Sovereign Storage Vault Subsystem',
      description: 'Manages encrypted blob storage for scanned documents, PDF statements, and receipts with tenant isolation.',
      serviceIds: ['CLOUD-SRV-002'],
      capabilities: ['Encrypted Blob Storage', 'Time-Limited Presigned URLs', 'Storage Retention Policies'],
      databaseEntities: ['cloud_storage_objects']
    }
  ],
  services: [
    {
      id: 'CLOUD-SRV-001',
      code: 'TenantProvisioningService',
      name: 'Tenant Provisioning Service',
      description: 'Provisions dedicated tenant database workspaces and initializes default seed configurations.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/cloud/tenants/create', '/api/v1/cloud/tenants/status']
    },
    {
      id: 'CLOUD-SRV-002',
      code: 'StorageVaultService',
      name: 'Sovereign Storage Vault Service',
      description: 'Handles secure uploads and downloads of tenant attachments.',
      serviceTier: 'VAULT',
      endpoints: ['/api/v1/cloud/storage/upload', '/api/v1/cloud/storage/download']
    }
  ],
  extensionPoints: [
    {
      id: 'CLOUD-EXT-001',
      hookName: 'onTenantCreated',
      description: 'Triggered when a new enterprise tenant is provisioned.',
      supportedProducts: [
        'prod-fintech',
        'prod-nursery-primary',
        'prod-secondary-school',
        'prod-university-tertiary',
        'prod-church-faith',
        'prod-alumni-community'
      ],
      requiredProtocol: 'CLOUD_EVENT_V1'
    }
  ],
  databaseEntities: [
    {
      id: 'CLOUD-DB-001',
      tableName: 'cloud_tenants',
      description: 'Master registry of all enterprise organizations on the platform.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'tenant_code', type: 'VARCHAR(64)', required: true },
        { name: 'product_id', type: 'VARCHAR(64)', required: true },
        { name: 'organization_name', type: 'VARCHAR(255)', required: true },
        { name: 'status', type: 'VARCHAR(32)', required: true },
        { name: 'created_at', type: 'TIMESTAMP', required: true }
      ]
    }
  ],
  apis: [
    {
      id: 'CLOUD-API-001',
      endpoint: '/api/v1/cloud/tenants',
      method: 'GET',
      description: 'Lists active tenants for a given product or administrator.',
      authLevel: 'STAFF'
    }
  ],
  roles: [
    {
      id: 'CLOUD-ROLE-001',
      name: 'Cloud Infrastructure Operator',
      description: 'Oversees server clusters, database partitions, and tenant allocations.',
      permissions: ['cloud:infra:manage', 'cloud:tenants:provision', 'cloud:backups:execute']
    }
  ],
  testContracts: [
    {
      id: 'CLOUD-TEST-001',
      targetId: 'CLOUD_TENANT_MANAGER',
      testType: 'PLATFORM_COMPLIANCE',
      expectedAssertion: 'Tenant database queries must enforce tenant_id isolation in all WHERE clauses.'
    }
  ]
};
