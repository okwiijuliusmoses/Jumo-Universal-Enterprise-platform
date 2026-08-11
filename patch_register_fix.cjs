const fs = require('fs');
let code = fs.readFileSync('src/core/runtime/sovereignState.ts', 'utf8');

const target = `      case 'PRODUCTION':
        stageLog = \`[PRODUCTION] Deployment 100% active. Serving institutional transactions.\`;
        // Release swarm agents upon successful product production deployment
        job.assignedWorkforce.forEach(agentId => {
          JumoAIAgentRegistry.releaseAgentFromJob(agentId, jobId, true);
        });
        // 10. PRODUCT REGISTRY ACTIVATION
        try {
            const newRecord = {
                registryId: "reg-" + job.id,
                domainName: job.name,
                category: job.type === 'COMMERCIAL_PRODUCT' || job.type === 'COMMERCIAL_PRODUCTS_ECOSYSTEM' ? 'COMMERCIAL_PRODUCTS_ECOSYSTEM' : job.type,
                lifecycleState: 'PRODUCTION',
                deploymentEnvironment: 'JUMO_CLOUD',
                ownerInstitution: 'JUMO',
                technicalCustodian: 'Sovereign Command',
                lastAuditTimestamp: new Date().toISOString()
            };
            UniversalHubRegistry.registerRecord(newRecord as any);
            stageLog += \` Automatically registered \${job.name} into \${newRecord.category} registry.\`;
        } catch (e) {
            console.error("Auto-registration failed:", e);
        }
        break;`;

const newTarget = `      case 'PRODUCTION':
        stageLog = \`[PRODUCTION] Deployment 100% active. Serving institutional transactions.\`;
        // Release swarm agents upon successful product production deployment
        job.assignedWorkforce.forEach(agentId => {
          JumoAIAgentRegistry.releaseAgentFromJob(agentId, jobId, true);
        });
        // 10. PRODUCT REGISTRY ACTIVATION
        try {
            const newRecord: any = {
                registryId: "reg-" + job.id,
                name: job.name,
                domainName: job.name,
                type: job.type,
                category: job.type as any,
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
            UniversalHubRegistry.registerRecord(newRecord);
            stageLog += \` Automatically registered \${job.name} into \${newRecord.category} registry.\`;
        } catch (e) {
            console.error("Auto-registration failed:", e);
        }
        break;`;

code = code.replace(target, newTarget);
// Also fix the previous typo just in case:
code = code.replace(`job.type === 'COMMERCIAL_PRODUCT' || `, ``);
fs.writeFileSync('src/core/runtime/sovereignState.ts', code);
