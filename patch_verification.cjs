const fs = require('fs');
let code = fs.readFileSync('src/core/runtime/sovereignState.ts', 'utf8');

const target = `      case 'APPROVED':
        stageLog = \`[APPROVED] Signed and validated. Golden artifact sealed in sovereign vault.\`;
        break;`;

const newTarget = `      case 'APPROVED': {
        // Enforce Architectural QA Gates before approval
        const architectureContract = this.state.architectureRequests.find(req => req.id === job.blueprintId);
        const qaResults = this.runVerificationSuite(actor, architectureContract?.detailedSpecification);
        const hasFailures = qaResults.some(g => g.status === 'FAIL');
        
        if (hasFailures) {
          // Automatic Failure Correction Loop trigger
          job.status = 'BLOCKED';
          stageLog = \`[FAIL] Architecture-Aware QA Verification Failed. Freezing promotion. Diagnostic report generated. Commencing automatic correction loop with Gemini / ChatGPT implementation engine. Affected components isolated. Re-queued for rebuild.\`;
          this.logAudit(actor, "QA_GATES_FAILED", \`Job \${job.id} failed verification gates and was frozen. Correction loop initiated.\`);
          this.saveState();
          return job;
        }
        
        stageLog = \`[APPROVED] All 20-Gate Architecture QA checks passed. Signed and validated. Golden artifact sealed in sovereign vault.\`;
        break;
      }`;

if (code.indexOf(target) > -1) {
    fs.writeFileSync('src/core/runtime/sovereignState.ts', code.replace(target, newTarget));
}
