export class SearchPlatform {
  constructor() {}
  search(query) {
    const q = query.toLowerCase();
    return [
      { type: "Application", title: "FAAP Financial Ledger", match: q },
      { type: "Domain", title: "Education ERP Suite", match: q },
      { type: "Audit", title: "AEGIS Secure Log Entry #001", match: q }
    ].filter(item => item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q) || q === "");
  }
}
