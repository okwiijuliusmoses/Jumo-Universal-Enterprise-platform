export type SourceType = 'VERIFIED_JSC_EVIDENCE' | 'UGANDA_GOVERNMENT_BENCHMARK' | 'PREDICTIVE_SIMULATION';
export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';

export type Question = {
  id: number;
  mode: 'EVIDENCE' | 'PREDICTIVE';
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  audit: {
    topic: string;
    sourceType: SourceType;
    taxonomy: string;
    legalReference: string;
    confidence: Confidence;
    inclusionReason: string;
  };
};

export const BENCHMARK_QUESTIONS: Question[] = [
  {
    id: 1,
    mode: 'EVIDENCE',
    text: 'Under the Public Finance Management Act (PFMA) 2015, who holds personal accountability for the funds entrusted to a specific Judiciary department or court?',
    options: [
      'The Assistant Accountant processing the payments',
      'The designated Accounting Officer',
      'The Chief Justice',
      'The Internal Auditor'
    ],
    correctAnswer: 1,
    explanation: 'According to Section 45 of the PFMA 2015, an Accounting Officer is personally responsible and accountable for the funds and resources of a vote.',
    audit: {
      topic: 'Public Financial Management',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'PFMA 2015, Section 45',
      confidence: 'HIGH',
      inclusionReason: 'Fundamental knowledge required for any accounting cadre in the Uganda Public Service.'
    }
  },
  {
    id: 2,
    mode: 'EVIDENCE',
    text: 'Under International Public Sector Accounting Standards (IPSAS) cash basis, which the Government of Uganda utilizes for core reporting, when is a transaction recognized?',
    options: [
      'When the invoice is received from the supplier',
      'When the commitment is entered into the IFMIS',
      'When cash or its equivalent is received or paid',
      'When the economic benefit is consumed'
    ],
    correctAnswer: 2,
    explanation: 'Under the Cash Basis of Accounting (IPSAS), transactions and other events are recognized only when cash is received or paid.',
    audit: {
      topic: 'IPSAS Framework',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Public-sector accounting',
      legalReference: 'Cash Basis IPSAS Standard',
      confidence: 'HIGH',
      inclusionReason: 'Assistant Accountants must understand the basis of preparation for government financial statements.'
    }
  },
  {
    id: 3,
    mode: 'PREDICTIVE',
    text: 'An officer submits accountability for UGX 1,760,000 from a UGX 2,000,000 imprest. However, UGX 240,000 has no acceptable supporting documentation. What is the most appropriate action for the Assistant Accountant?',
    options: [
      'Accept the UGX 1,760,000 and write off the UGX 240,000 as miscellaneous expense.',
      'Reject the entire accountability until fully supported documents are provided for the whole amount.',
      'Accept accountability for UGX 1,760,000 and require the officer to immediately refund UGX 240,000 or provide valid receipts.',
      'Deduct the UGX 240,000 from the department\'s next quarterly budget allocation.'
    ],
    correctAnswer: 2,
    explanation: 'Accountability must be supported by valid documents. Unaccounted imprest must be recovered directly from the officer, either through immediate cash refund or payroll deduction, as per Treasury Instructions.',
    audit: {
      topic: 'Imprest Management',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Imprest/accountability scenario + Professional judgment',
      legalReference: 'Uganda Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Tests practical application of accountability rules rather than mere definition recall.'
    }
  },
  {
    id: 4,
    mode: 'PREDICTIVE',
    text: 'A supplier submits an invoice for UGX 5,000,000 for court stationery. The standard Withholding Tax (WHT) rate is 6%. Assuming the supplier is not WHT exempt, what is the net payment amount to be processed on the EFT?',
    options: [
      'UGX 5,000,000',
      'UGX 4,700,000',
      'UGX 5,300,000',
      'UGX 4,940,000'
    ],
    correctAnswer: 1,
    explanation: 'WHT calculation: 6% of 5,000,000 = 300,000. Net payment = 5,000,000 - 300,000 = 4,700,000.',
    audit: {
      topic: 'Taxation & Payments',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Numerical calculation + Payment-voucher scenario',
      legalReference: 'Income Tax Act (Uganda)',
      confidence: 'HIGH',
      inclusionReason: 'Assistant Accountants frequently process IFMIS payments and must accurately apply statutory deductions.'
    }
  },
  {
    id: 5,
    mode: 'PREDICTIVE',
    text: 'Before capturing a payment voucher into the Integrated Financial Management System (IFMIS), what is the most critical internal control verification required by the Assistant Accountant?',
    options: [
      'Verifying that the supplier\'s bank account is with a commercial bank.',
      'Ensuring the supplier has attached their company registration certificate to every invoice.',
      'Confirming the voucher is authorized by the designated vote controller and backed by an approved LPO/commitment.',
      'Calling the supplier to verbally verify the invoice amount.'
    ],
    correctAnswer: 2,
    explanation: 'The primary internal control in government expenditure is ensuring that payments are made against authorized commitments (LPOs) and signed off by the appropriate vote controller to prevent unbudgeted expenditure.',
    audit: {
      topic: 'Internal Controls',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Internal-control scenario',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Tests practical understanding of the procure-to-pay lifecycle in the Uganda Public Service.'
    }
  },
  {
    id: 6,
    mode: 'EVIDENCE',
    text: 'Under the Constitution of the Republic of Uganda and the PFMA 2015, all revenues or other money raised or received for the purpose of the Government must be paid into which account?',
    options: [
      'The Judiciary Operations Account',
      'The Consolidated Fund',
      'The Ministry of Finance Reserve Account',
      'The Bank of Uganda General Account'
    ],
    correctAnswer: 1,
    explanation: 'Article 153 of the Constitution and Section 4 of the PFMA 2015 establish the Consolidated Fund into which all Government revenues must be paid, unless specifically exempted by an Act of Parliament.',
    audit: {
      topic: 'Public Financial Management',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Constitution of Uganda (Art 153) & PFMA 2015',
      confidence: 'HIGH',
      inclusionReason: 'Fundamental principle of public finance in Uganda that all accountants must know.'
    }
  },
  {
    id: 7,
    mode: 'EVIDENCE',
    text: 'The Government of Uganda implemented the Treasury Single Account (TSA) framework. What is the primary accounting purpose of the TSA?',
    options: [
      'To allow individual courts to manage their own commercial bank accounts.',
      'To consolidate government cash resources, optimize liquidity, and minimize borrowing costs.',
      'To separate donor funds from government tax revenue.',
      'To replace the Integrated Financial Management System (IFMIS).'
    ],
    correctAnswer: 1,
    explanation: 'The TSA is a unified structure of government bank accounts that gives a consolidated view of government cash resources, reducing idle cash balances in multiple accounts and minimizing borrowing costs.',
    audit: {
      topic: 'Treasury Management',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Public-sector accounting',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'TSA operations are central to how government entities (including the Judiciary) process payments.'
    }
  },
  {
    id: 8,
    mode: 'PREDICTIVE',
    text: 'A magistrate court receives a cash bail deposit of UGX 1,500,000 from an accused person. How should the Assistant Accountant classify this transaction in the financial records?',
    options: [
      'As Government Non-Tax Revenue (NTR).',
      'As a liability (deposit), because the money is held in trust and is refundable upon conclusion of the case.',
      'As an appropriation in aid to supplement the court\'s operational budget.',
      'As a miscellaneous grant.'
    ],
    correctAnswer: 1,
    explanation: 'Cash bail is not government revenue. It is money held in trust (a deposit/liability) that must be refunded to the depositor if they comply with bail conditions, or forfeited to the state if they abscond.',
    audit: {
      topic: 'Judiciary Specific Accounting',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Accounting transaction + Judicial knowledge',
      legalReference: 'Judiciary Financial Management Guidelines',
      confidence: 'HIGH',
      inclusionReason: 'Bail and deposit management is a core, unique function of court accounting staff.'
    }
  },
  {
    id: 9,
    mode: 'PREDICTIVE',
    text: 'During a monthly bank reconciliation process, the Assistant Accountant identifies a cheque of UGX 800,000 issued to a supplier that does not appear on the bank statement. How is this item treated?',
    options: [
      'It is ignored until the supplier complains.',
      'It is added to the cash book balance.',
      'It is treated as an unpresented cheque and used as a reconciling item between the cash book and bank statement.',
      'It is immediately cancelled and a new cheque is issued.'
    ],
    correctAnswer: 2,
    explanation: 'Cheques issued but not yet cleared by the bank are "unpresented cheques." They are standard reconciling items and remain on the reconciliation statement until they clear or become stale (typically after 6 months).',
    audit: {
      topic: 'Bank Reconciliation',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Bank reconciliation scenario',
      legalReference: 'General Accounting Principles',
      confidence: 'HIGH',
      inclusionReason: 'Bank reconciliation is a primary duty for Assistant Accountants.'
    }
  },
  {
    id: 10,
    mode: 'PREDICTIVE',
    text: 'An officer submits accountability for a sensitization workshop. The attached receipts total UGX 3,500,000, but one receipt for UGX 500,000 for "venue hire" is a handwritten piece of paper with no TIN, no official stamp, and no date. What should the Assistant Accountant do?',
    options: [
      'Accept it because venue hire in rural areas often lacks formal receipts.',
      'Reject the UGX 500,000 receipt, treat it as unaccounted funds, and demand formal documentation or a cash refund.',
      'Process the accountability but verbally warn the officer not to do it again.',
      'Write a memo to the Chief Justice for approval.'
    ],
    correctAnswer: 1,
    explanation: 'Public funds require valid, verifiable documentation (e.g., TIN, date, official stamp/letterhead). Unofficial, unverifiable receipts must be rejected to prevent fraud, and the officer remains liable for the unsupported amount.',
    audit: {
      topic: 'Imprest & Accountability',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Error detection + Ethics',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Tests practical application of accountability standards and fraud prevention.'
    }
  },
  {
    id: 11,
    mode: 'EVIDENCE',
    text: 'Under the Public Finance Management Act 2015, who is responsible for appointing an Accounting Officer for a Government Vote such as the Judiciary?',
    options: [
      'The Chief Justice',
      'The Auditor General',
      'The Permanent Secretary / Secretary to the Treasury (PS/ST)',
      'The Chairperson of the Public Service Commission'
    ],
    correctAnswer: 2,
    explanation: 'Under Section 11(2)(g) of the PFMA 2015, the Permanent Secretary / Secretary to the Treasury appoints or designates Accounting Officers for votes and local governments.',
    audit: {
      topic: 'Public Financial Management',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'PFMA 2015, Section 11',
      confidence: 'HIGH',
      inclusionReason: 'Understanding the chain of financial authority is a core requirement for government accountants.'
    }
  },
  {
    id: 12,
    mode: 'EVIDENCE',
    text: 'According to the PFMA 2015, what must happen to any unexpended balances of money appropriated to a Vote at the end of the financial year?',
    options: [
      'They are rolled over to the next financial year\'s budget.',
      'They are distributed as a bonus to the performing department.',
      'They must be repaid to the Consolidated Fund by the 31st of July.',
      'They are transferred to a commercial bank reserve account.'
    ],
    correctAnswer: 2,
    explanation: 'Section 17 of the PFMA 2015 mandates that every unexpended balance at the close of the financial year must be repaid to the Consolidated Fund by the 31st of July.',
    audit: {
      topic: 'Budget Management',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'PFMA 2015, Section 17',
      confidence: 'HIGH',
      inclusionReason: 'Year-end procedures and the treatment of unspent balances are critical accounting knowledge.'
    }
  },
  {
    id: 13,
    mode: 'EVIDENCE',
    text: 'In the context of Uganda\'s public financial management, who is responsible for issuing the Chart of Accounts used across all government entities?',
    options: [
      'The Auditor General',
      'The Accountant General',
      'The Uganda Revenue Authority',
      'The Judicial Service Commission'
    ],
    correctAnswer: 1,
    explanation: 'Under Section 45 of the PFMA, the Accountant General specifies the format of the accounts, including the issuance and maintenance of the standard Chart of Accounts used in IFMIS.',
    audit: {
      topic: 'Public Financial Management',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'PFMA 2015',
      confidence: 'HIGH',
      inclusionReason: 'Assistant Accountants must correctly map transactions to the Chart of Accounts.'
    }
  },
  {
    id: 14,
    mode: 'EVIDENCE',
    text: 'Which body is constitutionally mandated to audit and report on the public accounts of Uganda and of all public offices, including the Judiciary?',
    options: [
      'The Internal Auditor General',
      'The Inspectorate of Government (IGG)',
      'The Office of the Auditor General (OAG)',
      'The Public Accounts Committee (PAC)'
    ],
    correctAnswer: 2,
    explanation: 'Article 163 of the Constitution of Uganda mandates the Auditor General to audit and report on the public accounts of Uganda and of all public offices.',
    audit: {
      topic: 'Audit and Oversight',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Constitution of Uganda, Article 163',
      confidence: 'HIGH',
      inclusionReason: 'Accountants must know the external oversight body they are accountable to.'
    }
  },
  {
    id: 15,
    mode: 'PREDICTIVE',
    text: 'A Local Purchase Order (LPO) is generated in the IFMIS. What is the primary financial implication of an approved LPO before the goods are delivered?',
    options: [
      'It triggers an immediate cash transfer to the supplier.',
      'It creates a Commitment that reserves funds in the budget, preventing overspending.',
      'It is recorded as an actual expense in the income statement.',
      'It has no financial implication until the invoice is received.'
    ],
    correctAnswer: 1,
    explanation: 'An LPO creates a "Commitment" in IFMIS. This encumbers or reserves the funds against the budget line to ensure that when the invoice arrives, funds are available to pay it.',
    audit: {
      topic: 'IFMIS & Commitment Control',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Budget-control scenario',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Understanding commitment control is the foundation of preventing arrears in government.'
    }
  },
  {
    id: 16,
    mode: 'PREDICTIVE',
    text: 'An Assistant Accountant receives an invoice that does not have an attached Goods Received Note (GRN) or completion certificate. What is the correct course of action?',
    options: [
      'Process the payment if the supplier is well-known to the department.',
      'Halt processing and request the user department to provide the GRN or completion certificate.',
      'Sign the GRN on behalf of the storekeeper to expedite payment.',
      'Pay 50% of the invoice value as an advance.'
    ],
    correctAnswer: 1,
    explanation: 'A GRN or completion certificate is mandatory evidence that goods were delivered or services rendered as per the LPO before payment can be processed.',
    audit: {
      topic: 'Payment Processing',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Payment-voucher scenario',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Tests adherence to the standard Procure-to-Pay process and documentary evidence requirements.'
    }
  },
  {
    id: 17,
    mode: 'EVIDENCE',
    text: 'What is the lifespan of a standard commercial or government cheque in Uganda before it is considered "stale"?',
    options: [
      '3 months from the date of issue',
      '6 months from the date of issue',
      '12 months from the date of issue',
      'Until the end of the financial year'
    ],
    correctAnswer: 1,
    explanation: 'According to standard banking practice and Treasury Instructions in Uganda, a cheque becomes stale and invalid for payment 6 months after its date of issue.',
    audit: {
      topic: 'Treasury Management',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Bills of Exchange Act / Treasury Instructions',
      confidence: 'HIGH',
      inclusionReason: 'Assistant Accountants must verify the validity of cheques during reconciliation and issuance.'
    }
  },
  {
    id: 18,
    mode: 'EVIDENCE',
    text: 'Under the Income Tax Act of Uganda, what is the threshold amount above which a government entity must withhold 6% tax (WHT) on supplies of goods and services (assuming the supplier is not exempt)?',
    options: [
      'UGX 500,000',
      'UGX 1,000,000',
      'UGX 3,000,000',
      'There is no threshold; it applies to all amounts.'
    ],
    correctAnswer: 1,
    explanation: 'The Income Tax Act specifies that WHT at 6% applies to payments for goods and services exceeding UGX 1,000,000 in aggregate to a single supplier.',
    audit: {
      topic: 'Taxation',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Income Tax Act (Uganda)',
      confidence: 'HIGH',
      inclusionReason: 'WHT application is a daily task for processing payments.'
    }
  },
  {
    id: 19,
    mode: 'EVIDENCE',
    text: 'What is the standard rate of Value Added Tax (VAT) in Uganda?',
    options: [
      '15%',
      '16%',
      '18%',
      '20%'
    ],
    correctAnswer: 2,
    explanation: 'The standard rate of VAT in Uganda is 18%, as governed by the Value Added Tax Act.',
    audit: {
      topic: 'Taxation',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Value Added Tax Act (Uganda)',
      confidence: 'HIGH',
      inclusionReason: 'Essential for validating supplier invoices and tax computations.'
    }
  },
  {
    id: 20,
    mode: 'EVIDENCE',
    text: 'Employers must remit Pay As You Earn (PAYE) tax deductions to the Uganda Revenue Authority (URA) by what date?',
    options: [
      'The last day of the current month',
      'The 15th day of the following month',
      'The 30th day of the following month',
      'Quarterly'
    ],
    correctAnswer: 1,
    explanation: 'PAYE returns and payments must be submitted to URA by the 15th day of the month following the month in which the deductions were made.',
    audit: {
      topic: 'Payroll & Taxation',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Income Tax Act (Uganda)',
      confidence: 'HIGH',
      inclusionReason: 'Payroll compliance and statutory deadlines are critical competencies.'
    }
  },
  {
    id: 21,
    mode: 'PREDICTIVE',
    text: 'A supplier invoice is stated as UGX 1,180,000 (VAT inclusive). If the VAT rate is 18%, what is the exclusive cost of the goods?',
    options: [
      'UGX 967,600',
      'UGX 1,000,000',
      'UGX 1,180,000',
      'UGX 1,080,000'
    ],
    correctAnswer: 1,
    explanation: 'To find the exclusive amount: Inclusive Amount / 1.18. Therefore, 1,180,000 / 1.18 = 1,000,000.',
    audit: {
      topic: 'Taxation Mathematics',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Numerical calculation',
      legalReference: 'Accounting Principles',
      confidence: 'HIGH',
      inclusionReason: 'Accountants must frequently extract base amounts from VAT inclusive invoices.'
    }
  },
  {
    id: 22,
    mode: 'PREDICTIVE',
    text: 'When preparing a bank reconciliation statement, a direct deposit (lodgement) made by a debtor directly into the bank but not yet recorded in the cash book should be:',
    options: [
      'Deducted from the bank statement balance.',
      'Added to the bank statement balance.',
      'Added to the cash book balance.',
      'Ignored until the next financial period.'
    ],
    correctAnswer: 2,
    explanation: 'A direct lodgement increases the actual bank balance but is unknown to the business. To reconcile, it must be added to the cash book balance to update the entity\'s records.',
    audit: {
      topic: 'Bank Reconciliation',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Accounting transaction',
      legalReference: 'General Accounting Principles',
      confidence: 'HIGH',
      inclusionReason: 'Standard accounting procedure tested in almost all accounting aptitude tests.'
    }
  },
  {
    id: 23,
    mode: 'PREDICTIVE',
    text: 'Which type of accounting error occurs when a transaction is completely omitted from the books of original entry?',
    options: [
      'Error of commission',
      'Error of principle',
      'Error of omission',
      'Compensating error'
    ],
    correctAnswer: 2,
    explanation: 'An error of omission occurs when a transaction is entirely missed and not recorded anywhere in the accounting system. It will not cause the trial balance to fail to balance.',
    audit: {
      topic: 'Accounting Principles',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'General Accounting Principles',
      confidence: 'HIGH',
      inclusionReason: 'Core accounting theory often tested in written assessments.'
    }
  },
  {
    id: 24,
    mode: 'PREDICTIVE',
    text: 'If a Trial Balance does not agree, the temporary difference is placed in which account while the accountant investigates the errors?',
    options: [
      'The Control Account',
      'The Suspense Account',
      'The Capital Account',
      'The Retained Earnings Account'
    ],
    correctAnswer: 1,
    explanation: 'A suspense account is a temporary account used to force a trial balance to balance until the errors causing the discrepancy are found and corrected.',
    audit: {
      topic: 'Accounting Principles',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'General Accounting Principles',
      confidence: 'HIGH',
      inclusionReason: 'Tests understanding of error correction methodologies.'
    }
  },
  {
    id: 25,
    mode: 'PREDICTIVE',
    text: 'The Judiciary purchases a new vehicle for UGX 150,000,000. It has an estimated useful life of 5 years and a residual value of UGX 10,000,000. Using the straight-line method, what is the annual depreciation expense?',
    options: [
      'UGX 30,000,000',
      'UGX 28,000,000',
      'UGX 25,000,000',
      'UGX 32,000,000'
    ],
    correctAnswer: 1,
    explanation: 'Straight-line depreciation = (Cost - Residual Value) / Useful Life. (150,000,000 - 10,000,000) / 5 = 140,000,000 / 5 = 28,000,000.',
    audit: {
      topic: 'Asset Management',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Numerical calculation',
      legalReference: 'IPSAS 17',
      confidence: 'HIGH',
      inclusionReason: 'Standard calculation for fixed asset management.'
    }
  },
  {
    id: 26,
    mode: 'EVIDENCE',
    text: 'According to the Uganda Public Service Standing Orders, what are the official normal working hours for a public officer (excluding health/shift workers) from Monday to Friday?',
    options: [
      '8:00 a.m. to 4:00 p.m.',
      '8:00 a.m. to 5:00 p.m.',
      '8:30 a.m. to 5:30 p.m.',
      '9:00 a.m. to 5:00 p.m.'
    ],
    correctAnswer: 1,
    explanation: 'Section A-n of the Uganda Public Service Standing Orders stipulates that normal working hours are 8:00 a.m. to 12:45 p.m. and 2:00 p.m. to 5:00 p.m. (Totaling 8:00 a.m. to 5:00 p.m. with a lunch break).',
    audit: {
      topic: 'Public Service Regulations',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Uganda Public Service Standing Orders',
      confidence: 'HIGH',
      inclusionReason: 'Basic operational knowledge required for all public officers.'
    }
  },
  {
    id: 27,
    mode: 'EVIDENCE',
    text: 'How many working days of annual leave is a confirmed public officer entitled to in Uganda per calendar year?',
    options: [
      '21 days',
      '24 days',
      '30 days',
      '36 days'
    ],
    correctAnswer: 2,
    explanation: 'Under the Public Service Standing Orders, a public officer is entitled to 30 working days of annual leave per calendar year.',
    audit: {
      topic: 'Public Service Regulations',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Uganda Public Service Standing Orders',
      confidence: 'HIGH',
      inclusionReason: 'HR/Payroll interface requires knowledge of leave entitlements.'
    }
  },
  {
    id: 28,
    mode: 'PREDICTIVE',
    text: 'An Assistant Accountant is processing a payment to a company owned by their spouse. According to the Leadership Code Act and ethical guidelines, what MUST the accountant do?',
    options: [
      'Process the payment quietly if the invoice is completely valid and accurate.',
      'Declare the conflict of interest in writing and recuse themselves from processing the transaction.',
      'Process the payment but delay it to avoid looking biased.',
      'Ask a colleague to sign the voucher in their name.'
    ],
    correctAnswer: 1,
    explanation: 'Public officers must formally declare conflicts of interest and remove themselves from the decision-making or processing loop involving connected persons to maintain integrity.',
    audit: {
      topic: 'Ethics & Integrity',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Ethics',
      legalReference: 'Leadership Code Act / Anti-Corruption Act',
      confidence: 'HIGH',
      inclusionReason: 'Ethics and anti-corruption are major themes in Ugandan public service recruitment.'
    }
  },
  {
    id: 29,
    mode: 'EVIDENCE',
    text: 'Which committee of the Parliament of Uganda is primarily responsible for examining the audited accounts showing the appropriation of the sums granted by Parliament to meet public expenditure?',
    options: [
      'The Budget Committee',
      'The Public Accounts Committee (PAC)',
      'The Legal and Parliamentary Affairs Committee',
      'The Finance Committee'
    ],
    correctAnswer: 1,
    explanation: 'The Public Accounts Committee (PAC) examines the audited accounts of central government entities (like the Judiciary) to ensure accountability of appropriated funds.',
    audit: {
      topic: 'Audit and Oversight',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Rules of Procedure of the Parliament of Uganda',
      confidence: 'HIGH',
      inclusionReason: 'Accountants prepare responses to Audit Queries which are eventually reviewed by PAC.'
    }
  },
  {
    id: 30,
    mode: 'EVIDENCE',
    text: 'In the Judiciary, who is the overall administrative head and Accounting Officer (assuming delegation by PS/ST)?',
    options: [
      'The Chief Justice',
      'The Principal Judge',
      'The Secretary to the Judiciary',
      'The Chief Registrar'
    ],
    correctAnswer: 2,
    explanation: 'Following the Administration of the Judiciary Act 2020, the Secretary to the Judiciary is the Accounting Officer and administrative head responsible for finance and administration.',
    audit: {
      topic: 'Judiciary Structure',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Judicial/public-service knowledge',
      legalReference: 'Administration of the Judiciary Act 2020',
      confidence: 'HIGH',
      inclusionReason: 'Specific knowledge of the employing agency\'s leadership and financial structure.'
    }
  },
  {
    id: 31,
    mode: 'PREDICTIVE',
    text: 'A budget line for "Travel Inland" has an annual allocation of UGX 50,000,000. So far, UGX 15,000,000 has been spent, and there are approved un-invoiced commitments (LPOs) worth UGX 10,000,000. What is the available free balance?',
    options: [
      'UGX 35,000,000',
      'UGX 25,000,000',
      'UGX 10,000,000',
      'UGX 40,000,000'
    ],
    correctAnswer: 1,
    explanation: 'Available Balance = Budget - (Actual Expenditure + Commitments). 50m - (15m + 10m) = 50m - 25m = 25m.',
    audit: {
      topic: 'Budget Management',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Numerical calculation + Budget-control scenario',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Tests understanding of the difference between actuals and commitments in IFMIS.'
    }
  },
  {
    id: 32,
    mode: 'PREDICTIVE',
    text: 'A supplier is supposed to receive a net payment of UGX 940,000 after a 6% WHT deduction. What was the gross amount of the invoice before the tax was deducted?',
    options: [
      'UGX 996,400',
      'UGX 1,000,000',
      'UGX 1,060,000',
      'UGX 946,000'
    ],
    correctAnswer: 1,
    explanation: 'Net = Gross * (1 - Tax Rate). 940,000 = Gross * 0.94. Gross = 940,000 / 0.94 = 1,000,000.',
    audit: {
      topic: 'Taxation Mathematics',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Numerical calculation',
      legalReference: 'Income Tax Act',
      confidence: 'HIGH',
      inclusionReason: 'Grossing up is a necessary mathematical skill for accountants dealing with net-pay agreements.'
    }
  },
  {
    id: 33,
    mode: 'PREDICTIVE',
    text: 'An officer whose gross monthly salary is UGX 3,000,000 is employed starting from the 21st day of a 30-day month. Calculating on a pro-rata basis, what is their gross pay for that first month?',
    options: [
      'UGX 1,000,000',
      'UGX 1,500,000',
      'UGX 900,000',
      'UGX 3,000,000'
    ],
    correctAnswer: 0,
    explanation: 'The officer worked for 10 days (from 21st to 30th inclusive). Pro-rata pay = (10 / 30) * 3,000,000 = 1,000,000.',
    audit: {
      topic: 'Payroll Management',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Numerical calculation',
      legalReference: 'Public Service Standing Orders',
      confidence: 'HIGH',
      inclusionReason: 'Tests fundamental payroll proration calculations.'
    }
  },
  {
    id: 34,
    mode: 'PREDICTIVE',
    text: 'Which of the following is a primary advantage of using Electronic Funds Transfer (EFT) over issuing physical cheques in the public sector?',
    options: [
      'EFTs do not require any internal authorization signatures.',
      'EFTs reduce the risk of loss, theft, and forgery while ensuring faster settlement.',
      'EFTs bypass the Integrated Financial Management System.',
      'EFTs do not require the supplier to have a bank account.'
    ],
    correctAnswer: 1,
    explanation: 'EFTs are secure, fast, and deposit directly into the beneficiary\'s account, drastically reducing the fraud, theft, and bouncing issues associated with physical cheques.',
    audit: {
      topic: 'Payment Systems',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'EFT is the mandated mode of payment for Uganda Government entities.'
    }
  },
  {
    id: 35,
    mode: 'PREDICTIVE',
    text: 'While processing a stack of invoices, you notice an invoice from a supplier for printer toners with the exact same invoice number and date as one processed and paid two months ago. What is the appropriate action?',
    options: [
      'Process it; the IFMIS will automatically block it if it is a duplicate.',
      'Change the invoice number slightly (e.g., add an "A") so the system accepts it.',
      'Reject the invoice, halt processing, and report the attempted duplicate billing to the supervisor.',
      'Pay it but deduct it from the next month\'s delivery.'
    ],
    correctAnswer: 2,
    explanation: 'Duplicate invoicing is a common vector for fraud or error. The accountant must halt processing and report it for investigation, never altering documents to bypass controls.',
    audit: {
      topic: 'Fraud Detection & Internal Controls',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Error detection + Ethics',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Tests vigilance and adherence to anti-fraud protocols.'
    }
  },
  {
    id: 36,
    mode: 'EVIDENCE',
    text: 'In the context of Uganda payroll, what does the statutory deduction acronym "LST" stand for?',
    options: [
      'Local Service Tax',
      'Life Savings Trust',
      'Levy on State Transactions',
      'Local Social Tariff'
    ],
    correctAnswer: 0,
    explanation: 'LST stands for Local Service Tax, which is levied on wealth and incomes of persons in gainful employment to fund local government services.',
    audit: {
      topic: 'Payroll & Taxation',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Local Governments Act',
      confidence: 'HIGH',
      inclusionReason: 'LST is a standard statutory payroll deduction in Uganda.'
    }
  },
  {
    id: 37,
    mode: 'EVIDENCE',
    text: 'The Inspectorate of Government (IGG) enforces the Leadership Code Act. Who among the following is REQUIRED to declare their income, assets, and liabilities to the IGG?',
    options: [
      'Only the Chief Justice and Judges.',
      'Specified public officers, including Accounting Officers and accountants handling public funds.',
      'Only politicians and Members of Parliament.',
      'Every citizen of Uganda.'
    ],
    correctAnswer: 1,
    explanation: 'The Leadership Code Act requires specified leaders and public officers (including accountants, procurement officers, and administrators) to declare their wealth to prevent illicit enrichment.',
    audit: {
      topic: 'Ethics & Governance',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Public-service ethics',
      legalReference: 'Leadership Code Act',
      confidence: 'HIGH',
      inclusionReason: 'Accountants fall under the schedule of officers required to declare assets.'
    }
  },
  {
    id: 38,
    mode: 'EVIDENCE',
    text: 'According to the Public Procurement and Disposal of Public Assets (PPDA) Act, which entity is responsible for awarding contracts within a Procuring and Disposing Entity (PDE) like the Judiciary?',
    options: [
      'The Procurement and Disposal Unit (PDU)',
      'The Contracts Committee',
      'The Accounting Officer alone',
      'The Evaluation Committee'
    ],
    correctAnswer: 1,
    explanation: 'The Contracts Committee is the organ within the PDE vested with the authority to adjudicate and award contracts, while the PDU manages the secretariat/process.',
    audit: {
      topic: 'Procurement (PPDA)',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'PPDA Act',
      confidence: 'HIGH',
      inclusionReason: 'Accountants must ensure payment vouchers possess valid Contracts Committee award minutes for high-value procurements.'
    }
  },
  {
    id: 39,
    mode: 'PREDICTIVE',
    text: 'Which of the following documents is used to record small, everyday cash expenditures in an office?',
    options: [
      'The General Ledger',
      'The Petty Cash Voucher',
      'The Bank Reconciliation Statement',
      'The Purchase Order'
    ],
    correctAnswer: 1,
    explanation: 'A petty cash voucher is used to document disbursements from the petty cash float for minor, day-to-day expenses.',
    audit: {
      topic: 'Basic Accounting Records',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'General Accounting Principles',
      confidence: 'HIGH',
      inclusionReason: 'Managing office petty cash is a frequent task for junior accounting staff.'
    }
  },
  {
    id: 40,
    mode: 'PREDICTIVE',
    text: 'If the total debits equal the total credits in a Trial Balance, it guarantees that:',
    options: [
      'No errors of any kind were made.',
      'All transactions were classified in the correct accounts.',
      'The mathematical (arithmetic) accuracy of the ledger accounts is correct.',
      'There is no fraud in the organization.'
    ],
    correctAnswer: 2,
    explanation: 'An agreeing trial balance only proves arithmetic accuracy. It does not detect errors of omission, principle, commission, or compensating errors.',
    audit: {
      topic: 'Accounting Principles',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'General Accounting Principles',
      confidence: 'HIGH',
      inclusionReason: 'Fundamental accounting theory.'
    }
  },
  {
    id: 41,
    mode: 'EVIDENCE',
    text: 'Under IPSAS, what is the definition of a "Liability"?',
    options: [
      'A resource controlled by the entity as a result of past events.',
      'A present obligation of the entity arising from past events, the settlement of which is expected to result in an outflow of resources.',
      'The residual interest in the assets of the entity after deducting all its obligations.',
      'Money owed to the entity by its debtors.'
    ],
    correctAnswer: 1,
    explanation: 'A liability is a present obligation arising from past events that will lead to an outflow of economic benefits (e.g., accounts payable, loans).',
    audit: {
      topic: 'IPSAS Framework',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Public-sector accounting',
      legalReference: 'IPSAS 1',
      confidence: 'HIGH',
      inclusionReason: 'Standard definition testing required for IPSAS compliance.'
    }
  },
  {
    id: 42,
    mode: 'PREDICTIVE',
    text: 'A physical cash count in the Judiciary cash office reveals UGX 4,800,000 in the safe. However, the cash book shows a balance of UGX 5,000,000. No unrecorded vouchers are found. What is the immediate required action?',
    options: [
      'Alter the cash book to UGX 4,800,000 to match the physical cash.',
      'Record a UGX 200,000 cash shortage, report it to the Accounting Officer, and initiate an investigation.',
      'Borrow UGX 200,000 from personal funds to balance the safe.',
      'Ignore it if the amount is considered immaterial.'
    ],
    correctAnswer: 1,
    explanation: 'Any unexplained cash shortage must be formally recorded, reported to management/internal audit, and investigated. Altering records or mixing personal funds is strictly prohibited.',
    audit: {
      topic: 'Cash Management & Fraud',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Internal-control scenario',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Tests practical handling of cash discrepancies and ethical conduct.'
    }
  },
  {
    id: 43,
    mode: 'EVIDENCE',
    text: 'Which principle ensures that a single individual does not have full control over all phases of a financial transaction (e.g., initiating, approving, and paying)?',
    options: [
      'The Matching Principle',
      'Segregation of Duties',
      'The Going Concern Concept',
      'Substance over Form'
    ],
    correctAnswer: 1,
    explanation: 'Segregation of duties is a fundamental internal control designed to prevent error and fraud by ensuring different people handle different parts of a transaction.',
    audit: {
      topic: 'Internal Controls',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Treasury Instructions 2014',
      confidence: 'HIGH',
      inclusionReason: 'Core concept in public finance architecture.'
    }
  },
  {
    id: 44,
    mode: 'PREDICTIVE',
    text: 'If ALL judicial officers must declare their wealth, and SOME accountants work as judicial officers, which of the following is logically certain?',
    options: [
      'All accountants must declare their wealth.',
      'Some accountants must declare their wealth.',
      'No accountants must declare their wealth.',
      'Judicial officers are also accountants.'
    ],
    correctAnswer: 1,
    explanation: 'Because the subset of accountants who are also judicial officers MUST declare their wealth, it is logically certain that "some accountants" declare their wealth.',
    audit: {
      topic: 'Logical Reasoning',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Logical reasoning',
      legalReference: 'Standard Aptitude Logic',
      confidence: 'HIGH',
      inclusionReason: 'Aptitude tests frequently include formal syllogistic reasoning.'
    }
  },
  {
    id: 45,
    mode: 'PREDICTIVE',
    text: 'Calculate the Net Pay: Gross Salary UGX 1,500,000. NSSF (Employee 5%) = UGX 75,000. PAYE = UGX 300,000. LST = UGX 10,000. Salary Advance Recovery = UGX 100,000.',
    options: [
      'UGX 1,015,000',
      'UGX 1,125,000',
      'UGX 1,000,000',
      'UGX 1,500,000'
    ],
    correctAnswer: 0,
    explanation: 'Net Pay = Gross - (NSSF + PAYE + LST + Advance). Net = 1,500,000 - (75,000 + 300,000 + 10,000 + 100,000) = 1,500,000 - 485,000 = 1,015,000.',
    audit: {
      topic: 'Payroll Mathematics',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Numerical calculation',
      legalReference: 'General Payroll Principles',
      confidence: 'HIGH',
      inclusionReason: 'Tests ability to process basic payroll arithmetic accurately.'
    }
  },
  {
    id: 46,
    mode: 'EVIDENCE',
    text: 'Under the Uganda Public Service Standing Orders, if a public officer is absent from duty without permission for a continuous period of how many days, are they deemed to have absconded?',
    options: [
      '7 days',
      '14 days',
      '21 days',
      '30 days'
    ],
    correctAnswer: 1,
    explanation: 'An officer who is absent without permission for a continuous period of 14 days is deemed to have absconded from duty and is liable to be removed from the payroll.',
    audit: {
      topic: 'Public Service Regulations',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'Uganda Public Service Standing Orders',
      confidence: 'HIGH',
      inclusionReason: 'Accountants must know when to stop salary processing for absconding staff.'
    }
  },
  {
    id: 47,
    mode: 'PREDICTIVE',
    text: 'In standard double-entry bookkeeping, an increase in an asset account is recorded as a:',
    options: [
      'Credit',
      'Debit',
      'Liability',
      'Revenue'
    ],
    correctAnswer: 1,
    explanation: 'Assets and Expenses increase with a Debit. Liabilities, Equity, and Revenue increase with a Credit.',
    audit: {
      topic: 'Accounting Principles',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'General Accounting Principles',
      confidence: 'HIGH',
      inclusionReason: 'Foundational accounting knowledge.'
    }
  },
  {
    id: 48,
    mode: 'EVIDENCE',
    text: 'In the Government of Uganda, what does the acronym "IFMIS" stand for?',
    options: [
      'Internal Financial Management and Information System',
      'Integrated Financial Management Information System',
      'International Funds Management and Investment System',
      'Integrated Fiscal Monitoring and Intelligence System'
    ],
    correctAnswer: 1,
    explanation: 'IFMIS stands for Integrated Financial Management Information System, the ERP used by the Government of Uganda for budget execution and accounting.',
    audit: {
      topic: 'Government Systems',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Knowledge/Recall',
      legalReference: 'MoFPED Guidelines',
      confidence: 'HIGH',
      inclusionReason: 'IFMIS is the primary working tool for a government Assistant Accountant.'
    }
  },
  {
    id: 49,
    mode: 'PREDICTIVE',
    text: 'A supplier delivers 50 reams of paper at UGX 20,000 each. However, the LPO was issued for 40 reams at UGX 20,000 each. The user department desperately needs the extra 10 reams. What should the accountant do?',
    options: [
      'Pay for the 50 reams because the user department needs them.',
      'Pay only for the 40 reams authorized on the LPO, and advise the supplier that the extra 10 reams require a new procurement process.',
      'Pay for 40 reams now and pay for 10 out of petty cash.',
      'Alter the original LPO in the system to read 50 reams.'
    ],
    correctAnswer: 1,
    explanation: 'Payments cannot exceed the committed amount on the LPO. Any additional supply constitutes unauthorized procurement and must follow formal channels before payment.',
    audit: {
      topic: 'Procurement & Payment',
      sourceType: 'PREDICTIVE_SIMULATION',
      taxonomy: 'Internal-control scenario',
      legalReference: 'Treasury Instructions 2014 & PPDA',
      confidence: 'HIGH',
      inclusionReason: 'Tests adherence to procurement ceilings and commitment control.'
    }
  },
  {
    id: 50,
    mode: 'EVIDENCE',
    text: 'Which arm of Government in Uganda is responsible for the interpretation of the law and the administration of justice?',
    options: [
      'The Executive',
      'The Legislature (Parliament)',
      'The Judiciary',
      'The Directorate of Public Prosecutions (DPP)'
    ],
    correctAnswer: 2,
    explanation: 'The Judiciary is the third arm of government, mandated by the Constitution to interpret the law and administer justice.',
    audit: {
      topic: 'Judiciary Structure',
      sourceType: 'UGANDA_GOVERNMENT_BENCHMARK',
      taxonomy: 'Judicial/public-service knowledge',
      legalReference: 'Constitution of Uganda',
      confidence: 'HIGH',
      inclusionReason: 'Basic civic knowledge of the employing agency.'
    }
  }
];
