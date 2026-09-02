import { JumoAuthoritativeProductManifest } from './types';

export const JUMO_NATIONAL_IDENTITY_MANIFEST: JumoAuthoritativeProductManifest = {
  productId: 'prod-national-identity',
  productName: 'National Identity Platform',
  productCode: 'NID-001',
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',
  version: '2026.1.0',
  classification: 'RESTRICTED',
  departments: [],
  offices: [],
  portals: [],
  directorates: [
    { id: 'DIR-ID-01', name: 'Citizen ID Security', code: 'CIDS', description: 'Citizen ID Security directorate operations', leadRole: 'DIRECTOR' }
  ],
  modules: [
    { id: 'MOD-ID-01', code: 'AUTH_KYC', title: 'Authentication & KYC Engine', purpose: 'Authentication & KYC Engine purpose', directorateId: 'DIR-01', departmentId: 'DEPT-01', officeId: 'OFF-01', portalId: 'PORT-01', capabilityIds: [], screenIds: [], formIds: [], dashboardIds: [], reportIds: [], workflowIds: [], databaseEntityIds: [], apiIds: [], runtimeComponentIds: [], aiAgentIds: [], permissionIds: [] }
  ],
  capabilities: [],
  screens: [],
  forms: [],
  dashboards: [],
  reports: [],
  workflows: [],
  databaseEntities: [],
  apis: [],
  runtimeComponents: [],
  aiAgents: [],
  roles: [],
  permissions: [],
  integrations: [],
  configurations: [],
  testContracts: []
};
