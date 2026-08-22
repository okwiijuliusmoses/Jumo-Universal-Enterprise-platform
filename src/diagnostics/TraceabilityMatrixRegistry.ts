
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
    jumoComponent: 'General Ledger Engine',
    benchmarkSource: 'QuickBooks Enterprise / SAP FICO',
    sourceCapabilities: ['Double-Entry Persistence', '5-Digit COA Hierarchy', '$0.00 Parity Guard', 'Universal Journal Table'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'FAAP',
    jumoComponent: 'Cash & Bank Management',
    benchmarkSource: 'Xero Cashbook',
    sourceCapabilities: ['Triple-Column Cashbook', 'Bank Feed Matching', 'Contra Entries', 'Liquidity Monitoring'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Education ERP',
    jumoComponent: 'Bursar Office',
    benchmarkSource: 'SchoolPay / Flywire',
    sourceCapabilities: ['Tuition Invoicing', 'PRN Collections', 'Fees Ledger', 'Vote Book Commitment'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Education ERP',
    jumoComponent: 'Registrar & DOS',
    benchmarkSource: 'PowerSchool / Infinite Campus',
    sourceCapabilities: ['National LIN Registry', 'Academic Assessments', 'UCE/UACE Center Admin', 'PLE Candidate Index'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Fintech',
    jumoComponent: 'Digital Pay Switch',
    benchmarkSource: 'Stripe / Interswitch',
    sourceCapabilities: ['QR Merchant Acquiring', 'MoMo Gateway', '1.5% Settlement Protocol', 'KYC Compliance'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Fintech',
    jumoComponent: 'SACCO Financial Core',
    benchmarkSource: 'Mifos X / Musoni',
    sourceCapabilities: ['Member Savings Ledger', 'Loan Appraisal Workflow', 'Shares Management', 'Disbursement Approval'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Church ERP',
    jumoComponent: 'Ecclesiastical Chancery',
    benchmarkSource: 'Planning Center Online / Servant Keeper',
    sourceCapabilities: ['Canonical Registers', 'Diocesan Synod Decrees', 'Clergy Postings', 'Tithe Stewardship Ledger'],
    jumoStatus: 'VERIFIED'
  },
  {
    jumoModule: 'Alumni ERP',
    jumoComponent: 'Advancement Office',
    benchmarkSource: 'Blackbaud Raisers Edge',
    sourceCapabilities: ['Graduate Census', 'Endowment Campaigns', 'Mentorship Matching', 'Chapter Governance'],
    jumoStatus: 'VERIFIED'
  }
];
