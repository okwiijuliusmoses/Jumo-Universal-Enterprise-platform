export const FAM_MERCHANT_SERVICES_Manifest = {
  id: 'FAM_MERCHANT_SERVICES',
  name: 'Merchant Services',
  version: '1.0.0',
  description: 'Merchant acquiring, POS integration, QR payments, and settlement management.',
  status: 'PARTIALLY_IMPLEMENTED',
  dependencies: ['FAM_LEDGER'],
  capabilities: ['CAP_MERCH_01'],
  apis: ['/api/v1/merchants/onboard', '/api/v1/merchants/settle'],
  workflows: ['MERCHANT_ONBOARDING', 'PAYMENT_ACQUIRING', 'SETTLEMENT_SPLIT'],
  reports: ['MERCHANT_VOLUME_REPORT']
};
