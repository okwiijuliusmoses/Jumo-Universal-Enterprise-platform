/**
 * JUMO UEOS
 * ERP Compliance Validator Service
 */

import { ERPEnterpriseStandard } from "../ERPEnterpriseStandard.js";

export class ERPComplianceValidator {
  constructor() {
    this.status = "ONLINE";
  }

  validate(instanceOrBlueprint) {
    const profile = ERPEnterpriseStandard.getStandardProfile(instanceOrBlueprint);
    return ERPEnterpriseStandard.validateCompliance(profile);
  }

  health() {
    return {
      service: "ERP Compliance Validator Service",
      status: this.status
    };
  }
}

export const erpComplianceValidator = new ERPComplianceValidator();
