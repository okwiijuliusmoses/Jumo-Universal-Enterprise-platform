export class LicensingPlatform {
  constructor() {
    this.licenses = [
      { id: "lic-001", type: "Enterprise Unlimited", seats: 5000, expires: "2029-12-31", status: "Valid" }
    ];
  }
  listLicenses() { return this.licenses; }
}
