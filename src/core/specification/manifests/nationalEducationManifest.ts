import { JumoAuthoritativeProductManifest } from './types';

export const JUMO_NATIONAL_EDUCATION_MANIFEST: JumoAuthoritativeProductManifest = {
  productId: 'prod-national-education',
  productName: 'National Education Platform',
  productCode: 'NED-001',
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',
  version: '2026.1.0',
  classification: 'RESTRICTED',
  departments: [],
  offices: [],
  portals: [],
  directorates: [
    { id: 'DIR-ED-01', name: 'Academic Gov Curriculum', code: 'AGC', description: 'Academic Gov Curriculum directorate operations', leadRole: 'DIRECTOR' }
  ],
  modules: [
    { id: 'MOD-ED-01', code: 'STU_CERT', title: 'Student Certification Portal', purpose: 'Student Certification Portal purpose', directorateId: 'DIR-01', departmentId: 'DEPT-01', officeId: 'OFF-01', portalId: 'PORT-01', capabilityIds: [], screenIds: [], formIds: [], dashboardIds: [], reportIds: [], workflowIds: [], databaseEntityIds: [], apiIds: [], runtimeComponentIds: [], aiAgentIds: [], permissionIds: [] }
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
