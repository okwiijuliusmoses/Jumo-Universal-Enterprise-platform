export const healthcareConfig = {
  id: "Healthcare-ERP",
  name: "Hospital & Health Enterprise Operating Platform",
  family: "Healthcare",
  governanceModel: "Medical Director, Chief Executive & Hospital Board",
  description: "Advanced healthcare management platform for hospitals, clinics, laboratories, and medical research facilities.",
  portals: [
    { id: "health-public", name: "Patient Care & Public Portal", icon: "🌐", desc: "Appointments, medical records, telehealth" },
    { id: "health-login", name: "Clinical Staff Login Portal", icon: "🔐", desc: "Secure doctor, nurse and pharmacist authentication" },
    { id: "health-workspace", name: "Clinical Operations Workspace", icon: "🏥", desc: "Wards, triage, surgeries, admissions" },
    { id: "pharmacy-portal", name: "Pharmacy & Dispensary Portal", icon: "💊", desc: "Drug inventory, prescriptions, dispensing" },
    { id: "lab-portal", name: "Laboratory & Diagnostics Portal", icon: "🔬", desc: "Test requests, sample tracking, pathology results" },
    { id: "finance-health", name: "Medical Billing & Insurance Portal", icon: "💳", desc: "Claims processing, NHIF/HMO billing, receipts" }
  ],
  departments: [
    "Clinical & Medical Services",
    "Nursing Directorate",
    "Pharmacy & Therapeutics",
    "Laboratory & Diagnostics",
    "Hospital Administration & Billing"
  ],
  modules: [
    { id: "emr-system", name: "Electronic Medical Records (EMR)", icon: "📋", status: "Active" },
    { id: "appointment-mgr", name: "Patient Appointment & Triage", icon: "📅", status: "Active" },
    { id: "pharmacy-inventory", name: "Pharmacy Stock & Dispensing", icon: "💊", status: "Active" },
    { id: "lab-information", name: "Laboratory Information System (LIS)", icon: "🔬", status: "Active" },
    { id: "insurance-claims", name: "HMO & Insurance Claims Processing", icon: "📄", status: "Active" }
  ],
  workflows: [
    { id: "wf-patient-admission", name: "Patient Triage & Ward Admission Workflow", steps: 4 },
    { id: "wf-pharmacy-dispense", name: "Prescription Verification & Dispensing Workflow", steps: 3 }
  ],
  roles: ["Medical Doctor", "Registered Nurse", "Pharmacist", "Lab Technologist", "Hospital Administrator", "Patient"],
  forms: [
    { id: "form-patient-intake", name: "Patient Intake & Medical History Form" },
    { id: "form-lab-request", name: "Diagnostic Laboratory Test Request Form" }
  ],
  reports: [
    { id: "rep-health-stats", name: "Hospital Morbidity, Mortality & Utilization Report" }
  ]
};
