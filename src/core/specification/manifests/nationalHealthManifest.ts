import { JumoAuthoritativeProductManifest } from './types';

export const JUMO_NATIONAL_HEALTH_MANIFEST: JumoAuthoritativeProductManifest = {
  productId: 'prod-national-health',
  productName: 'National Health EMR',
  productCode: 'NHE-001',
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',
  version: '2026.1.0',
  classification: 'RESTRICTED',
  departments: [],
  offices: [],
  portals: [],
  directorates: [
    { id: 'DIR-HL-01', name: 'National Health Records', code: 'NHR', description: 'National Health Records directorate operations', leadRole: 'DIRECTOR' }
  ],
  modules: [
    { id: 'MOD-HL-01', code: 'EMR_PORTAL', title: 'Clinical Data EMR Portal', purpose: 'Clinical Data EMR Portal purpose', directorateId: 'DIR-01', departmentId: 'DEPT-01', officeId: 'OFF-01', portalId: 'PORT-01', capabilityIds: [], screenIds: [], formIds: [], dashboardIds: [], reportIds: [], workflowIds: [], databaseEntityIds: [], apiIds: [], runtimeComponentIds: [], aiAgentIds: [], permissionIds: [] }
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
