export class ExtensionLoader {
  constructor() {
    this.extensions = new Map([
      ["ext-edu-lms", { id: "ext-edu-lms", name: "Campus Learning Management Extension", domain: "Education", status: "Ready" }],
      ["ext-gov-citizen", { id: "ext-gov-citizen", name: "Citizen Identity Portal Extension", domain: "Government", status: "Ready" }]
    ]);
  }

  listExtensions() {
    return Array.from(this.extensions.values());
  }

  registerExtension(ext) {
    this.extensions.set(ext.id, { ...ext, status: "Active" });
    return ext;
  }
}
