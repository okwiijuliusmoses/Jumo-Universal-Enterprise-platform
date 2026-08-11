const fs = require('fs');
let code = fs.readFileSync('src/core/runtime/sovereignState.ts', 'utf8');

const target = `            const newRecord = {
                registryId: "reg-" + job.id,
                domainName: job.name,
                category: job.type === 'COMMERCIAL_PRODUCTS_ECOSYSTEM' ? 'COMMERCIAL_PRODUCTS_ECOSYSTEM' : job.type,
                lifecycleState: 'PRODUCTION',
                deploymentEnvironment: 'JUMO_CLOUD',
                ownerInstitution: 'JUMO',
                technicalCustodian: 'Sovereign Command',
                lastAuditTimestamp: new Date().toISOString()
            };
            UniversalHubRegistry.registerRecord(newRecord);`;

const newTarget = `            const newRecord = {
                registryId: "reg-" + job.id,
                name: job.name,
                domainName: job.name,
                type: job.type,
                category: job.type === 'COMMERCIAL_PRODUCTS_ECOSYSTEM' ? 'COMMERCIAL_PRODUCTS_ECOSYSTEM' : job.type as any,
                version: "1.0.0",
                implementationVersion: "1.0.0",
                architectureBaseline: "Generated Architecture Contract v1",
                lifecycleState: 'PRODUCTION',
                deploymentEnvironment: 'JUMO_CLOUD',
                ownerInstitution: 'JUMO',
                technicalCustodian: 'Sovereign Command',
                createdAt: new Date().toISOString(),
                lastAuditTimestamp: new Date().toISOString(),
                securityClearance: 'LEVEL_3',
                dataClassification: 'CONFIDENTIAL',
                slaTier: 'TIER_1',
                activeNodes: 3,
                healthStatus: 'HEALTHY'
            };
            UniversalHubRegistry.registerRecord(newRecord as any);`;

code = code.replace(target, newTarget);
fs.writeFileSync('src/core/runtime/sovereignState.ts', code);
