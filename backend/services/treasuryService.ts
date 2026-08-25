import { treasuryEngine } from '../../platform/treasury';

export const treasuryService = {
  ...treasuryEngine,
  allocateFacility(facilityId: string, amountUSD: number) {
    return {
      pool: {
        facilityId,
        allocatedAmountUSD: amountUSD,
        status: 'ACTIVE',
        timestamp: new Date().toISOString(),
      },
    };
  },
};
