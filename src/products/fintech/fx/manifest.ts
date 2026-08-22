export const FAM_FX_Manifest = {
  id: 'FAM_FX',
  name: 'Foreign Exchange & FX Treasury',
  version: '1.0.0',
  description: 'Real-time FX conversion, rates management, hedging, and liquidity provisioning.',
  status: 'PARTIALLY_IMPLEMENTED',
  dependencies: ['FAM_LEDGER'],
  capabilities: ['CAP_FX_01'],
  apis: ['/api/v1/fx/rates', '/api/v1/fx/trade'],
  workflows: ['RATE_INGESTION', 'DEALING_EXECUTION'],
  reports: ['FX_EXPOSURE', 'TRADE_BLOTTER']
};
