/**
 * JUMO UEOS
 * Enterprise Portal Factory
 */

export class EnterprisePortalFactory {
  constructor() {
    this.sectorPortals = {
      education: [
        "University Public Portal",
        "Student Portal",
        "Faculty Portal",
        "Lecturer Portal",
        "Administration Portal",
        "Finance Portal",
        "Research Portal",
        "Alumni Portal"
      ],
      government: [
        "Citizen Portal",
        "Ministry Portal",
        "Agency Portal",
        "Administration Portal",
        "Public Service Portal"
      ],
      finance: [
        "Customer Portal",
        "Teller Portal",
        "Treasury Portal",
        "Compliance Portal",
        "Executive Portal"
      ],
      healthcare: [
        "Patient Portal",
        "Clinician Portal",
        "Pharmacy Portal",
        "Laboratory Portal",
        "Administration Portal"
      ],
      commerce: [
        "Customer Storefront",
        "Vendor Portal",
        "Warehouse Portal",
        "Management Portal"
      ],
      agriculture: [
        "Farmer Portal",
        "Cooperative Portal",
        "Buyer Portal",
        "Admin Portal"
      ],
      social: [
        "Donor Portal",
        "Beneficiary Portal",
        "Project Manager Portal",
        "Executive Portal"
      ]
    };
  }

  getPortalsForSector(sector) {
    const key = (sector || "").toLowerCase();
    for (const [sKey, portals] of Object.entries(this.sectorPortals)) {
      if (key.includes(sKey)) {
        return portals;
      }
    }
    return [
      "Main Enterprise Portal",
      "Administrator Portal",
      "Staff Portal",
      "Client/User Portal",
      "Reporting Portal"
    ];
  }
}

export const enterprisePortalFactory = new EnterprisePortalFactory();
