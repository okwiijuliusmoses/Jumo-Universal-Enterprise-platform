import { PaymentState, PaymentStateMachine } from './PaymentStateMachine';

export interface InstitutionAccount {
  id: string;
  name: string;
  code: string;
  bankAccount: string;
  bankName: string;
  activeCodeRange: string;
}

export interface PaymentObligation {
  code: string; // 6-digit shortcode e.g. 884192
  studentName: string;
  studentLin: string;
  institutionName: string;
  tuitionUGX: number;
  boardingUGX: number;
  otherUGX: number;
  totalDueUGX: number;
  status: 'UNPAID' | 'PARTIAL' | 'CLEARED';
}

export interface SchoolPayTx {
  id: string;
  transactionRef: string; // e.g. SP-TX-99821
  paymentCode: string;
  studentName: string;
  institutionName: string;
  amountUGX: number;
  feeUGX: number; // 0.5% gateway fee
  netSettlementUGX: number;
  rail: 'MTN_MOMO' | 'AIRTEL_MONEY' | 'MSENTE' | 'VISA_CARD' | 'AGENT_BANKING';
  phoneNumber: string;
  payerName: string;
  state: PaymentState;
  timestamp: string;
  receiptNumber: string;
}

export interface EscrowBatch {
  id: string;
  batchRef: string;
  institutionName: string;
  bankName: string;
  bankAccountNo: string;
  grossAmountUGX: number;
  feesUGX: number;
  netPayoutUGX: number;
  transactionCount: number;
  status: 'PENDING' | 'RELEASED_TO_BANK';
  generatedAt: string;
}

export interface SWalletAccount {
  studentLin: string;
  studentName: string;
  walletBalanceUGX: number;
  dailyCapUGX: number;
  todaySpentUGX: number;
  transactions: { id: string; item: string; amountUGX: number; timestamp: string }[];
}

export interface APIKey {
  id: string;
  key: string;
  ownerRole: string;
  scope: string;
  createdDate: string;
}

export class SPDatabase {
  static listeners: (() => void)[] = [];

  static subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  static notify() {
    this.listeners.forEach(l => l());
  }

  static institutions: InstitutionAccount[] = [
    {
      id: 'INST-001',
      name: 'Alpha Academy Secondary School',
      code: 'AA-884',
      bankAccount: '903001882910',
      bankName: 'Stanbic Bank Uganda',
      activeCodeRange: '884100 - 884999'
    },
    {
      id: 'INST-002',
      name: 'Kampala Model Secondary School',
      code: 'KM-772',
      bankAccount: '1029384756',
      bankName: 'Centenary Bank',
      activeCodeRange: '772100 - 772999'
    }
  ];

  static obligations: { [code: string]: PaymentObligation } = {
    '884192': {
      code: '884192',
      studentName: 'John Doe',
      studentLin: 'LIN-2026-001',
      institutionName: 'Alpha Academy Secondary School',
      tuitionUGX: 1200000,
      boardingUGX: 300000,
      otherUGX: 100000,
      totalDueUGX: 1600000,
      status: 'UNPAID'
    },
    '884193': {
      code: '884193',
      studentName: 'Sarah Namubiru',
      studentLin: 'LIN-2026-002',
      institutionName: 'Alpha Academy Secondary School',
      tuitionUGX: 1400000,
      boardingUGX: 0,
      otherUGX: 50000,
      totalDueUGX: 1450000,
      status: 'CLEARED'
    }
  };

  static transactions: SchoolPayTx[] = [
    {
      id: 'TX-001',
      transactionRef: 'SP-TX-88901',
      paymentCode: '884193',
      studentName: 'Sarah Namubiru',
      institutionName: 'Alpha Academy Secondary School',
      amountUGX: 1450000,
      feeUGX: 7250,
      netSettlementUGX: 1442750,
      rail: 'MTN_MOMO',
      phoneNumber: '+256772110022',
      payerName: 'Joseph Namubiru',
      state: 'SETTLED' as PaymentState,
      timestamp: '2026-02-12 09:15',
      receiptNumber: 'SP-RCP-88901'
    }
  ];

  static escrowBatches: EscrowBatch[] = [
    {
      id: 'BATCH-001',
      batchRef: 'STL-2026-001',
      institutionName: 'Alpha Academy Secondary School',
      bankName: 'Stanbic Bank Uganda',
      bankAccountNo: '903001882910',
      grossAmountUGX: 1450000,
      feesUGX: 7250,
      netPayoutUGX: 1442750,
      transactionCount: 1,
      status: 'RELEASED_TO_BANK',
      generatedAt: '2026-02-12 18:00'
    }
  ];

  static wallets: { [lin: string]: SWalletAccount } = {
    'LIN-2026-001': {
      studentLin: 'LIN-2026-001',
      studentName: 'John Doe',
      walletBalanceUGX: 45000,
      dailyCapUGX: 10000,
      todaySpentUGX: 3500,
      transactions: [
        { id: 'SW-101', item: 'Canteen Lunch Snack', amountUGX: 3500, timestamp: '2026-02-12 12:30' }
      ]
    }
  };

