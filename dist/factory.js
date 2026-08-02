"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterprisePlatformFactory = void 0;
class EnterprisePlatformFactory {
    static createPlatform(name, industry) {
        // Scaling requirements
        const portalCount = 20;
        const departmentCount = 20;
        const moduleCount = 200;
        const formCount = 100;
        const portals = Array.from({ length: portalCount }, (_, i) => ({
            id: `portal-${i}`,
            name: `Portal ${i + 1}`,
            owner: `Owner ${i + 1}`,
            purpose: `Purpose for portal ${i + 1}`,
            userRoles: ['RoleA', 'RoleB'],
            dashboard: `Dashboard ${i + 1}`,
            applications: [],
            modules: [],
            forms: [],
            workflows: [],
            reports: [],
            permissions: [],
            settings: `Settings ${i + 1}`,
            aiAssistance: true
        }));
        const departments = Array.from({ length: departmentCount }, (_, i) => ({
            id: `dept-${i}`,
            name: `Department ${i + 1}`,
            dashboard: `Dept Dashboard ${i + 1}`,
            staffRoles: ['StaffA', 'StaffB'],
            applications: [],
            modules: [],
            forms: [],
            workflows: [],
            reports: [],
            kpis: [],
            permissions: []
        }));
        const modules = Array.from({ length: moduleCount }, (_, i) => ({
            id: `mod-${i}`,
            name: `Module ${i + 1}`,
            capability: `Capability ${i + 1}`,
            dashboard: `Dashboard ${i + 1}`,
            dataModel: `DataModel ${i + 1}`,
            operations: ['create', 'update'],
            integrations: ['faap']
        }));
        const forms = Array.from({ length: formCount }, (_, i) => ({
            id: `form-${i}`,
            name: `Form ${i + 1}`,
            fields: [{ name: 'field1', type: 'text', required: true }],
            workflowId: `wf-${i}`,
            auditTrail: true
        }));
        return {
            identity: {
                name,
                family: 'Default',
                industry,
                institutionType: 'Default',
                description: `Enterprise platform for ${name}`,
                governanceModel: 'Centralized',
                serviceModel: 'SaaS',
                branding: { primaryColor: '#000', secondaryColor: '#FFF', logoUrl: '', fontFamily: 'sans-serif' },
                userCategories: ['Standard']
            },
            digitalEcosystem: {
                publicGateway: 'gateway-url',
                portals,
                internalWorkspaces: [],
                mobileServices: [],
                aiServices: []
            },
            institutionalArchitecture: {
                governance: [],
                directorates: [{ id: 'dir-1', name: 'Default Directorate', departments }]
            },
            operationalArchitecture: {
                applications: [],
                modules,
                forms,
                workflows: [],
                reports: [],
                analytics: []
            },
            platformServices: {
                faap: 'enabled',
                identity: 'enabled',
                notifications: 'enabled',
                documents: 'enabled',
                search: 'enabled',
                ai: 'enabled',
                audit: 'enabled',
                security: 'enabled'
            },
            governanceStructure: {
                board: [],
                executive: [],
                management: [],
                departmental: [],
                operational: []
            },
            securityArchitecture: {
                isolationLevel: 'high',
                identityResolution: 'portal-scoped',
                rolePolicy: 'strict'
            }
        };
    }
}
exports.EnterprisePlatformFactory = EnterprisePlatformFactory;
