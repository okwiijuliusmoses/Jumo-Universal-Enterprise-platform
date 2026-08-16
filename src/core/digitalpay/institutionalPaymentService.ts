/**
 * JUMO DIGITAL PAY
 * School & Institutional Payments Engine
 *
 * Supports:
 * - School fees
 * - Institutional invoices
 * - Student/member billing
 * - Recurring institutional charges
 * - Automatic service-fee deductions
 * - Partial payments
 * - Payment allocation
 * - Institutional settlement
 *
 * Confidential internal platform/tenant/institution
 * identifiers are never exposed through public
 * payment responses.
 */

export type InstitutionalType =
  | "SCHOOL"
  | "UNIVERSITY"
  | "COLLEGE"
  | "TVET"
  | "HEALTH"
  | "GOVERNMENT"
  | "CORPORATE"
  | "OTHER";

export type InvoiceStatus =
  | "OPEN"
  | "PARTIALLY_PAID"
  | "PAID"
  | "CANCELLED"
  | "OVERDUE";

export type PaymentAllocationStatus =
  | "PENDING"
  | "ALLOCATED"
  | "PARTIALLY_ALLOCATED"
  | "FAILED";

export interface InstitutionProfile {
  institutionId: string;

  /**
   * Public-facing institutional payment code.
   */
  institutionCode: string;

  name: string;

  type: InstitutionalType;

  currency: string;

  settlementAccount: string;

  status: "ACTIVE" | "SUSPENDED";

  createdAt: string;
}

export interface InstitutionalInvoice {
  invoiceId: string;

  institutionId: string;

  /**
   * Public invoice reference.
   */
  invoiceReference: string;

  payerReference: string;

  description: string;

  totalAmount: number;

  paidAmount: number;

  outstandingAmount: number;

  currency: string;

  status: InvoiceStatus;

  dueDate?: string;

  createdAt: string;
}

export interface InstitutionalPayment {
  paymentId: string;

  institutionId: string;

  invoiceId: string;

  publicReference: string;

  payerReference: string;

  grossAmount: number;

  serviceFee: number;

  netAmount: number;

  currency: string;

  allocationStatus:
    PaymentAllocationStatus;

  createdAt: string;
}

export interface RecurringInstitutionalCharge {
  chargeId: string;

  institutionId: string;

  payerReference: string;

  description: string;

  amount: number;

  currency: string;

  frequency:
    | "WEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "ANNUAL";

  nextDueDate: string;

  enabled: boolean;

  createdAt: string;
}

class InstitutionalPaymentService {
  private readonly institutions =
    new Map<string, InstitutionProfile>();

  private readonly invoices =
    new Map<string, InstitutionalInvoice>();

  private readonly payments =
    new Map<string, InstitutionalPayment>();

  private readonly recurringCharges =
    new Map<
      string,
      RecurringInstitutionalCharge
    >();

  /**
   * Register an institution.
   */
  registerInstitution(
    institution: InstitutionProfile
  ): InstitutionProfile {
    if (
      !institution.institutionCode.trim()
    ) {
      throw new Error(
        "Digital Pay: institution code is required"
      );
    }

    if (
      institution.status !== "ACTIVE"
    ) {
      throw new Error(
        "Digital Pay: institution must be active"
      );
    }

    this.institutions.set(
      institution.institutionId,
      institution
    );

    return institution;
  }

  /**
   * Create an institutional invoice.
   */
  createInvoice(
    institutionId: string,
    request: {
      invoiceReference: string;
      payerReference: string;
      description: string;
      amount: number;
      currency: string;
      dueDate?: string;
    }
  ): InstitutionalInvoice {
    const institution =
      this.institutions.get(
        institutionId
      );

    if (!institution) {
      throw new Error(
        "Digital Pay: institution not found"
      );
    }

    if (
      institution.status !== "ACTIVE"
    ) {
      throw new Error(
        "Digital Pay: institution is suspended"
      );
    }

    if (request.amount <= 0) {
      throw new Error(
        "Digital Pay: invoice amount must be positive"
      );
    }

    if (
      request.currency !==
      institution.currency
    ) {
      throw new Error(
        "Digital Pay: invoice currency mismatch"
      );
    }

    const invoice: InstitutionalInvoice = {
      invoiceId:
        `INV_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2, 9)
          .toUpperCase()}`,

      institutionId,

      invoiceReference:
        request.invoiceReference,

      payerReference:
        request.payerReference,

      description:
        request.description,

      totalAmount:
        request.amount,

      paidAmount:
        0,

      outstandingAmount:
        request.amount,

      currency:
        request.currency,

      status:
        "OPEN",

      dueDate:
        request.dueDate,

      createdAt:
        new Date().toISOString(),
    };

    this.invoices.set(
      invoice.invoiceId,
      invoice
    );

    return invoice;
  }

