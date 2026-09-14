import { db } from "../../database/db";

export interface UssdRequest {
  sessionId: string;
  phoneNumber: string;
  text: string;
  serviceCode: string;
}

export type UssdState = 
  | "START"
  | "WELCOME"
  | "RESOLVING_ROUTING_CODE"
  | "CONFIRMING_PAYEE"
  | "ENTERING_AMOUNT"
  | "CONFIRMING_PAYMENT"
  | "CHECK_WALLET_ENTER_ID"
  | "COMPLETED"
  | "FAILED";

export interface UssdSession {
  sessionId: string;
  phoneNumber: string;
  state: UssdState;
  routingCode?: string;
  partyId?: string;
  tenantId?: string;
  partyName?: string;
  amountMinor?: number;
  currency?: string;
  lastUpdatedAt: number;
}

export class UniversalUssdStateMachine {
  private static sessions: Map<string, UssdSession> = new Map();

  /**
   * Universal session lookup with automatic timeout eviction (e.g., 5 minutes)
   */
  private static getOrCreateSession(sessionId: string, phoneNumber: string): UssdSession {
    const now = Date.now();
    
    // Evict expired sessions
    for (const [sid, sess] of this.sessions.entries()) {
      if (now - sess.lastUpdatedAt > 5 * 60 * 1000) {
        this.sessions.delete(sid);
      }
    }

    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        phoneNumber,
        state: "START",
        lastUpdatedAt: now,
      };
      this.sessions.set(sessionId, session);
    } else {
      session.lastUpdatedAt = now;
    }
    return session;
  }

  /**
   * Processes a single incoming USSD packet and transitions session state.
   * Returns standard USSD response prefix: "CON " to continue, "END " to terminate.
   */
  public static handleRequest(req: UssdRequest): string {
    const { sessionId, phoneNumber, text } = req;
    const session = this.getOrCreateSession(sessionId, phoneNumber);

    // Split text by "*" to find user inputs in sequence (USSD convention)
    const inputs = text.split("*").map(s => s.trim()).filter(s => s.length > 0);
    const lastInput = inputs[inputs.length - 1] || "";

    // If text is empty or session just started, reset to welcome
    if (!text || text.length === 0 || session.state === "START") {
      session.state = "WELCOME";
      return "CON Welcome to Jumo Universal Pay\n1. Quick Pay (Routing Code)\n2. Check S-Wallet Balance\n3. Exit";
    }

    switch (session.state) {
      case "WELCOME":
        if (lastInput === "1") {
          session.state = "RESOLVING_ROUTING_CODE";
          return "CON Enter 10-Digit Payee Routing Code:";
        } else if (lastInput === "2") {
          session.state = "CHECK_WALLET_ENTER_ID";
          return "CON Enter Wallet Phone or Routing Code:";
        } else if (lastInput === "3") {
          this.sessions.delete(sessionId);
          return "END Thank you for using Jumo Universal Pay.";
        } else {
          return "CON Invalid Option.\nWelcome to Jumo Universal Pay\n1. Quick Pay (Routing Code)\n2. Check S-Wallet Balance\n3. Exit";
        }

      case "RESOLVING_ROUTING_CODE":
        if (!/^\d{10}$/.test(lastInput)) {
          this.sessions.delete(sessionId);
          return "END Invalid routing code format. Code must be exactly 10 digits.";
        }

        // Search across polymorphic parties table
        const parties = db.select<any>("parties", (p: any) => p.routingCode === lastInput && p.status === "ACTIVE");
        if (parties.length === 0) {
          this.sessions.delete(sessionId);
          return "END Invalid routing code. Payee identity not found or suspended.";
        }

        const party = parties[0];
        session.routingCode = lastInput;
        session.partyId = party.id;
        session.tenantId = party.tenantId;
        session.partyName = party.name;
        session.currency = "UGX"; // Default currency fallback
        session.state = "CONFIRMING_PAYEE";

        return `CON Payee: ${party.name}\nEntity: ${party.tenantId}\n\n1. Confirm & Pay\n2. Cancel`;

      case "CONFIRMING_PAYEE":
        if (lastInput === "1") {
          session.state = "ENTERING_AMOUNT";
          return `CON Enter Amount in minor units (e.g. 1000 = 10.00 ${session.currency}):`;
        } else if (lastInput === "2") {
          this.sessions.delete(sessionId);
          return "END Transaction cancelled.";
        } else {
          return `CON Invalid choice.\nPayee: ${session.partyName}\n1. Confirm & Pay\n2. Cancel`;
        }

      case "ENTERING_AMOUNT":
        const amt = parseInt(lastInput);
        if (isNaN(amt) || amt <= 0) {
          return "CON Invalid amount. Enter positive integer:";
        }

        session.amountMinor = amt;
        session.state = "CONFIRMING_PAYMENT";
        return `CON Confirm payment of ${amt} ${session.currency} to ${session.partyName}?\n1. Confirm\n2. Cancel`;

      case "CONFIRMING_PAYMENT":
        if (lastInput === "1") {
          // Dispatch simulated push trigger or record state
          this.sessions.delete(sessionId);
          return `END Payment of ${session.amountMinor} ${session.currency} to ${session.partyName} initiated. Check your phone for MoMo PIN prompt.`;
        } else {
          this.sessions.delete(sessionId);
          return "END Payment cancelled.";
        }

      case "CHECK_WALLET_ENTER_ID":
        // Search S-Wallet by party routing code or direct phone match
        const matchingParties = db.select<any>("parties", (p: any) => p.routingCode === lastInput || p.id === lastInput);
        const partyIdToSearch = matchingParties.length > 0 ? matchingParties[0].id : lastInput;

        const wallets = db.select<any>("wallets", (w: any) => w.partyId === partyIdToSearch);
        this.sessions.delete(sessionId);
        
        if (wallets.length === 0) {
          return "END S-Wallet not found for the specified identity.";
        }

        const wallet = wallets[0];
        return `END S-Wallet Account Balance:\n${wallet.balanceMinor} ${wallet.currency}\nStatus: ${wallet.status}`;

      default:
        this.sessions.delete(sessionId);
        return "END System exception: Session corrupted.";
    }
  }
}
