const fs = require('fs');

let content = fs.readFileSync('experience/erp/runtimeEngine.js', 'utf8');

// We need to replace the entire export const DIGITAL_FORMS_CATALOGUE array with an object map.
const newForms = `export const DIGITAL_FORMS_CATALOGUE = {
  // University ERP
  "registrar": [
    { id: "form-reg-1", title: "Admission Application", desc: "Submit an application for new student admission." },
    { id: "form-reg-2", title: "Transfer Request", desc: "Request academic transfer between programs." },
    { id: "form-reg-3", title: "Withdrawal Form", desc: "Official academic withdrawal processing." },
    { id: "form-reg-4", title: "Graduation Clearance", desc: "Clearance form for graduation candidacy." }
  ],
  "bursary": [
    { id: "form-fin-1", title: "Payment Voucher", desc: "Submit voucher for operational payments." },
    { id: "form-fin-2", title: "Budget Request", desc: "Request departmental budget allocation." },
    { id: "form-fin-3", title: "Purchase Request", desc: "Request procurement of goods and services." },
    { id: "form-fin-4", title: "Payroll Requisition", desc: "Request for payroll processing." }
  ],
  "medical": [
    { id: "form-med-1", title: "Patient Intake Form", desc: "Register a new patient into the clinic." },
    { id: "form-med-2", title: "Diagnosis Record", desc: "Log diagnostic results and notes." },
    { id: "form-med-3", title: "Prescription Form", desc: "Issue medical prescriptions." },
    { id: "form-med-4", title: "Laboratory Requisition", desc: "Order laboratory tests." }
  ],
  "hr": [
    { id: "form-hr-1", title: "Employee Registration", desc: "Register a new staff member." },
    { id: "form-hr-2", title: "Leave Request", desc: "Apply for annual or medical leave." },
    { id: "form-hr-3", title: "Performance Review", desc: "Submit staff performance evaluations." }
  ]
};`;

content = content.replace(/export const DIGITAL_FORMS_CATALOGUE = \([\s\S]*?\n\};\n?/m, newForms);
// If it's an array: export const DIGITAL_FORMS_CATALOGUE = [ ... ];
content = content.replace(/export const DIGITAL_FORMS_CATALOGUE = \[[^]*?\];/m, newForms);

fs.writeFileSync('experience/erp/runtimeEngine.js', content, 'utf8');
console.log('Patched forms');
