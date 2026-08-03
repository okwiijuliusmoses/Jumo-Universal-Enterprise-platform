import { erpRuntimeGovernanceService }
from "./platform/factory/erp/services/ERPRuntimeGovernanceService.js";

console.log(
 JSON.stringify(
  erpRuntimeGovernanceService.inspect(),
  null,
  2
 )
);
