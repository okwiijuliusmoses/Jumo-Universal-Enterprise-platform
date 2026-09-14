// ============================================================================
// PHASE 4: STATELESS USSD EDGE ORCHESTRATION ENGINE
// ============================================================================

import { JUMODBEngine } from "./database/db";
import { ConfigEngine } from "./core/financial/ConfigEngine";

/**
 * Interface representing the cellular carrier USSD payload.
 */
export interface AfricaTalkingUssdRequest {
  sessionId: string;
  phoneNumber: string;
  networkCode: string;
  serviceCode: string; // Shortcode (e.g. *270*1#)
  text: string;        // Formatted input string (e.g. "1*MEM-10042*50000")
  tenantId?: string;   // Tenant mapped to the incoming shortcode
}

/**
 * StatelessUssdController coordinates low-bandwidth telco edge interactions,
 * dynamically translating visual interfaces depending on B2B tenant verticals.
 */
export class StatelessUssdController {
  private db: JUMODBEngine;
  private config: ConfigEngine;

  constructor() {
    this.db = JUMODBEngine.getInstance();
    this.config = new ConfigEngine();
  }

  /**
   * Processes the incoming USSD request, parses state, and returns telco formatted responses.
   * 
   * @param request Input parameters from the cellular carrier
   * @returns Plain-text response starting with "CON " or "END "
   */
  public async handleUssdRequest(request: AfricaTalkingUssdRequest): Promise<string> {
    const { text, tenantId = "TENT-1", phoneNumber } = request;

    // 1. Fetch Tenant workspace details and dynamic config
    const tenants = this.db.select<any>("tenants", (t) => t.id === tenantId);
    if (tenants.length === 0) {
      return "END Connection Error: Invalid workspace code mapped to this USSD session.";
    }
    const tenant = tenants[0];
    const cfg = this.config.getConfig(tenantId);
    const terms = {
      partyTypeLabel: cfg.terminology.partyLabel,
      identifierLabel: cfg.terminology.idLabel,
      itemLabel: cfg.terminology.itemLabel,
      balanceLabel: "Outstanding Balance" // Can also be made dynamic via cfg.terminology
    };

    // 2. Parse stateless USSD input string (split by asterisk)
    const parts = text === "" ? [] : text.split("*");
    const step = parts.length;

    // Root Menu Screen
    if (step === 0) {
      return `CON ${tenant.name} Operating System\n` +
             `Choose service:\n` +
             `1. Check ${terms.balanceLabel}\n` +
             `2. Make payment toward ${terms.itemLabel}`;
    }

    const menuSelection = parts[0];

    // Branch 1: Check Dues/Balance
    if (menuSelection === "1") {
      if (step === 1) {
        return `CON Please enter your registered ${terms.identifierLabel}:`;
      }

      if (step === 2) {
        const partyIdentifier = parts[1].trim();

        // Query party matching identifier and tenant
        const parties = this.db.select<any>(
          "parties",
          (p) => p.tenant_id === tenantId && p.id === partyIdentifier
        );

        if (parties.length === 0) {
          return `END Error: Registration reference not found. Unrecognized ${terms.identifierLabel}.`;
        }

        const party = parties[0];

        // Fetch unpaid open items for the party
        const openItems = this.db.select<any>(
          "open_items",
          (oi) => oi.tenant_id === tenantId && oi.party_id === party.id && oi.status !== "PAID"
        );

        const totalUnpaid = openItems.reduce(
          (sum, oi) => sum + (oi.amount_minor - oi.allocated_amount_minor),
          0
        );

        const currency = openItems[0]?.currency || "UGX";
        const readableAmount = (totalUnpaid / 100).toFixed(2);

        // Fetch digital wallet floating balance
        const wallets = this.db.select<any>(
          "digital_wallets",
          (w) => w.tenant_id === tenantId && w.party_id === party.id
        );
        const walletBalance = wallets[0] ? (wallets[0].balance_minor / 100).toFixed(2) : "0.00";

        return `END ${terms.partyTypeLabel}: ${party.name}\n` +
               `Total ${terms.balanceLabel}: ${readableAmount} ${currency}\n` +
               `Advance Balance: ${walletBalance} ${currency}\n` +
               `Your account status is ${party.status}.`;
      }
    }

    // Branch 2: Push Mommy/Momo payment request
    if (menuSelection === "2") {
      if (step === 1) {
        return `CON Please enter your ${terms.identifierLabel}:`;
      }

      if (step === 2) {
        const partyIdentifier = parts[1].trim();

        const parties = this.db.select<any>(
          "parties",
          (p) => p.tenant_id === tenantId && p.id === partyIdentifier
        );

        if (parties.length === 0) {
          return `END Error: Registration reference not found. Unrecognized ${terms.identifierLabel}.`;
        }

        return `CON Enter payment amount for ${terms.itemLabel} (in minor units/cents):`;
      }

      if (step === 3) {
        const partyIdentifier = parts[1].trim();
        const rawAmount = parts[2].trim();
        const paymentAmountMinor = parseInt(rawAmount, 10);

        if (isNaN(paymentAmountMinor) || paymentAmountMinor <= 0) {
          return "END Error: Invalid currency amount. Value must be a positive integer.";
        }

        const parties = this.db.select<any>(
          "parties",
          (p) => p.tenant_id === tenantId && p.id === partyIdentifier
        );

        if (parties.length === 0) {
          return `END Error: Unrecognized ${terms.identifierLabel}. Session aborted.`;
        }

        const party = parties[0];
        const readableAmount = (paymentAmountMinor / 100).toFixed(2);

        // Simulate pushing Momocallback / USSD trigger hook
        return `END Payment request of ${readableAmount} UGX has been initiated for ${terms.partyTypeLabel} ${party.name}.\n` +
               `Please check your handset for the MOMO PIN prompt. Reference: USSD-${Date.now().toString().slice(-6)}`;
      }
    }

    return "END Input Error: Invalid USSD input option selected.";
  }
}
export default StatelessUssdController;
