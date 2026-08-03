import { erpEcosystemDeploymentManager }
from "./platform/factory/erp/ERPEcosystemDeploymentManager.js";

console.log("DEPLOYING JUMO UEOS ERP ECOSYSTEM...");

const result =
erpEcosystemDeploymentManager.deployBlueprints([
  "education-erp",
  "government-erp",
  "finance-microfinance-erp",
  "healthcare-erp",
  "agriculture-erp",
  "commerce-erp",
  "enterprise-company-erp",
  "community-cultural-erp"
]);

console.log(JSON.stringify(result,null,2));
