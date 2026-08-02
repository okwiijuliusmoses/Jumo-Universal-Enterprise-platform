export class FaapPlatform {
  constructor() {
    this.ledgers = [
      { id: "ledger-main", currency: "USD", balance: "48,290,100.00", status: "Balanced & Verified" },
      { id: "ledger-eur", currency: "EUR", balance: "12,400,500.00", status: "Balanced & Verified" }
    ];
  }
  getLedgers() { return this.ledgers; }
}
