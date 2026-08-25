import { faapEngine as platformFaapEngine } from '../../platform/faap';

export interface RiskEvalParams {
  tenantId: string;
  requestedAmountUSD: number;
  creditScore: number;
  collateralRatio: number;
  historicalDefaultRate: number;
}

export interface RiskEvalResult {
  approvalStatus: 'APPROVED' | 'REJECTED' | 'REQUIRES_OWNER_OVERRIDE';
  riskCategory: 'LOW_RISK' | 'HIGH_RISK' | 'MODERATE_RISK';
  score: number;
}

export const faapEngine = {
  ...platformFaapEngine,
  evaluateRisk(params: RiskEvalParams): RiskEvalResult {
    let approvalStatus: 'APPROVED' | 'REJECTED' | 'REQUIRES_OWNER_OVERRIDE' = 'APPROVED';
    let riskCategory: 'LOW_RISK' | 'HIGH_RISK' | 'MODERATE_RISK' = 'LOW_RISK';

    if (params.creditScore < 500 || params.historicalDefaultRate > 0.15 || params.collateralRatio < 0.8) {
      approvalStatus = 'REJECTED';
      riskCategory = 'HIGH_RISK';
    } else if (params.creditScore < 700 || params.historicalDefaultRate > 0.03 || params.collateralRatio < 1.2) {
      approvalStatus = 'REQUIRES_OWNER_OVERRIDE';
      riskCategory = 'MODERATE_RISK';
    } else {
      approvalStatus = 'APPROVED';
      riskCategory = 'LOW_RISK';
    }

    return {
      approvalStatus,
      riskCategory,
      score: params.creditScore,
    };
  },
};
