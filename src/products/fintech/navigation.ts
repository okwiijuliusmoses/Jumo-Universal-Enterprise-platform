export interface NavigationItem {
  id: string;
  label: string;
  code: string;
  iconName: string;
  portalId: string;
  moduleId: string;
}

export const FINTECH_NAVIGATION: NavigationItem[] = [
  { id: 'nav-members', label: 'Member / Customer Accounts', code: 'FT-MOD-MEMBER-ACCOUNTS', iconName: 'Users', portalId: 'FT-PORTAL-CUSTOMER-OPS', moduleId: 'FT-MOD-MEMBER-ACCOUNTS' },
  { id: 'nav-savings', label: 'Savings & Fixed Deposit Vault', code: 'FT-MOD-SAVINGS-DEPOSITS', iconName: 'DollarSign', portalId: 'FT-PORTAL-CUSTOMER-OPS', moduleId: 'FT-MOD-SAVINGS-DEPOSITS' },
  { id: 'nav-loans', label: 'Microfinance Loans & Credit Scoring', code: 'FT-MOD-LOAN-CREDIT', iconName: 'Briefcase', portalId: 'FT-PORTAL-MICROFINANCE', moduleId: 'FT-MOD-LOAN-CREDIT' },
  { id: 'nav-paycode', label: 'Digital Pay PayCode Collections', code: 'FT-MOD-DIGITAL-PAY-COLLECTIONS', iconName: 'CreditCard', portalId: 'FT-PORTAL-PAYMENT-SWITCH', moduleId: 'FT-MOD-DIGITAL-PAY-COLLECTIONS' },
  { id: 'nav-faap-gl', label: 'FAAP General Ledger & Journals', code: 'FT-MOD-FAAP-GL-JOURNALS', iconName: 'Landmark', portalId: 'FT-PORTAL-FINANCIAL-ACCOUNTING', moduleId: 'FT-MOD-FAAP-GL-JOURNALS' },
  { id: 'nav-treasury', label: 'Treasury & Liquidity Management', code: 'FT-MOD-TREASURY-LIQUIDITY', iconName: 'Building2', portalId: 'FT-PORTAL-FINANCIAL-ACCOUNTING', moduleId: 'FT-MOD-TREASURY-LIQUIDITY' },
  { id: 'nav-risk', label: 'Risk, Fraud & AML Monitoring', code: 'FT-MOD-RISK-COMPLIANCE', iconName: 'Shield', portalId: 'FT-PORTAL-FINANCIAL-ACCOUNTING', moduleId: 'FT-MOD-RISK-COMPLIANCE' },
  { id: 'nav-reports', label: 'Trial Balance & Financial Statements', code: 'FT-MOD-FINANCIAL-REPORTS', iconName: 'BarChart3', portalId: 'FT-PORTAL-FINANCIAL-ACCOUNTING', moduleId: 'FT-MOD-FINANCIAL-REPORTS' }
];