  /**
   * Apply a payment to an institutional invoice.
   *
   * Service fee is deducted from the payment before
   * institutional settlement.
   */
  payInvoice(
    invoiceId: string,
    request: {
      publicReference: string;
      payerReference: string;
      amount: number;
      serviceFee?: number;
      currency: string;
    }
  ): InstitutionalPayment {
    const invoice =
      this.invoices.get(
        invoiceId
      );

    if (!invoice) {
      throw new Error(
        "Digital Pay: invoice not found"
      );
    }

    if (
      invoice.status ===
      "CANCELLED"
    ) {
      throw new Error(
        "Digital Pay: invoice is cancelled"
      );
    }

    if (request.amount <= 0) {
      throw new Error(
        "Digital Pay: payment amount must be positive"
      );
    }

    if (
      request.currency !==
      invoice.currency
    ) {
      throw new Error(
        "Digital Pay: payment currency mismatch"
      );
    }

    if (
      request.payerReference !==
      invoice.payerReference
    ) {
      throw new Error(
        "Digital Pay: payer reference does not match invoice"
      );
    }

    const serviceFee =
      Number(
        Math.max(
          request.serviceFee ?? 0,
          0
        ).toFixed(2)
      );

    const netAmount =
      Number(
        Math.max(
          request.amount -
            serviceFee,
          0
        ).toFixed(2)
      );

    const appliedAmount =
      Math.min(
        netAmount,
        invoice.outstandingAmount
      );

    invoice.paidAmount =
      Number(
        (
          invoice.paidAmount +
          appliedAmount
        ).toFixed(2)
      );

    invoice.outstandingAmount =
      Number(
        (
          invoice.totalAmount -
          invoice.paidAmount
        ).toFixed(2)
      );

    if (
      invoice.outstandingAmount <=
      0
    ) {
      invoice.status = "PAID";
    } else {
      invoice.status =
        "PARTIALLY_PAID";
    }

    const allocationStatus =
      appliedAmount === netAmount
        ? "ALLOCATED"
        : "PARTIALLY_ALLOCATED";

    const payment: InstitutionalPayment = {
      paymentId:
        `IPAY_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2, 9)
          .toUpperCase()}`,

      institutionId:
        invoice.institutionId,

      invoiceId,

      publicReference:
        request.publicReference,

      payerReference:
        request.payerReference,

      grossAmount:
        request.amount,

      serviceFee,

      netAmount:
        appliedAmount,

      currency:
        request.currency,

      allocationStatus,

      createdAt:
        new Date().toISOString(),
    };

    this.payments.set(
      payment.paymentId,
      payment
    );

    return payment;
  }

  /**
   * Register an automatic recurring institutional charge.
   */
  createRecurringCharge(
    charge: RecurringInstitutionalCharge
  ): RecurringInstitutionalCharge {
    if (charge.amount <= 0) {
      throw new Error(
        "Digital Pay: recurring charge must be positive"
      );
    }

    if (
      !this.institutions.has(
        charge.institutionId
      )
    ) {
      throw new Error(
        "Digital Pay: institution not found"
      );
    }

    this.recurringCharges.set(
      charge.chargeId,
      charge
    );

    return charge;
  }

  /**
   * Enable or disable an automatic charge.
   */
  setRecurringChargeStatus(
    chargeId: string,
    enabled: boolean
  ) {
    const charge =
      this.recurringCharges.get(
        chargeId
      );

    if (!charge) {
      return null;
    }

    charge.enabled = enabled;

    return charge;
  }

  /**
   * Find invoices belonging to a payer.
   */
  getPayerInvoices(
    payerReference: string
  ): InstitutionalInvoice[] {
    return Array.from(
      this.invoices.values()
    ).filter(
      invoice =>
        invoice.payerReference ===
        payerReference
    );
  }

  /**
   * Safe public institution information.
   */
  getPublicInstitution(
    institutionId: string
  ) {
    const institution =
      this.institutions.get(
        institutionId
      );

    if (!institution) {
      return null;
    }

    return {
      institutionCode:
        institution.institutionCode,

      name:
        institution.name,

      type:
        institution.type,

      currency:
        institution.currency,

      status:
        institution.status,
    };
  }

  /**
   * Runtime statistics.
   */
  getSummary() {
    const invoices =
      Array.from(
        this.invoices.values()
      );

    const payments =
      Array.from(
        this.payments.values()
      );

    return {
      institutions:
        this.institutions.size,

      invoices:
        invoices.length,

      payments:
        payments.length,

      invoiced:
        invoices.reduce(
          (sum, item) =>
            sum + item.totalAmount,
          0
        ),

      collected:
        invoices.reduce(
          (sum, item) =>
            sum + item.paidAmount,
          0
        ),

      outstanding:
        invoices.reduce(
          (sum, item) =>
            sum +
            item.outstandingAmount,
          0
        ),

      serviceFees:
        payments.reduce(
          (sum, item) =>
            sum + item.serviceFee,
          0
        ),

      recurringCharges:
        this.recurringCharges.size,
    };
  }
}

export const institutionalPaymentService =
  new InstitutionalPaymentService();

export default institutionalPaymentService;
