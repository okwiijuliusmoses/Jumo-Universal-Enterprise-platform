import { CreditCard } from 'lucide-react';

export const DIGITAL_PAY_MANIFEST = {
  id: 'FT-MOD-DIGI-PAY',
  name: 'JUMO Digital Pay Switch',
  description: 'Enterprise payment routing, MoMo collections, and B2C disbursement gateway.',
  icon: CreditCard,
  category: 'Payments',
  version: '1.0.0',
  status: 'ACTIVE',
  offices: [
    {
      id: 'OFFICE-PAYMENTS',
      name: 'Payments Operations Office',
      portal: 'PORTAL-PAYMENTS',
      workspaces: ['Switch Terminal', 'Merchant Ops', 'Settlement', 'Reconciliation']
    }
  ],
  capabilities: [
    {
      id: 'CAP-DPAY-SWITCH',
      name: 'Transaction Switching',
      actions: ['INITIATE', 'VERIFY', 'REFUND'],
      workflow: 'PAYMENT_LIFECYCLE'
    },
    {
      id: 'CAP-DPAY-CODES',
      name: 'Payment Code Management',
      actions: ['ISSUE', 'EXPIRE'],
    }
  ]
};
