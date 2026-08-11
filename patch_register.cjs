const fs = require('fs');
let code = fs.readFileSync('src/core/runtime/sovereignState.ts', 'utf8');

const target = `      case 'PRODUCTION':
        stageLog = \`[PRODUCTION] Deployment 100% active. Serving institutional transactions.\`;
        // Release swarm agents upon successful product production deployment
        job.assignedWorkforce.forEach(agentId => {
          JumoAIAgentRegistry.releaseAgentFromJob(agentId, jobId, true);
        });
        break;`;

const newTarget = `      case 'PRODUCTION':
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
            UniversalHubRegistry.registerRecord(newRecord);
            stageLog += \` Automatically registered \${job.name} into \${newRecord.category} registry.\`;
        } catch (e) {
            console.error("Auto-registration failed:", e);
        }
        break;`;

if (code.indexOf(target) > -1) {
    fs.writeFileSync('src/core/runtime/sovereignState.ts', code.replace(target, newTarget));
}
