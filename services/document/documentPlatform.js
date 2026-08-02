export class DocumentPlatform {
  constructor() {
    this.documents = [
      { id: "doc-01", title: "Global Enterprise Charter", status: "Published", version: "3.0" },
      { id: "doc-02", title: "Government Integration Standard", status: "Draft", version: "1.0" }
    ];
  }
  listDocuments() { return this.documents; }
}