  static apiKeys: APIKey[] = [
    { id: 'KEY-001', key: 'sp_live_998210384710', ownerRole: 'MERCHANT_BURSAR', scope: 'COLLECTIONS_READ_WRITE', createdDate: '2026-01-01' }
  ];

  static webhooks = [
    { id: 'WH-001', url: 'https://alpha.ac.ug/api/schoolpay/webhook', status: 'ACTIVE', events: ['PAYMENT_SETTLED', 'SETTLED_BATCH_RELEASED'] }
  ];

  // Business Logic Methods
  static resolveCode(code: string): PaymentObligation | null {
    return this.obligations[code] || null;
  }

  static executeCheckout(
    paymentCode: string,
    amountUGX: number,
    rail: 'MTN_MOMO' | 'AIRTEL_MONEY' | 'MSENTE' | 'VISA_CARD' | 'AGENT_BANKING',
    phoneNumber: string,
    payerName: string
  ): SchoolPayTx {
    const obl = this.obligations[paymentCode];
    const feeUGX = Math.round(amountUGX * 0.005); // 0.5% gateway fee
    const netSettlementUGX = amountUGX - feeUGX;
    const txId = `SP-TX-${Math.floor(10000 + Math.random() * 90000)}`;

    const newTx: SchoolPayTx = {
      id: `TX-${Date.now()}`,
      transactionRef: txId,
      paymentCode,
      studentName: obl ? obl.studentName : 'Student (' + paymentCode + ')',
      institutionName: obl ? obl.institutionName : 'Alpha Academy',
      amountUGX,
      feeUGX,
      netSettlementUGX,
      rail,
      phoneNumber,
      payerName,
      state: 'PENDING',
      timestamp: new Date().toLocaleString(),
      receiptNumber: `SP-RCP-${Math.floor(10000 + Math.random() * 90000)}`
    };

    this.transactions.unshift(newTx);

    // Transition state machine through phases
    const sm = new PaymentStateMachine(newTx.state);
    
    setTimeout(() => {
      if (sm.transitionTo('AUTHORIZED')) {
        newTx.state = sm.getState();
        this.notify();
      }
    }, 1000);

    setTimeout(() => {
      if (sm.transitionTo('CAPTURED')) {
        newTx.state = sm.getState();
        this.notify();
      }
    }, 2000);

    setTimeout(() => {
      if (sm.transitionTo('SETTLED')) {
        newTx.state = sm.getState();
        if (obl) {
          obl.totalDueUGX = Math.max(0, obl.totalDueUGX - amountUGX);
          obl.status = obl.totalDueUGX === 0 ? 'CLEARED' : 'PARTIAL';
        }
        this.notify();
      }
    }, 3000);

    this.notify();
    return newTx;
  }

  static createEscrowBatch(institutionName: string): EscrowBatch | null {
    const unbatched = this.transactions.filter(t => t.state === 'SETTLED');
    if (unbatched.length === 0) return null;

    const gross = unbatched.reduce((sum, t) => sum + t.amountUGX, 0);
    const fees = unbatched.reduce((sum, t) => sum + t.feeUGX, 0);
    const net = gross - fees;

    const batch: EscrowBatch = {
      id: `BATCH-${Date.now()}`,
      batchRef: `STL-2026-${Math.floor(100 + Math.random() * 900)}`,
      institutionName,
      bankName: 'Stanbic Bank Uganda',
      bankAccountNo: '903001882910',
      grossAmountUGX: gross,
      feesUGX: fees,
      netPayoutUGX: net,
      transactionCount: unbatched.length,
      status: 'PENDING',
      generatedAt: new Date().toLocaleString()
    };

    this.escrowBatches.unshift(batch);
    this.notify();
    return batch;
  }

  static releaseEscrowBatch(batchId: string) {
    const batch = this.escrowBatches.find(b => b.id === batchId);
    if (!batch) return;
    batch.status = 'RELEASED_TO_BANK';
    this.notify();
  }

  static depositSWallet(lin: string, amountUGX: number) {
    let w = this.wallets[lin];
    if (!w) {
      w = {
        studentLin: lin,
        studentName: 'Student ' + lin,
        walletBalanceUGX: 0,
        dailyCapUGX: 10000,
        todaySpentUGX: 0,
        transactions: []
      };
      this.wallets[lin] = w;
    }
    w.walletBalanceUGX += amountUGX;
    w.transactions.unshift({
      id: `SW-${Date.now()}`,
      item: 'Guardian Wallet Deposit',
      amountUGX,
      timestamp: new Date().toLocaleString()
    });
    this.notify();
  }

  static generateAPIKey(scope: string) {
    const newKey: APIKey = {
      id: `KEY-${Date.now()}`,
      key: `sp_live_${Math.random().toString(36).substring(2, 15)}`,
      ownerRole: 'MERCHANT_OPERATOR',
      scope,
      createdDate: new Date().toISOString().split('T')[0]
    };
    this.apiKeys.push(newKey);
    this.notify();
  }
}
