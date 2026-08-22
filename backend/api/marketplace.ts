import { Router } from 'express';

export const marketplaceRouter = Router();

marketplaceRouter.get('/catalog', (req, res) => {
  res.json([
    { id: 'item-01', name: 'Church ERP Complete Template Suite', type: 'Domain Suite', pricing: '$499 / yr', publisher: 'JUMO Factory Core' },
    { id: 'item-02', name: 'SACCO Automated Dividends Calculator AI Agent', type: 'AI Copilot', pricing: '$199 / yr', publisher: 'FinTech Labs' },
    { id: 'item-03', name: 'Government Municipal Billing & Property Tax Adapter', type: 'Connector', pricing: '$899 / yr', publisher: 'Sovereign GovTech' },
  ]);
});

marketplaceRouter.post('/purchase', (req, res) => {
  const { itemId, tenantId } = req.body;
  res.json({
    success: true,
    txId: `tx_${Math.random().toString(36).substring(2, 8)}`,
    itemId,
    tenantId,
    licenseKey: `JUMO-LIC-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
    status: 'LICENSED - INSTANT ACTIVATION',
  });
});
