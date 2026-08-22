/**
 * JUMO DIGITAL PAY — Sovereign Business Logic Service
 * Provides centralized dynamic state and persistence for PRNs, payment references,
 * real collections, settlement split payouts, and operational transactions.
 */

import { 
  DigitalPayReference, 
  DigitalPayTransaction, 
  DigitalPaySettlementBatch,
  DigitalPayReconciliationQuery
} from './types';
import { JrmService } from '../../../services/jrm/JrmService';
import { FaapService } from '../../faap/domain/FaapService';

export class DigitalPayService {

  public getPlatformMetrics(): any { return {}; }
  public getMerchants(): any[] { return []; }


  private static instance: DigitalPayService;
  private jrm = JrmService.getInstance();
  private faap = FaapService.getInstance();

  private references: DigitalPayReference[] = [
    { id: '1', reference: 'REF-99283-X', payerId: 'P001', payerName: 'John Mukasa', merchantCode: 'ALPHA', totalAmount: 1200000, balanceDue: 0, expiryDate: '2026-12-31', status: 'PAID' },
    { id: '2', reference: 'REF-11022-Y', payerId: 'P002', payerName: 'Sarah Alupo', merchantCode: 'ALPHA', totalAmount: 1200000, balanceDue: 1200000, expiryDate: '2026-12-31', status: 'ACTIVE' },
    { id: '3', reference: 'REF-88091-Z', payerId: 'P003', payerName: 'Robert Kibirige', merchantCode: 'IUIU', totalAmount: 1800000, balanceDue: 1800000, expiryDate: '2026-12-31', status: 'ACTIVE' },
  ];

  private transactions: DigitalPayTransaction[] = [
    { id: 't1', transactionRef: 'TX-99102', reference: 'REF-99283-X', amount: 1200000, channel: 'MOBILE_MONEY', paymentDate: '2026-03-01', status: 'SUCCESS' }
  ];

  private batches: DigitalPaySettlementBatch[] = [
    { id: 'b1', batchRef: 'BATCH-2026-001', collectionDate: '2026-03-01', totalGross: 1200000, commissionAmount: 18000, netSettlement: 1182000, status: 'SETTLED' }
  ];

  private reconciliations: DigitalPayReconciliationQuery[] = [
    { id: 'r1', transactionId: 'TX-99102', issueType: 'DUPLICATE_CALLBACK', severity: 'MEDIUM', status: 'RESOLVED' }
  ];

  private constructor() {}

  public static getInstance(): DigitalPayService {
    if (!DigitalPayService.instance) {
      DigitalPayService.instance = new DigitalPayService();
    }
    return DigitalPayService.instance;
  }

  getReferences() { return this.references; }

  createReference(ref: Omit<DigitalPayReference, 'id' | 'status'>) {
    if (this.references.some(r => r.reference === ref.reference)) {
      throw new Error(`Reference ${ref.reference} already exists.`);
    }
    const newRef: DigitalPayReference = {
      ...ref,
      id: `ref_${Math.random().toString(36).substr(2, 9)}`,
      status: 'ACTIVE'
    };
    this.references.push(newRef);
    return newRef;
  }

  resolveReference(refCode: string) {
    return this.references.find(p => p.reference === refCode);
  }

  getTransactions() { return this.transactions; }

  getBatches() { return this.batches; }

  getReconciliations() { return this.reconciliations; }

  /**
   * Process a collection, calculate settlement fee, record in FAAP general ledger in real-time
   */
  processCollection(tx: Omit<DigitalPayTransaction, 'id' | 'status' | 'transactionRef'>) {
    const reference = this.resolveReference(tx.reference);
    if (!reference) throw new Error('Invalid Reference Code: Resolution Failed');
    
    if (reference.status === 'PAID') {
      throw new Error('This reference is already fully paid.');
    }

    const grossAmount = tx.amount;
    const jumoFee = Math.round(grossAmount * 0.015); // 1.5% JUMO Fee
    const netSettlement = grossAmount - jumoFee;

    const newTx: DigitalPayTransaction = {
      ...tx,
      id: `dp_tx_${Math.random().toString(36).substr(2, 9)}`,
      transactionRef: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'SUCCESS',
      metadata: {
        gross_amount: grossAmount,
        jumo_settlement_fee: jumoFee,
        net_settlement: netSettlement,
        clearing_rate: '1.5%'
      }
    };
    
    this.transactions.push(newTx);

    // Update reference state
    reference.balanceDue = Math.max(0, reference.balanceDue - grossAmount);
    if (reference.balanceDue <= 0) {
      reference.status = 'PAID';
    }

    // Record in JRM
    this.jrm.recordInteraction({
      entityId: reference.payerId,
      sourceProduct: 'DIGITAL_PAY',
      interactionType: 'TRANSACTION',
      description: `Payment of UGX ${grossAmount.toLocaleString()} processed via ${tx.channel}. Fee allocated: UGX ${jumoFee.toLocaleString()}`
    });

    // Integrated Ledger Postings in FAAP
    // 1. Record the whole collection in Cash at Bank: Debit Bank Cash (1010), Credit Sales Revenue (4010)
    this.faap.postUniversalTransaction({
      sourceProduct: 'DIGITAL_PAY',
      memo: `Digital Pay Collection: Reference ${tx.reference} (${reference.payerName})`,
      debitAccount: '1010', // Bank Cash
      creditAccount: '4010', // Revenue
      amount: grossAmount
    });

    // 2. Record the JUMO Clearing Fee: Debit Rent/Clearing Expense (6010), Credit Cash at Bank (1010)
    this.faap.postUniversalTransaction({
      sourceProduct: 'DIGITAL_PAY',
      memo: `JUMO Settlement Switch 1.5% Fee: Reference ${tx.reference}`,
      debitAccount: '6010', // Operating Expense
      creditAccount: '1010', // Bank Cash
      amount: jumoFee
    });

    return newTx;
  }

  /**
   * Close and clear a daily batch
   */
  closeDailyBatch() {
    // Find all successful transactions not already in a batch
    const batchedRefs = new Set(this.batches.map(b => b.batchRef));
    const activeTx = this.transactions.filter(t => t.status === 'SUCCESS');

    if (activeTx.length === 0) {
      throw new Error('No pending collections found to close batch.');
    }

    const totalGross = activeTx.reduce((sum, t) => sum + t.amount, 0);
    const commission = Math.round(totalGross * 0.015);
    const net = totalGross - commission;

    const newBatch: DigitalPaySettlementBatch = {
      id: `bt_${Math.random().toString(36).substr(2, 9)}`,
      batchRef: `BATCH-2026-${(this.batches.length + 1).toString().padStart(3, '0')}`,
      collectionDate: new Date().toISOString().split('T')[0],
      totalGross,
      commissionAmount: commission,
      netSettlement: net,
      status: 'SETTLED'
    };

    this.batches.unshift(newBatch);
    return newBatch;
  }

  /**
   * Create Reconciliation Query
   */
  createReconciliationQuery(query: Omit<DigitalPayReconciliationQuery, 'id' | 'status'>) {
    const newQuery: DigitalPayReconciliationQuery = {
      ...query,
      id: `rec_${Math.random().toString(36).substr(2, 9)}`,
      status: 'OPEN'
    };
    this.reconciliations.unshift(newQuery);
    return newQuery;
  }

  /**
   * Resolve Reconciliation Query
   */
  resolveReconciliationQuery(queryId: string) {
    const query = this.reconciliations.find(r => r.id === queryId);
    if (query) {
      query.status = 'RESOLVED';
    }
    return query;
  }
}
