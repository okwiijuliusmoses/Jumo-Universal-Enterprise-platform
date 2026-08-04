export const baseAlumniConfig = {
  family: "Alumni",
  governanceModel: "Association",
  governancePortals: [
    { id: "alumni-exec", name: "Alumni Executive Board", desc: "Strategic leadership and governance." },
    { id: "alumni-secretariat", name: "National Alumni Secretariat", desc: "Core administrative operations." },
    { id: "alumni-regional", name: "Regional Chapters", desc: "Local chapter management." },
    { id: "alumni-intl", name: "International Chapters", desc: "Global chapter network." },
    { id: "alumni-membership", name: "Membership Office", desc: "Member registration and dues." },
    { id: "alumni-career", name: "Career Services", desc: "Job boards, placements, and networking." },
    { id: "alumni-mentorship", name: "Mentorship Office", desc: "Alumni to student/peer mentorship programs." },
    { id: "alumni-fundraising", name: "Fundraising", desc: "Campaigns and donation management." },
    { id: "alumni-endowment", name: "Endowment", desc: "Endowment fund management." },
    { id: "alumni-events", name: "Events", desc: "Reunions and event coordination." },
    { id: "alumni-business", name: "Alumni Business Network", desc: "B2B networking and directories." },
    { id: "alumni-research", name: "Research Network", desc: "Academic and professional research collaboration." },
    { id: "alumni-volunteer", name: "Volunteer Services", desc: "Community outreach and volunteering." },
    { id: "alumni-corporate", name: "Corporate Relations", desc: "Corporate sponsorships and partnerships." }
  ],
  modules: [
    "Membership", "Events", "Donations", "CareerServices", "Communication", "Fundraising", "Endowment", "Mentorship"
  ],
  roles: ["AssociationAdmin", "BoardMember", "ChapterPresident", "Member", "Partner", "SecretariatStaff"]
};
