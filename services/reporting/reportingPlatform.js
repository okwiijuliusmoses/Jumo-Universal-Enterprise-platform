export class ReportingPlatform {
  constructor() {
    this.reports = [
      { id: "rep-01", title: "Enterprise Q3 Financial Consolidation", status: "Generated" },
      { id: "rep-02", title: "Government Regulatory Compliance Report", status: "Generated" }
    ];
  }
  listReports() { return this.reports; }
}
