import { Router } from 'express';

export const treasuryRouter = Router();

treasuryRouter.get('/overview', (req, res) => {
  res.json({
    masterTreasuryBalanceUsd: 14500000,
    dailySettlementVolumeUsd: 1850000,
    clearingFeeRevenueUsd: 27750,
    settlementFeeRate: '1.5%',
    doubleEntryParity: '$0.00 OFFSET (100% PARITY)',
  });
});

treasuryRouter.get('/transactions', (req, res) => {
  res.json([
    { txId: 'tx-88910', urn: 'URN-2026-UGX-88192', amount: 4500000, currency: 'UGX', status: 'SETTLED', method: 'Mobile Money (M-Pesa)' },
    { txId: 'tx-88911', urn: 'URN-2026-USD-10492', amount: 12500, currency: 'USD', status: 'SETTLED', method: 'SWIFT Gateway' },
  ]);
});

treasuryRouter.post('/process-settlement', (req, res) => {
  const { amount, currency, method, institution } = req.body;
  res.json({
    success: true,
    txId: `tx_${Math.random().toString(36).substring(2, 8)}`,
    urn: `URN-2026-${currency || 'USD'}-${Math.floor(10000 + Math.random() * 90000)}`,
    amount: Number(amount) || 1000,
    currency: currency || 'USD',
    method: method || 'RTGS',
    institution: institution || 'Sovereign Treasury',
    status: 'SETTLED',
    feeCollected: (Number(amount) || 1000) * 0.015,
  });
});
