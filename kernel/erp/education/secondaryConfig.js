export const secondaryConfig = {
  id: "Secondary-ERP",
  name: "Secondary & High School ERP",
  family: "Education",
  educationLevel: "Secondary School",
  governanceModel: "Head Teacher & Board of Governors",
  description: "Comprehensive digital school management system for secondary education, boarding facilities, and national exams.",
  portals: [
    { id: "sec-student", name: "Student Portal", icon: "🎒", desc: "Timetables, homework, term results" },
    { id: "sec-parent", name: "Parent / Guardian Portal", icon: "👨‍👩‍👧", desc: "Attendance, fees payment, performance reports" },
    { id: "sec-teacher", name: "Teacher Portal", icon: "👩‍🏫", desc: "Class attendance, grading, lesson plans" },
    { id: "sec-admin", name: "Administration & Boarding Portal", icon: "🏫", desc: "Admissions, fees, boarding allocation" }
  ],
  departments: [
    "Head Teacher Office",
    "Directorate of Studies",
    "Boarding & Welfare",
    "Exams & Reports",
    "Bursar & Finance"
  ],
  modules: [
    { id: "admissions", name: "Form 1 / S.1 Admissions", icon: "📝", status: "Active" },
    { id: "student-records", name: "Student & Boarding Records", icon: "🏢", status: "Active" },
    { id: "attendance", name: "Daily Attendance & Discipline", icon: "📋", status: "Active" },
    { id: "examinations", name: "Termly Examinations & Report Cards", icon: "📑", status: "Active" },
    { id: "fees", name: "School Fees & Billing (FAAP)", icon: "💳", status: "Active" },
    { id: "library", name: "Textbook & Library Distribution", icon: "📖", status: "Active" }
  ],
  workflows: [
    { id: "wf-sec-discipline", name: "Student Discipline & Case Resolution", steps: 3 },
    { id: "wf-sec-report", name: "Term Report Card Verification & Printing", steps: 4 }
  ],
  roles: ["Head Teacher", "Director of Studies", "Teacher", "Bursar", "Parent", "Student"],
  forms: [
    { id: "form-sec-admission", name: "Secondary School Admission Form" },
    { id: "form-sec-leave", name: "Student Exeat / Leave Out Form" }
  ],
  reports: [
    { id: "rep-sec-attendance", name: "Term Attendance & Performance Summary" },
    { id: "rep-sec-fees", name: "School Fees Balance & Collection Report" }
  ]
};
