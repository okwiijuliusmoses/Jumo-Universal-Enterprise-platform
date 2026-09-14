/**
 * JUMO UEOS — Sovereign Digital Pay Contract Layer
 * Defines the public contract through which sovereign products (Church, Fintech, School ERPs)
 * dispatch multi-rail payment transactions and settle via automated clearing sweeps.
 */

import { digitalPayOrchestrator } from "../digitalPay/digitalPayOrchestrator";
import { 
  SovereignPayCode, 
  UniversalPaymentRequest, 
  PaymentSwitchReceipt, 
  SettlementReconciliationBatch 
} from "../digitalPay/digitalPayTypes";

export interface IDigitalPayServiceContract {
  // Sovereign PayCodes
  registerPayCode(codeData: SovereignPayCode): SovereignPayCode;
  resolvePayCode(payCode: string): SovereignPayCode | undefined;
  getAllPayCodes(): SovereignPayCode[];

  // Payment Switching
  processPayment(request: UniversalPaymentRequest): PaymentSwitchReceipt;
  getReceipts(): PaymentSwitchReceipt[];

  // Settlement Reconciliation
  runSettlementReconciliation(): SettlementReconciliationBatch;
}

class DigitalPayServiceContractImpl implements IDigitalPayServiceContract {
  registerPayCode(codeData: SovereignPayCode): SovereignPayCode {
    return digitalPayOrchestrator.registerPayCode(codeData);
  }

  resolvePayCode(payCode: string): SovereignPayCode | undefined {
    return digitalPayOrchestrator.resolvePayCode(payCode);
  }

  getAllPayCodes(): SovereignPayCode[] {
    return digitalPayOrchestrator.getAllPayCodes();
  }

  processPayment(request: UniversalPaymentRequest): PaymentSwitchReceipt {
    return digitalPayOrchestrator.processPayment(request);
  }

  getReceipts(): PaymentSwitchReceipt[] {
    return digitalPayOrchestrator.getReceipts();
  }

  runSettlementReconciliation(): SettlementReconciliationBatch {
    return digitalPayOrchestrator.runSettlementReconciliation();
  }
}

export const digitalPayContract = new DigitalPayServiceContractImpl();
export const digitalPayClient = digitalPayContract;
