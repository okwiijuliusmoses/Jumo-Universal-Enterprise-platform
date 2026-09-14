export const primaryConfig = {
  id: "Primary-ERP",
  name: "Nursery & Primary School ERP",
  family: "Education",
  educationLevel: "Primary & Nursery",
  governanceModel: "School Director & Head Teacher",
  description: "Specialized early childhood and primary education management platform with parent communication and pupil welfare.",
  portals: [
    { id: "prim-parent", name: "Parent & Guardian Portal", icon: "👨‍👩‍👦", desc: "Daily updates, pupil progress, fee payments" },
    { id: "prim-teacher", name: "Teacher Portal", icon: "🍎", desc: "Class registers, activities, evaluations" },
    { id: "prim-admin", name: "School Administration Portal", icon: "🏫", desc: "Pupil enrollment, staff, fees, school events" }
  ],
  departments: [
    "Head Teacher Office",
    "Nursery & Kindergarten Section",
    "Primary Section",
    "Pupil Welfare & Health",
    "Bursary & Accounts"
  ],
  modules: [
    { id: "child-registration", name: "Pupil Registration & Records", icon: "👶", status: "Active" },
    { id: "attendance", name: "Daily Pupil Attendance", icon: "✅", status: "Active" },
    { id: "learning-progress", name: "Learning Activities & Progress", icon: "⭐", status: "Active" },
    { id: "parent-comm", name: "Parent Communication & Notices", icon: "💬", status: "Active" },
    { id: "health-records", name: "Pupil Health & Immunization Records", icon: "🩺", status: "Active" },
    { id: "fees-billing", name: "Termly Fees & Billing (FAAP)", icon: "💵", status: "Active" }
  ],
  workflows: [
    { id: "wf-prim-enrollment", name: "New Pupil Enrollment Process", steps: 3 },
    { id: "wf-prim-health", name: "Health Incident Notification & Action", steps: 2 }
  ],
  roles: ["School Director", "Head Teacher", "Teacher", "Parent", "Accountant"],
  forms: [
    { id: "form-prim-enroll", name: "Pupil Admission Application Form" },
    { id: "form-prim-event", name: "Extracurricular Activity Permission Form" }
  ],
  reports: [
    { id: "rep-prim-attendance", name: "Monthly Pupil Attendance Register" },
    { id: "rep-prim-finances", name: "Termly Fee Collections & Disbursements" }
  ]
};
