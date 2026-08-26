/**
 * JUMO DIGITAL PAY
 * Canonical Digital Pay Module Export Surface
 *
 * Universal payment infrastructure for the JUMO ecosystem.
 *
 * Includes:
 * - Payment identity
 * - Payment transactions
 * - Domain payments
 * - Wallets
 * - Banking
 * - Lending
 * - Merchant payments
 * - Agent banking
 * - Institutional / school payments
 * - QR / code payments
 * - Automated fee deductions
 * - Payment routing
 * - Payment authorization
 * - Reconciliation
 * - Settlement
 * - FAAP integration
 * - Hybrid/offline synchronization
 * - Universal payment orchestration
 * - Digital Pay gateway/runtime
 */

export {
  paymentIdentityService,
} from "./paymentIdentityService";

export type {
  PaymentIdentityScope,
  PaymentIdentity,
  PublicPayeeIdentity,
} from "./paymentIdentityService";

export {
  paymentTransactionService,
} from "./paymentTransactionService";

export type {
  PaymentTransactionType,
  PaymentChannel,
  PaymentStatus,
  PaymentTransactionRequest,
  PaymentTransaction,
} from "./paymentTransactionService";

export {
  paymentDomainService,
} from "./paymentDomainService";

export type {
  DomainPaymentRequest,
  DomainPaymentResult,
} from "./paymentDomainService";

export {
  walletBankingLendingService,
} from "./walletBankingLendingService";

export type {
  WalletOperationRequest,
  LoanOperationRequest,
  BankingOperationRequest,
  DigitalPayOperationResult,
} from "./walletBankingLendingService";

export {
  walletAccountService,
} from "./walletAccountService";

export type {
  WalletAccountType,
  WalletAccount,
  WalletBalance,
  WalletMovement,
} from "./walletAccountService";

export {
  merchantAgentService,
} from "./merchantAgentService";

export type {
  MerchantStatus,
  AgentStatus,
  AgentOperation,
  MerchantTransactionType,
  SettlementState,
  MerchantProfile,
  AgentProfile,
  MerchantCollection,
  AgentTransaction,
} from "./merchantAgentService";

export {
  institutionalPaymentService,
} from "./institutionalPaymentService";

export type {
  InstitutionalType,
  InvoiceStatus,
  PaymentAllocationStatus,
  InstitutionProfile,
  InstitutionalInvoice,
  InstitutionalPayment,
  RecurringInstitutionalCharge,
} from "./institutionalPaymentService";

export {
  digitalPayService,
} from "./digitalPayService";

export type {
  ProductPaymentContext,
  CreatePaymentInput,
} from "./digitalPayService";

export {
  digitalPayUIAdapter,
} from "./digitalPayUIAdapter";

export type {
  UIPaymentContext,
  UIPaymentRequest,
} from "./digitalPayUIAdapter";

export {
  productPaymentProfileService,
} from "./productPaymentProfileService";

export type {
  DigitalPayProductType,
  DigitalPayProductProfile,
} from "./productPaymentProfileService";

export {
  paymentCapabilityRegistry,
} from "./paymentCapabilityRegistry";

export type {
  DigitalPayCapability,
  DigitalPayRail,
  ProductPaymentCapability,
} from "./paymentCapabilityRegistry";

export {
  paymentRoutingService,
} from "./paymentRoutingService";

export type {
  PaymentRoutingRequest,
  PaymentRoutingResult,
} from "./paymentRoutingService";

export {
  feePolicyService,
} from "./feePolicyService";

export type {
  FeeRuleType,
  FeeCategory,
  FeeRule,
  AutomatedDeductionRule,
  FeeCalculation,
} from "./feePolicyService";

export {
  feeDistributionService,
} from "./feeDistributionService";

export type {
  FeeRecipient,
  FeeDistribution,
} from "./feeDistributionService";

export {
  paymentAuthorizationService,
} from "./paymentAuthorizationService";

export type {
  PaymentActorRole,
  PaymentOperation,
  PaymentAuthorizationRequest,
  PaymentAuthorizationResult,
} from "./paymentAuthorizationService";

export {
  paymentLedgerBridge,
} from "./paymentLedgerBridge";

export type {
  PaymentTransferRequest,
  PaymentTransferResult,
} from "./paymentLedgerBridge";

export {
  paymentReconciliationService,
} from "./paymentReconciliationService";

export type {
  PaymentLifecycleStatus,
  PaymentRecord,
  ReconciliationEntry,
} from "./paymentReconciliationService";

export {
  reconciliationService,
} from "./reconciliationService";

export type {
  IdempotencyRecord,
  ReconciliationRecord,
  ReconciliationSummary,
} from "./reconciliationService";

export {
  hybridSyncService,
} from "./hybridSyncService";

export type {
  SyncState,
  HybridPaymentRecord,
  SyncSummary,
} from "./hybridSyncService";

export {
  settlementOrchestrator,
} from "./settlementOrchestrator";

export type {
  SettlementDestination,
  SettlementAllocation,
  FAAPSettlementPosting,
  SettlementResult,
} from "./settlementOrchestrator";

export {
  faapSettlementBridge,
} from "./faapSettlementBridge";

export type {
  FAAPSettlementStatus,
  FAAPSettlementEvent,
  SettlementSummary,
} from "./faapSettlementBridge";

export {
  digitalPayRuntime,
} from "./digitalPayRuntime";

export type {
  DigitalPayRuntimeContext,
  RuntimePaymentRequest,
  RuntimePaymentResult,
} from "./digitalPayRuntime";

export {
  digitalPayGateway,
} from "./digitalPayGateway";

export type {
  DigitalPayGatewayContext,
  GatewayPaymentRequest,
  GatewayPaymentResult,
} from "./digitalPayGateway";

export {
  universalPaymentOrchestrator,
} from "./universalPaymentOrchestrator";

export type {
  UniversalPaymentCommand,
  UniversalPaymentReceipt,
} from "./universalPaymentOrchestrator";

export {
  paymentOrchestrator,
} from "./paymentOrchestrator";

export type {
  UniversalPaymentRequest,
  UniversalPaymentResult,
} from "./paymentOrchestrator";
