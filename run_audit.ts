import { FactoryArchitectureAuditor } from './src/core/auditor/FactoryArchitectureAuditor';
const auditor = FactoryArchitectureAuditor.getInstance();
auditor.auditSystem();
console.log(JSON.stringify(auditor.getFindings(), null, 2));
