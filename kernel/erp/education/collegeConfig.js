export const collegeConfig = {
  id: "College-ERP",
  name: "College & Higher Institute ERP",
  family: "Education",
  educationLevel: "Tertiary College",
  governanceModel: "Principal & Academic Board",
  description: "Comprehensive enterprise digital platform for colleges, professional institutes, and higher education diplomas.",
  portals: [
    { id: "college-student", name: "Student Portal", icon: "🎓", desc: "Admissions, courses, timetable, results" },
    { id: "college-lecturer", name: "Instructor Portal", icon: "👨‍🏫", desc: "Teaching workloads, grades, attendance" },
    { id: "college-admin", name: "Administration Portal", icon: "🏛️", desc: "Student records, admissions, transcripts" },
    { id: "college-finance", name: "Bursar & Finance Portal", icon: "💳", desc: "Fee collection, invoicing, FAAP ledger" }
  ],
  departments: [
    "Office of the Principal",
    "Academic Directorate",
    "Admissions & Records",
    "Examinations Office",
    "Finance & Bursary",
    "Student Affairs"
  ],
  modules: [
    { id: "admissions", name: "Diploma & Certificate Admissions", icon: "📝", status: "Active" },
    { id: "student-records", name: "Student Information System", icon: "📁", status: "Active" },
    { id: "courses", name: "Course & Curriculum Management", icon: "📚", status: "Active" },
    { id: "timetables", name: "Class & Venue Scheduling", icon: "🗓️", status: "Active" },
    { id: "examinations", name: "Examination & Grading Board", icon: "📊", status: "Active" },
    { id: "finance", name: "FAAP Fee Billing & Revenue", icon: "💰", status: "Active" }
  ],
  workflows: [
    { id: "wf-college-admission", name: "Diploma Admission Approval", steps: 4 },
    { id: "wf-college-exam", name: "Exam Marks Moderation & Board Approval", steps: 3 }
  ],
  roles: ["Principal", "Academic Registrar", "Instructor", "Student", "Bursar"],
  forms: [
    { id: "form-college-app", name: "Diploma Application Form" },
    { id: "form-college-course", name: "Course Registration Form" }
  ],
  reports: [
    { id: "rep-college-enrollment", name: "Institutional Enrollment Statistics" },
    { id: "rep-college-revenue", name: "Fee Collection & Outstanding Balances" }
  ]
};
