export class FilePlatform {
  constructor() {
    this.files = [
      { id: "file-01", name: "UEOS_Architecture_Blueprint_v2.pdf", size: "4.2 MB", uploadedAt: new Date().toISOString() },
      { id: "file-02", name: "AEGIS_Compliance_Certificate.enc", size: "1.1 MB", uploadedAt: new Date().toISOString() }
    ];
  }
  listFiles() { return this.files; }
}
