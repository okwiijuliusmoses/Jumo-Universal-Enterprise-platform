export const baseClanConfig = {
  family: "Clan",
  governanceModel: "Clan Council",
  governancePortals: [
    { id: "clan-council", name: "Clan Council", desc: "Supreme clan governance and leadership." },
    { id: "clan-land", name: "Clan Land Registry", desc: "Communal land and property management." },
    { id: "clan-heritage", name: "Clan Heritage", desc: "Cultural preservation and traditions." },
    { id: "clan-welfare", name: "Clan Welfare", desc: "Social support and welfare programs." },
    { id: "clan-investments", name: "Clan Investments", desc: "Business ventures and economic development." },
    { id: "clan-genealogy", name: "Clan Genealogy", desc: "Lineage tracking and family trees." },
    { id: "clan-assets", name: "Clan Assets", desc: "Asset and resources management." },
    { id: "clan-treasury", name: "Clan Treasury", desc: "Financial management and contributions." },
    { id: "clan-education", name: "Clan Education", desc: "Scholarships and educational support." },
    { id: "clan-health", name: "Clan Health", desc: "Health initiatives and medical support." }
  ],
  modules: [
    "Genealogy", "Families", "Households", "LandRegistry", "Treasury", "Welfare", "Events"
  ],
  roles: ["ClanLeader", "Elder", "FamilyHead", "ClanMember", "TreasuryOfficer"]
};
