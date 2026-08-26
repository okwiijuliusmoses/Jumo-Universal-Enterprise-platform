import { Router } from 'express';

export const tenantRouter = Router();

tenantRouter.get('/list', (req, res) => {
  res.json([
    { id: 't_sacco_01', name: 'Starlight Farmers SACCO', domain: 'sacco', status: 'ACTIVE', users: 450, balanceUsd: 124000 },
    { id: 't_hosp_01', name: 'Mulago Referral Hospital EHR', domain: 'healthcare', status: 'ACTIVE', users: 1200, balanceUsd: 540000 },
    { id: 't_univ_01', name: 'Makerere University ERP', domain: 'education', status: 'ACTIVE', users: 18400, balanceUsd: 890000 },
  ]);
});

tenantRouter.get('/:id/details', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Sovereign Institutional Tenant',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    modules: ['FAAP Ledger', 'AEGIS Mesh', 'JUPIE Identity', 'Universal Offline Sync'],
  });
});
