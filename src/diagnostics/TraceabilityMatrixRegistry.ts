
export interface TraceabilityEntry {
  jumoModule: string;
  jumoComponent: string;
  benchmarkSource: string;
  sourceCapabilities: string[];
  jumoStatus: 'VERIFIED' | 'IMPLEMENTATION' | 'MAPPED';
}

export const TraceabilityMatrixRegistry: TraceabilityEntry[] = [
  {
    jumoModule: 'FAAP',
    jumoComponent: 'General Ledger',
    benchmarkSource: 'QuickBooks Enterprise / SAP FICO',
    sourceCapabilities: ['Double-Entry Accounting', 'Chart of Accounts', 'Journal Entries', 'Trial Balance'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Education ERP',
    jumoComponent: 'Fees Management',
    benchmarkSource: 'SchoolPay / Flywire',
    sourceCapabilities: ['Invoicing', 'Payment Tracking', 'Instalment Billing'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Fintech',
    jumoComponent: 'Payment Switch',
    benchmarkSource: 'Stripe / Interswitch',
    sourceCapabilities: ['Card Acquiring', 'MoMo Switching', 'Settlement Clearing'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Church ERP',
    jumoComponent: 'Membership Tracking',
    benchmarkSource: 'Planning Center Online',
    sourceCapabilities: ['Directory', 'Groups', 'Attendance'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Fintech',
    jumoComponent: 'Microfinance',
    benchmarkSource: 'Mifos X / Musoni',
    sourceCapabilities: ['JLG Lending', 'Loan Lifecycle', 'Repayment Scheduling'],
    jumoStatus: 'VERIFIED'
  }
];
