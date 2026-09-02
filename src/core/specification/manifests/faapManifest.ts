import { JumoAuthoritativeProductManifest } from './types';

export const JUMO_FAAP_MANIFEST: JumoAuthoritativeProductManifest = {
  productId: 'prod-faap-product',
  productName: 'FAAP Statutory Engine',
  productCode: 'FAAP-001',
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',
  version: '2026.1.0',
  classification: 'RESTRICTED',
  departments: [],
  offices: [],
  portals: [],
  directorates: [
    { id: 'DIR-FA-01', name: 'Treasury & Audit', code: 'TR_AUD', description: 'Treasury & Audit directorate operations', leadRole: 'DIRECTOR' }
  ],
  modules: [
    { id: 'MOD-FA-01', code: 'GL_AUDIT', title: 'General Ledger Audit Dashboard', purpose: 'General Ledger Audit Dashboard purpose', directorateId: 'DIR-01', departmentId: 'DEPT-01', officeId: 'OFF-01', portalId: 'PORT-01', capabilityIds: [], screenIds: [], formIds: [], dashboardIds: [], reportIds: [], workflowIds: [], databaseEntityIds: [], apiIds: [], runtimeComponentIds: [], aiAgentIds: [], permissionIds: [] }
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
