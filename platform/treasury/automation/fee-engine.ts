export const FeeEngine = {
  calculateTransactionFee: (amount: number) => amount * 0.01,
  calculateServiceFee: (serviceId: string) => 500,
};
