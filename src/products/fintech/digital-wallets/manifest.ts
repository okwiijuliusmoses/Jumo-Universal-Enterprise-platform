export const FAM_DIGITAL_WALLETS_Manifest = {
  id: 'FAM_DIGITAL_WALLETS',
  name: 'Digital Wallets',
  version: '1.0.0',
  description: 'Stored value facilities, closed-loop and open-loop digital wallet management.',
  status: 'PARTIALLY_IMPLEMENTED',
  dependencies: ['FAM_LEDGER'],
  capabilities: ['CAP_DW_01', 'CAP_DW_02'],
  apis: ['/api/v1/wallets/create', '/api/v1/wallets/balance', '/api/v1/wallets/transfer'],
  workflows: ['WALLET_PROVISIONING', 'FUNDS_TRANSFER', 'WALLET_SUSPENSION'],
  reports: ['WALLET_BALANCES_DAILY', 'INACTIVE_WALLETS']
};
