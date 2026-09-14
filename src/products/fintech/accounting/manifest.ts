import { Landmark } from 'lucide-react';

export const FAAP_MODULE_MANIFEST = {
  id: 'FT-MOD-FAAP-GL',
  name: 'JUMO FAAP (General Ledger)',
  description: 'Statutory accounting, hierarchical chart of accounts, and fiscal reporting.',
  icon: Landmark,
  category: 'Accounting',
  version: '1.0.0',
  status: 'ACTIVE',
  offices: [
    {
      id: 'OFFICE-CFO',
      name: 'Executive Finance Office',
      portal: 'PORTAL-FINANCE',
      workspaces: ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Trial Balance']
    }
  ],
  capabilities: [
    {
      id: 'CAP-FAAP-JOURNAL',
      name: 'Journal Management',
      actions: ['POST', 'REVERSE', 'APPROVE'],
      workflow: 'JOURNAL_POSTING_WORKFLOW'
    },
    {
      id: 'CAP-FAAP-COA',
      name: 'Chart of Accounts',
      actions: ['CREATE', 'EDIT', 'DEACTIVATE'],
    }
  ]
};
